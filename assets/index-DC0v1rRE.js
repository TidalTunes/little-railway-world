const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./earth-world-D_Ee-Icu.js","./mountain-ranges-cudWZBgS.js","./europe-ranges-DSNVL8CA.js","./globe-land-colors-WX1YpEXW.js","./europe-world-D7-Mqaey.js"])))=>i.map(i=>d[i]);
import{$ as e,$n as t,A as n,An as r,At as i,B as a,Bt as o,C as s,Cr as c,Ct as l,Dr as u,Dt as d,Er as f,Et as p,F as m,Fn as h,Ft as g,G as _,Gn as v,Gt as y,H as b,Hn as x,Ht as S,In as C,It as w,J as T,K as E,Kn as D,L as O,Ln as ee,Lt as k,M as A,Mn as te,Mt as ne,N as re,Nt as j,On as M,Or as N,Ot as ie,P,Pn as ae,Pt as F,Q as oe,Qn as I,Qt as se,R as ce,Rt as le,S as ue,Sr as L,St as de,T as fe,Tr as pe,Tt as me,U as he,Un as ge,Ut as _e,V as ve,Vt as ye,W as be,Wn as R,Wt as z,X as xe,Xn as Se,Y as Ce,Yn as we,Z as Te,Zn as Ee,Zt as B,_ as De,_r as Oe,_t as ke,a as V,at as Ae,b as je,br as H,bt as U,c as Me,cr as Ne,ct as Pe,d as Fe,dr as Ie,dt as Le,er as Re,et as ze,f as Be,fr as W,ft as Ve,g as G,gr as He,gt as Ue,h as We,hr as Ge,ht as Ke,i as qe,ir as Je,it as Ye,j as Xe,jn as Ze,jt as Qe,k as $e,kn as et,kr as tt,kt as K,l as nt,lr as rt,lt as it,m as at,mr as ot,mt as st,n as ct,nr as lt,nt as ut,o as q,or as dt,p as ft,pr as J,q as pt,qn as mt,qt as ht,r as gt,rr as _t,rt as vt,st as yt,tr as bt,tt as xt,u as St,ur as Ct,ut as wt,v as Tt,vr as Et,vt as Dt,w as Ot,wr as kt,wt as At,x as jt,xr as Mt,xt as Nt,y as Pt,yr as Ft,yt as It,z as Y,zt as Lt}from"./mountain-ranges-cudWZBgS.js";import{a as Rt,c as zt,d as Bt,i as Vt,l as Ht,o as X,r as Ut,s as Wt,t as Gt,u as Kt}from"./globe-land-colors-WX1YpEXW.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function qt(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Jt(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		return 0.5 / max( gv + gl, EPSILON );
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},Q={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new d},alphaMap:{value:null},alphaMapTransform:{value:new d},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new d}},envmap:{envMap:{value:null},envMapRotation:{value:new d},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new d}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new d}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new d},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new d},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new d},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new d}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new d}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new d}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new d},alphaTest:{value:0},uvTransform:{value:new d}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new d},alphaMap:{value:null},alphaMapTransform:{value:new d},alphaTest:{value:0}}},Yt={basic:{uniforms:f([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:f([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:f([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:f([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:f([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new Y(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:f([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:f([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:f([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:f([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:f([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:f([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new d},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new d}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distance:{uniforms:f([Q.common,Q.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distance_vert,fragmentShader:Z.distance_frag},shadow:{uniforms:f([Q.lights,Q.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};Yt.physical={uniforms:f([Yt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new d},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new d},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new d},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new d},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new d},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new d},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new d},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new d},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new d},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new d},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new d},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new d},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new d}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var Xt={r:0,b:0,g:0},Zt=new ie,Qt=new d;Qt.set(-1,0,0,0,1,0,0,0,1);function $t(e,t,n,r,i,o){let s=new Y(0),c=i===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),r=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?n.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,o),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let i=m(n);i&&i.isCubeTexture?(u===void 0&&(u=new K(new re(1,1,1),new v({name:`BackgroundCubeMaterial`,uniforms:Et(Yt.backgroundCube.uniforms),vertexShader:Yt.backgroundCube.vertexShader,fragmentShader:Yt.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Zt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Qt),u.material.toneMapped=a.getTransfer(i.colorSpace)!==ge,(d!==i||f!==i.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new K(new _e(2,2),new v({name:`BackgroundMaterial`,uniforms:Et(Yt.background.uniforms),vertexShader:Yt.background.vertexShader,fragmentShader:Yt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=a.getTransfer(i.colorSpace)!==ge,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||f!==i.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,r){t.getRGB(Xt,kt(e)),n.buffers.color.setClear(Xt.r,Xt.g,Xt.b,r,o)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g,dispose:y}}function en(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function tn(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function nn(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(N(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&N(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&N(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function rn(e){let t=this,n=null,r=0,i=!1,a=!1,o=new S,s=new d,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var an=class extends He{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new be(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new re(5,5,5),i=new v({name:`CubemapFromEquirect`,uniforms:Et(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new K(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=U),new b(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},on=256,sn=3,cn=20,ln=256,un=16,dn=3,fn=new J,pn=new Y,mn=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new b(1,10,null),this._boxMesh=new K(new re(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=fn}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(pn));let h=new b(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xn(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bn(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(on,L(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?on:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=hn(e,!1,!1),n=Math.log2(e)-sn;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=hn(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=xn()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=bn()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=_n(),this._integrationMaterial=vn());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/un);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-dn)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(ln*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=yn());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function hn(e,t,n){return new an(e,{minFilter:Nt,generateMipmaps:t,type:Pe,colorSpace:l,depthBuffer:n})}function gn(e,t,n){return new v({name:e,uniforms:t,vertexShader:Z.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function _n(){return gn(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ln}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function vn(){return gn(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:un}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function yn(){return gn(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${cn}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function bn(){return gn(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function xn(){return gn(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Sn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new an(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new mn(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new mn(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Cn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&tt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function wn(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?lt:bt)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Tn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function En(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:Mt(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Dn(e,t,n){let r=new WeakMap,i=new ot;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new pt(h,p,m,u);g.type=vt,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new W(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function On(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var kn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function An(e,t,n,i,o,s){let c=new He(t,n,{type:e,depthBuffer:o,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,u=null,d=null,f=new m;f.setAttribute(`position`,new ut([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute(`uv`,new ut([0,2,0,0,2,0],2));let p=new r({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new K(f,p),g=new Lt(-1,1,1,-1,0,1),_=null,v=null,y=!1,b,x=null,S=[],C=!1;this.setSize=function(e,t){c.setSize(e,t),l!==null&&l.setSize(e,t),u!==null&&u.setSize(e,t);for(let n=0;n<S.length;n++){let r=S[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){S=e,C=S.length>0&&S[0].isRenderPass===!0;let t=c.width,n=c.height;S.length>0&&l===null&&(l=new He(t,n,{type:Pe,depthBuffer:!1,stencilBuffer:!1}),u=new He(t,n,{type:Pe,depthBuffer:!1,stencilBuffer:!1}));let r=o===!0&&S.some(e=>e.needsDepthTexture===!0);r!==(c.depthTexture!==null)&&(r===!0&&d===null&&(d=new Te(t,n),s===!0&&(d.format=xe,d.type=dt)),c.dispose(),c.depthTexture=r?d:null,c.resolveDepthBuffer=r,c.storeMultisampledDepthBuffer=r);for(let e=0;e<S.length;e++){let i=S[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(d)}},this.begin=function(e,t){if(y||e.toneMapping===0&&S.length===0)return!1;if(x=t,t!==null){let e=t.width,n=t.height;(c.width!==e||c.height!==n)&&this.setSize(e,n)}return C===!1&&e.setRenderTarget(c),b=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return C},this.end=function(e,t){e.toneMapping=b,y=!0;let n=c,r=l;for(let i=0;i<S.length;i++){let a=S[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===l?u:l))}if(_!==e.outputColorSpace||v!==e.toneMapping){_=e.outputColorSpace,v=e.toneMapping,p.defines={},a.getTransfer(_)===`srgb`&&(p.defines.SRGB_TRANSFER=``);let t=kn[v];t&&(p.defines[t]=``),p.needsUpdate=!0}p.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(x),e.render(h,g),x=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){c.dispose(),l!==null&&l.dispose(),u!==null&&u.dispose(),f.dispose(),p.dispose()}}var jn=new t,Mn=new Te(1,1),Nn=new he(1),Pn=new pt,Fn=new E,In=new be,Ln=[],Rn=[],zn=new Float32Array(16),Bn=new Float32Array(9),Vn=new Float32Array(4);function Hn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ln[i];if(a===void 0&&(a=new Float32Array(i),Ln[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Un(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Wn(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Gn(e,t){let n=Rn[t];n===void 0&&(n=new Int32Array(t),Rn[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Kn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function qn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Un(n,t))return;e.uniform2fv(this.addr,t),Wn(n,t)}}function Jn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Un(n,t))return;e.uniform3fv(this.addr,t),Wn(n,t)}}function Yn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Un(n,t))return;e.uniform4fv(this.addr,t),Wn(n,t)}}function Xn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Un(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Wn(n,t)}else{if(Un(n,r))return;Vn.set(r),e.uniformMatrix2fv(this.addr,!1,Vn),Wn(n,r)}}function Zn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Un(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Wn(n,t)}else{if(Un(n,r))return;Bn.set(r),e.uniformMatrix3fv(this.addr,!1,Bn),Wn(n,r)}}function Qn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Un(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Wn(n,t)}else{if(Un(n,r))return;zn.set(r),e.uniformMatrix4fv(this.addr,!1,zn),Wn(n,r)}}function $n(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function er(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Un(n,t))return;e.uniform2iv(this.addr,t),Wn(n,t)}}function tr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Un(n,t))return;e.uniform3iv(this.addr,t),Wn(n,t)}}function nr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Un(n,t))return;e.uniform4iv(this.addr,t),Wn(n,t)}}function rr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ir(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Un(n,t))return;e.uniform2uiv(this.addr,t),Wn(n,t)}}function ar(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Un(n,t))return;e.uniform3uiv(this.addr,t),Wn(n,t)}}function or(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Un(n,t))return;e.uniform4uiv(this.addr,t),Wn(n,t)}}function sr(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function cr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?sr(Mn):jn,n.setTexture2D(t||a,i)}function lr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Fn,i)}function ur(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?sr(Nn):In,n.setTextureCube(t||a,i)}function dr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Pn,i)}function fr(e){switch(e){case 5126:return Kn;case 35664:return qn;case 35665:return Jn;case 35666:return Yn;case 35674:return Xn;case 35675:return Zn;case 35676:return Qn;case 5124:case 35670:return $n;case 35667:case 35671:return er;case 35668:case 35672:return tr;case 35669:case 35673:return nr;case 5125:return rr;case 36294:return ir;case 36295:return ar;case 36296:return or;case 35678:case 36198:case 36298:case 36306:case 35682:return cr;case 35679:case 36299:case 36307:return lr;case 35680:case 36300:case 36308:case 36293:return ur;case 36289:case 36303:case 36311:case 36292:return dr}}function pr(e,t){e.uniform1fv(this.addr,t)}function mr(e,t){let n=Hn(t,this.size,2);e.uniform2fv(this.addr,n)}function hr(e,t){let n=Hn(t,this.size,3);e.uniform3fv(this.addr,n)}function gr(e,t){let n=Hn(t,this.size,4);e.uniform4fv(this.addr,n)}function _r(e,t){let n=Hn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function vr(e,t){let n=Hn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function yr(e,t){let n=Hn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function br(e,t){e.uniform1iv(this.addr,t)}function xr(e,t){e.uniform2iv(this.addr,t)}function Sr(e,t){e.uniform3iv(this.addr,t)}function Cr(e,t){e.uniform4iv(this.addr,t)}function wr(e,t){e.uniform1uiv(this.addr,t)}function Tr(e,t){e.uniform2uiv(this.addr,t)}function Er(e,t){e.uniform3uiv(this.addr,t)}function Dr(e,t){e.uniform4uiv(this.addr,t)}function Or(e,t,n){let r=this.cache,i=t.length,a=Gn(n,i);Un(r,a)||(e.uniform1iv(this.addr,a),Wn(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?sr(Mn):jn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function kr(e,t,n){let r=this.cache,i=t.length,a=Gn(n,i);Un(r,a)||(e.uniform1iv(this.addr,a),Wn(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Fn,a[e])}function Ar(e,t,n){let r=this.cache,i=t.length,a=Gn(n,i);Un(r,a)||(e.uniform1iv(this.addr,a),Wn(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?sr(Nn):In;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function jr(e,t,n){let r=this.cache,i=t.length,a=Gn(n,i);Un(r,a)||(e.uniform1iv(this.addr,a),Wn(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Pn,a[e])}function Mr(e){switch(e){case 5126:return pr;case 35664:return mr;case 35665:return hr;case 35666:return gr;case 35674:return _r;case 35675:return vr;case 35676:return yr;case 5124:case 35670:return br;case 35667:case 35671:return xr;case 35668:case 35672:return Sr;case 35669:case 35673:return Cr;case 5125:return wr;case 36294:return Tr;case 36295:return Er;case 36296:return Dr;case 35678:case 36198:case 36298:case 36306:case 35682:return Or;case 35679:case 36299:case 36307:return kr;case 35680:case 36300:case 36308:case 36293:return Ar;case 36289:case 36303:case 36311:case 36292:return jr}}var Nr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fr(t.type)}},Pr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Mr(t.type)}},Fr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ir=/(\w+)(\])?(\[|\.)?/g;function Lr(e,t){e.seq.push(t),e.map[t.id]=t}function Rr(e,t,n){let r=e.name,i=r.length;for(Ir.lastIndex=0;;){let a=Ir.exec(r),o=Ir.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Lr(n,l===void 0?new Nr(s,e,t):new Pr(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Fr(s),Lr(n,e)),n=e}}}var zr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Rr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Br(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Vr=37297,Hr=0;function Ur(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Wr=new d;function Gr(e){a._getMatrix(Wr,a.workingColorSpace,e);let t=`mat3( ${Wr.elements.map(e=>e.toFixed(4))} )`;switch(a.getTransfer(e)){case At:return[t,`LinearTransferOETF`];case ge:return[t,`sRGBTransferOETF`];default:return N(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Kr(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ur(e.getShaderSource(t),r)}return i}function qr(e,t){let n=Gr(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Jr={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Yr(e,t){let n=Jr[t];return n===void 0?(N(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Xr=new J;function Zr(){return a.getLuminanceCoefficients(Xr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Xr.x.toFixed(4)}, ${Xr.y.toFixed(4)}, ${Xr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Qr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ti).join(`
`)}function $r(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function ei(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ti(e){return e!==``}function ni(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function ri(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ii=/^[ \t]*#include +<([\w\d./]+)>/gm;function ai(e){return e.replace(ii,oi)}function oi(e,t){let n=Z[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return ai(n)}var si=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ci(e){return e.replace(si,li)}function li(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ui(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var di={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function fi(e){return di[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var pi={302:`ENVMAP_MODE_REFRACTION`};function mi(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:pi[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var hi={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function gi(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:hi[e.combine]||`ENVMAP_BLENDING_NONE`}function _i(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=fi(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=mi(n),d=gi(n),f=Qr(n),p=$r(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(ti).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(ti).join(`
`),g.length>0&&(g+=`
`)):(h=[ui(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ti).join(`
`),g=[ui(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:Yr(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,qr(`linearToOutputTexel`,n.outputColorSpace),Zr(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ti).join(`
`)),o=ai(o),o=ni(o,n),o=ri(o,n),s=ai(s),s=ni(s,n),s=ri(s,n),o=ci(o),s=ci(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Br(i,i.VERTEX_SHADER,v),x=Br(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Kr(i,b,`vertex`),n=Kr(i,x,`fragment`);Mt(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):N(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new zr(i,m),w=ei(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Vr)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Hr++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var vi=0,yi=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new bi(e),t.set(e,n)),n}},bi=class{constructor(e){this.id=vi++,this.code=e,this.usedTimes=0}};function xi(e){return e===1030||e===37490||e===36285}function Si(e,t,n,r,i,o){let s=new Ke,c=new yi,l=new Set,u=[],d=new Map,f=r.logarithmicDepthBuffer,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return l.add(e),e===0?`uv`:`uv${e}`}function h(i,s,u,d,h,g){let _=d.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?d.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=p[i.type],C=r.precision;i.precision!==null&&(C=r.getMaxPrecision(i.precision),C!==i.precision&&N(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,C,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,k;if(S){let e=Yt[S];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=c.getVertexShaderStage(i),t=c.getFragmentShaderStage(i);c.update(i,e,t),ee=e.id,k=t.id}let A=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),ne=h.isInstancedMesh===!0,re=h.isBatchedMesh===!0,j=!!i.map,M=!!i.matcap,ie=!!x,P=ie&&x.isPMREMTexture===!0,ae=!!i.aoMap,F=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,I=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,L=i.anisotropy>0,de=i.clearcoat>0,fe=i.diffuseRoughness>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=L&&!!i.anisotropyMap,ye=de&&!!i.clearcoatMap,be=de&&!!i.clearcoatNormalMap,R=de&&!!i.clearcoatRoughnessMap,z=fe&&!!i.diffuseRoughnessMap,xe=he&&!!i.iridescenceMap,Se=he&&!!i.iridescenceThicknessMap,Ce=ge&&!!i.sheenColorMap,we=ge&&!!i.sheenRoughnessMap,Te=!!i.specularMap,Ee=!!i.specularColorMap,B=!!i.specularIntensityMap,De=_e&&!!i.transmissionMap,Oe=_e&&!!i.thicknessMap,ke=!!i.gradientMap,V=!!i.alphaMap,Ae=i.alphaTest>0,je=!!i.alphaHash,H=!!i.extensions,U=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(U=e.toneMapping);let Me=P?x.isCompressedCubeTexture?x.image[0].mipmaps:x.mipmaps:null,Ne={shaderID:S,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:C,batching:re,batchingColor:re&&h._colorsTexture!==null,instancing:ne,instancingColor:ne&&h.instanceColor!==null,instancingMorph:ne&&h.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:a.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:j,matcap:M,envMap:ie,envMapMode:ie&&x.mapping,envMapPMREM:P,envMapMaxLod:P?Me.length-1:null,envMapSize:P?Me[0].width:null,aoMap:ae,lightMap:F,bumpMap:oe,normalMap:I,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:I&&i.normalMapType===1,normalMapTangentSpace:I&&i.normalMapType===0,packedNormalMap:I&&i.normalMapType===0&&xi(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:L,anisotropyMap:ve,clearcoat:de,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:R,diffuseRoughness:fe,diffuseRoughnessMap:z,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:xe,iridescenceThicknessMap:Se,sheen:ge,sheenColorMap:Ce,sheenRoughnessMap:we,specularMap:Te,specularColorMap:Ee,specularIntensityMap:B,transmission:_e,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:V,alphaTest:Ae,alphaHash:je,combine:i.combine,mapUv:j&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:F&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:I&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:le&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:R&&m(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:z&&m(i.diffuseRoughnessMap.channel),iridescenceMapUv:xe&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(i.sheenRoughnessMap.channel),specularMapUv:Te&&m(i.specularMap.channel),specularColorMapUv:Ee&&m(i.specularColorMap.channel),specularIntensityMapUv:B&&m(i.specularIntensityMap.channel),transmissionMapUv:De&&m(i.transmissionMap.channel),thicknessMapUv:Oe&&m(i.thicknessMap.channel),alphaMapUv:V&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(I||L),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(j||V),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&I===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:s.sun.length,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numSunLightShadows:s.sunShadowMap.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numLightProbeGrids:g.filter(e=>e.texture!==null).length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:U,decodeVideoTexture:j&&i.map.isVideoTexture===!0&&a.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&a.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:H&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(H&&i.extensions.multiDraw===!0||re)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){s.disableAll(),t.instancing&&s.enable(0),t.instancingColor&&s.enable(1),t.instancingMorph&&s.enable(2),t.matcap&&s.enable(3),t.envMap&&s.enable(4),t.normalMapObjectSpace&&s.enable(5),t.normalMapTangentSpace&&s.enable(6),t.clearcoat&&s.enable(7),t.iridescence&&s.enable(8),t.alphaTest&&s.enable(9),t.vertexColors&&s.enable(10),t.vertexAlphas&&s.enable(11),t.vertexUv1s&&s.enable(12),t.vertexUv2s&&s.enable(13),t.vertexUv3s&&s.enable(14),t.vertexTangents&&s.enable(15),t.anisotropy&&s.enable(16),t.alphaHash&&s.enable(17),t.batching&&s.enable(18),t.dispersion&&s.enable(19),t.retroreflection&&s.enable(24),t.diffuseRoughness&&s.enable(25),t.batchingColor&&s.enable(20),t.gradientMap&&s.enable(21),t.packedNormalMap&&s.enable(22),t.vertexNormals&&s.enable(23),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),t.numLightProbeGrids>0&&s.enable(22),t.hasPositionAttribute&&s.enable(23),e.push(s.mask)}function y(e){let t=p[e.type],n;if(t){let e=Yt[t];n=_t.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=d.get(n);return r===void 0?(r=new _i(e,n,t,i),u.push(r),d.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),d.delete(e.cacheKey),e.destroy()}}function S(e){c.remove(e)}function C(){c.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:u,dispose:C}}function Ci(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function wi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ti(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ei(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||wi),r.length>1&&r.sort(t||Ti),i.length>1&&i.sort(t||Ti)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Di(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Ei,e.set(t,[i])):n>=r.length?(i=new Ei,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Oi(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new J,color:new Y};break;case`SpotLight`:n={position:new J,direction:new J,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new J,halfWidth:new J,halfHeight:new J}}return e[t.id]=n,n}}}function ki(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ai=0;function ji(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Mi(e){let t=new Oi,n=ki(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new ie,o=new ie;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ji);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ai++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Ni(e){let t=new Mi(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Pi(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ni(e),t.set(n,[a])):r>=i.length?(a=new Ni(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Fi=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ii=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Li=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],Ri=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],zi=new ie,Bi=new J,Vi=new J;function Hi(e,t,n){let r=new Ye,i=new W,a=new W,o=new ot,s=new Qe,c=new ne,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new v({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:Fi,fragmentShader:Ii}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let h=new m;h.setAttribute(`position`,new P(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new K(h,f),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let b=this.type;this.render=function(t,n,s){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||t.length===0)return;this.type===2&&(N(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=b!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){N(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){N(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new He(i.x,i.y,{format:M,type:Pe,minFilter:U,magFilter:U,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Te(i.x,i.y,vt),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ce,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=g,d.map.depthTexture.magFilter=g}else l.isPointLight?(d.map=new an(i.x),d.map.depthTexture=new he(i.x,Ne)):(d.map=new He(i.x,i.y),d.map.depthTexture=new Te(i.x,i.y,Ne)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ce,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=U,d.map.depthTexture.magFilter=U):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=g,d.map.depthTexture.magFilter=g);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let _=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let v=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<_;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Bi.setFromMatrixPosition(l.matrixWorld),e.position.copy(Bi),Vi.copy(e.position),Vi.add(Li[t]),e.up.copy(Ri[t]),e.lookAt(Vi),e.updateMatrixWorld(),n.makeTranslation(-Bi.x,-Bi.y,-Bi.z),zi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(zi,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),C(n,s,i,l,v,this.type)}d.isPointLightShadow!==!0&&this.type===3&&x(d,s),d.needsUpdate=!1}b=this.type,y.needsUpdate=!1,e.setRenderTarget(c,l,d)};function x(n,r){let a=t.update(_);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new He(i.x,i.y,{format:M,type:Pe}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,_,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,_,null)}function S(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,w)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function C(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=S(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=S(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)C(l[e],i,a,o,s,c)}function w(e){e.target.removeEventListener(`dispose`,w);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Ui(e,t){function n(){let t=!1,n=new ot,r=null,i=new ot(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ce(e.DEPTH_TEST):le(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=C[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ce(e.STENCIL_TEST):le(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,w=null,T=new Y(0,0,0),E=0,D=!1,O=null,ee=null,k=null,A=null,te=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),re=!1,j=0,M=e.getParameter(e.VERSION);M.indexOf(`WebGL`)===-1?M.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(M)[1]),re=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(M)[1]),re=j>=1);let N=null,ie={},P=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),F=new ot().fromArray(P),oe=new ot().fromArray(ae);function I(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=I(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=I(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=I(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=I(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ce(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),ce(e.CULL_FACE),me(0);function ce(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function le(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function L(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(le(e.BLEND),g=!1);else if(g===!1&&(ce(e.BLEND),g=!0),t!==5){if(t!==_||u!==D){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Mt(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:Mt(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:Mt(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:Mt(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,w=null,T.set(0,0,0),E=0,_=t,D=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==w)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),_=t,D=!1}function he(t,n){t.side===2?le(e.CULL_FACE):ce(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ce(e.SAMPLE_ALPHA_TO_COVERAGE):le(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function _e(t){t===0?le(e.CULL_FACE):(ce(e.CULL_FACE),t!==ee&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),ee=t}function ve(t){t!==k&&(re&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(ce(e.POLYGON_OFFSET_FILL),(A!==n||te!==r)&&(A=n,te=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):le(e.POLYGON_OFFSET_FILL)}function be(t){t?ce(e.SCISSOR_TEST):le(e.SCISSOR_TEST)}function R(t){t===void 0&&(t=e.TEXTURE0+ne-1),N!==t&&(e.activeTexture(t),N=t)}function z(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+ne-1:N);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function xe(){let t=ie[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function B(){try{e.compressedTexSubImage3D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function V(){try{e.texImage3D(...arguments)}catch(e){Mt(`WebGLState:`,e)}}function Ae(t){return d[t]===void 0?e.getParameter(t):d[t]}function je(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function H(t){F.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),F.copy(t))}function U(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Me(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Ne(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Pe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,ie={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,w=null,T=new Y(0,0,0),E=0,D=!1,O=null,ee=null,k=null,A=null,te=null,F.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ce,disable:le,bindFramebuffer:ue,drawBuffers:L,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:R,bindTexture:z,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:ke,texImage3D:V,pixelStorei:je,getParameter:Ae,updateUBOMapping:Me,uniformBlockBinding:Ne,texStorage2D:De,texStorage3D:Oe,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:Ee,compressedTexSubImage3D:B,scissor:H,viewport:U,reset:Pe}}function Wi(e,t,n,r,i,o,s){let l=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,u=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),d=new W,f=new WeakMap,p=new Set,m,_=new WeakMap,v=new Set,y=new FinalizationRegistry(e=>v.delete(e)),b=!1;try{b=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function x(e,t){return b?new OffscreenCanvas(e,t):H(`canvas`)}function S(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);m===void 0&&(m=x(n,a));let o=t?x(n,a):m;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),N(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&N(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function C(e){return e.generateMipmaps}function T(t){e.generateMipmap(t)}function E(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function D(n,r,i,o,s,c=!1){if(n!==null){if(e[n]!==void 0)return e[n];N(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let l;o&&(l=t.get(`EXT_texture_norm16`),l||N(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let u=r;if(r===e.RED&&(i===e.FLOAT&&(u=e.R32F),i===e.HALF_FLOAT&&(u=e.R16F),i===e.UNSIGNED_BYTE&&(u=e.R8),i===e.UNSIGNED_SHORT&&l&&(u=l.R16_EXT),i===e.SHORT&&l&&(u=l.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.R8UI),i===e.UNSIGNED_SHORT&&(u=e.R16UI),i===e.UNSIGNED_INT&&(u=e.R32UI),i===e.BYTE&&(u=e.R8I),i===e.SHORT&&(u=e.R16I),i===e.INT&&(u=e.R32I)),r===e.RG&&(i===e.FLOAT&&(u=e.RG32F),i===e.HALF_FLOAT&&(u=e.RG16F),i===e.UNSIGNED_BYTE&&(u=e.RG8),i===e.UNSIGNED_SHORT&&l&&(u=l.RG16_EXT),i===e.SHORT&&l&&(u=l.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RG8UI),i===e.UNSIGNED_SHORT&&(u=e.RG16UI),i===e.UNSIGNED_INT&&(u=e.RG32UI),i===e.BYTE&&(u=e.RG8I),i===e.SHORT&&(u=e.RG16I),i===e.INT&&(u=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RGB8UI),i===e.UNSIGNED_SHORT&&(u=e.RGB16UI),i===e.UNSIGNED_INT&&(u=e.RGB32UI),i===e.BYTE&&(u=e.RGB8I),i===e.SHORT&&(u=e.RGB16I),i===e.INT&&(u=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(u=e.RGBA16UI),i===e.UNSIGNED_INT&&(u=e.RGBA32UI),i===e.BYTE&&(u=e.RGBA8I),i===e.SHORT&&(u=e.RGBA16I),i===e.INT&&(u=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&l&&(u=l.RGB16_EXT),i===e.SHORT&&l&&(u=l.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(u=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(u=e.R11F_G11F_B10F)),r===e.RGBA){let t=c?At:a.getTransfer(s);i===e.FLOAT&&(u=e.RGBA32F),i===e.HALF_FLOAT&&(u=e.RGBA16F),i===e.UNSIGNED_BYTE&&(u=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&l&&(u=l.RGBA16_EXT),i===e.SHORT&&l&&(u=l.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(u=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(u=e.RGB5_A1)}return(u===e.R16F||u===e.R32F||u===e.RG16F||u===e.RG32F||u===e.RGBA16F||u===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),u}function O(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,N(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return C(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(e){let t=new WeakRef(e);r.get(e).__ref=t,v.add(t),y.register(e,t,t)}function te(e){let t=r.get(e).__ref;t!==void 0&&(v.delete(t),y.unregister(t))}function ne(e){j(e.target)}function re(e){M(e.target)}function j(e){e.removeEventListener(`dispose`,ne),te(e),P(e),e.isVideoTexture&&f.delete(e),e.isHTMLTexture&&p.delete(e)}function M(e){e.removeEventListener(`dispose`,re),te(e),oe(e)}function ie(){for(let e of v){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?M(t):j(t))}v.clear(),p.clear()}function P(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=_.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ae(e),Object.keys(i).length===0&&_.delete(n)}r.remove(e)}function ae(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=_.get(i);delete a[n.__cacheKey],s.memory.textures--}function oe(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&j(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),r.remove(a[t])}r.remove(t)}let I=0;function se(){I=0}function le(){return I}function ue(e){I=e}function L(){let e=I;return e>=i.maxTextures&&N(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),I+=1,e}function fe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function pe(t,i){let a=r.get(t);if(t.isVideoTexture&&Pe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)N(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)N(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function he(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ge(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?we(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let _e={[h]:e.REPEAT,[ce]:e.CLAMP_TO_EDGE,[F]:e.MIRRORED_REPEAT},ve={[g]:e.NEAREST,[k]:e.NEAREST_MIPMAP_NEAREST,[w]:e.NEAREST_MIPMAP_LINEAR,[U]:e.LINEAR,[de]:e.LINEAR_MIPMAP_NEAREST,[Nt]:e.LINEAR_MIPMAP_LINEAR},ye={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function be(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&N(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,_e[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,_e[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,_e[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ve[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ve[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ye[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function R(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ne),A(n));let i=n.source,a=_.get(i);a===void 0&&(a={},_.set(i,a));let o=fe(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ae(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function z(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=z(n.start,r.width,4),c=z(t.start,r.width,4);n.start<=i+1&&a===c&&z(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function Ce(t,s,l){let u=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(u=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(u=e.TEXTURE_3D);let d=R(t,s),f=s.source;n.bindTexture(u,t.__webglTexture,e.TEXTURE0+l);let m=r.get(f);if(f.version!==m.__version||d===!0){if(n.activeTexture(e.TEXTURE0+l),!(typeof ImageBitmap<`u`&&s.image instanceof ImageBitmap)){let t=a.getPrimaries(a.workingColorSpace),r=s.colorSpace===``?null:a.getPrimaries(s.colorSpace),i=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let t=S(s.image,!1,i.maxTextureSize);t=Fe(s,t);let r=o.convert(s.format,s.colorSpace),h=o.convert(s.type),g=D(s.internalFormat,r,h,s.normalized,s.colorSpace,s.isVideoTexture);be(u,s);let _,v=s.mipmaps,y=s.isVideoTexture!==!0,b=m.__version===void 0||d===!0,x=f.dataReady,w=ee(s,t);if(s.isDepthTexture)g=O(s.format===xe,s.type),b&&(y?n.texStorage2D(e.TEXTURE_2D,1,g,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,g,t.width,t.height,0,r,h,null));else if(s.isDataTexture){if(v.length>0){y&&b&&n.texStorage2D(e.TEXTURE_2D,w,g,v[0].width,v[0].height);for(let t=0,i=v.length;t<i;t++)_=v[t],y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,r,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,r,h,_.data);s.generateMipmaps=!1}else y?(b&&n.texStorage2D(e.TEXTURE_2D,w,g,t.width,t.height),x&&Se(s,t,r,h)):n.texImage2D(e.TEXTURE_2D,0,g,t.width,t.height,0,r,h,t.data)}else if(s.isCompressedTexture){if(s.isCompressedArrayTexture){y&&b&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,g,v[0].width,v[0].height,t.depth);for(let i=0,a=v.length;i<a;i++)if(_=v[i],s.format!==1023){if(r!==null){if(y){if(x){if(s.layerUpdates.size>0){let t=c(_.width,_.height,s.format,s.type);for(let a of s.layerUpdates){let o=_.data.subarray(a*t/_.data.BYTES_PER_ELEMENT,(a+1)*t/_.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,_.width,_.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,_.width,_.height,t.depth,r,_.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,g,_.width,_.height,t.depth,0,_.data,0,0)}else N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else y?x&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,_.width,_.height,t.depth,r,h,_.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,g,_.width,_.height,t.depth,0,r,h,_.data);s.layerUpdates.size>0&&s.clearLayerUpdates()}else{y&&b&&n.texStorage2D(e.TEXTURE_2D,w,g,v[0].width,v[0].height);for(let t=0,i=v.length;t<i;t++)_=v[t],s.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,r,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,r,h,_.data):r===null?N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,r,_.data):n.compressedTexImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,_.data)}}else if(s.isDataArrayTexture){if(y){if(b&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,g,t.width,t.height,t.depth),x){if(s.layerUpdates.size>0){let i=c(t.width,t.height,s.format,s.type);for(let a of s.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,h,o)}s.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,h,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,g,t.width,t.height,t.depth,0,r,h,t.data)}else if(s.isData3DTexture)y?(b&&n.texStorage3D(e.TEXTURE_3D,w,g,t.width,t.height,t.depth),x&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,h,t.data)):n.texImage3D(e.TEXTURE_3D,0,g,t.width,t.height,t.depth,0,r,h,t.data);else if(s.isFramebufferTexture){if(b){if(y)n.texStorage2D(e.TEXTURE_2D,w,g,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<w;t++)n.texImage2D(e.TEXTURE_2D,t,g,i,a,0,r,h,null),i>>=1,a>>=1}}}else if(s.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),p.add(s),n.onpaint=e=>{let t=e.changedElements;for(let e of p)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(v.length>0){if(y&&b){let t=Ie(v[0]);n.texStorage2D(e.TEXTURE_2D,w,g,t.width,t.height)}for(let t=0,i=v.length;t<i;t++)_=v[t],y?x&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,h,_):n.texImage2D(e.TEXTURE_2D,t,g,r,h,_);s.generateMipmaps=!1}else if(y){if(b){let r=Ie(t);n.texStorage2D(e.TEXTURE_2D,w,g,r.width,r.height)}x&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,h,t)}else n.texImage2D(e.TEXTURE_2D,0,g,r,h,t);C(s)&&s.mipmapsAutoUpdate===!0&&T(u),m.__version=f.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function we(t,s,c){if(s.image.length!==6)return;let l=R(t,s),u=s.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+c);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+c);let t=a.getPrimaries(a.workingColorSpace),r=s.colorSpace===``?null:a.getPrimaries(s.colorSpace),f=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=s.isCompressedTexture||s.image[0].isCompressedTexture,m=s.image[0]&&s.image[0].isDataTexture,h=[];for(let e=0;e<6;e++)!p&&!m?h[e]=S(s.image[e],!0,i.maxCubemapSize):h[e]=m?s.image[e].image:s.image[e],h[e]=Fe(s,h[e]);let g=h[0],_=o.convert(s.format,s.colorSpace),v=o.convert(s.type),y=D(s.internalFormat,_,v,s.normalized,s.colorSpace),b=s.isVideoTexture!==!0,x=d.__version===void 0||l===!0,w=u.dataReady,E=ee(s,g);be(e.TEXTURE_CUBE_MAP,s);let k;if(s.isDepthTexture){if(y=O(s.format===xe,s.type),x){if(b)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,y,g.width,g.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,g.width,g.height,0,_,v,null)}}else if(p){b&&x&&n.texStorage2D(e.TEXTURE_CUBE_MAP,E,y,g.width,g.height);for(let t=0;t<6;t++){k=h[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];s.format===1023?b?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,_,v,i.data):_===null?N(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):b?w&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(k=s.mipmaps,b&&x){k.length>0&&E++;let t=Ie(h[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,E,y,t.width,t.height)}for(let t=0;t<6;t++)if(m){b?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,h[t].width,h[t].height,_,v,h[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h[t].width,h[t].height,0,_,v,h[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;b?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,_,v,i.data)}}else{b?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,v,h[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,_,v,h[t]);for(let r=0;r<k.length;r++){let i=k[r];b?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,_,v,i.image[t])}}}C(s)&&s.mipmapsAutoUpdate===!0&&T(e.TEXTURE_CUBE_MAP),d.__version=u.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function Te(t,i,a,s,c,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=D(a.internalFormat,d,f,a.normalized,a.colorSpace),m=r.get(i),h=r.get(a);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);c===e.TEXTURE_3D||c===e.TEXTURE_2D_ARRAY?n.texImage3D(c,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(c,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ne(i)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,c,h.__webglTexture,0,Me(i)):(c===e.TEXTURE_2D||c>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&c<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,c,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=O(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ne(n)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),c=o.convert(a.type),u=D(a.internalFormat,s,c,a.normalized,a.colorSpace);Ne(n)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function B(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let s=r.get(i.depthTexture);s.__renderTarget=i;let c=o?i.depthTexture.image[0]:i.depthTexture.image;s.__webglTexture&&c.width===i.width&&c.height===i.height||(c.width=i.width,c.height=i.height,i.depthTexture.needsUpdate=!0),o?ge(i.depthTexture,0):pe(i.depthTexture,0);let u=s.__webglTexture,d=Me(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ne(i)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ne(i)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function De(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)B(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?B(i.__webglFramebuffer[0],t,0):B(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ee(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ee(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Oe(t,n,i){let a=r.get(t);n!==void 0&&Te(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&De(t)}function ke(t){let i=t.texture,a=r.get(t),c=r.get(i);t.addEventListener(`dispose`,re),A(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&Ne(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=D(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Me(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),Ee(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),be(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Te(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Te(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);C(i)?T(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,o=l.length;i<o;i++){let o=l[i],s=r.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),be(c,o),Te(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,c,0),C(o)&&T(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),be(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Te(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Te(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);C(i)?T(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&De(t)}function V(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(C(a)&&a.mipmapsAutoUpdate===!0){let t=E(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),T(t),n.unbindTexture()}}}let Ae=[];function je(t){if(t.samples>0){if(Ne(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,l=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,l.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),u===!0&&(Ae.length=0,Ae.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Ae.push(c),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ae))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,l.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&u){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Me(e){return Math.min(i.maxSamples,e.samples)}function Ne(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Pe(e){let t=s.render.frame;f.get(e)!==t&&(f.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(a.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&N(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):Mt(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(d.width=e.naturalWidth||e.width,d.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(d.width=e.displayWidth,d.height=e.displayHeight):(d.width=e.width,d.height=e.height),d}this.allocateTextureUnit=L,this.resetTextureUnits=se,this.getTextureUnits=le,this.setTextureUnits=ue,this.setTexture2D=pe,this.setTexture2DArray=me,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=Oe,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Ne,this.dispose=ie}function Gi(e,t){function n(n,r=``){let i,o=a.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(o===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return o===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return o===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return o===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ki=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qi=`
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

}`,Ji=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new xt(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new v({vertexShader:Ki,fragmentShader:qi,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new K(new _e(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yi=class extends ze{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Ji,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new W,C=null,w=null,T=new ye;T.viewport=new ot;let E=new ye;E.viewport=new ot;let D=[T,E],O=new $e,ee=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Oe,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Oe,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Oe,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}ee=null,k=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,P.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&N(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&N(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?xe:Ce,a=_.stencil?dt:Ne);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new He(d.textureWidth,d.textureHeight,{format:B,type:Je,depthTexture:new Te(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new He(f.framebufferWidth,f.framebufferHeight,{format:B,type:Je,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),P.setContext(r),P.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function re(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(ee!==O.near||k!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),ee=O.near,k=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;re(O,i);for(let e=0;e<a.length;e++)re(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),j(e,O,i)};function j(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ht*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let M=null;function ie(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new ye,o.layers.enable(n),o.viewport=new ot,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new xt,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}M&&M(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let P=new qt;P.setAnimationLoop(ie),this.setAnimationLoop=function(e){M=e},this.dispose=function(){}}},Xi=new ie,Zi=new d;Zi.set(-1,0,0,0,1,0,0,0,1);function Qi(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,kt(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Xi.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Zi),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function $i(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?N(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):N(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var ea=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ta=null;function na(){return ta===null&&(ta=new T(ea,16,16,M,Pe),ta.name=`DFG_LUT`,ta.minFilter=U,ta.magFilter=U,ta.wrapS=ce,ta.wrapT=ce,ta.generateMipmaps=!1,ta.needsUpdate=!0),ta}var ra=class{constructor(e={}){let{canvas:t=Ft(),context:n=null,depth:r=!0,stencil:i=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1,outputBufferType:m=Je}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);h=n.getContextAttributes().alpha}else h=o;let g=m,_=new Set([se,et,ae]),v=new Set([Je,Ne,Ie,dt,rt,Ct]),y=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},C=null,w=null,T=[],E=[],D=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let O=this,ee=!1,k=null,A=null,te=null,ne=null;this._outputColorSpace=x;let re=0,j=0,M=null,P=-1,F=null,oe=new ot,I=new ot,ce=null,le=new Y(0),ue=0,L=t.width,de=t.height,fe=1,me=null,he=null,ge=new ot(0,0,L,de),_e=new ot(0,0,L,de),ve=!1,ye=new Ye,be=new Ae,R=!1,z=!1,xe=new ie,Se=new J,Ce=new ot,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Ee(){return M===null?fe:1}let B=n;function De(e,n){return t.getContext(e,n)}let Oe,ke,V,je,H,U,Me,Fe,Le,Re,ze,Be,W,Ve,G,Ue,We,Ke,qe,Xe,Ze,Qe,$e;try{let e={alpha:!0,depth:r,stencil:i,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,nt,!1),t.addEventListener(`webglcontextrestored`,it,!1),t.addEventListener(`webglcontextcreationerror`,at,!1),B===null){let t=`webgl2`;if(B=De(t,e),B===null)throw De(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}tt()}catch(e){throw t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,it,!1),t.removeEventListener(`webglcontextcreationerror`,at,!1),Mt(`WebGLRenderer: `+e.message),e}function tt(){Oe=new Cn(B),Oe.init(),Ze=new Gi(B,Oe),ke=new nn(B,Oe,e,Ze),V=new Ui(B,Oe),ke.reversedDepthBuffer&&p&&V.buffers.depth.setReversed(!0),A=B.createFramebuffer(),te=B.createFramebuffer(),ne=B.createFramebuffer(),je=new En(B),H=new Ci,U=new Wi(B,Oe,V,H,ke,Ze,je),Me=new Sn(O),Fe=new Jt(B),Qe=new en(B,Fe),Le=new wn(B,Fe,je,Qe),Re=new On(B,Le,Fe,Qe,je),Ke=new Dn(B,ke,U),G=new rn(H),ze=new Si(O,Me,Oe,ke,Qe,G),Be=new Qi(O,H),W=new Di,Ve=new Pi(Oe),We=new $t(O,Me,V,Re,h,c),Ue=new Hi(O,Re,ke),$e=new $i(B,je,ke,V),qe=new tn(B,Oe,je),Xe=new Tn(B,Oe,je),je.programs=ze.programs,O.capabilities=ke,O.extensions=Oe,O.properties=H,O.renderLists=W,O.shadowMap=Ue,O.state=V,O.info=je}g!==1009&&(D=new An(g,t.width,t.height,s,r,i));let K=new Yi(O,B);this.xr=K,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(e){e!==void 0&&(fe=e,this.setSize(L,de,!1))},this.getSize=function(e){return e.set(L,de)},this.setSize=function(e,n,r=!0){K.isPresenting?N(`WebGLRenderer: Can't change size while VR device is presenting.`):(L=e,de=n,t.width=Math.floor(e*fe),t.height=Math.floor(n*fe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),D!==null&&D.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(L*fe,de*fe).floor()},this.setDrawingBufferSize=function(e,n,r){L=e,de=n,fe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(g===1009)Mt(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){N(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}D.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(oe)},this.getViewport=function(e){return e.copy(ge)},this.setViewport=function(e,t,n,r){e.isVector4?ge.set(e.x,e.y,e.z,e.w):ge.set(e,t,n,r),V.viewport(oe.copy(ge).multiplyScalar(Ee()).round())},this.getScissor=function(e){return e.copy(_e)},this.setScissor=function(e,t,n,r){e.isVector4?_e.set(e.x,e.y,e.z,e.w):_e.set(e,t,n,r),V.scissor(I.copy(_e).multiplyScalar(Ee()).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(e){V.setScissorTest(ve=e)},this.setOpaqueSort=function(e){me=e},this.setTransparentSort=function(e){he=e},this.getClearColor=function(e){return e.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=_.has(t)}if(e){let e=M.texture.type,t=v.has(e),n=We.getClearColor(),r=We.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,B.clearBufferuiv(B.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,B.clearBufferiv(B.COLOR,0,b))}else r|=B.COLOR_BUFFER_BIT}t&&(r|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&B.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),k=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,it,!1),t.removeEventListener(`webglcontextcreationerror`,at,!1),We.dispose(),W.dispose(),Ve.dispose(),U.dispose(),H.dispose(),Me.dispose(),Re.dispose(),Le.dispose(),Qe.dispose(),$e.dispose(),ze.dispose(),K.dispose(),K.removeEventListener(`sessionstart`,pt),K.removeEventListener(`sessionend`,mt),ht.stop()};function nt(e){e.preventDefault(),pe(`WebGLRenderer: Context Lost.`),ee=!0}function it(){pe(`WebGLRenderer: Context Restored.`),ee=!1;let e=je.autoReset,t=Ue.enabled,n=Ue.autoUpdate,r=Ue.needsUpdate,i=Ue.type;tt(),je.autoReset=e,Ue.enabled=t,Ue.autoUpdate=n,Ue.needsUpdate=r,Ue.type=i}function at(e){Mt(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),ct(t)}function ct(e){lt(e),H.remove(e)}function lt(e){let t=H.get(e).programs;t!==void 0&&(t.forEach(function(e){ze.releaseProgram(e)}),e.isShaderMaterial&&ze.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=we);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Dt(e,t,n,r,i);V.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Le.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Qe.setup(i,r,s,n,c);let h,g=qe;if(c!==null&&(h=Fe.get(c),g=Xe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(V.setLineWidth(r.wireframeLinewidth*Ee()),g.setMode(B.LINES)):g.setMode(B.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),V.setLineWidth(e*Ee()),i.isLineSegments?g.setMode(B.LINES):i.isLineLoop?g.setMode(B.LINE_LOOP):g.setMode(B.LINE_STRIP)}else i.isPoints?g.setMode(B.POINTS):i.isSprite&&g.setMode(B.TRIANGLES);if(i.isBatchedMesh){if(Oe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Fe.get(c).bytesPerElement:1,o=H.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(B,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ut(e,t,n,r){k!==null&&e.isNodeMaterial&&k.setObject(r,e),R===!0&&G.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),k!==null&&k.renderStart(e,t,n),w=Ve.get(n),w.init(t),E.push(w),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(w.pushLight(e),e.castShadow&&w.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(w.pushLight(e),e.castShadow&&w.pushShadow(e))}),w.setupLights(),k!==null&&k.updateLights(w.state.lightsArray),z=this.localClippingEnabled,R=G.init(this.clippingPlanes,z),R===!0&&G.setGlobalState(this.clippingPlanes,t),k!==null&&Ue.render(w.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),w=E.pop(),k!==null&&k.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=H.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Oe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let q=null;function ft(e){q&&q(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new qt;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){q=e,K.setAnimationLoop(e),e===null?ht.stop():ht.start()},K.addEventListener(`sessionstart`,pt),K.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){Mt(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;k!==null&&k.renderStart(e,t);let n=K.enabled===!0&&K.isPresenting===!0,r=D!==null&&(M===null||n)&&D.begin(O,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(K.cameraAutoUpdate===!0&&K.updateCamera(t),t=K.getCamera()),e.isScene===!0&&e.onBeforeRender(O,e,t,M),w=Ve.get(e,E.length),w.init(t),w.state.textureUnits=U.getTextureUnits(),E.push(w),xe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?be.setFromArrayCamera(t):ye.setFromProjectionMatrix(xe,Ge,t.reversedDepth),z=this.localClippingEnabled,R=G.init(this.clippingPlanes,z),C=W.get(e,T.length),C.init(),T.push(C),this.info.render.frame++,K.enabled===!0&&K.isPresenting===!0){let e=O.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,O.sortObjects)}gt(e,t,0,O.sortObjects),C.finish(),k!==null&&k.updateLights(w.state.lightsArray),O.sortObjects===!0&&C.sort(me,he),Te=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Te&&We.addToRenderList(C,e),this.info.autoReset===!0&&this.info.reset(),R===!0&&G.beginShadows();let i=w.state.shadowsArray;if(Ue.render(i,e,t),R===!0&&G.endShadows(),(r&&D.hasRenderPass())===!1){let n=C.opaque,r=C.transmissive;if(w.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}Te&&We.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(C,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),Te&&We.render(e),_t(C,e,t)}M!==null&&j===0&&(U.updateMultisampleRenderTarget(M),U.updateRenderTargetMipmap(M)),r&&D.end(O),e.isScene===!0&&e.onAfterRender(O,e,t),Qe.resetDefaultState(),P=-1,F=null,E.pop(),E.length>0?(w=E[E.length-1],U.setTextureUnits(w.state.textureUnits),R===!0&&G.setGlobalState(O.clippingPlanes,w.state.camera)):w=null,T.pop(),C=T.length>0?T[T.length-1]:null,k!==null&&k.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)w.pushLight(e),e.castShadow&&w.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?be:ye;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Ce.setFromMatrixPosition(e.matrixWorld).applyMatrix4(xe);let i=Re.update(e),a=e.material;a.visible&&C.push(e,i,a,n,Ce.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?be:ye;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Re.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ce.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ce.copy(e.boundingSphere.center)),Ce.applyMatrix4(e.matrixWorld).applyMatrix4(xe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&C.push(e,i,c,n,Ce.z,s,t)}}else a.visible&&C.push(e,i,a,n,Ce.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;w.setupLightsView(n),R===!0&&G.setGlobalState(O.clippingPlanes,n),r&&V.viewport(oe.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[r.id]===void 0){let e=Oe.has(`EXT_color_buffer_half_float`)||Oe.has(`EXT_color_buffer_float`);w.state.transmissionRenderTarget[r.id]=new He(1,1,{generateMipmaps:!0,type:e?Pe:Je,minFilter:Nt,samples:Math.max(4,ke.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:a.workingColorSpace})}let o=w.state.transmissionRenderTarget[r.id],s=r.viewport||oe;o.setSize(s.z*O.transmissionResolutionScale,s.w*O.transmissionResolutionScale);let c=O.getRenderTarget(),l=O.getActiveCubeFace(),u=O.getActiveMipmapLevel();O.setRenderTarget(o),O.getClearColor(le),ue=O.getClearAlpha(),ue<1&&O.setClearColor(16777215,.5),O.clear(),Te&&We.render(n);let d=O.toneMapping;O.toneMapping=0;let f=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),w.setupLightsView(r),R===!0&&G.setGlobalState(O.clippingPlanes,r),yt(e,n,r),U.updateMultisampleRenderTarget(o),U.updateRenderTargetMipmap(o),Oe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(U.updateMultisampleRenderTarget(o),U.updateRenderTargetMipmap(o))}O.setRenderTarget(c,l,u),O.setClearColor(le,ue),f!==void 0&&(r.viewport=f),O.toneMapping=d}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){k!==null&&i.isNodeMaterial&&k.setObject(e,i),e.onBeforeRender(O,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(O,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,O.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,O.renderBufferDirect(n,t,r,i,e,a),i.side=2):O.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(O,t,n,r,i,a)}function xt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function St(e,t,n){t.isScene!==!0&&(t=we);let r=H.get(e),i=w.state.lights,a=w.state.shadowsArray,o=i.state.version,s=ze.getParameters(e,i.state,a,t,n,w.state.lightProbeGridArray),c=ze.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Me.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,st),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=ze.getUniforms(e),k!==null&&e.isNodeMaterial&&k.build(e,n,s),e.onBeforeCompile(s,O),d=ze.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=G.uniform),Et(e,s),r.needsLights=kt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=xt(w.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function wt(e,t,n,r,i){let a=H.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=St(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=zr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=H.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t,n,r,i){t.isScene!==!0&&(t=we),U.resetTextureUnits();let o=t.fog,s=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,c=M===null?O.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:a.workingColorSpace,l=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,u=Me.get(r.envMap||s,l),d=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,f=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),p=!!n.morphAttributes.position,m=!!n.morphAttributes.normal,h=!!n.morphAttributes.color,g=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(g=O.toneMapping);let _=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,v=_===void 0?0:_.length,y=H.get(r),b=w.state.lights;if(R===!0&&(z===!0||e!==F)){let t=e===F&&r.id===P;G.setState(r,e,t)}let x=!1,C=!1;r.version===y.__version?y.needsLights&&y.lightsStateVersion!==b.state.version||i.isBatchedMesh&&y.batching===!1||!i.isBatchedMesh&&y.batching===!0||i.isBatchedMesh&&y.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&y.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&y.instancing===!1||!i.isInstancedMesh&&y.instancing===!0||i.isSkinnedMesh&&y.skinning===!1||!i.isSkinnedMesh&&y.skinning===!0||i.isInstancedMesh&&y.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&y.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&y.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&y.instancingMorph===!1&&i.morphTexture!==null?x=!0:y.envMap===u?r.fog===!0&&y.fog!==o||y.numClippingPlanes!==void 0&&(y.numClippingPlanes!==G.numPlanes||y.numIntersection!==G.numIntersection)?x=!0:y.vertexAlphas===d&&y.vertexTangents===f&&y.morphTargets===p&&y.morphNormals===m&&y.morphColors===h&&y.morphTargetsCount===v&&y.numLightProbeGrids===xt(w.state.lightProbeGridArray)?(y.outputColorSpace!==c||y.toneMapping!==g)&&(C=!0):x=!0:x=!0:(x=!0,y.__version=r.version);let T=y.currentProgram;(x===!0||C===!0)&&(T=C===!0?wt(r,t,i,c,g):St(r,t,i),k&&r.isNodeMaterial&&k.onUpdateProgram(r,T,y));let E=!1,D=!1,ee=!1,A=T.getUniforms(),te=y.uniforms;if(V.useProgram(T.program)&&(E=!0,D=!0,ee=!0),r.id!==P&&(P=r.id,D=!0),E||F!==e){V.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(B,`projectionMatrix`,e.projectionMatrix),A.setValue(B,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(B,Se.setFromMatrixPosition(e.matrixWorld)),ke.logarithmicDepthBuffer&&A.setValue(B,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(B,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,D=!0,ee=!0)}if(y.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(B,`sunShadowMap`,b.state.sunShadowMap,U),b.state.directionalShadowMap.length>0&&A.setValue(B,`directionalShadowMap`,b.state.directionalShadowMap,U),b.state.spotShadowMap.length>0&&A.setValue(B,`spotShadowMap`,b.state.spotShadowMap,U),b.state.pointShadowMap.length>0&&A.setValue(B,`pointShadowMap`,b.state.pointShadowMap,U)),i.isSkinnedMesh){A.setOptional(B,i,`bindMatrix`),A.setOptional(B,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(B,`boneTexture`,e.boneTexture,U))}i.isBatchedMesh&&(A.setOptional(B,i,`batchingTexture`),A.setValue(B,`batchingTexture`,i._matricesTexture,U),A.setOptional(B,i,`batchingIdTexture`),A.setValue(B,`batchingIdTexture`,i._indirectTexture,U),A.setOptional(B,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(B,`batchingColorTexture`,i._colorsTexture,U));let ne=n.morphAttributes;if((ne.position!==void 0||ne.normal!==void 0||ne.color!==void 0)&&Ke.update(i,n,T),(D||y.receiveShadow!==i.receiveShadow)&&(y.receiveShadow=i.receiveShadow,A.setValue(B,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(te.envMapIntensity.value=t.environmentIntensity),te.dfgLUT!==void 0&&(te.dfgLUT.value=na()),D){if(A.setValue(B,`toneMappingExposure`,O.toneMappingExposure),y.needsLights&&Ot(te,ee),o&&r.fog===!0&&Be.refreshFogUniforms(te,o),Be.refreshMaterialUniforms(te,r,fe,de,w.state.transmissionRenderTarget[e.id]),y.needsLights&&y.numLightProbeGrids>0){let e=S,t=0;for(let n of w.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;te.probesSH.value=e.textures,te.probesMin.value=e.min,te.probesMax.value=e.max,te.probesResolution.value=e.resolution}zr.upload(B,Tt(y),te,U)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(zr.upload(B,Tt(y),te,U),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(B,`center`,i.center),A.setValue(B,`modelViewMatrix`,i.modelViewMatrix),A.setValue(B,`normalMatrix`,i.normalMatrix),A.setValue(B,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];$e.update(n,T),$e.bind(n,T)}}return T}function Ot(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function kt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return re},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=H.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),H.get(e.texture).__webglTexture=t,H.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=H.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,re=t,j=n;let r=null,i=!1,a=!1;if(e){let o=H.get(e);if(o.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(B.FRAMEBUFFER,o.__webglFramebuffer),oe.copy(e.viewport),I.copy(e.scissor),ce=e.scissorTest,V.viewport(oe),V.scissor(I),V.setScissorTest(ce),P=-1;return}if(o.__webglFramebuffer===void 0)U.setupRenderTarget(e);else if(o.__hasExternalTextures)U.rebindTextures(e,H.get(e.texture).__webglTexture,H.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&H.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);U.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=H.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&U.useMultisampledRTT(e)===!1?H.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,oe.copy(e.viewport),I.copy(e.scissor),ce=e.scissorTest}else oe.copy(ge).multiplyScalar(fe).floor(),I.copy(_e).multiplyScalar(fe).floor(),ce=ve;if(n!==0&&(r=A),V.bindFramebuffer(B.FRAMEBUFFER,r)&&V.drawBuffers(e,r),V.viewport(oe),V.scissor(I),V.setScissorTest(ce),i){let r=H.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=H.get(e.textures[t]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=H.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,t.__webglTexture,n)}P=-1};function At(e){let t=H.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=ke.textureFormatReadable(e.format),t.__typeReadable=ke.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){Mt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=H.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){V.bindFramebuffer(B.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s);let u=At(o);if(u.__formatReadable===!1){Mt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){Mt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&B.readPixels(t,n,r,i,Ze.convert(c),Ze.convert(l),a)}finally{let e=M===null?null:H.get(M).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=H.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){V.bindFramebuffer(B.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,d=o.type;e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s);let f=At(o);if(f.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(f.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let p=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,p),B.bufferData(B.PIXEL_PACK_BUFFER,a.byteLength,B.STREAM_READ),B.readPixels(t,n,r,i,Ze.convert(l),Ze.convert(d),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let m=M===null?null:H.get(M).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,m);let h=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await u(B,h,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,p),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,a),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(p),B.deleteSync(h),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;U.setTexture2D(e,0),B.copyTexSubImage2D(B.TEXTURE_2D,n,0,0,o,s,i,a),V.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ze.convert(t.format),_=Ze.convert(t.type),v;t.isData3DTexture?(U.setTexture3D(t,0),v=B.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(U.setTexture2DArray(t,0),v=B.TEXTURE_2D_ARRAY):(U.setTexture2D(t,0),v=B.TEXTURE_2D),V.activeTexture(B.TEXTURE0),V.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,t.flipY),V.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),V.pixelStorei(B.UNPACK_ALIGNMENT,t.unpackAlignment);let y=V.getParameter(B.UNPACK_ROW_LENGTH),b=V.getParameter(B.UNPACK_IMAGE_HEIGHT),x=V.getParameter(B.UNPACK_SKIP_PIXELS),S=V.getParameter(B.UNPACK_SKIP_ROWS),C=V.getParameter(B.UNPACK_SKIP_IMAGES);V.pixelStorei(B.UNPACK_ROW_LENGTH,h.width),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,h.height),V.pixelStorei(B.UNPACK_SKIP_PIXELS,l),V.pixelStorei(B.UNPACK_SKIP_ROWS,u),V.pixelStorei(B.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=H.get(e),r=H.get(t),h=H.get(n.__renderTarget),g=H.get(r.__renderTarget);V.bindFramebuffer(B.READ_FRAMEBUFFER,h.__webglFramebuffer),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,H.get(e).__webglTexture,i,d+n),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,H.get(t).__webglTexture,a,m+n)),B.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,B.DEPTH_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||H.has(e)){let n=H.get(e),r=H.get(t);V.bindFramebuffer(B.READ_FRAMEBUFFER,te),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,ne);for(let e=0;e<c;e++)w?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,n.__webglTexture,i),T?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,r.__webglTexture,a),i===0?T?B.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):B.copyTexSubImage2D(v,a,f,p,l,u,o,s):B.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,B.COLOR_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?B.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h);V.pixelStorei(B.UNPACK_ROW_LENGTH,y),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,b),V.pixelStorei(B.UNPACK_SKIP_PIXELS,x),V.pixelStorei(B.UNPACK_SKIP_ROWS,S),V.pixelStorei(B.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&B.generateMipmap(v),V.unbindTexture()},this.initRenderTarget=function(e){H.get(e).__webglFramebuffer===void 0&&U.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?U.setTextureCube(e,0):e.isData3DTexture?U.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?U.setTexture2DArray(e,0):U.setTexture2D(e,0),V.unbindTexture()},this.resetState=function(){re=0,j=0,M=null,V.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ge}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=a._getDrawingBufferColorSpace(e),t.unpackColorSpace=a._getUnpackColorSpace()}},ia={type:`change`},aa={type:`start`},oa={type:`end`},sa=new Ze,ca=new S,la=Math.cos(70*p.DEG2RAD),ua=new J,da=2*Math.PI,fa={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pa=1e-6,ma=class extends ve{constructor(e,t=null){super(e,t),this.state=fa.NONE,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:me.ROTATE,MIDDLE:me.DOLLY,RIGHT:me.PAN},this.touches={ONE:I.ROTATE,TWO:I.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new y,this._lastTargetPosition=new J,this._quat=new y().setFromUnitVectors(e.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ee,this._sphericalDelta=new Ee,this._scale=1,this._panOffset=new J,this._rotateStart=new W,this._rotateEnd=new W,this._rotateDelta=new W,this._panStart=new W,this._panEnd=new W,this._panDelta=new W,this._dollyStart=new W,this._dollyEnd=new W,this._dollyDelta=new W,this._dollyDirection=new J,this._mouse=new W,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ga.bind(this),this._onPointerDown=ha.bind(this),this._onPointerUp=_a.bind(this),this._onContextMenu=wa.bind(this),this._onMouseWheel=ba.bind(this),this._onKeyDown=xa.bind(this),this._onTouchStart=Sa.bind(this),this._onTouchMove=Ca.bind(this),this._onMouseDown=va.bind(this),this._onMouseMove=ya.bind(this),this._interceptControlDown=Ta.bind(this),this._interceptControlUp=Ea.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=fa.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ia),this.update(),this.state=fa.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;ua.copy(t).sub(this.target),ua.applyQuaternion(this._quat),this._spherical.setFromVector3(ua),this.autoRotate&&this.state===fa.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=da:n>Math.PI&&(n-=da),r<-Math.PI?r+=da:r>Math.PI&&(r-=da),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(ua.setFromSpherical(this._spherical),ua.applyQuaternion(this._quatInverse),t.copy(this.target).add(ua),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=ua.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new J(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new J(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=ua.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(sa.origin.copy(this.object.position),sa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(sa.direction))<la?this.object.lookAt(this.target):(ca.setFromNormalAndCoplanarPoint(this.object.up,this.target),sa.intersectPlane(ca,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>pa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pa||this._lastTargetPosition.distanceToSquared(this.target)>pa?(this.dispatchEvent(ia),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?da/60/60*this.autoRotateSpeed:da/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ua.setFromMatrixColumn(t,0),ua.multiplyScalar(-e),this._panOffset.add(ua)}_panUp(e,t){this.screenSpacePanning===!0?ua.setFromMatrixColumn(t,1):(ua.setFromMatrixColumn(t,0),ua.crossVectors(this.object.up,ua)),ua.multiplyScalar(e),this._panOffset.add(ua)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;ua.copy(r).sub(this.target);let i=ua.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(da*this._rotateDelta.x/t.clientHeight),this._rotateUp(da*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(da*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-da*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(da*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-da*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(da*this._rotateDelta.x/t.clientHeight),this._rotateUp(da*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new W,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function ha(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),this._isTrackingPointer(e)||(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function ga(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function _a(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(oa),this.state=fa.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function va(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=fa.DOLLY;break;case me.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=fa.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=fa.ROTATE}break;case me.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=fa.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=fa.PAN}break;default:this.state=fa.NONE}this.state!==fa.NONE&&this.dispatchEvent(aa)}function ya(e){switch(this.state){case fa.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case fa.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case fa.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function ba(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===fa.NONE&&(e.preventDefault(),this.dispatchEvent(aa),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(oa))}function xa(e){this.enabled!==!1&&this._handleKeyDown(e)}function Sa(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case I.ROTATE:if(this.enableRotate===!1){this.state=fa.NONE;break}this._handleTouchStartRotate(e),this.state=fa.TOUCH_ROTATE;break;case I.PAN:if(this.enablePan===!1){this.state=fa.NONE;break}this._handleTouchStartPan(e),this.state=fa.TOUCH_PAN;break;default:this.state=fa.NONE}break;case 2:switch(this.touches.TWO){case I.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=fa.TOUCH_DOLLY_PAN;break;case I.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=fa.TOUCH_DOLLY_ROTATE;break;default:this.state=fa.NONE}break;default:this.state=fa.NONE}this.state!==fa.NONE&&this.dispatchEvent(aa)}function Ca(e){switch(this._trackPointer(e),this.state){case fa.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case fa.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case fa.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case fa.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=fa.NONE}}function wa(e){this.enabled!==!1&&e.preventDefault()}function Ta(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Ea(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Da=Object.freeze({min:.38,max:9,default:1,mapEnter:.68,mapExit:.82,closeEnter:2.4,closeExit:2,follow:3.2,followExit:2,mapBlendStart:1,mapBlendEnd:.78,detailPrefetch:.35}),Oa=Da.follow;function ka(e,t=Da.default){let n=typeof t==`number`&&Number.isFinite(t)?t:Da.default,r=typeof e==`number`&&!Number.isNaN(e)?e:n;return Math.max(Da.min,Math.min(Da.max,r))}function Aa(e,t=`world`){let n=ka(e);return t===`map`&&n<Da.mapExit?`map`:t===`close`&&n>Da.closeExit?`close`:n<=Da.mapEnter?`map`:n>=Da.closeEnter?`close`:`world`}function ja(e){let t=ka(e),n=Math.max(0,Math.min(1,(Da.mapBlendStart-t)/(Da.mapBlendStart-Da.mapBlendEnd)));return n*n*(3-2*n)}function Ma(e){return ka(e)<Da.followExit}function Na({viewWidth:e,viewHeight:t,spanWidth:n,spanHeight:r,padding:i=.15,fallback:a=Oa}={}){if(![e,t,n,r].every(e=>typeof e==`number`&&Number.isFinite(e)&&e>0))return ka(a);let o=1+2*(typeof i==`number`&&Number.isFinite(i)?Math.max(0,i):.15);return ka(Math.min(e/(n*o),t/(r*o)),a)}function Pa(e,t,n,r=!1){if(r)return t;let i=Math.max(0,Number.isFinite(n)?n:0);if(!i||e===t)return e;let a=Math.log(e),o=Math.log(t),s=Math.abs(o-a),c=1.8,l=c/14,u=Math.max(0,(s-l)/c),d=i<=u?c*i:s-Math.min(s,l)*Math.exp(-14*(i-u)),f=Math.exp(a+Math.sign(o-a)*d);return Math.abs(f-t)<1e-6?t:f}var Fa=Object.freeze({railCore:3,cityReferenceRadius:16.5,trainWidth:6,trainLength:15}),Ia=5.5,La=e=>(1.75+Math.max(1,Math.min(10,Math.round(Number(e)||1)))*.12)*Fa.cityReferenceRadius/2.5;function Ra(e=1){let t=Math.max(0,Math.min(1,(e-.5)/.3));return t*t*(3-2*t)}function za(e,t){let n=e.onBeforeCompile,r=e.customProgramCacheKey();return e.onBeforeCompile=(r,i)=>{n.call(e,r,i),r.uniforms.mapNetworkVisibility=t,r.fragmentShader=`uniform float mapNetworkVisibility;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (mapNetworkVisibility < 1.0) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (mapNetworkVisibility <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`${r}|map-network-visibility-v1`,e}function Ba(e,t){let n=Math.max(0,Math.min(1,(t-.6)/.6)),r=n*n*(3-2*n),i=new Map,a=new Map,o=Math.max(1,...e.map(e=>e.radius*2+2.5));for(let t of e){if(!t.visible||r===0){a.set(t.id,1);continue}let e=Math.floor(t.x/o),n=Math.floor(t.y/o),s=(t.previous??1)>.5?1:2.5,c=!1;for(let r=-1;r<=1&&!c;r++)for(let a=-1;a<=1&&!c;a++)for(let o of i.get(`${e+r}:${n+a}`)??[])if(Math.hypot(t.x-o.x,t.y-o.y)<t.radius+o.radius+s){c=!0;break}if(a.set(t.id,c?1-r:1),!c){let r=`${e}:${n}`;i.has(r)||i.set(r,[]),i.get(r).push(t)}}return a}function Va(e,t=1,n=1){return e>0?{routeScale:e*Fa.railCore/.42,cityScale:e*Fa.cityReferenceRadius/(2.5*t),trainScaleX:Math.max(1,e*Fa.trainWidth/(1.22*n)),trainScaleZ:Math.max(1,e*Fa.trainLength/2.45)}:{routeScale:1,cityScale:1,trainScaleX:1,trainScaleZ:1}}var Ha=(e,t,n)=>n?1:1-Math.exp(-e*t),Ua=e=>e.parts[Math.floor(e.parts.length/2)],Wa=1.968,Ga=.48,Ka=Math.PI/4,qa=85*Math.PI/180,Ja=(e,t)=>p.euclideanModulo(e+Math.PI*t,2*Math.PI*t)-Math.PI*t;function Ya({canvas:e,camera:t,scene:n,mapScene:r,reducedMotion:a,getTrains:o,getWorldRoot:s,getWorld:c=()=>null,onPause:l,onRegenerate:u,isDetailReady:d=()=>!0}){let f=t.clone(),m=t.clone(),h=t.clone(),g=t.clone(),_=t.clone(),v=t.clone(),y=t.clone(),b=new J(0,1.3,0),x=0,S=[g,v],C=new ma(f,e);Object.assign(C,{enableDamping:!0,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,minZoom:Da.min,maxZoom:Da.max,minPolarAngle:Ka,maxPolarAngle:Ka}),C.target.set(0,1.3,0),C.update();let w=`world`,T=0,E=null,D=null,O=null,k=1,A=new J,ne=new J,re=null,j=null,M=!1,N=0,P=null,ae=new Set,F=new Set,oe=new te;oe.firstHitOnly=!0;let se=[],ce=new J,le=new W,L=new J,de=new Ee,fe=new J,pe=new J,he=new ie,ge=new J,_e=new J,ve=new J,ye=new J,be=new J,R=new J,z=new J,xe=new J,Se=new W,Ce=new W,we=new W,Te={x:0,z:0},B=new J,Oe=new J,ke=new WeakMap,V={},Ae=new ee(.94,1,64);Ae.rotateX(-Math.PI/2);let H=new i({color:X.trim,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!0,side:2}),U=new K(Ae,H),Me=new K(Ae,H.clone());Me.material.toneMapped=!1,U.visible=Me.visible=!1,n.add(U),r.add(Me),U.renderOrder=3,Me.renderOrder=10;function Ne(){let e=c(),t=G(e);if(!t)return;if(t.complete){pe.set(Ja(C.target.x,t.radius)-C.target.x,0,p.clamp(C.target.z,-t.radius*qa,t.radius*qa)-C.target.z),C.target.add(pe),f.position.add(pe);return}let n=ke.get(e);if(!n){if(e.outline?.length){let t=e.outline.map(e=>e[0]),r=e.outline.map(e=>e[1]);n={left:Math.min(...t),right:Math.max(...t),top:Math.min(...r),bottom:Math.max(...r)}}else if(e.bounds)n={left:-e.bounds.width/2,right:e.bounds.width/2,top:-e.bounds.depth/2,bottom:e.bounds.depth/2};else return;let t=Math.max(8,Math.min(n.right-n.left,n.bottom-n.top)*.05);n.left-=t,n.right+=t,n.top-=t,n.bottom+=t,ke.set(e,n)}pe.set(p.clamp(C.target.x,n.left,n.right)-C.target.x,0,p.clamp(C.target.z,n.top,n.bottom)-C.target.z),C.target.add(pe),f.position.add(pe)}function Pe(e,t,n=f,r=C.target){e.copy(n),de.setFromVector3(L.copy(n.position).sub(r));let i=G(c());return de.phi=p.lerp(Ka,i&&!i.complete?Ga:1e-5,t),e.position.copy(r).add(L.setFromSpherical(de)),e.lookAt(r),e.updateMatrixWorld(!0),e}function Fe(e,t,n=C.target){e.copy(t);let r=c();return G(r)&&(De(r,n.x,n.z,he),ue(r,n.x,n.y,n.z,ge),_e.copy(t.position).sub(n).applyMatrix4(he),e.position.copy(ge).add(_e),e.up.copy(t.up).transformDirection(he),e.lookAt(ge)),e.updateMatrixWorld(!0),e}function Ie(){Pe(m,T,y,b),Fe(t,m,b),s()?.scale.set(1,G(c())?1:1-T*.985,1)}function Le(){let e=C.enableDamping,t=f.zoom;B.copy(f.position),Oe.copy(C.target),C.enableDamping=!1,C.update(),f.position.copy(B),C.target.copy(Oe),f.zoom=t,f.updateProjectionMatrix(),C.update(),C.enableDamping=e}function Re(){E=null,O=null}let ze=e=>Math.max(Da.min,Math.min(Da.max*k,e));function Be(){return k*Math.max(Da.follow,Na({viewWidth:(f.right-f.left)/k,viewHeight:(f.top-f.bottom)/k,spanWidth:40,spanHeight:32,padding:.1}))}function Ve(e){e?.state.active&&(Qe(),Le(),E=e,D=null,O=Be(),a.matches&&(f.zoom=O,f.updateProjectionMatrix(),O=null))}function He(){Re(),Qe(),D=null,Le(),f.position.copy(A),C.target.copy(ne),f.zoom=1,f.updateProjectionMatrix(),C.update(),Ne(),y.copy(f),b.copy(C.target),y.updateProjectionMatrix(),T=ja(y.zoom/k),w=Aa(y.zoom/k),U.visible=Me.visible=!1,Ye(),Ie(),Ue()}function Ue(){let t={view:w,following:E?.state.id??``,zoom:y.zoom.toFixed(3),requestedZoom:f.zoom.toFixed(3),detailLoading:String(T<1&&!d()),mapBlend:T.toFixed(3)};for(let n in t)V[n]!==t[n]&&(e.dataset[n]=V[n]=t[n])}function We(e,n=Ua(e),r=ce){let i=c(),a=n.position;return G(i)?ue(i,a.x,T>.7?Wa:a.y+.8,a.z,r):(r.copy(a),r.y=T>.7?.3:(a.y+.8)*(s()?.scale.y??1)),r.project(t)}function Ge(e,n){if(!e.state.active||T>.7&&Ra(t.zoom)===0)return!1;if(!n)return e.parts.some(t=>Ge(e,t));if(!n.visible)return!1;let r=We(e,n);if(Math.abs(r.x)>1.05||Math.abs(r.y)>1.05||r.z<-1||r.z>1||G(c())&&(je(c(),n.position.x,n.position.z,ve),ve.dot(t.getWorldDirection(ye))>=0))return!1;if(T>.7)return!0;oe.setFromCamera(le.set(r.x,r.y),t),se.length=0,s()?.traverseVisible(e=>{e.isMesh&&(!e.isInstancedMesh||e.count>0)&&se.push(e)});let i=oe.intersectObjects(se,!1)[0];if(i?.object.userData.instanceTrainIds?.[i.instanceId]===e.state.id)return!0;let a=i?.object;for(;a;){if(a.userData.trainId===e.state.id)return!0;a=a.parent}return!1}function Ke(n,r,i=!1){let a=e.getBoundingClientRect(),c=i?28:17,l=[];s()?.updateMatrixWorld(!0),t.updateMatrixWorld(!0);for(let e of o())if(e.state.active)for(let t of e.parts){let i=We(e,t);if(i.z<-1||i.z>1)continue;let o=Math.hypot((i.x+1)*a.width/2+a.left-n,(1-i.y)*a.height/2+a.top-r);o<c&&l.push({train:e,part:t,d:o})}l.sort((e,t)=>e.d-t.d);for(let e of l)if(Ge(e.train,e.part))return e.train;return null}function qe(){let e=[];for(let t of o()){if(!t.state.active)continue;let n=We(t);Math.abs(n.x)<=1.05&&Math.abs(n.y)<=1.05&&n.z>=-1&&n.z<=1&&e.push({train:t,d:n.x*n.x+n.y*n.y})}e.sort((e,t)=>e.d-t.d);for(let t of e)if(Ge(t.train))return t.train}function Je(e){let t=o().filter(e=>e.state.active);if(!t.length)return;let n=t.indexOf(E);Ve(t[n<0?e>0?0:t.length-1:(n+e+t.length)%t.length])}function Ye(){let e=T===1&&w===`map`;P!==null&&e!==P&&Le(),P=e,C.enableRotate=!e,C.enablePan=e&&!E,C.screenSpacePanning=!1,C.mouseButtons.LEFT=e?me.PAN:me.ROTATE,C.touches.ONE=e?I.PAN:I.ROTATE,C.touches.TWO=e?I.DOLLY_PAN:I.DOLLY_ROTATE}function Xe(e,t,n){if(!e&&!t)return;Re();let r=G(c()),i=Math.max(f.right-f.left,f.top-f.bottom)/y.zoom,a=n??(r?.complete?Math.min(r.radius*.95,i*.3):i*.3);if(z.set(1,0,0).applyQuaternion(m.quaternion),z.y=0,z.normalize(),xe.set(0,1,0).applyQuaternion(m.quaternion),xe.y=0,xe.normalize(),pe.copy(z).multiplyScalar(e*a).addScaledVector(xe,-t*a),r?.complete&&r.projection.type===`equirectangular`){let e=r.projection,t=e.centralLatitude*Math.PI/180-C.target.z/e.radius,n=r.radius+C.target.y,i=p.clamp(t-pe.z/n,-qa,qa),a=i-t,o=Math.log(Math.tan(Math.PI/4+i/2)/Math.tan(Math.PI/4+t/2)),s=Math.abs(a)>1e-9?a/o:Math.cos(t);pe.x*=e.radius/(n*s),pe.z=-a*e.radius}else r&&(jt(c(),C.target.x,C.target.z,pe.x,pe.z,Te),pe.set(Te.x-C.target.x,0,Te.z-C.target.z));C.target.add(pe),f.position.add(pe),Ne()}function Ze(e){if(Ce.set(Number(F.has(`d`))-Number(F.has(`a`)),Number(F.has(`s`))-Number(F.has(`w`))),Ce.lengthSq()>1&&Ce.normalize(),a.matches)Se.copy(Ce),we.copy(Ce).multiplyScalar(e);else{let t=Ce.lengthSq()?10:14,n=Math.exp(-t*e);we.copy(Se).sub(Ce).multiplyScalar((1-n)/t).addScaledVector(Ce,e),Se.sub(Ce).multiplyScalar(n).add(Ce),!Ce.lengthSq()&&Se.lengthSq()<1e-24&&Se.set(0,0)}Xe(we.x,we.y)}function Qe(){F.clear(),Se.set(0,0),we.set(0,0)}function $e(e){F.delete(e.key.toLowerCase())}e.addEventListener(`keyup`,$e),window.addEventListener(`keyup`,$e),e.addEventListener(`blur`,Qe),window.addEventListener(`blur`,Qe),e.ownerDocument.addEventListener(`visibilitychange`,()=>{e.ownerDocument.hidden&&Qe()}),e.addEventListener(`pointerdown`,e=>{ae.add(e.pointerId),ae.size>1&&(M=!0,j=null),e.button===0&&ae.size===1&&(j={id:e.pointerId,x:e.clientX,y:e.clientY,moved:!1,touch:e.pointerType===`touch`},M=!1),O=null},{capture:!0}),e.addEventListener(`pointermove`,e=>{j?.id===e.pointerId&&Math.hypot(e.clientX-j.x,e.clientY-j.y)>6&&(j.moved=!0),re={x:e.clientX,y:e.clientY,touch:e.pointerType===`touch`}});function et(e){let t=j?.id===e.pointerId&&!j.moved&&!M&&e.type===`pointerup`&&Math.hypot(e.clientX-j.x,e.clientY-j.y)<=6,n=j;if(ae.delete(e.pointerId),t){let t=Ke(e.clientX,e.clientY,n.touch);t?Ve(t):Re()}ae.size||(j=null,M=!1)}window.addEventListener(`pointerup`,et),window.addEventListener(`pointercancel`,et),e.addEventListener(`pointerleave`,()=>{D=null,re=null,e.style.cursor=E?`default`:`grab`}),e.addEventListener(`wheel`,()=>{O=null},{passive:!0}),e.addEventListener(`dblclick`,He),e.addEventListener(`keydown`,e=>{if(e.altKey||e.metaKey||e.ctrlKey)return;let t=!0,n=e.key.toLowerCase();if([`w`,`a`,`s`,`d`].includes(n))F.has(n)||(F.add(n),Re(),Le());else if(e.key===` `)l();else if(e.key===`Home`)He();else if(e.key===`Escape`)Re();else if(e.key.toLowerCase()===`r`)u();else if(e.key.toLowerCase()===`f`)Ve(qe());else if(e.key===`[`)Je(-1);else if(e.key===`]`)Je(1);else if([`+`,`=`,`-`,`_`].includes(e.key))O=null,f.zoom=ze(f.zoom*(e.key===`+`||e.key===`=`?1.16:1/1.16)),f.updateProjectionMatrix();else if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)){if(Le(),w===`world`&&!E&&(e.key===`ArrowLeft`||e.key===`ArrowRight`)){let t=f.position.clone().sub(C.target),n=new Ee().setFromVector3(t);e.key===`ArrowLeft`&&(n.theta-=.08),e.key===`ArrowRight`&&(n.theta+=.08),f.position.copy(C.target).add(new J().setFromSpherical(n))}else Xe(Number(e.key===`ArrowRight`)-Number(e.key===`ArrowLeft`),Number(e.key===`ArrowDown`)-Number(e.key===`ArrowUp`),(f.top-f.bottom)/y.zoom*.045);C.update(),Ne()}else t=!1;t&&e.preventDefault()});function tt(e){if(x=e,O!==null&&(f.zoom=p.lerp(f.zoom,O,Ha(7,e,a.matches)),Math.abs(f.zoom-O)<.002&&(f.zoom=O,O=null),f.updateProjectionMatrix()),E&&(!E.state.active||O===null&&Ma(f.zoom/k))&&(E=null),Ze(Math.min(.1,Math.max(0,e))),Ye(),C.update(),E){fe.copy(Ua(E).position),fe.y=.75;let t=G(c());t?.complete&&(fe.x=C.target.x+Ja(fe.x-C.target.x,t.radius)),pe.copy(C.target).lerp(fe,Ha(7,e,a.matches)).sub(C.target),C.target.add(pe),f.position.add(pe)}Ne()}function nt(e){return Pa(y.zoom,f.zoom,e,a.matches)}function rt(n){let r=nt(n);y.copy(f),b.copy(C.target),y.zoom=r,y.updateProjectionMatrix(),T=ja(y.zoom/k),w=Aa(y.zoom/k,w),Ye(),Ie(),N+=n,N>.12&&re&&!re.touch&&!ae.size&&!E&&(N=0,D=Ke(re.x,re.y),e.style.cursor=D?`pointer`:`grab`);let i=E??D;if(U.visible=Me.visible=!!i?.state.active,Me.visible&&=Ra(t.zoom)>0,i){let e=Ua(i);for(let n of[U,Me]){let r=c(),a=n===U?.045:G(r)?1.6:.6;G(r)?(ue(r,e.position.x,a,e.position.z,n.position),je(r,e.position.x,e.position.z,ve),Ot(r,e.position.x,a,e.position.z,Math.sin(e.rotation.y),0,Math.cos(e.rotation.y),be).normalize(),R.crossVectors(ve,be).normalize(),he.makeBasis(R,ve,be),n.quaternion.setFromRotationMatrix(he)):(n.position.set(e.position.x,a,e.position.z),n.rotation.set(0,e.rotation.y,0)),n.scale.set(1.35,1,4.65),n.material.opacity=E?.state.id===i.state.id?.95:.48,n===Me&&(n.material.opacity*=Ra(t.zoom))}}Ue()}return{navigation:f,chartCamera:m,controls:C,reset:He,updateNavigation:tt,updatePresentation:rt,update(e){tt(e),rt(e)},get coverageCamera(){return Pe(h,0),h.zoom=Math.max(Da.mapBlendEnd*k,y.zoom),h.updateProjectionMatrix(),Fe(g,h)},get coverageCameras(){this.coverageCamera;let e=Da.mapBlendEnd*k,t=nt(x);return t<e?(v.copy(g),S):(Pe(_,ja(t/k)),_.zoom=t,_.updateProjectionMatrix(),Fe(v,_),S)},setScale(e){k=Math.max(1,Number(e)||1),C.maxZoom=Da.max*k},get zoomScale(){return k},get wantsDetail(){return f.zoom/k>Da.detailPrefetch||T<1||E!==null},get waitingForDetail(){return!1},get renderTarget(){return b},setHome(){A.copy(f.position),ne.copy(C.target),He()},get mode(){return w},get blend(){return T},get selected(){return E?.state.id??null}}}function Xa(e,t){return e.onBeforeCompile=e=>{e.uniforms.detailReveal=t,e.fragmentShader=`uniform float detailReveal;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (detailReveal < 0.9999) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (detailReveal <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`streamed-detail-reveal-v1`,e}function Za(e){return Xa(new Qe({depthPacking:n,side:1}),e)}function Qa(e){let t={type:Pe,depthBuffer:!0,samples:2},n=new He(1,1,t),r=new He(1,1,t),i=new v({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{worldTexture:{value:n.texture},mapTexture:{value:r.texture},blend:{value:0},toneMappingExposure:{value:e.toneMappingExposure}},vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,fragmentShader:`varying vec2 vUv;
      uniform sampler2D worldTexture;
      uniform sampler2D mapTexture;
      uniform float blend;
      #include <tonemapping_pars_fragment>
      void main(){
        vec3 worldColor=ACESFilmicToneMapping(texture2D(worldTexture,vUv).rgb);
        vec3 mapColor=texture2D(mapTexture,vUv).rgb;
        gl_FragColor=vec4(mix(worldColor,mapColor,blend),1.0);
        #include <colorspace_fragment>
      }`}),a=new R,o=new K(new _e(2,2),i);o.frustumCulled=!1,a.add(o);let s=new O,c,l=!1;function u(){if(c)return c;let e=new m;e.setAttribute(`position`,new ut([0,0,0,1,0,0,0,0,1],3)),e.setAttribute(`normal`,new ut([0,1,0,0,1,0,0,1,0],3)),e.setAttribute(`color`,new ut([1,1,1,1,1,1,1,1,1],3));let t=[0,2].map(t=>new K(e,Xa(new j({side:t,flatShading:!0,vertexColors:!0}),{value:1})));t.push(new Ve(e,new j({side:0,flatShading:!0,vertexColors:!0}),1));for(let e of t)e.castShadow=!0,e.receiveShadow=!0;let n=[1,2].map(t=>{let n=Za({value:1});return n.side=t,new K(e,n)});return n.push(new Ve(e,new Qe({side:1}),1)),c={geometry:e,surfaces:t,depths:n}}let d=1,f=1,p=1,h=1;function g(){(d!==p||f!==h)&&(n.setSize(d,f),r.setSize(d,f),p=d,h=f,e.initRenderTarget(n),e.initRenderTarget(r))}function _(t,n){let r=e.getRenderTarget(),i=e.getActiveCubeFace?.()??0,a=e.getActiveMipmapLevel?.()??0;try{return e.setRenderTarget(t),n()}finally{e.setRenderTarget(r,i,a)}}function y(t,n){let r=[];try{t.traverse(e=>{e.visible&&(e.isMesh||e.isLine||e.isPoints||e.isSprite)&&(r.push(e),e.visible=!1)}),e.render(t,n)}finally{for(let e of r)e.visible=!0}}return{resize(e,t){d=e,f=t},async prepare(t,i,o){let c=e.shadowMap.enabled;_(n,()=>{g(),t&&o&&y(t,o)});function l(t,n,r,i){let a=e.shadowMap.enabled;try{return e.shadowMap.enabled=c,_(t,()=>e.compileAsync(n,r,i))}finally{e.shadowMap.enabled=a}}if(t&&o&&await l(n,t,o),t&&o)for(let e of u().surfaces)await l(n,e,o,t);if(t&&c){let e;if(t.traverseVisible(t=>{!e&&t.castShadow&&t.isDirectionalLight&&(e=t.shadow.camera)}),e)for(let r of u().depths)await l(n,r,e,t)}if(i&&o&&await l(r,i,o),await l(null,a,s),t&&o&&await l(null,t,o),t&&o)for(let e of u().surfaces)await l(null,e,o,t)},render(t,o,c,l){l<=.001?(e.setRenderTarget(null),e.render(t,c)):l>=.999?(e.setRenderTarget(null),e.render(o,c)):(g(),e.setRenderTarget(n),e.render(t,c),e.setRenderTarget(r),e.render(o,c),e.setRenderTarget(null),i.uniforms.blend.value=l,e.render(a,s))},dispose(){if(!l&&(l=!0,n.dispose(),r.dispose(),o.geometry.dispose(),i.dispose(),c)){c.geometry.dispose();for(let e of[...c.surfaces,...c.depths])e.material.dispose(),e.isInstancedMesh&&e.dispose();c=void 0}}}}function $a(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new m;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=eo(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=eo(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function eo(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new P(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var to=(e,t,n=0)=>({minX:e-n,minZ:t-n,maxX:e+n,maxZ:t+n}),no=(e,t)=>e.minX<=t.maxX&&e.maxX>=t.minX&&e.minZ<=t.maxZ&&e.maxZ>=t.minZ;function ro(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a.x),n=Math.min(n,a.z),r=Math.max(r,a.x),i=Math.max(i,a.z);return{minX:t,minZ:n,maxX:r,maxZ:i}}function io(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let{box:a}of e)t=Math.min(t,a.minX),n=Math.min(n,a.minZ),r=Math.max(r,a.maxX),i=Math.max(i,a.maxZ);return{minX:t,minZ:n,maxX:r,maxZ:i}}var ao=(e,t,n)=>Math.hypot(Math.max(e.minX-t,0,t-e.maxX),Math.max(e.minZ-n,0,n-e.maxZ)),oo=class{constructor(e,t=e=>e){this.items=e;let n=e=>{if(!e.length)return null;let t=io(e);if(e.length<=8)return{box:t,entries:e};let r=t.maxX-t.minX>=t.maxZ-t.minZ?`X`:`Z`;e.sort((e,t)=>e.box[`min${r}`]+e.box[`max${r}`]-(t.box[`min${r}`]+t.box[`max${r}`]));let i=e.length>>1;return{box:t,left:n(e.slice(0,i)),right:n(e.slice(i))}};this.root=n(e.map(e=>({item:e,box:t(e)})))}query(e){let t=[],n=r=>{if(r&&no(r.box,e)){if(r.entries)for(let n of r.entries)no(n.box,e)&&t.push(n.item);else n(r.left),n(r.right)}};return n(this.root),t}nearest(e,t,n,r=1/0,i=0){let a=r,o=r=>{if(!(!r||ao(r.box,e,t)-i>a)){if(r.entries)for(let o of r.entries)ao(o.box,e,t)-i<=a&&(a=Math.min(a,n(o.item)));else ao(r.left.box,e,t)<ao(r.right.box,e,t)?(o(r.left),o(r.right)):(o(r.right),o(r.left))}};return o(this.root),a}},so=class{constructor(e=24){this.size=e,this.cells=new Map}insert(e,t){let n={item:e,box:t};for(let e=Math.floor(t.minX/this.size);e<=Math.floor(t.maxX/this.size);e++)for(let r=Math.floor(t.minZ/this.size);r<=Math.floor(t.maxZ/this.size);r++){let t=`${e},${r}`;this.cells.has(t)||this.cells.set(t,[]),this.cells.get(t).push(n)}}query(e){let t=new Set,n=[];for(let r=Math.floor(e.minX/this.size);r<=Math.floor(e.maxX/this.size);r++)for(let i=Math.floor(e.minZ/this.size);i<=Math.floor(e.maxZ/this.size);i++)for(let a of this.cells.get(`${r},${i}`)??[])!t.has(a)&&no(a.box,e)&&(t.add(a),n.push(a.item));return n}},co=new WeakMap;function lo(e){let t=co.get(e);if(!t||t.count!==e.length){let n=e.flatMap((e,t)=>e.points.slice(1).map((n,r)=>{let i=e.points[r],a=ro([i,n]);return{a:i,b:n,index:r,line:e,lineIndex:t,box:a,...a}}));t={count:e.length,tree:new oo(n,e=>e.box)},co.set(e,t)}return t.tree}var uo=new WeakMap,fo=e=>ro(e.map(([e,t])=>({x:e,z:t})));function po(e){if(!uo.has(e)){let t=e.map(e=>({polygon:e,box:fo(e[0]),holes:new oo(e.slice(1),fo)}));uo.set(e,new oo(t,e=>e.box))}return uo.get(e)}function mo(e,t){if(!e?.length)return[];let n=po(e).query(t).map(({polygon:e,holes:n})=>[e[0],...n.query(t)]);if(!n.length)return[];let r=[[[t.minX,t.minZ],[t.maxX,t.minZ],[t.maxX,t.maxZ],[t.minX,t.maxZ],[t.minX,t.minZ]]];return q.intersection(n,[r])}var ho=Object.freeze([`farmland`,`forest`,`plains`,`desert`,`ocean`,`mountain`]),go=.9,_o=ho.slice(0,4),vo=1e-7,yo=new WeakMap,bo=new WeakMap,xo=new WeakMap;function So(e){return xo.has(e)||xo.set(e,{bounds:ro(e.map(([e,t])=>({x:e,z:t}))),edges:null,tree:null}),xo.get(e)}function Co(e,t){t.edges||(t.edges=e.map((t,n)=>{let r=e[(n+e.length-1)%e.length];return{a:r,b:t,box:ro([{x:r[0],z:r[1]},{x:t[0],z:t[1]}])}}),e.length>32&&(t.tree=new oo(t.edges,e=>e.box)))}function wo(e){if(!bo.has(e)){let t=e.map(e=>({polygon:e,box:So(e[0]).bounds,holes:new oo(e.slice(1),e=>So(e).bounds)}));bo.set(e,{polygons:new oo(t,e=>e.box),edges:null})}return bo.get(e)}function To(e){let t=wo(e);if(!t.edges){let n=[];for(let t of e)for(let e of t)for(let t=1;t<e.length;t++){let r=e[t-1],i=e[t];n.push({a:r,b:i,box:ro([{x:r[0],z:r[1]},{x:i[0],z:i[1]}])})}t.edges=new oo(n,e=>e.box)}return t.edges}function Eo(e){let t=2166136261;for(let n of`biomes:${e}`)t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Do(e,t){if(!e)throw TypeError(`Invalid biomes: ${t}`)}function Oo(e){let t=e.map(e=>[Number(e[0]),Number(e[1])]);return t.length&&(t[0][0]!==t.at(-1)[0]||t[0][1]!==t.at(-1)[1])&&t.push([...t[0]]),t}function ko(e){return e.map(e=>e.map(e=>e.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6])))}function Ao(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t/2}function jo(e){return e.reduce((e,t)=>e+Math.abs(Ao(t[0]))-t.slice(1).reduce((e,t)=>e+Math.abs(Ao(t)),0),0)}function Mo(e,t,n,r){let i=r[0]-n[0],a=r[1]-n[1],o=Math.max(0,Math.min(1,((e-n[0])*i+(t-n[1])*a)/(i*i+a*a||1)));return Math.hypot(e-n[0]-o*i,t-n[1]-o*a)}function No(e,t,n){let r=So(e),i=r.bounds;if(t<i.minX-vo||t>i.maxX+vo||n<i.minZ-vo||n>i.maxZ+vo)return!1;Co(e,r);let a=!1,o=r.tree?r.tree.query({minX:t-vo,maxX:1/0,minZ:n-vo,maxZ:n+vo}):r.edges;for(let{a:e,b:r,box:i}of o){if(t>=i.minX-vo&&t<=i.maxX+vo&&n>=i.minZ-vo&&n<=i.maxZ+vo&&Mo(t,n,e,r)<vo)return!0;e[1]>n!=r[1]>n&&t<(r[0]-e[0])*(n-e[1])/(r[1]-e[1])+e[0]&&(a=!a)}return a}function Po(e,t,n){let r=to(t,n,vo);return wo(e).polygons.query(r).some(({polygon:e,holes:i})=>No(e[0],t,n)&&!i.query(r).some(e=>No(e,t,n)))}function Fo(e,t,n){let r=To(e).nearest(t,n,e=>Mo(t,n,e.a,e.b));return Po(e,t,n)?r:-r}function Io(e,t,n,r=32){return Oo(Array.from({length:r},(i,a)=>[e+Math.cos(a/r*Math.PI*2)*n,t+Math.sin(a/r*Math.PI*2)*n]))}function Lo(e,t){if(!e.length)return[];let n=[e];for(let r of e)for(let e of r)for(let r=1;r<e.length;r++){let i=e[r-1],a=e[r],o=Math.hypot(a[0]-i[0],a[1]-i[1]);if(o<vo)continue;let s=-(a[1]-i[1])/o*t,c=(a[0]-i[0])/o*t;n.push([[Oo([[i[0]+s,i[1]+c],[a[0]+s,a[1]+c],[a[0]-s,a[1]-c],[i[0]-s,i[1]-c]])]]),n.push([[Io(i[0],i[1],t/Math.cos(Math.PI/12),12)]])}return q.union(...n)}function Ro(e,t,n){return lo(e.lines??[]).nearest(t,n,e=>Mo(t,n,[e.a.x,e.a.z],[e.b.x,e.b.z]))}function zo(e,t,n,r){let i=.9500000000000001;return(e.cities||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+(e.radius||0)+i+1)||(e.stations||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+e.radius+i+.5)||(e.mountains||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+e.radius+i+.5)?!1:Ro(e,t,n)>=r+i+1.8}function Bo(e,t,n){let r=e.outline,i=Math.sign(Ao(r)),a=Math.min(e.bounds.width,e.bounds.depth),o=null;for(let s of[1,.84,.68,.52,.36]){let c=a*.19*s;for(let a=0;a<r.length;a++){let s=r[a],l=r[(a+1)%r.length],u=Math.hypot(l[0]-s[0],l[1]-s[1]);if(u<vo)continue;let d=(l[1]-s[1])/u*i,f=-(l[0]-s[0])/u*i;for(let r of[.2,.35,.5,.65,.8]){let i=r+(n()-.5)*.035,a=s[0]+(l[0]-s[0])*i+d*c*.28,u=s[1]+(l[1]-s[1])*i+f*c*.28;if(!zo(e,a,u,c))continue;let p=q.intersection(t,[[Io(a,u,c)]]),m=jo(p);(!o||m>o.score)&&(o={polygons:p,score:m})}}if(o)break}return o?.polygons||[]}function Vo(e,t,n,r){let i=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]);return i(e,t,n)*i(e,t,r)<0&&i(n,r,e)*i(n,r,t)<0}function Ho(e,t){let n=1/0;for(let r=1;r<e.points.length;r++){let i=[e.points[r-1].x,e.points[r-1].z],a=[e.points[r].x,e.points[r].z];if(Po(t,...i)||Po(t,...a))return 0;for(let e of t)for(let t of e)for(let e=1;e<t.length;e++){let r=t[e-1],o=t[e];if(Vo(i,a,r,o))return 0;n=Math.min(n,Mo(...i,r,o),Mo(...a,r,o),Mo(...r,i,a),Mo(...o,i,a))}}return n}function Uo(e,t,n){Do(Array.isArray(n.points)&&n.points.length>=3&&n.points.every(e=>Array.isArray(e)&&e.length>=2&&e.every(Number.isFinite)),`ocean.points requires at least three finite [x,z] coordinates`);let r=Oo(n.points);Do(Math.abs(Ao(r))>vo,`ocean polygon must have positive area`);let i=q.intersection(t,[[r]]);Do(i.length>0,`ocean polygon must intersect the island`);let a=Oo(e.outline);Do(i.some(e=>e[0].some(e=>a.slice(1).some((t,n)=>Mo(...e,a[n],t)<1e-5))),`ocean must connect to the coast`);let o=.9500000000000001;for(let t of e.cities||[])Do(Fo(i,t.x,t.z)<=-(t.radius||0)-o-1,`ocean and shore must stay outside city footprints`);for(let t of e.mountains||[])Do(Fo(i,t.x,t.z)<=-t.radius-o-.5,`ocean and shore must stay outside mountain footprints`);for(let t of e.stations||[])Do(Fo(i,t.x,t.z)<=-t.radius-o-.5,`ocean and shore must stay outside station footprints`);for(let t of e.lines||[])Do(Ho(t,i)>=2.75,`ocean and shore must stay outside complete railway corridors`);return i}function Wo(e,t,n,r){let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=o[0]*t+o[1]*n-r,l=s[0]*t+s[1]*n-r;if(c<=vo&&i.push(o),c<=vo!=l<=vo){let e=c/(c-l);i.push([o[0]+(s[0]-o[0])*e,o[1]+(s[1]-o[1])*e])}}return i}function Go(e,t,n){if(t.sites!==void 0){Do(Array.isArray(t.sites)&&t.sites.length>0,`sites must contain at least one land biome`);let n=t.sites.map((e,t)=>({...e,id:String(e.id??`biome-${t+1}`)}));Do(n.every(e=>_o.includes(e.type)&&Number.isFinite(e.x)&&Number.isFinite(e.z)),`sites need a farmland, forest, plains or desert type and finite x/z`),Do(new Set(n.map(e=>e.id)).size===n.length,`site IDs must be unique`);for(let t=0;t<n.length;t++){Do(No(e.outline,n[t].x,n[t].z),`sites must lie inside the island`);for(let e=0;e<t;e++)Do(Math.hypot(n[t].x-n[e].x,n[t].z-n[e].z)>vo,`sites must have distinct positions`)}return n}return[[`farmland`,-.24,.15],[`forest`,-.26,-.24],[`plains`,.06,.24],[`desert`,.29,-.14]].map(([t,r,i])=>({id:`biome-${t}`,type:t,x:(r+(n()-.5)*.09)*e.bounds.width,z:(i+(n()-.5)*.09)*e.bounds.depth}))}function Ko(e,t={}){Do(t&&typeof t==`object`&&!Array.isArray(t),`configuration must be an object`),Do(Array.isArray(e.outline)&&e.outline.length>=3,`a valid world outline is required`);let n=Eo(e.seed),r=[[Oo(e.outline)]],i=Go(e,t,n),a=t.geography,o=a?q.intersection(r,a.ocean):t.ocean===!1?[]:t.ocean===void 0?Bo(e,r,n):Uo(e,r,t.ocean),s=!a&&o.length?q.intersection(r,Lo(o,go)):[],c=a?q.intersection(r,a.oceanShore):o.length?q.difference(s,o):[],l=a?q.intersection(r,a.landInterior):s.length?q.difference(r,s):r,u=(e.mountains||[]).map(e=>[[Oo(e.range?.polygon??Io(e.x,e.z,e.radius,48)),...(e.range?.holes??[]).map(Oo)]]),d=u.length?q.intersection(l,q.union(...u)):[],f=d.length?q.difference(l,d):l,p=e.outline.map(e=>e[0]),m=e.outline.map(e=>e[1]),h=[[Math.min(...p)-1,Math.min(...m)-1],[Math.max(...p)+1,Math.min(...m)-1],[Math.max(...p)+1,Math.max(...m)+1],[Math.min(...p)-1,Math.max(...m)+1]],g=[],_=[];for(let t of i){let n=h;for(let e of i)if(e!==t&&(n=Wo(n,e.x-t.x,e.z-t.z,(e.x*e.x+e.z*e.z-t.x*t.x-t.z*t.z)/2),n.length<3))break;let r=n.length>=3?q.intersection(f,[[Oo(n)]]):[];if(r.length&&g.push({id:t.id,type:t.type,...t.ice===!0?{ice:!0}:{},polygons:r}),e.surface?.complete&&t.ice===!0&&n.length>=3){let e=d.length?q.intersection(l,[[Oo(n)]]):r;e.length&&_.push(e)}}return d.length&&g.push({id:`biome-mountain`,type:`mountain`,polygons:d}),o.length&&g.push({id:`biome-ocean`,type:`ocean`,polygons:o}),a?.lakes?.length&&g.push({id:`biome-lakes`,type:`ocean`,polygons:a.lakes}),{regions:g.map(e=>({...e,polygons:ko(e.polygons)})),..._.length?{ice:ko(q.union(..._))}:{},land:ko(l),ocean:ko(o),oceanShore:ko(c),lakeShore:ko(a?.lakeShore??[]),shoreWidth:go,sites:i}}function qo(e){return e.biomes||e}function Jo(e,t){let n=qo(e),r=[...new Set(Array.isArray(t)?t:[t])].sort(),i=yo.get(n);i||(i=new Map,yo.set(n,i));let a=r.join(`|`);if(!i.has(a)){let e=r.flatMap(e=>e===`shore`?[n.oceanShore,n.lakeShore]:e===`ice`?[n.ice]:n.regions.filter(t=>t.type===e).map(e=>e.polygons)).filter(e=>e?.length);i.set(a,e.length?q.union(...e):[])}return i.get(a)}var Yo=e=>e.surface?.complete&&e.surface.projection?.type===`equirectangular`?e.surface.projection:null;function Xo(e,t){let n=Yo(e);if(!n)return t;let r=Math.PI*n.radius,i=r*2;return t>=-r&&t<r?t:((t+r)%i+i)%i-r}function Zo(e,t,n,r,i){let a=Yo(e);if(!a)return t;let o=Math.PI*a.radius,s=o*2;if(n-i>-o&&n+i<o)return t;if(i>=s)return[];let c=to(n,r,i+Math.max(1e-5,i*1e-6)),l=[],u=Math.ceil((c.minX-o)/s),d=Math.floor((c.maxX+o)/s);for(let e=u;e<=d;e++){let n=e*s,r=mo(t,{...c,minX:c.minX-n,maxX:c.maxX-n});r.length&&l.push(r.map(e=>e.map(e=>e.map(([e,t])=>[(Math.abs(e-o)<1e-6?o:Math.abs(e+o)<1e-6?-o:e)+n,t]))))}return l.length?q.union(...l):[]}function Qo(e,t,n){t=Xo(e,t);let r=qo(e);for(let e of r.regions)if(Po(e.polygons,t,n))return e.type;return Po(r.oceanShore,t,n)||Po(r.lakeShore??[],t,n)?`shore`:null}function $o(e,t,n,r){return Fo(Jo(e,t),Xo(e,n),r)}function es(e,t,n,r,i=0){if(!Number.isFinite(i)||i<0)return!1;n=Xo(e,n);let a=Zo(e,Jo(e,t),n,r,i),o=i-vo;return o<=0?Fo(a,n,r)>=o:Po(a,n,r)?To(a).nearest(n,r,e=>Mo(n,r,e.a,e.b),o)>=o:!1}var ts=Math.PI*2,ns=1e-8,rs=e=>(e%ts+ts)%ts,is=(e,t,n)=>Math.max(t,Math.min(n,e)),as=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),os=e=>Number.isFinite(e.heading)?e.heading:Math.atan2(e.tangent.z,e.tangent.x);function ss(e,t,n=.42,r={}){let i=as(e,t);return i<ns?null:{...r,type:`line`,start:{x:e.x,y:n,z:e.z},end:{x:t.x,y:n,z:t.z},heading:Math.atan2(t.z-e.z,t.x-e.x),length:i,curvature:0}}function cs(e,t,n,r,i,a){let o=Math.atan2(t.z-e.z,t.x-e.x),s=r*rs(r*(Math.atan2(n.z-e.z,n.x-e.x)-o));return Math.abs(s)>ts-1e-7&&(s=0),Math.abs(s)<ns?null:{type:`arc`,center:{x:e.x,z:e.z},radius:i,startAngle:o,sweep:s,start:{x:t.x,y:a,z:t.z},end:{x:n.x,y:a,z:n.z},length:Math.abs(s)*i,curvature:r/i}}function ls(e,t,n,r){return{x:e.x-Math.sin(t)*n*r,z:e.z+Math.cos(t)*n*r}}function us(e,t){let n=0,r=e.filter(Boolean).map(e=>{let t={...e,startDistance:n};return n+=e.length,{...t,endDistance:n}});return{segments:r,length:n,minRadius:t,maxCurvature:r.reduce((e,t)=>Math.max(e,Math.abs(t.curvature)),0)}}function ds(e,t,{radius:n=8,y:r=.42}={}){if(!Number.isFinite(n)||n<=0)throw TypeError(`Railway minimum turning radius must be positive and finite`);let i=os(e),a=os(t),o=[],s=e=>{let r=us(e,n);if(r.length<ns)return;let i=ps(r,r.length);as(i,t)>1e-5||Math.cos(i.heading-a)<1-1e-7||o.push(r)};for(let o of[-1,1])for(let c of[-1,1]){let l=ls(e,i,o,n),u=ls(t,a,c,n),d=as(l,u);if(d<ns){o===c&&s([cs(l,e,t,o,n,r)]);continue}let f=Math.atan2(u.z-l.z,u.x-l.x);if(o!==c){if(d<2*n-ns)continue;f+=Math.asin(is(2*o*n/d,-1,1))}let p={x:l.x+o*Math.sin(f)*n,z:l.z-o*Math.cos(f)*n},m={x:u.x+c*Math.sin(f)*n,z:u.z-c*Math.cos(f)*n};s([cs(l,e,p,o,n,r),ss(p,m,r),cs(u,m,t,c,n,r)])}for(let o of[-1,1]){let c=ls(e,i,o,n),l=ls(t,a,o,n),u=as(c,l);if(u<ns||u>4*n)continue;let d=(c.x+l.x)/2,f=(c.z+l.z)/2,p=Math.sqrt(Math.max(0,4*n*n-u*u/4)),m=-(l.z-c.z)/u,h=(l.x-c.x)/u;for(let i of[-1,1]){let a={x:d+m*p*i,z:f+h*p*i},u={x:(c.x+a.x)/2,z:(c.z+a.z)/2},g={x:(l.x+a.x)/2,z:(l.z+a.z)/2};s([cs(c,e,u,o,n,r),cs(a,u,g,-o,n,r),cs(l,g,t,o,n,r)])}}return o.sort((e,t)=>e.length-t.length)}function fs(e,t,n){let r=is(t,0,e.length),i=e.segments;if(!i.length)throw TypeError(`An alignment must contain a nonzero segment`);let a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;i[e].endDistance<r-ns?a=e+1:o=e}let s=i[a],c=is(r-s.startDistance,0,s.length)/s.length,l,u,d;if(s.type===`line`)l=s.start.x+(s.end.x-s.start.x)*c,u=s.start.z+(s.end.z-s.start.z)*c,d=s.heading;else{let e=s.startAngle+s.sweep*c;l=s.center.x+Math.cos(e)*s.radius,u=s.center.z+Math.sin(e)*s.radius,d=e+Math.sign(s.sweep)*Math.PI/2}let f=n.tangent??={x:0,y:0,z:0},p=Math.cos(d),m=Math.sin(d);if(n.chartSpeed=1,s.chartTransform){let e=s.chartTransform,t=e.x+e.xx*l+e.xz*u,r=e.z+e.zx*l+e.zz*u,i=e.xx*p+e.xz*m,a=e.zx*p+e.zz*m,o=Math.hypot(i,a);l=t,u=r,p=i/o,m=a/o,d=Math.atan2(m,p),n.chartSpeed=o}return f.x=p,f.y=0,f.z=m,n.x=l,n.y=s.start.y,n.z=u,n.distance=r,n.heading=d,n.angle=Math.atan2(f.x,f.z),n.curvature=s.curvature,n}function ps(e,t){return fs(e,t,{tangent:{x:0,y:0,z:0}})}function ms(e,t=.35){let n=[],r=[];for(let i of e.segments){let a=Math.max(1,Math.ceil(i.length/t));for(let t=0;t<a;t++){let o=i.startDistance+i.length*t/a;if(r.length&&o-r.at(-1)<ns)continue;let s=ps(e,o);n.push({x:s.x,y:s.y,z:s.z}),r.push(o)}}let i=ps(e,e.length);return n.push({x:i.x,y:i.y,z:i.z}),r.push(e.length),{points:n,distances:r,length:e.length}}function hs(e,t=8){return us(e.flatMap(e=>e?.segments??(e?[e]:[])),t)}function gs(e,t,{radius:n=8,y:r=.42,waypoints:i=[],isAllowed:a=()=>!0}={}){let o=[e,...i,t],s=o.map((e,t)=>{if(t===0||t===o.length-1)return{...e,heading:os(e)};if(Number.isFinite(e.heading))return e;let n=o[t-1],r=o[t+1];return{...e,heading:Math.atan2(r.z-n.z,r.x-n.x)}}),c=[];for(let e=1;e<s.length;e++){if(as(s[e-1],s[e])<ns)continue;let t=ds(s[e-1],s[e],{radius:n,y:r}).find(e=>e.segments.every(e=>e.type!==`arc`||Math.abs(e.sweep)<=Math.PI+1e-7)&&e.segments.reduce((e,t)=>e+(t.type===`arc`?Math.abs(t.sweep):0),0)<=Math.PI*1.5+1e-7&&ms(e,.45).points.every(a));if(!t)throw TypeError(`Invalid world: waypoints cannot fit the outline and minimum turning radius without a railway loop`);c.push(t)}let l=hs(c,n);if(!l.segments.length)throw TypeError(`Invalid world: railway alignment has no length`);return l}var _s=new WeakMap,vs=Math.PI*2,ys=16;function bs(e){let t=2166136261;for(let n of e)t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function xs(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function Ss(e){return`${e.id??`mountain`}:${e.x}:${e.z}:${e.radius}:${e.height}`}function Cs(e){if(e.range)return gt(e,e.renderBounds);let t=Ss(e),n=_s.get(e);if(n?.key===t)return n.data;let r=bs(t),i=r()*vs,a=i+.72,o=i+3.65,s=[],c=[],l=[.21,.44,.7,1],u=Array.from({length:ys},(e,t)=>i+t/ys*vs+(r()-.5)*.15),d=u.map(()=>.86+r()*.14),f={x:e.x+Math.cos(i-.3)*e.radius*.075,y:e.height,z:e.z+Math.sin(i-.3)*e.radius*.075};s.push(f);for(let t=0;t<l.length;t++)for(let n=0;n<ys;n++){let i=u[n],c=Math.max(Math.exp(-((xs(i,a)/.43)**2)),.88*Math.exp(-((xs(i,o)/.47)**2))),f=l[t]*(t===3?d[n]:.91+r()*.15),p=t===0?.67+r()*.12-c*.04:t===1?.41+c*.39+r()*.055:t===2?.16+c*.2+r()*.065:0,m=i+(t===3?0:Math.sin(n*1.7+t)*.035);s.push({x:e.x+Math.cos(m)*e.radius*f,y:e.height*p,z:e.z+Math.sin(m)*e.radius*f})}let p=(e,t,n)=>{let r=s[e],i=s[t],a=s[n],o=(i.z-r.z)*(a.x-r.x)-(i.x-r.x)*(a.z-r.z);c.push(o>0?[e,t,n]:[e,n,t])};for(let e=0;e<ys;e++)p(0,1+e,1+(e+1)%ys);for(let e=0;e<l.length-1;e++)for(let t=0;t<ys;t++){let n=(t+1)%ys,r=1+e*ys,i=r+ys;(t+e)%2?(p(r+t,i+t,r+n),p(r+n,i+t,i+n)):(p(r+t,i+t,i+n),p(r+t,i+n,r+n))}let m=s.length;s.push({x:e.x,y:0,z:e.z});let h=c.map(e=>[...e]),g=1+(l.length-1)*ys;for(let e=0;e<ys;e++)h.push([m,g+e,g+(e+1)%ys]);let _=c.map(([e,t,n])=>{let r=s[e],i=s[t],a=s[n];return{p:r,q:i,r:a,minX:Math.min(r.x,i.x,a.x),maxX:Math.max(r.x,i.x,a.x),minZ:Math.min(r.z,i.z,a.z),maxZ:Math.max(r.z,i.z,a.z),denominator:(i.z-a.z)*(r.x-a.x)+(a.x-i.x)*(r.z-a.z)}}),v={vertices:s,triangles:h,surfaceTriangles:c,snowLine:e.height*.64,phase:i};return _s.set(e,{key:t,data:v,lookup:_}),v}function ws(e,t,n){if(e.range)return V(e,t,n);if(Math.hypot(t-e.x,n-e.z)>e.radius+1e-7)return 0;Cs(e);for(let{p:r,q:i,r:a,minX:o,maxX:s,minZ:c,maxZ:l,denominator:u}of _s.get(e).lookup){if(t<o-1e-8||t>s+1e-8||n<c-1e-8||n>l+1e-8)continue;let e=((i.z-a.z)*(t-a.x)+(a.x-i.x)*(n-a.z))/u,d=((a.z-r.z)*(t-a.x)+(r.x-a.x)*(n-a.z))/u,f=1-e-d;if(e>=-1e-7&&d>=-1e-7&&f>=-1e-7)return Math.max(0,e*r.y+d*i.y+f*a.y)}return 0}function Ts(e,t,n){if(e.range)return qe(e,t,n);let{phase:r}=Cs(e),i=Math.atan2(n-e.z,t-e.x);return e.height*(.72+.045*Math.sin(i*3+r)+.025*Math.sin(i*7-r))}function Es(e,t,n){return e.range?ct(e,t,n):Math.hypot(t-e.x,n-e.z)-e.radius}var Ds=Object.freeze([Object.freeze({id:`coral`,name:`Coral Railway`,color:Object.freeze({l:.65,c:.18,h:28})}),Object.freeze({id:`teal`,name:`Teal Railway`,color:Object.freeze({l:.64,c:.12,h:185})}),Object.freeze({id:`gold`,name:`Golden Railway`,color:Object.freeze({l:.75,c:.15,h:83})}),Object.freeze({id:`blue`,name:`Blue Railway`,color:Object.freeze({l:.61,c:.16,h:255})})]),Os=e=>{throw TypeError(`Invalid world: ${e}`)},ks=(e,t,n)=>Math.max(t,Math.min(n,e));function As(e){if(typeof e==`string`&&/^#[\da-f]{6}$/i.test(e)){let[t,n,r]=[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255).map(e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*r),a=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*r),o=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*r),s=.2104542553*i+.793617785*a-.0040720468*o,c=1.9779984951*i-2.428592205*a+.4505937099*o,l=.0259040371*i+.7827717662*a-.808675766*o;return{l:ks(s,0,1),c:Math.min(.4,Math.hypot(c,l)),h:(Math.atan2(l,c)*180/Math.PI+360)%360}}return(!e||typeof e!=`object`||![e.l,e.c,e.h].every(Number.isFinite)||e.l<0||e.l>1||e.c<0||e.c>.4)&&Os(`player colors require OKLCH {l:0..1,c:0..0.4,h:finite} or #RRGGBB`),{l:e.l,c:e.c,h:(e.h%360+360)%360}}function js(e=Ds){(!Array.isArray(e)||e.length<1)&&Os(`at least one player is required`);let t=e.map((e,t)=>{e&&typeof e==`object`||Os(`players require objects`);let n=String(e.id??`player-${t+1}`);return n.trim()||Os(`player IDs must not be empty`),{id:n,name:String(e.name??`Railway ${t+1}`),color:As(e.color??Ds[t%4].color)}});return new Set(t.map(e=>e.id)).size!==t.length&&Os(`player IDs must be unique`),t}function Ms(e,t){let n=2166136261;for(let r of`${e}:city:${t}`)n=Math.imul(n^r.charCodeAt(0),16777619);return()=>{n+=1831565813;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ns(e){(!Number.isInteger(e)||e<1||e>10)&&Os(`city levels must be integers from 1 through 10`);let t=[`house`];return e>=2&&t.push(`landmark`),e>=4&&t.push(`apartment`,`plaza`),e>=6&&t.push(`civic`),e>=8&&t.push(`tower`),{radius:[9,10.5,12,13.5,16,19,22,25,28,31][e-1],buildingBudget:[6,10,15,21,28,36,45,55,67,80][e-1],streetWidth:e>=7?.72:e>=4?.62:.52,streetSpacing:e>=4?7.8:5.4,features:t}}var Ps=Object.freeze({house:1.56,landmark:2,apartment:2.05,civic:2.8,plaza:2.6,tower:2.1}),Fs=new WeakMap,Is=1e-8,Ls=1.6;function Rs(e,t){let n=e.surface??null,r=t.scale??1,i=t.rotation??0,a=t.y??0,o=Fs.get(t);if(o&&o.surface===n&&o.x===t.x&&o.z===t.z&&o.y===a&&o.rotation===i&&o.scale===r&&o.width===t.width&&o.depth===t.depth&&o.outline===t.footprint)return o;let s=t.footprint??[[-t.width/2,-t.depth/2],[t.width/2,-t.depth/2],[t.width/2,t.depth/2],[-t.width/2,t.depth/2]],c=St(e,t.x,a,t.z,i,new ie).elements,l=new Float64Array(s.length*3);for(let e=0;e<s.length;e++){let t=s[e][0]*r,n=s[e][1]*r;l[e*3]=c[0]*t+c[8]*n+c[12],l[e*3+1]=c[1]*t+c[9]*n+c[13],l[e*3+2]=c[2]*t+c[10]*n+c[14]}return o={surface:n,x:t.x,y:a,z:t.z,rotation:i,scale:r,width:t.width,depth:t.depth,outline:t.footprint,points:l,up:[c[4],c[5],c[6]],center:[c[12],c[13],c[14]]},Fs.set(t,o),o}function zs(e,t,n,r){let i=new Float64Array(e.length/3*2);for(let a=0,o=0;a<e.length;a+=3,o+=2){let s=e[a]-t[0],c=e[a+1]-t[1],l=e[a+2]-t[2];i[o]=s*n[0]+c*n[1]+l*n[2],i[o+1]=s*r[0]+c*r[1]+l*r[2]}return i}function Bs(e,t,n){for(let r of[e,t])for(let i=0;i<r.length;i+=2){let a=(i+2)%r.length,o=r[a]-r[i],s=r[a+1]-r[i+1],c=Math.hypot(o,s);if(c<Is)continue;let l=-s/c,u=o/c,d=1/0,f=-1/0,p=1/0,m=-1/0;for(let t=0;t<e.length;t+=2){let n=e[t]*l+e[t+1]*u;d=Math.min(d,n),f=Math.max(f,n)}for(let e=0;e<t.length;e+=2){let n=t[e]*l+t[e+1]*u;p=Math.min(p,n),m=Math.max(m,n)}if(p-f>=n-Is||d-m>=n-Is)return!0}return!1}function Vs(e,t,n,r=0){let i=Math.max(0,r),a=t.radius??Math.hypot(t.width,t.depth)*(t.scale??1)/2,o=n.radius??Math.hypot(n.width,n.depth)*(n.scale??1)/2,s=We(e,t,n);if(s>=a+o+i)return!1;let c=Rs(e,t),l=Rs(e,n),u=c.center.map((e,t)=>(e+l.center[t])/2),d=c.up.map((e,t)=>e+l.up[t]),f=Math.hypot(...d);if(f<Is)return!0;for(let e=0;e<3;e++)d[e]/=f;let p=Math.abs(d[1])<.9?[d[2],0,-d[0]]:[0,-d[2],d[1]],m=Math.hypot(...p);p=p.map(e=>e/m);let h=[p[1]*d[2]-p[2]*d[1],p[2]*d[0]-p[0]*d[2],p[0]*d[1]-p[1]*d[0]],g=e.surface?.radius,_=g?2*Ls*Math.sin(Math.min(Math.PI/2,s/(2*g)))+(a+o)*(1-Math.cos(Math.min(Math.PI/2,(a+o)/g))):0;return!Bs(zs(c.points,u,p,h),zs(l.points,u,p,h),i+_)}function Hs(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Us=e=>Math.abs(e.reduce((t,n,r)=>{let i=e[(r+1)%e.length];return t+n[0]*i[1]-i[0]*n[1]},0)/2);function Ws(e){return e.reduce((e,t)=>e+Us(t[0])-t.slice(1).reduce((e,t)=>e+Us(t),0),0)}var Gs=e=>({minX:Math.min(...e.map(e=>e[0])),maxX:Math.max(...e.map(e=>e[0])),minZ:Math.min(...e.map(e=>e[1])),maxZ:Math.max(...e.map(e=>e[1]))});function Ks(e,t,n,r){let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=o[0]*t+o[1]*n-r,l=s[0]*t+s[1]*n-r;if(c<=0&&i.push(o),c<0!=l<0){let e=c/(c-l);i.push([o[0]+(s[0]-o[0])*e,o[1]+(s[1]-o[1])*e])}}return i}var qs=[[`wheat`,`fallow`,`pasture`],[`pasture`,`wheat`,`orchard`],[`orchard`,`pasture`,`wheat`],[`vegetables`,`wheat`,`pasture`]];function Js(e,t,n){let r=Hs(`${n}:boundary`),i=e/2-.12,a=t/2-.12,o=()=>.25+r()*Math.min(e,t)*.16;return[[-i+o(),-a],[i-o(),-a],[i,-a+o()],[i,a-o()],[i-o(),a],[-i+o(),a],[-i,a-o()],[-i,-a+o()]]}function Ys(e,t,n,r,i){let a=Hs(n),o=[i],s=Math.max(1,Math.min(6,Math.round(e*t/(100+a()*65))));for(let e=0;o.length<s&&e<s*5;e++){let e=o.reduce((e,t,n)=>Us(t)>Us(o[e])?n:e,0),t=o[e],n=Gs(t),r=(n.maxX-n.minX)*(a()*.45+.8)>n.maxZ-n.minZ,i=(a()-.5)*.65,s=r?1:i,c=r?i:1,l=t.map(([e,t])=>e*s+t*c),u=Math.min(...l),d=u+(Math.max(...l)-u)*(.28+a()*.44),f=.24+a()*.16,p=Ks(t,s,c,d-f/2),m=Ks(t,-s,-c,-d-f/2);p.length<3||m.length<3||Math.min(Us(p),Us(m))<26||o.splice(e,1,p,m)}return o.map((e,t)=>{let n=Gs(e),i=(n.minX+n.maxX)/2,o=(n.minZ+n.maxZ)/2,s=a()<.72?r[0]:r[1+Math.floor(a()*2)],c=Math.floor(a()*1e8),l=e.reduce((t,n)=>[t[0]+n[0]/e.length,t[1]+n[1]/e.length],[0,0]),u=Math.floor(a()*e.length),d=e[u],f=e[(u+1)%e.length],p=[l[0]*.5+(d[0]+f[0])*.25-i,l[1]*.5+(d[1]+f[1])*.25-o];return{x:i,z:o,width:n.maxX-n.minX,depth:n.maxZ-n.minZ,polygon:e.map(([e,t])=>[e-i,t-o]),crop:s,variant:Math.floor(a()*3),rowsAngle:(a()<.2?0:Math.PI/2)+(a()-.5)*.12,rowPitch:.72+a()*.38,tone:.25+a()*.5,detailSeed:c,featurePosition:p,hedgeEdges:e.map((e,t)=>t).filter(()=>a()<.16),feature:t===0&&Us(e)>85&&a()<.2?`barn`:s===`wheat`&&a()<.17?`bales`:s===`pasture`&&a()<.12?`trough`:null}})}function Xs(e,{density:t=1,canPlace:n,add:r}={}){if(typeof n!=`function`||typeof r!=`function`)throw TypeError(`Farmland requires canPlace and add callbacks`);let i=(e.biomes?.regions??[]).filter(e=>e.type===`farmland`),a=e.detailRegion,o=i.reduce((e,t)=>e+Ws(t.polygons),0),s=a?Math.min(o,(a.maxX-a.minX)*(a.maxZ-a.minZ)):o,c=Math.max(0,Math.min(3,Number(t)||0)),l={districts:[],area:0,cultivatedArea:0,targetArea:s*Math.min(.5,.28*c)};if(!c||!s)return l;let u=[];for(let t of i){let n=Hs(`${e.seed}:farmland:${t.id}`),r=(n()-.5)*Math.PI/3,i=Math.cos(r),o=Math.sin(r),s=n()*56,c=n()*56,l=Gs(t.polygons.flatMap(e=>e[0]));if(a&&(l.minX=Math.max(l.minX,a.minX),l.maxX=Math.min(l.maxX,a.maxX),l.minZ=Math.max(l.minZ,a.minZ),l.maxZ=Math.min(l.maxZ,a.maxZ)),l.maxX<=l.minX||l.maxZ<=l.minZ)continue;let d=Gs([[l.minX,l.minZ],[l.maxX,l.minZ],[l.maxX,l.maxZ],[l.minX,l.maxZ]].map(([e,t])=>[e*i-t*o,e*o+t*i]));for(let n=Math.floor((d.minX-s-38)/56);n<=Math.ceil((d.maxX-s+38)/56);n++)for(let a=Math.floor((d.minZ-c-38)/56);a<=Math.ceil((d.maxZ-c+38)/56);a++){let d=`${t.id}-${n}-${a}`,f=Hs(`${e.seed}:farm-cluster:${d}`),p=n*56+s+(f()-.5)*12,m=a*56+c+(f()-.5)*12,h=p*i+m*o,g=-p*o+m*i,_=r+(f()-.5)*.22,v=f()*Math.PI*2,y=qs[Math.floor(f()*qs.length)],b=f()*4;if(!(h<l.minX-38||h>l.maxX+38||g<l.minZ-38||g>l.maxZ+38))for(let t=0;t<28;t++){let n=v+t*2.399963229728653,r=6.2*Math.sqrt(t),i=h+Math.cos(n)*r,a=g+Math.sin(n)*r;if(i<l.minX||i>l.maxX||a<l.minZ||a>l.maxZ)continue;let o=$o(e,`farmland`,i,a);if(o<4.1)continue;let s=Hs(`${e.seed}:${d}:${t}`);u.push({x:i,z:a,rotation:Me(e,i,a,_),clusterId:d,family:y,clearance:o,seed:`${e.seed}:${d}:${t}`,width:22+s()*8,depth:16+s()*8,score:b+Math.min(o,18)*.18-r*.21})}}}u.sort((e,t)=>t.score-e.score||e.x-t.x||e.z-t.z);for(let t of[1,.7,.46])for(let i of u){if(l.area>=l.targetArea)return l;if(i.used)continue;let a=i.width*t,o=i.depth*t,s=Math.hypot(a,o)/2,c=Js(a,o,i.seed),u=null,d=1/0;for(let t of l.districts){let n=We(e,i,t);n<d&&n<s+t.radius+10&&(u=t,d=n)}let f=[];if(u){let t=at(e,u,i),n=Pt(e,u.x,u.z,u.rotation),r=Math.cos(n),s=Math.sin(n),c=t.x*r-t.z*s,l=t.x*s+t.z*r,d=e.surface?.type===`sphere`?.65:.44,p=(e,t)=>Math.max(-t,Math.min(t,e)),m=[[(a+u.width)/2+d,p(l,u.depth*.3)],[-(a+u.width)/2-d,p(l,u.depth*.3)],[p(c,u.width*.3),(o+u.depth)/2+d],[p(c,u.width*.3),-(o+u.depth)/2-d]];m.sort((e,t)=>Math.hypot(e[0]-c,e[1]-l)-Math.hypot(t[0]-c,t[1]-l));for(let[t,i]of m){let a=jt(e,u.x,u.z,t*r+i*s,-t*s+i*r);f.push({...a,rotation:Me(e,a.x,a.z,n),clusterId:u.clusterId,family:u.family})}}f.push(i);let p;for(let t of f){let r=`farm-${i.clusterId}-${i.seed.split(`:`).at(-1)}`,u={kind:`farm`,x:t.x,y:0,z:t.z,width:a,depth:o,radius:s,scale:1,rotation:t.rotation,variant:0,districtId:r,clusterId:t.clusterId,footprint:c};if(!l.districts.some(t=>Vs(e,u,t,.32))&&es(e,`farmland`,t.x,t.z,Be(e,t.x,t.z,s))&&n(u)){u.family=t.family??i.family,u.parcels=Ys(a,o,i.seed,u.family,c),p=u;break}}p&&(r(p),i.used=!0,l.districts.push({kind:`farm`,id:p.districtId,clusterId:p.clusterId,x:p.x,z:p.z,width:a,depth:o,radius:s,footprint:c,family:p.family,rotation:p.rotation,parcelCount:p.parcels.length}),l.area+=a*o,l.cultivatedArea+=p.parcels.reduce((e,t)=>e+Us(t.polygon),0))}return l}var Zs=new WeakMap,Qs=new WeakMap;function $s(e){let t=e=>{let t=[];for(let[n,r]of e){let e=[Math.round(n*1e6)/1e6,Math.round(r*1e6)/1e6],i=t.at(-1);i&&e[0]===i[0]&&e[1]===i[1]||t.push(e)}if(t.length>1&&t[0][0]===t.at(-1)[0]&&t[0][1]===t.at(-1)[1]&&t.pop(),t.length<3)return null;let[n,r]=t,i=r[0]-n[0],a=r[1]-n[1];return t.slice(2).some(e=>Math.abs(i*(e[1]-n[1])-a*(e[0]-n[0]))>1e-12)?[...t,[...t[0]]]:null};return e.flatMap(e=>{let n=t(e[0]);return n?[[n,...e.slice(1).map(t).filter(Boolean)]]:[]})}function ec(e){return e.rivers?e.rivers:(Zs.has(e)||Zs.set(e,e.river?[e.river]:[]),Zs.get(e))}function tc(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Math.max(0,Math.min(1,((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1)));return Math.hypot(e-n.x-i*o,t-n.z-a*o)}function nc(e,t,n){let r=ec(e);Qs.has(r)||Qs.set(r,Math.max(0,...r.map(e=>e.width/2)));let i=Qs.get(r);return lo(r).nearest(t,n,e=>tc(t,n,e.a,e.b)-e.line.width/2,1/0,i)}function rc(e,t,n){return lo(ec(e)).nearest(t,n,e=>tc(t,n,e.a,e.b))}function ic(e,t){let n=[],r=[];e.forEach((i,a)=>{let o=e[Math.max(0,a-1)],s=e[Math.min(e.length-1,a+1)],c=Math.hypot(s.x-o.x,s.z-o.z)||1,l=(s.z-o.z)/c*t/2,u=-(s.x-o.x)/c*t/2;n.push([i.x+l,i.z+u]),r.push([i.x-l,i.z-u])});let i=n.concat(r.reverse());return[...i,i[0]]}function ac(e){let t=[[e.outline]],n=ec(e),r=n.map(e=>$s([[ic(e.points,e.width)]])),i=n.map(e=>$s([[ic(e.points,e.width+1.6)]]));if(e.lakes?.length&&(r.push(e.lakes),i.push(e.lakes,e.lakeShore??[])),!r.length)return{water:[],banks:[]};let a=$s(q.intersection(t,$s(q.union(...r)))),o=$s(q.intersection(t,$s(q.union(...i))));return{water:$s(a),banks:$s(q.difference(o,a))}}var oc=new WeakMap;function sc(e){let t=e.terrainSource??e,n=t.hydrology;if(n||=(oc.has(t)||oc.set(t,ac(t)),oc.get(t)),!e.terrainChunk)return n;let r=[[e.outline]],i=e.bounds?mo(n.water,e.bounds):n.water,a=e.bounds?mo(n.banks,e.bounds):n.banks;return{water:$s(q.intersection(i,r)),banks:$s(q.intersection(a,r))}}function cc(e,t,n,r){let i=e.surface?.projection;if(i?.type!==`equirectangular`)return[to(t,n,r)];let a=Math.PI*i.radius,o=a*2;if(r>=a)return[{minX:-a,maxX:a,minZ:n-r,maxZ:n+r}];let s=t>=-a&&t<a?t:((t+a)%o+o)%o-a,c=to(s,n,r),l=[c];return c.minX<=-a&&l.push(to(s+o,n,r)),c.maxX>=a&&l.push(to(s-o,n,r)),l}function lc(e,t){let{a:n,b:r}=e,i=0,a=1;for(let[e,o,s,c]of[[n.x,r.x-n.x,t.minX,t.maxX],[n.z,r.z-n.z,t.minZ,t.maxZ]]){if(Math.abs(o)<1e-14){if(e<s||e>c)return null;continue}let t=(s-e)/o,n=(c-e)/o;if(i=Math.max(i,Math.min(t,n)),a=Math.min(a,Math.max(t,n)),i>a)return null}return i===0&&a===1?e:{a:{x:n.x+(r.x-n.x)*i,z:n.z+(r.z-n.z)*i},b:{x:n.x+(r.x-n.x)*a,z:n.z+(r.z-n.z)*a}}}function uc(e,t,n,r,i){let a=[];for(let o of cc(e,n,r,i))for(let e of t.query(o)){let t=lc(e,o);t&&a.push(t)}return a}var dc=new WeakMap,fc=new J,pc=(e,t,n)=>Math.max(t,Math.min(n,e));function mc(e,t){let n=G(e);if(!n)return null;let r=t.alignment??t.points,i=dc.get(r);i||(i=new WeakMap,dc.set(r,i));let a=i.get(n);if(a)return a;let o=t.distances?.length?t.distances:[0,t.length],s=[0];for(let e=1;e<o.length;e++){let t=o[e-1],n=o[e],r=Math.max(1,Math.ceil((n-t)/.5));for(let e=1;e<=r;e++)s.push(t+(n-t)*e/r)}let c=new Float64Array(s.length),l=new Float64Array(s.length),u=n=>{let r=Qc(t,n);return Ot(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,fc).length()*(r.chartSpeed??1)};l[0]=u(0);for(let e=1;e<s.length;e++)l[e]=u(s[e]),c[e]=c[e-1]+(s[e]-s[e-1])*(l[e-1]+4*u((s[e-1]+s[e])/2)+l[e])/6;return a={chart:Float64Array.from(s),physical:c,speed:l,length:c.at(-1),chartLength:t.length},i.set(n,a),a}function hc(e,t){let n=0,r=e.length-1;for(;n+1<r;){let i=n+r>>1;e[i]<=t?n=i:r=i}return n}function gc(e,t,n){let r=e.chart[t+1]-e.chart[t],i=e.physical[t],a=e.physical[t+1],o=e.speed[t]*r,s=e.speed[t+1]*r;return i+n*(o+n*(3*(a-i)-2*o-s+n*(2*(i-a)+o+s)))}function _c(e,t){if(!e)return t;let n=pc(t,0,e.chartLength),r=hc(e.chart,n);return gc(e,r,(n-e.chart[r])/(e.chart[r+1]-e.chart[r]))}function vc(e,t){if(!e)return t;let n=pc(t,0,e.length),r=hc(e.physical,n),i=e.physical[r],a=e.physical[r+1],o=e.chart[r+1]-e.chart[r],s=e.speed[r]*o,c=e.speed[r+1]*o,l=(n-i)/(a-i||1);for(let t=0;t<3;t++){let t=s+l*(2*(3*(a-i)-2*s-c)+3*l*(2*(i-a)+s+c));if(t<1e-12)break;l=pc(l-(gc(e,r,l)-n)/t,0,1)}return e.chart[r]+o*l}function yc(e,t,n){if(!G(e))return n;let r=new J,i=new J,a=1;for(let n of t){Ot(e,n.x,0,n.z,1,0,0,r),Ot(e,n.x,0,n.z,0,0,1,i);let t=r.lengthSq(),o=r.dot(i),s=i.lengthSq(),c=Math.hypot(t-s,2*o),l=Math.max(1e-8,(t+s-c)/2),u=Math.sqrt((t+s+c)/2);a=Math.max(a,u/l)}return n*a*(1.025+n*a/G(e).radius*2)}function bc(e,t,n){let r;try{return gs(e,t,n)}catch(e){r=e}let i=n.waypoints??[];if(n.world)try{return xc(n.world,e,t,n)}catch{}if(!i.length)throw r;let a=[e,...i,t],o=a.map((e,t)=>{if(t===0||t===a.length-1||Number.isFinite(e.heading))return[{pose:e,penalty:0}];let r=Math.atan2(a[t+1].z-a[t-1].z,a[t+1].x-a[t-1].x);return Array.from({length:31},(t,i)=>{let a=(i-15)*.1;return{pose:{...e,heading:r+a},penalty:Math.abs(a)*n.radius*.05}})}),s=o[0].map(e=>({...e,cost:0,parts:[]}));for(let e=1;e<o.length;e++){let t=[];for(let r of o[e]){let e=null;for(let t of s){let i;try{i=gs(t.pose,r.pose,{...n,waypoints:[]})}catch{continue}let a=t.cost+i.length+r.penalty;(!e||a<e.cost)&&(e={...r,cost:a,parts:[...t.parts,i]})}e&&t.push(e)}if(!t.length)throw r;s=t}return s.sort((e,t)=>e.cost-t.cost),hs(s[0].parts,n.radius)}function xc(e,t,n,r){let i=[t,...r.waypoints??[],n],a={x:(t.x+n.x)/2,z:(t.z+n.z)/2},o=De(e,a.x,a.z,new ie),s=Sc(o,0),c=Sc(o,2),l=Ot(e,a.x,0,a.z,1,0,0,new J),u=Ot(e,a.x,0,a.z,0,0,1,new J),d=l.dot(s),f=u.dot(s),p=l.dot(c),m=u.dot(c),h=d*m-f*p;if(Math.abs(h)<1e-8)throw RangeError(`A railway cannot use a singular pole chart`);let g={x:a.x,z:a.z,xx:m/h,xz:-f/h,zx:-p/h,zz:d/h},_=e=>{let t=e.x-a.x,n=e.z-a.z,r={...e,x:d*t+f*n,z:p*t+m*n};return Number.isFinite(e.heading)&&(r.heading=Math.atan2(p*Math.cos(e.heading)+m*Math.sin(e.heading),d*Math.cos(e.heading)+f*Math.sin(e.heading))),r},v=1;for(let t of i){Ot(e,t.x,0,t.z,g.xx,0,g.zx,l),Ot(e,t.x,0,t.z,g.xz,0,g.zz,u);let n=l.lengthSq(),r=l.dot(u),i=u.lengthSq(),a=Math.hypot(n-i,2*r);v=Math.max(v,Math.sqrt((n+i+a)/2)/Math.max(1e-8,(n+i-a)/2))}let y=r.physicalRadius??r.radius,b=y*v*(1.015+y*v/e.surface.radius*2),x=r.isAllowed??(()=>!0),S=e=>({x:g.x+g.xx*e.x+g.xz*e.z,z:g.z+g.zx*e.x+g.zz*e.z}),C=bc(_(t),_(n),{...r,world:null,radius:b,waypoints:(r.waypoints??[]).map(_),isAllowed:e=>x(S(e))});for(let e of C.segments)e.chartTransform=g;return C}var Sc=(e,t)=>new J().setFromMatrixColumn(e,t),Cc=Object.freeze({seed:27,width:130,depth:95,cityRadius:9.6,riverWidth:5.4,groundY:0,waterY:-1.2,railY:.42,sampleSpacing:.35,minTurnRadius:8,throatLength:4}),$=Object.freeze({trackHalfWidth:1.05,routeEdge:1.35,cuttingHalfWidth:1.08,track:1.45,riverBank:.8,mountain:.35,objects:.32,street:.28,worldEdge:.75,city:1.25,stationOffset:3,stationLength:6.4,stationWidth:2.4,stationEndDistance:7,tunnelRoofHeight:3.9,tunnelArchRadius:1.4,tunnelArchSpring:1.8,tunnelRockCover:.1,bridgeBank:2.2,maximumGrade:.12}),wc=1e-7,Tc=(e,t,n)=>Math.max(t,Math.min(n,e)),Ec=(e,t,n)=>e+(t-e)*n,Dc=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Oc=(e,t=Cc.railY)=>Array.isArray(e)?{x:Number(e[0]),y:t,z:Number(e.length>2?e[2]:e[1])}:{x:Number(e.x),y:t,z:Number(e.z)},kc=e=>Number.isFinite(e.x)&&Number.isFinite(e.z);function Ac(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function jc(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Tc(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-Ec(n.x,r.x,o),t-Ec(n.z,r.z,o))}var Mc=new WeakMap,Nc=new WeakMap,Pc=new WeakMap;function Fc(e){return e.points.slice(1).flatMap((t,n)=>{let r=e.points[n],i=e.period;if(i&&Math.abs(t.x-r.x)>i/2){let e=t.x-Math.sign(t.x-r.x)*i,a=Math.sign(r.x)*i/2,o=(a-r.x)/(e-r.x),s={x:a,z:Ec(r.z,t.z,o)},c={...s,x:-a};return[{a:r,b:s,index:n,box:ro([r,s])},{a:c,b:t,index:n,box:ro([c,t])}]}return[{a:r,b:t,index:n,box:ro([r,t])}]})}function Ic(e){let t=Mc.get(e);return t&&t.count===e.points.length||(t={count:e.points.length,tree:new oo(Fc(e),e=>e.box),box:ro(e.points)},Mc.set(e,t)),t}function Lc(e){return lo(e.lines)}function Rc(e,t,n=0){let r=Nc.get(e);for((!r||r.count>e.length)&&(r={count:0,grid:new so},Nc.set(e,r));r.count<e.length;){let t=e[r.count++];r.grid.insert(t,to(t.x,t.z,t.radius??0))}return r.grid.query(to(t.x,t.z,t.radius+n))}var zc=(e,t,n=t.radius)=>Be(e,t.x,t.z,n);function Bc(e,t,n,r=0){if(!e.surface)return Rc(t,n,r);let i=Pc.get(t);for((!i||i.count>t.length)&&(i={count:0,grid:new so},Pc.set(t,i));i.count<t.length;){let n=t[i.count++];for(let t of cc(e,n.x,n.z,zc(e,n,n.radius??0)))i.grid.insert(n,t)}let a=cc(e,n.x,n.z,zc(e,n,n.radius+r));return a.length===1?i.grid.query(a[0]):[...new Set(a.flatMap(e=>i.grid.query(e)))]}function Vc(e,t,n,r){return jc(0,0,at(e,t,n),at(e,t,r))}function Hc(e,t,n,r,i=1/0){if(!e.surface)return Math.min(i,Wc(t,n,r));let a={x:n,z:r};if(!Number.isFinite(i))for(let n of t.points)i=Math.min(i,We(e,a,n));if(!Number.isFinite(i)||i===0)return i;let o=uc(e,Ic(t).tree,n,r,zc(e,a,i)),s=i;for(let{a:t,b:n}of o)s=Math.min(s,Vc(e,a,t,n));return s}function Uc(e,t,n,r){if(!e.surface)return Math.min(r,Gc(e,t,n));let i={x:t,z:n},a=uc(e,Lc(e),t,n,zc(e,i,r)),o=r;for(let{a:t,b:n}of a)o=Math.min(o,Vc(e,i,t,n));return o}function Wc(e,t,n){if(e.points.length>32)return Ic(e).tree.nearest(t,n,e=>jc(t,n,e.a,e.b));let r=1/0;for(let i=1;i<e.points.length;i++)r=Math.min(r,jc(t,n,e.points[i-1],e.points[i]));return r}function Gc(e,t,n){return Lc(e).nearest(t,n,e=>jc(t,n,e.a,e.b))}function Kc(e,t,n){return rc(e,t,n)}function qc(e,t,n,r=0){if(e.surface?.complete&&e.surface.projection.type===`equirectangular`){let r=e.surface.projection,i=r.centralLatitude*Math.PI/180-n/r.radius;return Number.isFinite(t)&&Number.isFinite(i)&&Math.abs(i)<=Math.PI/2+1e-10}let i=!1,a=e.outline;for(let e=0,r=a.length-1;e<a.length;r=e++){let o=a[e],s=a[r];o[1]>n!=s[1]>n&&t<(s[0]-o[0])*(n-o[1])/(s[1]-o[1])+o[0]&&(i=!i)}if(!i)return!1;if(r<=0)return!0;for(let e=0;e<a.length;e++){let i=a[e],o=a[(e+1)%a.length];if(jc(t,n,{x:i[0],z:i[1]},{x:o[0],z:o[1]})<r)return!1}return!0}function Jc(e,t,n){return ws(e,t,n)}function Yc(e,t,n){let r=Cc.groundY;for(let i of e.mountains)r=Math.max(r,Jc(i,t,n));return r}function Xc(e,t,n=Cc.sampleSpacing){let r=[];for(let i=1;i<e.length;i++){let a=e[i-1],o=e[i],s=Math.max(1,Math.ceil(Dc(a,o)/n));for(let e=0;e<s;e++)i>1&&e===0&&Dc(a,r.at(-1))<wc||r.push({x:Ec(a.x,o.x,e/s),y:t,z:Ec(a.z,o.z,e/s)})}r.push({...e.at(-1),y:t});let i=[0];for(let e=1;e<r.length;e++)i.push(i[e-1]+Dc(r[e-1],r[e]));return{points:r,distances:i,length:i.at(-1)}}function Zc(e,t=4){if(e.length<3)return e;let n=[e[0]];for(let r=1;r<e.length-1;r++){let i=e[r-1],a=e[r],o=e[r+1],s=Dc(i,a),c=Dc(a,o);if(s<wc||c<wc)continue;let l=Math.min(t,s*.3,c*.3),u={x:a.x+(i.x-a.x)*l/s,z:a.z+(i.z-a.z)*l/s},d={x:a.x+(o.x-a.x)*l/c,z:a.z+(o.z-a.z)*l/c};n.push(u);for(let e=1;e<=10;e++){let t=e/10,r=1-t;n.push({x:r*r*u.x+2*r*t*a.x+t*t*d.x,z:r*r*u.z+2*r*t*a.z+t*t*d.z})}}return n.push(e.at(-1)),n}function Qc(e,t){if(e.alignment)return ps(e.alignment,t);let n=Tc(t,0,e.length),r=0,i=e.distances.length-1;for(;r+1<i;){let t=r+i>>1;e.distances[t]<=n?r=t:i=t}let a=e.points[r],o=e.points[i],s=e.distances[i]-e.distances[r],c=s>wc?(n-e.distances[r])/s:0,l=o.x-a.x,u=o.y-a.y,d=o.z-a.z,f=Math.hypot(l,u,d)||1;return{x:Ec(a.x,o.x,c),y:Ec(a.y,o.y,c),z:Ec(a.z,o.z,c),distance:n,tangent:{x:l/f,y:u/f,z:d/f},angle:Math.atan2(l,d)}}function $c(e,t){let n=[],r=t(e.points[0],0)<=0?0:null;for(let i=1;i<e.points.length;i++){let a=e.points[i-1],o=e.points[i],s=t(a,e.distances[i-1]),c=t(o,e.distances[i]);if(s<=0==c<=0)continue;let l=0,u=1;for(let n=0;n<18;n++){let n=(l+u)/2,r=Ec(e.distances[i-1],e.distances[i],n);t(e.alignment?Qc(e,r):{x:Ec(a.x,o.x,n),z:Ec(a.z,o.z,n)},r)<=0==s<=0?l=n:u=n}let d=Ec(e.distances[i-1],e.distances[i],(l+u)/2);s>0?r=d:(d-(r??0)>.01&&n.push({start:r??0,end:d}),r=null)}return r!==null&&e.length-r>.01&&n.push({start:r,end:e.length}),n.map(t=>({...t,entry:Qc(e,t.start),exit:Qc(e,t.end)}))}function el(e,t){return[[-.5,-.22],[-.43,-.43],[-.2,-.5],[.22,-.5],[.44,-.4],[.5,-.17],[.5,.23],[.4,.44],[.18,.5],[-.22,.5],[-.44,.39],[-.5,.12]].map(([n,r])=>[n*e,r*t])}function tl(e,t){if(!e)throw TypeError(`Invalid world: ${t}`)}function nl(e,t,n){if(e.cities){tl(Array.isArray(e.cities)&&e.cities.length>=2,`at least two cities are required`);let t=e.cities.map((e,t)=>({...e,id:String(e.id??`city-${t+1}`),...Oc(e,0),radius:e.radius??Ns(e.level??3).radius,stationIds:[]}));return tl(t.every(e=>kc(e)&&Number.isFinite(e.radius)&&e.radius>0),`cities require finite x/z and positive radii`),tl(new Set(t.map(e=>e.id)).size===t.length,`city IDs must be unique`),t}let r=[[`westhaven`,-47,25],[`pineford`,-43,-20],[`summit`,-16,-29],[`alder`,16,-27],[`eastmere`,46,-17],[`sunfield`,47,23],[`meadow`,16,30],[`willow`,-16,23]];tl(Number.isFinite(Number(e.cityCount??8)),`cityCount must be finite`);let i=Tc(Math.round(e.cityCount??8),3,20),a=Math.min(t.width/130,t.depth/95);return i===8?r.map(([e,r,i])=>({id:e,x:r*t.width/130+(n()-.5)*2.6*a,z:i*t.depth/95+(n()-.5)*2.6*a,y:0,radius:Cc.cityRadius*a,stationIds:[]})):Array.from({length:i},(e,r)=>{let o=Math.PI*2*r/i+.35+(n()-.5)*.14;return{id:`city-${r+1}`,x:Math.cos(o)*t.width*.35,z:Math.sin(o)*t.depth*.32,y:0,radius:Math.min(Cc.cityRadius*a,Math.min(t.width,t.depth)*1.05/i),stationIds:[]}})}function rl(e,t={}){let n=e.platform?.width??e.width??0,r=e.platform?.length??e.length??0,i=Pt(t,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i);return[[-r/2,-n/2],[r/2,-n/2],[r/2,n/2],[-r/2,n/2]].map(([n,r])=>jt(t,e.x,e.z,n*a+r*o,-n*o+r*a))}function il(e,t,n,r){let i=(e,t,n)=>(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x);return i(e,t,n)*i(e,t,r)<-1e-7&&i(n,r,e)*i(n,r,t)<-1e-7}function al(e,t,n,r={}){let i=Pt(r,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i),s=at(r,e,{x:t,z:n}),c=s.x,l=s.z,u=c*a-l*o,d=c*o+l*a;return Math.hypot(Math.max(0,Math.abs(u)-e.platform.length/2),Math.max(0,Math.abs(d)-e.platform.width/2))}function ol(e,t,n={}){if(n.surface){let r={...e,x:0,z:0,rotation:Pt(n,e.x,e.z,e.rotation??0)},i=rl(r),a=zc(n,e,e.radius+$.trackHalfWidth+.3),o=1/0;for(let s of uc(n,Ic(t).tree,e.x,e.z,a)){let t=at(n,e,s.a),a=at(n,e,s.b);o=Math.min(o,al(r,t.x,t.z),al(r,a.x,a.z));for(let e=0;e<4;e++){if(il(t,a,i[e],i[(e+1)%4]))return 0;o=Math.min(o,jc(i[e].x,i[e].z,t,a))}}return o}let r=rl(e);return Ic(t).tree.nearest(e.x,e.z,t=>{let{a:n,b:i}=t,a=Math.min(al(e,n.x,n.z),al(e,i.x,i.z));for(let e=0;e<4;e++){if(il(n,i,r[e],r[(e+1)%4]))return 0;a=Math.min(a,jc(r[e].x,r[e].z,n,i))}return a},1/0,e.radius??Math.hypot(e.platform.length,e.platform.width)/2)}function sl(e){let t=[];for(let n of e.cities){let r=[];for(let i of e.lines){if(i.from!==n.id&&i.to!==n.id)continue;let a=i.from===n.id,o=mc(e,i),s=o?.length??i.length;for(let c of[0,7,8.5,10]){if(s<c*2+1)continue;let l=vc(o,a?c:s-c),u=Qc(i,l);for(let a of[-1,1]){let o=Pt(e,u.x,u.z,u.angle),s=-Math.cos(o),d=Math.sin(o),f=jt(e,u.x,u.z,s*$.stationOffset*a,d*$.stationOffset*a),p=at(e,f,u),m={id:`station-${n.id}`,kind:`station`,cityId:n.id,ownerId:n.ownerId,lineId:i.id,distance:l,...f,y:0,rotation:Me(e,f.x,f.z,Math.atan2(p.x,p.z)),side:a,radius:Math.hypot($.stationLength/2,$.stationWidth/2),platform:{width:$.stationWidth,length:$.stationLength}},h=zc(e,m,m.radius+$.worldEdge);if(!qc(e,m.x,m.z,h)||e.biomes&&!es(e,[`farmland`,`forest`,`plains`,`desert`],m.x,m.z,zc(e,m))||e.mountains.some(t=>Es(t,m.x,m.z)<zc(e,m,m.radius+$.mountain))||(e.surface?nc(e,m.x,m.z)<zc(e,m,m.radius+$.riverBank):ec(e).some(e=>ol(m,e)<e.width/2+$.riverBank))||e.lines.some(t=>cc(e,m.x,m.z,zc(e,m,m.radius+$.trackHalfWidth+.25)).some(e=>no(e,Ic(t).box))&&ol(m,t,e)<$.trackHalfWidth+.25)||t.some(t=>We(e,m,t)<m.radius+t.radius+$.objects))continue;let g=We(e,m,n)+c*.05;r.push({station:m,score:g})}}}if(r.sort((e,t)=>e.score-t.score),r.length){let e=r[0].station;t.push(e),n.stationIds.push(e.id)}}e.stations=t;for(let n of e.lines){let e=t.filter(e=>e.lineId===n.id);n.stationIds=e.map(e=>e.id);for(let t of n.stops){let n=e.find(e=>e.cityId===t.cityId);n&&(t.distance=n.distance)}}}function cl(e,t,{cityId:n=null,keepOutsideCities:r=!1}={}){let i=t.radius;if(!qc(e,t.x,t.z))return!1;if(e.detailRegion&&!n){let n=e.detailRegion,r=zc(e,t,i+$.objects/2);if(t.x-r<n.minX||t.x+r>n.maxX||t.z-r<n.minZ||t.z+r>n.maxZ)return!1}return!(e.biomes&&!es(e,[`farmland`,`forest`,`plains`,`desert`],t.x,t.z,zc(e,t))||!qc(e,t.x,t.z,zc(e,t,i+$.worldEdge))||Uc(e,t.x,t.z,i+$.track)<i+$.track||nc(e,t.x,t.z)<zc(e,t,i+$.riverBank)||Rc(e.mountains,{...t,radius:zc(e,t,i+$.mountain)}).some(n=>Es(n,t.x,t.z)<zc(e,t,i+$.mountain))||r&&Bc(e,e.cities,t,$.city).some(n=>We(e,t,n)<n.radius+i+$.city)||n&&Bc(e,e.cities,t,e.detailRegion?$.objects:0).some(r=>r.id!==n&&We(e,t,r)<r.radius+(e.detailRegion?i+$.objects:i*.5))||Bc(e,e.stations,t,$.objects).some(n=>We(e,t,n)<i+n.radius+$.objects)||Bc(e,e.placements,t,$.objects).some(n=>We(e,t,n)<i+n.radius+$.objects&&(t.kind!==`farm`||n.kind!==`farm`||Vs(e,t,n,$.objects)))||(e.cityStreets??[]).some(n=>Hc(e,n,t.x,t.z,i+n.width/2+$.street)<i+n.width/2+$.street))}function ll(e,t=e.cities){let n=[`farmland`,`forest`,`plains`,`desert`],r=e.surface?.complete&&e.surface.projection.type===`equirectangular`?2*Math.PI*e.surface.projection.radius:void 0,i=(t,n)=>We(e,t,n),a=(t,n,r)=>Hc(e,t,n,r,8);for(let o of t){let t=o.development,s=Ms(e.seed,o.id),c=o.railAxis??{x:1,z:0},l=Pt(e,o.x,o.z,Math.atan2(c.x,c.z)),u={x:Math.sin(l),z:Math.cos(l)},d={x:-u.z,z:u.x},f=t.streetWidth,p=t.streetSpacing,m=(t,n,r)=>jt(e,o.x,o.z,u.x*t+d.x*n*r,u.z*t+d.z*n*r),h=t=>{let r=f/2+.12;return!(i(t,o)>o.radius-r||!qc(e,t.x,t.z,zc(e,t,r+$.worldEdge))||!es(e,n,t.x,t.z,zc(e,t,r))||Uc(e,t.x,t.z,$.track+r)<$.track+r||nc(e,t.x,t.z)<zc(e,t,$.riverBank+r)||e.mountains.some(n=>Es(n,t.x,t.z)<zc(e,t,r+$.mountain))||Bc(e,e.cities,{...t,radius:r},e.detailRegion?$.objects:0).some(n=>n.id!==o.id&&i(t,n)<n.radius+(e.detailRegion?r+$.objects:r*.5))||Bc(e,e.stations,{...t,radius:r}).some(n=>al(n,t.x,t.z,e)<r))},g=t=>{for(let n=1;n<t.length;n++){let r=t[n-1],a=t[n],o=Math.max(1,Math.ceil(i(r,a)/.6)),s=at(e,r,a);for(let t=0;t<=o;t++)if(!h(jt(e,r.x,r.z,s.x*t/o,s.z*t/o)))return!1}return!0},_=e.stations.find(e=>e.cityId===o.id),v=_?at(e,o,_):null,y=_?Math.sign(v.x*d.x+v.z*d.z):s()<.5?1:-1,b=t=>{let n=Ms(e.seed,`${o.id}:lanes:${t}`),s=[],c=[],l=t===y?5.1:3.7,u=m((n()-.5)*o.radius*.12,Math.max(l+.6,o.radius*.46),t),d=[];for(let e=l;e<o.radius-2;e+=3.2)for(let n=-o.radius*.7;n<=o.radius*.7;n+=2.5){let r=m(n,e,t);d.push({p:r,score:n*n+(e-l)**2})}d.sort((e,t)=>e.score-t.score);for(let{p:e}of d)if(h(e)){s.push(e);break}if(!s.length)return{side:t,edges:c,center:u};let _=(t,n,r)=>{let a=i(t,n),o=at(e,t,n),s=-o.z/a,c=o.x/a,l=Math.max(3,Math.ceil(a/1.1));return Array.from({length:l+1},(i,a)=>{if(a===0)return t;if(a===l)return n;let u=a/l,d=Math.sin(Math.PI*u)*r;return jt(e,t.x,t.z,o.x*u+s*d,o.z*u+c*d)})},v=e=>c.some(t=>{let n=[e[0],e.at(-1)].filter(e=>e===t.points[0]||e===t.points.at(-1));return e.some(e=>!n.some(t=>i(e,t)<2.1)&&a(t,e.x,e.z)<f+1.15)}),b=Math.max(2,Math.ceil((o.radius/7.5)**2));for(let a=0;a<(o.radius<14?280:900)&&s.length<b;a++){let a=n()*Math.PI*2,u=Math.sqrt(n()),d=Math.cos(a)*o.radius*.77*u,y=Math.max(l+.6,o.radius*.46)+Math.sin(a)*Math.max(2,o.radius*.34)*u,b=m(d,y,t);if(i(b,o)>o.radius-1.7)continue;let x=s.map(e=>({node:e,distance:i(e,b)})).sort((e,t)=>e.distance-t.distance);if(x[0].distance<p*.72||x[0].distance>p*1.65||!h(b))continue;let S=x[0].node;if(c.some(t=>{let n=t.points[0]===S?t.points[1]:t.points.at(-1)===S?t.points.at(-2):null;if(!n)return!1;let r=at(e,S,n),a=at(e,S,b);return(r.x*a.x+r.z*a.z)/(i(n,S)*i(b,S))>.73}))continue;let C=_(S,b,(n()-.5)*Math.min(1.8,x[0].distance*.2));g(C)&&!v(C)&&(s.push(b),c.push({points:C,width:f,...r?{period:r}:{}}))}if(o.level>=4){let e=[];for(let t=0;t<s.length;t++)for(let n=t+1;n<s.length;n++){let r=s[t],a=s[n],o=i(r,a);o>p*1.5||c.some(e=>e.points[0]===r&&e.points.at(-1)===a||e.points[0]===a&&e.points.at(-1)===r)||e.push({a:r,b:a,d:o})}e.sort((e,t)=>e.d-t.d);let t=0;for(let{a:i,b:a,d:s}of e){if(t>=Math.floor(o.level/3))break;let e=_(i,a,(n()-.5)*Math.min(1.2,s*.14));g(e)&&!v(e)&&(c.push({points:e,width:f,...r?{period:r}:{}}),t++)}}if(!c.length)for(let e of[-1,1]){let i=m(e*2.8,l+n()*.6,t),a=_(s[0],i,.2*e);if(g(a)){c.push({points:a,width:f,...r?{period:r}:{}});break}}return{side:t,edges:c,center:u}},x=[b(1),b(-1)];for(let t of x){let n=Ps.house*.9,r=n+f/2+$.street+.1;t.capacity=0;for(let s of t.edges)for(let c=1;c<s.points.length;c++){let l=s.points[c-1],u=s.points[c],d=i(l,u);for(let s of[-1,1]){let c=at(e,l,u),p={...jt(e,l.x,l.z,c.x/2-c.z/d*r*s,c.z/2+c.x/d*r*s),radius:n};i(p,o)+n<=o.radius&&cl(e,p,{cityId:o.id})&&t.edges.every(e=>a(e,p.x,p.z)>=n+f/2+$.street)&&(t.capacity+=d)}}}x.sort((e,t)=>t.capacity-e.capacity||(e.side===y?-1:1));let S=x[0],C=S.edges.map((e,t)=>({id:`street-${o.id}-${t+1}`,cityId:o.id,ownerId:o.ownerId,...e}));if(e.cityStreets.push(...C),t.streetCount=C.length,t.connectionCount=e.lines.filter(e=>e.from===o.id||e.to===o.id).length,!C.length)continue;let w=C.flatMap(e=>e.points.slice(1).map((t,n)=>({a:e.points[n],b:t,length:i(e.points[n],t)}))),T=t.features.filter(e=>e!==`house`).reverse(),E=e=>{if(e<3)return`house`;if(e<T.length+3)return T[e-3];let t=s();return o.level>=8&&t<.12?`tower`:o.level>=4&&t<(o.level>=8?.38:.25)?`apartment`:`house`},D=0,O=[],ee=new Map,k=t=>{if(ee.has(t))return ee.get(t);let n=Ms(e.seed,`${o.id}:lots:${t}`),r=[];for(let{a,b:s,length:c}of w){let l=at(e,a,s),u=l.x/c,d=l.z/c,p=Math.max(1,Math.ceil(c/.72));for(let s=0;s<p;s++)for(let c of[-1,1])for(let m=0;m<(t===`house`?2:1);m++){let h=(s+.18+n()*.64)/p,g=t===`house`?.86+n()*.1:.9+n()*.09,_=Ps[t]*g,v=_+f/2+$.street+.06+n()*.12+m*(2.8+$.objects),y=jt(e,a.x,a.z,l.x*h-d*v*c,l.z*h+u*v*c),b=jt(e,a.x,a.z,l.x*h,l.z*h),x=at(e,y,b),C={kind:t,cityId:o.id,ownerId:o.ownerId,...y,y:0,radius:_,scale:g,variant:Math.floor(n()*8),rotation:Me(e,y.x,y.z,Math.atan2(x.x,x.z))};if(i(C,o)+_>o.radius||!cl(e,C,{cityId:o.id}))continue;let w=O.length?Math.min(...O.map(e=>i(C,e)-_-e.radius)):1/0;r.push({item:C,neighbor:w,score:i(C,S.center)*.3+m*.4})}}return ee.set(t,r),r},A=t=>{let n=k(t),r=null,a=1/0;for(let e of n){if(e.blocked)continue;let t=e.score+(Number.isFinite(e.neighbor)?e.neighbor*1.8:0);t<a&&(r=e,a=t)}if(!r)return!1;let s={...r.item,id:`city-${o.id}-building-${D+1}`,biome:Qo(e,r.item.x,r.item.z)};e.placements.push(s),O.push(s),D++;for(let e of ee.values())for(let t of e){if(t.blocked)continue;let e=i(s,t.item)-s.radius-t.item.radius;e<$.objects?t.blocked=!0:t.neighbor=Math.min(t.neighbor,e)}return!0};for(let e=0;e<t.buildingBudget;e++)A(E(e));for(let e=0;D<t.buildingBudget&&e<3;)A(`house`)?e=0:e++;t.placedBuildings=D,t.placedFeatures=[...new Set(O.map(e=>e.kind))]}}function ul(e,t,n){let r=n=>e.placements.push({id:e.detailRegion?`asset-${e.detailRegion.minX}-${e.detailRegion.minZ}-${e.placements.length+1}`:`asset-${e.placements.length+1}`,y:0,rotation:t()*Math.PI*2,biome:Qo(e,n.x,n.z),...n}),i=e.detailRegion,a=Math.sqrt((i?(i.maxX-i.minX)*(i.maxZ-i.minZ):e.bounds.width*e.bounds.depth)/12350),o=t=>!e.surface?.complete||qc(e,t.x,t.z)&&$o(e,`ice`,t.x,t.z)<-zc(e,t);if(e.farmland=Xs(e,{density:n,canPlace:t=>o(t)&&cl(e,t,{keepOutsideCities:!0}),add:r}),n<=0)return;let s=i??{minX:-e.bounds.width*.47,maxX:e.bounds.width*.47,minZ:-e.bounds.depth*.47,maxZ:e.bounds.depth*.47},c=e=>(e=Tc(e,0,1),e*e*(3-2*e)),l=(t,r,i,a=!0)=>{t/=Math.sqrt(Math.min(2,n));let o=(s.maxX-s.minX)*(s.maxZ-s.minZ);t=Math.max(t,Math.sqrt(o/i));let c=[];for(let n=Math.floor(s.minZ/t);n<=Math.floor(s.maxZ/t);n++)for(let i=Math.floor(s.minX/t);i<=Math.floor(s.maxX/t);i++){let a=Ac(`${e.seed}:landscape:${r}:${i}:${n}`),o=(i+.08+a()*.84)*t,l=(n+.08+a()*.84)*t;o<s.minX||o>=s.maxX||l<s.minZ||l>=s.maxZ||!qc(e,o,l)||c.push({x:o,z:l,rng:a,priority:a()})}return a?c.sort((e,t)=>e.priority-t.priority):c},u=(t,n,r=!1)=>(r?$o(e,`ice`,t.x,t.z)>=zc(e,t):o(t))&&es(e,n,t.x,t.z,zc(e,t))&&cl(e,t,{keepOutsideCities:!0}),d=Math.round(310*n*a),f={},p=0,m=l(2.2,`canopy`,12e3,!1).filter(t=>(t.biome=Qo(e,t.x,t.z),t.biome!==`forest`&&t.biome!==`plains`||(t.ecology=Rt(e,t.x,t.z),t.ecology.ecoregion===`polar`)?!1:(t.priority=t.biome===`forest`?1+t.ecology.patch*.75+t.ecology.detail*.25+t.priority*.025:t.priority,!0))).sort((e,t)=>t.priority-e.priority);for(let t of m){if(p>=d)break;let n=t.biome,i=t.ecology,a=t.rng,o=c((i.patch-.35)/.34),s=c((i.patch-.57)/.2),l=n===`forest`?o*(.55+i.detail*.45):.004+s*.054,f=e.surface?.projection.type===`equirectangular`?Math.max(.06,Math.cos(i.latitude*Math.PI/180)):1;if(a()>l*f||i.ecoregion===`polar`)continue;let m=.48+(n===`forest`?o:s)*.48+a()*.25,h=i.ecoregion===`tropical`?n===`plains`||i.moisture<.38?`acacia`:`broadleaf`:i.ecoregion===`boreal`?i.moisture>.65?`birch`:`pine`:i.moisture<.36?`pine`:i.moisture>.62?`birch`:i.detail>.62?`gold`:`broadleaf`;a()<.09&&(h=h===`pine`?`birch`:`round`);let g={kind:`tree`,x:t.x,z:t.z,radius:.85*m,scale:m,variant:h,landscapeLayer:`canopy`,rotation:Me(e,t.x,t.z,a()*Math.PI*2)};u(g,[`forest`,`plains`])&&(r(g),p++)}let h=0,g=0,_=0,v=Math.round(48*n*a),y=Math.round(14*n*a),b=Math.round(12*n*a);for(let t of l(14,`understory`,1800)){let n=Qo(e,t.x,t.z);if(![`forest`,`plains`,`desert`].includes(n))continue;let i=Rt(e,t.x,t.z,f),a=t.rng,o=e.surface?.complete&&$o(e,`ice`,t.x,t.z)>0,s=null,c=2+a()*2.4;if(o?a()<.36&&(s=`frost`):n===`desert`?i.patch<.55&&a()<.7?(s=`dune`,c=4.1+a()*2.8):i.patch>.61&&a()<.67?(s=`outcrop`,c=2.8+a()*2.3):i.moisture>.47&&a()<.28&&(s=`scrub`):n===`forest`?i.patch<.47&&a()<.45?(s=`meadow`,c=2.8+a()*2.1):i.detail>.72&&a()<.18&&(s=`outcrop`):i.ecoregion===`polar`?a()<.4&&(s=i.moisture>.52?`scrub`:`frost`):i.patch<.6&&a()<.46?(s=i.moisture<.34?`scrub`:`meadow`,c=2.6+a()*2.5):i.detail>.7&&a()<.38&&(s=`outcrop`),s&&h<v){let l={kind:`nature`,x:t.x,z:t.z,radius:c,scale:1,style:s,variant:Math.floor(a()*65536),rotation:Me(e,t.x,t.z,i.windAngle+(a()-.5)*.28)};u(l,n,o)&&(r(l),h++)}let l=!o&&n===`plains`&&i.ecoregion!==`polar`&&i.patch<.58&&i.moisture>.36&&a()<.17,d=!e.surface?.complete||i.longitude>-125&&i.longitude<-60,p=!o&&n===`desert`&&d&&i.patch>.5&&i.patch<.72&&a()<.2;if(!l&&!p)continue;let m=2+Math.floor(a()*4),x=a()*Math.PI*2;for(let i=0;i<m;i++){let i=l?`sheep`:`cactus`;if(l?g>=y:_>=b)break;let o=a()*Math.PI*2,s=2.4+a()*4.8,c=jt(e,t.x,t.z,Math.cos(o)*s,Math.sin(o)*s),d=l?1:.72+a()*.35,f={kind:i,...c,radius:l?.7:.7*d,scale:d,variant:Math.floor(a()*3),rotation:Me(e,c.x,c.z,x+(a()-.5)*.65)};u(f,n)&&(r(f),l?g++:_++)}}}function dl(e,t,n){for(let r of e.cities){let i=t.filter(e=>e.from===r.id||e.to===r.id).map(t=>{let n=t.from===r.id,i=e.cities.find(e=>e.id===(n?t.to:t.from)),a=t.waypoints.length?n?t.waypoints[0]:t.waypoints.at(-1):i,o=Dc(r,a)||1;return{connection:t,end:n?`start`:`end`,x:(a.x-r.x)/o,z:(a.z-r.z)/o}}),a=i.length?{x:i[0].x,z:i[0].z}:{x:1,z:0},o=1/0;for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){let n=i[e],r=i[t],s=n.x*r.x+n.z*r.z;if(s>=o)continue;o=s;let c=n.x-r.x,l=n.z-r.z,u=Math.hypot(c,l);u>wc&&(a={x:c/u,z:l/u})}r.railHeading!==void 0&&(tl(Number.isFinite(r.railHeading),`city railHeading must be a finite angle in radians`),a={x:Math.cos(r.railHeading),z:Math.sin(r.railHeading)}),(a.x<0||Math.abs(a.x)<wc&&a.z<0)&&(a={x:-a.x,z:-a.z}),r.railAxis=a;let s=Math.min(...i.map(t=>Dc(r,e.cities.find(e=>e.id===(t.connection.from===r.id?t.connection.to:t.connection.from))))),c=r.throatLength??n;tl(Number.isFinite(c)&&c>=0,`city throatLength must be finite and nonnegative`),r.throatLength=Math.min(c,s*.18);for(let e of i){let t=e.x*a.x+e.z*a.z>=0?1:-1;e.connection[e.end===`start`?`fromPort`:`toPort`]={cityId:r.id,side:t,x:r.x+a.x*t*r.throatLength,z:r.z+a.z*t*r.throatLength,heading:Math.atan2(a.z*t,a.x*t)}}}}function fl(e,t,n){let r=Qc(e,t===`start`?n:e.length-n),i=t===`start`?1:-1;return{...r,tangent:{x:r.tangent.x*i,y:0,z:r.tangent.z*i},curvature:(r.curvature??0)*i}}function pl(e,t){let n=e=>e.end===`start`?e.line.alignment.segments:e.line.alignment.segments.toReversed(),r=n(e),i=n(t),a=0,o=0,s=0,c=0,l=0;for(;a<r.length&&o<i.length;){let n=fl(e.line,e.end,l+1e-6),u=fl(t.line,t.end,l+1e-6);if(Dc(n,u)>1e-5||n.tangent.x*u.tangent.x+n.tangent.z*u.tangent.z<1-1e-8||Math.abs(n.curvature-u.curvature)>1e-8)break;let d=Math.min(r[a].length-s,i[o].length-c);if(d<wc)break;l+=d,s+=d,c+=d,s>=r[a].length-wc&&(a++,s=0),c>=i[o].length-wc&&(o++,c=0)}return l}function ml(e){e.sharedSections=[],e.transitions=[];for(let t of e.lines)t.sharedSections=[],t.renderRanges=[{start:0,end:t.length}];for(let t of e.cities){let n=e.lines.flatMap(e=>e.from===t.id?[{line:e,end:`start`,port:e.fromPort}]:e.to===t.id?[{line:e,end:`end`,port:e.toPort}]:[]);for(let r of n)for(let i of n)r.line!==i.line&&r.port.side!==i.port.side&&e.transitions.push({cityId:t.id,fromLineId:r.line.id,fromEnd:r.end,toLineId:i.line.id,toEnd:i.end});for(let r of[-1,1]){let i=n.filter(e=>e.port.side===r);if(i.length<2)continue;let a=new Map,o=(e,t)=>[e.line.id,t.line.id].sort().join(`|`);for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)a.set(o(i[e],i[t]),pl(i[e],i[t]));let s=[0,...new Set([...a.values()].filter(e=>e>wc).map(e=>Math.round(e*1e7)/1e7))].sort((e,t)=>e-t);for(let n=1;n<s.length;n++){let c=s[n-1],l=s[n],u=(c+l)/2,d=[...i];for(;d.length;){let n=d.shift(),i=[n];for(let e=d.length-1;e>=0;e--)(a.get(o(n,d[e]))??0)>u&&(i.push(d[e]),d.splice(e,1));if(i.length<2)continue;i.sort((t,n)=>e.lines.indexOf(t.line)-e.lines.indexOf(n.line));let s=i[0],f=`shared-${t.id}-${r}-${e.sharedSections.length+1}`,p=Array.from({length:Math.max(2,Math.ceil((l-c)/.35)+1)},(e,t)=>{let n=fl(s.line,s.end,c+(l-c)*t/(Math.max(2,Math.ceil((l-c)/.35)+1)-1));return{x:n.x,y:n.y,z:n.z}}),m={id:f,cityId:t.id,side:r,ownerLineId:s.line.id,length:l-c,points:p,lines:[]};for(let e of i){let n=e.end===`start`?c:e.line.length-l,i=e.end===`start`?l:e.line.length-c,a={id:f,cityId:t.id,side:r,start:n,end:i,ownerLineId:s.line.id};e.line.sharedSections.push(a),m.lines.push({lineId:e.line.id,start:n,end:i,forward:e.end===`start`}),e!==s&&(e.line.renderRanges=e.line.renderRanges.flatMap(e=>i<=e.start+wc||n>=e.end-wc?[e]:[{start:e.start,end:Math.max(e.start,n)},{start:Math.min(e.end,i),end:e.end}].filter(e=>e.end-e.start>wc)))}e.sharedSections.push(m)}}}}}function hl(e,t,n,r,i,a=.5){return e.sharedSections.some(e=>{let o=e.lines.find(e=>e.lineId===t.id),s=e.lines.find(e=>e.lineId===n.id);return o&&s&&r>=o.start-a&&r<=o.end+a&&i>=s.start-a&&i<=s.end+a})}function gl(e){let t=[],n=(e,t,n,r)=>e*r-t*n,r=Lc(e),i=r.items;for(let a of i)for(let i of r.query({minX:a.minX-wc,maxX:a.maxX+wc,minZ:a.minZ-wc,maxZ:a.maxZ+wc})){if(i.lineIndex<=a.lineIndex)continue;let r=a.line,o=i.line;if(a.maxX<i.minX-wc||i.maxX<a.minX-wc||a.maxZ<i.minZ-wc||i.maxZ<a.minZ-wc||hl(e,r,o,(r.distances[a.index]+r.distances[a.index+1])/2,(o.distances[i.index]+o.distances[i.index+1])/2))continue;let s=a.b.x-a.a.x,c=a.b.z-a.a.z,l=i.b.x-i.a.x,u=i.b.z-i.a.z,d=i.a.x-a.a.x,f=i.a.z-a.a.z,p=n(s,c,l,u),m=s*s+c*c;if(Math.abs(p)<1e-10){if(Math.abs(n(d,f,s,c))>1e-7)continue;let e=(d*s+f*c)/(m||1),t=e+(l*s+u*c)/(m||1);tl((Math.min(1,Math.max(e,t))-Math.max(0,Math.min(e,t)))*Math.sqrt(m)<1e-4,`routes ${r.id} and ${o.id} overlap; shared railway segments must be represented by one connection`);continue}let h=n(d,f,l,u)/p,g=n(d,f,s,c)/p;if(h<-1e-6||h>1.000001||g<-1e-6||g>1.000001)continue;let _=Ec(r.distances[a.index],r.distances[a.index+1],Tc(h,0,1)),v=Ec(o.distances[i.index],o.distances[i.index+1],Tc(g,0,1)),y=(e,t)=>t<.001||t>e.length-.001;if((r.from===o.from||r.from===o.to||r.to===o.from||r.to===o.to)&&y(r,_)&&y(o,v))continue;let b=Ec(a.a.x,a.b.x,Tc(h,0,1)),x=Ec(a.a.z,a.b.z,Tc(h,0,1)),S=t.find(e=>Math.hypot(e.x-b,e.z-x)<.05);S||(S={id:`junction-${t.length+1}`,x:b,y:Cc.railY,z:x,lines:[]},t.push(S));for(let[e,t]of[[r,_],[o,v]])S.lines.some(t=>t.lineId===e.id)||S.lines.push({lineId:e.id,distance:t})}e.junctions=t}function _l(e={},t={}){let n=e.seed??Cc.seed,r=Ac(n),i={width:Number(e.bounds?.width??Cc.width),depth:Number(e.bounds?.depth??Cc.depth)};tl(Number.isFinite(i.width)&&Number.isFinite(i.depth)&&i.width>=35&&i.depth>=30,`bounds must be finite and at least 35 × 30`);let a=js(e.players),o=nl(e,i,r),s=new Set(a.map(e=>e.id));for(let[t,r]of o.entries()){let i=Ms(n,r.id);r.level=r.level??(e.cities?1+Math.floor(i()*10):3);let o=Ns(r.level);r.ownerId=String(r.ownerId??a[Math.floor(Ms(n,`${r.id}:owner`)()*a.length)].id),tl(s.has(r.ownerId),`city ${r.id} references unknown owner ${r.ownerId}`),e.cities&&e.cities[t].radius==null&&(r.radius=o.radius),r.development={...o,radius:r.radius,variantSeed:`${n}:city:${r.id}`,placedBuildings:0,streetCount:0,connectionCount:0}}let c={...e.trainOwners??{}};tl(e.trainOwners===void 0||e.trainOwners&&typeof e.trainOwners==`object`&&!Array.isArray(e.trainOwners),`trainOwners must be an object keyed by train ID`),tl(Object.values(c).every(e=>s.has(e)),`trainOwners references an unknown player`);let l=e.outline?e.outline.map(e=>[Number(e[0]),Number(e[1])]):el(i.width,i.depth);tl(l.length>=3&&l.every(e=>e.every(Number.isFinite)),`outline requires at least three finite points`);let u={version:2,seed:n,bounds:i,outline:l,geography:e.geography,camera:e.camera,surface:nt(e.surface),players:a,trainOwners:c,traffic:structuredClone(e.traffic??{}),density:Tc(Number(e.density??1)||0,0,3),detailMode:t.detail??`full`,cities:o,lines:[],stations:[],placements:[],cityStreets:[],junctions:[]};tl(o.every(e=>qc(u,e.x,e.z,.5)),`cities must be inside the world outline`);let d={points:[[-.64,.015],[-.42,-.025],[-.2,.035],[.02,0],[.22,.075],[.43,.055],[.64,.015]].map(([e,t])=>[e*i.width,t*i.depth])},f=e.rivers??[e.river??d];tl(Array.isArray(f),`rivers must be an array`);let p=f.map((e,t)=>{let n=e.points.map(e=>Oc(e,Cc.waterY));tl(n.every(kc),`river requires finite points`);let r=n.filter((e,t)=>t===0||Dc(e,n[t-1])>wc);tl(r.length>=2,`river requires at least two distinct points`);let i=Number(e.width??Cc.riverWidth);tl(Number.isFinite(i)&&i>0,`river width must be positive`);let a=Xc(e.smooth===!1?r:Zc(r,9),Cc.waterY,e.smooth===!1?1/0:1);return tl(Number.isFinite(a.length)&&a.length>wc,`river must have positive length`),{...a,id:e.id??`river-${t+1}`,name:e.name,width:i,y:Cc.waterY}});u.river=p[0]??{points:[],distances:[],length:0,width:0,y:Cc.waterY},e.rivers!==void 0&&(u.rivers=p),u.lakes=e.biomes?.geography?.lakes,u.lakeShore=e.biomes?.geography?.lakeShore,(e.rivers!==void 0||u.lakes?.length)&&(u.hydrology=ac(u));let m=u.river.width,h=Math.min(i.width/130,i.depth/95),g=[...o].sort((e,t)=>e.z-t.z).slice(0,2),_={x:(g[0].x+g[1].x)/2,z:(g[0].z+g[1].z)/2},v=(e.cities?[]:[{id:`high-pass`,..._,radius:10*h,height:13*h},{id:`north-spire`,x:_.x-7*h,z:_.z-11*h,radius:6.8*h,height:10*h},{id:`east-spire`,x:_.x+11*h,z:_.z-10*h,radius:7*h,height:9*h}]).filter(e=>qc(u,e.x,e.z,e.radius+.1)&&Kc(u,e.x,e.z)>e.radius+m/2+$.riverBank&&o.every(t=>Dc(t,e)>e.radius+2));u.mountains=(e.mountains??v).map((e,t)=>({...e,id:String(e.id??`mountain-${t+1}`),x:Number(e.x),z:Number(e.z),radius:Number(e.radius),height:Number(e.height)})),tl(u.mountains.every(e=>kc(e)&&Number.isFinite(e.radius)&&e.radius>0&&Number.isFinite(e.height)&&e.height>0),`mountains require finite x/z and positive radius/height`),tl(new Set(u.mountains.map(e=>e.id)).size===u.mountains.length,`mountain IDs must be unique`),tl(u.mountains.every(e=>e.range?e.range.polygon.every(([e,t])=>qc(u,e,t)):qc(u,e.x,e.z,e.radius+.1)),`mountain footprints must stay inside the world outline`),tl(u.mountains.every(e=>e.range||nc(u,e.x,e.z)>e.radius+$.riverBank),`mountain footprints must not overlap the river or its banks`),e.biomes?.geography&&(u.biomes=Ko(u,e.biomes));let y=(o.length===2?o.slice(0,1):o).map((e,t)=>({from:e.id,to:o[(t+1)%o.length].id}));o.length===8&&y.push({from:o[7].id,to:o[2].id},{from:o[6].id,to:o[3].id});let b=e.connections??y,x=[`coral`,`teal`,`gold`,`blue`,`coral`,`gold`,`teal`,`blue`,`gold`,`coral`];tl(Array.isArray(b)&&b.length>0,`at least one connection is required`);let S=b.map((e,t)=>({...e,id:String(e.id??`line-${t+1}`),from:String(e.from),to:String(e.to),waypoints:(e.points??e.waypoints??[]).map(e=>({...Oc(e),...Number.isFinite(e.heading)?{heading:e.heading}:{}}))}));tl(S.every(e=>o.some(t=>t.id===e.from)&&o.some(t=>t.id===e.to)&&e.from!==e.to),`connections must reference two different existing city IDs`);let C=S.map(e=>[e.from,e.to].sort().join(`|`));tl(new Set(C).size===C.length,`overlapping duplicate city connections must be represented by one railway`);let w=Number(e.minTurnRadius??Cc.minTurnRadius),T=Number(e.throatLength??Cc.throatLength);tl(Number.isFinite(w)&&w>0,`minTurnRadius must be positive and finite`),tl(Number.isFinite(T)&&T>=0,`throatLength must be finite and nonnegative`),u.minTurnRadius=w,dl(u,S,T);for(let t=0;t<S.length;t++){let n=S[t],r=o.find(e=>e.id===String(n.from)),i=o.find(e=>e.id===String(n.to));tl(r&&i&&r!==i,`connections must reference two different existing city IDs`);let a=n.waypoints;tl(a.every(kc),`connection waypoints require finite x/z`);let c=n.fromPort,l={...n.toPort,heading:n.toPort.heading+Math.PI},d=yc(u,[c,...a,l],w),f;try{f=(u.surface?bc:gs)(c,l,{radius:d,physicalRadius:w,world:u,waypoints:a,y:Cc.railY,isAllowed:e=>qc(u,e.x,e.z,$.routeEdge)})}catch(e){throw TypeError(`${e.message} (${n.id})`,{cause:e})}let p=hs([ss(r,c),f,ss(l,i)],d),m=String(n.ownerId??r.ownerId);tl(s.has(m),`line ${n.id} references unknown owner ${m}`);let h={id:n.id,from:r.id,to:i.id,ownerId:m,color:n.color??x[t%x.length],closed:!1,fromPort:n.fromPort,toPort:n.toPort,alignment:p,...ms(p,Cc.sampleSpacing),bridges:[],tunnels:[],cuts:[],stationIds:[]};tl(h.length>wc,`connections must have nonzero length`),tl(h.points.every(e=>qc(u,e.x,e.z,$.routeEdge))&&u.outline.every(([e,t])=>Wc(h,e,t)>=$.routeEdge),`entire railway corridors must stay inside the world outline`),h.bridges=$c(h,t=>Math.min(nc(u,t.x,t.z),e.biomes?.geography?-$o(u,`ocean`,t.x,t.z):1/0)-$.bridgeBank);for(let e of u.mountains){if(Wc(h,e.x,e.z)>e.radius+zc(u,e,$.cuttingHalfWidth))continue;let t=$c(h,t=>Es(e,t.x,t.z)-zc(u,t,$.cuttingHalfWidth));h.cuts.push(...t.map(t=>({...t,mountainId:e.id})));let n=$c(h,(t,n)=>{let r=Qc(h,n).tangent,i=-r.z,a=r.x,o=$.tunnelRoofHeight-Jc(e,t.x,t.z);for(let n=0;n<=24;n++){let s=n/24*Math.PI,c=Math.cos(s)*$.tunnelArchRadius,l=Cc.railY+$.tunnelArchSpring+Math.sin(s)*$.tunnelArchRadius,d=Pt(u,t.x,t.z,Math.atan2(r.x,r.z)),f=u.surface?jt(u,t.x,t.z,-Math.cos(d)*c,Math.sin(d)*c):{x:t.x+i*c,z:t.z+a*c},p=Jc(e,f.x,f.z);o=Math.max(o,l+$.tunnelRockCover-p)}return o});for(let r of n){let n=t.find(e=>e.start<=r.start+wc&&e.end>=r.end-wc);h.tunnels.push({...r,mountainId:e.id,cutStart:n?.start??r.start,cutEnd:n?.end??r.end,cutEntry:n?.entry??r.entry,cutExit:n?.exit??r.exit})}}h.tunnels.sort((e,t)=>e.start-t.start),h.cuts.sort((e,t)=>e.start-t.start),h.stops=[{cityId:r.id,distance:Math.min($.stationEndDistance,h.length*.25)},{cityId:i.id,distance:h.length-Math.min($.stationEndDistance,h.length*.25)}],u.lines.push(h)}return tl(new Set(u.lines.map(e=>e.id)).size===u.lines.length,`line IDs must be unique`),ml(u),gl(u),u.biomes??=Ko(u,e.biomes),sl(u),u.placements=[],t.detail!==`network`&&(ll(u),ul(u,r,u.density)),u}function vl(e){let t=[],n=(t,n)=>We(e,t,n),r=(e,n,r)=>t.push({type:e,id:n,detail:r});try{nt(e.surface)}catch(e){return r(`surface`,`world`,e.message),t}let i=new Set((e.players??[]).map(e=>e.id));try{js(e.players??[])}catch(e){r(`players`,`world`,e.message)}for(let t of e.cities)i.has(t.ownerId)||r(`city-owner`,t.id,`City references an unknown player`),(!Number.isInteger(t.level)||t.level<1||t.level>10)&&r(`city-level`,t.id,`City level must be an integer from 1 through 10`);for(let[t,n]of Object.entries(e.trainOwners??{}))i.has(n)||r(`train-owner`,t,`Train references an unknown player`);for(let t of e.lines)i.has(t.ownerId)||r(`line-owner`,t.id,`Railway references an unknown player`);let a=[`farmland`,`forest`,`plains`,`desert`];for(let t of e.cityStreets??[]){let i=e.cities.find(e=>e.id===t.cityId);if(i&&t.ownerId===i.ownerId||r(`street-owner`,t.id,`Street must belong to its existing city owner`),!Number.isFinite(t.width)||t.width<=0||t.points.length<2||!t.points.every(kc))r(`street-geometry`,t.id,`Street requires a positive width and finite points`);else for(let o=1;o<t.points.length;o++){let s=t.points[o-1],c=t.points[o],l=Math.max(1,Math.ceil(n(s,c)/.5)),u=t.width/2,d=at(e,s,c);for(let o=0;o<=l;o++){let c=jt(e,s.x,s.z,d.x*o/l,d.z*o/l);(!qc(e,c.x,c.z,zc(e,c,u+$.worldEdge)-.001)||i&&n(c,i)>i.radius-u+.001)&&r(`street-edge`,t.id,`Street leaves its dry city footprint`),e.biomes&&!es(e,a,c.x,c.z,zc(e,c,u)-.001)&&r(`street-biome`,t.id,`Street enters ocean, shore, or mountain`),Uc(e,c.x,c.z,u+$.track)<u+$.track-.001&&r(`street-track`,t.id,`Street enters railway clearance`),nc(e,c.x,c.z)<zc(e,c,u+$.riverBank)-.001&&r(`street-water`,t.id,`Street enters river bank`),e.mountains.some(t=>Es(t,c.x,c.z)<zc(e,c,u+$.mountain)-.001)&&r(`street-mountain`,t.id,`Street crosses a mountain`),e.stations.some(t=>al(t,c.x,c.z,e)<u-.001)&&r(`street-station`,t.id,`Street overlaps a station`)}}}for(let t of e.cities){let n=(e.cityStreets??[]).filter(e=>e.cityId===t.id);if(!n.length)continue;let i=e=>`${e.x.toFixed(5)},${e.z.toFixed(5)}`,a=new Map;for(let e of n)for(let t=1;t<e.points.length;t++){let n=i(e.points[t-1]),r=i(e.points[t]);a.has(n)||a.set(n,new Set),a.has(r)||a.set(r,new Set),a.get(n).add(r),a.get(r).add(n)}let o=new Set,s=[a.keys().next().value];for(;s.length;){let e=s.pop();o.has(e)||(o.add(e),s.push(...a.get(e)))}o.size!==a.size&&r(`street-connectivity`,t.id,`City street graph is disconnected`)}for(let t of e.lines){if((!Number.isFinite(t.length)||t.length<=0)&&r(`route-length`,t.id,`Route length must be positive`),t.alignment)for(let n of t.alignment.segments)n.type===`arc`&&n.radius<(e.minTurnRadius??Cc.minTurnRadius)-1e-6&&r(`route-curvature`,t.id,`Railway bend is tighter than its minimum turning radius`);for(let e=1;e<t.points.length;e++){let i=t.points[e-1],a=t.points[e];kc(i)&&kc(a)&&Number.isFinite(a.y)||r(`route-coordinate`,t.id,`Non-finite route point`),Math.abs(a.y-i.y)/(n(i,a)||1)>$.maximumGrade+wc&&r(`route-grade`,t.id,`Grade exceeds 12 percent`)}for(let n of[`bridges`,`tunnels`,`cuts`])for(let i of t[n])if((i.start<0||i.end>t.length+wc||i.end<=i.start)&&r(`structure-interval`,t.id,`Invalid ${n} interval`),n===`tunnels`){let n=e.mountains.find(e=>e.id===i.mountainId);for(let e of[i.entry,i.exit])Jc(n,e.x,e.z)<$.tunnelRoofHeight-.01&&r(`tunnel-cover`,t.id,`Portal lacks roof coverage`)}}for(let t of e.stations){t.ownerId!==e.cities.find(e=>e.id===t.cityId)?.ownerId&&r(`station-owner`,t.id,`Station must belong to its city owner`);for(let n of e.lines)cc(e,t.x,t.z,zc(e,t,t.radius+$.trackHalfWidth+.25)).some(e=>no(e,Ic(n).box))&&ol(t,n,e)<$.trackHalfWidth+.25-.001&&r(`station-track`,t.id,`Platform overlaps ${n.id}`);(e.surface?nc(e,t.x,t.z)<zc(e,t,t.radius+$.riverBank)-.001:ec(e).some(e=>ol(t,e)<e.width/2+$.riverBank-.001))&&r(`station-water`,t.id,`Platform enters river bank`)}for(let t=0;t<e.placements.length;t++){let i=e.placements[t],a=i.radius;i.cityId&&i.ownerId!==e.cities.find(e=>e.id===i.cityId)?.ownerId&&r(`asset-owner`,i.id,`City asset must belong to its city owner`);for(let t of e.cityStreets??[])Hc(e,t,i.x,i.z,a+t.width/2+$.street)<a+t.width/2+$.street-.001&&r(`asset-street`,i.id,`Footprint enters a city street`);e.biomes&&!es(e,[`farmland`,`forest`,`plains`,`desert`],i.x,i.z,zc(e,i)-.001)&&r(`asset-biome`,i.id,`Footprint enters ocean, shore, or mountain`),qc(e,i.x,i.z,zc(e,i,a+$.worldEdge)-.001)||r(`asset-edge`,i.id,`Footprint crosses island edge`),Uc(e,i.x,i.z,a+$.track)<a+$.track-.001&&r(`asset-track`,i.id,`Footprint enters railway clearance`),nc(e,i.x,i.z)<zc(e,i,a+$.riverBank)-.001&&r(`asset-water`,i.id,`Footprint enters river bank`);for(let t of e.mountains)Es(t,i.x,i.z)<zc(e,i,a+$.mountain)-.001&&r(`asset-mountain`,i.id,`Footprint intersects ${t.id}`);for(let t of e.stations)n(i,t)<a+t.radius+$.objects-.001&&r(`asset-station`,i.id,`Footprint intersects ${t.id}`);for(let o=0;o<t;o++)n(i,e.placements[o])<a+e.placements[o].radius+$.objects-.001&&(i.kind!==`farm`||e.placements[o].kind!==`farm`||Vs(e,i,e.placements[o],$.objects-.001))&&r(`asset-overlap`,i.id,`Footprint intersects ${e.placements[o].id}`)}return t}function yl(e){let{l:t=.64,c:n=.14,h:r=22}=e?.color??{},i=(e,t)=>zt(e,t,r);return{body:i(p.clamp(t,.48,.72),Math.min(n,.17)),light:i(.83,Math.min(n*.44,.075)),dark:i(.38,Math.min(n*.65,.09)),roof:i(p.clamp(t-.08,.43,.65),Math.min(n*.95,.16)),accent:i(p.clamp(t+.06,.57,.77),Math.min(n*1.08,.18)),trim:i(.94,Math.min(n*.13,.02))}}function bl(e){return Object.fromEntries(Object.entries(yl(e)).map(([t,n])=>[t,Ht(new j({name:`player-${e?.id??`neutral`}-${t}`,color:n,roughness:1,metalness:0,flatShading:!0}))]))}function xl(e,t){let{vertices:n,surfaceTriangles:r}=Cs(e),i=[];for(let e of r){let r=e.map(e=>n[e]),a=[],o=r.map(e=>e.y-t(e.x,e.z));for(let e=0;e<3;e++){let t=r[e],n=r[(e+1)%3],i=o[e],s=o[(e+1)%3];if(i>=0&&a.push([t.x,t.z]),i>=0!=s>=0){let e=i/(i-s);a.push([t.x+(n.x-t.x)*e,t.z+(n.z-t.z)*e])}}if(a.length>=3){let e=a.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6]);i.push([[...e,e[0]]])}}return i.length?q.union(...i):[]}function Sl(e,t){return xl(e,()=>e.height*t)}function Cl(e){return{low:Sl(e,.12),high:Sl(e,.62),snow:e.range?xl(e,(t,n)=>Ts(e,t,n)):e.height>8?Sl(e,.84):[]}}function wl(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of e[0])t=Math.min(t,a),n=Math.min(n,o),r=Math.max(r,a),i=Math.max(i,o);return{minX:t,minZ:n,maxX:r,maxZ:i}}function Tl(e,t){let n=e.biomes.land,r=t.water,i=e.biomes.ocean??[],a=i.length&&t.banks.length?q.difference(t.banks,i):t.banks,o=[...e.biomes.oceanShore??[],...a],s=new oo([...r,...t.banks],wl),c=e=>e.flatMap(e=>{let t=s.query(wl(e));return t.length?q.difference([e],t):[e]});return{land:n,shores:o,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Cl(e);return{id:e.id,low:c(t.low),high:c(t.high),snow:c(t.snow)}}),colorField:{seed:e.seed,sites:e.biomes.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes.shoreWidth}}}function El(e){let t=[[e.outline]],n=sc(e);if(e.surface?.complete&&e.biomes?.land)return Tl(e,n);let r=n.water,i=e.biomes?.ocean??[],a=i.length?q.union(r,i):r,o=q.difference(n.banks,a),s=e.biomes?.oceanShore?.length?q.union(o,e.biomes.oceanShore):o,c=q.difference(t,a,s);return{land:c,shores:s,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Cl(e);return{id:e.id,low:q.intersection(t.low,c),high:q.intersection(t.high,c),snow:q.intersection(t.snow,c)}}),colorField:{seed:e.seed,sites:e.biomes?.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes?.shoreWidth}}}var Dl=new WeakMap,Ol=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e));function kl(e,t){let n=Math.imul(e,374761393)^Math.imul(t,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function Al(e,t,n=24){e/=n,t/=n;let r=Math.floor(e),i=Math.floor(t),a=Ol(e-r),o=Ol(t-i),s=kl(r,i)*(1-a)+kl(r+1,i)*a,c=kl(r,i+1)*(1-a)+kl(r+1,i+1)*a;return s*(1-o)+c*o}function jl(e){let t=e.terrainSource??e,n=t.biomes?.sites??t.sites;if(!n?.length)return null;if(!Dl.has(n)||Dl.get(n).seed!==t.seed){if(t.surface?.complete){let e={seed:t.seed,globe:Gt(t,n)};return Dl.set(n,e),e}let e=Math.hypot(t.bounds?.width??130,t.bounds?.depth??95),r=Math.min(22,Math.max(4.5,e*.011)),i={farmland:X.grass.clone().lerp(X.farmland,.43),forest:X.grass.clone().lerp(X.forestFloor,.78),plains:X.grass.clone(),desert:X.desert.clone()};Dl.set(n,{seed:t.seed,sites:n.map(e=>({...e,color:e.ice?X.snow:i[e.type]??X.grass})),width:r,period:t.surface?.complete?t.bounds.width:0,distances:new Float64Array(n.length)})}return Dl.get(n)}var Ml={};function Nl(e,t,n,{map:r=!1,target:i=new Y}={}){let a=jl(e);if(!a)return i.copy(X.grass);if(a.globe)return Vt(a.globe,t,n,i);let{sites:o,width:s,distances:c,period:l}=a,u=(e,t,n)=>{if(!l)return Al(e,t,n);let r=((e+l/2)%l+l)%l,i=Ol(r/l);return Al(r,t,n)*(1-i)+Al(r-l,t,n)*i},d=t+(u(t+171,n-87,45)-.5)*s*.85,f=n+(u(t-73,n+119,39)-.5)*s*.85,p=1/0,m=0,h=0,g=0,_=0,v=0;for(let e=0;e<o.length;e++){let t=l?((d-o[e].x+l/2)%l+l)%l-l/2:d-o[e].x;c[e]=Math.hypot(t,f-o[e].z),p=Math.min(p,c[e])}i.setRGB(0,0,0);for(let e=0;e<o.length;e++){let t=Ol(1-(c[e]-p)/s),n=o[e].color,r=o[e];i.r+=n.r*t,i.g+=n.g*t,i.b+=n.b*t,m+=t,r.ice?_+=t:r.type===`forest`?h+=t:r.type===`desert`?g+=t:r.type===`plains`&&(v+=t)}i.multiplyScalar(1/m),Rt(e.terrainSource??e,t,n,Ml),Ut(i,Ml,h/m,g/m,_/m,v/m);let y=(u(t,n,29)-.5)*.09+(u(t+243,n-192,91)-.5)*.07;return i.multiplyScalar(1+y*(r?.42:1)),r&&i.lerp(X.trim,.09),i}function Pl(e,t,{map:n=!1,maxEdge:r=n?24:8}={}){if(!Number.isFinite(r)||r<=0)throw TypeError(`Terrain color edge spacing must be positive and finite`);let i=e.attributes.position,a=e.index,o=[],s=[],c=new Y,l=[],u=r*r,d=!n&&t.terrainChunk?t.bounds:null,f=new Map,p=new Y,h=d?[[0,d.minX,2],[0,d.maxX,2],[2,d.minZ,0],[2,d.maxZ,0]]:[],g=d?Math.max(1e-6,...h.map(([,e])=>Math.abs(e)*1e-7)):0;function _(e,n,r){let i=`${e}:${n}:${r}`;if(!f.has(i)){let a=e===0?n:r,o=e===2?n:r;f.set(i,Nl(t,a,o))}return f.get(i)}function v(e){for(let[t,n,r]of h)if(Math.abs(e[t]-n)<=g){let i=Math.floor(e[r]/2)*2,a=(e[r]-i)/2;return c.copy(_(t,n,i)),p.copy(_(t,n,i+2)),c.lerp(p,a)}return Nl(t,e[0],e[2],{map:n,target:c})}function y(e){for(let t=0;t<3;t++){let n=e[t],r=e[(t+1)%3];for(let[e,i,a]of h){if(Math.abs(n[e]-i)>g||Math.abs(r[e]-i)>g)continue;let o=Math.min(n[a],r[a]),s=Math.max(n[a],r[a]),c=Math.ceil((o+g)/2)*2,l=Math.floor((s-g)/2)*2;if(c>l)continue;let u=Math.max(c,Math.min(l,Math.round((o+s)/2/2)*2)),d=(u-n[a])/(r[a]-n[a]),f=n.map((e,t)=>e+(r[t]-e)*d);return f[a]=u,{j:t,m:f}}}return null}let b=[new Y,new Y,new Y],x=new Y;function S(e){e.forEach((e,n)=>Nl(t,e[0],e[2],{map:!0,target:b[n]}));for(let n of[[.5,.5,0],[0,.5,.5],[.5,0,.5],[1/3,1/3,1/3]]){let r=0,i=0,a=0,o=0,s=0;for(let t=0;t<3;t++){let c=n[t];r+=e[t][0]*c,i+=e[t][2]*c,a+=b[t].r*c,o+=b[t].g*c,s+=b[t].b*c}if(Nl(t,r,i,{map:!0,target:x}),Math.max(Math.abs(x.r-a),Math.abs(x.g-o),Math.abs(x.b-s))>.004)return!1}return!0}let C=e=>[i.getX(e),i.getY(e),i.getZ(e)],w=a?.count??i.count;for(let e=0;e<w;e+=3)for(l.push([C(a?a.getX(e):e),C(a?a.getX(e+1):e+1),C(a?a.getX(e+2):e+2)]);l.length;){let e=l.pop(),t=-1,i=u;for(let n=0;n<3;n++){let r=e[n],a=e[(n+1)%3],o=(r[0]-a[0])**2+(r[2]-a[2])**2;o>i&&(i=o,t=n)}if(t>=0&&n&&i<=(r*8)**2&&S(e)&&(t=-1),t>=0){let n=e[t],r=e[(t+1)%3],i=e[(t+2)%3],a=n.map((e,t)=>(e+r[t])/2);l.push([n,a,i],[a,r,i]);continue}let a=y(e);if(a){let{j:t,m:n}=a,r=e[t],i=e[(t+1)%3],o=e[(t+2)%3];l.push([r,n,o],[n,i,o])}else for(let t of e)o.push(...t),v(t),s.push(c.r,c.g,c.b)}let T=new m;return T.setAttribute(`position`,new ut(o,3)),T.setAttribute(`color`,new ut(s,3)),T.computeVertexNormals(),T}function Fl(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);let n=Object.keys(e.attributes),r=n.map(t=>e.attributes[t]);if(r.some(e=>e.isInterleavedBufferAttribute))throw TypeError(`Surface tessellation needs ordinary buffer attributes`);let i=e.attributes.position;if(!i||i.itemSize!==3)throw TypeError(`Surface tessellation needs three-dimensional positions`);let a=[],o=[],s=0;for(let e of r)a.push(s),o.push(e.itemSize),s+=e.itemSize;let c=a[n.indexOf(`position`)],l=r.map(()=>[]),u=t*t*(1+1e-12),d=e=>{let t=new Float64Array(s);for(let n=0;n<r.length;n++)for(let i=0;i<o[n];i++)t[a[n]+i]=r[n].array[e*o[n]+i];return t},f=(e,t)=>{let n=new Float64Array(s);for(let r=0;r<s;r++)n[r]=(e[r]+t[r])*.5;return n},p=(e,t)=>{let n=e[c]-t[c],r=e[c+2]-t[c+2];return n*n+r*r>u},h=e=>{for(let t=0;t<r.length;t++)for(let n=0;n<o[t];n++)l[t].push(e[a[t]+n])},g=e.index?.array,_=g?.length??i.count,v=[];for(let e=0;e<_;e+=3)for(v.push([d(g?g[e]:e),d(g?g[e+1]:e+1),d(g?g[e+2]:e+2)]);v.length;){let[e,t,n]=v.pop(),r=p(e,t),i=p(t,n),a=p(n,e),o=!!r|(i?2:0)|(a?4:0);if(!o){h(e),h(t),h(n);continue}let s=r?f(e,t):null,c=i?f(t,n):null,l=a?f(n,e):null;o===7?v.push([e,s,l],[s,t,c],[l,c,n],[s,c,l]):o===1?v.push([e,s,n],[s,t,n]):o===2?v.push([e,t,c],[e,c,n]):o===4?v.push([e,t,l],[t,n,l]):o===3?v.push([e,s,n],[s,c,n],[s,t,c]):o===5?v.push([e,s,l],[s,t,n],[s,n,l]):v.push([e,t,c],[e,c,l],[l,c,n])}let y=new m;for(let e=0;e<r.length;e++)y.setAttribute(n[e],new ut(l[e],o[e],r[e].normalized));return y}function Il(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);if(!e.length)return[];let n=[],r=e[0],i=e.at(-1),a=r[0]===i[0]&&r[1]===i[1];for(let r=0;r<e.length-+!!a;r++){let i=e[r],a=e[(r+1)%e.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=2**Math.max(0,Math.ceil(Math.log2(o/t)));for(let e=0;e<s;e++)n.push([i[0]+(a[0]-i[0])*e/s,i[1]+(a[1]-i[1])*e/s])}return a&&n.push([...r]),n}function Ll(e){if(e.index)throw TypeError(`Exact indexing requires non-indexed geometry`);if(Object.keys(e.morphAttributes).length)throw TypeError(`Exact indexing does not support morph attributes`);let t=Object.keys(e.attributes),n=t.map(t=>e.attributes[t]),r=e.attributes.position?.count??0;for(let e of n)if(e.isInterleavedBufferAttribute||!(e.array instanceof Float32Array)||e.count!==r||!Number.isInteger(e.itemSize)||e.itemSize<1)throw TypeError(`Exact indexing requires equally sized, non-interleaved Float32 attributes`);let i=n.map(e=>new Uint32Array(e.array.buffer,e.array.byteOffset,e.array.length)),a=new Uint32Array(r),o=new Uint32Array(r),s=1;for(;s<r*2;)s*=2;let c=new Int32Array(s),l=s-1,u=0;for(let e=0;e<r;e++){let t=2166136261;for(let r=0;r<n.length;r++){let a=n[r].itemSize,o=e*a;for(let e=0;e<a;e++)t=Math.imul(t^i[r][o+e],16777619)}t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16;let r=t&l;for(;c[r];){let t=c[r]-1,a=!0;for(let r=0;a&&r<n.length;r++){let o=n[r].itemSize,s=e*o,c=t*o;for(let e=0;e<o;e++)if(i[r][s+e]!==i[r][c+e]){a=!1;break}}if(a)break;r=r+1&l}c[r]?a[e]=a[c[r]-1]:(c[r]=e+1,a[e]=u,o[u++]=e)}let d=new m;for(let e=0;e<n.length;e++){let r=n[e],a=r.itemSize,s=new Float32Array(u*a),c=new Uint32Array(s.buffer);for(let t=0;t<u;t++){let n=t*a,r=o[t]*a;for(let t=0;t<a;t++)c[n+t]=i[e][r+t]}let l=new P(s,a,r.normalized);l.name=r.name,l.setUsage(r.usage),l.gpuType=r.gpuType,d.setAttribute(t[e],l)}d.setIndex(new P(u<=65535?new Uint16Array(a):a,1)),d.name=e.name;for(let t of e.groups)d.addGroup(t.start,t.count,t.materialIndex);return d.setDrawRange(e.drawRange.start,e.drawRange.count),d.boundingBox=e.boundingBox?.clone()??null,d.boundingSphere=e.boundingSphere?.clone()??null,d}function Rl(e){return Object.values(e.attributes).reduce((e,t)=>e+t.array.byteLength,0)+(e.index?.array.byteLength??0)}function zl(e,t){let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let[t,o]of e[0]){if(!Number.isFinite(t)||!Number.isFinite(o))throw TypeError(`Map tiles require finite polygon coordinates`);n=Math.min(n,t),i=Math.max(i,t),r=Math.min(r,o),a=Math.max(a,o)}return{left:Math.floor(n/t),right:Math.ceil(i/t),top:Math.floor(r/t),bottom:Math.ceil(a/t)}}var Bl=(e,t,n,r,i)=>[[[[e*i,t*i],[n*i,t*i],[n*i,r*i],[e*i,r*i],[e*i,t*i]]]];function Vl(e,t=192){if(!(Number.isFinite(t)&&t>0))throw RangeError(`Map tile size must be positive and finite`);if(!Array.isArray(e))throw TypeError(`Map tiles require a MultiPolygon`);let n=[],r=[];for(let n=e.length-1;n>=0;n--){let i=e[n];!Array.isArray(i)||!Array.isArray(i[0])||i[0].length<3||r.push({polygon:i,...zl(i,t)})}for(;r.length;){let{polygon:e,left:i,right:a,top:o,bottom:s}=r.pop();if(a<=i||s<=o)continue;if(a-i<=1&&s-o<=1){n.push(e);continue}let c=a-i>=s-o,l=Math.floor(c?(i+a)/2:(o+s)/2),u=c?[{left:i,right:l,top:o,bottom:s},{left:l,right:a,top:o,bottom:s}]:[{left:i,right:a,top:o,bottom:l},{left:i,right:a,top:l,bottom:s}];for(let n=u.length-1;n>=0;n--){let i=u[n],a=q.intersection([e],Bl(i.left,i.top,i.right,i.bottom,t));for(let e=a.length-1;e>=0;e--){let n=a[e],o=zl(n,t);r.push({polygon:n,left:Math.max(i.left,o.left),right:Math.min(i.right,o.right),top:Math.max(i.top,o.top),bottom:Math.min(i.bottom,o.bottom)})}}}return n}var Hl=new WeakMap,Ul=new J,Wl={},Gl=zt(.57,.092,235),Kl=zt(.615,.091,224),ql=zt(.72,.082,202),Jl=zt(.64,.055,219),Yl=zt(.75,.045,207),Xl=X.sand.clone().lerp(X.oceanLight,.32).multiplyScalar(.94),Zl=X.rockLight.clone().lerp(X.oceanLight,.25).multiplyScalar(.87),Ql=X.snow.clone().lerp(X.oceanLight,.26),$l={},eu=new Y,tu=new Y,nu=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e)),ru=(e,t,n)=>{let r=0,i=0;for(let a=0;a<e.length;a++){let o=n[a]-t[a];r+=(e[a]-t[a])*o,i+=o*o}let a=Math.max(0,Math.min(1,r/(i||1))),o=0;for(let r=0;r<e.length;r++)o+=(e[r]-t[r]-(n[r]-t[r])*a)**2;return o};function iu(e){if(!e.length)return null;let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let{a:r,b:i}of e)for(let e=0;e<3;e++)t[e]=Math.min(t[e],r[e],i[e]),n[e]=Math.max(n[e],r[e],i[e]);if(e.length<=8)return{min:t,max:n,items:e};let r=0;for(let e=1;e<3;e++)n[e]-t[e]>n[r]-t[r]&&(r=e);e.sort((e,t)=>e.a[r]+e.b[r]-(t.a[r]+t.b[r]));let i=e.length>>1;return{min:t,max:n,left:iu(e.slice(0,i)),right:iu(e.slice(i))}}function au(e,t,n){let r=n*n,i=e=>e.min.reduce((n,r,i)=>n+Math.max(r-t[i],0,t[i]-e.max[i])**2,0),a=e=>{if(!(!e||i(e)>r)){if(e.items)for(let n of e.items)r=Math.min(r,ru(t,n.a,n.b));else i(e.left)<i(e.right)?(a(e.left),a(e.right)):(a(e.right),a(e.left))}};return a(e),Math.sqrt(r)}function ou(e){let t=e.terrainSource??e,n=t.biomes?.ocean??t.ocean;if(!n?.length)return null;let r=Hl.get(n);if(r)return r;let i=t.surface?.complete,a=i?t.bounds?.width??2*Math.PI*t.surface.radius:0,o=[],s=[],c=new J,l=new J;for(let e of n)for(let n of e)for(let e=0;e<n.length;e++){let r=n[e],u=n[(e+1)%n.length];r[0]===u[0]&&r[1]===u[1]||i&&(Math.abs(Math.abs(r[0])-a/2)<.002&&Math.abs(r[0]-u[0])<.002||Math.abs(Math.abs(r[1])-a/4)<.002&&Math.abs(r[1]-u[1])<.002)||(o.push({a:r,b:u,minX:Math.min(r[0],u[0]),maxX:Math.max(r[0],u[0]),minZ:Math.min(r[1],u[1]),maxZ:Math.max(r[1],u[1])}),i&&(je(t,...r,c).multiplyScalar(t.surface.radius),je(t,...u,l).multiplyScalar(t.surface.radius),s.push({a:c.toArray(),b:l.toArray()})))}return r={source:t,period:a,edges:new oo(o),sphere:iu(s)},Hl.set(n,r),r}function su(e,t,n,r=1/0){let i=ou(e);if(!i)return r;let a=i.period?[0,-i.period,i.period]:[0],o=r;for(let e of a)o=i.edges.nearest(t+e,n,r=>Math.sqrt(ru([t+e,n],r.a,r.b)),o);return o}function cu(e,t,n,r=new Y){let i=e.terrainSource??e;if(!i.surface?.complete)return r.copy(X.ocean);je(i,t,n,Ul),Tt(i,t,n,Wl);let{x:a,y:o,z:s}=Ul,c=Math.abs(Wl.latitude)/90,l=(Math.sin(a*5.1+o*2.3-s*3.7)+Math.sin(o*6.3+s*4.2+a*1.7))*.25+.5;r.copy(Gl).lerp(Kl,.38+.42*l-.15*c);let u=nu((c-.5)/.43);r.lerp(Jl,u*.26);let d=ou(i),f=(24+18*l)*(1-u*.32),p=d?.sphere?au(d.sphere,[a*i.surface.radius,o*i.surface.radius,s*i.surface.radius],f*2):f*2,m=Math.exp(-((p/f)**2))*(.64-.16*c);return tu.copy(ql).lerp(Yl,u*.72),r.lerp(tu,m)}function lu(e,t,n,{map:r=!1,target:i=new Y}={}){let a=e.terrainSource??e,o=a.biomes?.shoreWidth??a.shoreWidth??.9,s=su(a,t,n,o*2);if(s>=o*1.5)return i.copy(X.sand);let c=nu(s/o);Nl(a,t,n,{map:r,target:i}),Rt(a,t,n,$l);let l=nu(($l.patch-.3)/.5)*.58,u=a.surface?.complete?nu((Math.abs($l.latitude)-61)/18):0;return eu.copy(Xl).lerp(Zl,l).lerp(Ql,u*.8),i.lerp(eu,1-c)}function uu(e,t,n){let r=t.surface.projection?.radius??t.surface.radius,i=2*Math.PI*r,a=[];for(let t of e)for(let e of t)for(let t=0;t<e.length;t++){let n=e[t],r=e[(t+1)%e.length],o=r[0]-n[0],s=r[1]-n[1];o===0&&s===0||Math.abs(Math.abs(n[0])-i/2)<.002&&Math.abs(o)<.002||Math.abs(Math.abs(n[1])-i/4)<.002&&Math.abs(s)<.002||a.push({a:n,b:r,dx:o,dz:s,length2:o*o+s*s,minX:Math.min(n[0],r[0]),maxX:Math.max(n[0],r[0]),minZ:Math.min(n[1],r[1]),maxZ:Math.max(n[1],r[1])})}let o=new oo(a);return(e,t,r)=>{let a=48;for(let n of[0,-i,i]){let r=e+n;a=o.nearest(r,t,e=>{let n=Math.max(0,Math.min(1,((r-e.a[0])*e.dx+(t-e.a[1])*e.dz)/e.length2));return Math.hypot(r-e.a[0]-n*e.dx,t-e.a[1]-n*e.dz)},a)}let s=Math.max(0,Math.min(1,a/48)),c=s*s*(3-2*s);return Nl(n,e,t,{map:!0,target:r}),r.multiplyScalar(1-.07*c).lerp(X.forestFloor,.18*c).lerp(X.mountainFloor,.08*c)}}function du(e,t=e){let n=t.surface?.type===`sphere`,r=t.surface?.complete,i=new Map;function a(a,s,c,l=!1,u=null){for(let d of r?Vl(a,128):a){let a=n?d.map(e=>Il(e,8)):d,f=new D(a[0].map(([e,t])=>new W(e,-t)));for(let e of a.slice(1))f.holes.push(new o(e.map(([e,t])=>new W(e,-t))));let p=new mt(f);if(p.rotateX(-Math.PI/2),p.translate(0,s,0),l&&!r){let t=p;p=Pl(t,e.colorField,{map:!0}),t.dispose()}if(n){for(let e of Object.keys(p.attributes))e!==`position`&&e!==`color`&&p.deleteAttribute(e);let t=p;if(p=Fl(t,r&&c===`terrain`?32:16),t.dispose(),r){let t=p;if(p=Ll(t),t.dispose(),l){let t=p.attributes.position,n=new Float32Array(t.count*3),r=new Y;for(let i=0;i<t.count;i++)Nl(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),n[i*3]=r.r,n[i*3+1]=r.g,n[i*3+2]=r.b;p.setAttribute(`color`,new P(n,3))}}}if(c===`sand`||u){let t=p.attributes.position,n=new Float32Array(t.count*3),r=new Y;for(let i=0;i<t.count;i++)u?u(t.getX(i),t.getZ(i),r):lu(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),r.toArray(n,i*3);p.setAttribute(`color`,new P(n,3))}n&&(p.scale(1,16,1),fe(p,t));let m=p.index&&!r?p.toNonIndexed():p;i.has(c)||i.set(c,[]),i.get(c).push({position:m.attributes.position.array,vertexColor:m.attributes.color?.array,index:r?m.index?.array:void 0}),m!==p&&p.dispose(),m.dispose()}}a(e.land,0,`terrain`,!0),a(e.shores,.003,`sand`),a(e.river,.006,`waterLight`),t.surface?.complete||a(e.ocean,n?.01:.007,`ocean`);for(let n of e.mountains)a(n.low,.02,`contour0`,!1,r?uu(n.low,t,e.colorField):null),a(n.high,.023,`contour1`),a(n.snow,.033,`snow`);return[...i].map(([e,t])=>{let i=new Float32Array(t.reduce((e,t)=>e+t.position.length,0)),a=t[0].vertexColor?new Float32Array(i.length):void 0,o=0;for(let e of t)i.set(e.position,o),a?.set(e.vertexColor,o),o+=e.position.length;if(r){let n=new Uint32Array(t.reduce((e,t)=>e+t.index.length,0)),r=0,o=0;for(let e of t){for(let t of e.index)n[r++]=o+t;o+=e.position.length/3}return{color:e,position:i,index:n,...a?{vertexColor:a}:{}}}if(n){let t=new m;t.setAttribute(`position`,new P(i,3)),a&&t.setAttribute(`color`,new P(a,3));let n=Ll(t);if(Rl(n)<Rl(t)){let r={color:e,position:n.attributes.position.array,index:n.index.array,...a?{vertexColor:n.attributes.color.array}:{}};return t.dispose(),n.dispose(),r}t.dispose(),n.dispose()}return{color:e,position:i,...a?{vertexColor:a}:{}}})}function fu(e,t){return e.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t},e.vertexShader=`uniform float mapSurfaceRadius; varying float globeLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
      vec3 viewNormal=mat3(viewMatrix)*radialNormal;
      globeLight=0.44+0.62*max(0.0,dot(viewNormal,normalize(vec3(-0.48,0.58,0.92))));`),e.fragmentShader=`varying float globeLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= globeLight;
 outgoingLight *= mix(vec3(0.91,0.97,1.05), vec3(1.04,1.01,0.93), smoothstep(0.50,1.0,globeLight));
#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`complete-globe-light-v2`,e}var pu={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`},mu={grass:X.grass.clone().lerp(X.trim,.1),farmland:X.farmland.clone().lerp(X.trim,.08),forestFloor:X.forestFloor.clone().lerp(X.grass,.27),desert:X.desert.clone(),mountainFloor:X.mountainFloor.clone().lerp(X.grass,.25),contour0:X.forestFloor.clone().lerp(X.grass,.32),contour1:X.rockLight.clone().lerp(X.grass,.2),ink:X.window.clone().lerp(X.rail,.18),paper:X.trim.clone()};function hu(e){let t=new D(e[0].map(([e,t])=>new W(e,-t)));e.slice(1).forEach(e=>t.holes.push(new o(e.map(([e,t])=>new W(e,-t)))));let n=new mt(t);return n.rotateX(-Math.PI/2),n}function gu(e,t){let n=e/2,r=(t-e)/2,i=new D;i.moveTo(-n,-r),i.lineTo(-n,r),i.absarc(0,r,n,Math.PI,0,!0),i.lineTo(n,-r),i.absarc(0,-r,n,0,-Math.PI,!0),i.closePath();let a=new mt(i,2);return a.rotateX(-Math.PI/2),a}function _u(e,t,n,r=1,i=1){let a=p.clamp(Math.round(Number(e.level)||1),1,10),o=(1.75+a*.12)*r,s=a<=3?[[-.61,.48],[.61,.48],[.61,-.1],[0,-.68],[-.61,-.1]]:a<=6?[[-.75,.48],[.75,.48],[.75,-.07],[.43,-.07],[.43,-.34],[0,-.68],[-.43,-.34],[-.43,-.07],[-.75,-.07]]:[[-.73,.48],[.73,.48],[.73,-.07],[.39,-.07],[.39,-.4],[.18,-.4],[.18,-.74],[-.18,-.74],[-.18,-.4],[-.39,-.4],[-.39,-.07],[-.73,-.07]],c=t?yl(t):{body:X.roof,trim:X.trim},l=(e,t,n)=>{let r=hu([e]),a=r.toNonIndexed();r.dispose(),a.translate(0,n*i,0);let o=new Float32Array(a.attributes.position.count*3);for(let e=0;e<o.length;e+=3)o[e]=t.r,o[e+1]=t.g,o[e+2]=t.b;return a.setAttribute(`color`,new P(o,3)),a},u=(e,t,n)=>l(Array.from({length:12},(t,n)=>[Math.cos(n*Math.PI/6)*o*e,Math.sin(n*Math.PI/6)*o*e]),t,n),d=u(1,mu.ink,.091),f=u(.89,c.trim,.094),m=l(s.map(([e,t])=>[e*o,t*o]),c.body,.097),h=$a([d,f,m],!1);d.dispose(),f.dispose(),m.dispose();let g=h.attributes.position.count,_=new Float32Array(g*3);for(let e=0;e<g;e++)c.body.toArray(_,e*3);h.setAttribute(`cityDotColor`,new P(_,3)),h.setAttribute(`cityCompactScale`,new P(new Float32Array(g).fill(Ia/(2*La(a))),1));let v=new K(h,n);return v.name=`map-city-${e.id}`,v.position.set(e.x,0,e.z),v.userData={cityId:e.id,ownerId:e.ownerId??null,level:a},v}function vu(t,n){let r=n.surface?.type===`sphere`,a=r?16:1,o=new yt;o.name=`map-world`,t.add(o);let s=new yt;s.name=`map-static`,o.add(s);let c=new yt;c.name=`map-cities`,o.add(c);let l=new yt;l.name=`map-trains`,o.add(l);let u=new Map((n.players??[]).map(e=>[e.id,e])),d=new Map([...u].map(([e,t])=>[`player:${e}:body`,yl(t).body])),f=e=>u.has(e.state?.ownerId)?`player:${e.state.ownerId}:body`:pu[e.state?.color]??e.state?.color??`redLight`,h=p.clamp(Math.sqrt((n.bounds?.width??130)*(n.bounds?.depth??95)/12350),1,2.6),g=new Map,_=new Map,v=new Set,b=[],x=[],S=[],C=new J,w=new J,T=new J,E=new J,D=new J,O=new J,ee=(e,t)=>(De(n,e.x,e.z,t),t.setPosition(ue(n,e.x,0,e.z,C)),t),k={cityBatches:0,trainBatches:0,updatedCars:0,staticVertices:0,farTrains:!1,declutterPasses:0,cityAttributeUpdates:0,networkVisibility:1},A={value:1},te={value:1},ne={value:1},re=!1,j=(e,t=!1)=>{g.has(e)||g.set(e,new i({name:`map-${e}`,color:t||e===`terrain`?16777215:d.get(e)??mu[e.replace(`route-`,``)]??X[e]??X.trim,vertexColors:t||e===`terrain`,side:2,toneMapped:!1}));let a=g.get(e);if(e.startsWith(`route-`)&&!a.userData.routeShader&&(a.userData.routeShader=!0,a.onBeforeCompile=e=>{e.uniforms.mapRouteScale=A,e.vertexShader=`attribute vec3 routeOffset; uniform float mapRouteScale;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position) + routeOffset * (mapRouteScale - 1.0);`)},a.customProgramCacheKey=()=>`map-route-width`),r&&[`terrain`,`sand`,`waterLight`,`ocean`,`contour0`,`contour1`,`snow`].includes(e)&&!a.userData.surfaceShader&&(a.userData.surfaceShader=!0,a.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:n.surface.radius},e.vertexShader=`uniform float mapSurfaceRadius; varying float surfaceLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
          vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
          surfaceLight=0.52+0.52*max(0.0,dot(radialNormal,normalize(vec3(-0.45,0.82,0.35))));`),e.fragmentShader=`varying float surfaceLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= surfaceLight;
#include <opaque_fragment>`)},a.customProgramCacheKey=()=>`map-surface-light`,n.surface.complete&&fu(a,n.surface.radius)),!a.userData.mapStyle){a.userData.mapStyle=!0;let t=e.startsWith(`route-`)||e===`paper`||e.startsWith(`player:`)||Object.values(pu).includes(e);Ht(a,{kind:t?`map-symbol`:[`ocean`,`waterLight`].includes(e)?`water`:`map`,role:e.endsWith(`paper`)?`paper`:e.endsWith(`ink`)?`ink`:`owner`}),t&&za(a,ne)}return a},M=(e,t,n=0,r=0,i=0,a=0)=>{e.rotateY(a),e.translate(r,n,i);let o=e.index?e.toNonIndexed():e;o!==e&&e.dispose();for(let e of Object.keys(o.attributes))e!==`position`&&e!==`routeOffset`&&o.deleteAttribute(e);_.has(t)||_.set(t,[]),_.get(t).push(o)},N=(e,t,i,o)=>{let s=[],c=[];for(let o=0;o<e.length-1;o++){let l=e[o],u=e[o+1],d=u.x-l.x,f=u.z-l.z,p=Math.hypot(d,f)||1,m=e=>e.tangent?{x:e.tangent.z,z:-e.tangent.x}:{x:f/p,z:-d/p},h=m(l),g=m(u),_=[{x:l.x-h.x*t/2,z:l.z-h.z*t/2},{x:l.x+h.x*t/2,z:l.z+h.z*t/2},{x:u.x-g.x*t/2,z:u.z-g.z*t/2},{x:u.x+g.x*t/2,z:u.z+g.z*t/2}],v=r?[l,u].flatMap((e,r)=>{let o=r?g:h;return ue(n,e.x,i*a,e.z,T),je(n,e.x,e.z,E),Ot(n,e.x,i*a,e.z,-o.z,0,o.x,D).normalize(),O.crossVectors(E,D).normalize(),[-1,1].map(e=>(w.copy(T).addScaledVector(O,e*t/2),w.y+=n.surface.radius,w.setLength(n.surface.radius+i*a),w.y-=n.surface.radius,w.clone()))}):null;for(let e of[0,2,1,1,2,3]){let t=e<2?l:u,o=_[e];r?(w.copy(v[e]),ue(n,t.x,i*a,t.z,T),s.push(w.x,w.y,w.z),c.push(w.x-T.x,w.y-T.y,w.z-T.z)):(s.push(o.x,i,o.z),c.push(o.x-t.x,0,o.z-t.z))}}let l=new m;l.setAttribute(`position`,new ut(s,3)),l.setAttribute(`routeOffset`,new ut(c,3)),M(l,o)},ae=n.mapTerrain??El(n);for(let{color:e,position:t,vertexColor:r,index:i}of ae.meshes??du(ae,n)){let n=new m;n.setAttribute(`position`,new P(t,3)),i&&n.setIndex(new P(i,1)),r&&n.setAttribute(`color`,new P(r,3)),_.set(e,[n])}for(let e of n.lines)for(let t of e.renderRanges??[{start:0,end:e.length}]){let n=[t.start];for(let i of e.alignment?.segments??[{startDistance:0,endDistance:e.length,type:`arc`,radius:8}]){let e=Math.max(t.start,i.startDistance),a=Math.min(t.end,i.endDistance);if(a<=e)continue;let o=i.type===`line`?a-e:Math.max(.4,Math.sqrt(8*(i.radius??8)*.025)),s=r?Math.min(8,o):o,c=Math.max(1,Math.ceil((a-e)/s));for(let t=1;t<=c;t++)n.push(e+(a-e)*t/c)}let i=n.map(t=>Qc(e,t));N(i,.96,.075,`route-paper`),N(i,.42,.078,`route-ink`)}for(let[e,t]of _){let n=$a(t,!1);v.add(n);let r=new K(n,j(e,!!n.attributes.color));r.name=`map-${e.replace(`route-`,``)}`,s.add(r),e.startsWith(`route-`)&&(r.frustumCulled=!1,S.push(r)),k.staticVertices+=n.attributes.position.count,t.forEach(e=>e.dispose())}_.clear();let F=new i({name:`map-city`,vertexColors:!0,side:2,toneMapped:!1});F.onBeforeCompile=e=>{e.uniforms.mapCityScale=te,e.vertexShader=`uniform float mapCityScale; attribute float cityDetail; attribute float cityCompactScale; attribute vec3 cityDotColor;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,`#include <color_vertex>
      #ifdef USE_COLOR
        vColor.xyz=mix(cityDotColor,vColor.xyz,cityDetail);
      #endif`),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`float citySize=mapCityScale*mix(cityCompactScale,1.0,cityDetail); vec3 transformed = vec3(position.x * citySize, position.y, position.z * citySize);`)},F.customProgramCacheKey=()=>`map-city-screen-size-v2`,Ht(F,{kind:`map-symbol`,role:`owner`}),za(F,ne),g.set(`city-glyph`,F);let oe=(e,t,i=0,a=!1)=>x.push({city:e,attribute:t,index:i,instanced:a,detail:1,target:1,anchor:ue(n,e.x,0,e.z),normal:r?je(n,e.x,e.z):null});if((n.cities?.length??0)<=32)for(let t of n.cities??[]){let n=_u(t,u.get(t.ownerId),F,h,a),i=new P(new Float32Array(n.geometry.attributes.position.count).fill(1),1);i.setUsage(e),n.geometry.setAttribute(`cityDetail`,i),oe(t,i),r&&(n.matrixAutoUpdate=!1,ee(t,n.matrix)),n.frustumCulled=!1,v.add(n.geometry),c.add(n)}else{let t=new Map,r=new ie;for(let e of n.cities){let n=`${e.ownerId}:${e.level}`;t.has(n)||t.set(n,[]),t.get(n).push(e)}for(let[n,i]of t){let t=_u(i[0],u.get(i[0].ownerId),F,h,a),o=new Le(new Float32Array(i.length).fill(1),1);o.setUsage(e),t.geometry.setAttribute(`cityDetail`,o),v.add(t.geometry);let s=new Ve(t.geometry,F,i.length);s.frustumCulled=!1,s.name=`map-city-batch-${n}`,s.userData.instanceCityIds=i.map(e=>e.id),i.forEach((e,t)=>{ee(e,r),s.setMatrixAt(t,r),oe(e,o,t,!0)}),s.computeBoundingSphere(),c.add(s),b.push(s)}}k.cityBatches=c.children.length,x.sort((e,t)=>(t.city.level??1)-(e.city.level??1)||String(e.city.id).localeCompare(String(t.city.id)));let I=new J(1/0,0,0),se=new y,ce=new J,le=new J,L=new J,de=NaN,fe=NaN,pe=NaN,me=1/0;function he(e,t,n,r,i){if(!e?.isOrthographicCamera||!x.length)return;let a=(e.right-e.left)/(e.top-e.bottom),s=n*a;if(me+=r,(Math.abs(Math.log(t/de))>.015||fe!==n||pe!==a||e.position.distanceToSquared(I)>(t*2)**2||e.quaternion.angleTo(se)>.003)&&me>=.075){o.updateWorldMatrix(!0,!1),e.getWorldDirection(L);let r=Ba(x.map(t=>{ce.copy(t.anchor).applyMatrix4(o.matrixWorld).project(e);let r=!t.normal||le.copy(t.normal).transformDirection(o.matrixWorld).dot(L)<-.035;return{id:t.city.id,x:ce.x*s/2,y:ce.y*n/2,radius:La(t.city.level),previous:t.target,visible:r&&Math.abs(ce.x)<1+2*La(10)/s&&Math.abs(ce.y)<1+2*La(10)/n&&Math.abs(ce.z)<=1}}),t);for(let e of x)e.target=r.get(e.city.id);I.copy(e.position),se.copy(e.quaternion),de=t,fe=n,pe=a,me=0,k.declutterPasses++}let c=i?1:1-Math.exp(-12*Math.min(.1,Math.max(0,r))),l=new Set;for(let e of x){let t=Math.abs(e.detail-e.target)<.002?e.target:e.detail+(e.target-e.detail)*c;t!==e.detail&&(e.detail=t,e.instanced?e.attribute.setX(e.index,t):e.attribute.array.fill(t),l.add(e.attribute))}for(let e of l)e.needsUpdate=!0,k.cityAttributeUpdates++}let ge=Math.min(h,1.8),_e=gu(1.22*ge,2.45),ve=gu(.92*ge,2.13);for(let e of[_e,ve])v.add(e);let ye=new J,be=new J,R=new y,z=null,xe=[],Se=[],Ce=[],we=[],Te=!1,Ee=new J,B=new J,Oe=new J,ke=new J,V={},Ae={},H=NaN,U=NaN,Me=(t,n,r,i)=>{let a=new Ve(t,j(n),r);return a.name=i,a.frustumCulled=!1,a.instanceMatrix.setUsage(e),l.add(a),a},Ne=(e,t,i,o,s,c,l,u=1,d=1)=>{let f=e.instanceMatrix.array,p=t*16,m=Math.cos(s)*l,h=Math.sin(s)*l;if(r){(i!==H||o!==U)&&(je(n,i,o,B),H=i,U=o),ue(n,i,c*a,o,Ee),Ot(n,i,c*a,o,h,0,m,Oe).normalize(),ke.crossVectors(B,Oe).normalize();for(let e=0;e<3;e++)f[p+e]=ke.getComponent(e)*l*u,f[p+4+e]=B.getComponent(e)*l,f[p+8+e]=Oe.getComponent(e)*l*d;f[p+12]=Ee.x,f[p+13]=Ee.y,f[p+14]=Ee.z}else f[p]=m*u,f[p+1]=0,f[p+2]=-h*u,f[p+4]=0,f[p+5]=l,f[p+6]=0,f[p+8]=h*d,f[p+9]=0,f[p+10]=m*d,f[p+12]=i,f[p+13]=c,f[p+14]=o;f[p+3]=0,f[p+7]=0,f[p+11]=0,f[p+15]=1};function Pe(e=[],{visible:t=!0,camera:i,viewportHeight:a=900,poseBuffer:s=e.poseBuffer,dt:u=1/60,reducedMotion:d=!1}={}){if(k.updatedCars=0,re||!t)return;let p=i?.isOrthographicCamera?(i.top-i.bottom)/i.zoom/Math.max(1,a):0,m=Va(p,h,ge);A.value=m.routeScale,te.value=m.cityScale,ne.value=k.networkVisibility=Ra(i?.zoom);let g=ne.value>0;c.visible=l.visible=g;for(let e of S)e.visible=g;if(!g)return;he(i,p,a,u,d);let _=m.trainScaleZ>1,v=z!==e||Se.length!==e.length||Te!==_;Te=_,k.farTrains=Te;for(let t=0;!v&&t<e.length;t++)v=Se[t]!==e[t].state?.ownerId||Ce[t]!==e[t].state?.color||we[t]!==e[t].parts;if(v){l.children.forEach(e=>e.dispose()),l.clear(),xe=[],z=e,Se=e.map(e=>e.state?.ownerId),Ce=e.map(e=>e.state?.color),we=e.map(e=>e.parts);let t=e.flatMap(e=>(Te?[e.parts[Math.floor(e.parts.length/2)]]:e.parts).filter(Boolean).map(t=>({train:e,part:t}))),n=t.length;if(n){let e=Me(_e,`paper`,n,`map-train-outlines`),r=new Map;for(let{train:e}of t){let t=f(e);r.set(t,(r.get(t)??0)+1)}let i=new Map([...r].map(([e,t])=>[e,{mesh:Me(ve,e,t,`map-train-${e}`),next:0}]));t.forEach(({train:t,part:n},r)=>{let a=i.get(f(t));xe.push({train:t,part:n,outlineIndex:r,outline:e,body:a.mesh,bodyIndex:a.next++})})}k.trainBatches=l.children.length}o.updateWorldMatrix(!0,!1);let y=Te?m.trainScaleX:1,b=Te?m.trainScaleZ:1;for(let e of xe){let{train:t,part:i}=e,a,c,l,u;if(s&&i.userData.poseOnly){let e=i.userData.poseIndex*6;a=s[e],c=s[e+2],l=s[e+3],u=+(s[e+4]>0&&t.state?.active!==!1)}else i.userData.poseOnly?(a=i.position.x,c=i.position.z,l=i.rotation.y,u=i.visible&&t.state?.active!==!1?1:0):(i.getWorldPosition(ye),i.getWorldQuaternion(R),be.set(0,0,1).applyQuaternion(R).add(ye),o.worldToLocal(ye),o.worldToLocal(be),be.sub(ye),r?(ft(n,ye,V),ft(n,be.add(ye),Ae),a=V.x,c=V.z,l=Math.atan2(Ae.x-a,Ae.z-c)):(a=ye.x,c=ye.z,l=Math.atan2(be.x,be.z)),u=i.visible&&t.state?.active!==!1?1:0);Ne(e.outline,e.outlineIndex,a,c,l,.12,u,y,b),Ne(e.body,e.bodyIndex,a,c,l,.123,u,y,b),k.updatedCars++}l.children.forEach(e=>{e.instanceMatrix.needsUpdate=!0})}function Fe(){re||(re=!0,l.children.forEach(e=>e.dispose()),b.forEach(e=>e.dispose()),v.forEach(e=>e.dispose()),g.forEach(e=>e.dispose()),o.clear(),o.removeFromParent())}return{root:o,update:Pe,dispose:Fe,stats:k}}var yu=1.25,bu=65535,xu=2**-24,Su=Symbol(`SKIP_GENERATION`),Cu={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Su]:!1};function wu(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function Tu(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function Eu(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],a=t[e+2*r+1],o=i-a,s=i+a;o<n[r]&&(n[r]=o),s>n[r+3]&&(n[r+3]=s)}}function Du(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function Ou(e,t){return t[e+15]===bu}function ku(e,t){return t[e+6]}function Au(e,t){return t[e+14]}function ju(e){return e+8}function Mu(e,t){return e+t[e+6]*8}function Nu(e,t){return t[e+7]}function Pu(e){return e}function Fu(e,t,n,r,i){let a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,m=-1/0,h=-1/0,g=-1/0,_=e.offset||0;for(let r=(t-_)*6,i=(t+n-_)*6;r<i;r+=6){let t=e[r+0],n=e[r+1],i=t-n,_=t+n;i<a&&(a=i),_>c&&(c=_),t<d&&(d=t),t>m&&(m=t);let v=e[r+2],y=e[r+3],b=v-y,x=v+y;b<o&&(o=b),x>l&&(l=x),v<f&&(f=v),v>h&&(h=v);let S=e[r+4],C=e[r+5],w=S-C,T=S+C;w<s&&(s=w),T>u&&(u=T),S<p&&(p=S),S>g&&(g=S)}r[0]=a,r[1]=o,r[2]=s,r[3]=c,r[4]=l,r[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=m,i[4]=h,i[5]=g}var Iu=8,Lu=8,Ru=new Int32Array(Iu),zu=new Float32Array(48),Bu=new Float32Array(48),Vu=new Float32Array(6),Hu=new Float32Array(6),Uu=new Int32Array(Lu),Wu=new Float32Array(48);function Gu(e,t,n,r){for(let i=0;i<3;i++){let a=t[e+2*i],o=t[e+2*i+1],s=a-o,c=a+o;s<n[r+i]&&(n[r+i]=s),c>n[r+i+3]&&(n[r+i+3]=c)}}function Ku(e,t){let n=e[t+3]-e[t],r=e[t+4]-e[t+1],i=e[t+5]-e[t+2];return 2*(n*r+r*i+i*n)}function qu(e,t,n,r,i,a){let o=-1,s=0;if(a===0)o=Tu(t),o!==-1&&(s=(t[o]+t[o+3])/2);else if(a===1)o=Tu(e),o!==-1&&(s=Ju(n,r,i,o));else if(a===2){let a=Du(e),c=yu*i,l=n.offset||0,u=(r-l)*6,d=(r+i-l)*6;for(let e=0;e<3;e++){let r=t[e],l=(t[e+3]-r)/Iu;if(i<Lu){for(let t=0;t<i;t++){let r=u+t*6,i=n[r+2*e],a=t;for(;a>0&&n[Uu[a-1]+2*e]>i;)Uu[a]=Uu[a-1],a--;Uu[a]=r}for(let e=0;e<3;e++)Vu[e]=1/0,Vu[e+3]=-1/0,Hu[e]=1/0,Hu[e+3]=-1/0;for(let e=i-1;e>=0;e--)Eu(Uu[e],n,Hu),Wu.set(Hu,e*6);for(let t=0;t<i-1;t++){Eu(Uu[t],n,Vu);let r=n[Uu[t+1]+2*e];if(n[Uu[t]+2*e]===r)continue;let l=t+1,u=i-l,d=Du(Vu)/a,f=Ku(Wu,l*6)/a,p=1+yu*(d*l+f*u);p<c&&(o=e,c=p,s=r)}}else{for(let e=0;e<Iu;e++){Ru[e]=0;for(let t=0;t<3;t++)zu[e*6+t]=1/0,zu[e*6+t+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((n[t+2*e]-r)/l);i>=Iu&&(i=7),Ru[i]++,Gu(t,n,zu,i*6)}for(let e=0;e<6;e++)Bu[42+e]=zu[42+e];for(let e=6;e>=0;e--){let t=e*6,n=t+6;for(let e=0;e<3;e++)Bu[t+e]=Math.min(zu[t+e],Bu[n+e]),Bu[t+e+3]=Math.max(zu[t+e+3],Bu[n+e+3])}let t=0;for(let n=0;n<7;n++){let u=n*6,d=Ru[n];if(d!==0)for(let e=0;e<3;e++)t===0?(Vu[e]=zu[u+e],Vu[e+3]=zu[u+e+3]):(Vu[e]=Math.min(Vu[e],zu[u+e]),Vu[e+3]=Math.max(Vu[e+3],zu[u+e+3]));t+=d;let f=0,p=0;t!==0&&(f=Du(Vu)/a);let m=i-t;m!==0&&(p=Ku(Bu,u+6)/a);let h=1+yu*(f*t+p*m);h<c&&(o=e,c=h,s=r+l+n*l)}}}}else typeof a==`function`?{axis:o,pos:s}=a(e,t,n,r,i,n.offset):console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:o,pos:s}}function Ju(e,t,n,r){let i=0,a=e.offset;for(let o=t,s=t+n;o<s;o++)i+=e[(o-a)*6+r*2];return i/n}function Yu(e,t,n,r,i,a){let o=r,s=r+i-1,c=a.pos,l=a.axis*2,u=n.offset||0;for(;;){for(;o<=s&&n[(o-u)*6+l]<c;)o++;for(;o<=s&&n[(s-u)*6+l]>=c;)s--;if(o<s){for(let n=0;n<t;n++){let r=e[o*t+n];e[o*t+n]=e[s*t+n],e[s*t+n]=r}for(let e=0;e<6;e++){let t=o-u,r=s-u,i=n[t*6+e];n[t*6+e]=n[r*6+e],n[r*6+e]=i}o++,s--}else return o}}var Xu=2**32,Zu=new Float32Array(6),Qu=new Float32Array(6);function $u(e,t,n,r,i,a){let{maxDepth:o,verbose:s,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:u,onProgress:d,useSharedArrayBuffer:f=!1}=i,p=e.primitiveBuffer,m=e.primitiveBufferStride,h=new(f?SharedArrayBuffer:ArrayBuffer)(32*Math.max(1,2*Math.ceil(r)-1)),g=new Float32Array(h),_=new Uint32Array(h),v=new Uint16Array(h),y=0,b=!1;return Fu(t,n,r,Zu,Qu),C(n,r,0),h.slice(0,y*32);function x(e){d&&d((e-a.offset)/a.count)}function S(e,t,n){let r=e*2;_[e+6]=t,v[r+14]=n,v[r+15]=bu,x(t+n)}function C(e,n,r){let i=y++,a=i*8;g.set(Zu,a),!b&&r>=o&&(b=!0,s&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));let d=n>l;if(n<=c&&!d||r>=o){S(a,e,n);return}let f=qu(Zu,Qu,t,e,n,u),h=f.axis===-1?-1:Yu(p,m,t,e,n,f);if(f.axis===-1||h===e||h===e+n){if(!d){S(a,e,n);return}f.axis=Math.max(0,Tu(Zu)),h=e+Math.max(1,Math.floor(n/2))}_[a+7]=f.axis;let v=h-e;Fu(t,e,v,Zu,Qu),C(e,v,r+1);let x=y-i;if(x>Xu)throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);_[a+6]=x;let w=n-v;Fu(t,h,w,Zu,Qu),C(h,w,r+1)}}function ed(e,t){let n=e.getRootRanges(t.range),r=n[0],i=n[n.length-1],a={offset:r.offset,count:i.offset+i.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,e.computePrimitiveBounds(a.offset,a.count,o),e._roots=n.map(n=>$u(e,o,n.offset,n.count,t,a))}var td=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},nd=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},rd,id,ad=[],od=new td(()=>new A);function sd(e,t,n,r,i,a){rd=od.getPrimitive(),id=od.getPrimitive(),ad.push(rd,id),nd.setBuffer(e._roots[t]);let o=cd(0,e.geometry,n,r,i,a);nd.clearBuffer(),od.releasePrimitive(rd),od.releasePrimitive(id),ad.pop(),ad.pop();let s=ad.length;return s>0&&(id=ad[s-1],rd=ad[s-2]),o}function cd(e,t,n,r,i=null,a=0,o=0){let{float32Array:s,uint16Array:c,uint32Array:l}=nd,u=e*2;if(Ou(u,c)){let t=ku(e,l),n=Au(u,c);return wu(Pu(e),s,rd),r(t,n,!1,o,a+e/8,rd)}{let u=ju(e),d=Mu(e,l),f=u,p=d,m,h,g,_;if(i&&(g=rd,_=id,wu(Pu(f),s,g),wu(Pu(p),s,_),m=i(g),h=i(_),h<m)){f=d,p=u;let e=m;m=h,h=e,g=_}g||(g=rd,wu(Pu(f),s,g));let v=Ou(f*2,c),y=n(g,v,m,o+1,a+f/8),b;if(y===2){let e=w(f);b=r(e,T(f)-e,!0,o+1,a+f/8,g)}else b=y&&cd(f,t,n,r,i,a,o+1);if(b)return!0;_=id,wu(Pu(p),s,_);let x=Ou(p*2,c),S=n(_,x,h,o+1,a+p/8),C;if(S===2){let e=w(p);C=r(e,T(p)-e,!0,o+1,a+p/8,_)}else C=S&&cd(p,t,n,r,i,a,o+1);return!!C;function w(e){let{uint16Array:t,uint32Array:n}=nd,r=e*2;for(;!Ou(r,t);)e=ju(e),r=e*2;return ku(e,n)}function T(e){let{uint16Array:t,uint32Array:n}=nd,r=e*2;for(;!Ou(r,t);)e=Mu(e,n),r=e*2;return ku(e,n)+Au(r,t)}}}var ld=new nd.constructor,ud=new nd.constructor,dd=new td(()=>new A),fd=new A,pd=new A,md=new A,hd=new A,gd=!1;function _d(e,t,n,r){if(gd)throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);gd=!0;let i=e._roots,a=t._roots,o,s=0,c=0,l=new ie().copy(n).invert();for(let e=0,t=i.length;e<t;e++){ld.setBuffer(i[e]),c=0;let t=dd.getPrimitive();wu(Pu(0),ld.float32Array,t),t.applyMatrix4(l);for(let e=0,i=a.length;e<i&&(ud.setBuffer(a[e]),o=vd(0,0,n,l,r,s,c,0,0,t),ud.clearBuffer(),c+=a[e].byteLength/32,!o);e++);if(dd.releasePrimitive(t),ld.clearBuffer(),s+=i[e].byteLength/32,o)break}return gd=!1,o}function vd(e,t,n,r,i,a=0,o=0,s=0,c=0,l=null,u=!1){let d,f;u?(d=ud,f=ld):(d=ld,f=ud);let p=d.float32Array,m=d.uint32Array,h=d.uint16Array,g=f.float32Array,_=f.uint32Array,v=f.uint16Array,y=e*2,b=t*2,x=Ou(y,h),S=Ou(b,v),C=!1;if(S&&x)C=u?i(ku(t,_),Au(t*2,v),ku(e,m),Au(e*2,h),c,o+t/8,s,a+e/8):i(ku(e,m),Au(e*2,h),ku(t,_),Au(t*2,v),s,a+e/8,c,o+t/8);else if(S){let l=dd.getPrimitive();wu(Pu(t),g,l),l.applyMatrix4(n);let d=ju(e),f=Mu(e,m);wu(Pu(d),p,fd),wu(Pu(f),p,pd);let h=l.intersectsBox(fd),_=l.intersectsBox(pd);C=h&&vd(t,d,r,n,i,o,a,c,s+1,l,!u)||_&&vd(t,f,r,n,i,o,a,c,s+1,l,!u),dd.releasePrimitive(l)}else{let d=ju(t),f=Mu(t,_);wu(Pu(d),g,md),wu(Pu(f),g,hd);let h=l.intersectsBox(md),v=l.intersectsBox(hd);if(h&&v)C=vd(e,d,n,r,i,a,o,s,c+1,l,u)||vd(e,f,n,r,i,a,o,s,c+1,l,u);else if(h){if(x)C=vd(e,d,n,r,i,a,o,s,c+1,l,u);else{let t=dd.getPrimitive();t.copy(md).applyMatrix4(n);let l=ju(e),f=Mu(e,m);wu(Pu(l),p,fd),wu(Pu(f),p,pd);let h=t.intersectsBox(fd),g=t.intersectsBox(pd);C=h&&vd(d,l,r,n,i,o,a,c,s+1,t,!u)||g&&vd(d,f,r,n,i,o,a,c,s+1,t,!u),dd.releasePrimitive(t)}}else if(v){if(x)C=vd(e,f,n,r,i,a,o,s,c+1,l,u);else{let t=dd.getPrimitive();t.copy(hd).applyMatrix4(n);let l=ju(e),d=Mu(e,m);wu(Pu(l),p,fd),wu(Pu(d),p,pd);let h=t.intersectsBox(fd),g=t.intersectsBox(pd);C=h&&vd(f,l,r,n,i,o,a,c,s+1,t,!u)||g&&vd(f,d,r,n,i,o,a,c,s+1,t,!u),dd.releasePrimitive(t)}}}return C}var yd=new class{constructor(){let e=null,t=null,n=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(i,a)=>{if(r)throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);this.root=a,this.buffer=e=i._roots[a],this.uint16Array=n=new Uint16Array(e),this.uint32Array=t=new Uint32Array(e)},this.reset=()=>{this.root=null,this.buffer=e=null,this.uint16Array=n=null,this.uint32Array=t=null},this.getRangeStart=e=>{let r=e*2;for(;!Ou(r,n);)e=ju(e),r=e*2;return ku(e,t)},this.getRangeEnd=e=>{let r=e*2;for(;!Ou(r,n);)e=Mu(e,t),r=e*2;return ku(e,t)+Au(r,n)};let i=(e,r,a)=>{let o=Ou(r*2,n);if(!e(a,o,r)&&!o){let n=ju(r),o=Mu(r,t);i(e,n,a+1),i(e,o,a+1)}};this.traverseBuffer=e=>{if(r)throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);r=!0;try{i(e,0,0)}finally{r=!1}},this.traverse=r=>{this.traverseBuffer((i,a,o)=>{if(a){let s=o*2,c=t[o+6],l=n[s+14];return r(i,a,new Float32Array(e,o*4,6),c,l)}{let n=Nu(o,t);return r(i,a,new Float32Array(e,o*4,6),n)}})}}},bd=`0.10.0`,xd=new A,Sd=new Float32Array(6);typeof window<`u`&&(window.__THREE_MESH_BVH__?console.warn(`three-mesh-bvh: Multiple instances of three-mesh-bvh being imported.`):window.__THREE_MESH_BVH__=bd);var Cd=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Cu,...e},ed(this,e)}getRootRanges(){throw Error(`BVH: getRootRanges() not implemented`)}writePrimitiveBounds(){throw Error(`BVH: writePrimitiveBounds() not implemented`)}writePrimitiveRangeBounds(e,t,n,r){let i=1/0,a=1/0,o=1/0,s=-1/0,c=-1/0,l=-1/0;for(let n=e,r=e+t;n<r;n++){this.writePrimitiveBounds(n,Sd,0);let[e,t,r,u,d,f]=Sd;e<i&&(i=e),u>s&&(s=u),t<a&&(a=t),d>c&&(c=d),r<o&&(o=r),f>l&&(l=f)}return n[r+0]=i,n[r+1]=a,n[r+2]=o,n[r+3]=s,n[r+4]=c,n[r+5]=l,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let i=e,a=e+t;i<a;i++){this.writePrimitiveBounds(i,Sd,0);let[e,t,a,o,s,c]=Sd,l=(e+o)/2,u=(t+s)/2,d=(a+c)/2,f=(o-e)/2,p=(s-t)/2,m=(c-a)/2,h=(i-r)*6;n[h+0]=l,n[h+1]=f+(Math.abs(l)+f)*xu,n[h+2]=u,n[h+3]=p+(Math.abs(u)+p)*xu,n[h+4]=d,n[h+5]=m+(Math.abs(d)+m)*xu}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t){if(t.BYTES_PER_ELEMENT===2&&t.some(t=>t+e>=2**16)){let e=t.buffer.constructor;t=new Uint32Array(new e(4*t.length)),t.set(this._indirectBuffer),this._indirectBuffer=t}for(let n=0,r=t.length;n<r;n++)t[n]+=e}else{let t=this._roots;for(let n=0;n<t.length;n++){let r=t[n],i=new Uint32Array(r),a=new Uint16Array(r),o=r.byteLength/32;for(let t=0;t<o;t++){let n=8*t;Ou(2*n,a)&&(i[n+6]+=e)}}}}traverse(e,t=0){yd.setBVH(this,t),yd.traverse(e),yd.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n),a=new Float32Array(n),o=n.byteLength/32;for(let e=o-1;e>=0;e--){let t=e*8,n=t*2;if(Ou(n,i)){let e=ku(t,r),o=Au(n,i);this.writePrimitiveRangeBounds(e,o,Sd,0),a.set(Sd,t)}else{let e=ju(t),n=Mu(t,r);for(let r=0;r<3;r++){let i=a[e+r],o=a[e+r+3],s=a[n+r],c=a[n+r+3];a[t+r]=i<s?i:s,a[t+r+3]=o>c?o:c}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{wu(0,new Float32Array(t),xd),e.union(xd)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:i,scratchPrimitive:a,iterate:o}=e;if(r&&i){let e=r;r=(t,n,r,s,c)=>e(t,n,r,s,c)?!0:o(t,n,this,i,r,s,a)}else r||=i?(e,t,n,r)=>o(e,t,this,i,n,r,a):(e,t,n)=>n;let s=!1,c=0,l=this._roots;for(let e=0,i=l.length;e<i;e++){let i=l[e];if(s=sd(this,e,n,r,t,c),s)break;c+=i.byteLength/32}return s}bvhcast(e,t,n){let{intersectsRanges:r}=n;return _d(this,e,t,r)}};function wd(){return typeof SharedArrayBuffer<`u`}function Td(e){return e.index?e.index.count:e.attributes.position.count}function Ed(e){return Td(e)/3}function Dd(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function Od(e,t){if(!e.index){let n=e.attributes.position.count,r=Dd(n,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new P(r,1));for(let e=0;e<n;e++)r[e]=e}}function kd(e,t,n){let r=Td(e)/n,i=t||e.drawRange,a=i.start/n,o=(i.start+i.count)/n,s=Math.max(0,a),c=Math.min(r,o)-s;return{offset:Math.floor(s),count:Math.floor(c)}}function Ad(e,t){return e.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function jd(e,t,n){let r=kd(e,t,n),i=Ad(e,n);if(!i.length)return[r];let a=[],o=r.offset,s=r.offset+r.count,c=Td(e)/n,l=[];for(let e of i){let{offset:t,count:n}=e,r=t,i=t+(isFinite(n)?n:c-t);r<s&&i>o&&(l.push({pos:Math.max(o,r),isStart:!0}),l.push({pos:Math.min(s,i),isStart:!1}))}l.sort((e,t)=>e.pos===t.pos?e.type===`end`?-1:1:e.pos-t.pos);let u=0,d=null;for(let e of l){let t=e.pos;u!==0&&t!==d&&a.push({offset:d,count:t-d}),u+=e.isStart?1:-1,d=t}return a}function Md(e,t){let n=e[e.length-1],r=n.offset+n.count>2**16,i=e.reduce((e,t)=>e+t.count,0),a=r?4:2,o=t?new SharedArrayBuffer(i*a):new ArrayBuffer(i*a),s=r?new Uint32Array(o):new Uint16Array(o),c=0;for(let t=0;t<e.length;t++){let{offset:n,count:r}=e[t];for(let e=0;e<r;e++)s[c+e]=n+e;c+=r}return s}var Nd=class extends Cd{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(!e.isBufferGeometry)throw Error(`BVH: Only BufferGeometries are supported.`);if(e.index&&e.index.isInterleavedBufferAttribute)throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);if(t.useSharedArrayBuffer&&!wd())throw Error(`BVH: SharedArrayBuffer is not available.`);super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?e=>this._indirectBuffer[e]:e=>e,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Cu,...t},t[Su]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Md(jd(t,e.range,n),e.useSharedArrayBuffer);this._indirectBuffer=r}else Od(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new A))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:jd(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw Error(`BVH: raycastObject3D() not implemented`)}},Pd=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,a=e.length;i<a;i++){let a=e[i][t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=e.dot(a);n=o<n?o:n,r=o>r?o:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Pd.prototype.setFromBox=(function(){let e=new J;return function(t,n){let r=n.min,i=n.max,a=1/0,o=-1/0;for(let n=0;n<=1;n++)for(let s=0;s<=1;s++)for(let c=0;c<=1;c++){e.x=r.x*n+i.x*(1-n),e.y=r.y*s+i.y*(1-s),e.z=r.z*c+i.z*(1-c);let l=t.dot(e);a=Math.min(l,a),o=Math.max(l,o)}this.min=a,this.max=o}})();var Fd=(function(){let e=new J,t=new J,n=new J;return function(r,i,a){let o=r.start,s=e,c=i.start,l=t;n.subVectors(o,c),e.subVectors(r.end,r.start),t.subVectors(i.end,i.start);let u=n.dot(l),d=l.dot(s),f=l.dot(l),p=n.dot(s),m=s.dot(s)*f-d*d,h,g;h=m===0?0:(u*d-p*f)/m,g=(u+h*d)/f,a.x=h,a.y=g}})(),Id=(function(){let e=new W,t=new J,n=new J;return function(r,i,a,o){Fd(r,i,e);let s=e.x,c=e.y;if(s>=0&&s<=1&&c>=0&&c<=1)r.at(s,a),i.at(c,o);else if(s>=0&&s<=1)c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);else if(c>=0&&c<=1)s<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);else{let e;e=s<0?r.start:r.end;let l;l=c<0?i.start:i.end;let u=t,d=n;if(r.closestPointToPoint(l,!0,t),i.closestPointToPoint(e,!0,n),u.distanceToSquared(l)<=d.distanceToSquared(e)){a.copy(u),o.copy(l);return}a.copy(e),o.copy(d);return}}})(),Ld=(function(){let e=new J,t=new J,n=new S,r=new ke;return function(i,a){let{radius:o,center:s}=i,{a:c,b:l,c:u}=a;if(r.start=c,r.end=l,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o||(r.start=c,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o)||(r.start=l,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o))return!0;let d=a.getPlane(n);if(Math.abs(d.distanceToPoint(s))<=o){let e=d.projectPoint(s,t);if(a.containsPoint(e))return!0}return!1}})(),Rd=[`x`,`y`,`z`],zd=1e-15,Bd=zd*zd;function Vd(e){return Math.abs(e)<zd}var Hd=class extends Re{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new J),this.satBounds=[,,,,].fill().map(()=>new Pd),this.points=[this.a,this.b,this.c],this.plane=new S,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new ke,this.needsUpdate=!0}intersectsSphere(e){return Ld(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,a=this.satBounds,o=i[0],s=a[0];this.getNormal(o),s.setFromPoints(o,r);let c=i[1],l=a[1];c.subVectors(e,t),l.setFromPoints(c,r);let u=i[2],d=a[2];u.subVectors(t,n),d.setFromPoints(u,r);let f=i[3],p=a[3];f.subVectors(n,e),p.setFromPoints(f,r);let m=c.length(),h=u.length(),g=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<zd?h<zd||g<zd?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):h<zd?g<zd?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<zd&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Hd.prototype.closestPointToSegment=(function(){let e=new J,t=new J,n=new ke;return function(r,i=null,a=null){this.needsUpdate&&this.update();let{start:o,end:s}=r,c=this.points,l,u=1/0;if(this.plane.distanceToPoint(o)*this.plane.distanceToPoint(s)<0&&this.plane.intersectLine(r,e)!==null&&this.containsPoint(e))return i&&i.copy(e),a&&a.copy(e),0;for(let o=0;o<3;o++){let s=(o+1)%3;n.start.copy(c[o]),n.end.copy(c[s]),Id(n,r,e,t),l=e.distanceToSquared(t),l<u&&(u=l,i&&i.copy(e),a&&a.copy(t))}return this.closestPointToPoint(o,e),l=o.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(o)),this.closestPointToPoint(s,e),l=s.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(s)),Math.sqrt(u)}})(),Hd.prototype.intersectsTriangle=(function(){let e=new Hd,t=new Pd,n=new Pd,r=new J,i=new J,a=new J,o=new J,s=new ke,c=new ke,l=new J,u=new W,d=new W;function f(e,i,a,s){let c=r;!e.isDegenerateIntoPoint&&!e.isDegenerateIntoSegment?c.copy(e.plane.normal):c.copy(i.plane.normal);let l=e.satBounds,u=e.satAxes;for(let r=1;r<4;r++){let a=l[r],s=u[r];if(t.setFromPoints(s,i.points),a.isSeparated(t)||(o.copy(c).cross(s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}let d=i.satBounds,f=i.satAxes;for(let r=1;r<4;r++){let a=d[r],s=f[r];if(t.setFromPoints(s,e.points),a.isSeparated(t)||(o.crossVectors(c,s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}return a&&(s||console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`),a.start.set(0,0,0),a.end.set(0,0,0)),!0}function p(e,t,n,r,i,a,o,s,c,l,u){let d=o/(o-s);l.x=r+(i-r)*d,u.start.subVectors(t,e).multiplyScalar(d).add(e),d=o/(o-c),l.y=r+(a-r)*d,u.end.subVectors(n,e).multiplyScalar(d).add(e)}function m(e,t,n,r,i,a,o,s,c,l,u){if(i>0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else if(a>0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(s*c>0||o!=0)p(e.a,e.b,e.c,t,n,r,o,s,c,l,u);else if(s!=0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(c!=0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else return!0;return!1}function h(e,t,n,i){let a=t.degenerateSegment,o=e.plane.distanceToPoint(a.start),s=e.plane.distanceToPoint(a.end);return Vd(o)?Vd(s)?f(e,t,n,i):(n&&(n.start.copy(a.start),n.end.copy(a.start)),e.containsPoint(a.start)):Vd(s)?(n&&(n.start.copy(a.end),n.end.copy(a.end)),e.containsPoint(a.end)):e.plane.intersectLine(a,r)!=null&&(n&&(n.start.copy(r),n.end.copy(r)),e.containsPoint(r))}function g(e,t,n){let r=t.a;return Vd(e.plane.distanceToPoint(r))&&e.containsPoint(r)?(n&&(n.start.copy(r),n.end.copy(r)),!0):!1}function _(e,t,n){let i=e.degenerateSegment,a=t.a;return i.closestPointToPoint(a,!0,r),a.distanceToSquared(r)<Bd&&(n&&(n.start.copy(a),n.end.copy(a)),!0)}function v(e,t,n,o){if(e.isDegenerateIntoSegment){if(t.isDegenerateIntoSegment){let o=e.degenerateSegment,s=t.degenerateSegment,c=i,l=a;o.delta(c),s.delta(l);let u=r.subVectors(s.start,o.start),d=c.x*l.y-c.y*l.x;if(Vd(d))return!1;let f=(u.x*l.y-u.y*l.x)/d,p=-(c.x*u.y-c.y*u.x)/d;return f<0||f>1||p<0||p>1?!1:Vd(o.start.z+c.z*f-(s.start.z+l.z*p))?(n&&(n.start.copy(o.start).addScaledVector(c,f),n.end.copy(o.start).addScaledVector(c,f)),!0):!1}return t.isDegenerateIntoPoint?_(e,t,n):h(t,e,n,o)}if(e.isDegenerateIntoPoint)return t.isDegenerateIntoPoint?t.a.distanceToSquared(e.a)<Bd&&(n&&(n.start.copy(e.a),n.end.copy(e.a)),!0):t.isDegenerateIntoSegment?_(t,e,n):g(t,e,n);if(t.isDegenerateIntoPoint)return g(e,t,n);if(t.isDegenerateIntoSegment)return h(e,t,n,o)}return function(t,n=null,r=!1){this.needsUpdate&&this.update(),t.isExtendedTriangle?t.needsUpdate&&t.update():(e.copy(t),e.update(),t=e);let o=v(this,t,n,r);if(o!==void 0)return o;let p=this.plane,h=t.plane,g=h.distanceToPoint(this.a),_=h.distanceToPoint(this.b),y=h.distanceToPoint(this.c);Vd(g)&&(g=0),Vd(_)&&(_=0),Vd(y)&&(y=0);let b=g*_,x=g*y;if(b>0&&x>0)return!1;let S=p.distanceToPoint(t.a),C=p.distanceToPoint(t.b),w=p.distanceToPoint(t.c);Vd(S)&&(S=0),Vd(C)&&(C=0),Vd(w)&&(w=0);let T=S*C,E=S*w;if(T>0&&E>0)return!1;i.copy(p.normal),a.copy(h.normal);let D=i.cross(a),O=0,ee=Math.abs(D.x),k=Math.abs(D.y);k>ee&&(ee=k,O=1),Math.abs(D.z)>ee&&(O=2);let A=Rd[O],te=this.a[A],ne=this.b[A],re=this.c[A],j=t.a[A],M=t.b[A],N=t.c[A];if(m(this,te,ne,re,b,x,g,_,y,u,s)||m(t,j,M,N,T,E,S,C,w,d,c))return f(this,t,n,r);if(u.y<u.x){let e=u.y;u.y=u.x,u.x=e,l.copy(s.start),s.start.copy(s.end),s.end.copy(l)}if(d.y<d.x){let e=d.y;d.y=d.x,d.x=e,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(n&&(d.x>u.x?n.start.copy(c.start):n.start.copy(s.start),d.y<u.y?n.end.copy(c.end):n.end.copy(s.end)),!0)}})(),Hd.prototype.distanceToPoint=(function(){let e=new J;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),Hd.prototype.distanceToTriangle=(function(){let e=new J,t=new J,n=[`a`,`b`,`c`],r=new ke,i=new ke;return function(a,o=null,s=null){let c=o||s?r:null;if(this.intersectsTriangle(a,c,!0))return(o||s)&&(o&&c.getCenter(o),s&&c.getCenter(s)),0;let l=1/0;for(let t=0;t<3;t++){let r,i=n[t],c=a[i];this.closestPointToPoint(c,e),r=c.distanceToSquared(e),r<l&&(l=r,o&&o.copy(e),s&&s.copy(c));let u=this[i];a.closestPointToPoint(u,e),r=u.distanceToSquared(e),r<l&&(l=r,o&&o.copy(u),s&&s.copy(e))}for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];r.set(this[u],this[d]);for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];i.set(a[u],a[d]),Id(r,i,e,t);let f=e.distanceToSquared(t);f<l&&(l=f,o&&o.copy(e),s&&s.copy(t))}}return Math.sqrt(l)}})();var Ud=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new J,this.max=new J,this.matrix=new ie,this.invMatrix=new ie,this.points=Array(8).fill().map(()=>new J),this.satAxes=[,,,].fill().map(()=>new J),this.satBounds=[,,,].fill().map(()=>new Pd),this.alignedSatBounds=[,,,].fill().map(()=>new Pd),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Ud.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let i=0;i<=1;i++)for(let a=0;a<=1;a++)for(let o=0;o<=1;o++){let s=r[1*i|2*a|4*o];s.x=i?n.x:t.x,s.y=a?n.y:t.y,s.z=o?n.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,a=this.satAxes,o=r[0];for(let e=0;e<3;e++){let t=a[e],n=i[e],s=r[1<<e];t.subVectors(o,s),n.setFromPoints(t,r)}let s=this.alignedSatBounds;s[0].setFromPointsField(r,`x`),s[1].setFromPointsField(r,`y`),s[2].setFromPointsField(r,`z`),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})(),Ud.prototype.intersectsBox=(function(){let e=new Pd;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,i=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(e.min=n.x,e.max=r.x,o[0].isSeparated(e)||(e.min=n.y,e.max=r.y,o[1].isSeparated(e))||(e.min=n.z,e.max=r.z,o[2].isSeparated(e)))return!1;for(let n=0;n<3;n++){let r=a[n],o=i[n];if(e.setFromBox(r,t),o.isSeparated(e))return!1}return!0}})(),Ud.prototype.intersectsTriangle=(function(){let e=new Hd,t=[,,,],n=new Pd,r=new Pd,i=new J;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let o=this.satBounds,s=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let e=0;e<3;e++){let r=o[e],i=s[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}let c=a.satBounds,l=a.satAxes,u=this.points;for(let e=0;e<3;e++){let t=c[e],r=l[e];if(n.setFromPoints(r,u),t.isSeparated(n))return!1}for(let e=0;e<3;e++){let a=s[e];for(let e=0;e<4;e++){let o=l[e];if(i.crossVectors(a,o),n.setFromPoints(i,t),r.setFromPoints(i,u),n.isSeparated(r))return!1}}return!0}})(),Ud.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})(),Ud.prototype.distanceToPoint=(function(){let e=new J;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),Ud.prototype.distanceToBox=(function(){let e=[`x`,`y`,`z`],t=Array(12).fill().map(()=>new ke),n=Array(12).fill().map(()=>new ke),r=new J,i=new J;return function(a,o=0,s=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(s||c)&&(a.getCenter(i),this.closestPointToPoint(i,r),a.clampPoint(r,i),s&&s.copy(r),c&&c.copy(i)),0;let l=o*o,u=a.min,d=a.max,f=this.points,p=1/0;for(let e=0;e<8;e++){let t=f[e];i.copy(t).clamp(u,d);let n=t.distanceToSquared(i);if(n<p&&(p=n,s&&s.copy(t),c&&c.copy(i),n<l))return Math.sqrt(n)}let m=0;for(let r=0;r<3;r++)for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let o=(r+1)%3,s=(r+2)%3,c=i<<o|a<<s,l=1<<r|i<<o|a<<s,p=f[c],h=f[l];t[m].set(p,h);let g=e[r],_=e[o],v=e[s],y=n[m],b=y.start,x=y.end;b[g]=u[g],b[_]=i?u[_]:d[_],b[v]=a?u[v]:d[v],x[g]=d[g],x[_]=i?u[_]:d[_],x[v]=a?u[v]:d[v],m++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){i.x=e?d.x:u.x,i.y=t?d.y:u.y,i.z=n?d.z:u.z,this.closestPointToPoint(i,r);let a=i.distanceToSquared(r);if(a<p&&(p=a,s&&s.copy(r),c&&c.copy(i),a<l))return Math.sqrt(a)}for(let e=0;e<12;e++){let a=t[e];for(let e=0;e<12;e++){let t=n[e];Id(a,t,r,i);let o=r.distanceToSquared(i);if(o<p&&(p=o,s&&s.copy(r),c&&c.copy(i),o<l))return Math.sqrt(o)}}return Math.sqrt(p)}})();var Wd=new class extends td{constructor(){super(()=>new Hd)}},Gd=new J,Kd=new J;function qd(e,t,n={},r=0,i=1/0){let a=r*r,o=i*i,s=1/0,c=null;if(e.shapecast({boundsTraverseOrder:e=>(Gd.copy(t).clamp(e.min,e.max),Gd.distanceToSquared(t)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle:(e,n)=>{e.closestPointToPoint(t,Gd);let r=t.distanceToSquared(Gd);return r<s&&(Kd.copy(Gd),s=r,c=n),r<a}}),s===1/0)return null;let l=Math.sqrt(s);return n.point?n.point.copy(Kd):n.point=Kd.clone(),n.distance=l,n.faceIndex=c,n}var Jd=!0,Yd=new J,Xd=new J,Zd=new J,Qd=new W,$d=new W,ef=new W,tf=new J,nf=new J,rf=new J,af=new J;function of(e,t,n,r,i,a,o,s){let c;if(c=a===1?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,a!==2,i),c===null)return null;let l=e.origin.distanceTo(i);return l<o||l>s?null:{distance:l,point:i.clone()}}function sf(e,t,n,r,i,a,o,s,c,l,u){Yd.fromBufferAttribute(t,a),Xd.fromBufferAttribute(t,o),Zd.fromBufferAttribute(t,s);let d=of(e,Yd,Xd,Zd,af,c,l,u);if(d){if(r){Qd.fromBufferAttribute(r,a),$d.fromBufferAttribute(r,o),ef.fromBufferAttribute(r,s),d.uv=new W;let e=Re.getInterpolation(af,Yd,Xd,Zd,Qd,$d,ef,d.uv);Jd||(d.uv=e)}if(i){Qd.fromBufferAttribute(i,a),$d.fromBufferAttribute(i,o),ef.fromBufferAttribute(i,s),d.uv1=new W;let e=Re.getInterpolation(af,Yd,Xd,Zd,Qd,$d,ef,d.uv1);Jd||(d.uv1=e)}if(n){tf.fromBufferAttribute(n,a),nf.fromBufferAttribute(n,o),rf.fromBufferAttribute(n,s),d.normal=new J;let t=Re.getInterpolation(af,Yd,Xd,Zd,tf,nf,rf,d.normal);d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1),Jd||(d.normal=t)}let t={a,b:o,c:s,normal:new J,materialIndex:0};if(Re.getNormal(Yd,Xd,Zd,t.normal),d.face=t,d.faceIndex=a,Jd){let e=new J;Re.getBarycoord(af,Yd,Xd,Zd,e),d.barycoord=e}}return d}function cf(e){return e&&e.isMaterial?e.side:e}function lf(e,t,n,r,i,a,o){let s=r*3,c=s+0,l=s+1,u=s+2,{index:d,groups:f}=e;e.index&&(c=d.getX(c),l=d.getX(l),u=d.getX(u));let{position:p,normal:m,uv:h,uv1:g}=e.attributes;if(Array.isArray(t)){let e=r*3;for(let s=0,d=f.length;s<d;s++){let{start:d,count:_,materialIndex:v}=f[s];if(e>=d&&e<d+_){let e=cf(t[v]),s=sf(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=v,i)i.push(s);else return s}}}}else{let e=cf(t),s=sf(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=0,i)i.push(s);else return s}}return null}function uf(e,t,n,r){let i=e.a,a=e.b,o=e.c,s=t,c=t+1,l=t+2;n&&(s=n.getX(s),c=n.getX(c),l=n.getX(l)),i.x=r.getX(s),i.y=r.getY(s),i.z=r.getZ(s),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l)}function df(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,l=r+i;e<l;e++)lf(c,t,n,e,a,o,s)}function ff(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,c=r+i;e<c;e++){let r;r=lf(s,t,n,e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function pf(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let n=e,s=t+e;n<s;n++){let e;if(e=n,uf(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function mf(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(e,n,a=!1){let l=e*2;if(Ou(l,s)){let t=ku(e,o),n=Au(l,s),a=1/0,u=1/0,d=1/0,f=-1/0,p=-1/0,m=-1/0;for(let e=3*t,o=3*(t+n);e<o;e++){let t=r[e],n=i.getX(t),o=i.getY(t),s=i.getZ(t);n<a&&(a=n),n>f&&(f=n),o<u&&(u=o),o>p&&(p=o),s<d&&(d=s),s>m&&(m=s)}return c[e+0]!==a||c[e+1]!==u||c[e+2]!==d||c[e+3]!==f||c[e+4]!==p||c[e+5]!==m?(c[e+0]=a,c[e+1]=u,c[e+2]=d,c[e+3]=f,c[e+4]=p,c[e+5]=m,!0):!1}{let r=ju(e),i=Mu(e,o),s=a,l=!1,u=!1;if(t){if(!s){let e=r/8+n/32,a=i/8+n/32;l=t.has(e),u=t.has(a),s=!l&&!u}}else l=!0,u=!0;let f=s||l,p=s||u,m=!1;f&&(m=d(r,n,s));let h=!1;p&&(h=d(i,n,s));let g=m||h;if(g)for(let t=0;t<3;t++){let n=r+t,a=i+t,o=c[n],s=c[n+3],l=c[a],u=c[a+3];c[e+t]=o<l?o:l,c[e+t+3]=s>u?s:u}return g}}}function hf(e,t,n,r,i){let a,o,s,c,l,u,d=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,m=n.origin.x,h=n.origin.y,g=n.origin.z,_=t[e],v=t[e+3],y=t[e+1],b=t[e+3+1],x=t[e+2],S=t[e+3+2];return d>=0?(a=(_-m)*d,o=(v-m)*d):(a=(v-m)*d,o=(_-m)*d),f>=0?(s=(y-h)*f,c=(b-h)*f):(s=(b-h)*f,c=(y-h)*f),a>c||s>o||((s>a||isNaN(a))&&(a=s),(c<o||isNaN(o))&&(o=c),p>=0?(l=(x-g)*p,u=(S-g)*p):(l=(S-g)*p,u=(x-g)*p),a>u||l>o)?!1:((l>a||a!==a)&&(a=l),(u<o||o!==o)&&(o=u),a<=i&&o>=r)}function gf(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,u=r+i;e<u;e++)lf(c,t,n,l?l[e]:e,a,o,s)}function _f(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,d=r+i;e<d;e++){let r;r=lf(s,t,n,c?c[e]:e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function vf(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(e=n.resolveTriangleIndex(s),uf(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function yf(e,t,n,r,i,a,o){nd.setBuffer(e._roots[t]),hf(0,nd.float32Array,r,a,o)&&bf(0,e,n,r,i,a,o),nd.clearBuffer()}function bf(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=nd,u=e*2;if(Ou(u,c))df(t,n,r,ku(e,l),Au(u,c),i,a,o);else{let c=ju(e);hf(c,s,r,a,o)&&bf(c,t,n,r,i,a,o);let u=Mu(e,l);hf(u,s,r,a,o)&&bf(u,t,n,r,i,a,o)}}var xf=[`x`,`y`,`z`];function Sf(e,t,n,r,i,a){nd.setBuffer(e._roots[t]);let o=null;return hf(0,nd.float32Array,r,i,a)&&(o=Cf(0,e,n,r,i,a)),nd.clearBuffer(),o}function Cf(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=nd,l=e*2;if(Ou(l,s))return ff(t,n,r,ku(e,c),Au(l,s),i,a);{let s=Nu(e,c),l=xf[s],u=r.direction[l]>=0,d,f;u?(d=ju(e),f=Mu(e,c)):(d=Mu(e,c),f=ju(e));let p=hf(d,o,r,i,a)?Cf(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=hf(f,o,r,i,a)?Cf(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var wf=new A,Tf=new Hd,Ef=new Hd,Df=new ie,Of=new Ud,kf=new Ud;function Af(e,t,n,r){nd.setBuffer(e._roots[t]);let i=jf(0,e,n,r);return nd.clearBuffer(),i}function jf(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=nd,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),Of.set(n.boundingBox.min,n.boundingBox.max,r),i=Of),Ou(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=ku(e,s),m=Au(c,o);if(Df.copy(r).invert(),n.boundsTree)return wu(Pu(e),a,kf),kf.matrix.copy(Df),kf.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>kf.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let t=p*3,n=(m+p)*3;t<n;t+=3)if(uf(Ef,t,l,u),Ef.needsUpdate=!0,e.intersectsTriangle(Ef))return!0;return!1}});{let e=Ed(n);for(let t=p*3,n=(m+p)*3;t<n;t+=3){uf(Tf,t,l,u),Tf.a.applyMatrix4(Df),Tf.b.applyMatrix4(Df),Tf.c.applyMatrix4(Df),Tf.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(uf(Ef,t,d,f),Ef.needsUpdate=!0,Tf.intersectsTriangle(Ef))return!0}}}else{let o=ju(e),c=Mu(e,s);return wu(Pu(o),a,wf),!!(i.intersectsBox(wf)&&jf(o,t,n,r,i)||(wu(Pu(c),a,wf),i.intersectsBox(wf)&&jf(c,t,n,r,i)))}}var Mf=new ie,Nf=new Ud,Pf=new Ud,Ff=new J,If=new J,Lf=new J,Rf=new J;function zf(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Nf.set(t.boundingBox.min,t.boundingBox.max,n),Nf.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=Wd.getPrimitive(),p=Wd.getPrimitive(),m=Ff,h=If,g=null,_=null;i&&(g=Lf,_=Rf);let v=1/0,y=null,b=null;return Mf.copy(n).invert(),Pf.matrix.copy(Mf),e.shapecast({boundsTraverseOrder:e=>Nf.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(Pf.min.copy(e.min),Pf.max.copy(e.max),Pf.needsUpdate=!0),!0),intersectsRange:(e,r)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>Pf.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,i)=>{for(let o=t,s=t+i;o<s;o++){uf(p,3*o,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){uf(f,3*t,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=t,b=o),e<a)return!0}}}});{let i=Ed(t);for(let t=0,o=i;t<o;t++){uf(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=e,i=e+r;n<i;n++){uf(f,3*n,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=n,b=t),e<a)return!0}}}}}),Wd.releasePrimitive(f),Wd.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(Mf),h.applyMatrix4(Mf),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function Bf(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(n,a,l=!1){let u=n*2;if(Ou(u,s)){let t=ku(n,o),a=Au(u,s),l=1/0,d=1/0,f=1/0,p=-1/0,m=-1/0,h=-1/0;for(let n=t,o=t+a;n<o;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let n=t+e;n=r?r[n]:n;let a=i.getX(n),o=i.getY(n),s=i.getZ(n);a<l&&(l=a),a>p&&(p=a),o<d&&(d=o),o>m&&(m=o),s<f&&(f=s),s>h&&(h=s)}}return c[n+0]!==l||c[n+1]!==d||c[n+2]!==f||c[n+3]!==p||c[n+4]!==m||c[n+5]!==h?(c[n+0]=l,c[n+1]=d,c[n+2]=f,c[n+3]=p,c[n+4]=m,c[n+5]=h,!0):!1}{let e=ju(n),r=Mu(n,o),i=l,s=!1,u=!1;if(t){if(!i){let n=e/8+a/32,o=r/8+a/32;s=t.has(n),u=t.has(o),i=!s&&!u}}else s=!0,u=!0;let f=i||s,p=i||u,m=!1;f&&(m=d(e,a,i));let h=!1;p&&(h=d(r,a,i));let g=m||h;if(g)for(let t=0;t<3;t++){let i=e+t,a=r+t,o=c[i],s=c[i+3],l=c[a],u=c[a+3];c[n+t]=o<l?o:l,c[n+t+3]=s>u?s:u}return g}}}function Vf(e,t,n,r,i,a,o){nd.setBuffer(e._roots[t]),hf(0,nd.float32Array,r,a,o)&&Hf(0,e,n,r,i,a,o),nd.clearBuffer()}function Hf(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=nd,u=e*2;if(Ou(u,c))gf(t,n,r,ku(e,l),Au(u,c),i,a,o);else{let c=ju(e);hf(c,s,r,a,o)&&Hf(c,t,n,r,i,a,o);let u=Mu(e,l);hf(u,s,r,a,o)&&Hf(u,t,n,r,i,a,o)}}var Uf=[`x`,`y`,`z`];function Wf(e,t,n,r,i,a){nd.setBuffer(e._roots[t]);let o=null;return hf(0,nd.float32Array,r,i,a)&&(o=Gf(0,e,n,r,i,a)),nd.clearBuffer(),o}function Gf(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=nd,l=e*2;if(Ou(l,s))return _f(t,n,r,ku(e,c),Au(l,s),i,a);{let s=Nu(e,c),l=Uf[s],u=r.direction[l]>=0,d,f;u?(d=ju(e),f=Mu(e,c)):(d=Mu(e,c),f=ju(e));let p=hf(d,o,r,i,a)?Gf(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=hf(f,o,r,i,a)?Gf(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var Kf=new A,qf=new Hd,Jf=new Hd,Yf=new ie,Xf=new Ud,Zf=new Ud;function Qf(e,t,n,r){nd.setBuffer(e._roots[t]);let i=$f(0,e,n,r);return nd.clearBuffer(),i}function $f(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=nd,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),Xf.set(n.boundingBox.min,n.boundingBox.max,r),i=Xf),Ou(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=ku(e,s),m=Au(c,o);if(Yf.copy(r).invert(),n.boundsTree)return wu(Pu(e),a,Zf),Zf.matrix.copy(Yf),Zf.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>Zf.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let n=p,r=m+p;n<r;n++)if(uf(Jf,3*t.resolveTriangleIndex(n),l,u),Jf.needsUpdate=!0,e.intersectsTriangle(Jf))return!0;return!1}});{let e=Ed(n);for(let n=p,r=m+p;n<r;n++){uf(qf,3*t.resolveTriangleIndex(n),l,u),qf.a.applyMatrix4(Yf),qf.b.applyMatrix4(Yf),qf.c.applyMatrix4(Yf),qf.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(uf(Jf,t,d,f),Jf.needsUpdate=!0,qf.intersectsTriangle(Jf))return!0}}}else{let o=ju(e),c=Mu(e,s);return wu(Pu(o),a,Kf),!!(i.intersectsBox(Kf)&&$f(o,t,n,r,i)||(wu(Pu(c),a,Kf),i.intersectsBox(Kf)&&$f(c,t,n,r,i)))}}var ep=new ie,tp=new Ud,np=new Ud,rp=new J,ip=new J,ap=new J,op=new J;function sp(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),tp.set(t.boundingBox.min,t.boundingBox.max,n),tp.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=Wd.getPrimitive(),p=Wd.getPrimitive(),m=rp,h=ip,g=null,_=null;i&&(g=ap,_=op);let v=1/0,y=null,b=null;return ep.copy(n).invert(),np.matrix.copy(ep),e.shapecast({boundsTraverseOrder:e=>tp.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(np.min.copy(e.min),np.max.copy(e.max),np.needsUpdate=!0),!0),intersectsRange:(r,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>np.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,o)=>{for(let x=t,S=t+o;x<S;x++){let t=s.resolveTriangleIndex(x);uf(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=r,n=r+i;t<n;t++){let n=e.resolveTriangleIndex(t);uf(f,3*n,l,c),f.needsUpdate=!0;let r=f.distanceToTriangle(p,m,g);if(r<v&&(h.copy(m),_&&_.copy(g),v=r,y=t,b=x),r<a)return!0}}}})}{let o=Ed(t);for(let t=0,s=o;t<s;t++){uf(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=r,o=r+i;n<o;n++){let r=e.resolveTriangleIndex(n);uf(f,3*r,l,c),f.needsUpdate=!0;let i=f.distanceToTriangle(p,m,g);if(i<v&&(h.copy(m),_&&_.copy(g),v=i,y=n,b=t),i<a)return!0}}}}}),Wd.releasePrimitive(f),Wd.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(ep),h.applyMatrix4(ep),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function cp(e,t,n){return e===null?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e)}var lp=new Ud,up=new Ze,dp=new J,fp=new ie,pp=new J,mp=[`getX`,`getY`,`getZ`],hp=class e extends Nd{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(e=>e.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=i?i.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=i),o}static deserialize(t,n,r={}){r={setIndex:!0,indirect:!!t.indirectBuffer,...r};let{index:i,roots:a,indirectBuffer:o}=t;t.version||(console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`),c(a));let s=new e(n,{...r,[Su]:!0});if(s._roots=a,s._indirectBuffer=o||null,r.setIndex){let e=n.getIndex();if(e===null){let e=new P(t.index,1,!1);n.setIndex(e)}else e.array!==i&&(e.array.set(i),e.needsUpdate=!0)}return s;function c(e){for(let t=0;t<e.length;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n);for(let e=0,t=n.byteLength/32;e<t;e++){let t=8*e;Ou(2*t,i)||(r[t+6]=r[t+6]/8-e)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=(i?i[e]:e)*3,c=s+0,l=s+1,u=s+2;o&&(c=o[c],l=o[l],u=o[u]);for(let e=0;e<3;e++){let r=a[mp[e]](c),i=a[mp[e]](l),o=a[mp[e]](u),s=r;i<s&&(s=i),o<s&&(s=o);let d=r;i>d&&(d=i),o>d&&(d=o),t[n+e]=s,t[n+e+3]=d}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw Error(`MeshBVH: compute triangle bounds range is invalid.`);let c=a.array,l=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let d=[`getX`,`getY`,`getZ`],f=n.offset;for(let r=e,p=e+t;r<p;r++){let e=(i?i[r]:r)*3,t=(r-f)*6,p=e+0,m=e+1,h=e+2;o&&(p=o[p],m=o[m],h=o[h]),s||(p=p*u+l,m=m*u+l,h=h*u+l);for(let e=0;e<3;e++){let r,i,o;s?(r=a[d[e]](p),i=a[d[e]](m),o=a[d[e]](h)):(r=c[p+e],i=c[m+e],o=c[h+e]);let l=r;i<l&&(l=i),o<l&&(l=o);let u=r;i>u&&(u=i),o>u&&(u=o);let f=(u-l)/2,g=e*2;n[t+g+0]=l+f,n[t+g+1]=f+(Math.abs(l)+f)*xu}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;fp.copy(e.matrixWorld).invert(),up.copy(t.ray).applyMatrix4(fp),pp.setFromMatrixScale(e.matrixWorld),dp.copy(up.direction).multiply(pp);let i=dp.length(),a=t.near/i,o=t.far/i;if(t.firstHitOnly===!0){let i=this.raycastFirst(up,r,a,o);i=cp(i,e,t),i&&n.push(i)}else{let i=this.raycast(up,r,a,o);for(let r=0,a=i.length;r<a;r++){let a=cp(i[r],e,t);a&&n.push(a)}}return n}refit(e=null){return(this.indirect?Bf:mf)(this,e)}raycast(e,t=0,n=0,r=1/0){let i=this._roots,a=[],o=this.indirect?Vf:yf;for(let s=0,c=i.length;s<c;s++)o(this,s,t,e,a,n,r);return a}raycastFirst(e,t=0,n=0,r=1/0){let i=this._roots,a=null,o=this.indirect?Wf:Sf;for(let s=0,c=i.length;s<c;s++){let i=o(this,s,t,e,n,r);i!=null&&(a==null||i.distance<a.distance)&&(a=i)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,i=this.indirect?Qf:Af;for(let a=0,o=r.length;a<o&&(n=i(this,a,e,t),!n);a++);return n}shapecast(e){let t=Wd.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?vf:pf});return Wd.releasePrimitive(t),n}bvhcast(t,n,r){let{intersectsRanges:i,intersectsTriangles:a}=r,o=Wd.getPrimitive(),s=this.geometry.index,c=this.geometry.attributes.position,l=Wd.getPrimitive(),u=t.geometry.index,d=t.geometry.attributes.position;if(a){if(!(t instanceof e))throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);let r=(e,r,i,f,p,m,h,g)=>{for(let _=i,v=i+f;_<v;_++){let i=t.resolveTriangleIndex(_);uf(l,i*3,u,d),l.a.applyMatrix4(n),l.b.applyMatrix4(n),l.c.applyMatrix4(n),l.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){let e=this.resolveTriangleIndex(t);if(uf(o,e*3,s,c),o.needsUpdate=!0,a(o,l,e,i,p,m,h,g))return!0}}return!1};if(i){let e=i;i=function(t,n,i,a,o,s,c,l){return e(t,n,i,a,o,s,c,l)?!0:r(t,n,i,a,o,s,c,l)}}else i=r}return super.bvhcast(t,n,{intersectsRanges:i})}intersectsBox(e,t){return lp.set(e.min,e.max,t),lp.needsUpdate=!0,this.shapecast({intersectsBounds:e=>lp.intersectsBox(e),intersectsTriangle:e=>lp.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,a=1/0){return(this.indirect?sp:zf)(this,e,t,n,r,i,a)}closestPointToPoint(e,t={},n=0,r=1/0){return qd(this,e,t,n,r)}},gp={Mesh:K.prototype.raycast,Line:Ue.prototype.raycast,LineSegments:It.prototype.raycast,LineLoop:Dt.prototype.raycast,Points:z.prototype.raycast,BatchedMesh:Xe.prototype.raycast},_p=new K,vp=[];function yp(e,t){if(this.isBatchedMesh)bp.call(this,e,t);else{let{geometry:n}=this;if(n.boundsTree)n.boundsTree.raycastObject3D(this,e,t);else{let n;if(this instanceof K)n=gp.Mesh;else if(this instanceof It)n=gp.LineSegments;else if(this instanceof Dt)n=gp.LineLoop;else if(this instanceof Ue)n=gp.Line;else if(this instanceof z)n=gp.Points;else throw Error(`BVH: Fallback raycast function not found.`);n.call(this,e,t)}}}function bp(e,t){if(this.boundsTrees){let n=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,a=this.matrixWorld;_p.material=this.material,_p.geometry=this.geometry;let o=_p.geometry.boundsTree,s=_p.geometry.drawRange;_p.geometry.boundingSphere===null&&(_p.geometry.boundingSphere=new we);for(let o=0,s=r.length;o<s;o++){if(!this.getVisibleAt(o))continue;let s=r[o].geometryIndex;if(_p.geometry.boundsTree=n[s],this.getMatrixAt(o,_p.matrixWorld).premultiply(a),!_p.geometry.boundsTree){this.getBoundingBoxAt(s,_p.geometry.boundingBox),this.getBoundingSphereAt(s,_p.geometry.boundingSphere);let e=i[s];_p.geometry.setDrawRange(e.start,e.count)}_p.raycast(e,vp);for(let e=0,n=vp.length;e<n;e++){let n=vp[e];n.object=this,n.batchId=o,t.push(n)}vp.length=0}_p.geometry.boundsTree=o,_p.geometry.drawRange=s,_p.material=null,_p.geometry=null}else gp.BatchedMesh.call(this,e,t)}function xp(e,t){if(!t)return e;if(e.isInstancedMesh)throw TypeError(`Static geometry BVH installation does not replace InstancedMesh raycasting`);let n=e.geometry;return n.boundsTree=hp.deserialize(t,n,{setIndex:!1}),e.raycast=yp,n.addEventListener(`dispose`,function e(){this.boundsTree=null,this.removeEventListener(`dispose`,e)}),e}function Sp(e){return e?[...new Set([...e.roots,e.index?.buffer,e.indirectBuffer?.buffer].filter(Boolean))]:[]}var Cp=new re(1,1,1),wp=(e,t,n)=>new J(e,t,n);function Tp(e,t,n,r=0,i=0,a=0){let o=new K(t,typeof n==`string`?Wt[n]:n);return o.position.set(r,i,a),o.castShadow=!0,o.receiveShadow=!0,e.add(o),o}function Ep(e,t,n,r,i,a,o,s,c=0){let l=Tp(e,Cp,s,t,n,r);return l.scale.set(i,a,o),l.rotation.y=c,l}function Dp(e,t,n,r,i,a,o,s,c=8){return Tp(e,new _(i,a,o,c),s,t,n,r)}function Op(e,t,n,r,i,a,o,s,c=0){let l=Tp(e,new wt(1,c),s,t,n,r);return l.scale.set(i,a,o),l}function kp(e,t,n,r,i,a=r){let o=t.clone().add(n).multiplyScalar(.5),s=Ep(e,o.x,o.y,o.z,r,t.distanceTo(n),a,i);return s.quaternion.setFromUnitVectors(wp(0,1,0),n.clone().sub(t).normalize()),s}function Ap(e,t=0,n=0,r=0,i=0){let a=new yt;return a.position.set(t,n,r),a.rotation.y=i,e.add(a),a}function jp(e){e.updateMatrixWorld(!0);let t=e.matrixWorld.clone().invert(),n=new Map,r=new Set;e.traverse(e=>{if(!e.isMesh)return;let i=e.material;e.geometry!==Cp&&r.add(e.geometry),n.has(i)||n.set(i,[]);let a=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();if(a.deleteAttribute(`uv`),a.deleteAttribute(`tangent`),!i.vertexColors)a.deleteAttribute(`color`);else if(!a.attributes.color){let e=new Float32Array(a.attributes.position.count*3);e.fill(1),a.setAttribute(`color`,new P(e,3))}a.applyMatrix4(t.clone().multiply(e.matrixWorld)),n.get(i).push(a)}),e.clear();for(let[t,r]of n)Tp(e,$a(r,!1),t),r.forEach(e=>e.dispose());return r.forEach(e=>e.dispose()),e}var Mp=Object.freeze({house:{width:2.2,depth:2.2,height:2.4},station:{width:6.4,depth:2.4,height:2.4},tree:{radius:.85,height:2.8},landmark:{radius:2,height:4.5},apartment:{radius:2.05,height:5},civic:{radius:2.8,height:5},plaza:{radius:2.6,height:.9},tower:{radius:2.1,height:8},farmPatch:{width:3,depth:4,height:1.6},cactus:{radius:.7,height:2.4},sheep:{width:.46,depth:.72,height:.53},person:{radius:.17,height:.75},trainCar:{width:1.12,depth:2.4,height:1.6}});function Np(e,t,{x:n=0,y:r=0,z:i=0,rotation:a=0,scale:o=1}={}){let s=Ap(e,n,r,i,a);return s.name=t,s.scale.setScalar(o),s.userData.footprint={...Mp[t]},s.userData.rigidSurfaceAsset=!0,s}function Pp(e,{color:t=`red`,cab:n=!1,palette:r}={}){let i=Np(e,`trainCar`),a=r?.body??t,o=r?.roof??`roofBlue`,s=r?.trim??`trim`;Ep(i,0,.34,0,.91,.19,2.1,`metal`),Ep(i,0,.88,0,1.02,.94,2.12,a),Ep(i,0,1.26,0,1.035,.1,2.14,s),Ep(i,0,1.39,-.015,1.1,.19,2.19,o),Ep(i,0,.65,0,1.035,.065,2.14,r?.accent??`gold`);for(let e of[-1,1]){for(let t of[-.54,.49])Ep(i,e*.519,1.075,t,.028,.39,.69,`window`);for(let t of[-.67,.67])Dp(i,e*.48,.22,t,.22,.22,.14,`metal`,8).rotation.z=Math.PI/2}for(let e of[-1.07,1.07])Ep(i,0,1.075,e,.66,.37,.025,`window`),Ep(i,0,.33,e*1.06,.18,.12,.12,`metal`);if(n){Ep(i,0,.77,1.085,.86,.25,.12,a);for(let e of[-.31,.31])Ep(i,e,.79,1.151,.14,.13,.03,`lamp`);Ep(i,0,1.515,-.35,.48,.06,.45,r?.body??t)}return i}new ie,new J;var Fp=new j({name:`ocean-vertex`,color:16777215,vertexColors:!0,roughness:.52,metalness:0,flatShading:!1});Fp.userData.sceneStyle=`water`;var Ip=new j({name:`coastal-surf`,color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1});Ip.userData.sceneStyle=`surf`;var Lp=new J;function Rp(e,t,n){let r=Qc(t,n);return G(e)&&(Ot(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,Lp).normalize(),r.tangent={x:Lp.x,y:Lp.y,z:Lp.z}),r}var zp=(e,t)=>Math.hypot(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x),Bp=2.64,Vp=1.2,Hp=.14,Up=1.35,Wp=2.4,Gp=.05;function Kp(e,t){let n=new Map(e.zones);for(let[e,r]of t.zones){let t=n.get(e);n.set(e,t?{min:Math.min(t.min,r.min),max:Math.max(t.max,r.max)}:{...r})}return{id:e.id,junctionIds:[...e.junctionIds,...t.junctionIds],zones:n,owner:null}}function qp(e,t){let n=new Map;for(let r of e.lines){let i=t.get(r.id);if(i)for(let[t,a,o]of[[r.from,0,1],[r.to,r.length,-1]]){if(t===void 0)continue;let s=Rp(e,r,a),c={lineId:r.id,distance:a,sign:o,train:i,x:s.tangent.x*o,y:s.tangent.y*o,z:s.tangent.z*o,closest:o===1?i.start:r.length-i.end};n.has(t)||n.set(t,[]),n.get(t).push(c)}}let r=[];for(let[e,t]of n)for(let n=0;n<t.length;n++)for(let i=n+1;i<t.length;i++){let a=t[n],o=t[i];if(a.x*o.x+a.y*o.y+a.z*o.z<=0)continue;let s=zp(a,o),c=Up/Math.max(s,.01);a.closest-a.train.halfLength-Hp>=c||o.closest-o.train.halfLength-Hp>=c||r.push({id:`approach-${e}-${n}-${i}`,lines:[{lineId:a.lineId,distance:a.distance},{lineId:o.lineId,distance:o.distance}]})}return r}function Jp(e,t){let n=new Map(e.lines.map(e=>[e.id,e])),r=new Map(t.map(e=>[e.lineId,e])),i=[...e.junctions||[],...qp(e,r)].map(t=>{let i=Up;for(let r=0;r<t.lines.length;r++){let a=t.lines[r],o=n.get(a.lineId);if(!o)continue;let s=Rp(e,o,a.distance).tangent;for(let a of t.lines.slice(r+1)){let t=n.get(a.lineId);if(!t)continue;let r=Rp(e,t,a.distance).tangent,o=zp(s,r);i=Math.max(i,Up/Math.max(o,.01))}}return{id:t.id,junctionIds:[t.id],owner:null,zones:new Map(t.lines.filter(e=>r.has(e.lineId)).map(e=>[e.lineId,{min:e.distance-i,max:e.distance+i}]))}}).filter(e=>e.zones.size>1),a=!0;for(;a;){a=!1;outer:for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)for(let[n,o]of i[e].zones){let s=i[t].zones.get(n);if(s&&!(Math.max(s.min-o.max,o.min-s.max,0)>r.get(n).halfLength*2+Hp*3)){i[e]=Kp(i[e],i[t]),i.splice(t,1),a=!0;break outer}}}return i}function Yp(e,t,n=e.distance){return n+e.halfLength+Hp>=t.min&&n-e.halfLength-Hp<=t.max}function Xp(e){let t=e.lines.filter(e=>e.length>12).map((e,t)=>{let n=e.length<23?2:3,r=Bp*(n-1)/2+3.25,i=Math.max(r,e.stops?.[0]?.distance??r),a=Math.min(e.length-r,e.stops?.[1]?.distance??e.length-r);return{id:`train-${e.id}`,lineId:e.id,count:n,spacing:Bp,halfLength:Bp*(n-1)/2+Vp,start:i,end:a,distance:i,direction:1,speed:2.6+t%3*.16,dwell:t*.45,active:!1,waiting:!1}}).filter(e=>e.end>e.start),n=t.length,r=e.traffic?.trainCount;if(r!==void 0){if(!Number.isInteger(r)||r<0||r>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);t.length=Math.min(t.length,r)}let i=Jp(e,t),a=new Map(t.map(e=>[e.id,e])),o=new Map(t.map(e=>[e.lineId,i.filter(t=>t.zones.has(e.lineId)).sort((t,n)=>t.zones.get(e.lineId).min-n.zones.get(e.lineId).min)]));function s(e){let t=o.get(e.lineId);for(let n of t)if(Yp(e,n.zones.get(e.lineId))&&n.owner&&n.owner!==e.id)return e.waiting=!0,!1;for(let n of t)Yp(e,n.zones.get(e.lineId))&&(n.owner=e.id);return e.active=!0,e.waiting=!1,!0}t.forEach(s);function c(e){for(let e of i){if(!e.owner)continue;let t=a.get(e.owner);Yp(t,e.zones.get(t.lineId))||(e.owner=null)}for(let n of t){if(!n.active&&!s(n))continue;n.waiting=!1;let t=Math.max(0,e-n.dwell);if(n.dwell=Math.max(0,n.dwell-e),!t)continue;let r=n.direction,i=r>0?Math.min(n.end,n.distance+t*n.speed):Math.max(n.start,n.distance-t*n.speed),a=o.get(n.lineId),c=r>0?0:a.length-1;for(let e=c;e>=0&&e<a.length;e+=r){let t=a[e],o=t.zones.get(n.lineId);if(Math.max(n.distance,i)+n.halfLength+Hp<o.min||Math.min(n.distance,i)-n.halfLength-Hp>o.max)continue;if(!t.owner||t.owner===n.id){t.owner=n.id;continue}let s=r>0?o.min-n.halfLength-Hp:o.max+n.halfLength+Hp;i=r>0?Math.max(n.distance,Math.min(i,s)):Math.min(n.distance,Math.max(i,s)),n.waiting=!0;break}n.distance=i;let l=r>0?n.end:n.start;Math.abs(n.distance-l)<1e-8&&(n.distance=l,n.direction=-r,n.dwell=Wp,n.waiting=!1)}}return{trains:t,capacity:n,get reservations(){return i.map(e=>({id:e.id,junctionIds:[...e.junctionIds],trainId:e.owner}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(e===0)return;let t=Math.ceil(e/Gp);for(let n=0;n<t;n++)c(e/t)}}}var Zp=2.64,Qp=3.84,$p=1.2,em=.56,tm=.05,nm=(e,t)=>(e%t+t)%t,rm=(e,t)=>`${e}:${t}`;function im(e,t,n,r){let i=e.trainOwners?.[t]??r?.ownerId??e.cities.find(e=>e.id===n)?.ownerId??e.players?.[0]?.id??null;if(i!==null&&e.players&&!e.players.some(e=>e.id===i))throw TypeError(`Invalid world: train ${t} references an unknown player`);return i}var am=()=>({x:0,y:0,z:0,distance:0,tangent:{x:0,y:0,z:1},angle:0,heading:0,curvature:0,lineId:null});function om(e,t,n){if(e.alignment)return fs(e.alignment,t,n);let r=Math.max(0,Math.min(e.length,t)),i=e.points,a=e.distances,o=0,s=i.length-1;for(;o+1<s;){let e=o+s>>1;a[e]<=r?o=e:s=e}let c=i[o],l=i[s],u=a[s]-a[o],d=u>1e-9?(r-a[o])/u:0,f=l.x-c.x,p=l.y-c.y,m=l.z-c.z,h=Math.hypot(f,p,m)||1;return n.x=c.x+f*d,n.y=c.y+p*d,n.z=c.z+m*d,n.distance=r,n.tangent.x=f/h,n.tangent.y=p/h,n.tangent.z=m/h,n.curvature=void 0,n.heading=Math.atan2(m,f),n.angle=Math.atan2(f,m),n}function sm(e,t,n=am()){n.tangent??={x:0,y:0,z:0};let r=e.closed?nm(t,e.length):Math.max(0,Math.min(e.length,t)),i=e.segments,a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;r>=i[e].start+i[e].length-1e-9?a=e+1:o=e}let s=i[a],c=Math.max(0,Math.min(s.length,r-s.start));if(om(s.line,vc(s.metric,s.direction>0?c:s.length-c),n),n.distance=r,n.tangent.x*=s.direction,n.tangent.y*=s.direction,n.tangent.z*=s.direction,n.heading=Math.atan2(n.tangent.z,n.tangent.x),n.angle=Math.atan2(n.tangent.x,n.tangent.z),Number.isFinite(n.curvature)&&(n.curvature*=s.direction),n.lineId=s.lineId,e.surfaceWorld){let t=n.physical??={};ue(e.surfaceWorld,n.x,n.y,n.z,cm),Ot(e.surfaceWorld,n.x,n.y,n.z,n.tangent.x,0,n.tangent.z,lm).normalize(),je(e.surfaceWorld,n.x,n.z,um),dm.crossVectors(um,lm).normalize(),t.x=cm.x,t.y=cm.y,t.z=cm.z,t.tx=lm.x,t.ty=lm.y,t.tz=lm.z,t.rx=dm.x,t.ry=dm.y,t.rz=dm.z}return n}var cm=new J,lm=new J,um=new J,dm=new J;function fm(e,t,n=!0,r){let i=0,a=e.map(e=>{let t=r?mc(r,e.line):null,n={line:e.line,lineId:e.line.id,direction:e.direction,metric:t,start:i,length:t?.length??e.line.length};return i+=n.length,n});return{id:`circuit-${t+1}`,segments:a,length:i,closed:n,...G(r)?{surfaceWorld:{surface:r.surface}}:{}}}function pm(e){let t=new Map(e.lines.map(e=>[e.id,e]));if(e.traffic?.circuits){if(!Array.isArray(e.traffic.circuits))throw TypeError(`Traffic circuits must be an array`);let n=new Set;return e.traffic.circuits.map((r,i)=>{if(!Array.isArray(r.segments)||r.segments.length<2)throw TypeError(`A traffic circuit needs at least two segments`);let a=r.segments.map(e=>{let n=t.get(e.lineId),r=e.direction??1;if(!n||r!==1&&r!==-1)throw TypeError(`Traffic circuit references an invalid line or direction`);return{line:n,direction:r}}),o=fm(a,i,!0,e);if(o.id=String(r.id??o.id),n.has(o.id))throw TypeError(`Traffic circuit IDs must be unique`);n.add(o.id);for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=Qc(t.line,t.direction>0?t.line.length:0),i=Qc(n.line,n.direction>0?0:n.line.length),o=(r.tangent.x*i.tangent.x+r.tangent.z*i.tangent.z)*t.direction*n.direction;if(Math.hypot(r.x-i.x,r.z-i.z)>1e-4||o<.9999)throw TypeError(`Traffic circuit segments must meet with continuous tangents`)}return o})}let n=new Map(e.lines.map(e=>{let t=0;for(let n=1;n<e.points.length;n++){let r=e.points[n-1],i=e.points[n];t+=r.x*i.z-i.x*r.z}return[e.id,t]})),r=new Map(e.lines.flatMap(e=>[1,-1].map(t=>[rm(e.id,t),{line:e,direction:t,key:rm(e.id,t),next:[]}])));for(let t of e.transitions??[]){let e=r.get(rm(t.fromLineId,t.fromEnd===`end`?1:-1)),n=r.get(rm(t.toLineId,t.toEnd===`start`?1:-1));if(!e||!n||e.line===n.line)continue;let i=Qc(e.line,e.direction>0?e.line.length:0),a=Qc(n.line,n.direction>0?0:n.line.length),o=(i.tangent.x*a.tangent.x+i.tangent.z*a.tangent.z)*e.direction*n.direction;Math.hypot(i.x-a.x,i.z-a.z)>1e-4||o<.9999||e.next.push(n)}let i=[],a=new Set(t.keys());for(;a.size;){let e=a.values().next().value,t=new Set([e]),n=[e];for(a.delete(e);n.length;){let e=n.shift();for(let i of[1,-1])for(let o of r.get(rm(e,i)).next)t.has(o.line.id)||(t.add(o.line.id),a.delete(o.line.id),n.push(o.line.id))}i.push(t)}let o=[];for(let t of i){let i=null,a=-1/0,s=0,c=[...r.values()].filter(e=>t.has(e.line.id)),l=new Map([...t].map((e,t)=>[e,t]));for(let t of c){let r=(c,u,d)=>{if(!(++s>3e4))for(let s of c.next)if(s.key===t.key&&u.length>=2){let t=new Set,r=0,s=0;for(let e of u)t.add(e.line.from),t.add(e.line.to),r+=n.get(e.line.id)*e.direction,s+=e.line.length;let c=t.size*1e7+Math.abs(r)*100+s,l=c>a?fm(u,o.length,!0,e):null;c>a&&(i=l,a=c)}else!d.has(s.line.id)&&l.get(s.line.id)>=l.get(t.line.id)&&(d.add(s.line.id),u.push(s),r(s,u,d),u.pop(),d.delete(s.line.id))};r(t,[t],new Set([t.line.id]))}i&&o.push(i)}return o}function mm(e){let t=[],n=new Map,r=new Map,i=2.8;for(let r of e){let e=Math.ceil(r.length/1.2),i=[],a=am();for(let n=0;n<e;n++){let o=n/e*r.length;sm(r,o,a);let s=a.physical??a,c={index:t.length,path:r,distance:o,x:s.x,y:a.physical?s.y:0,z:s.z,spacing:r.length/e};t.push(c),i.push(c)}n.set(r.id,i)}let a=new Int32Array(t.length);for(let e=0;e<a.length;e++)a[e]=e;let o=new Uint8Array(t.length),s=e=>{for(;a[e]!==e;)a[e]=a[a[e]],e=a[e];return e},c=(e,t)=>{a[s(e)]=s(t),o[e]=1,o[t]=1};for(let e of t){let t=Math.floor(e.x/i),n=Math.floor(e.y/i),a=Math.floor(e.z/i),o=!!e.path.surfaceWorld;for(let s=-1;s<=1;s++)for(let l=o?-1:0;l<=+!!o;l++)for(let o=-1;o<=1;o++){let u=r.get(`${t+s},${n+l},${a+o}`);if(u)for(let t of u){let n=Math.abs(e.distance-t.distance);e.path===t.path&&Math.min(n,e.path.length-n)<11.68||(e.x-t.x)**2+(e.y-t.y)**2+(e.z-t.z)**2<i*i&&c(e.index,t.index)}}let s=`${t},${n},${a}`;r.has(s)||r.set(s,[]),r.get(s).push(e)}for(let e of n.values()){let t=null,n=null;for(let r of e)o[r.index]&&(n&&r.distance-n.distance<10.68&&c(n.index,r.index),t??=r,n=r);t&&n&&nm(t.distance-n.distance,t.path.length)<10.68&&c(n.index,t.index)}let l=new Map;for(let e of t)if(o[e.index]){let t=s(e.index);l.has(t)||l.set(t,new Map);let n=l.get(t);n.has(e.path.id)||n.set(e.path.id,[]),n.get(e.path.id).push(e)}return[...l.values()].map((e,t)=>{let n=[];for(let[t,r]of e)for(let e of r){let r=n.at(-1),i=Math.max(0,e.distance-e.spacing),a=Math.min(e.path.length,e.distance+e.spacing);r?.pathId===t&&i<=r.end+1e-6?r.end=a:n.push({pathId:t,start:i,end:a})}return{id:`network-block-${t+1}`,owner:null,zones:n,queryStamp:0,waiters:new Set}})}function hm(e,t,n=e.distance){for(let r of t.zones)if(r.pathId===e.path.id)for(let t=-1;t<=1;t++){let i=n+t*e.path.length;if(i+e.halfLength+.2>=r.start&&i-e.halfLength-.2<=r.end)return!0}return!1}function gm(e,t){t.x=e.x,t.y=e.y,t.z=e.z,t.distance=e.distance,t.tangent.x=e.tangent.x,t.tangent.y=e.tangent.y,t.tangent.z=e.tangent.z,t.angle=e.angle,t.heading=e.heading,t.curvature=e.curvature,t.lineId=e.lineId,e.physical&&Object.assign(t.physical??={},e.physical)}function _m(e,t){let n=0,r=new Map((t.players??[]).map((e,t)=>[e.id,t]));for(let t of e)t.poseOffset=n,n+=t.count,t.pose=am(),t.carPoses=Array.from({length:t.count},am),t._nextCarPoses=Array.from({length:t.count},am),t._cachedDistance=NaN,t._ownerIndex=r.get(t.ownerId)??0;return new Float32Array(n*6)}function vm(e,t,n){for(let r=0;r<e.count;r++)sm(e.path,t+(r-(e.count-1)/2)*e.spacing,n[r])}function ym(e,t){for(let n=0;n<e.count;n++){let r=e.carPoses[n],i=(e.poseOffset+n)*6;t[i]=r.x,t[i+1]=r.y,t[i+2]=r.z,t[i+3]=r.angle,t[i+4]=+!!e.active,t[i+5]=e._ownerIndex}}function bm(e,t){vm(e,e.distance,e.carPoses),sm(e.path,e.distance,e.pose),e._cachedDistance=e.distance,ym(e,t)}function xm(e,t,n,r,i,a){let o=e.tangent,s=t.tangent,c=$p*(Math.abs(n*o.x+r*o.z)+Math.abs(n*s.x+r*s.z))+em*(Math.abs(-n*o.z+r*o.x)+Math.abs(-n*s.z+r*s.x))+.06;return Math.abs(i*n+a*r)>=c}function Sm(e,t){if(e.physical&&t.physical){let n=e.physical,r=t.physical,i=r.x-n.x,a=r.y-n.y,o=r.z-n.z;if(i*i+a*a+o*o>2.7*2.7)return!1;let s=(e,t,s)=>Math.abs(i*e+a*t+o*s)>=$p*(Math.abs(e*n.tx+t*n.ty+s*n.tz)+Math.abs(e*r.tx+t*r.ty+s*r.tz))+em*(Math.abs(e*n.rx+t*n.ry+s*n.rz)+Math.abs(e*r.rx+t*r.ry+s*r.rz))+.06;return!s(n.tx,n.ty,n.tz)&&!s(n.rx,n.ry,n.rz)&&!s(r.tx,r.ty,r.tz)&&!s(r.rx,r.ry,r.rz)}let n=t.x-e.x,r=t.z-e.z;if(n*n+r*r>2.7*2.7)return!1;let i=e.tangent,a=t.tangent;return!xm(e,t,i.x,i.z,n,r)&&!xm(e,t,-i.z,i.x,n,r)&&!xm(e,t,a.x,a.z,n,r)&&!xm(e,t,-a.z,a.x,n,r)}function Cm(e,t){if(e.some(e=>e.surfaceWorld))return wm(t);let n=1/0,r=1/0,i=-1/0;for(let t of e)for(let e of t.segments)for(let t of e.line.points)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x);let a=Math.floor(n/4)-3,o=Math.floor(r/4)-3,s=Math.ceil((i-n)/4)+8,c=new Map,l=(e,t)=>(Math.floor(t/4)-o)*s+Math.floor(e/4)-a;for(let e of t)e._cars=e.carPoses.map(t=>({train:e,pose:t,cell:null,index:0}));return{update:e=>{for(let t of e._cars){let e=l(t.pose.x,t.pose.z);if(t.cell===e)continue;if(t.cell!==null){let e=c.get(t.cell),n=e.pop();n!==t&&(e[t.index]=n,n.index=t.index)}let n=c.get(e);n||(n=[],c.set(e,n)),t.cell=e,t.index=n.length,n.push(t)}},collides:(e,t)=>{for(let n of t){let t=l(n.x,n.z);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let a=c.get(t+r*s+i);if(a){for(let t of a)if(t.train!==e&&Sm(n,t.pose))return!0}}}return!1}}}function wm(e){let t=new Map,n=e=>`${Math.floor(e.x/4)},${Math.floor(e.y/4)},${Math.floor(e.z/4)}`;for(let t of e)t._cars=t.carPoses.map(e=>({train:t,pose:e,cell:null,index:0}));return{update:e=>{for(let r of e._cars){let e=n(r.pose.physical);if(r.cell===e)continue;if(r.cell!==null){let e=t.get(r.cell),n=e.pop();n!==r&&(e[r.index]=n,n.index=r.index)}let i=t.get(e);i||(i=[],t.set(e,i)),r.cell=e,r.index=i.length,i.push(r)}},collides:(e,n)=>{for(let r of n){let n=r.physical,i=Math.floor(n.x/4),a=Math.floor(n.y/4),o=Math.floor(n.z/4);for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){let l=t.get(`${i+n},${a+s},${o+c}`);if(l){for(let t of l)if(t.train!==e&&Sm(r,t.pose))return!0}}}return!1}}}function Tm(e){if(!G(e))return e;let t=new Map(e.lines.map(t=>[t.id,mc(e,t)]));return{...e,lines:e.lines.map(e=>{let n=t.get(e.id);return{...e,alignment:null,length:n.length,distances:e.distances.map(e=>_c(n,e)),stops:e.stops?.map(e=>({...e,distance:_c(n,e.distance)}))}}),junctions:e.junctions?.map(e=>({...e,lines:e.lines.map(e=>({...e,distance:_c(t.get(e.lineId),e.distance)}))}))}}function Em(e,t,n,r,i){let a=0,o=e.length;for(;a<o;){let t=a+o>>1;e[t].start<=n?a=t+1:o=t}for(let n=a-1;n>=0&&e[n].maximumEnd>=t;n--){let a=e[n];a.end<t||a.block.queryStamp===r||(a.block.queryStamp=r,i.push(a.block))}}function Dm(e,t){let n=new Map(e.map(e=>[e.id,[]]));for(let e of t)for(let t of e.zones)n.get(t.pathId).push({...t,block:e});for(let e of n.values()){e.sort((e,t)=>e.start-t.start);let t=-1/0;for(let n of e)t=Math.max(t,n.end),n.maximumEnd=t}let r=0;return(e,t,i)=>{i.length=0;let a=n.get(e.path.id);if(!a.length)return i;let o=++r,s=e.halfLength+.2,c=e.path.length;return Em(a,t-s,t+s,o,i),t<s&&Em(a,t-s+c,c,o,i),t+s>c&&Em(a,0,t+s-c,o,i),i}}function Om(e,t){let n=t.map(e=>Math.max(0,Math.floor(e.length/12))),r=n.reduce((e,t)=>e+t,0),i=t.map((e,t)=>Math.min(n[t],Math.max(1,Math.min(new Set(e.segments.flatMap(e=>[e.line.from,e.line.to])).size,Math.floor(e.length/18))))),a=e.traffic?.trainCount;if(a===void 0)return{counts:i,requested:i.reduce((e,t)=>e+t,0),capacity:r};if(!Number.isInteger(a)||a<0||a>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);if(!r)return{counts:n,requested:a,capacity:r};let o=Math.min(a,r),s=n.map(e=>Math.floor(o*e/r)),c=o-s.reduce((e,t)=>e+t,0),l=n.map((e,t)=>({index:t,fraction:o*e/r-s[t]})).sort((e,t)=>t.fraction-e.fraction||e.index-t.index);for(let{index:e}of l)c>0&&s[e]<n[e]&&(s[e]++,c--);return{counts:s,requested:a,capacity:r}}function km(e){let t=pm(e);if(!t.length){let t=Xp(Tm(e)),n=new Map(e.lines.map(e=>[e.id,e]));for(let r of t.trains){let t=n.get(r.lineId);r.color=t.color,r.path=fm([{line:t,direction:1}],0,!1,e),r.homeCityId=t.from,r.ownerId=im(e,r.id,t.from,t)}let r=_m(t.trains,e);for(let e of t.trains)bm(e,r);return{trains:t.trains,mode:`shuttles`,paths:[],poseBuffer:r,poseStride:6,stats:{requestedTrainCount:e.traffic?.trainCount??t.trains.length,trainCount:t.trains.length,capacity:t.capacity},get reservations(){return t.reservations},sampleTrain:(e,t=0,n)=>sm(e.path,e.distance+t,n),update(e){t.update(e);for(let e of t.trains)bm(e,r)}}}let n=[],r=Om(e,t);for(let[i,a]of t.entries()){let t=[...new Set(a.segments.flatMap(e=>[e.line.from,e.line.to]))],o=r.counts[i];a.trains=[];for(let r=0;r<o;r++){let i=`${a.id}-train-${r+1}`,s=t[r%t.length],c={id:i,path:a,homeCityId:s,ownerId:im(e,i,s),color:[`coral`,`teal`,`gold`,`blue`][r%4],distance:r/o*a.length,count:3,spacing:Zp,halfLength:Qp,direction:1,speed:2.6,active:!1,waiting:!1,_leader:null};n.push(c),a.trains.push(c)}}let i=_m(n,e);for(let e of n)bm(e,i);let a=mm(t),o=new Map(n.map(e=>[e.id,e])),s=Dm(t,a),c=Cm(t,n),l=[],u=[],d=[];function f(e,t,n=!1){if(e.owner===t.id)return!0;let r=e.waiters.values().next().value;return e.owner||r!==void 0&&r!==t.id?(n&&e.waiters.add(t.id),!1):!0}function p(e,t){e.owner=t.id,e.waiters.delete(t.id)}function m(e,t){if(s(e,t,l),l.some(t=>!f(t,e))||(vm(e,t,e._nextCarPoses),c.collides(e,e._nextCarPoses)))return!1;e.distance=t,bm(e,i);for(let t of l)p(t,e);return e.active=!0,c.update(e),ym(e,i),!0}function h(e,t=!1){if(!m(e,e.distance)&&t){d.length=0;for(let t of e.path.trains)t.active&&d.push(t);if(d.sort((e,t)=>e.distance-t.distance),d.length)for(let t=0;t<d.length;t++){let n=d[t],r=d[(t+1)%d.length],i=d.length===1?e.path.length:nm(r.distance-n.distance,e.path.length);if(!(i<e.halfLength*2+n.halfLength+r.halfLength+1.8)&&m(e,nm(n.distance+i/2,e.path.length)))return}else for(let t=1;t<12;t++)if(m(e,e.path.length*t/12))return}}for(let e of n)h(e);function g(e){for(let e of n)e._cachedDistance!==e.distance&&(bm(e,i),e.active&&c.update(e));for(let e of a)e.owner&&!hm(o.get(e.owner),e)&&(e.owner=null);for(let t of n)t.active||(t._spawnRetry=(t._spawnRetry??0)-e,t._spawnRetry<=0&&(h(t,!0),t._spawnRetry=.5));for(let e of t){e.trains.sort((e,t)=>e.distance-t.distance);let t=null,n=null;for(let r of e.trains)r.active&&(n&&(n._leader=r),t??=r,n=r);n&&(n._leader=n===t?null:t)}for(let t of n){if(!t.active){t.waiting=!0;continue}t.waiting=!1;let n=t.speed*e;if(t._leader){let e=t._leader,r=nm(e.distance-t.distance,t.path.length)-t.halfLength-e.halfLength-.8;n=Math.min(n,Math.max(0,r))}let r=nm(t.distance+n,t.path.length);s(t,r,l),s(t,t.distance,u);let a=!1;for(let e of l)f(e,t,!0)||(a=!0);for(let e of u)f(e,t,!0)||(a=!0);if(a||=(vm(t,r,t._nextCarPoses),c.collides(t,t._nextCarPoses)),a)t.waiting=!0;else{for(let e of l)p(e,t);for(let e of u)p(e,t);t.distance=r;for(let e=0;e<t.count;e++)gm(t._nextCarPoses[e],t.carPoses[e]);sm(t.path,r,t.pose),t._cachedDistance=r,c.update(t),ym(t,i)}}}return{mode:`circuits`,trains:n,paths:t,poseBuffer:i,poseStride:6,stats:{requestedTrainCount:r.requested,trainCount:n.length,capacity:r.capacity},sampleTrain:(e,t=0,n)=>sm(e.path,e.distance+t,n),get reservations(){return a.map(e=>({id:e.id,trainId:e.owner,zones:e.zones}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(!e)return;let t=Math.ceil(e/tm);for(let n=0;n<t;n++)g(e/t)}}}function Am(e){let t=new Map;for(let n of e.children){if(!n.isMesh)throw TypeError(`Color batching expects consolidated meshes`);let e=n.material,r={roughness:e.roughness??1,metalness:e.metalness??0,side:e.side,flatShading:e.flatShading,transparent:e.transparent,opacity:e.opacity},i=e.userData.sceneStyle??`asset`,a=JSON.stringify({...r,sceneStyle:i});t.has(a)||t.set(a,{properties:r,sceneStyle:i,geometries:[]});let o=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone(),s=o.attributes.position.count,c=new Float32Array(s*3),l=o.attributes.color;for(let t=0;t<s;t++)c[t*3]=e.color.r*(l?l.getX(t):1),c[t*3+1]=e.color.g*(l?l.getY(t):1),c[t*3+2]=e.color.b*(l?l.getZ(t):1);o.setAttribute(`color`,new P(c,3)),t.get(a).geometries.push(o),n.geometry.dispose()}e.clear(),e.userData.ownedMaterials??=[];for(let{properties:n,sceneStyle:r,geometries:i}of t.values()){let t=$a(i,!1);i.forEach(e=>e.dispose());let a=new j({...n,color:16777215,vertexColors:!0,name:`baked-material-colors`});a.userData.sceneStyle=r,Ht(a,{kind:r}),e.userData.ownedMaterials.push(a);let o=new K(t,a);o.castShadow=!0,o.receiveShadow=!0,e.add(o)}return e}var jm={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`};function Mm(t,n,r={}){let i=!!G(n),a=r.traffic??km(n),o=new yt;o.name=`instanced-trains`,t.add(o);let s=new Map((n.players??[]).map(e=>[e.id,bl(e)]));o.userData.ownedMaterials=[...s.values()].flatMap(e=>Object.values(e));let c=a.trains.reduce((e,t)=>e+t.count,0),l=new Float32Array(c*6),u=new Map,d=new Map,f=0,p=!1,m=a.trains.map(e=>{let t=f;return f+=e.count,{state:e,parts:Array.from({length:e.count},(n,r)=>{let i=new le;return i.userData={trainId:e.id,poseOnly:!0,poseIndex:t+r},i}),poseOffset:t}}),h=()=>a.poseBuffer??l;function g(){let e=h();m.poseBuffer=e;for(let t of m){let n=t.state;for(let r=0;r<t.parts.length;r++){let i=t.parts[r],o=((a.poseBuffer?n.poseOffset:t.poseOffset)+r)*6;if(i.userData.poseIndex=o/6,!a.poseBuffer){let t=n.carPoses?.[r]??a.sampleTrain(n,(r-(n.count-1)/2)*n.spacing);e[o]=t.x,e[o+1]=t.y,e[o+2]=t.z,e[o+3]=t.angle,e[o+4]=+!!n.active,e[o+5]=0}i.position.set(e[o],e[o+1],e[o+2]),i.rotation.y=e[o+3]+(r===0?Math.PI:0),i.visible=e[o+4]>0}}}let _=new ie,v=new ie,b=new Ye,x=new we(new J,2.2),S=new J,C=new y,w=new J(1,1,1),T=new J(0,1,0),E={totalTrains:m.length,totalCars:c,visibleCars:0,visibleTrains:0,batches:0,templates:0,uploadedMatrices:0};function D(e,t){let n=`${e.state.ownerId??e.state.color}:${+!!t}`;if(!u.has(n)){let r=Am(jp(Pp(new yt,{palette:s.get(e.state.ownerId),color:jm[e.state.color]??`redLight`,cab:t})));o.userData.ownedMaterials.push(...r.userData.ownedMaterials),u.set(n,r.children.map(e=>({geometry:e.geometry,material:e.material})))}return{key:n,parts:u.get(n)}}function O(r,{mapBlend:a=0,prewarm:s=!1}={}){if(p||(o.visible=a<.999||s,E.visibleCars=0,E.visibleTrains=0,E.uploadedMatrices=0,!o.visible))return;r&&(r.updateMatrixWorld(),v.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),b.setFromProjectionMatrix(v)),t.updateWorldMatrix(!0,!1);let c=new Map,l=new Set;for(let e of m)for(let a=0;a<e.parts.length;a++){let o=e.parts[a];if(!o.visible||(i?ue(n,o.position.x,o.position.y+.8,o.position.z,x.center):x.center.copy(o.position).addScaledVector(T,.8),x.center.applyMatrix4(t.matrixWorld),r&&!b.intersectsSphere(x)))continue;let s=a===0||a===e.parts.length-1,u=`${e.state.ownerId??e.state.color}:${+!!s}`;c.has(u)||c.set(u,{train:e,cab:s,cars:[]}),c.get(u).cars.push({train:e,part:o}),E.visibleCars++,l.add(e.state.id)}for(let[e,t]of d)c.has(e)||t.meshes.forEach(e=>{e.count=0});for(let[t,r]of c){let a=d.get(t);if(!a||a.capacity<r.cars.length){if(a)for(let e of a.meshes)o.remove(e),e.dispose();let n=D(r.train,r.cab),i=2**Math.ceil(Math.log2(Math.max(16,r.cars.length)));a={capacity:i,meshes:n.parts.map(t=>{let n=new Ve(t.geometry,t.material,i);return n.count=0,n.instanceMatrix.setUsage(e),n.frustumCulled=!1,n.castShadow=!0,n.receiveShadow=!0,n.userData.instanceTrainIds=[],n.userData.ownerId=r.train.state.ownerId,o.add(n),n})},d.set(t,a)}for(let e=0;e<r.cars.length;e++){let{train:t,part:o}=r.cars[e];S.copy(o.position),C.setFromAxisAngle(T,o.rotation.y),i?St(n,S.x,S.y,S.z,o.rotation.y,_):_.compose(S,C,w);for(let n of a.meshes)n.setMatrixAt(e,_),n.userData.instanceTrainIds[e]=t.state.id}for(let e of a.meshes)e.count=r.cars.length,e.userData.instanceTrainIds.length=e.count,e.instanceMatrix.clearUpdateRanges(),e.instanceMatrix.addUpdateRange(0,e.count*16),e.instanceMatrix.needsUpdate=!0,e.boundingSphere=null,E.uploadedMatrices+=e.count}E.visibleTrains=l.size,E.batches=[...d.values()].reduce((e,t)=>e+t.meshes.length,0),E.templates=u.size}function ee(){if(!p){p=!0;for(let e of d.values())e.meshes.forEach(e=>e.dispose());for(let e of u.values())e.forEach(e=>e.geometry.dispose());o.userData.ownedMaterials.forEach(e=>e.dispose()),o.clear(),o.removeFromParent()}}return g(),{root:o,trains:m,traffic:a,stats:E,get poseBuffer(){return h()},update(e){if(!p){let t=performance.now();a.update(e);let n=performance.now();g(),E.simulationMs=n-t,E.poseMs=performance.now()-n}},updateView:O,dispose:ee}}Object.freeze([`meadow`,`scrub`,`dune`,`outcrop`,`frost`]);function Nm(e,t,{requestChunk:n,size:r=192,maxChunks:i=48,maxVisibleChunks:a=1/0,maxPending:o=2,maxBytes:s=134217728,uploadMesh:c}={}){if(typeof n!=`function`)throw TypeError(`Regional rendering requires a worker requestChunk function`);let l=new yt;l.name=`local-world-detail`,e.add(l);let u=new Map,d=new Map,f=new Map,h=new Map,g=new Map,_=new Map,v=new Ye,y=new Ye,b=new ie,x=new J,S=new J,C=new A,w=new J,T=G(t),E=new Ze,D=new J,O={},ee=T?new we(new J(0,-T.radius,0),T.radius):null,k=new A,te=new we,ne=new J,re=0,M=!1,N=!1,ae=[],F=``,oe=0,I=Math.max(35,...t.mountains.map(e=>e.height)),se=[...t.cities,...t.mountains.filter(e=>!e.range),...t.stations],ce=new Set(t.mountains),le=new Map(se.map(e=>[e,ce.has(e)?e.radius??4:Be(t,e.x,e.z,e.radius??4)])),L={loadedChunks:0,visibleChunks:0,pendingChunks:0,requestedChunks:0,triangles:0,bytes:0,errors:0,requiredChunks:0,prefetchChunks:0,coverageLimited:!1,budgetOverflow:!1,maxBytes:s,uploadedMeshes:0,uploadingChunks:0,revealingChunks:0},de=(e,t)=>{let n=JSON.stringify(e),r=t.materials.get(n);return r||(r=Xa(new j({name:e.name,color:new Y().fromArray(e.color),roughness:e.roughness,metalness:e.metalness,side:e.side,flatShading:!0,vertexColors:e.vertexColors}),t.reveal),Ht(r,{kind:e.sceneStyle??`asset`}),t.materials.set(n,r)),r};function fe(e){e.root.traverse(e=>{e.isMesh&&e.geometry.dispose()});for(let t of e.materials.values())t.dispose();e.depthMaterial?.dispose()}function pe(e){fe(e),l.remove(e.root),u.delete(e.key),L.bytes-=e.bytes,L.triangles-=e.triangles}function me(e){for(let[t,n]of f)for(;n.next<n.packet.meshes.length;){let t=n.packet.meshes[n.next++],r=new m;r.setAttribute(`position`,new P(t.position,3)),t.index&&r.setIndex(new P(t.index,1)),t.normal?r.setAttribute(`normal`,new P(t.normal,3)):r.computeVertexNormals(),t.color&&r.setAttribute(`color`,new P(t.color,3));let i=n.packet.bounds,a=n.packet.renderBounds;a?(r.boundingBox=new A(new J().fromArray(a.min),new J().fromArray(a.max)),r.boundingSphere=r.boundingBox.getBoundingSphere(new we)):r.boundingSphere=new we(new J((i.minX+i.maxX)/2,I/2,(i.minZ+i.maxZ)/2),Math.hypot(i.maxX-i.minX,I+8,i.maxZ-i.minZ)/2),n.triangles+=(t.index?.length??t.position.length/3)/3;let o=new K(r,de(t.material,n));xp(o,t.bvh);let s=new Set([t.position.buffer,t.normal?.buffer,t.color?.buffer,t.index?.buffer,...Sp(t.bvh)].filter(Boolean));if(n.bytes+=[...s].reduce((e,t)=>e+t.byteLength,0),o.customDepthMaterial=n.depthMaterial,o.castShadow=!0,o.receiveShadow=!0,n.root.add(o),performance.now()>=e)return}}function he(){for(let[e,t]of f){if(t.next<t.packet.meshes.length||c&&t.uploaded<t.next)continue;let n=t.packet.bounds,r=t.packet.renderBounds,i={key:e,root:t.root,bounds:r?new A(new J().fromArray(r.min),new J().fromArray(r.max)):new A(new J(n.minX,-4,n.minZ),new J(n.maxX,I,n.maxZ)),last:re,bytes:t.bytes,triangles:t.triangles,reveal:t.reveal,progress:0,materials:t.materials,depthMaterial:t.depthMaterial,lifePlacements:t.packet.lifePlacements??[]};l.add(t.root),u.set(e,i),f.delete(e),L.bytes+=t.bytes,L.triangles+=t.triangles,L.loadedChunks=u.size}}function ge(e){e.cancelled=!0,fe(e)}function _e(){if(c)for(let[e,t]of f){if(t.warming||t.uploaded>=t.next)continue;t.warming=!0;let n=()=>{!M&&!t.cancelled&&(t.uploaded++,t.warming=!1,L.uploadedMeshes++)},r=n=>{M||t.cancelled||(ge(t),f.delete(e),_.set(e,n),L.errors++,l.userData.lastError=String(n?.message??n))};try{let e=c(t.root.children[t.uploaded]);e?.then?Promise.resolve(e).then(n,r):n()}catch(e){r(e)}return}}function ve(e,t){L.requestedChunks++;let r=new AbortController,i={controller:r},a=Promise.resolve().then(()=>n(t,{signal:r.signal}));i.promise=a,d.set(e,i),L.pendingChunks=d.size+f.size,Promise.resolve(a).then(t=>{if(d.get(e)===i&&(d.delete(e),!M&&h.has(e))){let n=new yt;n.name=`detail-${e}`;let r={value:0};f.set(e,{packet:t,root:n,next:0,uploaded:0,warming:!1,bytes:0,triangles:0,reveal:r,materials:new Map,depthMaterial:Za(r)})}},t=>{d.get(e)===i&&(d.delete(e),M||t?.name===`AbortError`||(_.set(e,t),L.errors++,l.userData.lastError=String(t?.message??t)))}).finally(()=>{L.pendingChunks=d.size+f.size})}let ye=t.outline.map(e=>e[0]),be=t.outline.map(e=>e[1]),R={minX:Math.min(...ye),maxX:Math.max(...ye),minZ:Math.min(...be),maxZ:Math.max(...be)},z=T?.complete?R.maxX-R.minX:0,xe=T?.complete&&T.projection.type===`equirectangular`,Se=xe&&Array.isArray(t.biomes?.land)?[...t.biomes.land,...t.biomes.oceanShore??[],...t.biomes.lakeShore??[]].map(e=>{let t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let[n,r]of e[0])t.minX=Math.min(t.minX,n),t.maxX=Math.max(t.maxX,n),t.minZ=Math.min(t.minZ,r),t.maxZ=Math.max(t.maxZ,r);return t}):null,Ce=Se?[...se.map(e=>{let t=le.get(e);return{minX:e.x-t,maxX:e.x+t,minZ:e.z-t,maxZ:e.z+t}}),...(t.lines??[]).map(e=>{let n={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let t of e.points??[])n.minX=Math.min(n.minX,t.x),n.maxX=Math.max(n.maxX,t.x),n.minZ=Math.min(n.minZ,t.z),n.maxZ=Math.max(n.maxZ,t.z);if(Number.isFinite(n.minX)){let e=Math.max(Be(t,n.minX,n.minZ,4),Be(t,n.maxX,n.maxZ,4));n.minX-=e,n.maxX+=e,n.minZ-=e,n.maxZ+=e}return n})]:[],Te=new Map;function Ee(e){if(!Se)return!0;if(!Te.has(e.key)){let t=e.x-r/2,n=e.x+r/2,i=e.z-r/2,a=e.z+r/2,o=(e,r=0)=>e.minX+r<=n&&e.maxX+r>=t&&e.minZ<=a&&e.maxZ>=i;Te.set(e.key,Se.some(e=>o(e))||Ce.some(e=>o(e)||z&&(o(e,-z)||o(e,z))))}return Te.get(e.key)}function B(e){if(!xe)return!0;let n=T.projection,i=Math.max(R.minX,e.x-r/2),a=Math.min(R.maxX,e.x+r/2),o=Math.max(R.minZ,e.z-r/2),s=Math.min(R.maxZ,e.z+r/2),c=n.centralLatitude*Math.PI/180-(o+s)/(2*n.radius),l=(s-o)/(2*n.radius),u=Math.cos(Math.max(0,Math.abs(c)-l));return ue(t,(i+a)/2,(I-4)/2,(o+s)/2,te.center),te.radius=(T.radius+I)*Math.hypot((a-i)/(2*n.radius)*u,l)+(I+4)/2,y.intersectsSphere(te)}let De=e=>z?((e+z/2)%z+z)%z-z/2:e;function Oe(e,t){if(z&&t-e>=z)return[[R.minX,R.maxX]];if(!z)return[[Math.max(R.minX,e),Math.min(R.maxX,t)]];let n=((e-R.minX)%z+z)%z+R.minX,r=n+t-e;return r<=R.maxX?[[n,r]]:[[n,R.maxX],[R.minX,r-z]]}function ke(e,n){e.updateMatrixWorld(),e.getWorldDirection(x),b.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),y.setFromProjectionMatrix(b);let r=1/0,i=-1/0,a=1/0,o=-1/0;if(T){let s=!1;k.makeEmpty();for(let c of[-4,I])for(let l of[-1,0,1])for(let u of[-1,0,1])E.origin.set(l,u,-1).unproject(e),E.direction.copy(x),ee.radius=T.radius+c,E.intersectSphere(ee,D)?(k.expandByPoint(D),ft(t,D,O),z&&n&&(O.x=n.x+De(O.x-n.x)),r=Math.min(r,O.x),i=Math.max(i,O.x),a=Math.min(a,O.z),o=Math.max(o,O.z)):s=!0;if(s)r=R.minX,i=R.maxX,a=R.minZ,o=R.maxZ;else if(xe){let n=T.projection,s=k.getSize(S),c=Math.max(4,s.lengthSq()/(8*T.radius))*n.radius/T.radius;a=Math.max(R.minZ,a-c),o=Math.min(R.maxZ,o+c);let l=!1;for(let n of[R.minZ,R.maxZ])ue(t,0,0,n,ne),S.subVectors(ne,ee.center).dot(x)>=0||(ne.project(e),Math.abs(ne.x)<=1&&Math.abs(ne.y)<=1&&ne.z>=-1&&ne.z<=1&&(l=!0,a=Math.min(a,n),o=Math.max(o,n)));if(l)r=R.minX,i=R.maxX;else{let e=Math.max(Math.abs(n.centralLatitude*Math.PI/180-a/n.radius),Math.abs(n.centralLatitude*Math.PI/180-o/n.radius)),t=c/Math.max(.01,Math.cos(e));r-=t,i+=t}}else{let e=Math.max(4,((i-r)**2+(o-a)**2)/(8*T.radius));r-=e,i+=e,a-=e,o+=e}}else for(let t of[-1,1])for(let n of[-1,1]){S.set(t,n,0).unproject(e);let s=Math.abs(x.y)>1e-5?-S.y/x.y:0;S.addScaledVector(x,s),r=Math.min(r,S.x),i=Math.max(i,S.x),a=Math.min(a,S.z),o=Math.max(o,S.z)}return{minX:r,maxX:i,minZ:a,maxZ:o}}function V(t,{dt:n=0,reveal:r=!0,reducedMotion:i=!1}={}){if(M)return;e.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),b.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),v.setFromProjectionMatrix(b),L.visibleChunks=L.revealingChunks=0;let a=[];for(let t of u.values())C.copy(t.bounds).applyMatrix4(e.matrixWorld),t.root.visible=v.intersectsBox(C),t.root.visible&&(L.visibleChunks++,r&&(t.progress=i?1:Math.min(1,t.progress+Math.max(0,n)/.38),t.reveal.value=t.progress*t.progress*(3-2*t.progress)),t.progress<1?L.revealingChunks++:a.push(t));let o=a.map(e=>e.key).join(`|`);o!==F&&(F=o,ae=a.flatMap(e=>e.lifePlacements),oe++)}function Ae(e,{mapBlend:n=0,target:m,budgetMs:v=5,prewarm:y=!1,coverageCamera:b=e,coverageCameras:x,retainVisible:S=!1}={}){if(M||(re++,l.visible=n<.999,!l.visible&&!y))return;let C=[];m&&w.copy(m);let E=(e,n)=>({key:`${e}:${n}`,x:e+r/2,z:n+r/2,size:r,distance:T?We(t,w,{x:e+r/2,z:p.clamp(n+r/2,R.minZ,R.maxZ)})**2:De(e+r/2-w.x)**2+(n+r/2-w.z)**2});g.clear(),h.clear();for(let e of x?.length?x:[b]){let t=ke(e,m),{minX:n,maxX:i,minZ:a,maxZ:o}=t;!m&&!C.length&&w.set((n+i)/2,0,(a+o)/2),C.push(t);for(let[e,t]of Oe(n,i))for(let n=Math.floor(e/r)*r;n<t;n+=r)for(let e=Math.floor(Math.max(R.minZ,a)/r)*r;e<Math.min(R.maxZ,o);e+=r){let t=E(n,e);Ee(t)&&B(t)&&g.set(t.key,t)}for(let e of se){let t=le.get(e),s=z?w.x+De(e.x-w.x):e.x;if(s+t<n||s-t>i||e.z+t<a||e.z-t>o)continue;let c=E(Math.floor(e.x/r)*r,Math.floor(e.z/r)*r);g.set(c.key,c)}}let D=[...g.values()].sort((e,t)=>e.distance-t.distance);N=!0,L.requiredChunks=g.size,L.coverageLimited=g.size>a;for(let e of D.slice(0,a))h.set(e.key,e);if(!L.coverageLimited){let e=new Map;for(let{minX:t,maxX:n,minZ:i,maxZ:a}of C)for(let[o,s]of Oe(t-r,n+r))for(let t=Math.floor(o/r)*r;t<s;t+=r)for(let n=Math.floor(Math.max(R.minZ,i-r)/r)*r;n<Math.min(R.maxZ,a+r);n+=r){let r=E(t,n);!h.has(r.key)&&Ee(r)&&e.set(r.key,r)}for(let t of[...e.values()].sort((e,t)=>e.distance-t.distance)){if(h.size>=Math.min(i,g.size+36))break;h.set(t.key,t)}}L.prefetchChunks=h.size-Math.min(g.size,a);for(let[e,t]of d)h.has(e)||(d.delete(e),t.controller.abort());for(let[e,t]of f)h.has(e)||(ge(t),f.delete(e));let O=performance.now();me(O+v),_e(),he(),V(e);for(let e of u.values())(h.has(e.key)||S&&e.root.visible)&&(e.last=re);for(let[e,t]of h){if(d.size+f.size>=o||performance.now()-O>=v)break;let n=u.size?L.bytes/u.size:4194304;!g.has(e)&&L.bytes+n*(1+d.size+f.size)>s*.9||u.has(e)||d.has(e)||f.has(e)||_.has(e)||ve(e,t)}if(u.size>i||L.bytes>s){let e=[...u.values()].filter(e=>!g.has(e.key)&&!(S&&e.root.visible)).sort((e,t)=>Number(h.has(e.key))-Number(h.has(t.key))||e.last-t.last);for(let t of e){if(u.size<=i&&L.bytes<=s)break;pe(t)}}L.budgetOverflow=L.bytes>s,L.loadedChunks=u.size,L.pendingChunks=d.size+f.size,L.uploadingChunks=c?[...f.values()].filter(e=>e.uploaded<e.next).length:0}function je(){if(!M){M=!0;for(let e of[...u.values()])pe(e);for(let e of f.values())ge(e);for(let e of d.values())e.controller.abort();l.removeFromParent(),h.clear(),g.clear(),d.clear(),f.clear(),L.loadedChunks=L.pendingChunks=0,ae=[],F=``,oe++}}function H(){return!M&&N&&!L.coverageLimited&&(g.size>0||Se!==null)&&[...g.keys()].every(e=>u.has(e))}return{root:l,update:Ae,updateVisibility:V,stats:L,dispose:je,get lifePlacements(){return ae},get lifeRevision(){return oe},get ready(){return H()},get settled(){return H()&&[...g.keys()].every(e=>{let t=u.get(e);return!t.root.visible||t.progress>=1})}}}var Pm=Object.freeze({terrain:-1.35,contour0:-.18,contour1:-.16,snow:-.14,sand:-1.24,waterLight:-1.27,ocean:-1.27,"route-paper":.025,"route-ink":.035});function Fm(e,t,n,r){let i=!!t.getAttribute(`color`),a=new j({name:e.name.replace(/^map-/,`detail-base-`),color:i?16777215:e.color,vertexColors:i,roughness:1,metalness:0,side:2,flatShading:!1,depthWrite:!0,depthTest:!0});return a.onBeforeCompile=e=>{e.uniforms.detailBaseHeight={value:n},e.uniforms.detailBaseRadius={value:r},e.vertexShader=`uniform float detailBaseHeight; uniform float detailBaseRadius;
`+e.vertexShader;let t=r>0?`normalize(position + vec3(0.0, detailBaseRadius, 0.0))`:`vec3(0.0, 1.0, 0.0)`;e.vertexShader=e.vertexShader.replace(`#include <beginnormal_vertex>`,`
      vec3 detailBaseNormal = ${t};
      vec3 objectNormal = detailBaseNormal;
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif
    `),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,r>0?`vec3 transformed = detailBaseNormal * (detailBaseRadius + detailBaseHeight) - vec3(0.0, detailBaseRadius, 0.0);`:`vec3 transformed = vec3(position.x, detailBaseHeight, position.z);`)},a.customProgramCacheKey=()=>`detail-base-${r>0?`sphere`:`plane`}-v1`,Ht(a,{kind:/water|ocean/.test(e.name)?`water`:`terrain`})}function Im(e,t,n){let r=new yt;r.name=`detail-base`,e.add(r);let i=new Set,a=n.surface?.type===`sphere`?n.surface.radius:0,o=!1;return t?.traverse(e=>{if(!e.isMesh||!e.geometry?.getAttribute(`position`)||Array.isArray(e.material))return;let t=e.material.name.replace(/^map-/,``);if(!Object.hasOwn(Pm,t))return;let n=Fm(e.material,e.geometry,Pm[t],a);i.add(n);let o=new K(e.geometry,n);o.name=`detail-base-${t}`,o.castShadow=!1,o.receiveShadow=!0,o.frustumCulled=!1,r.add(o)}),{root:r,dispose(){o||(o=!0,i.forEach(e=>e.dispose()),i.clear(),r.clear(),r.removeFromParent())}}}function Lm({cities:e=256,trains:t=2048,seed:n=`continental-256`}={}){let r=Number(e),i=Number(t);if(!Number.isFinite(r)||r<8||r>4096||!Number.isInteger(r)||r%8!=0)throw TypeError(`Stress cities must be a multiple of 8 from 8 through4096`);if(!Number.isInteger(i)||i<0||i>32768)throw TypeError(`Stress trains must be an integer from 0 through32768`);let a=r/8,o=Math.ceil(Math.sqrt(a*2)),s=Math.ceil(a/o),c=o*500+300,l=s*500+300,u=c/2,d=l/2,f=s%2?250:0,p={seed:n,bounds:{width:c,depth:l},outline:[[-u,-d+100],[-u+100,-d],[u-100,-d],[u,-d+100],[u,d-100],[u-100,d],[-u+100,d],[-u,d-100]],density:1,minTurnRadius:9,cities:[],connections:[],mountains:[],river:{width:10,points:[[-u-100,f],[u+100,f]]},traffic:{trainCount:i,circuits:[]}},m=[`coral`,`teal`,`gold`,`blue`];for(let e=0;e<a;e++){let t=(e%o-(o-1)/2)*500,n=(Math.floor(e/o)-(s-1)/2)*500,r=[];for(let i=0;i<8;i++){let a=i*Math.PI/4,o=`region-${e+1}-city-${i+1}`;p.cities.push({id:o,x:t+Math.cos(a)*190,z:n+Math.sin(a)*190,level:1+(e*3+i*7)%10,ownerId:m[(e+i)%4]});let s=`regional-${e+1}-${i+1}`;p.connections.push({id:s,from:o,to:`region-${e+1}-city-${(i+1)%8+1}`}),r.push({lineId:s,direction:1})}p.traffic.circuits.push({id:`circuit-${e+1}`,segments:r}),e%o>0&&p.connections.push({id:`connector-west-${e+1}`,from:`region-${e}-city-1`,to:`region-${e+1}-city-5`}),e%o===0&&e>=o&&p.connections.push({id:`connector-north-${e+1}`,from:`region-${e-o+1}-city-3`,to:`region-${e+1}-city-7`})}for(let e=0;e<a;e+=8){let t=p.cities[e*8+5],n=p.cities[e*8+6],r=(t.x+n.x)/2,i=(t.z+n.z)/2;Math.abs(i-f)>30&&p.mountains.push({id:`regional-pass-${e+1}`,x:r,z:i,radius:23,height:24})}return p}function Rm({WorkerClass:e,MessageChannelClass:t=globalThis.MessageChannel,detailWorkers:n=e?1:globalThis.navigator?.hardwareConcurrency>=4?2:1}={}){let r=()=>e?new e(new URL(`data:text/javascript;base64,aW1wb3J0IHsgZ2VuZXJhdGVXb3JsZCxnZW5lcmF0ZVdvcmxkUmVnaW9uLHZhbGlkYXRlV29ybGQgfSBmcm9tICcuL3dvcmxkLW1vZGVsLmpzJzsKaW1wb3J0IHsgY29tcGlsZURldGFpbFBhY2tldCB9IGZyb20gJy4vZGV0YWlsLWNvbXBpbGVyLmpzJzsKaW1wb3J0IHsgY3JlYXRlTW91bnRhaW5Db250b3VycyB9IGZyb20gJy4vbW91bnRhaW4tY29udG91cnMuanMnOwppbXBvcnQgeyBwcmVwYXJlTWFwVGVycmFpbiB9IGZyb20gJy4vbWFwLXRlcnJhaW4uanMnOwppbXBvcnQgeyBjb21waWxlTWFwVGVycmFpbkdlb21ldHJ5IH0gZnJvbSAnLi9tYXAtdGVycmFpbi1nZW9tZXRyeS5qcyc7CgpsZXQgd29ybGQ7CmZ1bmN0aW9uIGJ1ZmZlcnNPZih2YWx1ZSxyZXN1bHQ9bmV3IFNldCgpKXsKICBpZihBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKXJlc3VsdC5hZGQodmFsdWUuYnVmZmVyKTsKICBlbHNlIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpcmVzdWx0LmFkZCh2YWx1ZSk7CiAgZWxzZSBpZih2YWx1ZSYmdHlwZW9mIHZhbHVlPT09J29iamVjdCcpZm9yKGNvbnN0IGNoaWxkIG9mIE9iamVjdC52YWx1ZXModmFsdWUpKWJ1ZmZlcnNPZihjaGlsZCxyZXN1bHQpOwogIHJldHVybiByZXN1bHQ7Cn0Kc2VsZi5vbm1lc3NhZ2U9KHtkYXRhOntpZCx0eXBlLHBheWxvYWQscG9ydH19KT0+ewogIGlmKHR5cGU9PT0nc2hhcmUtd29ybGQnKXsKICAgIHRyeXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgc2hhcmluZyBkZXRhaWwnKTsKICAgICAgY29uc3Qge21hcFRlcnJhaW4sLi4ubmV0d29ya309d29ybGQ7CiAgICAgIHBvcnQucG9zdE1lc3NhZ2Uoe3dvcmxkOm5ldHdvcmt9KTsKICAgIH1jYXRjaChlcnJvcil7cG9ydC5wb3N0TWVzc2FnZSh7ZXJyb3I6e25hbWU6ZXJyb3IubmFtZSxtZXNzYWdlOmVycm9yLm1lc3NhZ2V9fSk7fQogICAgZmluYWxseXtwb3J0LmNsb3NlKCk7fQogICAgcmV0dXJuOwogIH0KICBpZih0eXBlPT09J2F0dGFjaC1wb3J0Jyl7CiAgICBwb3J0Lm9ubWVzc2FnZT0oe2RhdGF9KT0+ewogICAgICBpZihkYXRhLmVycm9yKXNlbGYucG9zdE1lc3NhZ2Uoe2lkLGVycm9yOmRhdGEuZXJyb3J9KTsKICAgICAgZWxzZXt3b3JsZD1kYXRhLndvcmxkO3NlbGYucG9zdE1lc3NhZ2Uoe2lkLHJlc3VsdDp7cmVhZHk6dHJ1ZX19KTt9CiAgICAgIHBvcnQuY2xvc2UoKTsKICAgIH07CiAgICByZXR1cm47CiAgfQogIHRyeXsKICAgIGNvbnN0IHN0YXJ0PXBlcmZvcm1hbmNlLm5vdygpO2xldCByZXN1bHQ7CiAgICBpZih0eXBlPT09J2dlbmVyYXRlJyl7CiAgICAgIHdvcmxkPWdlbmVyYXRlV29ybGQocGF5bG9hZCx7ZGV0YWlsOiduZXR3b3JrJ30pOwogICAgICBmb3IoY29uc3QgbW91bnRhaW4gb2Ygd29ybGQubW91bnRhaW5zKWlmKG1vdW50YWluLnJhbmdlKW1vdW50YWluLm1hcENvbnRvdXJzPWNyZWF0ZU1vdW50YWluQ29udG91cnMobW91bnRhaW4pOwogICAgICB3b3JsZC5tYXBUZXJyYWluPXttZXNoZXM6Y29tcGlsZU1hcFRlcnJhaW5HZW9tZXRyeShwcmVwYXJlTWFwVGVycmFpbih3b3JsZCksd29ybGQpfTsKICAgICAgY29uc3QgdmlvbGF0aW9ucz12YWxpZGF0ZVdvcmxkKHdvcmxkKTsKICAgICAgaWYodmlvbGF0aW9ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHdvcmxkOiAke3Zpb2xhdGlvbnNbMF0uZGV0YWlsPz92aW9sYXRpb25zWzBdLnR5cGV9YCk7CiAgICAgIHJlc3VsdD17d29ybGQsbWlsbGlzZWNvbmRzOnBlcmZvcm1hbmNlLm5vdygpLXN0YXJ0fTsKICAgIH1lbHNlIGlmKHR5cGU9PT0nY2h1bmsnKXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgcmVxdWVzdGluZyBkZXRhaWwnKTsKICAgICAgY29uc3QgcmVnaW9uPWdlbmVyYXRlV29ybGRSZWdpb24od29ybGQscGF5bG9hZCk7CiAgICAgIHJlc3VsdD1jb21waWxlRGV0YWlsUGFja2V0KHJlZ2lvbix3b3JsZCk7CiAgICAgIHJlc3VsdC5taWxsaXNlY29uZHM9cGVyZm9ybWFuY2Uubm93KCktc3RhcnQ7CiAgICB9ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gd29ybGQgcmVxdWVzdDogJHt0eXBlfWApOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7aWQscmVzdWx0fSx0eXBlPT09J2NodW5rJz9bLi4uYnVmZmVyc09mKHJlc3VsdCldCiAgICAgIDp0eXBlPT09J2dlbmVyYXRlJz9bLi4uYnVmZmVyc09mKHdvcmxkLm1hcFRlcnJhaW4pXTpbXSk7CiAgfWNhdGNoKGVycm9yKXtzZWxmLnBvc3RNZXNzYWdlKHtpZCxlcnJvcjp7bmFtZTplcnJvci5uYW1lLG1lc3NhZ2U6ZXJyb3IubWVzc2FnZX19KTt9Cn07Cg==`,``+import.meta.url),{type:`module`}):new Worker(new URL(new URL(`world-worker-eOQ3Okov.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=new Map,a=[],o=[],s=0,c=!1,l,u=!1,d=!1,f={workers:1,busy:0,queued:0,completedChunks:0,lastChunkMs:0},p=()=>new DOMException(`World request cancelled`,`AbortError`),m=()=>{f.workers=c?0:o.filter(e=>e.ready&&!e.failed).length,f.busy=o.filter(e=>e.currentId!==null).length,f.queued=a.filter(e=>i.has(e.id)).length};function h(e,t,n){i.delete(e.id),e.signal?.removeEventListener(`abort`,e.abort),t?e.reject(t):e.resolve(n)}function g(e){for(let t of[...i.values()])h(t,e);a.length=0;for(let e of o)e.currentId=null;m()}function _(e,t){t.node=e,t.type===`chunk`&&u&&(e.currentId=t.id);try{e.worker.postMessage({id:t.id,type:t.type,payload:t.payload})}catch(n){e.currentId===t.id&&(e.currentId=null),h(t,n)}}function v(){if(!(c||l)){for(let e of o)if(e.ready&&!e.failed&&e.currentId===null)for(;a.length&&e.currentId===null;){let t=a.shift();i.has(t.id)&&_(e,t)}m()}}function y(e){let t={worker:r(),primary:e,ready:e,failed:!1,currentId:null};o.push(t),t.worker.onmessage=({data:e})=>{if(c||t.failed)return;if(e.id===`peer-ready`){e.error?(t.failed=!0,t.worker.terminate()):t.ready=!0,v();return}t.currentId===e.id&&(t.currentId=null);let n=i.get(e.id);if(n){if(e.error){let t=Error(e.error.message);t.name=e.error.name??`Error`,h(n,t)}else n.type===`generate`&&(u=!0,b()),n.type===`chunk`&&(f.completedChunks++,f.lastChunkMs=e.result?.milliseconds??0),h(n,null,e.result)}v()};let n=n=>{if(c||t.failed)return;let r=Error(n);if(e){l=r,g(r);return}t.failed=!0,t.ready=!1,t.worker.terminate();let o=i.get(t.currentId);t.currentId=null,o&&(o.node=null,a.unshift(o)),v()};return t.worker.onerror=e=>n(e.message||`World worker failed`),t.worker.onmessageerror=()=>n(`World worker returned an unreadable packet`),t}function b(){if(d||n<2||!t)return;d=!0;let e,r;try{e=y(!1),r=new t,e.worker.postMessage({id:`peer-ready`,type:`attach-port`,port:r.port2},[r.port2]),o[0].worker.postMessage({type:`share-world`,port:r.port1},[r.port1])}catch{r?.port1.close(),r?.port2.close(),e&&(e.failed=!0,e.worker.terminate())}m()}let x=y(!0);return{stats:f,request(e,t,{signal:n}={}){return c?Promise.reject(new DOMException(`World replaced`,`AbortError`)):l?Promise.reject(l):n?.aborted?Promise.reject(p()):new Promise((r,o)=>{let c={id:++s,type:e,payload:t,resolve:r,reject:o,signal:n};c.abort=()=>{if(i.has(c.id)){let e=a.indexOf(c);e>=0&&a.splice(e,1),h(c,p()),v()}},n?.addEventListener(`abort`,c.abort,{once:!0}),i.set(c.id,c),e===`chunk`&&u?(a.push(c),v()):_(x,c)})},dispose(){if(!c){c=!0;for(let e of o)e.worker.terminate();g(new DOMException(`World replaced`,`AbortError`))}}}}function zm(e){let t=new He(1,1,{depthBuffer:!1}),n=new R,r=new O,a=new m,o=new i({colorWrite:!1,depthWrite:!1,depthTest:!1,toneMapped:!1}),s=new K(a,o);return s.frustumCulled=!1,n.add(s),{upload(i){let o=i.geometry,{start:c,count:l}=o.drawRange,u=e.getRenderTarget(),d=e.shadowMap.enabled;try{s.geometry=o,o.setDrawRange(0,3),e.shadowMap.enabled=!1,e.setRenderTarget(t),e.render(n,r)}finally{o.setDrawRange(c,l),s.geometry=a,e.setRenderTarget(u),e.shadowMap.enabled=d}},dispose(){t.dispose(),a.dispose(),o.dispose()}}}var Bm=Object.freeze({sheep:48,flocks:6,butterflies:16,fireflies:48,radius:150}),Vm=new Set([`tree`,`house`,`apartment`,`civic`,`tower`,`plaza`]),Hm=new Set([`tree`,`farmPatch`,`plaza`]),Um=Math.PI*2;function Wm(e){let t=String(e.id??`${e.kind}:${e.x.toFixed(3)}:${e.z.toFixed(3)}`),n=2166136261;for(let e=0;e<t.length;e++)n=Math.imul(n^t.charCodeAt(e),16777619);return(n>>>0)/4294967296}function Gm(e,t,n,r){if(e.length===r&&n>=e.at(-1).distance)return;let i={item:t,distance:n,phase:Wm(t)*Um},a=e.length;for(;a>0&&e[a-1].distance>n;)a--;e.splice(a,0,i),e.length>r&&e.pop()}function Km(e,t,n,r=Bm.radius){let i=[],a=[],o=[],s=!!G(e),c=s?ue(e,n.x,0,n.z):null,l=new J,u=s?2*e.surface.radius*Math.sin(Math.min(Math.PI,r/e.surface.radius)/2):r;for(let r of t??[]){if(r.kind!==`sheep`&&!Vm.has(r.kind)&&!Hm.has(r.kind))continue;let t=s?ue(e,r.x,0,r.z,l).distanceToSquared(c):(r.x-n.x)**2+(r.z-n.z)**2;t>u**2||(r.kind===`sheep`&&Gm(i,r,t,Bm.sheep),Vm.has(r.kind)&&Gm(a,r,t,Bm.flocks*8),Hm.has(r.kind)&&Gm(o,r,t,Bm.fireflies/3))}let d=[];for(let t of a)if(d.every(n=>We(e,t.item,n.item)>12)&&d.push(t),d.length===Bm.flocks)break;return{sheep:i,flocks:d,insects:o}}function qm(){let e=[new wt(1,0).scale(.125,.14,.15)];for(let t of[-1,1])e.push(new re(.09,.035,.075).translate(t*.145,.04,-.015).toNonIndexed());let t=$a(e);return e.forEach(e=>e.dispose()),t}function Jm(){let e=new m;return e.setAttribute(`position`,new ut([0,0,0,.48,.015,.12,.25,0,.22],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function Ym(t,n){let r=new yt;r.name=`local-life`,t.add(r);let i=[],a=[],o=!!G(n);function s(t,n,a,o,s=!0){let c=new Ve(n,a,o);return c.name=t,c.count=0,c.instanceMatrix.setUsage(e),c.frustumCulled=!1,c.castShadow=s,c.receiveShadow=s,r.add(c),i.push(c),c}let c=s(`grazing-sheep-wool`,new wt(1,1),Wt.white,Bm.sheep),l=s(`grazing-sheep-heads`,qm(),Wt.roofBlue,Bm.sheep),u=s(`grazing-sheep-feet`,new re(.055,.18,.055),Wt.metal,Bm.sheep*4),d=s(`local-swallow-bodies`,new wt(1,0).scale(.07,.065,.21),Wt.roofBlue,Bm.flocks*3,!1),f=Ht(Wt.roofBlue.clone());f.side=2,a.push(f);let m=s(`local-swallow-wings`,Jm(),f,Bm.flocks*6,!1),h=Ht(Wt.white.clone());h.side=2,a.push(h);let g=s(`meadow-butterflies`,new _e(.19,.25).rotateX(-Math.PI/2).translate(.09,0,0),h,Bm.butterflies*2,!1),_=new v({transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,uniforms:{night:{value:0}},vertexShader:`varying vec2 vUv; varying vec3 vTint;
      void main(){
        vUv=uv; vTint=instanceColor;
        mat4 transform=modelViewMatrix*instanceMatrix;
        vec4 center=transform*vec4(0.,0.,0.,1.);
        center.xy+=position.xy*length(transform[0].xyz);
        gl_Position=projectionMatrix*center;
      }`,fragmentShader:`uniform float night; varying vec2 vUv; varying vec3 vTint;
      void main(){
        float r=length(vUv-.5)*2.;
        float halo=pow(max(0.,1.-r),2.4);
        float core=1.-smoothstep(.08,.24,r);
        gl_FragColor=vec4(vTint*(.5+core),night*(halo*.42+core*.58));
      }`});a.push(_);let b=s(`woodland-fireflies`,new _e(1,1),_,Bm.fireflies,!1);for(let e=0;e<Bm.fireflies;e++)b.setColorAt(e,X.gold.clone().lerp(X.white,e%3*.12));for(let e=0;e<Bm.butterflies*2;e++)g.setColorAt(e,[X.gold,X.leafPink,X.lavender][Math.floor(e/2)%3]);let x=new ie,S=new ie,C=new ie,w=new y,T=new J,E=new J,D={},O=new J(1,0,0),ee=new J(0,0,1),k=new J,A=new J(1/0,0,0),te={sheep:[],flocks:[],insects:[]},ne=null,j=-1,M=NaN,N=null,P={sheep:0,birds:0,butterflies:0,fireflies:0,instances:0,selections:0,updates:0,drawCalls:i.length};function ae(e,t,r,i,a,s=!1){jt(n,e.x,e.z,t,r,D),s&&(a=Me(n,D.x,D.z,a)),o?St(n,D.x,i,D.z,a,x):x.makeRotationY(a).setPosition(D.x,i,D.z)}function F(e,t,n,r,i,a=1,o=1,s=1,c=0,l=O){T.set(n,r,i),E.set(a,o,s),w.setFromAxisAngle(l,c),S.compose(T,w,E),C.multiplyMatrices(x,S),e.setMatrixAt(t,C)}function oe(e,{focus:t={x:0,z:0},placements:a=[],revision:s=0,detailBlend:f=1,reducedMotion:h=!1,night:v=0}={}){if(r.visible=f>.001,!r.visible)return;h?(N===null&&(N=e),e=N):N=null,o?ue(n,t.x,0,t.z,k):k.set(t.x,0,t.z);let y=a!==ne||s!==j||k.distanceToSquared(A)>36;if(y&&(te=Km(n,a,t),ne=a,j=s,A.copy(k),P.selections++),v=p.clamp(v,0,1),_.uniforms.night.value=v,b.visible=v>.01,g.visible=v<.9,!y&&e===M)return;M=e;let x=0,S=0,C=0,w=0;for(let{item:t,phase:n}of te.sheep){let r=Math.max(0,Math.sin(e*.31+n)-.55)/.45,i=Math.sin(e*5.5+n)*r;ae(t,Math.sin(e*.24+n)*.1,Math.cos(e*.19+n)*.1,(t.y??0)+.008,(t.rotation??0)+Math.sin(e*.1+n)*.22),F(c,x,0,.31+Math.abs(i)*.012,-.035,.23,.22,.3);let a=(1-r)*(.45+Math.sin(e*.8+n)*.13);F(l,x,0,.34-a*.12,.245,1,1,1,a);for(let e=0;e<4;e++)F(u,x*4+e,e%2?.12:-.12,.1,e<2?-.16:.16,1,1,1,i*(e===0||e===3?.18:-.18));x++}for(let{item:t,phase:n}of te.flocks)for(let r=0;r<3;r++){let i=e*.18+n+r*.13,a=2.5+r*.48;ae(t,Math.sin(i)*a,Math.cos(i)*a,(t.y??0)+11+Math.sin(i*.8)*.5+r*.22,Math.PI/2+i,!0),F(d,S,0,0,0);let o=Math.sin(e*6.2+n+r*.7)*.43;F(m,S*2,0,0,0,1,1,1,o,ee),F(m,S*2+1,0,0,0,1,1,1,Math.PI-o,ee),S++}for(let{item:t,phase:n}of te.insects){let r=t.kind===`farmPatch`||t.kind===`plaza`;if(r&&C<Bm.butterflies){let r=e*.36+n;ae(t,Math.sin(r)*.7,Math.cos(r*1.3)*.6,(t.y??0)+2+Math.sin(e*1.2+n)*.22,r,!0);let i=.35+Math.sin(e*14+n)*.65;F(g,C*2,0,0,0,1,1,1,i,ee),F(g,C*2+1,0,0,0,1,1,1,Math.PI-i,ee),C++}for(let i=0;i<3;i++){let a=e*.21+n+i*Um/3,o=.5+.5*Math.sin(e*1.15+n+i*1.7);ae(t,Math.cos(a)*.55,Math.sin(a*1.3)*.55,(t.y??0)+(r?2.1:3.9)+Math.sin(a*2)*.18,0);let s=.24+o*.22;F(b,w++,0,0,0,s,s,s)}}c.count=l.count=x,u.count=x*4,d.count=S,m.count=S*2,g.count=C*2,b.count=w;for(let e of i)e.count&&(e.instanceMatrix.needsUpdate=!0);Object.assign(P,{sheep:x,birds:S,butterflies:C,fireflies:w,instances:x+S+C+w,updates:P.updates+1})}function I(){for(let e of i)e.geometry.dispose(),e.dispose();for(let e of a)e.dispose();r.removeFromParent()}return{root:r,stats:P,update:oe,dispose:I}}function Xm(e,t){let n=Ym(e,t),r=t.cities?.length<=32?Zm(n.root,t):null,i=NaN,a=null;return{...n,update(e,t={}){n.update(e,t),r&&n.root.visible&&(t.reducedMotion?(a===null&&(a=e),e=a):a=null,e!==i&&(r.update(e),i=e))},dispose(){if(r){let e=new Set;r.root.traverse(t=>{t.geometry&&e.add(t.geometry)}),e.forEach(e=>e.dispose())}n.dispose()}}}function Zm(t,n){let r=Ap(t),i=Ac(`${n.seed}-life`),a=new le;r.name=`ambience`;let o=!!G(n),c=new ie,l=new ie,u=e=>{o&&(e.matrixAutoUpdate=!1,St(n,e.position.x,e.position.y,e.position.z,e.rotation.y,e.matrix),c.makeRotationFromQuaternion(e.quaternion).premultiply(l.makeRotationY(-e.rotation.y)).scale(e.scale),e.matrix.multiply(c),e.matrixWorldNeedsUpdate=!0)},d=new Ve(new re(1,.015,.055),Wt.foam,64);d.name=`river-ripples`,d.instanceMatrix.setUsage(e),d.frustumCulled=!1,r.add(d);let f=Array.from({length:n.river.length>0?64:0},()=>({s:i()*n.river.length,offset:(i()-.5)*Math.max(0,n.river.width-1.3),length:.3+i()*.7}));d.count=f.length;let p=Ap(r);p.name=`river-boat`,Op(p,0,.14,0,.44,.24,1.08,`roofDark`),Ep(p,0,.24,0,.68,.12,1.55,`trim`),Ep(p,0,.47,-.2,.49,.39,.6,`white`),Ep(p,0,.51,.108,.36,.23,.025,`window`),Ep(p,0,.7,-.2,.63,.08,.76,`roofBlue`);for(let e of[-1,1])kp(p,wp(e*.22,.045,-.9),wp(e*.6,.045,-2),.045,`foam`);jp(p);let h=[];if(n.river.length>0)for(let e=0;e<=n.river.length;e+=.5){let t=Qc(n.river,e);qc(n,t.x,t.z,2.5)&&h.push(e)}let g=h[0]??0,_=h.at(-1)??0,v=Ap(r);v.name=`ocean-ripples`;let y=null,b=null,x=2.2;if(n.biomes?.ocean.length){for(let e=0;e<420;e++){let t=(i()-.5)*n.bounds.width,r=(i()-.5)*n.bounds.depth,a=$o(n,`ocean`,t,r);if(a>x&&(x=a,b={x:t,z:r}),e%3==0&&es(n,[`ocean`],t,r,1.1)){let e=Ep(v,t,n.river.y+.055,r,.6+i()*1.1,.015,.055,`foam`,.15);e.castShadow=!1}}if(b){y=Ap(r,b.x,n.river.y+.035,b.z,-.6),y.name=`sailboat`,Op(y,0,.17,0,.43,.23,1.13,`white`),Dp(y,0,1.36,0,.035,.04,2.55,`timber`,6);let e=new m().setFromPoints([wp(.03,2.6,0),wp(.03,.48,0),wp(.03,.48,.91)]);e.setIndex([0,1,2,2,1,0]),e.computeVertexNormals(),Tp(y,e,`trim`);let t=new m().setFromPoints([wp(.04,2.12,-.06),wp(.04,.48,-.06),wp(.04,.48,-.81)]);t.setIndex([0,1,2,2,1,0]),t.computeVertexNormals(),Tp(y,t,`gold`),jp(y)}jp(v),o&&v.traverse(e=>{e.isMesh&&fe(e.geometry,n)})}let S=-n.bounds.width*.33,C=n.bounds.depth*.2,w=Yc(n,S,C)+14,T=Ap(r,S,w,C);T.name=`balloon`;let E=[[0,-2],[.55,-1.65],[1.4,-.65],[1.75,.5],[1.5,1.6],[.8,2.25],[0,2.5]].map(([e,t])=>new W(e,t));for(let e=0;e<10;e++)Tp(T,new st(E,1,e/10*Math.PI*2,Math.PI*2/10),e%2?`trim`:`redLight`);Ep(T,0,-2.9,0,.72,.55,.64,`timber`),Ep(T,0,-2.62,0,.8,.1,.72,`gold`);for(let e of[-.3,.3])for(let t of[-.25,.25])kp(T,wp(e,-2.65,t),wp(e,-1.65,t),.035,`timber`);jp(T);let D=[];for(let e=0;e<5;e++){let t=Ap(r),n=Ap(t),i=Ap(t);t.name=`bird-${e+1}`,kp(n,wp(0,0,0),wp(-.48,.1,.17),.065,`white`),kp(i,wp(0,0,0),wp(.48,.1,.17),.065,`white`),Op(t,0,0,0,.07,.07,.19,`white`),jp(n),jp(i),D.push({g:t,left:n,right:i})}let O=Math.max(10,...n.mountains.map(e=>e.height+3));return u(p),y&&u(y),u(T),D.forEach(({g:e})=>u(e)),{root:r,update(e){f.forEach((t,r)=>{let i=Qc(n.river,(t.s+e*.18)%n.river.length),c=i.tangent.z,l=-i.tangent.x,u=i.x+c*t.offset,f=i.z+l*t.offset;a.position.set(u,n.river.y+.05,f),a.rotation.set(0,i.angle+Math.PI/2,0),a.scale.set(qc(n,u,f,.65)?t.length*Math.min(1,n.river.width):0,1,Math.min(1,n.river.width/.15)),o?s(n,u,a.position.y,f,a.rotation.y,a.matrix).scale(a.scale):a.updateMatrix(),d.setMatrixAt(r,a.matrix)}),d.instanceMatrix.needsUpdate=!0;let t=.5-Math.cos(e*.025)*.46;if(p.visible=!1,n.river.length>0){let r=Qc(n.river,g+(_-g)*t);p.position.set(r.x,n.river.y+.035,r.z),p.rotation.y=r.angle+(Math.sin(e*.025)<0?Math.PI:0),p.visible=n.river.width>=1.6&&qc(n,r.x,r.z,2.2),u(p)}y&&(y.position.y=n.river.y+.035+Math.sin(e*.8)*.025,y.rotation.z=Math.sin(e*.7)*.025,u(y)),T.position.y=w+Math.sin(e*.35)*.3,T.rotation.y=Math.sin(e*.07)*.12,u(T),D.forEach(({g:t,left:n,right:r},i)=>{let a=e*.045+i*.09;t.position.set(Math.cos(a)*13+i*.65,O+i*.25,Math.sin(a)*7-i*.75),t.rotation.y=-a,n.rotation.z=Math.sin(e*4.5+i*.7)*.35,r.rotation.z=-n.rotation.z,u(t)})}}}function Qm(e){let t=e.surface.radius,n=new yt,r=new yt,a=[];n.name=r.name=`earth-ocean`;let o;for(let[s,c]of[[r,-.65],[n,-4.5]]){let r=new Se(t+c,256,128);if(r.translate(0,-t,0),!o){let t=r.attributes.position,n=new J,i={},a=new Y;o=new Float32Array(t.count*3);for(let r=0;r<t.count;r++)n.fromBufferAttribute(t,r),ft(e,n,i),cu(e,i.x,i.z,a),a.toArray(o,r*3)}r.setAttribute(`color`,new P(o,3));let l=Ht(fu(new i({color:16777215,vertexColors:!0,toneMapped:s===n}),t),{kind:`water`});a.push(r,l),s.add(new K(r,l))}let s=new Se(t+12,128,64);s.translate(0,-t,0);let c=new v({name:`earth-atmosphere`,uniforms:{worldNight:Bt.night},side:1,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,toneMapped:!1,vertexShader:`varying vec3 rimNormal;
      void main(){
        vec4 viewPosition=modelViewMatrix*vec4(position,1.0);
        rimNormal=normalMatrix*normal;
        gl_Position=projectionMatrix*viewPosition;
      }`,fragmentShader:`uniform float worldNight; varying vec3 rimNormal;
      void main(){
        float tangent=1.0-abs(normalize(rimNormal).z);
        float rim=pow(tangent,3.0);
        vec3 tint=mix(vec3(0.24,0.64,0.71),vec3(0.055,0.19,0.39),worldNight);
        gl_FragColor=vec4(tint,rim*mix(0.27,0.42,worldNight));
        #include <colorspace_fragment>
      }`}),l=new K(s,c);l.name=`earth-atmosphere`,l.castShadow=!1,l.receiveShadow=!1,r.add(l),a.push(s,c);let u=!1;return{detail:n,map:r,dispose(){u||(u=!0,n.removeFromParent(),r.removeFromParent(),a.forEach(e=>e.dispose()))}}}function $m(e){if(!G(e))return null;if(e.surface.complete)return Qm(e);let t=e.outline,n=[],r=[],a=new yt,o=new yt;a.name=o.name=`curved-earth-section`;let s=X.ocean.clone().lerp(X.rockDark,.48).multiplyScalar(.72),c=X.ocean.clone().multiplyScalar(.76),l=new J;function u(r){let i=[],a=[];for(let n=0;n<t.length;n++){let o=t[n],u=t[(n+1)%t.length],d=Math.max(1,Math.ceil(Math.hypot(u[0]-o[0],u[1]-o[1])/8));for(let t=0;t<d;t++){let n=[t/d,(t+1)/d].map(e=>[o[0]+(u[0]-o[0])*e,o[1]+(u[1]-o[1])*e]),f=[[...n[0],r],[...n[1],r],[...n[0],-32],[...n[1],-32]];for(let t of[0,2,1,1,2,3]){let[n,r,o]=f[t];ue(e,n,o,r,l),i.push(l.x,l.y,l.z);let u=t<2?c:s;a.push(u.r,u.g,u.b)}}}let o=new m;return o.setAttribute(`position`,new ut(i,3)),o.setAttribute(`color`,new ut(a,3)),o.computeVertexNormals(),n.push(o),o}let d=new D(t.map(([e,t])=>new W(e,-t))),f=new mt(d);f.rotateX(-Math.PI/2),f.translate(0,-32,0);let p=Fl(f,64);f.dispose(),fe(p,e),n.push(p);for(let[e,t]of[[a,-3.4],[o,0]]){let n=new i({vertexColors:!0,side:2,toneMapped:e===a}),o=new i({color:s,side:2,toneMapped:e===a});r.push(n,o),e.add(new K(u(t),n),new K(p,o))}let h=!1;return{detail:a,map:o,dispose(){h||(h=!0,a.removeFromParent(),o.removeFromParent(),n.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()))}}}function eh(e,t){let n=new Float32Array(1260),r=new Float32Array(420),i=71139,a=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);for(let e=0;e<r.length;e++)n[e*3]=a()*2-1,n[e*3+1]=a()*2-1,n[e*3+2]=a(),r[e]=a()>.94?3:1+a()*1.2;let o=new m;o.setAttribute(`position`,new P(n,3)),o.setAttribute(`starSize`,new P(r,1));let s=new v({transparent:!1,depthWrite:!1,depthTest:!1,toneMapped:!1,uniforms:{worldNight:Bt.night,worldTime:Bt.time,skyColor:{value:e.background}},vertexShader:`attribute float starSize; varying float seed; void main(){seed=position.z;gl_Position=vec4(position.xy,0.999,1.0);gl_PointSize=starSize;}`,fragmentShader:`uniform float worldNight;uniform float worldTime;uniform vec3 skyColor;varying float seed;
      void main(){float glow=1.0-smoothstep(0.12,0.5,length(gl_PointCoord-0.5));
      if(glow<0.01)discard;
      float twinkle=0.82+0.18*sin(worldTime*0.4+seed*37.0);
      vec3 star=mix(vec3(0.55,0.74,1.0),vec3(1.0,0.83,0.56),seed);
      gl_FragColor=vec4(mix(skyColor,star,glow*worldNight*twinkle*0.76),1.0);
      #include <colorspace_fragment>
      }`}),c=[e,t].map(e=>{let t=new z(o,s);return t.name=`night-stars`,t.frustumCulled=!1,t.renderOrder=-1e3,t.visible=!1,e.add(t),t});return{update(){for(let e of c)e.visible=Bt.night.value>.005},dispose(){c.forEach(e=>e.removeFromParent()),o.dispose(),s.dispose()}}}var th=`modulepreload`,nh=function(e,t){return new URL(e,t).href},rh={},ih=function(e){return e.pathname.endsWith(`.css`)},ah=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},oh=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=nh(t,n);let r=s(t),i=ih(r);return ah(rh,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:th,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},sh=document.querySelector(`#world`),ch=new R,lh=new R;ch.background=lh.background=X.backdrop;var uh=new ra({canvas:sh,antialias:!0,powerPreference:`high-performance`});uh.setPixelRatio(Math.min(devicePixelRatio,1.6)),uh.shadowMap.enabled=!0,uh.shadowMap.type=2,uh.toneMapping=4,uh.toneMappingExposure=1.15,uh.outputColorSpace=x,uh.info.autoReset=!1;var dh=new Lt(-60,60,45,-45,.1,500);dh.position.set(115,125,145),dh.lookAt(0,1,0);var fh=new it(zt(.94,.035,221),zt(.55,.025,169),2.15);ch.add(fh);var ph=new oe(zt(.98,.04,84),3.25);ph.position.set(-65,110,65),ph.castShadow=!0,ph.shadow.mapSize.set(2048,2048),Object.assign(ph.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260}),ph.shadow.normalBias=.025,ph.shadow.bias=-15e-5,ph.shadow.radius=3,ch.add(ph,ph.target);var mh=new oe(zt(.85,.035,218),.65);mh.position.set(40,30,-40),ch.add(mh,mh.target);var hh=new K(new _e(2e3,2e3),new j({color:X.backdrop,roughness:1}));hh.rotation.x=-Math.PI/2,hh.position.y=-5.7,hh.receiveShadow=!0,ch.add(hh);var gh,_h,vh,yh=[],bh,xh,Sh,Ch,wh,Th,Eh,Dh,Oh=0,kh=!1,Ah=null,jh=0,Mh=0,Nh=0,Ph=matchMedia(`(prefers-reduced-motion: reduce)`),Fh=Kt({scene:ch,mapScene:lh,sky:fh,sun:ph,fill:mh,renderer:uh,reducedMotion:Ph,initialNight:new URLSearchParams(location.search).get(`time`)===`night`}),Ih=eh(ch,lh),Lh=Ph.matches;Ph.addEventListener(`change`,e=>{Lh=e.matches});var Rh=Qa(uh),zh=zm(uh),Bh=Ya({canvas:sh,camera:dh,scene:ch,mapScene:lh,reducedMotion:Ph,getTrains:()=>yh,getWorldRoot:()=>_h,getWorld:()=>gh,isDetailReady:()=>!!vh?.ready&&kh,onPause:()=>{Lh=!Lh},onRegenerate:()=>{if(!gh)return;let e=String(Number.isFinite(Number(gh.seed))?Number(gh.seed)+1:Date.now());eg({...Sh,seed:e}).catch($h);let t=new URL(location.href);t.searchParams.set(`seed`,e),history.replaceState(null,``,t)}}),{navigation:Vh,controls:Hh}=Bh,Uh=170,Wh=112,Gh=0,Kh=new J(115,125,145).normalize(),qh=new J(-72,94,54),Jh=new ie,Yh=new J;sh.addEventListener(`keydown`,e=>{e.key.toLowerCase()!==`n`||e.repeat||e.ctrlKey||e.metaKey||e.altKey||(e.preventDefault(),Fh.toggle())});function Xh(){xh&&=(xh.dispose(),null)}function Zh(){if(Bh.reset(),gh.surface?.complete){let e=gh.surface.radius,t=Fe(gh,gh.camera?.longitude??10,gh.camera?.latitude??25);hh.visible=!1,Uh=Wh=e*2.2,Bh.setScale(Wh/230),Hh.target.set(t.x,1.3,t.z);let n=new J().setFromSphericalCoords(1,Math.PI/4,0);Vh.position.copy(Hh.target).addScaledVector(n,e*3),Vh.zoom=1,Vh.far=e*8,Hh.update(),tg(),Bh.setHome();return}let e=gh.outline.map(e=>e[0]),t=gh.outline.map(e=>e[1]),n=Math.max(...e)-Math.min(...e),r=Math.max(...t)-Math.min(...t),i=Math.hypot(n,r),a=Math.max(0,...gh.mountains.map(e=>e.height));hh.visible=!G(gh),Bh.setScale(Math.max(1,i/410)),Hh.target.set((Math.max(...e)+Math.min(...e))/2,1.3,(Math.max(...t)+Math.min(...t))/2);let o=gh.camera?.northUp?new J(0,125,180).normalize():Kh;Vh.position.copy(Hh.target).addScaledVector(o,i*1.5+a),Vh.zoom=1,Vh.far=Math.max(500,i*5+a*3),Hh.update(),hh.position.x=Hh.target.x,hh.position.z=Hh.target.z,hh.scale.setScalar(Math.max(1,i/500));let s=Vh.quaternion.clone().invert(),c=gh.outline.flatMap(([e,t])=>[new J(e,-3.4,t),new J(e,4,t)]);gh.mountains.forEach(e=>c.push(new J(e.x,e.height,e.z)));let l=0,u=0;if(c.forEach(e=>{e.sub(Hh.target).applyQuaternion(s),l=Math.max(l,Math.abs(e.x)),u=Math.max(u,Math.abs(e.y))}),Bh.zoomScale>1){let e=Vh.clone(),t=new J().subVectors(Vh.position,Hh.target),n=new Ee().setFromVector3(t);n.phi=1e-5,e.position.copy(Hh.target).add(t.setFromSpherical(n)),e.lookAt(Hh.target);let r=e.quaternion.clone().invert();for(let[e,t]of gh.outline){let n=new J(e,0,t).sub(Hh.target).applyQuaternion(r);l=Math.max(l,Math.abs(n.x)),u=Math.max(u,Math.abs(n.y))}}Uh=l*2+Math.max(10,l*.2),Wh=u*2+Math.max(10,u*.2),Bh.setScale(Math.max(Bh.zoomScale,Wh/230)),tg(),Bh.setHome()}function Qh(){let e=Math.max((dh.right-dh.left)/dh.zoom,(dh.top-dh.bottom)/dh.zoom),t=Math.min(480,Math.max(45,e*.72)),n=t*2/2048,r=Math.round(Bh.renderTarget.x/n)*n,i=Math.round(Bh.renderTarget.z/n)*n;G(gh)?(ue(gh,r,0,i,ph.target.position),De(gh,r,i,Jh),fh.position.set(0,1,0).applyMatrix4(Jh),Yh.copy(qh).applyMatrix4(Jh),ph.position.copy(ph.target.position).addScaledVector(Yh,Math.max(1,t/95)),mh.position.set(40,30,-40).applyMatrix4(Jh).add(ph.target.position),mh.target.position.copy(ph.target.position)):(fh.position.set(0,1,0),ph.target.position.set(r,0,i),ph.position.copy(ph.target.position).addScaledVector(qh,Math.max(1,t/95)),mh.position.set(40,30,-40),mh.target.position.set(0,0,0));let a=ph.shadow.camera;Math.abs(a.right-t)>.1&&(Object.assign(a,{left:-t,right:t,top:t,bottom:-t,far:Math.max(260,t*4)}),a.updateProjectionMatrix())}function $h(e){e.name!==`AbortError`&&(sh.dataset.error=e.message,console.error(e))}async function eg(e={}){let t=++Oh,n=structuredClone(e);Nh=performance.now(),sh.dataset.loading=`true`,delete sh.dataset.error,Dh?.dispose();let r=Rm();Dh=r;let i,a,o,s,c,l;try{let e=await r.request(`generate`,n);if(t!==Oh)throw new DOMException(`World replaced`,`AbortError`);let u=e.world;return l=new yt,i=vu(new yt,u),c=Im(l,i.root.getObjectByName(`map-static`),u),s=$m(u),s&&(l.add(s.detail),i.root.add(s.map)),a=Mm(l,u),o=Nm(l,u,{maxPending:3,requestChunk:(e,t)=>r.request(`chunk`,e,t),uploadMesh:e=>zh.upload(e)}),Xh(),Th?.dispose(),wh?.dispose(),vh?.dispose(),bh?.dispose(),_h?.removeFromParent(),Ch?.dispose(),Eh?.dispose(),Eh=r,Dh=null,gh=u,_h=l,bh=a,yh=bh.trains,vh=o,Ch=i,wh=s,Th=c,lh.add(Ch.root),ch.add(l),Sh=n,Gh=0,kh=!1,Ah=null,jh=e.milliseconds,Zh(),sh.dataset.cities=String(gh.cities.length),sh.dataset.trains=String(yh.length),sh.dataset.surface=G(gh)?`sphere`:`plane`,document.activeElement===document.body&&sh.focus({preventScroll:!0}),sh.dataset.loading=`false`,Mh=performance.now()-Nh,vg(),gh}catch(e){throw t===Oh&&(sh.dataset.loading=`false`,Dh=null),c?.dispose(),s?.dispose(),o?.dispose(),a?.dispose(),i?.dispose(),l?.removeFromParent(),r.dispose(),e}}function tg(){let e=innerWidth,t=innerHeight,n=e/t,r=Math.max(Wh,Uh/n);Vh.left=-r*n/2,Vh.right=r*n/2,Vh.top=r/2,Vh.bottom=-r/2,Vh.updateProjectionMatrix(),uh.setSize(e,t),Rh.resize(Math.round(e*uh.getPixelRatio()),Math.round(t*uh.getPixelRatio()))}window.addEventListener(`resize`,tg),tg();var ng=new Float32Array(180),rg=new Float32Array(180),ig=0,ag=0,og=0,sg=0,cg=performance.now(),lg,ug=0,dg=0,fg=0,pg=``,mg=0,hg=0,gg=0,_g=0;function vg(){ig=ag=0,ug=dg=fg=0,pg=``,og=performance.now()}function yg(e,t,n){if(ng[ag]=t,rg[ag]=n,ag=(ag+1)%ng.length,ig=Math.min(ig+1,ng.length),Bh.blend>.001&&Bh.blend<.999&&(n>ug&&(pg=JSON.stringify({traffic:mg,detail:hg,view:gg,render:_g,blend:Bh.blend})),fg++,ug=Math.max(ug,n),dg=Math.max(dg,t)),e-og<1e3)return;og=e;let r=e=>[...e.subarray(0,ig)].sort((e,t)=>e-t)[Math.floor((ig-1)*.95)]??0,i=yh.reduce((e,t)=>e+ +!!t.state.active,0);Object.assign(sh.dataset,{frameP95:r(ng).toFixed(2),cpuP95:r(rg).toFixed(2),drawCalls:String(uh.info.render.calls),triangles:String(uh.info.render.triangles),geometries:String(uh.info.memory.geometries),activeTrains:String(i),mapNetworkVisibility:Ch.stats.networkVisibility.toFixed(3),visibleTrains:String(bh.stats?.visibleTrains??0),detailChunks:String(vh.stats?.chunks??vh.stats?.loadedChunks??0),detailReady:String(vh.ready),detailSettled:String(vh.settled),detailRevealing:String(vh.stats.revealingChunks),detailBase:String(Th.root.visible),detailRequired:String(vh.stats.requiredChunks??0),detailPending:String(vh.stats.pendingChunks??0),detailWorkers:String(Eh.stats.workers),detailWorkerMs:String(Math.round(Eh.stats.lastChunkMs)),detailBytes:String(vh.stats.bytes??0),detailLimited:String(vh.stats.coverageLimited??!1),detailErrors:String(vh.stats.errors??0),transitionCpuMax:ug.toFixed(2),transitionFrameMax:dg.toFixed(2),transitionFrames:String(fg),transitionPeak:pg,trafficCpu:mg.toFixed(2),detailCpu:hg.toFixed(2),viewCpu:gg.toFixed(2),renderCpu:_g.toFixed(2),simulationSeconds:Gh.toFixed(1),simulationCpu:(bh.stats.simulationMs??0).toFixed(2),poseCpu:(bh.stats.poseMs??0).toFixed(2),generationMs:jh.toFixed(0),loadMs:Mh.toFixed(0),night:Fh.night.toFixed(3),lifeInstances:String(xh?.stats?.instances??xh?.stats?.active??0)})}function bg(e){let t=performance.now(),n=e-cg,r=p.clamp(n/1e3,0,.05);if(cg=e,gh){Lh||(Gh+=r),Fh.update(r,Gh),Ih.update();let i=performance.now();if(bh.update(Lh?0:r),mg=performance.now()-i,i=performance.now(),Bh.updateNavigation(r),vh.update(dh,{mapBlend:+!Bh.wantsDetail,target:Hh.target,budgetMs:2,coverageCameras:Bh.coverageCameras,retainVisible:Bh.blend<1}),!kh&&!Ah){let e=Oh;uh.shadowMap.enabled=!0,xh||=Xm(_h,gh),Ah=Rh.prepare(ch,lh,dh).then(()=>{e===Oh&&(kh=!0)}).catch(t=>{e===Oh&&(Ah=null,$h(t))})}hg=performance.now()-i,i=performance.now(),Bh.updatePresentation(r),vh.updateVisibility(dh,{dt:r,reveal:kh&&Bh.blend<.999,reducedMotion:Ph.matches}),Th.root.visible=!vh.settled,bh.updateView(dh,{mapBlend:Bh.blend,focus:Bh.renderTarget}),Bh.blend<.999&&(Qh(),xh||=Xm(_h,gh),xh.update(Gh,{focus:Bh.renderTarget,placements:vh.lifePlacements,revision:vh.lifeRevision,detailBlend:1-Bh.blend,reducedMotion:Ph.matches,night:Bt.night.value})),xh&&(xh.root.visible=Bh.blend<.999),Ch.update(yh,{visible:Bh.blend>.001,camera:dh,viewportHeight:innerHeight,poseBuffer:bh.poseBuffer,dt:r,reducedMotion:Ph.matches}),gg=performance.now()-i,i=performance.now(),uh.info.reset(),uh.shadowMap.enabled=Bh.blend<.999,Rh.render(ch,lh,dh,Bh.blend),_g=performance.now()-i,yg(e,n,performance.now()-t),sg++,document.documentElement.dataset.ready=`true`}else uh.render(lh,dh);lg=requestAnimationFrame(bg)}document.addEventListener(`visibilitychange`,()=>{document.hidden?cancelAnimationFrame(lg):(cg=performance.now(),vg(),lg=requestAnimationFrame(bg))}),lg=requestAnimationFrame(bg),window.__railway={get ready(){return sg>0},get time(){return Gh},get paused(){return Lh},get trains(){return yh.map(e=>({id:e.state.id,ownerId:e.state.ownerId,homeCityId:e.state.homeCityId,x:e.parts[0].position.x,y:e.parts[0].position.y,z:e.parts[0].position.z,cars:e.parts.length}))},get render(){return{...uh.info.render,geometries:uh.info.memory.geometries,...bh?.stats,...vh?.stats}},get camera(){return{zoom:dh.zoom,width:innerWidth,height:innerHeight,mode:Bh.mode,mapBlend:Bh.blend,following:Bh.selected}}},window.railway=Object.freeze({setNight:e=>Fh.setNight(e),loadWorld:e=>eg(e).then(e=>structuredClone(e)),exportWorld:()=>structuredClone(Sh),inspectWorld:()=>structuredClone(gh),generateWorld:_l,validateWorld:vl,createStressWorld:Lm});var xg=new URLSearchParams(location.search),Sg=xg.get(`layout`)??(xg.has(`cities`)?`classic`:`earth`);try{let e;if(Sg===`stress`)e=Lm({cities:xg.has(`cities`)?Number(xg.get(`cities`)):256,trains:xg.has(`trains`)?Number(xg.get(`trains`)):2048,seed:xg.get(`seed`)??`continental-railway`});else if(Sg===`earth`){let{createEarthWorld:t}=await oh(async()=>{let{createEarthWorld:e}=await import(`./earth-world-D_Ee-Icu.js`);return{createEarthWorld:e}},__vite__mapDeps([0,1,2,3]),import.meta.url);e=t({...xg.has(`seed`)?{seed:xg.get(`seed`)}:{},...xg.has(`trains`)?{trainCount:Number(xg.get(`trains`))}:{}})}else if(Sg===`europe`){let{createEuropeWorld:t}=await oh(async()=>{let{createEuropeWorld:e}=await import(`./europe-world-D7-Mqaey.js`);return{createEuropeWorld:e}},__vite__mapDeps([4,2,1]),import.meta.url);e=t({...xg.has(`seed`)?{seed:xg.get(`seed`)}:{},...xg.has(`trains`)?{trainCount:Number(xg.get(`trains`))}:{}})}else if([`crossroads`,`showcase`].includes(Sg)){let t=await fetch(new URL(`./worlds/${Sg}.json`,location.href));if(!t.ok)throw Error(`Could not load the authored world`);e=await t.json(),xg.has(`seed`)&&(e.seed=xg.get(`seed`))}else e={seed:xg.get(`seed`)??27,cityCount:Number(xg.get(`cities`))||8};await eg(e)}catch(e){$h(e)}