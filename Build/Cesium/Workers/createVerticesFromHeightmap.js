define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-bddc1162","./Transforms-43808565","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./AttributeCompression-9fc99391","./IntersectionTests-60a97ecf","./Plane-c946480f","./WebMercatorProjection-df58d479","./createTaskProcessorWorker","./EllipsoidTangentPlane-9a2d3381","./OrientedBoundingBox-9c6c4bfe","./TerrainEncoding-a1538d1e"],function(Ye,e,We,Xe,Ze,n,t,a,i,r,s,je,l,Ge,qe,Qe){"use strict";var o=Object.freeze({NONE:0,LERC:1}),Je={};Je.DEFAULT_STRUCTURE=Object.freeze({heightScale:1,heightOffset:0,elementsPerHeight:1,stride:1,elementMultiplier:256,isBigEndian:!1});var Ke=new Xe.Cartesian3,$e=new Ze.Matrix4,et=new Xe.Cartesian3,tt=new Xe.Cartesian3;Je.computeVertices=function(e){var t,a,i,r=Math.cos,n=Math.sin,s=Math.sqrt,l=Math.atan,o=Math.exp,f=We.CesiumMath.PI_OVER_TWO,u=We.CesiumMath.toRadians,c=e.heightmap,d=e.width,h=e.height,m=e.skirtHeight,g=Ye.defaultValue(e.isGeographic,!0),p=Ye.defaultValue(e.ellipsoid,Xe.Ellipsoid.WGS84),w=1/p.maximumRadius,x=e.nativeRectangle,k=e.rectangle,y=Ye.defined(k)?(t=k.west,a=k.south,i=k.east,k.north):g?(t=u(x.west),a=u(x.south),i=u(x.east),u(x.north)):(t=x.west*w,a=f-2*l(o(-x.south*w)),i=x.east*w,f-2*l(o(-x.north*w))),I=e.relativeToCenter,b=Ye.defined(I),I=b?I:Xe.Cartesian3.ZERO,U=Ye.defaultValue(e.exaggeration,1),v=Ye.defaultValue(e.includeWebMercatorT,!1),T=Ye.defaultValue(e.structure,Je.DEFAULT_STRUCTURE),M=Ye.defaultValue(T.heightScale,Je.DEFAULT_STRUCTURE.heightScale),V=Ye.defaultValue(T.heightOffset,Je.DEFAULT_STRUCTURE.heightOffset),A=Ye.defaultValue(T.elementsPerHeight,Je.DEFAULT_STRUCTURE.elementsPerHeight),B=Ye.defaultValue(T.stride,Je.DEFAULT_STRUCTURE.stride),D=Ye.defaultValue(T.elementMultiplier,Je.DEFAULT_STRUCTURE.elementMultiplier),S=Ye.defaultValue(T.isBigEndian,Je.DEFAULT_STRUCTURE.isBigEndian),P=Xe.Rectangle.computeWidth(x),E=Xe.Rectangle.computeHeight(x),C=P/(d-1),F=E/(h-1);g||(P*=w,E*=w);var L,O,N=p.radiiSquared,z=N.x,R=N.y,_=N.z,H=65536,Y=-65536,W=Ze.Transforms.eastNorthUpToFixedFrame(I,p),X=Ze.Matrix4.inverseTransformation(W,$e);v&&(L=je.WebMercatorProjection.geodeticLatitudeToMercatorAngle(a),O=1/(je.WebMercatorProjection.geodeticLatitudeToMercatorAngle(y)-L));var Z=et;Z.x=Number.POSITIVE_INFINITY,Z.y=Number.POSITIVE_INFINITY,Z.z=Number.POSITIVE_INFINITY;var j=tt;j.x=Number.NEGATIVE_INFINITY,j.y=Number.NEGATIVE_INFINITY,j.z=Number.NEGATIVE_INFINITY;var G=Number.POSITIVE_INFINITY,q=d*h,Q=q+(0<m?2*d+2*h:0),J=new Array(Q),K=new Array(Q),$=new Array(Q),ee=v?new Array(Q):[],te=0,ae=h,ie=0,re=d;0<m&&(--te,++ae,--ie,++re);for(var ne=te;ne<ae;++ne){var se=ne;se<0&&(se=0),h<=se&&(se=h-1);var le=x.north-F*se,oe=((le=g?u(le):f-2*l(o(-le*w)))-a)/(y-a),oe=We.CesiumMath.clamp(oe,0,1),fe=ne===te,ue=ne===ae-1;0<m&&(fe?le+=1e-5*E:ue&&(le-=1e-5*E));var ce,de=r(le),he=n(le),me=_*he;v&&(ce=(je.WebMercatorProjection.geodeticLatitudeToMercatorAngle(le)-L)*O);for(var ge=ie;ge<re;++ge){var pe=ge;pe<0&&(pe=0),d<=pe&&(pe=d-1);var we=se*(d*B)+pe*B;if(1===A)ke=c[we];else{var xe,ke=0;if(S)for(xe=0;xe<A;++xe)ke=ke*D+c[we+xe];else for(xe=A-1;0<=xe;--xe)ke=ke*D+c[we+xe]}ke=(ke*M+V)*U,Y=Math.max(Y,ke),H=Math.min(H,ke);var ye=x.west+C*pe;g?ye=u(ye):ye*=w;var Ie=(ye-t)/(i-t),Ie=We.CesiumMath.clamp(Ie,0,1),be=se*d+pe;if(0<m){var Ue=ge===ie,ve=ge===re-1,Te=fe||ue||Ue||ve;if((fe||ue)&&(Ue||ve))continue;Te&&(ke-=m,Ue?(be=h-se-1+q,ye-=1e-5*P):ue?be=q+h+(d-pe-1):ve?(be=q+h+d+se,ye+=1e-5*P):fe&&(be=q+h+d+h+pe))}var Me=de*r(ye),Ve=de*n(ye),Ae=z*Me,Be=R*Ve,De=1/s(Ae*Me+Be*Ve+me*he),Se=Ae*De,Pe=Be*De,Ee=me*De,Ce=new Xe.Cartesian3;Ce.x=Se+Me*ke,Ce.y=Pe+Ve*ke,Ce.z=Ee+he*ke,J[be]=Ce,K[be]=ke,$[be]=new Xe.Cartesian2(Ie,oe),v&&(ee[be]=ce),Ze.Matrix4.multiplyByPoint(X,Ce,Ke),Xe.Cartesian3.minimumByComponent(Ke,Z,Z),Xe.Cartesian3.maximumByComponent(Ke,j,j),G=Math.min(G,ke)}}var Fe,Le,Oe=Ze.BoundingSphere.fromPoints(J);Ye.defined(k)&&(Fe=qe.OrientedBoundingBox.fromRectangle(k,H,Y,p)),b&&(Le=new Qe.EllipsoidalOccluder(p).computeHorizonCullingPointPossiblyUnderEllipsoid(I,J,H));for(var Ne=new Ge.AxisAlignedBoundingBox(Z,j,I),ze=new Qe.TerrainEncoding(Ne,G,Y,W,!1,v),Re=new Float32Array(Q*ze.getStride()),_e=0,He=0;He<Q;++He)_e=ze.encode(Re,_e,J[He],$[He],K[He],void 0,ee[He]);return{vertices:Re,maximumHeight:Y,minimumHeight:H,encoding:ze,boundingSphere3D:Oe,orientedBoundingBox:Fe,occludeePointInScaledSpace:Le}};var f,u,c,d,h,B,V,A,D,S,P,E,R,C,m,g,x,k,y,p,w={};f={defaultNoDataValue:-34027999387901484e22,decode:function(e,t){var a=(t=t||{}).encodedMaskData||null===t.encodedMaskData,i=h(e,t.inputOffset||0,a),r=null!==t.noDataValue?t.noDataValue:f.defaultNoDataValue,n=u(i,t.pixelType||Float32Array,t.encodedMaskData,r,t.returnMask),s={width:i.width,height:i.height,pixelData:n.resultPixels,minValue:n.minValue,maxValue:i.pixels.maxValue,noDataValue:r};return n.resultMask&&(s.maskData=n.resultMask),t.returnEncodedMask&&i.mask&&(s.encodedMaskData=i.mask.bitset?i.mask.bitset:null),t.returnFileInfo&&(s.fileInfo=c(i),t.computeUsedBitDepths&&(s.fileInfo.bitDepths=d(i))),s}},u=function(e,t,a,i,r){var n,s,l,o=0,f=e.pixels.numBlocksX,u=e.pixels.numBlocksY,c=Math.floor(e.width/f),d=Math.floor(e.height/u),h=2*e.maxZError,m=Number.MAX_VALUE;a=a||(e.mask?e.mask.bitset:null),s=new t(e.width*e.height),r&&a&&(l=new Uint8Array(e.width*e.height));for(var g,p,w=new Float32Array(c*d),x=0;x<=u;x++){var k=x!==u?d:e.height%u;if(0!==k)for(var y=0;y<=f;y++){var I=y!==f?c:e.width%f;if(0!==I){var b,U,v,T,M=x*e.width*d+y*c,V=e.width-I,A=e.pixels.blocks[o];if(A.encoding<2?(b=0===A.encoding?A.rawData:(B(A.stuffedData,A.bitsPerPixel,A.numValidPixels,A.offset,h,w,e.pixels.maxValue),w),U=0):v=2===A.encoding?0:A.offset,a)for(p=0;p<k;p++){for(7&M&&(T=a[M>>3],T<<=7&M),g=0;g<I;g++)7&M||(T=a[M>>3]),128&T?(l&&(l[M]=1),m=(n=A.encoding<2?b[U++]:v)<m?n:m,s[M++]=n):(l&&(l[M]=0),s[M++]=i),T<<=1;M+=V}else if(A.encoding<2)for(p=0;p<k;p++){for(g=0;g<I;g++)m=(n=b[U++])<m?n:m,s[M++]=n;M+=V}else for(m=v<m?v:m,p=0;p<k;p++){for(g=0;g<I;g++)s[M++]=v;M+=V}if(1===A.encoding&&U!==A.numValidPixels)throw"Block and Mask do not match";o++}}}return{resultPixels:s,resultMask:l,minValue:m}},c=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,noDataValue:e.noDataValue}}},d=function(e){for(var t=e.pixels.numBlocksX*e.pixels.numBlocksY,a={},i=0;i<t;i++){var r=e.pixels.blocks[i];0===r.encoding?a.float32=!0:1===r.encoding?a[r.bitsPerPixel]=!0:a[0]=!0}return Object.keys(a)},h=function(e,t,a){var i={},r=new Uint8Array(e,t,10);if(i.fileIdentifierString=String.fromCharCode.apply(null,r),"CntZImage"!==i.fileIdentifierString.trim())throw"Unexpected file identifier string: "+i.fileIdentifierString;t+=10;var n=new DataView(e,t,24);if(i.fileVersion=n.getInt32(0,!0),i.imageType=n.getInt32(4,!0),i.height=n.getUint32(8,!0),i.width=n.getUint32(12,!0),i.maxZError=n.getFloat64(16,!0),t+=24,!a)if(n=new DataView(e,t,16),i.mask={},i.mask.numBlocksY=n.getUint32(0,!0),i.mask.numBlocksX=n.getUint32(4,!0),i.mask.numBytes=n.getUint32(8,!0),i.mask.maxValue=n.getFloat32(12,!0),t+=16,0<i.mask.numBytes){var s=new Uint8Array(Math.ceil(i.width*i.height/8)),l=(n=new DataView(e,t,i.mask.numBytes)).getInt16(0,!0),o=2,f=0;do{if(0<l)for(;l--;)s[f++]=n.getUint8(o++);else for(var u=n.getUint8(o++),l=-l;l--;)s[f++]=u;l=n.getInt16(o,!0),o+=2}while(o<i.mask.numBytes);if(-32768!==l||f<s.length)throw"Unexpected end of mask RLE encoding";i.mask.bitset=s,t+=i.mask.numBytes}else 0==(i.mask.numBytes|i.mask.numBlocksY|i.mask.maxValue)&&(i.mask.bitset=new Uint8Array(Math.ceil(i.width*i.height/8)));n=new DataView(e,t,16),i.pixels={},i.pixels.numBlocksY=n.getUint32(0,!0),i.pixels.numBlocksX=n.getUint32(4,!0),i.pixels.numBytes=n.getUint32(8,!0),i.pixels.maxValue=n.getFloat32(12,!0),t+=16;var c=i.pixels.numBlocksX,d=i.pixels.numBlocksY,h=c+(0<i.width%c?1:0),m=d+(0<i.height%d?1:0);i.pixels.blocks=new Array(h*m);for(var g=0,p=0;p<m;p++)for(var w=0;w<h;w++){var x=0,k=e.byteLength-t;n=new DataView(e,t,Math.min(10,k));var y={};i.pixels.blocks[g++]=y;var I,b,U,v=n.getUint8(0);if(x++,y.encoding=63&v,3<y.encoding)throw"Invalid block encoding ("+y.encoding+")";if(2!==y.encoding){if(0!==v&&2!==v){if(v>>=6,2===(y.offsetType=v))y.offset=n.getInt8(1),x++;else if(1===v)y.offset=n.getInt16(1,!0),x+=2;else{if(0!==v)throw"Invalid block offset type";y.offset=n.getFloat32(1,!0),x+=4}if(1===y.encoding)if(v=n.getUint8(x),x++,y.bitsPerPixel=63&v,v>>=6,2===(y.numValidPixelsType=v))y.numValidPixels=n.getUint8(x),x++;else if(1===v)y.numValidPixels=n.getUint16(x,!0),x+=2;else{if(0!==v)throw"Invalid valid pixel count type";y.numValidPixels=n.getUint32(x,!0),x+=4}}if(t+=x,3!==y.encoding)if(0===y.encoding){var T=(i.pixels.numBytes-1)/4;if(T!==Math.floor(T))throw"uncompressed block has invalid length";U=new ArrayBuffer(4*T),new Uint8Array(U).set(new Uint8Array(e,t,4*T));var M=new Float32Array(U);y.rawData=M,t+=4*T}else{1===y.encoding&&(I=Math.ceil(y.numValidPixels*y.bitsPerPixel/8),b=Math.ceil(I/4),U=new ArrayBuffer(4*b),new Uint8Array(U).set(new Uint8Array(e,t,I)),y.stuffedData=new Uint32Array(U),t+=I)}}else t++}return i.eofOffset=t,i},B=function(e,t,a,i,r,n,s){var l,o,f,u,c=(1<<t)-1,d=0,h=0,m=Math.ceil((s-i)/r),g=4*e.length-Math.ceil(t*a/8);for(e[e.length-1]<<=8*g,l=0;l<a;l++){0===h&&(u=e[d++],h=32),t<=h?(f=u>>>h-t&c,h-=t):(f=(u&c)<<(o=t-h)&c,f+=(u=e[d++])>>>(h=32-o)),n[l]=f<m?i+f*r:s}return n},x=f,V=function(e,t,a,i,r,n,s,l){var o,f,u,c,d,h=(1<<a)-1,m=0,g=0,p=4*e.length-Math.ceil(a*i/8);if(e[e.length-1]<<=8*p,r)for(o=0;o<i;o++)0===g&&(u=e[m++],g=32),a<=g?(f=u>>>g-a&h,g-=a):(f=(u&h)<<(c=a-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=r[f];else for(d=Math.ceil((l-n)/s),o=0;o<i;o++)0===g&&(u=e[m++],g=32),a<=g?(f=u>>>g-a&h,g-=a):(f=(u&h)<<(c=a-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=f<d?n+f*s:l},A=function(e,t,a,i,r,n){var s,l=(1<<t)-1,o=0,f=0,u=0,c=0,d=0,h=[],m=4*e.length-Math.ceil(t*a/8);e[e.length-1]<<=8*m;for(var g=Math.ceil((n-i)/r),f=0;f<a;f++)0===c&&(s=e[o++],c=32),t<=c?(d=s>>>c-t&l,c-=t):(d=(s&l)<<(u=t-c)&l,d+=(s=e[o++])>>>(c=32-u)),h[f]=d<g?i+d*r:n;return h.unshift(i),h},D=function(e,t,a,i,r,n,s,l){var o,f,u,c=(1<<a)-1,d=0,h=0,m=0;if(r)for(p=0;p<i;p++)0===h&&(f=e[d++],h=32,m=0),a<=h?(o=f>>>m&c,h-=a,m+=a):(o=f>>>m&c,h=32-(u=a-h),o|=((f=e[d++])&(1<<u)-1)<<a-u,m=u),t[p]=r[o];else for(var g=Math.ceil((l-n)/s),p=0;p<i;p++)0===h&&(f=e[d++],h=32,m=0),a<=h?(o=f>>>m&c,h-=a,m+=a):(o=f>>>m&c,h=32-(u=a-h),o|=((f=e[d++])&(1<<u)-1)<<a-u,m=u),t[p]=o<g?n+o*s:l;return t},S=function(e,t,a,i,r,n){for(var s,l=(1<<t)-1,o=0,f=0,u=0,c=0,d=0,h=0,m=[],g=Math.ceil((n-i)/r),f=0;f<a;f++)0===c&&(s=e[o++],c=32,h=0),t<=c?(d=s>>>h&l,c-=t,h+=t):(d=s>>>h&l,c=32-(u=t-c),d|=((s=e[o++])&(1<<u)-1)<<t-u,h=u),m[f]=d<g?i+d*r:n;return m.unshift(i),m},P=function(e,t,a,i){var r,n,s,l,o=(1<<a)-1,f=0,u=0,c=4*e.length-Math.ceil(a*i/8);for(e[e.length-1]<<=8*c,r=0;r<i;r++)0===u&&(s=e[f++],u=32),a<=u?(n=s>>>u-a&o,u-=a):(n=(s&o)<<(l=a-u)&o,n+=(s=e[f++])>>>(u=32-l)),t[r]=n;return t},E=function(e,t,a,i){for(var r,n,s,l=(1<<a)-1,o=0,f=0,u=0,c=0;c<i;c++)0===f&&(n=e[o++],f=32,u=0),a<=f?(r=n>>>u&l,f-=a,u+=a):(r=n>>>u&l,f=32-(s=a-f),r|=((n=e[o++])&(1<<s)-1)<<a-s,u=s),t[c]=r;return t},R={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var t=65535,a=65535,i=e.length,r=Math.floor(i/2),n=0;r;){var s=359<=r?359:r;for(r-=s;t+=e[n++]<<8,a+=t+=e[n++],--s;);t=(65535&t)+(t>>>16),a=(65535&a)+(a>>>16)}return 1&i&&(a+=t+=e[n]<<8),((a=(65535&a)+(a>>>16))<<16|(t=(65535&t)+(t>>>16)))>>>0},readHeaderInfo:function(e,t){var a=t.ptr,i=new Uint8Array(e,a,6),r={};if(r.fileIdentifierString=String.fromCharCode.apply(null,i),0!==r.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+r.fileIdentifierString;a+=6;var n,s=new DataView(e,a,8),l=s.getInt32(0,!0);if(a+=4,3<=(r.fileVersion=l)&&(r.checksum=s.getUint32(4,!0),a+=4),s=new DataView(e,a,12),r.height=s.getUint32(0,!0),r.width=s.getUint32(4,!0),a+=8,4<=l?(r.numDims=s.getUint32(8,!0),a+=4):r.numDims=1,s=new DataView(e,a,40),r.numValidPixel=s.getUint32(0,!0),r.microBlockSize=s.getInt32(4,!0),r.blobSize=s.getInt32(8,!0),r.imageType=s.getInt32(12,!0),r.maxZError=s.getFloat64(16,!0),r.zMin=s.getFloat64(24,!0),r.zMax=s.getFloat64(32,!0),a+=40,t.headerInfo=r,t.ptr=a,3<=l&&(n=4<=l?52:48,this.computeChecksumFletcher32(new Uint8Array(e,a-n,r.blobSize-14))!==r.checksum))throw"Checksum failed.";return!0},checkMinMaxRanges:function(e,t){var a=t.headerInfo,i=this.getDataTypeArray(a.imageType),r=a.numDims*this.getDataTypeSize(a.imageType),n=this.readSubArray(e,t.ptr,i,r),s=this.readSubArray(e,t.ptr+r,i,r);t.ptr+=2*r;for(var l=!0,o=0;o<a.numDims;o++)if(n[o]!==s[o]){l=!1;break}return a.minValues=n,a.maxValues=s,l},readSubArray:function(e,t,a,i){var r,n=a===Uint8Array?new Uint8Array(e,t,i):(r=new ArrayBuffer(i),new Uint8Array(r).set(new Uint8Array(e,t,i)),new a(r));return n},readMask:function(e,t){var a,i,r=t.ptr,n=t.headerInfo,s=n.width*n.height,l=n.numValidPixel,o=new DataView(e,r,4),f={};if(f.numBytes=o.getUint32(0,!0),r+=4,(0===l||s===l)&&0!==f.numBytes)throw"invalid mask";if(0===l)a=new Uint8Array(Math.ceil(s/8)),f.bitset=a,i=new Uint8Array(s),t.pixels.resultMask=i,r+=f.numBytes;else if(0<f.numBytes){a=new Uint8Array(Math.ceil(s/8));var u=(o=new DataView(e,r,f.numBytes)).getInt16(0,!0),c=2,d=0,h=0;do{if(0<u)for(;u--;)a[d++]=o.getUint8(c++);else for(h=o.getUint8(c++),u=-u;u--;)a[d++]=h;u=o.getInt16(c,!0),c+=2}while(c<f.numBytes);if(-32768!==u||d<a.length)throw"Unexpected end of mask RLE encoding";i=new Uint8Array(s);for(var m=0,g=0,g=0;g<s;g++)7&g?(m=a[g>>3],m<<=7&g):m=a[g>>3],128&m&&(i[g]=1);t.pixels.resultMask=i,f.bitset=a,r+=f.numBytes}return t.ptr=r,t.mask=f,!0},readDataOneSweep:function(e,t,a){var i,r=t.ptr,n=t.headerInfo,s=n.numDims,l=n.width*n.height,o=n.imageType,f=n.numValidPixel*R.getDataTypeSize(o)*s,u=t.pixels.resultMask,c=a===Uint8Array?new Uint8Array(e,r,f):(i=new ArrayBuffer(f),new Uint8Array(i).set(new Uint8Array(e,r,f)),new a(i));if(c.length===l*s)t.pixels.resultPixels=c;else{t.pixels.resultPixels=new a(l*s);var d=0,h=0,m=0,g=0;if(1<s)for(m=0;m<s;m++)for(g=m*l,h=0;h<l;h++)u[h]&&(t.pixels.resultPixels[g+h]=c[d++]);else for(h=0;h<l;h++)u[h]&&(t.pixels.resultPixels[h]=c[d++])}return r+=f,t.ptr=r,!0},readHuffmanTree:function(e,t){var a=this.HUFFMAN_LUT_BITS_MAX,i=new DataView(e,t.ptr,16);if(t.ptr+=16,i.getInt32(0,!0)<2)throw"unsupported Huffman version";var r=i.getInt32(4,!0),n=i.getInt32(8,!0),s=i.getInt32(12,!0);if(s<=n)return!1;var l=new Uint32Array(s-n);R.decodeBits(e,t,l);for(var o,f,u,c=[],d=n;d<s;d++)c[o=d-(d<r?0:r)]={first:l[d-n],second:null};var h=e.byteLength-t.ptr,m=Math.ceil(h/4),g=new ArrayBuffer(4*m);new Uint8Array(g).set(new Uint8Array(e,t.ptr,h));var p=new Uint32Array(g),w=0,x=0,k=p[0];for(d=n;d<s;d++)0<(u=c[o=d-(d<r?0:r)].first)&&(c[o].second=k<<w>>>32-u,u<=32-w?32===(w+=u)&&(w=0,k=p[++x]):(w+=u-32,k=p[++x],c[o].second|=k>>>32-w));var y=0,I=0,b=new C;for(d=0;d<c.length;d++)void 0!==c[d]&&(y=Math.max(y,c[d].first));I=a<=y?a:y,30<=y&&console.log("WARning, large NUM LUT BITS IS "+y);var U,v,T,M,V,A=[];for(d=n;d<s;d++)if(0<(u=c[o=d-(d<r?0:r)].first))if(U=[u,o],u<=I)for(v=c[o].second<<I-u,T=1<<I-u,f=0;f<T;f++)A[v|f]=U;else for(v=c[o].second,V=b,M=u-1;0<=M;M--)V=v>>>M&1?(V.right||(V.right=new C),V.right):(V.left||(V.left=new C),V.left),0!==M||V.val||(V.val=U[1]);return{decodeLut:A,numBitsLUTQick:I,numBitsLUT:y,tree:b,stuffedData:p,srcPtr:x,bitPos:w}},readHuffman:function(e,t,a){var i,r,n,s,l,o,f,u,c,d=t.headerInfo,h=d.numDims,m=t.headerInfo.height,g=t.headerInfo.width,p=g*m,w=this.readHuffmanTree(e,t),x=w.decodeLut,k=w.tree,y=w.stuffedData,I=w.srcPtr,b=w.bitPos,U=w.numBitsLUTQick,v=w.numBitsLUT,T=0===t.headerInfo.imageType?128:0,M=t.pixels.resultMask,V=0;0<b&&(I++,b=0);for(var A=y[I],B=1===t.encodeMode,D=new a(p*h),S=D,P=0;P<d.numDims;P++){if(1<h&&(S=new a(D.buffer,p*P,p),V=0),t.headerInfo.numValidPixel===g*m)for(o=u=0;o<m;o++)for(f=0;f<g;f++,u++){if(r=0,l=s=A<<b>>>32-U,32-b<U&&(l=s|=y[I+1]>>>64-b-U),x[l])r=x[l][1],b+=x[l][0];else for(l=s=A<<b>>>32-v,32-b<v&&(l=s|=y[I+1]>>>64-b-v),i=k,c=0;c<v;c++)if(!(i=s>>>v-c-1&1?i.right:i.left).left&&!i.right){r=i.val,b=b+c+1;break}32<=b&&(b-=32,A=y[++I]),n=r-T,B?(n+=!(0<f)&&0<o?S[u-g]:V,n&=255,V=S[u]=n):S[u]=n}else for(o=u=0;o<m;o++)for(f=0;f<g;f++,u++)if(M[u]){if(r=0,l=s=A<<b>>>32-U,32-b<U&&(l=s|=y[I+1]>>>64-b-U),x[l])r=x[l][1],b+=x[l][0];else for(l=s=A<<b>>>32-v,32-b<v&&(l=s|=y[I+1]>>>64-b-v),i=k,c=0;c<v;c++)if(!(i=s>>>v-c-1&1?i.right:i.left).left&&!i.right){r=i.val,b=b+c+1;break}32<=b&&(b-=32,A=y[++I]),n=r-T,B?(!(0<f&&M[u-1])&&0<o&&M[u-g]?n+=S[u-g]:n+=V,n&=255,V=S[u]=n):S[u]=n}t.ptr=t.ptr+4*(I+1)+(0<b?4:0)}t.pixels.resultPixels=D},decodeBits:function(e,t,a,i,r){var n=t.headerInfo,s=n.fileVersion,l=0,o=5<=e.byteLength-t.ptr?5:e.byteLength-t.ptr,f=new DataView(e,t.ptr,o),u=f.getUint8(0);l++;var c=u>>6,d=0==c?4:3-c,h=0<(32&u),m=31&u,g=0;if(1==d)g=f.getUint8(l),l++;else if(2==d)g=f.getUint16(l,!0),l+=2;else{if(4!=d)throw"Invalid valid pixel count type";g=f.getUint32(l,!0),l+=4}var p,w,x,k,y,I,b,U,v,T=2*n.maxZError,M=1<n.numDims?n.maxValues[r]:n.zMax;if(h){for(t.counter.lut++,U=f.getUint8(l),l++,k=Math.ceil((U-1)*m/8),y=Math.ceil(k/4),w=new ArrayBuffer(4*y),x=new Uint8Array(w),t.ptr+=l,x.set(new Uint8Array(e,t.ptr,k)),b=new Uint32Array(w),t.ptr+=k,v=0;U-1>>>v;)v++;k=Math.ceil(g*v/8),y=Math.ceil(k/4),w=new ArrayBuffer(4*y),(x=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,k)),p=new Uint32Array(w),t.ptr+=k,I=(3<=s?S:A)(b,m,U-1,i,T,M),(3<=s?D:V)(p,a,v,g,I)}else t.counter.bitstuffer++,v=m,t.ptr+=l,0<v&&(k=Math.ceil(g*v/8),y=Math.ceil(k/4),w=new ArrayBuffer(4*y),(x=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,k)),p=new Uint32Array(w),t.ptr+=k,3<=s?null===i?E(p,a,v,g):D(p,a,v,g,!1,i,T,M):null===i?P(p,a,v,g):V(p,a,v,g,!1,i,T,M))},readTiles:function(e,t,a){var i=t.headerInfo,r=i.width,n=i.height,s=i.microBlockSize,l=i.imageType,o=R.getDataTypeSize(l),f=Math.ceil(r/s),u=Math.ceil(n/s);t.pixels.numBlocksY=u,t.pixels.numBlocksX=f;for(var c,d,h,m,g,p,w,x,k=t.pixels.ptr=0,y=0,I=0,b=0,U=0,v=0,T=0,M=0,V=0,A=0,B=0,D=0,S=0,P=0,E=0,C=new a(s*s),F=n%s||s,L=r%s||s,O=i.numDims,N=t.pixels.resultMask,z=t.pixels.resultPixels,I=0;I<u;I++)for(U=I!==u-1?s:F,b=0;b<f;b++)for(A=I*r*s+b*s,B=r-(v=b!==f-1?s:L),x=0;x<O;x++){if(1<O&&(z=new a(t.pixels.resultPixels.buffer,r*n*x*o,r*n)),T=e.byteLength-t.ptr,d={},E=0,E++,V=(M=(c=new DataView(e,t.ptr,Math.min(10,T))).getUint8(0))>>6&255,(M>>2&15)!==(b*s>>3&15))throw"integrity issue";if(3<(g=3&M))throw t.ptr+=E,"Invalid block encoding ("+g+")";if(2!=g)if(0==g){if(t.counter.uncompressed++,t.ptr+=E,D=(D=U*v*o)<(S=e.byteLength-t.ptr)?D:S,h=new ArrayBuffer(D%o==0?D:D+o-D%o),new Uint8Array(h).set(new Uint8Array(e,t.ptr,D)),m=new a(h),P=0,N)for(k=0;k<U;k++){for(y=0;y<v;y++)N[A]&&(z[A]=m[P++]),A++;A+=B}else for(k=0;k<U;k++){for(y=0;y<v;y++)z[A++]=m[P++];A+=B}t.ptr+=P*o}else if(p=R.getDataTypeUsed(l,V),w=R.getOnePixel(d,E,p,c),E+=R.getDataTypeSize(p),3==g)if(t.ptr+=E,t.counter.constantoffset++,N)for(k=0;k<U;k++){for(y=0;y<v;y++)N[A]&&(z[A]=w),A++;A+=B}else for(k=0;k<U;k++){for(y=0;y<v;y++)z[A++]=w;A+=B}else if(t.ptr+=E,R.decodeBits(e,t,C,w,x),E=0,N)for(k=0;k<U;k++){for(y=0;y<v;y++)N[A]&&(z[A]=C[E++]),A++;A+=B}else for(k=0;k<U;k++){for(y=0;y<v;y++)z[A++]=C[E++];A+=B}else t.counter.constant++,t.ptr+=E}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:R.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var t=e.headerInfo.zMax,a=e.headerInfo.numDims,i=e.headerInfo.height*e.headerInfo.width,r=i*a,n=0,s=0,l=0,o=e.pixels.resultMask;if(o)if(1<a)for(n=0;n<a;n++)for(l=n*i,s=0;s<i;s++)o[s]&&(e.pixels.resultPixels[l+s]=t);else for(s=0;s<i;s++)o[s]&&(e.pixels.resultPixels[s]=t);else if(e.pixels.resultPixels.fill)e.pixels.resultPixels.fill(t);else for(s=0;s<r;s++)e.pixels.resultPixels[s]=t},getDataTypeArray:function(e){var t;switch(e){case 0:t=Int8Array;break;case 1:t=Uint8Array;break;case 2:t=Int16Array;break;case 3:t=Uint16Array;break;case 4:t=Int32Array;break;case 5:t=Uint32Array;break;case 6:t=Float32Array;break;case 7:t=Float64Array;break;default:t=Float32Array}return t},getPixelType:function(e){var t;switch(e){case 0:t="S8";break;case 1:t="U8";break;case 2:t="S16";break;case 3:t="U16";break;case 4:t="S32";break;case 5:t="U32";break;case 6:t="F32";break;case 7:t="F64";break;default:t="F32"}return t},isValidPixelValue:function(e,t){if(null===t)return!1;var a;switch(e){case 0:a=-128<=t&&t<=127;break;case 1:a=0<=t&&t<=255;break;case 2:a=-32768<=t&&t<=32767;break;case 3:a=0<=t&&t<=65536;break;case 4:a=-2147483648<=t&&t<=2147483647;break;case 5:a=0<=t&&t<=4294967296;break;case 6:a=-34027999387901484e22<=t&&t<=34027999387901484e22;break;case 7:a=5e-324<=t&&t<=17976931348623157e292;break;default:a=!1}return a},getDataTypeSize:function(e){var t=0;switch(e){case 0:case 1:t=1;break;case 2:case 3:t=2;break;case 4:case 5:case 6:t=4;break;case 7:t=8;break;default:t=e}return t},getDataTypeUsed:function(e,t){var a=e;switch(e){case 2:case 4:a=e-t;break;case 3:case 5:a=e-2*t;break;case 6:a=0===t?e:1===t?2:1;break;case 7:a=0===t?e:e-2*t+1;break;default:a=e}return a},getOnePixel:function(e,t,a,i){var r=0;switch(a){case 0:r=i.getInt8(t);break;case 1:r=i.getUint8(t);break;case 2:r=i.getInt16(t,!0);break;case 3:r=i.getUint16(t,!0);break;case 4:r=i.getInt32(t,!0);break;case 5:r=i.getUInt32(t,!0);break;case 6:r=i.getFloat32(t,!0);break;case 7:r=i.getFloat64(t,!0);break;default:throw"the decoder does not understand this pixel type"}return r}},C=function(e,t,a){this.val=e,this.left=t,this.right=a},k={decode:function(e,t){var a=(t=t||{}).noDataValue,i=0,r={};if(r.ptr=t.inputOffset||0,r.pixels={},R.readHeaderInfo(e,r)){var n=r.headerInfo,s=n.fileVersion,l=R.getDataTypeArray(n.imageType);R.readMask(e,r),n.numValidPixel===n.width*n.height||r.pixels.resultMask||(r.pixels.resultMask=t.maskData);var o,f=n.width*n.height;if(r.pixels.resultPixels=new l(f*n.numDims),r.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==n.numValidPixel)if(n.zMax===n.zMin)R.constructConstantSurface(r);else if(4<=s&&R.checkMinMaxRanges(e,r))R.constructConstantSurface(r);else{var u=new DataView(e,r.ptr,2),c=u.getUint8(0);if(r.ptr++,c)R.readDataOneSweep(e,r,l);else if(1<s&&n.imageType<=1&&Math.abs(n.maxZError-.5)<1e-5){var d=u.getUint8(1);if(r.ptr++,2<(r.encodeMode=d)||s<4&&1<d)throw"Invalid Huffman flag "+d;d?R.readHuffman(e,r,l):R.readTiles(e,r,l)}else R.readTiles(e,r,l)}r.eofOffset=r.ptr,t.inputOffset?(o=r.headerInfo.blobSize+t.inputOffset-r.ptr,1<=Math.abs(o)&&(r.eofOffset=t.inputOffset+r.headerInfo.blobSize)):(o=r.headerInfo.blobSize-r.ptr,1<=Math.abs(o)&&(r.eofOffset=r.headerInfo.blobSize));var h={width:n.width,height:n.height,pixelData:r.pixels.resultPixels,minValue:n.zMin,maxValue:n.zMax,validPixelCount:n.numValidPixel,dimCount:n.numDims,dimStats:{minValues:n.minValues,maxValues:n.maxValues},maskData:r.pixels.resultMask};if(r.pixels.resultMask&&R.isValidPixelValue(n.imageType,a)){for(var m=r.pixels.resultMask,i=0;i<f;i++)m[i]||(h.pixelData[i]=a);h.noDataValue=a}return r.noDataValue=a,t.returnFileInfo&&(h.fileInfo=R.formatFileInfo(r)),h}},getBandCount:function(e){for(var t=0,a=0,i={ptr:0,pixels:{}};a<e.byteLength-58;)R.readHeaderInfo(e,i),a+=i.headerInfo.blobSize,t++,i.ptr=a;return t}},m=new ArrayBuffer(4),g=new Uint8Array(m),y=(new Uint32Array(m)[0]=1)===g[0],p={decode:function(e,t){if(!y)throw"Big endian system is not supported.";var a,i,r=(t=t||{}).inputOffset||0,n=new Uint8Array(e,r,10),s=String.fromCharCode.apply(null,n);if("CntZImage"===s.trim())a=x,i=1;else{if("Lerc2"!==s.substring(0,5))throw"Unexpected file identifier string: "+s;a=k,i=2}for(var l,o,f,u,c,d,h=0,m=e.byteLength-10,g=[],p={width:0,height:0,pixels:[],pixelType:t.pixelType,mask:null,statistics:[]};r<m;){var w=a.decode(e,{inputOffset:r,encodedMaskData:l,maskData:f,returnMask:0===h,returnEncodedMask:0===h,returnFileInfo:!0,pixelType:t.pixelType||null,noDataValue:t.noDataValue||null}),r=w.fileInfo.eofOffset;0===h&&(l=w.encodedMaskData,f=w.maskData,p.width=w.width,p.height=w.height,p.dimCount=w.dimCount||1,p.pixelType=w.pixelType||w.fileInfo.pixelType,p.mask=w.maskData),1<i&&w.fileInfo.mask&&0<w.fileInfo.mask.numBytes&&g.push(w.maskData),h++,p.pixels.push(w.pixelData),p.statistics.push({minValue:w.minValue,maxValue:w.maxValue,noDataValue:w.noDataValue,dimStats:w.dimStats})}if(1<i&&1<g.length){for(d=p.width*p.height,p.bandMasks=g,(f=new Uint8Array(d)).set(g[0]),u=1;u<g.length;u++)for(o=g[u],c=0;c<d;c++)f[c]=f[c]&o[c];p.maskData=f}return p}},w.Lerc=p;var I=w.Lerc;return l(function(e,t){if(e.encoding===o.LERC){var a;try{a=I.decode(e.heightmap)}catch(e){throw new n.RuntimeError(e)}if(a.statistics[0].minValue===Number.MAX_VALUE)throw new n.RuntimeError("Invalid tile data");e.heightmap=a.pixels[0],e.width=a.width,e.height=a.height}e.ellipsoid=Xe.Ellipsoid.clone(e.ellipsoid),e.rectangle=Xe.Rectangle.clone(e.rectangle);var i=Je.computeVertices(e),r=i.vertices;return t.push(r.buffer),{vertices:r.buffer,numberOfAttributes:i.encoding.getStride(),minimumHeight:i.minimumHeight,maximumHeight:i.maximumHeight,gridWidth:e.width,gridHeight:e.height,boundingSphere3D:i.boundingSphere3D,orientedBoundingBox:i.orientedBoundingBox,occludeePointInScaledSpace:i.occludeePointInScaledSpace,encoding:i.encoding,westIndicesSouthToNorth:i.westIndicesSouthToNorth,southIndicesEastToWest:i.southIndicesEastToWest,eastIndicesNorthToSouth:i.eastIndicesNorthToSouth,northIndicesWestToEast:i.northIndicesWestToEast}})});
