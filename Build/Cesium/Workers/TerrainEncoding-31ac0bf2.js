define(["exports","./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-bddc1162","./Transforms-6f81ad4c","./ComponentDatatype-6d99a1ee","./AttributeCompression-9fc99391"],function(t,y,e,f,b,M,s,x){"use strict";function i(t,e){this._ellipsoid=t,this._cameraPosition=new b.Cartesian3,this._cameraPositionInScaledSpace=new b.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,y.defined(e)&&(this.cameraPosition=e)}Object.defineProperties(i.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(t){var e=this._ellipsoid.transformPositionToScaledSpace(t,this._cameraPositionInScaledSpace),i=b.Cartesian3.magnitudeSquared(e)-1;b.Cartesian3.clone(t,this._cameraPosition),this._cameraPositionInScaledSpace=e,this._distanceToLimbInScaledSpaceSquared=i}}});var c=new b.Cartesian3;i.prototype.isPointVisible=function(t){return h(this._ellipsoid.transformPositionToScaledSpace(t,c),this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)},i.prototype.isScaledSpacePointVisible=function(t){return h(t,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};var n=new b.Cartesian3;i.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(t,e){var i,r=this._ellipsoid,a=y.defined(e)&&e<0&&r.minimumRadius>-e?((i=n).x=this._cameraPosition.x/(r.radii.x+e),i.y=this._cameraPosition.y/(r.radii.y+e),i.z=this._cameraPosition.z/(r.radii.z+e),i.x*i.x+i.y*i.y+i.z*i.z-1):(i=this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared);return h(t,i,a)},i.prototype.computeHorizonCullingPoint=function(t,e,i){return d(this._ellipsoid,t,e,i)};var o=b.Ellipsoid.clone(b.Ellipsoid.UNIT_SPHERE);i.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(t,e,i,r){return d(u(this._ellipsoid,i,o),t,e,r)},i.prototype.computeHorizonCullingPointFromVertices=function(t,e,i,r,a){return p(this._ellipsoid,t,e,i,r,a)},i.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(t,e,i,r,a,n){return p(u(this._ellipsoid,a,o),t,e,i,r,n)};var m=[];i.prototype.computeHorizonCullingPointFromRectangle=function(t,e,i){var r=b.Rectangle.subsample(t,e,0,m),a=M.BoundingSphere.fromPoints(r);if(!(b.Cartesian3.magnitude(a.center)<.1*e.minimumRadius))return this.computeHorizonCullingPoint(a.center,r,i)};var a=new b.Cartesian3;function u(t,e,i){var r;return y.defined(e)&&e<0&&t.minimumRadius>-e&&(r=b.Cartesian3.fromElements(t.radii.x+e,t.radii.y+e,t.radii.z+e,a),t=b.Ellipsoid.fromCartesian3(r,i)),t}function d(t,e,i,r){y.defined(r)||(r=new b.Cartesian3);for(var a=P(t,e),n=0,o=0,s=i.length;o<s;++o){var c=g(t,i[o],a);if(c<0)return;n=Math.max(n,c)}return T(a,n,r)}var l=new b.Cartesian3;function p(t,e,i,r,a,n){y.defined(n)||(n=new b.Cartesian3),r=y.defaultValue(r,3),a=y.defaultValue(a,b.Cartesian3.ZERO);for(var o=P(t,e),s=0,c=0,m=i.length;c<m;c+=r){l.x=i[c]+a.x,l.y=i[c+1]+a.y,l.z=i[c+2]+a.z;var u=g(t,l,o);if(u<0)return;s=Math.max(s,u)}return T(o,s,n)}function h(t,e,i){var r=e,a=i,n=b.Cartesian3.subtract(t,r,c),o=-b.Cartesian3.dot(n,r);return!(a<0?0<o:a<o&&o*o/b.Cartesian3.magnitudeSquared(n)>a)}var C=new b.Cartesian3,S=new b.Cartesian3;function g(t,e,i){var r=t.transformPositionToScaledSpace(e,C),a=b.Cartesian3.magnitudeSquared(r),n=Math.sqrt(a),o=b.Cartesian3.divideByScalar(r,n,S),a=Math.max(1,a),s=1/(n=Math.max(1,n));return 1/(b.Cartesian3.dot(o,i)*s-b.Cartesian3.magnitude(b.Cartesian3.cross(o,i,o))*(Math.sqrt(a-1)*s))}function T(t,e,i){if(!(e<=0||e===1/0||e!=e))return b.Cartesian3.multiplyByScalar(t,e,i)}var r=new b.Cartesian3;function P(t,e){return b.Cartesian3.equals(e,b.Cartesian3.ZERO)?e:(t.transformPositionToScaledSpace(e,r),b.Cartesian3.normalize(r,r))}var v=Object.freeze({NONE:0,BITS12:1}),z=new b.Cartesian3,E=new b.Cartesian3,N=new b.Cartesian2,I=new M.Matrix4,B=new M.Matrix4,_=Math.pow(2,12);function w(t,e,i,r,a,n){var o,s,c,m,u,d,l,p,h,f,x,C,S=v.NONE;y.defined(t)&&y.defined(e)&&y.defined(i)&&y.defined(r)&&(s=t.minimum,c=t.maximum,m=b.Cartesian3.subtract(c,s,E),u=i-e,S=Math.max(b.Cartesian3.maximumComponent(m),u)<_-1?v.BITS12:v.NONE,d=t.center,l=M.Matrix4.inverseTransformation(r,new M.Matrix4),p=b.Cartesian3.negate(s,z),M.Matrix4.multiply(M.Matrix4.fromTranslation(p,I),l,l),(h=z).x=1/m.x,h.y=1/m.y,h.z=1/m.z,M.Matrix4.multiply(M.Matrix4.fromScale(h,I),l,l),o=M.Matrix4.clone(r),M.Matrix4.setTranslation(o,b.Cartesian3.ZERO,o),r=M.Matrix4.clone(r,new M.Matrix4),f=M.Matrix4.fromTranslation(s,I),x=M.Matrix4.fromScale(m,B),C=M.Matrix4.multiply(f,x,I),M.Matrix4.multiply(r,C,r),M.Matrix4.multiply(o,C,o)),this.quantization=S,this.minimumHeight=e,this.maximumHeight=i,this.center=d,this.toScaledENU=l,this.fromScaledENU=r,this.matrix=o,this.hasVertexNormals=a,this.hasWebMercatorT=y.defaultValue(n,!1)}w.prototype.encode=function(t,e,i,r,a,n,o){var s,c,m,u,d,l,p=r.x,h=r.y;return this.quantization===v.BITS12?((i=M.Matrix4.multiplyByPoint(this.toScaledENU,i,z)).x=f.CesiumMath.clamp(i.x,0,1),i.y=f.CesiumMath.clamp(i.y,0,1),i.z=f.CesiumMath.clamp(i.z,0,1),s=this.maximumHeight-this.minimumHeight,c=f.CesiumMath.clamp((a-this.minimumHeight)/s,0,1),b.Cartesian2.fromElements(i.x,i.y,N),m=x.AttributeCompression.compressTextureCoordinates(N),b.Cartesian2.fromElements(i.z,c,N),u=x.AttributeCompression.compressTextureCoordinates(N),b.Cartesian2.fromElements(p,h,N),d=x.AttributeCompression.compressTextureCoordinates(N),t[e++]=m,t[e++]=u,t[e++]=d,this.hasWebMercatorT&&(b.Cartesian2.fromElements(o,0,N),l=x.AttributeCompression.compressTextureCoordinates(N),t[e++]=l)):(b.Cartesian3.subtract(i,this.center,z),t[e++]=z.x,t[e++]=z.y,t[e++]=z.z,t[e++]=a,t[e++]=p,t[e++]=h,this.hasWebMercatorT&&(t[e++]=o)),this.hasVertexNormals&&(t[e++]=x.AttributeCompression.octPackFloat(n)),e},w.prototype.decodePosition=function(t,e,i){if(y.defined(i)||(i=new b.Cartesian3),e*=this.getStride(),this.quantization!==v.BITS12)return i.x=t[e],i.y=t[e+1],i.z=t[e+2],b.Cartesian3.add(i,this.center,i);var r=x.AttributeCompression.decompressTextureCoordinates(t[e],N);i.x=r.x,i.y=r.y;var a=x.AttributeCompression.decompressTextureCoordinates(t[e+1],N);return i.z=a.x,M.Matrix4.multiplyByPoint(this.fromScaledENU,i,i)},w.prototype.decodeTextureCoordinates=function(t,e,i){return y.defined(i)||(i=new b.Cartesian2),e*=this.getStride(),this.quantization===v.BITS12?x.AttributeCompression.decompressTextureCoordinates(t[e+2],i):b.Cartesian2.fromElements(t[e+4],t[e+5],i)},w.prototype.decodeHeight=function(t,e){return e*=this.getStride(),this.quantization!==v.BITS12?t[e+3]:x.AttributeCompression.decompressTextureCoordinates(t[e+1],N).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight},w.prototype.decodeWebMercatorT=function(t,e){return e*=this.getStride(),this.quantization===v.BITS12?x.AttributeCompression.decompressTextureCoordinates(t[e+3],N).x:t[e+6]},w.prototype.getOctEncodedNormal=function(t,e,i){var r=t[e=(e+1)*this.getStride()-1]/256,a=Math.floor(r),n=256*(r-a);return b.Cartesian2.fromElements(a,n,i)},w.prototype.getStride=function(){var t;switch(this.quantization){case v.BITS12:t=3;break;default:t=6}return this.hasWebMercatorT&&++t,this.hasVertexNormals&&++t,t};var A={position3DAndHeight:0,textureCoordAndEncodedNormals:1},q={compressed0:0,compressed1:1};w.prototype.getAttributes=function(t){var e,i=s.ComponentDatatype.FLOAT,r=s.ComponentDatatype.getSizeInBytes(i);if(this.quantization===v.NONE){var a=2;return this.hasWebMercatorT&&++a,this.hasVertexNormals&&++a,[{index:A.position3DAndHeight,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:4,offsetInBytes:0,strideInBytes:e=(4+a)*r},{index:A.textureCoordAndEncodedNormals,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:a,offsetInBytes:4*r,strideInBytes:e}]}var n=3,o=0;return(this.hasWebMercatorT||this.hasVertexNormals)&&++n,this.hasWebMercatorT&&this.hasVertexNormals?[{index:q.compressed0,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:n,offsetInBytes:0,strideInBytes:e=(n+ ++o)*r},{index:q.compressed1,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:o,offsetInBytes:n*r,strideInBytes:e}]:[{index:q.compressed0,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:n}]},w.prototype.getAttributeLocations=function(){return this.quantization===v.NONE?A:q},w.clone=function(t,e){return y.defined(e)||(e=new w),e.quantization=t.quantization,e.minimumHeight=t.minimumHeight,e.maximumHeight=t.maximumHeight,e.center=b.Cartesian3.clone(t.center),e.toScaledENU=M.Matrix4.clone(t.toScaledENU),e.fromScaledENU=M.Matrix4.clone(t.fromScaledENU),e.matrix=M.Matrix4.clone(t.matrix),e.hasVertexNormals=t.hasVertexNormals,e.hasWebMercatorT=t.hasWebMercatorT,e},t.EllipsoidalOccluder=i,t.TerrainEncoding=w});
