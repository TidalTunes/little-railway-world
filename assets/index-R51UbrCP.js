const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./settlement-world-BqXnCKot.js","./island-world-CahC_WwK.js","./rolldown-runtime-WkwZ5CU-.js","./mountain-ranges-etBC5vVf.js","./farm-villages-DP3JT-sy.js","./world-surface-Bylg2z_8.js","./island-world-CBLcu6-d.js","./earth-world-xElanl2w.js","./europe-ranges-1QbrKqpQ.js","./globe-land-colors-iS-OXsJS.js","./europe-world-Nie4vWch.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-WkwZ5CU-.js";import{$ as t,$n as n,$t as r,An as i,Ar as a,At as o,B as s,Bt as c,C as l,Cr as u,Ct as d,D as f,Dr as p,Dt as m,E as h,Er as g,Et as _,F as v,Ft as y,G as b,Gn as x,Gt as S,H as C,Ht as w,I as T,In as E,It as D,J as O,Jn as k,K as A,Kn as j,Kt as M,L as N,Ln as ee,Lt as P,M as F,Mn as te,Mt as ne,N as I,Nn as L,Nt as R,O as z,Or as B,Ot as V,P as re,Pn as ie,Pt as ae,Q as oe,Qn as H,R as U,Rn as se,Rt as ce,Sr as le,St as ue,T as de,Tr as fe,Tt as W,U as pe,Ut as me,V as he,Vt as ge,W as _e,Wn as ve,Wt as ye,X as be,Y as xe,Yn as G,Yt as K,Z as Se,Zn as Ce,_ as q,_r as we,_t as Te,a as Ee,ar as De,br as Oe,bt as ke,c as Ae,cr as je,ct as Me,d as Ne,dr as Pe,dt as Fe,en as Ie,er as Le,et as Re,f as ze,fr as Be,g as Ve,gr as He,gt as Ue,h as We,hr as J,ht as Ge,i as Ke,ir as qe,it as Je,j as Ye,jn as Xe,jr as Ze,jt as Qe,k as $e,kr as et,kt as tt,l as nt,lt as rt,m as it,mr as Y,mt as at,n as ot,nr as st,nt as ct,o as lt,or as ut,ot as dt,p as ft,pr as pt,pt as mt,q as ht,qn as gt,qt as _t,r as vt,rr as yt,rt as bt,s as xt,st as St,tr as Ct,tt as wt,u as Tt,ur as Et,ut as Dt,v as Ot,vr as kt,vt as At,w as jt,wr as Mt,wt as Nt,xr as Pt,xt as Ft,y as It,yr as Lt,yt as Rt,z as zt,zn as Bt,zt as Vt}from"./world-surface-Bylg2z_8.js";import{a as Ht,c as Ut,d as Wt,f as Gt,i as Kt,l as qt,o as X,r as Jt,s as Yt,t as Xt,u as Zt}from"./globe-land-colors-iS-OXsJS.js";import{A as Qt,B as $t,C as en,D as tn,E as nn,F as rn,G as an,H as on,I as sn,K as cn,L as ln,M as un,N as dn,O as fn,P as pn,R as mn,S as hn,T as gn,U as _n,V as vn,W as yn,_ as bn,a as xn,b as Sn,c as Cn,d as wn,f as Tn,g as En,h as Dn,i as On,j as kn,l as An,m as jn,n as Mn,o as Nn,p as Pn,r as Fn,s as In,u as Ln,v as Rn,w as zn,x as Bn,y as Vn,z as Hn}from"./farm-villages-DP3JT-sy.js";import{o as Un,s as Wn}from"./mountain-ranges-etBC5vVf.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function Gn(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Kn(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var qn={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Z={common:{diffuse:{value:new v(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new V}},envmap:{envMap:{value:null},envMapRotation:{value:new V},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new V}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new V}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new V},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new V},normalScale:{value:new Y(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new V},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new V}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new V}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new V}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new v(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new v(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0},uvTransform:{value:new V}},sprite:{diffuse:{value:new v(16777215)},opacity:{value:1},center:{value:new Y(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}}},Jn={basic:{uniforms:B([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:qn.meshbasic_vert,fragmentShader:qn.meshbasic_frag},lambert:{uniforms:B([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new v(0)},envMapIntensity:{value:1}}]),vertexShader:qn.meshlambert_vert,fragmentShader:qn.meshlambert_frag},phong:{uniforms:B([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new v(0)},specular:{value:new v(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qn.meshphong_vert,fragmentShader:qn.meshphong_frag},standard:{uniforms:B([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new v(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qn.meshphysical_vert,fragmentShader:qn.meshphysical_frag},toon:{uniforms:B([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new v(0)}}]),vertexShader:qn.meshtoon_vert,fragmentShader:qn.meshtoon_frag},matcap:{uniforms:B([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:qn.meshmatcap_vert,fragmentShader:qn.meshmatcap_frag},points:{uniforms:B([Z.points,Z.fog]),vertexShader:qn.points_vert,fragmentShader:qn.points_frag},dashed:{uniforms:B([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qn.linedashed_vert,fragmentShader:qn.linedashed_frag},depth:{uniforms:B([Z.common,Z.displacementmap]),vertexShader:qn.depth_vert,fragmentShader:qn.depth_frag},normal:{uniforms:B([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:qn.meshnormal_vert,fragmentShader:qn.meshnormal_frag},sprite:{uniforms:B([Z.sprite,Z.fog]),vertexShader:qn.sprite_vert,fragmentShader:qn.sprite_frag},background:{uniforms:{uvTransform:{value:new V},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qn.background_vert,fragmentShader:qn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new V}},vertexShader:qn.backgroundCube_vert,fragmentShader:qn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qn.cube_vert,fragmentShader:qn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qn.equirect_vert,fragmentShader:qn.equirect_frag},distance:{uniforms:B([Z.common,Z.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qn.distance_vert,fragmentShader:qn.distance_frag},shadow:{uniforms:B([Z.lights,Z.fog,{color:{value:new v(0)},opacity:{value:1}}]),vertexShader:qn.shadow_vert,fragmentShader:qn.shadow_frag}};Jn.physical={uniforms:B([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new V},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new V},clearcoatNormalScale:{value:new Y(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new V},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new V},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new V},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new V},sheen:{value:0},sheenColor:{value:new v(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new V},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new V},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new V},transmissionSamplerSize:{value:new Y},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new V},attenuationDistance:{value:0},attenuationColor:{value:new v(0)},specularColor:{value:new v(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new V},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new V},anisotropyVector:{value:new Y},anisotropyMap:{value:null},anisotropyMapTransform:{value:new V}}]),vertexShader:qn.meshphysical_vert,fragmentShader:qn.meshphysical_frag};var Yn={r:0,b:0,g:0},Xn=new tt,Zn=new V;Zn.set(-1,0,0,0,1,0,0,0,1);function Qn(e,t,n,r,i,a){let s=new v(0),c=i===!0?0:1,l,u,d=null,p=0,m=null;function h(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function _(t){let r=!1,i=h(t);i===null?b(s,c):i&&i.isColor&&(b(i,1),r=!0);let o=e.xr.getEnvironmentBlendMode();o===`additive`?n.buffers.color.setClear(0,0,0,1,a):o===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function y(t,n){let i=h(n);i&&i.isCubeTexture?(u===void 0&&(u=new o(new f(1,1,1),new gt({name:`BackgroundCubeMaterial`,uniforms:Oe(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Xn.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Zn),u.material.toneMapped=T.getTransfer(i.colorSpace)!==x,(d!==i||p!==i.version||m!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,p=i.version,m=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new o(new S(2,2),new gt({name:`BackgroundMaterial`,uniforms:Oe(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=T.getTransfer(i.colorSpace)!==x,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||p!==i.version||m!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,p=i.version,m=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function b(t,r){t.getRGB(Yn,g(e)),n.buffers.color.setClear(Yn.r,Yn.g,Yn.b,r,a)}function C(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,b(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,b(s,c)},render:_,addToRenderList:y,dispose:C}}function $n(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function er(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function tr(e,t,n,r){let i;function o(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function c(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let u=n.precision===void 0?`highp`:n.precision,d=l(u);d!==u&&(a(`WebGLRenderer:`,u,`not supported, using`,d,`instead.`),u=d);let f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=n.logarithmicDepthBuffer===!0&&f===!1;n.reversedDepthBuffer===!0&&f===!1&&a(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&f===!0&&a(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),v=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:c,precision:u,logarithmicDepthBuffer:p,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:S,samples:C}}function nr(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ye,s=new V,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var rr=class extends kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new s(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new f(5,5,5),i=new gt({name:`CubemapFromEquirect`,uniforms:Oe(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new o(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=Ft),new U(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},ir=256,ar=3,or=20,sr=256,cr=16,lr=3,ur=new J,dr=new v,fr=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new U(1,10,null),this._boxMesh=new o(new f(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ur}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(dr));let h=new U(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(ir,Mt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?ir:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=pr(e,!1,!1),n=Math.log2(e)-ar;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=pr(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=yr()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=vr()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=hr(),this._integrationMaterial=gr());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/cr);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-lr)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(sr*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=_r());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function pr(e,t,n){return new rr(e,{minFilter:ue,generateMipmaps:t,type:St,colorSpace:Nt,depthBuffer:n})}function mr(e,t,n){return new gt({name:e,uniforms:t,vertexShader:qn.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function hr(){return mr(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${sr}u

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
	`)}function gr(){return mr(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:cr}},`

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
	`)}function _r(){return mr(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${or}
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
	`)}function vr(){return mr(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

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
	`)}function yr(){return mr(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function br(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new rr(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new fr(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new fr(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function xr(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ze(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Sr(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?qe:yt)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Cr(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function wr(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:u(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Tr(e,t,n){let r=new WeakMap,i=new He;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new pe(h,p,m,u);g.type=wt,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Y(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Er(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Dr={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Or(e,t,n,r,i,a){let s=new kt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,l=null,u=null,d=new $e;d.setAttribute(`position`,new Re([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute(`uv`,new Re([0,2,0,0,2,0],2));let f=new te({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new o(d,f),m=new ge(-1,1,1,-1,0,1),h=null,g=null,_=!1,v,y=null,b=[],x=!1;this.setSize=function(e,t){s.setSize(e,t),c!==null&&c.setSize(e,t),l!==null&&l.setSize(e,t);for(let n=0;n<b.length;n++){let r=b[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){b=e,x=b.length>0&&b[0].isRenderPass===!0;let t=s.width,n=s.height;b.length>0&&c===null&&(c=new kt(t,n,{type:St,depthBuffer:!1,stencilBuffer:!1}),l=new kt(t,n,{type:St,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&b.some(e=>e.needsDepthTexture===!0);r!==(s.depthTexture!==null)&&(r===!0&&u===null&&(u=new ht(t,n),a===!0&&(u.format=A,u.type=je)),s.dispose(),s.depthTexture=r?u:null,s.resolveDepthBuffer=r,s.storeMultisampledDepthBuffer=r);for(let e=0;e<b.length;e++){let i=b[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(u)}},this.begin=function(e,t){if(_||e.toneMapping===0&&b.length===0)return!1;if(y=t,t!==null){let e=t.width,n=t.height;(s.width!==e||s.height!==n)&&this.setSize(e,n)}return x===!1&&e.setRenderTarget(s),v=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return x},this.end=function(e,t){e.toneMapping=v,_=!0;let n=s,r=c;for(let i=0;i<b.length;i++){let a=b[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===c?l:c))}if(h!==e.outputColorSpace||g!==e.toneMapping){h=e.outputColorSpace,g=e.toneMapping,f.defines={},T.getTransfer(h)===`srgb`&&(f.defines.SRGB_TRANSFER=``);let t=Dr[g];t&&(f.defines[t]=``),f.needsUpdate=!0}f.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(y),e.render(p,m),y=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),d.dispose(),f.dispose()}}var kr=new Ct,Ar=new ht(1,1),jr=new zt(1),Mr=new pe,Nr=new C,Pr=new s,Fr=[],Ir=[],Lr=new Float32Array(16),Rr=new Float32Array(9),zr=new Float32Array(4);function Br(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Fr[i];if(a===void 0&&(a=new Float32Array(i),Fr[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Vr(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Hr(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ur(e,t){let n=Ir[t];n===void 0&&(n=new Int32Array(t),Ir[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Wr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Gr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vr(n,t))return;e.uniform2fv(this.addr,t),Hr(n,t)}}function Kr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Vr(n,t))return;e.uniform3fv(this.addr,t),Hr(n,t)}}function qr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vr(n,t))return;e.uniform4fv(this.addr,t),Hr(n,t)}}function Jr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vr(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Hr(n,t)}else{if(Vr(n,r))return;zr.set(r),e.uniformMatrix2fv(this.addr,!1,zr),Hr(n,r)}}function Yr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vr(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Hr(n,t)}else{if(Vr(n,r))return;Rr.set(r),e.uniformMatrix3fv(this.addr,!1,Rr),Hr(n,r)}}function Xr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vr(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Hr(n,t)}else{if(Vr(n,r))return;Lr.set(r),e.uniformMatrix4fv(this.addr,!1,Lr),Hr(n,r)}}function Zr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Qr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vr(n,t))return;e.uniform2iv(this.addr,t),Hr(n,t)}}function $r(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Vr(n,t))return;e.uniform3iv(this.addr,t),Hr(n,t)}}function ei(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vr(n,t))return;e.uniform4iv(this.addr,t),Hr(n,t)}}function ti(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ni(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vr(n,t))return;e.uniform2uiv(this.addr,t),Hr(n,t)}}function ri(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Vr(n,t))return;e.uniform3uiv(this.addr,t),Hr(n,t)}}function ii(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vr(n,t))return;e.uniform4uiv(this.addr,t),Hr(n,t)}}function ai(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function oi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?ai(Ar):kr,n.setTexture2D(t||a,i)}function si(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Nr,i)}function ci(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?ai(jr):Pr,n.setTextureCube(t||a,i)}function li(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Mr,i)}function ui(e){switch(e){case 5126:return Wr;case 35664:return Gr;case 35665:return Kr;case 35666:return qr;case 35674:return Jr;case 35675:return Yr;case 35676:return Xr;case 5124:case 35670:return Zr;case 35667:case 35671:return Qr;case 35668:case 35672:return $r;case 35669:case 35673:return ei;case 5125:return ti;case 36294:return ni;case 36295:return ri;case 36296:return ii;case 35678:case 36198:case 36298:case 36306:case 35682:return oi;case 35679:case 36299:case 36307:return si;case 35680:case 36300:case 36308:case 36293:return ci;case 36289:case 36303:case 36311:case 36292:return li}}function di(e,t){e.uniform1fv(this.addr,t)}function fi(e,t){let n=Br(t,this.size,2);e.uniform2fv(this.addr,n)}function pi(e,t){let n=Br(t,this.size,3);e.uniform3fv(this.addr,n)}function mi(e,t){let n=Br(t,this.size,4);e.uniform4fv(this.addr,n)}function hi(e,t){let n=Br(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function gi(e,t){let n=Br(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function _i(e,t){let n=Br(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function vi(e,t){e.uniform1iv(this.addr,t)}function yi(e,t){e.uniform2iv(this.addr,t)}function bi(e,t){e.uniform3iv(this.addr,t)}function xi(e,t){e.uniform4iv(this.addr,t)}function Si(e,t){e.uniform1uiv(this.addr,t)}function Ci(e,t){e.uniform2uiv(this.addr,t)}function wi(e,t){e.uniform3uiv(this.addr,t)}function Ti(e,t){e.uniform4uiv(this.addr,t)}function Ei(e,t,n){let r=this.cache,i=t.length,a=Ur(n,i);Vr(r,a)||(e.uniform1iv(this.addr,a),Hr(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ai(Ar):kr;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Di(e,t,n){let r=this.cache,i=t.length,a=Ur(n,i);Vr(r,a)||(e.uniform1iv(this.addr,a),Hr(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Nr,a[e])}function Oi(e,t,n){let r=this.cache,i=t.length,a=Ur(n,i);Vr(r,a)||(e.uniform1iv(this.addr,a),Hr(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?ai(jr):Pr;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function ki(e,t,n){let r=this.cache,i=t.length,a=Ur(n,i);Vr(r,a)||(e.uniform1iv(this.addr,a),Hr(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Mr,a[e])}function Ai(e){switch(e){case 5126:return di;case 35664:return fi;case 35665:return pi;case 35666:return mi;case 35674:return hi;case 35675:return gi;case 35676:return _i;case 5124:case 35670:return vi;case 35667:case 35671:return yi;case 35668:case 35672:return bi;case 35669:case 35673:return xi;case 5125:return Si;case 36294:return Ci;case 36295:return wi;case 36296:return Ti;case 35678:case 36198:case 36298:case 36306:case 35682:return Ei;case 35679:case 36299:case 36307:return Di;case 35680:case 36300:case 36308:case 36293:return Oi;case 36289:case 36303:case 36311:case 36292:return ki}}var ji=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ui(t.type)}},Mi=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ai(t.type)}},Ni=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Pi=/(\w+)(\])?(\[|\.)?/g;function Fi(e,t){e.seq.push(t),e.map[t.id]=t}function Ii(e,t,n){let r=e.name,i=r.length;for(Pi.lastIndex=0;;){let a=Pi.exec(r),o=Pi.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Fi(n,l===void 0?new ji(s,e,t):new Mi(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Ni(s),Fi(n,e)),n=e}}}var Li=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ii(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ri(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var zi=37297,Bi=0;function Vi(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Hi=new V;function Ui(e){T._getMatrix(Hi,T.workingColorSpace,e);let t=`mat3( ${Hi.elements.map(e=>e.toFixed(4))} )`;switch(T.getTransfer(e)){case W:return[t,`LinearTransferOETF`];case x:return[t,`sRGBTransferOETF`];default:return a(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Wi(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Vi(e.getShaderSource(t),r)}return i}function Gi(e,t){let n=Ui(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Ki={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function qi(e,t){let n=Ki[t];return n===void 0?(a(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ji=new J;function Yi(){return T.getLuminanceCoefficients(Ji),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ji.x.toFixed(4)}, ${Ji.y.toFixed(4)}, ${Ji.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Xi(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter($i).join(`
`)}function Zi(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Qi(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function $i(e){return e!==``}function ea(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function ta(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var na=/^[ \t]*#include +<([\w\d./]+)>/gm;function ra(e){return e.replace(na,ia)}function ia(e,t){let n=qn[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return ra(n)}var aa=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oa(e){return e.replace(aa,sa)}function sa(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ca(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var la={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ua(e){return la[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var da={302:`ENVMAP_MODE_REFRACTION`};function fa(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:da[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var pa={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ma(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:pa[e.combine]||`ENVMAP_BLENDING_NONE`}function ha(e,t,n,r){let i=e.getContext(),o=n.defines,s=n.vertexShader,c=n.fragmentShader,l=ua(n),d=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,f=fa(n),p=ma(n),m=Xi(n),h=Zi(o),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter($i).join(`
`),_.length>0&&(_+=`
`),v=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter($i).join(`
`),v.length>0&&(v+=`
`)):(_=[ca(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+f:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+l:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter($i).join(`
`),v=[ca(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+d:``,n.envMap?`#define `+f:``,n.envMap?`#define `+p:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+l:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:qn.tonemapping_pars_fragment,n.toneMapping===0?``:qi(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,qn.colorspace_pars_fragment,Gi(`linearToOutputTexel`,n.outputColorSpace),Yi(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter($i).join(`
`)),s=ra(s),s=ea(s,n),s=ta(s,n),c=ra(c),c=ea(c,n),c=ta(c,n),s=oa(s),c=oa(c),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+s,x=y+v+c,S=Ri(i,i.VERTEX_SHADER,b),C=Ri(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g)||``,r=i.getShaderInfoLog(S)||``,o=i.getShaderInfoLog(C)||``,s=n.trim(),c=r.trim(),l=o.trim(),d=!0,f=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(d=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Wi(i,S,`vertex`),n=Wi(i,C,`fragment`);u(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+s+`
`+e+`
`+n)}}else s===``?(c===``||l===``)&&(f=!1):a(`WebGLProgram: Program Info Log:`,s);f&&(t.diagnostics={runnable:d,programLog:s,vertexShader:{log:c,prefix:_},fragmentShader:{log:l,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new Li(i,g),E=Qi(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,zi)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Bi++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var ga=0,_a=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new va(e),t.set(e,n)),n}},va=class{constructor(e){this.id=ga++,this.code=e,this.usedTimes=0}};function ya(e){return e===1030||e===37490||e===36285}function ba(e,t,n,r,i,o){let s=new at,c=new _a,l=new Set,u=[],d=new Map,f=r.logarithmicDepthBuffer,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return l.add(e),e===0?`uv`:`uv${e}`}function h(i,s,u,d,h,g){let _=d.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?d.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=p[i.type],C=r.precision;i.precision!==null&&(C=r.getMaxPrecision(i.precision),C!==i.precision&&a(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,C,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,E=w===void 0?0:w.length,D=0;v.morphAttributes.position!==void 0&&(D=1),v.morphAttributes.normal!==void 0&&(D=2),v.morphAttributes.color!==void 0&&(D=3);let O,k,A,j;if(S){let e=Jn[S];O=e.vertexShader,k=e.fragmentShader}else{O=i.vertexShader,k=i.fragmentShader;let e=c.getVertexShaderStage(i),t=c.getFragmentShaderStage(i);c.update(i,e,t),A=e.id,j=t.id}let M=e.getRenderTarget(),N=e.state.buffers.depth.getReversed(),ee=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,te=!!i.matcap,ne=!!x,I=ne&&x.isPMREMTexture===!0,L=!!i.aoMap,R=!!i.lightMap,z=!!i.bumpMap&&i.wireframe===!1,B=!!i.normalMap,V=!!i.displacementMap,re=!!i.emissiveMap,ie=!!i.metalnessMap,ae=!!i.roughnessMap,oe=i.anisotropy>0,H=i.clearcoat>0,U=i.diffuseRoughness>0,se=i.dispersion>0,ce=i.retroreflectivity>0,le=i.iridescence>0,ue=i.sheen>0,de=i.transmission>0,fe=oe&&!!i.anisotropyMap,W=H&&!!i.clearcoatMap,pe=H&&!!i.clearcoatNormalMap,me=H&&!!i.clearcoatRoughnessMap,he=U&&!!i.diffuseRoughnessMap,ge=le&&!!i.iridescenceMap,_e=le&&!!i.iridescenceThicknessMap,ve=ue&&!!i.sheenColorMap,ye=ue&&!!i.sheenRoughnessMap,be=!!i.specularMap,xe=!!i.specularColorMap,G=!!i.specularIntensityMap,K=de&&!!i.transmissionMap,Se=de&&!!i.thicknessMap,Ce=!!i.gradientMap,q=!!i.alphaMap,we=i.alphaTest>0,Te=!!i.alphaHash,Ee=!!i.extensions,De=0;i.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(De=e.toneMapping);let Oe=I?x.isCompressedCubeTexture?x.image[0].mipmaps:x.mipmaps:null,ke={shaderID:S,shaderType:i.type,shaderName:i.name,vertexShader:O,fragmentShader:k,defines:i.defines,customVertexShaderID:A,customFragmentShaderID:j,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:C,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:ee,instancingColor:ee&&h.instanceColor!==null,instancingMorph:ee&&h.morphTexture!==null,outputColorSpace:M===null?e.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:T.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:te,envMap:ne,envMapMode:ne&&x.mapping,envMapPMREM:I,envMapMaxLod:I?Oe.length-1:null,envMapSize:I?Oe[0].width:null,aoMap:L,lightMap:R,bumpMap:z,normalMap:B,displacementMap:V,emissiveMap:re,normalMapObjectSpace:B&&i.normalMapType===1,normalMapTangentSpace:B&&i.normalMapType===0,packedNormalMap:B&&i.normalMapType===0&&ya(i.normalMap.format),metalnessMap:ie,roughnessMap:ae,anisotropy:oe,anisotropyMap:fe,clearcoat:H,clearcoatMap:W,clearcoatNormalMap:pe,clearcoatRoughnessMap:me,diffuseRoughness:U,diffuseRoughnessMap:he,dispersion:se,retroreflection:ce,iridescence:le,iridescenceMap:ge,iridescenceThicknessMap:_e,sheen:ue,sheenColorMap:ve,sheenRoughnessMap:ye,specularMap:be,specularColorMap:xe,specularIntensityMap:G,transmission:de,transmissionMap:K,thicknessMap:Se,gradientMap:Ce,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:q,alphaTest:we,alphaHash:Te,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:L&&m(i.aoMap.channel),lightMapUv:R&&m(i.lightMap.channel),bumpMapUv:z&&m(i.bumpMap.channel),normalMapUv:B&&m(i.normalMap.channel),displacementMapUv:V&&m(i.displacementMap.channel),emissiveMapUv:re&&m(i.emissiveMap.channel),metalnessMapUv:ie&&m(i.metalnessMap.channel),roughnessMapUv:ae&&m(i.roughnessMap.channel),anisotropyMapUv:fe&&m(i.anisotropyMap.channel),clearcoatMapUv:W&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:pe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&m(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:he&&m(i.diffuseRoughnessMap.channel),iridescenceMapUv:ge&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(i.sheenRoughnessMap.channel),specularMapUv:be&&m(i.specularMap.channel),specularColorMapUv:xe&&m(i.specularColorMap.channel),specularIntensityMapUv:G&&m(i.specularIntensityMap.channel),transmissionMapUv:K&&m(i.transmissionMap.channel),thicknessMapUv:Se&&m(i.thicknessMap.channel),alphaMapUv:q&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(B||oe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||q),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&B===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:N,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:s.sun.length,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numSunLightShadows:s.sunShadowMap.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numLightProbeGrids:g.filter(e=>e.texture!==null).length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&T.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:re&&i.emissiveMap.isVideoTexture===!0&&T.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ee&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ee&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return ke.vertexUv1s=l.has(1),ke.vertexUv2s=l.has(2),ke.vertexUv3s=l.has(3),l.clear(),ke}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){s.disableAll(),t.instancing&&s.enable(0),t.instancingColor&&s.enable(1),t.instancingMorph&&s.enable(2),t.matcap&&s.enable(3),t.envMap&&s.enable(4),t.normalMapObjectSpace&&s.enable(5),t.normalMapTangentSpace&&s.enable(6),t.clearcoat&&s.enable(7),t.iridescence&&s.enable(8),t.alphaTest&&s.enable(9),t.vertexColors&&s.enable(10),t.vertexAlphas&&s.enable(11),t.vertexUv1s&&s.enable(12),t.vertexUv2s&&s.enable(13),t.vertexUv3s&&s.enable(14),t.vertexTangents&&s.enable(15),t.anisotropy&&s.enable(16),t.alphaHash&&s.enable(17),t.batching&&s.enable(18),t.dispersion&&s.enable(19),t.retroreflection&&s.enable(24),t.diffuseRoughness&&s.enable(25),t.batchingColor&&s.enable(20),t.gradientMap&&s.enable(21),t.packedNormalMap&&s.enable(22),t.vertexNormals&&s.enable(23),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),t.numLightProbeGrids>0&&s.enable(22),t.hasPositionAttribute&&s.enable(23),e.push(s.mask)}function y(e){let t=p[e.type],n;if(t){let e=Jn[t];n=De.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=d.get(n);return r===void 0?(r=new ha(e,n,t,i),u.push(r),d.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),d.delete(e.cacheKey),e.destroy()}}function S(e){c.remove(e)}function C(){c.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:u,dispose:C}}function xa(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Sa(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ca(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function wa(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Sa),r.length>1&&r.sort(t||Ca),i.length>1&&i.sort(t||Ca)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ta(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new wa,e.set(t,[i])):n>=r.length?(i=new wa,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Ea(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new J,color:new v};break;case`SpotLight`:n={position:new J,direction:new J,color:new v,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new v,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new v,groundColor:new v};break;case`RectAreaLight`:n={color:new v,position:new J,halfWidth:new J,halfHeight:new J}}return e[t.id]=n,n}}}function Da(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Oa=0;function ka(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Aa(e){let t=new Ea,n=Da(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new tt,o=new tt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ka);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Oa++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function ja(e){let t=new Aa(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Ma(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ja(e),t.set(n,[a])):r>=i.length?(a=new ja(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Na=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pa=`uniform sampler2D shadow_pass;
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
}`,Fa=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],Ia=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],La=new tt,Ra=new J,za=new J;function Ba(e,t,n){let r=new bt,s=new Y,c=new Y,l=new He,u=new ne,d=new R,f={},p=n.maxTextureSize,m={0:1,1:0,2:2},h=new gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y},radius:{value:4}},vertexShader:Na,fragmentShader:Pa}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let _=new $e;_.setAttribute(`position`,new z(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new o(_,h),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let x=this.type;this.render=function(t,n,o){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||t.length===0)return;this.type===2&&(a(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=x!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],f=d.shadow;if(f===void 0){a(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;s.copy(f.mapSize);let g=f.getFrameExtents();s.multiply(g),c.copy(f.mapSize),(s.x>p||s.y>p)&&(s.x>p&&(c.x=Math.floor(p/g.x),s.x=c.x*g.x,f.mapSize.x=c.x),s.y>p&&(c.y=Math.floor(p/g.y),s.y=c.y*g.y,f.mapSize.y=c.y));let _=e.state.buffers.depth.getReversed();if(f.camera._reversedDepth=_,f.map===null||h===!0){if(f.map!==null&&(f.map.depthTexture!==null&&(f.map.depthTexture.dispose(),f.map.depthTexture=null),f.map.dispose()),this.type===3){if(d.isPointLight){a(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}f.map=new kt(s.x,s.y,{format:i,type:St,minFilter:Ft,magFilter:Ft,generateMipmaps:!1}),f.map.texture.name=d.name+`.shadowMap`,f.map.depthTexture=new ht(s.x,s.y,wt),f.map.depthTexture.name=d.name+`.shadowMapDepth`,f.map.depthTexture.format=b,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P,f.map.depthTexture.magFilter=P}else d.isPointLight?(f.map=new rr(s.x),f.map.depthTexture=new zt(s.x,Et)):(f.map=new kt(s.x,s.y),f.map.depthTexture=new ht(s.x,s.y,Et)),f.map.depthTexture.name=d.name+`.shadowMap`,f.map.depthTexture.format=b,this.type===1?(f.map.depthTexture.compareFunction=_?518:515,f.map.depthTexture.minFilter=Ft,f.map.depthTexture.magFilter=Ft):(f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P,f.map.depthTexture.magFilter=P);f.camera.updateProjectionMatrix()}f.map.isWebGLCubeRenderTarget!==!0&&(f.map.width!==s.x||f.map.height!==s.y)&&f.map.setSize(s.x,s.y);let v=f.map.isWebGLCubeRenderTarget?6:f.getViewportCount();d.isPointLight!==!0&&f.updateMatrices(d,o);let y=f.camera.layers.mask&4294967294?f.camera.layers:o.layers;for(let t=0;t<v;t++){let i=f.getCamera(t);if(d.isPointLight){let e=f.camera,n=f.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ra.setFromMatrixPosition(d.matrixWorld),e.position.copy(Ra),za.copy(e.position),za.add(Fa[t]),e.up.copy(Ia[t]),e.lookAt(za),e.updateMatrixWorld(),n.makeTranslation(-Ra.x,-Ra.y,-Ra.z),La.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),f._frustum.setFromProjectionMatrix(La,e.coordinateSystem,e.reversedDepth)}if(f.map.isWebGLCubeRenderTarget)e.setRenderTarget(f.map,t),e.clear();else{t===0&&(e.setRenderTarget(f.map),e.clear());let n=f.getViewport(t);l.set(c.x*n.x,c.y*n.y,c.x*n.z,c.y*n.w),m.viewport(l)}r=f.getFrustum(t),w(n,o,i,d,y,this.type)}f.isPointLightShadow!==!0&&this.type===3&&S(f,o),f.needsUpdate=!1}x=this.type,y.needsUpdate=!1,e.setRenderTarget(u,d,f)};function S(n,r){let a=t.update(v);h.defines.VSM_SAMPLES!==n.blurSamples&&(h.defines.VSM_SAMPLES=n.blurSamples,g.defines.VSM_SAMPLES=n.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),n.mapPass===null?n.mapPass=new kt(s.x,s.y,{format:i,type:St}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),h.uniforms.shadow_pass.value=n.map.depthTexture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,h,v,null),g.uniforms.shadow_pass.value=n.mapPass.texture,g.uniforms.resolution.value.set(n.map.width,n.map.height),g.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,g,v,null)}function C(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?d:u,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=f[e];r===void 0&&(r={},f[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,T)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?m[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function w(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=C(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=C(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)w(l[e],i,a,o,s,c)}function T(e){e.target.removeEventListener(`dispose`,T);for(let t in f){let n=f[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Va(e,t){function n(){let t=!1,n=new He,r=null,i=new He(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ie(e.DEPTH_TEST):ae(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=se[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ie(e.STENCIL_TEST):ae(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,d={},f={},p={},m=new WeakMap,h=[],g=null,_=!1,y=null,b=null,x=null,S=null,C=null,w=null,T=null,E=new v(0,0,0),D=0,O=!1,k=null,A=null,j=null,M=null,N=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,F=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),P=F>=2):(F=parseFloat(/^WebGL (\d)/.exec(te)[1]),P=F>=1);let ne=null,I={},L=e.getParameter(e.SCISSOR_BOX),R=e.getParameter(e.VIEWPORT),z=new He().fromArray(L),B=new He().fromArray(R);function V(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let re={};re[e.TEXTURE_2D]=V(e.TEXTURE_2D,e.TEXTURE_2D,1),re[e.TEXTURE_CUBE_MAP]=V(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[e.TEXTURE_2D_ARRAY]=V(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),re[e.TEXTURE_3D]=V(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ie(e.DEPTH_TEST),o.setFunc(3),fe(!1),W(1),ie(e.CULL_FACE),ue(0);function ie(t){d[t]!==!0&&(e.enable(t),d[t]=!0)}function ae(t){d[t]!==!1&&(e.disable(t),d[t]=!1)}function oe(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function H(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function U(t){return g!==t&&(e.useProgram(t),g=t,!0)}let ce={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ce[103]=e.MIN,ce[104]=e.MAX;let le={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ue(t,n,r,i,a,o,s,c,l,d){if(t===0)_===!0&&(ae(e.BLEND),_=!1);else if(_===!1&&(ie(e.BLEND),_=!0),t!==5){if(t!==y||d!==O){if((b!==100||C!==100)&&(e.blendEquation(e.FUNC_ADD),b=100,C=100),d)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:u(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:u(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:u(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:u(`WebGLState: Invalid blending: `,t)}x=null,S=null,w=null,T=null,E.set(0,0,0),D=0,y=t,O=d}}else a||=n,o||=r,s||=i,(n!==b||a!==C)&&(e.blendEquationSeparate(ce[n],ce[a]),b=n,C=a),(r!==x||i!==S||o!==w||s!==T)&&(e.blendFuncSeparate(le[r],le[i],le[o],le[s]),x=r,S=i,w=o,T=s),(c.equals(E)===!1||l!==D)&&(e.blendColor(c.r,c.g,c.b,l),E.copy(c),D=l),y=t,O=!1}function de(t,n){t.side===2?ae(e.CULL_FACE):ie(e.CULL_FACE);let r=t.side===1;n&&(r=!r),fe(r),t.blending===1&&t.transparent===!1?ue(0):ue(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),me(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ie(e.SAMPLE_ALPHA_TO_COVERAGE):ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function fe(t){k!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),k=t)}function W(t){t===0?ae(e.CULL_FACE):(ie(e.CULL_FACE),t!==A&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),A=t}function pe(t){t!==j&&(P&&e.lineWidth(t),j=t)}function me(t,n,r){t?(ie(e.POLYGON_OFFSET_FILL),(M!==n||N!==r)&&(M=n,N=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ae(e.POLYGON_OFFSET_FILL)}function he(t){t?ie(e.SCISSOR_TEST):ae(e.SCISSOR_TEST)}function ge(t){t===void 0&&(t=e.TEXTURE0+ee-1),ne!==t&&(e.activeTexture(t),ne=t)}function _e(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+ee-1:ne);let i=I[r];i===void 0&&(i={type:void 0,texture:void 0},I[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||re[t]),i.type=t,i.texture=n)}function ve(){let t=I[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ye(){try{e.compressedTexImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function be(){try{e.compressedTexImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function xe(){try{e.texSubImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function G(){try{e.texSubImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function K(){try{e.compressedTexSubImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Se(){try{e.compressedTexSubImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Ce(){try{e.texStorage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function q(){try{e.texStorage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function we(){try{e.texImage2D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Te(){try{e.texImage3D(...arguments)}catch(e){u(`WebGLState:`,e)}}function Ee(t){return f[t]===void 0?e.getParameter(t):f[t]}function De(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function Oe(t){z.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),z.copy(t))}function ke(t){B.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),B.copy(t))}function Ae(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function je(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Me(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},ne=null,I={},p={},c={},m=new WeakMap,h=[],g=null,_=!1,y=null,b=null,x=null,S=null,C=null,w=null,T=null,E=new v(0,0,0),D=0,O=!1,k=null,A=null,j=null,M=null,N=null,z.set(0,0,e.canvas.width,e.canvas.height),B.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ie,disable:ae,bindFramebuffer:oe,drawBuffers:H,useProgram:U,setBlending:ue,setMaterial:de,setFlipSided:fe,setCullFace:W,setLineWidth:pe,setPolygonOffset:me,setScissorTest:he,activeTexture:ge,bindTexture:_e,unbindTexture:ve,compressedTexImage2D:ye,compressedTexImage3D:be,texImage2D:we,texImage3D:Te,pixelStorei:De,getParameter:Ee,updateUBOMapping:Ae,uniformBlockBinding:je,texStorage2D:Ce,texStorage3D:q,texSubImage2D:xe,texSubImage3D:G,compressedTexSubImage2D:K,compressedTexSubImage3D:Se,scissor:Oe,viewport:ke,reset:Me}}function Ha(e,t,n,r,i,o,s){let c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Y,p=new WeakMap,m=new Set,h,g=new WeakMap,_=new Set,v=new FinalizationRegistry(e=>_.delete(e)),y=!1;try{y=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function b(e,t){return y?new OffscreenCanvas(e,t):le(`canvas`)}function x(e,t,n){let r=1,i=Ne(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),o=Math.floor(r*i.height);h===void 0&&(h=b(n,o));let s=t?b(n,o):h;return s.width=n,s.height=o,s.getContext(`2d`).drawImage(e,0,0,n,o),a(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+o+`).`),s}return`data`in e&&a(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function S(e){return e.generateMipmaps}function C(t){e.generateMipmap(t)}function w(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function E(n,r,i,o,s,c=!1){if(n!==null){if(e[n]!==void 0)return e[n];a(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let l;o&&(l=t.get(`EXT_texture_norm16`),l||a(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let u=r;if(r===e.RED&&(i===e.FLOAT&&(u=e.R32F),i===e.HALF_FLOAT&&(u=e.R16F),i===e.UNSIGNED_BYTE&&(u=e.R8),i===e.UNSIGNED_SHORT&&l&&(u=l.R16_EXT),i===e.SHORT&&l&&(u=l.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.R8UI),i===e.UNSIGNED_SHORT&&(u=e.R16UI),i===e.UNSIGNED_INT&&(u=e.R32UI),i===e.BYTE&&(u=e.R8I),i===e.SHORT&&(u=e.R16I),i===e.INT&&(u=e.R32I)),r===e.RG&&(i===e.FLOAT&&(u=e.RG32F),i===e.HALF_FLOAT&&(u=e.RG16F),i===e.UNSIGNED_BYTE&&(u=e.RG8),i===e.UNSIGNED_SHORT&&l&&(u=l.RG16_EXT),i===e.SHORT&&l&&(u=l.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RG8UI),i===e.UNSIGNED_SHORT&&(u=e.RG16UI),i===e.UNSIGNED_INT&&(u=e.RG32UI),i===e.BYTE&&(u=e.RG8I),i===e.SHORT&&(u=e.RG16I),i===e.INT&&(u=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RGB8UI),i===e.UNSIGNED_SHORT&&(u=e.RGB16UI),i===e.UNSIGNED_INT&&(u=e.RGB32UI),i===e.BYTE&&(u=e.RGB8I),i===e.SHORT&&(u=e.RGB16I),i===e.INT&&(u=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(u=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(u=e.RGBA16UI),i===e.UNSIGNED_INT&&(u=e.RGBA32UI),i===e.BYTE&&(u=e.RGBA8I),i===e.SHORT&&(u=e.RGBA16I),i===e.INT&&(u=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&l&&(u=l.RGB16_EXT),i===e.SHORT&&l&&(u=l.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(u=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(u=e.R11F_G11F_B10F)),r===e.RGBA){let t=c?W:T.getTransfer(s);i===e.FLOAT&&(u=e.RGBA32F),i===e.HALF_FLOAT&&(u=e.RGBA16F),i===e.UNSIGNED_BYTE&&(u=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&l&&(u=l.RGBA16_EXT),i===e.SHORT&&l&&(u=l.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(u=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(u=e.RGB5_A1)}return(u===e.R16F||u===e.R32F||u===e.RG16F||u===e.RG32F||u===e.RGBA16F||u===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),u}function O(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,a(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function k(e,t){return S(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function j(e){let t=new WeakRef(e);r.get(e).__ref=t,_.add(t),v.register(e,t,t)}function M(e){let t=r.get(e).__ref;t!==void 0&&(_.delete(t),v.unregister(t))}function N(e){te(e.target)}function F(e){ne(e.target)}function te(e){e.removeEventListener(`dispose`,N),M(e),L(e),e.isVideoTexture&&p.delete(e),e.isHTMLTexture&&m.delete(e)}function ne(e){e.removeEventListener(`dispose`,F),M(e),z(e)}function I(){for(let e of _){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ne(t):te(t))}_.clear(),m.clear()}function L(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=g.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&R(e),Object.keys(i).length===0&&g.delete(n)}r.remove(e)}function R(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=g.get(i);delete a[n.__cacheKey],s.memory.textures--}function z(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&te(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),r.remove(a[t])}r.remove(t)}let B=0;function V(){B=0}function ie(){return B}function ae(e){B=e}function oe(){let e=B;return e>=i.maxTextures&&a(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),B+=1,e}function H(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function U(t,i){let o=r.get(t);if(t.isVideoTexture&&je(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&o.__version!==t.version){let e=t.image;if(e===null)a(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)a(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(o,t,i);return}}else t.isExternalTexture&&(o.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,o.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?xe(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function de(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?xe(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function pe(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?G(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let me={[ee]:e.REPEAT,[re]:e.CLAMP_TO_EDGE,[D]:e.MIRRORED_REPEAT},he={[P]:e.NEAREST,[Vt]:e.NEAREST_MIPMAP_NEAREST,[ce]:e.NEAREST_MIPMAP_LINEAR,[Ft]:e.LINEAR,[d]:e.LINEAR_MIPMAP_NEAREST,[ue]:e.LINEAR_MIPMAP_LINEAR},ge={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function _e(n,o){if(o.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(o.magFilter===1006||o.magFilter===1007||o.magFilter===1005||o.magFilter===1008||o.minFilter===1006||o.minFilter===1007||o.minFilter===1005||o.minFilter===1008)&&a(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,me[o.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,me[o.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,me[o.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,he[o.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,he[o.minFilter]),o.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ge[o.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(o.magFilter===1003||o.minFilter!==1005&&o.minFilter!==1008||o.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(o.anisotropy>1||r.get(o).__currentAnisotropy){let a=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,a.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,i.getMaxAnisotropy())),r.get(o).__currentAnisotropy=o.anisotropy}}}function ve(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,N),j(n));let i=n.source,a=g.get(i);a===void 0&&(a={},g.set(i,a));let o=H(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&R(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ye(n.start,r.width,4),c=ye(t.start,r.width,4);n.start<=i+1&&a===c&&ye(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function xe(t,s,c){let l=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(l=e.TEXTURE_3D);let u=ve(t,s),d=s.source;n.bindTexture(l,t.__webglTexture,e.TEXTURE0+c);let f=r.get(d);if(d.version!==f.__version||u===!0){if(n.activeTexture(e.TEXTURE0+c),!(typeof ImageBitmap<`u`&&s.image instanceof ImageBitmap)){let t=T.getPrimaries(T.workingColorSpace),r=s.colorSpace===``?null:T.getPrimaries(s.colorSpace),i=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let t=x(s.image,!1,i.maxTextureSize);t=Me(s,t);let r=o.convert(s.format,s.colorSpace),p=o.convert(s.type),h=E(s.internalFormat,r,p,s.normalized,s.colorSpace,s.isVideoTexture);_e(l,s);let g,_=s.mipmaps,v=s.isVideoTexture!==!0,y=f.__version===void 0||u===!0,b=d.dataReady,w=k(s,t);if(s.isDepthTexture)h=O(s.format===A,s.type),y&&(v?n.texStorage2D(e.TEXTURE_2D,1,h,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,null));else if(s.isDataTexture){if(_.length>0){v&&y&&n.texStorage2D(e.TEXTURE_2D,w,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data);s.generateMipmaps=!1}else v?(y&&n.texStorage2D(e.TEXTURE_2D,w,h,t.width,t.height),b&&be(s,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,t.data)}else if(s.isCompressedTexture){if(s.isCompressedArrayTexture){v&&y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,h,_[0].width,_[0].height,t.depth);for(let i=0,o=_.length;i<o;i++)if(g=_[i],s.format!==1023){if(r!==null){if(v){if(b){if(s.layerUpdates.size>0){let t=fe(g.width,g.height,s.format,s.type);for(let a of s.layerUpdates){let o=g.data.subarray(a*t/g.data.BYTES_PER_ELEMENT,(a+1)*t/g.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,g.width,g.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,g.width,g.height,t.depth,r,g.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,h,g.width,g.height,t.depth,0,g.data,0,0)}else a(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?b&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,g.width,g.height,t.depth,r,p,g.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,h,g.width,g.height,t.depth,0,r,p,g.data);s.layerUpdates.size>0&&s.clearLayerUpdates()}else{v&&y&&n.texStorage2D(e.TEXTURE_2D,w,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],s.format===1023?v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data):r===null?a(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?b&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,g.data):n.compressedTexImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,g.data)}}else if(s.isDataArrayTexture){if(v){if(y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,h,t.width,t.height,t.depth),b){if(s.layerUpdates.size>0){let i=fe(t.width,t.height,s.format,s.type);for(let a of s.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}s.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,h,t.width,t.height,t.depth,0,r,p,t.data)}else if(s.isData3DTexture)v?(y&&n.texStorage3D(e.TEXTURE_3D,w,h,t.width,t.height,t.depth),b&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,h,t.width,t.height,t.depth,0,r,p,t.data);else if(s.isFramebufferTexture){if(y){if(v)n.texStorage2D(e.TEXTURE_2D,w,h,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<w;t++)n.texImage2D(e.TEXTURE_2D,t,h,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(s.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),m.add(s),n.onpaint=e=>{let t=e.changedElements;for(let e of m)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(v&&y){let t=Ne(_[0]);n.texStorage2D(e.TEXTURE_2D,w,h,t.width,t.height)}for(let t=0,i=_.length;t<i;t++)g=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,g):n.texImage2D(e.TEXTURE_2D,t,h,r,p,g);s.generateMipmaps=!1}else if(v){if(y){let r=Ne(t);n.texStorage2D(e.TEXTURE_2D,w,h,r.width,r.height)}b&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,h,r,p,t);S(s)&&s.mipmapsAutoUpdate===!0&&C(l),f.__version=d.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function G(t,s,c){if(s.image.length!==6)return;let l=ve(t,s),u=s.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+c);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+c);let t=T.getPrimaries(T.workingColorSpace),r=s.colorSpace===``?null:T.getPrimaries(s.colorSpace),f=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=s.isCompressedTexture||s.image[0].isCompressedTexture,m=s.image[0]&&s.image[0].isDataTexture,h=[];for(let e=0;e<6;e++)!p&&!m?h[e]=x(s.image[e],!0,i.maxCubemapSize):h[e]=m?s.image[e].image:s.image[e],h[e]=Me(s,h[e]);let g=h[0],_=o.convert(s.format,s.colorSpace),v=o.convert(s.type),y=E(s.internalFormat,_,v,s.normalized,s.colorSpace),b=s.isVideoTexture!==!0,w=d.__version===void 0||l===!0,D=u.dataReady,j=k(s,g);_e(e.TEXTURE_CUBE_MAP,s);let M;if(s.isDepthTexture){if(y=O(s.format===A,s.type),w){if(b)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,y,g.width,g.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,g.width,g.height,0,_,v,null)}}else if(p){b&&w&&n.texStorage2D(e.TEXTURE_CUBE_MAP,j,y,g.width,g.height);for(let t=0;t<6;t++){M=h[t].mipmaps;for(let r=0;r<M.length;r++){let i=M[r];s.format===1023?b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,_,v,i.data):_===null?a(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):b?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(M=s.mipmaps,b&&w){M.length>0&&j++;let t=Ne(h[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,j,y,t.width,t.height)}for(let t=0;t<6;t++)if(m){b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,h[t].width,h[t].height,_,v,h[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h[t].width,h[t].height,0,_,v,h[t].data);for(let r=0;r<M.length;r++){let i=M[r].image[t].image;b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,_,v,i.data)}}else{b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,v,h[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,_,v,h[t]);for(let r=0;r<M.length;r++){let i=M[r];b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,_,v,i.image[t])}}}S(s)&&s.mipmapsAutoUpdate===!0&&C(e.TEXTURE_CUBE_MAP),d.__version=u.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function K(t,i,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=E(a.internalFormat,d,f,a.normalized,a.colorSpace),m=r.get(i),h=r.get(a);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ae(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,h.__webglTexture,0,ke(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=O(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ae(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ke(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ke(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=E(a.internalFormat,s,l,a.normalized,a.colorSpace);Ae(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ke(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ke(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ce(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let s=r.get(i.depthTexture);s.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;s.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?pe(i.depthTexture,0):U(i.depthTexture,0);let u=s.__webglTexture,d=ke(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ae(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ae(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function q(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Ce(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Ce(i.__webglFramebuffer[0],t,0):Ce(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Se(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Se(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,i){let a=r.get(t);n!==void 0&&K(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&q(t)}function Te(t){let i=t.texture,a=r.get(t),c=r.get(i);t.addEventListener(`dispose`,F),j(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&Ae(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=E(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=ke(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),Se(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),_e(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)K(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else K(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);S(i)?C(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,o=l.length;i<o;i++){let o=l[i],s=r.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),_e(c,o),K(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,c,0),S(o)&&C(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),_e(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)K(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else K(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);S(i)?C(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&q(t)}function Ee(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(S(a)&&a.mipmapsAutoUpdate===!0){let t=w(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),C(t),n.unbindTexture()}}}let De=[];function Oe(t){if(t.samples>0){if(Ae(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),l===!0&&(De.length=0,De.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&De.push(c),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&l){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ke(e){return Math.min(i.maxSamples,e.samples)}function Ae(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function je(e){let t=s.render.frame;p.get(e)!==t&&(p.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(T.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&a(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):u(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ne(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(f.width=e.naturalWidth||e.width,f.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(f.width=e.displayWidth,f.height=e.displayHeight):(f.width=e.width,f.height=e.height),f}this.allocateTextureUnit=oe,this.resetTextureUnits=V,this.getTextureUnits=ie,this.setTextureUnits=ae,this.setTexture2D=U,this.setTexture2DArray=se,this.setTexture3D=de,this.setTextureCube=pe,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=K,this.useMultisampledRTT=Ae,this.dispose=I}function Ua(e,t){function n(n,r=``){let i,a=T.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Wa=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ga=`
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

}`,Ka=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new oe(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gt({vertexShader:Wa,fragmentShader:Ga,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new o(new S(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qa=class extends Se{constructor(e,t){super();let n=this,i=null,o=1,s=null,c=`local-floor`,u=1,d=null,f=null,p=null,m=null,h=null,g=null,_=typeof XRWebGLBinding<`u`,v=new Ka,y={},x=t.getContextAttributes(),S=null,C=null,w=[],T=[],E=new Y,D=null,O=null,k=new me;k.viewport=new He;let j=new me;j.viewport=new He;let M=[k,j],N=new l,ee=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=w[e];return t===void 0&&(t=new Lt,w[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=w[e];return t===void 0&&(t=new Lt,w[e]=t),t.getGripSpace()},this.getHand=function(e){let t=w[e];return t===void 0&&(t=new Lt,w[e]=t),t.getHandSpace()};function F(e){let t=T.indexOf(e.inputSource);if(t===-1)return;let n=w[t];n!==void 0&&(n.update(e.inputSource,e.frame,d||s),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){i.removeEventListener(`select`,F),i.removeEventListener(`selectstart`,F),i.removeEventListener(`selectend`,F),i.removeEventListener(`squeeze`,F),i.removeEventListener(`squeezestart`,F),i.removeEventListener(`squeezeend`,F),i.removeEventListener(`end`,te),i.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<w.length;e++){let t=T[e];t!==null&&(T[e]=null,w[e].disconnect(t))}ee=null,P=null,v.reset();for(let e in y)delete y[e];if(e.setRenderTarget(S),h=null,m=null,p=null,i=null,C=null,B.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(E.width,E.height,!1),O!==null){let e=O.camera;e.fov=O.fov,e.zoom=O.zoom,e.updateProjectionMatrix(),O=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){o=e,n.isPresenting===!0&&a(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){c=e,n.isPresenting===!0&&a(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return d||s},this.setReferenceSpace=function(e){d=e},this.getBaseLayer=function(){return m===null?h:m},this.getBinding=function(){return p===null&&_&&(p=new XRWebGLBinding(i,t)),p},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(a){if(i=a,i!==null){if(S=e.getRenderTarget(),i.addEventListener(`select`,F),i.addEventListener(`selectstart`,F),i.addEventListener(`selectend`,F),i.addEventListener(`squeeze`,F),i.addEventListener(`squeezestart`,F),i.addEventListener(`squeezeend`,F),i.addEventListener(`end`,te),i.addEventListener(`inputsourceschange`,ne),x.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(E),_&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,s=null;x.depth&&(s=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=x.stencil?A:b,a=x.stencil?je:Et);let c={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:o};p=this.getBinding(),m=p.createProjectionLayer(c),i.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),C=new kt(m.textureWidth,m.textureHeight,{format:r,type:ut,depthTexture:new ht(m.textureWidth,m.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}else{let n={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(i,t,n),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),C=new kt(h.framebufferWidth,h.framebufferHeight,{format:r,type:ut,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(u),d=null,s=await i.requestReferenceSpace(c),B.setContext(i),B.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=T.indexOf(n);r>=0&&(T[r]=null,w[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=T.indexOf(n);if(r===-1){for(let e=0;e<w.length;e++)if(e>=T.length){T.push(n),r=e;break}else if(T[e]===null){T[e]=n,r=e;break}if(r===-1)break}let i=w[r];i&&i.connect(n)}}function I(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(i===null)return;let t=e.near,n=e.far;v.texture!==null&&(v.depthNear>0&&(t=v.depthNear),v.depthFar>0&&(n=v.depthFar)),N.near=j.near=k.near=t,N.far=j.far=k.far=n,(ee!==N.near||P!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),ee=N.near,P=N.far),N.layers.mask=e.layers.mask|6,k.layers.mask=N.layers.mask&-5,j.layers.mask=N.layers.mask&-3;let r=e.parent,a=N.cameras;I(N,r);for(let e=0;e<a.length;e++)I(a[e],r);N.projectionMatrix.copy(k.projectionMatrix),N.projectionMatrixInverse.copy(k.projectionMatrixInverse),O===null&&e.isPerspectiveCamera&&(O={camera:e,fov:e.fov,zoom:e.zoom}),L(e,N,r)};function L(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=K*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(m!==null||h!==null)return u},this.setFoveation=function(e){u=e,m!==null&&(m.fixedFoveation=e),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=e)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(N)},this.getCameraTexture=function(e){return y[e]};let R=null;function z(t,r){if(f=r.getViewerPose(d||s),g=r,f!==null){let t=f.views;h!==null&&(e.setRenderTargetFramebuffer(C,h.framebuffer),e.setRenderTarget(C));let r=!1;t.length!==N.cameras.length&&(N.cameras.length=0,r=!0);for(let n=0;n<t.length;n++){let i=t[n],a=null;if(h!==null)a=h.getViewport(i);else{let t=p.getViewSubImage(m,i);a=t.viewport,n===0&&(e.setRenderTargetTextures(C,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(C))}let o=M[n];o===void 0&&(o=new me,o.layers.enable(n),o.viewport=new He,M[n]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(N.matrix.copy(o.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),r===!0&&N.cameras.push(o)}let a=i.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&i.depthUsage==`gpu-optimized`&&_){p=n.getBinding();let e=p.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&v.init(e,i.renderState)}if(a&&a.includes(`camera-access`)&&_){e.state.unbindTexture(),p=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=y[n];e||(e=new oe,y[n]=e);let t=p.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<w.length;e++){let t=T[e],n=w[e];t!==null&&n!==void 0&&n.update(t,r,d||s)}R&&R(t,r),r.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:r}),g=null}let B=new Gn;B.setAnimationLoop(z),this.setAnimationLoop=function(e){R=e},this.dispose=function(){}}},Ja=new tt,Ya=new V;Ya.set(-1,0,0,0,1,0,0,0,1);function Xa(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,g(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ja.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Ya),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Za(e,t,n,r){let i={},o={};function s(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function c(e,n){let a=i[e.id];a===void 0&&(h(e),a=l(e),i[e.id]=a,e.addEventListener(`dispose`,_));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;o[e.id]!==c&&(u(e),o[e.id]=c)}function l(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function u(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)d(t[n],e,n,a);else d(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(t,n,r,i){if(p(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=g(i,!0);f(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else f(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function f(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)m(i[n],e,n)===!0&&(t=!0);return t}return m(i,r,a)}function m(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function h(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=g(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function g(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?a(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):a(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function _(t){let n=t.target;n.removeEventListener(`dispose`,_),e.deleteBuffer(i[n.id]),delete i[n.id],delete o[n.id]}function v(){for(let t in i)e.deleteBuffer(i[t]);i={},o={}}return{bind:s,update:c,dispose:v}}var Qa=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$a=null;function eo(){return $a===null&&($a=new _e(Qa,16,16,i,St),$a.name=`DFG_LUT`,$a.minFilter=Ft,$a.magFilter=Ft,$a.wrapS=re,$a.wrapT=re,$a.generateMipmaps=!1,$a.needsUpdate=!0),$a}var to=class{constructor(e={}){let{canvas:t=Pt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:h=ut}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);g=n.getContextAttributes().alpha}else g=o;let _=h,y=new Set([Ie,Xe,E]),b=new Set([ut,Et,pt,je,Pe,Be]),x=new Uint32Array(4),S=new Int32Array(4),C={textures:[],min:[],max:[],resolution:[]},w=null,D=null,O=[],k=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,M=!1,N=null,ee=null,P=null,F=null;this._outputColorSpace=ve;let te=0,ne=0,I=null,L=-1,R=null,z=new He,B=new He,V=null,re=new v(0),ie=0,ae=t.width,oe=t.height,H=1,U=null,se=null,ce=new He(0,0,ae,oe),le=new He(0,0,ae,oe),de=!1,fe=new bt,W=new Je,pe=!1,me=!1,he=new tt,ge=new J,_e=new He,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},be=!1;function xe(){return I===null?H:1}let G=n;function K(e,n){return t.getContext(e,n)}let Se,Ce,q,Te,Ee,De,Oe,ke,Ae,Me,Ne,Fe,Le,Re,ze,Ve,Ue,We,Ge,Ke,qe,Ye,Ze;try{let e={alpha:!0,depth:r,stencil:i,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,nt,!1),t.addEventListener(`webglcontextrestored`,rt,!1),t.addEventListener(`webglcontextcreationerror`,it,!1),G===null){let t=`webgl2`;if(G=K(t,e),G===null)throw K(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Qe()}catch(e){throw t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),u(`WebGLRenderer: `+e.message),e}function Qe(){Se=new xr(G),Se.init(),qe=new Ua(G,Se),Ce=new tr(G,Se,e,qe),q=new Va(G,Se),Ce.reversedDepthBuffer&&m&&q.buffers.depth.setReversed(!0),ee=G.createFramebuffer(),P=G.createFramebuffer(),F=G.createFramebuffer(),Te=new wr(G),Ee=new xa,De=new Ha(G,Se,q,Ee,Ce,qe,Te),Oe=new br(j),ke=new Kn(G),Ye=new $n(G,ke),Ae=new Sr(G,ke,Te,Ye),Me=new Er(G,Ae,ke,Ye,Te),We=new Tr(G,Ce,De),ze=new nr(Ee),Ne=new ba(j,Oe,Se,Ce,Ye,ze),Fe=new Xa(j,Ee),Le=new Ta,Re=new Ma(Se),Ue=new Qn(j,Oe,q,Me,g,c),Ve=new Ba(j,Me,Ce),Ze=new Za(G,Te,Ce,q),Ge=new er(G,Se,Te),Ke=new Cr(G,Se,Te),Te.programs=Ne.programs,j.capabilities=Ce,j.extensions=Se,j.properties=Ee,j.renderLists=Le,j.shadowMap=Ve,j.state=q,j.info=Te}_!==1009&&(A=new Or(_,t.width,t.height,s,r,i));let $e=new qa(j,G);this.xr=$e,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(e){e!==void 0&&(H=e,this.setSize(ae,oe,!1))},this.getSize=function(e){return e.set(ae,oe)},this.setSize=function(e,n,r=!0){$e.isPresenting?a(`WebGLRenderer: Can't change size while VR device is presenting.`):(ae=e,oe=n,t.width=Math.floor(e*H),t.height=Math.floor(n*H),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ae*H,oe*H).floor()},this.setDrawingBufferSize=function(e,n,r){ae=e,oe=n,H=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(_===1009)u(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){a(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}A.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(z)},this.getViewport=function(e){return e.copy(ce)},this.setViewport=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),q.viewport(z.copy(ce).multiplyScalar(xe()).round())},this.getScissor=function(e){return e.copy(le)},this.setScissor=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),q.scissor(B.copy(le).multiplyScalar(xe()).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){q.setScissorTest(de=e)},this.setOpaqueSort=function(e){U=e},this.setTransparentSort=function(e){se=e},this.getClearColor=function(e){return e.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(I!==null){let t=I.texture.format;e=y.has(t)}if(e){let e=I.texture.type,t=b.has(e),n=Ue.getClearColor(),r=Ue.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(x[0]=i,x[1]=a,x[2]=o,x[3]=r,G.clearBufferuiv(G.COLOR,0,x)):(S[0]=i,S[1]=a,S[2]=o,S[3]=r,G.clearBufferiv(G.COLOR,0,S))}else r|=G.COLOR_BUFFER_BIT}t&&(r|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&G.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),Ue.dispose(),Le.dispose(),Re.dispose(),De.dispose(),Ee.dispose(),Oe.dispose(),Me.dispose(),Ae.dispose(),Ye.dispose(),Ze.dispose(),Ne.dispose(),$e.dispose(),$e.removeEventListener(`sessionstart`,dt),$e.removeEventListener(`sessionend`,ft),mt.stop()};function nt(e){e.preventDefault(),p(`WebGLRenderer: Context Lost.`),M=!0}function rt(){p(`WebGLRenderer: Context Restored.`),M=!1;let e=Te.autoReset,t=Ve.enabled,n=Ve.autoUpdate,r=Ve.needsUpdate,i=Ve.type;Qe(),Te.autoReset=e,Ve.enabled=t,Ve.autoUpdate=n,Ve.needsUpdate=r,Ve.type=i}function it(e){u(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Y(e){let t=e.target;t.removeEventListener(`dispose`,Y),at(t)}function at(e){ot(e),Ee.remove(e)}function ot(e){let t=Ee.get(e).programs;t!==void 0&&(t.forEach(function(e){Ne.releaseProgram(e)}),e.isShaderMaterial&&Ne.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ye);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);q.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ae.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ye.setup(i,r,s,n,c);let h,g=Ge;if(c!==null&&(h=ke.get(c),g=Ke,g.setIndex(h)),i.isMesh)r.wireframe===!0?(q.setLineWidth(r.wireframeLinewidth*xe()),g.setMode(G.LINES)):g.setMode(G.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),q.setLineWidth(e*xe()),i.isLineSegments?g.setMode(G.LINES):i.isLineLoop?g.setMode(G.LINE_LOOP):g.setMode(G.LINE_STRIP)}else i.isPoints?g.setMode(G.POINTS):i.isSprite&&g.setMode(G.TRIANGLES);if(i.isBatchedMesh){if(Se.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ke.get(c).bytesPerElement:1,o=Ee.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(G,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function st(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),pe===!0&&ze.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Ct(e,t,r),e.side=0,e.needsUpdate=!0,Ct(e,t,r),e.side=2):Ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),D=Re.get(n),D.init(t),k.push(D),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(D.pushLight(e),e.castShadow&&D.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(D.pushLight(e),e.castShadow&&D.pushShadow(e))}),D.setupLights(),N!==null&&N.updateLights(D.state.lightsArray),me=this.localClippingEnabled,pe=ze.init(this.clippingPlanes,me),pe===!0&&ze.setGlobalState(this.clippingPlanes,t),N!==null&&Ve.render(D.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];st(o,n,t,e),r.add(o)}else st(i,n,t,e),r.add(i)}}),D=k.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=Ee.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Se.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ct=null;function lt(e){ct&&ct(e)}function dt(){mt.stop()}function ft(){mt.start()}let mt=new Gn;mt.setAnimationLoop(lt),typeof self<`u`&&mt.setContext(self),this.setAnimationLoop=function(e){ct=e,$e.setAnimationLoop(e),e===null?mt.stop():mt.start()},$e.addEventListener(`sessionstart`,dt),$e.addEventListener(`sessionend`,ft),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){u(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(M===!0)return;N!==null&&N.renderStart(e,t);let n=$e.enabled===!0&&$e.isPresenting===!0,r=A!==null&&(I===null||n)&&A.begin(j,I);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),$e.enabled===!0&&$e.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&($e.cameraAutoUpdate===!0&&$e.updateCamera(t),t=$e.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,I),D=Re.get(e,k.length),D.init(t),D.state.textureUnits=De.getTextureUnits(),k.push(D),he.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?W.setFromArrayCamera(t):fe.setFromProjectionMatrix(he,we,t.reversedDepth),me=this.localClippingEnabled,pe=ze.init(this.clippingPlanes,me),w=Le.get(e,O.length),w.init(),O.push(w),this.info.render.frame++,$e.enabled===!0&&$e.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&ht(e,t,-1/0,j.sortObjects)}ht(e,t,0,j.sortObjects),w.finish(),N!==null&&N.updateLights(D.state.lightsArray),j.sortObjects===!0&&w.sort(U,se),be=$e.enabled===!1||$e.isPresenting===!1||$e.hasDepthSensing()===!1,be&&Ue.addToRenderList(w,e),this.info.autoReset===!0&&this.info.reset(),pe===!0&&ze.beginShadows();let i=D.state.shadowsArray;if(Ve.render(i,e,t),pe===!0&&ze.endShadows(),(r&&A.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(D.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];_t(n,r,e,a)}be&&Ue.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];gt(w,e,n,n.viewport)}}else r.length>0&&_t(n,r,e,t),be&&Ue.render(e),gt(w,e,t)}I!==null&&ne===0&&(De.updateMultisampleRenderTarget(I),De.updateRenderTargetMipmap(I)),r&&A.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),Ye.resetDefaultState(),L=-1,R=null,k.pop(),k.length>0?(D=k[k.length-1],De.setTextureUnits(D.state.textureUnits),pe===!0&&ze.setGlobalState(j.clippingPlanes,D.state.camera)):D=null,O.pop(),w=O.length>0?O[O.length-1]:null,N!==null&&N.renderEnd()};function ht(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)D.pushLight(e),e.castShadow&&D.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?W:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(he);let i=Me.update(e),a=e.material;a.visible&&w.push(e,i,a,n,_e.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?W:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Me.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),_e.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),_e.copy(e.boundingSphere.center)),_e.applyMatrix4(e.matrixWorld).applyMatrix4(he)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,_e.z,s,t)}}else a.visible&&w.push(e,i,a,n,_e.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ht(i[e],t,n,r)}function gt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;D.setupLightsView(n),pe===!0&&ze.setGlobalState(j.clippingPlanes,n),r&&q.viewport(z.copy(r)),i.length>0&&vt(i,t,n),a.length>0&&vt(a,t,n),o.length>0&&vt(o,t,n),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function _t(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[r.id]===void 0){let e=Se.has(`EXT_color_buffer_half_float`)||Se.has(`EXT_color_buffer_float`);D.state.transmissionRenderTarget[r.id]=new kt(1,1,{generateMipmaps:!0,type:e?St:ut,minFilter:ue,samples:Math.max(4,Ce.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:T.workingColorSpace})}let a=D.state.transmissionRenderTarget[r.id],o=r.viewport||z;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),l=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(re),ie=j.getClearAlpha(),ie<1&&j.setClearColor(16777215,.5),j.clear(),be&&Ue.render(n);let u=j.toneMapping;j.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),D.setupLightsView(r),pe===!0&&ze.setGlobalState(j.clippingPlanes,r),vt(e,n,r),De.updateMultisampleRenderTarget(a),De.updateRenderTargetMipmap(a),Se.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,yt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(De.updateMultisampleRenderTarget(a),De.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,l),j.setClearColor(re,ie),d!==void 0&&(r.viewport=d),j.toneMapping=u}function vt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&yt(o,t,n,s,l,c)}}function yt(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function xt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Ct(e,t,n){t.isScene!==!0&&(t=ye);let r=Ee.get(e),i=D.state.lights,a=D.state.shadowsArray,o=i.state.version,s=Ne.getParameters(e,i.state,a,t,n,D.state.lightProbeGridArray),c=Ne.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Oe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Y),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=Ne.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,j),d=Ne.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=ze.uniform),Dt(e,s),r.needsLights=jt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=xt(D.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function wt(e,t,n,r,i){let a=Ee.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Li.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=Ee.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=ye),De.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=I===null?j.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:T.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Oe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=Ee.get(r),y=D.state.lights;if(pe===!0&&(me===!0||e!==R)){let t=e===R&&r.id===L;ze.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==ze.numPlanes||v.numIntersection!==ze.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===xt(D.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;(b===!0||x===!0)&&(S=x===!0?wt(r,t,i,s,h):Ct(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,S,v));let w=!1,E=!1,O=!1,k=S.getUniforms(),A=v.uniforms;if(q.useProgram(S.program)&&(w=!0,E=!0,O=!0),r.id!==L&&(L=r.id,E=!0),w||R!==e){q.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),k.setValue(G,`projectionMatrix`,e.projectionMatrix),k.setValue(G,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(G,ge.setFromMatrixPosition(e.matrixWorld)),Ce.logarithmicDepthBuffer&&k.setValue(G,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(G,`isOrthographic`,e.isOrthographicCamera===!0),R!==e&&(R=e,E=!0,O=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&k.setValue(G,`sunShadowMap`,y.state.sunShadowMap,De),y.state.directionalShadowMap.length>0&&k.setValue(G,`directionalShadowMap`,y.state.directionalShadowMap,De),y.state.spotShadowMap.length>0&&k.setValue(G,`spotShadowMap`,y.state.spotShadowMap,De),y.state.pointShadowMap.length>0&&k.setValue(G,`pointShadowMap`,y.state.pointShadowMap,De)),i.isSkinnedMesh){k.setOptional(G,i,`bindMatrix`),k.setOptional(G,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(G,`boneTexture`,e.boneTexture,De))}i.isBatchedMesh&&(k.setOptional(G,i,`batchingTexture`),k.setValue(G,`batchingTexture`,i._matricesTexture,De),k.setOptional(G,i,`batchingIdTexture`),k.setValue(G,`batchingIdTexture`,i._indirectTexture,De),k.setOptional(G,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(G,`batchingColorTexture`,i._colorsTexture,De));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&We.update(i,n,S),(E||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,k.setValue(G,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(A.envMapIntensity.value=t.environmentIntensity),A.dfgLUT!==void 0&&(A.dfgLUT.value=eo()),E){if(k.setValue(G,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&At(A,O),a&&r.fog===!0&&Fe.refreshFogUniforms(A,a),Fe.refreshMaterialUniforms(A,r,H,oe,D.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=C,t=0;for(let n of D.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;A.probesSH.value=e.textures,A.probesMin.value=e.min,A.probesMax.value=e.max,A.probesResolution.value=e.resolution}Li.upload(G,Tt(v),A,De)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Li.upload(G,Tt(v),A,De),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(G,`center`,i.center),k.setValue(G,`modelViewMatrix`,i.modelViewMatrix),k.setValue(G,`normalMatrix`,i.normalMatrix),k.setValue(G,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ze.update(n,S),Ze.bind(n,S)}}return S}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function jt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return ne},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(e,t,n){let r=Ee.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),Ee.get(e.texture).__webglTexture=t,Ee.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=Ee.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){I=e,te=t,ne=n;let r=null,i=!1,a=!1;if(e){let o=Ee.get(e);if(o.__useDefaultFramebuffer!==void 0){q.bindFramebuffer(G.FRAMEBUFFER,o.__webglFramebuffer),z.copy(e.viewport),B.copy(e.scissor),V=e.scissorTest,q.viewport(z),q.scissor(B),q.setScissorTest(V),L=-1;return}if(o.__webglFramebuffer===void 0)De.setupRenderTarget(e);else if(o.__hasExternalTextures)De.rebindTextures(e,Ee.get(e.texture).__webglTexture,Ee.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&Ee.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);De.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=Ee.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&De.useMultisampledRTT(e)===!1?Ee.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,z.copy(e.viewport),B.copy(e.scissor),V=e.scissorTest}else z.copy(ce).multiplyScalar(H).floor(),B.copy(le).multiplyScalar(H).floor(),V=de;if(n!==0&&(r=ee),q.bindFramebuffer(G.FRAMEBUFFER,r)&&q.drawBuffers(e,r),q.viewport(z),q.scissor(B),q.setScissorTest(V),i){let r=Ee.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=Ee.get(e.textures[t]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=Ee.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,t.__webglTexture,n)}L=-1};function Mt(e){let t=Ee.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ce.textureFormatReadable(e.format),t.__typeReadable=Ce.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){u(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=Ee.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){q.bindFramebuffer(G.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1){u(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(d.__typeReadable===!1){u(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&G.readPixels(t,n,r,i,qe.convert(c),qe.convert(l),a)}finally{let e=I===null?null:Ee.get(I).__webglFramebuffer;q.bindFramebuffer(G.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=Ee.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){q.bindFramebuffer(G.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.bufferData(G.PIXEL_PACK_BUFFER,a.byteLength,G.STREAM_READ),G.readPixels(t,n,r,i,qe.convert(l),qe.convert(u),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let p=I===null?null:Ee.get(I).__webglFramebuffer;q.bindFramebuffer(G.FRAMEBUFFER,p);let m=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await et(G,m,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,a),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(f),G.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;De.setTexture2D(e,0),G.copyTexSubImage2D(G.TEXTURE_2D,n,0,0,o,s,i,a),q.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=qe.convert(t.format),_=qe.convert(t.type),v;t.isData3DTexture?(De.setTexture3D(t,0),v=G.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(De.setTexture2DArray(t,0),v=G.TEXTURE_2D_ARRAY):(De.setTexture2D(t,0),v=G.TEXTURE_2D),q.activeTexture(G.TEXTURE0),q.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,t.flipY),q.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),q.pixelStorei(G.UNPACK_ALIGNMENT,t.unpackAlignment);let y=q.getParameter(G.UNPACK_ROW_LENGTH),b=q.getParameter(G.UNPACK_IMAGE_HEIGHT),x=q.getParameter(G.UNPACK_SKIP_PIXELS),S=q.getParameter(G.UNPACK_SKIP_ROWS),C=q.getParameter(G.UNPACK_SKIP_IMAGES);q.pixelStorei(G.UNPACK_ROW_LENGTH,h.width),q.pixelStorei(G.UNPACK_IMAGE_HEIGHT,h.height),q.pixelStorei(G.UNPACK_SKIP_PIXELS,l),q.pixelStorei(G.UNPACK_SKIP_ROWS,u),q.pixelStorei(G.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=Ee.get(e),r=Ee.get(t),h=Ee.get(n.__renderTarget),g=Ee.get(r.__renderTarget);q.bindFramebuffer(G.READ_FRAMEBUFFER,h.__webglFramebuffer),q.bindFramebuffer(G.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ee.get(e).__webglTexture,i,d+n),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ee.get(t).__webglTexture,a,m+n)),G.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,G.DEPTH_BUFFER_BIT,G.NEAREST);q.bindFramebuffer(G.READ_FRAMEBUFFER,null),q.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||Ee.has(e)){let n=Ee.get(e),r=Ee.get(t);q.bindFramebuffer(G.READ_FRAMEBUFFER,P),q.bindFramebuffer(G.DRAW_FRAMEBUFFER,F);for(let e=0;e<c;e++)w?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,n.__webglTexture,i),T?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,r.__webglTexture,a),i===0?T?G.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):G.copyTexSubImage2D(v,a,f,p,l,u,o,s):G.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,G.COLOR_BUFFER_BIT,G.NEAREST);q.bindFramebuffer(G.READ_FRAMEBUFFER,null),q.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?G.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h);q.pixelStorei(G.UNPACK_ROW_LENGTH,y),q.pixelStorei(G.UNPACK_IMAGE_HEIGHT,b),q.pixelStorei(G.UNPACK_SKIP_PIXELS,x),q.pixelStorei(G.UNPACK_SKIP_ROWS,S),q.pixelStorei(G.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&G.generateMipmap(v),q.unbindTexture()},this.initRenderTarget=function(e){Ee.get(e).__webglFramebuffer===void 0&&De.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?De.setTextureCube(e,0):e.isData3DTexture?De.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?De.setTexture2DArray(e,0):De.setTexture2D(e,0),q.unbindTexture()},this.resetState=function(){te=0,ne=0,I=null,q.reset(),Ye.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return we}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=T._getDrawingBufferColorSpace(e),t.unpackColorSpace=T._getUnpackColorSpace()}},no={type:`change`},ro={type:`start`},io={type:`end`},ao=new L,oo=new ye,so=Math.cos(70*m.DEG2RAD),co=new J,lo=2*Math.PI,uo={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},fo=1e-6,po=class extends N{constructor(e,t=null){super(e,t),this.state=uo.NONE,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:_.ROTATE,MIDDLE:_.DOLLY,RIGHT:_.PAN},this.touches={ONE:Le.ROTATE,TWO:Le.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new _t,this._lastTargetPosition=new J,this._quat=new _t().setFromUnitVectors(e.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new n,this._sphericalDelta=new n,this._scale=1,this._panOffset=new J,this._rotateStart=new Y,this._rotateEnd=new Y,this._rotateDelta=new Y,this._panStart=new Y,this._panEnd=new Y,this._panDelta=new Y,this._dollyStart=new Y,this._dollyEnd=new Y,this._dollyDelta=new Y,this._dollyDirection=new J,this._mouse=new Y,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ho.bind(this),this._onPointerDown=mo.bind(this),this._onPointerUp=go.bind(this),this._onContextMenu=Co.bind(this),this._onMouseWheel=yo.bind(this),this._onKeyDown=bo.bind(this),this._onTouchStart=xo.bind(this),this._onTouchMove=So.bind(this),this._onMouseDown=_o.bind(this),this._onMouseMove=vo.bind(this),this._interceptControlDown=wo.bind(this),this._interceptControlUp=To.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=uo.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(no),this.update(),this.state=uo.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;co.copy(t).sub(this.target),co.applyQuaternion(this._quat),this._spherical.setFromVector3(co),this.autoRotate&&this.state===uo.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=lo:n>Math.PI&&(n-=lo),r<-Math.PI?r+=lo:r>Math.PI&&(r-=lo),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(co.setFromSpherical(this._spherical),co.applyQuaternion(this._quatInverse),t.copy(this.target).add(co),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=co.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new J(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new J(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=co.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(ao.origin.copy(this.object.position),ao.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ao.direction))<so?this.object.lookAt(this.target):(oo.setFromNormalAndCoplanarPoint(this.object.up,this.target),ao.intersectPlane(oo,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>fo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>fo||this._lastTargetPosition.distanceToSquared(this.target)>fo?(this.dispatchEvent(no),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?lo/60/60*this.autoRotateSpeed:lo/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){co.setFromMatrixColumn(t,0),co.multiplyScalar(-e),this._panOffset.add(co)}_panUp(e,t){this.screenSpacePanning===!0?co.setFromMatrixColumn(t,1):(co.setFromMatrixColumn(t,0),co.crossVectors(this.object.up,co)),co.multiplyScalar(e),this._panOffset.add(co)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;co.copy(r).sub(this.target);let i=co.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(lo*this._rotateDelta.x/t.clientHeight),this._rotateUp(lo*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(lo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-lo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(lo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-lo*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(lo*this._rotateDelta.x/t.clientHeight),this._rotateUp(lo*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Y,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function mo(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),this._isTrackingPointer(e)||(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function ho(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function go(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(io),this.state=uo.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function _o(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case _.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=uo.DOLLY;break;case _.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=uo.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=uo.ROTATE}break;case _.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=uo.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=uo.PAN}break;default:this.state=uo.NONE}this.state!==uo.NONE&&this.dispatchEvent(ro)}function vo(e){switch(this.state){case uo.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case uo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case uo.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function yo(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===uo.NONE&&(e.preventDefault(),this.dispatchEvent(ro),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(io))}function bo(e){this.enabled!==!1&&this._handleKeyDown(e)}function xo(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Le.ROTATE:if(this.enableRotate===!1){this.state=uo.NONE;break}this._handleTouchStartRotate(e),this.state=uo.TOUCH_ROTATE;break;case Le.PAN:if(this.enablePan===!1){this.state=uo.NONE;break}this._handleTouchStartPan(e),this.state=uo.TOUCH_PAN;break;default:this.state=uo.NONE}break;case 2:switch(this.touches.TWO){case Le.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=uo.TOUCH_DOLLY_PAN;break;case Le.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=uo.TOUCH_DOLLY_ROTATE;break;default:this.state=uo.NONE}break;default:this.state=uo.NONE}this.state!==uo.NONE&&this.dispatchEvent(ro)}function So(e){switch(this._trackPointer(e),this.state){case uo.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case uo.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case uo.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case uo.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=uo.NONE}}function Co(e){this.enabled!==!1&&e.preventDefault()}function wo(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function To(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Eo=Object.freeze({min:.38,max:9,default:1,mapEnter:.68,mapExit:.82,closeEnter:2.4,closeExit:2,follow:3.2,followExit:2,mapBlendStart:1,mapBlendEnd:.78,detailPrefetch:.35}),Do=Eo.follow;function Oo(e,t=Eo.default){let n=typeof t==`number`&&Number.isFinite(t)?t:Eo.default,r=typeof e==`number`&&!Number.isNaN(e)?e:n;return Math.max(Eo.min,Math.min(Eo.max,r))}function ko(e,t=`world`){let n=Oo(e);return t===`map`&&n<Eo.mapExit?`map`:t===`close`&&n>Eo.closeExit?`close`:n<=Eo.mapEnter?`map`:n>=Eo.closeEnter?`close`:`world`}function Ao(e){let t=Oo(e),n=Math.max(0,Math.min(1,(Eo.mapBlendStart-t)/(Eo.mapBlendStart-Eo.mapBlendEnd)));return n*n*(3-2*n)}function jo(e){return Oo(e)<Eo.followExit}function Mo({viewWidth:e,viewHeight:t,spanWidth:n,spanHeight:r,padding:i=.15,fallback:a=Do}={}){if(![e,t,n,r].every(e=>typeof e==`number`&&Number.isFinite(e)&&e>0))return Oo(a);let o=1+2*(typeof i==`number`&&Number.isFinite(i)?Math.max(0,i):.15);return Oo(Math.min(e/(n*o),t/(r*o)),a)}function No(e,t,n,r=!1){if(r)return t;let i=Math.max(0,Number.isFinite(n)?n:0);if(!i||e===t)return e;let a=Math.log(e),o=Math.log(t),s=Math.abs(o-a),c=1.8,l=c/14,u=Math.max(0,(s-l)/c),d=i<=u?c*i:s-Math.min(s,l)*Math.exp(-14*(i-u)),f=Math.exp(a+Math.sign(o-a)*d);return Math.abs(f-t)<1e-6?t:f}var Po=Object.freeze({railCore:3,cityReferenceRadius:16.5,trainWidth:6,trainLength:15}),Fo=5.5,Io=e=>(1.75+Math.max(1,Math.min(10,Math.round(Number(e)||1)))*.12)*Po.cityReferenceRadius/2.5;function Lo(e=1){let t=Math.max(0,Math.min(1,(e-.5)/.3));return t*t*(3-2*t)}function Ro(e,t){let n=e.onBeforeCompile,r=e.customProgramCacheKey();return e.onBeforeCompile=(r,i)=>{n.call(e,r,i),r.uniforms.mapNetworkVisibility=t,r.fragmentShader=`uniform float mapNetworkVisibility;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (mapNetworkVisibility < 1.0) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (mapNetworkVisibility <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`${r}|map-network-visibility-v1`,e}function zo(e,t){let n=Math.max(0,Math.min(1,(t-.6)/.6)),r=n*n*(3-2*n),i=new Map,a=new Map,o=Math.max(1,...e.map(e=>e.radius*2+2.5));for(let t of e){if(!t.visible||r===0){a.set(t.id,1);continue}let e=Math.floor(t.x/o),n=Math.floor(t.y/o),s=(t.previous??1)>.5?1:2.5,c=!1;for(let r=-1;r<=1&&!c;r++)for(let a=-1;a<=1&&!c;a++)for(let o of i.get(`${e+r}:${n+a}`)??[])if(Math.hypot(t.x-o.x,t.y-o.y)<t.radius+o.radius+s){c=!0;break}if(a.set(t.id,c?1-r:1),!c){let r=`${e}:${n}`;i.has(r)||i.set(r,[]),i.get(r).push(t)}}return a}function Bo(e,t=1,n=1){return e>0?{routeScale:e*Po.railCore/.42,cityScale:e*Po.cityReferenceRadius/(2.5*t),trainScaleX:Math.max(1,e*Po.trainWidth/(1.22*n)),trainScaleZ:Math.max(1,e*Po.trainLength/2.45)}:{routeScale:1,cityScale:1,trainScaleX:1,trainScaleZ:1}}var Vo=(e,t,n)=>n?1:1-Math.exp(-e*t),Ho=e=>e.parts[Math.floor(e.parts.length/2)],Uo=1.968,Wo=.48,Go=Math.PI/4,Ko=85*Math.PI/180,qo=(e,t)=>m.euclideanModulo(e+Math.PI*t,2*Math.PI*t)-Math.PI*t;function Jo({canvas:e,camera:t,scene:r,mapScene:i,reducedMotion:a,getTrains:s,getWorldRoot:c,getWorld:l=()=>null,onPause:u,onRegenerate:d,isDetailReady:f=()=>!0}){let p=t.clone(),h=t.clone(),g=t.clone(),v=t.clone(),y=t.clone(),b=t.clone(),x=t.clone(),S=new J(0,1.3,0),C=0,w=[v,b],T=new po(p,e);Object.assign(T,{enableDamping:!0,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,minZoom:Eo.min,maxZoom:Eo.max,minPolarAngle:Go,maxPolarAngle:Go}),T.target.set(0,1.3,0),T.update();let E=`world`,D=0,O=null,k=null,A=null,j=!0,M=1,N=new J,ee=new J,P=null,F=null,te=!1,ne=0,I=null,L=new Set,R=new Set,z=new ie;z.firstHitOnly=!0;let B=[],V=new J,re=new Y,ae=new J,oe=new n,H=new J,U=new J,se=new tt,ce=new J,le=new J,ue=new J,de=new J,fe=new J,W=new J,pe=new J,me=new J,he=new Y,ge=new Y,_e=new Y,ve={x:0,z:0},ye=new J,be=new J,xe=new WeakMap,G={},K=new Bt(.94,1,64);K.rotateX(-Math.PI/2);let Se=new Qe({color:X.trim,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!0,side:2}),Ce=new o(K,Se),q=new o(K,Se.clone());q.material.toneMapped=!1,Ce.visible=q.visible=!1,r.add(Ce),i.add(q),Ce.renderOrder=3,q.renderOrder=10;function we(){let e=l(),t=Tt(e);if(!t)return;if(t.complete){U.set(qo(T.target.x,t.radius)-T.target.x,0,m.clamp(T.target.z,-t.radius*Ko,t.radius*Ko)-T.target.z),T.target.add(U),p.position.add(U);return}let n=xe.get(e);if(!n){if(e.outline?.length){let t=e.outline.map(e=>e[0]),r=e.outline.map(e=>e[1]);n={left:Math.min(...t),right:Math.max(...t),top:Math.min(...r),bottom:Math.max(...r)}}else if(e.bounds)n={left:-e.bounds.width/2,right:e.bounds.width/2,top:-e.bounds.depth/2,bottom:e.bounds.depth/2};else return;let t=Math.max(8,Math.min(n.right-n.left,n.bottom-n.top)*.05);n.left-=t,n.right+=t,n.top-=t,n.bottom+=t,xe.set(e,n)}U.set(m.clamp(T.target.x,n.left,n.right)-T.target.x,0,m.clamp(T.target.z,n.top,n.bottom)-T.target.z),T.target.add(U),p.position.add(U)}function Te(e,t,n=p,r=T.target){e.copy(n),oe.setFromVector3(ae.copy(n.position).sub(r));let i=Tt(l());return oe.phi=m.lerp(Go,i&&!i.complete?Wo:1e-5,t),e.position.copy(r).add(ae.setFromSpherical(oe)),e.lookAt(r),e.updateMatrixWorld(!0),e}function Ee(e,t,n=T.target){e.copy(t);let r=l();return Tt(r)&&(Ne(r,n.x,n.z,se),Ve(r,n.x,n.y,n.z,ce),le.copy(t.position).sub(n).applyMatrix4(se),e.position.copy(ce).add(le),e.up.copy(t.up).transformDirection(se),e.lookAt(ce)),e.updateMatrixWorld(!0),e}function De(){Te(h,D,x,S),Ee(t,h,S),c()?.scale.set(1,Tt(l())?1:1-D*.985,1)}function Oe(){let e=T.enableDamping,t=p.zoom;ye.copy(p.position),be.copy(T.target),T.enableDamping=!1,T.update(),p.position.copy(ye),T.target.copy(be),p.zoom=t,p.updateProjectionMatrix(),T.update(),T.enableDamping=e}function ke(){O=null,A=null}let Ae=e=>Math.max(Eo.min,Math.min(Eo.max*M,e));function je(){return M*Math.max(Eo.follow,Mo({viewWidth:(p.right-p.left)/M,viewHeight:(p.top-p.bottom)/M,spanWidth:40,spanHeight:32,padding:.1}))}function Me(e){e?.state.active&&(qe(),Oe(),O=e,k=null,A=je(),a.matches&&(p.zoom=A,p.updateProjectionMatrix(),A=null))}function Pe(){ke(),qe(),k=null,Oe(),p.position.copy(N),T.target.copy(ee),p.zoom=1,p.updateProjectionMatrix(),T.update(),we(),x.copy(p),S.copy(T.target),x.updateProjectionMatrix(),D=Ao(x.zoom/M),E=ko(x.zoom/M),Ce.visible=q.visible=!1,Ue(),De(),Fe()}function Fe(){let t={view:E,following:O?.state.id??``,zoom:x.zoom.toFixed(3),requestedZoom:p.zoom.toFixed(3),detailLoading:String(D<1&&!f()),mapBlend:D.toFixed(3)};for(let n in t)G[n]!==t[n]&&(e.dataset[n]=G[n]=t[n])}function Ie(e,n=Ho(e),r=V){let i=l(),a=n.position;return Tt(i)?Ve(i,a.x,D>.7?Uo:a.y+.8,a.z,r):(r.copy(a),r.y=D>.7?.3:(a.y+.8)*(c()?.scale.y??1)),r.project(t)}function Re(e,n){if(!e.state.active||D>.7&&Lo(t.zoom)===0)return!1;if(!n)return e.parts.some(t=>Re(e,t));if(!n.visible)return!1;let r=Ie(e,n);if(Math.abs(r.x)>1.05||Math.abs(r.y)>1.05||r.z<-1||r.z>1||Tt(l())&&(it(l(),n.position.x,n.position.z,ue),ue.dot(t.getWorldDirection(de))>=0))return!1;if(D>.7)return!0;z.setFromCamera(re.set(r.x,r.y),t),B.length=0,c()?.traverseVisible(e=>{e.isMesh&&(!e.isInstancedMesh||e.count>0)&&B.push(e)});let i=z.intersectObjects(B,!1)[0];if(i?.object.userData.instanceTrainIds?.[i.instanceId]===e.state.id)return!0;let a=i?.object;for(;a;){if(a.userData.trainId===e.state.id)return!0;a=a.parent}return!1}function ze(n,r,i=!1){let a=e.getBoundingClientRect(),o=i?28:17,l=[];c()?.updateMatrixWorld(!0),t.updateMatrixWorld(!0);for(let e of s())if(e.state.active)for(let t of e.parts){let i=Ie(e,t);if(i.z<-1||i.z>1)continue;let s=Math.hypot((i.x+1)*a.width/2+a.left-n,(1-i.y)*a.height/2+a.top-r);s<o&&l.push({train:e,part:t,d:s})}l.sort((e,t)=>e.d-t.d);for(let e of l)if(Re(e.train,e.part))return e.train;return null}function Be(){let e=[];for(let t of s()){if(!t.state.active)continue;let n=Ie(t);Math.abs(n.x)<=1.05&&Math.abs(n.y)<=1.05&&n.z>=-1&&n.z<=1&&e.push({train:t,d:n.x*n.x+n.y*n.y})}e.sort((e,t)=>e.d-t.d);for(let t of e)if(Re(t.train))return t.train}function He(e){let t=s().filter(e=>e.state.active);if(!t.length)return;let n=t.indexOf(O);Me(t[n<0?e>0?0:t.length-1:(n+e+t.length)%t.length])}function Ue(){let e=D===1&&E===`map`;I!==null&&e!==I&&Oe(),I=e,T.enabled=j,T.enableRotate=!e,T.enablePan=e&&!O,T.screenSpacePanning=!1,T.mouseButtons.LEFT=e?_.PAN:_.ROTATE,T.touches.ONE=e?Le.PAN:Le.ROTATE,T.touches.TWO=e?Le.DOLLY_PAN:Le.DOLLY_ROTATE}function Ge(e,t,n){if(!e&&!t)return;ke();let r=Tt(l()),i=Math.max(p.right-p.left,p.top-p.bottom)/x.zoom,a=n??(r?.complete?Math.min(r.radius*.95,i*.3):i*.3);if(pe.set(1,0,0).applyQuaternion(h.quaternion),pe.y=0,pe.normalize(),me.set(0,1,0).applyQuaternion(h.quaternion),me.y=0,me.normalize(),U.copy(pe).multiplyScalar(e*a).addScaledVector(me,-t*a),r?.complete&&r.projection.type===`equirectangular`){let e=r.projection,t=e.centralLatitude*Math.PI/180-T.target.z/e.radius,n=r.radius+T.target.y,i=m.clamp(t-U.z/n,-Ko,Ko),a=i-t,o=Math.log(Math.tan(Math.PI/4+i/2)/Math.tan(Math.PI/4+t/2)),s=Math.abs(a)>1e-9?a/o:Math.cos(t);U.x*=e.radius/(n*s),U.z=-a*e.radius}else r&&(We(l(),T.target.x,T.target.z,U.x,U.z,ve),U.set(ve.x-T.target.x,0,ve.z-T.target.z));T.target.add(U),p.position.add(U),we()}function Ke(e){if(ge.set(Number(R.has(`d`))-Number(R.has(`a`)),Number(R.has(`s`))-Number(R.has(`w`))),ge.lengthSq()>1&&ge.normalize(),a.matches)he.copy(ge),_e.copy(ge).multiplyScalar(e);else{let t=ge.lengthSq()?10:14,n=Math.exp(-t*e);_e.copy(he).sub(ge).multiplyScalar((1-n)/t).addScaledVector(ge,e),he.sub(ge).multiplyScalar(n).add(ge),!ge.lengthSq()&&he.lengthSq()<1e-24&&he.set(0,0)}Ge(_e.x,_e.y)}function qe(){R.clear(),he.set(0,0),_e.set(0,0)}function Je(e){R.delete(e.key.toLowerCase())}e.addEventListener(`keyup`,Je),window.addEventListener(`keyup`,Je),e.addEventListener(`blur`,qe),window.addEventListener(`blur`,qe),e.ownerDocument.addEventListener(`visibilitychange`,()=>{e.ownerDocument.hidden&&qe()}),e.addEventListener(`pointerdown`,e=>{j&&(L.add(e.pointerId),L.size>1&&(te=!0,F=null),e.button===0&&L.size===1&&(F={id:e.pointerId,x:e.clientX,y:e.clientY,moved:!1,touch:e.pointerType===`touch`},te=!1),A=null)},{capture:!0}),e.addEventListener(`pointermove`,e=>{j&&(F?.id===e.pointerId&&Math.hypot(e.clientX-F.x,e.clientY-F.y)>6&&(F.moved=!0),P={x:e.clientX,y:e.clientY,touch:e.pointerType===`touch`})});function Ye(e){if(!j)return;let t=F?.id===e.pointerId&&!F.moved&&!te&&e.type===`pointerup`&&Math.hypot(e.clientX-F.x,e.clientY-F.y)<=6,n=F;if(L.delete(e.pointerId),t){let t=ze(e.clientX,e.clientY,n.touch);t?Me(t):ke()}L.size||(F=null,te=!1)}window.addEventListener(`pointerup`,Ye),window.addEventListener(`pointercancel`,Ye),e.addEventListener(`pointerleave`,()=>{k=null,P=null,e.style.cursor=O?`default`:`grab`}),e.addEventListener(`wheel`,()=>{A=null},{passive:!0}),e.addEventListener(`dblclick`,()=>{j&&Pe()}),e.addEventListener(`keydown`,e=>{if(!j||e.altKey||e.metaKey||e.ctrlKey)return;let t=!0,r=e.key.toLowerCase();if([`w`,`a`,`s`,`d`].includes(r))R.has(r)||(R.add(r),ke(),Oe());else if(e.key===` `)u();else if(e.key===`Home`)Pe();else if(e.key===`Escape`)ke();else if(e.key.toLowerCase()===`r`)d();else if(e.key.toLowerCase()===`f`)Me(Be());else if(e.key===`[`)He(-1);else if(e.key===`]`)He(1);else if([`+`,`=`,`-`,`_`].includes(e.key))A=null,p.zoom=Ae(p.zoom*(e.key===`+`||e.key===`=`?1.16:1/1.16)),p.updateProjectionMatrix();else if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)){if(Oe(),E===`world`&&!O&&(e.key===`ArrowLeft`||e.key===`ArrowRight`)){let t=p.position.clone().sub(T.target),r=new n().setFromVector3(t);e.key===`ArrowLeft`&&(r.theta-=.08),e.key===`ArrowRight`&&(r.theta+=.08),p.position.copy(T.target).add(new J().setFromSpherical(r))}else Ge(Number(e.key===`ArrowRight`)-Number(e.key===`ArrowLeft`),Number(e.key===`ArrowDown`)-Number(e.key===`ArrowUp`),(p.top-p.bottom)/x.zoom*.045);T.update(),we()}else t=!1;t&&e.preventDefault()});function Xe(e){if(j){if(C=e,A!==null&&(p.zoom=m.lerp(p.zoom,A,Vo(7,e,a.matches)),Math.abs(p.zoom-A)<.002&&(p.zoom=A,A=null),p.updateProjectionMatrix()),O&&(!O.state.active||A===null&&jo(p.zoom/M))&&(O=null),Ke(Math.min(.1,Math.max(0,e))),Ue(),T.update(),O){H.copy(Ho(O).position),H.y=.75;let t=Tt(l());t?.complete&&(H.x=T.target.x+qo(H.x-T.target.x,t.radius)),U.copy(T.target).lerp(H,Vo(7,e,a.matches)).sub(T.target),T.target.add(U),p.position.add(U)}we()}}function Ze(e){return No(x.zoom,p.zoom,e,a.matches)}function $e(n){if(!j)return;let r=Ze(n);x.copy(p),S.copy(T.target),x.zoom=r,x.updateProjectionMatrix(),D=Ao(x.zoom/M),E=ko(x.zoom/M,E),Ue(),De(),ne+=n,ne>.12&&P&&!P.touch&&!L.size&&!O&&(ne=0,k=ze(P.x,P.y),e.style.cursor=k?`pointer`:`grab`);let i=O??k;if(Ce.visible=q.visible=!!i?.state.active,q.visible&&=Lo(t.zoom)>0,i){let e=Ho(i);for(let n of[Ce,q]){let r=l(),a=n===Ce?.045:Tt(r)?1.6:.6;Tt(r)?(Ve(r,e.position.x,a,e.position.z,n.position),it(r,e.position.x,e.position.z,ue),Ot(r,e.position.x,a,e.position.z,Math.sin(e.rotation.y),0,Math.cos(e.rotation.y),fe).normalize(),W.crossVectors(ue,fe).normalize(),se.makeBasis(W,ue,fe),n.quaternion.setFromRotationMatrix(se)):(n.position.set(e.position.x,a,e.position.z),n.rotation.set(0,e.rotation.y,0)),n.scale.set(1.35,1,4.65),n.material.opacity=O?.state.id===i.state.id?.95:.48,n===q&&(n.material.opacity*=Lo(t.zoom))}}Fe()}return{navigation:p,chartCamera:h,controls:T,reset:Pe,updateNavigation:Xe,updatePresentation:$e,setInputEnabled(e){qe(),ke(),k=null,P=null,F=null,L.clear(),Oe(),j=!!e,T.enabled=j,Ce.visible=q.visible=!1},overlook(e,{heading:t,zoom:n}={}){qe(),ke(),Oe(),U.set(e.x-T.target.x,(e.y??0)+1.3-T.target.y,e.z-T.target.z),p.position.add(U),T.target.add(U),Number.isFinite(t)&&(oe.setFromVector3(ae.copy(p.position).sub(T.target)),oe.theta=t+Math.PI,oe.phi=Go,p.position.copy(T.target).add(ae.setFromSpherical(oe))),p.zoom=Number.isFinite(n)?Ae(n):Math.min(p.zoom,M),p.updateProjectionMatrix(),T.update(),we(),x.copy(p),S.copy(T.target),D=Ao(x.zoom/M),E=ko(x.zoom/M),Ue(),De(),Fe()},update(e){Xe(e),$e(e)},get coverageCamera(){return Te(g,0),g.zoom=Math.max(Eo.mapBlendEnd*M,x.zoom),g.updateProjectionMatrix(),Ee(v,g)},get coverageCameras(){this.coverageCamera;let e=Eo.mapBlendEnd*M,t=Ze(C);return t<e?(b.copy(v),w):(Te(y,Ao(t/M)),y.zoom=t,y.updateProjectionMatrix(),Ee(b,y),w)},setScale(e){M=Math.max(1,Number(e)||1),T.maxZoom=Eo.max*M},get zoomScale(){return M},get wantsDetail(){return p.zoom/M>Eo.detailPrefetch||D<1||O!==null},get waitingForDetail(){return!1},get renderTarget(){return S},setHome(){N.copy(p.position),ee.copy(T.target),Pe()},get mode(){return E},get blend(){return D},get selected(){return O?.state.id??null}}}function Yo(e,t){return e.onBeforeCompile=e=>{e.uniforms.detailReveal=t,e.fragmentShader=`uniform float detailReveal;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (detailReveal < 0.9999) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (detailReveal <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`streamed-detail-reveal-v1`,e}function Xo(e){return Yo(new ne({depthPacking:jt,side:1}),e)}function Zo(e){let t={type:St,depthBuffer:!0,samples:2},n=new kt(1,1,t),r=new kt(1,1,t),i=new gt({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{worldTexture:{value:n.texture},mapTexture:{value:r.texture},blend:{value:0},toneMappingExposure:{value:e.toneMappingExposure}},vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,fragmentShader:`varying vec2 vUv;
      uniform sampler2D worldTexture;
      uniform sampler2D mapTexture;
      uniform float blend;
      #include <tonemapping_pars_fragment>
      void main(){
        vec3 worldColor=ACESFilmicToneMapping(texture2D(worldTexture,vUv).rgb);
        vec3 mapColor=texture2D(mapTexture,vUv).rgb;
        gl_FragColor=vec4(mix(worldColor,mapColor,blend),1.0);
        #include <colorspace_fragment>
      }`}),a=new j,s=new o(new S(2,2),i);s.frustumCulled=!1,a.add(s);let c=new Ye,l,u=!1;function d(){if(l)return l;let e=new $e;e.setAttribute(`position`,new Re([0,0,0,1,0,0,0,0,1],3)),e.setAttribute(`normal`,new Re([0,1,0,0,1,0,0,1,0],3)),e.setAttribute(`color`,new Re([1,1,1,1,1,1,1,1,1],3));let t=[0,2].map(t=>new o(e,Yo(new y({side:t,flatShading:!0,vertexColors:!0}),{value:1})));t.push(new Fe(e,new y({side:0,flatShading:!0,vertexColors:!0}),1));for(let e of t)e.castShadow=!0,e.receiveShadow=!0;let n=[1,2].map(t=>{let n=Xo({value:1});return n.side=t,new o(e,n)});return n.push(new Fe(e,new ne({side:1}),1)),l={geometry:e,surfaces:t,depths:n}}let f=1,p=1,m=1,h=1;function g(){(f!==m||p!==h)&&(n.setSize(f,p),r.setSize(f,p),m=f,h=p,e.initRenderTarget(n),e.initRenderTarget(r))}function _(t,n){let r=e.getRenderTarget(),i=e.getActiveCubeFace?.()??0,a=e.getActiveMipmapLevel?.()??0;try{return e.setRenderTarget(t),n()}finally{e.setRenderTarget(r,i,a)}}function v(t,n){let r=[];try{t.traverse(e=>{e.visible&&(e.isMesh||e.isLine||e.isPoints||e.isSprite)&&(r.push(e),e.visible=!1)}),e.render(t,n)}finally{for(let e of r)e.visible=!0}}return{resize(e,t){f=e,p=t},async prepare(t,i,o){let s=e.shadowMap.enabled;_(n,()=>{g(),t&&o&&v(t,o)});function l(t,n,r,i){let a=e.shadowMap.enabled;try{return e.shadowMap.enabled=s,_(t,()=>e.compileAsync(n,r,i))}finally{e.shadowMap.enabled=a}}if(t&&o&&await l(n,t,o),t&&o)for(let e of d().surfaces)await l(n,e,o,t);if(t&&s){let e;if(t.traverseVisible(t=>{!e&&t.castShadow&&t.isDirectionalLight&&(e=t.shadow.camera)}),e)for(let r of d().depths)await l(n,r,e,t)}if(i&&o&&await l(r,i,o),await l(null,a,c),t&&o&&await l(null,t,o),t&&o)for(let e of d().surfaces)await l(null,e,o,t)},render(t,o,s,l){l<=.001?(e.setRenderTarget(null),e.render(t,s)):l>=.999?(e.setRenderTarget(null),e.render(o,s)):(g(),e.setRenderTarget(n),e.render(t,s),e.setRenderTarget(r),e.render(o,s),e.setRenderTarget(null),i.uniforms.blend.value=l,i.uniforms.toneMappingExposure.value=e.toneMappingExposure,e.render(a,c))},dispose(){if(!u&&(u=!0,n.dispose(),r.dispose(),s.geometry.dispose(),i.dispose(),l)){l.geometry.dispose();for(let e of[...l.surfaces,...l.depths])e.material.dispose(),e.isInstancedMesh&&e.dispose();l=void 0}}}}function Qo(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new $e;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=$o(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=$o(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function $o(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new z(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var es=Math.PI*2,ts=1e-8,ns=e=>(e%es+es)%es,rs=(e,t,n)=>Math.max(t,Math.min(n,e)),is=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),as=e=>Number.isFinite(e.heading)?e.heading:Math.atan2(e.tangent.z,e.tangent.x);function os(e,t,n=.42,r={}){let i=is(e,t);return i<ts?null:{...r,type:`line`,start:{x:e.x,y:n,z:e.z},end:{x:t.x,y:n,z:t.z},heading:Math.atan2(t.z-e.z,t.x-e.x),length:i,curvature:0}}function ss(e,t,n,r,i,a){let o=Math.atan2(t.z-e.z,t.x-e.x),s=r*ns(r*(Math.atan2(n.z-e.z,n.x-e.x)-o));return Math.abs(s)>es-1e-7&&(s=0),Math.abs(s)<ts?null:{type:`arc`,center:{x:e.x,z:e.z},radius:i,startAngle:o,sweep:s,start:{x:t.x,y:a,z:t.z},end:{x:n.x,y:a,z:n.z},length:Math.abs(s)*i,curvature:r/i}}function cs(e,t,n,r){return{x:e.x-Math.sin(t)*n*r,z:e.z+Math.cos(t)*n*r}}function ls(e,t){let n=0,r=e.filter(Boolean).map(e=>{let t={...e,startDistance:n};return n+=e.length,{...t,endDistance:n}});return{segments:r,length:n,minRadius:t,maxCurvature:r.reduce((e,t)=>Math.max(e,Math.abs(t.curvature)),0)}}function us(e,t,{radius:n=8,y:r=.42}={}){if(!Number.isFinite(n)||n<=0)throw TypeError(`Railway minimum turning radius must be positive and finite`);let i=as(e),a=as(t),o=[],s=e=>{let r=ls(e,n);if(r.length<ts)return;let i=fs(r,r.length);is(i,t)>1e-5||Math.cos(i.heading-a)<1-1e-7||o.push(r)};for(let o of[-1,1])for(let c of[-1,1]){let l=cs(e,i,o,n),u=cs(t,a,c,n),d=is(l,u);if(d<ts){o===c&&s([ss(l,e,t,o,n,r)]);continue}let f=Math.atan2(u.z-l.z,u.x-l.x);if(o!==c){if(d<2*n-ts)continue;f+=Math.asin(rs(2*o*n/d,-1,1))}let p={x:l.x+o*Math.sin(f)*n,z:l.z-o*Math.cos(f)*n},m={x:u.x+c*Math.sin(f)*n,z:u.z-c*Math.cos(f)*n};s([ss(l,e,p,o,n,r),os(p,m,r),ss(u,m,t,c,n,r)])}for(let o of[-1,1]){let c=cs(e,i,o,n),l=cs(t,a,o,n),u=is(c,l);if(u<ts||u>4*n)continue;let d=(c.x+l.x)/2,f=(c.z+l.z)/2,p=Math.sqrt(Math.max(0,4*n*n-u*u/4)),m=-(l.z-c.z)/u,h=(l.x-c.x)/u;for(let i of[-1,1]){let a={x:d+m*p*i,z:f+h*p*i},u={x:(c.x+a.x)/2,z:(c.z+a.z)/2},g={x:(l.x+a.x)/2,z:(l.z+a.z)/2};s([ss(c,e,u,o,n,r),ss(a,u,g,-o,n,r),ss(l,g,t,o,n,r)])}}return o.sort((e,t)=>e.length-t.length)}function ds(e,t,n){let r=rs(t,0,e.length),i=e.segments;if(!i.length)throw TypeError(`An alignment must contain a nonzero segment`);let a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;i[e].endDistance<r-ts?a=e+1:o=e}let s=i[a],c=rs(r-s.startDistance,0,s.length)/s.length,l,u,d;if(s.type===`line`)l=s.start.x+(s.end.x-s.start.x)*c,u=s.start.z+(s.end.z-s.start.z)*c,d=s.heading;else{let e=s.startAngle+s.sweep*c;l=s.center.x+Math.cos(e)*s.radius,u=s.center.z+Math.sin(e)*s.radius,d=e+Math.sign(s.sweep)*Math.PI/2}let f=n.tangent??={x:0,y:0,z:0},p=Math.cos(d),m=Math.sin(d);if(n.chartSpeed=1,s.chartTransform){let e=s.chartTransform,t=e.x+e.xx*l+e.xz*u,r=e.z+e.zx*l+e.zz*u,i=e.xx*p+e.xz*m,a=e.zx*p+e.zz*m,o=Math.hypot(i,a);l=t,u=r,p=i/o,m=a/o,d=Math.atan2(m,p),n.chartSpeed=o}return f.x=p,f.y=0,f.z=m,n.x=l,n.y=s.start.y,n.z=u,n.distance=r,n.heading=d,n.angle=Math.atan2(f.x,f.z),n.curvature=s.curvature,n}function fs(e,t){return ds(e,t,{tangent:{x:0,y:0,z:0}})}function ps(e,t=.35){let n=[],r=[];for(let i of e.segments){let a=Math.max(1,Math.ceil(i.length/t));for(let t=0;t<a;t++){let o=i.startDistance+i.length*t/a;if(r.length&&o-r.at(-1)<ts)continue;let s=fs(e,o);n.push({x:s.x,y:s.y,z:s.z}),r.push(o)}}let i=fs(e,e.length);return n.push({x:i.x,y:i.y,z:i.z}),r.push(e.length),{points:n,distances:r,length:e.length}}function ms(e,t=8){return ls(e.flatMap(e=>e?.segments??(e?[e]:[])),t)}function hs(e,t,{radius:n=8,y:r=.42,waypoints:i=[],isAllowed:a=()=>!0}={}){let o=[e,...i,t],s=o.map((e,t)=>{if(t===0||t===o.length-1)return{...e,heading:as(e)};if(Number.isFinite(e.heading))return e;let n=o[t-1],r=o[t+1];return{...e,heading:Math.atan2(r.z-n.z,r.x-n.x)}}),c=[];for(let e=1;e<s.length;e++){if(is(s[e-1],s[e])<ts)continue;let t=us(s[e-1],s[e],{radius:n,y:r}).find(e=>e.segments.every(e=>e.type!==`arc`||Math.abs(e.sweep)<=Math.PI+1e-7)&&e.segments.reduce((e,t)=>e+(t.type===`arc`?Math.abs(t.sweep):0),0)<=Math.PI*1.5+1e-7&&ps(e,.45).points.every(a));if(!t)throw TypeError(`Invalid world: waypoints cannot fit the outline and minimum turning radius without a railway loop`);c.push(t)}let l=ms(c,n);if(!l.segments.length)throw TypeError(`Invalid world: railway alignment has no length`);return l}function gs(e,t,n,r){let i=e.surface?.projection;if(i?.type!==`equirectangular`)return[yn(t,n,r)];let a=Math.PI*i.radius,o=a*2;if(r>=a)return[{minX:-a,maxX:a,minZ:n-r,maxZ:n+r}];let s=t>=-a&&t<a?t:((t+a)%o+o)%o-a,c=yn(s,n,r),l=[c];return c.minX<=-a&&l.push(yn(s+o,n,r)),c.maxX>=a&&l.push(yn(s-o,n,r)),l}function _s(e,t){let{a:n,b:r}=e,i=0,a=1;for(let[e,o,s,c]of[[n.x,r.x-n.x,t.minX,t.maxX],[n.z,r.z-n.z,t.minZ,t.maxZ]]){if(Math.abs(o)<1e-14){if(e<s||e>c)return null;continue}let t=(s-e)/o,n=(c-e)/o;if(i=Math.max(i,Math.min(t,n)),a=Math.min(a,Math.max(t,n)),i>a)return null}return i===0&&a===1?e:{a:{x:n.x+(r.x-n.x)*i,z:n.z+(r.z-n.z)*i},b:{x:n.x+(r.x-n.x)*a,z:n.z+(r.z-n.z)*a}}}function vs(e,t,n,r,i){let a=[];for(let o of gs(e,n,r,i))for(let e of t.query(o)){let t=_s(e,o);t&&a.push(t)}return a}var ys=new WeakMap,bs=new J,xs=(e,t,n)=>Math.max(t,Math.min(n,e));function Ss(e,t){let n=Tt(e);if(!n)return null;let r=t.alignment??t.points,i=ys.get(r);i||(i=new WeakMap,ys.set(r,i));let a=i.get(n);if(a)return a;let o=t.distances?.length?t.distances:[0,t.length],s=[0];for(let e=1;e<o.length;e++){let t=o[e-1],n=o[e],r=Math.max(1,Math.ceil((n-t)/.5));for(let e=1;e<=r;e++)s.push(t+(n-t)*e/r)}let c=new Float64Array(s.length),l=new Float64Array(s.length),u=n=>{let r=sc(t,n);return Ot(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,bs).length()*(r.chartSpeed??1)};l[0]=u(0);for(let e=1;e<s.length;e++)l[e]=u(s[e]),c[e]=c[e-1]+(s[e]-s[e-1])*(l[e-1]+4*u((s[e-1]+s[e])/2)+l[e])/6;return a={chart:Float64Array.from(s),physical:c,speed:l,length:c.at(-1),chartLength:t.length},i.set(n,a),a}function Cs(e,t){let n=0,r=e.length-1;for(;n+1<r;){let i=n+r>>1;e[i]<=t?n=i:r=i}return n}function ws(e,t,n){let r=e.chart[t+1]-e.chart[t],i=e.physical[t],a=e.physical[t+1],o=e.speed[t]*r,s=e.speed[t+1]*r;return i+n*(o+n*(3*(a-i)-2*o-s+n*(2*(i-a)+o+s)))}function Ts(e,t){if(!e)return t;let n=xs(t,0,e.chartLength),r=Cs(e.chart,n);return ws(e,r,(n-e.chart[r])/(e.chart[r+1]-e.chart[r]))}function Es(e,t){if(!e)return t;let n=xs(t,0,e.length),r=Cs(e.physical,n),i=e.physical[r],a=e.physical[r+1],o=e.chart[r+1]-e.chart[r],s=e.speed[r]*o,c=e.speed[r+1]*o,l=(n-i)/(a-i||1);for(let t=0;t<3;t++){let t=s+l*(2*(3*(a-i)-2*s-c)+3*l*(2*(i-a)+s+c));if(t<1e-12)break;l=xs(l-(ws(e,r,l)-n)/t,0,1)}return e.chart[r]+o*l}function Ds(e,t,n){if(!Tt(e))return n;let r=new J,i=new J,a=1;for(let n of t){Ot(e,n.x,0,n.z,1,0,0,r),Ot(e,n.x,0,n.z,0,0,1,i);let t=r.lengthSq(),o=r.dot(i),s=i.lengthSq(),c=Math.hypot(t-s,2*o),l=Math.max(1e-8,(t+s-c)/2),u=Math.sqrt((t+s+c)/2);a=Math.max(a,u/l)}return n*a*(1.025+n*a/Tt(e).radius*2)}function Os(e,t,n){let r;try{return hs(e,t,n)}catch(e){r=e}let i=n.waypoints??[];if(n.world)try{return ks(n.world,e,t,n)}catch{}if(!i.length)throw r;let a=[e,...i,t],o=a.map((e,t)=>{if(t===0||t===a.length-1||Number.isFinite(e.heading))return[{pose:e,penalty:0}];let r=Math.atan2(a[t+1].z-a[t-1].z,a[t+1].x-a[t-1].x);return Array.from({length:31},(t,i)=>{let a=(i-15)*.1;return{pose:{...e,heading:r+a},penalty:Math.abs(a)*n.radius*.05}})}),s=o[0].map(e=>({...e,cost:0,parts:[]}));for(let e=1;e<o.length;e++){let t=[];for(let r of o[e]){let e=null;for(let t of s){let i;try{i=hs(t.pose,r.pose,{...n,waypoints:[]})}catch{continue}let a=t.cost+i.length+r.penalty;(!e||a<e.cost)&&(e={...r,cost:a,parts:[...t.parts,i]})}e&&t.push(e)}if(!t.length)throw r;s=t}return s.sort((e,t)=>e.cost-t.cost),ms(s[0].parts,n.radius)}function ks(e,t,n,r){let i=[t,...r.waypoints??[],n],a={x:(t.x+n.x)/2,z:(t.z+n.z)/2},o=Ne(e,a.x,a.z,new tt),s=As(o,0),c=As(o,2),l=Ot(e,a.x,0,a.z,1,0,0,new J),u=Ot(e,a.x,0,a.z,0,0,1,new J),d=l.dot(s),f=u.dot(s),p=l.dot(c),m=u.dot(c),h=d*m-f*p;if(Math.abs(h)<1e-8)throw RangeError(`A railway cannot use a singular pole chart`);let g={x:a.x,z:a.z,xx:m/h,xz:-f/h,zx:-p/h,zz:d/h},_=e=>{let t=e.x-a.x,n=e.z-a.z,r={...e,x:d*t+f*n,z:p*t+m*n};return Number.isFinite(e.heading)&&(r.heading=Math.atan2(p*Math.cos(e.heading)+m*Math.sin(e.heading),d*Math.cos(e.heading)+f*Math.sin(e.heading))),r},v=1;for(let t of i){Ot(e,t.x,0,t.z,g.xx,0,g.zx,l),Ot(e,t.x,0,t.z,g.xz,0,g.zz,u);let n=l.lengthSq(),r=l.dot(u),i=u.lengthSq(),a=Math.hypot(n-i,2*r);v=Math.max(v,Math.sqrt((n+i+a)/2)/Math.max(1e-8,(n+i-a)/2))}let y=r.physicalRadius??r.radius,b=y*v*(1.015+y*v/e.surface.radius*2),x=r.isAllowed??(()=>!0),S=e=>({x:g.x+g.xx*e.x+g.xz*e.z,z:g.z+g.zx*e.x+g.zz*e.z}),C=Os(_(t),_(n),{...r,world:null,radius:b,waypoints:(r.waypoints??[]).map(_),isAllowed:e=>x(S(e))});for(let e of C.segments)e.chartTransform=g;return C}var As=(e,t)=>new J().setFromMatrixColumn(e,t),js=Object.freeze({seed:27,width:130,depth:95,cityRadius:9.6,riverWidth:5.4,groundY:0,waterY:-1.2,railY:.42,sampleSpacing:.35,minTurnRadius:8,throatLength:4}),Q=Object.freeze({trackHalfWidth:1.05,routeEdge:1.35,cuttingHalfWidth:1.08,track:1.45,riverBank:.8,mountain:.35,objects:.32,street:.28,worldEdge:.75,city:1.25,stationOffset:3,stationLength:6.4,stationWidth:2.4,stationEndDistance:7,tunnelRoofHeight:3.9,tunnelArchRadius:1.4,tunnelArchSpring:1.8,tunnelRockCover:.1,bridgeBank:2.2,maximumGrade:.12}),Ms=1e-7,Ns=(e,t,n)=>Math.max(t,Math.min(n,e)),Ps=(e,t,n)=>e+(t-e)*n,Fs=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Is=(e,t=js.railY)=>Array.isArray(e)?{x:Number(e[0]),y:t,z:Number(e.length>2?e[2]:e[1])}:{x:Number(e.x),y:t,z:Number(e.z)},Ls=e=>Number.isFinite(e.x)&&Number.isFinite(e.z);function Rs(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function zs(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Ns(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-Ps(n.x,r.x,o),t-Ps(n.z,r.z,o))}var Bs=new WeakMap,Vs=new WeakMap,Hs=new WeakMap;function Us(e){return e.points.slice(1).flatMap((t,n)=>{let r=e.points[n],i=e.period;if(i&&Math.abs(t.x-r.x)>i/2){let e=t.x-Math.sign(t.x-r.x)*i,a=Math.sign(r.x)*i/2,o=(a-r.x)/(e-r.x),s={x:a,z:Ps(r.z,t.z,o)},c={...s,x:-a};return[{a:r,b:s,index:n,box:an([r,s])},{a:c,b:t,index:n,box:an([c,t])}]}return[{a:r,b:t,index:n,box:an([r,t])}]})}function Ws(e){let t=Bs.get(e);return t&&t.count===e.points.length||(t={count:e.points.length,tree:new vn(Us(e),e=>e.box),box:an(e.points)},Bs.set(e,t)),t}function Gs(e){return cn(e.lines)}function Ks(e,t,n=0){let r=Vs.get(e);for((!r||r.count>e.length)&&(r={count:0,grid:new on},Vs.set(e,r));r.count<e.length;){let t=e[r.count++];r.grid.insert(t,yn(t.x,t.z,t.radius??0))}return r.grid.query(yn(t.x,t.z,t.radius+n))}var qs=(e,t,n=t.radius)=>lt(e,t.x,t.z,n);function Js(e,t,n,r=0){if(!e.surface)return Ks(t,n,r);let i=Hs.get(t);for((!i||i.count>t.length)&&(i={count:0,grid:new on},Hs.set(t,i));i.count<t.length;){let n=t[i.count++];for(let t of gs(e,n.x,n.z,qs(e,n,n.radius??0)))i.grid.insert(n,t)}let a=gs(e,n.x,n.z,qs(e,n,n.radius+r));return a.length===1?i.grid.query(a[0]):[...new Set(a.flatMap(e=>i.grid.query(e)))]}function Ys(e,t,n,r){return zs(0,0,Ae(e,t,n),Ae(e,t,r))}function Xs(e,t,n,r,i=1/0){if(!e.surface)return Math.min(i,Qs(t,n,r));let a={x:n,z:r};if(!Number.isFinite(i))for(let n of t.points)i=Math.min(i,nt(e,a,n));if(!Number.isFinite(i)||i===0)return i;let o=vs(e,Ws(t).tree,n,r,qs(e,a,i)),s=i;for(let{a:t,b:n}of o)s=Math.min(s,Ys(e,a,t,n));return s}function Zs(e,t,n,r){if(!e.surface)return Math.min(r,$s(e,t,n));let i={x:t,z:n},a=vs(e,Gs(e),t,n,qs(e,i,r)),o=r;for(let{a:t,b:n}of a)o=Math.min(o,Ys(e,i,t,n));return o}function Qs(e,t,n){if(e.points.length>32)return Ws(e).tree.nearest(t,n,e=>zs(t,n,e.a,e.b));let r=1/0;for(let i=1;i<e.points.length;i++)r=Math.min(r,zs(t,n,e.points[i-1],e.points[i]));return r}function $s(e,t,n){return Gs(e).nearest(t,n,e=>zs(t,n,e.a,e.b))}function ec(e,t,n){return Vn(e,t,n)}function tc(e,t,n,r=0){if(e.surface?.complete&&e.surface.projection.type===`equirectangular`){let r=e.surface.projection,i=r.centralLatitude*Math.PI/180-n/r.radius;return Number.isFinite(t)&&Number.isFinite(i)&&Math.abs(i)<=Math.PI/2+1e-10}let i=!1,a=e.outline;for(let e=0,r=a.length-1;e<a.length;r=e++){let o=a[e],s=a[r];o[1]>n!=s[1]>n&&t<(s[0]-o[0])*(n-o[1])/(s[1]-o[1])+o[0]&&(i=!i)}if(!i)return!1;if(r<=0)return!0;for(let e=0;e<a.length;e++){let i=a[e],o=a[(e+1)%a.length];if(zs(t,n,{x:i[0],z:i[1]},{x:o[0],z:o[1]})<r)return!1}return!0}function nc(e,t,n){return sn(e,t,n)}function rc(e,t,n){let r=js.groundY;for(let i of e.mountains)r=Math.max(r,nc(i,t,n));return r}function ic(e,t,n){if(!tc(e,t,n))return{type:`outside`,height:-5};if(Rn(e,t,n)<0)return{type:`water`,height:e.river.y};if(e.biomes){let r=ln(e,t,n);if(r===`ocean`)return{type:`ocean`,height:e.river.y};if(r===`shore`)return{type:`shore`,height:e.river.y*(1-Ns(-mn(e,`ocean`,t,n)/e.biomes.shoreWidth,0,1))}}let r=rc(e,t,n);return{type:r>0?`mountain`:`ground`,height:r}}function ac(e,t,n=js.sampleSpacing){let r=[];for(let i=1;i<e.length;i++){let a=e[i-1],o=e[i],s=Math.max(1,Math.ceil(Fs(a,o)/n));for(let e=0;e<s;e++)i>1&&e===0&&Fs(a,r.at(-1))<Ms||r.push({x:Ps(a.x,o.x,e/s),y:t,z:Ps(a.z,o.z,e/s)})}r.push({...e.at(-1),y:t});let i=[0];for(let e=1;e<r.length;e++)i.push(i[e-1]+Fs(r[e-1],r[e]));return{points:r,distances:i,length:i.at(-1)}}function oc(e,t=4){if(e.length<3)return e;let n=[e[0]];for(let r=1;r<e.length-1;r++){let i=e[r-1],a=e[r],o=e[r+1],s=Fs(i,a),c=Fs(a,o);if(s<Ms||c<Ms)continue;let l=Math.min(t,s*.3,c*.3),u={x:a.x+(i.x-a.x)*l/s,z:a.z+(i.z-a.z)*l/s},d={x:a.x+(o.x-a.x)*l/c,z:a.z+(o.z-a.z)*l/c};n.push(u);for(let e=1;e<=10;e++){let t=e/10,r=1-t;n.push({x:r*r*u.x+2*r*t*a.x+t*t*d.x,z:r*r*u.z+2*r*t*a.z+t*t*d.z})}}return n.push(e.at(-1)),n}function sc(e,t){if(e.alignment)return fs(e.alignment,t);let n=Ns(t,0,e.length),r=0,i=e.distances.length-1;for(;r+1<i;){let t=r+i>>1;e.distances[t]<=n?r=t:i=t}let a=e.points[r],o=e.points[i],s=e.distances[i]-e.distances[r],c=s>Ms?(n-e.distances[r])/s:0,l=o.x-a.x,u=o.y-a.y,d=o.z-a.z,f=Math.hypot(l,u,d)||1;return{x:Ps(a.x,o.x,c),y:Ps(a.y,o.y,c),z:Ps(a.z,o.z,c),distance:n,tangent:{x:l/f,y:u/f,z:d/f},angle:Math.atan2(l,d)}}function cc(e,t){let n=[],r=t(e.points[0],0)<=0?0:null;for(let i=1;i<e.points.length;i++){let a=e.points[i-1],o=e.points[i],s=t(a,e.distances[i-1]),c=t(o,e.distances[i]);if(s<=0==c<=0)continue;let l=0,u=1;for(let n=0;n<18;n++){let n=(l+u)/2,r=Ps(e.distances[i-1],e.distances[i],n);t(e.alignment?sc(e,r):{x:Ps(a.x,o.x,n),z:Ps(a.z,o.z,n)},r)<=0==s<=0?l=n:u=n}let d=Ps(e.distances[i-1],e.distances[i],(l+u)/2);s>0?r=d:(d-(r??0)>.01&&n.push({start:r??0,end:d}),r=null)}return r!==null&&e.length-r>.01&&n.push({start:r,end:e.length}),n.map(t=>({...t,entry:sc(e,t.start),exit:sc(e,t.end)}))}function lc(e,t){return[[-.5,-.22],[-.43,-.43],[-.2,-.5],[.22,-.5],[.44,-.4],[.5,-.17],[.5,.23],[.4,.44],[.18,.5],[-.22,.5],[-.44,.39],[-.5,.12]].map(([n,r])=>[n*e,r*t])}function uc(e,t){if(!e)throw TypeError(`Invalid world: ${t}`)}function dc(e,t,n){if(e.cities){uc(Array.isArray(e.cities)&&(e.cities.length>=2||e.gameplay&&e.cities.length===0),`at least two cities are required outside settlement mode`);let t=e.cities.map((e,t)=>({...e,id:String(e.id??`city-${t+1}`),...Is(e,0),radius:e.radius??Qt(e.level??3).radius,stationIds:[]}));return uc(t.every(e=>Ls(e)&&Number.isFinite(e.radius)&&e.radius>0),`cities require finite x/z and positive radii`),uc(new Set(t.map(e=>e.id)).size===t.length,`city IDs must be unique`),t}let r=[[`westhaven`,-47,25],[`pineford`,-43,-20],[`summit`,-16,-29],[`alder`,16,-27],[`eastmere`,46,-17],[`sunfield`,47,23],[`meadow`,16,30],[`willow`,-16,23]];uc(Number.isFinite(Number(e.cityCount??8)),`cityCount must be finite`);let i=Ns(Math.round(e.cityCount??8),3,20),a=Math.min(t.width/130,t.depth/95);return i===8?r.map(([e,r,i])=>({id:e,x:r*t.width/130+(n()-.5)*2.6*a,z:i*t.depth/95+(n()-.5)*2.6*a,y:0,radius:js.cityRadius*a,stationIds:[]})):Array.from({length:i},(e,r)=>{let o=Math.PI*2*r/i+.35+(n()-.5)*.14;return{id:`city-${r+1}`,x:Math.cos(o)*t.width*.35,z:Math.sin(o)*t.depth*.32,y:0,radius:Math.min(js.cityRadius*a,Math.min(t.width,t.depth)*1.05/i),stationIds:[]}})}function fc(e,t={}){let n=e.platform?.width??e.width??0,r=e.platform?.length??e.length??0,i=ft(t,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i);return[[-r/2,-n/2],[r/2,-n/2],[r/2,n/2],[-r/2,n/2]].map(([n,r])=>We(t,e.x,e.z,n*a+r*o,-n*o+r*a))}function pc(e,t,n,r){let i=(e,t,n)=>(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x);return i(e,t,n)*i(e,t,r)<-1e-7&&i(n,r,e)*i(n,r,t)<-1e-7}function mc(e,t,n,r={}){let i=ft(r,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i),s=Ae(r,e,{x:t,z:n}),c=s.x,l=s.z,u=c*a-l*o,d=c*o+l*a;return Math.hypot(Math.max(0,Math.abs(u)-e.platform.length/2),Math.max(0,Math.abs(d)-e.platform.width/2))}function hc(e,t,n={}){if(n.surface){let r={...e,x:0,z:0,rotation:ft(n,e.x,e.z,e.rotation??0)},i=fc(r),a=qs(n,e,e.radius+Q.trackHalfWidth+.3),o=1/0;for(let s of vs(n,Ws(t).tree,e.x,e.z,a)){let t=Ae(n,e,s.a),a=Ae(n,e,s.b);o=Math.min(o,mc(r,t.x,t.z),mc(r,a.x,a.z));for(let e=0;e<4;e++){if(pc(t,a,i[e],i[(e+1)%4]))return 0;o=Math.min(o,zs(i[e].x,i[e].z,t,a))}}return o}let r=fc(e);return Ws(t).tree.nearest(e.x,e.z,t=>{let{a:n,b:i}=t,a=Math.min(mc(e,n.x,n.z),mc(e,i.x,i.z));for(let e=0;e<4;e++){if(pc(n,i,r[e],r[(e+1)%4]))return 0;a=Math.min(a,zs(r[e].x,r[e].z,n,i))}return a},1/0,e.radius??Math.hypot(e.platform.length,e.platform.width)/2)}function gc(e){let t=[];for(let n of e.cities){let r=[];for(let i of e.lines){if(i.from!==n.id&&i.to!==n.id)continue;let a=i.from===n.id,o=Ss(e,i),s=o?.length??i.length;for(let c of[0,7,8.5,10]){if(s<c*2+1)continue;let l=Es(o,a?c:s-c),u=sc(i,l);for(let a of[-1,1]){let o=ft(e,u.x,u.z,u.angle),s=-Math.cos(o),d=Math.sin(o),f=We(e,u.x,u.z,s*Q.stationOffset*a,d*Q.stationOffset*a),p=Ae(e,f,u),m={id:`station-${n.id}`,kind:`station`,cityId:n.id,ownerId:n.ownerId,lineId:i.id,distance:l,...f,y:0,rotation:ot(e,f.x,f.z,Math.atan2(p.x,p.z)),side:a,radius:Math.hypot(Q.stationLength/2,Q.stationWidth/2),platform:{width:Q.stationWidth,length:Q.stationLength}},h=qs(e,m,m.radius+Q.worldEdge);if(!tc(e,m.x,m.z,h)||e.biomes&&!$t(e,[`farmland`,`forest`,`plains`,`desert`],m.x,m.z,qs(e,m))||e.mountains.some(t=>dn(t,m.x,m.z)<qs(e,m,m.radius+Q.mountain))||(e.surface?Rn(e,m.x,m.z)<qs(e,m,m.radius+Q.riverBank):Sn(e).some(e=>hc(m,e)<e.width/2+Q.riverBank))||e.lines.some(t=>gs(e,m.x,m.z,qs(e,m,m.radius+Q.trackHalfWidth+.25)).some(e=>_n(e,Ws(t).box))&&hc(m,t,e)<Q.trackHalfWidth+.25)||t.some(t=>nt(e,m,t)<m.radius+t.radius+Q.objects))continue;let g=nt(e,m,n)+c*.05;r.push({station:m,score:g})}}}if(r.sort((e,t)=>e.score-t.score),r.length){let e=r[0].station;t.push(e),n.stationIds.push(e.id)}}e.stations=t;for(let n of e.lines){let e=t.filter(e=>e.lineId===n.id);n.stationIds=e.map(e=>e.id);for(let t of n.stops){let n=e.find(e=>e.cityId===t.cityId);n&&(t.distance=n.distance)}}}function _c(e,t,{cityId:n=null,keepOutsideCities:r=!1}={}){let i=t.radius;if(e.gameplay?.reservations?.some(n=>nt(e,t,n)<i+n.radius)||!tc(e,t.x,t.z))return!1;if(e.detailRegion&&!n){let n=e.detailRegion,r=qs(e,t,i+Q.objects/2);if(t.x-r<n.minX||t.x+r>n.maxX||t.z-r<n.minZ||t.z+r>n.maxZ)return!1}return!(e.biomes&&!$t(e,[`farmland`,`forest`,`plains`,`desert`],t.x,t.z,qs(e,t))||!tc(e,t.x,t.z,qs(e,t,i+Q.worldEdge))||Zs(e,t.x,t.z,i+Q.track)<i+Q.track||Rn(e,t.x,t.z)<qs(e,t,i+Q.riverBank)||Ks(e.mountains,{...t,radius:qs(e,t,i+Q.mountain)}).some(n=>dn(n,t.x,t.z)<qs(e,t,i+Q.mountain))||r&&Js(e,e.cities,t,Q.city).some(n=>nt(e,t,n)<n.radius+i+Q.city)||n&&Js(e,e.cities,t,e.detailRegion?Q.objects:0).some(r=>r.id!==n&&nt(e,t,r)<r.radius+(e.detailRegion?i+Q.objects:i*.5))||Js(e,e.stations,t,Q.objects).some(n=>nt(e,t,n)<i+n.radius+Q.objects)||Js(e,e.placements,t,Q.objects).some(n=>nt(e,t,n)<i+n.radius+Q.objects&&(t.kind!==`farm`||n.kind!==`farm`||tn(e,t,n,Q.objects)))||(e.cityStreets??[]).some(n=>Xs(e,n,t.x,t.z,i+n.width/2+Q.street)<i+n.width/2+Q.street))}function vc(e,t=e.cities){let n=[`farmland`,`forest`,`plains`,`desert`],r=e.surface?.complete&&e.surface.projection.type===`equirectangular`?2*Math.PI*e.surface.projection.radius:void 0,i=(t,n)=>nt(e,t,n),a=(t,n,r)=>Xs(e,t,n,r,8);for(let o of t){let t=o.development,s=kn(e.seed,o.id),c=o.railAxis??{x:1,z:0},l=ft(e,o.x,o.z,Math.atan2(c.x,c.z)),u={x:Math.sin(l),z:Math.cos(l)},d={x:-u.z,z:u.x},f=t.streetWidth,p=t.streetSpacing,m=(t,n,r)=>We(e,o.x,o.z,u.x*t+d.x*n*r,u.z*t+d.z*n*r),h=t=>{let r=f/2+.12;return!(i(t,o)>o.radius-r||!tc(e,t.x,t.z,qs(e,t,r+Q.worldEdge))||!$t(e,n,t.x,t.z,qs(e,t,r))||Zs(e,t.x,t.z,Q.track+r)<Q.track+r||Rn(e,t.x,t.z)<qs(e,t,Q.riverBank+r)||e.mountains.some(n=>dn(n,t.x,t.z)<qs(e,t,r+Q.mountain))||Js(e,e.cities,{...t,radius:r},e.detailRegion?Q.objects:0).some(n=>n.id!==o.id&&i(t,n)<n.radius+(e.detailRegion?r+Q.objects:r*.5))||Js(e,e.stations,{...t,radius:r}).some(n=>mc(n,t.x,t.z,e)<r))},g=t=>{for(let n=1;n<t.length;n++){let r=t[n-1],a=t[n],o=Math.max(1,Math.ceil(i(r,a)/.6)),s=Ae(e,r,a);for(let t=0;t<=o;t++)if(!h(We(e,r.x,r.z,s.x*t/o,s.z*t/o)))return!1}return!0},_=e.stations.find(e=>e.cityId===o.id),v=_?Ae(e,o,_):null,y=_?Math.sign(v.x*d.x+v.z*d.z):s()<.5?1:-1,b=t=>{let n=kn(e.seed,`${o.id}:lanes:${t}`),s=[],c=[],l=t===y?5.1:3.7,u=m((n()-.5)*o.radius*.12,Math.max(l+.6,o.radius*.46),t),d=[];for(let e=l;e<o.radius-2;e+=3.2)for(let n=-o.radius*.7;n<=o.radius*.7;n+=2.5){let r=m(n,e,t);d.push({p:r,score:n*n+(e-l)**2})}d.sort((e,t)=>e.score-t.score);for(let{p:e}of d)if(h(e)){s.push(e);break}if(!s.length)return{side:t,edges:c,center:u};let _=(t,n,r)=>{let a=i(t,n),o=Ae(e,t,n),s=-o.z/a,c=o.x/a,l=Math.max(3,Math.ceil(a/1.1));return Array.from({length:l+1},(i,a)=>{if(a===0)return t;if(a===l)return n;let u=a/l,d=Math.sin(Math.PI*u)*r;return We(e,t.x,t.z,o.x*u+s*d,o.z*u+c*d)})},v=e=>c.some(t=>{let n=[e[0],e.at(-1)].filter(e=>e===t.points[0]||e===t.points.at(-1));return e.some(e=>!n.some(t=>i(e,t)<2.1)&&a(t,e.x,e.z)<f+1.15)}),b=Math.max(2,Math.ceil((o.radius/7.5)**2));for(let a=0;a<(o.radius<14?280:900)&&s.length<b;a++){let a=n()*Math.PI*2,u=Math.sqrt(n()),d=Math.cos(a)*o.radius*.77*u,y=Math.max(l+.6,o.radius*.46)+Math.sin(a)*Math.max(2,o.radius*.34)*u,b=m(d,y,t);if(i(b,o)>o.radius-1.7)continue;let x=s.map(e=>({node:e,distance:i(e,b)})).sort((e,t)=>e.distance-t.distance);if(x[0].distance<p*.72||x[0].distance>p*1.65||!h(b))continue;let S=x[0].node;if(c.some(t=>{let n=t.points[0]===S?t.points[1]:t.points.at(-1)===S?t.points.at(-2):null;if(!n)return!1;let r=Ae(e,S,n),a=Ae(e,S,b);return(r.x*a.x+r.z*a.z)/(i(n,S)*i(b,S))>.73}))continue;let C=_(S,b,(n()-.5)*Math.min(1.8,x[0].distance*.2));g(C)&&!v(C)&&(s.push(b),c.push({points:C,width:f,...r?{period:r}:{}}))}if(o.level>=4){let e=[];for(let t=0;t<s.length;t++)for(let n=t+1;n<s.length;n++){let r=s[t],a=s[n],o=i(r,a);o>p*1.5||c.some(e=>e.points[0]===r&&e.points.at(-1)===a||e.points[0]===a&&e.points.at(-1)===r)||e.push({a:r,b:a,d:o})}e.sort((e,t)=>e.d-t.d);let t=0;for(let{a:i,b:a,d:s}of e){if(t>=Math.floor(o.level/3))break;let e=_(i,a,(n()-.5)*Math.min(1.2,s*.14));g(e)&&!v(e)&&(c.push({points:e,width:f,...r?{period:r}:{}}),t++)}}if(!c.length)for(let e of[-1,1]){let i=m(e*2.8,l+n()*.6,t),a=_(s[0],i,.2*e);if(g(a)){c.push({points:a,width:f,...r?{period:r}:{}});break}}return{side:t,edges:c,center:u}},x=[b(1),b(-1)];for(let t of x){let n=fn.house*.9,r=n+f/2+Q.street+.1;t.capacity=0;for(let s of t.edges)for(let c=1;c<s.points.length;c++){let l=s.points[c-1],u=s.points[c],d=i(l,u);for(let s of[-1,1]){let c=Ae(e,l,u),p={...We(e,l.x,l.z,c.x/2-c.z/d*r*s,c.z/2+c.x/d*r*s),radius:n};i(p,o)+n<=o.radius&&_c(e,p,{cityId:o.id})&&t.edges.every(e=>a(e,p.x,p.z)>=n+f/2+Q.street)&&(t.capacity+=d)}}}x.sort((e,t)=>t.capacity-e.capacity||(e.side===y?-1:1));let S=x[0],C=S.edges.map((e,t)=>({id:`street-${o.id}-${t+1}`,cityId:o.id,ownerId:o.ownerId,...e}));if(e.cityStreets.push(...C),t.streetCount=C.length,t.connectionCount=e.lines.filter(e=>e.from===o.id||e.to===o.id).length,!C.length)continue;let w=C.flatMap(e=>e.points.slice(1).map((t,n)=>({a:e.points[n],b:t,length:i(e.points[n],t)}))),T=t.features.filter(e=>e!==`house`).reverse(),E=e=>{if(e<3)return`house`;if(e<T.length+3)return T[e-3];let t=s();return o.level>=8&&t<.12?`tower`:o.level>=4&&t<(o.level>=8?.38:.25)?`apartment`:`house`},D=0,O=[],k=new Map,A=t=>{if(k.has(t))return k.get(t);let n=kn(e.seed,`${o.id}:lots:${t}`),r=[];for(let{a,b:s,length:c}of w){let l=Ae(e,a,s),u=l.x/c,d=l.z/c,p=Math.max(1,Math.ceil(c/.72));for(let s=0;s<p;s++)for(let c of[-1,1])for(let m=0;m<(t===`house`?2:1);m++){let h=(s+.18+n()*.64)/p,g=t===`house`?.86+n()*.1:.9+n()*.09,_=fn[t]*g,v=_+f/2+Q.street+.06+n()*.12+m*(2.8+Q.objects),y=We(e,a.x,a.z,l.x*h-d*v*c,l.z*h+u*v*c),b=We(e,a.x,a.z,l.x*h,l.z*h),x=Ae(e,y,b),C={kind:t,cityId:o.id,ownerId:o.ownerId,...y,y:0,radius:_,scale:g,variant:Math.floor(n()*8),rotation:ot(e,y.x,y.z,Math.atan2(x.x,x.z))};if(i(C,o)+_>o.radius||!_c(e,C,{cityId:o.id}))continue;let w=O.length?Math.min(...O.map(e=>i(C,e)-_-e.radius)):1/0;r.push({item:C,neighbor:w,score:i(C,S.center)*.3+m*.4})}}return k.set(t,r),r},j=t=>{let n=A(t),r=null,a=1/0;for(let e of n){if(e.blocked)continue;let t=e.score+(Number.isFinite(e.neighbor)?e.neighbor*1.8:0);t<a&&(r=e,a=t)}if(!r)return!1;let s={...r.item,id:`city-${o.id}-building-${D+1}`,biome:ln(e,r.item.x,r.item.z)};e.placements.push(s),O.push(s),D++;for(let e of k.values())for(let t of e){if(t.blocked)continue;let e=i(s,t.item)-s.radius-t.item.radius;e<Q.objects?t.blocked=!0:t.neighbor=Math.min(t.neighbor,e)}return!0};for(let e=0;e<t.buildingBudget;e++)j(E(e));for(let e=0;D<t.buildingBudget&&e<3;)j(`house`)?e=0:e++;t.placedBuildings=D,t.placedFeatures=[...new Set(O.map(e=>e.kind))]}}function yc(e,t,n){let r=n=>e.placements.push({id:e.detailRegion?`asset-${e.detailRegion.minX}-${e.detailRegion.minZ}-${e.placements.length+1}`:`asset-${e.placements.length+1}`,y:0,rotation:t()*Math.PI*2,biome:ln(e,n.x,n.z),...n}),i=e.detailRegion,a=Math.sqrt((i?(i.maxX-i.minX)*(i.maxZ-i.minZ):e.bounds.width*e.bounds.depth)/12350),o=t=>!e.surface?.complete||tc(e,t.x,t.z)&&mn(e,`ice`,t.x,t.z)<-qs(e,t);if(e.farmland=Bn(e,{density:n,canPlace:t=>o(t)&&_c(e,t,{keepOutsideCities:!0}),add:r}),n<=0)return;let s=i??{minX:-e.bounds.width*.47,maxX:e.bounds.width*.47,minZ:-e.bounds.depth*.47,maxZ:e.bounds.depth*.47},c=e=>(e=Ns(e,0,1),e*e*(3-2*e)),l=(t,r,i,a=!0)=>{t/=Math.sqrt(Math.min(2,n));let o=(s.maxX-s.minX)*(s.maxZ-s.minZ);t=Math.max(t,Math.sqrt(o/i));let c=[];for(let n=Math.floor(s.minZ/t);n<=Math.floor(s.maxZ/t);n++)for(let i=Math.floor(s.minX/t);i<=Math.floor(s.maxX/t);i++){let a=Rs(`${e.seed}:landscape:${r}:${i}:${n}`),o=(i+.08+a()*.84)*t,l=(n+.08+a()*.84)*t;o<s.minX||o>=s.maxX||l<s.minZ||l>=s.maxZ||!tc(e,o,l)||c.push({x:o,z:l,rng:a,priority:a()})}return a?c.sort((e,t)=>e.priority-t.priority):c},u=(t,n,r=!1)=>(r?mn(e,`ice`,t.x,t.z)>=qs(e,t):o(t))&&$t(e,n,t.x,t.z,qs(e,t))&&_c(e,t,{keepOutsideCities:!0}),d=Math.round(310*n*a),f={},p=0,m=l(2.2,`canopy`,12e3,!1).filter(t=>(t.biome=ln(e,t.x,t.z),t.biome!==`forest`&&t.biome!==`plains`||(t.ecology=Ht(e,t.x,t.z),t.ecology.ecoregion===`polar`)?!1:(t.priority=t.biome===`forest`?1+t.ecology.patch*.75+t.ecology.detail*.25+t.priority*.025:t.priority,!0))).sort((e,t)=>t.priority-e.priority);for(let t of m){if(p>=d)break;let n=t.biome,i=t.ecology,a=t.rng,o=c((i.patch-.35)/.34),s=c((i.patch-.57)/.2),l=n===`forest`?o*(.55+i.detail*.45):.004+s*.054,f=e.surface?.projection.type===`equirectangular`?Math.max(.06,Math.cos(i.latitude*Math.PI/180)):1;if(a()>l*f||i.ecoregion===`polar`)continue;let m=.48+(n===`forest`?o:s)*.48+a()*.25,h=i.ecoregion===`tropical`?n===`plains`||i.moisture<.38?`acacia`:`broadleaf`:i.ecoregion===`boreal`?i.moisture>.65?`birch`:`pine`:i.moisture<.36?`pine`:i.moisture>.62?`birch`:i.detail>.62?`gold`:`broadleaf`;a()<.09&&(h=h===`pine`?`birch`:`round`);let g={kind:`tree`,x:t.x,z:t.z,radius:.85*m,scale:m,variant:h,landscapeLayer:`canopy`,rotation:ot(e,t.x,t.z,a()*Math.PI*2)};u(g,[`forest`,`plains`])&&(r(g),p++)}let h=0,g=0,_=0,v=Math.round(48*n*a),y=Math.round(14*n*a),b=Math.round(12*n*a);for(let t of l(14,`understory`,1800)){let n=ln(e,t.x,t.z);if(![`forest`,`plains`,`desert`].includes(n))continue;let i=Ht(e,t.x,t.z,f),a=t.rng,o=e.surface?.complete&&mn(e,`ice`,t.x,t.z)>0,s=null,c=2+a()*2.4;if(o?a()<.36&&(s=`frost`):n===`desert`?i.patch<.55&&a()<.7?(s=`dune`,c=4.1+a()*2.8):i.patch>.61&&a()<.67?(s=`outcrop`,c=2.8+a()*2.3):i.moisture>.47&&a()<.28&&(s=`scrub`):n===`forest`?i.patch<.47&&a()<.45?(s=`meadow`,c=2.8+a()*2.1):i.detail>.72&&a()<.18&&(s=`outcrop`):i.ecoregion===`polar`?a()<.4&&(s=i.moisture>.52?`scrub`:`frost`):i.patch<.6&&a()<.46?(s=i.moisture<.34?`scrub`:`meadow`,c=2.6+a()*2.5):i.detail>.7&&a()<.38&&(s=`outcrop`),s&&h<v){let l={kind:`nature`,x:t.x,z:t.z,radius:c,scale:1,style:s,variant:Math.floor(a()*65536),rotation:ot(e,t.x,t.z,i.windAngle+(a()-.5)*.28)};u(l,n,o)&&(r(l),h++)}let l=!o&&n===`plains`&&i.ecoregion!==`polar`&&i.patch<.58&&i.moisture>.36&&a()<.17,d=!e.surface?.complete||i.longitude>-125&&i.longitude<-60,p=!o&&n===`desert`&&d&&i.patch>.5&&i.patch<.72&&a()<.2;if(!l&&!p)continue;let m=2+Math.floor(a()*4),x=a()*Math.PI*2;for(let i=0;i<m;i++){let i=l?`sheep`:`cactus`;if(l?g>=y:_>=b)break;let o=a()*Math.PI*2,s=2.4+a()*4.8,c=We(e,t.x,t.z,Math.cos(o)*s,Math.sin(o)*s),d=l?1:.72+a()*.35,f=l?.9+a()*.5:0,p={kind:i,...c,radius:l?.7+f:.7*d,...l?{roamRadius:f}:{},scale:d,variant:Math.floor(a()*3),rotation:ot(e,c.x,c.z,x+(a()-.5)*.65)};u(p,n)&&(r(p),l?g++:_++)}}}function bc(e,t,n){for(let r of e.cities){let i=t.filter(e=>e.from===r.id||e.to===r.id).map(t=>{let n=t.from===r.id,i=e.cities.find(e=>e.id===(n?t.to:t.from)),a=t.waypoints.length?n?t.waypoints[0]:t.waypoints.at(-1):i,o=Fs(r,a)||1;return{connection:t,end:n?`start`:`end`,x:(a.x-r.x)/o,z:(a.z-r.z)/o}}),a=i.length?{x:i[0].x,z:i[0].z}:{x:1,z:0},o=1/0;for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){let n=i[e],r=i[t],s=n.x*r.x+n.z*r.z;if(s>=o)continue;o=s;let c=n.x-r.x,l=n.z-r.z,u=Math.hypot(c,l);u>Ms&&(a={x:c/u,z:l/u})}r.railHeading!==void 0&&(uc(Number.isFinite(r.railHeading),`city railHeading must be a finite angle in radians`),a={x:Math.cos(r.railHeading),z:Math.sin(r.railHeading)}),(a.x<0||Math.abs(a.x)<Ms&&a.z<0)&&(a={x:-a.x,z:-a.z}),r.railAxis=a;let s=Math.min(...i.map(t=>Fs(r,e.cities.find(e=>e.id===(t.connection.from===r.id?t.connection.to:t.connection.from))))),c=r.throatLength??n;uc(Number.isFinite(c)&&c>=0,`city throatLength must be finite and nonnegative`),r.throatLength=Math.min(c,s*.18);for(let e of i){let t=e.x*a.x+e.z*a.z>=0?1:-1;e.connection[e.end===`start`?`fromPort`:`toPort`]={cityId:r.id,side:t,x:r.x+a.x*t*r.throatLength,z:r.z+a.z*t*r.throatLength,heading:Math.atan2(a.z*t,a.x*t)}}}}function xc(e,t,n){let r=sc(e,t===`start`?n:e.length-n),i=t===`start`?1:-1;return{...r,tangent:{x:r.tangent.x*i,y:0,z:r.tangent.z*i},curvature:(r.curvature??0)*i}}function Sc(e,t){let n=e=>e.end===`start`?e.line.alignment.segments:e.line.alignment.segments.toReversed(),r=n(e),i=n(t),a=0,o=0,s=0,c=0,l=0;for(;a<r.length&&o<i.length;){let n=xc(e.line,e.end,l+1e-6),u=xc(t.line,t.end,l+1e-6);if(Fs(n,u)>1e-5||n.tangent.x*u.tangent.x+n.tangent.z*u.tangent.z<1-1e-8||Math.abs(n.curvature-u.curvature)>1e-8)break;let d=Math.min(r[a].length-s,i[o].length-c);if(d<Ms)break;l+=d,s+=d,c+=d,s>=r[a].length-Ms&&(a++,s=0),c>=i[o].length-Ms&&(o++,c=0)}return l}function Cc(e){e.sharedSections=[],e.transitions=[];for(let t of e.lines)t.sharedSections=[],t.renderRanges=[{start:0,end:t.length}];for(let t of e.cities){let n=e.lines.flatMap(e=>e.from===t.id?[{line:e,end:`start`,port:e.fromPort}]:e.to===t.id?[{line:e,end:`end`,port:e.toPort}]:[]);for(let r of n)for(let i of n)r.line!==i.line&&r.port.side!==i.port.side&&e.transitions.push({cityId:t.id,fromLineId:r.line.id,fromEnd:r.end,toLineId:i.line.id,toEnd:i.end});for(let r of[-1,1]){let i=n.filter(e=>e.port.side===r);if(i.length<2)continue;let a=new Map,o=(e,t)=>[e.line.id,t.line.id].sort().join(`|`);for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)a.set(o(i[e],i[t]),Sc(i[e],i[t]));let s=[0,...new Set([...a.values()].filter(e=>e>Ms).map(e=>Math.round(e*1e7)/1e7))].sort((e,t)=>e-t);for(let n=1;n<s.length;n++){let c=s[n-1],l=s[n],u=(c+l)/2,d=[...i];for(;d.length;){let n=d.shift(),i=[n];for(let e=d.length-1;e>=0;e--)(a.get(o(n,d[e]))??0)>u&&(i.push(d[e]),d.splice(e,1));if(i.length<2)continue;i.sort((t,n)=>e.lines.indexOf(t.line)-e.lines.indexOf(n.line));let s=i[0],f=`shared-${t.id}-${r}-${e.sharedSections.length+1}`,p=Array.from({length:Math.max(2,Math.ceil((l-c)/.35)+1)},(e,t)=>{let n=xc(s.line,s.end,c+(l-c)*t/(Math.max(2,Math.ceil((l-c)/.35)+1)-1));return{x:n.x,y:n.y,z:n.z}}),m={id:f,cityId:t.id,side:r,ownerLineId:s.line.id,length:l-c,points:p,lines:[]};for(let e of i){let n=e.end===`start`?c:e.line.length-l,i=e.end===`start`?l:e.line.length-c,a={id:f,cityId:t.id,side:r,start:n,end:i,ownerLineId:s.line.id};e.line.sharedSections.push(a),m.lines.push({lineId:e.line.id,start:n,end:i,forward:e.end===`start`}),e!==s&&(e.line.renderRanges=e.line.renderRanges.flatMap(e=>i<=e.start+Ms||n>=e.end-Ms?[e]:[{start:e.start,end:Math.max(e.start,n)},{start:Math.min(e.end,i),end:e.end}].filter(e=>e.end-e.start>Ms)))}e.sharedSections.push(m)}}}}}function wc(e,t,n,r,i,a=.5){return e.sharedSections.some(e=>{let o=e.lines.find(e=>e.lineId===t.id),s=e.lines.find(e=>e.lineId===n.id);return o&&s&&r>=o.start-a&&r<=o.end+a&&i>=s.start-a&&i<=s.end+a})}function Tc(e){let t=[],n=(e,t,n,r)=>e*r-t*n,r=Gs(e),i=r.items;for(let a of i)for(let i of r.query({minX:a.minX-Ms,maxX:a.maxX+Ms,minZ:a.minZ-Ms,maxZ:a.maxZ+Ms})){if(i.lineIndex<=a.lineIndex)continue;let r=a.line,o=i.line;if(a.maxX<i.minX-Ms||i.maxX<a.minX-Ms||a.maxZ<i.minZ-Ms||i.maxZ<a.minZ-Ms||wc(e,r,o,(r.distances[a.index]+r.distances[a.index+1])/2,(o.distances[i.index]+o.distances[i.index+1])/2))continue;let s=a.b.x-a.a.x,c=a.b.z-a.a.z,l=i.b.x-i.a.x,u=i.b.z-i.a.z,d=i.a.x-a.a.x,f=i.a.z-a.a.z,p=n(s,c,l,u),m=s*s+c*c;if(Math.abs(p)<1e-10){if(Math.abs(n(d,f,s,c))>1e-7)continue;let e=(d*s+f*c)/(m||1),t=e+(l*s+u*c)/(m||1);uc((Math.min(1,Math.max(e,t))-Math.max(0,Math.min(e,t)))*Math.sqrt(m)<1e-4,`routes ${r.id} and ${o.id} overlap; shared railway segments must be represented by one connection`);continue}let h=n(d,f,l,u)/p,g=n(d,f,s,c)/p;if(h<-1e-6||h>1.000001||g<-1e-6||g>1.000001)continue;let _=Ps(r.distances[a.index],r.distances[a.index+1],Ns(h,0,1)),v=Ps(o.distances[i.index],o.distances[i.index+1],Ns(g,0,1)),y=(e,t)=>t<.001||t>e.length-.001;if((r.from===o.from||r.from===o.to||r.to===o.from||r.to===o.to)&&y(r,_)&&y(o,v))continue;let b=Ps(a.a.x,a.b.x,Ns(h,0,1)),x=Ps(a.a.z,a.b.z,Ns(h,0,1)),S=t.find(e=>Math.hypot(e.x-b,e.z-x)<.05);S||(S={id:`junction-${t.length+1}`,x:b,y:js.railY,z:x,lines:[]},t.push(S));for(let[e,t]of[[r,_],[o,v]])S.lines.some(t=>t.lineId===e.id)||S.lines.push({lineId:e.id,distance:t})}e.junctions=t}function Ec(e={},t={}){let n=e.seed??js.seed,r=Rs(n),i={width:Number(e.bounds?.width??js.width),depth:Number(e.bounds?.depth??js.depth)};uc(Number.isFinite(i.width)&&Number.isFinite(i.depth)&&i.width>=35&&i.depth>=30,`bounds must be finite and at least 35 × 30`);let a=un(e.players),o=dc(e,i,r),s=new Set(a.map(e=>e.id));for(let[t,r]of o.entries()){let i=kn(n,r.id);r.level=r.level??(e.cities?1+Math.floor(i()*10):3);let o=Qt(r.level);r.ownerId=String(r.ownerId??a[Math.floor(kn(n,`${r.id}:owner`)()*a.length)].id),uc(s.has(r.ownerId),`city ${r.id} references unknown owner ${r.ownerId}`),e.cities&&e.cities[t].radius==null&&(r.radius=o.radius),r.development={...o,radius:r.radius,variantSeed:`${n}:city:${r.id}`,placedBuildings:0,streetCount:0,connectionCount:0}}let c={...e.trainOwners??{}};uc(e.trainOwners===void 0||e.trainOwners&&typeof e.trainOwners==`object`&&!Array.isArray(e.trainOwners),`trainOwners must be an object keyed by train ID`),uc(Object.values(c).every(e=>s.has(e)),`trainOwners references an unknown player`);let l=e.outline?e.outline.map(e=>[Number(e[0]),Number(e[1])]):lc(i.width,i.depth);uc(l.length>=3&&l.every(e=>e.every(Number.isFinite)),`outline requires at least three finite points`);let u={version:2,seed:n,bounds:i,outline:l,geography:e.geography,camera:e.camera,surface:vt(e.surface),players:a,trainOwners:c,traffic:structuredClone(e.traffic??{}),density:Ns(Number(e.density??1)||0,0,3),detailMode:t.detail??`full`,cities:o,lines:[],stations:[],placements:[],cityStreets:[],junctions:[]};e.gameplay&&(u.gameplay=structuredClone(e.gameplay)),uc(o.every(e=>tc(u,e.x,e.z,.5)),`cities must be inside the world outline`);let d={points:[[-.64,.015],[-.42,-.025],[-.2,.035],[.02,0],[.22,.075],[.43,.055],[.64,.015]].map(([e,t])=>[e*i.width,t*i.depth])},f=e.rivers??[e.river??d];uc(Array.isArray(f),`rivers must be an array`);let p=f.map((e,t)=>{let n=e.points.map(e=>Is(e,js.waterY));uc(n.every(Ls),`river requires finite points`);let r=n.filter((e,t)=>t===0||Fs(e,n[t-1])>Ms);uc(r.length>=2,`river requires at least two distinct points`);let i=Number(e.width??js.riverWidth);uc(Number.isFinite(i)&&i>0,`river width must be positive`);let a=ac(e.smooth===!1?r:oc(r,9),js.waterY,e.smooth===!1?1/0:1);return uc(Number.isFinite(a.length)&&a.length>Ms,`river must have positive length`),{...a,id:e.id??`river-${t+1}`,name:e.name,width:i,y:js.waterY}});u.river=p[0]??{points:[],distances:[],length:0,width:0,y:js.waterY},e.rivers!==void 0&&(u.rivers=p),u.lakes=e.biomes?.geography?.lakes,u.lakeShore=e.biomes?.geography?.lakeShore,(e.rivers!==void 0||u.lakes?.length)&&(u.hydrology=En(u));let m=u.river.width,h=Math.min(i.width/130,i.depth/95),g=[...o].sort((e,t)=>e.z-t.z).slice(0,2),_={x:((g[0]?.x??0)+(g[1]?.x??0))/2,z:((g[0]?.z??0)+(g[1]?.z??0))/2},v=(e.cities?[]:[{id:`high-pass`,..._,radius:10*h,height:13*h},{id:`north-spire`,x:_.x-7*h,z:_.z-11*h,radius:6.8*h,height:10*h},{id:`east-spire`,x:_.x+11*h,z:_.z-10*h,radius:7*h,height:9*h}]).filter(e=>tc(u,e.x,e.z,e.radius+.1)&&ec(u,e.x,e.z)>e.radius+m/2+Q.riverBank&&o.every(t=>Fs(t,e)>e.radius+2));u.mountains=(e.mountains??v).map((e,t)=>({...e,id:String(e.id??`mountain-${t+1}`),x:Number(e.x),z:Number(e.z),radius:Number(e.radius),height:Number(e.height)})),uc(u.mountains.every(e=>Ls(e)&&Number.isFinite(e.radius)&&e.radius>0&&Number.isFinite(e.height)&&e.height>0),`mountains require finite x/z and positive radius/height`),uc(new Set(u.mountains.map(e=>e.id)).size===u.mountains.length,`mountain IDs must be unique`),uc(u.mountains.every(e=>e.range?e.range.polygon.every(([e,t])=>tc(u,e,t)):tc(u,e.x,e.z,e.radius+.1)),`mountain footprints must stay inside the world outline`),uc(u.mountains.every(e=>e.range||Rn(u,e.x,e.z)>e.radius+Q.riverBank),`mountain footprints must not overlap the river or its banks`),e.biomes?.geography&&(u.biomes=Hn(u,e.biomes));let y=(o.length===2?o.slice(0,1):o).map((e,t)=>({from:e.id,to:o[(t+1)%o.length].id}));o.length===8&&y.push({from:o[7].id,to:o[2].id},{from:o[6].id,to:o[3].id});let b=e.connections??y,x=[`coral`,`teal`,`gold`,`blue`,`coral`,`gold`,`teal`,`blue`,`gold`,`coral`];uc(Array.isArray(b)&&(b.length>0||u.gameplay&&o.length===0),`at least one connection is required outside settlement mode`);let S=b.map((e,t)=>({...e,id:String(e.id??`line-${t+1}`),from:String(e.from),to:String(e.to),waypoints:(e.points??e.waypoints??[]).map(e=>({...Is(e),...Number.isFinite(e.heading)?{heading:e.heading}:{}}))}));uc(S.every(e=>o.some(t=>t.id===e.from)&&o.some(t=>t.id===e.to)&&e.from!==e.to),`connections must reference two different existing city IDs`);let C=S.map(e=>[e.from,e.to].sort().join(`|`));uc(new Set(C).size===C.length,`overlapping duplicate city connections must be represented by one railway`);let w=Number(e.minTurnRadius??js.minTurnRadius),T=Number(e.throatLength??js.throatLength);uc(Number.isFinite(w)&&w>0,`minTurnRadius must be positive and finite`),uc(Number.isFinite(T)&&T>=0,`throatLength must be finite and nonnegative`),u.minTurnRadius=w,bc(u,S,T);for(let t=0;t<S.length;t++){let n=S[t],r=o.find(e=>e.id===String(n.from)),i=o.find(e=>e.id===String(n.to));uc(r&&i&&r!==i,`connections must reference two different existing city IDs`);let a=n.waypoints;uc(a.every(Ls),`connection waypoints require finite x/z`);let c=n.fromPort,l={...n.toPort,heading:n.toPort.heading+Math.PI},d=Ds(u,[c,...a,l],w),f;try{f=(u.surface?Os:hs)(c,l,{radius:d,physicalRadius:w,world:u,waypoints:a,y:js.railY,isAllowed:e=>tc(u,e.x,e.z,Q.routeEdge)})}catch(e){throw TypeError(`${e.message} (${n.id})`,{cause:e})}let p=ms([os(r,c),f,os(l,i)],d),m=String(n.ownerId??r.ownerId);uc(s.has(m),`line ${n.id} references unknown owner ${m}`);let h={id:n.id,from:r.id,to:i.id,ownerId:m,color:n.color??x[t%x.length],closed:!1,fromPort:n.fromPort,toPort:n.toPort,alignment:p,...ps(p,js.sampleSpacing),bridges:[],tunnels:[],cuts:[],stationIds:[]};uc(h.length>Ms,`connections must have nonzero length`),uc(h.points.every(e=>tc(u,e.x,e.z,Q.routeEdge))&&u.outline.every(([e,t])=>Qs(h,e,t)>=Q.routeEdge),`entire railway corridors must stay inside the world outline`),h.bridges=cc(h,t=>Math.min(Rn(u,t.x,t.z),e.biomes?.geography?-mn(u,`ocean`,t.x,t.z):1/0)-Q.bridgeBank);for(let e of u.mountains){if(Qs(h,e.x,e.z)>e.radius+qs(u,e,Q.cuttingHalfWidth))continue;let t=cc(h,t=>dn(e,t.x,t.z)-qs(u,t,Q.cuttingHalfWidth));h.cuts.push(...t.map(t=>({...t,mountainId:e.id})));let n=cc(h,(t,n)=>{let r=sc(h,n).tangent,i=-r.z,a=r.x,o=Q.tunnelRoofHeight-nc(e,t.x,t.z);for(let n=0;n<=24;n++){let s=n/24*Math.PI,c=Math.cos(s)*Q.tunnelArchRadius,l=js.railY+Q.tunnelArchSpring+Math.sin(s)*Q.tunnelArchRadius,d=ft(u,t.x,t.z,Math.atan2(r.x,r.z)),f=u.surface?We(u,t.x,t.z,-Math.cos(d)*c,Math.sin(d)*c):{x:t.x+i*c,z:t.z+a*c},p=nc(e,f.x,f.z);o=Math.max(o,l+Q.tunnelRockCover-p)}return o});for(let r of n){let n=t.find(e=>e.start<=r.start+Ms&&e.end>=r.end-Ms);h.tunnels.push({...r,mountainId:e.id,cutStart:n?.start??r.start,cutEnd:n?.end??r.end,cutEntry:n?.entry??r.entry,cutExit:n?.exit??r.exit})}}h.tunnels.sort((e,t)=>e.start-t.start),h.cuts.sort((e,t)=>e.start-t.start),h.stops=[{cityId:r.id,distance:Math.min(Q.stationEndDistance,h.length*.25)},{cityId:i.id,distance:h.length-Math.min(Q.stationEndDistance,h.length*.25)}],u.lines.push(h)}if(uc(new Set(u.lines.map(e=>e.id)).size===u.lines.length,`line IDs must be unique`),Cc(u),Tc(u),u.biomes??=Hn(u,e.biomes),u.gameplay?.farmVillageCount){u.gameplay.reservations=(u.gameplay.reservations??[]).filter(e=>!e.id?.startsWith(`farm-village:`));let e=Mn(u,{count:u.gameplay.farmVillageCount});u.gameplay.farmVillages=e,u.gameplay.reservations.push(...e.reservations)}return gc(u),u.placements=[],t.detail!==`network`&&(vc(u),yc(u,r,u.density),u.gameplay&&u.placements.push(...structuredClone(u.gameplay.guaranteedTrees??[]))),u}function Dc(e){let t=[],n=(t,n)=>nt(e,t,n),r=(e,n,r)=>t.push({type:e,id:n,detail:r});try{vt(e.surface)}catch(e){return r(`surface`,`world`,e.message),t}let i=new Set((e.players??[]).map(e=>e.id));try{un(e.players??[])}catch(e){r(`players`,`world`,e.message)}for(let t of e.cities)i.has(t.ownerId)||r(`city-owner`,t.id,`City references an unknown player`),(!Number.isInteger(t.level)||t.level<1||t.level>10)&&r(`city-level`,t.id,`City level must be an integer from 1 through 10`);for(let[t,n]of Object.entries(e.trainOwners??{}))i.has(n)||r(`train-owner`,t,`Train references an unknown player`);for(let t of e.lines)i.has(t.ownerId)||r(`line-owner`,t.id,`Railway references an unknown player`);let a=[`farmland`,`forest`,`plains`,`desert`];for(let t of e.cityStreets??[]){let i=e.cities.find(e=>e.id===t.cityId);if(i&&t.ownerId===i.ownerId||r(`street-owner`,t.id,`Street must belong to its existing city owner`),!Number.isFinite(t.width)||t.width<=0||t.points.length<2||!t.points.every(Ls))r(`street-geometry`,t.id,`Street requires a positive width and finite points`);else for(let o=1;o<t.points.length;o++){let s=t.points[o-1],c=t.points[o],l=Math.max(1,Math.ceil(n(s,c)/.5)),u=t.width/2,d=Ae(e,s,c);for(let o=0;o<=l;o++){let c=We(e,s.x,s.z,d.x*o/l,d.z*o/l);(!tc(e,c.x,c.z,qs(e,c,u+Q.worldEdge)-.001)||i&&n(c,i)>i.radius-u+.001)&&r(`street-edge`,t.id,`Street leaves its dry city footprint`),e.biomes&&!$t(e,a,c.x,c.z,qs(e,c,u)-.001)&&r(`street-biome`,t.id,`Street enters ocean, shore, or mountain`),Zs(e,c.x,c.z,u+Q.track)<u+Q.track-.001&&r(`street-track`,t.id,`Street enters railway clearance`),Rn(e,c.x,c.z)<qs(e,c,u+Q.riverBank)-.001&&r(`street-water`,t.id,`Street enters river bank`),e.mountains.some(t=>dn(t,c.x,c.z)<qs(e,c,u+Q.mountain)-.001)&&r(`street-mountain`,t.id,`Street crosses a mountain`),e.stations.some(t=>mc(t,c.x,c.z,e)<u-.001)&&r(`street-station`,t.id,`Street overlaps a station`)}}}for(let t of e.cities){let n=(e.cityStreets??[]).filter(e=>e.cityId===t.id);if(!n.length)continue;let i=e=>`${e.x.toFixed(5)},${e.z.toFixed(5)}`,a=new Map;for(let e of n)for(let t=1;t<e.points.length;t++){let n=i(e.points[t-1]),r=i(e.points[t]);a.has(n)||a.set(n,new Set),a.has(r)||a.set(r,new Set),a.get(n).add(r),a.get(r).add(n)}let o=new Set,s=[a.keys().next().value];for(;s.length;){let e=s.pop();o.has(e)||(o.add(e),s.push(...a.get(e)))}o.size!==a.size&&r(`street-connectivity`,t.id,`City street graph is disconnected`)}for(let t of e.lines){if((!Number.isFinite(t.length)||t.length<=0)&&r(`route-length`,t.id,`Route length must be positive`),t.alignment)for(let n of t.alignment.segments)n.type===`arc`&&n.radius<(e.minTurnRadius??js.minTurnRadius)-1e-6&&r(`route-curvature`,t.id,`Railway bend is tighter than its minimum turning radius`);for(let e=1;e<t.points.length;e++){let i=t.points[e-1],a=t.points[e];Ls(i)&&Ls(a)&&Number.isFinite(a.y)||r(`route-coordinate`,t.id,`Non-finite route point`),Math.abs(a.y-i.y)/(n(i,a)||1)>Q.maximumGrade+Ms&&r(`route-grade`,t.id,`Grade exceeds 12 percent`)}for(let n of[`bridges`,`tunnels`,`cuts`])for(let i of t[n])if((i.start<0||i.end>t.length+Ms||i.end<=i.start)&&r(`structure-interval`,t.id,`Invalid ${n} interval`),n===`tunnels`){let n=e.mountains.find(e=>e.id===i.mountainId);for(let e of[i.entry,i.exit])nc(n,e.x,e.z)<Q.tunnelRoofHeight-.01&&r(`tunnel-cover`,t.id,`Portal lacks roof coverage`)}}for(let t of e.stations){t.ownerId!==e.cities.find(e=>e.id===t.cityId)?.ownerId&&r(`station-owner`,t.id,`Station must belong to its city owner`);for(let n of e.lines)gs(e,t.x,t.z,qs(e,t,t.radius+Q.trackHalfWidth+.25)).some(e=>_n(e,Ws(n).box))&&hc(t,n,e)<Q.trackHalfWidth+.25-.001&&r(`station-track`,t.id,`Platform overlaps ${n.id}`);(e.surface?Rn(e,t.x,t.z)<qs(e,t,t.radius+Q.riverBank)-.001:Sn(e).some(e=>hc(t,e)<e.width/2+Q.riverBank-.001))&&r(`station-water`,t.id,`Platform enters river bank`)}for(let t=0;t<e.placements.length;t++){let i=e.placements[t],a=i.radius;i.cityId&&i.ownerId!==e.cities.find(e=>e.id===i.cityId)?.ownerId&&r(`asset-owner`,i.id,`City asset must belong to its city owner`);for(let t of e.cityStreets??[])Xs(e,t,i.x,i.z,a+t.width/2+Q.street)<a+t.width/2+Q.street-.001&&r(`asset-street`,i.id,`Footprint enters a city street`);e.biomes&&!$t(e,[`farmland`,`forest`,`plains`,`desert`],i.x,i.z,qs(e,i)-.001)&&r(`asset-biome`,i.id,`Footprint enters ocean, shore, or mountain`),tc(e,i.x,i.z,qs(e,i,a+Q.worldEdge)-.001)||r(`asset-edge`,i.id,`Footprint crosses island edge`),Zs(e,i.x,i.z,a+Q.track)<a+Q.track-.001&&r(`asset-track`,i.id,`Footprint enters railway clearance`),Rn(e,i.x,i.z)<qs(e,i,a+Q.riverBank)-.001&&r(`asset-water`,i.id,`Footprint enters river bank`);for(let t of e.mountains)dn(t,i.x,i.z)<qs(e,i,a+Q.mountain)-.001&&r(`asset-mountain`,i.id,`Footprint intersects ${t.id}`);for(let t of e.stations)n(i,t)<a+t.radius+Q.objects-.001&&r(`asset-station`,i.id,`Footprint intersects ${t.id}`);for(let o=0;o<t;o++)n(i,e.placements[o])<a+e.placements[o].radius+Q.objects-.001&&(i.kind!==`farm`||e.placements[o].kind!==`farm`||tn(e,i,e.placements[o],Q.objects-.001))&&r(`asset-overlap`,i.id,`Footprint intersects ${e.placements[o].id}`)}return t}function Oc(e){let{l:t=.64,c:n=.14,h:r=22}=e?.color??{},i=(e,t)=>Ut(e,t,r);return{body:i(m.clamp(t,.48,.72),Math.min(n,.17)),light:i(.83,Math.min(n*.44,.075)),dark:i(.38,Math.min(n*.65,.09)),roof:i(m.clamp(t-.08,.43,.65),Math.min(n*.95,.16)),accent:i(m.clamp(t+.06,.57,.77),Math.min(n*1.08,.18)),trim:i(.94,Math.min(n*.13,.02))}}function kc(e){return Object.fromEntries(Object.entries(Oc(e)).map(([t,n])=>[t,qt(new y({name:`player-${e?.id??`neutral`}-${t}`,color:n,roughness:1,metalness:0,flatShading:!0}))]))}function Ac(e,t){let{vertices:n,surfaceTriangles:r}=pn(e),i=[];for(let e of r){let r=e.map(e=>n[e]),a=[],o=r.map(e=>e.y-t(e.x,e.z));for(let e=0;e<3;e++){let t=r[e],n=r[(e+1)%3],i=o[e],s=o[(e+1)%3];if(i>=0&&a.push([t.x,t.z]),i>=0!=s>=0){let e=i/(i-s);a.push([t.x+(n.x-t.x)*e,t.z+(n.z-t.z)*e])}}if(a.length>=3){let e=a.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6]);i.push([[...e,e[0]]])}}return i.length?Un.union(...i):[]}function jc(e,t){return Ac(e,()=>e.height*t)}function Mc(e){return{low:jc(e,.12),high:jc(e,.62),snow:e.range?Ac(e,(t,n)=>rn(e,t,n)):e.height>8?jc(e,.84):[]}}function Nc(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of e[0])t=Math.min(t,a),n=Math.min(n,o),r=Math.max(r,a),i=Math.max(i,o);return{minX:t,minZ:n,maxX:r,maxZ:i}}function Pc(e,t){let n=e.biomes.land,r=t.water,i=e.biomes.ocean??[],a=i.length&&t.banks.length?Un.difference(t.banks,i):t.banks,o=[...e.biomes.oceanShore??[],...a],s=new vn([...r,...t.banks],Nc),c=e=>e.flatMap(e=>{let t=s.query(Nc(e));return t.length?Un.difference([e],t):[e]});return{land:n,shores:o,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Mc(e);return{id:e.id,low:c(t.low),high:c(t.high),snow:c(t.snow)}}),colorField:{seed:e.seed,sites:e.biomes.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes.shoreWidth}}}function Fc(e){let t=[[e.outline]],n=bn(e);if(e.surface?.complete&&e.biomes?.land)return Pc(e,n);let r=n.water,i=e.biomes?.ocean??[],a=i.length?Un.union(r,i):r,o=Un.difference(n.banks,a),s=e.biomes?.oceanShore?.length?Un.union(o,e.biomes.oceanShore):o,c=Un.difference(t,a,s);return{land:c,shores:s,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Mc(e);return{id:e.id,low:Un.intersection(t.low,c),high:Un.intersection(t.high,c),snow:Un.intersection(t.snow,c)}}),colorField:{seed:e.seed,sites:e.biomes?.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes?.shoreWidth}}}var Ic=new WeakMap,Lc=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e));function Rc(e,t){let n=Math.imul(e,374761393)^Math.imul(t,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function zc(e,t,n=24){e/=n,t/=n;let r=Math.floor(e),i=Math.floor(t),a=Lc(e-r),o=Lc(t-i),s=Rc(r,i)*(1-a)+Rc(r+1,i)*a,c=Rc(r,i+1)*(1-a)+Rc(r+1,i+1)*a;return s*(1-o)+c*o}function Bc(e){let t=e.terrainSource??e,n=t.biomes?.sites??t.sites;if(!n?.length)return null;if(!Ic.has(n)||Ic.get(n).seed!==t.seed){if(t.surface?.complete){let e={seed:t.seed,globe:Xt(t,n)};return Ic.set(n,e),e}let e=Math.hypot(t.bounds?.width??130,t.bounds?.depth??95),r=Math.min(22,Math.max(4.5,e*.011)),i={farmland:X.grass.clone().lerp(X.farmland,.43),forest:X.grass.clone().lerp(X.forestFloor,.78),plains:X.grass.clone(),desert:X.desert.clone()};Ic.set(n,{seed:t.seed,sites:n.map(e=>({...e,color:e.ice?X.snow:i[e.type]??X.grass})),width:r,period:t.surface?.complete?t.bounds.width:0,distances:new Float64Array(n.length)})}return Ic.get(n)}var Vc={};function Hc(e,t,n,{map:r=!1,target:i=new v}={}){let a=Bc(e);if(!a)return i.copy(X.grass);if(a.globe)return Kt(a.globe,t,n,i);let{sites:o,width:s,distances:c,period:l}=a,u=(e,t,n)=>{if(!l)return zc(e,t,n);let r=((e+l/2)%l+l)%l,i=Lc(r/l);return zc(r,t,n)*(1-i)+zc(r-l,t,n)*i},d=t+(u(t+171,n-87,45)-.5)*s*.85,f=n+(u(t-73,n+119,39)-.5)*s*.85,p=1/0,m=0,h=0,g=0,_=0,y=0;for(let e=0;e<o.length;e++){let t=l?((d-o[e].x+l/2)%l+l)%l-l/2:d-o[e].x;c[e]=Math.hypot(t,f-o[e].z),p=Math.min(p,c[e])}i.setRGB(0,0,0);for(let e=0;e<o.length;e++){let t=Lc(1-(c[e]-p)/s),n=o[e].color,r=o[e];i.r+=n.r*t,i.g+=n.g*t,i.b+=n.b*t,m+=t,r.ice?_+=t:r.type===`forest`?h+=t:r.type===`desert`?g+=t:r.type===`plains`&&(y+=t)}i.multiplyScalar(1/m),Ht(e.terrainSource??e,t,n,Vc),Jt(i,Vc,h/m,g/m,_/m,y/m);let b=(u(t,n,29)-.5)*.09+(u(t+243,n-192,91)-.5)*.07;return i.multiplyScalar(1+b*(r?.42:1)),r&&i.lerp(X.trim,.09),i}function Uc(e,t,{map:n=!1,maxEdge:r=n?24:8}={}){if(!Number.isFinite(r)||r<=0)throw TypeError(`Terrain color edge spacing must be positive and finite`);let i=e.attributes.position,a=e.index,o=[],s=[],c=new v,l=[],u=r*r,d=!n&&t.terrainChunk?t.bounds:null,f=new Map,p=new v,m=d?[[0,d.minX,2],[0,d.maxX,2],[2,d.minZ,0],[2,d.maxZ,0]]:[],h=d?Math.max(1e-6,...m.map(([,e])=>Math.abs(e)*1e-7)):0;function g(e,n,r){let i=`${e}:${n}:${r}`;if(!f.has(i)){let a=e===0?n:r,o=e===2?n:r;f.set(i,Hc(t,a,o))}return f.get(i)}function _(e){for(let[t,n,r]of m)if(Math.abs(e[t]-n)<=h){let i=Math.floor(e[r]/2)*2,a=(e[r]-i)/2;return c.copy(g(t,n,i)),p.copy(g(t,n,i+2)),c.lerp(p,a)}return Hc(t,e[0],e[2],{map:n,target:c})}function y(e){for(let t=0;t<3;t++){let n=e[t],r=e[(t+1)%3];for(let[e,i,a]of m){if(Math.abs(n[e]-i)>h||Math.abs(r[e]-i)>h)continue;let o=Math.min(n[a],r[a]),s=Math.max(n[a],r[a]),c=Math.ceil((o+h)/2)*2,l=Math.floor((s-h)/2)*2;if(c>l)continue;let u=Math.max(c,Math.min(l,Math.round((o+s)/2/2)*2)),d=(u-n[a])/(r[a]-n[a]),f=n.map((e,t)=>e+(r[t]-e)*d);return f[a]=u,{j:t,m:f}}}return null}let b=[new v,new v,new v],x=new v;function S(e){e.forEach((e,n)=>Hc(t,e[0],e[2],{map:!0,target:b[n]}));for(let n of[[.5,.5,0],[0,.5,.5],[.5,0,.5],[1/3,1/3,1/3]]){let r=0,i=0,a=0,o=0,s=0;for(let t=0;t<3;t++){let c=n[t];r+=e[t][0]*c,i+=e[t][2]*c,a+=b[t].r*c,o+=b[t].g*c,s+=b[t].b*c}if(Hc(t,r,i,{map:!0,target:x}),Math.max(Math.abs(x.r-a),Math.abs(x.g-o),Math.abs(x.b-s))>.004)return!1}return!0}let C=e=>[i.getX(e),i.getY(e),i.getZ(e)],w=a?.count??i.count;for(let e=0;e<w;e+=3)for(l.push([C(a?a.getX(e):e),C(a?a.getX(e+1):e+1),C(a?a.getX(e+2):e+2)]);l.length;){let e=l.pop(),t=-1,i=u;for(let n=0;n<3;n++){let r=e[n],a=e[(n+1)%3],o=(r[0]-a[0])**2+(r[2]-a[2])**2;o>i&&(i=o,t=n)}if(t>=0&&n&&i<=(r*8)**2&&S(e)&&(t=-1),t>=0){let n=e[t],r=e[(t+1)%3],i=e[(t+2)%3],a=n.map((e,t)=>(e+r[t])/2);l.push([n,a,i],[a,r,i]);continue}let a=y(e);if(a){let{j:t,m:n}=a,r=e[t],i=e[(t+1)%3],o=e[(t+2)%3];l.push([r,n,o],[n,i,o])}else for(let t of e)o.push(...t),_(t),s.push(c.r,c.g,c.b)}let T=new $e;return T.setAttribute(`position`,new Re(o,3)),T.setAttribute(`color`,new Re(s,3)),T.computeVertexNormals(),T}function Wc(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);let n=Object.keys(e.attributes),r=n.map(t=>e.attributes[t]);if(r.some(e=>e.isInterleavedBufferAttribute))throw TypeError(`Surface tessellation needs ordinary buffer attributes`);let i=e.attributes.position;if(!i||i.itemSize!==3)throw TypeError(`Surface tessellation needs three-dimensional positions`);let a=[],o=[],s=0;for(let e of r)a.push(s),o.push(e.itemSize),s+=e.itemSize;let c=a[n.indexOf(`position`)],l=r.map(()=>[]),u=t*t*(1+1e-12),d=e=>{let t=new Float64Array(s);for(let n=0;n<r.length;n++)for(let i=0;i<o[n];i++)t[a[n]+i]=r[n].array[e*o[n]+i];return t},f=(e,t)=>{let n=new Float64Array(s);for(let r=0;r<s;r++)n[r]=(e[r]+t[r])*.5;return n},p=(e,t)=>{let n=e[c]-t[c],r=e[c+2]-t[c+2];return n*n+r*r>u},m=e=>{for(let t=0;t<r.length;t++)for(let n=0;n<o[t];n++)l[t].push(e[a[t]+n])},h=e.index?.array,g=h?.length??i.count,_=[];for(let e=0;e<g;e+=3)for(_.push([d(h?h[e]:e),d(h?h[e+1]:e+1),d(h?h[e+2]:e+2)]);_.length;){let[e,t,n]=_.pop(),r=p(e,t),i=p(t,n),a=p(n,e),o=!!r|(i?2:0)|(a?4:0);if(!o){m(e),m(t),m(n);continue}let s=r?f(e,t):null,c=i?f(t,n):null,l=a?f(n,e):null;o===7?_.push([e,s,l],[s,t,c],[l,c,n],[s,c,l]):o===1?_.push([e,s,n],[s,t,n]):o===2?_.push([e,t,c],[e,c,n]):o===4?_.push([e,t,l],[t,n,l]):o===3?_.push([e,s,n],[s,c,n],[s,t,c]):o===5?_.push([e,s,l],[s,t,n],[s,n,l]):_.push([e,t,c],[e,c,l],[l,c,n])}let v=new $e;for(let e=0;e<r.length;e++)v.setAttribute(n[e],new Re(l[e],o[e],r[e].normalized));return v}function Gc(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);if(!e.length)return[];let n=[],r=e[0],i=e.at(-1),a=r[0]===i[0]&&r[1]===i[1];for(let r=0;r<e.length-+!!a;r++){let i=e[r],a=e[(r+1)%e.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=2**Math.max(0,Math.ceil(Math.log2(o/t)));for(let e=0;e<s;e++)n.push([i[0]+(a[0]-i[0])*e/s,i[1]+(a[1]-i[1])*e/s])}return a&&n.push([...r]),n}function Kc(e){if(e.index)throw TypeError(`Exact indexing requires non-indexed geometry`);if(Object.keys(e.morphAttributes).length)throw TypeError(`Exact indexing does not support morph attributes`);let t=Object.keys(e.attributes),n=t.map(t=>e.attributes[t]),r=e.attributes.position?.count??0;for(let e of n)if(e.isInterleavedBufferAttribute||!(e.array instanceof Float32Array)||e.count!==r||!Number.isInteger(e.itemSize)||e.itemSize<1)throw TypeError(`Exact indexing requires equally sized, non-interleaved Float32 attributes`);let i=n.map(e=>new Uint32Array(e.array.buffer,e.array.byteOffset,e.array.length)),a=new Uint32Array(r),o=new Uint32Array(r),s=1;for(;s<r*2;)s*=2;let c=new Int32Array(s),l=s-1,u=0;for(let e=0;e<r;e++){let t=2166136261;for(let r=0;r<n.length;r++){let a=n[r].itemSize,o=e*a;for(let e=0;e<a;e++)t=Math.imul(t^i[r][o+e],16777619)}t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16;let r=t&l;for(;c[r];){let t=c[r]-1,a=!0;for(let r=0;a&&r<n.length;r++){let o=n[r].itemSize,s=e*o,c=t*o;for(let e=0;e<o;e++)if(i[r][s+e]!==i[r][c+e]){a=!1;break}}if(a)break;r=r+1&l}c[r]?a[e]=a[c[r]-1]:(c[r]=e+1,a[e]=u,o[u++]=e)}let d=new $e;for(let e=0;e<n.length;e++){let r=n[e],a=r.itemSize,s=new Float32Array(u*a),c=new Uint32Array(s.buffer);for(let t=0;t<u;t++){let n=t*a,r=o[t]*a;for(let t=0;t<a;t++)c[n+t]=i[e][r+t]}let l=new z(s,a,r.normalized);l.name=r.name,l.setUsage(r.usage),l.gpuType=r.gpuType,d.setAttribute(t[e],l)}d.setIndex(new z(u<=65535?new Uint16Array(a):a,1)),d.name=e.name;for(let t of e.groups)d.addGroup(t.start,t.count,t.materialIndex);return d.setDrawRange(e.drawRange.start,e.drawRange.count),d.boundingBox=e.boundingBox?.clone()??null,d.boundingSphere=e.boundingSphere?.clone()??null,d}function qc(e){return Object.values(e.attributes).reduce((e,t)=>e+t.array.byteLength,0)+(e.index?.array.byteLength??0)}function Jc(e,t){let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let[t,o]of e[0]){if(!Number.isFinite(t)||!Number.isFinite(o))throw TypeError(`Map tiles require finite polygon coordinates`);n=Math.min(n,t),i=Math.max(i,t),r=Math.min(r,o),a=Math.max(a,o)}return{left:Math.floor(n/t),right:Math.ceil(i/t),top:Math.floor(r/t),bottom:Math.ceil(a/t)}}var Yc=(e,t,n,r,i)=>[[[[e*i,t*i],[n*i,t*i],[n*i,r*i],[e*i,r*i],[e*i,t*i]]]];function Xc(e,t=192){if(!(Number.isFinite(t)&&t>0))throw RangeError(`Map tile size must be positive and finite`);if(!Array.isArray(e))throw TypeError(`Map tiles require a MultiPolygon`);let n=[],r=[];for(let n=e.length-1;n>=0;n--){let i=e[n];!Array.isArray(i)||!Array.isArray(i[0])||i[0].length<3||r.push({polygon:i,...Jc(i,t)})}for(;r.length;){let{polygon:e,left:i,right:a,top:o,bottom:s}=r.pop();if(a<=i||s<=o)continue;if(a-i<=1&&s-o<=1){n.push(e);continue}let c=a-i>=s-o,l=Math.floor(c?(i+a)/2:(o+s)/2),u=c?[{left:i,right:l,top:o,bottom:s},{left:l,right:a,top:o,bottom:s}]:[{left:i,right:a,top:o,bottom:l},{left:i,right:a,top:l,bottom:s}];for(let n=u.length-1;n>=0;n--){let i=u[n],a=Un.intersection([e],Yc(i.left,i.top,i.right,i.bottom,t));for(let e=a.length-1;e>=0;e--){let n=a[e],o=Jc(n,t);r.push({polygon:n,left:Math.max(i.left,o.left),right:Math.min(i.right,o.right),top:Math.max(i.top,o.top),bottom:Math.min(i.bottom,o.bottom)})}}}return n}var Zc=new WeakMap,Qc=new J,$c={},el=Ut(.57,.092,235),tl=Ut(.615,.091,224),nl=Ut(.72,.082,202),rl=Ut(.64,.055,219),il=Ut(.75,.045,207),al=X.sand.clone().lerp(X.oceanLight,.32).multiplyScalar(.94),ol=X.rockLight.clone().lerp(X.oceanLight,.25).multiplyScalar(.87),sl=X.snow.clone().lerp(X.oceanLight,.26),cl={},ll=new v,ul=new v,dl=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e)),fl=(e,t,n)=>{let r=0,i=0;for(let a=0;a<e.length;a++){let o=n[a]-t[a];r+=(e[a]-t[a])*o,i+=o*o}let a=Math.max(0,Math.min(1,r/(i||1))),o=0;for(let r=0;r<e.length;r++)o+=(e[r]-t[r]-(n[r]-t[r])*a)**2;return o};function pl(e){if(!e.length)return null;let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let{a:r,b:i}of e)for(let e=0;e<3;e++)t[e]=Math.min(t[e],r[e],i[e]),n[e]=Math.max(n[e],r[e],i[e]);if(e.length<=8)return{min:t,max:n,items:e};let r=0;for(let e=1;e<3;e++)n[e]-t[e]>n[r]-t[r]&&(r=e);e.sort((e,t)=>e.a[r]+e.b[r]-(t.a[r]+t.b[r]));let i=e.length>>1;return{min:t,max:n,left:pl(e.slice(0,i)),right:pl(e.slice(i))}}function ml(e,t,n){let r=n*n,i=e=>e.min.reduce((n,r,i)=>n+Math.max(r-t[i],0,t[i]-e.max[i])**2,0),a=e=>{if(!(!e||i(e)>r)){if(e.items)for(let n of e.items)r=Math.min(r,fl(t,n.a,n.b));else i(e.left)<i(e.right)?(a(e.left),a(e.right)):(a(e.right),a(e.left))}};return a(e),Math.sqrt(r)}function hl(e){let t=e.terrainSource??e,n=t.biomes?.ocean??t.ocean;if(!n?.length)return null;let r=Zc.get(n);if(r)return r;let i=t.surface?.complete,a=i?t.bounds?.width??2*Math.PI*t.surface.radius:0,o=[],s=[],c=new J,l=new J;for(let e of n)for(let n of e)for(let e=0;e<n.length;e++){let r=n[e],u=n[(e+1)%n.length];r[0]===u[0]&&r[1]===u[1]||i&&(Math.abs(Math.abs(r[0])-a/2)<.002&&Math.abs(r[0]-u[0])<.002||Math.abs(Math.abs(r[1])-a/4)<.002&&Math.abs(r[1]-u[1])<.002)||(o.push({a:r,b:u,minX:Math.min(r[0],u[0]),maxX:Math.max(r[0],u[0]),minZ:Math.min(r[1],u[1]),maxZ:Math.max(r[1],u[1])}),i&&(it(t,...r,c).multiplyScalar(t.surface.radius),it(t,...u,l).multiplyScalar(t.surface.radius),s.push({a:c.toArray(),b:l.toArray()})))}return r={source:t,period:a,edges:new vn(o),sphere:pl(s)},Zc.set(n,r),r}function gl(e,t,n,r=1/0){let i=hl(e);if(!i)return r;let a=i.period?[0,-i.period,i.period]:[0],o=r;for(let e of a)o=i.edges.nearest(t+e,n,r=>Math.sqrt(fl([t+e,n],r.a,r.b)),o);return o}function _l(e,t,n,r=new v){let i=e.terrainSource??e;if(!i.surface?.complete)return r.copy(X.ocean);it(i,t,n,Qc),ze(i,t,n,$c);let{x:a,y:o,z:s}=Qc,c=Math.abs($c.latitude)/90,l=(Math.sin(a*5.1+o*2.3-s*3.7)+Math.sin(o*6.3+s*4.2+a*1.7))*.25+.5;r.copy(el).lerp(tl,.38+.42*l-.15*c);let u=dl((c-.5)/.43);r.lerp(rl,u*.26);let d=hl(i),f=(24+18*l)*(1-u*.32),p=d?.sphere?ml(d.sphere,[a*i.surface.radius,o*i.surface.radius,s*i.surface.radius],f*2):f*2,m=Math.exp(-((p/f)**2))*(.64-.16*c);return ul.copy(nl).lerp(il,u*.72),r.lerp(ul,m)}function vl(e,t,n,{map:r=!1,target:i=new v}={}){let a=e.terrainSource??e,o=a.biomes?.shoreWidth??a.shoreWidth??.9,s=gl(a,t,n,o*2);if(s>=o*1.5)return i.copy(X.sand);let c=dl(s/o);Hc(a,t,n,{map:r,target:i}),Ht(a,t,n,cl);let l=dl((cl.patch-.3)/.5)*.58,u=a.surface?.complete?dl((Math.abs(cl.latitude)-61)/18):0;return ll.copy(al).lerp(ol,l).lerp(sl,u*.8),i.lerp(ll,1-c)}function yl(e,t,n){let r=t.surface.projection?.radius??t.surface.radius,i=2*Math.PI*r,a=[];for(let t of e)for(let e of t)for(let t=0;t<e.length;t++){let n=e[t],r=e[(t+1)%e.length],o=r[0]-n[0],s=r[1]-n[1];o===0&&s===0||Math.abs(Math.abs(n[0])-i/2)<.002&&Math.abs(o)<.002||Math.abs(Math.abs(n[1])-i/4)<.002&&Math.abs(s)<.002||a.push({a:n,b:r,dx:o,dz:s,length2:o*o+s*s,minX:Math.min(n[0],r[0]),maxX:Math.max(n[0],r[0]),minZ:Math.min(n[1],r[1]),maxZ:Math.max(n[1],r[1])})}let o=new vn(a);return(e,t,r)=>{let a=48;for(let n of[0,-i,i]){let r=e+n;a=o.nearest(r,t,e=>{let n=Math.max(0,Math.min(1,((r-e.a[0])*e.dx+(t-e.a[1])*e.dz)/e.length2));return Math.hypot(r-e.a[0]-n*e.dx,t-e.a[1]-n*e.dz)},a)}let s=Math.max(0,Math.min(1,a/48)),c=s*s*(3-2*s);return Hc(n,e,t,{map:!0,target:r}),r.multiplyScalar(1-.07*c).lerp(X.forestFloor,.18*c).lerp(X.mountainFloor,.08*c)}}function bl(e,t=e){let n=t.surface?.type===`sphere`,r=t.surface?.complete,i=new Map;function a(a,o,s,c=!1,l=null){for(let u of r?Xc(a,128):a){let a=n?u.map(e=>Gc(e,8)):u,d=new k(a[0].map(([e,t])=>new Y(e,-t)));for(let e of a.slice(1))d.holes.push(new w(e.map(([e,t])=>new Y(e,-t))));let f=new G(d);if(f.rotateX(-Math.PI/2),f.translate(0,o,0),c&&!r){let t=f;f=Uc(t,e.colorField,{map:!0}),t.dispose()}if(n){for(let e of Object.keys(f.attributes))e!==`position`&&e!==`color`&&f.deleteAttribute(e);let t=f;if(f=Wc(t,r&&s===`terrain`?32:16),t.dispose(),r){let t=f;if(f=Kc(t),t.dispose(),c){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new v;for(let i=0;i<t.count;i++)Hc(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),n[i*3]=r.r,n[i*3+1]=r.g,n[i*3+2]=r.b;f.setAttribute(`color`,new z(n,3))}}}if(s===`sand`||l){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new v;for(let i=0;i<t.count;i++)l?l(t.getX(i),t.getZ(i),r):vl(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),r.toArray(n,i*3);f.setAttribute(`color`,new z(n,3))}n&&(f.scale(1,16,1),It(f,t));let p=f.index&&!r?f.toNonIndexed():f;i.has(s)||i.set(s,[]),i.get(s).push({position:p.attributes.position.array,vertexColor:p.attributes.color?.array,index:r?p.index?.array:void 0}),p!==f&&f.dispose(),p.dispose()}}a(e.land,0,`terrain`,!0),a(e.shores,.003,`sand`),a(e.river,.006,`waterLight`),t.surface?.complete||a(e.ocean,n?.01:.007,`ocean`);for(let n of e.mountains)a(n.low,.02,`contour0`,!1,r?yl(n.low,t,e.colorField):null),a(n.high,.023,`contour1`),a(n.snow,.033,`snow`);return[...i].map(([e,t])=>{let i=new Float32Array(t.reduce((e,t)=>e+t.position.length,0)),a=t[0].vertexColor?new Float32Array(i.length):void 0,o=0;for(let e of t)i.set(e.position,o),a?.set(e.vertexColor,o),o+=e.position.length;if(r){let n=new Uint32Array(t.reduce((e,t)=>e+t.index.length,0)),r=0,o=0;for(let e of t){for(let t of e.index)n[r++]=o+t;o+=e.position.length/3}return{color:e,position:i,index:n,...a?{vertexColor:a}:{}}}if(n){let t=new $e;t.setAttribute(`position`,new z(i,3)),a&&t.setAttribute(`color`,new z(a,3));let n=Kc(t);if(qc(n)<qc(t)){let r={color:e,position:n.attributes.position.array,index:n.index.array,...a?{vertexColor:n.attributes.color.array}:{}};return t.dispose(),n.dispose(),r}t.dispose(),n.dispose()}return{color:e,position:i,...a?{vertexColor:a}:{}}})}function xl(e,t){return e.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t},e.vertexShader=`uniform float mapSurfaceRadius; varying float globeLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
      vec3 viewNormal=mat3(viewMatrix)*radialNormal;
      globeLight=0.44+0.62*max(0.0,dot(viewNormal,normalize(vec3(-0.48,0.58,0.92))));`),e.fragmentShader=`varying float globeLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= globeLight;
 outgoingLight *= mix(vec3(0.91,0.97,1.05), vec3(1.04,1.01,0.93), smoothstep(0.50,1.0,globeLight));
#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`complete-globe-light-v2`,e}var Sl={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`},Cl={grass:X.grass.clone().lerp(X.trim,.1),farmland:X.farmland.clone().lerp(X.trim,.08),forestFloor:X.forestFloor.clone().lerp(X.grass,.27),desert:X.desert.clone(),mountainFloor:X.mountainFloor.clone().lerp(X.grass,.25),contour0:X.forestFloor.clone().lerp(X.grass,.32),contour1:X.rockLight.clone().lerp(X.grass,.2),ink:X.window.clone().lerp(X.rail,.18),paper:X.trim.clone()};function wl(e){let t=new k(e[0].map(([e,t])=>new Y(e,-t)));e.slice(1).forEach(e=>t.holes.push(new w(e.map(([e,t])=>new Y(e,-t)))));let n=new G(t);return n.rotateX(-Math.PI/2),n}function Tl(e,t){let n=e/2,r=(t-e)/2,i=new k;i.moveTo(-n,-r),i.lineTo(-n,r),i.absarc(0,r,n,Math.PI,0,!0),i.lineTo(n,-r),i.absarc(0,-r,n,0,-Math.PI,!0),i.closePath();let a=new G(i,2);return a.rotateX(-Math.PI/2),a}function El(e,t,n,r=1,i=1){let a=m.clamp(Math.round(Number(e.level)||1),1,10),s=(1.75+a*.12)*r,c=a<=3?[[-.61,.48],[.61,.48],[.61,-.1],[0,-.68],[-.61,-.1]]:a<=6?[[-.75,.48],[.75,.48],[.75,-.07],[.43,-.07],[.43,-.34],[0,-.68],[-.43,-.34],[-.43,-.07],[-.75,-.07]]:[[-.73,.48],[.73,.48],[.73,-.07],[.39,-.07],[.39,-.4],[.18,-.4],[.18,-.74],[-.18,-.74],[-.18,-.4],[-.39,-.4],[-.39,-.07],[-.73,-.07]],l=t?Oc(t):{body:X.roof,trim:X.trim},u=(e,t,n)=>{let r=wl([e]),a=r.toNonIndexed();r.dispose(),a.translate(0,n*i,0);let o=new Float32Array(a.attributes.position.count*3);for(let e=0;e<o.length;e+=3)o[e]=t.r,o[e+1]=t.g,o[e+2]=t.b;return a.setAttribute(`color`,new z(o,3)),a},d=(e,t,n)=>u(Array.from({length:12},(t,n)=>[Math.cos(n*Math.PI/6)*s*e,Math.sin(n*Math.PI/6)*s*e]),t,n),f=d(1,Cl.ink,.091),p=d(.89,l.trim,.094),h=u(c.map(([e,t])=>[e*s,t*s]),l.body,.097),g=Qo([f,p,h],!1);f.dispose(),p.dispose(),h.dispose();let _=g.attributes.position.count,v=new Float32Array(_*3);for(let e=0;e<_;e++)l.body.toArray(v,e*3);g.setAttribute(`cityDotColor`,new z(v,3)),g.setAttribute(`cityCompactScale`,new z(new Float32Array(_).fill(Fo/(2*Io(a))),1));let y=new o(g,n);return y.name=`map-city-${e.id}`,y.position.set(e.x,0,e.z),y.userData={cityId:e.id,ownerId:e.ownerId??null,level:a},y}function Dl(e,t){let n=t.surface?.type===`sphere`,r=n?16:1,i=new dt;i.name=`map-world`,e.add(i);let a=new dt;a.name=`map-static`,i.add(a);let s=new dt;s.name=`map-cities`,i.add(s);let c=new dt;c.name=`map-trains`,i.add(c);let l=new Map((t.players??[]).map(e=>[e.id,e])),u=new Map([...l].map(([e,t])=>[`player:${e}:body`,Oc(t).body])),d=e=>l.has(e.state?.ownerId)?`player:${e.state.ownerId}:body`:Sl[e.state?.color]??e.state?.color??`redLight`,f=m.clamp(Math.sqrt((t.bounds?.width??130)*(t.bounds?.depth??95)/12350),1,2.6),p=new Map,h=new Map,g=new Set,_=[],v=[],y=[],b=new J,x=new J,S=new J,C=new J,w=new J,T=new J,E=(e,n)=>(Ne(t,e.x,e.z,n),n.setPosition(Ve(t,e.x,0,e.z,b)),n),D={cityBatches:0,trainBatches:0,updatedCars:0,staticVertices:0,farTrains:!1,declutterPasses:0,cityAttributeUpdates:0,networkVisibility:1},O={value:1},k={value:1},A={value:1},j=!1,M=(e,r=!1)=>{p.has(e)||p.set(e,new Qe({name:`map-${e}`,color:r||e===`terrain`?16777215:u.get(e)??Cl[e.replace(`route-`,``)]??X[e]??X.trim,vertexColors:r||e===`terrain`,side:2,toneMapped:!1}));let i=p.get(e);if(e.startsWith(`route-`)&&!i.userData.routeShader&&(i.userData.routeShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapRouteScale=O,e.vertexShader=`attribute vec3 routeOffset; uniform float mapRouteScale;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position) + routeOffset * (mapRouteScale - 1.0);`)},i.customProgramCacheKey=()=>`map-route-width`),n&&[`terrain`,`sand`,`waterLight`,`ocean`,`contour0`,`contour1`,`snow`].includes(e)&&!i.userData.surfaceShader&&(i.userData.surfaceShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t.surface.radius},e.vertexShader=`uniform float mapSurfaceRadius; varying float surfaceLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
          vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
          surfaceLight=0.52+0.52*max(0.0,dot(radialNormal,normalize(vec3(-0.45,0.82,0.35))));`),e.fragmentShader=`varying float surfaceLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= surfaceLight;
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>`map-surface-light`,t.surface.complete&&xl(i,t.surface.radius)),!i.userData.mapStyle){i.userData.mapStyle=!0;let t=e.startsWith(`route-`)||e===`paper`||e.startsWith(`player:`)||Object.values(Sl).includes(e);qt(i,{kind:t?`map-symbol`:[`ocean`,`waterLight`].includes(e)?`water`:`map`,role:e.endsWith(`paper`)?`paper`:e.endsWith(`ink`)?`ink`:`owner`}),t&&Ro(i,A)}return i},N=(e,t,n=0,r=0,i=0,a=0)=>{e.rotateY(a),e.translate(r,n,i);let o=e.index?e.toNonIndexed():e;o!==e&&e.dispose();for(let e of Object.keys(o.attributes))e!==`position`&&e!==`routeOffset`&&o.deleteAttribute(e);h.has(t)||h.set(t,[]),h.get(t).push(o)},ee=(e,i,a,o)=>{let s=[],c=[];for(let o=0;o<e.length-1;o++){let l=e[o],u=e[o+1],d=u.x-l.x,f=u.z-l.z,p=Math.hypot(d,f)||1,m=e=>e.tangent?{x:e.tangent.z,z:-e.tangent.x}:{x:f/p,z:-d/p},h=m(l),g=m(u),_=[{x:l.x-h.x*i/2,z:l.z-h.z*i/2},{x:l.x+h.x*i/2,z:l.z+h.z*i/2},{x:u.x-g.x*i/2,z:u.z-g.z*i/2},{x:u.x+g.x*i/2,z:u.z+g.z*i/2}],v=n?[l,u].flatMap((e,n)=>{let o=n?g:h;return Ve(t,e.x,a*r,e.z,S),it(t,e.x,e.z,C),Ot(t,e.x,a*r,e.z,-o.z,0,o.x,w).normalize(),T.crossVectors(C,w).normalize(),[-1,1].map(e=>(x.copy(S).addScaledVector(T,e*i/2),x.y+=t.surface.radius,x.setLength(t.surface.radius+a*r),x.y-=t.surface.radius,x.clone()))}):null;for(let e of[0,2,1,1,2,3]){let i=e<2?l:u,o=_[e];n?(x.copy(v[e]),Ve(t,i.x,a*r,i.z,S),s.push(x.x,x.y,x.z),c.push(x.x-S.x,x.y-S.y,x.z-S.z)):(s.push(o.x,a,o.z),c.push(o.x-i.x,0,o.z-i.z))}}let l=new $e;l.setAttribute(`position`,new Re(s,3)),l.setAttribute(`routeOffset`,new Re(c,3)),N(l,o)},P=t.mapTerrain??Fc(t);for(let{color:e,position:n,vertexColor:r,index:i}of P.meshes??bl(P,t)){let t=new $e;t.setAttribute(`position`,new z(n,3)),i&&t.setIndex(new z(i,1)),r&&t.setAttribute(`color`,new z(r,3)),h.set(e,[t])}for(let e of t.lines)for(let t of e.renderRanges??[{start:0,end:e.length}]){let r=[t.start];for(let i of e.alignment?.segments??[{startDistance:0,endDistance:e.length,type:`arc`,radius:8}]){let e=Math.max(t.start,i.startDistance),a=Math.min(t.end,i.endDistance);if(a<=e)continue;let o=i.type===`line`?a-e:Math.max(.4,Math.sqrt(8*(i.radius??8)*.025)),s=n?Math.min(8,o):o,c=Math.max(1,Math.ceil((a-e)/s));for(let t=1;t<=c;t++)r.push(e+(a-e)*t/c)}let i=r.map(t=>sc(e,t));ee(i,.96,.075,`route-paper`),ee(i,.42,.078,`route-ink`)}for(let[e,t]of h){let n=Qo(t,!1);g.add(n);let r=new o(n,M(e,!!n.attributes.color));r.name=`map-${e.replace(`route-`,``)}`,a.add(r),e.startsWith(`route-`)&&(r.frustumCulled=!1,y.push(r)),D.staticVertices+=n.attributes.position.count,t.forEach(e=>e.dispose())}h.clear();let F=new Qe({name:`map-city`,vertexColors:!0,side:2,toneMapped:!1});F.onBeforeCompile=e=>{e.uniforms.mapCityScale=k,e.vertexShader=`uniform float mapCityScale; attribute float cityDetail; attribute float cityCompactScale; attribute vec3 cityDotColor;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,`#include <color_vertex>
      #ifdef USE_COLOR
        vColor.xyz=mix(cityDotColor,vColor.xyz,cityDetail);
      #endif`),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`float citySize=mapCityScale*mix(cityCompactScale,1.0,cityDetail); vec3 transformed = vec3(position.x * citySize, position.y, position.z * citySize);`)},F.customProgramCacheKey=()=>`map-city-screen-size-v2`,qt(F,{kind:`map-symbol`,role:`owner`}),Ro(F,A),p.set(`city-glyph`,F);let te=(e,r,i=0,a=!1)=>v.push({city:e,attribute:r,index:i,instanced:a,detail:1,target:1,anchor:Ve(t,e.x,0,e.z),normal:n?it(t,e.x,e.z):null});if((t.cities?.length??0)<=32)for(let e of t.cities??[]){let t=El(e,l.get(e.ownerId),F,f,r),i=new z(new Float32Array(t.geometry.attributes.position.count).fill(1),1);i.setUsage(xe),t.geometry.setAttribute(`cityDetail`,i),te(e,i),n&&(t.matrixAutoUpdate=!1,E(e,t.matrix)),t.frustumCulled=!1,g.add(t.geometry),s.add(t)}else{let e=new Map,n=new tt;for(let n of t.cities){let t=`${n.ownerId}:${n.level}`;e.has(t)||e.set(t,[]),e.get(t).push(n)}for(let[t,i]of e){let e=El(i[0],l.get(i[0].ownerId),F,f,r),a=new Dt(new Float32Array(i.length).fill(1),1);a.setUsage(xe),e.geometry.setAttribute(`cityDetail`,a),g.add(e.geometry);let o=new Fe(e.geometry,F,i.length);o.frustumCulled=!1,o.name=`map-city-batch-${t}`,o.userData.instanceCityIds=i.map(e=>e.id),i.forEach((e,t)=>{E(e,n),o.setMatrixAt(t,n),te(e,a,t,!0)}),o.computeBoundingSphere(),s.add(o),_.push(o)}}D.cityBatches=s.children.length,v.sort((e,t)=>(t.city.level??1)-(e.city.level??1)||String(e.city.id).localeCompare(String(t.city.id)));let ne=new J(1/0,0,0),I=new _t,L=new J,R=new J,B=new J,V=NaN,re=NaN,ie=NaN,ae=1/0;function oe(e,t,n,r,a){if(!e?.isOrthographicCamera||!v.length)return;let o=(e.right-e.left)/(e.top-e.bottom),s=n*o;if(ae+=r,(Math.abs(Math.log(t/V))>.015||re!==n||ie!==o||e.position.distanceToSquared(ne)>(t*2)**2||e.quaternion.angleTo(I)>.003)&&ae>=.075){i.updateWorldMatrix(!0,!1),e.getWorldDirection(B);let r=zo(v.map(t=>{L.copy(t.anchor).applyMatrix4(i.matrixWorld).project(e);let r=!t.normal||R.copy(t.normal).transformDirection(i.matrixWorld).dot(B)<-.035;return{id:t.city.id,x:L.x*s/2,y:L.y*n/2,radius:Io(t.city.level),previous:t.target,visible:r&&Math.abs(L.x)<1+2*Io(10)/s&&Math.abs(L.y)<1+2*Io(10)/n&&Math.abs(L.z)<=1}}),t);for(let e of v)e.target=r.get(e.city.id);ne.copy(e.position),I.copy(e.quaternion),V=t,re=n,ie=o,ae=0,D.declutterPasses++}let c=a?1:1-Math.exp(-12*Math.min(.1,Math.max(0,r))),l=new Set;for(let e of v){let t=Math.abs(e.detail-e.target)<.002?e.target:e.detail+(e.target-e.detail)*c;t!==e.detail&&(e.detail=t,e.instanced?e.attribute.setX(e.index,t):e.attribute.array.fill(t),l.add(e.attribute))}for(let e of l)e.needsUpdate=!0,D.cityAttributeUpdates++}let H=Math.min(f,1.8),U=Tl(1.22*H,2.45),se=Tl(.92*H,2.13);for(let e of[U,se])g.add(e);let ce=new J,le=new J,ue=new _t,de=null,fe=[],W=[],pe=[],me=[],he=!1,ge=new J,_e=new J,ve=new J,ye=new J,be={},G={},K=NaN,Se=NaN,Ce=(e,t,n,r)=>{let i=new Fe(e,M(t),n);return i.name=r,i.frustumCulled=!1,i.instanceMatrix.setUsage(xe),c.add(i),i},q=(e,i,a,o,s,c,l,u=1,d=1)=>{let f=e.instanceMatrix.array,p=i*16,m=Math.cos(s)*l,h=Math.sin(s)*l;if(n){(a!==K||o!==Se)&&(it(t,a,o,_e),K=a,Se=o),Ve(t,a,c*r,o,ge),Ot(t,a,c*r,o,h,0,m,ve).normalize(),ye.crossVectors(_e,ve).normalize();for(let e=0;e<3;e++)f[p+e]=ye.getComponent(e)*l*u,f[p+4+e]=_e.getComponent(e)*l,f[p+8+e]=ve.getComponent(e)*l*d;f[p+12]=ge.x,f[p+13]=ge.y,f[p+14]=ge.z}else f[p]=m*u,f[p+1]=0,f[p+2]=-h*u,f[p+4]=0,f[p+5]=l,f[p+6]=0,f[p+8]=h*d,f[p+9]=0,f[p+10]=m*d,f[p+12]=a,f[p+13]=c,f[p+14]=o;f[p+3]=0,f[p+7]=0,f[p+11]=0,f[p+15]=1};function we(e=[],{visible:r=!0,camera:a,viewportHeight:o=900,poseBuffer:l=e.poseBuffer,dt:u=1/60,reducedMotion:p=!1}={}){if(D.updatedCars=0,j||!r)return;let m=a?.isOrthographicCamera?(a.top-a.bottom)/a.zoom/Math.max(1,o):0,h=Bo(m,f,H);O.value=h.routeScale,k.value=h.cityScale,A.value=D.networkVisibility=Lo(a?.zoom);let g=A.value>0;s.visible=c.visible=g;for(let e of y)e.visible=g;if(!g)return;oe(a,m,o,u,p);let _=h.trainScaleZ>1,v=de!==e||W.length!==e.length||he!==_;he=_,D.farTrains=he;for(let t=0;!v&&t<e.length;t++)v=W[t]!==e[t].state?.ownerId||pe[t]!==e[t].state?.color||me[t]!==e[t].parts;if(v){c.children.forEach(e=>e.dispose()),c.clear(),fe=[],de=e,W=e.map(e=>e.state?.ownerId),pe=e.map(e=>e.state?.color),me=e.map(e=>e.parts);let t=e.flatMap(e=>(he?[e.parts[Math.floor(e.parts.length/2)]]:e.parts).filter(Boolean).map(t=>({train:e,part:t}))),n=t.length;if(n){let e=Ce(U,`paper`,n,`map-train-outlines`),r=new Map;for(let{train:e}of t){let t=d(e);r.set(t,(r.get(t)??0)+1)}let i=new Map([...r].map(([e,t])=>[e,{mesh:Ce(se,e,t,`map-train-${e}`),next:0}]));t.forEach(({train:t,part:n},r)=>{let a=i.get(d(t));fe.push({train:t,part:n,outlineIndex:r,outline:e,body:a.mesh,bodyIndex:a.next++})})}D.trainBatches=c.children.length}i.updateWorldMatrix(!0,!1);let b=he?h.trainScaleX:1,x=he?h.trainScaleZ:1;for(let e of fe){let{train:r,part:a}=e,o,s,c,u;if(l&&a.userData.poseOnly){let e=a.userData.poseIndex*6;o=l[e],s=l[e+2],c=l[e+3],u=+(l[e+4]>0&&r.state?.active!==!1)}else a.userData.poseOnly?(o=a.position.x,s=a.position.z,c=a.rotation.y,u=a.visible&&r.state?.active!==!1?1:0):(a.getWorldPosition(ce),a.getWorldQuaternion(ue),le.set(0,0,1).applyQuaternion(ue).add(ce),i.worldToLocal(ce),i.worldToLocal(le),le.sub(ce),n?(xt(t,ce,be),xt(t,le.add(ce),G),o=be.x,s=be.z,c=Math.atan2(G.x-o,G.z-s)):(o=ce.x,s=ce.z,c=Math.atan2(le.x,le.z)),u=a.visible&&r.state?.active!==!1?1:0);q(e.outline,e.outlineIndex,o,s,c,.12,u,b,x),q(e.body,e.bodyIndex,o,s,c,.123,u,b,x),D.updatedCars++}c.children.forEach(e=>{e.instanceMatrix.needsUpdate=!0})}function Te(){j||(j=!0,c.children.forEach(e=>e.dispose()),_.forEach(e=>e.dispose()),g.forEach(e=>e.dispose()),p.forEach(e=>e.dispose()),i.clear(),i.removeFromParent())}return{root:i,update:we,dispose:Te,stats:D}}var Ol=1.25,kl=65535,Al=2**-24,jl=Symbol(`SKIP_GENERATION`),Ml={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[jl]:!1};function Nl(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function Pl(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function Fl(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],a=t[e+2*r+1],o=i-a,s=i+a;o<n[r]&&(n[r]=o),s>n[r+3]&&(n[r+3]=s)}}function Il(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function Ll(e,t){return t[e+15]===kl}function Rl(e,t){return t[e+6]}function zl(e,t){return t[e+14]}function Bl(e){return e+8}function Vl(e,t){return e+t[e+6]*8}function Hl(e,t){return t[e+7]}function Ul(e){return e}function Wl(e,t,n,r,i){let a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,m=-1/0,h=-1/0,g=-1/0,_=e.offset||0;for(let r=(t-_)*6,i=(t+n-_)*6;r<i;r+=6){let t=e[r+0],n=e[r+1],i=t-n,_=t+n;i<a&&(a=i),_>c&&(c=_),t<d&&(d=t),t>m&&(m=t);let v=e[r+2],y=e[r+3],b=v-y,x=v+y;b<o&&(o=b),x>l&&(l=x),v<f&&(f=v),v>h&&(h=v);let S=e[r+4],C=e[r+5],w=S-C,T=S+C;w<s&&(s=w),T>u&&(u=T),S<p&&(p=S),S>g&&(g=S)}r[0]=a,r[1]=o,r[2]=s,r[3]=c,r[4]=l,r[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=m,i[4]=h,i[5]=g}var Gl=8,Kl=8,ql=new Int32Array(Gl),Jl=new Float32Array(48),Yl=new Float32Array(48),Xl=new Float32Array(6),Zl=new Float32Array(6),Ql=new Int32Array(Kl),$l=new Float32Array(48);function eu(e,t,n,r){for(let i=0;i<3;i++){let a=t[e+2*i],o=t[e+2*i+1],s=a-o,c=a+o;s<n[r+i]&&(n[r+i]=s),c>n[r+i+3]&&(n[r+i+3]=c)}}function tu(e,t){let n=e[t+3]-e[t],r=e[t+4]-e[t+1],i=e[t+5]-e[t+2];return 2*(n*r+r*i+i*n)}function nu(e,t,n,r,i,a){let o=-1,s=0;if(a===0)o=Pl(t),o!==-1&&(s=(t[o]+t[o+3])/2);else if(a===1)o=Pl(e),o!==-1&&(s=ru(n,r,i,o));else if(a===2){let a=Il(e),c=Ol*i,l=n.offset||0,u=(r-l)*6,d=(r+i-l)*6;for(let e=0;e<3;e++){let r=t[e],l=(t[e+3]-r)/Gl;if(i<Kl){for(let t=0;t<i;t++){let r=u+t*6,i=n[r+2*e],a=t;for(;a>0&&n[Ql[a-1]+2*e]>i;)Ql[a]=Ql[a-1],a--;Ql[a]=r}for(let e=0;e<3;e++)Xl[e]=1/0,Xl[e+3]=-1/0,Zl[e]=1/0,Zl[e+3]=-1/0;for(let e=i-1;e>=0;e--)Fl(Ql[e],n,Zl),$l.set(Zl,e*6);for(let t=0;t<i-1;t++){Fl(Ql[t],n,Xl);let r=n[Ql[t+1]+2*e];if(n[Ql[t]+2*e]===r)continue;let l=t+1,u=i-l,d=Il(Xl)/a,f=tu($l,l*6)/a,p=1+Ol*(d*l+f*u);p<c&&(o=e,c=p,s=r)}}else{for(let e=0;e<Gl;e++){ql[e]=0;for(let t=0;t<3;t++)Jl[e*6+t]=1/0,Jl[e*6+t+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((n[t+2*e]-r)/l);i>=Gl&&(i=7),ql[i]++,eu(t,n,Jl,i*6)}for(let e=0;e<6;e++)Yl[42+e]=Jl[42+e];for(let e=6;e>=0;e--){let t=e*6,n=t+6;for(let e=0;e<3;e++)Yl[t+e]=Math.min(Jl[t+e],Yl[n+e]),Yl[t+e+3]=Math.max(Jl[t+e+3],Yl[n+e+3])}let t=0;for(let n=0;n<7;n++){let u=n*6,d=ql[n];if(d!==0)for(let e=0;e<3;e++)t===0?(Xl[e]=Jl[u+e],Xl[e+3]=Jl[u+e+3]):(Xl[e]=Math.min(Xl[e],Jl[u+e]),Xl[e+3]=Math.max(Xl[e+3],Jl[u+e+3]));t+=d;let f=0,p=0;t!==0&&(f=Il(Xl)/a);let m=i-t;m!==0&&(p=tu(Yl,u+6)/a);let h=1+Ol*(f*t+p*m);h<c&&(o=e,c=h,s=r+l+n*l)}}}}else typeof a==`function`?{axis:o,pos:s}=a(e,t,n,r,i,n.offset):console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:o,pos:s}}function ru(e,t,n,r){let i=0,a=e.offset;for(let o=t,s=t+n;o<s;o++)i+=e[(o-a)*6+r*2];return i/n}function iu(e,t,n,r,i,a){let o=r,s=r+i-1,c=a.pos,l=a.axis*2,u=n.offset||0;for(;;){for(;o<=s&&n[(o-u)*6+l]<c;)o++;for(;o<=s&&n[(s-u)*6+l]>=c;)s--;if(o<s){for(let n=0;n<t;n++){let r=e[o*t+n];e[o*t+n]=e[s*t+n],e[s*t+n]=r}for(let e=0;e<6;e++){let t=o-u,r=s-u,i=n[t*6+e];n[t*6+e]=n[r*6+e],n[r*6+e]=i}o++,s--}else return o}}var au=2**32,ou=new Float32Array(6),su=new Float32Array(6);function cu(e,t,n,r,i,a){let{maxDepth:o,verbose:s,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:u,onProgress:d,useSharedArrayBuffer:f=!1}=i,p=e.primitiveBuffer,m=e.primitiveBufferStride,h=new(f?SharedArrayBuffer:ArrayBuffer)(32*Math.max(1,2*Math.ceil(r)-1)),g=new Float32Array(h),_=new Uint32Array(h),v=new Uint16Array(h),y=0,b=!1;return Wl(t,n,r,ou,su),C(n,r,0),h.slice(0,y*32);function x(e){d&&d((e-a.offset)/a.count)}function S(e,t,n){let r=e*2;_[e+6]=t,v[r+14]=n,v[r+15]=kl,x(t+n)}function C(e,n,r){let i=y++,a=i*8;g.set(ou,a),!b&&r>=o&&(b=!0,s&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));let d=n>l;if(n<=c&&!d||r>=o){S(a,e,n);return}let f=nu(ou,su,t,e,n,u),h=f.axis===-1?-1:iu(p,m,t,e,n,f);if(f.axis===-1||h===e||h===e+n){if(!d){S(a,e,n);return}f.axis=Math.max(0,Pl(ou)),h=e+Math.max(1,Math.floor(n/2))}_[a+7]=f.axis;let v=h-e;Wl(t,e,v,ou,su),C(e,v,r+1);let x=y-i;if(x>au)throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);_[a+6]=x;let w=n-v;Wl(t,h,w,ou,su),C(h,w,r+1)}}function lu(e,t){let n=e.getRootRanges(t.range),r=n[0],i=n[n.length-1],a={offset:r.offset,count:i.offset+i.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,e.computePrimitiveBounds(a.offset,a.count,o),e._roots=n.map(n=>cu(e,o,n.offset,n.count,t,a))}var uu=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},du=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},fu,pu,mu=[],hu=new uu(()=>new h);function gu(e,t,n,r,i,a){fu=hu.getPrimitive(),pu=hu.getPrimitive(),mu.push(fu,pu),du.setBuffer(e._roots[t]);let o=_u(0,e.geometry,n,r,i,a);du.clearBuffer(),hu.releasePrimitive(fu),hu.releasePrimitive(pu),mu.pop(),mu.pop();let s=mu.length;return s>0&&(pu=mu[s-1],fu=mu[s-2]),o}function _u(e,t,n,r,i=null,a=0,o=0){let{float32Array:s,uint16Array:c,uint32Array:l}=du,u=e*2;if(Ll(u,c)){let t=Rl(e,l),n=zl(u,c);return Nl(Ul(e),s,fu),r(t,n,!1,o,a+e/8,fu)}{let u=Bl(e),d=Vl(e,l),f=u,p=d,m,h,g,_;if(i&&(g=fu,_=pu,Nl(Ul(f),s,g),Nl(Ul(p),s,_),m=i(g),h=i(_),h<m)){f=d,p=u;let e=m;m=h,h=e,g=_}g||(g=fu,Nl(Ul(f),s,g));let v=Ll(f*2,c),y=n(g,v,m,o+1,a+f/8),b;if(y===2){let e=w(f);b=r(e,T(f)-e,!0,o+1,a+f/8,g)}else b=y&&_u(f,t,n,r,i,a,o+1);if(b)return!0;_=pu,Nl(Ul(p),s,_);let x=Ll(p*2,c),S=n(_,x,h,o+1,a+p/8),C;if(S===2){let e=w(p);C=r(e,T(p)-e,!0,o+1,a+p/8,_)}else C=S&&_u(p,t,n,r,i,a,o+1);return!!C;function w(e){let{uint16Array:t,uint32Array:n}=du,r=e*2;for(;!Ll(r,t);)e=Bl(e),r=e*2;return Rl(e,n)}function T(e){let{uint16Array:t,uint32Array:n}=du,r=e*2;for(;!Ll(r,t);)e=Vl(e,n),r=e*2;return Rl(e,n)+zl(r,t)}}}var vu=new du.constructor,yu=new du.constructor,bu=new uu(()=>new h),xu=new h,Su=new h,Cu=new h,wu=new h,Tu=!1;function Eu(e,t,n,r){if(Tu)throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);Tu=!0;let i=e._roots,a=t._roots,o,s=0,c=0,l=new tt().copy(n).invert();for(let e=0,t=i.length;e<t;e++){vu.setBuffer(i[e]),c=0;let t=bu.getPrimitive();Nl(Ul(0),vu.float32Array,t),t.applyMatrix4(l);for(let e=0,i=a.length;e<i&&(yu.setBuffer(a[e]),o=Du(0,0,n,l,r,s,c,0,0,t),yu.clearBuffer(),c+=a[e].byteLength/32,!o);e++);if(bu.releasePrimitive(t),vu.clearBuffer(),s+=i[e].byteLength/32,o)break}return Tu=!1,o}function Du(e,t,n,r,i,a=0,o=0,s=0,c=0,l=null,u=!1){let d,f;u?(d=yu,f=vu):(d=vu,f=yu);let p=d.float32Array,m=d.uint32Array,h=d.uint16Array,g=f.float32Array,_=f.uint32Array,v=f.uint16Array,y=e*2,b=t*2,x=Ll(y,h),S=Ll(b,v),C=!1;if(S&&x)C=u?i(Rl(t,_),zl(t*2,v),Rl(e,m),zl(e*2,h),c,o+t/8,s,a+e/8):i(Rl(e,m),zl(e*2,h),Rl(t,_),zl(t*2,v),s,a+e/8,c,o+t/8);else if(S){let l=bu.getPrimitive();Nl(Ul(t),g,l),l.applyMatrix4(n);let d=Bl(e),f=Vl(e,m);Nl(Ul(d),p,xu),Nl(Ul(f),p,Su);let h=l.intersectsBox(xu),_=l.intersectsBox(Su);C=h&&Du(t,d,r,n,i,o,a,c,s+1,l,!u)||_&&Du(t,f,r,n,i,o,a,c,s+1,l,!u),bu.releasePrimitive(l)}else{let d=Bl(t),f=Vl(t,_);Nl(Ul(d),g,Cu),Nl(Ul(f),g,wu);let h=l.intersectsBox(Cu),v=l.intersectsBox(wu);if(h&&v)C=Du(e,d,n,r,i,a,o,s,c+1,l,u)||Du(e,f,n,r,i,a,o,s,c+1,l,u);else if(h){if(x)C=Du(e,d,n,r,i,a,o,s,c+1,l,u);else{let t=bu.getPrimitive();t.copy(Cu).applyMatrix4(n);let l=Bl(e),f=Vl(e,m);Nl(Ul(l),p,xu),Nl(Ul(f),p,Su);let h=t.intersectsBox(xu),g=t.intersectsBox(Su);C=h&&Du(d,l,r,n,i,o,a,c,s+1,t,!u)||g&&Du(d,f,r,n,i,o,a,c,s+1,t,!u),bu.releasePrimitive(t)}}else if(v){if(x)C=Du(e,f,n,r,i,a,o,s,c+1,l,u);else{let t=bu.getPrimitive();t.copy(wu).applyMatrix4(n);let l=Bl(e),d=Vl(e,m);Nl(Ul(l),p,xu),Nl(Ul(d),p,Su);let h=t.intersectsBox(xu),g=t.intersectsBox(Su);C=h&&Du(f,l,r,n,i,o,a,c,s+1,t,!u)||g&&Du(f,d,r,n,i,o,a,c,s+1,t,!u),bu.releasePrimitive(t)}}}return C}var Ou=new class{constructor(){let e=null,t=null,n=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(i,a)=>{if(r)throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);this.root=a,this.buffer=e=i._roots[a],this.uint16Array=n=new Uint16Array(e),this.uint32Array=t=new Uint32Array(e)},this.reset=()=>{this.root=null,this.buffer=e=null,this.uint16Array=n=null,this.uint32Array=t=null},this.getRangeStart=e=>{let r=e*2;for(;!Ll(r,n);)e=Bl(e),r=e*2;return Rl(e,t)},this.getRangeEnd=e=>{let r=e*2;for(;!Ll(r,n);)e=Vl(e,t),r=e*2;return Rl(e,t)+zl(r,n)};let i=(e,r,a)=>{let o=Ll(r*2,n);if(!e(a,o,r)&&!o){let n=Bl(r),o=Vl(r,t);i(e,n,a+1),i(e,o,a+1)}};this.traverseBuffer=e=>{if(r)throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);r=!0;try{i(e,0,0)}finally{r=!1}},this.traverse=r=>{this.traverseBuffer((i,a,o)=>{if(a){let s=o*2,c=t[o+6],l=n[s+14];return r(i,a,new Float32Array(e,o*4,6),c,l)}{let n=Hl(o,t);return r(i,a,new Float32Array(e,o*4,6),n)}})}}},ku=`0.10.0`,Au=new h,ju=new Float32Array(6);typeof window<`u`&&(window.__THREE_MESH_BVH__?console.warn(`three-mesh-bvh: Multiple instances of three-mesh-bvh being imported.`):window.__THREE_MESH_BVH__=ku);var Mu=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Ml,...e},lu(this,e)}getRootRanges(){throw Error(`BVH: getRootRanges() not implemented`)}writePrimitiveBounds(){throw Error(`BVH: writePrimitiveBounds() not implemented`)}writePrimitiveRangeBounds(e,t,n,r){let i=1/0,a=1/0,o=1/0,s=-1/0,c=-1/0,l=-1/0;for(let n=e,r=e+t;n<r;n++){this.writePrimitiveBounds(n,ju,0);let[e,t,r,u,d,f]=ju;e<i&&(i=e),u>s&&(s=u),t<a&&(a=t),d>c&&(c=d),r<o&&(o=r),f>l&&(l=f)}return n[r+0]=i,n[r+1]=a,n[r+2]=o,n[r+3]=s,n[r+4]=c,n[r+5]=l,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let i=e,a=e+t;i<a;i++){this.writePrimitiveBounds(i,ju,0);let[e,t,a,o,s,c]=ju,l=(e+o)/2,u=(t+s)/2,d=(a+c)/2,f=(o-e)/2,p=(s-t)/2,m=(c-a)/2,h=(i-r)*6;n[h+0]=l,n[h+1]=f+(Math.abs(l)+f)*Al,n[h+2]=u,n[h+3]=p+(Math.abs(u)+p)*Al,n[h+4]=d,n[h+5]=m+(Math.abs(d)+m)*Al}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t){if(t.BYTES_PER_ELEMENT===2&&t.some(t=>t+e>=2**16)){let e=t.buffer.constructor;t=new Uint32Array(new e(4*t.length)),t.set(this._indirectBuffer),this._indirectBuffer=t}for(let n=0,r=t.length;n<r;n++)t[n]+=e}else{let t=this._roots;for(let n=0;n<t.length;n++){let r=t[n],i=new Uint32Array(r),a=new Uint16Array(r),o=r.byteLength/32;for(let t=0;t<o;t++){let n=8*t;Ll(2*n,a)&&(i[n+6]+=e)}}}}traverse(e,t=0){Ou.setBVH(this,t),Ou.traverse(e),Ou.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n),a=new Float32Array(n),o=n.byteLength/32;for(let e=o-1;e>=0;e--){let t=e*8,n=t*2;if(Ll(n,i)){let e=Rl(t,r),o=zl(n,i);this.writePrimitiveRangeBounds(e,o,ju,0),a.set(ju,t)}else{let e=Bl(t),n=Vl(t,r);for(let r=0;r<3;r++){let i=a[e+r],o=a[e+r+3],s=a[n+r],c=a[n+r+3];a[t+r]=i<s?i:s,a[t+r+3]=o>c?o:c}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{Nl(0,new Float32Array(t),Au),e.union(Au)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:i,scratchPrimitive:a,iterate:o}=e;if(r&&i){let e=r;r=(t,n,r,s,c)=>e(t,n,r,s,c)?!0:o(t,n,this,i,r,s,a)}else r||=i?(e,t,n,r)=>o(e,t,this,i,n,r,a):(e,t,n)=>n;let s=!1,c=0,l=this._roots;for(let e=0,i=l.length;e<i;e++){let i=l[e];if(s=gu(this,e,n,r,t,c),s)break;c+=i.byteLength/32}return s}bvhcast(e,t,n){let{intersectsRanges:r}=n;return Eu(this,e,t,r)}};function Nu(){return typeof SharedArrayBuffer<`u`}function Pu(e){return e.index?e.index.count:e.attributes.position.count}function Fu(e){return Pu(e)/3}function Iu(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function Lu(e,t){if(!e.index){let n=e.attributes.position.count,r=Iu(n,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new z(r,1));for(let e=0;e<n;e++)r[e]=e}}function Ru(e,t,n){let r=Pu(e)/n,i=t||e.drawRange,a=i.start/n,o=(i.start+i.count)/n,s=Math.max(0,a),c=Math.min(r,o)-s;return{offset:Math.floor(s),count:Math.floor(c)}}function zu(e,t){return e.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Bu(e,t,n){let r=Ru(e,t,n),i=zu(e,n);if(!i.length)return[r];let a=[],o=r.offset,s=r.offset+r.count,c=Pu(e)/n,l=[];for(let e of i){let{offset:t,count:n}=e,r=t,i=t+(isFinite(n)?n:c-t);r<s&&i>o&&(l.push({pos:Math.max(o,r),isStart:!0}),l.push({pos:Math.min(s,i),isStart:!1}))}l.sort((e,t)=>e.pos===t.pos?e.type===`end`?-1:1:e.pos-t.pos);let u=0,d=null;for(let e of l){let t=e.pos;u!==0&&t!==d&&a.push({offset:d,count:t-d}),u+=e.isStart?1:-1,d=t}return a}function Vu(e,t){let n=e[e.length-1],r=n.offset+n.count>2**16,i=e.reduce((e,t)=>e+t.count,0),a=r?4:2,o=t?new SharedArrayBuffer(i*a):new ArrayBuffer(i*a),s=r?new Uint32Array(o):new Uint16Array(o),c=0;for(let t=0;t<e.length;t++){let{offset:n,count:r}=e[t];for(let e=0;e<r;e++)s[c+e]=n+e;c+=r}return s}var Hu=class extends Mu{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(!e.isBufferGeometry)throw Error(`BVH: Only BufferGeometries are supported.`);if(e.index&&e.index.isInterleavedBufferAttribute)throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);if(t.useSharedArrayBuffer&&!Nu())throw Error(`BVH: SharedArrayBuffer is not available.`);super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?e=>this._indirectBuffer[e]:e=>e,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Ml,...t},t[jl]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Vu(Bu(t,e.range,n),e.useSharedArrayBuffer);this._indirectBuffer=r}else Lu(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new h))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Bu(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw Error(`BVH: raycastObject3D() not implemented`)}},Uu=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,a=e.length;i<a;i++){let a=e[i][t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=e.dot(a);n=o<n?o:n,r=o>r?o:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Uu.prototype.setFromBox=(function(){let e=new J;return function(t,n){let r=n.min,i=n.max,a=1/0,o=-1/0;for(let n=0;n<=1;n++)for(let s=0;s<=1;s++)for(let c=0;c<=1;c++){e.x=r.x*n+i.x*(1-n),e.y=r.y*s+i.y*(1-s),e.z=r.z*c+i.z*(1-c);let l=t.dot(e);a=Math.min(l,a),o=Math.max(l,o)}this.min=a,this.max=o}})();var Wu=(function(){let e=new J,t=new J,n=new J;return function(r,i,a){let o=r.start,s=e,c=i.start,l=t;n.subVectors(o,c),e.subVectors(r.end,r.start),t.subVectors(i.end,i.start);let u=n.dot(l),d=l.dot(s),f=l.dot(l),p=n.dot(s),m=s.dot(s)*f-d*d,h,g;h=m===0?0:(u*d-p*f)/m,g=(u+h*d)/f,a.x=h,a.y=g}})(),Gu=(function(){let e=new Y,t=new J,n=new J;return function(r,i,a,o){Wu(r,i,e);let s=e.x,c=e.y;if(s>=0&&s<=1&&c>=0&&c<=1)r.at(s,a),i.at(c,o);else if(s>=0&&s<=1)c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);else if(c>=0&&c<=1)s<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);else{let e;e=s<0?r.start:r.end;let l;l=c<0?i.start:i.end;let u=t,d=n;if(r.closestPointToPoint(l,!0,t),i.closestPointToPoint(e,!0,n),u.distanceToSquared(l)<=d.distanceToSquared(e)){a.copy(u),o.copy(l);return}a.copy(e),o.copy(d);return}}})(),Ku=(function(){let e=new J,t=new J,n=new ye,r=new Ue;return function(i,a){let{radius:o,center:s}=i,{a:c,b:l,c:u}=a;if(r.start=c,r.end=l,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o||(r.start=c,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o)||(r.start=l,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o))return!0;let d=a.getPlane(n);if(Math.abs(d.distanceToPoint(s))<=o){let e=d.projectPoint(s,t);if(a.containsPoint(e))return!0}return!1}})(),qu=[`x`,`y`,`z`],Ju=1e-15,Yu=Ju*Ju;function Xu(e){return Math.abs(e)<Ju}var Zu=class extends st{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new J),this.satBounds=[,,,,].fill().map(()=>new Uu),this.points=[this.a,this.b,this.c],this.plane=new ye,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Ue,this.needsUpdate=!0}intersectsSphere(e){return Ku(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,a=this.satBounds,o=i[0],s=a[0];this.getNormal(o),s.setFromPoints(o,r);let c=i[1],l=a[1];c.subVectors(e,t),l.setFromPoints(c,r);let u=i[2],d=a[2];u.subVectors(t,n),d.setFromPoints(u,r);let f=i[3],p=a[3];f.subVectors(n,e),p.setFromPoints(f,r);let m=c.length(),h=u.length(),g=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<Ju?h<Ju||g<Ju?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):h<Ju?g<Ju?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<Ju&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Zu.prototype.closestPointToSegment=(function(){let e=new J,t=new J,n=new Ue;return function(r,i=null,a=null){this.needsUpdate&&this.update();let{start:o,end:s}=r,c=this.points,l,u=1/0;if(this.plane.distanceToPoint(o)*this.plane.distanceToPoint(s)<0&&this.plane.intersectLine(r,e)!==null&&this.containsPoint(e))return i&&i.copy(e),a&&a.copy(e),0;for(let o=0;o<3;o++){let s=(o+1)%3;n.start.copy(c[o]),n.end.copy(c[s]),Gu(n,r,e,t),l=e.distanceToSquared(t),l<u&&(u=l,i&&i.copy(e),a&&a.copy(t))}return this.closestPointToPoint(o,e),l=o.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(o)),this.closestPointToPoint(s,e),l=s.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(s)),Math.sqrt(u)}})(),Zu.prototype.intersectsTriangle=(function(){let e=new Zu,t=new Uu,n=new Uu,r=new J,i=new J,a=new J,o=new J,s=new Ue,c=new Ue,l=new J,u=new Y,d=new Y;function f(e,i,a,s){let c=r;!e.isDegenerateIntoPoint&&!e.isDegenerateIntoSegment?c.copy(e.plane.normal):c.copy(i.plane.normal);let l=e.satBounds,u=e.satAxes;for(let r=1;r<4;r++){let a=l[r],s=u[r];if(t.setFromPoints(s,i.points),a.isSeparated(t)||(o.copy(c).cross(s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}let d=i.satBounds,f=i.satAxes;for(let r=1;r<4;r++){let a=d[r],s=f[r];if(t.setFromPoints(s,e.points),a.isSeparated(t)||(o.crossVectors(c,s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}return a&&(s||console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`),a.start.set(0,0,0),a.end.set(0,0,0)),!0}function p(e,t,n,r,i,a,o,s,c,l,u){let d=o/(o-s);l.x=r+(i-r)*d,u.start.subVectors(t,e).multiplyScalar(d).add(e),d=o/(o-c),l.y=r+(a-r)*d,u.end.subVectors(n,e).multiplyScalar(d).add(e)}function m(e,t,n,r,i,a,o,s,c,l,u){if(i>0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else if(a>0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(s*c>0||o!=0)p(e.a,e.b,e.c,t,n,r,o,s,c,l,u);else if(s!=0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(c!=0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else return!0;return!1}function h(e,t,n,i){let a=t.degenerateSegment,o=e.plane.distanceToPoint(a.start),s=e.plane.distanceToPoint(a.end);return Xu(o)?Xu(s)?f(e,t,n,i):(n&&(n.start.copy(a.start),n.end.copy(a.start)),e.containsPoint(a.start)):Xu(s)?(n&&(n.start.copy(a.end),n.end.copy(a.end)),e.containsPoint(a.end)):e.plane.intersectLine(a,r)!=null&&(n&&(n.start.copy(r),n.end.copy(r)),e.containsPoint(r))}function g(e,t,n){let r=t.a;return Xu(e.plane.distanceToPoint(r))&&e.containsPoint(r)?(n&&(n.start.copy(r),n.end.copy(r)),!0):!1}function _(e,t,n){let i=e.degenerateSegment,a=t.a;return i.closestPointToPoint(a,!0,r),a.distanceToSquared(r)<Yu&&(n&&(n.start.copy(a),n.end.copy(a)),!0)}function v(e,t,n,o){if(e.isDegenerateIntoSegment){if(t.isDegenerateIntoSegment){let o=e.degenerateSegment,s=t.degenerateSegment,c=i,l=a;o.delta(c),s.delta(l);let u=r.subVectors(s.start,o.start),d=c.x*l.y-c.y*l.x;if(Xu(d))return!1;let f=(u.x*l.y-u.y*l.x)/d,p=-(c.x*u.y-c.y*u.x)/d;return f<0||f>1||p<0||p>1?!1:Xu(o.start.z+c.z*f-(s.start.z+l.z*p))?(n&&(n.start.copy(o.start).addScaledVector(c,f),n.end.copy(o.start).addScaledVector(c,f)),!0):!1}return t.isDegenerateIntoPoint?_(e,t,n):h(t,e,n,o)}if(e.isDegenerateIntoPoint)return t.isDegenerateIntoPoint?t.a.distanceToSquared(e.a)<Yu&&(n&&(n.start.copy(e.a),n.end.copy(e.a)),!0):t.isDegenerateIntoSegment?_(t,e,n):g(t,e,n);if(t.isDegenerateIntoPoint)return g(e,t,n);if(t.isDegenerateIntoSegment)return h(e,t,n,o)}return function(t,n=null,r=!1){this.needsUpdate&&this.update(),t.isExtendedTriangle?t.needsUpdate&&t.update():(e.copy(t),e.update(),t=e);let o=v(this,t,n,r);if(o!==void 0)return o;let p=this.plane,h=t.plane,g=h.distanceToPoint(this.a),_=h.distanceToPoint(this.b),y=h.distanceToPoint(this.c);Xu(g)&&(g=0),Xu(_)&&(_=0),Xu(y)&&(y=0);let b=g*_,x=g*y;if(b>0&&x>0)return!1;let S=p.distanceToPoint(t.a),C=p.distanceToPoint(t.b),w=p.distanceToPoint(t.c);Xu(S)&&(S=0),Xu(C)&&(C=0),Xu(w)&&(w=0);let T=S*C,E=S*w;if(T>0&&E>0)return!1;i.copy(p.normal),a.copy(h.normal);let D=i.cross(a),O=0,k=Math.abs(D.x),A=Math.abs(D.y);A>k&&(k=A,O=1),Math.abs(D.z)>k&&(O=2);let j=qu[O],M=this.a[j],N=this.b[j],ee=this.c[j],P=t.a[j],F=t.b[j],te=t.c[j];if(m(this,M,N,ee,b,x,g,_,y,u,s)||m(t,P,F,te,T,E,S,C,w,d,c))return f(this,t,n,r);if(u.y<u.x){let e=u.y;u.y=u.x,u.x=e,l.copy(s.start),s.start.copy(s.end),s.end.copy(l)}if(d.y<d.x){let e=d.y;d.y=d.x,d.x=e,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(n&&(d.x>u.x?n.start.copy(c.start):n.start.copy(s.start),d.y<u.y?n.end.copy(c.end):n.end.copy(s.end)),!0)}})(),Zu.prototype.distanceToPoint=(function(){let e=new J;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),Zu.prototype.distanceToTriangle=(function(){let e=new J,t=new J,n=[`a`,`b`,`c`],r=new Ue,i=new Ue;return function(a,o=null,s=null){let c=o||s?r:null;if(this.intersectsTriangle(a,c,!0))return(o||s)&&(o&&c.getCenter(o),s&&c.getCenter(s)),0;let l=1/0;for(let t=0;t<3;t++){let r,i=n[t],c=a[i];this.closestPointToPoint(c,e),r=c.distanceToSquared(e),r<l&&(l=r,o&&o.copy(e),s&&s.copy(c));let u=this[i];a.closestPointToPoint(u,e),r=u.distanceToSquared(e),r<l&&(l=r,o&&o.copy(u),s&&s.copy(e))}for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];r.set(this[u],this[d]);for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];i.set(a[u],a[d]),Gu(r,i,e,t);let f=e.distanceToSquared(t);f<l&&(l=f,o&&o.copy(e),s&&s.copy(t))}}return Math.sqrt(l)}})();var Qu=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new J,this.max=new J,this.matrix=new tt,this.invMatrix=new tt,this.points=Array(8).fill().map(()=>new J),this.satAxes=[,,,].fill().map(()=>new J),this.satBounds=[,,,].fill().map(()=>new Uu),this.alignedSatBounds=[,,,].fill().map(()=>new Uu),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Qu.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let i=0;i<=1;i++)for(let a=0;a<=1;a++)for(let o=0;o<=1;o++){let s=r[1*i|2*a|4*o];s.x=i?n.x:t.x,s.y=a?n.y:t.y,s.z=o?n.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,a=this.satAxes,o=r[0];for(let e=0;e<3;e++){let t=a[e],n=i[e],s=r[1<<e];t.subVectors(o,s),n.setFromPoints(t,r)}let s=this.alignedSatBounds;s[0].setFromPointsField(r,`x`),s[1].setFromPointsField(r,`y`),s[2].setFromPointsField(r,`z`),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})(),Qu.prototype.intersectsBox=(function(){let e=new Uu;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,i=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(e.min=n.x,e.max=r.x,o[0].isSeparated(e)||(e.min=n.y,e.max=r.y,o[1].isSeparated(e))||(e.min=n.z,e.max=r.z,o[2].isSeparated(e)))return!1;for(let n=0;n<3;n++){let r=a[n],o=i[n];if(e.setFromBox(r,t),o.isSeparated(e))return!1}return!0}})(),Qu.prototype.intersectsTriangle=(function(){let e=new Zu,t=[,,,],n=new Uu,r=new Uu,i=new J;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let o=this.satBounds,s=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let e=0;e<3;e++){let r=o[e],i=s[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}let c=a.satBounds,l=a.satAxes,u=this.points;for(let e=0;e<3;e++){let t=c[e],r=l[e];if(n.setFromPoints(r,u),t.isSeparated(n))return!1}for(let e=0;e<3;e++){let a=s[e];for(let e=0;e<4;e++){let o=l[e];if(i.crossVectors(a,o),n.setFromPoints(i,t),r.setFromPoints(i,u),n.isSeparated(r))return!1}}return!0}})(),Qu.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})(),Qu.prototype.distanceToPoint=(function(){let e=new J;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),Qu.prototype.distanceToBox=(function(){let e=[`x`,`y`,`z`],t=Array(12).fill().map(()=>new Ue),n=Array(12).fill().map(()=>new Ue),r=new J,i=new J;return function(a,o=0,s=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(s||c)&&(a.getCenter(i),this.closestPointToPoint(i,r),a.clampPoint(r,i),s&&s.copy(r),c&&c.copy(i)),0;let l=o*o,u=a.min,d=a.max,f=this.points,p=1/0;for(let e=0;e<8;e++){let t=f[e];i.copy(t).clamp(u,d);let n=t.distanceToSquared(i);if(n<p&&(p=n,s&&s.copy(t),c&&c.copy(i),n<l))return Math.sqrt(n)}let m=0;for(let r=0;r<3;r++)for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let o=(r+1)%3,s=(r+2)%3,c=i<<o|a<<s,l=1<<r|i<<o|a<<s,p=f[c],h=f[l];t[m].set(p,h);let g=e[r],_=e[o],v=e[s],y=n[m],b=y.start,x=y.end;b[g]=u[g],b[_]=i?u[_]:d[_],b[v]=a?u[v]:d[v],x[g]=d[g],x[_]=i?u[_]:d[_],x[v]=a?u[v]:d[v],m++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){i.x=e?d.x:u.x,i.y=t?d.y:u.y,i.z=n?d.z:u.z,this.closestPointToPoint(i,r);let a=i.distanceToSquared(r);if(a<p&&(p=a,s&&s.copy(r),c&&c.copy(i),a<l))return Math.sqrt(a)}for(let e=0;e<12;e++){let a=t[e];for(let e=0;e<12;e++){let t=n[e];Gu(a,t,r,i);let o=r.distanceToSquared(i);if(o<p&&(p=o,s&&s.copy(r),c&&c.copy(i),o<l))return Math.sqrt(o)}}return Math.sqrt(p)}})();var $u=new class extends uu{constructor(){super(()=>new Zu)}},ed=new J,td=new J;function nd(e,t,n={},r=0,i=1/0){let a=r*r,o=i*i,s=1/0,c=null;if(e.shapecast({boundsTraverseOrder:e=>(ed.copy(t).clamp(e.min,e.max),ed.distanceToSquared(t)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle:(e,n)=>{e.closestPointToPoint(t,ed);let r=t.distanceToSquared(ed);return r<s&&(td.copy(ed),s=r,c=n),r<a}}),s===1/0)return null;let l=Math.sqrt(s);return n.point?n.point.copy(td):n.point=td.clone(),n.distance=l,n.faceIndex=c,n}var rd=!0,id=new J,ad=new J,od=new J,sd=new Y,cd=new Y,ld=new Y,ud=new J,dd=new J,fd=new J,pd=new J;function md(e,t,n,r,i,a,o,s){let c;if(c=a===1?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,a!==2,i),c===null)return null;let l=e.origin.distanceTo(i);return l<o||l>s?null:{distance:l,point:i.clone()}}function hd(e,t,n,r,i,a,o,s,c,l,u){id.fromBufferAttribute(t,a),ad.fromBufferAttribute(t,o),od.fromBufferAttribute(t,s);let d=md(e,id,ad,od,pd,c,l,u);if(d){if(r){sd.fromBufferAttribute(r,a),cd.fromBufferAttribute(r,o),ld.fromBufferAttribute(r,s),d.uv=new Y;let e=st.getInterpolation(pd,id,ad,od,sd,cd,ld,d.uv);rd||(d.uv=e)}if(i){sd.fromBufferAttribute(i,a),cd.fromBufferAttribute(i,o),ld.fromBufferAttribute(i,s),d.uv1=new Y;let e=st.getInterpolation(pd,id,ad,od,sd,cd,ld,d.uv1);rd||(d.uv1=e)}if(n){ud.fromBufferAttribute(n,a),dd.fromBufferAttribute(n,o),fd.fromBufferAttribute(n,s),d.normal=new J;let t=st.getInterpolation(pd,id,ad,od,ud,dd,fd,d.normal);d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1),rd||(d.normal=t)}let t={a,b:o,c:s,normal:new J,materialIndex:0};if(st.getNormal(id,ad,od,t.normal),d.face=t,d.faceIndex=a,rd){let e=new J;st.getBarycoord(pd,id,ad,od,e),d.barycoord=e}}return d}function gd(e){return e&&e.isMaterial?e.side:e}function _d(e,t,n,r,i,a,o){let s=r*3,c=s+0,l=s+1,u=s+2,{index:d,groups:f}=e;e.index&&(c=d.getX(c),l=d.getX(l),u=d.getX(u));let{position:p,normal:m,uv:h,uv1:g}=e.attributes;if(Array.isArray(t)){let e=r*3;for(let s=0,d=f.length;s<d;s++){let{start:d,count:_,materialIndex:v}=f[s];if(e>=d&&e<d+_){let e=gd(t[v]),s=hd(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=v,i)i.push(s);else return s}}}}else{let e=gd(t),s=hd(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=0,i)i.push(s);else return s}}return null}function vd(e,t,n,r){let i=e.a,a=e.b,o=e.c,s=t,c=t+1,l=t+2;n&&(s=n.getX(s),c=n.getX(c),l=n.getX(l)),i.x=r.getX(s),i.y=r.getY(s),i.z=r.getZ(s),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l)}function yd(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,l=r+i;e<l;e++)_d(c,t,n,e,a,o,s)}function bd(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,c=r+i;e<c;e++){let r;r=_d(s,t,n,e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function xd(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let n=e,s=t+e;n<s;n++){let e;if(e=n,vd(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Sd(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(e,n,a=!1){let l=e*2;if(Ll(l,s)){let t=Rl(e,o),n=zl(l,s),a=1/0,u=1/0,d=1/0,f=-1/0,p=-1/0,m=-1/0;for(let e=3*t,o=3*(t+n);e<o;e++){let t=r[e],n=i.getX(t),o=i.getY(t),s=i.getZ(t);n<a&&(a=n),n>f&&(f=n),o<u&&(u=o),o>p&&(p=o),s<d&&(d=s),s>m&&(m=s)}return c[e+0]!==a||c[e+1]!==u||c[e+2]!==d||c[e+3]!==f||c[e+4]!==p||c[e+5]!==m?(c[e+0]=a,c[e+1]=u,c[e+2]=d,c[e+3]=f,c[e+4]=p,c[e+5]=m,!0):!1}{let r=Bl(e),i=Vl(e,o),s=a,l=!1,u=!1;if(t){if(!s){let e=r/8+n/32,a=i/8+n/32;l=t.has(e),u=t.has(a),s=!l&&!u}}else l=!0,u=!0;let f=s||l,p=s||u,m=!1;f&&(m=d(r,n,s));let h=!1;p&&(h=d(i,n,s));let g=m||h;if(g)for(let t=0;t<3;t++){let n=r+t,a=i+t,o=c[n],s=c[n+3],l=c[a],u=c[a+3];c[e+t]=o<l?o:l,c[e+t+3]=s>u?s:u}return g}}}function Cd(e,t,n,r,i){let a,o,s,c,l,u,d=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,m=n.origin.x,h=n.origin.y,g=n.origin.z,_=t[e],v=t[e+3],y=t[e+1],b=t[e+3+1],x=t[e+2],S=t[e+3+2];return d>=0?(a=(_-m)*d,o=(v-m)*d):(a=(v-m)*d,o=(_-m)*d),f>=0?(s=(y-h)*f,c=(b-h)*f):(s=(b-h)*f,c=(y-h)*f),a>c||s>o||((s>a||isNaN(a))&&(a=s),(c<o||isNaN(o))&&(o=c),p>=0?(l=(x-g)*p,u=(S-g)*p):(l=(S-g)*p,u=(x-g)*p),a>u||l>o)?!1:((l>a||a!==a)&&(a=l),(u<o||o!==o)&&(o=u),a<=i&&o>=r)}function wd(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,u=r+i;e<u;e++)_d(c,t,n,l?l[e]:e,a,o,s)}function Td(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,d=r+i;e<d;e++){let r;r=_d(s,t,n,c?c[e]:e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Ed(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(e=n.resolveTriangleIndex(s),vd(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Dd(e,t,n,r,i,a,o){du.setBuffer(e._roots[t]),Cd(0,du.float32Array,r,a,o)&&Od(0,e,n,r,i,a,o),du.clearBuffer()}function Od(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=du,u=e*2;if(Ll(u,c))yd(t,n,r,Rl(e,l),zl(u,c),i,a,o);else{let c=Bl(e);Cd(c,s,r,a,o)&&Od(c,t,n,r,i,a,o);let u=Vl(e,l);Cd(u,s,r,a,o)&&Od(u,t,n,r,i,a,o)}}var kd=[`x`,`y`,`z`];function Ad(e,t,n,r,i,a){du.setBuffer(e._roots[t]);let o=null;return Cd(0,du.float32Array,r,i,a)&&(o=jd(0,e,n,r,i,a)),du.clearBuffer(),o}function jd(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=du,l=e*2;if(Ll(l,s))return bd(t,n,r,Rl(e,c),zl(l,s),i,a);{let s=Hl(e,c),l=kd[s],u=r.direction[l]>=0,d,f;u?(d=Bl(e),f=Vl(e,c)):(d=Vl(e,c),f=Bl(e));let p=Cd(d,o,r,i,a)?jd(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Cd(f,o,r,i,a)?jd(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var Md=new h,Nd=new Zu,Pd=new Zu,Fd=new tt,Id=new Qu,Ld=new Qu;function Rd(e,t,n,r){du.setBuffer(e._roots[t]);let i=zd(0,e,n,r);return du.clearBuffer(),i}function zd(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=du,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),Id.set(n.boundingBox.min,n.boundingBox.max,r),i=Id),Ll(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Rl(e,s),m=zl(c,o);if(Fd.copy(r).invert(),n.boundsTree)return Nl(Ul(e),a,Ld),Ld.matrix.copy(Fd),Ld.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>Ld.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let t=p*3,n=(m+p)*3;t<n;t+=3)if(vd(Pd,t,l,u),Pd.needsUpdate=!0,e.intersectsTriangle(Pd))return!0;return!1}});{let e=Fu(n);for(let t=p*3,n=(m+p)*3;t<n;t+=3){vd(Nd,t,l,u),Nd.a.applyMatrix4(Fd),Nd.b.applyMatrix4(Fd),Nd.c.applyMatrix4(Fd),Nd.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(vd(Pd,t,d,f),Pd.needsUpdate=!0,Nd.intersectsTriangle(Pd))return!0}}}else{let o=Bl(e),c=Vl(e,s);return Nl(Ul(o),a,Md),!!(i.intersectsBox(Md)&&zd(o,t,n,r,i)||(Nl(Ul(c),a,Md),i.intersectsBox(Md)&&zd(c,t,n,r,i)))}}var Bd=new tt,Vd=new Qu,Hd=new Qu,Ud=new J,Wd=new J,Gd=new J,Kd=new J;function qd(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Vd.set(t.boundingBox.min,t.boundingBox.max,n),Vd.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=$u.getPrimitive(),p=$u.getPrimitive(),m=Ud,h=Wd,g=null,_=null;i&&(g=Gd,_=Kd);let v=1/0,y=null,b=null;return Bd.copy(n).invert(),Hd.matrix.copy(Bd),e.shapecast({boundsTraverseOrder:e=>Vd.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(Hd.min.copy(e.min),Hd.max.copy(e.max),Hd.needsUpdate=!0),!0),intersectsRange:(e,r)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>Hd.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,i)=>{for(let o=t,s=t+i;o<s;o++){vd(p,3*o,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){vd(f,3*t,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=t,b=o),e<a)return!0}}}});{let i=Fu(t);for(let t=0,o=i;t<o;t++){vd(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=e,i=e+r;n<i;n++){vd(f,3*n,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=n,b=t),e<a)return!0}}}}}),$u.releasePrimitive(f),$u.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(Bd),h.applyMatrix4(Bd),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function Jd(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(n,a,l=!1){let u=n*2;if(Ll(u,s)){let t=Rl(n,o),a=zl(u,s),l=1/0,d=1/0,f=1/0,p=-1/0,m=-1/0,h=-1/0;for(let n=t,o=t+a;n<o;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let n=t+e;n=r?r[n]:n;let a=i.getX(n),o=i.getY(n),s=i.getZ(n);a<l&&(l=a),a>p&&(p=a),o<d&&(d=o),o>m&&(m=o),s<f&&(f=s),s>h&&(h=s)}}return c[n+0]!==l||c[n+1]!==d||c[n+2]!==f||c[n+3]!==p||c[n+4]!==m||c[n+5]!==h?(c[n+0]=l,c[n+1]=d,c[n+2]=f,c[n+3]=p,c[n+4]=m,c[n+5]=h,!0):!1}{let e=Bl(n),r=Vl(n,o),i=l,s=!1,u=!1;if(t){if(!i){let n=e/8+a/32,o=r/8+a/32;s=t.has(n),u=t.has(o),i=!s&&!u}}else s=!0,u=!0;let f=i||s,p=i||u,m=!1;f&&(m=d(e,a,i));let h=!1;p&&(h=d(r,a,i));let g=m||h;if(g)for(let t=0;t<3;t++){let i=e+t,a=r+t,o=c[i],s=c[i+3],l=c[a],u=c[a+3];c[n+t]=o<l?o:l,c[n+t+3]=s>u?s:u}return g}}}function Yd(e,t,n,r,i,a,o){du.setBuffer(e._roots[t]),Cd(0,du.float32Array,r,a,o)&&Xd(0,e,n,r,i,a,o),du.clearBuffer()}function Xd(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=du,u=e*2;if(Ll(u,c))wd(t,n,r,Rl(e,l),zl(u,c),i,a,o);else{let c=Bl(e);Cd(c,s,r,a,o)&&Xd(c,t,n,r,i,a,o);let u=Vl(e,l);Cd(u,s,r,a,o)&&Xd(u,t,n,r,i,a,o)}}var Zd=[`x`,`y`,`z`];function Qd(e,t,n,r,i,a){du.setBuffer(e._roots[t]);let o=null;return Cd(0,du.float32Array,r,i,a)&&(o=$d(0,e,n,r,i,a)),du.clearBuffer(),o}function $d(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=du,l=e*2;if(Ll(l,s))return Td(t,n,r,Rl(e,c),zl(l,s),i,a);{let s=Hl(e,c),l=Zd[s],u=r.direction[l]>=0,d,f;u?(d=Bl(e),f=Vl(e,c)):(d=Vl(e,c),f=Bl(e));let p=Cd(d,o,r,i,a)?$d(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Cd(f,o,r,i,a)?$d(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var ef=new h,tf=new Zu,nf=new Zu,rf=new tt,af=new Qu,of=new Qu;function sf(e,t,n,r){du.setBuffer(e._roots[t]);let i=cf(0,e,n,r);return du.clearBuffer(),i}function cf(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=du,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),af.set(n.boundingBox.min,n.boundingBox.max,r),i=af),Ll(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Rl(e,s),m=zl(c,o);if(rf.copy(r).invert(),n.boundsTree)return Nl(Ul(e),a,of),of.matrix.copy(rf),of.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>of.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let n=p,r=m+p;n<r;n++)if(vd(nf,3*t.resolveTriangleIndex(n),l,u),nf.needsUpdate=!0,e.intersectsTriangle(nf))return!0;return!1}});{let e=Fu(n);for(let n=p,r=m+p;n<r;n++){vd(tf,3*t.resolveTriangleIndex(n),l,u),tf.a.applyMatrix4(rf),tf.b.applyMatrix4(rf),tf.c.applyMatrix4(rf),tf.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(vd(nf,t,d,f),nf.needsUpdate=!0,tf.intersectsTriangle(nf))return!0}}}else{let o=Bl(e),c=Vl(e,s);return Nl(Ul(o),a,ef),!!(i.intersectsBox(ef)&&cf(o,t,n,r,i)||(Nl(Ul(c),a,ef),i.intersectsBox(ef)&&cf(c,t,n,r,i)))}}var lf=new tt,uf=new Qu,df=new Qu,ff=new J,pf=new J,mf=new J,hf=new J;function gf(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),uf.set(t.boundingBox.min,t.boundingBox.max,n),uf.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=$u.getPrimitive(),p=$u.getPrimitive(),m=ff,h=pf,g=null,_=null;i&&(g=mf,_=hf);let v=1/0,y=null,b=null;return lf.copy(n).invert(),df.matrix.copy(lf),e.shapecast({boundsTraverseOrder:e=>uf.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(df.min.copy(e.min),df.max.copy(e.max),df.needsUpdate=!0),!0),intersectsRange:(r,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>df.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,o)=>{for(let x=t,S=t+o;x<S;x++){let t=s.resolveTriangleIndex(x);vd(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=r,n=r+i;t<n;t++){let n=e.resolveTriangleIndex(t);vd(f,3*n,l,c),f.needsUpdate=!0;let r=f.distanceToTriangle(p,m,g);if(r<v&&(h.copy(m),_&&_.copy(g),v=r,y=t,b=x),r<a)return!0}}}})}{let o=Fu(t);for(let t=0,s=o;t<s;t++){vd(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=r,o=r+i;n<o;n++){let r=e.resolveTriangleIndex(n);vd(f,3*r,l,c),f.needsUpdate=!0;let i=f.distanceToTriangle(p,m,g);if(i<v&&(h.copy(m),_&&_.copy(g),v=i,y=n,b=t),i<a)return!0}}}}}),$u.releasePrimitive(f),$u.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(lf),h.applyMatrix4(lf),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function _f(e,t,n){return e===null?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e)}var vf=new Qu,yf=new L,bf=new J,xf=new tt,Sf=new J,Cf=[`getX`,`getY`,`getZ`],wf=class e extends Hu{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(e=>e.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=i?i.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=i),o}static deserialize(t,n,r={}){r={setIndex:!0,indirect:!!t.indirectBuffer,...r};let{index:i,roots:a,indirectBuffer:o}=t;t.version||(console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`),c(a));let s=new e(n,{...r,[jl]:!0});if(s._roots=a,s._indirectBuffer=o||null,r.setIndex){let e=n.getIndex();if(e===null){let e=new z(t.index,1,!1);n.setIndex(e)}else e.array!==i&&(e.array.set(i),e.needsUpdate=!0)}return s;function c(e){for(let t=0;t<e.length;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n);for(let e=0,t=n.byteLength/32;e<t;e++){let t=8*e;Ll(2*t,i)||(r[t+6]=r[t+6]/8-e)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=(i?i[e]:e)*3,c=s+0,l=s+1,u=s+2;o&&(c=o[c],l=o[l],u=o[u]);for(let e=0;e<3;e++){let r=a[Cf[e]](c),i=a[Cf[e]](l),o=a[Cf[e]](u),s=r;i<s&&(s=i),o<s&&(s=o);let d=r;i>d&&(d=i),o>d&&(d=o),t[n+e]=s,t[n+e+3]=d}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw Error(`MeshBVH: compute triangle bounds range is invalid.`);let c=a.array,l=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let d=[`getX`,`getY`,`getZ`],f=n.offset;for(let r=e,p=e+t;r<p;r++){let e=(i?i[r]:r)*3,t=(r-f)*6,p=e+0,m=e+1,h=e+2;o&&(p=o[p],m=o[m],h=o[h]),s||(p=p*u+l,m=m*u+l,h=h*u+l);for(let e=0;e<3;e++){let r,i,o;s?(r=a[d[e]](p),i=a[d[e]](m),o=a[d[e]](h)):(r=c[p+e],i=c[m+e],o=c[h+e]);let l=r;i<l&&(l=i),o<l&&(l=o);let u=r;i>u&&(u=i),o>u&&(u=o);let f=(u-l)/2,g=e*2;n[t+g+0]=l+f,n[t+g+1]=f+(Math.abs(l)+f)*Al}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;xf.copy(e.matrixWorld).invert(),yf.copy(t.ray).applyMatrix4(xf),Sf.setFromMatrixScale(e.matrixWorld),bf.copy(yf.direction).multiply(Sf);let i=bf.length(),a=t.near/i,o=t.far/i;if(t.firstHitOnly===!0){let i=this.raycastFirst(yf,r,a,o);i=_f(i,e,t),i&&n.push(i)}else{let i=this.raycast(yf,r,a,o);for(let r=0,a=i.length;r<a;r++){let a=_f(i[r],e,t);a&&n.push(a)}}return n}refit(e=null){return(this.indirect?Jd:Sd)(this,e)}raycast(e,t=0,n=0,r=1/0){let i=this._roots,a=[],o=this.indirect?Yd:Dd;for(let s=0,c=i.length;s<c;s++)o(this,s,t,e,a,n,r);return a}raycastFirst(e,t=0,n=0,r=1/0){let i=this._roots,a=null,o=this.indirect?Qd:Ad;for(let s=0,c=i.length;s<c;s++){let i=o(this,s,t,e,n,r);i!=null&&(a==null||i.distance<a.distance)&&(a=i)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,i=this.indirect?sf:Rd;for(let a=0,o=r.length;a<o&&(n=i(this,a,e,t),!n);a++);return n}shapecast(e){let t=$u.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Ed:xd});return $u.releasePrimitive(t),n}bvhcast(t,n,r){let{intersectsRanges:i,intersectsTriangles:a}=r,o=$u.getPrimitive(),s=this.geometry.index,c=this.geometry.attributes.position,l=$u.getPrimitive(),u=t.geometry.index,d=t.geometry.attributes.position;if(a){if(!(t instanceof e))throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);let r=(e,r,i,f,p,m,h,g)=>{for(let _=i,v=i+f;_<v;_++){let i=t.resolveTriangleIndex(_);vd(l,i*3,u,d),l.a.applyMatrix4(n),l.b.applyMatrix4(n),l.c.applyMatrix4(n),l.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){let e=this.resolveTriangleIndex(t);if(vd(o,e*3,s,c),o.needsUpdate=!0,a(o,l,e,i,p,m,h,g))return!0}}return!1};if(i){let e=i;i=function(t,n,i,a,o,s,c,l){return e(t,n,i,a,o,s,c,l)?!0:r(t,n,i,a,o,s,c,l)}}else i=r}return super.bvhcast(t,n,{intersectsRanges:i})}intersectsBox(e,t){return vf.set(e.min,e.max,t),vf.needsUpdate=!0,this.shapecast({intersectsBounds:e=>vf.intersectsBox(e),intersectsTriangle:e=>vf.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,a=1/0){return(this.indirect?gf:qd)(this,e,t,n,r,i,a)}closestPointToPoint(e,t={},n=0,r=1/0){return nd(this,e,t,n,r)}},Tf={Mesh:o.prototype.raycast,Line:Ge.prototype.raycast,LineSegments:ke.prototype.raycast,LineLoop:Rt.prototype.raycast,Points:M.prototype.raycast,BatchedMesh:de.prototype.raycast},Ef=new o,Df=[];function Of(e,t){if(this.isBatchedMesh)kf.call(this,e,t);else{let{geometry:n}=this;if(n.boundsTree)n.boundsTree.raycastObject3D(this,e,t);else{let n;if(this instanceof o)n=Tf.Mesh;else if(this instanceof ke)n=Tf.LineSegments;else if(this instanceof Rt)n=Tf.LineLoop;else if(this instanceof Ge)n=Tf.Line;else if(this instanceof M)n=Tf.Points;else throw Error(`BVH: Fallback raycast function not found.`);n.call(this,e,t)}}}function kf(e,t){if(this.boundsTrees){let n=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,a=this.matrixWorld;Ef.material=this.material,Ef.geometry=this.geometry;let o=Ef.geometry.boundsTree,s=Ef.geometry.drawRange;Ef.geometry.boundingSphere===null&&(Ef.geometry.boundingSphere=new Ce);for(let o=0,s=r.length;o<s;o++){if(!this.getVisibleAt(o))continue;let s=r[o].geometryIndex;if(Ef.geometry.boundsTree=n[s],this.getMatrixAt(o,Ef.matrixWorld).premultiply(a),!Ef.geometry.boundsTree){this.getBoundingBoxAt(s,Ef.geometry.boundingBox),this.getBoundingSphereAt(s,Ef.geometry.boundingSphere);let e=i[s];Ef.geometry.setDrawRange(e.start,e.count)}Ef.raycast(e,Df);for(let e=0,n=Df.length;e<n;e++){let n=Df[e];n.object=this,n.batchId=o,t.push(n)}Df.length=0}Ef.geometry.boundsTree=o,Ef.geometry.drawRange=s,Ef.material=null,Ef.geometry=null}else Tf.BatchedMesh.call(this,e,t)}function Af(e,t){if(!t)return e;if(e.isInstancedMesh)throw TypeError(`Static geometry BVH installation does not replace InstancedMesh raycasting`);let n=e.geometry;return n.boundsTree=wf.deserialize(t,n,{setIndex:!1}),e.raycast=Of,n.addEventListener(`dispose`,function e(){this.boundsTree=null,this.removeEventListener(`dispose`,e)}),e}function jf(e){return e?[...new Set([...e.roots,e.index?.buffer,e.indirectBuffer?.buffer].filter(Boolean))]:[]}var Mf=new f(1,1,1),Nf=(e,t,n)=>new J(e,t,n);function Pf(e,t,n,r=0,i=0,a=0){let s=new o(t,typeof n==`string`?Yt[n]:n);return s.position.set(r,i,a),s.castShadow=!0,s.receiveShadow=!0,e.add(s),s}function $(e,t,n,r,i,a,o,s,c=0){let l=Pf(e,Mf,s,t,n,r);return l.scale.set(i,a,o),l.rotation.y=c,l}function Ff(e,t,n,r,i,a,o,s,c=8,l=!1){return Pf(e,new he(i,a,o,c,1,l),s,t,n,r)}function If(e,t,n,r,i,a,o,s,c=0){let l=Pf(e,new rt(1,c),s,t,n,r);return l.scale.set(i,a,o),l}function Lf(e,t,n,r,i,a=r){let o=t.clone().add(n).multiplyScalar(.5),s=$(e,o.x,o.y,o.z,r,t.distanceTo(n),a,i);return s.quaternion.setFromUnitVectors(Nf(0,1,0),n.clone().sub(t).normalize()),s}function Rf(e,t=0,n=0,r=0,i=0){let a=new dt;return a.position.set(t,n,r),a.rotation.y=i,e.add(a),a}function zf(e,t,n,r,i,a=`roof`){let o=[-t/2,0,-n/2,t/2,0,-n/2,0,r,-n/2,-t/2,0,n/2,t/2,0,n/2,0,r,n/2],s=new $e;return s.setAttribute(`position`,new Re(o,3)),s.setIndex([0,2,1,3,4,5,0,3,5,0,5,2,1,2,5,1,5,4,0,1,4,0,4,3]),s.computeVertexNormals(),Pf(e,s,a,0,i,0)}function Bf(e){e.updateMatrixWorld(!0);let t=e.matrixWorld.clone().invert(),n=new Map,r=new Set;e.traverse(e=>{if(!e.isMesh)return;let i=e.material;e.geometry!==Mf&&r.add(e.geometry),n.has(i)||n.set(i,[]);let a=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();if(a.deleteAttribute(`uv`),a.deleteAttribute(`tangent`),!i.vertexColors)a.deleteAttribute(`color`);else if(!a.attributes.color){let e=new Float32Array(a.attributes.position.count*3);e.fill(1),a.setAttribute(`color`,new z(e,3))}a.applyMatrix4(t.clone().multiply(e.matrixWorld)),n.get(i).push(a)}),e.clear();for(let[t,r]of n)Pf(e,Qo(r,!1),t),r.forEach(e=>e.dispose());return r.forEach(e=>e.dispose()),e}var Vf=(e,t)=>(Math.trunc(e)%t+t)%t;function Hf(e,t=0){return Vf(t,3)===0?e===`landmark`?[{x:0,y:2.77,z:.745,rotation:0,radius:.38},{x:.745,y:2.77,z:0,rotation:Math.PI/2,radius:.38},{x:0,y:2.77,z:-.745,rotation:Math.PI,radius:.38},{x:-.745,y:2.77,z:0,rotation:-Math.PI/2,radius:.38}]:e===`civic`?[{x:0,y:3.65,z:.175,rotation:0,radius:.3}]:[]:[]}var Uf=Object.freeze([{length:.5,width:.075,z:.042,period:720},{length:.72,width:.05,z:.05,period:60}]);function Wf(e,t){return-Math.PI*2*((t===0?10/12+8/720:8/60)+(e??0)/Uf[t].period)}function Gf(e,t,{palette:n,animated:r=!1}={}){let{x:i,y:a,z:o,rotation:s=0,radius:c}=t,l=Rf(e,i,a,o,s);l.name=`clock-face`;let u=Ff(l,0,0,0,c,c,.06,n?.dark??`timber`,20);u.rotation.x=Math.PI/2;let d=Ff(l,0,0,.033,c*.88,c*.88,.012,n?.trim??`trim`,20);d.rotation.x=Math.PI/2;for(let e=0;e<12;e++){let t=-e*Math.PI/6,n=e%3==0,r=$(l,-Math.sin(t)*c*.73,Math.cos(t)*c*.73,.041,c*(n?.065:.038),c*(n?.17:.1),.006,`metal`);r.rotation.z=t,r.castShadow=!1}if(!r)for(let[e,t]of Uf.entries()){let n=Rf(l);n.rotation.z=Wf(0,e),$(n,0,c*t.length*.43,t.z,c*t.width,c*t.length,.008,`metal`).castShadow=!1}let f=Ff(l,0,0,.047,c*.055,c*.055,.032,n?.dark??`timber`,8);return f.rotation.x=Math.PI/2,f.castShadow=!1,l}var Kf=Object.freeze({legHeight:.26,legWidth:.065,legDepth:.078,stride:.045,stepLength:.2,stepLift:.026});function qf(){let e=[new rt(1,1).scale(.105,.12,.14)];e.push(new f(.13,.15,.13).translate(0,-.035,-.08).toNonIndexed());for(let t of[-1,1])e.push(new f(.085,.035,.055).translate(t*.128,.025,-.02).toNonIndexed());let t=Qo(e);return e.forEach(e=>e.dispose()),t}var Jf=.75,Yf=.17,Xf=Object.freeze({house:{width:2.2,depth:2.2,height:2.4},station:{width:6.4,depth:2.4,height:2.4},tree:{radius:.85,height:2.8},landmark:{radius:2,height:4.5},apartment:{radius:2.05,height:5},civic:{radius:2.8,height:5},plaza:{radius:2.6,height:.9},tower:{radius:2.1,height:8},farmPatch:{width:3,depth:4,height:1.6},cactus:{radius:.7,height:2.4},sheep:{width:.46,depth:.8,height:.53},person:{radius:Yf,height:Jf},trainCar:{width:1.12,depth:2.4,height:1.6}}),Zf=(e,t)=>(Math.trunc(e)%t+t)%t;function Qf(e,t,{x:n=0,y:r=0,z:i=0,rotation:a=0,scale:o=1}={}){let s=Rf(e,n,r,i,a);return s.name=t,s.scale.setScalar(o),s.userData.footprint={...Xf[t]},s.userData.rigidSurfaceAsset=!0,s}function $f(e,t,n,r,i=.36,a=.44,o){let s=$(e,t,n,r+.004,i+.07,a+.07,.024,o?.trim??`trim`),c=$(e,t,n,r+.018,i,a,.012,`window`);s.castShadow=!1,c.castShadow=!1}function ep(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,color:o=`plaster`,scale:s=1,palette:c}={}){let l=Qf(e,`house`,{x:t,y:n,z:r,rotation:i,scale:s}),u=Zf(a,4),d=u===2?1.65:1.42,f=u===1?1.62:1.82,p=u===1?1.9:1.72,m=c?.roof??[`roof`,`roofBlue`,`roofLight`,`roofDark`][u],h=c?u===2?c.body:c.light:o,g=c?.trim??`trim`;$(l,0,.07,0,f+.1,.14,p+.1,`platform`),$(l,0,d/2+.12,0,f,d,p,h),$(l,0,d+.12,0,f+.06,.1,p+.06,g),u===1?zf(Rf(l,0,0,0,Math.PI/2),p+.24,f+.24,.51,d+.16,m):zf(l,f+.24,p+.24,.51,d+.16,m);let _=p/2;$(l,0,.53,_+.008,.34,.8,.024,c?.dark??`timber`).castShadow=!1,$f(l,-f*.29,.91,_,.36,.44,c),$f(l,f*.29,.91,_,.36,.44,c);for(let e of[-1,1])$f(Rf(l,e*f/2,0,0,e*Math.PI/2),0,.92,0,.36,.37,c);return(u===0||u===3)&&($(l,-.49,1.97,-.35,.24,.5,.28,c?.dark??`roofDark`),$(l,-.49,2.22,-.35,.29,.08,.33,g)),l}function tp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,width:a=1.25,timber:o=`timber`}={}){let s=Rf(e,t,n,r,i);s.name=`bench`;for(let e of[-1,1]){let t=e*(a/2-.17);$(s,t,.145,.115,.055,.29,.055,`metal`),$(s,t,.28,-.16,.055,.56,.055,`metal`),$(s,t,.255,-.0225,.055,.055,.33,`metal`)}for(let e of[-.105,0,.105])$(s,0,.295,e,a,.055,.09,o);for(let e of[.405,.515])$(s,0,e,-.13,a,.085,.05,o);return s}function np(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,scale:a=1,variant:o=0}={}){let s=Qf(e,`tree`,{x:t,y:n,z:r,rotation:i,scale:a}),c=Zf(o,9),l=c===8?1.64:c===7?1.35:1.15;if(Ff(s,0,l/2,0,.085,.13,l,c===8?`trim`:`bark`,8,!0),c<3)Ff(s,0,1.4,0,0,.8,1.45,c===1?`pineLight`:`pine`,7),Ff(s,0,2.03,0,0,.57,1.38,c===2?`pineDark`:`pineLight`,7);else if(c<6){let e=[`leaf`,`leafGold`,`leafLight`][c-3];If(s,0,1.55,0,.84,1.05,.84,e)}else c===6?(Lf(s,Nf(0,.75,0),Nf(.23,1.43,.08),.11,`bark`),If(s,0,1.68,0,.84,.82,.8,`leaf`)):c===7?(Lf(s,Nf(0,.65,0),Nf(-.29,1.29,.06),.1,`bark`),Lf(s,Nf(0,.72,0),Nf(.3,1.34,-.04),.09,`bark`),If(s,0,1.51,0,.84,.35,.8,`pineLight`)):(Lf(s,Nf(0,1.12,0),Nf(.22,1.67,.08),.07,`trim`),If(s,.07,1.85,0,.55,.88,.56,`leafLight`));return s}function rp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s,animatedClocks:c=!1}={}){let l=Qf(e,`landmark`,{x:t,y:n,z:r,rotation:i,scale:o}),u=Zf(a,3);if(u===0){$(l,0,.1,0,2.2,.2,2.2,`platform`),$(l,0,1.74,0,1.46,3.28,1.46,`peach`),$(l,0,3.4,0,1.66,.16,1.66,`trim`),$(l,0,.28,0,1.54,.16,1.54,`trim`),$(l,0,2.21,0,1.5,.075,1.5,`trim`);for(let e of Hf(`landmark`,a))Gf(l,e,{animated:c});zf(l,1.84,1.84,.71,3.47,`roofDark`),Ff(l,0,4.25,0,.035,.045,.18,`gold`,5),$(l,0,.62,.75,.45,1.04,.05,`timber`)}else if(u===1){$(l,0,.08,0,2.02,.16,2.82,`platform`),$(l,0,.98,0,1.75,1.8,2.52,`plaster`),zf(l,1.99,2.76,.62,1.87,`roofBlue`),$(l,0,1.67,.73,1.02,3.18,1.04,`plaster`),$(l,0,3.26,.73,1.14,.13,1.16,`trim`),Ff(l,0,3.79,.73,0,.81,.94,`teal`,4).rotation.y=Math.PI/4,$f(l,0,2.71,1.25,.33,.55),$(l,0,.62,1.285,.45,1.05,.05,`timber`);for(let e of[-1,1])$(l,e*.89,1.24,-.55,.04,.66,.38,`window`)}else{$(l,0,.07,0,2.28,.14,2.28,`platform`);for(let e of[-.54,.54]){for(let t of[-.54,.54])$(l,e,1.18,t,.13,2.08,.13,`timber`);Lf(l,Nf(e,.39,-.54),Nf(e,2.13,.54),.085,`timber`)}Ff(l,0,2.81,0,.96,.96,1.14,`teal`,10),Ff(l,0,2.27,0,1.01,1.01,.12,`trim`,10),Ff(l,0,3.37,0,1.01,1.01,.12,`trim`,10),Ff(l,0,3.66,0,0,1.08,.48,`roofBlue`,10)}if(s){let e=new Map(Object.entries({plaster:`light`,peach:`light`,trim:`trim`,roofDark:`roof`,roofBlue:`roof`,teal:`body`,timber:`dark`,gold:`accent`}).map(([e,t])=>[Yt[e],s[t]]));l.traverse(t=>{t.isMesh&&e.has(t.material)&&(t.material=e.get(t.material))})}return l}function ip(e){return e??{body:`peach`,light:`plaster`,dark:`roofDark`,roof:`roofBlue`,accent:`gold`,trim:`trim`}}function ap(e,t,n,r,i,a){for(let o of[0,Math.PI/2,Math.PI,Math.PI*1.5]){let s=Rf(e,0,0,0,o),c=o===Math.PI/2||o===Math.PI*1.5,l=c?n:t,u=c?t:n;for(let e=0;e<i;e++)$f(s,(e-(i-1)/2)*l/(i+.55),r,u/2,.38,.48,a)}}function op(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s,animatedClocks:c=!1}={}){let l=Qf(e,`civic`,{x:t,y:n,z:r,rotation:i,scale:o}),u=ip(s),d=Zf(a,3);$(l,0,.09,0,3.9,.18,3.9,`platform`),$(l,0,1.31,-.15,3.35,2.26,2.72,u.light),ap(Rf(l,0,0,-.15),3.35,2.72,1.37,3,u),$(l,0,.78,1.235,.67,1.18,.06,u.dark),$(l,0,.22,1.64,2.86,.12,.47,u.trim);for(let e of[-1.27,-.66,.66,1.27])Ff(l,e,1.24,1.55,.105,.13,1.92,u.trim,8);if($(l,0,2.24,1.48,3.12,.2,.56,u.body),$(l,0,2.43,1.48,3.4,.18,.72,u.roof),zf(Rf(l,0,0,-.15),3.7,3.02,.62,2.43,u.roof),d===0){$(l,0,3.27,-.43,1.15,1.55,1.18,u.body),$(l,0,4.05,-.43,1.3,.14,1.33,u.trim);for(let e of Hf(`civic`,a))Gf(l,e,{palette:u,animated:c});zf(Rf(l,0,0,-.43),1.5,1.53,.51,4.11,u.roof),Ff(l,0,4.7,-.43,.035,.045,.2,u.accent,6)}else if(d===1)Ff(l,0,3.06,-.14,.7,.84,.7,u.body,8),Ff(l,0,3.47,-.14,0,.89,.55,u.roof,8),Ff(l,0,3.8,-.14,.045,.065,.14,u.accent,6);else for(let e of[-1,1]){let t=Rf(l,e*1.2,0,-.67);$(t,0,3.07,0,.63,.96,.65,u.body),zf(t,.82,.84,.44,3.52,u.roof)}return l}function sp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s}={}){let c=Qf(e,`plaza`,{x:t,y:n,z:r,rotation:i,scale:o}),l=ip(s),u=Zf(a,3);Ff(c,0,.06,0,2.58,2.58,.12,`platform`,16),Ff(c,0,.13,0,2.43,2.43,.06,`grassLight`,16),$(c,0,.173,0,4.62,.024,.72,`sand`),$(c,0,.175,0,.72,.024,4.62,`sand`);for(let e of[-1.43,1.43])for(let t of[-1.43,1.43])Ff(c,e,.2,t,.48,.5,.16,l.trim,8),If(c,e,.48,t,.45,.3,.45,u===2?`leafGold`:`leaf`,0);for(let e of[-1,1])tp(c,{x:e*1.52,y:.16,rotation:-e*Math.PI/2,width:1.2,timber:l.dark});return Ff(c,0,.25,0,.78,.86,.18,l.trim,12),u===1?(Ff(c,0,.44,0,.25,.36,.34,l.body,6),If(c,0,.72,0,.2,.15,.2,l.accent)):(Ff(c,0,.35,0,.68,.68,.035,`waterLight`,12),Ff(c,0,.52,0,.12,.17,.34,l.body,8),Ff(c,0,.7,0,.35,.13,.1,l.trim,10),Ff(c,0,.76,0,.3,.3,.025,`waterLight`,10)),c}function cp(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,color:a=`red`,variant:o=0}={}){let s=Qf(e,`person`,{x:t,y:n,z:r,rotation:i});return $(s,-.055,.16,0,.075,.32,.1,`metal`),$(s,.055,.16,0,.075,.32,.1,`metal`),$(s,0,.42,0,.24,.28,.16,a),If(s,0,.65,0,.115,.1,.115,`peach`),Zf(o,2)===1&&Ff(s,0,.725,0,.135,.135,.04,`gold`,7),s}function lp(e,{color:t=`red`,cab:n=!1,palette:r}={}){let i=Qf(e,`trainCar`),a=r?.body??t,o=r?.roof??`roofBlue`,s=r?.trim??`trim`;$(i,0,.34,0,.91,.19,2.1,`metal`),$(i,0,.88,0,1.02,.94,2.12,a),$(i,0,1.315,0,1.035,.06,2.14,s),$(i,0,1.405,0,1.1,.18,2.2,o),$(i,0,.65,0,1.035,.065,2.14,r?.accent??`gold`);for(let e of[-1,1]){for(let t of[-.54,.49])$(i,e*.514,1.075,t,.016,.39,.69,`window`).castShadow=!1;for(let t of[-.67,.67])Ff(i,e*.48,.22,t,.22,.22,.14,`metal`,8).rotation.z=Math.PI/2}for(let e of[-1.07,1.07])$(i,0,1.075,e,.66,.37,.025,`window`).castShadow=!1;if(n){$(i,0,.77,1.085,.86,.25,.12,a);for(let e of[-.31,.31])$(i,e,.79,1.151,.14,.13,.03,`lamp`)}return i}function up(e){let t=new Map;for(let n of e.children){if(!n.isMesh)throw TypeError(`Color batching expects consolidated meshes`);let e=n.material,r={roughness:e.roughness??1,metalness:e.metalness??0,side:e.side,flatShading:e.flatShading,transparent:e.transparent,opacity:e.opacity},i=e.userData.sceneStyle??`asset`,a=JSON.stringify({...r,sceneStyle:i});t.has(a)||t.set(a,{properties:r,sceneStyle:i,geometries:[]});let o=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone(),s=o.attributes.position.count,c=new Float32Array(s*3),l=o.attributes.color;for(let t=0;t<s;t++)c[t*3]=e.color.r*(l?l.getX(t):1),c[t*3+1]=e.color.g*(l?l.getY(t):1),c[t*3+2]=e.color.b*(l?l.getZ(t):1);o.setAttribute(`color`,new z(c,3)),t.get(a).geometries.push(o),n.geometry.dispose()}e.clear(),e.userData.ownedMaterials??=[];for(let{properties:n,sceneStyle:r,geometries:i}of t.values()){let t=Qo(i,!1);i.forEach(e=>e.dispose());let a=new y({...n,color:16777215,vertexColors:!0,name:`baked-material-colors`});a.userData.sceneStyle=r,qt(a,{kind:r}),e.userData.ownedMaterials.push(a);let s=new o(t,a);s.castShadow=!0,s.receiveShadow=!0,e.add(s)}return e}var dp=.78,fp=e=>({pine:Math.floor((e.scale??1)*7)%3,round:3,gold:4,light:5,broadleaf:6,acacia:7,birch:8})[e.variant]??0,pp=e=>e.id??`tree:${e.x}:${e.y??0}:${e.z}`;function mp(e,t){let n=new Map,r=new h,i=new tt,a=new tt,s=new L,c=new J,l=new J,u=new o(e.geometry,e.material),d=[],f=new Set;e.geometry.computeBoundingBox();for(let a=0;a<t.length;a++){e.getMatrixAt(a,i),r.copy(e.geometry.boundingBox).applyMatrix4(i);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++){let r=`${e}:${t}:${i}`;n.has(r)||n.set(r,[]),n.get(r).push(a)}}e.raycast=(o,p)=>{if(a.copy(e.matrixWorld).invert(),s.copy(o.ray).applyMatrix4(a),s.intersectsSphere(e.boundingSphere)){if(f.clear(),Number.isFinite(o.far)&&o.far<=64){o.ray.at(o.near,c).applyMatrix4(a),o.ray.at(o.far,l).applyMatrix4(a),r.makeEmpty().expandByPoint(c).expandByPoint(l);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++)for(let r of n.get(`${e}:${t}:${i}`)??[])f.add(r)}else for(let e=0;e<t.length;e++)f.add(e);for(let n of f)if(t[n].active){e.getMatrixAt(n,i),u.matrixWorld.multiplyMatrices(e.matrixWorld,i),d.length=0,u.raycast(o,d);for(let t of d)t.instanceId=n,t.object=e,p.push(t)}}}}function hp(e,{onChange:t=()=>{}}={}){let n=new Map,r=new Map,i=new Map,a=new Set,o=new Set,s=new tt,c=new tt,l=new J,u=new J,d=0,f=!1;function p(e){if(!n.has(e)){let t=new dt;np(t,{variant:e}),up(Bf(t));let r=t.children[0];r.geometry.computeBoundingBox(),r.geometry.computeBoundingSphere(),n.set(e,{geometry:r.geometry,material:r.material}),t.clear()}return n.get(e)}function g(){d++,t()}function _(t,n,o,{reveal:c={value:1}}={}){if(f)throw Error(`Cannot add trees to a disposed renderer`);v(t);let u=new dt;u.name=`mutable-trees-${t}`,n.add(u);let d=new Map,m=[],g=[],_=[],y=new h,b=Xo(c),x=0,S=0;for(let e of o){let t=pp(e);if(a.has(t)||i.has(t))continue;let n=fp(e);d.has(n)||d.set(n,[]),d.get(n).push({id:t,placement:e,active:!0,elapsed:0})}for(let[n,r]of d){let a=p(n),o=Yo(a.material.clone(),c);qt(o,{kind:a.material.userData.sceneStyle??`asset`}),g.push(o);let d=new Fe(a.geometry,o,r.length);d.name=`trees-${n}`,d.instanceMatrix.setUsage(xe),d.castShadow=d.receiveShadow=!0,d.customDepthMaterial=b,d.userData.mutableTreeBatch=!0,u.add(d),m.push(d);let f=0;for(let n=0;n<r.length;n++){let a=r[n],o=a.placement,c=o.scale??1;a.mesh=d,a.index=n,a.chunk=t,a.base=Ke(e,o.x,o.y??0,o.z,o.rotation??0),s.copy(a.base).scale(l.setScalar(c)),d.setMatrixAt(n,s),i.set(a.id,a),_.push(a),f=Math.max(f,c*3.2)}d.computeBoundingBox(),d.boundingBox.expandByScalar(f),d.boundingSphere=d.boundingBox.getBoundingSphere(new Ce),y.union(d.boundingBox),mp(d,r),x+=d.instanceMatrix.array.byteLength,S+=(a.geometry.index?.count??a.geometry.attributes.position.count)/3*r.length}let C={key:t,root:u,meshes:m,materials:g,depth:b,entries:_,bounds:y,bytes:x,triangles:S};return r.set(t,C),C}function v(e){let t=r.get(e);if(t){for(let e of t.entries)i.delete(e.id),o.delete(e);for(let e of t.meshes)e.dispose();t.materials.forEach(e=>e.dispose()),t.depth.dispose(),t.root.removeFromParent(),r.delete(e)}}function y(e){e.active=!1,a.add(e.id),g()}function b(e,{direction:t={x:1,z:0}}={}){let n=i.get(e);if(f||!n?.active)return!1;y(n),n.elapsed=0;let r=Math.hypot(t.x??0,t.z??0)||1,a=(t.x??0)/r,s=(t.z??0)/r,c=n.placement.rotation??0;return n.axis=new J(s*Math.cos(c)+a*Math.sin(c),0,-a*Math.cos(c)+s*Math.sin(c)).normalize(),n.axis.lengthSq()<.01&&n.axis.set(0,0,-1),o.add(n),!0}function x(e){if(f||a.has(e))return!1;let t=i.get(e);return a.add(e),t&&(t.active=!1,o.delete(t),t.mesh.setMatrixAt(t.index,s.copy(t.base).scale(l.setScalar(0))),t.mesh.instanceMatrix.addUpdateRange(t.index*16,16),t.mesh.instanceMatrix.needsUpdate=!0),g(),!0}function S(e){if(f||!o.size)return;let t=new Set;for(let n of o){n.elapsed=Math.min(dp,n.elapsed+Math.max(0,e));let r=Math.min(1,n.elapsed/.6),i=m.smoothstep(n.elapsed,.58,dp);c.makeRotationAxis(u.copy(n.axis),Math.PI*.49*r*r),s.multiplyMatrices(n.base,c).scale(l.setScalar((n.placement.scale??1)*(1-i))),n.mesh.setMatrixAt(n.index,s),n.mesh.instanceMatrix.addUpdateRange(n.index*16,16),t.add(n.mesh),n.elapsed>=.78&&o.delete(n)}for(let e of t)e.instanceMatrix.needsUpdate=!0}function C(){if(!f){f=!0;for(let e of[...r.keys()])v(e);for(let e of n.values())e.geometry.dispose(),e.material.dispose();n.clear(),a.clear(),i.clear(),o.clear()}}return{addChunk:_,removeChunk:v,fellTree:b,removeTree:x,update:S,dispose:C,removed:a,get revision(){return d},get activeFalls(){return o.size},get templateCount(){return n.size},get meshes(){return[...r.values()].flatMap(e=>e.meshes)}}}var gp=e=>Math.max(0,Math.min(1,e)),_p=(e,t,n)=>{let r=gp((n-e)/(t-e));return r*r*(3-2*r)},vp={};function yp(e,t,n,r,{surface:i=!0,target:a}={}){let o=a??X.rock.clone(),s=r.x*-.55+r.y*.77+r.z*.32,c=r.y<-.15?X.rockDark:Math.abs(r.y)<.15?X.rockLight:s<.05?X.rockDark:s>.68?X.rockLight:X.rock;if(!i||r.y<.18)return o.copy(c);let l=Math.max(0,n.y)/t.height;Hc(e.terrainSource??e,n.x,n.z,{target:o}),Ht(e.terrainSource??e,n.x,n.z,vp);let u=_p(0,.1,o.g-o.r),d=_p(.28,.68,vp.patch),f=_p(.06,.3,l)*(1-_p(.56,.79,l));o.lerp(X.meadow,(.22+.12*vp.moisture)*f*u),o.lerp(X.forestFloor,.32*d*u*_p(.025,.16,l)*(1-_p(.31,.56,l)));let p=_p(.9,.48,r.y),m=_p(.53,.84,l),h=Math.max(p,m)*_p(.015,.12,l);return o.lerp(c,h)}new tt,new J;var bp=new y({name:`ocean-vertex`,color:16777215,vertexColors:!0,roughness:.52,metalness:0,flatShading:!1});bp.userData.sceneStyle=`water`;var xp=new y({name:`coastal-surf`,color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1});xp.userData.sceneStyle=`surf`;var Sp=new J;function Cp(e,t,n){let r=sc(t,n);return Tt(e)&&(Ot(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,Sp).normalize(),r.tangent={x:Sp.x,y:Sp.y,z:Sp.z}),r}var wp=(e,t)=>Math.hypot(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x),Tp=2.64,Ep=1.2,Dp=.14,Op=1.35,kp=2.4,Ap=.05;function jp(e,t){let n=new Map(e.zones);for(let[e,r]of t.zones){let t=n.get(e);n.set(e,t?{min:Math.min(t.min,r.min),max:Math.max(t.max,r.max)}:{...r})}return{id:e.id,junctionIds:[...e.junctionIds,...t.junctionIds],zones:n,owner:null}}function Mp(e,t){let n=new Map;for(let r of e.lines){let i=t.get(r.id);if(i)for(let[t,a,o]of[[r.from,0,1],[r.to,r.length,-1]]){if(t===void 0)continue;let s=Cp(e,r,a),c={lineId:r.id,distance:a,sign:o,train:i,x:s.tangent.x*o,y:s.tangent.y*o,z:s.tangent.z*o,closest:o===1?i.start:r.length-i.end};n.has(t)||n.set(t,[]),n.get(t).push(c)}}let r=[];for(let[e,t]of n)for(let n=0;n<t.length;n++)for(let i=n+1;i<t.length;i++){let a=t[n],o=t[i];if(a.x*o.x+a.y*o.y+a.z*o.z<=0)continue;let s=wp(a,o),c=Op/Math.max(s,.01);a.closest-a.train.halfLength-Dp>=c||o.closest-o.train.halfLength-Dp>=c||r.push({id:`approach-${e}-${n}-${i}`,lines:[{lineId:a.lineId,distance:a.distance},{lineId:o.lineId,distance:o.distance}]})}return r}function Np(e,t){let n=new Map(e.lines.map(e=>[e.id,e])),r=new Map(t.map(e=>[e.lineId,e])),i=[...e.junctions||[],...Mp(e,r)].map(t=>{let i=Op;for(let r=0;r<t.lines.length;r++){let a=t.lines[r],o=n.get(a.lineId);if(!o)continue;let s=Cp(e,o,a.distance).tangent;for(let a of t.lines.slice(r+1)){let t=n.get(a.lineId);if(!t)continue;let r=Cp(e,t,a.distance).tangent,o=wp(s,r);i=Math.max(i,Op/Math.max(o,.01))}}return{id:t.id,junctionIds:[t.id],owner:null,zones:new Map(t.lines.filter(e=>r.has(e.lineId)).map(e=>[e.lineId,{min:e.distance-i,max:e.distance+i}]))}}).filter(e=>e.zones.size>1),a=!0;for(;a;){a=!1;outer:for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)for(let[n,o]of i[e].zones){let s=i[t].zones.get(n);if(s&&!(Math.max(s.min-o.max,o.min-s.max,0)>r.get(n).halfLength*2+Dp*3)){i[e]=jp(i[e],i[t]),i.splice(t,1),a=!0;break outer}}}return i}function Pp(e,t,n=e.distance){return n+e.halfLength+Dp>=t.min&&n-e.halfLength-Dp<=t.max}function Fp(e){let t=e.lines.filter(e=>e.length>12).map((e,t)=>{let n=e.length<23?2:3,r=Tp*(n-1)/2+3.25,i=Math.max(r,e.stops?.[0]?.distance??r),a=Math.min(e.length-r,e.stops?.[1]?.distance??e.length-r);return{id:`train-${e.id}`,lineId:e.id,count:n,spacing:Tp,halfLength:Tp*(n-1)/2+Ep,start:i,end:a,distance:i,direction:1,speed:2.6+t%3*.16,dwell:t*.45,active:!1,waiting:!1}}).filter(e=>e.end>e.start),n=t.length,r=e.traffic?.trainCount;if(r!==void 0){if(!Number.isInteger(r)||r<0||r>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);t.length=Math.min(t.length,r)}let i=Np(e,t),a=new Map(t.map(e=>[e.id,e])),o=new Map(t.map(e=>[e.lineId,i.filter(t=>t.zones.has(e.lineId)).sort((t,n)=>t.zones.get(e.lineId).min-n.zones.get(e.lineId).min)]));function s(e){let t=o.get(e.lineId);for(let n of t)if(Pp(e,n.zones.get(e.lineId))&&n.owner&&n.owner!==e.id)return e.waiting=!0,!1;for(let n of t)Pp(e,n.zones.get(e.lineId))&&(n.owner=e.id);return e.active=!0,e.waiting=!1,!0}t.forEach(s);function c(e){for(let e of i){if(!e.owner)continue;let t=a.get(e.owner);Pp(t,e.zones.get(t.lineId))||(e.owner=null)}for(let n of t){if(!n.active&&!s(n))continue;n.waiting=!1;let t=Math.max(0,e-n.dwell);if(n.dwell=Math.max(0,n.dwell-e),!t)continue;let r=n.direction,i=r>0?Math.min(n.end,n.distance+t*n.speed):Math.max(n.start,n.distance-t*n.speed),a=o.get(n.lineId),c=r>0?0:a.length-1;for(let e=c;e>=0&&e<a.length;e+=r){let t=a[e],o=t.zones.get(n.lineId);if(Math.max(n.distance,i)+n.halfLength+Dp<o.min||Math.min(n.distance,i)-n.halfLength-Dp>o.max)continue;if(!t.owner||t.owner===n.id){t.owner=n.id;continue}let s=r>0?o.min-n.halfLength-Dp:o.max+n.halfLength+Dp;i=r>0?Math.max(n.distance,Math.min(i,s)):Math.min(n.distance,Math.max(i,s)),n.waiting=!0;break}n.distance=i;let l=r>0?n.end:n.start;Math.abs(n.distance-l)<1e-8&&(n.distance=l,n.direction=-r,n.dwell=kp,n.waiting=!1)}}return{trains:t,capacity:n,get reservations(){return i.map(e=>({id:e.id,junctionIds:[...e.junctionIds],trainId:e.owner}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(e===0)return;let t=Math.ceil(e/Ap);for(let n=0;n<t;n++)c(e/t)}}}var Ip=2.64,Lp=3.84,Rp=1.2,zp=.56,Bp=.05,Vp=(e,t)=>(e%t+t)%t,Hp=(e,t)=>`${e}:${t}`;function Up(e,t,n,r){let i=e.trainOwners?.[t]??r?.ownerId??e.cities.find(e=>e.id===n)?.ownerId??e.players?.[0]?.id??null;if(i!==null&&e.players&&!e.players.some(e=>e.id===i))throw TypeError(`Invalid world: train ${t} references an unknown player`);return i}var Wp=()=>({x:0,y:0,z:0,distance:0,tangent:{x:0,y:0,z:1},angle:0,heading:0,curvature:0,lineId:null});function Gp(e,t,n){if(e.alignment)return ds(e.alignment,t,n);let r=Math.max(0,Math.min(e.length,t)),i=e.points,a=e.distances,o=0,s=i.length-1;for(;o+1<s;){let e=o+s>>1;a[e]<=r?o=e:s=e}let c=i[o],l=i[s],u=a[s]-a[o],d=u>1e-9?(r-a[o])/u:0,f=l.x-c.x,p=l.y-c.y,m=l.z-c.z,h=Math.hypot(f,p,m)||1;return n.x=c.x+f*d,n.y=c.y+p*d,n.z=c.z+m*d,n.distance=r,n.tangent.x=f/h,n.tangent.y=p/h,n.tangent.z=m/h,n.curvature=void 0,n.heading=Math.atan2(m,f),n.angle=Math.atan2(f,m),n}function Kp(e,t,n=Wp()){n.tangent??={x:0,y:0,z:0};let r=e.closed?Vp(t,e.length):Math.max(0,Math.min(e.length,t)),i=e.segments,a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;r>=i[e].start+i[e].length-1e-9?a=e+1:o=e}let s=i[a],c=Math.max(0,Math.min(s.length,r-s.start));if(Gp(s.line,Es(s.metric,s.direction>0?c:s.length-c),n),n.distance=r,n.tangent.x*=s.direction,n.tangent.y*=s.direction,n.tangent.z*=s.direction,n.heading=Math.atan2(n.tangent.z,n.tangent.x),n.angle=Math.atan2(n.tangent.x,n.tangent.z),Number.isFinite(n.curvature)&&(n.curvature*=s.direction),n.lineId=s.lineId,e.surfaceWorld){let t=n.physical??={};Ve(e.surfaceWorld,n.x,n.y,n.z,qp),Ot(e.surfaceWorld,n.x,n.y,n.z,n.tangent.x,0,n.tangent.z,Jp).normalize(),it(e.surfaceWorld,n.x,n.z,Yp),Xp.crossVectors(Yp,Jp).normalize(),t.x=qp.x,t.y=qp.y,t.z=qp.z,t.tx=Jp.x,t.ty=Jp.y,t.tz=Jp.z,t.rx=Xp.x,t.ry=Xp.y,t.rz=Xp.z}return n}var qp=new J,Jp=new J,Yp=new J,Xp=new J;function Zp(e,t,n=!0,r){let i=0,a=e.map(e=>{let t=r?Ss(r,e.line):null,n={line:e.line,lineId:e.line.id,direction:e.direction,metric:t,start:i,length:t?.length??e.line.length};return i+=n.length,n});return{id:`circuit-${t+1}`,segments:a,length:i,closed:n,...Tt(r)?{surfaceWorld:{surface:r.surface}}:{}}}function Qp(e){let t=new Map(e.lines.map(e=>[e.id,e]));if(e.traffic?.circuits){if(!Array.isArray(e.traffic.circuits))throw TypeError(`Traffic circuits must be an array`);let n=new Set;return e.traffic.circuits.map((r,i)=>{if(!Array.isArray(r.segments)||r.segments.length<2)throw TypeError(`A traffic circuit needs at least two segments`);let a=r.segments.map(e=>{let n=t.get(e.lineId),r=e.direction??1;if(!n||r!==1&&r!==-1)throw TypeError(`Traffic circuit references an invalid line or direction`);return{line:n,direction:r}}),o=Zp(a,i,!0,e);if(o.id=String(r.id??o.id),n.has(o.id))throw TypeError(`Traffic circuit IDs must be unique`);n.add(o.id);for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=sc(t.line,t.direction>0?t.line.length:0),i=sc(n.line,n.direction>0?0:n.line.length),o=(r.tangent.x*i.tangent.x+r.tangent.z*i.tangent.z)*t.direction*n.direction;if(Math.hypot(r.x-i.x,r.z-i.z)>1e-4||o<.9999)throw TypeError(`Traffic circuit segments must meet with continuous tangents`)}return o})}let n=new Map(e.lines.map(e=>{let t=0;for(let n=1;n<e.points.length;n++){let r=e.points[n-1],i=e.points[n];t+=r.x*i.z-i.x*r.z}return[e.id,t]})),r=new Map(e.lines.flatMap(e=>[1,-1].map(t=>[Hp(e.id,t),{line:e,direction:t,key:Hp(e.id,t),next:[]}])));for(let t of e.transitions??[]){let e=r.get(Hp(t.fromLineId,t.fromEnd===`end`?1:-1)),n=r.get(Hp(t.toLineId,t.toEnd===`start`?1:-1));if(!e||!n||e.line===n.line)continue;let i=sc(e.line,e.direction>0?e.line.length:0),a=sc(n.line,n.direction>0?0:n.line.length),o=(i.tangent.x*a.tangent.x+i.tangent.z*a.tangent.z)*e.direction*n.direction;Math.hypot(i.x-a.x,i.z-a.z)>1e-4||o<.9999||e.next.push(n)}let i=[],a=new Set(t.keys());for(;a.size;){let e=a.values().next().value,t=new Set([e]),n=[e];for(a.delete(e);n.length;){let e=n.shift();for(let i of[1,-1])for(let o of r.get(Hp(e,i)).next)t.has(o.line.id)||(t.add(o.line.id),a.delete(o.line.id),n.push(o.line.id))}i.push(t)}let o=[];for(let t of i){let i=null,a=-1/0,s=0,c=[...r.values()].filter(e=>t.has(e.line.id)),l=new Map([...t].map((e,t)=>[e,t]));for(let t of c){let r=(c,u,d)=>{if(!(++s>3e4))for(let s of c.next)if(s.key===t.key&&u.length>=2){let t=new Set,r=0,s=0;for(let e of u)t.add(e.line.from),t.add(e.line.to),r+=n.get(e.line.id)*e.direction,s+=e.line.length;let c=t.size*1e7+Math.abs(r)*100+s,l=c>a?Zp(u,o.length,!0,e):null;c>a&&(i=l,a=c)}else!d.has(s.line.id)&&l.get(s.line.id)>=l.get(t.line.id)&&(d.add(s.line.id),u.push(s),r(s,u,d),u.pop(),d.delete(s.line.id))};r(t,[t],new Set([t.line.id]))}i&&o.push(i)}return o}function $p(e){let t=[],n=new Map,r=new Map,i=2.8;for(let r of e){let e=Math.ceil(r.length/1.2),i=[],a=Wp();for(let n=0;n<e;n++){let o=n/e*r.length;Kp(r,o,a);let s=a.physical??a,c={index:t.length,path:r,distance:o,x:s.x,y:a.physical?s.y:0,z:s.z,spacing:r.length/e};t.push(c),i.push(c)}n.set(r.id,i)}let a=new Int32Array(t.length);for(let e=0;e<a.length;e++)a[e]=e;let o=new Uint8Array(t.length),s=e=>{for(;a[e]!==e;)a[e]=a[a[e]],e=a[e];return e},c=(e,t)=>{a[s(e)]=s(t),o[e]=1,o[t]=1};for(let e of t){let t=Math.floor(e.x/i),n=Math.floor(e.y/i),a=Math.floor(e.z/i),o=!!e.path.surfaceWorld;for(let s=-1;s<=1;s++)for(let l=o?-1:0;l<=+!!o;l++)for(let o=-1;o<=1;o++){let u=r.get(`${t+s},${n+l},${a+o}`);if(u)for(let t of u){let n=Math.abs(e.distance-t.distance);e.path===t.path&&Math.min(n,e.path.length-n)<11.68||(e.x-t.x)**2+(e.y-t.y)**2+(e.z-t.z)**2<i*i&&c(e.index,t.index)}}let s=`${t},${n},${a}`;r.has(s)||r.set(s,[]),r.get(s).push(e)}for(let e of n.values()){let t=null,n=null;for(let r of e)o[r.index]&&(n&&r.distance-n.distance<10.68&&c(n.index,r.index),t??=r,n=r);t&&n&&Vp(t.distance-n.distance,t.path.length)<10.68&&c(n.index,t.index)}let l=new Map;for(let e of t)if(o[e.index]){let t=s(e.index);l.has(t)||l.set(t,new Map);let n=l.get(t);n.has(e.path.id)||n.set(e.path.id,[]),n.get(e.path.id).push(e)}return[...l.values()].map((e,t)=>{let n=[];for(let[t,r]of e)for(let e of r){let r=n.at(-1),i=Math.max(0,e.distance-e.spacing),a=Math.min(e.path.length,e.distance+e.spacing);r?.pathId===t&&i<=r.end+1e-6?r.end=a:n.push({pathId:t,start:i,end:a})}return{id:`network-block-${t+1}`,owner:null,zones:n,queryStamp:0,waiters:new Set}})}function em(e,t,n=e.distance){for(let r of t.zones)if(r.pathId===e.path.id)for(let t=-1;t<=1;t++){let i=n+t*e.path.length;if(i+e.halfLength+.2>=r.start&&i-e.halfLength-.2<=r.end)return!0}return!1}function tm(e,t){t.x=e.x,t.y=e.y,t.z=e.z,t.distance=e.distance,t.tangent.x=e.tangent.x,t.tangent.y=e.tangent.y,t.tangent.z=e.tangent.z,t.angle=e.angle,t.heading=e.heading,t.curvature=e.curvature,t.lineId=e.lineId,e.physical&&Object.assign(t.physical??={},e.physical)}function nm(e,t){let n=0,r=new Map((t.players??[]).map((e,t)=>[e.id,t]));for(let t of e)t.poseOffset=n,n+=t.count,t.pose=Wp(),t.carPoses=Array.from({length:t.count},Wp),t._nextCarPoses=Array.from({length:t.count},Wp),t._cachedDistance=NaN,t._ownerIndex=r.get(t.ownerId)??0;return new Float32Array(n*6)}function rm(e,t,n){for(let r=0;r<e.count;r++)Kp(e.path,t+(r-(e.count-1)/2)*e.spacing,n[r])}function im(e,t){for(let n=0;n<e.count;n++){let r=e.carPoses[n],i=(e.poseOffset+n)*6;t[i]=r.x,t[i+1]=r.y,t[i+2]=r.z,t[i+3]=r.angle,t[i+4]=+!!e.active,t[i+5]=e._ownerIndex}}function am(e,t){rm(e,e.distance,e.carPoses),Kp(e.path,e.distance,e.pose),e._cachedDistance=e.distance,im(e,t)}function om(e,t,n,r,i,a){let o=e.tangent,s=t.tangent,c=Rp*(Math.abs(n*o.x+r*o.z)+Math.abs(n*s.x+r*s.z))+zp*(Math.abs(-n*o.z+r*o.x)+Math.abs(-n*s.z+r*s.x))+.06;return Math.abs(i*n+a*r)>=c}function sm(e,t){if(e.physical&&t.physical){let n=e.physical,r=t.physical,i=r.x-n.x,a=r.y-n.y,o=r.z-n.z;if(i*i+a*a+o*o>2.7*2.7)return!1;let s=(e,t,s)=>Math.abs(i*e+a*t+o*s)>=Rp*(Math.abs(e*n.tx+t*n.ty+s*n.tz)+Math.abs(e*r.tx+t*r.ty+s*r.tz))+zp*(Math.abs(e*n.rx+t*n.ry+s*n.rz)+Math.abs(e*r.rx+t*r.ry+s*r.rz))+.06;return!s(n.tx,n.ty,n.tz)&&!s(n.rx,n.ry,n.rz)&&!s(r.tx,r.ty,r.tz)&&!s(r.rx,r.ry,r.rz)}let n=t.x-e.x,r=t.z-e.z;if(n*n+r*r>2.7*2.7)return!1;let i=e.tangent,a=t.tangent;return!om(e,t,i.x,i.z,n,r)&&!om(e,t,-i.z,i.x,n,r)&&!om(e,t,a.x,a.z,n,r)&&!om(e,t,-a.z,a.x,n,r)}function cm(e,t){if(e.some(e=>e.surfaceWorld))return lm(t);let n=1/0,r=1/0,i=-1/0;for(let t of e)for(let e of t.segments)for(let t of e.line.points)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x);let a=Math.floor(n/4)-3,o=Math.floor(r/4)-3,s=Math.ceil((i-n)/4)+8,c=new Map,l=(e,t)=>(Math.floor(t/4)-o)*s+Math.floor(e/4)-a;for(let e of t)e._cars=e.carPoses.map(t=>({train:e,pose:t,cell:null,index:0}));return{update:e=>{for(let t of e._cars){let e=l(t.pose.x,t.pose.z);if(t.cell===e)continue;if(t.cell!==null){let e=c.get(t.cell),n=e.pop();n!==t&&(e[t.index]=n,n.index=t.index)}let n=c.get(e);n||(n=[],c.set(e,n)),t.cell=e,t.index=n.length,n.push(t)}},collides:(e,t)=>{for(let n of t){let t=l(n.x,n.z);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let a=c.get(t+r*s+i);if(a){for(let t of a)if(t.train!==e&&sm(n,t.pose))return!0}}}return!1}}}function lm(e){let t=new Map,n=e=>`${Math.floor(e.x/4)},${Math.floor(e.y/4)},${Math.floor(e.z/4)}`;for(let t of e)t._cars=t.carPoses.map(e=>({train:t,pose:e,cell:null,index:0}));return{update:e=>{for(let r of e._cars){let e=n(r.pose.physical);if(r.cell===e)continue;if(r.cell!==null){let e=t.get(r.cell),n=e.pop();n!==r&&(e[r.index]=n,n.index=r.index)}let i=t.get(e);i||(i=[],t.set(e,i)),r.cell=e,r.index=i.length,i.push(r)}},collides:(e,n)=>{for(let r of n){let n=r.physical,i=Math.floor(n.x/4),a=Math.floor(n.y/4),o=Math.floor(n.z/4);for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){let l=t.get(`${i+n},${a+s},${o+c}`);if(l){for(let t of l)if(t.train!==e&&sm(r,t.pose))return!0}}}return!1}}}function um(e){if(!Tt(e))return e;let t=new Map(e.lines.map(t=>[t.id,Ss(e,t)]));return{...e,lines:e.lines.map(e=>{let n=t.get(e.id);return{...e,alignment:null,length:n.length,distances:e.distances.map(e=>Ts(n,e)),stops:e.stops?.map(e=>({...e,distance:Ts(n,e.distance)}))}}),junctions:e.junctions?.map(e=>({...e,lines:e.lines.map(e=>({...e,distance:Ts(t.get(e.lineId),e.distance)}))}))}}function dm(e,t,n,r,i){let a=0,o=e.length;for(;a<o;){let t=a+o>>1;e[t].start<=n?a=t+1:o=t}for(let n=a-1;n>=0&&e[n].maximumEnd>=t;n--){let a=e[n];a.end<t||a.block.queryStamp===r||(a.block.queryStamp=r,i.push(a.block))}}function fm(e,t){let n=new Map(e.map(e=>[e.id,[]]));for(let e of t)for(let t of e.zones)n.get(t.pathId).push({...t,block:e});for(let e of n.values()){e.sort((e,t)=>e.start-t.start);let t=-1/0;for(let n of e)t=Math.max(t,n.end),n.maximumEnd=t}let r=0;return(e,t,i)=>{i.length=0;let a=n.get(e.path.id);if(!a.length)return i;let o=++r,s=e.halfLength+.2,c=e.path.length;return dm(a,t-s,t+s,o,i),t<s&&dm(a,t-s+c,c,o,i),t+s>c&&dm(a,0,t+s-c,o,i),i}}function pm(e,t){let n=t.map(e=>Math.max(0,Math.floor(e.length/12))),r=n.reduce((e,t)=>e+t,0),i=t.map((e,t)=>Math.min(n[t],Math.max(1,Math.min(new Set(e.segments.flatMap(e=>[e.line.from,e.line.to])).size,Math.floor(e.length/18))))),a=e.traffic?.trainCount;if(a===void 0)return{counts:i,requested:i.reduce((e,t)=>e+t,0),capacity:r};if(!Number.isInteger(a)||a<0||a>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);if(!r)return{counts:n,requested:a,capacity:r};let o=Math.min(a,r),s=n.map(e=>Math.floor(o*e/r)),c=o-s.reduce((e,t)=>e+t,0),l=n.map((e,t)=>({index:t,fraction:o*e/r-s[t]})).sort((e,t)=>t.fraction-e.fraction||e.index-t.index);for(let{index:e}of l)c>0&&s[e]<n[e]&&(s[e]++,c--);return{counts:s,requested:a,capacity:r}}function mm(e){let t=Qp(e);if(!t.length){let t=Fp(um(e)),n=new Map(e.lines.map(e=>[e.id,e]));for(let r of t.trains){let t=n.get(r.lineId);r.color=t.color,r.path=Zp([{line:t,direction:1}],0,!1,e),r.homeCityId=t.from,r.ownerId=Up(e,r.id,t.from,t)}let r=nm(t.trains,e);for(let e of t.trains)am(e,r);return{trains:t.trains,mode:`shuttles`,paths:[],poseBuffer:r,poseStride:6,stats:{requestedTrainCount:e.traffic?.trainCount??t.trains.length,trainCount:t.trains.length,capacity:t.capacity},get reservations(){return t.reservations},sampleTrain:(e,t=0,n)=>Kp(e.path,e.distance+t,n),update(e){t.update(e);for(let e of t.trains)am(e,r)}}}let n=[],r=pm(e,t);for(let[i,a]of t.entries()){let t=[...new Set(a.segments.flatMap(e=>[e.line.from,e.line.to]))],o=r.counts[i];a.trains=[];for(let r=0;r<o;r++){let i=`${a.id}-train-${r+1}`,s=t[r%t.length],c={id:i,path:a,homeCityId:s,ownerId:Up(e,i,s),color:[`coral`,`teal`,`gold`,`blue`][r%4],distance:r/o*a.length,count:3,spacing:Ip,halfLength:Lp,direction:1,speed:2.6,active:!1,waiting:!1,_leader:null};n.push(c),a.trains.push(c)}}let i=nm(n,e);for(let e of n)am(e,i);let a=$p(t),o=new Map(n.map(e=>[e.id,e])),s=fm(t,a),c=cm(t,n),l=[],u=[],d=[];function f(e,t,n=!1){if(e.owner===t.id)return!0;let r=e.waiters.values().next().value;return e.owner||r!==void 0&&r!==t.id?(n&&e.waiters.add(t.id),!1):!0}function p(e,t){e.owner=t.id,e.waiters.delete(t.id)}function m(e,t){if(s(e,t,l),l.some(t=>!f(t,e))||(rm(e,t,e._nextCarPoses),c.collides(e,e._nextCarPoses)))return!1;e.distance=t,am(e,i);for(let t of l)p(t,e);return e.active=!0,c.update(e),im(e,i),!0}function h(e,t=!1){if(!m(e,e.distance)&&t){d.length=0;for(let t of e.path.trains)t.active&&d.push(t);if(d.sort((e,t)=>e.distance-t.distance),d.length)for(let t=0;t<d.length;t++){let n=d[t],r=d[(t+1)%d.length],i=d.length===1?e.path.length:Vp(r.distance-n.distance,e.path.length);if(!(i<e.halfLength*2+n.halfLength+r.halfLength+1.8)&&m(e,Vp(n.distance+i/2,e.path.length)))return}else for(let t=1;t<12;t++)if(m(e,e.path.length*t/12))return}}for(let e of n)h(e);function g(e){for(let e of n)e._cachedDistance!==e.distance&&(am(e,i),e.active&&c.update(e));for(let e of a)e.owner&&!em(o.get(e.owner),e)&&(e.owner=null);for(let t of n)t.active||(t._spawnRetry=(t._spawnRetry??0)-e,t._spawnRetry<=0&&(h(t,!0),t._spawnRetry=.5));for(let e of t){e.trains.sort((e,t)=>e.distance-t.distance);let t=null,n=null;for(let r of e.trains)r.active&&(n&&(n._leader=r),t??=r,n=r);n&&(n._leader=n===t?null:t)}for(let t of n){if(!t.active){t.waiting=!0;continue}t.waiting=!1;let n=t.speed*e;if(t._leader){let e=t._leader,r=Vp(e.distance-t.distance,t.path.length)-t.halfLength-e.halfLength-.8;n=Math.min(n,Math.max(0,r))}let r=Vp(t.distance+n,t.path.length);s(t,r,l),s(t,t.distance,u);let a=!1;for(let e of l)f(e,t,!0)||(a=!0);for(let e of u)f(e,t,!0)||(a=!0);if(a||=(rm(t,r,t._nextCarPoses),c.collides(t,t._nextCarPoses)),a)t.waiting=!0;else{for(let e of l)p(e,t);for(let e of u)p(e,t);t.distance=r;for(let e=0;e<t.count;e++)tm(t._nextCarPoses[e],t.carPoses[e]);Kp(t.path,r,t.pose),t._cachedDistance=r,c.update(t),im(t,i)}}}return{mode:`circuits`,trains:n,paths:t,poseBuffer:i,poseStride:6,stats:{requestedTrainCount:r.requested,trainCount:n.length,capacity:r.capacity},sampleTrain:(e,t=0,n)=>Kp(e.path,e.distance+t,n),get reservations(){return a.map(e=>({id:e.id,trainId:e.owner,zones:e.zones}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(!e)return;let t=Math.ceil(e/Bp);for(let n=0;n<t;n++)g(e/t)}}}var hm={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`};function gm(e,t,n={}){let r=!!Tt(t),i=n.traffic??mm(t),a=new dt;a.name=`instanced-trains`,e.add(a);let o=new Map((t.players??[]).map(e=>[e.id,kc(e)]));a.userData.ownedMaterials=[...o.values()].flatMap(e=>Object.values(e));let s=i.trains.reduce((e,t)=>e+t.count,0),l=new Float32Array(s*6),u=new Map,d=new Map,p=0,m=!1,h=i.trains.map(e=>{let t=p;return p+=e.count,{state:e,parts:Array.from({length:e.count},(n,r)=>{let i=new c;return i.userData={trainId:e.id,poseOnly:!0,poseIndex:t+r},i}),poseOffset:t}}),g=()=>i.poseBuffer??l;function _(){let e=g();h.poseBuffer=e;for(let t of h){let n=t.state;for(let r=0;r<t.parts.length;r++){let a=t.parts[r],o=((i.poseBuffer?n.poseOffset:t.poseOffset)+r)*6;if(a.userData.poseIndex=o/6,!i.poseBuffer){let t=n.carPoses?.[r]??i.sampleTrain(n,(r-(n.count-1)/2)*n.spacing);e[o]=t.x,e[o+1]=t.y,e[o+2]=t.z,e[o+3]=t.angle,e[o+4]=+!!n.active,e[o+5]=0}a.position.set(e[o],e[o+1],e[o+2]),a.rotation.y=e[o+3]+(r===0?Math.PI:0),a.visible=e[o+4]>0}}}let v=new tt,b=new tt,x=new bt,S=new Ce(new J,2.2),C=new J,w=new _t,T=new J(1,1,1),E=new J(0,1,0),D=new f(.64,.74,1),O=new Float32Array(D.attributes.position.count*3);for(let e=0;e<O.length;e+=3)Yt.metal.color.toArray(O,e);D.setAttribute(`color`,new z(O,3));let k=qt(new y({color:16777215,vertexColors:!0,roughness:1,flatShading:!0}));k.name=`train-gangway`,a.userData.ownedMaterials.push(k);let A=null,j=0,M=new tt,N=new tt,ee=new J,P=new J,F=new J,te=new J,ne=new J,I=new J,L=new J,R=new J,B=new J,V={totalTrains:h.length,totalCars:s,visibleCars:0,visibleTrains:0,visibleConnectors:0,batches:0,templates:0,uploadedMatrices:0};function re(e,n){return r?Ke(t,e.position.x,e.position.y,e.position.z,e.rotation.y,n):(w.setFromAxisAngle(E,e.rotation.y),n.compose(e.position,w,T))}function ie(t,n){re(t,M),re(n,N),P.setFromMatrixPosition(M),F.setFromMatrixPosition(N),R.subVectors(F,P),te.setFromMatrixColumn(M,2),ne.setFromMatrixColumn(N,2);let r=te.dot(R)>=0?1:-1,i=ne.dot(R)>=0?-1:1;P.set(0,.88,r*.92).applyMatrix4(M),F.set(0,.88,i*.92).applyMatrix4(N),R.subVectors(F,P);let a=R.length();return a<.02||a>2?!1:(ee.copy(P).add(F).multiplyScalar(.5),S.center.copy(ee).applyMatrix4(e.matrixWorld),S.radius=.85,L.setFromMatrixColumn(M,1).add(B.setFromMatrixColumn(N,1)).normalize(),R.multiplyScalar(1/a),I.crossVectors(L,R).normalize(),L.crossVectors(R,I).normalize(),v.makeBasis(I,L,R).scale(C.set(1,1,a)),v.setPosition(ee),!0)}function ae(e,t){let n=`${e.state.ownerId??e.state.color}:${+!!t}`;if(!u.has(n)){let r=up(Bf(lp(new dt,{palette:o.get(e.state.ownerId),color:hm[e.state.color]??`redLight`,cab:t})));a.userData.ownedMaterials.push(...r.userData.ownedMaterials),u.set(n,r.children.map(e=>({geometry:e.geometry,material:e.material})))}return{key:n,parts:u.get(n)}}function oe(n,{mapBlend:i=0,prewarm:o=!1}={}){if(m||(a.visible=i<.999||o,V.visibleCars=0,V.visibleTrains=0,V.visibleConnectors=0,V.uploadedMatrices=0,!a.visible))return;n&&(n.updateMatrixWorld(),b.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),x.setFromProjectionMatrix(b)),e.updateWorldMatrix(!0,!1);let s=new Map,c=new Set;S.radius=2.2;for(let i of h)for(let a=0;a<i.parts.length;a++){let o=i.parts[a];if(!o.visible||(r?Ve(t,o.position.x,o.position.y+.8,o.position.z,S.center):S.center.copy(o.position).addScaledVector(E,.8),S.center.applyMatrix4(e.matrixWorld),n&&!x.intersectsSphere(S)))continue;let l=a===0||a===i.parts.length-1,u=`${i.state.ownerId??i.state.color}:${+!!l}`;s.has(u)||s.set(u,{train:i,cab:l,cars:[]}),s.get(u).cars.push({train:i,part:o}),V.visibleCars++,c.add(i.state.id)}for(let[e,t]of d)s.has(e)||t.meshes.forEach(e=>{e.count=0});for(let[e,t]of s){let n=d.get(e);if(!n||n.capacity<t.cars.length){if(n)for(let e of n.meshes)a.remove(e),e.dispose();let r=ae(t.train,t.cab),i=2**Math.ceil(Math.log2(Math.max(16,t.cars.length)));n={capacity:i,meshes:r.parts.map(e=>{let n=new Fe(e.geometry,e.material,i);return n.count=0,n.instanceMatrix.setUsage(xe),n.frustumCulled=!1,n.castShadow=!0,n.receiveShadow=!0,n.userData.instanceTrainIds=[],n.userData.ownerId=t.train.state.ownerId,a.add(n),n})},d.set(e,n)}for(let e=0;e<t.cars.length;e++){let{train:r,part:i}=t.cars[e];re(i,v);for(let t of n.meshes)t.setMatrixAt(e,v),t.userData.instanceTrainIds[e]=r.state.id}for(let e of n.meshes)e.count=t.cars.length,e.userData.instanceTrainIds.length=e.count,e.instanceMatrix.clearUpdateRanges(),e.instanceMatrix.addUpdateRange(0,e.count*16),e.instanceMatrix.needsUpdate=!0,e.boundingSphere=null,V.uploadedMatrices+=e.count}let l=V.visibleCars;if(l>j&&(A&&(a.remove(A),A.dispose()),j=2**Math.ceil(Math.log2(Math.max(16,l))),A=new Fe(D,k,j),A.name=`train-gangways`,A.count=0,A.frustumCulled=!1,A.instanceMatrix.setUsage(xe),A.castShadow=!0,A.receiveShadow=!0,A.userData={isTrainConnector:!0,instanceTrainIds:[]},a.add(A)),A){for(let e of h)if(c.has(e.state.id))for(let t=1;t<e.parts.length;t++){let r=e.parts[t-1],i=e.parts[t];if(r.visible&&i.visible&&ie(r,i)&&(!n||x.intersectsSphere(S))){if(V.visibleConnectors>=j)break;A.setMatrixAt(V.visibleConnectors,v),A.userData.instanceTrainIds[V.visibleConnectors++]=e.state.id}}A.count=V.visibleConnectors,A.userData.instanceTrainIds.length=A.count,A.boundingSphere=null,A.instanceMatrix.clearUpdateRanges(),A.instanceMatrix.addUpdateRange(0,A.count*16),A.instanceMatrix.needsUpdate=!0,V.uploadedMatrices+=A.count}V.visibleTrains=c.size,V.batches=[...d.values()].reduce((e,t)=>e+t.meshes.length,0)+ +!!A,V.templates=u.size}function H(){if(!m){m=!0;for(let e of d.values())e.meshes.forEach(e=>e.dispose());for(let e of u.values())e.forEach(e=>e.geometry.dispose());A?.dispose(),D.dispose(),a.userData.ownedMaterials.forEach(e=>e.dispose()),a.clear(),a.removeFromParent()}}return _(),{root:a,trains:h,traffic:i,stats:V,get poseBuffer(){return g()},update(e){if(!m){let t=performance.now();i.update(e);let n=performance.now();_(),V.simulationMs=n-t,V.poseMs=performance.now()-n}},updateView:oe,dispose:H}}Object.freeze([`meadow`,`scrub`,`dune`,`outcrop`,`frost`]);var _m=e(Wn(),1),vm=1e5,ym=.026;function bm(e,t,n){let r=[];for(let i of t){if(i.points.length<2||!(i.width>0))continue;let t=i.points.map(t=>{let r=Ae(e,n,t);return{X:Math.round(r.x*vm),Y:Math.round(r.z*vm)}}).filter((e,t,n)=>!t||e.X!==n[t-1].X||e.Y!==n[t-1].Y);if(t.length<2)continue;let a=new _m.default.ClipperOffset(2,.008*vm),o=[];a.AddPath(t,_m.default.JoinType.jtRound,_m.default.EndType.etOpenRound),a.Execute(o,i.width*.5*vm),r.push(...o)}if(!r.length)return[];let i=new _m.default.Clipper,a=new _m.default.PolyTree;return i.AddPaths(r,_m.default.PolyType.ptSubject,!0),i.Execute(_m.default.ClipType.ctUnion,a,_m.default.PolyFillType.pftNonZero,_m.default.PolyFillType.pftNonZero),_m.default.JS.PolyTreeToExPolygons(a).map(({outer:e,holes:t})=>({outer:e.map(e=>[e.X/vm,e.Y/vm]),holes:t.map(e=>e.map(e=>[e.X/vm,e.Y/vm]))}))}function xm(e,t,{surfaceRoot:n=null}={}){let r=new Map((t.cities??[]).map(e=>[e.id,e])),i=new Map,a=!!Tt(t);for(let e of t.cityStreets??[]){if(e.points.length<2)continue;let n=r.get(e.cityId),a=Number.isFinite(n?.x)&&Number.isFinite(n?.z)?n:e.points[0],o=t.biomes&&ln(t,a.x,a.z)===`desert`?`gravel`:`sand`,s=`${e.cityId??`network`}:${o}`;i.has(s)||i.set(s,{anchor:a,material:o,streets:[]}),i.get(s).streets.push(e)}let o=[];for(let{anchor:r,material:s,streets:c}of i.values()){let i=bm(t,c,r).map(({outer:e,holes:t})=>{let n=new k(e.map(([e,t])=>new Y(e,-t)));return n.holes=t.map(e=>new w(e.map(([e,t])=>new Y(e,-t)))),n});if(!i.length)continue;let l=new G(i);if(l.rotateX(-Math.PI/2),a){let e=l;l=Wc(e,3),e.dispose()}let u=l.getAttribute(`position`),d={},f=new J;for(let e=0;e<u.count;e++)We(t,r.x,r.z,u.getX(e),u.getZ(e),d),n?(Ve(t,d.x,ym,d.z,f),u.setXYZ(e,f.x,f.y,f.z)):u.setXYZ(e,d.x,ym,d.z);l.computeVertexNormals();let p=Pf(n??e,l,s);p.name=`joined-city-streets`,p.userData.surfaceSpace=!!n,o.push(p)}return o}function Sm(e,t,{requestChunk:n,size:r=192,maxChunks:i=48,maxVisibleChunks:a=1/0,maxPending:s=2,maxBytes:c=134217728,uploadMesh:l}={}){if(typeof n!=`function`)throw TypeError(`Regional rendering requires a worker requestChunk function`);let u=new dt;u.name=`local-world-detail`,e.add(u);let d=new Map,f=new Map,p=new Map,g=new Map,_=new Map,b=new Map,x=new bt,S=new bt,C=new tt,w=new J,T=new J,E=new h,D=new J,O=Tt(t),k=new L,A=new J,j={},M=O?new Ce(new J(0,-O.radius,0),O.radius):null,N=new h,ee=new Ce,P=new J,F=0,te=!1,ne=!1,I=[],R=``,B=0,V=[],re=[],ie=[],ae=[],oe=0,H=!0,U=t.gameplay?hp(t,{onChange(){H=!0,oe++,R=``}}):null,se=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),ce=new Set([`water`,`surf`,`window`,`lamp`]),le=Math.max(35,...t.mountains.map(e=>e.height)),ue=[...t.cities,...t.mountains.filter(e=>!e.range),...t.stations],de=new Set(t.mountains),fe=new Map(ue.map(e=>[e,de.has(e)?e.radius??4:lt(t,e.x,e.z,e.radius??4)])),W={loadedChunks:0,visibleChunks:0,pendingChunks:0,requestedChunks:0,triangles:0,bytes:0,errors:0,requiredChunks:0,prefetchChunks:0,coverageLimited:!1,budgetOverflow:!1,maxBytes:c,uploadedMeshes:0,uploadingChunks:0,revealingChunks:0},pe=(e,t)=>{let n=JSON.stringify(e),r=t.materials.get(n);return r||(r=Yo(new y({name:e.name,color:new v().fromArray(e.color),roughness:e.roughness,metalness:e.metalness,side:e.side,flatShading:!0,vertexColors:e.vertexColors}),t.reveal),qt(r,{kind:e.sceneStyle??`asset`}),t.materials.set(n,r)),r};function me(e){e.trees&&U.removeChunk(e.key),e.root.traverse(e=>{e.isMesh&&e.geometry.dispose()});for(let t of e.materials.values())t.dispose();e.depthMaterial?.dispose()}function he(e){me(e),u.remove(e.root),d.delete(e.key),W.bytes-=e.bytes,W.triangles-=e.triangles,H=!0,oe++}function ge(e){for(let[t,n]of p)for(;n.next<n.packet.meshes.length;){let t=n.packet.meshes[n.next++],r=new $e;r.setAttribute(`position`,new z(t.position,3)),t.index&&r.setIndex(new z(t.index,1)),t.normal?r.setAttribute(`normal`,new z(t.normal,3)):r.computeVertexNormals(),t.color&&r.setAttribute(`color`,new z(t.color,3));let i=n.packet.bounds,a=n.packet.renderBounds;a?(r.boundingBox=new h(new J().fromArray(a.min),new J().fromArray(a.max)),r.boundingSphere=r.boundingBox.getBoundingSphere(new Ce)):r.boundingSphere=new Ce(new J((i.minX+i.maxX)/2,le/2,(i.minZ+i.maxZ)/2),Math.hypot(i.maxX-i.minX,le+8,i.maxZ-i.minZ)/2),n.triangles+=(t.index?.length??t.position.length/3)/3;let s=new o(r,pe(t.material,n));Af(s,t.bvh);let c=new Set([t.position.buffer,t.normal?.buffer,t.color?.buffer,t.index?.buffer,...jf(t.bvh)].filter(Boolean));if(n.bytes+=[...c].reduce((e,t)=>e+t.byteLength,0),s.customDepthMaterial=n.depthMaterial,s.castShadow=!0,s.receiveShadow=!0,n.root.add(s),performance.now()>=e)return}}function _e(){for(let[e,t]of p){if(t.next<t.packet.meshes.length||l&&t.uploaded<t.next)continue;let n=t.packet.bounds,r=t.packet.renderBounds,i={key:e,root:t.root,bounds:r?new h(new J().fromArray(r.min),new J().fromArray(r.max)):new h(new J(n.minX,-4,n.minZ),new J(n.maxX,le,n.maxZ)),last:F,bytes:t.bytes,triangles:t.triangles,reveal:t.reveal,progress:0,materials:t.materials,depthMaterial:t.depthMaterial,lifePlacements:t.packet.lifePlacements??[],placements:t.packet.placements??[],cityStreets:t.packet.cityStreets??[],cellBounds:t.packet.cellBounds??t.packet.bounds};U&&t.packet.mutableTrees?.length&&(i.trees=U.addChunk(e,i.root,t.packet.mutableTrees,{reveal:t.reveal}),i.bounds.union(i.trees.bounds),i.bytes+=i.trees.bytes,i.triangles+=i.trees.triangles),u.add(t.root),d.set(e,i),p.delete(e),H=!0,oe++,W.bytes+=i.bytes,W.triangles+=i.triangles,W.loadedChunks=d.size}}function ve(e){e.cancelled=!0,me(e)}function ye(){if(l)for(let[e,t]of p){if(t.warming||t.uploaded>=t.next)continue;t.warming=!0;let n=()=>{!te&&!t.cancelled&&(t.uploaded++,t.warming=!1,W.uploadedMeshes++)},r=n=>{te||t.cancelled||(ve(t),p.delete(e),b.set(e,n),W.errors++,u.userData.lastError=String(n?.message??n))};try{let e=l(t.root.children[t.uploaded]);e?.then?Promise.resolve(e).then(n,r):n()}catch(e){r(e)}return}}function be(e,t){W.requestedChunks++;let r=new AbortController,i={controller:r},a=Promise.resolve().then(()=>n(t,{signal:r.signal}));i.promise=a,f.set(e,i),W.pendingChunks=f.size+p.size,Promise.resolve(a).then(t=>{if(f.get(e)===i&&(f.delete(e),!te&&g.has(e))){let n=new dt;n.name=`detail-${e}`;let r={value:0};p.set(e,{packet:t,root:n,next:0,uploaded:0,warming:!1,bytes:0,triangles:0,reveal:r,materials:new Map,depthMaterial:Xo(r)})}},t=>{f.get(e)===i&&(f.delete(e),te||t?.name===`AbortError`||(b.set(e,t),W.errors++,u.userData.lastError=String(t?.message??t)))}).finally(()=>{W.pendingChunks=f.size+p.size})}let xe=t.outline.map(e=>e[0]),G=t.outline.map(e=>e[1]),K={minX:Math.min(...xe),maxX:Math.max(...xe),minZ:Math.min(...G),maxZ:Math.max(...G)},Se=O?.complete?K.maxX-K.minX:0,q=O?.complete&&O.projection.type===`equirectangular`,we=q&&Array.isArray(t.biomes?.land)?[...t.biomes.land,...t.biomes.oceanShore??[],...t.biomes.lakeShore??[]].map(e=>{let t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let[n,r]of e[0])t.minX=Math.min(t.minX,n),t.maxX=Math.max(t.maxX,n),t.minZ=Math.min(t.minZ,r),t.maxZ=Math.max(t.maxZ,r);return t}):null,Te=we?[...ue.map(e=>{let t=fe.get(e);return{minX:e.x-t,maxX:e.x+t,minZ:e.z-t,maxZ:e.z+t}}),...(t.lines??[]).map(e=>{let n={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let t of e.points??[])n.minX=Math.min(n.minX,t.x),n.maxX=Math.max(n.maxX,t.x),n.minZ=Math.min(n.minZ,t.z),n.maxZ=Math.max(n.maxZ,t.z);if(Number.isFinite(n.minX)){let e=Math.max(lt(t,n.minX,n.minZ,4),lt(t,n.maxX,n.maxZ,4));n.minX-=e,n.maxX+=e,n.minZ-=e,n.maxZ+=e}return n})]:[],Ee=new Map;function De(e){if(!we)return!0;if(!Ee.has(e.key)){let t=e.x-r/2,n=e.x+r/2,i=e.z-r/2,a=e.z+r/2,o=(e,r=0)=>e.minX+r<=n&&e.maxX+r>=t&&e.minZ<=a&&e.maxZ>=i;Ee.set(e.key,we.some(e=>o(e))||Te.some(e=>o(e)||Se&&(o(e,-Se)||o(e,Se))))}return Ee.get(e.key)}function Oe(e){if(!q)return!0;let n=O.projection,i=Math.max(K.minX,e.x-r/2),a=Math.min(K.maxX,e.x+r/2),o=Math.max(K.minZ,e.z-r/2),s=Math.min(K.maxZ,e.z+r/2),c=n.centralLatitude*Math.PI/180-(o+s)/(2*n.radius),l=(s-o)/(2*n.radius),u=Math.cos(Math.max(0,Math.abs(c)-l));return Ve(t,(i+a)/2,(le-4)/2,(o+s)/2,ee.center),ee.radius=(O.radius+le)*Math.hypot((a-i)/(2*n.radius)*u,l)+(le+4)/2,S.intersectsSphere(ee)}let ke=e=>Se?((e+Se/2)%Se+Se)%Se-Se/2:e;function Ae(e,t){if(Se&&t-e>=Se)return[[K.minX,K.maxX]];if(!Se)return[[Math.max(K.minX,e),Math.min(K.maxX,t)]];let n=((e-K.minX)%Se+Se)%Se+K.minX,r=n+t-e;return r<=K.maxX?[[n,r]]:[[n,K.maxX],[K.minX,r-Se]]}function je(e,t,n){return k.origin.set(t,n,-1).unproject(e),e.isPerspectiveCamera?k.direction.set(t,n,1).unproject(e).sub(k.origin).normalize():k.direction.copy(w),k}function Me(e,n){e.updateMatrixWorld(),e.getWorldDirection(w),C.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),S.setFromProjectionMatrix(C);let r=1/0,i=-1/0,a=1/0,o=-1/0;if(O){let s=!1;N.makeEmpty();for(let c of[-4,le])for(let l of[-1,0,1])for(let u of[-1,0,1])je(e,l,u),M.radius=O.radius+c,k.intersectSphere(M,A)?(N.expandByPoint(A),xt(t,A,j),Se&&n&&(j.x=n.x+ke(j.x-n.x)),r=Math.min(r,j.x),i=Math.max(i,j.x),a=Math.min(a,j.z),o=Math.max(o,j.z)):s=!0;if(s)r=K.minX,i=K.maxX,a=K.minZ,o=K.maxZ;else if(q){let n=O.projection,s=N.getSize(T),c=Math.max(4,s.lengthSq()/(8*O.radius))*n.radius/O.radius;a=Math.max(K.minZ,a-c),o=Math.min(K.maxZ,o+c);let l=!1;for(let n of[K.minZ,K.maxZ])Ve(t,0,0,n,P),T.subVectors(P,M.center).dot(w)>=0||(P.project(e),Math.abs(P.x)<=1&&Math.abs(P.y)<=1&&P.z>=-1&&P.z<=1&&(l=!0,a=Math.min(a,n),o=Math.max(o,n)));if(l)r=K.minX,i=K.maxX;else{let e=Math.max(Math.abs(n.centralLatitude*Math.PI/180-a/n.radius),Math.abs(n.centralLatitude*Math.PI/180-o/n.radius)),t=c/Math.max(.01,Math.cos(e));r-=t,i+=t}}else{let e=Math.max(4,((i-r)**2+(o-a)**2)/(8*O.radius));r-=e,i+=e,a-=e,o+=e}}else for(let t of[-1,1])for(let n of[-1,1]){je(e,t,n);let s=Math.abs(k.direction.y)>1e-5?-k.origin.y/k.direction.y:-1;k.at(s>=0?s:e.far,T),r=Math.min(r,T.x),i=Math.max(i,T.x),a=Math.min(a,T.z),o=Math.max(o,T.z)}return{minX:r,maxX:i,minZ:a,maxZ:o}}function Ne(t,{dt:n=0,reveal:r=!0,reducedMotion:i=!1}={}){if(te)return;e.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),C.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),x.setFromProjectionMatrix(C),W.visibleChunks=W.revealingChunks=0;let a=[];for(let t of d.values())E.copy(t.bounds).applyMatrix4(e.matrixWorld),t.root.visible=x.intersectsBox(E),t.root.visible&&(W.visibleChunks++,r&&(t.progress=i?1:Math.min(1,t.progress+Math.max(0,n)/.38),t.reveal.value=t.progress*t.progress*(3-2*t.progress)),t.progress<1?W.revealingChunks++:a.push(t));let o=`${U?.revision??0}:`+a.map(e=>e.key).join(`|`);o!==R&&(R=o,I=a.flatMap(e=>e.lifePlacements).filter(e=>e.kind!==`tree`||!U?.removed.has(e.id)),B++)}function Pe(e,{mapBlend:n=0,target:o,budgetMs:h=5,prewarm:v=!1,coverageCamera:y=e,coverageCameras:x,retainVisible:w=!1,groundFocus:T,groundRadius:E=45,groundOnly:k=!1}={}){if(te||(F++,u.visible=n<.999,!u.visible&&!v&&!T))return;let A=[];k&&T?D.set(T.x,T.y??0,T.z):o&&D.copy(o);let j=(e,n)=>({key:`${e}:${n}`,x:e+r/2,z:n+r/2,size:r,distance:O?nt(t,D,{x:e+r/2,z:m.clamp(n+r/2,K.minZ,K.maxZ)})**2:ke(e+r/2-D.x)**2+(n+r/2-D.z)**2});_.clear(),g.clear();let M=[];if((u.visible||v)&&(!k||!T))for(let e of x?.length?x:[y])M.push({bounds:Me(e,o),coverage:e});if(T){let e=lt(t,T.x,T.z,Math.max(.001,E));M.push({bounds:{minX:T.x-e,maxX:T.x+e,minZ:T.z-e,maxZ:T.z+e}})}for(let{bounds:e,coverage:t}of M){let{minX:n,maxX:i,minZ:a,maxZ:s}=e;t&&(C.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),S.setFromProjectionMatrix(C)),!o&&!A.length&&D.set((n+i)/2,0,(a+s)/2),A.push(e);for(let[e,o]of Ae(n,i))for(let n=Math.floor(e/r)*r;n<o;n+=r)for(let e=Math.floor(Math.max(K.minZ,a)/r)*r;e<Math.min(K.maxZ,s);e+=r){let r=j(n,e);De(r)&&(!t||Oe(r))&&_.set(r.key,r)}for(let e of ue){let t=fe.get(e),o=Se?D.x+ke(e.x-D.x):e.x;if(o+t<n||o-t>i||e.z+t<a||e.z-t>s)continue;let c=j(Math.floor(e.x/r)*r,Math.floor(e.z/r)*r);_.set(c.key,c)}}let N=[..._.values()].sort((e,t)=>e.distance-t.distance);ne=!0,W.requiredChunks=_.size,W.coverageLimited=_.size>a;for(let e of N.slice(0,a))g.set(e.key,e);if(!W.coverageLimited){let e=new Map;for(let{minX:t,maxX:n,minZ:i,maxZ:a}of A)for(let[o,s]of Ae(t-r,n+r))for(let t=Math.floor(o/r)*r;t<s;t+=r)for(let n=Math.floor(Math.max(K.minZ,i-r)/r)*r;n<Math.min(K.maxZ,a+r);n+=r){let r=j(t,n);!g.has(r.key)&&De(r)&&e.set(r.key,r)}for(let t of[...e.values()].sort((e,t)=>e.distance-t.distance)){if(g.size>=Math.min(i,_.size+36))break;g.set(t.key,t)}}W.prefetchChunks=g.size-Math.min(_.size,a);for(let[e,t]of f)g.has(e)||(f.delete(e),t.controller.abort());for(let[e,t]of p)g.has(e)||(ve(t),p.delete(e));let ee=performance.now();ge(ee+h),ye(),_e(),Ne(e);for(let e of d.values())(g.has(e.key)||w&&e.root.visible)&&(e.last=F);for(let[e,t]of g){if(f.size+p.size>=s||performance.now()-ee>=h)break;let n=d.size?W.bytes/d.size:4194304;!_.has(e)&&W.bytes+n*(1+f.size+p.size)>c*.9||d.has(e)||f.has(e)||p.has(e)||b.has(e)||be(e,t)}if(d.size>i||W.bytes>c){let e=[...d.values()].filter(e=>!_.has(e.key)&&!(w&&e.root.visible)).sort((e,t)=>Number(g.has(e.key))-Number(g.has(t.key))||e.last-t.last);for(let t of e){if(d.size<=i&&W.bytes<=c)break;he(t)}}W.budgetOverflow=W.bytes>c,W.loadedChunks=d.size,W.pendingChunks=f.size+p.size,W.uploadingChunks=l?[...p.values()].filter(e=>e.uploaded<e.next).length:0}function Fe(){if(!te){te=!0;for(let e of[...d.values()])he(e);for(let e of p.values())ve(e);for(let e of f.values())e.controller.abort();U?.dispose(),u.removeFromParent(),g.clear(),_.clear(),f.clear(),p.clear(),W.loadedChunks=W.pendingChunks=0,I=[],R=``,B++,V=[],re=[],ie=[],ae=[],H=!1,oe++}}function Ie(){if(H){V=[],ie=[],ae=[];for(let e of d.values())V.push(...e.placements.filter(e=>e.kind!==`tree`||!U?.removed.has(e.id))),ie.push(...e.cityStreets),ae.push(...e.root.children.filter(e=>e.isMesh&&!ce.has(e.material.userData.sceneStyle)),...e.trees?.meshes??[]);re=V.filter(e=>se.has(e.kind)),H=!1}}function Le(e,n=0){if(te||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let i=Math.max(.001,lt(t,e.x,e.z,Math.max(0,n)));if(e.z-i<K.minZ||e.z+i>K.maxZ||!Se&&(e.x-i<K.minX||e.x+i>K.maxX))return!1;for(let[t,n]of Ae(e.x-i,e.x+i))for(let a=Math.floor(t/r)*r;a<n;a+=r)for(let t=Math.floor((e.z-i)/r)*r;t<e.z+i;t+=r){let e=`${a}:${t}`;if(De({key:e,x:a+r/2,z:t+r/2})&&!d.has(e))return!1}return!0}function Re(){return!te&&ne&&!W.coverageLimited&&(_.size>0||we!==null)&&[..._.keys()].every(e=>d.has(e))}return{root:u,update:Pe,updateVisibility:Ne,stats:W,dispose:Fe,hasCoverageAt:Le,fellTree:(e,t)=>U?.fellTree(e,t)??!1,removeTree:e=>U?.removeTree(e)??!1,updateTrees:e=>U?.update(e),get removedTreeIds(){return U?.removed},get treeRevision(){return U?.revision??0},get placements(){return Ie(),V},get placementRevision(){return oe},get cityStreets(){return Ie(),ie},getSceneryPlacements(){return Ie(),V},getCollisionPlacements(){return Ie(),re},getTerrainMeshes(){return Ie(),ae},get lifePlacements(){return I},get lifeRevision(){return B},get ready(){return Re()},get settled(){return Re()&&[..._.keys()].every(e=>{let t=d.get(e);return!t.root.visible||t.progress>=1})}}}var Cm=Object.freeze({terrain:-1.35,contour0:-.18,contour1:-.16,snow:-.14,sand:-1.24,waterLight:-1.27,ocean:-1.27,"route-paper":.025,"route-ink":.035});function wm(e,t,n,r){let i=!!t.getAttribute(`color`),a=new y({name:e.name.replace(/^map-/,`detail-base-`),color:i?16777215:e.color,vertexColors:i,roughness:1,metalness:0,side:2,flatShading:!1,depthWrite:!0,depthTest:!0});return a.onBeforeCompile=e=>{e.uniforms.detailBaseHeight={value:n},e.uniforms.detailBaseRadius={value:r},e.vertexShader=`uniform float detailBaseHeight; uniform float detailBaseRadius;
`+e.vertexShader;let t=r>0?`normalize(position + vec3(0.0, detailBaseRadius, 0.0))`:`vec3(0.0, 1.0, 0.0)`;e.vertexShader=e.vertexShader.replace(`#include <beginnormal_vertex>`,`
      vec3 detailBaseNormal = ${t};
      vec3 objectNormal = detailBaseNormal;
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif
    `),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,r>0?`vec3 transformed = detailBaseNormal * (detailBaseRadius + detailBaseHeight) - vec3(0.0, detailBaseRadius, 0.0);`:`vec3 transformed = vec3(position.x, detailBaseHeight, position.z);`)},a.customProgramCacheKey=()=>`detail-base-${r>0?`sphere`:`plane`}-v1`,qt(a,{kind:/water|ocean/.test(e.name)?`water`:`terrain`})}function Tm(e,t,n){let r=new dt;r.name=`detail-base`,e.add(r);let i=new Set,a=n.surface?.type===`sphere`?n.surface.radius:0,s=!1;return t?.traverse(e=>{if(!e.isMesh||!e.geometry?.getAttribute(`position`)||Array.isArray(e.material))return;let t=e.material.name.replace(/^map-/,``);if(!Object.hasOwn(Cm,t))return;let n=wm(e.material,e.geometry,Cm[t],a);i.add(n);let s=new o(e.geometry,n);s.name=`detail-base-${t}`,s.castShadow=!1,s.receiveShadow=!0,s.frustumCulled=!1,r.add(s)}),{root:r,dispose(){s||(s=!0,i.forEach(e=>e.dispose()),i.clear(),r.clear(),r.removeFromParent())}}}function Em({cities:e=256,trains:t=2048,seed:n=`continental-256`}={}){let r=Number(e),i=Number(t);if(!Number.isFinite(r)||r<8||r>4096||!Number.isInteger(r)||r%8!=0)throw TypeError(`Stress cities must be a multiple of 8 from 8 through4096`);if(!Number.isInteger(i)||i<0||i>32768)throw TypeError(`Stress trains must be an integer from 0 through32768`);let a=r/8,o=Math.ceil(Math.sqrt(a*2)),s=Math.ceil(a/o),c=o*500+300,l=s*500+300,u=c/2,d=l/2,f=s%2?250:0,p={seed:n,bounds:{width:c,depth:l},outline:[[-u,-d+100],[-u+100,-d],[u-100,-d],[u,-d+100],[u,d-100],[u-100,d],[-u+100,d],[-u,d-100]],density:1,minTurnRadius:9,cities:[],connections:[],mountains:[],river:{width:10,points:[[-u-100,f],[u+100,f]]},traffic:{trainCount:i,circuits:[]}},m=[`coral`,`teal`,`gold`,`blue`];for(let e=0;e<a;e++){let t=(e%o-(o-1)/2)*500,n=(Math.floor(e/o)-(s-1)/2)*500,r=[];for(let i=0;i<8;i++){let a=i*Math.PI/4,o=`region-${e+1}-city-${i+1}`;p.cities.push({id:o,x:t+Math.cos(a)*190,z:n+Math.sin(a)*190,level:1+(e*3+i*7)%10,ownerId:m[(e+i)%4]});let s=`regional-${e+1}-${i+1}`;p.connections.push({id:s,from:o,to:`region-${e+1}-city-${(i+1)%8+1}`}),r.push({lineId:s,direction:1})}p.traffic.circuits.push({id:`circuit-${e+1}`,segments:r}),e%o>0&&p.connections.push({id:`connector-west-${e+1}`,from:`region-${e}-city-1`,to:`region-${e+1}-city-5`}),e%o===0&&e>=o&&p.connections.push({id:`connector-north-${e+1}`,from:`region-${e-o+1}-city-3`,to:`region-${e+1}-city-7`})}for(let e=0;e<a;e+=8){let t=p.cities[e*8+5],n=p.cities[e*8+6],r=(t.x+n.x)/2,i=(t.z+n.z)/2;Math.abs(i-f)>30&&p.mountains.push({id:`regional-pass-${e+1}`,x:r,z:i,radius:23,height:24})}return p}var Dm=`modulepreload`,Om=function(e,t){return new URL(e,t).href},km={},Am=function(e){return e.pathname.endsWith(`.css`)},jm=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Mm=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Om(t,n);let r=s(t),i=Am(r);return jm(km,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Dm,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function Nm(e){return e.get(`layout`)??(e.has(`cities`)?`classic`:`settlement`)}async function Pm(e,t){let n=Nm(e),r={...e.has(`seed`)?{seed:e.get(`seed`)}:{},...e.has(`trains`)?{trainCount:Number(e.get(`trains`))}:{}};if(n===`settlement`){let{createSettlementWorld:e}=await Mm(async()=>{let{createSettlementWorld:e}=await import(`./settlement-world-BqXnCKot.js`);return{createSettlementWorld:e}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);return e(r)}if(n===`island`){let{createIslandWorld:e}=await Mm(async()=>{let{createIslandWorld:e}=await import(`./island-world-CBLcu6-d.js`);return{createIslandWorld:e}},__vite__mapDeps([6,1,2,3]),import.meta.url);return e(r)}if(n===`earth`){let{createEarthWorld:e}=await Mm(async()=>{let{createEarthWorld:e}=await import(`./earth-world-xElanl2w.js`);return{createEarthWorld:e}},__vite__mapDeps([7,3,2,8,9,5]),import.meta.url);return e(r)}if(n===`europe`){let{createEuropeWorld:e}=await Mm(async()=>{let{createEuropeWorld:e}=await import(`./europe-world-Nie4vWch.js`);return{createEuropeWorld:e}},__vite__mapDeps([10,8,3,2,5]),import.meta.url);return e(r)}if(n===`stress`)return Em({cities:e.has(`cities`)?Number(e.get(`cities`)):256,trains:e.has(`trains`)?Number(e.get(`trains`)):2048,seed:e.get(`seed`)??`continental-railway`});if([`crossroads`,`showcase`].includes(n)){let r=await fetch(new URL(`./worlds/${n}.json`,t));if(!r.ok)throw Error(`Could not load the authored world`);let i=await r.json();return e.has(`seed`)&&(i.seed=e.get(`seed`)),i}return{seed:e.get(`seed`)??27,cityCount:Number(e.get(`cities`))||8}}function Fm({WorkerClass:e,MessageChannelClass:t=globalThis.MessageChannel,detailWorkers:n=e?1:globalThis.navigator?.hardwareConcurrency>=4?2:1}={}){let r=()=>e?new e(new URL(`data:text/javascript;base64,aW1wb3J0IHsgZ2VuZXJhdGVXb3JsZCxnZW5lcmF0ZVdvcmxkUmVnaW9uLHZhbGlkYXRlV29ybGQgfSBmcm9tICcuL3dvcmxkLW1vZGVsLmpzJzsKaW1wb3J0IHsgY29tcGlsZURldGFpbFBhY2tldCB9IGZyb20gJy4vZGV0YWlsLWNvbXBpbGVyLmpzJzsKaW1wb3J0IHsgY3JlYXRlTW91bnRhaW5Db250b3VycyB9IGZyb20gJy4vbW91bnRhaW4tY29udG91cnMuanMnOwppbXBvcnQgeyBwcmVwYXJlTWFwVGVycmFpbiB9IGZyb20gJy4vbWFwLXRlcnJhaW4uanMnOwppbXBvcnQgeyBjb21waWxlTWFwVGVycmFpbkdlb21ldHJ5IH0gZnJvbSAnLi9tYXAtdGVycmFpbi1nZW9tZXRyeS5qcyc7CgpsZXQgd29ybGQ7CmZ1bmN0aW9uIGJ1ZmZlcnNPZih2YWx1ZSxyZXN1bHQ9bmV3IFNldCgpKXsKICBpZihBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKXJlc3VsdC5hZGQodmFsdWUuYnVmZmVyKTsKICBlbHNlIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpcmVzdWx0LmFkZCh2YWx1ZSk7CiAgZWxzZSBpZih2YWx1ZSYmdHlwZW9mIHZhbHVlPT09J29iamVjdCcpZm9yKGNvbnN0IGNoaWxkIG9mIE9iamVjdC52YWx1ZXModmFsdWUpKWJ1ZmZlcnNPZihjaGlsZCxyZXN1bHQpOwogIHJldHVybiByZXN1bHQ7Cn0Kc2VsZi5vbm1lc3NhZ2U9KHtkYXRhOntpZCx0eXBlLHBheWxvYWQscG9ydH19KT0+ewogIGlmKHR5cGU9PT0nc2hhcmUtd29ybGQnKXsKICAgIHRyeXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgc2hhcmluZyBkZXRhaWwnKTsKICAgICAgY29uc3Qge21hcFRlcnJhaW4sLi4ubmV0d29ya309d29ybGQ7CiAgICAgIHBvcnQucG9zdE1lc3NhZ2Uoe3dvcmxkOm5ldHdvcmt9KTsKICAgIH1jYXRjaChlcnJvcil7cG9ydC5wb3N0TWVzc2FnZSh7ZXJyb3I6e25hbWU6ZXJyb3IubmFtZSxtZXNzYWdlOmVycm9yLm1lc3NhZ2V9fSk7fQogICAgZmluYWxseXtwb3J0LmNsb3NlKCk7fQogICAgcmV0dXJuOwogIH0KICBpZih0eXBlPT09J2F0dGFjaC1wb3J0Jyl7CiAgICBwb3J0Lm9ubWVzc2FnZT0oe2RhdGF9KT0+ewogICAgICBpZihkYXRhLmVycm9yKXNlbGYucG9zdE1lc3NhZ2Uoe2lkLGVycm9yOmRhdGEuZXJyb3J9KTsKICAgICAgZWxzZXt3b3JsZD1kYXRhLndvcmxkO3NlbGYucG9zdE1lc3NhZ2Uoe2lkLHJlc3VsdDp7cmVhZHk6dHJ1ZX19KTt9CiAgICAgIHBvcnQuY2xvc2UoKTsKICAgIH07CiAgICByZXR1cm47CiAgfQogIHRyeXsKICAgIGNvbnN0IHN0YXJ0PXBlcmZvcm1hbmNlLm5vdygpO2xldCByZXN1bHQ7CiAgICBpZih0eXBlPT09J2dlbmVyYXRlJyl7CiAgICAgIHdvcmxkPWdlbmVyYXRlV29ybGQocGF5bG9hZCx7ZGV0YWlsOiduZXR3b3JrJ30pOwogICAgICBmb3IoY29uc3QgbW91bnRhaW4gb2Ygd29ybGQubW91bnRhaW5zKWlmKG1vdW50YWluLnJhbmdlKW1vdW50YWluLm1hcENvbnRvdXJzPWNyZWF0ZU1vdW50YWluQ29udG91cnMobW91bnRhaW4pOwogICAgICB3b3JsZC5tYXBUZXJyYWluPXttZXNoZXM6Y29tcGlsZU1hcFRlcnJhaW5HZW9tZXRyeShwcmVwYXJlTWFwVGVycmFpbih3b3JsZCksd29ybGQpfTsKICAgICAgY29uc3QgdmlvbGF0aW9ucz12YWxpZGF0ZVdvcmxkKHdvcmxkKTsKICAgICAgaWYodmlvbGF0aW9ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHdvcmxkOiAke3Zpb2xhdGlvbnNbMF0uZGV0YWlsPz92aW9sYXRpb25zWzBdLnR5cGV9YCk7CiAgICAgIHJlc3VsdD17d29ybGQsbWlsbGlzZWNvbmRzOnBlcmZvcm1hbmNlLm5vdygpLXN0YXJ0fTsKICAgIH1lbHNlIGlmKHR5cGU9PT0nY2h1bmsnKXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgcmVxdWVzdGluZyBkZXRhaWwnKTsKICAgICAgY29uc3QgcmVnaW9uPWdlbmVyYXRlV29ybGRSZWdpb24od29ybGQscGF5bG9hZCk7CiAgICAgIHJlc3VsdD1jb21waWxlRGV0YWlsUGFja2V0KHJlZ2lvbix3b3JsZCk7CiAgICAgIHJlc3VsdC5taWxsaXNlY29uZHM9cGVyZm9ybWFuY2Uubm93KCktc3RhcnQ7CiAgICB9ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gd29ybGQgcmVxdWVzdDogJHt0eXBlfWApOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7aWQscmVzdWx0fSx0eXBlPT09J2NodW5rJz9bLi4uYnVmZmVyc09mKHJlc3VsdCldCiAgICAgIDp0eXBlPT09J2dlbmVyYXRlJz9bLi4uYnVmZmVyc09mKHdvcmxkLm1hcFRlcnJhaW4pXTpbXSk7CiAgfWNhdGNoKGVycm9yKXtzZWxmLnBvc3RNZXNzYWdlKHtpZCxlcnJvcjp7bmFtZTplcnJvci5uYW1lLG1lc3NhZ2U6ZXJyb3IubWVzc2FnZX19KTt9Cn07Cg==`,``+import.meta.url),{type:`module`}):new Worker(new URL(new URL(`world-worker-DTQVRS-E.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=new Map,a=[],o=[],s=0,c=!1,l,u=!1,d=!1,f={workers:1,busy:0,queued:0,completedChunks:0,lastChunkMs:0},p=()=>new DOMException(`World request cancelled`,`AbortError`),m=()=>{f.workers=c?0:o.filter(e=>e.ready&&!e.failed).length,f.busy=o.filter(e=>e.currentId!==null).length,f.queued=a.filter(e=>i.has(e.id)).length};function h(e,t,n){i.delete(e.id),e.signal?.removeEventListener(`abort`,e.abort),t?e.reject(t):e.resolve(n)}function g(e){for(let t of[...i.values()])h(t,e);a.length=0;for(let e of o)e.currentId=null;m()}function _(e,t){t.node=e,t.type===`chunk`&&u&&(e.currentId=t.id);try{e.worker.postMessage({id:t.id,type:t.type,payload:t.payload})}catch(n){e.currentId===t.id&&(e.currentId=null),h(t,n)}}function v(){if(!(c||l)){for(let e of o)if(e.ready&&!e.failed&&e.currentId===null)for(;a.length&&e.currentId===null;){let t=a.shift();i.has(t.id)&&_(e,t)}m()}}function y(e){let t={worker:r(),primary:e,ready:e,failed:!1,currentId:null};o.push(t),t.worker.onmessage=({data:e})=>{if(c||t.failed)return;if(e.id===`peer-ready`){e.error?(t.failed=!0,t.worker.terminate()):t.ready=!0,v();return}t.currentId===e.id&&(t.currentId=null);let n=i.get(e.id);if(n){if(e.error){let t=Error(e.error.message);t.name=e.error.name??`Error`,h(n,t)}else n.type===`generate`&&(u=!0,b()),n.type===`chunk`&&(f.completedChunks++,f.lastChunkMs=e.result?.milliseconds??0),h(n,null,e.result)}v()};let n=n=>{if(c||t.failed)return;let r=Error(n);if(e){l=r,g(r);return}t.failed=!0,t.ready=!1,t.worker.terminate();let o=i.get(t.currentId);t.currentId=null,o&&(o.node=null,a.unshift(o)),v()};return t.worker.onerror=e=>n(e.message||`World worker failed`),t.worker.onmessageerror=()=>n(`World worker returned an unreadable packet`),t}function b(){if(d||n<2||!t)return;d=!0;let e,r;try{e=y(!1),r=new t,e.worker.postMessage({id:`peer-ready`,type:`attach-port`,port:r.port2},[r.port2]),o[0].worker.postMessage({type:`share-world`,port:r.port1},[r.port1])}catch{r?.port1.close(),r?.port2.close(),e&&(e.failed=!0,e.worker.terminate())}m()}let x=y(!0);return{stats:f,request(e,t,{signal:n}={}){return c?Promise.reject(new DOMException(`World replaced`,`AbortError`)):l?Promise.reject(l):n?.aborted?Promise.reject(p()):new Promise((r,o)=>{let c={id:++s,type:e,payload:t,resolve:r,reject:o,signal:n};c.abort=()=>{if(i.has(c.id)){let e=a.indexOf(c);e>=0&&a.splice(e,1),h(c,p()),v()}},n?.addEventListener(`abort`,c.abort,{once:!0}),i.set(c.id,c),e===`chunk`&&u?(a.push(c),v()):_(x,c)})},dispose(){if(!c){c=!0;for(let e of o)e.worker.terminate();g(new DOMException(`World replaced`,`AbortError`))}}}}function Im(e){let t=new kt(1,1,{depthBuffer:!1}),n=new j,r=new Ye,i=new $e,a=new Qe({colorWrite:!1,depthWrite:!1,depthTest:!1,toneMapped:!1}),s=new o(i,a);s.frustumCulled=!1,n.add(s);let c=new WeakMap,l=!1;function u(e){if(c.has(e))return c.get(e);let t=new Fe(i,a,1);t.frustumCulled=!1;let n={mesh:t,idleMatrix:t.instanceMatrix,matrix:null,color:null},r=()=>{e.removeEventListener(`dispose`,r),c.delete(e),t.instanceMatrix=n.matrix??n.idleMatrix,t.instanceColor=n.color,t.dispose(),t.instanceMatrix=n.idleMatrix,t.instanceColor=null,n.matrix=null,n.color=null};return e.addEventListener(`dispose`,r),c.set(e,n),n}return{upload(a){if(l)return;let o=a.geometry,{start:c,count:d}=o.drawRange,f=e.getRenderTarget(),p=e.shadowMap.enabled,m=e.getActiveCubeFace?.()??0,h=e.getActiveMipmapLevel?.()??0,g=a.isInstancedMesh?u(a):null,_=g?.mesh??s;try{g&&(g.matrix=a.instanceMatrix,g.color=a.instanceColor,_.instanceMatrix=g.matrix,_.instanceColor=g.color,n.remove(s),n.add(_)),_.geometry=o,o.setDrawRange(0,3),e.shadowMap.enabled=!1,e.setRenderTarget(t),e.render(n,r)}finally{o.setDrawRange(c,d),_.geometry=i,g&&(_.instanceMatrix=g.idleMatrix,_.instanceColor=null,n.remove(_),n.add(s));try{e.setRenderTarget(f,m,h)}finally{e.shadowMap.enabled=p}}},dispose(){l||(l=!0,t.dispose(),i.dispose(),a.dispose())}}}var Lm=Object.freeze({sheep:48,flocks:6,butterflies:16,fireflies:48,radius:150,fireflyRadius:72}),Rm=new Set([`tree`,`house`,`apartment`,`civic`,`tower`,`plaza`]),zm=new Set([`tree`,`farmPatch`,`plaza`]),Bm=Math.PI*2,Vm=24,Hm=18,Um=[0,Math.PI,Math.PI,0];function Wm(e){let t=String(e.id??`${e.kind}:${e.x.toFixed(3)}:${e.z.toFixed(3)}`),n=2166136261;for(let e=0;e<t.length;e++)n=Math.imul(n^t.charCodeAt(e),16777619);return(n>>>0)/4294967296}var Gm=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)};function Km(e){let t=Wm(e),n=e.kind===`tree`;return{seed:t,count:Gm(t,17)>(n?.3:.62)?1+Math.floor(Gm(t,29)*(n?5:3)):0}}function qm(e,t){return Array.from({length:t},(t,n)=>{let r=Gm(e,103+n)*Bm,i=.4+Gm(e,131+n)*1.8;return{phase:Gm(e,41+n)*Bm,pace:.23+Gm(e,71+n)*.32,x:Math.cos(r)*i,z:Math.sin(r)*i,drift:.12+Gm(e,157+n)*.24,height:.3+Gm(e,181+n)*1.65,frequency:.65+Gm(e,211+n)*.8,size:.13+Gm(e,239+n)*.13}})}function Jm(e,t,n,r){if(e.length===r&&n>=e.at(-1).distance)return;let i={item:t,distance:n,phase:Wm(t)*Bm},a=e.length;for(;a>0&&e[a-1].distance>n;)a--;e.splice(a,0,i),e.length>r&&e.pop()}function Ym(e,t,n,r){let i=e.scale??1,a=Math.max(0,Math.min(e.roamRadius??.12*i,(e.radius??.7*i)-.55*i)),o=n/(18+t/Bm*10)+t/Bm*4,s=Math.floor(o),c=o-s,l=(e,n)=>{let r=e=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},i=r(e+7)*Bm,o=Math.sqrt(r(e+47))*.9*a;return(n===0?Math.sin(i):Math.cos(i))*o},u=l(s,0),d=l(s,1),f=l(s+1,0),p=l(s+1,1),h=m.clamp((c-.32)/.68,0,1),g=h*h*(3-2*h),_=Math.atan2(f-u,p-d),v=Math.atan2(u-l(s-1,0),d-l(s-1,1)),y=m.smoothstep(c,0,.32),b=Math.atan2(Math.sin(_-v),Math.cos(_-v));return r.dx=u+(f-u)*g,r.dz=d+(p-d)*g,r.heading=v+b*y,r.walking=Math.sin(h*Math.PI)**2,r.distance=Math.hypot(f-u,p-d)*g,r}function Xm(e,t,n,r=Lm.radius){let i=[],a=[],o=[],s=!!Tt(e),c=s?Ve(e,n.x,0,n.z):null,l=new J,u=s?2*e.surface.radius*Math.sin(Math.min(Math.PI,r/e.surface.radius)/2):r;for(let r of t??[]){if(r.kind!==`sheep`&&!Rm.has(r.kind)&&!zm.has(r.kind))continue;let t=s?Ve(e,r.x,0,r.z,l).distanceToSquared(c):(r.x-n.x)**2+(r.z-n.z)**2;t>u**2||(r.kind===`sheep`&&Jm(i,r,t,Lm.sheep),Rm.has(r.kind)&&Jm(a,r,t,Lm.flocks*8),zm.has(r.kind)&&Jm(o,r,t,Lm.fireflies/3))}let d=[];for(let t of a)if(d.every(n=>nt(e,t.item,n.item)>12)&&d.push(t),d.length===Lm.flocks)break;return{sheep:i,flocks:d,insects:o}}function Zm(){let e=new $e;return e.setAttribute(`position`,new Re([0,0,0,.48,.015,.12,.25,0,.22],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function Qm(e,t){let n=new dt;n.name=`local-life`,e.add(n);let r=[],i=[],a=!!Tt(t);function o(e,t,i,a,o=!0){let s=new Fe(t,i,a);return s.name=e,s.count=0,s.instanceMatrix.setUsage(xe),s.frustumCulled=!1,s.castShadow=o,s.receiveShadow=o,n.add(s),r.push(s),s}let s=o(`grazing-sheep-wool`,new rt(1,1),Yt.white,Lm.sheep),c=o(`grazing-sheep-heads`,qf(),Yt.roofBlue,Lm.sheep),l=o(`grazing-sheep-feet`,new f(1,1,1),Yt.metal,Lm.sheep*4),u=qt(Yt.roofBlue.clone());i.push(u);let d=o(`local-swallow-bodies`,new rt(1,0).scale(.07,.065,.21),u,Lm.flocks*3,!1),p=qt(Yt.roofBlue.clone());p.side=2,i.push(p);let h=o(`local-swallow-wings`,Zm(),p,Lm.flocks*6,!1);for(let e of[d,h]){let t=new Dt(new Float32Array(e.instanceMatrix.count),1);t.setUsage(xe),e.geometry.setAttribute(`lifeVisibility`,t);let n=e.material,r=n.onBeforeCompile,i=n.customProgramCacheKey();n.transparent=!0,n.depthWrite=!1,n.forceSinglePass=!0,n.onBeforeCompile=(e,t)=>{r(e,t),e.vertexShader=`attribute float lifeVisibility; varying float faunaVisibility;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
faunaVisibility=lifeVisibility;`),e.fragmentShader=`varying float faunaVisibility;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`diffuseColor.a*=faunaVisibility;
#include <opaque_fragment>`)},n.customProgramCacheKey=()=>`${i}|fauna-fade-v1`}let g=qt(Yt.white.clone());g.side=2,i.push(g);let _=o(`meadow-butterflies`,new S(.19,.25).rotateX(-Math.PI/2).translate(.09,0,0),g,Lm.butterflies*2,!1),v=new gt({transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,uniforms:{night:{value:0}},vertexShader:`attribute float lifeVisibility; varying float faunaVisibility; varying vec2 vUv; varying vec3 vTint;
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
      }`});i.push(v);let y=o(`woodland-fireflies`,new S(1,1),v,Lm.fireflies,!1),b=new Dt(new Float32Array(Lm.fireflies),1);b.setUsage(xe),y.geometry.setAttribute(`lifeVisibility`,b);for(let e=0;e<Lm.fireflies;e++)y.setColorAt(e,X.gold.clone().lerp(X.white,e%3*.12));for(let e=0;e<Lm.butterflies*2;e++)_.setColorAt(e,[X.gold,X.leafPink,X.lavender][Math.floor(e/2)%3]);let x=new tt,C=new tt,w=new tt,T=new _t,E=new J,D=new J,O={},k=new J(1,0,0),A=new J(0,0,1),j=new J,M=new J(1/0,0,0),N=new J(1/0,0,0),ee={sheep:[],flocks:[],insects:[]},P=[],F=[],te=null,ne=-1,I=NaN,L=null,R=!1,z={},B={sheep:0,birds:0,butterflies:0,fireflies:0,instances:0,selections:0,updates:0,drawCalls:r.length};function V(e,n,r,i,o,s=!1){We(t,e.x,e.z,n,r,O),s&&(o=ot(t,O.x,O.z,o)),a?Ke(t,O.x,i,O.z,o,x):x.makeRotationY(o).setPosition(O.x,i,O.z)}function re(e,t,n,r,i,a=1,o=1,s=1,c=0,l=k){E.set(n,r,i),D.set(a,o,s),T.setFromAxisAngle(l,c),C.compose(E,T,D),w.multiplyMatrices(x,C),e.setMatrixAt(t,w)}function ie(e,{focus:i={x:0,z:0},placements:o=[],revision:u=0,detailBlend:f=1,reducedMotion:p=!1,night:g=0}={}){if(n.visible=f>.001,!n.visible)return;p?(L===null&&(L=e),e=L):L=null,a?Ve(t,i.x,0,i.z,j):j.set(i.x,0,i.z);let S=j.distanceToSquared(N)>1e-10,C=o!==te||u!==ne||j.distanceToSquared(M)>36;if(C){ee=Xm(t,o,i),P=P.filter(({item:e})=>nt(t,e,i)<Lm.radius+Vm);for(let n of ee.flocks){if(P.length===Lm.flocks)break;P.every(e=>nt(t,n.item,e.item)>12)&&P.push({...n,bornAt:!Number.isFinite(I)||p||e===I?e-1:e})}F=F.filter(({item:e})=>nt(t,e,i)<Lm.fireflyRadius+Hm);let n=F.reduce((e,t)=>e+t.count,0);for(let r of ee.insects){if(n===Lm.fireflies)break;if(nt(t,r.item,i)>Lm.fireflyRadius-8)continue;let a=Km(r.item);if(!a.count||F.some(e=>e.key===(r.item.id??r.phase)))continue;let o=Math.min(a.count,Lm.fireflies-n);n+=o,F.push({...r,...a,count:o,members:qm(a.seed,o),key:r.item.id??r.phase,bornAt:!Number.isFinite(I)||p||e===I?e-1:e})}te=o,ne=u,M.copy(j),B.selections++}if(g=m.clamp(g,0,1),v.uniforms.night.value=g,y.visible=g>.01,_.visible=g<.9,!C&&!S&&e===I&&p===R)return;I=e,R=p,N.copy(j);let w=0,T=0,E=0,O=0;for(let{item:t,phase:n}of ee.sheep){let{dx:r,dz:i,heading:a,walking:o,distance:u}=Ym(t,n,e,z);V(t,r,i,t.y??0,a,!0),x.scale(D.setScalar(t.scale??1)),re(s,w,0,.31,-.035,.23,.22,.3);let d=(1-o)*(.32+Math.sin(e*.6+n)*.04);re(c,w,0,.34-d*.08,.25,1,1,1,d);let f=u/((t.scale??1)*Kf.stepLength)*Bm;for(let e=0;e<4;e++){let t=e%2?.12:-.12,n=e<2?-.14:.14,r=f+Um[e],i=Math.max(0,Math.sin(r))*Kf.stepLift*o,a=Math.cos(r)*Kf.stride*o;re(l,w*4+e,t,(Kf.legHeight+i)/2,n+a,Kf.legWidth,Kf.legHeight-i,Kf.legDepth)}w++}for(let{item:n,phase:r,bornAt:a}of P){let o=(1-m.smoothstep(nt(t,n,i),Lm.radius-20,Lm.radius+Vm))*(p?1:m.smoothstep(e-a,0,.8));for(let t=0;t<3;t++){let i=e*.18+r+t*.13,a=2.5+t*.48;V(n,Math.sin(i)*a,Math.cos(i)*a,(n.y??0)+11+Math.sin(i*.8)*.5+t*.22,Math.PI/2+i,!0),re(d,T,0,0,0),d.geometry.attributes.lifeVisibility.setX(T,o);let s=Math.sin(e*6.2+r+t*.7)*.43;re(h,T*2,0,0,0,1,1,1,s,A),re(h,T*2+1,0,0,0,1,1,1,Math.PI-s,A),h.geometry.attributes.lifeVisibility.setX(T*2,o),h.geometry.attributes.lifeVisibility.setX(T*2+1,o),T++}}for(let{item:t,phase:n}of ee.insects)if((t.kind===`farmPatch`||t.kind===`plaza`)&&E<Lm.butterflies){let r=e*.36+n;V(t,Math.sin(r)*.7,Math.cos(r*1.3)*.6,(t.y??0)+2+Math.sin(e*1.2+n)*.22,r,!0);let i=.35+Math.sin(e*14+n)*.65;re(_,E*2,0,0,0,1,1,1,i,A),re(_,E*2+1,0,0,0,1,1,1,Math.PI-i,A),E++}for(let{item:n,members:r,bornAt:a}of F){let o=(1-m.smoothstep(nt(t,n,i),Lm.fireflyRadius-20,Lm.fireflyRadius+Hm))*(p?1:m.smoothstep(e-a,0,1.2));for(let{phase:t,pace:i,x:a,z:s,drift:c,height:l,frequency:u,size:d}of r){V(n,a+Math.sin(e*i+t)*c,s+Math.sin(e*i*.73+t*1.7)*c,(n.y??0)+l+Math.sin(e*i*.81+t)*.12,0);let r=Math.max(0,Math.sin(e*u+t))**5;re(y,O,0,0,0,d,d,d),b.setX(O++,o*(.06+.94*r))}}s.count=c.count=w,l.count=w*4,d.count=T,h.count=T*2,_.count=E*2,y.count=O;for(let e of r)e.count&&(e.instanceMatrix.needsUpdate=!0);if(T)for(let e of[d,h])e.geometry.attributes.lifeVisibility.needsUpdate=!0;O&&(b.needsUpdate=!0),Object.assign(B,{sheep:w,birds:T,butterflies:E,fireflies:O,instances:w+T+E+O,updates:B.updates+1})}function ae(){for(let e of r)e.geometry.dispose(),e.dispose();for(let e of i)e.dispose();n.removeFromParent()}return{root:n,stats:B,update:ie,dispose:ae}}function $m(e,t){let n=Qm(e,t),r=t.cities?.length<=32?eh(n.root,t):null,i=NaN,a=null;return{...n,update(e,t={}){n.update(e,t),r&&n.root.visible&&(t.reducedMotion?(a===null&&(a=e),e=a):a=null,e!==i&&(r.update(e),i=e))},dispose(){if(r){let e=new Set;r.root.traverse(t=>{t.geometry&&e.add(t.geometry)}),e.forEach(e=>e.dispose())}n.dispose()}}}function eh(e,t){let n=Rf(e),r=Rs(`${t.seed}-life`),i=new c;n.name=`ambience`;let a=!!Tt(t),o=new tt,s=new tt,l=e=>{a&&(e.matrixAutoUpdate=!1,Ke(t,e.position.x,e.position.y,e.position.z,e.rotation.y,e.matrix),o.makeRotationFromQuaternion(e.quaternion).premultiply(s.makeRotationY(-e.rotation.y)).scale(e.scale),e.matrix.multiply(o),e.matrixWorldNeedsUpdate=!0)},u=new Fe(new f(1,.015,.055),Yt.foam,64);u.name=`river-ripples`,u.instanceMatrix.setUsage(xe),u.frustumCulled=!1,n.add(u);let d=Array.from({length:t.river.length>0?64:0},()=>({s:r()*t.river.length,offset:(r()-.5)*Math.max(0,t.river.width-1.3),length:.3+r()*.7}));u.count=d.length;let p=Rf(n);p.name=`river-boat`,If(p,0,.14,0,.44,.24,1.08,`roofDark`),$(p,0,.24,0,.68,.12,1.55,`trim`),$(p,0,.47,-.2,.49,.39,.6,`white`),$(p,0,.51,.108,.36,.23,.025,`window`),$(p,0,.7,-.2,.63,.08,.76,`roofBlue`);for(let e of[-1,1])Lf(p,Nf(e*.22,.045,-.9),Nf(e*.6,.045,-2),.045,`foam`);Bf(p);let m=[];if(t.river.length>0)for(let e=0;e<=t.river.length;e+=.5){let n=sc(t.river,e);tc(t,n.x,n.z,2.5)&&m.push(e)}let h=m[0]??0,g=m.at(-1)??0,_=Rf(n);_.name=`ocean-ripples`;let v=null,y=null,b=2.2;if(t.biomes?.ocean.length){for(let e=0;e<420;e++){let n=(r()-.5)*t.bounds.width,i=(r()-.5)*t.bounds.depth,a=mn(t,`ocean`,n,i);if(a>b&&(b=a,y={x:n,z:i}),e%3==0&&$t(t,[`ocean`],n,i,1.1)){let e=$(_,n,t.river.y+.055,i,.6+r()*1.1,.015,.055,`foam`,.15);e.castShadow=!1}}if(y){v=Rf(n,y.x,t.river.y+.035,y.z,-.6),v.name=`sailboat`,If(v,0,.17,0,.43,.23,1.13,`white`),Ff(v,0,1.36,0,.035,.04,2.55,`timber`,6);let e=new $e().setFromPoints([Nf(.03,2.6,0),Nf(.03,.48,0),Nf(.03,.48,.91)]);e.setIndex([0,1,2,2,1,0]),e.computeVertexNormals(),Pf(v,e,`trim`);let r=new $e().setFromPoints([Nf(.04,2.12,-.06),Nf(.04,.48,-.06),Nf(.04,.48,-.81)]);r.setIndex([0,1,2,2,1,0]),r.computeVertexNormals(),Pf(v,r,`gold`),Bf(v)}Bf(_),a&&_.traverse(e=>{e.isMesh&&It(e.geometry,t)})}let x=-t.bounds.width*.33,S=t.bounds.depth*.2,C=rc(t,x,S)+14,w=Rf(n,x,C,S);w.name=`balloon`;let T=[[0,-2],[.55,-1.65],[1.4,-.65],[1.75,.5],[1.5,1.6],[.8,2.25],[0,2.5]].map(([e,t])=>new Y(e,t));for(let e=0;e<10;e++)Pf(w,new mt(T,1,e/10*Math.PI*2,Math.PI*2/10),e%2?`trim`:`redLight`);$(w,0,-2.9,0,.72,.55,.64,`timber`),$(w,0,-2.62,0,.8,.1,.72,`gold`);for(let e of[-.3,.3])for(let t of[-.25,.25])Lf(w,Nf(e,-2.65,t),Nf(e,-1.65,t),.035,`timber`);Bf(w);let E=[];for(let e=0;e<5;e++){let t=Rf(n),r=Rf(t),i=Rf(t);t.name=`bird-${e+1}`,Lf(r,Nf(0,0,0),Nf(-.48,.1,.17),.065,`white`),Lf(i,Nf(0,0,0),Nf(.48,.1,.17),.065,`white`),If(t,0,0,0,.07,.07,.19,`white`),Bf(r),Bf(i),E.push({g:t,left:r,right:i})}let D=Math.max(10,...t.mountains.map(e=>e.height+3));return l(p),v&&l(v),l(w),E.forEach(({g:e})=>l(e)),{root:n,update(e){d.forEach((n,r)=>{let o=sc(t.river,(n.s+e*.18)%t.river.length),s=o.tangent.z,c=-o.tangent.x,l=o.x+s*n.offset,d=o.z+c*n.offset;i.position.set(l,t.river.y+.05,d),i.rotation.set(0,o.angle+Math.PI/2,0),i.scale.set(tc(t,l,d,.65)?n.length*Math.min(1,t.river.width):0,1,Math.min(1,t.river.width/.15)),a?q(t,l,i.position.y,d,i.rotation.y,i.matrix).scale(i.scale):i.updateMatrix(),u.setMatrixAt(r,i.matrix)}),u.instanceMatrix.needsUpdate=!0;let n=.5-Math.cos(e*.025)*.46;if(p.visible=!1,t.river.length>0){let r=sc(t.river,h+(g-h)*n);p.position.set(r.x,t.river.y+.035,r.z),p.rotation.y=r.angle+(Math.sin(e*.025)<0?Math.PI:0),p.visible=t.river.width>=1.6&&tc(t,r.x,r.z,2.2),l(p)}v&&(v.position.y=t.river.y+.035+Math.sin(e*.8)*.025,v.rotation.z=Math.sin(e*.7)*.025,l(v)),w.position.y=C+Math.sin(e*.35)*.3,w.rotation.y=Math.sin(e*.07)*.12,l(w),E.forEach(({g:t,left:n,right:r},i)=>{let a=e*.045+i*.09;t.position.set(Math.cos(a)*13+i*.65,D+i*.25,Math.sin(a)*7-i*.75),t.rotation.y=-a,n.rotation.z=Math.sin(e*4.5+i*.7)*.35,r.rotation.z=-n.rotation.z,l(t)})}}}function th(e){let t=e.surface.radius,n=new dt,r=new dt,i=[];n.name=r.name=`earth-ocean`;let a;for(let[s,c]of[[r,-.65],[n,-4.5]]){let r=new H(t+c,256,128);if(r.translate(0,-t,0),!a){let t=r.attributes.position,n=new J,i={},o=new v;a=new Float32Array(t.count*3);for(let r=0;r<t.count;r++)n.fromBufferAttribute(t,r),xt(e,n,i),_l(e,i.x,i.z,o),o.toArray(a,r*3)}r.setAttribute(`color`,new z(a,3));let l=qt(xl(new Qe({color:16777215,vertexColors:!0,toneMapped:s===n}),t),{kind:`water`});i.push(r,l),s.add(new o(r,l))}let s=new H(t+12,128,64);s.translate(0,-t,0);let c=new gt({name:`earth-atmosphere`,uniforms:{worldNight:Wt.night},side:1,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,toneMapped:!1,vertexShader:`varying vec3 rimNormal;
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
      }`}),l=new o(s,c);l.name=`earth-atmosphere`,l.castShadow=!1,l.receiveShadow=!1,r.add(l),i.push(s,c);let u=!1;return{detail:n,map:r,dispose(){u||(u=!0,n.removeFromParent(),r.removeFromParent(),i.forEach(e=>e.dispose()))}}}function nh(e){if(!Tt(e))return null;if(e.surface.complete)return th(e);let t=e.outline,n=[],r=[],i=new dt,a=new dt;i.name=a.name=`curved-earth-section`;let s=X.ocean.clone().lerp(X.rockDark,.48).multiplyScalar(.72),c=X.ocean.clone().multiplyScalar(.76),l=new J;function u(r){let i=[],a=[];for(let n=0;n<t.length;n++){let o=t[n],u=t[(n+1)%t.length],d=Math.max(1,Math.ceil(Math.hypot(u[0]-o[0],u[1]-o[1])/8));for(let t=0;t<d;t++){let n=[t/d,(t+1)/d].map(e=>[o[0]+(u[0]-o[0])*e,o[1]+(u[1]-o[1])*e]),f=[[...n[0],r],[...n[1],r],[...n[0],-32],[...n[1],-32]];for(let t of[0,2,1,1,2,3]){let[n,r,o]=f[t];Ve(e,n,o,r,l),i.push(l.x,l.y,l.z);let u=t<2?c:s;a.push(u.r,u.g,u.b)}}}let o=new $e;return o.setAttribute(`position`,new Re(i,3)),o.setAttribute(`color`,new Re(a,3)),o.computeVertexNormals(),n.push(o),o}let d=new k(t.map(([e,t])=>new Y(e,-t))),f=new G(d);f.rotateX(-Math.PI/2),f.translate(0,-32,0);let p=Wc(f,64);f.dispose(),It(p,e),n.push(p);for(let[e,t]of[[i,-3.4],[a,0]]){let n=new Qe({vertexColors:!0,side:2,toneMapped:e===i}),a=new Qe({color:s,side:2,toneMapped:e===i});r.push(n,a),e.add(new o(u(t),n),new o(p,a))}let m=!1;return{detail:i,map:a,dispose(){m||(m=!0,i.removeFromParent(),a.removeFromParent(),n.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()))}}}function rh(e,t){let n=new Float32Array(1260),r=new Float32Array(420),i=71139,a=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);for(let e=0;e<r.length;e++)n[e*3]=a()*2-1,n[e*3+1]=a()*2-1,n[e*3+2]=a(),r[e]=a()>.94?3:1+a()*1.2;let o=new $e;o.setAttribute(`position`,new z(n,3)),o.setAttribute(`starSize`,new z(r,1));let s=new gt({transparent:!1,depthWrite:!1,depthTest:!1,toneMapped:!1,uniforms:{worldNight:Wt.night,worldTime:Wt.time,skyColor:{value:e.background}},vertexShader:`attribute float starSize; varying float seed; void main(){seed=position.z;gl_Position=vec4(position.xy,0.999,1.0);gl_PointSize=starSize;}`,fragmentShader:`uniform float worldNight;uniform float worldTime;uniform vec3 skyColor;varying float seed;
      void main(){float glow=1.0-smoothstep(0.12,0.5,length(gl_PointCoord-0.5));
      if(glow<0.01)discard;
      float twinkle=0.82+0.18*sin(worldTime*0.4+seed*37.0);
      vec3 star=mix(vec3(0.55,0.74,1.0),vec3(1.0,0.83,0.56),seed);
      gl_FragColor=vec4(mix(skyColor,star,glow*worldNight*twinkle*0.76),1.0);
      #include <colorspace_fragment>
      }`}),c=[e,t].map(e=>{let t=new M(o,s);return t.name=`night-stars`,t.frustumCulled=!1,t.renderOrder=-1e3,t.visible=!1,e.add(t),t});return{update(){for(let e of c)e.visible=Wt.night.value>.005},dispose(){c.forEach(e=>e.removeFromParent()),o.dispose(),s.dispose()}}}var ih=Object.freeze({height:Jf,radius:Yf,speed:2.65,sprintSpeed:4.6,jumpSpeed:4.05,gravity:11.5,stepHeight:.32,maxSlope:.78,cameraDistance:2.85,cameraHeight:.5,spawnRailClearance:4.5,fov:54,near:.045,far:140}),ah=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),oh=Math.PI*2,sh=m.clamp,ch=1/120,lh=.58,uh=e=>e*e*(3-2*e),dh=e=>Math.atan2(Math.sin(e),Math.cos(e));function fh(e){let n=new dt;n.name=`walking-traveller`,e.add(n);let r=new dt;r.name=`traveller-body`,n.add(r);let i=new f(1,1,1),a=new rt(1,0),s=new he(.118,.125,.055,8),c=new k;c.moveTo(.038,-.045),c.lineTo(.038,.045),c.lineTo(-.17,.1),c.lineTo(-.17,-.1),c.closePath();let l=new t(c,{depth:.065,bevelEnabled:!1,steps:1});l.rotateY(Math.PI/2),l.translate(-.0325,0,0);let u=[i,a,s,l];function d(e,t,n,r,a,s,c,l,u,d=i){let f=new o(d,u);return f.name=t,f.position.set(n,r,a),f.scale.set(s,c,l),f.castShadow=!0,f.receiveShadow=!0,e.add(f),f}d(r,`traveller-coat`,0,.385,0,.24,.26,.16,Yt.teal),d(r,`traveller-face`,0,.59,.006,.115,.1,.115,Yt.peach,a),d(r,`traveller-cap`,0,.6875,-.006,1,1,1,Yt.redLight,s),d(r,`cap-brim`,0,.666,.085,.18,.022,.09,Yt.redLight);for(let e of[-1,1])d(r,`eye`,e*.034,.603,.1,.014,.018,.015,Yt.window);let p=[],m=[];for(let e of[-1,1]){let t=new dt;t.name=e<0?`right-arm`:`left-arm`,t.position.set(e*.146,.48,0),t.rotation.order=`YXZ`,r.add(t),p.push(t),d(t,`sleeve`,0,-.06,0,.066,.15,.1,Yt.teal),d(t,`mitten`,0,-.145,.008,.045,.045,.046,Yt.peach,a);let i=new dt;i.name=e<0?`right-leg`:`left-leg`,i.position.set(e*.055,.29,0),n.add(i),m.push(i),d(i,`trousers`,0,-.14,0,.075,.3,.1,Yt.roofBlue),d(i,`boot`,0,-.285,.015,.09,.08,.13,Yt.timber)}let h=p[0],g=new dt;g.name=`traveller-axe`,g.position.set(0,-.145,.008),g.scale.setScalar(.82),h.add(g),d(g,`axe-handle`,0,-.105,0,.037,.33,.041,Yt.timber),d(g,`axe-head`,0,-.225,0,1,1,1,Yt.rail,l);let _=new Qe({color:1522743,transparent:!0,opacity:.16,depthWrite:!1}),v=new I(.18,16);u.push(v);let y=new o(v,_);return y.matrixAutoUpdate=!1,y.name=`traveller-contact-shadow`,e.add(y),{root:n,body:r,arms:p,legs:m,rightArm:h,axe:g,shadow:y,dispose(){u.forEach(e=>e.dispose()),_.dispose()}}}function ph(e,t,{getCollisionPlacements:n=()=>t.placements??[],getTerrainMeshes:r=()=>[],isReadyAt:i=()=>!0}={}){let a=new dt;a.name=`walking-player`,a.visible=!1,e.add(a);let o=fh(a),s=new me(ih.fov,1,ih.near,ih.far);s.name=`walking-camera`;let c={x:0,y:0,z:0},l={x:0,y:0,z:0},u={x:0,y:0,z:0},d={x:0,y:0,z:0},f=new tt,p=new tt,h=new tt().makeRotationX(-Math.PI/2),g=new J,_=new J,v=new J,y=new J,b=new J,x=new J,S=new J,C=new ie,w=[];C.firstHitOnly=!0;let T={},E={},D={},O={},k={},A=new J,j=cn(t.lines??[]),M={},N={},ee=new J,P=new Ce,F=!1,te=!1,ne=!1,I=!0,L=0,R=0,z=Math.PI/10,B=!1,V=0,re=0,ae=0,oe=0,H=lh,U=!1,se=[],ce=null,le={x:1/0,y:0,z:1/0},ue=[],de=null,fe={x:1/0,z:1/0},W=0,pe=0,he=0,ge=0,_e=0,ve=ih.cameraDistance,ye={steps:0,swings:0,blocked:0,raycasts:0,obstacles:0,meshes:0,meshSelections:0};function be(e=!1){let i=r()??[];(e||i!==ce||!Number.isFinite(le.x)||nt(t,c,le)>2||Math.abs(c.y-le.y)>2)&&(ce=i,le={...c},Ve(t,c.x,c.y,c.z,ee),se=i.filter(e=>{let t=e.geometry;return t?(e.isInstancedMesh&&!e.boundingSphere&&e.computeBoundingSphere(),t.boundingSphere||t.computeBoundingSphere(),P.copy(e.boundingSphere??t.boundingSphere).applyMatrix4(e.matrixWorld),P.distanceToPoint(ee)<=ih.cameraDistance+4):!1}),ye.meshes=se.length,ye.meshSelections++);let a=n()??[];if(e||a!==de||!Number.isFinite(fe.x)||nt(t,c,fe)>6){de=a,fe={x:c.x,z:c.z};let e=a.concat((t.stations??[]).map(e=>({...e,kind:`station`}))),n=new Set;ue=e.filter(e=>{if(!ah.has(e.kind??(e.width&&e.depth?`station`:``)))return!1;let r=e.id??e;return!n.has(r)&&(n.add(r),nt(t,e,c)<26+(e.radius??4))}),ye.obstacles=ue.length}}function xe(e,n=c.y){for(let r of ue){let i=r.kind??`station`,a=r.scale??1;if(n>(r.y??0)+(r.height??(i===`tree`?2.7:i===`rock`?.6:i===`cactus`?2.4:8))*a)continue;Ae(t,r,e,T);let o;if(i===`tree`?o=.14*a:i===`cactus`?o=.31*a:i===`rock`?o=.59*a:i===`landmark`&&(o=1.35*a),o!==void 0){if(Math.hypot(T.x,T.z)<o+ih.radius)return!0;continue}let s=ft(t,r.x,r.z,r.rotation??0),c=Math.cos(s),l=Math.sin(s),u=T.x*c-T.z*l,d=T.x*l+T.z*c,f=((r.variant??0)%4==1?1.62:1.82)*a,p=((r.variant??0)%4==1?1.9:1.72)*a;if(r.buildingType){if(r.collisionBoxes){for(let e of r.collisionBoxes)if(Math.abs(u-e.x*a)<e.width*a/2+ih.radius&&Math.abs(d-e.z*a)<e.depth*a/2+ih.radius)return!0;continue}f=(r.collisionWidth??r.width)*a,p=(r.collisionDepth??r.depth)*a,d-=(r.collisionOffsetZ??0)*a}else i===`station`?(u+=1.45*a,d+=.42*a,f=2.62*a,p=1.42*a):i===`apartment`?(f=2.52*a,p=2.48*a):i===`civic`?(d+=.15*a,f=3.35*a,p=2.72*a):i===`tower`&&(f=2.32*a,p=2.48*a);if(Math.abs(u)<f/2+ih.radius&&Math.abs(d)<p/2+ih.radius)return!0}return!1}function G(e,t,n){return se.length?(C.set(e,t),C.near=.018,C.far=n,ye.raycasts++,w.length=0,C.intersectObjects(se,!1,w),w[0]??null):null}function K(e,n=void 0){let r=ic(t,e.x,e.z);if(n!==void 0&&se.length){Ve(t,e.x,n+ih.stepHeight+.06,e.z,_),it(t,e.x,e.z,g),b.copy(g).negate();let r=G(_,b,ih.stepHeight+1.7);if(r){let e=n+ih.stepHeight+.06-r.distance,t=r.face?.normal,i=t?t.dot(g):1;if(e>-.34&&i>.51)return{height:e,type:`mesh`,slope:i}}}return r}function Se(e,{height:n=c.y,spawn:r=!1}={}){let i=K(e,r?void 0:n);if(!Number.isFinite(i.height)||[`outside`,`ocean`,`water`].includes(i.type)||i.height<-.3||xe(e,n))return null;if(r)for(let[n,r]of[[.24,0],[-.24,0],[0,.24],[0,-.24]]){We(t,e.x,e.z,n,r,D);let a=ic(t,D.x,D.z);if([`outside`,`ocean`,`water`].includes(a.type)||Math.abs(a.height-i.height)>.24*ih.maxSlope)return null}return i}function q(e={x:0,z:0}){if(ne)return null;let n={x:Number.isFinite(e.x)?e.x:0,z:Number.isFinite(e.z)?e.z:0},r={...c};c.x=n.x,c.z=n.z,be(!0);let i=[n,...[...t.cities??[]].sort((e,r)=>nt(t,e,n)-nt(t,r,n)).slice(0,3)],a=null;for(let e of i){c.x=e.x,c.z=e.z,be(!0);for(let n=0;n<=12&&!a;n++){let r=n?Math.max(8,Math.ceil(n*5)):1;for(let i=0;i<r;i++){let o=i/r*oh+.31*n;if(We(t,e.x,e.z,Math.sin(o)*n*.8,Math.cos(o)*n*.8,E),vs(t,j,E.x,E.z,lt(t,E.x,E.z,ih.spawnRailClearance)).some(({a:e,b:n})=>(Ae(t,E,e,M),Ae(t,E,n,N),zs(0,0,M,N)<ih.spawnRailClearance)))continue;let s=Se(E,{spawn:!0,height:ic(t,E.x,E.z).height});if(s){a={x:E.x,y:s.height+.035,z:E.z};break}}}if(a)break}return Object.assign(c,r),be(!0),a}function we(e,n,r=0){L+=dh(re-L)*Math.min(1,e*15);let i=ot(t,u.x,u.z,L);Ke(t,u.x,u.y,u.z,i,f),f.decompose(o.root.position,o.root.quaternion,o.root.scale);let a=sh(n/.7,0,1),s=m.smoothstep(n,ih.speed*.97,ih.sprintSpeed*.96);ae+=(s-ae)*(e>0?1-Math.exp(-12*e):1),I&&(V+=r*oh/m.lerp(1.05,1.42,ae)),o.body.position.y=I?Math.abs(Math.sin(V))*.008*a:0,o.body.rotation.x=I?ae*a*.07:0,o.body.rotation.z=I?Math.sin(V)*a*.025:0,o.body.rotation.y=0;for(let e=0;e<2;e++){let t=V+e*Math.PI,n=I?Math.sin(t)*(.22+ae*.1)*a:e===0?-.16:.16,r=I?Math.max(0,Math.cos(t))*(.024+ae*.018)*a:.025,i=o.legs[e];i.rotation.x=n,i.position.y=-.035+.325*Math.cos(n)+(Math.sin(n)>0?.08:.05)*Math.abs(Math.sin(n))+r,o.arms[e].rotation.y=0,o.arms[e].position.z=0,o.arms[e].rotation.x=I?-Math.sin(t)*(e===0?.1:.24)*a:-.2,o.arms[e].rotation.z=e===0?-.1:.06}if(o.axe.rotation.y=0,H<lh){let e=H/lh,t,n;e<.25?(t=uh(e/.25),n=-.95*t):e<.65?(t=1,n=m.lerp(-.95,1.15,uh((e-.25)/.4))):(t=1-uh((e-.65)/.35),n=1.15*t),o.rightArm.rotation.set(-1.27*t,n,-.1*(1-t)),o.rightArm.position.z=.075*t,o.axe.rotation.y=Math.PI/2*t,o.body.rotation.y=n*.08}Ke(t,u.x,Math.min(u.y,ge)+.036,u.z,i,f),o.shadow.matrix.copy(f).multiply(h),o.shadow.matrixWorldNeedsUpdate=!0,o.shadow.material.opacity=.16/(1+Math.max(0,u.y-ge)*1.6)}function Te(e=0,n=!1){Ne(t,u.x,u.z,p);let r=p.elements;g.set(r[4],r[5],r[6]),S.set(r[0],r[1],r[2]),x.set(r[8],r[9],r[10]),_e=n||e<=0?u.y:m.lerp(_e,u.y,1-Math.exp(-14*e)),v.copy(Ve(t,u.x,_e+ih.cameraHeight,u.z,A));let i=ih.cameraDistance,a=Math.cos(z)*i;y.copy(v).addScaledVector(S,-Math.sin(R)*a).addScaledVector(x,-Math.cos(R)*a).addScaledVector(g,Math.sin(z)*i),b.subVectors(y,v);let o=b.length();b.divideScalar(o);let c=G(v,b,o+.14),l=c?Math.max(.32,c.distance-.18):o;ve=n||e<=0||l<ve?l:m.lerp(ve,l,1-Math.exp(-15*e)),s.position.copy(v).addScaledVector(b,ve),s.up.copy(g),s.lookAt(v),s.updateMatrixWorld(!0)}function Ee(){let e=sh(W/ch,0,1);Ae(t,l,c,k),We(t,l.x,l.z,k.x*e,k.z*e,u),u.y=m.lerp(l.y,c.y,e),ge=m.lerp(he,pe,e)}function De(e,n){if(!se.length)return!1;Ve(t,c.x,n+.43,c.z,_),Ve(t,e.x,n+.43,e.z,A),b.subVectors(A,_);let r=b.length();if(r<1e-8)return!1;b.divideScalar(r);let i=G(_,b,r+ih.radius);return!!(i&&i.distance<r+ih.radius)}function Oe(e,n,r){if(We(t,c.x,c.z,e,n,E),!i(E.x,E.z))return ye.blocked++,!1;let a=Se(E);return!a||a.height>c.y+Math.max(ih.stepHeight,Math.hypot(e,n)*ih.maxSlope)||De(E,c.y)||a.type===`mesh`&&a.slope<1/Math.sqrt(1+ih.maxSlope**2)||a.type===`mountain`&&a.height-ic(t,c.x,c.z).height>Math.hypot(e,n)*ih.maxSlope?(ye.blocked++,!1):(c.x=E.x,c.z=E.z,pe=a.height,I&&c.y-a.height<.55?c.y=a.height+.035:I&&=!1,!0)}function ke(e,n={}){if(!F||ne)return;e=sh(Number.isFinite(e)?e:0,0,.12),be(),R=dh(R+(Number.isFinite(n.lookX)?n.lookX:0)),z=sh(z+(Number.isFinite(n.lookY)?n.lookY:0),Math.PI/18,Math.PI*65/180);let r=!!n.jump;r&&!B&&I&&(d.y=ih.jumpSpeed,I=!1),B=r;let i=!!n.swing;i&&!U&&H>=lh&&(H=0,re=R,ye.swings++),U=i,H=Math.min(lh,H+e);let a=sh(n.forward??0,-1,1),o=sh(n.right??0,-1,1),s=Math.hypot(a,o);s>1&&(a/=s,o/=s);let f=n.sprint?ih.sprintSpeed:ih.speed,p=(Math.sin(R)*a-Math.cos(R)*o)*f,m=(Math.cos(R)*a+Math.sin(R)*o)*f;for(W+=e,O.x=u.x,O.z=u.z;W>=.008333333332333333;){let e=ch;W-=e,ye.steps++,Object.assign(l,c),he=pe;let t=1-Math.exp(-18*e);d.x+=(p-d.x)*t,d.z+=(m-d.z)*t;let n=d.x*e,r=d.z*e;if(Math.hypot(n,r)>1e-6&&(Oe(n,r,e)||(Math.abs(n)>1e-8&&Oe(n,0,e),Math.abs(r)>1e-8&&Oe(0,r,e)),re=Math.atan2(d.x,d.z)),!I){d.y-=ih.gravity*e,c.y+=d.y*e;let t=K(c,c.y);pe=t.height,c.y<=t.height+.035&&d.y<=0&&(c.y=t.height+.035,d.y=0,I=!0)}}Ee(),H<lh&&(re=R);let h=nt(t,O,u),g=e>0?h/e:0;oe+=(g-oe)*(1-Math.exp(-24*e)),we(e,oe,h),Te(e)}return{root:a,camera:s,position:c,renderPosition:u,cameraTarget:v,velocity:d,stats:ye,prepareSpawn:q,update:ke,get swinging(){return H<lh},get active(){return F},get initialized(){return te},get grounded(){return I},get heading(){return R},get pitch(){return z},enter(e,t=0,{respawn:n=!1}={}){if(ne)return!1;if(te&&!n)return F=!0,a.visible=!0,be(!0),we(0,0),Te(0,!0),!0;let r=q(e);return r?(Object.assign(c,r),d.x=d.y=d.z=0,L=R=re=Number.isFinite(t)?t:0,Object.assign(l,r),Object.assign(u,r),pe=he=ge=r.y-.035,z=Math.PI/10,W=0,B=!1,oe=ae=V=0,H=lh,U=!1,I=!0,F=te=!0,a.visible=!0,be(!0),we(0,0),Te(0,!0),!0):!1},exit(){return F=!1,a.visible=!1,oe=ae=0,H=lh,U=!1,we(0,0),d.x=d.y=d.z=0,B=!1,{...c}},resize(e){s.aspect=Math.max(.01,Number.isFinite(e)?e:1),s.updateProjectionMatrix()},dispose(){ne||(ne=!0,F=!1,H=lh,U=!1,a.removeFromParent(),o.dispose(),a.clear())}}}function mh({crop:e=!1}={}){let t=[],n=[],r=[],i=[],a=e?7:12;for(let o=0;o<a;o++){let s=o*2.39996323,c=Math.sqrt((o+.5)/a)*.46,l=Math.cos(s)*c,u=Math.sin(s)*c,d=s+o*.73,f=Math.cos(d),p=Math.sin(d),m=.7+(Math.sin(o*13.73)*.5+.5)*.3,h=e?.065:.07,g=.13+o*7%5*.027,_=t.length/3,v=[[-h,0,0],[h,0,0],[-h*.55,m*.56,g*.34],[h*.55,m*.56,g*.34],[0,m,g]];for(let[e,[r,a,s]]of v.entries())i.push(o*2,o*2+1,e===4?.5:e%2),t.push(l+r*f-s*p,a,u+r*p+s*f),n.push(-p*.35,.93675,f*.35);r.push(_,_+1,_+2,_+1,_+3,_+2,_+2,_+3,_+4)}let o=new $e;return o.setAttribute(`position`,new Re(t,3)),o.setAttribute(`normal`,new Re(n,3)),e||o.setAttribute(`grassRoot`,new Re(i,3)),o.setIndex(r),o}var hh=Object.freeze((()=>{let e=mh(),t=e.attributes.position,n=[];for(let e=0;e<12;e++)for(let r=0;r<2;r++)n.push([t.getX(e*5+r),t.getZ(e*5+r)]);return e.dispose(),n})());function gh(e,{focus:t,time:n,player:r,visibility:i={value:1}},a){let o=e.onBeforeCompile,s=e.customProgramCacheKey(),c=a===`grass`||a===`crops`||a===`flowers`;return e.onBeforeCompile=(e,s)=>{o(e,s),e.uniforms.walkFocus=t,e.uniforms.walkTime=n,e.uniforms.walkPlayer=r,e.uniforms.walkVisibility=i,e.vertexShader=`uniform vec3 walkFocus; uniform vec3 walkPlayer; uniform float walkTime; uniform float walkVisibility;
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
      transformed *= detailCoverage;`),a===`flowers`&&(e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,qn.color_vertex.replace(`vColor.rgb *= instanceColor.rgb;`,`vColor.rgb *= mix(vec3(1.0), instanceColor.rgb, flowerPetal);`))),e.fragmentShader=`varying float walkDistance; varying float bladeHeight;
`+e.fragmentShader,c&&(e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
        diffuseColor.rgb *= mix(0.84, 1.08, clamp(bladeHeight, 0.0, 1.0));`),e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
        normal = normalize(vNormal);`))},e.customProgramCacheKey=()=>`${s}|walking-vegetation-v5:${a}`,e}function _h(){let e=[],t=[],n=[],r=[],i=(r,i,a=0)=>{let o=e.length/3;return e.push(...r),t.push(i.r,i.g,i.b),n.push(a),o},a=(e,t,n,a,o=0)=>r.push(i(e,a,o),i(n,a,o),i(t,a,o)),o=[],s=[];for(let e=0;e<3;e++){let t=e*Math.PI*2/3;o.push([Math.cos(t)*.023,0,Math.sin(t)*.023]),s.push([.045+Math.cos(t)*.018,.94,Math.sin(t)*.018])}for(let e=0;e<3;e++){let t=(e+1)%3;a(o[e],o[t],s[e],X.leaf),a(o[t],s[t],s[e],X.leaf)}for(let[e,t]of[[.45,.28],[3.9,.48]]){let n=Math.cos(e),r=Math.sin(e),i=(e,i,a)=>[.045*t/.94+e*n-a*r,i,e*r+a*n],o=i(0,t,0),s=i(.14,t+.055,-.06),c=i(.32,t+.17,0),l=i(.14,t+.055,.06),u=i(.15,t+.1,0);a(o,s,u,X.leaf),a(s,c,u,X.leafLight),a(o,u,l,X.leaf),a(u,c,l,X.leafLight)}let c=.045;for(let e=0;e<5;e++){let t=e*Math.PI*2/5,n=Math.cos(t),r=Math.sin(t),i=(e,t,i)=>[c+e*n-i*r,t,e*r+i*n],o=i(.065,.89,0),s=i(.29,.905,-.14),l=i(.48,.965,0),u=i(.29,.905,.14),d=i(.29,.9550000000000001,0);a(o,s,d,X.white,1),a(s,l,d,X.white,1),a(o,d,u,X.white,1),a(d,l,u,X.white,1);let f=(e+1)*Math.PI*2/5;a([c,.99,0],[c+Math.cos(t)*.12,.91,Math.sin(t)*.12],[c+Math.cos(f)*.12,.91,Math.sin(f)*.12],X.gold)}let l=new $e;return l.setAttribute(`position`,new Re(e,3)),l.setAttribute(`color`,new Re(t,3)),l.setAttribute(`flowerPetal`,new Re(n,1)),l.setIndex(r),l.computeVertexNormals(),l}var vh=[],yh=new WeakMap,bh=new WeakMap,xh=e=>Math.max(0,Math.min(1,e)),Sh=(e,t,n)=>{let r=xh((n-e)/(t-e));return r*r*(3-2*r)},Ch=e=>e.range?.bounds??yn(e.x,e.z,e.radius);function wh(e,t,n){let r=t-e.c.x,i=n-e.c.z,a=e.ux*r+e.uz*i,o=e.vx*r+e.vz*i;return a>=-1e-8&&o>=-1e-8&&a+o<=1+1e-8}function Th(e,t,n){return Math.max(0,e.c.y+(t-e.c.x)*e.slopeX+(n-e.c.z)*e.slopeZ)}function Eh(e){if(yh.has(e))return yh.get(e);let{vertices:t,surfaceTriangles:n}=pn(e),r=new Map,i=e.range?.cellSize??Math.max(1,e.radius/5);for(let e of n){let[n,a,o]=e.map(e=>t[e]),s=(a.z-o.z)*(n.x-o.x)+(o.x-a.x)*(n.z-o.z);if(Math.abs(s)<1e-12)continue;let c=(a.z-o.z)/s,l=(o.x-a.x)/s,u=(o.z-n.z)/s,d=(n.x-o.x)/s,f=c*(n.y-o.y)+u*(a.y-o.y),p=l*(n.y-o.y)+d*(a.y-o.y),m=1/Math.hypot(f,1,p),h={c:o,ux:c,uz:l,vx:u,vz:d,slopeX:f,slopeZ:p,normal:{x:-f*m,y:m,z:-p*m}};for(let e=Math.floor(Math.min(n.x,a.x,o.x)/i);e<=Math.floor(Math.max(n.x,a.x,o.x)/i);e++)for(let t=Math.floor(Math.min(n.z,a.z,o.z)/i);t<=Math.floor(Math.max(n.z,a.z,o.z)/i);t++){let n=`${e}:${t}`;r.has(n)||r.set(n,[]),r.get(n).push(h)}}let a={size:i,buckets:r};return yh.set(e,a),a}function Dh(e,t,n){let{size:r,buckets:i}=Eh(e);return(i.get(`${Math.floor(t/r)}:${Math.floor(n/r)}`)??vh).find(e=>wh(e,t,n))}function Oh(e){if(bh.has(e))return bh.get(e);let t=new vn(e.mountains??vh,Ch),n=new v,r=new v;function i(e,n){let r=t.query(yn(e,n,.5)),i=0,a=null,o=null;for(let t of r){let r=Dh(t,e,n);if(!r)continue;let s=Th(r,e,n);s>i&&(i=s,a=r,o=t)}return{height:i,face:a,mountain:o,nearby:r}}function a(e,t,n){if(!n?.nearby.length)return 0;if(n.nearby.length===1&&n.face&&wh(n.face,e,t))return Th(n.face,e,t);let r=0;for(let i of n.nearby){let n=Dh(i,e,t);n&&(r=Math.max(r,Th(n,e,t)))}return r}function o(t,i,a){Hc(e.terrainSource??e,t,i,{target:n});let o=Sh(-.15,.065,n.g-n.r),s=1;if(a.mountain){let r=a.mountain,o=a.height/r.height,c=a.face.normal,l=Sh(.9,.48,c.y),u=Sh(.53,.84,o);s=1-Math.max(l,u)*Sh(.015,.12,o),s*=1-Sh(rn(r,t,i)-.8,rn(r,t,i),a.height),yp(e,r,{x:t,y:a.height,z:i},c,{target:n})}let c=(.045+.955*o)*s;return r.copy(n).lerp(o>.5?X.grass:X.soilLight,.18).multiplyScalar(1.02),{density:c,heightScale:(.42+.58*o)*(.35+.65*s),color:r.toArray()}}let s={sample:i,heightAt:a,vegetation:o};return bh.set(e,s),s}var kh=Object.freeze({radius:23,padding:6,refreshDistance:5,grass:9600,flowers:100,pebbles:100,crops:2800}),Ah=Math.PI*2,jh=[],Mh=[`grass`,`flowers`,`pebbles`,`crops`],Nh={grass:[`grass`,`grassLight`,`meadow`],flowers:[`white`,`gold`,`lavender`],pebbles:[`gravel`,`rockLight`,`soilLight`],crops:[`wheat`]};function Ph(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return t>>>0}function Fh(e,t,{a:n,b:r}){let i=r.x-n.x,a=r.z-n.z,o=m.clamp(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-n.x-i*o,t-n.z-a*o)}function Ih(e,t){let n=e;for(let r=0;r<e.length&&n.length>=3;r++){let i=e[r],a=e[(r+1)%e.length],o=a[0]-i[0],s=a[1]-i[1],c=Math.hypot(o,s);if(c<1e-7)continue;let l=s/c,u=-o/c,d=(i[0]*s-i[1]*o)/c-t,f=[];for(let e=0;e<n.length;e++){let t=n[e],r=n[(e+1)%n.length],i=t[0]*l+t[1]*u-d,a=r[0]*l+r[1]*u-d;if(i<=0&&f.push(t),i<0!=a<0){let e=i/(i-a);f.push([t[0]+(r[0]-t[0])*e,t[1]+(r[1]-t[1])*e])}}n=f}return n}function Lh(e){return String(e.id??`${e.kind}:${e.x}:${e.z}`)}function Rh(e){return e.radius??(e.kind===`farm`?Math.hypot(e.width??3,e.depth??4)*(e.scale??1)/2:(e.kind===`tree`?.85:2.2)*(e.scale??1))}function zh(e,t,n,r=.4){let i=e.scale??1,a=(t-e.x)/i,o=(n-e.z)/i,s=e.rotation??0,c=a*Math.cos(s)-o*Math.sin(s),l=a*Math.sin(s)+o*Math.cos(s),u=r/i;return e.kind===`tree`?Math.hypot(a,o)<.22+u:e.buildingType&&e.width&&e.depth?Math.abs(c)<e.width/2+u&&Math.abs(l)<e.depth/2+u:e.kind===`farm`?(e.parcels??[{x:0,z:0,width:e.width??3,depth:e.depth??4}]).some(e=>en(nn(e),c-(e.x??0),l-(e.z??0),-u)):e.kind===`house`?Math.abs(c)<1.1+u&&Math.abs(l)<1.1+u:e.kind===`station`?Math.abs(c)<3.2+u&&Math.abs(l)<1.2+u:e.kind===`person`||e.kind===`sheep`?!1:Math.hypot(t-e.x,n-e.z)<Rh(e)+r}function Bh(e,t,n,{cityStreets:r=e.cityStreets??jh,groundCache:i}={}){let a=Object.fromEntries(Mh.map(e=>[e,[]])),o=kh.radius+kh.padding,s=(t??jh).filter(t=>nt(e,t,n)<o+Rh(t)).sort((t,r)=>nt(e,t,n)-nt(e,r,n)||Lh(t).localeCompare(Lh(r)));function c(e,t,n,r,i,o,s,c,l,u=0,d){let f={id:n,anchor:t,x:r,y:i,z:o,sx:s,sy:c,sz:l,rotation:u,color:d??Nh[e][Ph(n)%Nh[e].length]};return a[e].length<kh[e]&&a[e].push(f),f}for(let t of s){let r=Lh(t);if(t.kind===`farm`&&t.width&&t.depth){let i=Ae(e,t,n),s=t.rotation??0,l=t.scale??1,u={x:(i.x*Math.cos(s)-i.z*Math.sin(s))/l,z:(i.x*Math.sin(s)+i.z*Math.cos(s))/l},d=o/l;for(let[e,n]of(t.parcels??[{x:0,z:0,width:t.width,depth:t.depth,variant:t.variant}]).entries()){let i=n.crop??[`wheat`,`vegetables`,`lavender`][((n.variant??t.variant??0)%3+3)%3];if(![`wheat`,`lavender`,`pasture`,`vegetables`,`orchard`].includes(i))continue;let o=nn(n),s=hn(zn(n,t.variant)),l=gn(o,n.feature,n.featurePosition,s),f=n.rowsAngle??(n.rowsAlong===`x`?0:Math.PI/2),p=Math.cos(f),m=Math.sin(f),h=i===`pasture`||i===`orchard`;if(a[h?`grass`:`crops`].length>=kh[h?`grass`:`crops`])continue;let g=Math.max(.4,n.rowPitch??(i===`vegetables`?.8:1.35)),_=Math.hypot(n.width,n.depth)/2,v=h?.55:.27,y=Ih(o,.25);if(y.length<3)continue;let b=u.x-(n.x??0),x=u.z-(n.z??0),S=(e,t)=>(e-b)**2+(t-x)**2<d*d;if(h){let i=Math.ceil(Math.max(-n.width/2,b-d)/v),s=Math.floor(Math.min(n.width/2,b+d)/v),u=Math.ceil(Math.max(-n.depth/2,x-d)/v),f=Math.floor(Math.min(n.depth/2,x+d)/v);for(let d=i;d<=s;d++)for(let i=u;i<=f&&!(a.grass.length>=kh.grass);i++){let a=`${r}:parcel:${e}:sward:${d}:${i}`,s=hn(Ph(a)),u=(d+(s()-.5)*.45)*v,f=(i+(s()-.5)*.45)*v;!S(u,f)||!en(o,u,f,.33)||l&&Math.hypot(u-l.center[0],f-l.center[1])<l.radius+.33||c(`grass`,t,a,(n.x??0)+u,.055,(n.z??0)+f,.57,.13+s()*.07,.57,s()*Ah,`meadow`)}continue}let C=y.map(([e,t])=>-e*m+t*p),w=Math.min(...C),T=Math.max(...C),E=Math.max(1,Math.min(18,Math.round((T-w)/g))),D=(T-w)/E,O=0,k=b*p+x*m,A=-b*m+x*p,j=Array.from({length:E},(e,t)=>t).sort((e,t)=>Math.abs(w+(e+.5)*D-A)-Math.abs(w+(t+.5)*D-A)),M=Math.ceil(Math.max(-_,k-d)/v)*v,N=Math.min(_,k+d),ee=[];for(let e=M;e<=N;e+=v)ee.push(e);ee.sort((e,t)=>Math.abs(e-k)-Math.abs(t-k));for(let s of j)for(let u of ee){if(++O>3600||a.crops.length>=kh.crops)break;let d=w+(s+.5)*D,f=u*p-d*m,h=u*m+d*p;if(!S(f,h)||!en(o,f,h,.3)||l&&Math.hypot(f-l.center[0],h-l.center[1])<l.radius+.3||l&&Math.abs(d-(-l.center[0]*m+l.center[1]*p))<l.radius+D*.25&&Math.abs(u-(l.center[0]*p+l.center[1]*m))<l.radius+.12)continue;let g=`${r}:parcel:${e}:${u.toFixed(3)}:${d.toFixed(3)}`,_=hn(Ph(g)),v=i===`vegetables`?.12+_()*.07:i===`lavender`?.24+_()*.06:.32+_()*.09;c(`crops`,t,g,(n.x??0)+f,.06,(n.z??0)+h,.32,v,.32,_()*Ah,i===`lavender`?`lavender`:i===`vegetables`?`leafLight`:`wheat`)}}}}if(!Tt(e)&&e.biomes){let t=new on(5);for(let n of[...s,...e.stations??[]])n.kind!==`sheep`&&t.insert(n,yn(n.x,n.z,Rh(n)+.3));let l=cn(e.lines??jh),u=cn(r),d=.6,f=Oh(e),p=(e,t,n)=>n.nearby.length&&l.query(yn(e,t,2.5)).some(r=>{if(Fh(e,t,r)>=2.5)return!1;let i=r.line,a=i.distances?.[r.index]??0,o=i.distances?.[r.index+1]??i.length;return(i.cuts??i.tunnels??jh).some(e=>!n.nearby.some(t=>t.id===e.mountainId)||o<(e.cutStart??e.start)-2||a>(e.cutEnd??e.end)+2?!1:!(i.tunnels??jh).some(t=>t.mountainId===e.mountainId&&t.start<e.end&&t.end>e.start)||n.height<Math.max(r.a.y??.42,r.b.y??.42)+3.6)}),m=Math.round(n.x/kh.refreshDistance)*kh.refreshDistance,h=Math.round(n.z/kh.refreshDistance)*kh.refreshDistance,g=(n,r)=>{let i=ln(e,n,r);if(![`plains`,`forest`,`farmland`,`desert`,`mountain`].includes(i)||!$t(e,[`plains`,`forest`,`farmland`,`desert`,`mountain`],n,r,.35)||Rn(e,n,r)<1.1||t.query(yn(n,r,.4)).some(e=>zh(e,n,r))||l.nearest(n,r,e=>Fh(n,r,e),1.34)<1.34||u.nearest(n,r,e=>Fh(n,r,e)-(e.line.width??1)/2,.4,1.5)<.4)return null;let a=f.sample(n,r);return p(n,r,a)?null:a},_=[];for(let t=Math.floor((m-o)/d);t<=Math.ceil((m+o)/d);t++)for(let r=Math.floor((h-o)/d);r<=Math.ceil((h+o)/d);r++){let i=`ground:${e.seed??0}:${t}:${r}`,a=hn(Ph(i)),s=(t+.3+a()*.4)*d,c=(r+.3+a()*.4)*d,l=(s-n.x)**2+(c-n.z)**2;l>o*o||_.push({id:i,r:a,x:s,z:c,distance:l})}_.sort((e,t)=>e.distance-t.distance);for(let{id:e,r:t,x:n,z:r}of _){if(i?.has(e)){for(let[t,n]of i.get(e)??jh)a[t].length<kh[t]&&a[t].push(n);continue}i?.set(e,null);let o=[],s=(e,...t)=>{let n=c(e,...t);o.push([e,n])},l=g(n,r);if(!l)continue;let u=f.vegetation(n,r,l),d=t(),p={x:n,y:l.height-.006,z:r,rotation:0,scale:1},m=.5+.5*Math.sin(n*.21+Math.sin(r*.17))*Math.cos(r*.25-n*.08);if(d<u.density){let i=(.18+m*.09+t()*.04)*u.heightScale,a=t()*Ah,s=c(`grass`,p,e,0,0,0,.65,i,.65,a,`grass`);if(s.colorRGB=u.color,o.push([`grass`,s]),l.nearby.length){let e=Math.cos(a),t=Math.sin(a);s.rootHeights=hh.map(([i,a])=>f.heightAt(n+(i*e+a*t)*s.sx,r+(-i*t+a*e)*s.sz,l)-l.height)}}else d>.986&&u.density<.3&&s(`pebbles`,p,`${e}:stone`,0,.025,0,.07+t()*.08,.035+t()*.03,.07,t()*Ah,`desertRock`);i&&i.set(e,o)}let v=5.8,y=[];for(let t=Math.floor((m-o-1)/v);t<=Math.ceil((m+o+1)/v);t++)for(let r=Math.floor((h-o-1)/v);r<=Math.ceil((h+o+1)/v);r++){let i=`ground:${e.seed??0}:flowers:${t}:${r}`,a=hn(Ph(i));if(a()>.46)continue;let s=(t+.14+a()*.72)*v,c=(r+.14+a()*.72)*v,l=(s-n.x)**2+(c-n.z)**2;l>(o+1)**2||y.push({id:i,r:a,x:s,z:c,distance:l})}y.sort((e,t)=>e.distance-t.distance||e.id.localeCompare(t.id));for(let e of y){if(a.flowers.length>kh.flowers-3)break;let{id:t,r,x:s,z:c}=e,l=i?.get(t);if(!i?.has(t)){l=[];let e=5+Math.floor(r()*5),n=.5+r()*.5,a=r()*Ah,o=Nh.flowers[Math.floor(r()*Nh.flowers.length)];for(let i=0;i<e;i++){let u=a+i*2.39996323+(r()-.5)*.35,d=Math.sqrt((i+.15+r()*.35)/e)*n,p=s+Math.cos(u)*d,m=c+Math.sin(u)*d,h=g(p,m),_=.25+r()*.11,v=.18+r()*.07,y=r()*Ah;!h||f.vegetation(p,m,h).density<.7||l.push([`flowers`,{id:`${t}:${i}`,clump:t,anchor:{x:p,y:h.height-.002,z:m,rotation:0,scale:1},x:0,y:0,z:0,sx:v,sy:_,sz:v,rotation:y,color:o}])}l.length<3&&(l=[]),i?.set(t,l)}let u=(l??jh).filter(([,e])=>(e.anchor.x-n.x)**2+(e.anchor.z-n.z)**2<o*o);if(!(u.length<3||u.length>kh.flowers-a.flowers.length))for(let[,e]of u)a.flowers.push(e)}if(i?.size>18e3){for(let e of i.keys())if(i.delete(e),i.size<=14e3)break}}return a}function Vh(e,t){let n=new dt;n.name=`walking-close-detail`,n.visible=!1,e.add(n);let r={value:new J},i={value:0},a={value:new J},o={value:1},s={},c=new tt,l=new tt,u=new tt,d=new J,f=new J,p=new _t,h=new J(0,1,0),g=new v;for(let e of Mh){let t=e===`grass`||e===`crops`||e===`flowers`,c=e===`flowers`?_h():t?mh({crop:e===`crops`}):new rt(1,0);if(e===`grass`)for(let e=0;e<6;e++)c.setAttribute(`grassRoots${e}`,new Dt(new Float32Array(kh.grass*4),4).setUsage(xe));let l=qt(new ae({color:16777215,vertexColors:e===`flowers`,flatShading:!t,side:t?2:0}));gh(l,{focus:r,time:i,player:a,visibility:o},e);let u=new Fe(c,l,kh[e]);u.name=`walking-${e}`,u.setColorAt(0,X.white),u.count=0,u.frustumCulled=!1,u.castShadow=!1,u.receiveShadow=!0,u.instanceMatrix.setUsage(xe),n.add(u),s[e]=u}let _={builds:0,instances:0,drawCalls:Mh.length,ready:!1},y=null,b=-1,x=null,S={x:1/0,z:1/0},C=!1,w=[],T=[],E=new Map,D=(e,t)=>{if(e.length!==t.length)return!1;let n=new Set(e);return t.every(e=>n.has(e))};function O(e,n){let r=kh.radius+kh.padding;return e.filter(e=>e.points?.some((i,a)=>nt(t,i,n)<r+(e.width??1)||!Tt(t)&&a>0&&Fh(n.x,n.z,{a:e.points[a-1],b:i})<r+(e.width??1)))}function k(e,{placements:v=jh,revision:k=0,visible:A=!1,visibilityWeight:j=1,time:M=0,playerPosition:N=e,cityStreets:ee=t.cityStreets??jh}={}){if(C||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return;n.visible=A,Ve(t,e.x,e.y??0,e.z,r.value),i.value=M,Ve(t,N.x,N.y??0,N.z,a.value),o.value=m.clamp(j,0,1);let P=v!==y||k!==b||ee!==x,F=!Number.isFinite(S.x)||nt(t,e,S)>=kh.refreshDistance;if(!P&&!F)return;let te=kh.radius+kh.padding,ne=v.filter(n=>nt(t,n,e)<te+Rh(n)),I=O(ee,e),L=!D(w,ne)||!D(T,I);if(y=v,b=k,x=ee,!F&&!L&&_.ready)return;P&&L&&E.clear(),w=ne,T=I;let R=Bh(t,w,e,{cityStreets:T,groundCache:E}),z=0;for(let e of Mh){let n=s[e],r=R[e];n.count=r.length,z+=r.length;for(let[i,a]of r.entries()){let r=a.anchor;if(Ke(t,r.x,r.y??0,r.z,r.rotation??0,c),c.scale(f.setScalar(r.scale??1)),d.set(a.x,a.y,a.z),f.set(a.sx,a.sy,a.sz),p.setFromAxisAngle(h,a.rotation),l.compose(d,p,f),u.multiplyMatrices(c,l),n.setMatrixAt(i,u),n.setColorAt(i,a.colorRGB?g.fromArray(a.colorRGB):X[a.color]??X.grass),e===`grass`)for(let e=0;e<6;e++){let t=n.geometry.attributes[`grassRoots${e}`],o=a.rootHeights,s=e*4,c=a.sy*(r.scale??1);t.setXYZW(i,(o?.[s]??0)/c,(o?.[s+1]??0)/c,(o?.[s+2]??0)/c,(o?.[s+3]??0)/c)}}if(e===`grass`)for(let e=0;e<6;e++)n.geometry.attributes[`grassRoots${e}`].needsUpdate=!0;n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}S={x:e.x,z:e.z},Object.assign(_,{builds:_.builds+1,instances:z,ready:!0})}function A(){if(!C){C=!0;for(let e of Object.values(s))e.geometry.dispose(),e.material.dispose(),e.dispose();n.removeFromParent()}}return{root:n,stats:_,update:k,dispose:A}}function Hh(e,{isActive:t,onToggle:n,onExit:r,onKey:i=()=>!1,canLook:a=()=>!0}){let o=new Set,s=[],c=null,l=null,u=0,d=0,f=!1,p=!1,m=!!t(),h=!!a(),g=e.ownerDocument,_=g.defaultView??globalThis.window;function v(e,t,n,r){e.addEventListener(t,n,r),s.push(()=>e.removeEventListener(t,n,r))}function y(){l=null,u=d=0,c&&(c.lookReady=!1)}function b(){let t=c?.id;o.clear(),c=null,y(),f=p=!1,t!==void 0&&e.hasPointerCapture?.(t)&&e.releasePointerCapture(t)}function x(){let e=!!t(),n=!!a();return e===m?n!==h&&y():b(),m=e,h=n,m}function S(e){e.preventDefault(),e.stopImmediatePropagation()}let C=e=>Number.isFinite(e.clientX)&&Number.isFinite(e.clientY),w=e=>e.pointerType===`touch`||e.pointerType===`pen`;function T(e,t){let n=(e,t)=>Math.max(-t,Math.min(t,e));u=n(u-n(e,80)*.005,.65),d=n(d+n(t,80)*.004,.45)}v(e,`keydown`,e=>{if(x(),e.altKey||e.metaKey||e.ctrlKey)return;if(i(e)){S(e);return}let t=e.key.toLowerCase();t===`v`?(S(e),e.repeat||(b(),n())):m&&([`w`,`a`,`s`,`d`,` `,`e`,`shift`,`arrowleft`,`arrowright`,`arrowup`,`arrowdown`].includes(t)?(t===` `&&!o.has(t)&&!e.repeat&&(f=!0),t===`e`&&!o.has(t)&&!e.repeat&&(p=!0),o.add(t),S(e)):t===`escape`||t===`home`?(S(e),b(),r()):[`f`,`r`,`[`,`]`,`+`,`-`,`=`,`_`].includes(t)&&S(e))},!0);let E=e=>{o.delete(e.key.toLowerCase())};v(e,`keyup`,E),v(_,`keyup`,E),v(e,`blur`,b),v(_,`blur`,b),v(g,`visibilitychange`,()=>{g.hidden&&b()}),v(e,`pointerenter`,e=>{x(),y(),m&&h&&!w(e)&&C(e)&&(l={id:e.pointerId,x:e.clientX,y:e.clientY})}),v(e,`pointerleave`,()=>{y(),c&&!c.touch&&(c.click=!1)}),v(e,`pointerdown`,t=>{x()&&(S(t),e.focus?.({preventScroll:!0}),!c&&C(t)&&(c={id:t.pointerId,x:t.clientX,y:t.clientY,startX:t.clientX,startY:t.clientY,touch:w(t),lookReady:h,click:(t.button??0)===0&&t.isPrimary!==!1},c.touch?e.setPointerCapture?.(t.pointerId):h&&(l={id:t.pointerId,x:t.clientX,y:t.clientY})))},!0);function D(e){(e.clientX-c.startX)**2+(e.clientY-c.startY)**2>25&&(c.click=!1)}v(e,`pointermove`,e=>{if(x()){if(!C(e))y();else if(c?.id===e.pointerId&&D(e),!h)y();else if(c?.touch||w(e)){if(c?.id!==e.pointerId)return;S(e),c.lookReady&&T(e.clientX-c.x,e.clientY-c.y),c.lookReady=!0,c.x=e.clientX,c.y=e.clientY}else e.isPrimary===!1||c&&c.id!==e.pointerId||(l?.id===e.pointerId&&T(e.clientX-l.x,e.clientY-l.y),l={id:e.pointerId,x:e.clientX,y:e.clientY})}},!0);let O=n=>{c?.id===n.pointerId&&(n.type===`pointerup`&&(D(n),t()&&c.click&&(n.button??0)===0&&(p=!0)),n.type!==`pointerup`&&y(),c=null,e.hasPointerCapture?.(n.pointerId)&&e.releasePointerCapture(n.pointerId))};return v(_,`pointerup`,O),v(_,`pointercancel`,O),v(e,`lostpointercapture`,O),v(e,`wheel`,e=>{t()&&S(e)},{capture:!0,passive:!1}),v(e,`contextmenu`,e=>{t()&&e.preventDefault()}),{clear:b,sample(e=0){x();let t=Number.isFinite(e)?Math.max(0,Math.min(e,.1)):0,n={forward:Number(o.has(`w`))-Number(o.has(`s`)),right:Number(o.has(`d`))-Number(o.has(`a`)),jump:f||o.has(` `),sprint:o.has(`shift`),swing:p,lookX:u+(Number(o.has(`arrowleft`))-Number(o.has(`arrowright`)))*t*1.6,lookY:d+(Number(o.has(`arrowdown`))-Number(o.has(`arrowup`)))*t*1.1};return u=d=0,f=p=!1,n},dispose(){b();for(let e of s)e()}}}function Uh(e){let t=new $e;t.setAttribute(`position`,new Re([-1,-1,0,3,-1,0,-1,3,0],3));let n={inverseProjection:{value:new tt},cameraWorld:{value:new tt},skyUp:{value:new J(0,1,0)},sunDirection:{value:new J(-65,110,65).normalize()},horizonColor:{value:new v(12113369)},dayZenith:{value:new v(6005971)},nightZenith:{value:new v(463398)},cloudColor:{value:new v(16052702)},sunColor:{value:new v(16771782)},night:{value:0},strength:{value:1}},r=new gt({name:`walking-sky`,uniforms:n,depthWrite:!1,depthTest:!0,toneMapped:!1,fog:!1,vertexShader:`uniform mat4 inverseProjection; uniform mat4 cameraWorld; varying vec3 skyRay;
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
      }`}),i=new o(t,r);i.name=`walking-sky`,i.visible=!1,i.frustumCulled=!1,i.renderOrder=-1001,e.add(i);let a=!1;function s(t,{visible:r=!1,strength:o=1,night:s=0,up:c=t?.up,sunDirection:l,horizonColor:u=e.background}={}){a||(i.visible=r,t&&(t.updateMatrixWorld(),n.inverseProjection.value.copy(t.projectionMatrixInverse),n.cameraWorld.value.copy(t.matrixWorld)),n.night.value=m.clamp(Number.isFinite(s)?s:0,0,1),n.strength.value=m.clamp(Number.isFinite(o)?o:1,0,1),c?.isVector3&&c.lengthSq()>1e-12&&n.skyUp.value.copy(c).normalize(),l?.isVector3&&l.lengthSq()>1e-12&&n.sunDirection.value.copy(l).normalize(),u?.isColor&&n.horizonColor.value.copy(u))}function c(){a||(a=!0,i.removeFromParent(),t.dispose(),r.dispose())}return{root:i,update:s,dispose:c}}var Wh=(e,t,n)=>e+(t-e)*n,Gh=(e,t,n)=>Math.exp(Wh(Math.log(Math.max(1e-6,e)),Math.log(Math.max(1e-6,t)),n)),Kh=e=>e*e*e*(e*(e*6-15)+10);function qh(e,t){e.updateMatrixWorld(!0);let n=new J().copy(t),r=e.position.clone().sub(n),i=Math.max(.001,r.length()),a=e.userData.characterProjection,o=a?.perspective??+!e.isOrthographicCamera,s=e.clone();return s.isOrthographicCamera=!!e.isOrthographicCamera,s.isPerspectiveCamera=!s.isOrthographicCamera,{camera:s,target:n,distance:i,localDirection:r.divideScalar(i).applyQuaternion(e.quaternion.clone().invert()),halfHeight:a?.halfHeight??(e.isOrthographicCamera?1:i)/e.projectionMatrix.elements[5],aspect:Math.abs(e.projectionMatrix.elements[5]/e.projectionMatrix.elements[0]),perspective:o,near:e.near,far:e.far}}function Jh(e,t,n){if(!e||!Number.isFinite(e.radius)||e.radius<=0)return null;let r=new J().copy(e.center),i=t.target.clone().sub(r),a=n.target.clone().sub(r),o=i.length(),s=a.length();if(o<1e-6||s<1e-6)return null;i.divideScalar(o),a.divideScalar(s);let c=new J().crossVectors(i,a),l=c.length(),u=m.clamp(i.dot(a),-1,1),d=Math.atan2(l,u);l>1e-12?c.divideScalar(l):u<0?(c.crossVectors(i,Math.abs(i.x)<.9?new J(1,0,0):new J(0,0,1)).normalize(),d=Math.PI):(c.set(0,1,0),d=0);let f=new _t().setFromAxisAngle(c,d),p=f.clone().invert();return{center:r,radius:e.radius,start:i,startRadius:o,endRadius:s,arc:f,endOrientation:n.camera.quaternion.clone().premultiply(p),endUp:n.camera.up.clone().applyQuaternion(p)}}function Yh({duration:e=.78,reducedMotion:t={matches:!1}}={}){let n=new me,r=new J;n.name=`character-transition-camera`;let i=new J,a=new J,o=new _t,s=new _t,c=!1,l=0,u=e,d=null,f=null,p=!1,m=0,h=0,g=null;function _(e){let t=e.camera;n.position.copy(t.position),n.quaternion.copy(t.quaternion),n.up.copy(t.up),n.near=t.near,n.far=t.far,n.zoom=t.zoom,n.aspect=e.aspect,n.projectionMatrix.copy(t.projectionMatrix),n.projectionMatrixInverse.copy(t.projectionMatrixInverse),n.isOrthographicCamera=!!t.isOrthographicCamera,n.isPerspectiveCamera=!n.isOrthographicCamera,n.userData.characterProjection={perspective:e.perspective,halfHeight:e.halfHeight},r.copy(e.target),n.updateMatrixWorld(!0)}function v(){return f&&(_(f),c=!1,l=u,m=Number(p)),n}function y(e){if(!c)return n;if(t.matches||(l=Math.min(u,l+Math.max(0,Number.isFinite(e)?e:0)),l>=u))return v();let _=Kh(l/u),y=Wh(d.perspective,f.perspective,_),b=Gh(d.distance,f.distance,_),x=Gh(d.halfHeight,f.halfHeight,_);if(g?(o.slerpQuaternions(s,g.arc,_),a.copy(g.start).applyQuaternion(o),r.copy(g.center).addScaledVector(a,Wh(g.startRadius,g.endRadius,_)),n.quaternion.slerpQuaternions(d.camera.quaternion,g.endOrientation,_).premultiply(o),n.up.lerpVectors(d.camera.up,g.endUp,_).applyQuaternion(o).normalize()):(n.quaternion.slerpQuaternions(d.camera.quaternion,f.camera.quaternion,_),n.up.lerpVectors(d.camera.up,f.camera.up,_).normalize(),r.lerpVectors(d.target,f.target,_)),i.lerpVectors(d.localDirection,f.localDirection,_).normalize().applyQuaternion(n.quaternion),n.position.copy(r).addScaledVector(i,b),g){let e=r.distanceTo(g.center)-g.radius,t=Math.max(.025,.05-e),o=i.dot(a)*b;o<t&&(n.position.addScaledVector(a,t-o),n.up.copy(a),n.lookAt(r))}n.near=Gh(d.near,f.near,_),n.far=Gh(d.far,f.far,_),n.aspect=Wh(d.aspect,f.aspect,_),n.zoom=Wh(d.camera.zoom,f.camera.zoom,_);let S=1-y+y*n.near/b,C=-(1-y+y*n.far/b+S)/(n.far-n.near),w=-S+C*n.near;return n.projectionMatrix.set(1/(x*n.aspect),0,0,0,0,1/x,0,0,0,0,C,w,0,0,-y/b,1-y),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.isPerspectiveCamera=!0,n.isOrthographicCamera=!1,n.userData.characterProjection={perspective:y,halfHeight:x},n.updateMatrixWorld(!0),m=Wh(h,Number(p),_),n}return{camera:n,target:r,update:y,finish:v,get active(){return c},get toWalking(){return p},get walkingWeight(){return m},get progress(){return u>0?Math.min(1,l/u):1},begin({fromCamera:i,toCamera:a,fromTarget:o,toTarget:s,toWalking:y,sphere:b}){let x=c,S=qh(i,o??r),C=qh(a,s);return h=x?m:Number(!y),d=S,f=C,p=!!y,l=0,g=Jh(b,d,f),u=Math.max(.16,e*Math.abs(Number(p)-h)),m=h,_(d),c=!0,t.matches&&v(),n}}}function Xh(){let e=[],t=[],n=(n,r,i)=>{e.push(Math.cos(r)*n,Math.sin(r)*n,0),t.push(i.r,i.g,i.b)};for(let[e,t,r]of[[0,.61,X.redLight],[.61,.87,X.trim],[.87,1,X.teal]])for(let i=0;i<40;i++){let a=i/40*Math.PI*2,o=(i+1)/40*Math.PI*2;n(e,a,r),n(t,a,r),n(t,o,r),e>0&&(n(e,a,r),n(t,o,r),n(e,o,r))}let r=new $e;return r.setAttribute(`position`,new Re(e,3)),r.setAttribute(`color`,new Re(t,3)),r.computeBoundingSphere(),r}function Zh(e,t,n){let r=Xh(),i=new Qe({vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=new o(r,i),s=new o(r,i.clone());a.name=`character-overview-marker`,s.name=`character-map-marker`,a.renderOrder=s.renderOrder=20,a.visible=s.visible=!1,e.add(a),t.add(s);let c=new J,l=new J,u=new J,d=new J,f=new J,p=new J,h=new J,g=!1,_=(e,t,n)=>{let r=m.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function v(e,t,n){f.copy(t).applyMatrix4(e.matrixWorldInverse);let r=e.projectionMatrix.elements,i=r[3]*f.x+r[7]*f.y+r[11]*f.z+r[15];return 2*Math.abs(i)/(Math.max(1,n)*Math.abs(r[5]))}return{root:a,mapRoot:s,get characterReadable(){return g},update({position:e,initialized:t=!1,camera:r,mapBlend:i=0,walking:o=!1,walkingWeight:f=+!!o,viewportHeight:m=800}={}){if(a.visible=s.visible=g=!1,!t||!e||!r||(r.updateMatrixWorld(!0),Ve(n,e.x,e.y??0,e.z,c),it(n,e.x,e.z,l),Tt(n)&&l.dot(d.copy(r.position).sub(c))<=0)||(u.copy(c).addScaledVector(l,Jf),p.copy(c).project(r),h.copy(u).project(r),p.z<-1||p.z>1||Math.abs(p.x)>1.08||Math.abs(p.y)>1.08))return;let y=Math.abs(h.y-p.y)*m/2;g=y>=5;let b=(1-_(4,12,y))*(1-_(.3,.9,f));b>.001&&i<.999&&(a.visible=!0,a.position.copy(c).addScaledVector(l,Jf*.57),a.quaternion.copy(r.quaternion),a.scale.setScalar(v(r,a.position,m)*5.4),a.material.opacity=b),i>.001&&(s.visible=!0,Ve(n,e.x,Tt(n)?2.4:.62,e.z,s.position),s.quaternion.copy(r.quaternion),s.scale.setScalar(v(r,s.position,m)*6.5),s.material.opacity=1)},dispose(){a.removeFromParent(),s.removeFromParent(),r.dispose(),a.material.dispose(),s.material.dispose()}}}var Qh=Object.freeze({faces:256,radius:360});function $h(e,t){let n=new dt;n.name=`town-clock-hands`,e.add(n);let r=new Fe(new f(1,1,1),Yt.metal,Qh.faces*2);r.name=`clock-hands`,r.count=0,r.instanceMatrix.setUsage(xe),r.frustumCulled=!1,r.castShadow=!1,n.add(r);let i=[],a=new tt,o=new tt,s=new tt,l=new c,u=null,d=-1,p=null,m=-1;function h(e,n){i.length=0;let r=[];for(let i of e){let e=i.buildingType?i.buildingType===`clock`?`landmark`:i.buildingType===`hall`?`civic`:null:i.kind,a=e?Hf(e,i.buildingType?0:i.variant):[];if(!a.length)continue;let o=nt(t,i,n);o<=Qh.radius&&r.push({item:i,specs:a,distance:o})}r.sort((e,t)=>e.distance-t.distance);for(let{item:e,specs:n}of r){Ke(t,e.x,e.y??0,e.z,e.rotation??0,a);let r=e.scale??1;a.scale(new J(r,r,r));for(let e of n){if(i.length===Qh.faces)break;l.position.set(e.x,e.y,e.z),l.rotation.set(0,e.rotation,0),l.scale.set(1,1,1),l.updateMatrix(),o.copy(a).multiply(l.matrix),i.push({matrix:o.clone(),radius:e.radius})}}m=-1}return{root:n,hands:r,update(e,{focus:a={x:0,z:0},placements:o=[],revision:c=0,visible:f=!0,reducedMotion:g=!1}={}){if(n.visible=f,!f)return;(o!==u||c!==d||!p||nt(t,a,p)>16)&&(h(o,a),u=o,d=c,p={x:a.x,z:a.z});let _=g?Math.floor(e):Math.floor(e*12)/12;if(_===m)return;m=_;let v=0;for(let e of i)for(let[t,n]of Uf.entries()){let i=Wf(_,t),a=e.radius*n.length;l.position.set(-Math.sin(i)*a*.43,Math.cos(i)*a*.43,n.z),l.rotation.set(0,0,i),l.scale.set(e.radius*n.width,a,.008),l.updateMatrix(),s.copy(e.matrix).multiply(l.matrix),r.setMatrixAt(v++,s)}r.count=v,r.instanceMatrix.needsUpdate=!0},dispose(){r.dispose(),r.geometry.dispose(),n.removeFromParent(),i.length=0}}}var eg=Object.freeze({houseCost:10,houseWidth:2.2,houseDepth:2.2,connectionRange:9,buildReach:7,chopReach:1.1,clearance:.22,maxHeightDifference:.14,playerRadius:.17,terrainSampleSpacing:.36}),tg=new Set([`house`,`tree`,`rock`,`farm`,`cactus`,`landmark`,`station`,`apartment`,`civic`,`tower`]),ng=e=>structuredClone(e),rg=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z);function ig(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}function ag(e){return e?.id==null?`tree:${e?.x}:${e?.z}:${e?.variant??0}`:String(e.id)}function og(e,t){return 2+ig(`${e}:${ag(t)}:logs`)%3}function sg(e){let t=e.width??eg.houseWidth,n=e.depth??eg.houseDepth;return{...e,width:t,depth:n,radius:Math.hypot(t,n)/2}}function cg(e,t,n,r,i=eg.clearance){let a=Ae(e,t,n),o=t.rotation??0,s=Math.cos(o),c=Math.sin(o),l=a.x*s-a.z*c,u=a.x*c+a.z*s,d=Math.max(0,Math.abs(l)-(t.width??eg.houseWidth)/2),f=Math.max(0,Math.abs(u)-(t.depth??eg.houseDepth)/2);return d*d+f*f<(r+i)**2}function lg(e,t,n){let r=n.scale??1;return n.kind===`house`||n.kind===`civic`&&n.width&&n.depth?tn(e,sg(t),sg(n),eg.clearance):n.kind===`farm`&&n.width&&n.depth?tn(e,sg(t),n,eg.clearance):cg(e,t,n,n.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[n.kind]??1)*r)}function ug(e,{config:t=e.gameplay,surfaceAt:n=(t,n)=>ic(e,t,n)}={}){if(!t?.starterHouse||!rg(t.starterHouse))throw TypeError(`Settlement requires a finite starter house`);let r=t.ownerId??t.starterHouse.ownerId??`teal`,i=[{...ng(t.starterHouse),kind:`house`,ownerId:r,cityId:null,connected:!1}],a=[],o=[],s=[],c=new Set,l=ng(t.farmVillages??{}),u=[...l.houses??[],...l.buildings??[]],d=l.paths??[],f=[],p=[],m=0,h=0,g=0,_=0,v=2,y=!1,b=new Map;function x(e=i,t=s){let n=new Map(e.map(e=>[e.id,e.id])),r=new Map(e.map((e,t)=>[e.id,t])),a=e=>{for(;n.get(e)!==e;)e=n.get(e);return e};for(let e of t){if(!n.has(e.fromHouseId)||!n.has(e.toHouseId))continue;let t=a(e.fromHouseId),i=a(e.toHouseId);t!==i&&n.set(r.get(t)<r.get(i)?i:t,r.get(t)<r.get(i)?t:i)}return new Map(e.map(e=>[e.id,a(e.id)]))}let S=e=>`city:${e}`;function C(){let t=x(),n=new Map;for(let e of i){let r=t.get(e.id);n.has(r)||n.set(r,[]),n.get(r).push(e)}let s=new Map(i.map(e=>[e.id,e.cityId]));f=[],p=[];for(let[t,i]of n){let n=i.length>=3?S(t):null;for(let e of i)e.connected=!!n,e.cityId=n;let o=Nn(e,i),c={id:S(t),...o,ownerId:r,level:In(i.length),houseCount:i.length,houseIds:i.map(e=>e.id)};if(p.push(c),!n)continue;let l=new Set(i.map(e=>s.get(e.id)).filter(Boolean));for(let e of a)l.has(e.cityId)&&(e.cityId=n);f.push(c)}let c=new Map([...i,...a].map(e=>[e.id,e]));for(let e of o)e.cityId=c.get(e.fromHouseId)?.cityId??c.get(e.toHouseId)?.cityId??null}function w(t){if(!rg(t))return[];let n=x(),r=new Set;for(let a of i)nt(e,t,a)<=eg.connectionRange&&r.add(n.get(a.id));return i.filter(e=>r.has(n.get(e.id)))}function T(){return f.flatMap(e=>xn(i.filter(t=>t.cityId===e.id),a.filter(t=>t.cityId===e.id)).map(t=>({...t,cityId:e.id})))}let E=()=>[...new Set(T().map(e=>e.type))];function D(t,{player:r,placements:s=[],ready:l=!0,isReadyAt:f}={}){if(!rg(t)||!Number.isFinite(t.rotation))return[`invalid-position`,`Choose a place for your house`];if(!l)return[`loading`,`Preparing this patch of ground`];if(r&&(!rg(r)||cg(e,t,r,eg.playerRadius,.12)))return[`player-blocked`,`Step away from the blueprint`];for(let n of[...i,...a,...u])if(lg(e,t,n))return[`house-blocked`,`Leave a little room between buildings`];for(let n of[...o,...d])if(Ln(e,t,n))return[`path-blocked`,`Keep the village paths clear`];for(let n of s)if((tg.has(n.kind)||n.kind===`nature`&&n.style===`outcrop`)&&rg(n)&&!i.some(e=>e.id===n.id)&&!a.some(e=>e.id===n.id)&&!(n.kind===`tree`&&c.has(ag(n)))&&lg(e,t,n))return[n.kind===`tree`?`tree-blocked`:`scenery-blocked`,n.kind===`tree`?`Chop this tree to clear the ground`:`This spot is already occupied`];let p=Math.cos(t.rotation),m=Math.sin(t.rotation),h=t.width??eg.houseWidth,g=t.depth??eg.houseDepth,_=1/0,v=-1/0,y=Math.ceil(h/eg.terrainSampleSpacing),b=Math.ceil(g/eg.terrainSampleSpacing);for(let r=0;r<=y;r++)for(let i=0;i<=b;i++){let a=h*(r/y-.5),o=g*(i/b-.5),s=We(e,t.x,t.z,a*p+o*m,o*p-a*m);if(f&&!f(s))return[`loading`,`Preparing this patch of ground`];let c=n(s.x,s.z);if(!c||!Number.isFinite(c.height)||![`ground`,`mountain`].includes(c.type))return[`wet-ground`,`Choose dry ground away from the shore`];_=Math.min(_,c.height),v=Math.max(v,c.height)}return t.y=_,v-_>eg.maxHeightDifference?[`steep-ground`,`Find a flatter patch of ground`]:null}function O(t,{player:l,heading:d=0,placements:f=[],ready:p=!0,enforceReach:h=!0,isReadyAt:g}={}){let _=w(t),y=sg({id:`home-${v}`,kind:`house`,x:t?.x,z:t?.z,rotation:rg(t)?Dn(e,t,_,{heading:d,seed:e.seed,placement:v}):0,scale:1,ownerId:r,variant:v%4}),b=null,C=1/0;for(let t of _){let n=nt(e,y,t);n<C&&(C=n,b=t.id)}let T=_.length+1,E=T>=3,O=E?S(_[0].id):null;y.cityId=O,y.connected=E;let k={house:y,cost:eg.houseCost,affordable:m>=eg.houseCost,connected:E,cityId:O,cityHouseCount:T,cityLevel:In(T),connectionHouseId:b,distanceToCity:C,path:null,paths:[],links:[]},A=(e,t)=>({...k,valid:!1,siteValid:!1,code:e,reason:t});if(!rg(y)||!Number.isFinite(y.rotation))return A(`invalid-position`,`Choose a place for your house`);if(!p)return A(`loading`,`Preparing this patch of ground`);if(l&&(!rg(l)||h&&nt(e,l,y)>eg.buildReach))return A(`out-of-reach`,`Move closer to build here`);let j=D(y,{player:l,placements:f,ready:p,isReadyAt:g});if(j)return A(...j);let M=x(),N=new Map,ee=[...i,...a,...u,y,...f],P=(t,r)=>wn(e,t,r,{placements:ee,surfaceAt:n,removedTreeIds:c});for(let t of i){let n=nt(e,y,t);if(n>eg.connectionRange)continue;let r=M.get(t.id);N.has(r)||N.set(r,[]),N.get(r).push({home:t,distance:n})}for(let e of N.values()){e.sort((e,t)=>e.distance-t.distance);let t=null;for(let{home:n}of e)if(t=P(y,n),t)break;if(!t)return A(`path-blocked`,`Leave a clear route to the neighbouring houses`);if(g&&!Tn(t.points,g))return A(`loading`,`Preparing the village path`);k.links.push(t),E&&k.paths.push({...t,cityId:O})}if(E){let e=new Set(_.map(e=>e.id)),t=new Set(o.map(e=>e.id)),n=new Map(i.map(e=>[e.id,e]));for(let r of s){if(t.has(r.id)||!e.has(r.fromHouseId))continue;let i=P(n.get(r.fromHouseId),n.get(r.toHouseId));if(!i)return A(`path-blocked`,`Leave room for the new city paths`);if(g&&!Tn(i.points,g))return A(`loading`,`Preparing the village path`);k.paths.push({...i,cityId:O})}}return k.path=k.paths[0]??null,k.affordable?{...k,valid:!0,siteValid:!0,code:`ready`,reason:E?`Joins your city`:_.length?`Grows your settlement`:`Starts a new outpost`}:{...k,valid:!1,siteValid:!0,code:`not-enough-logs`,reason:`Collect ${eg.houseCost-m} more ${eg.houseCost-m===1?`log`:`logs`}`}}function k(e,t){let n=O(e,t);if(!n.valid)return{ok:!1,...n};let r={...n.house};v++,delete r.width,delete r.depth,i.push(r),s.push(...n.links),o.push(...n.paths),m-=eg.houseCost,C(),_++;let a=A(t);return{ok:!0,house:ng(r),paths:ng(n.paths),addedBuildings:a.buildings,addedPaths:a.paths,developmentSearching:a.searching,cost:eg.houseCost,connected:r.connected,cityId:r.cityId,cityHouseCount:n.cityHouseCount,cityLevel:n.cityLevel,totalLogs:m}}function A(t={}){let s=[],l=[],d=T(),f=rg(t.player)?t.player:null,p=t=>!!t.playerAnchor!=!!f||f&&nt(e,t.playerAnchor,f)>1,m=On.routeBudget,h=On.candidateBudget;if(y=!1,t.ready!==!1)for(let g of d){let d=i.filter(e=>e.cityId===g.cityId),_=`${g.cityId}:${g.type}`,v=`${d.map(e=>e.id).join(`:`)}:${c.size}`,x=b.get(_);if((!x||x.layoutKey!==v||x.placements!==t.placements||x.isReadyAt!==t.isReadyAt||x.complete&&p(x))&&(x={layoutKey:v,placements:t.placements,isReadyAt:t.isReadyAt,playerAnchor:f?{x:f.x,z:f.z}:null,offset:0,complete:!1},b.set(_,x)),x.complete)continue;let S=Cn(e,d),C=null,w=null;for(let o=x.offset;o<S.length;o++){if(!m||!h){x.offset=o,y=!0;break}h--;let s=S[o],l=sg({id:`civic:${g.cityId}:${g.type}`,kind:`civic`,buildingType:g.type,x:s.x,z:s.z,rotation:Pn(e,s,d),scale:1,ownerId:r,connected:!0,...g}),f=d.map(t=>({home:t,distance:nt(e,l,t)})).filter(e=>e.distance<=eg.connectionRange).sort((e,t)=>e.distance-t.distance);if(!f.length||D(l,t)){x.offset=o+1;continue}m--,x.offset=o+1;let p=wn(e,l,f[0].home,{placements:[...i,...a,...u,...t.placements??[]],surfaceAt:n,removedTreeIds:c,maxNodes:On.maxRouteNodes});if(p&&(!t.isReadyAt||Tn(p.points,t.isReadyAt))){C=l,w=p;break}}C?(w.cityId=g.cityId,a.push(C),o.push(w),s.push(C),l.push(w),x.complete=!0):x.offset>=S.length?(x.complete=!0,p(x)&&(y=!0)):y=!0}return s.length&&_++,{buildings:ng(s),paths:ng(l),searching:y,pendingMilestones:E(),pendingDevelopments:ng(T())}}function j(t,{player:n}={}){if(t?.kind!==`tree`||!rg(t))return{ok:!1,code:`not-a-tree`};let r=ag(t);if(c.has(r))return{ok:!1,code:`already-chopped`};if(n&&(!rg(n)||nt(e,n,t)>eg.chopReach))return{ok:!1,code:`out-of-reach`};let i=og(e.seed,t);return c.add(r),m+=i,_++,{ok:!0,treeId:r,logs:i,totalLogs:m}}function M(e){if(!Number.isSafeInteger(e)||e<=g)return null;let t=e-g,n=i.filter(e=>e.ownerId===r&&e.connected&&e.cityId!=null);g=e;let a=n.length*t;return h+=a,_++,{id:`income:${e}`,day:e,days:t,amount:a,totalGold:h,houses:ng(n)}}return C(),{get logs(){return m},get gold(){return h},get developmentSearching(){return y},get revision(){return _},get ownerId(){return r},get houses(){return ng(i)},get buildings(){return ng(a)},get cities(){return ng(f)},get clusters(){return ng(p)},get pendingMilestones(){return E()},get pendingDevelopments(){return ng(T())},get paths(){return ng(o)},get removedTreeIds(){return new Set(c)},isTreeRemoved(e){return c.has(typeof e==`string`?e:ag(e))},snapshot(){return{logs:m,gold:h,lastIncomeDay:g,revision:_,ownerId:r,developmentSearching:y,houses:ng(i),buildings:ng(a),cities:ng(f),clusters:ng(p),pendingMilestones:E(),pendingDevelopments:ng(T()),paths:ng(o),removedTreeIds:[...c]}},evaluateBuild:O,build:k,chop:j,develop:A,settleIncome:M}}function dg(e,{buildingType:n,x:r=0,y:i=0,z:a=0,rotation:o=0,scale:s=1,palette:c}={}){let l=An(n);if(!l)throw TypeError(`Unknown settlement building: ${n}`);let u=c??{body:`teal`,light:`sage`,dark:`roofDark`,roof:`roofBlue`,accent:`gold`,trim:`trim`},d;if(n===`clock`)d=rp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c,animatedClocks:!0});else if(n===`hall`)d=op(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c,animatedClocks:!0});else if(n===`waterTower`)d=rp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:2,palette:c});else if(n===`plaza`)d=sp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c});else if(n===`library`)d=op(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:1,palette:c});else if(n===`guildhall`)d=op(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:2,palette:c});else if(n===`chapel`)d=rp(e,{x:r,y:i,z:a,rotation:o,scale:s,variant:1,palette:c});else if(d=Rf(e,r,i,a,o),d.scale.setScalar(s),n===`well`){$(d,0,.05,0,2.08,.1,2.08,`platform`);let e=new k,n=new w;for(let t=0;t<=8;t++){let r=t*Math.PI*2/8;t?(e.lineTo(Math.cos(r)*.53,Math.sin(r)*.53),n.lineTo(Math.cos(-r)*.35,Math.sin(-r)*.35)):(e.moveTo(.53,0),n.moveTo(.35,0))}e.holes.push(n);let r=new t(e,{depth:.48,bevelEnabled:!1,steps:1});r.rotateX(-Math.PI/2),Pf(d,r,u.light,0,.1,0),Ff(d,0,.295,0,.349,.349,.025,`water`,8);for(let e of[-1,1])$(d,e*.58,.75,0,.105,1.3,.13,u.dark);$(d,0,1.39,0,1.3,.1,.14,u.dark);let i=Ff(d,0,1.03,0,.045,.045,1.12,u.dark,8);i.rotation.z=Math.PI/2,$(d,0,.79,0,.018,.46,.018,`timber`),zf(d,1.74,1.54,.34,1.4,u.roof)}else{$(d,0,.06,0,3.36,.12,2.5,`platform`);for(let e of[-1.36,1.36])for(let t of[-.9,.9])$(d,e,.88,t,.12,1.52,.12,u.dark);$(d,0,1.64,0,2.88,.1,1.96,u.trim),zf(d,3.18,2.34,.6,1.66,u.roof),$(d,0,.3,.42,2.45,.36,.56,u.body),$(d,0,.51,.42,2.57,.06,.66,u.trim);for(let[e,t]of[-.78,0,.78].entries()){$(d,t,.59,.42,.61,.1,.45,u.dark);for(let n of[-.14,.14])If(d,t+n,.65,.42,.095,.065,.12,[`leafGold`,`redLight`,`leaf`][e])}}return d.name=`settlement-${n}`,d.userData.rigidSurfaceAsset=!0,d.userData.footprint={width:l.width,depth:l.depth,height:l.height},d.userData.entrance={x:0,z:l.doorOffset},d.userData.buildingType=n,d}var fg=24,pg=e=>(e=m.clamp(e,0,1),e*e*(3-2*e)),mg=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function hg(e,t,n){let r=new Map,i=new Set,a=new Set,o=!1,s=new rt(1,1),c=new Dt(new Float32Array(384),1).setUsage(xe);s.setAttribute(`dustOpacity`,c);let l=new ae({color:`#e8ddc1`,emissive:`#c3b794`,emissiveIntensity:.45,transparent:!0,depthWrite:!1,flatShading:!0});l.onBeforeCompile=e=>{e.vertexShader=`attribute float dustOpacity; varying float vDustOpacity;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
vDustOpacity = dustOpacity;`),e.fragmentShader=`varying float vDustOpacity;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.a *= vDustOpacity;`)},l.customProgramCacheKey=()=>`settlement-dust-v1`;let u=new Fe(s,l,384),d=new Qe({color:`#dfd3b0`,transparent:!0,depthWrite:!1});d.onBeforeCompile=l.onBeforeCompile,d.customProgramCacheKey=l.customProgramCacheKey;let f=new Fe(s,d,384);for(let e of[u,f])e.name=`construction-dust`,e.count=0,e.visible=!1,e.frustumCulled=!1,e.instanceMatrix.setUsage(xe),e.renderOrder=4;let p=new dt,g=new dt;p.name=g.name=`settlement-construction`,p.add(u),g.add(f),e.add(p),t.add(g);let _=new tt,v=new tt,y=new tt,b=new tt,x=new J,S=new J,C=new _t,w=new J(0,1,0),T=new Set,E=new h;function D(){T.clear();for(let e of r.values())for(let t of e.slots)t.batch.boundingBox||t.batch.computeBoundingBox(),t.batch.geometry.boundingBox||t.batch.geometry.computeBoundingBox(),_.copy(t.pose).scale(x.set(t.map?.6:1,+!!t.map,t.map?.6:1)),E.copy(t.batch.geometry.boundingBox).applyMatrix4(_),t.batch.boundingBox.union(E),T.add(t.batch);for(let e of T)e.boundingSphere||=new Ce,e.boundingBox.getBoundingSphere(e.boundingSphere)}function O(){T.clear();for(let e of r.values()){let t=.035+.965*pg(e.age/1.55);for(let n of e.slots)x.set(n.map?.6+.4*t:1,n.map?1:t,n.map?.6+.4*t:1),_.copy(n.pose).scale(x),n.batch.setMatrixAt(n.index,_),n.batch.instanceMatrix.addUpdateRange(n.index*16,16),T.add(n.batch)}for(let e of T)e.instanceMatrix.needsUpdate=!0}function k(e){for(let t of e.slots)t.batch.setMatrixAt(t.index,t.pose),t.batch.instanceMatrix.addUpdateRange(t.index*16,16),t.batch.instanceMatrix.needsUpdate=!0;r.delete(e.item.id),i.delete(e.item.id)}function A(e){let t=0;for(let e of r.values()){let{item:r,seed:i}=e;Ke(n,r.x,r.y??0,r.z,r.rotation??0,v),y.makeRotationY(r.rotation??0),y.setPosition(r.x,.72,r.z);let a=(r.width??2.2)*(r.scale??1)/2,o=(r.depth??2.2)*(r.scale??1)/2;for(let n=0;n<fg;n++){let r=i+n*17.31,s=mg(r)*.34,l=1.18+mg(r+4)*.4,d=(e.age-s)/l;if(d<=0||d>=1)continue;let p=(n/fg+mg(r+1)*.04)*Math.PI*2,m=Math.sin(p),h=Math.cos(p),g=1/Math.max(Math.abs(m),Math.abs(h)),T=.12+d*(.65+mg(r+2)*.6),E=(.16+.34*Math.sin(Math.PI*d*.85))*(.75+mg(r+3)*.5);S.set(m*(a*g+T),E*.53+d*(.18+mg(r+5)*.43),h*(o*g+T)),x.set(E*(1.12+mg(r+6)*.4),E*.82,E),C.setFromAxisAngle(w,mg(r+7)*6+d*.5),b.compose(S,C,x),_.multiplyMatrices(v,b),u.setMatrixAt(t,_),S.y=.08,x.y=.08,b.compose(S,C,x),_.multiplyMatrices(y,b),f.setMatrixAt(t,_),c.setX(t++,.46*pg(d/.14)*(1-pg((d-.48)/.52)))}}u.count=f.count=t,u.visible=t>0&&e<.999,f.visible=t>0&&e>.001,t&&(u.instanceMatrix.needsUpdate=f.instanceMatrix.needsUpdate=c.needsUpdate=!0)}return{activeIds:i,beginSync(e,{animate:t=!1,reducedMotion:n=!1}={}){let s=new Set(e.map(e=>e.id));for(let e of r.values())(!s.has(e.item.id)||n)&&k(e);for(let e of r.values())e.slots.length=0;if(o&&t&&!n){for(let t of e)if(!a.has(t.id)){r.size>=16&&k(r.values().next().value);let e=[...String(t.id)].reduce((e,t)=>e+t.charCodeAt(0),0);r.set(t.id,{item:{...t},seed:e,age:0,slots:[]}),i.add(t.id)}}a=s,o=!0},bind(e,t,n,i,{map:a=!1}={}){r.get(e.id)?.slots.push({batch:t,index:n,pose:i.clone(),map:a})},finishSync(){D(),O()},update(e,{mapBlend:t=0,reducedMotion:n=!1,night:i=0}={}){if(!r.size){u.visible=f.visible=!1,u.count=f.count=0;return}let a=Number.isFinite(e)?Math.max(0,e):0;l.emissiveIntensity=m.lerp(.45,.035,i);for(let e of r.values())e.age+=a,(e.age>=2||n)&&k(e);O(),A(t)},get count(){return r.size},get dustCount(){return u.count},dispose(){r.clear(),i.clear(),p.removeFromParent(),g.removeFromParent();for(let e of[u,f])e.dispose();s.dispose(),l.dispose(),d.dispose()}}}function gg(e){let t=e=>new k(e.map(([e,t])=>new Y(e,-t))),n=(e,t)=>{let n=new k;n.absarc(0,0,e,0,Math.PI*2,!1);let r=new w;return r.absarc(0,0,t,0,Math.PI*2,!0),n.holes.push(r),n},r;if(e===`well`)r=[n(1.05,.58)];else if(e===`clock`)r=[n(1.23,1.02),t([[-.1,-.78],[.1,-.78],[.1,-.1],[.64,-.1],[.64,.1],[-.1,.1]])];else if(e===`market`)r=[t([[-1.5,-.62],[0,-1.4],[1.5,-.62],[1.5,.78],[1,.52],[.5,.78],[0,.52],[-.5,.78],[-1,.52],[-1.5,.78]])];else if(e===`waterTower`)r=[t([[-1.04,-.65],[0,-1.23],[1.04,-.65],[1.04,.32],[.65,.32],[.85,1.2],[.51,1.2],[.32,.32],[-.32,.32],[-.51,1.2],[-.85,1.2],[-.65,.32],[-1.04,.32]])];else if(e===`plaza`){r=[n(.72,.42)];for(let[e,t]of[[-1.03,0],[1.03,0],[0,-1.03],[0,1.03]]){let n=new k;n.absarc(e,t,.3,0,Math.PI*2,!1),r.push(n)}}else if(e===`library`){let e=t([[-1.4,1],[-1.4,-.32],[-.88,-.32],[-.88,-.56],[-.67,-1.04],[-.3,-1.34],[.3,-1.34],[.67,-1.04],[.88,-.56],[.88,-.32],[1.4,-.32],[1.4,1]]);for(let t of[-.76,0,.76])e.holes.push(new w([new Y(t-.13,-.72),new Y(t+.13,-.72),new Y(t+.13,-.04),new Y(t-.13,-.04)]));r=[e]}else if(e===`guildhall`)r=[t([[-1.5,.94],[-1.5,-.82],[-1.1,-1.4],[-.7,-.82],[-.7,-.27],[.7,-.27],[.7,-.82],[1.1,-1.4],[1.5,-.82],[1.5,.94],[.26,.94],[.26,.25],[-.26,.25],[-.26,.94]])];else if(e===`chapel`)r=[t([[-1.05,.94],[-1.05,-.18],[-.37,-.58],[-.37,-1.12],[0,-1.66],[.37,-1.12],[.37,-.58],[1.05,-.18],[1.05,.94],[.21,.94],[.21,.18],[-.21,.18],[-.21,.94]])];else{let e=t([[-1.5,.95],[-1.5,-.65],[0,-1.42],[1.5,-.65],[1.5,.95]]);for(let t of[-.8,0,.8])e.holes.push(new w([new Y(t-.15,-.62),new Y(t+.15,-.62),new Y(t+.15,.4),new Y(t-.15,.4)]));r=[e]}let i=new G(r,12);return i.rotateX(-Math.PI/2),i}function _g(e,t,n,{ownerId:r=n.gameplay.ownerId}={}){let i=new dt,a=new dt;i.name=`player-settlement`,a.name=`settlement-map`,e.add(i),t.add(a);let s=hg(i,a,n),c=n.players.find(e=>e.id===r),l=kc(c),u=[];for(let e=0;e<4;e++){let t=new dt;ep(t,{variant:e,palette:l}),up(Bf(t)),u.push(t)}let d=new Map,p=new Map;for(let{type:e}of Fn){let t=new dt;dg(t,{buildingType:e,palette:l}),up(Bf(t)),d.set(e,t),p.set(e,gg(e))}let m=new f(2.2,2.2,2.2);m.translate(0,1.1,0);let h=new v(`#5dd9b4`),g=new v(`#ec565c`),_=new Qe({color:h,transparent:!0,opacity:.2,depthWrite:!1}),y=new o(m,_),b=new o(m,_);y.name=b.name=`settlement-blueprint`,y.visible=b.visible=!1,y.renderOrder=b.renderOrder=5,i.add(y),a.add(b);let x=new be(m),S=new Te({color:h,transparent:!0,opacity:.72,depthWrite:!1});y.add(new ke(x,S)),b.add(new ke(x,S));function C(e=256){let t=new $e;return t.setAttribute(`position`,new z(new Float32Array(e*3),3).setUsage(xe)),t.setAttribute(`lineDistance`,new z(new Float32Array(e),1).setUsage(xe)),t.setDrawRange(0,0),t}let w=C(),T=C(),E=new At({color:h,dashSize:.12,gapSize:.09,transparent:!0,opacity:.9,depthWrite:!1}),D=new ke(w,E),O=new ke(T,E);for(let e of[D,O])e.name=`settlement-path-preview`,e.visible=!1,e.frustumCulled=!1,e.renderOrder=9;i.add(D),a.add(O);let k=new dt,A=new dt;k.name=`settlement-paths`,A.name=`settlement-map-paths`,i.add(k),a.add(A);let j=new Qe({color:X.sand,depthWrite:!1});function M(e){for(let e of[k,A]){for(let t of e.children)t.geometry.dispose();e.clear()}let t=xm(k,{...n,cityStreets:e});for(let e of t){let t=e.geometry;e.geometry=Wc(t,.6),t.dispose();let r=e.geometry.attributes.position;for(let e=0;e<r.count;e++)r.setY(e,ic(n,r.getX(e),r.getZ(e)).height+ym);r.needsUpdate=!0,e.geometry.computeVertexNormals(),e.geometry.computeBoundingSphere(),e.castShadow=!1,e.receiveShadow=!0;let i=e.geometry.clone(),a=i.attributes.position;for(let e=0;e<a.count;e++)a.setY(e,.62);i.computeBoundingSphere();let s=new o(i,j);s.renderOrder=7,A.add(s)}}let N=new o(new Bt(.26,.32,28),new Qe({color:16768918,side:2,depthWrite:!1}));N.rotation.x=-Math.PI/2,N.renderOrder=8,N.visible=!1,i.add(N);let ee=new I(1,5);ee.rotateX(-Math.PI/2),ee.rotateY(Math.PI);let P=new Qe({color:Oc(c).body,depthWrite:!1}),F=new tt,te=new tt,ne=[],L,R=0,B=0,V=0,re=[],ie=[];function ae(e){if(e.length>V){for(let e of[...re,...ie])e.removeFromParent(),e.dispose();re.length=ie.length=0,V=Math.max(4,2**Math.ceil(Math.log2(e.length)));for(let[e,t]of d){for(let n of t.children){let t=new Fe(n.geometry,n.material,V);t.name=`settlement-civic-${e}`,t.userData.buildingType=e,t.castShadow=t.receiveShadow=!0,i.add(t),re.push(t)}let n=new Fe(p.get(e),P,V);n.name=`settlement-civic-map-${e}`,n.userData.buildingType=e,n.renderOrder=8,a.add(n),ie.push(n)}}for(let e of[...re,...ie])e.count=0;for(let t of e){Ke(n,t.x,t.y??0,t.z,t.rotation??0,F),F.scale(new J().setScalar(t.scale??1));for(let e of re)e.userData.buildingType===t.buildingType&&(s.bind(t,e,e.count,F),e.setMatrixAt(e.count++,F));te.makeRotationY(t.rotation??0),te.setPosition(t.x,.68,t.z);for(let e of ie)!t.cityId&&e.userData.buildingType===t.buildingType&&(s.bind(t,e,e.count,te,{map:!0}),e.setMatrixAt(e.count++,te))}for(let e of[...re,...ie])e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.computeBoundingBox()}function oe(e,t=[],r=[],o={}){if(s.beginSync([...e,...r],o),M(t),ae(r),!L||e.length>R){for(let e of ne)e.removeFromParent(),e.dispose();L?.removeFromParent(),L?.dispose(),R=Math.max(16,2**Math.ceil(Math.log2(e.length))),ne=[];for(let e=0;e<4;e++)for(let t of u[e].children){let n=new Fe(t.geometry,t.material,R);n.userData.variant=e,n.count=0,n.castShadow=n.receiveShadow=!0,i.add(n),ne.push(n)}L=new Fe(ee,P,R),L.renderOrder=8,a.add(L)}for(let e of ne)e.count=0;let c=0;e.forEach(e=>{Ke(n,e.x,e.y??0,e.z,e.rotation??0,F);for(let t of ne)t.userData.variant===(e.variant??0)%4&&(s.bind(e,t,t.count,F),t.setMatrixAt(t.count++,F));te.makeScale(1.6,1,1.6),te.setPosition(e.x,.66,e.z),e.cityId||(s.bind(e,L,c,te,{map:!0}),L.setMatrixAt(c++,te))});for(let e of ne)e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.computeBoundingBox();L.count=c,L.instanceMatrix.needsUpdate=!0,L.computeBoundingSphere(),B++,s.finishSync(),i.updateMatrixWorld(!0)}return{root:i,mapRoot:a,sync:oe,construction:s,get meshes(){return[...ne,...re].filter(e=>e.count>0&&e.material.userData.sceneStyle!==`window`)},get revision(){return B},preview(e,{visible:t=!1,targetTree:n=null}={}){if(y.visible=b.visible=t&&!!e?.house,D.visible=O.visible=!1,N.visible=!t&&!!n,N.visible&&(N.position.set(n.x,(n.y??0)+.025,n.z),N.scale.setScalar(Math.max(1,(n.scale??1)*1.15))),!y.visible)return;let r=e.house;y.position.set(r.x,r.y??0,r.z),y.rotation.y=r.rotation??0,b.position.set(r.x,.68,r.z),b.rotation.y=y.rotation.y,_.color.copy(e.valid?h:g),S.color.copy(_.color),D.material.color.copy(_.color);let i=e.paths??(e.path?[e.path]:[]),a=i.reduce((e,t)=>e+Math.max(0,t.points.length-1)*2,0);if(a){if(a>w.attributes.position.count){let e=2**Math.ceil(Math.log2(a));w.dispose(),T.dispose(),D.geometry=w=C(e),O.geometry=T=C(e)}let e=w.attributes.position,t=T.attributes.position,n=w.attributes.lineDistance,r=T.attributes.lineDistance,o=0;for(let{points:a}of i){let i=0;for(let s=1;s<a.length;s++){let c=a[s-1],l=a[s],u=Math.hypot(l.x-c.x,l.z-c.z);for(let[a,s]of[[c,i],[l,i+u]])e.setXYZ(o,a.x,(a.y??0)+.045,a.z),t.setXYZ(o,a.x,.69,a.z),n.setX(o,s),r.setX(o,s),o++;i+=u}}for(let e of[w,T])e.attributes.position.needsUpdate=e.attributes.lineDistance.needsUpdate=!0,e.setDrawRange(0,a);D.visible=O.visible=!0}},update({mapBlend:e=0,dt:t=0,reducedMotion:n=!1,night:r=0}={}){i.visible=e<.999,a.visible=e>.001,s.update(t,{mapBlend:e,reducedMotion:n,night:r})},dispose(){s.dispose(),i.removeFromParent(),a.removeFromParent();for(let e of[...ne,...re,...ie])e.dispose();L?.dispose();for(let e of[...u,...d.values()]){for(let t of e.children)t.geometry.dispose();for(let t of e.userData.ownedMaterials??[])t.dispose()}for(let e of p.values())e.dispose();Object.values(l).forEach(e=>e.dispose()),w.dispose(),T.dispose(),E.dispose(),N.geometry.dispose(),N.material.dispose(),m.dispose(),_.dispose(),x.dispose(),S.dispose();for(let e of[k,A])for(let t of e.children)t.geometry.dispose();j.dispose(),ee.dispose(),P.dispose()}}}var vg=(e,t)=>{e.textContent!==t&&(e.textContent=t)},yg=e=>Number.isFinite(e)?Math.max(0,Math.floor(e)):0,bg=new Intl.NumberFormat(`en-US`),xg=new Intl.NumberFormat(`en-US`,{notation:`compact`,maximumFractionDigits:0}),Sg=e=>e<1e4?bg.format(e):xg.format(e);function Cg(e){let t=yg(e),n=In(t),r=n===5;return{houses:t,level:n,complete:r,progress:r?1:(t-n*3)/3,next:r?null:(n+1)*3}}var wg=e=>`<svg class="settlement-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true">${e}</svg>`,Tg={log:wg(`<path class="settlement-log-bark" d="m3 15 15-9 11 6v11l-15 8-11-6z"/><path class="settlement-log-light" d="m3 15 15-9 11 6-15 8z"/><path class="settlement-log-cut" d="m3 15 11 5v11L3 25z"/><path class="settlement-log-grain" d="m6 20 5 2v5l-5-3z"/><path class="settlement-log-seam" d="m17 23 9-5"/>`),coin:wg(`<path class="settlement-coin-edge" d="m16 2 7 2 6 7 1 7-4 8-7 4-8-1-7-6-2-8 4-8z"/><path class="settlement-coin-face" d="m16 5 6 2 4 5 1 6-4 6-5 3-6-1-5-5-2-6 4-6z"/><path class="settlement-coin-shine" d="m6 14 3-5 7-4 6 2-7 1-6 4-2 8z"/><path class="settlement-coin-mark" d="M14 10h4v13h-4z"/>`),sun:wg(`<path class="settlement-sun-rays" d="M14 0h4v5h-4zM14 27h4v5h-4zM0 14h5v4H0zM27 14h5v4h-5zM4 6l2-2 4 4-2 2zM22 24l2-2 4 4-2 2zM4 26l4-4 2 2-4 4zM22 8l4-4 2 2-4 4z"/><path class="settlement-sun-face" d="m16 7 7 3 3 6-3 7-7 3-6-3-3-7 3-6z"/><path class="settlement-sun-shade" d="m16 7 7 3 3 6-3 7-7 3 5-10z"/>`),moon:wg(`<path class="settlement-moon-face" d="m19 3-8 2-6 6-1 8 4 7 8 3 8-3 4-6-6 1-6-3-3-6 1-5z"/><path class="settlement-moon-shade" d="m4 19 4 7 8 3 8-3 4-6-6 1-6 4-7-2z"/>`)},Eg=(e,t,n,r=``)=>`<button type="button" data-action="${e}" ${r}><kbd>${t}</kbd><span>${n}</span></button>`;function Dg({parent:e=document.body,playerColor:t=`#37a98d`,onTool:n=()=>{},onView:r=()=>{},onBuild:i=()=>{},onCancel:a=()=>{},onDayNight:o=()=>{},onChop:s=null}={}){let c=document.createElement(`aside`);c.className=`settlement-hud`,c.setAttribute(`aria-label`,`Settlement controls`),c.style.setProperty(`--settlement-owner`,t),c.innerHTML=`
    <div class="settlement-inventory" role="group" aria-label="Resources">
      <div class="settlement-resource settlement-wood" data-hud="wood-stock" aria-label="No logs. Ten logs builds a house."><strong data-hud="logs">0</strong><span class="settlement-resource-caption">${Tg.log}<span>Logs</span></span></div>
      <div class="settlement-resource settlement-gold" data-hud="gold-stock" aria-label="No gold"><strong data-hud="gold">0</strong><span class="settlement-resource-caption">${Tg.coin}<span>Gold</span></span></div>
    </div>
    <div class="settlement-development" data-hud="development" role="group" aria-label="Settlement development">
      <span class="settlement-level" aria-hidden="true">
        <svg class="settlement-level-paint" viewBox="0 0 64 64"><path d="m32 8 17 7 7 17-7 17-17 7-17-7-7-17 7-17z"/><path d="m32 8 17 7 7 17-7 17-17 7 11-24z"/></svg>
        <svg class="settlement-progress" viewBox="0 0 64 64"><circle class="settlement-progress-track" cx="32" cy="32" r="29"/><circle class="settlement-progress-arc" data-hud="progress" cx="32" cy="32" r="29" pathLength="1"/></svg>
        <strong data-hud="level">0</strong>
      </span>
      <span class="settlement-growth"><span class="settlement-label" data-hud="city-label">Outpost</span><strong data-hud="city-progress">1 / 3</strong><span class="settlement-growth-caption" data-hud="growth-caption">toward city</span></span>
    </div>
    <div class="settlement-day-control"><span class="settlement-phase-label"><span data-hud="phase-symbol" data-kind="sun">${Tg.sun}</span><span class="settlement-label" data-hud="day-phase">Daytime</span></span>${Eg(`day-night`,`N`,`Night`,`aria-keyshortcuts="N" aria-label="Skip to night and collect daily income"`)}</div>
    <div class="settlement-income" data-hud="income" role="status" aria-live="polite" aria-atomic="true" hidden>
      <span class="settlement-income-rule" aria-hidden="true"></span>
      <span class="settlement-income-copy"><span class="settlement-income-amount"><strong data-hud="income-amount">+0</strong><span class="settlement-income-currency">${Tg.coin}<span>Gold</span></span></span><span class="settlement-income-label" data-hud="income-label">Day's earnings</span></span>
      <span class="settlement-income-rule" aria-hidden="true"></span>
    </div>
    <div class="settlement-dock">
      <div class="settlement-build-actions" data-hud="build-actions" role="group" aria-label="House placement" hidden>
        <span class="settlement-placement-note" data-hud="placement">10 logs · joins city</span>
        <span class="settlement-validity" data-hud="validity"></span>
        <div class="settlement-placement-keys">${Eg(`build`,`Enter`,`Place`,`aria-keyshortcuts="Enter"`)}${Eg(`cancel`,`Esc`,`Cancel`,`aria-keyshortcuts="Escape"`)}</div>
      </div>
      <div class="settlement-actions" role="group" aria-label="Tools and camera">
        ${Eg(`axe`,`E`,`Chop`,`class="settlement-tool" aria-pressed="true" aria-keyshortcuts="E" aria-label="Select axe. E or click to chop a nearby tree."`)}
        ${Eg(`house`,`B`,`Build`,`class="settlement-tool" aria-pressed="false" aria-keyshortcuts="B" aria-label="Place a house. Costs ten logs."`)}
        ${Eg(`view`,`V`,`Overview`,`aria-keyshortcuts="V" aria-label="Switch to overview"`)}
      </div>
      <div class="settlement-movement" data-hud="movement" aria-label="Movement controls"><span><kbd>WASD</kbd>Move</span><span><kbd>Shift</kbd>Run</span><span><kbd>Space</kbd>Jump</span></div>
    </div>
    <div class="settlement-sr-only" data-hud="announcements" role="status" aria-live="polite" aria-atomic="true"></div>`,e.append(c);let l=Object.fromEntries([...c.querySelectorAll(`[data-hud]`)].map(e=>[e.dataset.hud,e])),u=Object.fromEntries([...c.querySelectorAll(`[data-action]`)].map(e=>[e.dataset.action,e])),d=u.view.querySelector(`span`),f=u[`day-night`].querySelector(`span`),p={},m=``,h=``,g=null,_=null,v=!1,y={axe:()=>{n(`axe`),s?.()},house:()=>n(`house`),view:r,build:i,cancel:a,"day-night":o};function b(e){let t=e.target.closest(`button[data-action]`);t&&!t.disabled&&y[t.dataset.action]?.(),e.stopPropagation()}let x=e=>e.stopPropagation();c.addEventListener(`click`,b);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])c.addEventListener(e,x);function S(e={}){if(v)return;p={...p,...e};let{logs:t=0,gold:n=0,houses:r=1,connectedHouses:i=r,cityHouses:a=i,tool:o=`axe`,walking:s=!0,ready:g=!0,canBuild:_=!1,connected:y=!0,reason:b=``,targetTree:x=!1,message:S=``,visible:C=!0,dayPhase:w=`day`,nightAmount:T}=p,E=yg(t),D=yg(n),O=Cg(a),k=w===`night`,A=Number.isFinite(T)?T>=.45:k,j=JSON.stringify([E,D,r,O.houses,o,s,g,!!_,!!y,b,!!x,S,C,k,A]);if(j===h)return;h=j;let M=o===`house`;c.hidden=!C,Object.assign(c.dataset,{tool:o,ready:String(!!g),valid:String(!!_),affordable:String(E>=10),target:String(!!x&&s&&!M),phase:k?`night`:`day`,theme:A?`night`:`day`}),vg(l.logs,Sg(E)),vg(l.gold,Sg(D)),l[`wood-stock`].title=`${bg.format(E)} logs`,l[`gold-stock`].title=`${bg.format(D)} gold`,l[`wood-stock`].setAttribute(`aria-label`,`${E} logs. Ten logs builds one house.`),l[`gold-stock`].setAttribute(`aria-label`,`${D} gold. Your city homes earn one gold each at sunset.`),vg(l.level,String(O.level)),vg(l[`city-label`],O.level?`City level`:`Outpost`),vg(l[`city-progress`],O.complete?`Max`:`${O.houses} / ${O.next}`),vg(l[`growth-caption`],O.complete?`fully grown`:O.level?`next level`:`toward city`),l.progress.setAttribute(`stroke-dasharray`,`${O.progress} 1`),l.development.dataset.complete=String(O.complete);let N=O.complete?`City level 5. ${O.houses} homes. Maximum level.`:`${O.level?`City level ${O.level}`:`Outpost`}. ${O.houses} of ${O.next} homes toward ${O.level?`the next level`:`forming a city`}.`;l.development.setAttribute(`aria-label`,N),vg(l[`day-phase`],k?`Nighttime`:`Daytime`),vg(f,k?`Day`:`Night`);let ee=k?`moon`:`sun`;l[`phase-symbol`].dataset.kind!==ee&&(l[`phase-symbol`].innerHTML=Tg[ee],l[`phase-symbol`].dataset.kind=ee),u[`day-night`].setAttribute(`aria-label`,k?`Skip to day`:`Skip to night and collect daily income`),l[`build-actions`].hidden=!M,vg(l.placement,y?`10 logs · joins city`:`10 logs · new home`),l.placement.setAttribute(`aria-label`,y?`Spend ten logs. Joins a city with a path.`:`Spend ten logs. Paths form at three nearby homes.`);let P=b||(E<10?`${10-E} more logs needed`:`Choose clear, level ground`);vg(l.validity,g?_?`Ready to place`:E<10?`${10-E} more logs needed`:P.replace(/[.!]$/,``):`Preparing clearing`),l.validity.dataset.valid=String(!!_),u.axe.setAttribute(`aria-pressed`,String(!M)),u.house.setAttribute(`aria-pressed`,String(M)),u.house.setAttribute(`aria-label`,`Place a house. Costs ten logs. ${E>=10?`Enough logs gathered.`:`${10-E} more logs needed.`}`);for(let e of[`axe`,`house`,`view`,`cancel`,`day-night`])u[e].disabled=!g;u.axe.disabled=!g||!s,u.build.disabled=!g||!_,u.build.setAttribute(`aria-label`,_?`Build house. Spend ten logs. ${y?`Joins a city.`:`Paths form at three nearby homes.`}`:`Cannot build here. ${P}`),vg(d,s?`Overview`:`Walk`),u.view.setAttribute(`aria-label`,s?`Switch to overview`:`Return to your traveller`),l.movement.hidden=!s;let F=[g?`${E} logs. ${D} gold.`:`Preparing your clearing.`,N,M?`House placement selected. Aim at clear ground. Enter places; Escape cancels.`:`Axe selected. E or click chops a nearby tree.`,s?``:`Overview.`,S].filter(Boolean).join(` `);F!==m&&(vg(l.announcements,F),m=F)}function C({amount:t,days:n=1}={}){let r=yg(t);if(v||!r)return!1;clearTimeout(g),_?.cancel(),vg(l[`income-amount`],`+${bg.format(r)}`),vg(l[`income-label`],n>1?`${yg(n)} days' earnings`:`Day's earnings`),l.income.hidden=!1,Object.assign(l.income.dataset,{amount:String(r),days:String(Math.max(1,yg(n)))});let i=e.ownerDocument?.defaultView?.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;return _=l.income.animate?.(i?[{opacity:0,offset:0},{opacity:1,offset:.08},{opacity:1,offset:.84},{opacity:0,offset:1}]:[{opacity:0,transform:`translateY(12px)`,offset:0},{opacity:1,transform:`translateY(0)`,offset:.09},{opacity:1,transform:`translateY(0)`,offset:.8},{opacity:0,transform:`translateY(-8px)`,offset:1}],{duration:4200,easing:`ease-out`,fill:`both`}),g=setTimeout(()=>{l.income.hidden=!0,_?.cancel(),_=null,g=null},4200),!0}return S(),{root:c,update:S,showIncome:C,dispose(){v=!0,clearTimeout(g),_?.cancel(),c.removeEventListener(`click`,b);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])c.removeEventListener(e,x);c.remove()}}}var Og=Object.freeze({visible:192,detailRadius:95,walkingRadius:48,doorInset:.24,selectionInterval:.25,routineRadius:24,indoorOffset:.2,doorstepHeight:.14,routeBudget:3,routeNodes:900,routeLength:160}),kg=1e-5,Ag=(e,t,n)=>Math.max(t,Math.min(n,e)),jg=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),Mg=(e,t)=>Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z),Ng=e=>`${Math.round(e.x*1e4)}:${Math.round(e.z*1e4)}:${Math.round(e.y*1e3)}`,Pg=(e,t,n)=>({x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n,z:e.z+(t.z-e.z)*n}),Fg=e=>Math.atan2(Math.sin(e),Math.cos(e));function Ig(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}function Lg(e){let t=e.randomState;return t^=t<<13,t^=t>>>17,t^=t<<5,e.randomState=t>>>0,e.randomState/4294967296}function Rg(e,t){let n=new Map;if(Array.isArray(t))for(let e of t){let t=e.houseIds??[];if(t.length>=3)for(let r of t)n.set(r,e.id)}else{let t=new Map;for(let n of e)n.cityId!=null&&(t.has(n.cityId)||t.set(n.cityId,[]),t.get(n.cityId).push(n.id));for(let[e,r]of t)if(r.length>=3)for(let t of r)n.set(t,e)}return n}function zg(e,{trimStart:t=!0,trimEnd:n=!0}={}){let r=e.filter(e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z)).map(e=>({x:e.x,y:e.y??0,z:e.z}));for(let e=r.length-1;e>0;e--)jg(r[e],r[e-1])<kg&&r.splice(e,1);if(r.length<2)return[];let i=r.slice(1).reduce((e,t,n)=>e+jg(r[n],t),0),a=Math.min(Og.doorInset,i*.2);function o(){let e=a;for(;r.length>1;){let t=jg(r[0],r[1]);if(e<t){r[0]=Pg(r[0],r[1],e/t);break}e-=t,r.shift()}}return t&&o(),r.reverse(),n&&o(),r.reverse(),r}function Bg(e,t){let n=[],r=new Map,i=new Map,a=new Map;for(let n of e){let e=n.cityId??t.get(n.fromHouseId)??t.get(n.toHouseId);e!=null&&a.set(n.id,e)}let o=new Map(t);for(let t=0;t<2;t++)for(let t of e){let e=a.get(t.id)??o.get(t.fromHouseId)??o.get(t.toHouseId);e!=null&&(a.set(t.id,e),o.set(t.fromHouseId,e),o.set(t.toHouseId,e))}for(let t of e){let e=a.get(t.id);if(e==null)continue;let r=zg(t.points??[],t);for(let i=1;i<r.length;i++){let a=r[i-1],o=r[i];jg(a,o)<kg||n.push({a,b:o,pathId:t.id,cityId:e,index:i,cuts:[0,1]})}}let s=new Map,c=new Set;for(let[e,t]of n.entries()){let{a:r,b:i}=t;for(let a=Math.floor(Math.min(r.x,i.x)/8);a<=Math.floor(Math.max(r.x,i.x)/8);a++)for(let o=Math.floor(Math.min(r.z,i.z)/8);o<=Math.floor(Math.max(r.z,i.z)/8);o++){let l=`${t.cityId}:${a}:${o}`;s.has(l)||s.set(l,[]);let u=s.get(l);for(let a of u){let o=`${a}:${e}`;if(c.has(o))continue;c.add(o);let s=n[a];if(s.pathId===t.pathId)continue;let l=i.x-r.x,u=i.z-r.z,d=s.b.x-s.a.x,f=s.b.z-s.a.z,p=s.a.x-r.x,m=s.a.z-r.z,h=l*f-u*d;if(Math.abs(h)>kg){let e=(p*f-m*d)/h,n=(p*u-m*l)/h;e>=-1e-5&&e<=1.00001&&n>=-1e-5&&n<=1.00001&&Math.abs(Pg(r,i,e).y-Pg(s.a,s.b,n).y)<.12&&(t.cuts.push(Ag(e,0,1)),s.cuts.push(Ag(n,0,1)))}else if(Math.abs(p*u-m*l)<kg){let e=l*l+u*u,n=d*d+f*f;for(let n of[s.a,s.b]){let a=((n.x-r.x)*l+(n.z-r.z)*u)/e;a>kg&&a<.99999&&Math.abs(Pg(r,i,a).y-n.y)<.12&&t.cuts.push(a)}for(let e of[r,i]){let t=((e.x-s.a.x)*d+(e.z-s.a.z)*f)/n;t>kg&&t<.99999&&Math.abs(Pg(s.a,s.b,t).y-e.y)<.12&&s.cuts.push(t)}}}u.push(e)}}function l(e,t){let n=`${t}:${Ng(e)}`;return r.has(n)||r.set(n,{id:n,cityId:t,...e,edges:[]}),r.get(n)}for(let e of n){e.cuts.sort((e,t)=>e-t);for(let t=1;t<e.cuts.length;t++){let n=e.cuts[t-1],r=e.cuts[t];if(r-n<kg)continue;let a=l(Pg(e.a,e.b,n),e.cityId),o=l(Pg(e.a,e.b,r),e.cityId);if(a.id===o.id)continue;let s=[a.id,o.id].sort().join(`|`);if(i.has(s)){i.get(s).pathIds.add(e.pathId);continue}let c={id:s,a,b:o,cityId:e.cityId,length:jg(a,o),pathIds:new Set([e.pathId])};i.set(s,c),a.edges.push(c),o.edges.push(c)}}return{nodes:r,edges:i}}function Vg(e,t,n){let r=null;for(let i of e.edges.values())if(i.cityId===n){let{a:e,b:n}=i,a=n.x-e.x,o=n.z-e.z,s=Ag(((t.x-e.x)*a+(t.z-e.z)*o)/(i.length*i.length),0,1),c=Pg(e,n,s),l=jg(c,t);(!r||l<r.error)&&(r={edge:i,t:s,error:l,position:c})}return r}var Hg=class{constructor(){this.items=[]}push(e){let t=this.items;t.push(e);let n=t.length-1;for(;n;){let r=n-1>>1;if(t[r].score<=e.score)break;t[n]=t[r],n=r}t[n]=e}pop(){let e=this.items,t=e[0],n=e.pop();if(e.length){let t=0;for(;t*2+1<e.length;){let r=t*2+1;if(r+1<e.length&&e[r+1].score<e[r].score&&r++,e[r].score>=n.score)break;e[t]=e[r],t=r}e[t]=n}return t}get length(){return this.items.length}};function Ug(e,t){if(e.id===t.id)return[];let n=new Hg,r=new Map([[e.id,{node:e,cost:0,parent:null,edge:null}]]);n.push({...r.get(e.id),score:jg(e,t)});let i=0;for(;n.length&&i++<Og.routeNodes;){let e=n.pop();if(e.cost===r.get(e.node.id)?.cost){if(e.node.id===t.id){let t=[];for(let n=e;n.edge;n=n.parent)t.push(n.edge.id);return t.length<=Og.routeLength?t.reverse():null}for(let i of e.node.edges){let a=i.a.id===e.node.id?i.b:i.a,o=e.cost+i.length,s=r.get(a.id);if(s&&s.cost<=o)continue;let c={node:a,cost:o,parent:e,edge:i,score:o+jg(a,t)};r.set(a.id,c),n.push(c)}}}return null}function Wg(e,t,n,r,i,a=[]){let o=new Map,s=new Map,c=new Map;for(let n of t){let t=zg(n.points??[],n),r=n.cityId??i.get(n.fromHouseId)??i.get(n.toHouseId);if(t.length&&r!=null)for(let[i,a]of[[n.fromHouseId,t[0]],[n.toHouseId,t.at(-1)]]){let t=e.nodes.get(`${r}:${Ng(a)}`);t&&!c.has(i)&&c.set(i,t)}}let l=e=>{o.set(e.id,e),s.has(e.cityId)||s.set(e.cityId,[]),s.get(e.cityId).push(e)};for(let t of[...n,...r]){let n=i.get(t.id)??t.cityId;if(n==null)continue;let r=c.get(t.id);if(!r){let i=Vg(e,t,n);i&&(r=jg(i.edge.a,t)<jg(i.edge.b,t)?i.edge.a:i.edge.b)}if(!r)continue;let a=t.buildingType??`home`;l({id:t.id,cityId:n,kind:a,nodeId:r.id,x:r.x,z:r.z,lookX:t.x,lookZ:t.z,heading:Math.atan2(t.x-r.x,t.z-r.z)})}for(let e of a){let t=c.get(e.id);if(e.kind!==`farm`||!t||t.cityId!==e.cityId||o.has(e.id))continue;let n=e.lookX??e.x,r=e.lookZ??e.z;l({id:e.id,cityId:e.cityId,kind:`farm`,nodeId:t.id,x:t.x,z:t.z,lookX:n,lookZ:r,heading:Math.atan2(n-t.x,r-t.z)})}for(let t of e.nodes.values())t.edges.length>=3&&l({id:`junction:${t.id}`,cityId:t.cityId,kind:`junction`,nodeId:t.id,x:t.x,z:t.z,heading:0});for(let[t,n]of s)if(!n.some(e=>e.kind===`junction`)){let n=[...e.nodes.values()].filter(e=>e.cityId===t&&e.edges.length===2);for(let e of n.slice(0,8))l({id:`junction:${e.id}`,cityId:t,kind:`junction`,nodeId:e.id,x:e.x,z:e.z,heading:0})}return{destinations:o,byCity:s}}function Gg(e={}){let t={nodes:new Map,edges:new Map},n=new Map,r=0,i=new Map,a=new Map,o=new Map,s=!1,c=0,l=0,u=0,d={walking:0,lingering:0,chatting:0,entering:0,indoors:0,leaving:0};function f(e,t,n){return!n||!t.edges.includes(n)?(e.moving=!1,!1):(e.edge=n,e.direction=n.a.id===t.id?1:-1,e.along=e.direction===1?0:n.length,!0)}function p(e,t){e.destinationId=t?.id??null,e.destinationKind=t?.kind??null,e.route=[],e.activity=s?`heading-home`:`walking`,e.arrived=!1}function m(e,t){let n=i.get(e.houseId),r=(a.get(e.cityId)??[]).filter(r=>r.id!==e.destinationId&&r.nodeId!==t.id&&(!n||jg(r,n)<=Og.routineRadius));if(s){p(e,n);return}let o=r.map(t=>({target:t,weight:t.kind===`home`?t.id===e.houseId?.3:.7:t.kind===`market`?2.8:t.kind===`farm`?2.6:t.kind===`well`?2.1:t.kind===`plaza`?2.5:t.kind===`junction`?1.25:1.6}));if(!o.length){p(e,n),e.wait=2+Lg(e)*3;return}let c=Lg(e)*o.reduce((e,t)=>e+t.weight,0),l=o.at(-1).target;for(let e of o)if(c-=e.weight,c<=0){l=e.target;break}p(e,l)}function h(n){let r=o.get(n.houseId),a=i.get(n.houseId),s=t.nodes.get(a?.nodeId);if(!r||!s)return null;let c={...jn(e,r),y:(r.y??0)+Og.doorstepHeight};if(jg(c,s)>.85)return null;let l={...jn(e,r,Og.indoorOffset),y:c.y};return{entry:{x:s.x,y:s.y,z:s.z},door:c,inside:l}}function g(e){let t=h(e);return t?(e.portal={mode:`entering`,points:[t.entry,t.door,t.inside],index:0},e.activity=`entering`,e.wait=0,e.route=[],e.lookHeading=null,!0):(e.activity=`lingering`,e.wait=4,!1)}function _(e){let t=h(e);return t?(e.portal={mode:`leaving`,points:[t.door,t.entry],index:0},e.indoors=!1,u++,e.activity=`leaving`,e.arrived=!1,e.lookHeading=null,!0):(e.wait=1,!1)}function v(e,n){if(e.portal=null,n===`entering`){e.indoors=!0,u++,e.activity=`indoors`,e.wait=s?0:1+Lg(e)*7,e.lookHeading=null;return}let r=Vg(t,e,e.cityId);r&&r.error<2e-4&&Math.abs(r.position.y-e.y)<.002?(e.edge=r.edge,e.along=r.t*r.edge.length,e.direction=r.t>.5?-1:1):e.edge=null,e.route=[],e.destinationId=null,e.destinationKind=null,e.arrived=!1,e.activity=s?`heading-home`:`walking`,e.lookHeading=null,e.wait=0}function y(e,t){let n=0;for(;e.portal&&t>kg;){let r=e.portal,i=r.points[r.index],a=Mg(e,i);if(a<=kg){++r.index>=r.points.length&&v(e,r.mode);continue}let o=e.speed*.94,s=Math.min(a,o*t),c=Pg(e,i,s/a);jg(e,i)>kg&&(e.lookHeading=Math.atan2(i.x-e.x,i.z-e.z)),Object.assign(e,c),t-=s/o,n+=s,s>=a-kg&&++r.index>=r.points.length&&v(e,r.mode)}return{remaining:t,travelled:n}}function b(e,t){if(e.arrived=!0,e.route=[],e.lookHeading=t.lookX===void 0?t.heading:Math.atan2(t.lookX-e.x,t.lookZ-e.z),s&&t.id===e.houseId){g(e);return}e.activity=`lingering`;let n=t.kind===`market`?[4,8]:t.kind===`farm`?[5,9]:t.kind===`well`?[2,5]:t.kind===`plaza`?[5,10]:t.kind===`junction`?[2,5]:t.kind===`home`?[1,4]:[3,6];e.wait=(n[0]+Lg(e)*n[1])*e.tempo,t.kind===`junction`&&(e.lookHeading=e.heading+(Lg(e)-.5)*Math.PI)}function x(e,n){let r=i.get(e.destinationId);if((!r||r.cityId!==e.cityId||e.arrived)&&(m(e,n),r=i.get(e.destinationId)),!r)return e.wait=1,!1;if(r.nodeId===n.id)return b(e,r),!1;let a=e.route.length?t.edges.get(e.route[0]):null;if(!a||!n.edges.includes(a)){if(e.route=[],!c)return e.wait=.08,!1;c--,l++;let i=t.nodes.get(r.nodeId),o=i?Ug(n,i):null;if(!o)return e.arrived=!s,e.wait=s?4:1+Lg(e)*2,!1;e.route=o,a=t.edges.get(o[0])}return e.route.shift(),f(e,n,a)}function S({houses:s=[],paths:c=[],cities:l,buildings:u=[],destinations:d=[]}={}){let f=Rg(s,l);o=new Map(s.map(e=>[e.id,e])),t=Bg(c,f);let p=new Set;({destinations:i,byCity:a}=Wg(t,c,s,u,f,d));for(let r of s){let i=f.get(r.id);if(i==null)continue;let a=`resident:${r.id}`;p.add(a);let o=n.get(a);if(o){if(o.cityId=i,o.route=o.route.filter(e=>t.edges.has(e)),o.indoors||o.portal)continue;if(!o.onRoad){let e=Vg(t,r,i);e&&(Object.assign(o,e.position),o.edge=e.edge,o.along=e.t*e.edge.length,o.direction=e.t>.5?-1:1,o.onRoad=!0);continue}let e=o.edge&&t.edges.get(o.edge.id);if(e)o.edge=e;else{let e=Vg(t,o,i),n=o.edge,r=o.direction;if(e&&e.error<2e-4&&Math.abs(e.position.y-o.y)<.002){o.edge=e.edge,o.along=e.t*e.edge.length;let t=Math.atan2(e.edge.b.x-e.edge.a.x,e.edge.b.z-e.edge.a.z),i=n?Math.atan2((n.b.x-n.a.x)*r,(n.b.z-n.a.z)*r):o.heading;o.direction=Math.cos(t-i)>=0?1:-1,o.route=[]}}continue}let s=Ig(`${e.seed??`island`}:${a}`)||1;o={id:a,houseId:r.id,cityId:i,randomState:s,x:r.x,y:r.y??0,z:r.z,heading:r.rotation??0,edge:null,along:0,direction:1,wait:0,phase:0,moving:!1,distance:0,onRoad:!1,route:[],destinationId:null,destinationKind:null,activity:`lingering`,arrived:!1,idleTime:0,lookHeading:null,nightDelay:0,indoors:!1,portal:null},o.speed=.58+Lg(o)*.32,o.wait=Lg(o)*1.8,o.phase=Lg(o)*Math.PI*2,o.tempo=.85+Lg(o)*.3,o.arrivalOffset=.18+Lg(o)*.7;let c=Vg(t,r,i);c&&(Object.assign(o,c.position),o.edge=c.edge,o.along=c.t*c.edge.length,o.onRoad=!0,o.direction=c.t>.5?-1:1,o.heading=Math.atan2((c.edge.b.x-c.edge.a.x)*o.direction,(c.edge.b.z-c.edge.a.z)*o.direction)),n.set(a,o)}for(let e of n.keys())p.has(e)||n.delete(e);r++}function C(e,{night:r=0,dayPhase:a}={}){if(!Number.isFinite(e)||e<=0)return;let o=a?a===`night`:r>(s?.35:.65);if(o!==s){s=o;for(let e of n.values())e.route=[],e.nightDelay=s?Lg(e)*6:0,e.indoors?e.wait=s?0:1+Lg(e)*7:e.portal||(e.arrived=!1,e.destinationId=null,e.destinationKind=null,e.wait=s?Math.min(e.wait,e.nightDelay):1+Lg(e)*7,e.activity=s?`heading-home`:`lingering`)}let u=Math.min(e,.5);c=Og.routeBudget,l=0;for(let e of n.values()){let n=u,r=0;for(e.moving=!1,e.idleTime+=u,e.nightDelay=Math.max(0,e.nightDelay-u),s&&!e.indoors&&!e.portal&&e.nightDelay===0&&e.destinationId!==e.houseId&&p(e,i.get(e.houseId));n>kg&&!(e.indoors&&s);){if(e.wait>0){let t=Math.min(e.wait,n);if(e.wait-=t,n-=t,n<kg)break}if(e.indoors&&!_(e))break;if(e.portal){let t=y(e,n);n=t.remaining,r+=t.travelled;continue}let a=e.edge;if(!a)break;let o=e.direction>0?a.length-e.along:e.along;if(o<=kg){let n=e.direction>0?a.b:a.a,r=t.nodes.get(n.id);if(!r){e.edge=null;break}if(!x(e,r))continue;e.activity=s?`heading-home`:`walking`,e.lookHeading=null;continue}let c=i.get(e.destinationId),l=e.direction>0?a.b:a.a,u=c?.nodeId===l.id&&!e.arrived?Math.min(e.arrivalOffset,a.length*.65):0;if(u&&o<=u+kg){b(e,c);continue}let d=e.speed*(s?.94:1),f=Math.min(o-u,d*n);e.along+=f*e.direction,n-=f/d,r+=f;let p=Ag(e.along/a.length,0,1);e.x=a.a.x+(a.b.x-a.a.x)*p,e.y=a.a.y+(a.b.y-a.a.y)*p,e.z=a.a.z+(a.b.z-a.a.z)*p}e.moving=r>kg,e.distance+=r,e.phase+=r*Math.PI*2/.43;let a=e.edge,o=e.lookHeading??(a?Math.atan2((a.b.x-a.a.x)*e.direction,(a.b.z-a.a.z)*e.direction):e.heading);e.heading+=Fg(o-e.heading)*(1-Math.exp(-u*8))}let f=new Map;for(let e of n.values())if(!s&&!e.indoors&&!e.portal&&!e.moving&&e.wait>.2&&e.arrived){e.activity=`lingering`;let t=`${e.cityId}:${Math.floor(e.x/2)}:${Math.floor(e.z/2)}`;f.has(t)||f.set(t,[]),f.get(t).length<8&&f.get(t).push(e)}for(let e of n.values())if(!s&&e.activity===`lingering`&&e.arrived){let t=null,n=Math.floor(e.x/2),r=Math.floor(e.z/2);for(let i=-1;i<=1&&!t;i++)for(let a=-1;a<=1&&!t;a++)for(let o of f.get(`${e.cityId}:${n+i}:${r+a}`)??[]){let n=jg(e,o);if(o!==e&&n>.12&&n<1.5){t=o;break}}t&&(e.activity=`chatting`,e.lookHeading=Math.atan2(t.x-e.x,t.z-e.z))}for(let e of Object.keys(d))d[e]=0;for(let e of n.values())d[e.activity===`heading-home`?`walking`:e.activity]=(d[e.activity===`heading-home`?`walking`:e.activity]??0)+1}return{sync:S,update:C,get residents(){return n},get graph(){return t},get revision(){return r},get visibilityRevision(){return u},get stats(){return{night:s,indoors:d.indoors,routeSearches:l,activities:{...d}}},snapshot(){return[...n.values()].map(({edge:e,randomState:t,route:n,lookHeading:r,portal:i,...a})=>({...a,transition:i?.mode??null,pathIds:e?[...e.pathIds]:[],edgeId:e?.id??null}))},dispose(){n.clear(),i.clear(),a.clear(),o.clear(),t={nodes:new Map,edges:new Map}}}}function Kg(e,t,{ownerId:n=t.gameplay?.ownerId}={}){let r=new dt;r.name=`settlement-residents`,e.add(r);let i=t.players?.find(e=>e.id===n),a=kc(i),o=new dt,s=cp(o,{color:a.body});s.remove(s.children[0],s.children[1]),up(Bf(o));let l=o.children[0],u=new Fe(l.geometry,l.material,Og.visible);u.name=`resident-bodies`;let d=qt(new y({color:16777215,roughness:1,flatShading:!0})),p=new Fe(new f(1,1,1),d,Og.visible*4);p.name=`resident-limbs`;for(let e of[u,p])e.count=0,e.frustumCulled=!1,e.castShadow=e.receiveShadow=!0,e.instanceMatrix.setUsage(xe),r.add(e);for(let e=0;e<Og.visible*4;e++)p.setColorAt(e,e%2?a.body.color:Yt.metal.color);let m=Gg(t),h=new tt,g=new c,_=new tt,v=[],b=[],x=1/0,S=null,C=0,w=0,T=-1;function E(e,n){b.length=0;for(let r of m.residents.values())if(r.edge&&!r.indoors){let i=nt(t,e,r);i<n&&b.push({resident:r,d:i})}b.sort((e,t)=>e.d-t.d),v.length=0;for(let e=0;e<Math.min(Og.visible,b.length);e++)v.push(b[e].resident);S={x:e.x,z:e.z},C=n,x=0}function D(e){m.sync(e),x=1/0}function O(e,{focus:n={x:0,z:0},mapBlend:i=0,walkingWeight:a=0,visible:o=!0,reducedMotion:s=!1,night:c=0,dayPhase:l,unavailableHomes:d}={}){if(m.update(e,{night:c,dayPhase:l}),x+=e,r.visible=o&&i<.98,!r.visible){w=0;return}let f=a>.5?Og.walkingRadius:Og.detailRadius;(T!==m.visibilityRevision||x>=Og.selectionInterval||!S||C!==f||nt(t,n,S)>3)&&E(n,f),T=m.visibilityRevision;let y=0,b=0;for(let e of v){if(e.indoors||d?.has?.(e.houseId))continue;Ke(t,e.x,e.y+.012,e.z,e.heading,h),u.setMatrixAt(y++,h);let n=e.moving&&!s?Math.sin(e.phase)*.31:0;for(let t of[-1,1]){let r=n*t;g.position.set(t*.055,.32-Math.cos(r)*.16,-Math.sin(r)*.16),g.rotation.set(r,0,0),g.scale.set(.075,.32,.1),g.updateMatrix(),_.copy(h).multiply(g.matrix),p.setMatrixAt(b++,_);let i=!s&&e.activity===`chatting`&&t===1?-.28+Math.sin(e.idleTime*2.2)*.08:0,a=-r*.65+i;g.position.set(t*.143,.53-Math.cos(a)*.105,-Math.sin(a)*.105),g.rotation.set(a,0,t*-.035),g.scale.set(.052,.21,.075),g.updateMatrix(),_.copy(h).multiply(g.matrix),p.setMatrixAt(b++,_)}}u.count=w=y,p.count=b,u.instanceMatrix.needsUpdate=p.instanceMatrix.needsUpdate=!0}return{root:r,body:u,limbs:p,sync:D,update:O,snapshot:()=>m.snapshot(),get stats(){return{residents:m.residents.size,visible:w,edges:m.graph.edges.size,revision:m.revision,draws:w?2:0,...m.stats}},dispose(){m.dispose(),r.removeFromParent(),u.dispose(),p.dispose(),u.geometry.dispose(),p.geometry.dispose();for(let e of o.userData.ownedMaterials??[])e.dispose();d.dispose(),Object.values(a).forEach(e=>e.dispose()),v.length=b.length=0}}}function qg(e){let t=document.createElement(`canvas`);t.width=640,t.height=128;let n=t.getContext(`2d`),r=Oc(e);for(let e=1;e<=5;e++){let t=(e-.5)*128;n.beginPath(),n.arc(t,64,49,0,Math.PI*2),n.fillStyle=r.dark.getStyle(),n.fill(),n.beginPath(),n.arc(t,64,45,0,Math.PI*2),n.fillStyle=r.body.getStyle(),n.fill(),n.font=`700 78px system-ui, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillStyle=r.trim.getStyle(),n.fillText(String(e),t,67)}let i=new F(t);return i.colorSpace=ve,i}function Jg(e,t,n,{ownerId:r=n.gameplay.ownerId}={}){let i=qg(n.players.find(e=>e.id===r)),a=new Qe({map:i,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1});a.onBeforeCompile=e=>{e.vertexShader=`attribute float cityLevel;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <uv_vertex>`,`#include <uv_vertex>
      vMapUv.x = (vMapUv.x + cityLevel - 1.0) / 5.0;`)},a.customProgramCacheKey=()=>`city-level-numerals-v1`;let o=[],s=0,c,l,u,d=new J,f=new J,p=new J,h=new J,g=new tt,_=new J,v=new J,y=new J;function b(n){if(!(n<=s)){l?.removeFromParent(),u?.removeFromParent(),l?.dispose(),u?.dispose(),c?.dispose(),s=Math.max(8,2**Math.ceil(Math.log2(n))),c=new S(1,1),c.setAttribute(`cityLevel`,new Dt(new Float32Array(s),1)),l=new Fe(c,a,s),u=new Fe(c,a,s),l.name=`city-levels`,u.name=`city-levels-map`;for(let e of[l,u])e.count=0,e.frustumCulled=!1,e.renderOrder=18,e.instanceMatrix.setUsage(xe);e.add(l),t.add(u)}}function x(e,t,n){v.copy(t).applyMatrix4(e.matrixWorldInverse);let r=e.projectionMatrix.elements,i=r[3]*v.x+r[7]*v.y+r[11]*v.z+r[15];return 2*Math.abs(i)/(Math.max(1,n)*Math.abs(r[5]))}return b(1),{sync(e){o=e,b(o.length)},update({camera:e,mapBlend:t=0,walkingWeight:r=0,viewportHeight:i=800}={}){if(!l||(l.visible=t<.999&&r<.8,u.visible=t>.001&&r<.8,l.count=u.count=0,!e||!l.visible&&!u.visible))return;a.opacity=1-m.smoothstep(r,.1,.8),e.updateMatrixWorld(!0),y.set(0,1,0).applyQuaternion(e.quaternion);let s=0;for(let t of o){if(Ve(n,t.x,t.y??.7,t.z,d),it(n,t.x,t.z,p),Tt(n)&&p.dot(h.copy(e.position).sub(d))<=0||(f.copy(d).project(e),f.z<-1||f.z>1||Math.abs(f.x)>1.08||Math.abs(f.y)>1.08))continue;let r=x(e,d,i);d.addScaledVector(y,r*24),_.setScalar(r*42),g.compose(d,e.quaternion,_),l.setMatrixAt(s,g),u.setMatrixAt(s,g),c.attributes.cityLevel.setX(s,m.clamp(t.level,1,5)),s++}l.count=u.count=s,l.instanceMatrix.needsUpdate=u.instanceMatrix.needsUpdate=c.attributes.cityLevel.needsUpdate=!0},dispose(){l?.removeFromParent(),u?.removeFromParent(),l?.dispose(),u?.dispose(),c?.dispose(),a.dispose(),i.dispose(),o=[]}}}var Yg=2.8;function Xg(){let e=[],t=[],n=(n,r,i)=>{e.push(n,r,0),t.push(i.r,i.g,i.b)},r=new v(`#b17b26`),i=new v(`#f5c756`),a=new v(`#ffe6a0`);for(let e=0;e<12;e++){let t=e/12*Math.PI*2,o=(e+1)/12*Math.PI*2;n(0,0,i),n(Math.cos(t)*.76,Math.sin(t)*.76,i),n(Math.cos(o)*.76,Math.sin(o)*.76,i);let s=e<6?a:r;for(let[e,r]of[[.76,t],[1,t],[1,o],[.76,t],[1,o],[.76,o]])n(Math.cos(r)*e,Math.sin(r)*e,s)}for(let[e,t]of[[-.09,-.43],[.09,-.43],[.09,.43],[-.09,-.43],[.09,.43],[-.09,.43]])n(e,t,r);let o=new $e;return o.setAttribute(`position`,new Re(e,3)),o.setAttribute(`color`,new Re(t,3)),o.computeBoundingSphere(),o}function Zg(e,t,n){let r=Xg(),i=new Qe({vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=[],o=Yg,s=0,c,l,u=new J,d=new J,f=new J,p=new J,h=new J,g=new J,_=new J,v=new tt;function y(n){if(!(n<=s)){for(let e of[c,l])e?.removeFromParent(),e?.dispose();s=Math.max(16,2**Math.ceil(Math.log2(n))),c=new Fe(r,i,s),l=new Fe(r,i,s),c.name=`house-income`,l.name=`house-income-map`;for(let e of[c,l])e.count=0,e.visible=!1,e.frustumCulled=!1,e.renderOrder=24,e.instanceMatrix.setUsage(xe);e.add(c),t.add(l)}}return y(1),{emit(e){a=e.map(({x:e,y:t=0,z:n})=>({x:e,y:t,z:n})),o=0,y(a.length)},update(e,{camera:t,mapBlend:r=0,walkingWeight:s=0,viewportHeight:y=800,reducedMotion:b=!1}={}){if(o+=Math.max(0,e),c.visible=l.visible=!1,c.count=l.count=0,o>=Yg){a=[];return}if(!t||s>.8)return;t.updateMatrixWorld(!0),g.set(0,1,0).applyQuaternion(t.quaternion);let x=o/Yg,S=b?0:34*(1-(1-x)**2);i.opacity=Math.min(1,o/.12,(Yg-o)/.55)*(1-m.smoothstep(s,.1,.8));let C=0;for(let e of a){if(Ve(n,e.x,e.y+m.lerp(2.1,.8,r),e.z,u),it(n,e.x,e.z,d),Tt(n)&&d.dot(f.copy(t.position).sub(u))<=0||(p.copy(u).project(t),p.z<-1||p.z>1||Math.abs(p.x)>1.08||Math.abs(p.y)>1.08))continue;h.copy(u).applyMatrix4(t.matrixWorldInverse);let i=t.projectionMatrix.elements,a=i[3]*h.x+i[7]*h.y+i[11]*h.z+i[15],o=2*Math.abs(a)/(Math.max(1,y)*Math.abs(i[5]));u.addScaledVector(g,o*(12+S)),_.setScalar(o*10),v.compose(u,t.quaternion,_),c.setMatrixAt(C,v),l.setMatrixAt(C++,v)}c.count=l.count=C,c.visible=r<.999&&C>0,l.visible=r>.001&&C>0,c.instanceMatrix.needsUpdate=l.instanceMatrix.needsUpdate=!0},get active(){return o<Yg&&a.length>0},get visibleCount(){return Math.max(c.count,l.count)},dispose(){for(let e of[c,l])e.removeFromParent(),e.dispose();r.dispose(),i.dispose(),a=[]}}}function Qg({canvas:e,world:t,parent:n,mapParent:r,markerParent:i=n,markerMapParent:a=r,detail:o,getPlayer:s,onView:c,onDayNight:l=()=>{},reducedMotion:u}){let d=ug(t),f=_g(n,r,t),p=Kg(n,t),m=Jg(i,a,t),h=Zg(i,a,t),g=t.gameplay.farmVillages,_=[...g?.houses??[],...g?.buildings??[]],v=g?.paths??[],y=null,b=null,x=null;if(g?.cities?.length){let e={ownerId:g.ownerId};y=_g(n,r,t,e),y.root.name=`farm-villages`,y.mapRoot.name=`farm-villages-map`,y.sync(g.houses,v,g.buildings),b=Kg(n,t,e),b.root.name=`farm-village-residents`,b.sync(g),x=Jg(i,a,t,e),x.sync(g.cities)}let S=d.snapshot(),C=`axe`,w=null,T=null,E=null,D=null,O=!0,k=!1,A=!1,j=null,M=!1,N=!1,ee=null,P=``,F=0,te=-1,ne=-1,I=-1,L=null,R=[],z=[],B=[],V=[],re=[],ae=``,oe=!1,H=new ie,U=new Y,se=new ye(new J(0,1,0),0),ce=new J,le=[],ue=new J,de=()=>e.focus({preventScroll:!0});function fe(e){C=e,w=null,M=!1,N=!1,ae=``,P=``,de()}let W=Dg({parent:e.parentElement,playerColor:`#257d70`,onTool:fe,onView:()=>{fe(`axe`),c()},onDayNight:()=>{l(),de()},onChop:()=>{fe(`axe`),N=!0},onBuild:()=>{M=!0,de()},onCancel:()=>fe(`axe`)});function pe(e,t,n,r){e.addEventListener(t,n,r),le.push(()=>e.removeEventListener(t,n,r))}pe(e,`pointermove`,t=>{if(C!==`house`||t.buttons)return;let n=e.getBoundingClientRect();w={x:(t.clientX-n.left)/n.width*2-1,y:1-(t.clientY-n.top)/n.height*2}}),pe(e,`pointerleave`,e=>{e.relatedTarget?.closest?.(`.settlement-hud`)||(w=null)}),pe(e,`pointerdown`,t=>{O||k||C!==`house`||t.button!==0||(t.preventDefault(),t.stopImmediatePropagation(),de(),T={id:t.pointerId,x:t.clientX,y:t.clientY},e.setPointerCapture?.(t.pointerId))},!0),pe(e.ownerDocument.defaultView,`pointerup`,t=>{T?.id===t.pointerId&&(M=Math.hypot(t.clientX-T.x,t.clientY-T.y)<5,T=null,e.hasPointerCapture?.(t.pointerId)&&e.releasePointerCapture(t.pointerId))}),pe(e,`pointercancel`,()=>{T=null}),pe(e.ownerDocument.defaultView,`blur`,()=>{T=null,M=!1,N=!1,ee=null});function me(){let e=d.revision!==te;if(e){let e=S.houses.length,t=S.buildings?.length??0;S=d.snapshot(),(te<0||S.houses.length!==e||(S.buildings?.length??0)!==t)&&(f.sync(S.houses,S.paths??[],S.buildings??[],{animate:te>=0,reducedMotion:u?.matches}),V=f.meshes,p.sync(S),m.sync(S.cities??[])),te=d.revision}(e||o.placementRevision!==ne)&&(ne=o.placementRevision,R=[...o.placements,...S.houses,...S.buildings??[],..._],z=[...o.getCollisionPlacements(),...S.houses,...S.buildings??[],..._],B=[...o.getTerrainMeshes(),...V,...y?.meshes??[]],re=[...o.cityStreets,...S.paths??[],...v])}function he(e){let t=null,n=1/0,r=Math.sin(e.heading),i=Math.cos(e.heading);for(let a of R){if(a.kind!==`tree`||d.isTreeRemoved(a))continue;let o=a.x-e.position.x,s=a.z-e.position.z,c=Math.hypot(o,s);if(c>eg.chopReach||c<1e-6)continue;let l=(o*r+s*i)/c;if(l<.3)continue;let u=c-l*.5;u<n&&(n=u,t=a)}return t}function ge(e){let n;return w&&j&&(U.set(w.x,w.y),H.setFromCamera(U,j),H.ray.intersectPlane(se,ce)&&H.ray.direction.y<-.01&&(n={x:ce.x,z:ce.z})),n||=We(t,e.position.x,e.position.z,Math.sin(e.heading)*3.8,Math.cos(e.heading)*3.8),n}let _e=e=>o.hasCoverageAt(e,1);function ve(e,t){let n=O||!j?e.heading:Math.atan2(j.getWorldDirection(ue).x,ue.z);return{player:e.position,heading:n,enforceReach:O,placements:R,ready:o.hasCoverageAt(t,2),isReadyAt:_e}}function be(e){P=e,F=3.2}function xe(e){S.pendingMilestones?.length&&(L={x:e.position.x,z:e.position.z},d.develop({player:e.position,placements:R,ready:A,isReadyAt:_e}),me())}return me(),{game:d,art:f,hud:W,residents:p,villageArt:y,villageResidents:b,get building(){return C===`house`},get placements(){return me(),R},get placementRevision(){return me(),`${ne}:${te}`},get cityStreets(){return me(),re},getCollisionPlacements(){return me(),z},getTerrainMeshes(){return me(),B},keyDown(e){let t=e.key.toLowerCase();return t===`b`?(e.repeat||fe(C===`house`?`axe`:`house`),!0):C===`house`&&[`escape`,`enter`,`e`].includes(t)?(e.repeat||(t===`escape`||t===`e`?fe(`axe`):M=!0),!0):t===`r`},prepareInput(e){return N&&=(e.swing=!0,!1),C===`house`&&e.swing&&(M=!0,e.swing=!1),e},onSwing(){let e=s();me();let t=he(e);ee=t?{tree:t,time:.22}:null,t||be(`Step closer and face a tree`)},cancelBuild(){fe(`axe`)},update(n,{walking:r,transitioning:i,camera:a,mapBlend:c=0,walkingWeight:l=Number(r),focus:_,viewportHeight:v=800,dayState:T,night:N=0,uiDt:R=n}={}){if(oe)return;O=r,k=i,j=a;let z=s(),B=d.settleIncome(T?.completedDays??0);B?.amount>0&&(l>.5?W.showIncome(B):h.emit(B.houses),e.dataset.lastIncome=String(B.amount)),o.updateTrees(u?.matches?1:n),me(),A=!!z?.initialized&&o.hasCoverageAt(z.position,2);let V=A&&S.pendingMilestones?.length&&(!L||nt(t,L,z.position)>1);if(A&&(I!==ne||d.developmentSearching||V)&&(I=ne,xe(z)),F>0&&(F-=n,F<=0&&(P=``)),ee&&(ee.time-=n,ee.time<=0)){let e=ee.tree;if(ee=null,O&&nt(t,e,z.position)<=eg.chopReach&&!d.isTreeRemoved(e)){let t=d.chop(e,{player:z.position});t.ok&&(o.fellTree(t.treeId,{direction:{x:e.x-z.position.x,z:e.z-z.position.z}}),be(`+${t.logs} logs`),me(),xe(z))}}if(D=A&&O&&!k&&C===`axe`?he(z):null,A&&C===`house`&&!k){let e=ge(z),t=ve(z,e),n=`${e.x}:${e.z}:${z.position.x}:${z.position.z}:${t.heading}:${O}:${t.ready}:${te}:${ne}`;if(n!==ae&&(E=d.evaluateBuild(e,t),ae=n),M){let t=d.build(e,ve(z,e));t.ok?(be(t.connected?`House built · city expanded`:t.cityHouseCount>1?`House built · settlement expanded`:`House built · new outpost`),me(),C=`axe`,w=null):(P=``,F=0)}}else E=null,ae=``;M=!1,f.preview(E,{visible:C===`house`&&A&&!k,targetTree:D}),f.update({mapBlend:c,dt:R,reducedMotion:u?.matches,night:N});let re=S.houses.filter(e=>e.connected).length,ie=E?.house??z?.position??{x:0,z:0},H=null,U=1/0;for(let e of S.clusters??S.cities??[]){let n=nt(t,e,ie);n<U&&(U=n,H=e)}E?.connectionHouseId?H=(S.clusters??[]).find(e=>e.houseIds.includes(E.connectionHouseId))??H:E&&!E.connectionHouseId&&(H=null);let se=(S.buildings??[]).filter(e=>e.cityId===H?.id),ce=(S.pendingDevelopments??[]).filter(e=>e.cityId===H?.id).map(e=>e.type);p.update(n,{focus:_??z.position,mapBlend:c,walkingWeight:l,visible:A,reducedMotion:u?.matches,night:N,dayPhase:T?.phase,unavailableHomes:f.construction.activeIds}),y?.update({mapBlend:c}),b?.update(n,{focus:_??z.position,mapBlend:c,walkingWeight:l,visible:A,reducedMotion:u?.matches,night:N,dayPhase:T?.phase}),x?.update({camera:j,mapBlend:c,walkingWeight:l,viewportHeight:v}),m.update({camera:j,mapBlend:c,walkingWeight:l,viewportHeight:v}),h.update(R,{camera:j,mapBlend:c,walkingWeight:l,viewportHeight:v,reducedMotion:u?.matches}),W.update({logs:S.logs,gold:S.gold,nightAmount:N,dayPhase:T?.phase??`day`,houses:S.houses.length,connectedHouses:re,cityHouses:H?.houseCount??1,cityLevel:H?.level??0,buildings:se,pendingMilestones:ce,tool:C,walking:O,ready:A,canBuild:!!E?.valid,connected:E?.connected??!0,reason:E?.reason??``,targetTree:!!D,message:P}),Object.assign(e.dataset,{gameplay:`settlement`,logs:String(S.logs),gold:String(S.gold),incomeDay:String(S.lastIncomeDay),incomeCoins:String(h.visibleCount),houses:String(S.houses.length),connectedHouses:String(re),paths:String(S.paths?.length??0),choppedTrees:String(S.removedTreeIds.length),construction:String(f.construction.count),constructionDust:String(f.construction.dustCount),residentsIndoors:String(p.stats.indoors??0),buildMode:String(C===`house`),buildValid:String(!!E?.valid),buildReason:E?.code??``,cities:String(S.cities?.length??0),cityLevels:(S.cities??[]).map(e=>e.level).join(`,`),residents:String(p.stats?.residents??p.stats?.count??0),farmVillages:String(g?.cities?.length??0),villageResidents:String(b?.stats.residents??0),villageResidentsIndoors:String(b?.stats.indoors??0),civicBuildings:String(S.buildings?.length??0),buildingTypes:(S.buildings??[]).map(e=>e.buildingType).join(`,`),pendingMilestones:(S.pendingMilestones??[]).join(`,`),buildX:E?.house?.x?.toFixed(2)??``,buildZ:E?.house?.z?.toFixed(2)??``,buildRotation:E?.house?.rotation?.toFixed(4)??``,targetTree:D?.id??``})},dispose(){oe=!0;for(let e of le)e();W.dispose(),f.dispose(),p.dispose(),m.dispose(),h.dispose(),y?.dispose(),b?.dispose(),x?.dispose()}}}var $g=document.querySelector(`#world`),e_=new j,t_=new j,n_=$g.getAttribute(`aria-label`);e_.background=t_.background=X.backdrop,e_.fog=new ct(X.backdrop,1e6,2e6);var r_=new to({canvas:$g,antialias:!0,powerPreference:`high-performance`});r_.setPixelRatio(Math.min(devicePixelRatio,1.6)),r_.shadowMap.enabled=!0,r_.shadowMap.type=1,r_.toneMapping=4,r_.toneMappingExposure=1.15,r_.outputColorSpace=ve,r_.info.autoReset=!1;var i_=new ge(-60,60,45,-45,.1,500);i_.position.set(115,125,145),i_.lookAt(0,1,0);var a_=new Me(Ut(.94,.035,221),Ut(.55,.025,169),2.15);e_.add(a_);var o_=new O(Ut(.98,.04,84),3.25);o_.position.set(-65,110,65),o_.castShadow=!0,o_.shadow.mapSize.set(2048,2048),Object.assign(o_.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260}),o_.shadow.normalBias=.025,o_.shadow.bias=-15e-5,o_.shadow.radius=3,e_.add(o_,o_.target);var s_=new O(Ut(.85,.035,218),.65);s_.position.set(40,30,-40),e_.add(s_,s_.target);var c_=new o(new S(2e3,2e3),new y({color:X.backdrop,roughness:1}));c_.rotation.x=-Math.PI/2,c_.position.y=-5.7,c_.receiveShadow=!0,e_.add(c_);var l_,u_,d_,f_=[],p_,m_,h_,g_,__,v_,y_,b_,x_,S_,C_,w_,T_,E_=!1,D_=!1,O_=!1,k_;function A_(){let e=k_?.building?`build`:D_?`hidden`:`overview`;$g.dataset.cursor!==e&&($g.dataset.cursor=e)}var j_=0,M_=0,N_=0,P_=!1,F_=null,I_=0,L_=0,R_=0,z_=matchMedia(`(prefers-reduced-motion: reduce)`),B_=Yh({reducedMotion:z_}),V_=Zt({scene:e_,mapScene:t_,sky:a_,sun:o_,fill:s_,renderer:r_}),H_=Gt(),U_,W_=()=>U_===void 0?0:(performance.now()-U_)/1e3,G_=()=>H_.advance(W_()),K_=rh(e_,t_),q_=Uh(e_),J_=new J,Y_=z_.matches;z_.addEventListener(`change`,e=>{Y_=e.matches});var X_=Zo(r_),Z_=Im(r_),Q_=Jo({canvas:$g,camera:i_,scene:e_,mapScene:t_,reducedMotion:z_,getTrains:()=>f_,getWorldRoot:()=>u_,getWorld:()=>l_,isDetailReady:()=>!!d_?.ready&&P_,onPause:()=>{Y_=!Y_},onRegenerate:()=>{if(!l_)return;let e=String(Number.isFinite(Number(l_.seed))?Number(l_.seed)+1:Date.now());Tv({...h_,seed:e}).catch(wv);let t=new URL(location.href);t.searchParams.set(`seed`,e),history.replaceState(null,``,t)}}),{navigation:$_,controls:ev}=Q_,tv=Hh($g,{isActive:()=>D_||B_.active,onToggle:()=>D_?pv():fv(),onExit:pv,canLook:()=>!k_?.building,onKey:e=>e.key.toLowerCase()===`n`?(e.repeat||G_(),!0):k_?.keyDown(e)??!1}),nv=new J,rv=(e,t,n)=>{let r=m.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function iv(){return x_.cameraTarget.clone()}function av(){let e=Tt(l_);return e?{center:new J(0,-e.radius,0),radius:e.radius}:void 0}function ov(){return B_.active?B_.camera:D_?x_.camera:i_}function sv(){if(B_.active)return B_.target.clone();if(D_)return iv();let e=Q_.renderTarget;return Ve(l_,e.x,e.y,e.z,new J)}function cv(){let e=ov(),t=e.clone();return t.isOrthographicCamera=!!e.isOrthographicCamera,t.isPerspectiveCamera=!t.isOrthographicCamera,t}function lv(){if(l_.gameplay)return l_.gameplay.spawn.heading??0;let e=l_.cities[0],t=e&&T_?Ae(l_,e,T_,{}):null;return t?Math.atan2(t.x,t.z):Math.atan2(ev.target.x-$_.position.x,ev.target.z-$_.position.z)}function uv(){if(!x_||x_.initialized||!T_||!d_.hasCoverageAt(T_,2))return;let e=u_.scale.y;u_.scale.set(1,1,1),u_.updateMatrixWorld(!0),x_.enter(T_,lv())&&(k_?(D_=!0,Q_.setInputEnabled(!1),E_=!0,A_()):x_.exit(),x_.root.visible=!0,T_={...x_.position}),u_.scale.y=e,u_.updateMatrixWorld(!0)}function dv(){Q_.setInputEnabled(!D_),tv.sample(0),$g.dataset.view=D_?`person`:Q_.mode,$g.dataset.cameraTransition=`false`,$g.dataset.walkingWeight=D_?`1.000`:`0.000`}function fv(){if(!x_||D_)return;let e=cv(),t=sv(),n=u_.scale.y;u_.scale.set(1,1,1),u_.updateMatrixWorld(!0),x_.enter(T_,lv())?(D_=!0,Q_.setInputEnabled(!1),j_=M_,B_.begin({fromCamera:e,toCamera:x_.camera,fromTarget:t,toTarget:iv(),toWalking:!0,sphere:av()}),E_=!0,B_.active||dv(),$g.dataset.view=`person`,A_(),Uv()):(u_.scale.y=n,u_.updateMatrixWorld(!0))}function pv(){if(!x_||!D_)return;k_?.cancelBuild();let e=cv(),t=sv(),n=x_.heading,r=x_.exit();x_.root.visible=!0,tv.clear(),D_=!1,A_(),Q_.setInputEnabled(!1),Q_.overlook(r,{heading:n,zoom:Q_.zoomScale*1.35});let i=Q_.renderTarget;Ve(l_,i.x,i.y,i.z,nv),j_=M_,B_.begin({fromCamera:e,toCamera:i_,fromTarget:t,toTarget:nv,toWalking:!1,sphere:av()}),B_.active||dv(),Uv()}var mv=170,hv=112,gv=0,_v=new J(115,125,145).normalize(),vv=new J,yv=new tt,bv=new J;function xv(){m_&&=(m_.dispose(),null)}function Sv(){if(Q_.reset(),l_.surface?.complete){let e=l_.surface.radius,t=Ee(l_,l_.camera?.longitude??10,l_.camera?.latitude??25);c_.visible=!1,mv=hv=e*2.2,Q_.setScale(hv/230),ev.target.set(t.x,1.3,t.z);let n=new J().setFromSphericalCoords(1,Math.PI/4,0);$_.position.copy(ev.target).addScaledVector(n,e*3),$_.zoom=1,$_.far=e*8,ev.update(),Ev(),Q_.setHome();return}let e=l_.outline.map(e=>e[0]),t=l_.outline.map(e=>e[1]),r=Math.max(...e)-Math.min(...e),i=Math.max(...t)-Math.min(...t),a=Math.hypot(r,i),o=Math.max(0,...l_.mountains.map(e=>e.height));c_.visible=!Tt(l_);let s=l_.camera?.startInDetail===!0;Q_.setScale(s?1:Math.max(1,a/410)),ev.target.set((Math.max(...e)+Math.min(...e))/2,1.3,(Math.max(...t)+Math.min(...t))/2);let c=l_.camera?.northUp?new J(0,125,180).normalize():_v;$_.position.copy(ev.target).addScaledVector(c,a*1.5+o),$_.zoom=1,$_.far=Math.max(500,a*5+o*3),ev.update(),c_.position.x=ev.target.x,c_.position.z=ev.target.z,c_.scale.setScalar(Math.max(1,a/500));let l=$_.quaternion.clone().invert(),u=l_.outline.flatMap(([e,t])=>[new J(e,-3.4,t),new J(e,4,t)]);l_.mountains.forEach(e=>u.push(new J(e.x,e.height,e.z)));let d=0,f=0;if(u.forEach(e=>{e.sub(ev.target).applyQuaternion(l),d=Math.max(d,Math.abs(e.x)),f=Math.max(f,Math.abs(e.y))}),Q_.zoomScale>1){let e=$_.clone(),t=new J().subVectors($_.position,ev.target),r=new n().setFromVector3(t);r.phi=1e-5,e.position.copy(ev.target).add(t.setFromSpherical(r)),e.lookAt(ev.target);let i=e.quaternion.clone().invert();for(let[e,t]of l_.outline){let n=new J(e,0,t).sub(ev.target).applyQuaternion(i);d=Math.max(d,Math.abs(n.x)),f=Math.max(f,Math.abs(n.y))}}mv=d*2+Math.max(10,d*.2),hv=f*2+Math.max(10,f*.2),Q_.setScale(s?1:Math.max(Q_.zoomScale,hv/230)),Ev(),Q_.setHome()}function Cv(e=Q_.renderTarget,t=0){vv.copy(V_.direction).multiplyScalar(130);let n=Math.max((i_.right-i_.left)/i_.zoom,(i_.top-i_.bottom)/i_.zoom),r=Math.min(480,Math.max(45,n*.72)),i=m.lerp(r,18,t),a=i*2/2048,o=Math.round(e.x/a)*a,s=Math.round(e.z/a)*a;Tt(l_)?(Ve(l_,o,0,s,o_.target.position),Ne(l_,o,s,yv),a_.position.set(0,1,0).applyMatrix4(yv),bv.copy(vv).applyMatrix4(yv),o_.position.copy(o_.target.position).addScaledVector(bv,Math.max(1,i/95)),s_.position.set(40,30,-40).applyMatrix4(yv).add(o_.target.position),s_.target.position.copy(o_.target.position)):(a_.position.set(0,1,0),o_.target.position.set(o,0,s),o_.position.copy(o_.target.position).addScaledVector(vv,Math.max(1,i/95)),s_.position.set(40,30,-40),s_.target.position.set(0,0,0));let c=o_.shadow.camera;Math.abs(c.right-i)>.1&&(Object.assign(c,{left:-i,right:i,top:i,bottom:-i,far:Math.max(260,i*4)}),c.updateProjectionMatrix())}function wv(e){e.name!==`AbortError`&&($g.dataset.error=e.message,console.error(e))}async function Tv(e={}){let t=++N_,n=structuredClone(e);R_=performance.now(),$g.dataset.loading=`true`,delete $g.dataset.error,b_?.dispose();let r=Fm();b_=r;let i,a,o,s,c,l;try{let e=await r.request(`generate`,n);if(t!==N_)throw new DOMException(`World replaced`,`AbortError`);let u=e.world;return l=new dt,i=Dl(new dt,u),c=Tm(l,i.root.getObjectByName(`map-static`),u),s=nh(u),s&&(l.add(s.detail),i.root.add(s.map)),a=gm(l,u),o=Sm(l,u,{maxPending:3,requestChunk:(e,t)=>r.request(`chunk`,e,t),uploadMesh:e=>Z_.upload(e)}),D_=!1,tv.clear(),Q_.setInputEnabled(!0),B_=Yh({reducedMotion:z_}),j_=M_=0,e_.fog.near=1e6,e_.fog.far=2e6,q_.root.visible=!1,k_?.dispose(),k_=null,A_(),x_?.dispose(),S_?.dispose(),C_?.dispose(),w_?.dispose(),xv(),v_?.dispose(),__?.dispose(),d_?.dispose(),p_?.dispose(),u_?.removeFromParent(),g_?.dispose(),y_?.dispose(),y_=r,b_=null,l_=u,u_=l,p_=a,f_=p_.trains,d_=o,g_=i,__=s,v_=c,t_.add(g_.root),e_.add(l),h_=n,gv=0,P_=!1,F_=null,I_=e.milliseconds,Sv(),l_.gameplay&&(k_=Qg({canvas:$g,world:l_,parent:l,mapParent:g_.root,markerParent:e_,markerMapParent:t_,detail:d_,getPlayer:()=>x_,onView:()=>D_?pv():fv(),onDayNight:G_,reducedMotion:z_})),x_=ph(l,l_,{getCollisionPlacements:()=>k_?k_.getCollisionPlacements():d_.getCollisionPlacements(),getTerrainMeshes:()=>k_?k_.getTerrainMeshes():d_.getTerrainMeshes(),isReadyAt:(e,t)=>d_.hasCoverageAt({x:e,z:t},1)}),x_.resize(innerWidth/innerHeight),T_=x_.prepareSpawn(l_.gameplay?.spawn??l_.cities[0]??ev.target),S_=Vh(l,l_),O_=!1,C_=Zh(e_,t_,l_),w_=$h(l,l_),T_&&S_.update(T_,{visible:!1}),$g.dataset.cities=String(l_.cities.length),$g.dataset.trains=String(f_.length),$g.dataset.surface=Tt(l_)?`sphere`:`plane`,k_?$g.setAttribute(`aria-label`,`Your island settlement. Move the cursor to look around. WASD moves, Shift runs, Space jumps. Face a nearby tree and press E or click to chop. Each tree gives 2 to 4 logs. Press B to preview a house costing 10 logs; move the pointer to aim, click or Enter to build, Escape to cancel. Red means blocked or unaffordable. House lots follow your facing direction, with doors more likely to face nearby homes. Three homes form a city and connect by paths. City levels 1 through 5 unlock at 3, 6, 9, 12 and 15 homes, marked by a well, market, water tower, fountain garden and town hall. Residents wander the paths and sleep indoors at night. Gray level-one farming villages have their own residents who visit nearby fields. V switches between your traveller and overview. Each player-owned city home earns one gold at sunset; gray village homes earn you no income. Day and night each last five minutes; N or the day/night button advances to the next phase for testing.`):$g.setAttribute(`aria-label`,n_),document.activeElement===document.body&&$g.focus({preventScroll:!0}),U_===void 0&&(U_=performance.now()),$g.dataset.loading=`false`,L_=performance.now()-R_,Uv(),l_}catch(e){throw t===N_&&($g.dataset.loading=`false`,b_=null),c?.dispose(),s?.dispose(),o?.dispose(),a?.dispose(),i?.dispose(),l?.removeFromParent(),r.dispose(),e}}function Ev(){let e=innerWidth,t=innerHeight,n=e/t,r=Math.max(hv,mv/n);$_.left=-r*n/2,$_.right=r*n/2,$_.top=r/2,$_.bottom=-r/2,$_.updateProjectionMatrix(),r_.setSize(e,t),x_?.resize(n),B_.active&&(B_.finish(),dv(),D_||Q_.updatePresentation(0)),X_.resize(Math.round(e*r_.getPixelRatio()),Math.round(t*r_.getPixelRatio()))}window.addEventListener(`resize`,Ev),Ev();var Dv=new Float32Array(180),Ov=new Float32Array(180),kv=0,Av=0,jv=0,Mv=0,Nv=performance.now(),Pv,Fv=0,Iv=0,Lv=0,Rv=``,zv=0,Bv=0,Vv=0,Hv=0;function Uv(){kv=Av=0,Fv=Iv=Lv=0,Rv=``,jv=performance.now()}function Wv(e,t,n){if(Dv[Av]=t,Ov[Av]=n,Av=(Av+1)%Dv.length,kv=Math.min(kv+1,Dv.length),(B_.active||Q_.blend>.001&&Q_.blend<.999)&&(n>Fv&&(Rv=JSON.stringify({traffic:zv,detail:Bv,view:Vv,render:Hv,blend:Q_.blend})),Lv++,Fv=Math.max(Fv,n),Iv=Math.max(Iv,t)),e-jv<1e3)return;jv=e;let r=e=>[...e.subarray(0,kv)].sort((e,t)=>e-t)[Math.floor((kv-1)*.95)]??0,i=f_.reduce((e,t)=>e+ +!!t.state.active,0);Object.assign($g.dataset,{frameP95:r(Dv).toFixed(2),cpuP95:r(Ov).toFixed(2),drawCalls:String(r_.info.render.calls),triangles:String(r_.info.render.triangles),geometries:String(r_.info.memory.geometries),activeTrains:String(i),mapNetworkVisibility:g_.stats.networkVisibility.toFixed(3),visibleTrains:String(p_.stats?.visibleTrains??0),detailChunks:String(d_.stats?.chunks??d_.stats?.loadedChunks??0),detailReady:String(d_.ready),detailSettled:String(d_.settled),detailRevealing:String(d_.stats.revealingChunks),detailBase:String(v_.root.visible),detailRequired:String(d_.stats.requiredChunks??0),detailPending:String(d_.stats.pendingChunks??0),detailWorkers:String(y_.stats.workers),detailWorkerMs:String(Math.round(y_.stats.lastChunkMs)),detailBytes:String(d_.stats.bytes??0),detailLimited:String(d_.stats.coverageLimited??!1),detailErrors:String(d_.stats.errors??0),transitionCpuMax:Fv.toFixed(2),transitionFrameMax:Iv.toFixed(2),transitionFrames:String(Lv),transitionPeak:Rv,trafficCpu:zv.toFixed(2),detailCpu:Bv.toFixed(2),viewCpu:Vv.toFixed(2),renderCpu:Hv.toFixed(2),simulationSeconds:gv.toFixed(1),simulationCpu:(p_.stats.simulationMs??0).toFixed(2),poseCpu:(p_.stats.poseMs??0).toFixed(2),generationMs:I_.toFixed(0),loadMs:L_.toFixed(0),night:V_.night.toFixed(3),dayPhase:V_.phase,dayElapsed:H_.read().elapsedSeconds.toFixed(1),dayNumber:String(H_.read().dayNumber),walking:String(D_),playerX:x_?.position.x.toFixed(3),playerY:x_?.position.y.toFixed(3),playerZ:x_?.position.z.toFixed(3),playerGrounded:String(x_?.grounded),playerSwings:String(x_?.stats.swings??0),walkingInstances:String(S_?.stats.instances??0),lifeInstances:String(m_?.stats?.instances??m_?.stats?.active??0),lifeSheep:String(m_?.stats?.sheep??0),lifeBirds:String(m_?.stats?.birds??0)})}function Gv(e){let t=performance.now(),n=e-Nv,r=m.clamp(n/1e3,0,.05);if(Nv=e,l_){Y_||(gv+=r);let i=H_.read((e-(U_??e))/1e3);V_.update(r,gv,i.elapsedSeconds),K_.update(),e_.fog.color.copy(e_.background);let a=performance.now();if(p_.update(Y_?0:r),zv=performance.now()-a,a=performance.now(),B_.active)tv.sample(0),B_.update(r),B_.active||dv();else if(D_){let e=tv.sample(r),t=x_.stats.swings;x_.update(r,k_?k_.prepareInput(e):e),x_.stats.swings>t&&k_?.onSwing()}else Q_.updateNavigation(r);!D_&&!B_.active&&Q_.updatePresentation(r);let o=D_||B_.active,s=B_.active?B_.walkingWeight:Number(D_),c=ov(),l=o?x_.position:ev.target,u=B_.active?j_*(1-rv(0,.3,B_.progress)):D_?0:Q_.blend;M_=u,o&&u_.scale.set(1,1,1);let d=Math.max((i_.right-i_.left)/i_.zoom,(i_.top-i_.bottom)/i_.zoom),f=B_.active&&!D_?Math.min(140,Math.max(40,d*.55)):40,p=x_?.initialized?x_.position:T_;if(d_.update(c,{mapBlend:o||Q_.wantsDetail?0:1,target:l,budgetMs:2,groundFocus:p,groundRadius:f,groundOnly:o,coverageCameras:o?void 0:Q_.coverageCameras,retainVisible:o||Q_.blend<1}),uv(),p=x_?.initialized?x_.position:T_,k_?.update(Y_&&!D_?0:r,{walking:D_,transitioning:B_.active,camera:c,mapBlend:u,walkingWeight:s,focus:l,viewportHeight:innerHeight,dayState:i,night:V_.night,uiDt:r}),x_?.initialized&&(x_.root.visible=!0),p&&S_.update(p,{placements:k_?.placements??d_.placements,revision:k_?.placementRevision??d_.placementRevision,cityStreets:k_?.cityStreets??d_.cityStreets,visible:s>.001,visibilityWeight:s,time:gv,night:V_.night}),S_.stats.ready&&!O_){for(let e of S_.root.children)Z_.upload(e);O_=!0}if(e_.fog.near=Math.exp(m.lerp(Math.log(1e6),Math.log(28),s)),e_.fog.far=Math.exp(m.lerp(Math.log(2e6),Math.log(85),s)),!P_&&!F_){let e=N_;r_.shadowMap.enabled=!0,m_||=$m(u_,l_),F_=X_.prepare(e_,t_,i_).then(()=>{e===N_&&(P_=!0)}).catch(t=>{e===N_&&(F_=null,wv(t))})}Bv=performance.now()-a,a=performance.now();let h=o?x_.renderPosition:Q_.renderTarget;w_.update(V_.clockTime,{focus:h,placements:k_?.placements??d_.placements,revision:k_?.placementRevision??d_.placementRevision,visible:u<.999,reducedMotion:z_.matches}),d_.updateVisibility(c,{dt:r,reveal:P_&&u<.999,reducedMotion:z_.matches||E_}),E_=!1,v_.root.visible=o||!d_.settled,p_.updateView(c,{mapBlend:u,focus:h}),u<.999&&(Cv(h,s),m_||=$m(u_,l_),m_.update(gv,{focus:h,placements:d_.lifePlacements,revision:d_.lifeRevision,detailBlend:1-u,reducedMotion:z_.matches,night:Wt.night.value})),m_&&(m_.root.visible=u<.999),J_.subVectors(o_.position,o_.target.position).normalize(),q_.update(c,{visible:s>.001,strength:s,night:V_.night,sunDirection:J_,horizonColor:e_.background}),g_.update(f_,{visible:u>.001,camera:i_,viewportHeight:innerHeight,poseBuffer:p_.poseBuffer,dt:r,reducedMotion:z_.matches}),C_.update({position:x_.renderPosition,initialized:x_.initialized,camera:c,mapBlend:u,walking:D_,walkingWeight:s,viewportHeight:innerHeight}),x_.root.visible=x_.initialized&&(o||u<.999&&C_.characterReadable),$g.dataset.view=D_?`person`:Q_.mode,A_(),$g.dataset.cameraTransition=String(B_.active),$g.dataset.walkingWeight=s.toFixed(3),$g.dataset.mapBlend=u.toFixed(3),$g.dataset.characterVisible=String(x_.initialized&&x_.root.visible),$g.dataset.characterMarker=String(C_.root.visible||C_.mapRoot.visible),Vv=performance.now()-a,a=performance.now(),r_.info.reset(),r_.shadowMap.enabled=u<.999,X_.render(e_,t_,c,u),Hv=performance.now()-a,Wv(e,n,performance.now()-t),Mv++,document.documentElement.dataset.ready=`true`}else r_.render(t_,i_);Pv=requestAnimationFrame(Gv)}document.addEventListener(`visibilitychange`,()=>{document.hidden?cancelAnimationFrame(Pv):(Nv=performance.now(),Uv(),Pv=requestAnimationFrame(Gv))}),Pv=requestAnimationFrame(Gv),window.__railway={get ready(){return Mv>0},get time(){return gv},get paused(){return Y_},get trains(){return f_.map(e=>({id:e.state.id,ownerId:e.state.ownerId,homeCityId:e.state.homeCityId,x:e.parts[0].position.x,y:e.parts[0].position.y,z:e.parts[0].position.z,cars:e.parts.length}))},get render(){return{...r_.info.render,geometries:r_.info.memory.geometries,...p_?.stats,...d_?.stats}},get camera(){return{zoom:i_.zoom,width:innerWidth,height:innerHeight,mode:D_?`person`:Q_.mode,mapBlend:M_,following:Q_.selected,transitioning:B_.active}}},window.railway=Object.freeze({loadWorld:e=>Tv(e).then(e=>structuredClone(e)),exportWorld:()=>structuredClone(h_),inspectWorld:()=>structuredClone(l_),generateWorld:Ec,validateWorld:Dc,createStressWorld:Em});var Kv=new URLSearchParams(location.search);try{await Tv(await Pm(Kv,location.href))}catch(e){wv(e)}