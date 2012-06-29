/*global defineSuite*/
defineSuite([
             'DynamicScene/DynamicPyramid',
             'DynamicScene/DynamicObject',
             'Core/JulianDate',
             'Core/Spherical',
             'Core/Color',
             'Core/Iso8601',
             'Core/TimeInterval'
            ], function(
              DynamicPyramid,
              DynamicObject,
              JulianDate,
              Spherical,
              Color,
              Iso8601,
              TimeInterval) {
    "use strict";
    /*global it,expect*/

    it('processCzmlPacket adds data for infinite pyramid.', function() {
        var pyramidPacket = {
            pyramid : {
                directions : {
                    unitSpherical : [1.0, 2.0, 3.0, 4.0]
                },
                radius : 2.0,
                show : true,
                showIntersection : false,
                material : {
                    solidColor : {
                        color : {
                            rgbaf : [0.1, 0.1, 0.1, 0.1]
                        }
                    }
                },
                intersectionColor : {
                    rgbaf : [0.5, 0.5, 0.5, 0.5]
                }
            }
        };

        var dynamicObject = new DynamicObject('dynamicObject');
        expect(DynamicPyramid.processCzmlPacket(dynamicObject, pyramidPacket)).toEqual(true);

        expect(dynamicObject.pyramid).toBeDefined();
        expect(dynamicObject.pyramid.directions.getValueSpherical(Iso8601.MINIMUM_VALUE)).toEqualArray(
                [new Spherical(pyramidPacket.pyramid.directions.unitSpherical[0], pyramidPacket.pyramid.directions.unitSpherical[1]),
                        new Spherical(pyramidPacket.pyramid.directions.unitSpherical[2], pyramidPacket.pyramid.directions.unitSpherical[3])]);
        expect(dynamicObject.pyramid.radius.getValue(Iso8601.MINIMUM_VALUE)).toEqual(pyramidPacket.pyramid.radius);
        expect(dynamicObject.pyramid.show.getValue(Iso8601.MINIMUM_VALUE)).toEqual(pyramidPacket.pyramid.show);
        expect(dynamicObject.pyramid.showIntersection.getValue(Iso8601.MINIMUM_VALUE)).toEqual(pyramidPacket.pyramid.showIntersection);
        expect(dynamicObject.pyramid.material.getValue(Iso8601.MINIMUM_VALUE).color).toEqual(new Color(0.1, 0.1, 0.1, 0.1));
        expect(dynamicObject.pyramid.intersectionColor.getValue(Iso8601.MINIMUM_VALUE)).toEqual(new Color(0.5, 0.5, 0.5, 0.5));
    });

    it('processCzmlPacket adds data for constrained pyramid.', function() {
        var pyramidPacket = {
            pyramid : {
                interval : '2000-01-01/2001-01-01',
                directions : {
                    unitSpherical : [1.0, 2.0, 3.0, 4.0]
                },
                radius : 2.0,
                show : true,
                showIntersection : false,
                material : {
                    solidColor : {
                        color : {
                            rgbaf : [0.1, 0.1, 0.1, 0.1]
                        }
                    }
                },
                intersectionColor : {
                    rgbaf : [0.5, 0.5, 0.5, 0.5]
                }
            }
        };

        var validTime = TimeInterval.fromIso8601(pyramidPacket.pyramid.interval).start;
        var invalidTime = validTime.addSeconds(-1);

        var dynamicObject = new DynamicObject('dynamicObject');
        expect(DynamicPyramid.processCzmlPacket(dynamicObject, pyramidPacket)).toEqual(true);

        expect(dynamicObject.pyramid).toBeDefined();
        expect(dynamicObject.pyramid.directions.getValueSpherical(validTime)).toEqualArray(
                [new Spherical(pyramidPacket.pyramid.directions.unitSpherical[0], pyramidPacket.pyramid.directions.unitSpherical[1]),
                        new Spherical(pyramidPacket.pyramid.directions.unitSpherical[2], pyramidPacket.pyramid.directions.unitSpherical[3])]);
        expect(dynamicObject.pyramid.radius.getValue(validTime)).toEqual(pyramidPacket.pyramid.radius);
        expect(dynamicObject.pyramid.show.getValue(validTime)).toEqual(pyramidPacket.pyramid.show);
        expect(dynamicObject.pyramid.showIntersection.getValue(validTime)).toEqual(pyramidPacket.pyramid.showIntersection);
        expect(dynamicObject.pyramid.material.getValue(validTime).color).toEqual(new Color(0.1, 0.1, 0.1, 0.1));
        expect(dynamicObject.pyramid.intersectionColor.getValue(validTime)).toEqual(new Color(0.5, 0.5, 0.5, 0.5));

        expect(dynamicObject.pyramid.directions.getValueSpherical(invalidTime)).toBeUndefined();
        expect(dynamicObject.pyramid.radius.getValue(invalidTime)).toBeUndefined();
        expect(dynamicObject.pyramid.show.getValue(invalidTime)).toBeUndefined();
        expect(dynamicObject.pyramid.showIntersection.getValue(invalidTime)).toBeUndefined();
        expect(dynamicObject.pyramid.material.getValue(invalidTime)).toBeUndefined();
        expect(dynamicObject.pyramid.intersectionColor.getValue(invalidTime)).toBeUndefined();
    });

    it('processCzmlPacket returns false if no data.', function() {
        var packet = {};
        var dynamicObject = new DynamicObject('dynamicObject');
        expect(DynamicPyramid.processCzmlPacket(dynamicObject, packet)).toEqual(false);
        expect(dynamicObject.pyramid).toBeUndefined();
    });

    it('mergeProperties does not change a fully configured pyramid', function() {
        var objectToMerge = new DynamicObject('objectToMerge');
        objectToMerge.pyramid = new DynamicPyramid();
        objectToMerge.material = 1;
        objectToMerge.directions = 2;
        objectToMerge.intersectionColor = 3;
        objectToMerge.radius = 4;
        objectToMerge.show = 5;
        objectToMerge.showIntersection = 6;

        var targetObject = new DynamicObject('targetObject');
        targetObject.pyramid = new DynamicPyramid();
        targetObject.material = 7;
        targetObject.directions = 8;
        targetObject.intersectionColor = 9;
        targetObject.radius = 10;
        targetObject.show = 11;
        targetObject.showIntersection = 12;

        DynamicPyramid.mergeProperties(targetObject, objectToMerge);

        expect(targetObject.pyramid.material).toEqual(targetObject.pyramid.material);
        expect(targetObject.pyramid.directions).toEqual(targetObject.pyramid.directions);
        expect(targetObject.pyramid.intersectionColor).toEqual(targetObject.pyramid.intersectionColor);
        expect(targetObject.pyramid.radius).toEqual(targetObject.pyramid.radius);
        expect(targetObject.pyramid.show).toEqual(targetObject.pyramid.show);
        expect(targetObject.pyramid.showIntersection).toEqual(targetObject.pyramid.showIntersection);
    });

    it('mergeProperties creates and configures an undefined pyramid', function() {
        var objectToMerge = new DynamicObject('objectToMerge');
        objectToMerge.pyramid = new DynamicPyramid();
        objectToMerge.material = 1;
        objectToMerge.directions = 2;
        objectToMerge.intersectionColor = 3;
        objectToMerge.radius = 4;
        objectToMerge.show = 5;
        objectToMerge.showIntersection = 6;

        var targetObject = new DynamicObject('targetObject');

        DynamicPyramid.mergeProperties(targetObject, objectToMerge);

        expect(targetObject.pyramid.material).toEqual(objectToMerge.pyramid.material);
        expect(targetObject.pyramid.directions).toEqual(objectToMerge.pyramid.directions);
        expect(targetObject.pyramid.intersectionColor).toEqual(objectToMerge.pyramid.intersectionColor);
        expect(targetObject.pyramid.radius).toEqual(objectToMerge.pyramid.radius);
        expect(targetObject.pyramid.show).toEqual(objectToMerge.pyramid.show);
        expect(targetObject.pyramid.showIntersection).toEqual(objectToMerge.pyramid.showIntersection);
    });

    it('mergeProperties does not change when used with an undefined pyramid', function() {
        var objectToMerge = new DynamicObject('objectToMerge');

        var targetObject = new DynamicObject('targetObject');
        targetObject.pyramid = new DynamicPyramid();
        objectToMerge.material = 1;
        objectToMerge.directions = 2;
        objectToMerge.intersectionColor = 3;
        objectToMerge.radius = 4;
        objectToMerge.show = 5;
        objectToMerge.showIntersection = 6;

        DynamicPyramid.mergeProperties(targetObject, objectToMerge);

        expect(targetObject.pyramid.material).toEqual(targetObject.pyramid.material);
        expect(targetObject.pyramid.directions).toEqual(targetObject.pyramid.directions);
        expect(targetObject.pyramid.intersectionColor).toEqual(targetObject.pyramid.intersectionColor);
        expect(targetObject.pyramid.radius).toEqual(targetObject.pyramid.radius);
        expect(targetObject.pyramid.show).toEqual(targetObject.pyramid.show);
        expect(targetObject.pyramid.showIntersection).toEqual(targetObject.pyramid.showIntersection);
    });

    it('undefineProperties works', function() {
        var testObject = new DynamicObject('testObject');
        testObject.pyramid = new DynamicPyramid();
        DynamicPyramid.undefineProperties(testObject);
        expect(testObject.pyramid).toBeUndefined();
    });
});