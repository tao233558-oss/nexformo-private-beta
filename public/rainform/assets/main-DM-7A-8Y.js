/*! Rainform © 2026 afterimage · PolyForm Noncommercial 1.0.0 · https://rainform.pages.dev/ *//**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wi={ROTATE:0,DOLLY:1,PAN:2},Xi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cd=0,Hs=1,ud=2,Xc=1,dd=2,Vn=3,mi=0,rn=1,tn=2,hi=0,hn=1,vr=2,Vs=3,Gs=4,Yc=5,si=100,hd=101,fd=102,pd=103,md=104,gd=200,ts=201,vd=202,_d=203,ns=204,is=205,xd=206,Sd=207,Md=208,yd=209,bd=210,Ed=211,wd=212,Ad=213,Td=214,Cd=0,Rd=1,Pd=2,ka=3,Ld=4,Dd=5,Fd=6,Ud=7,qc=0,Id=1,Nd=2,fi=0,Od=1,Bd=2,zd=3,kd=4,Hd=5,Vd=6,Gd=7,$c=300,_r=301,xr=302,rs=303,as=304,no=306,os=1e3,En=1001,ss=1002,nn=1003,Wd=1004,aa=1005,Rt=1006,vo=1007,Ui=1008,gi=1009,Xd=1010,Yd=1011,Ha=1012,Zc=1013,Sr=1014,Xn=1015,Qr=1016,Kc=1017,jc=1018,Mr=1020,qd=35902,$d=1021,Zd=1022,vn=1023,Kd=1024,jd=1025,fr=1026,yr=1027,Jd=1028,Jc=1029,Qd=1030,Qc=1031,eu=1033,_o=33776,xo=33777,So=33778,Mo=33779,Ws=35840,Xs=35841,Ys=35842,qs=35843,$s=36196,Zs=37492,Ks=37496,js=37808,Js=37809,Qs=37810,el=37811,tl=37812,nl=37813,il=37814,rl=37815,al=37816,ol=37817,sl=37818,ll=37819,cl=37820,ul=37821,yo=36492,dl=36494,hl=36495,eh=36283,fl=36284,pl=36285,ml=36286,th=3200,nh=3201,ih=0,rh=1,li="",un="srgb",xi="srgb-linear",xs="display-p3",io="display-p3-linear",Va="linear",dt="srgb",Ga="rec709",Wa="p3",Yi=7680,gl=519,ah=512,oh=513,sh=514,tu=515,lh=516,ch=517,uh=518,dh=519,vl=35044,Bt=35048,_l="300 es",Yn=2e3,Xa=2001;class Hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xl=1234567;const kr=Math.PI/180,Yr=180/Math.PI;function Tr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function Wt(i,e,t){return Math.max(e,Math.min(t,i))}function Ss(i,e){return(i%e+e)%e}function hh(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function fh(i,e,t){return i!==e?(t-i)/(e-i):0}function Hr(i,e,t){return(1-t)*i+t*e}function ph(i,e,t,n){return Hr(i,e,1-Math.exp(-t*n))}function mh(i,e=1){return e-Math.abs(Ss(i,e*2)-e)}function gh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function vh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _h(i,e){return i+Math.floor(Math.random()*(e-i+1))}function xh(i,e){return i+Math.random()*(e-i)}function Sh(i){return i*(.5-Math.random())}function Mh(i){i!==void 0&&(xl=i);let e=xl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yh(i){return i*kr}function bh(i){return i*Yr}function Eh(i){return(i&i-1)===0&&i!==0}function wh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ah(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Th(i,e,t,n,r){const a=Math.cos,s=Math.sin,o=a(t/2),c=s(t/2),l=a((e+n)/2),d=s((e+n)/2),h=a((e-n)/2),f=s((e-n)/2),m=a((n-e)/2),g=s((n-e)/2);switch(r){case"XYX":i.set(o*d,c*h,c*f,o*l);break;case"YZY":i.set(c*f,o*d,c*h,o*l);break;case"ZXZ":i.set(c*h,c*f,o*d,o*l);break;case"XZX":i.set(o*d,c*g,c*m,o*l);break;case"YXY":i.set(c*m,o*d,c*g,o*l);break;case"ZYZ":i.set(c*g,c*m,o*d,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ur(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const vi={DEG2RAD:kr,RAD2DEG:Yr,generateUUID:Tr,clamp:Wt,euclideanModulo:Ss,mapLinear:hh,inverseLerp:fh,lerp:Hr,damp:ph,pingpong:mh,smoothstep:gh,smootherstep:vh,randInt:_h,randFloat:xh,randFloatSpread:Sh,seededRandom:Mh,degToRad:yh,radToDeg:bh,isPowerOfTwo:Eh,ceilPowerOfTwo:wh,floorPowerOfTwo:Ah,setQuaternionFromProperEuler:Th,normalize:qt,denormalize:ur};class Ve{constructor(e=0,t=0){Ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*n-s*r+e.x,this.y=a*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,r,a,s,o,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,c,l)}set(e,t,n,r,a,s,o,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=a,d[5]=c,d[6]=n,d[7]=s,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[3],c=n[6],l=n[1],d=n[4],h=n[7],f=n[2],m=n[5],g=n[8],_=r[0],p=r[3],u=r[6],E=r[1],S=r[4],A=r[7],D=r[2],R=r[5],T=r[8];return a[0]=s*_+o*E+c*D,a[3]=s*p+o*S+c*R,a[6]=s*u+o*A+c*T,a[1]=l*_+d*E+h*D,a[4]=l*p+d*S+h*R,a[7]=l*u+d*A+h*T,a[2]=f*_+m*E+g*D,a[5]=f*p+m*S+g*R,a[8]=f*u+m*A+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*s*d-t*o*l-n*a*d+n*o*c+r*a*l-r*s*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*s-o*l,f=o*c-d*a,m=l*a-s*c,g=t*h+n*f+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*l-d*n)*_,e[2]=(o*n-r*s)*_,e[3]=f*_,e[4]=(d*t-r*c)*_,e[5]=(r*a-o*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(s*t-n*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,s,o){const c=Math.cos(a),l=Math.sin(a);return this.set(n*c,n*l,-n*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(bo.makeScale(e,t)),this}rotate(e){return this.premultiply(bo.makeRotation(-e)),this}translate(e,t){return this.premultiply(bo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bo=new Ke;function nu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ya(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ch(){const i=Ya("canvas");return i.style.display="block",i}const Sl={};function iu(i){i in Sl||(Sl[i]=!0,console.warn(i))}function Rh(i,e,t){return new Promise(function(n,r){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}const Ml=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),yl=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),oa={[xi]:{transfer:Va,primaries:Ga,toReference:i=>i,fromReference:i=>i},[un]:{transfer:dt,primaries:Ga,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[io]:{transfer:Va,primaries:Wa,toReference:i=>i.applyMatrix3(yl),fromReference:i=>i.applyMatrix3(Ml)},[xs]:{transfer:dt,primaries:Wa,toReference:i=>i.convertSRGBToLinear().applyMatrix3(yl),fromReference:i=>i.applyMatrix3(Ml).convertLinearToSRGB()}},Ph=new Set([xi,io]),st={enabled:!0,_workingColorSpace:xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Ph.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=oa[e].toReference,r=oa[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return oa[i].primaries},getTransfer:function(i){return i===li?Va:oa[i].transfer}};function pr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Eo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qi;class Lh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{qi===void 0&&(qi=Ya("canvas")),qi.width=e.width,qi.height=e.height;const n=qi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ya("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=pr(a[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(pr(t[n]/255)*255):t[n]=pr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dh=0;class ru{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=Tr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(wo(r[s].image)):a.push(wo(r[s]))}else a=wo(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function wo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Lh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fh=0;class Xt extends Hi{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,n=En,r=En,a=Rt,s=Ui,o=vn,c=gi,l=Xt.DEFAULT_ANISOTROPY,d=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=Tr(),this.name="",this.source=new ru(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case os:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case ss:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case os:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case ss:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=$c;Xt.DEFAULT_ANISOTROPY=1;class Pt{constructor(e=0,t=0,n=0,r=1){Pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const c=e.elements,l=c[0],d=c[4],h=c[8],f=c[1],m=c[5],g=c[9],_=c[2],p=c[6],u=c[10];if(Math.abs(d-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,A=(m+1)/2,D=(u+1)/2,R=(d+f)/4,T=(h+_)/4,I=(g+p)/4;return S>A&&S>D?S<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(S),r=R/n,a=T/n):A>D?A<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(A),n=R/r,a=I/r):D<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(D),n=T/a,r=I/a),this.set(n,r,a,t),this}let E=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-d)*(f-d));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(h-_)/E,this.z=(f-d)/E,this.w=Math.acos((l+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uh extends Hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Xt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ru(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zn extends Uh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class au extends Xt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ih extends Xt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,s,o){let c=n[r+0],l=n[r+1],d=n[r+2],h=n[r+3];const f=a[s+0],m=a[s+1],g=a[s+2],_=a[s+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==f||l!==m||d!==g){let p=1-o;const u=c*f+l*m+d*g+h*_,E=u>=0?1:-1,S=1-u*u;if(S>Number.EPSILON){const D=Math.sqrt(S),R=Math.atan2(D,u*E);p=Math.sin(p*R)/D,o=Math.sin(o*R)/D}const A=o*E;if(c=c*p+f*A,l=l*p+m*A,d=d*p+g*A,h=h*p+_*A,p===1-o){const D=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=D,l*=D,d*=D,h*=D}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,a,s){const o=n[r],c=n[r+1],l=n[r+2],d=n[r+3],h=a[s],f=a[s+1],m=a[s+2],g=a[s+3];return e[t]=o*g+d*h+c*m-l*f,e[t+1]=c*g+d*f+l*h-o*m,e[t+2]=l*g+d*m+o*f-c*h,e[t+3]=d*g-o*h-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(r/2),h=o(a/2),f=c(n/2),m=c(r/2),g=c(a/2);switch(s){case"XYZ":this._x=f*d*h+l*m*g,this._y=l*m*h-f*d*g,this._z=l*d*g+f*m*h,this._w=l*d*h-f*m*g;break;case"YXZ":this._x=f*d*h+l*m*g,this._y=l*m*h-f*d*g,this._z=l*d*g-f*m*h,this._w=l*d*h+f*m*g;break;case"ZXY":this._x=f*d*h-l*m*g,this._y=l*m*h+f*d*g,this._z=l*d*g+f*m*h,this._w=l*d*h-f*m*g;break;case"ZYX":this._x=f*d*h-l*m*g,this._y=l*m*h+f*d*g,this._z=l*d*g-f*m*h,this._w=l*d*h+f*m*g;break;case"YZX":this._x=f*d*h+l*m*g,this._y=l*m*h+f*d*g,this._z=l*d*g-f*m*h,this._w=l*d*h-f*m*g;break;case"XZY":this._x=f*d*h-l*m*g,this._y=l*m*h-f*d*g,this._z=l*d*g+f*m*h,this._w=l*d*h+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],f=n+o+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-c)*m,this._y=(a-l)*m,this._z=(s-r)*m}else if(n>o&&n>h){const m=2*Math.sqrt(1+n-o-h);this._w=(d-c)/m,this._x=.25*m,this._y=(r+s)/m,this._z=(a+l)/m}else if(o>h){const m=2*Math.sqrt(1+o-n-h);this._w=(a-l)/m,this._x=(r+s)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+h-n-o);this._w=(s-r)/m,this._x=(a+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+s*o+r*l-a*c,this._y=r*d+s*c+a*o-n*l,this._z=a*d+s*l+n*c-r*o,this._w=s*d-n*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,a=this._z,s=this._w;let o=s*e._w+n*e._x+r*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=n,this._y=r,this._z=a,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*s+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*a+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,o),h=Math.sin((1-t)*d)/l,f=Math.sin(t*d)/l;return this._w=s*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=a*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*n),d=2*(o*t-a*r),h=2*(a*n-s*t);return this.x=t+c*l+s*h-o*d,this.y=n+c*d+o*l-a*h,this.z=r+c*h+a*d-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-n*c,this.z=n*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ao.copy(this).projectOnVector(e),this.sub(Ao)}reflect(e){return this.sub(Ao.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ao=new N,bl=new Oi;class Cr{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Sn):Sn.fromBufferAttribute(a,s),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),sa.copy(n.boundingBox)),sa.applyMatrix4(e.matrixWorld),this.union(sa)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fr),la.subVectors(this.max,Fr),$i.subVectors(e.a,Fr),Zi.subVectors(e.b,Fr),Ki.subVectors(e.c,Fr),ti.subVectors(Zi,$i),ni.subVectors(Ki,Zi),bi.subVectors($i,Ki);let t=[0,-ti.z,ti.y,0,-ni.z,ni.y,0,-bi.z,bi.y,ti.z,0,-ti.x,ni.z,0,-ni.x,bi.z,0,-bi.x,-ti.y,ti.x,0,-ni.y,ni.x,0,-bi.y,bi.x,0];return!To(t,$i,Zi,Ki,la)||(t=[1,0,0,0,1,0,0,0,1],!To(t,$i,Zi,Ki,la))?!1:(ca.crossVectors(ti,ni),t=[ca.x,ca.y,ca.z],To(t,$i,Zi,Ki,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Nn=[new N,new N,new N,new N,new N,new N,new N,new N],Sn=new N,sa=new Cr,$i=new N,Zi=new N,Ki=new N,ti=new N,ni=new N,bi=new N,Fr=new N,la=new N,ca=new N,Ei=new N;function To(i,e,t,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){Ei.fromArray(i,a);const o=r.x*Math.abs(Ei.x)+r.y*Math.abs(Ei.y)+r.z*Math.abs(Ei.z),c=e.dot(Ei),l=t.dot(Ei),d=n.dot(Ei);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Nh=new Cr,Ur=new N,Co=new N;class ea{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Nh.setFromPoints(e).getCenter(n);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);const t=Ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ur,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Co.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(Co)),this.expandByPoint(Ur.copy(e.center).sub(Co))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const On=new N,Ro=new N,ua=new N,ii=new N,Po=new N,da=new N,Lo=new N;class ta{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ro.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),ii.copy(this.origin).sub(Ro);const a=e.distanceTo(t)*.5,s=-this.direction.dot(ua),o=ii.dot(this.direction),c=-ii.dot(ua),l=ii.lengthSq(),d=Math.abs(1-s*s);let h,f,m,g;if(d>0)if(h=s*c-o,f=s*o-c,g=a*d,h>=0)if(f>=-g)if(f<=g){const _=1/d;h*=_,f*=_,m=h*(h+s*f+2*o)+f*(s*h+f+2*c)+l}else f=a,h=Math.max(0,-(s*f+o)),m=-h*h+f*(f+2*c)+l;else f=-a,h=Math.max(0,-(s*f+o)),m=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-s*a+o)),f=h>0?-a:Math.min(Math.max(-a,-c),a),m=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-a,-c),a),m=f*(f+2*c)+l):(h=Math.max(0,-(s*a+o)),f=h>0?a:Math.min(Math.max(-a,-c),a),m=-h*h+f*(f+2*c)+l);else f=s>0?-a:a,h=Math.max(0,-(s*f+o)),m=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ro).addScaledVector(ua,f),m}intersectSphere(e,t){On.subVectors(e.center,this.origin);const n=On.dot(this.direction),r=On.dot(On)-n*n,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=n-s,c=n+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,s,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),d>=0?(a=(e.min.y-f.y)*d,s=(e.max.y-f.y)*d):(a=(e.max.y-f.y)*d,s=(e.min.y-f.y)*d),n>s||a>r||((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,n,r,a){Po.subVectors(t,e),da.subVectors(n,e),Lo.crossVectors(Po,da);let s=this.direction.dot(Lo),o;if(s>0){if(r)return null;o=1}else if(s<0)o=-1,s=-s;else return null;ii.subVectors(this.origin,e);const c=o*this.direction.dot(da.crossVectors(ii,da));if(c<0)return null;const l=o*this.direction.dot(Po.cross(ii));if(l<0||c+l>s)return null;const d=-o*ii.dot(Lo);return d<0?null:this.at(d/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,t,n,r,a,s,o,c,l,d,h,f,m,g,_,p){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,c,l,d,h,f,m,g,_,p)}set(e,t,n,r,a,s,o,c,l,d,h,f,m,g,_,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=r,u[1]=a,u[5]=s,u[9]=o,u[13]=c,u[2]=l,u[6]=d,u[10]=h,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ji.setFromMatrixColumn(e,0).length(),a=1/ji.setFromMatrixColumn(e,1).length(),s=1/ji.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,s=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),d=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const f=s*d,m=s*h,g=o*d,_=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=m+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+m*l,t[10]=s*c}else if(e.order==="YXZ"){const f=c*d,m=c*h,g=l*d,_=l*h;t[0]=f+_*o,t[4]=g*o-m,t[8]=s*l,t[1]=s*h,t[5]=s*d,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=s*c}else if(e.order==="ZXY"){const f=c*d,m=c*h,g=l*d,_=l*h;t[0]=f-_*o,t[4]=-s*h,t[8]=g+m*o,t[1]=m+g*o,t[5]=s*d,t[9]=_-f*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const f=s*d,m=s*h,g=o*d,_=o*h;t[0]=c*d,t[4]=g*l-m,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const f=s*c,m=s*l,g=o*c,_=o*l;t[0]=c*d,t[4]=_-f*h,t[8]=g*h+m,t[1]=h,t[5]=s*d,t[9]=-o*d,t[2]=-l*d,t[6]=m*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=s*c,m=s*l,g=o*c,_=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=f*h+_,t[5]=s*d,t[9]=m*h-g,t[2]=g*h-m,t[6]=o*d,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Oh,e,Bh)}lookAt(e,t,n){const r=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),ri.crossVectors(n,ln),ri.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),ri.crossVectors(n,ln)),ri.normalize(),ha.crossVectors(ln,ri),r[0]=ri.x,r[4]=ha.x,r[8]=ln.x,r[1]=ri.y,r[5]=ha.y,r[9]=ln.y,r[2]=ri.z,r[6]=ha.z,r[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[4],c=n[8],l=n[12],d=n[1],h=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],u=n[14],E=n[3],S=n[7],A=n[11],D=n[15],R=r[0],T=r[4],I=r[8],b=r[12],M=r[1],P=r[5],O=r[9],z=r[13],G=r[2],Y=r[6],H=r[10],ne=r[14],k=r[3],de=r[7],ve=r[11],pe=r[15];return a[0]=s*R+o*M+c*G+l*k,a[4]=s*T+o*P+c*Y+l*de,a[8]=s*I+o*O+c*H+l*ve,a[12]=s*b+o*z+c*ne+l*pe,a[1]=d*R+h*M+f*G+m*k,a[5]=d*T+h*P+f*Y+m*de,a[9]=d*I+h*O+f*H+m*ve,a[13]=d*b+h*z+f*ne+m*pe,a[2]=g*R+_*M+p*G+u*k,a[6]=g*T+_*P+p*Y+u*de,a[10]=g*I+_*O+p*H+u*ve,a[14]=g*b+_*z+p*ne+u*pe,a[3]=E*R+S*M+A*G+D*k,a[7]=E*T+S*P+A*Y+D*de,a[11]=E*I+S*O+A*H+D*ve,a[15]=E*b+S*z+A*ne+D*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],u=e[15];return g*(+a*c*h-r*l*h-a*o*f+n*l*f+r*o*m-n*c*m)+_*(+t*c*m-t*l*f+a*s*f-r*s*m+r*l*d-a*c*d)+p*(+t*l*h-t*o*m-a*s*h+n*s*m+a*o*d-n*l*d)+u*(-r*o*d-t*c*h+t*o*f+r*s*h-n*s*f+n*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],u=e[15],E=h*p*l-_*f*l+_*c*m-o*p*m-h*c*u+o*f*u,S=g*f*l-d*p*l-g*c*m+s*p*m+d*c*u-s*f*u,A=d*_*l-g*h*l+g*o*m-s*_*m-d*o*u+s*h*u,D=g*h*c-d*_*c-g*o*f+s*_*f+d*o*p-s*h*p,R=t*E+n*S+r*A+a*D;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return e[0]=E*T,e[1]=(_*f*a-h*p*a-_*r*m+n*p*m+h*r*u-n*f*u)*T,e[2]=(o*p*a-_*c*a+_*r*l-n*p*l-o*r*u+n*c*u)*T,e[3]=(h*c*a-o*f*a-h*r*l+n*f*l+o*r*m-n*c*m)*T,e[4]=S*T,e[5]=(d*p*a-g*f*a+g*r*m-t*p*m-d*r*u+t*f*u)*T,e[6]=(g*c*a-s*p*a-g*r*l+t*p*l+s*r*u-t*c*u)*T,e[7]=(s*f*a-d*c*a+d*r*l-t*f*l-s*r*m+t*c*m)*T,e[8]=A*T,e[9]=(g*h*a-d*_*a-g*n*m+t*_*m+d*n*u-t*h*u)*T,e[10]=(s*_*a-g*o*a+g*n*l-t*_*l-s*n*u+t*o*u)*T,e[11]=(d*o*a-s*h*a-d*n*l+t*h*l+s*n*m-t*o*m)*T,e[12]=D*T,e[13]=(d*_*r-g*h*r+g*n*f-t*_*f-d*n*p+t*h*p)*T,e[14]=(g*o*r-s*_*r-g*n*c+t*_*c+s*n*p-t*o*p)*T,e[15]=(s*h*r-d*o*r+d*n*c-t*h*c-s*n*f+t*o*f)*T,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,s=e.x,o=e.y,c=e.z,l=a*s,d=a*o;return this.set(l*s+n,l*o-r*c,l*c+r*o,0,l*o+r*c,d*o+n,d*c-r*s,0,l*c-r*o,d*c+r*s,a*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,s){return this.set(1,n,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,d=s+s,h=o+o,f=a*l,m=a*d,g=a*h,_=s*d,p=s*h,u=o*h,E=c*l,S=c*d,A=c*h,D=n.x,R=n.y,T=n.z;return r[0]=(1-(_+u))*D,r[1]=(m+A)*D,r[2]=(g-S)*D,r[3]=0,r[4]=(m-A)*R,r[5]=(1-(f+u))*R,r[6]=(p+E)*R,r[7]=0,r[8]=(g+S)*T,r[9]=(p-E)*T,r[10]=(1-(f+_))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let a=ji.set(r[0],r[1],r[2]).length();const s=ji.set(r[4],r[5],r[6]).length(),o=ji.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Mn.copy(this);const l=1/a,d=1/s,h=1/o;return Mn.elements[0]*=l,Mn.elements[1]*=l,Mn.elements[2]*=l,Mn.elements[4]*=d,Mn.elements[5]*=d,Mn.elements[6]*=d,Mn.elements[8]*=h,Mn.elements[9]*=h,Mn.elements[10]*=h,t.setFromRotationMatrix(Mn),n.x=a,n.y=s,n.z=o,this}makePerspective(e,t,n,r,a,s,o=Yn){const c=this.elements,l=2*a/(t-e),d=2*a/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let m,g;if(o===Yn)m=-(s+a)/(s-a),g=-2*s*a/(s-a);else if(o===Xa)m=-s/(s-a),g=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,a,s,o=Yn){const c=this.elements,l=1/(t-e),d=1/(n-r),h=1/(s-a),f=(t+e)*l,m=(n+r)*d;let g,_;if(o===Yn)g=(s+a)*h,_=-2*h;else if(o===Xa)g=a*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ji=new N,Mn=new _t,Oh=new N(0,0,0),Bh=new N(1,1,1),ri=new N,ha=new N,ln=new N,El=new _t,wl=new Oi;class Kn{constructor(e=0,t=0,n=0,r=Kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],d=r[9],h=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Wt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return El.makeRotationFromQuaternion(e),this.setFromRotationMatrix(El,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wl.setFromEuler(this),this.setFromQuaternion(wl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kn.DEFAULT_ORDER="XYZ";class Ms{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zh=0;const Al=new N,Ji=new Oi,Bn=new _t,fa=new N,Ir=new N,kh=new N,Hh=new Oi,Tl=new N(1,0,0),Cl=new N(0,1,0),Rl=new N(0,0,1),Pl={type:"added"},Vh={type:"removed"},Qi={type:"childadded",child:null},Do={type:"childremoved",child:null};class Kt extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=Tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Kt.DEFAULT_UP.clone();const e=new N,t=new Kn,n=new Oi,r=new N(1,1,1);function a(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ke}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(Tl,e)}rotateY(e){return this.rotateOnAxis(Cl,e)}rotateZ(e){return this.rotateOnAxis(Rl,e)}translateOnAxis(e,t){return Al.copy(e).applyQuaternion(this.quaternion),this.position.add(Al.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tl,e)}translateY(e){return this.translateOnAxis(Cl,e)}translateZ(e){return this.translateOnAxis(Rl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fa.copy(e):fa.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Ir,fa,this.up):Bn.lookAt(fa,Ir,this.up),this.quaternion.setFromRotationMatrix(Bn),r&&(Bn.extractRotation(r.matrixWorld),Ji.setFromRotationMatrix(Bn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pl),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vh),Do.child=e,this.dispatchEvent(Do),Do.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pl),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,kh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,Hh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const a=t[n];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++){const o=r[a];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];a(e.shapes,h)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),d=s(e.images),h=s(e.shapes),f=s(e.skeletons),m=s(e.animations),g=s(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function s(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Kt.DEFAULT_UP=new N(0,1,0);Kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new N,zn=new N,Fo=new N,kn=new N,er=new N,tr=new N,Ll=new N,Uo=new N,Io=new N,No=new N;class Dn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),yn.subVectors(e,t),r.cross(yn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){yn.subVectors(r,t),zn.subVectors(n,t),Fo.subVectors(e,t);const s=yn.dot(yn),o=yn.dot(zn),c=yn.dot(Fo),l=zn.dot(zn),d=zn.dot(Fo),h=s*l-o*o;if(h===0)return a.set(0,0,0),null;const f=1/h,m=(l*c-o*d)*f,g=(s*d-o*c)*f;return a.set(1-m-g,g,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(e,t,n,r,a,s,o,c){return this.getBarycoord(e,t,n,r,kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,kn.x),c.addScaledVector(s,kn.y),c.addScaledVector(o,kn.z),c)}static isFrontFacing(e,t,n,r){return yn.subVectors(n,t),zn.subVectors(e,t),yn.cross(zn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),yn.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Dn.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let s,o;er.subVectors(r,n),tr.subVectors(a,n),Uo.subVectors(e,n);const c=er.dot(Uo),l=tr.dot(Uo);if(c<=0&&l<=0)return t.copy(n);Io.subVectors(e,r);const d=er.dot(Io),h=tr.dot(Io);if(d>=0&&h<=d)return t.copy(r);const f=c*h-d*l;if(f<=0&&c>=0&&d<=0)return s=c/(c-d),t.copy(n).addScaledVector(er,s);No.subVectors(e,a);const m=er.dot(No),g=tr.dot(No);if(g>=0&&m<=g)return t.copy(a);const _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(tr,o);const p=d*g-m*h;if(p<=0&&h-d>=0&&m-g>=0)return Ll.subVectors(a,r),o=(h-d)/(h-d+(m-g)),t.copy(r).addScaledVector(Ll,o);const u=1/(p+_+f);return s=_*u,o=f*u,t.copy(n).addScaledVector(er,s).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ou={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},pa={h:0,s:0,l:0};function Oo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Re{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=st.workingColorSpace){if(e=Ss(e,1),t=Wt(t,0,1),n=Wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,s=2*n-a;this.r=Oo(s,a,e+1/3),this.g=Oo(s,a,e),this.b=Oo(s,a,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,t=un){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const n=ou[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}copyLinearToSRGB(e){return this.r=Eo(e.r),this.g=Eo(e.g),this.b=Eo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return st.fromWorkingColorSpace(Ht.copy(this),e),Math.round(Wt(Ht.r*255,0,255))*65536+Math.round(Wt(Ht.g*255,0,255))*256+Math.round(Wt(Ht.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(Ht.copy(this),t);const n=Ht.r,r=Ht.g,a=Ht.b,s=Math.max(n,r,a),o=Math.min(n,r,a);let c,l;const d=(o+s)/2;if(o===s)c=0,l=0;else{const h=s-o;switch(l=d<=.5?h/(s+o):h/(2-s-o),s){case n:c=(r-a)/h+(r<a?6:0);break;case r:c=(a-n)/h+2;break;case a:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=un){st.fromWorkingColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,r=Ht.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ai),this.setHSL(ai.h+e,ai.s+t,ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ai),e.getHSL(pa);const n=Hr(ai.h,pa.h,t),r=Hr(ai.s,pa.s,t),a=Hr(ai.l,pa.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Re;Re.NAMES=ou;let Gh=0;class Rr extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=Tr(),this.name="",this.type="Material",this.blending=hn,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ns,this.blendDst=is,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=ka,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hn&&(n.blending=this.blending),this.side!==mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ns&&(n.blendSrc=this.blendSrc),this.blendDst!==is&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ka&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Gn extends Rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new N,ma=new Ve;class Ne{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return iu("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ur(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ur(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ur(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ur(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ur(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),r=qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),r=qt(r,this.array),a=qt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vl&&(e.usage=this.usage),e}}class su extends Ne{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class lu extends Ne{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class xn extends Ne{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Wh=0;const pn=new _t,Bo=new Kt,nr=new N,cn=new Cr,Nr=new Cr,Nt=new N;class zt extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Tr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nu(e)?lu:su)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ke().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return Bo.lookAt(e),Bo.updateMatrix(),this.applyMatrix4(Bo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new xn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];cn.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ea);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Nr.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(cn.min,Nr.min),cn.expandByPoint(Nt),Nt.addVectors(cn.max,Nr.max),cn.expandByPoint(Nt)):(cn.expandByPoint(Nr.min),cn.expandByPoint(Nr.max))}cn.getCenter(n);let r=0;for(let a=0,s=e.count;a<s;a++)Nt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(Nt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Nt.fromBufferAttribute(o,l),c&&(nr.fromBufferAttribute(e,l),Nt.add(nr)),r=Math.max(r,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new N,c[I]=new N;const l=new N,d=new N,h=new N,f=new Ve,m=new Ve,g=new Ve,_=new N,p=new N;function u(I,b,M){l.fromBufferAttribute(n,I),d.fromBufferAttribute(n,b),h.fromBufferAttribute(n,M),f.fromBufferAttribute(a,I),m.fromBufferAttribute(a,b),g.fromBufferAttribute(a,M),d.sub(l),h.sub(l),m.sub(f),g.sub(f);const P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(h,-m.y).multiplyScalar(P),p.copy(h).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(P),o[I].add(_),o[b].add(_),o[M].add(_),c[I].add(p),c[b].add(p),c[M].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let I=0,b=E.length;I<b;++I){const M=E[I],P=M.start,O=M.count;for(let z=P,G=P+O;z<G;z+=3)u(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const S=new N,A=new N,D=new N,R=new N;function T(I){D.fromBufferAttribute(r,I),R.copy(D);const b=o[I];S.copy(b),S.sub(D.multiplyScalar(D.dot(b))).normalize(),A.crossVectors(R,b);const P=A.dot(c[I])<0?-1:1;s.setXYZW(I,S.x,S.y,S.z,P)}for(let I=0,b=E.length;I<b;++I){const M=E[I],P=M.start,O=M.count;for(let z=P,G=P+O;z<G;z+=3)T(e.getX(z+0)),T(e.getX(z+1)),T(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ne(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const r=new N,a=new N,s=new N,o=new N,c=new N,l=new N,d=new N,h=new N;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),s.fromBufferAttribute(t,p),d.subVectors(s,a),h.subVectors(r,a),d.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(d),c.add(d),l.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),d.subVectors(s,a),h.subVectors(r,a),d.cross(h),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,f=new l.constructor(c.length*d);let m=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*d;for(let u=0;u<d;u++)f[g++]=l[m++]}return new Ne(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let d=0,h=l.length;d<h;d++){const f=l[d],m=e(f,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,f=l.length;h<f;h++){const m=l[h];d.push(m.toJSON(e.data))}d.length>0&&(r[c]=d,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const a=e.morphAttributes;for(const l in a){const d=[],h=a[l];for(let f=0,m=h.length;f<m;f++)d.push(h[f].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,d=s.length;l<d;l++){const h=s[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dl=new _t,wi=new ta,ga=new ea,Fl=new N,ir=new N,rr=new N,ar=new N,zo=new N,va=new N,_a=new Ve,xa=new Ve,Sa=new Ve,Ul=new N,Il=new N,Nl=new N,Ma=new N,ya=new N;class Tt extends Kt{constructor(e=new zt,t=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){va.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const d=o[c],h=a[c];d!==0&&(zo.fromBufferAttribute(h,e),s?va.addScaledVector(zo,d):va.addScaledVector(zo.sub(t),d))}t.add(va)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(a),wi.copy(e.ray).recast(e.near),!(ga.containsPoint(wi.origin)===!1&&(wi.intersectSphere(ga,Fl)===null||wi.origin.distanceToSquared(Fl)>(e.far-e.near)**2))&&(Dl.copy(a).invert(),wi.copy(e.ray).applyMatrix4(Dl),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,d=a.attributes.uv1,h=a.attributes.normal,f=a.groups,m=a.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=s[p.materialIndex],E=Math.max(p.start,m.start),S=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let A=E,D=S;A<D;A+=3){const R=o.getX(A),T=o.getX(A+1),I=o.getX(A+2);r=ba(this,u,e,n,l,d,h,R,T,I),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const E=o.getX(p),S=o.getX(p+1),A=o.getX(p+2);r=ba(this,s,e,n,l,d,h,E,S,A),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=s[p.materialIndex],E=Math.max(p.start,m.start),S=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let A=E,D=S;A<D;A+=3){const R=A,T=A+1,I=A+2;r=ba(this,u,e,n,l,d,h,R,T,I),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const E=p,S=p+1,A=p+2;r=ba(this,s,e,n,l,d,h,E,S,A),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Xh(i,e,t,n,r,a,s,o){let c;if(e.side===rn?c=n.intersectTriangle(s,a,r,!0,o):c=n.intersectTriangle(r,a,s,e.side===mi,o),c===null)return null;ya.copy(o),ya.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ya);return l<t.near||l>t.far?null:{distance:l,point:ya.clone(),object:i}}function ba(i,e,t,n,r,a,s,o,c,l){i.getVertexPosition(o,ir),i.getVertexPosition(c,rr),i.getVertexPosition(l,ar);const d=Xh(i,e,t,n,ir,rr,ar,Ma);if(d){r&&(_a.fromBufferAttribute(r,o),xa.fromBufferAttribute(r,c),Sa.fromBufferAttribute(r,l),d.uv=Dn.getInterpolation(Ma,ir,rr,ar,_a,xa,Sa,new Ve)),a&&(_a.fromBufferAttribute(a,o),xa.fromBufferAttribute(a,c),Sa.fromBufferAttribute(a,l),d.uv1=Dn.getInterpolation(Ma,ir,rr,ar,_a,xa,Sa,new Ve)),s&&(Ul.fromBufferAttribute(s,o),Il.fromBufferAttribute(s,c),Nl.fromBufferAttribute(s,l),d.normal=Dn.getInterpolation(Ma,ir,rr,ar,Ul,Il,Nl,new N),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new N,materialIndex:0};Dn.getNormal(ir,rr,ar,h.normal),d.face=h}return d}class Pr extends zt{constructor(e=1,t=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],l=[],d=[],h=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,s,a,0),g("z","y","x",1,-1,n,t,-e,s,a,1),g("x","z","y",1,1,e,n,t,r,s,2),g("x","z","y",1,-1,e,n,-t,r,s,3),g("x","y","z",1,-1,e,t,n,r,a,4),g("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(c),this.setAttribute("position",new xn(l,3)),this.setAttribute("normal",new xn(d,3)),this.setAttribute("uv",new xn(h,2));function g(_,p,u,E,S,A,D,R,T,I,b){const M=A/T,P=D/I,O=A/2,z=D/2,G=R/2,Y=T+1,H=I+1;let ne=0,k=0;const de=new N;for(let ve=0;ve<H;ve++){const pe=ve*P-z;for(let Ue=0;Ue<Y;Ue++){const Ge=Ue*M-O;de[_]=Ge*E,de[p]=pe*S,de[u]=G,l.push(de.x,de.y,de.z),de[_]=0,de[p]=0,de[u]=R>0?1:-1,d.push(de.x,de.y,de.z),h.push(Ue/T),h.push(1-ve/I),ne+=1}}for(let ve=0;ve<I;ve++)for(let pe=0;pe<T;pe++){const Ue=f+pe+Y*ve,Ge=f+pe+Y*(ve+1),$=f+(pe+1)+Y*(ve+1),L=f+(pe+1)+Y*ve;c.push(Ue,Ge,L),c.push(Ge,$,L),k+=6}o.addGroup(m,k,b),m+=k,f+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function br(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Zt(i){const e={};for(let t=0;t<i.length;t++){const n=br(i[t]);for(const r in n)e[r]=n[r]}return e}function Yh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function cu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const qh={clone:br,merge:Zt};var $h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dt extends Rr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$h,this.fragmentShader=Zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=br(e.uniforms),this.uniformsGroups=Yh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class uu extends Kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Yn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const oi=new N,Ol=new Ve,Bl=new Ve;class mn extends uu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yr*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oi.x,oi.y).multiplyScalar(-e/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-e/oi.z)}getViewSize(e,t){return this.getViewBounds(e,Ol,Bl),t.subVectors(Bl,Ol)}setViewOffset(e,t,n,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(kr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*n/l,r*=s.width/c,n*=s.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const or=-90,sr=1;class Kh extends Kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new mn(or,sr,e,t);r.layers=this.layers,this.add(r);const a=new mn(or,sr,e,t);a.layers=this.layers,this.add(a);const s=new mn(or,sr,e,t);s.layers=this.layers,this.add(s);const o=new mn(or,sr,e,t);o.layers=this.layers,this.add(o);const c=new mn(or,sr,e,t);c.layers=this.layers,this.add(c);const l=new mn(or,sr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,s,o,c]=t;for(const l of t)this.remove(l);if(e===Yn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Xa)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,l,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,s),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(h,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class du extends Xt{constructor(e,t,n,r,a,s,o,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:_r,super(e,t,n,r,a,s,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jh extends Zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new du(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Rt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Pr(5,5,5),a=new Dt({name:"CubemapFromEquirect",uniforms:br(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:rn,blending:hi});a.uniforms.tEquirect.value=t;const s=new Tt(r,a),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=Rt),new Kh(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,r){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(a)}}const ko=new N,Jh=new N,Qh=new Ke;class Pn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ko.subVectors(n,t).cross(Jh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ko),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Qh.getNormalMatrix(e),r=this.coplanarPoint(ko).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new ea,Ea=new N;class hu{constructor(e=new Pn,t=new Pn,n=new Pn,r=new Pn,a=new Pn,s=new Pn){this.planes=[e,t,n,r,a,s]}set(e,t,n,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yn){const n=this.planes,r=e.elements,a=r[0],s=r[1],o=r[2],c=r[3],l=r[4],d=r[5],h=r[6],f=r[7],m=r[8],g=r[9],_=r[10],p=r[11],u=r[12],E=r[13],S=r[14],A=r[15];if(n[0].setComponents(c-a,f-l,p-m,A-u).normalize(),n[1].setComponents(c+a,f+l,p+m,A+u).normalize(),n[2].setComponents(c+s,f+d,p+g,A+E).normalize(),n[3].setComponents(c-s,f-d,p-g,A-E).normalize(),n[4].setComponents(c-o,f-h,p-_,A-S).normalize(),t===Yn)n[5].setComponents(c+o,f+h,p+_,A+S).normalize();else if(t===Xa)n[5].setComponents(o,h,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Ea.x=r.normal.x>0?e.max.x:e.min.x,Ea.y=r.normal.y>0?e.max.y:e.min.y,Ea.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ea)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function fu(){let i=null,e=!1,t=null,n=null;function r(a,s){t(a,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function ef(i){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const d=c.array,h=c._updateRange,f=c.updateRanges;if(i.bindBuffer(l,o),h.count===-1&&f.length===0&&i.bufferSubData(l,0,d),f.length!==0){for(let m=0,g=f.length;m<g;m++){const _=f[m];i.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}h.count!==-1&&(i.bufferSubData(l,h.offset*d.BYTES_PER_ELEMENT,d,h.offset,h.count),h.count=-1),c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}class Un extends zt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,d=c+1,h=e/o,f=t/c,m=[],g=[],_=[],p=[];for(let u=0;u<d;u++){const E=u*f-s;for(let S=0;S<l;S++){const A=S*h-a;g.push(A,-E,0),_.push(0,0,1),p.push(S/o),p.push(1-u/c)}}for(let u=0;u<c;u++)for(let E=0;E<o;E++){const S=E+l*u,A=E+l*(u+1),D=E+1+l*(u+1),R=E+1+l*u;m.push(S,A,R),m.push(A,D,R)}this.setIndex(m),this.setAttribute("position",new xn(g,3)),this.setAttribute("normal",new xn(_,3)),this.setAttribute("uv",new xn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.width,e.height,e.widthSegments,e.heightSegments)}}var tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,af=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,of=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,df=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,wf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Af=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Df="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ff=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Uf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,If=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Of=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$f=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ep=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,np=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ip=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ap=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,op=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ep=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ip=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Bp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$p=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,om=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,um=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Sm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ym=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Em=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Am=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Um=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:tf,alphahash_pars_fragment:nf,alphamap_fragment:rf,alphamap_pars_fragment:af,alphatest_fragment:of,alphatest_pars_fragment:sf,aomap_fragment:lf,aomap_pars_fragment:cf,batching_pars_vertex:uf,batching_vertex:df,begin_vertex:hf,beginnormal_vertex:ff,bsdfs:pf,iridescence_fragment:mf,bumpmap_pars_fragment:gf,clipping_planes_fragment:vf,clipping_planes_pars_fragment:_f,clipping_planes_pars_vertex:xf,clipping_planes_vertex:Sf,color_fragment:Mf,color_pars_fragment:yf,color_pars_vertex:bf,color_vertex:Ef,common:wf,cube_uv_reflection_fragment:Af,defaultnormal_vertex:Tf,displacementmap_pars_vertex:Cf,displacementmap_vertex:Rf,emissivemap_fragment:Pf,emissivemap_pars_fragment:Lf,colorspace_fragment:Df,colorspace_pars_fragment:Ff,envmap_fragment:Uf,envmap_common_pars_fragment:If,envmap_pars_fragment:Nf,envmap_pars_vertex:Of,envmap_physical_pars_fragment:$f,envmap_vertex:Bf,fog_vertex:zf,fog_pars_vertex:kf,fog_fragment:Hf,fog_pars_fragment:Vf,gradientmap_pars_fragment:Gf,lightmap_pars_fragment:Wf,lights_lambert_fragment:Xf,lights_lambert_pars_fragment:Yf,lights_pars_begin:qf,lights_toon_fragment:Zf,lights_toon_pars_fragment:Kf,lights_phong_fragment:jf,lights_phong_pars_fragment:Jf,lights_physical_fragment:Qf,lights_physical_pars_fragment:ep,lights_fragment_begin:tp,lights_fragment_maps:np,lights_fragment_end:ip,logdepthbuf_fragment:rp,logdepthbuf_pars_fragment:ap,logdepthbuf_pars_vertex:op,logdepthbuf_vertex:sp,map_fragment:lp,map_pars_fragment:cp,map_particle_fragment:up,map_particle_pars_fragment:dp,metalnessmap_fragment:hp,metalnessmap_pars_fragment:fp,morphinstance_vertex:pp,morphcolor_vertex:mp,morphnormal_vertex:gp,morphtarget_pars_vertex:vp,morphtarget_vertex:_p,normal_fragment_begin:xp,normal_fragment_maps:Sp,normal_pars_fragment:Mp,normal_pars_vertex:yp,normal_vertex:bp,normalmap_pars_fragment:Ep,clearcoat_normal_fragment_begin:wp,clearcoat_normal_fragment_maps:Ap,clearcoat_pars_fragment:Tp,iridescence_pars_fragment:Cp,opaque_fragment:Rp,packing:Pp,premultiplied_alpha_fragment:Lp,project_vertex:Dp,dithering_fragment:Fp,dithering_pars_fragment:Up,roughnessmap_fragment:Ip,roughnessmap_pars_fragment:Np,shadowmap_pars_fragment:Op,shadowmap_pars_vertex:Bp,shadowmap_vertex:zp,shadowmask_pars_fragment:kp,skinbase_vertex:Hp,skinning_pars_vertex:Vp,skinning_vertex:Gp,skinnormal_vertex:Wp,specularmap_fragment:Xp,specularmap_pars_fragment:Yp,tonemapping_fragment:qp,tonemapping_pars_fragment:$p,transmission_fragment:Zp,transmission_pars_fragment:Kp,uv_pars_fragment:jp,uv_pars_vertex:Jp,uv_vertex:Qp,worldpos_vertex:em,background_vert:tm,background_frag:nm,backgroundCube_vert:im,backgroundCube_frag:rm,cube_vert:am,cube_frag:om,depth_vert:sm,depth_frag:lm,distanceRGBA_vert:cm,distanceRGBA_frag:um,equirect_vert:dm,equirect_frag:hm,linedashed_vert:fm,linedashed_frag:pm,meshbasic_vert:mm,meshbasic_frag:gm,meshlambert_vert:vm,meshlambert_frag:_m,meshmatcap_vert:xm,meshmatcap_frag:Sm,meshnormal_vert:Mm,meshnormal_frag:ym,meshphong_vert:bm,meshphong_frag:Em,meshphysical_vert:wm,meshphysical_frag:Am,meshtoon_vert:Tm,meshtoon_frag:Cm,points_vert:Rm,points_frag:Pm,shadow_vert:Lm,shadow_frag:Dm,sprite_vert:Fm,sprite_frag:Um},ge={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Ln={basic:{uniforms:Zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Re(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Zt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Zt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Re(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Zt([ge.points,ge.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Zt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Zt([ge.common,ge.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Zt([ge.sprite,ge.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Zt([ge.common,ge.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Zt([ge.lights,ge.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Ln.physical={uniforms:Zt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const wa={r:0,b:0,g:0},Ti=new Kn,Im=new _t;function Nm(i,e,t,n,r,a,s){const o=new Re(0);let c=a===!0?0:1,l,d,h=null,f=0,m=null;function g(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function _(E){let S=!1;const A=g(E);A===null?u(o,c):A&&A.isColor&&(u(A,1),S=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,s):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(E,S){const A=g(S);A&&(A.isCubeTexture||A.mapping===no)?(d===void 0&&(d=new Tt(new Pr(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:br(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(D,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Ti.copy(S.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),d.material.uniforms.envMap.value=A,d.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Im.makeRotationFromEuler(Ti)),d.material.toneMapped=st.getTransfer(A.colorSpace)!==dt,(h!==A||f!==A.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,h=A,f=A.version,m=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Tt(new Un(2,2),new Dt({name:"BackgroundMaterial",uniforms:br(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=st.getTransfer(A.colorSpace)!==dt,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||f!==A.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,h=A,f=A.version,m=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function u(E,S){E.getRGB(wa,cu(i)),n.buffers.color.setClear(wa.r,wa.g,wa.b,S,s)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),c=S,u(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,u(o,c)},render:_,addToRenderList:p}}function Om(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let a=r,s=!1;function o(M,P,O,z,G){let Y=!1;const H=h(z,O,P);a!==H&&(a=H,l(a.object)),Y=m(M,z,O,G),Y&&g(M,z,O,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(Y||s)&&(s=!1,A(M,P,O,z),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function d(M){return i.deleteVertexArray(M)}function h(M,P,O){const z=O.wireframe===!0;let G=n[M.id];G===void 0&&(G={},n[M.id]=G);let Y=G[P.id];Y===void 0&&(Y={},G[P.id]=Y);let H=Y[z];return H===void 0&&(H=f(c()),Y[z]=H),H}function f(M){const P=[],O=[],z=[];for(let G=0;G<t;G++)P[G]=0,O[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:M,attributes:{},index:null}}function m(M,P,O,z){const G=a.attributes,Y=P.attributes;let H=0;const ne=O.getAttributes();for(const k in ne)if(ne[k].location>=0){const ve=G[k];let pe=Y[k];if(pe===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),ve===void 0||ve.attribute!==pe||pe&&ve.data!==pe.data)return!0;H++}return a.attributesNum!==H||a.index!==z}function g(M,P,O,z){const G={},Y=P.attributes;let H=0;const ne=O.getAttributes();for(const k in ne)if(ne[k].location>=0){let ve=Y[k];ve===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor));const pe={};pe.attribute=ve,ve&&ve.data&&(pe.data=ve.data),G[k]=pe,H++}a.attributes=G,a.attributesNum=H,a.index=z}function _(){const M=a.newAttributes;for(let P=0,O=M.length;P<O;P++)M[P]=0}function p(M){u(M,0)}function u(M,P){const O=a.newAttributes,z=a.enabledAttributes,G=a.attributeDivisors;O[M]=1,z[M]===0&&(i.enableVertexAttribArray(M),z[M]=1),G[M]!==P&&(i.vertexAttribDivisor(M,P),G[M]=P)}function E(){const M=a.newAttributes,P=a.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==M[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function S(M,P,O,z,G,Y,H){H===!0?i.vertexAttribIPointer(M,P,O,G,Y):i.vertexAttribPointer(M,P,O,z,G,Y)}function A(M,P,O,z){_();const G=z.attributes,Y=O.getAttributes(),H=P.defaultAttributeValues;for(const ne in Y){const k=Y[ne];if(k.location>=0){let de=G[ne];if(de===void 0&&(ne==="instanceMatrix"&&M.instanceMatrix&&(de=M.instanceMatrix),ne==="instanceColor"&&M.instanceColor&&(de=M.instanceColor)),de!==void 0){const ve=de.normalized,pe=de.itemSize,Ue=e.get(de);if(Ue===void 0)continue;const Ge=Ue.buffer,$=Ue.type,L=Ue.bytesPerElement,Z=$===i.INT||$===i.UNSIGNED_INT||de.gpuType===Zc;if(de.isInterleavedBufferAttribute){const j=de.data,_e=j.stride,le=de.offset;if(j.isInstancedInterleavedBuffer){for(let Ie=0;Ie<k.locationSize;Ie++)u(k.location+Ie,j.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Ie=0;Ie<k.locationSize;Ie++)p(k.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let Ie=0;Ie<k.locationSize;Ie++)S(k.location+Ie,pe/k.locationSize,$,ve,_e*L,(le+pe/k.locationSize*Ie)*L,Z)}else{if(de.isInstancedBufferAttribute){for(let j=0;j<k.locationSize;j++)u(k.location+j,de.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let j=0;j<k.locationSize;j++)p(k.location+j);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let j=0;j<k.locationSize;j++)S(k.location+j,pe/k.locationSize,$,ve,pe*L,pe/k.locationSize*j*L,Z)}}else if(H!==void 0){const ve=H[ne];if(ve!==void 0)switch(ve.length){case 2:i.vertexAttrib2fv(k.location,ve);break;case 3:i.vertexAttrib3fv(k.location,ve);break;case 4:i.vertexAttrib4fv(k.location,ve);break;default:i.vertexAttrib1fv(k.location,ve)}}}}E()}function D(){I();for(const M in n){const P=n[M];for(const O in P){const z=P[O];for(const G in z)d(z[G].object),delete z[G];delete P[O]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const O in P){const z=P[O];for(const G in z)d(z[G].object),delete z[G];delete P[O]}delete n[M.id]}function T(M){for(const P in n){const O=n[P];if(O[M.id]===void 0)continue;const z=O[M.id];for(const G in z)d(z[G].object),delete z[G];delete O[M.id]}}function I(){b(),s=!0,a!==r&&(a=r,l(a.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:D,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:p,disableUnusedAttributes:E}}function Bm(i,e,t){let n;function r(l){n=l}function a(l,d){i.drawArrays(n,l,d),t.update(d,n,1)}function s(l,d,h){h!==0&&(i.drawArraysInstanced(n,l,d,h),t.update(d,n,h))}function o(l,d,h){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<h;m++)this.render(l[m],d[m]);else{f.multiDrawArraysWEBGL(n,l,0,d,0,h);let m=0;for(let g=0;g<h;g++)m+=d[g];t.update(m,n,1)}}function c(l,d,h,f){if(h===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)s(l[g],d[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,d,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=d[_];for(let _=0;_<f.length;_++)t.update(g,n,f[_])}}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function zm(i,e,t,n){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(R){return!(R!==vn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const T=R===Qr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==gi&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Xn&&!T)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),u=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,D=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:u,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:A,maxSamples:D}}function km(i){const e=this;let t=null,n=0,r=!1,a=!1;const s=new Pn,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||n!==0||r;return r=f,n=h.length,m},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,m){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,u=i.get(h);if(!r||g===null||g.length===0||a&&!p)a?d(null):l();else{const E=a?0:n,S=E*4;let A=u.clippingState||null;c.value=A,A=d(g,f,S,m);for(let D=0;D!==S;++D)A[D]=t[D];u.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,f,m,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const u=m+_*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(p===null||p.length<u)&&(p=new Float32Array(u));for(let S=0,A=m;S!==_;++S,A+=4)s.copy(h[S]).applyMatrix4(E,o),s.normal.toArray(p,A),p[A+3]=s.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Hm(i){let e=new WeakMap;function t(s,o){return o===rs?s.mapping=_r:o===as&&(s.mapping=xr),s}function n(s){if(s&&s.isTexture){const o=s.mapping;if(o===rs||o===as)if(e.has(s)){const c=e.get(s).texture;return t(c,s.mapping)}else{const c=s.image;if(c&&c.height>0){const l=new jh(c.height);return l.fromEquirectangularTexture(i,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){const o=s.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}class pu extends uu{constructor(e=-1,t=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,s=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const dr=4,zl=[.125,.215,.35,.446,.526,.582],Fi=20,Ho=new pu,kl=new Re;let Vo=null,Go=0,Wo=0,Xo=!1;const Pi=(1+Math.sqrt(5))/2,lr=1/Pi,Hl=[new N(-Pi,lr,0),new N(Pi,lr,0),new N(-lr,0,Pi),new N(lr,0,Pi),new N(0,Pi,-lr),new N(0,Pi,lr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Vo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vo,Go,Wo),this._renderer.xr.enabled=Xo,e.scissorTest=!1,Aa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_r||e.mapping===xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:Qr,format:vn,colorSpace:xi,depthBuffer:!1},r=Gl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gl(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vm(a)),this._blurMaterial=Gm(a,e,t)}return r}_compileMaterial(e){const t=new Tt(this._lodPlanes[0],e);this._renderer.compile(t,Ho)}_sceneToCubeUV(e,t,n,r){const o=new mn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(kl),d.toneMapping=fi,d.autoClear=!1;const m=new Gn({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),g=new Tt(new Pr,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(kl),_=!0);for(let u=0;u<6;u++){const E=u%3;E===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):E===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const S=this._cubeSize;Aa(r,E*S,u>2?S:0,S,S),d.setRenderTarget(r),_&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===_r||e.mapping===xr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wl());const a=r?this._cubemapMaterial:this._equirectMaterial,s=new Tt(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;Aa(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(s,Ho)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=Hl[(r-a-1)%Hl.length];this._blur(e,a-1,a,s,o)}t.autoClear=n}_blur(e,t,n,r,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",a),this._halfBlur(s,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,s,o){const c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Tt(this._lodPlanes[r],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(a)?Math.PI/(2*m):2*Math.PI/(2*Fi-1),_=a/g,p=isFinite(a)?1+Math.floor(d*_):Fi;p>Fi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Fi}`);const u=[];let E=0;for(let T=0;T<Fi;++T){const I=T/_,b=Math.exp(-I*I/2);u.push(b),T===0?E+=b:T<p&&(E+=2*b)}for(let T=0;T<u.length;T++)u[T]=u[T]/E;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=s==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const A=this._sizeLods[r],D=3*A*(r>S-dr?r-S+dr:0),R=4*(this._cubeSize-A);Aa(t,D,R,3*A,2*A),c.setRenderTarget(t),c.render(h,Ho)}}function Vm(i){const e=[],t=[],n=[];let r=i;const a=i-dr+1+zl.length;for(let s=0;s<a;s++){const o=Math.pow(2,r);t.push(o);let c=1/o;s>i-dr?c=zl[s-i+dr-1]:s===0&&(c=0),n.push(c);const l=1/(o-2),d=-l,h=1+l,f=[d,d,h,d,h,h,d,d,h,h,d,h],m=6,g=6,_=3,p=2,u=1,E=new Float32Array(_*g*m),S=new Float32Array(p*g*m),A=new Float32Array(u*g*m);for(let R=0;R<m;R++){const T=R%3*2/3-1,I=R>2?0:-1,b=[T,I,0,T+2/3,I,0,T+2/3,I+1,0,T,I,0,T+2/3,I+1,0,T,I+1,0];E.set(b,_*g*R),S.set(f,p*g*R);const M=[R,R,R,R,R,R];A.set(M,u*g*R)}const D=new zt;D.setAttribute("position",new Ne(E,_)),D.setAttribute("uv",new Ne(S,p)),D.setAttribute("faceIndex",new Ne(A,u)),e.push(D),r>dr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gl(i,e,t){const n=new Zn(i,e,t);return n.texture.mapping=no,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Aa(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Gm(i,e,t){const n=new Float32Array(Fi),r=new N(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Wl(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Xl(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function ys(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Wm(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===rs||c===as,d=c===_r||c===xr;if(l||d){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Vl(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const m=o.image;return l&&m&&m.height>0||d&&m&&r(m)?(t===null&&(t=new Vl(i)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",a),h.texture):null}}}return o}function r(o){let c=0;const l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function a(o){const c=o.target;c.removeEventListener("dispose",a);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function Xm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&iu("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Ym(i,e,t,n){const r={},a=new WeakMap;function s(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}f.removeEventListener("dispose",s),delete r[f.id];const m=a.get(f);m&&(e.remove(m),a.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=h.morphAttributes;for(const g in m){const _=m[g];for(let p=0,u=_.length;p<u;p++)e.update(_[p],i.ARRAY_BUFFER)}}function l(h){const f=[],m=h.index,g=h.attributes.position;let _=0;if(m!==null){const E=m.array;_=m.version;for(let S=0,A=E.length;S<A;S+=3){const D=E[S+0],R=E[S+1],T=E[S+2];f.push(D,R,R,T,T,D)}}else if(g!==void 0){const E=g.array;_=g.version;for(let S=0,A=E.length/3-1;S<A;S+=3){const D=S+0,R=S+1,T=S+2;f.push(D,R,R,T,T,D)}}else return;const p=new(nu(f)?lu:su)(f,1);p.version=_;const u=a.get(h);u&&e.remove(u),a.set(h,p)}function d(h){const f=a.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&l(h)}else l(h);return a.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function qm(i,e,t){let n;function r(f){n=f}let a,s;function o(f){a=f.type,s=f.bytesPerElement}function c(f,m){i.drawElements(n,m,a,f*s),t.update(m,n,1)}function l(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,a,f*s,g),t.update(m,n,g))}function d(f,m,g){if(g===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<g;p++)this.render(f[p]/s,m[p]);else{_.multiDrawElementsWEBGL(n,m,0,a,f,0,g);let p=0;for(let u=0;u<g;u++)p+=m[u];t.update(p,n,1)}}function h(f,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<f.length;u++)l(f[u]/s,m[u],_[u]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,a,f,0,_,0,g);let u=0;for(let E=0;E<g;E++)u+=m[E];for(let E=0;E<_.length;E++)t.update(u,n,_[E])}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function $m(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Zm(i,e,t){const n=new WeakMap,r=new Pt;function a(s,o,c){const l=s.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let M=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var m=M;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let A=0;g===!0&&(A=1),_===!0&&(A=2),p===!0&&(A=3);let D=o.attributes.position.count*A,R=1;D>e.maxTextureSize&&(R=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const T=new Float32Array(D*R*4*h),I=new au(T,D,R,h);I.type=Xn,I.needsUpdate=!0;const b=A*4;for(let P=0;P<h;P++){const O=u[P],z=E[P],G=S[P],Y=D*R*4*P;for(let H=0;H<O.count;H++){const ne=H*b;g===!0&&(r.fromBufferAttribute(O,H),T[Y+ne+0]=r.x,T[Y+ne+1]=r.y,T[Y+ne+2]=r.z,T[Y+ne+3]=0),_===!0&&(r.fromBufferAttribute(z,H),T[Y+ne+4]=r.x,T[Y+ne+5]=r.y,T[Y+ne+6]=r.z,T[Y+ne+7]=0),p===!0&&(r.fromBufferAttribute(G,H),T[Y+ne+8]=r.x,T[Y+ne+9]=r.y,T[Y+ne+10]=r.z,T[Y+ne+11]=G.itemSize===4?r.w:1)}}f={count:h,texture:I,size:new Ve(D,R)},n.set(o,f),o.addEventListener("dispose",M)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:a}}function Km(i,e,t,n){let r=new WeakMap;function a(c){const l=n.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function s(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:a,dispose:s}}class mu extends Xt{constructor(e,t,n,r,a,s,o,c,l,d=fr){if(d!==fr&&d!==yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===fr&&(n=Sr),n===void 0&&d===yr&&(n=Mr),super(null,r,a,s,o,c,d,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:nn,this.minFilter=c!==void 0?c:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const gu=new Xt,vu=new mu(1,1);vu.compareFunction=tu;const _u=new au,xu=new Ih,Su=new du,Yl=[],ql=[],$l=new Float32Array(16),Zl=new Float32Array(9),Kl=new Float32Array(4);function Lr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=Yl[r];if(a===void 0&&(a=new Float32Array(r),Yl[r]=a),e!==0){n.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ro(i,e){let t=ql[e];t===void 0&&(t=new Int32Array(e),ql[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function jm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function Qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function tg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Ft(t,n))return;Kl.set(n),i.uniformMatrix2fv(this.addr,!1,Kl),Ut(t,n)}}function ng(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Ft(t,n))return;Zl.set(n),i.uniformMatrix3fv(this.addr,!1,Zl),Ut(t,n)}}function ig(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Ft(t,n))return;$l.set(n),i.uniformMatrix4fv(this.addr,!1,$l),Ut(t,n)}}function rg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function lg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function hg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const a=this.type===i.SAMPLER_2D_SHADOW?vu:gu;t.setTexture2D(e||a,r)}function fg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||xu,r)}function pg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Su,r)}function mg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||_u,r)}function gg(i){switch(i){case 5126:return jm;case 35664:return Jm;case 35665:return Qm;case 35666:return eg;case 35674:return tg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return rg;case 35667:case 35671:return ag;case 35668:case 35672:return og;case 35669:case 35673:return sg;case 5125:return lg;case 36294:return cg;case 36295:return ug;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return hg;case 35679:case 36299:case 36307:return fg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}function vg(i,e){i.uniform1fv(this.addr,e)}function _g(i,e){const t=Lr(e,this.size,2);i.uniform2fv(this.addr,t)}function xg(i,e){const t=Lr(e,this.size,3);i.uniform3fv(this.addr,t)}function Sg(i,e){const t=Lr(e,this.size,4);i.uniform4fv(this.addr,t)}function Mg(i,e){const t=Lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function yg(i,e){const t=Lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function bg(i,e){const t=Lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Eg(i,e){i.uniform1iv(this.addr,e)}function wg(i,e){i.uniform2iv(this.addr,e)}function Ag(i,e){i.uniform3iv(this.addr,e)}function Tg(i,e){i.uniform4iv(this.addr,e)}function Cg(i,e){i.uniform1uiv(this.addr,e)}function Rg(i,e){i.uniform2uiv(this.addr,e)}function Pg(i,e){i.uniform3uiv(this.addr,e)}function Lg(i,e){i.uniform4uiv(this.addr,e)}function Dg(i,e,t){const n=this.cache,r=e.length,a=ro(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ut(n,a));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||gu,a[s])}function Fg(i,e,t){const n=this.cache,r=e.length,a=ro(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ut(n,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||xu,a[s])}function Ug(i,e,t){const n=this.cache,r=e.length,a=ro(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ut(n,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Su,a[s])}function Ig(i,e,t){const n=this.cache,r=e.length,a=ro(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ut(n,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||_u,a[s])}function Ng(i){switch(i){case 5126:return vg;case 35664:return _g;case 35665:return xg;case 35666:return Sg;case 35674:return Mg;case 35675:return yg;case 35676:return bg;case 5124:case 35670:return Eg;case 35667:case 35671:return wg;case 35668:case 35672:return Ag;case 35669:case 35673:return Tg;case 5125:return Cg;case 36294:return Rg;case 36295:return Pg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Dg;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Ig}}class Og{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gg(t.type)}}class Bg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ng(t.type)}}class zg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],n)}}}const Yo=/(\w+)(\])?(\[|\.)?/g;function jl(i,e){i.seq.push(e),i.map[e.id]=e}function kg(i,e,t){const n=i.name,r=n.length;for(Yo.lastIndex=0;;){const a=Yo.exec(n),s=Yo.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){jl(t,l===void 0?new Og(o,i,e):new Bg(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new zg(o),jl(t,h)),t=h}}}class Na{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r),s=e.getUniformLocation(t,a.name);kg(a,s,this)}}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&n.push(s)}return n}}function Jl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Hg=37297;let Vg=0;function Gg(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;n.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return n.join(`
`)}function Wg(i){const e=st.getPrimaries(st.workingColorSpace),t=st.getPrimaries(i);let n;switch(e===t?n="":e===Wa&&t===Ga?n="LinearDisplayP3ToLinearSRGB":e===Ga&&t===Wa&&(n="LinearSRGBToLinearDisplayP3"),i){case xi:case io:return[n,"LinearTransferOETF"];case un:case xs:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ql(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const s=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Gg(i.getShaderSource(e),s)}else return r}function Xg(i,e){const t=Wg(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Yg(i,e){let t;switch(e){case Od:t="Linear";break;case Bd:t="Reinhard";break;case zd:t="OptimizedCineon";break;case kd:t="ACESFilmic";break;case Vd:t="AgX";break;case Gd:t="Neutral";break;case Hd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function qg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zr).join(`
`)}function $g(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Zg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=i.getActiveAttrib(e,r),s=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function zr(i){return i!==""}function ec(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ls(i){return i.replace(Kg,Jg)}const jg=new Map;function Jg(i,e){let t=Ze[e];if(t===void 0){const n=jg.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ls(t)}const Qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nc(i){return i.replace(Qg,e0)}function e0(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function ic(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function t0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Xc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===dd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Vn&&(e="SHADOWMAP_TYPE_VSM"),e}function n0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case _r:case xr:e="ENVMAP_TYPE_CUBE";break;case no:e="ENVMAP_TYPE_CUBE_UV";break}return e}function i0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xr:e="ENVMAP_MODE_REFRACTION";break}return e}function r0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case qc:e="ENVMAP_BLENDING_MULTIPLY";break;case Id:e="ENVMAP_BLENDING_MIX";break;case Nd:e="ENVMAP_BLENDING_ADD";break}return e}function a0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function o0(i,e,t,n){const r=i.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=t0(t),l=n0(t),d=i0(t),h=r0(t),f=a0(t),m=qg(t),g=$g(a),_=r.createProgram();let p,u,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zr).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zr).join(`
`),u.length>0&&(u+=`
`)):(p=[ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zr).join(`
`),u=[ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fi?"#define TONE_MAPPING":"",t.toneMapping!==fi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==fi?Yg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Xg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zr).join(`
`)),s=ls(s),s=ec(s,t),s=tc(s,t),o=ls(o),o=ec(o,t),o=tc(o,t),s=nc(s),o=nc(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",t.glslVersion===_l?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const S=E+p+s,A=E+u+o,D=Jl(r,r.VERTEX_SHADER,S),R=Jl(r,r.FRAGMENT_SHADER,A);r.attachShader(_,D),r.attachShader(_,R),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function T(P){if(i.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),z=r.getShaderInfoLog(D).trim(),G=r.getShaderInfoLog(R).trim();let Y=!0,H=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,D,R);else{const ne=Ql(r,D,"vertex"),k=Ql(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+ne+`
`+k)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||G==="")&&(H=!1);H&&(P.diagnostics={runnable:Y,programLog:O,vertexShader:{log:z,prefix:p},fragmentShader:{log:G,prefix:u}})}r.deleteShader(D),r.deleteShader(R),I=new Na(r,_),b=Zg(r,_)}let I;this.getUniforms=function(){return I===void 0&&T(this),I};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,Hg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=R,this}let s0=0;class l0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new c0(e),t.set(e,n)),n}}class c0{constructor(e){this.id=s0++,this.code=e,this.usedTimes=0}}function u0(i,e,t,n,r,a,s){const o=new Ms,c=new l0,l=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function p(b,M,P,O,z){const G=O.fog,Y=z.geometry,H=b.isMeshStandardMaterial?O.environment:null,ne=(b.isMeshStandardMaterial?t:e).get(b.envMap||H),k=ne&&ne.mapping===no?ne.image.height:null,de=g[b.type];b.precision!==null&&(m=r.getMaxPrecision(b.precision),m!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",m,"instead."));const ve=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,pe=ve!==void 0?ve.length:0;let Ue=0;Y.morphAttributes.position!==void 0&&(Ue=1),Y.morphAttributes.normal!==void 0&&(Ue=2),Y.morphAttributes.color!==void 0&&(Ue=3);let Ge,$,L,Z;if(de){const it=Ln[de];Ge=it.vertexShader,$=it.fragmentShader}else Ge=b.vertexShader,$=b.fragmentShader,c.update(b),L=c.getVertexShaderID(b),Z=c.getFragmentShaderID(b);const j=i.getRenderTarget(),_e=z.isInstancedMesh===!0,le=z.isBatchedMesh===!0,Ie=!!b.map,C=!!b.matcap,Pe=!!ne,Ye=!!b.aoMap,ae=!!b.lightMap,J=!!b.bumpMap,Me=!!b.normalMap,ye=!!b.displacementMap,Ee=!!b.emissiveMap,je=!!b.metalnessMap,w=!!b.roughnessMap,x=b.anisotropy>0,F=b.clearcoat>0,ee=b.dispersion>0,te=b.iridescence>0,ie=b.sheen>0,Ae=b.transmission>0,ce=x&&!!b.anisotropyMap,he=F&&!!b.clearcoatMap,ke=F&&!!b.clearcoatNormalMap,ue=F&&!!b.clearcoatRoughnessMap,Te=te&&!!b.iridescenceMap,Je=te&&!!b.iridescenceThicknessMap,Be=ie&&!!b.sheenColorMap,xe=ie&&!!b.sheenRoughnessMap,qe=!!b.specularMap,$e=!!b.specularColorMap,pt=!!b.specularIntensityMap,v=Ae&&!!b.transmissionMap,K=Ae&&!!b.thicknessMap,V=!!b.gradientMap,Q=!!b.alphaMap,se=b.alphaTest>0,Le=!!b.alphaHash,We=!!b.extensions;let mt=fi;b.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(mt=i.toneMapping);const yt={shaderID:de,shaderType:b.type,shaderName:b.name,vertexShader:Ge,fragmentShader:$,defines:b.defines,customVertexShaderID:L,customFragmentShaderID:Z,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:m,batching:le,batchingColor:le&&z._colorsTexture!==null,instancing:_e,instancingColor:_e&&z.instanceColor!==null,instancingMorph:_e&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:xi,alphaToCoverage:!!b.alphaToCoverage,map:Ie,matcap:C,envMap:Pe,envMapMode:Pe&&ne.mapping,envMapCubeUVHeight:k,aoMap:Ye,lightMap:ae,bumpMap:J,normalMap:Me,displacementMap:f&&ye,emissiveMap:Ee,normalMapObjectSpace:Me&&b.normalMapType===rh,normalMapTangentSpace:Me&&b.normalMapType===ih,metalnessMap:je,roughnessMap:w,anisotropy:x,anisotropyMap:ce,clearcoat:F,clearcoatMap:he,clearcoatNormalMap:ke,clearcoatRoughnessMap:ue,dispersion:ee,iridescence:te,iridescenceMap:Te,iridescenceThicknessMap:Je,sheen:ie,sheenColorMap:Be,sheenRoughnessMap:xe,specularMap:qe,specularColorMap:$e,specularIntensityMap:pt,transmission:Ae,transmissionMap:v,thicknessMap:K,gradientMap:V,opaque:b.transparent===!1&&b.blending===hn&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:se,alphaHash:Le,combine:b.combine,mapUv:Ie&&_(b.map.channel),aoMapUv:Ye&&_(b.aoMap.channel),lightMapUv:ae&&_(b.lightMap.channel),bumpMapUv:J&&_(b.bumpMap.channel),normalMapUv:Me&&_(b.normalMap.channel),displacementMapUv:ye&&_(b.displacementMap.channel),emissiveMapUv:Ee&&_(b.emissiveMap.channel),metalnessMapUv:je&&_(b.metalnessMap.channel),roughnessMapUv:w&&_(b.roughnessMap.channel),anisotropyMapUv:ce&&_(b.anisotropyMap.channel),clearcoatMapUv:he&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ke&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:xe&&_(b.sheenRoughnessMap.channel),specularMapUv:qe&&_(b.specularMap.channel),specularColorMapUv:$e&&_(b.specularColorMap.channel),specularIntensityMapUv:pt&&_(b.specularIntensityMap.channel),transmissionMapUv:v&&_(b.transmissionMap.channel),thicknessMapUv:K&&_(b.thicknessMap.channel),alphaMapUv:Q&&_(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Me||x),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(Ie||Q),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Ue,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:mt,decodeVideoTexture:Ie&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===dt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===tn,flipSided:b.side===rn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:We&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:We&&b.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return yt.vertexUv1s=l.has(1),yt.vertexUv2s=l.has(2),yt.vertexUv3s=l.has(3),l.clear(),yt}function u(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)M.push(P),M.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(E(M,b),S(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function E(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function S(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.doubleSided&&o.enable(10),M.flipSided&&o.enable(11),M.useDepthPacking&&o.enable(12),M.dithering&&o.enable(13),M.transmission&&o.enable(14),M.sheen&&o.enable(15),M.opaque&&o.enable(16),M.pointsUvs&&o.enable(17),M.decodeVideoTexture&&o.enable(18),M.alphaToCoverage&&o.enable(19),b.push(o.mask)}function A(b){const M=g[b.type];let P;if(M){const O=Ln[M];P=qh.clone(O.uniforms)}else P=b.uniforms;return P}function D(b,M){let P;for(let O=0,z=d.length;O<z;O++){const G=d[O];if(G.cacheKey===M){P=G,++P.usedTimes;break}}return P===void 0&&(P=new o0(i,M,b,a),d.push(P)),P}function R(b){if(--b.usedTimes===0){const M=d.indexOf(b);d[M]=d[d.length-1],d.pop(),b.destroy()}}function T(b){c.remove(b)}function I(){c.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:A,acquireProgram:D,releaseProgram:R,releaseShaderCache:T,programs:d,dispose:I}}function d0(){let i=new WeakMap;function e(a){let s=i.get(a);return s===void 0&&(s={},i.set(a,s)),s}function t(a){i.delete(a)}function n(a,s,o){i.get(a)[s]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function h0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function rc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ac(){const i=[];let e=0;const t=[],n=[],r=[];function a(){e=0,t.length=0,n.length=0,r.length=0}function s(h,f,m,g,_,p){let u=i[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:m,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},i[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=h.renderOrder,u.z=_,u.group=p),e++,u}function o(h,f,m,g,_,p){const u=s(h,f,m,g,_,p);m.transmission>0?n.push(u):m.transparent===!0?r.push(u):t.push(u)}function c(h,f,m,g,_,p){const u=s(h,f,m,g,_,p);m.transmission>0?n.unshift(u):m.transparent===!0?r.unshift(u):t.unshift(u)}function l(h,f){t.length>1&&t.sort(h||h0),n.length>1&&n.sort(f||rc),r.length>1&&r.sort(f||rc)}function d(){for(let h=e,f=i.length;h<f;h++){const m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:a,push:o,unshift:c,finish:d,sort:l}}function f0(){let i=new WeakMap;function e(n,r){const a=i.get(n);let s;return a===void 0?(s=new ac,i.set(n,[s])):r>=a.length?(s=new ac,a.push(s)):s=a[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function p0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Re};break;case"SpotLight":t={position:new N,direction:new N,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function m0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let g0=0;function v0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function _0(i){const e=new p0,t=m0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const r=new N,a=new _t,s=new _t;function o(l){let d=0,h=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let m=0,g=0,_=0,p=0,u=0,E=0,S=0,A=0,D=0,R=0,T=0;l.sort(v0);for(let b=0,M=l.length;b<M;b++){const P=l[b],O=P.color,z=P.intensity,G=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=O.r*z,h+=O.g*z,f+=O.b*z;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],z);T++}else if(P.isDirectionalLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ne=P.shadow,k=t.get(P);k.shadowBias=ne.bias,k.shadowNormalBias=ne.normalBias,k.shadowRadius=ne.radius,k.shadowMapSize=ne.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=Y,n.directionalShadowMatrix[m]=P.shadow.matrix,E++}n.directional[m]=H,m++}else if(P.isSpotLight){const H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(O).multiplyScalar(z),H.distance=G,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[_]=H;const ne=P.shadow;if(P.map&&(n.spotLightMap[D]=P.map,D++,ne.updateMatrices(P),P.castShadow&&R++),n.spotLightMatrix[_]=ne.matrix,P.castShadow){const k=t.get(P);k.shadowBias=ne.bias,k.shadowNormalBias=ne.normalBias,k.shadowRadius=ne.radius,k.shadowMapSize=ne.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=Y,A++}_++}else if(P.isRectAreaLight){const H=e.get(P);H.color.copy(O).multiplyScalar(z),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=H,p++}else if(P.isPointLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const ne=P.shadow,k=t.get(P);k.shadowBias=ne.bias,k.shadowNormalBias=ne.normalBias,k.shadowRadius=ne.radius,k.shadowMapSize=ne.mapSize,k.shadowCameraNear=ne.camera.near,k.shadowCameraFar=ne.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=H,g++}else if(P.isHemisphereLight){const H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(z),H.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[u]=H,u++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==u||I.numDirectionalShadows!==E||I.numPointShadows!==S||I.numSpotShadows!==A||I.numSpotMaps!==D||I.numLightProbes!==T)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=A+D-R,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=T,I.directionalLength=m,I.pointLength=g,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=u,I.numDirectionalShadows=E,I.numPointShadows=S,I.numSpotShadows=A,I.numSpotMaps=D,I.numLightProbes=T,n.version=g0++)}function c(l,d){let h=0,f=0,m=0,g=0,_=0;const p=d.matrixWorldInverse;for(let u=0,E=l.length;u<E;u++){const S=l[u];if(S.isDirectionalLight){const A=n.directional[h];A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),h++}else if(S.isSpotLight){const A=n.spot[m];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const A=n.rectArea[g];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),s.identity(),a.copy(S.matrixWorld),a.premultiply(p),s.extractRotation(a),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(s),A.halfHeight.applyMatrix4(s),g++}else if(S.isPointLight){const A=n.point[f];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const A=n.hemi[_];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(p),_++}}}return{setup:o,setupView:c,state:n}}function oc(i){const e=new _0(i),t=[],n=[];function r(d){l.camera=d,t.length=0,n.length=0}function a(d){t.push(d)}function s(d){n.push(d)}function o(){e.setup(t)}function c(d){e.setupView(t,d)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:s}}function x0(i){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new oc(i),e.set(r,[o])):a>=s.length?(o=new oc(i),s.push(o)):o=s[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class S0 extends Rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class M0 extends Rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const y0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,b0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function E0(i,e,t){let n=new hu;const r=new Ve,a=new Ve,s=new Pt,o=new S0({depthPacking:nh}),c=new M0,l={},d=t.maxTextureSize,h={[mi]:rn,[rn]:mi,[tn]:tn},f=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:y0,fragmentShader:b0}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new zt;g.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Tt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xc;let u=this.type;this.render=function(R,T,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(hi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=u!==Vn&&this.type===Vn,G=u===Vn&&this.type!==Vn;for(let Y=0,H=R.length;Y<H;Y++){const ne=R[Y],k=ne.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const de=k.getFrameExtents();if(r.multiply(de),a.copy(k.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(a.x=Math.floor(d/de.x),r.x=a.x*de.x,k.mapSize.x=a.x),r.y>d&&(a.y=Math.floor(d/de.y),r.y=a.y*de.y,k.mapSize.y=a.y)),k.map===null||z===!0||G===!0){const pe=this.type!==Vn?{minFilter:nn,magFilter:nn}:{};k.map!==null&&k.map.dispose(),k.map=new Zn(r.x,r.y,pe),k.map.texture.name=ne.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ve=k.getViewportCount();for(let pe=0;pe<ve;pe++){const Ue=k.getViewport(pe);s.set(a.x*Ue.x,a.y*Ue.y,a.x*Ue.z,a.y*Ue.w),O.viewport(s),k.updateMatrices(ne,pe),n=k.getFrustum(),A(T,I,k.camera,ne,this.type)}k.isPointLightShadow!==!0&&this.type===Vn&&E(k,I),k.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(b,M,P)};function E(R,T){const I=e.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Zn(r.x,r.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(T,null,I,f,_,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(T,null,I,m,_,null)}function S(R,T,I,b){let M=null;const P=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?c:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const O=M.uuid,z=T.uuid;let G=l[O];G===void 0&&(G={},l[O]=G);let Y=G[z];Y===void 0&&(Y=M.clone(),G[z]=Y,T.addEventListener("dispose",D)),M=Y}if(M.visible=T.visible,M.wireframe=T.wireframe,b===Vn?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:h[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=i.properties.get(M);O.light=I}return M}function A(R,T,I,b,M){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===Vn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const z=e.update(R),G=R.material;if(Array.isArray(G)){const Y=z.groups;for(let H=0,ne=Y.length;H<ne;H++){const k=Y[H],de=G[k.materialIndex];if(de&&de.visible){const ve=S(R,de,b,M);R.onBeforeShadow(i,R,T,I,z,ve,k),i.renderBufferDirect(I,null,z,ve,R,k),R.onAfterShadow(i,R,T,I,z,ve,k)}}}else if(G.visible){const Y=S(R,G,b,M);R.onBeforeShadow(i,R,T,I,z,Y,null),i.renderBufferDirect(I,null,z,Y,R,null),R.onAfterShadow(i,R,T,I,z,Y,null)}}const O=R.children;for(let z=0,G=O.length;z<G;z++)A(O[z],T,I,b,M)}function D(R){R.target.removeEventListener("dispose",D);for(const I in l){const b=l[I],M=R.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}function w0(i){function e(){let v=!1;const K=new Pt;let V=null;const Q=new Pt(0,0,0,0);return{setMask:function(se){V!==se&&!v&&(i.colorMask(se,se,se,se),V=se)},setLocked:function(se){v=se},setClear:function(se,Le,We,mt,yt){yt===!0&&(se*=mt,Le*=mt,We*=mt),K.set(se,Le,We,mt),Q.equals(K)===!1&&(i.clearColor(se,Le,We,mt),Q.copy(K))},reset:function(){v=!1,V=null,Q.set(-1,0,0,0)}}}function t(){let v=!1,K=null,V=null,Q=null;return{setTest:function(se){se?Z(i.DEPTH_TEST):j(i.DEPTH_TEST)},setMask:function(se){K!==se&&!v&&(i.depthMask(se),K=se)},setFunc:function(se){if(V!==se){switch(se){case Cd:i.depthFunc(i.NEVER);break;case Rd:i.depthFunc(i.ALWAYS);break;case Pd:i.depthFunc(i.LESS);break;case ka:i.depthFunc(i.LEQUAL);break;case Ld:i.depthFunc(i.EQUAL);break;case Dd:i.depthFunc(i.GEQUAL);break;case Fd:i.depthFunc(i.GREATER);break;case Ud:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}V=se}},setLocked:function(se){v=se},setClear:function(se){Q!==se&&(i.clearDepth(se),Q=se)},reset:function(){v=!1,K=null,V=null,Q=null}}}function n(){let v=!1,K=null,V=null,Q=null,se=null,Le=null,We=null,mt=null,yt=null;return{setTest:function(it){v||(it?Z(i.STENCIL_TEST):j(i.STENCIL_TEST))},setMask:function(it){K!==it&&!v&&(i.stencilMask(it),K=it)},setFunc:function(it,bt,Et){(V!==it||Q!==bt||se!==Et)&&(i.stencilFunc(it,bt,Et),V=it,Q=bt,se=Et)},setOp:function(it,bt,Et){(Le!==it||We!==bt||mt!==Et)&&(i.stencilOp(it,bt,Et),Le=it,We=bt,mt=Et)},setLocked:function(it){v=it},setClear:function(it){yt!==it&&(i.clearStencil(it),yt=it)},reset:function(){v=!1,K=null,V=null,Q=null,se=null,Le=null,We=null,mt=null,yt=null}}}const r=new e,a=new t,s=new n,o=new WeakMap,c=new WeakMap;let l={},d={},h=new WeakMap,f=[],m=null,g=!1,_=null,p=null,u=null,E=null,S=null,A=null,D=null,R=new Re(0,0,0),T=0,I=!1,b=null,M=null,P=null,O=null,z=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,H=0;const ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(ne)[1]),Y=H>=1):ne.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),Y=H>=2);let k=null,de={};const ve=i.getParameter(i.SCISSOR_BOX),pe=i.getParameter(i.VIEWPORT),Ue=new Pt().fromArray(ve),Ge=new Pt().fromArray(pe);function $(v,K,V,Q){const se=new Uint8Array(4),Le=i.createTexture();i.bindTexture(v,Le),i.texParameteri(v,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(v,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let We=0;We<V;We++)v===i.TEXTURE_3D||v===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,se):i.texImage2D(K+We,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,se);return Le}const L={};L[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),L[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),L[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),L[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),s.setClear(0),Z(i.DEPTH_TEST),a.setFunc(ka),J(!1),Me(Hs),Z(i.CULL_FACE),Ye(hi);function Z(v){l[v]!==!0&&(i.enable(v),l[v]=!0)}function j(v){l[v]!==!1&&(i.disable(v),l[v]=!1)}function _e(v,K){return d[v]!==K?(i.bindFramebuffer(v,K),d[v]=K,v===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=K),v===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=K),!0):!1}function le(v,K){let V=f,Q=!1;if(v){V=h.get(K),V===void 0&&(V=[],h.set(K,V));const se=v.textures;if(V.length!==se.length||V[0]!==i.COLOR_ATTACHMENT0){for(let Le=0,We=se.length;Le<We;Le++)V[Le]=i.COLOR_ATTACHMENT0+Le;V.length=se.length,Q=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,Q=!0);Q&&i.drawBuffers(V)}function Ie(v){return m!==v?(i.useProgram(v),m=v,!0):!1}const C={[si]:i.FUNC_ADD,[hd]:i.FUNC_SUBTRACT,[fd]:i.FUNC_REVERSE_SUBTRACT};C[pd]=i.MIN,C[md]=i.MAX;const Pe={[gd]:i.ZERO,[ts]:i.ONE,[vd]:i.SRC_COLOR,[ns]:i.SRC_ALPHA,[bd]:i.SRC_ALPHA_SATURATE,[Md]:i.DST_COLOR,[xd]:i.DST_ALPHA,[_d]:i.ONE_MINUS_SRC_COLOR,[is]:i.ONE_MINUS_SRC_ALPHA,[yd]:i.ONE_MINUS_DST_COLOR,[Sd]:i.ONE_MINUS_DST_ALPHA,[Ed]:i.CONSTANT_COLOR,[wd]:i.ONE_MINUS_CONSTANT_COLOR,[Ad]:i.CONSTANT_ALPHA,[Td]:i.ONE_MINUS_CONSTANT_ALPHA};function Ye(v,K,V,Q,se,Le,We,mt,yt,it){if(v===hi){g===!0&&(j(i.BLEND),g=!1);return}if(g===!1&&(Z(i.BLEND),g=!0),v!==Yc){if(v!==_||it!==I){if((p!==si||S!==si)&&(i.blendEquation(i.FUNC_ADD),p=si,S=si),it)switch(v){case hn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vr:i.blendFunc(i.ONE,i.ONE);break;case Vs:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gs:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case hn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Vs:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gs:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}u=null,E=null,A=null,D=null,R.set(0,0,0),T=0,_=v,I=it}return}se=se||K,Le=Le||V,We=We||Q,(K!==p||se!==S)&&(i.blendEquationSeparate(C[K],C[se]),p=K,S=se),(V!==u||Q!==E||Le!==A||We!==D)&&(i.blendFuncSeparate(Pe[V],Pe[Q],Pe[Le],Pe[We]),u=V,E=Q,A=Le,D=We),(mt.equals(R)===!1||yt!==T)&&(i.blendColor(mt.r,mt.g,mt.b,yt),R.copy(mt),T=yt),_=v,I=!1}function ae(v,K){v.side===tn?j(i.CULL_FACE):Z(i.CULL_FACE);let V=v.side===rn;K&&(V=!V),J(V),v.blending===hn&&v.transparent===!1?Ye(hi):Ye(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),a.setFunc(v.depthFunc),a.setTest(v.depthTest),a.setMask(v.depthWrite),r.setMask(v.colorWrite);const Q=v.stencilWrite;s.setTest(Q),Q&&(s.setMask(v.stencilWriteMask),s.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),s.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),Ee(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):j(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(v){b!==v&&(v?i.frontFace(i.CW):i.frontFace(i.CCW),b=v)}function Me(v){v!==cd?(Z(i.CULL_FACE),v!==M&&(v===Hs?i.cullFace(i.BACK):v===ud?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):j(i.CULL_FACE),M=v}function ye(v){v!==P&&(Y&&i.lineWidth(v),P=v)}function Ee(v,K,V){v?(Z(i.POLYGON_OFFSET_FILL),(O!==K||z!==V)&&(i.polygonOffset(K,V),O=K,z=V)):j(i.POLYGON_OFFSET_FILL)}function je(v){v?Z(i.SCISSOR_TEST):j(i.SCISSOR_TEST)}function w(v){v===void 0&&(v=i.TEXTURE0+G-1),k!==v&&(i.activeTexture(v),k=v)}function x(v,K,V){V===void 0&&(k===null?V=i.TEXTURE0+G-1:V=k);let Q=de[V];Q===void 0&&(Q={type:void 0,texture:void 0},de[V]=Q),(Q.type!==v||Q.texture!==K)&&(k!==V&&(i.activeTexture(V),k=V),i.bindTexture(v,K||L[v]),Q.type=v,Q.texture=K)}function F(){const v=de[k];v!==void 0&&v.type!==void 0&&(i.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function ee(){try{i.compressedTexImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function te(){try{i.compressedTexImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ie(){try{i.texSubImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Ae(){try{i.texSubImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ce(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function he(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ue(){try{i.texStorage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Te(){try{i.texImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Je(){try{i.texImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Be(v){Ue.equals(v)===!1&&(i.scissor(v.x,v.y,v.z,v.w),Ue.copy(v))}function xe(v){Ge.equals(v)===!1&&(i.viewport(v.x,v.y,v.z,v.w),Ge.copy(v))}function qe(v,K){let V=c.get(K);V===void 0&&(V=new WeakMap,c.set(K,V));let Q=V.get(v);Q===void 0&&(Q=i.getUniformBlockIndex(K,v.name),V.set(v,Q))}function $e(v,K){const Q=c.get(K).get(v);o.get(K)!==Q&&(i.uniformBlockBinding(K,Q,v.__bindingPointIndex),o.set(K,Q))}function pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},k=null,de={},d={},h=new WeakMap,f=[],m=null,g=!1,_=null,p=null,u=null,E=null,S=null,A=null,D=null,R=new Re(0,0,0),T=0,I=!1,b=null,M=null,P=null,O=null,z=null,Ue.set(0,0,i.canvas.width,i.canvas.height),Ge.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),s.reset()}return{buffers:{color:r,depth:a,stencil:s},enable:Z,disable:j,bindFramebuffer:_e,drawBuffers:le,useProgram:Ie,setBlending:Ye,setMaterial:ae,setFlipSided:J,setCullFace:Me,setLineWidth:ye,setPolygonOffset:Ee,setScissorTest:je,activeTexture:w,bindTexture:x,unbindTexture:F,compressedTexImage2D:ee,compressedTexImage3D:te,texImage2D:Te,texImage3D:Je,updateUBOMapping:qe,uniformBlockBinding:$e,texStorage2D:ke,texStorage3D:ue,texSubImage2D:ie,texSubImage3D:Ae,compressedTexSubImage2D:ce,compressedTexSubImage3D:he,scissor:Be,viewport:xe,reset:pt}}function A0(i,e,t,n,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ve,d=new WeakMap;let h;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return m?new OffscreenCanvas(w,x):Ya("canvas")}function _(w,x,F){let ee=1;const te=je(w);if((te.width>F||te.height>F)&&(ee=F/Math.max(te.width,te.height)),ee<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ie=Math.floor(ee*te.width),Ae=Math.floor(ee*te.height);h===void 0&&(h=g(ie,Ae));const ce=x?g(ie,Ae):h;return ce.width=ie,ce.height=Ae,ce.getContext("2d").drawImage(w,0,0,ie,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ie+"x"+Ae+")."),ce}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),w;return w}function p(w){return w.generateMipmaps&&w.minFilter!==nn&&w.minFilter!==Rt}function u(w){i.generateMipmap(w)}function E(w,x,F,ee,te=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ie=x;if(x===i.RED&&(F===i.FLOAT&&(ie=i.R32F),F===i.HALF_FLOAT&&(ie=i.R16F),F===i.UNSIGNED_BYTE&&(ie=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(ie=i.R8UI),F===i.UNSIGNED_SHORT&&(ie=i.R16UI),F===i.UNSIGNED_INT&&(ie=i.R32UI),F===i.BYTE&&(ie=i.R8I),F===i.SHORT&&(ie=i.R16I),F===i.INT&&(ie=i.R32I)),x===i.RG&&(F===i.FLOAT&&(ie=i.RG32F),F===i.HALF_FLOAT&&(ie=i.RG16F),F===i.UNSIGNED_BYTE&&(ie=i.RG8)),x===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(ie=i.RG8UI),F===i.UNSIGNED_SHORT&&(ie=i.RG16UI),F===i.UNSIGNED_INT&&(ie=i.RG32UI),F===i.BYTE&&(ie=i.RG8I),F===i.SHORT&&(ie=i.RG16I),F===i.INT&&(ie=i.RG32I)),x===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),x===i.RGBA){const Ae=te?Va:st.getTransfer(ee);F===i.FLOAT&&(ie=i.RGBA32F),F===i.HALF_FLOAT&&(ie=i.RGBA16F),F===i.UNSIGNED_BYTE&&(ie=Ae===dt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function S(w,x){let F;return w?x===null||x===Sr||x===Mr?F=i.DEPTH24_STENCIL8:x===Xn?F=i.DEPTH32F_STENCIL8:x===Ha&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Sr||x===Mr?F=i.DEPTH_COMPONENT24:x===Xn?F=i.DEPTH_COMPONENT32F:x===Ha&&(F=i.DEPTH_COMPONENT16),F}function A(w,x){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==nn&&w.minFilter!==Rt?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function D(w){const x=w.target;x.removeEventListener("dispose",D),T(x),x.isVideoTexture&&d.delete(x)}function R(w){const x=w.target;x.removeEventListener("dispose",R),b(x)}function T(w){const x=n.get(w);if(x.__webglInit===void 0)return;const F=w.source,ee=f.get(F);if(ee){const te=ee[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&I(w),Object.keys(ee).length===0&&f.delete(F)}n.remove(w)}function I(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const F=w.source,ee=f.get(F);delete ee[x.__cacheKey],s.memory.textures--}function b(w){const x=n.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(x.__webglFramebuffer[ee]))for(let te=0;te<x.__webglFramebuffer[ee].length;te++)i.deleteFramebuffer(x.__webglFramebuffer[ee][te]);else i.deleteFramebuffer(x.__webglFramebuffer[ee]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[ee])}else{if(Array.isArray(x.__webglFramebuffer))for(let ee=0;ee<x.__webglFramebuffer.length;ee++)i.deleteFramebuffer(x.__webglFramebuffer[ee]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let ee=0;ee<x.__webglColorRenderbuffer.length;ee++)x.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[ee]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const F=w.textures;for(let ee=0,te=F.length;ee<te;ee++){const ie=n.get(F[ee]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),s.memory.textures--),n.remove(F[ee])}n.remove(w)}let M=0;function P(){M=0}function O(){const w=M;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),M+=1,w}function z(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function G(w,x){const F=n.get(w);if(w.isVideoTexture&&ye(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){const ee=w.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ge(F,w,x);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function Y(w,x){const F=n.get(w);if(w.version>0&&F.__version!==w.version){Ge(F,w,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function H(w,x){const F=n.get(w);if(w.version>0&&F.__version!==w.version){Ge(F,w,x);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function ne(w,x){const F=n.get(w);if(w.version>0&&F.__version!==w.version){$(F,w,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}const k={[os]:i.REPEAT,[En]:i.CLAMP_TO_EDGE,[ss]:i.MIRRORED_REPEAT},de={[nn]:i.NEAREST,[Wd]:i.NEAREST_MIPMAP_NEAREST,[aa]:i.NEAREST_MIPMAP_LINEAR,[Rt]:i.LINEAR,[vo]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},ve={[ah]:i.NEVER,[dh]:i.ALWAYS,[oh]:i.LESS,[tu]:i.LEQUAL,[sh]:i.EQUAL,[uh]:i.GEQUAL,[lh]:i.GREATER,[ch]:i.NOTEQUAL};function pe(w,x){if(x.type===Xn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Rt||x.magFilter===vo||x.magFilter===aa||x.magFilter===Ui||x.minFilter===Rt||x.minFilter===vo||x.minFilter===aa||x.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,k[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,k[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,k[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,de[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,de[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ve[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===nn||x.minFilter!==aa&&x.minFilter!==Ui||x.type===Xn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Ue(w,x){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",D));const ee=x.source;let te=f.get(ee);te===void 0&&(te={},f.set(ee,te));const ie=z(x);if(ie!==w.__cacheKey){te[ie]===void 0&&(te[ie]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,F=!0),te[ie].usedTimes++;const Ae=te[w.__cacheKey];Ae!==void 0&&(te[w.__cacheKey].usedTimes--,Ae.usedTimes===0&&I(x)),w.__cacheKey=ie,w.__webglTexture=te[ie].texture}return F}function Ge(w,x,F){let ee=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ee=i.TEXTURE_3D);const te=Ue(w,x),ie=x.source;t.bindTexture(ee,w.__webglTexture,i.TEXTURE0+F);const Ae=n.get(ie);if(ie.version!==Ae.__version||te===!0){t.activeTexture(i.TEXTURE0+F);const ce=st.getPrimaries(st.workingColorSpace),he=x.colorSpace===li?null:st.getPrimaries(x.colorSpace),ke=x.colorSpace===li||ce===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let ue=_(x.image,!1,r.maxTextureSize);ue=Ee(x,ue);const Te=a.convert(x.format,x.colorSpace),Je=a.convert(x.type);let Be=E(x.internalFormat,Te,Je,x.colorSpace,x.isVideoTexture);pe(ee,x);let xe;const qe=x.mipmaps,$e=x.isVideoTexture!==!0,pt=Ae.__version===void 0||te===!0,v=ie.dataReady,K=A(x,ue);if(x.isDepthTexture)Be=S(x.format===yr,x.type),pt&&($e?t.texStorage2D(i.TEXTURE_2D,1,Be,ue.width,ue.height):t.texImage2D(i.TEXTURE_2D,0,Be,ue.width,ue.height,0,Te,Je,null));else if(x.isDataTexture)if(qe.length>0){$e&&pt&&t.texStorage2D(i.TEXTURE_2D,K,Be,qe[0].width,qe[0].height);for(let V=0,Q=qe.length;V<Q;V++)xe=qe[V],$e?v&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,xe.width,xe.height,Te,Je,xe.data):t.texImage2D(i.TEXTURE_2D,V,Be,xe.width,xe.height,0,Te,Je,xe.data);x.generateMipmaps=!1}else $e?(pt&&t.texStorage2D(i.TEXTURE_2D,K,Be,ue.width,ue.height),v&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue.width,ue.height,Te,Je,ue.data)):t.texImage2D(i.TEXTURE_2D,0,Be,ue.width,ue.height,0,Te,Je,ue.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){$e&&pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,K,Be,qe[0].width,qe[0].height,ue.depth);for(let V=0,Q=qe.length;V<Q;V++)if(xe=qe[V],x.format!==vn)if(Te!==null)if($e){if(v)if(x.layerUpdates.size>0){for(const se of x.layerUpdates){const Le=xe.width*xe.height;t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,se,xe.width,xe.height,1,Te,xe.data.slice(Le*se,Le*(se+1)),0,0)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,xe.width,xe.height,ue.depth,Te,xe.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Be,xe.width,xe.height,ue.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?v&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,xe.width,xe.height,ue.depth,Te,Je,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,V,Be,xe.width,xe.height,ue.depth,0,Te,Je,xe.data)}else{$e&&pt&&t.texStorage2D(i.TEXTURE_2D,K,Be,qe[0].width,qe[0].height);for(let V=0,Q=qe.length;V<Q;V++)xe=qe[V],x.format!==vn?Te!==null?$e?v&&t.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,xe.width,xe.height,Te,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,V,Be,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?v&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,xe.width,xe.height,Te,Je,xe.data):t.texImage2D(i.TEXTURE_2D,V,Be,xe.width,xe.height,0,Te,Je,xe.data)}else if(x.isDataArrayTexture)if($e){if(pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,K,Be,ue.width,ue.height,ue.depth),v)if(x.layerUpdates.size>0){let V;switch(Je){case i.UNSIGNED_BYTE:switch(Te){case i.ALPHA:V=1;break;case i.LUMINANCE:V=1;break;case i.LUMINANCE_ALPHA:V=2;break;case i.RGB:V=3;break;case i.RGBA:V=4;break;default:throw new Error(`Unknown texel size for format ${Te}.`)}break;case i.UNSIGNED_SHORT_4_4_4_4:case i.UNSIGNED_SHORT_5_5_5_1:case i.UNSIGNED_SHORT_5_6_5:V=1;break;default:throw new Error(`Unknown texel size for type ${Je}.`)}const Q=ue.width*ue.height*V;for(const se of x.layerUpdates)t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,se,ue.width,ue.height,1,Te,Je,ue.data.slice(Q*se,Q*(se+1)));x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Te,Je,ue.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Be,ue.width,ue.height,ue.depth,0,Te,Je,ue.data);else if(x.isData3DTexture)$e?(pt&&t.texStorage3D(i.TEXTURE_3D,K,Be,ue.width,ue.height,ue.depth),v&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Te,Je,ue.data)):t.texImage3D(i.TEXTURE_3D,0,Be,ue.width,ue.height,ue.depth,0,Te,Je,ue.data);else if(x.isFramebufferTexture){if(pt)if($e)t.texStorage2D(i.TEXTURE_2D,K,Be,ue.width,ue.height);else{let V=ue.width,Q=ue.height;for(let se=0;se<K;se++)t.texImage2D(i.TEXTURE_2D,se,Be,V,Q,0,Te,Je,null),V>>=1,Q>>=1}}else if(qe.length>0){if($e&&pt){const V=je(qe[0]);t.texStorage2D(i.TEXTURE_2D,K,Be,V.width,V.height)}for(let V=0,Q=qe.length;V<Q;V++)xe=qe[V],$e?v&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,Te,Je,xe):t.texImage2D(i.TEXTURE_2D,V,Be,Te,Je,xe);x.generateMipmaps=!1}else if($e){if(pt){const V=je(ue);t.texStorage2D(i.TEXTURE_2D,K,Be,V.width,V.height)}v&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,Je,ue)}else t.texImage2D(i.TEXTURE_2D,0,Be,Te,Je,ue);p(x)&&u(ee),Ae.__version=ie.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function $(w,x,F){if(x.image.length!==6)return;const ee=Ue(w,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);const ie=n.get(te);if(te.version!==ie.__version||ee===!0){t.activeTexture(i.TEXTURE0+F);const Ae=st.getPrimaries(st.workingColorSpace),ce=x.colorSpace===li?null:st.getPrimaries(x.colorSpace),he=x.colorSpace===li||Ae===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const ke=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,Te=[];for(let Q=0;Q<6;Q++)!ke&&!ue?Te[Q]=_(x.image[Q],!0,r.maxCubemapSize):Te[Q]=ue?x.image[Q].image:x.image[Q],Te[Q]=Ee(x,Te[Q]);const Je=Te[0],Be=a.convert(x.format,x.colorSpace),xe=a.convert(x.type),qe=E(x.internalFormat,Be,xe,x.colorSpace),$e=x.isVideoTexture!==!0,pt=ie.__version===void 0||ee===!0,v=te.dataReady;let K=A(x,Je);pe(i.TEXTURE_CUBE_MAP,x);let V;if(ke){$e&&pt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,K,qe,Je.width,Je.height);for(let Q=0;Q<6;Q++){V=Te[Q].mipmaps;for(let se=0;se<V.length;se++){const Le=V[se];x.format!==vn?Be!==null?$e?v&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se,0,0,Le.width,Le.height,Be,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se,qe,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?v&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se,0,0,Le.width,Le.height,Be,xe,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se,qe,Le.width,Le.height,0,Be,xe,Le.data)}}}else{if(V=x.mipmaps,$e&&pt){V.length>0&&K++;const Q=je(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,K,qe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ue){$e?v&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Te[Q].width,Te[Q].height,Be,xe,Te[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,qe,Te[Q].width,Te[Q].height,0,Be,xe,Te[Q].data);for(let se=0;se<V.length;se++){const We=V[se].image[Q].image;$e?v&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se+1,0,0,We.width,We.height,Be,xe,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se+1,qe,We.width,We.height,0,Be,xe,We.data)}}else{$e?v&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Be,xe,Te[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,qe,Be,xe,Te[Q]);for(let se=0;se<V.length;se++){const Le=V[se];$e?v&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se+1,0,0,Be,xe,Le.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se+1,qe,Be,xe,Le.image[Q])}}}p(x)&&u(i.TEXTURE_CUBE_MAP),ie.__version=te.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function L(w,x,F,ee,te,ie){const Ae=a.convert(F.format,F.colorSpace),ce=a.convert(F.type),he=E(F.internalFormat,Ae,ce,F.colorSpace);if(!n.get(x).__hasExternalTextures){const ue=Math.max(1,x.width>>ie),Te=Math.max(1,x.height>>ie);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,ie,he,ue,Te,x.depth,0,Ae,ce,null):t.texImage2D(te,ie,he,ue,Te,0,Ae,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Me(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,te,n.get(F).__webglTexture,0,J(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,te,n.get(F).__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(w,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const ee=x.depthTexture,te=ee&&ee.isDepthTexture?ee.type:null,ie=S(x.stencilBuffer,te),Ae=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=J(x);Me(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,ie,x.width,x.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,ie,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ie,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,w)}else{const ee=x.textures;for(let te=0;te<ee.length;te++){const ie=ee[te],Ae=a.convert(ie.format,ie.colorSpace),ce=a.convert(ie.type),he=E(ie.internalFormat,Ae,ce,ie.colorSpace),ke=J(x);F&&Me(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,he,x.width,x.height):Me(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ke,he,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,he,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function j(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);const ee=n.get(x.depthTexture).__webglTexture,te=J(x);if(x.depthTexture.format===fr)Me(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(x.depthTexture.format===yr)Me(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function _e(w){const x=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");j(x.__webglFramebuffer,w)}else if(F){x.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[ee]),x.__webglDepthbuffer[ee]=i.createRenderbuffer(),Z(x.__webglDepthbuffer[ee],w,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),Z(x.__webglDepthbuffer,w,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(w,x,F){const ee=n.get(w);x!==void 0&&L(ee.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&_e(w)}function Ie(w){const x=w.texture,F=n.get(w),ee=n.get(x);w.addEventListener("dispose",R);const te=w.textures,ie=w.isWebGLCubeRenderTarget===!0,Ae=te.length>1;if(Ae||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=x.version,s.memory.textures++),ie){F.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[ce]=[];for(let he=0;he<x.mipmaps.length;he++)F.__webglFramebuffer[ce][he]=i.createFramebuffer()}else F.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let ce=0;ce<x.mipmaps.length;ce++)F.__webglFramebuffer[ce]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let ce=0,he=te.length;ce<he;ce++){const ke=n.get(te[ce]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),s.memory.textures++)}if(w.samples>0&&Me(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ce=0;ce<te.length;ce++){const he=te[ce];F.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ce]);const ke=a.convert(he.format,he.colorSpace),ue=a.convert(he.type),Te=E(he.internalFormat,ke,ue,he.colorSpace,w.isXRRenderTarget===!0),Je=J(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Je,Te,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,F.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Z(F.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),pe(i.TEXTURE_CUBE_MAP,x);for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0)for(let he=0;he<x.mipmaps.length;he++)L(F.__webglFramebuffer[ce][he],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,he);else L(F.__webglFramebuffer[ce],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);p(x)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let ce=0,he=te.length;ce<he;ce++){const ke=te[ce],ue=n.get(ke);t.bindTexture(i.TEXTURE_2D,ue.__webglTexture),pe(i.TEXTURE_2D,ke),L(F.__webglFramebuffer,w,ke,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),p(ke)&&u(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ce=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,ee.__webglTexture),pe(ce,x),x.mipmaps&&x.mipmaps.length>0)for(let he=0;he<x.mipmaps.length;he++)L(F.__webglFramebuffer[he],w,x,i.COLOR_ATTACHMENT0,ce,he);else L(F.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,ce,0);p(x)&&u(ce),t.unbindTexture()}w.depthBuffer&&_e(w)}function C(w){const x=w.textures;for(let F=0,ee=x.length;F<ee;F++){const te=x[F];if(p(te)){const ie=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Ae=n.get(te).__webglTexture;t.bindTexture(ie,Ae),u(ie),t.unbindTexture()}}}const Pe=[],Ye=[];function ae(w){if(w.samples>0){if(Me(w)===!1){const x=w.textures,F=w.width,ee=w.height;let te=i.COLOR_BUFFER_BIT;const ie=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(w),ce=x.length>1;if(ce)for(let he=0;he<x.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let he=0;he<x.length;he++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[he]);const ke=n.get(x[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ke,0)}i.blitFramebuffer(0,0,F,ee,0,0,F,ee,te,i.NEAREST),c===!0&&(Pe.length=0,Ye.length=0,Pe.push(i.COLOR_ATTACHMENT0+he),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Pe.push(ie),Ye.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ye)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let he=0;he<x.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[he]);const ke=n.get(x[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function J(w){return Math.min(r.maxSamples,w.samples)}function Me(w){const x=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ye(w){const x=s.render.frame;d.get(w)!==x&&(d.set(w,x),w.update())}function Ee(w,x){const F=w.colorSpace,ee=w.format,te=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==xi&&F!==li&&(st.getTransfer(F)===dt?(ee!==vn||te!==gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}function je(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=P,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=ne,this.rebindTextures=le,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=C,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=L,this.useMultisampledRTT=Me}function T0(i,e){function t(n,r=li){let a;const s=st.getTransfer(r);if(n===gi)return i.UNSIGNED_BYTE;if(n===Kc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===jc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xd)return i.BYTE;if(n===Yd)return i.SHORT;if(n===Ha)return i.UNSIGNED_SHORT;if(n===Zc)return i.INT;if(n===Sr)return i.UNSIGNED_INT;if(n===Xn)return i.FLOAT;if(n===Qr)return i.HALF_FLOAT;if(n===$d)return i.ALPHA;if(n===Zd)return i.RGB;if(n===vn)return i.RGBA;if(n===Kd)return i.LUMINANCE;if(n===jd)return i.LUMINANCE_ALPHA;if(n===fr)return i.DEPTH_COMPONENT;if(n===yr)return i.DEPTH_STENCIL;if(n===Jd)return i.RED;if(n===Jc)return i.RED_INTEGER;if(n===Qd)return i.RG;if(n===Qc)return i.RG_INTEGER;if(n===eu)return i.RGBA_INTEGER;if(n===_o||n===xo||n===So||n===Mo)if(s===dt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===_o)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===So)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===_o)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===So)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ws||n===Xs||n===Ys||n===qs)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Ws)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Xs)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ys)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qs)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$s||n===Zs||n===Ks)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===$s||n===Zs)return s===dt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===Ks)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===js||n===Js||n===Qs||n===el||n===tl||n===nl||n===il||n===rl||n===al||n===ol||n===sl||n===ll||n===cl||n===ul)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===js)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Js)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qs)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===el)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===tl)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===nl)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===il)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===rl)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===al)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ol)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sl)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ll)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===cl)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ul)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yo||n===dl||n===hl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===yo)return s===dt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===hl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===eh||n===fl||n===pl||n===ml)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===yo)return a.COMPRESSED_RED_RGTC1_EXT;if(n===fl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ml)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class C0 extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class wn extends Kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const R0={type:"move"};class qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),u=this._getHandJoint(l,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=d.position.distanceTo(h.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(R0)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const P0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class D0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Xt,a=e.properties.get(r);a.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Dt({vertexShader:P0,fragmentShader:L0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Tt(new Un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class F0 extends Hi{constructor(e,t){super();const n=this;let r=null,a=1,s=null,o="local-floor",c=1,l=null,d=null,h=null,f=null,m=null,g=null;const _=new D0,p=t.getContextAttributes();let u=null,E=null;const S=[],A=[],D=new Ve;let R=null;const T=new mn;T.layers.enable(1),T.viewport=new Pt;const I=new mn;I.layers.enable(2),I.viewport=new Pt;const b=[T,I],M=new C0;M.layers.enable(1),M.layers.enable(2);let P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let L=S[$];return L===void 0&&(L=new qo,S[$]=L),L.getTargetRaySpace()},this.getControllerGrip=function($){let L=S[$];return L===void 0&&(L=new qo,S[$]=L),L.getGripSpace()},this.getHand=function($){let L=S[$];return L===void 0&&(L=new qo,S[$]=L),L.getHandSpace()};function z($){const L=A.indexOf($.inputSource);if(L===-1)return;const Z=S[L];Z!==void 0&&(Z.update($.inputSource,$.frame,l||s),Z.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",Y);for(let $=0;$<S.length;$++){const L=A[$];L!==null&&(A[$]=null,S[$].disconnect(L))}P=null,O=null,_.reset(),e.setRenderTarget(u),m=null,f=null,h=null,r=null,E=null,Ge.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",G),r.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(D),r.renderState.layers===void 0){const L={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(r,t,L),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new Zn(m.framebufferWidth,m.framebufferHeight,{format:vn,type:gi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let L=null,Z=null,j=null;p.depth&&(j=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,L=p.stencil?yr:fr,Z=p.stencil?Mr:Sr);const _e={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:a};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(_e),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new Zn(f.textureWidth,f.textureHeight,{format:vn,type:gi,depthTexture:new mu(f.textureWidth,f.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,L),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),Ge.setContext(r),Ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function Y($){for(let L=0;L<$.removed.length;L++){const Z=$.removed[L],j=A.indexOf(Z);j>=0&&(A[j]=null,S[j].disconnect(Z))}for(let L=0;L<$.added.length;L++){const Z=$.added[L];let j=A.indexOf(Z);if(j===-1){for(let le=0;le<S.length;le++)if(le>=A.length){A.push(Z),j=le;break}else if(A[le]===null){A[le]=Z,j=le;break}if(j===-1)break}const _e=S[j];_e&&_e.connect(Z)}}const H=new N,ne=new N;function k($,L,Z){H.setFromMatrixPosition(L.matrixWorld),ne.setFromMatrixPosition(Z.matrixWorld);const j=H.distanceTo(ne),_e=L.projectionMatrix.elements,le=Z.projectionMatrix.elements,Ie=_e[14]/(_e[10]-1),C=_e[14]/(_e[10]+1),Pe=(_e[9]+1)/_e[5],Ye=(_e[9]-1)/_e[5],ae=(_e[8]-1)/_e[0],J=(le[8]+1)/le[0],Me=Ie*ae,ye=Ie*J,Ee=j/(-ae+J),je=Ee*-ae;L.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(je),$.translateZ(Ee),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const w=Ie+Ee,x=C+Ee,F=Me-je,ee=ye+(j-je),te=Pe*C/x*w,ie=Ye*C/x*w;$.projectionMatrix.makePerspective(F,ee,te,ie,w,x),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function de($,L){L===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(L.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;_.texture!==null&&($.near=_.depthNear,$.far=_.depthFar),M.near=I.near=T.near=$.near,M.far=I.far=T.far=$.far,(P!==M.near||O!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,O=M.far,T.near=P,T.far=O,I.near=P,I.far=O,T.updateProjectionMatrix(),I.updateProjectionMatrix(),$.updateProjectionMatrix());const L=$.parent,Z=M.cameras;de(M,L);for(let j=0;j<Z.length;j++)de(Z[j],L);Z.length===2?k(M,T,I):M.projectionMatrix.copy(T.projectionMatrix),ve($,M,L)};function ve($,L,Z){Z===null?$.matrix.copy(L.matrixWorld):($.matrix.copy(Z.matrixWorld),$.matrix.invert(),$.matrix.multiply(L.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(L.projectionMatrix),$.projectionMatrixInverse.copy(L.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Yr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let pe=null;function Ue($,L){if(d=L.getViewerPose(l||s),g=L,d!==null){const Z=d.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let j=!1;Z.length!==M.cameras.length&&(M.cameras.length=0,j=!0);for(let le=0;le<Z.length;le++){const Ie=Z[le];let C=null;if(m!==null)C=m.getViewport(Ie);else{const Ye=h.getViewSubImage(f,Ie);C=Ye.viewport,le===0&&(e.setRenderTargetTextures(E,Ye.colorTexture,f.ignoreDepthValues?void 0:Ye.depthStencilTexture),e.setRenderTarget(E))}let Pe=b[le];Pe===void 0&&(Pe=new mn,Pe.layers.enable(le),Pe.viewport=new Pt,b[le]=Pe),Pe.matrix.fromArray(Ie.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Ie.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(C.x,C.y,C.width,C.height),le===0&&(M.matrix.copy(Pe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),j===!0&&M.cameras.push(Pe)}const _e=r.enabledFeatures;if(_e&&_e.includes("depth-sensing")){const le=h.getDepthInformation(Z[0]);le&&le.isValid&&le.texture&&_.init(e,le,r.renderState)}}for(let Z=0;Z<S.length;Z++){const j=A[Z],_e=S[Z];j!==null&&_e!==void 0&&_e.update(j,L,l||s)}pe&&pe($,L),L.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:L}),g=null}const Ge=new fu;Ge.setAnimationLoop(Ue),this.setAnimationLoop=function($){pe=$},this.dispose=function(){}}}const Ci=new Kn,U0=new _t;function I0(i,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,cu(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,E,S,A){u.isMeshBasicMaterial||u.isMeshLambertMaterial?a(p,u):u.isMeshToonMaterial?(a(p,u),h(p,u)):u.isMeshPhongMaterial?(a(p,u),d(p,u)):u.isMeshStandardMaterial?(a(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,A)):u.isMeshMatcapMaterial?(a(p,u),g(p,u)):u.isMeshDepthMaterial?a(p,u):u.isMeshDistanceMaterial?(a(p,u),_(p,u)):u.isMeshNormalMaterial?a(p,u):u.isLineBasicMaterial?(s(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?c(p,u,E,S):u.isSpriteMaterial?l(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===rn&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===rn&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const E=e.get(u),S=E.envMap,A=E.envMapRotation;S&&(p.envMap.value=S,Ci.copy(A),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),p.envMapRotation.value.setFromMatrix4(U0.makeRotationFromEuler(Ci)),p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function s(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function c(p,u,E,S){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*E,p.scale.value=S*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function d(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function h(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,E){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===rn&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const E=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function N0(i,e,t,n){let r={},a={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,S){const A=S.program;n.uniformBlockBinding(E,A)}function l(E,S){let A=r[E.id];A===void 0&&(g(E),A=d(E),r[E.id]=A,E.addEventListener("dispose",p));const D=S.program;n.updateUBOMapping(E,D);const R=e.render.frame;a[E.id]!==R&&(f(E),a[E.id]=R)}function d(E){const S=h();E.__bindingPointIndex=S;const A=i.createBuffer(),D=E.__size,R=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,D,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,A),A}function h(){for(let E=0;E<o;E++)if(s.indexOf(E)===-1)return s.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const S=r[E.id],A=E.uniforms,D=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,T=A.length;R<T;R++){const I=Array.isArray(A[R])?A[R]:[A[R]];for(let b=0,M=I.length;b<M;b++){const P=I[b];if(m(P,R,b,D)===!0){const O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let G=0;for(let Y=0;Y<z.length;Y++){const H=z[Y],ne=_(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,O+G,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,G),G+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,S,A,D){const R=E.value,T=S+"_"+A;if(D[T]===void 0)return typeof R=="number"||typeof R=="boolean"?D[T]=R:D[T]=R.clone(),!0;{const I=D[T];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return D[T]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(E){const S=E.uniforms;let A=0;const D=16;for(let T=0,I=S.length;T<I;T++){const b=Array.isArray(S[T])?S[T]:[S[T]];for(let M=0,P=b.length;M<P;M++){const O=b[M],z=Array.isArray(O.value)?O.value:[O.value];for(let G=0,Y=z.length;G<Y;G++){const H=z[G],ne=_(H),k=A%D;k!==0&&D-k<ne.boundary&&(A+=D-k),O.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=A,A+=ne.storage}}}const R=A%D;return R>0&&(A+=D-R),E.__size=A,E.__cache={},this}function _(E){const S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function p(E){const S=E.target;S.removeEventListener("dispose",p);const A=s.indexOf(S.__bindingPointIndex);s.splice(A,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete a[S.id]}function u(){for(const E in r)i.deleteBuffer(r[E]);s=[],r={},a={}}return{bind:c,update:l,dispose:u}}class O0{constructor(e={}){const{canvas:t=Ch(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=s;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const u=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=un,this.toneMapping=fi,this.toneMappingExposure=1;const S=this;let A=!1,D=0,R=0,T=null,I=-1,b=null;const M=new Pt,P=new Pt;let O=null;const z=new Re(0);let G=0,Y=t.width,H=t.height,ne=1,k=null,de=null;const ve=new Pt(0,0,Y,H),pe=new Pt(0,0,Y,H);let Ue=!1;const Ge=new hu;let $=!1,L=!1;const Z=new _t,j=new N,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function Ie(){return T===null?ne:1}let C=n;function Pe(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r165"),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",V,!1),t.addEventListener("webglcontextcreationerror",Q,!1),C===null){const U="webgl2";if(C=Pe(U,y),C===null)throw Pe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ye,ae,J,Me,ye,Ee,je,w,x,F,ee,te,ie,Ae,ce,he,ke,ue,Te,Je,Be,xe,qe,$e;function pt(){Ye=new Xm(C),Ye.init(),xe=new T0(C,Ye),ae=new zm(C,Ye,e,xe),J=new w0(C),Me=new $m(C),ye=new d0,Ee=new A0(C,Ye,J,ye,ae,xe,Me),je=new Hm(S),w=new Wm(S),x=new ef(C),qe=new Om(C,x),F=new Ym(C,x,Me,qe),ee=new Km(C,F,x,Me),Te=new Zm(C,ae,Ee),he=new km(ye),te=new u0(S,je,w,Ye,ae,qe,he),ie=new I0(S,ye),Ae=new f0,ce=new x0(Ye),ue=new Nm(S,je,w,J,ee,f,c),ke=new E0(S,ee,ae),$e=new N0(C,Me,ae,J),Je=new Bm(C,Ye,Me),Be=new qm(C,Ye,Me),Me.programs=te.programs,S.capabilities=ae,S.extensions=Ye,S.properties=ye,S.renderLists=Ae,S.shadowMap=ke,S.state=J,S.info=Me}pt();const v=new F0(S,C);this.xr=v,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const y=Ye.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ye.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(y){y!==void 0&&(ne=y,this.setSize(Y,H,!1))},this.getSize=function(y){return y.set(Y,H)},this.setSize=function(y,U,X=!0){if(v.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=y,H=U,t.width=Math.floor(y*ne),t.height=Math.floor(U*ne),X===!0&&(t.style.width=y+"px",t.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(Y*ne,H*ne).floor()},this.setDrawingBufferSize=function(y,U,X){Y=y,H=U,ne=X,t.width=Math.floor(y*X),t.height=Math.floor(U*X),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(M)},this.getViewport=function(y){return y.copy(ve)},this.setViewport=function(y,U,X,q){y.isVector4?ve.set(y.x,y.y,y.z,y.w):ve.set(y,U,X,q),J.viewport(M.copy(ve).multiplyScalar(ne).round())},this.getScissor=function(y){return y.copy(pe)},this.setScissor=function(y,U,X,q){y.isVector4?pe.set(y.x,y.y,y.z,y.w):pe.set(y,U,X,q),J.scissor(P.copy(pe).multiplyScalar(ne).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(y){J.setScissorTest(Ue=y)},this.setOpaqueSort=function(y){k=y},this.setTransparentSort=function(y){de=y},this.getClearColor=function(y){return y.copy(ue.getClearColor())},this.setClearColor=function(){ue.setClearColor.apply(ue,arguments)},this.getClearAlpha=function(){return ue.getClearAlpha()},this.setClearAlpha=function(){ue.setClearAlpha.apply(ue,arguments)},this.clear=function(y=!0,U=!0,X=!0){let q=0;if(y){let B=!1;if(T!==null){const fe=T.texture.format;B=fe===eu||fe===Qc||fe===Jc}if(B){const fe=T.texture.type,be=fe===gi||fe===Sr||fe===Ha||fe===Mr||fe===Kc||fe===jc,we=ue.getClearColor(),Ce=ue.getClearAlpha(),ze=we.r,He=we.g,Oe=we.b;be?(m[0]=ze,m[1]=He,m[2]=Oe,m[3]=Ce,C.clearBufferuiv(C.COLOR,0,m)):(g[0]=ze,g[1]=He,g[2]=Oe,g[3]=Ce,C.clearBufferiv(C.COLOR,0,g))}else q|=C.COLOR_BUFFER_BIT}U&&(q|=C.DEPTH_BUFFER_BIT),X&&(q|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",V,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),Ae.dispose(),ce.dispose(),ye.dispose(),je.dispose(),w.dispose(),ee.dispose(),qe.dispose(),$e.dispose(),te.dispose(),v.dispose(),v.removeEventListener("sessionstart",bt),v.removeEventListener("sessionend",Et),an.stop()};function K(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const y=Me.autoReset,U=ke.enabled,X=ke.autoUpdate,q=ke.needsUpdate,B=ke.type;pt(),Me.autoReset=y,ke.enabled=U,ke.autoUpdate=X,ke.needsUpdate=q,ke.type=B}function Q(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function se(y){const U=y.target;U.removeEventListener("dispose",se),Le(U)}function Le(y){We(y),ye.remove(y)}function We(y){const U=ye.get(y).programs;U!==void 0&&(U.forEach(function(X){te.releaseProgram(X)}),y.isShaderMaterial&&te.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,X,q,B,fe){U===null&&(U=_e);const be=B.isMesh&&B.matrixWorld.determinant()<0,we=ad(y,U,X,q,B);J.setMaterial(q,be);let Ce=X.index,ze=1;if(q.wireframe===!0){if(Ce=F.getWireframeAttribute(X),Ce===void 0)return;ze=2}const He=X.drawRange,Oe=X.attributes.position;let rt=He.start*ze,gt=(He.start+He.count)*ze;fe!==null&&(rt=Math.max(rt,fe.start*ze),gt=Math.min(gt,(fe.start+fe.count)*ze)),Ce!==null?(rt=Math.max(rt,0),gt=Math.min(gt,Ce.count)):Oe!=null&&(rt=Math.max(rt,0),gt=Math.min(gt,Oe.count));const vt=gt-rt;if(vt<0||vt===1/0)return;qe.setup(B,q,we,X,Ce);let sn,ot=Je;if(Ce!==null&&(sn=x.get(Ce),ot=Be,ot.setIndex(sn)),B.isMesh)q.wireframe===!0?(J.setLineWidth(q.wireframeLinewidth*Ie()),ot.setMode(C.LINES)):ot.setMode(C.TRIANGLES);else if(B.isLine){let Fe=q.linewidth;Fe===void 0&&(Fe=1),J.setLineWidth(Fe*Ie()),B.isLineSegments?ot.setMode(C.LINES):B.isLineLoop?ot.setMode(C.LINE_LOOP):ot.setMode(C.LINE_STRIP)}else B.isPoints?ot.setMode(C.POINTS):B.isSprite&&ot.setMode(C.TRIANGLES);if(B.isBatchedMesh)B._multiDrawInstances!==null?ot.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances):ot.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)ot.renderInstances(rt,vt,B.count);else if(X.isInstancedBufferGeometry){const Fe=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Yt=Math.min(X.instanceCount,Fe);ot.renderInstances(rt,vt,Yt)}else ot.render(rt,vt)};function mt(y,U,X){y.transparent===!0&&y.side===tn&&y.forceSinglePass===!1?(y.side=rn,y.needsUpdate=!0,ia(y,U,X),y.side=mi,y.needsUpdate=!0,ia(y,U,X),y.side=tn):ia(y,U,X)}this.compile=function(y,U,X=null){X===null&&(X=y),p=ce.get(X),p.init(U),E.push(p),X.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),y!==X&&y.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const q=new Set;return y.traverse(function(B){const fe=B.material;if(fe)if(Array.isArray(fe))for(let be=0;be<fe.length;be++){const we=fe[be];mt(we,X,B),q.add(we)}else mt(fe,X,B),q.add(fe)}),E.pop(),p=null,q},this.compileAsync=function(y,U,X=null){const q=this.compile(y,U,X);return new Promise(B=>{function fe(){if(q.forEach(function(be){ye.get(be).currentProgram.isReady()&&q.delete(be)}),q.size===0){B(y);return}setTimeout(fe,10)}Ye.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let yt=null;function it(y){yt&&yt(y)}function bt(){an.stop()}function Et(){an.start()}const an=new fu;an.setAnimationLoop(it),typeof self<"u"&&an.setContext(self),this.setAnimationLoop=function(y){yt=y,v.setAnimationLoop(y),y===null?an.stop():an.start()},v.addEventListener("sessionstart",bt),v.addEventListener("sessionend",Et),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),v.enabled===!0&&v.isPresenting===!0&&(v.cameraAutoUpdate===!0&&v.updateCamera(U),U=v.getCamera()),y.isScene===!0&&y.onBeforeRender(S,y,U,T),p=ce.get(y,E.length),p.init(U),E.push(p),Z.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ge.setFromProjectionMatrix(Z),L=this.localClippingEnabled,$=he.init(this.clippingPlanes,L),_=Ae.get(y,u.length),_.init(),u.push(_),v.enabled===!0&&v.isPresenting===!0){const fe=S.xr.getDepthSensingMesh();fe!==null&&on(fe,U,-1/0,S.sortObjects)}on(y,U,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(k,de),le=v.enabled===!1||v.isPresenting===!1||v.hasDepthSensing()===!1,le&&ue.addToRenderList(_,y),this.info.render.frame++,$===!0&&he.beginShadows();const X=p.state.shadowsArray;ke.render(X,y,U),$===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=_.opaque,B=_.transmissive;if(p.setupLights(),U.isArrayCamera){const fe=U.cameras;if(B.length>0)for(let be=0,we=fe.length;be<we;be++){const Ce=fe[be];Si(q,B,y,Ce)}le&&ue.render(y);for(let be=0,we=fe.length;be<we;be++){const Ce=fe[be];Qn(_,y,Ce,Ce.viewport)}}else B.length>0&&Si(q,B,y,U),le&&ue.render(y),Qn(_,y,U);T!==null&&(Ee.updateMultisampleRenderTarget(T),Ee.updateRenderTargetMipmap(T)),y.isScene===!0&&y.onAfterRender(S,y,U),qe.resetDefaultState(),I=-1,b=null,E.pop(),E.length>0?(p=E[E.length-1],$===!0&&he.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function on(y,U,X,q){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)X=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Ge.intersectsSprite(y)){q&&j.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Z);const be=ee.update(y),we=y.material;we.visible&&_.push(y,be,we,X,j.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Ge.intersectsObject(y))){const be=ee.update(y),we=y.material;if(q&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),j.copy(y.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),j.copy(be.boundingSphere.center)),j.applyMatrix4(y.matrixWorld).applyMatrix4(Z)),Array.isArray(we)){const Ce=be.groups;for(let ze=0,He=Ce.length;ze<He;ze++){const Oe=Ce[ze],rt=we[Oe.materialIndex];rt&&rt.visible&&_.push(y,be,rt,X,j.z,Oe)}}else we.visible&&_.push(y,be,we,X,j.z,null)}}const fe=y.children;for(let be=0,we=fe.length;be<we;be++)on(fe[be],U,X,q)}function Qn(y,U,X,q){const B=y.opaque,fe=y.transmissive,be=y.transparent;p.setupLightsView(X),$===!0&&he.setGlobalState(S.clippingPlanes,X),q&&J.viewport(M.copy(q)),B.length>0&&Mi(B,U,X),fe.length>0&&Mi(fe,U,X),be.length>0&&Mi(be,U,X),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Si(y,U,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new Zn(1,1,{generateMipmaps:!0,type:Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float")?Qr:gi,minFilter:Ui,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const fe=p.state.transmissionRenderTarget[q.id],be=q.viewport||M;fe.setSize(be.z,be.w);const we=S.getRenderTarget();S.setRenderTarget(fe),S.getClearColor(z),G=S.getClearAlpha(),G<1&&S.setClearColor(16777215,.5),le?ue.render(X):S.clear();const Ce=S.toneMapping;S.toneMapping=fi;const ze=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),$===!0&&he.setGlobalState(S.clippingPlanes,q),Mi(y,X,q),Ee.updateMultisampleRenderTarget(fe),Ee.updateRenderTargetMipmap(fe),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Oe=0,rt=U.length;Oe<rt;Oe++){const gt=U[Oe],vt=gt.object,sn=gt.geometry,ot=gt.material,Fe=gt.group;if(ot.side===tn&&vt.layers.test(q.layers)){const Yt=ot.side;ot.side=rn,ot.needsUpdate=!0,Os(vt,X,q,sn,ot,Fe),ot.side=Yt,ot.needsUpdate=!0,He=!0}}He===!0&&(Ee.updateMultisampleRenderTarget(fe),Ee.updateRenderTargetMipmap(fe))}S.setRenderTarget(we),S.setClearColor(z,G),ze!==void 0&&(q.viewport=ze),S.toneMapping=Ce}function Mi(y,U,X){const q=U.isScene===!0?U.overrideMaterial:null;for(let B=0,fe=y.length;B<fe;B++){const be=y[B],we=be.object,Ce=be.geometry,ze=q===null?be.material:q,He=be.group;we.layers.test(X.layers)&&Os(we,U,X,Ce,ze,He)}}function Os(y,U,X,q,B,fe){y.onBeforeRender(S,U,X,q,B,fe),y.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),B.onBeforeRender(S,U,X,q,y,fe),B.transparent===!0&&B.side===tn&&B.forceSinglePass===!1?(B.side=rn,B.needsUpdate=!0,S.renderBufferDirect(X,U,q,B,y,fe),B.side=mi,B.needsUpdate=!0,S.renderBufferDirect(X,U,q,B,y,fe),B.side=tn):S.renderBufferDirect(X,U,q,B,y,fe),y.onAfterRender(S,U,X,q,B,fe)}function ia(y,U,X){U.isScene!==!0&&(U=_e);const q=ye.get(y),B=p.state.lights,fe=p.state.shadowsArray,be=B.state.version,we=te.getParameters(y,B.state,fe,U,X),Ce=te.getProgramCacheKey(we);let ze=q.programs;q.environment=y.isMeshStandardMaterial?U.environment:null,q.fog=U.fog,q.envMap=(y.isMeshStandardMaterial?w:je).get(y.envMap||q.environment),q.envMapRotation=q.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,ze===void 0&&(y.addEventListener("dispose",se),ze=new Map,q.programs=ze);let He=ze.get(Ce);if(He!==void 0){if(q.currentProgram===He&&q.lightsStateVersion===be)return zs(y,we),He}else we.uniforms=te.getUniforms(y),y.onBuild(X,we,S),y.onBeforeCompile(we,S),He=te.acquireProgram(we,Ce),ze.set(Ce,He),q.uniforms=we.uniforms;const Oe=q.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Oe.clippingPlanes=he.uniform),zs(y,we),q.needsLights=sd(y),q.lightsStateVersion=be,q.needsLights&&(Oe.ambientLightColor.value=B.state.ambient,Oe.lightProbe.value=B.state.probe,Oe.directionalLights.value=B.state.directional,Oe.directionalLightShadows.value=B.state.directionalShadow,Oe.spotLights.value=B.state.spot,Oe.spotLightShadows.value=B.state.spotShadow,Oe.rectAreaLights.value=B.state.rectArea,Oe.ltc_1.value=B.state.rectAreaLTC1,Oe.ltc_2.value=B.state.rectAreaLTC2,Oe.pointLights.value=B.state.point,Oe.pointLightShadows.value=B.state.pointShadow,Oe.hemisphereLights.value=B.state.hemi,Oe.directionalShadowMap.value=B.state.directionalShadowMap,Oe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Oe.spotShadowMap.value=B.state.spotShadowMap,Oe.spotLightMatrix.value=B.state.spotLightMatrix,Oe.spotLightMap.value=B.state.spotLightMap,Oe.pointShadowMap.value=B.state.pointShadowMap,Oe.pointShadowMatrix.value=B.state.pointShadowMatrix),q.currentProgram=He,q.uniformsList=null,He}function Bs(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=Na.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function zs(y,U){const X=ye.get(y);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function ad(y,U,X,q,B){U.isScene!==!0&&(U=_e),Ee.resetTextureUnits();const fe=U.fog,be=q.isMeshStandardMaterial?U.environment:null,we=T===null?S.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:xi,Ce=(q.isMeshStandardMaterial?w:je).get(q.envMap||be),ze=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,He=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Oe=!!X.morphAttributes.position,rt=!!X.morphAttributes.normal,gt=!!X.morphAttributes.color;let vt=fi;q.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(vt=S.toneMapping);const sn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ot=sn!==void 0?sn.length:0,Fe=ye.get(q),Yt=p.state.lights;if($===!0&&(L===!0||y!==b)){const fn=y===b&&q.id===I;he.setState(q,y,fn)}let lt=!1;q.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Yt.state.version||Fe.outputColorSpace!==we||B.isBatchedMesh&&Fe.batching===!1||!B.isBatchedMesh&&Fe.batching===!0||B.isBatchedMesh&&Fe.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Fe.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Fe.instancing===!1||!B.isInstancedMesh&&Fe.instancing===!0||B.isSkinnedMesh&&Fe.skinning===!1||!B.isSkinnedMesh&&Fe.skinning===!0||B.isInstancedMesh&&Fe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Fe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Fe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Fe.instancingMorph===!1&&B.morphTexture!==null||Fe.envMap!==Ce||q.fog===!0&&Fe.fog!==fe||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==he.numPlanes||Fe.numIntersection!==he.numIntersection)||Fe.vertexAlphas!==ze||Fe.vertexTangents!==He||Fe.morphTargets!==Oe||Fe.morphNormals!==rt||Fe.morphColors!==gt||Fe.toneMapping!==vt||Fe.morphTargetsCount!==ot)&&(lt=!0):(lt=!0,Fe.__version=q.version);let In=Fe.currentProgram;lt===!0&&(In=ia(q,U,B));let ra=!1,yi=!1,po=!1;const It=In.getUniforms(),ei=Fe.uniforms;if(J.useProgram(In.program)&&(ra=!0,yi=!0,po=!0),q.id!==I&&(I=q.id,yi=!0),ra||b!==y){It.setValue(C,"projectionMatrix",y.projectionMatrix),It.setValue(C,"viewMatrix",y.matrixWorldInverse);const fn=It.map.cameraPosition;fn!==void 0&&fn.setValue(C,j.setFromMatrixPosition(y.matrixWorld)),ae.logarithmicDepthBuffer&&It.setValue(C,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&It.setValue(C,"isOrthographic",y.isOrthographicCamera===!0),b!==y&&(b=y,yi=!0,po=!0)}if(B.isSkinnedMesh){It.setOptional(C,B,"bindMatrix"),It.setOptional(C,B,"bindMatrixInverse");const fn=B.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),It.setValue(C,"boneTexture",fn.boneTexture,Ee))}B.isBatchedMesh&&(It.setOptional(C,B,"batchingTexture"),It.setValue(C,"batchingTexture",B._matricesTexture,Ee),It.setOptional(C,B,"batchingColorTexture"),B._colorsTexture!==null&&It.setValue(C,"batchingColorTexture",B._colorsTexture,Ee));const mo=X.morphAttributes;if((mo.position!==void 0||mo.normal!==void 0||mo.color!==void 0)&&Te.update(B,X,In),(yi||Fe.receiveShadow!==B.receiveShadow)&&(Fe.receiveShadow=B.receiveShadow,It.setValue(C,"receiveShadow",B.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(ei.envMap.value=Ce,ei.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&U.environment!==null&&(ei.envMapIntensity.value=U.environmentIntensity),yi&&(It.setValue(C,"toneMappingExposure",S.toneMappingExposure),Fe.needsLights&&od(ei,po),fe&&q.fog===!0&&ie.refreshFogUniforms(ei,fe),ie.refreshMaterialUniforms(ei,q,ne,H,p.state.transmissionRenderTarget[y.id]),Na.upload(C,Bs(Fe),ei,Ee)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Na.upload(C,Bs(Fe),ei,Ee),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&It.setValue(C,"center",B.center),It.setValue(C,"modelViewMatrix",B.modelViewMatrix),It.setValue(C,"normalMatrix",B.normalMatrix),It.setValue(C,"modelMatrix",B.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const fn=q.uniformsGroups;for(let go=0,ld=fn.length;go<ld;go++){const ks=fn[go];$e.update(ks,In),$e.bind(ks,In)}}return In}function od(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function sd(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(y,U,X){ye.get(y.texture).__webglTexture=U,ye.get(y.depthTexture).__webglTexture=X;const q=ye.get(y);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||Ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,U){const X=ye.get(y);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,X=0){T=y,D=U,R=X;let q=!0,B=null,fe=!1,be=!1;if(y){const Ce=ye.get(y);Ce.__useDefaultFramebuffer!==void 0?(J.bindFramebuffer(C.FRAMEBUFFER,null),q=!1):Ce.__webglFramebuffer===void 0?Ee.setupRenderTarget(y):Ce.__hasExternalTextures&&Ee.rebindTextures(y,ye.get(y.texture).__webglTexture,ye.get(y.depthTexture).__webglTexture);const ze=y.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(be=!0);const He=ye.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(He[U])?B=He[U][X]:B=He[U],fe=!0):y.samples>0&&Ee.useMultisampledRTT(y)===!1?B=ye.get(y).__webglMultisampledFramebuffer:Array.isArray(He)?B=He[X]:B=He,M.copy(y.viewport),P.copy(y.scissor),O=y.scissorTest}else M.copy(ve).multiplyScalar(ne).floor(),P.copy(pe).multiplyScalar(ne).floor(),O=Ue;if(J.bindFramebuffer(C.FRAMEBUFFER,B)&&q&&J.drawBuffers(y,B),J.viewport(M),J.scissor(P),J.setScissorTest(O),fe){const Ce=ye.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ce.__webglTexture,X)}else if(be){const Ce=ye.get(y.texture),ze=U||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ce.__webglTexture,X||0,ze)}I=-1},this.readRenderTargetPixels=function(y,U,X,q,B,fe,be){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=ye.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we){J.bindFramebuffer(C.FRAMEBUFFER,we);try{const Ce=y.texture,ze=Ce.format,He=Ce.type;if(!ae.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-q&&X>=0&&X<=y.height-B&&C.readPixels(U,X,q,B,xe.convert(ze),xe.convert(He),fe)}finally{const Ce=T!==null?ye.get(T).__webglFramebuffer:null;J.bindFramebuffer(C.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(y,U,X,q,B,fe,be){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=ye.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we){J.bindFramebuffer(C.FRAMEBUFFER,we);try{const Ce=y.texture,ze=Ce.format,He=Ce.type;if(!ae.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=y.width-q&&X>=0&&X<=y.height-B){const Oe=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Oe),C.bufferData(C.PIXEL_PACK_BUFFER,fe.byteLength,C.STREAM_READ),C.readPixels(U,X,q,B,xe.convert(ze),xe.convert(He),0),C.flush();const rt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);await Rh(C,rt,4);try{C.bindBuffer(C.PIXEL_PACK_BUFFER,Oe),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,fe)}finally{C.deleteBuffer(Oe),C.deleteSync(rt)}return fe}}finally{const Ce=T!==null?ye.get(T).__webglFramebuffer:null;J.bindFramebuffer(C.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(y,U=null,X=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,y=arguments[1]);const q=Math.pow(2,-X),B=Math.floor(y.image.width*q),fe=Math.floor(y.image.height*q),be=U!==null?U.x:0,we=U!==null?U.y:0;Ee.setTexture2D(y,0),C.copyTexSubImage2D(C.TEXTURE_2D,X,0,0,be,we,B,fe),J.unbindTexture()},this.copyTextureToTexture=function(y,U,X=null,q=null,B=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,y=arguments[1],U=arguments[2],B=arguments[3]||0,X=null);let fe,be,we,Ce,ze,He;X!==null?(fe=X.max.x-X.min.x,be=X.max.y-X.min.y,we=X.min.x,Ce=X.min.y):(fe=y.image.width,be=y.image.height,we=0,Ce=0),q!==null?(ze=q.x,He=q.y):(ze=0,He=0);const Oe=xe.convert(U.format),rt=xe.convert(U.type);Ee.setTexture2D(U,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const gt=C.getParameter(C.UNPACK_ROW_LENGTH),vt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),sn=C.getParameter(C.UNPACK_SKIP_PIXELS),ot=C.getParameter(C.UNPACK_SKIP_ROWS),Fe=C.getParameter(C.UNPACK_SKIP_IMAGES),Yt=y.isCompressedTexture?y.mipmaps[B]:y.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,Yt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Yt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,we),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ce),y.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,B,ze,He,fe,be,Oe,rt,Yt.data):y.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,B,ze,He,Yt.width,Yt.height,Oe,Yt.data):C.texSubImage2D(C.TEXTURE_2D,B,ze,He,Oe,rt,Yt),C.pixelStorei(C.UNPACK_ROW_LENGTH,gt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,vt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,sn),C.pixelStorei(C.UNPACK_SKIP_ROWS,ot),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Fe),B===0&&U.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),J.unbindTexture()},this.copyTextureToTexture3D=function(y,U,X=null,q=null,B=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,y=arguments[2],U=arguments[3],B=arguments[4]||0);let fe,be,we,Ce,ze,He,Oe,rt,gt;const vt=y.isCompressedTexture?y.mipmaps[B]:y.image;X!==null?(fe=X.max.x-X.min.x,be=X.max.y-X.min.y,we=X.max.z-X.min.z,Ce=X.min.x,ze=X.min.y,He=X.min.z):(fe=vt.width,be=vt.height,we=vt.depth,Ce=0,ze=0,He=0),q!==null?(Oe=q.x,rt=q.y,gt=q.z):(Oe=0,rt=0,gt=0);const sn=xe.convert(U.format),ot=xe.convert(U.type);let Fe;if(U.isData3DTexture)Ee.setTexture3D(U,0),Fe=C.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)Ee.setTexture2DArray(U,0),Fe=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const Yt=C.getParameter(C.UNPACK_ROW_LENGTH),lt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),In=C.getParameter(C.UNPACK_SKIP_PIXELS),ra=C.getParameter(C.UNPACK_SKIP_ROWS),yi=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,vt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,vt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,ze),C.pixelStorei(C.UNPACK_SKIP_IMAGES,He),y.isDataTexture||y.isData3DTexture?C.texSubImage3D(Fe,B,Oe,rt,gt,fe,be,we,sn,ot,vt.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(Fe,B,Oe,rt,gt,fe,be,we,sn,vt.data):C.texSubImage3D(Fe,B,Oe,rt,gt,fe,be,we,sn,ot,vt),C.pixelStorei(C.UNPACK_ROW_LENGTH,Yt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,lt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,In),C.pixelStorei(C.UNPACK_SKIP_ROWS,ra),C.pixelStorei(C.UNPACK_SKIP_IMAGES,yi),B===0&&U.generateMipmaps&&C.generateMipmap(Fe),J.unbindTexture()},this.initRenderTarget=function(y){ye.get(y).__webglFramebuffer===void 0&&Ee.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Ee.setTextureCube(y,0):y.isData3DTexture?Ee.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Ee.setTexture2DArray(y,0):Ee.setTexture2D(y,0),J.unbindTexture()},this.resetState=function(){D=0,R=0,T=null,J.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===xs?"display-p3":"srgb",t.unpackColorSpace=st.workingColorSpace===io?"display-p3":"srgb"}}class bs{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Re(e),this.density=t}clone(){return new bs(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class cs extends Kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class B0 extends Xt{constructor(e=null,t=1,n=1,r,a,s,o,c,l=nn,d=nn,h,f){super(null,s,o,c,l,d,r,a,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ri extends Ne{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}class z0 extends Rr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qa=new N,$a=new N,sc=new _t,Or=new ta,Ta=new ea,$o=new N,lc=new N;class k0 extends Kt{constructor(e=new zt,t=new z0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,a=t.count;r<a;r++)qa.fromBufferAttribute(t,r-1),$a.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=qa.distanceTo($a);e.setAttribute("lineDistance",new xn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(r),Ta.radius+=a,e.ray.intersectsSphere(Ta)===!1)return;sc.copy(r).invert(),Or.copy(e.ray).applyMatrix4(sc);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,f=n.attributes.position;if(d!==null){const m=Math.max(0,s.start),g=Math.min(d.count,s.start+s.count);for(let _=m,p=g-1;_<p;_+=l){const u=d.getX(_),E=d.getX(_+1),S=Ca(this,e,Or,c,u,E);S&&t.push(S)}if(this.isLineLoop){const _=d.getX(g-1),p=d.getX(m),u=Ca(this,e,Or,c,_,p);u&&t.push(u)}}else{const m=Math.max(0,s.start),g=Math.min(f.count,s.start+s.count);for(let _=m,p=g-1;_<p;_+=l){const u=Ca(this,e,Or,c,_,_+1);u&&t.push(u)}if(this.isLineLoop){const _=Ca(this,e,Or,c,g-1,m);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Ca(i,e,t,n,r,a){const s=i.geometry.attributes.position;if(qa.fromBufferAttribute(s,r),$a.fromBufferAttribute(s,a),t.distanceSqToSegment(qa,$a,$o,lc)>n)return;$o.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo($o);if(!(c<e.near||c>e.far))return{distance:c,point:lc.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,object:i}}const cc=new N,uc=new N;class Mu extends k0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,a=t.count;r<a;r+=2)cc.fromBufferAttribute(t,r),uc.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+cc.distanceTo(uc);e.setAttribute("lineDistance",new xn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class H0 extends Rr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const dc=new _t,us=new ta,Ra=new ea,Pa=new N;class Es extends Kt{constructor(e=new zt,t=new H0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ra.copy(n.boundingSphere),Ra.applyMatrix4(r),Ra.radius+=a,e.ray.intersectsSphere(Ra)===!1)return;dc.copy(r).invert(),us.copy(e.ray).applyMatrix4(dc);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,s.start),m=Math.min(l.count,s.start+s.count);for(let g=f,_=m;g<_;g++){const p=l.getX(g);Pa.fromBufferAttribute(h,p),hc(Pa,p,c,r,e,t,this)}}else{const f=Math.max(0,s.start),m=Math.min(h.count,s.start+s.count);for(let g=f,_=m;g<_;g++)Pa.fromBufferAttribute(h,g),hc(Pa,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function hc(i,e,t,n,r,a,s){const o=us.distanceSqToPoint(i);if(o<t){const c=new N;us.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;a.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:s})}}class yu extends Xt{constructor(e,t,n,r,a,s,o,c,l){super(e,t,n,r,a,s,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ws extends zt{constructor(e=1,t=32,n=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(s+o,Math.PI);let l=0;const d=[],h=new N,f=new N,m=[],g=[],_=[],p=[];for(let u=0;u<=n;u++){const E=[],S=u/n;let A=0;u===0&&s===0?A=.5/t:u===n&&c===Math.PI&&(A=-.5/t);for(let D=0;D<=t;D++){const R=D/t;h.x=-e*Math.cos(r+R*a)*Math.sin(s+S*o),h.y=e*Math.cos(s+S*o),h.z=e*Math.sin(r+R*a)*Math.sin(s+S*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),p.push(R+A,1-S),E.push(l++)}d.push(E)}for(let u=0;u<n;u++)for(let E=0;E<t;E++){const S=d[u][E+1],A=d[u][E],D=d[u+1][E],R=d[u+1][E+1];(u!==0||s>0)&&m.push(S,A,R),(u!==n-1||c<Math.PI)&&m.push(A,D,R)}this.setIndex(m),this.setAttribute("position",new xn(g,3)),this.setAttribute("normal",new xn(_,3)),this.setAttribute("uv",new xn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ws(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class V0 extends zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class G0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=fc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function fc(){return(typeof performance>"u"?Date:performance).now()}const pc=new _t;class W0{constructor(e,t,n=0,r=1/0){this.ray=new ta(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pc),this}intersectObject(e,t=!0,n=[]){return ds(e,this,n,t),n.sort(mc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)ds(e[r],this,n,t);return n.sort(mc),n}}function mc(i,e){return i.distance-e.distance}function ds(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let s=0,o=a.length;s<o;s++)ds(a[s],e,t,!0)}}class gc{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Wt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"165"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="165");const vc={type:"change"},Zo={type:"start"},_c={type:"end"},La=new ta,xc=new Pn,X0=Math.cos(70*vi.DEG2RAD);class Y0 extends Hi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wi.ROTATE,MIDDLE:Wi.DOLLY,RIGHT:Wi.PAN},this.touches={ONE:Xi.ROTATE,TWO:Xi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(v){v.addEventListener("keydown",he),this._domElementKeyEvents=v},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",he),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(vc),n.update(),a=r.NONE},this.update=(function(){const v=new N,K=new Oi().setFromUnitVectors(e.up,new N(0,1,0)),V=K.clone().invert(),Q=new N,se=new Oi,Le=new N,We=2*Math.PI;return function(yt=null){const it=n.object.position;v.copy(it).sub(n.target),v.applyQuaternion(K),o.setFromVector3(v),n.autoRotate&&a===r.NONE&&O(M(yt)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let bt=n.minAzimuthAngle,Et=n.maxAzimuthAngle;isFinite(bt)&&isFinite(Et)&&(bt<-Math.PI?bt+=We:bt>Math.PI&&(bt-=We),Et<-Math.PI?Et+=We:Et>Math.PI&&(Et-=We),bt<=Et?o.theta=Math.max(bt,Math.min(Et,o.theta)):o.theta=o.theta>(bt+Et)/2?Math.max(bt,o.theta):Math.min(Et,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let an=!1;if(n.zoomToCursor&&R||n.object.isOrthographicCamera)o.radius=ve(o.radius);else{const on=o.radius;o.radius=ve(o.radius*l),an=on!=o.radius}if(v.setFromSpherical(o),v.applyQuaternion(V),it.copy(n.target).add(v),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),d.set(0,0,0)),n.zoomToCursor&&R){let on=null;if(n.object.isPerspectiveCamera){const Qn=v.length();on=ve(Qn*l);const Si=Qn-on;n.object.position.addScaledVector(A,Si),n.object.updateMatrixWorld(),an=!!Si}else if(n.object.isOrthographicCamera){const Qn=new N(D.x,D.y,0);Qn.unproject(n.object);const Si=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),an=Si!==n.object.zoom;const Mi=new N(D.x,D.y,0);Mi.unproject(n.object),n.object.position.sub(Mi).add(Qn),n.object.updateMatrixWorld(),on=v.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;on!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(on).add(n.object.position):(La.origin.copy(n.object.position),La.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(La.direction))<X0?e.lookAt(n.target):(xc.setFromNormalAndCoplanarPoint(n.object.up,n.target),La.intersectPlane(xc,n.target))))}else if(n.object.isOrthographicCamera){const on=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),on!==n.object.zoom&&(n.object.updateProjectionMatrix(),an=!0)}return l=1,R=!1,an||Q.distanceToSquared(n.object.position)>s||8*(1-se.dot(n.object.quaternion))>s||Le.distanceToSquared(n.target)>s?(n.dispatchEvent(vc),Q.copy(n.object.position),se.copy(n.object.quaternion),Le.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Te),n.domElement.removeEventListener("pointerdown",je),n.domElement.removeEventListener("pointercancel",x),n.domElement.removeEventListener("wheel",te),n.domElement.removeEventListener("pointermove",w),n.domElement.removeEventListener("pointerup",x),n.domElement.getRootNode().removeEventListener("keydown",Ae,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",he),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=r.NONE;const s=1e-6,o=new gc,c=new gc;let l=1;const d=new N,h=new Ve,f=new Ve,m=new Ve,g=new Ve,_=new Ve,p=new Ve,u=new Ve,E=new Ve,S=new Ve,A=new N,D=new Ve;let R=!1;const T=[],I={};let b=!1;function M(v){return v!==null?2*Math.PI/60*n.autoRotateSpeed*v:2*Math.PI/60/60*n.autoRotateSpeed}function P(v){const K=Math.abs(v*.01);return Math.pow(.95,n.zoomSpeed*K)}function O(v){c.theta-=v}function z(v){c.phi-=v}const G=(function(){const v=new N;return function(V,Q){v.setFromMatrixColumn(Q,0),v.multiplyScalar(-V),d.add(v)}})(),Y=(function(){const v=new N;return function(V,Q){n.screenSpacePanning===!0?v.setFromMatrixColumn(Q,1):(v.setFromMatrixColumn(Q,0),v.crossVectors(n.object.up,v)),v.multiplyScalar(V),d.add(v)}})(),H=(function(){const v=new N;return function(V,Q){const se=n.domElement;if(n.object.isPerspectiveCamera){const Le=n.object.position;v.copy(Le).sub(n.target);let We=v.length();We*=Math.tan(n.object.fov/2*Math.PI/180),G(2*V*We/se.clientHeight,n.object.matrix),Y(2*Q*We/se.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(G(V*(n.object.right-n.object.left)/n.object.zoom/se.clientWidth,n.object.matrix),Y(Q*(n.object.top-n.object.bottom)/n.object.zoom/se.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function ne(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function de(v,K){if(!n.zoomToCursor)return;R=!0;const V=n.domElement.getBoundingClientRect(),Q=v-V.left,se=K-V.top,Le=V.width,We=V.height;D.x=Q/Le*2-1,D.y=-(se/We)*2+1,A.set(D.x,D.y,1).unproject(n.object).sub(n.object.position).normalize()}function ve(v){return Math.max(n.minDistance,Math.min(n.maxDistance,v))}function pe(v){h.set(v.clientX,v.clientY)}function Ue(v){de(v.clientX,v.clientX),u.set(v.clientX,v.clientY)}function Ge(v){g.set(v.clientX,v.clientY)}function $(v){f.set(v.clientX,v.clientY),m.subVectors(f,h).multiplyScalar(n.rotateSpeed);const K=n.domElement;O(2*Math.PI*m.x/K.clientHeight),z(2*Math.PI*m.y/K.clientHeight),h.copy(f),n.update()}function L(v){E.set(v.clientX,v.clientY),S.subVectors(E,u),S.y>0?ne(P(S.y)):S.y<0&&k(P(S.y)),u.copy(E),n.update()}function Z(v){_.set(v.clientX,v.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),H(p.x,p.y),g.copy(_),n.update()}function j(v){de(v.clientX,v.clientY),v.deltaY<0?k(P(v.deltaY)):v.deltaY>0&&ne(P(v.deltaY)),n.update()}function _e(v){let K=!1;switch(v.code){case n.keys.UP:v.ctrlKey||v.metaKey||v.shiftKey?z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,n.keyPanSpeed),K=!0;break;case n.keys.BOTTOM:v.ctrlKey||v.metaKey||v.shiftKey?z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,-n.keyPanSpeed),K=!0;break;case n.keys.LEFT:v.ctrlKey||v.metaKey||v.shiftKey?O(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(n.keyPanSpeed,0),K=!0;break;case n.keys.RIGHT:v.ctrlKey||v.metaKey||v.shiftKey?O(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(-n.keyPanSpeed,0),K=!0;break}K&&(v.preventDefault(),n.update())}function le(v){if(T.length===1)h.set(v.pageX,v.pageY);else{const K=$e(v),V=.5*(v.pageX+K.x),Q=.5*(v.pageY+K.y);h.set(V,Q)}}function Ie(v){if(T.length===1)g.set(v.pageX,v.pageY);else{const K=$e(v),V=.5*(v.pageX+K.x),Q=.5*(v.pageY+K.y);g.set(V,Q)}}function C(v){const K=$e(v),V=v.pageX-K.x,Q=v.pageY-K.y,se=Math.sqrt(V*V+Q*Q);u.set(0,se)}function Pe(v){n.enableZoom&&C(v),n.enablePan&&Ie(v)}function Ye(v){n.enableZoom&&C(v),n.enableRotate&&le(v)}function ae(v){if(T.length==1)f.set(v.pageX,v.pageY);else{const V=$e(v),Q=.5*(v.pageX+V.x),se=.5*(v.pageY+V.y);f.set(Q,se)}m.subVectors(f,h).multiplyScalar(n.rotateSpeed);const K=n.domElement;O(2*Math.PI*m.x/K.clientHeight),z(2*Math.PI*m.y/K.clientHeight),h.copy(f)}function J(v){if(T.length===1)_.set(v.pageX,v.pageY);else{const K=$e(v),V=.5*(v.pageX+K.x),Q=.5*(v.pageY+K.y);_.set(V,Q)}p.subVectors(_,g).multiplyScalar(n.panSpeed),H(p.x,p.y),g.copy(_)}function Me(v){const K=$e(v),V=v.pageX-K.x,Q=v.pageY-K.y,se=Math.sqrt(V*V+Q*Q);E.set(0,se),S.set(0,Math.pow(E.y/u.y,n.zoomSpeed)),ne(S.y),u.copy(E);const Le=(v.pageX+K.x)*.5,We=(v.pageY+K.y)*.5;de(Le,We)}function ye(v){n.enableZoom&&Me(v),n.enablePan&&J(v)}function Ee(v){n.enableZoom&&Me(v),n.enableRotate&&ae(v)}function je(v){n.enabled!==!1&&(T.length===0&&(n.domElement.setPointerCapture(v.pointerId),n.domElement.addEventListener("pointermove",w),n.domElement.addEventListener("pointerup",x)),!xe(v)&&(Je(v),v.pointerType==="touch"?ke(v):F(v)))}function w(v){n.enabled!==!1&&(v.pointerType==="touch"?ue(v):ee(v))}function x(v){switch(Be(v),T.length){case 0:n.domElement.releasePointerCapture(v.pointerId),n.domElement.removeEventListener("pointermove",w),n.domElement.removeEventListener("pointerup",x),n.dispatchEvent(_c),a=r.NONE;break;case 1:const K=T[0],V=I[K];ke({pointerId:K,pageX:V.x,pageY:V.y});break}}function F(v){let K;switch(v.button){case 0:K=n.mouseButtons.LEFT;break;case 1:K=n.mouseButtons.MIDDLE;break;case 2:K=n.mouseButtons.RIGHT;break;default:K=-1}switch(K){case Wi.DOLLY:if(n.enableZoom===!1)return;Ue(v),a=r.DOLLY;break;case Wi.ROTATE:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enablePan===!1)return;Ge(v),a=r.PAN}else{if(n.enableRotate===!1)return;pe(v),a=r.ROTATE}break;case Wi.PAN:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enableRotate===!1)return;pe(v),a=r.ROTATE}else{if(n.enablePan===!1)return;Ge(v),a=r.PAN}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(Zo)}function ee(v){switch(a){case r.ROTATE:if(n.enableRotate===!1)return;$(v);break;case r.DOLLY:if(n.enableZoom===!1)return;L(v);break;case r.PAN:if(n.enablePan===!1)return;Z(v);break}}function te(v){n.enabled===!1||n.enableZoom===!1||a!==r.NONE||(v.preventDefault(),n.dispatchEvent(Zo),j(ie(v)),n.dispatchEvent(_c))}function ie(v){const K=v.deltaMode,V={clientX:v.clientX,clientY:v.clientY,deltaY:v.deltaY};switch(K){case 1:V.deltaY*=16;break;case 2:V.deltaY*=100;break}return v.ctrlKey&&!b&&(V.deltaY*=10),V}function Ae(v){v.key==="Control"&&(b=!0,n.domElement.getRootNode().addEventListener("keyup",ce,{passive:!0,capture:!0}))}function ce(v){v.key==="Control"&&(b=!1,n.domElement.getRootNode().removeEventListener("keyup",ce,{passive:!0,capture:!0}))}function he(v){n.enabled===!1||n.enablePan===!1||_e(v)}function ke(v){switch(qe(v),T.length){case 1:switch(n.touches.ONE){case Xi.ROTATE:if(n.enableRotate===!1)return;le(v),a=r.TOUCH_ROTATE;break;case Xi.PAN:if(n.enablePan===!1)return;Ie(v),a=r.TOUCH_PAN;break;default:a=r.NONE}break;case 2:switch(n.touches.TWO){case Xi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Pe(v),a=r.TOUCH_DOLLY_PAN;break;case Xi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ye(v),a=r.TOUCH_DOLLY_ROTATE;break;default:a=r.NONE}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(Zo)}function ue(v){switch(qe(v),a){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ae(v),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;J(v),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ye(v),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ee(v),n.update();break;default:a=r.NONE}}function Te(v){n.enabled!==!1&&v.preventDefault()}function Je(v){T.push(v.pointerId)}function Be(v){delete I[v.pointerId];for(let K=0;K<T.length;K++)if(T[K]==v.pointerId){T.splice(K,1);return}}function xe(v){for(let K=0;K<T.length;K++)if(T[K]==v.pointerId)return!0;return!1}function qe(v){let K=I[v.pointerId];K===void 0&&(K=new Ve,I[v.pointerId]=K),K.set(v.pageX,v.pageY)}function $e(v){const K=v.pointerId===T[0]?T[1]:T[0];return I[K]}n.domElement.addEventListener("contextmenu",Te),n.domElement.addEventListener("pointerdown",je),n.domElement.addEventListener("pointercancel",x),n.domElement.addEventListener("wheel",te,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Ae,{passive:!0,capture:!0}),this.update()}}function q0(){const i=navigator.userAgent||"";let e="";try{e=document.referrer?new URL(document.referrer).hostname:""}catch{e=""}const t=/Twitter(?:Android| for iPhone)?|com\.twitter|X\.com/i.test(i),n=/(^|\.)(?:x\.com|twitter\.com|t\.co)$/i.test(e);return t||n}const bu=q0(),$0=new URLSearchParams(window.location.search).get("lang");var Gc;const Z0=$0||(bu?"en":((Gc=navigator.languages)==null?void 0:Gc[0])||navigator.language||"en"),qr=/^zh(?:-|$)/i.test(Z0)?"zh-CN":"en",Sc={"zh-CN":{documentTitle:"Rainform · 数据成雨",description:"Rainform「数据成雨」将 24 小时逐时降雨数据转化为可交互的实时粒子雨景。拖动降雨曲线，观察雨幕随数据重塑。",socialDescription:"Rainform「数据成雨」：拖动 24 小时降雨曲线，实时重塑由 Three.js 与 WebGL 驱动的粒子雨幕。",socialImageAlt:"Rainform 数据成雨生成的液态金属粒子雨幕",dashboardAria:"Rainform 数据成雨交互式粒子雨幕",sceneAria:"可交互的珍珠雨幕数据图",canvasAria:"可交互的珍珠雨幕降雨强度图",toolbarAria:"图表工具",editorToggle:"编辑降雨数据",soundEnable:"开启雨声",soundDisable:"关闭雨声",soundUnavailable:"当前浏览器不支持雨声音频",localTimeBadge:"本地时间 · 演示数据",liveTimeBadge:"当地时间 · 实时预报",pendingTimeBadge:"当地时间 · 等待预报",liveEditorDisabled:"实时预报模式下由天气数据驱动；切换到演示模式后可编辑。",editorTitle:"编辑降雨数据",editorDescription:"拖动折线节点即可实时预览，松手后自动保存；也可以展开数字输入进行精确编辑。",editorCloseAria:"关闭降雨数据编辑器",close:"关闭",curveTitle:"逐时降雨曲线",liveSave:"实时保存",chartAria:"可拖拽降雨折线图",chartSvgAria:"00:00 至 24:00 降雨量折线，可上下拖动各小时节点",chartHint:"上下拖动节点调整雨量 · 方向键微调 · Shift + 方向键快速调整",preciseTitle:"精确输入 25 个时间点",preciseUnit:"单位：mm/h",inputGridAria:"00:00 至 24:00 的逐时降雨量",restoreDefault:"恢复默认",applyPrecise:"应用精确数据",axisTitle:"降雨强度",axisSubtitle:"每小时降水",axisUnit:"毫米/小时",rotateTitle:"请旋转至横屏",rotateDescription:"旋转手机以完整体验 Rainform 数据成雨",rotateSoundSuggestion:"建议开启声音",rotateDesktopSuggestion:"电脑端体验更佳",rotateBrowserSuggestion:"如果当前页面无法旋转，请轻点“⋮”并选择“在浏览器中打开”",rainfallInputAria:({time:i})=>`${i} 降雨量，毫米每小时`,chartPointAria:({time:i})=>`${i} 降雨量`,rainfallValueText:({value:i})=>`${i} 毫米每小时`,savedHour:({time:i})=>`已保存 ${i} 的降雨量。`,savedValue:({time:i,value:e})=>`已保存 ${i} · ${e} mm/h`,editorReady:"拖动节点会实时更新雨幕，松手后自动保存。",emptyRainfall:"请输入降雨量",invalidRainfall:"请输入大于或等于 0 的有限数字",invalidCount:({count:i})=>`有 ${i} 个时间点需要修正，已定位到第一处。`,applying:"正在重建降雨效果…",applied:({count:i,maximum:e})=>`已应用并保存 ${i} 个时间点，当前最大值 ${e} mm/h。`,applyFailed:"应用降雨数据失败",restored:"已恢复并应用内置默认降雨数据。",dataLengthError:({count:i})=>`降雨数据必须包含 ${i} 个时间点`,dataValueError:"降雨量必须是大于或等于 0 的有限数字",webglTitle:"无法显示实时雨景",webglUnavailable:"此设备或浏览器无法创建 WebGL2 图形环境。请升级浏览器，或确认硬件加速已开启。",webglInterrupted:"图形环境暂时中断，正在等待浏览器恢复。"},en:{documentTitle:"Rainform · Data into Rain",description:"Rainform turns 24 hours of hourly rainfall data into an interactive real-time particle landscape. Drag the rainfall curve to reshape the rain curtain.",socialDescription:"Rainform turns a 24-hour rainfall curve into a real-time particle landscape powered by Three.js and WebGL.",socialImageAlt:"Rainform liquid-metal particle rain generated from 24 hours of rainfall data",dashboardAria:"Rainform interactive rainfall particle landscape",sceneAria:"Interactive particle-based rainfall chart",canvasAria:"Interactive particle-based rainfall intensity chart",toolbarAria:"Chart tools",editorToggle:"Edit rainfall data",soundEnable:"Turn rain sound on",soundDisable:"Turn rain sound off",soundUnavailable:"Rain audio is not supported by this browser",localTimeBadge:"Local time · demo data",liveTimeBadge:"Local time · live forecast",pendingTimeBadge:"Local time · waiting for forecast",liveEditorDisabled:"Live forecast mode is driven by weather data. Switch to demo mode to edit.",editorTitle:"Edit rainfall data",editorDescription:"Drag a point for a live preview; changes save when released. Expand the fields below for precise input.",editorCloseAria:"Close rainfall data editor",close:"Close",curveTitle:"Hourly rainfall curve",liveSave:"Live save",chartAria:"Draggable rainfall line chart",chartSvgAria:"Rainfall from 00:00 to 24:00; drag each hourly point vertically to adjust it",chartHint:"Drag points vertically · Arrow keys for fine control · Shift + arrow keys for larger steps",preciseTitle:"Enter all 25 data points",preciseUnit:"Unit: mm/h",inputGridAria:"Hourly rainfall from 00:00 to 24:00",restoreDefault:"Restore defaults",applyPrecise:"Apply precise data",axisTitle:"Rainfall intensity",axisSubtitle:"Hourly rainfall",axisUnit:"mm/h",rotateTitle:"Rotate to landscape",rotateDescription:"Turn your phone sideways for the complete Rainform experience",rotateSoundSuggestion:"Sound on recommended",rotateDesktopSuggestion:"Best experienced on desktop",rotateBrowserSuggestion:"If this page cannot rotate, tap “⋮” and choose “Open in Browser”",rainfallInputAria:({time:i})=>`${i} rainfall, millimeters per hour`,chartPointAria:({time:i})=>`${i} rainfall`,rainfallValueText:({value:i})=>`${i} millimeters per hour`,savedHour:({time:i})=>`Saved rainfall at ${i}.`,savedValue:({time:i,value:e})=>`Saved ${i} · ${e} mm/h`,editorReady:"Dragging a point updates the rain live; releasing it saves the change.",emptyRainfall:"Enter a rainfall value",invalidRainfall:"Enter a finite number greater than or equal to 0",invalidCount:({count:i})=>`${i} data point${i===1?"":"s"} need correction. The first has been selected.`,applying:"Rebuilding the rainfall effect…",applied:({count:i,maximum:e})=>`Applied and saved ${i} data points. Current maximum: ${e} mm/h.`,applyFailed:"Failed to apply rainfall data",restored:"Restored and applied the built-in rainfall data.",dataLengthError:({count:i})=>`Rainfall data must contain ${i} data points`,dataValueError:"Rainfall must be a finite number greater than or equal to 0",webglTitle:"Unable to display the live rain scene",webglUnavailable:"This device or browser could not create a WebGL2 graphics context. Update the browser or make sure hardware acceleration is enabled.",webglInterrupted:"The graphics context was interrupted. Waiting for the browser to restore it."}};function Xe(i,e={}){const t=Sc[qr][i]??Sc.en[i]??i;return typeof t=="function"?t(e):t}function K0(){var i,e,t,n,r,a,s;document.documentElement.lang=qr,document.title=Xe("documentTitle"),(i=document.querySelector('meta[name="description"]'))==null||i.setAttribute("content",Xe("description")),(e=document.querySelector('meta[property="og:locale"]'))==null||e.setAttribute("content",qr==="zh-CN"?"zh_CN":"en_US"),(t=document.querySelector('meta[property="og:title"]'))==null||t.setAttribute("content",Xe("documentTitle")),(n=document.querySelector('meta[property="og:description"]'))==null||n.setAttribute("content",Xe("socialDescription")),(r=document.querySelector('meta[property="og:image:alt"]'))==null||r.setAttribute("content",Xe("socialImageAlt")),(a=document.querySelector('meta[name="twitter:title"]'))==null||a.setAttribute("content",Xe("documentTitle")),(s=document.querySelector('meta[name="twitter:description"]'))==null||s.setAttribute("content",Xe("socialDescription")),document.querySelectorAll("[data-i18n]").forEach(o=>{o.textContent=Xe(o.dataset.i18n)}),document.querySelectorAll("[data-i18n-aria-label]").forEach(o=>{o.setAttribute("aria-label",Xe(o.dataset.i18nAriaLabel))}),document.querySelectorAll("[data-i18n-title]").forEach(o=>{o.setAttribute("title",Xe(o.dataset.i18nTitle))})}K0();const re=document.querySelector("#scene-root"),Vi=document.querySelector(".rainfall-dashboard"),j0=document.querySelector("#scene-toolbar"),Eu=document.querySelector("#selection-readout"),J0=Eu.querySelector(".readout-time"),Q0=Eu.querySelector(".readout-value"),ci=document.querySelector("#rainfall-editor-toggle"),An=document.querySelector("#rain-sound-toggle"),$t=document.querySelector("#rainfall-editor"),Mc=document.querySelector("#rainfall-data-form"),yc=document.querySelector("#rainfall-input-grid"),Hn=document.querySelector("#rainfall-editor-status"),Tn=document.querySelector("#rainfall-editor-errors"),Cn=document.querySelector("#rainfall-line-chart"),bc=document.querySelector("#rainfall-chart-time"),Ec=document.querySelector("#rainfall-chart-value"),wc=document.querySelector("#rainfall-precise-editor"),Ac=document.querySelector("#current-local-time"),Tc=document.querySelector("#current-local-timezone"),Cc=document.querySelector("#current-rainfall-value"),Rc=document.querySelector(".current-time-status__eyebrow");re.dataset.locale=qr;re.dataset.launchContext=bu?"x-embedded":"standard";function wu(i){let e=re.querySelector(".webgl-fallback");if(!e){e=document.createElement("section"),e.className="webgl-fallback",e.setAttribute("role","status"),e.setAttribute("aria-live","polite");const t=document.createElement("strong"),n=document.createElement("span");t.textContent=Xe("webglTitle"),e.append(t,n),re.appendChild(e)}e.querySelector("span").textContent=i,e.hidden=!1}function ev(){const i=re.querySelector(".webgl-fallback");i&&(i.hidden=!0)}const Wn=Object.freeze([2.1,3.8,4.6,3.2,2.5,5.2,7.7,7.4,9.3,9.8,10,6.7,6.3,1.6,2.2,3.8,5.9,7.4,9.1,10,8.8,5.3,3.1,1.8,1.2]);let Mt=[...Wn],Au=[...Wn],jt="demo",tt=null,Tu=()=>{},Jt=Math.max(...Mt),Bi=12.8,_n=[],As=Bi,dn=0;const hs=12.8,Za=10,et=-.14,fs=1831565813,Fn=795749149,Pc=1403592059,Lc=835170137,tv=2051879369,nv=1284468263,ao=!1,xt={BASE:0,AMBIENT:1,DOWNPOUR:2},_i={width:22.5,depth:10.4,frontZ:4.9},Vr={center:.2,thickness:.85,jitter:.22},Se={enabled:!1,started:!1,context:null,gain:null,buffer:null,preloadPromise:null,source:null,intentToken:0,sourceToken:0,contextObserved:!1,masterVolume:.45,duckFactor:1},Dc=1,iv=4.8,rv=1.8;function av(){if(jt==="live"){if(!tt)return 0;const n=(St==null?void 0:St.hour)??tt.timelineHour,r=Xr(tt.values,tt.availableHours,n),a=Xr(tt.values,tt.availableHours,Math.min(24,n+1)),s=Xr(tt.probabilities,tt.availableHours,n);if(r===null)return 0;const o=De(Math.sqrt(r/12),0,1),c=De(Math.sqrt((a??r)/12),0,1),l=De((s??(r>0?100:0))/100,0,1);return De(o*.68+c*.2+l*.12,0,1)}if(Jt<=0)return 0;const i=Mt.reduce((n,r)=>n+r,0)/Mt.length,e=De(i/Za,0,1),t=De(Jt/Za,0,1);return De(e*.76+t*.24,0,1)}function $r(){const i=av();re.dataset.rainSoundStrength=i.toFixed(3);const e=i>0?.18+Math.pow(i,.62)*.4:0;return De(e*iv*Se.masterVolume*Se.duckFactor,0,rv)}function Cu(){if(!Se.context){const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;let t;try{t=new e({latencyHint:"interactive"})}catch{t=new e}const n=t.createGain();n.gain.value=0,n.connect(t.destination),Se.context=t,Se.gain=n}const{context:i}=Se;return Se.contextObserved||(Se.contextObserved=!0,re.dataset.rainSoundEngine="web-audio-buffer-loop",re.dataset.rainSoundContext=i.state,re.dataset.rainSoundBaseLatency=Number.isFinite(i.baseLatency)?i.baseLatency.toFixed(4):"unknown",i.addEventListener("statechange",()=>{re.dataset.rainSoundContext=i.state,i.state==="running"&&Se.enabled&&Se.source&&(re.dataset.rainSoundAutoplay="playing")})),i}function pi(i){const{context:e,gain:t}=Se;if(!e||!t)return;const n=e.currentTime;t.gain.cancelScheduledValues(n);const r=Number.isFinite(t.gain.value)?t.gain.value:0;t.gain.setValueAtTime(r,n),t.gain.linearRampToValueAtTime(i,n+.12),re.dataset.rainSoundGain=i.toFixed(3)}function Ka(){const i=Se.enabled?$r():0;pi(i)}function oo(){if(!An)return;const i=Xe(Se.enabled?"soundDisable":"soundEnable");An.setAttribute("aria-pressed",String(Se.enabled)),An.setAttribute("aria-label",i),An.setAttribute("title",i),re.dataset.rainSound=Se.enabled?"on":"off"}function ov(){const i=Cu();return i?Se.buffer?Promise.resolve(Fc(Se.buffer)):(Se.preloadPromise||(Se.preloadPromise=fetch("/rainform/audio/rain-loop.wav").then(e=>{if(!e.ok)throw new Error(`Rain audio request failed: ${e.status}`);return e.arrayBuffer()}).then(e=>i.decodeAudioData(e)).then(Fc).catch(e=>{throw Se.preloadPromise=null,e})),Se.preloadPromise):Promise.reject(new Error("Web Audio is not supported"))}function Fc(i){return Se.buffer=i,re.dataset.rainSoundDuration=i.duration.toFixed(3),re.dataset.rainSoundLoop="seamless-buffer",re.dataset.rainSoundLoaded="true",Ru(i),i}function Ru(i=Se.buffer){if(Se.source||!i||!Se.context||!Se.gain)return Se.source;const e=Se.context.createBufferSource(),t=++Se.sourceToken;e.buffer=i,e.loop=!0,e.playbackRate.value=Dc,e.connect(Se.gain),e.onended=()=>{t===Se.sourceToken&&(Se.source=null)},e.start(),Se.source=e,Se.started=!0,re.dataset.rainSoundStarted="true",re.dataset.rainSoundPlaybackRate=Dc.toFixed(1);const n=Se.enabled&&Se.context.state==="running";return pi(n?$r():0),re.dataset.rainSoundAutoplay=n?"playing":"waiting-for-gesture",e}function sv(){const i=Se.source;i&&(Se.source=null,++Se.sourceToken,i.onended=null,i.stop())}function lv(i){const e=Cu();if(!e){Se.enabled=!1,oo();return}const t=e.state==="running"?Promise.resolve():e.resume(),n=ov();pi($r()),Promise.all([t,n]).then(([,r])=>{i!==Se.intentToken||!Se.enabled||(Ru(r),pi($r()),re.dataset.rainSoundAutoplay="playing")}).catch(()=>{i===Se.intentToken&&(pi(0),re.dataset.rainSoundAutoplay="waiting-for-gesture")})}function Oa(i){const e=++Se.intentToken;Se.enabled=i,oo(),i?lv(e):pi(0),Kr()}function Pu(){An&&Oa(!Se.enabled)}An==null||An.addEventListener("pointerdown",i=>{!i.isPrimary||i.button!==0||Pu()});An==null||An.addEventListener("click",i=>{i.detail===0&&Pu()});document.addEventListener("visibilitychange",()=>{const{context:i}=Se;i&&(document.hidden?i.suspend().catch(()=>{}):Se.enabled&&Se.started&&i.resume().then(()=>{Se.enabled&&pi($r())}).catch(()=>{}))});window.addEventListener("pagehide",()=>{Du(),Gr!==null&&window.clearTimeout(Gr)},{once:!0});re.dataset.rainSoundStarted="false";re.dataset.rainSoundLoaded="false";re.dataset.rainSoundProfile="procedurally-generated-rain-loop";oo();re.dataset.rainSoundAutoplay="waiting-for-gesture";const Lu="nexformo.rainform.v1";function Da(i,e){const t=Number(i);return Number.isFinite(t)?De(t,0,1):e}function Zr(i,e={}){window.parent!==window&&window.parent.postMessage({channel:Lu,type:i,...e},window.location.origin)}function Uc(i,{nullable:e=!1,maximum:t=500}={}){if(!Array.isArray(i)||i.length!==25)return null;const n=[];for(const r of i){if(e&&r===null){n.push(null);continue}const a=Number(r);if(!Number.isFinite(a)||a<0||a>t)return null;n.push(a)}return n}function cv(i){if(typeof i!="string"||i.length>80)return!1;try{return new Intl.DateTimeFormat("en",{timeZone:i}).format(0),!0}catch{return!1}}function uv(i){const e=i==null?void 0:i.day;if(!e||typeof e!="object"||!cv(e.timezone))return null;const t=Uc(e.values,{nullable:!0,maximum:500}),n=Uc(e.probabilities,{nullable:!0,maximum:100});if(!t||!n)return null;const r=Array.isArray(e.availableHours)&&e.availableHours.length===25?e.availableHours.map(Boolean):t.map(s=>s!==null),a=Number(e.timelineHour);return!Number.isFinite(a)||a<0||a>24?null:{values:t,probabilities:n,availableHours:r.map((s,o)=>s&&t[o]!==null),timezone:e.timezone,localDate:typeof e.localDate=="string"?e.localDate.slice(0,10):"",timeLabel:typeof e.timeLabel=="string"?e.timeLabel.slice(0,5):"--:--",timelineHour:a,status:i.status==="stale"?"stale":"live",locationLabel:typeof i.locationLabel=="string"?i.locationLabel.slice(0,160):"",conditionLabel:typeof i.conditionLabel=="string"?i.conditionLabel.slice(0,80):""}}function ja(){const i=jt==="live";re.dataset.weatherMode=jt,re.dataset.weatherStatus=i?(tt==null?void 0:tt.status)??"loading":"demo",ci.disabled=i,ci.setAttribute("aria-disabled",String(i)),ci.title=Xe(i?"liveEditorDisabled":"editorToggle"),i&&Tu(),Rc&&(Rc.textContent=Xe(i?tt?"liveTimeBadge":"pendingTimeBadge":"localTimeBadge"))}function dv(i){const e=i==="live"?"live":"demo";if(e===jt){ja();return}jt=e;const t=e==="live"?tt?tt.values.map(n=>n??0):Array.from({length:25},()=>0):Au;Wr(t,{source:"bridge"}),ja(),so()}function hv(i){const e=uv(i);if(!e){Zr("rainform.weather.error",{reason:"invalid-forecast-payload"});return}tt=e,jt==="live"&&Wr(e.values.map(t=>t??0),{source:"bridge"}),ja(),so(),Zr("rainform.weather.state",{mode:jt,status:e.status,coverage:e.availableHours.filter(Boolean).length,timezone:e.timezone})}function Kr(){Zr("rainform.audio.state",{enabled:Se.enabled,masterVolume:Se.masterVolume,duckFactor:Se.duckFactor,started:Se.started})}function Du(){Se.enabled=!1,++Se.intentToken,pi(0),sv();const i=Se.context;Se.context=null,Se.gain=null,Se.buffer=null,Se.preloadPromise=null,Se.started=!1,Se.contextObserved=!1,i&&i.state!=="closed"&&i.close().catch(()=>{}),oo(),Kr()}window.addEventListener("message",i=>{if(i.origin!==window.location.origin||i.source!==window.parent)return;const e=i.data;!e||e.channel!==Lu||typeof e.type!="string"||(e.type==="rainform.weather.setMode"?dv(e.mode):e.type==="rainform.weather.setForecast"?hv(e):e.type==="rainform.audio.configure"?(Se.masterVolume=Da(e.masterVolume,Se.masterVolume),Se.duckFactor=Da(e.duckFactor,Se.duckFactor),Oa(e.muted===!1)):e.type==="rainform.audio.setMuted"?Oa(e.muted!==!0):e.type==="rainform.audio.setVolume"?(Se.masterVolume=Da(e.masterVolume,Se.masterVolume),e.unmute===!0?Oa(!0):Ka(),Kr()):e.type==="rainform.audio.setDucking"?(Se.duckFactor=Da(e.duckFactor,Se.duckFactor),Ka(),Kr()):e.type==="rainform.audio.stop"&&Du())});Zr("rainform.ready");Kr();const Dr={worldHeight:6.6,plotWidth:17,z:Vr.center+Vr.thickness+.32,dragThreshold:5};id();const Li={resX:768,resZ:384,xMin:-22.5*.55,xMax:_i.width*.55,zMin:-10.4*.6,zMax:_i.frontZ*1.5},Ot={fog:0,pearlBright:new Re(13818078),pearlMid:new Re(8688290),pearlDark:new Re(4345436),waterBright:new Re(10662076),waterMid:new Re(5924984),waterDark:new Re(2633792)},oe={readout:{offsetX:0,offsetY:0},camera:{frameTargetYOffset:1.15,desktop:{pos:[-.27,3.6,16.6],target:[-.27,2.45,.26],fov:35},tablet:{pos:[-.27,4.5,20.4],target:[-.27,3.35,.2],fov:37},mobile:{pos:[-.27,4.9,24.2],target:[-.27,3.75,.16],fov:40}},mist:{color:11253439,opacity:.28,height:3.5,reflectionOpacity:0},pearls:{maxPointSize:1.9,minPointSize:25.3,alpha:3},rain:{baseWeight:.62,exponent:.05},metalRain:{darkColor:0,midColor:12766171,brightColor:16448511,tintColor:37375,pearlBandFrequency:5.5,pearlBandSpeed:-2.55,pearlSpecularPower:30,pearlFresnelStrength:1.56,threadBandDensity:.081,threadBandSpeed:-.9,threadMirrorStrength:.93,bodyBandDensity:5.4,bodyBandSpeed:-1.1,bodyMirrorStrength:.78,filamentBandDensity:2.35,filamentBandSpeed:.84,filamentMirrorStrength:.58,highlightMirrorStrength:.9},floorGlow:{base:-.77,baseByStrength:.48,lowerCurtain:.13,lowerCurtainByStrength:-.89,downpour:-1.43,downpourByStrength:.67,ambient:-.06},glint:{opacity:3,alphaMax:2.13,maxSize:62},foam:{opacity:2.67,maxSize:73.6},spray:{opacity:2.33,maxSize:86.3},water:{deepColor:0,surfaceColor:2830912,roughness:1,specularStrength:2.5,rippleHighlight:3,surfaceOpacity:5,wavePrimary:0,waveSecondary:0,reflStrength:.5,reflFade:2.15,rearFadeNearZ:-.7,rearFadeFarZ:-4.2},waterfallBody:{deepColor:1711651,midColor:13423835,brightColor:658447,broadSway:0,fineSway:0,streakFrequency:38.1,fineStreakFrequency:499.6,streakSharpness:.05,fineStreakSharpness:40,fineStreakWeight:-2,baseMass:0,riseMass:.64,cloudLow:.68,cloudHigh:1.05,gapDarkness:.05,streakBrightness:1.4,bottomFeather:.2,opacity:3},waterfallFilaments:{edgeWidth:3,highlightEdgeWidth:1.75,opacity:0,highlightOpacity:.28,bottomMistOpacity:5},ripple:{gain:0,damping:.9999,dropRain:1.51,dropClick:.95,displace:.012},orbit:{minDistance:9,maxDistance:30,azimuthDeg:60,minPolarDeg:52,maxPolarDeg:93,damping:.08}};JSON.parse(JSON.stringify(oe));function fv(i){if(typeof i=="number"&&Number.isFinite(i))return Math.max(0,Math.min(16777215,Math.round(i)));const e=String(i??"").trim().replace(/^#/,"");return/^[0-9a-f]{6}$/i.test(e)?parseInt(e,16):0}function At(i){return`#${(Number(i)>>>0).toString(16).padStart(6,"0").slice(-6)}`}function Qt(i){const e=Number(i)>>>0;return`${e>>16&255}, ${e>>8&255}, ${e&255}`}function ut(i,e,t){return new Re(i).lerp(new Re(e),De(t,0,1)).getHex()}function pv(i){const e=fv(i);if(e===0)return{base:e,backgroundTop:0,backgroundMid:0,backgroundBottom:0,fog:0,shadow:0,panel:527380,panelTop:1843760,panelBottom:395536,accent:37375,textStrong:16448511,textMid:12766171,textSoft:9412024,axisLine:15067632,axisTick:12766171,axisStrong:16777215,axisTime:14476011,axisValue:16054010,axisUnit:12108239,metalDark:0,metalMid:12766171,metalBright:16448511,metalTint:37375,waterDeep:0,waterSurface:2830912,mist:11253439,waterfallDeep:1711651,waterfallMid:13423835,waterfallBright:658447};const t=new Re(e),r=t.r*.2126+t.g*.7152+t.b*.0722>.42?0:16777215,a=ut(e,0,.7);return{base:e,backgroundTop:ut(e,r,.035),backgroundMid:e,backgroundBottom:ut(e,0,.24),fog:ut(e,0,.18),shadow:0,panel:a,panelTop:ut(a,16777215,.09),panelBottom:ut(a,0,.38),accent:ut(e,r,.56),textStrong:ut(e,16777215,.95),textMid:ut(e,16777215,.76),textSoft:ut(e,16777215,.58),axisLine:ut(e,r,.9),axisTick:ut(e,r,.72),axisStrong:ut(e,r,.98),axisTime:ut(e,r,.84),axisValue:ut(e,r,.94),axisUnit:ut(e,r,.66),metalDark:ut(e,r,.08),metalMid:ut(e,r,.64),metalBright:ut(e,r,.96),metalTint:ut(e,r,.34),waterDeep:ut(e,r,.035),waterSurface:ut(e,r,.24),mist:ut(e,r,.62),waterfallDeep:ut(e,r,.12),waterfallMid:ut(e,r,.68),waterfallBright:ut(e,r,.92)}}function mv(){return 0}function gv(i){const e=document.documentElement.style,t=i.base===0?.72:.9,n=i.base===0?.8:.94;e.setProperty("--background-top",At(i.backgroundTop)),e.setProperty("--background-mid",At(i.backgroundMid)),e.setProperty("--background-bottom",At(i.backgroundBottom)),e.setProperty("--model-metal-dark",At(i.metalDark)),e.setProperty("--model-metal-mid",At(i.metalMid)),e.setProperty("--model-metal-bright",At(i.metalBright)),e.setProperty("--model-metal-tint",At(i.metalTint)),e.setProperty("--theme-highlight-rgb",Qt(i.textMid)),e.setProperty("--theme-shadow-rgb",Qt(i.shadow)),e.setProperty("--theme-panel-rgb",Qt(i.panel)),e.setProperty("--panel-surface-top",`rgba(${Qt(i.panelTop)}, ${t})`),e.setProperty("--panel-surface-bottom",`rgba(${Qt(i.panelBottom)}, ${n})`),e.setProperty("--panel-border",`rgba(${Qt(i.textStrong)}, 0.17)`),e.setProperty("--panel-divider",`rgba(${Qt(i.textStrong)}, 0.1)`),e.setProperty("--panel-card-border",`rgba(${Qt(i.textStrong)}, 0.13)`),e.setProperty("--panel-control-bg",`rgba(${Qt(i.textStrong)}, 0.055)`),e.setProperty("--panel-control-hover",`rgba(${Qt(i.textStrong)}, 0.1)`),e.setProperty("--panel-text-main",`rgba(${Qt(i.textStrong)}, 0.94)`),e.setProperty("--panel-text-soft",`rgba(${Qt(i.textMid)}, 0.58)`),e.setProperty("--panel-accent",`rgba(${Qt(i.accent)}, 0.78)`),e.setProperty("--panel-accent-soft",`rgba(${Qt(i.accent)}, 0.14)`)}function vv(i){Ot.fog=i.fog,Ot.pearlBright.setHex(i.metalBright),Ot.pearlMid.setHex(i.metalMid),Ot.pearlDark.setHex(i.metalDark),Ot.waterBright.setHex(i.mist),Ot.waterMid.setHex(i.waterSurface),Ot.waterDark.setHex(i.waterDeep)}let Fu=mv(),Ct=pv(Fu);gv(Ct);vv(Ct);function Uu(){const i=Number(oe.readout.offsetX)||0,e=Number(oe.readout.offsetY)||0;nt!=null&&nt.readout&&nt.readout.mesh.position.set(nt.readout.anchorX+i,nt.readout.anchorY+e,nt.readout.anchorZ),re.dataset.readoutMode="world-space-rotating",re.dataset.readoutOffsetX=String(i),re.dataset.readoutOffsetY=String(e),delete re.dataset.readoutBottom,delete re.dataset.readoutRight,delete re.dataset.readoutTop}const Ts=window.matchMedia("(pointer: coarse)").matches,zi=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function qn(){const i=Math.min(window.innerWidth,window.innerHeight),e=Math.max(window.innerWidth,window.innerHeight);return window.innerWidth>window.innerHeight&&i<=500&&e<=1e3}function Iu(){const i=qn()?2:Ts?1.65:1.75;return Math.min(window.devicePixelRatio||1,i)}let ui=Iu();const gn=Ts?{chains:2e3,ambientChains:800,downpourChains:1400,waterfallFilaments:1900,waterGlints:0,rippleEventsPerSecond:28}:{chains:2e3,ambientChains:800,downpourChains:1400,waterfallFilaments:1900,waterGlints:0,rippleEventsPerSecond:60},bn={showAxes:!0,showWater:!0,showMist:!0,showRainLines:!0,showPearls:!0,showWaterGlints:!0,showImpacts:ao,showPeakWaterfall:!1};bn.showImpacts=bn.showImpacts&&ao;const Nu=Intl.DateTimeFormat().resolvedOptions().timeZone||"Local";let St={hour:0,label:"00:00",zoneLabel:Nu},Gr=null,Ou=()=>{};function Bu(i=new Date){if(jt==="live"&&(tt!=null&&tt.timezone))try{const l=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:tt.timezone,hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZoneName:"shortOffset"}).formatToParts(i).map(f=>[f.type,f.value])),d=Number(l.hour)===24?0:Number(l.hour),h=Number(l.minute);return{hour:d+h/60,minute:d*60+h,label:`${String(d).padStart(2,"0")}:${String(h).padStart(2,"0")}`,zoneLabel:`${tt.timezone}${l.timeZoneName?` · ${l.timeZoneName}`:""}`}}catch{}const e=i.getHours(),t=i.getMinutes(),n=-i.getTimezoneOffset(),r=n>=0?"+":"-",a=Math.abs(n),s=Math.floor(a/60),o=a%60,c=`UTC${r}${String(s).padStart(2,"0")}:${String(o).padStart(2,"0")}`;return{hour:e+t/60,minute:e*60+t,label:`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`,zoneLabel:`${Nu} · ${c}`}}function so(i=new Date){St=Bu(i);const e=jt==="live"?tt?Xr(tt.values,tt.availableHours,St.hour):null:Fs(St.hour);Ac&&(Ac.textContent=St.label),Tc&&(Tc.textContent=St.zoneLabel),Cc&&(Cc.textContent=e===null?"-- mm/h · 当前时段数据缺失":jt==="live"?`${e.toFixed(1)} mm/h · ${(tt==null?void 0:tt.status)==="stale"?"缓存预报":"逐小时预报插值"}`:`${e.toFixed(1)} mm/h · 逐小时演示曲线插值`),re.dataset.currentLocalTime=St.label,re.dataset.currentTimelineHour=St.hour.toFixed(4),re.dataset.currentRainfall=e===null?"unavailable":e.toFixed(3),me.readoutKey="",Ou(),Zr("rainform.time.state",{localTime:St.label,timeZone:St.zoneLabel,timelineHour:St.hour,rainfall:e,dataStatus:jt==="live"?(tt==null?void 0:tt.status)??"loading":"demo"}),Ka()}function zu(){Gr!==null&&window.clearTimeout(Gr);const i=6e4-Date.now()%6e4+20;Gr=window.setTimeout(()=>{so(),zu()},i)}const me={pointerActive:!1,pointerDown:!1,pointerMoved:!1,pointerHour:18,pointerWorld:new N,pointerNdc:new Ve,pointerClient:{x:0,y:0},downClient:{x:0,y:0},downView:{x:0,y:0},activePointerId:null,selectedHour:18,selectedActive:!1,burst:0,lastHoverRippleAt:-1,view:{targetX:0,targetY:0},readoutKey:""};St=Bu();let Qe;try{Qe=new O0({antialias:!0,alpha:!0,preserveDrawingBuffer:!1,powerPreference:"high-performance"}),re.dataset.webglStatus="ready"}catch(i){throw wu(Xe("webglUnavailable")),re.dataset.webglStatus="unavailable",i}Qe.setPixelRatio(ui);Qe.setSize(window.innerWidth,window.innerHeight);re.dataset.rendererPixelRatio=ui.toFixed(2);Qe.outputColorSpace=un;Qe.domElement.setAttribute("aria-label",Xe("canvasAria"));re.appendChild(Qe.domElement);Qe.domElement.addEventListener("webglcontextlost",i=>{i.preventDefault(),re.dataset.webglStatus="lost",wu(Xe("webglInterrupted"))});Qe.domElement.addEventListener("webglcontextrestored",()=>{re.dataset.webglStatus="ready",ev()});const ki=new cs;ki.fog=new bs(Ot.fog,Ts?.019:.022);const en=new mn(35,window.innerWidth/window.innerHeight,.1,110),Fa=new N,Rn=new N;new N;const Ic=.04;let hr=null,ft=null;fo();ft=new Y0(en,Qe.domElement);ft.enableDamping=!0;ft.dampingFactor=oe.orbit.damping;ft.enablePan=!1;ft.enableZoom=!0;ft.rotateSpeed=.55;ft.zoomSpeed=.8;ft.minDistance=oe.orbit.minDistance;ft.maxDistance=oe.orbit.maxDistance;ft.minPolarAngle=vi.degToRad(oe.orbit.minPolarDeg);ft.maxPolarAngle=vi.degToRad(oe.orbit.maxPolarDeg);ft.minAzimuthAngle=-vi.degToRad(oe.orbit.azimuthDeg);ft.maxAzimuthAngle=vi.degToRad(oe.orbit.azimuthDeg);ft.target.copy(Rn);ft.update();const Ko=new W0,_v=new Pn(new N(0,1,0),-et),xv=new Pn(new N(0,0,1),-1.37),cr=new N,ps=new G0,Er=new Pt(0,1,0,1),wr=new N(.002,0,.002),Ar=new Ve,Ja={value:0},jr=new wn;jr.name="pearl-rainfall-visualization";ki.add(jr);let nt=Xu();hr=nt.fitBounds.clone();fo();Uu();Cs(nt);rd();const jn=Tv(),ku=Cv();let $n=$u();jn.material.uniforms.uRainLut.value=$n.lut;jn.material.uniforms.uLutBounds.value.set($n.lutXMin,$n.lutSpan);const mr=Jt<=0,Hu=_n.length>0,Nc=mr?0:nd(Jt);let at=qu(mr?0:Math.max(1,Math.round(gn.chains*Nc)),mr?0:Math.max(1,Math.round(gn.ambientChains*Math.pow(Nc,1.08))),mr||!Hu?0:gn.downpourChains),Gt=Zu(mr||!Hu?0:gn.waterfallFilaments,at.data),di=Ku(mr?0:gn.waterGlints),ht=ju(0,0,gn.rippleEventsPerSecond);const Jr=Nv(Qe);jr.add(nt.group,ku,jn,$n.mesh,at.lines,at.points,Gt.group,di.points,ht.foam,ht.droplets,ht.crowns);Gu();zi&&(Rs(at,0,0),Ps(di,0,0));Wu();na();Qe.domElement.addEventListener("pointerdown",Xv,{passive:!0});Qe.domElement.addEventListener("pointermove",Yv,{passive:!0});Qe.domElement.addEventListener("pointerup",qv,{passive:!0});Qe.domElement.addEventListener("pointercancel",$v,{passive:!0});Qe.domElement.addEventListener("pointerleave",Zv,{passive:!0});Qe.domElement.addEventListener("dblclick",jv);document.addEventListener("pointermove",i=>{i.target!==Qe.domElement&&uo()},{passive:!0});j0.addEventListener("pointerenter",uo);$t.addEventListener("pointerenter",uo);window.addEventListener("resize",Ns);window.addEventListener("orientationchange",Ns);var Wc;(Wc=window.visualViewport)==null||Wc.addEventListener("resize",Ns);window.addEventListener("blur",Kv);r_();ja();so();zu();re.dataset.releaseChannel="public";Vu();function Vu(){const i=Math.min(ps.getDelta(),.04),e=ps.elapsedTime;me.burst=Math.max(0,me.burst-i*1.1),$n.material.uniforms.uTime.value=zi?6.2:e,zi||(Fv(ht,e,i),Rs(at,e,i),Ps(di,e,i)),me.pointerActive&&e-me.lastHoverRippleAt>.18&&(me.lastHoverRippleAt=e,Ls(Jr,me.pointerWorld.x,me.pointerWorld.z,.34+gr(me.pointerHour)*.28,!1)),Ov(Jr,Qe),Bv(e),Jv(),wv(nt),na(),Qe.render(ki,en),requestAnimationFrame(Vu)}function Gu(){nt.group.visible=bn.showAxes,jn.visible=bn.showWater,ku.visible=bn.showWater,$n.mesh.visible=bn.showMist,at.lines.visible=bn.showRainLines,at.points.visible=bn.showPearls,di.points.visible=bn.showWaterGlints;const i=ao;ht.foam.visible=i,ht.droplets.visible=i,ht.crowns.visible=i,Gt.group.visible=bn.showPeakWaterfall,re.dataset.axisVisibility="visible"}function Wu(){var e;re.dataset.rainMaterial="procedural-liquid-metal",re.dataset.rainEdgeMode=qn()?"mobile-crisp":"authored",re.dataset.rainfallMax=String(Number(Jt.toFixed(3))),re.dataset.axisMax=String(Number(Bi.toFixed(3))),re.dataset.rainfallValues=Mt.join(","),re.dataset.rainfallPointCount=String(Mt.length);const i=Mt.map((t,n)=>t===0?n:null).filter(t=>t!==null);re.dataset.zeroRainfallCount=String(i.length),re.dataset.zeroRainfallHours=i.join(","),re.dataset.zeroRainSuppression="anchor-feathered",re.dataset.rainfallResponse="continuous-raw-hourly-v2",re.dataset.rainfallDry=String(Jt<=0),re.dataset.chainCount=String(at.data.count),re.dataset.zeroSuppressedChainCount=String(((e=at.data.presence)==null?void 0:e.reduce((t,n)=>t+(n<=.08?1:0),0))??0),re.dataset.baseChainCount=String(at.data.baseCount),re.dataset.ambientChainCount=String(at.data.ambientCount),re.dataset.downpourChainCount=String(at.data.downpourCount),re.dataset.pearlCount=String(at.data.pearlCount),re.dataset.streakCount=String(at.data.downpourCount),re.dataset.waterfallBodyCount=String(Gt.bodyCount),re.dataset.waterfallPeakCount=String(Gt.peakCount),re.dataset.waterfallFilamentCapacity=String(Gt.filamentCapacity),re.dataset.activeWaterfallFilaments=String(Gt.visibleFilamentCount),re.dataset.bridgeFilamentCount=String(Gt.bridgeFilamentCount),re.dataset.coreFilamentCount=String(Gt.coreFilamentCount),re.dataset.lowerFilamentCount=String(Gt.lowerFilamentCount),re.dataset.wideFilamentCount=String(Gt.wideFilamentCount),re.dataset.foregroundFilamentCount=String(Gt.foregroundFilamentCount),re.dataset.highlightFilamentCount=String(Gt.highlightFilamentCount),re.dataset.waterfallRibbonSegments=String(Gt.ribbonSegments),re.dataset.activeBridgeTrails=String(at.data.activeBridgeTrailCount),re.dataset.waterfallPlotClip="off",re.dataset.baselineImpactCount=String(ht.data.staticSeedCount),re.dataset.splashImpactsEnabled=String(ao),re.dataset.activeStormParticles=String(ht.data.activeCount),re.dataset.activeFoamParticles=String(ht.data.activeFoamCount),re.dataset.activeSprayDroplets=String(ht.data.activeDropletCount),re.dataset.activeCrownLines=String(ht.data.activeCrownCount),re.dataset.peakImpactCount=String(ht.data.totalPeakCollisions),re.dataset.stormEmissionRate=ht.data.currentEmissionRate.toFixed(1),re.dataset.activeRipples="0",re.dataset.rainPlotClip="off",re.dataset.rainCeilingValue=String(Number(As.toFixed(3))),re.dataset.rainCeilingWorldY=dn.toFixed(3),re.dataset.ambientCurtainMode="data-driven-ceiling",re.dataset.axisMode="3d-reference-labels",re.dataset.axisVisibility=nt.group.visible?"visible":"hidden",re.dataset.timeTickCount=String(nt.timeTickCount),re.dataset.valueTickCount=String(nt.valueTickCount),re.dataset.axisLabelCount=String(nt.labelCount)}function Wr(i,{source:e="demo"}={}){if(!Array.isArray(i)||i.length!==Wn.length)throw new TypeError(Xe("dataLengthError",{count:Wn.length}));const t=i.map(n=>{const r=Number(n);if(!Number.isFinite(r)||r<0)throw new TypeError(Xe("dataValueError"));return Di(r)});Mt=t,e==="demo"&&jt==="demo"&&(Au=[...t]),id(),Sv(),Ka(),me.readoutKey="",na(!0)}function Sv(){const i=Jt<=0,e=_n.length>0,t=i?0:nd(Jt),n=Xu(),r=$u(),a=qu(i?0:Math.max(1,Math.round(gn.chains*t)),i?0:Math.max(1,Math.round(gn.ambientChains*Math.pow(t,1.08))),i||!e?0:gn.downpourChains),s=Zu(i||!e?0:gn.waterfallFilaments,a.data),o=Ku(i?0:gn.waterGlints),c=ju(0,0,gn.rippleEventsPerSecond),l=[nt.group,$n.mesh,at.lines,at.points,Gt.group,di.points,ht.foam,ht.droplets,ht.crowns];jn.material.uniforms.uRainLut.value=r.lut,jn.material.uniforms.uLutBounds.value.set(r.lutXMin,r.lutSpan),jr.remove(...l),l.forEach(Mv),nt=n,hr=nt.fitBounds.clone(),Uu(),Cs(nt),$n=r,at=a,Gt=s,di=o,ht=c,jr.add(nt.group,$n.mesh,at.lines,at.points,Gt.group,di.points,ht.foam,ht.droplets,ht.crowns),yv(Jr),Gu(),zi&&(Rs(at,0,0),Ps(di,0,0)),Wu()}function Mv(i){var r;if(!i)return;const e=new Set,t=new Set,n=new Set;i.traverse(a=>{a.geometry&&e.add(a.geometry),(Array.isArray(a.material)?a.material:[a.material]).filter(Boolean).forEach(o=>t.add(o))});for(const a of t){for(const s of Object.values(a))s!=null&&s.isTexture&&n.add(s);for(const s of Object.values(a.uniforms||{}))(r=s==null?void 0:s.value)!=null&&r.isTexture&&n.add(s.value)}n.forEach(a=>a.dispose()),e.forEach(a=>a.dispose()),t.forEach(a=>a.dispose())}function yv(i){const e=Qe.getRenderTarget(),t=Qe.autoClear;Qe.autoClear=!0,Qe.setRenderTarget(i.rtA),Qe.clear(),Qe.setRenderTarget(i.rtB),Qe.clear(),Qe.setRenderTarget(e),Qe.autoClear=t,i.dropCount=0,i.dropGeometry.setDrawRange(0,0),i.texture=i.rtA.texture,jn.material.uniforms.uHeightField.value=i.texture,re.dataset.activeRipples="0"}function ms(i,e,t=""){const n=De(Math.round(e),0,24),r=td(e),a=r===null?"--":r.toFixed(1),s=t||`${String(n).padStart(2,"0")}:00`,o=`${s}-${a}-${Fu}`;if(i.key===o)return;const{canvas:c,context:l,texture:d}=i;l.clearRect(0,0,c.width,c.height),l.textAlign="left",l.textBaseline="middle";const h=c.width-12,f=Xe("axisUnit");l.font='450 32px Inter, "PingFang SC", "Microsoft YaHei", sans-serif';const m=l.measureText(f).width,g=18,_=8,p=48,u=26,E=218,S=g+_+p,A=16;let D=116;l.font=`350 ${D}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`;let R=l.measureText(a).width;const T=h-m-A-S;R>T&&(D=Math.max(72,D*T/R),l.font=`350 ${D}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`,R=l.measureText(a).width);const I=S,b=Math.min(h-m,I+R+A);l.globalAlpha=.92,l.fillStyle=At(Ct.axisTick),l.fillRect(g,u,_,E-u),l.globalAlpha=1,l.fillStyle=At(Ct.axisTime),l.font='550 42px Inter, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillText(s,I,48),l.fillStyle=At(Ct.axisStrong),l.font=`350 ${D}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`,l.fillText(a,I,158),l.fillStyle=At(Ct.axisTick),l.font='450 32px Inter, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillText(f,b,166),d.needsUpdate=!0,i.key=o}function bv(i,e,t,n){const r=document.createElement("canvas");r.width=480,r.height=260;const a=r.getContext("2d"),s=new yu(r);s.colorSpace=un,s.minFilter=Rt,s.magFilter=Rt,s.generateMipmaps=!1,s.anisotropy=Math.min(4,Qe.capabilities.getMaxAnisotropy());const o=new Gn({map:s,transparent:!0,opacity:n,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,side:tn}),c=.98,l=c*r.width/r.height,d=new Un(l,c);d.translate(-l*.5,0,0);const h=new Tt(d,o);h.name="axis-dynamic-readout",h.position.set(i,e,t),h.renderOrder=9.6,h.visible=!1;const f={mesh:h,material:o,canvas:r,context:a,texture:s,anchorX:i,anchorY:e,anchorZ:t,key:""};return ms(f,me.selectedHour),f}function Xu(){const i=new wn;i.name="rainfall-3d-axes";const e=.85,t=new Gn({color:Ct.axisLine,transparent:!0,opacity:e,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1}),n=new Gn({color:Ct.axisTick,transparent:!0,opacity:e,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1}),r=new Gn({color:Ct.axisStrong,transparent:!0,opacity:e,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1}),a=new Gn({color:Ct.axisStrong,transparent:!0,opacity:e,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1}),s=new Gn({color:11132159,transparent:!0,opacity:.98,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1}),o=Lt(0),c=Lt(24),l=et-.18,d=dn,h=Dr.z,f=d+1.42,m=[o,l,h,c,l,h,o,l,h,o,d,h],g=[],_=new wn;_.name="axis-labels";const p=[];for(let G=0;G<=24;G+=2){const Y=Lt(G);g.push(Y,l,h);const H=Ua(`${String(G).padStart(2,"0")}:00`,{height:.2,fontSize:54,fontWeight:400,mobileScale:1.55,color:At(Ct.axisTime)});H.sprite.position.set(Y,l-.27,h+.04),_.add(H.sprite),p.push({material:H.material,baseOpacity:H.opacity})}const u=[],E=Hv(),S=o-.72;for(const G of E){const Y=Ev(G);G>0&&u.push(o-.08,Y,h,o+.08,Y,h);const H=Ua(vs(G),{height:.27,fontSize:64,fontWeight:350,mobileOffsetX:-.32,anchorX:0,color:At(Ct.axisValue)});H.sprite.position.set(S,Y+.02,h+.04),_.add(H.sprite),p.push({material:H.material,baseOpacity:H.opacity});const ne=Ua(Xe("axisUnit"),{height:.14,fontSize:44,fontWeight:450,mobileScale:1.9,mobileOffsetX:-.32,anchorX:0,color:At(Ct.axisUnit)});ne.sprite.position.set(S,Y-.22,h+.04),_.add(ne.sprite),p.push({material:ne.material,baseOpacity:ne.opacity})}const A=S,D=qr==="zh-CN"?[{text:Xe("axisTitle"),y:f-.22,height:.44,fontSize:76,fontWeight:550,mobileOffsetX:-.32,color:At(Ct.axisStrong)},{text:Xe("axisSubtitle"),y:f-.57,height:.22,fontSize:52,fontWeight:450,mobileScale:1.55,mobileOffsetX:-.32,color:At(Ct.axisTime)},{text:Xe("axisUnit"),y:f-.82,height:.15,fontSize:44,fontWeight:450,mobileScale:1.9,mobileOffsetX:-.32,color:At(Ct.axisUnit)}]:[{text:Xe("axisTitle"),y:f-.22,height:.4,fontSize:76,fontWeight:550,mobileOffsetX:-.32,color:At(Ct.axisStrong)},{text:Xe("axisSubtitle"),y:f-.57,height:.19,fontSize:46,fontWeight:450,mobileScale:1.55,mobileOffsetX:-.32,color:At(Ct.axisTime)},{text:Xe("axisUnit"),y:f-.82,height:.15,fontSize:44,fontWeight:450,mobileScale:1.9,mobileOffsetX:-.32,color:At(Ct.axisUnit)}];for(const G of D){const Y=Ua(G.text,{height:G.height,fontSize:G.fontSize,fontWeight:G.fontWeight,mobileScale:G.mobileScale,mobileOffsetX:G.mobileOffsetX,anchorX:0,color:G.color});Y.sprite.position.set(A,G.y,h+.04),Y.material.opacity=e,_.add(Y.sprite),p.push({material:Y.material,baseOpacity:e})}const R=bv(c,f-.49,h+.05,e);R.mesh.position.x+=Number(oe.readout.offsetX)||0,R.mesh.position.y+=Number(oe.readout.offsetY)||0,p.push({material:R.material,baseOpacity:e});const T=Br("axis-lines",m,t,.009,9),I=Oc("time-ticks",g,n,.011,9.1),b=Br("value-ticks",u,n,.008,9.1),M=Br("selected-time-marker",[0,l,h+.012,0,l+.48,h+.012],r,.01,9.3),P=Br("hover-time-marker",[0,l,h+.018,0,l+.34,h+.018],a,.008,9.4),O=new wn;O.name="current-local-time-marker",O.add(Br("current-local-time-line",[0,l-.02,h+.024,0,d+.18,h+.024],s,.014,9.42),Oc("current-local-time-dot",[0,l,h+.028],s,.055,9.45)),M.visible=!1,P.visible=!1,i.add(T,I,b,_,R.mesh,O,M,P),i.updateMatrixWorld(!0);const z=new Cr().setFromObject(i,!0);return{group:i,fitBounds:z,labelGroup:_,readout:R,currentTimeMarker:O,selectedMarker:M,hoverMarker:P,opacityEntries:[{material:t,baseOpacity:e},{material:n,baseOpacity:e},{material:r,baseOpacity:e},{material:a,baseOpacity:e},{material:s,baseOpacity:.98},...p],opacity:1,dragging:!1,fadeStartedAt:-1,timeTickCount:13,valueTickCount:u.length/6,labelCount:13+E.length*2+D.length+1}}function Oc(i,e,t,n,r){const a=new wn;a.name=i;const s=new ws(n,16,10);for(let o=0;o<e.length;o+=3){const c=new Tt(s,t);c.position.set(e[o],e[o+1],e[o+2]),c.renderOrder=r,a.add(c)}return a}function Ua(i,{height:e,fontSize:t,fontWeight:n=300,mobileScale:r=1.28,mobileOffsetX:a=0,anchorX:s=.5,color:o="#ffffff"}){const c=document.createElement("canvas"),l=c.getContext("2d"),d=3,h=t*d,f=`${n} ${h}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`;l.font=f;const m=Math.ceil(l.measureText(i).width+24*d),g=Math.ceil(h*1.45);c.width=m,c.height=g,l.clearRect(0,0,m,g),l.font=f,l.fillStyle=o,l.textAlign="center",l.textBaseline="middle",l.fillText(i,m*.5,g*.5);const _=new yu(c);_.colorSpace=un,_.minFilter=Rt,_.magFilter=Rt,_.generateMipmaps=!1,_.anisotropy=Math.min(4,Qe.capabilities.getMaxAnisotropy());const p=new Gn({map:_,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,side:tn}),u=e*m/g,E=new Un(u,e);E.translate((.5-s)*u,0,0);const S=new Tt(E,p);return S.renderOrder=9.5,S.userData.mobileScale=r,S.userData.mobileOffsetX=a,{sprite:S,material:p,opacity:1}}function Cs(i){var t;const e=qn();for(const n of((t=i==null?void 0:i.labelGroup)==null?void 0:t.children)||[]){const r=e?n.userData.mobileScale||1.28:1;Number.isFinite(n.userData.basePositionX)||(n.userData.basePositionX=n.position.x),n.scale.setScalar(r),n.position.x=n.userData.basePositionX+(e&&n.userData.mobileOffsetX||0)}re.dataset.axisLabelScale=e?"1.28-1.90":"1.00"}function Br(i,e,t,n,r){const a=new wn;a.name=i;const s=new N(1,0,0);for(let o=0;o<e.length;o+=6){const c=new N(e[o],e[o+1],e[o+2]),l=new N(e[o+3],e[o+4],e[o+5]),d=l.clone().sub(c),h=d.length(),f=new Pr(h,n,n),m=new Tt(f,t);m.position.copy(c).add(l).multiplyScalar(.5),m.quaternion.setFromUnitVectors(s,d.normalize()),m.renderOrder=r,a.add(m)}return a}function Ev(i){return et+De(i/Bi,0,1)*Dr.worldHeight}function Yu(i,e){i.opacity=e;for(const t of i.opacityEntries)t.material.opacity=t.baseOpacity*e}function wv(i){i.selectedMarker.visible=!1,i.hoverMarker.position.x=Lt(me.pointerHour),i.hoverMarker.visible=me.pointerActive,i.currentTimeMarker.position.x=Lt(St.hour),i.currentTimeMarker.visible=!0,i.readout.mesh.visible=!0,me.pointerActive?ms(i.readout,me.pointerHour):ms(i.readout,St.hour,St.label),re.dataset.readoutVisibility="visible",re.dataset.cursorLineVisibility=me.pointerActive?"visible":"hidden"}function Av(){nt.dragging||(nt.dragging=!0,nt.fadeStartedAt=-1,nt.group.visible=!1,Yu(nt,0),re.dataset.axisVisibility="hidden")}function lo(i=!1){!nt.dragging&&!i||(nt.dragging=!1,nt.group.visible=bn.showAxes,nt.fadeStartedAt=-1,Yu(nt,1),re.dataset.axisVisibility="visible")}function qu(i,e=0,t=0){const n=i+e+t,r={count:n,baseCount:i,ambientCount:e,downpourCount:t,role:new Uint8Array(n),style:new Uint8Array(n),resetSeed:new Uint32Array(n),seedIndex:new Uint32Array(n),hour:new Float32Array(n),strength:new Float32Array(n),presence:new Float32Array(n),stormWeight:new Float32Array(n),waterfallTop:new Float32Array(n),waterfallBlendTop:new Float32Array(n),waterfallFeather:new Float32Array(n),baseX:new Float32Array(n),z:new Float32Array(n),pathX:new Float32Array(n),pathZ:new Float32Array(n),top:new Float32Array(n),length:new Float32Array(n),headY:new Float32Array(n),speed:new Float32Array(n),near:new Float32Array(n),curtainLayer:new Uint8Array(n),driftX:new Float32Array(n),driftZ:new Float32Array(n),phase:new Float32Array(n),windSpeed:new Float32Array(n),alpha:new Float32Array(n),pearlStart:new Uint32Array(n),strandPearlCount:new Uint8Array(n),lineStart:new Uint32Array(n),lineCount:new Uint8Array(n),respawnCycle:new Uint32Array(n)},a=Ni(fs),s=Ds(oe.rain.baseWeight,oe.rain.exponent,a,!0),o=Ni(Pc),c=()=>W(.04,23.96,o),l=Ni(Lc),d=Qu(l);let h=0,f=0;for(let ae=0;ae<i;ae+=1){const J=s(),Me=gr(J),ye=kc(Me),Ee=Ii(J),je=gs(J),w=Jo(a),x=ct(.88,1.12,Jn(J*1.55,Fn^1374857533)),F=W(-.32-Me*.34,.38+Me*.68,a),ee=Math.min(dn,et+De(.95+Math.pow(je,.92)*5.8*x+F,.76,8.8)),te=a(),ie=te<.5?0:te<.85?1:2,Ae=Math.max(.8,ee-et),ce=W(.78,1.14,a)+Me*W(.62,1.08,a)+w*W(.12,.32,a),he=ie===1?Math.max(.42,Math.min(ce*W(.64,.9,a),Ae*W(.24,.42,a))):ce,ke=Math.round(ct(20,34,Math.pow(Me,.55))+w*W(0,4,a)+(ie===1?1:0));r.hour[ae]=J,jo(r,ae,J),r.role[ae]=xt.BASE,r.resetSeed[ae]=fs,r.seedIndex[ae]=ae,r.strength[ae]=Me,r.presence[ae]=Ee,r.near[ae]=w,r.top[ae]=ee,r.length[ae]=he,r.curtainLayer[ae]=ie,r.pearlStart[ae]=h,r.strandPearlCount[ae]=De(ke,16,40),r.lineStart[ae]=f,r.lineCount[ae]=r.strandPearlCount[ae]-1,r.speed[ae]=W(1.5,2.45,a)+Me*W(1.15,2.55,a)+w*.42,r.driftX[ae]=W(.004,.014,a)+w*W(.003,.009,a),r.driftZ[ae]=W(.003,.01,a)+w*W(.002,.006,a),r.phase[ae]=a()*Math.PI*2,r.windSpeed[ae]=W(.22,.58,a),r.alpha[ae]=W(.54,.96,a)*(.22+ye*1.18)*(.76+w*.72)*(ie===1?1.12:1)*Ee,Ba(r,ae,!0),h+=r.strandPearlCount[ae],f+=r.lineCount[ae]}for(let ae=0;ae<e;ae+=1){const J=i+ae,Me=c(),ye=gr(Me),Ee=kc(ye),je=Ii(Me),w=Jo(o),x=Math.round(W(28,38,o));r.hour[J]=Me,jo(r,J,Me),r.role[J]=xt.AMBIENT,r.resetSeed[J]=Pc,r.seedIndex[J]=ae,r.strength[J]=ye,r.presence[J]=je,r.near[J]=w,r.top[J]=dn,r.length[J]=dn-et+W(.12,.3,o),r.curtainLayer[J]=2,r.pearlStart[J]=h,r.strandPearlCount[J]=x,r.lineStart[J]=f,r.lineCount[J]=x-1,r.speed[J]=0,r.driftX[J]=W(.002,.008,o),r.driftZ[J]=W(.002,.006,o),r.phase[J]=o()*Math.PI*2,r.windSpeed[J]=W(.18,.46,o),r.alpha[J]=W(.08,.2,o)*(.08+Ee*.92)*je,Ba(r,J,!0),h+=x,f+=x-1}for(let ae=0;ae<t;ae+=1){const J=i+e+ae,Me=d(),ye=gr(Me),Ee=Ii(Me),je=gs(Me),w=Jo(l),x=ct(.9,1.12,Jn(Me*1.55,Fn^1374857533)),F=De(.95+Math.pow(je,.92)*5.8*x+W(-.22,.62,l),1.2,8.8),ee=l()<.45,te=l()<.7?W(.08,.38,l):W(.38,.58,l),ie=ee?F+W(-.12,.48,l):Math.max(.82,F*te+W(-.08,.24,l)),Ae=l(),ce=Ae<.7?0:Ae<.94?1:2,he=Math.round(ce===0?W(13,19,l):ce===1?W(15,21,l):W(16,22,l)),ke=ee?W(.82,1.5,l)+ye*W(.52,1.02,l):Math.min(W(.38,1.04,l),ie*W(.48,.86,l));r.hour[J]=Me,jo(r,J,Me),r.role[J]=xt.DOWNPOUR,r.style[J]=ce,r.resetSeed[J]=Lc,r.seedIndex[J]=ae,r.strength[J]=ye,r.presence[J]=Ee,r.near[J]=w,r.top[J]=Math.min(dn,et+ie),r.length[J]=Math.max(.34,ke),r.curtainLayer[J]=0,r.pearlStart[J]=h,r.strandPearlCount[J]=he,r.lineStart[J]=f,r.lineCount[J]=he-1,r.speed[J]=W(2.65,4.35,l)+ye*.72,r.driftX[J]=0,r.driftZ[J]=0,r.phase[J]=l()*Math.PI*2,r.windSpeed[J]=0,r.alpha[J]=W(ce===0?.26:.32,ce===2?.62:.52,l)*(.88+ye*.34)*Ee,Ba(r,J,!0),h+=he,f+=he-1}for(let ae=0;ae<n;ae+=1)r.waterfallBlendTop[ae]=r.waterfallTop[ae]+Math.sin(r.phase[ae]*2.17+r.hour[ae]*.41)*.2;const m=new Float32Array(h*3),g=new Float32Array(h*3),_=new Float32Array(h),p=new Float32Array(h),u=new Float32Array(h),E=new Float32Array(h),S=new Float32Array(h),A=new Float32Array(h),D=new Float32Array(h),R=new Float32Array(h),T=new Float32Array(h),I=new Float32Array(h),b=new Float32Array(h),M=new Uint16Array(h),P=new Float32Array(h),O=new Float32Array(h),z=new Float32Array(h),G=new Float32Array(h),Y=new Float32Array(h),H=new Float32Array(h),ne=new Float32Array(f*2*3),k=new Float32Array(f*2*3),de=new Float32Array(f*2),ve=new Float32Array(f*2),pe=new Float32Array(f),Ue=new Uint32Array(f),Ge=new Uint32Array(f),$=new Uint16Array(f),L=new Float32Array(f*2);for(let ae=0;ae<i;ae+=1){const J=r.pearlStart[ae],Me=r.strandPearlCount[ae],ye=r.strength[ae],Ee=r.near[ae],je=W(1.15,1.7,a)+Ee*W(.3,.82,a)+ye*W(.1,.4,a);for(let w=0;w<Me;w+=1){const x=J+w,F=x*3,ee=Me<=1?0:w/(Me-1),te=a();M[x]=ae,P[x]=ee,O[x]=W(-.006,.006,a),z[x]=a()*Math.PI*2,E[x]=1,A[x]=a(),D[x]=.3,R[x]=W(.35,.55,a),T[x]=W(.18,.4,a),u[x]=je*W(.92,1.08,a),I[x]=W(1.04,1.26,a);let ie;te<.14?(b[x]=W(.18,.32,a),ie=W(.95,1.22,a)):te<.46?(b[x]=W(.06,.16,a),ie=W(.56,.86,a)):(b[x]=W(.02,.08,a),ie=W(.26,.52,a)),p[x]=De(ie*(.68+Ee*.5+ye*.4),0,1.1),_[x]=p[x],Hc(g,F,ye,W(.72,1.12,a)*(.82+Ee*.3)*(.78+ie*.36),a)}for(let w=0;w<Me-1;w+=1){const x=r.lineStart[ae]+w,F=x*6;Ue[x]=J+w,Ge[x]=J+w+1,$[x]=ae,pe[x]=W(.009,.026,a)*(.54+ye*.44)*(.6+Ee*.42),Hc(k,F,ye,W(.2,.36,a)*(.78+Ee*.24),a),k[F+3]=k[F]*1.12,k[F+4]=k[F+1]*1.12,k[F+5]=k[F+2]*1.12}}for(let ae=0;ae<e;ae+=1){const J=i+ae,Me=r.pearlStart[J],ye=r.strandPearlCount[J],Ee=r.strength[J],je=r.near[J],w=W(.58,1.02,o)+je*W(.08,.28,o);for(let x=0;x<ye;x+=1){const F=Me+x,ee=F*3,te=ye<=1?0:x/(ye-1);M[F]=J,P[F]=te,O[F]=W(-.004,.004,o),z[F]=o()*Math.PI*2,p[F]=W(.22,.5,o)*(.88+je*.22),_[F]=p[F],E[F]=1,A[F]=o(),D[F]=W(.72,.84,o),R[F]=W(.58,.78,o),T[F]=W(.55,.75,o),u[F]=w*W(.54,.88,o),I[F]=W(1.35,2,o),b[F]=W(.04,.14,o),Ia(g,ee,Ee,W(.34,.62,o),xt.AMBIENT,0,o)}for(let x=0;x<ye-1;x+=1){const F=r.lineStart[J]+x,ee=F*6;Ue[F]=Me+x,Ge[F]=Me+x+1,$[F]=J,pe[F]=W(.003,.009,o)*(.72+Ee*.24),Ia(k,ee,Ee,W(.1,.2,o),xt.AMBIENT,0,o),k[ee+3]=k[ee]*1.08,k[ee+4]=k[ee+1]*1.08,k[ee+5]=k[ee+2]*1.08}}for(let ae=0;ae<t;ae+=1){const J=i+e+ae,Me=r.pearlStart[J],ye=r.strandPearlCount[J],Ee=r.strength[J],je=r.near[J],w=r.style[J],x=w===0?W(.35,.5,l):w===1?W(.5,.7,l):W(.75,.95,l),F=(W(1.05,1.72,l)+je*W(.28,.82,l)+Ee*W(.1,.38,l))*x;for(let ee=0;ee<ye;ee+=1){const te=Me+ee,ie=te*3,Ae=ye<=1?0:ee/(ye-1),ce=l();M[te]=J,P[te]=Ae,O[te]=W(-.004,.004,l),z[te]=l()*Math.PI*2,p[te]=W(.2,w===2?.64:.5,l)*(.88+je*.24+Ee*.2),_[te]=p[te],E[te]=1,A[te]=l(),D[te]=W(.34,.48,l),R[te]=W(.48,.7,l),T[te]=W(.32,.58,l),u[te]=F*(ce<.7?W(.68,.94,l):W(.88,1.14,l)),I[te]=w===0?W(1.28,1.82,l):W(1.05,1.48,l),b[te]=w===2?W(.3,.52,l):W(.08,.24,l),Ia(g,ie,Ee,W(.38,w===2?.86:.68,l),xt.DOWNPOUR,w,l)}for(let ee=0;ee<ye-1;ee+=1){const te=r.lineStart[J]+ee,ie=te*6;Ue[te]=Me+ee,Ge[te]=Me+ee+1,$[te]=J,pe[te]=W(.008,w===2?.025:.021,l)*(.78+Ee*.34)*(.82+je*.22),Ia(k,ie,Ee,W(.2,w===2?.42:.34,l),xt.DOWNPOUR,w,l),k[ie+3]=k[ie]*1.1,k[ie+4]=k[ie+1]*1.1,k[ie+5]=k[ie+2]*1.1}}let Z=0;for(let ae=0;ae<h;ae+=1){const J=M[ae];G[ae]=r.stormWeight[J],Y[ae]=r.waterfallBlendTop[J],H[ae]=r.waterfallFeather[J],G[ae]>.08&&A[ae]>.55&&(Z+=1)}for(let ae=0;ae<f;ae+=1){const J=r.stormWeight[$[ae]],Me=Math.sin(($[ae]+1)*12.9898)*43758.5453,ye=(Me-Math.floor(Me))*Math.PI*2;L[ae*2]=J,L[ae*2+1]=J,de[ae*2]=ye,de[ae*2+1]=ye}const j=new zt;j.setAttribute("position",new Ne(m,3).setUsage(Bt)),j.setAttribute("aColor",new Ne(g,3)),j.setAttribute("aAlpha",new Ne(_,1).setUsage(Bt)),j.setAttribute("aSize",new Ne(u,1)),j.setAttribute("aUpperScale",new Ne(E,1).setUsage(Bt)),j.setAttribute("aUpperProgress",new Ne(S,1).setUsage(Bt)),j.setAttribute("aAspect",new Ne(I,1)),j.setAttribute("aHighlight",new Ne(b,1)),j.setAttribute("aStorm",new Ne(G,1)),j.setAttribute("aWaterfallTop",new Ne(Y,1)),j.setAttribute("aWaterfallFeather",new Ne(H,1)),j.setAttribute("aMorphSeed",new Ne(A,1));const _e=new Dt({uniforms:{uTime:{value:0},uPixelRatio:{value:ui},uFogDensity:{value:ki.fog.density},uMetalDark:{value:new Re(oe.metalRain.darkColor)},uMetalMid:{value:new Re(oe.metalRain.midColor)},uMetalBright:{value:new Re(oe.metalRain.brightColor)},uMetalTint:{value:new Re(oe.metalRain.tintColor)},uPearlBandFrequency:{value:oe.metalRain.pearlBandFrequency},uPearlBandSpeed:{value:oe.metalRain.pearlBandSpeed},uPearlSpecularPower:{value:oe.metalRain.pearlSpecularPower},uPearlFresnelStrength:{value:oe.metalRain.pearlFresnelStrength},uViewport:{value:Ar},uPlotBounds:{value:Er},uPlotFeather:{value:wr},uPlotClip:Ja,uMobileCrisp:{value:qn()?1:0},uMinPointSize:{value:oe.pearls.minPointSize},uMaxPointSize:{value:oe.pearls.maxPointSize}},vertexShader:`
      uniform float uPixelRatio;
      uniform float uBeadScale;
      uniform float uMobileCrisp;
      uniform float uMinPointSize;
      uniform float uMaxPointSize;
      attribute vec3 aColor;
      attribute float aAlpha;
      attribute float aSize;
      attribute float aUpperScale;
      attribute float aUpperProgress;
      attribute float aAspect;
      attribute float aHighlight;
      attribute float aStorm;
      attribute float aWaterfallTop;
      attribute float aWaterfallFeather;
      attribute float aMorphSeed;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vAspect;
      varying float vHighlight;
      varying float vUpperProgress;
      varying float vTrailScale;
      varying float vFogDepth;
      varying float vStorm;
      varying float vWaterfall;

      void main() {
        float waterfallTransition = aStorm * (
          1.0 - smoothstep(
            aWaterfallTop - aWaterfallFeather,
            aWaterfallTop + aWaterfallFeather,
            position.y
          )
        );
        float massEntry = smoothstep(0.22, 0.92, waterfallTransition);
        float morphEligibility = mix(
          smoothstep(0.55, 0.82, aMorphSeed),
          0.62 + smoothstep(0.12, 0.98, aMorphSeed) * 0.38,
          massEntry
        );
        float trailEntry = smoothstep(0.04, 0.5, waterfallTransition);
        float lowerTrailRetention = 1.0 - smoothstep(0.96, 1.0, waterfallTransition) * 0.08;
        float trailScale = morphEligibility * trailEntry * lowerTrailRetention;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float depthScale = clamp(20.0 / max(5.2, -mvPosition.z), 0.82, 2.42);
        vColor = aColor;
        vAlpha = aAlpha;
        vAspect = aAspect
          * (1.0 + trailScale * mix(0.9, 2.2, massEntry))
          * mix(1.0, 0.72, massEntry);
        vHighlight = aHighlight;
        vUpperProgress = aUpperProgress;
        vTrailScale = trailScale;
        vFogDepth = -mvPosition.z;
        vStorm = aStorm;
        vWaterfall = waterfallTransition;
        gl_PointSize = mix(1.0, 0.5, uMobileCrisp) * uBeadScale * clamp(
          aSize * aUpperScale * (1.0 + trailScale * mix(0.7, 1.75, massEntry)) * uPixelRatio * depthScale,
          uMinPointSize * uPixelRatio,
          uMaxPointSize * uPixelRatio
        );
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform float uFogDensity;
      uniform vec3 uMetalDark;
      uniform vec3 uMetalMid;
      uniform vec3 uMetalBright;
      uniform vec3 uMetalTint;
      uniform float uPearlBandFrequency;
      uniform float uPearlBandSpeed;
      uniform float uPearlSpecularPower;
      uniform float uPearlFresnelStrength;
      uniform float uMobileCrisp;
      uniform vec2 uViewport;
      uniform vec4 uPlotBounds;
      uniform vec3 uPlotFeather;
      uniform float uPlotClip;
      uniform float uBeadAlpha;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vAspect;
      varying float vHighlight;
      varying float vUpperProgress;
      varying float vTrailScale;
      varying float vFogDepth;
      varying float vStorm;
      varying float vWaterfall;

      void main() {
        vec2 point = gl_PointCoord - vec2(0.5);
        vec2 pearlPoint = vec2(point.x * vAspect, point.y);
        float distanceToEdge = length(pearlPoint);
        float waterfallMass = smoothstep(0.28, 1.0, vWaterfall);
        float edge = mix(
          1.0 - smoothstep(0.46, 0.5, distanceToEdge),
          1.0 - smoothstep(0.28, 0.58, distanceToEdge),
          waterfallMass
        );
        float crispEdge = 1.0 - smoothstep(0.44, 0.5, distanceToEdge);
        edge = mix(edge, crispEdge, uMobileCrisp);
        float sheetEdge = 1.0 - smoothstep(
          0.42,
          0.62,
          length(vec2(point.x * 0.94, point.y * 0.62))
        );
        edge = max(edge, sheetEdge * waterfallMass * mix(0.32, 0.08, uMobileCrisp));
        if (edge < 0.01) discard;

        float body = exp(-dot(pearlPoint, pearlPoint) * mix(4.6, 2.6, waterfallMass));
        float verticalSheet = exp(-(point.x * point.x * mix(18.0, 5.8, waterfallMass) + point.y * point.y * mix(6.0, 1.36, waterfallMass)))
          * waterfallMass;
        float lowerGlow = smoothstep(-0.34, 0.42, point.y) * mix(0.12, 0.28, waterfallMass);
        // Soft satin pearl sheen instead of a tight gem specular.
        vec2 sheenPoint = pearlPoint - vec2(-0.12, 0.18);
        float highlight = exp(-dot(sheenPoint, sheenPoint) * 40.0)
          * vHighlight
          * mix(1.0, 0.4, vUpperProgress);
        // Cool rim light on the lower/shadow side gives pearls roundness + weight.
        float opticalDetail = mix(1.0, 0.15, uMobileCrisp);
        float rimLight = smoothstep(0.32, 0.5, distanceToEdge)
          * smoothstep(0.05, -0.4, point.y) * vHighlight * 0.28 * opticalDetail;
        float rim = smoothstep(0.36, 0.5, distanceToEdge) * 0.08 * opticalDetail;
        float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
        vec2 screenUv = vec2(
          gl_FragCoord.x / uViewport.x,
          1.0 - gl_FragCoord.y / uViewport.y
        );
        float horizontalMask = smoothstep(
          uPlotBounds.x,
          uPlotBounds.x + uPlotFeather.x,
          screenUv.x
        ) * (1.0 - smoothstep(
          uPlotBounds.y - uPlotFeather.x,
          uPlotBounds.y,
          screenUv.x
        ));
        horizontalMask = mix(1.0, horizontalMask, uPlotClip);
        float lowerMask = 1.0 - smoothstep(
          uPlotBounds.w - uPlotFeather.z,
          uPlotBounds.w,
          screenUv.y
        );
        lowerMask = mix(1.0, lowerMask, uPlotClip);
        float plotMask = horizontalMask * lowerMask;

        // Reconstruct a soft sphere normal from the point sprite. Alternating
        // dark and bright reflection bands make the pearl read as mercury
        // without converting every drop to a costly lit mesh.
        vec2 metalPoint = clamp(pearlPoint / 0.5, vec2(-1.0), vec2(1.0));
        float metalZ = sqrt(max(0.0, 1.0 - dot(metalPoint, metalPoint)));
        vec3 metalNormal = normalize(vec3(metalPoint, metalZ));
        vec3 keyDirection = normalize(vec3(-0.42, 0.62, 1.0));
        float metalSpecular = pow(
          max(0.0, dot(metalNormal, keyDirection)),
          max(0.01, uPearlSpecularPower)
        );
        float metalFresnel = pow(1.0 - clamp(metalNormal.z, 0.0, 1.0), 2.4);
        float reflectionWave = 0.5 + 0.5 * sin(
          metalNormal.y * uPearlBandFrequency
          + metalNormal.x * 2.4
          - uTime * uPearlBandSpeed
          + vStorm * 2.2
        );
        float mirrorBand = smoothstep(0.34, 0.86, reflectionWave);
        float shadowBand = smoothstep(0.68, 0.98, 1.0 - reflectionWave);
        vec3 color = mix(uMetalDark, uMetalMid, mirrorBand * 0.82 + body * 0.12);
        color = mix(color, uMetalBright, clamp(
          metalSpecular * 1.2 + metalFresnel * uPearlFresnelStrength,
          0.0,
          1.0
        ));
        float tintStrength = (verticalSheet * 0.2 + lowerGlow * 0.08)
          * mix(1.0, 0.62, uMobileCrisp);
        color = mix(color, uMetalTint, tintStrength);
        color = mix(color, uMetalDark, shadowBand * 0.56 + rim * 0.16);
        color += uMetalBright * (highlight * 0.18 + rimLight * 0.2);
        color *= mix(1.0, 0.78, vUpperProgress);
        color = mix(color, vec3(0.0, 0.0, 0.0), fogFactor * 0.48);
        float alpha = uBeadAlpha * edge * vAlpha * plotMask
          * mix(1.0, 0.45, uMobileCrisp)
          * (0.78 + highlight * 0.05 * opticalDetail + rimLight * 0.18 + verticalSheet * mix(0.16, 0.04, uMobileCrisp))
          * (1.0 - fogFactor * 0.38);
        if (alpha < 0.001) discard;
        gl_FragColor = vec4(color, min(0.94, alpha));
      }
    `,transparent:!0,depthWrite:!1,blending:hn}),le=new zt;le.setAttribute("position",new Ne(ne,3).setUsage(Bt)),le.setAttribute("aColor",new Ne(k,3)),le.setAttribute("aAlpha",new Ne(ve,1).setUsage(Bt)),le.setAttribute("aStorm",new Ne(L,1)),le.setAttribute("aBandPhase",new Ne(de,1));const Ie=new Dt({uniforms:{uTime:{value:0},uFogDensity:{value:ki.fog.density},uMetalDark:{value:new Re(oe.metalRain.darkColor)},uMetalMid:{value:new Re(oe.metalRain.midColor)},uMetalBright:{value:new Re(oe.metalRain.brightColor)},uThreadBandDensity:{value:oe.metalRain.threadBandDensity},uThreadBandSpeed:{value:oe.metalRain.threadBandSpeed},uThreadMirrorStrength:{value:oe.metalRain.threadMirrorStrength},uViewport:{value:Ar},uPlotBounds:{value:Er},uPlotFeather:{value:wr},uPlotClip:Ja,uMobileCrisp:{value:qn()?1:0}},vertexShader:`
      attribute vec3 aColor;
      attribute float aAlpha;
      attribute float aStorm;
      attribute float aBandPhase;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vFogDepth;
      varying float vStorm;
      varying float vBandPhase;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vColor = aColor;
        vAlpha = aAlpha;
        vFogDepth = -mvPosition.z;
        vStorm = aStorm;
        vBandPhase = aBandPhase;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform float uFogDensity;
      uniform vec3 uMetalDark;
      uniform vec3 uMetalMid;
      uniform vec3 uMetalBright;
      uniform float uThreadBandDensity;
      uniform float uThreadBandSpeed;
      uniform float uThreadMirrorStrength;
      uniform float uMobileCrisp;
      uniform vec2 uViewport;
      uniform vec4 uPlotBounds;
      uniform vec3 uPlotFeather;
      uniform float uPlotClip;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vFogDepth;
      varying float vStorm;
      varying float vBandPhase;

      void main() {
        float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
        vec2 screenUv = vec2(
          gl_FragCoord.x / uViewport.x,
          1.0 - gl_FragCoord.y / uViewport.y
        );
        float horizontalMask = smoothstep(
          uPlotBounds.x,
          uPlotBounds.x + uPlotFeather.x,
          screenUv.x
        ) * (1.0 - smoothstep(
          uPlotBounds.y - uPlotFeather.x,
          uPlotBounds.y,
          screenUv.x
        ));
        horizontalMask = mix(1.0, horizontalMask, uPlotClip);
        float lowerMask = 1.0 - smoothstep(
          uPlotBounds.w - uPlotFeather.z,
          uPlotBounds.w,
          screenUv.y
        );
        lowerMask = mix(1.0, lowerMask, uPlotClip);
        float alpha = vAlpha * horizontalMask * lowerMask
          * mix(1.0, 5.0, uMobileCrisp)
          * (1.0 - fogFactor * 0.42);
        if (alpha < 0.0005) discard;
        float reflectionWave = 0.5 + 0.5 * sin(
          gl_FragCoord.y * uThreadBandDensity
          + gl_FragCoord.x * uThreadBandDensity * 0.1777778
          + vBandPhase
          - uTime * uThreadBandSpeed
          + vStorm * 2.6
        );
        float mirrorBand = smoothstep(0.42, 0.86, reflectionWave);
        float darkBand = smoothstep(0.7, 0.98, 1.0 - reflectionWave);
        vec3 color = mix(uMetalDark, uMetalMid, mirrorBand);
        color = mix(
          color,
          uMetalBright,
          mirrorBand * mirrorBand * (uThreadMirrorStrength + vStorm * 0.26)
        );
        color = mix(color, uMetalDark, darkBand * 0.58);
        color = mix(color, vec3(0.0, 0.0, 0.0), fogFactor * 0.55);
        gl_FragColor = vec4(color, alpha);
      }
    `,transparent:!0,depthWrite:!1,blending:hn}),C=new Es(j,_e);C.renderOrder=3,_e.uniforms.uBeadScale={value:1},_e.uniforms.uBeadAlpha={value:oe.pearls.alpha};const Pe=new Mu(le,Ie);Pe.renderOrder=2;const Ye={...r,pearlCount:h,lineTotal:f,pearlPositions:m,pearlAlphas:_,pearlBaseAlpha:p,pearlUpperScales:E,pearlUpperProgress:S,pearlUpperSeed:A,pearlTopRetention:D,pearlTopSize:R,pearlTopAlpha:T,pearlChain:M,pearlFraction:P,pearlOffsetY:O,pearlShimmer:z,linePositions:ne,lineAlphas:ve,lineBaseAlpha:pe,linePearlA:Ue,linePearlB:Ge,lineChain:$,activeBridgeTrailCount:Z};return{points:C,lines:Pe,data:Ye}}function Rs(i,e,t){const n=i.data;i.points.material.uniforms.uTime.value=e,i.lines.material.uniforms.uTime.value=e;for(let r=0;r<n.count;r+=1){const a=n.role[r]===xt.AMBIENT,s=n.headY[r]-n.length[r];a?n.headY[r]=dn-.03:n.headY[r]-=n.speed[r]*t*.58*(.92+me.burst*.08);const o=n.headY[r]-n.length[r],c=n.phase[r],l=Math.sin(e*n.windSpeed[r]+c),d=Math.cos(e*n.windSpeed[r]*.72+c*.7),h=n.baseX[r]+l*n.driftX[r],f=n.z[r]+d*n.driftZ[r];if(n.pathX[r]=h,n.pathZ[r]=f,!a&&n.presence[r]>.08&&s>=et&&o<et){const m=Uv(ht,h,f,n.hour[r],n.strength[r],n.near[r],n.role[r]);Iv(ht,Jr,h,f,n.strength[r],m,n.role[r])}!a&&o<et&&Ba(n,r,!1)}for(let r=0;r<n.pearlCount;r+=1){const a=n.pearlChain[r],s=n.pearlFraction[r],o=r*3,c=n.headY[a]-s*n.length[a]+n.pearlOffsetY[r],l=Math.min(c,dn),d=1-Vt(dn-.055,dn,c),h=Math.max(.8,n.top[a]-et),f=(l-et)/h,m=1-De(f,0,1),g=n.pathX[a],_=n.pathZ[a],p=_s(n.hour[a],n.baseX[a],n.z[a]),u=.9+Math.sin(e*4.2+n.pearlShimmer[r])*.12,E=Vt(.55,1,f),S=ct(1,n.pearlTopRetention[r],Math.pow(E,1.15)),A=E<=0?1:1-Vt(S-.06,S+.06,n.pearlUpperSeed[r]),D=ct(1,n.pearlTopSize[r],Math.pow(E,1.05)),R=ct(1,n.pearlTopAlpha[r],Math.pow(E,1.1))*A,T=n.role[a],I=n.stormWeight[a],b=n.waterfallBlendTop[a],M=n.waterfallFeather[a],P=I*(1-Vt(b-M,b+M,l)),O=De((n.pearlUpperSeed[r]-.55)/.27,0,1),z=T===xt.DOWNPOUR?ct(.5,.82,O):ct(.4,.68,O),G=ct(1,z,P),Y=ct(1,T===xt.DOWNPOUR?ct(.96,1.62,O):ct(.78,1.36,O),Vt(.22,1,P)),H=ct(1,T===xt.DOWNPOUR?ct(.76,.98,O):ct(.62,.86,O),Vt(.48,1,P)),ne=T===xt.DOWNPOUR?Vt(et+.015,et+.1,l):Vt(et+.02,et+.12,l),k=n.curtainLayer[a]===1?1:0,de=T===xt.BASE?1+Vt(.02,.5,m)*(oe.floorGlow.base+n.strength[a]*oe.floorGlow.baseByStrength)*(1-I)+k*(oe.floorGlow.lowerCurtain+n.strength[a]*oe.floorGlow.lowerCurtainByStrength)*(1-I):T===xt.DOWNPOUR?1+Vt(.02,.54,m)*(oe.floorGlow.downpour+n.strength[a]*oe.floorGlow.downpourByStrength)*(1-I):1+Vt(.02,.5,m)*oe.floorGlow.ambient;n.pearlPositions[o]=g,n.pearlPositions[o+1]=l,n.pearlPositions[o+2]=_,n.pearlUpperScales[r]=D*Y,n.pearlUpperProgress[r]=E,n.pearlAlphas[r]=De(n.pearlBaseAlpha[r]*n.alpha[a]*u*d*R*ne*de*G*H*(1+p*.56+me.burst*to(n.hour[a],me.selectedHour)*.38),0,.96)}for(let r=0;r<n.lineTotal;r+=1){const a=n.linePearlA[r]*3,s=n.linePearlB[r]*3,o=r*6,c=r*2,l=n.lineChain[r],d=n.role[l],h=(n.pearlPositions[a+1]+n.pearlPositions[s+1])*.5,f=n.stormWeight[l],m=n.waterfallBlendTop[l],g=n.waterfallFeather[l],_=f*(1-Vt(m-g,m+g,h)),p=1+4*_*(1-_)*.88,u=ct(1,d===xt.DOWNPOUR?.12:.2,_)*p,E=_s(n.hour[l],n.baseX[l],n.z[l]),S=De((n.pearlAlphas[n.linePearlA[r]]+n.pearlAlphas[n.linePearlB[r]])*.86,0,1),A=d===xt.DOWNPOUR?2.45:d===xt.AMBIENT?1.2:1,D=n.lineBaseAlpha[r]*S*(.76+E*.52)*A*u;n.linePositions[o]=n.pearlPositions[a],n.linePositions[o+1]=Math.max(et+.006,n.pearlPositions[a+1]),n.linePositions[o+2]=n.pearlPositions[a+2],n.linePositions[o+3]=n.pearlPositions[s],n.linePositions[o+4]=Math.max(et+.006,n.pearlPositions[s+1]),n.linePositions[o+5]=n.pearlPositions[s+2],n.lineAlphas[c]=D*.58,n.lineAlphas[c+1]=D}i.points.geometry.attributes.position.needsUpdate=!0,i.points.geometry.attributes.aAlpha.needsUpdate=!0,i.points.geometry.attributes.aUpperScale.needsUpdate=!0,i.points.geometry.attributes.aUpperProgress.needsUpdate=!0,i.lines.geometry.attributes.position.needsUpdate=!0,i.lines.geometry.attributes.aAlpha.needsUpdate=!0}function Tv(){const i=new Un(_i.width*1.16,_i.depth*2.3,150,92);i.rotateX(-Math.PI/2),i.translate(0,et,1.25);const e=new Dt({uniforms:{uTime:{value:0},uColorDeep:{value:new Re(oe.water.deepColor)},uColorSurface:{value:new Re(oe.water.surfaceColor)},uRoughness:{value:oe.water.roughness},uSpecularStrength:{value:oe.water.specularStrength},uRippleHighlight:{value:oe.water.rippleHighlight},uSurfaceOpacity:{value:oe.water.surfaceOpacity},uHeightField:{value:null},uFieldBounds:{value:new Pt(Li.xMin,Li.xMax,Li.zMin,Li.zMax)},uFieldTexel:{value:new Ve(1/Li.resX,1/Li.resZ)},uRippleGain:{value:oe.ripple.gain},uRippleDisplace:{value:oe.ripple.displace},uWavePrimary:{value:oe.water.wavePrimary},uWaveSecondary:{value:oe.water.waveSecondary},uRainLut:{value:null},uLutBounds:{value:new Ve(Lt(0),Lt(24)-Lt(0))},uReflStrength:{value:oe.water.reflStrength},uReflFade:{value:oe.water.reflFade},uRearFadeNearZ:{value:oe.water.rearFadeNearZ},uRearFadeFarZ:{value:oe.water.rearFadeFarZ}},vertexShader:`
      uniform float uTime;
      uniform sampler2D uHeightField;
      uniform vec4 uFieldBounds;
      uniform float uRippleDisplace;
      uniform float uWavePrimary;
      uniform float uWaveSecondary;
      varying vec2 vUv;
      varying vec3 vWorld;

      void main() {
        vec3 transformed = position;
        float wave = sin(uTime * 1.2 + position.x * 0.55 + position.z * 0.34) * uWavePrimary;
        wave += sin(-uTime * 0.86 + position.x * 0.18 - position.z * 0.9) * uWaveSecondary;
        // GPU 高度场驱动真实顶点起伏 — 雨滴落点在水面上顶出凹坑并向外扩散
        vec2 fUv = vec2(
          (position.x - uFieldBounds.x) / (uFieldBounds.y - uFieldBounds.x),
          (position.z - uFieldBounds.z) / (uFieldBounds.w - uFieldBounds.z)
        );
        if (fUv.x > 0.0 && fUv.x < 1.0 && fUv.y > 0.0 && fUv.y < 1.0) {
          wave += texture2D(uHeightField, fUv).r * uRippleDisplace;
        }
        transformed.y += wave;
        vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
        vWorld = worldPosition.xyz;
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform vec3 uColorDeep;
      uniform vec3 uColorSurface;
      uniform float uRoughness;
      uniform float uSpecularStrength;
      uniform float uRippleHighlight;
      uniform float uSurfaceOpacity;
      uniform sampler2D uHeightField;
      uniform vec4 uFieldBounds;
      uniform vec2 uFieldTexel;
      uniform float uRippleGain;
      uniform sampler2D uRainLut;
      uniform vec2 uLutBounds;
      uniform float uReflStrength;
      uniform float uReflFade;
      uniform float uRearFadeNearZ;
      uniform float uRearFadeFarZ;
      varying vec2 vUv;
      varying vec3 vWorld;

      void main() {
        // Sample GPU height field neighbours → per-pixel surface normal
        vec2 fUv = vec2(
          (vWorld.x - uFieldBounds.x) / (uFieldBounds.y - uFieldBounds.x),
          (vWorld.z - uFieldBounds.z) / (uFieldBounds.w - uFieldBounds.z)
        );
        float hC = 0.0, hL = 0.0, hR = 0.0, hT = 0.0, hB = 0.0;
        if (fUv.x > 0.01 && fUv.x < 0.99 && fUv.y > 0.01 && fUv.y < 0.99) {
          hC = texture2D(uHeightField, fUv).r;
          hL = texture2D(uHeightField, fUv - vec2(uFieldTexel.x, 0.0)).r;
          hR = texture2D(uHeightField, fUv + vec2(uFieldTexel.x, 0.0)).r;
          hT = texture2D(uHeightField, fUv + vec2(0.0, uFieldTexel.y)).r;
          hB = texture2D(uHeightField, fUv - vec2(0.0, uFieldTexel.y)).r;
        }

        // Surface normal from finite-difference height gradients.
        // Fixed scale: gradient of ~0.08 → ~15° tilt — subtle but visible.
        // uRippleGain only controls reflected light energy, not geometry height.
        float nScale = 3.5;
        vec3 normal = normalize(vec3((hL - hR) * nScale, 1.0, (hB - hT) * nScale));

        // Physical water lighting: Fresnel + specular + diffuse
        vec3 viewDir   = normalize(cameraPosition - vWorld);
        vec3 lightDir  = normalize(vec3(-0.35, 0.88, 0.42));
        float diffuse  = max(dot(normal, lightDir), 0.0);
        float fresnel  = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
        vec3 reflDir   = reflect(-lightDir, normal);
        float specularPower = mix(150.0, 28.0, uRoughness);
        float specular = pow(max(dot(reflDir, viewDir), 0.0), specularPower);

        // Use local slope + curvature instead of broad height values. This keeps
        // highlights on the moving ripple rings rather than whitening the whole
        // surface into a frosted sheet.
        float neighbourAverage = (hL + hR + hT + hB) * 0.25;
        float rippleSlope = length(vec2(hL - hR, hB - hT));
        float rippleCurvature = abs(hC - neighbourAverage);
        float rippleSignal = (rippleSlope * 1.7 + rippleCurvature * 2.8) * uRippleGain;
        float rippleEnergy = smoothstep(0.08, 0.68, rippleSignal);
        float rippleHighlight = pow(rippleEnergy, 1.65);
        float rippleGlow = rippleHighlight * (0.42 + diffuse * 0.48);

        // Keep the base water dark and mirror-like; reserve the pale blue-white
        // energy for narrow specular and ripple highlights.
        vec3 edgeColor = vec3(0.58, 0.69, 0.82);
        vec3 rippleColor = vec3(0.72, 0.84, 0.96);
        float surfaceFill = mix(0.12, 0.34, uRoughness);
        float fresnelFill = mix(0.42, 0.24, uRoughness);
        float diffuseFill = mix(0.025, 0.2, uRoughness);
        vec3 color = mix(
          uColorDeep,
          uColorSurface,
          surfaceFill + fresnel * fresnelFill + diffuse * diffuseFill
        );
        color += edgeColor * specular * uSpecularStrength;
        color += rippleColor * rippleGlow * uRippleHighlight;

        // Rain-column reflection: rain above mirrors into the dark water surface
        float dz        = vWorld.z - 1.15;
        float depthFade = smoothstep(-0.7, 0.0, dz) * (1.0 - smoothstep(0.2, uReflFade, dz));
        float wobX      = vWorld.x + (hL - hR) * 1.15;
        float lutX      = clamp((wobX - uLutBounds.x) / uLutBounds.y, 0.0, 1.0);
        float colRain   = pow(texture2D(uRainLut, vec2(lutX, 0.5)).r, 1.3);
        float hMask     = smoothstep(-0.01, 0.05, lutX) * (1.0 - smoothstep(0.95, 1.01, lutX));
        // Gentle shimmer driven by height field, not synthetic sine stripes
        float shimmer = 0.7 + 0.3 * sin(uTime * 0.9 + wobX * 1.4 + dz * 2.2 + hC * 4.0);
        // Grey-blue reflection matches pearl colour → bridges rain-to-water
        float rippleReflection = 1.0 + rippleHighlight * 0.62;
        color += vec3(0.56, 0.66, 0.78)
          * colRain * depthFade * hMask * shimmer * uReflStrength * rippleReflection;

        // Broad waterline seam: soft grey-blue glow where rain meets water
        float seam = colRain * exp(-pow(dz * 1.4, 2.0)) * 0.5 * hMask;
        color += vec3(0.44, 0.54, 0.66) * seam;

        // Clamp the physical surface opacity first, then apply the rear mask.
        // This matters when surfaceOpacity > 1: otherwise the clamp keeps most
        // of the fade fully opaque and produces a sudden edge near the back.
        float frontFade = smoothstep(0.0, 0.14, vUv.y);
        float rearFade = smoothstep(
          min(uRearFadeFarZ, uRearFadeNearZ),
          max(uRearFadeFarZ, uRearFadeNearZ),
          vWorld.z
        );
        float surfaceAlpha = min(
          0.88,
          uSurfaceOpacity + fresnel * 0.18 + rippleGlow * 0.3
        );
        // Feather both physical side edges so rotating the scene never reveals
        // the water plane as a hard rectangular wall.
        float sideFade = smoothstep(0.0, 0.16, vUv.x)
          * smoothstep(0.0, 0.16, 1.0 - vUv.x);
        float alpha = surfaceAlpha * frontFade * rearFade * sideFade;
        if (alpha < 0.002) discard;
        gl_FragColor = vec4(color, alpha);
      }
    `,transparent:!0,depthWrite:!1,blending:hn}),t=new Tt(i,e);return t.renderOrder=0,t}function Cv(){const i=new Un(_i.width*1.16,_i.depth*2.3);i.rotateX(-Math.PI/2),i.translate(0,et-.28,1.25);const e=new Dt({uniforms:{uColor:{value:new Re(oe.water.deepColor)},uRearFadeNearZ:{value:oe.water.rearFadeNearZ},uRearFadeFarZ:{value:oe.water.rearFadeFarZ}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vUv = uv;
        vWorld = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uRearFadeNearZ;
      uniform float uRearFadeFarZ;
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        float frontFade = smoothstep(0.0, 0.12, vUv.y);
        float rearFade = smoothstep(
          min(uRearFadeFarZ, uRearFadeNearZ),
          max(uRearFadeFarZ, uRearFadeNearZ),
          vWorld.z
        );
        float sideFade = smoothstep(0.0, 0.18, vUv.x)
          * smoothstep(0.0, 0.18, 1.0 - vUv.x);
        float alpha = 0.75 * frontFade * rearFade * sideFade;
        if (alpha < 0.002) discard;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,transparent:!0,depthWrite:!1,side:tn,toneMapped:!1}),t=new Tt(i,e);return t.renderOrder=-1,t}function $u(){const e=Lt(0),t=Lt(24),n=t-e,r=new Float32Array(256),a=new Float32Array(256);for(let f=0;f<=24;f+=.04){const m=De((Lt(f)-e)/n,0,1),g=gr(f),_=m*255,p=7,u=Math.max(0,Math.floor(_-p)),E=Math.min(255,Math.ceil(_+p));for(let S=u;S<=E;S+=1){const A=(S-_)/p,D=Math.exp(-A*A*1.3);r[S]+=g*D,a[S]+=D}}const s=new Float32Array(256*4);for(let f=0;f<256;f+=1){const m=f/255*24,g=Ii(m),_=(a[f]>0?Math.pow(r[f]/a[f],1.12):0)*g;s[f*4]=_,s[f*4+1]=_,s[f*4+2]=_,s[f*4+3]=1}const o=new B0(s,256,1,vn,Xn);o.minFilter=Rt,o.magFilter=Rt,o.wrapS=En,o.wrapT=En,o.needsUpdate=!0;const c=oe.mist.height,l=new Un(n*1.01,c,1,1);l.translate((e+t)*.5,et+c*.5-.42,1.15);const d=new Dt({uniforms:{uTime:{value:0},uLut:{value:o},uColor:{value:new Re(oe.mist.color)},uOpacity:{value:oe.mist.opacity},uReflOpacity:{value:oe.mist.reflectionOpacity},uViewport:{value:Ar},uPlotBounds:{value:Er},uPlotFeather:{value:wr}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform sampler2D uLut;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uReflOpacity;
      uniform vec2 uViewport;
      uniform vec4 uPlotBounds;
      uniform vec3 uPlotFeather;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(41.21, 289.7))) * 43758.5453);
      }

      void main() {
        float intensity = texture2D(uLut, vec2(vUv.x, 0.5)).r;
        // Vertical profile: a bright core right at the waterline that fades up
        // into a low haze, and fades OUT below the waterline so the band never
        // shows as a panel beneath the axis.
        float core = exp(-pow((vUv.y - 0.14) * 6.4, 2.0));
        float haze = exp(-pow((vUv.y - 0.2) * 2.4, 2.0)) * 0.5;
        float lowerCut = smoothstep(0.05, 0.14, vUv.y);
        float yb = (core + haze) * lowerCut;
        // Gentle breathing + fine grain so the band reads as drifting vapour.
        float drift = 0.88 + 0.12 * sin(uTime * 0.5 + vUv.x * 7.3);
        float grain = 0.9 + 0.1 * hash(floor(vUv * vec2(120.0, 92.0)) + floor(uTime * 1.3));
        intensity *= drift * grain;

        vec2 screenUv = vec2(
          gl_FragCoord.x / uViewport.x,
          1.0 - gl_FragCoord.y / uViewport.y
        );
        float horizontalMask = smoothstep(
          uPlotBounds.x,
          uPlotBounds.x + uPlotFeather.x,
          screenUv.x
        ) * (1.0 - smoothstep(
          uPlotBounds.y - uPlotFeather.x,
          uPlotBounds.y,
          screenUv.x
        ));

        // Reflection of the rain in the water just below the waterline — a dim,
        // vertically-streaked glow that fades down with depth.
        float reflBand = smoothstep(0.0, 0.11, vUv.y) * (1.0 - smoothstep(0.1, 0.135, vUv.y));
        float reflStreak = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(vUv.x * 240.0 + hash(vec2(floor(vUv.x * 60.0), 1.0)) * 7.0), 1.8);
        float reflWobble = 0.85 + 0.15 * sin(uTime * 1.2 + vUv.x * 30.0);
        float refl = reflBand * reflStreak * reflWobble;

        float sideFade = smoothstep(0.0, 0.08, vUv.x)
          * smoothstep(0.0, 0.08, 1.0 - vUv.x);
        float a = intensity * (yb + refl * uReflOpacity) * uOpacity * horizontalMask * sideFade;
        if (a < 0.002) discard;
        vec3 color = uColor * (0.7 + intensity * 0.6);
        gl_FragColor = vec4(color, a);
      }
    `,transparent:!0,depthWrite:!1,depthTest:!0,blending:vr}),h=new Tt(l,d);return h.name="rain-mist-band",h.renderOrder=1.7,h.frustumCulled=!1,{mesh:h,material:d,lut:o,lutXMin:e,lutSpan:n}}function Zu(i,e){const t=new wn;t.name="peak-waterfall-system";const n=Rv(),r=Pv(),a=new Tt(n,r);a.name="peak-waterfall-density-body",a.renderOrder=1.5,a.frustumCulled=!1;const s=Lv(i,e),o=Bc(!1),c=new Tt(s.geometry,o);c.name="peak-waterfall-filaments",c.renderOrder=2.45,c.frustumCulled=!1;const l=Bc(!0),d=new Tt(s.highlightGeometry,l);return d.name="peak-waterfall-filament-highlights",d.renderOrder=2.75,d.frustumCulled=!1,t.add(a,c,d),{group:t,materials:[r,o,l],bodyCount:_n.length,peakCount:_n.length,filamentCapacity:i,visibleFilamentCount:i,bridgeFilamentCount:s.bridgeCount,coreFilamentCount:s.coreCount,lowerFilamentCount:s.lowerCount,wideFilamentCount:s.wideCount,foregroundFilamentCount:s.foregroundCount,highlightFilamentCount:s.highlightCount,ribbonSegments:s.ribbonSegments}}function Rv(){const n=2387*_n.length,r=new Float32Array(n*3),a=new Float32Array(n*2),s=new Float32Array(n),o=new Float32Array(n),c=new Uint16Array(_n.length*76*30*6);let l=0,d=0;for(let f=0;f<_n.length;f+=1){const[m,g]=_n[f],_=l;for(let p=0;p<=76;p+=1){const u=p/76,E=ct(m,g,u),S=Us(E),A=Gi(E),D=et,R=.18+(Jn(E*2.1,Fn^1910834091)-.5)*.16;for(let T=0;T<=30;T+=1){const I=T/30,b=l*3,M=l*2;r[b]=Lt(E),r[b+1]=ct(D,S,I),r[b+2]=R+(Jn(E*3.2+I*1.7,Fn^1335520561)-.5)*.08,a[M]=u,a[M+1]=I,s[l]=A,o[l]=f*17.3+u*4.7,l+=1}}for(let p=0;p<76;p+=1)for(let u=0;u<30;u+=1){const S=_+p*31+u,A=S+31;c[d++]=S,c[d++]=A,c[d++]=S+1,c[d++]=A,c[d++]=A+1,c[d++]=S+1}}const h=new zt;return h.setAttribute("position",new Ne(r,3)),h.setAttribute("aLocal",new Ne(a,2)),h.setAttribute("aStorm",new Ne(s,1)),h.setAttribute("aSeed",new Ne(o,1)),h.setIndex(new Ne(c,1)),n>0&&h.computeBoundingSphere(),h}function Pv(){return new Dt({uniforms:{uTime:{value:0},uMotion:{value:zi?0:1},uDeep:{value:new Re(oe.metalRain.darkColor)},uMid:{value:new Re(oe.metalRain.midColor)},uBright:{value:new Re(oe.metalRain.brightColor)},uBodyBandDensity:{value:oe.metalRain.bodyBandDensity},uBodyBandSpeed:{value:oe.metalRain.bodyBandSpeed},uBodyMirrorStrength:{value:oe.metalRain.bodyMirrorStrength},uBroadSway:{value:oe.waterfallBody.broadSway},uFineSway:{value:oe.waterfallBody.fineSway},uStreakFrequency:{value:oe.waterfallBody.streakFrequency},uFineStreakFrequency:{value:oe.waterfallBody.fineStreakFrequency},uStreakSharpness:{value:oe.waterfallBody.streakSharpness},uFineStreakSharpness:{value:oe.waterfallBody.fineStreakSharpness},uFineStreakWeight:{value:oe.waterfallBody.fineStreakWeight},uBaseMass:{value:oe.waterfallBody.baseMass},uRiseMass:{value:oe.waterfallBody.riseMass},uCloudLow:{value:oe.waterfallBody.cloudLow},uCloudHigh:{value:oe.waterfallBody.cloudHigh},uGapDarkness:{value:oe.waterfallBody.gapDarkness},uStreakBrightness:{value:oe.waterfallBody.streakBrightness},uBottomFeather:{value:oe.waterfallBody.bottomFeather},uOpacity:{value:oe.waterfallBody.opacity},uViewport:{value:Ar},uPlotBounds:{value:Er},uPlotFeather:{value:wr},uPlotClip:Ja},vertexShader:`
      uniform float uTime;
      uniform float uMotion;
      uniform float uBroadSway;
      uniform float uFineSway;
      attribute vec2 aLocal;
      attribute float aStorm;
      attribute float aSeed;
      varying vec2 vLocal;
      varying float vStorm;
      varying float vSeed;
      varying vec3 vWorld;

      void main() {
        float time = uTime * uMotion;
        vec3 transformed = position;
        float sway = sin(position.y * 2.8 - time * 1.9 + aSeed * 1.7) * uBroadSway;
        sway += sin(position.y * 7.1 - time * 4.2 - position.x) * uFineSway;
        transformed.x += sway * aStorm * (0.45 + aLocal.y * 0.55);
        vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
        vLocal = aLocal;
        vStorm = aStorm;
        vSeed = aSeed;
        vWorld = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,fragmentShader:`
      precision highp float;
      uniform float uTime;
      uniform float uMotion;
      uniform vec3 uDeep;
      uniform vec3 uMid;
      uniform vec3 uBright;
      uniform float uBodyBandDensity;
      uniform float uBodyBandSpeed;
      uniform float uBodyMirrorStrength;
      uniform float uStreakFrequency;
      uniform float uFineStreakFrequency;
      uniform float uStreakSharpness;
      uniform float uFineStreakSharpness;
      uniform float uFineStreakWeight;
      uniform float uBaseMass;
      uniform float uRiseMass;
      uniform float uCloudLow;
      uniform float uCloudHigh;
      uniform float uGapDarkness;
      uniform float uStreakBrightness;
      uniform float uBottomFeather;
      uniform float uOpacity;
      uniform vec2 uViewport;
      uniform vec4 uPlotBounds;
      uniform vec3 uPlotFeather;
      uniform float uPlotClip;
      varying vec2 vLocal;
      varying float vStorm;
      varying float vSeed;
      varying vec3 vWorld;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = i.x + i.y * 57.0;
        return mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
      }
      float fbm(vec2 p) {
        float value = noise(p) * 0.55;
        p = p * 2.03 + vec2(7.1, 13.7);
        value += noise(p) * 0.29;
        p = p * 2.07 + vec2(17.3, 5.9);
        value += noise(p) * 0.16;
        return value;
      }

      void main() {
        float time = uTime * uMotion;

        // Soft horizontal sheet edges.
        float edgeWarp = noise(vec2(vLocal.y * 6.0 - time * 0.6, vSeed));
        float edge = smoothstep(0.02 + edgeWarp * 0.04, 0.17, vLocal.x)
          * (1.0 - smoothstep(0.83, 0.98 - edgeWarp * 0.04, vLocal.x));

        // Vertical volume profile: a heavy bright mass at the base that billows
        // up and fades — the "reverse waterfall". Top feathers into the pearls.
        float baseMass = exp(-pow((vLocal.y - 0.04) * 2.6, 2.0));
        float rise = 1.0 - smoothstep(0.0, 0.8, vLocal.y);
        float topFade = 1.0 - smoothstep(0.6, 1.0, vLocal.y);

        // Soft organic billow (low frequency, slow) — this carries the volume
        // and light/dark, instead of hard procedural stripes.
        float billow = fbm(vec2(vWorld.x * 0.85 + vSeed * 0.3, vLocal.y * 1.7 - time * 0.5));
        float billow2 = fbm(vec2(vWorld.x * 1.7 - vSeed * 0.6, vLocal.y * 3.1 - time * 0.95));
        float cloud = smoothstep(0.22, 0.86, billow * 0.7 + billow2 * 0.42);

        // Vertical water-flow streaks give the bloom real texture (de-blur):
        // bright water columns separated by darker gaps, flowing downward.
        float warp = fbm(vec2(vWorld.x * 0.9 + vSeed, vLocal.y * 1.2 - time * 0.4));
        // 🎛️ 瀑布纹理对应 TUNING.waterfallBody：密度越大越细密，锐度越大越分明。
        float streaks = pow(
          0.5 + 0.5 * sin(vWorld.x * uStreakFrequency + warp * 5.0 + vSeed * 3.0),
          uStreakSharpness
        );
        float fineStreaks = pow(
          0.5 + 0.5 * sin(vWorld.x * uFineStreakFrequency + warp * 7.0),
          uFineStreakSharpness
        ) * uFineStreakWeight;
        float flow = clamp(streaks + fineStreaks, 0.0, 1.0);
        float advect = noise(vec2(vWorld.x * 8.0 + vSeed, vLocal.y * 6.0 + time * 2.0));
        flow *= (0.5 + advect * 0.75);

        // 🎛️ 瀑布密度对应 TUNING.waterfallBody：底部质量、云团对比、缝隙黑度、雨丝亮度。
        float volume = (baseMass * uBaseMass + rise * uRiseMass)
          * mix(uCloudLow, uCloudHigh, cloud)
          * mix(uGapDarkness, uStreakBrightness, flow);

        vec2 screenUv = vec2(
          gl_FragCoord.x / uViewport.x,
          1.0 - gl_FragCoord.y / uViewport.y
        );
        float horizontalMask = smoothstep(
          uPlotBounds.x,
          uPlotBounds.x + uPlotFeather.x,
          screenUv.x
        ) * (1.0 - smoothstep(
          uPlotBounds.y - uPlotFeather.x,
          uPlotBounds.y,
          screenUv.x
        ));
        horizontalMask = mix(1.0, horizontalMask, uPlotClip);
        float lowerMask = 1.0 - smoothstep(
          uPlotBounds.w - uPlotFeather.z,
          uPlotBounds.w,
          screenUv.y
        );
        lowerMask = mix(1.0, lowerMask, uPlotClip);

        // Feather the bottom edge to black so the noisy geometry base never reads
        // as a lit "wave" silhouette near the waterline — it dissolves into the dark.
        // 🎛️ 瀑布底边对应 TUNING.waterfallBody.bottomFeather。
        float bottomFeather = smoothstep(0.0, max(0.0001, uBottomFeather), vLocal.y);
        float intensity = volume * edge * topFade * vStorm * horizontalMask * lowerMask * bottomFeather;
        if (intensity < 0.002) discard;

        // Moving black/silver reflection bands turn the procedural volume into
        // a mercury sheet. Normal alpha blending is used below so the dark
        // chrome cavities remain visible instead of disappearing additively.
        float reflectionSweep = 0.5 + 0.5 * sin(
          vWorld.x * uBodyBandDensity
          + warp * 5.4
          - vLocal.y * 2.1
          - time * uBodyBandSpeed
        );
        float mirrorBand = smoothstep(0.46, 0.9, reflectionSweep + flow * 0.18);
        float cavityBand = smoothstep(0.6, 0.96, 1.0 - reflectionSweep + (1.0 - cloud) * 0.14);
        vec3 color = mix(uDeep, uMid, clamp(cloud * 0.5 + volume * 0.16, 0.0, 1.0));
        color = mix(color, uBright, clamp(
          mirrorBand * uBodyMirrorStrength + flow * 0.3 + baseMass * 0.08,
          0.0,
          1.0
        ));
        color = mix(color, uDeep, cavityBand * 0.72);
        float metalAlpha = clamp(1.0 - exp(-intensity * uOpacity * 0.72), 0.0, 0.92);
        gl_FragColor = vec4(color, metalAlpha);
      }
    `,transparent:!0,depthWrite:!1,depthTest:!0,side:tn,blending:hn})}function Lv(i,e){const t=new V0,n=14,r=(n+1)*2,a=new Float32Array(r*3),s=new Float32Array(r*2),o=new Uint16Array(n*6);let c=0,l=0;for(let O=0;O<=n;O+=1){const z=O/n;for(let G=0;G<2;G+=1){const Y=c*3,H=c*2;a[Y]=G===0?-.5:.5,a[Y+1]=z,a[Y+2]=0,s[H]=G,s[H+1]=z,c+=1}}for(let O=0;O<n;O+=1){const z=O*2,G=z+1,Y=z+2,H=z+3;o[l++]=z,o[l++]=G,o[l++]=Y,o[l++]=Y,o[l++]=G,o[l++]=H}t.setAttribute("position",new Ne(a,3)),t.setAttribute("uv",new Ne(s,2)),t.setIndex(new Ne(o,1));const d=new Float32Array(i*3),h=new Float32Array(i*2),f=new Float32Array(i*4),m=new Float32Array(i*2),g=new Float32Array(i),_=new Float32Array(i*3),p=new Float32Array(i),u=Ni(Fn^1850919347),E=Qu(u),S=Math.round(i*.06),A=S,D=e.downpourCount>0?Math.round(i*.24):0,R=Math.round(i*.6);let T=0,I=0,b=0,M=0;for(let O=0;O<i;O+=1){const z=O<A,G=!z&&O<A+D,Y=!z&&!G&&O<A+D+R,H=!z&&!G&&!Y;p[O]=G?0:Y?1:H?2:3;let ne=18,k=0;const de=O*3,ve=O*2,pe=O*4,Ue=O*2,Ge=O*3;if(G){const $=e.baseCount+e.ambientCount+Math.floor(u()*e.downpourCount);ne=e.hour[$],k=e.stormWeight[$];const L=e.waterfallTop[$],Z=Math.max(et,L-W(1.15,1.95,u)),j=e.near[$];d[de]=e.baseX[$]+W(-.018,.018,u),d[de+1]=Z,d[de+2]=e.z[$],h[ve]=W(.008,.028,u)*(.84+j*.26),h[ve+1]=W(1.35,2.35,u),f[pe]=De(e.speed[$],2.8,6.4),f[pe+1]=W(.006,.025,u),f[pe+2]=e.phase[$],f[pe+3]=W(.26,.56,u),m[Ue]=W(6.5,13,u),m[Ue+1]=W(.34,.58,u),_[Ge]=e.windSpeed[$],_[Ge+1]=e.driftX[$],_[Ge+2]=e.driftZ[$],T+=1}else{for(let C=0;C<14&&(ne=E(),k=Gi(ne),!(k>.08&&u()<Math.pow(k,.58)));C+=1);const $=u(),L=Y&&u()<.34,Z=Math.max(et,et+(z?W(-.02,.16,u):H?W(-.08,.18,u):L?W(.18,.72,u):W(-.12,.2,u))),j=Math.max(.55,Us(ne)-Z),_e=z?W(.018,.044,u):H?W(.036,.082,u):u()<.82?W(.007,.022,u):W(.022,.042,u),le=u(),Ie=H?W(2.6,4.2,u):le<.28?W(3,4,u):le<.68?W(4,5.4,u):W(5.4,7,u);d[de]=Lt(ne)+W(-.08,.08,u),d[de+1]=Z,d[de+2]=eo(z?W(.7,1,u):$,u),h[ve]=_e,h[ve+1]=j*(Y?L?W(.34,.66,u):W(.72,1.1,u):H?W(.5,.92,u):W(.68,1.02,u)),f[pe]=Ie,f[pe+1]=W(.006,H?.045:.034,u)*(.78+$*.36),f[pe+2]=u()*Math.PI*2,f[pe+3]=z?W(.54,.92,u):Y?W(.48,.9,u)*(.82+$*.26):H?W(.34,.64,u):W(.3,.56,u),m[Ue]=Y?W(4,9.4,u):H?W(2.6,6.8,u):W(4.8,10,u),m[Ue+1]=Y?W(.22,.46,u):H?W(.18,.42,u):W(.28,.52,u),_[Ge]=W(.12,.42,u),_[Ge+1]=W(.0015,H?.007:.0055,u),_[Ge+2]=W(.0015,H?.006:.0045,u),z?M+=1:Y?I+=1:H&&(b+=1)}g[O]=k}t.setAttribute("aAnchor",new Ri(d,3)),t.setAttribute("aDimensions",new Ri(h,2)),t.setAttribute("aFlow",new Ri(f,4)),t.setAttribute("aBreaks",new Ri(m,2)),t.setAttribute("aStorm",new Ri(g,1)),t.setAttribute("aDrift",new Ri(_,3)),t.setAttribute("aFilamentClass",new Ri(p,1)),t.instanceCount=i;const P=t.clone();return P.instanceCount=S,{geometry:t,highlightGeometry:P,highlightCount:S,bridgeCount:T,coreCount:I,lowerCount:b,wideCount:b,foregroundCount:M,ribbonSegments:n}}function Bc(i){return new Dt({uniforms:{uTime:{value:0},uMotion:{value:zi?0:1},uDeep:{value:new Re(oe.metalRain.darkColor)},uMid:{value:new Re(oe.metalRain.midColor)},uBright:{value:new Re(oe.metalRain.brightColor)},uFilamentBandDensity:{value:oe.metalRain.filamentBandDensity},uFilamentBandSpeed:{value:oe.metalRain.filamentBandSpeed},uFilamentMirrorStrength:{value:i?oe.metalRain.highlightMirrorStrength:oe.metalRain.filamentMirrorStrength},uEdgeWidth:{value:i?oe.waterfallFilaments.highlightEdgeWidth:oe.waterfallFilaments.edgeWidth},uOpacity:{value:i?oe.waterfallFilaments.highlightOpacity:oe.waterfallFilaments.opacity},uBottomMistOpacity:{value:oe.waterfallFilaments.bottomMistOpacity},uViewport:{value:Ar},uPlotBounds:{value:Er},uPlotFeather:{value:wr},uPlotClip:Ja},vertexShader:`
      uniform float uTime;
      uniform float uMotion;
      attribute vec3 aAnchor;
      attribute vec2 aDimensions;
      attribute vec4 aFlow;
      attribute vec2 aBreaks;
      attribute float aStorm;
      attribute vec3 aDrift;
      attribute float aFilamentClass;
      varying vec2 vUv;
      varying vec4 vFlow;
      varying vec2 vBreaks;
      varying float vStorm;
      varying float vFogDepth;
      varying float vFilamentClass;
      varying float vTurbulence;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = i.x + i.y * 57.0;
        return mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
      }
      float fbm(vec2 p) {
        float value = noise(p) * 0.55;
        p = p * 2.03 + vec2(7.1, 11.3);
        value += noise(p) * 0.29;
        p = p * 2.11 + vec2(13.9, 5.7);
        value += noise(p) * 0.16;
        return value;
      }

      void main() {
        float time = uTime * uMotion;
        float localY = position.y;
        float bridgeClass = 1.0 - smoothstep(0.05, 0.95, abs(aFilamentClass - 0.0));
        float coreClass = 1.0 - smoothstep(0.05, 0.95, abs(aFilamentClass - 1.0));
        float wideClass = 1.0 - smoothstep(0.05, 0.95, abs(aFilamentClass - 2.0));
        float foregroundClass = 1.0 - smoothstep(0.05, 0.95, abs(aFilamentClass - 3.0));
        vec3 center = aAnchor;
        center.x += sin(time * aDrift.x + aFlow.z) * aDrift.y;
        center.z += cos(time * aDrift.x * 0.72 + aFlow.z * 0.7) * aDrift.z;
        center.y += localY * aDimensions.y;
        float fallTime = time * (0.22 + aFlow.x * 0.075);
        float localWarp = fbm(vec2(localY * 3.2 + aFlow.z * 0.43, fallTime * 0.55 + aAnchor.x * 0.18));
        float curl = fbm(vec2(
          localY * (6.0 + wideClass * 1.2) + localWarp * 1.1,
          aFlow.z * 0.77 - fallTime * 0.9
        )) * 2.0 - 1.0;
        float branch = sin(localY * (12.0 + wideClass * 2.0) + aFlow.z + fallTime * 1.45) * 0.45;
        branch += sin(localY * 31.0 - aFlow.z * 1.9 - fallTime * 2.15) * 0.16;
        branch += curl * (0.18 + foregroundClass * 0.08);
        float bendEnvelope = smoothstep(0.02, 0.22, localY)
          * (0.16 + localY * 0.48)
          * (1.0 - bridgeClass * 0.18);
        center.x += branch * aFlow.y * bendEnvelope * (0.42 + wideClass * 0.18 + foregroundClass * 0.12);
        center.z += curl * aFlow.y * (0.045 + wideClass * 0.04) * smoothstep(0.08, 0.74, localY);
        vec4 mvPosition = modelViewMatrix * vec4(center, 1.0);
        float pinch = fbm(vec2(localY * 9.0 + aFlow.z, fallTime * 0.92));
        float widthPulse = 0.7
          + pinch * 0.28
          + sin(localY * 18.0 + aFlow.z * 1.7) * 0.07;
        widthPulse *= mix(0.94, 1.18, wideClass);
        widthPulse *= mix(1.0, 1.08, foregroundClass);
        mvPosition.x += position.x * aDimensions.x * widthPulse;
        vUv = uv;
        vFlow = aFlow;
        vBreaks = aBreaks;
        vStorm = aStorm;
        vFogDepth = -mvPosition.z;
        vFilamentClass = aFilamentClass;
        vTurbulence = clamp(localWarp * 0.5 + abs(curl) * 0.26 + pinch * 0.24, 0.0, 1.08);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      precision highp float;
      uniform float uTime;
      uniform float uMotion;
      uniform vec3 uDeep;
      uniform vec3 uMid;
      uniform vec3 uBright;
      uniform float uFilamentBandDensity;
      uniform float uFilamentBandSpeed;
      uniform float uFilamentMirrorStrength;
      uniform float uEdgeWidth;
      uniform float uOpacity;
      uniform float uBottomMistOpacity;
      uniform vec2 uViewport;
      uniform vec4 uPlotBounds;
      uniform vec3 uPlotFeather;
      uniform float uPlotClip;
      varying vec2 vUv;
      varying vec4 vFlow;
      varying vec2 vBreaks;
      varying float vStorm;
      varying float vFogDepth;
      varying float vFilamentClass;
      varying float vTurbulence;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = i.x + i.y * 57.0;
        return mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
      }

      void main() {
        float time = uTime * uMotion;
        float centerDistance = abs(vUv.x - 0.5) * 2.0;
        float bridgeClass = 1.0 - smoothstep(0.05, 0.95, abs(vFilamentClass - 0.0));
        float coreClass = 1.0 - smoothstep(0.05, 0.95, abs(vFilamentClass - 1.0));
        float wideClass = 1.0 - smoothstep(0.05, 0.95, abs(vFilamentClass - 2.0));
        float foregroundClass = 1.0 - smoothstep(0.05, 0.95, abs(vFilamentClass - 3.0));
        float raggedEdge = noise(vec2(vFlow.z * 4.1 + vUv.y * 8.2, time * 0.22 + vUv.x * 2.3));
        // 🎛️ 瀑布雨丝宽度对应 TUNING.waterfallFilaments。
        float edgeWidth = uEdgeWidth
          + wideClass * 0.1
          + foregroundClass * 0.05;
        float core = 1.0 - smoothstep(${i?"0.04":"0.08"}, edgeWidth, centerDistance + (raggedEdge - 0.5) * 0.18);
        float endVariation = noise(vec2(vFlow.z, vBreaks.x));
        float bottomFade = smoothstep(0.0, 0.04 + endVariation * 0.075, vUv.y);
        float topFade = 1.0 - smoothstep(0.8 + endVariation * 0.12, 1.0, vUv.y);
        float advectedY = vUv.y * vBreaks.x + time * vFlow.x;
        ${i?`
        float fastPulse = 0.5 + 0.5 * sin(advectedY * 2.95 + vFlow.z * 6.1);
        float secondaryPulse = 0.5 + 0.5 * sin(advectedY * 1.22 - vFlow.z * 3.7);
        float streamNoise = fastPulse * 0.68 + noise(vec2(vFlow.z * 9.0 + vUv.x * 2.0, advectedY * 0.5)) * 0.32;
        float continuity = smoothstep(0.44, 0.82, fastPulse + secondaryPulse * 0.16 + vTurbulence * 0.1);
        `:`
        float domainWarp = noise(vec2(vFlow.z * 2.3, advectedY * 0.26));
        float streamNoise = noise(vec2(vFlow.z * 7.1 + domainWarp * 1.2 + vUv.x * 1.2, advectedY));
        float fineBreak = 0.5 + 0.5 * sin(advectedY * 2.65 + vFlow.z * 5.7 + domainWarp * 2.2);
        float secondaryBreak = noise(vec2(vFlow.z * 13.0 - vUv.x * 1.4, advectedY * 0.62 + domainWarp));
        float continuity = smoothstep(
          vBreaks.y - 0.18,
          vBreaks.y + 0.18,
          streamNoise * 0.52 + fineBreak * 0.3 + secondaryBreak * 0.18 + vTurbulence * 0.08
        );
        `}
        continuity = mix(continuity, 0.58 + continuity * 0.42, coreClass);
        continuity = mix(continuity, 0.38 + continuity * 0.62, wideClass);
        float verticalInk = smoothstep(
          0.46,
          0.92,
          noise(vec2(vFlow.z * 21.0 + vUv.x * 1.2, advectedY * 0.2))
        );
        float darkCut = smoothstep(
          0.5,
          0.9,
          noise(vec2(vFlow.z * 5.8 - vUv.x * 1.1, advectedY * 0.13 + 8.0))
        );
        float columnVoid = smoothstep(
          0.5,
          0.88,
          noise(vec2(vFlow.z * 3.6 + vUv.x * 0.7, floor(vUv.y * 7.0) * 0.37 + time * 0.08))
        );
        float columnFlicker = 0.72 + noise(vec2(vFlow.z * 11.0, vUv.y * 3.0 - time * 0.3)) * 0.48;
        float bottomMist = (1.0 - smoothstep(0.0, 0.22, vUv.y))
          * smoothstep(0.18, 0.72, streamNoise + vTurbulence * 0.2)
          * ${i?"0.0":"1.0"};
        float filament = core * bottomFade * topFade * continuity;
        float fogFactor = 1.0 - exp(-0.00046 * vFogDepth * vFogDepth);
        vec2 screenUv = vec2(
          gl_FragCoord.x / uViewport.x,
          1.0 - gl_FragCoord.y / uViewport.y
        );
        float horizontalMask = smoothstep(
          uPlotBounds.x,
          uPlotBounds.x + uPlotFeather.x,
          screenUv.x
        ) * (1.0 - smoothstep(
          uPlotBounds.y - uPlotFeather.x,
          uPlotBounds.y,
          screenUv.x
        ));
        horizontalMask = mix(1.0, horizontalMask, uPlotClip);
        float lowerMask = 1.0 - smoothstep(
          uPlotBounds.w - uPlotFeather.z,
          uPlotBounds.w,
          screenUv.y
        );
        lowerMask = mix(1.0, lowerMask, uPlotClip);
        float classOpacity = 0.66
          + bridgeClass * 0.0
          + coreClass * 0.78
          + wideClass * 0.34
          + foregroundClass * 0.22;
        // 🎛️ 瀑布雨丝透明度对应 TUNING.waterfallFilaments。
        float alpha = (filament + bottomMist * uBottomMistOpacity)
          * vFlow.w
          * vStorm
          * classOpacity
          * uOpacity
          * (1.0 - fogFactor * 0.44) * horizontalMask * lowerMask;
        alpha *= columnFlicker;
        alpha *= mix(1.0, 0.6, darkCut * (1.0 - foregroundClass * 0.35));
        alpha *= mix(1.0, 0.56, columnVoid * (1.0 - bottomMist * 0.45) * (1.0 - foregroundClass * 0.35));
        float mercuryWave = 0.5 + 0.5 * sin(
          advectedY * uFilamentBandDensity
          + vFlow.z * 5.8
          + centerDistance * 2.6
          - time * uFilamentBandSpeed
        );
        float mercuryMirror = smoothstep(0.46, 0.88, mercuryWave + streamNoise * 0.18);
        vec3 color = mix(uDeep, uMid, 0.28 + streamNoise * 0.32 + bottomMist * 0.12);
        color = mix(color, uBright, clamp(
          mercuryMirror * uFilamentMirrorStrength
          + ${i?"0.28":"core * 0.12 + verticalInk * 0.16"},
          0.0,
          1.0
        ));
        color = mix(color, uDeep, (darkCut * 0.48 + columnVoid * 0.28) * (1.0 - foregroundClass * 0.35));
        if (alpha < 0.001) discard;
        gl_FragColor = vec4(color, alpha);
      }
    `,transparent:!0,depthWrite:!1,depthTest:!0,side:tn,blending:i?vr:hn})}function Ku(i){const e=new Float32Array(i*3),t=new Float32Array(i*3),n=new Float32Array(i*3),r=new Float32Array(i),a=new Float32Array(i),s=new Float32Array(i),o=new Float32Array(i),c=new Float32Array(i),l=new Float32Array(i),d=new Float32Array(i),h=new Float32Array(i),f=new Float32Array(i),m=new Float32Array(i),g=Ni(tv),_=Ds(.36,1.02,g);for(let u=0;u<i;u+=1){const E=_(),S=gr(E),A=Ii(E),D=u*3,R=.34+S*.52,T=Lt(E)+W(-R,R,g),I=g()<.62?W(.35,_i.frontZ*1.72,g):eo(.54,g);e[D]=T,e[D+1]=et+W(.018,.06,g),e[D+2]=I,t.set(e.subarray(D,D+3),D),c[u]=E,l[u]=S,d[u]=A,h[u]=Gi(E),f[u]=g()*Math.PI*2,m[u]=W(.018,.052,g),a[u]=W(.08,.32,g)*(.32+Math.pow(S,.7)*1.25)*A,r[u]=a[u]*(.1+h[u]*.7),s[u]=W(.7,2.6,g)*(.74+S*.3),o[u]=g()<.42?W(2.4,5.4,g):W(1.18,2.3,g),Gv(n,D,S,W(.36,.86,g),g)}return{points:Ju({positions:e,colors:n,alphas:r,sizes:s,aspects:o,horizontal:1,opacity:oe.glint.opacity,maxSize:oe.glint.maxSize,renderOrder:5}),data:{positions:e,original:t,alphas:r,baseAlpha:a,hour:c,strength:l,presence:d,storm:h,shimmer:f,speed:m,count:i}}}function Ps(i,e,t){const n=i.data;for(let r=0;r<n.count;r+=1){const a=r*3,s=_s(n.hour[r],n.positions[a],n.positions[a+2]);n.positions[a]=n.original[a]+Math.sin(e*.34+n.shimmer[r])*.018,n.positions[a+2]+=n.speed[r]*t,n.positions[a+2]>_i.frontZ*1.74&&(n.positions[a+2]=W(-10.4*.55,-10.4*.16)),n.positions[a+1]=et+.026+Math.sin(e*1.35+n.shimmer[r])*.006;const o=.78+Math.sin(e*2.1+n.shimmer[r])*.18;n.alphas[r]=De(n.baseAlpha[r]*(.1+n.storm[r]*.7)*o*(1+s*.52+me.burst*to(n.hour[r],me.selectedHour)*.18),0,oe.glint.alphaMax)}i.points.geometry.attributes.position.needsUpdate=!0,i.points.geometry.attributes.aAlpha.needsUpdate=!0}function ju(i,e,t){const n=Math.floor(i*.55),r=Math.floor(i*.35),a=0,s=zc(n,{horizontal:1,opacity:oe.foam.opacity,maxSize:oe.foam.maxSize,renderOrder:5,blending:vr}),o=zc(r,{horizontal:0,opacity:oe.spray.opacity,maxSize:oe.spray.maxSize,renderOrder:6,blending:hn}),c=Dv(a);return{foam:s.points,droplets:o.points,crowns:c.lines,data:{count:i,foam:s,droplets:o,crowns:c,eventRate:e,rippleRate:t,emissionCredit:e*.2,rippleCredit:t*.2,random:Ni(nv),totalPeakCollisions:0,emittedEvents:0,windowEmitted:0,windowStartedAt:0,currentEmissionRate:0,activeCount:0,activeFoamCount:0,activeDropletCount:0,activeCrownCount:0,staticSeedCount:0}}}function zc(i,{horizontal:e,opacity:t,maxSize:n,renderOrder:r,blending:a}){const s=new Float32Array(i*3),o=new Float32Array(i*3),c=new Float32Array(i),l=new Float32Array(i),d=new Float32Array(i),h=new Float32Array(i),f=new Float32Array(i),m=new Float32Array(i),g=new Uint8Array(i),_=new Float32Array(i),p=new Float32Array(i),u=new Float32Array(i),E=new Float32Array(i),S=new Float32Array(i),A=new Float32Array(i),D=new Float32Array(i),R=new Float32Array(i),T=new Float32Array(i),I=new Float32Array(i),b=new Float32Array(i),M=new Float32Array(i);for(let O=0;O<i;O+=1)s[O*3+1]=-100;return{points:Ju({positions:s,colors:o,alphas:c,sizes:d,aspects:f,horizontal:e,opacity:t,maxSize:n,renderOrder:r,dynamicColor:!0,dynamicShape:!0,blending:a}),count:i,cursor:0,positions:s,colors:o,alphas:c,baseAlpha:l,sizes:d,baseSizes:h,aspects:f,baseAspects:m,active:g,startedAt:_,lifetime:p,originX:u,originZ:E,velocityX:S,velocityY:A,velocityZ:D,gravity:R,phase:T,hour:I,strength:b,near:M}}function Dv(i){const e=new Float32Array(i*6),t=new Float32Array(i*6),n=new Float32Array(i*2),r=new Float32Array(i),a=new Uint8Array(i),s=new Uint8Array(i),o=new Float32Array(i),c=new Float32Array(i),l=new Float32Array(i),d=new Float32Array(i),h=new Float32Array(i),f=new Float32Array(i),m=new Float32Array(i),g=new Float32Array(i),_=new Float32Array(i),p=new Float32Array(i);for(let A=0;A<i;A+=1)e[A*6+1]=-100,e[A*6+4]=-100;const u=new zt;u.setAttribute("position",new Ne(e,3).setUsage(Bt)),u.setAttribute("aColor",new Ne(t,3).setUsage(Bt)),u.setAttribute("aAlpha",new Ne(n,1).setUsage(Bt));const E=new Dt({uniforms:{uFogDensity:{value:ki.fog.density}},vertexShader:`
      attribute vec3 aColor;
      attribute float aAlpha;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vFogDepth;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vColor = aColor;
        vAlpha = aAlpha;
        vFogDepth = -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform float uFogDensity;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vFogDepth;

      void main() {
        float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
        gl_FragColor = vec4(vColor, vAlpha * (1.0 - fogFactor * 0.3));
      }
    `,transparent:!0,depthWrite:!1,blending:vr}),S=new Mu(u,E);return S.renderOrder=8,{lines:S,count:i,cursor:0,positions:e,colors:t,alphas:n,baseAlpha:r,active:a,kind:s,startedAt:o,lifetime:c,originX:l,originZ:d,angle:h,radius:f,height:m,phase:g,hour:_,strength:p}}function Fv(i,e,t){const n=i.data;n.emissionCredit=Math.min(n.eventRate*.34,n.emissionCredit+n.eventRate*t),n.rippleCredit=Math.min(n.rippleRate*.55,n.rippleCredit+n.rippleRate*t);const r=e-n.windowStartedAt;r>=.5&&(n.currentEmissionRate=n.windowEmitted/Math.max(.001,r),n.windowEmitted=0,n.windowStartedAt=e)}function Uv(i,e,t,n,r,a,s,o){i.data;const c=Gi(n);return De(r,0,1)<=0?0:c}function Iv(i,e,t,n,r,a,s,o){const c=i.data;if(c.rippleCredit<1)return;const l=s===xt.DOWNPOUR?1:s===xt.BASE?.48:.28,d=(.012+a*.14)*l;c.random()>d||(c.rippleCredit-=1,Ls(e,t,n,.13+r*.25+a*.24,!1))}function Ju({positions:i,colors:e,alphas:t,sizes:n,aspects:r,orientations:a=null,horizontal:s,opacity:o,maxSize:c,renderOrder:l,dynamicColor:d=!1,dynamicShape:h=!1,blending:f=hn}){const m=i.length/3,g=a??new Float32Array(m).fill(s),_=new zt;_.setAttribute("position",new Ne(i,3).setUsage(Bt)),_.setAttribute("aColor",d?new Ne(e,3).setUsage(Bt):new Ne(e,3)),_.setAttribute("aAlpha",new Ne(t,1).setUsage(Bt)),_.setAttribute("aSize",h?new Ne(n,1).setUsage(Bt):new Ne(n,1)),_.setAttribute("aAspect",h?new Ne(r,1).setUsage(Bt):new Ne(r,1)),_.setAttribute("aHorizontal",h?new Ne(g,1).setUsage(Bt):new Ne(g,1));const p=new Dt({uniforms:{uPixelRatio:{value:ui},uFogDensity:{value:ki.fog.density},uOpacity:{value:o},uMaxSize:{value:c}},vertexShader:`
      uniform float uPixelRatio;
      uniform float uMaxSize;
      attribute vec3 aColor;
      attribute float aAlpha;
      attribute float aSize;
      attribute float aAspect;
      attribute float aHorizontal;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vAspect;
      varying float vHorizontal;
      varying float vFogDepth;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float depthScale = clamp(19.0 / max(5.4, -mvPosition.z), 0.76, 1.98);
        vColor = aColor;
        vAlpha = aAlpha;
        vAspect = aAspect;
        vHorizontal = aHorizontal;
        vFogDepth = -mvPosition.z;
        gl_PointSize = clamp(aSize * uPixelRatio * depthScale, 0.72 * uPixelRatio, uMaxSize * uPixelRatio);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform float uFogDensity;
      uniform float uOpacity;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vAspect;
      varying float vHorizontal;
      varying float vFogDepth;

      void main() {
        vec2 point = gl_PointCoord - vec2(0.5);
        vec2 verticalShape = vec2(point.x * vAspect, point.y);
        vec2 horizontalShape = vec2(point.x / max(1.0, vAspect), point.y);
        vec2 shape = mix(verticalShape, horizontalShape, vHorizontal);
        float distanceToEdge = length(shape);
        float edge = 1.0 - smoothstep(0.38, 0.5, distanceToEdge);
        if (edge < 0.01) discard;

        float core = exp(-dot(shape, shape) * 6.8);
        float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
        vec3 color = vColor * (0.82 + core * 0.48);
        color = mix(color, vec3(0.0, 0.0, 0.0), fogFactor * 0.62);
        gl_FragColor = vec4(color, min(0.74, edge * vAlpha * uOpacity * (1.0 - fogFactor * 0.44)));
      }
    `,transparent:!0,depthWrite:!1,blending:f}),u=new Es(_,p);return u.renderOrder=l,u}function Nv(i){const{resX:e,resZ:t,xMin:n,xMax:r,zMin:a,zMax:s}=Li,o=160,c={type:Qr,format:vn,minFilter:Rt,magFilter:Rt,depthBuffer:!1,stencilBuffer:!1,wrapS:En,wrapT:En};let l=new Zn(e,t,c),d=new Zn(e,t,c);const h=new pu(-1,1,1,-1,0,1),f=i.getRenderTarget();i.setRenderTarget(l),i.clear(),i.setRenderTarget(d),i.clear(),i.setRenderTarget(f);const m=new Dt({uniforms:{uField:{value:null},uTexel:{value:new Ve(1/e,1/t)},uDamping:{value:oe.ripple.damping}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D uField;
      uniform vec2 uTexel;
      uniform float uDamping;
      varying vec2 vUv;
      void main() {
        vec4 info = texture2D(uField, vUv);
        float l = texture2D(uField, vec2(vUv.x - uTexel.x, vUv.y)).r;
        float r = texture2D(uField, vec2(vUv.x + uTexel.x, vUv.y)).r;
        float t = texture2D(uField, vec2(vUv.x, vUv.y + uTexel.y)).r;
        float b = texture2D(uField, vec2(vUv.x, vUv.y - uTexel.y)).r;
        float average = (l + r + t + b) * 0.25;
        info.g += (average - info.r) * 2.0;
        info.g *= uDamping;
        info.r += info.g;
        float edge = smoothstep(0.0, 0.05, vUv.x)
          * smoothstep(0.0, 0.05, vUv.y)
          * smoothstep(0.0, 0.05, 1.0 - vUv.x)
          * smoothstep(0.0, 0.05, 1.0 - vUv.y);
        info.rg *= edge;
        gl_FragColor = info;
      }
    `,depthTest:!1,depthWrite:!1}),g=new cs;g.add(new Tt(new Un(2,2),m));const _=new Float32Array(o*3),p=new Float32Array(o),u=new zt;u.setAttribute("position",new Ne(_,3).setUsage(Bt)),u.setAttribute("aAmp",new Ne(p,1).setUsage(Bt)),u.setDrawRange(0,0);const E=new Dt({uniforms:{uDropPx:{value:Math.max(5,e/210)}},vertexShader:`
      attribute float aAmp;
      uniform float uDropPx;
      varying float vAmp;
      void main() {
        vAmp = aAmp;
        gl_Position = vec4(position.xy, 0.0, 1.0);
        gl_PointSize = uDropPx;
      }
    `,fragmentShader:`
      varying float vAmp;
      void main() {
        vec2 c = (gl_PointCoord - 0.5) * 2.0;
        float d = length(c);
        if (d > 1.0) discard;
        float shape = exp(-d * d * 8.5);
        gl_FragColor = vec4(-shape * vAmp, 0.0, 0.0, 1.0);
      }
    `,transparent:!0,depthTest:!1,depthWrite:!1,blending:Yc,blendEquation:si,blendSrc:ts,blendDst:ts}),S=new cs;return S.add(new Es(u,E)),{rtA:l,rtB:d,simCamera:h,simMaterial:m,simScene:g,dropScene:S,dropGeometry:u,dropMaterial:E,dropPositions:_,dropAmps:p,dropCount:0,maxDrops:o,fieldBounds:{xMin:n,xMax:r,zMin:a,zMax:s},texture:l.texture}}function Ls(i,e,t,n,r,a){if(i.dropCount>=i.maxDrops)return;const s=i.fieldBounds,o=(De(e,s.xMin,s.xMax)-s.xMin)/(s.xMax-s.xMin),c=(De(t,s.zMin,s.zMax)-s.zMin)/(s.zMax-s.zMin),l=i.dropCount;i.dropPositions[l*3]=o*2-1,i.dropPositions[l*3+1]=c*2-1,i.dropPositions[l*3+2]=0,i.dropAmps[l]=(r?oe.ripple.dropClick:oe.ripple.dropRain)*(.6+n),i.dropCount+=1}function Ov(i,e,t){const n=e.getRenderTarget(),r=e.autoClear;i.dropCount>0&&(i.dropGeometry.setDrawRange(0,i.dropCount),i.dropGeometry.attributes.position.needsUpdate=!0,i.dropGeometry.attributes.aAmp.needsUpdate=!0,e.autoClear=!1,e.setRenderTarget(i.rtA),e.render(i.dropScene,i.simCamera),e.autoClear=r),i.simMaterial.uniforms.uField.value=i.rtA.texture,e.setRenderTarget(i.rtB),e.render(i.simScene,i.simCamera);const a=i.rtA;i.rtA=i.rtB,i.rtB=a,i.texture=i.rtA.texture,e.setRenderTarget(n),e.autoClear=r,jn.material.uniforms.uHeightField.value=i.texture,re.dataset.activeRipples=String(i.dropCount),i.dropCount=0}function Bv(i){jn.material.uniforms.uTime.value=zi?0:i}function Ba(i,e,t){var h,f;t||(i.respawnCycle[e]+=1);const n=((h=i.resetSeed)==null?void 0:h[e])||fs,r=((f=i.seedIndex)==null?void 0:f[e])??e,a=i_(n,r,i.respawnCycle[e]),s=i.strength[e],o=i.near[e],c=i.curtainLayer[e],l=Math.max(.8,i.top[e]-et),d=ct(.18,.68,Math.pow(s,.82));if(i.baseX[e]=De(Lt(i.hour[e])+W(-d,d,a),Lt(0)+.12,Lt(24)-.12),i.z[e]=eo(o,a),i.role[e]===xt.AMBIENT){i.headY[e]=dn-.03;return}if(c===1){const m=et+l*W(.3,.44,a);i.headY[e]=W(et+i.length[e]*.72,m+i.length[e]*.4,a);return}if(c===0){i.headY[e]=W(et+i.length[e]*.78,i.top[e]+i.length[e]*.44,a);return}i.headY[e]=t?W(i.top[e]*.72,i.top[e]+i.length[e],a):i.top[e]+i.length[e]+W(.04,1.1,a)}function Qu(i=Math.random){if(!_n.length)return Ds(0,1,i,!0);const e=_n.map(([s,o])=>zv(s,o,i)),t=_n.map(([s,o])=>{let l=0;for(let d=0;d<24;d+=1){const h=ct(s,o,(d+.5)/24);l+=.02+Gi(h)*(.7+Qa(h))}return l*Math.max(.1,o-s)}),n=t.reduce((s,o)=>s+o,0);if(!Number.isFinite(n)||n<=0)return()=>W(.04,23.96,i);const r=[];let a=0;for(const s of t)a+=s/n,r.push(a);return()=>{const s=i(),o=Math.max(0,r.findIndex(c=>s<=c));return e[o]()}}function zv(i,e,t){const r=(e-i)/64,a=Array.from({length:64},(l,d)=>{const h=i+(d+.5)*r,f=Qa(h);return .001+Math.pow(Math.max(.001,f-.2),1.42)*ed(h)}),s=a.reduce((l,d)=>l+d,0);if(!Number.isFinite(s)||s<=0)return()=>W(.04,23.96,t);const o=[];let c=0;for(const l of a)c+=l/s,o.push(c);return()=>{const l=t(),d=Math.max(0,o.findIndex(h=>l<=h));return De(i+(d+t())*r,i,e)}}function Ds(i,e,t=Math.random,n=!1,r=2.35,a=!1){const s=n?96:24,o=24/s,c=Array.from({length:s},(f,m)=>{const g=(m+.5)*o,_=Qa(g),p=Ii(g),u=n?ed(g):1,E=a?kv(g):1,S=.55+Math.max(0,e)*.35,A=Math.pow(_,S),D=i*Math.pow(_,.85);return p*(D+A*r*u)*E}),l=c.reduce((f,m)=>f+m,0);if(!Number.isFinite(l)||l<=0)return()=>W(.04,23.96,t);const d=[];let h=0;for(const f of c)h+=f/l,d.push(h);return()=>{const f=t(),g=Math.max(0,d.findIndex(E=>f<=E))*o;if(n)return De(g+t()*o,.04,23.96);const _=Qa(g),p=ct(.54,.95,Math.pow(_,.62)),u=((t()+t()+t())/3-.5)*2;return De(g+.5+u*p,.04,23.96)}}function kv(i){const t=i>=12?2.3:1.45,n=Math.abs(i/12-1);return De(t*Math.pow(n,t-1),.42,2.3)}function ed(i){const e=Jn(i*.62,Fn),t=Jn(i*2.45,Fn^2135587861);return .68+e*.38+t*.34}function Fs(i){const e=De(i,0,24),t=Math.floor(e),n=Math.min(t+1,Mt.length-1),r=e-t;return ct(Mt[t],Mt[n],r)}function Xr(i,e,t){if(!Array.isArray(i)||!Array.isArray(e)||i.length!==25)return null;const n=De(t,0,24),r=Math.floor(n),a=Math.min(r+1,i.length-1);if(!e[r]||i[r]===null||a!==r&&n!==r&&(!e[a]||i[a]===null))return null;const s=Number(i[r]),o=a===r||i[a]===null?s:Number(i[a]);return!Number.isFinite(s)||!Number.isFinite(o)?null:ct(s,o,n-r)}function td(i){return jt==="live"?tt?Xr(tt.values,tt.availableHours,i):null:Fs(i)}function Ii(i){const e=De(i,0,24),t=Math.floor(e),n=Math.min(t+1,Mt.length-1),r=e-t,a=Mt[t]>0,s=Mt[n]>0;if(!a&&!s)return 0;const o=.68;let c=1;return a||(c*=Vt(0,o,r)),s||(c*=1-Vt(1-o,1,r)),De(c,0,1)}function co(i){return Fs(i)*Ii(i)}function Qa(i){return Jt<=0?0:De(co(i)/Jt,0,1)}function gr(i){return De(co(i)/Za,0,2)}function kc(i){const e=Math.pow(De(i,0,1),.58),t=De(i-1,0,1)*.2;return e+t}function nd(i){const e=De(i/Za,0,1);return e<=0?0:.05+Math.pow(e,.62)*.95}function gs(i){return De(co(i)/Math.max(.001,As),0,1)}function id(){Jt=Mt.reduce((e,t)=>Math.max(e,t),0),Bi=Jt>hs?za(Jt):hs,As=Bi,dn=et+Dr.worldHeight,_n=Vv()}function za(i){if(!Number.isFinite(i)||i<=0)return hs;const t=10**Math.floor(Math.log10(i)),n=i/t,a=(n<=1?1:n<=2?2:n<=5?5:10)*t;return Number.isFinite(a)?a:i}function Hv(){return[0,Bi*.5,Bi]}function vs(i){return Math.abs(i)>=1e6?i.toExponential(1):Math.abs(i)>=1e3?i.toLocaleString("zh-CN",{maximumFractionDigits:1}):Number.isInteger(i)?String(i):String(Number(i.toFixed(1)))}function Vv(){if(Jt<=0)return[];const i=.25,e=[];let t=null;for(let r=0;r<=24+i*.5;r+=i){const a=Math.min(24,r),s=Gi(a)>.08;if(s&&t==null&&(t=Math.max(0,a-i)),(!s||a===24)&&t!=null){const o=s&&a===24?24:Math.min(24,a+i);e.push([t,o]),t=null}}const n=[];for(const r of e){const a=n[n.length-1];a&&r[0]-a[1]<=.5?a[1]=r[1]:n.push([...r])}return n.filter(([r,a])=>a-r>=.5)}function Gi(i){return Vt(5.8,7.8,co(i))}function Us(i){const e=gs(i),t=ct(.91,1.09,Jn(i*1.55,Fn^1374857533)),n=De(.95+Math.pow(e,.92)*5.8*t,1.2,8.8),r=ct(.92,1.08,Jn(i*3.4,Fn^382051033));return et+n*.54*r}function jo(i,e,t){i.stormWeight[e]=Gi(t),i.waterfallTop[e]=Us(t),i.waterfallFeather[e]=ct(1.35,2.05,Jn(t*2.7+e*.013,Fn^1982518513))}function Jo(i=Math.random){const e=i();return e<.38?W(.72,1,i):e<.68?W(.38,.72,i):W(0,.38,i)}function eo(i,e=Math.random){const t=(i-.5)*2;return Vr.center+t*Vr.thickness+W(-.22,Vr.jitter,e)}function _s(i,e,t){const n=me.selectedActive?to(i,me.selectedHour)*.44:0;if(!me.pointerActive)return n;const r=to(i,me.pointerHour),a=1-De(Math.hypot(e-me.pointerWorld.x,(t-me.pointerWorld.z)*.7)/3.2,0,1);return Math.max(n,r*a*.92)}function to(i,e){const t=Math.abs(i-e);return Math.max(0,1-t/2.25)}function Hc(i,e,t,n,r=Math.random){const a=t>.62&&r()<.46?Ot.pearlBright:r()<.68?Ot.pearlMid:Ot.pearlDark,s=n*(.76+t*.28);i[e]=a.r*s,i[e+1]=a.g*s,i[e+2]=a.b*s}function Ia(i,e,t,n,r,a,s=Math.random){const o=r===xt.AMBIENT?.01:a===2?.72:.018,c=s(),l=c<o?Ot.pearlBright:c<o+.68?Ot.pearlMid:Ot.pearlDark,d=n*(.76+t*.28);i[e]=l.r*d,i[e+1]=l.g*d,i[e+2]=l.b*d}function Gv(i,e,t,n,r=Math.random){const a=t>.58&&r()<.34?Ot.waterBright:r()<.7?Ot.waterMid:Ot.waterDark,s=n*(.74+t*.24);i[e]=a.r*s,i[e+1]=a.g*s,i[e+2]=a.b*s}function Lt(i){return(i/24-.5)*Dr.plotWidth}function Wv(i){return De((i/Dr.plotWidth+.5)*24,0,24)}function Xv(i){var e,t;me.pointerDown=!0,me.pointerMoved=!1,me.activePointerId=i.pointerId,(t=(e=Qe.domElement).setPointerCapture)==null||t.call(e,i.pointerId),me.downClient.x=i.clientX,me.downClient.y=i.clientY,me.downView.x=me.view.targetX,me.downView.y=me.view.targetY,Is(i)}function Yv(i){if(Is(i),me.pointerDown){const e=i.clientX-me.downClient.x,t=i.clientY-me.downClient.y;Math.hypot(e,t)>Dr.dragThreshold&&(me.pointerMoved=!0,Vi.classList.add("is-dragged"),Av())}}function qv(i){Is(i),me.pointerMoved||(me.selectedHour=De(Math.round(me.pointerHour),0,24),me.selectedActive=!0,me.burst=1.55,Ls(Jr,me.pointerWorld.x,me.pointerWorld.z,.82,!0,ps.elapsedTime)),ho(i.pointerId),me.pointerDown=!1,me.pointerMoved=!1,lo(),na(!0)}function $v(i){ho(i.pointerId),me.pointerDown=!1,me.pointerMoved=!1,me.pointerActive=!1,Vi.classList.remove("is-pointer-active"),lo()}function uo(){me.pointerActive=!1,Vi.classList.remove("is-pointer-active")}function Zv(){uo()}function Kv(){ho(),me.pointerDown=!1,me.pointerMoved=!1,me.pointerActive=!1,Vi.classList.remove("is-pointer-active"),lo()}function ho(i=me.activePointerId){var e,t;i!=null&&((t=(e=Qe.domElement).hasPointerCapture)!=null&&t.call(e,i)&&Qe.domElement.releasePointerCapture(i),me.activePointerId=null)}function Is(i){const e=Qe.domElement.getBoundingClientRect(),t=(i.clientX-e.left)/e.width,n=(i.clientY-e.top)/e.height;me.pointerClient.x=i.clientX,me.pointerClient.y=i.clientY,me.pointerNdc.set(t*2-1,-(n*2-1)),Ko.setFromCamera(me.pointerNdc,en),Ko.ray.intersectPlane(_v,me.pointerWorld);const r=Ko.ray.intersectPlane(xv,cr),a=Lt(0),s=Lt(24),o=et-.18,c=dn,l=!!r&&cr.x>=a&&cr.x<=s&&cr.y>=o&&cr.y<=c;r&&(me.pointerHour=Wv(cr.x)),me.pointerActive=l,Vi.classList.toggle("is-pointer-active",l)}function jv(){ho(),me.pointerDown=!1,me.pointerMoved=!1,fo(),me.selectedHour=18,me.selectedActive=!0,me.burst=.7,Vi.classList.remove("is-dragged"),lo(!0),na(!0)}function Jv(i){ft&&ft.update()}function Qv(){return window.innerWidth<760?"mobile":window.innerWidth<1100||window.innerWidth/window.innerHeight<1.72?"tablet":"desktop"}function e_(i,e,t,n,r,a){if(!i||i.isEmpty()||!Number.isFinite(r)||r<=0)return null;const s=1-De(a,0,.2)*2,o=Math.tan(vi.degToRad(n*.5)),c=o*r;if(o<=0||c<=0||s<=0)return null;const l=t.clone().cross(en.up);l.lengthSq()<1e-8&&l.set(1,0,0),l.normalize();const d=l.clone().cross(t).normalize(),h=[];let f=0;for(const m of[i.min.x,i.max.x])for(const g of[i.min.y,i.max.y])for(const _ of[i.min.z,i.max.z]){const p=new N(m,g,_).sub(e),u=p.dot(l),E=p.dot(d),S=p.dot(t);h.push({horizontal:u,vertical:E,depthOffset:S}),f=Math.max(f,Math.abs(u)/(c*s)-S,Math.abs(E)/(o*s)-S,en.near+.05-S)}return{requiredDistance:f,samples:h,tanHorizontal:c,tanVertical:o,viewportLimit:s}}function t_(i,e){if(!i)return{horizontal:0,vertical:0};let t=0,n=0;for(const r of i.samples){const a=Math.max(en.near,e+r.depthOffset);t=Math.max(t,Math.abs(r.horizontal)/(a*i.tanHorizontal)),n=Math.max(n,Math.abs(r.vertical)/(a*i.tanVertical))}return{horizontal:t,vertical:n}}function n_(i){ft&&(ft.minDistance=oe.orbit.minDistance,ft.maxDistance=Math.max(oe.orbit.maxDistance,i*1.25))}function fo(){const i=oe.camera[Qv()],e=new N(i.pos[0],i.pos[1],i.pos[2]);Rn.set(i.target[0],i.target[1]+oe.camera.frameTargetYOffset,i.target[2]),en.fov=i.fov;const t=Rn.clone().sub(e),n=t.length();n<=1e-6?t.set(0,0,-1):t.multiplyScalar(1/n),hr&&qn()&&(Rn.x=0,Rn.y=(hr.min.y+hr.max.y)*.5);const r=e_(hr,Rn,t,en.fov,en.aspect,Ic),a=r&&qn()?r.requiredDistance:Math.max(n,(r==null?void 0:r.requiredDistance)||0);Fa.copy(Rn).addScaledVector(t,-a),en.position.copy(Fa),en.lookAt(Rn),en.updateProjectionMatrix(),ft&&(n_(a),ft.target.copy(Rn),en.position.copy(Fa),ft.update());const s=t_(r,a);re.dataset.cameraFitMode=r?"curated-axis-bounds":"preset-fallback",re.dataset.cameraFitMargin=Ic.toFixed(3),re.dataset.cameraFitDistance=a.toFixed(3),re.dataset.cameraFitRequiredDistance=r?r.requiredDistance.toFixed(3):"unavailable",re.dataset.cameraFitHorizontalUsage=s.horizontal.toFixed(3),re.dataset.cameraFitVerticalUsage=s.vertical.toFixed(3),re.dataset.cameraFitPresetFloor=qn()?"disabled":"preserved";const o=Rn.clone().sub(Fa),c=Math.hypot(o.x,o.z);re.dataset.initialCameraPitchDeg=vi.radToDeg(Math.atan2(o.y,c)).toFixed(3),re.dataset.initialCameraYawDeg=vi.radToDeg(Math.atan2(o.x,-o.z)).toFixed(3),re.dataset.initialCameraView="front-facing"}function na(i=!1){const e=me.pointerActive?me.pointerHour:St.hour;Vi.classList.toggle("is-selected",me.selectedActive);const t=De(Math.round(e),0,24),n=td(e),r=n===null?"--":n.toFixed(1),a=me.pointerActive?`${String(t).padStart(2,"0")}:00`:St.label,s=`${a}-${r}-${me.pointerActive}-${i}`;(s!==me.readoutKey||i)&&(J0.textContent=a,Q0.textContent=r,me.readoutKey=s)}let Qo=0;function es(){var e,t,n,r;ui=Iu(),Qe.setPixelRatio(ui),Qe.setSize(window.innerWidth,window.innerHeight),re.dataset.rendererPixelRatio=ui.toFixed(2);const i=qn()?1:0;(t=(e=at==null?void 0:at.points)==null?void 0:e.material)!=null&&t.uniforms&&(at.points.material.uniforms.uPixelRatio.value=ui,at.points.material.uniforms.uMobileCrisp.value=i),(r=(n=at==null?void 0:at.lines)==null?void 0:n.material)!=null&&r.uniforms&&(at.lines.material.uniforms.uMobileCrisp.value=i),re.dataset.rainEdgeMode=i?"mobile-crisp":"authored",en.aspect=window.innerWidth/window.innerHeight,fo(),Cs(nt),rd()}function Ns(){const i=++Qo;es(),requestAnimationFrame(()=>{i===Qo&&es()}),window.setTimeout(()=>{i===Qo&&es()},240)}function rd(){Er.set(0,1,0,1),wr.set(.002,0,.002),Qe.getDrawingBufferSize(Ar)}function Ni(i){let e=i>>>0;return()=>{e+=1831565813;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function i_(i,e,t){const n=i^Math.imul(e+1,2654435761)^Math.imul(t+1,2246822507);return Ni(n>>>0)}function Jn(i,e){const t=Math.floor(i),n=Vt(0,1,i-t);return ct(Vc(t,e),Vc(t+1,e),n)}function Vc(i,e){let t=Math.imul(i^e,73244475);return t=Math.imul(t^t>>>16,73244475),((t^t>>>16)>>>0)/4294967295}function W(i,e,t=Math.random){return i+t()*(e-i)}function ct(i,e,t){return i+(e-i)*t}function De(i,e,t){return Math.min(t,Math.max(e,i))}function Vt(i,e,t){const n=De((t-i)/(e-i),0,1);return n*n*(3-2*n)}function Di(i){const e=i*10;return Number.isFinite(e)?Math.round(e)/10:i}function r_(){if(!ci||!$t||!Mc||!yc||!Cn)return;const i=$t.querySelector("#rainfall-editor-close"),e=$t.querySelector("#rainfall-restore"),t=$t.querySelector("#rainfall-apply"),n=[],r=[],a="http://www.w3.org/2000/svg",s={width:720,height:280,left:42,right:18,top:24,bottom:258},o=s.width-s.left-s.right,c=s.bottom-s.top;let l=[...Mt],d=Math.max(20,za(Math.max(...l)*1.25)),h=De(Math.round(St.hour),0,24),f=null,m=null,g=null,_=null;const p=(L,Z={})=>{const j=document.createElementNS(a,L);for(const[_e,le]of Object.entries(Z))j.setAttribute(_e,String(le));return j},u=p("defs"),E=p("linearGradient",{id:"rainfall-chart-area-gradient",x1:0,y1:0,x2:0,y2:1});E.append(p("stop",{offset:"0%","stop-color":"#c2cbdb","stop-opacity":.28}),p("stop",{offset:"100%","stop-color":"#687a96","stop-opacity":.015})),u.appendChild(E);const S=p("g",{"aria-hidden":"true"}),A=p("path",{class:"rainfall-chart-area"}),D=p("polyline",{class:"rainfall-chart-line"}),R=p("line",{class:"rainfall-chart-current-line","aria-hidden":"true",y1:s.top,y2:s.bottom}),T=p("circle",{class:"rainfall-chart-current-dot","aria-hidden":"true",r:5}),I=p("g");Cn.append(u,S,A,D,R,T,I);for(let L=0;L<Wn.length;L+=1){const Z=p("g",{class:"rainfall-chart-point","data-hour":L,tabindex:0,role:"slider","aria-orientation":"vertical","aria-valuemin":0});Z.append(p("circle",{class:"rainfall-chart-handle-halo",r:13}),p("circle",{class:"rainfall-chart-handle",r:4.2}),p("circle",{class:"rainfall-chart-hit",r:14})),I.appendChild(Z),r.push(Z)}for(let L=0;L<Wn.length;L+=1){const Z=document.createElement("label");Z.className="rainfall-hour-field",Z.htmlFor=`rainfall-hour-${L}`;const j=document.createElement("span");j.className="rainfall-hour-label",j.textContent=`${String(L).padStart(2,"0")}:00`;const _e=document.createElement("span");_e.className="rainfall-input-shell";const le=document.createElement("input");le.id=`rainfall-hour-${L}`,le.className="rainfall-hour-input",le.type="number",le.name="rainfall-hour",le.dataset.hour=String(L),le.min="0",le.step="0.1",le.inputMode="decimal",le.required=!0,le.setAttribute("aria-label",Xe("rainfallInputAria",{time:`${String(L).padStart(2,"0")}:00`}));const Ie=document.createElement("span");Ie.className="rainfall-input-unit",Ie.setAttribute("aria-hidden","true"),Ie.textContent="mm/h";const C=document.createElement("span");C.id=`rainfall-hour-${L}-error`,C.className="rainfall-field-error",C.hidden=!0,le.setAttribute("aria-describedby",C.id),le.addEventListener("input",()=>{le.removeAttribute("aria-invalid"),C.hidden=!0,C.textContent="",Tn.hidden=!0,Tn.textContent="",Hn.textContent="";const Pe=Number(le.value);le.value.trim()!==""&&Number.isFinite(Pe)&&Pe>=0&&(l[L]=Di(Pe),l[L]>d&&(d=za(l[L]*1.2)),h=L,G(),ne())}),le.addEventListener("change",()=>{const Pe=Number(le.value);le.value.trim()===""||!Number.isFinite(Pe)||Pe<0||(l[L]=Di(Pe),k(!0,Xe("savedHour",{time:`${String(L).padStart(2,"0")}:00`})))}),_e.append(le,Ie),Z.append(j,_e,C),yc.appendChild(Z),n.push(le)}const b=L=>Number(L).toFixed(1),M=(L,Z)=>L.length===Z.length&&L.every((j,_e)=>j===Z[_e]);function P(L=h){h=De(Math.round(L),0,l.length-1),bc&&(bc.textContent=`${String(h).padStart(2,"0")}:00`),Ec&&(Ec.textContent=b(l[h]))}function O(L,Z){const j=s.left+L/(l.length-1)*o,_e=s.bottom-De(Z/Math.max(.1,d),0,1)*c;return{x:j,y:_e}}function z(){S.replaceChildren();for(const L of[0,.5,1]){const Z=s.bottom-L*c;S.appendChild(p("line",{class:"rainfall-chart-grid-line",x1:s.left,x2:s.width-s.right,y1:Z,y2:Z}));const j=p("text",{class:"rainfall-chart-grid-label",x:s.left-9,y:Z+6,"text-anchor":"end"});j.textContent=vs(d*L),S.appendChild(j)}for(const L of[0,6,12,18,24]){const Z=s.left+L/24*o;S.appendChild(p("line",{class:"rainfall-chart-grid-line",x1:Z,x2:Z,y1:s.top,y2:s.bottom}))}}function G(){z();const L=l.map((C,Pe)=>O(Pe,C));D.setAttribute("points",L.map(C=>`${C.x},${C.y}`).join(" ")),A.setAttribute("d",`M ${L[0].x} ${s.bottom} L ${L.map(C=>`${C.x} ${C.y}`).join(" L ")} L ${L.at(-1).x} ${s.bottom} Z`);const Z=De(St.hour,0,24),j=Math.floor(Z),_e=Math.min(24,j+1),le=l[j]+(l[_e]-l[j])*(Z-j),Ie=O(Z,le);R.setAttribute("x1",String(Ie.x)),R.setAttribute("x2",String(Ie.x)),T.setAttribute("cx",String(Ie.x)),T.setAttribute("cy",String(Ie.y)),r.forEach((C,Pe)=>{const Ye=L[Pe];C.setAttribute("transform",`translate(${Ye.x} ${Ye.y})`),C.classList.toggle("is-active",Pe===h),C.setAttribute("aria-label",Xe("chartPointAria",{time:`${String(Pe).padStart(2,"0")}:00`})),C.setAttribute("aria-valuemax",String(d)),C.setAttribute("aria-valuenow",String(l[Pe])),C.setAttribute("aria-valuetext",Xe("rainfallValueText",{value:b(l[Pe])}))}),P()}function Y(L=l){const Z=L.reduce((j,_e)=>Math.max(j,_e),0);d=Math.max(20,za(Z*1.25))}function H(){if(jt==="live")return;const L=l.map(Z=>Di(Number(Z)));M(L,Mt)||Wr(L)}function ne(){g===null&&(g=window.setTimeout(()=>{g=null,H()},90))}function k(L=!0,Z=""){g!==null&&(window.clearTimeout(g),g=null),H(),pe(Mt,!1),Z&&(Hn.textContent=Z)}function de(L,Z,{live:j=!0}={}){const _e=Di(De(Number(Z),0,d));l[L]=_e,h=L,n[L].value=b(_e),G(),j&&ne()}function ve(L){const Z=Cn.getBoundingClientRect(),j=(L.clientY-Z.top)/Math.max(1,Z.height)*s.height,_e=(s.bottom-j)/c;return Di(De(_e,0,1)*d)}function pe(L,Z=!0){Z&&(l=[...L]),n.forEach((j,_e)=>{j.value=b(L[_e]),j.removeAttribute("aria-invalid");const le=document.getElementById(`${j.id}-error`);le&&(le.hidden=!0,le.textContent="")}),Tn.hidden=!0,Tn.textContent="",Z&&(Y(L),G())}function Ue(L){if(L&&jt==="live"){Hn.textContent=Xe("liveEditorDisabled");return}if($t.classList.toggle("is-open",L),$t.setAttribute("aria-hidden",String(!L)),ci.setAttribute("aria-expanded",String(L)),L)_=document.activeElement,$t.removeAttribute("inert"),pe(Mt),Hn.textContent=Xe("editorReady"),requestAnimationFrame(()=>i==null?void 0:i.focus());else{g!==null&&k(!0),$t.setAttribute("inert",""),Hn.textContent="";const Z=_ instanceof HTMLElement?_:ci;requestAnimationFrame(()=>Z.focus())}}Tu=()=>{$t.classList.contains("is-open")&&Ue(!1)};function Ge(){const L=[],Z=[];return n.forEach(j=>{const _e=j.value.trim(),le=Number(_e),Ie=_e===""||!Number.isFinite(le)||le<0,C=document.getElementById(`${j.id}-error`);Ie?(Z.push(j),j.setAttribute("aria-invalid","true"),C&&(C.hidden=!1,C.textContent=Xe(_e===""?"emptyRainfall":"invalidRainfall"))):(j.removeAttribute("aria-invalid"),C&&(C.hidden=!0,C.textContent=""),L.push(Di(le)))}),Z.length?(wc&&(wc.open=!0),Tn.hidden=!1,Tn.textContent=Xe("invalidCount",{count:Z.length}),Z[0].focus(),null):(Tn.hidden=!0,Tn.textContent="",L)}ci.addEventListener("click",()=>Ue(!0)),i==null||i.addEventListener("click",()=>Ue(!1)),document.addEventListener("pointerdown",L=>{if($t.getAttribute("aria-hidden")!=="false")return;const Z=L.target;Z instanceof Node&&($t.contains(Z)||ci.contains(Z)||Ue(!1))},!0),$t.addEventListener("keydown",L=>{if(L.key==="Escape"){L.preventDefault(),Ue(!1);return}}),Cn.addEventListener("pointerdown",L=>{const Z=L.target instanceof Element?L.target.closest(".rainfall-chart-point"):null;Z instanceof SVGElement&&(L.preventDefault(),f=Number(Z.dataset.hour),m=L.pointerId,Cn.setPointerCapture(L.pointerId),de(f,ve(L)))}),Cn.addEventListener("pointermove",L=>{f===null||L.pointerId!==m||(L.preventDefault(),de(f,ve(L)))});const $=L=>{if(f===null||L.pointerId!==m)return;const Z=f;f=null,m=null,k(!0,Xe("savedValue",{time:`${String(Z).padStart(2,"0")}:00`,value:b(l[Z])})),G()};Cn.addEventListener("pointerup",$),Cn.addEventListener("pointercancel",$),Cn.addEventListener("focusin",L=>{const Z=L.target instanceof Element?L.target.closest(".rainfall-chart-point"):null;Z instanceof SVGElement&&(h=Number(Z.dataset.hour),G())}),Cn.addEventListener("keydown",L=>{const Z=L.target instanceof Element?L.target.closest(".rainfall-chart-point"):null;if(!(Z instanceof SVGElement))return;const j=Number(Z.dataset.hour),_e=L.shiftKey?1:.1;let le=null;L.key==="ArrowUp"&&(le=l[j]+_e),L.key==="ArrowDown"&&(le=l[j]-_e),L.key==="Home"&&(le=0),L.key==="End"&&(le=d),le!==null&&(L.preventDefault(),de(j,le,{live:!1}),k(!0,Xe("savedValue",{time:`${String(j).padStart(2,"0")}:00`,value:b(l[j])})))}),Mc.addEventListener("submit",L=>{L.preventDefault();const Z=Ge();if(Z){t.disabled=!0,$t.dataset.applying="true",Hn.textContent=Xe("applying");try{l=[...Z],Wr(Z),pe(Mt),Hn.textContent=Xe("applied",{count:Wn.length,maximum:vs(Jt)})}catch(j){Tn.hidden=!1,Tn.textContent=j instanceof Error?j.message:Xe("applyFailed"),Hn.textContent=""}finally{t.disabled=!1,$t.dataset.applying="false"}}}),e==null||e.addEventListener("click",()=>{g!==null&&(window.clearTimeout(g),g=null),l=[...Wn],Wr(Wn),pe(Mt),Hn.textContent=Xe("restored")}),pe(Mt),Ou=G,re.dataset.rainfallEditorReady="true",re.dataset.rainfallEditorMode="live-draggable-line-chart"}
