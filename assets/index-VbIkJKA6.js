const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./settlement-world-CF3D5D1E.js","./island-world-Dde8mhON.js","./mountain-ranges-D2Gd-pVF.js","./island-world-C45IKnLH.js","./earth-world-DeiZlJb0.js","./europe-ranges-DzeqEgDX.js","./globe-land-colors-BC6U0Ptc.js","./world-surface-IQjfLoK9.js","./europe-world-BdLdVzgu.js"])))=>i.map(i=>d[i]);
import{$ as e,$n as t,$t as n,An as r,Ar as i,At as a,B as o,Bt as s,C as c,Cr as l,Ct as u,D as d,Dr as f,Dt as p,E as m,Er as h,Et as g,F as _,Fn as v,Ft as y,G as b,Gn as x,Gt as S,H as C,Ht as w,I as T,In as E,It as D,J as O,Jn as k,Jt as A,K as j,Kn as M,Kt as N,L as P,Ln as F,Lt as I,M as ee,Mn as L,Mt as R,N as z,Nn as te,Nt as ne,O as B,Or as re,Ot as V,P as H,Pt as ie,Q as ae,Qn as oe,Qt as se,R as U,Rn as ce,Rt as le,Sr as ue,St as de,T as fe,Tr as W,Tt as pe,U as me,Un as he,Ut as ge,V as _e,Vt as ve,W as ye,Wn as be,Wt as xe,X as Se,Xn as Ce,Y as G,Z as we,Zn as Te,_ as Ee,_r as De,_t as K,a as Oe,ar as ke,at as q,br as Ae,bt as J,c as je,ct as Me,d as Ne,dr as Pe,er as Fe,et as Ie,f as Le,fr as Re,ft as ze,g as Be,gr as Ve,gt as He,h as Ue,hr as We,ht as Ge,i as Ke,ir as qe,j as Je,jn as Ye,jt as Xe,k as Ze,kn as Qe,kr as $e,kt as Y,l as et,lr as tt,lt as nt,m as rt,mr as X,mt as it,n as at,nr as ot,nt as st,o as ct,ot as lt,p as ut,pr as dt,pt as ft,q as pt,qn as mt,r as ht,rr as gt,rt as _t,s as vt,sr as yt,st as bt,tr as xt,tt as St,u as Ct,ur as wt,ut as Tt,v as Et,vr as Dt,vt as Ot,w as kt,wr as At,wt as jt,xr as Mt,xt as Nt,y as Pt,yr as Ft,yt as It,z as Lt,zt as Rt}from"./world-surface-IQjfLoK9.js";import{a as zt,c as Bt,d as Vt,i as Ht,l as Ut,o as Z,r as Wt,s as Gt,t as Kt,u as qt}from"./globe-land-colors-BC6U0Ptc.js";import{a as Jt,c as Yt,i as Xt,n as Zt,o as Qt,r as $t,s as en}from"./mountain-ranges-D2Gd-pVF.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function tn(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function nn(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var rn={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Q={common:{diffuse:{value:new H(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new p},alphaMap:{value:null},alphaMapTransform:{value:new p},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new p}},envmap:{envMap:{value:null},envMapRotation:{value:new p},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new p}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new p}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new p},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new p},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new p},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new p}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new p}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new p}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new H(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new H(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new p},alphaTest:{value:0},uvTransform:{value:new p}},sprite:{diffuse:{value:new H(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new p},alphaMap:{value:null},alphaMapTransform:{value:new p},alphaTest:{value:0}}},an={basic:{uniforms:f([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:rn.meshbasic_vert,fragmentShader:rn.meshbasic_frag},lambert:{uniforms:f([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new H(0)},envMapIntensity:{value:1}}]),vertexShader:rn.meshlambert_vert,fragmentShader:rn.meshlambert_frag},phong:{uniforms:f([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new H(0)},specular:{value:new H(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rn.meshphong_vert,fragmentShader:rn.meshphong_frag},standard:{uniforms:f([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new H(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rn.meshphysical_vert,fragmentShader:rn.meshphysical_frag},toon:{uniforms:f([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new H(0)}}]),vertexShader:rn.meshtoon_vert,fragmentShader:rn.meshtoon_frag},matcap:{uniforms:f([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:rn.meshmatcap_vert,fragmentShader:rn.meshmatcap_frag},points:{uniforms:f([Q.points,Q.fog]),vertexShader:rn.points_vert,fragmentShader:rn.points_frag},dashed:{uniforms:f([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rn.linedashed_vert,fragmentShader:rn.linedashed_frag},depth:{uniforms:f([Q.common,Q.displacementmap]),vertexShader:rn.depth_vert,fragmentShader:rn.depth_frag},normal:{uniforms:f([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:rn.meshnormal_vert,fragmentShader:rn.meshnormal_frag},sprite:{uniforms:f([Q.sprite,Q.fog]),vertexShader:rn.sprite_vert,fragmentShader:rn.sprite_frag},background:{uniforms:{uvTransform:{value:new p},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rn.background_vert,fragmentShader:rn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new p}},vertexShader:rn.backgroundCube_vert,fragmentShader:rn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rn.cube_vert,fragmentShader:rn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rn.equirect_vert,fragmentShader:rn.equirect_frag},distance:{uniforms:f([Q.common,Q.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rn.distance_vert,fragmentShader:rn.distance_frag},shadow:{uniforms:f([Q.lights,Q.fog,{color:{value:new H(0)},opacity:{value:1}}]),vertexShader:rn.shadow_vert,fragmentShader:rn.shadow_frag}};an.physical={uniforms:f([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new p},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new p},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new p},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new p},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new p},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new p},sheen:{value:0},sheenColor:{value:new H(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new p},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new p},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new p},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new p},attenuationDistance:{value:0},attenuationColor:{value:new H(0)},specularColor:{value:new H(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new p},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new p},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new p}}]),vertexShader:rn.meshphysical_vert,fragmentShader:rn.meshphysical_frag};var on={r:0,b:0,g:0},sn=new V,cn=new p;cn.set(-1,0,0,0,1,0,0,0,1);function ln(e,t,n,r,i,a){let o=new H(0),s=i===!0?0:1,c,l,u=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?v(o,s):i&&i.isColor&&(v(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let i=m(n);i&&i.isCubeTexture?(l===void 0&&(l=new Y(new d(1,1,1),new M({name:`BackgroundCubeMaterial`,uniforms:Ft(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sn.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(cn),l.material.toneMapped=_.getTransfer(i.colorSpace)!==be,(u!==i||f!==i.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,f=i.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Y(new xe(2,2),new M({name:`BackgroundMaterial`,uniforms:Ft(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=_.getTransfer(i.colorSpace)!==be,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||f!==i.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,f=i.version,p=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function v(t,r){t.getRGB(on,W(e)),n.buffers.color.setClear(on.r,on.g,on.b,r,a)}function y(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,v(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,v(o,s)},render:h,addToRenderList:g,dispose:y}}function un(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function dn(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function fn(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&($e(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&$e(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&$e(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function pn(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ge,s=new p,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var mn=class extends De{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Lt(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new d(5,5,5),i=new M({name:`CubemapFromEquirect`,uniforms:Ft(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Y(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=J),new P(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},hn=256,gn=3,_n=20,vn=256,yn=16,bn=3,xn=new X,Sn=new H,Cn=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new P(1,10,null),this._boxMesh=new Y(new d(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=xn}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(Sn));let h=new P(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=An(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kn(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(hn,l(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?hn:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=wn(e,!1,!1),n=Math.log2(e)-gn;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=wn(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=An()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=kn()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=En(),this._integrationMaterial=Dn());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/yn);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-bn)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(vn*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=On());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function wn(e,t,n){return new mn(e,{minFilter:Nt,generateMipmaps:t,type:lt,colorSpace:u,depthBuffer:n})}function Tn(e,t,n){return new M({name:e,uniforms:t,vertexShader:rn.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function En(){return Tn(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${vn}u

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
	`)}function Dn(){return Tn(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:yn}},`

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
	`)}function On(){return Tn(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${_n}
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
	`)}function kn(){return Tn(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

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
	`)}function An(){return Tn(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function jn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new mn(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Cn(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Cn(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Mn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&i(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Nn(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?gt:ot)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Pn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Fn(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:ue(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function In(e,t,n){let r=new WeakMap,i=new We;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new C(h,p,m,u);g.type=Ie,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new dt(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ln(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Rn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function zn(t,n,r,i,a,o){let c=new De(n,r,{type:t,depthBuffer:a,stencilBuffer:o,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,u=null,d=null,f=new Ze;f.setAttribute(`position`,new e([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute(`uv`,new e([0,2,0,0,2,0],2));let p=new Ye({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),m=new Y(f,p),h=new s(-1,1,1,-1,0,1),g=null,v=null,y=!1,x,S=null,C=[],w=!1;this.setSize=function(e,t){c.setSize(e,t),l!==null&&l.setSize(e,t),u!==null&&u.setSize(e,t);for(let n=0;n<C.length;n++){let r=C[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){C=e,w=C.length>0&&C[0].isRenderPass===!0;let t=c.width,n=c.height;C.length>0&&l===null&&(l=new De(t,n,{type:lt,depthBuffer:!1,stencilBuffer:!1}),u=new De(t,n,{type:lt,depthBuffer:!1,stencilBuffer:!1}));let r=a===!0&&C.some(e=>e.needsDepthTexture===!0);r!==(c.depthTexture!==null)&&(r===!0&&d===null&&(d=new j(t,n),o===!0&&(d.format=b,d.type=yt)),c.dispose(),c.depthTexture=r?d:null,c.resolveDepthBuffer=r,c.storeMultisampledDepthBuffer=r);for(let e=0;e<C.length;e++){let i=C[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(d)}},this.begin=function(e,t){if(y||e.toneMapping===0&&C.length===0)return!1;if(S=t,t!==null){let e=t.width,n=t.height;(c.width!==e||c.height!==n)&&this.setSize(e,n)}return w===!1&&e.setRenderTarget(c),x=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return w},this.end=function(e,t){e.toneMapping=x,y=!0;let n=c,r=l;for(let i=0;i<C.length;i++){let a=C[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===l?u:l))}if(g!==e.outputColorSpace||v!==e.toneMapping){g=e.outputColorSpace,v=e.toneMapping,p.defines={},_.getTransfer(g)===`srgb`&&(p.defines.SRGB_TRANSFER=``);let t=Rn[v];t&&(p.defines[t]=``),p.needsUpdate=!0}p.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(S),e.render(m,h),S=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){c.dispose(),l!==null&&l.dispose(),u!==null&&u.dispose(),f.dispose(),p.dispose()}}var Bn=new Fe,Vn=new j(1,1),Hn=new U(1),Un=new C,Wn=new _e,Gn=new Lt,Kn=[],qn=[],Jn=new Float32Array(16),Yn=new Float32Array(9),Xn=new Float32Array(4);function Zn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Kn[i];if(a===void 0&&(a=new Float32Array(i),Kn[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Qn(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function $n(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function er(e,t){let n=qn[t];n===void 0&&(n=new Int32Array(t),qn[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function tr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function nr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qn(n,t))return;e.uniform2fv(this.addr,t),$n(n,t)}}function rr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Qn(n,t))return;e.uniform3fv(this.addr,t),$n(n,t)}}function ir(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qn(n,t))return;e.uniform4fv(this.addr,t),$n(n,t)}}function ar(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),$n(n,t)}else{if(Qn(n,r))return;Xn.set(r),e.uniformMatrix2fv(this.addr,!1,Xn),$n(n,r)}}function or(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),$n(n,t)}else{if(Qn(n,r))return;Yn.set(r),e.uniformMatrix3fv(this.addr,!1,Yn),$n(n,r)}}function sr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),$n(n,t)}else{if(Qn(n,r))return;Jn.set(r),e.uniformMatrix4fv(this.addr,!1,Jn),$n(n,r)}}function cr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function lr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qn(n,t))return;e.uniform2iv(this.addr,t),$n(n,t)}}function ur(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qn(n,t))return;e.uniform3iv(this.addr,t),$n(n,t)}}function dr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qn(n,t))return;e.uniform4iv(this.addr,t),$n(n,t)}}function fr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function pr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qn(n,t))return;e.uniform2uiv(this.addr,t),$n(n,t)}}function mr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qn(n,t))return;e.uniform3uiv(this.addr,t),$n(n,t)}}function hr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qn(n,t))return;e.uniform4uiv(this.addr,t),$n(n,t)}}function gr(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function _r(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?gr(Vn):Bn,n.setTexture2D(t||a,i)}function vr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Wn,i)}function yr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?gr(Hn):Gn,n.setTextureCube(t||a,i)}function br(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Un,i)}function xr(e){switch(e){case 5126:return tr;case 35664:return nr;case 35665:return rr;case 35666:return ir;case 35674:return ar;case 35675:return or;case 35676:return sr;case 5124:case 35670:return cr;case 35667:case 35671:return lr;case 35668:case 35672:return ur;case 35669:case 35673:return dr;case 5125:return fr;case 36294:return pr;case 36295:return mr;case 36296:return hr;case 35678:case 36198:case 36298:case 36306:case 35682:return _r;case 35679:case 36299:case 36307:return vr;case 35680:case 36300:case 36308:case 36293:return yr;case 36289:case 36303:case 36311:case 36292:return br}}function Sr(e,t){e.uniform1fv(this.addr,t)}function Cr(e,t){let n=Zn(t,this.size,2);e.uniform2fv(this.addr,n)}function wr(e,t){let n=Zn(t,this.size,3);e.uniform3fv(this.addr,n)}function Tr(e,t){let n=Zn(t,this.size,4);e.uniform4fv(this.addr,n)}function Er(e,t){let n=Zn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Dr(e,t){let n=Zn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Or(e,t){let n=Zn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function kr(e,t){e.uniform1iv(this.addr,t)}function Ar(e,t){e.uniform2iv(this.addr,t)}function jr(e,t){e.uniform3iv(this.addr,t)}function Mr(e,t){e.uniform4iv(this.addr,t)}function Nr(e,t){e.uniform1uiv(this.addr,t)}function Pr(e,t){e.uniform2uiv(this.addr,t)}function Fr(e,t){e.uniform3uiv(this.addr,t)}function Ir(e,t){e.uniform4uiv(this.addr,t)}function Lr(e,t,n){let r=this.cache,i=t.length,a=er(n,i);Qn(r,a)||(e.uniform1iv(this.addr,a),$n(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?gr(Vn):Bn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Rr(e,t,n){let r=this.cache,i=t.length,a=er(n,i);Qn(r,a)||(e.uniform1iv(this.addr,a),$n(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Wn,a[e])}function zr(e,t,n){let r=this.cache,i=t.length,a=er(n,i);Qn(r,a)||(e.uniform1iv(this.addr,a),$n(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?gr(Hn):Gn;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Br(e,t,n){let r=this.cache,i=t.length,a=er(n,i);Qn(r,a)||(e.uniform1iv(this.addr,a),$n(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Un,a[e])}function Vr(e){switch(e){case 5126:return Sr;case 35664:return Cr;case 35665:return wr;case 35666:return Tr;case 35674:return Er;case 35675:return Dr;case 35676:return Or;case 5124:case 35670:return kr;case 35667:case 35671:return Ar;case 35668:case 35672:return jr;case 35669:case 35673:return Mr;case 5125:return Nr;case 36294:return Pr;case 36295:return Fr;case 36296:return Ir;case 35678:case 36198:case 36298:case 36306:case 35682:return Lr;case 35679:case 36299:case 36307:return Rr;case 35680:case 36300:case 36308:case 36293:return zr;case 36289:case 36303:case 36311:case 36292:return Br}}var Hr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=xr(t.type)}},Ur=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vr(t.type)}},Wr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Gr=/(\w+)(\])?(\[|\.)?/g;function Kr(e,t){e.seq.push(t),e.map[t.id]=t}function qr(e,t,n){let r=e.name,i=r.length;for(Gr.lastIndex=0;;){let a=Gr.exec(r),o=Gr.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Kr(n,l===void 0?new Hr(s,e,t):new Ur(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Wr(s),Kr(n,e)),n=e}}}var Jr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);qr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Yr(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Xr=37297,Zr=0;function Qr(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var $r=new p;function ei(e){_._getMatrix($r,_.workingColorSpace,e);let t=`mat3( ${$r.elements.map(e=>e.toFixed(4))} )`;switch(_.getTransfer(e)){case jt:return[t,`LinearTransferOETF`];case be:return[t,`sRGBTransferOETF`];default:return $e(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ti(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Qr(e.getShaderSource(t),r)}return i}function ni(e,t){let n=ei(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var ri={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function ii(e,t){let n=ri[t];return n===void 0?($e(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var ai=new X;function oi(){return _.getLuminanceCoefficients(ai),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${ai.x.toFixed(4)}, ${ai.y.toFixed(4)}, ${ai.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function si(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ui).join(`
`)}function ci(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function li(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ui(e){return e!==``}function di(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function fi(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var pi=/^[ \t]*#include +<([\w\d./]+)>/gm;function mi(e){return e.replace(pi,hi)}function hi(e,t){let n=rn[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return mi(n)}var gi=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _i(e){return e.replace(gi,vi)}function vi(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function yi(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var bi={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function xi(e){return bi[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Si={302:`ENVMAP_MODE_REFRACTION`};function Ci(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Si[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var wi={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Ti(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:wi[e.combine]||`ENVMAP_BLENDING_NONE`}function Ei(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=xi(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Ci(n),d=Ti(n),f=si(n),p=ci(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(ui).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(ui).join(`
`),g.length>0&&(g+=`
`)):(h=[yi(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ui).join(`
`),g=[yi(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:rn.tonemapping_pars_fragment,n.toneMapping===0?``:ii(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,rn.colorspace_pars_fragment,ni(`linearToOutputTexel`,n.outputColorSpace),oi(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ui).join(`
`)),o=mi(o),o=di(o,n),o=fi(o,n),s=mi(s),s=di(s,n),s=fi(s,n),o=_i(o),s=_i(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Yr(i,i.VERTEX_SHADER,v),x=Yr(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=ti(i,b,`vertex`),n=ti(i,x,`fragment`);ue(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):$e(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Jr(i,m),w=li(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Xr)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Zr++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Di=0,Oi=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ki(e),t.set(e,n)),n}},ki=class{constructor(e){this.id=Di++,this.code=e,this.usedTimes=0}};function Ai(e){return e===1030||e===37490||e===36285}function ji(e,t,n,r,i,a){let o=new ft,s=new Oi,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,v=m.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=f[i.type],C=r.precision;i.precision!==null&&(C=r.getMaxPrecision(i.precision),C!==i.precision&&$e(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,C,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(S){let e=an[S];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=m.isInstancedMesh===!0,P=m.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,ee=!!x,L=ee&&x.isPMREMTexture===!0,R=!!i.aoMap,z=!!i.lightMap,te=!!i.bumpMap&&i.wireframe===!1,ne=!!i.normalMap,B=!!i.displacementMap,re=!!i.emissiveMap,V=!!i.metalnessMap,H=!!i.roughnessMap,ie=i.anisotropy>0,ae=i.clearcoat>0,oe=i.diffuseRoughness>0,se=i.dispersion>0,U=i.retroreflectivity>0,ce=i.iridescence>0,le=i.sheen>0,ue=i.transmission>0,de=ie&&!!i.anisotropyMap,fe=ae&&!!i.clearcoatMap,W=ae&&!!i.clearcoatNormalMap,pe=ae&&!!i.clearcoatRoughnessMap,me=oe&&!!i.diffuseRoughnessMap,he=ce&&!!i.iridescenceMap,ge=ce&&!!i.iridescenceThicknessMap,_e=le&&!!i.sheenColorMap,ve=le&&!!i.sheenRoughnessMap,ye=!!i.specularMap,be=!!i.specularColorMap,xe=!!i.specularIntensityMap,Se=ue&&!!i.transmissionMap,Ce=ue&&!!i.thicknessMap,G=!!i.gradientMap,we=!!i.alphaMap,Te=i.alphaTest>0,Ee=!!i.alphaHash,De=!!i.extensions,K=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(K=e.toneMapping);let Oe=L?x.isCompressedCubeTexture?x.image[0].mipmaps:x.mipmaps:null,ke={shaderID:S,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:C,batching:P,batchingColor:P&&m._colorsTexture!==null,instancing:N,instancingColor:N&&m.instanceColor!==null,instancingMorph:N&&m.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:_.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:ee,envMapMode:ee&&x.mapping,envMapPMREM:L,envMapMaxLod:L?Oe.length-1:null,envMapSize:L?Oe[0].width:null,aoMap:R,lightMap:z,bumpMap:te,normalMap:ne,displacementMap:B,emissiveMap:re,normalMapObjectSpace:ne&&i.normalMapType===1,normalMapTangentSpace:ne&&i.normalMapType===0,packedNormalMap:ne&&i.normalMapType===0&&Ai(i.normalMap.format),metalnessMap:V,roughnessMap:H,anisotropy:ie,anisotropyMap:de,clearcoat:ae,clearcoatMap:fe,clearcoatNormalMap:W,clearcoatRoughnessMap:pe,diffuseRoughness:oe,diffuseRoughnessMap:me,dispersion:se,retroreflection:U,iridescence:ce,iridescenceMap:he,iridescenceThicknessMap:ge,sheen:le,sheenColorMap:_e,sheenRoughnessMap:ve,specularMap:ye,specularColorMap:be,specularIntensityMap:xe,transmission:ue,transmissionMap:Se,thicknessMap:Ce,gradientMap:G,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:we,alphaTest:Te,alphaHash:Ee,combine:i.combine,mapUv:F&&p(i.map.channel),aoMapUv:R&&p(i.aoMap.channel),lightMapUv:z&&p(i.lightMap.channel),bumpMapUv:te&&p(i.bumpMap.channel),normalMapUv:ne&&p(i.normalMap.channel),displacementMapUv:B&&p(i.displacementMap.channel),emissiveMapUv:re&&p(i.emissiveMap.channel),metalnessMapUv:V&&p(i.metalnessMap.channel),roughnessMapUv:H&&p(i.roughnessMap.channel),anisotropyMapUv:de&&p(i.anisotropyMap.channel),clearcoatMapUv:fe&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:W&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:me&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:he&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(i.sheenRoughnessMap.channel),specularMapUv:ye&&p(i.specularMap.channel),specularColorMapUv:be&&p(i.specularColorMap.channel),specularIntensityMapUv:xe&&p(i.specularIntensityMap.channel),transmissionMapUv:Se&&p(i.transmissionMap.channel),thicknessMapUv:Ce&&p(i.thicknessMap.channel),alphaMapUv:we&&p(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ne||ie),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!v.attributes.uv&&(F||we),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ne===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:K,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&_.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:re&&i.emissiveMap.isVideoTexture===!0&&_.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:De&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(De&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=f[e.type],n;if(t){let e=an[t];n=qe.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Ei(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Mi(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ni(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Pi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Fi(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ni),r.length>1&&r.sort(t||Pi),i.length>1&&i.sort(t||Pi)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ii(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Fi,e.set(t,[i])):n>=r.length?(i=new Fi,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Li(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new X,color:new H};break;case`SpotLight`:n={position:new X,direction:new X,color:new H,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new X,color:new H,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new X,skyColor:new H,groundColor:new H};break;case`RectAreaLight`:n={color:new H,position:new X,halfWidth:new X,halfHeight:new X}}return e[t.id]=n,n}}}function Ri(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var zi=0;function Bi(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Vi(e){let t=new Li,n=Ri(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new X);let i=new X,a=new V,o=new V;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Bi);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=zi++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Hi(e){let t=new Vi(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Ui(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Hi(e),t.set(n,[a])):r>=i.length?(a=new Hi(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Wi=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gi=`uniform sampler2D shadow_pass;
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
}`,Ki=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],qi=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],Ji=new V,Yi=new X,Xi=new X;function Zi(e,t,n){let r=new st,i=new dt,a=new dt,o=new We,s=new Xe,c=new R,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new M({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:Wi,fragmentShader:Gi}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ze;m.setAttribute(`position`,new B(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Y(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&($e(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){$e(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){$e(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new De(i.x,i.y,{format:Qe,type:lt,minFilter:J,magFilter:J,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new j(i.x,i.y,Ie),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ye,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=D,d.map.depthTexture.magFilter=D}else l.isPointLight?(d.map=new mn(i.x),d.map.depthTexture=new U(i.x,tt)):(d.map=new De(i.x,i.y),d.map.depthTexture=new j(i.x,i.y,tt)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ye,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=J,d.map.depthTexture.magFilter=J):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=D,d.map.depthTexture.magFilter=D);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Yi.setFromMatrixPosition(l.matrixWorld),e.position.copy(Yi),Xi.copy(e.position),Xi.add(Ki[t]),e.up.copy(qi[t]),e.lookAt(Xi),e.updateMatrixWorld(),n.makeTranslation(-Yi.x,-Yi.y,-Yi.z),Ji.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Ji,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new De(i.x,i.y,{format:Qe,type:lt}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Qi(e,t){function n(){let t=!1,n=new We,r=null,i=new We(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?V(e.DEPTH_TEST):ie(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=F[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?V(e.STENCIL_TEST):ie(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new H(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,I=e.getParameter(e.VERSION);I.indexOf(`WebGL`)===-1?I.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(I)[1]),N=P>=1);let ee=null,L={},R=e.getParameter(e.SCISSOR_BOX),z=e.getParameter(e.VIEWPORT),te=new We().fromArray(R),ne=new We().fromArray(z);function B(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let re={};re[e.TEXTURE_2D]=B(e.TEXTURE_2D,e.TEXTURE_2D,1),re[e.TEXTURE_CUBE_MAP]=B(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[e.TEXTURE_2D_ARRAY]=B(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),re[e.TEXTURE_3D]=B(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),V(e.DEPTH_TEST),o.setFunc(3),fe(!1),W(1),V(e.CULL_FACE),le(0);function V(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ie(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ae(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function oe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function se(t){return h!==t&&(e.useProgram(t),h=t,!0)}let U={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};U[103]=e.MIN,U[104]=e.MAX;let ce={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function le(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ie(e.BLEND),g=!1);else if(g===!1&&(V(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:ue(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:ue(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:ue(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:ue(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(U[n],U[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ce[r],ce[i],ce[o],ce[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function de(t,n){t.side===2?ie(e.CULL_FACE):V(e.CULL_FACE);let r=t.side===1;n&&(r=!r),fe(r),t.blending===1&&t.transparent===!1?le(0):le(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),me(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?V(e.SAMPLE_ALPHA_TO_COVERAGE):ie(e.SAMPLE_ALPHA_TO_COVERAGE)}function fe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function W(t){t===0?ie(e.CULL_FACE):(V(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function pe(t){t!==k&&(N&&e.lineWidth(t),k=t)}function me(t,n,r){t?(V(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ie(e.POLYGON_OFFSET_FILL)}function he(t){t?V(e.SCISSOR_TEST):ie(e.SCISSOR_TEST)}function ge(t){t===void 0&&(t=e.TEXTURE0+M-1),ee!==t&&(e.activeTexture(t),ee=t)}function _e(t,n,r){r===void 0&&(r=ee===null?e.TEXTURE0+M-1:ee);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(ee!==r&&(e.activeTexture(r),ee=r),e.bindTexture(t,n||re[t]),i.type=t,i.texture=n)}function ve(){let t=L[ee];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ye(){try{e.compressedTexImage2D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function be(){try{e.compressedTexImage3D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function xe(){try{e.texSubImage2D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function Se(){try{e.texSubImage3D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function Ce(){try{e.compressedTexSubImage2D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function G(){try{e.compressedTexSubImage3D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function we(){try{e.texStorage2D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function Te(){try{e.texStorage3D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function Ee(){try{e.texImage2D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function De(){try{e.texImage3D(...arguments)}catch(e){ue(`WebGLState:`,e)}}function K(t){return d[t]===void 0?e.getParameter(t):d[t]}function Oe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function ke(t){te.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),te.copy(t))}function q(t){ne.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ne.copy(t))}function Ae(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function J(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function je(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ee=null,L={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new H(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,te.set(0,0,e.canvas.width,e.canvas.height),ne.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:V,disable:ie,bindFramebuffer:ae,drawBuffers:oe,useProgram:se,setBlending:le,setMaterial:de,setFlipSided:fe,setCullFace:W,setLineWidth:pe,setPolygonOffset:me,setScissorTest:he,activeTexture:ge,bindTexture:_e,unbindTexture:ve,compressedTexImage2D:ye,compressedTexImage3D:be,texImage2D:Ee,texImage3D:De,pixelStorei:Oe,getParameter:K,updateUBOMapping:Ae,uniformBlockBinding:J,texStorage2D:we,texStorage3D:Te,texSubImage2D:xe,texSubImage3D:Se,compressedTexSubImage2D:Ce,compressedTexSubImage3D:G,scissor:ke,viewport:q,reset:je}}function $i(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new dt,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function v(e,t){return g?new OffscreenCanvas(e,t):Mt(`canvas`)}function x(e,t,n){let r=1,i=q(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=v(n,a));let o=t?v(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),$e(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&$e(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function S(e){return e.generateMipmaps}function C(t){e.generateMipmap(t)}function w(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function T(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];$e(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||$e(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?jt:_.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function O(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,$e(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function k(e,t){return S(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function j(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function M(e){P(e.target)}function N(e){F(e.target)}function P(e){e.removeEventListener(`dispose`,M),j(e),L(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function F(e){e.removeEventListener(`dispose`,N),j(e),te(e)}function ee(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?F(t):P(t))}m.clear(),d.clear()}function L(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&R(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function R(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function te(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&P(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let ne=0;function B(){ne=0}function re(){return ne}function V(e){ne=e}function H(){let e=ne;return e>=i.maxTextures&&$e(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ne+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ae(t,i){let a=r.get(t);if(t.isVideoTexture&&Oe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)$e(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)$e(`WebGLRenderer: Texture marked for update but image is incomplete`);else{_e(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function oe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?_e(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function se(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?_e(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function U(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ve(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ce={[E]:e.REPEAT,[z]:e.CLAMP_TO_EDGE,[y]:e.MIRRORED_REPEAT},fe={[D]:e.NEAREST,[le]:e.NEAREST_MIPMAP_NEAREST,[I]:e.NEAREST_MIPMAP_LINEAR,[J]:e.LINEAR,[de]:e.LINEAR_MIPMAP_NEAREST,[Nt]:e.LINEAR_MIPMAP_LINEAR},W={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function pe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&$e(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,fe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,fe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,W[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function me(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,M),A(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ie(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&R(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function he(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ge(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=he(n.start,r.width,4),c=he(t.start,r.width,4);n.start<=i+1&&a===c&&he(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function _e(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=me(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=_.getPrimaries(_.workingColorSpace),r=o.colorSpace===``?null:_.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=x(o.image,!1,i.maxTextureSize);t=ke(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=T(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);pe(c,o);let h,g=o.mipmaps,v=o.isVideoTexture!==!0,y=f.__version===void 0||l===!0,w=u.dataReady,E=k(o,t);if(o.isDepthTexture)m=O(o.format===b,o.type),y&&(v?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){v&&y&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],v?w&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else v?(y&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),w&&ge(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){v&&y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(v){if(w){if(o.layerUpdates.size>0){let t=At(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else $e(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?w&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{v&&y&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?v?w&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?$e(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?w&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(v){if(y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),w){if(o.layerUpdates.size>0){let i=At(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)v?(y&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),w&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(y){if(v)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(v&&y){let t=q(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],v?w&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(v){if(y){let r=q(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}w&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);S(o)&&o.mipmapsAutoUpdate===!0&&C(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ve(t,o,s){if(o.image.length!==6)return;let c=me(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=_.getPrimaries(_.workingColorSpace),r=o.colorSpace===``?null:_.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=x(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=ke(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),v=a.convert(o.type),y=T(o.internalFormat,g,v,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,A=k(o,h);pe(e.TEXTURE_CUBE_MAP,o);let j;if(o.isDepthTexture){if(y=O(o.format===b,o.type),E){if(w)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,y,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h.width,h.height,0,g,v,null)}}else if(f){w&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,A,y,h.width,h.height);for(let t=0;t<6;t++){j=m[t].mipmaps;for(let r=0;r<j.length;r++){let i=j[r];o.format===1023?w?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,g,v,i.data):g===null?$e(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(j=o.mipmaps,w&&E){j.length>0&&A++;let t=q(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,A,y,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,v,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,m[t].width,m[t].height,0,g,v,m[t].data);for(let r=0;r<j.length;r++){let i=j[r].image[t].image;w?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,g,v,i.data)}}else{w?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,v,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,g,v,m[t]);for(let r=0;r<j.length;r++){let i=j[r];w?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,g,v,i.image[t])}}}S(o)&&o.mipmapsAutoUpdate===!0&&C(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ye(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=T(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),K(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,De(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function be(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=O(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;K(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,De(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,De(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=T(o.internalFormat,c,l,o.normalized,o.colorSpace);K(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,De(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,De(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function xe(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?U(i.depthTexture,0):ae(i.depthTexture,0);let u=c.__webglTexture,d=De(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)K(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)K(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Se(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)xe(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?xe(i.__webglFramebuffer[0],t,0):xe(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),be(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),be(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,i){let a=r.get(t);n!==void 0&&ye(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Se(t)}function G(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,N),A(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&K(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=T(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=De(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),be(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),pe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ye(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ye(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);S(i)?C(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),pe(c,a),ye(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),S(a)&&C(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),pe(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ye(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ye(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);S(i)?C(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Se(t)}function we(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(S(a)&&a.mipmapsAutoUpdate===!0){let t=w(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),C(t),n.unbindTexture()}}}let Te=[];function Ee(t){if(t.samples>0){if(K(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Te.length=0,Te.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Te.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Te))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function De(e){return Math.min(i.maxSamples,e.samples)}function K(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Oe(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function ke(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(_.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&$e(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):ue(`WebGLTextures: Unsupported texture color space:`,n)),t}function q(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.getTextureUnits=re,this.setTextureUnits=V,this.setTexture2D=ae,this.setTexture2DArray=oe,this.setTexture3D=se,this.setTextureCube=U,this.rebindTextures=Ce,this.setupRenderTarget=G,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=K,this.dispose=ee}function ea(e,t){function n(n,r=``){let i,a=_.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var ta=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,na=`
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

}`,ra=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new we(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new M({vertexShader:ta,fragmentShader:na,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new xe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ia=class extends Se{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,l=null,u=null,d=null,f=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,g=new ra,_={},v=t.getContextAttributes(),y=null,x=null,S=[],C=[],T=new dt,E=null,D=null,O=new w;O.viewport=new We;let k=new w;k.viewport=new We;let M=[O,k],N=new c,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=S[e];return t===void 0&&(t=new Dt,S[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=S[e];return t===void 0&&(t=new Dt,S[e]=t),t.getGripSpace()},this.getHand=function(e){let t=S[e];return t===void 0&&(t=new Dt,S[e]=t),t.getHandSpace()};function I(e){let t=C.indexOf(e.inputSource);if(t===-1)return;let n=S[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,I),r.removeEventListener(`selectstart`,I),r.removeEventListener(`selectend`,I),r.removeEventListener(`squeeze`,I),r.removeEventListener(`squeezestart`,I),r.removeEventListener(`squeezeend`,I),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,L);for(let e=0;e<S.length;e++){let t=C[e];t!==null&&(C[e]=null,S[e].disconnect(t))}P=null,F=null,g.reset();for(let e in _)delete _[e];if(e.setRenderTarget(y),p=null,f=null,d=null,r=null,x=null,B.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),D!==null){let e=D.camera;e.fov=D.fov,e.zoom=D.zoom,e.updateProjectionMatrix(),D=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&$e(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&$e(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&h&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(c){if(r=c,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,I),r.addEventListener(`selectstart`,I),r.addEventListener(`selectend`,I),r.addEventListener(`squeeze`,I),r.addEventListener(`squeezestart`,I),r.addEventListener(`squeezeend`,I),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,L),v.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;v.depth&&(o=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=v.stencil?b:ye,a=v.stencil?yt:tt);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new De(f.textureWidth,f.textureHeight,{format:se,type:ke,depthTexture:new j(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new De(p.framebufferWidth,p.framebufferHeight,{format:se,type:ke,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),l=null,a=await r.requestReferenceSpace(o),B.setContext(r),B.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function L(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=C.indexOf(n);r>=0&&(C[r]=null,S[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=C.indexOf(n);if(r===-1){for(let e=0;e<S.length;e++)if(e>=C.length){C.push(n),r=e;break}else if(C[e]===null){C[e]=n,r=e;break}if(r===-1)break}let i=S[r];i&&i.connect(n)}}function R(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),N.near=k.near=O.near=t,N.far=k.far=O.far=n,(P!==N.near||F!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),P=N.near,F=N.far),N.layers.mask=e.layers.mask|6,O.layers.mask=N.layers.mask&-5,k.layers.mask=N.layers.mask&-3;let i=e.parent,a=N.cameras;R(N,i);for(let e=0;e<a.length;e++)R(a[e],i);N.projectionMatrix.copy(O.projectionMatrix),N.projectionMatrixInverse.copy(O.projectionMatrixInverse),D===null&&e.isPerspectiveCamera&&(D={camera:e,fov:e.fov,zoom:e.zoom}),z(e,N,i)};function z(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=A*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(e){return _[e]};let te=null;function ne(t,i){if(u=i.getViewerPose(l||a),m=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==N.cameras.length&&(N.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=M[n];o===void 0&&(o=new w,o.layers.enable(n),o.viewport=new We,M[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(N.matrix.copy(o.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),i===!0&&N.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=_[n];e||(e=new we,_[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<S.length;e++){let t=C[e],n=S[e];t!==null&&n!==void 0&&n.update(t,i,l||a)}te&&te(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let B=new tn;B.setAnimationLoop(ne),this.setAnimationLoop=function(e){te=e},this.dispose=function(){}}},aa=new V,oa=new p;oa.set(-1,0,0,0,1,0,0,0,1);function sa(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,W(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(aa.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(oa),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function ca(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?$e(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):$e(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var la=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ua=null;function da(){return ua===null&&(ua=new me(la,16,16,Qe,lt),ua.name=`DFG_LUT`,ua.minFilter=J,ua.magFilter=J,ua.wrapS=z,ua.wrapT=z,ua.generateMipmaps=!1,ua.needsUpdate=!0),ua}var fa=class{constructor(e={}){let{canvas:t=Ae(),context:i=null,depth:a=!0,stencil:o=!1,alpha:s=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1,outputBufferType:m=ke}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<`u`&&i instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);g=i.getContextAttributes().alpha}else g=s;let y=m,b=new Set([n,r,v]),x=new Set([ke,tt,Re,yt,wt,Pe]),S=new Uint32Array(4),C=new Int32Array(4),w={textures:[],min:[],max:[],resolution:[]},T=null,E=null,D=[],O=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,j=!1,M=null,N=null,P=null,F=null;this._outputColorSpace=he;let I=0,ee=0,L=null,R=-1,z=null,te=new We,ne=new We,B=null,ie=new H(0),ae=0,oe=t.width,se=t.height,U=1,ce=null,le=null,de=new We(0,0,oe,se),fe=new We(0,0,oe,se),W=!1,pe=new st,me=new _t,ge=!1,_e=!1,ve=new V,ye=new X,be=new We,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ce(){return L===null?U:1}let G=i;function we(e,n){return t.getContext(e,n)}let Te,Ee,K,Oe,q,J,je,Me,Ne,Fe,Ie,Le,ze,Be,He,Ue,Ge,Ke,qe,Je,Ye,Xe,Ze;try{let e={alpha:!0,depth:a,stencil:o,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,et,!1),t.addEventListener(`webglcontextrestored`,nt,!1),t.addEventListener(`webglcontextcreationerror`,rt,!1),G===null){let t=`webgl2`;if(G=we(t,e),G===null)throw we(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Qe()}catch(e){throw t.removeEventListener(`webglcontextlost`,et,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,rt,!1),ue(`WebGLRenderer: `+e.message),e}function Qe(){Te=new Mn(G),Te.init(),Ye=new ea(G,Te),Ee=new fn(G,Te,e,Ye),K=new Qi(G,Te),Ee.reversedDepthBuffer&&p&&K.buffers.depth.setReversed(!0),N=G.createFramebuffer(),P=G.createFramebuffer(),F=G.createFramebuffer(),Oe=new Fn(G),q=new Mi,J=new $i(G,Te,K,q,Ee,Ye,Oe),je=new jn(A),Me=new nn(G),Xe=new un(G,Me),Ne=new Nn(G,Me,Oe,Xe),Fe=new Ln(G,Ne,Me,Xe,Oe),Ke=new In(G,Ee,J),He=new pn(q),Ie=new ji(A,je,Te,Ee,Xe,He),Le=new sa(A,q),ze=new Ii,Be=new Ui(Te),Ge=new ln(A,je,K,Fe,g,l),Ue=new Zi(A,Fe,Ee),Ze=new ca(G,Oe,Ee,K),qe=new dn(G,Te,Oe),Je=new Pn(G,Te,Oe),Oe.programs=Ie.programs,A.capabilities=Ee,A.extensions=Te,A.properties=q,A.renderLists=ze,A.shadowMap=Ue,A.state=K,A.info=Oe}y!==1009&&(k=new zn(y,t.width,t.height,c,a,o));let Y=new ia(A,G);this.xr=Y,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(e){e!==void 0&&(U=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){Y.isPresenting?$e(`WebGLRenderer: Can't change size while VR device is presenting.`):(oe=e,se=n,t.width=Math.floor(e*U),t.height=Math.floor(n*U),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(oe*U,se*U).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,U=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(y===1009)ue(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){$e(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}k.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(te)},this.getViewport=function(e){return e.copy(de)},this.setViewport=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),K.viewport(te.copy(de).multiplyScalar(Ce()).round())},this.getScissor=function(e){return e.copy(fe)},this.setScissor=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),K.scissor(ne.copy(fe).multiplyScalar(Ce()).round())},this.getScissorTest=function(){return W},this.setScissorTest=function(e){K.setScissorTest(W=e)},this.setOpaqueSort=function(e){ce=e},this.setTransparentSort=function(e){le=e},this.getClearColor=function(e){return e.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(L!==null){let t=L.texture.format;e=b.has(t)}if(e){let e=L.texture.type,t=x.has(e),n=Ge.getClearColor(),r=Ge.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(S[0]=i,S[1]=a,S[2]=o,S[3]=r,G.clearBufferuiv(G.COLOR,0,S)):(C[0]=i,C[1]=a,C[2]=o,C[3]=r,G.clearBufferiv(G.COLOR,0,C))}else r|=G.COLOR_BUFFER_BIT}t&&(r|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&G.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),M=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,et,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,rt,!1),Ge.dispose(),ze.dispose(),Be.dispose(),J.dispose(),q.dispose(),je.dispose(),Fe.dispose(),Ne.dispose(),Xe.dispose(),Ze.dispose(),Ie.dispose(),Y.dispose(),Y.removeEventListener(`sessionstart`,ft),Y.removeEventListener(`sessionend`,pt),mt.stop()};function et(e){e.preventDefault(),h(`WebGLRenderer: Context Lost.`),j=!0}function nt(){h(`WebGLRenderer: Context Restored.`),j=!1;let e=Oe.autoReset,t=Ue.enabled,n=Ue.autoUpdate,r=Ue.needsUpdate,i=Ue.type;Qe(),Oe.autoReset=e,Ue.enabled=t,Ue.autoUpdate=n,Ue.needsUpdate=r,Ue.type=i}function rt(e){ue(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function it(e){let t=e.target;t.removeEventListener(`dispose`,it),at(t)}function at(e){ot(e),q.remove(e)}function ot(e){let t=q.get(e).programs;t!==void 0&&(t.forEach(function(e){Ie.releaseProgram(e)}),e.isShaderMaterial&&Ie.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=xe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);K.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ne.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Xe.setup(i,r,s,n,c);let h,g=qe;if(c!==null&&(h=Me.get(c),g=Je,g.setIndex(h)),i.isMesh)r.wireframe===!0?(K.setLineWidth(r.wireframeLinewidth*Ce()),g.setMode(G.LINES)):g.setMode(G.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),K.setLineWidth(e*Ce()),i.isLineSegments?g.setMode(G.LINES):i.isLineLoop?g.setMode(G.LINE_LOOP):g.setMode(G.LINE_STRIP)}else i.isPoints?g.setMode(G.POINTS):i.isSprite&&g.setMode(G.TRIANGLES);if(i.isBatchedMesh){if(Te.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Me.get(c).bytesPerElement:1,o=q.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(G,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ct(e,t,n,r){M!==null&&e.isNodeMaterial&&M.setObject(r,e),ge===!0&&He.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Ct(e,t,r),e.side=0,e.needsUpdate=!0,Ct(e,t,r),e.side=2):Ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),M!==null&&M.renderStart(e,t,n),E=Be.get(n),E.init(t),O.push(E),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),E.setupLights(),M!==null&&M.updateLights(E.state.lightsArray),_e=this.localClippingEnabled,ge=He.init(this.clippingPlanes,_e),ge===!0&&He.setGlobalState(this.clippingPlanes,t),M!==null&&Ue.render(E.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ct(o,n,t,e),r.add(o)}else ct(i,n,t,e),r.add(i)}}),E=O.pop(),M!==null&&M.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=q.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Te.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ut=null;function dt(e){ut&&ut(e)}function ft(){mt.stop()}function pt(){mt.start()}let mt=new tn;mt.setAnimationLoop(dt),typeof self<`u`&&mt.setContext(self),this.setAnimationLoop=function(e){ut=e,Y.setAnimationLoop(e),e===null?mt.stop():mt.start()},Y.addEventListener(`sessionstart`,ft),Y.addEventListener(`sessionend`,pt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){ue(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(j===!0)return;M!==null&&M.renderStart(e,t);let n=Y.enabled===!0&&Y.isPresenting===!0,r=k!==null&&(L===null||n)&&k.begin(A,L);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(t),t=Y.getCamera()),e.isScene===!0&&e.onBeforeRender(A,e,t,L),E=Be.get(e,O.length),E.init(t),E.state.textureUnits=J.getTextureUnits(),O.push(E),ve.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?me.setFromArrayCamera(t):pe.setFromProjectionMatrix(ve,Ve,t.reversedDepth),_e=this.localClippingEnabled,ge=He.init(this.clippingPlanes,_e),T=ze.get(e,D.length),T.init(),D.push(T),this.info.render.frame++,Y.enabled===!0&&Y.isPresenting===!0){let e=A.xr.getDepthSensingMesh();e!==null&&ht(e,t,-1/0,A.sortObjects)}ht(e,t,0,A.sortObjects),T.finish(),M!==null&&M.updateLights(E.state.lightsArray),A.sortObjects===!0&&T.sort(ce,le),Se=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Se&&Ge.addToRenderList(T,e),this.info.autoReset===!0&&this.info.reset(),ge===!0&&He.beginShadows();let i=E.state.shadowsArray;if(Ue.render(i,e,t),ge===!0&&He.endShadows(),(r&&k.hasRenderPass())===!1){let n=T.opaque,r=T.transmissive;if(E.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}Se&&Ge.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];gt(T,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),Se&&Ge.render(e),gt(T,e,t)}L!==null&&ee===0&&(J.updateMultisampleRenderTarget(L),J.updateRenderTargetMipmap(L)),r&&k.end(A),e.isScene===!0&&e.onAfterRender(A,e,t),Xe.resetDefaultState(),R=-1,z=null,O.pop(),O.length>0?(E=O[O.length-1],J.setTextureUnits(E.state.textureUnits),ge===!0&&He.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,D.pop(),T=D.length>0?D[D.length-1]:null,M!==null&&M.renderEnd()};function ht(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)E.pushLight(e),e.castShadow&&E.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?me:pe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&be.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ve);let i=Fe.update(e),a=e.material;a.visible&&T.push(e,i,a,n,be.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?me:pe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Fe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),be.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),be.copy(e.boundingSphere.center)),be.applyMatrix4(e.matrixWorld).applyMatrix4(ve)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&T.push(e,i,c,n,be.z,s,t)}}else a.visible&&T.push(e,i,a,n,be.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ht(i[e],t,n,r)}function gt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;E.setupLightsView(n),ge===!0&&He.setGlobalState(A.clippingPlanes,n),r&&K.viewport(te.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[r.id]===void 0){let e=Te.has(`EXT_color_buffer_half_float`)||Te.has(`EXT_color_buffer_float`);E.state.transmissionRenderTarget[r.id]=new De(1,1,{generateMipmaps:!0,type:e?lt:ke,minFilter:Nt,samples:Math.max(4,Ee.samples),stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_.workingColorSpace})}let i=E.state.transmissionRenderTarget[r.id],a=r.viewport||te;i.setSize(a.z*A.transmissionResolutionScale,a.w*A.transmissionResolutionScale);let s=A.getRenderTarget(),c=A.getActiveCubeFace(),l=A.getActiveMipmapLevel();A.setRenderTarget(i),A.getClearColor(ie),ae=A.getClearAlpha(),ae<1&&A.setClearColor(16777215,.5),A.clear(),Se&&Ge.render(n);let u=A.toneMapping;A.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),E.setupLightsView(r),ge===!0&&He.setGlobalState(A.clippingPlanes,r),bt(e,n,r),J.updateMultisampleRenderTarget(i),J.updateRenderTargetMipmap(i),Te.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,xt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(J.updateMultisampleRenderTarget(i),J.updateRenderTargetMipmap(i))}A.setRenderTarget(s,c,l),A.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),A.toneMapping=u}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&xt(o,t,n,s,l,c)}}function xt(e,t,n,r,i,a){M!==null&&i.isNodeMaterial&&M.setObject(e,i),e.onBeforeRender(A,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(A,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=2):A.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(A,t,n,r,i,a)}function St(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Ct(e,t,n){t.isScene!==!0&&(t=xe);let r=q.get(e),i=E.state.lights,a=E.state.shadowsArray,o=i.state.version,s=Ie.getParameters(e,i.state,a,t,n,E.state.lightProbeGridArray),c=Ie.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=je.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,it),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=Ie.getUniforms(e),M!==null&&e.isNodeMaterial&&M.build(e,n,s),e.onBeforeCompile(s,A),d=Ie.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=He.uniform),Dt(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=St(E.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Tt(e,t,n,r,i){let a=q.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Et(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Jr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=q.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=xe),J.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=L===null?A.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:_.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=je.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(h=A.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,v=g===void 0?0:g.length,y=q.get(r),b=E.state.lights;if(ge===!0&&(_e===!0||e!==z)){let t=e===z&&r.id===R;He.setState(r,e,t)}let x=!1,S=!1;r.version===y.__version?y.needsLights&&y.lightsStateVersion!==b.state.version||i.isBatchedMesh&&y.batching===!1||!i.isBatchedMesh&&y.batching===!0||i.isBatchedMesh&&y.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&y.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&y.instancing===!1||!i.isInstancedMesh&&y.instancing===!0||i.isSkinnedMesh&&y.skinning===!1||!i.isSkinnedMesh&&y.skinning===!0||i.isInstancedMesh&&y.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&y.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&y.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&y.instancingMorph===!1&&i.morphTexture!==null?x=!0:y.envMap===l?r.fog===!0&&y.fog!==a||y.numClippingPlanes!==void 0&&(y.numClippingPlanes!==He.numPlanes||y.numIntersection!==He.numIntersection)?x=!0:y.vertexAlphas===u&&y.vertexTangents===d&&y.morphTargets===f&&y.morphNormals===p&&y.morphColors===m&&y.morphTargetsCount===v&&y.numLightProbeGrids===St(E.state.lightProbeGridArray)?(y.outputColorSpace!==s||y.toneMapping!==h)&&(S=!0):x=!0:x=!0:(x=!0,y.__version=r.version);let C=y.currentProgram;(x===!0||S===!0)&&(C=S===!0?Tt(r,t,i,s,h):Ct(r,t,i),M&&r.isNodeMaterial&&M.onUpdateProgram(r,C,y));let T=!1,D=!1,O=!1,k=C.getUniforms(),j=y.uniforms;if(K.useProgram(C.program)&&(T=!0,D=!0,O=!0),r.id!==R&&(R=r.id,D=!0),T||z!==e){K.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),k.setValue(G,`projectionMatrix`,e.projectionMatrix),k.setValue(G,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(G,ye.setFromMatrixPosition(e.matrixWorld)),Ee.logarithmicDepthBuffer&&k.setValue(G,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(G,`isOrthographic`,e.isOrthographicCamera===!0),z!==e&&(z=e,D=!0,O=!0)}if(y.needsLights&&(b.state.sunShadowMap.length>0&&k.setValue(G,`sunShadowMap`,b.state.sunShadowMap,J),b.state.directionalShadowMap.length>0&&k.setValue(G,`directionalShadowMap`,b.state.directionalShadowMap,J),b.state.spotShadowMap.length>0&&k.setValue(G,`spotShadowMap`,b.state.spotShadowMap,J),b.state.pointShadowMap.length>0&&k.setValue(G,`pointShadowMap`,b.state.pointShadowMap,J)),i.isSkinnedMesh){k.setOptional(G,i,`bindMatrix`),k.setOptional(G,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(G,`boneTexture`,e.boneTexture,J))}i.isBatchedMesh&&(k.setOptional(G,i,`batchingTexture`),k.setValue(G,`batchingTexture`,i._matricesTexture,J),k.setOptional(G,i,`batchingIdTexture`),k.setValue(G,`batchingIdTexture`,i._indirectTexture,J),k.setOptional(G,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(G,`batchingColorTexture`,i._colorsTexture,J));let N=n.morphAttributes;if((N.position!==void 0||N.normal!==void 0||N.color!==void 0)&&Ke.update(i,n,C),(D||y.receiveShadow!==i.receiveShadow)&&(y.receiveShadow=i.receiveShadow,k.setValue(G,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=da()),D){if(k.setValue(G,`toneMappingExposure`,A.toneMappingExposure),y.needsLights&&kt(j,O),a&&r.fog===!0&&Le.refreshFogUniforms(j,a),Le.refreshMaterialUniforms(j,r,U,se,E.state.transmissionRenderTarget[e.id]),y.needsLights&&y.numLightProbeGrids>0){let e=w,t=0;for(let n of E.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}Jr.upload(G,Et(y),j,J)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Jr.upload(G,Et(y),j,J),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(G,`center`,i.center),k.setValue(G,`modelViewMatrix`,i.modelViewMatrix),k.setValue(G,`normalMatrix`,i.normalMatrix),k.setValue(G,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ze.update(n,C),Ze.bind(n,C)}}return C}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(e,t,n){let r=q.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),q.get(e.texture).__webglTexture=t,q.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=q.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){L=e,I=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=q.get(e);if(o.__useDefaultFramebuffer!==void 0){K.bindFramebuffer(G.FRAMEBUFFER,o.__webglFramebuffer),te.copy(e.viewport),ne.copy(e.scissor),B=e.scissorTest,K.viewport(te),K.scissor(ne),K.setScissorTest(B),R=-1;return}if(o.__webglFramebuffer===void 0)J.setupRenderTarget(e);else if(o.__hasExternalTextures)J.rebindTextures(e,q.get(e.texture).__webglTexture,q.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&q.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);J.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=q.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&J.useMultisampledRTT(e)===!1?q.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,te.copy(e.viewport),ne.copy(e.scissor),B=e.scissorTest}else te.copy(de).multiplyScalar(U).floor(),ne.copy(fe).multiplyScalar(U).floor(),B=W;if(n!==0&&(r=N),K.bindFramebuffer(G.FRAMEBUFFER,r)&&K.drawBuffers(e,r),K.viewport(te),K.scissor(ne),K.setScissorTest(B),i){let r=q.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=q.get(e.textures[t]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=q.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,t.__webglTexture,n)}R=-1};function jt(e){let t=q.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ee.textureFormatReadable(e.format),t.__typeReadable=Ee.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){ue(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){K.bindFramebuffer(G.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){ue(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){ue(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&G.readPixels(t,n,r,i,Ye.convert(c),Ye.convert(l),a)}finally{let e=L===null?null:q.get(L).__webglFramebuffer;K.bindFramebuffer(G.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){K.bindFramebuffer(G.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.bufferData(G.PIXEL_PACK_BUFFER,a.byteLength,G.STREAM_READ),G.readPixels(t,n,r,i,Ye.convert(l),Ye.convert(u),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let p=L===null?null:q.get(L).__webglFramebuffer;K.bindFramebuffer(G.FRAMEBUFFER,p);let m=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await re(G,m,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,a),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(f),G.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;J.setTexture2D(e,0),G.copyTexSubImage2D(G.TEXTURE_2D,n,0,0,o,s,i,a),K.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ye.convert(t.format),_=Ye.convert(t.type),v;t.isData3DTexture?(J.setTexture3D(t,0),v=G.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(J.setTexture2DArray(t,0),v=G.TEXTURE_2D_ARRAY):(J.setTexture2D(t,0),v=G.TEXTURE_2D),K.activeTexture(G.TEXTURE0),K.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,t.flipY),K.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),K.pixelStorei(G.UNPACK_ALIGNMENT,t.unpackAlignment);let y=K.getParameter(G.UNPACK_ROW_LENGTH),b=K.getParameter(G.UNPACK_IMAGE_HEIGHT),x=K.getParameter(G.UNPACK_SKIP_PIXELS),S=K.getParameter(G.UNPACK_SKIP_ROWS),C=K.getParameter(G.UNPACK_SKIP_IMAGES);K.pixelStorei(G.UNPACK_ROW_LENGTH,h.width),K.pixelStorei(G.UNPACK_IMAGE_HEIGHT,h.height),K.pixelStorei(G.UNPACK_SKIP_PIXELS,l),K.pixelStorei(G.UNPACK_SKIP_ROWS,u),K.pixelStorei(G.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=q.get(e),r=q.get(t),h=q.get(n.__renderTarget),g=q.get(r.__renderTarget);K.bindFramebuffer(G.READ_FRAMEBUFFER,h.__webglFramebuffer),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(e).__webglTexture,i,d+n),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(t).__webglTexture,a,m+n)),G.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,G.DEPTH_BUFFER_BIT,G.NEAREST);K.bindFramebuffer(G.READ_FRAMEBUFFER,null),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||q.has(e)){let n=q.get(e),r=q.get(t);K.bindFramebuffer(G.READ_FRAMEBUFFER,P),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,F);for(let e=0;e<c;e++)w?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,n.__webglTexture,i),T?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,r.__webglTexture,a),i===0?T?G.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):G.copyTexSubImage2D(v,a,f,p,l,u,o,s):G.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,G.COLOR_BUFFER_BIT,G.NEAREST);K.bindFramebuffer(G.READ_FRAMEBUFFER,null),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?G.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h);K.pixelStorei(G.UNPACK_ROW_LENGTH,y),K.pixelStorei(G.UNPACK_IMAGE_HEIGHT,b),K.pixelStorei(G.UNPACK_SKIP_PIXELS,x),K.pixelStorei(G.UNPACK_SKIP_ROWS,S),K.pixelStorei(G.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&G.generateMipmap(v),K.unbindTexture()},this.initRenderTarget=function(e){q.get(e).__webglFramebuffer===void 0&&J.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?J.setTextureCube(e,0):e.isData3DTexture?J.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?J.setTexture2DArray(e,0):J.setTexture2D(e,0),K.unbindTexture()},this.resetState=function(){I=0,ee=0,L=null,K.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ve}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_._getDrawingBufferColorSpace(e),t.unpackColorSpace=_._getUnpackColorSpace()}},pa={type:`change`},ma={type:`start`},ha={type:`end`},ga=new L,_a=new ge,va=Math.cos(70*g.DEG2RAD),ya=new X,ba=2*Math.PI,xa={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sa=1e-6,Ca=class extends T{constructor(e,n=null){super(e,n),this.state=xa.NONE,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:pe.ROTATE,MIDDLE:pe.DOLLY,RIGHT:pe.PAN},this.touches={ONE:t.ROTATE,TWO:t.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new X,this._lastQuaternion=new N,this._lastTargetPosition=new X,this._quat=new N().setFromUnitVectors(e.up,new X(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new oe,this._sphericalDelta=new oe,this._scale=1,this._panOffset=new X,this._rotateStart=new dt,this._rotateEnd=new dt,this._rotateDelta=new dt,this._panStart=new dt,this._panEnd=new dt,this._panDelta=new dt,this._dollyStart=new dt,this._dollyEnd=new dt,this._dollyDelta=new dt,this._dollyDirection=new X,this._mouse=new dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ta.bind(this),this._onPointerDown=wa.bind(this),this._onPointerUp=Ea.bind(this),this._onContextMenu=Na.bind(this),this._onMouseWheel=ka.bind(this),this._onKeyDown=Aa.bind(this),this._onTouchStart=ja.bind(this),this._onTouchMove=Ma.bind(this),this._onMouseDown=Da.bind(this),this._onMouseMove=Oa.bind(this),this._interceptControlDown=Pa.bind(this),this._interceptControlUp=Fa.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=xa.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pa),this.update(),this.state=xa.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;ya.copy(t).sub(this.target),ya.applyQuaternion(this._quat),this._spherical.setFromVector3(ya),this.autoRotate&&this.state===xa.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=ba:n>Math.PI&&(n-=ba),r<-Math.PI?r+=ba:r>Math.PI&&(r-=ba),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(ya.setFromSpherical(this._spherical),ya.applyQuaternion(this._quatInverse),t.copy(this.target).add(ya),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=ya.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new X(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new X(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=ya.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(ga.origin.copy(this.object.position),ga.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ga.direction))<va?this.object.lookAt(this.target):(_a.setFromNormalAndCoplanarPoint(this.object.up,this.target),ga.intersectPlane(_a,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Sa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sa||this._lastTargetPosition.distanceToSquared(this.target)>Sa?(this.dispatchEvent(pa),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?ba/60/60*this.autoRotateSpeed:ba/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ya.setFromMatrixColumn(t,0),ya.multiplyScalar(-e),this._panOffset.add(ya)}_panUp(e,t){this.screenSpacePanning===!0?ya.setFromMatrixColumn(t,1):(ya.setFromMatrixColumn(t,0),ya.crossVectors(this.object.up,ya)),ya.multiplyScalar(e),this._panOffset.add(ya)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;ya.copy(r).sub(this.target);let i=ya.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ba*this._rotateDelta.x/t.clientHeight),this._rotateUp(ba*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ba*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ba*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ba*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ba*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ba*this._rotateDelta.x/t.clientHeight),this._rotateUp(ba*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new dt,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function wa(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),this._isTrackingPointer(e)||(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Ta(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Ea(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(ha),this.state=xa.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function Da(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=xa.DOLLY;break;case pe.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=xa.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=xa.ROTATE}break;case pe.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=xa.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=xa.PAN}break;default:this.state=xa.NONE}this.state!==xa.NONE&&this.dispatchEvent(ma)}function Oa(e){switch(this.state){case xa.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case xa.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case xa.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function ka(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===xa.NONE&&(e.preventDefault(),this.dispatchEvent(ma),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(ha))}function Aa(e){this.enabled!==!1&&this._handleKeyDown(e)}function ja(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case t.ROTATE:if(this.enableRotate===!1){this.state=xa.NONE;break}this._handleTouchStartRotate(e),this.state=xa.TOUCH_ROTATE;break;case t.PAN:if(this.enablePan===!1){this.state=xa.NONE;break}this._handleTouchStartPan(e),this.state=xa.TOUCH_PAN;break;default:this.state=xa.NONE}break;case 2:switch(this.touches.TWO){case t.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=xa.TOUCH_DOLLY_PAN;break;case t.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=xa.TOUCH_DOLLY_ROTATE;break;default:this.state=xa.NONE}break;default:this.state=xa.NONE}this.state!==xa.NONE&&this.dispatchEvent(ma)}function Ma(e){switch(this._trackPointer(e),this.state){case xa.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case xa.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case xa.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case xa.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=xa.NONE}}function Na(e){this.enabled!==!1&&e.preventDefault()}function Pa(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Fa(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Ia=Object.freeze({min:.38,max:9,default:1,mapEnter:.68,mapExit:.82,closeEnter:2.4,closeExit:2,follow:3.2,followExit:2,mapBlendStart:1,mapBlendEnd:.78,detailPrefetch:.35}),La=Ia.follow;function Ra(e,t=Ia.default){let n=typeof t==`number`&&Number.isFinite(t)?t:Ia.default,r=typeof e==`number`&&!Number.isNaN(e)?e:n;return Math.max(Ia.min,Math.min(Ia.max,r))}function za(e,t=`world`){let n=Ra(e);return t===`map`&&n<Ia.mapExit?`map`:t===`close`&&n>Ia.closeExit?`close`:n<=Ia.mapEnter?`map`:n>=Ia.closeEnter?`close`:`world`}function Ba(e){let t=Ra(e),n=Math.max(0,Math.min(1,(Ia.mapBlendStart-t)/(Ia.mapBlendStart-Ia.mapBlendEnd)));return n*n*(3-2*n)}function Va(e){return Ra(e)<Ia.followExit}function Ha({viewWidth:e,viewHeight:t,spanWidth:n,spanHeight:r,padding:i=.15,fallback:a=La}={}){if(![e,t,n,r].every(e=>typeof e==`number`&&Number.isFinite(e)&&e>0))return Ra(a);let o=1+2*(typeof i==`number`&&Number.isFinite(i)?Math.max(0,i):.15);return Ra(Math.min(e/(n*o),t/(r*o)),a)}function Ua(e,t,n,r=!1){if(r)return t;let i=Math.max(0,Number.isFinite(n)?n:0);if(!i||e===t)return e;let a=Math.log(e),o=Math.log(t),s=Math.abs(o-a),c=1.8,l=c/14,u=Math.max(0,(s-l)/c),d=i<=u?c*i:s-Math.min(s,l)*Math.exp(-14*(i-u)),f=Math.exp(a+Math.sign(o-a)*d);return Math.abs(f-t)<1e-6?t:f}var Wa=Object.freeze({railCore:3,cityReferenceRadius:16.5,trainWidth:6,trainLength:15}),Ga=5.5,Ka=e=>(1.75+Math.max(1,Math.min(10,Math.round(Number(e)||1)))*.12)*Wa.cityReferenceRadius/2.5;function qa(e=1){let t=Math.max(0,Math.min(1,(e-.5)/.3));return t*t*(3-2*t)}function Ja(e,t){let n=e.onBeforeCompile,r=e.customProgramCacheKey();return e.onBeforeCompile=(r,i)=>{n.call(e,r,i),r.uniforms.mapNetworkVisibility=t,r.fragmentShader=`uniform float mapNetworkVisibility;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (mapNetworkVisibility < 1.0) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (mapNetworkVisibility <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`${r}|map-network-visibility-v1`,e}function Ya(e,t){let n=Math.max(0,Math.min(1,(t-.6)/.6)),r=n*n*(3-2*n),i=new Map,a=new Map,o=Math.max(1,...e.map(e=>e.radius*2+2.5));for(let t of e){if(!t.visible||r===0){a.set(t.id,1);continue}let e=Math.floor(t.x/o),n=Math.floor(t.y/o),s=(t.previous??1)>.5?1:2.5,c=!1;for(let r=-1;r<=1&&!c;r++)for(let a=-1;a<=1&&!c;a++)for(let o of i.get(`${e+r}:${n+a}`)??[])if(Math.hypot(t.x-o.x,t.y-o.y)<t.radius+o.radius+s){c=!0;break}if(a.set(t.id,c?1-r:1),!c){let r=`${e}:${n}`;i.has(r)||i.set(r,[]),i.get(r).push(t)}}return a}function Xa(e,t=1,n=1){return e>0?{routeScale:e*Wa.railCore/.42,cityScale:e*Wa.cityReferenceRadius/(2.5*t),trainScaleX:Math.max(1,e*Wa.trainWidth/(1.22*n)),trainScaleZ:Math.max(1,e*Wa.trainLength/2.45)}:{routeScale:1,cityScale:1,trainScaleX:1,trainScaleZ:1}}var Za=(e,t,n)=>n?1:1-Math.exp(-e*t),Qa=e=>e.parts[Math.floor(e.parts.length/2)],$a=1.968,eo=.48,to=Math.PI/4,no=85*Math.PI/180,ro=(e,t)=>g.euclideanModulo(e+Math.PI*t,2*Math.PI*t)-Math.PI*t;function io({canvas:e,camera:n,scene:r,mapScene:i,reducedMotion:o,getTrains:s,getWorldRoot:c,getWorld:l=()=>null,onPause:u,onRegenerate:d,isDetailReady:f=()=>!0}){let p=n.clone(),m=n.clone(),h=n.clone(),_=n.clone(),v=n.clone(),y=n.clone(),b=n.clone(),x=new X(0,1.3,0),S=0,C=[_,y],w=new Ca(p,e);Object.assign(w,{enableDamping:!0,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,minZoom:Ia.min,maxZoom:Ia.max,minPolarAngle:to,maxPolarAngle:to}),w.target.set(0,1.3,0),w.update();let T=`world`,E=0,D=null,O=null,k=null,A=!0,j=1,M=new X,N=new X,P=null,F=null,I=!1,ee=0,L=null,R=new Set,z=new Set,ne=new te;ne.firstHitOnly=!0;let B=[],re=new X,H=new dt,ie=new X,ae=new oe,se=new X,U=new X,le=new V,ue=new X,de=new X,fe=new X,W=new X,me=new X,he=new X,ge=new X,_e=new X,ve=new dt,ye=new dt,be=new dt,xe={x:0,z:0},Se=new X,Ce=new X,G=new WeakMap,we={},Te=new ce(.94,1,64);Te.rotateX(-Math.PI/2);let Ee=new a({color:Z.trim,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!0,side:2}),De=new Y(Te,Ee),K=new Y(Te,Ee.clone());K.material.toneMapped=!1,De.visible=K.visible=!1,r.add(De),i.add(K),De.renderOrder=3,K.renderOrder=10;function Oe(){let e=l(),t=Ct(e);if(!t)return;if(t.complete){U.set(ro(w.target.x,t.radius)-w.target.x,0,g.clamp(w.target.z,-t.radius*no,t.radius*no)-w.target.z),w.target.add(U),p.position.add(U);return}let n=G.get(e);if(!n){if(e.outline?.length){let t=e.outline.map(e=>e[0]),r=e.outline.map(e=>e[1]);n={left:Math.min(...t),right:Math.max(...t),top:Math.min(...r),bottom:Math.max(...r)}}else if(e.bounds)n={left:-e.bounds.width/2,right:e.bounds.width/2,top:-e.bounds.depth/2,bottom:e.bounds.depth/2};else return;let t=Math.max(8,Math.min(n.right-n.left,n.bottom-n.top)*.05);n.left-=t,n.right+=t,n.top-=t,n.bottom+=t,G.set(e,n)}U.set(g.clamp(w.target.x,n.left,n.right)-w.target.x,0,g.clamp(w.target.z,n.top,n.bottom)-w.target.z),w.target.add(U),p.position.add(U)}function ke(e,t,n=p,r=w.target){e.copy(n),ae.setFromVector3(ie.copy(n.position).sub(r));let i=Ct(l());return ae.phi=g.lerp(to,i&&!i.complete?eo:1e-5,t),e.position.copy(r).add(ie.setFromSpherical(ae)),e.lookAt(r),e.updateMatrixWorld(!0),e}function q(e,t,n=w.target){e.copy(t);let r=l();return Ct(r)&&(Ne(r,n.x,n.z,le),Be(r,n.x,n.y,n.z,ue),de.copy(t.position).sub(n).applyMatrix4(le),e.position.copy(ue).add(de),e.up.copy(t.up).transformDirection(le),e.lookAt(ue)),e.updateMatrixWorld(!0),e}function Ae(){ke(m,E,b,x),q(n,m,x),c()?.scale.set(1,Ct(l())?1:1-E*.985,1)}function J(){let e=w.enableDamping,t=p.zoom;Se.copy(p.position),Ce.copy(w.target),w.enableDamping=!1,w.update(),p.position.copy(Se),w.target.copy(Ce),p.zoom=t,p.updateProjectionMatrix(),w.update(),w.enableDamping=e}function je(){D=null,k=null}let Me=e=>Math.max(Ia.min,Math.min(Ia.max*j,e));function Pe(){return j*Math.max(Ia.follow,Ha({viewWidth:(p.right-p.left)/j,viewHeight:(p.top-p.bottom)/j,spanWidth:40,spanHeight:32,padding:.1}))}function Fe(e){e?.state.active&&(Je(),J(),D=e,O=null,k=Pe(),o.matches&&(p.zoom=k,p.updateProjectionMatrix(),k=null))}function Ie(){je(),Je(),O=null,J(),p.position.copy(M),w.target.copy(N),p.zoom=1,p.updateProjectionMatrix(),w.update(),Oe(),b.copy(p),x.copy(w.target),b.updateProjectionMatrix(),E=Ba(b.zoom/j),T=za(b.zoom/j),De.visible=K.visible=!1,Ge(),Ae(),Le()}function Le(){let t={view:T,following:D?.state.id??``,zoom:b.zoom.toFixed(3),requestedZoom:p.zoom.toFixed(3),detailLoading:String(E<1&&!f()),mapBlend:E.toFixed(3)};for(let n in t)we[n]!==t[n]&&(e.dataset[n]=we[n]=t[n])}function Re(e,t=Qa(e),r=re){let i=l(),a=t.position;return Ct(i)?Be(i,a.x,E>.7?$a:a.y+.8,a.z,r):(r.copy(a),r.y=E>.7?.3:(a.y+.8)*(c()?.scale.y??1)),r.project(n)}function ze(e,t){if(!e.state.active||E>.7&&qa(n.zoom)===0)return!1;if(!t)return e.parts.some(t=>ze(e,t));if(!t.visible)return!1;let r=Re(e,t);if(Math.abs(r.x)>1.05||Math.abs(r.y)>1.05||r.z<-1||r.z>1||Ct(l())&&(rt(l(),t.position.x,t.position.z,fe),fe.dot(n.getWorldDirection(W))>=0))return!1;if(E>.7)return!0;ne.setFromCamera(H.set(r.x,r.y),n),B.length=0,c()?.traverseVisible(e=>{e.isMesh&&(!e.isInstancedMesh||e.count>0)&&B.push(e)});let i=ne.intersectObjects(B,!1)[0];if(i?.object.userData.instanceTrainIds?.[i.instanceId]===e.state.id)return!0;let a=i?.object;for(;a;){if(a.userData.trainId===e.state.id)return!0;a=a.parent}return!1}function Ve(t,r,i=!1){let a=e.getBoundingClientRect(),o=i?28:17,l=[];c()?.updateMatrixWorld(!0),n.updateMatrixWorld(!0);for(let e of s())if(e.state.active)for(let n of e.parts){let i=Re(e,n);if(i.z<-1||i.z>1)continue;let s=Math.hypot((i.x+1)*a.width/2+a.left-t,(1-i.y)*a.height/2+a.top-r);s<o&&l.push({train:e,part:n,d:s})}l.sort((e,t)=>e.d-t.d);for(let e of l)if(ze(e.train,e.part))return e.train;return null}function He(){let e=[];for(let t of s()){if(!t.state.active)continue;let n=Re(t);Math.abs(n.x)<=1.05&&Math.abs(n.y)<=1.05&&n.z>=-1&&n.z<=1&&e.push({train:t,d:n.x*n.x+n.y*n.y})}e.sort((e,t)=>e.d-t.d);for(let t of e)if(ze(t.train))return t.train}function We(e){let t=s().filter(e=>e.state.active);if(!t.length)return;let n=t.indexOf(D);Fe(t[n<0?e>0?0:t.length-1:(n+e+t.length)%t.length])}function Ge(){let e=E===1&&T===`map`;L!==null&&e!==L&&J(),L=e,w.enabled=A,w.enableRotate=!e,w.enablePan=e&&!D,w.screenSpacePanning=!1,w.mouseButtons.LEFT=e?pe.PAN:pe.ROTATE,w.touches.ONE=e?t.PAN:t.ROTATE,w.touches.TWO=e?t.DOLLY_PAN:t.DOLLY_ROTATE}function Ke(e,t,n){if(!e&&!t)return;je();let r=Ct(l()),i=Math.max(p.right-p.left,p.top-p.bottom)/b.zoom,a=n??(r?.complete?Math.min(r.radius*.95,i*.3):i*.3);if(ge.set(1,0,0).applyQuaternion(m.quaternion),ge.y=0,ge.normalize(),_e.set(0,1,0).applyQuaternion(m.quaternion),_e.y=0,_e.normalize(),U.copy(ge).multiplyScalar(e*a).addScaledVector(_e,-t*a),r?.complete&&r.projection.type===`equirectangular`){let e=r.projection,t=e.centralLatitude*Math.PI/180-w.target.z/e.radius,n=r.radius+w.target.y,i=g.clamp(t-U.z/n,-no,no),a=i-t,o=Math.log(Math.tan(Math.PI/4+i/2)/Math.tan(Math.PI/4+t/2)),s=Math.abs(a)>1e-9?a/o:Math.cos(t);U.x*=e.radius/(n*s),U.z=-a*e.radius}else r&&(Ue(l(),w.target.x,w.target.z,U.x,U.z,xe),U.set(xe.x-w.target.x,0,xe.z-w.target.z));w.target.add(U),p.position.add(U),Oe()}function qe(e){if(ye.set(Number(z.has(`d`))-Number(z.has(`a`)),Number(z.has(`s`))-Number(z.has(`w`))),ye.lengthSq()>1&&ye.normalize(),o.matches)ve.copy(ye),be.copy(ye).multiplyScalar(e);else{let t=ye.lengthSq()?10:14,n=Math.exp(-t*e);be.copy(ve).sub(ye).multiplyScalar((1-n)/t).addScaledVector(ye,e),ve.sub(ye).multiplyScalar(n).add(ye),!ye.lengthSq()&&ve.lengthSq()<1e-24&&ve.set(0,0)}Ke(be.x,be.y)}function Je(){z.clear(),ve.set(0,0),be.set(0,0)}function Ye(e){z.delete(e.key.toLowerCase())}e.addEventListener(`keyup`,Ye),window.addEventListener(`keyup`,Ye),e.addEventListener(`blur`,Je),window.addEventListener(`blur`,Je),e.ownerDocument.addEventListener(`visibilitychange`,()=>{e.ownerDocument.hidden&&Je()}),e.addEventListener(`pointerdown`,e=>{A&&(R.add(e.pointerId),R.size>1&&(I=!0,F=null),e.button===0&&R.size===1&&(F={id:e.pointerId,x:e.clientX,y:e.clientY,moved:!1,touch:e.pointerType===`touch`},I=!1),k=null)},{capture:!0}),e.addEventListener(`pointermove`,e=>{A&&(F?.id===e.pointerId&&Math.hypot(e.clientX-F.x,e.clientY-F.y)>6&&(F.moved=!0),P={x:e.clientX,y:e.clientY,touch:e.pointerType===`touch`})});function Xe(e){if(!A)return;let t=F?.id===e.pointerId&&!F.moved&&!I&&e.type===`pointerup`&&Math.hypot(e.clientX-F.x,e.clientY-F.y)<=6,n=F;if(R.delete(e.pointerId),t){let t=Ve(e.clientX,e.clientY,n.touch);t?Fe(t):je()}R.size||(F=null,I=!1)}window.addEventListener(`pointerup`,Xe),window.addEventListener(`pointercancel`,Xe),e.addEventListener(`pointerleave`,()=>{O=null,P=null,e.style.cursor=D?`default`:`grab`}),e.addEventListener(`wheel`,()=>{k=null},{passive:!0}),e.addEventListener(`dblclick`,()=>{A&&Ie()}),e.addEventListener(`keydown`,e=>{if(!A||e.altKey||e.metaKey||e.ctrlKey)return;let t=!0,n=e.key.toLowerCase();if([`w`,`a`,`s`,`d`].includes(n))z.has(n)||(z.add(n),je(),J());else if(e.key===` `)u();else if(e.key===`Home`)Ie();else if(e.key===`Escape`)je();else if(e.key.toLowerCase()===`r`)d();else if(e.key.toLowerCase()===`f`)Fe(He());else if(e.key===`[`)We(-1);else if(e.key===`]`)We(1);else if([`+`,`=`,`-`,`_`].includes(e.key))k=null,p.zoom=Me(p.zoom*(e.key===`+`||e.key===`=`?1.16:1/1.16)),p.updateProjectionMatrix();else if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)){if(J(),T===`world`&&!D&&(e.key===`ArrowLeft`||e.key===`ArrowRight`)){let t=p.position.clone().sub(w.target),n=new oe().setFromVector3(t);e.key===`ArrowLeft`&&(n.theta-=.08),e.key===`ArrowRight`&&(n.theta+=.08),p.position.copy(w.target).add(new X().setFromSpherical(n))}else Ke(Number(e.key===`ArrowRight`)-Number(e.key===`ArrowLeft`),Number(e.key===`ArrowDown`)-Number(e.key===`ArrowUp`),(p.top-p.bottom)/b.zoom*.045);w.update(),Oe()}else t=!1;t&&e.preventDefault()});function Ze(e){if(A){if(S=e,k!==null&&(p.zoom=g.lerp(p.zoom,k,Za(7,e,o.matches)),Math.abs(p.zoom-k)<.002&&(p.zoom=k,k=null),p.updateProjectionMatrix()),D&&(!D.state.active||k===null&&Va(p.zoom/j))&&(D=null),qe(Math.min(.1,Math.max(0,e))),Ge(),w.update(),D){se.copy(Qa(D).position),se.y=.75;let t=Ct(l());t?.complete&&(se.x=w.target.x+ro(se.x-w.target.x,t.radius)),U.copy(w.target).lerp(se,Za(7,e,o.matches)).sub(w.target),w.target.add(U),p.position.add(U)}Oe()}}function Qe(e){return Ua(b.zoom,p.zoom,e,o.matches)}function $e(t){if(!A)return;let r=Qe(t);b.copy(p),x.copy(w.target),b.zoom=r,b.updateProjectionMatrix(),E=Ba(b.zoom/j),T=za(b.zoom/j,T),Ge(),Ae(),ee+=t,ee>.12&&P&&!P.touch&&!R.size&&!D&&(ee=0,O=Ve(P.x,P.y),e.style.cursor=O?`pointer`:`grab`);let i=D??O;if(De.visible=K.visible=!!i?.state.active,K.visible&&=qa(n.zoom)>0,i){let e=Qa(i);for(let t of[De,K]){let r=l(),a=t===De?.045:Ct(r)?1.6:.6;Ct(r)?(Be(r,e.position.x,a,e.position.z,t.position),rt(r,e.position.x,e.position.z,fe),Et(r,e.position.x,a,e.position.z,Math.sin(e.rotation.y),0,Math.cos(e.rotation.y),me).normalize(),he.crossVectors(fe,me).normalize(),le.makeBasis(he,fe,me),t.quaternion.setFromRotationMatrix(le)):(t.position.set(e.position.x,a,e.position.z),t.rotation.set(0,e.rotation.y,0)),t.scale.set(1.35,1,4.65),t.material.opacity=D?.state.id===i.state.id?.95:.48,t===K&&(t.material.opacity*=qa(n.zoom))}}Le()}return{navigation:p,chartCamera:m,controls:w,reset:Ie,updateNavigation:Ze,updatePresentation:$e,setInputEnabled(e){Je(),je(),O=null,P=null,F=null,R.clear(),J(),A=!!e,w.enabled=A,De.visible=K.visible=!1},overlook(e,{heading:t,zoom:n}={}){Je(),je(),J(),U.set(e.x-w.target.x,(e.y??0)+1.3-w.target.y,e.z-w.target.z),p.position.add(U),w.target.add(U),Number.isFinite(t)&&(ae.setFromVector3(ie.copy(p.position).sub(w.target)),ae.theta=t+Math.PI,ae.phi=to,p.position.copy(w.target).add(ie.setFromSpherical(ae))),p.zoom=Number.isFinite(n)?Me(n):Math.min(p.zoom,j),p.updateProjectionMatrix(),w.update(),Oe(),b.copy(p),x.copy(w.target),E=Ba(b.zoom/j),T=za(b.zoom/j),Ge(),Ae(),Le()},update(e){Ze(e),$e(e)},get coverageCamera(){return ke(h,0),h.zoom=Math.max(Ia.mapBlendEnd*j,b.zoom),h.updateProjectionMatrix(),q(_,h)},get coverageCameras(){this.coverageCamera;let e=Ia.mapBlendEnd*j,t=Qe(S);return t<e?(y.copy(_),C):(ke(v,Ba(t/j)),v.zoom=t,v.updateProjectionMatrix(),q(y,v),C)},setScale(e){j=Math.max(1,Number(e)||1),w.maxZoom=Ia.max*j},get zoomScale(){return j},get wantsDetail(){return p.zoom/j>Ia.detailPrefetch||E<1||D!==null},get waitingForDetail(){return!1},get renderTarget(){return x},setHome(){M.copy(p.position),N.copy(w.target),Ie()},get mode(){return T},get blend(){return E},get selected(){return D?.state.id??null}}}function ao(e,t){return e.onBeforeCompile=e=>{e.uniforms.detailReveal=t,e.fragmentShader=`uniform float detailReveal;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (detailReveal < 0.9999) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (detailReveal <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`streamed-detail-reveal-v1`,e}function oo(e){return ao(new Xe({depthPacking:kt,side:1}),e)}function so(t){let n={type:lt,depthBuffer:!0,samples:2},r=new De(1,1,n),i=new De(1,1,n),a=new M({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{worldTexture:{value:r.texture},mapTexture:{value:i.texture},blend:{value:0},toneMappingExposure:{value:t.toneMappingExposure}},vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,fragmentShader:`varying vec2 vUv;
      uniform sampler2D worldTexture;
      uniform sampler2D mapTexture;
      uniform float blend;
      #include <tonemapping_pars_fragment>
      void main(){
        vec3 worldColor=ACESFilmicToneMapping(texture2D(worldTexture,vUv).rgb);
        vec3 mapColor=texture2D(mapTexture,vUv).rgb;
        gl_FragColor=vec4(mix(worldColor,mapColor,blend),1.0);
        #include <colorspace_fragment>
      }`}),o=new x,s=new Y(new xe(2,2),a);s.frustumCulled=!1,o.add(s);let c=new Je,l,u=!1;function d(){if(l)return l;let t=new Ze;t.setAttribute(`position`,new e([0,0,0,1,0,0,0,0,1],3)),t.setAttribute(`normal`,new e([0,1,0,0,1,0,0,1,0],3)),t.setAttribute(`color`,new e([1,1,1,1,1,1,1,1,1],3));let n=[0,2].map(e=>new Y(t,ao(new ie({side:e,flatShading:!0,vertexColors:!0}),{value:1})));n.push(new Tt(t,new ie({side:0,flatShading:!0,vertexColors:!0}),1));for(let e of n)e.castShadow=!0,e.receiveShadow=!0;let r=[1,2].map(e=>{let n=oo({value:1});return n.side=e,new Y(t,n)});return r.push(new Tt(t,new Xe({side:1}),1)),l={geometry:t,surfaces:n,depths:r}}let f=1,p=1,m=1,h=1;function g(){(f!==m||p!==h)&&(r.setSize(f,p),i.setSize(f,p),m=f,h=p,t.initRenderTarget(r),t.initRenderTarget(i))}function _(e,n){let r=t.getRenderTarget(),i=t.getActiveCubeFace?.()??0,a=t.getActiveMipmapLevel?.()??0;try{return t.setRenderTarget(e),n()}finally{t.setRenderTarget(r,i,a)}}function v(e,n){let r=[];try{e.traverse(e=>{e.visible&&(e.isMesh||e.isLine||e.isPoints||e.isSprite)&&(r.push(e),e.visible=!1)}),t.render(e,n)}finally{for(let e of r)e.visible=!0}}return{resize(e,t){f=e,p=t},async prepare(e,n,a){let s=t.shadowMap.enabled;_(r,()=>{g(),e&&a&&v(e,a)});function l(e,n,r,i){let a=t.shadowMap.enabled;try{return t.shadowMap.enabled=s,_(e,()=>t.compileAsync(n,r,i))}finally{t.shadowMap.enabled=a}}if(e&&a&&await l(r,e,a),e&&a)for(let t of d().surfaces)await l(r,t,a,e);if(e&&s){let t;if(e.traverseVisible(e=>{!t&&e.castShadow&&e.isDirectionalLight&&(t=e.shadow.camera)}),t)for(let n of d().depths)await l(r,n,t,e)}if(n&&a&&await l(i,n,a),await l(null,o,c),e&&a&&await l(null,e,a),e&&a)for(let t of d().surfaces)await l(null,t,a,e)},render(e,n,s,l){l<=.001?(t.setRenderTarget(null),t.render(e,s)):l>=.999?(t.setRenderTarget(null),t.render(n,s)):(g(),t.setRenderTarget(r),t.render(e,s),t.setRenderTarget(i),t.render(n,s),t.setRenderTarget(null),a.uniforms.blend.value=l,t.render(o,c))},dispose(){if(!u&&(u=!0,r.dispose(),i.dispose(),s.geometry.dispose(),a.dispose(),l)){l.geometry.dispose();for(let e of[...l.surfaces,...l.depths])e.material.dispose(),e.isInstancedMesh&&e.dispose();l=void 0}}}}function co(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ze;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=lo(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=lo(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function lo(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new B(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var uo=(e,t,n=0)=>({minX:e-n,minZ:t-n,maxX:e+n,maxZ:t+n}),fo=(e,t)=>e.minX<=t.maxX&&e.maxX>=t.minX&&e.minZ<=t.maxZ&&e.maxZ>=t.minZ;function po(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a.x),n=Math.min(n,a.z),r=Math.max(r,a.x),i=Math.max(i,a.z);return{minX:t,minZ:n,maxX:r,maxZ:i}}function mo(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let{box:a}of e)t=Math.min(t,a.minX),n=Math.min(n,a.minZ),r=Math.max(r,a.maxX),i=Math.max(i,a.maxZ);return{minX:t,minZ:n,maxX:r,maxZ:i}}var ho=(e,t,n)=>Math.hypot(Math.max(e.minX-t,0,t-e.maxX),Math.max(e.minZ-n,0,n-e.maxZ)),go=class{constructor(e,t=e=>e){this.items=e;let n=e=>{if(!e.length)return null;let t=mo(e);if(e.length<=8)return{box:t,entries:e};let r=t.maxX-t.minX>=t.maxZ-t.minZ?`X`:`Z`;e.sort((e,t)=>e.box[`min${r}`]+e.box[`max${r}`]-(t.box[`min${r}`]+t.box[`max${r}`]));let i=e.length>>1;return{box:t,left:n(e.slice(0,i)),right:n(e.slice(i))}};this.root=n(e.map(e=>({item:e,box:t(e)})))}query(e){let t=[],n=r=>{if(r&&fo(r.box,e)){if(r.entries)for(let n of r.entries)fo(n.box,e)&&t.push(n.item);else n(r.left),n(r.right)}};return n(this.root),t}nearest(e,t,n,r=1/0,i=0){let a=r,o=r=>{if(!(!r||ho(r.box,e,t)-i>a)){if(r.entries)for(let o of r.entries)ho(o.box,e,t)-i<=a&&(a=Math.min(a,n(o.item)));else ho(r.left.box,e,t)<ho(r.right.box,e,t)?(o(r.left),o(r.right)):(o(r.right),o(r.left))}};return o(this.root),a}},_o=class{constructor(e=24){this.size=e,this.cells=new Map}insert(e,t){let n={item:e,box:t};for(let e=Math.floor(t.minX/this.size);e<=Math.floor(t.maxX/this.size);e++)for(let r=Math.floor(t.minZ/this.size);r<=Math.floor(t.maxZ/this.size);r++){let t=`${e},${r}`;this.cells.has(t)||this.cells.set(t,[]),this.cells.get(t).push(n)}}query(e){let t=new Set,n=[];for(let r=Math.floor(e.minX/this.size);r<=Math.floor(e.maxX/this.size);r++)for(let i=Math.floor(e.minZ/this.size);i<=Math.floor(e.maxZ/this.size);i++)for(let a of this.cells.get(`${r},${i}`)??[])!t.has(a)&&fo(a.box,e)&&(t.add(a),n.push(a.item));return n}},vo=new WeakMap;function yo(e){let t=vo.get(e);if(!t||t.count!==e.length){let n=e.flatMap((e,t)=>e.points.slice(1).map((n,r)=>{let i=e.points[r],a=po([i,n]);return{a:i,b:n,index:r,line:e,lineIndex:t,box:a,...a}}));t={count:e.length,tree:new go(n,e=>e.box)},vo.set(e,t)}return t.tree}var bo=new WeakMap,xo=e=>po(e.map(([e,t])=>({x:e,z:t})));function So(e){if(!bo.has(e)){let t=e.map(e=>({polygon:e,box:xo(e[0]),holes:new go(e.slice(1),xo)}));bo.set(e,new go(t,e=>e.box))}return bo.get(e)}function Co(e,t){if(!e?.length)return[];let n=So(e).query(t).map(({polygon:e,holes:n})=>[e[0],...n.query(t)]);if(!n.length)return[];let r=[[[t.minX,t.minZ],[t.maxX,t.minZ],[t.maxX,t.maxZ],[t.minX,t.maxZ],[t.minX,t.minZ]]];return Qt.intersection(n,[r])}var wo=Object.freeze([`farmland`,`forest`,`plains`,`desert`,`ocean`,`mountain`]),To=.9,Eo=wo.slice(0,4),Do=1e-7,Oo=new WeakMap,ko=new WeakMap,Ao=new WeakMap;function jo(e){return Ao.has(e)||Ao.set(e,{bounds:po(e.map(([e,t])=>({x:e,z:t}))),edges:null,tree:null}),Ao.get(e)}function Mo(e,t){t.edges||(t.edges=e.map((t,n)=>{let r=e[(n+e.length-1)%e.length];return{a:r,b:t,box:po([{x:r[0],z:r[1]},{x:t[0],z:t[1]}])}}),e.length>32&&(t.tree=new go(t.edges,e=>e.box)))}function No(e){if(!ko.has(e)){let t=e.map(e=>({polygon:e,box:jo(e[0]).bounds,holes:new go(e.slice(1),e=>jo(e).bounds)}));ko.set(e,{polygons:new go(t,e=>e.box),edges:null})}return ko.get(e)}function Po(e){let t=No(e);if(!t.edges){let n=[];for(let t of e)for(let e of t)for(let t=1;t<e.length;t++){let r=e[t-1],i=e[t];n.push({a:r,b:i,box:po([{x:r[0],z:r[1]},{x:i[0],z:i[1]}])})}t.edges=new go(n,e=>e.box)}return t.edges}function Fo(e){let t=2166136261;for(let n of`biomes:${e}`)t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Io(e,t){if(!e)throw TypeError(`Invalid biomes: ${t}`)}function Lo(e){let t=e.map(e=>[Number(e[0]),Number(e[1])]);return t.length&&(t[0][0]!==t.at(-1)[0]||t[0][1]!==t.at(-1)[1])&&t.push([...t[0]]),t}function Ro(e){return e.map(e=>e.map(e=>e.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6])))}function zo(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t/2}function Bo(e){return e.reduce((e,t)=>e+Math.abs(zo(t[0]))-t.slice(1).reduce((e,t)=>e+Math.abs(zo(t)),0),0)}function Vo(e,t,n,r){let i=r[0]-n[0],a=r[1]-n[1],o=Math.max(0,Math.min(1,((e-n[0])*i+(t-n[1])*a)/(i*i+a*a||1)));return Math.hypot(e-n[0]-o*i,t-n[1]-o*a)}function Ho(e,t,n){let r=jo(e),i=r.bounds;if(t<i.minX-Do||t>i.maxX+Do||n<i.minZ-Do||n>i.maxZ+Do)return!1;Mo(e,r);let a=!1,o=r.tree?r.tree.query({minX:t-Do,maxX:1/0,minZ:n-Do,maxZ:n+Do}):r.edges;for(let{a:e,b:r,box:i}of o){if(t>=i.minX-Do&&t<=i.maxX+Do&&n>=i.minZ-Do&&n<=i.maxZ+Do&&Vo(t,n,e,r)<Do)return!0;e[1]>n!=r[1]>n&&t<(r[0]-e[0])*(n-e[1])/(r[1]-e[1])+e[0]&&(a=!a)}return a}function Uo(e,t,n){let r=uo(t,n,Do);return No(e).polygons.query(r).some(({polygon:e,holes:i})=>Ho(e[0],t,n)&&!i.query(r).some(e=>Ho(e,t,n)))}function Wo(e,t,n){let r=Po(e).nearest(t,n,e=>Vo(t,n,e.a,e.b));return Uo(e,t,n)?r:-r}function Go(e,t,n,r=32){return Lo(Array.from({length:r},(i,a)=>[e+Math.cos(a/r*Math.PI*2)*n,t+Math.sin(a/r*Math.PI*2)*n]))}function Ko(e,t){if(!e.length)return[];let n=[e];for(let r of e)for(let e of r)for(let r=1;r<e.length;r++){let i=e[r-1],a=e[r],o=Math.hypot(a[0]-i[0],a[1]-i[1]);if(o<Do)continue;let s=-(a[1]-i[1])/o*t,c=(a[0]-i[0])/o*t;n.push([[Lo([[i[0]+s,i[1]+c],[a[0]+s,a[1]+c],[a[0]-s,a[1]-c],[i[0]-s,i[1]-c]])]]),n.push([[Go(i[0],i[1],t/Math.cos(Math.PI/12),12)]])}return Qt.union(...n)}function qo(e,t,n){return yo(e.lines??[]).nearest(t,n,e=>Vo(t,n,[e.a.x,e.a.z],[e.b.x,e.b.z]))}function Jo(e,t,n,r){let i=.9500000000000001;return(e.cities||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+(e.radius||0)+i+1)||(e.stations||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+e.radius+i+.5)||(e.mountains||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+e.radius+i+.5)?!1:qo(e,t,n)>=r+i+1.8}function Yo(e,t,n){let r=e.outline,i=Math.sign(zo(r)),a=Math.min(e.bounds.width,e.bounds.depth),o=null;for(let s of[1,.84,.68,.52,.36]){let c=a*.19*s;for(let a=0;a<r.length;a++){let s=r[a],l=r[(a+1)%r.length],u=Math.hypot(l[0]-s[0],l[1]-s[1]);if(u<Do)continue;let d=(l[1]-s[1])/u*i,f=-(l[0]-s[0])/u*i;for(let r of[.2,.35,.5,.65,.8]){let i=r+(n()-.5)*.035,a=s[0]+(l[0]-s[0])*i+d*c*.28,u=s[1]+(l[1]-s[1])*i+f*c*.28;if(!Jo(e,a,u,c))continue;let p=Qt.intersection(t,[[Go(a,u,c)]]),m=Bo(p);(!o||m>o.score)&&(o={polygons:p,score:m})}}if(o)break}return o?.polygons||[]}function Xo(e,t,n,r){let i=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]);return i(e,t,n)*i(e,t,r)<0&&i(n,r,e)*i(n,r,t)<0}function Zo(e,t){let n=1/0;for(let r=1;r<e.points.length;r++){let i=[e.points[r-1].x,e.points[r-1].z],a=[e.points[r].x,e.points[r].z];if(Uo(t,...i)||Uo(t,...a))return 0;for(let e of t)for(let t of e)for(let e=1;e<t.length;e++){let r=t[e-1],o=t[e];if(Xo(i,a,r,o))return 0;n=Math.min(n,Vo(...i,r,o),Vo(...a,r,o),Vo(...r,i,a),Vo(...o,i,a))}}return n}function Qo(e,t,n){Io(Array.isArray(n.points)&&n.points.length>=3&&n.points.every(e=>Array.isArray(e)&&e.length>=2&&e.every(Number.isFinite)),`ocean.points requires at least three finite [x,z] coordinates`);let r=Lo(n.points);Io(Math.abs(zo(r))>Do,`ocean polygon must have positive area`);let i=Qt.intersection(t,[[r]]);Io(i.length>0,`ocean polygon must intersect the island`);let a=Lo(e.outline);Io(i.some(e=>e[0].some(e=>a.slice(1).some((t,n)=>Vo(...e,a[n],t)<1e-5))),`ocean must connect to the coast`);let o=.9500000000000001;for(let t of e.cities||[])Io(Wo(i,t.x,t.z)<=-(t.radius||0)-o-1,`ocean and shore must stay outside city footprints`);for(let t of e.mountains||[])Io(Wo(i,t.x,t.z)<=-t.radius-o-.5,`ocean and shore must stay outside mountain footprints`);for(let t of e.stations||[])Io(Wo(i,t.x,t.z)<=-t.radius-o-.5,`ocean and shore must stay outside station footprints`);for(let t of e.lines||[])Io(Zo(t,i)>=2.75,`ocean and shore must stay outside complete railway corridors`);return i}function $o(e,t,n,r){let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=o[0]*t+o[1]*n-r,l=s[0]*t+s[1]*n-r;if(c<=Do&&i.push(o),c<=Do!=l<=Do){let e=c/(c-l);i.push([o[0]+(s[0]-o[0])*e,o[1]+(s[1]-o[1])*e])}}return i}function es(e,t,n){if(t.sites!==void 0){Io(Array.isArray(t.sites)&&t.sites.length>0,`sites must contain at least one land biome`);let n=t.sites.map((e,t)=>({...e,id:String(e.id??`biome-${t+1}`)}));Io(n.every(e=>Eo.includes(e.type)&&Number.isFinite(e.x)&&Number.isFinite(e.z)),`sites need a farmland, forest, plains or desert type and finite x/z`),Io(new Set(n.map(e=>e.id)).size===n.length,`site IDs must be unique`);for(let t=0;t<n.length;t++){Io(Ho(e.outline,n[t].x,n[t].z),`sites must lie inside the island`);for(let e=0;e<t;e++)Io(Math.hypot(n[t].x-n[e].x,n[t].z-n[e].z)>Do,`sites must have distinct positions`)}return n}return[[`farmland`,-.24,.15],[`forest`,-.26,-.24],[`plains`,.06,.24],[`desert`,.29,-.14]].map(([t,r,i])=>({id:`biome-${t}`,type:t,x:(r+(n()-.5)*.09)*e.bounds.width,z:(i+(n()-.5)*.09)*e.bounds.depth}))}function ts(e,t={}){Io(t&&typeof t==`object`&&!Array.isArray(t),`configuration must be an object`),Io(Array.isArray(e.outline)&&e.outline.length>=3,`a valid world outline is required`);let n=Fo(e.seed),r=[[Lo(e.outline)]],i=es(e,t,n),a=t.geography,o=a?Qt.intersection(r,a.ocean):t.ocean===!1?[]:t.ocean===void 0?Yo(e,r,n):Qo(e,r,t.ocean),s=!a&&o.length?Qt.intersection(r,Ko(o,To)):[],c=a?Qt.intersection(r,a.oceanShore):o.length?Qt.difference(s,o):[],l=a?Qt.intersection(r,a.landInterior):s.length?Qt.difference(r,s):r,u=(e.mountains||[]).map(e=>[[Lo(e.range?.polygon??Go(e.x,e.z,e.radius,48)),...(e.range?.holes??[]).map(Lo)]]),d=u.length?Qt.intersection(l,Qt.union(...u)):[],f=d.length?Qt.difference(l,d):l,p=e.outline.map(e=>e[0]),m=e.outline.map(e=>e[1]),h=[[Math.min(...p)-1,Math.min(...m)-1],[Math.max(...p)+1,Math.min(...m)-1],[Math.max(...p)+1,Math.max(...m)+1],[Math.min(...p)-1,Math.max(...m)+1]],g=[],_=[];for(let t of i){let n=h;for(let e of i)if(e!==t&&(n=$o(n,e.x-t.x,e.z-t.z,(e.x*e.x+e.z*e.z-t.x*t.x-t.z*t.z)/2),n.length<3))break;let r=n.length>=3?Qt.intersection(f,[[Lo(n)]]):[];if(r.length&&g.push({id:t.id,type:t.type,...t.ice===!0?{ice:!0}:{},polygons:r}),e.surface?.complete&&t.ice===!0&&n.length>=3){let e=d.length?Qt.intersection(l,[[Lo(n)]]):r;e.length&&_.push(e)}}return d.length&&g.push({id:`biome-mountain`,type:`mountain`,polygons:d}),o.length&&g.push({id:`biome-ocean`,type:`ocean`,polygons:o}),a?.lakes?.length&&g.push({id:`biome-lakes`,type:`ocean`,polygons:a.lakes}),{regions:g.map(e=>({...e,polygons:Ro(e.polygons)})),..._.length?{ice:Ro(Qt.union(..._))}:{},land:Ro(l),ocean:Ro(o),oceanShore:Ro(c),lakeShore:Ro(a?.lakeShore??[]),shoreWidth:To,sites:i}}function ns(e){return e.biomes||e}function rs(e,t){let n=ns(e),r=[...new Set(Array.isArray(t)?t:[t])].sort(),i=Oo.get(n);i||(i=new Map,Oo.set(n,i));let a=r.join(`|`);if(!i.has(a)){let e=r.flatMap(e=>e===`shore`?[n.oceanShore,n.lakeShore]:e===`ice`?[n.ice]:n.regions.filter(t=>t.type===e).map(e=>e.polygons)).filter(e=>e?.length);i.set(a,e.length?Qt.union(...e):[])}return i.get(a)}var is=e=>e.surface?.complete&&e.surface.projection?.type===`equirectangular`?e.surface.projection:null;function as(e,t){let n=is(e);if(!n)return t;let r=Math.PI*n.radius,i=r*2;return t>=-r&&t<r?t:((t+r)%i+i)%i-r}function os(e,t,n,r,i){let a=is(e);if(!a)return t;let o=Math.PI*a.radius,s=o*2;if(n-i>-o&&n+i<o)return t;if(i>=s)return[];let c=uo(n,r,i+Math.max(1e-5,i*1e-6)),l=[],u=Math.ceil((c.minX-o)/s),d=Math.floor((c.maxX+o)/s);for(let e=u;e<=d;e++){let n=e*s,r=Co(t,{...c,minX:c.minX-n,maxX:c.maxX-n});r.length&&l.push(r.map(e=>e.map(e=>e.map(([e,t])=>[(Math.abs(e-o)<1e-6?o:Math.abs(e+o)<1e-6?-o:e)+n,t]))))}return l.length?Qt.union(...l):[]}function ss(e,t,n){t=as(e,t);let r=ns(e);for(let e of r.regions)if(Uo(e.polygons,t,n))return e.type;return Uo(r.oceanShore,t,n)||Uo(r.lakeShore??[],t,n)?`shore`:null}function cs(e,t,n,r){return Wo(rs(e,t),as(e,n),r)}function ls(e,t,n,r,i=0){if(!Number.isFinite(i)||i<0)return!1;n=as(e,n);let a=os(e,rs(e,t),n,r,i),o=i-Do;return o<=0?Wo(a,n,r)>=o:Uo(a,n,r)?Po(a).nearest(n,r,e=>Vo(n,r,e.a,e.b),o)>=o:!1}var us=Math.PI*2,ds=1e-8,fs=e=>(e%us+us)%us,ps=(e,t,n)=>Math.max(t,Math.min(n,e)),ms=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),hs=e=>Number.isFinite(e.heading)?e.heading:Math.atan2(e.tangent.z,e.tangent.x);function gs(e,t,n=.42,r={}){let i=ms(e,t);return i<ds?null:{...r,type:`line`,start:{x:e.x,y:n,z:e.z},end:{x:t.x,y:n,z:t.z},heading:Math.atan2(t.z-e.z,t.x-e.x),length:i,curvature:0}}function _s(e,t,n,r,i,a){let o=Math.atan2(t.z-e.z,t.x-e.x),s=r*fs(r*(Math.atan2(n.z-e.z,n.x-e.x)-o));return Math.abs(s)>us-1e-7&&(s=0),Math.abs(s)<ds?null:{type:`arc`,center:{x:e.x,z:e.z},radius:i,startAngle:o,sweep:s,start:{x:t.x,y:a,z:t.z},end:{x:n.x,y:a,z:n.z},length:Math.abs(s)*i,curvature:r/i}}function vs(e,t,n,r){return{x:e.x-Math.sin(t)*n*r,z:e.z+Math.cos(t)*n*r}}function ys(e,t){let n=0,r=e.filter(Boolean).map(e=>{let t={...e,startDistance:n};return n+=e.length,{...t,endDistance:n}});return{segments:r,length:n,minRadius:t,maxCurvature:r.reduce((e,t)=>Math.max(e,Math.abs(t.curvature)),0)}}function bs(e,t,{radius:n=8,y:r=.42}={}){if(!Number.isFinite(n)||n<=0)throw TypeError(`Railway minimum turning radius must be positive and finite`);let i=hs(e),a=hs(t),o=[],s=e=>{let r=ys(e,n);if(r.length<ds)return;let i=Ss(r,r.length);ms(i,t)>1e-5||Math.cos(i.heading-a)<1-1e-7||o.push(r)};for(let o of[-1,1])for(let c of[-1,1]){let l=vs(e,i,o,n),u=vs(t,a,c,n),d=ms(l,u);if(d<ds){o===c&&s([_s(l,e,t,o,n,r)]);continue}let f=Math.atan2(u.z-l.z,u.x-l.x);if(o!==c){if(d<2*n-ds)continue;f+=Math.asin(ps(2*o*n/d,-1,1))}let p={x:l.x+o*Math.sin(f)*n,z:l.z-o*Math.cos(f)*n},m={x:u.x+c*Math.sin(f)*n,z:u.z-c*Math.cos(f)*n};s([_s(l,e,p,o,n,r),gs(p,m,r),_s(u,m,t,c,n,r)])}for(let o of[-1,1]){let c=vs(e,i,o,n),l=vs(t,a,o,n),u=ms(c,l);if(u<ds||u>4*n)continue;let d=(c.x+l.x)/2,f=(c.z+l.z)/2,p=Math.sqrt(Math.max(0,4*n*n-u*u/4)),m=-(l.z-c.z)/u,h=(l.x-c.x)/u;for(let i of[-1,1]){let a={x:d+m*p*i,z:f+h*p*i},u={x:(c.x+a.x)/2,z:(c.z+a.z)/2},g={x:(l.x+a.x)/2,z:(l.z+a.z)/2};s([_s(c,e,u,o,n,r),_s(a,u,g,-o,n,r),_s(l,g,t,o,n,r)])}}return o.sort((e,t)=>e.length-t.length)}function xs(e,t,n){let r=ps(t,0,e.length),i=e.segments;if(!i.length)throw TypeError(`An alignment must contain a nonzero segment`);let a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;i[e].endDistance<r-ds?a=e+1:o=e}let s=i[a],c=ps(r-s.startDistance,0,s.length)/s.length,l,u,d;if(s.type===`line`)l=s.start.x+(s.end.x-s.start.x)*c,u=s.start.z+(s.end.z-s.start.z)*c,d=s.heading;else{let e=s.startAngle+s.sweep*c;l=s.center.x+Math.cos(e)*s.radius,u=s.center.z+Math.sin(e)*s.radius,d=e+Math.sign(s.sweep)*Math.PI/2}let f=n.tangent??={x:0,y:0,z:0},p=Math.cos(d),m=Math.sin(d);if(n.chartSpeed=1,s.chartTransform){let e=s.chartTransform,t=e.x+e.xx*l+e.xz*u,r=e.z+e.zx*l+e.zz*u,i=e.xx*p+e.xz*m,a=e.zx*p+e.zz*m,o=Math.hypot(i,a);l=t,u=r,p=i/o,m=a/o,d=Math.atan2(m,p),n.chartSpeed=o}return f.x=p,f.y=0,f.z=m,n.x=l,n.y=s.start.y,n.z=u,n.distance=r,n.heading=d,n.angle=Math.atan2(f.x,f.z),n.curvature=s.curvature,n}function Ss(e,t){return xs(e,t,{tangent:{x:0,y:0,z:0}})}function Cs(e,t=.35){let n=[],r=[];for(let i of e.segments){let a=Math.max(1,Math.ceil(i.length/t));for(let t=0;t<a;t++){let o=i.startDistance+i.length*t/a;if(r.length&&o-r.at(-1)<ds)continue;let s=Ss(e,o);n.push({x:s.x,y:s.y,z:s.z}),r.push(o)}}let i=Ss(e,e.length);return n.push({x:i.x,y:i.y,z:i.z}),r.push(e.length),{points:n,distances:r,length:e.length}}function ws(e,t=8){return ys(e.flatMap(e=>e?.segments??(e?[e]:[])),t)}function Ts(e,t,{radius:n=8,y:r=.42,waypoints:i=[],isAllowed:a=()=>!0}={}){let o=[e,...i,t],s=o.map((e,t)=>{if(t===0||t===o.length-1)return{...e,heading:hs(e)};if(Number.isFinite(e.heading))return e;let n=o[t-1],r=o[t+1];return{...e,heading:Math.atan2(r.z-n.z,r.x-n.x)}}),c=[];for(let e=1;e<s.length;e++){if(ms(s[e-1],s[e])<ds)continue;let t=bs(s[e-1],s[e],{radius:n,y:r}).find(e=>e.segments.every(e=>e.type!==`arc`||Math.abs(e.sweep)<=Math.PI+1e-7)&&e.segments.reduce((e,t)=>e+(t.type===`arc`?Math.abs(t.sweep):0),0)<=Math.PI*1.5+1e-7&&Cs(e,.45).points.every(a));if(!t)throw TypeError(`Invalid world: waypoints cannot fit the outline and minimum turning radius without a railway loop`);c.push(t)}let l=ws(c,n);if(!l.segments.length)throw TypeError(`Invalid world: railway alignment has no length`);return l}var Es=new WeakMap,Ds=Math.PI*2,Os=16;function ks(e){let t=2166136261;for(let n of e)t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function As(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function js(e){return`${e.id??`mountain`}:${e.x}:${e.z}:${e.radius}:${e.height}`}function Ms(e){if(e.range)return $t(e,e.renderBounds);let t=js(e),n=Es.get(e);if(n?.key===t)return n.data;let r=ks(t),i=r()*Ds,a=i+.72,o=i+3.65,s=[],c=[],l=[.21,.44,.7,1],u=Array.from({length:Os},(e,t)=>i+t/Os*Ds+(r()-.5)*.15),d=u.map(()=>.86+r()*.14),f={x:e.x+Math.cos(i-.3)*e.radius*.075,y:e.height,z:e.z+Math.sin(i-.3)*e.radius*.075};s.push(f);for(let t=0;t<l.length;t++)for(let n=0;n<Os;n++){let i=u[n],c=Math.max(Math.exp(-((As(i,a)/.43)**2)),.88*Math.exp(-((As(i,o)/.47)**2))),f=l[t]*(t===3?d[n]:.91+r()*.15),p=t===0?.67+r()*.12-c*.04:t===1?.41+c*.39+r()*.055:t===2?.16+c*.2+r()*.065:0,m=i+(t===3?0:Math.sin(n*1.7+t)*.035);s.push({x:e.x+Math.cos(m)*e.radius*f,y:e.height*p,z:e.z+Math.sin(m)*e.radius*f})}let p=(e,t,n)=>{let r=s[e],i=s[t],a=s[n],o=(i.z-r.z)*(a.x-r.x)-(i.x-r.x)*(a.z-r.z);c.push(o>0?[e,t,n]:[e,n,t])};for(let e=0;e<Os;e++)p(0,1+e,1+(e+1)%Os);for(let e=0;e<l.length-1;e++)for(let t=0;t<Os;t++){let n=(t+1)%Os,r=1+e*Os,i=r+Os;(t+e)%2?(p(r+t,i+t,r+n),p(r+n,i+t,i+n)):(p(r+t,i+t,i+n),p(r+t,i+n,r+n))}let m=s.length;s.push({x:e.x,y:0,z:e.z});let h=c.map(e=>[...e]),g=1+(l.length-1)*Os;for(let e=0;e<Os;e++)h.push([m,g+e,g+(e+1)%Os]);let _=c.map(([e,t,n])=>{let r=s[e],i=s[t],a=s[n];return{p:r,q:i,r:a,minX:Math.min(r.x,i.x,a.x),maxX:Math.max(r.x,i.x,a.x),minZ:Math.min(r.z,i.z,a.z),maxZ:Math.max(r.z,i.z,a.z),denominator:(i.z-a.z)*(r.x-a.x)+(a.x-i.x)*(r.z-a.z)}}),v={vertices:s,triangles:h,surfaceTriangles:c,snowLine:e.height*.64,phase:i};return Es.set(e,{key:t,data:v,lookup:_}),v}function Ns(e,t,n){if(e.range)return Jt(e,t,n);if(Math.hypot(t-e.x,n-e.z)>e.radius+1e-7)return 0;Ms(e);for(let{p:r,q:i,r:a,minX:o,maxX:s,minZ:c,maxZ:l,denominator:u}of Es.get(e).lookup){if(t<o-1e-8||t>s+1e-8||n<c-1e-8||n>l+1e-8)continue;let e=((i.z-a.z)*(t-a.x)+(a.x-i.x)*(n-a.z))/u,d=((a.z-r.z)*(t-a.x)+(r.x-a.x)*(n-a.z))/u,f=1-e-d;if(e>=-1e-7&&d>=-1e-7&&f>=-1e-7)return Math.max(0,e*r.y+d*i.y+f*a.y)}return 0}function Ps(e,t,n){if(e.range)return Xt(e,t,n);let{phase:r}=Ms(e),i=Math.atan2(n-e.z,t-e.x);return e.height*(.72+.045*Math.sin(i*3+r)+.025*Math.sin(i*7-r))}function Fs(e,t,n){return e.range?Zt(e,t,n):Math.hypot(t-e.x,n-e.z)-e.radius}var Is=Object.freeze([Object.freeze({id:`coral`,name:`Coral Railway`,color:Object.freeze({l:.65,c:.18,h:28})}),Object.freeze({id:`teal`,name:`Teal Railway`,color:Object.freeze({l:.64,c:.12,h:185})}),Object.freeze({id:`gold`,name:`Golden Railway`,color:Object.freeze({l:.75,c:.15,h:83})}),Object.freeze({id:`blue`,name:`Blue Railway`,color:Object.freeze({l:.61,c:.16,h:255})})]),Ls=e=>{throw TypeError(`Invalid world: ${e}`)},Rs=(e,t,n)=>Math.max(t,Math.min(n,e));function zs(e){if(typeof e==`string`&&/^#[\da-f]{6}$/i.test(e)){let[t,n,r]=[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255).map(e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*r),a=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*r),o=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*r),s=.2104542553*i+.793617785*a-.0040720468*o,c=1.9779984951*i-2.428592205*a+.4505937099*o,l=.0259040371*i+.7827717662*a-.808675766*o;return{l:Rs(s,0,1),c:Math.min(.4,Math.hypot(c,l)),h:(Math.atan2(l,c)*180/Math.PI+360)%360}}return(!e||typeof e!=`object`||![e.l,e.c,e.h].every(Number.isFinite)||e.l<0||e.l>1||e.c<0||e.c>.4)&&Ls(`player colors require OKLCH {l:0..1,c:0..0.4,h:finite} or #RRGGBB`),{l:e.l,c:e.c,h:(e.h%360+360)%360}}function Bs(e=Is){(!Array.isArray(e)||e.length<1)&&Ls(`at least one player is required`);let t=e.map((e,t)=>{e&&typeof e==`object`||Ls(`players require objects`);let n=String(e.id??`player-${t+1}`);return n.trim()||Ls(`player IDs must not be empty`),{id:n,name:String(e.name??`Railway ${t+1}`),color:zs(e.color??Is[t%4].color)}});return new Set(t.map(e=>e.id)).size!==t.length&&Ls(`player IDs must be unique`),t}function Vs(e,t){let n=2166136261;for(let r of`${e}:city:${t}`)n=Math.imul(n^r.charCodeAt(0),16777619);return()=>{n+=1831565813;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Hs(e){(!Number.isInteger(e)||e<1||e>10)&&Ls(`city levels must be integers from 1 through 10`);let t=[`house`];return e>=2&&t.push(`landmark`),e>=4&&t.push(`apartment`,`plaza`),e>=6&&t.push(`civic`),e>=8&&t.push(`tower`),{radius:[9,10.5,12,13.5,16,19,22,25,28,31][e-1],buildingBudget:[6,10,15,21,28,36,45,55,67,80][e-1],streetWidth:e>=7?.72:e>=4?.62:.52,streetSpacing:e>=4?7.8:5.4,features:t}}var Us=Object.freeze({house:1.56,landmark:2,apartment:2.05,civic:2.8,plaza:2.6,tower:2.1}),Ws=new WeakMap,Gs=1e-8,Ks=1.6;function qs(e,t){let n=e.surface??null,r=t.scale??1,i=t.rotation??0,a=t.y??0,o=Ws.get(t);if(o&&o.surface===n&&o.x===t.x&&o.z===t.z&&o.y===a&&o.rotation===i&&o.scale===r&&o.width===t.width&&o.depth===t.depth&&o.outline===t.footprint)return o;let s=t.footprint??[[-t.width/2,-t.depth/2],[t.width/2,-t.depth/2],[t.width/2,t.depth/2],[-t.width/2,t.depth/2]],c=Ke(e,t.x,a,t.z,i,new V).elements,l=new Float64Array(s.length*3);for(let e=0;e<s.length;e++){let t=s[e][0]*r,n=s[e][1]*r;l[e*3]=c[0]*t+c[8]*n+c[12],l[e*3+1]=c[1]*t+c[9]*n+c[13],l[e*3+2]=c[2]*t+c[10]*n+c[14]}return o={surface:n,x:t.x,y:a,z:t.z,rotation:i,scale:r,width:t.width,depth:t.depth,outline:t.footprint,points:l,up:[c[4],c[5],c[6]],center:[c[12],c[13],c[14]]},Ws.set(t,o),o}function Js(e,t,n,r){let i=new Float64Array(e.length/3*2);for(let a=0,o=0;a<e.length;a+=3,o+=2){let s=e[a]-t[0],c=e[a+1]-t[1],l=e[a+2]-t[2];i[o]=s*n[0]+c*n[1]+l*n[2],i[o+1]=s*r[0]+c*r[1]+l*r[2]}return i}function Ys(e,t,n){for(let r of[e,t])for(let i=0;i<r.length;i+=2){let a=(i+2)%r.length,o=r[a]-r[i],s=r[a+1]-r[i+1],c=Math.hypot(o,s);if(c<Gs)continue;let l=-s/c,u=o/c,d=1/0,f=-1/0,p=1/0,m=-1/0;for(let t=0;t<e.length;t+=2){let n=e[t]*l+e[t+1]*u;d=Math.min(d,n),f=Math.max(f,n)}for(let e=0;e<t.length;e+=2){let n=t[e]*l+t[e+1]*u;p=Math.min(p,n),m=Math.max(m,n)}if(p-f>=n-Gs||d-m>=n-Gs)return!0}return!1}function Xs(e,t,n,r=0){let i=Math.max(0,r),a=t.radius??Math.hypot(t.width,t.depth)*(t.scale??1)/2,o=n.radius??Math.hypot(n.width,n.depth)*(n.scale??1)/2,s=et(e,t,n);if(s>=a+o+i)return!1;let c=qs(e,t),l=qs(e,n),u=c.center.map((e,t)=>(e+l.center[t])/2),d=c.up.map((e,t)=>e+l.up[t]),f=Math.hypot(...d);if(f<Gs)return!0;for(let e=0;e<3;e++)d[e]/=f;let p=Math.abs(d[1])<.9?[d[2],0,-d[0]]:[0,-d[2],d[1]],m=Math.hypot(...p);p=p.map(e=>e/m);let h=[p[1]*d[2]-p[2]*d[1],p[2]*d[0]-p[0]*d[2],p[0]*d[1]-p[1]*d[0]],g=e.surface?.radius,_=g?2*Ks*Math.sin(Math.min(Math.PI/2,s/(2*g)))+(a+o)*(1-Math.cos(Math.min(Math.PI/2,(a+o)/g))):0;return!Ys(Js(c.points,u,p,h),Js(l.points,u,p,h),i+_)}function Zs(e){let t=(Number(e)||1)>>>0;return()=>(t=Math.imul(t,1664525)+1013904223|0,(t>>>0)/4294967296)}function Qs(e,t=0){let n=(Math.trunc(e.variant??t)%3+3)%3;return e.detailSeed??(n+1)*7117}function $s(e){let t=e.width/2,n=e.depth/2,r=e.polygon??[[-t,-n],[t,-n],[t,n],[-t,n]],i=r.reduce((e,t,n)=>{let i=r[(n+1)%r.length];return e+t[0]*i[1]-i[0]*t[1]},0);if(Math.abs(i)<1e-8)throw TypeError(`Farm polygons must enclose a nonzero area`);let a=i<0?r.toReversed():r;for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=a[(e+2)%a.length];if((n[0]-t[0])*(r[1]-n[1])-(n[1]-t[1])*(r[0]-n[0])<-1e-8)throw TypeError(`Farm polygons must be convex`)}return a}function ec(e,t,n,r=0){for(let i=0;i<e.length;i++){let a=e[i],o=e[(i+1)%e.length],s=o[0]-a[0],c=o[1]-a[1];if(s*(n-a[1])-c*(t-a[0])<r*Math.hypot(s,c)-1e-8)return!1}return!0}function tc(e,t,n,r){if(!t)return null;let i=e.reduce((t,n)=>[t[0]+n[0]/e.length,t[1]+n[1]/e.length],[0,0]),a=t===`barn`?1.42:t===`bales`?.84:.7,o=Array.isArray(n)&&n.length===2&&n.every(Number.isFinite)?[n]:[],s=Math.floor(r()*e.length);for(let t of[.22,.38,.55,.72])for(let n=0;n<e.length;n++){let r=e[(s+n)%e.length];o.push(r.map((e,n)=>e+(i[n]-e)*t))}o.push(i);let c=o.find(t=>ec(e,...t,a));return c?{center:c,radius:a}:null}var nc=.7;function rc(e){let t=[];for(let[n,r]of(e.parcels??[]).entries()){if(r.crop!==`pasture`)continue;let i=$s(r),a=Qs(r,e.variant),o=tc(i,r.feature,r.featurePosition,Zs(a)),s=Zs(a^2050289553),c=Math.abs(i.reduce((e,t,n)=>{let r=i[(n+1)%i.length];return e+t[0]*r[1]-r[0]*t[1]},0))/2,l=Math.max(2,Math.min(6,Math.round(c/42))),u=[],d=Array.from({length:80},()=>({x:(s()-.5)*r.width,z:(s()-.5)*r.depth,priority:s()*5})),f=o?.center??i.reduce((e,t)=>[e[0]+t[0]/i.length,e[1]+t[1]/i.length],[0,0]);d.sort((e,t)=>Math.hypot(e.x-f[0],e.z-f[1])+e.priority-Math.hypot(t.x-f[0],t.z-f[1])-t.priority);for(let e of[1.1+s()*.35,.65])for(let a of d){if(u.length>=l)break;let c=e+nc;if(!ec(i,a.x,a.z,c+.3)||o&&Math.hypot(a.x-o.center[0],a.z-o.center[1])<c+o.radius+.2||u.some(e=>Math.hypot(a.x-e.x,a.z-e.z)<c+e.radius+.25))continue;let d={kind:`sheep`,parcelIndex:n,x:a.x,z:a.z,rotation:s()*Math.PI*2,scale:1,radius:c,roamRadius:e};u.push(d),t.push({...d,x:a.x+r.x,z:a.z+r.z})}}return t}function ic(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var ac=e=>Math.abs(e.reduce((t,n,r)=>{let i=e[(r+1)%e.length];return t+n[0]*i[1]-i[0]*n[1]},0)/2);function oc(e){return e.reduce((e,t)=>e+ac(t[0])-t.slice(1).reduce((e,t)=>e+ac(t),0),0)}var sc=e=>({minX:Math.min(...e.map(e=>e[0])),maxX:Math.max(...e.map(e=>e[0])),minZ:Math.min(...e.map(e=>e[1])),maxZ:Math.max(...e.map(e=>e[1]))});function cc(e,t,n,r){let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=o[0]*t+o[1]*n-r,l=s[0]*t+s[1]*n-r;if(c<=0&&i.push(o),c<0!=l<0){let e=c/(c-l);i.push([o[0]+(s[0]-o[0])*e,o[1]+(s[1]-o[1])*e])}}return i}var lc=[[`wheat`,`fallow`,`pasture`],[`pasture`,`wheat`,`orchard`],[`orchard`,`pasture`,`wheat`],[`vegetables`,`wheat`,`pasture`]];function uc(e,t,n){let r=ic(`${n}:boundary`),i=e/2-.12,a=t/2-.12,o=()=>.25+r()*Math.min(e,t)*.16;return[[-i+o(),-a],[i-o(),-a],[i,-a+o()],[i,a-o()],[i-o(),a],[-i+o(),a],[-i,a-o()],[-i,-a+o()]]}function dc(e,t,n,r,i){let a=ic(n),o=[i],s=Math.max(1,Math.min(6,Math.round(e*t/(100+a()*65))));for(let e=0;o.length<s&&e<s*5;e++){let e=o.reduce((e,t,n)=>ac(t)>ac(o[e])?n:e,0),t=o[e],n=sc(t),r=(n.maxX-n.minX)*(a()*.45+.8)>n.maxZ-n.minZ,i=(a()-.5)*.65,s=r?1:i,c=r?i:1,l=t.map(([e,t])=>e*s+t*c),u=Math.min(...l),d=u+(Math.max(...l)-u)*(.28+a()*.44),f=.24+a()*.16,p=cc(t,s,c,d-f/2),m=cc(t,-s,-c,-d-f/2);p.length<3||m.length<3||Math.min(ac(p),ac(m))<26||o.splice(e,1,p,m)}return o.map((e,t)=>{let n=sc(e),i=(n.minX+n.maxX)/2,o=(n.minZ+n.maxZ)/2,s=a()<.72?r[0]:r[1+Math.floor(a()*2)],c=Math.floor(a()*1e8),l=e.reduce((t,n)=>[t[0]+n[0]/e.length,t[1]+n[1]/e.length],[0,0]),u=Math.floor(a()*e.length),d=e[u],f=e[(u+1)%e.length],p=[l[0]*.5+(d[0]+f[0])*.25-i,l[1]*.5+(d[1]+f[1])*.25-o];return{x:i,z:o,width:n.maxX-n.minX,depth:n.maxZ-n.minZ,polygon:e.map(([e,t])=>[e-i,t-o]),crop:s,variant:Math.floor(a()*3),rowsAngle:(a()<.2?0:Math.PI/2)+(a()-.5)*.12,rowPitch:.72+a()*.38,tone:.25+a()*.5,detailSeed:c,featurePosition:p,hedgeEdges:e.map((e,t)=>t).filter(()=>a()<.16),feature:t===0&&ac(e)>85&&a()<.2?`barn`:s===`wheat`&&a()<.17?`bales`:s===`pasture`&&a()<.12?`trough`:null}})}function fc(e,{density:t=1,canPlace:n,add:r}={}){if(typeof n!=`function`||typeof r!=`function`)throw TypeError(`Farmland requires canPlace and add callbacks`);let i=(e.biomes?.regions??[]).filter(e=>e.type===`farmland`),a=e.detailRegion,o=i.reduce((e,t)=>e+oc(t.polygons),0),s=a?Math.min(o,(a.maxX-a.minX)*(a.maxZ-a.minZ)):o,c=Math.max(0,Math.min(3,Number(t)||0)),l={districts:[],area:0,cultivatedArea:0,targetArea:s*Math.min(.5,.28*c)};if(!c||!s)return l;let u=[];for(let t of i){let n=ic(`${e.seed}:farmland:${t.id}`),r=(n()-.5)*Math.PI/3,i=Math.cos(r),o=Math.sin(r),s=n()*56,c=n()*56,l=sc(t.polygons.flatMap(e=>e[0]));if(a&&(l.minX=Math.max(l.minX,a.minX),l.maxX=Math.min(l.maxX,a.maxX),l.minZ=Math.max(l.minZ,a.minZ),l.maxZ=Math.min(l.maxZ,a.maxZ)),l.maxX<=l.minX||l.maxZ<=l.minZ)continue;let d=sc([[l.minX,l.minZ],[l.maxX,l.minZ],[l.maxX,l.maxZ],[l.minX,l.maxZ]].map(([e,t])=>[e*i-t*o,e*o+t*i]));for(let n=Math.floor((d.minX-s-38)/56);n<=Math.ceil((d.maxX-s+38)/56);n++)for(let a=Math.floor((d.minZ-c-38)/56);a<=Math.ceil((d.maxZ-c+38)/56);a++){let d=`${t.id}-${n}-${a}`,f=ic(`${e.seed}:farm-cluster:${d}`),p=n*56+s+(f()-.5)*12,m=a*56+c+(f()-.5)*12,h=p*i+m*o,g=-p*o+m*i,_=r+(f()-.5)*.22,v=f()*Math.PI*2,y=lc[Math.floor(f()*lc.length)],b=f()*4;if(!(h<l.minX-38||h>l.maxX+38||g<l.minZ-38||g>l.maxZ+38))for(let t=0;t<28;t++){let n=v+t*2.399963229728653,r=6.2*Math.sqrt(t),i=h+Math.cos(n)*r,a=g+Math.sin(n)*r;if(i<l.minX||i>l.maxX||a<l.minZ||a>l.maxZ)continue;let o=cs(e,`farmland`,i,a);if(o<4.1)continue;let s=ic(`${e.seed}:${d}:${t}`);u.push({x:i,z:a,rotation:at(e,i,a,_),clusterId:d,family:y,clearance:o,seed:`${e.seed}:${d}:${t}`,width:22+s()*8,depth:16+s()*8,score:b+Math.min(o,18)*.18-r*.21})}}}u.sort((e,t)=>t.score-e.score||e.x-t.x||e.z-t.z);for(let t of[1,.7,.46])for(let i of u){if(l.area>=l.targetArea)return l;if(i.used)continue;let a=i.width*t,o=i.depth*t,s=Math.hypot(a,o)/2,c=uc(a,o,i.seed),u=null,d=1/0;for(let t of l.districts){let n=et(e,i,t);n<d&&n<s+t.radius+10&&(u=t,d=n)}let f=[];if(u){let t=je(e,u,i),n=ut(e,u.x,u.z,u.rotation),r=Math.cos(n),s=Math.sin(n),c=t.x*r-t.z*s,l=t.x*s+t.z*r,d=e.surface?.type===`sphere`?.65:.44,p=(e,t)=>Math.max(-t,Math.min(t,e)),m=[[(a+u.width)/2+d,p(l,u.depth*.3)],[-(a+u.width)/2-d,p(l,u.depth*.3)],[p(c,u.width*.3),(o+u.depth)/2+d],[p(c,u.width*.3),-(o+u.depth)/2-d]];m.sort((e,t)=>Math.hypot(e[0]-c,e[1]-l)-Math.hypot(t[0]-c,t[1]-l));for(let[t,i]of m){let a=Ue(e,u.x,u.z,t*r+i*s,-t*s+i*r);f.push({...a,rotation:at(e,a.x,a.z,n),clusterId:u.clusterId,family:u.family})}}f.push(i);let p;for(let t of f){let r=`farm-${i.clusterId}-${i.seed.split(`:`).at(-1)}`,u={kind:`farm`,x:t.x,y:0,z:t.z,width:a,depth:o,radius:s,scale:1,rotation:t.rotation,variant:0,districtId:r,clusterId:t.clusterId,footprint:c};if(!l.districts.some(t=>Xs(e,u,t,.32))&&ls(e,`farmland`,t.x,t.z,ct(e,t.x,t.z,s))&&n(u)){u.family=t.family??i.family,u.parcels=dc(a,o,i.seed,u.family,c),u.livestock=rc(u),p=u;break}}p&&(r(p),i.used=!0,l.districts.push({kind:`farm`,id:p.districtId,clusterId:p.clusterId,x:p.x,z:p.z,width:a,depth:o,radius:s,footprint:c,family:p.family,rotation:p.rotation,parcelCount:p.parcels.length}),l.area+=a*o,l.cultivatedArea+=p.parcels.reduce((e,t)=>e+ac(t.polygon),0))}return l}var pc=new WeakMap,mc=new WeakMap;function hc(e){let t=e=>{let t=[];for(let[n,r]of e){let e=[Math.round(n*1e6)/1e6,Math.round(r*1e6)/1e6],i=t.at(-1);i&&e[0]===i[0]&&e[1]===i[1]||t.push(e)}if(t.length>1&&t[0][0]===t.at(-1)[0]&&t[0][1]===t.at(-1)[1]&&t.pop(),t.length<3)return null;let[n,r]=t,i=r[0]-n[0],a=r[1]-n[1];return t.slice(2).some(e=>Math.abs(i*(e[1]-n[1])-a*(e[0]-n[0]))>1e-12)?[...t,[...t[0]]]:null};return e.flatMap(e=>{let n=t(e[0]);return n?[[n,...e.slice(1).map(t).filter(Boolean)]]:[]})}function gc(e){return e.rivers?e.rivers:(pc.has(e)||pc.set(e,e.river?[e.river]:[]),pc.get(e))}function _c(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Math.max(0,Math.min(1,((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1)));return Math.hypot(e-n.x-i*o,t-n.z-a*o)}function vc(e,t,n){let r=gc(e);mc.has(r)||mc.set(r,Math.max(0,...r.map(e=>e.width/2)));let i=mc.get(r);return yo(r).nearest(t,n,e=>_c(t,n,e.a,e.b)-e.line.width/2,1/0,i)}function yc(e,t,n){return yo(gc(e)).nearest(t,n,e=>_c(t,n,e.a,e.b))}function bc(e,t){let n=[],r=[];e.forEach((i,a)=>{let o=e[Math.max(0,a-1)],s=e[Math.min(e.length-1,a+1)],c=Math.hypot(s.x-o.x,s.z-o.z)||1,l=(s.z-o.z)/c*t/2,u=-(s.x-o.x)/c*t/2;n.push([i.x+l,i.z+u]),r.push([i.x-l,i.z-u])});let i=n.concat(r.reverse());return[...i,i[0]]}function xc(e){let t=[[e.outline]],n=gc(e),r=n.map(e=>hc([[bc(e.points,e.width)]])),i=n.map(e=>hc([[bc(e.points,e.width+1.6)]]));if(e.lakes?.length&&(r.push(e.lakes),i.push(e.lakes,e.lakeShore??[])),!r.length)return{water:[],banks:[]};let a=hc(Qt.intersection(t,hc(Qt.union(...r)))),o=hc(Qt.intersection(t,hc(Qt.union(...i))));return{water:hc(a),banks:hc(Qt.difference(o,a))}}var Sc=new WeakMap;function Cc(e){let t=e.terrainSource??e,n=t.hydrology;if(n||=(Sc.has(t)||Sc.set(t,xc(t)),Sc.get(t)),!e.terrainChunk)return n;let r=[[e.outline]],i=e.bounds?Co(n.water,e.bounds):n.water,a=e.bounds?Co(n.banks,e.bounds):n.banks;return{water:hc(Qt.intersection(i,r)),banks:hc(Qt.intersection(a,r))}}function wc(e,t,n,r){let i=e.surface?.projection;if(i?.type!==`equirectangular`)return[uo(t,n,r)];let a=Math.PI*i.radius,o=a*2;if(r>=a)return[{minX:-a,maxX:a,minZ:n-r,maxZ:n+r}];let s=t>=-a&&t<a?t:((t+a)%o+o)%o-a,c=uo(s,n,r),l=[c];return c.minX<=-a&&l.push(uo(s+o,n,r)),c.maxX>=a&&l.push(uo(s-o,n,r)),l}function Tc(e,t){let{a:n,b:r}=e,i=0,a=1;for(let[e,o,s,c]of[[n.x,r.x-n.x,t.minX,t.maxX],[n.z,r.z-n.z,t.minZ,t.maxZ]]){if(Math.abs(o)<1e-14){if(e<s||e>c)return null;continue}let t=(s-e)/o,n=(c-e)/o;if(i=Math.max(i,Math.min(t,n)),a=Math.min(a,Math.max(t,n)),i>a)return null}return i===0&&a===1?e:{a:{x:n.x+(r.x-n.x)*i,z:n.z+(r.z-n.z)*i},b:{x:n.x+(r.x-n.x)*a,z:n.z+(r.z-n.z)*a}}}function Ec(e,t,n,r,i){let a=[];for(let o of wc(e,n,r,i))for(let e of t.query(o)){let t=Tc(e,o);t&&a.push(t)}return a}var Dc=new WeakMap,Oc=new X,kc=(e,t,n)=>Math.max(t,Math.min(n,e));function Ac(e,t){let n=Ct(e);if(!n)return null;let r=t.alignment??t.points,i=Dc.get(r);i||(i=new WeakMap,Dc.set(r,i));let a=i.get(n);if(a)return a;let o=t.distances?.length?t.distances:[0,t.length],s=[0];for(let e=1;e<o.length;e++){let t=o[e-1],n=o[e],r=Math.max(1,Math.ceil((n-t)/.5));for(let e=1;e<=r;e++)s.push(t+(n-t)*e/r)}let c=new Float64Array(s.length),l=new Float64Array(s.length),u=n=>{let r=hl(t,n);return Et(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,Oc).length()*(r.chartSpeed??1)};l[0]=u(0);for(let e=1;e<s.length;e++)l[e]=u(s[e]),c[e]=c[e-1]+(s[e]-s[e-1])*(l[e-1]+4*u((s[e-1]+s[e])/2)+l[e])/6;return a={chart:Float64Array.from(s),physical:c,speed:l,length:c.at(-1),chartLength:t.length},i.set(n,a),a}function jc(e,t){let n=0,r=e.length-1;for(;n+1<r;){let i=n+r>>1;e[i]<=t?n=i:r=i}return n}function Mc(e,t,n){let r=e.chart[t+1]-e.chart[t],i=e.physical[t],a=e.physical[t+1],o=e.speed[t]*r,s=e.speed[t+1]*r;return i+n*(o+n*(3*(a-i)-2*o-s+n*(2*(i-a)+o+s)))}function Nc(e,t){if(!e)return t;let n=kc(t,0,e.chartLength),r=jc(e.chart,n);return Mc(e,r,(n-e.chart[r])/(e.chart[r+1]-e.chart[r]))}function Pc(e,t){if(!e)return t;let n=kc(t,0,e.length),r=jc(e.physical,n),i=e.physical[r],a=e.physical[r+1],o=e.chart[r+1]-e.chart[r],s=e.speed[r]*o,c=e.speed[r+1]*o,l=(n-i)/(a-i||1);for(let t=0;t<3;t++){let t=s+l*(2*(3*(a-i)-2*s-c)+3*l*(2*(i-a)+s+c));if(t<1e-12)break;l=kc(l-(Mc(e,r,l)-n)/t,0,1)}return e.chart[r]+o*l}function Fc(e,t,n){if(!Ct(e))return n;let r=new X,i=new X,a=1;for(let n of t){Et(e,n.x,0,n.z,1,0,0,r),Et(e,n.x,0,n.z,0,0,1,i);let t=r.lengthSq(),o=r.dot(i),s=i.lengthSq(),c=Math.hypot(t-s,2*o),l=Math.max(1e-8,(t+s-c)/2),u=Math.sqrt((t+s+c)/2);a=Math.max(a,u/l)}return n*a*(1.025+n*a/Ct(e).radius*2)}function Ic(e,t,n){let r;try{return Ts(e,t,n)}catch(e){r=e}let i=n.waypoints??[];if(n.world)try{return Lc(n.world,e,t,n)}catch{}if(!i.length)throw r;let a=[e,...i,t],o=a.map((e,t)=>{if(t===0||t===a.length-1||Number.isFinite(e.heading))return[{pose:e,penalty:0}];let r=Math.atan2(a[t+1].z-a[t-1].z,a[t+1].x-a[t-1].x);return Array.from({length:31},(t,i)=>{let a=(i-15)*.1;return{pose:{...e,heading:r+a},penalty:Math.abs(a)*n.radius*.05}})}),s=o[0].map(e=>({...e,cost:0,parts:[]}));for(let e=1;e<o.length;e++){let t=[];for(let r of o[e]){let e=null;for(let t of s){let i;try{i=Ts(t.pose,r.pose,{...n,waypoints:[]})}catch{continue}let a=t.cost+i.length+r.penalty;(!e||a<e.cost)&&(e={...r,cost:a,parts:[...t.parts,i]})}e&&t.push(e)}if(!t.length)throw r;s=t}return s.sort((e,t)=>e.cost-t.cost),ws(s[0].parts,n.radius)}function Lc(e,t,n,r){let i=[t,...r.waypoints??[],n],a={x:(t.x+n.x)/2,z:(t.z+n.z)/2},o=Ne(e,a.x,a.z,new V),s=Rc(o,0),c=Rc(o,2),l=Et(e,a.x,0,a.z,1,0,0,new X),u=Et(e,a.x,0,a.z,0,0,1,new X),d=l.dot(s),f=u.dot(s),p=l.dot(c),m=u.dot(c),h=d*m-f*p;if(Math.abs(h)<1e-8)throw RangeError(`A railway cannot use a singular pole chart`);let g={x:a.x,z:a.z,xx:m/h,xz:-f/h,zx:-p/h,zz:d/h},_=e=>{let t=e.x-a.x,n=e.z-a.z,r={...e,x:d*t+f*n,z:p*t+m*n};return Number.isFinite(e.heading)&&(r.heading=Math.atan2(p*Math.cos(e.heading)+m*Math.sin(e.heading),d*Math.cos(e.heading)+f*Math.sin(e.heading))),r},v=1;for(let t of i){Et(e,t.x,0,t.z,g.xx,0,g.zx,l),Et(e,t.x,0,t.z,g.xz,0,g.zz,u);let n=l.lengthSq(),r=l.dot(u),i=u.lengthSq(),a=Math.hypot(n-i,2*r);v=Math.max(v,Math.sqrt((n+i+a)/2)/Math.max(1e-8,(n+i-a)/2))}let y=r.physicalRadius??r.radius,b=y*v*(1.015+y*v/e.surface.radius*2),x=r.isAllowed??(()=>!0),S=e=>({x:g.x+g.xx*e.x+g.xz*e.z,z:g.z+g.zx*e.x+g.zz*e.z}),C=Ic(_(t),_(n),{...r,world:null,radius:b,waypoints:(r.waypoints??[]).map(_),isAllowed:e=>x(S(e))});for(let e of C.segments)e.chartTransform=g;return C}var Rc=(e,t)=>new X().setFromMatrixColumn(e,t),zc=Object.freeze({seed:27,width:130,depth:95,cityRadius:9.6,riverWidth:5.4,groundY:0,waterY:-1.2,railY:.42,sampleSpacing:.35,minTurnRadius:8,throatLength:4}),$=Object.freeze({trackHalfWidth:1.05,routeEdge:1.35,cuttingHalfWidth:1.08,track:1.45,riverBank:.8,mountain:.35,objects:.32,street:.28,worldEdge:.75,city:1.25,stationOffset:3,stationLength:6.4,stationWidth:2.4,stationEndDistance:7,tunnelRoofHeight:3.9,tunnelArchRadius:1.4,tunnelArchSpring:1.8,tunnelRockCover:.1,bridgeBank:2.2,maximumGrade:.12}),Bc=1e-7,Vc=(e,t,n)=>Math.max(t,Math.min(n,e)),Hc=(e,t,n)=>e+(t-e)*n,Uc=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Wc=(e,t=zc.railY)=>Array.isArray(e)?{x:Number(e[0]),y:t,z:Number(e.length>2?e[2]:e[1])}:{x:Number(e.x),y:t,z:Number(e.z)},Gc=e=>Number.isFinite(e.x)&&Number.isFinite(e.z);function Kc(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function qc(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Vc(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-Hc(n.x,r.x,o),t-Hc(n.z,r.z,o))}var Jc=new WeakMap,Yc=new WeakMap,Xc=new WeakMap;function Zc(e){return e.points.slice(1).flatMap((t,n)=>{let r=e.points[n],i=e.period;if(i&&Math.abs(t.x-r.x)>i/2){let e=t.x-Math.sign(t.x-r.x)*i,a=Math.sign(r.x)*i/2,o=(a-r.x)/(e-r.x),s={x:a,z:Hc(r.z,t.z,o)},c={...s,x:-a};return[{a:r,b:s,index:n,box:po([r,s])},{a:c,b:t,index:n,box:po([c,t])}]}return[{a:r,b:t,index:n,box:po([r,t])}]})}function Qc(e){let t=Jc.get(e);return t&&t.count===e.points.length||(t={count:e.points.length,tree:new go(Zc(e),e=>e.box),box:po(e.points)},Jc.set(e,t)),t}function $c(e){return yo(e.lines)}function el(e,t,n=0){let r=Yc.get(e);for((!r||r.count>e.length)&&(r={count:0,grid:new _o},Yc.set(e,r));r.count<e.length;){let t=e[r.count++];r.grid.insert(t,uo(t.x,t.z,t.radius??0))}return r.grid.query(uo(t.x,t.z,t.radius+n))}var tl=(e,t,n=t.radius)=>ct(e,t.x,t.z,n);function nl(e,t,n,r=0){if(!e.surface)return el(t,n,r);let i=Xc.get(t);for((!i||i.count>t.length)&&(i={count:0,grid:new _o},Xc.set(t,i));i.count<t.length;){let n=t[i.count++];for(let t of wc(e,n.x,n.z,tl(e,n,n.radius??0)))i.grid.insert(n,t)}let a=wc(e,n.x,n.z,tl(e,n,n.radius+r));return a.length===1?i.grid.query(a[0]):[...new Set(a.flatMap(e=>i.grid.query(e)))]}function rl(e,t,n,r){return qc(0,0,je(e,t,n),je(e,t,r))}function il(e,t,n,r,i=1/0){if(!e.surface)return Math.min(i,ol(t,n,r));let a={x:n,z:r};if(!Number.isFinite(i))for(let n of t.points)i=Math.min(i,et(e,a,n));if(!Number.isFinite(i)||i===0)return i;let o=Ec(e,Qc(t).tree,n,r,tl(e,a,i)),s=i;for(let{a:t,b:n}of o)s=Math.min(s,rl(e,a,t,n));return s}function al(e,t,n,r){if(!e.surface)return Math.min(r,sl(e,t,n));let i={x:t,z:n},a=Ec(e,$c(e),t,n,tl(e,i,r)),o=r;for(let{a:t,b:n}of a)o=Math.min(o,rl(e,i,t,n));return o}function ol(e,t,n){if(e.points.length>32)return Qc(e).tree.nearest(t,n,e=>qc(t,n,e.a,e.b));let r=1/0;for(let i=1;i<e.points.length;i++)r=Math.min(r,qc(t,n,e.points[i-1],e.points[i]));return r}function sl(e,t,n){return $c(e).nearest(t,n,e=>qc(t,n,e.a,e.b))}function cl(e,t,n){return yc(e,t,n)}function ll(e,t,n,r=0){if(e.surface?.complete&&e.surface.projection.type===`equirectangular`){let r=e.surface.projection,i=r.centralLatitude*Math.PI/180-n/r.radius;return Number.isFinite(t)&&Number.isFinite(i)&&Math.abs(i)<=Math.PI/2+1e-10}let i=!1,a=e.outline;for(let e=0,r=a.length-1;e<a.length;r=e++){let o=a[e],s=a[r];o[1]>n!=s[1]>n&&t<(s[0]-o[0])*(n-o[1])/(s[1]-o[1])+o[0]&&(i=!i)}if(!i)return!1;if(r<=0)return!0;for(let e=0;e<a.length;e++){let i=a[e],o=a[(e+1)%a.length];if(qc(t,n,{x:i[0],z:i[1]},{x:o[0],z:o[1]})<r)return!1}return!0}function ul(e,t,n){return Ns(e,t,n)}function dl(e,t,n){let r=zc.groundY;for(let i of e.mountains)r=Math.max(r,ul(i,t,n));return r}function fl(e,t,n){if(!ll(e,t,n))return{type:`outside`,height:-5};if(vc(e,t,n)<0)return{type:`water`,height:e.river.y};if(e.biomes){let r=ss(e,t,n);if(r===`ocean`)return{type:`ocean`,height:e.river.y};if(r===`shore`)return{type:`shore`,height:e.river.y*(1-Vc(-cs(e,`ocean`,t,n)/e.biomes.shoreWidth,0,1))}}let r=dl(e,t,n);return{type:r>0?`mountain`:`ground`,height:r}}function pl(e,t,n=zc.sampleSpacing){let r=[];for(let i=1;i<e.length;i++){let a=e[i-1],o=e[i],s=Math.max(1,Math.ceil(Uc(a,o)/n));for(let e=0;e<s;e++)i>1&&e===0&&Uc(a,r.at(-1))<Bc||r.push({x:Hc(a.x,o.x,e/s),y:t,z:Hc(a.z,o.z,e/s)})}r.push({...e.at(-1),y:t});let i=[0];for(let e=1;e<r.length;e++)i.push(i[e-1]+Uc(r[e-1],r[e]));return{points:r,distances:i,length:i.at(-1)}}function ml(e,t=4){if(e.length<3)return e;let n=[e[0]];for(let r=1;r<e.length-1;r++){let i=e[r-1],a=e[r],o=e[r+1],s=Uc(i,a),c=Uc(a,o);if(s<Bc||c<Bc)continue;let l=Math.min(t,s*.3,c*.3),u={x:a.x+(i.x-a.x)*l/s,z:a.z+(i.z-a.z)*l/s},d={x:a.x+(o.x-a.x)*l/c,z:a.z+(o.z-a.z)*l/c};n.push(u);for(let e=1;e<=10;e++){let t=e/10,r=1-t;n.push({x:r*r*u.x+2*r*t*a.x+t*t*d.x,z:r*r*u.z+2*r*t*a.z+t*t*d.z})}}return n.push(e.at(-1)),n}function hl(e,t){if(e.alignment)return Ss(e.alignment,t);let n=Vc(t,0,e.length),r=0,i=e.distances.length-1;for(;r+1<i;){let t=r+i>>1;e.distances[t]<=n?r=t:i=t}let a=e.points[r],o=e.points[i],s=e.distances[i]-e.distances[r],c=s>Bc?(n-e.distances[r])/s:0,l=o.x-a.x,u=o.y-a.y,d=o.z-a.z,f=Math.hypot(l,u,d)||1;return{x:Hc(a.x,o.x,c),y:Hc(a.y,o.y,c),z:Hc(a.z,o.z,c),distance:n,tangent:{x:l/f,y:u/f,z:d/f},angle:Math.atan2(l,d)}}function gl(e,t){let n=[],r=t(e.points[0],0)<=0?0:null;for(let i=1;i<e.points.length;i++){let a=e.points[i-1],o=e.points[i],s=t(a,e.distances[i-1]),c=t(o,e.distances[i]);if(s<=0==c<=0)continue;let l=0,u=1;for(let n=0;n<18;n++){let n=(l+u)/2,r=Hc(e.distances[i-1],e.distances[i],n);t(e.alignment?hl(e,r):{x:Hc(a.x,o.x,n),z:Hc(a.z,o.z,n)},r)<=0==s<=0?l=n:u=n}let d=Hc(e.distances[i-1],e.distances[i],(l+u)/2);s>0?r=d:(d-(r??0)>.01&&n.push({start:r??0,end:d}),r=null)}return r!==null&&e.length-r>.01&&n.push({start:r,end:e.length}),n.map(t=>({...t,entry:hl(e,t.start),exit:hl(e,t.end)}))}function _l(e,t){return[[-.5,-.22],[-.43,-.43],[-.2,-.5],[.22,-.5],[.44,-.4],[.5,-.17],[.5,.23],[.4,.44],[.18,.5],[-.22,.5],[-.44,.39],[-.5,.12]].map(([n,r])=>[n*e,r*t])}function vl(e,t){if(!e)throw TypeError(`Invalid world: ${t}`)}function yl(e,t,n){if(e.cities){vl(Array.isArray(e.cities)&&(e.cities.length>=2||e.gameplay&&e.cities.length===0),`at least two cities are required outside settlement mode`);let t=e.cities.map((e,t)=>({...e,id:String(e.id??`city-${t+1}`),...Wc(e,0),radius:e.radius??Hs(e.level??3).radius,stationIds:[]}));return vl(t.every(e=>Gc(e)&&Number.isFinite(e.radius)&&e.radius>0),`cities require finite x/z and positive radii`),vl(new Set(t.map(e=>e.id)).size===t.length,`city IDs must be unique`),t}let r=[[`westhaven`,-47,25],[`pineford`,-43,-20],[`summit`,-16,-29],[`alder`,16,-27],[`eastmere`,46,-17],[`sunfield`,47,23],[`meadow`,16,30],[`willow`,-16,23]];vl(Number.isFinite(Number(e.cityCount??8)),`cityCount must be finite`);let i=Vc(Math.round(e.cityCount??8),3,20),a=Math.min(t.width/130,t.depth/95);return i===8?r.map(([e,r,i])=>({id:e,x:r*t.width/130+(n()-.5)*2.6*a,z:i*t.depth/95+(n()-.5)*2.6*a,y:0,radius:zc.cityRadius*a,stationIds:[]})):Array.from({length:i},(e,r)=>{let o=Math.PI*2*r/i+.35+(n()-.5)*.14;return{id:`city-${r+1}`,x:Math.cos(o)*t.width*.35,z:Math.sin(o)*t.depth*.32,y:0,radius:Math.min(zc.cityRadius*a,Math.min(t.width,t.depth)*1.05/i),stationIds:[]}})}function bl(e,t={}){let n=e.platform?.width??e.width??0,r=e.platform?.length??e.length??0,i=ut(t,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i);return[[-r/2,-n/2],[r/2,-n/2],[r/2,n/2],[-r/2,n/2]].map(([n,r])=>Ue(t,e.x,e.z,n*a+r*o,-n*o+r*a))}function xl(e,t,n,r){let i=(e,t,n)=>(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x);return i(e,t,n)*i(e,t,r)<-1e-7&&i(n,r,e)*i(n,r,t)<-1e-7}function Sl(e,t,n,r={}){let i=ut(r,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i),s=je(r,e,{x:t,z:n}),c=s.x,l=s.z,u=c*a-l*o,d=c*o+l*a;return Math.hypot(Math.max(0,Math.abs(u)-e.platform.length/2),Math.max(0,Math.abs(d)-e.platform.width/2))}function Cl(e,t,n={}){if(n.surface){let r={...e,x:0,z:0,rotation:ut(n,e.x,e.z,e.rotation??0)},i=bl(r),a=tl(n,e,e.radius+$.trackHalfWidth+.3),o=1/0;for(let s of Ec(n,Qc(t).tree,e.x,e.z,a)){let t=je(n,e,s.a),a=je(n,e,s.b);o=Math.min(o,Sl(r,t.x,t.z),Sl(r,a.x,a.z));for(let e=0;e<4;e++){if(xl(t,a,i[e],i[(e+1)%4]))return 0;o=Math.min(o,qc(i[e].x,i[e].z,t,a))}}return o}let r=bl(e);return Qc(t).tree.nearest(e.x,e.z,t=>{let{a:n,b:i}=t,a=Math.min(Sl(e,n.x,n.z),Sl(e,i.x,i.z));for(let e=0;e<4;e++){if(xl(n,i,r[e],r[(e+1)%4]))return 0;a=Math.min(a,qc(r[e].x,r[e].z,n,i))}return a},1/0,e.radius??Math.hypot(e.platform.length,e.platform.width)/2)}function wl(e){let t=[];for(let n of e.cities){let r=[];for(let i of e.lines){if(i.from!==n.id&&i.to!==n.id)continue;let a=i.from===n.id,o=Ac(e,i),s=o?.length??i.length;for(let c of[0,7,8.5,10]){if(s<c*2+1)continue;let l=Pc(o,a?c:s-c),u=hl(i,l);for(let a of[-1,1]){let o=ut(e,u.x,u.z,u.angle),s=-Math.cos(o),d=Math.sin(o),f=Ue(e,u.x,u.z,s*$.stationOffset*a,d*$.stationOffset*a),p=je(e,f,u),m={id:`station-${n.id}`,kind:`station`,cityId:n.id,ownerId:n.ownerId,lineId:i.id,distance:l,...f,y:0,rotation:at(e,f.x,f.z,Math.atan2(p.x,p.z)),side:a,radius:Math.hypot($.stationLength/2,$.stationWidth/2),platform:{width:$.stationWidth,length:$.stationLength}},h=tl(e,m,m.radius+$.worldEdge);if(!ll(e,m.x,m.z,h)||e.biomes&&!ls(e,[`farmland`,`forest`,`plains`,`desert`],m.x,m.z,tl(e,m))||e.mountains.some(t=>Fs(t,m.x,m.z)<tl(e,m,m.radius+$.mountain))||(e.surface?vc(e,m.x,m.z)<tl(e,m,m.radius+$.riverBank):gc(e).some(e=>Cl(m,e)<e.width/2+$.riverBank))||e.lines.some(t=>wc(e,m.x,m.z,tl(e,m,m.radius+$.trackHalfWidth+.25)).some(e=>fo(e,Qc(t).box))&&Cl(m,t,e)<$.trackHalfWidth+.25)||t.some(t=>et(e,m,t)<m.radius+t.radius+$.objects))continue;let g=et(e,m,n)+c*.05;r.push({station:m,score:g})}}}if(r.sort((e,t)=>e.score-t.score),r.length){let e=r[0].station;t.push(e),n.stationIds.push(e.id)}}e.stations=t;for(let n of e.lines){let e=t.filter(e=>e.lineId===n.id);n.stationIds=e.map(e=>e.id);for(let t of n.stops){let n=e.find(e=>e.cityId===t.cityId);n&&(t.distance=n.distance)}}}function Tl(e,t,{cityId:n=null,keepOutsideCities:r=!1}={}){let i=t.radius;if(e.gameplay?.reservations?.some(n=>et(e,t,n)<i+n.radius)||!ll(e,t.x,t.z))return!1;if(e.detailRegion&&!n){let n=e.detailRegion,r=tl(e,t,i+$.objects/2);if(t.x-r<n.minX||t.x+r>n.maxX||t.z-r<n.minZ||t.z+r>n.maxZ)return!1}return!(e.biomes&&!ls(e,[`farmland`,`forest`,`plains`,`desert`],t.x,t.z,tl(e,t))||!ll(e,t.x,t.z,tl(e,t,i+$.worldEdge))||al(e,t.x,t.z,i+$.track)<i+$.track||vc(e,t.x,t.z)<tl(e,t,i+$.riverBank)||el(e.mountains,{...t,radius:tl(e,t,i+$.mountain)}).some(n=>Fs(n,t.x,t.z)<tl(e,t,i+$.mountain))||r&&nl(e,e.cities,t,$.city).some(n=>et(e,t,n)<n.radius+i+$.city)||n&&nl(e,e.cities,t,e.detailRegion?$.objects:0).some(r=>r.id!==n&&et(e,t,r)<r.radius+(e.detailRegion?i+$.objects:i*.5))||nl(e,e.stations,t,$.objects).some(n=>et(e,t,n)<i+n.radius+$.objects)||nl(e,e.placements,t,$.objects).some(n=>et(e,t,n)<i+n.radius+$.objects&&(t.kind!==`farm`||n.kind!==`farm`||Xs(e,t,n,$.objects)))||(e.cityStreets??[]).some(n=>il(e,n,t.x,t.z,i+n.width/2+$.street)<i+n.width/2+$.street))}function El(e,t=e.cities){let n=[`farmland`,`forest`,`plains`,`desert`],r=e.surface?.complete&&e.surface.projection.type===`equirectangular`?2*Math.PI*e.surface.projection.radius:void 0,i=(t,n)=>et(e,t,n),a=(t,n,r)=>il(e,t,n,r,8);for(let o of t){let t=o.development,s=Vs(e.seed,o.id),c=o.railAxis??{x:1,z:0},l=ut(e,o.x,o.z,Math.atan2(c.x,c.z)),u={x:Math.sin(l),z:Math.cos(l)},d={x:-u.z,z:u.x},f=t.streetWidth,p=t.streetSpacing,m=(t,n,r)=>Ue(e,o.x,o.z,u.x*t+d.x*n*r,u.z*t+d.z*n*r),h=t=>{let r=f/2+.12;return!(i(t,o)>o.radius-r||!ll(e,t.x,t.z,tl(e,t,r+$.worldEdge))||!ls(e,n,t.x,t.z,tl(e,t,r))||al(e,t.x,t.z,$.track+r)<$.track+r||vc(e,t.x,t.z)<tl(e,t,$.riverBank+r)||e.mountains.some(n=>Fs(n,t.x,t.z)<tl(e,t,r+$.mountain))||nl(e,e.cities,{...t,radius:r},e.detailRegion?$.objects:0).some(n=>n.id!==o.id&&i(t,n)<n.radius+(e.detailRegion?r+$.objects:r*.5))||nl(e,e.stations,{...t,radius:r}).some(n=>Sl(n,t.x,t.z,e)<r))},g=t=>{for(let n=1;n<t.length;n++){let r=t[n-1],a=t[n],o=Math.max(1,Math.ceil(i(r,a)/.6)),s=je(e,r,a);for(let t=0;t<=o;t++)if(!h(Ue(e,r.x,r.z,s.x*t/o,s.z*t/o)))return!1}return!0},_=e.stations.find(e=>e.cityId===o.id),v=_?je(e,o,_):null,y=_?Math.sign(v.x*d.x+v.z*d.z):s()<.5?1:-1,b=t=>{let n=Vs(e.seed,`${o.id}:lanes:${t}`),s=[],c=[],l=t===y?5.1:3.7,u=m((n()-.5)*o.radius*.12,Math.max(l+.6,o.radius*.46),t),d=[];for(let e=l;e<o.radius-2;e+=3.2)for(let n=-o.radius*.7;n<=o.radius*.7;n+=2.5){let r=m(n,e,t);d.push({p:r,score:n*n+(e-l)**2})}d.sort((e,t)=>e.score-t.score);for(let{p:e}of d)if(h(e)){s.push(e);break}if(!s.length)return{side:t,edges:c,center:u};let _=(t,n,r)=>{let a=i(t,n),o=je(e,t,n),s=-o.z/a,c=o.x/a,l=Math.max(3,Math.ceil(a/1.1));return Array.from({length:l+1},(i,a)=>{if(a===0)return t;if(a===l)return n;let u=a/l,d=Math.sin(Math.PI*u)*r;return Ue(e,t.x,t.z,o.x*u+s*d,o.z*u+c*d)})},v=e=>c.some(t=>{let n=[e[0],e.at(-1)].filter(e=>e===t.points[0]||e===t.points.at(-1));return e.some(e=>!n.some(t=>i(e,t)<2.1)&&a(t,e.x,e.z)<f+1.15)}),b=Math.max(2,Math.ceil((o.radius/7.5)**2));for(let a=0;a<(o.radius<14?280:900)&&s.length<b;a++){let a=n()*Math.PI*2,u=Math.sqrt(n()),d=Math.cos(a)*o.radius*.77*u,y=Math.max(l+.6,o.radius*.46)+Math.sin(a)*Math.max(2,o.radius*.34)*u,b=m(d,y,t);if(i(b,o)>o.radius-1.7)continue;let x=s.map(e=>({node:e,distance:i(e,b)})).sort((e,t)=>e.distance-t.distance);if(x[0].distance<p*.72||x[0].distance>p*1.65||!h(b))continue;let S=x[0].node;if(c.some(t=>{let n=t.points[0]===S?t.points[1]:t.points.at(-1)===S?t.points.at(-2):null;if(!n)return!1;let r=je(e,S,n),a=je(e,S,b);return(r.x*a.x+r.z*a.z)/(i(n,S)*i(b,S))>.73}))continue;let C=_(S,b,(n()-.5)*Math.min(1.8,x[0].distance*.2));g(C)&&!v(C)&&(s.push(b),c.push({points:C,width:f,...r?{period:r}:{}}))}if(o.level>=4){let e=[];for(let t=0;t<s.length;t++)for(let n=t+1;n<s.length;n++){let r=s[t],a=s[n],o=i(r,a);o>p*1.5||c.some(e=>e.points[0]===r&&e.points.at(-1)===a||e.points[0]===a&&e.points.at(-1)===r)||e.push({a:r,b:a,d:o})}e.sort((e,t)=>e.d-t.d);let t=0;for(let{a:i,b:a,d:s}of e){if(t>=Math.floor(o.level/3))break;let e=_(i,a,(n()-.5)*Math.min(1.2,s*.14));g(e)&&!v(e)&&(c.push({points:e,width:f,...r?{period:r}:{}}),t++)}}if(!c.length)for(let e of[-1,1]){let i=m(e*2.8,l+n()*.6,t),a=_(s[0],i,.2*e);if(g(a)){c.push({points:a,width:f,...r?{period:r}:{}});break}}return{side:t,edges:c,center:u}},x=[b(1),b(-1)];for(let t of x){let n=Us.house*.9,r=n+f/2+$.street+.1;t.capacity=0;for(let s of t.edges)for(let c=1;c<s.points.length;c++){let l=s.points[c-1],u=s.points[c],d=i(l,u);for(let s of[-1,1]){let c=je(e,l,u),p={...Ue(e,l.x,l.z,c.x/2-c.z/d*r*s,c.z/2+c.x/d*r*s),radius:n};i(p,o)+n<=o.radius&&Tl(e,p,{cityId:o.id})&&t.edges.every(e=>a(e,p.x,p.z)>=n+f/2+$.street)&&(t.capacity+=d)}}}x.sort((e,t)=>t.capacity-e.capacity||(e.side===y?-1:1));let S=x[0],C=S.edges.map((e,t)=>({id:`street-${o.id}-${t+1}`,cityId:o.id,ownerId:o.ownerId,...e}));if(e.cityStreets.push(...C),t.streetCount=C.length,t.connectionCount=e.lines.filter(e=>e.from===o.id||e.to===o.id).length,!C.length)continue;let w=C.flatMap(e=>e.points.slice(1).map((t,n)=>({a:e.points[n],b:t,length:i(e.points[n],t)}))),T=t.features.filter(e=>e!==`house`).reverse(),E=e=>{if(e<3)return`house`;if(e<T.length+3)return T[e-3];let t=s();return o.level>=8&&t<.12?`tower`:o.level>=4&&t<(o.level>=8?.38:.25)?`apartment`:`house`},D=0,O=[],k=new Map,A=t=>{if(k.has(t))return k.get(t);let n=Vs(e.seed,`${o.id}:lots:${t}`),r=[];for(let{a,b:s,length:c}of w){let l=je(e,a,s),u=l.x/c,d=l.z/c,p=Math.max(1,Math.ceil(c/.72));for(let s=0;s<p;s++)for(let c of[-1,1])for(let m=0;m<(t===`house`?2:1);m++){let h=(s+.18+n()*.64)/p,g=t===`house`?.86+n()*.1:.9+n()*.09,_=Us[t]*g,v=_+f/2+$.street+.06+n()*.12+m*(2.8+$.objects),y=Ue(e,a.x,a.z,l.x*h-d*v*c,l.z*h+u*v*c),b=Ue(e,a.x,a.z,l.x*h,l.z*h),x=je(e,y,b),C={kind:t,cityId:o.id,ownerId:o.ownerId,...y,y:0,radius:_,scale:g,variant:Math.floor(n()*8),rotation:at(e,y.x,y.z,Math.atan2(x.x,x.z))};if(i(C,o)+_>o.radius||!Tl(e,C,{cityId:o.id}))continue;let w=O.length?Math.min(...O.map(e=>i(C,e)-_-e.radius)):1/0;r.push({item:C,neighbor:w,score:i(C,S.center)*.3+m*.4})}}return k.set(t,r),r},j=t=>{let n=A(t),r=null,a=1/0;for(let e of n){if(e.blocked)continue;let t=e.score+(Number.isFinite(e.neighbor)?e.neighbor*1.8:0);t<a&&(r=e,a=t)}if(!r)return!1;let s={...r.item,id:`city-${o.id}-building-${D+1}`,biome:ss(e,r.item.x,r.item.z)};e.placements.push(s),O.push(s),D++;for(let e of k.values())for(let t of e){if(t.blocked)continue;let e=i(s,t.item)-s.radius-t.item.radius;e<$.objects?t.blocked=!0:t.neighbor=Math.min(t.neighbor,e)}return!0};for(let e=0;e<t.buildingBudget;e++)j(E(e));for(let e=0;D<t.buildingBudget&&e<3;)j(`house`)?e=0:e++;t.placedBuildings=D,t.placedFeatures=[...new Set(O.map(e=>e.kind))]}}function Dl(e,t,n){let r=n=>e.placements.push({id:e.detailRegion?`asset-${e.detailRegion.minX}-${e.detailRegion.minZ}-${e.placements.length+1}`:`asset-${e.placements.length+1}`,y:0,rotation:t()*Math.PI*2,biome:ss(e,n.x,n.z),...n}),i=e.detailRegion,a=Math.sqrt((i?(i.maxX-i.minX)*(i.maxZ-i.minZ):e.bounds.width*e.bounds.depth)/12350),o=t=>!e.surface?.complete||ll(e,t.x,t.z)&&cs(e,`ice`,t.x,t.z)<-tl(e,t);if(e.farmland=fc(e,{density:n,canPlace:t=>o(t)&&Tl(e,t,{keepOutsideCities:!0}),add:r}),n<=0)return;let s=i??{minX:-e.bounds.width*.47,maxX:e.bounds.width*.47,minZ:-e.bounds.depth*.47,maxZ:e.bounds.depth*.47},c=e=>(e=Vc(e,0,1),e*e*(3-2*e)),l=(t,r,i,a=!0)=>{t/=Math.sqrt(Math.min(2,n));let o=(s.maxX-s.minX)*(s.maxZ-s.minZ);t=Math.max(t,Math.sqrt(o/i));let c=[];for(let n=Math.floor(s.minZ/t);n<=Math.floor(s.maxZ/t);n++)for(let i=Math.floor(s.minX/t);i<=Math.floor(s.maxX/t);i++){let a=Kc(`${e.seed}:landscape:${r}:${i}:${n}`),o=(i+.08+a()*.84)*t,l=(n+.08+a()*.84)*t;o<s.minX||o>=s.maxX||l<s.minZ||l>=s.maxZ||!ll(e,o,l)||c.push({x:o,z:l,rng:a,priority:a()})}return a?c.sort((e,t)=>e.priority-t.priority):c},u=(t,n,r=!1)=>(r?cs(e,`ice`,t.x,t.z)>=tl(e,t):o(t))&&ls(e,n,t.x,t.z,tl(e,t))&&Tl(e,t,{keepOutsideCities:!0}),d=Math.round(310*n*a),f={},p=0,m=l(2.2,`canopy`,12e3,!1).filter(t=>(t.biome=ss(e,t.x,t.z),t.biome!==`forest`&&t.biome!==`plains`||(t.ecology=zt(e,t.x,t.z),t.ecology.ecoregion===`polar`)?!1:(t.priority=t.biome===`forest`?1+t.ecology.patch*.75+t.ecology.detail*.25+t.priority*.025:t.priority,!0))).sort((e,t)=>t.priority-e.priority);for(let t of m){if(p>=d)break;let n=t.biome,i=t.ecology,a=t.rng,o=c((i.patch-.35)/.34),s=c((i.patch-.57)/.2),l=n===`forest`?o*(.55+i.detail*.45):.004+s*.054,f=e.surface?.projection.type===`equirectangular`?Math.max(.06,Math.cos(i.latitude*Math.PI/180)):1;if(a()>l*f||i.ecoregion===`polar`)continue;let m=.48+(n===`forest`?o:s)*.48+a()*.25,h=i.ecoregion===`tropical`?n===`plains`||i.moisture<.38?`acacia`:`broadleaf`:i.ecoregion===`boreal`?i.moisture>.65?`birch`:`pine`:i.moisture<.36?`pine`:i.moisture>.62?`birch`:i.detail>.62?`gold`:`broadleaf`;a()<.09&&(h=h===`pine`?`birch`:`round`);let g={kind:`tree`,x:t.x,z:t.z,radius:.85*m,scale:m,variant:h,landscapeLayer:`canopy`,rotation:at(e,t.x,t.z,a()*Math.PI*2)};u(g,[`forest`,`plains`])&&(r(g),p++)}let h=0,g=0,_=0,v=Math.round(48*n*a),y=Math.round(14*n*a),b=Math.round(12*n*a);for(let t of l(14,`understory`,1800)){let n=ss(e,t.x,t.z);if(![`forest`,`plains`,`desert`].includes(n))continue;let i=zt(e,t.x,t.z,f),a=t.rng,o=e.surface?.complete&&cs(e,`ice`,t.x,t.z)>0,s=null,c=2+a()*2.4;if(o?a()<.36&&(s=`frost`):n===`desert`?i.patch<.55&&a()<.7?(s=`dune`,c=4.1+a()*2.8):i.patch>.61&&a()<.67?(s=`outcrop`,c=2.8+a()*2.3):i.moisture>.47&&a()<.28&&(s=`scrub`):n===`forest`?i.patch<.47&&a()<.45?(s=`meadow`,c=2.8+a()*2.1):i.detail>.72&&a()<.18&&(s=`outcrop`):i.ecoregion===`polar`?a()<.4&&(s=i.moisture>.52?`scrub`:`frost`):i.patch<.6&&a()<.46?(s=i.moisture<.34?`scrub`:`meadow`,c=2.6+a()*2.5):i.detail>.7&&a()<.38&&(s=`outcrop`),s&&h<v){let l={kind:`nature`,x:t.x,z:t.z,radius:c,scale:1,style:s,variant:Math.floor(a()*65536),rotation:at(e,t.x,t.z,i.windAngle+(a()-.5)*.28)};u(l,n,o)&&(r(l),h++)}let l=!o&&n===`plains`&&i.ecoregion!==`polar`&&i.patch<.58&&i.moisture>.36&&a()<.17,d=!e.surface?.complete||i.longitude>-125&&i.longitude<-60,p=!o&&n===`desert`&&d&&i.patch>.5&&i.patch<.72&&a()<.2;if(!l&&!p)continue;let m=2+Math.floor(a()*4),x=a()*Math.PI*2;for(let i=0;i<m;i++){let i=l?`sheep`:`cactus`;if(l?g>=y:_>=b)break;let o=a()*Math.PI*2,s=2.4+a()*4.8,c=Ue(e,t.x,t.z,Math.cos(o)*s,Math.sin(o)*s),d=l?1:.72+a()*.35,f=l?.9+a()*.5:0,p={kind:i,...c,radius:l?.7+f:.7*d,...l?{roamRadius:f}:{},scale:d,variant:Math.floor(a()*3),rotation:at(e,c.x,c.z,x+(a()-.5)*.65)};u(p,n)&&(r(p),l?g++:_++)}}}function Ol(e,t,n){for(let r of e.cities){let i=t.filter(e=>e.from===r.id||e.to===r.id).map(t=>{let n=t.from===r.id,i=e.cities.find(e=>e.id===(n?t.to:t.from)),a=t.waypoints.length?n?t.waypoints[0]:t.waypoints.at(-1):i,o=Uc(r,a)||1;return{connection:t,end:n?`start`:`end`,x:(a.x-r.x)/o,z:(a.z-r.z)/o}}),a=i.length?{x:i[0].x,z:i[0].z}:{x:1,z:0},o=1/0;for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){let n=i[e],r=i[t],s=n.x*r.x+n.z*r.z;if(s>=o)continue;o=s;let c=n.x-r.x,l=n.z-r.z,u=Math.hypot(c,l);u>Bc&&(a={x:c/u,z:l/u})}r.railHeading!==void 0&&(vl(Number.isFinite(r.railHeading),`city railHeading must be a finite angle in radians`),a={x:Math.cos(r.railHeading),z:Math.sin(r.railHeading)}),(a.x<0||Math.abs(a.x)<Bc&&a.z<0)&&(a={x:-a.x,z:-a.z}),r.railAxis=a;let s=Math.min(...i.map(t=>Uc(r,e.cities.find(e=>e.id===(t.connection.from===r.id?t.connection.to:t.connection.from))))),c=r.throatLength??n;vl(Number.isFinite(c)&&c>=0,`city throatLength must be finite and nonnegative`),r.throatLength=Math.min(c,s*.18);for(let e of i){let t=e.x*a.x+e.z*a.z>=0?1:-1;e.connection[e.end===`start`?`fromPort`:`toPort`]={cityId:r.id,side:t,x:r.x+a.x*t*r.throatLength,z:r.z+a.z*t*r.throatLength,heading:Math.atan2(a.z*t,a.x*t)}}}}function kl(e,t,n){let r=hl(e,t===`start`?n:e.length-n),i=t===`start`?1:-1;return{...r,tangent:{x:r.tangent.x*i,y:0,z:r.tangent.z*i},curvature:(r.curvature??0)*i}}function Al(e,t){let n=e=>e.end===`start`?e.line.alignment.segments:e.line.alignment.segments.toReversed(),r=n(e),i=n(t),a=0,o=0,s=0,c=0,l=0;for(;a<r.length&&o<i.length;){let n=kl(e.line,e.end,l+1e-6),u=kl(t.line,t.end,l+1e-6);if(Uc(n,u)>1e-5||n.tangent.x*u.tangent.x+n.tangent.z*u.tangent.z<1-1e-8||Math.abs(n.curvature-u.curvature)>1e-8)break;let d=Math.min(r[a].length-s,i[o].length-c);if(d<Bc)break;l+=d,s+=d,c+=d,s>=r[a].length-Bc&&(a++,s=0),c>=i[o].length-Bc&&(o++,c=0)}return l}function jl(e){e.sharedSections=[],e.transitions=[];for(let t of e.lines)t.sharedSections=[],t.renderRanges=[{start:0,end:t.length}];for(let t of e.cities){let n=e.lines.flatMap(e=>e.from===t.id?[{line:e,end:`start`,port:e.fromPort}]:e.to===t.id?[{line:e,end:`end`,port:e.toPort}]:[]);for(let r of n)for(let i of n)r.line!==i.line&&r.port.side!==i.port.side&&e.transitions.push({cityId:t.id,fromLineId:r.line.id,fromEnd:r.end,toLineId:i.line.id,toEnd:i.end});for(let r of[-1,1]){let i=n.filter(e=>e.port.side===r);if(i.length<2)continue;let a=new Map,o=(e,t)=>[e.line.id,t.line.id].sort().join(`|`);for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)a.set(o(i[e],i[t]),Al(i[e],i[t]));let s=[0,...new Set([...a.values()].filter(e=>e>Bc).map(e=>Math.round(e*1e7)/1e7))].sort((e,t)=>e-t);for(let n=1;n<s.length;n++){let c=s[n-1],l=s[n],u=(c+l)/2,d=[...i];for(;d.length;){let n=d.shift(),i=[n];for(let e=d.length-1;e>=0;e--)(a.get(o(n,d[e]))??0)>u&&(i.push(d[e]),d.splice(e,1));if(i.length<2)continue;i.sort((t,n)=>e.lines.indexOf(t.line)-e.lines.indexOf(n.line));let s=i[0],f=`shared-${t.id}-${r}-${e.sharedSections.length+1}`,p=Array.from({length:Math.max(2,Math.ceil((l-c)/.35)+1)},(e,t)=>{let n=kl(s.line,s.end,c+(l-c)*t/(Math.max(2,Math.ceil((l-c)/.35)+1)-1));return{x:n.x,y:n.y,z:n.z}}),m={id:f,cityId:t.id,side:r,ownerLineId:s.line.id,length:l-c,points:p,lines:[]};for(let e of i){let n=e.end===`start`?c:e.line.length-l,i=e.end===`start`?l:e.line.length-c,a={id:f,cityId:t.id,side:r,start:n,end:i,ownerLineId:s.line.id};e.line.sharedSections.push(a),m.lines.push({lineId:e.line.id,start:n,end:i,forward:e.end===`start`}),e!==s&&(e.line.renderRanges=e.line.renderRanges.flatMap(e=>i<=e.start+Bc||n>=e.end-Bc?[e]:[{start:e.start,end:Math.max(e.start,n)},{start:Math.min(e.end,i),end:e.end}].filter(e=>e.end-e.start>Bc)))}e.sharedSections.push(m)}}}}}function Ml(e,t,n,r,i,a=.5){return e.sharedSections.some(e=>{let o=e.lines.find(e=>e.lineId===t.id),s=e.lines.find(e=>e.lineId===n.id);return o&&s&&r>=o.start-a&&r<=o.end+a&&i>=s.start-a&&i<=s.end+a})}function Nl(e){let t=[],n=(e,t,n,r)=>e*r-t*n,r=$c(e),i=r.items;for(let a of i)for(let i of r.query({minX:a.minX-Bc,maxX:a.maxX+Bc,minZ:a.minZ-Bc,maxZ:a.maxZ+Bc})){if(i.lineIndex<=a.lineIndex)continue;let r=a.line,o=i.line;if(a.maxX<i.minX-Bc||i.maxX<a.minX-Bc||a.maxZ<i.minZ-Bc||i.maxZ<a.minZ-Bc||Ml(e,r,o,(r.distances[a.index]+r.distances[a.index+1])/2,(o.distances[i.index]+o.distances[i.index+1])/2))continue;let s=a.b.x-a.a.x,c=a.b.z-a.a.z,l=i.b.x-i.a.x,u=i.b.z-i.a.z,d=i.a.x-a.a.x,f=i.a.z-a.a.z,p=n(s,c,l,u),m=s*s+c*c;if(Math.abs(p)<1e-10){if(Math.abs(n(d,f,s,c))>1e-7)continue;let e=(d*s+f*c)/(m||1),t=e+(l*s+u*c)/(m||1);vl((Math.min(1,Math.max(e,t))-Math.max(0,Math.min(e,t)))*Math.sqrt(m)<1e-4,`routes ${r.id} and ${o.id} overlap; shared railway segments must be represented by one connection`);continue}let h=n(d,f,l,u)/p,g=n(d,f,s,c)/p;if(h<-1e-6||h>1.000001||g<-1e-6||g>1.000001)continue;let _=Hc(r.distances[a.index],r.distances[a.index+1],Vc(h,0,1)),v=Hc(o.distances[i.index],o.distances[i.index+1],Vc(g,0,1)),y=(e,t)=>t<.001||t>e.length-.001;if((r.from===o.from||r.from===o.to||r.to===o.from||r.to===o.to)&&y(r,_)&&y(o,v))continue;let b=Hc(a.a.x,a.b.x,Vc(h,0,1)),x=Hc(a.a.z,a.b.z,Vc(h,0,1)),S=t.find(e=>Math.hypot(e.x-b,e.z-x)<.05);S||(S={id:`junction-${t.length+1}`,x:b,y:zc.railY,z:x,lines:[]},t.push(S));for(let[e,t]of[[r,_],[o,v]])S.lines.some(t=>t.lineId===e.id)||S.lines.push({lineId:e.id,distance:t})}e.junctions=t}function Pl(e={},t={}){let n=e.seed??zc.seed,r=Kc(n),i={width:Number(e.bounds?.width??zc.width),depth:Number(e.bounds?.depth??zc.depth)};vl(Number.isFinite(i.width)&&Number.isFinite(i.depth)&&i.width>=35&&i.depth>=30,`bounds must be finite and at least 35 × 30`);let a=Bs(e.players),o=yl(e,i,r),s=new Set(a.map(e=>e.id));for(let[t,r]of o.entries()){let i=Vs(n,r.id);r.level=r.level??(e.cities?1+Math.floor(i()*10):3);let o=Hs(r.level);r.ownerId=String(r.ownerId??a[Math.floor(Vs(n,`${r.id}:owner`)()*a.length)].id),vl(s.has(r.ownerId),`city ${r.id} references unknown owner ${r.ownerId}`),e.cities&&e.cities[t].radius==null&&(r.radius=o.radius),r.development={...o,radius:r.radius,variantSeed:`${n}:city:${r.id}`,placedBuildings:0,streetCount:0,connectionCount:0}}let c={...e.trainOwners??{}};vl(e.trainOwners===void 0||e.trainOwners&&typeof e.trainOwners==`object`&&!Array.isArray(e.trainOwners),`trainOwners must be an object keyed by train ID`),vl(Object.values(c).every(e=>s.has(e)),`trainOwners references an unknown player`);let l=e.outline?e.outline.map(e=>[Number(e[0]),Number(e[1])]):_l(i.width,i.depth);vl(l.length>=3&&l.every(e=>e.every(Number.isFinite)),`outline requires at least three finite points`);let u={version:2,seed:n,bounds:i,outline:l,geography:e.geography,camera:e.camera,surface:ht(e.surface),players:a,trainOwners:c,traffic:structuredClone(e.traffic??{}),density:Vc(Number(e.density??1)||0,0,3),detailMode:t.detail??`full`,cities:o,lines:[],stations:[],placements:[],cityStreets:[],junctions:[]};e.gameplay&&(u.gameplay=structuredClone(e.gameplay)),vl(o.every(e=>ll(u,e.x,e.z,.5)),`cities must be inside the world outline`);let d={points:[[-.64,.015],[-.42,-.025],[-.2,.035],[.02,0],[.22,.075],[.43,.055],[.64,.015]].map(([e,t])=>[e*i.width,t*i.depth])},f=e.rivers??[e.river??d];vl(Array.isArray(f),`rivers must be an array`);let p=f.map((e,t)=>{let n=e.points.map(e=>Wc(e,zc.waterY));vl(n.every(Gc),`river requires finite points`);let r=n.filter((e,t)=>t===0||Uc(e,n[t-1])>Bc);vl(r.length>=2,`river requires at least two distinct points`);let i=Number(e.width??zc.riverWidth);vl(Number.isFinite(i)&&i>0,`river width must be positive`);let a=pl(e.smooth===!1?r:ml(r,9),zc.waterY,e.smooth===!1?1/0:1);return vl(Number.isFinite(a.length)&&a.length>Bc,`river must have positive length`),{...a,id:e.id??`river-${t+1}`,name:e.name,width:i,y:zc.waterY}});u.river=p[0]??{points:[],distances:[],length:0,width:0,y:zc.waterY},e.rivers!==void 0&&(u.rivers=p),u.lakes=e.biomes?.geography?.lakes,u.lakeShore=e.biomes?.geography?.lakeShore,(e.rivers!==void 0||u.lakes?.length)&&(u.hydrology=xc(u));let m=u.river.width,h=Math.min(i.width/130,i.depth/95),g=[...o].sort((e,t)=>e.z-t.z).slice(0,2),_={x:((g[0]?.x??0)+(g[1]?.x??0))/2,z:((g[0]?.z??0)+(g[1]?.z??0))/2},v=(e.cities?[]:[{id:`high-pass`,..._,radius:10*h,height:13*h},{id:`north-spire`,x:_.x-7*h,z:_.z-11*h,radius:6.8*h,height:10*h},{id:`east-spire`,x:_.x+11*h,z:_.z-10*h,radius:7*h,height:9*h}]).filter(e=>ll(u,e.x,e.z,e.radius+.1)&&cl(u,e.x,e.z)>e.radius+m/2+$.riverBank&&o.every(t=>Uc(t,e)>e.radius+2));u.mountains=(e.mountains??v).map((e,t)=>({...e,id:String(e.id??`mountain-${t+1}`),x:Number(e.x),z:Number(e.z),radius:Number(e.radius),height:Number(e.height)})),vl(u.mountains.every(e=>Gc(e)&&Number.isFinite(e.radius)&&e.radius>0&&Number.isFinite(e.height)&&e.height>0),`mountains require finite x/z and positive radius/height`),vl(new Set(u.mountains.map(e=>e.id)).size===u.mountains.length,`mountain IDs must be unique`),vl(u.mountains.every(e=>e.range?e.range.polygon.every(([e,t])=>ll(u,e,t)):ll(u,e.x,e.z,e.radius+.1)),`mountain footprints must stay inside the world outline`),vl(u.mountains.every(e=>e.range||vc(u,e.x,e.z)>e.radius+$.riverBank),`mountain footprints must not overlap the river or its banks`),e.biomes?.geography&&(u.biomes=ts(u,e.biomes));let y=(o.length===2?o.slice(0,1):o).map((e,t)=>({from:e.id,to:o[(t+1)%o.length].id}));o.length===8&&y.push({from:o[7].id,to:o[2].id},{from:o[6].id,to:o[3].id});let b=e.connections??y,x=[`coral`,`teal`,`gold`,`blue`,`coral`,`gold`,`teal`,`blue`,`gold`,`coral`];vl(Array.isArray(b)&&(b.length>0||u.gameplay&&o.length===0),`at least one connection is required outside settlement mode`);let S=b.map((e,t)=>({...e,id:String(e.id??`line-${t+1}`),from:String(e.from),to:String(e.to),waypoints:(e.points??e.waypoints??[]).map(e=>({...Wc(e),...Number.isFinite(e.heading)?{heading:e.heading}:{}}))}));vl(S.every(e=>o.some(t=>t.id===e.from)&&o.some(t=>t.id===e.to)&&e.from!==e.to),`connections must reference two different existing city IDs`);let C=S.map(e=>[e.from,e.to].sort().join(`|`));vl(new Set(C).size===C.length,`overlapping duplicate city connections must be represented by one railway`);let w=Number(e.minTurnRadius??zc.minTurnRadius),T=Number(e.throatLength??zc.throatLength);vl(Number.isFinite(w)&&w>0,`minTurnRadius must be positive and finite`),vl(Number.isFinite(T)&&T>=0,`throatLength must be finite and nonnegative`),u.minTurnRadius=w,Ol(u,S,T);for(let t=0;t<S.length;t++){let n=S[t],r=o.find(e=>e.id===String(n.from)),i=o.find(e=>e.id===String(n.to));vl(r&&i&&r!==i,`connections must reference two different existing city IDs`);let a=n.waypoints;vl(a.every(Gc),`connection waypoints require finite x/z`);let c=n.fromPort,l={...n.toPort,heading:n.toPort.heading+Math.PI},d=Fc(u,[c,...a,l],w),f;try{f=(u.surface?Ic:Ts)(c,l,{radius:d,physicalRadius:w,world:u,waypoints:a,y:zc.railY,isAllowed:e=>ll(u,e.x,e.z,$.routeEdge)})}catch(e){throw TypeError(`${e.message} (${n.id})`,{cause:e})}let p=ws([gs(r,c),f,gs(l,i)],d),m=String(n.ownerId??r.ownerId);vl(s.has(m),`line ${n.id} references unknown owner ${m}`);let h={id:n.id,from:r.id,to:i.id,ownerId:m,color:n.color??x[t%x.length],closed:!1,fromPort:n.fromPort,toPort:n.toPort,alignment:p,...Cs(p,zc.sampleSpacing),bridges:[],tunnels:[],cuts:[],stationIds:[]};vl(h.length>Bc,`connections must have nonzero length`),vl(h.points.every(e=>ll(u,e.x,e.z,$.routeEdge))&&u.outline.every(([e,t])=>ol(h,e,t)>=$.routeEdge),`entire railway corridors must stay inside the world outline`),h.bridges=gl(h,t=>Math.min(vc(u,t.x,t.z),e.biomes?.geography?-cs(u,`ocean`,t.x,t.z):1/0)-$.bridgeBank);for(let e of u.mountains){if(ol(h,e.x,e.z)>e.radius+tl(u,e,$.cuttingHalfWidth))continue;let t=gl(h,t=>Fs(e,t.x,t.z)-tl(u,t,$.cuttingHalfWidth));h.cuts.push(...t.map(t=>({...t,mountainId:e.id})));let n=gl(h,(t,n)=>{let r=hl(h,n).tangent,i=-r.z,a=r.x,o=$.tunnelRoofHeight-ul(e,t.x,t.z);for(let n=0;n<=24;n++){let s=n/24*Math.PI,c=Math.cos(s)*$.tunnelArchRadius,l=zc.railY+$.tunnelArchSpring+Math.sin(s)*$.tunnelArchRadius,d=ut(u,t.x,t.z,Math.atan2(r.x,r.z)),f=u.surface?Ue(u,t.x,t.z,-Math.cos(d)*c,Math.sin(d)*c):{x:t.x+i*c,z:t.z+a*c},p=ul(e,f.x,f.z);o=Math.max(o,l+$.tunnelRockCover-p)}return o});for(let r of n){let n=t.find(e=>e.start<=r.start+Bc&&e.end>=r.end-Bc);h.tunnels.push({...r,mountainId:e.id,cutStart:n?.start??r.start,cutEnd:n?.end??r.end,cutEntry:n?.entry??r.entry,cutExit:n?.exit??r.exit})}}h.tunnels.sort((e,t)=>e.start-t.start),h.cuts.sort((e,t)=>e.start-t.start),h.stops=[{cityId:r.id,distance:Math.min($.stationEndDistance,h.length*.25)},{cityId:i.id,distance:h.length-Math.min($.stationEndDistance,h.length*.25)}],u.lines.push(h)}return vl(new Set(u.lines.map(e=>e.id)).size===u.lines.length,`line IDs must be unique`),jl(u),Nl(u),u.biomes??=ts(u,e.biomes),wl(u),u.placements=[],t.detail!==`network`&&(El(u),Dl(u,r,u.density),u.gameplay&&u.placements.push(...structuredClone(u.gameplay.guaranteedTrees??[]))),u}function Fl(e){let t=[],n=(t,n)=>et(e,t,n),r=(e,n,r)=>t.push({type:e,id:n,detail:r});try{ht(e.surface)}catch(e){return r(`surface`,`world`,e.message),t}let i=new Set((e.players??[]).map(e=>e.id));try{Bs(e.players??[])}catch(e){r(`players`,`world`,e.message)}for(let t of e.cities)i.has(t.ownerId)||r(`city-owner`,t.id,`City references an unknown player`),(!Number.isInteger(t.level)||t.level<1||t.level>10)&&r(`city-level`,t.id,`City level must be an integer from 1 through 10`);for(let[t,n]of Object.entries(e.trainOwners??{}))i.has(n)||r(`train-owner`,t,`Train references an unknown player`);for(let t of e.lines)i.has(t.ownerId)||r(`line-owner`,t.id,`Railway references an unknown player`);let a=[`farmland`,`forest`,`plains`,`desert`];for(let t of e.cityStreets??[]){let i=e.cities.find(e=>e.id===t.cityId);if(i&&t.ownerId===i.ownerId||r(`street-owner`,t.id,`Street must belong to its existing city owner`),!Number.isFinite(t.width)||t.width<=0||t.points.length<2||!t.points.every(Gc))r(`street-geometry`,t.id,`Street requires a positive width and finite points`);else for(let o=1;o<t.points.length;o++){let s=t.points[o-1],c=t.points[o],l=Math.max(1,Math.ceil(n(s,c)/.5)),u=t.width/2,d=je(e,s,c);for(let o=0;o<=l;o++){let c=Ue(e,s.x,s.z,d.x*o/l,d.z*o/l);(!ll(e,c.x,c.z,tl(e,c,u+$.worldEdge)-.001)||i&&n(c,i)>i.radius-u+.001)&&r(`street-edge`,t.id,`Street leaves its dry city footprint`),e.biomes&&!ls(e,a,c.x,c.z,tl(e,c,u)-.001)&&r(`street-biome`,t.id,`Street enters ocean, shore, or mountain`),al(e,c.x,c.z,u+$.track)<u+$.track-.001&&r(`street-track`,t.id,`Street enters railway clearance`),vc(e,c.x,c.z)<tl(e,c,u+$.riverBank)-.001&&r(`street-water`,t.id,`Street enters river bank`),e.mountains.some(t=>Fs(t,c.x,c.z)<tl(e,c,u+$.mountain)-.001)&&r(`street-mountain`,t.id,`Street crosses a mountain`),e.stations.some(t=>Sl(t,c.x,c.z,e)<u-.001)&&r(`street-station`,t.id,`Street overlaps a station`)}}}for(let t of e.cities){let n=(e.cityStreets??[]).filter(e=>e.cityId===t.id);if(!n.length)continue;let i=e=>`${e.x.toFixed(5)},${e.z.toFixed(5)}`,a=new Map;for(let e of n)for(let t=1;t<e.points.length;t++){let n=i(e.points[t-1]),r=i(e.points[t]);a.has(n)||a.set(n,new Set),a.has(r)||a.set(r,new Set),a.get(n).add(r),a.get(r).add(n)}let o=new Set,s=[a.keys().next().value];for(;s.length;){let e=s.pop();o.has(e)||(o.add(e),s.push(...a.get(e)))}o.size!==a.size&&r(`street-connectivity`,t.id,`City street graph is disconnected`)}for(let t of e.lines){if((!Number.isFinite(t.length)||t.length<=0)&&r(`route-length`,t.id,`Route length must be positive`),t.alignment)for(let n of t.alignment.segments)n.type===`arc`&&n.radius<(e.minTurnRadius??zc.minTurnRadius)-1e-6&&r(`route-curvature`,t.id,`Railway bend is tighter than its minimum turning radius`);for(let e=1;e<t.points.length;e++){let i=t.points[e-1],a=t.points[e];Gc(i)&&Gc(a)&&Number.isFinite(a.y)||r(`route-coordinate`,t.id,`Non-finite route point`),Math.abs(a.y-i.y)/(n(i,a)||1)>$.maximumGrade+Bc&&r(`route-grade`,t.id,`Grade exceeds 12 percent`)}for(let n of[`bridges`,`tunnels`,`cuts`])for(let i of t[n])if((i.start<0||i.end>t.length+Bc||i.end<=i.start)&&r(`structure-interval`,t.id,`Invalid ${n} interval`),n===`tunnels`){let n=e.mountains.find(e=>e.id===i.mountainId);for(let e of[i.entry,i.exit])ul(n,e.x,e.z)<$.tunnelRoofHeight-.01&&r(`tunnel-cover`,t.id,`Portal lacks roof coverage`)}}for(let t of e.stations){t.ownerId!==e.cities.find(e=>e.id===t.cityId)?.ownerId&&r(`station-owner`,t.id,`Station must belong to its city owner`);for(let n of e.lines)wc(e,t.x,t.z,tl(e,t,t.radius+$.trackHalfWidth+.25)).some(e=>fo(e,Qc(n).box))&&Cl(t,n,e)<$.trackHalfWidth+.25-.001&&r(`station-track`,t.id,`Platform overlaps ${n.id}`);(e.surface?vc(e,t.x,t.z)<tl(e,t,t.radius+$.riverBank)-.001:gc(e).some(e=>Cl(t,e)<e.width/2+$.riverBank-.001))&&r(`station-water`,t.id,`Platform enters river bank`)}for(let t=0;t<e.placements.length;t++){let i=e.placements[t],a=i.radius;i.cityId&&i.ownerId!==e.cities.find(e=>e.id===i.cityId)?.ownerId&&r(`asset-owner`,i.id,`City asset must belong to its city owner`);for(let t of e.cityStreets??[])il(e,t,i.x,i.z,a+t.width/2+$.street)<a+t.width/2+$.street-.001&&r(`asset-street`,i.id,`Footprint enters a city street`);e.biomes&&!ls(e,[`farmland`,`forest`,`plains`,`desert`],i.x,i.z,tl(e,i)-.001)&&r(`asset-biome`,i.id,`Footprint enters ocean, shore, or mountain`),ll(e,i.x,i.z,tl(e,i,a+$.worldEdge)-.001)||r(`asset-edge`,i.id,`Footprint crosses island edge`),al(e,i.x,i.z,a+$.track)<a+$.track-.001&&r(`asset-track`,i.id,`Footprint enters railway clearance`),vc(e,i.x,i.z)<tl(e,i,a+$.riverBank)-.001&&r(`asset-water`,i.id,`Footprint enters river bank`);for(let t of e.mountains)Fs(t,i.x,i.z)<tl(e,i,a+$.mountain)-.001&&r(`asset-mountain`,i.id,`Footprint intersects ${t.id}`);for(let t of e.stations)n(i,t)<a+t.radius+$.objects-.001&&r(`asset-station`,i.id,`Footprint intersects ${t.id}`);for(let o=0;o<t;o++)n(i,e.placements[o])<a+e.placements[o].radius+$.objects-.001&&(i.kind!==`farm`||e.placements[o].kind!==`farm`||Xs(e,i,e.placements[o],$.objects-.001))&&r(`asset-overlap`,i.id,`Footprint intersects ${e.placements[o].id}`)}return t}function Il(e){let{l:t=.64,c:n=.14,h:r=22}=e?.color??{},i=(e,t)=>Bt(e,t,r);return{body:i(g.clamp(t,.48,.72),Math.min(n,.17)),light:i(.83,Math.min(n*.44,.075)),dark:i(.38,Math.min(n*.65,.09)),roof:i(g.clamp(t-.08,.43,.65),Math.min(n*.95,.16)),accent:i(g.clamp(t+.06,.57,.77),Math.min(n*1.08,.18)),trim:i(.94,Math.min(n*.13,.02))}}function Ll(e){return Object.fromEntries(Object.entries(Il(e)).map(([t,n])=>[t,Ut(new ie({name:`player-${e?.id??`neutral`}-${t}`,color:n,roughness:1,metalness:0,flatShading:!0}))]))}function Rl(e,t){let{vertices:n,surfaceTriangles:r}=Ms(e),i=[];for(let e of r){let r=e.map(e=>n[e]),a=[],o=r.map(e=>e.y-t(e.x,e.z));for(let e=0;e<3;e++){let t=r[e],n=r[(e+1)%3],i=o[e],s=o[(e+1)%3];if(i>=0&&a.push([t.x,t.z]),i>=0!=s>=0){let e=i/(i-s);a.push([t.x+(n.x-t.x)*e,t.z+(n.z-t.z)*e])}}if(a.length>=3){let e=a.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6]);i.push([[...e,e[0]]])}}return i.length?Qt.union(...i):[]}function zl(e,t){return Rl(e,()=>e.height*t)}function Bl(e){return{low:zl(e,.12),high:zl(e,.62),snow:e.range?Rl(e,(t,n)=>Ps(e,t,n)):e.height>8?zl(e,.84):[]}}function Vl(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of e[0])t=Math.min(t,a),n=Math.min(n,o),r=Math.max(r,a),i=Math.max(i,o);return{minX:t,minZ:n,maxX:r,maxZ:i}}function Hl(e,t){let n=e.biomes.land,r=t.water,i=e.biomes.ocean??[],a=i.length&&t.banks.length?Qt.difference(t.banks,i):t.banks,o=[...e.biomes.oceanShore??[],...a],s=new go([...r,...t.banks],Vl),c=e=>e.flatMap(e=>{let t=s.query(Vl(e));return t.length?Qt.difference([e],t):[e]});return{land:n,shores:o,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Bl(e);return{id:e.id,low:c(t.low),high:c(t.high),snow:c(t.snow)}}),colorField:{seed:e.seed,sites:e.biomes.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes.shoreWidth}}}function Ul(e){let t=[[e.outline]],n=Cc(e);if(e.surface?.complete&&e.biomes?.land)return Hl(e,n);let r=n.water,i=e.biomes?.ocean??[],a=i.length?Qt.union(r,i):r,o=Qt.difference(n.banks,a),s=e.biomes?.oceanShore?.length?Qt.union(o,e.biomes.oceanShore):o,c=Qt.difference(t,a,s);return{land:c,shores:s,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Bl(e);return{id:e.id,low:Qt.intersection(t.low,c),high:Qt.intersection(t.high,c),snow:Qt.intersection(t.snow,c)}}),colorField:{seed:e.seed,sites:e.biomes?.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes?.shoreWidth}}}var Wl=new WeakMap,Gl=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e));function Kl(e,t){let n=Math.imul(e,374761393)^Math.imul(t,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function ql(e,t,n=24){e/=n,t/=n;let r=Math.floor(e),i=Math.floor(t),a=Gl(e-r),o=Gl(t-i),s=Kl(r,i)*(1-a)+Kl(r+1,i)*a,c=Kl(r,i+1)*(1-a)+Kl(r+1,i+1)*a;return s*(1-o)+c*o}function Jl(e){let t=e.terrainSource??e,n=t.biomes?.sites??t.sites;if(!n?.length)return null;if(!Wl.has(n)||Wl.get(n).seed!==t.seed){if(t.surface?.complete){let e={seed:t.seed,globe:Kt(t,n)};return Wl.set(n,e),e}let e=Math.hypot(t.bounds?.width??130,t.bounds?.depth??95),r=Math.min(22,Math.max(4.5,e*.011)),i={farmland:Z.grass.clone().lerp(Z.farmland,.43),forest:Z.grass.clone().lerp(Z.forestFloor,.78),plains:Z.grass.clone(),desert:Z.desert.clone()};Wl.set(n,{seed:t.seed,sites:n.map(e=>({...e,color:e.ice?Z.snow:i[e.type]??Z.grass})),width:r,period:t.surface?.complete?t.bounds.width:0,distances:new Float64Array(n.length)})}return Wl.get(n)}var Yl={};function Xl(e,t,n,{map:r=!1,target:i=new H}={}){let a=Jl(e);if(!a)return i.copy(Z.grass);if(a.globe)return Ht(a.globe,t,n,i);let{sites:o,width:s,distances:c,period:l}=a,u=(e,t,n)=>{if(!l)return ql(e,t,n);let r=((e+l/2)%l+l)%l,i=Gl(r/l);return ql(r,t,n)*(1-i)+ql(r-l,t,n)*i},d=t+(u(t+171,n-87,45)-.5)*s*.85,f=n+(u(t-73,n+119,39)-.5)*s*.85,p=1/0,m=0,h=0,g=0,_=0,v=0;for(let e=0;e<o.length;e++){let t=l?((d-o[e].x+l/2)%l+l)%l-l/2:d-o[e].x;c[e]=Math.hypot(t,f-o[e].z),p=Math.min(p,c[e])}i.setRGB(0,0,0);for(let e=0;e<o.length;e++){let t=Gl(1-(c[e]-p)/s),n=o[e].color,r=o[e];i.r+=n.r*t,i.g+=n.g*t,i.b+=n.b*t,m+=t,r.ice?_+=t:r.type===`forest`?h+=t:r.type===`desert`?g+=t:r.type===`plains`&&(v+=t)}i.multiplyScalar(1/m),zt(e.terrainSource??e,t,n,Yl),Wt(i,Yl,h/m,g/m,_/m,v/m);let y=(u(t,n,29)-.5)*.09+(u(t+243,n-192,91)-.5)*.07;return i.multiplyScalar(1+y*(r?.42:1)),r&&i.lerp(Z.trim,.09),i}function Zl(t,n,{map:r=!1,maxEdge:i=r?24:8}={}){if(!Number.isFinite(i)||i<=0)throw TypeError(`Terrain color edge spacing must be positive and finite`);let a=t.attributes.position,o=t.index,s=[],c=[],l=new H,u=[],d=i*i,f=!r&&n.terrainChunk?n.bounds:null,p=new Map,m=new H,h=f?[[0,f.minX,2],[0,f.maxX,2],[2,f.minZ,0],[2,f.maxZ,0]]:[],g=f?Math.max(1e-6,...h.map(([,e])=>Math.abs(e)*1e-7)):0;function _(e,t,r){let i=`${e}:${t}:${r}`;if(!p.has(i)){let a=e===0?t:r,o=e===2?t:r;p.set(i,Xl(n,a,o))}return p.get(i)}function v(e){for(let[t,n,r]of h)if(Math.abs(e[t]-n)<=g){let i=Math.floor(e[r]/2)*2,a=(e[r]-i)/2;return l.copy(_(t,n,i)),m.copy(_(t,n,i+2)),l.lerp(m,a)}return Xl(n,e[0],e[2],{map:r,target:l})}function y(e){for(let t=0;t<3;t++){let n=e[t],r=e[(t+1)%3];for(let[e,i,a]of h){if(Math.abs(n[e]-i)>g||Math.abs(r[e]-i)>g)continue;let o=Math.min(n[a],r[a]),s=Math.max(n[a],r[a]),c=Math.ceil((o+g)/2)*2,l=Math.floor((s-g)/2)*2;if(c>l)continue;let u=Math.max(c,Math.min(l,Math.round((o+s)/2/2)*2)),d=(u-n[a])/(r[a]-n[a]),f=n.map((e,t)=>e+(r[t]-e)*d);return f[a]=u,{j:t,m:f}}}return null}let b=[new H,new H,new H],x=new H;function S(e){e.forEach((e,t)=>Xl(n,e[0],e[2],{map:!0,target:b[t]}));for(let t of[[.5,.5,0],[0,.5,.5],[.5,0,.5],[1/3,1/3,1/3]]){let r=0,i=0,a=0,o=0,s=0;for(let n=0;n<3;n++){let c=t[n];r+=e[n][0]*c,i+=e[n][2]*c,a+=b[n].r*c,o+=b[n].g*c,s+=b[n].b*c}if(Xl(n,r,i,{map:!0,target:x}),Math.max(Math.abs(x.r-a),Math.abs(x.g-o),Math.abs(x.b-s))>.004)return!1}return!0}let C=e=>[a.getX(e),a.getY(e),a.getZ(e)],w=o?.count??a.count;for(let e=0;e<w;e+=3)for(u.push([C(o?o.getX(e):e),C(o?o.getX(e+1):e+1),C(o?o.getX(e+2):e+2)]);u.length;){let e=u.pop(),t=-1,n=d;for(let r=0;r<3;r++){let i=e[r],a=e[(r+1)%3],o=(i[0]-a[0])**2+(i[2]-a[2])**2;o>n&&(n=o,t=r)}if(t>=0&&r&&n<=(i*8)**2&&S(e)&&(t=-1),t>=0){let n=e[t],r=e[(t+1)%3],i=e[(t+2)%3],a=n.map((e,t)=>(e+r[t])/2);u.push([n,a,i],[a,r,i]);continue}let a=y(e);if(a){let{j:t,m:n}=a,r=e[t],i=e[(t+1)%3],o=e[(t+2)%3];u.push([r,n,o],[n,i,o])}else for(let t of e)s.push(...t),v(t),c.push(l.r,l.g,l.b)}let T=new Ze;return T.setAttribute(`position`,new e(s,3)),T.setAttribute(`color`,new e(c,3)),T.computeVertexNormals(),T}function Ql(t,n=8){if(!(n>0&&Number.isFinite(n)))throw RangeError(`Surface segment length must be positive and finite`);let r=Object.keys(t.attributes),i=r.map(e=>t.attributes[e]);if(i.some(e=>e.isInterleavedBufferAttribute))throw TypeError(`Surface tessellation needs ordinary buffer attributes`);let a=t.attributes.position;if(!a||a.itemSize!==3)throw TypeError(`Surface tessellation needs three-dimensional positions`);let o=[],s=[],c=0;for(let e of i)o.push(c),s.push(e.itemSize),c+=e.itemSize;let l=o[r.indexOf(`position`)],u=i.map(()=>[]),d=n*n*(1+1e-12),f=e=>{let t=new Float64Array(c);for(let n=0;n<i.length;n++)for(let r=0;r<s[n];r++)t[o[n]+r]=i[n].array[e*s[n]+r];return t},p=(e,t)=>{let n=new Float64Array(c);for(let r=0;r<c;r++)n[r]=(e[r]+t[r])*.5;return n},m=(e,t)=>{let n=e[l]-t[l],r=e[l+2]-t[l+2];return n*n+r*r>d},h=e=>{for(let t=0;t<i.length;t++)for(let n=0;n<s[t];n++)u[t].push(e[o[t]+n])},g=t.index?.array,_=g?.length??a.count,v=[];for(let e=0;e<_;e+=3)for(v.push([f(g?g[e]:e),f(g?g[e+1]:e+1),f(g?g[e+2]:e+2)]);v.length;){let[e,t,n]=v.pop(),r=m(e,t),i=m(t,n),a=m(n,e),o=!!r|(i?2:0)|(a?4:0);if(!o){h(e),h(t),h(n);continue}let s=r?p(e,t):null,c=i?p(t,n):null,l=a?p(n,e):null;o===7?v.push([e,s,l],[s,t,c],[l,c,n],[s,c,l]):o===1?v.push([e,s,n],[s,t,n]):o===2?v.push([e,t,c],[e,c,n]):o===4?v.push([e,t,l],[t,n,l]):o===3?v.push([e,s,n],[s,c,n],[s,t,c]):o===5?v.push([e,s,l],[s,t,n],[s,n,l]):v.push([e,t,c],[e,c,l],[l,c,n])}let y=new Ze;for(let t=0;t<i.length;t++)y.setAttribute(r[t],new e(u[t],s[t],i[t].normalized));return y}function $l(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);if(!e.length)return[];let n=[],r=e[0],i=e.at(-1),a=r[0]===i[0]&&r[1]===i[1];for(let r=0;r<e.length-+!!a;r++){let i=e[r],a=e[(r+1)%e.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=2**Math.max(0,Math.ceil(Math.log2(o/t)));for(let e=0;e<s;e++)n.push([i[0]+(a[0]-i[0])*e/s,i[1]+(a[1]-i[1])*e/s])}return a&&n.push([...r]),n}function eu(e){if(e.index)throw TypeError(`Exact indexing requires non-indexed geometry`);if(Object.keys(e.morphAttributes).length)throw TypeError(`Exact indexing does not support morph attributes`);let t=Object.keys(e.attributes),n=t.map(t=>e.attributes[t]),r=e.attributes.position?.count??0;for(let e of n)if(e.isInterleavedBufferAttribute||!(e.array instanceof Float32Array)||e.count!==r||!Number.isInteger(e.itemSize)||e.itemSize<1)throw TypeError(`Exact indexing requires equally sized, non-interleaved Float32 attributes`);let i=n.map(e=>new Uint32Array(e.array.buffer,e.array.byteOffset,e.array.length)),a=new Uint32Array(r),o=new Uint32Array(r),s=1;for(;s<r*2;)s*=2;let c=new Int32Array(s),l=s-1,u=0;for(let e=0;e<r;e++){let t=2166136261;for(let r=0;r<n.length;r++){let a=n[r].itemSize,o=e*a;for(let e=0;e<a;e++)t=Math.imul(t^i[r][o+e],16777619)}t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16;let r=t&l;for(;c[r];){let t=c[r]-1,a=!0;for(let r=0;a&&r<n.length;r++){let o=n[r].itemSize,s=e*o,c=t*o;for(let e=0;e<o;e++)if(i[r][s+e]!==i[r][c+e]){a=!1;break}}if(a)break;r=r+1&l}c[r]?a[e]=a[c[r]-1]:(c[r]=e+1,a[e]=u,o[u++]=e)}let d=new Ze;for(let e=0;e<n.length;e++){let r=n[e],a=r.itemSize,s=new Float32Array(u*a),c=new Uint32Array(s.buffer);for(let t=0;t<u;t++){let n=t*a,r=o[t]*a;for(let t=0;t<a;t++)c[n+t]=i[e][r+t]}let l=new B(s,a,r.normalized);l.name=r.name,l.setUsage(r.usage),l.gpuType=r.gpuType,d.setAttribute(t[e],l)}d.setIndex(new B(u<=65535?new Uint16Array(a):a,1)),d.name=e.name;for(let t of e.groups)d.addGroup(t.start,t.count,t.materialIndex);return d.setDrawRange(e.drawRange.start,e.drawRange.count),d.boundingBox=e.boundingBox?.clone()??null,d.boundingSphere=e.boundingSphere?.clone()??null,d}function tu(e){return Object.values(e.attributes).reduce((e,t)=>e+t.array.byteLength,0)+(e.index?.array.byteLength??0)}function nu(e,t){let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let[t,o]of e[0]){if(!Number.isFinite(t)||!Number.isFinite(o))throw TypeError(`Map tiles require finite polygon coordinates`);n=Math.min(n,t),i=Math.max(i,t),r=Math.min(r,o),a=Math.max(a,o)}return{left:Math.floor(n/t),right:Math.ceil(i/t),top:Math.floor(r/t),bottom:Math.ceil(a/t)}}var ru=(e,t,n,r,i)=>[[[[e*i,t*i],[n*i,t*i],[n*i,r*i],[e*i,r*i],[e*i,t*i]]]];function iu(e,t=192){if(!(Number.isFinite(t)&&t>0))throw RangeError(`Map tile size must be positive and finite`);if(!Array.isArray(e))throw TypeError(`Map tiles require a MultiPolygon`);let n=[],r=[];for(let n=e.length-1;n>=0;n--){let i=e[n];!Array.isArray(i)||!Array.isArray(i[0])||i[0].length<3||r.push({polygon:i,...nu(i,t)})}for(;r.length;){let{polygon:e,left:i,right:a,top:o,bottom:s}=r.pop();if(a<=i||s<=o)continue;if(a-i<=1&&s-o<=1){n.push(e);continue}let c=a-i>=s-o,l=Math.floor(c?(i+a)/2:(o+s)/2),u=c?[{left:i,right:l,top:o,bottom:s},{left:l,right:a,top:o,bottom:s}]:[{left:i,right:a,top:o,bottom:l},{left:i,right:a,top:l,bottom:s}];for(let n=u.length-1;n>=0;n--){let i=u[n],a=Qt.intersection([e],ru(i.left,i.top,i.right,i.bottom,t));for(let e=a.length-1;e>=0;e--){let n=a[e],o=nu(n,t);r.push({polygon:n,left:Math.max(i.left,o.left),right:Math.min(i.right,o.right),top:Math.max(i.top,o.top),bottom:Math.min(i.bottom,o.bottom)})}}}return n}var au=new WeakMap,ou=new X,su={},cu=Bt(.57,.092,235),lu=Bt(.615,.091,224),uu=Bt(.72,.082,202),du=Bt(.64,.055,219),fu=Bt(.75,.045,207),pu=Z.sand.clone().lerp(Z.oceanLight,.32).multiplyScalar(.94),mu=Z.rockLight.clone().lerp(Z.oceanLight,.25).multiplyScalar(.87),hu=Z.snow.clone().lerp(Z.oceanLight,.26),gu={},_u=new H,vu=new H,yu=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e)),bu=(e,t,n)=>{let r=0,i=0;for(let a=0;a<e.length;a++){let o=n[a]-t[a];r+=(e[a]-t[a])*o,i+=o*o}let a=Math.max(0,Math.min(1,r/(i||1))),o=0;for(let r=0;r<e.length;r++)o+=(e[r]-t[r]-(n[r]-t[r])*a)**2;return o};function xu(e){if(!e.length)return null;let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let{a:r,b:i}of e)for(let e=0;e<3;e++)t[e]=Math.min(t[e],r[e],i[e]),n[e]=Math.max(n[e],r[e],i[e]);if(e.length<=8)return{min:t,max:n,items:e};let r=0;for(let e=1;e<3;e++)n[e]-t[e]>n[r]-t[r]&&(r=e);e.sort((e,t)=>e.a[r]+e.b[r]-(t.a[r]+t.b[r]));let i=e.length>>1;return{min:t,max:n,left:xu(e.slice(0,i)),right:xu(e.slice(i))}}function Su(e,t,n){let r=n*n,i=e=>e.min.reduce((n,r,i)=>n+Math.max(r-t[i],0,t[i]-e.max[i])**2,0),a=e=>{if(!(!e||i(e)>r)){if(e.items)for(let n of e.items)r=Math.min(r,bu(t,n.a,n.b));else i(e.left)<i(e.right)?(a(e.left),a(e.right)):(a(e.right),a(e.left))}};return a(e),Math.sqrt(r)}function Cu(e){let t=e.terrainSource??e,n=t.biomes?.ocean??t.ocean;if(!n?.length)return null;let r=au.get(n);if(r)return r;let i=t.surface?.complete,a=i?t.bounds?.width??2*Math.PI*t.surface.radius:0,o=[],s=[],c=new X,l=new X;for(let e of n)for(let n of e)for(let e=0;e<n.length;e++){let r=n[e],u=n[(e+1)%n.length];r[0]===u[0]&&r[1]===u[1]||i&&(Math.abs(Math.abs(r[0])-a/2)<.002&&Math.abs(r[0]-u[0])<.002||Math.abs(Math.abs(r[1])-a/4)<.002&&Math.abs(r[1]-u[1])<.002)||(o.push({a:r,b:u,minX:Math.min(r[0],u[0]),maxX:Math.max(r[0],u[0]),minZ:Math.min(r[1],u[1]),maxZ:Math.max(r[1],u[1])}),i&&(rt(t,...r,c).multiplyScalar(t.surface.radius),rt(t,...u,l).multiplyScalar(t.surface.radius),s.push({a:c.toArray(),b:l.toArray()})))}return r={source:t,period:a,edges:new go(o),sphere:xu(s)},au.set(n,r),r}function wu(e,t,n,r=1/0){let i=Cu(e);if(!i)return r;let a=i.period?[0,-i.period,i.period]:[0],o=r;for(let e of a)o=i.edges.nearest(t+e,n,r=>Math.sqrt(bu([t+e,n],r.a,r.b)),o);return o}function Tu(e,t,n,r=new H){let i=e.terrainSource??e;if(!i.surface?.complete)return r.copy(Z.ocean);rt(i,t,n,ou),Le(i,t,n,su);let{x:a,y:o,z:s}=ou,c=Math.abs(su.latitude)/90,l=(Math.sin(a*5.1+o*2.3-s*3.7)+Math.sin(o*6.3+s*4.2+a*1.7))*.25+.5;r.copy(cu).lerp(lu,.38+.42*l-.15*c);let u=yu((c-.5)/.43);r.lerp(du,u*.26);let d=Cu(i),f=(24+18*l)*(1-u*.32),p=d?.sphere?Su(d.sphere,[a*i.surface.radius,o*i.surface.radius,s*i.surface.radius],f*2):f*2,m=Math.exp(-((p/f)**2))*(.64-.16*c);return vu.copy(uu).lerp(fu,u*.72),r.lerp(vu,m)}function Eu(e,t,n,{map:r=!1,target:i=new H}={}){let a=e.terrainSource??e,o=a.biomes?.shoreWidth??a.shoreWidth??.9,s=wu(a,t,n,o*2);if(s>=o*1.5)return i.copy(Z.sand);let c=yu(s/o);Xl(a,t,n,{map:r,target:i}),zt(a,t,n,gu);let l=yu((gu.patch-.3)/.5)*.58,u=a.surface?.complete?yu((Math.abs(gu.latitude)-61)/18):0;return _u.copy(pu).lerp(mu,l).lerp(hu,u*.8),i.lerp(_u,1-c)}function Du(e,t,n){let r=t.surface.projection?.radius??t.surface.radius,i=2*Math.PI*r,a=[];for(let t of e)for(let e of t)for(let t=0;t<e.length;t++){let n=e[t],r=e[(t+1)%e.length],o=r[0]-n[0],s=r[1]-n[1];o===0&&s===0||Math.abs(Math.abs(n[0])-i/2)<.002&&Math.abs(o)<.002||Math.abs(Math.abs(n[1])-i/4)<.002&&Math.abs(s)<.002||a.push({a:n,b:r,dx:o,dz:s,length2:o*o+s*s,minX:Math.min(n[0],r[0]),maxX:Math.max(n[0],r[0]),minZ:Math.min(n[1],r[1]),maxZ:Math.max(n[1],r[1])})}let o=new go(a);return(e,t,r)=>{let a=48;for(let n of[0,-i,i]){let r=e+n;a=o.nearest(r,t,e=>{let n=Math.max(0,Math.min(1,((r-e.a[0])*e.dx+(t-e.a[1])*e.dz)/e.length2));return Math.hypot(r-e.a[0]-n*e.dx,t-e.a[1]-n*e.dz)},a)}let s=Math.max(0,Math.min(1,a/48)),c=s*s*(3-2*s);return Xl(n,e,t,{map:!0,target:r}),r.multiplyScalar(1-.07*c).lerp(Z.forestFloor,.18*c).lerp(Z.mountainFloor,.08*c)}}function Ou(e,t=e){let n=t.surface?.type===`sphere`,r=t.surface?.complete,i=new Map;function a(a,o,s,c=!1,l=null){for(let u of r?iu(a,128):a){let a=n?u.map(e=>$l(e,8)):u,d=new mt(a[0].map(([e,t])=>new dt(e,-t)));for(let e of a.slice(1))d.holes.push(new ve(e.map(([e,t])=>new dt(e,-t))));let f=new k(d);if(f.rotateX(-Math.PI/2),f.translate(0,o,0),c&&!r){let t=f;f=Zl(t,e.colorField,{map:!0}),t.dispose()}if(n){for(let e of Object.keys(f.attributes))e!==`position`&&e!==`color`&&f.deleteAttribute(e);let t=f;if(f=Ql(t,r&&s===`terrain`?32:16),t.dispose(),r){let t=f;if(f=eu(t),t.dispose(),c){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new H;for(let i=0;i<t.count;i++)Xl(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),n[i*3]=r.r,n[i*3+1]=r.g,n[i*3+2]=r.b;f.setAttribute(`color`,new B(n,3))}}}if(s===`sand`||l){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new H;for(let i=0;i<t.count;i++)l?l(t.getX(i),t.getZ(i),r):Eu(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),r.toArray(n,i*3);f.setAttribute(`color`,new B(n,3))}n&&(f.scale(1,16,1),Pt(f,t));let p=f.index&&!r?f.toNonIndexed():f;i.has(s)||i.set(s,[]),i.get(s).push({position:p.attributes.position.array,vertexColor:p.attributes.color?.array,index:r?p.index?.array:void 0}),p!==f&&f.dispose(),p.dispose()}}a(e.land,0,`terrain`,!0),a(e.shores,.003,`sand`),a(e.river,.006,`waterLight`),t.surface?.complete||a(e.ocean,n?.01:.007,`ocean`);for(let n of e.mountains)a(n.low,.02,`contour0`,!1,r?Du(n.low,t,e.colorField):null),a(n.high,.023,`contour1`),a(n.snow,.033,`snow`);return[...i].map(([e,t])=>{let i=new Float32Array(t.reduce((e,t)=>e+t.position.length,0)),a=t[0].vertexColor?new Float32Array(i.length):void 0,o=0;for(let e of t)i.set(e.position,o),a?.set(e.vertexColor,o),o+=e.position.length;if(r){let n=new Uint32Array(t.reduce((e,t)=>e+t.index.length,0)),r=0,o=0;for(let e of t){for(let t of e.index)n[r++]=o+t;o+=e.position.length/3}return{color:e,position:i,index:n,...a?{vertexColor:a}:{}}}if(n){let t=new Ze;t.setAttribute(`position`,new B(i,3)),a&&t.setAttribute(`color`,new B(a,3));let n=eu(t);if(tu(n)<tu(t)){let r={color:e,position:n.attributes.position.array,index:n.index.array,...a?{vertexColor:n.attributes.color.array}:{}};return t.dispose(),n.dispose(),r}t.dispose(),n.dispose()}return{color:e,position:i,...a?{vertexColor:a}:{}}})}function ku(e,t){return e.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t},e.vertexShader=`uniform float mapSurfaceRadius; varying float globeLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
      vec3 viewNormal=mat3(viewMatrix)*radialNormal;
      globeLight=0.44+0.62*max(0.0,dot(viewNormal,normalize(vec3(-0.48,0.58,0.92))));`),e.fragmentShader=`varying float globeLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= globeLight;
 outgoingLight *= mix(vec3(0.91,0.97,1.05), vec3(1.04,1.01,0.93), smoothstep(0.50,1.0,globeLight));
#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`complete-globe-light-v2`,e}var Au={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`},ju={grass:Z.grass.clone().lerp(Z.trim,.1),farmland:Z.farmland.clone().lerp(Z.trim,.08),forestFloor:Z.forestFloor.clone().lerp(Z.grass,.27),desert:Z.desert.clone(),mountainFloor:Z.mountainFloor.clone().lerp(Z.grass,.25),contour0:Z.forestFloor.clone().lerp(Z.grass,.32),contour1:Z.rockLight.clone().lerp(Z.grass,.2),ink:Z.window.clone().lerp(Z.rail,.18),paper:Z.trim.clone()};function Mu(e){let t=new mt(e[0].map(([e,t])=>new dt(e,-t)));e.slice(1).forEach(e=>t.holes.push(new ve(e.map(([e,t])=>new dt(e,-t)))));let n=new k(t);return n.rotateX(-Math.PI/2),n}function Nu(e,t){let n=e/2,r=(t-e)/2,i=new mt;i.moveTo(-n,-r),i.lineTo(-n,r),i.absarc(0,r,n,Math.PI,0,!0),i.lineTo(n,-r),i.absarc(0,-r,n,0,-Math.PI,!0),i.closePath();let a=new k(i,2);return a.rotateX(-Math.PI/2),a}function Pu(e,t,n,r=1,i=1){let a=g.clamp(Math.round(Number(e.level)||1),1,10),o=(1.75+a*.12)*r,s=a<=3?[[-.61,.48],[.61,.48],[.61,-.1],[0,-.68],[-.61,-.1]]:a<=6?[[-.75,.48],[.75,.48],[.75,-.07],[.43,-.07],[.43,-.34],[0,-.68],[-.43,-.34],[-.43,-.07],[-.75,-.07]]:[[-.73,.48],[.73,.48],[.73,-.07],[.39,-.07],[.39,-.4],[.18,-.4],[.18,-.74],[-.18,-.74],[-.18,-.4],[-.39,-.4],[-.39,-.07],[-.73,-.07]],c=t?Il(t):{body:Z.roof,trim:Z.trim},l=(e,t,n)=>{let r=Mu([e]),a=r.toNonIndexed();r.dispose(),a.translate(0,n*i,0);let o=new Float32Array(a.attributes.position.count*3);for(let e=0;e<o.length;e+=3)o[e]=t.r,o[e+1]=t.g,o[e+2]=t.b;return a.setAttribute(`color`,new B(o,3)),a},u=(e,t,n)=>l(Array.from({length:12},(t,n)=>[Math.cos(n*Math.PI/6)*o*e,Math.sin(n*Math.PI/6)*o*e]),t,n),d=u(1,ju.ink,.091),f=u(.89,c.trim,.094),p=l(s.map(([e,t])=>[e*o,t*o]),c.body,.097),m=co([d,f,p],!1);d.dispose(),f.dispose(),p.dispose();let h=m.attributes.position.count,_=new Float32Array(h*3);for(let e=0;e<h;e++)c.body.toArray(_,e*3);m.setAttribute(`cityDotColor`,new B(_,3)),m.setAttribute(`cityCompactScale`,new B(new Float32Array(h).fill(Ga/(2*Ka(a))),1));let v=new Y(m,n);return v.name=`map-city-${e.id}`,v.position.set(e.x,0,e.z),v.userData={cityId:e.id,ownerId:e.ownerId??null,level:a},v}function Fu(t,n){let r=n.surface?.type===`sphere`,i=r?16:1,o=new q;o.name=`map-world`,t.add(o);let s=new q;s.name=`map-static`,o.add(s);let c=new q;c.name=`map-cities`,o.add(c);let l=new q;l.name=`map-trains`,o.add(l);let u=new Map((n.players??[]).map(e=>[e.id,e])),d=new Map([...u].map(([e,t])=>[`player:${e}:body`,Il(t).body])),f=e=>u.has(e.state?.ownerId)?`player:${e.state.ownerId}:body`:Au[e.state?.color]??e.state?.color??`redLight`,p=g.clamp(Math.sqrt((n.bounds?.width??130)*(n.bounds?.depth??95)/12350),1,2.6),m=new Map,h=new Map,_=new Set,v=[],y=[],b=[],x=new X,S=new X,C=new X,w=new X,T=new X,E=new X,D=(e,t)=>(Ne(n,e.x,e.z,t),t.setPosition(Be(n,e.x,0,e.z,x)),t),k={cityBatches:0,trainBatches:0,updatedCars:0,staticVertices:0,farTrains:!1,declutterPasses:0,cityAttributeUpdates:0,networkVisibility:1},A={value:1},j={value:1},M={value:1},P=!1,F=(e,t=!1)=>{m.has(e)||m.set(e,new a({name:`map-${e}`,color:t||e===`terrain`?16777215:d.get(e)??ju[e.replace(`route-`,``)]??Z[e]??Z.trim,vertexColors:t||e===`terrain`,side:2,toneMapped:!1}));let i=m.get(e);if(e.startsWith(`route-`)&&!i.userData.routeShader&&(i.userData.routeShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapRouteScale=A,e.vertexShader=`attribute vec3 routeOffset; uniform float mapRouteScale;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position) + routeOffset * (mapRouteScale - 1.0);`)},i.customProgramCacheKey=()=>`map-route-width`),r&&[`terrain`,`sand`,`waterLight`,`ocean`,`contour0`,`contour1`,`snow`].includes(e)&&!i.userData.surfaceShader&&(i.userData.surfaceShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:n.surface.radius},e.vertexShader=`uniform float mapSurfaceRadius; varying float surfaceLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
          vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
          surfaceLight=0.52+0.52*max(0.0,dot(radialNormal,normalize(vec3(-0.45,0.82,0.35))));`),e.fragmentShader=`varying float surfaceLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= surfaceLight;
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>`map-surface-light`,n.surface.complete&&ku(i,n.surface.radius)),!i.userData.mapStyle){i.userData.mapStyle=!0;let t=e.startsWith(`route-`)||e===`paper`||e.startsWith(`player:`)||Object.values(Au).includes(e);Ut(i,{kind:t?`map-symbol`:[`ocean`,`waterLight`].includes(e)?`water`:`map`,role:e.endsWith(`paper`)?`paper`:e.endsWith(`ink`)?`ink`:`owner`}),t&&Ja(i,M)}return i},I=(e,t,n=0,r=0,i=0,a=0)=>{e.rotateY(a),e.translate(r,n,i);let o=e.index?e.toNonIndexed():e;o!==e&&e.dispose();for(let e of Object.keys(o.attributes))e!==`position`&&e!==`routeOffset`&&o.deleteAttribute(e);h.has(t)||h.set(t,[]),h.get(t).push(o)},ee=(t,a,o,s)=>{let c=[],l=[];for(let e=0;e<t.length-1;e++){let s=t[e],u=t[e+1],d=u.x-s.x,f=u.z-s.z,p=Math.hypot(d,f)||1,m=e=>e.tangent?{x:e.tangent.z,z:-e.tangent.x}:{x:f/p,z:-d/p},h=m(s),g=m(u),_=[{x:s.x-h.x*a/2,z:s.z-h.z*a/2},{x:s.x+h.x*a/2,z:s.z+h.z*a/2},{x:u.x-g.x*a/2,z:u.z-g.z*a/2},{x:u.x+g.x*a/2,z:u.z+g.z*a/2}],v=r?[s,u].flatMap((e,t)=>{let r=t?g:h;return Be(n,e.x,o*i,e.z,C),rt(n,e.x,e.z,w),Et(n,e.x,o*i,e.z,-r.z,0,r.x,T).normalize(),E.crossVectors(w,T).normalize(),[-1,1].map(e=>(S.copy(C).addScaledVector(E,e*a/2),S.y+=n.surface.radius,S.setLength(n.surface.radius+o*i),S.y-=n.surface.radius,S.clone()))}):null;for(let e of[0,2,1,1,2,3]){let t=e<2?s:u,a=_[e];r?(S.copy(v[e]),Be(n,t.x,o*i,t.z,C),c.push(S.x,S.y,S.z),l.push(S.x-C.x,S.y-C.y,S.z-C.z)):(c.push(a.x,o,a.z),l.push(a.x-t.x,0,a.z-t.z))}}let u=new Ze;u.setAttribute(`position`,new e(c,3)),u.setAttribute(`routeOffset`,new e(l,3)),I(u,s)},L=n.mapTerrain??Ul(n);for(let{color:e,position:t,vertexColor:r,index:i}of L.meshes??Ou(L,n)){let n=new Ze;n.setAttribute(`position`,new B(t,3)),i&&n.setIndex(new B(i,1)),r&&n.setAttribute(`color`,new B(r,3)),h.set(e,[n])}for(let e of n.lines)for(let t of e.renderRanges??[{start:0,end:e.length}]){let n=[t.start];for(let i of e.alignment?.segments??[{startDistance:0,endDistance:e.length,type:`arc`,radius:8}]){let e=Math.max(t.start,i.startDistance),a=Math.min(t.end,i.endDistance);if(a<=e)continue;let o=i.type===`line`?a-e:Math.max(.4,Math.sqrt(8*(i.radius??8)*.025)),s=r?Math.min(8,o):o,c=Math.max(1,Math.ceil((a-e)/s));for(let t=1;t<=c;t++)n.push(e+(a-e)*t/c)}let i=n.map(t=>hl(e,t));ee(i,.96,.075,`route-paper`),ee(i,.42,.078,`route-ink`)}for(let[e,t]of h){let n=co(t,!1);_.add(n);let r=new Y(n,F(e,!!n.attributes.color));r.name=`map-${e.replace(`route-`,``)}`,s.add(r),e.startsWith(`route-`)&&(r.frustumCulled=!1,b.push(r)),k.staticVertices+=n.attributes.position.count,t.forEach(e=>e.dispose())}h.clear();let R=new a({name:`map-city`,vertexColors:!0,side:2,toneMapped:!1});R.onBeforeCompile=e=>{e.uniforms.mapCityScale=j,e.vertexShader=`uniform float mapCityScale; attribute float cityDetail; attribute float cityCompactScale; attribute vec3 cityDotColor;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,`#include <color_vertex>
      #ifdef USE_COLOR
        vColor.xyz=mix(cityDotColor,vColor.xyz,cityDetail);
      #endif`),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`float citySize=mapCityScale*mix(cityCompactScale,1.0,cityDetail); vec3 transformed = vec3(position.x * citySize, position.y, position.z * citySize);`)},R.customProgramCacheKey=()=>`map-city-screen-size-v2`,Ut(R,{kind:`map-symbol`,role:`owner`}),Ja(R,M),m.set(`city-glyph`,R);let z=(e,t,i=0,a=!1)=>y.push({city:e,attribute:t,index:i,instanced:a,detail:1,target:1,anchor:Be(n,e.x,0,e.z),normal:r?rt(n,e.x,e.z):null});if((n.cities?.length??0)<=32)for(let e of n.cities??[]){let t=Pu(e,u.get(e.ownerId),R,p,i),n=new B(new Float32Array(t.geometry.attributes.position.count).fill(1),1);n.setUsage(O),t.geometry.setAttribute(`cityDetail`,n),z(e,n),r&&(t.matrixAutoUpdate=!1,D(e,t.matrix)),t.frustumCulled=!1,_.add(t.geometry),c.add(t)}else{let e=new Map,t=new V;for(let t of n.cities){let n=`${t.ownerId}:${t.level}`;e.has(n)||e.set(n,[]),e.get(n).push(t)}for(let[n,r]of e){let e=Pu(r[0],u.get(r[0].ownerId),R,p,i),a=new nt(new Float32Array(r.length).fill(1),1);a.setUsage(O),e.geometry.setAttribute(`cityDetail`,a),_.add(e.geometry);let o=new Tt(e.geometry,R,r.length);o.frustumCulled=!1,o.name=`map-city-batch-${n}`,o.userData.instanceCityIds=r.map(e=>e.id),r.forEach((e,n)=>{D(e,t),o.setMatrixAt(n,t),z(e,a,n,!0)}),o.computeBoundingSphere(),c.add(o),v.push(o)}}k.cityBatches=c.children.length,y.sort((e,t)=>(t.city.level??1)-(e.city.level??1)||String(e.city.id).localeCompare(String(t.city.id)));let te=new X(1/0,0,0),ne=new N,re=new X,H=new X,ie=new X,ae=NaN,oe=NaN,se=NaN,U=1/0;function ce(e,t,n,r,i){if(!e?.isOrthographicCamera||!y.length)return;let a=(e.right-e.left)/(e.top-e.bottom),s=n*a;if(U+=r,(Math.abs(Math.log(t/ae))>.015||oe!==n||se!==a||e.position.distanceToSquared(te)>(t*2)**2||e.quaternion.angleTo(ne)>.003)&&U>=.075){o.updateWorldMatrix(!0,!1),e.getWorldDirection(ie);let r=Ya(y.map(t=>{re.copy(t.anchor).applyMatrix4(o.matrixWorld).project(e);let r=!t.normal||H.copy(t.normal).transformDirection(o.matrixWorld).dot(ie)<-.035;return{id:t.city.id,x:re.x*s/2,y:re.y*n/2,radius:Ka(t.city.level),previous:t.target,visible:r&&Math.abs(re.x)<1+2*Ka(10)/s&&Math.abs(re.y)<1+2*Ka(10)/n&&Math.abs(re.z)<=1}}),t);for(let e of y)e.target=r.get(e.city.id);te.copy(e.position),ne.copy(e.quaternion),ae=t,oe=n,se=a,U=0,k.declutterPasses++}let c=i?1:1-Math.exp(-12*Math.min(.1,Math.max(0,r))),l=new Set;for(let e of y){let t=Math.abs(e.detail-e.target)<.002?e.target:e.detail+(e.target-e.detail)*c;t!==e.detail&&(e.detail=t,e.instanced?e.attribute.setX(e.index,t):e.attribute.array.fill(t),l.add(e.attribute))}for(let e of l)e.needsUpdate=!0,k.cityAttributeUpdates++}let le=Math.min(p,1.8),ue=Nu(1.22*le,2.45),de=Nu(.92*le,2.13);for(let e of[ue,de])_.add(e);let fe=new X,W=new X,pe=new N,me=null,he=[],ge=[],_e=[],ve=[],ye=!1,be=new X,xe=new X,Se=new X,Ce=new X,G={},we={},Te=NaN,Ee=NaN,De=(e,t,n,r)=>{let i=new Tt(e,F(t),n);return i.name=r,i.frustumCulled=!1,i.instanceMatrix.setUsage(O),l.add(i),i},K=(e,t,a,o,s,c,l,u=1,d=1)=>{let f=e.instanceMatrix.array,p=t*16,m=Math.cos(s)*l,h=Math.sin(s)*l;if(r){(a!==Te||o!==Ee)&&(rt(n,a,o,xe),Te=a,Ee=o),Be(n,a,c*i,o,be),Et(n,a,c*i,o,h,0,m,Se).normalize(),Ce.crossVectors(xe,Se).normalize();for(let e=0;e<3;e++)f[p+e]=Ce.getComponent(e)*l*u,f[p+4+e]=xe.getComponent(e)*l,f[p+8+e]=Se.getComponent(e)*l*d;f[p+12]=be.x,f[p+13]=be.y,f[p+14]=be.z}else f[p]=m*u,f[p+1]=0,f[p+2]=-h*u,f[p+4]=0,f[p+5]=l,f[p+6]=0,f[p+8]=h*d,f[p+9]=0,f[p+10]=m*d,f[p+12]=a,f[p+13]=c,f[p+14]=o;f[p+3]=0,f[p+7]=0,f[p+11]=0,f[p+15]=1};function Oe(e=[],{visible:t=!0,camera:i,viewportHeight:a=900,poseBuffer:s=e.poseBuffer,dt:u=1/60,reducedMotion:d=!1}={}){if(k.updatedCars=0,P||!t)return;let m=i?.isOrthographicCamera?(i.top-i.bottom)/i.zoom/Math.max(1,a):0,h=Xa(m,p,le);A.value=h.routeScale,j.value=h.cityScale,M.value=k.networkVisibility=qa(i?.zoom);let g=M.value>0;c.visible=l.visible=g;for(let e of b)e.visible=g;if(!g)return;ce(i,m,a,u,d);let _=h.trainScaleZ>1,v=me!==e||ge.length!==e.length||ye!==_;ye=_,k.farTrains=ye;for(let t=0;!v&&t<e.length;t++)v=ge[t]!==e[t].state?.ownerId||_e[t]!==e[t].state?.color||ve[t]!==e[t].parts;if(v){l.children.forEach(e=>e.dispose()),l.clear(),he=[],me=e,ge=e.map(e=>e.state?.ownerId),_e=e.map(e=>e.state?.color),ve=e.map(e=>e.parts);let t=e.flatMap(e=>(ye?[e.parts[Math.floor(e.parts.length/2)]]:e.parts).filter(Boolean).map(t=>({train:e,part:t}))),n=t.length;if(n){let e=De(ue,`paper`,n,`map-train-outlines`),r=new Map;for(let{train:e}of t){let t=f(e);r.set(t,(r.get(t)??0)+1)}let i=new Map([...r].map(([e,t])=>[e,{mesh:De(de,e,t,`map-train-${e}`),next:0}]));t.forEach(({train:t,part:n},r)=>{let a=i.get(f(t));he.push({train:t,part:n,outlineIndex:r,outline:e,body:a.mesh,bodyIndex:a.next++})})}k.trainBatches=l.children.length}o.updateWorldMatrix(!0,!1);let y=ye?h.trainScaleX:1,x=ye?h.trainScaleZ:1;for(let e of he){let{train:t,part:i}=e,a,c,l,u;if(s&&i.userData.poseOnly){let e=i.userData.poseIndex*6;a=s[e],c=s[e+2],l=s[e+3],u=+(s[e+4]>0&&t.state?.active!==!1)}else i.userData.poseOnly?(a=i.position.x,c=i.position.z,l=i.rotation.y,u=i.visible&&t.state?.active!==!1?1:0):(i.getWorldPosition(fe),i.getWorldQuaternion(pe),W.set(0,0,1).applyQuaternion(pe).add(fe),o.worldToLocal(fe),o.worldToLocal(W),W.sub(fe),r?(vt(n,fe,G),vt(n,W.add(fe),we),a=G.x,c=G.z,l=Math.atan2(we.x-a,we.z-c)):(a=fe.x,c=fe.z,l=Math.atan2(W.x,W.z)),u=i.visible&&t.state?.active!==!1?1:0);K(e.outline,e.outlineIndex,a,c,l,.12,u,y,x),K(e.body,e.bodyIndex,a,c,l,.123,u,y,x),k.updatedCars++}l.children.forEach(e=>{e.instanceMatrix.needsUpdate=!0})}function ke(){P||(P=!0,l.children.forEach(e=>e.dispose()),v.forEach(e=>e.dispose()),_.forEach(e=>e.dispose()),m.forEach(e=>e.dispose()),o.clear(),o.removeFromParent())}return{root:o,update:Oe,dispose:ke,stats:k}}var Iu=1.25,Lu=65535,Ru=2**-24,zu=Symbol(`SKIP_GENERATION`),Bu={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[zu]:!1};function Vu(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function Hu(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function Uu(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],a=t[e+2*r+1],o=i-a,s=i+a;o<n[r]&&(n[r]=o),s>n[r+3]&&(n[r+3]=s)}}function Wu(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function Gu(e,t){return t[e+15]===Lu}function Ku(e,t){return t[e+6]}function qu(e,t){return t[e+14]}function Ju(e){return e+8}function Yu(e,t){return e+t[e+6]*8}function Xu(e,t){return t[e+7]}function Zu(e){return e}function Qu(e,t,n,r,i){let a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,m=-1/0,h=-1/0,g=-1/0,_=e.offset||0;for(let r=(t-_)*6,i=(t+n-_)*6;r<i;r+=6){let t=e[r+0],n=e[r+1],i=t-n,_=t+n;i<a&&(a=i),_>c&&(c=_),t<d&&(d=t),t>m&&(m=t);let v=e[r+2],y=e[r+3],b=v-y,x=v+y;b<o&&(o=b),x>l&&(l=x),v<f&&(f=v),v>h&&(h=v);let S=e[r+4],C=e[r+5],w=S-C,T=S+C;w<s&&(s=w),T>u&&(u=T),S<p&&(p=S),S>g&&(g=S)}r[0]=a,r[1]=o,r[2]=s,r[3]=c,r[4]=l,r[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=m,i[4]=h,i[5]=g}var $u=8,ed=8,td=new Int32Array($u),nd=new Float32Array(48),rd=new Float32Array(48),id=new Float32Array(6),ad=new Float32Array(6),od=new Int32Array(ed),sd=new Float32Array(48);function cd(e,t,n,r){for(let i=0;i<3;i++){let a=t[e+2*i],o=t[e+2*i+1],s=a-o,c=a+o;s<n[r+i]&&(n[r+i]=s),c>n[r+i+3]&&(n[r+i+3]=c)}}function ld(e,t){let n=e[t+3]-e[t],r=e[t+4]-e[t+1],i=e[t+5]-e[t+2];return 2*(n*r+r*i+i*n)}function ud(e,t,n,r,i,a){let o=-1,s=0;if(a===0)o=Hu(t),o!==-1&&(s=(t[o]+t[o+3])/2);else if(a===1)o=Hu(e),o!==-1&&(s=dd(n,r,i,o));else if(a===2){let a=Wu(e),c=Iu*i,l=n.offset||0,u=(r-l)*6,d=(r+i-l)*6;for(let e=0;e<3;e++){let r=t[e],l=(t[e+3]-r)/$u;if(i<ed){for(let t=0;t<i;t++){let r=u+t*6,i=n[r+2*e],a=t;for(;a>0&&n[od[a-1]+2*e]>i;)od[a]=od[a-1],a--;od[a]=r}for(let e=0;e<3;e++)id[e]=1/0,id[e+3]=-1/0,ad[e]=1/0,ad[e+3]=-1/0;for(let e=i-1;e>=0;e--)Uu(od[e],n,ad),sd.set(ad,e*6);for(let t=0;t<i-1;t++){Uu(od[t],n,id);let r=n[od[t+1]+2*e];if(n[od[t]+2*e]===r)continue;let l=t+1,u=i-l,d=Wu(id)/a,f=ld(sd,l*6)/a,p=1+Iu*(d*l+f*u);p<c&&(o=e,c=p,s=r)}}else{for(let e=0;e<$u;e++){td[e]=0;for(let t=0;t<3;t++)nd[e*6+t]=1/0,nd[e*6+t+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((n[t+2*e]-r)/l);i>=$u&&(i=7),td[i]++,cd(t,n,nd,i*6)}for(let e=0;e<6;e++)rd[42+e]=nd[42+e];for(let e=6;e>=0;e--){let t=e*6,n=t+6;for(let e=0;e<3;e++)rd[t+e]=Math.min(nd[t+e],rd[n+e]),rd[t+e+3]=Math.max(nd[t+e+3],rd[n+e+3])}let t=0;for(let n=0;n<7;n++){let u=n*6,d=td[n];if(d!==0)for(let e=0;e<3;e++)t===0?(id[e]=nd[u+e],id[e+3]=nd[u+e+3]):(id[e]=Math.min(id[e],nd[u+e]),id[e+3]=Math.max(id[e+3],nd[u+e+3]));t+=d;let f=0,p=0;t!==0&&(f=Wu(id)/a);let m=i-t;m!==0&&(p=ld(rd,u+6)/a);let h=1+Iu*(f*t+p*m);h<c&&(o=e,c=h,s=r+l+n*l)}}}}else typeof a==`function`?{axis:o,pos:s}=a(e,t,n,r,i,n.offset):console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:o,pos:s}}function dd(e,t,n,r){let i=0,a=e.offset;for(let o=t,s=t+n;o<s;o++)i+=e[(o-a)*6+r*2];return i/n}function fd(e,t,n,r,i,a){let o=r,s=r+i-1,c=a.pos,l=a.axis*2,u=n.offset||0;for(;;){for(;o<=s&&n[(o-u)*6+l]<c;)o++;for(;o<=s&&n[(s-u)*6+l]>=c;)s--;if(o<s){for(let n=0;n<t;n++){let r=e[o*t+n];e[o*t+n]=e[s*t+n],e[s*t+n]=r}for(let e=0;e<6;e++){let t=o-u,r=s-u,i=n[t*6+e];n[t*6+e]=n[r*6+e],n[r*6+e]=i}o++,s--}else return o}}var pd=2**32,md=new Float32Array(6),hd=new Float32Array(6);function gd(e,t,n,r,i,a){let{maxDepth:o,verbose:s,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:u,onProgress:d,useSharedArrayBuffer:f=!1}=i,p=e.primitiveBuffer,m=e.primitiveBufferStride,h=new(f?SharedArrayBuffer:ArrayBuffer)(32*Math.max(1,2*Math.ceil(r)-1)),g=new Float32Array(h),_=new Uint32Array(h),v=new Uint16Array(h),y=0,b=!1;return Qu(t,n,r,md,hd),C(n,r,0),h.slice(0,y*32);function x(e){d&&d((e-a.offset)/a.count)}function S(e,t,n){let r=e*2;_[e+6]=t,v[r+14]=n,v[r+15]=Lu,x(t+n)}function C(e,n,r){let i=y++,a=i*8;g.set(md,a),!b&&r>=o&&(b=!0,s&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));let d=n>l;if(n<=c&&!d||r>=o){S(a,e,n);return}let f=ud(md,hd,t,e,n,u),h=f.axis===-1?-1:fd(p,m,t,e,n,f);if(f.axis===-1||h===e||h===e+n){if(!d){S(a,e,n);return}f.axis=Math.max(0,Hu(md)),h=e+Math.max(1,Math.floor(n/2))}_[a+7]=f.axis;let v=h-e;Qu(t,e,v,md,hd),C(e,v,r+1);let x=y-i;if(x>pd)throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);_[a+6]=x;let w=n-v;Qu(t,h,w,md,hd),C(h,w,r+1)}}function _d(e,t){let n=e.getRootRanges(t.range),r=n[0],i=n[n.length-1],a={offset:r.offset,count:i.offset+i.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,e.computePrimitiveBounds(a.offset,a.count,o),e._roots=n.map(n=>gd(e,o,n.offset,n.count,t,a))}var vd=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},yd=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},bd,xd,Sd=[],Cd=new vd(()=>new m);function wd(e,t,n,r,i,a){bd=Cd.getPrimitive(),xd=Cd.getPrimitive(),Sd.push(bd,xd),yd.setBuffer(e._roots[t]);let o=Td(0,e.geometry,n,r,i,a);yd.clearBuffer(),Cd.releasePrimitive(bd),Cd.releasePrimitive(xd),Sd.pop(),Sd.pop();let s=Sd.length;return s>0&&(xd=Sd[s-1],bd=Sd[s-2]),o}function Td(e,t,n,r,i=null,a=0,o=0){let{float32Array:s,uint16Array:c,uint32Array:l}=yd,u=e*2;if(Gu(u,c)){let t=Ku(e,l),n=qu(u,c);return Vu(Zu(e),s,bd),r(t,n,!1,o,a+e/8,bd)}{let u=Ju(e),d=Yu(e,l),f=u,p=d,m,h,g,_;if(i&&(g=bd,_=xd,Vu(Zu(f),s,g),Vu(Zu(p),s,_),m=i(g),h=i(_),h<m)){f=d,p=u;let e=m;m=h,h=e,g=_}g||(g=bd,Vu(Zu(f),s,g));let v=Gu(f*2,c),y=n(g,v,m,o+1,a+f/8),b;if(y===2){let e=w(f);b=r(e,T(f)-e,!0,o+1,a+f/8,g)}else b=y&&Td(f,t,n,r,i,a,o+1);if(b)return!0;_=xd,Vu(Zu(p),s,_);let x=Gu(p*2,c),S=n(_,x,h,o+1,a+p/8),C;if(S===2){let e=w(p);C=r(e,T(p)-e,!0,o+1,a+p/8,_)}else C=S&&Td(p,t,n,r,i,a,o+1);return!!C;function w(e){let{uint16Array:t,uint32Array:n}=yd,r=e*2;for(;!Gu(r,t);)e=Ju(e),r=e*2;return Ku(e,n)}function T(e){let{uint16Array:t,uint32Array:n}=yd,r=e*2;for(;!Gu(r,t);)e=Yu(e,n),r=e*2;return Ku(e,n)+qu(r,t)}}}var Ed=new yd.constructor,Dd=new yd.constructor,Od=new vd(()=>new m),kd=new m,Ad=new m,jd=new m,Md=new m,Nd=!1;function Pd(e,t,n,r){if(Nd)throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);Nd=!0;let i=e._roots,a=t._roots,o,s=0,c=0,l=new V().copy(n).invert();for(let e=0,t=i.length;e<t;e++){Ed.setBuffer(i[e]),c=0;let t=Od.getPrimitive();Vu(Zu(0),Ed.float32Array,t),t.applyMatrix4(l);for(let e=0,i=a.length;e<i&&(Dd.setBuffer(a[e]),o=Fd(0,0,n,l,r,s,c,0,0,t),Dd.clearBuffer(),c+=a[e].byteLength/32,!o);e++);if(Od.releasePrimitive(t),Ed.clearBuffer(),s+=i[e].byteLength/32,o)break}return Nd=!1,o}function Fd(e,t,n,r,i,a=0,o=0,s=0,c=0,l=null,u=!1){let d,f;u?(d=Dd,f=Ed):(d=Ed,f=Dd);let p=d.float32Array,m=d.uint32Array,h=d.uint16Array,g=f.float32Array,_=f.uint32Array,v=f.uint16Array,y=e*2,b=t*2,x=Gu(y,h),S=Gu(b,v),C=!1;if(S&&x)C=u?i(Ku(t,_),qu(t*2,v),Ku(e,m),qu(e*2,h),c,o+t/8,s,a+e/8):i(Ku(e,m),qu(e*2,h),Ku(t,_),qu(t*2,v),s,a+e/8,c,o+t/8);else if(S){let l=Od.getPrimitive();Vu(Zu(t),g,l),l.applyMatrix4(n);let d=Ju(e),f=Yu(e,m);Vu(Zu(d),p,kd),Vu(Zu(f),p,Ad);let h=l.intersectsBox(kd),_=l.intersectsBox(Ad);C=h&&Fd(t,d,r,n,i,o,a,c,s+1,l,!u)||_&&Fd(t,f,r,n,i,o,a,c,s+1,l,!u),Od.releasePrimitive(l)}else{let d=Ju(t),f=Yu(t,_);Vu(Zu(d),g,jd),Vu(Zu(f),g,Md);let h=l.intersectsBox(jd),v=l.intersectsBox(Md);if(h&&v)C=Fd(e,d,n,r,i,a,o,s,c+1,l,u)||Fd(e,f,n,r,i,a,o,s,c+1,l,u);else if(h){if(x)C=Fd(e,d,n,r,i,a,o,s,c+1,l,u);else{let t=Od.getPrimitive();t.copy(jd).applyMatrix4(n);let l=Ju(e),f=Yu(e,m);Vu(Zu(l),p,kd),Vu(Zu(f),p,Ad);let h=t.intersectsBox(kd),g=t.intersectsBox(Ad);C=h&&Fd(d,l,r,n,i,o,a,c,s+1,t,!u)||g&&Fd(d,f,r,n,i,o,a,c,s+1,t,!u),Od.releasePrimitive(t)}}else if(v){if(x)C=Fd(e,f,n,r,i,a,o,s,c+1,l,u);else{let t=Od.getPrimitive();t.copy(Md).applyMatrix4(n);let l=Ju(e),d=Yu(e,m);Vu(Zu(l),p,kd),Vu(Zu(d),p,Ad);let h=t.intersectsBox(kd),g=t.intersectsBox(Ad);C=h&&Fd(f,l,r,n,i,o,a,c,s+1,t,!u)||g&&Fd(f,d,r,n,i,o,a,c,s+1,t,!u),Od.releasePrimitive(t)}}}return C}var Id=new class{constructor(){let e=null,t=null,n=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(i,a)=>{if(r)throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);this.root=a,this.buffer=e=i._roots[a],this.uint16Array=n=new Uint16Array(e),this.uint32Array=t=new Uint32Array(e)},this.reset=()=>{this.root=null,this.buffer=e=null,this.uint16Array=n=null,this.uint32Array=t=null},this.getRangeStart=e=>{let r=e*2;for(;!Gu(r,n);)e=Ju(e),r=e*2;return Ku(e,t)},this.getRangeEnd=e=>{let r=e*2;for(;!Gu(r,n);)e=Yu(e,t),r=e*2;return Ku(e,t)+qu(r,n)};let i=(e,r,a)=>{let o=Gu(r*2,n);if(!e(a,o,r)&&!o){let n=Ju(r),o=Yu(r,t);i(e,n,a+1),i(e,o,a+1)}};this.traverseBuffer=e=>{if(r)throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);r=!0;try{i(e,0,0)}finally{r=!1}},this.traverse=r=>{this.traverseBuffer((i,a,o)=>{if(a){let s=o*2,c=t[o+6],l=n[s+14];return r(i,a,new Float32Array(e,o*4,6),c,l)}{let n=Xu(o,t);return r(i,a,new Float32Array(e,o*4,6),n)}})}}},Ld=`0.10.0`,Rd=new m,zd=new Float32Array(6);typeof window<`u`&&(window.__THREE_MESH_BVH__?console.warn(`three-mesh-bvh: Multiple instances of three-mesh-bvh being imported.`):window.__THREE_MESH_BVH__=Ld);var Bd=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Bu,...e},_d(this,e)}getRootRanges(){throw Error(`BVH: getRootRanges() not implemented`)}writePrimitiveBounds(){throw Error(`BVH: writePrimitiveBounds() not implemented`)}writePrimitiveRangeBounds(e,t,n,r){let i=1/0,a=1/0,o=1/0,s=-1/0,c=-1/0,l=-1/0;for(let n=e,r=e+t;n<r;n++){this.writePrimitiveBounds(n,zd,0);let[e,t,r,u,d,f]=zd;e<i&&(i=e),u>s&&(s=u),t<a&&(a=t),d>c&&(c=d),r<o&&(o=r),f>l&&(l=f)}return n[r+0]=i,n[r+1]=a,n[r+2]=o,n[r+3]=s,n[r+4]=c,n[r+5]=l,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let i=e,a=e+t;i<a;i++){this.writePrimitiveBounds(i,zd,0);let[e,t,a,o,s,c]=zd,l=(e+o)/2,u=(t+s)/2,d=(a+c)/2,f=(o-e)/2,p=(s-t)/2,m=(c-a)/2,h=(i-r)*6;n[h+0]=l,n[h+1]=f+(Math.abs(l)+f)*Ru,n[h+2]=u,n[h+3]=p+(Math.abs(u)+p)*Ru,n[h+4]=d,n[h+5]=m+(Math.abs(d)+m)*Ru}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t){if(t.BYTES_PER_ELEMENT===2&&t.some(t=>t+e>=2**16)){let e=t.buffer.constructor;t=new Uint32Array(new e(4*t.length)),t.set(this._indirectBuffer),this._indirectBuffer=t}for(let n=0,r=t.length;n<r;n++)t[n]+=e}else{let t=this._roots;for(let n=0;n<t.length;n++){let r=t[n],i=new Uint32Array(r),a=new Uint16Array(r),o=r.byteLength/32;for(let t=0;t<o;t++){let n=8*t;Gu(2*n,a)&&(i[n+6]+=e)}}}}traverse(e,t=0){Id.setBVH(this,t),Id.traverse(e),Id.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n),a=new Float32Array(n),o=n.byteLength/32;for(let e=o-1;e>=0;e--){let t=e*8,n=t*2;if(Gu(n,i)){let e=Ku(t,r),o=qu(n,i);this.writePrimitiveRangeBounds(e,o,zd,0),a.set(zd,t)}else{let e=Ju(t),n=Yu(t,r);for(let r=0;r<3;r++){let i=a[e+r],o=a[e+r+3],s=a[n+r],c=a[n+r+3];a[t+r]=i<s?i:s,a[t+r+3]=o>c?o:c}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{Vu(0,new Float32Array(t),Rd),e.union(Rd)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:i,scratchPrimitive:a,iterate:o}=e;if(r&&i){let e=r;r=(t,n,r,s,c)=>e(t,n,r,s,c)?!0:o(t,n,this,i,r,s,a)}else r||=i?(e,t,n,r)=>o(e,t,this,i,n,r,a):(e,t,n)=>n;let s=!1,c=0,l=this._roots;for(let e=0,i=l.length;e<i;e++){let i=l[e];if(s=wd(this,e,n,r,t,c),s)break;c+=i.byteLength/32}return s}bvhcast(e,t,n){let{intersectsRanges:r}=n;return Pd(this,e,t,r)}};function Vd(){return typeof SharedArrayBuffer<`u`}function Hd(e){return e.index?e.index.count:e.attributes.position.count}function Ud(e){return Hd(e)/3}function Wd(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function Gd(e,t){if(!e.index){let n=e.attributes.position.count,r=Wd(n,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new B(r,1));for(let e=0;e<n;e++)r[e]=e}}function Kd(e,t,n){let r=Hd(e)/n,i=t||e.drawRange,a=i.start/n,o=(i.start+i.count)/n,s=Math.max(0,a),c=Math.min(r,o)-s;return{offset:Math.floor(s),count:Math.floor(c)}}function qd(e,t){return e.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Jd(e,t,n){let r=Kd(e,t,n),i=qd(e,n);if(!i.length)return[r];let a=[],o=r.offset,s=r.offset+r.count,c=Hd(e)/n,l=[];for(let e of i){let{offset:t,count:n}=e,r=t,i=t+(isFinite(n)?n:c-t);r<s&&i>o&&(l.push({pos:Math.max(o,r),isStart:!0}),l.push({pos:Math.min(s,i),isStart:!1}))}l.sort((e,t)=>e.pos===t.pos?e.type===`end`?-1:1:e.pos-t.pos);let u=0,d=null;for(let e of l){let t=e.pos;u!==0&&t!==d&&a.push({offset:d,count:t-d}),u+=e.isStart?1:-1,d=t}return a}function Yd(e,t){let n=e[e.length-1],r=n.offset+n.count>2**16,i=e.reduce((e,t)=>e+t.count,0),a=r?4:2,o=t?new SharedArrayBuffer(i*a):new ArrayBuffer(i*a),s=r?new Uint32Array(o):new Uint16Array(o),c=0;for(let t=0;t<e.length;t++){let{offset:n,count:r}=e[t];for(let e=0;e<r;e++)s[c+e]=n+e;c+=r}return s}var Xd=class extends Bd{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(!e.isBufferGeometry)throw Error(`BVH: Only BufferGeometries are supported.`);if(e.index&&e.index.isInterleavedBufferAttribute)throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);if(t.useSharedArrayBuffer&&!Vd())throw Error(`BVH: SharedArrayBuffer is not available.`);super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?e=>this._indirectBuffer[e]:e=>e,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Bu,...t},t[zu]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Yd(Jd(t,e.range,n),e.useSharedArrayBuffer);this._indirectBuffer=r}else Gd(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new m))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Jd(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw Error(`BVH: raycastObject3D() not implemented`)}},Zd=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,a=e.length;i<a;i++){let a=e[i][t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=e.dot(a);n=o<n?o:n,r=o>r?o:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Zd.prototype.setFromBox=(function(){let e=new X;return function(t,n){let r=n.min,i=n.max,a=1/0,o=-1/0;for(let n=0;n<=1;n++)for(let s=0;s<=1;s++)for(let c=0;c<=1;c++){e.x=r.x*n+i.x*(1-n),e.y=r.y*s+i.y*(1-s),e.z=r.z*c+i.z*(1-c);let l=t.dot(e);a=Math.min(l,a),o=Math.max(l,o)}this.min=a,this.max=o}})();var Qd=(function(){let e=new X,t=new X,n=new X;return function(r,i,a){let o=r.start,s=e,c=i.start,l=t;n.subVectors(o,c),e.subVectors(r.end,r.start),t.subVectors(i.end,i.start);let u=n.dot(l),d=l.dot(s),f=l.dot(l),p=n.dot(s),m=s.dot(s)*f-d*d,h,g;h=m===0?0:(u*d-p*f)/m,g=(u+h*d)/f,a.x=h,a.y=g}})(),$d=(function(){let e=new dt,t=new X,n=new X;return function(r,i,a,o){Qd(r,i,e);let s=e.x,c=e.y;if(s>=0&&s<=1&&c>=0&&c<=1)r.at(s,a),i.at(c,o);else if(s>=0&&s<=1)c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);else if(c>=0&&c<=1)s<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);else{let e;e=s<0?r.start:r.end;let l;l=c<0?i.start:i.end;let u=t,d=n;if(r.closestPointToPoint(l,!0,t),i.closestPointToPoint(e,!0,n),u.distanceToSquared(l)<=d.distanceToSquared(e)){a.copy(u),o.copy(l);return}a.copy(e),o.copy(d);return}}})(),ef=(function(){let e=new X,t=new X,n=new ge,r=new Ge;return function(i,a){let{radius:o,center:s}=i,{a:c,b:l,c:u}=a;if(r.start=c,r.end=l,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o||(r.start=c,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o)||(r.start=l,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o))return!0;let d=a.getPlane(n);if(Math.abs(d.distanceToPoint(s))<=o){let e=d.projectPoint(s,t);if(a.containsPoint(e))return!0}return!1}})(),tf=[`x`,`y`,`z`],nf=1e-15,rf=nf*nf;function af(e){return Math.abs(e)<nf}var of=class extends xt{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new X),this.satBounds=[,,,,].fill().map(()=>new Zd),this.points=[this.a,this.b,this.c],this.plane=new ge,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Ge,this.needsUpdate=!0}intersectsSphere(e){return ef(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,a=this.satBounds,o=i[0],s=a[0];this.getNormal(o),s.setFromPoints(o,r);let c=i[1],l=a[1];c.subVectors(e,t),l.setFromPoints(c,r);let u=i[2],d=a[2];u.subVectors(t,n),d.setFromPoints(u,r);let f=i[3],p=a[3];f.subVectors(n,e),p.setFromPoints(f,r);let m=c.length(),h=u.length(),g=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<nf?h<nf||g<nf?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):h<nf?g<nf?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<nf&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};of.prototype.closestPointToSegment=(function(){let e=new X,t=new X,n=new Ge;return function(r,i=null,a=null){this.needsUpdate&&this.update();let{start:o,end:s}=r,c=this.points,l,u=1/0;if(this.plane.distanceToPoint(o)*this.plane.distanceToPoint(s)<0&&this.plane.intersectLine(r,e)!==null&&this.containsPoint(e))return i&&i.copy(e),a&&a.copy(e),0;for(let o=0;o<3;o++){let s=(o+1)%3;n.start.copy(c[o]),n.end.copy(c[s]),$d(n,r,e,t),l=e.distanceToSquared(t),l<u&&(u=l,i&&i.copy(e),a&&a.copy(t))}return this.closestPointToPoint(o,e),l=o.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(o)),this.closestPointToPoint(s,e),l=s.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(s)),Math.sqrt(u)}})(),of.prototype.intersectsTriangle=(function(){let e=new of,t=new Zd,n=new Zd,r=new X,i=new X,a=new X,o=new X,s=new Ge,c=new Ge,l=new X,u=new dt,d=new dt;function f(e,i,a,s){let c=r;!e.isDegenerateIntoPoint&&!e.isDegenerateIntoSegment?c.copy(e.plane.normal):c.copy(i.plane.normal);let l=e.satBounds,u=e.satAxes;for(let r=1;r<4;r++){let a=l[r],s=u[r];if(t.setFromPoints(s,i.points),a.isSeparated(t)||(o.copy(c).cross(s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}let d=i.satBounds,f=i.satAxes;for(let r=1;r<4;r++){let a=d[r],s=f[r];if(t.setFromPoints(s,e.points),a.isSeparated(t)||(o.crossVectors(c,s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}return a&&(s||console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`),a.start.set(0,0,0),a.end.set(0,0,0)),!0}function p(e,t,n,r,i,a,o,s,c,l,u){let d=o/(o-s);l.x=r+(i-r)*d,u.start.subVectors(t,e).multiplyScalar(d).add(e),d=o/(o-c),l.y=r+(a-r)*d,u.end.subVectors(n,e).multiplyScalar(d).add(e)}function m(e,t,n,r,i,a,o,s,c,l,u){if(i>0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else if(a>0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(s*c>0||o!=0)p(e.a,e.b,e.c,t,n,r,o,s,c,l,u);else if(s!=0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(c!=0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else return!0;return!1}function h(e,t,n,i){let a=t.degenerateSegment,o=e.plane.distanceToPoint(a.start),s=e.plane.distanceToPoint(a.end);return af(o)?af(s)?f(e,t,n,i):(n&&(n.start.copy(a.start),n.end.copy(a.start)),e.containsPoint(a.start)):af(s)?(n&&(n.start.copy(a.end),n.end.copy(a.end)),e.containsPoint(a.end)):e.plane.intersectLine(a,r)!=null&&(n&&(n.start.copy(r),n.end.copy(r)),e.containsPoint(r))}function g(e,t,n){let r=t.a;return af(e.plane.distanceToPoint(r))&&e.containsPoint(r)?(n&&(n.start.copy(r),n.end.copy(r)),!0):!1}function _(e,t,n){let i=e.degenerateSegment,a=t.a;return i.closestPointToPoint(a,!0,r),a.distanceToSquared(r)<rf&&(n&&(n.start.copy(a),n.end.copy(a)),!0)}function v(e,t,n,o){if(e.isDegenerateIntoSegment){if(t.isDegenerateIntoSegment){let o=e.degenerateSegment,s=t.degenerateSegment,c=i,l=a;o.delta(c),s.delta(l);let u=r.subVectors(s.start,o.start),d=c.x*l.y-c.y*l.x;if(af(d))return!1;let f=(u.x*l.y-u.y*l.x)/d,p=-(c.x*u.y-c.y*u.x)/d;return f<0||f>1||p<0||p>1?!1:af(o.start.z+c.z*f-(s.start.z+l.z*p))?(n&&(n.start.copy(o.start).addScaledVector(c,f),n.end.copy(o.start).addScaledVector(c,f)),!0):!1}return t.isDegenerateIntoPoint?_(e,t,n):h(t,e,n,o)}if(e.isDegenerateIntoPoint)return t.isDegenerateIntoPoint?t.a.distanceToSquared(e.a)<rf&&(n&&(n.start.copy(e.a),n.end.copy(e.a)),!0):t.isDegenerateIntoSegment?_(t,e,n):g(t,e,n);if(t.isDegenerateIntoPoint)return g(e,t,n);if(t.isDegenerateIntoSegment)return h(e,t,n,o)}return function(t,n=null,r=!1){this.needsUpdate&&this.update(),t.isExtendedTriangle?t.needsUpdate&&t.update():(e.copy(t),e.update(),t=e);let o=v(this,t,n,r);if(o!==void 0)return o;let p=this.plane,h=t.plane,g=h.distanceToPoint(this.a),_=h.distanceToPoint(this.b),y=h.distanceToPoint(this.c);af(g)&&(g=0),af(_)&&(_=0),af(y)&&(y=0);let b=g*_,x=g*y;if(b>0&&x>0)return!1;let S=p.distanceToPoint(t.a),C=p.distanceToPoint(t.b),w=p.distanceToPoint(t.c);af(S)&&(S=0),af(C)&&(C=0),af(w)&&(w=0);let T=S*C,E=S*w;if(T>0&&E>0)return!1;i.copy(p.normal),a.copy(h.normal);let D=i.cross(a),O=0,k=Math.abs(D.x),A=Math.abs(D.y);A>k&&(k=A,O=1),Math.abs(D.z)>k&&(O=2);let j=tf[O],M=this.a[j],N=this.b[j],P=this.c[j],F=t.a[j],I=t.b[j],ee=t.c[j];if(m(this,M,N,P,b,x,g,_,y,u,s)||m(t,F,I,ee,T,E,S,C,w,d,c))return f(this,t,n,r);if(u.y<u.x){let e=u.y;u.y=u.x,u.x=e,l.copy(s.start),s.start.copy(s.end),s.end.copy(l)}if(d.y<d.x){let e=d.y;d.y=d.x,d.x=e,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(n&&(d.x>u.x?n.start.copy(c.start):n.start.copy(s.start),d.y<u.y?n.end.copy(c.end):n.end.copy(s.end)),!0)}})(),of.prototype.distanceToPoint=(function(){let e=new X;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),of.prototype.distanceToTriangle=(function(){let e=new X,t=new X,n=[`a`,`b`,`c`],r=new Ge,i=new Ge;return function(a,o=null,s=null){let c=o||s?r:null;if(this.intersectsTriangle(a,c,!0))return(o||s)&&(o&&c.getCenter(o),s&&c.getCenter(s)),0;let l=1/0;for(let t=0;t<3;t++){let r,i=n[t],c=a[i];this.closestPointToPoint(c,e),r=c.distanceToSquared(e),r<l&&(l=r,o&&o.copy(e),s&&s.copy(c));let u=this[i];a.closestPointToPoint(u,e),r=u.distanceToSquared(e),r<l&&(l=r,o&&o.copy(u),s&&s.copy(e))}for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];r.set(this[u],this[d]);for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];i.set(a[u],a[d]),$d(r,i,e,t);let f=e.distanceToSquared(t);f<l&&(l=f,o&&o.copy(e),s&&s.copy(t))}}return Math.sqrt(l)}})();var sf=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new X,this.max=new X,this.matrix=new V,this.invMatrix=new V,this.points=Array(8).fill().map(()=>new X),this.satAxes=[,,,].fill().map(()=>new X),this.satBounds=[,,,].fill().map(()=>new Zd),this.alignedSatBounds=[,,,].fill().map(()=>new Zd),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};sf.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let i=0;i<=1;i++)for(let a=0;a<=1;a++)for(let o=0;o<=1;o++){let s=r[1*i|2*a|4*o];s.x=i?n.x:t.x,s.y=a?n.y:t.y,s.z=o?n.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,a=this.satAxes,o=r[0];for(let e=0;e<3;e++){let t=a[e],n=i[e],s=r[1<<e];t.subVectors(o,s),n.setFromPoints(t,r)}let s=this.alignedSatBounds;s[0].setFromPointsField(r,`x`),s[1].setFromPointsField(r,`y`),s[2].setFromPointsField(r,`z`),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})(),sf.prototype.intersectsBox=(function(){let e=new Zd;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,i=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(e.min=n.x,e.max=r.x,o[0].isSeparated(e)||(e.min=n.y,e.max=r.y,o[1].isSeparated(e))||(e.min=n.z,e.max=r.z,o[2].isSeparated(e)))return!1;for(let n=0;n<3;n++){let r=a[n],o=i[n];if(e.setFromBox(r,t),o.isSeparated(e))return!1}return!0}})(),sf.prototype.intersectsTriangle=(function(){let e=new of,t=[,,,],n=new Zd,r=new Zd,i=new X;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let o=this.satBounds,s=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let e=0;e<3;e++){let r=o[e],i=s[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}let c=a.satBounds,l=a.satAxes,u=this.points;for(let e=0;e<3;e++){let t=c[e],r=l[e];if(n.setFromPoints(r,u),t.isSeparated(n))return!1}for(let e=0;e<3;e++){let a=s[e];for(let e=0;e<4;e++){let o=l[e];if(i.crossVectors(a,o),n.setFromPoints(i,t),r.setFromPoints(i,u),n.isSeparated(r))return!1}}return!0}})(),sf.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})(),sf.prototype.distanceToPoint=(function(){let e=new X;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),sf.prototype.distanceToBox=(function(){let e=[`x`,`y`,`z`],t=Array(12).fill().map(()=>new Ge),n=Array(12).fill().map(()=>new Ge),r=new X,i=new X;return function(a,o=0,s=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(s||c)&&(a.getCenter(i),this.closestPointToPoint(i,r),a.clampPoint(r,i),s&&s.copy(r),c&&c.copy(i)),0;let l=o*o,u=a.min,d=a.max,f=this.points,p=1/0;for(let e=0;e<8;e++){let t=f[e];i.copy(t).clamp(u,d);let n=t.distanceToSquared(i);if(n<p&&(p=n,s&&s.copy(t),c&&c.copy(i),n<l))return Math.sqrt(n)}let m=0;for(let r=0;r<3;r++)for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let o=(r+1)%3,s=(r+2)%3,c=i<<o|a<<s,l=1<<r|i<<o|a<<s,p=f[c],h=f[l];t[m].set(p,h);let g=e[r],_=e[o],v=e[s],y=n[m],b=y.start,x=y.end;b[g]=u[g],b[_]=i?u[_]:d[_],b[v]=a?u[v]:d[v],x[g]=d[g],x[_]=i?u[_]:d[_],x[v]=a?u[v]:d[v],m++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){i.x=e?d.x:u.x,i.y=t?d.y:u.y,i.z=n?d.z:u.z,this.closestPointToPoint(i,r);let a=i.distanceToSquared(r);if(a<p&&(p=a,s&&s.copy(r),c&&c.copy(i),a<l))return Math.sqrt(a)}for(let e=0;e<12;e++){let a=t[e];for(let e=0;e<12;e++){let t=n[e];$d(a,t,r,i);let o=r.distanceToSquared(i);if(o<p&&(p=o,s&&s.copy(r),c&&c.copy(i),o<l))return Math.sqrt(o)}}return Math.sqrt(p)}})();var cf=new class extends vd{constructor(){super(()=>new of)}},lf=new X,uf=new X;function df(e,t,n={},r=0,i=1/0){let a=r*r,o=i*i,s=1/0,c=null;if(e.shapecast({boundsTraverseOrder:e=>(lf.copy(t).clamp(e.min,e.max),lf.distanceToSquared(t)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle:(e,n)=>{e.closestPointToPoint(t,lf);let r=t.distanceToSquared(lf);return r<s&&(uf.copy(lf),s=r,c=n),r<a}}),s===1/0)return null;let l=Math.sqrt(s);return n.point?n.point.copy(uf):n.point=uf.clone(),n.distance=l,n.faceIndex=c,n}var ff=!0,pf=new X,mf=new X,hf=new X,gf=new dt,_f=new dt,vf=new dt,yf=new X,bf=new X,xf=new X,Sf=new X;function Cf(e,t,n,r,i,a,o,s){let c;if(c=a===1?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,a!==2,i),c===null)return null;let l=e.origin.distanceTo(i);return l<o||l>s?null:{distance:l,point:i.clone()}}function wf(e,t,n,r,i,a,o,s,c,l,u){pf.fromBufferAttribute(t,a),mf.fromBufferAttribute(t,o),hf.fromBufferAttribute(t,s);let d=Cf(e,pf,mf,hf,Sf,c,l,u);if(d){if(r){gf.fromBufferAttribute(r,a),_f.fromBufferAttribute(r,o),vf.fromBufferAttribute(r,s),d.uv=new dt;let e=xt.getInterpolation(Sf,pf,mf,hf,gf,_f,vf,d.uv);ff||(d.uv=e)}if(i){gf.fromBufferAttribute(i,a),_f.fromBufferAttribute(i,o),vf.fromBufferAttribute(i,s),d.uv1=new dt;let e=xt.getInterpolation(Sf,pf,mf,hf,gf,_f,vf,d.uv1);ff||(d.uv1=e)}if(n){yf.fromBufferAttribute(n,a),bf.fromBufferAttribute(n,o),xf.fromBufferAttribute(n,s),d.normal=new X;let t=xt.getInterpolation(Sf,pf,mf,hf,yf,bf,xf,d.normal);d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1),ff||(d.normal=t)}let t={a,b:o,c:s,normal:new X,materialIndex:0};if(xt.getNormal(pf,mf,hf,t.normal),d.face=t,d.faceIndex=a,ff){let e=new X;xt.getBarycoord(Sf,pf,mf,hf,e),d.barycoord=e}}return d}function Tf(e){return e&&e.isMaterial?e.side:e}function Ef(e,t,n,r,i,a,o){let s=r*3,c=s+0,l=s+1,u=s+2,{index:d,groups:f}=e;e.index&&(c=d.getX(c),l=d.getX(l),u=d.getX(u));let{position:p,normal:m,uv:h,uv1:g}=e.attributes;if(Array.isArray(t)){let e=r*3;for(let s=0,d=f.length;s<d;s++){let{start:d,count:_,materialIndex:v}=f[s];if(e>=d&&e<d+_){let e=Tf(t[v]),s=wf(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=v,i)i.push(s);else return s}}}}else{let e=Tf(t),s=wf(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=0,i)i.push(s);else return s}}return null}function Df(e,t,n,r){let i=e.a,a=e.b,o=e.c,s=t,c=t+1,l=t+2;n&&(s=n.getX(s),c=n.getX(c),l=n.getX(l)),i.x=r.getX(s),i.y=r.getY(s),i.z=r.getZ(s),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l)}function Of(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,l=r+i;e<l;e++)Ef(c,t,n,e,a,o,s)}function kf(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,c=r+i;e<c;e++){let r;r=Ef(s,t,n,e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Af(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let n=e,s=t+e;n<s;n++){let e;if(e=n,Df(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function jf(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(e,n,a=!1){let l=e*2;if(Gu(l,s)){let t=Ku(e,o),n=qu(l,s),a=1/0,u=1/0,d=1/0,f=-1/0,p=-1/0,m=-1/0;for(let e=3*t,o=3*(t+n);e<o;e++){let t=r[e],n=i.getX(t),o=i.getY(t),s=i.getZ(t);n<a&&(a=n),n>f&&(f=n),o<u&&(u=o),o>p&&(p=o),s<d&&(d=s),s>m&&(m=s)}return c[e+0]!==a||c[e+1]!==u||c[e+2]!==d||c[e+3]!==f||c[e+4]!==p||c[e+5]!==m?(c[e+0]=a,c[e+1]=u,c[e+2]=d,c[e+3]=f,c[e+4]=p,c[e+5]=m,!0):!1}{let r=Ju(e),i=Yu(e,o),s=a,l=!1,u=!1;if(t){if(!s){let e=r/8+n/32,a=i/8+n/32;l=t.has(e),u=t.has(a),s=!l&&!u}}else l=!0,u=!0;let f=s||l,p=s||u,m=!1;f&&(m=d(r,n,s));let h=!1;p&&(h=d(i,n,s));let g=m||h;if(g)for(let t=0;t<3;t++){let n=r+t,a=i+t,o=c[n],s=c[n+3],l=c[a],u=c[a+3];c[e+t]=o<l?o:l,c[e+t+3]=s>u?s:u}return g}}}function Mf(e,t,n,r,i){let a,o,s,c,l,u,d=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,m=n.origin.x,h=n.origin.y,g=n.origin.z,_=t[e],v=t[e+3],y=t[e+1],b=t[e+3+1],x=t[e+2],S=t[e+3+2];return d>=0?(a=(_-m)*d,o=(v-m)*d):(a=(v-m)*d,o=(_-m)*d),f>=0?(s=(y-h)*f,c=(b-h)*f):(s=(b-h)*f,c=(y-h)*f),a>c||s>o||((s>a||isNaN(a))&&(a=s),(c<o||isNaN(o))&&(o=c),p>=0?(l=(x-g)*p,u=(S-g)*p):(l=(S-g)*p,u=(x-g)*p),a>u||l>o)?!1:((l>a||a!==a)&&(a=l),(u<o||o!==o)&&(o=u),a<=i&&o>=r)}function Nf(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,u=r+i;e<u;e++)Ef(c,t,n,l?l[e]:e,a,o,s)}function Pf(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,d=r+i;e<d;e++){let r;r=Ef(s,t,n,c?c[e]:e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Ff(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(e=n.resolveTriangleIndex(s),Df(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function If(e,t,n,r,i,a,o){yd.setBuffer(e._roots[t]),Mf(0,yd.float32Array,r,a,o)&&Lf(0,e,n,r,i,a,o),yd.clearBuffer()}function Lf(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=yd,u=e*2;if(Gu(u,c))Of(t,n,r,Ku(e,l),qu(u,c),i,a,o);else{let c=Ju(e);Mf(c,s,r,a,o)&&Lf(c,t,n,r,i,a,o);let u=Yu(e,l);Mf(u,s,r,a,o)&&Lf(u,t,n,r,i,a,o)}}var Rf=[`x`,`y`,`z`];function zf(e,t,n,r,i,a){yd.setBuffer(e._roots[t]);let o=null;return Mf(0,yd.float32Array,r,i,a)&&(o=Bf(0,e,n,r,i,a)),yd.clearBuffer(),o}function Bf(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=yd,l=e*2;if(Gu(l,s))return kf(t,n,r,Ku(e,c),qu(l,s),i,a);{let s=Xu(e,c),l=Rf[s],u=r.direction[l]>=0,d,f;u?(d=Ju(e),f=Yu(e,c)):(d=Yu(e,c),f=Ju(e));let p=Mf(d,o,r,i,a)?Bf(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Mf(f,o,r,i,a)?Bf(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var Vf=new m,Hf=new of,Uf=new of,Wf=new V,Gf=new sf,Kf=new sf;function qf(e,t,n,r){yd.setBuffer(e._roots[t]);let i=Jf(0,e,n,r);return yd.clearBuffer(),i}function Jf(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=yd,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),Gf.set(n.boundingBox.min,n.boundingBox.max,r),i=Gf),Gu(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Ku(e,s),m=qu(c,o);if(Wf.copy(r).invert(),n.boundsTree)return Vu(Zu(e),a,Kf),Kf.matrix.copy(Wf),Kf.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>Kf.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let t=p*3,n=(m+p)*3;t<n;t+=3)if(Df(Uf,t,l,u),Uf.needsUpdate=!0,e.intersectsTriangle(Uf))return!0;return!1}});{let e=Ud(n);for(let t=p*3,n=(m+p)*3;t<n;t+=3){Df(Hf,t,l,u),Hf.a.applyMatrix4(Wf),Hf.b.applyMatrix4(Wf),Hf.c.applyMatrix4(Wf),Hf.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(Df(Uf,t,d,f),Uf.needsUpdate=!0,Hf.intersectsTriangle(Uf))return!0}}}else{let o=Ju(e),c=Yu(e,s);return Vu(Zu(o),a,Vf),!!(i.intersectsBox(Vf)&&Jf(o,t,n,r,i)||(Vu(Zu(c),a,Vf),i.intersectsBox(Vf)&&Jf(c,t,n,r,i)))}}var Yf=new V,Xf=new sf,Zf=new sf,Qf=new X,$f=new X,ep=new X,tp=new X;function np(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Xf.set(t.boundingBox.min,t.boundingBox.max,n),Xf.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=cf.getPrimitive(),p=cf.getPrimitive(),m=Qf,h=$f,g=null,_=null;i&&(g=ep,_=tp);let v=1/0,y=null,b=null;return Yf.copy(n).invert(),Zf.matrix.copy(Yf),e.shapecast({boundsTraverseOrder:e=>Xf.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(Zf.min.copy(e.min),Zf.max.copy(e.max),Zf.needsUpdate=!0),!0),intersectsRange:(e,r)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>Zf.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,i)=>{for(let o=t,s=t+i;o<s;o++){Df(p,3*o,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){Df(f,3*t,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=t,b=o),e<a)return!0}}}});{let i=Ud(t);for(let t=0,o=i;t<o;t++){Df(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=e,i=e+r;n<i;n++){Df(f,3*n,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=n,b=t),e<a)return!0}}}}}),cf.releasePrimitive(f),cf.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(Yf),h.applyMatrix4(Yf),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function rp(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(n,a,l=!1){let u=n*2;if(Gu(u,s)){let t=Ku(n,o),a=qu(u,s),l=1/0,d=1/0,f=1/0,p=-1/0,m=-1/0,h=-1/0;for(let n=t,o=t+a;n<o;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let n=t+e;n=r?r[n]:n;let a=i.getX(n),o=i.getY(n),s=i.getZ(n);a<l&&(l=a),a>p&&(p=a),o<d&&(d=o),o>m&&(m=o),s<f&&(f=s),s>h&&(h=s)}}return c[n+0]!==l||c[n+1]!==d||c[n+2]!==f||c[n+3]!==p||c[n+4]!==m||c[n+5]!==h?(c[n+0]=l,c[n+1]=d,c[n+2]=f,c[n+3]=p,c[n+4]=m,c[n+5]=h,!0):!1}{let e=Ju(n),r=Yu(n,o),i=l,s=!1,u=!1;if(t){if(!i){let n=e/8+a/32,o=r/8+a/32;s=t.has(n),u=t.has(o),i=!s&&!u}}else s=!0,u=!0;let f=i||s,p=i||u,m=!1;f&&(m=d(e,a,i));let h=!1;p&&(h=d(r,a,i));let g=m||h;if(g)for(let t=0;t<3;t++){let i=e+t,a=r+t,o=c[i],s=c[i+3],l=c[a],u=c[a+3];c[n+t]=o<l?o:l,c[n+t+3]=s>u?s:u}return g}}}function ip(e,t,n,r,i,a,o){yd.setBuffer(e._roots[t]),Mf(0,yd.float32Array,r,a,o)&&ap(0,e,n,r,i,a,o),yd.clearBuffer()}function ap(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=yd,u=e*2;if(Gu(u,c))Nf(t,n,r,Ku(e,l),qu(u,c),i,a,o);else{let c=Ju(e);Mf(c,s,r,a,o)&&ap(c,t,n,r,i,a,o);let u=Yu(e,l);Mf(u,s,r,a,o)&&ap(u,t,n,r,i,a,o)}}var op=[`x`,`y`,`z`];function sp(e,t,n,r,i,a){yd.setBuffer(e._roots[t]);let o=null;return Mf(0,yd.float32Array,r,i,a)&&(o=cp(0,e,n,r,i,a)),yd.clearBuffer(),o}function cp(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=yd,l=e*2;if(Gu(l,s))return Pf(t,n,r,Ku(e,c),qu(l,s),i,a);{let s=Xu(e,c),l=op[s],u=r.direction[l]>=0,d,f;u?(d=Ju(e),f=Yu(e,c)):(d=Yu(e,c),f=Ju(e));let p=Mf(d,o,r,i,a)?cp(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Mf(f,o,r,i,a)?cp(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var lp=new m,up=new of,dp=new of,fp=new V,pp=new sf,mp=new sf;function hp(e,t,n,r){yd.setBuffer(e._roots[t]);let i=gp(0,e,n,r);return yd.clearBuffer(),i}function gp(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=yd,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),pp.set(n.boundingBox.min,n.boundingBox.max,r),i=pp),Gu(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Ku(e,s),m=qu(c,o);if(fp.copy(r).invert(),n.boundsTree)return Vu(Zu(e),a,mp),mp.matrix.copy(fp),mp.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>mp.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let n=p,r=m+p;n<r;n++)if(Df(dp,3*t.resolveTriangleIndex(n),l,u),dp.needsUpdate=!0,e.intersectsTriangle(dp))return!0;return!1}});{let e=Ud(n);for(let n=p,r=m+p;n<r;n++){Df(up,3*t.resolveTriangleIndex(n),l,u),up.a.applyMatrix4(fp),up.b.applyMatrix4(fp),up.c.applyMatrix4(fp),up.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(Df(dp,t,d,f),dp.needsUpdate=!0,up.intersectsTriangle(dp))return!0}}}else{let o=Ju(e),c=Yu(e,s);return Vu(Zu(o),a,lp),!!(i.intersectsBox(lp)&&gp(o,t,n,r,i)||(Vu(Zu(c),a,lp),i.intersectsBox(lp)&&gp(c,t,n,r,i)))}}var _p=new V,vp=new sf,yp=new sf,bp=new X,xp=new X,Sp=new X,Cp=new X;function wp(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),vp.set(t.boundingBox.min,t.boundingBox.max,n),vp.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=cf.getPrimitive(),p=cf.getPrimitive(),m=bp,h=xp,g=null,_=null;i&&(g=Sp,_=Cp);let v=1/0,y=null,b=null;return _p.copy(n).invert(),yp.matrix.copy(_p),e.shapecast({boundsTraverseOrder:e=>vp.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(yp.min.copy(e.min),yp.max.copy(e.max),yp.needsUpdate=!0),!0),intersectsRange:(r,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>yp.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,o)=>{for(let x=t,S=t+o;x<S;x++){let t=s.resolveTriangleIndex(x);Df(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=r,n=r+i;t<n;t++){let n=e.resolveTriangleIndex(t);Df(f,3*n,l,c),f.needsUpdate=!0;let r=f.distanceToTriangle(p,m,g);if(r<v&&(h.copy(m),_&&_.copy(g),v=r,y=t,b=x),r<a)return!0}}}})}{let o=Ud(t);for(let t=0,s=o;t<s;t++){Df(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=r,o=r+i;n<o;n++){let r=e.resolveTriangleIndex(n);Df(f,3*r,l,c),f.needsUpdate=!0;let i=f.distanceToTriangle(p,m,g);if(i<v&&(h.copy(m),_&&_.copy(g),v=i,y=n,b=t),i<a)return!0}}}}}),cf.releasePrimitive(f),cf.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(_p),h.applyMatrix4(_p),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function Tp(e,t,n){return e===null?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e)}var Ep=new sf,Dp=new L,Op=new X,kp=new V,Ap=new X,jp=[`getX`,`getY`,`getZ`],Mp=class e extends Xd{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(e=>e.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=i?i.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=i),o}static deserialize(t,n,r={}){r={setIndex:!0,indirect:!!t.indirectBuffer,...r};let{index:i,roots:a,indirectBuffer:o}=t;t.version||(console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`),c(a));let s=new e(n,{...r,[zu]:!0});if(s._roots=a,s._indirectBuffer=o||null,r.setIndex){let e=n.getIndex();if(e===null){let e=new B(t.index,1,!1);n.setIndex(e)}else e.array!==i&&(e.array.set(i),e.needsUpdate=!0)}return s;function c(e){for(let t=0;t<e.length;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n);for(let e=0,t=n.byteLength/32;e<t;e++){let t=8*e;Gu(2*t,i)||(r[t+6]=r[t+6]/8-e)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=(i?i[e]:e)*3,c=s+0,l=s+1,u=s+2;o&&(c=o[c],l=o[l],u=o[u]);for(let e=0;e<3;e++){let r=a[jp[e]](c),i=a[jp[e]](l),o=a[jp[e]](u),s=r;i<s&&(s=i),o<s&&(s=o);let d=r;i>d&&(d=i),o>d&&(d=o),t[n+e]=s,t[n+e+3]=d}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw Error(`MeshBVH: compute triangle bounds range is invalid.`);let c=a.array,l=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let d=[`getX`,`getY`,`getZ`],f=n.offset;for(let r=e,p=e+t;r<p;r++){let e=(i?i[r]:r)*3,t=(r-f)*6,p=e+0,m=e+1,h=e+2;o&&(p=o[p],m=o[m],h=o[h]),s||(p=p*u+l,m=m*u+l,h=h*u+l);for(let e=0;e<3;e++){let r,i,o;s?(r=a[d[e]](p),i=a[d[e]](m),o=a[d[e]](h)):(r=c[p+e],i=c[m+e],o=c[h+e]);let l=r;i<l&&(l=i),o<l&&(l=o);let u=r;i>u&&(u=i),o>u&&(u=o);let f=(u-l)/2,g=e*2;n[t+g+0]=l+f,n[t+g+1]=f+(Math.abs(l)+f)*Ru}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;kp.copy(e.matrixWorld).invert(),Dp.copy(t.ray).applyMatrix4(kp),Ap.setFromMatrixScale(e.matrixWorld),Op.copy(Dp.direction).multiply(Ap);let i=Op.length(),a=t.near/i,o=t.far/i;if(t.firstHitOnly===!0){let i=this.raycastFirst(Dp,r,a,o);i=Tp(i,e,t),i&&n.push(i)}else{let i=this.raycast(Dp,r,a,o);for(let r=0,a=i.length;r<a;r++){let a=Tp(i[r],e,t);a&&n.push(a)}}return n}refit(e=null){return(this.indirect?rp:jf)(this,e)}raycast(e,t=0,n=0,r=1/0){let i=this._roots,a=[],o=this.indirect?ip:If;for(let s=0,c=i.length;s<c;s++)o(this,s,t,e,a,n,r);return a}raycastFirst(e,t=0,n=0,r=1/0){let i=this._roots,a=null,o=this.indirect?sp:zf;for(let s=0,c=i.length;s<c;s++){let i=o(this,s,t,e,n,r);i!=null&&(a==null||i.distance<a.distance)&&(a=i)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,i=this.indirect?hp:qf;for(let a=0,o=r.length;a<o&&(n=i(this,a,e,t),!n);a++);return n}shapecast(e){let t=cf.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Ff:Af});return cf.releasePrimitive(t),n}bvhcast(t,n,r){let{intersectsRanges:i,intersectsTriangles:a}=r,o=cf.getPrimitive(),s=this.geometry.index,c=this.geometry.attributes.position,l=cf.getPrimitive(),u=t.geometry.index,d=t.geometry.attributes.position;if(a){if(!(t instanceof e))throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);let r=(e,r,i,f,p,m,h,g)=>{for(let _=i,v=i+f;_<v;_++){let i=t.resolveTriangleIndex(_);Df(l,i*3,u,d),l.a.applyMatrix4(n),l.b.applyMatrix4(n),l.c.applyMatrix4(n),l.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){let e=this.resolveTriangleIndex(t);if(Df(o,e*3,s,c),o.needsUpdate=!0,a(o,l,e,i,p,m,h,g))return!0}}return!1};if(i){let e=i;i=function(t,n,i,a,o,s,c,l){return e(t,n,i,a,o,s,c,l)?!0:r(t,n,i,a,o,s,c,l)}}else i=r}return super.bvhcast(t,n,{intersectsRanges:i})}intersectsBox(e,t){return Ep.set(e.min,e.max,t),Ep.needsUpdate=!0,this.shapecast({intersectsBounds:e=>Ep.intersectsBox(e),intersectsTriangle:e=>Ep.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,a=1/0){return(this.indirect?wp:np)(this,e,t,n,r,i,a)}closestPointToPoint(e,t={},n=0,r=1/0){return df(this,e,t,n,r)}},Np={Mesh:Y.prototype.raycast,Line:it.prototype.raycast,LineSegments:It.prototype.raycast,LineLoop:Ot.prototype.raycast,Points:S.prototype.raycast,BatchedMesh:fe.prototype.raycast},Pp=new Y,Fp=[];function Ip(e,t){if(this.isBatchedMesh)Lp.call(this,e,t);else{let{geometry:n}=this;if(n.boundsTree)n.boundsTree.raycastObject3D(this,e,t);else{let n;if(this instanceof Y)n=Np.Mesh;else if(this instanceof It)n=Np.LineSegments;else if(this instanceof Ot)n=Np.LineLoop;else if(this instanceof it)n=Np.Line;else if(this instanceof S)n=Np.Points;else throw Error(`BVH: Fallback raycast function not found.`);n.call(this,e,t)}}}function Lp(e,t){if(this.boundsTrees){let n=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,a=this.matrixWorld;Pp.material=this.material,Pp.geometry=this.geometry;let o=Pp.geometry.boundsTree,s=Pp.geometry.drawRange;Pp.geometry.boundingSphere===null&&(Pp.geometry.boundingSphere=new Ce);for(let o=0,s=r.length;o<s;o++){if(!this.getVisibleAt(o))continue;let s=r[o].geometryIndex;if(Pp.geometry.boundsTree=n[s],this.getMatrixAt(o,Pp.matrixWorld).premultiply(a),!Pp.geometry.boundsTree){this.getBoundingBoxAt(s,Pp.geometry.boundingBox),this.getBoundingSphereAt(s,Pp.geometry.boundingSphere);let e=i[s];Pp.geometry.setDrawRange(e.start,e.count)}Pp.raycast(e,Fp);for(let e=0,n=Fp.length;e<n;e++){let n=Fp[e];n.object=this,n.batchId=o,t.push(n)}Fp.length=0}Pp.geometry.boundsTree=o,Pp.geometry.drawRange=s,Pp.material=null,Pp.geometry=null}else Np.BatchedMesh.call(this,e,t)}function Rp(e,t){if(!t)return e;if(e.isInstancedMesh)throw TypeError(`Static geometry BVH installation does not replace InstancedMesh raycasting`);let n=e.geometry;return n.boundsTree=Mp.deserialize(t,n,{setIndex:!1}),e.raycast=Ip,n.addEventListener(`dispose`,function e(){this.boundsTree=null,this.removeEventListener(`dispose`,e)}),e}function zp(e){return e?[...new Set([...e.roots,e.index?.buffer,e.indirectBuffer?.buffer].filter(Boolean))]:[]}var Bp=new d(1,1,1),Vp=(e,t,n)=>new X(e,t,n);function Hp(e,t,n,r=0,i=0,a=0){let o=new Y(t,typeof n==`string`?Gt[n]:n);return o.position.set(r,i,a),o.castShadow=!0,o.receiveShadow=!0,e.add(o),o}function Up(e,t,n,r,i,a,o,s,c=0){let l=Hp(e,Bp,s,t,n,r);return l.scale.set(i,a,o),l.rotation.y=c,l}function Wp(e,t,n,r,i,a,s,c,l=8,u=!1){return Hp(e,new o(i,a,s,l,1,u),c,t,n,r)}function Gp(e,t,n,r,i,a,o,s,c=0){let l=Hp(e,new Me(1,c),s,t,n,r);return l.scale.set(i,a,o),l}function Kp(e,t,n,r,i,a=r){let o=t.clone().add(n).multiplyScalar(.5),s=Up(e,o.x,o.y,o.z,r,t.distanceTo(n),a,i);return s.quaternion.setFromUnitVectors(Vp(0,1,0),n.clone().sub(t).normalize()),s}function qp(e,t=0,n=0,r=0,i=0){let a=new q;return a.position.set(t,n,r),a.rotation.y=i,e.add(a),a}function Jp(t,n,r,i,a,o=`roof`){let s=[-n/2,0,-r/2,n/2,0,-r/2,0,i,-r/2,-n/2,0,r/2,n/2,0,r/2,0,i,r/2],c=new Ze;return c.setAttribute(`position`,new e(s,3)),c.setIndex([0,2,1,3,4,5,0,3,5,0,5,2,1,2,5,1,5,4,0,1,4,0,4,3]),c.computeVertexNormals(),Hp(t,c,o,0,a,0)}function Yp(e){e.updateMatrixWorld(!0);let t=e.matrixWorld.clone().invert(),n=new Map,r=new Set;e.traverse(e=>{if(!e.isMesh)return;let i=e.material;e.geometry!==Bp&&r.add(e.geometry),n.has(i)||n.set(i,[]);let a=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();if(a.deleteAttribute(`uv`),a.deleteAttribute(`tangent`),!i.vertexColors)a.deleteAttribute(`color`);else if(!a.attributes.color){let e=new Float32Array(a.attributes.position.count*3);e.fill(1),a.setAttribute(`color`,new B(e,3))}a.applyMatrix4(t.clone().multiply(e.matrixWorld)),n.get(i).push(a)}),e.clear();for(let[t,r]of n)Hp(e,co(r,!1),t),r.forEach(e=>e.dispose());return r.forEach(e=>e.dispose()),e}var Xp=(e,t)=>(Math.trunc(e)%t+t)%t;function Zp(e,t=0){return Xp(t,3)===0?e===`landmark`?[{x:0,y:2.77,z:.745,rotation:0,radius:.38},{x:.745,y:2.77,z:0,rotation:Math.PI/2,radius:.38},{x:0,y:2.77,z:-.745,rotation:Math.PI,radius:.38},{x:-.745,y:2.77,z:0,rotation:-Math.PI/2,radius:.38}]:e===`civic`?[{x:0,y:3.65,z:.175,rotation:0,radius:.3}]:[]:[]}var Qp=Object.freeze([{length:.5,width:.075,z:.042,period:720},{length:.72,width:.05,z:.05,period:60}]);function $p(e,t){return-Math.PI*2*((t===0?10/12+8/720:8/60)+(e??0)/Qp[t].period)}var em=Object.freeze({legHeight:.26,legWidth:.065,legDepth:.078,stride:.045,stepLength:.2,stepLift:.026});function tm(){let e=[new Me(1,1).scale(.105,.12,.14)];e.push(new d(.13,.15,.13).translate(0,-.035,-.08).toNonIndexed());for(let t of[-1,1])e.push(new d(.085,.035,.055).translate(t*.128,.025,-.02).toNonIndexed());let t=co(e);return e.forEach(e=>e.dispose()),t}var nm=.75,rm=.17,im=Object.freeze({house:{width:2.2,depth:2.2,height:2.4},station:{width:6.4,depth:2.4,height:2.4},tree:{radius:.85,height:2.8},landmark:{radius:2,height:4.5},apartment:{radius:2.05,height:5},civic:{radius:2.8,height:5},plaza:{radius:2.6,height:.9},tower:{radius:2.1,height:8},farmPatch:{width:3,depth:4,height:1.6},cactus:{radius:.7,height:2.4},sheep:{width:.46,depth:.8,height:.53},person:{radius:rm,height:nm},trainCar:{width:1.12,depth:2.4,height:1.6}}),am=(e,t)=>(Math.trunc(e)%t+t)%t;function om(e,t,{x:n=0,y:r=0,z:i=0,rotation:a=0,scale:o=1}={}){let s=qp(e,n,r,i,a);return s.name=t,s.scale.setScalar(o),s.userData.footprint={...im[t]},s.userData.rigidSurfaceAsset=!0,s}function sm(e,t,n,r,i=.36,a=.44,o){let s=Up(e,t,n,r+.004,i+.07,a+.07,.024,o?.trim??`trim`),c=Up(e,t,n,r+.018,i,a,.012,`window`);s.castShadow=!1,c.castShadow=!1}function cm(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,color:o=`plaster`,scale:s=1,palette:c}={}){let l=om(e,`house`,{x:t,y:n,z:r,rotation:i,scale:s}),u=am(a,4),d=u===2?1.65:1.42,f=u===1?1.62:1.82,p=u===1?1.9:1.72,m=c?.roof??[`roof`,`roofBlue`,`roofLight`,`roofDark`][u],h=c?u===2?c.body:c.light:o,g=c?.trim??`trim`;Up(l,0,.07,0,f+.1,.14,p+.1,`platform`),Up(l,0,d/2+.12,0,f,d,p,h),Up(l,0,d+.12,0,f+.06,.1,p+.06,g),u===1?Jp(qp(l,0,0,0,Math.PI/2),p+.24,f+.24,.51,d+.16,m):Jp(l,f+.24,p+.24,.51,d+.16,m);let _=p/2;Up(l,0,.53,_+.008,.34,.8,.024,c?.dark??`timber`).castShadow=!1,sm(l,-f*.29,.91,_,.36,.44,c),sm(l,f*.29,.91,_,.36,.44,c);for(let e of[-1,1])sm(qp(l,e*f/2,0,0,e*Math.PI/2),0,.92,0,.36,.37,c);return(u===0||u===3)&&(Up(l,-.49,1.97,-.35,.24,.5,.28,c?.dark??`roofDark`),Up(l,-.49,2.22,-.35,.29,.08,.33,g)),l}function lm(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,scale:a=1,variant:o=0}={}){let s=om(e,`tree`,{x:t,y:n,z:r,rotation:i,scale:a}),c=am(o,9),l=c===8?1.64:c===7?1.35:1.15;if(Wp(s,0,l/2,0,.085,.13,l,c===8?`trim`:`bark`,8,!0),c<3)Wp(s,0,1.4,0,0,.8,1.45,c===1?`pineLight`:`pine`,7),Wp(s,0,2.03,0,0,.57,1.38,c===2?`pineDark`:`pineLight`,7);else if(c<6){let e=[`leaf`,`leafGold`,`leafLight`][c-3];Gp(s,0,1.55,0,.84,1.05,.84,e)}else c===6?(Kp(s,Vp(0,.75,0),Vp(.23,1.43,.08),.11,`bark`),Gp(s,0,1.68,0,.84,.82,.8,`leaf`)):c===7?(Kp(s,Vp(0,.65,0),Vp(-.29,1.29,.06),.1,`bark`),Kp(s,Vp(0,.72,0),Vp(.3,1.34,-.04),.09,`bark`),Gp(s,0,1.51,0,.84,.35,.8,`pineLight`)):(Kp(s,Vp(0,1.12,0),Vp(.22,1.67,.08),.07,`trim`),Gp(s,.07,1.85,0,.55,.88,.56,`leafLight`));return s}function um(e,{color:t=`red`,cab:n=!1,palette:r}={}){let i=om(e,`trainCar`),a=r?.body??t,o=r?.roof??`roofBlue`,s=r?.trim??`trim`;Up(i,0,.34,0,.91,.19,2.1,`metal`),Up(i,0,.88,0,1.02,.94,2.12,a),Up(i,0,1.315,0,1.035,.06,2.14,s),Up(i,0,1.405,0,1.1,.18,2.2,o),Up(i,0,.65,0,1.035,.065,2.14,r?.accent??`gold`);for(let e of[-1,1]){for(let t of[-.54,.49])Up(i,e*.514,1.075,t,.016,.39,.69,`window`).castShadow=!1;for(let t of[-.67,.67])Wp(i,e*.48,.22,t,.22,.22,.14,`metal`,8).rotation.z=Math.PI/2}for(let e of[-1.07,1.07])Up(i,0,1.075,e,.66,.37,.025,`window`).castShadow=!1;if(n){Up(i,0,.77,1.085,.86,.25,.12,a);for(let e of[-.31,.31])Up(i,e,.79,1.151,.14,.13,.03,`lamp`)}return i}function dm(e){let t=new Map;for(let n of e.children){if(!n.isMesh)throw TypeError(`Color batching expects consolidated meshes`);let e=n.material,r={roughness:e.roughness??1,metalness:e.metalness??0,side:e.side,flatShading:e.flatShading,transparent:e.transparent,opacity:e.opacity},i=e.userData.sceneStyle??`asset`,a=JSON.stringify({...r,sceneStyle:i});t.has(a)||t.set(a,{properties:r,sceneStyle:i,geometries:[]});let o=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone(),s=o.attributes.position.count,c=new Float32Array(s*3),l=o.attributes.color;for(let t=0;t<s;t++)c[t*3]=e.color.r*(l?l.getX(t):1),c[t*3+1]=e.color.g*(l?l.getY(t):1),c[t*3+2]=e.color.b*(l?l.getZ(t):1);o.setAttribute(`color`,new B(c,3)),t.get(a).geometries.push(o),n.geometry.dispose()}e.clear(),e.userData.ownedMaterials??=[];for(let{properties:n,sceneStyle:r,geometries:i}of t.values()){let t=co(i,!1);i.forEach(e=>e.dispose());let a=new ie({...n,color:16777215,vertexColors:!0,name:`baked-material-colors`});a.userData.sceneStyle=r,Ut(a,{kind:r}),e.userData.ownedMaterials.push(a);let o=new Y(t,a);o.castShadow=!0,o.receiveShadow=!0,e.add(o)}return e}var fm=.78,pm=e=>({pine:Math.floor((e.scale??1)*7)%3,round:3,gold:4,light:5,broadleaf:6,acacia:7,birch:8})[e.variant]??0,mm=e=>e.id??`tree:${e.x}:${e.y??0}:${e.z}`;function hm(e,t){let n=new Map,r=new m,i=new V,a=new V,o=new L,s=new X,c=new X,l=new Y(e.geometry,e.material),u=[],d=new Set;e.geometry.computeBoundingBox();for(let a=0;a<t.length;a++){e.getMatrixAt(a,i),r.copy(e.geometry.boundingBox).applyMatrix4(i);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++){let r=`${e}:${t}:${i}`;n.has(r)||n.set(r,[]),n.get(r).push(a)}}e.raycast=(f,p)=>{if(a.copy(e.matrixWorld).invert(),o.copy(f.ray).applyMatrix4(a),o.intersectsSphere(e.boundingSphere)){if(d.clear(),Number.isFinite(f.far)&&f.far<=64){f.ray.at(f.near,s).applyMatrix4(a),f.ray.at(f.far,c).applyMatrix4(a),r.makeEmpty().expandByPoint(s).expandByPoint(c);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++)for(let r of n.get(`${e}:${t}:${i}`)??[])d.add(r)}else for(let e=0;e<t.length;e++)d.add(e);for(let n of d)if(t[n].active){e.getMatrixAt(n,i),l.matrixWorld.multiplyMatrices(e.matrixWorld,i),u.length=0,l.raycast(f,u);for(let t of u)t.instanceId=n,t.object=e,p.push(t)}}}}function gm(e,{onChange:t=()=>{}}={}){let n=new Map,r=new Map,i=new Map,a=new Set,o=new Set,s=new V,c=new V,l=new X,u=new X,d=0,f=!1;function p(e){if(!n.has(e)){let t=new q;lm(t,{variant:e}),dm(Yp(t));let r=t.children[0];r.geometry.computeBoundingBox(),r.geometry.computeBoundingSphere(),n.set(e,{geometry:r.geometry,material:r.material}),t.clear()}return n.get(e)}function h(){d++,t()}function _(t,n,o,{reveal:c={value:1}}={}){if(f)throw Error(`Cannot add trees to a disposed renderer`);v(t);let u=new q;u.name=`mutable-trees-${t}`,n.add(u);let d=new Map,h=[],g=[],_=[],y=new m,b=oo(c),x=0,S=0;for(let e of o){let t=mm(e);if(a.has(t)||i.has(t))continue;let n=pm(e);d.has(n)||d.set(n,[]),d.get(n).push({id:t,placement:e,active:!0,elapsed:0})}for(let[n,r]of d){let a=p(n),o=ao(a.material.clone(),c);Ut(o,{kind:a.material.userData.sceneStyle??`asset`}),g.push(o);let d=new Tt(a.geometry,o,r.length);d.name=`trees-${n}`,d.instanceMatrix.setUsage(O),d.castShadow=d.receiveShadow=!0,d.customDepthMaterial=b,d.userData.mutableTreeBatch=!0,u.add(d),h.push(d);let f=0;for(let n=0;n<r.length;n++){let a=r[n],o=a.placement,c=o.scale??1;a.mesh=d,a.index=n,a.chunk=t,a.base=Ke(e,o.x,o.y??0,o.z,o.rotation??0),s.copy(a.base).scale(l.setScalar(c)),d.setMatrixAt(n,s),i.set(a.id,a),_.push(a),f=Math.max(f,c*3.2)}d.computeBoundingBox(),d.boundingBox.expandByScalar(f),d.boundingSphere=d.boundingBox.getBoundingSphere(new Ce),y.union(d.boundingBox),hm(d,r),x+=d.instanceMatrix.array.byteLength,S+=(a.geometry.index?.count??a.geometry.attributes.position.count)/3*r.length}let C={key:t,root:u,meshes:h,materials:g,depth:b,entries:_,bounds:y,bytes:x,triangles:S};return r.set(t,C),C}function v(e){let t=r.get(e);if(t){for(let e of t.entries)i.delete(e.id),o.delete(e);for(let e of t.meshes)e.dispose();t.materials.forEach(e=>e.dispose()),t.depth.dispose(),t.root.removeFromParent(),r.delete(e)}}function y(e){e.active=!1,a.add(e.id),h()}function b(e,{direction:t={x:1,z:0}}={}){let n=i.get(e);if(f||!n?.active)return!1;y(n),n.elapsed=0;let r=Math.hypot(t.x??0,t.z??0)||1,a=(t.x??0)/r,s=(t.z??0)/r,c=n.placement.rotation??0;return n.axis=new X(s*Math.cos(c)+a*Math.sin(c),0,-a*Math.cos(c)+s*Math.sin(c)).normalize(),n.axis.lengthSq()<.01&&n.axis.set(0,0,-1),o.add(n),!0}function x(e){if(f||a.has(e))return!1;let t=i.get(e);return a.add(e),t&&(t.active=!1,o.delete(t),t.mesh.setMatrixAt(t.index,s.copy(t.base).scale(l.setScalar(0))),t.mesh.instanceMatrix.addUpdateRange(t.index*16,16),t.mesh.instanceMatrix.needsUpdate=!0),h(),!0}function S(e){if(f||!o.size)return;let t=new Set;for(let n of o){n.elapsed=Math.min(fm,n.elapsed+Math.max(0,e));let r=Math.min(1,n.elapsed/.6),i=g.smoothstep(n.elapsed,.58,fm);c.makeRotationAxis(u.copy(n.axis),Math.PI*.49*r*r),s.multiplyMatrices(n.base,c).scale(l.setScalar((n.placement.scale??1)*(1-i))),n.mesh.setMatrixAt(n.index,s),n.mesh.instanceMatrix.addUpdateRange(n.index*16,16),t.add(n.mesh),n.elapsed>=.78&&o.delete(n)}for(let e of t)e.instanceMatrix.needsUpdate=!0}function C(){if(!f){f=!0;for(let e of[...r.keys()])v(e);for(let e of n.values())e.geometry.dispose(),e.material.dispose();n.clear(),a.clear(),i.clear(),o.clear()}}return{addChunk:_,removeChunk:v,fellTree:b,removeTree:x,update:S,dispose:C,removed:a,get revision(){return d},get activeFalls(){return o.size},get templateCount(){return n.size},get meshes(){return[...r.values()].flatMap(e=>e.meshes)}}}var _m=e=>Math.max(0,Math.min(1,e)),vm=(e,t,n)=>{let r=_m((n-e)/(t-e));return r*r*(3-2*r)},ym={};function bm(e,t,n,r,{surface:i=!0,target:a}={}){let o=a??Z.rock.clone(),s=r.x*-.55+r.y*.77+r.z*.32,c=r.y<-.15?Z.rockDark:Math.abs(r.y)<.15?Z.rockLight:s<.05?Z.rockDark:s>.68?Z.rockLight:Z.rock;if(!i||r.y<.18)return o.copy(c);let l=Math.max(0,n.y)/t.height;Xl(e.terrainSource??e,n.x,n.z,{target:o}),zt(e.terrainSource??e,n.x,n.z,ym);let u=vm(0,.1,o.g-o.r),d=vm(.28,.68,ym.patch),f=vm(.06,.3,l)*(1-vm(.56,.79,l));o.lerp(Z.meadow,(.22+.12*ym.moisture)*f*u),o.lerp(Z.forestFloor,.32*d*u*vm(.025,.16,l)*(1-vm(.31,.56,l)));let p=vm(.9,.48,r.y),m=vm(.53,.84,l),h=Math.max(p,m)*vm(.015,.12,l);return o.lerp(c,h)}new V,new X;var xm=new ie({name:`ocean-vertex`,color:16777215,vertexColors:!0,roughness:.52,metalness:0,flatShading:!1});xm.userData.sceneStyle=`water`;var Sm=new ie({name:`coastal-surf`,color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1});Sm.userData.sceneStyle=`surf`;var Cm=new X;function wm(e,t,n){let r=hl(t,n);return Ct(e)&&(Et(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,Cm).normalize(),r.tangent={x:Cm.x,y:Cm.y,z:Cm.z}),r}var Tm=(e,t)=>Math.hypot(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x),Em=2.64,Dm=1.2,Om=.14,km=1.35,Am=2.4,jm=.05;function Mm(e,t){let n=new Map(e.zones);for(let[e,r]of t.zones){let t=n.get(e);n.set(e,t?{min:Math.min(t.min,r.min),max:Math.max(t.max,r.max)}:{...r})}return{id:e.id,junctionIds:[...e.junctionIds,...t.junctionIds],zones:n,owner:null}}function Nm(e,t){let n=new Map;for(let r of e.lines){let i=t.get(r.id);if(i)for(let[t,a,o]of[[r.from,0,1],[r.to,r.length,-1]]){if(t===void 0)continue;let s=wm(e,r,a),c={lineId:r.id,distance:a,sign:o,train:i,x:s.tangent.x*o,y:s.tangent.y*o,z:s.tangent.z*o,closest:o===1?i.start:r.length-i.end};n.has(t)||n.set(t,[]),n.get(t).push(c)}}let r=[];for(let[e,t]of n)for(let n=0;n<t.length;n++)for(let i=n+1;i<t.length;i++){let a=t[n],o=t[i];if(a.x*o.x+a.y*o.y+a.z*o.z<=0)continue;let s=Tm(a,o),c=km/Math.max(s,.01);a.closest-a.train.halfLength-Om>=c||o.closest-o.train.halfLength-Om>=c||r.push({id:`approach-${e}-${n}-${i}`,lines:[{lineId:a.lineId,distance:a.distance},{lineId:o.lineId,distance:o.distance}]})}return r}function Pm(e,t){let n=new Map(e.lines.map(e=>[e.id,e])),r=new Map(t.map(e=>[e.lineId,e])),i=[...e.junctions||[],...Nm(e,r)].map(t=>{let i=km;for(let r=0;r<t.lines.length;r++){let a=t.lines[r],o=n.get(a.lineId);if(!o)continue;let s=wm(e,o,a.distance).tangent;for(let a of t.lines.slice(r+1)){let t=n.get(a.lineId);if(!t)continue;let r=wm(e,t,a.distance).tangent,o=Tm(s,r);i=Math.max(i,km/Math.max(o,.01))}}return{id:t.id,junctionIds:[t.id],owner:null,zones:new Map(t.lines.filter(e=>r.has(e.lineId)).map(e=>[e.lineId,{min:e.distance-i,max:e.distance+i}]))}}).filter(e=>e.zones.size>1),a=!0;for(;a;){a=!1;outer:for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)for(let[n,o]of i[e].zones){let s=i[t].zones.get(n);if(s&&!(Math.max(s.min-o.max,o.min-s.max,0)>r.get(n).halfLength*2+Om*3)){i[e]=Mm(i[e],i[t]),i.splice(t,1),a=!0;break outer}}}return i}function Fm(e,t,n=e.distance){return n+e.halfLength+Om>=t.min&&n-e.halfLength-Om<=t.max}function Im(e){let t=e.lines.filter(e=>e.length>12).map((e,t)=>{let n=e.length<23?2:3,r=Em*(n-1)/2+3.25,i=Math.max(r,e.stops?.[0]?.distance??r),a=Math.min(e.length-r,e.stops?.[1]?.distance??e.length-r);return{id:`train-${e.id}`,lineId:e.id,count:n,spacing:Em,halfLength:Em*(n-1)/2+Dm,start:i,end:a,distance:i,direction:1,speed:2.6+t%3*.16,dwell:t*.45,active:!1,waiting:!1}}).filter(e=>e.end>e.start),n=t.length,r=e.traffic?.trainCount;if(r!==void 0){if(!Number.isInteger(r)||r<0||r>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);t.length=Math.min(t.length,r)}let i=Pm(e,t),a=new Map(t.map(e=>[e.id,e])),o=new Map(t.map(e=>[e.lineId,i.filter(t=>t.zones.has(e.lineId)).sort((t,n)=>t.zones.get(e.lineId).min-n.zones.get(e.lineId).min)]));function s(e){let t=o.get(e.lineId);for(let n of t)if(Fm(e,n.zones.get(e.lineId))&&n.owner&&n.owner!==e.id)return e.waiting=!0,!1;for(let n of t)Fm(e,n.zones.get(e.lineId))&&(n.owner=e.id);return e.active=!0,e.waiting=!1,!0}t.forEach(s);function c(e){for(let e of i){if(!e.owner)continue;let t=a.get(e.owner);Fm(t,e.zones.get(t.lineId))||(e.owner=null)}for(let n of t){if(!n.active&&!s(n))continue;n.waiting=!1;let t=Math.max(0,e-n.dwell);if(n.dwell=Math.max(0,n.dwell-e),!t)continue;let r=n.direction,i=r>0?Math.min(n.end,n.distance+t*n.speed):Math.max(n.start,n.distance-t*n.speed),a=o.get(n.lineId),c=r>0?0:a.length-1;for(let e=c;e>=0&&e<a.length;e+=r){let t=a[e],o=t.zones.get(n.lineId);if(Math.max(n.distance,i)+n.halfLength+Om<o.min||Math.min(n.distance,i)-n.halfLength-Om>o.max)continue;if(!t.owner||t.owner===n.id){t.owner=n.id;continue}let s=r>0?o.min-n.halfLength-Om:o.max+n.halfLength+Om;i=r>0?Math.max(n.distance,Math.min(i,s)):Math.min(n.distance,Math.max(i,s)),n.waiting=!0;break}n.distance=i;let l=r>0?n.end:n.start;Math.abs(n.distance-l)<1e-8&&(n.distance=l,n.direction=-r,n.dwell=Am,n.waiting=!1)}}return{trains:t,capacity:n,get reservations(){return i.map(e=>({id:e.id,junctionIds:[...e.junctionIds],trainId:e.owner}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(e===0)return;let t=Math.ceil(e/jm);for(let n=0;n<t;n++)c(e/t)}}}var Lm=2.64,Rm=3.84,zm=1.2,Bm=.56,Vm=.05,Hm=(e,t)=>(e%t+t)%t,Um=(e,t)=>`${e}:${t}`;function Wm(e,t,n,r){let i=e.trainOwners?.[t]??r?.ownerId??e.cities.find(e=>e.id===n)?.ownerId??e.players?.[0]?.id??null;if(i!==null&&e.players&&!e.players.some(e=>e.id===i))throw TypeError(`Invalid world: train ${t} references an unknown player`);return i}var Gm=()=>({x:0,y:0,z:0,distance:0,tangent:{x:0,y:0,z:1},angle:0,heading:0,curvature:0,lineId:null});function Km(e,t,n){if(e.alignment)return xs(e.alignment,t,n);let r=Math.max(0,Math.min(e.length,t)),i=e.points,a=e.distances,o=0,s=i.length-1;for(;o+1<s;){let e=o+s>>1;a[e]<=r?o=e:s=e}let c=i[o],l=i[s],u=a[s]-a[o],d=u>1e-9?(r-a[o])/u:0,f=l.x-c.x,p=l.y-c.y,m=l.z-c.z,h=Math.hypot(f,p,m)||1;return n.x=c.x+f*d,n.y=c.y+p*d,n.z=c.z+m*d,n.distance=r,n.tangent.x=f/h,n.tangent.y=p/h,n.tangent.z=m/h,n.curvature=void 0,n.heading=Math.atan2(m,f),n.angle=Math.atan2(f,m),n}function qm(e,t,n=Gm()){n.tangent??={x:0,y:0,z:0};let r=e.closed?Hm(t,e.length):Math.max(0,Math.min(e.length,t)),i=e.segments,a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;r>=i[e].start+i[e].length-1e-9?a=e+1:o=e}let s=i[a],c=Math.max(0,Math.min(s.length,r-s.start));if(Km(s.line,Pc(s.metric,s.direction>0?c:s.length-c),n),n.distance=r,n.tangent.x*=s.direction,n.tangent.y*=s.direction,n.tangent.z*=s.direction,n.heading=Math.atan2(n.tangent.z,n.tangent.x),n.angle=Math.atan2(n.tangent.x,n.tangent.z),Number.isFinite(n.curvature)&&(n.curvature*=s.direction),n.lineId=s.lineId,e.surfaceWorld){let t=n.physical??={};Be(e.surfaceWorld,n.x,n.y,n.z,Jm),Et(e.surfaceWorld,n.x,n.y,n.z,n.tangent.x,0,n.tangent.z,Ym).normalize(),rt(e.surfaceWorld,n.x,n.z,Xm),Zm.crossVectors(Xm,Ym).normalize(),t.x=Jm.x,t.y=Jm.y,t.z=Jm.z,t.tx=Ym.x,t.ty=Ym.y,t.tz=Ym.z,t.rx=Zm.x,t.ry=Zm.y,t.rz=Zm.z}return n}var Jm=new X,Ym=new X,Xm=new X,Zm=new X;function Qm(e,t,n=!0,r){let i=0,a=e.map(e=>{let t=r?Ac(r,e.line):null,n={line:e.line,lineId:e.line.id,direction:e.direction,metric:t,start:i,length:t?.length??e.line.length};return i+=n.length,n});return{id:`circuit-${t+1}`,segments:a,length:i,closed:n,...Ct(r)?{surfaceWorld:{surface:r.surface}}:{}}}function $m(e){let t=new Map(e.lines.map(e=>[e.id,e]));if(e.traffic?.circuits){if(!Array.isArray(e.traffic.circuits))throw TypeError(`Traffic circuits must be an array`);let n=new Set;return e.traffic.circuits.map((r,i)=>{if(!Array.isArray(r.segments)||r.segments.length<2)throw TypeError(`A traffic circuit needs at least two segments`);let a=r.segments.map(e=>{let n=t.get(e.lineId),r=e.direction??1;if(!n||r!==1&&r!==-1)throw TypeError(`Traffic circuit references an invalid line or direction`);return{line:n,direction:r}}),o=Qm(a,i,!0,e);if(o.id=String(r.id??o.id),n.has(o.id))throw TypeError(`Traffic circuit IDs must be unique`);n.add(o.id);for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=hl(t.line,t.direction>0?t.line.length:0),i=hl(n.line,n.direction>0?0:n.line.length),o=(r.tangent.x*i.tangent.x+r.tangent.z*i.tangent.z)*t.direction*n.direction;if(Math.hypot(r.x-i.x,r.z-i.z)>1e-4||o<.9999)throw TypeError(`Traffic circuit segments must meet with continuous tangents`)}return o})}let n=new Map(e.lines.map(e=>{let t=0;for(let n=1;n<e.points.length;n++){let r=e.points[n-1],i=e.points[n];t+=r.x*i.z-i.x*r.z}return[e.id,t]})),r=new Map(e.lines.flatMap(e=>[1,-1].map(t=>[Um(e.id,t),{line:e,direction:t,key:Um(e.id,t),next:[]}])));for(let t of e.transitions??[]){let e=r.get(Um(t.fromLineId,t.fromEnd===`end`?1:-1)),n=r.get(Um(t.toLineId,t.toEnd===`start`?1:-1));if(!e||!n||e.line===n.line)continue;let i=hl(e.line,e.direction>0?e.line.length:0),a=hl(n.line,n.direction>0?0:n.line.length),o=(i.tangent.x*a.tangent.x+i.tangent.z*a.tangent.z)*e.direction*n.direction;Math.hypot(i.x-a.x,i.z-a.z)>1e-4||o<.9999||e.next.push(n)}let i=[],a=new Set(t.keys());for(;a.size;){let e=a.values().next().value,t=new Set([e]),n=[e];for(a.delete(e);n.length;){let e=n.shift();for(let i of[1,-1])for(let o of r.get(Um(e,i)).next)t.has(o.line.id)||(t.add(o.line.id),a.delete(o.line.id),n.push(o.line.id))}i.push(t)}let o=[];for(let t of i){let i=null,a=-1/0,s=0,c=[...r.values()].filter(e=>t.has(e.line.id)),l=new Map([...t].map((e,t)=>[e,t]));for(let t of c){let r=(c,u,d)=>{if(!(++s>3e4))for(let s of c.next)if(s.key===t.key&&u.length>=2){let t=new Set,r=0,s=0;for(let e of u)t.add(e.line.from),t.add(e.line.to),r+=n.get(e.line.id)*e.direction,s+=e.line.length;let c=t.size*1e7+Math.abs(r)*100+s,l=c>a?Qm(u,o.length,!0,e):null;c>a&&(i=l,a=c)}else!d.has(s.line.id)&&l.get(s.line.id)>=l.get(t.line.id)&&(d.add(s.line.id),u.push(s),r(s,u,d),u.pop(),d.delete(s.line.id))};r(t,[t],new Set([t.line.id]))}i&&o.push(i)}return o}function eh(e){let t=[],n=new Map,r=new Map,i=2.8;for(let r of e){let e=Math.ceil(r.length/1.2),i=[],a=Gm();for(let n=0;n<e;n++){let o=n/e*r.length;qm(r,o,a);let s=a.physical??a,c={index:t.length,path:r,distance:o,x:s.x,y:a.physical?s.y:0,z:s.z,spacing:r.length/e};t.push(c),i.push(c)}n.set(r.id,i)}let a=new Int32Array(t.length);for(let e=0;e<a.length;e++)a[e]=e;let o=new Uint8Array(t.length),s=e=>{for(;a[e]!==e;)a[e]=a[a[e]],e=a[e];return e},c=(e,t)=>{a[s(e)]=s(t),o[e]=1,o[t]=1};for(let e of t){let t=Math.floor(e.x/i),n=Math.floor(e.y/i),a=Math.floor(e.z/i),o=!!e.path.surfaceWorld;for(let s=-1;s<=1;s++)for(let l=o?-1:0;l<=+!!o;l++)for(let o=-1;o<=1;o++){let u=r.get(`${t+s},${n+l},${a+o}`);if(u)for(let t of u){let n=Math.abs(e.distance-t.distance);e.path===t.path&&Math.min(n,e.path.length-n)<11.68||(e.x-t.x)**2+(e.y-t.y)**2+(e.z-t.z)**2<i*i&&c(e.index,t.index)}}let s=`${t},${n},${a}`;r.has(s)||r.set(s,[]),r.get(s).push(e)}for(let e of n.values()){let t=null,n=null;for(let r of e)o[r.index]&&(n&&r.distance-n.distance<10.68&&c(n.index,r.index),t??=r,n=r);t&&n&&Hm(t.distance-n.distance,t.path.length)<10.68&&c(n.index,t.index)}let l=new Map;for(let e of t)if(o[e.index]){let t=s(e.index);l.has(t)||l.set(t,new Map);let n=l.get(t);n.has(e.path.id)||n.set(e.path.id,[]),n.get(e.path.id).push(e)}return[...l.values()].map((e,t)=>{let n=[];for(let[t,r]of e)for(let e of r){let r=n.at(-1),i=Math.max(0,e.distance-e.spacing),a=Math.min(e.path.length,e.distance+e.spacing);r?.pathId===t&&i<=r.end+1e-6?r.end=a:n.push({pathId:t,start:i,end:a})}return{id:`network-block-${t+1}`,owner:null,zones:n,queryStamp:0,waiters:new Set}})}function th(e,t,n=e.distance){for(let r of t.zones)if(r.pathId===e.path.id)for(let t=-1;t<=1;t++){let i=n+t*e.path.length;if(i+e.halfLength+.2>=r.start&&i-e.halfLength-.2<=r.end)return!0}return!1}function nh(e,t){t.x=e.x,t.y=e.y,t.z=e.z,t.distance=e.distance,t.tangent.x=e.tangent.x,t.tangent.y=e.tangent.y,t.tangent.z=e.tangent.z,t.angle=e.angle,t.heading=e.heading,t.curvature=e.curvature,t.lineId=e.lineId,e.physical&&Object.assign(t.physical??={},e.physical)}function rh(e,t){let n=0,r=new Map((t.players??[]).map((e,t)=>[e.id,t]));for(let t of e)t.poseOffset=n,n+=t.count,t.pose=Gm(),t.carPoses=Array.from({length:t.count},Gm),t._nextCarPoses=Array.from({length:t.count},Gm),t._cachedDistance=NaN,t._ownerIndex=r.get(t.ownerId)??0;return new Float32Array(n*6)}function ih(e,t,n){for(let r=0;r<e.count;r++)qm(e.path,t+(r-(e.count-1)/2)*e.spacing,n[r])}function ah(e,t){for(let n=0;n<e.count;n++){let r=e.carPoses[n],i=(e.poseOffset+n)*6;t[i]=r.x,t[i+1]=r.y,t[i+2]=r.z,t[i+3]=r.angle,t[i+4]=+!!e.active,t[i+5]=e._ownerIndex}}function oh(e,t){ih(e,e.distance,e.carPoses),qm(e.path,e.distance,e.pose),e._cachedDistance=e.distance,ah(e,t)}function sh(e,t,n,r,i,a){let o=e.tangent,s=t.tangent,c=zm*(Math.abs(n*o.x+r*o.z)+Math.abs(n*s.x+r*s.z))+Bm*(Math.abs(-n*o.z+r*o.x)+Math.abs(-n*s.z+r*s.x))+.06;return Math.abs(i*n+a*r)>=c}function ch(e,t){if(e.physical&&t.physical){let n=e.physical,r=t.physical,i=r.x-n.x,a=r.y-n.y,o=r.z-n.z;if(i*i+a*a+o*o>2.7*2.7)return!1;let s=(e,t,s)=>Math.abs(i*e+a*t+o*s)>=zm*(Math.abs(e*n.tx+t*n.ty+s*n.tz)+Math.abs(e*r.tx+t*r.ty+s*r.tz))+Bm*(Math.abs(e*n.rx+t*n.ry+s*n.rz)+Math.abs(e*r.rx+t*r.ry+s*r.rz))+.06;return!s(n.tx,n.ty,n.tz)&&!s(n.rx,n.ry,n.rz)&&!s(r.tx,r.ty,r.tz)&&!s(r.rx,r.ry,r.rz)}let n=t.x-e.x,r=t.z-e.z;if(n*n+r*r>2.7*2.7)return!1;let i=e.tangent,a=t.tangent;return!sh(e,t,i.x,i.z,n,r)&&!sh(e,t,-i.z,i.x,n,r)&&!sh(e,t,a.x,a.z,n,r)&&!sh(e,t,-a.z,a.x,n,r)}function lh(e,t){if(e.some(e=>e.surfaceWorld))return uh(t);let n=1/0,r=1/0,i=-1/0;for(let t of e)for(let e of t.segments)for(let t of e.line.points)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x);let a=Math.floor(n/4)-3,o=Math.floor(r/4)-3,s=Math.ceil((i-n)/4)+8,c=new Map,l=(e,t)=>(Math.floor(t/4)-o)*s+Math.floor(e/4)-a;for(let e of t)e._cars=e.carPoses.map(t=>({train:e,pose:t,cell:null,index:0}));return{update:e=>{for(let t of e._cars){let e=l(t.pose.x,t.pose.z);if(t.cell===e)continue;if(t.cell!==null){let e=c.get(t.cell),n=e.pop();n!==t&&(e[t.index]=n,n.index=t.index)}let n=c.get(e);n||(n=[],c.set(e,n)),t.cell=e,t.index=n.length,n.push(t)}},collides:(e,t)=>{for(let n of t){let t=l(n.x,n.z);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let a=c.get(t+r*s+i);if(a){for(let t of a)if(t.train!==e&&ch(n,t.pose))return!0}}}return!1}}}function uh(e){let t=new Map,n=e=>`${Math.floor(e.x/4)},${Math.floor(e.y/4)},${Math.floor(e.z/4)}`;for(let t of e)t._cars=t.carPoses.map(e=>({train:t,pose:e,cell:null,index:0}));return{update:e=>{for(let r of e._cars){let e=n(r.pose.physical);if(r.cell===e)continue;if(r.cell!==null){let e=t.get(r.cell),n=e.pop();n!==r&&(e[r.index]=n,n.index=r.index)}let i=t.get(e);i||(i=[],t.set(e,i)),r.cell=e,r.index=i.length,i.push(r)}},collides:(e,n)=>{for(let r of n){let n=r.physical,i=Math.floor(n.x/4),a=Math.floor(n.y/4),o=Math.floor(n.z/4);for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){let l=t.get(`${i+n},${a+s},${o+c}`);if(l){for(let t of l)if(t.train!==e&&ch(r,t.pose))return!0}}}return!1}}}function dh(e){if(!Ct(e))return e;let t=new Map(e.lines.map(t=>[t.id,Ac(e,t)]));return{...e,lines:e.lines.map(e=>{let n=t.get(e.id);return{...e,alignment:null,length:n.length,distances:e.distances.map(e=>Nc(n,e)),stops:e.stops?.map(e=>({...e,distance:Nc(n,e.distance)}))}}),junctions:e.junctions?.map(e=>({...e,lines:e.lines.map(e=>({...e,distance:Nc(t.get(e.lineId),e.distance)}))}))}}function fh(e,t,n,r,i){let a=0,o=e.length;for(;a<o;){let t=a+o>>1;e[t].start<=n?a=t+1:o=t}for(let n=a-1;n>=0&&e[n].maximumEnd>=t;n--){let a=e[n];a.end<t||a.block.queryStamp===r||(a.block.queryStamp=r,i.push(a.block))}}function ph(e,t){let n=new Map(e.map(e=>[e.id,[]]));for(let e of t)for(let t of e.zones)n.get(t.pathId).push({...t,block:e});for(let e of n.values()){e.sort((e,t)=>e.start-t.start);let t=-1/0;for(let n of e)t=Math.max(t,n.end),n.maximumEnd=t}let r=0;return(e,t,i)=>{i.length=0;let a=n.get(e.path.id);if(!a.length)return i;let o=++r,s=e.halfLength+.2,c=e.path.length;return fh(a,t-s,t+s,o,i),t<s&&fh(a,t-s+c,c,o,i),t+s>c&&fh(a,0,t+s-c,o,i),i}}function mh(e,t){let n=t.map(e=>Math.max(0,Math.floor(e.length/12))),r=n.reduce((e,t)=>e+t,0),i=t.map((e,t)=>Math.min(n[t],Math.max(1,Math.min(new Set(e.segments.flatMap(e=>[e.line.from,e.line.to])).size,Math.floor(e.length/18))))),a=e.traffic?.trainCount;if(a===void 0)return{counts:i,requested:i.reduce((e,t)=>e+t,0),capacity:r};if(!Number.isInteger(a)||a<0||a>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);if(!r)return{counts:n,requested:a,capacity:r};let o=Math.min(a,r),s=n.map(e=>Math.floor(o*e/r)),c=o-s.reduce((e,t)=>e+t,0),l=n.map((e,t)=>({index:t,fraction:o*e/r-s[t]})).sort((e,t)=>t.fraction-e.fraction||e.index-t.index);for(let{index:e}of l)c>0&&s[e]<n[e]&&(s[e]++,c--);return{counts:s,requested:a,capacity:r}}function hh(e){let t=$m(e);if(!t.length){let t=Im(dh(e)),n=new Map(e.lines.map(e=>[e.id,e]));for(let r of t.trains){let t=n.get(r.lineId);r.color=t.color,r.path=Qm([{line:t,direction:1}],0,!1,e),r.homeCityId=t.from,r.ownerId=Wm(e,r.id,t.from,t)}let r=rh(t.trains,e);for(let e of t.trains)oh(e,r);return{trains:t.trains,mode:`shuttles`,paths:[],poseBuffer:r,poseStride:6,stats:{requestedTrainCount:e.traffic?.trainCount??t.trains.length,trainCount:t.trains.length,capacity:t.capacity},get reservations(){return t.reservations},sampleTrain:(e,t=0,n)=>qm(e.path,e.distance+t,n),update(e){t.update(e);for(let e of t.trains)oh(e,r)}}}let n=[],r=mh(e,t);for(let[i,a]of t.entries()){let t=[...new Set(a.segments.flatMap(e=>[e.line.from,e.line.to]))],o=r.counts[i];a.trains=[];for(let r=0;r<o;r++){let i=`${a.id}-train-${r+1}`,s=t[r%t.length],c={id:i,path:a,homeCityId:s,ownerId:Wm(e,i,s),color:[`coral`,`teal`,`gold`,`blue`][r%4],distance:r/o*a.length,count:3,spacing:Lm,halfLength:Rm,direction:1,speed:2.6,active:!1,waiting:!1,_leader:null};n.push(c),a.trains.push(c)}}let i=rh(n,e);for(let e of n)oh(e,i);let a=eh(t),o=new Map(n.map(e=>[e.id,e])),s=ph(t,a),c=lh(t,n),l=[],u=[],d=[];function f(e,t,n=!1){if(e.owner===t.id)return!0;let r=e.waiters.values().next().value;return e.owner||r!==void 0&&r!==t.id?(n&&e.waiters.add(t.id),!1):!0}function p(e,t){e.owner=t.id,e.waiters.delete(t.id)}function m(e,t){if(s(e,t,l),l.some(t=>!f(t,e))||(ih(e,t,e._nextCarPoses),c.collides(e,e._nextCarPoses)))return!1;e.distance=t,oh(e,i);for(let t of l)p(t,e);return e.active=!0,c.update(e),ah(e,i),!0}function h(e,t=!1){if(!m(e,e.distance)&&t){d.length=0;for(let t of e.path.trains)t.active&&d.push(t);if(d.sort((e,t)=>e.distance-t.distance),d.length)for(let t=0;t<d.length;t++){let n=d[t],r=d[(t+1)%d.length],i=d.length===1?e.path.length:Hm(r.distance-n.distance,e.path.length);if(!(i<e.halfLength*2+n.halfLength+r.halfLength+1.8)&&m(e,Hm(n.distance+i/2,e.path.length)))return}else for(let t=1;t<12;t++)if(m(e,e.path.length*t/12))return}}for(let e of n)h(e);function g(e){for(let e of n)e._cachedDistance!==e.distance&&(oh(e,i),e.active&&c.update(e));for(let e of a)e.owner&&!th(o.get(e.owner),e)&&(e.owner=null);for(let t of n)t.active||(t._spawnRetry=(t._spawnRetry??0)-e,t._spawnRetry<=0&&(h(t,!0),t._spawnRetry=.5));for(let e of t){e.trains.sort((e,t)=>e.distance-t.distance);let t=null,n=null;for(let r of e.trains)r.active&&(n&&(n._leader=r),t??=r,n=r);n&&(n._leader=n===t?null:t)}for(let t of n){if(!t.active){t.waiting=!0;continue}t.waiting=!1;let n=t.speed*e;if(t._leader){let e=t._leader,r=Hm(e.distance-t.distance,t.path.length)-t.halfLength-e.halfLength-.8;n=Math.min(n,Math.max(0,r))}let r=Hm(t.distance+n,t.path.length);s(t,r,l),s(t,t.distance,u);let a=!1;for(let e of l)f(e,t,!0)||(a=!0);for(let e of u)f(e,t,!0)||(a=!0);if(a||=(ih(t,r,t._nextCarPoses),c.collides(t,t._nextCarPoses)),a)t.waiting=!0;else{for(let e of l)p(e,t);for(let e of u)p(e,t);t.distance=r;for(let e=0;e<t.count;e++)nh(t._nextCarPoses[e],t.carPoses[e]);qm(t.path,r,t.pose),t._cachedDistance=r,c.update(t),ah(t,i)}}}return{mode:`circuits`,trains:n,paths:t,poseBuffer:i,poseStride:6,stats:{requestedTrainCount:r.requested,trainCount:n.length,capacity:r.capacity},sampleTrain:(e,t=0,n)=>qm(e.path,e.distance+t,n),get reservations(){return a.map(e=>({id:e.id,trainId:e.owner,zones:e.zones}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(!e)return;let t=Math.ceil(e/Vm);for(let n=0;n<t;n++)g(e/t)}}}var gh={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`};function _h(e,t,n={}){let r=!!Ct(t),i=n.traffic??hh(t),a=new q;a.name=`instanced-trains`,e.add(a);let o=new Map((t.players??[]).map(e=>[e.id,Ll(e)]));a.userData.ownedMaterials=[...o.values()].flatMap(e=>Object.values(e));let s=i.trains.reduce((e,t)=>e+t.count,0),c=new Float32Array(s*6),l=new Map,u=new Map,f=0,p=!1,m=i.trains.map(e=>{let t=f;return f+=e.count,{state:e,parts:Array.from({length:e.count},(n,r)=>{let i=new Rt;return i.userData={trainId:e.id,poseOnly:!0,poseIndex:t+r},i}),poseOffset:t}}),h=()=>i.poseBuffer??c;function g(){let e=h();m.poseBuffer=e;for(let t of m){let n=t.state;for(let r=0;r<t.parts.length;r++){let a=t.parts[r],o=((i.poseBuffer?n.poseOffset:t.poseOffset)+r)*6;if(a.userData.poseIndex=o/6,!i.poseBuffer){let t=n.carPoses?.[r]??i.sampleTrain(n,(r-(n.count-1)/2)*n.spacing);e[o]=t.x,e[o+1]=t.y,e[o+2]=t.z,e[o+3]=t.angle,e[o+4]=+!!n.active,e[o+5]=0}a.position.set(e[o],e[o+1],e[o+2]),a.rotation.y=e[o+3]+(r===0?Math.PI:0),a.visible=e[o+4]>0}}}let _=new V,v=new V,y=new st,b=new Ce(new X,2.2),x=new X,S=new N,C=new X(1,1,1),w=new X(0,1,0),T=new d(.64,.74,1),E=new Float32Array(T.attributes.position.count*3);for(let e=0;e<E.length;e+=3)Gt.metal.color.toArray(E,e);T.setAttribute(`color`,new B(E,3));let D=Ut(new ie({color:16777215,vertexColors:!0,roughness:1,flatShading:!0}));D.name=`train-gangway`,a.userData.ownedMaterials.push(D);let k=null,A=0,j=new V,M=new V,P=new X,F=new X,I=new X,ee=new X,L=new X,R=new X,z=new X,te=new X,ne=new X,re={totalTrains:m.length,totalCars:s,visibleCars:0,visibleTrains:0,visibleConnectors:0,batches:0,templates:0,uploadedMatrices:0};function H(e,n){return r?Ke(t,e.position.x,e.position.y,e.position.z,e.rotation.y,n):(S.setFromAxisAngle(w,e.rotation.y),n.compose(e.position,S,C))}function ae(t,n){H(t,j),H(n,M),F.setFromMatrixPosition(j),I.setFromMatrixPosition(M),te.subVectors(I,F),ee.setFromMatrixColumn(j,2),L.setFromMatrixColumn(M,2);let r=ee.dot(te)>=0?1:-1,i=L.dot(te)>=0?-1:1;F.set(0,.88,r*.92).applyMatrix4(j),I.set(0,.88,i*.92).applyMatrix4(M),te.subVectors(I,F);let a=te.length();return a<.02||a>2?!1:(P.copy(F).add(I).multiplyScalar(.5),b.center.copy(P).applyMatrix4(e.matrixWorld),b.radius=.85,z.setFromMatrixColumn(j,1).add(ne.setFromMatrixColumn(M,1)).normalize(),te.multiplyScalar(1/a),R.crossVectors(z,te).normalize(),z.crossVectors(te,R).normalize(),_.makeBasis(R,z,te).scale(x.set(1,1,a)),_.setPosition(P),!0)}function oe(e,t){let n=`${e.state.ownerId??e.state.color}:${+!!t}`;if(!l.has(n)){let r=dm(Yp(um(new q,{palette:o.get(e.state.ownerId),color:gh[e.state.color]??`redLight`,cab:t})));a.userData.ownedMaterials.push(...r.userData.ownedMaterials),l.set(n,r.children.map(e=>({geometry:e.geometry,material:e.material})))}return{key:n,parts:l.get(n)}}function se(n,{mapBlend:i=0,prewarm:o=!1}={}){if(p||(a.visible=i<.999||o,re.visibleCars=0,re.visibleTrains=0,re.visibleConnectors=0,re.uploadedMatrices=0,!a.visible))return;n&&(n.updateMatrixWorld(),v.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),y.setFromProjectionMatrix(v)),e.updateWorldMatrix(!0,!1);let s=new Map,c=new Set;b.radius=2.2;for(let i of m)for(let a=0;a<i.parts.length;a++){let o=i.parts[a];if(!o.visible||(r?Be(t,o.position.x,o.position.y+.8,o.position.z,b.center):b.center.copy(o.position).addScaledVector(w,.8),b.center.applyMatrix4(e.matrixWorld),n&&!y.intersectsSphere(b)))continue;let l=a===0||a===i.parts.length-1,u=`${i.state.ownerId??i.state.color}:${+!!l}`;s.has(u)||s.set(u,{train:i,cab:l,cars:[]}),s.get(u).cars.push({train:i,part:o}),re.visibleCars++,c.add(i.state.id)}for(let[e,t]of u)s.has(e)||t.meshes.forEach(e=>{e.count=0});for(let[e,t]of s){let n=u.get(e);if(!n||n.capacity<t.cars.length){if(n)for(let e of n.meshes)a.remove(e),e.dispose();let r=oe(t.train,t.cab),i=2**Math.ceil(Math.log2(Math.max(16,t.cars.length)));n={capacity:i,meshes:r.parts.map(e=>{let n=new Tt(e.geometry,e.material,i);return n.count=0,n.instanceMatrix.setUsage(O),n.frustumCulled=!1,n.castShadow=!0,n.receiveShadow=!0,n.userData.instanceTrainIds=[],n.userData.ownerId=t.train.state.ownerId,a.add(n),n})},u.set(e,n)}for(let e=0;e<t.cars.length;e++){let{train:r,part:i}=t.cars[e];H(i,_);for(let t of n.meshes)t.setMatrixAt(e,_),t.userData.instanceTrainIds[e]=r.state.id}for(let e of n.meshes)e.count=t.cars.length,e.userData.instanceTrainIds.length=e.count,e.instanceMatrix.clearUpdateRanges(),e.instanceMatrix.addUpdateRange(0,e.count*16),e.instanceMatrix.needsUpdate=!0,e.boundingSphere=null,re.uploadedMatrices+=e.count}let d=re.visibleCars;if(d>A&&(k&&(a.remove(k),k.dispose()),A=2**Math.ceil(Math.log2(Math.max(16,d))),k=new Tt(T,D,A),k.name=`train-gangways`,k.count=0,k.frustumCulled=!1,k.instanceMatrix.setUsage(O),k.castShadow=!0,k.receiveShadow=!0,k.userData={isTrainConnector:!0,instanceTrainIds:[]},a.add(k)),k){for(let e of m)if(c.has(e.state.id))for(let t=1;t<e.parts.length;t++){let r=e.parts[t-1],i=e.parts[t];if(r.visible&&i.visible&&ae(r,i)&&(!n||y.intersectsSphere(b))){if(re.visibleConnectors>=A)break;k.setMatrixAt(re.visibleConnectors,_),k.userData.instanceTrainIds[re.visibleConnectors++]=e.state.id}}k.count=re.visibleConnectors,k.userData.instanceTrainIds.length=k.count,k.boundingSphere=null,k.instanceMatrix.clearUpdateRanges(),k.instanceMatrix.addUpdateRange(0,k.count*16),k.instanceMatrix.needsUpdate=!0,re.uploadedMatrices+=k.count}re.visibleTrains=c.size,re.batches=[...u.values()].reduce((e,t)=>e+t.meshes.length,0)+ +!!k,re.templates=l.size}function U(){if(!p){p=!0;for(let e of u.values())e.meshes.forEach(e=>e.dispose());for(let e of l.values())e.forEach(e=>e.geometry.dispose());k?.dispose(),T.dispose(),a.userData.ownedMaterials.forEach(e=>e.dispose()),a.clear(),a.removeFromParent()}}return g(),{root:a,trains:m,traffic:i,stats:re,get poseBuffer(){return h()},update(e){if(!p){let t=performance.now();i.update(e);let n=performance.now();g(),re.simulationMs=n-t,re.poseMs=performance.now()-n}},updateView:se,dispose:U}}Object.freeze([`meadow`,`scrub`,`dune`,`outcrop`,`frost`]);var vh=Yt(en(),1),yh=1e5,bh=.026;function xh(e,t,n){let r=[];for(let i of t){if(i.points.length<2||!(i.width>0))continue;let t=i.points.map(t=>{let r=je(e,n,t);return{X:Math.round(r.x*yh),Y:Math.round(r.z*yh)}}).filter((e,t,n)=>!t||e.X!==n[t-1].X||e.Y!==n[t-1].Y);if(t.length<2)continue;let a=new vh.default.ClipperOffset(2,.008*yh),o=[];a.AddPath(t,vh.default.JoinType.jtRound,vh.default.EndType.etOpenRound),a.Execute(o,i.width*.5*yh),r.push(...o)}if(!r.length)return[];let i=new vh.default.Clipper,a=new vh.default.PolyTree;return i.AddPaths(r,vh.default.PolyType.ptSubject,!0),i.Execute(vh.default.ClipType.ctUnion,a,vh.default.PolyFillType.pftNonZero,vh.default.PolyFillType.pftNonZero),vh.default.JS.PolyTreeToExPolygons(a).map(({outer:e,holes:t})=>({outer:e.map(e=>[e.X/yh,e.Y/yh]),holes:t.map(e=>e.map(e=>[e.X/yh,e.Y/yh]))}))}function Sh(e,t,{surfaceRoot:n=null}={}){let r=new Map((t.cities??[]).map(e=>[e.id,e])),i=new Map,a=!!Ct(t);for(let e of t.cityStreets??[]){if(e.points.length<2)continue;let n=r.get(e.cityId),a=Number.isFinite(n?.x)&&Number.isFinite(n?.z)?n:e.points[0],o=t.biomes&&ss(t,a.x,a.z)===`desert`?`gravel`:`sand`,s=`${e.cityId??`network`}:${o}`;i.has(s)||i.set(s,{anchor:a,material:o,streets:[]}),i.get(s).streets.push(e)}let o=[];for(let{anchor:r,material:s,streets:c}of i.values()){let i=xh(t,c,r).map(({outer:e,holes:t})=>{let n=new mt(e.map(([e,t])=>new dt(e,-t)));return n.holes=t.map(e=>new ve(e.map(([e,t])=>new dt(e,-t)))),n});if(!i.length)continue;let l=new k(i);if(l.rotateX(-Math.PI/2),a){let e=l;l=Ql(e,3),e.dispose()}let u=l.getAttribute(`position`),d={},f=new X;for(let e=0;e<u.count;e++)Ue(t,r.x,r.z,u.getX(e),u.getZ(e),d),n?(Be(t,d.x,bh,d.z,f),u.setXYZ(e,f.x,f.y,f.z)):u.setXYZ(e,d.x,bh,d.z);l.computeVertexNormals();let p=Hp(n??e,l,s);p.name=`joined-city-streets`,p.userData.surfaceSpace=!!n,o.push(p)}return o}function Ch(e,t,{requestChunk:n,size:r=192,maxChunks:i=48,maxVisibleChunks:a=1/0,maxPending:o=2,maxBytes:s=134217728,uploadMesh:c}={}){if(typeof n!=`function`)throw TypeError(`Regional rendering requires a worker requestChunk function`);let l=new q;l.name=`local-world-detail`,e.add(l);let u=new Map,d=new Map,f=new Map,p=new Map,h=new Map,_=new Map,v=new st,y=new st,b=new V,x=new X,S=new X,C=new m,w=new X,T=Ct(t),E=new L,D=new X,O={},k=T?new Ce(new X(0,-T.radius,0),T.radius):null,A=new m,j=new Ce,M=new X,N=0,P=!1,F=!1,I=[],ee=``,R=0,z=[],te=[],ne=[],re=[],ae=0,oe=!0,se=t.gameplay?gm(t,{onChange(){oe=!0,ae++,ee=``}}):null,U=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),ce=new Set([`water`,`surf`,`window`,`lamp`]),le=Math.max(35,...t.mountains.map(e=>e.height)),ue=[...t.cities,...t.mountains.filter(e=>!e.range),...t.stations],de=new Set(t.mountains),fe=new Map(ue.map(e=>[e,de.has(e)?e.radius??4:ct(t,e.x,e.z,e.radius??4)])),W={loadedChunks:0,visibleChunks:0,pendingChunks:0,requestedChunks:0,triangles:0,bytes:0,errors:0,requiredChunks:0,prefetchChunks:0,coverageLimited:!1,budgetOverflow:!1,maxBytes:s,uploadedMeshes:0,uploadingChunks:0,revealingChunks:0},pe=(e,t)=>{let n=JSON.stringify(e),r=t.materials.get(n);return r||(r=ao(new ie({name:e.name,color:new H().fromArray(e.color),roughness:e.roughness,metalness:e.metalness,side:e.side,flatShading:!0,vertexColors:e.vertexColors}),t.reveal),Ut(r,{kind:e.sceneStyle??`asset`}),t.materials.set(n,r)),r};function me(e){e.trees&&se.removeChunk(e.key),e.root.traverse(e=>{e.isMesh&&e.geometry.dispose()});for(let t of e.materials.values())t.dispose();e.depthMaterial?.dispose()}function he(e){me(e),l.remove(e.root),u.delete(e.key),W.bytes-=e.bytes,W.triangles-=e.triangles,oe=!0,ae++}function ge(e){for(let[t,n]of f)for(;n.next<n.packet.meshes.length;){let t=n.packet.meshes[n.next++],r=new Ze;r.setAttribute(`position`,new B(t.position,3)),t.index&&r.setIndex(new B(t.index,1)),t.normal?r.setAttribute(`normal`,new B(t.normal,3)):r.computeVertexNormals(),t.color&&r.setAttribute(`color`,new B(t.color,3));let i=n.packet.bounds,a=n.packet.renderBounds;a?(r.boundingBox=new m(new X().fromArray(a.min),new X().fromArray(a.max)),r.boundingSphere=r.boundingBox.getBoundingSphere(new Ce)):r.boundingSphere=new Ce(new X((i.minX+i.maxX)/2,le/2,(i.minZ+i.maxZ)/2),Math.hypot(i.maxX-i.minX,le+8,i.maxZ-i.minZ)/2),n.triangles+=(t.index?.length??t.position.length/3)/3;let o=new Y(r,pe(t.material,n));Rp(o,t.bvh);let s=new Set([t.position.buffer,t.normal?.buffer,t.color?.buffer,t.index?.buffer,...zp(t.bvh)].filter(Boolean));if(n.bytes+=[...s].reduce((e,t)=>e+t.byteLength,0),o.customDepthMaterial=n.depthMaterial,o.castShadow=!0,o.receiveShadow=!0,n.root.add(o),performance.now()>=e)return}}function _e(){for(let[e,t]of f){if(t.next<t.packet.meshes.length||c&&t.uploaded<t.next)continue;let n=t.packet.bounds,r=t.packet.renderBounds,i={key:e,root:t.root,bounds:r?new m(new X().fromArray(r.min),new X().fromArray(r.max)):new m(new X(n.minX,-4,n.minZ),new X(n.maxX,le,n.maxZ)),last:N,bytes:t.bytes,triangles:t.triangles,reveal:t.reveal,progress:0,materials:t.materials,depthMaterial:t.depthMaterial,lifePlacements:t.packet.lifePlacements??[],placements:t.packet.placements??[],cityStreets:t.packet.cityStreets??[],cellBounds:t.packet.cellBounds??t.packet.bounds};se&&t.packet.mutableTrees?.length&&(i.trees=se.addChunk(e,i.root,t.packet.mutableTrees,{reveal:t.reveal}),i.bounds.union(i.trees.bounds),i.bytes+=i.trees.bytes,i.triangles+=i.trees.triangles),l.add(t.root),u.set(e,i),f.delete(e),oe=!0,ae++,W.bytes+=i.bytes,W.triangles+=i.triangles,W.loadedChunks=u.size}}function ve(e){e.cancelled=!0,me(e)}function ye(){if(c)for(let[e,t]of f){if(t.warming||t.uploaded>=t.next)continue;t.warming=!0;let n=()=>{!P&&!t.cancelled&&(t.uploaded++,t.warming=!1,W.uploadedMeshes++)},r=n=>{P||t.cancelled||(ve(t),f.delete(e),_.set(e,n),W.errors++,l.userData.lastError=String(n?.message??n))};try{let e=c(t.root.children[t.uploaded]);e?.then?Promise.resolve(e).then(n,r):n()}catch(e){r(e)}return}}function be(e,t){W.requestedChunks++;let r=new AbortController,i={controller:r},a=Promise.resolve().then(()=>n(t,{signal:r.signal}));i.promise=a,d.set(e,i),W.pendingChunks=d.size+f.size,Promise.resolve(a).then(t=>{if(d.get(e)===i&&(d.delete(e),!P&&p.has(e))){let n=new q;n.name=`detail-${e}`;let r={value:0};f.set(e,{packet:t,root:n,next:0,uploaded:0,warming:!1,bytes:0,triangles:0,reveal:r,materials:new Map,depthMaterial:oo(r)})}},t=>{d.get(e)===i&&(d.delete(e),P||t?.name===`AbortError`||(_.set(e,t),W.errors++,l.userData.lastError=String(t?.message??t)))}).finally(()=>{W.pendingChunks=d.size+f.size})}let xe=t.outline.map(e=>e[0]),Se=t.outline.map(e=>e[1]),G={minX:Math.min(...xe),maxX:Math.max(...xe),minZ:Math.min(...Se),maxZ:Math.max(...Se)},we=T?.complete?G.maxX-G.minX:0,Te=T?.complete&&T.projection.type===`equirectangular`,Ee=Te&&Array.isArray(t.biomes?.land)?[...t.biomes.land,...t.biomes.oceanShore??[],...t.biomes.lakeShore??[]].map(e=>{let t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let[n,r]of e[0])t.minX=Math.min(t.minX,n),t.maxX=Math.max(t.maxX,n),t.minZ=Math.min(t.minZ,r),t.maxZ=Math.max(t.maxZ,r);return t}):null,De=Ee?[...ue.map(e=>{let t=fe.get(e);return{minX:e.x-t,maxX:e.x+t,minZ:e.z-t,maxZ:e.z+t}}),...(t.lines??[]).map(e=>{let n={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let t of e.points??[])n.minX=Math.min(n.minX,t.x),n.maxX=Math.max(n.maxX,t.x),n.minZ=Math.min(n.minZ,t.z),n.maxZ=Math.max(n.maxZ,t.z);if(Number.isFinite(n.minX)){let e=Math.max(ct(t,n.minX,n.minZ,4),ct(t,n.maxX,n.maxZ,4));n.minX-=e,n.maxX+=e,n.minZ-=e,n.maxZ+=e}return n})]:[],K=new Map;function Oe(e){if(!Ee)return!0;if(!K.has(e.key)){let t=e.x-r/2,n=e.x+r/2,i=e.z-r/2,a=e.z+r/2,o=(e,r=0)=>e.minX+r<=n&&e.maxX+r>=t&&e.minZ<=a&&e.maxZ>=i;K.set(e.key,Ee.some(e=>o(e))||De.some(e=>o(e)||we&&(o(e,-we)||o(e,we))))}return K.get(e.key)}function ke(e){if(!Te)return!0;let n=T.projection,i=Math.max(G.minX,e.x-r/2),a=Math.min(G.maxX,e.x+r/2),o=Math.max(G.minZ,e.z-r/2),s=Math.min(G.maxZ,e.z+r/2),c=n.centralLatitude*Math.PI/180-(o+s)/(2*n.radius),l=(s-o)/(2*n.radius),u=Math.cos(Math.max(0,Math.abs(c)-l));return Be(t,(i+a)/2,(le-4)/2,(o+s)/2,j.center),j.radius=(T.radius+le)*Math.hypot((a-i)/(2*n.radius)*u,l)+(le+4)/2,y.intersectsSphere(j)}let Ae=e=>we?((e+we/2)%we+we)%we-we/2:e;function J(e,t){if(we&&t-e>=we)return[[G.minX,G.maxX]];if(!we)return[[Math.max(G.minX,e),Math.min(G.maxX,t)]];let n=((e-G.minX)%we+we)%we+G.minX,r=n+t-e;return r<=G.maxX?[[n,r]]:[[n,G.maxX],[G.minX,r-we]]}function je(e,t,n){return E.origin.set(t,n,-1).unproject(e),e.isPerspectiveCamera?E.direction.set(t,n,1).unproject(e).sub(E.origin).normalize():E.direction.copy(x),E}function Me(e,n){e.updateMatrixWorld(),e.getWorldDirection(x),b.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),y.setFromProjectionMatrix(b);let r=1/0,i=-1/0,a=1/0,o=-1/0;if(T){let s=!1;A.makeEmpty();for(let c of[-4,le])for(let l of[-1,0,1])for(let u of[-1,0,1])je(e,l,u),k.radius=T.radius+c,E.intersectSphere(k,D)?(A.expandByPoint(D),vt(t,D,O),we&&n&&(O.x=n.x+Ae(O.x-n.x)),r=Math.min(r,O.x),i=Math.max(i,O.x),a=Math.min(a,O.z),o=Math.max(o,O.z)):s=!0;if(s)r=G.minX,i=G.maxX,a=G.minZ,o=G.maxZ;else if(Te){let n=T.projection,s=A.getSize(S),c=Math.max(4,s.lengthSq()/(8*T.radius))*n.radius/T.radius;a=Math.max(G.minZ,a-c),o=Math.min(G.maxZ,o+c);let l=!1;for(let n of[G.minZ,G.maxZ])Be(t,0,0,n,M),S.subVectors(M,k.center).dot(x)>=0||(M.project(e),Math.abs(M.x)<=1&&Math.abs(M.y)<=1&&M.z>=-1&&M.z<=1&&(l=!0,a=Math.min(a,n),o=Math.max(o,n)));if(l)r=G.minX,i=G.maxX;else{let e=Math.max(Math.abs(n.centralLatitude*Math.PI/180-a/n.radius),Math.abs(n.centralLatitude*Math.PI/180-o/n.radius)),t=c/Math.max(.01,Math.cos(e));r-=t,i+=t}}else{let e=Math.max(4,((i-r)**2+(o-a)**2)/(8*T.radius));r-=e,i+=e,a-=e,o+=e}}else for(let t of[-1,1])for(let n of[-1,1]){je(e,t,n);let s=Math.abs(E.direction.y)>1e-5?-E.origin.y/E.direction.y:-1;E.at(s>=0?s:e.far,S),r=Math.min(r,S.x),i=Math.max(i,S.x),a=Math.min(a,S.z),o=Math.max(o,S.z)}return{minX:r,maxX:i,minZ:a,maxZ:o}}function Ne(t,{dt:n=0,reveal:r=!0,reducedMotion:i=!1}={}){if(P)return;e.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),b.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),v.setFromProjectionMatrix(b),W.visibleChunks=W.revealingChunks=0;let a=[];for(let t of u.values())C.copy(t.bounds).applyMatrix4(e.matrixWorld),t.root.visible=v.intersectsBox(C),t.root.visible&&(W.visibleChunks++,r&&(t.progress=i?1:Math.min(1,t.progress+Math.max(0,n)/.38),t.reveal.value=t.progress*t.progress*(3-2*t.progress)),t.progress<1?W.revealingChunks++:a.push(t));let o=`${se?.revision??0}:`+a.map(e=>e.key).join(`|`);o!==ee&&(ee=o,I=a.flatMap(e=>e.lifePlacements).filter(e=>e.kind!==`tree`||!se?.removed.has(e.id)),R++)}function Pe(e,{mapBlend:n=0,target:m,budgetMs:v=5,prewarm:x=!1,coverageCamera:S=e,coverageCameras:C,retainVisible:E=!1,groundFocus:D,groundRadius:O=45,groundOnly:k=!1}={}){if(P||(N++,l.visible=n<.999,!l.visible&&!x&&!D))return;let A=[];k&&D?w.set(D.x,D.y??0,D.z):m&&w.copy(m);let j=(e,n)=>({key:`${e}:${n}`,x:e+r/2,z:n+r/2,size:r,distance:T?et(t,w,{x:e+r/2,z:g.clamp(n+r/2,G.minZ,G.maxZ)})**2:Ae(e+r/2-w.x)**2+(n+r/2-w.z)**2});h.clear(),p.clear();let M=[];if((l.visible||x)&&(!k||!D))for(let e of C?.length?C:[S])M.push({bounds:Me(e,m),coverage:e});if(D){let e=ct(t,D.x,D.z,Math.max(.001,O));M.push({bounds:{minX:D.x-e,maxX:D.x+e,minZ:D.z-e,maxZ:D.z+e}})}for(let{bounds:e,coverage:t}of M){let{minX:n,maxX:i,minZ:a,maxZ:o}=e;t&&(b.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),y.setFromProjectionMatrix(b)),!m&&!A.length&&w.set((n+i)/2,0,(a+o)/2),A.push(e);for(let[e,s]of J(n,i))for(let n=Math.floor(e/r)*r;n<s;n+=r)for(let e=Math.floor(Math.max(G.minZ,a)/r)*r;e<Math.min(G.maxZ,o);e+=r){let r=j(n,e);Oe(r)&&(!t||ke(r))&&h.set(r.key,r)}for(let e of ue){let t=fe.get(e),s=we?w.x+Ae(e.x-w.x):e.x;if(s+t<n||s-t>i||e.z+t<a||e.z-t>o)continue;let c=j(Math.floor(e.x/r)*r,Math.floor(e.z/r)*r);h.set(c.key,c)}}let I=[...h.values()].sort((e,t)=>e.distance-t.distance);F=!0,W.requiredChunks=h.size,W.coverageLimited=h.size>a;for(let e of I.slice(0,a))p.set(e.key,e);if(!W.coverageLimited){let e=new Map;for(let{minX:t,maxX:n,minZ:i,maxZ:a}of A)for(let[o,s]of J(t-r,n+r))for(let t=Math.floor(o/r)*r;t<s;t+=r)for(let n=Math.floor(Math.max(G.minZ,i-r)/r)*r;n<Math.min(G.maxZ,a+r);n+=r){let r=j(t,n);!p.has(r.key)&&Oe(r)&&e.set(r.key,r)}for(let t of[...e.values()].sort((e,t)=>e.distance-t.distance)){if(p.size>=Math.min(i,h.size+36))break;p.set(t.key,t)}}W.prefetchChunks=p.size-Math.min(h.size,a);for(let[e,t]of d)p.has(e)||(d.delete(e),t.controller.abort());for(let[e,t]of f)p.has(e)||(ve(t),f.delete(e));let ee=performance.now();ge(ee+v),ye(),_e(),Ne(e);for(let e of u.values())(p.has(e.key)||E&&e.root.visible)&&(e.last=N);for(let[e,t]of p){if(d.size+f.size>=o||performance.now()-ee>=v)break;let n=u.size?W.bytes/u.size:4194304;!h.has(e)&&W.bytes+n*(1+d.size+f.size)>s*.9||u.has(e)||d.has(e)||f.has(e)||_.has(e)||be(e,t)}if(u.size>i||W.bytes>s){let e=[...u.values()].filter(e=>!h.has(e.key)&&!(E&&e.root.visible)).sort((e,t)=>Number(p.has(e.key))-Number(p.has(t.key))||e.last-t.last);for(let t of e){if(u.size<=i&&W.bytes<=s)break;he(t)}}W.budgetOverflow=W.bytes>s,W.loadedChunks=u.size,W.pendingChunks=d.size+f.size,W.uploadingChunks=c?[...f.values()].filter(e=>e.uploaded<e.next).length:0}function Fe(){if(!P){P=!0;for(let e of[...u.values()])he(e);for(let e of f.values())ve(e);for(let e of d.values())e.controller.abort();se?.dispose(),l.removeFromParent(),p.clear(),h.clear(),d.clear(),f.clear(),W.loadedChunks=W.pendingChunks=0,I=[],ee=``,R++,z=[],te=[],ne=[],re=[],oe=!1,ae++}}function Ie(){if(oe){z=[],ne=[],re=[];for(let e of u.values())z.push(...e.placements.filter(e=>e.kind!==`tree`||!se?.removed.has(e.id))),ne.push(...e.cityStreets),re.push(...e.root.children.filter(e=>e.isMesh&&!ce.has(e.material.userData.sceneStyle)),...e.trees?.meshes??[]);te=z.filter(e=>U.has(e.kind)),oe=!1}}function Le(e,n=0){if(P||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let i=Math.max(.001,ct(t,e.x,e.z,Math.max(0,n)));if(e.z-i<G.minZ||e.z+i>G.maxZ||!we&&(e.x-i<G.minX||e.x+i>G.maxX))return!1;for(let[t,n]of J(e.x-i,e.x+i))for(let a=Math.floor(t/r)*r;a<n;a+=r)for(let t=Math.floor((e.z-i)/r)*r;t<e.z+i;t+=r){let e=`${a}:${t}`;if(Oe({key:e,x:a+r/2,z:t+r/2})&&!u.has(e))return!1}return!0}function Re(){return!P&&F&&!W.coverageLimited&&(h.size>0||Ee!==null)&&[...h.keys()].every(e=>u.has(e))}return{root:l,update:Pe,updateVisibility:Ne,stats:W,dispose:Fe,hasCoverageAt:Le,fellTree:(e,t)=>se?.fellTree(e,t)??!1,removeTree:e=>se?.removeTree(e)??!1,updateTrees:e=>se?.update(e),get removedTreeIds(){return se?.removed},get treeRevision(){return se?.revision??0},get placements(){return Ie(),z},get placementRevision(){return ae},get cityStreets(){return Ie(),ne},getSceneryPlacements(){return Ie(),z},getCollisionPlacements(){return Ie(),te},getTerrainMeshes(){return Ie(),re},get lifePlacements(){return I},get lifeRevision(){return R},get ready(){return Re()},get settled(){return Re()&&[...h.keys()].every(e=>{let t=u.get(e);return!t.root.visible||t.progress>=1})}}}var wh=Object.freeze({terrain:-1.35,contour0:-.18,contour1:-.16,snow:-.14,sand:-1.24,waterLight:-1.27,ocean:-1.27,"route-paper":.025,"route-ink":.035});function Th(e,t,n,r){let i=!!t.getAttribute(`color`),a=new ie({name:e.name.replace(/^map-/,`detail-base-`),color:i?16777215:e.color,vertexColors:i,roughness:1,metalness:0,side:2,flatShading:!1,depthWrite:!0,depthTest:!0});return a.onBeforeCompile=e=>{e.uniforms.detailBaseHeight={value:n},e.uniforms.detailBaseRadius={value:r},e.vertexShader=`uniform float detailBaseHeight; uniform float detailBaseRadius;
`+e.vertexShader;let t=r>0?`normalize(position + vec3(0.0, detailBaseRadius, 0.0))`:`vec3(0.0, 1.0, 0.0)`;e.vertexShader=e.vertexShader.replace(`#include <beginnormal_vertex>`,`
      vec3 detailBaseNormal = ${t};
      vec3 objectNormal = detailBaseNormal;
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif
    `),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,r>0?`vec3 transformed = detailBaseNormal * (detailBaseRadius + detailBaseHeight) - vec3(0.0, detailBaseRadius, 0.0);`:`vec3 transformed = vec3(position.x, detailBaseHeight, position.z);`)},a.customProgramCacheKey=()=>`detail-base-${r>0?`sphere`:`plane`}-v1`,Ut(a,{kind:/water|ocean/.test(e.name)?`water`:`terrain`})}function Eh(e,t,n){let r=new q;r.name=`detail-base`,e.add(r);let i=new Set,a=n.surface?.type===`sphere`?n.surface.radius:0,o=!1;return t?.traverse(e=>{if(!e.isMesh||!e.geometry?.getAttribute(`position`)||Array.isArray(e.material))return;let t=e.material.name.replace(/^map-/,``);if(!Object.hasOwn(wh,t))return;let n=Th(e.material,e.geometry,wh[t],a);i.add(n);let o=new Y(e.geometry,n);o.name=`detail-base-${t}`,o.castShadow=!1,o.receiveShadow=!0,o.frustumCulled=!1,r.add(o)}),{root:r,dispose(){o||(o=!0,i.forEach(e=>e.dispose()),i.clear(),r.clear(),r.removeFromParent())}}}function Dh({cities:e=256,trains:t=2048,seed:n=`continental-256`}={}){let r=Number(e),i=Number(t);if(!Number.isFinite(r)||r<8||r>4096||!Number.isInteger(r)||r%8!=0)throw TypeError(`Stress cities must be a multiple of 8 from 8 through4096`);if(!Number.isInteger(i)||i<0||i>32768)throw TypeError(`Stress trains must be an integer from 0 through32768`);let a=r/8,o=Math.ceil(Math.sqrt(a*2)),s=Math.ceil(a/o),c=o*500+300,l=s*500+300,u=c/2,d=l/2,f=s%2?250:0,p={seed:n,bounds:{width:c,depth:l},outline:[[-u,-d+100],[-u+100,-d],[u-100,-d],[u,-d+100],[u,d-100],[u-100,d],[-u+100,d],[-u,d-100]],density:1,minTurnRadius:9,cities:[],connections:[],mountains:[],river:{width:10,points:[[-u-100,f],[u+100,f]]},traffic:{trainCount:i,circuits:[]}},m=[`coral`,`teal`,`gold`,`blue`];for(let e=0;e<a;e++){let t=(e%o-(o-1)/2)*500,n=(Math.floor(e/o)-(s-1)/2)*500,r=[];for(let i=0;i<8;i++){let a=i*Math.PI/4,o=`region-${e+1}-city-${i+1}`;p.cities.push({id:o,x:t+Math.cos(a)*190,z:n+Math.sin(a)*190,level:1+(e*3+i*7)%10,ownerId:m[(e+i)%4]});let s=`regional-${e+1}-${i+1}`;p.connections.push({id:s,from:o,to:`region-${e+1}-city-${(i+1)%8+1}`}),r.push({lineId:s,direction:1})}p.traffic.circuits.push({id:`circuit-${e+1}`,segments:r}),e%o>0&&p.connections.push({id:`connector-west-${e+1}`,from:`region-${e}-city-1`,to:`region-${e+1}-city-5`}),e%o===0&&e>=o&&p.connections.push({id:`connector-north-${e+1}`,from:`region-${e-o+1}-city-3`,to:`region-${e+1}-city-7`})}for(let e=0;e<a;e+=8){let t=p.cities[e*8+5],n=p.cities[e*8+6],r=(t.x+n.x)/2,i=(t.z+n.z)/2;Math.abs(i-f)>30&&p.mountains.push({id:`regional-pass-${e+1}`,x:r,z:i,radius:23,height:24})}return p}var Oh=`modulepreload`,kh=function(e,t){return new URL(e,t).href},Ah={},jh=function(e){return e.pathname.endsWith(`.css`)},Mh=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Nh=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=kh(t,n);let r=s(t),i=jh(r);return Mh(Ah,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Oh,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function Ph(e){return e.get(`layout`)??(e.has(`cities`)?`classic`:`settlement`)}async function Fh(e,t){let n=Ph(e),r={...e.has(`seed`)?{seed:e.get(`seed`)}:{},...e.has(`trains`)?{trainCount:Number(e.get(`trains`))}:{}};if(n===`settlement`){let{createSettlementWorld:e}=await Nh(async()=>{let{createSettlementWorld:e}=await import(`./settlement-world-CF3D5D1E.js`);return{createSettlementWorld:e}},__vite__mapDeps([0,1,2]),import.meta.url);return e(r)}if(n===`island`){let{createIslandWorld:e}=await Nh(async()=>{let{createIslandWorld:e}=await import(`./island-world-C45IKnLH.js`);return{createIslandWorld:e}},__vite__mapDeps([3,1,2]),import.meta.url);return e(r)}if(n===`earth`){let{createEarthWorld:e}=await Nh(async()=>{let{createEarthWorld:e}=await import(`./earth-world-DeiZlJb0.js`);return{createEarthWorld:e}},__vite__mapDeps([4,2,5,6,7]),import.meta.url);return e(r)}if(n===`europe`){let{createEuropeWorld:e}=await Nh(async()=>{let{createEuropeWorld:e}=await import(`./europe-world-BdLdVzgu.js`);return{createEuropeWorld:e}},__vite__mapDeps([8,5,2,7]),import.meta.url);return e(r)}if(n===`stress`)return Dh({cities:e.has(`cities`)?Number(e.get(`cities`)):256,trains:e.has(`trains`)?Number(e.get(`trains`)):2048,seed:e.get(`seed`)??`continental-railway`});if([`crossroads`,`showcase`].includes(n)){let r=await fetch(new URL(`./worlds/${n}.json`,t));if(!r.ok)throw Error(`Could not load the authored world`);let i=await r.json();return e.has(`seed`)&&(i.seed=e.get(`seed`)),i}return{seed:e.get(`seed`)??27,cityCount:Number(e.get(`cities`))||8}}function Ih({WorkerClass:e,MessageChannelClass:t=globalThis.MessageChannel,detailWorkers:n=e?1:globalThis.navigator?.hardwareConcurrency>=4?2:1}={}){let r=()=>e?new e(new URL(`data:text/javascript;base64,aW1wb3J0IHsgZ2VuZXJhdGVXb3JsZCxnZW5lcmF0ZVdvcmxkUmVnaW9uLHZhbGlkYXRlV29ybGQgfSBmcm9tICcuL3dvcmxkLW1vZGVsLmpzJzsKaW1wb3J0IHsgY29tcGlsZURldGFpbFBhY2tldCB9IGZyb20gJy4vZGV0YWlsLWNvbXBpbGVyLmpzJzsKaW1wb3J0IHsgY3JlYXRlTW91bnRhaW5Db250b3VycyB9IGZyb20gJy4vbW91bnRhaW4tY29udG91cnMuanMnOwppbXBvcnQgeyBwcmVwYXJlTWFwVGVycmFpbiB9IGZyb20gJy4vbWFwLXRlcnJhaW4uanMnOwppbXBvcnQgeyBjb21waWxlTWFwVGVycmFpbkdlb21ldHJ5IH0gZnJvbSAnLi9tYXAtdGVycmFpbi1nZW9tZXRyeS5qcyc7CgpsZXQgd29ybGQ7CmZ1bmN0aW9uIGJ1ZmZlcnNPZih2YWx1ZSxyZXN1bHQ9bmV3IFNldCgpKXsKICBpZihBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKXJlc3VsdC5hZGQodmFsdWUuYnVmZmVyKTsKICBlbHNlIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpcmVzdWx0LmFkZCh2YWx1ZSk7CiAgZWxzZSBpZih2YWx1ZSYmdHlwZW9mIHZhbHVlPT09J29iamVjdCcpZm9yKGNvbnN0IGNoaWxkIG9mIE9iamVjdC52YWx1ZXModmFsdWUpKWJ1ZmZlcnNPZihjaGlsZCxyZXN1bHQpOwogIHJldHVybiByZXN1bHQ7Cn0Kc2VsZi5vbm1lc3NhZ2U9KHtkYXRhOntpZCx0eXBlLHBheWxvYWQscG9ydH19KT0+ewogIGlmKHR5cGU9PT0nc2hhcmUtd29ybGQnKXsKICAgIHRyeXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgc2hhcmluZyBkZXRhaWwnKTsKICAgICAgY29uc3Qge21hcFRlcnJhaW4sLi4ubmV0d29ya309d29ybGQ7CiAgICAgIHBvcnQucG9zdE1lc3NhZ2Uoe3dvcmxkOm5ldHdvcmt9KTsKICAgIH1jYXRjaChlcnJvcil7cG9ydC5wb3N0TWVzc2FnZSh7ZXJyb3I6e25hbWU6ZXJyb3IubmFtZSxtZXNzYWdlOmVycm9yLm1lc3NhZ2V9fSk7fQogICAgZmluYWxseXtwb3J0LmNsb3NlKCk7fQogICAgcmV0dXJuOwogIH0KICBpZih0eXBlPT09J2F0dGFjaC1wb3J0Jyl7CiAgICBwb3J0Lm9ubWVzc2FnZT0oe2RhdGF9KT0+ewogICAgICBpZihkYXRhLmVycm9yKXNlbGYucG9zdE1lc3NhZ2Uoe2lkLGVycm9yOmRhdGEuZXJyb3J9KTsKICAgICAgZWxzZXt3b3JsZD1kYXRhLndvcmxkO3NlbGYucG9zdE1lc3NhZ2Uoe2lkLHJlc3VsdDp7cmVhZHk6dHJ1ZX19KTt9CiAgICAgIHBvcnQuY2xvc2UoKTsKICAgIH07CiAgICByZXR1cm47CiAgfQogIHRyeXsKICAgIGNvbnN0IHN0YXJ0PXBlcmZvcm1hbmNlLm5vdygpO2xldCByZXN1bHQ7CiAgICBpZih0eXBlPT09J2dlbmVyYXRlJyl7CiAgICAgIHdvcmxkPWdlbmVyYXRlV29ybGQocGF5bG9hZCx7ZGV0YWlsOiduZXR3b3JrJ30pOwogICAgICBmb3IoY29uc3QgbW91bnRhaW4gb2Ygd29ybGQubW91bnRhaW5zKWlmKG1vdW50YWluLnJhbmdlKW1vdW50YWluLm1hcENvbnRvdXJzPWNyZWF0ZU1vdW50YWluQ29udG91cnMobW91bnRhaW4pOwogICAgICB3b3JsZC5tYXBUZXJyYWluPXttZXNoZXM6Y29tcGlsZU1hcFRlcnJhaW5HZW9tZXRyeShwcmVwYXJlTWFwVGVycmFpbih3b3JsZCksd29ybGQpfTsKICAgICAgY29uc3QgdmlvbGF0aW9ucz12YWxpZGF0ZVdvcmxkKHdvcmxkKTsKICAgICAgaWYodmlvbGF0aW9ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHdvcmxkOiAke3Zpb2xhdGlvbnNbMF0uZGV0YWlsPz92aW9sYXRpb25zWzBdLnR5cGV9YCk7CiAgICAgIHJlc3VsdD17d29ybGQsbWlsbGlzZWNvbmRzOnBlcmZvcm1hbmNlLm5vdygpLXN0YXJ0fTsKICAgIH1lbHNlIGlmKHR5cGU9PT0nY2h1bmsnKXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgcmVxdWVzdGluZyBkZXRhaWwnKTsKICAgICAgY29uc3QgcmVnaW9uPWdlbmVyYXRlV29ybGRSZWdpb24od29ybGQscGF5bG9hZCk7CiAgICAgIHJlc3VsdD1jb21waWxlRGV0YWlsUGFja2V0KHJlZ2lvbix3b3JsZCk7CiAgICAgIHJlc3VsdC5taWxsaXNlY29uZHM9cGVyZm9ybWFuY2Uubm93KCktc3RhcnQ7CiAgICB9ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gd29ybGQgcmVxdWVzdDogJHt0eXBlfWApOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7aWQscmVzdWx0fSx0eXBlPT09J2NodW5rJz9bLi4uYnVmZmVyc09mKHJlc3VsdCldCiAgICAgIDp0eXBlPT09J2dlbmVyYXRlJz9bLi4uYnVmZmVyc09mKHdvcmxkLm1hcFRlcnJhaW4pXTpbXSk7CiAgfWNhdGNoKGVycm9yKXtzZWxmLnBvc3RNZXNzYWdlKHtpZCxlcnJvcjp7bmFtZTplcnJvci5uYW1lLG1lc3NhZ2U6ZXJyb3IubWVzc2FnZX19KTt9Cn07Cg==`,``+import.meta.url),{type:`module`}):new Worker(new URL(new URL(`world-worker-BQP9Q4Vd.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=new Map,a=[],o=[],s=0,c=!1,l,u=!1,d=!1,f={workers:1,busy:0,queued:0,completedChunks:0,lastChunkMs:0},p=()=>new DOMException(`World request cancelled`,`AbortError`),m=()=>{f.workers=c?0:o.filter(e=>e.ready&&!e.failed).length,f.busy=o.filter(e=>e.currentId!==null).length,f.queued=a.filter(e=>i.has(e.id)).length};function h(e,t,n){i.delete(e.id),e.signal?.removeEventListener(`abort`,e.abort),t?e.reject(t):e.resolve(n)}function g(e){for(let t of[...i.values()])h(t,e);a.length=0;for(let e of o)e.currentId=null;m()}function _(e,t){t.node=e,t.type===`chunk`&&u&&(e.currentId=t.id);try{e.worker.postMessage({id:t.id,type:t.type,payload:t.payload})}catch(n){e.currentId===t.id&&(e.currentId=null),h(t,n)}}function v(){if(!(c||l)){for(let e of o)if(e.ready&&!e.failed&&e.currentId===null)for(;a.length&&e.currentId===null;){let t=a.shift();i.has(t.id)&&_(e,t)}m()}}function y(e){let t={worker:r(),primary:e,ready:e,failed:!1,currentId:null};o.push(t),t.worker.onmessage=({data:e})=>{if(c||t.failed)return;if(e.id===`peer-ready`){e.error?(t.failed=!0,t.worker.terminate()):t.ready=!0,v();return}t.currentId===e.id&&(t.currentId=null);let n=i.get(e.id);if(n){if(e.error){let t=Error(e.error.message);t.name=e.error.name??`Error`,h(n,t)}else n.type===`generate`&&(u=!0,b()),n.type===`chunk`&&(f.completedChunks++,f.lastChunkMs=e.result?.milliseconds??0),h(n,null,e.result)}v()};let n=n=>{if(c||t.failed)return;let r=Error(n);if(e){l=r,g(r);return}t.failed=!0,t.ready=!1,t.worker.terminate();let o=i.get(t.currentId);t.currentId=null,o&&(o.node=null,a.unshift(o)),v()};return t.worker.onerror=e=>n(e.message||`World worker failed`),t.worker.onmessageerror=()=>n(`World worker returned an unreadable packet`),t}function b(){if(d||n<2||!t)return;d=!0;let e,r;try{e=y(!1),r=new t,e.worker.postMessage({id:`peer-ready`,type:`attach-port`,port:r.port2},[r.port2]),o[0].worker.postMessage({type:`share-world`,port:r.port1},[r.port1])}catch{r?.port1.close(),r?.port2.close(),e&&(e.failed=!0,e.worker.terminate())}m()}let x=y(!0);return{stats:f,request(e,t,{signal:n}={}){return c?Promise.reject(new DOMException(`World replaced`,`AbortError`)):l?Promise.reject(l):n?.aborted?Promise.reject(p()):new Promise((r,o)=>{let c={id:++s,type:e,payload:t,resolve:r,reject:o,signal:n};c.abort=()=>{if(i.has(c.id)){let e=a.indexOf(c);e>=0&&a.splice(e,1),h(c,p()),v()}},n?.addEventListener(`abort`,c.abort,{once:!0}),i.set(c.id,c),e===`chunk`&&u?(a.push(c),v()):_(x,c)})},dispose(){if(!c){c=!0;for(let e of o)e.worker.terminate();g(new DOMException(`World replaced`,`AbortError`))}}}}function Lh(e){let t=new De(1,1,{depthBuffer:!1}),n=new x,r=new Je,i=new Ze,o=new a({colorWrite:!1,depthWrite:!1,depthTest:!1,toneMapped:!1}),s=new Y(i,o);s.frustumCulled=!1,n.add(s);let c=new WeakMap,l=!1;function u(e){if(c.has(e))return c.get(e);let t=new Tt(i,o,1);t.frustumCulled=!1;let n={mesh:t,idleMatrix:t.instanceMatrix,matrix:null,color:null},r=()=>{e.removeEventListener(`dispose`,r),c.delete(e),t.instanceMatrix=n.matrix??n.idleMatrix,t.instanceColor=n.color,t.dispose(),t.instanceMatrix=n.idleMatrix,t.instanceColor=null,n.matrix=null,n.color=null};return e.addEventListener(`dispose`,r),c.set(e,n),n}return{upload(a){if(l)return;let o=a.geometry,{start:c,count:d}=o.drawRange,f=e.getRenderTarget(),p=e.shadowMap.enabled,m=e.getActiveCubeFace?.()??0,h=e.getActiveMipmapLevel?.()??0,g=a.isInstancedMesh?u(a):null,_=g?.mesh??s;try{g&&(g.matrix=a.instanceMatrix,g.color=a.instanceColor,_.instanceMatrix=g.matrix,_.instanceColor=g.color,n.remove(s),n.add(_)),_.geometry=o,o.setDrawRange(0,3),e.shadowMap.enabled=!1,e.setRenderTarget(t),e.render(n,r)}finally{o.setDrawRange(c,d),_.geometry=i,g&&(_.instanceMatrix=g.idleMatrix,_.instanceColor=null,n.remove(_),n.add(s));try{e.setRenderTarget(f,m,h)}finally{e.shadowMap.enabled=p}}},dispose(){l||(l=!0,t.dispose(),i.dispose(),o.dispose())}}}var Rh=Object.freeze({sheep:48,flocks:6,butterflies:16,fireflies:48,radius:150,fireflyRadius:72}),zh=new Set([`tree`,`house`,`apartment`,`civic`,`tower`,`plaza`]),Bh=new Set([`tree`,`farmPatch`,`plaza`]),Vh=Math.PI*2,Hh=24,Uh=18,Wh=[0,Math.PI,Math.PI,0];function Gh(e){let t=String(e.id??`${e.kind}:${e.x.toFixed(3)}:${e.z.toFixed(3)}`),n=2166136261;for(let e=0;e<t.length;e++)n=Math.imul(n^t.charCodeAt(e),16777619);return(n>>>0)/4294967296}var Kh=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)};function qh(e){let t=Gh(e),n=e.kind===`tree`;return{seed:t,count:Kh(t,17)>(n?.3:.62)?1+Math.floor(Kh(t,29)*(n?5:3)):0}}function Jh(e,t){return Array.from({length:t},(t,n)=>{let r=Kh(e,103+n)*Vh,i=.4+Kh(e,131+n)*1.8;return{phase:Kh(e,41+n)*Vh,pace:.23+Kh(e,71+n)*.32,x:Math.cos(r)*i,z:Math.sin(r)*i,drift:.12+Kh(e,157+n)*.24,height:.3+Kh(e,181+n)*1.65,frequency:.65+Kh(e,211+n)*.8,size:.13+Kh(e,239+n)*.13}})}function Yh(e,t,n,r){if(e.length===r&&n>=e.at(-1).distance)return;let i={item:t,distance:n,phase:Gh(t)*Vh},a=e.length;for(;a>0&&e[a-1].distance>n;)a--;e.splice(a,0,i),e.length>r&&e.pop()}function Xh(e,t,n,r){let i=e.scale??1,a=Math.max(0,Math.min(e.roamRadius??.12*i,(e.radius??.7*i)-.55*i)),o=n/(18+t/Vh*10)+t/Vh*4,s=Math.floor(o),c=o-s,l=(e,n)=>{let r=e=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},i=r(e+7)*Vh,o=Math.sqrt(r(e+47))*.9*a;return(n===0?Math.sin(i):Math.cos(i))*o},u=l(s,0),d=l(s,1),f=l(s+1,0),p=l(s+1,1),m=g.clamp((c-.32)/.68,0,1),h=m*m*(3-2*m),_=Math.atan2(f-u,p-d),v=Math.atan2(u-l(s-1,0),d-l(s-1,1)),y=g.smoothstep(c,0,.32),b=Math.atan2(Math.sin(_-v),Math.cos(_-v));return r.dx=u+(f-u)*h,r.dz=d+(p-d)*h,r.heading=v+b*y,r.walking=Math.sin(m*Math.PI)**2,r.distance=Math.hypot(f-u,p-d)*h,r}function Zh(e,t,n,r=Rh.radius){let i=[],a=[],o=[],s=!!Ct(e),c=s?Be(e,n.x,0,n.z):null,l=new X,u=s?2*e.surface.radius*Math.sin(Math.min(Math.PI,r/e.surface.radius)/2):r;for(let r of t??[]){if(r.kind!==`sheep`&&!zh.has(r.kind)&&!Bh.has(r.kind))continue;let t=s?Be(e,r.x,0,r.z,l).distanceToSquared(c):(r.x-n.x)**2+(r.z-n.z)**2;t>u**2||(r.kind===`sheep`&&Yh(i,r,t,Rh.sheep),zh.has(r.kind)&&Yh(a,r,t,Rh.flocks*8),Bh.has(r.kind)&&Yh(o,r,t,Rh.fireflies/3))}let d=[];for(let t of a)if(d.every(n=>et(e,t.item,n.item)>12)&&d.push(t),d.length===Rh.flocks)break;return{sheep:i,flocks:d,insects:o}}function Qh(){let t=new Ze;return t.setAttribute(`position`,new e([0,0,0,.48,.015,.12,.25,0,.22],3)),t.setIndex([0,1,2]),t.computeVertexNormals(),t}function $h(e,t){let n=new q;n.name=`local-life`,e.add(n);let r=[],i=[],a=!!Ct(t);function o(e,t,i,a,o=!0){let s=new Tt(t,i,a);return s.name=e,s.count=0,s.instanceMatrix.setUsage(O),s.frustumCulled=!1,s.castShadow=o,s.receiveShadow=o,n.add(s),r.push(s),s}let s=o(`grazing-sheep-wool`,new Me(1,1),Gt.white,Rh.sheep),c=o(`grazing-sheep-heads`,tm(),Gt.roofBlue,Rh.sheep),l=o(`grazing-sheep-feet`,new d(1,1,1),Gt.metal,Rh.sheep*4),u=Ut(Gt.roofBlue.clone());i.push(u);let f=o(`local-swallow-bodies`,new Me(1,0).scale(.07,.065,.21),u,Rh.flocks*3,!1),p=Ut(Gt.roofBlue.clone());p.side=2,i.push(p);let m=o(`local-swallow-wings`,Qh(),p,Rh.flocks*6,!1);for(let e of[f,m]){let t=new nt(new Float32Array(e.instanceMatrix.count),1);t.setUsage(O),e.geometry.setAttribute(`lifeVisibility`,t);let n=e.material,r=n.onBeforeCompile,i=n.customProgramCacheKey();n.transparent=!0,n.depthWrite=!1,n.forceSinglePass=!0,n.onBeforeCompile=(e,t)=>{r(e,t),e.vertexShader=`attribute float lifeVisibility; varying float faunaVisibility;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
faunaVisibility=lifeVisibility;`),e.fragmentShader=`varying float faunaVisibility;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`diffuseColor.a*=faunaVisibility;
#include <opaque_fragment>`)},n.customProgramCacheKey=()=>`${i}|fauna-fade-v1`}let h=Ut(Gt.white.clone());h.side=2,i.push(h);let _=o(`meadow-butterflies`,new xe(.19,.25).rotateX(-Math.PI/2).translate(.09,0,0),h,Rh.butterflies*2,!1),v=new M({transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,uniforms:{night:{value:0}},vertexShader:`attribute float lifeVisibility; varying float faunaVisibility; varying vec2 vUv; varying vec3 vTint;
      void main(){
        faunaVisibility=lifeVisibility; vUv=uv; vTint=instanceColor;
        mat4 transform=modelViewMatrix*instanceMatrix;
        vec4 center=transform*vec4(0.,0.,0.,1.);
        center.xy+=position.xy*length(transform[0].xyz);
        gl_Position=projectionMatrix*center;
      }`,fragmentShader:`uniform float night; varying float faunaVisibility; varying vec2 vUv; varying vec3 vTint;
      void main(){
        float r=length(vUv-.5)*2.;
        float halo=pow(max(0.,1.-r),2.4);
        float core=1.-smoothstep(.08,.24,r);
        gl_FragColor=vec4(vTint*(.5+core),night*faunaVisibility*(halo*.42+core*.58));
      }`});i.push(v);let y=o(`woodland-fireflies`,new xe(1,1),v,Rh.fireflies,!1),b=new nt(new Float32Array(Rh.fireflies),1);b.setUsage(O),y.geometry.setAttribute(`lifeVisibility`,b);for(let e=0;e<Rh.fireflies;e++)y.setColorAt(e,Z.gold.clone().lerp(Z.white,e%3*.12));for(let e=0;e<Rh.butterflies*2;e++)_.setColorAt(e,[Z.gold,Z.leafPink,Z.lavender][Math.floor(e/2)%3]);let x=new V,S=new V,C=new V,w=new N,T=new X,E=new X,D={},k=new X(1,0,0),A=new X(0,0,1),j=new X,P=new X(1/0,0,0),F=new X(1/0,0,0),I={sheep:[],flocks:[],insects:[]},ee=[],L=[],R=null,z=-1,te=NaN,ne=null,B=!1,re={},H={sheep:0,birds:0,butterflies:0,fireflies:0,instances:0,selections:0,updates:0,drawCalls:r.length};function ie(e,n,r,i,o,s=!1){Ue(t,e.x,e.z,n,r,D),s&&(o=at(t,D.x,D.z,o)),a?Ke(t,D.x,i,D.z,o,x):x.makeRotationY(o).setPosition(D.x,i,D.z)}function ae(e,t,n,r,i,a=1,o=1,s=1,c=0,l=k){T.set(n,r,i),E.set(a,o,s),w.setFromAxisAngle(l,c),S.compose(T,w,E),C.multiplyMatrices(x,S),e.setMatrixAt(t,C)}function oe(e,{focus:i={x:0,z:0},placements:o=[],revision:u=0,detailBlend:d=1,reducedMotion:p=!1,night:h=0}={}){if(n.visible=d>.001,!n.visible)return;p?(ne===null&&(ne=e),e=ne):ne=null,a?Be(t,i.x,0,i.z,j):j.set(i.x,0,i.z);let S=j.distanceToSquared(F)>1e-10,C=o!==R||u!==z||j.distanceToSquared(P)>36;if(C){I=Zh(t,o,i),ee=ee.filter(({item:e})=>et(t,e,i)<Rh.radius+Hh);for(let n of I.flocks){if(ee.length===Rh.flocks)break;ee.every(e=>et(t,n.item,e.item)>12)&&ee.push({...n,bornAt:!Number.isFinite(te)||p||e===te?e-1:e})}L=L.filter(({item:e})=>et(t,e,i)<Rh.fireflyRadius+Uh);let n=L.reduce((e,t)=>e+t.count,0);for(let r of I.insects){if(n===Rh.fireflies)break;if(et(t,r.item,i)>Rh.fireflyRadius-8)continue;let a=qh(r.item);if(!a.count||L.some(e=>e.key===(r.item.id??r.phase)))continue;let o=Math.min(a.count,Rh.fireflies-n);n+=o,L.push({...r,...a,count:o,members:Jh(a.seed,o),key:r.item.id??r.phase,bornAt:!Number.isFinite(te)||p||e===te?e-1:e})}R=o,z=u,P.copy(j),H.selections++}if(h=g.clamp(h,0,1),v.uniforms.night.value=h,y.visible=h>.01,_.visible=h<.9,!C&&!S&&e===te&&p===B)return;te=e,B=p,F.copy(j);let w=0,T=0,D=0,O=0;for(let{item:t,phase:n}of I.sheep){let{dx:r,dz:i,heading:a,walking:o,distance:u}=Xh(t,n,e,re);ie(t,r,i,t.y??0,a,!0),x.scale(E.setScalar(t.scale??1)),ae(s,w,0,.31,-.035,.23,.22,.3);let d=(1-o)*(.32+Math.sin(e*.6+n)*.04);ae(c,w,0,.34-d*.08,.25,1,1,1,d);let f=u/((t.scale??1)*em.stepLength)*Vh;for(let e=0;e<4;e++){let t=e%2?.12:-.12,n=e<2?-.14:.14,r=f+Wh[e],i=Math.max(0,Math.sin(r))*em.stepLift*o,a=Math.cos(r)*em.stride*o;ae(l,w*4+e,t,(em.legHeight+i)/2,n+a,em.legWidth,em.legHeight-i,em.legDepth)}w++}for(let{item:n,phase:r,bornAt:a}of ee){let o=(1-g.smoothstep(et(t,n,i),Rh.radius-20,Rh.radius+Hh))*(p?1:g.smoothstep(e-a,0,.8));for(let t=0;t<3;t++){let i=e*.18+r+t*.13,a=2.5+t*.48;ie(n,Math.sin(i)*a,Math.cos(i)*a,(n.y??0)+11+Math.sin(i*.8)*.5+t*.22,Math.PI/2+i,!0),ae(f,T,0,0,0),f.geometry.attributes.lifeVisibility.setX(T,o);let s=Math.sin(e*6.2+r+t*.7)*.43;ae(m,T*2,0,0,0,1,1,1,s,A),ae(m,T*2+1,0,0,0,1,1,1,Math.PI-s,A),m.geometry.attributes.lifeVisibility.setX(T*2,o),m.geometry.attributes.lifeVisibility.setX(T*2+1,o),T++}}for(let{item:t,phase:n}of I.insects)if((t.kind===`farmPatch`||t.kind===`plaza`)&&D<Rh.butterflies){let r=e*.36+n;ie(t,Math.sin(r)*.7,Math.cos(r*1.3)*.6,(t.y??0)+2+Math.sin(e*1.2+n)*.22,r,!0);let i=.35+Math.sin(e*14+n)*.65;ae(_,D*2,0,0,0,1,1,1,i,A),ae(_,D*2+1,0,0,0,1,1,1,Math.PI-i,A),D++}for(let{item:n,members:r,bornAt:a}of L){let o=(1-g.smoothstep(et(t,n,i),Rh.fireflyRadius-20,Rh.fireflyRadius+Uh))*(p?1:g.smoothstep(e-a,0,1.2));for(let{phase:t,pace:i,x:a,z:s,drift:c,height:l,frequency:u,size:d}of r){ie(n,a+Math.sin(e*i+t)*c,s+Math.sin(e*i*.73+t*1.7)*c,(n.y??0)+l+Math.sin(e*i*.81+t)*.12,0);let r=Math.max(0,Math.sin(e*u+t))**5;ae(y,O,0,0,0,d,d,d),b.setX(O++,o*(.06+.94*r))}}s.count=c.count=w,l.count=w*4,f.count=T,m.count=T*2,_.count=D*2,y.count=O;for(let e of r)e.count&&(e.instanceMatrix.needsUpdate=!0);if(T)for(let e of[f,m])e.geometry.attributes.lifeVisibility.needsUpdate=!0;O&&(b.needsUpdate=!0),Object.assign(H,{sheep:w,birds:T,butterflies:D,fireflies:O,instances:w+T+D+O,updates:H.updates+1})}function se(){for(let e of r)e.geometry.dispose(),e.dispose();for(let e of i)e.dispose();n.removeFromParent()}return{root:n,stats:H,update:oe,dispose:se}}function eg(e,t){let n=$h(e,t),r=t.cities?.length<=32?tg(n.root,t):null,i=NaN,a=null;return{...n,update(e,t={}){n.update(e,t),r&&n.root.visible&&(t.reducedMotion?(a===null&&(a=e),e=a):a=null,e!==i&&(r.update(e),i=e))},dispose(){if(r){let e=new Set;r.root.traverse(t=>{t.geometry&&e.add(t.geometry)}),e.forEach(e=>e.dispose())}n.dispose()}}}function tg(e,t){let n=qp(e),r=Kc(`${t.seed}-life`),i=new Rt;n.name=`ambience`;let a=!!Ct(t),o=new V,s=new V,c=e=>{a&&(e.matrixAutoUpdate=!1,Ke(t,e.position.x,e.position.y,e.position.z,e.rotation.y,e.matrix),o.makeRotationFromQuaternion(e.quaternion).premultiply(s.makeRotationY(-e.rotation.y)).scale(e.scale),e.matrix.multiply(o),e.matrixWorldNeedsUpdate=!0)},l=new Tt(new d(1,.015,.055),Gt.foam,64);l.name=`river-ripples`,l.instanceMatrix.setUsage(O),l.frustumCulled=!1,n.add(l);let u=Array.from({length:t.river.length>0?64:0},()=>({s:r()*t.river.length,offset:(r()-.5)*Math.max(0,t.river.width-1.3),length:.3+r()*.7}));l.count=u.length;let f=qp(n);f.name=`river-boat`,Gp(f,0,.14,0,.44,.24,1.08,`roofDark`),Up(f,0,.24,0,.68,.12,1.55,`trim`),Up(f,0,.47,-.2,.49,.39,.6,`white`),Up(f,0,.51,.108,.36,.23,.025,`window`),Up(f,0,.7,-.2,.63,.08,.76,`roofBlue`);for(let e of[-1,1])Kp(f,Vp(e*.22,.045,-.9),Vp(e*.6,.045,-2),.045,`foam`);Yp(f);let p=[];if(t.river.length>0)for(let e=0;e<=t.river.length;e+=.5){let n=hl(t.river,e);ll(t,n.x,n.z,2.5)&&p.push(e)}let m=p[0]??0,h=p.at(-1)??0,g=qp(n);g.name=`ocean-ripples`;let _=null,v=null,y=2.2;if(t.biomes?.ocean.length){for(let e=0;e<420;e++){let n=(r()-.5)*t.bounds.width,i=(r()-.5)*t.bounds.depth,a=cs(t,`ocean`,n,i);if(a>y&&(y=a,v={x:n,z:i}),e%3==0&&ls(t,[`ocean`],n,i,1.1)){let e=Up(g,n,t.river.y+.055,i,.6+r()*1.1,.015,.055,`foam`,.15);e.castShadow=!1}}if(v){_=qp(n,v.x,t.river.y+.035,v.z,-.6),_.name=`sailboat`,Gp(_,0,.17,0,.43,.23,1.13,`white`),Wp(_,0,1.36,0,.035,.04,2.55,`timber`,6);let e=new Ze().setFromPoints([Vp(.03,2.6,0),Vp(.03,.48,0),Vp(.03,.48,.91)]);e.setIndex([0,1,2,2,1,0]),e.computeVertexNormals(),Hp(_,e,`trim`);let r=new Ze().setFromPoints([Vp(.04,2.12,-.06),Vp(.04,.48,-.06),Vp(.04,.48,-.81)]);r.setIndex([0,1,2,2,1,0]),r.computeVertexNormals(),Hp(_,r,`gold`),Yp(_)}Yp(g),a&&g.traverse(e=>{e.isMesh&&Pt(e.geometry,t)})}let b=-t.bounds.width*.33,x=t.bounds.depth*.2,S=dl(t,b,x)+14,C=qp(n,b,S,x);C.name=`balloon`;let w=[[0,-2],[.55,-1.65],[1.4,-.65],[1.75,.5],[1.5,1.6],[.8,2.25],[0,2.5]].map(([e,t])=>new dt(e,t));for(let e=0;e<10;e++)Hp(C,new ze(w,1,e/10*Math.PI*2,Math.PI*2/10),e%2?`trim`:`redLight`);Up(C,0,-2.9,0,.72,.55,.64,`timber`),Up(C,0,-2.62,0,.8,.1,.72,`gold`);for(let e of[-.3,.3])for(let t of[-.25,.25])Kp(C,Vp(e,-2.65,t),Vp(e,-1.65,t),.035,`timber`);Yp(C);let T=[];for(let e=0;e<5;e++){let t=qp(n),r=qp(t),i=qp(t);t.name=`bird-${e+1}`,Kp(r,Vp(0,0,0),Vp(-.48,.1,.17),.065,`white`),Kp(i,Vp(0,0,0),Vp(.48,.1,.17),.065,`white`),Gp(t,0,0,0,.07,.07,.19,`white`),Yp(r),Yp(i),T.push({g:t,left:r,right:i})}let E=Math.max(10,...t.mountains.map(e=>e.height+3));return c(f),_&&c(_),c(C),T.forEach(({g:e})=>c(e)),{root:n,update(e){u.forEach((n,r)=>{let o=hl(t.river,(n.s+e*.18)%t.river.length),s=o.tangent.z,c=-o.tangent.x,u=o.x+s*n.offset,d=o.z+c*n.offset;i.position.set(u,t.river.y+.05,d),i.rotation.set(0,o.angle+Math.PI/2,0),i.scale.set(ll(t,u,d,.65)?n.length*Math.min(1,t.river.width):0,1,Math.min(1,t.river.width/.15)),a?Ee(t,u,i.position.y,d,i.rotation.y,i.matrix).scale(i.scale):i.updateMatrix(),l.setMatrixAt(r,i.matrix)}),l.instanceMatrix.needsUpdate=!0;let n=.5-Math.cos(e*.025)*.46;if(f.visible=!1,t.river.length>0){let r=hl(t.river,m+(h-m)*n);f.position.set(r.x,t.river.y+.035,r.z),f.rotation.y=r.angle+(Math.sin(e*.025)<0?Math.PI:0),f.visible=t.river.width>=1.6&&ll(t,r.x,r.z,2.2),c(f)}_&&(_.position.y=t.river.y+.035+Math.sin(e*.8)*.025,_.rotation.z=Math.sin(e*.7)*.025,c(_)),C.position.y=S+Math.sin(e*.35)*.3,C.rotation.y=Math.sin(e*.07)*.12,c(C),T.forEach(({g:t,left:n,right:r},i)=>{let a=e*.045+i*.09;t.position.set(Math.cos(a)*13+i*.65,E+i*.25,Math.sin(a)*7-i*.75),t.rotation.y=-a,n.rotation.z=Math.sin(e*4.5+i*.7)*.35,r.rotation.z=-n.rotation.z,c(t)})}}}function ng(e){let t=e.surface.radius,n=new q,r=new q,i=[];n.name=r.name=`earth-ocean`;let o;for(let[s,c]of[[r,-.65],[n,-4.5]]){let r=new Te(t+c,256,128);if(r.translate(0,-t,0),!o){let t=r.attributes.position,n=new X,i={},a=new H;o=new Float32Array(t.count*3);for(let r=0;r<t.count;r++)n.fromBufferAttribute(t,r),vt(e,n,i),Tu(e,i.x,i.z,a),a.toArray(o,r*3)}r.setAttribute(`color`,new B(o,3));let l=Ut(ku(new a({color:16777215,vertexColors:!0,toneMapped:s===n}),t),{kind:`water`});i.push(r,l),s.add(new Y(r,l))}let s=new Te(t+12,128,64);s.translate(0,-t,0);let c=new M({name:`earth-atmosphere`,uniforms:{worldNight:Vt.night},side:1,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,toneMapped:!1,vertexShader:`varying vec3 rimNormal;
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
      }`}),l=new Y(s,c);l.name=`earth-atmosphere`,l.castShadow=!1,l.receiveShadow=!1,r.add(l),i.push(s,c);let u=!1;return{detail:n,map:r,dispose(){u||(u=!0,n.removeFromParent(),r.removeFromParent(),i.forEach(e=>e.dispose()))}}}function rg(t){if(!Ct(t))return null;if(t.surface.complete)return ng(t);let n=t.outline,r=[],i=[],o=new q,s=new q;o.name=s.name=`curved-earth-section`;let c=Z.ocean.clone().lerp(Z.rockDark,.48).multiplyScalar(.72),l=Z.ocean.clone().multiplyScalar(.76),u=new X;function d(i){let a=[],o=[];for(let e=0;e<n.length;e++){let r=n[e],s=n[(e+1)%n.length],d=Math.max(1,Math.ceil(Math.hypot(s[0]-r[0],s[1]-r[1])/8));for(let e=0;e<d;e++){let n=[e/d,(e+1)/d].map(e=>[r[0]+(s[0]-r[0])*e,r[1]+(s[1]-r[1])*e]),f=[[...n[0],i],[...n[1],i],[...n[0],-32],[...n[1],-32]];for(let e of[0,2,1,1,2,3]){let[n,r,i]=f[e];Be(t,n,i,r,u),a.push(u.x,u.y,u.z);let s=e<2?l:c;o.push(s.r,s.g,s.b)}}}let s=new Ze;return s.setAttribute(`position`,new e(a,3)),s.setAttribute(`color`,new e(o,3)),s.computeVertexNormals(),r.push(s),s}let f=new mt(n.map(([e,t])=>new dt(e,-t))),p=new k(f);p.rotateX(-Math.PI/2),p.translate(0,-32,0);let m=Ql(p,64);p.dispose(),Pt(m,t),r.push(m);for(let[e,t]of[[o,-3.4],[s,0]]){let n=new a({vertexColors:!0,side:2,toneMapped:e===o}),r=new a({color:c,side:2,toneMapped:e===o});i.push(n,r),e.add(new Y(d(t),n),new Y(m,r))}let h=!1;return{detail:o,map:s,dispose(){h||(h=!0,o.removeFromParent(),s.removeFromParent(),r.forEach(e=>e.dispose()),i.forEach(e=>e.dispose()))}}}function ig(e,t){let n=new Float32Array(1260),r=new Float32Array(420),i=71139,a=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);for(let e=0;e<r.length;e++)n[e*3]=a()*2-1,n[e*3+1]=a()*2-1,n[e*3+2]=a(),r[e]=a()>.94?3:1+a()*1.2;let o=new Ze;o.setAttribute(`position`,new B(n,3)),o.setAttribute(`starSize`,new B(r,1));let s=new M({transparent:!1,depthWrite:!1,depthTest:!1,toneMapped:!1,uniforms:{worldNight:Vt.night,worldTime:Vt.time,skyColor:{value:e.background}},vertexShader:`attribute float starSize; varying float seed; void main(){seed=position.z;gl_Position=vec4(position.xy,0.999,1.0);gl_PointSize=starSize;}`,fragmentShader:`uniform float worldNight;uniform float worldTime;uniform vec3 skyColor;varying float seed;
      void main(){float glow=1.0-smoothstep(0.12,0.5,length(gl_PointCoord-0.5));
      if(glow<0.01)discard;
      float twinkle=0.82+0.18*sin(worldTime*0.4+seed*37.0);
      vec3 star=mix(vec3(0.55,0.74,1.0),vec3(1.0,0.83,0.56),seed);
      gl_FragColor=vec4(mix(skyColor,star,glow*worldNight*twinkle*0.76),1.0);
      #include <colorspace_fragment>
      }`}),c=[e,t].map(e=>{let t=new S(o,s);return t.name=`night-stars`,t.frustumCulled=!1,t.renderOrder=-1e3,t.visible=!1,e.add(t),t});return{update(){for(let e of c)e.visible=Vt.night.value>.005},dispose(){c.forEach(e=>e.removeFromParent()),o.dispose(),s.dispose()}}}var ag=Object.freeze({height:nm,radius:rm,speed:2.65,sprintSpeed:4.6,jumpSpeed:4.05,gravity:11.5,stepHeight:.32,maxSlope:.78,cameraDistance:2.85,cameraHeight:.5,spawnRailClearance:4.5,fov:54,near:.045,far:140}),og=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),sg=Math.PI*2,cg=g.clamp,lg=1/120,ug=.58,dg=e=>e*e*(3-2*e),fg=e=>Math.atan2(Math.sin(e),Math.cos(e));function pg(e){let t=new q;t.name=`walking-traveller`,e.add(t);let n=new q;n.name=`traveller-body`,t.add(n);let r=new d(1,1,1),i=new Me(1,0),s=new o(.118,.125,.055,8),c=new mt;c.moveTo(.038,-.045),c.lineTo(.038,.045),c.lineTo(-.17,.1),c.lineTo(-.17,-.1),c.closePath();let l=new ae(c,{depth:.065,bevelEnabled:!1,steps:1});l.rotateY(Math.PI/2),l.translate(-.0325,0,0);let u=[r,i,s,l];function f(e,t,n,i,a,o,s,c,l,u=r){let d=new Y(u,l);return d.name=t,d.position.set(n,i,a),d.scale.set(o,s,c),d.castShadow=!0,d.receiveShadow=!0,e.add(d),d}f(n,`traveller-coat`,0,.385,0,.24,.26,.16,Gt.teal),f(n,`traveller-face`,0,.59,.006,.115,.1,.115,Gt.peach,i),f(n,`traveller-cap`,0,.6875,-.006,1,1,1,Gt.redLight,s),f(n,`cap-brim`,0,.666,.085,.18,.022,.09,Gt.redLight);for(let e of[-1,1])f(n,`eye`,e*.034,.603,.1,.014,.018,.015,Gt.window);let p=[],m=[];for(let e of[-1,1]){let r=new q;r.name=e<0?`right-arm`:`left-arm`,r.position.set(e*.146,.48,0),r.rotation.order=`YXZ`,n.add(r),p.push(r),f(r,`sleeve`,0,-.06,0,.066,.15,.1,Gt.teal),f(r,`mitten`,0,-.145,.008,.045,.045,.046,Gt.peach,i);let a=new q;a.name=e<0?`right-leg`:`left-leg`,a.position.set(e*.055,.29,0),t.add(a),m.push(a),f(a,`trousers`,0,-.14,0,.075,.3,.1,Gt.roofBlue),f(a,`boot`,0,-.285,.015,.09,.08,.13,Gt.timber)}let h=p[0],g=new q;g.name=`traveller-axe`,g.position.set(0,-.145,.008),g.scale.setScalar(.82),h.add(g),f(g,`axe-handle`,0,-.105,0,.037,.33,.041,Gt.timber),f(g,`axe-head`,0,-.225,0,1,1,1,Gt.rail,l);let _=new a({color:1522743,transparent:!0,opacity:.16,depthWrite:!1}),v=new ee(.18,16);u.push(v);let y=new Y(v,_);return y.matrixAutoUpdate=!1,y.name=`traveller-contact-shadow`,e.add(y),{root:t,body:n,arms:p,legs:m,rightArm:h,axe:g,shadow:y,dispose(){u.forEach(e=>e.dispose()),_.dispose()}}}function mg(e,t,{getCollisionPlacements:n=()=>t.placements??[],getTerrainMeshes:r=()=>[],isReadyAt:i=()=>!0}={}){let a=new q;a.name=`walking-player`,a.visible=!1,e.add(a);let o=pg(a),s=new w(ag.fov,1,ag.near,ag.far);s.name=`walking-camera`;let c={x:0,y:0,z:0},l={x:0,y:0,z:0},u={x:0,y:0,z:0},d={x:0,y:0,z:0},f=new V,p=new V,m=new V().makeRotationX(-Math.PI/2),h=new X,_=new X,v=new X,y=new X,b=new X,x=new X,S=new X,C=new te,T=[];C.firstHitOnly=!0;let E={},D={},O={},k={},A={},j=new X,M=yo(t.lines??[]),N={},P={},F=new X,I=new Ce,ee=!1,L=!1,R=!1,z=!0,ne=0,B=0,re=Math.PI/10,H=!1,ie=0,ae=0,oe=0,se=0,U=ug,ce=!1,le=[],ue=null,de={x:1/0,y:0,z:1/0},fe=[],W=null,pe={x:1/0,z:1/0},me=0,he=0,ge=0,_e=0,ve=0,ye=ag.cameraDistance,be={steps:0,swings:0,blocked:0,raycasts:0,obstacles:0,meshes:0,meshSelections:0};function xe(e=!1){let i=r()??[];(e||i!==ue||!Number.isFinite(de.x)||et(t,c,de)>2||Math.abs(c.y-de.y)>2)&&(ue=i,de={...c},Be(t,c.x,c.y,c.z,F),le=i.filter(e=>{let t=e.geometry;return t?(e.isInstancedMesh&&!e.boundingSphere&&e.computeBoundingSphere(),t.boundingSphere||t.computeBoundingSphere(),I.copy(e.boundingSphere??t.boundingSphere).applyMatrix4(e.matrixWorld),I.distanceToPoint(F)<=ag.cameraDistance+4):!1}),be.meshes=le.length,be.meshSelections++);let a=n()??[];if(e||a!==W||!Number.isFinite(pe.x)||et(t,c,pe)>6){W=a,pe={x:c.x,z:c.z};let e=a.concat((t.stations??[]).map(e=>({...e,kind:`station`}))),n=new Set;fe=e.filter(e=>{if(!og.has(e.kind??(e.width&&e.depth?`station`:``)))return!1;let r=e.id??e;return!n.has(r)&&(n.add(r),et(t,e,c)<26+(e.radius??4))}),be.obstacles=fe.length}}function Se(e,n=c.y){for(let r of fe){let i=r.kind??`station`,a=r.scale??1;if(n>(r.y??0)+(i===`tree`?2.7:i===`rock`?.6:i===`cactus`?2.4:8)*a)continue;je(t,r,e,E);let o;if(i===`tree`?o=.14*a:i===`cactus`?o=.31*a:i===`rock`?o=.59*a:i===`landmark`&&(o=1.35*a),o!==void 0){if(Math.hypot(E.x,E.z)<o+ag.radius)return!0;continue}let s=ut(t,r.x,r.z,r.rotation??0),c=Math.cos(s),l=Math.sin(s),u=E.x*c-E.z*l,d=E.x*l+E.z*c,f=((r.variant??0)%4==1?1.62:1.82)*a,p=((r.variant??0)%4==1?1.9:1.72)*a;if(i===`station`?(u+=1.45*a,d+=.42*a,f=2.62*a,p=1.42*a):i===`apartment`?(f=2.52*a,p=2.48*a):i===`civic`?(d+=.15*a,f=3.35*a,p=2.72*a):i===`tower`&&(f=2.32*a,p=2.48*a),Math.abs(u)<f/2+ag.radius&&Math.abs(d)<p/2+ag.radius)return!0}return!1}function G(e,t,n){return le.length?(C.set(e,t),C.near=.018,C.far=n,be.raycasts++,T.length=0,C.intersectObjects(le,!1,T),T[0]??null):null}function we(e,n=void 0){let r=fl(t,e.x,e.z);if(n!==void 0&&le.length){Be(t,e.x,n+ag.stepHeight+.06,e.z,_),rt(t,e.x,e.z,h),b.copy(h).negate();let r=G(_,b,ag.stepHeight+1.7);if(r){let e=n+ag.stepHeight+.06-r.distance,t=r.face?.normal,i=t?t.dot(h):1;if(e>-.34&&i>.51)return{height:e,type:`mesh`,slope:i}}}return r}function Te(e,{height:n=c.y,spawn:r=!1}={}){let i=we(e,r?void 0:n);if(!Number.isFinite(i.height)||[`outside`,`ocean`,`water`].includes(i.type)||i.height<-.3||Se(e,n))return null;if(r)for(let[n,r]of[[.24,0],[-.24,0],[0,.24],[0,-.24]]){Ue(t,e.x,e.z,n,r,O);let a=fl(t,O.x,O.z);if([`outside`,`ocean`,`water`].includes(a.type)||Math.abs(a.height-i.height)>.24*ag.maxSlope)return null}return i}function Ee(e={x:0,z:0}){if(R)return null;let n={x:Number.isFinite(e.x)?e.x:0,z:Number.isFinite(e.z)?e.z:0},r={...c};c.x=n.x,c.z=n.z,xe(!0);let i=[n,...[...t.cities??[]].sort((e,r)=>et(t,e,n)-et(t,r,n)).slice(0,3)],a=null;for(let e of i){c.x=e.x,c.z=e.z,xe(!0);for(let n=0;n<=12&&!a;n++){let r=n?Math.max(8,Math.ceil(n*5)):1;for(let i=0;i<r;i++){let o=i/r*sg+.31*n;if(Ue(t,e.x,e.z,Math.sin(o)*n*.8,Math.cos(o)*n*.8,D),Ec(t,M,D.x,D.z,ct(t,D.x,D.z,ag.spawnRailClearance)).some(({a:e,b:n})=>(je(t,D,e,N),je(t,D,n,P),qc(0,0,N,P)<ag.spawnRailClearance)))continue;let s=Te(D,{spawn:!0,height:fl(t,D.x,D.z).height});if(s){a={x:D.x,y:s.height+.035,z:D.z};break}}}if(a)break}return Object.assign(c,r),xe(!0),a}function De(e,n,r=0){ne+=fg(ae-ne)*Math.min(1,e*15);let i=at(t,u.x,u.z,ne);Ke(t,u.x,u.y,u.z,i,f),f.decompose(o.root.position,o.root.quaternion,o.root.scale);let a=cg(n/.7,0,1),s=g.smoothstep(n,ag.speed*.97,ag.sprintSpeed*.96);oe+=(s-oe)*(e>0?1-Math.exp(-12*e):1),z&&(ie+=r*sg/g.lerp(1.05,1.42,oe)),o.body.position.y=z?Math.abs(Math.sin(ie))*.008*a:0,o.body.rotation.x=z?oe*a*.07:0,o.body.rotation.z=z?Math.sin(ie)*a*.025:0,o.body.rotation.y=0;for(let e=0;e<2;e++){let t=ie+e*Math.PI,n=z?Math.sin(t)*(.22+oe*.1)*a:e===0?-.16:.16,r=z?Math.max(0,Math.cos(t))*(.024+oe*.018)*a:.025,i=o.legs[e];i.rotation.x=n,i.position.y=-.035+.325*Math.cos(n)+(Math.sin(n)>0?.08:.05)*Math.abs(Math.sin(n))+r,o.arms[e].rotation.y=0,o.arms[e].position.z=0,o.arms[e].rotation.x=z?-Math.sin(t)*(e===0?.1:.24)*a:-.2,o.arms[e].rotation.z=e===0?-.1:.06}if(o.axe.rotation.y=0,U<ug){let e=U/ug,t,n;e<.25?(t=dg(e/.25),n=-.95*t):e<.65?(t=1,n=g.lerp(-.95,1.15,dg((e-.25)/.4))):(t=1-dg((e-.65)/.35),n=1.15*t),o.rightArm.rotation.set(-1.27*t,n,-.1*(1-t)),o.rightArm.position.z=.075*t,o.axe.rotation.y=Math.PI/2*t,o.body.rotation.y=n*.08}Ke(t,u.x,Math.min(u.y,_e)+.036,u.z,i,f),o.shadow.matrix.copy(f).multiply(m),o.shadow.matrixWorldNeedsUpdate=!0,o.shadow.material.opacity=.16/(1+Math.max(0,u.y-_e)*1.6)}function K(e=0,n=!1){Ne(t,u.x,u.z,p);let r=p.elements;h.set(r[4],r[5],r[6]),S.set(r[0],r[1],r[2]),x.set(r[8],r[9],r[10]),ve=n||e<=0?u.y:g.lerp(ve,u.y,1-Math.exp(-14*e)),v.copy(Be(t,u.x,ve+ag.cameraHeight,u.z,j));let i=ag.cameraDistance,a=Math.cos(re)*i;y.copy(v).addScaledVector(S,-Math.sin(B)*a).addScaledVector(x,-Math.cos(B)*a).addScaledVector(h,Math.sin(re)*i),b.subVectors(y,v);let o=b.length();b.divideScalar(o);let c=G(v,b,o+.14),l=c?Math.max(.32,c.distance-.18):o;ye=n||e<=0||l<ye?l:g.lerp(ye,l,1-Math.exp(-15*e)),s.position.copy(v).addScaledVector(b,ye),s.up.copy(h),s.lookAt(v),s.updateMatrixWorld(!0)}function Oe(){let e=cg(me/lg,0,1);je(t,l,c,A),Ue(t,l.x,l.z,A.x*e,A.z*e,u),u.y=g.lerp(l.y,c.y,e),_e=g.lerp(ge,he,e)}function ke(e,n){if(!le.length)return!1;Be(t,c.x,n+.43,c.z,_),Be(t,e.x,n+.43,e.z,j),b.subVectors(j,_);let r=b.length();if(r<1e-8)return!1;b.divideScalar(r);let i=G(_,b,r+ag.radius);return!!(i&&i.distance<r+ag.radius)}function Ae(e,n,r){if(Ue(t,c.x,c.z,e,n,D),!i(D.x,D.z))return be.blocked++,!1;let a=Te(D);return!a||a.height>c.y+Math.max(ag.stepHeight,Math.hypot(e,n)*ag.maxSlope)||ke(D,c.y)||a.type===`mesh`&&a.slope<1/Math.sqrt(1+ag.maxSlope**2)||a.type===`mountain`&&a.height-fl(t,c.x,c.z).height>Math.hypot(e,n)*ag.maxSlope?(be.blocked++,!1):(c.x=D.x,c.z=D.z,he=a.height,z&&c.y-a.height<.55?c.y=a.height+.035:z&&=!1,!0)}function J(e,n={}){if(!ee||R)return;e=cg(Number.isFinite(e)?e:0,0,.12),xe(),B=fg(B+(Number.isFinite(n.lookX)?n.lookX:0)),re=cg(re+(Number.isFinite(n.lookY)?n.lookY:0),Math.PI/18,Math.PI*65/180);let r=!!n.jump;r&&!H&&z&&(d.y=ag.jumpSpeed,z=!1),H=r;let i=!!n.swing;i&&!ce&&U>=ug&&(U=0,ae=B,be.swings++),ce=i,U=Math.min(ug,U+e);let a=cg(n.forward??0,-1,1),o=cg(n.right??0,-1,1),s=Math.hypot(a,o);s>1&&(a/=s,o/=s);let f=n.sprint?ag.sprintSpeed:ag.speed,p=(Math.sin(B)*a-Math.cos(B)*o)*f,m=(Math.cos(B)*a+Math.sin(B)*o)*f;for(me+=e,k.x=u.x,k.z=u.z;me>=.008333333332333333;){let e=lg;me-=e,be.steps++,Object.assign(l,c),ge=he;let t=1-Math.exp(-18*e);d.x+=(p-d.x)*t,d.z+=(m-d.z)*t;let n=d.x*e,r=d.z*e;if(Math.hypot(n,r)>1e-6&&(Ae(n,r,e)||(Math.abs(n)>1e-8&&Ae(n,0,e),Math.abs(r)>1e-8&&Ae(0,r,e)),ae=Math.atan2(d.x,d.z)),!z){d.y-=ag.gravity*e,c.y+=d.y*e;let t=we(c,c.y);he=t.height,c.y<=t.height+.035&&d.y<=0&&(c.y=t.height+.035,d.y=0,z=!0)}}Oe(),U<ug&&(ae=B);let h=et(t,k,u),g=e>0?h/e:0;se+=(g-se)*(1-Math.exp(-24*e)),De(e,se,h),K(e)}return{root:a,camera:s,position:c,renderPosition:u,cameraTarget:v,velocity:d,stats:be,prepareSpawn:Ee,update:J,get swinging(){return U<ug},get active(){return ee},get initialized(){return L},get grounded(){return z},get heading(){return B},get pitch(){return re},enter(e,t=0,{respawn:n=!1}={}){if(R)return!1;if(L&&!n)return ee=!0,a.visible=!0,xe(!0),De(0,0),K(0,!0),!0;let r=Ee(e);return r?(Object.assign(c,r),d.x=d.y=d.z=0,ne=B=ae=Number.isFinite(t)?t:0,Object.assign(l,r),Object.assign(u,r),he=ge=_e=r.y-.035,re=Math.PI/10,me=0,H=!1,se=oe=ie=0,U=ug,ce=!1,z=!0,ee=L=!0,a.visible=!0,xe(!0),De(0,0),K(0,!0),!0):!1},exit(){return ee=!1,a.visible=!1,se=oe=0,U=ug,ce=!1,De(0,0),d.x=d.y=d.z=0,H=!1,{...c}},resize(e){s.aspect=Math.max(.01,Number.isFinite(e)?e:1),s.updateProjectionMatrix()},dispose(){R||(R=!0,ee=!1,U=ug,ce=!1,a.removeFromParent(),o.dispose(),a.clear())}}}function hg({crop:t=!1}={}){let n=[],r=[],i=[],a=[],o=t?7:12;for(let e=0;e<o;e++){let s=e*2.39996323,c=Math.sqrt((e+.5)/o)*.46,l=Math.cos(s)*c,u=Math.sin(s)*c,d=s+e*.73,f=Math.cos(d),p=Math.sin(d),m=.7+(Math.sin(e*13.73)*.5+.5)*.3,h=t?.065:.07,g=.13+e*7%5*.027,_=n.length/3,v=[[-h,0,0],[h,0,0],[-h*.55,m*.56,g*.34],[h*.55,m*.56,g*.34],[0,m,g]];for(let[t,[i,o,s]]of v.entries())a.push(e*2,e*2+1,t===4?.5:t%2),n.push(l+i*f-s*p,o,u+i*p+s*f),r.push(-p*.35,.93675,f*.35);i.push(_,_+1,_+2,_+1,_+3,_+2,_+2,_+3,_+4)}let s=new Ze;return s.setAttribute(`position`,new e(n,3)),s.setAttribute(`normal`,new e(r,3)),t||s.setAttribute(`grassRoot`,new e(a,3)),s.setIndex(i),s}var gg=Object.freeze((()=>{let e=hg(),t=e.attributes.position,n=[];for(let e=0;e<12;e++)for(let r=0;r<2;r++)n.push([t.getX(e*5+r),t.getZ(e*5+r)]);return e.dispose(),n})());function _g(e,{focus:t,time:n,player:r,visibility:i={value:1}},a){let o=e.onBeforeCompile,s=e.customProgramCacheKey(),c=a===`grass`||a===`crops`;return e.onBeforeCompile=(e,s)=>{o(e,s),e.uniforms.walkFocus=t,e.uniforms.walkTime=n,e.uniforms.walkPlayer=r,e.uniforms.walkVisibility=i,e.vertexShader=`uniform vec3 walkFocus; uniform vec3 walkPlayer; uniform float walkTime; uniform float walkVisibility;
      varying float walkDistance; varying float bladeHeight;
      ${a===`grass`?`attribute vec3 grassRoot;
      attribute vec4 grassRoots0; attribute vec4 grassRoots1; attribute vec4 grassRoots2;
      attribute vec4 grassRoots3; attribute vec4 grassRoots4; attribute vec4 grassRoots5;
      float grassGround(float index) {
        if(index < 4.0) return grassRoots0[int(index)];
        if(index < 8.0) return grassRoots1[int(index - 4.0)];
        if(index < 12.0) return grassRoots2[int(index - 8.0)];
        if(index < 16.0) return grassRoots3[int(index - 12.0)];
        if(index < 20.0) return grassRoots4[int(index - 16.0)];
        return grassRoots5[int(index - 20.0)];
      }`:``}\n`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      vec3 walkOrigin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      walkDistance = distance(walkOrigin, walkFocus);
      bladeHeight = position.y;
      float detailCoverage = (1.0 - smoothstep(15.0, 23.0, walkDistance)) * smoothstep(0.0, 1.0, walkVisibility);
      ${c?`
      float rootWeight = position.y * position.y;
      vec3 bladeAxisX = (modelMatrix * instanceMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz;
      vec3 bladeAxisY = (modelMatrix * instanceMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
      vec3 bladeAxisZ = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 1.0, 0.0)).xyz;
      float plantHeight = length(bladeAxisY);
      bladeAxisY = normalize(bladeAxisY);
      float gust = 0.055 + 0.020 * sin(dot(walkOrigin.xz, vec2(0.23, 0.31)) - walkTime * 1.25);
      float flutter = 0.007 * sin(dot(walkOrigin.xz, vec2(2.8, -1.7)) - walkTime * 2.7);
      vec3 worldWind = (vec3(0.88, 0.0, 0.47) * gust + vec3(0.30, 0.0, -0.90) * flutter) * clamp(plantHeight / 0.23, 0.7, 1.6);
      // Project the same world-space wind into each randomly rotated tile.
      // Dividing out instance scale preserves its physical displacement.
      transformed.x += dot(worldWind, normalize(bladeAxisX)) / max(length(bladeAxisX), 0.01) * rootWeight;
      transformed.z += dot(worldWind, normalize(bladeAxisZ)) / max(length(bladeAxisZ), 0.01) * rootWeight;
      vec3 fromPlayer = walkOrigin - walkPlayer;
      float playerHeight = abs(dot(fromPlayer, bladeAxisY));
      fromPlayer -= bladeAxisY * dot(fromPlayer, bladeAxisY);
      float playerDistance = length(fromPlayer);
      float press = (1.0 - smoothstep(0.16, 0.75, playerDistance)) * (1.0 - smoothstep(0.5, 1.8, playerHeight));
      fromPlayer /= max(playerDistance, 0.08);
      transformed.x += dot(fromPlayer, normalize(bladeAxisX)) / max(length(bladeAxisX), 0.01) * press * rootWeight * 0.19;
      transformed.z += dot(fromPlayer, normalize(bladeAxisZ)) / max(length(bladeAxisZ), 0.01) * press * rootWeight * 0.19;
      transformed.y *= 1.0 - press * 0.44;
      `:``}
      ${a===`grass`?`transformed.y += mix(grassGround(grassRoot.x), grassGround(grassRoot.y), grassRoot.z);`:``}
      transformed *= detailCoverage;`),e.fragmentShader=`varying float walkDistance; varying float bladeHeight;
`+e.fragmentShader,c&&(e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
        diffuseColor.rgb *= mix(0.84, 1.08, clamp(bladeHeight, 0.0, 1.0));`),e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
        normal = normalize(vNormal);`))},e.customProgramCacheKey=()=>`${s}|walking-vegetation-v4:${a}`,e}var vg=[],yg=new WeakMap,bg=new WeakMap,xg=e=>Math.max(0,Math.min(1,e)),Sg=(e,t,n)=>{let r=xg((n-e)/(t-e));return r*r*(3-2*r)},Cg=e=>e.range?.bounds??uo(e.x,e.z,e.radius);function wg(e,t,n){let r=t-e.c.x,i=n-e.c.z,a=e.ux*r+e.uz*i,o=e.vx*r+e.vz*i;return a>=-1e-8&&o>=-1e-8&&a+o<=1+1e-8}function Tg(e,t,n){return Math.max(0,e.c.y+(t-e.c.x)*e.slopeX+(n-e.c.z)*e.slopeZ)}function Eg(e){if(yg.has(e))return yg.get(e);let{vertices:t,surfaceTriangles:n}=Ms(e),r=new Map,i=e.range?.cellSize??Math.max(1,e.radius/5);for(let e of n){let[n,a,o]=e.map(e=>t[e]),s=(a.z-o.z)*(n.x-o.x)+(o.x-a.x)*(n.z-o.z);if(Math.abs(s)<1e-12)continue;let c=(a.z-o.z)/s,l=(o.x-a.x)/s,u=(o.z-n.z)/s,d=(n.x-o.x)/s,f=c*(n.y-o.y)+u*(a.y-o.y),p=l*(n.y-o.y)+d*(a.y-o.y),m=1/Math.hypot(f,1,p),h={c:o,ux:c,uz:l,vx:u,vz:d,slopeX:f,slopeZ:p,normal:{x:-f*m,y:m,z:-p*m}};for(let e=Math.floor(Math.min(n.x,a.x,o.x)/i);e<=Math.floor(Math.max(n.x,a.x,o.x)/i);e++)for(let t=Math.floor(Math.min(n.z,a.z,o.z)/i);t<=Math.floor(Math.max(n.z,a.z,o.z)/i);t++){let n=`${e}:${t}`;r.has(n)||r.set(n,[]),r.get(n).push(h)}}let a={size:i,buckets:r};return yg.set(e,a),a}function Dg(e,t,n){let{size:r,buckets:i}=Eg(e);return(i.get(`${Math.floor(t/r)}:${Math.floor(n/r)}`)??vg).find(e=>wg(e,t,n))}function Og(e){if(bg.has(e))return bg.get(e);let t=new go(e.mountains??vg,Cg),n=new H,r=new H;function i(e,n){let r=t.query(uo(e,n,.5)),i=0,a=null,o=null;for(let t of r){let r=Dg(t,e,n);if(!r)continue;let s=Tg(r,e,n);s>i&&(i=s,a=r,o=t)}return{height:i,face:a,mountain:o,nearby:r}}function a(e,t,n){if(!n?.nearby.length)return 0;if(n.nearby.length===1&&n.face&&wg(n.face,e,t))return Tg(n.face,e,t);let r=0;for(let i of n.nearby){let n=Dg(i,e,t);n&&(r=Math.max(r,Tg(n,e,t)))}return r}function o(t,i,a){Xl(e.terrainSource??e,t,i,{target:n});let o=Sg(-.15,.065,n.g-n.r),s=1;if(a.mountain){let r=a.mountain,o=a.height/r.height,c=a.face.normal,l=Sg(.9,.48,c.y),u=Sg(.53,.84,o);s=1-Math.max(l,u)*Sg(.015,.12,o),s*=1-Sg(Ps(r,t,i)-.8,Ps(r,t,i),a.height),bm(e,r,{x:t,y:a.height,z:i},c,{target:n})}let c=(.045+.955*o)*s;return r.copy(n).lerp(o>.5?Z.grass:Z.soilLight,.18).multiplyScalar(1.02),{density:c,heightScale:(.42+.58*o)*(.35+.65*s),color:r.toArray()}}let s={sample:i,heightAt:a,vegetation:o};return bg.set(e,s),s}var kg=Object.freeze({radius:23,padding:6,refreshDistance:5,grass:9600,flowers:100,pebbles:100,crops:2800}),Ag=Math.PI*2,jg=[],Mg=[`grass`,`flowers`,`pebbles`,`crops`],Ng={grass:[`grass`,`grassLight`,`meadow`],flowers:[`white`,`gold`,`lavender`],pebbles:[`gravel`,`rockLight`,`soilLight`],crops:[`wheat`]};function Pg(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return t>>>0}function Fg(e,t,{a:n,b:r}){let i=r.x-n.x,a=r.z-n.z,o=g.clamp(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-n.x-i*o,t-n.z-a*o)}function Ig(e,t){let n=e;for(let r=0;r<e.length&&n.length>=3;r++){let i=e[r],a=e[(r+1)%e.length],o=a[0]-i[0],s=a[1]-i[1],c=Math.hypot(o,s);if(c<1e-7)continue;let l=s/c,u=-o/c,d=(i[0]*s-i[1]*o)/c-t,f=[];for(let e=0;e<n.length;e++){let t=n[e],r=n[(e+1)%n.length],i=t[0]*l+t[1]*u-d,a=r[0]*l+r[1]*u-d;if(i<=0&&f.push(t),i<0!=a<0){let e=i/(i-a);f.push([t[0]+(r[0]-t[0])*e,t[1]+(r[1]-t[1])*e])}}n=f}return n}function Lg(e){return String(e.id??`${e.kind}:${e.x}:${e.z}`)}function Rg(e){return e.radius??(e.kind===`farm`?Math.hypot(e.width??3,e.depth??4)*(e.scale??1)/2:(e.kind===`tree`?.85:2.2)*(e.scale??1))}function zg(e,t,n,r=.4){let i=e.scale??1,a=(t-e.x)/i,o=(n-e.z)/i,s=e.rotation??0,c=a*Math.cos(s)-o*Math.sin(s),l=a*Math.sin(s)+o*Math.cos(s),u=r/i;return e.kind===`tree`?Math.hypot(a,o)<.22+u:e.kind===`farm`?(e.parcels??[{x:0,z:0,width:e.width??3,depth:e.depth??4}]).some(e=>ec($s(e),c-(e.x??0),l-(e.z??0),-u)):e.kind===`house`?Math.abs(c)<1.1+u&&Math.abs(l)<1.1+u:e.kind===`station`?Math.abs(c)<3.2+u&&Math.abs(l)<1.2+u:e.kind===`person`||e.kind===`sheep`?!1:Math.hypot(t-e.x,n-e.z)<Rg(e)+r}function Bg(e,t,n,{cityStreets:r=e.cityStreets??jg,groundCache:i}={}){let a=Object.fromEntries(Mg.map(e=>[e,[]])),o=kg.radius+kg.padding,s=(t??jg).filter(t=>et(e,t,n)<o+Rg(t)).sort((t,r)=>et(e,t,n)-et(e,r,n)||Lg(t).localeCompare(Lg(r)));function c(e,t,n,r,i,o,s,c,l,u=0,d){let f={id:n,anchor:t,x:r,y:i,z:o,sx:s,sy:c,sz:l,rotation:u,color:d??Ng[e][Pg(n)%Ng[e].length]};return a[e].length<kg[e]&&a[e].push(f),f}for(let t of s){let r=Lg(t);if(t.kind===`farm`&&t.width&&t.depth){let i=je(e,t,n),s=t.rotation??0,l=t.scale??1,u={x:(i.x*Math.cos(s)-i.z*Math.sin(s))/l,z:(i.x*Math.sin(s)+i.z*Math.cos(s))/l},d=o/l;for(let[e,n]of(t.parcels??[{x:0,z:0,width:t.width,depth:t.depth,variant:t.variant}]).entries()){let i=n.crop??[`wheat`,`vegetables`,`lavender`][((n.variant??t.variant??0)%3+3)%3];if(![`wheat`,`lavender`,`pasture`,`vegetables`,`orchard`].includes(i))continue;let o=$s(n),s=Zs(Qs(n,t.variant)),l=tc(o,n.feature,n.featurePosition,s),f=n.rowsAngle??(n.rowsAlong===`x`?0:Math.PI/2),p=Math.cos(f),m=Math.sin(f),h=i===`pasture`||i===`orchard`;if(a[h?`grass`:`crops`].length>=kg[h?`grass`:`crops`])continue;let g=Math.max(.4,n.rowPitch??(i===`vegetables`?.8:1.35)),_=Math.hypot(n.width,n.depth)/2,v=h?.55:.27,y=Ig(o,.25);if(y.length<3)continue;let b=u.x-(n.x??0),x=u.z-(n.z??0),S=(e,t)=>(e-b)**2+(t-x)**2<d*d;if(h){let i=Math.ceil(Math.max(-n.width/2,b-d)/v),s=Math.floor(Math.min(n.width/2,b+d)/v),u=Math.ceil(Math.max(-n.depth/2,x-d)/v),f=Math.floor(Math.min(n.depth/2,x+d)/v);for(let d=i;d<=s;d++)for(let i=u;i<=f&&!(a.grass.length>=kg.grass);i++){let a=`${r}:parcel:${e}:sward:${d}:${i}`,s=Zs(Pg(a)),u=(d+(s()-.5)*.45)*v,f=(i+(s()-.5)*.45)*v;!S(u,f)||!ec(o,u,f,.33)||l&&Math.hypot(u-l.center[0],f-l.center[1])<l.radius+.33||c(`grass`,t,a,(n.x??0)+u,.055,(n.z??0)+f,.57,.13+s()*.07,.57,s()*Ag,`meadow`)}continue}let C=y.map(([e,t])=>-e*m+t*p),w=Math.min(...C),T=Math.max(...C),E=Math.max(1,Math.min(18,Math.round((T-w)/g))),D=(T-w)/E,O=0,k=b*p+x*m,A=-b*m+x*p,j=Array.from({length:E},(e,t)=>t).sort((e,t)=>Math.abs(w+(e+.5)*D-A)-Math.abs(w+(t+.5)*D-A)),M=Math.ceil(Math.max(-_,k-d)/v)*v,N=Math.min(_,k+d),P=[];for(let e=M;e<=N;e+=v)P.push(e);P.sort((e,t)=>Math.abs(e-k)-Math.abs(t-k));for(let s of j)for(let u of P){if(++O>3600||a.crops.length>=kg.crops)break;let d=w+(s+.5)*D,f=u*p-d*m,h=u*m+d*p;if(!S(f,h)||!ec(o,f,h,.3)||l&&Math.hypot(f-l.center[0],h-l.center[1])<l.radius+.3||l&&Math.abs(d-(-l.center[0]*m+l.center[1]*p))<l.radius+D*.25&&Math.abs(u-(l.center[0]*p+l.center[1]*m))<l.radius+.12)continue;let g=`${r}:parcel:${e}:${u.toFixed(3)}:${d.toFixed(3)}`,_=Zs(Pg(g)),v=i===`vegetables`?.12+_()*.07:i===`lavender`?.24+_()*.06:.32+_()*.09;c(`crops`,t,g,(n.x??0)+f,.06,(n.z??0)+h,.32,v,.32,_()*Ag,i===`lavender`?`lavender`:i===`vegetables`?`leafLight`:`wheat`)}}}}if(!Ct(e)&&e.biomes){let t=new _o(5);for(let n of[...s,...e.stations??[]])n.kind!==`sheep`&&t.insert(n,uo(n.x,n.z,Rg(n)+.3));let l=yo(e.lines??jg),u=yo(r),d=.6,f=Og(e),p=(e,t,n)=>n.nearby.length&&l.query(uo(e,t,2.5)).some(r=>{if(Fg(e,t,r)>=2.5)return!1;let i=r.line,a=i.distances?.[r.index]??0,o=i.distances?.[r.index+1]??i.length;return(i.cuts??i.tunnels??jg).some(e=>!n.nearby.some(t=>t.id===e.mountainId)||o<(e.cutStart??e.start)-2||a>(e.cutEnd??e.end)+2?!1:!(i.tunnels??jg).some(t=>t.mountainId===e.mountainId&&t.start<e.end&&t.end>e.start)||n.height<Math.max(r.a.y??.42,r.b.y??.42)+3.6)}),m=Math.round(n.x/kg.refreshDistance)*kg.refreshDistance,h=Math.round(n.z/kg.refreshDistance)*kg.refreshDistance,g=[];for(let t=Math.floor((m-o)/d);t<=Math.ceil((m+o)/d);t++)for(let r=Math.floor((h-o)/d);r<=Math.ceil((h+o)/d);r++){let i=`ground:${e.seed??0}:${t}:${r}`,a=Zs(Pg(i)),s=(t+.3+a()*.4)*d,c=(r+.3+a()*.4)*d,l=(s-n.x)**2+(c-n.z)**2;l>o*o||g.push({id:i,r:a,x:s,z:c,distance:l})}g.sort((e,t)=>e.distance-t.distance);for(let{id:n,r,x:o,z:s}of g){if(i?.has(n)){for(let[e,t]of i.get(n)??jg)a[e].length<kg[e]&&a[e].push(t);continue}i?.set(n,null);let d=[],m=(e,...t)=>{let n=c(e,...t);d.push([e,n])},h=ss(e,o,s);if(![`plains`,`forest`,`farmland`,`desert`,`mountain`].includes(h)||!ls(e,[`plains`,`forest`,`farmland`,`desert`,`mountain`],o,s,.35)||vc(e,o,s)<1.1||t.query(uo(o,s,.4)).some(e=>zg(e,o,s))||l.nearest(o,s,e=>Fg(o,s,e),1.34)<1.34||u.nearest(o,s,e=>Fg(o,s,e)-(e.line.width??1)/2,.4,1.5)<.4)continue;let g=f.sample(o,s);if(p(o,s,g))continue;let _=f.vegetation(o,s,g),v=r(),y={x:o,y:g.height-.006,z:s,rotation:0,scale:1},b=.5+.5*Math.sin(o*.21+Math.sin(s*.17))*Math.cos(s*.25-o*.08);if(v<_.density){let e=(.18+b*.09+r()*.04)*_.heightScale,t=r()*Ag,i=c(`grass`,y,n,0,0,0,.65,e,.65,t,`grass`);if(i.colorRGB=_.color,d.push([`grass`,i]),g.nearby.length){let e=Math.cos(t),n=Math.sin(t);i.rootHeights=gg.map(([t,r])=>f.heightAt(o+(t*e+r*n)*i.sx,s+(-t*n+r*e)*i.sz,g)-g.height)}v<.012&&b>.5&&_.density>.8&&m(`flowers`,y,`${n}:flower`,0,e*.82,0,.035,.025,.035,r()*Ag)}else v>.986&&_.density<.3&&m(`pebbles`,y,`${n}:stone`,0,.025,0,.07+r()*.08,.035+r()*.03,.07,r()*Ag,`desertRock`);i&&i.set(n,d)}if(i?.size>18e3){for(let e of i.keys())if(i.delete(e),i.size<=14e3)break}}return a}function Vg(e,t){let n=new q;n.name=`walking-close-detail`,n.visible=!1,e.add(n);let r={value:new X},i={value:0},a={value:new X},o={value:1},s={},c=new V,l=new V,u=new V,d=new X,f=new X,p=new N,m=new X(0,1,0),h=new H;for(let e of Mg){let t=e===`grass`||e===`crops`,c=t?hg({crop:e===`crops`}):new Me(1,0);if(e===`grass`)for(let e=0;e<6;e++)c.setAttribute(`grassRoots${e}`,new nt(new Float32Array(kg.grass*4),4).setUsage(O));let l=Ut(new ne({color:16777215,flatShading:!t,side:t?2:0}));_g(l,{focus:r,time:i,player:a,visibility:o},e);let u=new Tt(c,l,kg[e]);u.name=`walking-${e}`,u.setColorAt(0,Z.white),u.count=0,u.frustumCulled=!1,u.castShadow=!1,u.receiveShadow=!0,u.instanceMatrix.setUsage(O),n.add(u),s[e]=u}let _={builds:0,instances:0,drawCalls:Mg.length,ready:!1},v=null,y=-1,b=null,x={x:1/0,z:1/0},S=!1,C=[],w=[],T=new Map,E=(e,t)=>{if(e.length!==t.length)return!1;let n=new Set(e);return t.every(e=>n.has(e))};function D(e,n){let r=kg.radius+kg.padding;return e.filter(e=>e.points?.some((i,a)=>et(t,i,n)<r+(e.width??1)||!Ct(t)&&a>0&&Fg(n.x,n.z,{a:e.points[a-1],b:i})<r+(e.width??1)))}function k(e,{placements:O=jg,revision:k=0,visible:A=!1,visibilityWeight:j=1,time:M=0,playerPosition:N=e,cityStreets:P=t.cityStreets??jg}={}){if(S||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return;n.visible=A,Be(t,e.x,e.y??0,e.z,r.value),i.value=M,Be(t,N.x,N.y??0,N.z,a.value),o.value=g.clamp(j,0,1);let F=O!==v||k!==y||P!==b,I=!Number.isFinite(x.x)||et(t,e,x)>=kg.refreshDistance;if(!F&&!I)return;let ee=kg.radius+kg.padding,L=O.filter(n=>et(t,n,e)<ee+Rg(n)),R=D(P,e),z=!E(C,L)||!E(w,R);if(v=O,y=k,b=P,!I&&!z&&_.ready)return;F&&z&&T.clear(),C=L,w=R;let te=Bg(t,C,e,{cityStreets:w,groundCache:T}),ne=0;for(let e of Mg){let n=s[e],r=te[e];n.count=r.length,ne+=r.length;for(let[i,a]of r.entries()){let r=a.anchor;if(Ke(t,r.x,r.y??0,r.z,r.rotation??0,c),c.scale(f.setScalar(r.scale??1)),d.set(a.x,a.y,a.z),f.set(a.sx,a.sy,a.sz),p.setFromAxisAngle(m,a.rotation),l.compose(d,p,f),u.multiplyMatrices(c,l),n.setMatrixAt(i,u),n.setColorAt(i,a.colorRGB?h.fromArray(a.colorRGB):Z[a.color]??Z.grass),e===`grass`)for(let e=0;e<6;e++){let t=n.geometry.attributes[`grassRoots${e}`],o=a.rootHeights,s=e*4,c=a.sy*(r.scale??1);t.setXYZW(i,(o?.[s]??0)/c,(o?.[s+1]??0)/c,(o?.[s+2]??0)/c,(o?.[s+3]??0)/c)}}if(e===`grass`)for(let e=0;e<6;e++)n.geometry.attributes[`grassRoots${e}`].needsUpdate=!0;n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}x={x:e.x,z:e.z},Object.assign(_,{builds:_.builds+1,instances:ne,ready:!0})}function A(){if(!S){S=!0;for(let e of Object.values(s))e.geometry.dispose(),e.material.dispose(),e.dispose();n.removeFromParent()}}return{root:n,stats:_,update:k,dispose:A}}function Hg(e,{isActive:t,onToggle:n,onExit:r,onKey:i=()=>!1}){let a=new Set,o=[],s=null,c=0,l=0,u=!1,d=!1,f=e.ownerDocument,p=f.defaultView??globalThis.window;function m(e,t,n,r){e.addEventListener(t,n,r),o.push(()=>e.removeEventListener(t,n,r))}function h(){let t=s?.id;a.clear(),s=null,c=l=0,u=d=!1,t!==void 0&&e.hasPointerCapture?.(t)&&e.releasePointerCapture(t)}function g(e){e.preventDefault(),e.stopImmediatePropagation()}m(e,`keydown`,e=>{if(e.altKey||e.metaKey||e.ctrlKey)return;if(i(e)){g(e);return}let o=e.key.toLowerCase();o===`v`?(g(e),e.repeat||(h(),n())):t()&&([`w`,`a`,`s`,`d`,` `,`e`,`shift`,`arrowleft`,`arrowright`,`arrowup`,`arrowdown`].includes(o)?(o===` `&&!a.has(o)&&!e.repeat&&(u=!0),o===`e`&&!a.has(o)&&!e.repeat&&(d=!0),a.add(o),g(e)):o===`escape`||o===`home`?(g(e),h(),r()):[`f`,`r`,`[`,`]`,`+`,`-`,`=`,`_`].includes(o)&&g(e))},!0);let _=e=>{a.delete(e.key.toLowerCase())};m(e,`keyup`,_),m(p,`keyup`,_),m(e,`blur`,h),m(p,`blur`,h),m(f,`visibilitychange`,()=>{f.hidden&&h()}),m(e,`pointerdown`,n=>{t()&&(g(n),e.focus?.({preventScroll:!0}),s||(s={id:n.pointerId,x:n.clientX,y:n.clientY,startX:n.clientX,startY:n.clientY,click:(n.button??0)===0&&n.isPrimary!==!1},e.setPointerCapture?.(n.pointerId)))},!0);function v(e){(e.clientX-s.startX)**2+(e.clientY-s.startY)**2>25&&(s.click=!1)}m(e,`pointermove`,e=>{t()&&s?.id===e.pointerId&&(v(e),g(e),c-=(e.clientX-s.x)*.005,l+=(e.clientY-s.y)*.004,s.x=e.clientX,s.y=e.clientY)},!0);let y=n=>{s?.id===n.pointerId&&(n.type===`pointerup`&&(v(n),t()&&s.click&&(n.button??0)===0&&(d=!0)),s=null,e.hasPointerCapture?.(n.pointerId)&&e.releasePointerCapture(n.pointerId))};return m(p,`pointerup`,y),m(p,`pointercancel`,y),m(e,`lostpointercapture`,y),m(e,`wheel`,e=>{t()&&g(e)},{capture:!0,passive:!1}),m(e,`contextmenu`,e=>{t()&&e.preventDefault()}),{clear:h,sample(e=0){let t={forward:Number(a.has(`w`))-Number(a.has(`s`)),right:Number(a.has(`d`))-Number(a.has(`a`)),jump:u||a.has(` `),sprint:a.has(`shift`),swing:d,lookX:c+(Number(a.has(`arrowleft`))-Number(a.has(`arrowright`)))*e*1.6,lookY:l+(Number(a.has(`arrowdown`))-Number(a.has(`arrowup`)))*e*1.1};return c=l=0,u=d=!1,t},dispose(){h();for(let e of o)e()}}}function Ug(t){let n=new Ze;n.setAttribute(`position`,new e([-1,-1,0,3,-1,0,-1,3,0],3));let r={inverseProjection:{value:new V},cameraWorld:{value:new V},skyUp:{value:new X(0,1,0)},sunDirection:{value:new X(-65,110,65).normalize()},horizonColor:{value:new H(12113369)},dayZenith:{value:new H(6005971)},nightZenith:{value:new H(463398)},cloudColor:{value:new H(16052702)},sunColor:{value:new H(16771782)},night:{value:0},strength:{value:1}},i=new M({name:`walking-sky`,uniforms:r,depthWrite:!1,depthTest:!0,toneMapped:!1,fog:!1,vertexShader:`uniform mat4 inverseProjection; uniform mat4 cameraWorld; varying vec3 skyRay;
      void main(){
        vec4 ray = inverseProjection * vec4(position.xy, 1.0, 1.0);
        skyRay = mat3(cameraWorld) * ray.xyz;
        gl_Position = vec4(position.xy, 1.0, 1.0);
      }`,fragmentShader:`uniform vec3 skyUp; uniform vec3 sunDirection; uniform vec3 horizonColor;
      uniform vec3 dayZenith; uniform vec3 nightZenith; uniform vec3 cloudColor; uniform vec3 sunColor;
      uniform float night; uniform float strength; varying vec3 skyRay;
      float cloudLobe(vec2 p, vec2 center, vec2 size){
        vec2 q = (p-center)/size;
        return exp2(-dot(q,q)*2.8);
      }
      void main(){
        vec3 ray = normalize(skyRay);
        float elevation = dot(ray, skyUp);
        float altitude = max(elevation, 0.0);
        float horizonClearance = smoothstep(0.012, 0.14, altitude);
        vec3 color = mix(horizonColor, mix(dayZenith, nightZenith, night), pow(altitude, 0.62));
        float sunFacing = max(dot(ray, sunDirection), 0.0);
        float warmHaze = pow(sunFacing, 10.0) * pow(1.0-altitude, 2.0) * horizonClearance;
        color = mix(color, sunColor, warmHaze * 0.32 * (1.0-night));
        // Two quiet cloud banks are world-oriented, not painted onto the
        // screen. Analytic lobes avoid texture fetches and expensive noise.
        vec3 reference = abs(skyUp.y)<0.92 ? vec3(0.,1.,0.) : vec3(0.,0.,1.);
        vec3 east = normalize(cross(reference,skyUp));
        vec3 north = cross(skyUp,east);
        vec2 cloudPlane = vec2(dot(ray,east),dot(ray,north))/max(altitude,0.08);
        float cloud = cloudLobe(cloudPlane,vec2(-2.0,1.6),vec2(1.20,0.23))
          + cloudLobe(cloudPlane,vec2(-1.75,1.64),vec2(0.54,0.40))*0.55
          + cloudLobe(cloudPlane,vec2(2.4,-0.8),vec2(1.30,0.28))
          + cloudLobe(cloudPlane,vec2(2.8,-0.75),vec2(0.53,0.43))*0.45;
        cloud = smoothstep(0.20,0.90,cloud) * horizonClearance;
        color = mix(color, cloudColor, cloud * 0.52 * (1.0-night));
        float sunDisc = smoothstep(0.99989,0.99997,sunFacing) * horizonClearance * (1.0-night);
        color = mix(color, sunColor, sunDisc * 0.80);
        // Exactly the fog/background color at and below the horizon avoids a
        // hard seam where distant terrain fades into the atmospheric band.
        gl_FragColor = vec4(mix(horizonColor,color,strength),1.0);
        #include <colorspace_fragment>
      }`}),a=new Y(n,i);a.name=`walking-sky`,a.visible=!1,a.frustumCulled=!1,a.renderOrder=-1001,t.add(a);let o=!1;function s(e,{visible:n=!1,strength:i=1,night:s=0,up:c=e?.up,sunDirection:l,horizonColor:u=t.background}={}){o||(a.visible=n,e&&(e.updateMatrixWorld(),r.inverseProjection.value.copy(e.projectionMatrixInverse),r.cameraWorld.value.copy(e.matrixWorld)),r.night.value=g.clamp(Number.isFinite(s)?s:0,0,1),r.strength.value=g.clamp(Number.isFinite(i)?i:1,0,1),c?.isVector3&&c.lengthSq()>1e-12&&r.skyUp.value.copy(c).normalize(),l?.isVector3&&l.lengthSq()>1e-12&&r.sunDirection.value.copy(l).normalize(),u?.isColor&&r.horizonColor.value.copy(u))}function c(){o||(o=!0,a.removeFromParent(),n.dispose(),i.dispose())}return{root:a,update:s,dispose:c}}var Wg=(e,t,n)=>e+(t-e)*n,Gg=(e,t,n)=>Math.exp(Wg(Math.log(Math.max(1e-6,e)),Math.log(Math.max(1e-6,t)),n)),Kg=e=>e*e*e*(e*(e*6-15)+10);function qg(e,t){e.updateMatrixWorld(!0);let n=new X().copy(t),r=e.position.clone().sub(n),i=Math.max(.001,r.length()),a=e.userData.characterProjection,o=a?.perspective??+!e.isOrthographicCamera,s=e.clone();return s.isOrthographicCamera=!!e.isOrthographicCamera,s.isPerspectiveCamera=!s.isOrthographicCamera,{camera:s,target:n,distance:i,localDirection:r.divideScalar(i).applyQuaternion(e.quaternion.clone().invert()),halfHeight:a?.halfHeight??(e.isOrthographicCamera?1:i)/e.projectionMatrix.elements[5],aspect:Math.abs(e.projectionMatrix.elements[5]/e.projectionMatrix.elements[0]),perspective:o,near:e.near,far:e.far}}function Jg(e,t,n){if(!e||!Number.isFinite(e.radius)||e.radius<=0)return null;let r=new X().copy(e.center),i=t.target.clone().sub(r),a=n.target.clone().sub(r),o=i.length(),s=a.length();if(o<1e-6||s<1e-6)return null;i.divideScalar(o),a.divideScalar(s);let c=new X().crossVectors(i,a),l=c.length(),u=g.clamp(i.dot(a),-1,1),d=Math.atan2(l,u);l>1e-12?c.divideScalar(l):u<0?(c.crossVectors(i,Math.abs(i.x)<.9?new X(1,0,0):new X(0,0,1)).normalize(),d=Math.PI):(c.set(0,1,0),d=0);let f=new N().setFromAxisAngle(c,d),p=f.clone().invert();return{center:r,radius:e.radius,start:i,startRadius:o,endRadius:s,arc:f,endOrientation:n.camera.quaternion.clone().premultiply(p),endUp:n.camera.up.clone().applyQuaternion(p)}}function Yg({duration:e=.78,reducedMotion:t={matches:!1}}={}){let n=new w,r=new X;n.name=`character-transition-camera`;let i=new X,a=new X,o=new N,s=new N,c=!1,l=0,u=e,d=null,f=null,p=!1,m=0,h=0,g=null;function _(e){let t=e.camera;n.position.copy(t.position),n.quaternion.copy(t.quaternion),n.up.copy(t.up),n.near=t.near,n.far=t.far,n.zoom=t.zoom,n.aspect=e.aspect,n.projectionMatrix.copy(t.projectionMatrix),n.projectionMatrixInverse.copy(t.projectionMatrixInverse),n.isOrthographicCamera=!!t.isOrthographicCamera,n.isPerspectiveCamera=!n.isOrthographicCamera,n.userData.characterProjection={perspective:e.perspective,halfHeight:e.halfHeight},r.copy(e.target),n.updateMatrixWorld(!0)}function v(){return f&&(_(f),c=!1,l=u,m=Number(p)),n}function y(e){if(!c)return n;if(t.matches||(l=Math.min(u,l+Math.max(0,Number.isFinite(e)?e:0)),l>=u))return v();let _=Kg(l/u),y=Wg(d.perspective,f.perspective,_),b=Gg(d.distance,f.distance,_),x=Gg(d.halfHeight,f.halfHeight,_);if(g?(o.slerpQuaternions(s,g.arc,_),a.copy(g.start).applyQuaternion(o),r.copy(g.center).addScaledVector(a,Wg(g.startRadius,g.endRadius,_)),n.quaternion.slerpQuaternions(d.camera.quaternion,g.endOrientation,_).premultiply(o),n.up.lerpVectors(d.camera.up,g.endUp,_).applyQuaternion(o).normalize()):(n.quaternion.slerpQuaternions(d.camera.quaternion,f.camera.quaternion,_),n.up.lerpVectors(d.camera.up,f.camera.up,_).normalize(),r.lerpVectors(d.target,f.target,_)),i.lerpVectors(d.localDirection,f.localDirection,_).normalize().applyQuaternion(n.quaternion),n.position.copy(r).addScaledVector(i,b),g){let e=r.distanceTo(g.center)-g.radius,t=Math.max(.025,.05-e),o=i.dot(a)*b;o<t&&(n.position.addScaledVector(a,t-o),n.up.copy(a),n.lookAt(r))}n.near=Gg(d.near,f.near,_),n.far=Gg(d.far,f.far,_),n.aspect=Wg(d.aspect,f.aspect,_),n.zoom=Wg(d.camera.zoom,f.camera.zoom,_);let S=1-y+y*n.near/b,C=-(1-y+y*n.far/b+S)/(n.far-n.near),w=-S+C*n.near;return n.projectionMatrix.set(1/(x*n.aspect),0,0,0,0,1/x,0,0,0,0,C,w,0,0,-y/b,1-y),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.isPerspectiveCamera=!0,n.isOrthographicCamera=!1,n.userData.characterProjection={perspective:y,halfHeight:x},n.updateMatrixWorld(!0),m=Wg(h,Number(p),_),n}return{camera:n,target:r,update:y,finish:v,get active(){return c},get toWalking(){return p},get walkingWeight(){return m},get progress(){return u>0?Math.min(1,l/u):1},begin({fromCamera:i,toCamera:a,fromTarget:o,toTarget:s,toWalking:y,sphere:b}){let x=c,S=qg(i,o??r),C=qg(a,s);return h=x?m:Number(!y),d=S,f=C,p=!!y,l=0,g=Jg(b,d,f),u=Math.max(.16,e*Math.abs(Number(p)-h)),m=h,_(d),c=!0,t.matches&&v(),n}}}function Xg(){let t=[],n=[],r=(e,r,i)=>{t.push(Math.cos(r)*e,Math.sin(r)*e,0),n.push(i.r,i.g,i.b)};for(let[e,t,n]of[[0,.61,Z.redLight],[.61,.87,Z.trim],[.87,1,Z.teal]])for(let i=0;i<40;i++){let a=i/40*Math.PI*2,o=(i+1)/40*Math.PI*2;r(e,a,n),r(t,a,n),r(t,o,n),e>0&&(r(e,a,n),r(t,o,n),r(e,o,n))}let i=new Ze;return i.setAttribute(`position`,new e(t,3)),i.setAttribute(`color`,new e(n,3)),i.computeBoundingSphere(),i}function Zg(e,t,n){let r=Xg(),i=new a({vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),o=new Y(r,i),s=new Y(r,i.clone());o.name=`character-overview-marker`,s.name=`character-map-marker`,o.renderOrder=s.renderOrder=20,o.visible=s.visible=!1,e.add(o),t.add(s);let c=new X,l=new X,u=new X,d=new X,f=new X,p=new X,m=new X,h=!1,_=(e,t,n)=>{let r=g.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function v(e,t,n){f.copy(t).applyMatrix4(e.matrixWorldInverse);let r=e.projectionMatrix.elements,i=r[3]*f.x+r[7]*f.y+r[11]*f.z+r[15];return 2*Math.abs(i)/(Math.max(1,n)*Math.abs(r[5]))}return{root:o,mapRoot:s,get characterReadable(){return h},update({position:e,initialized:t=!1,camera:r,mapBlend:i=0,walking:a=!1,walkingWeight:f=+!!a,viewportHeight:g=800}={}){if(o.visible=s.visible=h=!1,!t||!e||!r||(r.updateMatrixWorld(!0),Be(n,e.x,e.y??0,e.z,c),rt(n,e.x,e.z,l),Ct(n)&&l.dot(d.copy(r.position).sub(c))<=0)||(u.copy(c).addScaledVector(l,nm),p.copy(c).project(r),m.copy(u).project(r),p.z<-1||p.z>1||Math.abs(p.x)>1.08||Math.abs(p.y)>1.08))return;let y=Math.abs(m.y-p.y)*g/2;h=y>=5;let b=(1-_(4,12,y))*(1-_(.3,.9,f));b>.001&&i<.999&&(o.visible=!0,o.position.copy(c).addScaledVector(l,nm*.57),o.quaternion.copy(r.quaternion),o.scale.setScalar(v(r,o.position,g)*5.4),o.material.opacity=b),i>.001&&(s.visible=!0,Be(n,e.x,Ct(n)?2.4:.62,e.z,s.position),s.quaternion.copy(r.quaternion),s.scale.setScalar(v(r,s.position,g)*6.5),s.material.opacity=1)},dispose(){o.removeFromParent(),s.removeFromParent(),r.dispose(),o.material.dispose(),s.material.dispose()}}}var Qg=Object.freeze({faces:256,radius:360});function $g(e,t){let n=new q;n.name=`town-clock-hands`,e.add(n);let r=new Tt(new d(1,1,1),Gt.metal,Qg.faces*2);r.name=`clock-hands`,r.count=0,r.instanceMatrix.setUsage(O),r.frustumCulled=!1,r.castShadow=!1,n.add(r);let i=[],a=new V,o=new V,s=new V,c=new Rt,l=null,u=-1,f=null,p=-1;function m(e,n){i.length=0;let r=[];for(let i of e){let e=Zp(i.kind,i.variant);if(!e.length)continue;let a=et(t,i,n);a<=Qg.radius&&r.push({item:i,specs:e,distance:a})}r.sort((e,t)=>e.distance-t.distance);for(let{item:e,specs:n}of r){Ke(t,e.x,e.y??0,e.z,e.rotation??0,a);let r=e.scale??1;a.scale(new X(r,r,r));for(let e of n){if(i.length===Qg.faces)break;c.position.set(e.x,e.y,e.z),c.rotation.set(0,e.rotation,0),c.scale.set(1,1,1),c.updateMatrix(),o.copy(a).multiply(c.matrix),i.push({matrix:o.clone(),radius:e.radius})}}p=-1}return{root:n,hands:r,update(e,{focus:a={x:0,z:0},placements:o=[],revision:d=0,visible:h=!0,reducedMotion:g=!1}={}){if(n.visible=h,!h)return;(o!==l||d!==u||!f||et(t,a,f)>16)&&(m(o,a),l=o,u=d,f={x:a.x,z:a.z});let _=g?0:Math.floor(e*12)/12;if(_===p)return;p=_;let v=0;for(let e of i)for(let[t,n]of Qp.entries()){let i=$p(_,t),a=e.radius*n.length;c.position.set(-Math.sin(i)*a*.43,Math.cos(i)*a*.43,n.z),c.rotation.set(0,0,i),c.scale.set(e.radius*n.width,a,.008),c.updateMatrix(),s.copy(e.matrix).multiply(c.matrix),r.setMatrixAt(v++,s)}r.count=v,r.instanceMatrix.needsUpdate=!0},dispose(){r.dispose(),r.geometry.dispose(),n.removeFromParent(),i.length=0}}}var e_=Object.freeze({width:.45,houseWidth:2.2,houseDepth:2.2,doorOffset:.9,landingOffset:1.52,clearance:.04,step:.45,maxSlope:.32,sampleSpacing:.18,maxNodes:3200}),t_=new Set([`house`,`tree`,`rock`,`farm`,`cactus`,`landmark`,`station`,`apartment`,`civic`,`tower`]),n_=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),r_=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z),i_=e=>e.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[e.kind]??1)*(e.scale??1);function a_(e,t,n){let r=null,i=1/0;for(let a of n){let n=je(e,t,a),o=Math.hypot(n.x,n.z);o<i&&(i=o,r=a)}return Number.isFinite(r?.rotation)?r.rotation:0}function o_(e,t,n=e_.doorOffset){let r=t.rotation??0;return Ue(e,t.x,t.z,Math.sin(r)*n,Math.cos(r)*n)}function s_(e,t,n=e_.sampleSpacing){for(let r=1;r<e.length;r++){let i=e[r-1],a=e[r],o=Math.max(1,Math.ceil(n_(i,a)/n));for(let e=r===1?0:1;e<=o;e++){let n=e/o;if(t({x:i.x+(a.x-i.x)*n,z:i.z+(a.z-i.z)*n})===!1)return!1}}return!0}function c_(e,t,n,r=.12){let i=e_.houseWidth/2,a=e_.houseDepth/2,o=(n.width??e_.width)/2+r,s=Math.cos(t.rotation??0),c=Math.sin(t.rotation??0);return!s_(n.points,n=>{let r=je(e,t,n),l=r.x*s-r.z*c,u=r.x*c+r.z*s,d=Math.max(0,Math.abs(l)-i),f=Math.max(0,Math.abs(u)-a);return d*d+f*f>=o*o})}var l_=class{constructor(){this.items=[]}push(e){let t=this.items;t.push(e);let n=t.length-1;for(;n;){let r=n-1>>1;if(t[r].score<=e.score)break;t[n]=t[r],n=r}t[n]=e}pop(){let e=this.items,t=e[0],n=e.pop();if(e.length){let t=0;for(;t*2+1<e.length;){let r=t*2+1;if(r+1<e.length&&e[r+1].score<e[r].score&&r++,e[r].score>=n.score)break;e[t]=e[r],t=r}e[t]=n}return t}get length(){return this.items.length}};function u_(e,t,n,{placements:r=[],surfaceAt:i,removedTreeIds:a=new Set,width:o=e_.width}={}){if(!r_(t)||!r_(n)||typeof i!=`function`)return null;let s=o_(e,t,e_.landingOffset),c=o_(e,n,e_.landingOffset),l=o_(e,t),u=o_(e,n),d=o/2+e_.clearance,f=Math.min(s.x,c.x)-4,p=Math.max(s.x,c.x)+4,m=Math.min(s.z,c.z)-4,h=Math.max(s.z,c.z)+4,g=[],_=new Set;for(let e of[t,n,...r]){if(!r_(e)||!(t_.has(e.kind)||e.kind===`nature`&&e.style===`outcrop`)||e.id!=null&&_.has(e.id)||(e.id!=null&&_.add(e.id),e.kind===`tree`&&a.has(String(e.id??`tree:${e.x}:${e.z}:${e.variant??0}`))))continue;let t=i_(e),n=e.scale??1;if(e.x+t<f||e.x-t>p||e.z+t<m||e.z-t>h)continue;let r=e.kind===`house`||e.kind===`farm`&&e.width&&e.depth;g.push({item:e,rectangle:r,radius:t+d,c:Math.cos(e.rotation??0),s:Math.sin(e.rotation??0),halfWidth:(e.kind===`house`?e_.houseWidth:e.width??0)*n/2,halfDepth:(e.kind===`house`?e_.houseDepth:e.depth??0)*n/2})}let v=new Map,y=new Map,b=(e,t)=>`${Math.round(e*1e6)}:${Math.round(t*1e6)}`;function x(e,t){let n=b(e,t);return v.has(n)||v.set(n,i(e,t)),v.get(n)}function S(e,t){let n=b(e.x,e.z);if(!t&&y.has(n))return y.get(n);let r=C(e,t);return t||y.set(n,r),r}function C(t,n){for(let r of g){if(n===r.item)continue;let{item:i,c:a,s:o}=r,s=je(e,i,t);if(r.rectangle){let e=s.x*a-s.z*o,t=s.x*o+s.z*a,n=Math.max(0,Math.abs(e)-r.halfWidth),i=Math.max(0,Math.abs(t)-r.halfDepth);if(n*n+i*i<d*d)return!1}else if(s.x*s.x+s.z*s.z<r.radius*r.radius)return!1}let r=1/0,i=-1/0;for(let[e,n]of[[0,0],[o/2,0],[-o/2,0],[0,o/2],[0,-o/2]]){let a=x(t.x+e,t.z+n);if(!a||!Number.isFinite(a.height)||![`ground`,`mountain`].includes(a.type))return!1;r=Math.min(r,a.height),i=Math.max(i,a.height)}return i-r<=o*e_.maxSlope}function w(e,t,n){let r=null;return s_([e,t],e=>{if(!S(e,n))return!1;let t=x(e.x,e.z).height;return r&&Math.abs(t-r.height)>n_(e,r)*e_.maxSlope+.008?!1:(r={...e,height:t},!0)})}if(!w(l,s,t)||!w(c,u,n))return null;let T;if(w(s,c))T=[s,c];else{let e=e_.step,t=new Map,n=new l_,r=(e,t)=>`${e}:${t}`,i={x:s.x,z:s.z,ix:0,iz:0,cost:0,score:n_(s,c),parent:null};t.set(`0:0`,i),n.push(i);let a=null,o=0;for(;n.length&&o++<e_.maxNodes;){let i=n.pop();if(!(i.closed||t.get(r(i.ix,i.iz))!==i)){if(i.closed=!0,n_(i,c)<=e*1.5&&w(i,c)){a=i;break}for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++){if(!a&&!o)continue;let l=i.ix+a,u=i.iz+o,d=r(l,u),g=s.x+l*e,_=s.z+u*e;if(g<f||g>p||_<m||_>h)continue;let v=t.get(d);if(v?.closed||v?.blocked)continue;let y=v??{x:g,z:_,ix:l,iz:u};if(!v&&!S(y)){y.blocked=!0,t.set(d,y);continue}let b=i.cost+Math.hypot(a,o)*e;if(v&&b>=v.cost||!w(i,y))continue;let x={x:g,z:_,ix:l,iz:u,cost:b,score:b+n_(y,c),parent:i};t.set(d,x),n.push(x)}}}if(!a)return null;let l=[c];for(let e=a;e;e=e.parent)l.push({x:e.x,z:e.z});let u=l.reverse();T=[u[0]];for(let e=0;e<u.length-1;){let t=u.length-1;for(;t>e+1&&!w(u[e],u[t]);)t--;T.push(u[t]),e=t}}let E=[l,...T,u].filter((e,t,n)=>!t||n_(e,n[t-1])>.001).map(e=>({x:e.x,y:x(e.x,e.z).height+.015,z:e.z}));return{id:`path:${t.id??`preview`}:${n.id}`,fromHouseId:t.id??`preview`,toHouseId:n.id,width:o,points:E}}var d_=Object.freeze({houseCost:10,houseWidth:2.2,houseDepth:2.2,connectionRange:9,buildReach:7,chopReach:1.1,clearance:.22,maxHeightDifference:.14,playerRadius:.17,terrainSampleSpacing:.36}),f_=new Set([`house`,`tree`,`rock`,`farm`,`cactus`,`landmark`,`station`,`apartment`,`civic`,`tower`]),p_=e=>structuredClone(e),m_=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z);function h_(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}function g_(e){return e?.id==null?`tree:${e?.x}:${e?.z}:${e?.variant??0}`:String(e.id)}function __(e,t){return 2+h_(`${e}:${g_(t)}:logs`)%3}function v_(e){return{...e,width:d_.houseWidth,depth:d_.houseDepth,radius:Math.hypot(d_.houseWidth,d_.houseDepth)/2}}function y_(e,t,n,r,i=d_.clearance){let a=je(e,t,n),o=t.rotation??0,s=Math.cos(o),c=Math.sin(o),l=a.x*s-a.z*c,u=a.x*c+a.z*s,d=Math.max(0,Math.abs(l)-d_.houseWidth/2),f=Math.max(0,Math.abs(u)-d_.houseDepth/2);return d*d+f*f<(r+i)**2}function b_(e,t,n){let r=n.scale??1;return n.kind===`house`?Xs(e,v_(t),v_(n),d_.clearance):n.kind===`farm`&&n.width&&n.depth?Xs(e,v_(t),n,d_.clearance):y_(e,t,n,n.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[n.kind]??1)*r)}function x_(e,{config:t=e.gameplay,surfaceAt:n=(t,n)=>fl(e,t,n)}={}){if(!t?.starterHouse||!m_(t.starterHouse))throw TypeError(`Settlement requires a finite starter house`);let r=t.ownerId??t.starterHouse.ownerId??`teal`,i={...p_(t.starterHouse),kind:`house`,ownerId:r,cityId:`settlement`,connected:!0},a=[i],o=[],s=new Set,c=0,l=0,u=2;function d(){let e=new Map(a.map(e=>[e.id,e.id])),t=t=>{for(;e.get(t)!==t;)t=e.get(t);return t};for(let n of o){let r=t(n.fromHouseId),i=t(n.toHouseId);r!==i&&e.set(i,r)}return new Map(a.map(e=>[e.id,t(e.id)]))}function f(){let e=d(),t=e.get(i.id);for(let n of a)n.connected=e.get(n.id)===t,n.cityId=n.connected?`settlement`:null}function p(t,{player:i,placements:l=[],ready:f=!0,enforceReach:p=!0,isReadyAt:m}={}){let h=v_({kind:`house`,x:t?.x,z:t?.z,rotation:m_(t)?a_(e,t,a):0,scale:1,ownerId:r,variant:u%4}),g=null,_=1/0;if(m_(h)){for(let t of a)if(t.connected){let n=et(e,h,t);n<_&&(_=n,g=t.id)}}let v=_<=d_.connectionRange,y={house:h,cost:d_.houseCost,affordable:c>=d_.houseCost,connected:v,connectionHouseId:v?g:null,distanceToCity:_,path:null,paths:[]},b=(e,t)=>({...y,valid:!1,siteValid:!1,code:e,reason:t});if(!m_(h)||!Number.isFinite(h.rotation))return b(`invalid-position`,`Choose a place for your house`);if(!f)return b(`loading`,`Preparing this patch of ground`);if(i&&(!m_(i)||p&&et(e,i,h)>d_.buildReach))return b(`out-of-reach`,`Move closer to build here`);let x=Math.cos(h.rotation),S=Math.sin(h.rotation),C=1/0,w=-1/0,T=Math.ceil(d_.houseWidth/d_.terrainSampleSpacing),E=Math.ceil(d_.houseDepth/d_.terrainSampleSpacing);for(let t=0;t<=T;t++)for(let r=0;r<=E;r++){let i=d_.houseWidth*(t/T-.5),a=d_.houseDepth*(r/E-.5),o=Ue(e,h.x,h.z,i*x+a*S,a*x-i*S),s=n(o.x,o.z);if(!s||!Number.isFinite(s.height)||![`ground`,`mountain`].includes(s.type))return b(`wet-ground`,`Choose dry ground away from the shore`);C=Math.min(C,s.height),w=Math.max(w,s.height)}if(h.y=C,w-C>d_.maxHeightDifference)return b(`steep-ground`,`Find a flatter patch of ground`);if(i&&y_(e,h,i,d_.playerRadius,.12))return b(`player-blocked`,`Step away from the blueprint`);for(let t of a)if(b_(e,h,t))return b(`house-blocked`,`Leave a little room between houses`);for(let t of o)if(c_(e,h,t))return b(`path-blocked`,`Keep the village paths clear`);for(let t of l)if((f_.has(t.kind)||t.kind===`nature`&&t.style===`outcrop`)&&m_(t)&&!a.some(e=>e.id===t.id)&&!(t.kind===`tree`&&s.has(g_(t)))&&b_(e,h,t))return b(t.kind===`tree`?`tree-blocked`:`scenery-blocked`,t.kind===`tree`?`Chop this tree to clear the ground`:`This spot is already occupied`);let D=d(),O=new Map;for(let t of a){let n=et(e,h,t);if(n>d_.connectionRange)continue;let r=D.get(t.id);O.has(r)||O.set(r,[]),O.get(r).push({home:t,distance:n})}let k=[...O.values()].sort((e,t)=>Number(t[0].home.connected)-Number(e[0].home.connected));for(let t of k){t.sort((e,t)=>e.distance-t.distance);let r=null;for(let{home:i}of t)if(r=u_(e,h,i,{placements:[...a,...l],surfaceAt:n,removedTreeIds:s}),r)break;if(!r)return b(`path-blocked`,`Leave a clear route to the neighbouring houses`);if(m&&!s_(r.points,m))return b(`loading`,`Preparing the village path`);y.paths.push(r)}return y.path=y.paths[0]??null,y.affordable?{...y,valid:!0,siteValid:!0,code:`ready`,reason:v?`Joins your settlement`:`Starts a new outpost`}:{...y,valid:!1,siteValid:!0,code:`not-enough-logs`,reason:`Collect ${d_.houseCost-c} more ${d_.houseCost-c===1?`log`:`logs`}`}}function m(e,t){let n=p(e,t);if(!n.valid)return{ok:!1,...n};let r={...n.house,id:`home-${u++}`,connected:n.connected,cityId:n.connected?`settlement`:null};delete r.width,delete r.depth,a.push(r);let i=n.paths.map(e=>({...e,id:`path:${r.id}:${e.toHouseId}`,fromHouseId:r.id}));return o.push(...i),c-=d_.houseCost,f(),l++,{ok:!0,house:p_(r),paths:p_(i),cost:d_.houseCost,connected:r.connected,totalLogs:c}}function h(t,{player:n}={}){if(t?.kind!==`tree`||!m_(t))return{ok:!1,code:`not-a-tree`};let r=g_(t);if(s.has(r))return{ok:!1,code:`already-chopped`};if(n&&(!m_(n)||et(e,n,t)>d_.chopReach))return{ok:!1,code:`out-of-reach`};let i=__(e.seed,t);return s.add(r),c+=i,l++,{ok:!0,treeId:r,logs:i,totalLogs:c}}return{get logs(){return c},get revision(){return l},get ownerId(){return r},get houses(){return p_(a)},get paths(){return p_(o)},get removedTreeIds(){return new Set(s)},isTreeRemoved(e){return s.has(typeof e==`string`?e:g_(e))},snapshot(){return{logs:c,revision:l,ownerId:r,houses:p_(a),paths:p_(o),removedTreeIds:[...s]}},evaluateBuild:p,build:m,chop:h}}function S_(e,t,n){let r=new q,i=new q;r.name=`player-settlement`,i.name=`settlement-map`,e.add(r),t.add(i);let o=n.players.find(e=>e.id===n.gameplay.ownerId),s=Ll(o),c=[];for(let e=0;e<4;e++){let t=new q;cm(t,{variant:e,palette:s}),dm(Yp(t)),c.push(t)}let l=new d(2.2,2.2,2.2);l.translate(0,1.1,0);let u=new H(`#5dd9b4`),f=new H(`#ec565c`),p=new a({color:u,transparent:!0,opacity:.2,depthWrite:!1}),m=new Y(l,p),h=new Y(l,p);m.name=h.name=`settlement-blueprint`,m.visible=h.visible=!1,m.renderOrder=h.renderOrder=5,r.add(m),i.add(h);let g=new G(l),_=new He({color:u,transparent:!0,opacity:.72,depthWrite:!1});m.add(new It(g,_)),h.add(new It(g,_));function v(e=256){let t=new Ze;return t.setAttribute(`position`,new B(new Float32Array(e*3),3).setUsage(O)),t.setAttribute(`lineDistance`,new B(new Float32Array(e),1).setUsage(O)),t.setDrawRange(0,0),t}let y=v(),b=v(),x=new K({color:u,dashSize:.12,gapSize:.09,transparent:!0,opacity:.9,depthWrite:!1}),S=new It(y,x),C=new It(b,x);for(let e of[S,C])e.name=`settlement-path-preview`,e.visible=!1,e.frustumCulled=!1,e.renderOrder=9;r.add(S),i.add(C);let w=new q,T=new q;w.name=`settlement-paths`,T.name=`settlement-map-paths`,r.add(w),i.add(T);let E=new a({color:Z.sand,depthWrite:!1});function D(e){for(let e of[w,T]){for(let t of e.children)t.geometry.dispose();e.clear()}let t=Sh(w,{...n,cityStreets:e});for(let e of t){let t=e.geometry;e.geometry=Ql(t,.6),t.dispose();let r=e.geometry.attributes.position;for(let e=0;e<r.count;e++)r.setY(e,fl(n,r.getX(e),r.getZ(e)).height+bh);r.needsUpdate=!0,e.geometry.computeVertexNormals(),e.geometry.computeBoundingSphere(),e.castShadow=!1,e.receiveShadow=!0;let i=e.geometry.clone(),a=i.attributes.position;for(let e=0;e<a.count;e++)a.setY(e,.62);i.computeBoundingSphere();let o=new Y(i,E);o.renderOrder=7,T.add(o)}}let k=new Y(new ce(.26,.32,28),new a({color:16768918,side:2,depthWrite:!1}));k.rotation.x=-Math.PI/2,k.renderOrder=8,k.visible=!1,r.add(k);let A=new ee(1,5);A.rotateX(-Math.PI/2),A.rotateY(Math.PI);let j=new a({color:Il(o).body,depthWrite:!1}),M=new V,N=new V,P=[],F,I=0,L=0;function R(e,t=[]){if(D(t),e.length>I){for(let e of P)e.removeFromParent(),e.dispose();F?.removeFromParent(),F?.dispose(),I=Math.max(16,2**Math.ceil(Math.log2(e.length))),P=[];for(let e=0;e<4;e++)for(let t of c[e].children){let n=new Tt(t.geometry,t.material,I);n.userData.variant=e,n.count=0,n.castShadow=n.receiveShadow=!0,r.add(n),P.push(n)}F=new Tt(A,j,I),F.renderOrder=8,i.add(F)}for(let e of P)e.count=0;e.forEach((e,t)=>{Ke(n,e.x,e.y??0,e.z,e.rotation??0,M);for(let t of P)t.userData.variant===(e.variant??0)%4&&t.setMatrixAt(t.count++,M);N.makeScale(1.6,1,1.6),N.setPosition(e.x,.66,e.z),F.setMatrixAt(t,N)});for(let e of P)e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.computeBoundingBox();F.count=e.length,F.instanceMatrix.needsUpdate=!0,F.computeBoundingSphere(),L++,r.updateMatrixWorld(!0)}return{root:r,mapRoot:i,sync:R,get meshes(){return P.filter(e=>e.count>0&&e.material.userData.sceneStyle!==`window`)},get revision(){return L},preview(e,{visible:t=!1,targetTree:n=null}={}){if(m.visible=h.visible=t&&!!e?.house,S.visible=C.visible=!1,k.visible=!t&&!!n,k.visible&&(k.position.set(n.x,(n.y??0)+.025,n.z),k.scale.setScalar(Math.max(1,(n.scale??1)*1.15))),!m.visible)return;let r=e.house;m.position.set(r.x,r.y??0,r.z),m.rotation.y=r.rotation??0,h.position.set(r.x,.68,r.z),h.rotation.y=m.rotation.y,p.color.copy(e.valid?u:f),_.color.copy(p.color),S.material.color.copy(p.color);let i=e.paths??(e.path?[e.path]:[]),a=i.reduce((e,t)=>e+Math.max(0,t.points.length-1)*2,0);if(a){if(a>y.attributes.position.count){let e=2**Math.ceil(Math.log2(a));y.dispose(),b.dispose(),S.geometry=y=v(e),C.geometry=b=v(e)}let e=y.attributes.position,t=b.attributes.position,n=y.attributes.lineDistance,r=b.attributes.lineDistance,o=0;for(let{points:a}of i){let i=0;for(let s=1;s<a.length;s++){let c=a[s-1],l=a[s],u=Math.hypot(l.x-c.x,l.z-c.z);for(let[a,s]of[[c,i],[l,i+u]])e.setXYZ(o,a.x,(a.y??0)+.045,a.z),t.setXYZ(o,a.x,.69,a.z),n.setX(o,s),r.setX(o,s),o++;i+=u}}for(let e of[y,b])e.attributes.position.needsUpdate=e.attributes.lineDistance.needsUpdate=!0,e.setDrawRange(0,a);S.visible=C.visible=!0}},update({mapBlend:e=0}={}){r.visible=e<.999,i.visible=e>.001},dispose(){r.removeFromParent(),i.removeFromParent();for(let e of P)e.dispose();F?.dispose();for(let e of c){for(let t of e.children)t.geometry.dispose();for(let t of e.userData.ownedMaterials??[])t.dispose()}Object.values(s).forEach(e=>e.dispose()),y.dispose(),b.dispose(),x.dispose(),k.geometry.dispose(),k.material.dispose(),l.dispose(),p.dispose(),g.dispose(),_.dispose();for(let e of[w,T])for(let t of e.children)t.geometry.dispose();E.dispose(),A.dispose(),j.dispose()}}}var C_=e=>`<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">${e}</svg>`,w_={logs:C_(`<path fill="#775333" d="m3 17 16-9 10 6v10l-16 7-10-5z"/><path fill="#b7854b" d="m3 17 16-9 10 6-16 8z"/><path fill="#e9c891" d="m3 17 10 5v9L3 26z"/><path stroke="#87603b" stroke-width="1.4" d="m6 21 4 2v4l-4-2z"/>`),house:C_(`<path fill="#f4ead0" d="M6 13h20v15H6z"/><path fill="#bbccbb" d="M21 12h5v16h-5z"/><path class="settlement-owner-fill" d="m3 14 13-11 13 11z"/><path fill="#004e43" d="M13 20h6v8h-6z"/><path fill="#729b8e" d="M8 17h4v4H8zM21 17h3v4h-3z"/>`),axe:C_(`<path fill="#855831" d="m8 28 3 1L24 5l-3-2z"/><path fill="#dce5d1" d="m20 5-11-2-6 9 13 6z"/><path fill="#9db6b1" d="m16 18 4-13-5 8-12-1z"/><path fill="#f0d6a7" d="m9 25 3 2-1 2-3-1z"/>`),view:C_(`<path fill="#00594b" d="m2 15 14-9 14 9v6l-14 9-14-9z"/><path fill="#7da868" d="m2 15 14-9 14 9-14 9z"/><path fill="#a8c187" d="m2 15 14-9v18z"/><path fill="#dcceb0" d="m8 11 3-2 10 12-3 2z"/><path fill="#e7eee0" d="m14 12 4-3 4 3v5l-4 3-4-3z"/><path class="settlement-owner-fill" d="m12 12 6-5 6 5-6 3z"/>`),person:C_(`<path fill="#ddbc8b" d="M12 7h8v8h-8z"/><path fill="#cd665a" d="m10 6 4-3h8v5H10z"/><path class="settlement-owner-fill" d="M9 14h14v11H9z"/><path fill="#dfc8a1" d="M7 15h3v10H7zM22 15h3v10h-3z"/><path fill="#183f38" d="M11 25h4v6h-4zM17 25h4v6h-4z"/>`),link:C_(`<path stroke="#e8d6ac" stroke-width="3" d="M7 22v4h18v-4"/><path fill="#dfe4ca" d="M2 13h10v10H2zM20 13h10v10H20z"/><path class="settlement-owner-fill" d="m0 14 7-7 7 7zM18 14l7-7 7 7z"/><path fill="#14584a" d="M6 19h3v4H6zM24 19h3v4h-3z"/>`),outpost:C_(`<path fill="#e6d3ad" d="M7 3h3v25H7z"/><path fill="#f2cb79" d="m10 4 17 3-5 6 5 6-17-3z"/><path fill="#a8b38f" d="m3 28 6-5 6 5z"/>`),check:C_(`<path fill="currentColor" d="m3 17 5-5 7 7L26 5l5 4-16 20z"/>`),blocked:C_(`<path stroke="currentColor" stroke-width="3" d="m10 3 12 0 7 7v12l-7 7H10l-7-7V10zM8 8l16 16"/>`),tree:C_(`<path fill="#986b44" d="M14 20h4v10h-4z"/><path fill="#91b36a" d="m16 1 12 19-12 6-12-6z"/><path fill="#497e50" d="m16 1 12 19-12 6z"/>`),water:C_(`<path fill="#83b9cb" d="m16 2 11 16v7l-6 5H11l-6-5v-7z"/><path fill="#3c849e" d="m16 2 11 16v7l-6 5h-5z"/>`),close:C_(`<path fill="currentColor" d="m7 3 9 9 9-9 4 4-9 9 9 9-4 4-9-9-9 9-4-4 9-9-9-9z"/>`)},T_=()=>`<span class="settlement-log" aria-hidden="true">${C_(`<path d="m4 11 17-7 7 5v14l-17 6-7-5z"/><path class="settlement-log-top" d="m4 11 17-7 7 5-17 7z"/><path class="settlement-log-end" d="m4 11 7 5v13l-7-5z"/><path class="settlement-log-ring" d="m6 16 3 2v6l-3-2z"/>`)}</span>`,E_=(e,t)=>{e.textContent!==t&&(e.textContent=t)},D_=(e,t)=>{e.dataset.kind!==t&&(e.innerHTML=w_[t],e.dataset.kind=t)};function O_({parent:e=document.body,playerColor:t=`#37a98d`,onTool:n=()=>{},onView:r=()=>{},onBuild:i=()=>{},onCancel:a=()=>{}}={}){let o=document.createElement(`aside`);o.className=`settlement-hud`,o.setAttribute(`aria-label`,`Settlement controls`),o.style.setProperty(`--settlement-owner`,t),o.innerHTML=`
    <div class="settlement-inventory" role="group" aria-label="Your settlement">
      <div class="settlement-stockpile" data-hud="stockpile" role="img" aria-label="No logs. Ten logs builds a house.">
        <div class="settlement-log-slots">${Array.from({length:10},T_).join(``)}</div>
        <span class="settlement-bundles" data-hud="bundles" aria-hidden="true">${Array.from({length:4},()=>`<i>${w_.logs}</i>`).join(``)}</span>
      </div>
      <div class="settlement-homes" data-hud="homes" role="img" aria-label="One house">
        ${w_.house}<span class="settlement-home-marks" aria-hidden="true">${Array.from({length:8},()=>`<i></i>`).join(``)}</span>
      </div>
    </div>
    <div class="settlement-dock">
      <div class="settlement-build-actions" data-hud="build-actions" role="group" aria-label="House placement" hidden>
        <span class="settlement-placement" data-hud="placement" role="img" aria-label="Joins your settlement">${w_.link}</span>
        <span class="settlement-validity" data-hud="validity" role="img" aria-label="Choose a clear place">${w_.blocked}</span>
        <button type="button" class="settlement-build" data-action="build" aria-label="Build house. Ten logs." aria-keyshortcuts="Enter">${w_.check}</button>
        <button type="button" data-action="cancel" aria-label="Cancel house placement" aria-keyshortcuts="Escape">${w_.close}</button>
      </div>
      <div class="settlement-actions" role="group" aria-label="Tools and camera">
        <button type="button" class="settlement-tool" data-action="axe" aria-label="Select axe. E or click to chop a nearby tree." aria-pressed="true" aria-keyshortcuts="E">${w_.axe}<span class="settlement-target" data-hud="target" aria-hidden="true"></span></button>
        <button type="button" class="settlement-tool" data-action="house" aria-label="Place a house. Costs ten logs." aria-pressed="false" aria-keyshortcuts="B">${w_.house}</button>
        <button type="button" class="settlement-tool settlement-view" data-action="view" aria-label="Switch to overview" aria-keyshortcuts="V"><span data-hud="view-icon">${w_.view}</span></button>
      </div>
    </div>
    <div class="settlement-sr-only" data-hud="announcements" role="status" aria-live="polite" aria-atomic="true"></div>`,e.append(o);let s=Object.fromEntries([...o.querySelectorAll(`[data-hud]`)].map(e=>[e.dataset.hud,e])),c=Object.fromEntries([...o.querySelectorAll(`[data-action]`)].map(e=>[e.dataset.action,e])),l=[...o.querySelectorAll(`.settlement-log`)],u=[...o.querySelectorAll(`.settlement-bundles i`)],d=[...o.querySelectorAll(`.settlement-home-marks i`)],f={},p=``,m=``,h={axe:()=>n(`axe`),house:()=>n(`house`),view:r,build:i,cancel:a};function g(e){let t=e.target.closest(`button[data-action]`);t&&!t.disabled&&h[t.dataset.action]?.(),e.stopPropagation()}let _=e=>e.stopPropagation();o.addEventListener(`click`,g);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])o.addEventListener(e,_);function v(e={}){f={...f,...e};let{logs:t=0,houses:n=1,connectedHouses:r=n,tool:i=`axe`,walking:a=!0,ready:h=!0,canBuild:g=!1,connected:_=!0,reason:v=``,targetTree:y=!1,message:b=``,visible:x=!0}=f,S=JSON.stringify([t,n,r,i,a,h,!!g,!!_,v,!!y,b,x]);if(S===m)return;m=S;let C=i===`house`;o.hidden=!x,o.dataset.tool=i,o.dataset.ready=String(!!h),o.dataset.valid=String(!!g),o.dataset.affordable=String(t>=10),o.dataset.target=String(!!y&&a&&!C),l.forEach((e,n)=>{e.dataset.filled=String(n<Math.min(10,t))}),u.forEach((e,n)=>{e.hidden=n>=Math.floor(Math.max(0,t-10)/10)}),d.forEach((e,t)=>{e.hidden=t>=n,e.dataset.connected=String(t<r)}),s.stockpile.setAttribute(`aria-label`,`${t} logs. Ten logs builds one house.`),s.homes.setAttribute(`aria-label`,`${n} ${n===1?`house`:`houses`}, ${r} connected to your settlement.`),s[`build-actions`].hidden=!C;let w=_?`link`:`outpost`;D_(s.placement,w),s.placement.dataset.connected=String(!!_),s.placement.setAttribute(`aria-label`,_?`Joins your settlement with a path`:`Starts a new outpost`);let T=v||(t<10?`Gather ten logs to build a house.`:`Choose clear, level ground.`),E=g?`check`:t<10?`logs`:/tree|forest/i.test(v)?`tree`:/water|dry ground/i.test(v)?`water`:`blocked`;D_(s.validity,E),s.validity.setAttribute(`aria-label`,h?g?`Clear ground. Ready to build.`:T:`Preparing this part of the island.`),s.validity.dataset.valid=String(!!g),s.validity.setAttribute(`aria-hidden`,String(!!g)),c.axe.setAttribute(`aria-pressed`,String(!C)),c.house.setAttribute(`aria-pressed`,String(C)),c.house.setAttribute(`aria-label`,`Place a house. Costs ten logs. ${t>=10?`Enough logs gathered.`:`${10-t} more logs needed.`}`);for(let e of[`axe`,`house`,`view`,`cancel`])c[e].disabled=!h;c.build.disabled=!h||!g,c.build.setAttribute(`aria-label`,g?`Build house. Spend ten logs. ${_?`Joins your settlement.`:`Starts a new outpost.`}`:`Cannot build here. ${T}`),D_(s[`view-icon`],a?`view`:`person`),c.view.setAttribute(`aria-label`,a?`Switch to overview`:`Return to your traveller`);let D=[h?`${t} logs. ${n} ${n===1?`house`:`houses`}.`:`Preparing your clearing.`,C?`House placement selected. Aim at clear ground. Enter builds; Escape cancels.`:`Axe selected. E or click chops a nearby tree.`,a?``:`Overview.`,b].filter(Boolean).join(` `);D!==p&&(E_(s.announcements,D),p=D)}return v(),{root:o,update:v,dispose(){o.removeEventListener(`click`,g);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])o.removeEventListener(e,_);o.remove()}}}function k_({canvas:e,world:t,parent:n,mapParent:r,detail:i,getPlayer:a,onView:o,reducedMotion:s}){let c=x_(t),l=S_(n,r,t),u=c.snapshot(),d=`axe`,f=null,p=null,m=null,h=null,g=!0,_=!1,v=!1,y=null,b=!1,x=null,S=``,C=0,w=-1,T=-1,E=[],D=[],O=[],k=[],A=[],j=``,M=!1,N=new te,P=new dt,F=new ge(new X(0,1,0),0),I=new X,ee=[],L=()=>e.focus({preventScroll:!0});function R(e){d=e,f=null,b=!1,j=``,S=``,L()}let z=O_({parent:e.parentElement,playerColor:`#257d70`,onTool:R,onView:()=>{R(`axe`),o()},onBuild:()=>{b=!0,L()},onCancel:()=>R(`axe`)});function ne(e,t,n,r){e.addEventListener(t,n,r),ee.push(()=>e.removeEventListener(t,n,r))}ne(e,`pointermove`,t=>{if(d!==`house`||t.buttons)return;let n=e.getBoundingClientRect();f={x:(t.clientX-n.left)/n.width*2-1,y:1-(t.clientY-n.top)/n.height*2}}),ne(e,`pointerleave`,e=>{e.relatedTarget?.closest?.(`.settlement-hud`)||(f=null)}),ne(e,`pointerdown`,t=>{g||_||d!==`house`||t.button!==0||(t.preventDefault(),t.stopImmediatePropagation(),L(),p={id:t.pointerId,x:t.clientX,y:t.clientY},e.setPointerCapture?.(t.pointerId))},!0),ne(e.ownerDocument.defaultView,`pointerup`,t=>{p?.id===t.pointerId&&(b=Math.hypot(t.clientX-p.x,t.clientY-p.y)<5,p=null,e.hasPointerCapture?.(t.pointerId)&&e.releasePointerCapture(t.pointerId))}),ne(e,`pointercancel`,()=>{p=null}),ne(e.ownerDocument.defaultView,`blur`,()=>{p=null,b=!1,x=null});function B(){let e=c.revision!==w;if(e){let e=u.houses.length;u=c.snapshot(),(w<0||u.houses.length!==e)&&(l.sync(u.houses,u.paths??[]),k=l.meshes),w=c.revision}(e||i.placementRevision!==T)&&(T=i.placementRevision,E=[...i.placements,...u.houses],D=[...i.getCollisionPlacements(),...u.houses],O=[...i.getTerrainMeshes(),...k],A=[...i.cityStreets,...u.paths??[]])}function re(e){let t=null,n=1/0,r=Math.sin(e.heading),i=Math.cos(e.heading);for(let a of E){if(a.kind!==`tree`||c.isTreeRemoved(a))continue;let o=a.x-e.position.x,s=a.z-e.position.z,l=Math.hypot(o,s);if(l>d_.chopReach||l<1e-6)continue;let u=(o*r+s*i)/l;if(u<.3)continue;let d=l-u*.5;d<n&&(n=d,t=a)}return t}function V(e){let n;return f&&y&&(P.set(f.x,f.y),N.setFromCamera(P,y),N.ray.intersectPlane(F,I)&&N.ray.direction.y<-.01&&(n={x:I.x,z:I.z})),n||=Ue(t,e.position.x,e.position.z,Math.sin(e.heading)*3.8,Math.cos(e.heading)*3.8),n}let H=e=>i.hasCoverageAt(e,1);function ie(e,t){return{player:e.position,enforceReach:g,placements:E,ready:i.hasCoverageAt(t,2),isReadyAt:H}}function ae(e){S=e,C=3.2}return B(),{game:c,art:l,hud:z,get placements(){return B(),E},get placementRevision(){return B(),`${T}:${w}`},get cityStreets(){return B(),A},getCollisionPlacements(){return B(),D},getTerrainMeshes(){return B(),O},keyDown(e){let t=e.key.toLowerCase();return t===`b`?(e.repeat||R(d===`house`?`axe`:`house`),!0):d===`house`&&[`escape`,`enter`,`e`].includes(t)?(e.repeat||(t===`escape`||t===`e`?R(`axe`):b=!0),!0):t===`r`},prepareInput(e){return d===`house`&&e.swing&&(b=!0,e.swing=!1),e},onSwing(){let e=a();B();let t=re(e);x=t?{tree:t,time:.22}:null,t||ae(`Step closer and face a tree`)},cancelBuild(){R(`axe`)},update(n,{walking:r,transitioning:o,camera:p,mapBlend:E=0}={}){if(M)return;g=r,_=o,y=p;let D=a();if(i.updateTrees(s?.matches?1:n),B(),v=!!D?.initialized&&i.hasCoverageAt(D.position,2),C>0&&(C-=n,C<=0&&(S=``)),x&&(x.time-=n,x.time<=0)){let e=x.tree;if(x=null,g&&et(t,e,D.position)<=d_.chopReach&&!c.isTreeRemoved(e)){let t=c.chop(e,{player:D.position});t.ok&&(i.fellTree(t.treeId,{direction:{x:e.x-D.position.x,z:e.z-D.position.z}}),ae(`+${t.logs} logs`),B())}}if(h=v&&g&&!_&&d===`axe`?re(D):null,v&&d===`house`&&!_){let e=V(D),t=ie(D,e),n=`${e.x}:${e.z}:${D.position.x}:${D.position.z}:${g}:${t.ready}:${w}:${T}`;if(n!==j&&(m=c.evaluateBuild(e,t),j=n),b){let t=c.build(e,ie(D,e));t.ok?(ae(t.connected?`House built · settlement expanded`:`House built · new outpost`),B(),d=`axe`,f=null):(S=``,C=0)}}else m=null,j=``;b=!1,l.preview(m,{visible:d===`house`&&v&&!_,targetTree:h}),l.update({mapBlend:E});let O=u.houses.filter(e=>e.connected).length;z.update({logs:u.logs,houses:u.houses.length,connectedHouses:O,tool:d,walking:g,ready:v,canBuild:!!m?.valid,connected:m?.connected??!0,reason:m?.reason??``,targetTree:!!h,message:S}),Object.assign(e.dataset,{gameplay:`settlement`,logs:String(u.logs),houses:String(u.houses.length),connectedHouses:String(O),paths:String(u.paths?.length??0),choppedTrees:String(u.removedTreeIds.length),buildMode:String(d===`house`),buildValid:String(!!m?.valid),buildReason:m?.code??``,buildX:m?.house?.x?.toFixed(2)??``,buildZ:m?.house?.z?.toFixed(2)??``,targetTree:h?.id??``})},dispose(){M=!0;for(let e of ee)e();z.dispose(),l.dispose()}}}var A_=document.querySelector(`#world`),j_=new x,M_=new x,N_=A_.getAttribute(`aria-label`);j_.background=M_.background=Z.backdrop,j_.fog=new St(Z.backdrop,1e6,2e6);var P_=new fa({canvas:A_,antialias:!0,powerPreference:`high-performance`});P_.setPixelRatio(Math.min(devicePixelRatio,1.6)),P_.shadowMap.enabled=!0,P_.shadowMap.type=1,P_.toneMapping=4,P_.toneMappingExposure=1.15,P_.outputColorSpace=he,P_.info.autoReset=!1;var F_=new s(-60,60,45,-45,.1,500);F_.position.set(115,125,145),F_.lookAt(0,1,0);var I_=new bt(Bt(.94,.035,221),Bt(.55,.025,169),2.15);j_.add(I_);var L_=new pt(Bt(.98,.04,84),3.25);L_.position.set(-65,110,65),L_.castShadow=!0,L_.shadow.mapSize.set(2048,2048),Object.assign(L_.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260}),L_.shadow.normalBias=.025,L_.shadow.bias=-15e-5,L_.shadow.radius=3,j_.add(L_,L_.target);var R_=new pt(Bt(.85,.035,218),.65);R_.position.set(40,30,-40),j_.add(R_,R_.target);var z_=new Y(new xe(2e3,2e3),new ie({color:Z.backdrop,roughness:1}));z_.rotation.x=-Math.PI/2,z_.position.y=-5.7,z_.receiveShadow=!0,j_.add(z_);var B_,V_,H_,U_=[],W_,G_,K_,q_,J_,Y_,X_,Z_,Q_,$_,ev,tv,nv,rv=!1,iv=!1,av=!1,ov,sv=0,cv=0,lv=0,uv=!1,dv=null,fv=0,pv=0,mv=0,hv=matchMedia(`(prefers-reduced-motion: reduce)`),gv=Yg({reducedMotion:hv}),_v=qt({scene:j_,mapScene:M_,sky:I_,sun:L_,fill:R_,renderer:P_,reducedMotion:hv,initialNight:new URLSearchParams(location.search).get(`time`)===`night`}),vv=ig(j_,M_),yv=Ug(j_),bv=new X,xv=hv.matches;hv.addEventListener(`change`,e=>{xv=e.matches});var Sv=so(P_),Cv=Lh(P_),wv=io({canvas:A_,camera:F_,scene:j_,mapScene:M_,reducedMotion:hv,getTrains:()=>U_,getWorldRoot:()=>V_,getWorld:()=>B_,isDetailReady:()=>!!H_?.ready&&uv,onPause:()=>{xv=!xv},onRegenerate:()=>{if(!B_)return;let e=String(Number.isFinite(Number(B_.seed))?Number(B_.seed)+1:Date.now());Zv({...K_,seed:e}).catch(Xv);let t=new URL(location.href);t.searchParams.set(`seed`,e),history.replaceState(null,``,t)}}),{navigation:Tv,controls:Ev}=wv,Dv=Hg(A_,{isActive:()=>iv||gv.active,onToggle:()=>iv?zv():Rv(),onExit:zv,onKey:e=>ov?.keyDown(e)??!1}),Ov=new X,kv=(e,t,n)=>{let r=g.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function Av(){return Q_.cameraTarget.clone()}function jv(){let e=Ct(B_);return e?{center:new X(0,-e.radius,0),radius:e.radius}:void 0}function Mv(){return gv.active?gv.camera:iv?Q_.camera:F_}function Nv(){if(gv.active)return gv.target.clone();if(iv)return Av();let e=wv.renderTarget;return Be(B_,e.x,e.y,e.z,new X)}function Pv(){let e=Mv(),t=e.clone();return t.isOrthographicCamera=!!e.isOrthographicCamera,t.isPerspectiveCamera=!t.isOrthographicCamera,t}function Fv(){if(B_.gameplay)return B_.gameplay.spawn.heading??0;let e=B_.cities[0],t=e&&nv?je(B_,e,nv,{}):null;return t?Math.atan2(t.x,t.z):Math.atan2(Ev.target.x-Tv.position.x,Ev.target.z-Tv.position.z)}function Iv(){if(!Q_||Q_.initialized||!nv||!H_.hasCoverageAt(nv,2))return;let e=V_.scale.y;V_.scale.set(1,1,1),V_.updateMatrixWorld(!0),Q_.enter(nv,Fv())&&(ov?(iv=!0,wv.setInputEnabled(!1),rv=!0,A_.style.cursor=`grab`):Q_.exit(),Q_.root.visible=!0,nv={...Q_.position}),V_.scale.y=e,V_.updateMatrixWorld(!0)}function Lv(){wv.setInputEnabled(!iv),Dv.sample(0),A_.dataset.view=iv?`person`:wv.mode,A_.dataset.cameraTransition=`false`,A_.dataset.walkingWeight=iv?`1.000`:`0.000`}function Rv(){if(!Q_||iv)return;let e=Pv(),t=Nv(),n=V_.scale.y;V_.scale.set(1,1,1),V_.updateMatrixWorld(!0),Q_.enter(nv,Fv())?(iv=!0,wv.setInputEnabled(!1),sv=cv,gv.begin({fromCamera:e,toCamera:Q_.camera,fromTarget:t,toTarget:Av(),toWalking:!0,sphere:jv()}),rv=!0,gv.active||Lv(),A_.dataset.view=`person`,A_.style.cursor=`grab`,hy()):(V_.scale.y=n,V_.updateMatrixWorld(!0))}function zv(){if(!Q_||!iv)return;ov?.cancelBuild();let e=Pv(),t=Nv(),n=Q_.heading,r=Q_.exit();Q_.root.visible=!0,Dv.clear(),iv=!1,wv.setInputEnabled(!1),wv.overlook(r,{heading:n,zoom:wv.zoomScale*1.35});let i=wv.renderTarget;Be(B_,i.x,i.y,i.z,Ov),sv=cv,gv.begin({fromCamera:e,toCamera:F_,fromTarget:t,toTarget:Ov,toWalking:!1,sphere:jv()}),gv.active||Lv(),hy()}var Bv=170,Vv=112,Hv=0,Uv=new X(115,125,145).normalize(),Wv=new X(-72,94,54),Gv=new V,Kv=new X;A_.addEventListener(`keydown`,e=>{e.key.toLowerCase()!==`n`||e.repeat||e.ctrlKey||e.metaKey||e.altKey||(e.preventDefault(),_v.toggle())});function qv(){G_&&=(G_.dispose(),null)}function Jv(){if(wv.reset(),B_.surface?.complete){let e=B_.surface.radius,t=Oe(B_,B_.camera?.longitude??10,B_.camera?.latitude??25);z_.visible=!1,Bv=Vv=e*2.2,wv.setScale(Vv/230),Ev.target.set(t.x,1.3,t.z);let n=new X().setFromSphericalCoords(1,Math.PI/4,0);Tv.position.copy(Ev.target).addScaledVector(n,e*3),Tv.zoom=1,Tv.far=e*8,Ev.update(),Qv(),wv.setHome();return}let e=B_.outline.map(e=>e[0]),t=B_.outline.map(e=>e[1]),n=Math.max(...e)-Math.min(...e),r=Math.max(...t)-Math.min(...t),i=Math.hypot(n,r),a=Math.max(0,...B_.mountains.map(e=>e.height));z_.visible=!Ct(B_);let o=B_.camera?.startInDetail===!0;wv.setScale(o?1:Math.max(1,i/410)),Ev.target.set((Math.max(...e)+Math.min(...e))/2,1.3,(Math.max(...t)+Math.min(...t))/2);let s=B_.camera?.northUp?new X(0,125,180).normalize():Uv;Tv.position.copy(Ev.target).addScaledVector(s,i*1.5+a),Tv.zoom=1,Tv.far=Math.max(500,i*5+a*3),Ev.update(),z_.position.x=Ev.target.x,z_.position.z=Ev.target.z,z_.scale.setScalar(Math.max(1,i/500));let c=Tv.quaternion.clone().invert(),l=B_.outline.flatMap(([e,t])=>[new X(e,-3.4,t),new X(e,4,t)]);B_.mountains.forEach(e=>l.push(new X(e.x,e.height,e.z)));let u=0,d=0;if(l.forEach(e=>{e.sub(Ev.target).applyQuaternion(c),u=Math.max(u,Math.abs(e.x)),d=Math.max(d,Math.abs(e.y))}),wv.zoomScale>1){let e=Tv.clone(),t=new X().subVectors(Tv.position,Ev.target),n=new oe().setFromVector3(t);n.phi=1e-5,e.position.copy(Ev.target).add(t.setFromSpherical(n)),e.lookAt(Ev.target);let r=e.quaternion.clone().invert();for(let[e,t]of B_.outline){let n=new X(e,0,t).sub(Ev.target).applyQuaternion(r);u=Math.max(u,Math.abs(n.x)),d=Math.max(d,Math.abs(n.y))}}Bv=u*2+Math.max(10,u*.2),Vv=d*2+Math.max(10,d*.2),wv.setScale(o?1:Math.max(wv.zoomScale,Vv/230)),Qv(),wv.setHome()}function Yv(e=wv.renderTarget,t=0){let n=Math.max((F_.right-F_.left)/F_.zoom,(F_.top-F_.bottom)/F_.zoom),r=Math.min(480,Math.max(45,n*.72)),i=g.lerp(r,18,t),a=i*2/2048,o=Math.round(e.x/a)*a,s=Math.round(e.z/a)*a;Ct(B_)?(Be(B_,o,0,s,L_.target.position),Ne(B_,o,s,Gv),I_.position.set(0,1,0).applyMatrix4(Gv),Kv.copy(Wv).applyMatrix4(Gv),L_.position.copy(L_.target.position).addScaledVector(Kv,Math.max(1,i/95)),R_.position.set(40,30,-40).applyMatrix4(Gv).add(L_.target.position),R_.target.position.copy(L_.target.position)):(I_.position.set(0,1,0),L_.target.position.set(o,0,s),L_.position.copy(L_.target.position).addScaledVector(Wv,Math.max(1,i/95)),R_.position.set(40,30,-40),R_.target.position.set(0,0,0));let c=L_.shadow.camera;Math.abs(c.right-i)>.1&&(Object.assign(c,{left:-i,right:i,top:i,bottom:-i,far:Math.max(260,i*4)}),c.updateProjectionMatrix())}function Xv(e){e.name!==`AbortError`&&(A_.dataset.error=e.message,console.error(e))}async function Zv(e={}){let t=++lv,n=structuredClone(e);mv=performance.now(),A_.dataset.loading=`true`,delete A_.dataset.error,Z_?.dispose();let r=Ih();Z_=r;let i,a,o,s,c,l;try{let e=await r.request(`generate`,n);if(t!==lv)throw new DOMException(`World replaced`,`AbortError`);let u=e.world;return l=new q,i=Fu(new q,u),c=Eh(l,i.root.getObjectByName(`map-static`),u),s=rg(u),s&&(l.add(s.detail),i.root.add(s.map)),a=_h(l,u),o=Ch(l,u,{maxPending:3,requestChunk:(e,t)=>r.request(`chunk`,e,t),uploadMesh:e=>Cv.upload(e)}),iv=!1,Dv.clear(),wv.setInputEnabled(!0),gv=Yg({reducedMotion:hv}),sv=cv=0,j_.fog.near=1e6,j_.fog.far=2e6,yv.root.visible=!1,ov?.dispose(),ov=null,Q_?.dispose(),$_?.dispose(),ev?.dispose(),tv?.dispose(),qv(),Y_?.dispose(),J_?.dispose(),H_?.dispose(),W_?.dispose(),V_?.removeFromParent(),q_?.dispose(),X_?.dispose(),X_=r,Z_=null,B_=u,V_=l,W_=a,U_=W_.trains,H_=o,q_=i,J_=s,Y_=c,M_.add(q_.root),j_.add(l),K_=n,Hv=0,uv=!1,dv=null,fv=e.milliseconds,Jv(),B_.gameplay&&(ov=k_({canvas:A_,world:B_,parent:l,mapParent:q_.root,detail:H_,getPlayer:()=>Q_,onView:()=>iv?zv():Rv(),reducedMotion:hv})),Q_=mg(l,B_,{getCollisionPlacements:()=>ov?ov.getCollisionPlacements():H_.getCollisionPlacements(),getTerrainMeshes:()=>ov?ov.getTerrainMeshes():H_.getTerrainMeshes(),isReadyAt:(e,t)=>H_.hasCoverageAt({x:e,z:t},1)}),Q_.resize(innerWidth/innerHeight),nv=Q_.prepareSpawn(B_.gameplay?.spawn??B_.cities[0]??Ev.target),$_=Vg(l,B_),av=!1,ev=Zg(j_,M_,B_),tv=$g(l,B_),nv&&$_.update(nv,{visible:!1}),A_.dataset.cities=String(B_.cities.length),A_.dataset.trains=String(U_.length),A_.dataset.surface=Ct(B_)?`sphere`:`plane`,ov?A_.setAttribute(`aria-label`,`Your island settlement. WASD moves, Shift runs, Space jumps. Face a nearby tree and press E or click to chop. Each tree gives 2 to 4 logs. Press B to preview a house costing 10 logs; move the pointer to aim, click or Enter to build, Escape to cancel. Red means blocked or unaffordable. Houses align with your settlement and connect by paths. V switches between your traveller and overview; N changes day and night.`):A_.setAttribute(`aria-label`,N_),document.activeElement===document.body&&A_.focus({preventScroll:!0}),A_.dataset.loading=`false`,pv=performance.now()-mv,hy(),B_}catch(e){throw t===lv&&(A_.dataset.loading=`false`,Z_=null),c?.dispose(),s?.dispose(),o?.dispose(),a?.dispose(),i?.dispose(),l?.removeFromParent(),r.dispose(),e}}function Qv(){let e=innerWidth,t=innerHeight,n=e/t,r=Math.max(Vv,Bv/n);Tv.left=-r*n/2,Tv.right=r*n/2,Tv.top=r/2,Tv.bottom=-r/2,Tv.updateProjectionMatrix(),P_.setSize(e,t),Q_?.resize(n),gv.active&&(gv.finish(),Lv(),iv||wv.updatePresentation(0)),Sv.resize(Math.round(e*P_.getPixelRatio()),Math.round(t*P_.getPixelRatio()))}window.addEventListener(`resize`,Qv),Qv();var $v=new Float32Array(180),ey=new Float32Array(180),ty=0,ny=0,ry=0,iy=0,ay=performance.now(),oy,sy=0,cy=0,ly=0,uy=``,dy=0,fy=0,py=0,my=0;function hy(){ty=ny=0,sy=cy=ly=0,uy=``,ry=performance.now()}function gy(e,t,n){if($v[ny]=t,ey[ny]=n,ny=(ny+1)%$v.length,ty=Math.min(ty+1,$v.length),(gv.active||wv.blend>.001&&wv.blend<.999)&&(n>sy&&(uy=JSON.stringify({traffic:dy,detail:fy,view:py,render:my,blend:wv.blend})),ly++,sy=Math.max(sy,n),cy=Math.max(cy,t)),e-ry<1e3)return;ry=e;let r=e=>[...e.subarray(0,ty)].sort((e,t)=>e-t)[Math.floor((ty-1)*.95)]??0,i=U_.reduce((e,t)=>e+ +!!t.state.active,0);Object.assign(A_.dataset,{frameP95:r($v).toFixed(2),cpuP95:r(ey).toFixed(2),drawCalls:String(P_.info.render.calls),triangles:String(P_.info.render.triangles),geometries:String(P_.info.memory.geometries),activeTrains:String(i),mapNetworkVisibility:q_.stats.networkVisibility.toFixed(3),visibleTrains:String(W_.stats?.visibleTrains??0),detailChunks:String(H_.stats?.chunks??H_.stats?.loadedChunks??0),detailReady:String(H_.ready),detailSettled:String(H_.settled),detailRevealing:String(H_.stats.revealingChunks),detailBase:String(Y_.root.visible),detailRequired:String(H_.stats.requiredChunks??0),detailPending:String(H_.stats.pendingChunks??0),detailWorkers:String(X_.stats.workers),detailWorkerMs:String(Math.round(X_.stats.lastChunkMs)),detailBytes:String(H_.stats.bytes??0),detailLimited:String(H_.stats.coverageLimited??!1),detailErrors:String(H_.stats.errors??0),transitionCpuMax:sy.toFixed(2),transitionFrameMax:cy.toFixed(2),transitionFrames:String(ly),transitionPeak:uy,trafficCpu:dy.toFixed(2),detailCpu:fy.toFixed(2),viewCpu:py.toFixed(2),renderCpu:my.toFixed(2),simulationSeconds:Hv.toFixed(1),simulationCpu:(W_.stats.simulationMs??0).toFixed(2),poseCpu:(W_.stats.poseMs??0).toFixed(2),generationMs:fv.toFixed(0),loadMs:pv.toFixed(0),night:_v.night.toFixed(3),walking:String(iv),playerX:Q_?.position.x.toFixed(3),playerY:Q_?.position.y.toFixed(3),playerZ:Q_?.position.z.toFixed(3),playerGrounded:String(Q_?.grounded),playerSwings:String(Q_?.stats.swings??0),walkingInstances:String($_?.stats.instances??0),lifeInstances:String(G_?.stats?.instances??G_?.stats?.active??0),lifeSheep:String(G_?.stats?.sheep??0),lifeBirds:String(G_?.stats?.birds??0)})}function _y(e){let t=performance.now(),n=e-ay,r=g.clamp(n/1e3,0,.05);if(ay=e,B_){xv||(Hv+=r),_v.update(r,Hv),vv.update(),j_.fog.color.copy(j_.background);let i=performance.now();if(W_.update(xv?0:r),dy=performance.now()-i,i=performance.now(),gv.active)Dv.sample(0),gv.update(r),gv.active||Lv();else if(iv){let e=Dv.sample(r),t=Q_.stats.swings;Q_.update(r,ov?ov.prepareInput(e):e),Q_.stats.swings>t&&ov?.onSwing()}else wv.updateNavigation(r);!iv&&!gv.active&&wv.updatePresentation(r);let a=iv||gv.active,o=gv.active?gv.walkingWeight:Number(iv),s=Mv(),c=a?Q_.position:Ev.target,l=gv.active?sv*(1-kv(0,.3,gv.progress)):iv?0:wv.blend;cv=l,a&&V_.scale.set(1,1,1);let u=Math.max((F_.right-F_.left)/F_.zoom,(F_.top-F_.bottom)/F_.zoom),d=gv.active&&!iv?Math.min(140,Math.max(40,u*.55)):40,f=Q_?.initialized?Q_.position:nv;if(H_.update(s,{mapBlend:a||wv.wantsDetail?0:1,target:c,budgetMs:2,groundFocus:f,groundRadius:d,groundOnly:a,coverageCameras:a?void 0:wv.coverageCameras,retainVisible:a||wv.blend<1}),Iv(),f=Q_?.initialized?Q_.position:nv,ov?.update(r,{walking:iv,transitioning:gv.active,camera:s,mapBlend:l}),Q_?.initialized&&(Q_.root.visible=!0),f&&$_.update(f,{placements:ov?.placements??H_.placements,revision:ov?.placementRevision??H_.placementRevision,cityStreets:ov?.cityStreets??H_.cityStreets,visible:o>.001,visibilityWeight:o,time:Hv,night:_v.night}),$_.stats.ready&&!av){for(let e of $_.root.children)Cv.upload(e);av=!0}if(j_.fog.near=Math.exp(g.lerp(Math.log(1e6),Math.log(28),o)),j_.fog.far=Math.exp(g.lerp(Math.log(2e6),Math.log(85),o)),!uv&&!dv){let e=lv;P_.shadowMap.enabled=!0,G_||=eg(V_,B_),dv=Sv.prepare(j_,M_,F_).then(()=>{e===lv&&(uv=!0)}).catch(t=>{e===lv&&(dv=null,Xv(t))})}fy=performance.now()-i,i=performance.now();let p=a?Q_.renderPosition:wv.renderTarget;tv.update(Hv,{focus:p,placements:H_.placements,revision:H_.placementRevision,visible:l<.999,reducedMotion:hv.matches}),H_.updateVisibility(s,{dt:r,reveal:uv&&l<.999,reducedMotion:hv.matches||rv}),rv=!1,Y_.root.visible=a||!H_.settled,W_.updateView(s,{mapBlend:l,focus:p}),l<.999&&(Yv(p,o),G_||=eg(V_,B_),G_.update(Hv,{focus:p,placements:H_.lifePlacements,revision:H_.lifeRevision,detailBlend:1-l,reducedMotion:hv.matches,night:Vt.night.value})),G_&&(G_.root.visible=l<.999),bv.subVectors(L_.position,L_.target.position).normalize(),yv.update(s,{visible:o>.001,strength:o,night:_v.night,sunDirection:bv,horizonColor:j_.background}),q_.update(U_,{visible:l>.001,camera:F_,viewportHeight:innerHeight,poseBuffer:W_.poseBuffer,dt:r,reducedMotion:hv.matches}),ev.update({position:Q_.renderPosition,initialized:Q_.initialized,camera:s,mapBlend:l,walking:iv,walkingWeight:o,viewportHeight:innerHeight}),Q_.root.visible=Q_.initialized&&(a||l<.999&&ev.characterReadable),A_.dataset.view=iv?`person`:wv.mode,A_.dataset.cameraTransition=String(gv.active),A_.dataset.walkingWeight=o.toFixed(3),A_.dataset.mapBlend=l.toFixed(3),A_.dataset.characterVisible=String(Q_.initialized&&Q_.root.visible),A_.dataset.characterMarker=String(ev.root.visible||ev.mapRoot.visible),py=performance.now()-i,i=performance.now(),P_.info.reset(),P_.shadowMap.enabled=l<.999,Sv.render(j_,M_,s,l),my=performance.now()-i,gy(e,n,performance.now()-t),iy++,document.documentElement.dataset.ready=`true`}else P_.render(M_,F_);oy=requestAnimationFrame(_y)}document.addEventListener(`visibilitychange`,()=>{document.hidden?cancelAnimationFrame(oy):(ay=performance.now(),hy(),oy=requestAnimationFrame(_y))}),oy=requestAnimationFrame(_y),window.__railway={get ready(){return iy>0},get time(){return Hv},get paused(){return xv},get trains(){return U_.map(e=>({id:e.state.id,ownerId:e.state.ownerId,homeCityId:e.state.homeCityId,x:e.parts[0].position.x,y:e.parts[0].position.y,z:e.parts[0].position.z,cars:e.parts.length}))},get render(){return{...P_.info.render,geometries:P_.info.memory.geometries,...W_?.stats,...H_?.stats}},get camera(){return{zoom:F_.zoom,width:innerWidth,height:innerHeight,mode:iv?`person`:wv.mode,mapBlend:cv,following:wv.selected,transitioning:gv.active}}},window.railway=Object.freeze({setNight:e=>_v.setNight(e),loadWorld:e=>Zv(e).then(e=>structuredClone(e)),exportWorld:()=>structuredClone(K_),inspectWorld:()=>structuredClone(B_),generateWorld:Pl,validateWorld:Fl,createStressWorld:Dh});var vy=new URLSearchParams(location.search);try{await Zv(await Fh(vy,location.href))}catch(e){Xv(e)}