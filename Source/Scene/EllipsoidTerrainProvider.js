/*global define*/
define([
        '../Core/DeveloperError',
        '../Core/defaultValue',
        './WebMercatorTilingScheme',
        '../Core/Cartographic3',
        '../Core/ExtentTessellator',
        './TerrainProvider',
        './TileState',
        '../Core/PlaneTessellator',
        '../Core/Cartographic2',
        '../Core/Math',
        '../Core/Cartesian2'
    ], function(
        DeveloperError,
        defaultValue,
        WebMercatorTilingScheme,
        Cartographic3,
        ExtentTessellator,
        TerrainProvider,
        TileState,
        PlaneTessellator,
        Cartographic2,
        CesiumMath,
        Cartesian2) {
    "use strict";

    /**
     * A very simple {@link TerrainProvider} that produces geometry by tessellating an ellipsoidal
     * surface.
     *
     * @alias EllipsoidTerrainProvider
     * @constructor
     *
     * @param {TilingScheme} [tilingScheme] The tiling scheme indicating how the ellipsoidal
     * surface is broken into tiles.  If this parameter is not provided, a
     * {@link MercatorTilingScheme} on the surface of the WGS84 ellipsoid is used.
     *
     * @see TerrainProvider
     */
    function EllipsoidTerrainProvider(tilingScheme) {
        /**
         * The tiling scheme used to tile the surface.
         *
         * @type TilingScheme
         */
        this.tilingScheme = defaultValue(tilingScheme, new WebMercatorTilingScheme());
    }

    function computeDesiredGranularity(tilingScheme, tile) {
        var ellipsoid = tilingScheme.ellipsoid;
        var level = tile.level;

        // The more vertices we use to tessellate the extent, the less geometric error
        // in the tile.  We only need to use enough vertices to be at or below the
        // geometric error expected for this level.
        var maxErrorMeters = tilingScheme.getLevelMaximumGeometricError(level);

        // Convert the max error in meters to radians at the equator.
        // TODO: we should take the latitude into account to avoid over-tessellation near the poles.
        var maxErrorRadians = maxErrorMeters / ellipsoid.getRadii().x;

        return maxErrorRadians * 10;
    }

    EllipsoidTerrainProvider.prototype.requestTileGeometry = function(tile) {
        tile.state = TileState.RECEIVED;
    };

    EllipsoidTerrainProvider.prototype.transformGeometry = function(context, tile) {
        var tilingScheme = this.tilingScheme;
        var ellipsoid = tilingScheme.ellipsoid;
        var extent = tile.extent;

        var granularity = computeDesiredGranularity(tilingScheme, tile);

        // Determine the center for RTC rendering.
//        var center = ellipsoid.toCartesian(new Cartographic3(
//                (extent.east - extent.west) / 2.0,
//                (extent.north - extent.south) / 2.0,
//                0.0));
        // TODO: bounding sphere should be computed here, not by the tile.
        var center = tile.get3DBoundingSphere().center;

        // Create vertex and index buffers for this extent.
        // TODO: do this in a web worker?
        var buffers = ExtentTessellator.computeBuffers({
            ellipsoid : ellipsoid,
            extent : extent,
            granularity : granularity,
            generateTextureCoords : true,
            interleave : true,
            relativeToCenter : center
        });

        tile.transformedGeometry = buffers;
        tile.state = TileState.TRANSFORMED;
    };

    EllipsoidTerrainProvider.prototype.createResources = function(context, tile) {
        TerrainProvider.createTileEllipsoidGeometryFromBuffers(context, tile, tile.transformedGeometry);
        tile.transformedGeometry = undefined;
        tile.state = TileState.READY;
    };

    /**
     * Populates a {@link Tile} with plane-mapped surface geometry from this
     * tile provider.
     *
     * @memberof EllipsoidTerrainProvider
     *
     * @param {Context} context The rendered context to use to create renderer resources.
     * @param {Tile} tile The tile to populate with surface geometry.
     * @param {Projection} projection The map projection to use.
     * @returns {Boolean|Promise} A boolean value indicating whether the tile was successfully
     * populated with geometry, or a promise for such a value in the future.
     */
    EllipsoidTerrainProvider.prototype.createTilePlaneGeometry = function(context, tile, projection) {
        var tilingScheme = this.tilingScheme;
        var ellipsoid = tilingScheme.ellipsoid;
        var extent = tile.extent;

        var granularity = computeDesiredGranularity(tilingScheme, tile);

        var vertices = [];
        var width = tile.extent.east - tile.extent.west;
        var height = tile.extent.north - tile.extent.south;
        var lonScalar = 1.0 / width;
        var latScalar = 1.0 / height;

        var center = tile.get3DBoundingSphere().center;
        var projectedRTC = tile.get2DBoundingSphere(projection).center.clone();

        var mesh = PlaneTessellator.compute({
            resolution : {
                x : Math.max(Math.ceil(width / granularity), 2.0),
                y : Math.max(Math.ceil(height / granularity), 2.0)
            },
            onInterpolation : function(time) {
                var lonLat = new Cartographic2(
                        CesiumMath.lerp(extent.west, extent.east, time.x),
                        CesiumMath.lerp(extent.south, extent.north, time.y));

                var p = ellipsoid.toCartesian(lonLat).subtract(center);
                vertices.push(p.x, p.y, p.z);

                var u = (lonLat.longitude - extent.west) * lonScalar;
                var v = (lonLat.latitude - extent.south) * latScalar;
                vertices.push(u, v);

                // TODO: This will not work if the projection's ellipsoid is different
                // than the central body's ellipsoid.  Throw an exception?
                var projectedLonLat = projection.project(lonLat).subtract(projectedRTC);
                vertices.push(projectedLonLat.x, projectedLonLat.y);
            }
        });

        TerrainProvider.createTilePlaneGeometryFromBuffers(context, tile, {
            vertices: vertices,
            indices: mesh.indexLists[0].values
        });


        tile._drawUniforms = {
            u_center3D : function() {
                return center;
            },
            u_center2D : function() {
                return (projectedRTC) ? projectedRTC.getXY() : Cartesian2.ZERO;
            },
            u_modifiedModelView : function() {
                return tile.modelView;
            }
        };

        return true;
    };

    return EllipsoidTerrainProvider;
});