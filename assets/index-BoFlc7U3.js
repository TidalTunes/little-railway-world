const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./settlement-world-DQKDQx1n.js","./island-world-CahC_WwK.js","./rolldown-runtime-WkwZ5CU-.js","./mountain-ranges-etBC5vVf.js","./farm-villages-DP3JT-sy.js","./world-surface-Bylg2z_8.js","./island-world-CBLcu6-d.js","./earth-world-xElanl2w.js","./europe-ranges-1QbrKqpQ.js","./globe-land-colors-iS-OXsJS.js","./europe-world-Nie4vWch.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-WkwZ5CU-.js";import{$ as t,$n as n,$t as r,An as i,Ar as a,At as o,B as s,Bt as c,C as l,Cr as u,Ct as d,D as f,Dr as p,Dt as m,E as h,Er as g,Et as _,F as v,Ft as y,G as b,Gn as x,Gt as S,H as C,Ht as w,I as T,In as E,It as D,J as O,Jn as k,K as A,Kn as j,Kt as M,L as N,Ln as P,Lt as F,M as I,Mn as L,Mt as R,N as z,Nn as B,Nt as V,O as H,Or as U,Ot as W,P as ee,Pn as te,Pt as ne,Q as re,Qn as ie,R as G,Rn as ae,Rt as oe,Sr as se,St as ce,T as le,Tr as ue,Tt as de,U as fe,Ut as pe,V as me,Vt as he,W as ge,Wn as _e,Wt as ve,X as ye,Y as be,Yn as K,Yt as xe,Z as Se,Zn as Ce,_ as q,_r as we,_t as Te,a as Ee,ar as J,br as De,bt as Oe,c as ke,cr as Ae,ct as je,d as Me,dr as Ne,dt as Pe,en as Fe,er as Ie,et as Le,f as Re,fr as ze,g as Be,gr as Ve,gt as He,h as Ue,hr as Y,ht as We,i as Ge,ir as Ke,it as qe,j as Je,jn as Ye,jr as Xe,jt as Ze,k as Qe,kr as $e,kt as et,l as tt,lt as nt,m as rt,mr as it,mt as at,n as ot,nr as st,nt as ct,o as lt,or as ut,ot as dt,p as ft,pr as pt,pt as mt,q as ht,qn as gt,qt as _t,r as vt,rr as yt,rt as bt,s as xt,st as St,tr as Ct,tt as wt,u as Tt,ur as Et,ut as Dt,v as Ot,vr as kt,vt as At,w as jt,wr as Mt,wt as Nt,xr as Pt,xt as Ft,y as It,yr as Lt,yt as Rt,z as zt,zn as Bt,zt as Vt}from"./world-surface-Bylg2z_8.js";import{a as Ht,c as Ut,d as Wt,f as Gt,i as Kt,l as qt,o as X,r as Jt,s as Yt,t as Xt,u as Zt}from"./globe-land-colors-iS-OXsJS.js";import{A as Qt,B as $t,C as en,D as tn,E as nn,F as rn,G as an,H as on,I as sn,K as cn,L as ln,M as un,N as dn,O as fn,P as pn,R as mn,S as hn,T as gn,U as _n,V as vn,W as yn,_ as bn,a as xn,b as Sn,c as Cn,d as wn,f as Tn,g as En,h as Dn,i as On,j as kn,l as An,m as jn,n as Mn,o as Nn,p as Pn,r as Fn,s as In,t as Ln,u as Rn,v as zn,w as Bn,x as Vn,y as Hn,z as Un}from"./farm-villages-DP3JT-sy.js";import{o as Wn,s as Gn}from"./mountain-ranges-etBC5vVf.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function Kn(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function qn(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Jn={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Z={common:{diffuse:{value:new v(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new v(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new v(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new v(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},Yn={basic:{uniforms:U([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:Jn.meshbasic_vert,fragmentShader:Jn.meshbasic_frag},lambert:{uniforms:U([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new v(0)},envMapIntensity:{value:1}}]),vertexShader:Jn.meshlambert_vert,fragmentShader:Jn.meshlambert_frag},phong:{uniforms:U([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new v(0)},specular:{value:new v(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Jn.meshphong_vert,fragmentShader:Jn.meshphong_frag},standard:{uniforms:U([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new v(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jn.meshphysical_vert,fragmentShader:Jn.meshphysical_frag},toon:{uniforms:U([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new v(0)}}]),vertexShader:Jn.meshtoon_vert,fragmentShader:Jn.meshtoon_frag},matcap:{uniforms:U([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:Jn.meshmatcap_vert,fragmentShader:Jn.meshmatcap_frag},points:{uniforms:U([Z.points,Z.fog]),vertexShader:Jn.points_vert,fragmentShader:Jn.points_frag},dashed:{uniforms:U([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jn.linedashed_vert,fragmentShader:Jn.linedashed_frag},depth:{uniforms:U([Z.common,Z.displacementmap]),vertexShader:Jn.depth_vert,fragmentShader:Jn.depth_frag},normal:{uniforms:U([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:Jn.meshnormal_vert,fragmentShader:Jn.meshnormal_frag},sprite:{uniforms:U([Z.sprite,Z.fog]),vertexShader:Jn.sprite_vert,fragmentShader:Jn.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jn.background_vert,fragmentShader:Jn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:Jn.backgroundCube_vert,fragmentShader:Jn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jn.cube_vert,fragmentShader:Jn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jn.equirect_vert,fragmentShader:Jn.equirect_frag},distance:{uniforms:U([Z.common,Z.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jn.distance_vert,fragmentShader:Jn.distance_frag},shadow:{uniforms:U([Z.lights,Z.fog,{color:{value:new v(0)},opacity:{value:1}}]),vertexShader:Jn.shadow_vert,fragmentShader:Jn.shadow_frag}};Yn.physical={uniforms:U([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new W},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new v(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new v(0)},specularColor:{value:new v(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:Jn.meshphysical_vert,fragmentShader:Jn.meshphysical_frag};var Xn={r:0,b:0,g:0},Zn=new et,Qn=new W;Qn.set(-1,0,0,0,1,0,0,0,1);function $n(e,t,n,r,i,a){let s=new v(0),c=i===!0?0:1,l,u,d=null,p=0,m=null;function h(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function _(t){let r=!1,i=h(t);i===null?b(s,c):i&&i.isColor&&(b(i,1),r=!0);let o=e.xr.getEnvironmentBlendMode();o===`additive`?n.buffers.color.setClear(0,0,0,1,a):o===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function y(t,n){let i=h(n);i&&i.isCubeTexture?(u===void 0&&(u=new o(new f(1,1,1),new gt({name:`BackgroundCubeMaterial`,uniforms:De(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Zn.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Qn),u.material.toneMapped=T.getTransfer(i.colorSpace)!==x,(d!==i||p!==i.version||m!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,p=i.version,m=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new o(new S(2,2),new gt({name:`BackgroundMaterial`,uniforms:De(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=T.getTransfer(i.colorSpace)!==x,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||p!==i.version||m!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,p=i.version,m=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function b(t,r){t.getRGB(Xn,g(e)),n.buffers.color.setClear(Xn.r,Xn.g,Xn.b,r,a)}function C(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,b(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,b(s,c)},render:_,addToRenderList:y,dispose:C}}function er(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function tr(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function nr(e,t,n,r){let i;function o(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function c(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let u=n.precision===void 0?`highp`:n.precision,d=l(u);d!==u&&(a(`WebGLRenderer:`,u,`not supported, using`,d,`instead.`),u=d);let f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=n.logarithmicDepthBuffer===!0&&f===!1;n.reversedDepthBuffer===!0&&f===!1&&a(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&f===!0&&a(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),v=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:c,precision:u,logarithmicDepthBuffer:p,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:S,samples:C}}function rr(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ve,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var ir=class extends kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new s(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new f(5,5,5),i=new gt({name:`CubemapFromEquirect`,uniforms:De(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new o(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=Ft),new G(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},ar=256,or=3,sr=20,cr=256,lr=16,ur=3,dr=new Y,fr=new v,pr=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new G(1,10,null),this._boxMesh=new o(new f(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=dr}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(fr));let h=new G(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=br(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(ar,Mt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?ar:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=mr(e,!1,!1),n=Math.log2(e)-or;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=mr(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=br()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=yr()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=gr(),this._integrationMaterial=_r());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/lr);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-ur)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(cr*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=vr());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function mr(e,t,n){return new ir(e,{minFilter:ce,generateMipmaps:t,type:St,colorSpace:Nt,depthBuffer:n})}function hr(e,t,n){return new gt({name:e,uniforms:t,vertexShader:Jn.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function gr(){return hr(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${cr}u

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
	`)}function _r(){return hr(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:lr}},`

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
	`)}function vr(){return hr(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${sr}
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
	`)}function yr(){return hr(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

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
	`)}function br(){return hr(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function xr(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new ir(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new pr(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new pr(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Sr(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Xe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Cr(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Ke:yt)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function wr(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Tr(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:u(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Er(e,t,n){let r=new WeakMap,i=new Ve;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new fe(h,p,m,u);g.type=wt,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new it(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Dr(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Or={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function kr(e,t,n,r,i,a){let s=new kt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,l=null,u=null,d=new Qe;d.setAttribute(`position`,new Le([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute(`uv`,new Le([0,2,0,0,2,0],2));let f=new L({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new o(d,f),m=new he(-1,1,1,-1,0,1),h=null,g=null,_=!1,v,y=null,b=[],x=!1;this.setSize=function(e,t){s.setSize(e,t),c!==null&&c.setSize(e,t),l!==null&&l.setSize(e,t);for(let n=0;n<b.length;n++){let r=b[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){b=e,x=b.length>0&&b[0].isRenderPass===!0;let t=s.width,n=s.height;b.length>0&&c===null&&(c=new kt(t,n,{type:St,depthBuffer:!1,stencilBuffer:!1}),l=new kt(t,n,{type:St,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&b.some(e=>e.needsDepthTexture===!0);r!==(s.depthTexture!==null)&&(r===!0&&u===null&&(u=new ht(t,n),a===!0&&(u.format=A,u.type=Ae)),s.dispose(),s.depthTexture=r?u:null,s.resolveDepthBuffer=r,s.storeMultisampledDepthBuffer=r);for(let e=0;e<b.length;e++){let i=b[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(u)}},this.begin=function(e,t){if(_||e.toneMapping===0&&b.length===0)return!1;if(y=t,t!==null){let e=t.width,n=t.height;(s.width!==e||s.height!==n)&&this.setSize(e,n)}return x===!1&&e.setRenderTarget(s),v=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return x},this.end=function(e,t){e.toneMapping=v,_=!0;let n=s,r=c;for(let i=0;i<b.length;i++){let a=b[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===c?l:c))}if(h!==e.outputColorSpace||g!==e.toneMapping){h=e.outputColorSpace,g=e.toneMapping,f.defines={},T.getTransfer(h)===`srgb`&&(f.defines.SRGB_TRANSFER=``);let t=Or[g];t&&(f.defines[t]=``),f.needsUpdate=!0}f.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(y),e.render(p,m),y=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),d.dispose(),f.dispose()}}var Ar=new Ct,jr=new ht(1,1),Mr=new zt(1),Nr=new fe,Pr=new C,Fr=new s,Ir=[],Lr=[],Rr=new Float32Array(16),zr=new Float32Array(9),Br=new Float32Array(4);function Vr(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ir[i];if(a===void 0&&(a=new Float32Array(i),Ir[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Hr(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ur(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Wr(e,t){let n=Lr[t];n===void 0&&(n=new Int32Array(t),Lr[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Gr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Kr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hr(n,t))return;e.uniform2fv(this.addr,t),Ur(n,t)}}function qr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Hr(n,t))return;e.uniform3fv(this.addr,t),Ur(n,t)}}function Jr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hr(n,t))return;e.uniform4fv(this.addr,t),Ur(n,t)}}function Yr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hr(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ur(n,t)}else{if(Hr(n,r))return;Br.set(r),e.uniformMatrix2fv(this.addr,!1,Br),Ur(n,r)}}function Xr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hr(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ur(n,t)}else{if(Hr(n,r))return;zr.set(r),e.uniformMatrix3fv(this.addr,!1,zr),Ur(n,r)}}function Zr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hr(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ur(n,t)}else{if(Hr(n,r))return;Rr.set(r),e.uniformMatrix4fv(this.addr,!1,Rr),Ur(n,r)}}function Qr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function $r(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hr(n,t))return;e.uniform2iv(this.addr,t),Ur(n,t)}}function ei(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Hr(n,t))return;e.uniform3iv(this.addr,t),Ur(n,t)}}function ti(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hr(n,t))return;e.uniform4iv(this.addr,t),Ur(n,t)}}function ni(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ri(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hr(n,t))return;e.uniform2uiv(this.addr,t),Ur(n,t)}}function ii(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Hr(n,t))return;e.uniform3uiv(this.addr,t),Ur(n,t)}}function ai(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hr(n,t))return;e.uniform4uiv(this.addr,t),Ur(n,t)}}function oi(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function si(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?oi(jr):Ar,n.setTexture2D(t||a,i)}function ci(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Pr,i)}function li(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?oi(Mr):Fr,n.setTextureCube(t||a,i)}function ui(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Nr,i)}function di(e){switch(e){case 5126:return Gr;case 35664:return Kr;case 35665:return qr;case 35666:return Jr;case 35674:return Yr;case 35675:return Xr;case 35676:return Zr;case 5124:case 35670:return Qr;case 35667:case 35671:return $r;case 35668:case 35672:return ei;case 35669:case 35673:return ti;case 5125:return ni;case 36294:return ri;case 36295:return ii;case 36296:return ai;case 35678:case 36198:case 36298:case 36306:case 35682:return si;case 35679:case 36299:case 36307:return ci;case 35680:case 36300:case 36308:case 36293:return li;case 36289:case 36303:case 36311:case 36292:return ui}}function fi(e,t){e.uniform1fv(this.addr,t)}function pi(e,t){let n=Vr(t,this.size,2);e.uniform2fv(this.addr,n)}function mi(e,t){let n=Vr(t,this.size,3);e.uniform3fv(this.addr,n)}function hi(e,t){let n=Vr(t,this.size,4);e.uniform4fv(this.addr,n)}function gi(e,t){let n=Vr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function _i(e,t){let n=Vr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function vi(e,t){let n=Vr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function yi(e,t){e.uniform1iv(this.addr,t)}function bi(e,t){e.uniform2iv(this.addr,t)}function xi(e,t){e.uniform3iv(this.addr,t)}function Si(e,t){e.uniform4iv(this.addr,t)}function Ci(e,t){e.uniform1uiv(this.addr,t)}function wi(e,t){e.uniform2uiv(this.addr,t)}function Ti(e,t){e.uniform3uiv(this.addr,t)}function Ei(e,t){e.uniform4uiv(this.addr,t)}function Di(e,t,n){let r=this.cache,i=t.length,a=Wr(n,i);Hr(r,a)||(e.uniform1iv(this.addr,a),Ur(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?oi(jr):Ar;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Oi(e,t,n){let r=this.cache,i=t.length,a=Wr(n,i);Hr(r,a)||(e.uniform1iv(this.addr,a),Ur(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Pr,a[e])}function ki(e,t,n){let r=this.cache,i=t.length,a=Wr(n,i);Hr(r,a)||(e.uniform1iv(this.addr,a),Ur(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?oi(Mr):Fr;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Ai(e,t,n){let r=this.cache,i=t.length,a=Wr(n,i);Hr(r,a)||(e.uniform1iv(this.addr,a),Ur(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Nr,a[e])}function ji(e){switch(e){case 5126:return fi;case 35664:return pi;case 35665:return mi;case 35666:return hi;case 35674:return gi;case 35675:return _i;case 35676:return vi;case 5124:case 35670:return yi;case 35667:case 35671:return bi;case 35668:case 35672:return xi;case 35669:case 35673:return Si;case 5125:return Ci;case 36294:return wi;case 36295:return Ti;case 36296:return Ei;case 35678:case 36198:case 36298:case 36306:case 35682:return Di;case 35679:case 36299:case 36307:return Oi;case 35680:case 36300:case 36308:case 36293:return ki;case 36289:case 36303:case 36311:case 36292:return Ai}}var Mi=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=di(t.type)}},Ni=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ji(t.type)}},Pi=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Fi=/(\w+)(\])?(\[|\.)?/g;function Ii(e,t){e.seq.push(t),e.map[t.id]=t}function Li(e,t,n){let r=e.name,i=r.length;for(Fi.lastIndex=0;;){let a=Fi.exec(r),o=Fi.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ii(n,l===void 0?new Mi(s,e,t):new Ni(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Pi(s),Ii(n,e)),n=e}}}var Ri=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Li(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function zi(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Bi=37297,Vi=0;function Hi(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Ui=new W;function Wi(e){T._getMatrix(Ui,T.workingColorSpace,e);let t=`mat3( ${Ui.elements.map(e=>e.toFixed(4))} )`;switch(T.getTransfer(e)){case de:return[t,`LinearTransferOETF`];case x:return[t,`sRGBTransferOETF`];default:return a(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Gi(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Hi(e.getShaderSource(t),r)}return i}function Ki(e,t){let n=Wi(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var qi={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Ji(e,t){let n=qi[t];return n===void 0?(a(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Yi=new Y;function Xi(){return T.getLuminanceCoefficients(Yi),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Yi.x.toFixed(4)}, ${Yi.y.toFixed(4)}, ${Yi.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Zi(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ea).join(`
`)}function Qi(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function $i(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ea(e){return e!==``}function ta(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function na(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ra=/^[ \t]*#include +<([\w\d./]+)>/gm;function ia(e){return e.replace(ra,aa)}function aa(e,t){let n=Jn[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return ia(n)}var oa=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sa(e){return e.replace(oa,ca)}function ca(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function la(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var ua={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function da(e){return ua[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var fa={302:`ENVMAP_MODE_REFRACTION`};function pa(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:fa[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var ma={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ha(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:ma[e.combine]||`ENVMAP_BLENDING_NONE`}function ga(e,t,n,r){let i=e.getContext(),o=n.defines,s=n.vertexShader,c=n.fragmentShader,l=da(n),d=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,f=pa(n),p=ha(n),m=Zi(n),h=Qi(o),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(ea).join(`
`),_.length>0&&(_+=`
`),v=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(ea).join(`
`),v.length>0&&(v+=`
`)):(_=[la(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+f:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+l:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ea).join(`
`),v=[la(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+d:``,n.envMap?`#define `+f:``,n.envMap?`#define `+p:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+l:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Jn.tonemapping_pars_fragment,n.toneMapping===0?``:Ji(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Jn.colorspace_pars_fragment,Ki(`linearToOutputTexel`,n.outputColorSpace),Xi(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ea).join(`
`)),s=ia(s),s=ta(s,n),s=na(s,n),c=ia(c),c=ta(c,n),c=na(c,n),s=sa(s),c=sa(c),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+s,x=y+v+c,S=zi(i,i.VERTEX_SHADER,b),C=zi(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g)||``,r=i.getShaderInfoLog(S)||``,o=i.getShaderInfoLog(C)||``,s=n.trim(),c=r.trim(),l=o.trim(),d=!0,f=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(d=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Gi(i,S,`vertex`),n=Gi(i,C,`fragment`);u(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+s+`
`+e+`
`+n)}}else s===``?(c===``||l===``)&&(f=!1):a(`WebGLProgram: Program Info Log:`,s);f&&(t.diagnostics={runnable:d,programLog:s,vertexShader:{log:c,prefix:_},fragmentShader:{log:l,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new Ri(i,g),E=$i(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,Bi)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Vi++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var _a=0,va=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ya(e),t.set(e,n)),n}},ya=class{constructor(e){this.id=_a++,this.code=e,this.usedTimes=0}};function ba(e){return e===1030||e===37490||e===36285}function xa(e,t,n,r,i,o){let s=new at,c=new va,l=new Set,u=[],d=new Map,f=r.logarithmicDepthBuffer,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return l.add(e),e===0?`uv`:`uv${e}`}function h(i,s,u,d,h,g){let _=d.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?d.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=p[i.type],C=r.precision;i.precision!==null&&(C=r.getMaxPrecision(i.precision),C!==i.precision&&a(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,C,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,E=w===void 0?0:w.length,D=0;v.morphAttributes.position!==void 0&&(D=1),v.morphAttributes.normal!==void 0&&(D=2),v.morphAttributes.color!==void 0&&(D=3);let O,k,A,j;if(S){let e=Yn[S];O=e.vertexShader,k=e.fragmentShader}else{O=i.vertexShader,k=i.fragmentShader;let e=c.getVertexShaderStage(i),t=c.getFragmentShaderStage(i);c.update(i,e,t),A=e.id,j=t.id}let M=e.getRenderTarget(),N=e.state.buffers.depth.getReversed(),P=h.isInstancedMesh===!0,F=h.isBatchedMesh===!0,I=!!i.map,L=!!i.matcap,R=!!x,z=R&&x.isPMREMTexture===!0,B=!!i.aoMap,V=!!i.lightMap,H=!!i.bumpMap&&i.wireframe===!1,U=!!i.normalMap,W=!!i.displacementMap,ee=!!i.emissiveMap,te=!!i.metalnessMap,ne=!!i.roughnessMap,re=i.anisotropy>0,ie=i.clearcoat>0,G=i.diffuseRoughness>0,ae=i.dispersion>0,oe=i.retroreflectivity>0,se=i.iridescence>0,ce=i.sheen>0,le=i.transmission>0,ue=re&&!!i.anisotropyMap,de=ie&&!!i.clearcoatMap,fe=ie&&!!i.clearcoatNormalMap,pe=ie&&!!i.clearcoatRoughnessMap,me=G&&!!i.diffuseRoughnessMap,he=se&&!!i.iridescenceMap,ge=se&&!!i.iridescenceThicknessMap,_e=ce&&!!i.sheenColorMap,ve=ce&&!!i.sheenRoughnessMap,ye=!!i.specularMap,be=!!i.specularColorMap,K=!!i.specularIntensityMap,xe=le&&!!i.transmissionMap,Se=le&&!!i.thicknessMap,Ce=!!i.gradientMap,q=!!i.alphaMap,we=i.alphaTest>0,Te=!!i.alphaHash,Ee=!!i.extensions,J=0;i.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(J=e.toneMapping);let De=z?x.isCompressedCubeTexture?x.image[0].mipmaps:x.mipmaps:null,Oe={shaderID:S,shaderType:i.type,shaderName:i.name,vertexShader:O,fragmentShader:k,defines:i.defines,customVertexShaderID:A,customFragmentShaderID:j,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:C,batching:F,batchingColor:F&&h._colorsTexture!==null,instancing:P,instancingColor:P&&h.instanceColor!==null,instancingMorph:P&&h.morphTexture!==null,outputColorSpace:M===null?e.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:T.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:I,matcap:L,envMap:R,envMapMode:R&&x.mapping,envMapPMREM:z,envMapMaxLod:z?De.length-1:null,envMapSize:z?De[0].width:null,aoMap:B,lightMap:V,bumpMap:H,normalMap:U,displacementMap:W,emissiveMap:ee,normalMapObjectSpace:U&&i.normalMapType===1,normalMapTangentSpace:U&&i.normalMapType===0,packedNormalMap:U&&i.normalMapType===0&&ba(i.normalMap.format),metalnessMap:te,roughnessMap:ne,anisotropy:re,anisotropyMap:ue,clearcoat:ie,clearcoatMap:de,clearcoatNormalMap:fe,clearcoatRoughnessMap:pe,diffuseRoughness:G,diffuseRoughnessMap:me,dispersion:ae,retroreflection:oe,iridescence:se,iridescenceMap:he,iridescenceThicknessMap:ge,sheen:ce,sheenColorMap:_e,sheenRoughnessMap:ve,specularMap:ye,specularColorMap:be,specularIntensityMap:K,transmission:le,transmissionMap:xe,thicknessMap:Se,gradientMap:Ce,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:q,alphaTest:we,alphaHash:Te,combine:i.combine,mapUv:I&&m(i.map.channel),aoMapUv:B&&m(i.aoMap.channel),lightMapUv:V&&m(i.lightMap.channel),bumpMapUv:H&&m(i.bumpMap.channel),normalMapUv:U&&m(i.normalMap.channel),displacementMapUv:W&&m(i.displacementMap.channel),emissiveMapUv:ee&&m(i.emissiveMap.channel),metalnessMapUv:te&&m(i.metalnessMap.channel),roughnessMapUv:ne&&m(i.roughnessMap.channel),anisotropyMapUv:ue&&m(i.anisotropyMap.channel),clearcoatMapUv:de&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:fe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&m(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:me&&m(i.diffuseRoughnessMap.channel),iridescenceMapUv:he&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(i.sheenRoughnessMap.channel),specularMapUv:ye&&m(i.specularMap.channel),specularColorMapUv:be&&m(i.specularColorMap.channel),specularIntensityMapUv:K&&m(i.specularIntensityMap.channel),transmissionMapUv:xe&&m(i.transmissionMap.channel),thicknessMapUv:Se&&m(i.thicknessMap.channel),alphaMapUv:q&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(U||re),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(I||q),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&U===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:N,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:s.sun.length,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numSunLightShadows:s.sunShadowMap.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numLightProbeGrids:g.filter(e=>e.texture!==null).length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:J,decodeVideoTexture:I&&i.map.isVideoTexture===!0&&T.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ee&&i.emissiveMap.isVideoTexture===!0&&T.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ee&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ee&&i.extensions.multiDraw===!0||F)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Oe.vertexUv1s=l.has(1),Oe.vertexUv2s=l.has(2),Oe.vertexUv3s=l.has(3),l.clear(),Oe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){s.disableAll(),t.instancing&&s.enable(0),t.instancingColor&&s.enable(1),t.instancingMorph&&s.enable(2),t.matcap&&s.enable(3),t.envMap&&s.enable(4),t.normalMapObjectSpace&&s.enable(5),t.normalMapTangentSpace&&s.enable(6),t.clearcoat&&s.enable(7),t.iridescence&&s.enable(8),t.alphaTest&&s.enable(9),t.vertexColors&&s.enable(10),t.vertexAlphas&&s.enable(11),t.vertexUv1s&&s.enable(12),t.vertexUv2s&&s.enable(13),t.vertexUv3s&&s.enable(14),t.vertexTangents&&s.enable(15),t.anisotropy&&s.enable(16),t.alphaHash&&s.enable(17),t.batching&&s.enable(18),t.dispersion&&s.enable(19),t.retroreflection&&s.enable(24),t.diffuseRoughness&&s.enable(25),t.batchingColor&&s.enable(20),t.gradientMap&&s.enable(21),t.packedNormalMap&&s.enable(22),t.vertexNormals&&s.enable(23),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),t.numLightProbeGrids>0&&s.enable(22),t.hasPositionAttribute&&s.enable(23),e.push(s.mask)}function y(e){let t=p[e.type],n;if(t){let e=Yn[t];n=J.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=d.get(n);return r===void 0?(r=new ga(e,n,t,i),u.push(r),d.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),d.delete(e.cacheKey),e.destroy()}}function S(e){c.remove(e)}function C(){c.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:u,dispose:C}}function Sa(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ca(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function wa(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ta(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ca),r.length>1&&r.sort(t||wa),i.length>1&&i.sort(t||wa)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ea(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Ta,e.set(t,[i])):n>=r.length?(i=new Ta,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Da(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Y,color:new v};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new v,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new v,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new v,groundColor:new v};break;case`RectAreaLight`:n={color:new v,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function Oa(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ka=0;function Aa(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function ja(e){let t=new Da,n=Oa(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Y);let i=new Y,a=new et,o=new et;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Aa);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ka++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Ma(e){let t=new ja(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Na(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ma(e),t.set(n,[a])):r>=i.length?(a=new Ma(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Pa=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fa=`uniform sampler2D shadow_pass;
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
}`,Ia=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],La=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Ra=new et,za=new Y,Ba=new Y;function Va(e,t,n){let r=new bt,s=new it,c=new it,l=new Ve,u=new R,d=new V,f={},p=n.maxTextureSize,m={0:1,1:0,2:2},h=new gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Pa,fragmentShader:Fa}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let _=new Qe;_.setAttribute(`position`,new H(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new o(_,h),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let x=this.type;this.render=function(t,n,o){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||t.length===0)return;this.type===2&&(a(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=x!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],f=d.shadow;if(f===void 0){a(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;s.copy(f.mapSize);let g=f.getFrameExtents();s.multiply(g),c.copy(f.mapSize),(s.x>p||s.y>p)&&(s.x>p&&(c.x=Math.floor(p/g.x),s.x=c.x*g.x,f.mapSize.x=c.x),s.y>p&&(c.y=Math.floor(p/g.y),s.y=c.y*g.y,f.mapSize.y=c.y));let _=e.state.buffers.depth.getReversed();if(f.camera._reversedDepth=_,f.map===null||h===!0){if(f.map!==null&&(f.map.depthTexture!==null&&(f.map.depthTexture.dispose(),f.map.depthTexture=null),f.map.dispose()),this.type===3){if(d.isPointLight){a(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}f.map=new kt(s.x,s.y,{format:i,type:St,minFilter:Ft,magFilter:Ft,generateMipmaps:!1}),f.map.texture.name=d.name+`.shadowMap`,f.map.depthTexture=new ht(s.x,s.y,wt),f.map.depthTexture.name=d.name+`.shadowMapDepth`,f.map.depthTexture.format=b,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=F,f.map.depthTexture.magFilter=F}else d.isPointLight?(f.map=new ir(s.x),f.map.depthTexture=new zt(s.x,Et)):(f.map=new kt(s.x,s.y),f.map.depthTexture=new ht(s.x,s.y,Et)),f.map.depthTexture.name=d.name+`.shadowMap`,f.map.depthTexture.format=b,this.type===1?(f.map.depthTexture.compareFunction=_?518:515,f.map.depthTexture.minFilter=Ft,f.map.depthTexture.magFilter=Ft):(f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=F,f.map.depthTexture.magFilter=F);f.camera.updateProjectionMatrix()}f.map.isWebGLCubeRenderTarget!==!0&&(f.map.width!==s.x||f.map.height!==s.y)&&f.map.setSize(s.x,s.y);let v=f.map.isWebGLCubeRenderTarget?6:f.getViewportCount();d.isPointLight!==!0&&f.updateMatrices(d,o);let y=f.camera.layers.mask&4294967294?f.camera.layers:o.layers;for(let t=0;t<v;t++){let i=f.getCamera(t);if(d.isPointLight){let e=f.camera,n=f.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),za.setFromMatrixPosition(d.matrixWorld),e.position.copy(za),Ba.copy(e.position),Ba.add(Ia[t]),e.up.copy(La[t]),e.lookAt(Ba),e.updateMatrixWorld(),n.makeTranslation(-za.x,-za.y,-za.z),Ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),f._frustum.setFromProjectionMatrix(Ra,e.coordinateSystem,e.reversedDepth)}if(f.map.isWebGLCubeRenderTarget)e.setRenderTarget(f.map,t),e.clear();else{t===0&&(e.setRenderTarget(f.map),e.clear());let n=f.getViewport(t);l.set(c.x*n.x,c.y*n.y,c.x*n.z,c.y*n.w),m.viewport(l)}r=f.getFrustum(t),w(n,o,i,d,y,this.type)}f.isPointLightShadow!==!0&&this.type===3&&S(f,o),f.needsUpdate=!1}x=this.type,y.needsUpdate=!1,e.setRenderTarget(u,d,f)};function S(n,r){let a=t.update(v);h.defines.VSM_SAMPLES!==n.blurSamples&&(h.defines.VSM_SAMPLES=n.blurSamples,g.defines.VSM_SAMPLES=n.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),n.mapPass===null?n.mapPass=new kt(s.x,s.y,{format:i,type:St}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),h.uniforms.shadow_pass.value=n.map.depthTexture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,h,v,null),g.uniforms.shadow_pass.value=n.mapPass.texture,g.uniforms.resolution.value.set(n.map.width,n.map.height),g.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,g,v,null)}function C(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?d:u,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=f[e];r===void 0&&(r={},f[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,T)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?m[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function w(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=C(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=C(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)w(l[e],i,a,o,s,c)}function T(e){e.target.removeEventListener(`dispose`,T);for(let t in f){let n=f[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Ha(e,t){function n(){let t=!1,n=new Ve,r=null,i=new Ve(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?te(e.DEPTH_TEST):ne(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ae[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?te(e.STENCIL_TEST):ne(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,d={},f={},p={},m=new WeakMap,h=[],g=null,_=!1,y=null,b=null,x=null,S=null,C=null,w=null,T=null,E=new v(0,0,0),D=0,O=!1,k=null,A=null,j=null,M=null,N=null,P=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,I=0,L=e.getParameter(e.VERSION);L.indexOf(`WebGL`)===-1?L.indexOf(`OpenGL ES`)!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),F=I>=2):(I=parseFloat(/^WebGL (\d)/.exec(L)[1]),F=I>=1);let R=null,z={},B=e.getParameter(e.SCISSOR_BOX),V=e.getParameter(e.VIEWPORT),H=new Ve().fromArray(B),U=new Ve().fromArray(V);function W(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ee={};ee[e.TEXTURE_2D]=W(e.TEXTURE_2D,e.TEXTURE_2D,1),ee[e.TEXTURE_CUBE_MAP]=W(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[e.TEXTURE_2D_ARRAY]=W(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ee[e.TEXTURE_3D]=W(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),te(e.DEPTH_TEST),o.setFunc(3),ue(!1),de(1),te(e.CULL_FACE),ce(0);function te(t){d[t]!==!0&&(e.enable(t),d[t]=!0)}function ne(t){d[t]!==!1&&(e.disable(t),d[t]=!1)}function re(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function ie(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function G(t){return g!==t&&(e.useProgram(t),g=t,!0)}let oe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};oe[103]=e.MIN,oe[104]=e.MAX;let se={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ce(t,n,r,i,a,o,s,c,l,d){if(t===0)_===!0&&(ne(e.BLEND),_=!1);else if(_===!1&&(te(e.BLEND),_=!0),t!==5){if(t!==y||d!==O){if((b!==100||C!==100)&&(e.blendEquation(e.FUNC_ADD),b=100,C=100),d)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:u(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:u(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:u(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:u(`WebGLState: Invalid blending: `,t)}x=null,S=null,w=null,T=null,E.set(0,0,0),D=0,y=t,O=d}}else a||=n,o||=r,s||=i,(n!==b||a!==C)&&(e.blendEquationSeparate(oe[n],oe[a]),b=n,C=a),(r!==x||i!==S||o!==w||s!==T)&&(e.blendFuncSeparate(se[r],se[i],se[o],se[s]),x=r,S=i,w=o,T=s),(c.equals(E)===!1||l!==D)&&(e.blendColor(c.r,c.g,c.b,l),E.copy(c),D=l),y=t,O=!1}function le(t,n){t.side===2?ne(e.CULL_FACE):te(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ue(r),t.blending===1&&t.transparent===!1?ce(0):ce(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),pe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?te(e.SAMPLE_ALPHA_TO_COVERAGE):ne(e.SAMPLE_ALPHA_TO_COVERAGE)}function ue(t){k!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),k=t)}function de(t){t===0?ne(e.CULL_FACE):(te(e.CULL_FACE),t!==A&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),A=t}function fe(t){t!==j&&(F&&e.lineWidth(t),j=t)}function pe(t,n,r){t?(te(e.POLYGON_OFFSET_FILL),(M!==n||N!==r)&&(M=n,N=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ne(e.POLYGON_OFFSET_FILL)}function me(t){t?te(e.SCISSOR_TEST):ne(e.SCISSOR_TEST)}function he(t){t===void 0&&(t=e.TEXTURE0+P-1),R!==t&&(e.activeTexture(t),R=t)}function ge(t,n,r){r===void 0&&(r=R===null?e.TEXTURE0+P-1:R);let i=z[r];i===void 0&&(i={type:void 0,texture:void 0},z[r]=i),(i.type!==t||i.texture!==n)&&(R!==r&&(e.activeTexture(r),R=r),e.bindTexture(t,n||ee[t]),i.type=t,i.texture=n)}function _e(){let t=z[R];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ve(){try{e.compressedTexImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function ye(){try{e.compressedTexImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function be(){try{e.texSubImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function K(){try{e.texSubImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function xe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Se(){try{e.compressedTexSubImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Ce(){try{e.texStorage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function q(){try{e.texStorage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function we(){try{e.texImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Te(){try{e.texImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Ee(t){return f[t]===void 0?e.getParameter(t):f[t]}function J(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function De(t){H.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),H.copy(t))}function Oe(t){U.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),U.copy(t))}function ke(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Ae(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function je(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},R=null,z={},p={},c={},m=new WeakMap,h=[],g=null,_=!1,y=null,b=null,x=null,S=null,C=null,w=null,T=null,E=new v(0,0,0),D=0,O=!1,k=null,A=null,j=null,M=null,N=null,H.set(0,0,e.canvas.width,e.canvas.height),U.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:te,disable:ne,bindFramebuffer:re,drawBuffers:ie,useProgram:G,setBlending:ce,setMaterial:le,setFlipSided:ue,setCullFace:de,setLineWidth:fe,setPolygonOffset:pe,setScissorTest:me,activeTexture:he,bindTexture:ge,unbindTexture:_e,compressedTexImage2D:ve,compressedTexImage3D:ye,texImage2D:we,texImage3D:Te,pixelStorei:J,getParameter:Ee,updateUBOMapping:ke,uniformBlockBinding:Ae,texStorage2D:Ce,texStorage3D:q,texSubImage2D:be,texSubImage3D:K,compressedTexSubImage2D:xe,compressedTexSubImage3D:Se,scissor:De,viewport:Oe,reset:je}}function Ua(e,t,n,r,i,o,s){let c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),f=new it,p=new WeakMap,m=new Set,h,g=new WeakMap,_=new Set,v=new FinalizationRegistry(e=>_.delete(e)),y=!1;try{y=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function b(e,t){return y?new OffscreenCanvas(e,t):se(`canvas`)}function x(e,t,n){let r=1,i=Me(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),o=Math.floor(r*i.height);h===void 0&&(h=b(n,o));let s=t?b(n,o):h;return s.width=n,s.height=o,s.getContext(`2d`).drawImage(e,0,0,n,o),a(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+o+`).`),s}return`data`in e&&a(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function S(e){return e.generateMipmaps}function C(t){e.generateMipmap(t)}function w(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function E(n,r,i,o,s,c=!1){if(n!==null){if(e[n]!==void 0)return e[n];a(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let l;o&&(l=t.get(`EXT_texture_norm16`),l||a(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let u=r;if(r===e.RED&&(i===e.FLOAT&&(u=e.R32F),i===e.HALF_FLOAT&&(u=e.R16F),i===e.UNSIGNED_BYTE&&(u=e.R8),i===e.UNSIGNED_SHORT&&l&&(u=l.R16_EXT),i===e.SHORT&&l&&(u=l.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.R8UI),i===e.UNSIGNED_SHORT&&(u=e.R16UI),i===e.UNSIGNED_INT&&(u=e.R32UI),i===e.BYTE&&(u=e.R8I),i===e.SHORT&&(u=e.R16I),i===e.INT&&(u=e.R32I)),r===e.RG&&(i===e.FLOAT&&(u=e.RG32F),i===e.HALF_FLOAT&&(u=e.RG16F),i===e.UNSIGNED_BYTE&&(u=e.RG8),i===e.UNSIGNED_SHORT&&l&&(u=l.RG16_EXT),i===e.SHORT&&l&&(u=l.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RG8UI),i===e.UNSIGNED_SHORT&&(u=e.RG16UI),i===e.UNSIGNED_INT&&(u=e.RG32UI),i===e.BYTE&&(u=e.RG8I),i===e.SHORT&&(u=e.RG16I),i===e.INT&&(u=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RGB8UI),i===e.UNSIGNED_SHORT&&(u=e.RGB16UI),i===e.UNSIGNED_INT&&(u=e.RGB32UI),i===e.BYTE&&(u=e.RGB8I),i===e.SHORT&&(u=e.RGB16I),i===e.INT&&(u=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(u=e.RGBA16UI),i===e.UNSIGNED_INT&&(u=e.RGBA32UI),i===e.BYTE&&(u=e.RGBA8I),i===e.SHORT&&(u=e.RGBA16I),i===e.INT&&(u=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&l&&(u=l.RGB16_EXT),i===e.SHORT&&l&&(u=l.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(u=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(u=e.R11F_G11F_B10F)),r===e.RGBA){let t=c?de:T.getTransfer(s);i===e.FLOAT&&(u=e.RGBA32F),i===e.HALF_FLOAT&&(u=e.RGBA16F),i===e.UNSIGNED_BYTE&&(u=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&l&&(u=l.RGBA16_EXT),i===e.SHORT&&l&&(u=l.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(u=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(u=e.RGB5_A1)}return(u===e.R16F||u===e.R32F||u===e.RG16F||u===e.RG32F||u===e.RGBA16F||u===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),u}function O(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,a(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function k(e,t){return S(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function j(e){let t=new WeakRef(e);r.get(e).__ref=t,_.add(t),v.register(e,t,t)}function M(e){let t=r.get(e).__ref;t!==void 0&&(_.delete(t),v.unregister(t))}function N(e){L(e.target)}function I(e){R(e.target)}function L(e){e.removeEventListener(`dispose`,N),M(e),B(e),e.isVideoTexture&&p.delete(e),e.isHTMLTexture&&m.delete(e)}function R(e){e.removeEventListener(`dispose`,I),M(e),H(e)}function z(){for(let e of _){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?R(t):L(t))}_.clear(),m.clear()}function B(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=g.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&V(e),Object.keys(i).length===0&&g.delete(n)}r.remove(e)}function V(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=g.get(i);delete a[n.__cacheKey],s.memory.textures--}function H(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&L(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),r.remove(a[t])}r.remove(t)}let U=0;function W(){U=0}function te(){return U}function ne(e){U=e}function re(){let e=U;return e>=i.maxTextures&&a(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),U+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function G(t,i){let o=r.get(t);if(t.isVideoTexture&&Ae(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&o.__version!==t.version){let e=t.image;if(e===null)a(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)a(`WebGLRenderer: Texture marked for update but image is incomplete`);else{be(o,t,i);return}}else t.isExternalTexture&&(o.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,o.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?be(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function le(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?be(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?K(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let pe={[P]:e.REPEAT,[ee]:e.CLAMP_TO_EDGE,[D]:e.MIRRORED_REPEAT},me={[F]:e.NEAREST,[Vt]:e.NEAREST_MIPMAP_NEAREST,[oe]:e.NEAREST_MIPMAP_LINEAR,[Ft]:e.LINEAR,[d]:e.LINEAR_MIPMAP_NEAREST,[ce]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(n,o){if(o.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(o.magFilter===1006||o.magFilter===1007||o.magFilter===1005||o.magFilter===1008||o.minFilter===1006||o.minFilter===1007||o.minFilter===1005||o.minFilter===1008)&&a(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,pe[o.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,pe[o.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,pe[o.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,me[o.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,me[o.minFilter]),o.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,he[o.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(o.magFilter===1003||o.minFilter!==1005&&o.minFilter!==1008||o.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(o.anisotropy>1||r.get(o).__currentAnisotropy){let a=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,a.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,i.getMaxAnisotropy())),r.get(o).__currentAnisotropy=o.anisotropy}}}function _e(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,N),j(n));let i=n.source,a=g.get(i);a===void 0&&(a={},g.set(i,a));let o=ie(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&V(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ve(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ye(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ve(n.start,r.width,4),c=ve(t.start,r.width,4);n.start<=i+1&&a===c&&ve(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function be(t,s,c){let l=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(l=e.TEXTURE_3D);let u=_e(t,s),d=s.source;n.bindTexture(l,t.__webglTexture,e.TEXTURE0+c);let f=r.get(d);if(d.version!==f.__version||u===!0){if(n.activeTexture(e.TEXTURE0+c),!(typeof ImageBitmap<`u`&&s.image instanceof ImageBitmap)){let t=T.getPrimaries(T.workingColorSpace),r=s.colorSpace===``?null:T.getPrimaries(s.colorSpace),i=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let t=x(s.image,!1,i.maxTextureSize);t=je(s,t);let r=o.convert(s.format,s.colorSpace),p=o.convert(s.type),h=E(s.internalFormat,r,p,s.normalized,s.colorSpace,s.isVideoTexture);ge(l,s);let g,_=s.mipmaps,v=s.isVideoTexture!==!0,y=f.__version===void 0||u===!0,b=d.dataReady,w=k(s,t);if(s.isDepthTexture)h=O(s.format===A,s.type),y&&(v?n.texStorage2D(e.TEXTURE_2D,1,h,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,null));else if(s.isDataTexture){if(_.length>0){v&&y&&n.texStorage2D(e.TEXTURE_2D,w,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data);s.generateMipmaps=!1}else v?(y&&n.texStorage2D(e.TEXTURE_2D,w,h,t.width,t.height),b&&ye(s,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,t.data)}else if(s.isCompressedTexture){if(s.isCompressedArrayTexture){v&&y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,h,_[0].width,_[0].height,t.depth);for(let i=0,o=_.length;i<o;i++)if(g=_[i],s.format!==1023){if(r!==null){if(v){if(b){if(s.layerUpdates.size>0){let t=ue(g.width,g.height,s.format,s.type);for(let a of s.layerUpdates){let o=g.data.subarray(a*t/g.data.BYTES_PER_ELEMENT,(a+1)*t/g.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,g.width,g.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,g.width,g.height,t.depth,r,g.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,h,g.width,g.height,t.depth,0,g.data,0,0)}else a(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?b&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,g.width,g.height,t.depth,r,p,g.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,h,g.width,g.height,t.depth,0,r,p,g.data);s.layerUpdates.size>0&&s.clearLayerUpdates()}else{v&&y&&n.texStorage2D(e.TEXTURE_2D,w,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],s.format===1023?v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data):r===null?a(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?b&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,g.data):n.compressedTexImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,g.data)}}else if(s.isDataArrayTexture){if(v){if(y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,h,t.width,t.height,t.depth),b){if(s.layerUpdates.size>0){let i=ue(t.width,t.height,s.format,s.type);for(let a of s.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}s.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,h,t.width,t.height,t.depth,0,r,p,t.data)}else if(s.isData3DTexture)v?(y&&n.texStorage3D(e.TEXTURE_3D,w,h,t.width,t.height,t.depth),b&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,h,t.width,t.height,t.depth,0,r,p,t.data);else if(s.isFramebufferTexture){if(y){if(v)n.texStorage2D(e.TEXTURE_2D,w,h,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<w;t++)n.texImage2D(e.TEXTURE_2D,t,h,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(s.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),m.add(s),n.onpaint=e=>{let t=e.changedElements;for(let e of m)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(v&&y){let t=Me(_[0]);n.texStorage2D(e.TEXTURE_2D,w,h,t.width,t.height)}for(let t=0,i=_.length;t<i;t++)g=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,g):n.texImage2D(e.TEXTURE_2D,t,h,r,p,g);s.generateMipmaps=!1}else if(v){if(y){let r=Me(t);n.texStorage2D(e.TEXTURE_2D,w,h,r.width,r.height)}b&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,h,r,p,t);S(s)&&s.mipmapsAutoUpdate===!0&&C(l),f.__version=d.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function K(t,s,c){if(s.image.length!==6)return;let l=_e(t,s),u=s.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+c);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+c);let t=T.getPrimaries(T.workingColorSpace),r=s.colorSpace===``?null:T.getPrimaries(s.colorSpace),f=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=s.isCompressedTexture||s.image[0].isCompressedTexture,m=s.image[0]&&s.image[0].isDataTexture,h=[];for(let e=0;e<6;e++)!p&&!m?h[e]=x(s.image[e],!0,i.maxCubemapSize):h[e]=m?s.image[e].image:s.image[e],h[e]=je(s,h[e]);let g=h[0],_=o.convert(s.format,s.colorSpace),v=o.convert(s.type),y=E(s.internalFormat,_,v,s.normalized,s.colorSpace),b=s.isVideoTexture!==!0,w=d.__version===void 0||l===!0,D=u.dataReady,j=k(s,g);ge(e.TEXTURE_CUBE_MAP,s);let M;if(s.isDepthTexture){if(y=O(s.format===A,s.type),w){if(b)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,y,g.width,g.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,g.width,g.height,0,_,v,null)}}else if(p){b&&w&&n.texStorage2D(e.TEXTURE_CUBE_MAP,j,y,g.width,g.height);for(let t=0;t<6;t++){M=h[t].mipmaps;for(let r=0;r<M.length;r++){let i=M[r];s.format===1023?b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,_,v,i.data):_===null?a(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):b?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(M=s.mipmaps,b&&w){M.length>0&&j++;let t=Me(h[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,j,y,t.width,t.height)}for(let t=0;t<6;t++)if(m){b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,h[t].width,h[t].height,_,v,h[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h[t].width,h[t].height,0,_,v,h[t].data);for(let r=0;r<M.length;r++){let i=M[r].image[t].image;b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,_,v,i.data)}}else{b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,v,h[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,_,v,h[t]);for(let r=0;r<M.length;r++){let i=M[r];b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,_,v,i.image[t])}}}S(s)&&s.mipmapsAutoUpdate===!0&&C(e.TEXTURE_CUBE_MAP),d.__version=u.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function xe(t,i,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=E(a.internalFormat,d,f,a.normalized,a.colorSpace),m=r.get(i),h=r.get(a);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),ke(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,h.__webglTexture,0,Oe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=O(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;ke(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Oe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Oe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=E(a.internalFormat,s,l,a.normalized,a.colorSpace);ke(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Oe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Oe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ce(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let s=r.get(i.depthTexture);s.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;s.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?fe(i.depthTexture,0):G(i.depthTexture,0);let u=s.__webglTexture,d=Oe(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)ke(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)ke(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function q(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Ce(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Ce(i.__webglFramebuffer[0],t,0):Ce(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Se(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Se(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,i){let a=r.get(t);n!==void 0&&xe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&q(t)}function Te(t){let i=t.texture,a=r.get(t),c=r.get(i);t.addEventListener(`dispose`,I),j(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&ke(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=E(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Oe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),Se(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ge(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)xe(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else xe(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);S(i)?C(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,o=l.length;i<o;i++){let o=l[i],s=r.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),ge(c,o),xe(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,c,0),S(o)&&C(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ge(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)xe(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else xe(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);S(i)?C(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&q(t)}function Ee(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(S(a)&&a.mipmapsAutoUpdate===!0){let t=w(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),C(t),n.unbindTexture()}}}let J=[];function De(t){if(t.samples>0){if(ke(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),l===!0&&(J.length=0,J.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&J.push(c),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,J))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&l){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Oe(e){return Math.min(i.maxSamples,e.samples)}function ke(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ae(e){let t=s.render.frame;p.get(e)!==t&&(p.set(e,t),e.update())}function je(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(T.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&a(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):u(`WebGLTextures: Unsupported texture color space:`,n)),t}function Me(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(f.width=e.naturalWidth||e.width,f.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(f.width=e.displayWidth,f.height=e.displayHeight):(f.width=e.width,f.height=e.height),f}this.allocateTextureUnit=re,this.resetTextureUnits=W,this.getTextureUnits=te,this.setTextureUnits=ne,this.setTexture2D=G,this.setTexture2DArray=ae,this.setTexture3D=le,this.setTextureCube=fe,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ke,this.dispose=z}function Wa(e,t){function n(n,r=``){let i,a=T.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ga=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ka=`
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

}`,qa=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new re(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gt({vertexShader:Ga,fragmentShader:Ka,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new o(new S(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ja=class extends Se{constructor(e,t){super();let n=this,i=null,o=1,s=null,c=`local-floor`,u=1,d=null,f=null,p=null,m=null,h=null,g=null,_=typeof XRWebGLBinding<`u`,v=new qa,y={},x=t.getContextAttributes(),S=null,C=null,w=[],T=[],E=new it,D=null,O=null,k=new pe;k.viewport=new Ve;let j=new pe;j.viewport=new Ve;let M=[k,j],N=new l,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=w[e];return t===void 0&&(t=new Lt,w[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=w[e];return t===void 0&&(t=new Lt,w[e]=t),t.getGripSpace()},this.getHand=function(e){let t=w[e];return t===void 0&&(t=new Lt,w[e]=t),t.getHandSpace()};function I(e){let t=T.indexOf(e.inputSource);if(t===-1)return;let n=w[t];n!==void 0&&(n.update(e.inputSource,e.frame,d||s),n.dispatchEvent({type:e.type,data:e.inputSource}))}function L(){i.removeEventListener(`select`,I),i.removeEventListener(`selectstart`,I),i.removeEventListener(`selectend`,I),i.removeEventListener(`squeeze`,I),i.removeEventListener(`squeezestart`,I),i.removeEventListener(`squeezeend`,I),i.removeEventListener(`end`,L),i.removeEventListener(`inputsourceschange`,R);for(let e=0;e<w.length;e++){let t=T[e];t!==null&&(T[e]=null,w[e].disconnect(t))}P=null,F=null,v.reset();for(let e in y)delete y[e];if(e.setRenderTarget(S),h=null,m=null,p=null,i=null,C=null,U.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(E.width,E.height,!1),O!==null){let e=O.camera;e.fov=O.fov,e.zoom=O.zoom,e.updateProjectionMatrix(),O=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){o=e,n.isPresenting===!0&&a(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){c=e,n.isPresenting===!0&&a(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return d||s},this.setReferenceSpace=function(e){d=e},this.getBaseLayer=function(){return m===null?h:m},this.getBinding=function(){return p===null&&_&&(p=new XRWebGLBinding(i,t)),p},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(a){if(i=a,i!==null){if(S=e.getRenderTarget(),i.addEventListener(`select`,I),i.addEventListener(`selectstart`,I),i.addEventListener(`selectend`,I),i.addEventListener(`squeeze`,I),i.addEventListener(`squeezestart`,I),i.addEventListener(`squeezeend`,I),i.addEventListener(`end`,L),i.addEventListener(`inputsourceschange`,R),x.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(E),_&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,s=null;x.depth&&(s=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=x.stencil?A:b,a=x.stencil?Ae:Et);let c={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:o};p=this.getBinding(),m=p.createProjectionLayer(c),i.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),C=new kt(m.textureWidth,m.textureHeight,{format:r,type:ut,depthTexture:new ht(m.textureWidth,m.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}else{let n={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(i,t,n),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),C=new kt(h.framebufferWidth,h.framebufferHeight,{format:r,type:ut,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(u),d=null,s=await i.requestReferenceSpace(c),U.setContext(i),U.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function R(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=T.indexOf(n);r>=0&&(T[r]=null,w[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=T.indexOf(n);if(r===-1){for(let e=0;e<w.length;e++)if(e>=T.length){T.push(n),r=e;break}else if(T[e]===null){T[e]=n,r=e;break}if(r===-1)break}let i=w[r];i&&i.connect(n)}}function z(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(i===null)return;let t=e.near,n=e.far;v.texture!==null&&(v.depthNear>0&&(t=v.depthNear),v.depthFar>0&&(n=v.depthFar)),N.near=j.near=k.near=t,N.far=j.far=k.far=n,(P!==N.near||F!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),P=N.near,F=N.far),N.layers.mask=e.layers.mask|6,k.layers.mask=N.layers.mask&-5,j.layers.mask=N.layers.mask&-3;let r=e.parent,a=N.cameras;z(N,r);for(let e=0;e<a.length;e++)z(a[e],r);N.projectionMatrix.copy(k.projectionMatrix),N.projectionMatrixInverse.copy(k.projectionMatrixInverse),O===null&&e.isPerspectiveCamera&&(O={camera:e,fov:e.fov,zoom:e.zoom}),B(e,N,r)};function B(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=xe*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(m!==null||h!==null)return u},this.setFoveation=function(e){u=e,m!==null&&(m.fixedFoveation=e),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=e)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(N)},this.getCameraTexture=function(e){return y[e]};let V=null;function H(t,r){if(f=r.getViewerPose(d||s),g=r,f!==null){let t=f.views;h!==null&&(e.setRenderTargetFramebuffer(C,h.framebuffer),e.setRenderTarget(C));let r=!1;t.length!==N.cameras.length&&(N.cameras.length=0,r=!0);for(let n=0;n<t.length;n++){let i=t[n],a=null;if(h!==null)a=h.getViewport(i);else{let t=p.getViewSubImage(m,i);a=t.viewport,n===0&&(e.setRenderTargetTextures(C,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(C))}let o=M[n];o===void 0&&(o=new pe,o.layers.enable(n),o.viewport=new Ve,M[n]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(N.matrix.copy(o.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),r===!0&&N.cameras.push(o)}let a=i.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&i.depthUsage==`gpu-optimized`&&_){p=n.getBinding();let e=p.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&v.init(e,i.renderState)}if(a&&a.includes(`camera-access`)&&_){e.state.unbindTexture(),p=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=y[n];e||(e=new re,y[n]=e);let t=p.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<w.length;e++){let t=T[e],n=w[e];t!==null&&n!==void 0&&n.update(t,r,d||s)}V&&V(t,r),r.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:r}),g=null}let U=new Kn;U.setAnimationLoop(H),this.setAnimationLoop=function(e){V=e},this.dispose=function(){}}},Ya=new et,Xa=new W;Xa.set(-1,0,0,0,1,0,0,0,1);function Za(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,g(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ya.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Xa),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Qa(e,t,n,r){let i={},o={};function s(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function c(e,n){let a=i[e.id];a===void 0&&(h(e),a=l(e),i[e.id]=a,e.addEventListener(`dispose`,_));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;o[e.id]!==c&&(u(e),o[e.id]=c)}function l(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function u(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)d(t[n],e,n,a);else d(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(t,n,r,i){if(p(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=g(i,!0);f(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else f(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function f(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)m(i[n],e,n)===!0&&(t=!0);return t}return m(i,r,a)}function m(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function h(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=g(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function g(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?a(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):a(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function _(t){let n=t.target;n.removeEventListener(`dispose`,_),e.deleteBuffer(i[n.id]),delete i[n.id],delete o[n.id]}function v(){for(let t in i)e.deleteBuffer(i[t]);i={},o={}}return{bind:s,update:c,dispose:v}}var $a=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),eo=null;function to(){return eo===null&&(eo=new ge($a,16,16,i,St),eo.name=`DFG_LUT`,eo.minFilter=Ft,eo.magFilter=Ft,eo.wrapS=ee,eo.wrapT=ee,eo.generateMipmaps=!1,eo.needsUpdate=!0),eo}var no=class{constructor(e={}){let{canvas:t=Pt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:h=ut}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);g=n.getContextAttributes().alpha}else g=o;let _=h,y=new Set([Fe,Ye,E]),b=new Set([ut,Et,pt,Ae,Ne,ze]),x=new Uint32Array(4),S=new Int32Array(4),C={textures:[],min:[],max:[],resolution:[]},w=null,D=null,O=[],k=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,M=!1,N=null,P=null,F=null,I=null;this._outputColorSpace=_e;let L=0,R=0,z=null,B=-1,V=null,H=new Ve,U=new Ve,W=null,ee=new v(0),te=0,ne=t.width,re=t.height,ie=1,G=null,ae=null,oe=new Ve(0,0,ne,re),se=new Ve(0,0,ne,re),le=!1,ue=new bt,de=new qe,fe=!1,pe=!1,me=new et,he=new Y,ge=new Ve,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function be(){return z===null?ie:1}let K=n;function xe(e,n){return t.getContext(e,n)}let Se,Ce,q,Te,Ee,J,De,Oe,ke,je,Me,Pe,Ie,Le,Re,Be,He,Ue,We,Ge,Ke,Je,Xe;try{let e={alpha:!0,depth:r,stencil:i,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,tt,!1),t.addEventListener(`webglcontextrestored`,nt,!1),t.addEventListener(`webglcontextcreationerror`,rt,!1),K===null){let t=`webgl2`;if(K=xe(t,e),K===null)throw xe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ze()}catch(e){throw t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,rt,!1),u(`WebGLRenderer: `+e.message),e}function Ze(){Se=new Sr(K),Se.init(),Ke=new Wa(K,Se),Ce=new nr(K,Se,e,Ke),q=new Ha(K,Se),Ce.reversedDepthBuffer&&m&&q.buffers.depth.setReversed(!0),P=K.createFramebuffer(),F=K.createFramebuffer(),I=K.createFramebuffer(),Te=new Tr(K),Ee=new Sa,J=new Ua(K,Se,q,Ee,Ce,Ke,Te),De=new xr(j),Oe=new qn(K),Je=new er(K,Oe),ke=new Cr(K,Oe,Te,Je),je=new Dr(K,ke,Oe,Je,Te),Ue=new Er(K,Ce,J),Re=new rr(Ee),Me=new xa(j,De,Se,Ce,Je,Re),Pe=new Za(j,Ee),Ie=new Ea,Le=new Na(Se),He=new $n(j,De,q,je,g,c),Be=new Va(j,je,Ce),Xe=new Qa(K,Te,Ce,q),We=new tr(K,Se,Te),Ge=new wr(K,Se,Te),Te.programs=Me.programs,j.capabilities=Ce,j.extensions=Se,j.properties=Ee,j.renderLists=Ie,j.shadowMap=Be,j.state=q,j.info=Te}_!==1009&&(A=new kr(_,t.width,t.height,s,r,i));let Qe=new Ja(j,K);this.xr=Qe,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(e){e!==void 0&&(ie=e,this.setSize(ne,re,!1))},this.getSize=function(e){return e.set(ne,re)},this.setSize=function(e,n,r=!0){Qe.isPresenting?a(`WebGLRenderer: Can't change size while VR device is presenting.`):(ne=e,re=n,t.width=Math.floor(e*ie),t.height=Math.floor(n*ie),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ne*ie,re*ie).floor()},this.setDrawingBufferSize=function(e,n,r){ne=e,re=n,ie=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(_===1009)u(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){a(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}A.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(H)},this.getViewport=function(e){return e.copy(oe)},this.setViewport=function(e,t,n,r){e.isVector4?oe.set(e.x,e.y,e.z,e.w):oe.set(e,t,n,r),q.viewport(H.copy(oe).multiplyScalar(be()).round())},this.getScissor=function(e){return e.copy(se)},this.setScissor=function(e,t,n,r){e.isVector4?se.set(e.x,e.y,e.z,e.w):se.set(e,t,n,r),q.scissor(U.copy(se).multiplyScalar(be()).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(e){q.setScissorTest(le=e)},this.setOpaqueSort=function(e){G=e},this.setTransparentSort=function(e){ae=e},this.getClearColor=function(e){return e.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(z!==null){let t=z.texture.format;e=y.has(t)}if(e){let e=z.texture.type,t=b.has(e),n=He.getClearColor(),r=He.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(x[0]=i,x[1]=a,x[2]=o,x[3]=r,K.clearBufferuiv(K.COLOR,0,x)):(S[0]=i,S[1]=a,S[2]=o,S[3]=r,K.clearBufferiv(K.COLOR,0,S))}else r|=K.COLOR_BUFFER_BIT}t&&(r|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&K.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,rt,!1),He.dispose(),Ie.dispose(),Le.dispose(),J.dispose(),Ee.dispose(),De.dispose(),je.dispose(),ke.dispose(),Je.dispose(),Xe.dispose(),Me.dispose(),Qe.dispose(),Qe.removeEventListener(`sessionstart`,dt),Qe.removeEventListener(`sessionend`,ft),mt.stop()};function tt(e){e.preventDefault(),p(`WebGLRenderer: Context Lost.`),M=!0}function nt(){p(`WebGLRenderer: Context Restored.`),M=!1;let e=Te.autoReset,t=Be.enabled,n=Be.autoUpdate,r=Be.needsUpdate,i=Be.type;Ze(),Te.autoReset=e,Be.enabled=t,Be.autoUpdate=n,Be.needsUpdate=r,Be.type=i}function rt(e){u(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function it(e){let t=e.target;t.removeEventListener(`dispose`,it),at(t)}function at(e){ot(e),Ee.remove(e)}function ot(e){let t=Ee.get(e).programs;t!==void 0&&(t.forEach(function(e){Me.releaseProgram(e)}),e.isShaderMaterial&&Me.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ve);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);q.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=ke.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Je.setup(i,r,s,n,c);let h,g=We;if(c!==null&&(h=Oe.get(c),g=Ge,g.setIndex(h)),i.isMesh)r.wireframe===!0?(q.setLineWidth(r.wireframeLinewidth*be()),g.setMode(K.LINES)):g.setMode(K.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),q.setLineWidth(e*be()),i.isLineSegments?g.setMode(K.LINES):i.isLineLoop?g.setMode(K.LINE_LOOP):g.setMode(K.LINE_STRIP)}else i.isPoints?g.setMode(K.POINTS):i.isSprite&&g.setMode(K.TRIANGLES);if(i.isBatchedMesh){if(Se.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Oe.get(c).bytesPerElement:1,o=Ee.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(K,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function st(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),fe===!0&&Re.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Ct(e,t,r),e.side=0,e.needsUpdate=!0,Ct(e,t,r),e.side=2):Ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),D=Le.get(n),D.init(t),k.push(D),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(D.pushLight(e),e.castShadow&&D.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(D.pushLight(e),e.castShadow&&D.pushShadow(e))}),D.setupLights(),N!==null&&N.updateLights(D.state.lightsArray),pe=this.localClippingEnabled,fe=Re.init(this.clippingPlanes,pe),fe===!0&&Re.setGlobalState(this.clippingPlanes,t),N!==null&&Be.render(D.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];st(o,n,t,e),r.add(o)}else st(i,n,t,e),r.add(i)}}),D=k.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=Ee.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Se.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ct=null;function lt(e){ct&&ct(e)}function dt(){mt.stop()}function ft(){mt.start()}let mt=new Kn;mt.setAnimationLoop(lt),typeof self<`u`&&mt.setContext(self),this.setAnimationLoop=function(e){ct=e,Qe.setAnimationLoop(e),e===null?mt.stop():mt.start()},Qe.addEventListener(`sessionstart`,dt),Qe.addEventListener(`sessionend`,ft),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){u(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(M===!0)return;N!==null&&N.renderStart(e,t);let n=Qe.enabled===!0&&Qe.isPresenting===!0,r=A!==null&&(z===null||n)&&A.begin(j,z);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(t),t=Qe.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,z),D=Le.get(e,k.length),D.init(t),D.state.textureUnits=J.getTextureUnits(),k.push(D),me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?de.setFromArrayCamera(t):ue.setFromProjectionMatrix(me,we,t.reversedDepth),pe=this.localClippingEnabled,fe=Re.init(this.clippingPlanes,pe),w=Ie.get(e,O.length),w.init(),O.push(w),this.info.render.frame++,Qe.enabled===!0&&Qe.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&ht(e,t,-1/0,j.sortObjects)}ht(e,t,0,j.sortObjects),w.finish(),N!==null&&N.updateLights(D.state.lightsArray),j.sortObjects===!0&&w.sort(G,ae),ye=Qe.enabled===!1||Qe.isPresenting===!1||Qe.hasDepthSensing()===!1,ye&&He.addToRenderList(w,e),this.info.autoReset===!0&&this.info.reset(),fe===!0&&Re.beginShadows();let i=D.state.shadowsArray;if(Be.render(i,e,t),fe===!0&&Re.endShadows(),(r&&A.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(D.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];_t(n,r,e,a)}ye&&He.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];gt(w,e,n,n.viewport)}}else r.length>0&&_t(n,r,e,t),ye&&He.render(e),gt(w,e,t)}z!==null&&R===0&&(J.updateMultisampleRenderTarget(z),J.updateRenderTargetMipmap(z)),r&&A.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),Je.resetDefaultState(),B=-1,V=null,k.pop(),k.length>0?(D=k[k.length-1],J.setTextureUnits(D.state.textureUnits),fe===!0&&Re.setGlobalState(j.clippingPlanes,D.state.camera)):D=null,O.pop(),w=O.length>0?O[O.length-1]:null,N!==null&&N.renderEnd()};function ht(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)D.pushLight(e),e.castShadow&&D.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?de:ue;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);let i=je.update(e),a=e.material;a.visible&&w.push(e,i,a,n,ge.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?de:ue;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=je.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ge.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(me)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,ge.z,s,t)}}else a.visible&&w.push(e,i,a,n,ge.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ht(i[e],t,n,r)}function gt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;D.setupLightsView(n),fe===!0&&Re.setGlobalState(j.clippingPlanes,n),r&&q.viewport(H.copy(r)),i.length>0&&vt(i,t,n),a.length>0&&vt(a,t,n),o.length>0&&vt(o,t,n),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function _t(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[r.id]===void 0){let e=Se.has(`EXT_color_buffer_half_float`)||Se.has(`EXT_color_buffer_float`);D.state.transmissionRenderTarget[r.id]=new kt(1,1,{generateMipmaps:!0,type:e?St:ut,minFilter:ce,samples:Math.max(4,Ce.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:T.workingColorSpace})}let a=D.state.transmissionRenderTarget[r.id],o=r.viewport||H;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),l=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(ee),te=j.getClearAlpha(),te<1&&j.setClearColor(16777215,.5),j.clear(),ye&&He.render(n);let u=j.toneMapping;j.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),D.setupLightsView(r),fe===!0&&Re.setGlobalState(j.clippingPlanes,r),vt(e,n,r),J.updateMultisampleRenderTarget(a),J.updateRenderTargetMipmap(a),Se.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,yt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(J.updateMultisampleRenderTarget(a),J.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,l),j.setClearColor(ee,te),d!==void 0&&(r.viewport=d),j.toneMapping=u}function vt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&yt(o,t,n,s,l,c)}}function yt(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function xt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Ct(e,t,n){t.isScene!==!0&&(t=ve);let r=Ee.get(e),i=D.state.lights,a=D.state.shadowsArray,o=i.state.version,s=Me.getParameters(e,i.state,a,t,n,D.state.lightProbeGridArray),c=Me.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=De.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,it),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=Me.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,j),d=Me.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Re.uniform),Dt(e,s),r.needsLights=jt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=xt(D.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function wt(e,t,n,r,i){let a=Ee.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Ri.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=Ee.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=ve),J.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=z===null?j.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:T.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=De.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=Ee.get(r),y=D.state.lights;if(fe===!0&&(pe===!0||e!==V)){let t=e===V&&r.id===B;Re.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Re.numPlanes||v.numIntersection!==Re.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===xt(D.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;(b===!0||x===!0)&&(S=x===!0?wt(r,t,i,s,h):Ct(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,S,v));let w=!1,E=!1,O=!1,k=S.getUniforms(),A=v.uniforms;if(q.useProgram(S.program)&&(w=!0,E=!0,O=!0),r.id!==B&&(B=r.id,E=!0),w||V!==e){q.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),k.setValue(K,`projectionMatrix`,e.projectionMatrix),k.setValue(K,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(K,he.setFromMatrixPosition(e.matrixWorld)),Ce.logarithmicDepthBuffer&&k.setValue(K,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(K,`isOrthographic`,e.isOrthographicCamera===!0),V!==e&&(V=e,E=!0,O=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&k.setValue(K,`sunShadowMap`,y.state.sunShadowMap,J),y.state.directionalShadowMap.length>0&&k.setValue(K,`directionalShadowMap`,y.state.directionalShadowMap,J),y.state.spotShadowMap.length>0&&k.setValue(K,`spotShadowMap`,y.state.spotShadowMap,J),y.state.pointShadowMap.length>0&&k.setValue(K,`pointShadowMap`,y.state.pointShadowMap,J)),i.isSkinnedMesh){k.setOptional(K,i,`bindMatrix`),k.setOptional(K,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(K,`boneTexture`,e.boneTexture,J))}i.isBatchedMesh&&(k.setOptional(K,i,`batchingTexture`),k.setValue(K,`batchingTexture`,i._matricesTexture,J),k.setOptional(K,i,`batchingIdTexture`),k.setValue(K,`batchingIdTexture`,i._indirectTexture,J),k.setOptional(K,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(K,`batchingColorTexture`,i._colorsTexture,J));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Ue.update(i,n,S),(E||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,k.setValue(K,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(A.envMapIntensity.value=t.environmentIntensity),A.dfgLUT!==void 0&&(A.dfgLUT.value=to()),E){if(k.setValue(K,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&At(A,O),a&&r.fog===!0&&Pe.refreshFogUniforms(A,a),Pe.refreshMaterialUniforms(A,r,ie,re,D.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=C,t=0;for(let n of D.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;A.probesSH.value=e.textures,A.probesMin.value=e.min,A.probesMax.value=e.max,A.probesResolution.value=e.resolution}Ri.upload(K,Tt(v),A,J)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Ri.upload(K,Tt(v),A,J),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(K,`center`,i.center),k.setValue(K,`modelViewMatrix`,i.modelViewMatrix),k.setValue(K,`normalMatrix`,i.normalMatrix),k.setValue(K,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Xe.update(n,S),Xe.bind(n,S)}}return S}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function jt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(e,t,n){let r=Ee.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),Ee.get(e.texture).__webglTexture=t,Ee.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=Ee.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){z=e,L=t,R=n;let r=null,i=!1,a=!1;if(e){let o=Ee.get(e);if(o.__useDefaultFramebuffer!==void 0){q.bindFramebuffer(K.FRAMEBUFFER,o.__webglFramebuffer),H.copy(e.viewport),U.copy(e.scissor),W=e.scissorTest,q.viewport(H),q.scissor(U),q.setScissorTest(W),B=-1;return}if(o.__webglFramebuffer===void 0)J.setupRenderTarget(e);else if(o.__hasExternalTextures)J.rebindTextures(e,Ee.get(e.texture).__webglTexture,Ee.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&Ee.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);J.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=Ee.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&J.useMultisampledRTT(e)===!1?Ee.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,H.copy(e.viewport),U.copy(e.scissor),W=e.scissorTest}else H.copy(oe).multiplyScalar(ie).floor(),U.copy(se).multiplyScalar(ie).floor(),W=le;if(n!==0&&(r=P),q.bindFramebuffer(K.FRAMEBUFFER,r)&&q.drawBuffers(e,r),q.viewport(H),q.scissor(U),q.setScissorTest(W),i){let r=Ee.get(e.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=Ee.get(e.textures[t]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=Ee.get(e.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,t.__webglTexture,n)}B=-1};function Mt(e){let t=Ee.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ce.textureFormatReadable(e.format),t.__typeReadable=Ce.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){u(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=Ee.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){q.bindFramebuffer(K.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1){u(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(d.__typeReadable===!1){u(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&K.readPixels(t,n,r,i,Ke.convert(c),Ke.convert(l),a)}finally{let e=z===null?null:Ee.get(z).__webglFramebuffer;q.bindFramebuffer(K.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=Ee.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){q.bindFramebuffer(K.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,f),K.bufferData(K.PIXEL_PACK_BUFFER,a.byteLength,K.STREAM_READ),K.readPixels(t,n,r,i,Ke.convert(l),Ke.convert(u),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);let p=z===null?null:Ee.get(z).__webglFramebuffer;q.bindFramebuffer(K.FRAMEBUFFER,p);let m=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await $e(K,m,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,f),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,a),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(f),K.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;J.setTexture2D(e,0),K.copyTexSubImage2D(K.TEXTURE_2D,n,0,0,o,s,i,a),q.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ke.convert(t.format),_=Ke.convert(t.type),v;t.isData3DTexture?(J.setTexture3D(t,0),v=K.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(J.setTexture2DArray(t,0),v=K.TEXTURE_2D_ARRAY):(J.setTexture2D(t,0),v=K.TEXTURE_2D),q.activeTexture(K.TEXTURE0),q.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,t.flipY),q.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),q.pixelStorei(K.UNPACK_ALIGNMENT,t.unpackAlignment);let y=q.getParameter(K.UNPACK_ROW_LENGTH),b=q.getParameter(K.UNPACK_IMAGE_HEIGHT),x=q.getParameter(K.UNPACK_SKIP_PIXELS),S=q.getParameter(K.UNPACK_SKIP_ROWS),C=q.getParameter(K.UNPACK_SKIP_IMAGES);q.pixelStorei(K.UNPACK_ROW_LENGTH,h.width),q.pixelStorei(K.UNPACK_IMAGE_HEIGHT,h.height),q.pixelStorei(K.UNPACK_SKIP_PIXELS,l),q.pixelStorei(K.UNPACK_SKIP_ROWS,u),q.pixelStorei(K.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=Ee.get(e),r=Ee.get(t),h=Ee.get(n.__renderTarget),g=Ee.get(r.__renderTarget);q.bindFramebuffer(K.READ_FRAMEBUFFER,h.__webglFramebuffer),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Ee.get(e).__webglTexture,i,d+n),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Ee.get(t).__webglTexture,a,m+n)),K.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,K.DEPTH_BUFFER_BIT,K.NEAREST);q.bindFramebuffer(K.READ_FRAMEBUFFER,null),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||Ee.has(e)){let n=Ee.get(e),r=Ee.get(t);q.bindFramebuffer(K.READ_FRAMEBUFFER,F),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,I);for(let e=0;e<c;e++)w?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,n.__webglTexture,i),T?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,r.__webglTexture,a),i===0?T?K.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):K.copyTexSubImage2D(v,a,f,p,l,u,o,s):K.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,K.COLOR_BUFFER_BIT,K.NEAREST);q.bindFramebuffer(K.READ_FRAMEBUFFER,null),q.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?K.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?K.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):K.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):K.texSubImage2D(K.TEXTURE_2D,a,f,p,o,s,g,_,h);q.pixelStorei(K.UNPACK_ROW_LENGTH,y),q.pixelStorei(K.UNPACK_IMAGE_HEIGHT,b),q.pixelStorei(K.UNPACK_SKIP_PIXELS,x),q.pixelStorei(K.UNPACK_SKIP_ROWS,S),q.pixelStorei(K.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&K.generateMipmap(v),q.unbindTexture()},this.initRenderTarget=function(e){Ee.get(e).__webglFramebuffer===void 0&&J.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?J.setTextureCube(e,0):e.isData3DTexture?J.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?J.setTexture2DArray(e,0):J.setTexture2D(e,0),q.unbindTexture()},this.resetState=function(){L=0,R=0,z=null,q.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return we}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=T._getDrawingBufferColorSpace(e),t.unpackColorSpace=T._getUnpackColorSpace()}},ro={type:`change`},io={type:`start`},ao={type:`end`},oo=new B,so=new ve,co=Math.cos(70*m.DEG2RAD),lo=new Y,uo=2*Math.PI,fo={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},po=1e-6,mo=class extends N{constructor(e,t=null){super(e,t),this.state=fo.NONE,this.target=new Y,this.cursor=new Y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:_.ROTATE,MIDDLE:_.DOLLY,RIGHT:_.PAN},this.touches={ONE:Ie.ROTATE,TWO:Ie.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new Y,this._lastQuaternion=new _t,this._lastTargetPosition=new Y,this._quat=new _t().setFromUnitVectors(e.up,new Y(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new n,this._sphericalDelta=new n,this._scale=1,this._panOffset=new Y,this._rotateStart=new it,this._rotateEnd=new it,this._rotateDelta=new it,this._panStart=new it,this._panEnd=new it,this._panDelta=new it,this._dollyStart=new it,this._dollyEnd=new it,this._dollyDelta=new it,this._dollyDirection=new Y,this._mouse=new it,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=go.bind(this),this._onPointerDown=ho.bind(this),this._onPointerUp=_o.bind(this),this._onContextMenu=wo.bind(this),this._onMouseWheel=bo.bind(this),this._onKeyDown=xo.bind(this),this._onTouchStart=So.bind(this),this._onTouchMove=Co.bind(this),this._onMouseDown=vo.bind(this),this._onMouseMove=yo.bind(this),this._interceptControlDown=To.bind(this),this._interceptControlUp=Eo.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=fo.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ro),this.update(),this.state=fo.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;lo.copy(t).sub(this.target),lo.applyQuaternion(this._quat),this._spherical.setFromVector3(lo),this.autoRotate&&this.state===fo.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=uo:n>Math.PI&&(n-=uo),r<-Math.PI?r+=uo:r>Math.PI&&(r-=uo),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(lo.setFromSpherical(this._spherical),lo.applyQuaternion(this._quatInverse),t.copy(this.target).add(lo),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=lo.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new Y(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new Y(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=lo.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(oo.origin.copy(this.object.position),oo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oo.direction))<co?this.object.lookAt(this.target):(so.setFromNormalAndCoplanarPoint(this.object.up,this.target),oo.intersectPlane(so,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>po||8*(1-this._lastQuaternion.dot(this.object.quaternion))>po||this._lastTargetPosition.distanceToSquared(this.target)>po?(this.dispatchEvent(ro),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?uo/60/60*this.autoRotateSpeed:uo/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){lo.setFromMatrixColumn(t,0),lo.multiplyScalar(-e),this._panOffset.add(lo)}_panUp(e,t){this.screenSpacePanning===!0?lo.setFromMatrixColumn(t,1):(lo.setFromMatrixColumn(t,0),lo.crossVectors(this.object.up,lo)),lo.multiplyScalar(e),this._panOffset.add(lo)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;lo.copy(r).sub(this.target);let i=lo.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(uo*this._rotateDelta.x/t.clientHeight),this._rotateUp(uo*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(uo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-uo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(uo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-uo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(uo*this._rotateDelta.x/t.clientHeight),this._rotateUp(uo*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new it,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function ho(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),this._isTrackingPointer(e)||(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function go(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function _o(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(ao),this.state=fo.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function vo(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case _.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=fo.DOLLY;break;case _.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=fo.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=fo.ROTATE}break;case _.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=fo.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=fo.PAN}break;default:this.state=fo.NONE}this.state!==fo.NONE&&this.dispatchEvent(io)}function yo(e){switch(this.state){case fo.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case fo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case fo.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function bo(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===fo.NONE&&(e.preventDefault(),this.dispatchEvent(io),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(ao))}function xo(e){this.enabled!==!1&&this._handleKeyDown(e)}function So(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Ie.ROTATE:if(this.enableRotate===!1){this.state=fo.NONE;break}this._handleTouchStartRotate(e),this.state=fo.TOUCH_ROTATE;break;case Ie.PAN:if(this.enablePan===!1){this.state=fo.NONE;break}this._handleTouchStartPan(e),this.state=fo.TOUCH_PAN;break;default:this.state=fo.NONE}break;case 2:switch(this.touches.TWO){case Ie.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=fo.TOUCH_DOLLY_PAN;break;case Ie.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=fo.TOUCH_DOLLY_ROTATE;break;default:this.state=fo.NONE}break;default:this.state=fo.NONE}this.state!==fo.NONE&&this.dispatchEvent(io)}function Co(e){switch(this._trackPointer(e),this.state){case fo.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case fo.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case fo.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case fo.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=fo.NONE}}function wo(e){this.enabled!==!1&&e.preventDefault()}function To(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Eo(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Do=Object.freeze({min:.38,max:9,default:1,mapEnter:.68,mapExit:.82,closeEnter:2.4,closeExit:2,follow:3.2,followExit:2,mapBlendStart:1,mapBlendEnd:.78,detailPrefetch:.35}),Oo=Do.follow;function ko(e,t=Do.default){let n=typeof t==`number`&&Number.isFinite(t)?t:Do.default,r=typeof e==`number`&&!Number.isNaN(e)?e:n;return Math.max(Do.min,Math.min(Do.max,r))}function Ao(e,t=`world`){let n=ko(e);return t===`map`&&n<Do.mapExit?`map`:t===`close`&&n>Do.closeExit?`close`:n<=Do.mapEnter?`map`:n>=Do.closeEnter?`close`:`world`}function jo(e){let t=ko(e),n=Math.max(0,Math.min(1,(Do.mapBlendStart-t)/(Do.mapBlendStart-Do.mapBlendEnd)));return n*n*(3-2*n)}function Mo(e){return ko(e)<Do.followExit}function No({viewWidth:e,viewHeight:t,spanWidth:n,spanHeight:r,padding:i=.15,fallback:a=Oo}={}){if(![e,t,n,r].every(e=>typeof e==`number`&&Number.isFinite(e)&&e>0))return ko(a);let o=1+2*(typeof i==`number`&&Number.isFinite(i)?Math.max(0,i):.15);return ko(Math.min(e/(n*o),t/(r*o)),a)}function Po(e,t,n,r=!1){if(r)return t;let i=Math.max(0,Number.isFinite(n)?n:0);if(!i||e===t)return e;let a=Math.log(e),o=Math.log(t),s=Math.abs(o-a),c=1.8,l=c/14,u=Math.max(0,(s-l)/c),d=i<=u?c*i:s-Math.min(s,l)*Math.exp(-14*(i-u)),f=Math.exp(a+Math.sign(o-a)*d);return Math.abs(f-t)<1e-6?t:f}var Fo=Object.freeze({railCore:3,cityReferenceRadius:16.5,trainWidth:6,trainLength:15}),Io=5.5,Lo=e=>(1.75+Math.max(1,Math.min(10,Math.round(Number(e)||1)))*.12)*Fo.cityReferenceRadius/2.5;function Ro(e=1){let t=Math.max(0,Math.min(1,(e-.5)/.3));return t*t*(3-2*t)}function zo(e,t){let n=e.onBeforeCompile,r=e.customProgramCacheKey();return e.onBeforeCompile=(r,i)=>{n.call(e,r,i),r.uniforms.mapNetworkVisibility=t,r.fragmentShader=`uniform float mapNetworkVisibility;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (mapNetworkVisibility < 1.0) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (mapNetworkVisibility <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`${r}|map-network-visibility-v1`,e}function Bo(e,t){let n=Math.max(0,Math.min(1,(t-.6)/.6)),r=n*n*(3-2*n),i=new Map,a=new Map,o=Math.max(1,...e.map(e=>e.radius*2+2.5));for(let t of e){if(!t.visible||r===0){a.set(t.id,1);continue}let e=Math.floor(t.x/o),n=Math.floor(t.y/o),s=(t.previous??1)>.5?1:2.5,c=!1;for(let r=-1;r<=1&&!c;r++)for(let a=-1;a<=1&&!c;a++)for(let o of i.get(`${e+r}:${n+a}`)??[])if(Math.hypot(t.x-o.x,t.y-o.y)<t.radius+o.radius+s){c=!0;break}if(a.set(t.id,c?1-r:1),!c){let r=`${e}:${n}`;i.has(r)||i.set(r,[]),i.get(r).push(t)}}return a}function Vo(e,t=1,n=1){return e>0?{routeScale:e*Fo.railCore/.42,cityScale:e*Fo.cityReferenceRadius/(2.5*t),trainScaleX:Math.max(1,e*Fo.trainWidth/(1.22*n)),trainScaleZ:Math.max(1,e*Fo.trainLength/2.45)}:{routeScale:1,cityScale:1,trainScaleX:1,trainScaleZ:1}}var Ho=(e,t,n)=>n?1:1-Math.exp(-e*t),Uo=e=>e.parts[Math.floor(e.parts.length/2)],Wo=1.968,Go=.48,Ko=Math.PI/4,qo=85*Math.PI/180,Jo=(e,t)=>m.euclideanModulo(e+Math.PI*t,2*Math.PI*t)-Math.PI*t;function Yo({canvas:e,camera:t,scene:r,mapScene:i,reducedMotion:a,getTrains:s,getWorldRoot:c,getWorld:l=()=>null,onPause:u,onRegenerate:d,isDetailReady:f=()=>!0}){let p=t.clone(),h=t.clone(),g=t.clone(),v=t.clone(),y=t.clone(),b=t.clone(),x=t.clone(),S=new Y(0,1.3,0),C=0,w=[v,b],T=new mo(p,e);Object.assign(T,{enableDamping:!0,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,minZoom:Do.min,maxZoom:Do.max,minPolarAngle:Ko,maxPolarAngle:Ko}),T.target.set(0,1.3,0),T.update();let E=`world`,D=0,O=null,k=null,A=null,j=!0,M=1,N=new Y,P=new Y,F=null,I=null,L=!1,R=0,z=null,B=new Set,V=new Set,H=new te;H.firstHitOnly=!0;let U=[],W=new Y,ee=new it,ne=new Y,re=new n,ie=new Y,G=new Y,ae=new et,oe=new Y,se=new Y,ce=new Y,le=new Y,ue=new Y,de=new Y,fe=new Y,pe=new Y,me=new it,he=new it,ge=new it,_e={x:0,z:0},ve=new Y,ye=new Y,be=new WeakMap,K={},xe=new Bt(.94,1,64);xe.rotateX(-Math.PI/2);let Se=new Ze({color:X.trim,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!0,side:2}),Ce=new o(xe,Se),q=new o(xe,Se.clone());q.material.toneMapped=!1,Ce.visible=q.visible=!1,r.add(Ce),i.add(q),Ce.renderOrder=3,q.renderOrder=10;function we(){let e=l(),t=Tt(e);if(!t)return;if(t.complete){G.set(Jo(T.target.x,t.radius)-T.target.x,0,m.clamp(T.target.z,-t.radius*qo,t.radius*qo)-T.target.z),T.target.add(G),p.position.add(G);return}let n=be.get(e);if(!n){if(e.outline?.length){let t=e.outline.map(e=>e[0]),r=e.outline.map(e=>e[1]);n={left:Math.min(...t),right:Math.max(...t),top:Math.min(...r),bottom:Math.max(...r)}}else if(e.bounds)n={left:-e.bounds.width/2,right:e.bounds.width/2,top:-e.bounds.depth/2,bottom:e.bounds.depth/2};else return;let t=Math.max(8,Math.min(n.right-n.left,n.bottom-n.top)*.05);n.left-=t,n.right+=t,n.top-=t,n.bottom+=t,be.set(e,n)}G.set(m.clamp(T.target.x,n.left,n.right)-T.target.x,0,m.clamp(T.target.z,n.top,n.bottom)-T.target.z),T.target.add(G),p.position.add(G)}function Te(e,t,n=p,r=T.target){e.copy(n),re.setFromVector3(ne.copy(n.position).sub(r));let i=Tt(l());return re.phi=m.lerp(Ko,i&&!i.complete?Go:1e-5,t),e.position.copy(r).add(ne.setFromSpherical(re)),e.lookAt(r),e.updateMatrixWorld(!0),e}function Ee(e,t,n=T.target){e.copy(t);let r=l();return Tt(r)&&(Me(r,n.x,n.z,ae),Be(r,n.x,n.y,n.z,oe),se.copy(t.position).sub(n).applyMatrix4(ae),e.position.copy(oe).add(se),e.up.copy(t.up).transformDirection(ae),e.lookAt(oe)),e.updateMatrixWorld(!0),e}function J(){Te(h,D,x,S),Ee(t,h,S),c()?.scale.set(1,Tt(l())?1:1-D*.985,1)}function De(){let e=T.enableDamping,t=p.zoom;ve.copy(p.position),ye.copy(T.target),T.enableDamping=!1,T.update(),p.position.copy(ve),T.target.copy(ye),p.zoom=t,p.updateProjectionMatrix(),T.update(),T.enableDamping=e}function Oe(){O=null,A=null}let ke=e=>Math.max(Do.min,Math.min(Do.max*M,e));function Ae(){return M*Math.max(Do.follow,No({viewWidth:(p.right-p.left)/M,viewHeight:(p.top-p.bottom)/M,spanWidth:40,spanHeight:32,padding:.1}))}function je(e){e?.state.active&&(Ke(),De(),O=e,k=null,A=Ae(),a.matches&&(p.zoom=A,p.updateProjectionMatrix(),A=null))}function Ne(){Oe(),Ke(),k=null,De(),p.position.copy(N),T.target.copy(P),p.zoom=1,p.updateProjectionMatrix(),T.update(),we(),x.copy(p),S.copy(T.target),x.updateProjectionMatrix(),D=jo(x.zoom/M),E=Ao(x.zoom/M),Ce.visible=q.visible=!1,He(),J(),Pe()}function Pe(){let t={view:E,following:O?.state.id??``,zoom:x.zoom.toFixed(3),requestedZoom:p.zoom.toFixed(3),detailLoading:String(D<1&&!f()),mapBlend:D.toFixed(3)};for(let n in t)K[n]!==t[n]&&(e.dataset[n]=K[n]=t[n])}function Fe(e,n=Uo(e),r=W){let i=l(),a=n.position;return Tt(i)?Be(i,a.x,D>.7?Wo:a.y+.8,a.z,r):(r.copy(a),r.y=D>.7?.3:(a.y+.8)*(c()?.scale.y??1)),r.project(t)}function Le(e,n){if(!e.state.active||D>.7&&Ro(t.zoom)===0)return!1;if(!n)return e.parts.some(t=>Le(e,t));if(!n.visible)return!1;let r=Fe(e,n);if(Math.abs(r.x)>1.05||Math.abs(r.y)>1.05||r.z<-1||r.z>1||Tt(l())&&(rt(l(),n.position.x,n.position.z,ce),ce.dot(t.getWorldDirection(le))>=0))return!1;if(D>.7)return!0;H.setFromCamera(ee.set(r.x,r.y),t),U.length=0,c()?.traverseVisible(e=>{e.isMesh&&(!e.isInstancedMesh||e.count>0)&&U.push(e)});let i=H.intersectObjects(U,!1)[0];if(i?.object.userData.instanceTrainIds?.[i.instanceId]===e.state.id)return!0;let a=i?.object;for(;a;){if(a.userData.trainId===e.state.id)return!0;a=a.parent}return!1}function Re(n,r,i=!1){let a=e.getBoundingClientRect(),o=i?28:17,l=[];c()?.updateMatrixWorld(!0),t.updateMatrixWorld(!0);for(let e of s())if(e.state.active)for(let t of e.parts){let i=Fe(e,t);if(i.z<-1||i.z>1)continue;let s=Math.hypot((i.x+1)*a.width/2+a.left-n,(1-i.y)*a.height/2+a.top-r);s<o&&l.push({train:e,part:t,d:s})}l.sort((e,t)=>e.d-t.d);for(let e of l)if(Le(e.train,e.part))return e.train;return null}function ze(){let e=[];for(let t of s()){if(!t.state.active)continue;let n=Fe(t);Math.abs(n.x)<=1.05&&Math.abs(n.y)<=1.05&&n.z>=-1&&n.z<=1&&e.push({train:t,d:n.x*n.x+n.y*n.y})}e.sort((e,t)=>e.d-t.d);for(let t of e)if(Le(t.train))return t.train}function Ve(e){let t=s().filter(e=>e.state.active);if(!t.length)return;let n=t.indexOf(O);je(t[n<0?e>0?0:t.length-1:(n+e+t.length)%t.length])}function He(){let e=D===1&&E===`map`;z!==null&&e!==z&&De(),z=e,T.enabled=j,T.enableRotate=!e,T.enablePan=e&&!O,T.screenSpacePanning=!1,T.mouseButtons.LEFT=e?_.PAN:_.ROTATE,T.touches.ONE=e?Ie.PAN:Ie.ROTATE,T.touches.TWO=e?Ie.DOLLY_PAN:Ie.DOLLY_ROTATE}function We(e,t,n){if(!e&&!t)return;Oe();let r=Tt(l()),i=Math.max(p.right-p.left,p.top-p.bottom)/x.zoom,a=n??(r?.complete?Math.min(r.radius*.95,i*.3):i*.3);if(fe.set(1,0,0).applyQuaternion(h.quaternion),fe.y=0,fe.normalize(),pe.set(0,1,0).applyQuaternion(h.quaternion),pe.y=0,pe.normalize(),G.copy(fe).multiplyScalar(e*a).addScaledVector(pe,-t*a),r?.complete&&r.projection.type===`equirectangular`){let e=r.projection,t=e.centralLatitude*Math.PI/180-T.target.z/e.radius,n=r.radius+T.target.y,i=m.clamp(t-G.z/n,-qo,qo),a=i-t,o=Math.log(Math.tan(Math.PI/4+i/2)/Math.tan(Math.PI/4+t/2)),s=Math.abs(a)>1e-9?a/o:Math.cos(t);G.x*=e.radius/(n*s),G.z=-a*e.radius}else r&&(Ue(l(),T.target.x,T.target.z,G.x,G.z,_e),G.set(_e.x-T.target.x,0,_e.z-T.target.z));T.target.add(G),p.position.add(G),we()}function Ge(e){if(he.set(Number(V.has(`d`))-Number(V.has(`a`)),Number(V.has(`s`))-Number(V.has(`w`))),he.lengthSq()>1&&he.normalize(),a.matches)me.copy(he),ge.copy(he).multiplyScalar(e);else{let t=he.lengthSq()?10:14,n=Math.exp(-t*e);ge.copy(me).sub(he).multiplyScalar((1-n)/t).addScaledVector(he,e),me.sub(he).multiplyScalar(n).add(he),!he.lengthSq()&&me.lengthSq()<1e-24&&me.set(0,0)}We(ge.x,ge.y)}function Ke(){V.clear(),me.set(0,0),ge.set(0,0)}function qe(e){V.delete(e.key.toLowerCase())}e.addEventListener(`keyup`,qe),window.addEventListener(`keyup`,qe),e.addEventListener(`blur`,Ke),window.addEventListener(`blur`,Ke),e.ownerDocument.addEventListener(`visibilitychange`,()=>{e.ownerDocument.hidden&&Ke()}),e.addEventListener(`pointerdown`,e=>{j&&(B.add(e.pointerId),B.size>1&&(L=!0,I=null),e.button===0&&B.size===1&&(I={id:e.pointerId,x:e.clientX,y:e.clientY,moved:!1,touch:e.pointerType===`touch`},L=!1),A=null)},{capture:!0}),e.addEventListener(`pointermove`,e=>{j&&(I?.id===e.pointerId&&Math.hypot(e.clientX-I.x,e.clientY-I.y)>6&&(I.moved=!0),F={x:e.clientX,y:e.clientY,touch:e.pointerType===`touch`})});function Je(e){if(!j)return;let t=I?.id===e.pointerId&&!I.moved&&!L&&e.type===`pointerup`&&Math.hypot(e.clientX-I.x,e.clientY-I.y)<=6,n=I;if(B.delete(e.pointerId),t){let t=Re(e.clientX,e.clientY,n.touch);t?je(t):Oe()}B.size||(I=null,L=!1)}window.addEventListener(`pointerup`,Je),window.addEventListener(`pointercancel`,Je),e.addEventListener(`pointerleave`,()=>{k=null,F=null,e.style.cursor=O?`default`:`grab`}),e.addEventListener(`wheel`,()=>{A=null},{passive:!0}),e.addEventListener(`dblclick`,()=>{j&&Ne()}),e.addEventListener(`keydown`,e=>{if(!j||e.altKey||e.metaKey||e.ctrlKey)return;let t=!0,r=e.key.toLowerCase();if([`w`,`a`,`s`,`d`].includes(r))V.has(r)||(V.add(r),Oe(),De());else if(e.key===` `)u();else if(e.key===`Home`)Ne();else if(e.key===`Escape`)Oe();else if(e.key.toLowerCase()===`r`)d();else if(e.key.toLowerCase()===`f`)je(ze());else if(e.key===`[`)Ve(-1);else if(e.key===`]`)Ve(1);else if([`+`,`=`,`-`,`_`].includes(e.key))A=null,p.zoom=ke(p.zoom*(e.key===`+`||e.key===`=`?1.16:1/1.16)),p.updateProjectionMatrix();else if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)){if(De(),E===`world`&&!O&&(e.key===`ArrowLeft`||e.key===`ArrowRight`)){let t=p.position.clone().sub(T.target),r=new n().setFromVector3(t);e.key===`ArrowLeft`&&(r.theta-=.08),e.key===`ArrowRight`&&(r.theta+=.08),p.position.copy(T.target).add(new Y().setFromSpherical(r))}else We(Number(e.key===`ArrowRight`)-Number(e.key===`ArrowLeft`),Number(e.key===`ArrowDown`)-Number(e.key===`ArrowUp`),(p.top-p.bottom)/x.zoom*.045);T.update(),we()}else t=!1;t&&e.preventDefault()});function Ye(e){if(j){if(C=e,A!==null&&(p.zoom=m.lerp(p.zoom,A,Ho(7,e,a.matches)),Math.abs(p.zoom-A)<.002&&(p.zoom=A,A=null),p.updateProjectionMatrix()),O&&(!O.state.active||A===null&&Mo(p.zoom/M))&&(O=null),Ge(Math.min(.1,Math.max(0,e))),He(),T.update(),O){ie.copy(Uo(O).position),ie.y=.75;let t=Tt(l());t?.complete&&(ie.x=T.target.x+Jo(ie.x-T.target.x,t.radius)),G.copy(T.target).lerp(ie,Ho(7,e,a.matches)).sub(T.target),T.target.add(G),p.position.add(G)}we()}}function Xe(e){return Po(x.zoom,p.zoom,e,a.matches)}function Qe(n){if(!j)return;let r=Xe(n);x.copy(p),S.copy(T.target),x.zoom=r,x.updateProjectionMatrix(),D=jo(x.zoom/M),E=Ao(x.zoom/M,E),He(),J(),R+=n,R>.12&&F&&!F.touch&&!B.size&&!O&&(R=0,k=Re(F.x,F.y),e.style.cursor=k?`pointer`:`grab`);let i=O??k;if(Ce.visible=q.visible=!!i?.state.active,q.visible&&=Ro(t.zoom)>0,i){let e=Uo(i);for(let n of[Ce,q]){let r=l(),a=n===Ce?.045:Tt(r)?1.6:.6;Tt(r)?(Be(r,e.position.x,a,e.position.z,n.position),rt(r,e.position.x,e.position.z,ce),Ot(r,e.position.x,a,e.position.z,Math.sin(e.rotation.y),0,Math.cos(e.rotation.y),ue).normalize(),de.crossVectors(ce,ue).normalize(),ae.makeBasis(de,ce,ue),n.quaternion.setFromRotationMatrix(ae)):(n.position.set(e.position.x,a,e.position.z),n.rotation.set(0,e.rotation.y,0)),n.scale.set(1.35,1,4.65),n.material.opacity=O?.state.id===i.state.id?.95:.48,n===q&&(n.material.opacity*=Ro(t.zoom))}}Pe()}return{navigation:p,chartCamera:h,controls:T,reset:Ne,updateNavigation:Ye,updatePresentation:Qe,setInputEnabled(e){Ke(),Oe(),k=null,F=null,I=null,B.clear(),De(),j=!!e,T.enabled=j,Ce.visible=q.visible=!1},overlook(e,{heading:t,zoom:n}={}){Ke(),Oe(),De(),G.set(e.x-T.target.x,(e.y??0)+1.3-T.target.y,e.z-T.target.z),p.position.add(G),T.target.add(G),Number.isFinite(t)&&(re.setFromVector3(ne.copy(p.position).sub(T.target)),re.theta=t+Math.PI,re.phi=Ko,p.position.copy(T.target).add(ne.setFromSpherical(re))),p.zoom=Number.isFinite(n)?ke(n):Math.min(p.zoom,M),p.updateProjectionMatrix(),T.update(),we(),x.copy(p),S.copy(T.target),D=jo(x.zoom/M),E=Ao(x.zoom/M),He(),J(),Pe()},update(e){Ye(e),Qe(e)},get coverageCamera(){return Te(g,0),g.zoom=Math.max(Do.mapBlendEnd*M,x.zoom),g.updateProjectionMatrix(),Ee(v,g)},get coverageCameras(){this.coverageCamera;let e=Do.mapBlendEnd*M,t=Xe(C);return t<e?(b.copy(v),w):(Te(y,jo(t/M)),y.zoom=t,y.updateProjectionMatrix(),Ee(b,y),w)},setScale(e){M=Math.max(1,Number(e)||1),T.maxZoom=Do.max*M},get zoomScale(){return M},get wantsDetail(){return p.zoom/M>Do.detailPrefetch||D<1||O!==null},get waitingForDetail(){return!1},get renderTarget(){return S},setHome(){N.copy(p.position),P.copy(T.target),Ne()},get mode(){return E},get blend(){return D},get selected(){return O?.state.id??null}}}function Xo(e,t){return e.onBeforeCompile=e=>{e.uniforms.detailReveal=t,e.fragmentShader=`uniform float detailReveal;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (detailReveal < 0.9999) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (detailReveal <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`streamed-detail-reveal-v1`,e}function Zo(e){return Xo(new R({depthPacking:jt,side:1}),e)}function Qo(e){let t={type:St,depthBuffer:!0,samples:2},n=new kt(1,1,t),r=new kt(1,1,t),i=new gt({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{worldTexture:{value:n.texture},mapTexture:{value:r.texture},blend:{value:0},toneMappingExposure:{value:e.toneMappingExposure}},vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,fragmentShader:`varying vec2 vUv;
      uniform sampler2D worldTexture;
      uniform sampler2D mapTexture;
      uniform float blend;
      #include <tonemapping_pars_fragment>
      void main(){
        vec3 worldColor=ACESFilmicToneMapping(texture2D(worldTexture,vUv).rgb);
        vec3 mapColor=texture2D(mapTexture,vUv).rgb;
        gl_FragColor=vec4(mix(worldColor,mapColor,blend),1.0);
        #include <colorspace_fragment>
      }`}),a=new j,s=new o(new S(2,2),i);s.frustumCulled=!1,a.add(s);let c=new Je,l,u=!1;function d(){if(l)return l;let e=new Qe;e.setAttribute(`position`,new Le([0,0,0,1,0,0,0,0,1],3)),e.setAttribute(`normal`,new Le([0,1,0,0,1,0,0,1,0],3)),e.setAttribute(`color`,new Le([1,1,1,1,1,1,1,1,1],3));let t=[0,2].map(t=>new o(e,Xo(new y({side:t,flatShading:!0,vertexColors:!0}),{value:1})));t.push(new Pe(e,new y({side:0,flatShading:!0,vertexColors:!0}),1));for(let e of t)e.castShadow=!0,e.receiveShadow=!0;let n=[1,2].map(t=>{let n=Zo({value:1});return n.side=t,new o(e,n)});return n.push(new Pe(e,new R({side:1}),1)),l={geometry:e,surfaces:t,depths:n}}let f=1,p=1,m=1,h=1;function g(){(f!==m||p!==h)&&(n.setSize(f,p),r.setSize(f,p),m=f,h=p,e.initRenderTarget(n),e.initRenderTarget(r))}function _(t,n){let r=e.getRenderTarget(),i=e.getActiveCubeFace?.()??0,a=e.getActiveMipmapLevel?.()??0;try{return e.setRenderTarget(t),n()}finally{e.setRenderTarget(r,i,a)}}function v(t,n){let r=[];try{t.traverse(e=>{e.visible&&(e.isMesh||e.isLine||e.isPoints||e.isSprite)&&(r.push(e),e.visible=!1)}),e.render(t,n)}finally{for(let e of r)e.visible=!0}}return{resize(e,t){f=e,p=t},async prepare(t,i,o){let s=e.shadowMap.enabled;_(n,()=>{g(),t&&o&&v(t,o)});function l(t,n,r,i){let a=e.shadowMap.enabled;try{return e.shadowMap.enabled=s,_(t,()=>e.compileAsync(n,r,i))}finally{e.shadowMap.enabled=a}}if(t&&o&&await l(n,t,o),t&&o)for(let e of d().surfaces)await l(n,e,o,t);if(t&&s){let e;if(t.traverseVisible(t=>{!e&&t.castShadow&&t.isDirectionalLight&&(e=t.shadow.camera)}),e)for(let r of d().depths)await l(n,r,e,t)}if(i&&o&&await l(r,i,o),await l(null,a,c),t&&o&&await l(null,t,o),t&&o)for(let e of d().surfaces)await l(null,e,o,t)},render(t,o,s,l){l<=.001?(e.setRenderTarget(null),e.render(t,s)):l>=.999?(e.setRenderTarget(null),e.render(o,s)):(g(),e.setRenderTarget(n),e.render(t,s),e.setRenderTarget(r),e.render(o,s),e.setRenderTarget(null),i.uniforms.blend.value=l,i.uniforms.toneMappingExposure.value=e.toneMappingExposure,e.render(a,c))},dispose(){if(!u&&(u=!0,n.dispose(),r.dispose(),s.geometry.dispose(),i.dispose(),l)){l.geometry.dispose();for(let e of[...l.surfaces,...l.depths])e.material.dispose(),e.isInstancedMesh&&e.dispose();l=void 0}}}}function $o(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Qe;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=es(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=es(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function es(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new H(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var ts=Math.PI*2,ns=1e-8,rs=e=>(e%ts+ts)%ts,is=(e,t,n)=>Math.max(t,Math.min(n,e)),as=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),os=e=>Number.isFinite(e.heading)?e.heading:Math.atan2(e.tangent.z,e.tangent.x);function ss(e,t,n=.42,r={}){let i=as(e,t);return i<ns?null:{...r,type:`line`,start:{x:e.x,y:n,z:e.z},end:{x:t.x,y:n,z:t.z},heading:Math.atan2(t.z-e.z,t.x-e.x),length:i,curvature:0}}function cs(e,t,n,r,i,a){let o=Math.atan2(t.z-e.z,t.x-e.x),s=r*rs(r*(Math.atan2(n.z-e.z,n.x-e.x)-o));return Math.abs(s)>ts-1e-7&&(s=0),Math.abs(s)<ns?null:{type:`arc`,center:{x:e.x,z:e.z},radius:i,startAngle:o,sweep:s,start:{x:t.x,y:a,z:t.z},end:{x:n.x,y:a,z:n.z},length:Math.abs(s)*i,curvature:r/i}}function ls(e,t,n,r){return{x:e.x-Math.sin(t)*n*r,z:e.z+Math.cos(t)*n*r}}function us(e,t){let n=0,r=e.filter(Boolean).map(e=>{let t={...e,startDistance:n};return n+=e.length,{...t,endDistance:n}});return{segments:r,length:n,minRadius:t,maxCurvature:r.reduce((e,t)=>Math.max(e,Math.abs(t.curvature)),0)}}function ds(e,t,{radius:n=8,y:r=.42}={}){if(!Number.isFinite(n)||n<=0)throw TypeError(`Railway minimum turning radius must be positive and finite`);let i=os(e),a=os(t),o=[],s=e=>{let r=us(e,n);if(r.length<ns)return;let i=ps(r,r.length);as(i,t)>1e-5||Math.cos(i.heading-a)<1-1e-7||o.push(r)};for(let o of[-1,1])for(let c of[-1,1]){let l=ls(e,i,o,n),u=ls(t,a,c,n),d=as(l,u);if(d<ns){o===c&&s([cs(l,e,t,o,n,r)]);continue}let f=Math.atan2(u.z-l.z,u.x-l.x);if(o!==c){if(d<2*n-ns)continue;f+=Math.asin(is(2*o*n/d,-1,1))}let p={x:l.x+o*Math.sin(f)*n,z:l.z-o*Math.cos(f)*n},m={x:u.x+c*Math.sin(f)*n,z:u.z-c*Math.cos(f)*n};s([cs(l,e,p,o,n,r),ss(p,m,r),cs(u,m,t,c,n,r)])}for(let o of[-1,1]){let c=ls(e,i,o,n),l=ls(t,a,o,n),u=as(c,l);if(u<ns||u>4*n)continue;let d=(c.x+l.x)/2,f=(c.z+l.z)/2,p=Math.sqrt(Math.max(0,4*n*n-u*u/4)),m=-(l.z-c.z)/u,h=(l.x-c.x)/u;for(let i of[-1,1]){let a={x:d+m*p*i,z:f+h*p*i},u={x:(c.x+a.x)/2,z:(c.z+a.z)/2},g={x:(l.x+a.x)/2,z:(l.z+a.z)/2};s([cs(c,e,u,o,n,r),cs(a,u,g,-o,n,r),cs(l,g,t,o,n,r)])}}return o.sort((e,t)=>e.length-t.length)}function fs(e,t,n){let r=is(t,0,e.length),i=e.segments;if(!i.length)throw TypeError(`An alignment must contain a nonzero segment`);let a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;i[e].endDistance<r-ns?a=e+1:o=e}let s=i[a],c=is(r-s.startDistance,0,s.length)/s.length,l,u,d;if(s.type===`line`)l=s.start.x+(s.end.x-s.start.x)*c,u=s.start.z+(s.end.z-s.start.z)*c,d=s.heading;else{let e=s.startAngle+s.sweep*c;l=s.center.x+Math.cos(e)*s.radius,u=s.center.z+Math.sin(e)*s.radius,d=e+Math.sign(s.sweep)*Math.PI/2}let f=n.tangent??={x:0,y:0,z:0},p=Math.cos(d),m=Math.sin(d);if(n.chartSpeed=1,s.chartTransform){let e=s.chartTransform,t=e.x+e.xx*l+e.xz*u,r=e.z+e.zx*l+e.zz*u,i=e.xx*p+e.xz*m,a=e.zx*p+e.zz*m,o=Math.hypot(i,a);l=t,u=r,p=i/o,m=a/o,d=Math.atan2(m,p),n.chartSpeed=o}return f.x=p,f.y=0,f.z=m,n.x=l,n.y=s.start.y,n.z=u,n.distance=r,n.heading=d,n.angle=Math.atan2(f.x,f.z),n.curvature=s.curvature,n}function ps(e,t){return fs(e,t,{tangent:{x:0,y:0,z:0}})}function ms(e,t=.35){let n=[],r=[];for(let i of e.segments){let a=Math.max(1,Math.ceil(i.length/t));for(let t=0;t<a;t++){let o=i.startDistance+i.length*t/a;if(r.length&&o-r.at(-1)<ns)continue;let s=ps(e,o);n.push({x:s.x,y:s.y,z:s.z}),r.push(o)}}let i=ps(e,e.length);return n.push({x:i.x,y:i.y,z:i.z}),r.push(e.length),{points:n,distances:r,length:e.length}}function hs(e,t=8){return us(e.flatMap(e=>e?.segments??(e?[e]:[])),t)}function gs(e,t,{radius:n=8,y:r=.42,waypoints:i=[],isAllowed:a=()=>!0}={}){let o=[e,...i,t],s=o.map((e,t)=>{if(t===0||t===o.length-1)return{...e,heading:os(e)};if(Number.isFinite(e.heading))return e;let n=o[t-1],r=o[t+1];return{...e,heading:Math.atan2(r.z-n.z,r.x-n.x)}}),c=[];for(let e=1;e<s.length;e++){if(as(s[e-1],s[e])<ns)continue;let t=ds(s[e-1],s[e],{radius:n,y:r}).find(e=>e.segments.every(e=>e.type!==`arc`||Math.abs(e.sweep)<=Math.PI+1e-7)&&e.segments.reduce((e,t)=>e+(t.type===`arc`?Math.abs(t.sweep):0),0)<=Math.PI*1.5+1e-7&&ms(e,.45).points.every(a));if(!t)throw TypeError(`Invalid world: waypoints cannot fit the outline and minimum turning radius without a railway loop`);c.push(t)}let l=hs(c,n);if(!l.segments.length)throw TypeError(`Invalid world: railway alignment has no length`);return l}var _s=Object.freeze({owners:[`coral`,`gold`,`blue`],spacing:38,sceneryRadius:44,chunkSize:192}),vs=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z);function ys(e,{count:t=3}={}){if(!e.gameplay||e.surface||!Number.isFinite(t)||t<1)return[];let n=_s.owners.filter(t=>t!==e.gameplay.ownerId&&e.players.some(e=>e.id===t)),r=kn(e.seed,`player-bot-starts`),i=[],a=e.gameplay.reservations??[],o=e.gameplay.starterHouse;for(let t=-e.bounds.depth/2+18;t<e.bounds.depth/2-18;t+=6)for(let n=-e.bounds.width/2+18;n<e.bounds.width/2-18;n+=6){let s={x:n+(r()-.5)*3,z:t+(r()-.5)*3};if(!$t(e,[`forest`,`plains`],s.x,s.z,14)||mn(e,`forest`,s.x,s.z)<-5||zn(e,s.x,s.z)<18||e.mountains.some(e=>dn(e,s.x,s.z)<18)||o&&vs(o,s)<_s.spacing||a.some(e=>vs(s,e)<14+e.radius))continue;let c=0;for(let t=0;t<Math.PI*2;t+=Math.PI/6){let n=s.x+Math.sin(t)*19,r=s.z+Math.cos(t)*19;if(ln(e,n,r)===`forest`){let t=Ht(e,n,r),i=Math.max(0,Math.min(1,(t.patch-.35)/.34));c+=i*i*(3-2*i)*(.55+t.detail*.45)}}let l=Ht(e,s.x,s.z);c<2||i.push({...s,score:c+Math.max(0,mn(e,`forest`,s.x,s.z))*.04+(1-Math.abs(l.patch-.52))*1.2+r()*.25})}i.sort((e,t)=>t.score-e.score||e.x-t.x||e.z-t.z);let s=Math.min(Math.floor(t),n.length),c=[],l=[],u=-1/0;function d(e,t,n){if((t.length>l.length||t.length===l.length&&n>u)&&(l=[...t],u=n),t.length!==s)for(let r=e;r<i.length;r++){let e=i[r];if(l.length===s&&n+e.score*(s-t.length)<=u)break;t.some(t=>vs(t,e)<_s.spacing)||d(r+1,[...t,e],n+e.score)}}d(0,[],0);for(let e of l){let t=n[c.length],i=`bot:${t}`,a=r()*Math.PI*2,o={id:`${i}:home-1`,kind:`house`,x:e.x,y:0,z:e.z,rotation:a,width:2.2,depth:2.2,scale:1,variant:c.length%4,ownerId:t,radius:Math.hypot(2.2,2.2)/2},s={x:e.x+Math.sin(a)*3.4,z:e.z+Math.cos(a)*3.4,heading:a};c.push({id:i,ownerId:t,starterHouse:o,spawn:s})}return c}function bs(e){return e.flatMap(e=>[{id:`${e.id}:home-reservation`,x:e.starterHouse.x,z:e.starterHouse.z,radius:e.starterHouse.radius+.65},{id:`${e.id}:spawn-reservation`,x:e.spawn.x,z:e.spawn.z,radius:1.05}])}function xs(e,t,n,r){let i=e.surface?.projection;if(i?.type!==`equirectangular`)return[yn(t,n,r)];let a=Math.PI*i.radius,o=a*2;if(r>=a)return[{minX:-a,maxX:a,minZ:n-r,maxZ:n+r}];let s=t>=-a&&t<a?t:((t+a)%o+o)%o-a,c=yn(s,n,r),l=[c];return c.minX<=-a&&l.push(yn(s+o,n,r)),c.maxX>=a&&l.push(yn(s-o,n,r)),l}function Ss(e,t){let{a:n,b:r}=e,i=0,a=1;for(let[e,o,s,c]of[[n.x,r.x-n.x,t.minX,t.maxX],[n.z,r.z-n.z,t.minZ,t.maxZ]]){if(Math.abs(o)<1e-14){if(e<s||e>c)return null;continue}let t=(s-e)/o,n=(c-e)/o;if(i=Math.max(i,Math.min(t,n)),a=Math.min(a,Math.max(t,n)),i>a)return null}return i===0&&a===1?e:{a:{x:n.x+(r.x-n.x)*i,z:n.z+(r.z-n.z)*i},b:{x:n.x+(r.x-n.x)*a,z:n.z+(r.z-n.z)*a}}}function Cs(e,t,n,r,i){let a=[];for(let o of xs(e,n,r,i))for(let e of t.query(o)){let t=Ss(e,o);t&&a.push(t)}return a}var ws=new WeakMap,Ts=new Y,Es=(e,t,n)=>Math.max(t,Math.min(n,e));function Ds(e,t){let n=Tt(e);if(!n)return null;let r=t.alignment??t.points,i=ws.get(r);i||(i=new WeakMap,ws.set(r,i));let a=i.get(n);if(a)return a;let o=t.distances?.length?t.distances:[0,t.length],s=[0];for(let e=1;e<o.length;e++){let t=o[e-1],n=o[e],r=Math.max(1,Math.ceil((n-t)/.5));for(let e=1;e<=r;e++)s.push(t+(n-t)*e/r)}let c=new Float64Array(s.length),l=new Float64Array(s.length),u=n=>{let r=fc(t,n);return Ot(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,Ts).length()*(r.chartSpeed??1)};l[0]=u(0);for(let e=1;e<s.length;e++)l[e]=u(s[e]),c[e]=c[e-1]+(s[e]-s[e-1])*(l[e-1]+4*u((s[e-1]+s[e])/2)+l[e])/6;return a={chart:Float64Array.from(s),physical:c,speed:l,length:c.at(-1),chartLength:t.length},i.set(n,a),a}function Os(e,t){let n=0,r=e.length-1;for(;n+1<r;){let i=n+r>>1;e[i]<=t?n=i:r=i}return n}function ks(e,t,n){let r=e.chart[t+1]-e.chart[t],i=e.physical[t],a=e.physical[t+1],o=e.speed[t]*r,s=e.speed[t+1]*r;return i+n*(o+n*(3*(a-i)-2*o-s+n*(2*(i-a)+o+s)))}function As(e,t){if(!e)return t;let n=Es(t,0,e.chartLength),r=Os(e.chart,n);return ks(e,r,(n-e.chart[r])/(e.chart[r+1]-e.chart[r]))}function js(e,t){if(!e)return t;let n=Es(t,0,e.length),r=Os(e.physical,n),i=e.physical[r],a=e.physical[r+1],o=e.chart[r+1]-e.chart[r],s=e.speed[r]*o,c=e.speed[r+1]*o,l=(n-i)/(a-i||1);for(let t=0;t<3;t++){let t=s+l*(2*(3*(a-i)-2*s-c)+3*l*(2*(i-a)+s+c));if(t<1e-12)break;l=Es(l-(ks(e,r,l)-n)/t,0,1)}return e.chart[r]+o*l}function Ms(e,t,n){if(!Tt(e))return n;let r=new Y,i=new Y,a=1;for(let n of t){Ot(e,n.x,0,n.z,1,0,0,r),Ot(e,n.x,0,n.z,0,0,1,i);let t=r.lengthSq(),o=r.dot(i),s=i.lengthSq(),c=Math.hypot(t-s,2*o),l=Math.max(1e-8,(t+s-c)/2),u=Math.sqrt((t+s+c)/2);a=Math.max(a,u/l)}return n*a*(1.025+n*a/Tt(e).radius*2)}function Ns(e,t,n){let r;try{return gs(e,t,n)}catch(e){r=e}let i=n.waypoints??[];if(n.world)try{return Ps(n.world,e,t,n)}catch{}if(!i.length)throw r;let a=[e,...i,t],o=a.map((e,t)=>{if(t===0||t===a.length-1||Number.isFinite(e.heading))return[{pose:e,penalty:0}];let r=Math.atan2(a[t+1].z-a[t-1].z,a[t+1].x-a[t-1].x);return Array.from({length:31},(t,i)=>{let a=(i-15)*.1;return{pose:{...e,heading:r+a},penalty:Math.abs(a)*n.radius*.05}})}),s=o[0].map(e=>({...e,cost:0,parts:[]}));for(let e=1;e<o.length;e++){let t=[];for(let r of o[e]){let e=null;for(let t of s){let i;try{i=gs(t.pose,r.pose,{...n,waypoints:[]})}catch{continue}let a=t.cost+i.length+r.penalty;(!e||a<e.cost)&&(e={...r,cost:a,parts:[...t.parts,i]})}e&&t.push(e)}if(!t.length)throw r;s=t}return s.sort((e,t)=>e.cost-t.cost),hs(s[0].parts,n.radius)}function Ps(e,t,n,r){let i=[t,...r.waypoints??[],n],a={x:(t.x+n.x)/2,z:(t.z+n.z)/2},o=Me(e,a.x,a.z,new et),s=Fs(o,0),c=Fs(o,2),l=Ot(e,a.x,0,a.z,1,0,0,new Y),u=Ot(e,a.x,0,a.z,0,0,1,new Y),d=l.dot(s),f=u.dot(s),p=l.dot(c),m=u.dot(c),h=d*m-f*p;if(Math.abs(h)<1e-8)throw RangeError(`A railway cannot use a singular pole chart`);let g={x:a.x,z:a.z,xx:m/h,xz:-f/h,zx:-p/h,zz:d/h},_=e=>{let t=e.x-a.x,n=e.z-a.z,r={...e,x:d*t+f*n,z:p*t+m*n};return Number.isFinite(e.heading)&&(r.heading=Math.atan2(p*Math.cos(e.heading)+m*Math.sin(e.heading),d*Math.cos(e.heading)+f*Math.sin(e.heading))),r},v=1;for(let t of i){Ot(e,t.x,0,t.z,g.xx,0,g.zx,l),Ot(e,t.x,0,t.z,g.xz,0,g.zz,u);let n=l.lengthSq(),r=l.dot(u),i=u.lengthSq(),a=Math.hypot(n-i,2*r);v=Math.max(v,Math.sqrt((n+i+a)/2)/Math.max(1e-8,(n+i-a)/2))}let y=r.physicalRadius??r.radius,b=y*v*(1.015+y*v/e.surface.radius*2),x=r.isAllowed??(()=>!0),S=e=>({x:g.x+g.xx*e.x+g.xz*e.z,z:g.z+g.zx*e.x+g.zz*e.z}),C=Ns(_(t),_(n),{...r,world:null,radius:b,waypoints:(r.waypoints??[]).map(_),isAllowed:e=>x(S(e))});for(let e of C.segments)e.chartTransform=g;return C}var Fs=(e,t)=>new Y().setFromMatrixColumn(e,t),Is=Object.freeze({seed:27,width:130,depth:95,cityRadius:9.6,riverWidth:5.4,groundY:0,waterY:-1.2,railY:.42,sampleSpacing:.35,minTurnRadius:8,throatLength:4}),Q=Object.freeze({trackHalfWidth:1.05,routeEdge:1.35,cuttingHalfWidth:1.08,track:1.45,riverBank:.8,mountain:.35,objects:.32,street:.28,worldEdge:.75,city:1.25,stationOffset:3,stationLength:6.4,stationWidth:2.4,stationEndDistance:7,tunnelRoofHeight:3.9,tunnelArchRadius:1.4,tunnelArchSpring:1.8,tunnelRockCover:.1,bridgeBank:2.2,maximumGrade:.12}),Ls=1e-7,Rs=(e,t,n)=>Math.max(t,Math.min(n,e)),zs=(e,t,n)=>e+(t-e)*n,Bs=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Vs=(e,t=Is.railY)=>Array.isArray(e)?{x:Number(e[0]),y:t,z:Number(e.length>2?e[2]:e[1])}:{x:Number(e.x),y:t,z:Number(e.z)},Hs=e=>Number.isFinite(e.x)&&Number.isFinite(e.z);function Us(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ws(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Rs(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-zs(n.x,r.x,o),t-zs(n.z,r.z,o))}var Gs=new WeakMap,Ks=new WeakMap,qs=new WeakMap;function Js(e){return e.points.slice(1).flatMap((t,n)=>{let r=e.points[n],i=e.period;if(i&&Math.abs(t.x-r.x)>i/2){let e=t.x-Math.sign(t.x-r.x)*i,a=Math.sign(r.x)*i/2,o=(a-r.x)/(e-r.x),s={x:a,z:zs(r.z,t.z,o)},c={...s,x:-a};return[{a:r,b:s,index:n,box:an([r,s])},{a:c,b:t,index:n,box:an([c,t])}]}return[{a:r,b:t,index:n,box:an([r,t])}]})}function Ys(e){let t=Gs.get(e);return t&&t.count===e.points.length||(t={count:e.points.length,tree:new vn(Js(e),e=>e.box),box:an(e.points)},Gs.set(e,t)),t}function Xs(e){return cn(e.lines)}function Zs(e,t,n=0){let r=Ks.get(e);for((!r||r.count>e.length)&&(r={count:0,grid:new on},Ks.set(e,r));r.count<e.length;){let t=e[r.count++];r.grid.insert(t,yn(t.x,t.z,t.radius??0))}return r.grid.query(yn(t.x,t.z,t.radius+n))}var Qs=(e,t,n=t.radius)=>lt(e,t.x,t.z,n);function $s(e,t,n,r=0){if(!e.surface)return Zs(t,n,r);let i=qs.get(t);for((!i||i.count>t.length)&&(i={count:0,grid:new on},qs.set(t,i));i.count<t.length;){let n=t[i.count++];for(let t of xs(e,n.x,n.z,Qs(e,n,n.radius??0)))i.grid.insert(n,t)}let a=xs(e,n.x,n.z,Qs(e,n,n.radius+r));return a.length===1?i.grid.query(a[0]):[...new Set(a.flatMap(e=>i.grid.query(e)))]}function ec(e,t,n,r){return Ws(0,0,ke(e,t,n),ke(e,t,r))}function tc(e,t,n,r,i=1/0){if(!e.surface)return Math.min(i,rc(t,n,r));let a={x:n,z:r};if(!Number.isFinite(i))for(let n of t.points)i=Math.min(i,tt(e,a,n));if(!Number.isFinite(i)||i===0)return i;let o=Cs(e,Ys(t).tree,n,r,Qs(e,a,i)),s=i;for(let{a:t,b:n}of o)s=Math.min(s,ec(e,a,t,n));return s}function nc(e,t,n,r){if(!e.surface)return Math.min(r,ic(e,t,n));let i={x:t,z:n},a=Cs(e,Xs(e),t,n,Qs(e,i,r)),o=r;for(let{a:t,b:n}of a)o=Math.min(o,ec(e,i,t,n));return o}function rc(e,t,n){if(e.points.length>32)return Ys(e).tree.nearest(t,n,e=>Ws(t,n,e.a,e.b));let r=1/0;for(let i=1;i<e.points.length;i++)r=Math.min(r,Ws(t,n,e.points[i-1],e.points[i]));return r}function ic(e,t,n){return Xs(e).nearest(t,n,e=>Ws(t,n,e.a,e.b))}function ac(e,t,n){return Hn(e,t,n)}function oc(e,t,n,r=0){if(e.surface?.complete&&e.surface.projection.type===`equirectangular`){let r=e.surface.projection,i=r.centralLatitude*Math.PI/180-n/r.radius;return Number.isFinite(t)&&Number.isFinite(i)&&Math.abs(i)<=Math.PI/2+1e-10}let i=!1,a=e.outline;for(let e=0,r=a.length-1;e<a.length;r=e++){let o=a[e],s=a[r];o[1]>n!=s[1]>n&&t<(s[0]-o[0])*(n-o[1])/(s[1]-o[1])+o[0]&&(i=!i)}if(!i)return!1;if(r<=0)return!0;for(let e=0;e<a.length;e++){let i=a[e],o=a[(e+1)%a.length];if(Ws(t,n,{x:i[0],z:i[1]},{x:o[0],z:o[1]})<r)return!1}return!0}function sc(e,t,n){return sn(e,t,n)}function cc(e,t,n){let r=Is.groundY;for(let i of e.mountains)r=Math.max(r,sc(i,t,n));return r}function lc(e,t,n){if(!oc(e,t,n))return{type:`outside`,height:-5};if(zn(e,t,n)<0)return{type:`water`,height:e.river.y};if(e.biomes){let r=ln(e,t,n);if(r===`ocean`)return{type:`ocean`,height:e.river.y};if(r===`shore`)return{type:`shore`,height:e.river.y*(1-Rs(-mn(e,`ocean`,t,n)/e.biomes.shoreWidth,0,1))}}let r=cc(e,t,n);return{type:r>0?`mountain`:`ground`,height:r}}function uc(e,t,n=Is.sampleSpacing){let r=[];for(let i=1;i<e.length;i++){let a=e[i-1],o=e[i],s=Math.max(1,Math.ceil(Bs(a,o)/n));for(let e=0;e<s;e++)i>1&&e===0&&Bs(a,r.at(-1))<Ls||r.push({x:zs(a.x,o.x,e/s),y:t,z:zs(a.z,o.z,e/s)})}r.push({...e.at(-1),y:t});let i=[0];for(let e=1;e<r.length;e++)i.push(i[e-1]+Bs(r[e-1],r[e]));return{points:r,distances:i,length:i.at(-1)}}function dc(e,t=4){if(e.length<3)return e;let n=[e[0]];for(let r=1;r<e.length-1;r++){let i=e[r-1],a=e[r],o=e[r+1],s=Bs(i,a),c=Bs(a,o);if(s<Ls||c<Ls)continue;let l=Math.min(t,s*.3,c*.3),u={x:a.x+(i.x-a.x)*l/s,z:a.z+(i.z-a.z)*l/s},d={x:a.x+(o.x-a.x)*l/c,z:a.z+(o.z-a.z)*l/c};n.push(u);for(let e=1;e<=10;e++){let t=e/10,r=1-t;n.push({x:r*r*u.x+2*r*t*a.x+t*t*d.x,z:r*r*u.z+2*r*t*a.z+t*t*d.z})}}return n.push(e.at(-1)),n}function fc(e,t){if(e.alignment)return ps(e.alignment,t);let n=Rs(t,0,e.length),r=0,i=e.distances.length-1;for(;r+1<i;){let t=r+i>>1;e.distances[t]<=n?r=t:i=t}let a=e.points[r],o=e.points[i],s=e.distances[i]-e.distances[r],c=s>Ls?(n-e.distances[r])/s:0,l=o.x-a.x,u=o.y-a.y,d=o.z-a.z,f=Math.hypot(l,u,d)||1;return{x:zs(a.x,o.x,c),y:zs(a.y,o.y,c),z:zs(a.z,o.z,c),distance:n,tangent:{x:l/f,y:u/f,z:d/f},angle:Math.atan2(l,d)}}function pc(e,t){let n=[],r=t(e.points[0],0)<=0?0:null;for(let i=1;i<e.points.length;i++){let a=e.points[i-1],o=e.points[i],s=t(a,e.distances[i-1]),c=t(o,e.distances[i]);if(s<=0==c<=0)continue;let l=0,u=1;for(let n=0;n<18;n++){let n=(l+u)/2,r=zs(e.distances[i-1],e.distances[i],n);t(e.alignment?fc(e,r):{x:zs(a.x,o.x,n),z:zs(a.z,o.z,n)},r)<=0==s<=0?l=n:u=n}let d=zs(e.distances[i-1],e.distances[i],(l+u)/2);s>0?r=d:(d-(r??0)>.01&&n.push({start:r??0,end:d}),r=null)}return r!==null&&e.length-r>.01&&n.push({start:r,end:e.length}),n.map(t=>({...t,entry:fc(e,t.start),exit:fc(e,t.end)}))}function mc(e,t){return[[-.5,-.22],[-.43,-.43],[-.2,-.5],[.22,-.5],[.44,-.4],[.5,-.17],[.5,.23],[.4,.44],[.18,.5],[-.22,.5],[-.44,.39],[-.5,.12]].map(([n,r])=>[n*e,r*t])}function hc(e,t){if(!e)throw TypeError(`Invalid world: ${t}`)}function gc(e,t,n){if(e.cities){hc(Array.isArray(e.cities)&&(e.cities.length>=2||e.gameplay&&e.cities.length===0),`at least two cities are required outside settlement mode`);let t=e.cities.map((e,t)=>({...e,id:String(e.id??`city-${t+1}`),...Vs(e,0),radius:e.radius??Qt(e.level??3).radius,stationIds:[]}));return hc(t.every(e=>Hs(e)&&Number.isFinite(e.radius)&&e.radius>0),`cities require finite x/z and positive radii`),hc(new Set(t.map(e=>e.id)).size===t.length,`city IDs must be unique`),t}let r=[[`westhaven`,-47,25],[`pineford`,-43,-20],[`summit`,-16,-29],[`alder`,16,-27],[`eastmere`,46,-17],[`sunfield`,47,23],[`meadow`,16,30],[`willow`,-16,23]];hc(Number.isFinite(Number(e.cityCount??8)),`cityCount must be finite`);let i=Rs(Math.round(e.cityCount??8),3,20),a=Math.min(t.width/130,t.depth/95);return i===8?r.map(([e,r,i])=>({id:e,x:r*t.width/130+(n()-.5)*2.6*a,z:i*t.depth/95+(n()-.5)*2.6*a,y:0,radius:Is.cityRadius*a,stationIds:[]})):Array.from({length:i},(e,r)=>{let o=Math.PI*2*r/i+.35+(n()-.5)*.14;return{id:`city-${r+1}`,x:Math.cos(o)*t.width*.35,z:Math.sin(o)*t.depth*.32,y:0,radius:Math.min(Is.cityRadius*a,Math.min(t.width,t.depth)*1.05/i),stationIds:[]}})}function _c(e,t={}){let n=e.platform?.width??e.width??0,r=e.platform?.length??e.length??0,i=ft(t,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i);return[[-r/2,-n/2],[r/2,-n/2],[r/2,n/2],[-r/2,n/2]].map(([n,r])=>Ue(t,e.x,e.z,n*a+r*o,-n*o+r*a))}function vc(e,t,n,r){let i=(e,t,n)=>(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x);return i(e,t,n)*i(e,t,r)<-1e-7&&i(n,r,e)*i(n,r,t)<-1e-7}function yc(e,t,n,r={}){let i=ft(r,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i),s=ke(r,e,{x:t,z:n}),c=s.x,l=s.z,u=c*a-l*o,d=c*o+l*a;return Math.hypot(Math.max(0,Math.abs(u)-e.platform.length/2),Math.max(0,Math.abs(d)-e.platform.width/2))}function bc(e,t,n={}){if(n.surface){let r={...e,x:0,z:0,rotation:ft(n,e.x,e.z,e.rotation??0)},i=_c(r),a=Qs(n,e,e.radius+Q.trackHalfWidth+.3),o=1/0;for(let s of Cs(n,Ys(t).tree,e.x,e.z,a)){let t=ke(n,e,s.a),a=ke(n,e,s.b);o=Math.min(o,yc(r,t.x,t.z),yc(r,a.x,a.z));for(let e=0;e<4;e++){if(vc(t,a,i[e],i[(e+1)%4]))return 0;o=Math.min(o,Ws(i[e].x,i[e].z,t,a))}}return o}let r=_c(e);return Ys(t).tree.nearest(e.x,e.z,t=>{let{a:n,b:i}=t,a=Math.min(yc(e,n.x,n.z),yc(e,i.x,i.z));for(let e=0;e<4;e++){if(vc(n,i,r[e],r[(e+1)%4]))return 0;a=Math.min(a,Ws(r[e].x,r[e].z,n,i))}return a},1/0,e.radius??Math.hypot(e.platform.length,e.platform.width)/2)}function xc(e){let t=[];for(let n of e.cities){let r=[];for(let i of e.lines){if(i.from!==n.id&&i.to!==n.id)continue;let a=i.from===n.id,o=Ds(e,i),s=o?.length??i.length;for(let c of[0,7,8.5,10]){if(s<c*2+1)continue;let l=js(o,a?c:s-c),u=fc(i,l);for(let a of[-1,1]){let o=ft(e,u.x,u.z,u.angle),s=-Math.cos(o),d=Math.sin(o),f=Ue(e,u.x,u.z,s*Q.stationOffset*a,d*Q.stationOffset*a),p=ke(e,f,u),m={id:`station-${n.id}`,kind:`station`,cityId:n.id,ownerId:n.ownerId,lineId:i.id,distance:l,...f,y:0,rotation:ot(e,f.x,f.z,Math.atan2(p.x,p.z)),side:a,radius:Math.hypot(Q.stationLength/2,Q.stationWidth/2),platform:{width:Q.stationWidth,length:Q.stationLength}},h=Qs(e,m,m.radius+Q.worldEdge);if(!oc(e,m.x,m.z,h)||e.biomes&&!$t(e,[`farmland`,`forest`,`plains`,`desert`],m.x,m.z,Qs(e,m))||e.mountains.some(t=>dn(t,m.x,m.z)<Qs(e,m,m.radius+Q.mountain))||(e.surface?zn(e,m.x,m.z)<Qs(e,m,m.radius+Q.riverBank):Sn(e).some(e=>bc(m,e)<e.width/2+Q.riverBank))||e.lines.some(t=>xs(e,m.x,m.z,Qs(e,m,m.radius+Q.trackHalfWidth+.25)).some(e=>_n(e,Ys(t).box))&&bc(m,t,e)<Q.trackHalfWidth+.25)||t.some(t=>tt(e,m,t)<m.radius+t.radius+Q.objects))continue;let g=tt(e,m,n)+c*.05;r.push({station:m,score:g})}}}if(r.sort((e,t)=>e.score-t.score),r.length){let e=r[0].station;t.push(e),n.stationIds.push(e.id)}}e.stations=t;for(let n of e.lines){let e=t.filter(e=>e.lineId===n.id);n.stationIds=e.map(e=>e.id);for(let t of n.stops){let n=e.find(e=>e.cityId===t.cityId);n&&(t.distance=n.distance)}}}function Sc(e,t,{cityId:n=null,keepOutsideCities:r=!1}={}){let i=t.radius;if(e.gameplay?.reservations?.some(n=>tt(e,t,n)<i+n.radius)||!oc(e,t.x,t.z))return!1;if(e.detailRegion&&!n){let n=e.detailRegion,r=Qs(e,t,i+Q.objects/2);if(t.x-r<n.minX||t.x+r>n.maxX||t.z-r<n.minZ||t.z+r>n.maxZ)return!1}return!(e.biomes&&!$t(e,[`farmland`,`forest`,`plains`,`desert`],t.x,t.z,Qs(e,t))||!oc(e,t.x,t.z,Qs(e,t,i+Q.worldEdge))||nc(e,t.x,t.z,i+Q.track)<i+Q.track||zn(e,t.x,t.z)<Qs(e,t,i+Q.riverBank)||Zs(e.mountains,{...t,radius:Qs(e,t,i+Q.mountain)}).some(n=>dn(n,t.x,t.z)<Qs(e,t,i+Q.mountain))||r&&$s(e,e.cities,t,Q.city).some(n=>tt(e,t,n)<n.radius+i+Q.city)||n&&$s(e,e.cities,t,e.detailRegion?Q.objects:0).some(r=>r.id!==n&&tt(e,t,r)<r.radius+(e.detailRegion?i+Q.objects:i*.5))||$s(e,e.stations,t,Q.objects).some(n=>tt(e,t,n)<i+n.radius+Q.objects)||$s(e,e.placements,t,Q.objects).some(n=>tt(e,t,n)<i+n.radius+Q.objects&&(t.kind!==`farm`||n.kind!==`farm`||tn(e,t,n,Q.objects)))||(e.cityStreets??[]).some(n=>tc(e,n,t.x,t.z,i+n.width/2+Q.street)<i+n.width/2+Q.street))}function Cc(e,t=e.cities){let n=[`farmland`,`forest`,`plains`,`desert`],r=e.surface?.complete&&e.surface.projection.type===`equirectangular`?2*Math.PI*e.surface.projection.radius:void 0,i=(t,n)=>tt(e,t,n),a=(t,n,r)=>tc(e,t,n,r,8);for(let o of t){let t=o.development,s=kn(e.seed,o.id),c=o.railAxis??{x:1,z:0},l=ft(e,o.x,o.z,Math.atan2(c.x,c.z)),u={x:Math.sin(l),z:Math.cos(l)},d={x:-u.z,z:u.x},f=t.streetWidth,p=t.streetSpacing,m=(t,n,r)=>Ue(e,o.x,o.z,u.x*t+d.x*n*r,u.z*t+d.z*n*r),h=t=>{let r=f/2+.12;return!(i(t,o)>o.radius-r||!oc(e,t.x,t.z,Qs(e,t,r+Q.worldEdge))||!$t(e,n,t.x,t.z,Qs(e,t,r))||nc(e,t.x,t.z,Q.track+r)<Q.track+r||zn(e,t.x,t.z)<Qs(e,t,Q.riverBank+r)||e.mountains.some(n=>dn(n,t.x,t.z)<Qs(e,t,r+Q.mountain))||$s(e,e.cities,{...t,radius:r},e.detailRegion?Q.objects:0).some(n=>n.id!==o.id&&i(t,n)<n.radius+(e.detailRegion?r+Q.objects:r*.5))||$s(e,e.stations,{...t,radius:r}).some(n=>yc(n,t.x,t.z,e)<r))},g=t=>{for(let n=1;n<t.length;n++){let r=t[n-1],a=t[n],o=Math.max(1,Math.ceil(i(r,a)/.6)),s=ke(e,r,a);for(let t=0;t<=o;t++)if(!h(Ue(e,r.x,r.z,s.x*t/o,s.z*t/o)))return!1}return!0},_=e.stations.find(e=>e.cityId===o.id),v=_?ke(e,o,_):null,y=_?Math.sign(v.x*d.x+v.z*d.z):s()<.5?1:-1,b=t=>{let n=kn(e.seed,`${o.id}:lanes:${t}`),s=[],c=[],l=t===y?5.1:3.7,u=m((n()-.5)*o.radius*.12,Math.max(l+.6,o.radius*.46),t),d=[];for(let e=l;e<o.radius-2;e+=3.2)for(let n=-o.radius*.7;n<=o.radius*.7;n+=2.5){let r=m(n,e,t);d.push({p:r,score:n*n+(e-l)**2})}d.sort((e,t)=>e.score-t.score);for(let{p:e}of d)if(h(e)){s.push(e);break}if(!s.length)return{side:t,edges:c,center:u};let _=(t,n,r)=>{let a=i(t,n),o=ke(e,t,n),s=-o.z/a,c=o.x/a,l=Math.max(3,Math.ceil(a/1.1));return Array.from({length:l+1},(i,a)=>{if(a===0)return t;if(a===l)return n;let u=a/l,d=Math.sin(Math.PI*u)*r;return Ue(e,t.x,t.z,o.x*u+s*d,o.z*u+c*d)})},v=e=>c.some(t=>{let n=[e[0],e.at(-1)].filter(e=>e===t.points[0]||e===t.points.at(-1));return e.some(e=>!n.some(t=>i(e,t)<2.1)&&a(t,e.x,e.z)<f+1.15)}),b=Math.max(2,Math.ceil((o.radius/7.5)**2));for(let a=0;a<(o.radius<14?280:900)&&s.length<b;a++){let a=n()*Math.PI*2,u=Math.sqrt(n()),d=Math.cos(a)*o.radius*.77*u,y=Math.max(l+.6,o.radius*.46)+Math.sin(a)*Math.max(2,o.radius*.34)*u,b=m(d,y,t);if(i(b,o)>o.radius-1.7)continue;let x=s.map(e=>({node:e,distance:i(e,b)})).sort((e,t)=>e.distance-t.distance);if(x[0].distance<p*.72||x[0].distance>p*1.65||!h(b))continue;let S=x[0].node;if(c.some(t=>{let n=t.points[0]===S?t.points[1]:t.points.at(-1)===S?t.points.at(-2):null;if(!n)return!1;let r=ke(e,S,n),a=ke(e,S,b);return(r.x*a.x+r.z*a.z)/(i(n,S)*i(b,S))>.73}))continue;let C=_(S,b,(n()-.5)*Math.min(1.8,x[0].distance*.2));g(C)&&!v(C)&&(s.push(b),c.push({points:C,width:f,...r?{period:r}:{}}))}if(o.level>=4){let e=[];for(let t=0;t<s.length;t++)for(let n=t+1;n<s.length;n++){let r=s[t],a=s[n],o=i(r,a);o>p*1.5||c.some(e=>e.points[0]===r&&e.points.at(-1)===a||e.points[0]===a&&e.points.at(-1)===r)||e.push({a:r,b:a,d:o})}e.sort((e,t)=>e.d-t.d);let t=0;for(let{a:i,b:a,d:s}of e){if(t>=Math.floor(o.level/3))break;let e=_(i,a,(n()-.5)*Math.min(1.2,s*.14));g(e)&&!v(e)&&(c.push({points:e,width:f,...r?{period:r}:{}}),t++)}}if(!c.length)for(let e of[-1,1]){let i=m(e*2.8,l+n()*.6,t),a=_(s[0],i,.2*e);if(g(a)){c.push({points:a,width:f,...r?{period:r}:{}});break}}return{side:t,edges:c,center:u}},x=[b(1),b(-1)];for(let t of x){let n=fn.house*.9,r=n+f/2+Q.street+.1;t.capacity=0;for(let s of t.edges)for(let c=1;c<s.points.length;c++){let l=s.points[c-1],u=s.points[c],d=i(l,u);for(let s of[-1,1]){let c=ke(e,l,u),p={...Ue(e,l.x,l.z,c.x/2-c.z/d*r*s,c.z/2+c.x/d*r*s),radius:n};i(p,o)+n<=o.radius&&Sc(e,p,{cityId:o.id})&&t.edges.every(e=>a(e,p.x,p.z)>=n+f/2+Q.street)&&(t.capacity+=d)}}}x.sort((e,t)=>t.capacity-e.capacity||(e.side===y?-1:1));let S=x[0],C=S.edges.map((e,t)=>({id:`street-${o.id}-${t+1}`,cityId:o.id,ownerId:o.ownerId,...e}));if(e.cityStreets.push(...C),t.streetCount=C.length,t.connectionCount=e.lines.filter(e=>e.from===o.id||e.to===o.id).length,!C.length)continue;let w=C.flatMap(e=>e.points.slice(1).map((t,n)=>({a:e.points[n],b:t,length:i(e.points[n],t)}))),T=t.features.filter(e=>e!==`house`).reverse(),E=e=>{if(e<3)return`house`;if(e<T.length+3)return T[e-3];let t=s();return o.level>=8&&t<.12?`tower`:o.level>=4&&t<(o.level>=8?.38:.25)?`apartment`:`house`},D=0,O=[],k=new Map,A=t=>{if(k.has(t))return k.get(t);let n=kn(e.seed,`${o.id}:lots:${t}`),r=[];for(let{a,b:s,length:c}of w){let l=ke(e,a,s),u=l.x/c,d=l.z/c,p=Math.max(1,Math.ceil(c/.72));for(let s=0;s<p;s++)for(let c of[-1,1])for(let m=0;m<(t===`house`?2:1);m++){let h=(s+.18+n()*.64)/p,g=t===`house`?.86+n()*.1:.9+n()*.09,_=fn[t]*g,v=_+f/2+Q.street+.06+n()*.12+m*(2.8+Q.objects),y=Ue(e,a.x,a.z,l.x*h-d*v*c,l.z*h+u*v*c),b=Ue(e,a.x,a.z,l.x*h,l.z*h),x=ke(e,y,b),C={kind:t,cityId:o.id,ownerId:o.ownerId,...y,y:0,radius:_,scale:g,variant:Math.floor(n()*8),rotation:ot(e,y.x,y.z,Math.atan2(x.x,x.z))};if(i(C,o)+_>o.radius||!Sc(e,C,{cityId:o.id}))continue;let w=O.length?Math.min(...O.map(e=>i(C,e)-_-e.radius)):1/0;r.push({item:C,neighbor:w,score:i(C,S.center)*.3+m*.4})}}return k.set(t,r),r},j=t=>{let n=A(t),r=null,a=1/0;for(let e of n){if(e.blocked)continue;let t=e.score+(Number.isFinite(e.neighbor)?e.neighbor*1.8:0);t<a&&(r=e,a=t)}if(!r)return!1;let s={...r.item,id:`city-${o.id}-building-${D+1}`,biome:ln(e,r.item.x,r.item.z)};e.placements.push(s),O.push(s),D++;for(let e of k.values())for(let t of e){if(t.blocked)continue;let e=i(s,t.item)-s.radius-t.item.radius;e<Q.objects?t.blocked=!0:t.neighbor=Math.min(t.neighbor,e)}return!0};for(let e=0;e<t.buildingBudget;e++)j(E(e));for(let e=0;D<t.buildingBudget&&e<3;)j(`house`)?e=0:e++;t.placedBuildings=D,t.placedFeatures=[...new Set(O.map(e=>e.kind))]}}function wc(e,t,n){let r=n=>e.placements.push({id:e.detailRegion?`asset-${e.detailRegion.minX}-${e.detailRegion.minZ}-${e.placements.length+1}`:`asset-${e.placements.length+1}`,y:0,rotation:t()*Math.PI*2,biome:ln(e,n.x,n.z),...n}),i=e.detailRegion,a=Math.sqrt((i?(i.maxX-i.minX)*(i.maxZ-i.minZ):e.bounds.width*e.bounds.depth)/12350),o=t=>!e.surface?.complete||oc(e,t.x,t.z)&&mn(e,`ice`,t.x,t.z)<-Qs(e,t);if(e.farmland=Vn(e,{density:n,canPlace:t=>o(t)&&Sc(e,t,{keepOutsideCities:!0}),add:r}),n<=0)return;let s=i??{minX:-e.bounds.width*.47,maxX:e.bounds.width*.47,minZ:-e.bounds.depth*.47,maxZ:e.bounds.depth*.47},c=e=>(e=Rs(e,0,1),e*e*(3-2*e)),l=(t,r,i,a=!0)=>{t/=Math.sqrt(Math.min(2,n));let o=(s.maxX-s.minX)*(s.maxZ-s.minZ);t=Math.max(t,Math.sqrt(o/i));let c=[];for(let n=Math.floor(s.minZ/t);n<=Math.floor(s.maxZ/t);n++)for(let i=Math.floor(s.minX/t);i<=Math.floor(s.maxX/t);i++){let a=Us(`${e.seed}:landscape:${r}:${i}:${n}`),o=(i+.08+a()*.84)*t,l=(n+.08+a()*.84)*t;o<s.minX||o>=s.maxX||l<s.minZ||l>=s.maxZ||!oc(e,o,l)||c.push({x:o,z:l,rng:a,priority:a()})}return a?c.sort((e,t)=>e.priority-t.priority):c},u=(t,n,r=!1)=>(r?mn(e,`ice`,t.x,t.z)>=Qs(e,t):o(t))&&$t(e,n,t.x,t.z,Qs(e,t))&&Sc(e,t,{keepOutsideCities:!0}),d=Math.round(310*n*a),f={},p=0,m=l(2.2,`canopy`,12e3,!1).filter(t=>(t.biome=ln(e,t.x,t.z),t.biome!==`forest`&&t.biome!==`plains`||(t.ecology=Ht(e,t.x,t.z),t.ecology.ecoregion===`polar`)?!1:(t.priority=t.biome===`forest`?1+t.ecology.patch*.75+t.ecology.detail*.25+t.priority*.025:t.priority,!0))).sort((e,t)=>t.priority-e.priority);for(let t of m){if(p>=d)break;let n=t.biome,i=t.ecology,a=t.rng,o=c((i.patch-.35)/.34),s=c((i.patch-.57)/.2),l=n===`forest`?o*(.55+i.detail*.45):.004+s*.054,f=e.surface?.projection.type===`equirectangular`?Math.max(.06,Math.cos(i.latitude*Math.PI/180)):1;if(a()>l*f||i.ecoregion===`polar`)continue;let m=.48+(n===`forest`?o:s)*.48+a()*.25,h=i.ecoregion===`tropical`?n===`plains`||i.moisture<.38?`acacia`:`broadleaf`:i.ecoregion===`boreal`?i.moisture>.65?`birch`:`pine`:i.moisture<.36?`pine`:i.moisture>.62?`birch`:i.detail>.62?`gold`:`broadleaf`;a()<.09&&(h=h===`pine`?`birch`:`round`);let g={kind:`tree`,x:t.x,z:t.z,radius:.85*m,scale:m,variant:h,landscapeLayer:`canopy`,rotation:ot(e,t.x,t.z,a()*Math.PI*2)};u(g,[`forest`,`plains`])&&(r(g),p++)}let h=0,g=0,_=0,v=Math.round(48*n*a),y=Math.round(14*n*a),b=Math.round(12*n*a);for(let t of l(14,`understory`,1800)){let n=ln(e,t.x,t.z);if(![`forest`,`plains`,`desert`].includes(n))continue;let i=Ht(e,t.x,t.z,f),a=t.rng,o=e.surface?.complete&&mn(e,`ice`,t.x,t.z)>0,s=null,c=2+a()*2.4;if(o?a()<.36&&(s=`frost`):n===`desert`?i.patch<.55&&a()<.7?(s=`dune`,c=4.1+a()*2.8):i.patch>.61&&a()<.67?(s=`outcrop`,c=2.8+a()*2.3):i.moisture>.47&&a()<.28&&(s=`scrub`):n===`forest`?i.patch<.47&&a()<.45?(s=`meadow`,c=2.8+a()*2.1):i.detail>.72&&a()<.18&&(s=`outcrop`):i.ecoregion===`polar`?a()<.4&&(s=i.moisture>.52?`scrub`:`frost`):i.patch<.6&&a()<.46?(s=i.moisture<.34?`scrub`:`meadow`,c=2.6+a()*2.5):i.detail>.7&&a()<.38&&(s=`outcrop`),s&&h<v){let l={kind:`nature`,x:t.x,z:t.z,radius:c,scale:1,style:s,variant:Math.floor(a()*65536),rotation:ot(e,t.x,t.z,i.windAngle+(a()-.5)*.28)};u(l,n,o)&&(r(l),h++)}let l=!o&&n===`plains`&&i.ecoregion!==`polar`&&i.patch<.58&&i.moisture>.36&&a()<.17,d=!e.surface?.complete||i.longitude>-125&&i.longitude<-60,p=!o&&n===`desert`&&d&&i.patch>.5&&i.patch<.72&&a()<.2;if(!l&&!p)continue;let m=2+Math.floor(a()*4),x=a()*Math.PI*2;for(let i=0;i<m;i++){let i=l?`sheep`:`cactus`;if(l?g>=y:_>=b)break;let o=a()*Math.PI*2,s=2.4+a()*4.8,c=Ue(e,t.x,t.z,Math.cos(o)*s,Math.sin(o)*s),d=l?1:.72+a()*.35,f=l?.9+a()*.5:0,p={kind:i,...c,radius:l?.7+f:.7*d,...l?{roamRadius:f}:{},scale:d,variant:Math.floor(a()*3),rotation:ot(e,c.x,c.z,x+(a()-.5)*.65)};u(p,n)&&(r(p),l?g++:_++)}}}function Tc(e,t,n){for(let r of e.cities){let i=t.filter(e=>e.from===r.id||e.to===r.id).map(t=>{let n=t.from===r.id,i=e.cities.find(e=>e.id===(n?t.to:t.from)),a=t.waypoints.length?n?t.waypoints[0]:t.waypoints.at(-1):i,o=Bs(r,a)||1;return{connection:t,end:n?`start`:`end`,x:(a.x-r.x)/o,z:(a.z-r.z)/o}}),a=i.length?{x:i[0].x,z:i[0].z}:{x:1,z:0},o=1/0;for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){let n=i[e],r=i[t],s=n.x*r.x+n.z*r.z;if(s>=o)continue;o=s;let c=n.x-r.x,l=n.z-r.z,u=Math.hypot(c,l);u>Ls&&(a={x:c/u,z:l/u})}r.railHeading!==void 0&&(hc(Number.isFinite(r.railHeading),`city railHeading must be a finite angle in radians`),a={x:Math.cos(r.railHeading),z:Math.sin(r.railHeading)}),(a.x<0||Math.abs(a.x)<Ls&&a.z<0)&&(a={x:-a.x,z:-a.z}),r.railAxis=a;let s=Math.min(...i.map(t=>Bs(r,e.cities.find(e=>e.id===(t.connection.from===r.id?t.connection.to:t.connection.from))))),c=r.throatLength??n;hc(Number.isFinite(c)&&c>=0,`city throatLength must be finite and nonnegative`),r.throatLength=Math.min(c,s*.18);for(let e of i){let t=e.x*a.x+e.z*a.z>=0?1:-1;e.connection[e.end===`start`?`fromPort`:`toPort`]={cityId:r.id,side:t,x:r.x+a.x*t*r.throatLength,z:r.z+a.z*t*r.throatLength,heading:Math.atan2(a.z*t,a.x*t)}}}}function Ec(e,t,n){let r=fc(e,t===`start`?n:e.length-n),i=t===`start`?1:-1;return{...r,tangent:{x:r.tangent.x*i,y:0,z:r.tangent.z*i},curvature:(r.curvature??0)*i}}function Dc(e,t){let n=e=>e.end===`start`?e.line.alignment.segments:e.line.alignment.segments.toReversed(),r=n(e),i=n(t),a=0,o=0,s=0,c=0,l=0;for(;a<r.length&&o<i.length;){let n=Ec(e.line,e.end,l+1e-6),u=Ec(t.line,t.end,l+1e-6);if(Bs(n,u)>1e-5||n.tangent.x*u.tangent.x+n.tangent.z*u.tangent.z<1-1e-8||Math.abs(n.curvature-u.curvature)>1e-8)break;let d=Math.min(r[a].length-s,i[o].length-c);if(d<Ls)break;l+=d,s+=d,c+=d,s>=r[a].length-Ls&&(a++,s=0),c>=i[o].length-Ls&&(o++,c=0)}return l}function Oc(e){e.sharedSections=[],e.transitions=[];for(let t of e.lines)t.sharedSections=[],t.renderRanges=[{start:0,end:t.length}];for(let t of e.cities){let n=e.lines.flatMap(e=>e.from===t.id?[{line:e,end:`start`,port:e.fromPort}]:e.to===t.id?[{line:e,end:`end`,port:e.toPort}]:[]);for(let r of n)for(let i of n)r.line!==i.line&&r.port.side!==i.port.side&&e.transitions.push({cityId:t.id,fromLineId:r.line.id,fromEnd:r.end,toLineId:i.line.id,toEnd:i.end});for(let r of[-1,1]){let i=n.filter(e=>e.port.side===r);if(i.length<2)continue;let a=new Map,o=(e,t)=>[e.line.id,t.line.id].sort().join(`|`);for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)a.set(o(i[e],i[t]),Dc(i[e],i[t]));let s=[0,...new Set([...a.values()].filter(e=>e>Ls).map(e=>Math.round(e*1e7)/1e7))].sort((e,t)=>e-t);for(let n=1;n<s.length;n++){let c=s[n-1],l=s[n],u=(c+l)/2,d=[...i];for(;d.length;){let n=d.shift(),i=[n];for(let e=d.length-1;e>=0;e--)(a.get(o(n,d[e]))??0)>u&&(i.push(d[e]),d.splice(e,1));if(i.length<2)continue;i.sort((t,n)=>e.lines.indexOf(t.line)-e.lines.indexOf(n.line));let s=i[0],f=`shared-${t.id}-${r}-${e.sharedSections.length+1}`,p=Array.from({length:Math.max(2,Math.ceil((l-c)/.35)+1)},(e,t)=>{let n=Ec(s.line,s.end,c+(l-c)*t/(Math.max(2,Math.ceil((l-c)/.35)+1)-1));return{x:n.x,y:n.y,z:n.z}}),m={id:f,cityId:t.id,side:r,ownerLineId:s.line.id,length:l-c,points:p,lines:[]};for(let e of i){let n=e.end===`start`?c:e.line.length-l,i=e.end===`start`?l:e.line.length-c,a={id:f,cityId:t.id,side:r,start:n,end:i,ownerLineId:s.line.id};e.line.sharedSections.push(a),m.lines.push({lineId:e.line.id,start:n,end:i,forward:e.end===`start`}),e!==s&&(e.line.renderRanges=e.line.renderRanges.flatMap(e=>i<=e.start+Ls||n>=e.end-Ls?[e]:[{start:e.start,end:Math.max(e.start,n)},{start:Math.min(e.end,i),end:e.end}].filter(e=>e.end-e.start>Ls)))}e.sharedSections.push(m)}}}}}function kc(e,t,n,r,i,a=.5){return e.sharedSections.some(e=>{let o=e.lines.find(e=>e.lineId===t.id),s=e.lines.find(e=>e.lineId===n.id);return o&&s&&r>=o.start-a&&r<=o.end+a&&i>=s.start-a&&i<=s.end+a})}function Ac(e){let t=[],n=(e,t,n,r)=>e*r-t*n,r=Xs(e),i=r.items;for(let a of i)for(let i of r.query({minX:a.minX-Ls,maxX:a.maxX+Ls,minZ:a.minZ-Ls,maxZ:a.maxZ+Ls})){if(i.lineIndex<=a.lineIndex)continue;let r=a.line,o=i.line;if(a.maxX<i.minX-Ls||i.maxX<a.minX-Ls||a.maxZ<i.minZ-Ls||i.maxZ<a.minZ-Ls||kc(e,r,o,(r.distances[a.index]+r.distances[a.index+1])/2,(o.distances[i.index]+o.distances[i.index+1])/2))continue;let s=a.b.x-a.a.x,c=a.b.z-a.a.z,l=i.b.x-i.a.x,u=i.b.z-i.a.z,d=i.a.x-a.a.x,f=i.a.z-a.a.z,p=n(s,c,l,u),m=s*s+c*c;if(Math.abs(p)<1e-10){if(Math.abs(n(d,f,s,c))>1e-7)continue;let e=(d*s+f*c)/(m||1),t=e+(l*s+u*c)/(m||1);hc((Math.min(1,Math.max(e,t))-Math.max(0,Math.min(e,t)))*Math.sqrt(m)<1e-4,`routes ${r.id} and ${o.id} overlap; shared railway segments must be represented by one connection`);continue}let h=n(d,f,l,u)/p,g=n(d,f,s,c)/p;if(h<-1e-6||h>1.000001||g<-1e-6||g>1.000001)continue;let _=zs(r.distances[a.index],r.distances[a.index+1],Rs(h,0,1)),v=zs(o.distances[i.index],o.distances[i.index+1],Rs(g,0,1)),y=(e,t)=>t<.001||t>e.length-.001;if((r.from===o.from||r.from===o.to||r.to===o.from||r.to===o.to)&&y(r,_)&&y(o,v))continue;let b=zs(a.a.x,a.b.x,Rs(h,0,1)),x=zs(a.a.z,a.b.z,Rs(h,0,1)),S=t.find(e=>Math.hypot(e.x-b,e.z-x)<.05);S||(S={id:`junction-${t.length+1}`,x:b,y:Is.railY,z:x,lines:[]},t.push(S));for(let[e,t]of[[r,_],[o,v]])S.lines.some(t=>t.lineId===e.id)||S.lines.push({lineId:e.id,distance:t})}e.junctions=t}function jc(e={},t={}){let n=e.seed??Is.seed,r=Us(n),i={width:Number(e.bounds?.width??Is.width),depth:Number(e.bounds?.depth??Is.depth)};hc(Number.isFinite(i.width)&&Number.isFinite(i.depth)&&i.width>=35&&i.depth>=30,`bounds must be finite and at least 35 × 30`);let a=un(e.players),o=gc(e,i,r),s=new Set(a.map(e=>e.id));for(let[t,r]of o.entries()){let i=kn(n,r.id);r.level=r.level??(e.cities?1+Math.floor(i()*10):3);let o=Qt(r.level);r.ownerId=String(r.ownerId??a[Math.floor(kn(n,`${r.id}:owner`)()*a.length)].id),hc(s.has(r.ownerId),`city ${r.id} references unknown owner ${r.ownerId}`),e.cities&&e.cities[t].radius==null&&(r.radius=o.radius),r.development={...o,radius:r.radius,variantSeed:`${n}:city:${r.id}`,placedBuildings:0,streetCount:0,connectionCount:0}}let c={...e.trainOwners??{}};hc(e.trainOwners===void 0||e.trainOwners&&typeof e.trainOwners==`object`&&!Array.isArray(e.trainOwners),`trainOwners must be an object keyed by train ID`),hc(Object.values(c).every(e=>s.has(e)),`trainOwners references an unknown player`);let l=e.outline?e.outline.map(e=>[Number(e[0]),Number(e[1])]):mc(i.width,i.depth);hc(l.length>=3&&l.every(e=>e.every(Number.isFinite)),`outline requires at least three finite points`);let u={version:2,seed:n,bounds:i,outline:l,geography:e.geography,camera:e.camera,surface:vt(e.surface),players:a,trainOwners:c,traffic:structuredClone(e.traffic??{}),density:Rs(Number(e.density??1)||0,0,3),detailMode:t.detail??`full`,cities:o,lines:[],stations:[],placements:[],cityStreets:[],junctions:[]};e.gameplay&&(u.gameplay=structuredClone(e.gameplay)),hc(o.every(e=>oc(u,e.x,e.z,.5)),`cities must be inside the world outline`);let d={points:[[-.64,.015],[-.42,-.025],[-.2,.035],[.02,0],[.22,.075],[.43,.055],[.64,.015]].map(([e,t])=>[e*i.width,t*i.depth])},f=e.rivers??[e.river??d];hc(Array.isArray(f),`rivers must be an array`);let p=f.map((e,t)=>{let n=e.points.map(e=>Vs(e,Is.waterY));hc(n.every(Hs),`river requires finite points`);let r=n.filter((e,t)=>t===0||Bs(e,n[t-1])>Ls);hc(r.length>=2,`river requires at least two distinct points`);let i=Number(e.width??Is.riverWidth);hc(Number.isFinite(i)&&i>0,`river width must be positive`);let a=uc(e.smooth===!1?r:dc(r,9),Is.waterY,e.smooth===!1?1/0:1);return hc(Number.isFinite(a.length)&&a.length>Ls,`river must have positive length`),{...a,id:e.id??`river-${t+1}`,name:e.name,width:i,y:Is.waterY}});u.river=p[0]??{points:[],distances:[],length:0,width:0,y:Is.waterY},e.rivers!==void 0&&(u.rivers=p),u.lakes=e.biomes?.geography?.lakes,u.lakeShore=e.biomes?.geography?.lakeShore,(e.rivers!==void 0||u.lakes?.length)&&(u.hydrology=En(u));let m=u.river.width,h=Math.min(i.width/130,i.depth/95),g=[...o].sort((e,t)=>e.z-t.z).slice(0,2),_={x:((g[0]?.x??0)+(g[1]?.x??0))/2,z:((g[0]?.z??0)+(g[1]?.z??0))/2},v=(e.cities?[]:[{id:`high-pass`,..._,radius:10*h,height:13*h},{id:`north-spire`,x:_.x-7*h,z:_.z-11*h,radius:6.8*h,height:10*h},{id:`east-spire`,x:_.x+11*h,z:_.z-10*h,radius:7*h,height:9*h}]).filter(e=>oc(u,e.x,e.z,e.radius+.1)&&ac(u,e.x,e.z)>e.radius+m/2+Q.riverBank&&o.every(t=>Bs(t,e)>e.radius+2));u.mountains=(e.mountains??v).map((e,t)=>({...e,id:String(e.id??`mountain-${t+1}`),x:Number(e.x),z:Number(e.z),radius:Number(e.radius),height:Number(e.height)})),hc(u.mountains.every(e=>Hs(e)&&Number.isFinite(e.radius)&&e.radius>0&&Number.isFinite(e.height)&&e.height>0),`mountains require finite x/z and positive radius/height`),hc(new Set(u.mountains.map(e=>e.id)).size===u.mountains.length,`mountain IDs must be unique`),hc(u.mountains.every(e=>e.range?e.range.polygon.every(([e,t])=>oc(u,e,t)):oc(u,e.x,e.z,e.radius+.1)),`mountain footprints must stay inside the world outline`),hc(u.mountains.every(e=>e.range||zn(u,e.x,e.z)>e.radius+Q.riverBank),`mountain footprints must not overlap the river or its banks`),e.biomes?.geography&&(u.biomes=Un(u,e.biomes));let y=(o.length===2?o.slice(0,1):o).map((e,t)=>({from:e.id,to:o[(t+1)%o.length].id}));o.length===8&&y.push({from:o[7].id,to:o[2].id},{from:o[6].id,to:o[3].id});let b=e.connections??y,x=[`coral`,`teal`,`gold`,`blue`,`coral`,`gold`,`teal`,`blue`,`gold`,`coral`];hc(Array.isArray(b)&&(b.length>0||u.gameplay&&o.length===0),`at least one connection is required outside settlement mode`);let S=b.map((e,t)=>({...e,id:String(e.id??`line-${t+1}`),from:String(e.from),to:String(e.to),waypoints:(e.points??e.waypoints??[]).map(e=>({...Vs(e),...Number.isFinite(e.heading)?{heading:e.heading}:{}}))}));hc(S.every(e=>o.some(t=>t.id===e.from)&&o.some(t=>t.id===e.to)&&e.from!==e.to),`connections must reference two different existing city IDs`);let C=S.map(e=>[e.from,e.to].sort().join(`|`));hc(new Set(C).size===C.length,`overlapping duplicate city connections must be represented by one railway`);let w=Number(e.minTurnRadius??Is.minTurnRadius),T=Number(e.throatLength??Is.throatLength);hc(Number.isFinite(w)&&w>0,`minTurnRadius must be positive and finite`),hc(Number.isFinite(T)&&T>=0,`throatLength must be finite and nonnegative`),u.minTurnRadius=w,Tc(u,S,T);for(let t=0;t<S.length;t++){let n=S[t],r=o.find(e=>e.id===String(n.from)),i=o.find(e=>e.id===String(n.to));hc(r&&i&&r!==i,`connections must reference two different existing city IDs`);let a=n.waypoints;hc(a.every(Hs),`connection waypoints require finite x/z`);let c=n.fromPort,l={...n.toPort,heading:n.toPort.heading+Math.PI},d=Ms(u,[c,...a,l],w),f;try{f=(u.surface?Ns:gs)(c,l,{radius:d,physicalRadius:w,world:u,waypoints:a,y:Is.railY,isAllowed:e=>oc(u,e.x,e.z,Q.routeEdge)})}catch(e){throw TypeError(`${e.message} (${n.id})`,{cause:e})}let p=hs([ss(r,c),f,ss(l,i)],d),m=String(n.ownerId??r.ownerId);hc(s.has(m),`line ${n.id} references unknown owner ${m}`);let h={id:n.id,from:r.id,to:i.id,ownerId:m,color:n.color??x[t%x.length],closed:!1,fromPort:n.fromPort,toPort:n.toPort,alignment:p,...ms(p,Is.sampleSpacing),bridges:[],tunnels:[],cuts:[],stationIds:[]};hc(h.length>Ls,`connections must have nonzero length`),hc(h.points.every(e=>oc(u,e.x,e.z,Q.routeEdge))&&u.outline.every(([e,t])=>rc(h,e,t)>=Q.routeEdge),`entire railway corridors must stay inside the world outline`),h.bridges=pc(h,t=>Math.min(zn(u,t.x,t.z),e.biomes?.geography?-mn(u,`ocean`,t.x,t.z):1/0)-Q.bridgeBank);for(let e of u.mountains){if(rc(h,e.x,e.z)>e.radius+Qs(u,e,Q.cuttingHalfWidth))continue;let t=pc(h,t=>dn(e,t.x,t.z)-Qs(u,t,Q.cuttingHalfWidth));h.cuts.push(...t.map(t=>({...t,mountainId:e.id})));let n=pc(h,(t,n)=>{let r=fc(h,n).tangent,i=-r.z,a=r.x,o=Q.tunnelRoofHeight-sc(e,t.x,t.z);for(let n=0;n<=24;n++){let s=n/24*Math.PI,c=Math.cos(s)*Q.tunnelArchRadius,l=Is.railY+Q.tunnelArchSpring+Math.sin(s)*Q.tunnelArchRadius,d=ft(u,t.x,t.z,Math.atan2(r.x,r.z)),f=u.surface?Ue(u,t.x,t.z,-Math.cos(d)*c,Math.sin(d)*c):{x:t.x+i*c,z:t.z+a*c},p=sc(e,f.x,f.z);o=Math.max(o,l+Q.tunnelRockCover-p)}return o});for(let r of n){let n=t.find(e=>e.start<=r.start+Ls&&e.end>=r.end-Ls);h.tunnels.push({...r,mountainId:e.id,cutStart:n?.start??r.start,cutEnd:n?.end??r.end,cutEntry:n?.entry??r.entry,cutExit:n?.exit??r.exit})}}h.tunnels.sort((e,t)=>e.start-t.start),h.cuts.sort((e,t)=>e.start-t.start),h.stops=[{cityId:r.id,distance:Math.min(Q.stationEndDistance,h.length*.25)},{cityId:i.id,distance:h.length-Math.min(Q.stationEndDistance,h.length*.25)}],u.lines.push(h)}if(hc(new Set(u.lines.map(e=>e.id)).size===u.lines.length,`line IDs must be unique`),Oc(u),Ac(u),u.biomes??=Un(u,e.biomes),u.gameplay&&(u.gameplay.reservations=(u.gameplay.reservations??[]).filter(e=>!e.id?.startsWith(`bot:`))),u.gameplay?.farmVillageCount){u.gameplay.reservations=(u.gameplay.reservations??[]).filter(e=>!e.id?.startsWith(`farm-village:`));let e=Mn(u,{count:u.gameplay.farmVillageCount});u.gameplay.farmVillages=e,u.gameplay.reservations.push(...e.reservations)}return u.gameplay&&Object.hasOwn(u.gameplay,`playerBotCount`)&&(u.gameplay.playerBots=ys(u,{count:u.gameplay.playerBotCount}),u.gameplay.reservations.push(...bs(u.gameplay.playerBots)),delete u.gameplay.botScenery),xc(u),u.placements=[],t.detail!==`network`&&(Cc(u),wc(u,r,u.density),u.gameplay&&u.placements.push(...structuredClone(u.gameplay.guaranteedTrees??[]))),u}function Mc(e,{x:t=0,z:n=0,size:r=192}={}){hc([t,n,r].every(Number.isFinite)&&r>0,`region requires finite coordinates and positive size`);let i=Math.floor(t/r),a=Math.floor(n/r),o=`${r}:${i}:${a}`,s={minX:i*r,minZ:a*r,maxX:(i+1)*r,maxZ:(a+1)*r},c=e=>e.x>=s.minX&&e.x<s.maxX&&e.z>=s.minZ&&e.z<s.maxZ,l=e.cities.map(e=>({...e,stationIds:[...e.stationIds],development:{...e.development,placedBuildings:0,streetCount:0,placedFeatures:[]}})),u=l.filter(c),d={...e,cities:l,placements:[],cityStreets:[],detailRegion:s};Cc(d,u),wc(d,Us(`${e.seed}:region:${o}`),e.density??1),e.gameplay&&d.placements.push(...structuredClone((e.gameplay.guaranteedTrees??[]).filter(c)));let f=e.mountains.filter(e=>e.range?_n(s,e.range.bounds):c(e)).map(e=>e.range?{...e,renderBounds:s}:e),p=e.stations.filter(c),m=e.lines.filter(e=>_n(s,Ys(e).box)),h=d.placements.filter(e=>e.kind===`farm`&&e.id?.startsWith(`farm-village:`)),g=Math.max(f.some(e=>e.range)?1.2:0,...u.map(t=>Qs(e,t)),...f.filter(e=>!e.range).map(e=>e.radius),...p.map(t=>Qs(e,t)),...h.map(e=>e.radius));return{key:o,bounds:s,cullBounds:{minX:s.minX-g,minZ:s.minZ-g,maxX:s.maxX+g,maxZ:s.maxZ+g},cities:u,placements:d.placements,cityStreets:d.cityStreets,stations:p,lines:m,mountains:f,farmland:d.farmland}}function Nc(e){let t=[],n=(t,n)=>tt(e,t,n),r=(e,n,r)=>t.push({type:e,id:n,detail:r});try{vt(e.surface)}catch(e){return r(`surface`,`world`,e.message),t}let i=new Set((e.players??[]).map(e=>e.id));try{un(e.players??[])}catch(e){r(`players`,`world`,e.message)}for(let t of e.cities)i.has(t.ownerId)||r(`city-owner`,t.id,`City references an unknown player`),(!Number.isInteger(t.level)||t.level<1||t.level>10)&&r(`city-level`,t.id,`City level must be an integer from 1 through 10`);for(let[t,n]of Object.entries(e.trainOwners??{}))i.has(n)||r(`train-owner`,t,`Train references an unknown player`);for(let t of e.lines)i.has(t.ownerId)||r(`line-owner`,t.id,`Railway references an unknown player`);let a=[`farmland`,`forest`,`plains`,`desert`];for(let t of e.cityStreets??[]){let i=e.cities.find(e=>e.id===t.cityId);if(i&&t.ownerId===i.ownerId||r(`street-owner`,t.id,`Street must belong to its existing city owner`),!Number.isFinite(t.width)||t.width<=0||t.points.length<2||!t.points.every(Hs))r(`street-geometry`,t.id,`Street requires a positive width and finite points`);else for(let o=1;o<t.points.length;o++){let s=t.points[o-1],c=t.points[o],l=Math.max(1,Math.ceil(n(s,c)/.5)),u=t.width/2,d=ke(e,s,c);for(let o=0;o<=l;o++){let c=Ue(e,s.x,s.z,d.x*o/l,d.z*o/l);(!oc(e,c.x,c.z,Qs(e,c,u+Q.worldEdge)-.001)||i&&n(c,i)>i.radius-u+.001)&&r(`street-edge`,t.id,`Street leaves its dry city footprint`),e.biomes&&!$t(e,a,c.x,c.z,Qs(e,c,u)-.001)&&r(`street-biome`,t.id,`Street enters ocean, shore, or mountain`),nc(e,c.x,c.z,u+Q.track)<u+Q.track-.001&&r(`street-track`,t.id,`Street enters railway clearance`),zn(e,c.x,c.z)<Qs(e,c,u+Q.riverBank)-.001&&r(`street-water`,t.id,`Street enters river bank`),e.mountains.some(t=>dn(t,c.x,c.z)<Qs(e,c,u+Q.mountain)-.001)&&r(`street-mountain`,t.id,`Street crosses a mountain`),e.stations.some(t=>yc(t,c.x,c.z,e)<u-.001)&&r(`street-station`,t.id,`Street overlaps a station`)}}}for(let t of e.cities){let n=(e.cityStreets??[]).filter(e=>e.cityId===t.id);if(!n.length)continue;let i=e=>`${e.x.toFixed(5)},${e.z.toFixed(5)}`,a=new Map;for(let e of n)for(let t=1;t<e.points.length;t++){let n=i(e.points[t-1]),r=i(e.points[t]);a.has(n)||a.set(n,new Set),a.has(r)||a.set(r,new Set),a.get(n).add(r),a.get(r).add(n)}let o=new Set,s=[a.keys().next().value];for(;s.length;){let e=s.pop();o.has(e)||(o.add(e),s.push(...a.get(e)))}o.size!==a.size&&r(`street-connectivity`,t.id,`City street graph is disconnected`)}for(let t of e.lines){if((!Number.isFinite(t.length)||t.length<=0)&&r(`route-length`,t.id,`Route length must be positive`),t.alignment)for(let n of t.alignment.segments)n.type===`arc`&&n.radius<(e.minTurnRadius??Is.minTurnRadius)-1e-6&&r(`route-curvature`,t.id,`Railway bend is tighter than its minimum turning radius`);for(let e=1;e<t.points.length;e++){let i=t.points[e-1],a=t.points[e];Hs(i)&&Hs(a)&&Number.isFinite(a.y)||r(`route-coordinate`,t.id,`Non-finite route point`),Math.abs(a.y-i.y)/(n(i,a)||1)>Q.maximumGrade+Ls&&r(`route-grade`,t.id,`Grade exceeds 12 percent`)}for(let n of[`bridges`,`tunnels`,`cuts`])for(let i of t[n])if((i.start<0||i.end>t.length+Ls||i.end<=i.start)&&r(`structure-interval`,t.id,`Invalid ${n} interval`),n===`tunnels`){let n=e.mountains.find(e=>e.id===i.mountainId);for(let e of[i.entry,i.exit])sc(n,e.x,e.z)<Q.tunnelRoofHeight-.01&&r(`tunnel-cover`,t.id,`Portal lacks roof coverage`)}}for(let t of e.stations){t.ownerId!==e.cities.find(e=>e.id===t.cityId)?.ownerId&&r(`station-owner`,t.id,`Station must belong to its city owner`);for(let n of e.lines)xs(e,t.x,t.z,Qs(e,t,t.radius+Q.trackHalfWidth+.25)).some(e=>_n(e,Ys(n).box))&&bc(t,n,e)<Q.trackHalfWidth+.25-.001&&r(`station-track`,t.id,`Platform overlaps ${n.id}`);(e.surface?zn(e,t.x,t.z)<Qs(e,t,t.radius+Q.riverBank)-.001:Sn(e).some(e=>bc(t,e)<e.width/2+Q.riverBank-.001))&&r(`station-water`,t.id,`Platform enters river bank`)}for(let t=0;t<e.placements.length;t++){let i=e.placements[t],a=i.radius;i.cityId&&i.ownerId!==e.cities.find(e=>e.id===i.cityId)?.ownerId&&r(`asset-owner`,i.id,`City asset must belong to its city owner`);for(let t of e.cityStreets??[])tc(e,t,i.x,i.z,a+t.width/2+Q.street)<a+t.width/2+Q.street-.001&&r(`asset-street`,i.id,`Footprint enters a city street`);e.biomes&&!$t(e,[`farmland`,`forest`,`plains`,`desert`],i.x,i.z,Qs(e,i)-.001)&&r(`asset-biome`,i.id,`Footprint enters ocean, shore, or mountain`),oc(e,i.x,i.z,Qs(e,i,a+Q.worldEdge)-.001)||r(`asset-edge`,i.id,`Footprint crosses island edge`),nc(e,i.x,i.z,a+Q.track)<a+Q.track-.001&&r(`asset-track`,i.id,`Footprint enters railway clearance`),zn(e,i.x,i.z)<Qs(e,i,a+Q.riverBank)-.001&&r(`asset-water`,i.id,`Footprint enters river bank`);for(let t of e.mountains)dn(t,i.x,i.z)<Qs(e,i,a+Q.mountain)-.001&&r(`asset-mountain`,i.id,`Footprint intersects ${t.id}`);for(let t of e.stations)n(i,t)<a+t.radius+Q.objects-.001&&r(`asset-station`,i.id,`Footprint intersects ${t.id}`);for(let o=0;o<t;o++)n(i,e.placements[o])<a+e.placements[o].radius+Q.objects-.001&&(i.kind!==`farm`||e.placements[o].kind!==`farm`||tn(e,i,e.placements[o],Q.objects-.001))&&r(`asset-overlap`,i.id,`Footprint intersects ${e.placements[o].id}`)}return t}function Pc(e){let{l:t=.64,c:n=.14,h:r=22}=e?.color??{},i=(e,t)=>Ut(e,t,r);return{body:i(m.clamp(t,.48,.72),Math.min(n,.17)),light:i(.83,Math.min(n*.44,.075)),dark:i(.38,Math.min(n*.65,.09)),roof:i(m.clamp(t-.08,.43,.65),Math.min(n*.95,.16)),accent:i(m.clamp(t+.06,.57,.77),Math.min(n*1.08,.18)),trim:i(.94,Math.min(n*.13,.02))}}function Fc(e){return Object.fromEntries(Object.entries(Pc(e)).map(([t,n])=>[t,qt(new y({name:`player-${e?.id??`neutral`}-${t}`,color:n,roughness:1,metalness:0,flatShading:!0}))]))}function Ic(e,t){let{vertices:n,surfaceTriangles:r}=pn(e),i=[];for(let e of r){let r=e.map(e=>n[e]),a=[],o=r.map(e=>e.y-t(e.x,e.z));for(let e=0;e<3;e++){let t=r[e],n=r[(e+1)%3],i=o[e],s=o[(e+1)%3];if(i>=0&&a.push([t.x,t.z]),i>=0!=s>=0){let e=i/(i-s);a.push([t.x+(n.x-t.x)*e,t.z+(n.z-t.z)*e])}}if(a.length>=3){let e=a.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6]);i.push([[...e,e[0]]])}}return i.length?Wn.union(...i):[]}function Lc(e,t){return Ic(e,()=>e.height*t)}function Rc(e){return{low:Lc(e,.12),high:Lc(e,.62),snow:e.range?Ic(e,(t,n)=>rn(e,t,n)):e.height>8?Lc(e,.84):[]}}function zc(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of e[0])t=Math.min(t,a),n=Math.min(n,o),r=Math.max(r,a),i=Math.max(i,o);return{minX:t,minZ:n,maxX:r,maxZ:i}}function Bc(e,t){let n=e.biomes.land,r=t.water,i=e.biomes.ocean??[],a=i.length&&t.banks.length?Wn.difference(t.banks,i):t.banks,o=[...e.biomes.oceanShore??[],...a],s=new vn([...r,...t.banks],zc),c=e=>e.flatMap(e=>{let t=s.query(zc(e));return t.length?Wn.difference([e],t):[e]});return{land:n,shores:o,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Rc(e);return{id:e.id,low:c(t.low),high:c(t.high),snow:c(t.snow)}}),colorField:{seed:e.seed,sites:e.biomes.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes.shoreWidth}}}function Vc(e){let t=[[e.outline]],n=bn(e);if(e.surface?.complete&&e.biomes?.land)return Bc(e,n);let r=n.water,i=e.biomes?.ocean??[],a=i.length?Wn.union(r,i):r,o=Wn.difference(n.banks,a),s=e.biomes?.oceanShore?.length?Wn.union(o,e.biomes.oceanShore):o,c=Wn.difference(t,a,s);return{land:c,shores:s,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Rc(e);return{id:e.id,low:Wn.intersection(t.low,c),high:Wn.intersection(t.high,c),snow:Wn.intersection(t.snow,c)}}),colorField:{seed:e.seed,sites:e.biomes?.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes?.shoreWidth}}}var Hc=new WeakMap,Uc=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e));function Wc(e,t){let n=Math.imul(e,374761393)^Math.imul(t,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function Gc(e,t,n=24){e/=n,t/=n;let r=Math.floor(e),i=Math.floor(t),a=Uc(e-r),o=Uc(t-i),s=Wc(r,i)*(1-a)+Wc(r+1,i)*a,c=Wc(r,i+1)*(1-a)+Wc(r+1,i+1)*a;return s*(1-o)+c*o}function Kc(e){let t=e.terrainSource??e,n=t.biomes?.sites??t.sites;if(!n?.length)return null;if(!Hc.has(n)||Hc.get(n).seed!==t.seed){if(t.surface?.complete){let e={seed:t.seed,globe:Xt(t,n)};return Hc.set(n,e),e}let e=Math.hypot(t.bounds?.width??130,t.bounds?.depth??95),r=Math.min(22,Math.max(4.5,e*.011)),i={farmland:X.grass.clone().lerp(X.farmland,.43),forest:X.grass.clone().lerp(X.forestFloor,.78),plains:X.grass.clone(),desert:X.desert.clone()};Hc.set(n,{seed:t.seed,sites:n.map(e=>({...e,color:e.ice?X.snow:i[e.type]??X.grass})),width:r,period:t.surface?.complete?t.bounds.width:0,distances:new Float64Array(n.length)})}return Hc.get(n)}var qc={};function Jc(e,t,n,{map:r=!1,target:i=new v}={}){let a=Kc(e);if(!a)return i.copy(X.grass);if(a.globe)return Kt(a.globe,t,n,i);let{sites:o,width:s,distances:c,period:l}=a,u=(e,t,n)=>{if(!l)return Gc(e,t,n);let r=((e+l/2)%l+l)%l,i=Uc(r/l);return Gc(r,t,n)*(1-i)+Gc(r-l,t,n)*i},d=t+(u(t+171,n-87,45)-.5)*s*.85,f=n+(u(t-73,n+119,39)-.5)*s*.85,p=1/0,m=0,h=0,g=0,_=0,y=0;for(let e=0;e<o.length;e++){let t=l?((d-o[e].x+l/2)%l+l)%l-l/2:d-o[e].x;c[e]=Math.hypot(t,f-o[e].z),p=Math.min(p,c[e])}i.setRGB(0,0,0);for(let e=0;e<o.length;e++){let t=Uc(1-(c[e]-p)/s),n=o[e].color,r=o[e];i.r+=n.r*t,i.g+=n.g*t,i.b+=n.b*t,m+=t,r.ice?_+=t:r.type===`forest`?h+=t:r.type===`desert`?g+=t:r.type===`plains`&&(y+=t)}i.multiplyScalar(1/m),Ht(e.terrainSource??e,t,n,qc),Jt(i,qc,h/m,g/m,_/m,y/m);let b=(u(t,n,29)-.5)*.09+(u(t+243,n-192,91)-.5)*.07;return i.multiplyScalar(1+b*(r?.42:1)),r&&i.lerp(X.trim,.09),i}function Yc(e,t,{map:n=!1,maxEdge:r=n?24:8}={}){if(!Number.isFinite(r)||r<=0)throw TypeError(`Terrain color edge spacing must be positive and finite`);let i=e.attributes.position,a=e.index,o=[],s=[],c=new v,l=[],u=r*r,d=!n&&t.terrainChunk?t.bounds:null,f=new Map,p=new v,m=d?[[0,d.minX,2],[0,d.maxX,2],[2,d.minZ,0],[2,d.maxZ,0]]:[],h=d?Math.max(1e-6,...m.map(([,e])=>Math.abs(e)*1e-7)):0;function g(e,n,r){let i=`${e}:${n}:${r}`;if(!f.has(i)){let a=e===0?n:r,o=e===2?n:r;f.set(i,Jc(t,a,o))}return f.get(i)}function _(e){for(let[t,n,r]of m)if(Math.abs(e[t]-n)<=h){let i=Math.floor(e[r]/2)*2,a=(e[r]-i)/2;return c.copy(g(t,n,i)),p.copy(g(t,n,i+2)),c.lerp(p,a)}return Jc(t,e[0],e[2],{map:n,target:c})}function y(e){for(let t=0;t<3;t++){let n=e[t],r=e[(t+1)%3];for(let[e,i,a]of m){if(Math.abs(n[e]-i)>h||Math.abs(r[e]-i)>h)continue;let o=Math.min(n[a],r[a]),s=Math.max(n[a],r[a]),c=Math.ceil((o+h)/2)*2,l=Math.floor((s-h)/2)*2;if(c>l)continue;let u=Math.max(c,Math.min(l,Math.round((o+s)/2/2)*2)),d=(u-n[a])/(r[a]-n[a]),f=n.map((e,t)=>e+(r[t]-e)*d);return f[a]=u,{j:t,m:f}}}return null}let b=[new v,new v,new v],x=new v;function S(e){e.forEach((e,n)=>Jc(t,e[0],e[2],{map:!0,target:b[n]}));for(let n of[[.5,.5,0],[0,.5,.5],[.5,0,.5],[1/3,1/3,1/3]]){let r=0,i=0,a=0,o=0,s=0;for(let t=0;t<3;t++){let c=n[t];r+=e[t][0]*c,i+=e[t][2]*c,a+=b[t].r*c,o+=b[t].g*c,s+=b[t].b*c}if(Jc(t,r,i,{map:!0,target:x}),Math.max(Math.abs(x.r-a),Math.abs(x.g-o),Math.abs(x.b-s))>.004)return!1}return!0}let C=e=>[i.getX(e),i.getY(e),i.getZ(e)],w=a?.count??i.count;for(let e=0;e<w;e+=3)for(l.push([C(a?a.getX(e):e),C(a?a.getX(e+1):e+1),C(a?a.getX(e+2):e+2)]);l.length;){let e=l.pop(),t=-1,i=u;for(let n=0;n<3;n++){let r=e[n],a=e[(n+1)%3],o=(r[0]-a[0])**2+(r[2]-a[2])**2;o>i&&(i=o,t=n)}if(t>=0&&n&&i<=(r*8)**2&&S(e)&&(t=-1),t>=0){let n=e[t],r=e[(t+1)%3],i=e[(t+2)%3],a=n.map((e,t)=>(e+r[t])/2);l.push([n,a,i],[a,r,i]);continue}let a=y(e);if(a){let{j:t,m:n}=a,r=e[t],i=e[(t+1)%3],o=e[(t+2)%3];l.push([r,n,o],[n,i,o])}else for(let t of e)o.push(...t),_(t),s.push(c.r,c.g,c.b)}let T=new Qe;return T.setAttribute(`position`,new Le(o,3)),T.setAttribute(`color`,new Le(s,3)),T.computeVertexNormals(),T}function Xc(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);let n=Object.keys(e.attributes),r=n.map(t=>e.attributes[t]);if(r.some(e=>e.isInterleavedBufferAttribute))throw TypeError(`Surface tessellation needs ordinary buffer attributes`);let i=e.attributes.position;if(!i||i.itemSize!==3)throw TypeError(`Surface tessellation needs three-dimensional positions`);let a=[],o=[],s=0;for(let e of r)a.push(s),o.push(e.itemSize),s+=e.itemSize;let c=a[n.indexOf(`position`)],l=r.map(()=>[]),u=t*t*(1+1e-12),d=e=>{let t=new Float64Array(s);for(let n=0;n<r.length;n++)for(let i=0;i<o[n];i++)t[a[n]+i]=r[n].array[e*o[n]+i];return t},f=(e,t)=>{let n=new Float64Array(s);for(let r=0;r<s;r++)n[r]=(e[r]+t[r])*.5;return n},p=(e,t)=>{let n=e[c]-t[c],r=e[c+2]-t[c+2];return n*n+r*r>u},m=e=>{for(let t=0;t<r.length;t++)for(let n=0;n<o[t];n++)l[t].push(e[a[t]+n])},h=e.index?.array,g=h?.length??i.count,_=[];for(let e=0;e<g;e+=3)for(_.push([d(h?h[e]:e),d(h?h[e+1]:e+1),d(h?h[e+2]:e+2)]);_.length;){let[e,t,n]=_.pop(),r=p(e,t),i=p(t,n),a=p(n,e),o=!!r|(i?2:0)|(a?4:0);if(!o){m(e),m(t),m(n);continue}let s=r?f(e,t):null,c=i?f(t,n):null,l=a?f(n,e):null;o===7?_.push([e,s,l],[s,t,c],[l,c,n],[s,c,l]):o===1?_.push([e,s,n],[s,t,n]):o===2?_.push([e,t,c],[e,c,n]):o===4?_.push([e,t,l],[t,n,l]):o===3?_.push([e,s,n],[s,c,n],[s,t,c]):o===5?_.push([e,s,l],[s,t,n],[s,n,l]):_.push([e,t,c],[e,c,l],[l,c,n])}let v=new Qe;for(let e=0;e<r.length;e++)v.setAttribute(n[e],new Le(l[e],o[e],r[e].normalized));return v}function Zc(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);if(!e.length)return[];let n=[],r=e[0],i=e.at(-1),a=r[0]===i[0]&&r[1]===i[1];for(let r=0;r<e.length-+!!a;r++){let i=e[r],a=e[(r+1)%e.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=2**Math.max(0,Math.ceil(Math.log2(o/t)));for(let e=0;e<s;e++)n.push([i[0]+(a[0]-i[0])*e/s,i[1]+(a[1]-i[1])*e/s])}return a&&n.push([...r]),n}function Qc(e){if(e.index)throw TypeError(`Exact indexing requires non-indexed geometry`);if(Object.keys(e.morphAttributes).length)throw TypeError(`Exact indexing does not support morph attributes`);let t=Object.keys(e.attributes),n=t.map(t=>e.attributes[t]),r=e.attributes.position?.count??0;for(let e of n)if(e.isInterleavedBufferAttribute||!(e.array instanceof Float32Array)||e.count!==r||!Number.isInteger(e.itemSize)||e.itemSize<1)throw TypeError(`Exact indexing requires equally sized, non-interleaved Float32 attributes`);let i=n.map(e=>new Uint32Array(e.array.buffer,e.array.byteOffset,e.array.length)),a=new Uint32Array(r),o=new Uint32Array(r),s=1;for(;s<r*2;)s*=2;let c=new Int32Array(s),l=s-1,u=0;for(let e=0;e<r;e++){let t=2166136261;for(let r=0;r<n.length;r++){let a=n[r].itemSize,o=e*a;for(let e=0;e<a;e++)t=Math.imul(t^i[r][o+e],16777619)}t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16;let r=t&l;for(;c[r];){let t=c[r]-1,a=!0;for(let r=0;a&&r<n.length;r++){let o=n[r].itemSize,s=e*o,c=t*o;for(let e=0;e<o;e++)if(i[r][s+e]!==i[r][c+e]){a=!1;break}}if(a)break;r=r+1&l}c[r]?a[e]=a[c[r]-1]:(c[r]=e+1,a[e]=u,o[u++]=e)}let d=new Qe;for(let e=0;e<n.length;e++){let r=n[e],a=r.itemSize,s=new Float32Array(u*a),c=new Uint32Array(s.buffer);for(let t=0;t<u;t++){let n=t*a,r=o[t]*a;for(let t=0;t<a;t++)c[n+t]=i[e][r+t]}let l=new H(s,a,r.normalized);l.name=r.name,l.setUsage(r.usage),l.gpuType=r.gpuType,d.setAttribute(t[e],l)}d.setIndex(new H(u<=65535?new Uint16Array(a):a,1)),d.name=e.name;for(let t of e.groups)d.addGroup(t.start,t.count,t.materialIndex);return d.setDrawRange(e.drawRange.start,e.drawRange.count),d.boundingBox=e.boundingBox?.clone()??null,d.boundingSphere=e.boundingSphere?.clone()??null,d}function $c(e){return Object.values(e.attributes).reduce((e,t)=>e+t.array.byteLength,0)+(e.index?.array.byteLength??0)}function el(e,t){let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let[t,o]of e[0]){if(!Number.isFinite(t)||!Number.isFinite(o))throw TypeError(`Map tiles require finite polygon coordinates`);n=Math.min(n,t),i=Math.max(i,t),r=Math.min(r,o),a=Math.max(a,o)}return{left:Math.floor(n/t),right:Math.ceil(i/t),top:Math.floor(r/t),bottom:Math.ceil(a/t)}}var tl=(e,t,n,r,i)=>[[[[e*i,t*i],[n*i,t*i],[n*i,r*i],[e*i,r*i],[e*i,t*i]]]];function nl(e,t=192){if(!(Number.isFinite(t)&&t>0))throw RangeError(`Map tile size must be positive and finite`);if(!Array.isArray(e))throw TypeError(`Map tiles require a MultiPolygon`);let n=[],r=[];for(let n=e.length-1;n>=0;n--){let i=e[n];!Array.isArray(i)||!Array.isArray(i[0])||i[0].length<3||r.push({polygon:i,...el(i,t)})}for(;r.length;){let{polygon:e,left:i,right:a,top:o,bottom:s}=r.pop();if(a<=i||s<=o)continue;if(a-i<=1&&s-o<=1){n.push(e);continue}let c=a-i>=s-o,l=Math.floor(c?(i+a)/2:(o+s)/2),u=c?[{left:i,right:l,top:o,bottom:s},{left:l,right:a,top:o,bottom:s}]:[{left:i,right:a,top:o,bottom:l},{left:i,right:a,top:l,bottom:s}];for(let n=u.length-1;n>=0;n--){let i=u[n],a=Wn.intersection([e],tl(i.left,i.top,i.right,i.bottom,t));for(let e=a.length-1;e>=0;e--){let n=a[e],o=el(n,t);r.push({polygon:n,left:Math.max(i.left,o.left),right:Math.min(i.right,o.right),top:Math.max(i.top,o.top),bottom:Math.min(i.bottom,o.bottom)})}}}return n}var rl=new WeakMap,il=new Y,al={},ol=Ut(.57,.092,235),sl=Ut(.615,.091,224),cl=Ut(.72,.082,202),ll=Ut(.64,.055,219),ul=Ut(.75,.045,207),dl=X.sand.clone().lerp(X.oceanLight,.32).multiplyScalar(.94),fl=X.rockLight.clone().lerp(X.oceanLight,.25).multiplyScalar(.87),pl=X.snow.clone().lerp(X.oceanLight,.26),ml={},hl=new v,gl=new v,_l=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e)),vl=(e,t,n)=>{let r=0,i=0;for(let a=0;a<e.length;a++){let o=n[a]-t[a];r+=(e[a]-t[a])*o,i+=o*o}let a=Math.max(0,Math.min(1,r/(i||1))),o=0;for(let r=0;r<e.length;r++)o+=(e[r]-t[r]-(n[r]-t[r])*a)**2;return o};function yl(e){if(!e.length)return null;let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let{a:r,b:i}of e)for(let e=0;e<3;e++)t[e]=Math.min(t[e],r[e],i[e]),n[e]=Math.max(n[e],r[e],i[e]);if(e.length<=8)return{min:t,max:n,items:e};let r=0;for(let e=1;e<3;e++)n[e]-t[e]>n[r]-t[r]&&(r=e);e.sort((e,t)=>e.a[r]+e.b[r]-(t.a[r]+t.b[r]));let i=e.length>>1;return{min:t,max:n,left:yl(e.slice(0,i)),right:yl(e.slice(i))}}function bl(e,t,n){let r=n*n,i=e=>e.min.reduce((n,r,i)=>n+Math.max(r-t[i],0,t[i]-e.max[i])**2,0),a=e=>{if(!(!e||i(e)>r)){if(e.items)for(let n of e.items)r=Math.min(r,vl(t,n.a,n.b));else i(e.left)<i(e.right)?(a(e.left),a(e.right)):(a(e.right),a(e.left))}};return a(e),Math.sqrt(r)}function xl(e){let t=e.terrainSource??e,n=t.biomes?.ocean??t.ocean;if(!n?.length)return null;let r=rl.get(n);if(r)return r;let i=t.surface?.complete,a=i?t.bounds?.width??2*Math.PI*t.surface.radius:0,o=[],s=[],c=new Y,l=new Y;for(let e of n)for(let n of e)for(let e=0;e<n.length;e++){let r=n[e],u=n[(e+1)%n.length];r[0]===u[0]&&r[1]===u[1]||i&&(Math.abs(Math.abs(r[0])-a/2)<.002&&Math.abs(r[0]-u[0])<.002||Math.abs(Math.abs(r[1])-a/4)<.002&&Math.abs(r[1]-u[1])<.002)||(o.push({a:r,b:u,minX:Math.min(r[0],u[0]),maxX:Math.max(r[0],u[0]),minZ:Math.min(r[1],u[1]),maxZ:Math.max(r[1],u[1])}),i&&(rt(t,...r,c).multiplyScalar(t.surface.radius),rt(t,...u,l).multiplyScalar(t.surface.radius),s.push({a:c.toArray(),b:l.toArray()})))}return r={source:t,period:a,edges:new vn(o),sphere:yl(s)},rl.set(n,r),r}function Sl(e,t,n,r=1/0){let i=xl(e);if(!i)return r;let a=i.period?[0,-i.period,i.period]:[0],o=r;for(let e of a)o=i.edges.nearest(t+e,n,r=>Math.sqrt(vl([t+e,n],r.a,r.b)),o);return o}function Cl(e,t,n,r=new v){let i=e.terrainSource??e;if(!i.surface?.complete)return r.copy(X.ocean);rt(i,t,n,il),Re(i,t,n,al);let{x:a,y:o,z:s}=il,c=Math.abs(al.latitude)/90,l=(Math.sin(a*5.1+o*2.3-s*3.7)+Math.sin(o*6.3+s*4.2+a*1.7))*.25+.5;r.copy(ol).lerp(sl,.38+.42*l-.15*c);let u=_l((c-.5)/.43);r.lerp(ll,u*.26);let d=xl(i),f=(24+18*l)*(1-u*.32),p=d?.sphere?bl(d.sphere,[a*i.surface.radius,o*i.surface.radius,s*i.surface.radius],f*2):f*2,m=Math.exp(-((p/f)**2))*(.64-.16*c);return gl.copy(cl).lerp(ul,u*.72),r.lerp(gl,m)}function wl(e,t,n,{map:r=!1,target:i=new v}={}){let a=e.terrainSource??e,o=a.biomes?.shoreWidth??a.shoreWidth??.9,s=Sl(a,t,n,o*2);if(s>=o*1.5)return i.copy(X.sand);let c=_l(s/o);Jc(a,t,n,{map:r,target:i}),Ht(a,t,n,ml);let l=_l((ml.patch-.3)/.5)*.58,u=a.surface?.complete?_l((Math.abs(ml.latitude)-61)/18):0;return hl.copy(dl).lerp(fl,l).lerp(pl,u*.8),i.lerp(hl,1-c)}function Tl(e,t,n){let r=t.surface.projection?.radius??t.surface.radius,i=2*Math.PI*r,a=[];for(let t of e)for(let e of t)for(let t=0;t<e.length;t++){let n=e[t],r=e[(t+1)%e.length],o=r[0]-n[0],s=r[1]-n[1];o===0&&s===0||Math.abs(Math.abs(n[0])-i/2)<.002&&Math.abs(o)<.002||Math.abs(Math.abs(n[1])-i/4)<.002&&Math.abs(s)<.002||a.push({a:n,b:r,dx:o,dz:s,length2:o*o+s*s,minX:Math.min(n[0],r[0]),maxX:Math.max(n[0],r[0]),minZ:Math.min(n[1],r[1]),maxZ:Math.max(n[1],r[1])})}let o=new vn(a);return(e,t,r)=>{let a=48;for(let n of[0,-i,i]){let r=e+n;a=o.nearest(r,t,e=>{let n=Math.max(0,Math.min(1,((r-e.a[0])*e.dx+(t-e.a[1])*e.dz)/e.length2));return Math.hypot(r-e.a[0]-n*e.dx,t-e.a[1]-n*e.dz)},a)}let s=Math.max(0,Math.min(1,a/48)),c=s*s*(3-2*s);return Jc(n,e,t,{map:!0,target:r}),r.multiplyScalar(1-.07*c).lerp(X.forestFloor,.18*c).lerp(X.mountainFloor,.08*c)}}function El(e,t=e){let n=t.surface?.type===`sphere`,r=t.surface?.complete,i=new Map;function a(a,o,s,c=!1,l=null){for(let u of r?nl(a,128):a){let a=n?u.map(e=>Zc(e,8)):u,d=new k(a[0].map(([e,t])=>new it(e,-t)));for(let e of a.slice(1))d.holes.push(new w(e.map(([e,t])=>new it(e,-t))));let f=new K(d);if(f.rotateX(-Math.PI/2),f.translate(0,o,0),c&&!r){let t=f;f=Yc(t,e.colorField,{map:!0}),t.dispose()}if(n){for(let e of Object.keys(f.attributes))e!==`position`&&e!==`color`&&f.deleteAttribute(e);let t=f;if(f=Xc(t,r&&s===`terrain`?32:16),t.dispose(),r){let t=f;if(f=Qc(t),t.dispose(),c){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new v;for(let i=0;i<t.count;i++)Jc(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),n[i*3]=r.r,n[i*3+1]=r.g,n[i*3+2]=r.b;f.setAttribute(`color`,new H(n,3))}}}if(s===`sand`||l){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new v;for(let i=0;i<t.count;i++)l?l(t.getX(i),t.getZ(i),r):wl(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),r.toArray(n,i*3);f.setAttribute(`color`,new H(n,3))}n&&(f.scale(1,16,1),It(f,t));let p=f.index&&!r?f.toNonIndexed():f;i.has(s)||i.set(s,[]),i.get(s).push({position:p.attributes.position.array,vertexColor:p.attributes.color?.array,index:r?p.index?.array:void 0}),p!==f&&f.dispose(),p.dispose()}}a(e.land,0,`terrain`,!0),a(e.shores,.003,`sand`),a(e.river,.006,`waterLight`),t.surface?.complete||a(e.ocean,n?.01:.007,`ocean`);for(let n of e.mountains)a(n.low,.02,`contour0`,!1,r?Tl(n.low,t,e.colorField):null),a(n.high,.023,`contour1`),a(n.snow,.033,`snow`);return[...i].map(([e,t])=>{let i=new Float32Array(t.reduce((e,t)=>e+t.position.length,0)),a=t[0].vertexColor?new Float32Array(i.length):void 0,o=0;for(let e of t)i.set(e.position,o),a?.set(e.vertexColor,o),o+=e.position.length;if(r){let n=new Uint32Array(t.reduce((e,t)=>e+t.index.length,0)),r=0,o=0;for(let e of t){for(let t of e.index)n[r++]=o+t;o+=e.position.length/3}return{color:e,position:i,index:n,...a?{vertexColor:a}:{}}}if(n){let t=new Qe;t.setAttribute(`position`,new H(i,3)),a&&t.setAttribute(`color`,new H(a,3));let n=Qc(t);if($c(n)<$c(t)){let r={color:e,position:n.attributes.position.array,index:n.index.array,...a?{vertexColor:n.attributes.color.array}:{}};return t.dispose(),n.dispose(),r}t.dispose(),n.dispose()}return{color:e,position:i,...a?{vertexColor:a}:{}}})}function Dl(e,t){return e.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t},e.vertexShader=`uniform float mapSurfaceRadius; varying float globeLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
      vec3 viewNormal=mat3(viewMatrix)*radialNormal;
      globeLight=0.44+0.62*max(0.0,dot(viewNormal,normalize(vec3(-0.48,0.58,0.92))));`),e.fragmentShader=`varying float globeLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= globeLight;
 outgoingLight *= mix(vec3(0.91,0.97,1.05), vec3(1.04,1.01,0.93), smoothstep(0.50,1.0,globeLight));
#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`complete-globe-light-v2`,e}var Ol={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`},kl={grass:X.grass.clone().lerp(X.trim,.1),farmland:X.farmland.clone().lerp(X.trim,.08),forestFloor:X.forestFloor.clone().lerp(X.grass,.27),desert:X.desert.clone(),mountainFloor:X.mountainFloor.clone().lerp(X.grass,.25),contour0:X.forestFloor.clone().lerp(X.grass,.32),contour1:X.rockLight.clone().lerp(X.grass,.2),ink:X.window.clone().lerp(X.rail,.18),paper:X.trim.clone()};function Al(e){let t=new k(e[0].map(([e,t])=>new it(e,-t)));e.slice(1).forEach(e=>t.holes.push(new w(e.map(([e,t])=>new it(e,-t)))));let n=new K(t);return n.rotateX(-Math.PI/2),n}function jl(e,t){let n=e/2,r=(t-e)/2,i=new k;i.moveTo(-n,-r),i.lineTo(-n,r),i.absarc(0,r,n,Math.PI,0,!0),i.lineTo(n,-r),i.absarc(0,-r,n,0,-Math.PI,!0),i.closePath();let a=new K(i,2);return a.rotateX(-Math.PI/2),a}function Ml(e,t,n,r=1,i=1){let a=m.clamp(Math.round(Number(e.level)||1),1,10),s=(1.75+a*.12)*r,c=a<=3?[[-.61,.48],[.61,.48],[.61,-.1],[0,-.68],[-.61,-.1]]:a<=6?[[-.75,.48],[.75,.48],[.75,-.07],[.43,-.07],[.43,-.34],[0,-.68],[-.43,-.34],[-.43,-.07],[-.75,-.07]]:[[-.73,.48],[.73,.48],[.73,-.07],[.39,-.07],[.39,-.4],[.18,-.4],[.18,-.74],[-.18,-.74],[-.18,-.4],[-.39,-.4],[-.39,-.07],[-.73,-.07]],l=t?Pc(t):{body:X.roof,trim:X.trim},u=(e,t,n)=>{let r=Al([e]),a=r.toNonIndexed();r.dispose(),a.translate(0,n*i,0);let o=new Float32Array(a.attributes.position.count*3);for(let e=0;e<o.length;e+=3)o[e]=t.r,o[e+1]=t.g,o[e+2]=t.b;return a.setAttribute(`color`,new H(o,3)),a},d=(e,t,n)=>u(Array.from({length:12},(t,n)=>[Math.cos(n*Math.PI/6)*s*e,Math.sin(n*Math.PI/6)*s*e]),t,n),f=d(1,kl.ink,.091),p=d(.89,l.trim,.094),h=u(c.map(([e,t])=>[e*s,t*s]),l.body,.097),g=$o([f,p,h],!1);f.dispose(),p.dispose(),h.dispose();let _=g.attributes.position.count,v=new Float32Array(_*3);for(let e=0;e<_;e++)l.body.toArray(v,e*3);g.setAttribute(`cityDotColor`,new H(v,3)),g.setAttribute(`cityCompactScale`,new H(new Float32Array(_).fill(Io/(2*Lo(a))),1));let y=new o(g,n);return y.name=`map-city-${e.id}`,y.position.set(e.x,0,e.z),y.userData={cityId:e.id,ownerId:e.ownerId??null,level:a},y}function Nl(e,t){let n=t.surface?.type===`sphere`,r=n?16:1,i=new dt;i.name=`map-world`,e.add(i);let a=new dt;a.name=`map-static`,i.add(a);let s=new dt;s.name=`map-cities`,i.add(s);let c=new dt;c.name=`map-trains`,i.add(c);let l=new Map((t.players??[]).map(e=>[e.id,e])),u=new Map([...l].map(([e,t])=>[`player:${e}:body`,Pc(t).body])),d=e=>l.has(e.state?.ownerId)?`player:${e.state.ownerId}:body`:Ol[e.state?.color]??e.state?.color??`redLight`,f=m.clamp(Math.sqrt((t.bounds?.width??130)*(t.bounds?.depth??95)/12350),1,2.6),p=new Map,h=new Map,g=new Set,_=[],v=[],y=[],b=new Y,x=new Y,S=new Y,C=new Y,w=new Y,T=new Y,E=(e,n)=>(Me(t,e.x,e.z,n),n.setPosition(Be(t,e.x,0,e.z,b)),n),D={cityBatches:0,trainBatches:0,updatedCars:0,staticVertices:0,farTrains:!1,declutterPasses:0,cityAttributeUpdates:0,networkVisibility:1},O={value:1},k={value:1},A={value:1},j=!1,M=(e,r=!1)=>{p.has(e)||p.set(e,new Ze({name:`map-${e}`,color:r||e===`terrain`?16777215:u.get(e)??kl[e.replace(`route-`,``)]??X[e]??X.trim,vertexColors:r||e===`terrain`,side:2,toneMapped:!1}));let i=p.get(e);if(e.startsWith(`route-`)&&!i.userData.routeShader&&(i.userData.routeShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapRouteScale=O,e.vertexShader=`attribute vec3 routeOffset; uniform float mapRouteScale;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position) + routeOffset * (mapRouteScale - 1.0);`)},i.customProgramCacheKey=()=>`map-route-width`),n&&[`terrain`,`sand`,`waterLight`,`ocean`,`contour0`,`contour1`,`snow`].includes(e)&&!i.userData.surfaceShader&&(i.userData.surfaceShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t.surface.radius},e.vertexShader=`uniform float mapSurfaceRadius; varying float surfaceLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
          vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
          surfaceLight=0.52+0.52*max(0.0,dot(radialNormal,normalize(vec3(-0.45,0.82,0.35))));`),e.fragmentShader=`varying float surfaceLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= surfaceLight;
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>`map-surface-light`,t.surface.complete&&Dl(i,t.surface.radius)),!i.userData.mapStyle){i.userData.mapStyle=!0;let t=e.startsWith(`route-`)||e===`paper`||e.startsWith(`player:`)||Object.values(Ol).includes(e);qt(i,{kind:t?`map-symbol`:[`ocean`,`waterLight`].includes(e)?`water`:`map`,role:e.endsWith(`paper`)?`paper`:e.endsWith(`ink`)?`ink`:`owner`}),t&&zo(i,A)}return i},N=(e,t,n=0,r=0,i=0,a=0)=>{e.rotateY(a),e.translate(r,n,i);let o=e.index?e.toNonIndexed():e;o!==e&&e.dispose();for(let e of Object.keys(o.attributes))e!==`position`&&e!==`routeOffset`&&o.deleteAttribute(e);h.has(t)||h.set(t,[]),h.get(t).push(o)},P=(e,i,a,o)=>{let s=[],c=[];for(let o=0;o<e.length-1;o++){let l=e[o],u=e[o+1],d=u.x-l.x,f=u.z-l.z,p=Math.hypot(d,f)||1,m=e=>e.tangent?{x:e.tangent.z,z:-e.tangent.x}:{x:f/p,z:-d/p},h=m(l),g=m(u),_=[{x:l.x-h.x*i/2,z:l.z-h.z*i/2},{x:l.x+h.x*i/2,z:l.z+h.z*i/2},{x:u.x-g.x*i/2,z:u.z-g.z*i/2},{x:u.x+g.x*i/2,z:u.z+g.z*i/2}],v=n?[l,u].flatMap((e,n)=>{let o=n?g:h;return Be(t,e.x,a*r,e.z,S),rt(t,e.x,e.z,C),Ot(t,e.x,a*r,e.z,-o.z,0,o.x,w).normalize(),T.crossVectors(C,w).normalize(),[-1,1].map(e=>(x.copy(S).addScaledVector(T,e*i/2),x.y+=t.surface.radius,x.setLength(t.surface.radius+a*r),x.y-=t.surface.radius,x.clone()))}):null;for(let e of[0,2,1,1,2,3]){let i=e<2?l:u,o=_[e];n?(x.copy(v[e]),Be(t,i.x,a*r,i.z,S),s.push(x.x,x.y,x.z),c.push(x.x-S.x,x.y-S.y,x.z-S.z)):(s.push(o.x,a,o.z),c.push(o.x-i.x,0,o.z-i.z))}}let l=new Qe;l.setAttribute(`position`,new Le(s,3)),l.setAttribute(`routeOffset`,new Le(c,3)),N(l,o)},F=t.mapTerrain??Vc(t);for(let{color:e,position:n,vertexColor:r,index:i}of F.meshes??El(F,t)){let t=new Qe;t.setAttribute(`position`,new H(n,3)),i&&t.setIndex(new H(i,1)),r&&t.setAttribute(`color`,new H(r,3)),h.set(e,[t])}for(let e of t.lines)for(let t of e.renderRanges??[{start:0,end:e.length}]){let r=[t.start];for(let i of e.alignment?.segments??[{startDistance:0,endDistance:e.length,type:`arc`,radius:8}]){let e=Math.max(t.start,i.startDistance),a=Math.min(t.end,i.endDistance);if(a<=e)continue;let o=i.type===`line`?a-e:Math.max(.4,Math.sqrt(8*(i.radius??8)*.025)),s=n?Math.min(8,o):o,c=Math.max(1,Math.ceil((a-e)/s));for(let t=1;t<=c;t++)r.push(e+(a-e)*t/c)}let i=r.map(t=>fc(e,t));P(i,.96,.075,`route-paper`),P(i,.42,.078,`route-ink`)}for(let[e,t]of h){let n=$o(t,!1);g.add(n);let r=new o(n,M(e,!!n.attributes.color));r.name=`map-${e.replace(`route-`,``)}`,a.add(r),e.startsWith(`route-`)&&(r.frustumCulled=!1,y.push(r)),D.staticVertices+=n.attributes.position.count,t.forEach(e=>e.dispose())}h.clear();let I=new Ze({name:`map-city`,vertexColors:!0,side:2,toneMapped:!1});I.onBeforeCompile=e=>{e.uniforms.mapCityScale=k,e.vertexShader=`uniform float mapCityScale; attribute float cityDetail; attribute float cityCompactScale; attribute vec3 cityDotColor;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,`#include <color_vertex>
      #ifdef USE_COLOR
        vColor.xyz=mix(cityDotColor,vColor.xyz,cityDetail);
      #endif`),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`float citySize=mapCityScale*mix(cityCompactScale,1.0,cityDetail); vec3 transformed = vec3(position.x * citySize, position.y, position.z * citySize);`)},I.customProgramCacheKey=()=>`map-city-screen-size-v2`,qt(I,{kind:`map-symbol`,role:`owner`}),zo(I,A),p.set(`city-glyph`,I);let L=(e,r,i=0,a=!1)=>v.push({city:e,attribute:r,index:i,instanced:a,detail:1,target:1,anchor:Be(t,e.x,0,e.z),normal:n?rt(t,e.x,e.z):null});if((t.cities?.length??0)<=32)for(let e of t.cities??[]){let t=Ml(e,l.get(e.ownerId),I,f,r),i=new H(new Float32Array(t.geometry.attributes.position.count).fill(1),1);i.setUsage(be),t.geometry.setAttribute(`cityDetail`,i),L(e,i),n&&(t.matrixAutoUpdate=!1,E(e,t.matrix)),t.frustumCulled=!1,g.add(t.geometry),s.add(t)}else{let e=new Map,n=new et;for(let n of t.cities){let t=`${n.ownerId}:${n.level}`;e.has(t)||e.set(t,[]),e.get(t).push(n)}for(let[t,i]of e){let e=Ml(i[0],l.get(i[0].ownerId),I,f,r),a=new Dt(new Float32Array(i.length).fill(1),1);a.setUsage(be),e.geometry.setAttribute(`cityDetail`,a),g.add(e.geometry);let o=new Pe(e.geometry,I,i.length);o.frustumCulled=!1,o.name=`map-city-batch-${t}`,o.userData.instanceCityIds=i.map(e=>e.id),i.forEach((e,t)=>{E(e,n),o.setMatrixAt(t,n),L(e,a,t,!0)}),o.computeBoundingSphere(),s.add(o),_.push(o)}}D.cityBatches=s.children.length,v.sort((e,t)=>(t.city.level??1)-(e.city.level??1)||String(e.city.id).localeCompare(String(t.city.id)));let R=new Y(1/0,0,0),z=new _t,B=new Y,V=new Y,U=new Y,W=NaN,ee=NaN,te=NaN,ne=1/0;function re(e,t,n,r,a){if(!e?.isOrthographicCamera||!v.length)return;let o=(e.right-e.left)/(e.top-e.bottom),s=n*o;if(ne+=r,(Math.abs(Math.log(t/W))>.015||ee!==n||te!==o||e.position.distanceToSquared(R)>(t*2)**2||e.quaternion.angleTo(z)>.003)&&ne>=.075){i.updateWorldMatrix(!0,!1),e.getWorldDirection(U);let r=Bo(v.map(t=>{B.copy(t.anchor).applyMatrix4(i.matrixWorld).project(e);let r=!t.normal||V.copy(t.normal).transformDirection(i.matrixWorld).dot(U)<-.035;return{id:t.city.id,x:B.x*s/2,y:B.y*n/2,radius:Lo(t.city.level),previous:t.target,visible:r&&Math.abs(B.x)<1+2*Lo(10)/s&&Math.abs(B.y)<1+2*Lo(10)/n&&Math.abs(B.z)<=1}}),t);for(let e of v)e.target=r.get(e.city.id);R.copy(e.position),z.copy(e.quaternion),W=t,ee=n,te=o,ne=0,D.declutterPasses++}let c=a?1:1-Math.exp(-12*Math.min(.1,Math.max(0,r))),l=new Set;for(let e of v){let t=Math.abs(e.detail-e.target)<.002?e.target:e.detail+(e.target-e.detail)*c;t!==e.detail&&(e.detail=t,e.instanced?e.attribute.setX(e.index,t):e.attribute.array.fill(t),l.add(e.attribute))}for(let e of l)e.needsUpdate=!0,D.cityAttributeUpdates++}let ie=Math.min(f,1.8),G=jl(1.22*ie,2.45),ae=jl(.92*ie,2.13);for(let e of[G,ae])g.add(e);let oe=new Y,se=new Y,ce=new _t,le=null,ue=[],de=[],fe=[],pe=[],me=!1,he=new Y,ge=new Y,_e=new Y,ve=new Y,ye={},K={},xe=NaN,Se=NaN,Ce=(e,t,n,r)=>{let i=new Pe(e,M(t),n);return i.name=r,i.frustumCulled=!1,i.instanceMatrix.setUsage(be),c.add(i),i},q=(e,i,a,o,s,c,l,u=1,d=1)=>{let f=e.instanceMatrix.array,p=i*16,m=Math.cos(s)*l,h=Math.sin(s)*l;if(n){(a!==xe||o!==Se)&&(rt(t,a,o,ge),xe=a,Se=o),Be(t,a,c*r,o,he),Ot(t,a,c*r,o,h,0,m,_e).normalize(),ve.crossVectors(ge,_e).normalize();for(let e=0;e<3;e++)f[p+e]=ve.getComponent(e)*l*u,f[p+4+e]=ge.getComponent(e)*l,f[p+8+e]=_e.getComponent(e)*l*d;f[p+12]=he.x,f[p+13]=he.y,f[p+14]=he.z}else f[p]=m*u,f[p+1]=0,f[p+2]=-h*u,f[p+4]=0,f[p+5]=l,f[p+6]=0,f[p+8]=h*d,f[p+9]=0,f[p+10]=m*d,f[p+12]=a,f[p+13]=c,f[p+14]=o;f[p+3]=0,f[p+7]=0,f[p+11]=0,f[p+15]=1};function we(e=[],{visible:r=!0,camera:a,viewportHeight:o=900,poseBuffer:l=e.poseBuffer,dt:u=1/60,reducedMotion:p=!1}={}){if(D.updatedCars=0,j||!r)return;let m=a?.isOrthographicCamera?(a.top-a.bottom)/a.zoom/Math.max(1,o):0,h=Vo(m,f,ie);O.value=h.routeScale,k.value=h.cityScale,A.value=D.networkVisibility=Ro(a?.zoom);let g=A.value>0;s.visible=c.visible=g;for(let e of y)e.visible=g;if(!g)return;re(a,m,o,u,p);let _=h.trainScaleZ>1,v=le!==e||de.length!==e.length||me!==_;me=_,D.farTrains=me;for(let t=0;!v&&t<e.length;t++)v=de[t]!==e[t].state?.ownerId||fe[t]!==e[t].state?.color||pe[t]!==e[t].parts;if(v){c.children.forEach(e=>e.dispose()),c.clear(),ue=[],le=e,de=e.map(e=>e.state?.ownerId),fe=e.map(e=>e.state?.color),pe=e.map(e=>e.parts);let t=e.flatMap(e=>(me?[e.parts[Math.floor(e.parts.length/2)]]:e.parts).filter(Boolean).map(t=>({train:e,part:t}))),n=t.length;if(n){let e=Ce(G,`paper`,n,`map-train-outlines`),r=new Map;for(let{train:e}of t){let t=d(e);r.set(t,(r.get(t)??0)+1)}let i=new Map([...r].map(([e,t])=>[e,{mesh:Ce(ae,e,t,`map-train-${e}`),next:0}]));t.forEach(({train:t,part:n},r)=>{let a=i.get(d(t));ue.push({train:t,part:n,outlineIndex:r,outline:e,body:a.mesh,bodyIndex:a.next++})})}D.trainBatches=c.children.length}i.updateWorldMatrix(!0,!1);let b=me?h.trainScaleX:1,x=me?h.trainScaleZ:1;for(let e of ue){let{train:r,part:a}=e,o,s,c,u;if(l&&a.userData.poseOnly){let e=a.userData.poseIndex*6;o=l[e],s=l[e+2],c=l[e+3],u=+(l[e+4]>0&&r.state?.active!==!1)}else a.userData.poseOnly?(o=a.position.x,s=a.position.z,c=a.rotation.y,u=a.visible&&r.state?.active!==!1?1:0):(a.getWorldPosition(oe),a.getWorldQuaternion(ce),se.set(0,0,1).applyQuaternion(ce).add(oe),i.worldToLocal(oe),i.worldToLocal(se),se.sub(oe),n?(xt(t,oe,ye),xt(t,se.add(oe),K),o=ye.x,s=ye.z,c=Math.atan2(K.x-o,K.z-s)):(o=oe.x,s=oe.z,c=Math.atan2(se.x,se.z)),u=a.visible&&r.state?.active!==!1?1:0);q(e.outline,e.outlineIndex,o,s,c,.12,u,b,x),q(e.body,e.bodyIndex,o,s,c,.123,u,b,x),D.updatedCars++}c.children.forEach(e=>{e.instanceMatrix.needsUpdate=!0})}function Te(){j||(j=!0,c.children.forEach(e=>e.dispose()),_.forEach(e=>e.dispose()),g.forEach(e=>e.dispose()),p.forEach(e=>e.dispose()),i.clear(),i.removeFromParent())}return{root:i,update:we,dispose:Te,stats:D}}var Pl=1.25,Fl=65535,Il=2**-24,Ll=Symbol(`SKIP_GENERATION`),Rl={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Ll]:!1};function zl(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function Bl(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function Vl(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],a=t[e+2*r+1],o=i-a,s=i+a;o<n[r]&&(n[r]=o),s>n[r+3]&&(n[r+3]=s)}}function Hl(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function Ul(e,t){return t[e+15]===Fl}function Wl(e,t){return t[e+6]}function Gl(e,t){return t[e+14]}function Kl(e){return e+8}function ql(e,t){return e+t[e+6]*8}function Jl(e,t){return t[e+7]}function Yl(e){return e}function Xl(e,t,n,r,i){let a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,m=-1/0,h=-1/0,g=-1/0,_=e.offset||0;for(let r=(t-_)*6,i=(t+n-_)*6;r<i;r+=6){let t=e[r+0],n=e[r+1],i=t-n,_=t+n;i<a&&(a=i),_>c&&(c=_),t<d&&(d=t),t>m&&(m=t);let v=e[r+2],y=e[r+3],b=v-y,x=v+y;b<o&&(o=b),x>l&&(l=x),v<f&&(f=v),v>h&&(h=v);let S=e[r+4],C=e[r+5],w=S-C,T=S+C;w<s&&(s=w),T>u&&(u=T),S<p&&(p=S),S>g&&(g=S)}r[0]=a,r[1]=o,r[2]=s,r[3]=c,r[4]=l,r[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=m,i[4]=h,i[5]=g}var Zl=8,Ql=8,$l=new Int32Array(Zl),eu=new Float32Array(48),tu=new Float32Array(48),nu=new Float32Array(6),ru=new Float32Array(6),iu=new Int32Array(Ql),au=new Float32Array(48);function ou(e,t,n,r){for(let i=0;i<3;i++){let a=t[e+2*i],o=t[e+2*i+1],s=a-o,c=a+o;s<n[r+i]&&(n[r+i]=s),c>n[r+i+3]&&(n[r+i+3]=c)}}function su(e,t){let n=e[t+3]-e[t],r=e[t+4]-e[t+1],i=e[t+5]-e[t+2];return 2*(n*r+r*i+i*n)}function cu(e,t,n,r,i,a){let o=-1,s=0;if(a===0)o=Bl(t),o!==-1&&(s=(t[o]+t[o+3])/2);else if(a===1)o=Bl(e),o!==-1&&(s=lu(n,r,i,o));else if(a===2){let a=Hl(e),c=Pl*i,l=n.offset||0,u=(r-l)*6,d=(r+i-l)*6;for(let e=0;e<3;e++){let r=t[e],l=(t[e+3]-r)/Zl;if(i<Ql){for(let t=0;t<i;t++){let r=u+t*6,i=n[r+2*e],a=t;for(;a>0&&n[iu[a-1]+2*e]>i;)iu[a]=iu[a-1],a--;iu[a]=r}for(let e=0;e<3;e++)nu[e]=1/0,nu[e+3]=-1/0,ru[e]=1/0,ru[e+3]=-1/0;for(let e=i-1;e>=0;e--)Vl(iu[e],n,ru),au.set(ru,e*6);for(let t=0;t<i-1;t++){Vl(iu[t],n,nu);let r=n[iu[t+1]+2*e];if(n[iu[t]+2*e]===r)continue;let l=t+1,u=i-l,d=Hl(nu)/a,f=su(au,l*6)/a,p=1+Pl*(d*l+f*u);p<c&&(o=e,c=p,s=r)}}else{for(let e=0;e<Zl;e++){$l[e]=0;for(let t=0;t<3;t++)eu[e*6+t]=1/0,eu[e*6+t+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((n[t+2*e]-r)/l);i>=Zl&&(i=7),$l[i]++,ou(t,n,eu,i*6)}for(let e=0;e<6;e++)tu[42+e]=eu[42+e];for(let e=6;e>=0;e--){let t=e*6,n=t+6;for(let e=0;e<3;e++)tu[t+e]=Math.min(eu[t+e],tu[n+e]),tu[t+e+3]=Math.max(eu[t+e+3],tu[n+e+3])}let t=0;for(let n=0;n<7;n++){let u=n*6,d=$l[n];if(d!==0)for(let e=0;e<3;e++)t===0?(nu[e]=eu[u+e],nu[e+3]=eu[u+e+3]):(nu[e]=Math.min(nu[e],eu[u+e]),nu[e+3]=Math.max(nu[e+3],eu[u+e+3]));t+=d;let f=0,p=0;t!==0&&(f=Hl(nu)/a);let m=i-t;m!==0&&(p=su(tu,u+6)/a);let h=1+Pl*(f*t+p*m);h<c&&(o=e,c=h,s=r+l+n*l)}}}}else typeof a==`function`?{axis:o,pos:s}=a(e,t,n,r,i,n.offset):console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:o,pos:s}}function lu(e,t,n,r){let i=0,a=e.offset;for(let o=t,s=t+n;o<s;o++)i+=e[(o-a)*6+r*2];return i/n}function uu(e,t,n,r,i,a){let o=r,s=r+i-1,c=a.pos,l=a.axis*2,u=n.offset||0;for(;;){for(;o<=s&&n[(o-u)*6+l]<c;)o++;for(;o<=s&&n[(s-u)*6+l]>=c;)s--;if(o<s){for(let n=0;n<t;n++){let r=e[o*t+n];e[o*t+n]=e[s*t+n],e[s*t+n]=r}for(let e=0;e<6;e++){let t=o-u,r=s-u,i=n[t*6+e];n[t*6+e]=n[r*6+e],n[r*6+e]=i}o++,s--}else return o}}var du=2**32,fu=new Float32Array(6),pu=new Float32Array(6);function mu(e,t,n,r,i,a){let{maxDepth:o,verbose:s,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:u,onProgress:d,useSharedArrayBuffer:f=!1}=i,p=e.primitiveBuffer,m=e.primitiveBufferStride,h=new(f?SharedArrayBuffer:ArrayBuffer)(32*Math.max(1,2*Math.ceil(r)-1)),g=new Float32Array(h),_=new Uint32Array(h),v=new Uint16Array(h),y=0,b=!1;return Xl(t,n,r,fu,pu),C(n,r,0),h.slice(0,y*32);function x(e){d&&d((e-a.offset)/a.count)}function S(e,t,n){let r=e*2;_[e+6]=t,v[r+14]=n,v[r+15]=Fl,x(t+n)}function C(e,n,r){let i=y++,a=i*8;g.set(fu,a),!b&&r>=o&&(b=!0,s&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));let d=n>l;if(n<=c&&!d||r>=o){S(a,e,n);return}let f=cu(fu,pu,t,e,n,u),h=f.axis===-1?-1:uu(p,m,t,e,n,f);if(f.axis===-1||h===e||h===e+n){if(!d){S(a,e,n);return}f.axis=Math.max(0,Bl(fu)),h=e+Math.max(1,Math.floor(n/2))}_[a+7]=f.axis;let v=h-e;Xl(t,e,v,fu,pu),C(e,v,r+1);let x=y-i;if(x>du)throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);_[a+6]=x;let w=n-v;Xl(t,h,w,fu,pu),C(h,w,r+1)}}function hu(e,t){let n=e.getRootRanges(t.range),r=n[0],i=n[n.length-1],a={offset:r.offset,count:i.offset+i.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,e.computePrimitiveBounds(a.offset,a.count,o),e._roots=n.map(n=>mu(e,o,n.offset,n.count,t,a))}var gu=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},_u=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},vu,yu,bu=[],xu=new gu(()=>new h);function Su(e,t,n,r,i,a){vu=xu.getPrimitive(),yu=xu.getPrimitive(),bu.push(vu,yu),_u.setBuffer(e._roots[t]);let o=Cu(0,e.geometry,n,r,i,a);_u.clearBuffer(),xu.releasePrimitive(vu),xu.releasePrimitive(yu),bu.pop(),bu.pop();let s=bu.length;return s>0&&(yu=bu[s-1],vu=bu[s-2]),o}function Cu(e,t,n,r,i=null,a=0,o=0){let{float32Array:s,uint16Array:c,uint32Array:l}=_u,u=e*2;if(Ul(u,c)){let t=Wl(e,l),n=Gl(u,c);return zl(Yl(e),s,vu),r(t,n,!1,o,a+e/8,vu)}{let u=Kl(e),d=ql(e,l),f=u,p=d,m,h,g,_;if(i&&(g=vu,_=yu,zl(Yl(f),s,g),zl(Yl(p),s,_),m=i(g),h=i(_),h<m)){f=d,p=u;let e=m;m=h,h=e,g=_}g||(g=vu,zl(Yl(f),s,g));let v=Ul(f*2,c),y=n(g,v,m,o+1,a+f/8),b;if(y===2){let e=w(f);b=r(e,T(f)-e,!0,o+1,a+f/8,g)}else b=y&&Cu(f,t,n,r,i,a,o+1);if(b)return!0;_=yu,zl(Yl(p),s,_);let x=Ul(p*2,c),S=n(_,x,h,o+1,a+p/8),C;if(S===2){let e=w(p);C=r(e,T(p)-e,!0,o+1,a+p/8,_)}else C=S&&Cu(p,t,n,r,i,a,o+1);return!!C;function w(e){let{uint16Array:t,uint32Array:n}=_u,r=e*2;for(;!Ul(r,t);)e=Kl(e),r=e*2;return Wl(e,n)}function T(e){let{uint16Array:t,uint32Array:n}=_u,r=e*2;for(;!Ul(r,t);)e=ql(e,n),r=e*2;return Wl(e,n)+Gl(r,t)}}}var wu=new _u.constructor,Tu=new _u.constructor,Eu=new gu(()=>new h),Du=new h,Ou=new h,ku=new h,Au=new h,ju=!1;function Mu(e,t,n,r){if(ju)throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);ju=!0;let i=e._roots,a=t._roots,o,s=0,c=0,l=new et().copy(n).invert();for(let e=0,t=i.length;e<t;e++){wu.setBuffer(i[e]),c=0;let t=Eu.getPrimitive();zl(Yl(0),wu.float32Array,t),t.applyMatrix4(l);for(let e=0,i=a.length;e<i&&(Tu.setBuffer(a[e]),o=Nu(0,0,n,l,r,s,c,0,0,t),Tu.clearBuffer(),c+=a[e].byteLength/32,!o);e++);if(Eu.releasePrimitive(t),wu.clearBuffer(),s+=i[e].byteLength/32,o)break}return ju=!1,o}function Nu(e,t,n,r,i,a=0,o=0,s=0,c=0,l=null,u=!1){let d,f;u?(d=Tu,f=wu):(d=wu,f=Tu);let p=d.float32Array,m=d.uint32Array,h=d.uint16Array,g=f.float32Array,_=f.uint32Array,v=f.uint16Array,y=e*2,b=t*2,x=Ul(y,h),S=Ul(b,v),C=!1;if(S&&x)C=u?i(Wl(t,_),Gl(t*2,v),Wl(e,m),Gl(e*2,h),c,o+t/8,s,a+e/8):i(Wl(e,m),Gl(e*2,h),Wl(t,_),Gl(t*2,v),s,a+e/8,c,o+t/8);else if(S){let l=Eu.getPrimitive();zl(Yl(t),g,l),l.applyMatrix4(n);let d=Kl(e),f=ql(e,m);zl(Yl(d),p,Du),zl(Yl(f),p,Ou);let h=l.intersectsBox(Du),_=l.intersectsBox(Ou);C=h&&Nu(t,d,r,n,i,o,a,c,s+1,l,!u)||_&&Nu(t,f,r,n,i,o,a,c,s+1,l,!u),Eu.releasePrimitive(l)}else{let d=Kl(t),f=ql(t,_);zl(Yl(d),g,ku),zl(Yl(f),g,Au);let h=l.intersectsBox(ku),v=l.intersectsBox(Au);if(h&&v)C=Nu(e,d,n,r,i,a,o,s,c+1,l,u)||Nu(e,f,n,r,i,a,o,s,c+1,l,u);else if(h){if(x)C=Nu(e,d,n,r,i,a,o,s,c+1,l,u);else{let t=Eu.getPrimitive();t.copy(ku).applyMatrix4(n);let l=Kl(e),f=ql(e,m);zl(Yl(l),p,Du),zl(Yl(f),p,Ou);let h=t.intersectsBox(Du),g=t.intersectsBox(Ou);C=h&&Nu(d,l,r,n,i,o,a,c,s+1,t,!u)||g&&Nu(d,f,r,n,i,o,a,c,s+1,t,!u),Eu.releasePrimitive(t)}}else if(v){if(x)C=Nu(e,f,n,r,i,a,o,s,c+1,l,u);else{let t=Eu.getPrimitive();t.copy(Au).applyMatrix4(n);let l=Kl(e),d=ql(e,m);zl(Yl(l),p,Du),zl(Yl(d),p,Ou);let h=t.intersectsBox(Du),g=t.intersectsBox(Ou);C=h&&Nu(f,l,r,n,i,o,a,c,s+1,t,!u)||g&&Nu(f,d,r,n,i,o,a,c,s+1,t,!u),Eu.releasePrimitive(t)}}}return C}var Pu=new class{constructor(){let e=null,t=null,n=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(i,a)=>{if(r)throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);this.root=a,this.buffer=e=i._roots[a],this.uint16Array=n=new Uint16Array(e),this.uint32Array=t=new Uint32Array(e)},this.reset=()=>{this.root=null,this.buffer=e=null,this.uint16Array=n=null,this.uint32Array=t=null},this.getRangeStart=e=>{let r=e*2;for(;!Ul(r,n);)e=Kl(e),r=e*2;return Wl(e,t)},this.getRangeEnd=e=>{let r=e*2;for(;!Ul(r,n);)e=ql(e,t),r=e*2;return Wl(e,t)+Gl(r,n)};let i=(e,r,a)=>{let o=Ul(r*2,n);if(!e(a,o,r)&&!o){let n=Kl(r),o=ql(r,t);i(e,n,a+1),i(e,o,a+1)}};this.traverseBuffer=e=>{if(r)throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);r=!0;try{i(e,0,0)}finally{r=!1}},this.traverse=r=>{this.traverseBuffer((i,a,o)=>{if(a){let s=o*2,c=t[o+6],l=n[s+14];return r(i,a,new Float32Array(e,o*4,6),c,l)}{let n=Jl(o,t);return r(i,a,new Float32Array(e,o*4,6),n)}})}}},Fu=`0.10.0`,Iu=new h,Lu=new Float32Array(6);typeof window<`u`&&(window.__THREE_MESH_BVH__?console.warn(`three-mesh-bvh: Multiple instances of three-mesh-bvh being imported.`):window.__THREE_MESH_BVH__=Fu);var Ru=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Rl,...e},hu(this,e)}getRootRanges(){throw Error(`BVH: getRootRanges() not implemented`)}writePrimitiveBounds(){throw Error(`BVH: writePrimitiveBounds() not implemented`)}writePrimitiveRangeBounds(e,t,n,r){let i=1/0,a=1/0,o=1/0,s=-1/0,c=-1/0,l=-1/0;for(let n=e,r=e+t;n<r;n++){this.writePrimitiveBounds(n,Lu,0);let[e,t,r,u,d,f]=Lu;e<i&&(i=e),u>s&&(s=u),t<a&&(a=t),d>c&&(c=d),r<o&&(o=r),f>l&&(l=f)}return n[r+0]=i,n[r+1]=a,n[r+2]=o,n[r+3]=s,n[r+4]=c,n[r+5]=l,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let i=e,a=e+t;i<a;i++){this.writePrimitiveBounds(i,Lu,0);let[e,t,a,o,s,c]=Lu,l=(e+o)/2,u=(t+s)/2,d=(a+c)/2,f=(o-e)/2,p=(s-t)/2,m=(c-a)/2,h=(i-r)*6;n[h+0]=l,n[h+1]=f+(Math.abs(l)+f)*Il,n[h+2]=u,n[h+3]=p+(Math.abs(u)+p)*Il,n[h+4]=d,n[h+5]=m+(Math.abs(d)+m)*Il}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t){if(t.BYTES_PER_ELEMENT===2&&t.some(t=>t+e>=2**16)){let e=t.buffer.constructor;t=new Uint32Array(new e(4*t.length)),t.set(this._indirectBuffer),this._indirectBuffer=t}for(let n=0,r=t.length;n<r;n++)t[n]+=e}else{let t=this._roots;for(let n=0;n<t.length;n++){let r=t[n],i=new Uint32Array(r),a=new Uint16Array(r),o=r.byteLength/32;for(let t=0;t<o;t++){let n=8*t;Ul(2*n,a)&&(i[n+6]+=e)}}}}traverse(e,t=0){Pu.setBVH(this,t),Pu.traverse(e),Pu.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n),a=new Float32Array(n),o=n.byteLength/32;for(let e=o-1;e>=0;e--){let t=e*8,n=t*2;if(Ul(n,i)){let e=Wl(t,r),o=Gl(n,i);this.writePrimitiveRangeBounds(e,o,Lu,0),a.set(Lu,t)}else{let e=Kl(t),n=ql(t,r);for(let r=0;r<3;r++){let i=a[e+r],o=a[e+r+3],s=a[n+r],c=a[n+r+3];a[t+r]=i<s?i:s,a[t+r+3]=o>c?o:c}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{zl(0,new Float32Array(t),Iu),e.union(Iu)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:i,scratchPrimitive:a,iterate:o}=e;if(r&&i){let e=r;r=(t,n,r,s,c)=>e(t,n,r,s,c)?!0:o(t,n,this,i,r,s,a)}else r||=i?(e,t,n,r)=>o(e,t,this,i,n,r,a):(e,t,n)=>n;let s=!1,c=0,l=this._roots;for(let e=0,i=l.length;e<i;e++){let i=l[e];if(s=Su(this,e,n,r,t,c),s)break;c+=i.byteLength/32}return s}bvhcast(e,t,n){let{intersectsRanges:r}=n;return Mu(this,e,t,r)}};function zu(){return typeof SharedArrayBuffer<`u`}function Bu(e){return e.index?e.index.count:e.attributes.position.count}function Vu(e){return Bu(e)/3}function Hu(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function Uu(e,t){if(!e.index){let n=e.attributes.position.count,r=Hu(n,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new H(r,1));for(let e=0;e<n;e++)r[e]=e}}function Wu(e,t,n){let r=Bu(e)/n,i=t||e.drawRange,a=i.start/n,o=(i.start+i.count)/n,s=Math.max(0,a),c=Math.min(r,o)-s;return{offset:Math.floor(s),count:Math.floor(c)}}function Gu(e,t){return e.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Ku(e,t,n){let r=Wu(e,t,n),i=Gu(e,n);if(!i.length)return[r];let a=[],o=r.offset,s=r.offset+r.count,c=Bu(e)/n,l=[];for(let e of i){let{offset:t,count:n}=e,r=t,i=t+(isFinite(n)?n:c-t);r<s&&i>o&&(l.push({pos:Math.max(o,r),isStart:!0}),l.push({pos:Math.min(s,i),isStart:!1}))}l.sort((e,t)=>e.pos===t.pos?e.type===`end`?-1:1:e.pos-t.pos);let u=0,d=null;for(let e of l){let t=e.pos;u!==0&&t!==d&&a.push({offset:d,count:t-d}),u+=e.isStart?1:-1,d=t}return a}function qu(e,t){let n=e[e.length-1],r=n.offset+n.count>2**16,i=e.reduce((e,t)=>e+t.count,0),a=r?4:2,o=t?new SharedArrayBuffer(i*a):new ArrayBuffer(i*a),s=r?new Uint32Array(o):new Uint16Array(o),c=0;for(let t=0;t<e.length;t++){let{offset:n,count:r}=e[t];for(let e=0;e<r;e++)s[c+e]=n+e;c+=r}return s}var Ju=class extends Ru{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(!e.isBufferGeometry)throw Error(`BVH: Only BufferGeometries are supported.`);if(e.index&&e.index.isInterleavedBufferAttribute)throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);if(t.useSharedArrayBuffer&&!zu())throw Error(`BVH: SharedArrayBuffer is not available.`);super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?e=>this._indirectBuffer[e]:e=>e,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Rl,...t},t[Ll]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=qu(Ku(t,e.range,n),e.useSharedArrayBuffer);this._indirectBuffer=r}else Uu(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new h))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Ku(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw Error(`BVH: raycastObject3D() not implemented`)}},Yu=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,a=e.length;i<a;i++){let a=e[i][t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=e.dot(a);n=o<n?o:n,r=o>r?o:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Yu.prototype.setFromBox=(function(){let e=new Y;return function(t,n){let r=n.min,i=n.max,a=1/0,o=-1/0;for(let n=0;n<=1;n++)for(let s=0;s<=1;s++)for(let c=0;c<=1;c++){e.x=r.x*n+i.x*(1-n),e.y=r.y*s+i.y*(1-s),e.z=r.z*c+i.z*(1-c);let l=t.dot(e);a=Math.min(l,a),o=Math.max(l,o)}this.min=a,this.max=o}})();var Xu=(function(){let e=new Y,t=new Y,n=new Y;return function(r,i,a){let o=r.start,s=e,c=i.start,l=t;n.subVectors(o,c),e.subVectors(r.end,r.start),t.subVectors(i.end,i.start);let u=n.dot(l),d=l.dot(s),f=l.dot(l),p=n.dot(s),m=s.dot(s)*f-d*d,h,g;h=m===0?0:(u*d-p*f)/m,g=(u+h*d)/f,a.x=h,a.y=g}})(),Zu=(function(){let e=new it,t=new Y,n=new Y;return function(r,i,a,o){Xu(r,i,e);let s=e.x,c=e.y;if(s>=0&&s<=1&&c>=0&&c<=1)r.at(s,a),i.at(c,o);else if(s>=0&&s<=1)c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);else if(c>=0&&c<=1)s<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);else{let e;e=s<0?r.start:r.end;let l;l=c<0?i.start:i.end;let u=t,d=n;if(r.closestPointToPoint(l,!0,t),i.closestPointToPoint(e,!0,n),u.distanceToSquared(l)<=d.distanceToSquared(e)){a.copy(u),o.copy(l);return}a.copy(e),o.copy(d);return}}})(),Qu=(function(){let e=new Y,t=new Y,n=new ve,r=new He;return function(i,a){let{radius:o,center:s}=i,{a:c,b:l,c:u}=a;if(r.start=c,r.end=l,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o||(r.start=c,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o)||(r.start=l,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o))return!0;let d=a.getPlane(n);if(Math.abs(d.distanceToPoint(s))<=o){let e=d.projectPoint(s,t);if(a.containsPoint(e))return!0}return!1}})(),$u=[`x`,`y`,`z`],ed=1e-15,td=ed*ed;function nd(e){return Math.abs(e)<ed}var rd=class extends st{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new Y),this.satBounds=[,,,,].fill().map(()=>new Yu),this.points=[this.a,this.b,this.c],this.plane=new ve,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new He,this.needsUpdate=!0}intersectsSphere(e){return Qu(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,a=this.satBounds,o=i[0],s=a[0];this.getNormal(o),s.setFromPoints(o,r);let c=i[1],l=a[1];c.subVectors(e,t),l.setFromPoints(c,r);let u=i[2],d=a[2];u.subVectors(t,n),d.setFromPoints(u,r);let f=i[3],p=a[3];f.subVectors(n,e),p.setFromPoints(f,r);let m=c.length(),h=u.length(),g=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<ed?h<ed||g<ed?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):h<ed?g<ed?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<ed&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};rd.prototype.closestPointToSegment=(function(){let e=new Y,t=new Y,n=new He;return function(r,i=null,a=null){this.needsUpdate&&this.update();let{start:o,end:s}=r,c=this.points,l,u=1/0;if(this.plane.distanceToPoint(o)*this.plane.distanceToPoint(s)<0&&this.plane.intersectLine(r,e)!==null&&this.containsPoint(e))return i&&i.copy(e),a&&a.copy(e),0;for(let o=0;o<3;o++){let s=(o+1)%3;n.start.copy(c[o]),n.end.copy(c[s]),Zu(n,r,e,t),l=e.distanceToSquared(t),l<u&&(u=l,i&&i.copy(e),a&&a.copy(t))}return this.closestPointToPoint(o,e),l=o.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(o)),this.closestPointToPoint(s,e),l=s.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(s)),Math.sqrt(u)}})(),rd.prototype.intersectsTriangle=(function(){let e=new rd,t=new Yu,n=new Yu,r=new Y,i=new Y,a=new Y,o=new Y,s=new He,c=new He,l=new Y,u=new it,d=new it;function f(e,i,a,s){let c=r;!e.isDegenerateIntoPoint&&!e.isDegenerateIntoSegment?c.copy(e.plane.normal):c.copy(i.plane.normal);let l=e.satBounds,u=e.satAxes;for(let r=1;r<4;r++){let a=l[r],s=u[r];if(t.setFromPoints(s,i.points),a.isSeparated(t)||(o.copy(c).cross(s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}let d=i.satBounds,f=i.satAxes;for(let r=1;r<4;r++){let a=d[r],s=f[r];if(t.setFromPoints(s,e.points),a.isSeparated(t)||(o.crossVectors(c,s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}return a&&(s||console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`),a.start.set(0,0,0),a.end.set(0,0,0)),!0}function p(e,t,n,r,i,a,o,s,c,l,u){let d=o/(o-s);l.x=r+(i-r)*d,u.start.subVectors(t,e).multiplyScalar(d).add(e),d=o/(o-c),l.y=r+(a-r)*d,u.end.subVectors(n,e).multiplyScalar(d).add(e)}function m(e,t,n,r,i,a,o,s,c,l,u){if(i>0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else if(a>0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(s*c>0||o!=0)p(e.a,e.b,e.c,t,n,r,o,s,c,l,u);else if(s!=0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(c!=0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else return!0;return!1}function h(e,t,n,i){let a=t.degenerateSegment,o=e.plane.distanceToPoint(a.start),s=e.plane.distanceToPoint(a.end);return nd(o)?nd(s)?f(e,t,n,i):(n&&(n.start.copy(a.start),n.end.copy(a.start)),e.containsPoint(a.start)):nd(s)?(n&&(n.start.copy(a.end),n.end.copy(a.end)),e.containsPoint(a.end)):e.plane.intersectLine(a,r)!=null&&(n&&(n.start.copy(r),n.end.copy(r)),e.containsPoint(r))}function g(e,t,n){let r=t.a;return nd(e.plane.distanceToPoint(r))&&e.containsPoint(r)?(n&&(n.start.copy(r),n.end.copy(r)),!0):!1}function _(e,t,n){let i=e.degenerateSegment,a=t.a;return i.closestPointToPoint(a,!0,r),a.distanceToSquared(r)<td&&(n&&(n.start.copy(a),n.end.copy(a)),!0)}function v(e,t,n,o){if(e.isDegenerateIntoSegment){if(t.isDegenerateIntoSegment){let o=e.degenerateSegment,s=t.degenerateSegment,c=i,l=a;o.delta(c),s.delta(l);let u=r.subVectors(s.start,o.start),d=c.x*l.y-c.y*l.x;if(nd(d))return!1;let f=(u.x*l.y-u.y*l.x)/d,p=-(c.x*u.y-c.y*u.x)/d;return f<0||f>1||p<0||p>1?!1:nd(o.start.z+c.z*f-(s.start.z+l.z*p))?(n&&(n.start.copy(o.start).addScaledVector(c,f),n.end.copy(o.start).addScaledVector(c,f)),!0):!1}return t.isDegenerateIntoPoint?_(e,t,n):h(t,e,n,o)}if(e.isDegenerateIntoPoint)return t.isDegenerateIntoPoint?t.a.distanceToSquared(e.a)<td&&(n&&(n.start.copy(e.a),n.end.copy(e.a)),!0):t.isDegenerateIntoSegment?_(t,e,n):g(t,e,n);if(t.isDegenerateIntoPoint)return g(e,t,n);if(t.isDegenerateIntoSegment)return h(e,t,n,o)}return function(t,n=null,r=!1){this.needsUpdate&&this.update(),t.isExtendedTriangle?t.needsUpdate&&t.update():(e.copy(t),e.update(),t=e);let o=v(this,t,n,r);if(o!==void 0)return o;let p=this.plane,h=t.plane,g=h.distanceToPoint(this.a),_=h.distanceToPoint(this.b),y=h.distanceToPoint(this.c);nd(g)&&(g=0),nd(_)&&(_=0),nd(y)&&(y=0);let b=g*_,x=g*y;if(b>0&&x>0)return!1;let S=p.distanceToPoint(t.a),C=p.distanceToPoint(t.b),w=p.distanceToPoint(t.c);nd(S)&&(S=0),nd(C)&&(C=0),nd(w)&&(w=0);let T=S*C,E=S*w;if(T>0&&E>0)return!1;i.copy(p.normal),a.copy(h.normal);let D=i.cross(a),O=0,k=Math.abs(D.x),A=Math.abs(D.y);A>k&&(k=A,O=1),Math.abs(D.z)>k&&(O=2);let j=$u[O],M=this.a[j],N=this.b[j],P=this.c[j],F=t.a[j],I=t.b[j],L=t.c[j];if(m(this,M,N,P,b,x,g,_,y,u,s)||m(t,F,I,L,T,E,S,C,w,d,c))return f(this,t,n,r);if(u.y<u.x){let e=u.y;u.y=u.x,u.x=e,l.copy(s.start),s.start.copy(s.end),s.end.copy(l)}if(d.y<d.x){let e=d.y;d.y=d.x,d.x=e,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(n&&(d.x>u.x?n.start.copy(c.start):n.start.copy(s.start),d.y<u.y?n.end.copy(c.end):n.end.copy(s.end)),!0)}})(),rd.prototype.distanceToPoint=(function(){let e=new Y;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),rd.prototype.distanceToTriangle=(function(){let e=new Y,t=new Y,n=[`a`,`b`,`c`],r=new He,i=new He;return function(a,o=null,s=null){let c=o||s?r:null;if(this.intersectsTriangle(a,c,!0))return(o||s)&&(o&&c.getCenter(o),s&&c.getCenter(s)),0;let l=1/0;for(let t=0;t<3;t++){let r,i=n[t],c=a[i];this.closestPointToPoint(c,e),r=c.distanceToSquared(e),r<l&&(l=r,o&&o.copy(e),s&&s.copy(c));let u=this[i];a.closestPointToPoint(u,e),r=u.distanceToSquared(e),r<l&&(l=r,o&&o.copy(u),s&&s.copy(e))}for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];r.set(this[u],this[d]);for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];i.set(a[u],a[d]),Zu(r,i,e,t);let f=e.distanceToSquared(t);f<l&&(l=f,o&&o.copy(e),s&&s.copy(t))}}return Math.sqrt(l)}})();var id=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new Y,this.max=new Y,this.matrix=new et,this.invMatrix=new et,this.points=Array(8).fill().map(()=>new Y),this.satAxes=[,,,].fill().map(()=>new Y),this.satBounds=[,,,].fill().map(()=>new Yu),this.alignedSatBounds=[,,,].fill().map(()=>new Yu),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};id.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let i=0;i<=1;i++)for(let a=0;a<=1;a++)for(let o=0;o<=1;o++){let s=r[1*i|2*a|4*o];s.x=i?n.x:t.x,s.y=a?n.y:t.y,s.z=o?n.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,a=this.satAxes,o=r[0];for(let e=0;e<3;e++){let t=a[e],n=i[e],s=r[1<<e];t.subVectors(o,s),n.setFromPoints(t,r)}let s=this.alignedSatBounds;s[0].setFromPointsField(r,`x`),s[1].setFromPointsField(r,`y`),s[2].setFromPointsField(r,`z`),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})(),id.prototype.intersectsBox=(function(){let e=new Yu;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,i=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(e.min=n.x,e.max=r.x,o[0].isSeparated(e)||(e.min=n.y,e.max=r.y,o[1].isSeparated(e))||(e.min=n.z,e.max=r.z,o[2].isSeparated(e)))return!1;for(let n=0;n<3;n++){let r=a[n],o=i[n];if(e.setFromBox(r,t),o.isSeparated(e))return!1}return!0}})(),id.prototype.intersectsTriangle=(function(){let e=new rd,t=[,,,],n=new Yu,r=new Yu,i=new Y;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let o=this.satBounds,s=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let e=0;e<3;e++){let r=o[e],i=s[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}let c=a.satBounds,l=a.satAxes,u=this.points;for(let e=0;e<3;e++){let t=c[e],r=l[e];if(n.setFromPoints(r,u),t.isSeparated(n))return!1}for(let e=0;e<3;e++){let a=s[e];for(let e=0;e<4;e++){let o=l[e];if(i.crossVectors(a,o),n.setFromPoints(i,t),r.setFromPoints(i,u),n.isSeparated(r))return!1}}return!0}})(),id.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})(),id.prototype.distanceToPoint=(function(){let e=new Y;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),id.prototype.distanceToBox=(function(){let e=[`x`,`y`,`z`],t=Array(12).fill().map(()=>new He),n=Array(12).fill().map(()=>new He),r=new Y,i=new Y;return function(a,o=0,s=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(s||c)&&(a.getCenter(i),this.closestPointToPoint(i,r),a.clampPoint(r,i),s&&s.copy(r),c&&c.copy(i)),0;let l=o*o,u=a.min,d=a.max,f=this.points,p=1/0;for(let e=0;e<8;e++){let t=f[e];i.copy(t).clamp(u,d);let n=t.distanceToSquared(i);if(n<p&&(p=n,s&&s.copy(t),c&&c.copy(i),n<l))return Math.sqrt(n)}let m=0;for(let r=0;r<3;r++)for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let o=(r+1)%3,s=(r+2)%3,c=i<<o|a<<s,l=1<<r|i<<o|a<<s,p=f[c],h=f[l];t[m].set(p,h);let g=e[r],_=e[o],v=e[s],y=n[m],b=y.start,x=y.end;b[g]=u[g],b[_]=i?u[_]:d[_],b[v]=a?u[v]:d[v],x[g]=d[g],x[_]=i?u[_]:d[_],x[v]=a?u[v]:d[v],m++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){i.x=e?d.x:u.x,i.y=t?d.y:u.y,i.z=n?d.z:u.z,this.closestPointToPoint(i,r);let a=i.distanceToSquared(r);if(a<p&&(p=a,s&&s.copy(r),c&&c.copy(i),a<l))return Math.sqrt(a)}for(let e=0;e<12;e++){let a=t[e];for(let e=0;e<12;e++){let t=n[e];Zu(a,t,r,i);let o=r.distanceToSquared(i);if(o<p&&(p=o,s&&s.copy(r),c&&c.copy(i),o<l))return Math.sqrt(o)}}return Math.sqrt(p)}})();var ad=new class extends gu{constructor(){super(()=>new rd)}},od=new Y,sd=new Y;function cd(e,t,n={},r=0,i=1/0){let a=r*r,o=i*i,s=1/0,c=null;if(e.shapecast({boundsTraverseOrder:e=>(od.copy(t).clamp(e.min,e.max),od.distanceToSquared(t)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle:(e,n)=>{e.closestPointToPoint(t,od);let r=t.distanceToSquared(od);return r<s&&(sd.copy(od),s=r,c=n),r<a}}),s===1/0)return null;let l=Math.sqrt(s);return n.point?n.point.copy(sd):n.point=sd.clone(),n.distance=l,n.faceIndex=c,n}var ld=!0,ud=new Y,dd=new Y,fd=new Y,pd=new it,md=new it,hd=new it,gd=new Y,_d=new Y,vd=new Y,yd=new Y;function bd(e,t,n,r,i,a,o,s){let c;if(c=a===1?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,a!==2,i),c===null)return null;let l=e.origin.distanceTo(i);return l<o||l>s?null:{distance:l,point:i.clone()}}function xd(e,t,n,r,i,a,o,s,c,l,u){ud.fromBufferAttribute(t,a),dd.fromBufferAttribute(t,o),fd.fromBufferAttribute(t,s);let d=bd(e,ud,dd,fd,yd,c,l,u);if(d){if(r){pd.fromBufferAttribute(r,a),md.fromBufferAttribute(r,o),hd.fromBufferAttribute(r,s),d.uv=new it;let e=st.getInterpolation(yd,ud,dd,fd,pd,md,hd,d.uv);ld||(d.uv=e)}if(i){pd.fromBufferAttribute(i,a),md.fromBufferAttribute(i,o),hd.fromBufferAttribute(i,s),d.uv1=new it;let e=st.getInterpolation(yd,ud,dd,fd,pd,md,hd,d.uv1);ld||(d.uv1=e)}if(n){gd.fromBufferAttribute(n,a),_d.fromBufferAttribute(n,o),vd.fromBufferAttribute(n,s),d.normal=new Y;let t=st.getInterpolation(yd,ud,dd,fd,gd,_d,vd,d.normal);d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1),ld||(d.normal=t)}let t={a,b:o,c:s,normal:new Y,materialIndex:0};if(st.getNormal(ud,dd,fd,t.normal),d.face=t,d.faceIndex=a,ld){let e=new Y;st.getBarycoord(yd,ud,dd,fd,e),d.barycoord=e}}return d}function Sd(e){return e&&e.isMaterial?e.side:e}function Cd(e,t,n,r,i,a,o){let s=r*3,c=s+0,l=s+1,u=s+2,{index:d,groups:f}=e;e.index&&(c=d.getX(c),l=d.getX(l),u=d.getX(u));let{position:p,normal:m,uv:h,uv1:g}=e.attributes;if(Array.isArray(t)){let e=r*3;for(let s=0,d=f.length;s<d;s++){let{start:d,count:_,materialIndex:v}=f[s];if(e>=d&&e<d+_){let e=Sd(t[v]),s=xd(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=v,i)i.push(s);else return s}}}}else{let e=Sd(t),s=xd(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=0,i)i.push(s);else return s}}return null}function wd(e,t,n,r){let i=e.a,a=e.b,o=e.c,s=t,c=t+1,l=t+2;n&&(s=n.getX(s),c=n.getX(c),l=n.getX(l)),i.x=r.getX(s),i.y=r.getY(s),i.z=r.getZ(s),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l)}function Td(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,l=r+i;e<l;e++)Cd(c,t,n,e,a,o,s)}function Ed(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,c=r+i;e<c;e++){let r;r=Cd(s,t,n,e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Dd(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let n=e,s=t+e;n<s;n++){let e;if(e=n,wd(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Od(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(e,n,a=!1){let l=e*2;if(Ul(l,s)){let t=Wl(e,o),n=Gl(l,s),a=1/0,u=1/0,d=1/0,f=-1/0,p=-1/0,m=-1/0;for(let e=3*t,o=3*(t+n);e<o;e++){let t=r[e],n=i.getX(t),o=i.getY(t),s=i.getZ(t);n<a&&(a=n),n>f&&(f=n),o<u&&(u=o),o>p&&(p=o),s<d&&(d=s),s>m&&(m=s)}return c[e+0]!==a||c[e+1]!==u||c[e+2]!==d||c[e+3]!==f||c[e+4]!==p||c[e+5]!==m?(c[e+0]=a,c[e+1]=u,c[e+2]=d,c[e+3]=f,c[e+4]=p,c[e+5]=m,!0):!1}{let r=Kl(e),i=ql(e,o),s=a,l=!1,u=!1;if(t){if(!s){let e=r/8+n/32,a=i/8+n/32;l=t.has(e),u=t.has(a),s=!l&&!u}}else l=!0,u=!0;let f=s||l,p=s||u,m=!1;f&&(m=d(r,n,s));let h=!1;p&&(h=d(i,n,s));let g=m||h;if(g)for(let t=0;t<3;t++){let n=r+t,a=i+t,o=c[n],s=c[n+3],l=c[a],u=c[a+3];c[e+t]=o<l?o:l,c[e+t+3]=s>u?s:u}return g}}}function kd(e,t,n,r,i){let a,o,s,c,l,u,d=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,m=n.origin.x,h=n.origin.y,g=n.origin.z,_=t[e],v=t[e+3],y=t[e+1],b=t[e+3+1],x=t[e+2],S=t[e+3+2];return d>=0?(a=(_-m)*d,o=(v-m)*d):(a=(v-m)*d,o=(_-m)*d),f>=0?(s=(y-h)*f,c=(b-h)*f):(s=(b-h)*f,c=(y-h)*f),a>c||s>o||((s>a||isNaN(a))&&(a=s),(c<o||isNaN(o))&&(o=c),p>=0?(l=(x-g)*p,u=(S-g)*p):(l=(S-g)*p,u=(x-g)*p),a>u||l>o)?!1:((l>a||a!==a)&&(a=l),(u<o||o!==o)&&(o=u),a<=i&&o>=r)}function Ad(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,u=r+i;e<u;e++)Cd(c,t,n,l?l[e]:e,a,o,s)}function jd(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,d=r+i;e<d;e++){let r;r=Cd(s,t,n,c?c[e]:e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Md(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(e=n.resolveTriangleIndex(s),wd(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Nd(e,t,n,r,i,a,o){_u.setBuffer(e._roots[t]),kd(0,_u.float32Array,r,a,o)&&Pd(0,e,n,r,i,a,o),_u.clearBuffer()}function Pd(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=_u,u=e*2;if(Ul(u,c))Td(t,n,r,Wl(e,l),Gl(u,c),i,a,o);else{let c=Kl(e);kd(c,s,r,a,o)&&Pd(c,t,n,r,i,a,o);let u=ql(e,l);kd(u,s,r,a,o)&&Pd(u,t,n,r,i,a,o)}}var Fd=[`x`,`y`,`z`];function Id(e,t,n,r,i,a){_u.setBuffer(e._roots[t]);let o=null;return kd(0,_u.float32Array,r,i,a)&&(o=Ld(0,e,n,r,i,a)),_u.clearBuffer(),o}function Ld(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=_u,l=e*2;if(Ul(l,s))return Ed(t,n,r,Wl(e,c),Gl(l,s),i,a);{let s=Jl(e,c),l=Fd[s],u=r.direction[l]>=0,d,f;u?(d=Kl(e),f=ql(e,c)):(d=ql(e,c),f=Kl(e));let p=kd(d,o,r,i,a)?Ld(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=kd(f,o,r,i,a)?Ld(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var Rd=new h,zd=new rd,Bd=new rd,Vd=new et,Hd=new id,Ud=new id;function Wd(e,t,n,r){_u.setBuffer(e._roots[t]);let i=Gd(0,e,n,r);return _u.clearBuffer(),i}function Gd(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=_u,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),Hd.set(n.boundingBox.min,n.boundingBox.max,r),i=Hd),Ul(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Wl(e,s),m=Gl(c,o);if(Vd.copy(r).invert(),n.boundsTree)return zl(Yl(e),a,Ud),Ud.matrix.copy(Vd),Ud.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>Ud.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let t=p*3,n=(m+p)*3;t<n;t+=3)if(wd(Bd,t,l,u),Bd.needsUpdate=!0,e.intersectsTriangle(Bd))return!0;return!1}});{let e=Vu(n);for(let t=p*3,n=(m+p)*3;t<n;t+=3){wd(zd,t,l,u),zd.a.applyMatrix4(Vd),zd.b.applyMatrix4(Vd),zd.c.applyMatrix4(Vd),zd.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(wd(Bd,t,d,f),Bd.needsUpdate=!0,zd.intersectsTriangle(Bd))return!0}}}else{let o=Kl(e),c=ql(e,s);return zl(Yl(o),a,Rd),!!(i.intersectsBox(Rd)&&Gd(o,t,n,r,i)||(zl(Yl(c),a,Rd),i.intersectsBox(Rd)&&Gd(c,t,n,r,i)))}}var Kd=new et,qd=new id,Jd=new id,Yd=new Y,Xd=new Y,Zd=new Y,Qd=new Y;function $d(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),qd.set(t.boundingBox.min,t.boundingBox.max,n),qd.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=ad.getPrimitive(),p=ad.getPrimitive(),m=Yd,h=Xd,g=null,_=null;i&&(g=Zd,_=Qd);let v=1/0,y=null,b=null;return Kd.copy(n).invert(),Jd.matrix.copy(Kd),e.shapecast({boundsTraverseOrder:e=>qd.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(Jd.min.copy(e.min),Jd.max.copy(e.max),Jd.needsUpdate=!0),!0),intersectsRange:(e,r)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>Jd.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,i)=>{for(let o=t,s=t+i;o<s;o++){wd(p,3*o,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){wd(f,3*t,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=t,b=o),e<a)return!0}}}});{let i=Vu(t);for(let t=0,o=i;t<o;t++){wd(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=e,i=e+r;n<i;n++){wd(f,3*n,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=n,b=t),e<a)return!0}}}}}),ad.releasePrimitive(f),ad.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(Kd),h.applyMatrix4(Kd),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function ef(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(n,a,l=!1){let u=n*2;if(Ul(u,s)){let t=Wl(n,o),a=Gl(u,s),l=1/0,d=1/0,f=1/0,p=-1/0,m=-1/0,h=-1/0;for(let n=t,o=t+a;n<o;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let n=t+e;n=r?r[n]:n;let a=i.getX(n),o=i.getY(n),s=i.getZ(n);a<l&&(l=a),a>p&&(p=a),o<d&&(d=o),o>m&&(m=o),s<f&&(f=s),s>h&&(h=s)}}return c[n+0]!==l||c[n+1]!==d||c[n+2]!==f||c[n+3]!==p||c[n+4]!==m||c[n+5]!==h?(c[n+0]=l,c[n+1]=d,c[n+2]=f,c[n+3]=p,c[n+4]=m,c[n+5]=h,!0):!1}{let e=Kl(n),r=ql(n,o),i=l,s=!1,u=!1;if(t){if(!i){let n=e/8+a/32,o=r/8+a/32;s=t.has(n),u=t.has(o),i=!s&&!u}}else s=!0,u=!0;let f=i||s,p=i||u,m=!1;f&&(m=d(e,a,i));let h=!1;p&&(h=d(r,a,i));let g=m||h;if(g)for(let t=0;t<3;t++){let i=e+t,a=r+t,o=c[i],s=c[i+3],l=c[a],u=c[a+3];c[n+t]=o<l?o:l,c[n+t+3]=s>u?s:u}return g}}}function tf(e,t,n,r,i,a,o){_u.setBuffer(e._roots[t]),kd(0,_u.float32Array,r,a,o)&&nf(0,e,n,r,i,a,o),_u.clearBuffer()}function nf(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=_u,u=e*2;if(Ul(u,c))Ad(t,n,r,Wl(e,l),Gl(u,c),i,a,o);else{let c=Kl(e);kd(c,s,r,a,o)&&nf(c,t,n,r,i,a,o);let u=ql(e,l);kd(u,s,r,a,o)&&nf(u,t,n,r,i,a,o)}}var rf=[`x`,`y`,`z`];function af(e,t,n,r,i,a){_u.setBuffer(e._roots[t]);let o=null;return kd(0,_u.float32Array,r,i,a)&&(o=of(0,e,n,r,i,a)),_u.clearBuffer(),o}function of(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=_u,l=e*2;if(Ul(l,s))return jd(t,n,r,Wl(e,c),Gl(l,s),i,a);{let s=Jl(e,c),l=rf[s],u=r.direction[l]>=0,d,f;u?(d=Kl(e),f=ql(e,c)):(d=ql(e,c),f=Kl(e));let p=kd(d,o,r,i,a)?of(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=kd(f,o,r,i,a)?of(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var sf=new h,cf=new rd,lf=new rd,uf=new et,df=new id,ff=new id;function pf(e,t,n,r){_u.setBuffer(e._roots[t]);let i=mf(0,e,n,r);return _u.clearBuffer(),i}function mf(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=_u,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),df.set(n.boundingBox.min,n.boundingBox.max,r),i=df),Ul(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Wl(e,s),m=Gl(c,o);if(uf.copy(r).invert(),n.boundsTree)return zl(Yl(e),a,ff),ff.matrix.copy(uf),ff.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>ff.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let n=p,r=m+p;n<r;n++)if(wd(lf,3*t.resolveTriangleIndex(n),l,u),lf.needsUpdate=!0,e.intersectsTriangle(lf))return!0;return!1}});{let e=Vu(n);for(let n=p,r=m+p;n<r;n++){wd(cf,3*t.resolveTriangleIndex(n),l,u),cf.a.applyMatrix4(uf),cf.b.applyMatrix4(uf),cf.c.applyMatrix4(uf),cf.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(wd(lf,t,d,f),lf.needsUpdate=!0,cf.intersectsTriangle(lf))return!0}}}else{let o=Kl(e),c=ql(e,s);return zl(Yl(o),a,sf),!!(i.intersectsBox(sf)&&mf(o,t,n,r,i)||(zl(Yl(c),a,sf),i.intersectsBox(sf)&&mf(c,t,n,r,i)))}}var hf=new et,gf=new id,_f=new id,vf=new Y,yf=new Y,bf=new Y,xf=new Y;function Sf(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),gf.set(t.boundingBox.min,t.boundingBox.max,n),gf.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=ad.getPrimitive(),p=ad.getPrimitive(),m=vf,h=yf,g=null,_=null;i&&(g=bf,_=xf);let v=1/0,y=null,b=null;return hf.copy(n).invert(),_f.matrix.copy(hf),e.shapecast({boundsTraverseOrder:e=>gf.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(_f.min.copy(e.min),_f.max.copy(e.max),_f.needsUpdate=!0),!0),intersectsRange:(r,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>_f.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,o)=>{for(let x=t,S=t+o;x<S;x++){let t=s.resolveTriangleIndex(x);wd(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=r,n=r+i;t<n;t++){let n=e.resolveTriangleIndex(t);wd(f,3*n,l,c),f.needsUpdate=!0;let r=f.distanceToTriangle(p,m,g);if(r<v&&(h.copy(m),_&&_.copy(g),v=r,y=t,b=x),r<a)return!0}}}})}{let o=Vu(t);for(let t=0,s=o;t<s;t++){wd(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=r,o=r+i;n<o;n++){let r=e.resolveTriangleIndex(n);wd(f,3*r,l,c),f.needsUpdate=!0;let i=f.distanceToTriangle(p,m,g);if(i<v&&(h.copy(m),_&&_.copy(g),v=i,y=n,b=t),i<a)return!0}}}}}),ad.releasePrimitive(f),ad.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(hf),h.applyMatrix4(hf),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function Cf(e,t,n){return e===null?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e)}var wf=new id,Tf=new B,Ef=new Y,Df=new et,Of=new Y,kf=[`getX`,`getY`,`getZ`],Af=class e extends Ju{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(e=>e.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=i?i.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=i),o}static deserialize(t,n,r={}){r={setIndex:!0,indirect:!!t.indirectBuffer,...r};let{index:i,roots:a,indirectBuffer:o}=t;t.version||(console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`),c(a));let s=new e(n,{...r,[Ll]:!0});if(s._roots=a,s._indirectBuffer=o||null,r.setIndex){let e=n.getIndex();if(e===null){let e=new H(t.index,1,!1);n.setIndex(e)}else e.array!==i&&(e.array.set(i),e.needsUpdate=!0)}return s;function c(e){for(let t=0;t<e.length;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n);for(let e=0,t=n.byteLength/32;e<t;e++){let t=8*e;Ul(2*t,i)||(r[t+6]=r[t+6]/8-e)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=(i?i[e]:e)*3,c=s+0,l=s+1,u=s+2;o&&(c=o[c],l=o[l],u=o[u]);for(let e=0;e<3;e++){let r=a[kf[e]](c),i=a[kf[e]](l),o=a[kf[e]](u),s=r;i<s&&(s=i),o<s&&(s=o);let d=r;i>d&&(d=i),o>d&&(d=o),t[n+e]=s,t[n+e+3]=d}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw Error(`MeshBVH: compute triangle bounds range is invalid.`);let c=a.array,l=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let d=[`getX`,`getY`,`getZ`],f=n.offset;for(let r=e,p=e+t;r<p;r++){let e=(i?i[r]:r)*3,t=(r-f)*6,p=e+0,m=e+1,h=e+2;o&&(p=o[p],m=o[m],h=o[h]),s||(p=p*u+l,m=m*u+l,h=h*u+l);for(let e=0;e<3;e++){let r,i,o;s?(r=a[d[e]](p),i=a[d[e]](m),o=a[d[e]](h)):(r=c[p+e],i=c[m+e],o=c[h+e]);let l=r;i<l&&(l=i),o<l&&(l=o);let u=r;i>u&&(u=i),o>u&&(u=o);let f=(u-l)/2,g=e*2;n[t+g+0]=l+f,n[t+g+1]=f+(Math.abs(l)+f)*Il}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;Df.copy(e.matrixWorld).invert(),Tf.copy(t.ray).applyMatrix4(Df),Of.setFromMatrixScale(e.matrixWorld),Ef.copy(Tf.direction).multiply(Of);let i=Ef.length(),a=t.near/i,o=t.far/i;if(t.firstHitOnly===!0){let i=this.raycastFirst(Tf,r,a,o);i=Cf(i,e,t),i&&n.push(i)}else{let i=this.raycast(Tf,r,a,o);for(let r=0,a=i.length;r<a;r++){let a=Cf(i[r],e,t);a&&n.push(a)}}return n}refit(e=null){return(this.indirect?ef:Od)(this,e)}raycast(e,t=0,n=0,r=1/0){let i=this._roots,a=[],o=this.indirect?tf:Nd;for(let s=0,c=i.length;s<c;s++)o(this,s,t,e,a,n,r);return a}raycastFirst(e,t=0,n=0,r=1/0){let i=this._roots,a=null,o=this.indirect?af:Id;for(let s=0,c=i.length;s<c;s++){let i=o(this,s,t,e,n,r);i!=null&&(a==null||i.distance<a.distance)&&(a=i)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,i=this.indirect?pf:Wd;for(let a=0,o=r.length;a<o&&(n=i(this,a,e,t),!n);a++);return n}shapecast(e){let t=ad.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Md:Dd});return ad.releasePrimitive(t),n}bvhcast(t,n,r){let{intersectsRanges:i,intersectsTriangles:a}=r,o=ad.getPrimitive(),s=this.geometry.index,c=this.geometry.attributes.position,l=ad.getPrimitive(),u=t.geometry.index,d=t.geometry.attributes.position;if(a){if(!(t instanceof e))throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);let r=(e,r,i,f,p,m,h,g)=>{for(let _=i,v=i+f;_<v;_++){let i=t.resolveTriangleIndex(_);wd(l,i*3,u,d),l.a.applyMatrix4(n),l.b.applyMatrix4(n),l.c.applyMatrix4(n),l.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){let e=this.resolveTriangleIndex(t);if(wd(o,e*3,s,c),o.needsUpdate=!0,a(o,l,e,i,p,m,h,g))return!0}}return!1};if(i){let e=i;i=function(t,n,i,a,o,s,c,l){return e(t,n,i,a,o,s,c,l)?!0:r(t,n,i,a,o,s,c,l)}}else i=r}return super.bvhcast(t,n,{intersectsRanges:i})}intersectsBox(e,t){return wf.set(e.min,e.max,t),wf.needsUpdate=!0,this.shapecast({intersectsBounds:e=>wf.intersectsBox(e),intersectsTriangle:e=>wf.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,a=1/0){return(this.indirect?Sf:$d)(this,e,t,n,r,i,a)}closestPointToPoint(e,t={},n=0,r=1/0){return cd(this,e,t,n,r)}},jf={Mesh:o.prototype.raycast,Line:We.prototype.raycast,LineSegments:Oe.prototype.raycast,LineLoop:Rt.prototype.raycast,Points:M.prototype.raycast,BatchedMesh:le.prototype.raycast},Mf=new o,Nf=[];function Pf(e,t){if(this.isBatchedMesh)Ff.call(this,e,t);else{let{geometry:n}=this;if(n.boundsTree)n.boundsTree.raycastObject3D(this,e,t);else{let n;if(this instanceof o)n=jf.Mesh;else if(this instanceof Oe)n=jf.LineSegments;else if(this instanceof Rt)n=jf.LineLoop;else if(this instanceof We)n=jf.Line;else if(this instanceof M)n=jf.Points;else throw Error(`BVH: Fallback raycast function not found.`);n.call(this,e,t)}}}function Ff(e,t){if(this.boundsTrees){let n=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,a=this.matrixWorld;Mf.material=this.material,Mf.geometry=this.geometry;let o=Mf.geometry.boundsTree,s=Mf.geometry.drawRange;Mf.geometry.boundingSphere===null&&(Mf.geometry.boundingSphere=new Ce);for(let o=0,s=r.length;o<s;o++){if(!this.getVisibleAt(o))continue;let s=r[o].geometryIndex;if(Mf.geometry.boundsTree=n[s],this.getMatrixAt(o,Mf.matrixWorld).premultiply(a),!Mf.geometry.boundsTree){this.getBoundingBoxAt(s,Mf.geometry.boundingBox),this.getBoundingSphereAt(s,Mf.geometry.boundingSphere);let e=i[s];Mf.geometry.setDrawRange(e.start,e.count)}Mf.raycast(e,Nf);for(let e=0,n=Nf.length;e<n;e++){let n=Nf[e];n.object=this,n.batchId=o,t.push(n)}Nf.length=0}Mf.geometry.boundsTree=o,Mf.geometry.drawRange=s,Mf.material=null,Mf.geometry=null}else jf.BatchedMesh.call(this,e,t)}function If(e,t){if(!t)return e;if(e.isInstancedMesh)throw TypeError(`Static geometry BVH installation does not replace InstancedMesh raycasting`);let n=e.geometry;return n.boundsTree=Af.deserialize(t,n,{setIndex:!1}),e.raycast=Pf,n.addEventListener(`dispose`,function e(){this.boundsTree=null,this.removeEventListener(`dispose`,e)}),e}function Lf(e){return e?[...new Set([...e.roots,e.index?.buffer,e.indirectBuffer?.buffer].filter(Boolean))]:[]}var Rf=new f(1,1,1),zf=(e,t,n)=>new Y(e,t,n);function Bf(e,t,n,r=0,i=0,a=0){let s=new o(t,typeof n==`string`?Yt[n]:n);return s.position.set(r,i,a),s.castShadow=!0,s.receiveShadow=!0,e.add(s),s}function $(e,t,n,r,i,a,o,s,c=0){let l=Bf(e,Rf,s,t,n,r);return l.scale.set(i,a,o),l.rotation.y=c,l}function Vf(e,t,n,r,i,a,o,s,c=8,l=!1){return Bf(e,new me(i,a,o,c,1,l),s,t,n,r)}function Hf(e,t,n,r,i,a,o,s,c=0){let l=Bf(e,new nt(1,c),s,t,n,r);return l.scale.set(i,a,o),l}function Uf(e,t,n,r,i,a=r){let o=t.clone().add(n).multiplyScalar(.5),s=$(e,o.x,o.y,o.z,r,t.distanceTo(n),a,i);return s.quaternion.setFromUnitVectors(zf(0,1,0),n.clone().sub(t).normalize()),s}function Wf(e,t=0,n=0,r=0,i=0){let a=new dt;return a.position.set(t,n,r),a.rotation.y=i,e.add(a),a}function Gf(e,t,n,r,i,a=`roof`){let o=[-t/2,0,-n/2,t/2,0,-n/2,0,r,-n/2,-t/2,0,n/2,t/2,0,n/2,0,r,n/2],s=new Qe;return s.setAttribute(`position`,new Le(o,3)),s.setIndex([0,2,1,3,4,5,0,3,5,0,5,2,1,2,5,1,5,4,0,1,4,0,4,3]),s.computeVertexNormals(),Bf(e,s,a,0,i,0)}function Kf(e,t,n,r,i=0){let a=[],o=[];t.forEach((e,r)=>{let s=t[Math.max(0,r-1)],c=t[Math.min(t.length-1,r+1)],l=zf(-(c.z-s.z),0,c.x-s.x).normalize().multiplyScalar(n/2);if(a.push(e.x+l.x,e.y+i,e.z+l.z,e.x-l.x,e.y+i,e.z-l.z),r<t.length-1){let e=r*2;o.push(e,e+2,e+1,e+1,e+2,e+3)}});let s=new Qe;return s.setAttribute(`position`,new Le(a,3)),s.setIndex(o),s.computeVertexNormals(),Bf(e,s,r)}function qf(e){e.updateMatrixWorld(!0);let t=e.matrixWorld.clone().invert(),n=new Map,r=new Set;e.traverse(e=>{if(!e.isMesh)return;let i=e.material;e.geometry!==Rf&&r.add(e.geometry),n.has(i)||n.set(i,[]);let a=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();if(a.deleteAttribute(`uv`),a.deleteAttribute(`tangent`),!i.vertexColors)a.deleteAttribute(`color`);else if(!a.attributes.color){let e=new Float32Array(a.attributes.position.count*3);e.fill(1),a.setAttribute(`color`,new H(e,3))}a.applyMatrix4(t.clone().multiply(e.matrixWorld)),n.get(i).push(a)}),e.clear();for(let[t,r]of n)Bf(e,$o(r,!1),t),r.forEach(e=>e.dispose());return r.forEach(e=>e.dispose()),e}function Jf(e,t,n,r,i,a){let o=[],s=[];t.forEach((e,a)=>{let c=t[Math.max(0,a-1)],l=t[Math.min(t.length-1,a+1)],u=e.tangent?zf(e.tangent.z,0,-e.tangent.x).multiplyScalar(n/2):zf(l.z-c.z,0,c.x-l.x).normalize().multiplyScalar(n/2);if(o.push(e.x-u.x,e.y+r,e.z-u.z,e.x+u.x,e.y+r,e.z+u.z,e.x-u.x,e.y+i,e.z-u.z,e.x+u.x,e.y+i,e.z+u.z),a<t.length-1){let e=a*4;s.push(e+2,e+6,e+3,e+3,e+6,e+7,e,e+4,e+2,e+2,e+4,e+6,e+1,e+3,e+5,e+3,e+7,e+5,e,e+1,e+4,e+1,e+5,e+4)}});let c=(t.length-1)*4;s.push(0,2,1,1,2,3,c,c+1,c+2,c+1,c+3,c+2);let l=new Qe;return l.setAttribute(`position`,new Le(o,3)),l.setIndex(s),l.computeVertexNormals(),Bf(e,l,a)}var Yf=(e,t)=>(Math.trunc(e)%t+t)%t;function Xf(e,t=0){return Yf(t,3)===0?e===`landmark`?[{x:0,y:2.77,z:.745,rotation:0,radius:.38},{x:.745,y:2.77,z:0,rotation:Math.PI/2,radius:.38},{x:0,y:2.77,z:-.745,rotation:Math.PI,radius:.38},{x:-.745,y:2.77,z:0,rotation:-Math.PI/2,radius:.38}]:e===`civic`?[{x:0,y:3.65,z:.175,rotation:0,radius:.3}]:[]:[]}var Zf=Object.freeze([{length:.5,width:.075,z:.042,period:720},{length:.72,width:.05,z:.05,period:60}]);function Qf(e,t){return-Math.PI*2*((t===0?10/12+8/720:8/60)+(e??0)/Zf[t].period)}function $f(e,t,{palette:n,animated:r=!1}={}){let{x:i,y:a,z:o,rotation:s=0,radius:c}=t,l=Wf(e,i,a,o,s);l.name=`clock-face`;let u=Vf(l,0,0,0,c,c,.06,n?.dark??`timber`,20);u.rotation.x=Math.PI/2;let d=Vf(l,0,0,.033,c*.88,c*.88,.012,n?.trim??`trim`,20);d.rotation.x=Math.PI/2;for(let e=0;e<12;e++){let t=-e*Math.PI/6,n=e%3==0,r=$(l,-Math.sin(t)*c*.73,Math.cos(t)*c*.73,.041,c*(n?.065:.038),c*(n?.17:.1),.006,`metal`);r.rotation.z=t,r.castShadow=!1}if(!r)for(let[e,t]of Zf.entries()){let n=Wf(l);n.rotation.z=Qf(0,e),$(n,0,c*t.length*.43,t.z,c*t.width,c*t.length,.008,`metal`).castShadow=!1}let f=Vf(l,0,0,.047,c*.055,c*.055,.032,n?.dark??`timber`,8);return f.rotation.x=Math.PI/2,f.castShadow=!1,l}var ep=Object.freeze({legHeight:.26,legWidth:.065,legDepth:.078,stride:.045,stepLength:.2,stepLift:.026});function tp(){let e=[new nt(1,1).scale(.105,.12,.14)];e.push(new f(.13,.15,.13).translate(0,-.035,-.08).toNonIndexed());for(let t of[-1,1])e.push(new f(.085,.035,.055).translate(t*.128,.025,-.02).toNonIndexed());let t=$o(e);return e.forEach(e=>e.dispose()),t}var np=.75,rp=.17,ip=Object.freeze({house:{width:2.2,depth:2.2,height:2.4},station:{width:6.4,depth:2.4,height:2.4},tree:{radius:.85,height:2.8},landmark:{radius:2,height:4.5},apartment:{radius:2.05,height:5},civic:{radius:2.8,height:5},plaza:{radius:2.6,height:.9},tower:{radius:2.1,height:8},farmPatch:{width:3,depth:4,height:1.6},cactus:{radius:.7,height:2.4},sheep:{width:.46,depth:.8,height:.53},person:{radius:rp,height:np},trainCar:{width:1.12,depth:2.4,height:1.6}}),ap=(e,t)=>(Math.trunc(e)%t+t)%t;function op(e,t,{x:n=0,y:r=0,z:i=0,rotation:a=0,scale:o=1}={}){let s=Wf(e,n,r,i,a);return s.name=t,s.scale.setScalar(o),s.userData.footprint={...ip[t]},s.userData.rigidSurfaceAsset=!0,s}function sp(e,t,n,r,i=.36,a=.44,o){let s=$(e,t,n,r+.004,i+.07,a+.07,.024,o?.trim??`trim`),c=$(e,t,n,r+.018,i,a,.012,`window`);s.castShadow=!1,c.castShadow=!1}function cp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,color:o=`plaster`,scale:s=1,palette:c}={}){let l=op(e,`house`,{x:t,y:n,z:r,rotation:i,scale:s}),u=ap(a,4),d=u===2?1.65:1.42,f=u===1?1.62:1.82,p=u===1?1.9:1.72,m=c?.roof??[`roof`,`roofBlue`,`roofLight`,`roofDark`][u],h=c?u===2?c.body:c.light:o,g=c?.trim??`trim`;$(l,0,.07,0,f+.1,.14,p+.1,`platform`),$(l,0,d/2+.12,0,f,d,p,h),$(l,0,d+.12,0,f+.06,.1,p+.06,g),u===1?Gf(Wf(l,0,0,0,Math.PI/2),p+.24,f+.24,.51,d+.16,m):Gf(l,f+.24,p+.24,.51,d+.16,m);let _=p/2;$(l,0,.53,_+.008,.34,.8,.024,c?.dark??`timber`).castShadow=!1,sp(l,-f*.29,.91,_,.36,.44,c),sp(l,f*.29,.91,_,.36,.44,c);for(let e of[-1,1])sp(Wf(l,e*f/2,0,0,e*Math.PI/2),0,.92,0,.36,.37,c);return(u===0||u===3)&&($(l,-.49,1.97,-.35,.24,.5,.28,c?.dark??`roofDark`),$(l,-.49,2.22,-.35,.29,.08,.33,g)),l}function lp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,width:a=1.25,timber:o=`timber`}={}){let s=Wf(e,t,n,r,i);s.name=`bench`;for(let e of[-1,1]){let t=e*(a/2-.17);$(s,t,.145,.115,.055,.29,.055,`metal`),$(s,t,.28,-.16,.055,.56,.055,`metal`),$(s,t,.255,-.0225,.055,.055,.33,`metal`)}for(let e of[-.105,0,.105])$(s,0,.295,e,a,.055,.09,o);for(let e of[.405,.515])$(s,0,e,-.13,a,.085,.05,o);return s}function up(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,color:a=`plaster`,palette:o}={}){let s=op(e,`station`,{x:t,y:n,z:r,rotation:i}),c=o?.trim??`trim`,l=o?.roof??`roofBlue`,u=o?.dark??`timber`;$(s,0,.1,0,6.4,.2,2.4,`platform`),$(s,0,.208,1.155,6.4,.016,.09,o?.accent??c),$(s,-1.45,.97,-.42,2.62,1.54,1.42,o?.light??a),Gf(Wf(s,-1.45,0,-.42),2.82,1.5,.49,1.73,l),$(s,-1.45,.74,.298,.5,1.07,.024,u).castShadow=!1,sp(s,-2.22,1.09,.29,.43,.53,o),sp(s,-.68,1.09,.29,.43,.53,o),$(s,1.42,1.8,-.1,2.82,.14,1.65,l),$(s,1.42,1.715,.35,2.54,.07,.1,u);for(let e of[.2,2.65])$(s,e,.955,.35,.085,1.51,.085,u);for(let e of[.78,2.06]){Vf(s,e,1.725,-.15,.105,.105,.025,u,8);let t=Vf(s,e,1.711,-.15,.075,.075,.012,`lamp`,8);t.castShadow=!1,t.receiveShadow=!1}return lp(s,{x:1.42,y:.2,z:-.56,timber:u}),$(s,2.88,.4,-.7,.27,.4,.27,o?.body??`teal`),$(s,2.88,.61,-.7,.29,.025,.29,u),s}function dp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,scale:a=1,variant:o=0}={}){let s=op(e,`tree`,{x:t,y:n,z:r,rotation:i,scale:a}),c=ap(o,9),l=c===8?1.64:c===7?1.35:1.15;if(Vf(s,0,l/2,0,.085,.13,l,c===8?`trim`:`bark`,8,!0),c<3)Vf(s,0,1.4,0,0,.8,1.45,c===1?`pineLight`:`pine`,7),Vf(s,0,2.03,0,0,.57,1.38,c===2?`pineDark`:`pineLight`,7);else if(c<6){let e=[`leaf`,`leafGold`,`leafLight`][c-3];Hf(s,0,1.55,0,.84,1.05,.84,e)}else c===6?(Uf(s,zf(0,.75,0),zf(.23,1.43,.08),.11,`bark`),Hf(s,0,1.68,0,.84,.82,.8,`leaf`)):c===7?(Uf(s,zf(0,.65,0),zf(-.29,1.29,.06),.1,`bark`),Uf(s,zf(0,.72,0),zf(.3,1.34,-.04),.09,`bark`),Hf(s,0,1.51,0,.84,.35,.8,`pineLight`)):(Uf(s,zf(0,1.12,0),zf(.22,1.67,.08),.07,`trim`),Hf(s,.07,1.85,0,.55,.88,.56,`leafLight`));return s}function fp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s,animatedClocks:c=!1}={}){let l=op(e,`landmark`,{x:t,y:n,z:r,rotation:i,scale:o}),u=ap(a,3);if(u===0){$(l,0,.1,0,2.2,.2,2.2,`platform`),$(l,0,1.74,0,1.46,3.28,1.46,`peach`),$(l,0,3.4,0,1.66,.16,1.66,`trim`),$(l,0,.28,0,1.54,.16,1.54,`trim`),$(l,0,2.21,0,1.5,.075,1.5,`trim`);for(let e of Xf(`landmark`,a))$f(l,e,{animated:c});Gf(l,1.84,1.84,.71,3.47,`roofDark`),Vf(l,0,4.25,0,.035,.045,.18,`gold`,5),$(l,0,.62,.75,.45,1.04,.05,`timber`)}else if(u===1){$(l,0,.08,0,2.02,.16,2.82,`platform`),$(l,0,.98,0,1.75,1.8,2.52,`plaster`),Gf(l,1.99,2.76,.62,1.87,`roofBlue`),$(l,0,1.67,.73,1.02,3.18,1.04,`plaster`),$(l,0,3.26,.73,1.14,.13,1.16,`trim`),Vf(l,0,3.79,.73,0,.81,.94,`teal`,4).rotation.y=Math.PI/4,sp(l,0,2.71,1.25,.33,.55),$(l,0,.62,1.285,.45,1.05,.05,`timber`);for(let e of[-1,1])$(l,e*.89,1.24,-.55,.04,.66,.38,`window`)}else{$(l,0,.07,0,2.28,.14,2.28,`platform`);for(let e of[-.54,.54]){for(let t of[-.54,.54])$(l,e,1.18,t,.13,2.08,.13,`timber`);Uf(l,zf(e,.39,-.54),zf(e,2.13,.54),.085,`timber`)}Vf(l,0,2.81,0,.96,.96,1.14,`teal`,10),Vf(l,0,2.27,0,1.01,1.01,.12,`trim`,10),Vf(l,0,3.37,0,1.01,1.01,.12,`trim`,10),Vf(l,0,3.66,0,0,1.08,.48,`roofBlue`,10)}if(s){let e=new Map(Object.entries({plaster:`light`,peach:`light`,trim:`trim`,roofDark:`roof`,roofBlue:`roof`,teal:`body`,timber:`dark`,gold:`accent`}).map(([e,t])=>[Yt[e],s[t]]));l.traverse(t=>{t.isMesh&&e.has(t.material)&&(t.material=e.get(t.material))})}return l}function pp(e){return e??{body:`peach`,light:`plaster`,dark:`roofDark`,roof:`roofBlue`,accent:`gold`,trim:`trim`}}function mp(e,t,n,r,i,a){for(let o of[0,Math.PI/2,Math.PI,Math.PI*1.5]){let s=Wf(e,0,0,0,o),c=o===Math.PI/2||o===Math.PI*1.5,l=c?n:t,u=c?t:n;for(let e=0;e<i;e++)sp(s,(e-(i-1)/2)*l/(i+.55),r,u/2,.38,.48,a)}}function hp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s,animatedClocks:c=!1}={}){let l=op(e,`civic`,{x:t,y:n,z:r,rotation:i,scale:o}),u=pp(s),d=ap(a,3);$(l,0,.09,0,3.9,.18,3.9,`platform`),$(l,0,1.31,-.15,3.35,2.26,2.72,u.light),mp(Wf(l,0,0,-.15),3.35,2.72,1.37,3,u),$(l,0,.78,1.235,.67,1.18,.06,u.dark),$(l,0,.22,1.64,2.86,.12,.47,u.trim);for(let e of[-1.27,-.66,.66,1.27])Vf(l,e,1.24,1.55,.105,.13,1.92,u.trim,8);if($(l,0,2.24,1.48,3.12,.2,.56,u.body),$(l,0,2.43,1.48,3.4,.18,.72,u.roof),Gf(Wf(l,0,0,-.15),3.7,3.02,.62,2.43,u.roof),d===0){$(l,0,3.27,-.43,1.15,1.55,1.18,u.body),$(l,0,4.05,-.43,1.3,.14,1.33,u.trim);for(let e of Xf(`civic`,a))$f(l,e,{palette:u,animated:c});Gf(Wf(l,0,0,-.43),1.5,1.53,.51,4.11,u.roof),Vf(l,0,4.7,-.43,.035,.045,.2,u.accent,6)}else if(d===1)Vf(l,0,3.06,-.14,.7,.84,.7,u.body,8),Vf(l,0,3.47,-.14,0,.89,.55,u.roof,8),Vf(l,0,3.8,-.14,.045,.065,.14,u.accent,6);else for(let e of[-1,1]){let t=Wf(l,e*1.2,0,-.67);$(t,0,3.07,0,.63,.96,.65,u.body),Gf(t,.82,.84,.44,3.52,u.roof)}return l}function gp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s}={}){let c=op(e,`plaza`,{x:t,y:n,z:r,rotation:i,scale:o}),l=pp(s),u=ap(a,3);Vf(c,0,.06,0,2.58,2.58,.12,`platform`,16),Vf(c,0,.13,0,2.43,2.43,.06,`grassLight`,16),$(c,0,.173,0,4.62,.024,.72,`sand`),$(c,0,.175,0,.72,.024,4.62,`sand`);for(let e of[-1.43,1.43])for(let t of[-1.43,1.43])Vf(c,e,.2,t,.48,.5,.16,l.trim,8),Hf(c,e,.48,t,.45,.3,.45,u===2?`leafGold`:`leaf`,0);for(let e of[-1,1])lp(c,{x:e*1.52,y:.16,rotation:-e*Math.PI/2,width:1.2,timber:l.dark});return Vf(c,0,.25,0,.78,.86,.18,l.trim,12),u===1?(Vf(c,0,.44,0,.25,.36,.34,l.body,6),Hf(c,0,.72,0,.2,.15,.2,l.accent)):(Vf(c,0,.35,0,.68,.68,.035,`waterLight`,12),Vf(c,0,.52,0,.12,.17,.34,l.body,8),Vf(c,0,.7,0,.35,.13,.1,l.trim,10),Vf(c,0,.76,0,.3,.3,.025,`waterLight`,10)),c}function _p(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,color:a=`red`,variant:o=0}={}){let s=op(e,`person`,{x:t,y:n,z:r,rotation:i});return $(s,-.055,.16,0,.075,.32,.1,`metal`),$(s,.055,.16,0,.075,.32,.1,`metal`),$(s,0,.42,0,.24,.28,.16,a),Hf(s,0,.65,0,.115,.1,.115,`peach`),ap(o,2)===1&&Vf(s,0,.725,0,.135,.135,.04,`gold`,7),s}function vp(e,{color:t=`red`,cab:n=!1,palette:r}={}){let i=op(e,`trainCar`),a=r?.body??t,o=r?.roof??`roofBlue`,s=r?.trim??`trim`;$(i,0,.34,0,.91,.19,2.1,`metal`),$(i,0,.88,0,1.02,.94,2.12,a),$(i,0,1.315,0,1.035,.06,2.14,s),$(i,0,1.405,0,1.1,.18,2.2,o),$(i,0,.65,0,1.035,.065,2.14,r?.accent??`gold`);for(let e of[-1,1]){for(let t of[-.54,.49])$(i,e*.514,1.075,t,.016,.39,.69,`window`).castShadow=!1;for(let t of[-.67,.67])Vf(i,e*.48,.22,t,.22,.22,.14,`metal`,8).rotation.z=Math.PI/2}for(let e of[-1.07,1.07])$(i,0,1.075,e,.66,.37,.025,`window`).castShadow=!1;if(n){$(i,0,.77,1.085,.86,.25,.12,a);for(let e of[-.31,.31])$(i,e,.79,1.151,.14,.13,.03,`lamp`)}return i}function yp(e){let t=new Map;for(let n of e.children){if(!n.isMesh)throw TypeError(`Color batching expects consolidated meshes`);let e=n.material,r={roughness:e.roughness??1,metalness:e.metalness??0,side:e.side,flatShading:e.flatShading,transparent:e.transparent,opacity:e.opacity},i=e.userData.sceneStyle??`asset`,a=JSON.stringify({...r,sceneStyle:i});t.has(a)||t.set(a,{properties:r,sceneStyle:i,geometries:[]});let o=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone(),s=o.attributes.position.count,c=new Float32Array(s*3),l=o.attributes.color;for(let t=0;t<s;t++)c[t*3]=e.color.r*(l?l.getX(t):1),c[t*3+1]=e.color.g*(l?l.getY(t):1),c[t*3+2]=e.color.b*(l?l.getZ(t):1);o.setAttribute(`color`,new H(c,3)),t.get(a).geometries.push(o),n.geometry.dispose()}e.clear(),e.userData.ownedMaterials??=[];for(let{properties:n,sceneStyle:r,geometries:i}of t.values()){let t=$o(i,!1);i.forEach(e=>e.dispose());let a=new y({...n,color:16777215,vertexColors:!0,name:`baked-material-colors`});a.userData.sceneStyle=r,qt(a,{kind:r}),e.userData.ownedMaterials.push(a);let s=new o(t,a);s.castShadow=!0,s.receiveShadow=!0,e.add(s)}return e}var bp=.78,xp=e=>({pine:Math.floor((e.scale??1)*7)%3,round:3,gold:4,light:5,broadleaf:6,acacia:7,birch:8})[e.variant]??0,Sp=e=>e.id??`tree:${e.x}:${e.y??0}:${e.z}`;function Cp(e,t){let n=new Map,r=new h,i=new et,a=new et,s=new B,c=new Y,l=new Y,u=new o(e.geometry,e.material),d=[],f=new Set;e.geometry.computeBoundingBox();for(let a=0;a<t.length;a++){e.getMatrixAt(a,i),r.copy(e.geometry.boundingBox).applyMatrix4(i);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++){let r=`${e}:${t}:${i}`;n.has(r)||n.set(r,[]),n.get(r).push(a)}}e.raycast=(o,p)=>{if(a.copy(e.matrixWorld).invert(),s.copy(o.ray).applyMatrix4(a),s.intersectsSphere(e.boundingSphere)){if(f.clear(),Number.isFinite(o.far)&&o.far<=64){o.ray.at(o.near,c).applyMatrix4(a),o.ray.at(o.far,l).applyMatrix4(a),r.makeEmpty().expandByPoint(c).expandByPoint(l);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++)for(let r of n.get(`${e}:${t}:${i}`)??[])f.add(r)}else for(let e=0;e<t.length;e++)f.add(e);for(let n of f)if(t[n].active){e.getMatrixAt(n,i),u.matrixWorld.multiplyMatrices(e.matrixWorld,i),d.length=0,u.raycast(o,d);for(let t of d)t.instanceId=n,t.object=e,p.push(t)}}}}function wp(e,{onChange:t=()=>{}}={}){let n=new Map,r=new Map,i=new Map,a=new Set,o=new Set,s=new et,c=new et,l=new Y,u=new Y,d=0,f=!1;function p(e){if(!n.has(e)){let t=new dt;dp(t,{variant:e}),yp(qf(t));let r=t.children[0];r.geometry.computeBoundingBox(),r.geometry.computeBoundingSphere(),n.set(e,{geometry:r.geometry,material:r.material}),t.clear()}return n.get(e)}function g(){d++,t()}function _(t,n,o,{reveal:c={value:1}}={}){if(f)throw Error(`Cannot add trees to a disposed renderer`);v(t);let u=new dt;u.name=`mutable-trees-${t}`,n.add(u);let d=new Map,m=[],g=[],_=[],y=new h,b=Zo(c),x=0,S=0;for(let e of o){let t=Sp(e);if(a.has(t)||i.has(t))continue;let n=xp(e);d.has(n)||d.set(n,[]),d.get(n).push({id:t,placement:e,active:!0,elapsed:0})}for(let[n,r]of d){let a=p(n),o=Xo(a.material.clone(),c);qt(o,{kind:a.material.userData.sceneStyle??`asset`}),g.push(o);let d=new Pe(a.geometry,o,r.length);d.name=`trees-${n}`,d.instanceMatrix.setUsage(be),d.castShadow=d.receiveShadow=!0,d.customDepthMaterial=b,d.userData.mutableTreeBatch=!0,u.add(d),m.push(d);let f=0;for(let n=0;n<r.length;n++){let a=r[n],o=a.placement,c=o.scale??1;a.mesh=d,a.index=n,a.chunk=t,a.base=Ge(e,o.x,o.y??0,o.z,o.rotation??0),s.copy(a.base).scale(l.setScalar(c)),d.setMatrixAt(n,s),i.set(a.id,a),_.push(a),f=Math.max(f,c*3.2)}d.computeBoundingBox(),d.boundingBox.expandByScalar(f),d.boundingSphere=d.boundingBox.getBoundingSphere(new Ce),y.union(d.boundingBox),Cp(d,r),x+=d.instanceMatrix.array.byteLength,S+=(a.geometry.index?.count??a.geometry.attributes.position.count)/3*r.length}let C={key:t,root:u,meshes:m,materials:g,depth:b,entries:_,bounds:y,bytes:x,triangles:S};return r.set(t,C),C}function v(e){let t=r.get(e);if(t){for(let e of t.entries)i.delete(e.id),o.delete(e);for(let e of t.meshes)e.dispose();t.materials.forEach(e=>e.dispose()),t.depth.dispose(),t.root.removeFromParent(),r.delete(e)}}function y(e){e.active=!1,a.add(e.id),g()}function b(e,{direction:t={x:1,z:0}}={}){let n=i.get(e);if(f||!n?.active)return!1;y(n),n.elapsed=0;let r=Math.hypot(t.x??0,t.z??0)||1,a=(t.x??0)/r,s=(t.z??0)/r,c=n.placement.rotation??0;return n.axis=new Y(s*Math.cos(c)+a*Math.sin(c),0,-a*Math.cos(c)+s*Math.sin(c)).normalize(),n.axis.lengthSq()<.01&&n.axis.set(0,0,-1),o.add(n),!0}function x(e){if(f||a.has(e))return!1;let t=i.get(e);return a.add(e),t&&(t.active=!1,o.delete(t),t.mesh.setMatrixAt(t.index,s.copy(t.base).scale(l.setScalar(0))),t.mesh.instanceMatrix.addUpdateRange(t.index*16,16),t.mesh.instanceMatrix.needsUpdate=!0),g(),!0}function S(e){if(f||!o.size)return;let t=new Set;for(let n of o){n.elapsed=Math.min(bp,n.elapsed+Math.max(0,e));let r=Math.min(1,n.elapsed/.6),i=m.smoothstep(n.elapsed,.58,bp);c.makeRotationAxis(u.copy(n.axis),Math.PI*.49*r*r),s.multiplyMatrices(n.base,c).scale(l.setScalar((n.placement.scale??1)*(1-i))),n.mesh.setMatrixAt(n.index,s),n.mesh.instanceMatrix.addUpdateRange(n.index*16,16),t.add(n.mesh),n.elapsed>=.78&&o.delete(n)}for(let e of t)e.instanceMatrix.needsUpdate=!0}function C(){if(!f){f=!0;for(let e of[...r.keys()])v(e);for(let e of n.values())e.geometry.dispose(),e.material.dispose();n.clear(),a.clear(),i.clear(),o.clear()}}return{addChunk:_,removeChunk:v,fellTree:b,removeTree:x,update:S,dispose:C,removed:a,get revision(){return d},get activeFalls(){return o.size},get templateCount(){return n.size},get meshes(){return[...r.values()].flatMap(e=>e.meshes)}}}var Tp=e=>Math.max(0,Math.min(1,e)),Ep=(e,t,n)=>{let r=Tp((n-e)/(t-e));return r*r*(3-2*r)},Dp={};function Op(e,t,n,r,{surface:i=!0,target:a}={}){let o=a??X.rock.clone(),s=r.x*-.55+r.y*.77+r.z*.32,c=r.y<-.15?X.rockDark:Math.abs(r.y)<.15?X.rockLight:s<.05?X.rockDark:s>.68?X.rockLight:X.rock;if(!i||r.y<.18)return o.copy(c);let l=Math.max(0,n.y)/t.height;Jc(e.terrainSource??e,n.x,n.z,{target:o}),Ht(e.terrainSource??e,n.x,n.z,Dp);let u=Ep(0,.1,o.g-o.r),d=Ep(.28,.68,Dp.patch),f=Ep(.06,.3,l)*(1-Ep(.56,.79,l));o.lerp(X.meadow,(.22+.12*Dp.moisture)*f*u),o.lerp(X.forestFloor,.32*d*u*Ep(.025,.16,l)*(1-Ep(.31,.56,l)));let p=Ep(.9,.48,r.y),m=Ep(.53,.84,l),h=Math.max(p,m)*Ep(.015,.12,l);return o.lerp(c,h)}var kp=new et,Ap=new Y;function jp(e,t,n=0,r=0,i=new Y){return Ge(e,t.x,t.y,t.z,t.angle??Math.atan2(t.tangent.x,t.tangent.z),kp),i.set(n,r,0).applyMatrix4(kp)}function Mp(e,t,n=0,r=0,i={}){return xt(e,jp(e,t,n,r,Ap),i)}function Np(e,t,n,r,i,a,o,s,c){let l=$(e,0,0,0,a,o,s,c);return Ge(t,n.x,n.y,n.z,n.angle??Math.atan2(n.tangent.x,n.tangent.z),kp),Ap.set(r,i,0).applyMatrix4(kp),kp.setPosition(Ap),l.applyMatrix4(kp),l.userData.surfaceSpace=!0,l}function Pp(e,t,n,r,i,a,o,s=0){let c=[],l=[];n.forEach((e,o)=>{Ge(t,e.x,e.y,e.z,e.angle??Math.atan2(e.tangent.x,e.tangent.z),kp);for(let[e,t]of[[s-r/2,i],[s+r/2,i],[s-r/2,a],[s+r/2,a]])Ap.set(e,t,0).applyMatrix4(kp),c.push(Ap.x,Ap.y,Ap.z);if(o<n.length-1){let e=o*4;l.push(e+2,e+6,e+3,e+3,e+6,e+7,e,e+4,e+2,e+2,e+4,e+6,e+1,e+3,e+5,e+3,e+7,e+5,e,e+1,e+4,e+1,e+5,e+4)}});let u=(n.length-1)*4;l.push(0,2,1,1,2,3,u,u+1,u+2,u+1,u+3,u+2);let d=new Qe;d.setAttribute(`position`,new Le(c,3)),d.setIndex(l),d.computeVertexNormals();let f=Bf(e,d,o);return f.userData.surfaceSpace=!0,f}var Fp=new y({name:`ocean-vertex`,color:16777215,vertexColors:!0,roughness:.52,metalness:0,flatShading:!1});Fp.userData.sceneStyle=`water`;var Ip=new y({name:`coastal-surf`,color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1});Ip.userData.sceneStyle=`surf`;function Lp(e,t,n,r,i,{surfaceRoot:a}={}){if(a&&Tt(i))return Rp(a,t,n,r,i);let o=n.start,s=n.end,c=Math.max(1,Math.ceil((s-o)/.3)),l=Array.from({length:c+1},(e,n)=>fc(t,o+(s-o)*n/c));Jf(e,l,2.42,-.465,-.215,`platform`);let u=e=>!i||i.lines.every(n=>n.id===t.id||rc(n,e.x,e.z)>=1.03);for(let n of[-1,1]){let r=l.map(e=>({...e,x:e.x+e.tangent.z*n*1.13,z:e.z-e.tangent.x*n*1.13})),i=[],a=()=>{i.length>1&&Jf(e,i,.1,.06,.18,`trim`),i=[]};for(let e of r)u(e)?i.push(e):a();a();let c=Math.max(1,Math.ceil((s-o)/2));for(let r=0;r<=c;r++){let i=fc(t,o+(s-o)*r/c),a=i.x+i.tangent.z*n*1.13,l=i.z-i.tangent.x*n*1.13;if(u({x:a,z:l})&&$(e,a,i.y-.06,l,.1,.45,.1,`platform`,i.angle),r===c)continue;let d=fc(t,o+(s-o)*(r+1)/c),f={x:d.x+d.tangent.z*n*1.13,z:d.z-d.tangent.x*n*1.13};[0,.25,.5,.75,1].every(e=>u({x:a+(f.x-a)*e,z:l+(f.z-l)*e}))&&Uf(e,zf(a,i.y-.25,l),zf(f.x,d.y+.12,f.z),.065,`platform`)}}for(let i of[n.startAbutment===!1?null:o,n.endAbutment===!1?null:s].filter(e=>e!==null)){let n=fc(t,i),a=r-.14,o=n.y-.46;$(e,n.x,(a+o)/2,n.z,2.5,o-a,.7,`rockLight`,n.angle)}}function Rp(e,t,n,r,i){let a=Ds(i,t),o=As(a,n.start),s=As(a,n.end),c=e=>fc(t,js(a,e)),l=Math.max(1,Math.ceil((s-o)/.3)),u=Array.from({length:l+1},(e,t)=>c(o+(s-o)*t/l));Pp(e,i,u,2.42,-.465,-.215,`platform`);let d=(e,n)=>{let r=Mp(i,e,n);return i.lines.every(e=>e.id===t.id||tc(i,e,r.x,r.z,1.03)>=1.03)};for(let t of[-1,1]){let n=t*1.13,r=[],a=()=>{r.length>1&&Pp(e,i,r,.1,.06,.18,`trim`,n),r=[]};for(let e of u)d(e,n)?r.push(e):a();a();let l=Math.max(1,Math.ceil((s-o)/2));for(let t=0;t<=l;t++){let r=o+(s-o)*t/l,a=c(r);if(d(a,n)&&Np(e,i,a,n,-.06,.1,.45,.1,`platform`),t===l)continue;let u=o+(s-o)*(t+1)/l,f=c(u);if([0,.25,.5,.75,1].every(e=>d(c(r+(u-r)*e),n))){let t=Uf(e,jp(i,a,n,-.25),jp(i,f,n,.12),.065,`platform`);t.userData.surfaceSpace=!0}}}for(let t of[n.startAbutment===!1?null:o,n.endAbutment===!1?null:s].filter(e=>e!==null)){let n=c(t),a=r-.14,o=n.y-.46;Np(e,i,n,0,(a+o)/2-n.y,2.5,o-a,.7,`rockLight`)}}var zp=new Y;function Bp(e,t,n){let r=fc(t,n);return Tt(e)&&(Ot(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,zp).normalize(),r.tangent={x:zp.x,y:zp.y,z:zp.z}),r}var Vp=(e,t)=>Math.hypot(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x),Hp=2.64,Up=1.2,Wp=.14,Gp=1.35,Kp=2.4,qp=.05;function Jp(e,t){let n=new Map(e.zones);for(let[e,r]of t.zones){let t=n.get(e);n.set(e,t?{min:Math.min(t.min,r.min),max:Math.max(t.max,r.max)}:{...r})}return{id:e.id,junctionIds:[...e.junctionIds,...t.junctionIds],zones:n,owner:null}}function Yp(e,t){let n=new Map;for(let r of e.lines){let i=t.get(r.id);if(i)for(let[t,a,o]of[[r.from,0,1],[r.to,r.length,-1]]){if(t===void 0)continue;let s=Bp(e,r,a),c={lineId:r.id,distance:a,sign:o,train:i,x:s.tangent.x*o,y:s.tangent.y*o,z:s.tangent.z*o,closest:o===1?i.start:r.length-i.end};n.has(t)||n.set(t,[]),n.get(t).push(c)}}let r=[];for(let[e,t]of n)for(let n=0;n<t.length;n++)for(let i=n+1;i<t.length;i++){let a=t[n],o=t[i];if(a.x*o.x+a.y*o.y+a.z*o.z<=0)continue;let s=Vp(a,o),c=Gp/Math.max(s,.01);a.closest-a.train.halfLength-Wp>=c||o.closest-o.train.halfLength-Wp>=c||r.push({id:`approach-${e}-${n}-${i}`,lines:[{lineId:a.lineId,distance:a.distance},{lineId:o.lineId,distance:o.distance}]})}return r}function Xp(e,t){let n=new Map(e.lines.map(e=>[e.id,e])),r=new Map(t.map(e=>[e.lineId,e])),i=[...e.junctions||[],...Yp(e,r)].map(t=>{let i=Gp;for(let r=0;r<t.lines.length;r++){let a=t.lines[r],o=n.get(a.lineId);if(!o)continue;let s=Bp(e,o,a.distance).tangent;for(let a of t.lines.slice(r+1)){let t=n.get(a.lineId);if(!t)continue;let r=Bp(e,t,a.distance).tangent,o=Vp(s,r);i=Math.max(i,Gp/Math.max(o,.01))}}return{id:t.id,junctionIds:[t.id],owner:null,zones:new Map(t.lines.filter(e=>r.has(e.lineId)).map(e=>[e.lineId,{min:e.distance-i,max:e.distance+i}]))}}).filter(e=>e.zones.size>1),a=!0;for(;a;){a=!1;outer:for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)for(let[n,o]of i[e].zones){let s=i[t].zones.get(n);if(s&&!(Math.max(s.min-o.max,o.min-s.max,0)>r.get(n).halfLength*2+Wp*3)){i[e]=Jp(i[e],i[t]),i.splice(t,1),a=!0;break outer}}}return i}function Zp(e,t,n=e.distance){return n+e.halfLength+Wp>=t.min&&n-e.halfLength-Wp<=t.max}function Qp(e){let t=e.lines.filter(e=>e.length>12).map((e,t)=>{let n=e.length<23?2:3,r=Hp*(n-1)/2+3.25,i=Math.max(r,e.stops?.[0]?.distance??r),a=Math.min(e.length-r,e.stops?.[1]?.distance??e.length-r);return{id:`train-${e.id}`,lineId:e.id,count:n,spacing:Hp,halfLength:Hp*(n-1)/2+Up,start:i,end:a,distance:i,direction:1,speed:2.6+t%3*.16,dwell:t*.45,active:!1,waiting:!1}}).filter(e=>e.end>e.start),n=t.length,r=e.traffic?.trainCount;if(r!==void 0){if(!Number.isInteger(r)||r<0||r>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);t.length=Math.min(t.length,r)}let i=Xp(e,t),a=new Map(t.map(e=>[e.id,e])),o=new Map(t.map(e=>[e.lineId,i.filter(t=>t.zones.has(e.lineId)).sort((t,n)=>t.zones.get(e.lineId).min-n.zones.get(e.lineId).min)]));function s(e){let t=o.get(e.lineId);for(let n of t)if(Zp(e,n.zones.get(e.lineId))&&n.owner&&n.owner!==e.id)return e.waiting=!0,!1;for(let n of t)Zp(e,n.zones.get(e.lineId))&&(n.owner=e.id);return e.active=!0,e.waiting=!1,!0}t.forEach(s);function c(e){for(let e of i){if(!e.owner)continue;let t=a.get(e.owner);Zp(t,e.zones.get(t.lineId))||(e.owner=null)}for(let n of t){if(!n.active&&!s(n))continue;n.waiting=!1;let t=Math.max(0,e-n.dwell);if(n.dwell=Math.max(0,n.dwell-e),!t)continue;let r=n.direction,i=r>0?Math.min(n.end,n.distance+t*n.speed):Math.max(n.start,n.distance-t*n.speed),a=o.get(n.lineId),c=r>0?0:a.length-1;for(let e=c;e>=0&&e<a.length;e+=r){let t=a[e],o=t.zones.get(n.lineId);if(Math.max(n.distance,i)+n.halfLength+Wp<o.min||Math.min(n.distance,i)-n.halfLength-Wp>o.max)continue;if(!t.owner||t.owner===n.id){t.owner=n.id;continue}let s=r>0?o.min-n.halfLength-Wp:o.max+n.halfLength+Wp;i=r>0?Math.max(n.distance,Math.min(i,s)):Math.min(n.distance,Math.max(i,s)),n.waiting=!0;break}n.distance=i;let l=r>0?n.end:n.start;Math.abs(n.distance-l)<1e-8&&(n.distance=l,n.direction=-r,n.dwell=Kp,n.waiting=!1)}}return{trains:t,capacity:n,get reservations(){return i.map(e=>({id:e.id,junctionIds:[...e.junctionIds],trainId:e.owner}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(e===0)return;let t=Math.ceil(e/qp);for(let n=0;n<t;n++)c(e/t)}}}var $p=2.64,em=3.84,tm=1.2,nm=.56,rm=.05,im=(e,t)=>(e%t+t)%t,am=(e,t)=>`${e}:${t}`;function om(e,t,n,r){let i=e.trainOwners?.[t]??r?.ownerId??e.cities.find(e=>e.id===n)?.ownerId??e.players?.[0]?.id??null;if(i!==null&&e.players&&!e.players.some(e=>e.id===i))throw TypeError(`Invalid world: train ${t} references an unknown player`);return i}var sm=()=>({x:0,y:0,z:0,distance:0,tangent:{x:0,y:0,z:1},angle:0,heading:0,curvature:0,lineId:null});function cm(e,t,n){if(e.alignment)return fs(e.alignment,t,n);let r=Math.max(0,Math.min(e.length,t)),i=e.points,a=e.distances,o=0,s=i.length-1;for(;o+1<s;){let e=o+s>>1;a[e]<=r?o=e:s=e}let c=i[o],l=i[s],u=a[s]-a[o],d=u>1e-9?(r-a[o])/u:0,f=l.x-c.x,p=l.y-c.y,m=l.z-c.z,h=Math.hypot(f,p,m)||1;return n.x=c.x+f*d,n.y=c.y+p*d,n.z=c.z+m*d,n.distance=r,n.tangent.x=f/h,n.tangent.y=p/h,n.tangent.z=m/h,n.curvature=void 0,n.heading=Math.atan2(m,f),n.angle=Math.atan2(f,m),n}function lm(e,t,n=sm()){n.tangent??={x:0,y:0,z:0};let r=e.closed?im(t,e.length):Math.max(0,Math.min(e.length,t)),i=e.segments,a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;r>=i[e].start+i[e].length-1e-9?a=e+1:o=e}let s=i[a],c=Math.max(0,Math.min(s.length,r-s.start));if(cm(s.line,js(s.metric,s.direction>0?c:s.length-c),n),n.distance=r,n.tangent.x*=s.direction,n.tangent.y*=s.direction,n.tangent.z*=s.direction,n.heading=Math.atan2(n.tangent.z,n.tangent.x),n.angle=Math.atan2(n.tangent.x,n.tangent.z),Number.isFinite(n.curvature)&&(n.curvature*=s.direction),n.lineId=s.lineId,e.surfaceWorld){let t=n.physical??={};Be(e.surfaceWorld,n.x,n.y,n.z,um),Ot(e.surfaceWorld,n.x,n.y,n.z,n.tangent.x,0,n.tangent.z,dm).normalize(),rt(e.surfaceWorld,n.x,n.z,fm),pm.crossVectors(fm,dm).normalize(),t.x=um.x,t.y=um.y,t.z=um.z,t.tx=dm.x,t.ty=dm.y,t.tz=dm.z,t.rx=pm.x,t.ry=pm.y,t.rz=pm.z}return n}var um=new Y,dm=new Y,fm=new Y,pm=new Y;function mm(e,t,n=!0,r){let i=0,a=e.map(e=>{let t=r?Ds(r,e.line):null,n={line:e.line,lineId:e.line.id,direction:e.direction,metric:t,start:i,length:t?.length??e.line.length};return i+=n.length,n});return{id:`circuit-${t+1}`,segments:a,length:i,closed:n,...Tt(r)?{surfaceWorld:{surface:r.surface}}:{}}}function hm(e){let t=new Map(e.lines.map(e=>[e.id,e]));if(e.traffic?.circuits){if(!Array.isArray(e.traffic.circuits))throw TypeError(`Traffic circuits must be an array`);let n=new Set;return e.traffic.circuits.map((r,i)=>{if(!Array.isArray(r.segments)||r.segments.length<2)throw TypeError(`A traffic circuit needs at least two segments`);let a=r.segments.map(e=>{let n=t.get(e.lineId),r=e.direction??1;if(!n||r!==1&&r!==-1)throw TypeError(`Traffic circuit references an invalid line or direction`);return{line:n,direction:r}}),o=mm(a,i,!0,e);if(o.id=String(r.id??o.id),n.has(o.id))throw TypeError(`Traffic circuit IDs must be unique`);n.add(o.id);for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=fc(t.line,t.direction>0?t.line.length:0),i=fc(n.line,n.direction>0?0:n.line.length),o=(r.tangent.x*i.tangent.x+r.tangent.z*i.tangent.z)*t.direction*n.direction;if(Math.hypot(r.x-i.x,r.z-i.z)>1e-4||o<.9999)throw TypeError(`Traffic circuit segments must meet with continuous tangents`)}return o})}let n=new Map(e.lines.map(e=>{let t=0;for(let n=1;n<e.points.length;n++){let r=e.points[n-1],i=e.points[n];t+=r.x*i.z-i.x*r.z}return[e.id,t]})),r=new Map(e.lines.flatMap(e=>[1,-1].map(t=>[am(e.id,t),{line:e,direction:t,key:am(e.id,t),next:[]}])));for(let t of e.transitions??[]){let e=r.get(am(t.fromLineId,t.fromEnd===`end`?1:-1)),n=r.get(am(t.toLineId,t.toEnd===`start`?1:-1));if(!e||!n||e.line===n.line)continue;let i=fc(e.line,e.direction>0?e.line.length:0),a=fc(n.line,n.direction>0?0:n.line.length),o=(i.tangent.x*a.tangent.x+i.tangent.z*a.tangent.z)*e.direction*n.direction;Math.hypot(i.x-a.x,i.z-a.z)>1e-4||o<.9999||e.next.push(n)}let i=[],a=new Set(t.keys());for(;a.size;){let e=a.values().next().value,t=new Set([e]),n=[e];for(a.delete(e);n.length;){let e=n.shift();for(let i of[1,-1])for(let o of r.get(am(e,i)).next)t.has(o.line.id)||(t.add(o.line.id),a.delete(o.line.id),n.push(o.line.id))}i.push(t)}let o=[];for(let t of i){let i=null,a=-1/0,s=0,c=[...r.values()].filter(e=>t.has(e.line.id)),l=new Map([...t].map((e,t)=>[e,t]));for(let t of c){let r=(c,u,d)=>{if(!(++s>3e4))for(let s of c.next)if(s.key===t.key&&u.length>=2){let t=new Set,r=0,s=0;for(let e of u)t.add(e.line.from),t.add(e.line.to),r+=n.get(e.line.id)*e.direction,s+=e.line.length;let c=t.size*1e7+Math.abs(r)*100+s,l=c>a?mm(u,o.length,!0,e):null;c>a&&(i=l,a=c)}else!d.has(s.line.id)&&l.get(s.line.id)>=l.get(t.line.id)&&(d.add(s.line.id),u.push(s),r(s,u,d),u.pop(),d.delete(s.line.id))};r(t,[t],new Set([t.line.id]))}i&&o.push(i)}return o}function gm(e){let t=[],n=new Map,r=new Map,i=2.8;for(let r of e){let e=Math.ceil(r.length/1.2),i=[],a=sm();for(let n=0;n<e;n++){let o=n/e*r.length;lm(r,o,a);let s=a.physical??a,c={index:t.length,path:r,distance:o,x:s.x,y:a.physical?s.y:0,z:s.z,spacing:r.length/e};t.push(c),i.push(c)}n.set(r.id,i)}let a=new Int32Array(t.length);for(let e=0;e<a.length;e++)a[e]=e;let o=new Uint8Array(t.length),s=e=>{for(;a[e]!==e;)a[e]=a[a[e]],e=a[e];return e},c=(e,t)=>{a[s(e)]=s(t),o[e]=1,o[t]=1};for(let e of t){let t=Math.floor(e.x/i),n=Math.floor(e.y/i),a=Math.floor(e.z/i),o=!!e.path.surfaceWorld;for(let s=-1;s<=1;s++)for(let l=o?-1:0;l<=+!!o;l++)for(let o=-1;o<=1;o++){let u=r.get(`${t+s},${n+l},${a+o}`);if(u)for(let t of u){let n=Math.abs(e.distance-t.distance);e.path===t.path&&Math.min(n,e.path.length-n)<11.68||(e.x-t.x)**2+(e.y-t.y)**2+(e.z-t.z)**2<i*i&&c(e.index,t.index)}}let s=`${t},${n},${a}`;r.has(s)||r.set(s,[]),r.get(s).push(e)}for(let e of n.values()){let t=null,n=null;for(let r of e)o[r.index]&&(n&&r.distance-n.distance<10.68&&c(n.index,r.index),t??=r,n=r);t&&n&&im(t.distance-n.distance,t.path.length)<10.68&&c(n.index,t.index)}let l=new Map;for(let e of t)if(o[e.index]){let t=s(e.index);l.has(t)||l.set(t,new Map);let n=l.get(t);n.has(e.path.id)||n.set(e.path.id,[]),n.get(e.path.id).push(e)}return[...l.values()].map((e,t)=>{let n=[];for(let[t,r]of e)for(let e of r){let r=n.at(-1),i=Math.max(0,e.distance-e.spacing),a=Math.min(e.path.length,e.distance+e.spacing);r?.pathId===t&&i<=r.end+1e-6?r.end=a:n.push({pathId:t,start:i,end:a})}return{id:`network-block-${t+1}`,owner:null,zones:n,queryStamp:0,waiters:new Set}})}function _m(e,t,n=e.distance){for(let r of t.zones)if(r.pathId===e.path.id)for(let t=-1;t<=1;t++){let i=n+t*e.path.length;if(i+e.halfLength+.2>=r.start&&i-e.halfLength-.2<=r.end)return!0}return!1}function vm(e,t){t.x=e.x,t.y=e.y,t.z=e.z,t.distance=e.distance,t.tangent.x=e.tangent.x,t.tangent.y=e.tangent.y,t.tangent.z=e.tangent.z,t.angle=e.angle,t.heading=e.heading,t.curvature=e.curvature,t.lineId=e.lineId,e.physical&&Object.assign(t.physical??={},e.physical)}function ym(e,t){let n=0,r=new Map((t.players??[]).map((e,t)=>[e.id,t]));for(let t of e)t.poseOffset=n,n+=t.count,t.pose=sm(),t.carPoses=Array.from({length:t.count},sm),t._nextCarPoses=Array.from({length:t.count},sm),t._cachedDistance=NaN,t._ownerIndex=r.get(t.ownerId)??0;return new Float32Array(n*6)}function bm(e,t,n){for(let r=0;r<e.count;r++)lm(e.path,t+(r-(e.count-1)/2)*e.spacing,n[r])}function xm(e,t){for(let n=0;n<e.count;n++){let r=e.carPoses[n],i=(e.poseOffset+n)*6;t[i]=r.x,t[i+1]=r.y,t[i+2]=r.z,t[i+3]=r.angle,t[i+4]=+!!e.active,t[i+5]=e._ownerIndex}}function Sm(e,t){bm(e,e.distance,e.carPoses),lm(e.path,e.distance,e.pose),e._cachedDistance=e.distance,xm(e,t)}function Cm(e,t,n,r,i,a){let o=e.tangent,s=t.tangent,c=tm*(Math.abs(n*o.x+r*o.z)+Math.abs(n*s.x+r*s.z))+nm*(Math.abs(-n*o.z+r*o.x)+Math.abs(-n*s.z+r*s.x))+.06;return Math.abs(i*n+a*r)>=c}function wm(e,t){if(e.physical&&t.physical){let n=e.physical,r=t.physical,i=r.x-n.x,a=r.y-n.y,o=r.z-n.z;if(i*i+a*a+o*o>2.7*2.7)return!1;let s=(e,t,s)=>Math.abs(i*e+a*t+o*s)>=tm*(Math.abs(e*n.tx+t*n.ty+s*n.tz)+Math.abs(e*r.tx+t*r.ty+s*r.tz))+nm*(Math.abs(e*n.rx+t*n.ry+s*n.rz)+Math.abs(e*r.rx+t*r.ry+s*r.rz))+.06;return!s(n.tx,n.ty,n.tz)&&!s(n.rx,n.ry,n.rz)&&!s(r.tx,r.ty,r.tz)&&!s(r.rx,r.ry,r.rz)}let n=t.x-e.x,r=t.z-e.z;if(n*n+r*r>2.7*2.7)return!1;let i=e.tangent,a=t.tangent;return!Cm(e,t,i.x,i.z,n,r)&&!Cm(e,t,-i.z,i.x,n,r)&&!Cm(e,t,a.x,a.z,n,r)&&!Cm(e,t,-a.z,a.x,n,r)}function Tm(e,t){if(e.some(e=>e.surfaceWorld))return Em(t);let n=1/0,r=1/0,i=-1/0;for(let t of e)for(let e of t.segments)for(let t of e.line.points)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x);let a=Math.floor(n/4)-3,o=Math.floor(r/4)-3,s=Math.ceil((i-n)/4)+8,c=new Map,l=(e,t)=>(Math.floor(t/4)-o)*s+Math.floor(e/4)-a;for(let e of t)e._cars=e.carPoses.map(t=>({train:e,pose:t,cell:null,index:0}));return{update:e=>{for(let t of e._cars){let e=l(t.pose.x,t.pose.z);if(t.cell===e)continue;if(t.cell!==null){let e=c.get(t.cell),n=e.pop();n!==t&&(e[t.index]=n,n.index=t.index)}let n=c.get(e);n||(n=[],c.set(e,n)),t.cell=e,t.index=n.length,n.push(t)}},collides:(e,t)=>{for(let n of t){let t=l(n.x,n.z);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let a=c.get(t+r*s+i);if(a){for(let t of a)if(t.train!==e&&wm(n,t.pose))return!0}}}return!1}}}function Em(e){let t=new Map,n=e=>`${Math.floor(e.x/4)},${Math.floor(e.y/4)},${Math.floor(e.z/4)}`;for(let t of e)t._cars=t.carPoses.map(e=>({train:t,pose:e,cell:null,index:0}));return{update:e=>{for(let r of e._cars){let e=n(r.pose.physical);if(r.cell===e)continue;if(r.cell!==null){let e=t.get(r.cell),n=e.pop();n!==r&&(e[r.index]=n,n.index=r.index)}let i=t.get(e);i||(i=[],t.set(e,i)),r.cell=e,r.index=i.length,i.push(r)}},collides:(e,n)=>{for(let r of n){let n=r.physical,i=Math.floor(n.x/4),a=Math.floor(n.y/4),o=Math.floor(n.z/4);for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){let l=t.get(`${i+n},${a+s},${o+c}`);if(l){for(let t of l)if(t.train!==e&&wm(r,t.pose))return!0}}}return!1}}}function Dm(e){if(!Tt(e))return e;let t=new Map(e.lines.map(t=>[t.id,Ds(e,t)]));return{...e,lines:e.lines.map(e=>{let n=t.get(e.id);return{...e,alignment:null,length:n.length,distances:e.distances.map(e=>As(n,e)),stops:e.stops?.map(e=>({...e,distance:As(n,e.distance)}))}}),junctions:e.junctions?.map(e=>({...e,lines:e.lines.map(e=>({...e,distance:As(t.get(e.lineId),e.distance)}))}))}}function Om(e,t,n,r,i){let a=0,o=e.length;for(;a<o;){let t=a+o>>1;e[t].start<=n?a=t+1:o=t}for(let n=a-1;n>=0&&e[n].maximumEnd>=t;n--){let a=e[n];a.end<t||a.block.queryStamp===r||(a.block.queryStamp=r,i.push(a.block))}}function km(e,t){let n=new Map(e.map(e=>[e.id,[]]));for(let e of t)for(let t of e.zones)n.get(t.pathId).push({...t,block:e});for(let e of n.values()){e.sort((e,t)=>e.start-t.start);let t=-1/0;for(let n of e)t=Math.max(t,n.end),n.maximumEnd=t}let r=0;return(e,t,i)=>{i.length=0;let a=n.get(e.path.id);if(!a.length)return i;let o=++r,s=e.halfLength+.2,c=e.path.length;return Om(a,t-s,t+s,o,i),t<s&&Om(a,t-s+c,c,o,i),t+s>c&&Om(a,0,t+s-c,o,i),i}}function Am(e,t){let n=t.map(e=>Math.max(0,Math.floor(e.length/12))),r=n.reduce((e,t)=>e+t,0),i=t.map((e,t)=>Math.min(n[t],Math.max(1,Math.min(new Set(e.segments.flatMap(e=>[e.line.from,e.line.to])).size,Math.floor(e.length/18))))),a=e.traffic?.trainCount;if(a===void 0)return{counts:i,requested:i.reduce((e,t)=>e+t,0),capacity:r};if(!Number.isInteger(a)||a<0||a>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);if(!r)return{counts:n,requested:a,capacity:r};let o=Math.min(a,r),s=n.map(e=>Math.floor(o*e/r)),c=o-s.reduce((e,t)=>e+t,0),l=n.map((e,t)=>({index:t,fraction:o*e/r-s[t]})).sort((e,t)=>t.fraction-e.fraction||e.index-t.index);for(let{index:e}of l)c>0&&s[e]<n[e]&&(s[e]++,c--);return{counts:s,requested:a,capacity:r}}function jm(e){let t=hm(e);if(!t.length){let t=Qp(Dm(e)),n=new Map(e.lines.map(e=>[e.id,e]));for(let r of t.trains){let t=n.get(r.lineId);r.color=t.color,r.path=mm([{line:t,direction:1}],0,!1,e),r.homeCityId=t.from,r.ownerId=om(e,r.id,t.from,t)}let r=ym(t.trains,e);for(let e of t.trains)Sm(e,r);return{trains:t.trains,mode:`shuttles`,paths:[],poseBuffer:r,poseStride:6,stats:{requestedTrainCount:e.traffic?.trainCount??t.trains.length,trainCount:t.trains.length,capacity:t.capacity},get reservations(){return t.reservations},sampleTrain:(e,t=0,n)=>lm(e.path,e.distance+t,n),update(e){t.update(e);for(let e of t.trains)Sm(e,r)}}}let n=[],r=Am(e,t);for(let[i,a]of t.entries()){let t=[...new Set(a.segments.flatMap(e=>[e.line.from,e.line.to]))],o=r.counts[i];a.trains=[];for(let r=0;r<o;r++){let i=`${a.id}-train-${r+1}`,s=t[r%t.length],c={id:i,path:a,homeCityId:s,ownerId:om(e,i,s),color:[`coral`,`teal`,`gold`,`blue`][r%4],distance:r/o*a.length,count:3,spacing:$p,halfLength:em,direction:1,speed:2.6,active:!1,waiting:!1,_leader:null};n.push(c),a.trains.push(c)}}let i=ym(n,e);for(let e of n)Sm(e,i);let a=gm(t),o=new Map(n.map(e=>[e.id,e])),s=km(t,a),c=Tm(t,n),l=[],u=[],d=[];function f(e,t,n=!1){if(e.owner===t.id)return!0;let r=e.waiters.values().next().value;return e.owner||r!==void 0&&r!==t.id?(n&&e.waiters.add(t.id),!1):!0}function p(e,t){e.owner=t.id,e.waiters.delete(t.id)}function m(e,t){if(s(e,t,l),l.some(t=>!f(t,e))||(bm(e,t,e._nextCarPoses),c.collides(e,e._nextCarPoses)))return!1;e.distance=t,Sm(e,i);for(let t of l)p(t,e);return e.active=!0,c.update(e),xm(e,i),!0}function h(e,t=!1){if(!m(e,e.distance)&&t){d.length=0;for(let t of e.path.trains)t.active&&d.push(t);if(d.sort((e,t)=>e.distance-t.distance),d.length)for(let t=0;t<d.length;t++){let n=d[t],r=d[(t+1)%d.length],i=d.length===1?e.path.length:im(r.distance-n.distance,e.path.length);if(!(i<e.halfLength*2+n.halfLength+r.halfLength+1.8)&&m(e,im(n.distance+i/2,e.path.length)))return}else for(let t=1;t<12;t++)if(m(e,e.path.length*t/12))return}}for(let e of n)h(e);function g(e){for(let e of n)e._cachedDistance!==e.distance&&(Sm(e,i),e.active&&c.update(e));for(let e of a)e.owner&&!_m(o.get(e.owner),e)&&(e.owner=null);for(let t of n)t.active||(t._spawnRetry=(t._spawnRetry??0)-e,t._spawnRetry<=0&&(h(t,!0),t._spawnRetry=.5));for(let e of t){e.trains.sort((e,t)=>e.distance-t.distance);let t=null,n=null;for(let r of e.trains)r.active&&(n&&(n._leader=r),t??=r,n=r);n&&(n._leader=n===t?null:t)}for(let t of n){if(!t.active){t.waiting=!0;continue}t.waiting=!1;let n=t.speed*e;if(t._leader){let e=t._leader,r=im(e.distance-t.distance,t.path.length)-t.halfLength-e.halfLength-.8;n=Math.min(n,Math.max(0,r))}let r=im(t.distance+n,t.path.length);s(t,r,l),s(t,t.distance,u);let a=!1;for(let e of l)f(e,t,!0)||(a=!0);for(let e of u)f(e,t,!0)||(a=!0);if(a||=(bm(t,r,t._nextCarPoses),c.collides(t,t._nextCarPoses)),a)t.waiting=!0;else{for(let e of l)p(e,t);for(let e of u)p(e,t);t.distance=r;for(let e=0;e<t.count;e++)vm(t._nextCarPoses[e],t.carPoses[e]);lm(t.path,r,t.pose),t._cachedDistance=r,c.update(t),xm(t,i)}}}return{mode:`circuits`,trains:n,paths:t,poseBuffer:i,poseStride:6,stats:{requestedTrainCount:r.requested,trainCount:n.length,capacity:r.capacity},sampleTrain:(e,t=0,n)=>lm(e.path,e.distance+t,n),get reservations(){return a.map(e=>({id:e.id,trainId:e.owner,zones:e.zones}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(!e)return;let t=Math.ceil(e/rm);for(let n=0;n<t;n++)g(e/t)}}}var Mm={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`};function Nm(e,t,{surfaceRoot:n,skipTrackBed:r=!1,skipRails:i=!1}={}){let a=!!n&&!!Tt(t),o=a?n:e;for(let s of t.lines){let c=a?Ds(t,s):null;for(let n of s.renderRanges??[{start:0,end:s.length}]){let l=As(c,n.start),u=As(c,n.end),d=Math.max(1,Math.ceil((u-l)/.3)),f=Array.from({length:d+1},(e,t)=>fc(s,js(c,l+(u-l)*t/d)));r||(a?Pp(o,t,f,1.88,-.42,-.19,`gravel`):Jf(e,f,1.88,-.42,-.19,`gravel`));let p=.4+Math.ceil((l-.4)/.85-1e-9)*.85;for(let n=p;n<Math.min(u,(c?.length??s.length)-.2)-1e-9;n+=.85){let r=fc(s,js(c,n));a?Np(o,t,r,0,-.14,1.56,.1,.23,`timber`):$(e,r.x,r.y-.14,r.z,1.56,.1,.23,`timber`,r.angle)}if(!i)for(let n of[-1,1])a?Pp(o,t,f,.095,-.09,0,`rail`,n*.46):Jf(e,f.map(e=>({x:e.x+e.tangent.z*n*.46,y:e.y,z:e.z-e.tangent.x*n*.46,tangent:e.tangent})),.095,-.09,0,`rail`)}for(let r of s.bridges)for(let i of s.renderRanges??[{start:0,end:s.length}]){let a=Math.max(r.start,i.start),o=Math.min(r.end,i.end);o-a<1e-6||Lp(e,s,{...r,start:a,end:o,startAbutment:Math.abs(a-r.start)<1e-6,endAbutment:Math.abs(o-r.end)<1e-6},t.river.y,t,{surfaceRoot:n})}}}function Pm(e,t,n={}){let r=!!Tt(t),i=n.traffic??jm(t),a=new dt;a.name=`instanced-trains`,e.add(a);let o=new Map((t.players??[]).map(e=>[e.id,Fc(e)]));a.userData.ownedMaterials=[...o.values()].flatMap(e=>Object.values(e));let s=i.trains.reduce((e,t)=>e+t.count,0),l=new Float32Array(s*6),u=new Map,d=new Map,p=0,m=!1,h=i.trains.map(e=>{let t=p;return p+=e.count,{state:e,parts:Array.from({length:e.count},(n,r)=>{let i=new c;return i.userData={trainId:e.id,poseOnly:!0,poseIndex:t+r},i}),poseOffset:t}}),g=()=>i.poseBuffer??l;function _(){let e=g();h.poseBuffer=e;for(let t of h){let n=t.state;for(let r=0;r<t.parts.length;r++){let a=t.parts[r],o=((i.poseBuffer?n.poseOffset:t.poseOffset)+r)*6;if(a.userData.poseIndex=o/6,!i.poseBuffer){let t=n.carPoses?.[r]??i.sampleTrain(n,(r-(n.count-1)/2)*n.spacing);e[o]=t.x,e[o+1]=t.y,e[o+2]=t.z,e[o+3]=t.angle,e[o+4]=+!!n.active,e[o+5]=0}a.position.set(e[o],e[o+1],e[o+2]),a.rotation.y=e[o+3]+(r===0?Math.PI:0),a.visible=e[o+4]>0}}}let v=new et,b=new et,x=new bt,S=new Ce(new Y,2.2),C=new Y,w=new _t,T=new Y(1,1,1),E=new Y(0,1,0),D=new f(.64,.74,1),O=new Float32Array(D.attributes.position.count*3);for(let e=0;e<O.length;e+=3)Yt.metal.color.toArray(O,e);D.setAttribute(`color`,new H(O,3));let k=qt(new y({color:16777215,vertexColors:!0,roughness:1,flatShading:!0}));k.name=`train-gangway`,a.userData.ownedMaterials.push(k);let A=null,j=0,M=new et,N=new et,P=new Y,F=new Y,I=new Y,L=new Y,R=new Y,z=new Y,B=new Y,V=new Y,U=new Y,W={totalTrains:h.length,totalCars:s,visibleCars:0,visibleTrains:0,visibleConnectors:0,batches:0,templates:0,uploadedMatrices:0};function ee(e,n){return r?Ge(t,e.position.x,e.position.y,e.position.z,e.rotation.y,n):(w.setFromAxisAngle(E,e.rotation.y),n.compose(e.position,w,T))}function te(t,n){ee(t,M),ee(n,N),F.setFromMatrixPosition(M),I.setFromMatrixPosition(N),V.subVectors(I,F),L.setFromMatrixColumn(M,2),R.setFromMatrixColumn(N,2);let r=L.dot(V)>=0?1:-1,i=R.dot(V)>=0?-1:1;F.set(0,.88,r*.92).applyMatrix4(M),I.set(0,.88,i*.92).applyMatrix4(N),V.subVectors(I,F);let a=V.length();return a<.02||a>2?!1:(P.copy(F).add(I).multiplyScalar(.5),S.center.copy(P).applyMatrix4(e.matrixWorld),S.radius=.85,B.setFromMatrixColumn(M,1).add(U.setFromMatrixColumn(N,1)).normalize(),V.multiplyScalar(1/a),z.crossVectors(B,V).normalize(),B.crossVectors(V,z).normalize(),v.makeBasis(z,B,V).scale(C.set(1,1,a)),v.setPosition(P),!0)}function ne(e,t){let n=`${e.state.ownerId??e.state.color}:${+!!t}`;if(!u.has(n)){let r=yp(qf(vp(new dt,{palette:o.get(e.state.ownerId),color:Mm[e.state.color]??`redLight`,cab:t})));a.userData.ownedMaterials.push(...r.userData.ownedMaterials),u.set(n,r.children.map(e=>({geometry:e.geometry,material:e.material})))}return{key:n,parts:u.get(n)}}function re(n,{mapBlend:i=0,prewarm:o=!1}={}){if(m||(a.visible=i<.999||o,W.visibleCars=0,W.visibleTrains=0,W.visibleConnectors=0,W.uploadedMatrices=0,!a.visible))return;n&&(n.updateMatrixWorld(),b.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),x.setFromProjectionMatrix(b)),e.updateWorldMatrix(!0,!1);let s=new Map,c=new Set;S.radius=2.2;for(let i of h)for(let a=0;a<i.parts.length;a++){let o=i.parts[a];if(!o.visible||(r?Be(t,o.position.x,o.position.y+.8,o.position.z,S.center):S.center.copy(o.position).addScaledVector(E,.8),S.center.applyMatrix4(e.matrixWorld),n&&!x.intersectsSphere(S)))continue;let l=a===0||a===i.parts.length-1,u=`${i.state.ownerId??i.state.color}:${+!!l}`;s.has(u)||s.set(u,{train:i,cab:l,cars:[]}),s.get(u).cars.push({train:i,part:o}),W.visibleCars++,c.add(i.state.id)}for(let[e,t]of d)s.has(e)||t.meshes.forEach(e=>{e.count=0});for(let[e,t]of s){let n=d.get(e);if(!n||n.capacity<t.cars.length){if(n)for(let e of n.meshes)a.remove(e),e.dispose();let r=ne(t.train,t.cab),i=2**Math.ceil(Math.log2(Math.max(16,t.cars.length)));n={capacity:i,meshes:r.parts.map(e=>{let n=new Pe(e.geometry,e.material,i);return n.count=0,n.instanceMatrix.setUsage(be),n.frustumCulled=!1,n.castShadow=!0,n.receiveShadow=!0,n.userData.instanceTrainIds=[],n.userData.ownerId=t.train.state.ownerId,a.add(n),n})},d.set(e,n)}for(let e=0;e<t.cars.length;e++){let{train:r,part:i}=t.cars[e];ee(i,v);for(let t of n.meshes)t.setMatrixAt(e,v),t.userData.instanceTrainIds[e]=r.state.id}for(let e of n.meshes)e.count=t.cars.length,e.userData.instanceTrainIds.length=e.count,e.instanceMatrix.clearUpdateRanges(),e.instanceMatrix.addUpdateRange(0,e.count*16),e.instanceMatrix.needsUpdate=!0,e.boundingSphere=null,W.uploadedMatrices+=e.count}let l=W.visibleCars;if(l>j&&(A&&(a.remove(A),A.dispose()),j=2**Math.ceil(Math.log2(Math.max(16,l))),A=new Pe(D,k,j),A.name=`train-gangways`,A.count=0,A.frustumCulled=!1,A.instanceMatrix.setUsage(be),A.castShadow=!0,A.receiveShadow=!0,A.userData={isTrainConnector:!0,instanceTrainIds:[]},a.add(A)),A){for(let e of h)if(c.has(e.state.id))for(let t=1;t<e.parts.length;t++){let r=e.parts[t-1],i=e.parts[t];if(r.visible&&i.visible&&te(r,i)&&(!n||x.intersectsSphere(S))){if(W.visibleConnectors>=j)break;A.setMatrixAt(W.visibleConnectors,v),A.userData.instanceTrainIds[W.visibleConnectors++]=e.state.id}}A.count=W.visibleConnectors,A.userData.instanceTrainIds.length=A.count,A.boundingSphere=null,A.instanceMatrix.clearUpdateRanges(),A.instanceMatrix.addUpdateRange(0,A.count*16),A.instanceMatrix.needsUpdate=!0,W.uploadedMatrices+=A.count}W.visibleTrains=c.size,W.batches=[...d.values()].reduce((e,t)=>e+t.meshes.length,0)+ +!!A,W.templates=u.size}function ie(){if(!m){m=!0;for(let e of d.values())e.meshes.forEach(e=>e.dispose());for(let e of u.values())e.forEach(e=>e.geometry.dispose());A?.dispose(),D.dispose(),a.userData.ownedMaterials.forEach(e=>e.dispose()),a.clear(),a.removeFromParent()}}return _(),{root:a,trains:h,traffic:i,stats:W,get poseBuffer(){return g()},update(e){if(!m){let t=performance.now();i.update(e);let n=performance.now();_(),W.simulationMs=n-t,W.poseMs=performance.now()-n}},updateView:re,dispose:ie}}Object.freeze([`meadow`,`scrub`,`dune`,`outcrop`,`frost`]);var Fm=e(Gn(),1),Im=1e5,Lm=.026;function Rm(e,t,n){let r=[];for(let i of t){if(i.points.length<2||!(i.width>0))continue;let t=i.points.map(t=>{let r=ke(e,n,t);return{X:Math.round(r.x*Im),Y:Math.round(r.z*Im)}}).filter((e,t,n)=>!t||e.X!==n[t-1].X||e.Y!==n[t-1].Y);if(t.length<2)continue;let a=new Fm.default.ClipperOffset(2,.008*Im),o=[];a.AddPath(t,Fm.default.JoinType.jtRound,Fm.default.EndType.etOpenRound),a.Execute(o,i.width*.5*Im),r.push(...o)}if(!r.length)return[];let i=new Fm.default.Clipper,a=new Fm.default.PolyTree;return i.AddPaths(r,Fm.default.PolyType.ptSubject,!0),i.Execute(Fm.default.ClipType.ctUnion,a,Fm.default.PolyFillType.pftNonZero,Fm.default.PolyFillType.pftNonZero),Fm.default.JS.PolyTreeToExPolygons(a).map(({outer:e,holes:t})=>({outer:e.map(e=>[e.X/Im,e.Y/Im]),holes:t.map(e=>e.map(e=>[e.X/Im,e.Y/Im]))}))}function zm(e,t,{surfaceRoot:n=null}={}){let r=new Map((t.cities??[]).map(e=>[e.id,e])),i=new Map,a=!!Tt(t);for(let e of t.cityStreets??[]){if(e.points.length<2)continue;let n=r.get(e.cityId),a=Number.isFinite(n?.x)&&Number.isFinite(n?.z)?n:e.points[0],o=t.biomes&&ln(t,a.x,a.z)===`desert`?`gravel`:`sand`,s=`${e.cityId??`network`}:${o}`;i.has(s)||i.set(s,{anchor:a,material:o,streets:[]}),i.get(s).streets.push(e)}let o=[];for(let{anchor:r,material:s,streets:c}of i.values()){let i=Rm(t,c,r).map(({outer:e,holes:t})=>{let n=new k(e.map(([e,t])=>new it(e,-t)));return n.holes=t.map(e=>new w(e.map(([e,t])=>new it(e,-t)))),n});if(!i.length)continue;let l=new K(i);if(l.rotateX(-Math.PI/2),a){let e=l;l=Xc(e,3),e.dispose()}let u=l.getAttribute(`position`),d={},f=new Y;for(let e=0;e<u.count;e++)Ue(t,r.x,r.z,u.getX(e),u.getZ(e),d),n?(Be(t,d.x,Lm,d.z,f),u.setXYZ(e,f.x,f.y,f.z)):u.setXYZ(e,d.x,Lm,d.z);l.computeVertexNormals();let p=Bf(n??e,l,s);p.name=`joined-city-streets`,p.userData.surfaceSpace=!!n,o.push(p)}return o}function Bm(e,t,{requestChunk:n,size:r=192,maxChunks:i=48,maxVisibleChunks:a=1/0,maxPending:s=2,maxBytes:c=134217728,uploadMesh:l}={}){if(typeof n!=`function`)throw TypeError(`Regional rendering requires a worker requestChunk function`);let u=new dt;u.name=`local-world-detail`,e.add(u);let d=new Map,f=new Map,p=new Map,g=new Map,_=new Map,b=new Map,x=new bt,S=new bt,C=new et,w=new Y,T=new Y,E=new h,D=new Y,O=Tt(t),k=new B,A=new Y,j={},M=O?new Ce(new Y(0,-O.radius,0),O.radius):null,N=new h,P=new Ce,F=new Y,I=0,L=!1,R=!1,z=[],V=``,U=0,W=[],ee=[],te=[],ne=[],re=0,ie=!0,G=t.gameplay?wp(t,{onChange(){ie=!0,re++,V=``}}):null,ae=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),oe=new Set([`water`,`surf`,`window`,`lamp`]),se=Math.max(35,...t.mountains.map(e=>e.height)),ce=[...t.cities,...t.mountains.filter(e=>!e.range),...t.stations],le=new Set(t.mountains),ue=new Map(ce.map(e=>[e,le.has(e)?e.radius??4:lt(t,e.x,e.z,e.radius??4)])),de={loadedChunks:0,visibleChunks:0,pendingChunks:0,requestedChunks:0,triangles:0,bytes:0,errors:0,requiredChunks:0,prefetchChunks:0,coverageLimited:!1,budgetOverflow:!1,maxBytes:c,uploadedMeshes:0,uploadingChunks:0,revealingChunks:0},fe=(e,t)=>{let n=JSON.stringify(e),r=t.materials.get(n);return r||(r=Xo(new y({name:e.name,color:new v().fromArray(e.color),roughness:e.roughness,metalness:e.metalness,side:e.side,flatShading:!0,vertexColors:e.vertexColors}),t.reveal),qt(r,{kind:e.sceneStyle??`asset`}),t.materials.set(n,r)),r};function pe(e){e.trees&&G.removeChunk(e.key),e.root.traverse(e=>{e.isMesh&&e.geometry.dispose()});for(let t of e.materials.values())t.dispose();e.depthMaterial?.dispose()}function me(e){pe(e),u.remove(e.root),d.delete(e.key),de.bytes-=e.bytes,de.triangles-=e.triangles,ie=!0,re++}function he(e){for(let[t,n]of p)for(;n.next<n.packet.meshes.length;){let t=n.packet.meshes[n.next++],r=new Qe;r.setAttribute(`position`,new H(t.position,3)),t.index&&r.setIndex(new H(t.index,1)),t.normal?r.setAttribute(`normal`,new H(t.normal,3)):r.computeVertexNormals(),t.color&&r.setAttribute(`color`,new H(t.color,3));let i=n.packet.bounds,a=n.packet.renderBounds;a?(r.boundingBox=new h(new Y().fromArray(a.min),new Y().fromArray(a.max)),r.boundingSphere=r.boundingBox.getBoundingSphere(new Ce)):r.boundingSphere=new Ce(new Y((i.minX+i.maxX)/2,se/2,(i.minZ+i.maxZ)/2),Math.hypot(i.maxX-i.minX,se+8,i.maxZ-i.minZ)/2),n.triangles+=(t.index?.length??t.position.length/3)/3;let s=new o(r,fe(t.material,n));If(s,t.bvh);let c=new Set([t.position.buffer,t.normal?.buffer,t.color?.buffer,t.index?.buffer,...Lf(t.bvh)].filter(Boolean));if(n.bytes+=[...c].reduce((e,t)=>e+t.byteLength,0),s.customDepthMaterial=n.depthMaterial,s.castShadow=!0,s.receiveShadow=!0,n.root.add(s),performance.now()>=e)return}}function ge(){for(let[e,t]of p){if(t.next<t.packet.meshes.length||l&&t.uploaded<t.next)continue;let n=t.packet.bounds,r=t.packet.renderBounds,i={key:e,root:t.root,bounds:r?new h(new Y().fromArray(r.min),new Y().fromArray(r.max)):new h(new Y(n.minX,-4,n.minZ),new Y(n.maxX,se,n.maxZ)),last:I,bytes:t.bytes,triangles:t.triangles,reveal:t.reveal,progress:0,materials:t.materials,depthMaterial:t.depthMaterial,lifePlacements:t.packet.lifePlacements??[],placements:t.packet.placements??[],cityStreets:t.packet.cityStreets??[],cellBounds:t.packet.cellBounds??t.packet.bounds};G&&t.packet.mutableTrees?.length&&(i.trees=G.addChunk(e,i.root,t.packet.mutableTrees,{reveal:t.reveal}),i.bounds.union(i.trees.bounds),i.bytes+=i.trees.bytes,i.triangles+=i.trees.triangles),u.add(t.root),d.set(e,i),p.delete(e),ie=!0,re++,de.bytes+=i.bytes,de.triangles+=i.triangles,de.loadedChunks=d.size}}function _e(e){e.cancelled=!0,pe(e)}function ve(){if(l)for(let[e,t]of p){if(t.warming||t.uploaded>=t.next)continue;t.warming=!0;let n=()=>{!L&&!t.cancelled&&(t.uploaded++,t.warming=!1,de.uploadedMeshes++)},r=n=>{L||t.cancelled||(_e(t),p.delete(e),b.set(e,n),de.errors++,u.userData.lastError=String(n?.message??n))};try{let e=l(t.root.children[t.uploaded]);e?.then?Promise.resolve(e).then(n,r):n()}catch(e){r(e)}return}}function ye(e,t){de.requestedChunks++;let r=new AbortController,i={controller:r},a=Promise.resolve().then(()=>n(t,{signal:r.signal}));i.promise=a,f.set(e,i),de.pendingChunks=f.size+p.size,Promise.resolve(a).then(t=>{if(f.get(e)===i&&(f.delete(e),!L&&g.has(e))){let n=new dt;n.name=`detail-${e}`;let r={value:0};p.set(e,{packet:t,root:n,next:0,uploaded:0,warming:!1,bytes:0,triangles:0,reveal:r,materials:new Map,depthMaterial:Zo(r)})}},t=>{f.get(e)===i&&(f.delete(e),L||t?.name===`AbortError`||(b.set(e,t),de.errors++,u.userData.lastError=String(t?.message??t)))}).finally(()=>{de.pendingChunks=f.size+p.size})}let be=t.outline.map(e=>e[0]),K=t.outline.map(e=>e[1]),xe={minX:Math.min(...be),maxX:Math.max(...be),minZ:Math.min(...K),maxZ:Math.max(...K)},Se=O?.complete?xe.maxX-xe.minX:0,q=O?.complete&&O.projection.type===`equirectangular`,we=q&&Array.isArray(t.biomes?.land)?[...t.biomes.land,...t.biomes.oceanShore??[],...t.biomes.lakeShore??[]].map(e=>{let t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let[n,r]of e[0])t.minX=Math.min(t.minX,n),t.maxX=Math.max(t.maxX,n),t.minZ=Math.min(t.minZ,r),t.maxZ=Math.max(t.maxZ,r);return t}):null,Te=we?[...ce.map(e=>{let t=ue.get(e);return{minX:e.x-t,maxX:e.x+t,minZ:e.z-t,maxZ:e.z+t}}),...(t.lines??[]).map(e=>{let n={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let t of e.points??[])n.minX=Math.min(n.minX,t.x),n.maxX=Math.max(n.maxX,t.x),n.minZ=Math.min(n.minZ,t.z),n.maxZ=Math.max(n.maxZ,t.z);if(Number.isFinite(n.minX)){let e=Math.max(lt(t,n.minX,n.minZ,4),lt(t,n.maxX,n.maxZ,4));n.minX-=e,n.maxX+=e,n.minZ-=e,n.maxZ+=e}return n})]:[],Ee=new Map;function J(e){if(!we)return!0;if(!Ee.has(e.key)){let t=e.x-r/2,n=e.x+r/2,i=e.z-r/2,a=e.z+r/2,o=(e,r=0)=>e.minX+r<=n&&e.maxX+r>=t&&e.minZ<=a&&e.maxZ>=i;Ee.set(e.key,we.some(e=>o(e))||Te.some(e=>o(e)||Se&&(o(e,-Se)||o(e,Se))))}return Ee.get(e.key)}function De(e){if(!q)return!0;let n=O.projection,i=Math.max(xe.minX,e.x-r/2),a=Math.min(xe.maxX,e.x+r/2),o=Math.max(xe.minZ,e.z-r/2),s=Math.min(xe.maxZ,e.z+r/2),c=n.centralLatitude*Math.PI/180-(o+s)/(2*n.radius),l=(s-o)/(2*n.radius),u=Math.cos(Math.max(0,Math.abs(c)-l));return Be(t,(i+a)/2,(se-4)/2,(o+s)/2,P.center),P.radius=(O.radius+se)*Math.hypot((a-i)/(2*n.radius)*u,l)+(se+4)/2,S.intersectsSphere(P)}let Oe=e=>Se?((e+Se/2)%Se+Se)%Se-Se/2:e;function ke(e,t){if(Se&&t-e>=Se)return[[xe.minX,xe.maxX]];if(!Se)return[[Math.max(xe.minX,e),Math.min(xe.maxX,t)]];let n=((e-xe.minX)%Se+Se)%Se+xe.minX,r=n+t-e;return r<=xe.maxX?[[n,r]]:[[n,xe.maxX],[xe.minX,r-Se]]}function Ae(e,t,n){return k.origin.set(t,n,-1).unproject(e),e.isPerspectiveCamera?k.direction.set(t,n,1).unproject(e).sub(k.origin).normalize():k.direction.copy(w),k}function je(e,n){e.updateMatrixWorld(),e.getWorldDirection(w),C.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),S.setFromProjectionMatrix(C);let r=1/0,i=-1/0,a=1/0,o=-1/0;if(O){let s=!1;N.makeEmpty();for(let c of[-4,se])for(let l of[-1,0,1])for(let u of[-1,0,1])Ae(e,l,u),M.radius=O.radius+c,k.intersectSphere(M,A)?(N.expandByPoint(A),xt(t,A,j),Se&&n&&(j.x=n.x+Oe(j.x-n.x)),r=Math.min(r,j.x),i=Math.max(i,j.x),a=Math.min(a,j.z),o=Math.max(o,j.z)):s=!0;if(s)r=xe.minX,i=xe.maxX,a=xe.minZ,o=xe.maxZ;else if(q){let n=O.projection,s=N.getSize(T),c=Math.max(4,s.lengthSq()/(8*O.radius))*n.radius/O.radius;a=Math.max(xe.minZ,a-c),o=Math.min(xe.maxZ,o+c);let l=!1;for(let n of[xe.minZ,xe.maxZ])Be(t,0,0,n,F),T.subVectors(F,M.center).dot(w)>=0||(F.project(e),Math.abs(F.x)<=1&&Math.abs(F.y)<=1&&F.z>=-1&&F.z<=1&&(l=!0,a=Math.min(a,n),o=Math.max(o,n)));if(l)r=xe.minX,i=xe.maxX;else{let e=Math.max(Math.abs(n.centralLatitude*Math.PI/180-a/n.radius),Math.abs(n.centralLatitude*Math.PI/180-o/n.radius)),t=c/Math.max(.01,Math.cos(e));r-=t,i+=t}}else{let e=Math.max(4,((i-r)**2+(o-a)**2)/(8*O.radius));r-=e,i+=e,a-=e,o+=e}}else for(let t of[-1,1])for(let n of[-1,1]){Ae(e,t,n);let s=Math.abs(k.direction.y)>1e-5?-k.origin.y/k.direction.y:-1;k.at(s>=0?s:e.far,T),r=Math.min(r,T.x),i=Math.max(i,T.x),a=Math.min(a,T.z),o=Math.max(o,T.z)}return{minX:r,maxX:i,minZ:a,maxZ:o}}function Me(t,{dt:n=0,reveal:r=!0,reducedMotion:i=!1}={}){if(L)return;e.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),C.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),x.setFromProjectionMatrix(C),de.visibleChunks=de.revealingChunks=0;let a=[];for(let t of d.values())E.copy(t.bounds).applyMatrix4(e.matrixWorld),t.root.visible=x.intersectsBox(E),t.root.visible&&(de.visibleChunks++,r&&(t.progress=i?1:Math.min(1,t.progress+Math.max(0,n)/.38),t.reveal.value=t.progress*t.progress*(3-2*t.progress)),t.progress<1?de.revealingChunks++:a.push(t));let o=`${G?.revision??0}:`+a.map(e=>e.key).join(`|`);o!==V&&(V=o,z=a.flatMap(e=>e.lifePlacements).filter(e=>e.kind!==`tree`||!G?.removed.has(e.id)),U++)}function Ne(e,{mapBlend:n=0,target:o,budgetMs:h=5,prewarm:v=!1,coverageCamera:y=e,coverageCameras:x,retainVisible:w=!1,groundFocus:T,groundRadius:E=45,groundOnly:k=!1}={}){if(L||(I++,u.visible=n<.999,!u.visible&&!v&&!T))return;let A=[];k&&T?D.set(T.x,T.y??0,T.z):o&&D.copy(o);let j=(e,n)=>({key:`${e}:${n}`,x:e+r/2,z:n+r/2,size:r,distance:O?tt(t,D,{x:e+r/2,z:m.clamp(n+r/2,xe.minZ,xe.maxZ)})**2:Oe(e+r/2-D.x)**2+(n+r/2-D.z)**2});_.clear(),g.clear();let M=[];if((u.visible||v)&&(!k||!T))for(let e of x?.length?x:[y])M.push({bounds:je(e,o),coverage:e});if(T){let e=lt(t,T.x,T.z,Math.max(.001,E));M.push({bounds:{minX:T.x-e,maxX:T.x+e,minZ:T.z-e,maxZ:T.z+e}})}for(let{bounds:e,coverage:t}of M){let{minX:n,maxX:i,minZ:a,maxZ:s}=e;t&&(C.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),S.setFromProjectionMatrix(C)),!o&&!A.length&&D.set((n+i)/2,0,(a+s)/2),A.push(e);for(let[e,o]of ke(n,i))for(let n=Math.floor(e/r)*r;n<o;n+=r)for(let e=Math.floor(Math.max(xe.minZ,a)/r)*r;e<Math.min(xe.maxZ,s);e+=r){let r=j(n,e);J(r)&&(!t||De(r))&&_.set(r.key,r)}for(let e of ce){let t=ue.get(e),o=Se?D.x+Oe(e.x-D.x):e.x;if(o+t<n||o-t>i||e.z+t<a||e.z-t>s)continue;let c=j(Math.floor(e.x/r)*r,Math.floor(e.z/r)*r);_.set(c.key,c)}}let N=[..._.values()].sort((e,t)=>e.distance-t.distance);R=!0,de.requiredChunks=_.size,de.coverageLimited=_.size>a;for(let e of N.slice(0,a))g.set(e.key,e);if(!de.coverageLimited){let e=new Map;for(let{minX:t,maxX:n,minZ:i,maxZ:a}of A)for(let[o,s]of ke(t-r,n+r))for(let t=Math.floor(o/r)*r;t<s;t+=r)for(let n=Math.floor(Math.max(xe.minZ,i-r)/r)*r;n<Math.min(xe.maxZ,a+r);n+=r){let r=j(t,n);!g.has(r.key)&&J(r)&&e.set(r.key,r)}for(let t of[...e.values()].sort((e,t)=>e.distance-t.distance)){if(g.size>=Math.min(i,_.size+36))break;g.set(t.key,t)}}de.prefetchChunks=g.size-Math.min(_.size,a);for(let[e,t]of f)g.has(e)||(f.delete(e),t.controller.abort());for(let[e,t]of p)g.has(e)||(_e(t),p.delete(e));let P=performance.now();he(P+h),ve(),ge(),Me(e);for(let e of d.values())(g.has(e.key)||w&&e.root.visible)&&(e.last=I);for(let[e,t]of g){if(f.size+p.size>=s||performance.now()-P>=h)break;let n=d.size?de.bytes/d.size:4194304;!_.has(e)&&de.bytes+n*(1+f.size+p.size)>c*.9||d.has(e)||f.has(e)||p.has(e)||b.has(e)||ye(e,t)}if(d.size>i||de.bytes>c){let e=[...d.values()].filter(e=>!_.has(e.key)&&!(w&&e.root.visible)).sort((e,t)=>Number(g.has(e.key))-Number(g.has(t.key))||e.last-t.last);for(let t of e){if(d.size<=i&&de.bytes<=c)break;me(t)}}de.budgetOverflow=de.bytes>c,de.loadedChunks=d.size,de.pendingChunks=f.size+p.size,de.uploadingChunks=l?[...p.values()].filter(e=>e.uploaded<e.next).length:0}function Pe(){if(!L){L=!0;for(let e of[...d.values()])me(e);for(let e of p.values())_e(e);for(let e of f.values())e.controller.abort();G?.dispose(),u.removeFromParent(),g.clear(),_.clear(),f.clear(),p.clear(),de.loadedChunks=de.pendingChunks=0,z=[],V=``,U++,W=[],ee=[],te=[],ne=[],ie=!1,re++}}function Fe(){if(ie){W=[],te=[],ne=[];for(let e of d.values())W.push(...e.placements.filter(e=>e.kind!==`tree`||!G?.removed.has(e.id))),te.push(...e.cityStreets),ne.push(...e.root.children.filter(e=>e.isMesh&&!oe.has(e.material.userData.sceneStyle)),...e.trees?.meshes??[]);ee=W.filter(e=>ae.has(e.kind)),ie=!1}}function Ie(e,n=0){if(L||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let i=Math.max(.001,lt(t,e.x,e.z,Math.max(0,n)));if(e.z-i<xe.minZ||e.z+i>xe.maxZ||!Se&&(e.x-i<xe.minX||e.x+i>xe.maxX))return!1;for(let[t,n]of ke(e.x-i,e.x+i))for(let a=Math.floor(t/r)*r;a<n;a+=r)for(let t=Math.floor((e.z-i)/r)*r;t<e.z+i;t+=r){let e=`${a}:${t}`;if(J({key:e,x:a+r/2,z:t+r/2})&&!d.has(e))return!1}return!0}function Le(){return!L&&R&&!de.coverageLimited&&(_.size>0||we!==null)&&[..._.keys()].every(e=>d.has(e))}return{root:u,update:Ne,updateVisibility:Me,stats:de,dispose:Pe,hasCoverageAt:Ie,fellTree:(e,t)=>G?.fellTree(e,t)??!1,removeTree:e=>G?.removeTree(e)??!1,updateTrees:e=>G?.update(e),get removedTreeIds(){return G?.removed},get treeRevision(){return G?.revision??0},get placements(){return Fe(),W},get placementRevision(){return re},get cityStreets(){return Fe(),te},getSceneryPlacements(){return Fe(),W},getCollisionPlacements(){return Fe(),ee},getTerrainMeshes(){return Fe(),ne},get lifePlacements(){return z},get lifeRevision(){return U},get ready(){return Le()},get settled(){return Le()&&[..._.keys()].every(e=>{let t=d.get(e);return!t.root.visible||t.progress>=1})}}}var Vm=Object.freeze({terrain:-1.35,contour0:-.18,contour1:-.16,snow:-.14,sand:-1.24,waterLight:-1.27,ocean:-1.27,"route-paper":.025,"route-ink":.035});function Hm(e,t,n,r){let i=!!t.getAttribute(`color`),a=new y({name:e.name.replace(/^map-/,`detail-base-`),color:i?16777215:e.color,vertexColors:i,roughness:1,metalness:0,side:2,flatShading:!1,depthWrite:!0,depthTest:!0});return a.onBeforeCompile=e=>{e.uniforms.detailBaseHeight={value:n},e.uniforms.detailBaseRadius={value:r},e.vertexShader=`uniform float detailBaseHeight; uniform float detailBaseRadius;
`+e.vertexShader;let t=r>0?`normalize(position + vec3(0.0, detailBaseRadius, 0.0))`:`vec3(0.0, 1.0, 0.0)`;e.vertexShader=e.vertexShader.replace(`#include <beginnormal_vertex>`,`
      vec3 detailBaseNormal = ${t};
      vec3 objectNormal = detailBaseNormal;
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif
    `),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,r>0?`vec3 transformed = detailBaseNormal * (detailBaseRadius + detailBaseHeight) - vec3(0.0, detailBaseRadius, 0.0);`:`vec3 transformed = vec3(position.x, detailBaseHeight, position.z);`)},a.customProgramCacheKey=()=>`detail-base-${r>0?`sphere`:`plane`}-v1`,qt(a,{kind:/water|ocean/.test(e.name)?`water`:`terrain`})}function Um(e,t,n){let r=new dt;r.name=`detail-base`,e.add(r);let i=new Set,a=n.surface?.type===`sphere`?n.surface.radius:0,s=!1;return t?.traverse(e=>{if(!e.isMesh||!e.geometry?.getAttribute(`position`)||Array.isArray(e.material))return;let t=e.material.name.replace(/^map-/,``);if(!Object.hasOwn(Vm,t))return;let n=Hm(e.material,e.geometry,Vm[t],a);i.add(n);let s=new o(e.geometry,n);s.name=`detail-base-${t}`,s.castShadow=!1,s.receiveShadow=!0,s.frustumCulled=!1,r.add(s)}),{root:r,dispose(){s||(s=!0,i.forEach(e=>e.dispose()),i.clear(),r.clear(),r.removeFromParent())}}}function Wm({cities:e=256,trains:t=2048,seed:n=`continental-256`}={}){let r=Number(e),i=Number(t);if(!Number.isFinite(r)||r<8||r>4096||!Number.isInteger(r)||r%8!=0)throw TypeError(`Stress cities must be a multiple of 8 from 8 through4096`);if(!Number.isInteger(i)||i<0||i>32768)throw TypeError(`Stress trains must be an integer from 0 through32768`);let a=r/8,o=Math.ceil(Math.sqrt(a*2)),s=Math.ceil(a/o),c=o*500+300,l=s*500+300,u=c/2,d=l/2,f=s%2?250:0,p={seed:n,bounds:{width:c,depth:l},outline:[[-u,-d+100],[-u+100,-d],[u-100,-d],[u,-d+100],[u,d-100],[u-100,d],[-u+100,d],[-u,d-100]],density:1,minTurnRadius:9,cities:[],connections:[],mountains:[],river:{width:10,points:[[-u-100,f],[u+100,f]]},traffic:{trainCount:i,circuits:[]}},m=[`coral`,`teal`,`gold`,`blue`];for(let e=0;e<a;e++){let t=(e%o-(o-1)/2)*500,n=(Math.floor(e/o)-(s-1)/2)*500,r=[];for(let i=0;i<8;i++){let a=i*Math.PI/4,o=`region-${e+1}-city-${i+1}`;p.cities.push({id:o,x:t+Math.cos(a)*190,z:n+Math.sin(a)*190,level:1+(e*3+i*7)%10,ownerId:m[(e+i)%4]});let s=`regional-${e+1}-${i+1}`;p.connections.push({id:s,from:o,to:`region-${e+1}-city-${(i+1)%8+1}`}),r.push({lineId:s,direction:1})}p.traffic.circuits.push({id:`circuit-${e+1}`,segments:r}),e%o>0&&p.connections.push({id:`connector-west-${e+1}`,from:`region-${e}-city-1`,to:`region-${e+1}-city-5`}),e%o===0&&e>=o&&p.connections.push({id:`connector-north-${e+1}`,from:`region-${e-o+1}-city-3`,to:`region-${e+1}-city-7`})}for(let e=0;e<a;e+=8){let t=p.cities[e*8+5],n=p.cities[e*8+6],r=(t.x+n.x)/2,i=(t.z+n.z)/2;Math.abs(i-f)>30&&p.mountains.push({id:`regional-pass-${e+1}`,x:r,z:i,radius:23,height:24})}return p}var Gm=`modulepreload`,Km=function(e,t){return new URL(e,t).href},qm={},Jm=function(e){return e.pathname.endsWith(`.css`)},Ym=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Xm=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Km(t,n);let r=s(t),i=Jm(r);return Ym(qm,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Gm,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function Zm(e){return e.get(`layout`)??(e.has(`cities`)?`classic`:`settlement`)}async function Qm(e,t){let n=Zm(e),r={...e.has(`seed`)?{seed:e.get(`seed`)}:{},...e.has(`trains`)?{trainCount:Number(e.get(`trains`))}:{}};if(n===`settlement`){let{createSettlementWorld:e}=await Xm(async()=>{let{createSettlementWorld:e}=await import(`./settlement-world-DQKDQx1n.js`);return{createSettlementWorld:e}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);return e(r)}if(n===`island`){let{createIslandWorld:e}=await Xm(async()=>{let{createIslandWorld:e}=await import(`./island-world-CBLcu6-d.js`);return{createIslandWorld:e}},__vite__mapDeps([6,1,2,3]),import.meta.url);return e(r)}if(n===`earth`){let{createEarthWorld:e}=await Xm(async()=>{let{createEarthWorld:e}=await import(`./earth-world-xElanl2w.js`);return{createEarthWorld:e}},__vite__mapDeps([7,3,2,8,9,5]),import.meta.url);return e(r)}if(n===`europe`){let{createEuropeWorld:e}=await Xm(async()=>{let{createEuropeWorld:e}=await import(`./europe-world-Nie4vWch.js`);return{createEuropeWorld:e}},__vite__mapDeps([10,8,3,2,5]),import.meta.url);return e(r)}if(n===`stress`)return Wm({cities:e.has(`cities`)?Number(e.get(`cities`)):256,trains:e.has(`trains`)?Number(e.get(`trains`)):2048,seed:e.get(`seed`)??`continental-railway`});if([`crossroads`,`showcase`].includes(n)){let r=await fetch(new URL(`./worlds/${n}.json`,t));if(!r.ok)throw Error(`Could not load the authored world`);let i=await r.json();return e.has(`seed`)&&(i.seed=e.get(`seed`)),i}return{seed:e.get(`seed`)??27,cityCount:Number(e.get(`cities`))||8}}function $m({WorkerClass:e,MessageChannelClass:t=globalThis.MessageChannel,detailWorkers:n=e?1:globalThis.navigator?.hardwareConcurrency>=4?2:1}={}){let r=()=>e?new e(new URL(`data:text/javascript;base64,aW1wb3J0IHsgZ2VuZXJhdGVXb3JsZCxnZW5lcmF0ZVdvcmxkUmVnaW9uLHZhbGlkYXRlV29ybGQgfSBmcm9tICcuL3dvcmxkLW1vZGVsLmpzJzsKaW1wb3J0IHsgY29tcGlsZURldGFpbFBhY2tldCB9IGZyb20gJy4vZGV0YWlsLWNvbXBpbGVyLmpzJzsKaW1wb3J0IHsgY3JlYXRlTW91bnRhaW5Db250b3VycyB9IGZyb20gJy4vbW91bnRhaW4tY29udG91cnMuanMnOwppbXBvcnQgeyBwcmVwYXJlTWFwVGVycmFpbiB9IGZyb20gJy4vbWFwLXRlcnJhaW4uanMnOwppbXBvcnQgeyBjb21waWxlTWFwVGVycmFpbkdlb21ldHJ5IH0gZnJvbSAnLi9tYXAtdGVycmFpbi1nZW9tZXRyeS5qcyc7CmltcG9ydCB7cHJlcGFyZVBsYXllckJvdFNjZW5lcnl9IGZyb20gJy4vcGxheWVyLWJvdC13b3JsZC5qcyc7CgpsZXQgd29ybGQ7CmZ1bmN0aW9uIGJ1ZmZlcnNPZih2YWx1ZSxyZXN1bHQ9bmV3IFNldCgpKXsKICBpZihBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKXJlc3VsdC5hZGQodmFsdWUuYnVmZmVyKTsKICBlbHNlIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpcmVzdWx0LmFkZCh2YWx1ZSk7CiAgZWxzZSBpZih2YWx1ZSYmdHlwZW9mIHZhbHVlPT09J29iamVjdCcpZm9yKGNvbnN0IGNoaWxkIG9mIE9iamVjdC52YWx1ZXModmFsdWUpKWJ1ZmZlcnNPZihjaGlsZCxyZXN1bHQpOwogIHJldHVybiByZXN1bHQ7Cn0Kc2VsZi5vbm1lc3NhZ2U9KHtkYXRhOntpZCx0eXBlLHBheWxvYWQscG9ydH19KT0+ewogIGlmKHR5cGU9PT0nc2hhcmUtd29ybGQnKXsKICAgIHRyeXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgc2hhcmluZyBkZXRhaWwnKTsKICAgICAgY29uc3Qge21hcFRlcnJhaW4sLi4ubmV0d29ya309d29ybGQ7CiAgICAgIHBvcnQucG9zdE1lc3NhZ2Uoe3dvcmxkOm5ldHdvcmt9KTsKICAgIH1jYXRjaChlcnJvcil7cG9ydC5wb3N0TWVzc2FnZSh7ZXJyb3I6e25hbWU6ZXJyb3IubmFtZSxtZXNzYWdlOmVycm9yLm1lc3NhZ2V9fSk7fQogICAgZmluYWxseXtwb3J0LmNsb3NlKCk7fQogICAgcmV0dXJuOwogIH0KICBpZih0eXBlPT09J2F0dGFjaC1wb3J0Jyl7CiAgICBwb3J0Lm9ubWVzc2FnZT0oe2RhdGF9KT0+ewogICAgICBpZihkYXRhLmVycm9yKXNlbGYucG9zdE1lc3NhZ2Uoe2lkLGVycm9yOmRhdGEuZXJyb3J9KTsKICAgICAgZWxzZXt3b3JsZD1kYXRhLndvcmxkO3NlbGYucG9zdE1lc3NhZ2Uoe2lkLHJlc3VsdDp7cmVhZHk6dHJ1ZX19KTt9CiAgICAgIHBvcnQuY2xvc2UoKTsKICAgIH07CiAgICByZXR1cm47CiAgfQogIHRyeXsKICAgIGNvbnN0IHN0YXJ0PXBlcmZvcm1hbmNlLm5vdygpO2xldCByZXN1bHQ7CiAgICBpZih0eXBlPT09J2dlbmVyYXRlJyl7CiAgICAgIHdvcmxkPWdlbmVyYXRlV29ybGQocGF5bG9hZCx7ZGV0YWlsOiduZXR3b3JrJ30pOwogICAgICBwcmVwYXJlUGxheWVyQm90U2NlbmVyeSh3b3JsZCxnZW5lcmF0ZVdvcmxkUmVnaW9uKTsKICAgICAgZm9yKGNvbnN0IG1vdW50YWluIG9mIHdvcmxkLm1vdW50YWlucylpZihtb3VudGFpbi5yYW5nZSltb3VudGFpbi5tYXBDb250b3Vycz1jcmVhdGVNb3VudGFpbkNvbnRvdXJzKG1vdW50YWluKTsKICAgICAgd29ybGQubWFwVGVycmFpbj17bWVzaGVzOmNvbXBpbGVNYXBUZXJyYWluR2VvbWV0cnkocHJlcGFyZU1hcFRlcnJhaW4od29ybGQpLHdvcmxkKX07CiAgICAgIGNvbnN0IHZpb2xhdGlvbnM9dmFsaWRhdGVXb3JsZCh3b3JsZCk7CiAgICAgIGlmKHZpb2xhdGlvbnMubGVuZ3RoKXRocm93IG5ldyBFcnJvcihgSW52YWxpZCB3b3JsZDogJHt2aW9sYXRpb25zWzBdLmRldGFpbD8/dmlvbGF0aW9uc1swXS50eXBlfWApOwogICAgICByZXN1bHQ9e3dvcmxkLG1pbGxpc2Vjb25kczpwZXJmb3JtYW5jZS5ub3coKS1zdGFydH07CiAgICB9ZWxzZSBpZih0eXBlPT09J2NodW5rJyl7CiAgICAgIGlmKCF3b3JsZCl0aHJvdyBuZXcgRXJyb3IoJ0dlbmVyYXRlIGEgd29ybGQgYmVmb3JlIHJlcXVlc3RpbmcgZGV0YWlsJyk7CiAgICAgIGNvbnN0IHJlZ2lvbj1nZW5lcmF0ZVdvcmxkUmVnaW9uKHdvcmxkLHBheWxvYWQpOwogICAgICByZXN1bHQ9Y29tcGlsZURldGFpbFBhY2tldChyZWdpb24sd29ybGQpOwogICAgICByZXN1bHQubWlsbGlzZWNvbmRzPXBlcmZvcm1hbmNlLm5vdygpLXN0YXJ0OwogICAgfWVsc2UgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHdvcmxkIHJlcXVlc3Q6ICR7dHlwZX1gKTsKICAgIHNlbGYucG9zdE1lc3NhZ2Uoe2lkLHJlc3VsdH0sdHlwZT09PSdjaHVuayc/Wy4uLmJ1ZmZlcnNPZihyZXN1bHQpXQogICAgICA6dHlwZT09PSdnZW5lcmF0ZSc/Wy4uLmJ1ZmZlcnNPZih3b3JsZC5tYXBUZXJyYWluKV06W10pOwogIH1jYXRjaChlcnJvcil7c2VsZi5wb3N0TWVzc2FnZSh7aWQsZXJyb3I6e25hbWU6ZXJyb3IubmFtZSxtZXNzYWdlOmVycm9yLm1lc3NhZ2V9fSk7fQp9Owo=`,``+import.meta.url),{type:`module`}):new Worker(new URL(new URL(`world-worker-g_y9gzXk.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=new Map,a=[],o=[],s=0,c=!1,l,u=!1,d=!1,f={workers:1,busy:0,queued:0,completedChunks:0,lastChunkMs:0},p=()=>new DOMException(`World request cancelled`,`AbortError`),m=()=>{f.workers=c?0:o.filter(e=>e.ready&&!e.failed).length,f.busy=o.filter(e=>e.currentId!==null).length,f.queued=a.filter(e=>i.has(e.id)).length};function h(e,t,n){i.delete(e.id),e.signal?.removeEventListener(`abort`,e.abort),t?e.reject(t):e.resolve(n)}function g(e){for(let t of[...i.values()])h(t,e);a.length=0;for(let e of o)e.currentId=null;m()}function _(e,t){t.node=e,t.type===`chunk`&&u&&(e.currentId=t.id);try{e.worker.postMessage({id:t.id,type:t.type,payload:t.payload})}catch(n){e.currentId===t.id&&(e.currentId=null),h(t,n)}}function v(){if(!(c||l)){for(let e of o)if(e.ready&&!e.failed&&e.currentId===null)for(;a.length&&e.currentId===null;){let t=a.shift();i.has(t.id)&&_(e,t)}m()}}function y(e){let t={worker:r(),primary:e,ready:e,failed:!1,currentId:null};o.push(t),t.worker.onmessage=({data:e})=>{if(c||t.failed)return;if(e.id===`peer-ready`){e.error?(t.failed=!0,t.worker.terminate()):t.ready=!0,v();return}t.currentId===e.id&&(t.currentId=null);let n=i.get(e.id);if(n){if(e.error){let t=Error(e.error.message);t.name=e.error.name??`Error`,h(n,t)}else n.type===`generate`&&(u=!0,b()),n.type===`chunk`&&(f.completedChunks++,f.lastChunkMs=e.result?.milliseconds??0),h(n,null,e.result)}v()};let n=n=>{if(c||t.failed)return;let r=Error(n);if(e){l=r,g(r);return}t.failed=!0,t.ready=!1,t.worker.terminate();let o=i.get(t.currentId);t.currentId=null,o&&(o.node=null,a.unshift(o)),v()};return t.worker.onerror=e=>n(e.message||`World worker failed`),t.worker.onmessageerror=()=>n(`World worker returned an unreadable packet`),t}function b(){if(d||n<2||!t)return;d=!0;let e,r;try{e=y(!1),r=new t,e.worker.postMessage({id:`peer-ready`,type:`attach-port`,port:r.port2},[r.port2]),o[0].worker.postMessage({type:`share-world`,port:r.port1},[r.port1])}catch{r?.port1.close(),r?.port2.close(),e&&(e.failed=!0,e.worker.terminate())}m()}let x=y(!0);return{stats:f,request(e,t,{signal:n}={}){return c?Promise.reject(new DOMException(`World replaced`,`AbortError`)):l?Promise.reject(l):n?.aborted?Promise.reject(p()):new Promise((r,o)=>{let c={id:++s,type:e,payload:t,resolve:r,reject:o,signal:n};c.abort=()=>{if(i.has(c.id)){let e=a.indexOf(c);e>=0&&a.splice(e,1),h(c,p()),v()}},n?.addEventListener(`abort`,c.abort,{once:!0}),i.set(c.id,c),e===`chunk`&&u?(a.push(c),v()):_(x,c)})},dispose(){if(!c){c=!0;for(let e of o)e.worker.terminate();g(new DOMException(`World replaced`,`AbortError`))}}}}function eh(e){let t=new kt(1,1,{depthBuffer:!1}),n=new j,r=new Je,i=new Qe,a=new Ze({colorWrite:!1,depthWrite:!1,depthTest:!1,toneMapped:!1}),s=new o(i,a);s.frustumCulled=!1,n.add(s);let c=new WeakMap,l=!1;function u(e){if(c.has(e))return c.get(e);let t=new Pe(i,a,1);t.frustumCulled=!1;let n={mesh:t,idleMatrix:t.instanceMatrix,matrix:null,color:null},r=()=>{e.removeEventListener(`dispose`,r),c.delete(e),t.instanceMatrix=n.matrix??n.idleMatrix,t.instanceColor=n.color,t.dispose(),t.instanceMatrix=n.idleMatrix,t.instanceColor=null,n.matrix=null,n.color=null};return e.addEventListener(`dispose`,r),c.set(e,n),n}return{upload(a){if(l)return;let o=a.geometry,{start:c,count:d}=o.drawRange,f=e.getRenderTarget(),p=e.shadowMap.enabled,m=e.getActiveCubeFace?.()??0,h=e.getActiveMipmapLevel?.()??0,g=a.isInstancedMesh?u(a):null,_=g?.mesh??s;try{g&&(g.matrix=a.instanceMatrix,g.color=a.instanceColor,_.instanceMatrix=g.matrix,_.instanceColor=g.color,n.remove(s),n.add(_)),_.geometry=o,o.setDrawRange(0,3),e.shadowMap.enabled=!1,e.setRenderTarget(t),e.render(n,r)}finally{o.setDrawRange(c,d),_.geometry=i,g&&(_.instanceMatrix=g.idleMatrix,_.instanceColor=null,n.remove(_),n.add(s));try{e.setRenderTarget(f,m,h)}finally{e.shadowMap.enabled=p}}},dispose(){l||(l=!0,t.dispose(),i.dispose(),a.dispose())}}}var th=Object.freeze({sheep:48,flocks:6,butterflies:16,fireflies:48,radius:150,fireflyRadius:72}),nh=new Set([`tree`,`house`,`apartment`,`civic`,`tower`,`plaza`]),rh=new Set([`tree`,`farmPatch`,`plaza`]),ih=Math.PI*2,ah=24,oh=18,sh=[0,Math.PI,Math.PI,0];function ch(e){let t=String(e.id??`${e.kind}:${e.x.toFixed(3)}:${e.z.toFixed(3)}`),n=2166136261;for(let e=0;e<t.length;e++)n=Math.imul(n^t.charCodeAt(e),16777619);return(n>>>0)/4294967296}var lh=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)};function uh(e){let t=ch(e),n=e.kind===`tree`;return{seed:t,count:lh(t,17)>(n?.3:.62)?1+Math.floor(lh(t,29)*(n?5:3)):0}}function dh(e,t){return Array.from({length:t},(t,n)=>{let r=lh(e,103+n)*ih,i=.4+lh(e,131+n)*1.8;return{phase:lh(e,41+n)*ih,pace:.23+lh(e,71+n)*.32,x:Math.cos(r)*i,z:Math.sin(r)*i,drift:.12+lh(e,157+n)*.24,height:.3+lh(e,181+n)*1.65,frequency:.65+lh(e,211+n)*.8,size:.13+lh(e,239+n)*.13}})}function fh(e,t,n,r){if(e.length===r&&n>=e.at(-1).distance)return;let i={item:t,distance:n,phase:ch(t)*ih},a=e.length;for(;a>0&&e[a-1].distance>n;)a--;e.splice(a,0,i),e.length>r&&e.pop()}function ph(e,t,n,r){let i=e.scale??1,a=Math.max(0,Math.min(e.roamRadius??.12*i,(e.radius??.7*i)-.55*i)),o=n/(18+t/ih*10)+t/ih*4,s=Math.floor(o),c=o-s,l=(e,n)=>{let r=e=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},i=r(e+7)*ih,o=Math.sqrt(r(e+47))*.9*a;return(n===0?Math.sin(i):Math.cos(i))*o},u=l(s,0),d=l(s,1),f=l(s+1,0),p=l(s+1,1),h=m.clamp((c-.32)/.68,0,1),g=h*h*(3-2*h),_=Math.atan2(f-u,p-d),v=Math.atan2(u-l(s-1,0),d-l(s-1,1)),y=m.smoothstep(c,0,.32),b=Math.atan2(Math.sin(_-v),Math.cos(_-v));return r.dx=u+(f-u)*g,r.dz=d+(p-d)*g,r.heading=v+b*y,r.walking=Math.sin(h*Math.PI)**2,r.distance=Math.hypot(f-u,p-d)*g,r}function mh(e,t,n,r=th.radius){let i=[],a=[],o=[],s=!!Tt(e),c=s?Be(e,n.x,0,n.z):null,l=new Y,u=s?2*e.surface.radius*Math.sin(Math.min(Math.PI,r/e.surface.radius)/2):r;for(let r of t??[]){if(r.kind!==`sheep`&&!nh.has(r.kind)&&!rh.has(r.kind))continue;let t=s?Be(e,r.x,0,r.z,l).distanceToSquared(c):(r.x-n.x)**2+(r.z-n.z)**2;t>u**2||(r.kind===`sheep`&&fh(i,r,t,th.sheep),nh.has(r.kind)&&fh(a,r,t,th.flocks*8),rh.has(r.kind)&&fh(o,r,t,th.fireflies/3))}let d=[];for(let t of a)if(d.every(n=>tt(e,t.item,n.item)>12)&&d.push(t),d.length===th.flocks)break;return{sheep:i,flocks:d,insects:o}}function hh(){let e=new Qe;return e.setAttribute(`position`,new Le([0,0,0,.48,.015,.12,.25,0,.22],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function gh(e,t){let n=new dt;n.name=`local-life`,e.add(n);let r=[],i=[],a=!!Tt(t);function o(e,t,i,a,o=!0){let s=new Pe(t,i,a);return s.name=e,s.count=0,s.instanceMatrix.setUsage(be),s.frustumCulled=!1,s.castShadow=o,s.receiveShadow=o,n.add(s),r.push(s),s}let s=o(`grazing-sheep-wool`,new nt(1,1),Yt.white,th.sheep),c=o(`grazing-sheep-heads`,tp(),Yt.roofBlue,th.sheep),l=o(`grazing-sheep-feet`,new f(1,1,1),Yt.metal,th.sheep*4),u=qt(Yt.roofBlue.clone());i.push(u);let d=o(`local-swallow-bodies`,new nt(1,0).scale(.07,.065,.21),u,th.flocks*3,!1),p=qt(Yt.roofBlue.clone());p.side=2,i.push(p);let h=o(`local-swallow-wings`,hh(),p,th.flocks*6,!1);for(let e of[d,h]){let t=new Dt(new Float32Array(e.instanceMatrix.count),1);t.setUsage(be),e.geometry.setAttribute(`lifeVisibility`,t);let n=e.material,r=n.onBeforeCompile,i=n.customProgramCacheKey();n.transparent=!0,n.depthWrite=!1,n.forceSinglePass=!0,n.onBeforeCompile=(e,t)=>{r(e,t),e.vertexShader=`attribute float lifeVisibility; varying float faunaVisibility;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
faunaVisibility=lifeVisibility;`),e.fragmentShader=`varying float faunaVisibility;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`diffuseColor.a*=faunaVisibility;
#include <opaque_fragment>`)},n.customProgramCacheKey=()=>`${i}|fauna-fade-v1`}let g=qt(Yt.white.clone());g.side=2,i.push(g);let _=o(`meadow-butterflies`,new S(.19,.25).rotateX(-Math.PI/2).translate(.09,0,0),g,th.butterflies*2,!1),v=new gt({transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,uniforms:{night:{value:0}},vertexShader:`attribute float lifeVisibility; varying float faunaVisibility; varying vec2 vUv; varying vec3 vTint;
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
      }`});i.push(v);let y=o(`woodland-fireflies`,new S(1,1),v,th.fireflies,!1),b=new Dt(new Float32Array(th.fireflies),1);b.setUsage(be),y.geometry.setAttribute(`lifeVisibility`,b);for(let e=0;e<th.fireflies;e++)y.setColorAt(e,X.gold.clone().lerp(X.white,e%3*.12));for(let e=0;e<th.butterflies*2;e++)_.setColorAt(e,[X.gold,X.leafPink,X.lavender][Math.floor(e/2)%3]);let x=new et,C=new et,w=new et,T=new _t,E=new Y,D=new Y,O={},k=new Y(1,0,0),A=new Y(0,0,1),j=new Y,M=new Y(1/0,0,0),N=new Y(1/0,0,0),P={sheep:[],flocks:[],insects:[]},F=[],I=[],L=null,R=-1,z=NaN,B=null,V=!1,H={},U={sheep:0,birds:0,butterflies:0,fireflies:0,instances:0,selections:0,updates:0,drawCalls:r.length};function W(e,n,r,i,o,s=!1){Ue(t,e.x,e.z,n,r,O),s&&(o=ot(t,O.x,O.z,o)),a?Ge(t,O.x,i,O.z,o,x):x.makeRotationY(o).setPosition(O.x,i,O.z)}function ee(e,t,n,r,i,a=1,o=1,s=1,c=0,l=k){E.set(n,r,i),D.set(a,o,s),T.setFromAxisAngle(l,c),C.compose(E,T,D),w.multiplyMatrices(x,C),e.setMatrixAt(t,w)}function te(e,{focus:i={x:0,z:0},placements:o=[],revision:u=0,detailBlend:f=1,reducedMotion:p=!1,night:g=0}={}){if(n.visible=f>.001,!n.visible)return;p?(B===null&&(B=e),e=B):B=null,a?Be(t,i.x,0,i.z,j):j.set(i.x,0,i.z);let S=j.distanceToSquared(N)>1e-10,C=o!==L||u!==R||j.distanceToSquared(M)>36;if(C){P=mh(t,o,i),F=F.filter(({item:e})=>tt(t,e,i)<th.radius+ah);for(let n of P.flocks){if(F.length===th.flocks)break;F.every(e=>tt(t,n.item,e.item)>12)&&F.push({...n,bornAt:!Number.isFinite(z)||p||e===z?e-1:e})}I=I.filter(({item:e})=>tt(t,e,i)<th.fireflyRadius+oh);let n=I.reduce((e,t)=>e+t.count,0);for(let r of P.insects){if(n===th.fireflies)break;if(tt(t,r.item,i)>th.fireflyRadius-8)continue;let a=uh(r.item);if(!a.count||I.some(e=>e.key===(r.item.id??r.phase)))continue;let o=Math.min(a.count,th.fireflies-n);n+=o,I.push({...r,...a,count:o,members:dh(a.seed,o),key:r.item.id??r.phase,bornAt:!Number.isFinite(z)||p||e===z?e-1:e})}L=o,R=u,M.copy(j),U.selections++}if(g=m.clamp(g,0,1),v.uniforms.night.value=g,y.visible=g>.01,_.visible=g<.9,!C&&!S&&e===z&&p===V)return;z=e,V=p,N.copy(j);let w=0,T=0,E=0,O=0;for(let{item:t,phase:n}of P.sheep){let{dx:r,dz:i,heading:a,walking:o,distance:u}=ph(t,n,e,H);W(t,r,i,t.y??0,a,!0),x.scale(D.setScalar(t.scale??1)),ee(s,w,0,.31,-.035,.23,.22,.3);let d=(1-o)*(.32+Math.sin(e*.6+n)*.04);ee(c,w,0,.34-d*.08,.25,1,1,1,d);let f=u/((t.scale??1)*ep.stepLength)*ih;for(let e=0;e<4;e++){let t=e%2?.12:-.12,n=e<2?-.14:.14,r=f+sh[e],i=Math.max(0,Math.sin(r))*ep.stepLift*o,a=Math.cos(r)*ep.stride*o;ee(l,w*4+e,t,(ep.legHeight+i)/2,n+a,ep.legWidth,ep.legHeight-i,ep.legDepth)}w++}for(let{item:n,phase:r,bornAt:a}of F){let o=(1-m.smoothstep(tt(t,n,i),th.radius-20,th.radius+ah))*(p?1:m.smoothstep(e-a,0,.8));for(let t=0;t<3;t++){let i=e*.18+r+t*.13,a=2.5+t*.48;W(n,Math.sin(i)*a,Math.cos(i)*a,(n.y??0)+11+Math.sin(i*.8)*.5+t*.22,Math.PI/2+i,!0),ee(d,T,0,0,0),d.geometry.attributes.lifeVisibility.setX(T,o);let s=Math.sin(e*6.2+r+t*.7)*.43;ee(h,T*2,0,0,0,1,1,1,s,A),ee(h,T*2+1,0,0,0,1,1,1,Math.PI-s,A),h.geometry.attributes.lifeVisibility.setX(T*2,o),h.geometry.attributes.lifeVisibility.setX(T*2+1,o),T++}}for(let{item:t,phase:n}of P.insects)if((t.kind===`farmPatch`||t.kind===`plaza`)&&E<th.butterflies){let r=e*.36+n;W(t,Math.sin(r)*.7,Math.cos(r*1.3)*.6,(t.y??0)+2+Math.sin(e*1.2+n)*.22,r,!0);let i=.35+Math.sin(e*14+n)*.65;ee(_,E*2,0,0,0,1,1,1,i,A),ee(_,E*2+1,0,0,0,1,1,1,Math.PI-i,A),E++}for(let{item:n,members:r,bornAt:a}of I){let o=(1-m.smoothstep(tt(t,n,i),th.fireflyRadius-20,th.fireflyRadius+oh))*(p?1:m.smoothstep(e-a,0,1.2));for(let{phase:t,pace:i,x:a,z:s,drift:c,height:l,frequency:u,size:d}of r){W(n,a+Math.sin(e*i+t)*c,s+Math.sin(e*i*.73+t*1.7)*c,(n.y??0)+l+Math.sin(e*i*.81+t)*.12,0);let r=Math.max(0,Math.sin(e*u+t))**5;ee(y,O,0,0,0,d,d,d),b.setX(O++,o*(.06+.94*r))}}s.count=c.count=w,l.count=w*4,d.count=T,h.count=T*2,_.count=E*2,y.count=O;for(let e of r)e.count&&(e.instanceMatrix.needsUpdate=!0);if(T)for(let e of[d,h])e.geometry.attributes.lifeVisibility.needsUpdate=!0;O&&(b.needsUpdate=!0),Object.assign(U,{sheep:w,birds:T,butterflies:E,fireflies:O,instances:w+T+E+O,updates:U.updates+1})}function ne(){for(let e of r)e.geometry.dispose(),e.dispose();for(let e of i)e.dispose();n.removeFromParent()}return{root:n,stats:U,update:te,dispose:ne}}function _h(e,t){let n=gh(e,t),r=t.cities?.length<=32?vh(n.root,t):null,i=NaN,a=null;return{...n,update(e,t={}){n.update(e,t),r&&n.root.visible&&(t.reducedMotion?(a===null&&(a=e),e=a):a=null,e!==i&&(r.update(e),i=e))},dispose(){if(r){let e=new Set;r.root.traverse(t=>{t.geometry&&e.add(t.geometry)}),e.forEach(e=>e.dispose())}n.dispose()}}}function vh(e,t){let n=Wf(e),r=Us(`${t.seed}-life`),i=new c;n.name=`ambience`;let a=!!Tt(t),o=new et,s=new et,l=e=>{a&&(e.matrixAutoUpdate=!1,Ge(t,e.position.x,e.position.y,e.position.z,e.rotation.y,e.matrix),o.makeRotationFromQuaternion(e.quaternion).premultiply(s.makeRotationY(-e.rotation.y)).scale(e.scale),e.matrix.multiply(o),e.matrixWorldNeedsUpdate=!0)},u=new Pe(new f(1,.015,.055),Yt.foam,64);u.name=`river-ripples`,u.instanceMatrix.setUsage(be),u.frustumCulled=!1,n.add(u);let d=Array.from({length:t.river.length>0?64:0},()=>({s:r()*t.river.length,offset:(r()-.5)*Math.max(0,t.river.width-1.3),length:.3+r()*.7}));u.count=d.length;let p=Wf(n);p.name=`river-boat`,Hf(p,0,.14,0,.44,.24,1.08,`roofDark`),$(p,0,.24,0,.68,.12,1.55,`trim`),$(p,0,.47,-.2,.49,.39,.6,`white`),$(p,0,.51,.108,.36,.23,.025,`window`),$(p,0,.7,-.2,.63,.08,.76,`roofBlue`);for(let e of[-1,1])Uf(p,zf(e*.22,.045,-.9),zf(e*.6,.045,-2),.045,`foam`);qf(p);let m=[];if(t.river.length>0)for(let e=0;e<=t.river.length;e+=.5){let n=fc(t.river,e);oc(t,n.x,n.z,2.5)&&m.push(e)}let h=m[0]??0,g=m.at(-1)??0,_=Wf(n);_.name=`ocean-ripples`;let v=null,y=null,b=2.2;if(t.biomes?.ocean.length){for(let e=0;e<420;e++){let n=(r()-.5)*t.bounds.width,i=(r()-.5)*t.bounds.depth,a=mn(t,`ocean`,n,i);if(a>b&&(b=a,y={x:n,z:i}),e%3==0&&$t(t,[`ocean`],n,i,1.1)){let e=$(_,n,t.river.y+.055,i,.6+r()*1.1,.015,.055,`foam`,.15);e.castShadow=!1}}if(y){v=Wf(n,y.x,t.river.y+.035,y.z,-.6),v.name=`sailboat`,Hf(v,0,.17,0,.43,.23,1.13,`white`),Vf(v,0,1.36,0,.035,.04,2.55,`timber`,6);let e=new Qe().setFromPoints([zf(.03,2.6,0),zf(.03,.48,0),zf(.03,.48,.91)]);e.setIndex([0,1,2,2,1,0]),e.computeVertexNormals(),Bf(v,e,`trim`);let r=new Qe().setFromPoints([zf(.04,2.12,-.06),zf(.04,.48,-.06),zf(.04,.48,-.81)]);r.setIndex([0,1,2,2,1,0]),r.computeVertexNormals(),Bf(v,r,`gold`),qf(v)}qf(_),a&&_.traverse(e=>{e.isMesh&&It(e.geometry,t)})}let x=-t.bounds.width*.33,S=t.bounds.depth*.2,C=cc(t,x,S)+14,w=Wf(n,x,C,S);w.name=`balloon`;let T=[[0,-2],[.55,-1.65],[1.4,-.65],[1.75,.5],[1.5,1.6],[.8,2.25],[0,2.5]].map(([e,t])=>new it(e,t));for(let e=0;e<10;e++)Bf(w,new mt(T,1,e/10*Math.PI*2,Math.PI*2/10),e%2?`trim`:`redLight`);$(w,0,-2.9,0,.72,.55,.64,`timber`),$(w,0,-2.62,0,.8,.1,.72,`gold`);for(let e of[-.3,.3])for(let t of[-.25,.25])Uf(w,zf(e,-2.65,t),zf(e,-1.65,t),.035,`timber`);qf(w);let E=[];for(let e=0;e<5;e++){let t=Wf(n),r=Wf(t),i=Wf(t);t.name=`bird-${e+1}`,Uf(r,zf(0,0,0),zf(-.48,.1,.17),.065,`white`),Uf(i,zf(0,0,0),zf(.48,.1,.17),.065,`white`),Hf(t,0,0,0,.07,.07,.19,`white`),qf(r),qf(i),E.push({g:t,left:r,right:i})}let D=Math.max(10,...t.mountains.map(e=>e.height+3));return l(p),v&&l(v),l(w),E.forEach(({g:e})=>l(e)),{root:n,update(e){d.forEach((n,r)=>{let o=fc(t.river,(n.s+e*.18)%t.river.length),s=o.tangent.z,c=-o.tangent.x,l=o.x+s*n.offset,d=o.z+c*n.offset;i.position.set(l,t.river.y+.05,d),i.rotation.set(0,o.angle+Math.PI/2,0),i.scale.set(oc(t,l,d,.65)?n.length*Math.min(1,t.river.width):0,1,Math.min(1,t.river.width/.15)),a?q(t,l,i.position.y,d,i.rotation.y,i.matrix).scale(i.scale):i.updateMatrix(),u.setMatrixAt(r,i.matrix)}),u.instanceMatrix.needsUpdate=!0;let n=.5-Math.cos(e*.025)*.46;if(p.visible=!1,t.river.length>0){let r=fc(t.river,h+(g-h)*n);p.position.set(r.x,t.river.y+.035,r.z),p.rotation.y=r.angle+(Math.sin(e*.025)<0?Math.PI:0),p.visible=t.river.width>=1.6&&oc(t,r.x,r.z,2.2),l(p)}v&&(v.position.y=t.river.y+.035+Math.sin(e*.8)*.025,v.rotation.z=Math.sin(e*.7)*.025,l(v)),w.position.y=C+Math.sin(e*.35)*.3,w.rotation.y=Math.sin(e*.07)*.12,l(w),E.forEach(({g:t,left:n,right:r},i)=>{let a=e*.045+i*.09;t.position.set(Math.cos(a)*13+i*.65,D+i*.25,Math.sin(a)*7-i*.75),t.rotation.y=-a,n.rotation.z=Math.sin(e*4.5+i*.7)*.35,r.rotation.z=-n.rotation.z,l(t)})}}}function yh(e){let t=e.surface.radius,n=new dt,r=new dt,i=[];n.name=r.name=`earth-ocean`;let a;for(let[s,c]of[[r,-.65],[n,-4.5]]){let r=new ie(t+c,256,128);if(r.translate(0,-t,0),!a){let t=r.attributes.position,n=new Y,i={},o=new v;a=new Float32Array(t.count*3);for(let r=0;r<t.count;r++)n.fromBufferAttribute(t,r),xt(e,n,i),Cl(e,i.x,i.z,o),o.toArray(a,r*3)}r.setAttribute(`color`,new H(a,3));let l=qt(Dl(new Ze({color:16777215,vertexColors:!0,toneMapped:s===n}),t),{kind:`water`});i.push(r,l),s.add(new o(r,l))}let s=new ie(t+12,128,64);s.translate(0,-t,0);let c=new gt({name:`earth-atmosphere`,uniforms:{worldNight:Wt.night},side:1,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,toneMapped:!1,vertexShader:`varying vec3 rimNormal;
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
      }`}),l=new o(s,c);l.name=`earth-atmosphere`,l.castShadow=!1,l.receiveShadow=!1,r.add(l),i.push(s,c);let u=!1;return{detail:n,map:r,dispose(){u||(u=!0,n.removeFromParent(),r.removeFromParent(),i.forEach(e=>e.dispose()))}}}function bh(e){if(!Tt(e))return null;if(e.surface.complete)return yh(e);let t=e.outline,n=[],r=[],i=new dt,a=new dt;i.name=a.name=`curved-earth-section`;let s=X.ocean.clone().lerp(X.rockDark,.48).multiplyScalar(.72),c=X.ocean.clone().multiplyScalar(.76),l=new Y;function u(r){let i=[],a=[];for(let n=0;n<t.length;n++){let o=t[n],u=t[(n+1)%t.length],d=Math.max(1,Math.ceil(Math.hypot(u[0]-o[0],u[1]-o[1])/8));for(let t=0;t<d;t++){let n=[t/d,(t+1)/d].map(e=>[o[0]+(u[0]-o[0])*e,o[1]+(u[1]-o[1])*e]),f=[[...n[0],r],[...n[1],r],[...n[0],-32],[...n[1],-32]];for(let t of[0,2,1,1,2,3]){let[n,r,o]=f[t];Be(e,n,o,r,l),i.push(l.x,l.y,l.z);let u=t<2?c:s;a.push(u.r,u.g,u.b)}}}let o=new Qe;return o.setAttribute(`position`,new Le(i,3)),o.setAttribute(`color`,new Le(a,3)),o.computeVertexNormals(),n.push(o),o}let d=new k(t.map(([e,t])=>new it(e,-t))),f=new K(d);f.rotateX(-Math.PI/2),f.translate(0,-32,0);let p=Xc(f,64);f.dispose(),It(p,e),n.push(p);for(let[e,t]of[[i,-3.4],[a,0]]){let n=new Ze({vertexColors:!0,side:2,toneMapped:e===i}),a=new Ze({color:s,side:2,toneMapped:e===i});r.push(n,a),e.add(new o(u(t),n),new o(p,a))}let m=!1;return{detail:i,map:a,dispose(){m||(m=!0,i.removeFromParent(),a.removeFromParent(),n.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()))}}}function xh(e,t){let n=new Float32Array(1260),r=new Float32Array(420),i=71139,a=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);for(let e=0;e<r.length;e++)n[e*3]=a()*2-1,n[e*3+1]=a()*2-1,n[e*3+2]=a(),r[e]=a()>.94?3:1+a()*1.2;let o=new Qe;o.setAttribute(`position`,new H(n,3)),o.setAttribute(`starSize`,new H(r,1));let s=new gt({transparent:!1,depthWrite:!1,depthTest:!1,toneMapped:!1,uniforms:{worldNight:Wt.night,worldTime:Wt.time,skyColor:{value:e.background}},vertexShader:`attribute float starSize; varying float seed; void main(){seed=position.z;gl_Position=vec4(position.xy,0.999,1.0);gl_PointSize=starSize;}`,fragmentShader:`uniform float worldNight;uniform float worldTime;uniform vec3 skyColor;varying float seed;
      void main(){float glow=1.0-smoothstep(0.12,0.5,length(gl_PointCoord-0.5));
      if(glow<0.01)discard;
      float twinkle=0.82+0.18*sin(worldTime*0.4+seed*37.0);
      vec3 star=mix(vec3(0.55,0.74,1.0),vec3(1.0,0.83,0.56),seed);
      gl_FragColor=vec4(mix(skyColor,star,glow*worldNight*twinkle*0.76),1.0);
      #include <colorspace_fragment>
      }`}),c=[e,t].map(e=>{let t=new M(o,s);return t.name=`night-stars`,t.frustumCulled=!1,t.renderOrder=-1e3,t.visible=!1,e.add(t),t});return{update(){for(let e of c)e.visible=Wt.night.value>.005},dispose(){c.forEach(e=>e.removeFromParent()),o.dispose(),s.dispose()}}}var Sh=.58,Ch=e=>e*e*(3-2*e);function wh(e,{coatMaterial:n=Yt.teal,capMaterial:r=Yt.redLight,trouserMaterial:i=Yt.roofBlue}={}){let a=new dt;a.name=`walking-traveller`,e.add(a);let s=new dt;s.name=`traveller-body`,a.add(s);let c=new f(1,1,1),l=new nt(1,0),u=new me(.118,.125,.055,8),d=new k;d.moveTo(.038,-.045),d.lineTo(.038,.045),d.lineTo(-.17,.1),d.lineTo(-.17,-.1),d.closePath();let p=new t(d,{depth:.065,bevelEnabled:!1,steps:1});p.rotateY(Math.PI/2),p.translate(-.0325,0,0);let m=[c,l,u,p];function h(e,t,n,r,i,a,s,l,u,d=c){let f=new o(d,u);return f.name=t,f.position.set(n,r,i),f.scale.set(a,s,l),f.castShadow=!0,f.receiveShadow=!0,e.add(f),f}h(s,`traveller-coat`,0,.385,0,.24,.26,.16,n),h(s,`traveller-face`,0,.59,.006,.115,.1,.115,Yt.peach,l),h(s,`traveller-cap`,0,.6875,-.006,1,1,1,r,u),h(s,`cap-brim`,0,.666,.085,.18,.022,.09,r);for(let e of[-1,1])h(s,`eye`,e*.034,.603,.1,.014,.018,.015,Yt.window);let g=[],_=[];for(let e of[-1,1]){let t=new dt;t.name=e<0?`right-arm`:`left-arm`,t.position.set(e*.146,.48,0),t.rotation.order=`YXZ`,s.add(t),g.push(t),h(t,`sleeve`,0,-.06,0,.066,.15,.1,n),h(t,`mitten`,0,-.145,.008,.045,.045,.046,Yt.peach,l);let r=new dt;r.name=e<0?`right-leg`:`left-leg`,r.position.set(e*.055,.29,0),a.add(r),_.push(r),h(r,`trousers`,0,-.14,0,.075,.3,.1,i),h(r,`boot`,0,-.285,.015,.09,.08,.13,Yt.timber)}let v=g[0],y=new dt;y.name=`traveller-axe`,y.position.set(0,-.145,.008),y.scale.setScalar(.82),v.add(y),h(y,`axe-handle`,0,-.105,0,.037,.33,.041,Yt.timber),h(y,`axe-head`,0,-.225,0,1,1,1,Yt.rail,p);let b=new Ze({color:1522743,transparent:!0,opacity:.16,depthWrite:!1}),x=new z(.18,16);m.push(x);let S=new o(x,b);return S.matrixAutoUpdate=!1,S.name=`traveller-contact-shadow`,e.add(S),{root:a,body:s,arms:g,legs:_,rightArm:v,axe:y,shadow:S,dispose(){m.forEach(e=>e.dispose()),b.dispose()}}}function Th(e,{gait:t=0,moving:n=0,running:r=0,grounded:i=!0,swingElapsed:a=Sh}={}){e.body.position.y=i?Math.abs(Math.sin(t))*.008*n:0,e.body.rotation.x=i?r*n*.07:0,e.body.rotation.z=i?Math.sin(t)*n*.025:0,e.body.rotation.y=0;for(let a=0;a<2;a++){let o=t+a*Math.PI,s=i?Math.sin(o)*(.22+r*.1)*n:a===0?-.16:.16,c=i?Math.max(0,Math.cos(o))*(.024+r*.018)*n:.025,l=e.legs[a];l.rotation.x=s,l.position.y=-.035+.325*Math.cos(s)+(Math.sin(s)>0?.08:.05)*Math.abs(Math.sin(s))+c,e.arms[a].rotation.y=0,e.arms[a].position.z=0,e.arms[a].rotation.x=i?-Math.sin(o)*(a===0?.1:.24)*n:-.2,e.arms[a].rotation.z=a===0?-.1:.06}if(e.axe.rotation.y=0,a<.58){let t=a/Sh,n,r;t<.25?(n=Ch(t/.25),r=-.95*n):t<.65?(n=1,r=m.lerp(-.95,1.15,Ch((t-.25)/.4))):(n=1-Ch((t-.65)/.35),r=1.15*n),e.rightArm.rotation.set(-1.27*n,r,-.1*(1-n)),e.rightArm.position.z=.075*n,e.axe.rotation.y=Math.PI/2*n,e.body.rotation.y=r*.08}}var Eh=Object.freeze({height:np,radius:rp,speed:2.65,sprintSpeed:4.6,jumpSpeed:4.05,gravity:11.5,stepHeight:.32,maxSlope:.78,cameraDistance:2.85,cameraHeight:.5,spawnRailClearance:4.5,fov:54,near:.045,far:140}),Dh=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),Oh=Math.PI*2,kh=m.clamp,Ah=1/120,jh=Sh,Mh=e=>Math.atan2(Math.sin(e),Math.cos(e));function Nh(e,t,{getCollisionPlacements:n=()=>t.placements??[],getTerrainMeshes:r=()=>[],isReadyAt:i=()=>!0}={}){let a=new dt;a.name=`walking-player`,a.visible=!1,e.add(a);let o=wh(a),s=new pe(Eh.fov,1,Eh.near,Eh.far);s.name=`walking-camera`;let c={x:0,y:0,z:0},l={x:0,y:0,z:0},u={x:0,y:0,z:0},d={x:0,y:0,z:0},f=new et,p=new et,h=new et().makeRotationX(-Math.PI/2),g=new Y,_=new Y,v=new Y,y=new Y,b=new Y,x=new Y,S=new Y,C=new te,w=[];C.firstHitOnly=!0;let T={},E={},D={},O={},k={},A=new Y,j=cn(t.lines??[]),M={},N={},P=new Y,F=new Ce,I=!1,L=!1,R=!1,z=!0,B=0,V=0,H=Math.PI/10,U=!1,W=0,ee=0,ne=0,re=0,ie=jh,G=!1,ae=[],oe=null,se={x:1/0,y:0,z:1/0},ce=[],le=null,ue={x:1/0,z:1/0},de=0,fe=0,me=0,he=0,ge=0,_e=Eh.cameraDistance,ve={steps:0,swings:0,blocked:0,raycasts:0,obstacles:0,meshes:0,meshSelections:0};function ye(e=!1){let i=r()??[];(e||i!==oe||!Number.isFinite(se.x)||tt(t,c,se)>2||Math.abs(c.y-se.y)>2)&&(oe=i,se={...c},Be(t,c.x,c.y,c.z,P),ae=i.filter(e=>{let t=e.geometry;return t?(e.isInstancedMesh&&!e.boundingSphere&&e.computeBoundingSphere(),t.boundingSphere||t.computeBoundingSphere(),F.copy(e.boundingSphere??t.boundingSphere).applyMatrix4(e.matrixWorld),F.distanceToPoint(P)<=Eh.cameraDistance+4):!1}),ve.meshes=ae.length,ve.meshSelections++);let a=n()??[];if(e||a!==le||!Number.isFinite(ue.x)||tt(t,c,ue)>6){le=a,ue={x:c.x,z:c.z};let e=a.concat((t.stations??[]).map(e=>({...e,kind:`station`}))),n=new Set;ce=e.filter(e=>{if(!Dh.has(e.kind??(e.width&&e.depth?`station`:``)))return!1;let r=e.id??e;return!n.has(r)&&(n.add(r),tt(t,e,c)<26+(e.radius??4))}),ve.obstacles=ce.length}}function be(e,n=c.y){for(let r of ce){let i=r.kind??`station`,a=r.scale??1;if(n>(r.y??0)+(r.height??(i===`tree`?2.7:i===`rock`?.6:i===`cactus`?2.4:8))*a)continue;ke(t,r,e,T);let o;if(i===`tree`?o=.14*a:i===`cactus`?o=.31*a:i===`rock`?o=.59*a:i===`landmark`&&(o=1.35*a),o!==void 0){if(Math.hypot(T.x,T.z)<o+Eh.radius)return!0;continue}let s=ft(t,r.x,r.z,r.rotation??0),c=Math.cos(s),l=Math.sin(s),u=T.x*c-T.z*l,d=T.x*l+T.z*c,f=((r.variant??0)%4==1?1.62:1.82)*a,p=((r.variant??0)%4==1?1.9:1.72)*a;if(r.buildingType){if(r.collisionBoxes){for(let e of r.collisionBoxes)if(Math.abs(u-e.x*a)<e.width*a/2+Eh.radius&&Math.abs(d-e.z*a)<e.depth*a/2+Eh.radius)return!0;continue}f=(r.collisionWidth??r.width)*a,p=(r.collisionDepth??r.depth)*a,d-=(r.collisionOffsetZ??0)*a}else i===`station`?(u+=1.45*a,d+=.42*a,f=2.62*a,p=1.42*a):i===`apartment`?(f=2.52*a,p=2.48*a):i===`civic`?(d+=.15*a,f=3.35*a,p=2.72*a):i===`tower`&&(f=2.32*a,p=2.48*a);if(Math.abs(u)<f/2+Eh.radius&&Math.abs(d)<p/2+Eh.radius)return!0}return!1}function K(e,t,n){return ae.length?(C.set(e,t),C.near=.018,C.far=n,ve.raycasts++,w.length=0,C.intersectObjects(ae,!1,w),w[0]??null):null}function xe(e,n=void 0){let r=lc(t,e.x,e.z);if(n!==void 0&&ae.length){Be(t,e.x,n+Eh.stepHeight+.06,e.z,_),rt(t,e.x,e.z,g),b.copy(g).negate();let r=K(_,b,Eh.stepHeight+1.7);if(r){let e=n+Eh.stepHeight+.06-r.distance,t=r.face?.normal,i=t?t.dot(g):1;if(e>-.34&&i>.51)return{height:e,type:`mesh`,slope:i}}}return r}function Se(e,{height:n=c.y,spawn:r=!1}={}){let i=xe(e,r?void 0:n);if(!Number.isFinite(i.height)||[`outside`,`ocean`,`water`].includes(i.type)||i.height<-.3||be(e,n))return null;if(r)for(let[n,r]of[[.24,0],[-.24,0],[0,.24],[0,-.24]]){Ue(t,e.x,e.z,n,r,D);let a=lc(t,D.x,D.z);if([`outside`,`ocean`,`water`].includes(a.type)||Math.abs(a.height-i.height)>.24*Eh.maxSlope)return null}return i}function q(e={x:0,z:0}){if(R)return null;let n={x:Number.isFinite(e.x)?e.x:0,z:Number.isFinite(e.z)?e.z:0},r={...c};c.x=n.x,c.z=n.z,ye(!0);let i=[n,...[...t.cities??[]].sort((e,r)=>tt(t,e,n)-tt(t,r,n)).slice(0,3)],a=null;for(let e of i){c.x=e.x,c.z=e.z,ye(!0);for(let n=0;n<=12&&!a;n++){let r=n?Math.max(8,Math.ceil(n*5)):1;for(let i=0;i<r;i++){let o=i/r*Oh+.31*n;if(Ue(t,e.x,e.z,Math.sin(o)*n*.8,Math.cos(o)*n*.8,E),Cs(t,j,E.x,E.z,lt(t,E.x,E.z,Eh.spawnRailClearance)).some(({a:e,b:n})=>(ke(t,E,e,M),ke(t,E,n,N),Ws(0,0,M,N)<Eh.spawnRailClearance)))continue;let s=Se(E,{spawn:!0,height:lc(t,E.x,E.z).height});if(s){a={x:E.x,y:s.height+.035,z:E.z};break}}}if(a)break}return Object.assign(c,r),ye(!0),a}function we(e,n,r=0){B+=Mh(ee-B)*Math.min(1,e*15);let i=ot(t,u.x,u.z,B);Ge(t,u.x,u.y,u.z,i,f),f.decompose(o.root.position,o.root.quaternion,o.root.scale);let a=kh(n/.7,0,1),s=m.smoothstep(n,Eh.speed*.97,Eh.sprintSpeed*.96);ne+=(s-ne)*(e>0?1-Math.exp(-12*e):1),z&&(W+=r*Oh/m.lerp(1.05,1.42,ne)),Th(o,{gait:W,moving:a,running:ne,grounded:z,swingElapsed:ie}),Ge(t,u.x,Math.min(u.y,he)+.036,u.z,i,f),o.shadow.matrix.copy(f).multiply(h),o.shadow.matrixWorldNeedsUpdate=!0,o.shadow.material.opacity=.16/(1+Math.max(0,u.y-he)*1.6)}function Te(e=0,n=!1){Me(t,u.x,u.z,p);let r=p.elements;g.set(r[4],r[5],r[6]),S.set(r[0],r[1],r[2]),x.set(r[8],r[9],r[10]),ge=n||e<=0?u.y:m.lerp(ge,u.y,1-Math.exp(-14*e)),v.copy(Be(t,u.x,ge+Eh.cameraHeight,u.z,A));let i=Eh.cameraDistance,a=Math.cos(H)*i;y.copy(v).addScaledVector(S,-Math.sin(V)*a).addScaledVector(x,-Math.cos(V)*a).addScaledVector(g,Math.sin(H)*i),b.subVectors(y,v);let o=b.length();b.divideScalar(o);let c=K(v,b,o+.14),l=c?Math.max(.32,c.distance-.18):o;_e=n||e<=0||l<_e?l:m.lerp(_e,l,1-Math.exp(-15*e)),s.position.copy(v).addScaledVector(b,_e),s.up.copy(g),s.lookAt(v),s.updateMatrixWorld(!0)}function Ee(){let e=kh(de/Ah,0,1);ke(t,l,c,k),Ue(t,l.x,l.z,k.x*e,k.z*e,u),u.y=m.lerp(l.y,c.y,e),he=m.lerp(me,fe,e)}function J(e,n){if(!ae.length)return!1;Be(t,c.x,n+.43,c.z,_),Be(t,e.x,n+.43,e.z,A),b.subVectors(A,_);let r=b.length();if(r<1e-8)return!1;b.divideScalar(r);let i=K(_,b,r+Eh.radius);return!!(i&&i.distance<r+Eh.radius)}function De(e,n,r){if(Ue(t,c.x,c.z,e,n,E),!i(E.x,E.z))return ve.blocked++,!1;let a=Se(E);return!a||a.height>c.y+Math.max(Eh.stepHeight,Math.hypot(e,n)*Eh.maxSlope)||J(E,c.y)||a.type===`mesh`&&a.slope<1/Math.sqrt(1+Eh.maxSlope**2)||a.type===`mountain`&&a.height-lc(t,c.x,c.z).height>Math.hypot(e,n)*Eh.maxSlope?(ve.blocked++,!1):(c.x=E.x,c.z=E.z,fe=a.height,z&&c.y-a.height<.55?c.y=a.height+.035:z&&=!1,!0)}function Oe(e,n={}){if(!I||R)return;e=kh(Number.isFinite(e)?e:0,0,.12),ye(),V=Mh(V+(Number.isFinite(n.lookX)?n.lookX:0)),H=kh(H+(Number.isFinite(n.lookY)?n.lookY:0),Math.PI/18,Math.PI*65/180);let r=!!n.jump;r&&!U&&z&&(d.y=Eh.jumpSpeed,z=!1),U=r;let i=!!n.swing;i&&!G&&ie>=jh&&(ie=0,ee=V,ve.swings++),G=i,ie=Math.min(jh,ie+e);let a=kh(n.forward??0,-1,1),o=kh(n.right??0,-1,1),s=Math.hypot(a,o);s>1&&(a/=s,o/=s);let f=n.sprint?Eh.sprintSpeed:Eh.speed,p=(Math.sin(V)*a-Math.cos(V)*o)*f,m=(Math.cos(V)*a+Math.sin(V)*o)*f;for(de+=e,O.x=u.x,O.z=u.z;de>=.008333333332333333;){let e=Ah;de-=e,ve.steps++,Object.assign(l,c),me=fe;let t=1-Math.exp(-18*e);d.x+=(p-d.x)*t,d.z+=(m-d.z)*t;let n=d.x*e,r=d.z*e;if(Math.hypot(n,r)>1e-6&&(De(n,r,e)||(Math.abs(n)>1e-8&&De(n,0,e),Math.abs(r)>1e-8&&De(0,r,e)),ee=Math.atan2(d.x,d.z)),!z){d.y-=Eh.gravity*e,c.y+=d.y*e;let t=xe(c,c.y);fe=t.height,c.y<=t.height+.035&&d.y<=0&&(c.y=t.height+.035,d.y=0,z=!0)}}Ee(),ie<jh&&(ee=V);let h=tt(t,O,u),g=e>0?h/e:0;re+=(g-re)*(1-Math.exp(-24*e)),we(e,re,h),Te(e)}return{root:a,camera:s,position:c,renderPosition:u,cameraTarget:v,velocity:d,stats:ve,prepareSpawn:q,update:Oe,get swinging(){return ie<jh},get active(){return I},get initialized(){return L},get grounded(){return z},get heading(){return V},get pitch(){return H},enter(e,t=0,{respawn:n=!1}={}){if(R)return!1;if(L&&!n)return I=!0,a.visible=!0,ye(!0),we(0,0),Te(0,!0),!0;let r=q(e);return r?(Object.assign(c,r),d.x=d.y=d.z=0,B=V=ee=Number.isFinite(t)?t:0,Object.assign(l,r),Object.assign(u,r),fe=me=he=r.y-.035,H=Math.PI/10,de=0,U=!1,re=ne=W=0,ie=jh,G=!1,z=!0,I=L=!0,a.visible=!0,ye(!0),we(0,0),Te(0,!0),!0):!1},exit(){return I=!1,a.visible=!1,re=ne=0,ie=jh,G=!1,we(0,0),d.x=d.y=d.z=0,U=!1,{...c}},resize(e){s.aspect=Math.max(.01,Number.isFinite(e)?e:1),s.updateProjectionMatrix()},dispose(){R||(R=!0,I=!1,ie=jh,G=!1,a.removeFromParent(),o.dispose(),a.clear())}}}function Ph({crop:e=!1}={}){let t=[],n=[],r=[],i=[],a=e?7:12;for(let o=0;o<a;o++){let s=o*2.39996323,c=Math.sqrt((o+.5)/a)*.46,l=Math.cos(s)*c,u=Math.sin(s)*c,d=s+o*.73,f=Math.cos(d),p=Math.sin(d),m=.7+(Math.sin(o*13.73)*.5+.5)*.3,h=e?.065:.07,g=.13+o*7%5*.027,_=t.length/3,v=[[-h,0,0],[h,0,0],[-h*.55,m*.56,g*.34],[h*.55,m*.56,g*.34],[0,m,g]];for(let[e,[r,a,s]]of v.entries())i.push(o*2,o*2+1,e===4?.5:e%2),t.push(l+r*f-s*p,a,u+r*p+s*f),n.push(-p*.35,.93675,f*.35);r.push(_,_+1,_+2,_+1,_+3,_+2,_+2,_+3,_+4)}let o=new Qe;return o.setAttribute(`position`,new Le(t,3)),o.setAttribute(`normal`,new Le(n,3)),e||o.setAttribute(`grassRoot`,new Le(i,3)),o.setIndex(r),o}var Fh=Object.freeze((()=>{let e=Ph(),t=e.attributes.position,n=[];for(let e=0;e<12;e++)for(let r=0;r<2;r++)n.push([t.getX(e*5+r),t.getZ(e*5+r)]);return e.dispose(),n})());function Ih(e,{focus:t,time:n,player:r,visibility:i={value:1}},a){let o=e.onBeforeCompile,s=e.customProgramCacheKey(),c=a===`grass`||a===`crops`||a===`flowers`;return e.onBeforeCompile=(e,s)=>{o(e,s),e.uniforms.walkFocus=t,e.uniforms.walkTime=n,e.uniforms.walkPlayer=r,e.uniforms.walkVisibility=i,e.vertexShader=`uniform vec3 walkFocus; uniform vec3 walkPlayer; uniform float walkTime; uniform float walkVisibility;
      varying float walkDistance; varying float bladeHeight;
      ${a===`flowers`?`attribute float flowerPetal;`:``}
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
      vec3 worldWind = (vec3(0.88, 0.0, 0.47) * gust + vec3(0.30, 0.0, -0.90) * flutter) * clamp(plantHeight / 0.23, 0.7, 1.6)${a===`flowers`?` * 0.42`:``};
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
      transformed *= detailCoverage;`),a===`flowers`&&(e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,Jn.color_vertex.replace(`vColor.rgb *= instanceColor.rgb;`,`vColor.rgb *= mix(vec3(1.0), instanceColor.rgb, flowerPetal);`))),e.fragmentShader=`varying float walkDistance; varying float bladeHeight;
`+e.fragmentShader,c&&(e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
        diffuseColor.rgb *= mix(0.84, 1.08, clamp(bladeHeight, 0.0, 1.0));`),e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
        normal = normalize(vNormal);`))},e.customProgramCacheKey=()=>`${s}|walking-vegetation-v5:${a}`,e}function Lh(){let e=[],t=[],n=[],r=[],i=(r,i,a=0)=>{let o=e.length/3;return e.push(...r),t.push(i.r,i.g,i.b),n.push(a),o},a=(e,t,n,a,o=0)=>r.push(i(e,a,o),i(n,a,o),i(t,a,o)),o=[],s=[];for(let e=0;e<3;e++){let t=e*Math.PI*2/3;o.push([Math.cos(t)*.023,0,Math.sin(t)*.023]),s.push([.045+Math.cos(t)*.018,.94,Math.sin(t)*.018])}for(let e=0;e<3;e++){let t=(e+1)%3;a(o[e],o[t],s[e],X.leaf),a(o[t],s[t],s[e],X.leaf)}for(let[e,t]of[[.45,.28],[3.9,.48]]){let n=Math.cos(e),r=Math.sin(e),i=(e,i,a)=>[.045*t/.94+e*n-a*r,i,e*r+a*n],o=i(0,t,0),s=i(.14,t+.055,-.06),c=i(.32,t+.17,0),l=i(.14,t+.055,.06),u=i(.15,t+.1,0);a(o,s,u,X.leaf),a(s,c,u,X.leafLight),a(o,u,l,X.leaf),a(u,c,l,X.leafLight)}let c=.045;for(let e=0;e<5;e++){let t=e*Math.PI*2/5,n=Math.cos(t),r=Math.sin(t),i=(e,t,i)=>[c+e*n-i*r,t,e*r+i*n],o=i(.065,.89,0),s=i(.29,.905,-.14),l=i(.48,.965,0),u=i(.29,.905,.14),d=i(.29,.9550000000000001,0);a(o,s,d,X.white,1),a(s,l,d,X.white,1),a(o,d,u,X.white,1),a(d,l,u,X.white,1);let f=(e+1)*Math.PI*2/5;a([c,.99,0],[c+Math.cos(t)*.12,.91,Math.sin(t)*.12],[c+Math.cos(f)*.12,.91,Math.sin(f)*.12],X.gold)}let l=new Qe;return l.setAttribute(`position`,new Le(e,3)),l.setAttribute(`color`,new Le(t,3)),l.setAttribute(`flowerPetal`,new Le(n,1)),l.setIndex(r),l.computeVertexNormals(),l}var Rh=[],zh=new WeakMap,Bh=new WeakMap,Vh=e=>Math.max(0,Math.min(1,e)),Hh=(e,t,n)=>{let r=Vh((n-e)/(t-e));return r*r*(3-2*r)},Uh=e=>e.range?.bounds??yn(e.x,e.z,e.radius);function Wh(e,t,n){let r=t-e.c.x,i=n-e.c.z,a=e.ux*r+e.uz*i,o=e.vx*r+e.vz*i;return a>=-1e-8&&o>=-1e-8&&a+o<=1+1e-8}function Gh(e,t,n){return Math.max(0,e.c.y+(t-e.c.x)*e.slopeX+(n-e.c.z)*e.slopeZ)}function Kh(e){if(zh.has(e))return zh.get(e);let{vertices:t,surfaceTriangles:n}=pn(e),r=new Map,i=e.range?.cellSize??Math.max(1,e.radius/5);for(let e of n){let[n,a,o]=e.map(e=>t[e]),s=(a.z-o.z)*(n.x-o.x)+(o.x-a.x)*(n.z-o.z);if(Math.abs(s)<1e-12)continue;let c=(a.z-o.z)/s,l=(o.x-a.x)/s,u=(o.z-n.z)/s,d=(n.x-o.x)/s,f=c*(n.y-o.y)+u*(a.y-o.y),p=l*(n.y-o.y)+d*(a.y-o.y),m=1/Math.hypot(f,1,p),h={c:o,ux:c,uz:l,vx:u,vz:d,slopeX:f,slopeZ:p,normal:{x:-f*m,y:m,z:-p*m}};for(let e=Math.floor(Math.min(n.x,a.x,o.x)/i);e<=Math.floor(Math.max(n.x,a.x,o.x)/i);e++)for(let t=Math.floor(Math.min(n.z,a.z,o.z)/i);t<=Math.floor(Math.max(n.z,a.z,o.z)/i);t++){let n=`${e}:${t}`;r.has(n)||r.set(n,[]),r.get(n).push(h)}}let a={size:i,buckets:r};return zh.set(e,a),a}function qh(e,t,n){let{size:r,buckets:i}=Kh(e);return(i.get(`${Math.floor(t/r)}:${Math.floor(n/r)}`)??Rh).find(e=>Wh(e,t,n))}function Jh(e){if(Bh.has(e))return Bh.get(e);let t=new vn(e.mountains??Rh,Uh),n=new v,r=new v;function i(e,n){let r=t.query(yn(e,n,.5)),i=0,a=null,o=null;for(let t of r){let r=qh(t,e,n);if(!r)continue;let s=Gh(r,e,n);s>i&&(i=s,a=r,o=t)}return{height:i,face:a,mountain:o,nearby:r}}function a(e,t,n){if(!n?.nearby.length)return 0;if(n.nearby.length===1&&n.face&&Wh(n.face,e,t))return Gh(n.face,e,t);let r=0;for(let i of n.nearby){let n=qh(i,e,t);n&&(r=Math.max(r,Gh(n,e,t)))}return r}function o(t,i,a){Jc(e.terrainSource??e,t,i,{target:n});let o=Hh(-.15,.065,n.g-n.r),s=1;if(a.mountain){let r=a.mountain,o=a.height/r.height,c=a.face.normal,l=Hh(.9,.48,c.y),u=Hh(.53,.84,o);s=1-Math.max(l,u)*Hh(.015,.12,o),s*=1-Hh(rn(r,t,i)-.8,rn(r,t,i),a.height),Op(e,r,{x:t,y:a.height,z:i},c,{target:n})}let c=(.045+.955*o)*s;return r.copy(n).lerp(o>.5?X.grass:X.soilLight,.18).multiplyScalar(1.02),{density:c,heightScale:(.42+.58*o)*(.35+.65*s),color:r.toArray()}}let s={sample:i,heightAt:a,vegetation:o};return Bh.set(e,s),s}var Yh=Object.freeze({radius:23,padding:6,refreshDistance:5,grass:9600,flowers:100,pebbles:100,crops:2800}),Xh=Math.PI*2,Zh=[],Qh=[`grass`,`flowers`,`pebbles`,`crops`],$h={grass:[`grass`,`grassLight`,`meadow`],flowers:[`white`,`gold`,`lavender`],pebbles:[`gravel`,`rockLight`,`soilLight`],crops:[`wheat`]};function eg(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return t>>>0}function tg(e,t,{a:n,b:r}){let i=r.x-n.x,a=r.z-n.z,o=m.clamp(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-n.x-i*o,t-n.z-a*o)}function ng(e,t){let n=e;for(let r=0;r<e.length&&n.length>=3;r++){let i=e[r],a=e[(r+1)%e.length],o=a[0]-i[0],s=a[1]-i[1],c=Math.hypot(o,s);if(c<1e-7)continue;let l=s/c,u=-o/c,d=(i[0]*s-i[1]*o)/c-t,f=[];for(let e=0;e<n.length;e++){let t=n[e],r=n[(e+1)%n.length],i=t[0]*l+t[1]*u-d,a=r[0]*l+r[1]*u-d;if(i<=0&&f.push(t),i<0!=a<0){let e=i/(i-a);f.push([t[0]+(r[0]-t[0])*e,t[1]+(r[1]-t[1])*e])}}n=f}return n}function rg(e){return String(e.id??`${e.kind}:${e.x}:${e.z}`)}function ig(e){return e.radius??(e.kind===`farm`?Math.hypot(e.width??3,e.depth??4)*(e.scale??1)/2:(e.kind===`tree`?.85:2.2)*(e.scale??1))}function ag(e,t,n,r=.4){let i=e.scale??1,a=(t-e.x)/i,o=(n-e.z)/i,s=e.rotation??0,c=a*Math.cos(s)-o*Math.sin(s),l=a*Math.sin(s)+o*Math.cos(s),u=r/i;return e.kind===`tree`?Math.hypot(a,o)<.22+u:e.buildingType&&e.width&&e.depth?Math.abs(c)<e.width/2+u&&Math.abs(l)<e.depth/2+u:e.kind===`farm`?(e.parcels??[{x:0,z:0,width:e.width??3,depth:e.depth??4}]).some(e=>en(nn(e),c-(e.x??0),l-(e.z??0),-u)):e.kind===`house`?Math.abs(c)<1.1+u&&Math.abs(l)<1.1+u:e.kind===`station`?Math.abs(c)<3.2+u&&Math.abs(l)<1.2+u:e.kind===`person`||e.kind===`sheep`?!1:Math.hypot(t-e.x,n-e.z)<ig(e)+r}function og(e,t,n,{cityStreets:r=e.cityStreets??Zh,groundCache:i}={}){let a=Object.fromEntries(Qh.map(e=>[e,[]])),o=Yh.radius+Yh.padding,s=(t??Zh).filter(t=>tt(e,t,n)<o+ig(t)).sort((t,r)=>tt(e,t,n)-tt(e,r,n)||rg(t).localeCompare(rg(r)));function c(e,t,n,r,i,o,s,c,l,u=0,d){let f={id:n,anchor:t,x:r,y:i,z:o,sx:s,sy:c,sz:l,rotation:u,color:d??$h[e][eg(n)%$h[e].length]};return a[e].length<Yh[e]&&a[e].push(f),f}for(let t of s){let r=rg(t);if(t.kind===`farm`&&t.width&&t.depth){let i=ke(e,t,n),s=t.rotation??0,l=t.scale??1,u={x:(i.x*Math.cos(s)-i.z*Math.sin(s))/l,z:(i.x*Math.sin(s)+i.z*Math.cos(s))/l},d=o/l;for(let[e,n]of(t.parcels??[{x:0,z:0,width:t.width,depth:t.depth,variant:t.variant}]).entries()){let i=n.crop??[`wheat`,`vegetables`,`lavender`][((n.variant??t.variant??0)%3+3)%3];if(![`wheat`,`lavender`,`pasture`,`vegetables`,`orchard`].includes(i))continue;let o=nn(n),s=hn(Bn(n,t.variant)),l=gn(o,n.feature,n.featurePosition,s),f=n.rowsAngle??(n.rowsAlong===`x`?0:Math.PI/2),p=Math.cos(f),m=Math.sin(f),h=i===`pasture`||i===`orchard`;if(a[h?`grass`:`crops`].length>=Yh[h?`grass`:`crops`])continue;let g=Math.max(.4,n.rowPitch??(i===`vegetables`?.8:1.35)),_=Math.hypot(n.width,n.depth)/2,v=h?.55:.27,y=ng(o,.25);if(y.length<3)continue;let b=u.x-(n.x??0),x=u.z-(n.z??0),S=(e,t)=>(e-b)**2+(t-x)**2<d*d;if(h){let i=Math.ceil(Math.max(-n.width/2,b-d)/v),s=Math.floor(Math.min(n.width/2,b+d)/v),u=Math.ceil(Math.max(-n.depth/2,x-d)/v),f=Math.floor(Math.min(n.depth/2,x+d)/v);for(let d=i;d<=s;d++)for(let i=u;i<=f&&!(a.grass.length>=Yh.grass);i++){let a=`${r}:parcel:${e}:sward:${d}:${i}`,s=hn(eg(a)),u=(d+(s()-.5)*.45)*v,f=(i+(s()-.5)*.45)*v;!S(u,f)||!en(o,u,f,.33)||l&&Math.hypot(u-l.center[0],f-l.center[1])<l.radius+.33||c(`grass`,t,a,(n.x??0)+u,.055,(n.z??0)+f,.57,.13+s()*.07,.57,s()*Xh,`meadow`)}continue}let C=y.map(([e,t])=>-e*m+t*p),w=Math.min(...C),T=Math.max(...C),E=Math.max(1,Math.min(18,Math.round((T-w)/g))),D=(T-w)/E,O=0,k=b*p+x*m,A=-b*m+x*p,j=Array.from({length:E},(e,t)=>t).sort((e,t)=>Math.abs(w+(e+.5)*D-A)-Math.abs(w+(t+.5)*D-A)),M=Math.ceil(Math.max(-_,k-d)/v)*v,N=Math.min(_,k+d),P=[];for(let e=M;e<=N;e+=v)P.push(e);P.sort((e,t)=>Math.abs(e-k)-Math.abs(t-k));for(let s of j)for(let u of P){if(++O>3600||a.crops.length>=Yh.crops)break;let d=w+(s+.5)*D,f=u*p-d*m,h=u*m+d*p;if(!S(f,h)||!en(o,f,h,.3)||l&&Math.hypot(f-l.center[0],h-l.center[1])<l.radius+.3||l&&Math.abs(d-(-l.center[0]*m+l.center[1]*p))<l.radius+D*.25&&Math.abs(u-(l.center[0]*p+l.center[1]*m))<l.radius+.12)continue;let g=`${r}:parcel:${e}:${u.toFixed(3)}:${d.toFixed(3)}`,_=hn(eg(g)),v=i===`vegetables`?.12+_()*.07:i===`lavender`?.24+_()*.06:.32+_()*.09;c(`crops`,t,g,(n.x??0)+f,.06,(n.z??0)+h,.32,v,.32,_()*Xh,i===`lavender`?`lavender`:i===`vegetables`?`leafLight`:`wheat`)}}}}if(!Tt(e)&&e.biomes){let t=new on(5);for(let n of[...s,...e.stations??[]])n.kind!==`sheep`&&t.insert(n,yn(n.x,n.z,ig(n)+.3));let l=cn(e.lines??Zh),u=cn(r),d=.6,f=Jh(e),p=(e,t,n)=>n.nearby.length&&l.query(yn(e,t,2.5)).some(r=>{if(tg(e,t,r)>=2.5)return!1;let i=r.line,a=i.distances?.[r.index]??0,o=i.distances?.[r.index+1]??i.length;return(i.cuts??i.tunnels??Zh).some(e=>!n.nearby.some(t=>t.id===e.mountainId)||o<(e.cutStart??e.start)-2||a>(e.cutEnd??e.end)+2?!1:!(i.tunnels??Zh).some(t=>t.mountainId===e.mountainId&&t.start<e.end&&t.end>e.start)||n.height<Math.max(r.a.y??.42,r.b.y??.42)+3.6)}),m=Math.round(n.x/Yh.refreshDistance)*Yh.refreshDistance,h=Math.round(n.z/Yh.refreshDistance)*Yh.refreshDistance,g=(n,r)=>{let i=ln(e,n,r);if(![`plains`,`forest`,`farmland`,`desert`,`mountain`].includes(i)||!$t(e,[`plains`,`forest`,`farmland`,`desert`,`mountain`],n,r,.35)||zn(e,n,r)<1.1||t.query(yn(n,r,.4)).some(e=>ag(e,n,r))||l.nearest(n,r,e=>tg(n,r,e),1.34)<1.34||u.nearest(n,r,e=>tg(n,r,e)-(e.line.width??1)/2,.4,1.5)<.4)return null;let a=f.sample(n,r);return p(n,r,a)?null:a},_=[];for(let t=Math.floor((m-o)/d);t<=Math.ceil((m+o)/d);t++)for(let r=Math.floor((h-o)/d);r<=Math.ceil((h+o)/d);r++){let i=`ground:${e.seed??0}:${t}:${r}`,a=hn(eg(i)),s=(t+.3+a()*.4)*d,c=(r+.3+a()*.4)*d,l=(s-n.x)**2+(c-n.z)**2;l>o*o||_.push({id:i,r:a,x:s,z:c,distance:l})}_.sort((e,t)=>e.distance-t.distance);for(let{id:e,r:t,x:n,z:r}of _){if(i?.has(e)){for(let[t,n]of i.get(e)??Zh)a[t].length<Yh[t]&&a[t].push(n);continue}i?.set(e,null);let o=[],s=(e,...t)=>{let n=c(e,...t);o.push([e,n])},l=g(n,r);if(!l)continue;let u=f.vegetation(n,r,l),d=t(),p={x:n,y:l.height-.006,z:r,rotation:0,scale:1},m=.5+.5*Math.sin(n*.21+Math.sin(r*.17))*Math.cos(r*.25-n*.08);if(d<u.density){let i=(.18+m*.09+t()*.04)*u.heightScale,a=t()*Xh,s=c(`grass`,p,e,0,0,0,.65,i,.65,a,`grass`);if(s.colorRGB=u.color,o.push([`grass`,s]),l.nearby.length){let e=Math.cos(a),t=Math.sin(a);s.rootHeights=Fh.map(([i,a])=>f.heightAt(n+(i*e+a*t)*s.sx,r+(-i*t+a*e)*s.sz,l)-l.height)}}else d>.986&&u.density<.3&&s(`pebbles`,p,`${e}:stone`,0,.025,0,.07+t()*.08,.035+t()*.03,.07,t()*Xh,`desertRock`);i&&i.set(e,o)}let v=5.8,y=[];for(let t=Math.floor((m-o-1)/v);t<=Math.ceil((m+o+1)/v);t++)for(let r=Math.floor((h-o-1)/v);r<=Math.ceil((h+o+1)/v);r++){let i=`ground:${e.seed??0}:flowers:${t}:${r}`,a=hn(eg(i));if(a()>.46)continue;let s=(t+.14+a()*.72)*v,c=(r+.14+a()*.72)*v,l=(s-n.x)**2+(c-n.z)**2;l>(o+1)**2||y.push({id:i,r:a,x:s,z:c,distance:l})}y.sort((e,t)=>e.distance-t.distance||e.id.localeCompare(t.id));for(let e of y){if(a.flowers.length>Yh.flowers-3)break;let{id:t,r,x:s,z:c}=e,l=i?.get(t);if(!i?.has(t)){l=[];let e=5+Math.floor(r()*5),n=.5+r()*.5,a=r()*Xh,o=$h.flowers[Math.floor(r()*$h.flowers.length)];for(let i=0;i<e;i++){let u=a+i*2.39996323+(r()-.5)*.35,d=Math.sqrt((i+.15+r()*.35)/e)*n,p=s+Math.cos(u)*d,m=c+Math.sin(u)*d,h=g(p,m),_=.25+r()*.11,v=.18+r()*.07,y=r()*Xh;!h||f.vegetation(p,m,h).density<.7||l.push([`flowers`,{id:`${t}:${i}`,clump:t,anchor:{x:p,y:h.height-.002,z:m,rotation:0,scale:1},x:0,y:0,z:0,sx:v,sy:_,sz:v,rotation:y,color:o}])}l.length<3&&(l=[]),i?.set(t,l)}let u=(l??Zh).filter(([,e])=>(e.anchor.x-n.x)**2+(e.anchor.z-n.z)**2<o*o);if(!(u.length<3||u.length>Yh.flowers-a.flowers.length))for(let[,e]of u)a.flowers.push(e)}if(i?.size>18e3){for(let e of i.keys())if(i.delete(e),i.size<=14e3)break}}return a}function sg(e,t){let n=new dt;n.name=`walking-close-detail`,n.visible=!1,e.add(n);let r={value:new Y},i={value:0},a={value:new Y},o={value:1},s={},c=new et,l=new et,u=new et,d=new Y,f=new Y,p=new _t,h=new Y(0,1,0),g=new v;for(let e of Qh){let t=e===`grass`||e===`crops`||e===`flowers`,c=e===`flowers`?Lh():t?Ph({crop:e===`crops`}):new nt(1,0);if(e===`grass`)for(let e=0;e<6;e++)c.setAttribute(`grassRoots${e}`,new Dt(new Float32Array(Yh.grass*4),4).setUsage(be));let l=qt(new ne({color:16777215,vertexColors:e===`flowers`,flatShading:!t,side:t?2:0}));Ih(l,{focus:r,time:i,player:a,visibility:o},e);let u=new Pe(c,l,Yh[e]);u.name=`walking-${e}`,u.setColorAt(0,X.white),u.count=0,u.frustumCulled=!1,u.castShadow=!1,u.receiveShadow=!0,u.instanceMatrix.setUsage(be),n.add(u),s[e]=u}let _={builds:0,instances:0,drawCalls:Qh.length,ready:!1},y=null,b=-1,x=null,S={x:1/0,z:1/0},C=!1,w=[],T=[],E=new Map,D=(e,t)=>{if(e.length!==t.length)return!1;let n=new Set(e);return t.every(e=>n.has(e))};function O(e,n){let r=Yh.radius+Yh.padding;return e.filter(e=>e.points?.some((i,a)=>tt(t,i,n)<r+(e.width??1)||!Tt(t)&&a>0&&tg(n.x,n.z,{a:e.points[a-1],b:i})<r+(e.width??1)))}function k(e,{placements:v=Zh,revision:k=0,visible:A=!1,visibilityWeight:j=1,time:M=0,playerPosition:N=e,cityStreets:P=t.cityStreets??Zh}={}){if(C||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return;n.visible=A,Be(t,e.x,e.y??0,e.z,r.value),i.value=M,Be(t,N.x,N.y??0,N.z,a.value),o.value=m.clamp(j,0,1);let F=v!==y||k!==b||P!==x,I=!Number.isFinite(S.x)||tt(t,e,S)>=Yh.refreshDistance;if(!F&&!I)return;let L=Yh.radius+Yh.padding,R=v.filter(n=>tt(t,n,e)<L+ig(n)),z=O(P,e),B=!D(w,R)||!D(T,z);if(y=v,b=k,x=P,!I&&!B&&_.ready)return;F&&B&&E.clear(),w=R,T=z;let V=og(t,w,e,{cityStreets:T,groundCache:E}),H=0;for(let e of Qh){let n=s[e],r=V[e];n.count=r.length,H+=r.length;for(let[i,a]of r.entries()){let r=a.anchor;if(Ge(t,r.x,r.y??0,r.z,r.rotation??0,c),c.scale(f.setScalar(r.scale??1)),d.set(a.x,a.y,a.z),f.set(a.sx,a.sy,a.sz),p.setFromAxisAngle(h,a.rotation),l.compose(d,p,f),u.multiplyMatrices(c,l),n.setMatrixAt(i,u),n.setColorAt(i,a.colorRGB?g.fromArray(a.colorRGB):X[a.color]??X.grass),e===`grass`)for(let e=0;e<6;e++){let t=n.geometry.attributes[`grassRoots${e}`],o=a.rootHeights,s=e*4,c=a.sy*(r.scale??1);t.setXYZW(i,(o?.[s]??0)/c,(o?.[s+1]??0)/c,(o?.[s+2]??0)/c,(o?.[s+3]??0)/c)}}if(e===`grass`)for(let e=0;e<6;e++)n.geometry.attributes[`grassRoots${e}`].needsUpdate=!0;n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}S={x:e.x,z:e.z},Object.assign(_,{builds:_.builds+1,instances:H,ready:!0})}function A(){if(!C){C=!0;for(let e of Object.values(s))e.geometry.dispose(),e.material.dispose(),e.dispose();n.removeFromParent()}}return{root:n,stats:_,update:k,dispose:A}}function cg(e,{isActive:t,onToggle:n,onExit:r,onKey:i=()=>!1,canLook:a=()=>!0}){let o=new Set,s=[],c=null,l=null,u=0,d=0,f=!1,p=!1,m=!!t(),h=!!a(),g=e.ownerDocument,_=g.defaultView??globalThis.window;function v(e,t,n,r){e.addEventListener(t,n,r),s.push(()=>e.removeEventListener(t,n,r))}function y(){l=null,u=d=0,c&&(c.lookReady=!1)}function b(){let t=c?.id;o.clear(),c=null,y(),f=p=!1,t!==void 0&&e.hasPointerCapture?.(t)&&e.releasePointerCapture(t)}function x(){let e=!!t(),n=!!a();return e===m?n!==h&&y():b(),m=e,h=n,m}function S(e){e.preventDefault(),e.stopImmediatePropagation()}let C=e=>Number.isFinite(e.clientX)&&Number.isFinite(e.clientY),w=e=>e.pointerType===`touch`||e.pointerType===`pen`;function T(e,t){let n=(e,t)=>Math.max(-t,Math.min(t,e));u=n(u-n(e,80)*.005,.65),d=n(d+n(t,80)*.004,.45)}v(e,`keydown`,e=>{if(x(),e.altKey||e.metaKey||e.ctrlKey)return;if(i(e)){S(e);return}let t=e.key.toLowerCase();t===`v`?(S(e),e.repeat||(b(),n())):m&&([`w`,`a`,`s`,`d`,` `,`e`,`shift`,`arrowleft`,`arrowright`,`arrowup`,`arrowdown`].includes(t)?(t===` `&&!o.has(t)&&!e.repeat&&(f=!0),t===`e`&&!o.has(t)&&!e.repeat&&(p=!0),o.add(t),S(e)):t===`escape`||t===`home`?(S(e),b(),r()):[`f`,`r`,`[`,`]`,`+`,`-`,`=`,`_`].includes(t)&&S(e))},!0);let E=e=>{o.delete(e.key.toLowerCase())};v(e,`keyup`,E),v(_,`keyup`,E),v(e,`blur`,b),v(_,`blur`,b),v(g,`visibilitychange`,()=>{g.hidden&&b()}),v(e,`pointerenter`,e=>{x(),y(),m&&h&&!w(e)&&C(e)&&(l={id:e.pointerId,x:e.clientX,y:e.clientY})}),v(e,`pointerleave`,()=>{y(),c&&!c.touch&&(c.click=!1)}),v(e,`pointerdown`,t=>{x()&&(S(t),e.focus?.({preventScroll:!0}),!c&&C(t)&&(c={id:t.pointerId,x:t.clientX,y:t.clientY,startX:t.clientX,startY:t.clientY,touch:w(t),lookReady:h,click:(t.button??0)===0&&t.isPrimary!==!1},c.touch?e.setPointerCapture?.(t.pointerId):h&&(l={id:t.pointerId,x:t.clientX,y:t.clientY})))},!0);function D(e){(e.clientX-c.startX)**2+(e.clientY-c.startY)**2>25&&(c.click=!1)}v(e,`pointermove`,e=>{if(x()){if(!C(e))y();else if(c?.id===e.pointerId&&D(e),!h)y();else if(c?.touch||w(e)){if(c?.id!==e.pointerId)return;S(e),c.lookReady&&T(e.clientX-c.x,e.clientY-c.y),c.lookReady=!0,c.x=e.clientX,c.y=e.clientY}else e.isPrimary===!1||c&&c.id!==e.pointerId||(l?.id===e.pointerId&&T(e.clientX-l.x,e.clientY-l.y),l={id:e.pointerId,x:e.clientX,y:e.clientY})}},!0);let O=n=>{c?.id===n.pointerId&&(n.type===`pointerup`&&(D(n),t()&&c.click&&(n.button??0)===0&&(p=!0)),n.type!==`pointerup`&&y(),c=null,e.hasPointerCapture?.(n.pointerId)&&e.releasePointerCapture(n.pointerId))};return v(_,`pointerup`,O),v(_,`pointercancel`,O),v(e,`lostpointercapture`,O),v(e,`wheel`,e=>{t()&&S(e)},{capture:!0,passive:!1}),v(e,`contextmenu`,e=>{t()&&e.preventDefault()}),{clear:b,sample(e=0){x();let t=Number.isFinite(e)?Math.max(0,Math.min(e,.1)):0,n={forward:Number(o.has(`w`))-Number(o.has(`s`)),right:Number(o.has(`d`))-Number(o.has(`a`)),jump:f||o.has(` `),sprint:o.has(`shift`),swing:p,lookX:u+(Number(o.has(`arrowleft`))-Number(o.has(`arrowright`)))*t*1.6,lookY:d+(Number(o.has(`arrowdown`))-Number(o.has(`arrowup`)))*t*1.1};return u=d=0,f=p=!1,n},dispose(){b();for(let e of s)e()}}}function lg(e){let t=new Qe;t.setAttribute(`position`,new Le([-1,-1,0,3,-1,0,-1,3,0],3));let n={inverseProjection:{value:new et},cameraWorld:{value:new et},skyUp:{value:new Y(0,1,0)},sunDirection:{value:new Y(-65,110,65).normalize()},horizonColor:{value:new v(12113369)},dayZenith:{value:new v(6005971)},nightZenith:{value:new v(463398)},cloudColor:{value:new v(16052702)},sunColor:{value:new v(16771782)},night:{value:0},strength:{value:1}},r=new gt({name:`walking-sky`,uniforms:n,depthWrite:!1,depthTest:!0,toneMapped:!1,fog:!1,vertexShader:`uniform mat4 inverseProjection; uniform mat4 cameraWorld; varying vec3 skyRay;
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
      }`}),i=new o(t,r);i.name=`walking-sky`,i.visible=!1,i.frustumCulled=!1,i.renderOrder=-1001,e.add(i);let a=!1;function s(t,{visible:r=!1,strength:o=1,night:s=0,up:c=t?.up,sunDirection:l,horizonColor:u=e.background}={}){a||(i.visible=r,t&&(t.updateMatrixWorld(),n.inverseProjection.value.copy(t.projectionMatrixInverse),n.cameraWorld.value.copy(t.matrixWorld)),n.night.value=m.clamp(Number.isFinite(s)?s:0,0,1),n.strength.value=m.clamp(Number.isFinite(o)?o:1,0,1),c?.isVector3&&c.lengthSq()>1e-12&&n.skyUp.value.copy(c).normalize(),l?.isVector3&&l.lengthSq()>1e-12&&n.sunDirection.value.copy(l).normalize(),u?.isColor&&n.horizonColor.value.copy(u))}function c(){a||(a=!0,i.removeFromParent(),t.dispose(),r.dispose())}return{root:i,update:s,dispose:c}}var ug=(e,t,n)=>e+(t-e)*n,dg=(e,t,n)=>Math.exp(ug(Math.log(Math.max(1e-6,e)),Math.log(Math.max(1e-6,t)),n)),fg=e=>e*e*e*(e*(e*6-15)+10);function pg(e,t){e.updateMatrixWorld(!0);let n=new Y().copy(t),r=e.position.clone().sub(n),i=Math.max(.001,r.length()),a=e.userData.characterProjection,o=a?.perspective??+!e.isOrthographicCamera,s=e.clone();return s.isOrthographicCamera=!!e.isOrthographicCamera,s.isPerspectiveCamera=!s.isOrthographicCamera,{camera:s,target:n,distance:i,localDirection:r.divideScalar(i).applyQuaternion(e.quaternion.clone().invert()),halfHeight:a?.halfHeight??(e.isOrthographicCamera?1:i)/e.projectionMatrix.elements[5],aspect:Math.abs(e.projectionMatrix.elements[5]/e.projectionMatrix.elements[0]),perspective:o,near:e.near,far:e.far}}function mg(e,t,n){if(!e||!Number.isFinite(e.radius)||e.radius<=0)return null;let r=new Y().copy(e.center),i=t.target.clone().sub(r),a=n.target.clone().sub(r),o=i.length(),s=a.length();if(o<1e-6||s<1e-6)return null;i.divideScalar(o),a.divideScalar(s);let c=new Y().crossVectors(i,a),l=c.length(),u=m.clamp(i.dot(a),-1,1),d=Math.atan2(l,u);l>1e-12?c.divideScalar(l):u<0?(c.crossVectors(i,Math.abs(i.x)<.9?new Y(1,0,0):new Y(0,0,1)).normalize(),d=Math.PI):(c.set(0,1,0),d=0);let f=new _t().setFromAxisAngle(c,d),p=f.clone().invert();return{center:r,radius:e.radius,start:i,startRadius:o,endRadius:s,arc:f,endOrientation:n.camera.quaternion.clone().premultiply(p),endUp:n.camera.up.clone().applyQuaternion(p)}}function hg({duration:e=.78,reducedMotion:t={matches:!1}}={}){let n=new pe,r=new Y;n.name=`character-transition-camera`;let i=new Y,a=new Y,o=new _t,s=new _t,c=!1,l=0,u=e,d=null,f=null,p=!1,m=0,h=0,g=null;function _(e){let t=e.camera;n.position.copy(t.position),n.quaternion.copy(t.quaternion),n.up.copy(t.up),n.near=t.near,n.far=t.far,n.zoom=t.zoom,n.aspect=e.aspect,n.projectionMatrix.copy(t.projectionMatrix),n.projectionMatrixInverse.copy(t.projectionMatrixInverse),n.isOrthographicCamera=!!t.isOrthographicCamera,n.isPerspectiveCamera=!n.isOrthographicCamera,n.userData.characterProjection={perspective:e.perspective,halfHeight:e.halfHeight},r.copy(e.target),n.updateMatrixWorld(!0)}function v(){return f&&(_(f),c=!1,l=u,m=Number(p)),n}function y(e){if(!c)return n;if(t.matches||(l=Math.min(u,l+Math.max(0,Number.isFinite(e)?e:0)),l>=u))return v();let _=fg(l/u),y=ug(d.perspective,f.perspective,_),b=dg(d.distance,f.distance,_),x=dg(d.halfHeight,f.halfHeight,_);if(g?(o.slerpQuaternions(s,g.arc,_),a.copy(g.start).applyQuaternion(o),r.copy(g.center).addScaledVector(a,ug(g.startRadius,g.endRadius,_)),n.quaternion.slerpQuaternions(d.camera.quaternion,g.endOrientation,_).premultiply(o),n.up.lerpVectors(d.camera.up,g.endUp,_).applyQuaternion(o).normalize()):(n.quaternion.slerpQuaternions(d.camera.quaternion,f.camera.quaternion,_),n.up.lerpVectors(d.camera.up,f.camera.up,_).normalize(),r.lerpVectors(d.target,f.target,_)),i.lerpVectors(d.localDirection,f.localDirection,_).normalize().applyQuaternion(n.quaternion),n.position.copy(r).addScaledVector(i,b),g){let e=r.distanceTo(g.center)-g.radius,t=Math.max(.025,.05-e),o=i.dot(a)*b;o<t&&(n.position.addScaledVector(a,t-o),n.up.copy(a),n.lookAt(r))}n.near=dg(d.near,f.near,_),n.far=dg(d.far,f.far,_),n.aspect=ug(d.aspect,f.aspect,_),n.zoom=ug(d.camera.zoom,f.camera.zoom,_);let S=1-y+y*n.near/b,C=-(1-y+y*n.far/b+S)/(n.far-n.near),w=-S+C*n.near;return n.projectionMatrix.set(1/(x*n.aspect),0,0,0,0,1/x,0,0,0,0,C,w,0,0,-y/b,1-y),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.isPerspectiveCamera=!0,n.isOrthographicCamera=!1,n.userData.characterProjection={perspective:y,halfHeight:x},n.updateMatrixWorld(!0),m=ug(h,Number(p),_),n}return{camera:n,target:r,update:y,finish:v,get active(){return c},get toWalking(){return p},get walkingWeight(){return m},get progress(){return u>0?Math.min(1,l/u):1},begin({fromCamera:i,toCamera:a,fromTarget:o,toTarget:s,toWalking:y,sphere:b}){let x=c,S=pg(i,o??r),C=pg(a,s);return h=x?m:Number(!y),d=S,f=C,p=!!y,l=0,g=mg(b,d,f),u=Math.max(.16,e*Math.abs(Number(p)-h)),m=h,_(d),c=!0,t.matches&&v(),n}}}function gg(e,t,n){let r=[],i=[],a=(e,t,n)=>{r.push(Math.cos(t)*e,Math.sin(t)*e,0),i.push(n.r,n.g,n.b)};for(let[r,i,o]of[[0,.61,t],[.61,.87,n],[.87,1,e]])for(let e=0;e<40;e++){let t=e/40*Math.PI*2,n=(e+1)/40*Math.PI*2;a(r,t,o),a(i,t,o),a(i,n,o),r>0&&(a(r,t,o),a(i,n,o),a(r,n,o))}let o=new Qe;return o.setAttribute(`position`,new Le(r,3)),o.setAttribute(`color`,new Le(i,3)),o.computeBoundingSphere(),o}function _g(e,t,n,{color:r=X.teal,accent:i=X.redLight,trim:a=X.trim,name:s=`character`}={}){let c=gg(r,i,a),l=new Ze({vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),u=new o(c,l),d=new o(c,l.clone());u.name=`${s}-overview-marker`,d.name=`${s}-map-marker`,u.renderOrder=d.renderOrder=20,u.visible=d.visible=!1,e.add(u),t.add(d);let f=new Y,p=new Y,h=new Y,g=new Y,_=new Y,v=new Y,y=new Y,b=!1,x=(e,t,n)=>{let r=m.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function S(e,t,n){_.copy(t).applyMatrix4(e.matrixWorldInverse);let r=e.projectionMatrix.elements,i=r[3]*_.x+r[7]*_.y+r[11]*_.z+r[15];return 2*Math.abs(i)/(Math.max(1,n)*Math.abs(r[5]))}return{root:u,mapRoot:d,get characterReadable(){return b},update({position:e,initialized:t=!1,camera:r,mapBlend:i=0,walking:a=!1,walkingWeight:o=+!!a,viewportHeight:s=800}={}){if(u.visible=d.visible=b=!1,!t||!e||!r||(r.updateMatrixWorld(!0),Be(n,e.x,e.y??0,e.z,f),rt(n,e.x,e.z,p),Tt(n)&&p.dot(g.copy(r.position).sub(f))<=0)||(h.copy(f).addScaledVector(p,np),v.copy(f).project(r),y.copy(h).project(r),v.z<-1||v.z>1||Math.abs(v.x)>1.08||Math.abs(v.y)>1.08))return;let c=Math.abs(y.y-v.y)*s/2;b=c>=5;let l=(1-x(4,12,c))*(1-x(.3,.9,o));l>.001&&i<.999&&(u.visible=!0,u.position.copy(f).addScaledVector(p,np*.57),u.quaternion.copy(r.quaternion),u.scale.setScalar(S(r,u.position,s)*5.4),u.material.opacity=l),i>.001&&(d.visible=!0,Be(n,e.x,Tt(n)?2.4:.62,e.z,d.position),d.quaternion.copy(r.quaternion),d.scale.setScalar(S(r,d.position,s)*6.5),d.material.opacity=1)},dispose(){u.removeFromParent(),d.removeFromParent(),c.dispose(),u.material.dispose(),d.material.dispose()}}}var vg=Object.freeze({faces:256,radius:360});function yg(e,t){let n=new dt;n.name=`town-clock-hands`,e.add(n);let r=new Pe(new f(1,1,1),Yt.metal,vg.faces*2);r.name=`clock-hands`,r.count=0,r.instanceMatrix.setUsage(be),r.frustumCulled=!1,r.castShadow=!1,n.add(r);let i=[],a=new et,o=new et,s=new et,l=new c,u=null,d=-1,p=null,m=-1;function h(e,n){i.length=0;let r=[];for(let i of e){let e=i.buildingType?i.buildingType===`clock`?`landmark`:i.buildingType===`hall`?`civic`:null:i.kind,a=e?Xf(e,i.buildingType?0:i.variant):[];if(!a.length)continue;let o=tt(t,i,n);o<=vg.radius&&r.push({item:i,specs:a,distance:o})}r.sort((e,t)=>e.distance-t.distance);for(let{item:e,specs:n}of r){Ge(t,e.x,e.y??0,e.z,e.rotation??0,a);let r=e.scale??1;a.scale(new Y(r,r,r));for(let e of n){if(i.length===vg.faces)break;l.position.set(e.x,e.y,e.z),l.rotation.set(0,e.rotation,0),l.scale.set(1,1,1),l.updateMatrix(),o.copy(a).multiply(l.matrix),i.push({matrix:o.clone(),radius:e.radius})}}m=-1}return{root:n,hands:r,update(e,{focus:a={x:0,z:0},placements:o=[],revision:c=0,visible:f=!0,reducedMotion:g=!1}={}){if(n.visible=f,!f)return;(o!==u||c!==d||!p||tt(t,a,p)>16)&&(h(o,a),u=o,d=c,p={x:a.x,z:a.z});let _=g?Math.floor(e):Math.floor(e*12)/12;if(_===m)return;m=_;let v=0;for(let e of i)for(let[t,n]of Zf.entries()){let i=Qf(_,t),a=e.radius*n.length;l.position.set(-Math.sin(i)*a*.43,Math.cos(i)*a*.43,n.z),l.rotation.set(0,0,i),l.scale.set(e.radius*n.width,a,.008),l.updateMatrix(),s.copy(e.matrix).multiply(l.matrix),r.setMatrixAt(v++,s)}r.count=v,r.instanceMatrix.needsUpdate=!0},dispose(){r.dispose(),r.geometry.dispose(),n.removeFromParent(),i.length=0}}}var bg=Object.freeze({houseCost:10,houseWidth:2.2,houseDepth:2.2,connectionRange:9,buildReach:7,chopReach:1.1,clearance:.22,maxHeightDifference:.14,playerRadius:.17,terrainSampleSpacing:.36}),xg=new Set([`house`,`tree`,`rock`,`farm`,`cactus`,`landmark`,`station`,`apartment`,`civic`,`tower`]),Sg=e=>structuredClone(e),Cg=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z);function wg(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}function Tg(e){return e?.id==null?`tree:${e?.x}:${e?.z}:${e?.variant??0}`:String(e.id)}function Eg(e,t){return 2+wg(`${e}:${Tg(t)}:logs`)%3}function Dg(e){let t=e.width??bg.houseWidth,n=e.depth??bg.houseDepth;return{...e,width:t,depth:n,radius:Math.hypot(t,n)/2}}function Og(e,t,n,r,i=bg.clearance){let a=ke(e,t,n),o=t.rotation??0,s=Math.cos(o),c=Math.sin(o),l=a.x*s-a.z*c,u=a.x*c+a.z*s,d=Math.max(0,Math.abs(l)-(t.width??bg.houseWidth)/2),f=Math.max(0,Math.abs(u)-(t.depth??bg.houseDepth)/2);return d*d+f*f<(r+i)**2}function kg(e,t,n){let r=n.scale??1;return n.kind===`house`||n.kind===`civic`&&n.width&&n.depth?tn(e,Dg(t),Dg(n),bg.clearance):n.kind===`farm`&&n.width&&n.depth?tn(e,Dg(t),n,bg.clearance):Og(e,t,n,n.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[n.kind]??1)*r)}function Ag(e,{config:t=e.gameplay,surfaceAt:n=(t,n)=>lc(e,t,n),shared:r}={}){if(!t?.starterHouse||!Cg(t.starterHouse))throw TypeError(`Settlement requires a finite starter house`);let i=t.ownerId??t.starterHouse.ownerId??`teal`,a=[{...Sg(t.starterHouse),kind:`house`,ownerId:i,cityId:null,connected:!1}],o=[],s=[],c=[],l=r?.removedTreeIds??new Set,u=()=>r?.getBuildings?.()??[],d=()=>r?.getPaths?.()??[],f=Sg(t.farmVillages??{}),p=[...f.houses??[],...f.buildings??[]],m=f.paths??[],h=[],g=[],_=0,v=0,y=0,b=0,x=2,S=!1,C=new Map;function w(e=a,t=c){let n=new Map(e.map(e=>[e.id,e.id])),r=new Map(e.map((e,t)=>[e.id,t])),i=e=>{for(;n.get(e)!==e;)e=n.get(e);return e};for(let e of t){if(!n.has(e.fromHouseId)||!n.has(e.toHouseId))continue;let t=i(e.fromHouseId),a=i(e.toHouseId);t!==a&&n.set(r.get(t)<r.get(a)?a:t,r.get(t)<r.get(a)?t:a)}return new Map(e.map(e=>[e.id,i(e.id)]))}let T=e=>`city:${e}`;function E(){let t=w(),n=new Map;for(let e of a){let r=t.get(e.id);n.has(r)||n.set(r,[]),n.get(r).push(e)}let r=new Map(a.map(e=>[e.id,e.cityId]));h=[],g=[];for(let[t,a]of n){let n=a.length>=3?T(t):null;for(let e of a)e.connected=!!n,e.cityId=n;let s=Nn(e,a),c={id:T(t),...s,ownerId:i,level:In(a.length),houseCount:a.length,houseIds:a.map(e=>e.id)};if(g.push(c),!n)continue;let l=new Set(a.map(e=>r.get(e.id)).filter(Boolean));for(let e of o)l.has(e.cityId)&&(e.cityId=n);h.push(c)}let c=new Map([...a,...o].map(e=>[e.id,e]));for(let e of s)e.cityId=c.get(e.fromHouseId)?.cityId??c.get(e.toHouseId)?.cityId??null}function D(t){if(!Cg(t))return[];let n=w(),r=new Set;for(let i of a)tt(e,t,i)<=bg.connectionRange&&r.add(n.get(i.id));return a.filter(e=>r.has(n.get(e.id)))}function O(){return h.flatMap(e=>xn(a.filter(t=>t.cityId===e.id),o.filter(t=>t.cityId===e.id)).map(t=>({...t,cityId:e.id})))}let k=()=>[...new Set(O().map(e=>e.type))];function A(t,{player:i,placements:c=[],ready:f=!0,isReadyAt:h}={}){if(!Cg(t)||!Number.isFinite(t.rotation))return[`invalid-position`,`Choose a place for your house`];if(!f)return[`loading`,`Preparing this patch of ground`];if(i&&(!Cg(i)||Og(e,t,i,bg.playerRadius,.12)))return[`player-blocked`,`Step away from the blueprint`];for(let n of r?.getActors?.()??[])if(Cg(n)&&Og(e,t,n,bg.playerRadius,.12))return[`player-blocked`,`Leave room for the travellers`];for(let n of[...a,...o,...p,...u()])if(kg(e,t,n))return[`house-blocked`,`Leave a little room between buildings`];for(let n of[...s,...m,...d()])if(Rn(e,t,n))return[`path-blocked`,`Keep the village paths clear`];for(let n of c)if((xg.has(n.kind)||n.kind===`nature`&&n.style===`outcrop`)&&Cg(n)&&!a.some(e=>e.id===n.id)&&!o.some(e=>e.id===n.id)&&!(n.kind===`tree`&&l.has(Tg(n)))&&kg(e,t,n))return[n.kind===`tree`?`tree-blocked`:`scenery-blocked`,n.kind===`tree`?`Chop this tree to clear the ground`:`This spot is already occupied`];let g=Math.cos(t.rotation),_=Math.sin(t.rotation),v=t.width??bg.houseWidth,y=t.depth??bg.houseDepth,b=1/0,x=-1/0,S=Math.ceil(v/bg.terrainSampleSpacing),C=Math.ceil(y/bg.terrainSampleSpacing);for(let r=0;r<=S;r++)for(let i=0;i<=C;i++){let a=v*(r/S-.5),o=y*(i/C-.5),s=Ue(e,t.x,t.z,a*g+o*_,o*g-a*_);if(h&&!h(s))return[`loading`,`Preparing this patch of ground`];let c=n(s.x,s.z);if(!c||!Number.isFinite(c.height)||![`ground`,`mountain`].includes(c.type))return[`wet-ground`,`Choose dry ground away from the shore`];b=Math.min(b,c.height),x=Math.max(x,c.height)}return t.y=b,x-b>bg.maxHeightDifference?[`steep-ground`,`Find a flatter patch of ground`]:null}function j(r,{player:d,heading:f=0,placements:m=[],ready:h=!0,enforceReach:g=!0,isReadyAt:v}={}){let y=D(r),b=Dg({id:`${t.idPrefix??``}home-${x}`,kind:`house`,x:r?.x,z:r?.z,rotation:Cg(r)?Dn(e,r,y,{heading:f,seed:e.seed,placement:x}):0,scale:1,ownerId:i,variant:x%4}),S=null,C=1/0;for(let t of y){let n=tt(e,b,t);n<C&&(C=n,S=t.id)}let E=y.length+1,O=E>=3,k=O?T(y[0].id):null;b.cityId=k,b.connected=O;let j={house:b,cost:bg.houseCost,affordable:_>=bg.houseCost,connected:O,cityId:k,cityHouseCount:E,cityLevel:In(E),connectionHouseId:S,distanceToCity:C,path:null,paths:[],links:[]},M=(e,t)=>({...j,valid:!1,siteValid:!1,code:e,reason:t});if(!Cg(b)||!Number.isFinite(b.rotation))return M(`invalid-position`,`Choose a place for your house`);if(!h)return M(`loading`,`Preparing this patch of ground`);if(d&&(!Cg(d)||g&&tt(e,d,b)>bg.buildReach))return M(`out-of-reach`,`Move closer to build here`);let N=A(b,{player:d,placements:m,ready:h,isReadyAt:v});if(N)return M(...N);let P=w(),F=new Map,I=[...a,...o,...p,...u(),b,...m],L=(t,r)=>wn(e,t,r,{placements:I,surfaceAt:n,removedTreeIds:l});for(let t of a){let n=tt(e,b,t);if(n>bg.connectionRange)continue;let r=P.get(t.id);F.has(r)||F.set(r,[]),F.get(r).push({home:t,distance:n})}for(let e of F.values()){e.sort((e,t)=>e.distance-t.distance);let t=null;for(let{home:n}of e)if(t=L(b,n),t)break;if(!t)return M(`path-blocked`,`Leave a clear route to the neighbouring houses`);if(v&&!Tn(t.points,v))return M(`loading`,`Preparing the village path`);j.links.push(t),O&&j.paths.push({...t,cityId:k})}if(O){let e=new Set(y.map(e=>e.id)),t=new Set(s.map(e=>e.id)),n=new Map(a.map(e=>[e.id,e]));for(let r of c){if(t.has(r.id)||!e.has(r.fromHouseId))continue;let i=L(n.get(r.fromHouseId),n.get(r.toHouseId));if(!i)return M(`path-blocked`,`Leave room for the new city paths`);if(v&&!Tn(i.points,v))return M(`loading`,`Preparing the village path`);j.paths.push({...i,cityId:k})}}return j.path=j.paths[0]??null,j.affordable?{...j,valid:!0,siteValid:!0,code:`ready`,reason:O?`Joins your city`:y.length?`Grows your settlement`:`Starts a new outpost`}:{...j,valid:!1,siteValid:!0,code:`not-enough-logs`,reason:`Collect ${bg.houseCost-_} more ${bg.houseCost-_===1?`log`:`logs`}`}}function M(e,t){let n=j(e,t);if(!n.valid)return{ok:!1,...n};let r={...n.house};x++,delete r.width,delete r.depth,a.push(r),c.push(...n.links),s.push(...n.paths),_-=bg.houseCost,E(),b++;let i=N(t);return{ok:!0,house:Sg(r),paths:Sg(n.paths),addedBuildings:i.buildings,addedPaths:i.paths,developmentSearching:i.searching,cost:bg.houseCost,connected:r.connected,cityId:r.cityId,cityHouseCount:n.cityHouseCount,cityLevel:n.cityLevel,totalLogs:_}}function N(t={}){let r=[],c=[],d=O(),f=Cg(t.player)?t.player:null,m=t=>!!t.playerAnchor!=!!f||f&&tt(e,t.playerAnchor,f)>1,h=On.routeBudget,g=On.candidateBudget;if(S=!1,t.ready!==!1)for(let _ of d){let d=a.filter(e=>e.cityId===_.cityId),v=`${_.cityId}:${_.type}`,y=`${d.map(e=>e.id).join(`:`)}:${l.size}`,b=C.get(v);if((!b||b.layoutKey!==y||b.placements!==t.placements||b.isReadyAt!==t.isReadyAt||b.complete&&m(b))&&(b={layoutKey:y,placements:t.placements,isReadyAt:t.isReadyAt,playerAnchor:f?{x:f.x,z:f.z}:null,offset:0,complete:!1},C.set(v,b)),b.complete)continue;let x=Cn(e,d),w=null,T=null;for(let r=b.offset;r<x.length;r++){if(!h||!g){b.offset=r,S=!0;break}g--;let s=x[r],c=Dg({id:`civic:${_.cityId}:${_.type}`,kind:`civic`,buildingType:_.type,x:s.x,z:s.z,rotation:Pn(e,s,d),scale:1,ownerId:i,connected:!0,..._}),f=d.map(t=>({home:t,distance:tt(e,c,t)})).filter(e=>e.distance<=bg.connectionRange).sort((e,t)=>e.distance-t.distance);if(!f.length||A(c,t)){b.offset=r+1;continue}h--,b.offset=r+1;let m=wn(e,c,f[0].home,{placements:[...a,...o,...p,...u(),...t.placements??[]],surfaceAt:n,removedTreeIds:l,maxNodes:On.maxRouteNodes});if(m&&(!t.isReadyAt||Tn(m.points,t.isReadyAt))){w=c,T=m;break}}w?(T.cityId=_.cityId,o.push(w),s.push(T),r.push(w),c.push(T),b.complete=!0):b.offset>=x.length?(b.complete=!0,m(b)&&(S=!0)):S=!0}return r.length&&b++,{buildings:Sg(r),paths:Sg(c),searching:S,pendingMilestones:k(),pendingDevelopments:Sg(O())}}function P(t,{player:n}={}){if(t?.kind!==`tree`||!Cg(t))return{ok:!1,code:`not-a-tree`};let r=Tg(t);if(l.has(r))return{ok:!1,code:`already-chopped`};if(n&&(!Cg(n)||tt(e,n,t)>bg.chopReach))return{ok:!1,code:`out-of-reach`};let i=Eg(e.seed,t);return l.add(r),_+=i,b++,{ok:!0,treeId:r,logs:i,totalLogs:_}}function F(e){if(!Number.isSafeInteger(e)||e<=y)return null;let t=e-y,n=a.filter(e=>e.ownerId===i&&e.connected&&e.cityId!=null);y=e;let r=n.length*t;return v+=r,b++,{id:`income:${e}`,day:e,days:t,amount:r,totalGold:v,houses:Sg(n)}}function I(e){return!Number.isSafeInteger(e)||e<=0?{ok:!1,code:`invalid-cost`}:v<e?{ok:!1,code:`not-enough-gold`,cost:e,totalGold:v}:(v-=e,b++,{ok:!0,cost:e,totalGold:v})}return E(),{get logs(){return _},get gold(){return v},get developmentSearching(){return S},get revision(){return b},get ownerId(){return i},get houses(){return Sg(a)},get buildings(){return Sg(o)},get cities(){return Sg(h)},get clusters(){return Sg(g)},get pendingMilestones(){return k()},get pendingDevelopments(){return Sg(O())},get paths(){return Sg(s)},get removedTreeIds(){return new Set(l)},isTreeRemoved(e){return l.has(typeof e==`string`?e:Tg(e))},snapshot(){return{logs:_,gold:v,lastIncomeDay:y,revision:b,ownerId:i,developmentSearching:S,houses:Sg(a),buildings:Sg(o),cities:Sg(h),clusters:Sg(g),pendingMilestones:k(),pendingDevelopments:Sg(O()),paths:Sg(s),removedTreeIds:[...l]}},evaluateBuild:j,build:M,chop:P,develop:N,settleIncome:F,spendGold:I}}function jg(e,{getActors:t=()=>[],getInfrastructure:n=()=>null,surfaceAt:r}={}){let i=[],a=new Set,o=-1,s=[],c=[],l=[],u=()=>i.reduce((e,t)=>e+t.revision,0)+(n()?.revision??0);function d(){let e=u();if(e===o)return;let t=n();s=[...i.flatMap(e=>[...e.houses,...e.buildings]),...t?.buildings??[]],c=[...i.flatMap(e=>e.paths),...t?.paths??[]],l=[...c,...t?.corridors??[]],o=e}let f={removedTreeIds:a,getActors:t,getBuildings(){return d(),s},getPaths(){return d(),l}},p=Ag(e,{shared:f,surfaceAt:r});return i.push(p),{player:p,bots:(e.gameplay.playerBots??[]).map(t=>{let n={...t,idPrefix:`${t.id}:`,farmVillages:e.gameplay.farmVillages},a=Ag(e,{config:n,shared:f,surfaceAt:r});return i.push(a),{config:n,game:a}}),shared:f,get revision(){return u()},get buildings(){return d(),s},get paths(){return d(),c}}}var Mg=Object.freeze({speed:2.3,targetHouses:15,swingDuration:.58,swingImpact:.22,constructionTime:2,decisionInterval:.16,radius:.17,searchRadius:38,navigationStep:.65,maxRouteNodes:1100,routeNodeBudget:12}),Ng=Math.PI*2,Pg=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Fg=e=>Math.atan2(Math.sin(e),Math.cos(e)),Ig=new Set([`house`,`civic`,`apartment`,`tower`,`station`,`landmark`,`tree`,`rock`,`farm`,`cactus`]),Lg=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z);function Rg(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return(t>>>0)/4294967296}var zg=class{items=[];push(e){let t=this.items;t.push(e);let n=t.length-1;for(;n;){let r=n-1>>1;if(t[r].score<=e.score)break;t[n]=t[r],n=r}t[n]=e}pop(){let e=this.items,t=e[0],n=e.pop();if(e.length){let t=0;for(;t*2+1<e.length;){let r=t*2+1;if(r+1<e.length&&e[r+1].score<e[r].score&&r++,e[r].score>=n.score)break;e[t]=e[r],t=r}e[t]=n}return t}get length(){return this.items.length}};function Bg(e,t,{config:n,getPlacements:r=()=>e.gameplay?.botScenery??[],getRevision:i=()=>t.revision,onChop:a=()=>{},onBuild:o=()=>{},surfaceAt:s=(t,n)=>lc(e,t,n)}={}){if(!Lg(n?.spawn)||!Lg(n?.starterHouse))throw TypeError(`Player bot requires a spawn and starting house`);let c={x:n.spawn.x,y:s(n.spawn.x,n.spawn.z).height+.035,z:n.spawn.z},l=n.starterHouse,u=Rg(`${e.seed}:${n.id}`)*Ng,d=new Map,f=n.spawn.heading??0,p=0,m=0,h=0,g=`thinking`,_=Rg(n.id)*.4,v=null,y=[],b=new Map,x=[],S=0,C=null,w=!1,T=!1,E=0,D=[],O=null,k=[],A=0,j=null,M=null,N=0,P=0,F=-1,I=1,L=0;function R(){F!==t.revision&&(F=t.revision,I=t.houses.length,L=t.cities[0]?.level??0)}let z={distance:0,trees:0,logsEarned:0,houses:0,routeSearches:0,routeNodes:0,siteChecks:0,blocked:0};function B(){let e=i();if(e===v)return;v=e;let n=new Set;y=[];for(let e of[...r(),...t.houses,...t.buildings]){if(!Lg(e)||Pg(e,l)>Mg.searchRadius+14)continue;let t=e.id??e;n.has(t)||(n.add(t),y.push(e))}b=new Map;for(let e of y){if(!(Ig.has(e.kind)||e.kind===`nature`&&e.style===`outcrop`)||e.kind===`tree`&&t.isTreeRemoved(e))continue;let n=e.scale??1,r=e.kind===`tree`||[`rock`,`cactus`,`nature`].includes(e.kind),i=e.kind===`tree`?.14*n:e.kind===`rock`?.59*n:e.kind===`cactus`?.31*n:e.radius??1,a=(e.width??(e.kind===`house`?2.2:3.5))*n/2,o=(e.depth??(e.kind===`house`?2.2:3.5))*n/2,s=(r?i:Math.hypot(a,o))+Mg.radius+.04,c={x:e.x,z:e.z,circle:r,radius:i,halfWidth:a,halfDepth:o,c:Math.cos(e.rotation??0),s:Math.sin(e.rotation??0)};for(let t=Math.floor((e.x-s)/3);t<=Math.floor((e.x+s)/3);t++)for(let n=Math.floor((e.z-s)/3);n<=Math.floor((e.z+s)/3);n++){let e=`${t}:${n}`;b.has(e)||b.set(e,[]),b.get(e).push(c)}}k=[],A=0,E=0,O=null,j=null}function V(e){let t=`${Math.round(e.x*1e4)}:${Math.round(e.z*1e4)}`;return d.has(t)||(d.size>32e3&&d.clear(),d.set(t,s(e.x,e.z))),d.get(t)}function H(e,t=.035){let n=V(e);if(!n||!Number.isFinite(n.height)||![`ground`,`mountain`].includes(n.type))return!1;for(let[t,r]of[[.17,0],[-.17,0],[0,.17],[0,-.17]]){let i=V({x:e.x+t,z:e.z+r});if(!i||![`ground`,`mountain`].includes(i.type)||Math.abs(i.height-n.height)>.17*.65)return!1}for(let n of b.get(`${Math.floor(e.x/3)}:${Math.floor(e.z/3)}`)??[]){let r=e.x-n.x,i=e.z-n.z;if(n.circle){let e=n.radius+Mg.radius+t;if(r*r+i*i<e*e)return!1}else{let e=r*n.c-i*n.s,a=r*n.s+i*n.c;if(Math.abs(e)<n.halfWidth+Mg.radius+t&&Math.abs(a)<n.halfDepth+Mg.radius+t)return!1}}return!0}function U(e,t,n=.035){let r=Pg(e,t),i=Math.max(1,Math.ceil(r/.08)),a=V(e);for(let o=1;o<=i;o++){let s={x:e.x+(t.x-e.x)*o/i,z:e.z+(t.z-e.z)*o/i};if(!H(s,n))return!1;let c=V(s);if(Math.abs(c.height-a.height)>r/i*.65+.008)return!1;a=c}return!0}function*W(e){if(!H(e))return null;if(U(c,e))return[{...e}];z.routeSearches++,yield;let t=Mg.navigationStep,n=Math.min(c.x,e.x)-5,r=Math.max(c.x,e.x)+5,i=Math.min(c.z,e.z)-5,a=Math.max(c.z,e.z)+5,o={x:c.x,z:c.z,ix:0,iz:0,cost:0,score:Pg(c,e),parent:null},s=new Map([[`0:0`,o]]),l=new zg;l.push(o);let u=null,d=0;for(;l.length&&d++<Mg.maxRouteNodes;){d%Mg.routeNodeBudget===0&&(yield),z.routeNodes++;let o=l.pop();if(!(o.closed||s.get(`${o.ix}:${o.iz}`)!==o)){if(o.closed=!0,Pg(o,e)<t*1.5&&U(o,e)){u=o;break}for(let u=-1;u<=1;u++)for(let d=-1;d<=1;d++){if(!u&&!d)continue;let f=o.ix+u,p=o.iz+d,m=`${f}:${p}`,h=s.get(m);if(h?.closed||h?.blocked)continue;let g=c.x+f*t,_=c.z+p*t;if(g<n||g>r||_<i||_>a)continue;let v=o.cost+Math.hypot(u,d)*t;if(h&&v>=h.cost)continue;let y={x:g,z:_};if(!H(y)){s.set(m,{blocked:!0});continue}if(!U(o,y))continue;let b={x:g,z:_,ix:f,iz:p,cost:v,score:v+Pg(y,e),parent:o};s.set(m,b),l.push(b)}}}if(!u)return null;let f=[e];for(let e=u;e;e=e.parent)f.push({x:e.x,z:e.z});let p=f.reverse(),m=[],h=0;for(;h<p.length-1;){yield;let e=p.length-1,t=0;for(;e>h+1&&!U(p[h],p[e]);)e--,++t%3==0&&(yield);m.push({...p[e]}),h=e}return m.some((e,t)=>!U(t?m[t-1]:c,e))?null:m}let ee=e=>({placements:y,ready:!0,enforceReach:!0,heading:C?.heading??f,...e?{player:e}:{}});function te(e,t){x=e,S=0,C=t,g=`walking`,_=0}function*ne(e=null){(!k.length||j!==v||e)&&(k=y.filter(e=>e.kind===`tree`&&!t.isTreeRemoved(e)&&Pg(e,l)<=Mg.searchRadius).sort((t,n)=>(e&&t.id===e.id?-1e4:Pg(c,t)+Pg(l,t)*.2)-(e&&n.id===e.id?-1e4:Pg(c,n)+Pg(l,n)*.2)),A=0,j=v);for(let e=0;e<2&&A<k.length;e++,A++){let e=k[A];if(t.isTreeRemoved(e))continue;let n=Math.atan2(c.x-e.x,c.z-e.z);for(let t of[0,Math.PI/2,-Math.PI/2,Math.PI]){let r={x:e.x+Math.sin(n+t)*.86,z:e.z+Math.cos(n+t)*.86};if(!H(r)||t!==0&&Math.abs(t)!==Math.PI&&!U(c,r))continue;let i=yield*W(r);if(i)return te(i,{kind:`tree`,tree:e}),!0}}return A>=k.length&&(k=[],_=2),!1}function re(){D=[];for(let e=0;e<9;e++){let t=4.2+e*2.9,n=10+e*5;for(let r=0;r<n;r++){let i=r/n*Ng+u+e*.37;D.push({x:l.x+Math.sin(i)*t,z:l.z+Math.cos(i)*t})}}}function*ie(){let e=t.houses;for(let n=0;n<5&&E<D.length;n++,E++){yield;let n=D[E];if(!e.some(e=>Pg(n,e)<=bg.connectionRange))continue;let r=Math.atan2(n.x-c.x,n.z-c.z);z.siteChecks++;let i=t.evaluateBuild(n,{placements:y,heading:r,player:c,enforceReach:!1});if(!i.siteValid){i.code===`tree-blocked`&&!O&&(O=y.filter(e=>e.kind===`tree`&&!t.isTreeRemoved(e)&&Pg(e,n)<Math.hypot(bg.houseWidth,bg.houseDepth)/2+(e.radius??.85*(e.scale??1))+bg.clearance).sort((e,t)=>Pg(e,c)-Pg(t,c))[0]??null);continue}let a={kind:`house`,site:{...n},heading:r};if(Pg(c,n)<bg.buildReach-.3)return C=a,g=`building`,N=0,!0;let o=Math.atan2(c.x-n.x,c.z-n.z);for(let e of[0,Math.PI/2,-Math.PI/2,Math.PI]){let t=yield*W({x:n.x+Math.sin(o+e)*2.5,z:n.z+Math.cos(o+e)*2.5});if(t)return te(t,a),!0}}if(E>=D.length){if(O){let e=O;return O=null,E=0,yield*ne(e)}E=0,_=2}return!1}function*G(){B(),p=0;let e=t.develop(ee(c));if(e.buildings.length)B(),N=Mg.constructionTime,g=`construction`;else if(t.houses.length>=Mg.targetHouses){if(!t.pendingMilestones.length){T=!0,g=`complete`,C=null;return}if(!e.searching){let e=t.houses,n={x:e.reduce((e,t)=>e+t.x,0)/e.length,z:e.reduce((e,t)=>e+t.z,0)/e.length},r=y.filter(e=>e.kind===`tree`&&!t.isTreeRemoved(e)&&Pg(e,n)<18).sort((e,t)=>Pg(e,n)-Pg(t,n))[0];r&&(yield*ne(r))}}else t.logs<bg.houseCost?yield*ne():yield*ie()}function ae(){M.next().done&&(M=null,g===`planning`&&(g=`thinking`))}function oe(e){if(P+=e,B(),!T){if(_=Math.max(0,_-e),p=0,g===`walking`){if(C.kind===`tree`&&t.isTreeRemoved(C.tree)){x=[],C=null,g=`thinking`;return}let n=Mg.speed*e,r=0;for(;n>1e-8&&S<x.length;){let t=x[S],i=Pg(c,t),a=Math.min(n,i);if(i<1e-6){S++;continue}let o={x:c.x+(t.x-c.x)*a/i,z:c.z+(t.z-c.z)*a/i};if(!U(c,o,0)){z.blocked++,x=[],g=`thinking`,_=.4,C=null;return}let s=Math.atan2(t.x-c.x,t.z-c.z);f+=Fg(s-f)*Math.min(1,e*14),c.x=o.x,c.z=o.z,c.y=V(o).height+.035,r+=a,n-=a,a>=i-1e-8&&S++}z.distance+=r,m+=r*Ng/1.05,p=r/e,S>=x.length&&(g=C.kind===`tree`?`chopping`:`building`,g===`chopping`?(h=Mg.swingDuration,w=!1,f=Math.atan2(C.tree.x-c.x,C.tree.z-c.z)):N=0)}else if(g===`chopping`){if(h=Math.max(0,h-e),!w&&h<=Mg.swingDuration-Mg.swingImpact){w=!0;let e=t.chop(C.tree,{player:c});e.ok&&(z.trees++,z.logsEarned+=e.logs,a(e,C.tree,{...c}))}h||(C=null,g=`thinking`,_=.2)}else if(g===`building`){f+=Fg(C.heading-f)*Math.min(1,e*14);let n=t.build(C.site,ee(c));n.ok?(z.houses++,o(n),g=`construction`,N=Mg.constructionTime):(g=`thinking`,_=.3,E++),C=null}else g===`construction`?(N-=e,N<=0&&(g=`thinking`,_=.12)):g===`planning`?ae():_||(_=Mg.decisionInterval,g=`planning`,M=G(),ae())}}return re(),B(),{game:t,config:n,update(e){if(!Number.isFinite(e)||e<=0||T)return;let t=Math.min(e,60);for(;t>1e-8&&!T;){let e=Math.min(t,1/30);oe(e),t-=e}},snapshot(){return R(),{id:n.id,ownerId:t.ownerId,position:{...c},heading:f,speed:p,gait:m,swingTime:h,state:g,houseCount:I,logs:t.logs,level:L,stopped:T,elapsed:P,stats:{...z},target:C?.kind===`tree`?{kind:`tree`,id:Tg(C.tree),x:C.tree.x,z:C.tree.z}:C?.site?{kind:`house`,...C.site}:null}},get position(){return{...c}},get state(){return g},get stopped(){return T},get stats(){return{...z}}}}var Vg=55,Hg=e=>Number.isFinite(e)?e:0;function Ug(e,t,n,{ownerId:r,markerParent:i=e,markerMapParent:a=t}={}){let o=n.players?.find(e=>e.id===r),s=Fc(o),c=Pc(o),l=qt(new y({color:Ut(.67,.12,((o?.color?.h??22)+140)%360),roughness:1,flatShading:!0})),u=new dt;u.name=`player-bot-${r??`neutral`}`,u.visible=!1,u.userData.ownerId=r,e.add(u);let d=wh(u,{coatMaterial:s.body,capMaterial:l,trouserMaterial:s.dark}),f=_g(i,a,n,{color:c.dark,accent:c.body,trim:c.trim,name:u.name}),p=new et,h=new et().makeRotationX(-Math.PI/2),g=!1;return{root:u,art:d,marker:f,update(e,{camera:t,mapBlend:r=0,walkingWeight:i=0,focus:a,viewportHeight:o=800,reducedMotion:s=!1}={}){if(g)return;let c=e?.position,l=c&&Number.isFinite(c.x)&&Number.isFinite(c.y)&&Number.isFinite(c.z);if(f.update({position:c,initialized:!!l,camera:t,mapBlend:r,walkingWeight:i,viewportHeight:o}),u.visible=!!l&&r<.999&&f.characterReadable&&(i<=.5||!a||tt(n,c,a)<=Vg),!l)return;let _=ot(n,c.x,c.z,Hg(e.heading));if(Ge(n,c.x,c.y,c.z,_,p),p.decompose(d.root.position,d.root.quaternion,d.root.scale),Ge(n,c.x,c.y+.001,c.z,_,p),d.shadow.matrix.copy(p).multiply(h),d.shadow.matrixWorldNeedsUpdate=!0,!u.visible)return;let v=Math.max(0,Hg(e.speed)),y=m.clamp(Hg(e.swingTime),0,Sh);Th(d,{gait:s?0:Hg(e.gait),moving:s?0:m.clamp(v/.7,0,1),running:0,grounded:!0,swingElapsed:Sh-y})},dispose(){g||(g=!0,u.removeFromParent(),d.dispose(),u.clear(),f.dispose(),Object.values(s).forEach(e=>e.dispose()),l.dispose())}}}function Wg(e,{buildingType:n,x:r=0,y:i=0,z:a=0,rotation:o=0,scale:s=1,palette:c}={}){let l=An(n);if(!l)throw TypeError(`Unknown settlement building: ${n}`);let u=c??{body:`teal`,light:`sage`,dark:`roofDark`,roof:`roofBlue`,accent:`gold`,trim:`trim`},d;if(n===`clock`)d=fp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c,animatedClocks:!0});else if(n===`hall`)d=hp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c,animatedClocks:!0});else if(n===`waterTower`)d=fp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:2,palette:c});else if(n===`plaza`)d=gp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c});else if(n===`library`)d=hp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:1,palette:c});else if(n===`guildhall`)d=hp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:2,palette:c});else if(n===`chapel`)d=fp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:1,palette:c});else if(d=Wf(e,r,i,a,o),d.scale.setScalar(s),n===`well`){$(d,0,.05,0,2.08,.1,2.08,`platform`);let e=new k,n=new w;for(let t=0;t<=8;t++){let r=t*Math.PI*2/8;t?(e.lineTo(Math.cos(r)*.53,Math.sin(r)*.53),n.lineTo(Math.cos(-r)*.35,Math.sin(-r)*.35)):(e.moveTo(.53,0),n.moveTo(.35,0))}e.holes.push(n);let r=new t(e,{depth:.48,bevelEnabled:!1,steps:1});r.rotateX(-Math.PI/2),Bf(d,r,u.light,0,.1,0),Vf(d,0,.295,0,.349,.349,.025,`water`,8);for(let e of[-1,1])$(d,e*.58,.75,0,.105,1.3,.13,u.dark);$(d,0,1.39,0,1.3,.1,.14,u.dark);let i=Vf(d,0,1.03,0,.045,.045,1.12,u.dark,8);i.rotation.z=Math.PI/2,$(d,0,.79,0,.018,.46,.018,`timber`),Gf(d,1.74,1.54,.34,1.4,u.roof)}else{$(d,0,.06,0,3.36,.12,2.5,`platform`);for(let e of[-1.36,1.36])for(let t of[-.9,.9])$(d,e,.88,t,.12,1.52,.12,u.dark);$(d,0,1.64,0,2.88,.1,1.96,u.trim),Gf(d,3.18,2.34,.6,1.66,u.roof),$(d,0,.3,.42,2.45,.36,.56,u.body),$(d,0,.51,.42,2.57,.06,.66,u.trim);for(let[e,t]of[-.78,0,.78].entries()){$(d,t,.59,.42,.61,.1,.45,u.dark);for(let n of[-.14,.14])Hf(d,t+n,.65,.42,.095,.065,.12,[`leafGold`,`redLight`,`leaf`][e])}}return d.name=`settlement-${n}`,d.userData.rigidSurfaceAsset=!0,d.userData.footprint={width:l.width,depth:l.depth,height:l.height},d.userData.entrance={x:0,z:l.doorOffset},d.userData.buildingType=n,d}var Gg=24,Kg=e=>(e=m.clamp(e,0,1),e*e*(3-2*e)),qg=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function Jg(e,t,n){let r=new Map,i=new Set,a=new Set,o=!1,s=new nt(1,1),c=new Dt(new Float32Array(384),1).setUsage(be);s.setAttribute(`dustOpacity`,c);let l=new ne({color:`#e8ddc1`,emissive:`#c3b794`,emissiveIntensity:.45,transparent:!0,depthWrite:!1,flatShading:!0});l.onBeforeCompile=e=>{e.vertexShader=`attribute float dustOpacity; varying float vDustOpacity;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
vDustOpacity = dustOpacity;`),e.fragmentShader=`varying float vDustOpacity;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.a *= vDustOpacity;`)},l.customProgramCacheKey=()=>`settlement-dust-v1`;let u=new Pe(s,l,384),d=new Ze({color:`#dfd3b0`,transparent:!0,depthWrite:!1});d.onBeforeCompile=l.onBeforeCompile,d.customProgramCacheKey=l.customProgramCacheKey;let f=new Pe(s,d,384);for(let e of[u,f])e.name=`construction-dust`,e.count=0,e.visible=!1,e.frustumCulled=!1,e.instanceMatrix.setUsage(be),e.renderOrder=4;let p=new dt,g=new dt;p.name=g.name=`settlement-construction`,p.add(u),g.add(f),e.add(p),t.add(g);let _=new et,v=new et,y=new et,b=new et,x=new Y,S=new Y,C=new _t,w=new Y(0,1,0),T=new Set,E=new h;function D(){T.clear();for(let e of r.values())for(let t of e.slots)t.batch.boundingBox||t.batch.computeBoundingBox(),t.batch.geometry.boundingBox||t.batch.geometry.computeBoundingBox(),_.copy(t.pose).scale(x.set(t.map?.6:1,+!!t.map,t.map?.6:1)),E.copy(t.batch.geometry.boundingBox).applyMatrix4(_),t.batch.boundingBox.union(E),T.add(t.batch);for(let e of T)e.boundingSphere||=new Ce,e.boundingBox.getBoundingSphere(e.boundingSphere)}function O(){T.clear();for(let e of r.values()){let t=.035+.965*Kg(e.age/1.55);for(let n of e.slots)x.set(n.map?.6+.4*t:1,n.map?1:t,n.map?.6+.4*t:1),_.copy(n.pose).scale(x),n.batch.setMatrixAt(n.index,_),n.batch.instanceMatrix.addUpdateRange(n.index*16,16),T.add(n.batch)}for(let e of T)e.instanceMatrix.needsUpdate=!0}function k(e){for(let t of e.slots)t.batch.setMatrixAt(t.index,t.pose),t.batch.instanceMatrix.addUpdateRange(t.index*16,16),t.batch.instanceMatrix.needsUpdate=!0;r.delete(e.item.id),i.delete(e.item.id)}function A(e){let t=0;for(let e of r.values()){let{item:r,seed:i}=e;Ge(n,r.x,r.y??0,r.z,r.rotation??0,v),y.makeRotationY(r.rotation??0),y.setPosition(r.x,.72,r.z);let a=(r.width??2.2)*(r.scale??1)/2,o=(r.depth??2.2)*(r.scale??1)/2;for(let n=0;n<Gg;n++){let r=i+n*17.31,s=qg(r)*.34,l=1.18+qg(r+4)*.4,d=(e.age-s)/l;if(d<=0||d>=1)continue;let p=(n/Gg+qg(r+1)*.04)*Math.PI*2,m=Math.sin(p),h=Math.cos(p),g=1/Math.max(Math.abs(m),Math.abs(h)),T=.12+d*(.65+qg(r+2)*.6),E=(.16+.34*Math.sin(Math.PI*d*.85))*(.75+qg(r+3)*.5);S.set(m*(a*g+T),E*.53+d*(.18+qg(r+5)*.43),h*(o*g+T)),x.set(E*(1.12+qg(r+6)*.4),E*.82,E),C.setFromAxisAngle(w,qg(r+7)*6+d*.5),b.compose(S,C,x),_.multiplyMatrices(v,b),u.setMatrixAt(t,_),S.y=.08,x.y=.08,b.compose(S,C,x),_.multiplyMatrices(y,b),f.setMatrixAt(t,_),c.setX(t++,.46*Kg(d/.14)*(1-Kg((d-.48)/.52)))}}u.count=f.count=t,u.visible=t>0&&e<.999,f.visible=t>0&&e>.001,t&&(u.instanceMatrix.needsUpdate=f.instanceMatrix.needsUpdate=c.needsUpdate=!0)}return{activeIds:i,beginSync(e,{animate:t=!1,reducedMotion:n=!1}={}){let s=new Set(e.map(e=>e.id));for(let e of r.values())(!s.has(e.item.id)||n)&&k(e);for(let e of r.values())e.slots.length=0;if(o&&t&&!n){for(let t of e)if(!a.has(t.id)){r.size>=16&&k(r.values().next().value);let e=[...String(t.id)].reduce((e,t)=>e+t.charCodeAt(0),0);r.set(t.id,{item:{...t},seed:e,age:0,slots:[]}),i.add(t.id)}}a=s,o=!0},bind(e,t,n,i,{map:a=!1}={}){r.get(e.id)?.slots.push({batch:t,index:n,pose:i.clone(),map:a})},finishSync(){D(),O()},update(e,{mapBlend:t=0,reducedMotion:n=!1,night:i=0}={}){if(!r.size){u.visible=f.visible=!1,u.count=f.count=0;return}let a=Number.isFinite(e)?Math.max(0,e):0;l.emissiveIntensity=m.lerp(.45,.035,i);for(let e of r.values())e.age+=a,(e.age>=2||n)&&k(e);O(),A(t)},get count(){return r.size},get dustCount(){return u.count},dispose(){r.clear(),i.clear(),p.removeFromParent(),g.removeFromParent();for(let e of[u,f])e.dispose();s.dispose(),l.dispose(),d.dispose()}}}function Yg(e){let t=e=>new k(e.map(([e,t])=>new it(e,-t))),n=(e,t)=>{let n=new k;n.absarc(0,0,e,0,Math.PI*2,!1);let r=new w;return r.absarc(0,0,t,0,Math.PI*2,!0),n.holes.push(r),n},r;if(e===`well`)r=[n(1.05,.58)];else if(e===`clock`)r=[n(1.23,1.02),t([[-.1,-.78],[.1,-.78],[.1,-.1],[.64,-.1],[.64,.1],[-.1,.1]])];else if(e===`market`)r=[t([[-1.5,-.62],[0,-1.4],[1.5,-.62],[1.5,.78],[1,.52],[.5,.78],[0,.52],[-.5,.78],[-1,.52],[-1.5,.78]])];else if(e===`waterTower`)r=[t([[-1.04,-.65],[0,-1.23],[1.04,-.65],[1.04,.32],[.65,.32],[.85,1.2],[.51,1.2],[.32,.32],[-.32,.32],[-.51,1.2],[-.85,1.2],[-.65,.32],[-1.04,.32]])];else if(e===`plaza`){r=[n(.72,.42)];for(let[e,t]of[[-1.03,0],[1.03,0],[0,-1.03],[0,1.03]]){let n=new k;n.absarc(e,t,.3,0,Math.PI*2,!1),r.push(n)}}else if(e===`library`){let e=t([[-1.4,1],[-1.4,-.32],[-.88,-.32],[-.88,-.56],[-.67,-1.04],[-.3,-1.34],[.3,-1.34],[.67,-1.04],[.88,-.56],[.88,-.32],[1.4,-.32],[1.4,1]]);for(let t of[-.76,0,.76])e.holes.push(new w([new it(t-.13,-.72),new it(t+.13,-.72),new it(t+.13,-.04),new it(t-.13,-.04)]));r=[e]}else if(e===`guildhall`)r=[t([[-1.5,.94],[-1.5,-.82],[-1.1,-1.4],[-.7,-.82],[-.7,-.27],[.7,-.27],[.7,-.82],[1.1,-1.4],[1.5,-.82],[1.5,.94],[.26,.94],[.26,.25],[-.26,.25],[-.26,.94]])];else if(e===`chapel`)r=[t([[-1.05,.94],[-1.05,-.18],[-.37,-.58],[-.37,-1.12],[0,-1.66],[.37,-1.12],[.37,-.58],[1.05,-.18],[1.05,.94],[.21,.94],[.21,.18],[-.21,.18],[-.21,.94]])];else{let e=t([[-1.5,.95],[-1.5,-.65],[0,-1.42],[1.5,-.65],[1.5,.95]]);for(let t of[-.8,0,.8])e.holes.push(new w([new it(t-.15,-.62),new it(t+.15,-.62),new it(t+.15,.4),new it(t-.15,.4)]));r=[e]}let i=new K(r,12);return i.rotateX(-Math.PI/2),i}function Xg(e,t,n,{ownerId:r=n.gameplay.ownerId}={}){let i=new dt,a=new dt;i.name=`player-settlement`,a.name=`settlement-map`,e.add(i),t.add(a);let s=Jg(i,a,n),c=n.players.find(e=>e.id===r),l=Fc(c),u=[];for(let e=0;e<4;e++){let t=new dt;cp(t,{variant:e,palette:l}),yp(qf(t)),u.push(t)}let d=new Map,p=new Map;for(let{type:e}of Fn){let t=new dt;Wg(t,{buildingType:e,palette:l}),yp(qf(t)),d.set(e,t),p.set(e,Yg(e))}let m=new f(2.2,2.2,2.2);m.translate(0,1.1,0);let h=new v(`#5dd9b4`),g=new v(`#ec565c`),_=new Ze({color:h,transparent:!0,opacity:.2,depthWrite:!1}),y=new o(m,_),b=new o(m,_);y.name=b.name=`settlement-blueprint`,y.visible=b.visible=!1,y.renderOrder=b.renderOrder=5,i.add(y),a.add(b);let x=new ye(m),S=new Te({color:h,transparent:!0,opacity:.72,depthWrite:!1});y.add(new Oe(x,S)),b.add(new Oe(x,S));function C(e=256){let t=new Qe;return t.setAttribute(`position`,new H(new Float32Array(e*3),3).setUsage(be)),t.setAttribute(`lineDistance`,new H(new Float32Array(e),1).setUsage(be)),t.setDrawRange(0,0),t}let w=C(),T=C(),E=new At({color:h,dashSize:.12,gapSize:.09,transparent:!0,opacity:.9,depthWrite:!1}),D=new Oe(w,E),O=new Oe(T,E);for(let e of[D,O])e.name=`settlement-path-preview`,e.visible=!1,e.frustumCulled=!1,e.renderOrder=9;i.add(D),a.add(O);let k=new dt,A=new dt;k.name=`settlement-paths`,A.name=`settlement-map-paths`,i.add(k),a.add(A);let j=new Ze({color:X.sand,depthWrite:!1});function M(e){for(let e of[k,A]){for(let t of e.children)t.geometry.dispose();e.clear()}let t=zm(k,{...n,cityStreets:e});for(let e of t){let t=e.geometry;e.geometry=Xc(t,.6),t.dispose();let r=e.geometry.attributes.position;for(let e=0;e<r.count;e++)r.setY(e,lc(n,r.getX(e),r.getZ(e)).height+Lm);r.needsUpdate=!0,e.geometry.computeVertexNormals(),e.geometry.computeBoundingSphere(),e.castShadow=!1,e.receiveShadow=!0;let i=e.geometry.clone(),a=i.attributes.position;for(let e=0;e<a.count;e++)a.setY(e,.62);i.computeBoundingSphere();let s=new o(i,j);s.renderOrder=7,A.add(s)}}let N=new o(new Bt(.26,.32,28),new Ze({color:16768918,side:2,depthWrite:!1}));N.rotation.x=-Math.PI/2,N.renderOrder=8,N.visible=!1,i.add(N);let P=new z(1,5);P.rotateX(-Math.PI/2),P.rotateY(Math.PI);let F=new Ze({color:Pc(c).body,depthWrite:!1}),I=new et,L=new et,R=[],B,V=0,U=0,W=0,ee=[],te=[];function ne(e){if(e.length>W){for(let e of[...ee,...te])e.removeFromParent(),e.dispose();ee.length=te.length=0,W=Math.max(4,2**Math.ceil(Math.log2(e.length)));for(let[e,t]of d){for(let n of t.children){let t=new Pe(n.geometry,n.material,W);t.name=`settlement-civic-${e}`,t.userData.buildingType=e,t.castShadow=t.receiveShadow=!0,i.add(t),ee.push(t)}let n=new Pe(p.get(e),F,W);n.name=`settlement-civic-map-${e}`,n.userData.buildingType=e,n.renderOrder=8,a.add(n),te.push(n)}}for(let e of[...ee,...te])e.count=0;for(let t of e){Ge(n,t.x,t.y??0,t.z,t.rotation??0,I),I.scale(new Y().setScalar(t.scale??1));for(let e of ee)e.userData.buildingType===t.buildingType&&(s.bind(t,e,e.count,I),e.setMatrixAt(e.count++,I));L.makeRotationY(t.rotation??0),L.setPosition(t.x,.68,t.z);for(let e of te)!t.cityId&&e.userData.buildingType===t.buildingType&&(s.bind(t,e,e.count,L,{map:!0}),e.setMatrixAt(e.count++,L))}for(let e of[...ee,...te])e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.computeBoundingBox()}function re(e,t=[],r=[],o={}){if(s.beginSync([...e,...r],o),M(t),ne(r),!B||e.length>V){for(let e of R)e.removeFromParent(),e.dispose();B?.removeFromParent(),B?.dispose(),V=Math.max(16,2**Math.ceil(Math.log2(e.length))),R=[];for(let e=0;e<4;e++)for(let t of u[e].children){let n=new Pe(t.geometry,t.material,V);n.userData.variant=e,n.count=0,n.castShadow=n.receiveShadow=!0,i.add(n),R.push(n)}B=new Pe(P,F,V),B.renderOrder=8,a.add(B)}for(let e of R)e.count=0;let c=0;e.forEach(e=>{Ge(n,e.x,e.y??0,e.z,e.rotation??0,I);for(let t of R)t.userData.variant===(e.variant??0)%4&&(s.bind(e,t,t.count,I),t.setMatrixAt(t.count++,I));L.makeScale(1.6,1,1.6),L.setPosition(e.x,.66,e.z),e.cityId||(s.bind(e,B,c,L,{map:!0}),B.setMatrixAt(c++,L))});for(let e of R)e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.computeBoundingBox();B.count=c,B.instanceMatrix.needsUpdate=!0,B.computeBoundingSphere(),U++,s.finishSync(),i.updateMatrixWorld(!0)}return{root:i,mapRoot:a,sync:re,construction:s,get meshes(){return[...R,...ee].filter(e=>e.count>0&&e.material.userData.sceneStyle!==`window`)},get revision(){return U},preview(e,{visible:t=!1,targetTree:n=null}={}){if(y.visible=b.visible=t&&!!e?.house,D.visible=O.visible=!1,N.visible=!t&&!!n,N.visible&&(N.position.set(n.x,(n.y??0)+.025,n.z),N.scale.setScalar(Math.max(1,(n.scale??1)*1.15))),!y.visible)return;let r=e.house;y.position.set(r.x,r.y??0,r.z),y.rotation.y=r.rotation??0,b.position.set(r.x,.68,r.z),b.rotation.y=y.rotation.y,_.color.copy(e.valid?h:g),S.color.copy(_.color),D.material.color.copy(_.color);let i=e.paths??(e.path?[e.path]:[]),a=i.reduce((e,t)=>e+Math.max(0,t.points.length-1)*2,0);if(a){if(a>w.attributes.position.count){let e=2**Math.ceil(Math.log2(a));w.dispose(),T.dispose(),D.geometry=w=C(e),O.geometry=T=C(e)}let e=w.attributes.position,t=T.attributes.position,n=w.attributes.lineDistance,r=T.attributes.lineDistance,o=0;for(let{points:a}of i){let i=0;for(let s=1;s<a.length;s++){let c=a[s-1],l=a[s],u=Math.hypot(l.x-c.x,l.z-c.z);for(let[a,s]of[[c,i],[l,i+u]])e.setXYZ(o,a.x,(a.y??0)+.045,a.z),t.setXYZ(o,a.x,.69,a.z),n.setX(o,s),r.setX(o,s),o++;i+=u}}for(let e of[w,T])e.attributes.position.needsUpdate=e.attributes.lineDistance.needsUpdate=!0,e.setDrawRange(0,a);D.visible=O.visible=!0}},update({mapBlend:e=0,dt:t=0,reducedMotion:n=!1,night:r=0}={}){i.visible=e<.999,a.visible=e>.001,s.update(t,{mapBlend:e,reducedMotion:n,night:r})},dispose(){s.dispose(),i.removeFromParent(),a.removeFromParent();for(let e of[...R,...ee,...te])e.dispose();B?.dispose();for(let e of[...u,...d.values()]){for(let t of e.children)t.geometry.dispose();for(let t of e.userData.ownedMaterials??[])t.dispose()}for(let e of p.values())e.dispose();Object.values(l).forEach(e=>e.dispose()),w.dispose(),T.dispose(),E.dispose(),N.geometry.dispose(),N.material.dispose(),m.dispose(),_.dispose(),x.dispose(),S.dispose();for(let e of[k,A])for(let t of e.children)t.geometry.dispose();j.dispose(),P.dispose(),F.dispose()}}}var Zg=Object.freeze({visible:192,detailRadius:95,walkingRadius:48,doorInset:.24,selectionInterval:.25,routineRadius:24,indoorOffset:.2,doorstepHeight:.14,routeBudget:3,routeNodes:900,routeLength:160}),Qg=1e-5,$g=(e,t,n)=>Math.max(t,Math.min(n,e)),e_=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),t_=(e,t)=>Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z),n_=e=>`${Math.round(e.x*1e4)}:${Math.round(e.z*1e4)}:${Math.round(e.y*1e3)}`,r_=(e,t,n)=>({x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n,z:e.z+(t.z-e.z)*n}),i_=e=>Math.atan2(Math.sin(e),Math.cos(e));function a_(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}function o_(e){let t=e.randomState;return t^=t<<13,t^=t>>>17,t^=t<<5,e.randomState=t>>>0,e.randomState/4294967296}function s_(e,t){let n=new Map;if(Array.isArray(t))for(let e of t){let t=e.houseIds??[];if(t.length>=3)for(let r of t)n.set(r,e.id)}else{let t=new Map;for(let n of e)n.cityId!=null&&(t.has(n.cityId)||t.set(n.cityId,[]),t.get(n.cityId).push(n.id));for(let[e,r]of t)if(r.length>=3)for(let t of r)n.set(t,e)}return n}function c_(e,{trimStart:t=!0,trimEnd:n=!0}={}){let r=e.filter(e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z)).map(e=>({x:e.x,y:e.y??0,z:e.z}));for(let e=r.length-1;e>0;e--)e_(r[e],r[e-1])<Qg&&r.splice(e,1);if(r.length<2)return[];let i=r.slice(1).reduce((e,t,n)=>e+e_(r[n],t),0),a=Math.min(Zg.doorInset,i*.2);function o(){let e=a;for(;r.length>1;){let t=e_(r[0],r[1]);if(e<t){r[0]=r_(r[0],r[1],e/t);break}e-=t,r.shift()}}return t&&o(),r.reverse(),n&&o(),r.reverse(),r}function l_(e,t){let n=[],r=new Map,i=new Map,a=new Map;for(let n of e){let e=n.cityId??t.get(n.fromHouseId)??t.get(n.toHouseId);e!=null&&a.set(n.id,e)}let o=new Map(t);for(let t=0;t<2;t++)for(let t of e){let e=a.get(t.id)??o.get(t.fromHouseId)??o.get(t.toHouseId);e!=null&&(a.set(t.id,e),o.set(t.fromHouseId,e),o.set(t.toHouseId,e))}for(let t of e){let e=a.get(t.id);if(e==null)continue;let r=c_(t.points??[],t);for(let i=1;i<r.length;i++){let a=r[i-1],o=r[i];e_(a,o)<Qg||n.push({a,b:o,pathId:t.id,cityId:e,index:i,cuts:[0,1]})}}let s=new Map,c=new Set;for(let[e,t]of n.entries()){let{a:r,b:i}=t;for(let a=Math.floor(Math.min(r.x,i.x)/8);a<=Math.floor(Math.max(r.x,i.x)/8);a++)for(let o=Math.floor(Math.min(r.z,i.z)/8);o<=Math.floor(Math.max(r.z,i.z)/8);o++){let l=`${t.cityId}:${a}:${o}`;s.has(l)||s.set(l,[]);let u=s.get(l);for(let a of u){let o=`${a}:${e}`;if(c.has(o))continue;c.add(o);let s=n[a];if(s.pathId===t.pathId)continue;let l=i.x-r.x,u=i.z-r.z,d=s.b.x-s.a.x,f=s.b.z-s.a.z,p=s.a.x-r.x,m=s.a.z-r.z,h=l*f-u*d;if(Math.abs(h)>Qg){let e=(p*f-m*d)/h,n=(p*u-m*l)/h;e>=-1e-5&&e<=1.00001&&n>=-1e-5&&n<=1.00001&&Math.abs(r_(r,i,e).y-r_(s.a,s.b,n).y)<.12&&(t.cuts.push($g(e,0,1)),s.cuts.push($g(n,0,1)))}else if(Math.abs(p*u-m*l)<Qg){let e=l*l+u*u,n=d*d+f*f;for(let n of[s.a,s.b]){let a=((n.x-r.x)*l+(n.z-r.z)*u)/e;a>Qg&&a<.99999&&Math.abs(r_(r,i,a).y-n.y)<.12&&t.cuts.push(a)}for(let e of[r,i]){let t=((e.x-s.a.x)*d+(e.z-s.a.z)*f)/n;t>Qg&&t<.99999&&Math.abs(r_(s.a,s.b,t).y-e.y)<.12&&s.cuts.push(t)}}}u.push(e)}}function l(e,t){let n=`${t}:${n_(e)}`;return r.has(n)||r.set(n,{id:n,cityId:t,...e,edges:[]}),r.get(n)}for(let e of n){e.cuts.sort((e,t)=>e-t);for(let t=1;t<e.cuts.length;t++){let n=e.cuts[t-1],r=e.cuts[t];if(r-n<Qg)continue;let a=l(r_(e.a,e.b,n),e.cityId),o=l(r_(e.a,e.b,r),e.cityId);if(a.id===o.id)continue;let s=[a.id,o.id].sort().join(`|`);if(i.has(s)){i.get(s).pathIds.add(e.pathId);continue}let c={id:s,a,b:o,cityId:e.cityId,length:e_(a,o),pathIds:new Set([e.pathId])};i.set(s,c),a.edges.push(c),o.edges.push(c)}}return{nodes:r,edges:i}}function u_(e,t,n){let r=null;for(let i of e.edges.values())if(i.cityId===n){let{a:e,b:n}=i,a=n.x-e.x,o=n.z-e.z,s=$g(((t.x-e.x)*a+(t.z-e.z)*o)/(i.length*i.length),0,1),c=r_(e,n,s),l=e_(c,t);(!r||l<r.error)&&(r={edge:i,t:s,error:l,position:c})}return r}var d_=class{constructor(){this.items=[]}push(e){let t=this.items;t.push(e);let n=t.length-1;for(;n;){let r=n-1>>1;if(t[r].score<=e.score)break;t[n]=t[r],n=r}t[n]=e}pop(){let e=this.items,t=e[0],n=e.pop();if(e.length){let t=0;for(;t*2+1<e.length;){let r=t*2+1;if(r+1<e.length&&e[r+1].score<e[r].score&&r++,e[r].score>=n.score)break;e[t]=e[r],t=r}e[t]=n}return t}get length(){return this.items.length}};function f_(e,t){if(e.id===t.id)return[];let n=new d_,r=new Map([[e.id,{node:e,cost:0,parent:null,edge:null}]]);n.push({...r.get(e.id),score:e_(e,t)});let i=0;for(;n.length&&i++<Zg.routeNodes;){let e=n.pop();if(e.cost===r.get(e.node.id)?.cost){if(e.node.id===t.id){let t=[];for(let n=e;n.edge;n=n.parent)t.push(n.edge.id);return t.length<=Zg.routeLength?t.reverse():null}for(let i of e.node.edges){let a=i.a.id===e.node.id?i.b:i.a,o=e.cost+i.length,s=r.get(a.id);if(s&&s.cost<=o)continue;let c={node:a,cost:o,parent:e,edge:i,score:o+e_(a,t)};r.set(a.id,c),n.push(c)}}}return null}function p_(e,t,n,r,i,a=[]){let o=new Map,s=new Map,c=new Map;for(let n of t){let t=c_(n.points??[],n),r=n.cityId??i.get(n.fromHouseId)??i.get(n.toHouseId);if(t.length&&r!=null)for(let[i,a]of[[n.fromHouseId,t[0]],[n.toHouseId,t.at(-1)]]){let t=e.nodes.get(`${r}:${n_(a)}`);t&&!c.has(i)&&c.set(i,t)}}let l=e=>{o.set(e.id,e),s.has(e.cityId)||s.set(e.cityId,[]),s.get(e.cityId).push(e)};for(let t of[...n,...r]){let n=i.get(t.id)??t.cityId;if(n==null)continue;let r=c.get(t.id);if(!r){let i=u_(e,t,n);i&&(r=e_(i.edge.a,t)<e_(i.edge.b,t)?i.edge.a:i.edge.b)}if(!r)continue;let a=t.buildingType??`home`;l({id:t.id,cityId:n,kind:a,nodeId:r.id,x:r.x,z:r.z,lookX:t.x,lookZ:t.z,heading:Math.atan2(t.x-r.x,t.z-r.z)})}for(let e of a){let t=c.get(e.id);if(e.kind!==`farm`||!t||t.cityId!==e.cityId||o.has(e.id))continue;let n=e.lookX??e.x,r=e.lookZ??e.z;l({id:e.id,cityId:e.cityId,kind:`farm`,nodeId:t.id,x:t.x,z:t.z,lookX:n,lookZ:r,heading:Math.atan2(n-t.x,r-t.z)})}for(let t of e.nodes.values())t.edges.length>=3&&l({id:`junction:${t.id}`,cityId:t.cityId,kind:`junction`,nodeId:t.id,x:t.x,z:t.z,heading:0});for(let[t,n]of s)if(!n.some(e=>e.kind===`junction`)){let n=[...e.nodes.values()].filter(e=>e.cityId===t&&e.edges.length===2);for(let e of n.slice(0,8))l({id:`junction:${e.id}`,cityId:t,kind:`junction`,nodeId:e.id,x:e.x,z:e.z,heading:0})}return{destinations:o,byCity:s}}function m_(e={}){let t={nodes:new Map,edges:new Map},n=new Map,r=0,i=new Map,a=new Map,o=new Map,s=!1,c=0,l=0,u=0,d={walking:0,lingering:0,chatting:0,entering:0,indoors:0,leaving:0};function f(e,t,n){return!n||!t.edges.includes(n)?(e.moving=!1,!1):(e.edge=n,e.direction=n.a.id===t.id?1:-1,e.along=e.direction===1?0:n.length,!0)}function p(e,t){e.destinationId=t?.id??null,e.destinationKind=t?.kind??null,e.route=[],e.activity=s?`heading-home`:`walking`,e.arrived=!1}function m(e,t){let n=i.get(e.houseId),r=(a.get(e.cityId)??[]).filter(r=>r.id!==e.destinationId&&r.nodeId!==t.id&&(!n||e_(r,n)<=Zg.routineRadius));if(s){p(e,n);return}let o=r.map(t=>({target:t,weight:t.kind===`home`?t.id===e.houseId?.3:.7:t.kind===`market`?2.8:t.kind===`farm`?2.6:t.kind===`well`?2.1:t.kind===`plaza`?2.5:t.kind===`junction`?1.25:1.6}));if(!o.length){p(e,n),e.wait=2+o_(e)*3;return}let c=o_(e)*o.reduce((e,t)=>e+t.weight,0),l=o.at(-1).target;for(let e of o)if(c-=e.weight,c<=0){l=e.target;break}p(e,l)}function h(n){let r=o.get(n.houseId),a=i.get(n.houseId),s=t.nodes.get(a?.nodeId);if(!r||!s)return null;let c={...jn(e,r),y:(r.y??0)+Zg.doorstepHeight};if(e_(c,s)>.85)return null;let l={...jn(e,r,Zg.indoorOffset),y:c.y};return{entry:{x:s.x,y:s.y,z:s.z},door:c,inside:l}}function g(e){let t=h(e);return t?(e.portal={mode:`entering`,points:[t.entry,t.door,t.inside],index:0},e.activity=`entering`,e.wait=0,e.route=[],e.lookHeading=null,!0):(e.activity=`lingering`,e.wait=4,!1)}function _(e){let t=h(e);return t?(e.portal={mode:`leaving`,points:[t.door,t.entry],index:0},e.indoors=!1,u++,e.activity=`leaving`,e.arrived=!1,e.lookHeading=null,!0):(e.wait=1,!1)}function v(e,n){if(e.portal=null,n===`entering`){e.indoors=!0,u++,e.activity=`indoors`,e.wait=s?0:1+o_(e)*7,e.lookHeading=null;return}let r=u_(t,e,e.cityId);r&&r.error<2e-4&&Math.abs(r.position.y-e.y)<.002?(e.edge=r.edge,e.along=r.t*r.edge.length,e.direction=r.t>.5?-1:1):e.edge=null,e.route=[],e.destinationId=null,e.destinationKind=null,e.arrived=!1,e.activity=s?`heading-home`:`walking`,e.lookHeading=null,e.wait=0}function y(e,t){let n=0;for(;e.portal&&t>Qg;){let r=e.portal,i=r.points[r.index],a=t_(e,i);if(a<=Qg){++r.index>=r.points.length&&v(e,r.mode);continue}let o=e.speed*.94,s=Math.min(a,o*t),c=r_(e,i,s/a);e_(e,i)>Qg&&(e.lookHeading=Math.atan2(i.x-e.x,i.z-e.z)),Object.assign(e,c),t-=s/o,n+=s,s>=a-Qg&&++r.index>=r.points.length&&v(e,r.mode)}return{remaining:t,travelled:n}}function b(e,t){if(e.arrived=!0,e.route=[],e.lookHeading=t.lookX===void 0?t.heading:Math.atan2(t.lookX-e.x,t.lookZ-e.z),s&&t.id===e.houseId){g(e);return}e.activity=`lingering`;let n=t.kind===`market`?[4,8]:t.kind===`farm`?[5,9]:t.kind===`well`?[2,5]:t.kind===`plaza`?[5,10]:t.kind===`junction`?[2,5]:t.kind===`home`?[1,4]:[3,6];e.wait=(n[0]+o_(e)*n[1])*e.tempo,t.kind===`junction`&&(e.lookHeading=e.heading+(o_(e)-.5)*Math.PI)}function x(e,n){let r=i.get(e.destinationId);if((!r||r.cityId!==e.cityId||e.arrived)&&(m(e,n),r=i.get(e.destinationId)),!r)return e.wait=1,!1;if(r.nodeId===n.id)return b(e,r),!1;let a=e.route.length?t.edges.get(e.route[0]):null;if(!a||!n.edges.includes(a)){if(e.route=[],!c)return e.wait=.08,!1;c--,l++;let i=t.nodes.get(r.nodeId),o=i?f_(n,i):null;if(!o)return e.arrived=!s,e.wait=s?4:1+o_(e)*2,!1;e.route=o,a=t.edges.get(o[0])}return e.route.shift(),f(e,n,a)}function S({houses:s=[],paths:c=[],cities:l,buildings:u=[],destinations:d=[]}={}){let f=s_(s,l);o=new Map(s.map(e=>[e.id,e])),t=l_(c,f);let p=new Set;({destinations:i,byCity:a}=p_(t,c,s,u,f,d));for(let r of s){let i=f.get(r.id);if(i==null)continue;let a=`resident:${r.id}`;p.add(a);let o=n.get(a);if(o){if(o.cityId=i,o.route=o.route.filter(e=>t.edges.has(e)),o.indoors||o.portal)continue;if(!o.onRoad){let e=u_(t,r,i);e&&(Object.assign(o,e.position),o.edge=e.edge,o.along=e.t*e.edge.length,o.direction=e.t>.5?-1:1,o.onRoad=!0);continue}let e=o.edge&&t.edges.get(o.edge.id);if(e)o.edge=e;else{let e=u_(t,o,i),n=o.edge,r=o.direction;if(e&&e.error<2e-4&&Math.abs(e.position.y-o.y)<.002){o.edge=e.edge,o.along=e.t*e.edge.length;let t=Math.atan2(e.edge.b.x-e.edge.a.x,e.edge.b.z-e.edge.a.z),i=n?Math.atan2((n.b.x-n.a.x)*r,(n.b.z-n.a.z)*r):o.heading;o.direction=Math.cos(t-i)>=0?1:-1,o.route=[]}}continue}let s=a_(`${e.seed??`island`}:${a}`)||1;o={id:a,houseId:r.id,cityId:i,randomState:s,x:r.x,y:r.y??0,z:r.z,heading:r.rotation??0,edge:null,along:0,direction:1,wait:0,phase:0,moving:!1,distance:0,onRoad:!1,route:[],destinationId:null,destinationKind:null,activity:`lingering`,arrived:!1,idleTime:0,lookHeading:null,nightDelay:0,indoors:!1,portal:null},o.speed=.58+o_(o)*.32,o.wait=o_(o)*1.8,o.phase=o_(o)*Math.PI*2,o.tempo=.85+o_(o)*.3,o.arrivalOffset=.18+o_(o)*.7;let c=u_(t,r,i);c&&(Object.assign(o,c.position),o.edge=c.edge,o.along=c.t*c.edge.length,o.onRoad=!0,o.direction=c.t>.5?-1:1,o.heading=Math.atan2((c.edge.b.x-c.edge.a.x)*o.direction,(c.edge.b.z-c.edge.a.z)*o.direction)),n.set(a,o)}for(let e of n.keys())p.has(e)||n.delete(e);r++}function C(e,{night:r=0,dayPhase:a}={}){if(!Number.isFinite(e)||e<=0)return;let o=a?a===`night`:r>(s?.35:.65);if(o!==s){s=o;for(let e of n.values())e.route=[],e.nightDelay=s?o_(e)*6:0,e.indoors?e.wait=s?0:1+o_(e)*7:e.portal||(e.arrived=!1,e.destinationId=null,e.destinationKind=null,e.wait=s?Math.min(e.wait,e.nightDelay):1+o_(e)*7,e.activity=s?`heading-home`:`lingering`)}let u=Math.min(e,.5);c=Zg.routeBudget,l=0;for(let e of n.values()){let n=u,r=0;for(e.moving=!1,e.idleTime+=u,e.nightDelay=Math.max(0,e.nightDelay-u),s&&!e.indoors&&!e.portal&&e.nightDelay===0&&e.destinationId!==e.houseId&&p(e,i.get(e.houseId));n>Qg&&!(e.indoors&&s);){if(e.wait>0){let t=Math.min(e.wait,n);if(e.wait-=t,n-=t,n<Qg)break}if(e.indoors&&!_(e))break;if(e.portal){let t=y(e,n);n=t.remaining,r+=t.travelled;continue}let a=e.edge;if(!a)break;let o=e.direction>0?a.length-e.along:e.along;if(o<=Qg){let n=e.direction>0?a.b:a.a,r=t.nodes.get(n.id);if(!r){e.edge=null;break}if(!x(e,r))continue;e.activity=s?`heading-home`:`walking`,e.lookHeading=null;continue}let c=i.get(e.destinationId),l=e.direction>0?a.b:a.a,u=c?.nodeId===l.id&&!e.arrived?Math.min(e.arrivalOffset,a.length*.65):0;if(u&&o<=u+Qg){b(e,c);continue}let d=e.speed*(s?.94:1),f=Math.min(o-u,d*n);e.along+=f*e.direction,n-=f/d,r+=f;let p=$g(e.along/a.length,0,1);e.x=a.a.x+(a.b.x-a.a.x)*p,e.y=a.a.y+(a.b.y-a.a.y)*p,e.z=a.a.z+(a.b.z-a.a.z)*p}e.moving=r>Qg,e.distance+=r,e.phase+=r*Math.PI*2/.43;let a=e.edge,o=e.lookHeading??(a?Math.atan2((a.b.x-a.a.x)*e.direction,(a.b.z-a.a.z)*e.direction):e.heading);e.heading+=i_(o-e.heading)*(1-Math.exp(-u*8))}let f=new Map;for(let e of n.values())if(!s&&!e.indoors&&!e.portal&&!e.moving&&e.wait>.2&&e.arrived){e.activity=`lingering`;let t=`${e.cityId}:${Math.floor(e.x/2)}:${Math.floor(e.z/2)}`;f.has(t)||f.set(t,[]),f.get(t).length<8&&f.get(t).push(e)}for(let e of n.values())if(!s&&e.activity===`lingering`&&e.arrived){let t=null,n=Math.floor(e.x/2),r=Math.floor(e.z/2);for(let i=-1;i<=1&&!t;i++)for(let a=-1;a<=1&&!t;a++)for(let o of f.get(`${e.cityId}:${n+i}:${r+a}`)??[]){let n=e_(e,o);if(o!==e&&n>.12&&n<1.5){t=o;break}}t&&(e.activity=`chatting`,e.lookHeading=Math.atan2(t.x-e.x,t.z-e.z))}for(let e of Object.keys(d))d[e]=0;for(let e of n.values())d[e.activity===`heading-home`?`walking`:e.activity]=(d[e.activity===`heading-home`?`walking`:e.activity]??0)+1}return{sync:S,update:C,get residents(){return n},get graph(){return t},get revision(){return r},get visibilityRevision(){return u},get stats(){return{night:s,indoors:d.indoors,routeSearches:l,activities:{...d}}},snapshot(){return[...n.values()].map(({edge:e,randomState:t,route:n,lookHeading:r,portal:i,...a})=>({...a,transition:i?.mode??null,pathIds:e?[...e.pathIds]:[],edgeId:e?.id??null}))},dispose(){n.clear(),i.clear(),a.clear(),o.clear(),t={nodes:new Map,edges:new Map}}}}function h_(e,t,{ownerId:n=t.gameplay?.ownerId}={}){let r=new dt;r.name=`settlement-residents`,e.add(r);let i=t.players?.find(e=>e.id===n),a=Fc(i),o=new dt,s=_p(o,{color:a.body});s.remove(s.children[0],s.children[1]),yp(qf(o));let l=o.children[0],u=new Pe(l.geometry,l.material,Zg.visible);u.name=`resident-bodies`;let d=qt(new y({color:16777215,roughness:1,flatShading:!0})),p=new Pe(new f(1,1,1),d,Zg.visible*4);p.name=`resident-limbs`;for(let e of[u,p])e.count=0,e.frustumCulled=!1,e.castShadow=e.receiveShadow=!0,e.instanceMatrix.setUsage(be),r.add(e);for(let e=0;e<Zg.visible*4;e++)p.setColorAt(e,e%2?a.body.color:Yt.metal.color);let m=m_(t),h=new et,g=new c,_=new et,v=[],b=[],x=1/0,S=null,C=0,w=0,T=-1;function E(e,n){b.length=0;for(let r of m.residents.values())if(r.edge&&!r.indoors){let i=tt(t,e,r);i<n&&b.push({resident:r,d:i})}b.sort((e,t)=>e.d-t.d),v.length=0;for(let e=0;e<Math.min(Zg.visible,b.length);e++)v.push(b[e].resident);S={x:e.x,z:e.z},C=n,x=0}function D(e){m.sync(e),x=1/0}function O(e,{focus:n={x:0,z:0},mapBlend:i=0,walkingWeight:a=0,visible:o=!0,reducedMotion:s=!1,night:c=0,dayPhase:l,unavailableHomes:d}={}){if(m.update(e,{night:c,dayPhase:l}),x+=e,r.visible=o&&i<.98,!r.visible){w=0;return}let f=a>.5?Zg.walkingRadius:Zg.detailRadius;(T!==m.visibilityRevision||x>=Zg.selectionInterval||!S||C!==f||tt(t,n,S)>3)&&E(n,f),T=m.visibilityRevision;let y=0,b=0;for(let e of v){if(e.indoors||d?.has?.(e.houseId))continue;Ge(t,e.x,e.y+.012,e.z,e.heading,h),u.setMatrixAt(y++,h);let n=e.moving&&!s?Math.sin(e.phase)*.31:0;for(let t of[-1,1]){let r=n*t;g.position.set(t*.055,.32-Math.cos(r)*.16,-Math.sin(r)*.16),g.rotation.set(r,0,0),g.scale.set(.075,.32,.1),g.updateMatrix(),_.copy(h).multiply(g.matrix),p.setMatrixAt(b++,_);let i=!s&&e.activity===`chatting`&&t===1?-.28+Math.sin(e.idleTime*2.2)*.08:0,a=-r*.65+i;g.position.set(t*.143,.53-Math.cos(a)*.105,-Math.sin(a)*.105),g.rotation.set(a,0,t*-.035),g.scale.set(.052,.21,.075),g.updateMatrix(),_.copy(h).multiply(g.matrix),p.setMatrixAt(b++,_)}}u.count=w=y,p.count=b,u.instanceMatrix.needsUpdate=p.instanceMatrix.needsUpdate=!0}return{root:r,body:u,limbs:p,sync:D,update:O,snapshot:()=>m.snapshot(),get stats(){return{residents:m.residents.size,visible:w,edges:m.graph.edges.size,revision:m.revision,draws:w?2:0,...m.stats}},dispose(){m.dispose(),r.removeFromParent(),u.dispose(),p.dispose(),u.geometry.dispose(),p.geometry.dispose();for(let e of o.userData.ownedMaterials??[])e.dispose();d.dispose(),Object.values(a).forEach(e=>e.dispose()),v.length=b.length=0}}}function g_(e){let t=document.createElement(`canvas`);t.width=640,t.height=128;let n=t.getContext(`2d`),r=Pc(e);for(let e=1;e<=5;e++){let t=(e-.5)*128;n.beginPath(),n.arc(t,64,49,0,Math.PI*2),n.fillStyle=r.dark.getStyle(),n.fill(),n.beginPath(),n.arc(t,64,45,0,Math.PI*2),n.fillStyle=r.body.getStyle(),n.fill(),n.font=`700 78px system-ui, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillStyle=r.trim.getStyle(),n.fillText(String(e),t,67)}let i=new I(t);return i.colorSpace=_e,i}function __(e,t,n,{ownerId:r=n.gameplay.ownerId}={}){let i=g_(n.players.find(e=>e.id===r)),a=new Ze({map:i,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1});a.onBeforeCompile=e=>{e.vertexShader=`attribute float cityLevel;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <uv_vertex>`,`#include <uv_vertex>
      vMapUv.x = (vMapUv.x + cityLevel - 1.0) / 5.0;`)},a.customProgramCacheKey=()=>`city-level-numerals-v1`;let o=[],s=0,c,l,u,d=new Y,f=new Y,p=new Y,h=new Y,g=new et,_=new Y,v=new Y,y=new Y;function b(n){if(!(n<=s)){l?.removeFromParent(),u?.removeFromParent(),l?.dispose(),u?.dispose(),c?.dispose(),s=Math.max(8,2**Math.ceil(Math.log2(n))),c=new S(1,1),c.setAttribute(`cityLevel`,new Dt(new Float32Array(s),1)),l=new Pe(c,a,s),u=new Pe(c,a,s),l.name=`city-levels`,u.name=`city-levels-map`;for(let e of[l,u])e.count=0,e.frustumCulled=!1,e.renderOrder=18,e.instanceMatrix.setUsage(be);e.add(l),t.add(u)}}function x(e,t,n){v.copy(t).applyMatrix4(e.matrixWorldInverse);let r=e.projectionMatrix.elements,i=r[3]*v.x+r[7]*v.y+r[11]*v.z+r[15];return 2*Math.abs(i)/(Math.max(1,n)*Math.abs(r[5]))}return b(1),{sync(e){o=e,b(o.length)},update({camera:e,mapBlend:t=0,walkingWeight:r=0,viewportHeight:i=800}={}){if(!l||(l.visible=t<.999&&r<.8,u.visible=t>.001&&r<.8,l.count=u.count=0,!e||!l.visible&&!u.visible))return;a.opacity=1-m.smoothstep(r,.1,.8),e.updateMatrixWorld(!0),y.set(0,1,0).applyQuaternion(e.quaternion);let s=0;for(let t of o){if(Be(n,t.x,t.y??.7,t.z,d),rt(n,t.x,t.z,p),Tt(n)&&p.dot(h.copy(e.position).sub(d))<=0||(f.copy(d).project(e),f.z<-1||f.z>1||Math.abs(f.x)>1.08||Math.abs(f.y)>1.08))continue;let r=x(e,d,i);d.addScaledVector(y,r*24),_.setScalar(r*42),g.compose(d,e.quaternion,_),l.setMatrixAt(s,g),u.setMatrixAt(s,g),c.attributes.cityLevel.setX(s,m.clamp(t.level,1,5)),s++}l.count=u.count=s,l.instanceMatrix.needsUpdate=u.instanceMatrix.needsUpdate=c.attributes.cityLevel.needsUpdate=!0},dispose(){l?.removeFromParent(),u?.removeFromParent(),l?.dispose(),u?.dispose(),c?.dispose(),a.dispose(),i.dispose(),o=[]}}}function v_({world:e,session:t,parent:n,mapParent:r,markerParent:i,markerMapParent:a,detail:o,reducedMotion:s}){let c=e.gameplay.farmVillages,l=[...e.gameplay.botScenery??[],...c?.houses??[],...c?.buildings??[]],u=[],d=-1,f=-1,p=[];function m(){return d!==t.revision&&(u=[...l,...t.buildings],d=t.revision),u}let h=t.bots.map(({config:s,game:c})=>{let l={ownerId:s.ownerId},u=Xg(n,r,e,l);u.root.name=`${s.id}:settlement`,u.mapRoot.name=`${s.id}:map`;let d=h_(n,e,l),f=__(i,a,e,l),p=Ug(n,r,e,{...l,markerParent:i,markerMapParent:a});return{config:s,game:c,bot:Bg(e,c,{config:s,getPlacements:m,getRevision:()=>t.revision,onChop(e,t,n){let r={x:t.x-n.x,z:t.z-n.z};o.fellTree(e.treeId,{direction:r})||o.removeTree(e.treeId)}}),art:u,residents:d,levels:f,actor:p,revision:-1,houseCount:-1,buildingCount:-1,snapshot:null}});function g(){for(let e of h){if(e.revision===e.game.revision)continue;let t=e.game.snapshot();(e.houseCount!==t.houses.length||e.buildingCount!==t.buildings.length)&&(e.art.sync(t.houses,t.paths,t.buildings,{animate:e.revision>=0,reducedMotion:s?.matches}),e.residents.sync(t),e.levels.sync(t.cities),e.houseCount=t.houses.length,e.buildingCount=t.buildings.length,f=-1),e.snapshot=t,e.revision=e.game.revision}}return g(),{entries:h,get revision(){return h.reduce((e,t)=>e+t.game.revision,0)},get positions(){return h.map(e=>e.bot.position)},get meshes(){return g(),f!==t.revision&&(p=h.flatMap(e=>e.art.meshes),f=t.revision),p},snapshot(){return h.map(e=>({...e.bot.snapshot(),settlement:e.game.snapshot()}))},simulate(e,{completedDays:t=0}={}){for(let n of h)n.bot.update(e),n.game.settleIncome(t);g()},update(e,{camera:t,mapBlend:n=0,walkingWeight:r=0,focus:i,viewportHeight:a=800,night:o=0,dayPhase:c,uiDt:l=e}={}){g();for(let u of h)u.art.update({mapBlend:n,dt:l,reducedMotion:s?.matches,night:o}),u.residents.update(e,{focus:i,mapBlend:n,walkingWeight:r,visible:!0,reducedMotion:s?.matches,night:o,dayPhase:c,unavailableHomes:u.art.construction.activeIds}),u.levels.update({camera:t,mapBlend:n,walkingWeight:r,viewportHeight:a}),u.actor.update(u.bot.snapshot(),{dt:e,camera:t,mapBlend:n,walkingWeight:r,focus:i,viewportHeight:a,reducedMotion:s?.matches})},dispose(){for(let e of h)e.art.dispose(),e.residents.dispose(),e.levels.dispose(),e.actor.dispose()}}}var y_=(e,t)=>{e.textContent!==t&&(e.textContent=t)},b_=e=>Number.isFinite(e)?Math.max(0,Math.floor(e)):0,x_=new Intl.NumberFormat(`en-US`),S_=new Intl.NumberFormat(`en-US`,{notation:`compact`,maximumFractionDigits:0}),C_=e=>e<1e4?x_.format(e):S_.format(e);function w_(e){let t=b_(e),n=In(t),r=n===5;return{houses:t,level:n,complete:r,progress:r?1:(t-n*3)/3,next:r?null:(n+1)*3}}function T_(e,{gold:t=0,ready:n=!0}={}){let r=[`source`,`destination`,`planning`,`preview`].includes(e?.stage)?e.stage:`source`,i=Number.isFinite(e?.cost)?b_(e.cost):5,a=!!e?.hasCity,o=b_(t)>=i,s=r===`preview`,c=e?.sourceLabel||`Your city`,l=e?.targetLabel||`Destination`,u=r===`source`?`Choose one of your cities`:r===`destination`?`${c} → choose a destination`:`${c} → ${l}`,d=typeof e?.reason==`string`?e.reason.replace(/[.!]$/,``):``,f=!!(n&&a&&o&&s&&e?.canBuild),p,m=`info`;return n?a?r===`planning`?p=`Finding a clear route`:o?f?(p=`Ready to build`,m=`success`):d?(p=d,m=`error`):s?(p=`Choose another destination`,m=`error`):p=r===`source`?`Cities need at least 3 homes`:`Choose a city with at least 3 homes`:(p=`${i-b_(t)} more gold needed`,m=`error`):p=`Grow to 3 homes first`:p=`Preparing railway`,{stage:r,cost:i,hasCity:a,affordable:o,showConfirm:s,canBuild:f,selection:u,status:p,statusKind:m}}var E_=e=>`<svg class="settlement-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true">${e}</svg>`,D_={log:E_(`<path class="settlement-log-bark" d="m3 15 15-9 11 6v11l-15 8-11-6z"/><path class="settlement-log-light" d="m3 15 15-9 11 6-15 8z"/><path class="settlement-log-cut" d="m3 15 11 5v11L3 25z"/><path class="settlement-log-grain" d="m6 20 5 2v5l-5-3z"/><path class="settlement-log-seam" d="m17 23 9-5"/>`),coin:E_(`<path class="settlement-coin-edge" d="m16 2 7 2 6 7 1 7-4 8-7 4-8-1-7-6-2-8 4-8z"/><path class="settlement-coin-face" d="m16 5 6 2 4 5 1 6-4 6-5 3-6-1-5-5-2-6 4-6z"/><path class="settlement-coin-shine" d="m6 14 3-5 7-4 6 2-7 1-6 4-2 8z"/><path class="settlement-coin-mark" d="M14 10h4v13h-4z"/>`),sun:E_(`<path class="settlement-sun-rays" d="M14 0h4v5h-4zM14 27h4v5h-4zM0 14h5v4H0zM27 14h5v4h-5zM4 6l2-2 4 4-2 2zM22 24l2-2 4 4-2 2zM4 26l4-4 2 2-4 4zM22 8l4-4 2 2-4 4z"/><path class="settlement-sun-face" d="m16 7 7 3 3 6-3 7-7 3-6-3-3-7 3-6z"/><path class="settlement-sun-shade" d="m16 7 7 3 3 6-3 7-7 3 5-10z"/>`),moon:E_(`<path class="settlement-moon-face" d="m19 3-8 2-6 6-1 8 4 7 8 3 8-3 4-6-6 1-6-3-3-6 1-5z"/><path class="settlement-moon-shade" d="m4 19 4 7 8 3 8-3 4-6-6 1-6 4-7-2z"/>`)},O_=(e,t,n,r=``)=>`<button type="button" data-action="${e}" ${r}><kbd>${t}</kbd><span>${n}</span></button>`;function k_({parent:e=document.body,playerColor:t=`#37a98d`,onTool:n=()=>{},onView:r=()=>{},onBuild:i=()=>{},onCancel:a=()=>{},onDayNight:o=()=>{},onChop:s=null,onRailBuild:c=()=>{}}={}){let l=document.createElement(`aside`);l.className=`settlement-hud`,l.setAttribute(`aria-label`,`Settlement controls`),l.style.setProperty(`--settlement-owner`,t),l.innerHTML=`
    <div class="settlement-inventory" role="group" aria-label="Resources">
      <div class="settlement-resource settlement-wood" data-hud="wood-stock" aria-label="No logs. Ten logs builds a house."><strong data-hud="logs">0</strong><span class="settlement-resource-caption">${D_.log}<span>Logs</span></span></div>
      <div class="settlement-resource settlement-gold" data-hud="gold-stock" aria-label="No gold"><strong data-hud="gold">0</strong><span class="settlement-resource-caption">${D_.coin}<span>Gold</span></span></div>
    </div>
    <div class="settlement-development" data-hud="development" role="group" aria-label="Settlement development">
      <span class="settlement-level" aria-hidden="true">
        <svg class="settlement-level-paint" viewBox="0 0 64 64"><path d="m32 8 17 7 7 17-7 17-17 7-17-7-7-17 7-17z"/><path d="m32 8 17 7 7 17-7 17-17 7 11-24z"/></svg>
        <svg class="settlement-progress" viewBox="0 0 64 64"><circle class="settlement-progress-track" cx="32" cy="32" r="29"/><circle class="settlement-progress-arc" data-hud="progress" cx="32" cy="32" r="29" pathLength="1"/></svg>
        <strong data-hud="level">0</strong>
      </span>
      <span class="settlement-growth"><span class="settlement-label" data-hud="city-label">Outpost</span><strong data-hud="city-progress">1 / 3</strong><span class="settlement-growth-caption" data-hud="growth-caption">toward city</span></span>
    </div>
    <div class="settlement-day-control"><span class="settlement-phase-label"><span data-hud="phase-symbol" data-kind="sun">${D_.sun}</span><span class="settlement-label" data-hud="day-phase">Daytime</span></span>${O_(`day-night`,`N`,`Night`,`aria-keyshortcuts="N" aria-label="Skip to night and collect daily income"`)}</div>
    <div class="settlement-income" data-hud="income" role="status" aria-live="polite" aria-atomic="true" hidden>
      <span class="settlement-income-rule" aria-hidden="true"></span>
      <span class="settlement-income-copy"><span class="settlement-income-amount"><strong data-hud="income-amount">+0</strong><span class="settlement-income-currency">${D_.coin}<span>Gold</span></span></span><span class="settlement-income-label" data-hud="income-label">Day's earnings</span></span>
      <span class="settlement-income-rule" aria-hidden="true"></span>
    </div>
    <div class="settlement-dock">
      <div class="settlement-build-actions" data-hud="build-actions" role="group" aria-label="House placement" hidden>
        <span class="settlement-placement-note" data-hud="placement">10 logs · joins city</span>
        <span class="settlement-validity" data-hud="validity"></span>
        <div class="settlement-placement-keys">${O_(`build`,`Enter`,`Place`,`aria-keyshortcuts="Enter"`)}${O_(`cancel`,`Esc`,`Cancel`,`aria-keyshortcuts="Escape"`)}</div>
      </div>
      <div class="settlement-rail-actions" data-hud="rail-actions" role="group" aria-label="Railway placement" hidden>
        <span class="settlement-placement-note" data-hud="rail-cost">5 gold · Railway</span>
        <span class="settlement-rail-selection" data-hud="rail-selection">Choose one of your cities</span>
        <span class="settlement-rail-status" data-hud="rail-status">Cities need at least 3 homes</span>
        <div class="settlement-placement-keys">${O_(`rail-build`,`Enter`,`Build line`,`aria-keyshortcuts="Enter" hidden`)}${O_(`rail-cancel`,`Esc`,`Cancel`,`aria-keyshortcuts="Escape"`)}</div>
      </div>
      <div class="settlement-actions" role="group" aria-label="Tools and camera">
        ${O_(`axe`,`E`,`Chop`,`class="settlement-tool" aria-pressed="true" aria-keyshortcuts="E" aria-label="Select axe. E or click to chop a nearby tree."`)}
        ${O_(`house`,`B`,`Build`,`class="settlement-tool" aria-pressed="false" aria-keyshortcuts="B" aria-label="Place a house. Costs ten logs."`)}
        ${O_(`rail`,`T`,`Railway`,`class="settlement-tool" aria-pressed="false" aria-keyshortcuts="T" aria-label="Plan a railway. Costs five gold. Start from one of your cities." hidden`)}
        ${O_(`view`,`V`,`Overview`,`aria-keyshortcuts="V" aria-label="Switch to overview"`)}
      </div>
      <div class="settlement-movement" data-hud="movement" aria-label="Movement controls"><span><kbd>WASD</kbd>Move</span><span><kbd>Shift</kbd>Run</span><span><kbd>Space</kbd>Jump</span></div>
    </div>
    <div class="settlement-sr-only" data-hud="announcements" role="status" aria-live="polite" aria-atomic="true"></div>`,e.append(l);let u=Object.fromEntries([...l.querySelectorAll(`[data-hud]`)].map(e=>[e.dataset.hud,e])),d=Object.fromEntries([...l.querySelectorAll(`[data-action]`)].map(e=>[e.dataset.action,e])),f=d.view.querySelector(`span`),p=d[`day-night`].querySelector(`span`),m={},h=``,g=``,_=null,v=null,y=!1,b={axe:()=>{n(`axe`),s?.()},house:()=>n(`house`),rail:()=>n(`rail`),view:r,build:i,cancel:a,"rail-build":c,"rail-cancel":a,"day-night":o};function x(e){let t=e.target.closest(`button[data-action]`);t&&!t.disabled&&b[t.dataset.action]?.(),e.stopPropagation()}let S=e=>e.stopPropagation();l.addEventListener(`click`,x);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])l.addEventListener(e,S);function C(e={}){if(y)return;m={...m,...e};let{logs:t=0,gold:n=0,houses:r=1,connectedHouses:i=r,cityHouses:a=i,tool:o=`axe`,walking:s=!0,ready:c=!0,canBuild:_=!1,connected:v=!0,reason:b=``,targetTree:x=!1,message:S=``,visible:C=!0,dayPhase:w=`day`,nightAmount:T,railway:E=null}=m,D=b_(t),O=b_(n),k=w_(a),A=w===`night`,j=T_(E,{gold:O,ready:c}),M=o===`rail`&&!s,N=Number.isFinite(T)?T>=.45:A,P=JSON.stringify([D,O,r,k.houses,o,s,c,!!_,!!v,b,!!x,S,C,A,N,j]);if(P===g)return;g=P;let F=o===`house`;l.hidden=!C,Object.assign(l.dataset,{tool:o,ready:String(!!c),valid:String(!!_),affordable:String(D>=10),target:String(!!x&&s&&o===`axe`),phase:A?`night`:`day`,theme:N?`night`:`day`}),y_(u.logs,C_(D)),y_(u.gold,C_(O)),u[`wood-stock`].title=`${x_.format(D)} logs`,u[`gold-stock`].title=`${x_.format(O)} gold`,u[`wood-stock`].setAttribute(`aria-label`,`${D} logs. Ten logs builds one house.`),u[`gold-stock`].setAttribute(`aria-label`,`${O} gold. Your city homes earn one gold each at sunset.`),y_(u.level,String(k.level)),y_(u[`city-label`],k.level?`City level`:`Outpost`),y_(u[`city-progress`],k.complete?`Max`:`${k.houses} / ${k.next}`),y_(u[`growth-caption`],k.complete?`fully grown`:k.level?`next level`:`toward city`),u.progress.setAttribute(`stroke-dasharray`,`${k.progress} 1`),u.development.dataset.complete=String(k.complete);let I=k.complete?`City level 5. ${k.houses} homes. Maximum level.`:`${k.level?`City level ${k.level}`:`Outpost`}. ${k.houses} of ${k.next} homes toward ${k.level?`the next level`:`forming a city`}.`;u.development.setAttribute(`aria-label`,I),y_(u[`day-phase`],A?`Nighttime`:`Daytime`),y_(p,A?`Day`:`Night`);let L=A?`moon`:`sun`;u[`phase-symbol`].dataset.kind!==L&&(u[`phase-symbol`].innerHTML=D_[L],u[`phase-symbol`].dataset.kind=L),d[`day-night`].setAttribute(`aria-label`,A?`Skip to day`:`Skip to night and collect daily income`),u[`build-actions`].hidden=!F,y_(u.placement,v?`10 logs · joins city`:`10 logs · new home`),u.placement.setAttribute(`aria-label`,v?`Spend ten logs. Joins a city with a path.`:`Spend ten logs. Paths form at three nearby homes.`);let R=b||(D<10?`${10-D} more logs needed`:`Choose clear, level ground`);y_(u.validity,c?_?`Ready to place`:D<10?`${10-D} more logs needed`:R.replace(/[.!]$/,``):`Preparing clearing`),u.validity.dataset.valid=String(!!_),u[`rail-actions`].hidden=!M,u[`rail-actions`].dataset.stage=j.stage,y_(u[`rail-cost`],`${x_.format(j.cost)} gold · Railway`),y_(u[`rail-selection`],j.selection),y_(u[`rail-status`],j.status),u[`rail-status`].dataset.kind=j.statusKind,d[`rail-build`].hidden=!j.showConfirm,d[`rail-build`].disabled=!M||!j.canBuild,d[`rail-build`].setAttribute(`aria-label`,j.canBuild?`Build railway. Spend ${j.cost} gold. ${j.selection}.`:`Cannot build railway. ${j.status}.`),d.rail.hidden=s,d.axe.hidden=!s,d.rail.setAttribute(`aria-label`,`Plan a railway. Costs ${j.cost} gold. ${j.hasCity?`Select one of your cities, then a destination.`:`Grow to 3 homes first.`}`),d.axe.setAttribute(`aria-pressed`,String(o===`axe`)),d.house.setAttribute(`aria-pressed`,String(F)),d.rail.setAttribute(`aria-pressed`,String(M)),d.house.setAttribute(`aria-label`,`Place a house. Costs ten logs. ${D>=10?`Enough logs gathered.`:`${10-D} more logs needed.`}`);for(let e of[`axe`,`house`,`rail`,`view`,`cancel`,`rail-cancel`,`day-night`])d[e].disabled=!c;d.axe.disabled=!c||!s,d.build.disabled=!c||!_,d.build.setAttribute(`aria-label`,_?`Build house. Spend ten logs. ${v?`Joins a city.`:`Paths form at three nearby homes.`}`:`Cannot build here. ${R}`),y_(f,s?`Overview`:`Walk`),d.view.setAttribute(`aria-label`,s?`Switch to overview`:`Return to your traveller`),u.movement.hidden=!s;let z=M?`Railway selected. ${j.cost} gold. ${j.selection}. ${j.status}. ${j.showConfirm?`Enter confirms the purchase. `:``}Escape cancels.`:F?`House placement selected. Aim at clear ground. Enter places; Escape cancels.`:s?`Axe selected. E or click chops a nearby tree.`:`B builds a house. T plans a railway.`,B=[c?`${D} logs. ${O} gold.`:`Preparing your clearing.`,I,z,s?``:`Overview.`,S].filter(Boolean).join(` `);B!==h&&(y_(u.announcements,B),h=B)}function w({amount:t,days:n=1}={}){let r=b_(t);if(y||!r)return!1;clearTimeout(_),v?.cancel(),y_(u[`income-amount`],`+${x_.format(r)}`),y_(u[`income-label`],n>1?`${b_(n)} days' earnings`:`Day's earnings`),u.income.hidden=!1,Object.assign(u.income.dataset,{amount:String(r),days:String(Math.max(1,b_(n)))});let i=e.ownerDocument?.defaultView?.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;return v=u.income.animate?.(i?[{opacity:0,offset:0},{opacity:1,offset:.08},{opacity:1,offset:.84},{opacity:0,offset:1}]:[{opacity:0,transform:`translateY(12px)`,offset:0},{opacity:1,transform:`translateY(0)`,offset:.09},{opacity:1,transform:`translateY(0)`,offset:.8},{opacity:0,transform:`translateY(-8px)`,offset:1}],{duration:4200,easing:`ease-out`,fill:`both`}),_=setTimeout(()=>{u.income.hidden=!0,v?.cancel(),v=null,_=null},4200),!0}return C(),{root:l,update:C,showIncome:w,dispose(){y=!0,clearTimeout(_),v?.cancel(),l.removeEventListener(`click`,x);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])l.removeEventListener(e,S);l.remove()}}}var A_=2.8;function j_(){let e=[],t=[],n=(n,r,i)=>{e.push(n,r,0),t.push(i.r,i.g,i.b)},r=new v(`#b17b26`),i=new v(`#f5c756`),a=new v(`#ffe6a0`);for(let e=0;e<12;e++){let t=e/12*Math.PI*2,o=(e+1)/12*Math.PI*2;n(0,0,i),n(Math.cos(t)*.76,Math.sin(t)*.76,i),n(Math.cos(o)*.76,Math.sin(o)*.76,i);let s=e<6?a:r;for(let[e,r]of[[.76,t],[1,t],[1,o],[.76,t],[1,o],[.76,o]])n(Math.cos(r)*e,Math.sin(r)*e,s)}for(let[e,t]of[[-.09,-.43],[.09,-.43],[.09,.43],[-.09,-.43],[.09,.43],[-.09,.43]])n(e,t,r);let o=new Qe;return o.setAttribute(`position`,new Le(e,3)),o.setAttribute(`color`,new Le(t,3)),o.computeBoundingSphere(),o}function M_(e,t,n){let r=j_(),i=new Ze({vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=[],o=A_,s=0,c,l,u=new Y,d=new Y,f=new Y,p=new Y,h=new Y,g=new Y,_=new Y,v=new et;function y(n){if(!(n<=s)){for(let e of[c,l])e?.removeFromParent(),e?.dispose();s=Math.max(16,2**Math.ceil(Math.log2(n))),c=new Pe(r,i,s),l=new Pe(r,i,s),c.name=`house-income`,l.name=`house-income-map`;for(let e of[c,l])e.count=0,e.visible=!1,e.frustumCulled=!1,e.renderOrder=24,e.instanceMatrix.setUsage(be);e.add(c),t.add(l)}}return y(1),{emit(e){a=e.map(({x:e,y:t=0,z:n})=>({x:e,y:t,z:n})),o=0,y(a.length)},update(e,{camera:t,mapBlend:r=0,walkingWeight:s=0,viewportHeight:y=800,reducedMotion:b=!1}={}){if(o+=Math.max(0,e),c.visible=l.visible=!1,c.count=l.count=0,o>=A_){a=[];return}if(!t||s>.8)return;t.updateMatrixWorld(!0),g.set(0,1,0).applyQuaternion(t.quaternion);let x=o/A_,S=b?0:34*(1-(1-x)**2);i.opacity=Math.min(1,o/.12,(A_-o)/.55)*(1-m.smoothstep(s,.1,.8));let C=0;for(let e of a){if(Be(n,e.x,e.y+m.lerp(2.1,.8,r),e.z,u),rt(n,e.x,e.z,d),Tt(n)&&d.dot(f.copy(t.position).sub(u))<=0||(p.copy(u).project(t),p.z<-1||p.z>1||Math.abs(p.x)>1.08||Math.abs(p.y)>1.08))continue;h.copy(u).applyMatrix4(t.matrixWorldInverse);let i=t.projectionMatrix.elements,a=i[3]*h.x+i[7]*h.y+i[11]*h.z+i[15],o=2*Math.abs(a)/(Math.max(1,y)*Math.abs(i[5]));u.addScaledVector(g,o*(12+S)),_.setScalar(o*10),v.compose(u,t.quaternion,_),c.setMatrixAt(C,v),l.setMatrixAt(C++,v)}c.count=l.count=C,c.visible=r<.999&&C>0,l.visible=r>.001&&C>0,c.instanceMatrix.needsUpdate=l.instanceMatrix.needsUpdate=!0},get active(){return o<A_&&a.length>0},get visibleCount(){return Math.max(c.count,l.count)},dispose(){for(let e of[c,l])e.removeFromParent(),e.dispose();r.dispose(),i.dispose(),a=[]}}}var N_=Object.freeze({cost:5,minRadius:8,halfWidth:1.12,railY:.42,spineLength:14,stationOffset:3,stationWidth:6.4,stationDepth:2.4,sampleSpacing:.4,maxNodes:4200,latticeStep:3.141592653589793,stationOptions:7}),P_=Math.PI*2,F_=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),I_=e=>structuredClone(e),L_=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z),R_=(e,t)=>[e,t].sort().join(`|`),z_=new Set([`rock`,`cactus`,`landmark`,`apartment`,`tower`]),B_=new Set([`house`,`farm`,`station`,`civic`]),V_=(e,t)=>Math.atan2(Math.sin(e-t),Math.cos(e-t));function H_(e,t){let n=t.x-e.x,r=t.z-e.z;if(B_.has(e.kind)){let t=Math.cos(e.rotation??0),i=Math.sin(e.rotation??0),a=e.scale??1,o=n*t-r*i,s=n*i+r*t,c=(e.width??2.2)*a/2,l=(e.depth??2.2)*a/2;return Math.hypot(Math.max(0,Math.abs(o)-c),Math.max(0,Math.abs(s)-l))}return Math.hypot(n,r)-(e.radius??(e.kind===`tree`?.85:.7)*(e.scale??1))}function U_(e){let t=new Map;for(let n of e){let e=n.radius??Math.hypot(n.width??2.2,n.depth??2.2)/2;for(let r=Math.floor((n.x-e)/8);r<=Math.floor((n.x+e)/8);r++)for(let i=Math.floor((n.z-e)/8);i<=Math.floor((n.z+e)/8);i++){let e=`${r}:${i}`;t.has(e)||t.set(e,[]),t.get(e).push(n)}}return(e,n)=>{let r=new Set;for(let i=Math.floor((e.x-n)/8);i<=Math.floor((e.x+n)/8);i++)for(let a=Math.floor((e.z-n)/8);a<=Math.floor((e.z+n)/8);a++)for(let o of t.get(`${i}:${a}`)??[])if(!r.has(o)&&(r.add(o),H_(o,e)<n))return!0;return!1}}function W_(e,t){let n=Math.cos(e.rotation),r=Math.sin(e.rotation),i=Math.ceil(e.width/.7),a=Math.ceil(e.depth/.7);for(let o=0;o<=i;o++)for(let s=0;s<=a;s++){let c=e.width*(o/i-.5),l=e.depth*(s/a-.5);if(!t({x:e.x+c*n+l*r,z:e.z-c*r+l*n}))return!1}return!0}var G_=class{items=[];push(e){let t=this.items.length;for(this.items.push(e);t;){let n=t-1>>1;if(this.items[n].f<=e.f)break;this.items[t]=this.items[n],t=n}this.items[t]=e}pop(){let e=this.items[0],t=this.items.pop();if(this.items.length){let e=0;for(;e*2+1<this.items.length;){let n=e*2+1;if(n+1<this.items.length&&this.items[n+1].f<this.items[n].f&&n++,this.items[n].f>=t.f)break;this.items[e]=this.items[n],e=n}this.items[e]=t}return e}};function K_(e,t){let n=N_.latticeStep,r=N_.minRadius;if(!t)return ss(e,{x:e.x+Math.cos(e.heading)*n,z:e.z+Math.sin(e.heading)*n},N_.railY);let i={x:e.x-Math.sin(e.heading)*t*r,z:e.z+Math.cos(e.heading)*t*r},a=e.heading-t*Math.PI/2,o=t*n/r;return{type:`arc`,center:i,radius:r,startAngle:a,sweep:o,length:n,curvature:t/r,start:{x:e.x,y:N_.railY,z:e.z},end:{x:i.x+Math.cos(a+o)*r,y:N_.railY,z:i.z+Math.sin(a+o)*r}}}function q_(e,t){if(e.segments.some(e=>e.type===`arc`&&Math.abs(e.sweep)>Math.PI+1e-6))return!1;let n=Math.ceil(e.length/N_.sampleSpacing);for(let r=0;r<=n;r++)if(!t(ps(e,e.length*r/n)))return!1;return!0}function J_(e,t,n){return ds(e,t,{radius:N_.minRadius,y:N_.railY}).find(r=>r.length<F_(e,t)*1.65+18&&q_(r,n))??null}function Y_(e,t,n,{maxNodes:r=N_.maxNodes}={}){let i=J_(e,t,n);if(i)return i;let a=new G_,o=new Map,s=0,c=e=>`${Math.round(e.x/1.5)}:${Math.round(e.z/1.5)}:${Math.round((e.heading%P_+P_)%P_/P_*16)%16}`,l={...e,g:0,f:F_(e,t),parent:null,part:null};for(a.push(l),o.set(c(l),0);a.items.length&&s++<r;){let r=a.pop();if(!(r.g>o.get(c(r))+.001)){if(F_(r,t)<30&&s%3==0){let e=J_(r,t,n);if(e){let t=[e];for(let e=r;e?.part;e=e.parent)t.unshift(e.part);return hs(t,N_.minRadius)}}for(let i of[0,-1,1]){let s=hs([K_(r,i)],N_.minRadius),l=ps(s,s.length);if(!q_(s,n))continue;let u=r.g+s.length*(i?1.045:1),d=c(l);u>Math.max(95,F_(e,t)*2.6)||u>=(o.get(d)??1/0)-.001||(o.set(d,u),a.push({...l,g:u,f:u+F_(l,t)*1.035,parent:r,part:s}))}}}return null}function X_(e,{session:t,getPlacements:n=()=>[],surfaceAt:r=(t,n)=>lc(e,t,n),onBuild:i,initialState:a,sceneryCatalog:o}={}){if(!t?.player)throw TypeError(`Railways require a settlement session`);let s=[],c=[],l=[],u=[],d=[],f=0,p=o??null,m=null;if(a){for(let[e,t]of[[s,`stations`],[c,`lines`],[l,`connections`],[u,`paths`],[d,`reservations`]])e.push(...I_(a[t]??[]));f=a.revision??0}let h=-1,g=()=>!1;function _(){return h!==f&&(g=U_(c.flatMap(e=>e.points.map(e=>({...e,radius:N_.halfWidth*1.65})))),h=f),g}function v(){if(!p){let t=new Map;if(e.bounds&&e.biomes&&e.lines&&e.cities){let n={minX:Math.min(...e.outline.map(e=>e[0])),maxX:Math.max(...e.outline.map(e=>e[0])),minZ:Math.min(...e.outline.map(e=>e[1])),maxZ:Math.max(...e.outline.map(e=>e[1]))};for(let r=Math.floor(n.minX/192);r<=Math.floor((n.maxX-.001)/192);r++)for(let i=Math.floor(n.minZ/192);i<=Math.floor((n.maxZ-.001)/192);i++)for(let n of Mc(e,{x:r*192,z:i*192,size:192}).placements){let e=n.kind===`tree`&&!n.id?{...n,id:`tree:${n.x}:${n.y??0}:${n.z}`}:n;t.set(e.id??`${e.kind}:${e.x}:${e.z}`,e)}}for(let n of[...e.placements??[],...e.gameplay?.guaranteedTrees??[],...e.gameplay?.botScenery??[]])t.set(n.id??`${n.kind}:${n.x}:${n.z}`,n);p=[...t.values()]}let t=new Map(p.map(e=>[e.id??`${e.kind}:${e.x}:${e.z}`,e]));for(let e of n())t.set(e.id??`${e.kind}:${e.x}:${e.z}`,e);return[...t.values()]}function y(){let n=[...t.player.cities,...t.bots.flatMap(e=>e.game.cities),...e.gameplay?.farmVillages?.cities??[]].filter(e=>e.level>=1&&e.houseCount>=3),r=new Map;for(let e of s){if(n.some(t=>t.id===e.cityId))continue;let t=n.find(t=>t.ownerId===e.ownerId&&t.houseIds?.some(t=>e.cityHouseIds?.includes(t)));t&&r.set(e.cityId,t.id)}if(r.size){for(let e of s)e.cityId=r.get(e.cityId)??e.cityId;for(let e of c)e.from=r.get(e.from)??e.from,e.to=r.get(e.to)??e.to;for(let e of u)e.cityId=r.get(e.cityId)??e.cityId;for(let e of d)e.cityId&&=r.get(e.cityId)??e.cityId;for(let e of l)e.from=r.get(e.from)??e.from,e.to=r.get(e.to)??e.to,e.key=R_(e.from,e.to);f++,m=null}return n.map(e=>({...e,playerOwned:e.ownerId===t.player.ownerId,stationId:s.find(t=>t.cityId===e.id)?.id??null}))}function b(n){return[...t.buildings,...e.gameplay?.farmVillages?.houses??[],...e.gameplay?.farmVillages?.buildings??[],...e.gameplay?.farmVillages?.farms??[],...s,...n.filter(e=>B_.has(e.kind)||z_.has(e.kind)||e.kind===`nature`&&e.style===`outcrop`)]}let x=e=>{let t=r(e.x,e.z);return t&&[`ground`,`mountain`].includes(t.type)&&Math.abs(t.height)<.14};function S(e,t=[],n=[]){let i=U_([...e,...t]),a=_();return e=>{let t=r(e.x,e.z);if(!t||!(t.type===`water`||[`ground`,`mountain`].includes(t.type)&&Math.abs(t.height)<.14)||i(e,N_.halfWidth+.2))return!1;for(let t of[-1,1]){let n={x:e.x+(e.tangent?.z??0)*t*N_.halfWidth,z:e.z-(e.tangent?.x??1)*t*N_.halfWidth},i=r(n.x,n.z);if(!i||!(i.type===`water`||[`ground`,`mountain`].includes(i.type)&&Math.abs(i.height)<.14))return!1}return!(!n.some(t=>F_(t,e)<12)&&a(e,.001))}}function C(n,r,i){let a=s.find(e=>e.cityId===n.id);if(a)return[a];let o=U_(i),c=[...t.buildings,...e.gameplay?.farmVillages?.houses??[]].filter(e=>e.cityId===n.id&&e.kind===`house`),l=Math.max(3,...c.map(e=>F_(e,n)+1.6)),u=Math.atan2(r.z-n.z,r.x-n.x),d=[];for(let e of[3.4,6.4,9.4,12.4,16.4,20.4])for(let t=0;t<24;t++){let a=t/24*P_,s={x:n.x+Math.cos(a)*(l+e),z:n.z+Math.sin(a)*(l+e)};for(let e of[u,a+Math.PI/2,0,Math.PI/2])for(let t of[-1,1]){let a={x:-Math.sin(e),z:Math.cos(e)},l={id:`rail-station:${n.id}`,kind:`station`,cityId:n.id,ownerId:n.ownerId,x:s.x+a.x*N_.stationOffset*t,y:0,z:s.z+a.z*N_.stationOffset*t,rotation:Math.atan2(-a.x*t,-a.z*t),width:6.4,depth:2.4,radius:Math.hypot(3.2,1.2),platform:{width:2.4,length:6.4},lineId:`rail-spine:${n.id}`,distance:7,center:s,heading:e,side:t,cityHouseIds:[...n.houseIds??c.map(e=>e.id)]};if(!W_({...l,width:7,depth:3},e=>x(e)&&!o(e,.22)))continue;let u=S(i,[l]);q_(hs([ss({x:s.x-Math.cos(e)*7,z:s.z-Math.sin(e)*7},{x:s.x+Math.cos(e)*7,z:s.z+Math.sin(e)*7},N_.railY)]),u)&&d.push({...l,score:F_(n,l)+F_(s,r)*.12})}}let f=[];for(let e of d.sort((e,t)=>e.score-t.score))if(!f.some(t=>F_(e,t)<2.5&&Math.abs(Math.sin(e.heading-t.heading))<.3)&&(f.push(e),f.length===N_.stationOptions))break;return f}function w(e,t,n=!0){return{x:e.center.x+Math.cos(e.heading)*7*t,z:e.center.z+Math.sin(e.heading)*7*t,heading:e.heading+(t<0?Math.PI:0)+(n?0:Math.PI)}}function T(e,t,n){let r=[w(e,-1,n),w(e,1,n)];if(s.some(t=>t.id===e.id)){for(let t of c)if(t.id!==e.lineId&&t.stationIds.includes(e.id))for(let e=10;e<t.length-8;e+=12){let n=ps(t.alignment,e);for(let i of[0,Math.PI])r.push({...n,heading:n.heading+i,junction:{lineId:t.id,distance:e,x:n.x,z:n.z,heading:n.heading}})}}return r.sort((e,r)=>F_(e,t)+Math.abs(V_(e.heading+(n?0:Math.PI),Math.atan2(t.z-e.z,t.x-e.x)))*8-F_(r,t)-Math.abs(V_(r.heading+(n?0:Math.PI),Math.atan2(t.z-r.z,t.x-r.x)))*8).slice(0,10)}function E(n,i,a,o,s=[]){let c=ms(i,.35),l=[],u=null;for(let t=0;t<c.points.length;t++){let n=c.points[t],a=r(n.x,n.z)?.type===`water`||zn(e,n.x,n.z)<2.2;if(a&&u===null&&(u=Math.max(0,c.distances[t]-.6)),u!==null&&(!a||t===c.points.length-1)){let e=Math.min(i.length,c.distances[t]+.6);l.push({start:u,end:e,entry:ps(i,u),exit:ps(i,e)}),u=null}}return{id:n,from:a,to:o,ownerId:t.player.ownerId,color:t.player.ownerId,closed:!1,alignment:i,...c,bridges:l,tunnels:[],cuts:[],stationIds:s,stops:[]}}function D(e){return E(e.lineId,hs([ss(w(e,-1),w(e,1),N_.railY)]),e.cityId,e.cityId,[e.id])}function O(n,i,a){let o=b(a),c=C(n,i,o),l=C(i,n,o);if(!c.length||!l.length)return{code:`station-blocked`,reason:`No clear station site near this city`,blockedCityId:c.length?i.id:n.id};let u=[];for(let e of c)for(let t of l)if(!(F_(e,t)<e.radius+t.radius+1)&&W_(e,e=>H_(t,e)>.3)&&W_(t,t=>H_(e,t)>.3))for(let n of T(e,t.center,!0))for(let r of T(t,e.center,!1)){let i=F_(n,r)+Math.abs(V_(n.heading,Math.atan2(r.z-n.z,r.x-n.x)))*7+(e.score??0)+(t.score??0);u.push({sa:e,sb:t,start:n,end:r,score:i})}u.sort((e,t)=>e.score-t.score);let d=null;for(let e of u.slice(0,160)){e.allowed=S(o,[e.sa,e.sb],[e.start,e.end]);let t=J_(e.start,e.end,e.allowed);t&&(!d||t.length<d.route.length)&&(d={...e,route:t})}if(!d)for(let e of u.slice(0,5)){e.allowed??=S(o,[e.sa,e.sb],[e.start,e.end]);let t=Y_(e.start,e.end,e.allowed);if(t){d={...e,route:t};break}}if(!d)return{code:`route-blocked`,reason:`No clear railway route between these cities`};let f=[d.sa,d.sb].filter(e=>!s.some(t=>t.id===e.id)),p=E(`rail-link:${R_(n.id,i.id)}`,d.route,n.id,i.id,[d.sa.id,d.sb.id]),m=[...f.map(D),p],h=[];for(let e of a)e.kind!==`tree`||t.shared.removedTreeIds.has(Tg(e))||(m.some(t=>t.points.some(t=>F_(t,e)<N_.halfWidth+(e.radius??.85*(e.scale??1))+.25))||f.some(t=>H_(t,e)<(e.radius??.85*(e.scale??1))+.2))&&h.push(Tg(e));let g=new Set([...t.shared.removedTreeIds,...h]),_=[];for(let n of f){let i=[...t.buildings,...e.gameplay?.farmVillages?.houses??[]].filter(e=>e.kind===`house`&&e.cityId===n.cityId).sort((e,t)=>F_(e,n)-F_(t,n));for(let t of i.slice(0,3)){let i=wn(e,{...n,kind:`civic`,doorOffset:1.25},t,{placements:[...o,...a],removedTreeIds:g,surfaceAt:r,maxNodes:900});if(i){_.push({...i,id:`rail-access:${n.cityId}`,cityId:n.cityId,ownerId:n.ownerId});break}}}return{code:`ready`,reason:`Connect these cities`,lines:m,stations:f,paths:_,fromStationId:d.sa.id,toStationId:d.sb.id,fromJunction:d.start.junction??null,toJunction:d.end.junction??null,clearedTreeIds:h}}function k(e,n){let r=y(),i=r.find(t=>t.id===e),a=r.find(e=>e.id===n),o={fromCityId:e,toCityId:n,cost:N_.cost,affordable:t.player.gold>=N_.cost,lines:[],stations:[],paths:[],clearedTreeIds:[]},s=(e,t)=>({...o,valid:!1,siteValid:!1,code:e,reason:t});if(!i||!a||i===a)return s(`invalid-city`,`Choose two different cities`);if(!i.playerOwned&&!a.playerOwned)return s(`not-your-city`,`One end must be your city`);if(l.some(e=>e.key===R_(i.id,a.id)))return s(`already-connected`,`These cities already have a railway`);let c=A(i.id,a.id);m?.key!==c&&(m={key:c,plan:O(i,a,v())});let u=m.plan;return u.code===`ready`?{...o,...I_(u),siteValid:!0,valid:o.affordable,code:o.affordable?`ready`:`not-enough-gold`,reason:o.affordable?u.reason:`A railway costs 5 gold`}:{...o,...u,valid:!1,siteValid:!1}}function A(e,n){return y(),`${e}>${n}:${f}:${t.buildings.map(e=>e.id).join(`|`)}`}function j(e,t,n,r){if(r!==A(e,t)||n?.fromCityId!==e||n?.toCityId!==t)return!1;let i={code:n.siteValid?`ready`:n.code,reason:n.siteValid?`Connect these cities`:n.reason};for(let e of[`lines`,`stations`,`paths`,`fromStationId`,`toStationId`,`fromJunction`,`toJunction`,`clearedTreeIds`,`blockedCityId`])e in n&&(i[e]=I_(n[e]));return m={key:r,plan:i},!0}function M(e,n,{requireCached:r=!1}={}){if(r&&m?.key!==A(e,n))return{ok:!1,code:`world-changed`,reason:`The city changed; preparing a fresh route`};let a=k(e,n);if(!a.valid)return{ok:!1,...a};for(let e of t.shared.getActors?.()??[])if(L_(e)&&a.stations.some(t=>H_(t,e)<.25))return{ok:!1,...a,valid:!1,code:`player-blocked`,reason:`Move away from the new platform`};let o=t.player.spendGold(N_.cost);if(!o.ok)return{ok:!1,...a,...o};let p={id:`connection:${R_(e,n)}`,key:R_(e,n),from:e,to:n,fromStationId:a.fromStationId,toStationId:a.toStationId,fromJunction:a.fromJunction,toJunction:a.toJunction,ownerId:t.player.ownerId,cost:N_.cost};s.push(...a.stations),c.push(...a.lines),u.push(...a.paths),l.push(p);for(let e of a.clearedTreeIds)t.shared.removedTreeIds.add(e);for(let e of a.stations)d.push({...e});for(let e of a.lines)d.push({id:e.id,kind:`rail-corridor`,width:N_.halfWidth*2+.3,points:e.points});f++,m=null;let h={ok:!0,...a,connection:I_(p),totalGold:o.totalGold,revision:f};return i?.(h),h}return{evaluate:k,build:M,geometryKey:A,adoptPreview:j,get sceneryCatalog(){return p},get revision(){return f},get cities(){return y()},get stations(){return I_(s)},get lines(){return I_(c)},get paths(){return I_(u)},get reservations(){return I_(d)},snapshot(){return{revision:f,cities:y(),stations:I_(s),lines:I_(c),paths:I_(u),connections:I_(l),reservations:I_(d)}}}}var Z_=new v(`#66d9bc`),Q_=new v(`#f06b66`),$_=e=>[...new Map((e??[]).map(e=>[e.id,e])).values()],ev=e=>{let t=Math.max(2,Math.ceil(e.length/.5)+1);return Array.from({length:t},(n,r)=>fc(e,e.length*r/(t-1)))};function tv(e,n,r){if(Tt(n)||!r.length)return null;let i=[],a;for(let e of r)for(let t of e.renderRanges??[{start:0,end:e.length}]){let n=Math.max(2,Math.ceil((t.end-t.start)/.3)+1),r=Array.from({length:n},(r,i)=>fc(e,t.start+(t.end-t.start)*i/(n-1)));if(a??=r[0].y,r.some(e=>Math.abs(e.y-a)>1e-5))return null;i.push({points:r,width:1.88})}if(!i.length)return null;let s=(r,i,a,s,c)=>{let l=Rm(n,r,{x:0,z:0}).map(({outer:e,holes:t})=>{let n=new k(e.map(([e,t])=>new it(e,-t)));return n.holes=t.map(e=>new w(e.map(([e,t])=>new it(e,-t)))),n}),u=new t(l,{depth:a-i,bevelEnabled:!1,steps:1});u.rotateX(-Math.PI/2),u.translate(0,i,0),u.computeBoundingSphere();let d=new o(u,s);return d.name=c,d.castShadow=d.receiveShadow=!0,e.add(d),d};return{ballast:s(i,a-.42,a-.19,Yt.gravel,`joined-railway-ballast`),rails:s(i.flatMap(({points:e})=>[-1,1].map(t=>({width:.095,points:e.map(e=>({x:e.x+e.tangent.z*t*.46,z:e.z-e.tangent.x*t*.46}))}))),a-.09,a,Yt.rail,`joined-railway-rails`)}}function nv(e,t,n){let r=new dt,i=new dt;r.name=`settlement-railways`,i.name=`settlement-map-railways`,e.add(r),t.add(i);let a=new dt,s=new dt,c=new dt,l=new dt;a.name=`built-railway-network`,s.name=`built-map-railway-network`,c.name=`railway-preview`,l.name=`map-railway-preview`,r.add(a,c),i.add(s,l),c.visible=l.visible=!1;let u=new Map((n.players??[]).map(e=>[e.id,e]));u.set(Ln.id,Ln);let d={value:1},p={value:1},h=(e,t)=>{let n=qt(new Ze({name:e,color:t,depthWrite:!1,side:2,toneMapped:!1}),{kind:`map-symbol`}),r=n.onBeforeCompile,i=n.customProgramCacheKey();return n.onBeforeCompile=(e,t)=>{r.call(n,e,t),e.uniforms.railwayWidthScale=d,e.vertexShader=`attribute vec3 railwayOffset; uniform float railwayWidthScale;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position) + railwayOffset * (railwayWidthScale - 1.0);`)},n.customProgramCacheKey=()=>`${i}|built-railway-map-width-v1`,zo(n,p),n},g=h(`railway-map-paper`,X.trim),_=h(`railway-map-ink`,X.window),v=new Ze({color:X.sand,depthWrite:!1,side:2}),y=new Ze({color:Z_,transparent:!0,opacity:.45,depthWrite:!1,side:2,toneMapped:!1}),b=new Te({color:Z_,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!1}),x=new At({color:Q_,dashSize:.65,gapSize:.5,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!1}),S=new Bt(.9,1,48);S.rotateX(-Math.PI/2);let C=new Ze({color:16777215,transparent:!0,opacity:.85,depthWrite:!1,side:2,toneMapped:!1}),w={lines:0,stations:0,detailBatches:0,mapBatches:0,rebuilds:0},T=null,E=null,D=0,O=!1,k=null,A=null,j=``,M=!1,N=new et,P=new Y,F=new Y,I=new Y,L=new Y;function R(e,{materials:t=!1}={}){let n=new Set;e.traverse(e=>{(e.isMesh||e.isLine)&&n.add(e.geometry)});for(let e of n)e.dispose();if(e.clear(),t){for(let t of e.userData.ownedMaterials??[])t.dispose();e.userData.ownedMaterials=[]}}function z(e,t,r,i,a=s){if(e.length<2)return;let c=[],l=[];for(let i=1;i<e.length;i++){let a=[e[i-1],e[i]],o=[];for(let e of a){let i=a[1].x-a[0].x,s=a[1].z-a[0].z,c=Math.hypot(i,s)||1,l=e.tangent?.z??s/c,u=e.tangent?-e.tangent.x:-i/c;Be(n,e.x,r,e.z,F);for(let i of[-1,1])Be(n,e.x+l*i*t/2,r,e.z+u*i*t/2,I),o.push({point:I.clone(),offset:I.clone().sub(F)})}for(let e of[0,2,1,1,2,3])o[e].point.toArray(c,c.length),o[e].offset.toArray(l,l.length)}let u=new Qe;u.setAttribute(`position`,new Le(c,3)),u.setAttribute(`railwayOffset`,new Le(l,3)),u.computeBoundingSphere();let d=new o(u,i);return d.name=`railway-map-stroke`,d.renderOrder=10,a.add(d),d}function B(e){if(!e?.length)return;let t=new dt;a.add(t);for(let r of zm(t,{...n,cityStreets:e})){let e=r.geometry;r.geometry=Xc(e,.6),e.dispose();let t=r.geometry.attributes.position;for(let e=0;e<t.count;e++){let r=t.getX(e),i=t.getZ(e);Be(n,r,lc(n,r,i).height+Lm,i,F),t.setXYZ(e,F.x,F.y,F.z)}t.needsUpdate=!0,r.geometry.computeVertexNormals(),r.geometry.computeBoundingSphere(),r.castShadow=!1}for(let t of e)z(t.points,t.width??.7,.64,v)}function V(e={}){if(O||e.revision!==void 0&&e.revision===k)return!1;R(a,{materials:!0}),R(s),B(e.paths);let t=$_(e.lines).filter(e=>e.length>0),r={...n,lines:t};if(t.length){let e=tv(a,n,t);Nm(a,r,{...Tt(n)?{surfaceRoot:a}:{},skipTrackBed:!!e,skipRails:!!e})}let i=new Map,o=$_(e.stations);for(let e of o){i.has(e.ownerId)||i.set(e.ownerId,Fc(u.get(e.ownerId)));let t=i.get(e.ownerId),r=up(a,{palette:t});_p(r,{x:.65,y:.21,z:.83,color:t.body,rotation:Math.PI}),_p(r,{x:2.22,y:.21,z:.83,color:t.accent,variant:1}),Ge(n,e.x,e.y??0,e.z,e.rotation??0,N),r.applyMatrix4(N);let o=[{x:e.x-Math.cos(e.rotation??0)*2.8,z:e.z+Math.sin(e.rotation??0)*2.8},{x:e.x+Math.cos(e.rotation??0)*2.8,z:e.z-Math.sin(e.rotation??0)*2.8}];z(o,1.1,.77,g),z(o,.45,.78,_)}a.children.length&&yp(qf(a));for(let e of i.values())for(let t of Object.values(e))t.dispose();for(let e of t){let t=ev(e);z(t,.84,.73,g),z(t,.42,.74,_)}s.children.length&&qf(s);for(let e of s.children)e.name=`railway-map-stroke`,e.renderOrder=10,e.castShadow=e.receiveShadow=!1;return w.lines=t.length,w.stations=o.length,w.detailBatches=a.children.length,w.mapBatches=s.children.length,w.rebuilds++,k=e.revision??(k??0)+1,a.updateMatrixWorld(!0),!0}function H(e,t,a,o){if(e.length>D){for(let e of[T,E])e?.removeFromParent(),e?.dispose();D=2**Math.ceil(Math.log2(Math.max(8,e.length))),T=new Pe(S,C,D),E=new Pe(S,C,D),T.name=E.name=`railway-city-targets`,T.renderOrder=E.renderOrder=13,r.add(T),i.add(E)}if(T){T.count=E.count=e.length,e.forEach((e,r)=>{let i=e.id===t||e.id===a,s=e.id===a&&o&&!o.valid?Q_:i?Z_:Pc(u.get(e.ownerId)).body,c=Math.max(3.4,Math.min(6.2,e.radius??3.4))*(i?1.1:1);Ge(n,e.x,(e.y??0)+.13,e.z,0,N),N.scale(P.set(c,1,c)),T.setMatrixAt(r,N),T.setColorAt(r,s),Ge(n,e.x,.82,e.z,0,N),N.scale(P.set(c,1,c)),E.setMatrixAt(r,N),E.setColorAt(r,s)});for(let e of[T,E])e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0),e.computeBoundingSphere()}}function U(e,{cities:t=[],sourceCityId:r=null,targetCityId:i=null,visible:a=!1}={}){if(O)return;M=a,c.visible=l.visible=a&&!!e;let s=`${r}:${i}:${e?.valid}:${t.map(e=>`${e.id},${e.x},${e.z},${e.radius}`).join(`;`)}`;if(s!==j&&(H(t,r,i,e),j=s),T&&(T.visible=E.visible=a),e===A||(A=e,R(c),R(l),y.color.copy(e?.valid?Z_:Q_),b.color.copy(y.color),!e))return;let u=$_(e.lines).filter(e=>e.length>0);if(!u.length&&!e.valid){let a=t.find(t=>t.id===(r??e.fromCityId)),o=t.find(t=>t.id===(i??e.toCityId));if(a&&o){let e=Math.max(2,Math.ceil(Math.hypot(o.x-a.x,o.z-a.z)/2)+1);for(let[t,r]of[[c,!1],[l,!0]]){let i=Array.from({length:e},(t,i)=>{let s=i/(e-1),c=m.lerp(a.x,o.x,s),l=m.lerp(a.z,o.z,s);return Be(n,c,r?.84:lc(n,c,l).height+.15,l,new Y)}),s=new We(new Qe().setFromPoints(i),x);s.name=`blocked-railway-guide`,s.renderOrder=12,s.computeLineDistances(),t.add(s)}}}for(let e of u){let t=ev(e),r=t.map(e=>({...e,y:(e.y??0)+.06})),i=Kf(c,r,1.78,y);if(i.name=`railway-route-preview`,i.castShadow=i.receiveShadow=!1,i.renderOrder=11,Tt(n)){let e=i.geometry.attributes.position;for(let t=0;t<e.count;t++)Be(n,e.getX(t),e.getY(t),e.getZ(t),F),e.setXYZ(t,F.x,F.y,F.z);e.needsUpdate=!0,i.geometry.computeBoundingSphere()}z(t,1.15,.81,y,l)}for(let t of $_(e.stations))for(let[e,r]of[[c,t.y??0],[l,.81]]){let i=new f(6.4,.21,2.4);i.translate(0,.105,0);let a=new o(i,y);a.name=`railway-station-preview`,a.renderOrder=12;let s=new Oe(new ye(i),b);a.add(s),Ge(n,t.x,r,t.z,t.rotation??0,N),a.applyMatrix4(N),e.add(a)}}return{root:r,mapRoot:i,sync:V,preview:U,stats:w,get revision(){return k},get meshes(){return a.children.filter(e=>e.isMesh&&e.material.userData.sceneStyle!==`window`)},update({mapBlend:e=0,camera:t,viewportHeight:n=800,zoom:a=1}={}){if(!O){if(r.visible=e<.999,i.visible=e>.001,p.value=Ro(a),t){t.updateMatrixWorld(!0),L.set(0,0,0).applyMatrix4(t.matrixWorldInverse);let e=t.projectionMatrix.elements,r=e[3]*L.x+e[7]*L.y+e[11]*L.z+e[15];d.value=Math.max(1,2*Math.abs(r)/(Math.max(1,n)*Math.abs(e[5]))*3/.42)}c.visible=l.visible=M&&!!A,T&&(T.visible=E.visible=M)}},dispose(){if(!O){O=!0,R(a,{materials:!0}),R(s),R(c),R(l);for(let e of[T,E])e?.dispose();S.dispose();for(let e of[g,_,v,y,b,x,C])e.dispose();r.removeFromParent(),i.removeFromParent(),r.clear(),i.clear()}}}}function rv(e,t,n,{getPlacements:r=()=>[],createWorker:i=()=>new Worker(new URL(new URL(`settlement-railway-worker-DGKyWPpX.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}={}){let a=null,o=null,s=null,c=0,l=!1;function u(e){let n=o;if(o=null,!n)return;let r=n.key===t.geometryKey(n.from,n.to),i=!e.error&&r&&t.adoptPreview(n.from,n.to,e.result,n.key);if(n.resolve(i?{result:t.evaluate(n.from,n.to)}:e.error?{error:e.error}:{stale:!0}),s){let e=s;s=null,d(e)}}function d(s){if(l)s.resolve({stale:!0});else try{if(!a){let t=i();a=t,t.onmessage=({data:e})=>{a===t&&o?.id===e.id&&u(e)},t.onerror=()=>{a===t&&(t.terminate(),a=null,u({error:`Route planning could not finish. Choose the cities again.`}))};let{mapTerrain:n,...r}=e;a.postMessage({type:`initialize`,world:r})}o=s,a.postMessage({type:`plan`,id:s.id,from:s.from,to:s.to,network:t.snapshot(),placements:r(),state:{player:n.player.snapshot(),bots:n.bots.map(e=>e.game.snapshot()),buildings:n.buildings,actors:n.shared.getActors?.()??[]}})}catch{a?.terminate(),a=null,o=s,u({error:`Route planning is unavailable. Try selecting the cities again.`})}}return{request(e,n){return l?Promise.resolve({stale:!0}):new Promise(r=>{let i={id:++c,from:e,to:n,key:t.geometryKey(e,n),resolve:r};o?(s?.resolve({stale:!0}),s=i):d(i)})},dispose(){l=!0,a?.terminate(),a=null,o?.resolve({stale:!0}),s?.resolve({stale:!0}),o=s=null}}}function iv(e,t,n,r,{width:i,height:a}={}){if(!n||!r||!i||!a)return null;n.updateMatrixWorld(!0);let o=new Y,s=null,c=1/0;for(let l of t){if(!(l.level>=1)||(Be(e,l.x,l.y??.7,l.z,o).project(n),o.z<-1||o.z>1))continue;let t=(o.x-r.x)*i/2,u=(r.y-o.y)*a/2,d=Math.min(Math.hypot(t,u-24),Math.hypot(t,u));d<=32&&d<c&&(c=d,s=l)}return s}function av(e,t){return e?e.name?`${e.name} · ${e.level}`:`${e.ownerId===t?`Your`:[`neutral`,`village-gray`].includes(e.ownerId)?`Village`:`${String(e.ownerId??``).replace(/^./,e=>e.toUpperCase())}`} city · ${e.level}`:``}function ov({canvas:e,world:t,parent:n,mapParent:r,markerParent:i=n,markerMapParent:a=r,detail:o,getPlayer:s,onView:c,onDayNight:l=()=>{},reducedMotion:u}){let d=null,f={revision:0,buildings:[],paths:[],corridors:[]},p=jg(t,{getInfrastructure:()=>f,getActors:()=>{let e=s();return[...e?.initialized?[e.position]:[],...d?.positions??[]]}}),m=p.player,h=Xg(n,r,t),g=h_(n,t),_=__(i,a,t),v=M_(i,a,t),y=t.gameplay.farmVillages,b=[...y?.houses??[],...y?.buildings??[]],x=y?.paths??[],S=null,C=null,w=null;if(y?.cities?.length){let e={ownerId:y.ownerId};S=Xg(n,r,t,e),S.root.name=`farm-villages`,S.mapRoot.name=`farm-villages-map`,S.sync(y.houses,x,y.buildings),C=h_(n,t,e),C.root.name=`farm-village-residents`,C.sync(y),w=__(i,a,t,e),w.sync(y.cities)}d=v_({world:t,session:p,parent:n,mapParent:r,markerParent:i,markerMapParent:a,detail:o,reducedMotion:u});let T=X_(t,{session:p,getPlacements:()=>o.placements}),E=rv(t,T,p,{getPlacements:()=>o.placements}),D=nv(n,r,t),O=m.snapshot(),k=`axe`,A=null,j=null,M=null,N=null,P=null,F=null,I=null,L=``,R=null,z=!1,B=-1,V=T.snapshot(),H=!1,U=0,W=-1,ee=!0,ne=!1,re=!1,ie=null,G=!1,ae=!1,oe=null,se=``,ce=0,le=-1,ue=-1,de=-1,fe=-1,pe=null,me=[],he=[],ge=[],_e=[],ye=[],be=``,K=!1,xe=new te,Se=new it,Ce=new ve(new Y(0,1,0),0),q=new Y,we=[],Te=new Y,Ee=()=>e.focus({preventScroll:!0});function J(e){(e!==`rail`||!ee&&!ne)&&(k=e,A=null,G=!1,ae=!1,be=``,se=``,P=F=I=R=null,L=``,z=!1,j=null,Ee(),U++,H=!1)}let De=k_({parent:e.parentElement,playerColor:`#257d70`,onTool:J,onView:()=>{J(`axe`),c()},onDayNight:()=>{l(),Ee()},onChop:()=>{J(`axe`),ae=!0},onBuild:()=>{G=!0,Ee()},onRailBuild:()=>{z=!H&&!!I?.valid,Ee()},onCancel:()=>J(`axe`)});function Oe(e,t,n,r){e.addEventListener(t,n,r),we.push(()=>e.removeEventListener(t,n,r))}Oe(e,`pointermove`,t=>{if(j?.id===t.pointerId&&Math.hypot(t.clientX-j.x,t.clientY-j.y)>=5&&(j.moved=!0),![`house`,`rail`].includes(k)||t.buttons)return;let n=e.getBoundingClientRect();A={x:(t.clientX-n.left)/n.width*2-1,y:1-(t.clientY-n.top)/n.height*2}}),Oe(e,`pointerleave`,e=>{e.relatedTarget?.closest?.(`.settlement-hud`)||(A=null)}),Oe(e,`pointerdown`,t=>{ee||ne||![`house`,`rail`].includes(k)||t.button!==0||(j?j=null:(k===`house`&&(t.preventDefault(),t.stopImmediatePropagation()),Ee(),j={id:t.pointerId,x:t.clientX,y:t.clientY,tool:k},k===`house`&&e.setPointerCapture?.(t.pointerId)))},!0),Oe(e.ownerDocument.defaultView,`pointerup`,t=>{if(j?.id===t.pointerId){if(!j.moved&&Math.hypot(t.clientX-j.x,t.clientY-j.y)<5&&j.tool===k&&(k===`house`&&(G=!0),k===`rail`)){let n=e.getBoundingClientRect();R={x:(t.clientX-n.left)/n.width*2-1,y:1-(t.clientY-n.top)/n.height*2}}j=null,e.hasPointerCapture?.(t.pointerId)&&e.releasePointerCapture(t.pointerId)}}),Oe(e,`pointercancel`,()=>{j=null}),Oe(e.ownerDocument.defaultView,`blur`,()=>{j=null,G=!1,ae=!1,oe=null,z=!1,R=null}),Oe(e,`dblclick`,e=>{k===`rail`&&(e.preventDefault(),e.stopImmediatePropagation())},!0);function ke(){B!==T.revision&&(V=T.snapshot(),B=T.revision,D.sync(V),f={revision:B,buildings:V.stations,paths:V.paths??[],corridors:V.reservations.filter(e=>e.kind===`rail-corridor`)});let e=m.revision!==le;if(e){let e=O.houses.length,t=O.buildings?.length??0;O=m.snapshot(),(le<0||O.houses.length!==e||(O.buildings?.length??0)!==t)&&(h.sync(O.houses,O.paths??[],O.buildings??[],{animate:le>=0,reducedMotion:u?.matches}),_e=h.meshes,g.sync(O),_.sync(O.cities??[])),le=m.revision}(e||p.revision!==ue||o.placementRevision!==de)&&(ue=p.revision,de=o.placementRevision,me=[...o.placements,...p.buildings,...b],he=[...o.getCollisionPlacements(),...p.buildings,...b],ge=[...o.getTerrainMeshes(),..._e,...S?.meshes??[],...d.meshes,...D.meshes],ye=[...o.cityStreets,...p.paths,...x,...f.corridors])}function Ae(e){let t=null,n=1/0,r=Math.sin(e.heading),i=Math.cos(e.heading);for(let a of me){if(a.kind!==`tree`||m.isTreeRemoved(a))continue;let o=a.x-e.position.x,s=a.z-e.position.z,c=Math.hypot(o,s);if(c>bg.chopReach||c<1e-6)continue;let l=(o*r+s*i)/c;if(l<.3)continue;let u=c-l*.5;u<n&&(n=u,t=a)}return t}function je(e){let n;return A&&ie&&(Se.set(A.x,A.y),xe.setFromCamera(Se,ie),xe.ray.intersectPlane(Ce,q)&&xe.ray.direction.y<-.01&&(n={x:q.x,z:q.z})),n||=Ue(t,e.position.x,e.position.z,Math.sin(e.heading)*3.8,Math.cos(e.heading)*3.8),n}let Me=e=>o.hasCoverageAt(e,1);function Ne(e,t){let n=ee||!ie?e.heading:Math.atan2(ie.getWorldDirection(Te).x,Te.z);return{player:e.position,heading:n,enforceReach:ee,placements:me,ready:o.hasCoverageAt(t,2),isReadyAt:Me}}function Pe(e){se=e,ce=3.2}function Fe(){if(k!==`rail`||ee||ne)return R=null,z=!1,D.preview(null,{visible:!1}),null;let n=T.cities,r=n.some(e=>e.ownerId===m.ownerId);if(R){let r=e.getBoundingClientRect(),i=iv(t,n,ie,R,r);R=null,i&&(P?i.id===P?(P=F=null,I=null,L=``):(F=i.id,L=``,se=``):i.ownerId===m.ownerId?(P=i.id,se=``):Pe(`Start at one of your cities`))}if(P&&!n.some(e=>e.id===P)&&(P=F=null,I=null,L=``),F&&!n.some(e=>e.id===F)&&(F=null,I=null,L=``),P&&F){let e=T.geometryKey(P,F);if(e!==L){I=null,L=e,H=!0;let t=++U;E.request(P,F).then(e=>{K||t!==U||(H=!1,e.stale?L=``:(I=e.result??{valid:!1,code:`planning-failed`,reason:e.error,lines:[],stations:[]},W=m.gold))})}else I&&W!==m.gold&&(W=m.gold,I.siteValid&&(I={...I,affordable:m.gold>=5,valid:m.gold>=5,code:m.gold>=5?`ready`:`not-enough-gold`,reason:m.gold>=5?`Connect these cities`:`A railway costs 5 gold`}))}else I=null,H&&=(U++,!1);if(z&&P&&F&&!H&&I?.valid){let e=T.build(P,F,{requireCached:!0});if(e.ok){for(let t of e.clearedTreeIds??[])o.removeTree(t);ke(),Pe(`Railway built · −5 gold`),P=F=I=null,L=``}else I=e,e.code===`world-changed`&&(L=``),Pe(e.reason??`This route cannot be built`)}return z=!1,D.preview(I,{cities:n,sourceCityId:P,targetCityId:F,visible:!0}),{stage:H?`planning`:I?`preview`:P?`destination`:`source`,hasCity:r,cost:5,canBuild:!!I?.valid,reason:I?.reason??se,sourceLabel:av(n.find(e=>e.id===P),m.ownerId),targetLabel:av(n.find(e=>e.id===F),m.ownerId)}}function Ie(e){O.pendingMilestones?.length&&(pe={x:e.position.x,z:e.position.z},m.develop({player:e.position,placements:me,ready:re,isReadyAt:Me}),ke())}return ke(),{game:m,art:h,hud:De,residents:g,villageArt:S,villageResidents:C,bots:d,session:p,railways:T,railwayArt:D,get building(){return k===`house`||k===`rail`},get placements(){return ke(),me},get placementRevision(){return ke(),`${de}:${ue}`},get cityStreets(){return ke(),ye},getCollisionPlacements(){return ke(),he},getTerrainMeshes(){return ke(),ge},keyDown(e){let t=e.key.toLowerCase();return t===`t`?(e.repeat||ee||ne||J(k===`rail`?`axe`:`rail`),!0):k===`rail`&&[`escape`,`enter`,`e`].includes(t)?(e.repeat||(t===`enter`?z=!H&&!!I?.valid:J(`axe`)),!0):t===`b`?(e.repeat||J(k===`house`?`axe`:`house`),!0):k===`house`&&[`escape`,`enter`,`e`].includes(t)?(e.repeat||(t===`escape`||t===`e`?J(`axe`):G=!0),!0):t===`r`},prepareInput(e){return ae&&=(e.swing=!0,!1),k===`house`&&e.swing&&(G=!0,e.swing=!1),e},onSwing(){let e=s();ke();let t=Ae(e);oe=t?{tree:t,time:.22}:null,t||Pe(`Step closer and face a tree`)},cancelBuild(){J(`axe`)},update(n,{walking:r,transitioning:i,camera:a,mapBlend:c=0,walkingWeight:l=Number(r),focus:f,viewportHeight:p=800,zoom:b=1,dayState:x,night:T=0,uiDt:E=n}={}){if(K)return;ee=r,ne=i,ie=a;let j=s();ee&&k===`rail`&&J(`axe`),d.simulate(n,{completedDays:x?.completedDays??0});let L=m.settleIncome(x?.completedDays??0);L?.amount>0&&(l>.5?De.showIncome(L):v.emit(L.houses),e.dataset.lastIncome=String(L.amount)),o.updateTrees(u?.matches?1:n),ke(),re=!!j?.initialized&&o.hasCoverageAt(j.position,2);let R=re&&O.pendingMilestones?.length&&(!pe||tt(t,pe,j.position)>1);if(re&&(fe!==de||m.developmentSearching||R)&&(fe=de,Ie(j)),ce>0&&(ce-=n,ce<=0&&(se=``)),oe&&(oe.time-=n,oe.time<=0)){let e=oe.tree;if(oe=null,ee&&tt(t,e,j.position)<=bg.chopReach&&!m.isTreeRemoved(e)){let t=m.chop(e,{player:j.position});t.ok&&(o.fellTree(t.treeId,{direction:{x:e.x-j.position.x,z:e.z-j.position.z}}),Pe(`+${t.logs} logs`),ke(),Ie(j))}}if(N=re&&ee&&!ne&&k===`axe`?Ae(j):null,re&&k===`house`&&!ne){let e=je(j),n=Ne(j,e),r=d.positions.filter(n=>tt(t,n,e)<4).map(e=>`${e.x.toFixed(2)},${e.z.toFixed(2)}`).join(`;`),i=`${e.x}:${e.z}:${j.position.x}:${j.position.z}:${n.heading}:${ee}:${n.ready}:${ue}:${de}:${r}`;if(i!==be&&(M=m.evaluateBuild(e,n),be=i),G){let t=m.build(e,Ne(j,e));t.ok?(Pe(t.connected?`House built · city expanded`:t.cityHouseCount>1?`House built · settlement expanded`:`House built · new outpost`),ke(),k=`axe`,A=null):(se=``,ce=0)}}else M=null,be=``;G=!1;let z=Fe();D.update({mapBlend:c,camera:ie,viewportHeight:p,walkingWeight:l,zoom:b}),h.preview(M,{visible:k===`house`&&re&&!ne,targetTree:N}),h.update({mapBlend:c,dt:E,reducedMotion:u?.matches,night:T});let B=O.houses.filter(e=>e.connected).length,U=M?.house??j?.position??{x:0,z:0},W=null,te=1/0;for(let e of O.clusters??O.cities??[]){let n=tt(t,e,U);n<te&&(te=n,W=e)}M?.connectionHouseId?W=(O.clusters??[]).find(e=>e.houseIds.includes(M.connectionHouseId))??W:M&&!M.connectionHouseId&&(W=null);let ae=(O.buildings??[]).filter(e=>e.cityId===W?.id),le=(O.pendingDevelopments??[]).filter(e=>e.cityId===W?.id).map(e=>e.type);g.update(n,{focus:f??j.position,mapBlend:c,walkingWeight:l,visible:re,reducedMotion:u?.matches,night:T,dayPhase:x?.phase,unavailableHomes:h.construction.activeIds}),S?.update({mapBlend:c}),C?.update(n,{focus:f??j.position,mapBlend:c,walkingWeight:l,visible:re,reducedMotion:u?.matches,night:T,dayPhase:x?.phase}),w?.update({camera:ie,mapBlend:c,walkingWeight:l,viewportHeight:p}),d.update(n,{camera:ie,mapBlend:c,walkingWeight:l,focus:f??j?.position,viewportHeight:p,night:T,dayPhase:x?.phase,uiDt:E}),_.update({camera:ie,mapBlend:c,walkingWeight:l,viewportHeight:p}),v.update(E,{camera:ie,mapBlend:c,walkingWeight:l,viewportHeight:p,reducedMotion:u?.matches}),De.update({logs:O.logs,gold:O.gold,nightAmount:T,dayPhase:x?.phase??`day`,houses:O.houses.length,connectedHouses:B,cityHouses:W?.houseCount??1,cityLevel:W?.level??0,buildings:ae,pendingMilestones:le,tool:k,walking:ee,ready:re,canBuild:!!M?.valid,connected:M?.connected??!0,reason:M?.reason??``,targetTree:!!N,message:se,railway:z??{hasCity:m.cities.length>0}}),Object.assign(e.dataset,{gameplay:`settlement`,logs:String(O.logs),gold:String(O.gold),incomeDay:String(O.lastIncomeDay),incomeCoins:String(v.visibleCount),houses:String(O.houses.length),connectedHouses:String(B),paths:String(O.paths?.length??0),choppedTrees:String(O.removedTreeIds.length),construction:String(h.construction.count),constructionDust:String(h.construction.dustCount),residentsIndoors:String(g.stats.indoors??0),buildMode:String(k===`house`),buildValid:String(!!M?.valid),buildReason:M?.code??``,cities:String(O.cities?.length??0),cityLevels:(O.cities??[]).map(e=>e.level).join(`,`),residents:String(g.stats?.residents??g.stats?.count??0),farmVillages:String(y?.cities?.length??0),villageResidents:String(C?.stats.residents??0),villageResidentsIndoors:String(C?.stats.indoors??0),playerBots:String(d.entries.length),botHouses:d.entries.map(e=>e.houseCount).join(`,`),railMode:String(k===`rail`),railConnections:String(V.connections.length),railStations:String(V.stations.length),railSource:P??``,railTarget:F??``,railPlanning:String(H),railValid:String(!!I?.valid),railReason:I?.code??``,botLevels:d.entries.map(e=>e.snapshot.cities[0]?.level??0).join(`,`),botStates:d.entries.map(e=>e.bot.state).join(`,`),civicBuildings:String(O.buildings?.length??0),buildingTypes:(O.buildings??[]).map(e=>e.buildingType).join(`,`),pendingMilestones:(O.pendingMilestones??[]).join(`,`),buildX:M?.house?.x?.toFixed(2)??``,buildZ:M?.house?.z?.toFixed(2)??``,buildRotation:M?.house?.rotation?.toFixed(4)??``,targetTree:N?.id??``})},dispose(){K=!0,E.dispose();for(let e of we)e();De.dispose(),h.dispose(),g.dispose(),_.dispose(),v.dispose(),S?.dispose(),C?.dispose(),w?.dispose(),d.dispose(),D.dispose()}}}var sv=document.querySelector(`#world`),cv=new j,lv=new j,uv=sv.getAttribute(`aria-label`);cv.background=lv.background=X.backdrop,cv.fog=new ct(X.backdrop,1e6,2e6);var dv=new no({canvas:sv,antialias:!0,powerPreference:`high-performance`});dv.setPixelRatio(Math.min(devicePixelRatio,1.6)),dv.shadowMap.enabled=!0,dv.shadowMap.type=1,dv.toneMapping=4,dv.toneMappingExposure=1.15,dv.outputColorSpace=_e,dv.info.autoReset=!1;var fv=new he(-60,60,45,-45,.1,500);fv.position.set(115,125,145),fv.lookAt(0,1,0);var pv=new je(Ut(.94,.035,221),Ut(.55,.025,169),2.15);cv.add(pv);var mv=new O(Ut(.98,.04,84),3.25);mv.position.set(-65,110,65),mv.castShadow=!0,mv.shadow.mapSize.set(2048,2048),Object.assign(mv.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260}),mv.shadow.normalBias=.025,mv.shadow.bias=-15e-5,mv.shadow.radius=3,cv.add(mv,mv.target);var hv=new O(Ut(.85,.035,218),.65);hv.position.set(40,30,-40),cv.add(hv,hv.target);var gv=new o(new S(2e3,2e3),new y({color:X.backdrop,roughness:1}));gv.rotation.x=-Math.PI/2,gv.position.y=-5.7,gv.receiveShadow=!0,cv.add(gv);var _v,vv,yv,bv=[],xv,Sv,Cv,wv,Tv,Ev,Dv,Ov,kv,Av,jv,Mv,Nv,Pv=!1,Fv=!1,Iv=!1,Lv;function Rv(){let e=Lv?.building?`build`:Fv?`hidden`:`overview`;sv.dataset.cursor!==e&&(sv.dataset.cursor=e)}var zv=0,Bv=0,Vv=0,Hv=!1,Uv=null,Wv=0,Gv=0,Kv=0,qv=matchMedia(`(prefers-reduced-motion: reduce)`),Jv=hg({reducedMotion:qv}),Yv=Zt({scene:cv,mapScene:lv,sky:pv,sun:mv,fill:hv,renderer:dv}),Xv=Gt(),Zv,Qv=()=>Zv===void 0?0:(performance.now()-Zv)/1e3,$v=()=>Xv.advance(Qv()),ey=xh(cv,lv),ty=lg(cv),ny=new Y,ry=qv.matches;qv.addEventListener(`change`,e=>{ry=e.matches});var iy=Qo(dv),ay=eh(dv),oy=Yo({canvas:sv,camera:fv,scene:cv,mapScene:lv,reducedMotion:qv,getTrains:()=>bv,getWorldRoot:()=>vv,getWorld:()=>_v,isDetailReady:()=>!!yv?.ready&&Hv,onPause:()=>{ry=!ry},onRegenerate:()=>{if(!_v)return;let e=String(Number.isFinite(Number(_v.seed))?Number(_v.seed)+1:Date.now());Ny({...Cv,seed:e}).catch(My);let t=new URL(location.href);t.searchParams.set(`seed`,e),history.replaceState(null,``,t)}}),{navigation:sy,controls:cy}=oy,ly=cg(sv,{isActive:()=>Fv||Jv.active,onToggle:()=>Fv?xy():by(),onExit:xy,canLook:()=>!Lv?.building,onKey:e=>e.key.toLowerCase()===`n`?(e.repeat||$v(),!0):Lv?.keyDown(e)??!1}),uy=new Y,dy=(e,t,n)=>{let r=m.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function fy(){return kv.cameraTarget.clone()}function py(){let e=Tt(_v);return e?{center:new Y(0,-e.radius,0),radius:e.radius}:void 0}function my(){return Jv.active?Jv.camera:Fv?kv.camera:fv}function hy(){if(Jv.active)return Jv.target.clone();if(Fv)return fy();let e=oy.renderTarget;return Be(_v,e.x,e.y,e.z,new Y)}function gy(){let e=my(),t=e.clone();return t.isOrthographicCamera=!!e.isOrthographicCamera,t.isPerspectiveCamera=!t.isOrthographicCamera,t}function _y(){if(_v.gameplay)return _v.gameplay.spawn.heading??0;let e=_v.cities[0],t=e&&Nv?ke(_v,e,Nv,{}):null;return t?Math.atan2(t.x,t.z):Math.atan2(cy.target.x-sy.position.x,cy.target.z-sy.position.z)}function vy(){if(!kv||kv.initialized||!Nv||!yv.hasCoverageAt(Nv,2))return;let e=vv.scale.y;vv.scale.set(1,1,1),vv.updateMatrixWorld(!0),kv.enter(Nv,_y())&&(Lv?(Fv=!0,oy.setInputEnabled(!1),Pv=!0,Rv()):kv.exit(),kv.root.visible=!0,Nv={...kv.position}),vv.scale.y=e,vv.updateMatrixWorld(!0)}function yy(){oy.setInputEnabled(!Fv),ly.sample(0),sv.dataset.view=Fv?`person`:oy.mode,sv.dataset.cameraTransition=`false`,sv.dataset.walkingWeight=Fv?`1.000`:`0.000`}function by(){if(!kv||Fv)return;let e=gy(),t=hy(),n=vv.scale.y;vv.scale.set(1,1,1),vv.updateMatrixWorld(!0),kv.enter(Nv,_y())?(Fv=!0,oy.setInputEnabled(!1),zv=Bv,Jv.begin({fromCamera:e,toCamera:kv.camera,fromTarget:t,toTarget:fy(),toWalking:!0,sphere:py()}),Pv=!0,Jv.active||yy(),sv.dataset.view=`person`,Rv(),Zy()):(vv.scale.y=n,vv.updateMatrixWorld(!0))}function xy(){if(!kv||!Fv)return;Lv?.cancelBuild();let e=gy(),t=hy(),n=kv.heading,r=kv.exit();kv.root.visible=!0,ly.clear(),Fv=!1,Rv(),oy.setInputEnabled(!1),oy.overlook(r,{heading:n,zoom:oy.zoomScale*1.35});let i=oy.renderTarget;Be(_v,i.x,i.y,i.z,uy),zv=Bv,Jv.begin({fromCamera:e,toCamera:fv,fromTarget:t,toTarget:uy,toWalking:!1,sphere:py()}),Jv.active||yy(),Zy()}var Sy=170,Cy=112,wy=0,Ty=new Y(115,125,145).normalize(),Ey=new Y,Dy=new et,Oy=new Y;function ky(){Sv&&=(Sv.dispose(),null)}function Ay(){if(oy.reset(),_v.surface?.complete){let e=_v.surface.radius,t=Ee(_v,_v.camera?.longitude??10,_v.camera?.latitude??25);gv.visible=!1,Sy=Cy=e*2.2,oy.setScale(Cy/230),cy.target.set(t.x,1.3,t.z);let n=new Y().setFromSphericalCoords(1,Math.PI/4,0);sy.position.copy(cy.target).addScaledVector(n,e*3),sy.zoom=1,sy.far=e*8,cy.update(),Py(),oy.setHome();return}let e=_v.outline.map(e=>e[0]),t=_v.outline.map(e=>e[1]),r=Math.max(...e)-Math.min(...e),i=Math.max(...t)-Math.min(...t),a=Math.hypot(r,i),o=Math.max(0,..._v.mountains.map(e=>e.height));gv.visible=!Tt(_v);let s=_v.camera?.startInDetail===!0;oy.setScale(s?1:Math.max(1,a/410)),cy.target.set((Math.max(...e)+Math.min(...e))/2,1.3,(Math.max(...t)+Math.min(...t))/2);let c=_v.camera?.northUp?new Y(0,125,180).normalize():Ty;sy.position.copy(cy.target).addScaledVector(c,a*1.5+o),sy.zoom=1,sy.far=Math.max(500,a*5+o*3),cy.update(),gv.position.x=cy.target.x,gv.position.z=cy.target.z,gv.scale.setScalar(Math.max(1,a/500));let l=sy.quaternion.clone().invert(),u=_v.outline.flatMap(([e,t])=>[new Y(e,-3.4,t),new Y(e,4,t)]);_v.mountains.forEach(e=>u.push(new Y(e.x,e.height,e.z)));let d=0,f=0;if(u.forEach(e=>{e.sub(cy.target).applyQuaternion(l),d=Math.max(d,Math.abs(e.x)),f=Math.max(f,Math.abs(e.y))}),oy.zoomScale>1){let e=sy.clone(),t=new Y().subVectors(sy.position,cy.target),r=new n().setFromVector3(t);r.phi=1e-5,e.position.copy(cy.target).add(t.setFromSpherical(r)),e.lookAt(cy.target);let i=e.quaternion.clone().invert();for(let[e,t]of _v.outline){let n=new Y(e,0,t).sub(cy.target).applyQuaternion(i);d=Math.max(d,Math.abs(n.x)),f=Math.max(f,Math.abs(n.y))}}Sy=d*2+Math.max(10,d*.2),Cy=f*2+Math.max(10,f*.2),oy.setScale(s?1:Math.max(oy.zoomScale,Cy/230)),Py(),oy.setHome()}function jy(e=oy.renderTarget,t=0){Ey.copy(Yv.direction).multiplyScalar(130);let n=Math.max((fv.right-fv.left)/fv.zoom,(fv.top-fv.bottom)/fv.zoom),r=Math.min(480,Math.max(45,n*.72)),i=m.lerp(r,18,t),a=i*2/2048,o=Math.round(e.x/a)*a,s=Math.round(e.z/a)*a;Tt(_v)?(Be(_v,o,0,s,mv.target.position),Me(_v,o,s,Dy),pv.position.set(0,1,0).applyMatrix4(Dy),Oy.copy(Ey).applyMatrix4(Dy),mv.position.copy(mv.target.position).addScaledVector(Oy,Math.max(1,i/95)),hv.position.set(40,30,-40).applyMatrix4(Dy).add(mv.target.position),hv.target.position.copy(mv.target.position)):(pv.position.set(0,1,0),mv.target.position.set(o,0,s),mv.position.copy(mv.target.position).addScaledVector(Ey,Math.max(1,i/95)),hv.position.set(40,30,-40),hv.target.position.set(0,0,0));let c=mv.shadow.camera;Math.abs(c.right-i)>.1&&(Object.assign(c,{left:-i,right:i,top:i,bottom:-i,far:Math.max(260,i*4)}),c.updateProjectionMatrix())}function My(e){e.name!==`AbortError`&&(sv.dataset.error=e.message,console.error(e))}async function Ny(e={}){let t=++Vv,n=structuredClone(e);Kv=performance.now(),sv.dataset.loading=`true`,delete sv.dataset.error,Ov?.dispose();let r=$m();Ov=r;let i,a,o,s,c,l;try{let e=await r.request(`generate`,n);if(t!==Vv)throw new DOMException(`World replaced`,`AbortError`);let u=e.world;return l=new dt,i=Nl(new dt,u),c=Um(l,i.root.getObjectByName(`map-static`),u),s=bh(u),s&&(l.add(s.detail),i.root.add(s.map)),a=Pm(l,u),o=Bm(l,u,{maxPending:3,requestChunk:(e,t)=>r.request(`chunk`,e,t),uploadMesh:e=>ay.upload(e)}),Fv=!1,ly.clear(),oy.setInputEnabled(!0),Jv=hg({reducedMotion:qv}),zv=Bv=0,cv.fog.near=1e6,cv.fog.far=2e6,ty.root.visible=!1,Lv?.dispose(),Lv=null,Rv(),kv?.dispose(),Av?.dispose(),jv?.dispose(),Mv?.dispose(),ky(),Ev?.dispose(),Tv?.dispose(),yv?.dispose(),xv?.dispose(),vv?.removeFromParent(),wv?.dispose(),Dv?.dispose(),Dv=r,Ov=null,_v=u,vv=l,xv=a,bv=xv.trains,yv=o,wv=i,Tv=s,Ev=c,lv.add(wv.root),cv.add(l),Cv=n,wy=0,Hv=!1,Uv=null,Wv=e.milliseconds,Ay(),_v.gameplay&&(Lv=ov({canvas:sv,world:_v,parent:l,mapParent:wv.root,markerParent:cv,markerMapParent:lv,detail:yv,getPlayer:()=>kv,onView:()=>Fv?xy():by(),onDayNight:$v,reducedMotion:qv})),kv=Nh(l,_v,{getCollisionPlacements:()=>Lv?Lv.getCollisionPlacements():yv.getCollisionPlacements(),getTerrainMeshes:()=>Lv?Lv.getTerrainMeshes():yv.getTerrainMeshes(),isReadyAt:(e,t)=>yv.hasCoverageAt({x:e,z:t},1)}),kv.resize(innerWidth/innerHeight),Nv=kv.prepareSpawn(_v.gameplay?.spawn??_v.cities[0]??cy.target),Av=sg(l,_v),Iv=!1,jv=_g(cv,lv,_v),Mv=yg(l,_v),Nv&&Av.update(Nv,{visible:!1}),sv.dataset.cities=String(_v.cities.length),sv.dataset.trains=String(bv.length),sv.dataset.surface=Tt(_v)?`sphere`:`plane`,Lv?sv.setAttribute(`aria-label`,`Your island settlement. Move the cursor to look around. WASD moves, Shift runs, Space jumps. Face a nearby tree and press E or click to chop. Each tree gives 2 to 4 logs. Press B to preview a house costing 10 logs; move the pointer to aim, click or Enter to build, Escape to cancel. Red means blocked or unaffordable. House lots follow your facing direction, with doors more likely to face nearby homes. Three homes form a city and connect by paths. City levels 1 through 5 unlock at 3, 6, 9, 12 and 15 homes, marked by a well, market, water tower, fountain garden and town hall. Residents wander the paths and sleep indoors at night. Gray level-one farming villages have their own residents who visit nearby fields. Rival coral, gold and blue settlers chop real trees and build their own cities to level five, then stop. Their resources and income are separate from yours. V switches between your traveller and overview. In overview, T selects railway building: choose one of your cities, choose another city, then Enter builds the previewed route and stations for five gold. Escape cancels. Each player-owned city home earns one gold at sunset; gray village homes earn you no income. Day and night each last five minutes; N or the day/night button advances to the next phase for testing.`):sv.setAttribute(`aria-label`,uv),document.activeElement===document.body&&sv.focus({preventScroll:!0}),Zv===void 0&&(Zv=performance.now()),sv.dataset.loading=`false`,Gv=performance.now()-Kv,Zy(),_v}catch(e){throw t===Vv&&(sv.dataset.loading=`false`,Ov=null),c?.dispose(),s?.dispose(),o?.dispose(),a?.dispose(),i?.dispose(),l?.removeFromParent(),r.dispose(),e}}function Py(){let e=innerWidth,t=innerHeight,n=e/t,r=Math.max(Cy,Sy/n);sy.left=-r*n/2,sy.right=r*n/2,sy.top=r/2,sy.bottom=-r/2,sy.updateProjectionMatrix(),dv.setSize(e,t),kv?.resize(n),Jv.active&&(Jv.finish(),yy(),Fv||oy.updatePresentation(0)),iy.resize(Math.round(e*dv.getPixelRatio()),Math.round(t*dv.getPixelRatio()))}window.addEventListener(`resize`,Py),Py();var Fy=new Float32Array(180),Iy=new Float32Array(180),Ly=0,Ry=0,zy=0,By=0,Vy=performance.now(),Hy,Uy=0,Wy=0,Gy=0,Ky=``,qy=0,Jy=0,Yy=0,Xy=0;function Zy(){Ly=Ry=0,Uy=Wy=Gy=0,Ky=``,zy=performance.now()}function Qy(e,t,n){if(Fy[Ry]=t,Iy[Ry]=n,Ry=(Ry+1)%Fy.length,Ly=Math.min(Ly+1,Fy.length),(Jv.active||oy.blend>.001&&oy.blend<.999)&&(n>Uy&&(Ky=JSON.stringify({traffic:qy,detail:Jy,view:Yy,render:Xy,blend:oy.blend})),Gy++,Uy=Math.max(Uy,n),Wy=Math.max(Wy,t)),e-zy<1e3)return;zy=e;let r=e=>[...e.subarray(0,Ly)].sort((e,t)=>e-t)[Math.floor((Ly-1)*.95)]??0,i=bv.reduce((e,t)=>e+ +!!t.state.active,0);Object.assign(sv.dataset,{frameP95:r(Fy).toFixed(2),cpuP95:r(Iy).toFixed(2),drawCalls:String(dv.info.render.calls),triangles:String(dv.info.render.triangles),geometries:String(dv.info.memory.geometries),activeTrains:String(i),mapNetworkVisibility:wv.stats.networkVisibility.toFixed(3),visibleTrains:String(xv.stats?.visibleTrains??0),detailChunks:String(yv.stats?.chunks??yv.stats?.loadedChunks??0),detailReady:String(yv.ready),detailSettled:String(yv.settled),detailRevealing:String(yv.stats.revealingChunks),detailBase:String(Ev.root.visible),detailRequired:String(yv.stats.requiredChunks??0),detailPending:String(yv.stats.pendingChunks??0),detailWorkers:String(Dv.stats.workers),detailWorkerMs:String(Math.round(Dv.stats.lastChunkMs)),detailBytes:String(yv.stats.bytes??0),detailLimited:String(yv.stats.coverageLimited??!1),detailErrors:String(yv.stats.errors??0),transitionCpuMax:Uy.toFixed(2),transitionFrameMax:Wy.toFixed(2),transitionFrames:String(Gy),transitionPeak:Ky,trafficCpu:qy.toFixed(2),detailCpu:Jy.toFixed(2),viewCpu:Yy.toFixed(2),renderCpu:Xy.toFixed(2),simulationSeconds:wy.toFixed(1),simulationCpu:(xv.stats.simulationMs??0).toFixed(2),poseCpu:(xv.stats.poseMs??0).toFixed(2),generationMs:Wv.toFixed(0),loadMs:Gv.toFixed(0),night:Yv.night.toFixed(3),dayPhase:Yv.phase,dayElapsed:Xv.read().elapsedSeconds.toFixed(1),dayNumber:String(Xv.read().dayNumber),walking:String(Fv),playerX:kv?.position.x.toFixed(3),playerY:kv?.position.y.toFixed(3),playerZ:kv?.position.z.toFixed(3),playerGrounded:String(kv?.grounded),playerSwings:String(kv?.stats.swings??0),walkingInstances:String(Av?.stats.instances??0),lifeInstances:String(Sv?.stats?.instances??Sv?.stats?.active??0),lifeSheep:String(Sv?.stats?.sheep??0),lifeBirds:String(Sv?.stats?.birds??0)})}function $y(e){let t=performance.now(),n=e-Vy,r=m.clamp(n/1e3,0,.05);if(Vy=e,_v){ry||(wy+=r);let i=Xv.read((e-(Zv??e))/1e3);Yv.update(r,wy,i.elapsedSeconds),ey.update(),cv.fog.color.copy(cv.background);let a=performance.now();if(xv.update(ry?0:r),qy=performance.now()-a,a=performance.now(),Jv.active)ly.sample(0),Jv.update(r),Jv.active||yy();else if(Fv){let e=ly.sample(r),t=kv.stats.swings;kv.update(r,Lv?Lv.prepareInput(e):e),kv.stats.swings>t&&Lv?.onSwing()}else oy.updateNavigation(r);!Fv&&!Jv.active&&oy.updatePresentation(r);let o=Fv||Jv.active,s=Jv.active?Jv.walkingWeight:Number(Fv),c=my(),l=o?kv.position:cy.target,u=Jv.active?zv*(1-dy(0,.3,Jv.progress)):Fv?0:oy.blend;Bv=u,o&&vv.scale.set(1,1,1);let d=Math.max((fv.right-fv.left)/fv.zoom,(fv.top-fv.bottom)/fv.zoom),f=Jv.active&&!Fv?Math.min(140,Math.max(40,d*.55)):40,p=kv?.initialized?kv.position:Nv;if(yv.update(c,{mapBlend:o||oy.wantsDetail?0:1,target:l,budgetMs:2,groundFocus:p,groundRadius:f,groundOnly:o,coverageCameras:o?void 0:oy.coverageCameras,retainVisible:o||oy.blend<1}),vy(),p=kv?.initialized?kv.position:Nv,Lv?.update(ry&&!Fv?0:r,{walking:Fv,transitioning:Jv.active,camera:c,mapBlend:u,walkingWeight:s,focus:l,viewportHeight:innerHeight,zoom:sy.zoom,dayState:i,night:Yv.night,uiDt:r}),kv?.initialized&&(kv.root.visible=!0),p&&Av.update(p,{placements:Lv?.placements??yv.placements,revision:Lv?.placementRevision??yv.placementRevision,cityStreets:Lv?.cityStreets??yv.cityStreets,visible:s>.001,visibilityWeight:s,time:wy,night:Yv.night}),Av.stats.ready&&!Iv){for(let e of Av.root.children)ay.upload(e);Iv=!0}if(cv.fog.near=Math.exp(m.lerp(Math.log(1e6),Math.log(28),s)),cv.fog.far=Math.exp(m.lerp(Math.log(2e6),Math.log(85),s)),!Hv&&!Uv){let e=Vv;dv.shadowMap.enabled=!0,Sv||=_h(vv,_v),Uv=iy.prepare(cv,lv,fv).then(()=>{e===Vv&&(Hv=!0)}).catch(t=>{e===Vv&&(Uv=null,My(t))})}Jy=performance.now()-a,a=performance.now();let h=o?kv.renderPosition:oy.renderTarget;Mv.update(Yv.clockTime,{focus:h,placements:Lv?.placements??yv.placements,revision:Lv?.placementRevision??yv.placementRevision,visible:u<.999,reducedMotion:qv.matches}),yv.updateVisibility(c,{dt:r,reveal:Hv&&u<.999,reducedMotion:qv.matches||Pv}),Pv=!1,Ev.root.visible=o||!yv.settled,xv.updateView(c,{mapBlend:u,focus:h}),u<.999&&(jy(h,s),Sv||=_h(vv,_v),Sv.update(wy,{focus:h,placements:yv.lifePlacements,revision:yv.lifeRevision,detailBlend:1-u,reducedMotion:qv.matches,night:Wt.night.value})),Sv&&(Sv.root.visible=u<.999),ny.subVectors(mv.position,mv.target.position).normalize(),ty.update(c,{visible:s>.001,strength:s,night:Yv.night,sunDirection:ny,horizonColor:cv.background}),wv.update(bv,{visible:u>.001,camera:fv,viewportHeight:innerHeight,poseBuffer:xv.poseBuffer,dt:r,reducedMotion:qv.matches}),jv.update({position:kv.renderPosition,initialized:kv.initialized,camera:c,mapBlend:u,walking:Fv,walkingWeight:s,viewportHeight:innerHeight}),kv.root.visible=kv.initialized&&(o||u<.999&&jv.characterReadable),sv.dataset.view=Fv?`person`:oy.mode,Rv(),sv.dataset.cameraTransition=String(Jv.active),sv.dataset.walkingWeight=s.toFixed(3),sv.dataset.mapBlend=u.toFixed(3),sv.dataset.characterVisible=String(kv.initialized&&kv.root.visible),sv.dataset.characterMarker=String(jv.root.visible||jv.mapRoot.visible),Yy=performance.now()-a,a=performance.now(),dv.info.reset(),dv.shadowMap.enabled=u<.999,iy.render(cv,lv,c,u),Xy=performance.now()-a,Qy(e,n,performance.now()-t),By++,document.documentElement.dataset.ready=`true`}else dv.render(lv,fv);Hy=requestAnimationFrame($y)}document.addEventListener(`visibilitychange`,()=>{document.hidden?cancelAnimationFrame(Hy):(Vy=performance.now(),Zy(),Hy=requestAnimationFrame($y))}),Hy=requestAnimationFrame($y),window.__railway={get ready(){return By>0},get time(){return wy},get paused(){return ry},get trains(){return bv.map(e=>({id:e.state.id,ownerId:e.state.ownerId,homeCityId:e.state.homeCityId,x:e.parts[0].position.x,y:e.parts[0].position.y,z:e.parts[0].position.z,cars:e.parts.length}))},get render(){return{...dv.info.render,geometries:dv.info.memory.geometries,...xv?.stats,...yv?.stats}},get camera(){return{zoom:fv.zoom,width:innerWidth,height:innerHeight,mode:Fv?`person`:oy.mode,mapBlend:Bv,following:oy.selected,transitioning:Jv.active}}},window.railway=Object.freeze({loadWorld:e=>Ny(e).then(e=>structuredClone(e)),exportWorld:()=>structuredClone(Cv),inspectWorld:()=>structuredClone(_v),inspectSettlement:()=>Lv?{player:Lv.game.snapshot(),bots:Lv.bots.snapshot(),railway:Lv.railways.snapshot()}:null,generateWorld:jc,validateWorld:Nc,createStressWorld:Wm});var eb=new URLSearchParams(location.search);try{await Ny(await Qm(eb,location.href))}catch(e){My(e)}