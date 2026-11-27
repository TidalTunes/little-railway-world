const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./settlement-world-CF3D5D1E.js","./island-world-Dde8mhON.js","./mountain-ranges-D2Gd-pVF.js","./island-world-C45IKnLH.js","./earth-world-DNqTiMLI.js","./europe-ranges-DzeqEgDX.js","./globe-land-colors-zIE8SpgG.js","./world-surface-Bylg2z_8.js","./europe-world-BrOnXy3h.js"])))=>i.map(i=>d[i]);
import{$ as e,$n as t,$t as n,An as r,Ar as i,At as a,B as o,Bt as s,C as c,Cr as l,Ct as u,D as d,Dr as f,Dt as p,E as m,Er as h,Et as g,F as _,Ft as v,G as y,Gn as b,Gt as x,H as S,Ht as C,I as w,In as T,It as E,J as D,Jn as O,K as k,Kn as A,Kt as j,L as M,Ln as N,Lt as P,M as F,Mn as I,Mt as L,N as ee,Nn as R,Nt as te,O as z,Or as B,Ot as V,P as H,Pn as ne,Pt as re,Q as ie,Qn as ae,R as oe,Rn as U,Rt as se,Sr as ce,St as le,T as ue,Tr as de,Tt as fe,U as pe,Ut as me,V as he,Vt as ge,W as _e,Wn as ve,Wt as ye,X as be,Y as xe,Yn as Se,Yt as W,Z as Ce,Zn as we,_ as Te,_r as Ee,_t as G,a as De,ar as Oe,br as ke,bt as Ae,c as K,cr as je,ct as Me,d as Ne,dr as Pe,dt as Fe,en as Ie,er as Le,et as Re,f as ze,fr as Be,g as Ve,gr as He,gt as Ue,h as We,hr as q,ht as Ge,i as Ke,ir as qe,it as Je,j as Ye,jn as Xe,jr as Ze,jt as Qe,k as $e,kr as et,kt as tt,l as J,lt as nt,m as rt,mr as Y,mt as it,n as at,nr as ot,nt as st,o as ct,or as lt,ot as ut,p as dt,pr as ft,pt,q as mt,qn as ht,qt as gt,r as _t,rr as vt,rt as yt,s as bt,st as xt,tr as St,tt as Ct,u as wt,ur as Tt,ut as Et,v as Dt,vr as Ot,vt as kt,w as At,wr as jt,wt as Mt,xr as Nt,xt as Pt,y as Ft,yr as It,yt as Lt,z as Rt,zn as zt,zt as Bt}from"./world-surface-Bylg2z_8.js";import{a as Vt,c as Ht,d as Ut,i as Wt,l as Gt,o as X,r as Kt,s as qt,t as Jt,u as Yt}from"./globe-land-colors-zIE8SpgG.js";import{a as Xt,c as Zt,i as Qt,n as $t,o as en,r as tn,s as nn}from"./mountain-ranges-D2Gd-pVF.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function rn(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function an(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var on={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Z={common:{diffuse:{value:new _(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new V}},envmap:{envMap:{value:null},envMapRotation:{value:new V},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new V}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new V}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new V},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new V},normalScale:{value:new Y(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new V},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new V}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new V}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new V}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new _(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0},uvTransform:{value:new V}},sprite:{diffuse:{value:new _(16777215)},opacity:{value:1},center:{value:new Y(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}}},sn={basic:{uniforms:B([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:on.meshbasic_vert,fragmentShader:on.meshbasic_frag},lambert:{uniforms:B([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new _(0)},envMapIntensity:{value:1}}]),vertexShader:on.meshlambert_vert,fragmentShader:on.meshlambert_frag},phong:{uniforms:B([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new _(0)},specular:{value:new _(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:on.meshphong_vert,fragmentShader:on.meshphong_frag},standard:{uniforms:B([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new _(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:on.meshphysical_vert,fragmentShader:on.meshphysical_frag},toon:{uniforms:B([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new _(0)}}]),vertexShader:on.meshtoon_vert,fragmentShader:on.meshtoon_frag},matcap:{uniforms:B([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:on.meshmatcap_vert,fragmentShader:on.meshmatcap_frag},points:{uniforms:B([Z.points,Z.fog]),vertexShader:on.points_vert,fragmentShader:on.points_frag},dashed:{uniforms:B([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:on.linedashed_vert,fragmentShader:on.linedashed_frag},depth:{uniforms:B([Z.common,Z.displacementmap]),vertexShader:on.depth_vert,fragmentShader:on.depth_frag},normal:{uniforms:B([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:on.meshnormal_vert,fragmentShader:on.meshnormal_frag},sprite:{uniforms:B([Z.sprite,Z.fog]),vertexShader:on.sprite_vert,fragmentShader:on.sprite_frag},background:{uniforms:{uvTransform:{value:new V},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:on.background_vert,fragmentShader:on.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new V}},vertexShader:on.backgroundCube_vert,fragmentShader:on.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:on.cube_vert,fragmentShader:on.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:on.equirect_vert,fragmentShader:on.equirect_frag},distance:{uniforms:B([Z.common,Z.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:on.distance_vert,fragmentShader:on.distance_frag},shadow:{uniforms:B([Z.lights,Z.fog,{color:{value:new _(0)},opacity:{value:1}}]),vertexShader:on.shadow_vert,fragmentShader:on.shadow_frag}};sn.physical={uniforms:B([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new V},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new V},clearcoatNormalScale:{value:new Y(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new V},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new V},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new V},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new V},sheen:{value:0},sheenColor:{value:new _(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new V},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new V},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new V},transmissionSamplerSize:{value:new Y},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new V},attenuationDistance:{value:0},attenuationColor:{value:new _(0)},specularColor:{value:new _(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new V},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new V},anisotropyVector:{value:new Y},anisotropyMap:{value:null},anisotropyMapTransform:{value:new V}}]),vertexShader:on.meshphysical_vert,fragmentShader:on.meshphysical_frag};var cn={r:0,b:0,g:0},ln=new tt,un=new V;un.set(-1,0,0,0,1,0,0,0,1);function dn(e,t,n,r,i,o){let s=new _(0),c=i===!0?0:1,l,u,f=null,p=0,m=null;function g(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function v(t){let r=!1,i=g(t);i===null?S(s,c):i&&i.isColor&&(S(i,1),r=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?n.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,o),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function y(t,n){let i=g(n);i&&i.isCubeTexture?(u===void 0&&(u=new a(new d(1,1,1),new ht({name:`BackgroundCubeMaterial`,uniforms:ke(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ln.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(un),u.material.toneMapped=w.getTransfer(i.colorSpace)!==b,(f!==i||p!==i.version||m!==e.toneMapping)&&(u.material.needsUpdate=!0,f=i,p=i.version,m=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new a(new x(2,2),new ht({name:`BackgroundMaterial`,uniforms:ke(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=w.getTransfer(i.colorSpace)!==b,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(f!==i||p!==i.version||m!==e.toneMapping)&&(l.material.needsUpdate=!0,f=i,p=i.version,m=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function S(t,r){t.getRGB(cn,h(e)),n.buffers.color.setClear(cn.r,cn.g,cn.b,r,o)}function C(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,S(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,S(s,c)},render:v,addToRenderList:y,dispose:C}}function fn(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function pn(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function mn(e,t,n,r){let a;function o(){if(a!==void 0)return a;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);a=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function c(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let u=n.precision===void 0?`highp`:n.precision,d=l(u);d!==u&&(i(`WebGLRenderer:`,u,`not supported, using`,d,`instead.`),u=d);let f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=n.logarithmicDepthBuffer===!0&&f===!1;n.reversedDepthBuffer===!0&&f===!1&&i(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&f===!0&&i(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),v=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:c,precision:u,logarithmicDepthBuffer:p,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:S,samples:C}}function hn(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ye,s=new V,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var gn=class extends Ot{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new o(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new d(5,5,5),i=new ht({name:`CubemapFromEquirect`,uniforms:ke(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let o=new a(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=Pt),new oe(1,10,this).update(e,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},_n=256,vn=3,yn=20,bn=256,xn=16,Sn=3,Cn=new q,wn=new _,Tn=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new oe(1,10,null),this._boxMesh=new a(new d(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Cn}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(wn));let h=new oe(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mn(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jn(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(_n,jt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?_n:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=En(e,!1,!1),n=Math.log2(e)-vn;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=En(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mn()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=jn()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=On(),this._integrationMaterial=kn());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/xn);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Sn)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(bn*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=An());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function En(e,t,n){return new gn(e,{minFilter:le,generateMipmaps:t,type:xt,colorSpace:Mt,depthBuffer:n})}function Dn(e,t,n){return new ht({name:e,uniforms:t,vertexShader:on.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function On(){return Dn(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${bn}u

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
	`)}function kn(){return Dn(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:xn}},`

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
	`)}function An(){return Dn(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${yn}
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
	`)}function jn(){return Dn(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

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
	`)}function Mn(){return Dn(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Nn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new gn(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Tn(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Tn(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Pn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ze(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Fn(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?qe:vt)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function In(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ln(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:l(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Rn(e,t,n){let r=new WeakMap,i=new He;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new pe(h,p,m,u);g.type=Ct,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Y(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function zn(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Bn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Vn(e,t,n,r,i,o){let s=new Ot(t,n,{type:e,depthBuffer:i,stencilBuffer:o,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,l=null,u=null,d=new $e;d.setAttribute(`position`,new Re([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute(`uv`,new Re([0,2,0,0,2,0],2));let f=new I({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new a(d,f),m=new ge(-1,1,1,-1,0,1),h=null,g=null,_=!1,v,y=null,b=[],x=!1;this.setSize=function(e,t){s.setSize(e,t),c!==null&&c.setSize(e,t),l!==null&&l.setSize(e,t);for(let n=0;n<b.length;n++){let r=b[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){b=e,x=b.length>0&&b[0].isRenderPass===!0;let t=s.width,n=s.height;b.length>0&&c===null&&(c=new Ot(t,n,{type:xt,depthBuffer:!1,stencilBuffer:!1}),l=new Ot(t,n,{type:xt,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&b.some(e=>e.needsDepthTexture===!0);r!==(s.depthTexture!==null)&&(r===!0&&u===null&&(u=new mt(t,n),o===!0&&(u.format=k,u.type=je)),s.dispose(),s.depthTexture=r?u:null,s.resolveDepthBuffer=r,s.storeMultisampledDepthBuffer=r);for(let e=0;e<b.length;e++){let i=b[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(u)}},this.begin=function(e,t){if(_||e.toneMapping===0&&b.length===0)return!1;if(y=t,t!==null){let e=t.width,n=t.height;(s.width!==e||s.height!==n)&&this.setSize(e,n)}return x===!1&&e.setRenderTarget(s),v=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return x},this.end=function(e,t){e.toneMapping=v,_=!0;let n=s,r=c;for(let i=0;i<b.length;i++){let a=b[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===c?l:c))}if(h!==e.outputColorSpace||g!==e.toneMapping){h=e.outputColorSpace,g=e.toneMapping,f.defines={},w.getTransfer(h)===`srgb`&&(f.defines.SRGB_TRANSFER=``);let t=Bn[g];t&&(f.defines[t]=``),f.needsUpdate=!0}f.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(y),e.render(p,m),y=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),d.dispose(),f.dispose()}}var Hn=new St,Un=new mt(1,1),Wn=new Rt(1),Gn=new pe,Kn=new S,qn=new o,Jn=[],Yn=[],Xn=new Float32Array(16),Zn=new Float32Array(9),Qn=new Float32Array(4);function $n(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Jn[i];if(a===void 0&&(a=new Float32Array(i),Jn[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function er(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function tr(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function nr(e,t){let n=Yn[t];n===void 0&&(n=new Int32Array(t),Yn[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function rr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ir(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(er(n,t))return;e.uniform2fv(this.addr,t),tr(n,t)}}function ar(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(er(n,t))return;e.uniform3fv(this.addr,t),tr(n,t)}}function or(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(er(n,t))return;e.uniform4fv(this.addr,t),tr(n,t)}}function sr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(er(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),tr(n,t)}else{if(er(n,r))return;Qn.set(r),e.uniformMatrix2fv(this.addr,!1,Qn),tr(n,r)}}function cr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(er(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),tr(n,t)}else{if(er(n,r))return;Zn.set(r),e.uniformMatrix3fv(this.addr,!1,Zn),tr(n,r)}}function lr(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(er(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),tr(n,t)}else{if(er(n,r))return;Xn.set(r),e.uniformMatrix4fv(this.addr,!1,Xn),tr(n,r)}}function ur(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function dr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(er(n,t))return;e.uniform2iv(this.addr,t),tr(n,t)}}function fr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(er(n,t))return;e.uniform3iv(this.addr,t),tr(n,t)}}function pr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(er(n,t))return;e.uniform4iv(this.addr,t),tr(n,t)}}function mr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function hr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(er(n,t))return;e.uniform2uiv(this.addr,t),tr(n,t)}}function gr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(er(n,t))return;e.uniform3uiv(this.addr,t),tr(n,t)}}function _r(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(er(n,t))return;e.uniform4uiv(this.addr,t),tr(n,t)}}function vr(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function yr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?vr(Un):Hn,n.setTexture2D(t||a,i)}function br(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Kn,i)}function xr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?vr(Wn):qn,n.setTextureCube(t||a,i)}function Sr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Gn,i)}function Cr(e){switch(e){case 5126:return rr;case 35664:return ir;case 35665:return ar;case 35666:return or;case 35674:return sr;case 35675:return cr;case 35676:return lr;case 5124:case 35670:return ur;case 35667:case 35671:return dr;case 35668:case 35672:return fr;case 35669:case 35673:return pr;case 5125:return mr;case 36294:return hr;case 36295:return gr;case 36296:return _r;case 35678:case 36198:case 36298:case 36306:case 35682:return yr;case 35679:case 36299:case 36307:return br;case 35680:case 36300:case 36308:case 36293:return xr;case 36289:case 36303:case 36311:case 36292:return Sr}}function wr(e,t){e.uniform1fv(this.addr,t)}function Tr(e,t){let n=$n(t,this.size,2);e.uniform2fv(this.addr,n)}function Er(e,t){let n=$n(t,this.size,3);e.uniform3fv(this.addr,n)}function Dr(e,t){let n=$n(t,this.size,4);e.uniform4fv(this.addr,n)}function Or(e,t){let n=$n(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function kr(e,t){let n=$n(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ar(e,t){let n=$n(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function jr(e,t){e.uniform1iv(this.addr,t)}function Mr(e,t){e.uniform2iv(this.addr,t)}function Nr(e,t){e.uniform3iv(this.addr,t)}function Pr(e,t){e.uniform4iv(this.addr,t)}function Fr(e,t){e.uniform1uiv(this.addr,t)}function Ir(e,t){e.uniform2uiv(this.addr,t)}function Lr(e,t){e.uniform3uiv(this.addr,t)}function Rr(e,t){e.uniform4uiv(this.addr,t)}function zr(e,t,n){let r=this.cache,i=t.length,a=nr(n,i);er(r,a)||(e.uniform1iv(this.addr,a),tr(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?vr(Un):Hn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Br(e,t,n){let r=this.cache,i=t.length,a=nr(n,i);er(r,a)||(e.uniform1iv(this.addr,a),tr(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Kn,a[e])}function Vr(e,t,n){let r=this.cache,i=t.length,a=nr(n,i);er(r,a)||(e.uniform1iv(this.addr,a),tr(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?vr(Wn):qn;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Hr(e,t,n){let r=this.cache,i=t.length,a=nr(n,i);er(r,a)||(e.uniform1iv(this.addr,a),tr(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Gn,a[e])}function Ur(e){switch(e){case 5126:return wr;case 35664:return Tr;case 35665:return Er;case 35666:return Dr;case 35674:return Or;case 35675:return kr;case 35676:return Ar;case 5124:case 35670:return jr;case 35667:case 35671:return Mr;case 35668:case 35672:return Nr;case 35669:case 35673:return Pr;case 5125:return Fr;case 36294:return Ir;case 36295:return Lr;case 36296:return Rr;case 35678:case 36198:case 36298:case 36306:case 35682:return zr;case 35679:case 36299:case 36307:return Br;case 35680:case 36300:case 36308:case 36293:return Vr;case 36289:case 36303:case 36311:case 36292:return Hr}}var Wr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cr(t.type)}},Gr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ur(t.type)}},Kr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},qr=/(\w+)(\])?(\[|\.)?/g;function Jr(e,t){e.seq.push(t),e.map[t.id]=t}function Yr(e,t,n){let r=e.name,i=r.length;for(qr.lastIndex=0;;){let a=qr.exec(r),o=qr.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Jr(n,l===void 0?new Wr(s,e,t):new Gr(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Kr(s),Jr(n,e)),n=e}}}var Xr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Yr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Zr(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Qr=37297,$r=0;function ei(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var ti=new V;function ni(e){w._getMatrix(ti,w.workingColorSpace,e);let t=`mat3( ${ti.elements.map(e=>e.toFixed(4))} )`;switch(w.getTransfer(e)){case fe:return[t,`LinearTransferOETF`];case b:return[t,`sRGBTransferOETF`];default:return i(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ri(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ei(e.getShaderSource(t),r)}return i}function ii(e,t){let n=ni(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var ai={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function oi(e,t){let n=ai[t];return n===void 0?(i(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var si=new q;function ci(){return w.getLuminanceCoefficients(si),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${si.x.toFixed(4)}, ${si.y.toFixed(4)}, ${si.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function li(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(fi).join(`
`)}function ui(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function di(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function fi(e){return e!==``}function pi(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function mi(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var hi=/^[ \t]*#include +<([\w\d./]+)>/gm;function gi(e){return e.replace(hi,_i)}function _i(e,t){let n=on[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return gi(n)}var vi=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yi(e){return e.replace(vi,bi)}function bi(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function xi(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var Si={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ci(e){return Si[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var wi={302:`ENVMAP_MODE_REFRACTION`};function Ti(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:wi[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ei={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Di(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ei[e.combine]||`ENVMAP_BLENDING_NONE`}function Oi(e,t,n,r){let a=e.getContext(),o=n.defines,s=n.vertexShader,c=n.fragmentShader,u=Ci(n),d=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,f=Ti(n),p=Di(n),m=li(n),h=ui(o),g=a.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(fi).join(`
`),_.length>0&&(_+=`
`),v=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(fi).join(`
`),v.length>0&&(v+=`
`)):(_=[xi(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+f:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+u:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(fi).join(`
`),v=[xi(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+d:``,n.envMap?`#define `+f:``,n.envMap?`#define `+p:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+u:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:on.tonemapping_pars_fragment,n.toneMapping===0?``:oi(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,on.colorspace_pars_fragment,ii(`linearToOutputTexel`,n.outputColorSpace),ci(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(fi).join(`
`)),s=gi(s),s=pi(s,n),s=mi(s,n),c=gi(c),c=pi(c,n),c=mi(c,n),s=yi(s),c=yi(c),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+s,x=y+v+c,S=Zr(a,a.VERTEX_SHADER,b),C=Zr(a,a.FRAGMENT_SHADER,x);a.attachShader(g,S),a.attachShader(g,C),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&a.bindAttribLocation(g,0,`position`):a.bindAttribLocation(g,0,n.index0AttributeName),a.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=a.getProgramInfoLog(g)||``,r=a.getShaderInfoLog(S)||``,o=a.getShaderInfoLog(C)||``,s=n.trim(),c=r.trim(),u=o.trim(),d=!0,f=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1){if(d=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(a,g,S,C);else{let e=ri(a,S,`vertex`),n=ri(a,C,`fragment`);l(`WebGLProgram: Shader Error `+a.getError()+` - VALIDATE_STATUS `+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+s+`
`+e+`
`+n)}}else s===``?(c===``||u===``)&&(f=!1):i(`WebGLProgram: Program Info Log:`,s);f&&(t.diagnostics={runnable:d,programLog:s,vertexShader:{log:c,prefix:_},fragmentShader:{log:u,prefix:v}})}a.deleteShader(S),a.deleteShader(C),T=new Xr(a,g),E=di(a,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=a.getProgramParameter(g,Qr)),D},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=$r++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var ki=0,Ai=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ji(e),t.set(e,n)),n}},ji=class{constructor(e){this.id=ki++,this.code=e,this.usedTimes=0}};function Mi(e){return e===1030||e===37490||e===36285}function Ni(e,t,n,r,a,o){let s=new it,c=new Ai,l=new Set,u=[],d=new Map,f=r.logarithmicDepthBuffer,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return l.add(e),e===0?`uv`:`uv${e}`}function h(a,s,u,d,h,g){let _=d.fog,v=h.geometry,y=a.isMeshStandardMaterial||a.isMeshLambertMaterial||a.isMeshPhongMaterial?d.environment:null,b=a.isMeshStandardMaterial||a.isMeshLambertMaterial&&!a.envMap||a.isMeshPhongMaterial&&!a.envMap,x=t.get(a.envMap||y,b),S=p[a.type],C=r.precision;a.precision!==null&&(C=r.getMaxPrecision(a.precision),C!==a.precision&&i(`WebGLProgram.getParameters:`,a.precision,`not supported, using`,C,`instead.`));let T=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,E=T===void 0?0:T.length,D=0;v.morphAttributes.position!==void 0&&(D=1),v.morphAttributes.normal!==void 0&&(D=2),v.morphAttributes.color!==void 0&&(D=3);let O,k,A,j;if(S){let e=sn[S];O=e.vertexShader,k=e.fragmentShader}else{O=a.vertexShader,k=a.fragmentShader;let e=c.getVertexShaderStage(a),t=c.getFragmentShaderStage(a);c.update(a,e,t),A=e.id,j=t.id}let M=e.getRenderTarget(),N=e.state.buffers.depth.getReversed(),P=h.isInstancedMesh===!0,F=h.isBatchedMesh===!0,I=!!a.map,L=!!a.matcap,ee=!!x,R=ee&&x.isPMREMTexture===!0,te=!!a.aoMap,z=!!a.lightMap,B=!!a.bumpMap&&a.wireframe===!1,V=!!a.normalMap,H=!!a.displacementMap,ne=!!a.emissiveMap,re=!!a.metalnessMap,ie=!!a.roughnessMap,ae=a.anisotropy>0,oe=a.clearcoat>0,U=a.diffuseRoughness>0,se=a.dispersion>0,ce=a.retroreflectivity>0,le=a.iridescence>0,ue=a.sheen>0,de=a.transmission>0,fe=ae&&!!a.anisotropyMap,pe=oe&&!!a.clearcoatMap,me=oe&&!!a.clearcoatNormalMap,he=oe&&!!a.clearcoatRoughnessMap,ge=U&&!!a.diffuseRoughnessMap,_e=le&&!!a.iridescenceMap,ve=le&&!!a.iridescenceThicknessMap,ye=ue&&!!a.sheenColorMap,be=ue&&!!a.sheenRoughnessMap,xe=!!a.specularMap,Se=!!a.specularColorMap,W=!!a.specularIntensityMap,Ce=de&&!!a.transmissionMap,we=de&&!!a.thicknessMap,Te=!!a.gradientMap,Ee=!!a.alphaMap,G=a.alphaTest>0,De=!!a.alphaHash,Oe=!!a.extensions,ke=0;a.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(ke=e.toneMapping);let Ae=R?x.isCompressedCubeTexture?x.image[0].mipmaps:x.mipmaps:null,K={shaderID:S,shaderType:a.type,shaderName:a.name,vertexShader:O,fragmentShader:k,defines:a.defines,customVertexShaderID:A,customFragmentShaderID:j,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:C,batching:F,batchingColor:F&&h._colorsTexture!==null,instancing:P,instancingColor:P&&h.instanceColor!==null,instancingMorph:P&&h.morphTexture!==null,outputColorSpace:M===null?e.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:w.workingColorSpace,alphaToCoverage:!!a.alphaToCoverage,map:I,matcap:L,envMap:ee,envMapMode:ee&&x.mapping,envMapPMREM:R,envMapMaxLod:R?Ae.length-1:null,envMapSize:R?Ae[0].width:null,aoMap:te,lightMap:z,bumpMap:B,normalMap:V,displacementMap:H,emissiveMap:ne,normalMapObjectSpace:V&&a.normalMapType===1,normalMapTangentSpace:V&&a.normalMapType===0,packedNormalMap:V&&a.normalMapType===0&&Mi(a.normalMap.format),metalnessMap:re,roughnessMap:ie,anisotropy:ae,anisotropyMap:fe,clearcoat:oe,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:he,diffuseRoughness:U,diffuseRoughnessMap:ge,dispersion:se,retroreflection:ce,iridescence:le,iridescenceMap:_e,iridescenceThicknessMap:ve,sheen:ue,sheenColorMap:ye,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Se,specularIntensityMap:W,transmission:de,transmissionMap:Ce,thicknessMap:we,gradientMap:Te,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:Ee,alphaTest:G,alphaHash:De,combine:a.combine,mapUv:I&&m(a.map.channel),aoMapUv:te&&m(a.aoMap.channel),lightMapUv:z&&m(a.lightMap.channel),bumpMapUv:B&&m(a.bumpMap.channel),normalMapUv:V&&m(a.normalMap.channel),displacementMapUv:H&&m(a.displacementMap.channel),emissiveMapUv:ne&&m(a.emissiveMap.channel),metalnessMapUv:re&&m(a.metalnessMap.channel),roughnessMapUv:ie&&m(a.roughnessMap.channel),anisotropyMapUv:fe&&m(a.anisotropyMap.channel),clearcoatMapUv:pe&&m(a.clearcoatMap.channel),clearcoatNormalMapUv:me&&m(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&m(a.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ge&&m(a.diffuseRoughnessMap.channel),iridescenceMapUv:_e&&m(a.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(a.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&m(a.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(a.sheenRoughnessMap.channel),specularMapUv:xe&&m(a.specularMap.channel),specularColorMapUv:Se&&m(a.specularColorMap.channel),specularIntensityMapUv:W&&m(a.specularIntensityMap.channel),transmissionMapUv:Ce&&m(a.transmissionMap.channel),thicknessMapUv:we&&m(a.thicknessMap.channel),alphaMapUv:Ee&&m(a.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(V||ae),vertexNormals:!!v.attributes.normal,vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(I||Ee),fog:!!_,useFog:a.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:a.wireframe===!1&&(a.flatShading===!0||v.attributes.normal===void 0&&V===!1&&(a.isMeshLambertMaterial||a.isMeshPhongMaterial||a.isMeshStandardMaterial||a.isMeshPhysicalMaterial)),sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:N,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:s.sun.length,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numSunLightShadows:s.sunShadowMap.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numLightProbeGrids:g.filter(e=>e.texture!==null).length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,decodeVideoTexture:I&&a.map.isVideoTexture===!0&&w.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ne&&a.emissiveMap.isVideoTexture===!0&&w.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:Oe&&a.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Oe&&a.extensions.multiDraw===!0||F)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return K.vertexUv1s=l.has(1),K.vertexUv2s=l.has(2),K.vertexUv3s=l.has(3),l.clear(),K}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){s.disableAll(),t.instancing&&s.enable(0),t.instancingColor&&s.enable(1),t.instancingMorph&&s.enable(2),t.matcap&&s.enable(3),t.envMap&&s.enable(4),t.normalMapObjectSpace&&s.enable(5),t.normalMapTangentSpace&&s.enable(6),t.clearcoat&&s.enable(7),t.iridescence&&s.enable(8),t.alphaTest&&s.enable(9),t.vertexColors&&s.enable(10),t.vertexAlphas&&s.enable(11),t.vertexUv1s&&s.enable(12),t.vertexUv2s&&s.enable(13),t.vertexUv3s&&s.enable(14),t.vertexTangents&&s.enable(15),t.anisotropy&&s.enable(16),t.alphaHash&&s.enable(17),t.batching&&s.enable(18),t.dispersion&&s.enable(19),t.retroreflection&&s.enable(24),t.diffuseRoughness&&s.enable(25),t.batchingColor&&s.enable(20),t.gradientMap&&s.enable(21),t.packedNormalMap&&s.enable(22),t.vertexNormals&&s.enable(23),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),t.numLightProbeGrids>0&&s.enable(22),t.hasPositionAttribute&&s.enable(23),e.push(s.mask)}function y(e){let t=p[e.type],n;if(t){let e=sn[t];n=Oe.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=d.get(n);return r===void 0?(r=new Oi(e,n,t,a),u.push(r),d.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),d.delete(e.cacheKey),e.destroy()}}function S(e){c.remove(e)}function C(){c.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:u,dispose:C}}function Pi(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Fi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ii(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Li(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Fi),r.length>1&&r.sort(t||Ii),i.length>1&&i.sort(t||Ii)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ri(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Li,e.set(t,[i])):n>=r.length?(i=new Li,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function zi(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new q,color:new _};break;case`SpotLight`:n={position:new q,direction:new q,color:new _,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new q,color:new _,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new q,skyColor:new _,groundColor:new _};break;case`RectAreaLight`:n={color:new _,position:new q,halfWidth:new q,halfHeight:new q}}return e[t.id]=n,n}}}function Bi(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Vi=0;function Hi(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ui(e){let t=new zi,n=Bi(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new q);let i=new q,a=new tt,o=new tt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Hi);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Vi++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Wi(e){let t=new Ui(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Gi(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Wi(e),t.set(n,[a])):r>=i.length?(a=new Wi(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ki=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qi=`uniform sampler2D shadow_pass;
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
}`,Ji=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],Yi=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],Xi=new tt,Zi=new q,Qi=new q;function $i(e,t,n){let o=new yt,s=new Y,c=new Y,l=new He,u=new L,d=new te,f={},p=n.maxTextureSize,m={0:1,1:0,2:2},h=new ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y},radius:{value:4}},vertexShader:Ki,fragmentShader:qi}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let _=new $e;_.setAttribute(`position`,new z(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new a(_,h),b=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let x=this.type;this.render=function(t,n,a){if(b.enabled===!1||b.autoUpdate===!1&&b.needsUpdate===!1||t.length===0)return;this.type===2&&(i(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=x!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],f=d.shadow;if(f===void 0){i(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;s.copy(f.mapSize);let g=f.getFrameExtents();s.multiply(g),c.copy(f.mapSize),(s.x>p||s.y>p)&&(s.x>p&&(c.x=Math.floor(p/g.x),s.x=c.x*g.x,f.mapSize.x=c.x),s.y>p&&(c.y=Math.floor(p/g.y),s.y=c.y*g.y,f.mapSize.y=c.y));let _=e.state.buffers.depth.getReversed();if(f.camera._reversedDepth=_,f.map===null||h===!0){if(f.map!==null&&(f.map.depthTexture!==null&&(f.map.depthTexture.dispose(),f.map.depthTexture=null),f.map.dispose()),this.type===3){if(d.isPointLight){i(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}f.map=new Ot(s.x,s.y,{format:r,type:xt,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),f.map.texture.name=d.name+`.shadowMap`,f.map.depthTexture=new mt(s.x,s.y,Ct),f.map.depthTexture.name=d.name+`.shadowMapDepth`,f.map.depthTexture.format=y,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P,f.map.depthTexture.magFilter=P}else d.isPointLight?(f.map=new gn(s.x),f.map.depthTexture=new Rt(s.x,Tt)):(f.map=new Ot(s.x,s.y),f.map.depthTexture=new mt(s.x,s.y,Tt)),f.map.depthTexture.name=d.name+`.shadowMap`,f.map.depthTexture.format=y,this.type===1?(f.map.depthTexture.compareFunction=_?518:515,f.map.depthTexture.minFilter=Pt,f.map.depthTexture.magFilter=Pt):(f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P,f.map.depthTexture.magFilter=P);f.camera.updateProjectionMatrix()}f.map.isWebGLCubeRenderTarget!==!0&&(f.map.width!==s.x||f.map.height!==s.y)&&f.map.setSize(s.x,s.y);let v=f.map.isWebGLCubeRenderTarget?6:f.getViewportCount();d.isPointLight!==!0&&f.updateMatrices(d,a);let b=f.camera.layers.mask&4294967294?f.camera.layers:a.layers;for(let t=0;t<v;t++){let r=f.getCamera(t);if(d.isPointLight){let e=f.camera,n=f.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Zi.setFromMatrixPosition(d.matrixWorld),e.position.copy(Zi),Qi.copy(e.position),Qi.add(Ji[t]),e.up.copy(Yi[t]),e.lookAt(Qi),e.updateMatrixWorld(),n.makeTranslation(-Zi.x,-Zi.y,-Zi.z),Xi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),f._frustum.setFromProjectionMatrix(Xi,e.coordinateSystem,e.reversedDepth)}if(f.map.isWebGLCubeRenderTarget)e.setRenderTarget(f.map,t),e.clear();else{t===0&&(e.setRenderTarget(f.map),e.clear());let n=f.getViewport(t);l.set(c.x*n.x,c.y*n.y,c.x*n.z,c.y*n.w),m.viewport(l)}o=f.getFrustum(t),w(n,a,r,d,b,this.type)}f.isPointLightShadow!==!0&&this.type===3&&S(f,a),f.needsUpdate=!1}x=this.type,b.needsUpdate=!1,e.setRenderTarget(u,d,f)};function S(n,i){let a=t.update(v);h.defines.VSM_SAMPLES!==n.blurSamples&&(h.defines.VSM_SAMPLES=n.blurSamples,g.defines.VSM_SAMPLES=n.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ot(s.x,s.y,{format:r,type:xt}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),h.uniforms.shadow_pass.value=n.map.depthTexture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(i,null,a,h,v,null),g.uniforms.shadow_pass.value=n.mapPass.texture,g.uniforms.resolution.value.set(n.map.width,n.map.height),g.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(i,null,a,g,v,null)}function C(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?d:u,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=f[e];r===void 0&&(r={},f[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,T)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?m[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function w(n,r,i,a,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(o))){n.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse,n.matrixWorld);let o=t.update(n),s=n.material;if(Array.isArray(s)){let t=o.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=C(n,d,a,c);n.onBeforeShadow(e,n,r,i,o,t,u),e.renderBufferDirect(i,null,o,t,n,u),n.onAfterShadow(e,n,r,i,o,t,u)}}}else if(s.visible){let t=C(n,s,a,c);n.onBeforeShadow(e,n,r,i,o,t,null),e.renderBufferDirect(i,null,o,t,n,null),n.onAfterShadow(e,n,r,i,o,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)w(l[e],r,i,a,s,c)}function T(e){e.target.removeEventListener(`dispose`,T);for(let t in f){let n=f[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ea(e,t){function n(){let t=!1,n=new He,r=null,i=new He(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?re(e.DEPTH_TEST):ie(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=U[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?re(e.STENCIL_TEST):ie(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},u=new WeakMap,d={},f={},p={},m=new WeakMap,h=[],g=null,v=!1,y=null,b=null,x=null,S=null,C=null,w=null,T=null,E=new _(0,0,0),D=0,O=!1,k=null,A=null,j=null,M=null,N=null,P=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,I=0,L=e.getParameter(e.VERSION);L.indexOf(`WebGL`)===-1?L.indexOf(`OpenGL ES`)!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),F=I>=2):(I=parseFloat(/^WebGL (\d)/.exec(L)[1]),F=I>=1);let ee=null,R={},te=e.getParameter(e.SCISSOR_BOX),z=e.getParameter(e.VIEWPORT),B=new He().fromArray(te),V=new He().fromArray(z);function H(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ne={};ne[e.TEXTURE_2D]=H(e.TEXTURE_2D,e.TEXTURE_2D,1),ne[e.TEXTURE_CUBE_MAP]=H(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[e.TEXTURE_2D_ARRAY]=H(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ne[e.TEXTURE_3D]=H(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),re(e.DEPTH_TEST),o.setFunc(3),fe(!1),pe(1),re(e.CULL_FACE),ue(0);function re(t){d[t]!==!0&&(e.enable(t),d[t]=!0)}function ie(t){d[t]!==!1&&(e.disable(t),d[t]=!1)}function ae(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function oe(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function se(t){return g!==t&&(e.useProgram(t),g=t,!0)}let ce={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ce[103]=e.MIN,ce[104]=e.MAX;let le={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ue(t,n,r,i,a,o,s,c,u,d){if(t===0)v===!0&&(ie(e.BLEND),v=!1);else if(v===!1&&(re(e.BLEND),v=!0),t!==5){if(t!==y||d!==O){if((b!==100||C!==100)&&(e.blendEquation(e.FUNC_ADD),b=100,C=100),d)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:l(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:l(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:l(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:l(`WebGLState: Invalid blending: `,t)}x=null,S=null,w=null,T=null,E.set(0,0,0),D=0,y=t,O=d}}else a||=n,o||=r,s||=i,(n!==b||a!==C)&&(e.blendEquationSeparate(ce[n],ce[a]),b=n,C=a),(r!==x||i!==S||o!==w||s!==T)&&(e.blendFuncSeparate(le[r],le[i],le[o],le[s]),x=r,S=i,w=o,T=s),(c.equals(E)===!1||u!==D)&&(e.blendColor(c.r,c.g,c.b,u),E.copy(c),D=u),y=t,O=!1}function de(t,n){t.side===2?ie(e.CULL_FACE):re(e.CULL_FACE);let r=t.side===1;n&&(r=!r),fe(r),t.blending===1&&t.transparent===!1?ue(0):ue(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),he(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?re(e.SAMPLE_ALPHA_TO_COVERAGE):ie(e.SAMPLE_ALPHA_TO_COVERAGE)}function fe(t){k!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),k=t)}function pe(t){t===0?ie(e.CULL_FACE):(re(e.CULL_FACE),t!==A&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),A=t}function me(t){t!==j&&(F&&e.lineWidth(t),j=t)}function he(t,n,r){t?(re(e.POLYGON_OFFSET_FILL),(M!==n||N!==r)&&(M=n,N=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ie(e.POLYGON_OFFSET_FILL)}function ge(t){t?re(e.SCISSOR_TEST):ie(e.SCISSOR_TEST)}function _e(t){t===void 0&&(t=e.TEXTURE0+P-1),ee!==t&&(e.activeTexture(t),ee=t)}function ve(t,n,r){r===void 0&&(r=ee===null?e.TEXTURE0+P-1:ee);let i=R[r];i===void 0&&(i={type:void 0,texture:void 0},R[r]=i),(i.type!==t||i.texture!==n)&&(ee!==r&&(e.activeTexture(r),ee=r),e.bindTexture(t,n||ne[t]),i.type=t,i.texture=n)}function ye(){let t=R[ee];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function be(){try{e.compressedTexImage2D(...arguments)}catch(e){l(`WebGLState:`,e)}}function xe(){try{e.compressedTexImage3D(...arguments)}catch(e){l(`WebGLState:`,e)}}function Se(){try{e.texSubImage2D(...arguments)}catch(e){l(`WebGLState:`,e)}}function W(){try{e.texSubImage3D(...arguments)}catch(e){l(`WebGLState:`,e)}}function Ce(){try{e.compressedTexSubImage2D(...arguments)}catch(e){l(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage3D(...arguments)}catch(e){l(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){l(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){l(`WebGLState:`,e)}}function G(){try{e.texImage2D(...arguments)}catch(e){l(`WebGLState:`,e)}}function De(){try{e.texImage3D(...arguments)}catch(e){l(`WebGLState:`,e)}}function Oe(t){return f[t]===void 0?e.getParameter(t):f[t]}function ke(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function Ae(t){B.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),B.copy(t))}function K(t){V.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),V.copy(t))}function je(t,n){let r=u.get(n);r===void 0&&(r=new WeakMap,u.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Me(t,n,r){let i=u.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Ne(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},ee=null,R={},p={},c={},m=new WeakMap,h=[],g=null,v=!1,y=null,b=null,x=null,S=null,C=null,w=null,T=null,E=new _(0,0,0),D=0,O=!1,k=null,A=null,j=null,M=null,N=null,B.set(0,0,e.canvas.width,e.canvas.height),V.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:re,disable:ie,bindFramebuffer:ae,drawBuffers:oe,useProgram:se,setBlending:ue,setMaterial:de,setFlipSided:fe,setCullFace:pe,setLineWidth:me,setPolygonOffset:he,setScissorTest:ge,activeTexture:_e,bindTexture:ve,unbindTexture:ye,compressedTexImage2D:be,compressedTexImage3D:xe,texImage2D:G,texImage3D:De,pixelStorei:ke,getParameter:Oe,updateUBOMapping:je,uniformBlockBinding:Me,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:Se,texSubImage3D:W,compressedTexSubImage2D:Ce,compressedTexSubImage3D:we,scissor:Ae,viewport:K,reset:Ne}}function ta(e,t,n,r,a,o,s){let c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,d=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Y,p=new WeakMap,m=new Set,h,g=new WeakMap,_=new Set,v=new FinalizationRegistry(e=>_.delete(e)),y=!1;try{y=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function b(e,t){return y?new OffscreenCanvas(e,t):ce(`canvas`)}function x(e,t,n){let r=1,a=Pe(e);if((a.width>n||a.height>n)&&(r=n/Math.max(a.width,a.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*a.width),o=Math.floor(r*a.height);h===void 0&&(h=b(n,o));let s=t?b(n,o):h;return s.width=n,s.height=o,s.getContext(`2d`).drawImage(e,0,0,n,o),i(`WebGLRenderer: Texture has been resized from (`+a.width+`x`+a.height+`) to (`+n+`x`+o+`).`),s}return`data`in e&&i(`WebGLRenderer: Image in DataTexture is too big (`+a.width+`x`+a.height+`).`),e}return e}function S(e){return e.generateMipmaps}function C(t){e.generateMipmap(t)}function T(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function D(n,r,a,o,s,c=!1){if(n!==null){if(e[n]!==void 0)return e[n];i(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let l;o&&(l=t.get(`EXT_texture_norm16`),l||i(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let u=r;if(r===e.RED&&(a===e.FLOAT&&(u=e.R32F),a===e.HALF_FLOAT&&(u=e.R16F),a===e.UNSIGNED_BYTE&&(u=e.R8),a===e.UNSIGNED_SHORT&&l&&(u=l.R16_EXT),a===e.SHORT&&l&&(u=l.R16_SNORM_EXT)),r===e.RED_INTEGER&&(a===e.UNSIGNED_BYTE&&(u=e.R8UI),a===e.UNSIGNED_SHORT&&(u=e.R16UI),a===e.UNSIGNED_INT&&(u=e.R32UI),a===e.BYTE&&(u=e.R8I),a===e.SHORT&&(u=e.R16I),a===e.INT&&(u=e.R32I)),r===e.RG&&(a===e.FLOAT&&(u=e.RG32F),a===e.HALF_FLOAT&&(u=e.RG16F),a===e.UNSIGNED_BYTE&&(u=e.RG8),a===e.UNSIGNED_SHORT&&l&&(u=l.RG16_EXT),a===e.SHORT&&l&&(u=l.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(a===e.UNSIGNED_BYTE&&(u=e.RG8UI),a===e.UNSIGNED_SHORT&&(u=e.RG16UI),a===e.UNSIGNED_INT&&(u=e.RG32UI),a===e.BYTE&&(u=e.RG8I),a===e.SHORT&&(u=e.RG16I),a===e.INT&&(u=e.RG32I)),r===e.RGB_INTEGER&&(a===e.UNSIGNED_BYTE&&(u=e.RGB8UI),a===e.UNSIGNED_SHORT&&(u=e.RGB16UI),a===e.UNSIGNED_INT&&(u=e.RGB32UI),a===e.BYTE&&(u=e.RGB8I),a===e.SHORT&&(u=e.RGB16I),a===e.INT&&(u=e.RGB32I)),r===e.RGBA_INTEGER&&(a===e.UNSIGNED_BYTE&&(u=e.RGBA8UI),a===e.UNSIGNED_SHORT&&(u=e.RGBA16UI),a===e.UNSIGNED_INT&&(u=e.RGBA32UI),a===e.BYTE&&(u=e.RGBA8I),a===e.SHORT&&(u=e.RGBA16I),a===e.INT&&(u=e.RGBA32I)),r===e.RGB&&(a===e.UNSIGNED_SHORT&&l&&(u=l.RGB16_EXT),a===e.SHORT&&l&&(u=l.RGB16_SNORM_EXT),a===e.UNSIGNED_INT_5_9_9_9_REV&&(u=e.RGB9_E5),a===e.UNSIGNED_INT_10F_11F_11F_REV&&(u=e.R11F_G11F_B10F)),r===e.RGBA){let t=c?fe:w.getTransfer(s);a===e.FLOAT&&(u=e.RGBA32F),a===e.HALF_FLOAT&&(u=e.RGBA16F),a===e.UNSIGNED_BYTE&&(u=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),a===e.UNSIGNED_SHORT&&l&&(u=l.RGBA16_EXT),a===e.SHORT&&l&&(u=l.RGBA16_SNORM_EXT),a===e.UNSIGNED_SHORT_4_4_4_4&&(u=e.RGBA4),a===e.UNSIGNED_SHORT_5_5_5_1&&(u=e.RGB5_A1)}return(u===e.R16F||u===e.R32F||u===e.RG16F||u===e.RG32F||u===e.RGBA16F||u===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),u}function O(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,i(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function A(e,t){return S(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function j(e){let t=new WeakRef(e);r.get(e).__ref=t,_.add(t),v.register(e,t,t)}function M(e){let t=r.get(e).__ref;t!==void 0&&(_.delete(t),v.unregister(t))}function F(e){L(e.target)}function I(e){ee(e.target)}function L(e){e.removeEventListener(`dispose`,F),M(e),te(e),e.isVideoTexture&&p.delete(e),e.isHTMLTexture&&m.delete(e)}function ee(e){e.removeEventListener(`dispose`,I),M(e),B(e)}function R(){for(let e of _){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ee(t):L(t))}_.clear(),m.clear()}function te(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=g.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&z(e),Object.keys(i).length===0&&g.delete(n)}r.remove(e)}function z(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=g.get(i);delete a[n.__cacheKey],s.memory.textures--}function B(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&L(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),r.remove(a[t])}r.remove(t)}let V=0;function ne(){V=0}function re(){return V}function ie(e){V=e}function ae(){let e=V;return e>=a.maxTextures&&i(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+a.maxTextures),V+=1,e}function oe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function U(t,a){let o=r.get(t);if(t.isVideoTexture&&Me(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&o.__version!==t.version){let e=t.image;if(e===null)i(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)i(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Se(o,t,a);return}}else t.isExternalTexture&&(o.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,o.__webglTexture,e.TEXTURE0+a)}function ue(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Se(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function pe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Se(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?W(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let he={[N]:e.REPEAT,[H]:e.CLAMP_TO_EDGE,[E]:e.MIRRORED_REPEAT},ge={[P]:e.NEAREST,[Bt]:e.NEAREST_MIPMAP_NEAREST,[se]:e.NEAREST_MIPMAP_LINEAR,[Pt]:e.LINEAR,[u]:e.LINEAR_MIPMAP_NEAREST,[le]:e.LINEAR_MIPMAP_LINEAR},_e={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ve(n,o){if(o.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(o.magFilter===1006||o.magFilter===1007||o.magFilter===1005||o.magFilter===1008||o.minFilter===1006||o.minFilter===1007||o.minFilter===1005||o.minFilter===1008)&&i(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,he[o.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,he[o.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,he[o.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ge[o.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ge[o.minFilter]),o.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,_e[o.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(o.magFilter===1003||o.minFilter!==1005&&o.minFilter!==1008||o.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(o.anisotropy>1||r.get(o).__currentAnisotropy){let i=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,a.getMaxAnisotropy())),r.get(o).__currentAnisotropy=o.anisotropy}}}function ye(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,F),j(n));let i=n.source,a=g.get(i);a===void 0&&(a={},g.set(i,a));let o=oe(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&z(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function be(e,t,n){return Math.floor(Math.floor(e/n)/t)}function xe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=be(n.start,r.width,4),c=be(t.start,r.width,4);n.start<=i+1&&a===c&&be(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function Se(t,s,c){let l=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(l=e.TEXTURE_3D);let u=ye(t,s),d=s.source;n.bindTexture(l,t.__webglTexture,e.TEXTURE0+c);let f=r.get(d);if(d.version!==f.__version||u===!0){if(n.activeTexture(e.TEXTURE0+c),!(typeof ImageBitmap<`u`&&s.image instanceof ImageBitmap)){let t=w.getPrimaries(w.workingColorSpace),r=s.colorSpace===``?null:w.getPrimaries(s.colorSpace),i=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let t=x(s.image,!1,a.maxTextureSize);t=Ne(s,t);let r=o.convert(s.format,s.colorSpace),p=o.convert(s.type),h=D(s.internalFormat,r,p,s.normalized,s.colorSpace,s.isVideoTexture);ve(l,s);let g,_=s.mipmaps,v=s.isVideoTexture!==!0,y=f.__version===void 0||u===!0,b=d.dataReady,T=A(s,t);if(s.isDepthTexture)h=O(s.format===k,s.type),y&&(v?n.texStorage2D(e.TEXTURE_2D,1,h,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,null));else if(s.isDataTexture){if(_.length>0){v&&y&&n.texStorage2D(e.TEXTURE_2D,T,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data);s.generateMipmaps=!1}else v?(y&&n.texStorage2D(e.TEXTURE_2D,T,h,t.width,t.height),b&&xe(s,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,t.data)}else if(s.isCompressedTexture){if(s.isCompressedArrayTexture){v&&y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,T,h,_[0].width,_[0].height,t.depth);for(let a=0,o=_.length;a<o;a++)if(g=_[a],s.format!==1023){if(r!==null){if(v){if(b){if(s.layerUpdates.size>0){let t=de(g.width,g.height,s.format,s.type);for(let i of s.layerUpdates){let o=g.data.subarray(i*t/g.data.BYTES_PER_ELEMENT,(i+1)*t/g.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,i,g.width,g.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,g.width,g.height,t.depth,r,g.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,a,h,g.width,g.height,t.depth,0,g.data,0,0)}else i(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?b&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,g.width,g.height,t.depth,r,p,g.data):n.texImage3D(e.TEXTURE_2D_ARRAY,a,h,g.width,g.height,t.depth,0,r,p,g.data);s.layerUpdates.size>0&&s.clearLayerUpdates()}else{v&&y&&n.texStorage2D(e.TEXTURE_2D,T,h,_[0].width,_[0].height);for(let t=0,a=_.length;t<a;t++)g=_[t],s.format===1023?v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data):r===null?i(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?b&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,g.data):n.compressedTexImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,g.data)}}else if(s.isDataArrayTexture){if(v){if(y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,T,h,t.width,t.height,t.depth),b){if(s.layerUpdates.size>0){let i=de(t.width,t.height,s.format,s.type);for(let a of s.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}s.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,h,t.width,t.height,t.depth,0,r,p,t.data)}else if(s.isData3DTexture)v?(y&&n.texStorage3D(e.TEXTURE_3D,T,h,t.width,t.height,t.depth),b&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,h,t.width,t.height,t.depth,0,r,p,t.data);else if(s.isFramebufferTexture){if(y){if(v)n.texStorage2D(e.TEXTURE_2D,T,h,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<T;t++)n.texImage2D(e.TEXTURE_2D,t,h,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(s.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),m.add(s),n.onpaint=e=>{let t=e.changedElements;for(let e of m)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(v&&y){let t=Pe(_[0]);n.texStorage2D(e.TEXTURE_2D,T,h,t.width,t.height)}for(let t=0,i=_.length;t<i;t++)g=_[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,g):n.texImage2D(e.TEXTURE_2D,t,h,r,p,g);s.generateMipmaps=!1}else if(v){if(y){let r=Pe(t);n.texStorage2D(e.TEXTURE_2D,T,h,r.width,r.height)}b&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,h,r,p,t);S(s)&&s.mipmapsAutoUpdate===!0&&C(l),f.__version=d.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function W(t,s,c){if(s.image.length!==6)return;let l=ye(t,s),u=s.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+c);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+c);let t=w.getPrimaries(w.workingColorSpace),r=s.colorSpace===``?null:w.getPrimaries(s.colorSpace),f=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=s.isCompressedTexture||s.image[0].isCompressedTexture,m=s.image[0]&&s.image[0].isDataTexture,h=[];for(let e=0;e<6;e++)!p&&!m?h[e]=x(s.image[e],!0,a.maxCubemapSize):h[e]=m?s.image[e].image:s.image[e],h[e]=Ne(s,h[e]);let g=h[0],_=o.convert(s.format,s.colorSpace),v=o.convert(s.type),y=D(s.internalFormat,_,v,s.normalized,s.colorSpace),b=s.isVideoTexture!==!0,T=d.__version===void 0||l===!0,E=u.dataReady,j=A(s,g);ve(e.TEXTURE_CUBE_MAP,s);let M;if(s.isDepthTexture){if(y=O(s.format===k,s.type),T){if(b)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,y,g.width,g.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,g.width,g.height,0,_,v,null)}}else if(p){b&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,j,y,g.width,g.height);for(let t=0;t<6;t++){M=h[t].mipmaps;for(let r=0;r<M.length;r++){let a=M[r];s.format===1023?b?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,_,v,a.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,a.width,a.height,0,_,v,a.data):_===null?i(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):b?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,_,a.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,a.width,a.height,0,a.data)}}}else{if(M=s.mipmaps,b&&T){M.length>0&&j++;let t=Pe(h[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,j,y,t.width,t.height)}for(let t=0;t<6;t++)if(m){b?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,h[t].width,h[t].height,_,v,h[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h[t].width,h[t].height,0,_,v,h[t].data);for(let r=0;r<M.length;r++){let i=M[r].image[t].image;b?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,_,v,i.data)}}else{b?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,v,h[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,_,v,h[t]);for(let r=0;r<M.length;r++){let i=M[r];b?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,_,v,i.image[t])}}}S(s)&&s.mipmapsAutoUpdate===!0&&C(e.TEXTURE_CUBE_MAP),d.__version=u.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function Ce(t,i,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=D(a.internalFormat,d,f,a.normalized,a.colorSpace),m=r.get(i),h=r.get(a);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),je(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,h.__webglTexture,0,K(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=O(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;je(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,K(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,K(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=D(a.internalFormat,s,l,a.normalized,a.colorSpace);je(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,K(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,K(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Te(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let s=r.get(i.depthTexture);s.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;s.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?me(i.depthTexture,0):U(i.depthTexture,0);let u=s.__webglTexture,d=K(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)je(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)je(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Te(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Te(i.__webglFramebuffer[0],t,0):Te(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),we(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),we(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function G(t,n,i){let a=r.get(t);n!==void 0&&Ce(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ee(t)}function De(t){let i=t.texture,a=r.get(t),c=r.get(i);t.addEventListener(`dispose`,I),j(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&je(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=D(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=K(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),we(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ve(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ce(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ce(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);S(i)?C(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,o=l.length;i<o;i++){let o=l[i],s=r.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),ve(c,o),Ce(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,c,0),S(o)&&C(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ve(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ce(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ce(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);S(i)?C(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Ee(t)}function Oe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(S(a)&&a.mipmapsAutoUpdate===!0){let t=T(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),C(t),n.unbindTexture()}}}let ke=[];function Ae(t){if(t.samples>0){if(je(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,l=r.get(t),u=i.length>1;if(u)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,l.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),u){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),d===!0&&(ke.length=0,ke.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&ke.push(c),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ke))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),u)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,l.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&d){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function K(e){return Math.min(a.maxSamples,e.samples)}function je(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Me(e){let t=s.render.frame;p.get(e)!==t&&(p.set(e,t),e.update())}function Ne(e,t){let n=e.colorSpace,r=e.format,a=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(w.getTransfer(n)===`srgb`?(r!==1023||a!==1009)&&i(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):l(`WebGLTextures: Unsupported texture color space:`,n)),t}function Pe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(f.width=e.naturalWidth||e.width,f.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(f.width=e.displayWidth,f.height=e.displayHeight):(f.width=e.width,f.height=e.height),f}this.allocateTextureUnit=ae,this.resetTextureUnits=ne,this.getTextureUnits=re,this.setTextureUnits=ie,this.setTexture2D=U,this.setTexture2DArray=ue,this.setTexture3D=pe,this.setTextureCube=me,this.rebindTextures=G,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=je,this.dispose=R}function na(e,t){function n(n,r=``){let i,a=w.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var ra=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ia=`
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

}`,aa=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ie(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ht({vertexShader:ra,fragmentShader:ia,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new a(new x(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oa=class extends Ce{constructor(e,t){super();let r=this,a=null,o=1,s=null,l=`local-floor`,u=1,d=null,f=null,p=null,m=null,h=null,g=null,_=typeof XRWebGLBinding<`u`,v=new aa,b={},x=t.getContextAttributes(),S=null,C=null,w=[],T=[],E=new Y,D=null,O=null,A=new me;A.viewport=new He;let j=new me;j.viewport=new He;let M=[A,j],N=new c,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=w[e];return t===void 0&&(t=new It,w[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=w[e];return t===void 0&&(t=new It,w[e]=t),t.getGripSpace()},this.getHand=function(e){let t=w[e];return t===void 0&&(t=new It,w[e]=t),t.getHandSpace()};function I(e){let t=T.indexOf(e.inputSource);if(t===-1)return;let n=w[t];n!==void 0&&(n.update(e.inputSource,e.frame,d||s),n.dispatchEvent({type:e.type,data:e.inputSource}))}function L(){a.removeEventListener(`select`,I),a.removeEventListener(`selectstart`,I),a.removeEventListener(`selectend`,I),a.removeEventListener(`squeeze`,I),a.removeEventListener(`squeezestart`,I),a.removeEventListener(`squeezeend`,I),a.removeEventListener(`end`,L),a.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<w.length;e++){let t=T[e];t!==null&&(T[e]=null,w[e].disconnect(t))}P=null,F=null,v.reset();for(let e in b)delete b[e];if(e.setRenderTarget(S),h=null,m=null,p=null,a=null,C=null,V.stop(),r.isPresenting=!1,e.setPixelRatio(D),e.setSize(E.width,E.height,!1),O!==null){let e=O.camera;e.fov=O.fov,e.zoom=O.zoom,e.updateProjectionMatrix(),O=null}r.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){o=e,r.isPresenting===!0&&i(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){l=e,r.isPresenting===!0&&i(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return d||s},this.setReferenceSpace=function(e){d=e},this.getBaseLayer=function(){return m===null?h:m},this.getBinding=function(){return p===null&&_&&(p=new XRWebGLBinding(a,t)),p},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(i){if(a=i,a!==null){if(S=e.getRenderTarget(),a.addEventListener(`select`,I),a.addEventListener(`selectstart`,I),a.addEventListener(`selectend`,I),a.addEventListener(`squeeze`,I),a.addEventListener(`squeezestart`,I),a.addEventListener(`squeezeend`,I),a.addEventListener(`end`,L),a.addEventListener(`inputsourceschange`,ee),x.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(E),_&&`createProjectionLayer`in XRWebGLBinding.prototype){let r=null,i=null,s=null;x.depth&&(s=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,r=x.stencil?k:y,i=x.stencil?je:Tt);let c={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:o};p=this.getBinding(),m=p.createProjectionLayer(c),a.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),C=new Ot(m.textureWidth,m.textureHeight,{format:n,type:lt,depthTexture:new mt(m.textureWidth,m.textureHeight,i,void 0,void 0,void 0,void 0,void 0,void 0,r),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}else{let r={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(a,t,r),a.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),C=new Ot(h.framebufferWidth,h.framebufferHeight,{format:n,type:lt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(u),d=null,s=await a.requestReferenceSpace(l),V.setContext(a),V.start(),r.isPresenting=!0,r.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=T.indexOf(n);r>=0&&(T[r]=null,w[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=T.indexOf(n);if(r===-1){for(let e=0;e<w.length;e++)if(e>=T.length){T.push(n),r=e;break}else if(T[e]===null){T[e]=n,r=e;break}if(r===-1)break}let i=w[r];i&&i.connect(n)}}function R(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(a===null)return;let t=e.near,n=e.far;v.texture!==null&&(v.depthNear>0&&(t=v.depthNear),v.depthFar>0&&(n=v.depthFar)),N.near=j.near=A.near=t,N.far=j.far=A.far=n,(P!==N.near||F!==N.far)&&(a.updateRenderState({depthNear:N.near,depthFar:N.far}),P=N.near,F=N.far),N.layers.mask=e.layers.mask|6,A.layers.mask=N.layers.mask&-5,j.layers.mask=N.layers.mask&-3;let r=e.parent,i=N.cameras;R(N,r);for(let e=0;e<i.length;e++)R(i[e],r);N.projectionMatrix.copy(A.projectionMatrix),N.projectionMatrixInverse.copy(A.projectionMatrixInverse),O===null&&e.isPerspectiveCamera&&(O={camera:e,fov:e.fov,zoom:e.zoom}),te(e,N,r)};function te(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=W*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(m!==null||h!==null)return u},this.setFoveation=function(e){u=e,m!==null&&(m.fixedFoveation=e),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=e)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(N)},this.getCameraTexture=function(e){return b[e]};let z=null;function B(t,n){if(f=n.getViewerPose(d||s),g=n,f!==null){let t=f.views;h!==null&&(e.setRenderTargetFramebuffer(C,h.framebuffer),e.setRenderTarget(C));let n=!1;t.length!==N.cameras.length&&(N.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(h!==null)a=h.getViewport(i);else{let t=p.getViewSubImage(m,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(C,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(C))}let o=M[r];o===void 0&&(o=new me,o.layers.enable(r),o.viewport=new He,M[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(N.matrix.copy(o.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),n===!0&&N.cameras.push(o)}let i=a.enabledFeatures;if(i&&i.includes(`depth-sensing`)&&a.depthUsage==`gpu-optimized`&&_){p=r.getBinding();let e=p.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&v.init(e,a.renderState)}if(i&&i.includes(`camera-access`)&&_){e.state.unbindTexture(),p=r.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=b[n];e||(e=new ie,b[n]=e);let t=p.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<w.length;e++){let t=T[e],r=w[e];t!==null&&r!==void 0&&r.update(t,n,d||s)}z&&z(t,n),n.detectedPlanes&&r.dispatchEvent({type:`planesdetected`,data:n}),g=null}let V=new rn;V.setAnimationLoop(B),this.setAnimationLoop=function(e){z=e},this.dispose=function(){}}},sa=new tt,ca=new V;ca.set(-1,0,0,0,1,0,0,0,1);function la(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,h(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),g(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(sa.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(ca),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function g(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function ua(e,t,n,r){let a={},o={};function s(e,t){let n=t.program;r.uniformBlockBinding(e,n,a[e.id])}function c(e,n){let i=a[e.id];i===void 0&&(h(e),i=l(e),a[e.id]=i,e.addEventListener(`dispose`,_));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;o[e.id]!==c&&(u(e),o[e.id]=c)}function l(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function u(t){let n=a[t.id],r=t.uniforms,i=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)d(t[n],e,n,i);else d(t,e,0,i)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(t,n,r,i){if(p(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=g(i,!0);f(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else f(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function f(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)m(i[n],e,n)===!0&&(t=!0);return t}return m(i,r,a)}function m(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function h(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=g(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function g(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?i(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):i(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function _(t){let n=t.target;n.removeEventListener(`dispose`,_),e.deleteBuffer(a[n.id]),delete a[n.id],delete o[n.id]}function v(){for(let t in a)e.deleteBuffer(a[t]);a={},o={}}return{bind:s,update:c,dispose:v}}var da=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),fa=null;function pa(){return fa===null&&(fa=new _e(da,16,16,r,xt),fa.name=`DFG_LUT`,fa.minFilter=Pt,fa.magFilter=Pt,fa.wrapS=H,fa.wrapT=H,fa.generateMipmaps=!1,fa.needsUpdate=!0),fa}var ma=class{constructor(e={}){let{canvas:t=Nt(),context:n=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:m=!1,outputBufferType:h=lt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);g=n.getContextAttributes().alpha}else g=o;let v=h,y=new Set([Ie,Xe,T]),b=new Set([lt,Tt,ft,je,Pe,Be]),x=new Uint32Array(4),S=new Int32Array(4),C={textures:[],min:[],max:[],resolution:[]},E=null,D=null,O=[],k=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,M=!1,N=null,P=null,F=null,I=null;this._outputColorSpace=ve;let L=0,ee=0,R=null,te=-1,z=null,B=new He,V=new He,H=null,ne=new _(0),re=0,ie=t.width,ae=t.height,oe=1,U=null,se=null,ce=new He(0,0,ie,ae),ue=new He(0,0,ie,ae),de=!1,fe=new yt,pe=new Je,me=!1,he=!1,ge=new tt,_e=new q,ye=new He,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},xe=!1;function Se(){return R===null?oe:1}let W=n;function Ce(e,n){return t.getContext(e,n)}let we,Te,G,De,Oe,ke,Ae,K,Me,Ne,Fe,Le,Re,ze,Ve,Ue,We,Ge,Ke,qe,Ye,Ze,Qe;try{let e={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,nt,!1),t.addEventListener(`webglcontextrestored`,rt,!1),t.addEventListener(`webglcontextcreationerror`,Y,!1),W===null){let t=`webgl2`;if(W=Ce(t,e),W===null)throw Ce(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}$e()}catch(e){throw t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,Y,!1),l(`WebGLRenderer: `+e.message),e}function $e(){we=new Pn(W),we.init(),Ye=new na(W,we),Te=new mn(W,we,e,Ye),G=new ea(W,we),Te.reversedDepthBuffer&&m&&G.buffers.depth.setReversed(!0),P=W.createFramebuffer(),F=W.createFramebuffer(),I=W.createFramebuffer(),De=new Ln(W),Oe=new Pi,ke=new ta(W,we,G,Oe,Te,Ye,De),Ae=new Nn(j),K=new an(W),Ze=new fn(W,K),Me=new Fn(W,K,De,Ze),Ne=new zn(W,Me,K,Ze,De),Ge=new Rn(W,Te,ke),Ve=new hn(Oe),Fe=new Ni(j,Ae,we,Te,Ze,Ve),Le=new la(j,Oe),Re=new Ri,ze=new Gi(we),We=new dn(j,Ae,G,Ne,g,c),Ue=new $i(j,Ne,Te),Qe=new ua(W,De,Te,G),Ke=new pn(W,we,De),qe=new In(W,we,De),De.programs=Fe.programs,j.capabilities=Te,j.extensions=we,j.properties=Oe,j.renderLists=Re,j.shadowMap=Ue,j.state=G,j.info=De}v!==1009&&(A=new Vn(v,t.width,t.height,s,r,a));let J=new oa(j,W);this.xr=J,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let e=we.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=we.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(e){e!==void 0&&(oe=e,this.setSize(ie,ae,!1))},this.getSize=function(e){return e.set(ie,ae)},this.setSize=function(e,n,r=!0){J.isPresenting?i(`WebGLRenderer: Can't change size while VR device is presenting.`):(ie=e,ae=n,t.width=Math.floor(e*oe),t.height=Math.floor(n*oe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ie*oe,ae*oe).floor()},this.setDrawingBufferSize=function(e,n,r){ie=e,ae=n,oe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(v===1009)l(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){i(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}A.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(B)},this.getViewport=function(e){return e.copy(ce)},this.setViewport=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),G.viewport(B.copy(ce).multiplyScalar(Se()).round())},this.getScissor=function(e){return e.copy(ue)},this.setScissor=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),G.scissor(V.copy(ue).multiplyScalar(Se()).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){G.setScissorTest(de=e)},this.setOpaqueSort=function(e){U=e},this.setTransparentSort=function(e){se=e},this.getClearColor=function(e){return e.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(R!==null){let t=R.texture.format;e=y.has(t)}if(e){let e=R.texture.type,t=b.has(e),n=We.getClearColor(),r=We.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(x[0]=i,x[1]=a,x[2]=o,x[3]=r,W.clearBufferuiv(W.COLOR,0,x)):(S[0]=i,S[1]=a,S[2]=o,S[3]=r,W.clearBufferiv(W.COLOR,0,S))}else r|=W.COLOR_BUFFER_BIT}t&&(r|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&W.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,Y,!1),We.dispose(),Re.dispose(),ze.dispose(),ke.dispose(),Oe.dispose(),Ae.dispose(),Ne.dispose(),Me.dispose(),Ze.dispose(),Qe.dispose(),Fe.dispose(),J.dispose(),J.removeEventListener(`sessionstart`,dt),J.removeEventListener(`sessionend`,pt),mt.stop()};function nt(e){e.preventDefault(),f(`WebGLRenderer: Context Lost.`),M=!0}function rt(){f(`WebGLRenderer: Context Restored.`),M=!1;let e=De.autoReset,t=Ue.enabled,n=Ue.autoUpdate,r=Ue.needsUpdate,i=Ue.type;$e(),De.autoReset=e,Ue.enabled=t,Ue.autoUpdate=n,Ue.needsUpdate=r,Ue.type=i}function Y(e){l(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function it(e){let t=e.target;t.removeEventListener(`dispose`,it),at(t)}function at(e){ot(e),Oe.remove(e)}function ot(e){let t=Oe.get(e).programs;t!==void 0&&(t.forEach(function(e){Fe.releaseProgram(e)}),e.isShaderMaterial&&Fe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=be);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=kt(e,t,n,r,i);G.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Me.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ze.setup(i,r,s,n,c);let h,g=Ke;if(c!==null&&(h=K.get(c),g=qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(G.setLineWidth(r.wireframeLinewidth*Se()),g.setMode(W.LINES)):g.setMode(W.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),G.setLineWidth(e*Se()),i.isLineSegments?g.setMode(W.LINES):i.isLineLoop?g.setMode(W.LINE_LOOP):g.setMode(W.LINE_STRIP)}else i.isPoints?g.setMode(W.POINTS):i.isSprite&&g.setMode(W.TRIANGLES);if(i.isBatchedMesh){if(we.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?K.get(c).bytesPerElement:1,o=Oe.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(W,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function st(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),me===!0&&Ve.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Ct(e,t,r),e.side=0,e.needsUpdate=!0,Ct(e,t,r),e.side=2):Ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),D=ze.get(n),D.init(t),k.push(D),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(D.pushLight(e),e.castShadow&&D.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(D.pushLight(e),e.castShadow&&D.pushShadow(e))}),D.setupLights(),N!==null&&N.updateLights(D.state.lightsArray),he=this.localClippingEnabled,me=Ve.init(this.clippingPlanes,he),me===!0&&Ve.setGlobalState(this.clippingPlanes,t),N!==null&&Ue.render(D.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];st(o,n,t,e),r.add(o)}else st(i,n,t,e),r.add(i)}}),D=k.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=Oe.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}we.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ct=null;function ut(e){ct&&ct(e)}function dt(){mt.stop()}function pt(){mt.start()}let mt=new rn;mt.setAnimationLoop(ut),typeof self<`u`&&mt.setContext(self),this.setAnimationLoop=function(e){ct=e,J.setAnimationLoop(e),e===null?mt.stop():mt.start()},J.addEventListener(`sessionstart`,dt),J.addEventListener(`sessionend`,pt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){l(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(M===!0)return;N!==null&&N.renderStart(e,t);let n=J.enabled===!0&&J.isPresenting===!0,r=A!==null&&(R===null||n)&&A.begin(j,R);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(J.cameraAutoUpdate===!0&&J.updateCamera(t),t=J.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,R),D=ze.get(e,k.length),D.init(t),D.state.textureUnits=ke.getTextureUnits(),k.push(D),ge.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?pe.setFromArrayCamera(t):fe.setFromProjectionMatrix(ge,Ee,t.reversedDepth),he=this.localClippingEnabled,me=Ve.init(this.clippingPlanes,he),E=Re.get(e,O.length),E.init(),O.push(E),this.info.render.frame++,J.enabled===!0&&J.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&ht(e,t,-1/0,j.sortObjects)}ht(e,t,0,j.sortObjects),E.finish(),N!==null&&N.updateLights(D.state.lightsArray),j.sortObjects===!0&&E.sort(U,se),xe=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,xe&&We.addToRenderList(E,e),this.info.autoReset===!0&&this.info.reset(),me===!0&&Ve.beginShadows();let i=D.state.shadowsArray;if(Ue.render(i,e,t),me===!0&&Ve.endShadows(),(r&&A.hasRenderPass())===!1){let n=E.opaque,r=E.transmissive;if(D.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];_t(n,r,e,a)}xe&&We.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];gt(E,e,n,n.viewport)}}else r.length>0&&_t(n,r,e,t),xe&&We.render(e),gt(E,e,t)}R!==null&&ee===0&&(ke.updateMultisampleRenderTarget(R),ke.updateRenderTargetMipmap(R)),r&&A.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),Ze.resetDefaultState(),te=-1,z=null,k.pop(),k.length>0?(D=k[k.length-1],ke.setTextureUnits(D.state.textureUnits),me===!0&&Ve.setGlobalState(j.clippingPlanes,D.state.camera)):D=null,O.pop(),E=O.length>0?O[O.length-1]:null,N!==null&&N.renderEnd()};function ht(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)D.pushLight(e),e.castShadow&&D.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?pe:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&ye.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ge);let i=Ne.update(e),a=e.material;a.visible&&E.push(e,i,a,n,ye.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?pe:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Ne.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ye.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ye.copy(e.boundingSphere.center)),ye.applyMatrix4(e.matrixWorld).applyMatrix4(ge)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&E.push(e,i,c,n,ye.z,s,t)}}else a.visible&&E.push(e,i,a,n,ye.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ht(i[e],t,n,r)}function gt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;D.setupLightsView(n),me===!0&&Ve.setGlobalState(j.clippingPlanes,n),r&&G.viewport(B.copy(r)),i.length>0&&vt(i,t,n),a.length>0&&vt(a,t,n),o.length>0&&vt(o,t,n),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function _t(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[r.id]===void 0){let e=we.has(`EXT_color_buffer_half_float`)||we.has(`EXT_color_buffer_float`);D.state.transmissionRenderTarget[r.id]=new Ot(1,1,{generateMipmaps:!0,type:e?xt:lt,minFilter:le,samples:Math.max(4,Te.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:w.workingColorSpace})}let i=D.state.transmissionRenderTarget[r.id],o=r.viewport||B;i.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),l=j.getActiveMipmapLevel();j.setRenderTarget(i),j.getClearColor(ne),re=j.getClearAlpha(),re<1&&j.setClearColor(16777215,.5),j.clear(),xe&&We.render(n);let u=j.toneMapping;j.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),D.setupLightsView(r),me===!0&&Ve.setGlobalState(j.clippingPlanes,r),vt(e,n,r),ke.updateMultisampleRenderTarget(i),ke.updateRenderTargetMipmap(i),we.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(ke.updateMultisampleRenderTarget(i),ke.updateRenderTargetMipmap(i))}j.setRenderTarget(s,c,l),j.setClearColor(ne,re),d!==void 0&&(r.viewport=d),j.toneMapping=u}function vt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function St(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Ct(e,t,n){t.isScene!==!0&&(t=be);let r=Oe.get(e),i=D.state.lights,a=D.state.shadowsArray,o=i.state.version,s=Fe.getParameters(e,i.state,a,t,n,D.state.lightProbeGridArray),c=Fe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ae.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,it),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=Fe.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,j),d=Fe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ve.uniform),Dt(e,s),r.needsLights=jt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=St(D.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function wt(e,t,n,r,i){let a=Oe.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Et(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Xr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=Oe.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function kt(e,t,n,r,i){t.isScene!==!0&&(t=be),ke.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=R===null?j.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:w.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ae.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=Oe.get(r),y=D.state.lights;if(me===!0&&(he===!0||e!==z)){let t=e===z&&r.id===te;Ve.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ve.numPlanes||v.numIntersection!==Ve.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===St(D.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;(b===!0||x===!0)&&(S=x===!0?wt(r,t,i,s,h):Ct(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,S,v));let T=!1,E=!1,O=!1,k=S.getUniforms(),A=v.uniforms;if(G.useProgram(S.program)&&(T=!0,E=!0,O=!0),r.id!==te&&(te=r.id,E=!0),T||z!==e){G.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),k.setValue(W,`projectionMatrix`,e.projectionMatrix),k.setValue(W,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(W,_e.setFromMatrixPosition(e.matrixWorld)),Te.logarithmicDepthBuffer&&k.setValue(W,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(W,`isOrthographic`,e.isOrthographicCamera===!0),z!==e&&(z=e,E=!0,O=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&k.setValue(W,`sunShadowMap`,y.state.sunShadowMap,ke),y.state.directionalShadowMap.length>0&&k.setValue(W,`directionalShadowMap`,y.state.directionalShadowMap,ke),y.state.spotShadowMap.length>0&&k.setValue(W,`spotShadowMap`,y.state.spotShadowMap,ke),y.state.pointShadowMap.length>0&&k.setValue(W,`pointShadowMap`,y.state.pointShadowMap,ke)),i.isSkinnedMesh){k.setOptional(W,i,`bindMatrix`),k.setOptional(W,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(W,`boneTexture`,e.boneTexture,ke))}i.isBatchedMesh&&(k.setOptional(W,i,`batchingTexture`),k.setValue(W,`batchingTexture`,i._matricesTexture,ke),k.setOptional(W,i,`batchingIdTexture`),k.setValue(W,`batchingIdTexture`,i._indirectTexture,ke),k.setOptional(W,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(W,`batchingColorTexture`,i._colorsTexture,ke));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Ge.update(i,n,S),(E||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,k.setValue(W,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(A.envMapIntensity.value=t.environmentIntensity),A.dfgLUT!==void 0&&(A.dfgLUT.value=pa()),E){if(k.setValue(W,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&At(A,O),a&&r.fog===!0&&Le.refreshFogUniforms(A,a),Le.refreshMaterialUniforms(A,r,oe,ae,D.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=C,t=0;for(let n of D.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;A.probesSH.value=e.textures,A.probesMin.value=e.min,A.probesMax.value=e.max,A.probesResolution.value=e.resolution}Xr.upload(W,Et(v),A,ke)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Xr.upload(W,Et(v),A,ke),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(W,`center`,i.center),k.setValue(W,`modelViewMatrix`,i.modelViewMatrix),k.setValue(W,`normalMatrix`,i.normalMatrix),k.setValue(W,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Qe.update(n,S),Qe.bind(n,S)}}return S}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function jt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(e,t,n){let r=Oe.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),Oe.get(e.texture).__webglTexture=t,Oe.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=Oe.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){R=e,L=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=Oe.get(e);if(o.__useDefaultFramebuffer!==void 0){G.bindFramebuffer(W.FRAMEBUFFER,o.__webglFramebuffer),B.copy(e.viewport),V.copy(e.scissor),H=e.scissorTest,G.viewport(B),G.scissor(V),G.setScissorTest(H),te=-1;return}if(o.__webglFramebuffer===void 0)ke.setupRenderTarget(e);else if(o.__hasExternalTextures)ke.rebindTextures(e,Oe.get(e.texture).__webglTexture,Oe.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&Oe.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);ke.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=Oe.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&ke.useMultisampledRTT(e)===!1?Oe.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,B.copy(e.viewport),V.copy(e.scissor),H=e.scissorTest}else B.copy(ce).multiplyScalar(oe).floor(),V.copy(ue).multiplyScalar(oe).floor(),H=de;if(n!==0&&(r=P),G.bindFramebuffer(W.FRAMEBUFFER,r)&&G.drawBuffers(e,r),G.viewport(B),G.scissor(V),G.setScissorTest(H),i){let r=Oe.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=Oe.get(e.textures[t]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=Oe.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,t.__webglTexture,n)}te=-1};function Mt(e){let t=Oe.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Te.textureFormatReadable(e.format),t.__typeReadable=Te.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){l(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=Oe.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){G.bindFramebuffer(W.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,u=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1){l(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(d.__typeReadable===!1){l(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&W.readPixels(t,n,r,i,Ye.convert(c),Ye.convert(u),a)}finally{let e=R===null?null:Oe.get(R).__webglFramebuffer;G.bindFramebuffer(W.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=Oe.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){G.bindFramebuffer(W.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.bufferData(W.PIXEL_PACK_BUFFER,a.byteLength,W.STREAM_READ),W.readPixels(t,n,r,i,Ye.convert(l),Ye.convert(u),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let p=R===null?null:Oe.get(R).__webglFramebuffer;G.bindFramebuffer(W.FRAMEBUFFER,p);let m=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await et(W,m,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,a),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(f),W.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;ke.setTexture2D(e,0),W.copyTexSubImage2D(W.TEXTURE_2D,n,0,0,o,s,i,a),G.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ye.convert(t.format),_=Ye.convert(t.type),v;t.isData3DTexture?(ke.setTexture3D(t,0),v=W.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(ke.setTexture2DArray(t,0),v=W.TEXTURE_2D_ARRAY):(ke.setTexture2D(t,0),v=W.TEXTURE_2D),G.activeTexture(W.TEXTURE0),G.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,t.flipY),G.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),G.pixelStorei(W.UNPACK_ALIGNMENT,t.unpackAlignment);let y=G.getParameter(W.UNPACK_ROW_LENGTH),b=G.getParameter(W.UNPACK_IMAGE_HEIGHT),x=G.getParameter(W.UNPACK_SKIP_PIXELS),S=G.getParameter(W.UNPACK_SKIP_ROWS),C=G.getParameter(W.UNPACK_SKIP_IMAGES);G.pixelStorei(W.UNPACK_ROW_LENGTH,h.width),G.pixelStorei(W.UNPACK_IMAGE_HEIGHT,h.height),G.pixelStorei(W.UNPACK_SKIP_PIXELS,l),G.pixelStorei(W.UNPACK_SKIP_ROWS,u),G.pixelStorei(W.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=Oe.get(e),r=Oe.get(t),h=Oe.get(n.__renderTarget),g=Oe.get(r.__renderTarget);G.bindFramebuffer(W.READ_FRAMEBUFFER,h.__webglFramebuffer),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Oe.get(e).__webglTexture,i,d+n),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Oe.get(t).__webglTexture,a,m+n)),W.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,W.DEPTH_BUFFER_BIT,W.NEAREST);G.bindFramebuffer(W.READ_FRAMEBUFFER,null),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||Oe.has(e)){let n=Oe.get(e),r=Oe.get(t);G.bindFramebuffer(W.READ_FRAMEBUFFER,F),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,I);for(let e=0;e<c;e++)w?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,n.__webglTexture,i),T?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,r.__webglTexture,a),i===0?T?W.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):W.copyTexSubImage2D(v,a,f,p,l,u,o,s):W.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,W.COLOR_BUFFER_BIT,W.NEAREST);G.bindFramebuffer(W.READ_FRAMEBUFFER,null),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?W.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h);G.pixelStorei(W.UNPACK_ROW_LENGTH,y),G.pixelStorei(W.UNPACK_IMAGE_HEIGHT,b),G.pixelStorei(W.UNPACK_SKIP_PIXELS,x),G.pixelStorei(W.UNPACK_SKIP_ROWS,S),G.pixelStorei(W.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&W.generateMipmap(v),G.unbindTexture()},this.initRenderTarget=function(e){Oe.get(e).__webglFramebuffer===void 0&&ke.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?ke.setTextureCube(e,0):e.isData3DTexture?ke.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ke.setTexture2DArray(e,0):ke.setTexture2D(e,0),G.unbindTexture()},this.resetState=function(){L=0,ee=0,R=null,G.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ee}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=w._getDrawingBufferColorSpace(e),t.unpackColorSpace=w._getUnpackColorSpace()}},ha={type:`change`},ga={type:`start`},_a={type:`end`},va=new R,ya=new ye,ba=Math.cos(70*p.DEG2RAD),xa=new q,Sa=2*Math.PI,Ca={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},wa=1e-6,Ta=class extends M{constructor(e,n=null){super(e,n),this.state=Ca.NONE,this.target=new q,this.cursor=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:g.ROTATE,MIDDLE:g.DOLLY,RIGHT:g.PAN},this.touches={ONE:Le.ROTATE,TWO:Le.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new q,this._lastQuaternion=new gt,this._lastTargetPosition=new q,this._quat=new gt().setFromUnitVectors(e.up,new q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new t,this._sphericalDelta=new t,this._scale=1,this._panOffset=new q,this._rotateStart=new Y,this._rotateEnd=new Y,this._rotateDelta=new Y,this._panStart=new Y,this._panEnd=new Y,this._panDelta=new Y,this._dollyStart=new Y,this._dollyEnd=new Y,this._dollyDelta=new Y,this._dollyDirection=new q,this._mouse=new Y,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Da.bind(this),this._onPointerDown=Ea.bind(this),this._onPointerUp=Oa.bind(this),this._onContextMenu=Fa.bind(this),this._onMouseWheel=ja.bind(this),this._onKeyDown=Ma.bind(this),this._onTouchStart=Na.bind(this),this._onTouchMove=Pa.bind(this),this._onMouseDown=ka.bind(this),this._onMouseMove=Aa.bind(this),this._interceptControlDown=Ia.bind(this),this._interceptControlUp=La.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=Ca.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ha),this.update(),this.state=Ca.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;xa.copy(t).sub(this.target),xa.applyQuaternion(this._quat),this._spherical.setFromVector3(xa),this.autoRotate&&this.state===Ca.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Sa:n>Math.PI&&(n-=Sa),r<-Math.PI?r+=Sa:r>Math.PI&&(r-=Sa),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(xa.setFromSpherical(this._spherical),xa.applyQuaternion(this._quatInverse),t.copy(this.target).add(xa),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=xa.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new q(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new q(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=xa.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(va.origin.copy(this.object.position),va.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(va.direction))<ba?this.object.lookAt(this.target):(ya.setFromNormalAndCoplanarPoint(this.object.up,this.target),va.intersectPlane(ya,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>wa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>wa||this._lastTargetPosition.distanceToSquared(this.target)>wa?(this.dispatchEvent(ha),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Sa/60/60*this.autoRotateSpeed:Sa/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){xa.setFromMatrixColumn(t,0),xa.multiplyScalar(-e),this._panOffset.add(xa)}_panUp(e,t){this.screenSpacePanning===!0?xa.setFromMatrixColumn(t,1):(xa.setFromMatrixColumn(t,0),xa.crossVectors(this.object.up,xa)),xa.multiplyScalar(e),this._panOffset.add(xa)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;xa.copy(r).sub(this.target);let i=xa.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sa*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sa*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sa*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sa*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Y,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ea(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),this._isTrackingPointer(e)||(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Da(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Oa(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(_a),this.state=Ca.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function ka(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case g.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Ca.DOLLY;break;case g.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Ca.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Ca.ROTATE}break;case g.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Ca.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Ca.PAN}break;default:this.state=Ca.NONE}this.state!==Ca.NONE&&this.dispatchEvent(ga)}function Aa(e){switch(this.state){case Ca.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Ca.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Ca.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function ja(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===Ca.NONE&&(e.preventDefault(),this.dispatchEvent(ga),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(_a))}function Ma(e){this.enabled!==!1&&this._handleKeyDown(e)}function Na(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Le.ROTATE:if(this.enableRotate===!1){this.state=Ca.NONE;break}this._handleTouchStartRotate(e),this.state=Ca.TOUCH_ROTATE;break;case Le.PAN:if(this.enablePan===!1){this.state=Ca.NONE;break}this._handleTouchStartPan(e),this.state=Ca.TOUCH_PAN;break;default:this.state=Ca.NONE}break;case 2:switch(this.touches.TWO){case Le.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Ca.TOUCH_DOLLY_PAN;break;case Le.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Ca.TOUCH_DOLLY_ROTATE;break;default:this.state=Ca.NONE}break;default:this.state=Ca.NONE}this.state!==Ca.NONE&&this.dispatchEvent(ga)}function Pa(e){switch(this._trackPointer(e),this.state){case Ca.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Ca.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Ca.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Ca.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Ca.NONE}}function Fa(e){this.enabled!==!1&&e.preventDefault()}function Ia(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function La(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Ra=Object.freeze({min:.38,max:9,default:1,mapEnter:.68,mapExit:.82,closeEnter:2.4,closeExit:2,follow:3.2,followExit:2,mapBlendStart:1,mapBlendEnd:.78,detailPrefetch:.35}),za=Ra.follow;function Ba(e,t=Ra.default){let n=typeof t==`number`&&Number.isFinite(t)?t:Ra.default,r=typeof e==`number`&&!Number.isNaN(e)?e:n;return Math.max(Ra.min,Math.min(Ra.max,r))}function Va(e,t=`world`){let n=Ba(e);return t===`map`&&n<Ra.mapExit?`map`:t===`close`&&n>Ra.closeExit?`close`:n<=Ra.mapEnter?`map`:n>=Ra.closeEnter?`close`:`world`}function Ha(e){let t=Ba(e),n=Math.max(0,Math.min(1,(Ra.mapBlendStart-t)/(Ra.mapBlendStart-Ra.mapBlendEnd)));return n*n*(3-2*n)}function Ua(e){return Ba(e)<Ra.followExit}function Wa({viewWidth:e,viewHeight:t,spanWidth:n,spanHeight:r,padding:i=.15,fallback:a=za}={}){if(![e,t,n,r].every(e=>typeof e==`number`&&Number.isFinite(e)&&e>0))return Ba(a);let o=1+2*(typeof i==`number`&&Number.isFinite(i)?Math.max(0,i):.15);return Ba(Math.min(e/(n*o),t/(r*o)),a)}function Ga(e,t,n,r=!1){if(r)return t;let i=Math.max(0,Number.isFinite(n)?n:0);if(!i||e===t)return e;let a=Math.log(e),o=Math.log(t),s=Math.abs(o-a),c=1.8,l=c/14,u=Math.max(0,(s-l)/c),d=i<=u?c*i:s-Math.min(s,l)*Math.exp(-14*(i-u)),f=Math.exp(a+Math.sign(o-a)*d);return Math.abs(f-t)<1e-6?t:f}var Ka=Object.freeze({railCore:3,cityReferenceRadius:16.5,trainWidth:6,trainLength:15}),qa=5.5,Ja=e=>(1.75+Math.max(1,Math.min(10,Math.round(Number(e)||1)))*.12)*Ka.cityReferenceRadius/2.5;function Ya(e=1){let t=Math.max(0,Math.min(1,(e-.5)/.3));return t*t*(3-2*t)}function Xa(e,t){let n=e.onBeforeCompile,r=e.customProgramCacheKey();return e.onBeforeCompile=(r,i)=>{n.call(e,r,i),r.uniforms.mapNetworkVisibility=t,r.fragmentShader=`uniform float mapNetworkVisibility;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (mapNetworkVisibility < 1.0) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (mapNetworkVisibility <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`${r}|map-network-visibility-v1`,e}function Za(e,t){let n=Math.max(0,Math.min(1,(t-.6)/.6)),r=n*n*(3-2*n),i=new Map,a=new Map,o=Math.max(1,...e.map(e=>e.radius*2+2.5));for(let t of e){if(!t.visible||r===0){a.set(t.id,1);continue}let e=Math.floor(t.x/o),n=Math.floor(t.y/o),s=(t.previous??1)>.5?1:2.5,c=!1;for(let r=-1;r<=1&&!c;r++)for(let a=-1;a<=1&&!c;a++)for(let o of i.get(`${e+r}:${n+a}`)??[])if(Math.hypot(t.x-o.x,t.y-o.y)<t.radius+o.radius+s){c=!0;break}if(a.set(t.id,c?1-r:1),!c){let r=`${e}:${n}`;i.has(r)||i.set(r,[]),i.get(r).push(t)}}return a}function Qa(e,t=1,n=1){return e>0?{routeScale:e*Ka.railCore/.42,cityScale:e*Ka.cityReferenceRadius/(2.5*t),trainScaleX:Math.max(1,e*Ka.trainWidth/(1.22*n)),trainScaleZ:Math.max(1,e*Ka.trainLength/2.45)}:{routeScale:1,cityScale:1,trainScaleX:1,trainScaleZ:1}}var $a=(e,t,n)=>n?1:1-Math.exp(-e*t),eo=e=>e.parts[Math.floor(e.parts.length/2)],to=1.968,no=.48,ro=Math.PI/4,io=85*Math.PI/180,ao=(e,t)=>p.euclideanModulo(e+Math.PI*t,2*Math.PI*t)-Math.PI*t;function oo({canvas:e,camera:n,scene:r,mapScene:i,reducedMotion:o,getTrains:s,getWorldRoot:c,getWorld:l=()=>null,onPause:u,onRegenerate:d,isDetailReady:f=()=>!0}){let m=n.clone(),h=n.clone(),_=n.clone(),v=n.clone(),y=n.clone(),b=n.clone(),x=n.clone(),S=new q(0,1.3,0),C=0,w=[v,b],T=new Ta(m,e);Object.assign(T,{enableDamping:!0,dampingFactor:.075,panSpeed:.7,rotateSpeed:.45,minZoom:Ra.min,maxZoom:Ra.max,minPolarAngle:ro,maxPolarAngle:ro}),T.target.set(0,1.3,0),T.update();let E=`world`,D=0,O=null,k=null,A=null,j=!0,M=1,N=new q,P=new q,F=null,I=null,L=!1,ee=0,R=null,te=new Set,z=new Set,B=new ne;B.firstHitOnly=!0;let V=[],H=new q,re=new Y,ie=new q,ae=new t,oe=new q,U=new q,se=new tt,ce=new q,le=new q,ue=new q,de=new q,fe=new q,pe=new q,me=new q,he=new q,ge=new Y,_e=new Y,ve=new Y,ye={x:0,z:0},be=new q,xe=new q,Se=new WeakMap,W={},Ce=new zt(.94,1,64);Ce.rotateX(-Math.PI/2);let we=new Qe({color:X.trim,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!0,side:2}),Te=new a(Ce,we),Ee=new a(Ce,we.clone());Ee.material.toneMapped=!1,Te.visible=Ee.visible=!1,r.add(Te),i.add(Ee),Te.renderOrder=3,Ee.renderOrder=10;function G(){let e=l(),t=wt(e);if(!t)return;if(t.complete){U.set(ao(T.target.x,t.radius)-T.target.x,0,p.clamp(T.target.z,-t.radius*io,t.radius*io)-T.target.z),T.target.add(U),m.position.add(U);return}let n=Se.get(e);if(!n){if(e.outline?.length){let t=e.outline.map(e=>e[0]),r=e.outline.map(e=>e[1]);n={left:Math.min(...t),right:Math.max(...t),top:Math.min(...r),bottom:Math.max(...r)}}else if(e.bounds)n={left:-e.bounds.width/2,right:e.bounds.width/2,top:-e.bounds.depth/2,bottom:e.bounds.depth/2};else return;let t=Math.max(8,Math.min(n.right-n.left,n.bottom-n.top)*.05);n.left-=t,n.right+=t,n.top-=t,n.bottom+=t,Se.set(e,n)}U.set(p.clamp(T.target.x,n.left,n.right)-T.target.x,0,p.clamp(T.target.z,n.top,n.bottom)-T.target.z),T.target.add(U),m.position.add(U)}function De(e,t,n=m,r=T.target){e.copy(n),ae.setFromVector3(ie.copy(n.position).sub(r));let i=wt(l());return ae.phi=p.lerp(ro,i&&!i.complete?no:1e-5,t),e.position.copy(r).add(ie.setFromSpherical(ae)),e.lookAt(r),e.updateMatrixWorld(!0),e}function Oe(e,t,n=T.target){e.copy(t);let r=l();return wt(r)&&(Ne(r,n.x,n.z,se),Ve(r,n.x,n.y,n.z,ce),le.copy(t.position).sub(n).applyMatrix4(se),e.position.copy(ce).add(le),e.up.copy(t.up).transformDirection(se),e.lookAt(ce)),e.updateMatrixWorld(!0),e}function ke(){De(h,D,x,S),Oe(n,h,S),c()?.scale.set(1,wt(l())?1:1-D*.985,1)}function Ae(){let e=T.enableDamping,t=m.zoom;be.copy(m.position),xe.copy(T.target),T.enableDamping=!1,T.update(),m.position.copy(be),T.target.copy(xe),m.zoom=t,m.updateProjectionMatrix(),T.update(),T.enableDamping=e}function K(){O=null,A=null}let je=e=>Math.max(Ra.min,Math.min(Ra.max*M,e));function Me(){return M*Math.max(Ra.follow,Wa({viewWidth:(m.right-m.left)/M,viewHeight:(m.top-m.bottom)/M,spanWidth:40,spanHeight:32,padding:.1}))}function Pe(e){e?.state.active&&(Je(),Ae(),O=e,k=null,A=Me(),o.matches&&(m.zoom=A,m.updateProjectionMatrix(),A=null))}function Fe(){K(),Je(),k=null,Ae(),m.position.copy(N),T.target.copy(P),m.zoom=1,m.updateProjectionMatrix(),T.update(),G(),x.copy(m),S.copy(T.target),x.updateProjectionMatrix(),D=Ha(x.zoom/M),E=Va(x.zoom/M),Te.visible=Ee.visible=!1,Ge(),ke(),Ie()}function Ie(){let t={view:E,following:O?.state.id??``,zoom:x.zoom.toFixed(3),requestedZoom:m.zoom.toFixed(3),detailLoading:String(D<1&&!f()),mapBlend:D.toFixed(3)};for(let n in t)W[n]!==t[n]&&(e.dataset[n]=W[n]=t[n])}function Re(e,t=eo(e),r=H){let i=l(),a=t.position;return wt(i)?Ve(i,a.x,D>.7?to:a.y+.8,a.z,r):(r.copy(a),r.y=D>.7?.3:(a.y+.8)*(c()?.scale.y??1)),r.project(n)}function ze(e,t){if(!e.state.active||D>.7&&Ya(n.zoom)===0)return!1;if(!t)return e.parts.some(t=>ze(e,t));if(!t.visible)return!1;let r=Re(e,t);if(Math.abs(r.x)>1.05||Math.abs(r.y)>1.05||r.z<-1||r.z>1||wt(l())&&(rt(l(),t.position.x,t.position.z,ue),ue.dot(n.getWorldDirection(de))>=0))return!1;if(D>.7)return!0;B.setFromCamera(re.set(r.x,r.y),n),V.length=0,c()?.traverseVisible(e=>{e.isMesh&&(!e.isInstancedMesh||e.count>0)&&V.push(e)});let i=B.intersectObjects(V,!1)[0];if(i?.object.userData.instanceTrainIds?.[i.instanceId]===e.state.id)return!0;let a=i?.object;for(;a;){if(a.userData.trainId===e.state.id)return!0;a=a.parent}return!1}function Be(t,r,i=!1){let a=e.getBoundingClientRect(),o=i?28:17,l=[];c()?.updateMatrixWorld(!0),n.updateMatrixWorld(!0);for(let e of s())if(e.state.active)for(let n of e.parts){let i=Re(e,n);if(i.z<-1||i.z>1)continue;let s=Math.hypot((i.x+1)*a.width/2+a.left-t,(1-i.y)*a.height/2+a.top-r);s<o&&l.push({train:e,part:n,d:s})}l.sort((e,t)=>e.d-t.d);for(let e of l)if(ze(e.train,e.part))return e.train;return null}function He(){let e=[];for(let t of s()){if(!t.state.active)continue;let n=Re(t);Math.abs(n.x)<=1.05&&Math.abs(n.y)<=1.05&&n.z>=-1&&n.z<=1&&e.push({train:t,d:n.x*n.x+n.y*n.y})}e.sort((e,t)=>e.d-t.d);for(let t of e)if(ze(t.train))return t.train}function Ue(e){let t=s().filter(e=>e.state.active);if(!t.length)return;let n=t.indexOf(O);Pe(t[n<0?e>0?0:t.length-1:(n+e+t.length)%t.length])}function Ge(){let e=D===1&&E===`map`;R!==null&&e!==R&&Ae(),R=e,T.enabled=j,T.enableRotate=!e,T.enablePan=e&&!O,T.screenSpacePanning=!1,T.mouseButtons.LEFT=e?g.PAN:g.ROTATE,T.touches.ONE=e?Le.PAN:Le.ROTATE,T.touches.TWO=e?Le.DOLLY_PAN:Le.DOLLY_ROTATE}function Ke(e,t,n){if(!e&&!t)return;K();let r=wt(l()),i=Math.max(m.right-m.left,m.top-m.bottom)/x.zoom,a=n??(r?.complete?Math.min(r.radius*.95,i*.3):i*.3);if(me.set(1,0,0).applyQuaternion(h.quaternion),me.y=0,me.normalize(),he.set(0,1,0).applyQuaternion(h.quaternion),he.y=0,he.normalize(),U.copy(me).multiplyScalar(e*a).addScaledVector(he,-t*a),r?.complete&&r.projection.type===`equirectangular`){let e=r.projection,t=e.centralLatitude*Math.PI/180-T.target.z/e.radius,n=r.radius+T.target.y,i=p.clamp(t-U.z/n,-io,io),a=i-t,o=Math.log(Math.tan(Math.PI/4+i/2)/Math.tan(Math.PI/4+t/2)),s=Math.abs(a)>1e-9?a/o:Math.cos(t);U.x*=e.radius/(n*s),U.z=-a*e.radius}else r&&(We(l(),T.target.x,T.target.z,U.x,U.z,ye),U.set(ye.x-T.target.x,0,ye.z-T.target.z));T.target.add(U),m.position.add(U),G()}function qe(e){if(_e.set(Number(z.has(`d`))-Number(z.has(`a`)),Number(z.has(`s`))-Number(z.has(`w`))),_e.lengthSq()>1&&_e.normalize(),o.matches)ge.copy(_e),ve.copy(_e).multiplyScalar(e);else{let t=_e.lengthSq()?10:14,n=Math.exp(-t*e);ve.copy(ge).sub(_e).multiplyScalar((1-n)/t).addScaledVector(_e,e),ge.sub(_e).multiplyScalar(n).add(_e),!_e.lengthSq()&&ge.lengthSq()<1e-24&&ge.set(0,0)}Ke(ve.x,ve.y)}function Je(){z.clear(),ge.set(0,0),ve.set(0,0)}function Ye(e){z.delete(e.key.toLowerCase())}e.addEventListener(`keyup`,Ye),window.addEventListener(`keyup`,Ye),e.addEventListener(`blur`,Je),window.addEventListener(`blur`,Je),e.ownerDocument.addEventListener(`visibilitychange`,()=>{e.ownerDocument.hidden&&Je()}),e.addEventListener(`pointerdown`,e=>{j&&(te.add(e.pointerId),te.size>1&&(L=!0,I=null),e.button===0&&te.size===1&&(I={id:e.pointerId,x:e.clientX,y:e.clientY,moved:!1,touch:e.pointerType===`touch`},L=!1),A=null)},{capture:!0}),e.addEventListener(`pointermove`,e=>{j&&(I?.id===e.pointerId&&Math.hypot(e.clientX-I.x,e.clientY-I.y)>6&&(I.moved=!0),F={x:e.clientX,y:e.clientY,touch:e.pointerType===`touch`})});function Xe(e){if(!j)return;let t=I?.id===e.pointerId&&!I.moved&&!L&&e.type===`pointerup`&&Math.hypot(e.clientX-I.x,e.clientY-I.y)<=6,n=I;if(te.delete(e.pointerId),t){let t=Be(e.clientX,e.clientY,n.touch);t?Pe(t):K()}te.size||(I=null,L=!1)}window.addEventListener(`pointerup`,Xe),window.addEventListener(`pointercancel`,Xe),e.addEventListener(`pointerleave`,()=>{k=null,F=null,e.style.cursor=O?`default`:`grab`}),e.addEventListener(`wheel`,()=>{A=null},{passive:!0}),e.addEventListener(`dblclick`,()=>{j&&Fe()}),e.addEventListener(`keydown`,e=>{if(!j||e.altKey||e.metaKey||e.ctrlKey)return;let n=!0,r=e.key.toLowerCase();if([`w`,`a`,`s`,`d`].includes(r))z.has(r)||(z.add(r),K(),Ae());else if(e.key===` `)u();else if(e.key===`Home`)Fe();else if(e.key===`Escape`)K();else if(e.key.toLowerCase()===`r`)d();else if(e.key.toLowerCase()===`f`)Pe(He());else if(e.key===`[`)Ue(-1);else if(e.key===`]`)Ue(1);else if([`+`,`=`,`-`,`_`].includes(e.key))A=null,m.zoom=je(m.zoom*(e.key===`+`||e.key===`=`?1.16:1/1.16)),m.updateProjectionMatrix();else if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)){if(Ae(),E===`world`&&!O&&(e.key===`ArrowLeft`||e.key===`ArrowRight`)){let n=m.position.clone().sub(T.target),r=new t().setFromVector3(n);e.key===`ArrowLeft`&&(r.theta-=.08),e.key===`ArrowRight`&&(r.theta+=.08),m.position.copy(T.target).add(new q().setFromSpherical(r))}else Ke(Number(e.key===`ArrowRight`)-Number(e.key===`ArrowLeft`),Number(e.key===`ArrowDown`)-Number(e.key===`ArrowUp`),(m.top-m.bottom)/x.zoom*.045);T.update(),G()}else n=!1;n&&e.preventDefault()});function Ze(e){if(j){if(C=e,A!==null&&(m.zoom=p.lerp(m.zoom,A,$a(7,e,o.matches)),Math.abs(m.zoom-A)<.002&&(m.zoom=A,A=null),m.updateProjectionMatrix()),O&&(!O.state.active||A===null&&Ua(m.zoom/M))&&(O=null),qe(Math.min(.1,Math.max(0,e))),Ge(),T.update(),O){oe.copy(eo(O).position),oe.y=.75;let t=wt(l());t?.complete&&(oe.x=T.target.x+ao(oe.x-T.target.x,t.radius)),U.copy(T.target).lerp(oe,$a(7,e,o.matches)).sub(T.target),T.target.add(U),m.position.add(U)}G()}}function $e(e){return Ga(x.zoom,m.zoom,e,o.matches)}function et(t){if(!j)return;let r=$e(t);x.copy(m),S.copy(T.target),x.zoom=r,x.updateProjectionMatrix(),D=Ha(x.zoom/M),E=Va(x.zoom/M,E),Ge(),ke(),ee+=t,ee>.12&&F&&!F.touch&&!te.size&&!O&&(ee=0,k=Be(F.x,F.y),e.style.cursor=k?`pointer`:`grab`);let i=O??k;if(Te.visible=Ee.visible=!!i?.state.active,Ee.visible&&=Ya(n.zoom)>0,i){let e=eo(i);for(let t of[Te,Ee]){let r=l(),a=t===Te?.045:wt(r)?1.6:.6;wt(r)?(Ve(r,e.position.x,a,e.position.z,t.position),rt(r,e.position.x,e.position.z,ue),Dt(r,e.position.x,a,e.position.z,Math.sin(e.rotation.y),0,Math.cos(e.rotation.y),fe).normalize(),pe.crossVectors(ue,fe).normalize(),se.makeBasis(pe,ue,fe),t.quaternion.setFromRotationMatrix(se)):(t.position.set(e.position.x,a,e.position.z),t.rotation.set(0,e.rotation.y,0)),t.scale.set(1.35,1,4.65),t.material.opacity=O?.state.id===i.state.id?.95:.48,t===Ee&&(t.material.opacity*=Ya(n.zoom))}}Ie()}return{navigation:m,chartCamera:h,controls:T,reset:Fe,updateNavigation:Ze,updatePresentation:et,setInputEnabled(e){Je(),K(),k=null,F=null,I=null,te.clear(),Ae(),j=!!e,T.enabled=j,Te.visible=Ee.visible=!1},overlook(e,{heading:t,zoom:n}={}){Je(),K(),Ae(),U.set(e.x-T.target.x,(e.y??0)+1.3-T.target.y,e.z-T.target.z),m.position.add(U),T.target.add(U),Number.isFinite(t)&&(ae.setFromVector3(ie.copy(m.position).sub(T.target)),ae.theta=t+Math.PI,ae.phi=ro,m.position.copy(T.target).add(ie.setFromSpherical(ae))),m.zoom=Number.isFinite(n)?je(n):Math.min(m.zoom,M),m.updateProjectionMatrix(),T.update(),G(),x.copy(m),S.copy(T.target),D=Ha(x.zoom/M),E=Va(x.zoom/M),Ge(),ke(),Ie()},update(e){Ze(e),et(e)},get coverageCamera(){return De(_,0),_.zoom=Math.max(Ra.mapBlendEnd*M,x.zoom),_.updateProjectionMatrix(),Oe(v,_)},get coverageCameras(){this.coverageCamera;let e=Ra.mapBlendEnd*M,t=$e(C);return t<e?(b.copy(v),w):(De(y,Ha(t/M)),y.zoom=t,y.updateProjectionMatrix(),Oe(b,y),w)},setScale(e){M=Math.max(1,Number(e)||1),T.maxZoom=Ra.max*M},get zoomScale(){return M},get wantsDetail(){return m.zoom/M>Ra.detailPrefetch||D<1||O!==null},get waitingForDetail(){return!1},get renderTarget(){return S},setHome(){N.copy(m.position),P.copy(T.target),Fe()},get mode(){return E},get blend(){return D},get selected(){return O?.state.id??null}}}function so(e,t){return e.onBeforeCompile=e=>{e.uniforms.detailReveal=t,e.fragmentShader=`uniform float detailReveal;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <alphatest_fragment>`,`#include <alphatest_fragment>
      if (detailReveal < 0.9999) {
        vec2 pixel = floor(gl_FragCoord.xy);
        float threshold = fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
        if (detailReveal <= threshold) discard;
      }`)},e.customProgramCacheKey=()=>`streamed-detail-reveal-v1`,e}function co(e){return so(new L({depthPacking:At,side:1}),e)}function lo(e){let t={type:xt,depthBuffer:!0,samples:2},n=new Ot(1,1,t),r=new Ot(1,1,t),i=new ht({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{worldTexture:{value:n.texture},mapTexture:{value:r.texture},blend:{value:0},toneMappingExposure:{value:e.toneMappingExposure}},vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,fragmentShader:`varying vec2 vUv;
      uniform sampler2D worldTexture;
      uniform sampler2D mapTexture;
      uniform float blend;
      #include <tonemapping_pars_fragment>
      void main(){
        vec3 worldColor=ACESFilmicToneMapping(texture2D(worldTexture,vUv).rgb);
        vec3 mapColor=texture2D(mapTexture,vUv).rgb;
        gl_FragColor=vec4(mix(worldColor,mapColor,blend),1.0);
        #include <colorspace_fragment>
      }`}),o=new A,s=new a(new x(2,2),i);s.frustumCulled=!1,o.add(s);let c=new Ye,l,u=!1;function d(){if(l)return l;let e=new $e;e.setAttribute(`position`,new Re([0,0,0,1,0,0,0,0,1],3)),e.setAttribute(`normal`,new Re([0,1,0,0,1,0,0,1,0],3)),e.setAttribute(`color`,new Re([1,1,1,1,1,1,1,1,1],3));let t=[0,2].map(t=>new a(e,so(new v({side:t,flatShading:!0,vertexColors:!0}),{value:1})));t.push(new Fe(e,new v({side:0,flatShading:!0,vertexColors:!0}),1));for(let e of t)e.castShadow=!0,e.receiveShadow=!0;let n=[1,2].map(t=>{let n=co({value:1});return n.side=t,new a(e,n)});return n.push(new Fe(e,new L({side:1}),1)),l={geometry:e,surfaces:t,depths:n}}let f=1,p=1,m=1,h=1;function g(){(f!==m||p!==h)&&(n.setSize(f,p),r.setSize(f,p),m=f,h=p,e.initRenderTarget(n),e.initRenderTarget(r))}function _(t,n){let r=e.getRenderTarget(),i=e.getActiveCubeFace?.()??0,a=e.getActiveMipmapLevel?.()??0;try{return e.setRenderTarget(t),n()}finally{e.setRenderTarget(r,i,a)}}function y(t,n){let r=[];try{t.traverse(e=>{e.visible&&(e.isMesh||e.isLine||e.isPoints||e.isSprite)&&(r.push(e),e.visible=!1)}),e.render(t,n)}finally{for(let e of r)e.visible=!0}}return{resize(e,t){f=e,p=t},async prepare(t,i,a){let s=e.shadowMap.enabled;_(n,()=>{g(),t&&a&&y(t,a)});function l(t,n,r,i){let a=e.shadowMap.enabled;try{return e.shadowMap.enabled=s,_(t,()=>e.compileAsync(n,r,i))}finally{e.shadowMap.enabled=a}}if(t&&a&&await l(n,t,a),t&&a)for(let e of d().surfaces)await l(n,e,a,t);if(t&&s){let e;if(t.traverseVisible(t=>{!e&&t.castShadow&&t.isDirectionalLight&&(e=t.shadow.camera)}),e)for(let r of d().depths)await l(n,r,e,t)}if(i&&a&&await l(r,i,a),await l(null,o,c),t&&a&&await l(null,t,a),t&&a)for(let e of d().surfaces)await l(null,e,a,t)},render(t,a,s,l){l<=.001?(e.setRenderTarget(null),e.render(t,s)):l>=.999?(e.setRenderTarget(null),e.render(a,s)):(g(),e.setRenderTarget(n),e.render(t,s),e.setRenderTarget(r),e.render(a,s),e.setRenderTarget(null),i.uniforms.blend.value=l,i.uniforms.toneMappingExposure.value=e.toneMappingExposure,e.render(o,c))},dispose(){if(!u&&(u=!0,n.dispose(),r.dispose(),s.geometry.dispose(),i.dispose(),l)){l.geometry.dispose();for(let e of[...l.surfaces,...l.depths])e.material.dispose(),e.isInstancedMesh&&e.dispose();l=void 0}}}}function uo(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new $e;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=fo(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=fo(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function fo(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new z(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var po=(e,t,n=0)=>({minX:e-n,minZ:t-n,maxX:e+n,maxZ:t+n}),mo=(e,t)=>e.minX<=t.maxX&&e.maxX>=t.minX&&e.minZ<=t.maxZ&&e.maxZ>=t.minZ;function ho(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a.x),n=Math.min(n,a.z),r=Math.max(r,a.x),i=Math.max(i,a.z);return{minX:t,minZ:n,maxX:r,maxZ:i}}function go(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let{box:a}of e)t=Math.min(t,a.minX),n=Math.min(n,a.minZ),r=Math.max(r,a.maxX),i=Math.max(i,a.maxZ);return{minX:t,minZ:n,maxX:r,maxZ:i}}var _o=(e,t,n)=>Math.hypot(Math.max(e.minX-t,0,t-e.maxX),Math.max(e.minZ-n,0,n-e.maxZ)),vo=class{constructor(e,t=e=>e){this.items=e;let n=e=>{if(!e.length)return null;let t=go(e);if(e.length<=8)return{box:t,entries:e};let r=t.maxX-t.minX>=t.maxZ-t.minZ?`X`:`Z`;e.sort((e,t)=>e.box[`min${r}`]+e.box[`max${r}`]-(t.box[`min${r}`]+t.box[`max${r}`]));let i=e.length>>1;return{box:t,left:n(e.slice(0,i)),right:n(e.slice(i))}};this.root=n(e.map(e=>({item:e,box:t(e)})))}query(e){let t=[],n=r=>{if(r&&mo(r.box,e)){if(r.entries)for(let n of r.entries)mo(n.box,e)&&t.push(n.item);else n(r.left),n(r.right)}};return n(this.root),t}nearest(e,t,n,r=1/0,i=0){let a=r,o=r=>{if(!(!r||_o(r.box,e,t)-i>a)){if(r.entries)for(let o of r.entries)_o(o.box,e,t)-i<=a&&(a=Math.min(a,n(o.item)));else _o(r.left.box,e,t)<_o(r.right.box,e,t)?(o(r.left),o(r.right)):(o(r.right),o(r.left))}};return o(this.root),a}},yo=class{constructor(e=24){this.size=e,this.cells=new Map}insert(e,t){let n={item:e,box:t};for(let e=Math.floor(t.minX/this.size);e<=Math.floor(t.maxX/this.size);e++)for(let r=Math.floor(t.minZ/this.size);r<=Math.floor(t.maxZ/this.size);r++){let t=`${e},${r}`;this.cells.has(t)||this.cells.set(t,[]),this.cells.get(t).push(n)}}query(e){let t=new Set,n=[];for(let r=Math.floor(e.minX/this.size);r<=Math.floor(e.maxX/this.size);r++)for(let i=Math.floor(e.minZ/this.size);i<=Math.floor(e.maxZ/this.size);i++)for(let a of this.cells.get(`${r},${i}`)??[])!t.has(a)&&mo(a.box,e)&&(t.add(a),n.push(a.item));return n}},bo=new WeakMap;function xo(e){let t=bo.get(e);if(!t||t.count!==e.length){let n=e.flatMap((e,t)=>e.points.slice(1).map((n,r)=>{let i=e.points[r],a=ho([i,n]);return{a:i,b:n,index:r,line:e,lineIndex:t,box:a,...a}}));t={count:e.length,tree:new vo(n,e=>e.box)},bo.set(e,t)}return t.tree}var So=new WeakMap,Co=e=>ho(e.map(([e,t])=>({x:e,z:t})));function wo(e){if(!So.has(e)){let t=e.map(e=>({polygon:e,box:Co(e[0]),holes:new vo(e.slice(1),Co)}));So.set(e,new vo(t,e=>e.box))}return So.get(e)}function To(e,t){if(!e?.length)return[];let n=wo(e).query(t).map(({polygon:e,holes:n})=>[e[0],...n.query(t)]);if(!n.length)return[];let r=[[[t.minX,t.minZ],[t.maxX,t.minZ],[t.maxX,t.maxZ],[t.minX,t.maxZ],[t.minX,t.minZ]]];return en.intersection(n,[r])}var Eo=Object.freeze([`farmland`,`forest`,`plains`,`desert`,`ocean`,`mountain`]),Do=.9,Oo=Eo.slice(0,4),ko=1e-7,Ao=new WeakMap,jo=new WeakMap,Mo=new WeakMap;function No(e){return Mo.has(e)||Mo.set(e,{bounds:ho(e.map(([e,t])=>({x:e,z:t}))),edges:null,tree:null}),Mo.get(e)}function Po(e,t){t.edges||(t.edges=e.map((t,n)=>{let r=e[(n+e.length-1)%e.length];return{a:r,b:t,box:ho([{x:r[0],z:r[1]},{x:t[0],z:t[1]}])}}),e.length>32&&(t.tree=new vo(t.edges,e=>e.box)))}function Fo(e){if(!jo.has(e)){let t=e.map(e=>({polygon:e,box:No(e[0]).bounds,holes:new vo(e.slice(1),e=>No(e).bounds)}));jo.set(e,{polygons:new vo(t,e=>e.box),edges:null})}return jo.get(e)}function Io(e){let t=Fo(e);if(!t.edges){let n=[];for(let t of e)for(let e of t)for(let t=1;t<e.length;t++){let r=e[t-1],i=e[t];n.push({a:r,b:i,box:ho([{x:r[0],z:r[1]},{x:i[0],z:i[1]}])})}t.edges=new vo(n,e=>e.box)}return t.edges}function Lo(e){let t=2166136261;for(let n of`biomes:${e}`)t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ro(e,t){if(!e)throw TypeError(`Invalid biomes: ${t}`)}function zo(e){let t=e.map(e=>[Number(e[0]),Number(e[1])]);return t.length&&(t[0][0]!==t.at(-1)[0]||t[0][1]!==t.at(-1)[1])&&t.push([...t[0]]),t}function Bo(e){return e.map(e=>e.map(e=>e.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6])))}function Vo(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t/2}function Ho(e){return e.reduce((e,t)=>e+Math.abs(Vo(t[0]))-t.slice(1).reduce((e,t)=>e+Math.abs(Vo(t)),0),0)}function Uo(e,t,n,r){let i=r[0]-n[0],a=r[1]-n[1],o=Math.max(0,Math.min(1,((e-n[0])*i+(t-n[1])*a)/(i*i+a*a||1)));return Math.hypot(e-n[0]-o*i,t-n[1]-o*a)}function Wo(e,t,n){let r=No(e),i=r.bounds;if(t<i.minX-ko||t>i.maxX+ko||n<i.minZ-ko||n>i.maxZ+ko)return!1;Po(e,r);let a=!1,o=r.tree?r.tree.query({minX:t-ko,maxX:1/0,minZ:n-ko,maxZ:n+ko}):r.edges;for(let{a:e,b:r,box:i}of o){if(t>=i.minX-ko&&t<=i.maxX+ko&&n>=i.minZ-ko&&n<=i.maxZ+ko&&Uo(t,n,e,r)<ko)return!0;e[1]>n!=r[1]>n&&t<(r[0]-e[0])*(n-e[1])/(r[1]-e[1])+e[0]&&(a=!a)}return a}function Go(e,t,n){let r=po(t,n,ko);return Fo(e).polygons.query(r).some(({polygon:e,holes:i})=>Wo(e[0],t,n)&&!i.query(r).some(e=>Wo(e,t,n)))}function Ko(e,t,n){let r=Io(e).nearest(t,n,e=>Uo(t,n,e.a,e.b));return Go(e,t,n)?r:-r}function qo(e,t,n,r=32){return zo(Array.from({length:r},(i,a)=>[e+Math.cos(a/r*Math.PI*2)*n,t+Math.sin(a/r*Math.PI*2)*n]))}function Jo(e,t){if(!e.length)return[];let n=[e];for(let r of e)for(let e of r)for(let r=1;r<e.length;r++){let i=e[r-1],a=e[r],o=Math.hypot(a[0]-i[0],a[1]-i[1]);if(o<ko)continue;let s=-(a[1]-i[1])/o*t,c=(a[0]-i[0])/o*t;n.push([[zo([[i[0]+s,i[1]+c],[a[0]+s,a[1]+c],[a[0]-s,a[1]-c],[i[0]-s,i[1]-c]])]]),n.push([[qo(i[0],i[1],t/Math.cos(Math.PI/12),12)]])}return en.union(...n)}function Yo(e,t,n){return xo(e.lines??[]).nearest(t,n,e=>Uo(t,n,[e.a.x,e.a.z],[e.b.x,e.b.z]))}function Xo(e,t,n,r){let i=.9500000000000001;return(e.cities||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+(e.radius||0)+i+1)||(e.stations||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+e.radius+i+.5)||(e.mountains||[]).some(e=>Math.hypot(e.x-t,e.z-n)<r+e.radius+i+.5)?!1:Yo(e,t,n)>=r+i+1.8}function Zo(e,t,n){let r=e.outline,i=Math.sign(Vo(r)),a=Math.min(e.bounds.width,e.bounds.depth),o=null;for(let s of[1,.84,.68,.52,.36]){let c=a*.19*s;for(let a=0;a<r.length;a++){let s=r[a],l=r[(a+1)%r.length],u=Math.hypot(l[0]-s[0],l[1]-s[1]);if(u<ko)continue;let d=(l[1]-s[1])/u*i,f=-(l[0]-s[0])/u*i;for(let r of[.2,.35,.5,.65,.8]){let i=r+(n()-.5)*.035,a=s[0]+(l[0]-s[0])*i+d*c*.28,u=s[1]+(l[1]-s[1])*i+f*c*.28;if(!Xo(e,a,u,c))continue;let p=en.intersection(t,[[qo(a,u,c)]]),m=Ho(p);(!o||m>o.score)&&(o={polygons:p,score:m})}}if(o)break}return o?.polygons||[]}function Qo(e,t,n,r){let i=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]);return i(e,t,n)*i(e,t,r)<0&&i(n,r,e)*i(n,r,t)<0}function $o(e,t){let n=1/0;for(let r=1;r<e.points.length;r++){let i=[e.points[r-1].x,e.points[r-1].z],a=[e.points[r].x,e.points[r].z];if(Go(t,...i)||Go(t,...a))return 0;for(let e of t)for(let t of e)for(let e=1;e<t.length;e++){let r=t[e-1],o=t[e];if(Qo(i,a,r,o))return 0;n=Math.min(n,Uo(...i,r,o),Uo(...a,r,o),Uo(...r,i,a),Uo(...o,i,a))}}return n}function es(e,t,n){Ro(Array.isArray(n.points)&&n.points.length>=3&&n.points.every(e=>Array.isArray(e)&&e.length>=2&&e.every(Number.isFinite)),`ocean.points requires at least three finite [x,z] coordinates`);let r=zo(n.points);Ro(Math.abs(Vo(r))>ko,`ocean polygon must have positive area`);let i=en.intersection(t,[[r]]);Ro(i.length>0,`ocean polygon must intersect the island`);let a=zo(e.outline);Ro(i.some(e=>e[0].some(e=>a.slice(1).some((t,n)=>Uo(...e,a[n],t)<1e-5))),`ocean must connect to the coast`);let o=.9500000000000001;for(let t of e.cities||[])Ro(Ko(i,t.x,t.z)<=-(t.radius||0)-o-1,`ocean and shore must stay outside city footprints`);for(let t of e.mountains||[])Ro(Ko(i,t.x,t.z)<=-t.radius-o-.5,`ocean and shore must stay outside mountain footprints`);for(let t of e.stations||[])Ro(Ko(i,t.x,t.z)<=-t.radius-o-.5,`ocean and shore must stay outside station footprints`);for(let t of e.lines||[])Ro($o(t,i)>=2.75,`ocean and shore must stay outside complete railway corridors`);return i}function ts(e,t,n,r){let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=o[0]*t+o[1]*n-r,l=s[0]*t+s[1]*n-r;if(c<=ko&&i.push(o),c<=ko!=l<=ko){let e=c/(c-l);i.push([o[0]+(s[0]-o[0])*e,o[1]+(s[1]-o[1])*e])}}return i}function ns(e,t,n){if(t.sites!==void 0){Ro(Array.isArray(t.sites)&&t.sites.length>0,`sites must contain at least one land biome`);let n=t.sites.map((e,t)=>({...e,id:String(e.id??`biome-${t+1}`)}));Ro(n.every(e=>Oo.includes(e.type)&&Number.isFinite(e.x)&&Number.isFinite(e.z)),`sites need a farmland, forest, plains or desert type and finite x/z`),Ro(new Set(n.map(e=>e.id)).size===n.length,`site IDs must be unique`);for(let t=0;t<n.length;t++){Ro(Wo(e.outline,n[t].x,n[t].z),`sites must lie inside the island`);for(let e=0;e<t;e++)Ro(Math.hypot(n[t].x-n[e].x,n[t].z-n[e].z)>ko,`sites must have distinct positions`)}return n}return[[`farmland`,-.24,.15],[`forest`,-.26,-.24],[`plains`,.06,.24],[`desert`,.29,-.14]].map(([t,r,i])=>({id:`biome-${t}`,type:t,x:(r+(n()-.5)*.09)*e.bounds.width,z:(i+(n()-.5)*.09)*e.bounds.depth}))}function rs(e,t={}){Ro(t&&typeof t==`object`&&!Array.isArray(t),`configuration must be an object`),Ro(Array.isArray(e.outline)&&e.outline.length>=3,`a valid world outline is required`);let n=Lo(e.seed),r=[[zo(e.outline)]],i=ns(e,t,n),a=t.geography,o=a?en.intersection(r,a.ocean):t.ocean===!1?[]:t.ocean===void 0?Zo(e,r,n):es(e,r,t.ocean),s=!a&&o.length?en.intersection(r,Jo(o,Do)):[],c=a?en.intersection(r,a.oceanShore):o.length?en.difference(s,o):[],l=a?en.intersection(r,a.landInterior):s.length?en.difference(r,s):r,u=(e.mountains||[]).map(e=>[[zo(e.range?.polygon??qo(e.x,e.z,e.radius,48)),...(e.range?.holes??[]).map(zo)]]),d=u.length?en.intersection(l,en.union(...u)):[],f=d.length?en.difference(l,d):l,p=e.outline.map(e=>e[0]),m=e.outline.map(e=>e[1]),h=[[Math.min(...p)-1,Math.min(...m)-1],[Math.max(...p)+1,Math.min(...m)-1],[Math.max(...p)+1,Math.max(...m)+1],[Math.min(...p)-1,Math.max(...m)+1]],g=[],_=[];for(let t of i){let n=h;for(let e of i)if(e!==t&&(n=ts(n,e.x-t.x,e.z-t.z,(e.x*e.x+e.z*e.z-t.x*t.x-t.z*t.z)/2),n.length<3))break;let r=n.length>=3?en.intersection(f,[[zo(n)]]):[];if(r.length&&g.push({id:t.id,type:t.type,...t.ice===!0?{ice:!0}:{},polygons:r}),e.surface?.complete&&t.ice===!0&&n.length>=3){let e=d.length?en.intersection(l,[[zo(n)]]):r;e.length&&_.push(e)}}return d.length&&g.push({id:`biome-mountain`,type:`mountain`,polygons:d}),o.length&&g.push({id:`biome-ocean`,type:`ocean`,polygons:o}),a?.lakes?.length&&g.push({id:`biome-lakes`,type:`ocean`,polygons:a.lakes}),{regions:g.map(e=>({...e,polygons:Bo(e.polygons)})),..._.length?{ice:Bo(en.union(..._))}:{},land:Bo(l),ocean:Bo(o),oceanShore:Bo(c),lakeShore:Bo(a?.lakeShore??[]),shoreWidth:Do,sites:i}}function is(e){return e.biomes||e}function as(e,t){let n=is(e),r=[...new Set(Array.isArray(t)?t:[t])].sort(),i=Ao.get(n);i||(i=new Map,Ao.set(n,i));let a=r.join(`|`);if(!i.has(a)){let e=r.flatMap(e=>e===`shore`?[n.oceanShore,n.lakeShore]:e===`ice`?[n.ice]:n.regions.filter(t=>t.type===e).map(e=>e.polygons)).filter(e=>e?.length);i.set(a,e.length?en.union(...e):[])}return i.get(a)}var os=e=>e.surface?.complete&&e.surface.projection?.type===`equirectangular`?e.surface.projection:null;function ss(e,t){let n=os(e);if(!n)return t;let r=Math.PI*n.radius,i=r*2;return t>=-r&&t<r?t:((t+r)%i+i)%i-r}function cs(e,t,n,r,i){let a=os(e);if(!a)return t;let o=Math.PI*a.radius,s=o*2;if(n-i>-o&&n+i<o)return t;if(i>=s)return[];let c=po(n,r,i+Math.max(1e-5,i*1e-6)),l=[],u=Math.ceil((c.minX-o)/s),d=Math.floor((c.maxX+o)/s);for(let e=u;e<=d;e++){let n=e*s,r=To(t,{...c,minX:c.minX-n,maxX:c.maxX-n});r.length&&l.push(r.map(e=>e.map(e=>e.map(([e,t])=>[(Math.abs(e-o)<1e-6?o:Math.abs(e+o)<1e-6?-o:e)+n,t]))))}return l.length?en.union(...l):[]}function ls(e,t,n){t=ss(e,t);let r=is(e);for(let e of r.regions)if(Go(e.polygons,t,n))return e.type;return Go(r.oceanShore,t,n)||Go(r.lakeShore??[],t,n)?`shore`:null}function us(e,t,n,r){return Ko(as(e,t),ss(e,n),r)}function ds(e,t,n,r,i=0){if(!Number.isFinite(i)||i<0)return!1;n=ss(e,n);let a=cs(e,as(e,t),n,r,i),o=i-ko;return o<=0?Ko(a,n,r)>=o:Go(a,n,r)?Io(a).nearest(n,r,e=>Uo(n,r,e.a,e.b),o)>=o:!1}var fs=Math.PI*2,ps=1e-8,ms=e=>(e%fs+fs)%fs,hs=(e,t,n)=>Math.max(t,Math.min(n,e)),gs=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),_s=e=>Number.isFinite(e.heading)?e.heading:Math.atan2(e.tangent.z,e.tangent.x);function vs(e,t,n=.42,r={}){let i=gs(e,t);return i<ps?null:{...r,type:`line`,start:{x:e.x,y:n,z:e.z},end:{x:t.x,y:n,z:t.z},heading:Math.atan2(t.z-e.z,t.x-e.x),length:i,curvature:0}}function ys(e,t,n,r,i,a){let o=Math.atan2(t.z-e.z,t.x-e.x),s=r*ms(r*(Math.atan2(n.z-e.z,n.x-e.x)-o));return Math.abs(s)>fs-1e-7&&(s=0),Math.abs(s)<ps?null:{type:`arc`,center:{x:e.x,z:e.z},radius:i,startAngle:o,sweep:s,start:{x:t.x,y:a,z:t.z},end:{x:n.x,y:a,z:n.z},length:Math.abs(s)*i,curvature:r/i}}function bs(e,t,n,r){return{x:e.x-Math.sin(t)*n*r,z:e.z+Math.cos(t)*n*r}}function xs(e,t){let n=0,r=e.filter(Boolean).map(e=>{let t={...e,startDistance:n};return n+=e.length,{...t,endDistance:n}});return{segments:r,length:n,minRadius:t,maxCurvature:r.reduce((e,t)=>Math.max(e,Math.abs(t.curvature)),0)}}function Ss(e,t,{radius:n=8,y:r=.42}={}){if(!Number.isFinite(n)||n<=0)throw TypeError(`Railway minimum turning radius must be positive and finite`);let i=_s(e),a=_s(t),o=[],s=e=>{let r=xs(e,n);if(r.length<ps)return;let i=ws(r,r.length);gs(i,t)>1e-5||Math.cos(i.heading-a)<1-1e-7||o.push(r)};for(let o of[-1,1])for(let c of[-1,1]){let l=bs(e,i,o,n),u=bs(t,a,c,n),d=gs(l,u);if(d<ps){o===c&&s([ys(l,e,t,o,n,r)]);continue}let f=Math.atan2(u.z-l.z,u.x-l.x);if(o!==c){if(d<2*n-ps)continue;f+=Math.asin(hs(2*o*n/d,-1,1))}let p={x:l.x+o*Math.sin(f)*n,z:l.z-o*Math.cos(f)*n},m={x:u.x+c*Math.sin(f)*n,z:u.z-c*Math.cos(f)*n};s([ys(l,e,p,o,n,r),vs(p,m,r),ys(u,m,t,c,n,r)])}for(let o of[-1,1]){let c=bs(e,i,o,n),l=bs(t,a,o,n),u=gs(c,l);if(u<ps||u>4*n)continue;let d=(c.x+l.x)/2,f=(c.z+l.z)/2,p=Math.sqrt(Math.max(0,4*n*n-u*u/4)),m=-(l.z-c.z)/u,h=(l.x-c.x)/u;for(let i of[-1,1]){let a={x:d+m*p*i,z:f+h*p*i},u={x:(c.x+a.x)/2,z:(c.z+a.z)/2},g={x:(l.x+a.x)/2,z:(l.z+a.z)/2};s([ys(c,e,u,o,n,r),ys(a,u,g,-o,n,r),ys(l,g,t,o,n,r)])}}return o.sort((e,t)=>e.length-t.length)}function Cs(e,t,n){let r=hs(t,0,e.length),i=e.segments;if(!i.length)throw TypeError(`An alignment must contain a nonzero segment`);let a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;i[e].endDistance<r-ps?a=e+1:o=e}let s=i[a],c=hs(r-s.startDistance,0,s.length)/s.length,l,u,d;if(s.type===`line`)l=s.start.x+(s.end.x-s.start.x)*c,u=s.start.z+(s.end.z-s.start.z)*c,d=s.heading;else{let e=s.startAngle+s.sweep*c;l=s.center.x+Math.cos(e)*s.radius,u=s.center.z+Math.sin(e)*s.radius,d=e+Math.sign(s.sweep)*Math.PI/2}let f=n.tangent??={x:0,y:0,z:0},p=Math.cos(d),m=Math.sin(d);if(n.chartSpeed=1,s.chartTransform){let e=s.chartTransform,t=e.x+e.xx*l+e.xz*u,r=e.z+e.zx*l+e.zz*u,i=e.xx*p+e.xz*m,a=e.zx*p+e.zz*m,o=Math.hypot(i,a);l=t,u=r,p=i/o,m=a/o,d=Math.atan2(m,p),n.chartSpeed=o}return f.x=p,f.y=0,f.z=m,n.x=l,n.y=s.start.y,n.z=u,n.distance=r,n.heading=d,n.angle=Math.atan2(f.x,f.z),n.curvature=s.curvature,n}function ws(e,t){return Cs(e,t,{tangent:{x:0,y:0,z:0}})}function Ts(e,t=.35){let n=[],r=[];for(let i of e.segments){let a=Math.max(1,Math.ceil(i.length/t));for(let t=0;t<a;t++){let o=i.startDistance+i.length*t/a;if(r.length&&o-r.at(-1)<ps)continue;let s=ws(e,o);n.push({x:s.x,y:s.y,z:s.z}),r.push(o)}}let i=ws(e,e.length);return n.push({x:i.x,y:i.y,z:i.z}),r.push(e.length),{points:n,distances:r,length:e.length}}function Es(e,t=8){return xs(e.flatMap(e=>e?.segments??(e?[e]:[])),t)}function Ds(e,t,{radius:n=8,y:r=.42,waypoints:i=[],isAllowed:a=()=>!0}={}){let o=[e,...i,t],s=o.map((e,t)=>{if(t===0||t===o.length-1)return{...e,heading:_s(e)};if(Number.isFinite(e.heading))return e;let n=o[t-1],r=o[t+1];return{...e,heading:Math.atan2(r.z-n.z,r.x-n.x)}}),c=[];for(let e=1;e<s.length;e++){if(gs(s[e-1],s[e])<ps)continue;let t=Ss(s[e-1],s[e],{radius:n,y:r}).find(e=>e.segments.every(e=>e.type!==`arc`||Math.abs(e.sweep)<=Math.PI+1e-7)&&e.segments.reduce((e,t)=>e+(t.type===`arc`?Math.abs(t.sweep):0),0)<=Math.PI*1.5+1e-7&&Ts(e,.45).points.every(a));if(!t)throw TypeError(`Invalid world: waypoints cannot fit the outline and minimum turning radius without a railway loop`);c.push(t)}let l=Es(c,n);if(!l.segments.length)throw TypeError(`Invalid world: railway alignment has no length`);return l}var Os=new WeakMap,ks=Math.PI*2,As=16;function js(e){let t=2166136261;for(let n of e)t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ms(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function Ns(e){return`${e.id??`mountain`}:${e.x}:${e.z}:${e.radius}:${e.height}`}function Ps(e){if(e.range)return tn(e,e.renderBounds);let t=Ns(e),n=Os.get(e);if(n?.key===t)return n.data;let r=js(t),i=r()*ks,a=i+.72,o=i+3.65,s=[],c=[],l=[.21,.44,.7,1],u=Array.from({length:As},(e,t)=>i+t/As*ks+(r()-.5)*.15),d=u.map(()=>.86+r()*.14),f={x:e.x+Math.cos(i-.3)*e.radius*.075,y:e.height,z:e.z+Math.sin(i-.3)*e.radius*.075};s.push(f);for(let t=0;t<l.length;t++)for(let n=0;n<As;n++){let i=u[n],c=Math.max(Math.exp(-((Ms(i,a)/.43)**2)),.88*Math.exp(-((Ms(i,o)/.47)**2))),f=l[t]*(t===3?d[n]:.91+r()*.15),p=t===0?.67+r()*.12-c*.04:t===1?.41+c*.39+r()*.055:t===2?.16+c*.2+r()*.065:0,m=i+(t===3?0:Math.sin(n*1.7+t)*.035);s.push({x:e.x+Math.cos(m)*e.radius*f,y:e.height*p,z:e.z+Math.sin(m)*e.radius*f})}let p=(e,t,n)=>{let r=s[e],i=s[t],a=s[n],o=(i.z-r.z)*(a.x-r.x)-(i.x-r.x)*(a.z-r.z);c.push(o>0?[e,t,n]:[e,n,t])};for(let e=0;e<As;e++)p(0,1+e,1+(e+1)%As);for(let e=0;e<l.length-1;e++)for(let t=0;t<As;t++){let n=(t+1)%As,r=1+e*As,i=r+As;(t+e)%2?(p(r+t,i+t,r+n),p(r+n,i+t,i+n)):(p(r+t,i+t,i+n),p(r+t,i+n,r+n))}let m=s.length;s.push({x:e.x,y:0,z:e.z});let h=c.map(e=>[...e]),g=1+(l.length-1)*As;for(let e=0;e<As;e++)h.push([m,g+e,g+(e+1)%As]);let _=c.map(([e,t,n])=>{let r=s[e],i=s[t],a=s[n];return{p:r,q:i,r:a,minX:Math.min(r.x,i.x,a.x),maxX:Math.max(r.x,i.x,a.x),minZ:Math.min(r.z,i.z,a.z),maxZ:Math.max(r.z,i.z,a.z),denominator:(i.z-a.z)*(r.x-a.x)+(a.x-i.x)*(r.z-a.z)}}),v={vertices:s,triangles:h,surfaceTriangles:c,snowLine:e.height*.64,phase:i};return Os.set(e,{key:t,data:v,lookup:_}),v}function Fs(e,t,n){if(e.range)return Xt(e,t,n);if(Math.hypot(t-e.x,n-e.z)>e.radius+1e-7)return 0;Ps(e);for(let{p:r,q:i,r:a,minX:o,maxX:s,minZ:c,maxZ:l,denominator:u}of Os.get(e).lookup){if(t<o-1e-8||t>s+1e-8||n<c-1e-8||n>l+1e-8)continue;let e=((i.z-a.z)*(t-a.x)+(a.x-i.x)*(n-a.z))/u,d=((a.z-r.z)*(t-a.x)+(r.x-a.x)*(n-a.z))/u,f=1-e-d;if(e>=-1e-7&&d>=-1e-7&&f>=-1e-7)return Math.max(0,e*r.y+d*i.y+f*a.y)}return 0}function Is(e,t,n){if(e.range)return Qt(e,t,n);let{phase:r}=Ps(e),i=Math.atan2(n-e.z,t-e.x);return e.height*(.72+.045*Math.sin(i*3+r)+.025*Math.sin(i*7-r))}function Ls(e,t,n){return e.range?$t(e,t,n):Math.hypot(t-e.x,n-e.z)-e.radius}var Rs=Object.freeze([Object.freeze({id:`coral`,name:`Coral Railway`,color:Object.freeze({l:.65,c:.18,h:28})}),Object.freeze({id:`teal`,name:`Teal Railway`,color:Object.freeze({l:.64,c:.12,h:185})}),Object.freeze({id:`gold`,name:`Golden Railway`,color:Object.freeze({l:.75,c:.15,h:83})}),Object.freeze({id:`blue`,name:`Blue Railway`,color:Object.freeze({l:.61,c:.16,h:255})})]),zs=e=>{throw TypeError(`Invalid world: ${e}`)},Bs=(e,t,n)=>Math.max(t,Math.min(n,e));function Vs(e){if(typeof e==`string`&&/^#[\da-f]{6}$/i.test(e)){let[t,n,r]=[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255).map(e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*r),a=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*r),o=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*r),s=.2104542553*i+.793617785*a-.0040720468*o,c=1.9779984951*i-2.428592205*a+.4505937099*o,l=.0259040371*i+.7827717662*a-.808675766*o;return{l:Bs(s,0,1),c:Math.min(.4,Math.hypot(c,l)),h:(Math.atan2(l,c)*180/Math.PI+360)%360}}return(!e||typeof e!=`object`||![e.l,e.c,e.h].every(Number.isFinite)||e.l<0||e.l>1||e.c<0||e.c>.4)&&zs(`player colors require OKLCH {l:0..1,c:0..0.4,h:finite} or #RRGGBB`),{l:e.l,c:e.c,h:(e.h%360+360)%360}}function Hs(e=Rs){(!Array.isArray(e)||e.length<1)&&zs(`at least one player is required`);let t=e.map((e,t)=>{e&&typeof e==`object`||zs(`players require objects`);let n=String(e.id??`player-${t+1}`);return n.trim()||zs(`player IDs must not be empty`),{id:n,name:String(e.name??`Railway ${t+1}`),color:Vs(e.color??Rs[t%4].color)}});return new Set(t.map(e=>e.id)).size!==t.length&&zs(`player IDs must be unique`),t}function Us(e,t){let n=2166136261;for(let r of`${e}:city:${t}`)n=Math.imul(n^r.charCodeAt(0),16777619);return()=>{n+=1831565813;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ws(e){(!Number.isInteger(e)||e<1||e>10)&&zs(`city levels must be integers from 1 through 10`);let t=[`house`];return e>=2&&t.push(`landmark`),e>=4&&t.push(`apartment`,`plaza`),e>=6&&t.push(`civic`),e>=8&&t.push(`tower`),{radius:[9,10.5,12,13.5,16,19,22,25,28,31][e-1],buildingBudget:[6,10,15,21,28,36,45,55,67,80][e-1],streetWidth:e>=7?.72:e>=4?.62:.52,streetSpacing:e>=4?7.8:5.4,features:t}}var Gs=Object.freeze({house:1.56,landmark:2,apartment:2.05,civic:2.8,plaza:2.6,tower:2.1}),Ks=new WeakMap,qs=1e-8,Js=1.6;function Ys(e,t){let n=e.surface??null,r=t.scale??1,i=t.rotation??0,a=t.y??0,o=Ks.get(t);if(o&&o.surface===n&&o.x===t.x&&o.z===t.z&&o.y===a&&o.rotation===i&&o.scale===r&&o.width===t.width&&o.depth===t.depth&&o.outline===t.footprint)return o;let s=t.footprint??[[-t.width/2,-t.depth/2],[t.width/2,-t.depth/2],[t.width/2,t.depth/2],[-t.width/2,t.depth/2]],c=Ke(e,t.x,a,t.z,i,new tt).elements,l=new Float64Array(s.length*3);for(let e=0;e<s.length;e++){let t=s[e][0]*r,n=s[e][1]*r;l[e*3]=c[0]*t+c[8]*n+c[12],l[e*3+1]=c[1]*t+c[9]*n+c[13],l[e*3+2]=c[2]*t+c[10]*n+c[14]}return o={surface:n,x:t.x,y:a,z:t.z,rotation:i,scale:r,width:t.width,depth:t.depth,outline:t.footprint,points:l,up:[c[4],c[5],c[6]],center:[c[12],c[13],c[14]]},Ks.set(t,o),o}function Xs(e,t,n,r){let i=new Float64Array(e.length/3*2);for(let a=0,o=0;a<e.length;a+=3,o+=2){let s=e[a]-t[0],c=e[a+1]-t[1],l=e[a+2]-t[2];i[o]=s*n[0]+c*n[1]+l*n[2],i[o+1]=s*r[0]+c*r[1]+l*r[2]}return i}function Zs(e,t,n){for(let r of[e,t])for(let i=0;i<r.length;i+=2){let a=(i+2)%r.length,o=r[a]-r[i],s=r[a+1]-r[i+1],c=Math.hypot(o,s);if(c<qs)continue;let l=-s/c,u=o/c,d=1/0,f=-1/0,p=1/0,m=-1/0;for(let t=0;t<e.length;t+=2){let n=e[t]*l+e[t+1]*u;d=Math.min(d,n),f=Math.max(f,n)}for(let e=0;e<t.length;e+=2){let n=t[e]*l+t[e+1]*u;p=Math.min(p,n),m=Math.max(m,n)}if(p-f>=n-qs||d-m>=n-qs)return!0}return!1}function Qs(e,t,n,r=0){let i=Math.max(0,r),a=t.radius??Math.hypot(t.width,t.depth)*(t.scale??1)/2,o=n.radius??Math.hypot(n.width,n.depth)*(n.scale??1)/2,s=J(e,t,n);if(s>=a+o+i)return!1;let c=Ys(e,t),l=Ys(e,n),u=c.center.map((e,t)=>(e+l.center[t])/2),d=c.up.map((e,t)=>e+l.up[t]),f=Math.hypot(...d);if(f<qs)return!0;for(let e=0;e<3;e++)d[e]/=f;let p=Math.abs(d[1])<.9?[d[2],0,-d[0]]:[0,-d[2],d[1]],m=Math.hypot(...p);p=p.map(e=>e/m);let h=[p[1]*d[2]-p[2]*d[1],p[2]*d[0]-p[0]*d[2],p[0]*d[1]-p[1]*d[0]],g=e.surface?.radius,_=g?2*Js*Math.sin(Math.min(Math.PI/2,s/(2*g)))+(a+o)*(1-Math.cos(Math.min(Math.PI/2,(a+o)/g))):0;return!Zs(Xs(c.points,u,p,h),Xs(l.points,u,p,h),i+_)}function $s(e){let t=(Number(e)||1)>>>0;return()=>(t=Math.imul(t,1664525)+1013904223|0,(t>>>0)/4294967296)}function ec(e,t=0){let n=(Math.trunc(e.variant??t)%3+3)%3;return e.detailSeed??(n+1)*7117}function tc(e){let t=e.width/2,n=e.depth/2,r=e.polygon??[[-t,-n],[t,-n],[t,n],[-t,n]],i=r.reduce((e,t,n)=>{let i=r[(n+1)%r.length];return e+t[0]*i[1]-i[0]*t[1]},0);if(Math.abs(i)<1e-8)throw TypeError(`Farm polygons must enclose a nonzero area`);let a=i<0?r.toReversed():r;for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=a[(e+2)%a.length];if((n[0]-t[0])*(r[1]-n[1])-(n[1]-t[1])*(r[0]-n[0])<-1e-8)throw TypeError(`Farm polygons must be convex`)}return a}function nc(e,t,n,r=0){for(let i=0;i<e.length;i++){let a=e[i],o=e[(i+1)%e.length],s=o[0]-a[0],c=o[1]-a[1];if(s*(n-a[1])-c*(t-a[0])<r*Math.hypot(s,c)-1e-8)return!1}return!0}function rc(e,t,n,r){if(!t)return null;let i=e.reduce((t,n)=>[t[0]+n[0]/e.length,t[1]+n[1]/e.length],[0,0]),a=t===`barn`?1.42:t===`bales`?.84:.7,o=Array.isArray(n)&&n.length===2&&n.every(Number.isFinite)?[n]:[],s=Math.floor(r()*e.length);for(let t of[.22,.38,.55,.72])for(let n=0;n<e.length;n++){let r=e[(s+n)%e.length];o.push(r.map((e,n)=>e+(i[n]-e)*t))}o.push(i);let c=o.find(t=>nc(e,...t,a));return c?{center:c,radius:a}:null}var ic=.7;function ac(e){let t=[];for(let[n,r]of(e.parcels??[]).entries()){if(r.crop!==`pasture`)continue;let i=tc(r),a=ec(r,e.variant),o=rc(i,r.feature,r.featurePosition,$s(a)),s=$s(a^2050289553),c=Math.abs(i.reduce((e,t,n)=>{let r=i[(n+1)%i.length];return e+t[0]*r[1]-r[0]*t[1]},0))/2,l=Math.max(2,Math.min(6,Math.round(c/42))),u=[],d=Array.from({length:80},()=>({x:(s()-.5)*r.width,z:(s()-.5)*r.depth,priority:s()*5})),f=o?.center??i.reduce((e,t)=>[e[0]+t[0]/i.length,e[1]+t[1]/i.length],[0,0]);d.sort((e,t)=>Math.hypot(e.x-f[0],e.z-f[1])+e.priority-Math.hypot(t.x-f[0],t.z-f[1])-t.priority);for(let e of[1.1+s()*.35,.65])for(let a of d){if(u.length>=l)break;let c=e+ic;if(!nc(i,a.x,a.z,c+.3)||o&&Math.hypot(a.x-o.center[0],a.z-o.center[1])<c+o.radius+.2||u.some(e=>Math.hypot(a.x-e.x,a.z-e.z)<c+e.radius+.25))continue;let d={kind:`sheep`,parcelIndex:n,x:a.x,z:a.z,rotation:s()*Math.PI*2,scale:1,radius:c,roamRadius:e};u.push(d),t.push({...d,x:a.x+r.x,z:a.z+r.z})}}return t}function oc(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var sc=e=>Math.abs(e.reduce((t,n,r)=>{let i=e[(r+1)%e.length];return t+n[0]*i[1]-i[0]*n[1]},0)/2);function cc(e){return e.reduce((e,t)=>e+sc(t[0])-t.slice(1).reduce((e,t)=>e+sc(t),0),0)}var lc=e=>({minX:Math.min(...e.map(e=>e[0])),maxX:Math.max(...e.map(e=>e[0])),minZ:Math.min(...e.map(e=>e[1])),maxZ:Math.max(...e.map(e=>e[1]))});function uc(e,t,n,r){let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=o[0]*t+o[1]*n-r,l=s[0]*t+s[1]*n-r;if(c<=0&&i.push(o),c<0!=l<0){let e=c/(c-l);i.push([o[0]+(s[0]-o[0])*e,o[1]+(s[1]-o[1])*e])}}return i}var dc=[[`wheat`,`fallow`,`pasture`],[`pasture`,`wheat`,`orchard`],[`orchard`,`pasture`,`wheat`],[`vegetables`,`wheat`,`pasture`]];function fc(e,t,n){let r=oc(`${n}:boundary`),i=e/2-.12,a=t/2-.12,o=()=>.25+r()*Math.min(e,t)*.16;return[[-i+o(),-a],[i-o(),-a],[i,-a+o()],[i,a-o()],[i-o(),a],[-i+o(),a],[-i,a-o()],[-i,-a+o()]]}function pc(e,t,n,r,i){let a=oc(n),o=[i],s=Math.max(1,Math.min(6,Math.round(e*t/(100+a()*65))));for(let e=0;o.length<s&&e<s*5;e++){let e=o.reduce((e,t,n)=>sc(t)>sc(o[e])?n:e,0),t=o[e],n=lc(t),r=(n.maxX-n.minX)*(a()*.45+.8)>n.maxZ-n.minZ,i=(a()-.5)*.65,s=r?1:i,c=r?i:1,l=t.map(([e,t])=>e*s+t*c),u=Math.min(...l),d=u+(Math.max(...l)-u)*(.28+a()*.44),f=.24+a()*.16,p=uc(t,s,c,d-f/2),m=uc(t,-s,-c,-d-f/2);p.length<3||m.length<3||Math.min(sc(p),sc(m))<26||o.splice(e,1,p,m)}return o.map((e,t)=>{let n=lc(e),i=(n.minX+n.maxX)/2,o=(n.minZ+n.maxZ)/2,s=a()<.72?r[0]:r[1+Math.floor(a()*2)],c=Math.floor(a()*1e8),l=e.reduce((t,n)=>[t[0]+n[0]/e.length,t[1]+n[1]/e.length],[0,0]),u=Math.floor(a()*e.length),d=e[u],f=e[(u+1)%e.length],p=[l[0]*.5+(d[0]+f[0])*.25-i,l[1]*.5+(d[1]+f[1])*.25-o];return{x:i,z:o,width:n.maxX-n.minX,depth:n.maxZ-n.minZ,polygon:e.map(([e,t])=>[e-i,t-o]),crop:s,variant:Math.floor(a()*3),rowsAngle:(a()<.2?0:Math.PI/2)+(a()-.5)*.12,rowPitch:.72+a()*.38,tone:.25+a()*.5,detailSeed:c,featurePosition:p,hedgeEdges:e.map((e,t)=>t).filter(()=>a()<.16),feature:t===0&&sc(e)>85&&a()<.2?`barn`:s===`wheat`&&a()<.17?`bales`:s===`pasture`&&a()<.12?`trough`:null}})}function mc(e,{density:t=1,canPlace:n,add:r}={}){if(typeof n!=`function`||typeof r!=`function`)throw TypeError(`Farmland requires canPlace and add callbacks`);let i=(e.biomes?.regions??[]).filter(e=>e.type===`farmland`),a=e.detailRegion,o=i.reduce((e,t)=>e+cc(t.polygons),0),s=a?Math.min(o,(a.maxX-a.minX)*(a.maxZ-a.minZ)):o,c=Math.max(0,Math.min(3,Number(t)||0)),l={districts:[],area:0,cultivatedArea:0,targetArea:s*Math.min(.5,.28*c)};if(!c||!s)return l;let u=[];for(let t of i){let n=oc(`${e.seed}:farmland:${t.id}`),r=(n()-.5)*Math.PI/3,i=Math.cos(r),o=Math.sin(r),s=n()*56,c=n()*56,l=lc(t.polygons.flatMap(e=>e[0]));if(a&&(l.minX=Math.max(l.minX,a.minX),l.maxX=Math.min(l.maxX,a.maxX),l.minZ=Math.max(l.minZ,a.minZ),l.maxZ=Math.min(l.maxZ,a.maxZ)),l.maxX<=l.minX||l.maxZ<=l.minZ)continue;let d=lc([[l.minX,l.minZ],[l.maxX,l.minZ],[l.maxX,l.maxZ],[l.minX,l.maxZ]].map(([e,t])=>[e*i-t*o,e*o+t*i]));for(let n=Math.floor((d.minX-s-38)/56);n<=Math.ceil((d.maxX-s+38)/56);n++)for(let a=Math.floor((d.minZ-c-38)/56);a<=Math.ceil((d.maxZ-c+38)/56);a++){let d=`${t.id}-${n}-${a}`,f=oc(`${e.seed}:farm-cluster:${d}`),p=n*56+s+(f()-.5)*12,m=a*56+c+(f()-.5)*12,h=p*i+m*o,g=-p*o+m*i,_=r+(f()-.5)*.22,v=f()*Math.PI*2,y=dc[Math.floor(f()*dc.length)],b=f()*4;if(!(h<l.minX-38||h>l.maxX+38||g<l.minZ-38||g>l.maxZ+38))for(let t=0;t<28;t++){let n=v+t*2.399963229728653,r=6.2*Math.sqrt(t),i=h+Math.cos(n)*r,a=g+Math.sin(n)*r;if(i<l.minX||i>l.maxX||a<l.minZ||a>l.maxZ)continue;let o=us(e,`farmland`,i,a);if(o<4.1)continue;let s=oc(`${e.seed}:${d}:${t}`);u.push({x:i,z:a,rotation:at(e,i,a,_),clusterId:d,family:y,clearance:o,seed:`${e.seed}:${d}:${t}`,width:22+s()*8,depth:16+s()*8,score:b+Math.min(o,18)*.18-r*.21})}}}u.sort((e,t)=>t.score-e.score||e.x-t.x||e.z-t.z);for(let t of[1,.7,.46])for(let i of u){if(l.area>=l.targetArea)return l;if(i.used)continue;let a=i.width*t,o=i.depth*t,s=Math.hypot(a,o)/2,c=fc(a,o,i.seed),u=null,d=1/0;for(let t of l.districts){let n=J(e,i,t);n<d&&n<s+t.radius+10&&(u=t,d=n)}let f=[];if(u){let t=K(e,u,i),n=dt(e,u.x,u.z,u.rotation),r=Math.cos(n),s=Math.sin(n),c=t.x*r-t.z*s,l=t.x*s+t.z*r,d=e.surface?.type===`sphere`?.65:.44,p=(e,t)=>Math.max(-t,Math.min(t,e)),m=[[(a+u.width)/2+d,p(l,u.depth*.3)],[-(a+u.width)/2-d,p(l,u.depth*.3)],[p(c,u.width*.3),(o+u.depth)/2+d],[p(c,u.width*.3),-(o+u.depth)/2-d]];m.sort((e,t)=>Math.hypot(e[0]-c,e[1]-l)-Math.hypot(t[0]-c,t[1]-l));for(let[t,i]of m){let a=We(e,u.x,u.z,t*r+i*s,-t*s+i*r);f.push({...a,rotation:at(e,a.x,a.z,n),clusterId:u.clusterId,family:u.family})}}f.push(i);let p;for(let t of f){let r=`farm-${i.clusterId}-${i.seed.split(`:`).at(-1)}`,u={kind:`farm`,x:t.x,y:0,z:t.z,width:a,depth:o,radius:s,scale:1,rotation:t.rotation,variant:0,districtId:r,clusterId:t.clusterId,footprint:c};if(!l.districts.some(t=>Qs(e,u,t,.32))&&ds(e,`farmland`,t.x,t.z,ct(e,t.x,t.z,s))&&n(u)){u.family=t.family??i.family,u.parcels=pc(a,o,i.seed,u.family,c),u.livestock=ac(u),p=u;break}}p&&(r(p),i.used=!0,l.districts.push({kind:`farm`,id:p.districtId,clusterId:p.clusterId,x:p.x,z:p.z,width:a,depth:o,radius:s,footprint:c,family:p.family,rotation:p.rotation,parcelCount:p.parcels.length}),l.area+=a*o,l.cultivatedArea+=p.parcels.reduce((e,t)=>e+sc(t.polygon),0))}return l}var hc=new WeakMap,gc=new WeakMap;function _c(e){let t=e=>{let t=[];for(let[n,r]of e){let e=[Math.round(n*1e6)/1e6,Math.round(r*1e6)/1e6],i=t.at(-1);i&&e[0]===i[0]&&e[1]===i[1]||t.push(e)}if(t.length>1&&t[0][0]===t.at(-1)[0]&&t[0][1]===t.at(-1)[1]&&t.pop(),t.length<3)return null;let[n,r]=t,i=r[0]-n[0],a=r[1]-n[1];return t.slice(2).some(e=>Math.abs(i*(e[1]-n[1])-a*(e[0]-n[0]))>1e-12)?[...t,[...t[0]]]:null};return e.flatMap(e=>{let n=t(e[0]);return n?[[n,...e.slice(1).map(t).filter(Boolean)]]:[]})}function vc(e){return e.rivers?e.rivers:(hc.has(e)||hc.set(e,e.river?[e.river]:[]),hc.get(e))}function yc(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Math.max(0,Math.min(1,((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1)));return Math.hypot(e-n.x-i*o,t-n.z-a*o)}function bc(e,t,n){let r=vc(e);gc.has(r)||gc.set(r,Math.max(0,...r.map(e=>e.width/2)));let i=gc.get(r);return xo(r).nearest(t,n,e=>yc(t,n,e.a,e.b)-e.line.width/2,1/0,i)}function xc(e,t,n){return xo(vc(e)).nearest(t,n,e=>yc(t,n,e.a,e.b))}function Sc(e,t){let n=[],r=[];e.forEach((i,a)=>{let o=e[Math.max(0,a-1)],s=e[Math.min(e.length-1,a+1)],c=Math.hypot(s.x-o.x,s.z-o.z)||1,l=(s.z-o.z)/c*t/2,u=-(s.x-o.x)/c*t/2;n.push([i.x+l,i.z+u]),r.push([i.x-l,i.z-u])});let i=n.concat(r.reverse());return[...i,i[0]]}function Cc(e){let t=[[e.outline]],n=vc(e),r=n.map(e=>_c([[Sc(e.points,e.width)]])),i=n.map(e=>_c([[Sc(e.points,e.width+1.6)]]));if(e.lakes?.length&&(r.push(e.lakes),i.push(e.lakes,e.lakeShore??[])),!r.length)return{water:[],banks:[]};let a=_c(en.intersection(t,_c(en.union(...r)))),o=_c(en.intersection(t,_c(en.union(...i))));return{water:_c(a),banks:_c(en.difference(o,a))}}var wc=new WeakMap;function Tc(e){let t=e.terrainSource??e,n=t.hydrology;if(n||=(wc.has(t)||wc.set(t,Cc(t)),wc.get(t)),!e.terrainChunk)return n;let r=[[e.outline]],i=e.bounds?To(n.water,e.bounds):n.water,a=e.bounds?To(n.banks,e.bounds):n.banks;return{water:_c(en.intersection(i,r)),banks:_c(en.intersection(a,r))}}function Ec(e,t,n,r){let i=e.surface?.projection;if(i?.type!==`equirectangular`)return[po(t,n,r)];let a=Math.PI*i.radius,o=a*2;if(r>=a)return[{minX:-a,maxX:a,minZ:n-r,maxZ:n+r}];let s=t>=-a&&t<a?t:((t+a)%o+o)%o-a,c=po(s,n,r),l=[c];return c.minX<=-a&&l.push(po(s+o,n,r)),c.maxX>=a&&l.push(po(s-o,n,r)),l}function Dc(e,t){let{a:n,b:r}=e,i=0,a=1;for(let[e,o,s,c]of[[n.x,r.x-n.x,t.minX,t.maxX],[n.z,r.z-n.z,t.minZ,t.maxZ]]){if(Math.abs(o)<1e-14){if(e<s||e>c)return null;continue}let t=(s-e)/o,n=(c-e)/o;if(i=Math.max(i,Math.min(t,n)),a=Math.min(a,Math.max(t,n)),i>a)return null}return i===0&&a===1?e:{a:{x:n.x+(r.x-n.x)*i,z:n.z+(r.z-n.z)*i},b:{x:n.x+(r.x-n.x)*a,z:n.z+(r.z-n.z)*a}}}function Oc(e,t,n,r,i){let a=[];for(let o of Ec(e,n,r,i))for(let e of t.query(o)){let t=Dc(e,o);t&&a.push(t)}return a}var kc=new WeakMap,Ac=new q,jc=(e,t,n)=>Math.max(t,Math.min(n,e));function Mc(e,t){let n=wt(e);if(!n)return null;let r=t.alignment??t.points,i=kc.get(r);i||(i=new WeakMap,kc.set(r,i));let a=i.get(n);if(a)return a;let o=t.distances?.length?t.distances:[0,t.length],s=[0];for(let e=1;e<o.length;e++){let t=o[e-1],n=o[e],r=Math.max(1,Math.ceil((n-t)/.5));for(let e=1;e<=r;e++)s.push(t+(n-t)*e/r)}let c=new Float64Array(s.length),l=new Float64Array(s.length),u=n=>{let r=_l(t,n);return Dt(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,Ac).length()*(r.chartSpeed??1)};l[0]=u(0);for(let e=1;e<s.length;e++)l[e]=u(s[e]),c[e]=c[e-1]+(s[e]-s[e-1])*(l[e-1]+4*u((s[e-1]+s[e])/2)+l[e])/6;return a={chart:Float64Array.from(s),physical:c,speed:l,length:c.at(-1),chartLength:t.length},i.set(n,a),a}function Nc(e,t){let n=0,r=e.length-1;for(;n+1<r;){let i=n+r>>1;e[i]<=t?n=i:r=i}return n}function Pc(e,t,n){let r=e.chart[t+1]-e.chart[t],i=e.physical[t],a=e.physical[t+1],o=e.speed[t]*r,s=e.speed[t+1]*r;return i+n*(o+n*(3*(a-i)-2*o-s+n*(2*(i-a)+o+s)))}function Fc(e,t){if(!e)return t;let n=jc(t,0,e.chartLength),r=Nc(e.chart,n);return Pc(e,r,(n-e.chart[r])/(e.chart[r+1]-e.chart[r]))}function Ic(e,t){if(!e)return t;let n=jc(t,0,e.length),r=Nc(e.physical,n),i=e.physical[r],a=e.physical[r+1],o=e.chart[r+1]-e.chart[r],s=e.speed[r]*o,c=e.speed[r+1]*o,l=(n-i)/(a-i||1);for(let t=0;t<3;t++){let t=s+l*(2*(3*(a-i)-2*s-c)+3*l*(2*(i-a)+s+c));if(t<1e-12)break;l=jc(l-(Pc(e,r,l)-n)/t,0,1)}return e.chart[r]+o*l}function Lc(e,t,n){if(!wt(e))return n;let r=new q,i=new q,a=1;for(let n of t){Dt(e,n.x,0,n.z,1,0,0,r),Dt(e,n.x,0,n.z,0,0,1,i);let t=r.lengthSq(),o=r.dot(i),s=i.lengthSq(),c=Math.hypot(t-s,2*o),l=Math.max(1e-8,(t+s-c)/2),u=Math.sqrt((t+s+c)/2);a=Math.max(a,u/l)}return n*a*(1.025+n*a/wt(e).radius*2)}function Rc(e,t,n){let r;try{return Ds(e,t,n)}catch(e){r=e}let i=n.waypoints??[];if(n.world)try{return zc(n.world,e,t,n)}catch{}if(!i.length)throw r;let a=[e,...i,t],o=a.map((e,t)=>{if(t===0||t===a.length-1||Number.isFinite(e.heading))return[{pose:e,penalty:0}];let r=Math.atan2(a[t+1].z-a[t-1].z,a[t+1].x-a[t-1].x);return Array.from({length:31},(t,i)=>{let a=(i-15)*.1;return{pose:{...e,heading:r+a},penalty:Math.abs(a)*n.radius*.05}})}),s=o[0].map(e=>({...e,cost:0,parts:[]}));for(let e=1;e<o.length;e++){let t=[];for(let r of o[e]){let e=null;for(let t of s){let i;try{i=Ds(t.pose,r.pose,{...n,waypoints:[]})}catch{continue}let a=t.cost+i.length+r.penalty;(!e||a<e.cost)&&(e={...r,cost:a,parts:[...t.parts,i]})}e&&t.push(e)}if(!t.length)throw r;s=t}return s.sort((e,t)=>e.cost-t.cost),Es(s[0].parts,n.radius)}function zc(e,t,n,r){let i=[t,...r.waypoints??[],n],a={x:(t.x+n.x)/2,z:(t.z+n.z)/2},o=Ne(e,a.x,a.z,new tt),s=Bc(o,0),c=Bc(o,2),l=Dt(e,a.x,0,a.z,1,0,0,new q),u=Dt(e,a.x,0,a.z,0,0,1,new q),d=l.dot(s),f=u.dot(s),p=l.dot(c),m=u.dot(c),h=d*m-f*p;if(Math.abs(h)<1e-8)throw RangeError(`A railway cannot use a singular pole chart`);let g={x:a.x,z:a.z,xx:m/h,xz:-f/h,zx:-p/h,zz:d/h},_=e=>{let t=e.x-a.x,n=e.z-a.z,r={...e,x:d*t+f*n,z:p*t+m*n};return Number.isFinite(e.heading)&&(r.heading=Math.atan2(p*Math.cos(e.heading)+m*Math.sin(e.heading),d*Math.cos(e.heading)+f*Math.sin(e.heading))),r},v=1;for(let t of i){Dt(e,t.x,0,t.z,g.xx,0,g.zx,l),Dt(e,t.x,0,t.z,g.xz,0,g.zz,u);let n=l.lengthSq(),r=l.dot(u),i=u.lengthSq(),a=Math.hypot(n-i,2*r);v=Math.max(v,Math.sqrt((n+i+a)/2)/Math.max(1e-8,(n+i-a)/2))}let y=r.physicalRadius??r.radius,b=y*v*(1.015+y*v/e.surface.radius*2),x=r.isAllowed??(()=>!0),S=e=>({x:g.x+g.xx*e.x+g.xz*e.z,z:g.z+g.zx*e.x+g.zz*e.z}),C=Rc(_(t),_(n),{...r,world:null,radius:b,waypoints:(r.waypoints??[]).map(_),isAllowed:e=>x(S(e))});for(let e of C.segments)e.chartTransform=g;return C}var Bc=(e,t)=>new q().setFromMatrixColumn(e,t),Vc=Object.freeze({seed:27,width:130,depth:95,cityRadius:9.6,riverWidth:5.4,groundY:0,waterY:-1.2,railY:.42,sampleSpacing:.35,minTurnRadius:8,throatLength:4}),Q=Object.freeze({trackHalfWidth:1.05,routeEdge:1.35,cuttingHalfWidth:1.08,track:1.45,riverBank:.8,mountain:.35,objects:.32,street:.28,worldEdge:.75,city:1.25,stationOffset:3,stationLength:6.4,stationWidth:2.4,stationEndDistance:7,tunnelRoofHeight:3.9,tunnelArchRadius:1.4,tunnelArchSpring:1.8,tunnelRockCover:.1,bridgeBank:2.2,maximumGrade:.12}),Hc=1e-7,Uc=(e,t,n)=>Math.max(t,Math.min(n,e)),Wc=(e,t,n)=>e+(t-e)*n,Gc=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Kc=(e,t=Vc.railY)=>Array.isArray(e)?{x:Number(e[0]),y:t,z:Number(e.length>2?e[2]:e[1])}:{x:Number(e.x),y:t,z:Number(e.z)},qc=e=>Number.isFinite(e.x)&&Number.isFinite(e.z);function Jc(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Yc(e,t,n,r){let i=r.x-n.x,a=r.z-n.z,o=Uc(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-Wc(n.x,r.x,o),t-Wc(n.z,r.z,o))}var Xc=new WeakMap,Zc=new WeakMap,Qc=new WeakMap;function $c(e){return e.points.slice(1).flatMap((t,n)=>{let r=e.points[n],i=e.period;if(i&&Math.abs(t.x-r.x)>i/2){let e=t.x-Math.sign(t.x-r.x)*i,a=Math.sign(r.x)*i/2,o=(a-r.x)/(e-r.x),s={x:a,z:Wc(r.z,t.z,o)},c={...s,x:-a};return[{a:r,b:s,index:n,box:ho([r,s])},{a:c,b:t,index:n,box:ho([c,t])}]}return[{a:r,b:t,index:n,box:ho([r,t])}]})}function el(e){let t=Xc.get(e);return t&&t.count===e.points.length||(t={count:e.points.length,tree:new vo($c(e),e=>e.box),box:ho(e.points)},Xc.set(e,t)),t}function tl(e){return xo(e.lines)}function nl(e,t,n=0){let r=Zc.get(e);for((!r||r.count>e.length)&&(r={count:0,grid:new yo},Zc.set(e,r));r.count<e.length;){let t=e[r.count++];r.grid.insert(t,po(t.x,t.z,t.radius??0))}return r.grid.query(po(t.x,t.z,t.radius+n))}var rl=(e,t,n=t.radius)=>ct(e,t.x,t.z,n);function il(e,t,n,r=0){if(!e.surface)return nl(t,n,r);let i=Qc.get(t);for((!i||i.count>t.length)&&(i={count:0,grid:new yo},Qc.set(t,i));i.count<t.length;){let n=t[i.count++];for(let t of Ec(e,n.x,n.z,rl(e,n,n.radius??0)))i.grid.insert(n,t)}let a=Ec(e,n.x,n.z,rl(e,n,n.radius+r));return a.length===1?i.grid.query(a[0]):[...new Set(a.flatMap(e=>i.grid.query(e)))]}function al(e,t,n,r){return Yc(0,0,K(e,t,n),K(e,t,r))}function ol(e,t,n,r,i=1/0){if(!e.surface)return Math.min(i,cl(t,n,r));let a={x:n,z:r};if(!Number.isFinite(i))for(let n of t.points)i=Math.min(i,J(e,a,n));if(!Number.isFinite(i)||i===0)return i;let o=Oc(e,el(t).tree,n,r,rl(e,a,i)),s=i;for(let{a:t,b:n}of o)s=Math.min(s,al(e,a,t,n));return s}function sl(e,t,n,r){if(!e.surface)return Math.min(r,ll(e,t,n));let i={x:t,z:n},a=Oc(e,tl(e),t,n,rl(e,i,r)),o=r;for(let{a:t,b:n}of a)o=Math.min(o,al(e,i,t,n));return o}function cl(e,t,n){if(e.points.length>32)return el(e).tree.nearest(t,n,e=>Yc(t,n,e.a,e.b));let r=1/0;for(let i=1;i<e.points.length;i++)r=Math.min(r,Yc(t,n,e.points[i-1],e.points[i]));return r}function ll(e,t,n){return tl(e).nearest(t,n,e=>Yc(t,n,e.a,e.b))}function ul(e,t,n){return xc(e,t,n)}function dl(e,t,n,r=0){if(e.surface?.complete&&e.surface.projection.type===`equirectangular`){let r=e.surface.projection,i=r.centralLatitude*Math.PI/180-n/r.radius;return Number.isFinite(t)&&Number.isFinite(i)&&Math.abs(i)<=Math.PI/2+1e-10}let i=!1,a=e.outline;for(let e=0,r=a.length-1;e<a.length;r=e++){let o=a[e],s=a[r];o[1]>n!=s[1]>n&&t<(s[0]-o[0])*(n-o[1])/(s[1]-o[1])+o[0]&&(i=!i)}if(!i)return!1;if(r<=0)return!0;for(let e=0;e<a.length;e++){let i=a[e],o=a[(e+1)%a.length];if(Yc(t,n,{x:i[0],z:i[1]},{x:o[0],z:o[1]})<r)return!1}return!0}function fl(e,t,n){return Fs(e,t,n)}function pl(e,t,n){let r=Vc.groundY;for(let i of e.mountains)r=Math.max(r,fl(i,t,n));return r}function ml(e,t,n){if(!dl(e,t,n))return{type:`outside`,height:-5};if(bc(e,t,n)<0)return{type:`water`,height:e.river.y};if(e.biomes){let r=ls(e,t,n);if(r===`ocean`)return{type:`ocean`,height:e.river.y};if(r===`shore`)return{type:`shore`,height:e.river.y*(1-Uc(-us(e,`ocean`,t,n)/e.biomes.shoreWidth,0,1))}}let r=pl(e,t,n);return{type:r>0?`mountain`:`ground`,height:r}}function hl(e,t,n=Vc.sampleSpacing){let r=[];for(let i=1;i<e.length;i++){let a=e[i-1],o=e[i],s=Math.max(1,Math.ceil(Gc(a,o)/n));for(let e=0;e<s;e++)i>1&&e===0&&Gc(a,r.at(-1))<Hc||r.push({x:Wc(a.x,o.x,e/s),y:t,z:Wc(a.z,o.z,e/s)})}r.push({...e.at(-1),y:t});let i=[0];for(let e=1;e<r.length;e++)i.push(i[e-1]+Gc(r[e-1],r[e]));return{points:r,distances:i,length:i.at(-1)}}function gl(e,t=4){if(e.length<3)return e;let n=[e[0]];for(let r=1;r<e.length-1;r++){let i=e[r-1],a=e[r],o=e[r+1],s=Gc(i,a),c=Gc(a,o);if(s<Hc||c<Hc)continue;let l=Math.min(t,s*.3,c*.3),u={x:a.x+(i.x-a.x)*l/s,z:a.z+(i.z-a.z)*l/s},d={x:a.x+(o.x-a.x)*l/c,z:a.z+(o.z-a.z)*l/c};n.push(u);for(let e=1;e<=10;e++){let t=e/10,r=1-t;n.push({x:r*r*u.x+2*r*t*a.x+t*t*d.x,z:r*r*u.z+2*r*t*a.z+t*t*d.z})}}return n.push(e.at(-1)),n}function _l(e,t){if(e.alignment)return ws(e.alignment,t);let n=Uc(t,0,e.length),r=0,i=e.distances.length-1;for(;r+1<i;){let t=r+i>>1;e.distances[t]<=n?r=t:i=t}let a=e.points[r],o=e.points[i],s=e.distances[i]-e.distances[r],c=s>Hc?(n-e.distances[r])/s:0,l=o.x-a.x,u=o.y-a.y,d=o.z-a.z,f=Math.hypot(l,u,d)||1;return{x:Wc(a.x,o.x,c),y:Wc(a.y,o.y,c),z:Wc(a.z,o.z,c),distance:n,tangent:{x:l/f,y:u/f,z:d/f},angle:Math.atan2(l,d)}}function vl(e,t){let n=[],r=t(e.points[0],0)<=0?0:null;for(let i=1;i<e.points.length;i++){let a=e.points[i-1],o=e.points[i],s=t(a,e.distances[i-1]),c=t(o,e.distances[i]);if(s<=0==c<=0)continue;let l=0,u=1;for(let n=0;n<18;n++){let n=(l+u)/2,r=Wc(e.distances[i-1],e.distances[i],n);t(e.alignment?_l(e,r):{x:Wc(a.x,o.x,n),z:Wc(a.z,o.z,n)},r)<=0==s<=0?l=n:u=n}let d=Wc(e.distances[i-1],e.distances[i],(l+u)/2);s>0?r=d:(d-(r??0)>.01&&n.push({start:r??0,end:d}),r=null)}return r!==null&&e.length-r>.01&&n.push({start:r,end:e.length}),n.map(t=>({...t,entry:_l(e,t.start),exit:_l(e,t.end)}))}function yl(e,t){return[[-.5,-.22],[-.43,-.43],[-.2,-.5],[.22,-.5],[.44,-.4],[.5,-.17],[.5,.23],[.4,.44],[.18,.5],[-.22,.5],[-.44,.39],[-.5,.12]].map(([n,r])=>[n*e,r*t])}function bl(e,t){if(!e)throw TypeError(`Invalid world: ${t}`)}function xl(e,t,n){if(e.cities){bl(Array.isArray(e.cities)&&(e.cities.length>=2||e.gameplay&&e.cities.length===0),`at least two cities are required outside settlement mode`);let t=e.cities.map((e,t)=>({...e,id:String(e.id??`city-${t+1}`),...Kc(e,0),radius:e.radius??Ws(e.level??3).radius,stationIds:[]}));return bl(t.every(e=>qc(e)&&Number.isFinite(e.radius)&&e.radius>0),`cities require finite x/z and positive radii`),bl(new Set(t.map(e=>e.id)).size===t.length,`city IDs must be unique`),t}let r=[[`westhaven`,-47,25],[`pineford`,-43,-20],[`summit`,-16,-29],[`alder`,16,-27],[`eastmere`,46,-17],[`sunfield`,47,23],[`meadow`,16,30],[`willow`,-16,23]];bl(Number.isFinite(Number(e.cityCount??8)),`cityCount must be finite`);let i=Uc(Math.round(e.cityCount??8),3,20),a=Math.min(t.width/130,t.depth/95);return i===8?r.map(([e,r,i])=>({id:e,x:r*t.width/130+(n()-.5)*2.6*a,z:i*t.depth/95+(n()-.5)*2.6*a,y:0,radius:Vc.cityRadius*a,stationIds:[]})):Array.from({length:i},(e,r)=>{let o=Math.PI*2*r/i+.35+(n()-.5)*.14;return{id:`city-${r+1}`,x:Math.cos(o)*t.width*.35,z:Math.sin(o)*t.depth*.32,y:0,radius:Math.min(Vc.cityRadius*a,Math.min(t.width,t.depth)*1.05/i),stationIds:[]}})}function Sl(e,t={}){let n=e.platform?.width??e.width??0,r=e.platform?.length??e.length??0,i=dt(t,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i);return[[-r/2,-n/2],[r/2,-n/2],[r/2,n/2],[-r/2,n/2]].map(([n,r])=>We(t,e.x,e.z,n*a+r*o,-n*o+r*a))}function Cl(e,t,n,r){let i=(e,t,n)=>(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x);return i(e,t,n)*i(e,t,r)<-1e-7&&i(n,r,e)*i(n,r,t)<-1e-7}function wl(e,t,n,r={}){let i=dt(r,e.x,e.z,e.rotation??0),a=Math.cos(i),o=Math.sin(i),s=K(r,e,{x:t,z:n}),c=s.x,l=s.z,u=c*a-l*o,d=c*o+l*a;return Math.hypot(Math.max(0,Math.abs(u)-e.platform.length/2),Math.max(0,Math.abs(d)-e.platform.width/2))}function Tl(e,t,n={}){if(n.surface){let r={...e,x:0,z:0,rotation:dt(n,e.x,e.z,e.rotation??0)},i=Sl(r),a=rl(n,e,e.radius+Q.trackHalfWidth+.3),o=1/0;for(let s of Oc(n,el(t).tree,e.x,e.z,a)){let t=K(n,e,s.a),a=K(n,e,s.b);o=Math.min(o,wl(r,t.x,t.z),wl(r,a.x,a.z));for(let e=0;e<4;e++){if(Cl(t,a,i[e],i[(e+1)%4]))return 0;o=Math.min(o,Yc(i[e].x,i[e].z,t,a))}}return o}let r=Sl(e);return el(t).tree.nearest(e.x,e.z,t=>{let{a:n,b:i}=t,a=Math.min(wl(e,n.x,n.z),wl(e,i.x,i.z));for(let e=0;e<4;e++){if(Cl(n,i,r[e],r[(e+1)%4]))return 0;a=Math.min(a,Yc(r[e].x,r[e].z,n,i))}return a},1/0,e.radius??Math.hypot(e.platform.length,e.platform.width)/2)}function El(e){let t=[];for(let n of e.cities){let r=[];for(let i of e.lines){if(i.from!==n.id&&i.to!==n.id)continue;let a=i.from===n.id,o=Mc(e,i),s=o?.length??i.length;for(let c of[0,7,8.5,10]){if(s<c*2+1)continue;let l=Ic(o,a?c:s-c),u=_l(i,l);for(let a of[-1,1]){let o=dt(e,u.x,u.z,u.angle),s=-Math.cos(o),d=Math.sin(o),f=We(e,u.x,u.z,s*Q.stationOffset*a,d*Q.stationOffset*a),p=K(e,f,u),m={id:`station-${n.id}`,kind:`station`,cityId:n.id,ownerId:n.ownerId,lineId:i.id,distance:l,...f,y:0,rotation:at(e,f.x,f.z,Math.atan2(p.x,p.z)),side:a,radius:Math.hypot(Q.stationLength/2,Q.stationWidth/2),platform:{width:Q.stationWidth,length:Q.stationLength}},h=rl(e,m,m.radius+Q.worldEdge);if(!dl(e,m.x,m.z,h)||e.biomes&&!ds(e,[`farmland`,`forest`,`plains`,`desert`],m.x,m.z,rl(e,m))||e.mountains.some(t=>Ls(t,m.x,m.z)<rl(e,m,m.radius+Q.mountain))||(e.surface?bc(e,m.x,m.z)<rl(e,m,m.radius+Q.riverBank):vc(e).some(e=>Tl(m,e)<e.width/2+Q.riverBank))||e.lines.some(t=>Ec(e,m.x,m.z,rl(e,m,m.radius+Q.trackHalfWidth+.25)).some(e=>mo(e,el(t).box))&&Tl(m,t,e)<Q.trackHalfWidth+.25)||t.some(t=>J(e,m,t)<m.radius+t.radius+Q.objects))continue;let g=J(e,m,n)+c*.05;r.push({station:m,score:g})}}}if(r.sort((e,t)=>e.score-t.score),r.length){let e=r[0].station;t.push(e),n.stationIds.push(e.id)}}e.stations=t;for(let n of e.lines){let e=t.filter(e=>e.lineId===n.id);n.stationIds=e.map(e=>e.id);for(let t of n.stops){let n=e.find(e=>e.cityId===t.cityId);n&&(t.distance=n.distance)}}}function Dl(e,t,{cityId:n=null,keepOutsideCities:r=!1}={}){let i=t.radius;if(e.gameplay?.reservations?.some(n=>J(e,t,n)<i+n.radius)||!dl(e,t.x,t.z))return!1;if(e.detailRegion&&!n){let n=e.detailRegion,r=rl(e,t,i+Q.objects/2);if(t.x-r<n.minX||t.x+r>n.maxX||t.z-r<n.minZ||t.z+r>n.maxZ)return!1}return!(e.biomes&&!ds(e,[`farmland`,`forest`,`plains`,`desert`],t.x,t.z,rl(e,t))||!dl(e,t.x,t.z,rl(e,t,i+Q.worldEdge))||sl(e,t.x,t.z,i+Q.track)<i+Q.track||bc(e,t.x,t.z)<rl(e,t,i+Q.riverBank)||nl(e.mountains,{...t,radius:rl(e,t,i+Q.mountain)}).some(n=>Ls(n,t.x,t.z)<rl(e,t,i+Q.mountain))||r&&il(e,e.cities,t,Q.city).some(n=>J(e,t,n)<n.radius+i+Q.city)||n&&il(e,e.cities,t,e.detailRegion?Q.objects:0).some(r=>r.id!==n&&J(e,t,r)<r.radius+(e.detailRegion?i+Q.objects:i*.5))||il(e,e.stations,t,Q.objects).some(n=>J(e,t,n)<i+n.radius+Q.objects)||il(e,e.placements,t,Q.objects).some(n=>J(e,t,n)<i+n.radius+Q.objects&&(t.kind!==`farm`||n.kind!==`farm`||Qs(e,t,n,Q.objects)))||(e.cityStreets??[]).some(n=>ol(e,n,t.x,t.z,i+n.width/2+Q.street)<i+n.width/2+Q.street))}function Ol(e,t=e.cities){let n=[`farmland`,`forest`,`plains`,`desert`],r=e.surface?.complete&&e.surface.projection.type===`equirectangular`?2*Math.PI*e.surface.projection.radius:void 0,i=(t,n)=>J(e,t,n),a=(t,n,r)=>ol(e,t,n,r,8);for(let o of t){let t=o.development,s=Us(e.seed,o.id),c=o.railAxis??{x:1,z:0},l=dt(e,o.x,o.z,Math.atan2(c.x,c.z)),u={x:Math.sin(l),z:Math.cos(l)},d={x:-u.z,z:u.x},f=t.streetWidth,p=t.streetSpacing,m=(t,n,r)=>We(e,o.x,o.z,u.x*t+d.x*n*r,u.z*t+d.z*n*r),h=t=>{let r=f/2+.12;return!(i(t,o)>o.radius-r||!dl(e,t.x,t.z,rl(e,t,r+Q.worldEdge))||!ds(e,n,t.x,t.z,rl(e,t,r))||sl(e,t.x,t.z,Q.track+r)<Q.track+r||bc(e,t.x,t.z)<rl(e,t,Q.riverBank+r)||e.mountains.some(n=>Ls(n,t.x,t.z)<rl(e,t,r+Q.mountain))||il(e,e.cities,{...t,radius:r},e.detailRegion?Q.objects:0).some(n=>n.id!==o.id&&i(t,n)<n.radius+(e.detailRegion?r+Q.objects:r*.5))||il(e,e.stations,{...t,radius:r}).some(n=>wl(n,t.x,t.z,e)<r))},g=t=>{for(let n=1;n<t.length;n++){let r=t[n-1],a=t[n],o=Math.max(1,Math.ceil(i(r,a)/.6)),s=K(e,r,a);for(let t=0;t<=o;t++)if(!h(We(e,r.x,r.z,s.x*t/o,s.z*t/o)))return!1}return!0},_=e.stations.find(e=>e.cityId===o.id),v=_?K(e,o,_):null,y=_?Math.sign(v.x*d.x+v.z*d.z):s()<.5?1:-1,b=t=>{let n=Us(e.seed,`${o.id}:lanes:${t}`),s=[],c=[],l=t===y?5.1:3.7,u=m((n()-.5)*o.radius*.12,Math.max(l+.6,o.radius*.46),t),d=[];for(let e=l;e<o.radius-2;e+=3.2)for(let n=-o.radius*.7;n<=o.radius*.7;n+=2.5){let r=m(n,e,t);d.push({p:r,score:n*n+(e-l)**2})}d.sort((e,t)=>e.score-t.score);for(let{p:e}of d)if(h(e)){s.push(e);break}if(!s.length)return{side:t,edges:c,center:u};let _=(t,n,r)=>{let a=i(t,n),o=K(e,t,n),s=-o.z/a,c=o.x/a,l=Math.max(3,Math.ceil(a/1.1));return Array.from({length:l+1},(i,a)=>{if(a===0)return t;if(a===l)return n;let u=a/l,d=Math.sin(Math.PI*u)*r;return We(e,t.x,t.z,o.x*u+s*d,o.z*u+c*d)})},v=e=>c.some(t=>{let n=[e[0],e.at(-1)].filter(e=>e===t.points[0]||e===t.points.at(-1));return e.some(e=>!n.some(t=>i(e,t)<2.1)&&a(t,e.x,e.z)<f+1.15)}),b=Math.max(2,Math.ceil((o.radius/7.5)**2));for(let a=0;a<(o.radius<14?280:900)&&s.length<b;a++){let a=n()*Math.PI*2,u=Math.sqrt(n()),d=Math.cos(a)*o.radius*.77*u,y=Math.max(l+.6,o.radius*.46)+Math.sin(a)*Math.max(2,o.radius*.34)*u,b=m(d,y,t);if(i(b,o)>o.radius-1.7)continue;let x=s.map(e=>({node:e,distance:i(e,b)})).sort((e,t)=>e.distance-t.distance);if(x[0].distance<p*.72||x[0].distance>p*1.65||!h(b))continue;let S=x[0].node;if(c.some(t=>{let n=t.points[0]===S?t.points[1]:t.points.at(-1)===S?t.points.at(-2):null;if(!n)return!1;let r=K(e,S,n),a=K(e,S,b);return(r.x*a.x+r.z*a.z)/(i(n,S)*i(b,S))>.73}))continue;let C=_(S,b,(n()-.5)*Math.min(1.8,x[0].distance*.2));g(C)&&!v(C)&&(s.push(b),c.push({points:C,width:f,...r?{period:r}:{}}))}if(o.level>=4){let e=[];for(let t=0;t<s.length;t++)for(let n=t+1;n<s.length;n++){let r=s[t],a=s[n],o=i(r,a);o>p*1.5||c.some(e=>e.points[0]===r&&e.points.at(-1)===a||e.points[0]===a&&e.points.at(-1)===r)||e.push({a:r,b:a,d:o})}e.sort((e,t)=>e.d-t.d);let t=0;for(let{a:i,b:a,d:s}of e){if(t>=Math.floor(o.level/3))break;let e=_(i,a,(n()-.5)*Math.min(1.2,s*.14));g(e)&&!v(e)&&(c.push({points:e,width:f,...r?{period:r}:{}}),t++)}}if(!c.length)for(let e of[-1,1]){let i=m(e*2.8,l+n()*.6,t),a=_(s[0],i,.2*e);if(g(a)){c.push({points:a,width:f,...r?{period:r}:{}});break}}return{side:t,edges:c,center:u}},x=[b(1),b(-1)];for(let t of x){let n=Gs.house*.9,r=n+f/2+Q.street+.1;t.capacity=0;for(let s of t.edges)for(let c=1;c<s.points.length;c++){let l=s.points[c-1],u=s.points[c],d=i(l,u);for(let s of[-1,1]){let c=K(e,l,u),p={...We(e,l.x,l.z,c.x/2-c.z/d*r*s,c.z/2+c.x/d*r*s),radius:n};i(p,o)+n<=o.radius&&Dl(e,p,{cityId:o.id})&&t.edges.every(e=>a(e,p.x,p.z)>=n+f/2+Q.street)&&(t.capacity+=d)}}}x.sort((e,t)=>t.capacity-e.capacity||(e.side===y?-1:1));let S=x[0],C=S.edges.map((e,t)=>({id:`street-${o.id}-${t+1}`,cityId:o.id,ownerId:o.ownerId,...e}));if(e.cityStreets.push(...C),t.streetCount=C.length,t.connectionCount=e.lines.filter(e=>e.from===o.id||e.to===o.id).length,!C.length)continue;let w=C.flatMap(e=>e.points.slice(1).map((t,n)=>({a:e.points[n],b:t,length:i(e.points[n],t)}))),T=t.features.filter(e=>e!==`house`).reverse(),E=e=>{if(e<3)return`house`;if(e<T.length+3)return T[e-3];let t=s();return o.level>=8&&t<.12?`tower`:o.level>=4&&t<(o.level>=8?.38:.25)?`apartment`:`house`},D=0,O=[],k=new Map,A=t=>{if(k.has(t))return k.get(t);let n=Us(e.seed,`${o.id}:lots:${t}`),r=[];for(let{a,b:s,length:c}of w){let l=K(e,a,s),u=l.x/c,d=l.z/c,p=Math.max(1,Math.ceil(c/.72));for(let s=0;s<p;s++)for(let c of[-1,1])for(let m=0;m<(t===`house`?2:1);m++){let h=(s+.18+n()*.64)/p,g=t===`house`?.86+n()*.1:.9+n()*.09,_=Gs[t]*g,v=_+f/2+Q.street+.06+n()*.12+m*(2.8+Q.objects),y=We(e,a.x,a.z,l.x*h-d*v*c,l.z*h+u*v*c),b=We(e,a.x,a.z,l.x*h,l.z*h),x=K(e,y,b),C={kind:t,cityId:o.id,ownerId:o.ownerId,...y,y:0,radius:_,scale:g,variant:Math.floor(n()*8),rotation:at(e,y.x,y.z,Math.atan2(x.x,x.z))};if(i(C,o)+_>o.radius||!Dl(e,C,{cityId:o.id}))continue;let w=O.length?Math.min(...O.map(e=>i(C,e)-_-e.radius)):1/0;r.push({item:C,neighbor:w,score:i(C,S.center)*.3+m*.4})}}return k.set(t,r),r},j=t=>{let n=A(t),r=null,a=1/0;for(let e of n){if(e.blocked)continue;let t=e.score+(Number.isFinite(e.neighbor)?e.neighbor*1.8:0);t<a&&(r=e,a=t)}if(!r)return!1;let s={...r.item,id:`city-${o.id}-building-${D+1}`,biome:ls(e,r.item.x,r.item.z)};e.placements.push(s),O.push(s),D++;for(let e of k.values())for(let t of e){if(t.blocked)continue;let e=i(s,t.item)-s.radius-t.item.radius;e<Q.objects?t.blocked=!0:t.neighbor=Math.min(t.neighbor,e)}return!0};for(let e=0;e<t.buildingBudget;e++)j(E(e));for(let e=0;D<t.buildingBudget&&e<3;)j(`house`)?e=0:e++;t.placedBuildings=D,t.placedFeatures=[...new Set(O.map(e=>e.kind))]}}function kl(e,t,n){let r=n=>e.placements.push({id:e.detailRegion?`asset-${e.detailRegion.minX}-${e.detailRegion.minZ}-${e.placements.length+1}`:`asset-${e.placements.length+1}`,y:0,rotation:t()*Math.PI*2,biome:ls(e,n.x,n.z),...n}),i=e.detailRegion,a=Math.sqrt((i?(i.maxX-i.minX)*(i.maxZ-i.minZ):e.bounds.width*e.bounds.depth)/12350),o=t=>!e.surface?.complete||dl(e,t.x,t.z)&&us(e,`ice`,t.x,t.z)<-rl(e,t);if(e.farmland=mc(e,{density:n,canPlace:t=>o(t)&&Dl(e,t,{keepOutsideCities:!0}),add:r}),n<=0)return;let s=i??{minX:-e.bounds.width*.47,maxX:e.bounds.width*.47,minZ:-e.bounds.depth*.47,maxZ:e.bounds.depth*.47},c=e=>(e=Uc(e,0,1),e*e*(3-2*e)),l=(t,r,i,a=!0)=>{t/=Math.sqrt(Math.min(2,n));let o=(s.maxX-s.minX)*(s.maxZ-s.minZ);t=Math.max(t,Math.sqrt(o/i));let c=[];for(let n=Math.floor(s.minZ/t);n<=Math.floor(s.maxZ/t);n++)for(let i=Math.floor(s.minX/t);i<=Math.floor(s.maxX/t);i++){let a=Jc(`${e.seed}:landscape:${r}:${i}:${n}`),o=(i+.08+a()*.84)*t,l=(n+.08+a()*.84)*t;o<s.minX||o>=s.maxX||l<s.minZ||l>=s.maxZ||!dl(e,o,l)||c.push({x:o,z:l,rng:a,priority:a()})}return a?c.sort((e,t)=>e.priority-t.priority):c},u=(t,n,r=!1)=>(r?us(e,`ice`,t.x,t.z)>=rl(e,t):o(t))&&ds(e,n,t.x,t.z,rl(e,t))&&Dl(e,t,{keepOutsideCities:!0}),d=Math.round(310*n*a),f={},p=0,m=l(2.2,`canopy`,12e3,!1).filter(t=>(t.biome=ls(e,t.x,t.z),t.biome!==`forest`&&t.biome!==`plains`||(t.ecology=Vt(e,t.x,t.z),t.ecology.ecoregion===`polar`)?!1:(t.priority=t.biome===`forest`?1+t.ecology.patch*.75+t.ecology.detail*.25+t.priority*.025:t.priority,!0))).sort((e,t)=>t.priority-e.priority);for(let t of m){if(p>=d)break;let n=t.biome,i=t.ecology,a=t.rng,o=c((i.patch-.35)/.34),s=c((i.patch-.57)/.2),l=n===`forest`?o*(.55+i.detail*.45):.004+s*.054,f=e.surface?.projection.type===`equirectangular`?Math.max(.06,Math.cos(i.latitude*Math.PI/180)):1;if(a()>l*f||i.ecoregion===`polar`)continue;let m=.48+(n===`forest`?o:s)*.48+a()*.25,h=i.ecoregion===`tropical`?n===`plains`||i.moisture<.38?`acacia`:`broadleaf`:i.ecoregion===`boreal`?i.moisture>.65?`birch`:`pine`:i.moisture<.36?`pine`:i.moisture>.62?`birch`:i.detail>.62?`gold`:`broadleaf`;a()<.09&&(h=h===`pine`?`birch`:`round`);let g={kind:`tree`,x:t.x,z:t.z,radius:.85*m,scale:m,variant:h,landscapeLayer:`canopy`,rotation:at(e,t.x,t.z,a()*Math.PI*2)};u(g,[`forest`,`plains`])&&(r(g),p++)}let h=0,g=0,_=0,v=Math.round(48*n*a),y=Math.round(14*n*a),b=Math.round(12*n*a);for(let t of l(14,`understory`,1800)){let n=ls(e,t.x,t.z);if(![`forest`,`plains`,`desert`].includes(n))continue;let i=Vt(e,t.x,t.z,f),a=t.rng,o=e.surface?.complete&&us(e,`ice`,t.x,t.z)>0,s=null,c=2+a()*2.4;if(o?a()<.36&&(s=`frost`):n===`desert`?i.patch<.55&&a()<.7?(s=`dune`,c=4.1+a()*2.8):i.patch>.61&&a()<.67?(s=`outcrop`,c=2.8+a()*2.3):i.moisture>.47&&a()<.28&&(s=`scrub`):n===`forest`?i.patch<.47&&a()<.45?(s=`meadow`,c=2.8+a()*2.1):i.detail>.72&&a()<.18&&(s=`outcrop`):i.ecoregion===`polar`?a()<.4&&(s=i.moisture>.52?`scrub`:`frost`):i.patch<.6&&a()<.46?(s=i.moisture<.34?`scrub`:`meadow`,c=2.6+a()*2.5):i.detail>.7&&a()<.38&&(s=`outcrop`),s&&h<v){let l={kind:`nature`,x:t.x,z:t.z,radius:c,scale:1,style:s,variant:Math.floor(a()*65536),rotation:at(e,t.x,t.z,i.windAngle+(a()-.5)*.28)};u(l,n,o)&&(r(l),h++)}let l=!o&&n===`plains`&&i.ecoregion!==`polar`&&i.patch<.58&&i.moisture>.36&&a()<.17,d=!e.surface?.complete||i.longitude>-125&&i.longitude<-60,p=!o&&n===`desert`&&d&&i.patch>.5&&i.patch<.72&&a()<.2;if(!l&&!p)continue;let m=2+Math.floor(a()*4),x=a()*Math.PI*2;for(let i=0;i<m;i++){let i=l?`sheep`:`cactus`;if(l?g>=y:_>=b)break;let o=a()*Math.PI*2,s=2.4+a()*4.8,c=We(e,t.x,t.z,Math.cos(o)*s,Math.sin(o)*s),d=l?1:.72+a()*.35,f=l?.9+a()*.5:0,p={kind:i,...c,radius:l?.7+f:.7*d,...l?{roamRadius:f}:{},scale:d,variant:Math.floor(a()*3),rotation:at(e,c.x,c.z,x+(a()-.5)*.65)};u(p,n)&&(r(p),l?g++:_++)}}}function Al(e,t,n){for(let r of e.cities){let i=t.filter(e=>e.from===r.id||e.to===r.id).map(t=>{let n=t.from===r.id,i=e.cities.find(e=>e.id===(n?t.to:t.from)),a=t.waypoints.length?n?t.waypoints[0]:t.waypoints.at(-1):i,o=Gc(r,a)||1;return{connection:t,end:n?`start`:`end`,x:(a.x-r.x)/o,z:(a.z-r.z)/o}}),a=i.length?{x:i[0].x,z:i[0].z}:{x:1,z:0},o=1/0;for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){let n=i[e],r=i[t],s=n.x*r.x+n.z*r.z;if(s>=o)continue;o=s;let c=n.x-r.x,l=n.z-r.z,u=Math.hypot(c,l);u>Hc&&(a={x:c/u,z:l/u})}r.railHeading!==void 0&&(bl(Number.isFinite(r.railHeading),`city railHeading must be a finite angle in radians`),a={x:Math.cos(r.railHeading),z:Math.sin(r.railHeading)}),(a.x<0||Math.abs(a.x)<Hc&&a.z<0)&&(a={x:-a.x,z:-a.z}),r.railAxis=a;let s=Math.min(...i.map(t=>Gc(r,e.cities.find(e=>e.id===(t.connection.from===r.id?t.connection.to:t.connection.from))))),c=r.throatLength??n;bl(Number.isFinite(c)&&c>=0,`city throatLength must be finite and nonnegative`),r.throatLength=Math.min(c,s*.18);for(let e of i){let t=e.x*a.x+e.z*a.z>=0?1:-1;e.connection[e.end===`start`?`fromPort`:`toPort`]={cityId:r.id,side:t,x:r.x+a.x*t*r.throatLength,z:r.z+a.z*t*r.throatLength,heading:Math.atan2(a.z*t,a.x*t)}}}}function jl(e,t,n){let r=_l(e,t===`start`?n:e.length-n),i=t===`start`?1:-1;return{...r,tangent:{x:r.tangent.x*i,y:0,z:r.tangent.z*i},curvature:(r.curvature??0)*i}}function Ml(e,t){let n=e=>e.end===`start`?e.line.alignment.segments:e.line.alignment.segments.toReversed(),r=n(e),i=n(t),a=0,o=0,s=0,c=0,l=0;for(;a<r.length&&o<i.length;){let n=jl(e.line,e.end,l+1e-6),u=jl(t.line,t.end,l+1e-6);if(Gc(n,u)>1e-5||n.tangent.x*u.tangent.x+n.tangent.z*u.tangent.z<1-1e-8||Math.abs(n.curvature-u.curvature)>1e-8)break;let d=Math.min(r[a].length-s,i[o].length-c);if(d<Hc)break;l+=d,s+=d,c+=d,s>=r[a].length-Hc&&(a++,s=0),c>=i[o].length-Hc&&(o++,c=0)}return l}function Nl(e){e.sharedSections=[],e.transitions=[];for(let t of e.lines)t.sharedSections=[],t.renderRanges=[{start:0,end:t.length}];for(let t of e.cities){let n=e.lines.flatMap(e=>e.from===t.id?[{line:e,end:`start`,port:e.fromPort}]:e.to===t.id?[{line:e,end:`end`,port:e.toPort}]:[]);for(let r of n)for(let i of n)r.line!==i.line&&r.port.side!==i.port.side&&e.transitions.push({cityId:t.id,fromLineId:r.line.id,fromEnd:r.end,toLineId:i.line.id,toEnd:i.end});for(let r of[-1,1]){let i=n.filter(e=>e.port.side===r);if(i.length<2)continue;let a=new Map,o=(e,t)=>[e.line.id,t.line.id].sort().join(`|`);for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)a.set(o(i[e],i[t]),Ml(i[e],i[t]));let s=[0,...new Set([...a.values()].filter(e=>e>Hc).map(e=>Math.round(e*1e7)/1e7))].sort((e,t)=>e-t);for(let n=1;n<s.length;n++){let c=s[n-1],l=s[n],u=(c+l)/2,d=[...i];for(;d.length;){let n=d.shift(),i=[n];for(let e=d.length-1;e>=0;e--)(a.get(o(n,d[e]))??0)>u&&(i.push(d[e]),d.splice(e,1));if(i.length<2)continue;i.sort((t,n)=>e.lines.indexOf(t.line)-e.lines.indexOf(n.line));let s=i[0],f=`shared-${t.id}-${r}-${e.sharedSections.length+1}`,p=Array.from({length:Math.max(2,Math.ceil((l-c)/.35)+1)},(e,t)=>{let n=jl(s.line,s.end,c+(l-c)*t/(Math.max(2,Math.ceil((l-c)/.35)+1)-1));return{x:n.x,y:n.y,z:n.z}}),m={id:f,cityId:t.id,side:r,ownerLineId:s.line.id,length:l-c,points:p,lines:[]};for(let e of i){let n=e.end===`start`?c:e.line.length-l,i=e.end===`start`?l:e.line.length-c,a={id:f,cityId:t.id,side:r,start:n,end:i,ownerLineId:s.line.id};e.line.sharedSections.push(a),m.lines.push({lineId:e.line.id,start:n,end:i,forward:e.end===`start`}),e!==s&&(e.line.renderRanges=e.line.renderRanges.flatMap(e=>i<=e.start+Hc||n>=e.end-Hc?[e]:[{start:e.start,end:Math.max(e.start,n)},{start:Math.min(e.end,i),end:e.end}].filter(e=>e.end-e.start>Hc)))}e.sharedSections.push(m)}}}}}function Pl(e,t,n,r,i,a=.5){return e.sharedSections.some(e=>{let o=e.lines.find(e=>e.lineId===t.id),s=e.lines.find(e=>e.lineId===n.id);return o&&s&&r>=o.start-a&&r<=o.end+a&&i>=s.start-a&&i<=s.end+a})}function Fl(e){let t=[],n=(e,t,n,r)=>e*r-t*n,r=tl(e),i=r.items;for(let a of i)for(let i of r.query({minX:a.minX-Hc,maxX:a.maxX+Hc,minZ:a.minZ-Hc,maxZ:a.maxZ+Hc})){if(i.lineIndex<=a.lineIndex)continue;let r=a.line,o=i.line;if(a.maxX<i.minX-Hc||i.maxX<a.minX-Hc||a.maxZ<i.minZ-Hc||i.maxZ<a.minZ-Hc||Pl(e,r,o,(r.distances[a.index]+r.distances[a.index+1])/2,(o.distances[i.index]+o.distances[i.index+1])/2))continue;let s=a.b.x-a.a.x,c=a.b.z-a.a.z,l=i.b.x-i.a.x,u=i.b.z-i.a.z,d=i.a.x-a.a.x,f=i.a.z-a.a.z,p=n(s,c,l,u),m=s*s+c*c;if(Math.abs(p)<1e-10){if(Math.abs(n(d,f,s,c))>1e-7)continue;let e=(d*s+f*c)/(m||1),t=e+(l*s+u*c)/(m||1);bl((Math.min(1,Math.max(e,t))-Math.max(0,Math.min(e,t)))*Math.sqrt(m)<1e-4,`routes ${r.id} and ${o.id} overlap; shared railway segments must be represented by one connection`);continue}let h=n(d,f,l,u)/p,g=n(d,f,s,c)/p;if(h<-1e-6||h>1.000001||g<-1e-6||g>1.000001)continue;let _=Wc(r.distances[a.index],r.distances[a.index+1],Uc(h,0,1)),v=Wc(o.distances[i.index],o.distances[i.index+1],Uc(g,0,1)),y=(e,t)=>t<.001||t>e.length-.001;if((r.from===o.from||r.from===o.to||r.to===o.from||r.to===o.to)&&y(r,_)&&y(o,v))continue;let b=Wc(a.a.x,a.b.x,Uc(h,0,1)),x=Wc(a.a.z,a.b.z,Uc(h,0,1)),S=t.find(e=>Math.hypot(e.x-b,e.z-x)<.05);S||(S={id:`junction-${t.length+1}`,x:b,y:Vc.railY,z:x,lines:[]},t.push(S));for(let[e,t]of[[r,_],[o,v]])S.lines.some(t=>t.lineId===e.id)||S.lines.push({lineId:e.id,distance:t})}e.junctions=t}function Il(e={},t={}){let n=e.seed??Vc.seed,r=Jc(n),i={width:Number(e.bounds?.width??Vc.width),depth:Number(e.bounds?.depth??Vc.depth)};bl(Number.isFinite(i.width)&&Number.isFinite(i.depth)&&i.width>=35&&i.depth>=30,`bounds must be finite and at least 35 × 30`);let a=Hs(e.players),o=xl(e,i,r),s=new Set(a.map(e=>e.id));for(let[t,r]of o.entries()){let i=Us(n,r.id);r.level=r.level??(e.cities?1+Math.floor(i()*10):3);let o=Ws(r.level);r.ownerId=String(r.ownerId??a[Math.floor(Us(n,`${r.id}:owner`)()*a.length)].id),bl(s.has(r.ownerId),`city ${r.id} references unknown owner ${r.ownerId}`),e.cities&&e.cities[t].radius==null&&(r.radius=o.radius),r.development={...o,radius:r.radius,variantSeed:`${n}:city:${r.id}`,placedBuildings:0,streetCount:0,connectionCount:0}}let c={...e.trainOwners??{}};bl(e.trainOwners===void 0||e.trainOwners&&typeof e.trainOwners==`object`&&!Array.isArray(e.trainOwners),`trainOwners must be an object keyed by train ID`),bl(Object.values(c).every(e=>s.has(e)),`trainOwners references an unknown player`);let l=e.outline?e.outline.map(e=>[Number(e[0]),Number(e[1])]):yl(i.width,i.depth);bl(l.length>=3&&l.every(e=>e.every(Number.isFinite)),`outline requires at least three finite points`);let u={version:2,seed:n,bounds:i,outline:l,geography:e.geography,camera:e.camera,surface:_t(e.surface),players:a,trainOwners:c,traffic:structuredClone(e.traffic??{}),density:Uc(Number(e.density??1)||0,0,3),detailMode:t.detail??`full`,cities:o,lines:[],stations:[],placements:[],cityStreets:[],junctions:[]};e.gameplay&&(u.gameplay=structuredClone(e.gameplay)),bl(o.every(e=>dl(u,e.x,e.z,.5)),`cities must be inside the world outline`);let d={points:[[-.64,.015],[-.42,-.025],[-.2,.035],[.02,0],[.22,.075],[.43,.055],[.64,.015]].map(([e,t])=>[e*i.width,t*i.depth])},f=e.rivers??[e.river??d];bl(Array.isArray(f),`rivers must be an array`);let p=f.map((e,t)=>{let n=e.points.map(e=>Kc(e,Vc.waterY));bl(n.every(qc),`river requires finite points`);let r=n.filter((e,t)=>t===0||Gc(e,n[t-1])>Hc);bl(r.length>=2,`river requires at least two distinct points`);let i=Number(e.width??Vc.riverWidth);bl(Number.isFinite(i)&&i>0,`river width must be positive`);let a=hl(e.smooth===!1?r:gl(r,9),Vc.waterY,e.smooth===!1?1/0:1);return bl(Number.isFinite(a.length)&&a.length>Hc,`river must have positive length`),{...a,id:e.id??`river-${t+1}`,name:e.name,width:i,y:Vc.waterY}});u.river=p[0]??{points:[],distances:[],length:0,width:0,y:Vc.waterY},e.rivers!==void 0&&(u.rivers=p),u.lakes=e.biomes?.geography?.lakes,u.lakeShore=e.biomes?.geography?.lakeShore,(e.rivers!==void 0||u.lakes?.length)&&(u.hydrology=Cc(u));let m=u.river.width,h=Math.min(i.width/130,i.depth/95),g=[...o].sort((e,t)=>e.z-t.z).slice(0,2),_={x:((g[0]?.x??0)+(g[1]?.x??0))/2,z:((g[0]?.z??0)+(g[1]?.z??0))/2},v=(e.cities?[]:[{id:`high-pass`,..._,radius:10*h,height:13*h},{id:`north-spire`,x:_.x-7*h,z:_.z-11*h,radius:6.8*h,height:10*h},{id:`east-spire`,x:_.x+11*h,z:_.z-10*h,radius:7*h,height:9*h}]).filter(e=>dl(u,e.x,e.z,e.radius+.1)&&ul(u,e.x,e.z)>e.radius+m/2+Q.riverBank&&o.every(t=>Gc(t,e)>e.radius+2));u.mountains=(e.mountains??v).map((e,t)=>({...e,id:String(e.id??`mountain-${t+1}`),x:Number(e.x),z:Number(e.z),radius:Number(e.radius),height:Number(e.height)})),bl(u.mountains.every(e=>qc(e)&&Number.isFinite(e.radius)&&e.radius>0&&Number.isFinite(e.height)&&e.height>0),`mountains require finite x/z and positive radius/height`),bl(new Set(u.mountains.map(e=>e.id)).size===u.mountains.length,`mountain IDs must be unique`),bl(u.mountains.every(e=>e.range?e.range.polygon.every(([e,t])=>dl(u,e,t)):dl(u,e.x,e.z,e.radius+.1)),`mountain footprints must stay inside the world outline`),bl(u.mountains.every(e=>e.range||bc(u,e.x,e.z)>e.radius+Q.riverBank),`mountain footprints must not overlap the river or its banks`),e.biomes?.geography&&(u.biomes=rs(u,e.biomes));let y=(o.length===2?o.slice(0,1):o).map((e,t)=>({from:e.id,to:o[(t+1)%o.length].id}));o.length===8&&y.push({from:o[7].id,to:o[2].id},{from:o[6].id,to:o[3].id});let b=e.connections??y,x=[`coral`,`teal`,`gold`,`blue`,`coral`,`gold`,`teal`,`blue`,`gold`,`coral`];bl(Array.isArray(b)&&(b.length>0||u.gameplay&&o.length===0),`at least one connection is required outside settlement mode`);let S=b.map((e,t)=>({...e,id:String(e.id??`line-${t+1}`),from:String(e.from),to:String(e.to),waypoints:(e.points??e.waypoints??[]).map(e=>({...Kc(e),...Number.isFinite(e.heading)?{heading:e.heading}:{}}))}));bl(S.every(e=>o.some(t=>t.id===e.from)&&o.some(t=>t.id===e.to)&&e.from!==e.to),`connections must reference two different existing city IDs`);let C=S.map(e=>[e.from,e.to].sort().join(`|`));bl(new Set(C).size===C.length,`overlapping duplicate city connections must be represented by one railway`);let w=Number(e.minTurnRadius??Vc.minTurnRadius),T=Number(e.throatLength??Vc.throatLength);bl(Number.isFinite(w)&&w>0,`minTurnRadius must be positive and finite`),bl(Number.isFinite(T)&&T>=0,`throatLength must be finite and nonnegative`),u.minTurnRadius=w,Al(u,S,T);for(let t=0;t<S.length;t++){let n=S[t],r=o.find(e=>e.id===String(n.from)),i=o.find(e=>e.id===String(n.to));bl(r&&i&&r!==i,`connections must reference two different existing city IDs`);let a=n.waypoints;bl(a.every(qc),`connection waypoints require finite x/z`);let c=n.fromPort,l={...n.toPort,heading:n.toPort.heading+Math.PI},d=Lc(u,[c,...a,l],w),f;try{f=(u.surface?Rc:Ds)(c,l,{radius:d,physicalRadius:w,world:u,waypoints:a,y:Vc.railY,isAllowed:e=>dl(u,e.x,e.z,Q.routeEdge)})}catch(e){throw TypeError(`${e.message} (${n.id})`,{cause:e})}let p=Es([vs(r,c),f,vs(l,i)],d),m=String(n.ownerId??r.ownerId);bl(s.has(m),`line ${n.id} references unknown owner ${m}`);let h={id:n.id,from:r.id,to:i.id,ownerId:m,color:n.color??x[t%x.length],closed:!1,fromPort:n.fromPort,toPort:n.toPort,alignment:p,...Ts(p,Vc.sampleSpacing),bridges:[],tunnels:[],cuts:[],stationIds:[]};bl(h.length>Hc,`connections must have nonzero length`),bl(h.points.every(e=>dl(u,e.x,e.z,Q.routeEdge))&&u.outline.every(([e,t])=>cl(h,e,t)>=Q.routeEdge),`entire railway corridors must stay inside the world outline`),h.bridges=vl(h,t=>Math.min(bc(u,t.x,t.z),e.biomes?.geography?-us(u,`ocean`,t.x,t.z):1/0)-Q.bridgeBank);for(let e of u.mountains){if(cl(h,e.x,e.z)>e.radius+rl(u,e,Q.cuttingHalfWidth))continue;let t=vl(h,t=>Ls(e,t.x,t.z)-rl(u,t,Q.cuttingHalfWidth));h.cuts.push(...t.map(t=>({...t,mountainId:e.id})));let n=vl(h,(t,n)=>{let r=_l(h,n).tangent,i=-r.z,a=r.x,o=Q.tunnelRoofHeight-fl(e,t.x,t.z);for(let n=0;n<=24;n++){let s=n/24*Math.PI,c=Math.cos(s)*Q.tunnelArchRadius,l=Vc.railY+Q.tunnelArchSpring+Math.sin(s)*Q.tunnelArchRadius,d=dt(u,t.x,t.z,Math.atan2(r.x,r.z)),f=u.surface?We(u,t.x,t.z,-Math.cos(d)*c,Math.sin(d)*c):{x:t.x+i*c,z:t.z+a*c},p=fl(e,f.x,f.z);o=Math.max(o,l+Q.tunnelRockCover-p)}return o});for(let r of n){let n=t.find(e=>e.start<=r.start+Hc&&e.end>=r.end-Hc);h.tunnels.push({...r,mountainId:e.id,cutStart:n?.start??r.start,cutEnd:n?.end??r.end,cutEntry:n?.entry??r.entry,cutExit:n?.exit??r.exit})}}h.tunnels.sort((e,t)=>e.start-t.start),h.cuts.sort((e,t)=>e.start-t.start),h.stops=[{cityId:r.id,distance:Math.min(Q.stationEndDistance,h.length*.25)},{cityId:i.id,distance:h.length-Math.min(Q.stationEndDistance,h.length*.25)}],u.lines.push(h)}return bl(new Set(u.lines.map(e=>e.id)).size===u.lines.length,`line IDs must be unique`),Nl(u),Fl(u),u.biomes??=rs(u,e.biomes),El(u),u.placements=[],t.detail!==`network`&&(Ol(u),kl(u,r,u.density),u.gameplay&&u.placements.push(...structuredClone(u.gameplay.guaranteedTrees??[]))),u}function Ll(e){let t=[],n=(t,n)=>J(e,t,n),r=(e,n,r)=>t.push({type:e,id:n,detail:r});try{_t(e.surface)}catch(e){return r(`surface`,`world`,e.message),t}let i=new Set((e.players??[]).map(e=>e.id));try{Hs(e.players??[])}catch(e){r(`players`,`world`,e.message)}for(let t of e.cities)i.has(t.ownerId)||r(`city-owner`,t.id,`City references an unknown player`),(!Number.isInteger(t.level)||t.level<1||t.level>10)&&r(`city-level`,t.id,`City level must be an integer from 1 through 10`);for(let[t,n]of Object.entries(e.trainOwners??{}))i.has(n)||r(`train-owner`,t,`Train references an unknown player`);for(let t of e.lines)i.has(t.ownerId)||r(`line-owner`,t.id,`Railway references an unknown player`);let a=[`farmland`,`forest`,`plains`,`desert`];for(let t of e.cityStreets??[]){let i=e.cities.find(e=>e.id===t.cityId);if(i&&t.ownerId===i.ownerId||r(`street-owner`,t.id,`Street must belong to its existing city owner`),!Number.isFinite(t.width)||t.width<=0||t.points.length<2||!t.points.every(qc))r(`street-geometry`,t.id,`Street requires a positive width and finite points`);else for(let o=1;o<t.points.length;o++){let s=t.points[o-1],c=t.points[o],l=Math.max(1,Math.ceil(n(s,c)/.5)),u=t.width/2,d=K(e,s,c);for(let o=0;o<=l;o++){let c=We(e,s.x,s.z,d.x*o/l,d.z*o/l);(!dl(e,c.x,c.z,rl(e,c,u+Q.worldEdge)-.001)||i&&n(c,i)>i.radius-u+.001)&&r(`street-edge`,t.id,`Street leaves its dry city footprint`),e.biomes&&!ds(e,a,c.x,c.z,rl(e,c,u)-.001)&&r(`street-biome`,t.id,`Street enters ocean, shore, or mountain`),sl(e,c.x,c.z,u+Q.track)<u+Q.track-.001&&r(`street-track`,t.id,`Street enters railway clearance`),bc(e,c.x,c.z)<rl(e,c,u+Q.riverBank)-.001&&r(`street-water`,t.id,`Street enters river bank`),e.mountains.some(t=>Ls(t,c.x,c.z)<rl(e,c,u+Q.mountain)-.001)&&r(`street-mountain`,t.id,`Street crosses a mountain`),e.stations.some(t=>wl(t,c.x,c.z,e)<u-.001)&&r(`street-station`,t.id,`Street overlaps a station`)}}}for(let t of e.cities){let n=(e.cityStreets??[]).filter(e=>e.cityId===t.id);if(!n.length)continue;let i=e=>`${e.x.toFixed(5)},${e.z.toFixed(5)}`,a=new Map;for(let e of n)for(let t=1;t<e.points.length;t++){let n=i(e.points[t-1]),r=i(e.points[t]);a.has(n)||a.set(n,new Set),a.has(r)||a.set(r,new Set),a.get(n).add(r),a.get(r).add(n)}let o=new Set,s=[a.keys().next().value];for(;s.length;){let e=s.pop();o.has(e)||(o.add(e),s.push(...a.get(e)))}o.size!==a.size&&r(`street-connectivity`,t.id,`City street graph is disconnected`)}for(let t of e.lines){if((!Number.isFinite(t.length)||t.length<=0)&&r(`route-length`,t.id,`Route length must be positive`),t.alignment)for(let n of t.alignment.segments)n.type===`arc`&&n.radius<(e.minTurnRadius??Vc.minTurnRadius)-1e-6&&r(`route-curvature`,t.id,`Railway bend is tighter than its minimum turning radius`);for(let e=1;e<t.points.length;e++){let i=t.points[e-1],a=t.points[e];qc(i)&&qc(a)&&Number.isFinite(a.y)||r(`route-coordinate`,t.id,`Non-finite route point`),Math.abs(a.y-i.y)/(n(i,a)||1)>Q.maximumGrade+Hc&&r(`route-grade`,t.id,`Grade exceeds 12 percent`)}for(let n of[`bridges`,`tunnels`,`cuts`])for(let i of t[n])if((i.start<0||i.end>t.length+Hc||i.end<=i.start)&&r(`structure-interval`,t.id,`Invalid ${n} interval`),n===`tunnels`){let n=e.mountains.find(e=>e.id===i.mountainId);for(let e of[i.entry,i.exit])fl(n,e.x,e.z)<Q.tunnelRoofHeight-.01&&r(`tunnel-cover`,t.id,`Portal lacks roof coverage`)}}for(let t of e.stations){t.ownerId!==e.cities.find(e=>e.id===t.cityId)?.ownerId&&r(`station-owner`,t.id,`Station must belong to its city owner`);for(let n of e.lines)Ec(e,t.x,t.z,rl(e,t,t.radius+Q.trackHalfWidth+.25)).some(e=>mo(e,el(n).box))&&Tl(t,n,e)<Q.trackHalfWidth+.25-.001&&r(`station-track`,t.id,`Platform overlaps ${n.id}`);(e.surface?bc(e,t.x,t.z)<rl(e,t,t.radius+Q.riverBank)-.001:vc(e).some(e=>Tl(t,e)<e.width/2+Q.riverBank-.001))&&r(`station-water`,t.id,`Platform enters river bank`)}for(let t=0;t<e.placements.length;t++){let i=e.placements[t],a=i.radius;i.cityId&&i.ownerId!==e.cities.find(e=>e.id===i.cityId)?.ownerId&&r(`asset-owner`,i.id,`City asset must belong to its city owner`);for(let t of e.cityStreets??[])ol(e,t,i.x,i.z,a+t.width/2+Q.street)<a+t.width/2+Q.street-.001&&r(`asset-street`,i.id,`Footprint enters a city street`);e.biomes&&!ds(e,[`farmland`,`forest`,`plains`,`desert`],i.x,i.z,rl(e,i)-.001)&&r(`asset-biome`,i.id,`Footprint enters ocean, shore, or mountain`),dl(e,i.x,i.z,rl(e,i,a+Q.worldEdge)-.001)||r(`asset-edge`,i.id,`Footprint crosses island edge`),sl(e,i.x,i.z,a+Q.track)<a+Q.track-.001&&r(`asset-track`,i.id,`Footprint enters railway clearance`),bc(e,i.x,i.z)<rl(e,i,a+Q.riverBank)-.001&&r(`asset-water`,i.id,`Footprint enters river bank`);for(let t of e.mountains)Ls(t,i.x,i.z)<rl(e,i,a+Q.mountain)-.001&&r(`asset-mountain`,i.id,`Footprint intersects ${t.id}`);for(let t of e.stations)n(i,t)<a+t.radius+Q.objects-.001&&r(`asset-station`,i.id,`Footprint intersects ${t.id}`);for(let o=0;o<t;o++)n(i,e.placements[o])<a+e.placements[o].radius+Q.objects-.001&&(i.kind!==`farm`||e.placements[o].kind!==`farm`||Qs(e,i,e.placements[o],Q.objects-.001))&&r(`asset-overlap`,i.id,`Footprint intersects ${e.placements[o].id}`)}return t}function Rl(e){let{l:t=.64,c:n=.14,h:r=22}=e?.color??{},i=(e,t)=>Ht(e,t,r);return{body:i(p.clamp(t,.48,.72),Math.min(n,.17)),light:i(.83,Math.min(n*.44,.075)),dark:i(.38,Math.min(n*.65,.09)),roof:i(p.clamp(t-.08,.43,.65),Math.min(n*.95,.16)),accent:i(p.clamp(t+.06,.57,.77),Math.min(n*1.08,.18)),trim:i(.94,Math.min(n*.13,.02))}}function zl(e){return Object.fromEntries(Object.entries(Rl(e)).map(([t,n])=>[t,Gt(new v({name:`player-${e?.id??`neutral`}-${t}`,color:n,roughness:1,metalness:0,flatShading:!0}))]))}function Bl(e,t){let{vertices:n,surfaceTriangles:r}=Ps(e),i=[];for(let e of r){let r=e.map(e=>n[e]),a=[],o=r.map(e=>e.y-t(e.x,e.z));for(let e=0;e<3;e++){let t=r[e],n=r[(e+1)%3],i=o[e],s=o[(e+1)%3];if(i>=0&&a.push([t.x,t.z]),i>=0!=s>=0){let e=i/(i-s);a.push([t.x+(n.x-t.x)*e,t.z+(n.z-t.z)*e])}}if(a.length>=3){let e=a.map(([e,t])=>[Math.round(e*1e6)/1e6,Math.round(t*1e6)/1e6]);i.push([[...e,e[0]]])}}return i.length?en.union(...i):[]}function Vl(e,t){return Bl(e,()=>e.height*t)}function Hl(e){return{low:Vl(e,.12),high:Vl(e,.62),snow:e.range?Bl(e,(t,n)=>Is(e,t,n)):e.height>8?Vl(e,.84):[]}}function Ul(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of e[0])t=Math.min(t,a),n=Math.min(n,o),r=Math.max(r,a),i=Math.max(i,o);return{minX:t,minZ:n,maxX:r,maxZ:i}}function Wl(e,t){let n=e.biomes.land,r=t.water,i=e.biomes.ocean??[],a=i.length&&t.banks.length?en.difference(t.banks,i):t.banks,o=[...e.biomes.oceanShore??[],...a],s=new vo([...r,...t.banks],Ul),c=e=>e.flatMap(e=>{let t=s.query(Ul(e));return t.length?en.difference([e],t):[e]});return{land:n,shores:o,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Hl(e);return{id:e.id,low:c(t.low),high:c(t.high),snow:c(t.snow)}}),colorField:{seed:e.seed,sites:e.biomes.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes.shoreWidth}}}function Gl(e){let t=[[e.outline]],n=Tc(e);if(e.surface?.complete&&e.biomes?.land)return Wl(e,n);let r=n.water,i=e.biomes?.ocean??[],a=i.length?en.union(r,i):r,o=en.difference(n.banks,a),s=e.biomes?.oceanShore?.length?en.union(o,e.biomes.oceanShore):o,c=en.difference(t,a,s);return{land:c,shores:s,river:r,ocean:i,mountains:(e.mountains??[]).map(e=>{let t=e.mapContours??Hl(e);return{id:e.id,low:en.intersection(t.low,c),high:en.intersection(t.high,c),snow:en.intersection(t.snow,c)}}),colorField:{seed:e.seed,sites:e.biomes?.sites??[],bounds:e.bounds,surface:e.surface,ocean:i,shoreWidth:e.biomes?.shoreWidth}}}var Kl=new WeakMap,ql=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e));function Jl(e,t){let n=Math.imul(e,374761393)^Math.imul(t,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function Yl(e,t,n=24){e/=n,t/=n;let r=Math.floor(e),i=Math.floor(t),a=ql(e-r),o=ql(t-i),s=Jl(r,i)*(1-a)+Jl(r+1,i)*a,c=Jl(r,i+1)*(1-a)+Jl(r+1,i+1)*a;return s*(1-o)+c*o}function Xl(e){let t=e.terrainSource??e,n=t.biomes?.sites??t.sites;if(!n?.length)return null;if(!Kl.has(n)||Kl.get(n).seed!==t.seed){if(t.surface?.complete){let e={seed:t.seed,globe:Jt(t,n)};return Kl.set(n,e),e}let e=Math.hypot(t.bounds?.width??130,t.bounds?.depth??95),r=Math.min(22,Math.max(4.5,e*.011)),i={farmland:X.grass.clone().lerp(X.farmland,.43),forest:X.grass.clone().lerp(X.forestFloor,.78),plains:X.grass.clone(),desert:X.desert.clone()};Kl.set(n,{seed:t.seed,sites:n.map(e=>({...e,color:e.ice?X.snow:i[e.type]??X.grass})),width:r,period:t.surface?.complete?t.bounds.width:0,distances:new Float64Array(n.length)})}return Kl.get(n)}var Zl={};function Ql(e,t,n,{map:r=!1,target:i=new _}={}){let a=Xl(e);if(!a)return i.copy(X.grass);if(a.globe)return Wt(a.globe,t,n,i);let{sites:o,width:s,distances:c,period:l}=a,u=(e,t,n)=>{if(!l)return Yl(e,t,n);let r=((e+l/2)%l+l)%l,i=ql(r/l);return Yl(r,t,n)*(1-i)+Yl(r-l,t,n)*i},d=t+(u(t+171,n-87,45)-.5)*s*.85,f=n+(u(t-73,n+119,39)-.5)*s*.85,p=1/0,m=0,h=0,g=0,v=0,y=0;for(let e=0;e<o.length;e++){let t=l?((d-o[e].x+l/2)%l+l)%l-l/2:d-o[e].x;c[e]=Math.hypot(t,f-o[e].z),p=Math.min(p,c[e])}i.setRGB(0,0,0);for(let e=0;e<o.length;e++){let t=ql(1-(c[e]-p)/s),n=o[e].color,r=o[e];i.r+=n.r*t,i.g+=n.g*t,i.b+=n.b*t,m+=t,r.ice?v+=t:r.type===`forest`?h+=t:r.type===`desert`?g+=t:r.type===`plains`&&(y+=t)}i.multiplyScalar(1/m),Vt(e.terrainSource??e,t,n,Zl),Kt(i,Zl,h/m,g/m,v/m,y/m);let b=(u(t,n,29)-.5)*.09+(u(t+243,n-192,91)-.5)*.07;return i.multiplyScalar(1+b*(r?.42:1)),r&&i.lerp(X.trim,.09),i}function $l(e,t,{map:n=!1,maxEdge:r=n?24:8}={}){if(!Number.isFinite(r)||r<=0)throw TypeError(`Terrain color edge spacing must be positive and finite`);let i=e.attributes.position,a=e.index,o=[],s=[],c=new _,l=[],u=r*r,d=!n&&t.terrainChunk?t.bounds:null,f=new Map,p=new _,m=d?[[0,d.minX,2],[0,d.maxX,2],[2,d.minZ,0],[2,d.maxZ,0]]:[],h=d?Math.max(1e-6,...m.map(([,e])=>Math.abs(e)*1e-7)):0;function g(e,n,r){let i=`${e}:${n}:${r}`;if(!f.has(i)){let a=e===0?n:r,o=e===2?n:r;f.set(i,Ql(t,a,o))}return f.get(i)}function v(e){for(let[t,n,r]of m)if(Math.abs(e[t]-n)<=h){let i=Math.floor(e[r]/2)*2,a=(e[r]-i)/2;return c.copy(g(t,n,i)),p.copy(g(t,n,i+2)),c.lerp(p,a)}return Ql(t,e[0],e[2],{map:n,target:c})}function y(e){for(let t=0;t<3;t++){let n=e[t],r=e[(t+1)%3];for(let[e,i,a]of m){if(Math.abs(n[e]-i)>h||Math.abs(r[e]-i)>h)continue;let o=Math.min(n[a],r[a]),s=Math.max(n[a],r[a]),c=Math.ceil((o+h)/2)*2,l=Math.floor((s-h)/2)*2;if(c>l)continue;let u=Math.max(c,Math.min(l,Math.round((o+s)/2/2)*2)),d=(u-n[a])/(r[a]-n[a]),f=n.map((e,t)=>e+(r[t]-e)*d);return f[a]=u,{j:t,m:f}}}return null}let b=[new _,new _,new _],x=new _;function S(e){e.forEach((e,n)=>Ql(t,e[0],e[2],{map:!0,target:b[n]}));for(let n of[[.5,.5,0],[0,.5,.5],[.5,0,.5],[1/3,1/3,1/3]]){let r=0,i=0,a=0,o=0,s=0;for(let t=0;t<3;t++){let c=n[t];r+=e[t][0]*c,i+=e[t][2]*c,a+=b[t].r*c,o+=b[t].g*c,s+=b[t].b*c}if(Ql(t,r,i,{map:!0,target:x}),Math.max(Math.abs(x.r-a),Math.abs(x.g-o),Math.abs(x.b-s))>.004)return!1}return!0}let C=e=>[i.getX(e),i.getY(e),i.getZ(e)],w=a?.count??i.count;for(let e=0;e<w;e+=3)for(l.push([C(a?a.getX(e):e),C(a?a.getX(e+1):e+1),C(a?a.getX(e+2):e+2)]);l.length;){let e=l.pop(),t=-1,i=u;for(let n=0;n<3;n++){let r=e[n],a=e[(n+1)%3],o=(r[0]-a[0])**2+(r[2]-a[2])**2;o>i&&(i=o,t=n)}if(t>=0&&n&&i<=(r*8)**2&&S(e)&&(t=-1),t>=0){let n=e[t],r=e[(t+1)%3],i=e[(t+2)%3],a=n.map((e,t)=>(e+r[t])/2);l.push([n,a,i],[a,r,i]);continue}let a=y(e);if(a){let{j:t,m:n}=a,r=e[t],i=e[(t+1)%3],o=e[(t+2)%3];l.push([r,n,o],[n,i,o])}else for(let t of e)o.push(...t),v(t),s.push(c.r,c.g,c.b)}let T=new $e;return T.setAttribute(`position`,new Re(o,3)),T.setAttribute(`color`,new Re(s,3)),T.computeVertexNormals(),T}function eu(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);let n=Object.keys(e.attributes),r=n.map(t=>e.attributes[t]);if(r.some(e=>e.isInterleavedBufferAttribute))throw TypeError(`Surface tessellation needs ordinary buffer attributes`);let i=e.attributes.position;if(!i||i.itemSize!==3)throw TypeError(`Surface tessellation needs three-dimensional positions`);let a=[],o=[],s=0;for(let e of r)a.push(s),o.push(e.itemSize),s+=e.itemSize;let c=a[n.indexOf(`position`)],l=r.map(()=>[]),u=t*t*(1+1e-12),d=e=>{let t=new Float64Array(s);for(let n=0;n<r.length;n++)for(let i=0;i<o[n];i++)t[a[n]+i]=r[n].array[e*o[n]+i];return t},f=(e,t)=>{let n=new Float64Array(s);for(let r=0;r<s;r++)n[r]=(e[r]+t[r])*.5;return n},p=(e,t)=>{let n=e[c]-t[c],r=e[c+2]-t[c+2];return n*n+r*r>u},m=e=>{for(let t=0;t<r.length;t++)for(let n=0;n<o[t];n++)l[t].push(e[a[t]+n])},h=e.index?.array,g=h?.length??i.count,_=[];for(let e=0;e<g;e+=3)for(_.push([d(h?h[e]:e),d(h?h[e+1]:e+1),d(h?h[e+2]:e+2)]);_.length;){let[e,t,n]=_.pop(),r=p(e,t),i=p(t,n),a=p(n,e),o=!!r|(i?2:0)|(a?4:0);if(!o){m(e),m(t),m(n);continue}let s=r?f(e,t):null,c=i?f(t,n):null,l=a?f(n,e):null;o===7?_.push([e,s,l],[s,t,c],[l,c,n],[s,c,l]):o===1?_.push([e,s,n],[s,t,n]):o===2?_.push([e,t,c],[e,c,n]):o===4?_.push([e,t,l],[t,n,l]):o===3?_.push([e,s,n],[s,c,n],[s,t,c]):o===5?_.push([e,s,l],[s,t,n],[s,n,l]):_.push([e,t,c],[e,c,l],[l,c,n])}let v=new $e;for(let e=0;e<r.length;e++)v.setAttribute(n[e],new Re(l[e],o[e],r[e].normalized));return v}function tu(e,t=8){if(!(t>0&&Number.isFinite(t)))throw RangeError(`Surface segment length must be positive and finite`);if(!e.length)return[];let n=[],r=e[0],i=e.at(-1),a=r[0]===i[0]&&r[1]===i[1];for(let r=0;r<e.length-+!!a;r++){let i=e[r],a=e[(r+1)%e.length],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=2**Math.max(0,Math.ceil(Math.log2(o/t)));for(let e=0;e<s;e++)n.push([i[0]+(a[0]-i[0])*e/s,i[1]+(a[1]-i[1])*e/s])}return a&&n.push([...r]),n}function nu(e){if(e.index)throw TypeError(`Exact indexing requires non-indexed geometry`);if(Object.keys(e.morphAttributes).length)throw TypeError(`Exact indexing does not support morph attributes`);let t=Object.keys(e.attributes),n=t.map(t=>e.attributes[t]),r=e.attributes.position?.count??0;for(let e of n)if(e.isInterleavedBufferAttribute||!(e.array instanceof Float32Array)||e.count!==r||!Number.isInteger(e.itemSize)||e.itemSize<1)throw TypeError(`Exact indexing requires equally sized, non-interleaved Float32 attributes`);let i=n.map(e=>new Uint32Array(e.array.buffer,e.array.byteOffset,e.array.length)),a=new Uint32Array(r),o=new Uint32Array(r),s=1;for(;s<r*2;)s*=2;let c=new Int32Array(s),l=s-1,u=0;for(let e=0;e<r;e++){let t=2166136261;for(let r=0;r<n.length;r++){let a=n[r].itemSize,o=e*a;for(let e=0;e<a;e++)t=Math.imul(t^i[r][o+e],16777619)}t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16;let r=t&l;for(;c[r];){let t=c[r]-1,a=!0;for(let r=0;a&&r<n.length;r++){let o=n[r].itemSize,s=e*o,c=t*o;for(let e=0;e<o;e++)if(i[r][s+e]!==i[r][c+e]){a=!1;break}}if(a)break;r=r+1&l}c[r]?a[e]=a[c[r]-1]:(c[r]=e+1,a[e]=u,o[u++]=e)}let d=new $e;for(let e=0;e<n.length;e++){let r=n[e],a=r.itemSize,s=new Float32Array(u*a),c=new Uint32Array(s.buffer);for(let t=0;t<u;t++){let n=t*a,r=o[t]*a;for(let t=0;t<a;t++)c[n+t]=i[e][r+t]}let l=new z(s,a,r.normalized);l.name=r.name,l.setUsage(r.usage),l.gpuType=r.gpuType,d.setAttribute(t[e],l)}d.setIndex(new z(u<=65535?new Uint16Array(a):a,1)),d.name=e.name;for(let t of e.groups)d.addGroup(t.start,t.count,t.materialIndex);return d.setDrawRange(e.drawRange.start,e.drawRange.count),d.boundingBox=e.boundingBox?.clone()??null,d.boundingSphere=e.boundingSphere?.clone()??null,d}function ru(e){return Object.values(e.attributes).reduce((e,t)=>e+t.array.byteLength,0)+(e.index?.array.byteLength??0)}function iu(e,t){let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let[t,o]of e[0]){if(!Number.isFinite(t)||!Number.isFinite(o))throw TypeError(`Map tiles require finite polygon coordinates`);n=Math.min(n,t),i=Math.max(i,t),r=Math.min(r,o),a=Math.max(a,o)}return{left:Math.floor(n/t),right:Math.ceil(i/t),top:Math.floor(r/t),bottom:Math.ceil(a/t)}}var au=(e,t,n,r,i)=>[[[[e*i,t*i],[n*i,t*i],[n*i,r*i],[e*i,r*i],[e*i,t*i]]]];function ou(e,t=192){if(!(Number.isFinite(t)&&t>0))throw RangeError(`Map tile size must be positive and finite`);if(!Array.isArray(e))throw TypeError(`Map tiles require a MultiPolygon`);let n=[],r=[];for(let n=e.length-1;n>=0;n--){let i=e[n];!Array.isArray(i)||!Array.isArray(i[0])||i[0].length<3||r.push({polygon:i,...iu(i,t)})}for(;r.length;){let{polygon:e,left:i,right:a,top:o,bottom:s}=r.pop();if(a<=i||s<=o)continue;if(a-i<=1&&s-o<=1){n.push(e);continue}let c=a-i>=s-o,l=Math.floor(c?(i+a)/2:(o+s)/2),u=c?[{left:i,right:l,top:o,bottom:s},{left:l,right:a,top:o,bottom:s}]:[{left:i,right:a,top:o,bottom:l},{left:i,right:a,top:l,bottom:s}];for(let n=u.length-1;n>=0;n--){let i=u[n],a=en.intersection([e],au(i.left,i.top,i.right,i.bottom,t));for(let e=a.length-1;e>=0;e--){let n=a[e],o=iu(n,t);r.push({polygon:n,left:Math.max(i.left,o.left),right:Math.min(i.right,o.right),top:Math.max(i.top,o.top),bottom:Math.min(i.bottom,o.bottom)})}}}return n}var su=new WeakMap,cu=new q,lu={},uu=Ht(.57,.092,235),du=Ht(.615,.091,224),fu=Ht(.72,.082,202),pu=Ht(.64,.055,219),mu=Ht(.75,.045,207),hu=X.sand.clone().lerp(X.oceanLight,.32).multiplyScalar(.94),gu=X.rockLight.clone().lerp(X.oceanLight,.25).multiplyScalar(.87),_u=X.snow.clone().lerp(X.oceanLight,.26),vu={},yu=new _,bu=new _,xu=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e)),Su=(e,t,n)=>{let r=0,i=0;for(let a=0;a<e.length;a++){let o=n[a]-t[a];r+=(e[a]-t[a])*o,i+=o*o}let a=Math.max(0,Math.min(1,r/(i||1))),o=0;for(let r=0;r<e.length;r++)o+=(e[r]-t[r]-(n[r]-t[r])*a)**2;return o};function Cu(e){if(!e.length)return null;let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let{a:r,b:i}of e)for(let e=0;e<3;e++)t[e]=Math.min(t[e],r[e],i[e]),n[e]=Math.max(n[e],r[e],i[e]);if(e.length<=8)return{min:t,max:n,items:e};let r=0;for(let e=1;e<3;e++)n[e]-t[e]>n[r]-t[r]&&(r=e);e.sort((e,t)=>e.a[r]+e.b[r]-(t.a[r]+t.b[r]));let i=e.length>>1;return{min:t,max:n,left:Cu(e.slice(0,i)),right:Cu(e.slice(i))}}function wu(e,t,n){let r=n*n,i=e=>e.min.reduce((n,r,i)=>n+Math.max(r-t[i],0,t[i]-e.max[i])**2,0),a=e=>{if(!(!e||i(e)>r)){if(e.items)for(let n of e.items)r=Math.min(r,Su(t,n.a,n.b));else i(e.left)<i(e.right)?(a(e.left),a(e.right)):(a(e.right),a(e.left))}};return a(e),Math.sqrt(r)}function Tu(e){let t=e.terrainSource??e,n=t.biomes?.ocean??t.ocean;if(!n?.length)return null;let r=su.get(n);if(r)return r;let i=t.surface?.complete,a=i?t.bounds?.width??2*Math.PI*t.surface.radius:0,o=[],s=[],c=new q,l=new q;for(let e of n)for(let n of e)for(let e=0;e<n.length;e++){let r=n[e],u=n[(e+1)%n.length];r[0]===u[0]&&r[1]===u[1]||i&&(Math.abs(Math.abs(r[0])-a/2)<.002&&Math.abs(r[0]-u[0])<.002||Math.abs(Math.abs(r[1])-a/4)<.002&&Math.abs(r[1]-u[1])<.002)||(o.push({a:r,b:u,minX:Math.min(r[0],u[0]),maxX:Math.max(r[0],u[0]),minZ:Math.min(r[1],u[1]),maxZ:Math.max(r[1],u[1])}),i&&(rt(t,...r,c).multiplyScalar(t.surface.radius),rt(t,...u,l).multiplyScalar(t.surface.radius),s.push({a:c.toArray(),b:l.toArray()})))}return r={source:t,period:a,edges:new vo(o),sphere:Cu(s)},su.set(n,r),r}function Eu(e,t,n,r=1/0){let i=Tu(e);if(!i)return r;let a=i.period?[0,-i.period,i.period]:[0],o=r;for(let e of a)o=i.edges.nearest(t+e,n,r=>Math.sqrt(Su([t+e,n],r.a,r.b)),o);return o}function Du(e,t,n,r=new _){let i=e.terrainSource??e;if(!i.surface?.complete)return r.copy(X.ocean);rt(i,t,n,cu),ze(i,t,n,lu);let{x:a,y:o,z:s}=cu,c=Math.abs(lu.latitude)/90,l=(Math.sin(a*5.1+o*2.3-s*3.7)+Math.sin(o*6.3+s*4.2+a*1.7))*.25+.5;r.copy(uu).lerp(du,.38+.42*l-.15*c);let u=xu((c-.5)/.43);r.lerp(pu,u*.26);let d=Tu(i),f=(24+18*l)*(1-u*.32),p=d?.sphere?wu(d.sphere,[a*i.surface.radius,o*i.surface.radius,s*i.surface.radius],f*2):f*2,m=Math.exp(-((p/f)**2))*(.64-.16*c);return bu.copy(fu).lerp(mu,u*.72),r.lerp(bu,m)}function Ou(e,t,n,{map:r=!1,target:i=new _}={}){let a=e.terrainSource??e,o=a.biomes?.shoreWidth??a.shoreWidth??.9,s=Eu(a,t,n,o*2);if(s>=o*1.5)return i.copy(X.sand);let c=xu(s/o);Ql(a,t,n,{map:r,target:i}),Vt(a,t,n,vu);let l=xu((vu.patch-.3)/.5)*.58,u=a.surface?.complete?xu((Math.abs(vu.latitude)-61)/18):0;return yu.copy(hu).lerp(gu,l).lerp(_u,u*.8),i.lerp(yu,1-c)}function ku(e,t,n){let r=t.surface.projection?.radius??t.surface.radius,i=2*Math.PI*r,a=[];for(let t of e)for(let e of t)for(let t=0;t<e.length;t++){let n=e[t],r=e[(t+1)%e.length],o=r[0]-n[0],s=r[1]-n[1];o===0&&s===0||Math.abs(Math.abs(n[0])-i/2)<.002&&Math.abs(o)<.002||Math.abs(Math.abs(n[1])-i/4)<.002&&Math.abs(s)<.002||a.push({a:n,b:r,dx:o,dz:s,length2:o*o+s*s,minX:Math.min(n[0],r[0]),maxX:Math.max(n[0],r[0]),minZ:Math.min(n[1],r[1]),maxZ:Math.max(n[1],r[1])})}let o=new vo(a);return(e,t,r)=>{let a=48;for(let n of[0,-i,i]){let r=e+n;a=o.nearest(r,t,e=>{let n=Math.max(0,Math.min(1,((r-e.a[0])*e.dx+(t-e.a[1])*e.dz)/e.length2));return Math.hypot(r-e.a[0]-n*e.dx,t-e.a[1]-n*e.dz)},a)}let s=Math.max(0,Math.min(1,a/48)),c=s*s*(3-2*s);return Ql(n,e,t,{map:!0,target:r}),r.multiplyScalar(1-.07*c).lerp(X.forestFloor,.18*c).lerp(X.mountainFloor,.08*c)}}function Au(e,t=e){let n=t.surface?.type===`sphere`,r=t.surface?.complete,i=new Map;function a(a,o,s,c=!1,l=null){for(let u of r?ou(a,128):a){let a=n?u.map(e=>tu(e,8)):u,d=new O(a[0].map(([e,t])=>new Y(e,-t)));for(let e of a.slice(1))d.holes.push(new C(e.map(([e,t])=>new Y(e,-t))));let f=new Se(d);if(f.rotateX(-Math.PI/2),f.translate(0,o,0),c&&!r){let t=f;f=$l(t,e.colorField,{map:!0}),t.dispose()}if(n){for(let e of Object.keys(f.attributes))e!==`position`&&e!==`color`&&f.deleteAttribute(e);let t=f;if(f=eu(t,r&&s===`terrain`?32:16),t.dispose(),r){let t=f;if(f=nu(t),t.dispose(),c){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new _;for(let i=0;i<t.count;i++)Ql(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),n[i*3]=r.r,n[i*3+1]=r.g,n[i*3+2]=r.b;f.setAttribute(`color`,new z(n,3))}}}if(s===`sand`||l){let t=f.attributes.position,n=new Float32Array(t.count*3),r=new _;for(let i=0;i<t.count;i++)l?l(t.getX(i),t.getZ(i),r):Ou(e.colorField,t.getX(i),t.getZ(i),{map:!0,target:r}),r.toArray(n,i*3);f.setAttribute(`color`,new z(n,3))}n&&(f.scale(1,16,1),Ft(f,t));let p=f.index&&!r?f.toNonIndexed():f;i.has(s)||i.set(s,[]),i.get(s).push({position:p.attributes.position.array,vertexColor:p.attributes.color?.array,index:r?p.index?.array:void 0}),p!==f&&f.dispose(),p.dispose()}}a(e.land,0,`terrain`,!0),a(e.shores,.003,`sand`),a(e.river,.006,`waterLight`),t.surface?.complete||a(e.ocean,n?.01:.007,`ocean`);for(let n of e.mountains)a(n.low,.02,`contour0`,!1,r?ku(n.low,t,e.colorField):null),a(n.high,.023,`contour1`),a(n.snow,.033,`snow`);return[...i].map(([e,t])=>{let i=new Float32Array(t.reduce((e,t)=>e+t.position.length,0)),a=t[0].vertexColor?new Float32Array(i.length):void 0,o=0;for(let e of t)i.set(e.position,o),a?.set(e.vertexColor,o),o+=e.position.length;if(r){let n=new Uint32Array(t.reduce((e,t)=>e+t.index.length,0)),r=0,o=0;for(let e of t){for(let t of e.index)n[r++]=o+t;o+=e.position.length/3}return{color:e,position:i,index:n,...a?{vertexColor:a}:{}}}if(n){let t=new $e;t.setAttribute(`position`,new z(i,3)),a&&t.setAttribute(`color`,new z(a,3));let n=nu(t);if(ru(n)<ru(t)){let r={color:e,position:n.attributes.position.array,index:n.index.array,...a?{vertexColor:n.attributes.color.array}:{}};return t.dispose(),n.dispose(),r}t.dispose(),n.dispose()}return{color:e,position:i,...a?{vertexColor:a}:{}}})}function ju(e,t){return e.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t},e.vertexShader=`uniform float mapSurfaceRadius; varying float globeLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
      vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
      vec3 viewNormal=mat3(viewMatrix)*radialNormal;
      globeLight=0.44+0.62*max(0.0,dot(viewNormal,normalize(vec3(-0.48,0.58,0.92))));`),e.fragmentShader=`varying float globeLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= globeLight;
 outgoingLight *= mix(vec3(0.91,0.97,1.05), vec3(1.04,1.01,0.93), smoothstep(0.50,1.0,globeLight));
#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`complete-globe-light-v2`,e}var Mu={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`},Nu={grass:X.grass.clone().lerp(X.trim,.1),farmland:X.farmland.clone().lerp(X.trim,.08),forestFloor:X.forestFloor.clone().lerp(X.grass,.27),desert:X.desert.clone(),mountainFloor:X.mountainFloor.clone().lerp(X.grass,.25),contour0:X.forestFloor.clone().lerp(X.grass,.32),contour1:X.rockLight.clone().lerp(X.grass,.2),ink:X.window.clone().lerp(X.rail,.18),paper:X.trim.clone()};function Pu(e){let t=new O(e[0].map(([e,t])=>new Y(e,-t)));e.slice(1).forEach(e=>t.holes.push(new C(e.map(([e,t])=>new Y(e,-t)))));let n=new Se(t);return n.rotateX(-Math.PI/2),n}function Fu(e,t){let n=e/2,r=(t-e)/2,i=new O;i.moveTo(-n,-r),i.lineTo(-n,r),i.absarc(0,r,n,Math.PI,0,!0),i.lineTo(n,-r),i.absarc(0,-r,n,0,-Math.PI,!0),i.closePath();let a=new Se(i,2);return a.rotateX(-Math.PI/2),a}function Iu(e,t,n,r=1,i=1){let o=p.clamp(Math.round(Number(e.level)||1),1,10),s=(1.75+o*.12)*r,c=o<=3?[[-.61,.48],[.61,.48],[.61,-.1],[0,-.68],[-.61,-.1]]:o<=6?[[-.75,.48],[.75,.48],[.75,-.07],[.43,-.07],[.43,-.34],[0,-.68],[-.43,-.34],[-.43,-.07],[-.75,-.07]]:[[-.73,.48],[.73,.48],[.73,-.07],[.39,-.07],[.39,-.4],[.18,-.4],[.18,-.74],[-.18,-.74],[-.18,-.4],[-.39,-.4],[-.39,-.07],[-.73,-.07]],l=t?Rl(t):{body:X.roof,trim:X.trim},u=(e,t,n)=>{let r=Pu([e]),a=r.toNonIndexed();r.dispose(),a.translate(0,n*i,0);let o=new Float32Array(a.attributes.position.count*3);for(let e=0;e<o.length;e+=3)o[e]=t.r,o[e+1]=t.g,o[e+2]=t.b;return a.setAttribute(`color`,new z(o,3)),a},d=(e,t,n)=>u(Array.from({length:12},(t,n)=>[Math.cos(n*Math.PI/6)*s*e,Math.sin(n*Math.PI/6)*s*e]),t,n),f=d(1,Nu.ink,.091),m=d(.89,l.trim,.094),h=u(c.map(([e,t])=>[e*s,t*s]),l.body,.097),g=uo([f,m,h],!1);f.dispose(),m.dispose(),h.dispose();let _=g.attributes.position.count,v=new Float32Array(_*3);for(let e=0;e<_;e++)l.body.toArray(v,e*3);g.setAttribute(`cityDotColor`,new z(v,3)),g.setAttribute(`cityCompactScale`,new z(new Float32Array(_).fill(qa/(2*Ja(o))),1));let y=new a(g,n);return y.name=`map-city-${e.id}`,y.position.set(e.x,0,e.z),y.userData={cityId:e.id,ownerId:e.ownerId??null,level:o},y}function Lu(e,t){let n=t.surface?.type===`sphere`,r=n?16:1,i=new ut;i.name=`map-world`,e.add(i);let o=new ut;o.name=`map-static`,i.add(o);let s=new ut;s.name=`map-cities`,i.add(s);let c=new ut;c.name=`map-trains`,i.add(c);let l=new Map((t.players??[]).map(e=>[e.id,e])),u=new Map([...l].map(([e,t])=>[`player:${e}:body`,Rl(t).body])),d=e=>l.has(e.state?.ownerId)?`player:${e.state.ownerId}:body`:Mu[e.state?.color]??e.state?.color??`redLight`,f=p.clamp(Math.sqrt((t.bounds?.width??130)*(t.bounds?.depth??95)/12350),1,2.6),m=new Map,h=new Map,g=new Set,_=[],v=[],y=[],b=new q,x=new q,S=new q,C=new q,w=new q,T=new q,E=(e,n)=>(Ne(t,e.x,e.z,n),n.setPosition(Ve(t,e.x,0,e.z,b)),n),D={cityBatches:0,trainBatches:0,updatedCars:0,staticVertices:0,farTrains:!1,declutterPasses:0,cityAttributeUpdates:0,networkVisibility:1},O={value:1},k={value:1},A={value:1},j=!1,M=(e,r=!1)=>{m.has(e)||m.set(e,new Qe({name:`map-${e}`,color:r||e===`terrain`?16777215:u.get(e)??Nu[e.replace(`route-`,``)]??X[e]??X.trim,vertexColors:r||e===`terrain`,side:2,toneMapped:!1}));let i=m.get(e);if(e.startsWith(`route-`)&&!i.userData.routeShader&&(i.userData.routeShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapRouteScale=O,e.vertexShader=`attribute vec3 routeOffset; uniform float mapRouteScale;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position) + routeOffset * (mapRouteScale - 1.0);`)},i.customProgramCacheKey=()=>`map-route-width`),n&&[`terrain`,`sand`,`waterLight`,`ocean`,`contour0`,`contour1`,`snow`].includes(e)&&!i.userData.surfaceShader&&(i.userData.surfaceShader=!0,i.onBeforeCompile=e=>{e.uniforms.mapSurfaceRadius={value:t.surface.radius},e.vertexShader=`uniform float mapSurfaceRadius; varying float surfaceLight;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
          vec3 radialNormal=normalize(position+vec3(0.0,mapSurfaceRadius,0.0));
          surfaceLight=0.52+0.52*max(0.0,dot(radialNormal,normalize(vec3(-0.45,0.82,0.35))));`),e.fragmentShader=`varying float surfaceLight;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= surfaceLight;
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>`map-surface-light`,t.surface.complete&&ju(i,t.surface.radius)),!i.userData.mapStyle){i.userData.mapStyle=!0;let t=e.startsWith(`route-`)||e===`paper`||e.startsWith(`player:`)||Object.values(Mu).includes(e);Gt(i,{kind:t?`map-symbol`:[`ocean`,`waterLight`].includes(e)?`water`:`map`,role:e.endsWith(`paper`)?`paper`:e.endsWith(`ink`)?`ink`:`owner`}),t&&Xa(i,A)}return i},N=(e,t,n=0,r=0,i=0,a=0)=>{e.rotateY(a),e.translate(r,n,i);let o=e.index?e.toNonIndexed():e;o!==e&&e.dispose();for(let e of Object.keys(o.attributes))e!==`position`&&e!==`routeOffset`&&o.deleteAttribute(e);h.has(t)||h.set(t,[]),h.get(t).push(o)},P=(e,i,a,o)=>{let s=[],c=[];for(let o=0;o<e.length-1;o++){let l=e[o],u=e[o+1],d=u.x-l.x,f=u.z-l.z,p=Math.hypot(d,f)||1,m=e=>e.tangent?{x:e.tangent.z,z:-e.tangent.x}:{x:f/p,z:-d/p},h=m(l),g=m(u),_=[{x:l.x-h.x*i/2,z:l.z-h.z*i/2},{x:l.x+h.x*i/2,z:l.z+h.z*i/2},{x:u.x-g.x*i/2,z:u.z-g.z*i/2},{x:u.x+g.x*i/2,z:u.z+g.z*i/2}],v=n?[l,u].flatMap((e,n)=>{let o=n?g:h;return Ve(t,e.x,a*r,e.z,S),rt(t,e.x,e.z,C),Dt(t,e.x,a*r,e.z,-o.z,0,o.x,w).normalize(),T.crossVectors(C,w).normalize(),[-1,1].map(e=>(x.copy(S).addScaledVector(T,e*i/2),x.y+=t.surface.radius,x.setLength(t.surface.radius+a*r),x.y-=t.surface.radius,x.clone()))}):null;for(let e of[0,2,1,1,2,3]){let i=e<2?l:u,o=_[e];n?(x.copy(v[e]),Ve(t,i.x,a*r,i.z,S),s.push(x.x,x.y,x.z),c.push(x.x-S.x,x.y-S.y,x.z-S.z)):(s.push(o.x,a,o.z),c.push(o.x-i.x,0,o.z-i.z))}}let l=new $e;l.setAttribute(`position`,new Re(s,3)),l.setAttribute(`routeOffset`,new Re(c,3)),N(l,o)},F=t.mapTerrain??Gl(t);for(let{color:e,position:n,vertexColor:r,index:i}of F.meshes??Au(F,t)){let t=new $e;t.setAttribute(`position`,new z(n,3)),i&&t.setIndex(new z(i,1)),r&&t.setAttribute(`color`,new z(r,3)),h.set(e,[t])}for(let e of t.lines)for(let t of e.renderRanges??[{start:0,end:e.length}]){let r=[t.start];for(let i of e.alignment?.segments??[{startDistance:0,endDistance:e.length,type:`arc`,radius:8}]){let e=Math.max(t.start,i.startDistance),a=Math.min(t.end,i.endDistance);if(a<=e)continue;let o=i.type===`line`?a-e:Math.max(.4,Math.sqrt(8*(i.radius??8)*.025)),s=n?Math.min(8,o):o,c=Math.max(1,Math.ceil((a-e)/s));for(let t=1;t<=c;t++)r.push(e+(a-e)*t/c)}let i=r.map(t=>_l(e,t));P(i,.96,.075,`route-paper`),P(i,.42,.078,`route-ink`)}for(let[e,t]of h){let n=uo(t,!1);g.add(n);let r=new a(n,M(e,!!n.attributes.color));r.name=`map-${e.replace(`route-`,``)}`,o.add(r),e.startsWith(`route-`)&&(r.frustumCulled=!1,y.push(r)),D.staticVertices+=n.attributes.position.count,t.forEach(e=>e.dispose())}h.clear();let I=new Qe({name:`map-city`,vertexColors:!0,side:2,toneMapped:!1});I.onBeforeCompile=e=>{e.uniforms.mapCityScale=k,e.vertexShader=`uniform float mapCityScale; attribute float cityDetail; attribute float cityCompactScale; attribute vec3 cityDotColor;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,`#include <color_vertex>
      #ifdef USE_COLOR
        vColor.xyz=mix(cityDotColor,vColor.xyz,cityDetail);
      #endif`),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`float citySize=mapCityScale*mix(cityCompactScale,1.0,cityDetail); vec3 transformed = vec3(position.x * citySize, position.y, position.z * citySize);`)},I.customProgramCacheKey=()=>`map-city-screen-size-v2`,Gt(I,{kind:`map-symbol`,role:`owner`}),Xa(I,A),m.set(`city-glyph`,I);let L=(e,r,i=0,a=!1)=>v.push({city:e,attribute:r,index:i,instanced:a,detail:1,target:1,anchor:Ve(t,e.x,0,e.z),normal:n?rt(t,e.x,e.z):null});if((t.cities?.length??0)<=32)for(let e of t.cities??[]){let t=Iu(e,l.get(e.ownerId),I,f,r),i=new z(new Float32Array(t.geometry.attributes.position.count).fill(1),1);i.setUsage(xe),t.geometry.setAttribute(`cityDetail`,i),L(e,i),n&&(t.matrixAutoUpdate=!1,E(e,t.matrix)),t.frustumCulled=!1,g.add(t.geometry),s.add(t)}else{let e=new Map,n=new tt;for(let n of t.cities){let t=`${n.ownerId}:${n.level}`;e.has(t)||e.set(t,[]),e.get(t).push(n)}for(let[t,i]of e){let e=Iu(i[0],l.get(i[0].ownerId),I,f,r),a=new Et(new Float32Array(i.length).fill(1),1);a.setUsage(xe),e.geometry.setAttribute(`cityDetail`,a),g.add(e.geometry);let o=new Fe(e.geometry,I,i.length);o.frustumCulled=!1,o.name=`map-city-batch-${t}`,o.userData.instanceCityIds=i.map(e=>e.id),i.forEach((e,t)=>{E(e,n),o.setMatrixAt(t,n),L(e,a,t,!0)}),o.computeBoundingSphere(),s.add(o),_.push(o)}}D.cityBatches=s.children.length,v.sort((e,t)=>(t.city.level??1)-(e.city.level??1)||String(e.city.id).localeCompare(String(t.city.id)));let ee=new q(1/0,0,0),R=new gt,te=new q,B=new q,V=new q,H=NaN,ne=NaN,re=NaN,ie=1/0;function ae(e,t,n,r,a){if(!e?.isOrthographicCamera||!v.length)return;let o=(e.right-e.left)/(e.top-e.bottom),s=n*o;if(ie+=r,(Math.abs(Math.log(t/H))>.015||ne!==n||re!==o||e.position.distanceToSquared(ee)>(t*2)**2||e.quaternion.angleTo(R)>.003)&&ie>=.075){i.updateWorldMatrix(!0,!1),e.getWorldDirection(V);let r=Za(v.map(t=>{te.copy(t.anchor).applyMatrix4(i.matrixWorld).project(e);let r=!t.normal||B.copy(t.normal).transformDirection(i.matrixWorld).dot(V)<-.035;return{id:t.city.id,x:te.x*s/2,y:te.y*n/2,radius:Ja(t.city.level),previous:t.target,visible:r&&Math.abs(te.x)<1+2*Ja(10)/s&&Math.abs(te.y)<1+2*Ja(10)/n&&Math.abs(te.z)<=1}}),t);for(let e of v)e.target=r.get(e.city.id);ee.copy(e.position),R.copy(e.quaternion),H=t,ne=n,re=o,ie=0,D.declutterPasses++}let c=a?1:1-Math.exp(-12*Math.min(.1,Math.max(0,r))),l=new Set;for(let e of v){let t=Math.abs(e.detail-e.target)<.002?e.target:e.detail+(e.target-e.detail)*c;t!==e.detail&&(e.detail=t,e.instanced?e.attribute.setX(e.index,t):e.attribute.array.fill(t),l.add(e.attribute))}for(let e of l)e.needsUpdate=!0,D.cityAttributeUpdates++}let oe=Math.min(f,1.8),U=Fu(1.22*oe,2.45),se=Fu(.92*oe,2.13);for(let e of[U,se])g.add(e);let ce=new q,le=new q,ue=new gt,de=null,fe=[],pe=[],me=[],he=[],ge=!1,_e=new q,ve=new q,ye=new q,be=new q,Se={},W={},Ce=NaN,we=NaN,Te=(e,t,n,r)=>{let i=new Fe(e,M(t),n);return i.name=r,i.frustumCulled=!1,i.instanceMatrix.setUsage(xe),c.add(i),i},Ee=(e,i,a,o,s,c,l,u=1,d=1)=>{let f=e.instanceMatrix.array,p=i*16,m=Math.cos(s)*l,h=Math.sin(s)*l;if(n){(a!==Ce||o!==we)&&(rt(t,a,o,ve),Ce=a,we=o),Ve(t,a,c*r,o,_e),Dt(t,a,c*r,o,h,0,m,ye).normalize(),be.crossVectors(ve,ye).normalize();for(let e=0;e<3;e++)f[p+e]=be.getComponent(e)*l*u,f[p+4+e]=ve.getComponent(e)*l,f[p+8+e]=ye.getComponent(e)*l*d;f[p+12]=_e.x,f[p+13]=_e.y,f[p+14]=_e.z}else f[p]=m*u,f[p+1]=0,f[p+2]=-h*u,f[p+4]=0,f[p+5]=l,f[p+6]=0,f[p+8]=h*d,f[p+9]=0,f[p+10]=m*d,f[p+12]=a,f[p+13]=c,f[p+14]=o;f[p+3]=0,f[p+7]=0,f[p+11]=0,f[p+15]=1};function G(e=[],{visible:r=!0,camera:a,viewportHeight:o=900,poseBuffer:l=e.poseBuffer,dt:u=1/60,reducedMotion:p=!1}={}){if(D.updatedCars=0,j||!r)return;let m=a?.isOrthographicCamera?(a.top-a.bottom)/a.zoom/Math.max(1,o):0,h=Qa(m,f,oe);O.value=h.routeScale,k.value=h.cityScale,A.value=D.networkVisibility=Ya(a?.zoom);let g=A.value>0;s.visible=c.visible=g;for(let e of y)e.visible=g;if(!g)return;ae(a,m,o,u,p);let _=h.trainScaleZ>1,v=de!==e||pe.length!==e.length||ge!==_;ge=_,D.farTrains=ge;for(let t=0;!v&&t<e.length;t++)v=pe[t]!==e[t].state?.ownerId||me[t]!==e[t].state?.color||he[t]!==e[t].parts;if(v){c.children.forEach(e=>e.dispose()),c.clear(),fe=[],de=e,pe=e.map(e=>e.state?.ownerId),me=e.map(e=>e.state?.color),he=e.map(e=>e.parts);let t=e.flatMap(e=>(ge?[e.parts[Math.floor(e.parts.length/2)]]:e.parts).filter(Boolean).map(t=>({train:e,part:t}))),n=t.length;if(n){let e=Te(U,`paper`,n,`map-train-outlines`),r=new Map;for(let{train:e}of t){let t=d(e);r.set(t,(r.get(t)??0)+1)}let i=new Map([...r].map(([e,t])=>[e,{mesh:Te(se,e,t,`map-train-${e}`),next:0}]));t.forEach(({train:t,part:n},r)=>{let a=i.get(d(t));fe.push({train:t,part:n,outlineIndex:r,outline:e,body:a.mesh,bodyIndex:a.next++})})}D.trainBatches=c.children.length}i.updateWorldMatrix(!0,!1);let b=ge?h.trainScaleX:1,x=ge?h.trainScaleZ:1;for(let e of fe){let{train:r,part:a}=e,o,s,c,u;if(l&&a.userData.poseOnly){let e=a.userData.poseIndex*6;o=l[e],s=l[e+2],c=l[e+3],u=+(l[e+4]>0&&r.state?.active!==!1)}else a.userData.poseOnly?(o=a.position.x,s=a.position.z,c=a.rotation.y,u=a.visible&&r.state?.active!==!1?1:0):(a.getWorldPosition(ce),a.getWorldQuaternion(ue),le.set(0,0,1).applyQuaternion(ue).add(ce),i.worldToLocal(ce),i.worldToLocal(le),le.sub(ce),n?(bt(t,ce,Se),bt(t,le.add(ce),W),o=Se.x,s=Se.z,c=Math.atan2(W.x-o,W.z-s)):(o=ce.x,s=ce.z,c=Math.atan2(le.x,le.z)),u=a.visible&&r.state?.active!==!1?1:0);Ee(e.outline,e.outlineIndex,o,s,c,.12,u,b,x),Ee(e.body,e.bodyIndex,o,s,c,.123,u,b,x),D.updatedCars++}c.children.forEach(e=>{e.instanceMatrix.needsUpdate=!0})}function De(){j||(j=!0,c.children.forEach(e=>e.dispose()),_.forEach(e=>e.dispose()),g.forEach(e=>e.dispose()),m.forEach(e=>e.dispose()),i.clear(),i.removeFromParent())}return{root:i,update:G,dispose:De,stats:D}}var Ru=1.25,zu=65535,Bu=2**-24,Vu=Symbol(`SKIP_GENERATION`),Hu={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Vu]:!1};function Uu(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function Wu(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function Gu(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],a=t[e+2*r+1],o=i-a,s=i+a;o<n[r]&&(n[r]=o),s>n[r+3]&&(n[r+3]=s)}}function Ku(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function qu(e,t){return t[e+15]===zu}function Ju(e,t){return t[e+6]}function Yu(e,t){return t[e+14]}function Xu(e){return e+8}function Zu(e,t){return e+t[e+6]*8}function Qu(e,t){return t[e+7]}function $u(e){return e}function ed(e,t,n,r,i){let a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,m=-1/0,h=-1/0,g=-1/0,_=e.offset||0;for(let r=(t-_)*6,i=(t+n-_)*6;r<i;r+=6){let t=e[r+0],n=e[r+1],i=t-n,_=t+n;i<a&&(a=i),_>c&&(c=_),t<d&&(d=t),t>m&&(m=t);let v=e[r+2],y=e[r+3],b=v-y,x=v+y;b<o&&(o=b),x>l&&(l=x),v<f&&(f=v),v>h&&(h=v);let S=e[r+4],C=e[r+5],w=S-C,T=S+C;w<s&&(s=w),T>u&&(u=T),S<p&&(p=S),S>g&&(g=S)}r[0]=a,r[1]=o,r[2]=s,r[3]=c,r[4]=l,r[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=m,i[4]=h,i[5]=g}var td=8,nd=8,rd=new Int32Array(td),id=new Float32Array(48),ad=new Float32Array(48),od=new Float32Array(6),sd=new Float32Array(6),cd=new Int32Array(nd),ld=new Float32Array(48);function ud(e,t,n,r){for(let i=0;i<3;i++){let a=t[e+2*i],o=t[e+2*i+1],s=a-o,c=a+o;s<n[r+i]&&(n[r+i]=s),c>n[r+i+3]&&(n[r+i+3]=c)}}function dd(e,t){let n=e[t+3]-e[t],r=e[t+4]-e[t+1],i=e[t+5]-e[t+2];return 2*(n*r+r*i+i*n)}function fd(e,t,n,r,i,a){let o=-1,s=0;if(a===0)o=Wu(t),o!==-1&&(s=(t[o]+t[o+3])/2);else if(a===1)o=Wu(e),o!==-1&&(s=pd(n,r,i,o));else if(a===2){let a=Ku(e),c=Ru*i,l=n.offset||0,u=(r-l)*6,d=(r+i-l)*6;for(let e=0;e<3;e++){let r=t[e],l=(t[e+3]-r)/td;if(i<nd){for(let t=0;t<i;t++){let r=u+t*6,i=n[r+2*e],a=t;for(;a>0&&n[cd[a-1]+2*e]>i;)cd[a]=cd[a-1],a--;cd[a]=r}for(let e=0;e<3;e++)od[e]=1/0,od[e+3]=-1/0,sd[e]=1/0,sd[e+3]=-1/0;for(let e=i-1;e>=0;e--)Gu(cd[e],n,sd),ld.set(sd,e*6);for(let t=0;t<i-1;t++){Gu(cd[t],n,od);let r=n[cd[t+1]+2*e];if(n[cd[t]+2*e]===r)continue;let l=t+1,u=i-l,d=Ku(od)/a,f=dd(ld,l*6)/a,p=1+Ru*(d*l+f*u);p<c&&(o=e,c=p,s=r)}}else{for(let e=0;e<td;e++){rd[e]=0;for(let t=0;t<3;t++)id[e*6+t]=1/0,id[e*6+t+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((n[t+2*e]-r)/l);i>=td&&(i=7),rd[i]++,ud(t,n,id,i*6)}for(let e=0;e<6;e++)ad[42+e]=id[42+e];for(let e=6;e>=0;e--){let t=e*6,n=t+6;for(let e=0;e<3;e++)ad[t+e]=Math.min(id[t+e],ad[n+e]),ad[t+e+3]=Math.max(id[t+e+3],ad[n+e+3])}let t=0;for(let n=0;n<7;n++){let u=n*6,d=rd[n];if(d!==0)for(let e=0;e<3;e++)t===0?(od[e]=id[u+e],od[e+3]=id[u+e+3]):(od[e]=Math.min(od[e],id[u+e]),od[e+3]=Math.max(od[e+3],id[u+e+3]));t+=d;let f=0,p=0;t!==0&&(f=Ku(od)/a);let m=i-t;m!==0&&(p=dd(ad,u+6)/a);let h=1+Ru*(f*t+p*m);h<c&&(o=e,c=h,s=r+l+n*l)}}}}else typeof a==`function`?{axis:o,pos:s}=a(e,t,n,r,i,n.offset):console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:o,pos:s}}function pd(e,t,n,r){let i=0,a=e.offset;for(let o=t,s=t+n;o<s;o++)i+=e[(o-a)*6+r*2];return i/n}function md(e,t,n,r,i,a){let o=r,s=r+i-1,c=a.pos,l=a.axis*2,u=n.offset||0;for(;;){for(;o<=s&&n[(o-u)*6+l]<c;)o++;for(;o<=s&&n[(s-u)*6+l]>=c;)s--;if(o<s){for(let n=0;n<t;n++){let r=e[o*t+n];e[o*t+n]=e[s*t+n],e[s*t+n]=r}for(let e=0;e<6;e++){let t=o-u,r=s-u,i=n[t*6+e];n[t*6+e]=n[r*6+e],n[r*6+e]=i}o++,s--}else return o}}var hd=2**32,gd=new Float32Array(6),_d=new Float32Array(6);function vd(e,t,n,r,i,a){let{maxDepth:o,verbose:s,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:u,onProgress:d,useSharedArrayBuffer:f=!1}=i,p=e.primitiveBuffer,m=e.primitiveBufferStride,h=new(f?SharedArrayBuffer:ArrayBuffer)(32*Math.max(1,2*Math.ceil(r)-1)),g=new Float32Array(h),_=new Uint32Array(h),v=new Uint16Array(h),y=0,b=!1;return ed(t,n,r,gd,_d),C(n,r,0),h.slice(0,y*32);function x(e){d&&d((e-a.offset)/a.count)}function S(e,t,n){let r=e*2;_[e+6]=t,v[r+14]=n,v[r+15]=zu,x(t+n)}function C(e,n,r){let i=y++,a=i*8;g.set(gd,a),!b&&r>=o&&(b=!0,s&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));let d=n>l;if(n<=c&&!d||r>=o){S(a,e,n);return}let f=fd(gd,_d,t,e,n,u),h=f.axis===-1?-1:md(p,m,t,e,n,f);if(f.axis===-1||h===e||h===e+n){if(!d){S(a,e,n);return}f.axis=Math.max(0,Wu(gd)),h=e+Math.max(1,Math.floor(n/2))}_[a+7]=f.axis;let v=h-e;ed(t,e,v,gd,_d),C(e,v,r+1);let x=y-i;if(x>hd)throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);_[a+6]=x;let w=n-v;ed(t,h,w,gd,_d),C(h,w,r+1)}}function yd(e,t){let n=e.getRootRanges(t.range),r=n[0],i=n[n.length-1],a={offset:r.offset,count:i.offset+i.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,e.computePrimitiveBounds(a.offset,a.count,o),e._roots=n.map(n=>vd(e,o,n.offset,n.count,t,a))}var bd=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},xd=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Sd,Cd,wd=[],Td=new bd(()=>new m);function Ed(e,t,n,r,i,a){Sd=Td.getPrimitive(),Cd=Td.getPrimitive(),wd.push(Sd,Cd),xd.setBuffer(e._roots[t]);let o=Dd(0,e.geometry,n,r,i,a);xd.clearBuffer(),Td.releasePrimitive(Sd),Td.releasePrimitive(Cd),wd.pop(),wd.pop();let s=wd.length;return s>0&&(Cd=wd[s-1],Sd=wd[s-2]),o}function Dd(e,t,n,r,i=null,a=0,o=0){let{float32Array:s,uint16Array:c,uint32Array:l}=xd,u=e*2;if(qu(u,c)){let t=Ju(e,l),n=Yu(u,c);return Uu($u(e),s,Sd),r(t,n,!1,o,a+e/8,Sd)}{let u=Xu(e),d=Zu(e,l),f=u,p=d,m,h,g,_;if(i&&(g=Sd,_=Cd,Uu($u(f),s,g),Uu($u(p),s,_),m=i(g),h=i(_),h<m)){f=d,p=u;let e=m;m=h,h=e,g=_}g||(g=Sd,Uu($u(f),s,g));let v=qu(f*2,c),y=n(g,v,m,o+1,a+f/8),b;if(y===2){let e=w(f);b=r(e,T(f)-e,!0,o+1,a+f/8,g)}else b=y&&Dd(f,t,n,r,i,a,o+1);if(b)return!0;_=Cd,Uu($u(p),s,_);let x=qu(p*2,c),S=n(_,x,h,o+1,a+p/8),C;if(S===2){let e=w(p);C=r(e,T(p)-e,!0,o+1,a+p/8,_)}else C=S&&Dd(p,t,n,r,i,a,o+1);return!!C;function w(e){let{uint16Array:t,uint32Array:n}=xd,r=e*2;for(;!qu(r,t);)e=Xu(e),r=e*2;return Ju(e,n)}function T(e){let{uint16Array:t,uint32Array:n}=xd,r=e*2;for(;!qu(r,t);)e=Zu(e,n),r=e*2;return Ju(e,n)+Yu(r,t)}}}var Od=new xd.constructor,kd=new xd.constructor,Ad=new bd(()=>new m),jd=new m,Md=new m,Nd=new m,Pd=new m,Fd=!1;function Id(e,t,n,r){if(Fd)throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);Fd=!0;let i=e._roots,a=t._roots,o,s=0,c=0,l=new tt().copy(n).invert();for(let e=0,t=i.length;e<t;e++){Od.setBuffer(i[e]),c=0;let t=Ad.getPrimitive();Uu($u(0),Od.float32Array,t),t.applyMatrix4(l);for(let e=0,i=a.length;e<i&&(kd.setBuffer(a[e]),o=Ld(0,0,n,l,r,s,c,0,0,t),kd.clearBuffer(),c+=a[e].byteLength/32,!o);e++);if(Ad.releasePrimitive(t),Od.clearBuffer(),s+=i[e].byteLength/32,o)break}return Fd=!1,o}function Ld(e,t,n,r,i,a=0,o=0,s=0,c=0,l=null,u=!1){let d,f;u?(d=kd,f=Od):(d=Od,f=kd);let p=d.float32Array,m=d.uint32Array,h=d.uint16Array,g=f.float32Array,_=f.uint32Array,v=f.uint16Array,y=e*2,b=t*2,x=qu(y,h),S=qu(b,v),C=!1;if(S&&x)C=u?i(Ju(t,_),Yu(t*2,v),Ju(e,m),Yu(e*2,h),c,o+t/8,s,a+e/8):i(Ju(e,m),Yu(e*2,h),Ju(t,_),Yu(t*2,v),s,a+e/8,c,o+t/8);else if(S){let l=Ad.getPrimitive();Uu($u(t),g,l),l.applyMatrix4(n);let d=Xu(e),f=Zu(e,m);Uu($u(d),p,jd),Uu($u(f),p,Md);let h=l.intersectsBox(jd),_=l.intersectsBox(Md);C=h&&Ld(t,d,r,n,i,o,a,c,s+1,l,!u)||_&&Ld(t,f,r,n,i,o,a,c,s+1,l,!u),Ad.releasePrimitive(l)}else{let d=Xu(t),f=Zu(t,_);Uu($u(d),g,Nd),Uu($u(f),g,Pd);let h=l.intersectsBox(Nd),v=l.intersectsBox(Pd);if(h&&v)C=Ld(e,d,n,r,i,a,o,s,c+1,l,u)||Ld(e,f,n,r,i,a,o,s,c+1,l,u);else if(h){if(x)C=Ld(e,d,n,r,i,a,o,s,c+1,l,u);else{let t=Ad.getPrimitive();t.copy(Nd).applyMatrix4(n);let l=Xu(e),f=Zu(e,m);Uu($u(l),p,jd),Uu($u(f),p,Md);let h=t.intersectsBox(jd),g=t.intersectsBox(Md);C=h&&Ld(d,l,r,n,i,o,a,c,s+1,t,!u)||g&&Ld(d,f,r,n,i,o,a,c,s+1,t,!u),Ad.releasePrimitive(t)}}else if(v){if(x)C=Ld(e,f,n,r,i,a,o,s,c+1,l,u);else{let t=Ad.getPrimitive();t.copy(Pd).applyMatrix4(n);let l=Xu(e),d=Zu(e,m);Uu($u(l),p,jd),Uu($u(d),p,Md);let h=t.intersectsBox(jd),g=t.intersectsBox(Md);C=h&&Ld(f,l,r,n,i,o,a,c,s+1,t,!u)||g&&Ld(f,d,r,n,i,o,a,c,s+1,t,!u),Ad.releasePrimitive(t)}}}return C}var Rd=new class{constructor(){let e=null,t=null,n=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(i,a)=>{if(r)throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);this.root=a,this.buffer=e=i._roots[a],this.uint16Array=n=new Uint16Array(e),this.uint32Array=t=new Uint32Array(e)},this.reset=()=>{this.root=null,this.buffer=e=null,this.uint16Array=n=null,this.uint32Array=t=null},this.getRangeStart=e=>{let r=e*2;for(;!qu(r,n);)e=Xu(e),r=e*2;return Ju(e,t)},this.getRangeEnd=e=>{let r=e*2;for(;!qu(r,n);)e=Zu(e,t),r=e*2;return Ju(e,t)+Yu(r,n)};let i=(e,r,a)=>{let o=qu(r*2,n);if(!e(a,o,r)&&!o){let n=Xu(r),o=Zu(r,t);i(e,n,a+1),i(e,o,a+1)}};this.traverseBuffer=e=>{if(r)throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);r=!0;try{i(e,0,0)}finally{r=!1}},this.traverse=r=>{this.traverseBuffer((i,a,o)=>{if(a){let s=o*2,c=t[o+6],l=n[s+14];return r(i,a,new Float32Array(e,o*4,6),c,l)}{let n=Qu(o,t);return r(i,a,new Float32Array(e,o*4,6),n)}})}}},zd=`0.10.0`,Bd=new m,Vd=new Float32Array(6);typeof window<`u`&&(window.__THREE_MESH_BVH__?console.warn(`three-mesh-bvh: Multiple instances of three-mesh-bvh being imported.`):window.__THREE_MESH_BVH__=zd);var Hd=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Hu,...e},yd(this,e)}getRootRanges(){throw Error(`BVH: getRootRanges() not implemented`)}writePrimitiveBounds(){throw Error(`BVH: writePrimitiveBounds() not implemented`)}writePrimitiveRangeBounds(e,t,n,r){let i=1/0,a=1/0,o=1/0,s=-1/0,c=-1/0,l=-1/0;for(let n=e,r=e+t;n<r;n++){this.writePrimitiveBounds(n,Vd,0);let[e,t,r,u,d,f]=Vd;e<i&&(i=e),u>s&&(s=u),t<a&&(a=t),d>c&&(c=d),r<o&&(o=r),f>l&&(l=f)}return n[r+0]=i,n[r+1]=a,n[r+2]=o,n[r+3]=s,n[r+4]=c,n[r+5]=l,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let i=e,a=e+t;i<a;i++){this.writePrimitiveBounds(i,Vd,0);let[e,t,a,o,s,c]=Vd,l=(e+o)/2,u=(t+s)/2,d=(a+c)/2,f=(o-e)/2,p=(s-t)/2,m=(c-a)/2,h=(i-r)*6;n[h+0]=l,n[h+1]=f+(Math.abs(l)+f)*Bu,n[h+2]=u,n[h+3]=p+(Math.abs(u)+p)*Bu,n[h+4]=d,n[h+5]=m+(Math.abs(d)+m)*Bu}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t){if(t.BYTES_PER_ELEMENT===2&&t.some(t=>t+e>=2**16)){let e=t.buffer.constructor;t=new Uint32Array(new e(4*t.length)),t.set(this._indirectBuffer),this._indirectBuffer=t}for(let n=0,r=t.length;n<r;n++)t[n]+=e}else{let t=this._roots;for(let n=0;n<t.length;n++){let r=t[n],i=new Uint32Array(r),a=new Uint16Array(r),o=r.byteLength/32;for(let t=0;t<o;t++){let n=8*t;qu(2*n,a)&&(i[n+6]+=e)}}}}traverse(e,t=0){Rd.setBVH(this,t),Rd.traverse(e),Rd.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n),a=new Float32Array(n),o=n.byteLength/32;for(let e=o-1;e>=0;e--){let t=e*8,n=t*2;if(qu(n,i)){let e=Ju(t,r),o=Yu(n,i);this.writePrimitiveRangeBounds(e,o,Vd,0),a.set(Vd,t)}else{let e=Xu(t),n=Zu(t,r);for(let r=0;r<3;r++){let i=a[e+r],o=a[e+r+3],s=a[n+r],c=a[n+r+3];a[t+r]=i<s?i:s,a[t+r+3]=o>c?o:c}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{Uu(0,new Float32Array(t),Bd),e.union(Bd)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:i,scratchPrimitive:a,iterate:o}=e;if(r&&i){let e=r;r=(t,n,r,s,c)=>e(t,n,r,s,c)?!0:o(t,n,this,i,r,s,a)}else r||=i?(e,t,n,r)=>o(e,t,this,i,n,r,a):(e,t,n)=>n;let s=!1,c=0,l=this._roots;for(let e=0,i=l.length;e<i;e++){let i=l[e];if(s=Ed(this,e,n,r,t,c),s)break;c+=i.byteLength/32}return s}bvhcast(e,t,n){let{intersectsRanges:r}=n;return Id(this,e,t,r)}};function Ud(){return typeof SharedArrayBuffer<`u`}function Wd(e){return e.index?e.index.count:e.attributes.position.count}function Gd(e){return Wd(e)/3}function Kd(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function qd(e,t){if(!e.index){let n=e.attributes.position.count,r=Kd(n,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new z(r,1));for(let e=0;e<n;e++)r[e]=e}}function Jd(e,t,n){let r=Wd(e)/n,i=t||e.drawRange,a=i.start/n,o=(i.start+i.count)/n,s=Math.max(0,a),c=Math.min(r,o)-s;return{offset:Math.floor(s),count:Math.floor(c)}}function Yd(e,t){return e.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Xd(e,t,n){let r=Jd(e,t,n),i=Yd(e,n);if(!i.length)return[r];let a=[],o=r.offset,s=r.offset+r.count,c=Wd(e)/n,l=[];for(let e of i){let{offset:t,count:n}=e,r=t,i=t+(isFinite(n)?n:c-t);r<s&&i>o&&(l.push({pos:Math.max(o,r),isStart:!0}),l.push({pos:Math.min(s,i),isStart:!1}))}l.sort((e,t)=>e.pos===t.pos?e.type===`end`?-1:1:e.pos-t.pos);let u=0,d=null;for(let e of l){let t=e.pos;u!==0&&t!==d&&a.push({offset:d,count:t-d}),u+=e.isStart?1:-1,d=t}return a}function Zd(e,t){let n=e[e.length-1],r=n.offset+n.count>2**16,i=e.reduce((e,t)=>e+t.count,0),a=r?4:2,o=t?new SharedArrayBuffer(i*a):new ArrayBuffer(i*a),s=r?new Uint32Array(o):new Uint16Array(o),c=0;for(let t=0;t<e.length;t++){let{offset:n,count:r}=e[t];for(let e=0;e<r;e++)s[c+e]=n+e;c+=r}return s}var Qd=class extends Hd{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(!e.isBufferGeometry)throw Error(`BVH: Only BufferGeometries are supported.`);if(e.index&&e.index.isInterleavedBufferAttribute)throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);if(t.useSharedArrayBuffer&&!Ud())throw Error(`BVH: SharedArrayBuffer is not available.`);super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?e=>this._indirectBuffer[e]:e=>e,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Hu,...t},t[Vu]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Zd(Xd(t,e.range,n),e.useSharedArrayBuffer);this._indirectBuffer=r}else qd(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new m))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Xd(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw Error(`BVH: raycastObject3D() not implemented`)}},$d=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,a=e.length;i<a;i++){let a=e[i][t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=e.dot(a);n=o<n?o:n,r=o>r?o:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};$d.prototype.setFromBox=(function(){let e=new q;return function(t,n){let r=n.min,i=n.max,a=1/0,o=-1/0;for(let n=0;n<=1;n++)for(let s=0;s<=1;s++)for(let c=0;c<=1;c++){e.x=r.x*n+i.x*(1-n),e.y=r.y*s+i.y*(1-s),e.z=r.z*c+i.z*(1-c);let l=t.dot(e);a=Math.min(l,a),o=Math.max(l,o)}this.min=a,this.max=o}})();var ef=(function(){let e=new q,t=new q,n=new q;return function(r,i,a){let o=r.start,s=e,c=i.start,l=t;n.subVectors(o,c),e.subVectors(r.end,r.start),t.subVectors(i.end,i.start);let u=n.dot(l),d=l.dot(s),f=l.dot(l),p=n.dot(s),m=s.dot(s)*f-d*d,h,g;h=m===0?0:(u*d-p*f)/m,g=(u+h*d)/f,a.x=h,a.y=g}})(),tf=(function(){let e=new Y,t=new q,n=new q;return function(r,i,a,o){ef(r,i,e);let s=e.x,c=e.y;if(s>=0&&s<=1&&c>=0&&c<=1)r.at(s,a),i.at(c,o);else if(s>=0&&s<=1)c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);else if(c>=0&&c<=1)s<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);else{let e;e=s<0?r.start:r.end;let l;l=c<0?i.start:i.end;let u=t,d=n;if(r.closestPointToPoint(l,!0,t),i.closestPointToPoint(e,!0,n),u.distanceToSquared(l)<=d.distanceToSquared(e)){a.copy(u),o.copy(l);return}a.copy(e),o.copy(d);return}}})(),nf=(function(){let e=new q,t=new q,n=new ye,r=new Ue;return function(i,a){let{radius:o,center:s}=i,{a:c,b:l,c:u}=a;if(r.start=c,r.end=l,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o||(r.start=c,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o)||(r.start=l,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o))return!0;let d=a.getPlane(n);if(Math.abs(d.distanceToPoint(s))<=o){let e=d.projectPoint(s,t);if(a.containsPoint(e))return!0}return!1}})(),rf=[`x`,`y`,`z`],af=1e-15,of=af*af;function sf(e){return Math.abs(e)<af}var cf=class extends ot{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new q),this.satBounds=[,,,,].fill().map(()=>new $d),this.points=[this.a,this.b,this.c],this.plane=new ye,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Ue,this.needsUpdate=!0}intersectsSphere(e){return nf(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,a=this.satBounds,o=i[0],s=a[0];this.getNormal(o),s.setFromPoints(o,r);let c=i[1],l=a[1];c.subVectors(e,t),l.setFromPoints(c,r);let u=i[2],d=a[2];u.subVectors(t,n),d.setFromPoints(u,r);let f=i[3],p=a[3];f.subVectors(n,e),p.setFromPoints(f,r);let m=c.length(),h=u.length(),g=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<af?h<af||g<af?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):h<af?g<af?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<af&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};cf.prototype.closestPointToSegment=(function(){let e=new q,t=new q,n=new Ue;return function(r,i=null,a=null){this.needsUpdate&&this.update();let{start:o,end:s}=r,c=this.points,l,u=1/0;if(this.plane.distanceToPoint(o)*this.plane.distanceToPoint(s)<0&&this.plane.intersectLine(r,e)!==null&&this.containsPoint(e))return i&&i.copy(e),a&&a.copy(e),0;for(let o=0;o<3;o++){let s=(o+1)%3;n.start.copy(c[o]),n.end.copy(c[s]),tf(n,r,e,t),l=e.distanceToSquared(t),l<u&&(u=l,i&&i.copy(e),a&&a.copy(t))}return this.closestPointToPoint(o,e),l=o.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(o)),this.closestPointToPoint(s,e),l=s.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(s)),Math.sqrt(u)}})(),cf.prototype.intersectsTriangle=(function(){let e=new cf,t=new $d,n=new $d,r=new q,i=new q,a=new q,o=new q,s=new Ue,c=new Ue,l=new q,u=new Y,d=new Y;function f(e,i,a,s){let c=r;!e.isDegenerateIntoPoint&&!e.isDegenerateIntoSegment?c.copy(e.plane.normal):c.copy(i.plane.normal);let l=e.satBounds,u=e.satAxes;for(let r=1;r<4;r++){let a=l[r],s=u[r];if(t.setFromPoints(s,i.points),a.isSeparated(t)||(o.copy(c).cross(s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}let d=i.satBounds,f=i.satAxes;for(let r=1;r<4;r++){let a=d[r],s=f[r];if(t.setFromPoints(s,e.points),a.isSeparated(t)||(o.crossVectors(c,s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}return a&&(s||console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`),a.start.set(0,0,0),a.end.set(0,0,0)),!0}function p(e,t,n,r,i,a,o,s,c,l,u){let d=o/(o-s);l.x=r+(i-r)*d,u.start.subVectors(t,e).multiplyScalar(d).add(e),d=o/(o-c),l.y=r+(a-r)*d,u.end.subVectors(n,e).multiplyScalar(d).add(e)}function m(e,t,n,r,i,a,o,s,c,l,u){if(i>0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else if(a>0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(s*c>0||o!=0)p(e.a,e.b,e.c,t,n,r,o,s,c,l,u);else if(s!=0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(c!=0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else return!0;return!1}function h(e,t,n,i){let a=t.degenerateSegment,o=e.plane.distanceToPoint(a.start),s=e.plane.distanceToPoint(a.end);return sf(o)?sf(s)?f(e,t,n,i):(n&&(n.start.copy(a.start),n.end.copy(a.start)),e.containsPoint(a.start)):sf(s)?(n&&(n.start.copy(a.end),n.end.copy(a.end)),e.containsPoint(a.end)):e.plane.intersectLine(a,r)!=null&&(n&&(n.start.copy(r),n.end.copy(r)),e.containsPoint(r))}function g(e,t,n){let r=t.a;return sf(e.plane.distanceToPoint(r))&&e.containsPoint(r)?(n&&(n.start.copy(r),n.end.copy(r)),!0):!1}function _(e,t,n){let i=e.degenerateSegment,a=t.a;return i.closestPointToPoint(a,!0,r),a.distanceToSquared(r)<of&&(n&&(n.start.copy(a),n.end.copy(a)),!0)}function v(e,t,n,o){if(e.isDegenerateIntoSegment){if(t.isDegenerateIntoSegment){let o=e.degenerateSegment,s=t.degenerateSegment,c=i,l=a;o.delta(c),s.delta(l);let u=r.subVectors(s.start,o.start),d=c.x*l.y-c.y*l.x;if(sf(d))return!1;let f=(u.x*l.y-u.y*l.x)/d,p=-(c.x*u.y-c.y*u.x)/d;return f<0||f>1||p<0||p>1?!1:sf(o.start.z+c.z*f-(s.start.z+l.z*p))?(n&&(n.start.copy(o.start).addScaledVector(c,f),n.end.copy(o.start).addScaledVector(c,f)),!0):!1}return t.isDegenerateIntoPoint?_(e,t,n):h(t,e,n,o)}if(e.isDegenerateIntoPoint)return t.isDegenerateIntoPoint?t.a.distanceToSquared(e.a)<of&&(n&&(n.start.copy(e.a),n.end.copy(e.a)),!0):t.isDegenerateIntoSegment?_(t,e,n):g(t,e,n);if(t.isDegenerateIntoPoint)return g(e,t,n);if(t.isDegenerateIntoSegment)return h(e,t,n,o)}return function(t,n=null,r=!1){this.needsUpdate&&this.update(),t.isExtendedTriangle?t.needsUpdate&&t.update():(e.copy(t),e.update(),t=e);let o=v(this,t,n,r);if(o!==void 0)return o;let p=this.plane,h=t.plane,g=h.distanceToPoint(this.a),_=h.distanceToPoint(this.b),y=h.distanceToPoint(this.c);sf(g)&&(g=0),sf(_)&&(_=0),sf(y)&&(y=0);let b=g*_,x=g*y;if(b>0&&x>0)return!1;let S=p.distanceToPoint(t.a),C=p.distanceToPoint(t.b),w=p.distanceToPoint(t.c);sf(S)&&(S=0),sf(C)&&(C=0),sf(w)&&(w=0);let T=S*C,E=S*w;if(T>0&&E>0)return!1;i.copy(p.normal),a.copy(h.normal);let D=i.cross(a),O=0,k=Math.abs(D.x),A=Math.abs(D.y);A>k&&(k=A,O=1),Math.abs(D.z)>k&&(O=2);let j=rf[O],M=this.a[j],N=this.b[j],P=this.c[j],F=t.a[j],I=t.b[j],L=t.c[j];if(m(this,M,N,P,b,x,g,_,y,u,s)||m(t,F,I,L,T,E,S,C,w,d,c))return f(this,t,n,r);if(u.y<u.x){let e=u.y;u.y=u.x,u.x=e,l.copy(s.start),s.start.copy(s.end),s.end.copy(l)}if(d.y<d.x){let e=d.y;d.y=d.x,d.x=e,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(n&&(d.x>u.x?n.start.copy(c.start):n.start.copy(s.start),d.y<u.y?n.end.copy(c.end):n.end.copy(s.end)),!0)}})(),cf.prototype.distanceToPoint=(function(){let e=new q;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),cf.prototype.distanceToTriangle=(function(){let e=new q,t=new q,n=[`a`,`b`,`c`],r=new Ue,i=new Ue;return function(a,o=null,s=null){let c=o||s?r:null;if(this.intersectsTriangle(a,c,!0))return(o||s)&&(o&&c.getCenter(o),s&&c.getCenter(s)),0;let l=1/0;for(let t=0;t<3;t++){let r,i=n[t],c=a[i];this.closestPointToPoint(c,e),r=c.distanceToSquared(e),r<l&&(l=r,o&&o.copy(e),s&&s.copy(c));let u=this[i];a.closestPointToPoint(u,e),r=u.distanceToSquared(e),r<l&&(l=r,o&&o.copy(u),s&&s.copy(e))}for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];r.set(this[u],this[d]);for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];i.set(a[u],a[d]),tf(r,i,e,t);let f=e.distanceToSquared(t);f<l&&(l=f,o&&o.copy(e),s&&s.copy(t))}}return Math.sqrt(l)}})();var lf=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new q,this.max=new q,this.matrix=new tt,this.invMatrix=new tt,this.points=Array(8).fill().map(()=>new q),this.satAxes=[,,,].fill().map(()=>new q),this.satBounds=[,,,].fill().map(()=>new $d),this.alignedSatBounds=[,,,].fill().map(()=>new $d),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};lf.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let i=0;i<=1;i++)for(let a=0;a<=1;a++)for(let o=0;o<=1;o++){let s=r[1*i|2*a|4*o];s.x=i?n.x:t.x,s.y=a?n.y:t.y,s.z=o?n.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,a=this.satAxes,o=r[0];for(let e=0;e<3;e++){let t=a[e],n=i[e],s=r[1<<e];t.subVectors(o,s),n.setFromPoints(t,r)}let s=this.alignedSatBounds;s[0].setFromPointsField(r,`x`),s[1].setFromPointsField(r,`y`),s[2].setFromPointsField(r,`z`),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})(),lf.prototype.intersectsBox=(function(){let e=new $d;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,i=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(e.min=n.x,e.max=r.x,o[0].isSeparated(e)||(e.min=n.y,e.max=r.y,o[1].isSeparated(e))||(e.min=n.z,e.max=r.z,o[2].isSeparated(e)))return!1;for(let n=0;n<3;n++){let r=a[n],o=i[n];if(e.setFromBox(r,t),o.isSeparated(e))return!1}return!0}})(),lf.prototype.intersectsTriangle=(function(){let e=new cf,t=[,,,],n=new $d,r=new $d,i=new q;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let o=this.satBounds,s=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let e=0;e<3;e++){let r=o[e],i=s[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}let c=a.satBounds,l=a.satAxes,u=this.points;for(let e=0;e<3;e++){let t=c[e],r=l[e];if(n.setFromPoints(r,u),t.isSeparated(n))return!1}for(let e=0;e<3;e++){let a=s[e];for(let e=0;e<4;e++){let o=l[e];if(i.crossVectors(a,o),n.setFromPoints(i,t),r.setFromPoints(i,u),n.isSeparated(r))return!1}}return!0}})(),lf.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})(),lf.prototype.distanceToPoint=(function(){let e=new q;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),lf.prototype.distanceToBox=(function(){let e=[`x`,`y`,`z`],t=Array(12).fill().map(()=>new Ue),n=Array(12).fill().map(()=>new Ue),r=new q,i=new q;return function(a,o=0,s=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(s||c)&&(a.getCenter(i),this.closestPointToPoint(i,r),a.clampPoint(r,i),s&&s.copy(r),c&&c.copy(i)),0;let l=o*o,u=a.min,d=a.max,f=this.points,p=1/0;for(let e=0;e<8;e++){let t=f[e];i.copy(t).clamp(u,d);let n=t.distanceToSquared(i);if(n<p&&(p=n,s&&s.copy(t),c&&c.copy(i),n<l))return Math.sqrt(n)}let m=0;for(let r=0;r<3;r++)for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let o=(r+1)%3,s=(r+2)%3,c=i<<o|a<<s,l=1<<r|i<<o|a<<s,p=f[c],h=f[l];t[m].set(p,h);let g=e[r],_=e[o],v=e[s],y=n[m],b=y.start,x=y.end;b[g]=u[g],b[_]=i?u[_]:d[_],b[v]=a?u[v]:d[v],x[g]=d[g],x[_]=i?u[_]:d[_],x[v]=a?u[v]:d[v],m++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){i.x=e?d.x:u.x,i.y=t?d.y:u.y,i.z=n?d.z:u.z,this.closestPointToPoint(i,r);let a=i.distanceToSquared(r);if(a<p&&(p=a,s&&s.copy(r),c&&c.copy(i),a<l))return Math.sqrt(a)}for(let e=0;e<12;e++){let a=t[e];for(let e=0;e<12;e++){let t=n[e];tf(a,t,r,i);let o=r.distanceToSquared(i);if(o<p&&(p=o,s&&s.copy(r),c&&c.copy(i),o<l))return Math.sqrt(o)}}return Math.sqrt(p)}})();var uf=new class extends bd{constructor(){super(()=>new cf)}},df=new q,ff=new q;function pf(e,t,n={},r=0,i=1/0){let a=r*r,o=i*i,s=1/0,c=null;if(e.shapecast({boundsTraverseOrder:e=>(df.copy(t).clamp(e.min,e.max),df.distanceToSquared(t)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle:(e,n)=>{e.closestPointToPoint(t,df);let r=t.distanceToSquared(df);return r<s&&(ff.copy(df),s=r,c=n),r<a}}),s===1/0)return null;let l=Math.sqrt(s);return n.point?n.point.copy(ff):n.point=ff.clone(),n.distance=l,n.faceIndex=c,n}var mf=!0,hf=new q,gf=new q,_f=new q,vf=new Y,yf=new Y,bf=new Y,xf=new q,Sf=new q,Cf=new q,wf=new q;function Tf(e,t,n,r,i,a,o,s){let c;if(c=a===1?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,a!==2,i),c===null)return null;let l=e.origin.distanceTo(i);return l<o||l>s?null:{distance:l,point:i.clone()}}function Ef(e,t,n,r,i,a,o,s,c,l,u){hf.fromBufferAttribute(t,a),gf.fromBufferAttribute(t,o),_f.fromBufferAttribute(t,s);let d=Tf(e,hf,gf,_f,wf,c,l,u);if(d){if(r){vf.fromBufferAttribute(r,a),yf.fromBufferAttribute(r,o),bf.fromBufferAttribute(r,s),d.uv=new Y;let e=ot.getInterpolation(wf,hf,gf,_f,vf,yf,bf,d.uv);mf||(d.uv=e)}if(i){vf.fromBufferAttribute(i,a),yf.fromBufferAttribute(i,o),bf.fromBufferAttribute(i,s),d.uv1=new Y;let e=ot.getInterpolation(wf,hf,gf,_f,vf,yf,bf,d.uv1);mf||(d.uv1=e)}if(n){xf.fromBufferAttribute(n,a),Sf.fromBufferAttribute(n,o),Cf.fromBufferAttribute(n,s),d.normal=new q;let t=ot.getInterpolation(wf,hf,gf,_f,xf,Sf,Cf,d.normal);d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1),mf||(d.normal=t)}let t={a,b:o,c:s,normal:new q,materialIndex:0};if(ot.getNormal(hf,gf,_f,t.normal),d.face=t,d.faceIndex=a,mf){let e=new q;ot.getBarycoord(wf,hf,gf,_f,e),d.barycoord=e}}return d}function Df(e){return e&&e.isMaterial?e.side:e}function Of(e,t,n,r,i,a,o){let s=r*3,c=s+0,l=s+1,u=s+2,{index:d,groups:f}=e;e.index&&(c=d.getX(c),l=d.getX(l),u=d.getX(u));let{position:p,normal:m,uv:h,uv1:g}=e.attributes;if(Array.isArray(t)){let e=r*3;for(let s=0,d=f.length;s<d;s++){let{start:d,count:_,materialIndex:v}=f[s];if(e>=d&&e<d+_){let e=Df(t[v]),s=Ef(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=v,i)i.push(s);else return s}}}}else{let e=Df(t),s=Ef(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=0,i)i.push(s);else return s}}return null}function kf(e,t,n,r){let i=e.a,a=e.b,o=e.c,s=t,c=t+1,l=t+2;n&&(s=n.getX(s),c=n.getX(c),l=n.getX(l)),i.x=r.getX(s),i.y=r.getY(s),i.z=r.getZ(s),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l)}function Af(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,l=r+i;e<l;e++)Of(c,t,n,e,a,o,s)}function jf(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,c=r+i;e<c;e++){let r;r=Of(s,t,n,e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Mf(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let n=e,s=t+e;n<s;n++){let e;if(e=n,kf(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Nf(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(e,n,a=!1){let l=e*2;if(qu(l,s)){let t=Ju(e,o),n=Yu(l,s),a=1/0,u=1/0,d=1/0,f=-1/0,p=-1/0,m=-1/0;for(let e=3*t,o=3*(t+n);e<o;e++){let t=r[e],n=i.getX(t),o=i.getY(t),s=i.getZ(t);n<a&&(a=n),n>f&&(f=n),o<u&&(u=o),o>p&&(p=o),s<d&&(d=s),s>m&&(m=s)}return c[e+0]!==a||c[e+1]!==u||c[e+2]!==d||c[e+3]!==f||c[e+4]!==p||c[e+5]!==m?(c[e+0]=a,c[e+1]=u,c[e+2]=d,c[e+3]=f,c[e+4]=p,c[e+5]=m,!0):!1}{let r=Xu(e),i=Zu(e,o),s=a,l=!1,u=!1;if(t){if(!s){let e=r/8+n/32,a=i/8+n/32;l=t.has(e),u=t.has(a),s=!l&&!u}}else l=!0,u=!0;let f=s||l,p=s||u,m=!1;f&&(m=d(r,n,s));let h=!1;p&&(h=d(i,n,s));let g=m||h;if(g)for(let t=0;t<3;t++){let n=r+t,a=i+t,o=c[n],s=c[n+3],l=c[a],u=c[a+3];c[e+t]=o<l?o:l,c[e+t+3]=s>u?s:u}return g}}}function Pf(e,t,n,r,i){let a,o,s,c,l,u,d=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,m=n.origin.x,h=n.origin.y,g=n.origin.z,_=t[e],v=t[e+3],y=t[e+1],b=t[e+3+1],x=t[e+2],S=t[e+3+2];return d>=0?(a=(_-m)*d,o=(v-m)*d):(a=(v-m)*d,o=(_-m)*d),f>=0?(s=(y-h)*f,c=(b-h)*f):(s=(b-h)*f,c=(y-h)*f),a>c||s>o||((s>a||isNaN(a))&&(a=s),(c<o||isNaN(o))&&(o=c),p>=0?(l=(x-g)*p,u=(S-g)*p):(l=(S-g)*p,u=(x-g)*p),a>u||l>o)?!1:((l>a||a!==a)&&(a=l),(u<o||o!==o)&&(o=u),a<=i&&o>=r)}function Ff(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,u=r+i;e<u;e++)Of(c,t,n,l?l[e]:e,a,o,s)}function If(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,d=r+i;e<d;e++){let r;r=Of(s,t,n,c?c[e]:e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Lf(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(e=n.resolveTriangleIndex(s),kf(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Rf(e,t,n,r,i,a,o){xd.setBuffer(e._roots[t]),Pf(0,xd.float32Array,r,a,o)&&zf(0,e,n,r,i,a,o),xd.clearBuffer()}function zf(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=xd,u=e*2;if(qu(u,c))Af(t,n,r,Ju(e,l),Yu(u,c),i,a,o);else{let c=Xu(e);Pf(c,s,r,a,o)&&zf(c,t,n,r,i,a,o);let u=Zu(e,l);Pf(u,s,r,a,o)&&zf(u,t,n,r,i,a,o)}}var Bf=[`x`,`y`,`z`];function Vf(e,t,n,r,i,a){xd.setBuffer(e._roots[t]);let o=null;return Pf(0,xd.float32Array,r,i,a)&&(o=Hf(0,e,n,r,i,a)),xd.clearBuffer(),o}function Hf(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=xd,l=e*2;if(qu(l,s))return jf(t,n,r,Ju(e,c),Yu(l,s),i,a);{let s=Qu(e,c),l=Bf[s],u=r.direction[l]>=0,d,f;u?(d=Xu(e),f=Zu(e,c)):(d=Zu(e,c),f=Xu(e));let p=Pf(d,o,r,i,a)?Hf(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Pf(f,o,r,i,a)?Hf(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var Uf=new m,Wf=new cf,Gf=new cf,Kf=new tt,qf=new lf,Jf=new lf;function Yf(e,t,n,r){xd.setBuffer(e._roots[t]);let i=Xf(0,e,n,r);return xd.clearBuffer(),i}function Xf(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=xd,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),qf.set(n.boundingBox.min,n.boundingBox.max,r),i=qf),qu(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Ju(e,s),m=Yu(c,o);if(Kf.copy(r).invert(),n.boundsTree)return Uu($u(e),a,Jf),Jf.matrix.copy(Kf),Jf.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>Jf.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let t=p*3,n=(m+p)*3;t<n;t+=3)if(kf(Gf,t,l,u),Gf.needsUpdate=!0,e.intersectsTriangle(Gf))return!0;return!1}});{let e=Gd(n);for(let t=p*3,n=(m+p)*3;t<n;t+=3){kf(Wf,t,l,u),Wf.a.applyMatrix4(Kf),Wf.b.applyMatrix4(Kf),Wf.c.applyMatrix4(Kf),Wf.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(kf(Gf,t,d,f),Gf.needsUpdate=!0,Wf.intersectsTriangle(Gf))return!0}}}else{let o=Xu(e),c=Zu(e,s);return Uu($u(o),a,Uf),!!(i.intersectsBox(Uf)&&Xf(o,t,n,r,i)||(Uu($u(c),a,Uf),i.intersectsBox(Uf)&&Xf(c,t,n,r,i)))}}var Zf=new tt,Qf=new lf,$f=new lf,ep=new q,tp=new q,np=new q,rp=new q;function ip(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Qf.set(t.boundingBox.min,t.boundingBox.max,n),Qf.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=uf.getPrimitive(),p=uf.getPrimitive(),m=ep,h=tp,g=null,_=null;i&&(g=np,_=rp);let v=1/0,y=null,b=null;return Zf.copy(n).invert(),$f.matrix.copy(Zf),e.shapecast({boundsTraverseOrder:e=>Qf.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&($f.min.copy(e.min),$f.max.copy(e.max),$f.needsUpdate=!0),!0),intersectsRange:(e,r)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>$f.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,i)=>{for(let o=t,s=t+i;o<s;o++){kf(p,3*o,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){kf(f,3*t,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=t,b=o),e<a)return!0}}}});{let i=Gd(t);for(let t=0,o=i;t<o;t++){kf(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=e,i=e+r;n<i;n++){kf(f,3*n,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=n,b=t),e<a)return!0}}}}}),uf.releasePrimitive(f),uf.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(Zf),h.applyMatrix4(Zf),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function ap(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(n,a,l=!1){let u=n*2;if(qu(u,s)){let t=Ju(n,o),a=Yu(u,s),l=1/0,d=1/0,f=1/0,p=-1/0,m=-1/0,h=-1/0;for(let n=t,o=t+a;n<o;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let n=t+e;n=r?r[n]:n;let a=i.getX(n),o=i.getY(n),s=i.getZ(n);a<l&&(l=a),a>p&&(p=a),o<d&&(d=o),o>m&&(m=o),s<f&&(f=s),s>h&&(h=s)}}return c[n+0]!==l||c[n+1]!==d||c[n+2]!==f||c[n+3]!==p||c[n+4]!==m||c[n+5]!==h?(c[n+0]=l,c[n+1]=d,c[n+2]=f,c[n+3]=p,c[n+4]=m,c[n+5]=h,!0):!1}{let e=Xu(n),r=Zu(n,o),i=l,s=!1,u=!1;if(t){if(!i){let n=e/8+a/32,o=r/8+a/32;s=t.has(n),u=t.has(o),i=!s&&!u}}else s=!0,u=!0;let f=i||s,p=i||u,m=!1;f&&(m=d(e,a,i));let h=!1;p&&(h=d(r,a,i));let g=m||h;if(g)for(let t=0;t<3;t++){let i=e+t,a=r+t,o=c[i],s=c[i+3],l=c[a],u=c[a+3];c[n+t]=o<l?o:l,c[n+t+3]=s>u?s:u}return g}}}function op(e,t,n,r,i,a,o){xd.setBuffer(e._roots[t]),Pf(0,xd.float32Array,r,a,o)&&sp(0,e,n,r,i,a,o),xd.clearBuffer()}function sp(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=xd,u=e*2;if(qu(u,c))Ff(t,n,r,Ju(e,l),Yu(u,c),i,a,o);else{let c=Xu(e);Pf(c,s,r,a,o)&&sp(c,t,n,r,i,a,o);let u=Zu(e,l);Pf(u,s,r,a,o)&&sp(u,t,n,r,i,a,o)}}var cp=[`x`,`y`,`z`];function lp(e,t,n,r,i,a){xd.setBuffer(e._roots[t]);let o=null;return Pf(0,xd.float32Array,r,i,a)&&(o=up(0,e,n,r,i,a)),xd.clearBuffer(),o}function up(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=xd,l=e*2;if(qu(l,s))return If(t,n,r,Ju(e,c),Yu(l,s),i,a);{let s=Qu(e,c),l=cp[s],u=r.direction[l]>=0,d,f;u?(d=Xu(e),f=Zu(e,c)):(d=Zu(e,c),f=Xu(e));let p=Pf(d,o,r,i,a)?up(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Pf(f,o,r,i,a)?up(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var dp=new m,fp=new cf,pp=new cf,mp=new tt,hp=new lf,gp=new lf;function _p(e,t,n,r){xd.setBuffer(e._roots[t]);let i=vp(0,e,n,r);return xd.clearBuffer(),i}function vp(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=xd,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),hp.set(n.boundingBox.min,n.boundingBox.max,r),i=hp),qu(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=Ju(e,s),m=Yu(c,o);if(mp.copy(r).invert(),n.boundsTree)return Uu($u(e),a,gp),gp.matrix.copy(mp),gp.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>gp.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let n=p,r=m+p;n<r;n++)if(kf(pp,3*t.resolveTriangleIndex(n),l,u),pp.needsUpdate=!0,e.intersectsTriangle(pp))return!0;return!1}});{let e=Gd(n);for(let n=p,r=m+p;n<r;n++){kf(fp,3*t.resolveTriangleIndex(n),l,u),fp.a.applyMatrix4(mp),fp.b.applyMatrix4(mp),fp.c.applyMatrix4(mp),fp.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(kf(pp,t,d,f),pp.needsUpdate=!0,fp.intersectsTriangle(pp))return!0}}}else{let o=Xu(e),c=Zu(e,s);return Uu($u(o),a,dp),!!(i.intersectsBox(dp)&&vp(o,t,n,r,i)||(Uu($u(c),a,dp),i.intersectsBox(dp)&&vp(c,t,n,r,i)))}}var yp=new tt,bp=new lf,xp=new lf,Sp=new q,Cp=new q,wp=new q,Tp=new q;function Ep(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),bp.set(t.boundingBox.min,t.boundingBox.max,n),bp.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=uf.getPrimitive(),p=uf.getPrimitive(),m=Sp,h=Cp,g=null,_=null;i&&(g=wp,_=Tp);let v=1/0,y=null,b=null;return yp.copy(n).invert(),xp.matrix.copy(yp),e.shapecast({boundsTraverseOrder:e=>bp.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(xp.min.copy(e.min),xp.max.copy(e.max),xp.needsUpdate=!0),!0),intersectsRange:(r,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>xp.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,o)=>{for(let x=t,S=t+o;x<S;x++){let t=s.resolveTriangleIndex(x);kf(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=r,n=r+i;t<n;t++){let n=e.resolveTriangleIndex(t);kf(f,3*n,l,c),f.needsUpdate=!0;let r=f.distanceToTriangle(p,m,g);if(r<v&&(h.copy(m),_&&_.copy(g),v=r,y=t,b=x),r<a)return!0}}}})}{let o=Gd(t);for(let t=0,s=o;t<s;t++){kf(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=r,o=r+i;n<o;n++){let r=e.resolveTriangleIndex(n);kf(f,3*r,l,c),f.needsUpdate=!0;let i=f.distanceToTriangle(p,m,g);if(i<v&&(h.copy(m),_&&_.copy(g),v=i,y=n,b=t),i<a)return!0}}}}}),uf.releasePrimitive(f),uf.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(yp),h.applyMatrix4(yp),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function Dp(e,t,n){return e===null?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e)}var Op=new lf,kp=new R,Ap=new q,jp=new tt,Mp=new q,Np=[`getX`,`getY`,`getZ`],Pp=class e extends Qd{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(e=>e.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=i?i.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=i),o}static deserialize(t,n,r={}){r={setIndex:!0,indirect:!!t.indirectBuffer,...r};let{index:i,roots:a,indirectBuffer:o}=t;t.version||(console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`),c(a));let s=new e(n,{...r,[Vu]:!0});if(s._roots=a,s._indirectBuffer=o||null,r.setIndex){let e=n.getIndex();if(e===null){let e=new z(t.index,1,!1);n.setIndex(e)}else e.array!==i&&(e.array.set(i),e.needsUpdate=!0)}return s;function c(e){for(let t=0;t<e.length;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n);for(let e=0,t=n.byteLength/32;e<t;e++){let t=8*e;qu(2*t,i)||(r[t+6]=r[t+6]/8-e)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=(i?i[e]:e)*3,c=s+0,l=s+1,u=s+2;o&&(c=o[c],l=o[l],u=o[u]);for(let e=0;e<3;e++){let r=a[Np[e]](c),i=a[Np[e]](l),o=a[Np[e]](u),s=r;i<s&&(s=i),o<s&&(s=o);let d=r;i>d&&(d=i),o>d&&(d=o),t[n+e]=s,t[n+e+3]=d}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw Error(`MeshBVH: compute triangle bounds range is invalid.`);let c=a.array,l=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let d=[`getX`,`getY`,`getZ`],f=n.offset;for(let r=e,p=e+t;r<p;r++){let e=(i?i[r]:r)*3,t=(r-f)*6,p=e+0,m=e+1,h=e+2;o&&(p=o[p],m=o[m],h=o[h]),s||(p=p*u+l,m=m*u+l,h=h*u+l);for(let e=0;e<3;e++){let r,i,o;s?(r=a[d[e]](p),i=a[d[e]](m),o=a[d[e]](h)):(r=c[p+e],i=c[m+e],o=c[h+e]);let l=r;i<l&&(l=i),o<l&&(l=o);let u=r;i>u&&(u=i),o>u&&(u=o);let f=(u-l)/2,g=e*2;n[t+g+0]=l+f,n[t+g+1]=f+(Math.abs(l)+f)*Bu}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;jp.copy(e.matrixWorld).invert(),kp.copy(t.ray).applyMatrix4(jp),Mp.setFromMatrixScale(e.matrixWorld),Ap.copy(kp.direction).multiply(Mp);let i=Ap.length(),a=t.near/i,o=t.far/i;if(t.firstHitOnly===!0){let i=this.raycastFirst(kp,r,a,o);i=Dp(i,e,t),i&&n.push(i)}else{let i=this.raycast(kp,r,a,o);for(let r=0,a=i.length;r<a;r++){let a=Dp(i[r],e,t);a&&n.push(a)}}return n}refit(e=null){return(this.indirect?ap:Nf)(this,e)}raycast(e,t=0,n=0,r=1/0){let i=this._roots,a=[],o=this.indirect?op:Rf;for(let s=0,c=i.length;s<c;s++)o(this,s,t,e,a,n,r);return a}raycastFirst(e,t=0,n=0,r=1/0){let i=this._roots,a=null,o=this.indirect?lp:Vf;for(let s=0,c=i.length;s<c;s++){let i=o(this,s,t,e,n,r);i!=null&&(a==null||i.distance<a.distance)&&(a=i)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,i=this.indirect?_p:Yf;for(let a=0,o=r.length;a<o&&(n=i(this,a,e,t),!n);a++);return n}shapecast(e){let t=uf.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Lf:Mf});return uf.releasePrimitive(t),n}bvhcast(t,n,r){let{intersectsRanges:i,intersectsTriangles:a}=r,o=uf.getPrimitive(),s=this.geometry.index,c=this.geometry.attributes.position,l=uf.getPrimitive(),u=t.geometry.index,d=t.geometry.attributes.position;if(a){if(!(t instanceof e))throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);let r=(e,r,i,f,p,m,h,g)=>{for(let _=i,v=i+f;_<v;_++){let i=t.resolveTriangleIndex(_);kf(l,i*3,u,d),l.a.applyMatrix4(n),l.b.applyMatrix4(n),l.c.applyMatrix4(n),l.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){let e=this.resolveTriangleIndex(t);if(kf(o,e*3,s,c),o.needsUpdate=!0,a(o,l,e,i,p,m,h,g))return!0}}return!1};if(i){let e=i;i=function(t,n,i,a,o,s,c,l){return e(t,n,i,a,o,s,c,l)?!0:r(t,n,i,a,o,s,c,l)}}else i=r}return super.bvhcast(t,n,{intersectsRanges:i})}intersectsBox(e,t){return Op.set(e.min,e.max,t),Op.needsUpdate=!0,this.shapecast({intersectsBounds:e=>Op.intersectsBox(e),intersectsTriangle:e=>Op.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,a=1/0){return(this.indirect?Ep:ip)(this,e,t,n,r,i,a)}closestPointToPoint(e,t={},n=0,r=1/0){return pf(this,e,t,n,r)}},Fp={Mesh:a.prototype.raycast,Line:Ge.prototype.raycast,LineSegments:Ae.prototype.raycast,LineLoop:Lt.prototype.raycast,Points:j.prototype.raycast,BatchedMesh:ue.prototype.raycast},Ip=new a,Lp=[];function Rp(e,t){if(this.isBatchedMesh)zp.call(this,e,t);else{let{geometry:n}=this;if(n.boundsTree)n.boundsTree.raycastObject3D(this,e,t);else{let n;if(this instanceof a)n=Fp.Mesh;else if(this instanceof Ae)n=Fp.LineSegments;else if(this instanceof Lt)n=Fp.LineLoop;else if(this instanceof Ge)n=Fp.Line;else if(this instanceof j)n=Fp.Points;else throw Error(`BVH: Fallback raycast function not found.`);n.call(this,e,t)}}}function zp(e,t){if(this.boundsTrees){let n=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,a=this.matrixWorld;Ip.material=this.material,Ip.geometry=this.geometry;let o=Ip.geometry.boundsTree,s=Ip.geometry.drawRange;Ip.geometry.boundingSphere===null&&(Ip.geometry.boundingSphere=new we);for(let o=0,s=r.length;o<s;o++){if(!this.getVisibleAt(o))continue;let s=r[o].geometryIndex;if(Ip.geometry.boundsTree=n[s],this.getMatrixAt(o,Ip.matrixWorld).premultiply(a),!Ip.geometry.boundsTree){this.getBoundingBoxAt(s,Ip.geometry.boundingBox),this.getBoundingSphereAt(s,Ip.geometry.boundingSphere);let e=i[s];Ip.geometry.setDrawRange(e.start,e.count)}Ip.raycast(e,Lp);for(let e=0,n=Lp.length;e<n;e++){let n=Lp[e];n.object=this,n.batchId=o,t.push(n)}Lp.length=0}Ip.geometry.boundsTree=o,Ip.geometry.drawRange=s,Ip.material=null,Ip.geometry=null}else Fp.BatchedMesh.call(this,e,t)}function Bp(e,t){if(!t)return e;if(e.isInstancedMesh)throw TypeError(`Static geometry BVH installation does not replace InstancedMesh raycasting`);let n=e.geometry;return n.boundsTree=Pp.deserialize(t,n,{setIndex:!1}),e.raycast=Rp,n.addEventListener(`dispose`,function e(){this.boundsTree=null,this.removeEventListener(`dispose`,e)}),e}function Vp(e){return e?[...new Set([...e.roots,e.index?.buffer,e.indirectBuffer?.buffer].filter(Boolean))]:[]}var Hp=new d(1,1,1),Up=(e,t,n)=>new q(e,t,n);function Wp(e,t,n,r=0,i=0,o=0){let s=new a(t,typeof n==`string`?qt[n]:n);return s.position.set(r,i,o),s.castShadow=!0,s.receiveShadow=!0,e.add(s),s}function $(e,t,n,r,i,a,o,s,c=0){let l=Wp(e,Hp,s,t,n,r);return l.scale.set(i,a,o),l.rotation.y=c,l}function Gp(e,t,n,r,i,a,o,s,c=8,l=!1){return Wp(e,new he(i,a,o,c,1,l),s,t,n,r)}function Kp(e,t,n,r,i,a,o,s,c=0){let l=Wp(e,new nt(1,c),s,t,n,r);return l.scale.set(i,a,o),l}function qp(e,t,n,r,i,a=r){let o=t.clone().add(n).multiplyScalar(.5),s=$(e,o.x,o.y,o.z,r,t.distanceTo(n),a,i);return s.quaternion.setFromUnitVectors(Up(0,1,0),n.clone().sub(t).normalize()),s}function Jp(e,t=0,n=0,r=0,i=0){let a=new ut;return a.position.set(t,n,r),a.rotation.y=i,e.add(a),a}function Yp(e,t,n,r,i,a=`roof`){let o=[-t/2,0,-n/2,t/2,0,-n/2,0,r,-n/2,-t/2,0,n/2,t/2,0,n/2,0,r,n/2],s=new $e;return s.setAttribute(`position`,new Re(o,3)),s.setIndex([0,2,1,3,4,5,0,3,5,0,5,2,1,2,5,1,5,4,0,1,4,0,4,3]),s.computeVertexNormals(),Wp(e,s,a,0,i,0)}function Xp(e){e.updateMatrixWorld(!0);let t=e.matrixWorld.clone().invert(),n=new Map,r=new Set;e.traverse(e=>{if(!e.isMesh)return;let i=e.material;e.geometry!==Hp&&r.add(e.geometry),n.has(i)||n.set(i,[]);let a=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();if(a.deleteAttribute(`uv`),a.deleteAttribute(`tangent`),!i.vertexColors)a.deleteAttribute(`color`);else if(!a.attributes.color){let e=new Float32Array(a.attributes.position.count*3);e.fill(1),a.setAttribute(`color`,new z(e,3))}a.applyMatrix4(t.clone().multiply(e.matrixWorld)),n.get(i).push(a)}),e.clear();for(let[t,r]of n)Wp(e,uo(r,!1),t),r.forEach(e=>e.dispose());return r.forEach(e=>e.dispose()),e}var Zp=(e,t)=>(Math.trunc(e)%t+t)%t;function Qp(e,t=0){return Zp(t,3)===0?e===`landmark`?[{x:0,y:2.77,z:.745,rotation:0,radius:.38},{x:.745,y:2.77,z:0,rotation:Math.PI/2,radius:.38},{x:0,y:2.77,z:-.745,rotation:Math.PI,radius:.38},{x:-.745,y:2.77,z:0,rotation:-Math.PI/2,radius:.38}]:e===`civic`?[{x:0,y:3.65,z:.175,rotation:0,radius:.3}]:[]:[]}var $p=Object.freeze([{length:.5,width:.075,z:.042,period:720},{length:.72,width:.05,z:.05,period:60}]);function em(e,t){return-Math.PI*2*((t===0?10/12+8/720:8/60)+(e??0)/$p[t].period)}function tm(e,t,{palette:n,animated:r=!1}={}){let{x:i,y:a,z:o,rotation:s=0,radius:c}=t,l=Jp(e,i,a,o,s);l.name=`clock-face`;let u=Gp(l,0,0,0,c,c,.06,n?.dark??`timber`,20);u.rotation.x=Math.PI/2;let d=Gp(l,0,0,.033,c*.88,c*.88,.012,n?.trim??`trim`,20);d.rotation.x=Math.PI/2;for(let e=0;e<12;e++){let t=-e*Math.PI/6,n=e%3==0,r=$(l,-Math.sin(t)*c*.73,Math.cos(t)*c*.73,.041,c*(n?.065:.038),c*(n?.17:.1),.006,`metal`);r.rotation.z=t,r.castShadow=!1}if(!r)for(let[e,t]of $p.entries()){let n=Jp(l);n.rotation.z=em(0,e),$(n,0,c*t.length*.43,t.z,c*t.width,c*t.length,.008,`metal`).castShadow=!1}let f=Gp(l,0,0,.047,c*.055,c*.055,.032,n?.dark??`timber`,8);return f.rotation.x=Math.PI/2,f.castShadow=!1,l}var nm=Object.freeze({legHeight:.26,legWidth:.065,legDepth:.078,stride:.045,stepLength:.2,stepLift:.026});function rm(){let e=[new nt(1,1).scale(.105,.12,.14)];e.push(new d(.13,.15,.13).translate(0,-.035,-.08).toNonIndexed());for(let t of[-1,1])e.push(new d(.085,.035,.055).translate(t*.128,.025,-.02).toNonIndexed());let t=uo(e);return e.forEach(e=>e.dispose()),t}var im=.75,am=.17,om=Object.freeze({house:{width:2.2,depth:2.2,height:2.4},station:{width:6.4,depth:2.4,height:2.4},tree:{radius:.85,height:2.8},landmark:{radius:2,height:4.5},apartment:{radius:2.05,height:5},civic:{radius:2.8,height:5},plaza:{radius:2.6,height:.9},tower:{radius:2.1,height:8},farmPatch:{width:3,depth:4,height:1.6},cactus:{radius:.7,height:2.4},sheep:{width:.46,depth:.8,height:.53},person:{radius:am,height:im},trainCar:{width:1.12,depth:2.4,height:1.6}}),sm=(e,t)=>(Math.trunc(e)%t+t)%t;function cm(e,t,{x:n=0,y:r=0,z:i=0,rotation:a=0,scale:o=1}={}){let s=Jp(e,n,r,i,a);return s.name=t,s.scale.setScalar(o),s.userData.footprint={...om[t]},s.userData.rigidSurfaceAsset=!0,s}function lm(e,t,n,r,i=.36,a=.44,o){let s=$(e,t,n,r+.004,i+.07,a+.07,.024,o?.trim??`trim`),c=$(e,t,n,r+.018,i,a,.012,`window`);s.castShadow=!1,c.castShadow=!1}function um(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,color:o=`plaster`,scale:s=1,palette:c}={}){let l=cm(e,`house`,{x:t,y:n,z:r,rotation:i,scale:s}),u=sm(a,4),d=u===2?1.65:1.42,f=u===1?1.62:1.82,p=u===1?1.9:1.72,m=c?.roof??[`roof`,`roofBlue`,`roofLight`,`roofDark`][u],h=c?u===2?c.body:c.light:o,g=c?.trim??`trim`;$(l,0,.07,0,f+.1,.14,p+.1,`platform`),$(l,0,d/2+.12,0,f,d,p,h),$(l,0,d+.12,0,f+.06,.1,p+.06,g),u===1?Yp(Jp(l,0,0,0,Math.PI/2),p+.24,f+.24,.51,d+.16,m):Yp(l,f+.24,p+.24,.51,d+.16,m);let _=p/2;$(l,0,.53,_+.008,.34,.8,.024,c?.dark??`timber`).castShadow=!1,lm(l,-f*.29,.91,_,.36,.44,c),lm(l,f*.29,.91,_,.36,.44,c);for(let e of[-1,1])lm(Jp(l,e*f/2,0,0,e*Math.PI/2),0,.92,0,.36,.37,c);return(u===0||u===3)&&($(l,-.49,1.97,-.35,.24,.5,.28,c?.dark??`roofDark`),$(l,-.49,2.22,-.35,.29,.08,.33,g)),l}function dm(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,width:a=1.25,timber:o=`timber`}={}){let s=Jp(e,t,n,r,i);s.name=`bench`;for(let e of[-1,1]){let t=e*(a/2-.17);$(s,t,.145,.115,.055,.29,.055,`metal`),$(s,t,.28,-.16,.055,.56,.055,`metal`),$(s,t,.255,-.0225,.055,.055,.33,`metal`)}for(let e of[-.105,0,.105])$(s,0,.295,e,a,.055,.09,o);for(let e of[.405,.515])$(s,0,e,-.13,a,.085,.05,o);return s}function fm(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,scale:a=1,variant:o=0}={}){let s=cm(e,`tree`,{x:t,y:n,z:r,rotation:i,scale:a}),c=sm(o,9),l=c===8?1.64:c===7?1.35:1.15;if(Gp(s,0,l/2,0,.085,.13,l,c===8?`trim`:`bark`,8,!0),c<3)Gp(s,0,1.4,0,0,.8,1.45,c===1?`pineLight`:`pine`,7),Gp(s,0,2.03,0,0,.57,1.38,c===2?`pineDark`:`pineLight`,7);else if(c<6){let e=[`leaf`,`leafGold`,`leafLight`][c-3];Kp(s,0,1.55,0,.84,1.05,.84,e)}else c===6?(qp(s,Up(0,.75,0),Up(.23,1.43,.08),.11,`bark`),Kp(s,0,1.68,0,.84,.82,.8,`leaf`)):c===7?(qp(s,Up(0,.65,0),Up(-.29,1.29,.06),.1,`bark`),qp(s,Up(0,.72,0),Up(.3,1.34,-.04),.09,`bark`),Kp(s,0,1.51,0,.84,.35,.8,`pineLight`)):(qp(s,Up(0,1.12,0),Up(.22,1.67,.08),.07,`trim`),Kp(s,.07,1.85,0,.55,.88,.56,`leafLight`));return s}function pm(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s,animatedClocks:c=!1}={}){let l=cm(e,`landmark`,{x:t,y:n,z:r,rotation:i,scale:o}),u=sm(a,3);if(u===0){$(l,0,.1,0,2.2,.2,2.2,`platform`),$(l,0,1.74,0,1.46,3.28,1.46,`peach`),$(l,0,3.4,0,1.66,.16,1.66,`trim`),$(l,0,.28,0,1.54,.16,1.54,`trim`),$(l,0,2.21,0,1.5,.075,1.5,`trim`);for(let e of Qp(`landmark`,a))tm(l,e,{animated:c});Yp(l,1.84,1.84,.71,3.47,`roofDark`),Gp(l,0,4.25,0,.035,.045,.18,`gold`,5),$(l,0,.62,.75,.45,1.04,.05,`timber`)}else if(u===1){$(l,0,.08,0,2.02,.16,2.82,`platform`),$(l,0,.98,0,1.75,1.8,2.52,`plaster`),Yp(l,1.99,2.76,.62,1.87,`roofBlue`),$(l,0,1.67,.73,1.02,3.18,1.04,`plaster`),$(l,0,3.26,.73,1.14,.13,1.16,`trim`),Gp(l,0,3.79,.73,0,.81,.94,`teal`,4).rotation.y=Math.PI/4,lm(l,0,2.71,1.25,.33,.55),$(l,0,.62,1.285,.45,1.05,.05,`timber`);for(let e of[-1,1])$(l,e*.89,1.24,-.55,.04,.66,.38,`window`)}else{$(l,0,.07,0,2.28,.14,2.28,`platform`);for(let e of[-.54,.54]){for(let t of[-.54,.54])$(l,e,1.18,t,.13,2.08,.13,`timber`);qp(l,Up(e,.39,-.54),Up(e,2.13,.54),.085,`timber`)}Gp(l,0,2.81,0,.96,.96,1.14,`teal`,10),Gp(l,0,2.27,0,1.01,1.01,.12,`trim`,10),Gp(l,0,3.37,0,1.01,1.01,.12,`trim`,10),Gp(l,0,3.66,0,0,1.08,.48,`roofBlue`,10)}if(s){let e=new Map(Object.entries({plaster:`light`,peach:`light`,trim:`trim`,roofDark:`roof`,roofBlue:`roof`,teal:`body`,timber:`dark`,gold:`accent`}).map(([e,t])=>[qt[e],s[t]]));l.traverse(t=>{t.isMesh&&e.has(t.material)&&(t.material=e.get(t.material))})}return l}function mm(e){return e??{body:`peach`,light:`plaster`,dark:`roofDark`,roof:`roofBlue`,accent:`gold`,trim:`trim`}}function hm(e,t,n,r,i,a){for(let o of[0,Math.PI/2,Math.PI,Math.PI*1.5]){let s=Jp(e,0,0,0,o),c=o===Math.PI/2||o===Math.PI*1.5,l=c?n:t,u=c?t:n;for(let e=0;e<i;e++)lm(s,(e-(i-1)/2)*l/(i+.55),r,u/2,.38,.48,a)}}function gm(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s,animatedClocks:c=!1}={}){let l=cm(e,`civic`,{x:t,y:n,z:r,rotation:i,scale:o}),u=mm(s),d=sm(a,3);$(l,0,.09,0,3.9,.18,3.9,`platform`),$(l,0,1.31,-.15,3.35,2.26,2.72,u.light),hm(Jp(l,0,0,-.15),3.35,2.72,1.37,3,u),$(l,0,.78,1.235,.67,1.18,.06,u.dark),$(l,0,.22,1.64,2.86,.12,.47,u.trim);for(let e of[-1.27,-.66,.66,1.27])Gp(l,e,1.24,1.55,.105,.13,1.92,u.trim,8);if($(l,0,2.24,1.48,3.12,.2,.56,u.body),$(l,0,2.43,1.48,3.4,.18,.72,u.roof),Yp(Jp(l,0,0,-.15),3.7,3.02,.62,2.43,u.roof),d===0){$(l,0,3.27,-.43,1.15,1.55,1.18,u.body),$(l,0,4.05,-.43,1.3,.14,1.33,u.trim);for(let e of Qp(`civic`,a))tm(l,e,{palette:u,animated:c});Yp(Jp(l,0,0,-.43),1.5,1.53,.51,4.11,u.roof),Gp(l,0,4.7,-.43,.035,.045,.2,u.accent,6)}else if(d===1)Gp(l,0,3.06,-.14,.7,.84,.7,u.body,8),Gp(l,0,3.47,-.14,0,.89,.55,u.roof,8),Gp(l,0,3.8,-.14,.045,.065,.14,u.accent,6);else for(let e of[-1,1]){let t=Jp(l,e*1.2,0,-.67);$(t,0,3.07,0,.63,.96,.65,u.body),Yp(t,.82,.84,.44,3.52,u.roof)}return l}function _m(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,variant:a=0,scale:o=1,palette:s}={}){let c=cm(e,`plaza`,{x:t,y:n,z:r,rotation:i,scale:o}),l=mm(s),u=sm(a,3);Gp(c,0,.06,0,2.58,2.58,.12,`platform`,16),Gp(c,0,.13,0,2.43,2.43,.06,`grassLight`,16),$(c,0,.173,0,4.62,.024,.72,`sand`),$(c,0,.175,0,.72,.024,4.62,`sand`);for(let e of[-1.43,1.43])for(let t of[-1.43,1.43])Gp(c,e,.2,t,.48,.5,.16,l.trim,8),Kp(c,e,.48,t,.45,.3,.45,u===2?`leafGold`:`leaf`,0);for(let e of[-1,1])dm(c,{x:e*1.52,y:.16,rotation:-e*Math.PI/2,width:1.2,timber:l.dark});return Gp(c,0,.25,0,.78,.86,.18,l.trim,12),u===1?(Gp(c,0,.44,0,.25,.36,.34,l.body,6),Kp(c,0,.72,0,.2,.15,.2,l.accent)):(Gp(c,0,.35,0,.68,.68,.035,`waterLight`,12),Gp(c,0,.52,0,.12,.17,.34,l.body,8),Gp(c,0,.7,0,.35,.13,.1,l.trim,10),Gp(c,0,.76,0,.3,.3,.025,`waterLight`,10)),c}function vm(e,{x:t=0,y:n=0,z:r=0,rotation:i=0,color:a=`red`,variant:o=0}={}){let s=cm(e,`person`,{x:t,y:n,z:r,rotation:i});return $(s,-.055,.16,0,.075,.32,.1,`metal`),$(s,.055,.16,0,.075,.32,.1,`metal`),$(s,0,.42,0,.24,.28,.16,a),Kp(s,0,.65,0,.115,.1,.115,`peach`),sm(o,2)===1&&Gp(s,0,.725,0,.135,.135,.04,`gold`,7),s}function ym(e,{color:t=`red`,cab:n=!1,palette:r}={}){let i=cm(e,`trainCar`),a=r?.body??t,o=r?.roof??`roofBlue`,s=r?.trim??`trim`;$(i,0,.34,0,.91,.19,2.1,`metal`),$(i,0,.88,0,1.02,.94,2.12,a),$(i,0,1.315,0,1.035,.06,2.14,s),$(i,0,1.405,0,1.1,.18,2.2,o),$(i,0,.65,0,1.035,.065,2.14,r?.accent??`gold`);for(let e of[-1,1]){for(let t of[-.54,.49])$(i,e*.514,1.075,t,.016,.39,.69,`window`).castShadow=!1;for(let t of[-.67,.67])Gp(i,e*.48,.22,t,.22,.22,.14,`metal`,8).rotation.z=Math.PI/2}for(let e of[-1.07,1.07])$(i,0,1.075,e,.66,.37,.025,`window`).castShadow=!1;if(n){$(i,0,.77,1.085,.86,.25,.12,a);for(let e of[-.31,.31])$(i,e,.79,1.151,.14,.13,.03,`lamp`)}return i}function bm(e){let t=new Map;for(let n of e.children){if(!n.isMesh)throw TypeError(`Color batching expects consolidated meshes`);let e=n.material,r={roughness:e.roughness??1,metalness:e.metalness??0,side:e.side,flatShading:e.flatShading,transparent:e.transparent,opacity:e.opacity},i=e.userData.sceneStyle??`asset`,a=JSON.stringify({...r,sceneStyle:i});t.has(a)||t.set(a,{properties:r,sceneStyle:i,geometries:[]});let o=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone(),s=o.attributes.position.count,c=new Float32Array(s*3),l=o.attributes.color;for(let t=0;t<s;t++)c[t*3]=e.color.r*(l?l.getX(t):1),c[t*3+1]=e.color.g*(l?l.getY(t):1),c[t*3+2]=e.color.b*(l?l.getZ(t):1);o.setAttribute(`color`,new z(c,3)),t.get(a).geometries.push(o),n.geometry.dispose()}e.clear(),e.userData.ownedMaterials??=[];for(let{properties:n,sceneStyle:r,geometries:i}of t.values()){let t=uo(i,!1);i.forEach(e=>e.dispose());let o=new v({...n,color:16777215,vertexColors:!0,name:`baked-material-colors`});o.userData.sceneStyle=r,Gt(o,{kind:r}),e.userData.ownedMaterials.push(o);let s=new a(t,o);s.castShadow=!0,s.receiveShadow=!0,e.add(s)}return e}var xm=.78,Sm=e=>({pine:Math.floor((e.scale??1)*7)%3,round:3,gold:4,light:5,broadleaf:6,acacia:7,birch:8})[e.variant]??0,Cm=e=>e.id??`tree:${e.x}:${e.y??0}:${e.z}`;function wm(e,t){let n=new Map,r=new m,i=new tt,o=new tt,s=new R,c=new q,l=new q,u=new a(e.geometry,e.material),d=[],f=new Set;e.geometry.computeBoundingBox();for(let a=0;a<t.length;a++){e.getMatrixAt(a,i),r.copy(e.geometry.boundingBox).applyMatrix4(i);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++){let r=`${e}:${t}:${i}`;n.has(r)||n.set(r,[]),n.get(r).push(a)}}e.raycast=(a,p)=>{if(o.copy(e.matrixWorld).invert(),s.copy(a.ray).applyMatrix4(o),s.intersectsSphere(e.boundingSphere)){if(f.clear(),Number.isFinite(a.far)&&a.far<=64){a.ray.at(a.near,c).applyMatrix4(o),a.ray.at(a.far,l).applyMatrix4(o),r.makeEmpty().expandByPoint(c).expandByPoint(l);for(let e=Math.floor(r.min.x/8);e<=Math.floor(r.max.x/8);e++)for(let t=Math.floor(r.min.y/8);t<=Math.floor(r.max.y/8);t++)for(let i=Math.floor(r.min.z/8);i<=Math.floor(r.max.z/8);i++)for(let r of n.get(`${e}:${t}:${i}`)??[])f.add(r)}else for(let e=0;e<t.length;e++)f.add(e);for(let n of f)if(t[n].active){e.getMatrixAt(n,i),u.matrixWorld.multiplyMatrices(e.matrixWorld,i),d.length=0,u.raycast(a,d);for(let t of d)t.instanceId=n,t.object=e,p.push(t)}}}}function Tm(e,{onChange:t=()=>{}}={}){let n=new Map,r=new Map,i=new Map,a=new Set,o=new Set,s=new tt,c=new tt,l=new q,u=new q,d=0,f=!1;function h(e){if(!n.has(e)){let t=new ut;fm(t,{variant:e}),bm(Xp(t));let r=t.children[0];r.geometry.computeBoundingBox(),r.geometry.computeBoundingSphere(),n.set(e,{geometry:r.geometry,material:r.material}),t.clear()}return n.get(e)}function g(){d++,t()}function _(t,n,o,{reveal:c={value:1}}={}){if(f)throw Error(`Cannot add trees to a disposed renderer`);v(t);let u=new ut;u.name=`mutable-trees-${t}`,n.add(u);let d=new Map,p=[],g=[],_=[],y=new m,b=co(c),x=0,S=0;for(let e of o){let t=Cm(e);if(a.has(t)||i.has(t))continue;let n=Sm(e);d.has(n)||d.set(n,[]),d.get(n).push({id:t,placement:e,active:!0,elapsed:0})}for(let[n,r]of d){let a=h(n),o=so(a.material.clone(),c);Gt(o,{kind:a.material.userData.sceneStyle??`asset`}),g.push(o);let d=new Fe(a.geometry,o,r.length);d.name=`trees-${n}`,d.instanceMatrix.setUsage(xe),d.castShadow=d.receiveShadow=!0,d.customDepthMaterial=b,d.userData.mutableTreeBatch=!0,u.add(d),p.push(d);let f=0;for(let n=0;n<r.length;n++){let a=r[n],o=a.placement,c=o.scale??1;a.mesh=d,a.index=n,a.chunk=t,a.base=Ke(e,o.x,o.y??0,o.z,o.rotation??0),s.copy(a.base).scale(l.setScalar(c)),d.setMatrixAt(n,s),i.set(a.id,a),_.push(a),f=Math.max(f,c*3.2)}d.computeBoundingBox(),d.boundingBox.expandByScalar(f),d.boundingSphere=d.boundingBox.getBoundingSphere(new we),y.union(d.boundingBox),wm(d,r),x+=d.instanceMatrix.array.byteLength,S+=(a.geometry.index?.count??a.geometry.attributes.position.count)/3*r.length}let C={key:t,root:u,meshes:p,materials:g,depth:b,entries:_,bounds:y,bytes:x,triangles:S};return r.set(t,C),C}function v(e){let t=r.get(e);if(t){for(let e of t.entries)i.delete(e.id),o.delete(e);for(let e of t.meshes)e.dispose();t.materials.forEach(e=>e.dispose()),t.depth.dispose(),t.root.removeFromParent(),r.delete(e)}}function y(e){e.active=!1,a.add(e.id),g()}function b(e,{direction:t={x:1,z:0}}={}){let n=i.get(e);if(f||!n?.active)return!1;y(n),n.elapsed=0;let r=Math.hypot(t.x??0,t.z??0)||1,a=(t.x??0)/r,s=(t.z??0)/r,c=n.placement.rotation??0;return n.axis=new q(s*Math.cos(c)+a*Math.sin(c),0,-a*Math.cos(c)+s*Math.sin(c)).normalize(),n.axis.lengthSq()<.01&&n.axis.set(0,0,-1),o.add(n),!0}function x(e){if(f||a.has(e))return!1;let t=i.get(e);return a.add(e),t&&(t.active=!1,o.delete(t),t.mesh.setMatrixAt(t.index,s.copy(t.base).scale(l.setScalar(0))),t.mesh.instanceMatrix.addUpdateRange(t.index*16,16),t.mesh.instanceMatrix.needsUpdate=!0),g(),!0}function S(e){if(f||!o.size)return;let t=new Set;for(let n of o){n.elapsed=Math.min(xm,n.elapsed+Math.max(0,e));let r=Math.min(1,n.elapsed/.6),i=p.smoothstep(n.elapsed,.58,xm);c.makeRotationAxis(u.copy(n.axis),Math.PI*.49*r*r),s.multiplyMatrices(n.base,c).scale(l.setScalar((n.placement.scale??1)*(1-i))),n.mesh.setMatrixAt(n.index,s),n.mesh.instanceMatrix.addUpdateRange(n.index*16,16),t.add(n.mesh),n.elapsed>=.78&&o.delete(n)}for(let e of t)e.instanceMatrix.needsUpdate=!0}function C(){if(!f){f=!0;for(let e of[...r.keys()])v(e);for(let e of n.values())e.geometry.dispose(),e.material.dispose();n.clear(),a.clear(),i.clear(),o.clear()}}return{addChunk:_,removeChunk:v,fellTree:b,removeTree:x,update:S,dispose:C,removed:a,get revision(){return d},get activeFalls(){return o.size},get templateCount(){return n.size},get meshes(){return[...r.values()].flatMap(e=>e.meshes)}}}var Em=e=>Math.max(0,Math.min(1,e)),Dm=(e,t,n)=>{let r=Em((n-e)/(t-e));return r*r*(3-2*r)},Om={};function km(e,t,n,r,{surface:i=!0,target:a}={}){let o=a??X.rock.clone(),s=r.x*-.55+r.y*.77+r.z*.32,c=r.y<-.15?X.rockDark:Math.abs(r.y)<.15?X.rockLight:s<.05?X.rockDark:s>.68?X.rockLight:X.rock;if(!i||r.y<.18)return o.copy(c);let l=Math.max(0,n.y)/t.height;Ql(e.terrainSource??e,n.x,n.z,{target:o}),Vt(e.terrainSource??e,n.x,n.z,Om);let u=Dm(0,.1,o.g-o.r),d=Dm(.28,.68,Om.patch),f=Dm(.06,.3,l)*(1-Dm(.56,.79,l));o.lerp(X.meadow,(.22+.12*Om.moisture)*f*u),o.lerp(X.forestFloor,.32*d*u*Dm(.025,.16,l)*(1-Dm(.31,.56,l)));let p=Dm(.9,.48,r.y),m=Dm(.53,.84,l),h=Math.max(p,m)*Dm(.015,.12,l);return o.lerp(c,h)}new tt,new q;var Am=new v({name:`ocean-vertex`,color:16777215,vertexColors:!0,roughness:.52,metalness:0,flatShading:!1});Am.userData.sceneStyle=`water`;var jm=new v({name:`coastal-surf`,color:16777215,vertexColors:!0,roughness:.64,metalness:0,flatShading:!1});jm.userData.sceneStyle=`surf`;var Mm=new q;function Nm(e,t,n){let r=_l(t,n);return wt(e)&&(Dt(e,r.x,r.y,r.z,r.tangent.x,r.tangent.y,r.tangent.z,Mm).normalize(),r.tangent={x:Mm.x,y:Mm.y,z:Mm.z}),r}var Pm=(e,t)=>Math.hypot(e.y*t.z-e.z*t.y,e.z*t.x-e.x*t.z,e.x*t.y-e.y*t.x),Fm=2.64,Im=1.2,Lm=.14,Rm=1.35,zm=2.4,Bm=.05;function Vm(e,t){let n=new Map(e.zones);for(let[e,r]of t.zones){let t=n.get(e);n.set(e,t?{min:Math.min(t.min,r.min),max:Math.max(t.max,r.max)}:{...r})}return{id:e.id,junctionIds:[...e.junctionIds,...t.junctionIds],zones:n,owner:null}}function Hm(e,t){let n=new Map;for(let r of e.lines){let i=t.get(r.id);if(i)for(let[t,a,o]of[[r.from,0,1],[r.to,r.length,-1]]){if(t===void 0)continue;let s=Nm(e,r,a),c={lineId:r.id,distance:a,sign:o,train:i,x:s.tangent.x*o,y:s.tangent.y*o,z:s.tangent.z*o,closest:o===1?i.start:r.length-i.end};n.has(t)||n.set(t,[]),n.get(t).push(c)}}let r=[];for(let[e,t]of n)for(let n=0;n<t.length;n++)for(let i=n+1;i<t.length;i++){let a=t[n],o=t[i];if(a.x*o.x+a.y*o.y+a.z*o.z<=0)continue;let s=Pm(a,o),c=Rm/Math.max(s,.01);a.closest-a.train.halfLength-Lm>=c||o.closest-o.train.halfLength-Lm>=c||r.push({id:`approach-${e}-${n}-${i}`,lines:[{lineId:a.lineId,distance:a.distance},{lineId:o.lineId,distance:o.distance}]})}return r}function Um(e,t){let n=new Map(e.lines.map(e=>[e.id,e])),r=new Map(t.map(e=>[e.lineId,e])),i=[...e.junctions||[],...Hm(e,r)].map(t=>{let i=Rm;for(let r=0;r<t.lines.length;r++){let a=t.lines[r],o=n.get(a.lineId);if(!o)continue;let s=Nm(e,o,a.distance).tangent;for(let a of t.lines.slice(r+1)){let t=n.get(a.lineId);if(!t)continue;let r=Nm(e,t,a.distance).tangent,o=Pm(s,r);i=Math.max(i,Rm/Math.max(o,.01))}}return{id:t.id,junctionIds:[t.id],owner:null,zones:new Map(t.lines.filter(e=>r.has(e.lineId)).map(e=>[e.lineId,{min:e.distance-i,max:e.distance+i}]))}}).filter(e=>e.zones.size>1),a=!0;for(;a;){a=!1;outer:for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++)for(let[n,o]of i[e].zones){let s=i[t].zones.get(n);if(s&&!(Math.max(s.min-o.max,o.min-s.max,0)>r.get(n).halfLength*2+Lm*3)){i[e]=Vm(i[e],i[t]),i.splice(t,1),a=!0;break outer}}}return i}function Wm(e,t,n=e.distance){return n+e.halfLength+Lm>=t.min&&n-e.halfLength-Lm<=t.max}function Gm(e){let t=e.lines.filter(e=>e.length>12).map((e,t)=>{let n=e.length<23?2:3,r=Fm*(n-1)/2+3.25,i=Math.max(r,e.stops?.[0]?.distance??r),a=Math.min(e.length-r,e.stops?.[1]?.distance??e.length-r);return{id:`train-${e.id}`,lineId:e.id,count:n,spacing:Fm,halfLength:Fm*(n-1)/2+Im,start:i,end:a,distance:i,direction:1,speed:2.6+t%3*.16,dwell:t*.45,active:!1,waiting:!1}}).filter(e=>e.end>e.start),n=t.length,r=e.traffic?.trainCount;if(r!==void 0){if(!Number.isInteger(r)||r<0||r>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);t.length=Math.min(t.length,r)}let i=Um(e,t),a=new Map(t.map(e=>[e.id,e])),o=new Map(t.map(e=>[e.lineId,i.filter(t=>t.zones.has(e.lineId)).sort((t,n)=>t.zones.get(e.lineId).min-n.zones.get(e.lineId).min)]));function s(e){let t=o.get(e.lineId);for(let n of t)if(Wm(e,n.zones.get(e.lineId))&&n.owner&&n.owner!==e.id)return e.waiting=!0,!1;for(let n of t)Wm(e,n.zones.get(e.lineId))&&(n.owner=e.id);return e.active=!0,e.waiting=!1,!0}t.forEach(s);function c(e){for(let e of i){if(!e.owner)continue;let t=a.get(e.owner);Wm(t,e.zones.get(t.lineId))||(e.owner=null)}for(let n of t){if(!n.active&&!s(n))continue;n.waiting=!1;let t=Math.max(0,e-n.dwell);if(n.dwell=Math.max(0,n.dwell-e),!t)continue;let r=n.direction,i=r>0?Math.min(n.end,n.distance+t*n.speed):Math.max(n.start,n.distance-t*n.speed),a=o.get(n.lineId),c=r>0?0:a.length-1;for(let e=c;e>=0&&e<a.length;e+=r){let t=a[e],o=t.zones.get(n.lineId);if(Math.max(n.distance,i)+n.halfLength+Lm<o.min||Math.min(n.distance,i)-n.halfLength-Lm>o.max)continue;if(!t.owner||t.owner===n.id){t.owner=n.id;continue}let s=r>0?o.min-n.halfLength-Lm:o.max+n.halfLength+Lm;i=r>0?Math.max(n.distance,Math.min(i,s)):Math.min(n.distance,Math.max(i,s)),n.waiting=!0;break}n.distance=i;let l=r>0?n.end:n.start;Math.abs(n.distance-l)<1e-8&&(n.distance=l,n.direction=-r,n.dwell=zm,n.waiting=!1)}}return{trains:t,capacity:n,get reservations(){return i.map(e=>({id:e.id,junctionIds:[...e.junctionIds],trainId:e.owner}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(e===0)return;let t=Math.ceil(e/Bm);for(let n=0;n<t;n++)c(e/t)}}}var Km=2.64,qm=3.84,Jm=1.2,Ym=.56,Xm=.05,Zm=(e,t)=>(e%t+t)%t,Qm=(e,t)=>`${e}:${t}`;function $m(e,t,n,r){let i=e.trainOwners?.[t]??r?.ownerId??e.cities.find(e=>e.id===n)?.ownerId??e.players?.[0]?.id??null;if(i!==null&&e.players&&!e.players.some(e=>e.id===i))throw TypeError(`Invalid world: train ${t} references an unknown player`);return i}var eh=()=>({x:0,y:0,z:0,distance:0,tangent:{x:0,y:0,z:1},angle:0,heading:0,curvature:0,lineId:null});function th(e,t,n){if(e.alignment)return Cs(e.alignment,t,n);let r=Math.max(0,Math.min(e.length,t)),i=e.points,a=e.distances,o=0,s=i.length-1;for(;o+1<s;){let e=o+s>>1;a[e]<=r?o=e:s=e}let c=i[o],l=i[s],u=a[s]-a[o],d=u>1e-9?(r-a[o])/u:0,f=l.x-c.x,p=l.y-c.y,m=l.z-c.z,h=Math.hypot(f,p,m)||1;return n.x=c.x+f*d,n.y=c.y+p*d,n.z=c.z+m*d,n.distance=r,n.tangent.x=f/h,n.tangent.y=p/h,n.tangent.z=m/h,n.curvature=void 0,n.heading=Math.atan2(m,f),n.angle=Math.atan2(f,m),n}function nh(e,t,n=eh()){n.tangent??={x:0,y:0,z:0};let r=e.closed?Zm(t,e.length):Math.max(0,Math.min(e.length,t)),i=e.segments,a=0,o=i.length-1;for(;a<o;){let e=a+o>>1;r>=i[e].start+i[e].length-1e-9?a=e+1:o=e}let s=i[a],c=Math.max(0,Math.min(s.length,r-s.start));if(th(s.line,Ic(s.metric,s.direction>0?c:s.length-c),n),n.distance=r,n.tangent.x*=s.direction,n.tangent.y*=s.direction,n.tangent.z*=s.direction,n.heading=Math.atan2(n.tangent.z,n.tangent.x),n.angle=Math.atan2(n.tangent.x,n.tangent.z),Number.isFinite(n.curvature)&&(n.curvature*=s.direction),n.lineId=s.lineId,e.surfaceWorld){let t=n.physical??={};Ve(e.surfaceWorld,n.x,n.y,n.z,rh),Dt(e.surfaceWorld,n.x,n.y,n.z,n.tangent.x,0,n.tangent.z,ih).normalize(),rt(e.surfaceWorld,n.x,n.z,ah),oh.crossVectors(ah,ih).normalize(),t.x=rh.x,t.y=rh.y,t.z=rh.z,t.tx=ih.x,t.ty=ih.y,t.tz=ih.z,t.rx=oh.x,t.ry=oh.y,t.rz=oh.z}return n}var rh=new q,ih=new q,ah=new q,oh=new q;function sh(e,t,n=!0,r){let i=0,a=e.map(e=>{let t=r?Mc(r,e.line):null,n={line:e.line,lineId:e.line.id,direction:e.direction,metric:t,start:i,length:t?.length??e.line.length};return i+=n.length,n});return{id:`circuit-${t+1}`,segments:a,length:i,closed:n,...wt(r)?{surfaceWorld:{surface:r.surface}}:{}}}function ch(e){let t=new Map(e.lines.map(e=>[e.id,e]));if(e.traffic?.circuits){if(!Array.isArray(e.traffic.circuits))throw TypeError(`Traffic circuits must be an array`);let n=new Set;return e.traffic.circuits.map((r,i)=>{if(!Array.isArray(r.segments)||r.segments.length<2)throw TypeError(`A traffic circuit needs at least two segments`);let a=r.segments.map(e=>{let n=t.get(e.lineId),r=e.direction??1;if(!n||r!==1&&r!==-1)throw TypeError(`Traffic circuit references an invalid line or direction`);return{line:n,direction:r}}),o=sh(a,i,!0,e);if(o.id=String(r.id??o.id),n.has(o.id))throw TypeError(`Traffic circuit IDs must be unique`);n.add(o.id);for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=_l(t.line,t.direction>0?t.line.length:0),i=_l(n.line,n.direction>0?0:n.line.length),o=(r.tangent.x*i.tangent.x+r.tangent.z*i.tangent.z)*t.direction*n.direction;if(Math.hypot(r.x-i.x,r.z-i.z)>1e-4||o<.9999)throw TypeError(`Traffic circuit segments must meet with continuous tangents`)}return o})}let n=new Map(e.lines.map(e=>{let t=0;for(let n=1;n<e.points.length;n++){let r=e.points[n-1],i=e.points[n];t+=r.x*i.z-i.x*r.z}return[e.id,t]})),r=new Map(e.lines.flatMap(e=>[1,-1].map(t=>[Qm(e.id,t),{line:e,direction:t,key:Qm(e.id,t),next:[]}])));for(let t of e.transitions??[]){let e=r.get(Qm(t.fromLineId,t.fromEnd===`end`?1:-1)),n=r.get(Qm(t.toLineId,t.toEnd===`start`?1:-1));if(!e||!n||e.line===n.line)continue;let i=_l(e.line,e.direction>0?e.line.length:0),a=_l(n.line,n.direction>0?0:n.line.length),o=(i.tangent.x*a.tangent.x+i.tangent.z*a.tangent.z)*e.direction*n.direction;Math.hypot(i.x-a.x,i.z-a.z)>1e-4||o<.9999||e.next.push(n)}let i=[],a=new Set(t.keys());for(;a.size;){let e=a.values().next().value,t=new Set([e]),n=[e];for(a.delete(e);n.length;){let e=n.shift();for(let i of[1,-1])for(let o of r.get(Qm(e,i)).next)t.has(o.line.id)||(t.add(o.line.id),a.delete(o.line.id),n.push(o.line.id))}i.push(t)}let o=[];for(let t of i){let i=null,a=-1/0,s=0,c=[...r.values()].filter(e=>t.has(e.line.id)),l=new Map([...t].map((e,t)=>[e,t]));for(let t of c){let r=(c,u,d)=>{if(!(++s>3e4))for(let s of c.next)if(s.key===t.key&&u.length>=2){let t=new Set,r=0,s=0;for(let e of u)t.add(e.line.from),t.add(e.line.to),r+=n.get(e.line.id)*e.direction,s+=e.line.length;let c=t.size*1e7+Math.abs(r)*100+s,l=c>a?sh(u,o.length,!0,e):null;c>a&&(i=l,a=c)}else!d.has(s.line.id)&&l.get(s.line.id)>=l.get(t.line.id)&&(d.add(s.line.id),u.push(s),r(s,u,d),u.pop(),d.delete(s.line.id))};r(t,[t],new Set([t.line.id]))}i&&o.push(i)}return o}function lh(e){let t=[],n=new Map,r=new Map,i=2.8;for(let r of e){let e=Math.ceil(r.length/1.2),i=[],a=eh();for(let n=0;n<e;n++){let o=n/e*r.length;nh(r,o,a);let s=a.physical??a,c={index:t.length,path:r,distance:o,x:s.x,y:a.physical?s.y:0,z:s.z,spacing:r.length/e};t.push(c),i.push(c)}n.set(r.id,i)}let a=new Int32Array(t.length);for(let e=0;e<a.length;e++)a[e]=e;let o=new Uint8Array(t.length),s=e=>{for(;a[e]!==e;)a[e]=a[a[e]],e=a[e];return e},c=(e,t)=>{a[s(e)]=s(t),o[e]=1,o[t]=1};for(let e of t){let t=Math.floor(e.x/i),n=Math.floor(e.y/i),a=Math.floor(e.z/i),o=!!e.path.surfaceWorld;for(let s=-1;s<=1;s++)for(let l=o?-1:0;l<=+!!o;l++)for(let o=-1;o<=1;o++){let u=r.get(`${t+s},${n+l},${a+o}`);if(u)for(let t of u){let n=Math.abs(e.distance-t.distance);e.path===t.path&&Math.min(n,e.path.length-n)<11.68||(e.x-t.x)**2+(e.y-t.y)**2+(e.z-t.z)**2<i*i&&c(e.index,t.index)}}let s=`${t},${n},${a}`;r.has(s)||r.set(s,[]),r.get(s).push(e)}for(let e of n.values()){let t=null,n=null;for(let r of e)o[r.index]&&(n&&r.distance-n.distance<10.68&&c(n.index,r.index),t??=r,n=r);t&&n&&Zm(t.distance-n.distance,t.path.length)<10.68&&c(n.index,t.index)}let l=new Map;for(let e of t)if(o[e.index]){let t=s(e.index);l.has(t)||l.set(t,new Map);let n=l.get(t);n.has(e.path.id)||n.set(e.path.id,[]),n.get(e.path.id).push(e)}return[...l.values()].map((e,t)=>{let n=[];for(let[t,r]of e)for(let e of r){let r=n.at(-1),i=Math.max(0,e.distance-e.spacing),a=Math.min(e.path.length,e.distance+e.spacing);r?.pathId===t&&i<=r.end+1e-6?r.end=a:n.push({pathId:t,start:i,end:a})}return{id:`network-block-${t+1}`,owner:null,zones:n,queryStamp:0,waiters:new Set}})}function uh(e,t,n=e.distance){for(let r of t.zones)if(r.pathId===e.path.id)for(let t=-1;t<=1;t++){let i=n+t*e.path.length;if(i+e.halfLength+.2>=r.start&&i-e.halfLength-.2<=r.end)return!0}return!1}function dh(e,t){t.x=e.x,t.y=e.y,t.z=e.z,t.distance=e.distance,t.tangent.x=e.tangent.x,t.tangent.y=e.tangent.y,t.tangent.z=e.tangent.z,t.angle=e.angle,t.heading=e.heading,t.curvature=e.curvature,t.lineId=e.lineId,e.physical&&Object.assign(t.physical??={},e.physical)}function fh(e,t){let n=0,r=new Map((t.players??[]).map((e,t)=>[e.id,t]));for(let t of e)t.poseOffset=n,n+=t.count,t.pose=eh(),t.carPoses=Array.from({length:t.count},eh),t._nextCarPoses=Array.from({length:t.count},eh),t._cachedDistance=NaN,t._ownerIndex=r.get(t.ownerId)??0;return new Float32Array(n*6)}function ph(e,t,n){for(let r=0;r<e.count;r++)nh(e.path,t+(r-(e.count-1)/2)*e.spacing,n[r])}function mh(e,t){for(let n=0;n<e.count;n++){let r=e.carPoses[n],i=(e.poseOffset+n)*6;t[i]=r.x,t[i+1]=r.y,t[i+2]=r.z,t[i+3]=r.angle,t[i+4]=+!!e.active,t[i+5]=e._ownerIndex}}function hh(e,t){ph(e,e.distance,e.carPoses),nh(e.path,e.distance,e.pose),e._cachedDistance=e.distance,mh(e,t)}function gh(e,t,n,r,i,a){let o=e.tangent,s=t.tangent,c=Jm*(Math.abs(n*o.x+r*o.z)+Math.abs(n*s.x+r*s.z))+Ym*(Math.abs(-n*o.z+r*o.x)+Math.abs(-n*s.z+r*s.x))+.06;return Math.abs(i*n+a*r)>=c}function _h(e,t){if(e.physical&&t.physical){let n=e.physical,r=t.physical,i=r.x-n.x,a=r.y-n.y,o=r.z-n.z;if(i*i+a*a+o*o>2.7*2.7)return!1;let s=(e,t,s)=>Math.abs(i*e+a*t+o*s)>=Jm*(Math.abs(e*n.tx+t*n.ty+s*n.tz)+Math.abs(e*r.tx+t*r.ty+s*r.tz))+Ym*(Math.abs(e*n.rx+t*n.ry+s*n.rz)+Math.abs(e*r.rx+t*r.ry+s*r.rz))+.06;return!s(n.tx,n.ty,n.tz)&&!s(n.rx,n.ry,n.rz)&&!s(r.tx,r.ty,r.tz)&&!s(r.rx,r.ry,r.rz)}let n=t.x-e.x,r=t.z-e.z;if(n*n+r*r>2.7*2.7)return!1;let i=e.tangent,a=t.tangent;return!gh(e,t,i.x,i.z,n,r)&&!gh(e,t,-i.z,i.x,n,r)&&!gh(e,t,a.x,a.z,n,r)&&!gh(e,t,-a.z,a.x,n,r)}function vh(e,t){if(e.some(e=>e.surfaceWorld))return yh(t);let n=1/0,r=1/0,i=-1/0;for(let t of e)for(let e of t.segments)for(let t of e.line.points)n=Math.min(n,t.x),r=Math.min(r,t.z),i=Math.max(i,t.x);let a=Math.floor(n/4)-3,o=Math.floor(r/4)-3,s=Math.ceil((i-n)/4)+8,c=new Map,l=(e,t)=>(Math.floor(t/4)-o)*s+Math.floor(e/4)-a;for(let e of t)e._cars=e.carPoses.map(t=>({train:e,pose:t,cell:null,index:0}));return{update:e=>{for(let t of e._cars){let e=l(t.pose.x,t.pose.z);if(t.cell===e)continue;if(t.cell!==null){let e=c.get(t.cell),n=e.pop();n!==t&&(e[t.index]=n,n.index=t.index)}let n=c.get(e);n||(n=[],c.set(e,n)),t.cell=e,t.index=n.length,n.push(t)}},collides:(e,t)=>{for(let n of t){let t=l(n.x,n.z);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let a=c.get(t+r*s+i);if(a){for(let t of a)if(t.train!==e&&_h(n,t.pose))return!0}}}return!1}}}function yh(e){let t=new Map,n=e=>`${Math.floor(e.x/4)},${Math.floor(e.y/4)},${Math.floor(e.z/4)}`;for(let t of e)t._cars=t.carPoses.map(e=>({train:t,pose:e,cell:null,index:0}));return{update:e=>{for(let r of e._cars){let e=n(r.pose.physical);if(r.cell===e)continue;if(r.cell!==null){let e=t.get(r.cell),n=e.pop();n!==r&&(e[r.index]=n,n.index=r.index)}let i=t.get(e);i||(i=[],t.set(e,i)),r.cell=e,r.index=i.length,i.push(r)}},collides:(e,n)=>{for(let r of n){let n=r.physical,i=Math.floor(n.x/4),a=Math.floor(n.y/4),o=Math.floor(n.z/4);for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){let l=t.get(`${i+n},${a+s},${o+c}`);if(l){for(let t of l)if(t.train!==e&&_h(r,t.pose))return!0}}}return!1}}}function bh(e){if(!wt(e))return e;let t=new Map(e.lines.map(t=>[t.id,Mc(e,t)]));return{...e,lines:e.lines.map(e=>{let n=t.get(e.id);return{...e,alignment:null,length:n.length,distances:e.distances.map(e=>Fc(n,e)),stops:e.stops?.map(e=>({...e,distance:Fc(n,e.distance)}))}}),junctions:e.junctions?.map(e=>({...e,lines:e.lines.map(e=>({...e,distance:Fc(t.get(e.lineId),e.distance)}))}))}}function xh(e,t,n,r,i){let a=0,o=e.length;for(;a<o;){let t=a+o>>1;e[t].start<=n?a=t+1:o=t}for(let n=a-1;n>=0&&e[n].maximumEnd>=t;n--){let a=e[n];a.end<t||a.block.queryStamp===r||(a.block.queryStamp=r,i.push(a.block))}}function Sh(e,t){let n=new Map(e.map(e=>[e.id,[]]));for(let e of t)for(let t of e.zones)n.get(t.pathId).push({...t,block:e});for(let e of n.values()){e.sort((e,t)=>e.start-t.start);let t=-1/0;for(let n of e)t=Math.max(t,n.end),n.maximumEnd=t}let r=0;return(e,t,i)=>{i.length=0;let a=n.get(e.path.id);if(!a.length)return i;let o=++r,s=e.halfLength+.2,c=e.path.length;return xh(a,t-s,t+s,o,i),t<s&&xh(a,t-s+c,c,o,i),t+s>c&&xh(a,0,t+s-c,o,i),i}}function Ch(e,t){let n=t.map(e=>Math.max(0,Math.floor(e.length/12))),r=n.reduce((e,t)=>e+t,0),i=t.map((e,t)=>Math.min(n[t],Math.max(1,Math.min(new Set(e.segments.flatMap(e=>[e.line.from,e.line.to])).size,Math.floor(e.length/18))))),a=e.traffic?.trainCount;if(a===void 0)return{counts:i,requested:i.reduce((e,t)=>e+t,0),capacity:r};if(!Number.isInteger(a)||a<0||a>1e5)throw TypeError(`Traffic trainCount must be an integer from 0 through 100000`);if(!r)return{counts:n,requested:a,capacity:r};let o=Math.min(a,r),s=n.map(e=>Math.floor(o*e/r)),c=o-s.reduce((e,t)=>e+t,0),l=n.map((e,t)=>({index:t,fraction:o*e/r-s[t]})).sort((e,t)=>t.fraction-e.fraction||e.index-t.index);for(let{index:e}of l)c>0&&s[e]<n[e]&&(s[e]++,c--);return{counts:s,requested:a,capacity:r}}function wh(e){let t=ch(e);if(!t.length){let t=Gm(bh(e)),n=new Map(e.lines.map(e=>[e.id,e]));for(let r of t.trains){let t=n.get(r.lineId);r.color=t.color,r.path=sh([{line:t,direction:1}],0,!1,e),r.homeCityId=t.from,r.ownerId=$m(e,r.id,t.from,t)}let r=fh(t.trains,e);for(let e of t.trains)hh(e,r);return{trains:t.trains,mode:`shuttles`,paths:[],poseBuffer:r,poseStride:6,stats:{requestedTrainCount:e.traffic?.trainCount??t.trains.length,trainCount:t.trains.length,capacity:t.capacity},get reservations(){return t.reservations},sampleTrain:(e,t=0,n)=>nh(e.path,e.distance+t,n),update(e){t.update(e);for(let e of t.trains)hh(e,r)}}}let n=[],r=Ch(e,t);for(let[i,a]of t.entries()){let t=[...new Set(a.segments.flatMap(e=>[e.line.from,e.line.to]))],o=r.counts[i];a.trains=[];for(let r=0;r<o;r++){let i=`${a.id}-train-${r+1}`,s=t[r%t.length],c={id:i,path:a,homeCityId:s,ownerId:$m(e,i,s),color:[`coral`,`teal`,`gold`,`blue`][r%4],distance:r/o*a.length,count:3,spacing:Km,halfLength:qm,direction:1,speed:2.6,active:!1,waiting:!1,_leader:null};n.push(c),a.trains.push(c)}}let i=fh(n,e);for(let e of n)hh(e,i);let a=lh(t),o=new Map(n.map(e=>[e.id,e])),s=Sh(t,a),c=vh(t,n),l=[],u=[],d=[];function f(e,t,n=!1){if(e.owner===t.id)return!0;let r=e.waiters.values().next().value;return e.owner||r!==void 0&&r!==t.id?(n&&e.waiters.add(t.id),!1):!0}function p(e,t){e.owner=t.id,e.waiters.delete(t.id)}function m(e,t){if(s(e,t,l),l.some(t=>!f(t,e))||(ph(e,t,e._nextCarPoses),c.collides(e,e._nextCarPoses)))return!1;e.distance=t,hh(e,i);for(let t of l)p(t,e);return e.active=!0,c.update(e),mh(e,i),!0}function h(e,t=!1){if(!m(e,e.distance)&&t){d.length=0;for(let t of e.path.trains)t.active&&d.push(t);if(d.sort((e,t)=>e.distance-t.distance),d.length)for(let t=0;t<d.length;t++){let n=d[t],r=d[(t+1)%d.length],i=d.length===1?e.path.length:Zm(r.distance-n.distance,e.path.length);if(!(i<e.halfLength*2+n.halfLength+r.halfLength+1.8)&&m(e,Zm(n.distance+i/2,e.path.length)))return}else for(let t=1;t<12;t++)if(m(e,e.path.length*t/12))return}}for(let e of n)h(e);function g(e){for(let e of n)e._cachedDistance!==e.distance&&(hh(e,i),e.active&&c.update(e));for(let e of a)e.owner&&!uh(o.get(e.owner),e)&&(e.owner=null);for(let t of n)t.active||(t._spawnRetry=(t._spawnRetry??0)-e,t._spawnRetry<=0&&(h(t,!0),t._spawnRetry=.5));for(let e of t){e.trains.sort((e,t)=>e.distance-t.distance);let t=null,n=null;for(let r of e.trains)r.active&&(n&&(n._leader=r),t??=r,n=r);n&&(n._leader=n===t?null:t)}for(let t of n){if(!t.active){t.waiting=!0;continue}t.waiting=!1;let n=t.speed*e;if(t._leader){let e=t._leader,r=Zm(e.distance-t.distance,t.path.length)-t.halfLength-e.halfLength-.8;n=Math.min(n,Math.max(0,r))}let r=Zm(t.distance+n,t.path.length);s(t,r,l),s(t,t.distance,u);let a=!1;for(let e of l)f(e,t,!0)||(a=!0);for(let e of u)f(e,t,!0)||(a=!0);if(a||=(ph(t,r,t._nextCarPoses),c.collides(t,t._nextCarPoses)),a)t.waiting=!0;else{for(let e of l)p(e,t);for(let e of u)p(e,t);t.distance=r;for(let e=0;e<t.count;e++)dh(t._nextCarPoses[e],t.carPoses[e]);nh(t.path,r,t.pose),t._cachedDistance=r,c.update(t),mh(t,i)}}}return{mode:`circuits`,trains:n,paths:t,poseBuffer:i,poseStride:6,stats:{requestedTrainCount:r.requested,trainCount:n.length,capacity:r.capacity},sampleTrain:(e,t=0,n)=>nh(e.path,e.distance+t,n),get reservations(){return a.map(e=>({id:e.id,trainId:e.owner,zones:e.zones}))},update(e){if(!Number.isFinite(e)||e<0)throw TypeError(`Traffic time step must be finite and nonnegative`);if(!e)return;let t=Math.ceil(e/Xm);for(let n=0;n<t;n++)g(e/t)}}}var Th={coral:`redLight`,teal:`teal`,gold:`gold`,blue:`blue`};function Eh(e,t,n={}){let r=!!wt(t),i=n.traffic??wh(t),a=new ut;a.name=`instanced-trains`,e.add(a);let o=new Map((t.players??[]).map(e=>[e.id,zl(e)]));a.userData.ownedMaterials=[...o.values()].flatMap(e=>Object.values(e));let c=i.trains.reduce((e,t)=>e+t.count,0),l=new Float32Array(c*6),u=new Map,f=new Map,p=0,m=!1,h=i.trains.map(e=>{let t=p;return p+=e.count,{state:e,parts:Array.from({length:e.count},(n,r)=>{let i=new s;return i.userData={trainId:e.id,poseOnly:!0,poseIndex:t+r},i}),poseOffset:t}}),g=()=>i.poseBuffer??l;function _(){let e=g();h.poseBuffer=e;for(let t of h){let n=t.state;for(let r=0;r<t.parts.length;r++){let a=t.parts[r],o=((i.poseBuffer?n.poseOffset:t.poseOffset)+r)*6;if(a.userData.poseIndex=o/6,!i.poseBuffer){let t=n.carPoses?.[r]??i.sampleTrain(n,(r-(n.count-1)/2)*n.spacing);e[o]=t.x,e[o+1]=t.y,e[o+2]=t.z,e[o+3]=t.angle,e[o+4]=+!!n.active,e[o+5]=0}a.position.set(e[o],e[o+1],e[o+2]),a.rotation.y=e[o+3]+(r===0?Math.PI:0),a.visible=e[o+4]>0}}}let y=new tt,b=new tt,x=new yt,S=new we(new q,2.2),C=new q,w=new gt,T=new q(1,1,1),E=new q(0,1,0),D=new d(.64,.74,1),O=new Float32Array(D.attributes.position.count*3);for(let e=0;e<O.length;e+=3)qt.metal.color.toArray(O,e);D.setAttribute(`color`,new z(O,3));let k=Gt(new v({color:16777215,vertexColors:!0,roughness:1,flatShading:!0}));k.name=`train-gangway`,a.userData.ownedMaterials.push(k);let A=null,j=0,M=new tt,N=new tt,P=new q,F=new q,I=new q,L=new q,ee=new q,R=new q,te=new q,B=new q,V=new q,H={totalTrains:h.length,totalCars:c,visibleCars:0,visibleTrains:0,visibleConnectors:0,batches:0,templates:0,uploadedMatrices:0};function ne(e,n){return r?Ke(t,e.position.x,e.position.y,e.position.z,e.rotation.y,n):(w.setFromAxisAngle(E,e.rotation.y),n.compose(e.position,w,T))}function re(t,n){ne(t,M),ne(n,N),F.setFromMatrixPosition(M),I.setFromMatrixPosition(N),B.subVectors(I,F),L.setFromMatrixColumn(M,2),ee.setFromMatrixColumn(N,2);let r=L.dot(B)>=0?1:-1,i=ee.dot(B)>=0?-1:1;F.set(0,.88,r*.92).applyMatrix4(M),I.set(0,.88,i*.92).applyMatrix4(N),B.subVectors(I,F);let a=B.length();return a<.02||a>2?!1:(P.copy(F).add(I).multiplyScalar(.5),S.center.copy(P).applyMatrix4(e.matrixWorld),S.radius=.85,te.setFromMatrixColumn(M,1).add(V.setFromMatrixColumn(N,1)).normalize(),B.multiplyScalar(1/a),R.crossVectors(te,B).normalize(),te.crossVectors(B,R).normalize(),y.makeBasis(R,te,B).scale(C.set(1,1,a)),y.setPosition(P),!0)}function ie(e,t){let n=`${e.state.ownerId??e.state.color}:${+!!t}`;if(!u.has(n)){let r=bm(Xp(ym(new ut,{palette:o.get(e.state.ownerId),color:Th[e.state.color]??`redLight`,cab:t})));a.userData.ownedMaterials.push(...r.userData.ownedMaterials),u.set(n,r.children.map(e=>({geometry:e.geometry,material:e.material})))}return{key:n,parts:u.get(n)}}function ae(n,{mapBlend:i=0,prewarm:o=!1}={}){if(m||(a.visible=i<.999||o,H.visibleCars=0,H.visibleTrains=0,H.visibleConnectors=0,H.uploadedMatrices=0,!a.visible))return;n&&(n.updateMatrixWorld(),b.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),x.setFromProjectionMatrix(b)),e.updateWorldMatrix(!0,!1);let s=new Map,c=new Set;S.radius=2.2;for(let i of h)for(let a=0;a<i.parts.length;a++){let o=i.parts[a];if(!o.visible||(r?Ve(t,o.position.x,o.position.y+.8,o.position.z,S.center):S.center.copy(o.position).addScaledVector(E,.8),S.center.applyMatrix4(e.matrixWorld),n&&!x.intersectsSphere(S)))continue;let l=a===0||a===i.parts.length-1,u=`${i.state.ownerId??i.state.color}:${+!!l}`;s.has(u)||s.set(u,{train:i,cab:l,cars:[]}),s.get(u).cars.push({train:i,part:o}),H.visibleCars++,c.add(i.state.id)}for(let[e,t]of f)s.has(e)||t.meshes.forEach(e=>{e.count=0});for(let[e,t]of s){let n=f.get(e);if(!n||n.capacity<t.cars.length){if(n)for(let e of n.meshes)a.remove(e),e.dispose();let r=ie(t.train,t.cab),i=2**Math.ceil(Math.log2(Math.max(16,t.cars.length)));n={capacity:i,meshes:r.parts.map(e=>{let n=new Fe(e.geometry,e.material,i);return n.count=0,n.instanceMatrix.setUsage(xe),n.frustumCulled=!1,n.castShadow=!0,n.receiveShadow=!0,n.userData.instanceTrainIds=[],n.userData.ownerId=t.train.state.ownerId,a.add(n),n})},f.set(e,n)}for(let e=0;e<t.cars.length;e++){let{train:r,part:i}=t.cars[e];ne(i,y);for(let t of n.meshes)t.setMatrixAt(e,y),t.userData.instanceTrainIds[e]=r.state.id}for(let e of n.meshes)e.count=t.cars.length,e.userData.instanceTrainIds.length=e.count,e.instanceMatrix.clearUpdateRanges(),e.instanceMatrix.addUpdateRange(0,e.count*16),e.instanceMatrix.needsUpdate=!0,e.boundingSphere=null,H.uploadedMatrices+=e.count}let l=H.visibleCars;if(l>j&&(A&&(a.remove(A),A.dispose()),j=2**Math.ceil(Math.log2(Math.max(16,l))),A=new Fe(D,k,j),A.name=`train-gangways`,A.count=0,A.frustumCulled=!1,A.instanceMatrix.setUsage(xe),A.castShadow=!0,A.receiveShadow=!0,A.userData={isTrainConnector:!0,instanceTrainIds:[]},a.add(A)),A){for(let e of h)if(c.has(e.state.id))for(let t=1;t<e.parts.length;t++){let r=e.parts[t-1],i=e.parts[t];if(r.visible&&i.visible&&re(r,i)&&(!n||x.intersectsSphere(S))){if(H.visibleConnectors>=j)break;A.setMatrixAt(H.visibleConnectors,y),A.userData.instanceTrainIds[H.visibleConnectors++]=e.state.id}}A.count=H.visibleConnectors,A.userData.instanceTrainIds.length=A.count,A.boundingSphere=null,A.instanceMatrix.clearUpdateRanges(),A.instanceMatrix.addUpdateRange(0,A.count*16),A.instanceMatrix.needsUpdate=!0,H.uploadedMatrices+=A.count}H.visibleTrains=c.size,H.batches=[...f.values()].reduce((e,t)=>e+t.meshes.length,0)+ +!!A,H.templates=u.size}function oe(){if(!m){m=!0;for(let e of f.values())e.meshes.forEach(e=>e.dispose());for(let e of u.values())e.forEach(e=>e.geometry.dispose());A?.dispose(),D.dispose(),a.userData.ownedMaterials.forEach(e=>e.dispose()),a.clear(),a.removeFromParent()}}return _(),{root:a,trains:h,traffic:i,stats:H,get poseBuffer(){return g()},update(e){if(!m){let t=performance.now();i.update(e);let n=performance.now();_(),H.simulationMs=n-t,H.poseMs=performance.now()-n}},updateView:ae,dispose:oe}}Object.freeze([`meadow`,`scrub`,`dune`,`outcrop`,`frost`]);var Dh=Zt(nn(),1),Oh=1e5,kh=.026;function Ah(e,t,n){let r=[];for(let i of t){if(i.points.length<2||!(i.width>0))continue;let t=i.points.map(t=>{let r=K(e,n,t);return{X:Math.round(r.x*Oh),Y:Math.round(r.z*Oh)}}).filter((e,t,n)=>!t||e.X!==n[t-1].X||e.Y!==n[t-1].Y);if(t.length<2)continue;let a=new Dh.default.ClipperOffset(2,.008*Oh),o=[];a.AddPath(t,Dh.default.JoinType.jtRound,Dh.default.EndType.etOpenRound),a.Execute(o,i.width*.5*Oh),r.push(...o)}if(!r.length)return[];let i=new Dh.default.Clipper,a=new Dh.default.PolyTree;return i.AddPaths(r,Dh.default.PolyType.ptSubject,!0),i.Execute(Dh.default.ClipType.ctUnion,a,Dh.default.PolyFillType.pftNonZero,Dh.default.PolyFillType.pftNonZero),Dh.default.JS.PolyTreeToExPolygons(a).map(({outer:e,holes:t})=>({outer:e.map(e=>[e.X/Oh,e.Y/Oh]),holes:t.map(e=>e.map(e=>[e.X/Oh,e.Y/Oh]))}))}function jh(e,t,{surfaceRoot:n=null}={}){let r=new Map((t.cities??[]).map(e=>[e.id,e])),i=new Map,a=!!wt(t);for(let e of t.cityStreets??[]){if(e.points.length<2)continue;let n=r.get(e.cityId),a=Number.isFinite(n?.x)&&Number.isFinite(n?.z)?n:e.points[0],o=t.biomes&&ls(t,a.x,a.z)===`desert`?`gravel`:`sand`,s=`${e.cityId??`network`}:${o}`;i.has(s)||i.set(s,{anchor:a,material:o,streets:[]}),i.get(s).streets.push(e)}let o=[];for(let{anchor:r,material:s,streets:c}of i.values()){let i=Ah(t,c,r).map(({outer:e,holes:t})=>{let n=new O(e.map(([e,t])=>new Y(e,-t)));return n.holes=t.map(e=>new C(e.map(([e,t])=>new Y(e,-t)))),n});if(!i.length)continue;let l=new Se(i);if(l.rotateX(-Math.PI/2),a){let e=l;l=eu(e,3),e.dispose()}let u=l.getAttribute(`position`),d={},f=new q;for(let e=0;e<u.count;e++)We(t,r.x,r.z,u.getX(e),u.getZ(e),d),n?(Ve(t,d.x,kh,d.z,f),u.setXYZ(e,f.x,f.y,f.z)):u.setXYZ(e,d.x,kh,d.z);l.computeVertexNormals();let p=Wp(n??e,l,s);p.name=`joined-city-streets`,p.userData.surfaceSpace=!!n,o.push(p)}return o}function Mh(e,t,{requestChunk:n,size:r=192,maxChunks:i=48,maxVisibleChunks:o=1/0,maxPending:s=2,maxBytes:c=134217728,uploadMesh:l}={}){if(typeof n!=`function`)throw TypeError(`Regional rendering requires a worker requestChunk function`);let u=new ut;u.name=`local-world-detail`,e.add(u);let d=new Map,f=new Map,h=new Map,g=new Map,y=new Map,b=new Map,x=new yt,S=new yt,C=new tt,w=new q,T=new q,E=new m,D=new q,O=wt(t),k=new R,A=new q,j={},M=O?new we(new q(0,-O.radius,0),O.radius):null,N=new m,P=new we,F=new q,I=0,L=!1,ee=!1,te=[],B=``,V=0,H=[],ne=[],re=[],ie=[],ae=0,oe=!0,U=t.gameplay?Tm(t,{onChange(){oe=!0,ae++,B=``}}):null,se=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),ce=new Set([`water`,`surf`,`window`,`lamp`]),le=Math.max(35,...t.mountains.map(e=>e.height)),ue=[...t.cities,...t.mountains.filter(e=>!e.range),...t.stations],de=new Set(t.mountains),fe=new Map(ue.map(e=>[e,de.has(e)?e.radius??4:ct(t,e.x,e.z,e.radius??4)])),pe={loadedChunks:0,visibleChunks:0,pendingChunks:0,requestedChunks:0,triangles:0,bytes:0,errors:0,requiredChunks:0,prefetchChunks:0,coverageLimited:!1,budgetOverflow:!1,maxBytes:c,uploadedMeshes:0,uploadingChunks:0,revealingChunks:0},me=(e,t)=>{let n=JSON.stringify(e),r=t.materials.get(n);return r||(r=so(new v({name:e.name,color:new _().fromArray(e.color),roughness:e.roughness,metalness:e.metalness,side:e.side,flatShading:!0,vertexColors:e.vertexColors}),t.reveal),Gt(r,{kind:e.sceneStyle??`asset`}),t.materials.set(n,r)),r};function he(e){e.trees&&U.removeChunk(e.key),e.root.traverse(e=>{e.isMesh&&e.geometry.dispose()});for(let t of e.materials.values())t.dispose();e.depthMaterial?.dispose()}function ge(e){he(e),u.remove(e.root),d.delete(e.key),pe.bytes-=e.bytes,pe.triangles-=e.triangles,oe=!0,ae++}function _e(e){for(let[t,n]of h)for(;n.next<n.packet.meshes.length;){let t=n.packet.meshes[n.next++],r=new $e;r.setAttribute(`position`,new z(t.position,3)),t.index&&r.setIndex(new z(t.index,1)),t.normal?r.setAttribute(`normal`,new z(t.normal,3)):r.computeVertexNormals(),t.color&&r.setAttribute(`color`,new z(t.color,3));let i=n.packet.bounds,o=n.packet.renderBounds;o?(r.boundingBox=new m(new q().fromArray(o.min),new q().fromArray(o.max)),r.boundingSphere=r.boundingBox.getBoundingSphere(new we)):r.boundingSphere=new we(new q((i.minX+i.maxX)/2,le/2,(i.minZ+i.maxZ)/2),Math.hypot(i.maxX-i.minX,le+8,i.maxZ-i.minZ)/2),n.triangles+=(t.index?.length??t.position.length/3)/3;let s=new a(r,me(t.material,n));Bp(s,t.bvh);let c=new Set([t.position.buffer,t.normal?.buffer,t.color?.buffer,t.index?.buffer,...Vp(t.bvh)].filter(Boolean));if(n.bytes+=[...c].reduce((e,t)=>e+t.byteLength,0),s.customDepthMaterial=n.depthMaterial,s.castShadow=!0,s.receiveShadow=!0,n.root.add(s),performance.now()>=e)return}}function ve(){for(let[e,t]of h){if(t.next<t.packet.meshes.length||l&&t.uploaded<t.next)continue;let n=t.packet.bounds,r=t.packet.renderBounds,i={key:e,root:t.root,bounds:r?new m(new q().fromArray(r.min),new q().fromArray(r.max)):new m(new q(n.minX,-4,n.minZ),new q(n.maxX,le,n.maxZ)),last:I,bytes:t.bytes,triangles:t.triangles,reveal:t.reveal,progress:0,materials:t.materials,depthMaterial:t.depthMaterial,lifePlacements:t.packet.lifePlacements??[],placements:t.packet.placements??[],cityStreets:t.packet.cityStreets??[],cellBounds:t.packet.cellBounds??t.packet.bounds};U&&t.packet.mutableTrees?.length&&(i.trees=U.addChunk(e,i.root,t.packet.mutableTrees,{reveal:t.reveal}),i.bounds.union(i.trees.bounds),i.bytes+=i.trees.bytes,i.triangles+=i.trees.triangles),u.add(t.root),d.set(e,i),h.delete(e),oe=!0,ae++,pe.bytes+=i.bytes,pe.triangles+=i.triangles,pe.loadedChunks=d.size}}function ye(e){e.cancelled=!0,he(e)}function be(){if(l)for(let[e,t]of h){if(t.warming||t.uploaded>=t.next)continue;t.warming=!0;let n=()=>{!L&&!t.cancelled&&(t.uploaded++,t.warming=!1,pe.uploadedMeshes++)},r=n=>{L||t.cancelled||(ye(t),h.delete(e),b.set(e,n),pe.errors++,u.userData.lastError=String(n?.message??n))};try{let e=l(t.root.children[t.uploaded]);e?.then?Promise.resolve(e).then(n,r):n()}catch(e){r(e)}return}}function xe(e,t){pe.requestedChunks++;let r=new AbortController,i={controller:r},a=Promise.resolve().then(()=>n(t,{signal:r.signal}));i.promise=a,f.set(e,i),pe.pendingChunks=f.size+h.size,Promise.resolve(a).then(t=>{if(f.get(e)===i&&(f.delete(e),!L&&g.has(e))){let n=new ut;n.name=`detail-${e}`;let r={value:0};h.set(e,{packet:t,root:n,next:0,uploaded:0,warming:!1,bytes:0,triangles:0,reveal:r,materials:new Map,depthMaterial:co(r)})}},t=>{f.get(e)===i&&(f.delete(e),L||t?.name===`AbortError`||(b.set(e,t),pe.errors++,u.userData.lastError=String(t?.message??t)))}).finally(()=>{pe.pendingChunks=f.size+h.size})}let Se=t.outline.map(e=>e[0]),W=t.outline.map(e=>e[1]),Ce={minX:Math.min(...Se),maxX:Math.max(...Se),minZ:Math.min(...W),maxZ:Math.max(...W)},Te=O?.complete?Ce.maxX-Ce.minX:0,Ee=O?.complete&&O.projection.type===`equirectangular`,G=Ee&&Array.isArray(t.biomes?.land)?[...t.biomes.land,...t.biomes.oceanShore??[],...t.biomes.lakeShore??[]].map(e=>{let t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let[n,r]of e[0])t.minX=Math.min(t.minX,n),t.maxX=Math.max(t.maxX,n),t.minZ=Math.min(t.minZ,r),t.maxZ=Math.max(t.maxZ,r);return t}):null,De=G?[...ue.map(e=>{let t=fe.get(e);return{minX:e.x-t,maxX:e.x+t,minZ:e.z-t,maxZ:e.z+t}}),...(t.lines??[]).map(e=>{let n={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(let t of e.points??[])n.minX=Math.min(n.minX,t.x),n.maxX=Math.max(n.maxX,t.x),n.minZ=Math.min(n.minZ,t.z),n.maxZ=Math.max(n.maxZ,t.z);if(Number.isFinite(n.minX)){let e=Math.max(ct(t,n.minX,n.minZ,4),ct(t,n.maxX,n.maxZ,4));n.minX-=e,n.maxX+=e,n.minZ-=e,n.maxZ+=e}return n})]:[],Oe=new Map;function ke(e){if(!G)return!0;if(!Oe.has(e.key)){let t=e.x-r/2,n=e.x+r/2,i=e.z-r/2,a=e.z+r/2,o=(e,r=0)=>e.minX+r<=n&&e.maxX+r>=t&&e.minZ<=a&&e.maxZ>=i;Oe.set(e.key,G.some(e=>o(e))||De.some(e=>o(e)||Te&&(o(e,-Te)||o(e,Te))))}return Oe.get(e.key)}function Ae(e){if(!Ee)return!0;let n=O.projection,i=Math.max(Ce.minX,e.x-r/2),a=Math.min(Ce.maxX,e.x+r/2),o=Math.max(Ce.minZ,e.z-r/2),s=Math.min(Ce.maxZ,e.z+r/2),c=n.centralLatitude*Math.PI/180-(o+s)/(2*n.radius),l=(s-o)/(2*n.radius),u=Math.cos(Math.max(0,Math.abs(c)-l));return Ve(t,(i+a)/2,(le-4)/2,(o+s)/2,P.center),P.radius=(O.radius+le)*Math.hypot((a-i)/(2*n.radius)*u,l)+(le+4)/2,S.intersectsSphere(P)}let K=e=>Te?((e+Te/2)%Te+Te)%Te-Te/2:e;function je(e,t){if(Te&&t-e>=Te)return[[Ce.minX,Ce.maxX]];if(!Te)return[[Math.max(Ce.minX,e),Math.min(Ce.maxX,t)]];let n=((e-Ce.minX)%Te+Te)%Te+Ce.minX,r=n+t-e;return r<=Ce.maxX?[[n,r]]:[[n,Ce.maxX],[Ce.minX,r-Te]]}function Me(e,t,n){return k.origin.set(t,n,-1).unproject(e),e.isPerspectiveCamera?k.direction.set(t,n,1).unproject(e).sub(k.origin).normalize():k.direction.copy(w),k}function Ne(e,n){e.updateMatrixWorld(),e.getWorldDirection(w),C.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),S.setFromProjectionMatrix(C);let r=1/0,i=-1/0,a=1/0,o=-1/0;if(O){let s=!1;N.makeEmpty();for(let c of[-4,le])for(let l of[-1,0,1])for(let u of[-1,0,1])Me(e,l,u),M.radius=O.radius+c,k.intersectSphere(M,A)?(N.expandByPoint(A),bt(t,A,j),Te&&n&&(j.x=n.x+K(j.x-n.x)),r=Math.min(r,j.x),i=Math.max(i,j.x),a=Math.min(a,j.z),o=Math.max(o,j.z)):s=!0;if(s)r=Ce.minX,i=Ce.maxX,a=Ce.minZ,o=Ce.maxZ;else if(Ee){let n=O.projection,s=N.getSize(T),c=Math.max(4,s.lengthSq()/(8*O.radius))*n.radius/O.radius;a=Math.max(Ce.minZ,a-c),o=Math.min(Ce.maxZ,o+c);let l=!1;for(let n of[Ce.minZ,Ce.maxZ])Ve(t,0,0,n,F),T.subVectors(F,M.center).dot(w)>=0||(F.project(e),Math.abs(F.x)<=1&&Math.abs(F.y)<=1&&F.z>=-1&&F.z<=1&&(l=!0,a=Math.min(a,n),o=Math.max(o,n)));if(l)r=Ce.minX,i=Ce.maxX;else{let e=Math.max(Math.abs(n.centralLatitude*Math.PI/180-a/n.radius),Math.abs(n.centralLatitude*Math.PI/180-o/n.radius)),t=c/Math.max(.01,Math.cos(e));r-=t,i+=t}}else{let e=Math.max(4,((i-r)**2+(o-a)**2)/(8*O.radius));r-=e,i+=e,a-=e,o+=e}}else for(let t of[-1,1])for(let n of[-1,1]){Me(e,t,n);let s=Math.abs(k.direction.y)>1e-5?-k.origin.y/k.direction.y:-1;k.at(s>=0?s:e.far,T),r=Math.min(r,T.x),i=Math.max(i,T.x),a=Math.min(a,T.z),o=Math.max(o,T.z)}return{minX:r,maxX:i,minZ:a,maxZ:o}}function Pe(t,{dt:n=0,reveal:r=!0,reducedMotion:i=!1}={}){if(L)return;e.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),C.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),x.setFromProjectionMatrix(C),pe.visibleChunks=pe.revealingChunks=0;let a=[];for(let t of d.values())E.copy(t.bounds).applyMatrix4(e.matrixWorld),t.root.visible=x.intersectsBox(E),t.root.visible&&(pe.visibleChunks++,r&&(t.progress=i?1:Math.min(1,t.progress+Math.max(0,n)/.38),t.reveal.value=t.progress*t.progress*(3-2*t.progress)),t.progress<1?pe.revealingChunks++:a.push(t));let o=`${U?.revision??0}:`+a.map(e=>e.key).join(`|`);o!==B&&(B=o,te=a.flatMap(e=>e.lifePlacements).filter(e=>e.kind!==`tree`||!U?.removed.has(e.id)),V++)}function Fe(e,{mapBlend:n=0,target:a,budgetMs:m=5,prewarm:_=!1,coverageCamera:v=e,coverageCameras:x,retainVisible:w=!1,groundFocus:T,groundRadius:E=45,groundOnly:k=!1}={}){if(L||(I++,u.visible=n<.999,!u.visible&&!_&&!T))return;let A=[];k&&T?D.set(T.x,T.y??0,T.z):a&&D.copy(a);let j=(e,n)=>({key:`${e}:${n}`,x:e+r/2,z:n+r/2,size:r,distance:O?J(t,D,{x:e+r/2,z:p.clamp(n+r/2,Ce.minZ,Ce.maxZ)})**2:K(e+r/2-D.x)**2+(n+r/2-D.z)**2});y.clear(),g.clear();let M=[];if((u.visible||_)&&(!k||!T))for(let e of x?.length?x:[v])M.push({bounds:Ne(e,a),coverage:e});if(T){let e=ct(t,T.x,T.z,Math.max(.001,E));M.push({bounds:{minX:T.x-e,maxX:T.x+e,minZ:T.z-e,maxZ:T.z+e}})}for(let{bounds:e,coverage:t}of M){let{minX:n,maxX:i,minZ:o,maxZ:s}=e;t&&(C.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),S.setFromProjectionMatrix(C)),!a&&!A.length&&D.set((n+i)/2,0,(o+s)/2),A.push(e);for(let[e,a]of je(n,i))for(let n=Math.floor(e/r)*r;n<a;n+=r)for(let e=Math.floor(Math.max(Ce.minZ,o)/r)*r;e<Math.min(Ce.maxZ,s);e+=r){let r=j(n,e);ke(r)&&(!t||Ae(r))&&y.set(r.key,r)}for(let e of ue){let t=fe.get(e),a=Te?D.x+K(e.x-D.x):e.x;if(a+t<n||a-t>i||e.z+t<o||e.z-t>s)continue;let c=j(Math.floor(e.x/r)*r,Math.floor(e.z/r)*r);y.set(c.key,c)}}let N=[...y.values()].sort((e,t)=>e.distance-t.distance);ee=!0,pe.requiredChunks=y.size,pe.coverageLimited=y.size>o;for(let e of N.slice(0,o))g.set(e.key,e);if(!pe.coverageLimited){let e=new Map;for(let{minX:t,maxX:n,minZ:i,maxZ:a}of A)for(let[o,s]of je(t-r,n+r))for(let t=Math.floor(o/r)*r;t<s;t+=r)for(let n=Math.floor(Math.max(Ce.minZ,i-r)/r)*r;n<Math.min(Ce.maxZ,a+r);n+=r){let r=j(t,n);!g.has(r.key)&&ke(r)&&e.set(r.key,r)}for(let t of[...e.values()].sort((e,t)=>e.distance-t.distance)){if(g.size>=Math.min(i,y.size+36))break;g.set(t.key,t)}}pe.prefetchChunks=g.size-Math.min(y.size,o);for(let[e,t]of f)g.has(e)||(f.delete(e),t.controller.abort());for(let[e,t]of h)g.has(e)||(ye(t),h.delete(e));let P=performance.now();_e(P+m),be(),ve(),Pe(e);for(let e of d.values())(g.has(e.key)||w&&e.root.visible)&&(e.last=I);for(let[e,t]of g){if(f.size+h.size>=s||performance.now()-P>=m)break;let n=d.size?pe.bytes/d.size:4194304;!y.has(e)&&pe.bytes+n*(1+f.size+h.size)>c*.9||d.has(e)||f.has(e)||h.has(e)||b.has(e)||xe(e,t)}if(d.size>i||pe.bytes>c){let e=[...d.values()].filter(e=>!y.has(e.key)&&!(w&&e.root.visible)).sort((e,t)=>Number(g.has(e.key))-Number(g.has(t.key))||e.last-t.last);for(let t of e){if(d.size<=i&&pe.bytes<=c)break;ge(t)}}pe.budgetOverflow=pe.bytes>c,pe.loadedChunks=d.size,pe.pendingChunks=f.size+h.size,pe.uploadingChunks=l?[...h.values()].filter(e=>e.uploaded<e.next).length:0}function Ie(){if(!L){L=!0;for(let e of[...d.values()])ge(e);for(let e of h.values())ye(e);for(let e of f.values())e.controller.abort();U?.dispose(),u.removeFromParent(),g.clear(),y.clear(),f.clear(),h.clear(),pe.loadedChunks=pe.pendingChunks=0,te=[],B=``,V++,H=[],ne=[],re=[],ie=[],oe=!1,ae++}}function Le(){if(oe){H=[],re=[],ie=[];for(let e of d.values())H.push(...e.placements.filter(e=>e.kind!==`tree`||!U?.removed.has(e.id))),re.push(...e.cityStreets),ie.push(...e.root.children.filter(e=>e.isMesh&&!ce.has(e.material.userData.sceneStyle)),...e.trees?.meshes??[]);ne=H.filter(e=>se.has(e.kind)),oe=!1}}function Re(e,n=0){if(L||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let i=Math.max(.001,ct(t,e.x,e.z,Math.max(0,n)));if(e.z-i<Ce.minZ||e.z+i>Ce.maxZ||!Te&&(e.x-i<Ce.minX||e.x+i>Ce.maxX))return!1;for(let[t,n]of je(e.x-i,e.x+i))for(let a=Math.floor(t/r)*r;a<n;a+=r)for(let t=Math.floor((e.z-i)/r)*r;t<e.z+i;t+=r){let e=`${a}:${t}`;if(ke({key:e,x:a+r/2,z:t+r/2})&&!d.has(e))return!1}return!0}function ze(){return!L&&ee&&!pe.coverageLimited&&(y.size>0||G!==null)&&[...y.keys()].every(e=>d.has(e))}return{root:u,update:Fe,updateVisibility:Pe,stats:pe,dispose:Ie,hasCoverageAt:Re,fellTree:(e,t)=>U?.fellTree(e,t)??!1,removeTree:e=>U?.removeTree(e)??!1,updateTrees:e=>U?.update(e),get removedTreeIds(){return U?.removed},get treeRevision(){return U?.revision??0},get placements(){return Le(),H},get placementRevision(){return ae},get cityStreets(){return Le(),re},getSceneryPlacements(){return Le(),H},getCollisionPlacements(){return Le(),ne},getTerrainMeshes(){return Le(),ie},get lifePlacements(){return te},get lifeRevision(){return V},get ready(){return ze()},get settled(){return ze()&&[...y.keys()].every(e=>{let t=d.get(e);return!t.root.visible||t.progress>=1})}}}var Nh=Object.freeze({terrain:-1.35,contour0:-.18,contour1:-.16,snow:-.14,sand:-1.24,waterLight:-1.27,ocean:-1.27,"route-paper":.025,"route-ink":.035});function Ph(e,t,n,r){let i=!!t.getAttribute(`color`),a=new v({name:e.name.replace(/^map-/,`detail-base-`),color:i?16777215:e.color,vertexColors:i,roughness:1,metalness:0,side:2,flatShading:!1,depthWrite:!0,depthTest:!0});return a.onBeforeCompile=e=>{e.uniforms.detailBaseHeight={value:n},e.uniforms.detailBaseRadius={value:r},e.vertexShader=`uniform float detailBaseHeight; uniform float detailBaseRadius;
`+e.vertexShader;let t=r>0?`normalize(position + vec3(0.0, detailBaseRadius, 0.0))`:`vec3(0.0, 1.0, 0.0)`;e.vertexShader=e.vertexShader.replace(`#include <beginnormal_vertex>`,`
      vec3 detailBaseNormal = ${t};
      vec3 objectNormal = detailBaseNormal;
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif
    `),e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,r>0?`vec3 transformed = detailBaseNormal * (detailBaseRadius + detailBaseHeight) - vec3(0.0, detailBaseRadius, 0.0);`:`vec3 transformed = vec3(position.x, detailBaseHeight, position.z);`)},a.customProgramCacheKey=()=>`detail-base-${r>0?`sphere`:`plane`}-v1`,Gt(a,{kind:/water|ocean/.test(e.name)?`water`:`terrain`})}function Fh(e,t,n){let r=new ut;r.name=`detail-base`,e.add(r);let i=new Set,o=n.surface?.type===`sphere`?n.surface.radius:0,s=!1;return t?.traverse(e=>{if(!e.isMesh||!e.geometry?.getAttribute(`position`)||Array.isArray(e.material))return;let t=e.material.name.replace(/^map-/,``);if(!Object.hasOwn(Nh,t))return;let n=Ph(e.material,e.geometry,Nh[t],o);i.add(n);let s=new a(e.geometry,n);s.name=`detail-base-${t}`,s.castShadow=!1,s.receiveShadow=!0,s.frustumCulled=!1,r.add(s)}),{root:r,dispose(){s||(s=!0,i.forEach(e=>e.dispose()),i.clear(),r.clear(),r.removeFromParent())}}}function Ih({cities:e=256,trains:t=2048,seed:n=`continental-256`}={}){let r=Number(e),i=Number(t);if(!Number.isFinite(r)||r<8||r>4096||!Number.isInteger(r)||r%8!=0)throw TypeError(`Stress cities must be a multiple of 8 from 8 through4096`);if(!Number.isInteger(i)||i<0||i>32768)throw TypeError(`Stress trains must be an integer from 0 through32768`);let a=r/8,o=Math.ceil(Math.sqrt(a*2)),s=Math.ceil(a/o),c=o*500+300,l=s*500+300,u=c/2,d=l/2,f=s%2?250:0,p={seed:n,bounds:{width:c,depth:l},outline:[[-u,-d+100],[-u+100,-d],[u-100,-d],[u,-d+100],[u,d-100],[u-100,d],[-u+100,d],[-u,d-100]],density:1,minTurnRadius:9,cities:[],connections:[],mountains:[],river:{width:10,points:[[-u-100,f],[u+100,f]]},traffic:{trainCount:i,circuits:[]}},m=[`coral`,`teal`,`gold`,`blue`];for(let e=0;e<a;e++){let t=(e%o-(o-1)/2)*500,n=(Math.floor(e/o)-(s-1)/2)*500,r=[];for(let i=0;i<8;i++){let a=i*Math.PI/4,o=`region-${e+1}-city-${i+1}`;p.cities.push({id:o,x:t+Math.cos(a)*190,z:n+Math.sin(a)*190,level:1+(e*3+i*7)%10,ownerId:m[(e+i)%4]});let s=`regional-${e+1}-${i+1}`;p.connections.push({id:s,from:o,to:`region-${e+1}-city-${(i+1)%8+1}`}),r.push({lineId:s,direction:1})}p.traffic.circuits.push({id:`circuit-${e+1}`,segments:r}),e%o>0&&p.connections.push({id:`connector-west-${e+1}`,from:`region-${e}-city-1`,to:`region-${e+1}-city-5`}),e%o===0&&e>=o&&p.connections.push({id:`connector-north-${e+1}`,from:`region-${e-o+1}-city-3`,to:`region-${e+1}-city-7`})}for(let e=0;e<a;e+=8){let t=p.cities[e*8+5],n=p.cities[e*8+6],r=(t.x+n.x)/2,i=(t.z+n.z)/2;Math.abs(i-f)>30&&p.mountains.push({id:`regional-pass-${e+1}`,x:r,z:i,radius:23,height:24})}return p}var Lh=`modulepreload`,Rh=function(e,t){return new URL(e,t).href},zh={},Bh=function(e){return e.pathname.endsWith(`.css`)},Vh=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Hh=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Rh(t,n);let r=s(t),i=Bh(r);return Vh(zh,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Lh,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function Uh(e){return e.get(`layout`)??(e.has(`cities`)?`classic`:`settlement`)}async function Wh(e,t){let n=Uh(e),r={...e.has(`seed`)?{seed:e.get(`seed`)}:{},...e.has(`trains`)?{trainCount:Number(e.get(`trains`))}:{}};if(n===`settlement`){let{createSettlementWorld:e}=await Hh(async()=>{let{createSettlementWorld:e}=await import(`./settlement-world-CF3D5D1E.js`);return{createSettlementWorld:e}},__vite__mapDeps([0,1,2]),import.meta.url);return e(r)}if(n===`island`){let{createIslandWorld:e}=await Hh(async()=>{let{createIslandWorld:e}=await import(`./island-world-C45IKnLH.js`);return{createIslandWorld:e}},__vite__mapDeps([3,1,2]),import.meta.url);return e(r)}if(n===`earth`){let{createEarthWorld:e}=await Hh(async()=>{let{createEarthWorld:e}=await import(`./earth-world-DNqTiMLI.js`);return{createEarthWorld:e}},__vite__mapDeps([4,2,5,6,7]),import.meta.url);return e(r)}if(n===`europe`){let{createEuropeWorld:e}=await Hh(async()=>{let{createEuropeWorld:e}=await import(`./europe-world-BrOnXy3h.js`);return{createEuropeWorld:e}},__vite__mapDeps([8,5,2,7]),import.meta.url);return e(r)}if(n===`stress`)return Ih({cities:e.has(`cities`)?Number(e.get(`cities`)):256,trains:e.has(`trains`)?Number(e.get(`trains`)):2048,seed:e.get(`seed`)??`continental-railway`});if([`crossroads`,`showcase`].includes(n)){let r=await fetch(new URL(`./worlds/${n}.json`,t));if(!r.ok)throw Error(`Could not load the authored world`);let i=await r.json();return e.has(`seed`)&&(i.seed=e.get(`seed`)),i}return{seed:e.get(`seed`)??27,cityCount:Number(e.get(`cities`))||8}}function Gh({WorkerClass:e,MessageChannelClass:t=globalThis.MessageChannel,detailWorkers:n=e?1:globalThis.navigator?.hardwareConcurrency>=4?2:1}={}){let r=()=>e?new e(new URL(`data:text/javascript;base64,aW1wb3J0IHsgZ2VuZXJhdGVXb3JsZCxnZW5lcmF0ZVdvcmxkUmVnaW9uLHZhbGlkYXRlV29ybGQgfSBmcm9tICcuL3dvcmxkLW1vZGVsLmpzJzsKaW1wb3J0IHsgY29tcGlsZURldGFpbFBhY2tldCB9IGZyb20gJy4vZGV0YWlsLWNvbXBpbGVyLmpzJzsKaW1wb3J0IHsgY3JlYXRlTW91bnRhaW5Db250b3VycyB9IGZyb20gJy4vbW91bnRhaW4tY29udG91cnMuanMnOwppbXBvcnQgeyBwcmVwYXJlTWFwVGVycmFpbiB9IGZyb20gJy4vbWFwLXRlcnJhaW4uanMnOwppbXBvcnQgeyBjb21waWxlTWFwVGVycmFpbkdlb21ldHJ5IH0gZnJvbSAnLi9tYXAtdGVycmFpbi1nZW9tZXRyeS5qcyc7CgpsZXQgd29ybGQ7CmZ1bmN0aW9uIGJ1ZmZlcnNPZih2YWx1ZSxyZXN1bHQ9bmV3IFNldCgpKXsKICBpZihBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKXJlc3VsdC5hZGQodmFsdWUuYnVmZmVyKTsKICBlbHNlIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpcmVzdWx0LmFkZCh2YWx1ZSk7CiAgZWxzZSBpZih2YWx1ZSYmdHlwZW9mIHZhbHVlPT09J29iamVjdCcpZm9yKGNvbnN0IGNoaWxkIG9mIE9iamVjdC52YWx1ZXModmFsdWUpKWJ1ZmZlcnNPZihjaGlsZCxyZXN1bHQpOwogIHJldHVybiByZXN1bHQ7Cn0Kc2VsZi5vbm1lc3NhZ2U9KHtkYXRhOntpZCx0eXBlLHBheWxvYWQscG9ydH19KT0+ewogIGlmKHR5cGU9PT0nc2hhcmUtd29ybGQnKXsKICAgIHRyeXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgc2hhcmluZyBkZXRhaWwnKTsKICAgICAgY29uc3Qge21hcFRlcnJhaW4sLi4ubmV0d29ya309d29ybGQ7CiAgICAgIHBvcnQucG9zdE1lc3NhZ2Uoe3dvcmxkOm5ldHdvcmt9KTsKICAgIH1jYXRjaChlcnJvcil7cG9ydC5wb3N0TWVzc2FnZSh7ZXJyb3I6e25hbWU6ZXJyb3IubmFtZSxtZXNzYWdlOmVycm9yLm1lc3NhZ2V9fSk7fQogICAgZmluYWxseXtwb3J0LmNsb3NlKCk7fQogICAgcmV0dXJuOwogIH0KICBpZih0eXBlPT09J2F0dGFjaC1wb3J0Jyl7CiAgICBwb3J0Lm9ubWVzc2FnZT0oe2RhdGF9KT0+ewogICAgICBpZihkYXRhLmVycm9yKXNlbGYucG9zdE1lc3NhZ2Uoe2lkLGVycm9yOmRhdGEuZXJyb3J9KTsKICAgICAgZWxzZXt3b3JsZD1kYXRhLndvcmxkO3NlbGYucG9zdE1lc3NhZ2Uoe2lkLHJlc3VsdDp7cmVhZHk6dHJ1ZX19KTt9CiAgICAgIHBvcnQuY2xvc2UoKTsKICAgIH07CiAgICByZXR1cm47CiAgfQogIHRyeXsKICAgIGNvbnN0IHN0YXJ0PXBlcmZvcm1hbmNlLm5vdygpO2xldCByZXN1bHQ7CiAgICBpZih0eXBlPT09J2dlbmVyYXRlJyl7CiAgICAgIHdvcmxkPWdlbmVyYXRlV29ybGQocGF5bG9hZCx7ZGV0YWlsOiduZXR3b3JrJ30pOwogICAgICBmb3IoY29uc3QgbW91bnRhaW4gb2Ygd29ybGQubW91bnRhaW5zKWlmKG1vdW50YWluLnJhbmdlKW1vdW50YWluLm1hcENvbnRvdXJzPWNyZWF0ZU1vdW50YWluQ29udG91cnMobW91bnRhaW4pOwogICAgICB3b3JsZC5tYXBUZXJyYWluPXttZXNoZXM6Y29tcGlsZU1hcFRlcnJhaW5HZW9tZXRyeShwcmVwYXJlTWFwVGVycmFpbih3b3JsZCksd29ybGQpfTsKICAgICAgY29uc3QgdmlvbGF0aW9ucz12YWxpZGF0ZVdvcmxkKHdvcmxkKTsKICAgICAgaWYodmlvbGF0aW9ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHdvcmxkOiAke3Zpb2xhdGlvbnNbMF0uZGV0YWlsPz92aW9sYXRpb25zWzBdLnR5cGV9YCk7CiAgICAgIHJlc3VsdD17d29ybGQsbWlsbGlzZWNvbmRzOnBlcmZvcm1hbmNlLm5vdygpLXN0YXJ0fTsKICAgIH1lbHNlIGlmKHR5cGU9PT0nY2h1bmsnKXsKICAgICAgaWYoIXdvcmxkKXRocm93IG5ldyBFcnJvcignR2VuZXJhdGUgYSB3b3JsZCBiZWZvcmUgcmVxdWVzdGluZyBkZXRhaWwnKTsKICAgICAgY29uc3QgcmVnaW9uPWdlbmVyYXRlV29ybGRSZWdpb24od29ybGQscGF5bG9hZCk7CiAgICAgIHJlc3VsdD1jb21waWxlRGV0YWlsUGFja2V0KHJlZ2lvbix3b3JsZCk7CiAgICAgIHJlc3VsdC5taWxsaXNlY29uZHM9cGVyZm9ybWFuY2Uubm93KCktc3RhcnQ7CiAgICB9ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gd29ybGQgcmVxdWVzdDogJHt0eXBlfWApOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7aWQscmVzdWx0fSx0eXBlPT09J2NodW5rJz9bLi4uYnVmZmVyc09mKHJlc3VsdCldCiAgICAgIDp0eXBlPT09J2dlbmVyYXRlJz9bLi4uYnVmZmVyc09mKHdvcmxkLm1hcFRlcnJhaW4pXTpbXSk7CiAgfWNhdGNoKGVycm9yKXtzZWxmLnBvc3RNZXNzYWdlKHtpZCxlcnJvcjp7bmFtZTplcnJvci5uYW1lLG1lc3NhZ2U6ZXJyb3IubWVzc2FnZX19KTt9Cn07Cg==`,``+import.meta.url),{type:`module`}):new Worker(new URL(new URL(`world-worker-DpMid7k7.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=new Map,a=[],o=[],s=0,c=!1,l,u=!1,d=!1,f={workers:1,busy:0,queued:0,completedChunks:0,lastChunkMs:0},p=()=>new DOMException(`World request cancelled`,`AbortError`),m=()=>{f.workers=c?0:o.filter(e=>e.ready&&!e.failed).length,f.busy=o.filter(e=>e.currentId!==null).length,f.queued=a.filter(e=>i.has(e.id)).length};function h(e,t,n){i.delete(e.id),e.signal?.removeEventListener(`abort`,e.abort),t?e.reject(t):e.resolve(n)}function g(e){for(let t of[...i.values()])h(t,e);a.length=0;for(let e of o)e.currentId=null;m()}function _(e,t){t.node=e,t.type===`chunk`&&u&&(e.currentId=t.id);try{e.worker.postMessage({id:t.id,type:t.type,payload:t.payload})}catch(n){e.currentId===t.id&&(e.currentId=null),h(t,n)}}function v(){if(!(c||l)){for(let e of o)if(e.ready&&!e.failed&&e.currentId===null)for(;a.length&&e.currentId===null;){let t=a.shift();i.has(t.id)&&_(e,t)}m()}}function y(e){let t={worker:r(),primary:e,ready:e,failed:!1,currentId:null};o.push(t),t.worker.onmessage=({data:e})=>{if(c||t.failed)return;if(e.id===`peer-ready`){e.error?(t.failed=!0,t.worker.terminate()):t.ready=!0,v();return}t.currentId===e.id&&(t.currentId=null);let n=i.get(e.id);if(n){if(e.error){let t=Error(e.error.message);t.name=e.error.name??`Error`,h(n,t)}else n.type===`generate`&&(u=!0,b()),n.type===`chunk`&&(f.completedChunks++,f.lastChunkMs=e.result?.milliseconds??0),h(n,null,e.result)}v()};let n=n=>{if(c||t.failed)return;let r=Error(n);if(e){l=r,g(r);return}t.failed=!0,t.ready=!1,t.worker.terminate();let o=i.get(t.currentId);t.currentId=null,o&&(o.node=null,a.unshift(o)),v()};return t.worker.onerror=e=>n(e.message||`World worker failed`),t.worker.onmessageerror=()=>n(`World worker returned an unreadable packet`),t}function b(){if(d||n<2||!t)return;d=!0;let e,r;try{e=y(!1),r=new t,e.worker.postMessage({id:`peer-ready`,type:`attach-port`,port:r.port2},[r.port2]),o[0].worker.postMessage({type:`share-world`,port:r.port1},[r.port1])}catch{r?.port1.close(),r?.port2.close(),e&&(e.failed=!0,e.worker.terminate())}m()}let x=y(!0);return{stats:f,request(e,t,{signal:n}={}){return c?Promise.reject(new DOMException(`World replaced`,`AbortError`)):l?Promise.reject(l):n?.aborted?Promise.reject(p()):new Promise((r,o)=>{let c={id:++s,type:e,payload:t,resolve:r,reject:o,signal:n};c.abort=()=>{if(i.has(c.id)){let e=a.indexOf(c);e>=0&&a.splice(e,1),h(c,p()),v()}},n?.addEventListener(`abort`,c.abort,{once:!0}),i.set(c.id,c),e===`chunk`&&u?(a.push(c),v()):_(x,c)})},dispose(){if(!c){c=!0;for(let e of o)e.worker.terminate();g(new DOMException(`World replaced`,`AbortError`))}}}}function Kh(e){let t=new Ot(1,1,{depthBuffer:!1}),n=new A,r=new Ye,i=new $e,o=new Qe({colorWrite:!1,depthWrite:!1,depthTest:!1,toneMapped:!1}),s=new a(i,o);s.frustumCulled=!1,n.add(s);let c=new WeakMap,l=!1;function u(e){if(c.has(e))return c.get(e);let t=new Fe(i,o,1);t.frustumCulled=!1;let n={mesh:t,idleMatrix:t.instanceMatrix,matrix:null,color:null},r=()=>{e.removeEventListener(`dispose`,r),c.delete(e),t.instanceMatrix=n.matrix??n.idleMatrix,t.instanceColor=n.color,t.dispose(),t.instanceMatrix=n.idleMatrix,t.instanceColor=null,n.matrix=null,n.color=null};return e.addEventListener(`dispose`,r),c.set(e,n),n}return{upload(a){if(l)return;let o=a.geometry,{start:c,count:d}=o.drawRange,f=e.getRenderTarget(),p=e.shadowMap.enabled,m=e.getActiveCubeFace?.()??0,h=e.getActiveMipmapLevel?.()??0,g=a.isInstancedMesh?u(a):null,_=g?.mesh??s;try{g&&(g.matrix=a.instanceMatrix,g.color=a.instanceColor,_.instanceMatrix=g.matrix,_.instanceColor=g.color,n.remove(s),n.add(_)),_.geometry=o,o.setDrawRange(0,3),e.shadowMap.enabled=!1,e.setRenderTarget(t),e.render(n,r)}finally{o.setDrawRange(c,d),_.geometry=i,g&&(_.instanceMatrix=g.idleMatrix,_.instanceColor=null,n.remove(_),n.add(s));try{e.setRenderTarget(f,m,h)}finally{e.shadowMap.enabled=p}}},dispose(){l||(l=!0,t.dispose(),i.dispose(),o.dispose())}}}var qh=Object.freeze({sheep:48,flocks:6,butterflies:16,fireflies:48,radius:150,fireflyRadius:72}),Jh=new Set([`tree`,`house`,`apartment`,`civic`,`tower`,`plaza`]),Yh=new Set([`tree`,`farmPatch`,`plaza`]),Xh=Math.PI*2,Zh=24,Qh=18,$h=[0,Math.PI,Math.PI,0];function eg(e){let t=String(e.id??`${e.kind}:${e.x.toFixed(3)}:${e.z.toFixed(3)}`),n=2166136261;for(let e=0;e<t.length;e++)n=Math.imul(n^t.charCodeAt(e),16777619);return(n>>>0)/4294967296}var tg=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)};function ng(e){let t=eg(e),n=e.kind===`tree`;return{seed:t,count:tg(t,17)>(n?.3:.62)?1+Math.floor(tg(t,29)*(n?5:3)):0}}function rg(e,t){return Array.from({length:t},(t,n)=>{let r=tg(e,103+n)*Xh,i=.4+tg(e,131+n)*1.8;return{phase:tg(e,41+n)*Xh,pace:.23+tg(e,71+n)*.32,x:Math.cos(r)*i,z:Math.sin(r)*i,drift:.12+tg(e,157+n)*.24,height:.3+tg(e,181+n)*1.65,frequency:.65+tg(e,211+n)*.8,size:.13+tg(e,239+n)*.13}})}function ig(e,t,n,r){if(e.length===r&&n>=e.at(-1).distance)return;let i={item:t,distance:n,phase:eg(t)*Xh},a=e.length;for(;a>0&&e[a-1].distance>n;)a--;e.splice(a,0,i),e.length>r&&e.pop()}function ag(e,t,n,r){let i=e.scale??1,a=Math.max(0,Math.min(e.roamRadius??.12*i,(e.radius??.7*i)-.55*i)),o=n/(18+t/Xh*10)+t/Xh*4,s=Math.floor(o),c=o-s,l=(e,n)=>{let r=e=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},i=r(e+7)*Xh,o=Math.sqrt(r(e+47))*.9*a;return(n===0?Math.sin(i):Math.cos(i))*o},u=l(s,0),d=l(s,1),f=l(s+1,0),m=l(s+1,1),h=p.clamp((c-.32)/.68,0,1),g=h*h*(3-2*h),_=Math.atan2(f-u,m-d),v=Math.atan2(u-l(s-1,0),d-l(s-1,1)),y=p.smoothstep(c,0,.32),b=Math.atan2(Math.sin(_-v),Math.cos(_-v));return r.dx=u+(f-u)*g,r.dz=d+(m-d)*g,r.heading=v+b*y,r.walking=Math.sin(h*Math.PI)**2,r.distance=Math.hypot(f-u,m-d)*g,r}function og(e,t,n,r=qh.radius){let i=[],a=[],o=[],s=!!wt(e),c=s?Ve(e,n.x,0,n.z):null,l=new q,u=s?2*e.surface.radius*Math.sin(Math.min(Math.PI,r/e.surface.radius)/2):r;for(let r of t??[]){if(r.kind!==`sheep`&&!Jh.has(r.kind)&&!Yh.has(r.kind))continue;let t=s?Ve(e,r.x,0,r.z,l).distanceToSquared(c):(r.x-n.x)**2+(r.z-n.z)**2;t>u**2||(r.kind===`sheep`&&ig(i,r,t,qh.sheep),Jh.has(r.kind)&&ig(a,r,t,qh.flocks*8),Yh.has(r.kind)&&ig(o,r,t,qh.fireflies/3))}let d=[];for(let t of a)if(d.every(n=>J(e,t.item,n.item)>12)&&d.push(t),d.length===qh.flocks)break;return{sheep:i,flocks:d,insects:o}}function sg(){let e=new $e;return e.setAttribute(`position`,new Re([0,0,0,.48,.015,.12,.25,0,.22],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function cg(e,t){let n=new ut;n.name=`local-life`,e.add(n);let r=[],i=[],a=!!wt(t);function o(e,t,i,a,o=!0){let s=new Fe(t,i,a);return s.name=e,s.count=0,s.instanceMatrix.setUsage(xe),s.frustumCulled=!1,s.castShadow=o,s.receiveShadow=o,n.add(s),r.push(s),s}let s=o(`grazing-sheep-wool`,new nt(1,1),qt.white,qh.sheep),c=o(`grazing-sheep-heads`,rm(),qt.roofBlue,qh.sheep),l=o(`grazing-sheep-feet`,new d(1,1,1),qt.metal,qh.sheep*4),u=Gt(qt.roofBlue.clone());i.push(u);let f=o(`local-swallow-bodies`,new nt(1,0).scale(.07,.065,.21),u,qh.flocks*3,!1),m=Gt(qt.roofBlue.clone());m.side=2,i.push(m);let h=o(`local-swallow-wings`,sg(),m,qh.flocks*6,!1);for(let e of[f,h]){let t=new Et(new Float32Array(e.instanceMatrix.count),1);t.setUsage(xe),e.geometry.setAttribute(`lifeVisibility`,t);let n=e.material,r=n.onBeforeCompile,i=n.customProgramCacheKey();n.transparent=!0,n.depthWrite=!1,n.forceSinglePass=!0,n.onBeforeCompile=(e,t)=>{r(e,t),e.vertexShader=`attribute float lifeVisibility; varying float faunaVisibility;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
faunaVisibility=lifeVisibility;`),e.fragmentShader=`varying float faunaVisibility;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`diffuseColor.a*=faunaVisibility;
#include <opaque_fragment>`)},n.customProgramCacheKey=()=>`${i}|fauna-fade-v1`}let g=Gt(qt.white.clone());g.side=2,i.push(g);let _=o(`meadow-butterflies`,new x(.19,.25).rotateX(-Math.PI/2).translate(.09,0,0),g,qh.butterflies*2,!1),v=new ht({transparent:!0,depthWrite:!1,blending:2,toneMapped:!1,uniforms:{night:{value:0}},vertexShader:`attribute float lifeVisibility; varying float faunaVisibility; varying vec2 vUv; varying vec3 vTint;
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
      }`});i.push(v);let y=o(`woodland-fireflies`,new x(1,1),v,qh.fireflies,!1),b=new Et(new Float32Array(qh.fireflies),1);b.setUsage(xe),y.geometry.setAttribute(`lifeVisibility`,b);for(let e=0;e<qh.fireflies;e++)y.setColorAt(e,X.gold.clone().lerp(X.white,e%3*.12));for(let e=0;e<qh.butterflies*2;e++)_.setColorAt(e,[X.gold,X.leafPink,X.lavender][Math.floor(e/2)%3]);let S=new tt,C=new tt,w=new tt,T=new gt,E=new q,D=new q,O={},k=new q(1,0,0),A=new q(0,0,1),j=new q,M=new q(1/0,0,0),N=new q(1/0,0,0),P={sheep:[],flocks:[],insects:[]},F=[],I=[],L=null,ee=-1,R=NaN,te=null,z=!1,B={},V={sheep:0,birds:0,butterflies:0,fireflies:0,instances:0,selections:0,updates:0,drawCalls:r.length};function H(e,n,r,i,o,s=!1){We(t,e.x,e.z,n,r,O),s&&(o=at(t,O.x,O.z,o)),a?Ke(t,O.x,i,O.z,o,S):S.makeRotationY(o).setPosition(O.x,i,O.z)}function ne(e,t,n,r,i,a=1,o=1,s=1,c=0,l=k){E.set(n,r,i),D.set(a,o,s),T.setFromAxisAngle(l,c),C.compose(E,T,D),w.multiplyMatrices(S,C),e.setMatrixAt(t,w)}function re(e,{focus:i={x:0,z:0},placements:o=[],revision:u=0,detailBlend:d=1,reducedMotion:m=!1,night:g=0}={}){if(n.visible=d>.001,!n.visible)return;m?(te===null&&(te=e),e=te):te=null,a?Ve(t,i.x,0,i.z,j):j.set(i.x,0,i.z);let x=j.distanceToSquared(N)>1e-10,C=o!==L||u!==ee||j.distanceToSquared(M)>36;if(C){P=og(t,o,i),F=F.filter(({item:e})=>J(t,e,i)<qh.radius+Zh);for(let n of P.flocks){if(F.length===qh.flocks)break;F.every(e=>J(t,n.item,e.item)>12)&&F.push({...n,bornAt:!Number.isFinite(R)||m||e===R?e-1:e})}I=I.filter(({item:e})=>J(t,e,i)<qh.fireflyRadius+Qh);let n=I.reduce((e,t)=>e+t.count,0);for(let r of P.insects){if(n===qh.fireflies)break;if(J(t,r.item,i)>qh.fireflyRadius-8)continue;let a=ng(r.item);if(!a.count||I.some(e=>e.key===(r.item.id??r.phase)))continue;let o=Math.min(a.count,qh.fireflies-n);n+=o,I.push({...r,...a,count:o,members:rg(a.seed,o),key:r.item.id??r.phase,bornAt:!Number.isFinite(R)||m||e===R?e-1:e})}L=o,ee=u,M.copy(j),V.selections++}if(g=p.clamp(g,0,1),v.uniforms.night.value=g,y.visible=g>.01,_.visible=g<.9,!C&&!x&&e===R&&m===z)return;R=e,z=m,N.copy(j);let w=0,T=0,E=0,O=0;for(let{item:t,phase:n}of P.sheep){let{dx:r,dz:i,heading:a,walking:o,distance:u}=ag(t,n,e,B);H(t,r,i,t.y??0,a,!0),S.scale(D.setScalar(t.scale??1)),ne(s,w,0,.31,-.035,.23,.22,.3);let d=(1-o)*(.32+Math.sin(e*.6+n)*.04);ne(c,w,0,.34-d*.08,.25,1,1,1,d);let f=u/((t.scale??1)*nm.stepLength)*Xh;for(let e=0;e<4;e++){let t=e%2?.12:-.12,n=e<2?-.14:.14,r=f+$h[e],i=Math.max(0,Math.sin(r))*nm.stepLift*o,a=Math.cos(r)*nm.stride*o;ne(l,w*4+e,t,(nm.legHeight+i)/2,n+a,nm.legWidth,nm.legHeight-i,nm.legDepth)}w++}for(let{item:n,phase:r,bornAt:a}of F){let o=(1-p.smoothstep(J(t,n,i),qh.radius-20,qh.radius+Zh))*(m?1:p.smoothstep(e-a,0,.8));for(let t=0;t<3;t++){let i=e*.18+r+t*.13,a=2.5+t*.48;H(n,Math.sin(i)*a,Math.cos(i)*a,(n.y??0)+11+Math.sin(i*.8)*.5+t*.22,Math.PI/2+i,!0),ne(f,T,0,0,0),f.geometry.attributes.lifeVisibility.setX(T,o);let s=Math.sin(e*6.2+r+t*.7)*.43;ne(h,T*2,0,0,0,1,1,1,s,A),ne(h,T*2+1,0,0,0,1,1,1,Math.PI-s,A),h.geometry.attributes.lifeVisibility.setX(T*2,o),h.geometry.attributes.lifeVisibility.setX(T*2+1,o),T++}}for(let{item:t,phase:n}of P.insects)if((t.kind===`farmPatch`||t.kind===`plaza`)&&E<qh.butterflies){let r=e*.36+n;H(t,Math.sin(r)*.7,Math.cos(r*1.3)*.6,(t.y??0)+2+Math.sin(e*1.2+n)*.22,r,!0);let i=.35+Math.sin(e*14+n)*.65;ne(_,E*2,0,0,0,1,1,1,i,A),ne(_,E*2+1,0,0,0,1,1,1,Math.PI-i,A),E++}for(let{item:n,members:r,bornAt:a}of I){let o=(1-p.smoothstep(J(t,n,i),qh.fireflyRadius-20,qh.fireflyRadius+Qh))*(m?1:p.smoothstep(e-a,0,1.2));for(let{phase:t,pace:i,x:a,z:s,drift:c,height:l,frequency:u,size:d}of r){H(n,a+Math.sin(e*i+t)*c,s+Math.sin(e*i*.73+t*1.7)*c,(n.y??0)+l+Math.sin(e*i*.81+t)*.12,0);let r=Math.max(0,Math.sin(e*u+t))**5;ne(y,O,0,0,0,d,d,d),b.setX(O++,o*(.06+.94*r))}}s.count=c.count=w,l.count=w*4,f.count=T,h.count=T*2,_.count=E*2,y.count=O;for(let e of r)e.count&&(e.instanceMatrix.needsUpdate=!0);if(T)for(let e of[f,h])e.geometry.attributes.lifeVisibility.needsUpdate=!0;O&&(b.needsUpdate=!0),Object.assign(V,{sheep:w,birds:T,butterflies:E,fireflies:O,instances:w+T+E+O,updates:V.updates+1})}function ie(){for(let e of r)e.geometry.dispose(),e.dispose();for(let e of i)e.dispose();n.removeFromParent()}return{root:n,stats:V,update:re,dispose:ie}}function lg(e,t){let n=cg(e,t),r=t.cities?.length<=32?ug(n.root,t):null,i=NaN,a=null;return{...n,update(e,t={}){n.update(e,t),r&&n.root.visible&&(t.reducedMotion?(a===null&&(a=e),e=a):a=null,e!==i&&(r.update(e),i=e))},dispose(){if(r){let e=new Set;r.root.traverse(t=>{t.geometry&&e.add(t.geometry)}),e.forEach(e=>e.dispose())}n.dispose()}}}function ug(e,t){let n=Jp(e),r=Jc(`${t.seed}-life`),i=new s;n.name=`ambience`;let a=!!wt(t),o=new tt,c=new tt,l=e=>{a&&(e.matrixAutoUpdate=!1,Ke(t,e.position.x,e.position.y,e.position.z,e.rotation.y,e.matrix),o.makeRotationFromQuaternion(e.quaternion).premultiply(c.makeRotationY(-e.rotation.y)).scale(e.scale),e.matrix.multiply(o),e.matrixWorldNeedsUpdate=!0)},u=new Fe(new d(1,.015,.055),qt.foam,64);u.name=`river-ripples`,u.instanceMatrix.setUsage(xe),u.frustumCulled=!1,n.add(u);let f=Array.from({length:t.river.length>0?64:0},()=>({s:r()*t.river.length,offset:(r()-.5)*Math.max(0,t.river.width-1.3),length:.3+r()*.7}));u.count=f.length;let p=Jp(n);p.name=`river-boat`,Kp(p,0,.14,0,.44,.24,1.08,`roofDark`),$(p,0,.24,0,.68,.12,1.55,`trim`),$(p,0,.47,-.2,.49,.39,.6,`white`),$(p,0,.51,.108,.36,.23,.025,`window`),$(p,0,.7,-.2,.63,.08,.76,`roofBlue`);for(let e of[-1,1])qp(p,Up(e*.22,.045,-.9),Up(e*.6,.045,-2),.045,`foam`);Xp(p);let m=[];if(t.river.length>0)for(let e=0;e<=t.river.length;e+=.5){let n=_l(t.river,e);dl(t,n.x,n.z,2.5)&&m.push(e)}let h=m[0]??0,g=m.at(-1)??0,_=Jp(n);_.name=`ocean-ripples`;let v=null,y=null,b=2.2;if(t.biomes?.ocean.length){for(let e=0;e<420;e++){let n=(r()-.5)*t.bounds.width,i=(r()-.5)*t.bounds.depth,a=us(t,`ocean`,n,i);if(a>b&&(b=a,y={x:n,z:i}),e%3==0&&ds(t,[`ocean`],n,i,1.1)){let e=$(_,n,t.river.y+.055,i,.6+r()*1.1,.015,.055,`foam`,.15);e.castShadow=!1}}if(y){v=Jp(n,y.x,t.river.y+.035,y.z,-.6),v.name=`sailboat`,Kp(v,0,.17,0,.43,.23,1.13,`white`),Gp(v,0,1.36,0,.035,.04,2.55,`timber`,6);let e=new $e().setFromPoints([Up(.03,2.6,0),Up(.03,.48,0),Up(.03,.48,.91)]);e.setIndex([0,1,2,2,1,0]),e.computeVertexNormals(),Wp(v,e,`trim`);let r=new $e().setFromPoints([Up(.04,2.12,-.06),Up(.04,.48,-.06),Up(.04,.48,-.81)]);r.setIndex([0,1,2,2,1,0]),r.computeVertexNormals(),Wp(v,r,`gold`),Xp(v)}Xp(_),a&&_.traverse(e=>{e.isMesh&&Ft(e.geometry,t)})}let x=-t.bounds.width*.33,S=t.bounds.depth*.2,C=pl(t,x,S)+14,w=Jp(n,x,C,S);w.name=`balloon`;let T=[[0,-2],[.55,-1.65],[1.4,-.65],[1.75,.5],[1.5,1.6],[.8,2.25],[0,2.5]].map(([e,t])=>new Y(e,t));for(let e=0;e<10;e++)Wp(w,new pt(T,1,e/10*Math.PI*2,Math.PI*2/10),e%2?`trim`:`redLight`);$(w,0,-2.9,0,.72,.55,.64,`timber`),$(w,0,-2.62,0,.8,.1,.72,`gold`);for(let e of[-.3,.3])for(let t of[-.25,.25])qp(w,Up(e,-2.65,t),Up(e,-1.65,t),.035,`timber`);Xp(w);let E=[];for(let e=0;e<5;e++){let t=Jp(n),r=Jp(t),i=Jp(t);t.name=`bird-${e+1}`,qp(r,Up(0,0,0),Up(-.48,.1,.17),.065,`white`),qp(i,Up(0,0,0),Up(.48,.1,.17),.065,`white`),Kp(t,0,0,0,.07,.07,.19,`white`),Xp(r),Xp(i),E.push({g:t,left:r,right:i})}let D=Math.max(10,...t.mountains.map(e=>e.height+3));return l(p),v&&l(v),l(w),E.forEach(({g:e})=>l(e)),{root:n,update(e){f.forEach((n,r)=>{let o=_l(t.river,(n.s+e*.18)%t.river.length),s=o.tangent.z,c=-o.tangent.x,l=o.x+s*n.offset,d=o.z+c*n.offset;i.position.set(l,t.river.y+.05,d),i.rotation.set(0,o.angle+Math.PI/2,0),i.scale.set(dl(t,l,d,.65)?n.length*Math.min(1,t.river.width):0,1,Math.min(1,t.river.width/.15)),a?Te(t,l,i.position.y,d,i.rotation.y,i.matrix).scale(i.scale):i.updateMatrix(),u.setMatrixAt(r,i.matrix)}),u.instanceMatrix.needsUpdate=!0;let n=.5-Math.cos(e*.025)*.46;if(p.visible=!1,t.river.length>0){let r=_l(t.river,h+(g-h)*n);p.position.set(r.x,t.river.y+.035,r.z),p.rotation.y=r.angle+(Math.sin(e*.025)<0?Math.PI:0),p.visible=t.river.width>=1.6&&dl(t,r.x,r.z,2.2),l(p)}v&&(v.position.y=t.river.y+.035+Math.sin(e*.8)*.025,v.rotation.z=Math.sin(e*.7)*.025,l(v)),w.position.y=C+Math.sin(e*.35)*.3,w.rotation.y=Math.sin(e*.07)*.12,l(w),E.forEach(({g:t,left:n,right:r},i)=>{let a=e*.045+i*.09;t.position.set(Math.cos(a)*13+i*.65,D+i*.25,Math.sin(a)*7-i*.75),t.rotation.y=-a,n.rotation.z=Math.sin(e*4.5+i*.7)*.35,r.rotation.z=-n.rotation.z,l(t)})}}}function dg(e){let t=e.surface.radius,n=new ut,r=new ut,i=[];n.name=r.name=`earth-ocean`;let o;for(let[s,c]of[[r,-.65],[n,-4.5]]){let r=new ae(t+c,256,128);if(r.translate(0,-t,0),!o){let t=r.attributes.position,n=new q,i={},a=new _;o=new Float32Array(t.count*3);for(let r=0;r<t.count;r++)n.fromBufferAttribute(t,r),bt(e,n,i),Du(e,i.x,i.z,a),a.toArray(o,r*3)}r.setAttribute(`color`,new z(o,3));let l=Gt(ju(new Qe({color:16777215,vertexColors:!0,toneMapped:s===n}),t),{kind:`water`});i.push(r,l),s.add(new a(r,l))}let s=new ae(t+12,128,64);s.translate(0,-t,0);let c=new ht({name:`earth-atmosphere`,uniforms:{worldNight:Ut.night},side:1,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,toneMapped:!1,vertexShader:`varying vec3 rimNormal;
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
      }`}),l=new a(s,c);l.name=`earth-atmosphere`,l.castShadow=!1,l.receiveShadow=!1,r.add(l),i.push(s,c);let u=!1;return{detail:n,map:r,dispose(){u||(u=!0,n.removeFromParent(),r.removeFromParent(),i.forEach(e=>e.dispose()))}}}function fg(e){if(!wt(e))return null;if(e.surface.complete)return dg(e);let t=e.outline,n=[],r=[],i=new ut,o=new ut;i.name=o.name=`curved-earth-section`;let s=X.ocean.clone().lerp(X.rockDark,.48).multiplyScalar(.72),c=X.ocean.clone().multiplyScalar(.76),l=new q;function u(r){let i=[],a=[];for(let n=0;n<t.length;n++){let o=t[n],u=t[(n+1)%t.length],d=Math.max(1,Math.ceil(Math.hypot(u[0]-o[0],u[1]-o[1])/8));for(let t=0;t<d;t++){let n=[t/d,(t+1)/d].map(e=>[o[0]+(u[0]-o[0])*e,o[1]+(u[1]-o[1])*e]),f=[[...n[0],r],[...n[1],r],[...n[0],-32],[...n[1],-32]];for(let t of[0,2,1,1,2,3]){let[n,r,o]=f[t];Ve(e,n,o,r,l),i.push(l.x,l.y,l.z);let u=t<2?c:s;a.push(u.r,u.g,u.b)}}}let o=new $e;return o.setAttribute(`position`,new Re(i,3)),o.setAttribute(`color`,new Re(a,3)),o.computeVertexNormals(),n.push(o),o}let d=new O(t.map(([e,t])=>new Y(e,-t))),f=new Se(d);f.rotateX(-Math.PI/2),f.translate(0,-32,0);let p=eu(f,64);f.dispose(),Ft(p,e),n.push(p);for(let[e,t]of[[i,-3.4],[o,0]]){let n=new Qe({vertexColors:!0,side:2,toneMapped:e===i}),o=new Qe({color:s,side:2,toneMapped:e===i});r.push(n,o),e.add(new a(u(t),n),new a(p,o))}let m=!1;return{detail:i,map:o,dispose(){m||(m=!0,i.removeFromParent(),o.removeFromParent(),n.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()))}}}function pg(e,t){let n=new Float32Array(1260),r=new Float32Array(420),i=71139,a=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);for(let e=0;e<r.length;e++)n[e*3]=a()*2-1,n[e*3+1]=a()*2-1,n[e*3+2]=a(),r[e]=a()>.94?3:1+a()*1.2;let o=new $e;o.setAttribute(`position`,new z(n,3)),o.setAttribute(`starSize`,new z(r,1));let s=new ht({transparent:!1,depthWrite:!1,depthTest:!1,toneMapped:!1,uniforms:{worldNight:Ut.night,worldTime:Ut.time,skyColor:{value:e.background}},vertexShader:`attribute float starSize; varying float seed; void main(){seed=position.z;gl_Position=vec4(position.xy,0.999,1.0);gl_PointSize=starSize;}`,fragmentShader:`uniform float worldNight;uniform float worldTime;uniform vec3 skyColor;varying float seed;
      void main(){float glow=1.0-smoothstep(0.12,0.5,length(gl_PointCoord-0.5));
      if(glow<0.01)discard;
      float twinkle=0.82+0.18*sin(worldTime*0.4+seed*37.0);
      vec3 star=mix(vec3(0.55,0.74,1.0),vec3(1.0,0.83,0.56),seed);
      gl_FragColor=vec4(mix(skyColor,star,glow*worldNight*twinkle*0.76),1.0);
      #include <colorspace_fragment>
      }`}),c=[e,t].map(e=>{let t=new j(o,s);return t.name=`night-stars`,t.frustumCulled=!1,t.renderOrder=-1e3,t.visible=!1,e.add(t),t});return{update(){for(let e of c)e.visible=Ut.night.value>.005},dispose(){c.forEach(e=>e.removeFromParent()),o.dispose(),s.dispose()}}}var mg=Object.freeze({height:im,radius:am,speed:2.65,sprintSpeed:4.6,jumpSpeed:4.05,gravity:11.5,stepHeight:.32,maxSlope:.78,cameraDistance:2.85,cameraHeight:.5,spawnRailClearance:4.5,fov:54,near:.045,far:140}),hg=new Set([`house`,`apartment`,`civic`,`tower`,`landmark`,`station`,`tree`,`rock`,`cactus`]),gg=Math.PI*2,_g=p.clamp,vg=1/120,yg=.58,bg=e=>e*e*(3-2*e),xg=e=>Math.atan2(Math.sin(e),Math.cos(e));function Sg(t){let n=new ut;n.name=`walking-traveller`,t.add(n);let r=new ut;r.name=`traveller-body`,n.add(r);let i=new d(1,1,1),o=new nt(1,0),s=new he(.118,.125,.055,8),c=new O;c.moveTo(.038,-.045),c.lineTo(.038,.045),c.lineTo(-.17,.1),c.lineTo(-.17,-.1),c.closePath();let l=new e(c,{depth:.065,bevelEnabled:!1,steps:1});l.rotateY(Math.PI/2),l.translate(-.0325,0,0);let u=[i,o,s,l];function f(e,t,n,r,o,s,c,l,u,d=i){let f=new a(d,u);return f.name=t,f.position.set(n,r,o),f.scale.set(s,c,l),f.castShadow=!0,f.receiveShadow=!0,e.add(f),f}f(r,`traveller-coat`,0,.385,0,.24,.26,.16,qt.teal),f(r,`traveller-face`,0,.59,.006,.115,.1,.115,qt.peach,o),f(r,`traveller-cap`,0,.6875,-.006,1,1,1,qt.redLight,s),f(r,`cap-brim`,0,.666,.085,.18,.022,.09,qt.redLight);for(let e of[-1,1])f(r,`eye`,e*.034,.603,.1,.014,.018,.015,qt.window);let p=[],m=[];for(let e of[-1,1]){let t=new ut;t.name=e<0?`right-arm`:`left-arm`,t.position.set(e*.146,.48,0),t.rotation.order=`YXZ`,r.add(t),p.push(t),f(t,`sleeve`,0,-.06,0,.066,.15,.1,qt.teal),f(t,`mitten`,0,-.145,.008,.045,.045,.046,qt.peach,o);let i=new ut;i.name=e<0?`right-leg`:`left-leg`,i.position.set(e*.055,.29,0),n.add(i),m.push(i),f(i,`trousers`,0,-.14,0,.075,.3,.1,qt.roofBlue),f(i,`boot`,0,-.285,.015,.09,.08,.13,qt.timber)}let h=p[0],g=new ut;g.name=`traveller-axe`,g.position.set(0,-.145,.008),g.scale.setScalar(.82),h.add(g),f(g,`axe-handle`,0,-.105,0,.037,.33,.041,qt.timber),f(g,`axe-head`,0,-.225,0,1,1,1,qt.rail,l);let _=new Qe({color:1522743,transparent:!0,opacity:.16,depthWrite:!1}),v=new ee(.18,16);u.push(v);let y=new a(v,_);return y.matrixAutoUpdate=!1,y.name=`traveller-contact-shadow`,t.add(y),{root:n,body:r,arms:p,legs:m,rightArm:h,axe:g,shadow:y,dispose(){u.forEach(e=>e.dispose()),_.dispose()}}}function Cg(e,t,{getCollisionPlacements:n=()=>t.placements??[],getTerrainMeshes:r=()=>[],isReadyAt:i=()=>!0}={}){let a=new ut;a.name=`walking-player`,a.visible=!1,e.add(a);let o=Sg(a),s=new me(mg.fov,1,mg.near,mg.far);s.name=`walking-camera`;let c={x:0,y:0,z:0},l={x:0,y:0,z:0},u={x:0,y:0,z:0},d={x:0,y:0,z:0},f=new tt,m=new tt,h=new tt().makeRotationX(-Math.PI/2),g=new q,_=new q,v=new q,y=new q,b=new q,x=new q,S=new q,C=new ne,w=[];C.firstHitOnly=!0;let T={},E={},D={},O={},k={},A=new q,j=xo(t.lines??[]),M={},N={},P=new q,F=new we,I=!1,L=!1,ee=!1,R=!0,te=0,z=0,B=Math.PI/10,V=!1,H=0,re=0,ie=0,ae=0,oe=yg,U=!1,se=[],ce=null,le={x:1/0,y:0,z:1/0},ue=[],de=null,fe={x:1/0,z:1/0},pe=0,he=0,ge=0,_e=0,ve=0,ye=mg.cameraDistance,be={steps:0,swings:0,blocked:0,raycasts:0,obstacles:0,meshes:0,meshSelections:0};function xe(e=!1){let i=r()??[];(e||i!==ce||!Number.isFinite(le.x)||J(t,c,le)>2||Math.abs(c.y-le.y)>2)&&(ce=i,le={...c},Ve(t,c.x,c.y,c.z,P),se=i.filter(e=>{let t=e.geometry;return t?(e.isInstancedMesh&&!e.boundingSphere&&e.computeBoundingSphere(),t.boundingSphere||t.computeBoundingSphere(),F.copy(e.boundingSphere??t.boundingSphere).applyMatrix4(e.matrixWorld),F.distanceToPoint(P)<=mg.cameraDistance+4):!1}),be.meshes=se.length,be.meshSelections++);let a=n()??[];if(e||a!==de||!Number.isFinite(fe.x)||J(t,c,fe)>6){de=a,fe={x:c.x,z:c.z};let e=a.concat((t.stations??[]).map(e=>({...e,kind:`station`}))),n=new Set;ue=e.filter(e=>{if(!hg.has(e.kind??(e.width&&e.depth?`station`:``)))return!1;let r=e.id??e;return!n.has(r)&&(n.add(r),J(t,e,c)<26+(e.radius??4))}),be.obstacles=ue.length}}function Se(e,n=c.y){for(let r of ue){let i=r.kind??`station`,a=r.scale??1;if(n>(r.y??0)+(r.height??(i===`tree`?2.7:i===`rock`?.6:i===`cactus`?2.4:8))*a)continue;K(t,r,e,T);let o;if(i===`tree`?o=.14*a:i===`cactus`?o=.31*a:i===`rock`?o=.59*a:i===`landmark`&&(o=1.35*a),o!==void 0){if(Math.hypot(T.x,T.z)<o+mg.radius)return!0;continue}let s=dt(t,r.x,r.z,r.rotation??0),c=Math.cos(s),l=Math.sin(s),u=T.x*c-T.z*l,d=T.x*l+T.z*c,f=((r.variant??0)%4==1?1.62:1.82)*a,p=((r.variant??0)%4==1?1.9:1.72)*a;if(r.buildingType){if(r.collisionBoxes){for(let e of r.collisionBoxes)if(Math.abs(u-e.x*a)<e.width*a/2+mg.radius&&Math.abs(d-e.z*a)<e.depth*a/2+mg.radius)return!0;continue}f=(r.collisionWidth??r.width)*a,p=(r.collisionDepth??r.depth)*a,d-=(r.collisionOffsetZ??0)*a}else i===`station`?(u+=1.45*a,d+=.42*a,f=2.62*a,p=1.42*a):i===`apartment`?(f=2.52*a,p=2.48*a):i===`civic`?(d+=.15*a,f=3.35*a,p=2.72*a):i===`tower`&&(f=2.32*a,p=2.48*a);if(Math.abs(u)<f/2+mg.radius&&Math.abs(d)<p/2+mg.radius)return!0}return!1}function W(e,t,n){return se.length?(C.set(e,t),C.near=.018,C.far=n,be.raycasts++,w.length=0,C.intersectObjects(se,!1,w),w[0]??null):null}function Ce(e,n=void 0){let r=ml(t,e.x,e.z);if(n!==void 0&&se.length){Ve(t,e.x,n+mg.stepHeight+.06,e.z,_),rt(t,e.x,e.z,g),b.copy(g).negate();let r=W(_,b,mg.stepHeight+1.7);if(r){let e=n+mg.stepHeight+.06-r.distance,t=r.face?.normal,i=t?t.dot(g):1;if(e>-.34&&i>.51)return{height:e,type:`mesh`,slope:i}}}return r}function Te(e,{height:n=c.y,spawn:r=!1}={}){let i=Ce(e,r?void 0:n);if(!Number.isFinite(i.height)||[`outside`,`ocean`,`water`].includes(i.type)||i.height<-.3||Se(e,n))return null;if(r)for(let[n,r]of[[.24,0],[-.24,0],[0,.24],[0,-.24]]){We(t,e.x,e.z,n,r,D);let a=ml(t,D.x,D.z);if([`outside`,`ocean`,`water`].includes(a.type)||Math.abs(a.height-i.height)>.24*mg.maxSlope)return null}return i}function Ee(e={x:0,z:0}){if(ee)return null;let n={x:Number.isFinite(e.x)?e.x:0,z:Number.isFinite(e.z)?e.z:0},r={...c};c.x=n.x,c.z=n.z,xe(!0);let i=[n,...[...t.cities??[]].sort((e,r)=>J(t,e,n)-J(t,r,n)).slice(0,3)],a=null;for(let e of i){c.x=e.x,c.z=e.z,xe(!0);for(let n=0;n<=12&&!a;n++){let r=n?Math.max(8,Math.ceil(n*5)):1;for(let i=0;i<r;i++){let o=i/r*gg+.31*n;if(We(t,e.x,e.z,Math.sin(o)*n*.8,Math.cos(o)*n*.8,E),Oc(t,j,E.x,E.z,ct(t,E.x,E.z,mg.spawnRailClearance)).some(({a:e,b:n})=>(K(t,E,e,M),K(t,E,n,N),Yc(0,0,M,N)<mg.spawnRailClearance)))continue;let s=Te(E,{spawn:!0,height:ml(t,E.x,E.z).height});if(s){a={x:E.x,y:s.height+.035,z:E.z};break}}}if(a)break}return Object.assign(c,r),xe(!0),a}function G(e,n,r=0){te+=xg(re-te)*Math.min(1,e*15);let i=at(t,u.x,u.z,te);Ke(t,u.x,u.y,u.z,i,f),f.decompose(o.root.position,o.root.quaternion,o.root.scale);let a=_g(n/.7,0,1),s=p.smoothstep(n,mg.speed*.97,mg.sprintSpeed*.96);ie+=(s-ie)*(e>0?1-Math.exp(-12*e):1),R&&(H+=r*gg/p.lerp(1.05,1.42,ie)),o.body.position.y=R?Math.abs(Math.sin(H))*.008*a:0,o.body.rotation.x=R?ie*a*.07:0,o.body.rotation.z=R?Math.sin(H)*a*.025:0,o.body.rotation.y=0;for(let e=0;e<2;e++){let t=H+e*Math.PI,n=R?Math.sin(t)*(.22+ie*.1)*a:e===0?-.16:.16,r=R?Math.max(0,Math.cos(t))*(.024+ie*.018)*a:.025,i=o.legs[e];i.rotation.x=n,i.position.y=-.035+.325*Math.cos(n)+(Math.sin(n)>0?.08:.05)*Math.abs(Math.sin(n))+r,o.arms[e].rotation.y=0,o.arms[e].position.z=0,o.arms[e].rotation.x=R?-Math.sin(t)*(e===0?.1:.24)*a:-.2,o.arms[e].rotation.z=e===0?-.1:.06}if(o.axe.rotation.y=0,oe<yg){let e=oe/yg,t,n;e<.25?(t=bg(e/.25),n=-.95*t):e<.65?(t=1,n=p.lerp(-.95,1.15,bg((e-.25)/.4))):(t=1-bg((e-.65)/.35),n=1.15*t),o.rightArm.rotation.set(-1.27*t,n,-.1*(1-t)),o.rightArm.position.z=.075*t,o.axe.rotation.y=Math.PI/2*t,o.body.rotation.y=n*.08}Ke(t,u.x,Math.min(u.y,_e)+.036,u.z,i,f),o.shadow.matrix.copy(f).multiply(h),o.shadow.matrixWorldNeedsUpdate=!0,o.shadow.material.opacity=.16/(1+Math.max(0,u.y-_e)*1.6)}function De(e=0,n=!1){Ne(t,u.x,u.z,m);let r=m.elements;g.set(r[4],r[5],r[6]),S.set(r[0],r[1],r[2]),x.set(r[8],r[9],r[10]),ve=n||e<=0?u.y:p.lerp(ve,u.y,1-Math.exp(-14*e)),v.copy(Ve(t,u.x,ve+mg.cameraHeight,u.z,A));let i=mg.cameraDistance,a=Math.cos(B)*i;y.copy(v).addScaledVector(S,-Math.sin(z)*a).addScaledVector(x,-Math.cos(z)*a).addScaledVector(g,Math.sin(B)*i),b.subVectors(y,v);let o=b.length();b.divideScalar(o);let c=W(v,b,o+.14),l=c?Math.max(.32,c.distance-.18):o;ye=n||e<=0||l<ye?l:p.lerp(ye,l,1-Math.exp(-15*e)),s.position.copy(v).addScaledVector(b,ye),s.up.copy(g),s.lookAt(v),s.updateMatrixWorld(!0)}function Oe(){let e=_g(pe/vg,0,1);K(t,l,c,k),We(t,l.x,l.z,k.x*e,k.z*e,u),u.y=p.lerp(l.y,c.y,e),_e=p.lerp(ge,he,e)}function ke(e,n){if(!se.length)return!1;Ve(t,c.x,n+.43,c.z,_),Ve(t,e.x,n+.43,e.z,A),b.subVectors(A,_);let r=b.length();if(r<1e-8)return!1;b.divideScalar(r);let i=W(_,b,r+mg.radius);return!!(i&&i.distance<r+mg.radius)}function Ae(e,n,r){if(We(t,c.x,c.z,e,n,E),!i(E.x,E.z))return be.blocked++,!1;let a=Te(E);return!a||a.height>c.y+Math.max(mg.stepHeight,Math.hypot(e,n)*mg.maxSlope)||ke(E,c.y)||a.type===`mesh`&&a.slope<1/Math.sqrt(1+mg.maxSlope**2)||a.type===`mountain`&&a.height-ml(t,c.x,c.z).height>Math.hypot(e,n)*mg.maxSlope?(be.blocked++,!1):(c.x=E.x,c.z=E.z,he=a.height,R&&c.y-a.height<.55?c.y=a.height+.035:R&&=!1,!0)}function je(e,n={}){if(!I||ee)return;e=_g(Number.isFinite(e)?e:0,0,.12),xe(),z=xg(z+(Number.isFinite(n.lookX)?n.lookX:0)),B=_g(B+(Number.isFinite(n.lookY)?n.lookY:0),Math.PI/18,Math.PI*65/180);let r=!!n.jump;r&&!V&&R&&(d.y=mg.jumpSpeed,R=!1),V=r;let i=!!n.swing;i&&!U&&oe>=yg&&(oe=0,re=z,be.swings++),U=i,oe=Math.min(yg,oe+e);let a=_g(n.forward??0,-1,1),o=_g(n.right??0,-1,1),s=Math.hypot(a,o);s>1&&(a/=s,o/=s);let f=n.sprint?mg.sprintSpeed:mg.speed,p=(Math.sin(z)*a-Math.cos(z)*o)*f,m=(Math.cos(z)*a+Math.sin(z)*o)*f;for(pe+=e,O.x=u.x,O.z=u.z;pe>=.008333333332333333;){let e=vg;pe-=e,be.steps++,Object.assign(l,c),ge=he;let t=1-Math.exp(-18*e);d.x+=(p-d.x)*t,d.z+=(m-d.z)*t;let n=d.x*e,r=d.z*e;if(Math.hypot(n,r)>1e-6&&(Ae(n,r,e)||(Math.abs(n)>1e-8&&Ae(n,0,e),Math.abs(r)>1e-8&&Ae(0,r,e)),re=Math.atan2(d.x,d.z)),!R){d.y-=mg.gravity*e,c.y+=d.y*e;let t=Ce(c,c.y);he=t.height,c.y<=t.height+.035&&d.y<=0&&(c.y=t.height+.035,d.y=0,R=!0)}}Oe(),oe<yg&&(re=z);let h=J(t,O,u),g=e>0?h/e:0;ae+=(g-ae)*(1-Math.exp(-24*e)),G(e,ae,h),De(e)}return{root:a,camera:s,position:c,renderPosition:u,cameraTarget:v,velocity:d,stats:be,prepareSpawn:Ee,update:je,get swinging(){return oe<yg},get active(){return I},get initialized(){return L},get grounded(){return R},get heading(){return z},get pitch(){return B},enter(e,t=0,{respawn:n=!1}={}){if(ee)return!1;if(L&&!n)return I=!0,a.visible=!0,xe(!0),G(0,0),De(0,!0),!0;let r=Ee(e);return r?(Object.assign(c,r),d.x=d.y=d.z=0,te=z=re=Number.isFinite(t)?t:0,Object.assign(l,r),Object.assign(u,r),he=ge=_e=r.y-.035,B=Math.PI/10,pe=0,V=!1,ae=ie=H=0,oe=yg,U=!1,R=!0,I=L=!0,a.visible=!0,xe(!0),G(0,0),De(0,!0),!0):!1},exit(){return I=!1,a.visible=!1,ae=ie=0,oe=yg,U=!1,G(0,0),d.x=d.y=d.z=0,V=!1,{...c}},resize(e){s.aspect=Math.max(.01,Number.isFinite(e)?e:1),s.updateProjectionMatrix()},dispose(){ee||(ee=!0,I=!1,oe=yg,U=!1,a.removeFromParent(),o.dispose(),a.clear())}}}function wg({crop:e=!1}={}){let t=[],n=[],r=[],i=[],a=e?7:12;for(let o=0;o<a;o++){let s=o*2.39996323,c=Math.sqrt((o+.5)/a)*.46,l=Math.cos(s)*c,u=Math.sin(s)*c,d=s+o*.73,f=Math.cos(d),p=Math.sin(d),m=.7+(Math.sin(o*13.73)*.5+.5)*.3,h=e?.065:.07,g=.13+o*7%5*.027,_=t.length/3,v=[[-h,0,0],[h,0,0],[-h*.55,m*.56,g*.34],[h*.55,m*.56,g*.34],[0,m,g]];for(let[e,[r,a,s]]of v.entries())i.push(o*2,o*2+1,e===4?.5:e%2),t.push(l+r*f-s*p,a,u+r*p+s*f),n.push(-p*.35,.93675,f*.35);r.push(_,_+1,_+2,_+1,_+3,_+2,_+2,_+3,_+4)}let o=new $e;return o.setAttribute(`position`,new Re(t,3)),o.setAttribute(`normal`,new Re(n,3)),e||o.setAttribute(`grassRoot`,new Re(i,3)),o.setIndex(r),o}var Tg=Object.freeze((()=>{let e=wg(),t=e.attributes.position,n=[];for(let e=0;e<12;e++)for(let r=0;r<2;r++)n.push([t.getX(e*5+r),t.getZ(e*5+r)]);return e.dispose(),n})());function Eg(e,{focus:t,time:n,player:r,visibility:i={value:1}},a){let o=e.onBeforeCompile,s=e.customProgramCacheKey(),c=a===`grass`||a===`crops`||a===`flowers`;return e.onBeforeCompile=(e,s)=>{o(e,s),e.uniforms.walkFocus=t,e.uniforms.walkTime=n,e.uniforms.walkPlayer=r,e.uniforms.walkVisibility=i,e.vertexShader=`uniform vec3 walkFocus; uniform vec3 walkPlayer; uniform float walkTime; uniform float walkVisibility;
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
      transformed *= detailCoverage;`),a===`flowers`&&(e.vertexShader=e.vertexShader.replace(`#include <color_vertex>`,on.color_vertex.replace(`vColor.rgb *= instanceColor.rgb;`,`vColor.rgb *= mix(vec3(1.0), instanceColor.rgb, flowerPetal);`))),e.fragmentShader=`varying float walkDistance; varying float bladeHeight;
`+e.fragmentShader,c&&(e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
        diffuseColor.rgb *= mix(0.84, 1.08, clamp(bladeHeight, 0.0, 1.0));`),e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
        normal = normalize(vNormal);`))},e.customProgramCacheKey=()=>`${s}|walking-vegetation-v5:${a}`,e}function Dg(){let e=[],t=[],n=[],r=[],i=(r,i,a=0)=>{let o=e.length/3;return e.push(...r),t.push(i.r,i.g,i.b),n.push(a),o},a=(e,t,n,a,o=0)=>r.push(i(e,a,o),i(n,a,o),i(t,a,o)),o=[],s=[];for(let e=0;e<3;e++){let t=e*Math.PI*2/3;o.push([Math.cos(t)*.023,0,Math.sin(t)*.023]),s.push([.045+Math.cos(t)*.018,.94,Math.sin(t)*.018])}for(let e=0;e<3;e++){let t=(e+1)%3;a(o[e],o[t],s[e],X.leaf),a(o[t],s[t],s[e],X.leaf)}for(let[e,t]of[[.45,.28],[3.9,.48]]){let n=Math.cos(e),r=Math.sin(e),i=(e,i,a)=>[.045*t/.94+e*n-a*r,i,e*r+a*n],o=i(0,t,0),s=i(.14,t+.055,-.06),c=i(.32,t+.17,0),l=i(.14,t+.055,.06),u=i(.15,t+.1,0);a(o,s,u,X.leaf),a(s,c,u,X.leafLight),a(o,u,l,X.leaf),a(u,c,l,X.leafLight)}let c=.045;for(let e=0;e<5;e++){let t=e*Math.PI*2/5,n=Math.cos(t),r=Math.sin(t),i=(e,t,i)=>[c+e*n-i*r,t,e*r+i*n],o=i(.065,.89,0),s=i(.29,.905,-.14),l=i(.48,.965,0),u=i(.29,.905,.14),d=i(.29,.9550000000000001,0);a(o,s,d,X.white,1),a(s,l,d,X.white,1),a(o,d,u,X.white,1),a(d,l,u,X.white,1);let f=(e+1)*Math.PI*2/5;a([c,.99,0],[c+Math.cos(t)*.12,.91,Math.sin(t)*.12],[c+Math.cos(f)*.12,.91,Math.sin(f)*.12],X.gold)}let l=new $e;return l.setAttribute(`position`,new Re(e,3)),l.setAttribute(`color`,new Re(t,3)),l.setAttribute(`flowerPetal`,new Re(n,1)),l.setIndex(r),l.computeVertexNormals(),l}var Og=[],kg=new WeakMap,Ag=new WeakMap,jg=e=>Math.max(0,Math.min(1,e)),Mg=(e,t,n)=>{let r=jg((n-e)/(t-e));return r*r*(3-2*r)},Ng=e=>e.range?.bounds??po(e.x,e.z,e.radius);function Pg(e,t,n){let r=t-e.c.x,i=n-e.c.z,a=e.ux*r+e.uz*i,o=e.vx*r+e.vz*i;return a>=-1e-8&&o>=-1e-8&&a+o<=1+1e-8}function Fg(e,t,n){return Math.max(0,e.c.y+(t-e.c.x)*e.slopeX+(n-e.c.z)*e.slopeZ)}function Ig(e){if(kg.has(e))return kg.get(e);let{vertices:t,surfaceTriangles:n}=Ps(e),r=new Map,i=e.range?.cellSize??Math.max(1,e.radius/5);for(let e of n){let[n,a,o]=e.map(e=>t[e]),s=(a.z-o.z)*(n.x-o.x)+(o.x-a.x)*(n.z-o.z);if(Math.abs(s)<1e-12)continue;let c=(a.z-o.z)/s,l=(o.x-a.x)/s,u=(o.z-n.z)/s,d=(n.x-o.x)/s,f=c*(n.y-o.y)+u*(a.y-o.y),p=l*(n.y-o.y)+d*(a.y-o.y),m=1/Math.hypot(f,1,p),h={c:o,ux:c,uz:l,vx:u,vz:d,slopeX:f,slopeZ:p,normal:{x:-f*m,y:m,z:-p*m}};for(let e=Math.floor(Math.min(n.x,a.x,o.x)/i);e<=Math.floor(Math.max(n.x,a.x,o.x)/i);e++)for(let t=Math.floor(Math.min(n.z,a.z,o.z)/i);t<=Math.floor(Math.max(n.z,a.z,o.z)/i);t++){let n=`${e}:${t}`;r.has(n)||r.set(n,[]),r.get(n).push(h)}}let a={size:i,buckets:r};return kg.set(e,a),a}function Lg(e,t,n){let{size:r,buckets:i}=Ig(e);return(i.get(`${Math.floor(t/r)}:${Math.floor(n/r)}`)??Og).find(e=>Pg(e,t,n))}function Rg(e){if(Ag.has(e))return Ag.get(e);let t=new vo(e.mountains??Og,Ng),n=new _,r=new _;function i(e,n){let r=t.query(po(e,n,.5)),i=0,a=null,o=null;for(let t of r){let r=Lg(t,e,n);if(!r)continue;let s=Fg(r,e,n);s>i&&(i=s,a=r,o=t)}return{height:i,face:a,mountain:o,nearby:r}}function a(e,t,n){if(!n?.nearby.length)return 0;if(n.nearby.length===1&&n.face&&Pg(n.face,e,t))return Fg(n.face,e,t);let r=0;for(let i of n.nearby){let n=Lg(i,e,t);n&&(r=Math.max(r,Fg(n,e,t)))}return r}function o(t,i,a){Ql(e.terrainSource??e,t,i,{target:n});let o=Mg(-.15,.065,n.g-n.r),s=1;if(a.mountain){let r=a.mountain,o=a.height/r.height,c=a.face.normal,l=Mg(.9,.48,c.y),u=Mg(.53,.84,o);s=1-Math.max(l,u)*Mg(.015,.12,o),s*=1-Mg(Is(r,t,i)-.8,Is(r,t,i),a.height),km(e,r,{x:t,y:a.height,z:i},c,{target:n})}let c=(.045+.955*o)*s;return r.copy(n).lerp(o>.5?X.grass:X.soilLight,.18).multiplyScalar(1.02),{density:c,heightScale:(.42+.58*o)*(.35+.65*s),color:r.toArray()}}let s={sample:i,heightAt:a,vegetation:o};return Ag.set(e,s),s}var zg=Object.freeze({radius:23,padding:6,refreshDistance:5,grass:9600,flowers:100,pebbles:100,crops:2800}),Bg=Math.PI*2,Vg=[],Hg=[`grass`,`flowers`,`pebbles`,`crops`],Ug={grass:[`grass`,`grassLight`,`meadow`],flowers:[`white`,`gold`,`lavender`],pebbles:[`gravel`,`rockLight`,`soilLight`],crops:[`wheat`]};function Wg(e){let t=2166136261;for(let n of String(e))t=Math.imul(t^n.charCodeAt(0),16777619);return t>>>0}function Gg(e,t,{a:n,b:r}){let i=r.x-n.x,a=r.z-n.z,o=p.clamp(((e-n.x)*i+(t-n.z)*a)/(i*i+a*a||1),0,1);return Math.hypot(e-n.x-i*o,t-n.z-a*o)}function Kg(e,t){let n=e;for(let r=0;r<e.length&&n.length>=3;r++){let i=e[r],a=e[(r+1)%e.length],o=a[0]-i[0],s=a[1]-i[1],c=Math.hypot(o,s);if(c<1e-7)continue;let l=s/c,u=-o/c,d=(i[0]*s-i[1]*o)/c-t,f=[];for(let e=0;e<n.length;e++){let t=n[e],r=n[(e+1)%n.length],i=t[0]*l+t[1]*u-d,a=r[0]*l+r[1]*u-d;if(i<=0&&f.push(t),i<0!=a<0){let e=i/(i-a);f.push([t[0]+(r[0]-t[0])*e,t[1]+(r[1]-t[1])*e])}}n=f}return n}function qg(e){return String(e.id??`${e.kind}:${e.x}:${e.z}`)}function Jg(e){return e.radius??(e.kind===`farm`?Math.hypot(e.width??3,e.depth??4)*(e.scale??1)/2:(e.kind===`tree`?.85:2.2)*(e.scale??1))}function Yg(e,t,n,r=.4){let i=e.scale??1,a=(t-e.x)/i,o=(n-e.z)/i,s=e.rotation??0,c=a*Math.cos(s)-o*Math.sin(s),l=a*Math.sin(s)+o*Math.cos(s),u=r/i;return e.kind===`tree`?Math.hypot(a,o)<.22+u:e.buildingType&&e.width&&e.depth?Math.abs(c)<e.width/2+u&&Math.abs(l)<e.depth/2+u:e.kind===`farm`?(e.parcels??[{x:0,z:0,width:e.width??3,depth:e.depth??4}]).some(e=>nc(tc(e),c-(e.x??0),l-(e.z??0),-u)):e.kind===`house`?Math.abs(c)<1.1+u&&Math.abs(l)<1.1+u:e.kind===`station`?Math.abs(c)<3.2+u&&Math.abs(l)<1.2+u:e.kind===`person`||e.kind===`sheep`?!1:Math.hypot(t-e.x,n-e.z)<Jg(e)+r}function Xg(e,t,n,{cityStreets:r=e.cityStreets??Vg,groundCache:i}={}){let a=Object.fromEntries(Hg.map(e=>[e,[]])),o=zg.radius+zg.padding,s=(t??Vg).filter(t=>J(e,t,n)<o+Jg(t)).sort((t,r)=>J(e,t,n)-J(e,r,n)||qg(t).localeCompare(qg(r)));function c(e,t,n,r,i,o,s,c,l,u=0,d){let f={id:n,anchor:t,x:r,y:i,z:o,sx:s,sy:c,sz:l,rotation:u,color:d??Ug[e][Wg(n)%Ug[e].length]};return a[e].length<zg[e]&&a[e].push(f),f}for(let t of s){let r=qg(t);if(t.kind===`farm`&&t.width&&t.depth){let i=K(e,t,n),s=t.rotation??0,l=t.scale??1,u={x:(i.x*Math.cos(s)-i.z*Math.sin(s))/l,z:(i.x*Math.sin(s)+i.z*Math.cos(s))/l},d=o/l;for(let[e,n]of(t.parcels??[{x:0,z:0,width:t.width,depth:t.depth,variant:t.variant}]).entries()){let i=n.crop??[`wheat`,`vegetables`,`lavender`][((n.variant??t.variant??0)%3+3)%3];if(![`wheat`,`lavender`,`pasture`,`vegetables`,`orchard`].includes(i))continue;let o=tc(n),s=$s(ec(n,t.variant)),l=rc(o,n.feature,n.featurePosition,s),f=n.rowsAngle??(n.rowsAlong===`x`?0:Math.PI/2),p=Math.cos(f),m=Math.sin(f),h=i===`pasture`||i===`orchard`;if(a[h?`grass`:`crops`].length>=zg[h?`grass`:`crops`])continue;let g=Math.max(.4,n.rowPitch??(i===`vegetables`?.8:1.35)),_=Math.hypot(n.width,n.depth)/2,v=h?.55:.27,y=Kg(o,.25);if(y.length<3)continue;let b=u.x-(n.x??0),x=u.z-(n.z??0),S=(e,t)=>(e-b)**2+(t-x)**2<d*d;if(h){let i=Math.ceil(Math.max(-n.width/2,b-d)/v),s=Math.floor(Math.min(n.width/2,b+d)/v),u=Math.ceil(Math.max(-n.depth/2,x-d)/v),f=Math.floor(Math.min(n.depth/2,x+d)/v);for(let d=i;d<=s;d++)for(let i=u;i<=f&&!(a.grass.length>=zg.grass);i++){let a=`${r}:parcel:${e}:sward:${d}:${i}`,s=$s(Wg(a)),u=(d+(s()-.5)*.45)*v,f=(i+(s()-.5)*.45)*v;!S(u,f)||!nc(o,u,f,.33)||l&&Math.hypot(u-l.center[0],f-l.center[1])<l.radius+.33||c(`grass`,t,a,(n.x??0)+u,.055,(n.z??0)+f,.57,.13+s()*.07,.57,s()*Bg,`meadow`)}continue}let C=y.map(([e,t])=>-e*m+t*p),w=Math.min(...C),T=Math.max(...C),E=Math.max(1,Math.min(18,Math.round((T-w)/g))),D=(T-w)/E,O=0,k=b*p+x*m,A=-b*m+x*p,j=Array.from({length:E},(e,t)=>t).sort((e,t)=>Math.abs(w+(e+.5)*D-A)-Math.abs(w+(t+.5)*D-A)),M=Math.ceil(Math.max(-_,k-d)/v)*v,N=Math.min(_,k+d),P=[];for(let e=M;e<=N;e+=v)P.push(e);P.sort((e,t)=>Math.abs(e-k)-Math.abs(t-k));for(let s of j)for(let u of P){if(++O>3600||a.crops.length>=zg.crops)break;let d=w+(s+.5)*D,f=u*p-d*m,h=u*m+d*p;if(!S(f,h)||!nc(o,f,h,.3)||l&&Math.hypot(f-l.center[0],h-l.center[1])<l.radius+.3||l&&Math.abs(d-(-l.center[0]*m+l.center[1]*p))<l.radius+D*.25&&Math.abs(u-(l.center[0]*p+l.center[1]*m))<l.radius+.12)continue;let g=`${r}:parcel:${e}:${u.toFixed(3)}:${d.toFixed(3)}`,_=$s(Wg(g)),v=i===`vegetables`?.12+_()*.07:i===`lavender`?.24+_()*.06:.32+_()*.09;c(`crops`,t,g,(n.x??0)+f,.06,(n.z??0)+h,.32,v,.32,_()*Bg,i===`lavender`?`lavender`:i===`vegetables`?`leafLight`:`wheat`)}}}}if(!wt(e)&&e.biomes){let t=new yo(5);for(let n of[...s,...e.stations??[]])n.kind!==`sheep`&&t.insert(n,po(n.x,n.z,Jg(n)+.3));let l=xo(e.lines??Vg),u=xo(r),d=.6,f=Rg(e),p=(e,t,n)=>n.nearby.length&&l.query(po(e,t,2.5)).some(r=>{if(Gg(e,t,r)>=2.5)return!1;let i=r.line,a=i.distances?.[r.index]??0,o=i.distances?.[r.index+1]??i.length;return(i.cuts??i.tunnels??Vg).some(e=>!n.nearby.some(t=>t.id===e.mountainId)||o<(e.cutStart??e.start)-2||a>(e.cutEnd??e.end)+2?!1:!(i.tunnels??Vg).some(t=>t.mountainId===e.mountainId&&t.start<e.end&&t.end>e.start)||n.height<Math.max(r.a.y??.42,r.b.y??.42)+3.6)}),m=Math.round(n.x/zg.refreshDistance)*zg.refreshDistance,h=Math.round(n.z/zg.refreshDistance)*zg.refreshDistance,g=(n,r)=>{let i=ls(e,n,r);if(![`plains`,`forest`,`farmland`,`desert`,`mountain`].includes(i)||!ds(e,[`plains`,`forest`,`farmland`,`desert`,`mountain`],n,r,.35)||bc(e,n,r)<1.1||t.query(po(n,r,.4)).some(e=>Yg(e,n,r))||l.nearest(n,r,e=>Gg(n,r,e),1.34)<1.34||u.nearest(n,r,e=>Gg(n,r,e)-(e.line.width??1)/2,.4,1.5)<.4)return null;let a=f.sample(n,r);return p(n,r,a)?null:a},_=[];for(let t=Math.floor((m-o)/d);t<=Math.ceil((m+o)/d);t++)for(let r=Math.floor((h-o)/d);r<=Math.ceil((h+o)/d);r++){let i=`ground:${e.seed??0}:${t}:${r}`,a=$s(Wg(i)),s=(t+.3+a()*.4)*d,c=(r+.3+a()*.4)*d,l=(s-n.x)**2+(c-n.z)**2;l>o*o||_.push({id:i,r:a,x:s,z:c,distance:l})}_.sort((e,t)=>e.distance-t.distance);for(let{id:e,r:t,x:n,z:r}of _){if(i?.has(e)){for(let[t,n]of i.get(e)??Vg)a[t].length<zg[t]&&a[t].push(n);continue}i?.set(e,null);let o=[],s=(e,...t)=>{let n=c(e,...t);o.push([e,n])},l=g(n,r);if(!l)continue;let u=f.vegetation(n,r,l),d=t(),p={x:n,y:l.height-.006,z:r,rotation:0,scale:1},m=.5+.5*Math.sin(n*.21+Math.sin(r*.17))*Math.cos(r*.25-n*.08);if(d<u.density){let i=(.18+m*.09+t()*.04)*u.heightScale,a=t()*Bg,s=c(`grass`,p,e,0,0,0,.65,i,.65,a,`grass`);if(s.colorRGB=u.color,o.push([`grass`,s]),l.nearby.length){let e=Math.cos(a),t=Math.sin(a);s.rootHeights=Tg.map(([i,a])=>f.heightAt(n+(i*e+a*t)*s.sx,r+(-i*t+a*e)*s.sz,l)-l.height)}}else d>.986&&u.density<.3&&s(`pebbles`,p,`${e}:stone`,0,.025,0,.07+t()*.08,.035+t()*.03,.07,t()*Bg,`desertRock`);i&&i.set(e,o)}let v=5.8,y=[];for(let t=Math.floor((m-o-1)/v);t<=Math.ceil((m+o+1)/v);t++)for(let r=Math.floor((h-o-1)/v);r<=Math.ceil((h+o+1)/v);r++){let i=`ground:${e.seed??0}:flowers:${t}:${r}`,a=$s(Wg(i));if(a()>.46)continue;let s=(t+.14+a()*.72)*v,c=(r+.14+a()*.72)*v,l=(s-n.x)**2+(c-n.z)**2;l>(o+1)**2||y.push({id:i,r:a,x:s,z:c,distance:l})}y.sort((e,t)=>e.distance-t.distance||e.id.localeCompare(t.id));for(let e of y){if(a.flowers.length>zg.flowers-3)break;let{id:t,r,x:s,z:c}=e,l=i?.get(t);if(!i?.has(t)){l=[];let e=5+Math.floor(r()*5),n=.5+r()*.5,a=r()*Bg,o=Ug.flowers[Math.floor(r()*Ug.flowers.length)];for(let i=0;i<e;i++){let u=a+i*2.39996323+(r()-.5)*.35,d=Math.sqrt((i+.15+r()*.35)/e)*n,p=s+Math.cos(u)*d,m=c+Math.sin(u)*d,h=g(p,m),_=.25+r()*.11,v=.18+r()*.07,y=r()*Bg;!h||f.vegetation(p,m,h).density<.7||l.push([`flowers`,{id:`${t}:${i}`,clump:t,anchor:{x:p,y:h.height-.002,z:m,rotation:0,scale:1},x:0,y:0,z:0,sx:v,sy:_,sz:v,rotation:y,color:o}])}l.length<3&&(l=[]),i?.set(t,l)}let u=(l??Vg).filter(([,e])=>(e.anchor.x-n.x)**2+(e.anchor.z-n.z)**2<o*o);if(!(u.length<3||u.length>zg.flowers-a.flowers.length))for(let[,e]of u)a.flowers.push(e)}if(i?.size>18e3){for(let e of i.keys())if(i.delete(e),i.size<=14e3)break}}return a}function Zg(e,t){let n=new ut;n.name=`walking-close-detail`,n.visible=!1,e.add(n);let r={value:new q},i={value:0},a={value:new q},o={value:1},s={},c=new tt,l=new tt,u=new tt,d=new q,f=new q,m=new gt,h=new q(0,1,0),g=new _;for(let e of Hg){let t=e===`grass`||e===`crops`||e===`flowers`,c=e===`flowers`?Dg():t?wg({crop:e===`crops`}):new nt(1,0);if(e===`grass`)for(let e=0;e<6;e++)c.setAttribute(`grassRoots${e}`,new Et(new Float32Array(zg.grass*4),4).setUsage(xe));let l=Gt(new re({color:16777215,vertexColors:e===`flowers`,flatShading:!t,side:t?2:0}));Eg(l,{focus:r,time:i,player:a,visibility:o},e);let u=new Fe(c,l,zg[e]);u.name=`walking-${e}`,u.setColorAt(0,X.white),u.count=0,u.frustumCulled=!1,u.castShadow=!1,u.receiveShadow=!0,u.instanceMatrix.setUsage(xe),n.add(u),s[e]=u}let v={builds:0,instances:0,drawCalls:Hg.length,ready:!1},y=null,b=-1,x=null,S={x:1/0,z:1/0},C=!1,w=[],T=[],E=new Map,D=(e,t)=>{if(e.length!==t.length)return!1;let n=new Set(e);return t.every(e=>n.has(e))};function O(e,n){let r=zg.radius+zg.padding;return e.filter(e=>e.points?.some((i,a)=>J(t,i,n)<r+(e.width??1)||!wt(t)&&a>0&&Gg(n.x,n.z,{a:e.points[a-1],b:i})<r+(e.width??1)))}function k(e,{placements:_=Vg,revision:k=0,visible:A=!1,visibilityWeight:j=1,time:M=0,playerPosition:N=e,cityStreets:P=t.cityStreets??Vg}={}){if(C||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return;n.visible=A,Ve(t,e.x,e.y??0,e.z,r.value),i.value=M,Ve(t,N.x,N.y??0,N.z,a.value),o.value=p.clamp(j,0,1);let F=_!==y||k!==b||P!==x,I=!Number.isFinite(S.x)||J(t,e,S)>=zg.refreshDistance;if(!F&&!I)return;let L=zg.radius+zg.padding,ee=_.filter(n=>J(t,n,e)<L+Jg(n)),R=O(P,e),te=!D(w,ee)||!D(T,R);if(y=_,b=k,x=P,!I&&!te&&v.ready)return;F&&te&&E.clear(),w=ee,T=R;let z=Xg(t,w,e,{cityStreets:T,groundCache:E}),B=0;for(let e of Hg){let n=s[e],r=z[e];n.count=r.length,B+=r.length;for(let[i,a]of r.entries()){let r=a.anchor;if(Ke(t,r.x,r.y??0,r.z,r.rotation??0,c),c.scale(f.setScalar(r.scale??1)),d.set(a.x,a.y,a.z),f.set(a.sx,a.sy,a.sz),m.setFromAxisAngle(h,a.rotation),l.compose(d,m,f),u.multiplyMatrices(c,l),n.setMatrixAt(i,u),n.setColorAt(i,a.colorRGB?g.fromArray(a.colorRGB):X[a.color]??X.grass),e===`grass`)for(let e=0;e<6;e++){let t=n.geometry.attributes[`grassRoots${e}`],o=a.rootHeights,s=e*4,c=a.sy*(r.scale??1);t.setXYZW(i,(o?.[s]??0)/c,(o?.[s+1]??0)/c,(o?.[s+2]??0)/c,(o?.[s+3]??0)/c)}}if(e===`grass`)for(let e=0;e<6;e++)n.geometry.attributes[`grassRoots${e}`].needsUpdate=!0;n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}S={x:e.x,z:e.z},Object.assign(v,{builds:v.builds+1,instances:B,ready:!0})}function A(){if(!C){C=!0;for(let e of Object.values(s))e.geometry.dispose(),e.material.dispose(),e.dispose();n.removeFromParent()}}return{root:n,stats:v,update:k,dispose:A}}function Qg(e,{isActive:t,onToggle:n,onExit:r,onKey:i=()=>!1}){let a=new Set,o=[],s=null,c=0,l=0,u=!1,d=!1,f=e.ownerDocument,p=f.defaultView??globalThis.window;function m(e,t,n,r){e.addEventListener(t,n,r),o.push(()=>e.removeEventListener(t,n,r))}function h(){let t=s?.id;a.clear(),s=null,c=l=0,u=d=!1,t!==void 0&&e.hasPointerCapture?.(t)&&e.releasePointerCapture(t)}function g(e){e.preventDefault(),e.stopImmediatePropagation()}m(e,`keydown`,e=>{if(e.altKey||e.metaKey||e.ctrlKey)return;if(i(e)){g(e);return}let o=e.key.toLowerCase();o===`v`?(g(e),e.repeat||(h(),n())):t()&&([`w`,`a`,`s`,`d`,` `,`e`,`shift`,`arrowleft`,`arrowright`,`arrowup`,`arrowdown`].includes(o)?(o===` `&&!a.has(o)&&!e.repeat&&(u=!0),o===`e`&&!a.has(o)&&!e.repeat&&(d=!0),a.add(o),g(e)):o===`escape`||o===`home`?(g(e),h(),r()):[`f`,`r`,`[`,`]`,`+`,`-`,`=`,`_`].includes(o)&&g(e))},!0);let _=e=>{a.delete(e.key.toLowerCase())};m(e,`keyup`,_),m(p,`keyup`,_),m(e,`blur`,h),m(p,`blur`,h),m(f,`visibilitychange`,()=>{f.hidden&&h()}),m(e,`pointerdown`,n=>{t()&&(g(n),e.focus?.({preventScroll:!0}),s||(s={id:n.pointerId,x:n.clientX,y:n.clientY,startX:n.clientX,startY:n.clientY,click:(n.button??0)===0&&n.isPrimary!==!1},e.setPointerCapture?.(n.pointerId)))},!0);function v(e){(e.clientX-s.startX)**2+(e.clientY-s.startY)**2>25&&(s.click=!1)}m(e,`pointermove`,e=>{t()&&s?.id===e.pointerId&&(v(e),g(e),c-=(e.clientX-s.x)*.005,l+=(e.clientY-s.y)*.004,s.x=e.clientX,s.y=e.clientY)},!0);let y=n=>{s?.id===n.pointerId&&(n.type===`pointerup`&&(v(n),t()&&s.click&&(n.button??0)===0&&(d=!0)),s=null,e.hasPointerCapture?.(n.pointerId)&&e.releasePointerCapture(n.pointerId))};return m(p,`pointerup`,y),m(p,`pointercancel`,y),m(e,`lostpointercapture`,y),m(e,`wheel`,e=>{t()&&g(e)},{capture:!0,passive:!1}),m(e,`contextmenu`,e=>{t()&&e.preventDefault()}),{clear:h,sample(e=0){let t={forward:Number(a.has(`w`))-Number(a.has(`s`)),right:Number(a.has(`d`))-Number(a.has(`a`)),jump:u||a.has(` `),sprint:a.has(`shift`),swing:d,lookX:c+(Number(a.has(`arrowleft`))-Number(a.has(`arrowright`)))*e*1.6,lookY:l+(Number(a.has(`arrowdown`))-Number(a.has(`arrowup`)))*e*1.1};return c=l=0,u=d=!1,t},dispose(){h();for(let e of o)e()}}}function $g(e){let t=new $e;t.setAttribute(`position`,new Re([-1,-1,0,3,-1,0,-1,3,0],3));let n={inverseProjection:{value:new tt},cameraWorld:{value:new tt},skyUp:{value:new q(0,1,0)},sunDirection:{value:new q(-65,110,65).normalize()},horizonColor:{value:new _(12113369)},dayZenith:{value:new _(6005971)},nightZenith:{value:new _(463398)},cloudColor:{value:new _(16052702)},sunColor:{value:new _(16771782)},night:{value:0},strength:{value:1}},r=new ht({name:`walking-sky`,uniforms:n,depthWrite:!1,depthTest:!0,toneMapped:!1,fog:!1,vertexShader:`uniform mat4 inverseProjection; uniform mat4 cameraWorld; varying vec3 skyRay;
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
      }`}),i=new a(t,r);i.name=`walking-sky`,i.visible=!1,i.frustumCulled=!1,i.renderOrder=-1001,e.add(i);let o=!1;function s(t,{visible:r=!1,strength:a=1,night:s=0,up:c=t?.up,sunDirection:l,horizonColor:u=e.background}={}){o||(i.visible=r,t&&(t.updateMatrixWorld(),n.inverseProjection.value.copy(t.projectionMatrixInverse),n.cameraWorld.value.copy(t.matrixWorld)),n.night.value=p.clamp(Number.isFinite(s)?s:0,0,1),n.strength.value=p.clamp(Number.isFinite(a)?a:1,0,1),c?.isVector3&&c.lengthSq()>1e-12&&n.skyUp.value.copy(c).normalize(),l?.isVector3&&l.lengthSq()>1e-12&&n.sunDirection.value.copy(l).normalize(),u?.isColor&&n.horizonColor.value.copy(u))}function c(){o||(o=!0,i.removeFromParent(),t.dispose(),r.dispose())}return{root:i,update:s,dispose:c}}var e_=(e,t,n)=>e+(t-e)*n,t_=(e,t,n)=>Math.exp(e_(Math.log(Math.max(1e-6,e)),Math.log(Math.max(1e-6,t)),n)),n_=e=>e*e*e*(e*(e*6-15)+10);function r_(e,t){e.updateMatrixWorld(!0);let n=new q().copy(t),r=e.position.clone().sub(n),i=Math.max(.001,r.length()),a=e.userData.characterProjection,o=a?.perspective??+!e.isOrthographicCamera,s=e.clone();return s.isOrthographicCamera=!!e.isOrthographicCamera,s.isPerspectiveCamera=!s.isOrthographicCamera,{camera:s,target:n,distance:i,localDirection:r.divideScalar(i).applyQuaternion(e.quaternion.clone().invert()),halfHeight:a?.halfHeight??(e.isOrthographicCamera?1:i)/e.projectionMatrix.elements[5],aspect:Math.abs(e.projectionMatrix.elements[5]/e.projectionMatrix.elements[0]),perspective:o,near:e.near,far:e.far}}function i_(e,t,n){if(!e||!Number.isFinite(e.radius)||e.radius<=0)return null;let r=new q().copy(e.center),i=t.target.clone().sub(r),a=n.target.clone().sub(r),o=i.length(),s=a.length();if(o<1e-6||s<1e-6)return null;i.divideScalar(o),a.divideScalar(s);let c=new q().crossVectors(i,a),l=c.length(),u=p.clamp(i.dot(a),-1,1),d=Math.atan2(l,u);l>1e-12?c.divideScalar(l):u<0?(c.crossVectors(i,Math.abs(i.x)<.9?new q(1,0,0):new q(0,0,1)).normalize(),d=Math.PI):(c.set(0,1,0),d=0);let f=new gt().setFromAxisAngle(c,d),m=f.clone().invert();return{center:r,radius:e.radius,start:i,startRadius:o,endRadius:s,arc:f,endOrientation:n.camera.quaternion.clone().premultiply(m),endUp:n.camera.up.clone().applyQuaternion(m)}}function a_({duration:e=.78,reducedMotion:t={matches:!1}}={}){let n=new me,r=new q;n.name=`character-transition-camera`;let i=new q,a=new q,o=new gt,s=new gt,c=!1,l=0,u=e,d=null,f=null,p=!1,m=0,h=0,g=null;function _(e){let t=e.camera;n.position.copy(t.position),n.quaternion.copy(t.quaternion),n.up.copy(t.up),n.near=t.near,n.far=t.far,n.zoom=t.zoom,n.aspect=e.aspect,n.projectionMatrix.copy(t.projectionMatrix),n.projectionMatrixInverse.copy(t.projectionMatrixInverse),n.isOrthographicCamera=!!t.isOrthographicCamera,n.isPerspectiveCamera=!n.isOrthographicCamera,n.userData.characterProjection={perspective:e.perspective,halfHeight:e.halfHeight},r.copy(e.target),n.updateMatrixWorld(!0)}function v(){return f&&(_(f),c=!1,l=u,m=Number(p)),n}function y(e){if(!c)return n;if(t.matches||(l=Math.min(u,l+Math.max(0,Number.isFinite(e)?e:0)),l>=u))return v();let _=n_(l/u),y=e_(d.perspective,f.perspective,_),b=t_(d.distance,f.distance,_),x=t_(d.halfHeight,f.halfHeight,_);if(g?(o.slerpQuaternions(s,g.arc,_),a.copy(g.start).applyQuaternion(o),r.copy(g.center).addScaledVector(a,e_(g.startRadius,g.endRadius,_)),n.quaternion.slerpQuaternions(d.camera.quaternion,g.endOrientation,_).premultiply(o),n.up.lerpVectors(d.camera.up,g.endUp,_).applyQuaternion(o).normalize()):(n.quaternion.slerpQuaternions(d.camera.quaternion,f.camera.quaternion,_),n.up.lerpVectors(d.camera.up,f.camera.up,_).normalize(),r.lerpVectors(d.target,f.target,_)),i.lerpVectors(d.localDirection,f.localDirection,_).normalize().applyQuaternion(n.quaternion),n.position.copy(r).addScaledVector(i,b),g){let e=r.distanceTo(g.center)-g.radius,t=Math.max(.025,.05-e),o=i.dot(a)*b;o<t&&(n.position.addScaledVector(a,t-o),n.up.copy(a),n.lookAt(r))}n.near=t_(d.near,f.near,_),n.far=t_(d.far,f.far,_),n.aspect=e_(d.aspect,f.aspect,_),n.zoom=e_(d.camera.zoom,f.camera.zoom,_);let S=1-y+y*n.near/b,C=-(1-y+y*n.far/b+S)/(n.far-n.near),w=-S+C*n.near;return n.projectionMatrix.set(1/(x*n.aspect),0,0,0,0,1/x,0,0,0,0,C,w,0,0,-y/b,1-y),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.isPerspectiveCamera=!0,n.isOrthographicCamera=!1,n.userData.characterProjection={perspective:y,halfHeight:x},n.updateMatrixWorld(!0),m=e_(h,Number(p),_),n}return{camera:n,target:r,update:y,finish:v,get active(){return c},get toWalking(){return p},get walkingWeight(){return m},get progress(){return u>0?Math.min(1,l/u):1},begin({fromCamera:i,toCamera:a,fromTarget:o,toTarget:s,toWalking:y,sphere:b}){let x=c,S=r_(i,o??r),C=r_(a,s);return h=x?m:Number(!y),d=S,f=C,p=!!y,l=0,g=i_(b,d,f),u=Math.max(.16,e*Math.abs(Number(p)-h)),m=h,_(d),c=!0,t.matches&&v(),n}}}function o_(){let e=[],t=[],n=(n,r,i)=>{e.push(Math.cos(r)*n,Math.sin(r)*n,0),t.push(i.r,i.g,i.b)};for(let[e,t,r]of[[0,.61,X.redLight],[.61,.87,X.trim],[.87,1,X.teal]])for(let i=0;i<40;i++){let a=i/40*Math.PI*2,o=(i+1)/40*Math.PI*2;n(e,a,r),n(t,a,r),n(t,o,r),e>0&&(n(e,a,r),n(t,o,r),n(e,o,r))}let r=new $e;return r.setAttribute(`position`,new Re(e,3)),r.setAttribute(`color`,new Re(t,3)),r.computeBoundingSphere(),r}function s_(e,t,n){let r=o_(),i=new Qe({vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),o=new a(r,i),s=new a(r,i.clone());o.name=`character-overview-marker`,s.name=`character-map-marker`,o.renderOrder=s.renderOrder=20,o.visible=s.visible=!1,e.add(o),t.add(s);let c=new q,l=new q,u=new q,d=new q,f=new q,m=new q,h=new q,g=!1,_=(e,t,n)=>{let r=p.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function v(e,t,n){f.copy(t).applyMatrix4(e.matrixWorldInverse);let r=e.projectionMatrix.elements,i=r[3]*f.x+r[7]*f.y+r[11]*f.z+r[15];return 2*Math.abs(i)/(Math.max(1,n)*Math.abs(r[5]))}return{root:o,mapRoot:s,get characterReadable(){return g},update({position:e,initialized:t=!1,camera:r,mapBlend:i=0,walking:a=!1,walkingWeight:f=+!!a,viewportHeight:p=800}={}){if(o.visible=s.visible=g=!1,!t||!e||!r||(r.updateMatrixWorld(!0),Ve(n,e.x,e.y??0,e.z,c),rt(n,e.x,e.z,l),wt(n)&&l.dot(d.copy(r.position).sub(c))<=0)||(u.copy(c).addScaledVector(l,im),m.copy(c).project(r),h.copy(u).project(r),m.z<-1||m.z>1||Math.abs(m.x)>1.08||Math.abs(m.y)>1.08))return;let y=Math.abs(h.y-m.y)*p/2;g=y>=5;let b=(1-_(4,12,y))*(1-_(.3,.9,f));b>.001&&i<.999&&(o.visible=!0,o.position.copy(c).addScaledVector(l,im*.57),o.quaternion.copy(r.quaternion),o.scale.setScalar(v(r,o.position,p)*5.4),o.material.opacity=b),i>.001&&(s.visible=!0,Ve(n,e.x,wt(n)?2.4:.62,e.z,s.position),s.quaternion.copy(r.quaternion),s.scale.setScalar(v(r,s.position,p)*6.5),s.material.opacity=1)},dispose(){o.removeFromParent(),s.removeFromParent(),r.dispose(),o.material.dispose(),s.material.dispose()}}}var c_=Object.freeze({faces:256,radius:360});function l_(e,t){let n=new ut;n.name=`town-clock-hands`,e.add(n);let r=new Fe(new d(1,1,1),qt.metal,c_.faces*2);r.name=`clock-hands`,r.count=0,r.instanceMatrix.setUsage(xe),r.frustumCulled=!1,r.castShadow=!1,n.add(r);let i=[],a=new tt,o=new tt,c=new tt,l=new s,u=null,f=-1,p=null,m=-1;function h(e,n){i.length=0;let r=[];for(let i of e){let e=i.buildingType?i.buildingType===`clock`?`landmark`:i.buildingType===`hall`?`civic`:null:i.kind,a=e?Qp(e,i.buildingType?0:i.variant):[];if(!a.length)continue;let o=J(t,i,n);o<=c_.radius&&r.push({item:i,specs:a,distance:o})}r.sort((e,t)=>e.distance-t.distance);for(let{item:e,specs:n}of r){Ke(t,e.x,e.y??0,e.z,e.rotation??0,a);let r=e.scale??1;a.scale(new q(r,r,r));for(let e of n){if(i.length===c_.faces)break;l.position.set(e.x,e.y,e.z),l.rotation.set(0,e.rotation,0),l.scale.set(1,1,1),l.updateMatrix(),o.copy(a).multiply(l.matrix),i.push({matrix:o.clone(),radius:e.radius})}}m=-1}return{root:n,hands:r,update(e,{focus:a={x:0,z:0},placements:o=[],revision:s=0,visible:d=!0,reducedMotion:g=!1}={}){if(n.visible=d,!d)return;(o!==u||s!==f||!p||J(t,a,p)>16)&&(h(o,a),u=o,f=s,p={x:a.x,z:a.z});let _=g?Math.floor(e):Math.floor(e*12)/12;if(_===m)return;m=_;let v=0;for(let e of i)for(let[t,n]of $p.entries()){let i=em(_,t),a=e.radius*n.length;l.position.set(-Math.sin(i)*a*.43,Math.cos(i)*a*.43,n.z),l.rotation.set(0,0,i),l.scale.set(e.radius*n.width,a,.008),l.updateMatrix(),c.copy(e.matrix).multiply(l.matrix),r.setMatrixAt(v++,c)}r.count=v,r.instanceMatrix.needsUpdate=!0},dispose(){r.dispose(),r.geometry.dispose(),n.removeFromParent(),i.length=0}}}var u_=Object.freeze({width:.45,houseWidth:2.2,houseDepth:2.2,doorOffset:.9,landingOffset:1.52,clearance:.04,step:.45,maxSlope:.32,sampleSpacing:.18,maxNodes:3200}),d_=new Set([`house`,`tree`,`rock`,`farm`,`cactus`,`landmark`,`station`,`apartment`,`civic`,`tower`]),f_=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),p_=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z),m_=e=>e.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[e.kind]??1)*(e.scale??1);function h_(e,t,n){if(!n.length)return 0;let r=0,i=0;for(let a of n){let n=K(e,t,a);r+=n.x,i+=n.z}return Math.hypot(r,i)>1e-7?Math.atan2(r,i):n[0].rotation??0}function g_(e,t,n,{heading:r=0,seed:i=e.seed??0,placement:a=0}={}){let o=Number.isFinite(r)?r:0,s=2166136261;for(let e of`${i}:${a}:frontage`)s^=e.charCodeAt(0),s=Math.imul(s,16777619);s^=s>>>16,s=Math.imul(s,2146121005),s^=s>>>15,s=Math.imul(s,2221713035),s^=s>>>16;let c=(s>>>0)/4294967296,l=h_(e,t,n),u=Array.from({length:4},(e,t)=>n.length?Math.exp(1.45*Math.cos(o+t*Math.PI/2-l)):1),d=c*u.reduce((e,t)=>e+t,0);for(let e=0;e<4;e++)if(d-=u[e],d<=0||e===3)return o+e*Math.PI/2}function __(e,t,n=t.doorOffset??u_.doorOffset){let r=t.rotation??0;return We(e,t.x,t.z,Math.sin(r)*n,Math.cos(r)*n)}var v_=e=>({width:e.width??u_.houseWidth,depth:e.depth??u_.houseDepth}),y_=e=>Math.max((e.depth??u_.houseDepth)/2+.42,(e.doorOffset??u_.doorOffset)+.35);function b_(e,t,n=u_.sampleSpacing){for(let r=1;r<e.length;r++){let i=e[r-1],a=e[r],o=Math.max(1,Math.ceil(f_(i,a)/n));for(let e=r===1?0:1;e<=o;e++){let n=e/o;if(t({x:i.x+(a.x-i.x)*n,z:i.z+(a.z-i.z)*n})===!1)return!1}}return!0}function x_(e,t,n,r=.12){let{width:i,depth:a}=v_(t),o=t.scale??1,s=i*o/2,c=a*o/2,l=(n.width??u_.width)/2+r,u=Math.cos(t.rotation??0),d=Math.sin(t.rotation??0);return!b_(n.points,n=>{let r=K(e,t,n),i=r.x*u-r.z*d,a=r.x*d+r.z*u,o=Math.max(0,Math.abs(i)-s),f=Math.max(0,Math.abs(a)-c);return o*o+f*f>=l*l})}var S_=class{constructor(){this.items=[]}push(e){let t=this.items;t.push(e);let n=t.length-1;for(;n;){let r=n-1>>1;if(t[r].score<=e.score)break;t[n]=t[r],n=r}t[n]=e}pop(){let e=this.items,t=e[0],n=e.pop();if(e.length){let t=0;for(;t*2+1<e.length;){let r=t*2+1;if(r+1<e.length&&e[r+1].score<e[r].score&&r++,e[r].score>=n.score)break;e[t]=e[r],t=r}e[t]=n}return t}get length(){return this.items.length}};function C_(e,t,n,{placements:r=[],surfaceAt:i,removedTreeIds:a=new Set,width:o=u_.width,maxNodes:s=u_.maxNodes}={}){if(!p_(t)||!p_(n)||typeof i!=`function`)return null;let c=__(e,t,y_(t)),l=__(e,n,y_(n)),u=__(e,t),d=__(e,n),f=o/2+u_.clearance,p=Math.min(c.x,l.x)-4,m=Math.max(c.x,l.x)+4,h=Math.min(c.z,l.z)-4,g=Math.max(c.z,l.z)+4,_=[],v=new Set;for(let e of[t,n,...r]){if(!p_(e)||!(d_.has(e.kind)||e.kind===`nature`&&e.style===`outcrop`)||e.id!=null&&v.has(e.id)||(e.id!=null&&v.add(e.id),e.kind===`tree`&&a.has(String(e.id??`tree:${e.x}:${e.z}:${e.variant??0}`))))continue;let t=e.kind===`house`||[`farm`,`civic`].includes(e.kind)&&e.width&&e.depth,n=t?v_(e):null,r=e.scale??1,i=t?Math.hypot(n.width,n.depth)*r/2:m_(e);e.x+i<p||e.x-i>m||e.z+i<h||e.z-i>g||_.push({item:e,rectangle:t,radius:i+f,c:Math.cos(e.rotation??0),s:Math.sin(e.rotation??0),halfWidth:(n?.width??0)*r/2,halfDepth:(n?.depth??0)*r/2})}let y=new Map,b=new Map,x=(e,t)=>`${Math.round(e*1e6)}:${Math.round(t*1e6)}`;function S(e,t){let n=x(e,t);return y.has(n)||y.set(n,i(e,t)),y.get(n)}function C(e,t){let n=x(e.x,e.z);if(!t&&b.has(n))return b.get(n);let r=w(e,t);return t||b.set(n,r),r}function w(t,n){for(let r of _){if(n===r.item)continue;let{item:i,c:a,s:o}=r,s=K(e,i,t);if(r.rectangle){let e=s.x*a-s.z*o,t=s.x*o+s.z*a,n=Math.max(0,Math.abs(e)-r.halfWidth),i=Math.max(0,Math.abs(t)-r.halfDepth);if(n*n+i*i<f*f)return!1}else if(s.x*s.x+s.z*s.z<r.radius*r.radius)return!1}let r=1/0,i=-1/0;for(let[e,n]of[[0,0],[o/2,0],[-o/2,0],[0,o/2],[0,-o/2]]){let a=S(t.x+e,t.z+n);if(!a||!Number.isFinite(a.height)||![`ground`,`mountain`].includes(a.type))return!1;r=Math.min(r,a.height),i=Math.max(i,a.height)}return i-r<=o*u_.maxSlope}function T(e,t,n){let r=null;return b_([e,t],e=>{if(!C(e,n))return!1;let t=S(e.x,e.z).height;return r&&Math.abs(t-r.height)>f_(e,r)*u_.maxSlope+.008?!1:(r={...e,height:t},!0)})}if(!T(u,c,t)||!T(l,d,n))return null;let E;if(T(c,l))E=[c,l];else{let e=u_.step,t=new Map,n=new S_,r=(e,t)=>`${e}:${t}`,i={x:c.x,z:c.z,ix:0,iz:0,cost:0,score:f_(c,l),parent:null};t.set(`0:0`,i),n.push(i);let a=null,o=0;for(;n.length&&o++<s;){let i=n.pop();if(!(i.closed||t.get(r(i.ix,i.iz))!==i)){if(i.closed=!0,f_(i,l)<=e*1.5&&T(i,l)){a=i;break}for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++){if(!a&&!o)continue;let s=i.ix+a,u=i.iz+o,d=r(s,u),f=c.x+s*e,_=c.z+u*e;if(f<p||f>m||_<h||_>g)continue;let v=t.get(d);if(v?.closed||v?.blocked)continue;let y=v??{x:f,z:_,ix:s,iz:u};if(!v&&!C(y)){y.blocked=!0,t.set(d,y);continue}let b=i.cost+Math.hypot(a,o)*e;if(v&&b>=v.cost||!T(i,y))continue;let x={x:f,z:_,ix:s,iz:u,cost:b,score:b+f_(y,l),parent:i};t.set(d,x),n.push(x)}}}if(!a)return null;let u=[l];for(let e=a;e;e=e.parent)u.push({x:e.x,z:e.z});let d=u.reverse();E=[d[0]];for(let e=0;e<d.length-1;){let t=d.length-1;for(;t>e+1&&!T(d[e],d[t]);)t--;E.push(d[t]),e=t}}let D=[u,...E,d].filter((e,t,n)=>!t||f_(e,n[t-1])>.001).map(e=>({x:e.x,y:S(e.x,e.z).height+.015,z:e.z}));return{id:`path:${t.id??`preview`}:${n.id}`,fromHouseId:t.id??`preview`,toHouseId:n.id,width:o,points:D}}var w_=Object.freeze([{type:`well`,width:2.2,depth:2.2,doorOffset:.9,height:1.8,collisionWidth:1.3,collisionDepth:1.14,collisionOffsetZ:0},{type:`market`,width:3.4,depth:2.6,doorOffset:1.12,height:2.3,collisionWidth:2.98,collisionDepth:2.02,collisionOffsetZ:0},{type:`clock`,width:2.2,depth:2.2,doorOffset:.9,height:4.5,collisionWidth:1.66,collisionDepth:1.66,collisionOffsetZ:0},{type:`hall`,width:3.9,depth:3.9,doorOffset:1.9,height:4.9,collisionWidth:3.48,collisionDepth:3.4,collisionOffsetZ:.08},{type:`waterTower`,width:2.3,depth:2.3,doorOffset:1.1,height:4,collisionWidth:1.3,collisionDepth:1.3,collisionOffsetZ:0},{type:`plaza`,width:5.2,depth:5.2,doorOffset:2.48,height:.9,collisionWidth:1.72,collisionDepth:1.72,collisionOffsetZ:0,collisionBoxes:Object.freeze([{x:0,z:0,width:1.72,depth:1.72},...[-1,1].map(e=>({x:e*1.52,z:0,width:.38,depth:1.2})),...[-1,1].flatMap(e=>[-1,1].map(t=>({x:e*1.43,z:t*1.43,width:1,depth:1})))].map(Object.freeze))},{type:`library`,width:3.9,depth:3.9,doorOffset:1.9,height:3.9,collisionWidth:3.48,collisionDepth:3.4,collisionOffsetZ:.08},{type:`guildhall`,width:3.9,depth:3.9,doorOffset:1.9,height:4,collisionWidth:3.48,collisionDepth:3.4,collisionOffsetZ:.08},{type:`chapel`,width:2.2,depth:2.9,doorOffset:1.4,height:4.3,collisionWidth:1.82,collisionDepth:2.6,collisionOffsetZ:0}].map(Object.freeze)),T_=Object.freeze([[`well`,3],[`market`,6],[`waterTower`,9],[`plaza`,12],[`hall`,15]].map(([e,t])=>Object.freeze({...w_.find(t=>t.type===e),houses:t}))),E_=e=>Math.min(5,Math.floor(Math.max(0,e)/3)),D_=Object.freeze({routeBudget:4,candidateBudget:64,maxRouteNodes:700});function O_(e){return T_.find(t=>t.type===e)??w_.find(t=>t.type===e)??null}function k_(e,t){if(!t.length)return null;let n=t[0],r=0,i=0;for(let a of t){let t=K(e,n,a);r+=t.x,i+=t.z}return We(e,n.x,n.z,r/t.length,i/t.length)}function A_(e,t){let n=e.filter(e=>e.connected).length,r=new Set(t.map(e=>e.buildingType));return T_.filter(e=>n>=e.houses&&!r.has(e.type))}function j_(e,t){let n=k_(e,t);if(!n)return[];let r=[n],i=.38196601125*Math.PI*2;for(let t=0;t<7;t++){let a=2.6+t*1.7,o=12+t*4;for(let s=0;s<o;s++){let c=s/o*Math.PI*2+i*t;r.push(We(e,n.x,n.z,Math.sin(c)*a,Math.cos(c)*a))}}for(let n of t)for(let t=0;t<4;t++){let i=(n.rotation??0)+t*Math.PI/2;r.push(We(e,n.x,n.z,Math.sin(i)*3.6,Math.cos(i)*3.6))}return r.sort((e,t)=>Math.hypot(e.x-n.x,e.z-n.z)-Math.hypot(t.x-n.x,t.z-n.z)).slice(0,240)}var M_=Object.freeze({houseCost:10,houseWidth:2.2,houseDepth:2.2,connectionRange:9,buildReach:7,chopReach:1.1,clearance:.22,maxHeightDifference:.14,playerRadius:.17,terrainSampleSpacing:.36}),N_=new Set([`house`,`tree`,`rock`,`farm`,`cactus`,`landmark`,`station`,`apartment`,`civic`,`tower`]),P_=e=>structuredClone(e),F_=e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z);function I_(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}function L_(e){return e?.id==null?`tree:${e?.x}:${e?.z}:${e?.variant??0}`:String(e.id)}function R_(e,t){return 2+I_(`${e}:${L_(t)}:logs`)%3}function z_(e){let t=e.width??M_.houseWidth,n=e.depth??M_.houseDepth;return{...e,width:t,depth:n,radius:Math.hypot(t,n)/2}}function B_(e,t,n,r,i=M_.clearance){let a=K(e,t,n),o=t.rotation??0,s=Math.cos(o),c=Math.sin(o),l=a.x*s-a.z*c,u=a.x*c+a.z*s,d=Math.max(0,Math.abs(l)-(t.width??M_.houseWidth)/2),f=Math.max(0,Math.abs(u)-(t.depth??M_.houseDepth)/2);return d*d+f*f<(r+i)**2}function V_(e,t,n){let r=n.scale??1;return n.kind===`house`||n.kind===`civic`&&n.width&&n.depth?Qs(e,z_(t),z_(n),M_.clearance):n.kind===`farm`&&n.width&&n.depth?Qs(e,z_(t),n,M_.clearance):B_(e,t,n,n.radius??({tree:.85,rock:.6,cactus:.7,landmark:2,station:3.42,apartment:2.05,civic:2.8,tower:2.1}[n.kind]??1)*r)}function H_(e,{config:t=e.gameplay,surfaceAt:n=(t,n)=>ml(e,t,n)}={}){if(!t?.starterHouse||!F_(t.starterHouse))throw TypeError(`Settlement requires a finite starter house`);let r=t.ownerId??t.starterHouse.ownerId??`teal`,i=[{...P_(t.starterHouse),kind:`house`,ownerId:r,cityId:null,connected:!1}],a=[],o=[],s=[],c=new Set,l=[],u=[],d=0,f=0,p=2,m=!1,h=new Map;function g(e=i,t=s){let n=new Map(e.map(e=>[e.id,e.id])),r=new Map(e.map((e,t)=>[e.id,t])),a=e=>{for(;n.get(e)!==e;)e=n.get(e);return e};for(let e of t){if(!n.has(e.fromHouseId)||!n.has(e.toHouseId))continue;let t=a(e.fromHouseId),i=a(e.toHouseId);t!==i&&n.set(r.get(t)<r.get(i)?i:t,r.get(t)<r.get(i)?t:i)}return new Map(e.map(e=>[e.id,a(e.id)]))}let _=e=>`city:${e}`;function v(){let t=g(),n=new Map;for(let e of i){let r=t.get(e.id);n.has(r)||n.set(r,[]),n.get(r).push(e)}let s=new Map(i.map(e=>[e.id,e.cityId]));l=[],u=[];for(let[t,i]of n){let n=i.length>=3?_(t):null;for(let e of i)e.connected=!!n,e.cityId=n;let o=k_(e,i),c={id:_(t),...o,ownerId:r,level:E_(i.length),houseCount:i.length,houseIds:i.map(e=>e.id)};if(u.push(c),!n)continue;let d=new Set(i.map(e=>s.get(e.id)).filter(Boolean));for(let e of a)d.has(e.cityId)&&(e.cityId=n);l.push(c)}let c=new Map([...i,...a].map(e=>[e.id,e]));for(let e of o)e.cityId=c.get(e.fromHouseId)?.cityId??c.get(e.toHouseId)?.cityId??null}function y(t){if(!F_(t))return[];let n=g(),r=new Set;for(let a of i)J(e,t,a)<=M_.connectionRange&&r.add(n.get(a.id));return i.filter(e=>r.has(n.get(e.id)))}function b(){return l.flatMap(e=>A_(i.filter(t=>t.cityId===e.id),a.filter(t=>t.cityId===e.id)).map(t=>({...t,cityId:e.id})))}let x=()=>[...new Set(b().map(e=>e.type))];function S(t,{player:r,placements:s=[],ready:l=!0,isReadyAt:u}={}){if(!F_(t)||!Number.isFinite(t.rotation))return[`invalid-position`,`Choose a place for your house`];if(!l)return[`loading`,`Preparing this patch of ground`];if(r&&(!F_(r)||B_(e,t,r,M_.playerRadius,.12)))return[`player-blocked`,`Step away from the blueprint`];for(let n of[...i,...a])if(V_(e,t,n))return[`house-blocked`,`Leave a little room between buildings`];for(let n of o)if(x_(e,t,n))return[`path-blocked`,`Keep the village paths clear`];for(let n of s)if((N_.has(n.kind)||n.kind===`nature`&&n.style===`outcrop`)&&F_(n)&&!i.some(e=>e.id===n.id)&&!a.some(e=>e.id===n.id)&&!(n.kind===`tree`&&c.has(L_(n)))&&V_(e,t,n))return[n.kind===`tree`?`tree-blocked`:`scenery-blocked`,n.kind===`tree`?`Chop this tree to clear the ground`:`This spot is already occupied`];let d=Math.cos(t.rotation),f=Math.sin(t.rotation),p=t.width??M_.houseWidth,m=t.depth??M_.houseDepth,h=1/0,g=-1/0,_=Math.ceil(p/M_.terrainSampleSpacing),v=Math.ceil(m/M_.terrainSampleSpacing);for(let r=0;r<=_;r++)for(let i=0;i<=v;i++){let a=p*(r/_-.5),o=m*(i/v-.5),s=We(e,t.x,t.z,a*d+o*f,o*d-a*f);if(u&&!u(s))return[`loading`,`Preparing this patch of ground`];let c=n(s.x,s.z);if(!c||!Number.isFinite(c.height)||![`ground`,`mountain`].includes(c.type))return[`wet-ground`,`Choose dry ground away from the shore`];h=Math.min(h,c.height),g=Math.max(g,c.height)}return t.y=h,g-h>M_.maxHeightDifference?[`steep-ground`,`Find a flatter patch of ground`]:null}function C(t,{player:l,heading:u=0,placements:f=[],ready:m=!0,enforceReach:h=!0,isReadyAt:v}={}){let b=y(t),x=z_({id:`home-${p}`,kind:`house`,x:t?.x,z:t?.z,rotation:F_(t)?g_(e,t,b,{heading:u,seed:e.seed,placement:p}):0,scale:1,ownerId:r,variant:p%4}),C=null,w=1/0;for(let t of b){let n=J(e,x,t);n<w&&(w=n,C=t.id)}let T=b.length+1,E=T>=3,D=E?_(b[0].id):null;x.cityId=D,x.connected=E;let O={house:x,cost:M_.houseCost,affordable:d>=M_.houseCost,connected:E,cityId:D,cityHouseCount:T,cityLevel:E_(T),connectionHouseId:C,distanceToCity:w,path:null,paths:[],links:[]},k=(e,t)=>({...O,valid:!1,siteValid:!1,code:e,reason:t});if(!F_(x)||!Number.isFinite(x.rotation))return k(`invalid-position`,`Choose a place for your house`);if(!m)return k(`loading`,`Preparing this patch of ground`);if(l&&(!F_(l)||h&&J(e,l,x)>M_.buildReach))return k(`out-of-reach`,`Move closer to build here`);let A=S(x,{player:l,placements:f,ready:m,isReadyAt:v});if(A)return k(...A);let j=g(),M=new Map,N=[...i,...a,x,...f],P=(t,r)=>C_(e,t,r,{placements:N,surfaceAt:n,removedTreeIds:c});for(let t of i){let n=J(e,x,t);if(n>M_.connectionRange)continue;let r=j.get(t.id);M.has(r)||M.set(r,[]),M.get(r).push({home:t,distance:n})}for(let e of M.values()){e.sort((e,t)=>e.distance-t.distance);let t=null;for(let{home:n}of e)if(t=P(x,n),t)break;if(!t)return k(`path-blocked`,`Leave a clear route to the neighbouring houses`);if(v&&!b_(t.points,v))return k(`loading`,`Preparing the village path`);O.links.push(t),E&&O.paths.push({...t,cityId:D})}if(E){let e=new Set(b.map(e=>e.id)),t=new Set(o.map(e=>e.id)),n=new Map(i.map(e=>[e.id,e]));for(let r of s){if(t.has(r.id)||!e.has(r.fromHouseId))continue;let i=P(n.get(r.fromHouseId),n.get(r.toHouseId));if(!i)return k(`path-blocked`,`Leave room for the new city paths`);if(v&&!b_(i.points,v))return k(`loading`,`Preparing the village path`);O.paths.push({...i,cityId:D})}}return O.path=O.paths[0]??null,O.affordable?{...O,valid:!0,siteValid:!0,code:`ready`,reason:E?`Joins your city`:b.length?`Grows your settlement`:`Starts a new outpost`}:{...O,valid:!1,siteValid:!0,code:`not-enough-logs`,reason:`Collect ${M_.houseCost-d} more ${M_.houseCost-d===1?`log`:`logs`}`}}function w(e,t){let n=C(e,t);if(!n.valid)return{ok:!1,...n};let r={...n.house};p++,delete r.width,delete r.depth,i.push(r),s.push(...n.links),o.push(...n.paths),d-=M_.houseCost,v(),f++;let a=T(t);return{ok:!0,house:P_(r),paths:P_(n.paths),addedBuildings:a.buildings,addedPaths:a.paths,developmentSearching:a.searching,cost:M_.houseCost,connected:r.connected,cityId:r.cityId,cityHouseCount:n.cityHouseCount,cityLevel:n.cityLevel,totalLogs:d}}function T(t={}){let s=[],l=[],u=b(),d=F_(t.player)?t.player:null,p=t=>!!t.playerAnchor!=!!d||d&&J(e,t.playerAnchor,d)>1,g=D_.routeBudget,_=D_.candidateBudget;if(m=!1,t.ready!==!1)for(let f of u){let u=i.filter(e=>e.cityId===f.cityId),v=`${f.cityId}:${f.type}`,y=`${u.map(e=>e.id).join(`:`)}:${c.size}`,b=h.get(v);if((!b||b.layoutKey!==y||b.placements!==t.placements||b.isReadyAt!==t.isReadyAt||b.complete&&p(b))&&(b={layoutKey:y,placements:t.placements,isReadyAt:t.isReadyAt,playerAnchor:d?{x:d.x,z:d.z}:null,offset:0,complete:!1},h.set(v,b)),b.complete)continue;let x=j_(e,u),C=null,w=null;for(let o=b.offset;o<x.length;o++){if(!g||!_){b.offset=o,m=!0;break}_--;let s=x[o],l=z_({id:`civic:${f.cityId}:${f.type}`,kind:`civic`,buildingType:f.type,x:s.x,z:s.z,rotation:h_(e,s,u),scale:1,ownerId:r,connected:!0,...f}),d=u.map(t=>({home:t,distance:J(e,l,t)})).filter(e=>e.distance<=M_.connectionRange).sort((e,t)=>e.distance-t.distance);if(!d.length||S(l,t)){b.offset=o+1;continue}g--,b.offset=o+1;let p=C_(e,l,d[0].home,{placements:[...i,...a,...t.placements??[]],surfaceAt:n,removedTreeIds:c,maxNodes:D_.maxRouteNodes});if(p&&(!t.isReadyAt||b_(p.points,t.isReadyAt))){C=l,w=p;break}}C?(w.cityId=f.cityId,a.push(C),o.push(w),s.push(C),l.push(w),b.complete=!0):b.offset>=x.length?(b.complete=!0,p(b)&&(m=!0)):m=!0}return s.length&&f++,{buildings:P_(s),paths:P_(l),searching:m,pendingMilestones:x(),pendingDevelopments:P_(b())}}function E(t,{player:n}={}){if(t?.kind!==`tree`||!F_(t))return{ok:!1,code:`not-a-tree`};let r=L_(t);if(c.has(r))return{ok:!1,code:`already-chopped`};if(n&&(!F_(n)||J(e,n,t)>M_.chopReach))return{ok:!1,code:`out-of-reach`};let i=R_(e.seed,t);return c.add(r),d+=i,f++,{ok:!0,treeId:r,logs:i,totalLogs:d}}return v(),{get logs(){return d},get developmentSearching(){return m},get revision(){return f},get ownerId(){return r},get houses(){return P_(i)},get buildings(){return P_(a)},get cities(){return P_(l)},get clusters(){return P_(u)},get pendingMilestones(){return x()},get pendingDevelopments(){return P_(b())},get paths(){return P_(o)},get removedTreeIds(){return new Set(c)},isTreeRemoved(e){return c.has(typeof e==`string`?e:L_(e))},snapshot(){return{logs:d,revision:f,ownerId:r,developmentSearching:m,houses:P_(i),buildings:P_(a),cities:P_(l),clusters:P_(u),pendingMilestones:x(),pendingDevelopments:P_(b()),paths:P_(o),removedTreeIds:[...c]}},evaluateBuild:C,build:w,chop:E,develop:T}}function U_(t,{buildingType:n,x:r=0,y:i=0,z:a=0,rotation:o=0,scale:s=1,palette:c}={}){let l=O_(n);if(!l)throw TypeError(`Unknown settlement building: ${n}`);let u=c??{body:`teal`,light:`sage`,dark:`roofDark`,roof:`roofBlue`,accent:`gold`,trim:`trim`},d;if(n===`clock`)d=pm(t,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c,animatedClocks:!0});else if(n===`hall`)d=gm(t,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c,animatedClocks:!0});else if(n===`waterTower`)d=pm(t,{x:r,y:i,z:a,rotation:o,scale:s,variant:2,palette:c});else if(n===`plaza`)d=_m(t,{x:r,y:i,z:a,rotation:o,scale:s,variant:0,palette:c});else if(n===`library`)d=gm(t,{x:r,y:i,z:a,rotation:o,scale:s,variant:1,palette:c});else if(n===`guildhall`)d=gm(t,{x:r,y:i,z:a,rotation:o,scale:s,variant:2,palette:c});else if(n===`chapel`)d=pm(t,{x:r,y:i,z:a,rotation:o,scale:s,variant:1,palette:c});else if(d=Jp(t,r,i,a,o),d.scale.setScalar(s),n===`well`){$(d,0,.05,0,2.08,.1,2.08,`platform`);let t=new O,n=new C;for(let e=0;e<=8;e++){let r=e*Math.PI*2/8;e?(t.lineTo(Math.cos(r)*.53,Math.sin(r)*.53),n.lineTo(Math.cos(-r)*.35,Math.sin(-r)*.35)):(t.moveTo(.53,0),n.moveTo(.35,0))}t.holes.push(n);let r=new e(t,{depth:.48,bevelEnabled:!1,steps:1});r.rotateX(-Math.PI/2),Wp(d,r,u.light,0,.1,0),Gp(d,0,.295,0,.349,.349,.025,`water`,8);for(let e of[-1,1])$(d,e*.58,.75,0,.105,1.3,.13,u.dark);$(d,0,1.39,0,1.3,.1,.14,u.dark);let i=Gp(d,0,1.03,0,.045,.045,1.12,u.dark,8);i.rotation.z=Math.PI/2,$(d,0,.79,0,.018,.46,.018,`timber`),Yp(d,1.74,1.54,.34,1.4,u.roof)}else{$(d,0,.06,0,3.36,.12,2.5,`platform`);for(let e of[-1.36,1.36])for(let t of[-.9,.9])$(d,e,.88,t,.12,1.52,.12,u.dark);$(d,0,1.64,0,2.88,.1,1.96,u.trim),Yp(d,3.18,2.34,.6,1.66,u.roof),$(d,0,.3,.42,2.45,.36,.56,u.body),$(d,0,.51,.42,2.57,.06,.66,u.trim);for(let[e,t]of[-.78,0,.78].entries()){$(d,t,.59,.42,.61,.1,.45,u.dark);for(let n of[-.14,.14])Kp(d,t+n,.65,.42,.095,.065,.12,[`leafGold`,`redLight`,`leaf`][e])}}return d.name=`settlement-${n}`,d.userData.rigidSurfaceAsset=!0,d.userData.footprint={width:l.width,depth:l.depth,height:l.height},d.userData.entrance={x:0,z:l.doorOffset},d.userData.buildingType=n,d}function W_(e){let t=e=>new O(e.map(([e,t])=>new Y(e,-t))),n=(e,t)=>{let n=new O;n.absarc(0,0,e,0,Math.PI*2,!1);let r=new C;return r.absarc(0,0,t,0,Math.PI*2,!0),n.holes.push(r),n},r;if(e===`well`)r=[n(1.05,.58)];else if(e===`clock`)r=[n(1.23,1.02),t([[-.1,-.78],[.1,-.78],[.1,-.1],[.64,-.1],[.64,.1],[-.1,.1]])];else if(e===`market`)r=[t([[-1.5,-.62],[0,-1.4],[1.5,-.62],[1.5,.78],[1,.52],[.5,.78],[0,.52],[-.5,.78],[-1,.52],[-1.5,.78]])];else if(e===`waterTower`)r=[t([[-1.04,-.65],[0,-1.23],[1.04,-.65],[1.04,.32],[.65,.32],[.85,1.2],[.51,1.2],[.32,.32],[-.32,.32],[-.51,1.2],[-.85,1.2],[-.65,.32],[-1.04,.32]])];else if(e===`plaza`){r=[n(.72,.42)];for(let[e,t]of[[-1.03,0],[1.03,0],[0,-1.03],[0,1.03]]){let n=new O;n.absarc(e,t,.3,0,Math.PI*2,!1),r.push(n)}}else if(e===`library`){let e=t([[-1.4,1],[-1.4,-.32],[-.88,-.32],[-.88,-.56],[-.67,-1.04],[-.3,-1.34],[.3,-1.34],[.67,-1.04],[.88,-.56],[.88,-.32],[1.4,-.32],[1.4,1]]);for(let t of[-.76,0,.76])e.holes.push(new C([new Y(t-.13,-.72),new Y(t+.13,-.72),new Y(t+.13,-.04),new Y(t-.13,-.04)]));r=[e]}else if(e===`guildhall`)r=[t([[-1.5,.94],[-1.5,-.82],[-1.1,-1.4],[-.7,-.82],[-.7,-.27],[.7,-.27],[.7,-.82],[1.1,-1.4],[1.5,-.82],[1.5,.94],[.26,.94],[.26,.25],[-.26,.25],[-.26,.94]])];else if(e===`chapel`)r=[t([[-1.05,.94],[-1.05,-.18],[-.37,-.58],[-.37,-1.12],[0,-1.66],[.37,-1.12],[.37,-.58],[1.05,-.18],[1.05,.94],[.21,.94],[.21,.18],[-.21,.18],[-.21,.94]])];else{let e=t([[-1.5,.95],[-1.5,-.65],[0,-1.42],[1.5,-.65],[1.5,.95]]);for(let t of[-.8,0,.8])e.holes.push(new C([new Y(t-.15,-.62),new Y(t+.15,-.62),new Y(t+.15,.4),new Y(t-.15,.4)]));r=[e]}let i=new Se(r,12);return i.rotateX(-Math.PI/2),i}function G_(e,t,n){let r=new ut,i=new ut;r.name=`player-settlement`,i.name=`settlement-map`,e.add(r),t.add(i);let o=n.players.find(e=>e.id===n.gameplay.ownerId),s=zl(o),c=[];for(let e=0;e<4;e++){let t=new ut;um(t,{variant:e,palette:s}),bm(Xp(t)),c.push(t)}let l=new Map,u=new Map;for(let{type:e}of w_){let t=new ut;U_(t,{buildingType:e,palette:s}),bm(Xp(t)),l.set(e,t),u.set(e,W_(e))}let f=new d(2.2,2.2,2.2);f.translate(0,1.1,0);let p=new _(`#5dd9b4`),m=new _(`#ec565c`),h=new Qe({color:p,transparent:!0,opacity:.2,depthWrite:!1}),g=new a(f,h),v=new a(f,h);g.name=v.name=`settlement-blueprint`,g.visible=v.visible=!1,g.renderOrder=v.renderOrder=5,r.add(g),i.add(v);let y=new be(f),b=new G({color:p,transparent:!0,opacity:.72,depthWrite:!1});g.add(new Ae(y,b)),v.add(new Ae(y,b));function x(e=256){let t=new $e;return t.setAttribute(`position`,new z(new Float32Array(e*3),3).setUsage(xe)),t.setAttribute(`lineDistance`,new z(new Float32Array(e),1).setUsage(xe)),t.setDrawRange(0,0),t}let S=x(),C=x(),w=new kt({color:p,dashSize:.12,gapSize:.09,transparent:!0,opacity:.9,depthWrite:!1}),T=new Ae(S,w),E=new Ae(C,w);for(let e of[T,E])e.name=`settlement-path-preview`,e.visible=!1,e.frustumCulled=!1,e.renderOrder=9;r.add(T),i.add(E);let D=new ut,O=new ut;D.name=`settlement-paths`,O.name=`settlement-map-paths`,r.add(D),i.add(O);let k=new Qe({color:X.sand,depthWrite:!1});function A(e){for(let e of[D,O]){for(let t of e.children)t.geometry.dispose();e.clear()}let t=jh(D,{...n,cityStreets:e});for(let e of t){let t=e.geometry;e.geometry=eu(t,.6),t.dispose();let r=e.geometry.attributes.position;for(let e=0;e<r.count;e++)r.setY(e,ml(n,r.getX(e),r.getZ(e)).height+kh);r.needsUpdate=!0,e.geometry.computeVertexNormals(),e.geometry.computeBoundingSphere(),e.castShadow=!1,e.receiveShadow=!0;let i=e.geometry.clone(),o=i.attributes.position;for(let e=0;e<o.count;e++)o.setY(e,.62);i.computeBoundingSphere();let s=new a(i,k);s.renderOrder=7,O.add(s)}}let j=new a(new zt(.26,.32,28),new Qe({color:16768918,side:2,depthWrite:!1}));j.rotation.x=-Math.PI/2,j.renderOrder=8,j.visible=!1,r.add(j);let M=new ee(1,5);M.rotateX(-Math.PI/2),M.rotateY(Math.PI);let N=new Qe({color:Rl(o).body,depthWrite:!1}),P=new tt,F=new tt,I=[],L,R=0,te=0,B=0,V=[],H=[];function ne(e){if(e.length>B){for(let e of[...V,...H])e.removeFromParent(),e.dispose();V.length=H.length=0,B=Math.max(4,2**Math.ceil(Math.log2(e.length)));for(let[e,t]of l){for(let n of t.children){let t=new Fe(n.geometry,n.material,B);t.name=`settlement-civic-${e}`,t.userData.buildingType=e,t.castShadow=t.receiveShadow=!0,r.add(t),V.push(t)}let n=new Fe(u.get(e),N,B);n.name=`settlement-civic-map-${e}`,n.userData.buildingType=e,n.renderOrder=8,i.add(n),H.push(n)}}for(let e of[...V,...H])e.count=0;for(let t of e){Ke(n,t.x,t.y??0,t.z,t.rotation??0,P),P.scale(new q().setScalar(t.scale??1));for(let e of V)e.userData.buildingType===t.buildingType&&e.setMatrixAt(e.count++,P);F.makeRotationY(t.rotation??0),F.setPosition(t.x,.68,t.z);for(let e of H)!t.cityId&&e.userData.buildingType===t.buildingType&&e.setMatrixAt(e.count++,F)}for(let e of[...V,...H])e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.computeBoundingBox()}function re(e,t=[],a=[]){if(A(t),ne(a),!L||e.length>R){for(let e of I)e.removeFromParent(),e.dispose();L?.removeFromParent(),L?.dispose(),R=Math.max(16,2**Math.ceil(Math.log2(e.length))),I=[];for(let e=0;e<4;e++)for(let t of c[e].children){let n=new Fe(t.geometry,t.material,R);n.userData.variant=e,n.count=0,n.castShadow=n.receiveShadow=!0,r.add(n),I.push(n)}L=new Fe(M,N,R),L.renderOrder=8,i.add(L)}for(let e of I)e.count=0;let o=0;e.forEach(e=>{Ke(n,e.x,e.y??0,e.z,e.rotation??0,P);for(let t of I)t.userData.variant===(e.variant??0)%4&&t.setMatrixAt(t.count++,P);F.makeScale(1.6,1,1.6),F.setPosition(e.x,.66,e.z),e.cityId||L.setMatrixAt(o++,F)});for(let e of I)e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.computeBoundingBox();L.count=o,L.instanceMatrix.needsUpdate=!0,L.computeBoundingSphere(),te++,r.updateMatrixWorld(!0)}return{root:r,mapRoot:i,sync:re,get meshes(){return[...I,...V].filter(e=>e.count>0&&e.material.userData.sceneStyle!==`window`)},get revision(){return te},preview(e,{visible:t=!1,targetTree:n=null}={}){if(g.visible=v.visible=t&&!!e?.house,T.visible=E.visible=!1,j.visible=!t&&!!n,j.visible&&(j.position.set(n.x,(n.y??0)+.025,n.z),j.scale.setScalar(Math.max(1,(n.scale??1)*1.15))),!g.visible)return;let r=e.house;g.position.set(r.x,r.y??0,r.z),g.rotation.y=r.rotation??0,v.position.set(r.x,.68,r.z),v.rotation.y=g.rotation.y,h.color.copy(e.valid?p:m),b.color.copy(h.color),T.material.color.copy(h.color);let i=e.paths??(e.path?[e.path]:[]),a=i.reduce((e,t)=>e+Math.max(0,t.points.length-1)*2,0);if(a){if(a>S.attributes.position.count){let e=2**Math.ceil(Math.log2(a));S.dispose(),C.dispose(),T.geometry=S=x(e),E.geometry=C=x(e)}let e=S.attributes.position,t=C.attributes.position,n=S.attributes.lineDistance,r=C.attributes.lineDistance,o=0;for(let{points:a}of i){let i=0;for(let s=1;s<a.length;s++){let c=a[s-1],l=a[s],u=Math.hypot(l.x-c.x,l.z-c.z);for(let[a,s]of[[c,i],[l,i+u]])e.setXYZ(o,a.x,(a.y??0)+.045,a.z),t.setXYZ(o,a.x,.69,a.z),n.setX(o,s),r.setX(o,s),o++;i+=u}}for(let e of[S,C])e.attributes.position.needsUpdate=e.attributes.lineDistance.needsUpdate=!0,e.setDrawRange(0,a);T.visible=E.visible=!0}},update({mapBlend:e=0}={}){r.visible=e<.999,i.visible=e>.001},dispose(){r.removeFromParent(),i.removeFromParent();for(let e of[...I,...V,...H])e.dispose();L?.dispose();for(let e of[...c,...l.values()]){for(let t of e.children)t.geometry.dispose();for(let t of e.userData.ownedMaterials??[])t.dispose()}for(let e of u.values())e.dispose();Object.values(s).forEach(e=>e.dispose()),S.dispose(),C.dispose(),w.dispose(),j.geometry.dispose(),j.material.dispose(),f.dispose(),h.dispose(),y.dispose(),b.dispose();for(let e of[D,O])for(let t of e.children)t.geometry.dispose();k.dispose(),M.dispose(),N.dispose()}}}var K_=e=>`<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">${e}</svg>`,q_={logs:K_(`<path fill="#775333" d="m3 17 16-9 10 6v10l-16 7-10-5z"/><path fill="#b7854b" d="m3 17 16-9 10 6-16 8z"/><path fill="#e9c891" d="m3 17 10 5v9L3 26z"/><path stroke="#87603b" stroke-width="1.4" d="m6 21 4 2v4l-4-2z"/>`),house:K_(`<path fill="#f4ead0" d="M6 13h20v15H6z"/><path fill="#bbccbb" d="M21 12h5v16h-5z"/><path class="settlement-owner-fill" d="m3 14 13-11 13 11z"/><path fill="#004e43" d="M13 20h6v8h-6z"/><path fill="#729b8e" d="M8 17h4v4H8zM21 17h3v4h-3z"/>`),axe:K_(`<path fill="#855831" d="m8 28 3 1L24 5l-3-2z"/><path fill="#dce5d1" d="m20 5-11-2-6 9 13 6z"/><path fill="#9db6b1" d="m16 18 4-13-5 8-12-1z"/><path fill="#f0d6a7" d="m9 25 3 2-1 2-3-1z"/>`),view:K_(`<path fill="#00594b" d="m2 15 14-9 14 9v6l-14 9-14-9z"/><path fill="#7da868" d="m2 15 14-9 14 9-14 9z"/><path fill="#a8c187" d="m2 15 14-9v18z"/><path fill="#dcceb0" d="m8 11 3-2 10 12-3 2z"/><path fill="#e7eee0" d="m14 12 4-3 4 3v5l-4 3-4-3z"/><path class="settlement-owner-fill" d="m12 12 6-5 6 5-6 3z"/>`),person:K_(`<path fill="#ddbc8b" d="M12 7h8v8h-8z"/><path fill="#cd665a" d="m10 6 4-3h8v5H10z"/><path class="settlement-owner-fill" d="M9 14h14v11H9z"/><path fill="#dfc8a1" d="M7 15h3v10H7zM22 15h3v10h-3z"/><path fill="#183f38" d="M11 25h4v6h-4zM17 25h4v6h-4z"/>`),link:K_(`<path stroke="#e8d6ac" stroke-width="3" d="M7 22v4h18v-4"/><path fill="#dfe4ca" d="M2 13h10v10H2zM20 13h10v10H20z"/><path class="settlement-owner-fill" d="m0 14 7-7 7 7zM18 14l7-7 7 7z"/><path fill="#14584a" d="M6 19h3v4H6zM24 19h3v4h-3z"/>`),outpost:K_(`<path fill="#e6d3ad" d="M7 3h3v25H7z"/><path fill="#f2cb79" d="m10 4 17 3-5 6 5 6-17-3z"/><path fill="#a8b38f" d="m3 28 6-5 6 5z"/>`),check:K_(`<path fill="currentColor" d="m3 17 5-5 7 7L26 5l5 4-16 20z"/>`),blocked:K_(`<path stroke="currentColor" stroke-width="3" d="m10 3 12 0 7 7v12l-7 7H10l-7-7V10zM8 8l16 16"/>`),tree:K_(`<path fill="#986b44" d="M14 20h4v10h-4z"/><path fill="#91b36a" d="m16 1 12 19-12 6-12-6z"/><path fill="#497e50" d="m16 1 12 19-12 6z"/>`),water:K_(`<path fill="#83b9cb" d="m16 2 11 16v7l-6 5H11l-6-5v-7z"/><path fill="#3c849e" d="m16 2 11 16v7l-6 5h-5z"/>`),well:K_(`<path fill="#adbaa6" d="m5 21 11-5 11 5v7l-11 4-11-4z"/><path fill="#e2dfc4" d="m5 21 11-5 11 5-11 4z"/><path fill="#487d87" d="m10 21 6-3 6 3-6 2z"/><path fill="#785834" d="M7 9h3v13H7zM22 9h3v13h-3z"/><path class="settlement-owner-fill" d="m3 11 13-10 13 10z"/><path fill="#e6cf98" d="M15 11h2v8h-2z"/>`),market:K_(`<path fill="#785834" d="M6 14h3v16H6zM23 14h3v16h-3z"/><path fill="#d4af78" d="M4 23h24v5H4z"/><path fill="#a77549" d="M4 28h24v3H4z"/><path class="settlement-owner-fill" d="M7 4h18l6 11H1z"/><path fill="#f4e6bd" d="M11 4h5l-2 11H7zM21 4h4l6 11h-7z"/><path fill="#8cac69" d="M7 20h5v3H7zM13 19h5v4h-5z"/><path fill="#e7b96b" d="M19 20h6v3h-6z"/>`),clock:K_(`<path fill="#e7dfc1" d="M9 9h14v21H9z"/><path fill="#aeba9e" d="M20 9h3v21h-3z"/><path class="settlement-owner-fill" d="m6 10 10-9 10 9z"/><path fill="#b9c0a3" d="M6 29h20v3H6z"/><circle fill="#f5edcf" cx="16" cy="16" r="5"/><path stroke="#23574b" stroke-width="1.5" d="M16 12v4l3 1"/><path fill="#6e8e7e" d="M14 24h4v5h-4z"/>`),hall:K_(`<path fill="#e7dfc1" d="M4 13h24v15H4z"/><path fill="#b8c3a9" d="M24 13h4v15h-4z"/><path class="settlement-owner-fill" d="m1 14 15-10 15 10z"/><path fill="#c7ceb7" d="M1 28h30v4H1z"/><path fill="#315f52" d="M13 20h6v8h-6zM6 17h4v5H6zM22 17h4v5h-4z"/><path fill="#e2cc99" d="M15 1h2v5h-2z"/><path fill="#e4ba63" d="M17 1h7l-2 2 2 2h-7z"/>`),waterTower:K_(`<path stroke="#315f52" stroke-width="2.5" d="M8 16v15M24 16v15M8 29l16-11M8 18l16 11"/><path class="settlement-owner-fill" d="M5 7h22v11l-11 3-11-3z"/><path fill="#e7dfc1" d="M5 16l11 2 11-2v3l-11 3-11-3z"/><path fill="#377d70" d="m3 8 13-7 13 7z"/>`),plaza:K_(`<path fill="#b8c3a9" d="m1 20 15-9 15 9v6l-15 6-15-6z"/><path fill="#96b471" d="m1 20 15-9 15 9-15 6z"/><path fill="#e7dfc1" d="m10 19 6-4 6 4v5l-6 3-6-3z"/><path fill="#83b9cb" d="m11 19 5-3 5 3-5 2z"/><path class="settlement-owner-fill" d="M15 10h2v10h-2z"/><path fill="#e7dfc1" d="m11 10 5-2 5 2-5 3z"/><path fill="#83b9cb" d="M15 5h2v5h-2z"/>`),library:K_(`<path fill="#e7dfc1" d="M4 16h24v14H4z"/><path class="settlement-owner-fill" d="m1 17 15-6 15 6zM9 10V7l3-4h8l3 4v3z"/><path fill="#315f52" d="M8 21h3v7H8zM14 21h4v9h-4zM21 21h3v7h-3z"/><path fill="#c7ceb7" d="M2 29h28v3H2zM8 10h16v3H8z"/><path fill="#e4ba63" d="M15 1h2v3h-2z"/>`),guildhall:K_(`<path fill="#e7dfc1" d="M4 13h24v17H4zM5 6h6v10H5zM21 6h6v10h-6z"/><path class="settlement-owner-fill" d="m1 16 15-7 15 7zM3 7l5-6 5 6zM19 7l5-6 5 6z"/><path fill="#315f52" d="M13 21h6v9h-6zM7 20h3v5H7zM22 20h3v5h-3z"/><path fill="#c7ceb7" d="M2 29h28v3H2z"/>`),chapel:K_(`<path fill="#e7dfc1" d="M3 17h26v13H3zM12 8h10v22H12z"/><path class="settlement-owner-fill" d="m1 18 14-10 16 10zM10 9l7-9 7 9z"/><path fill="#315f52" d="M15 24h4v6h-4zM16 12h2v5h-2z"/><path fill="#c7ceb7" d="M1 29h30v3H1z"/>`),close:K_(`<path fill="currentColor" d="m7 3 9 9 9-9 4 4-9 9 9 9-4 4-9-9-9 9-4-4 9-9-9-9z"/>`)},J_={well:`well`,market:`market`,clock:`clock tower`,hall:`town hall`,waterTower:`water tower`,plaza:`fountain garden`,library:`library`,guildhall:`guild hall`,chapel:`chapel`},Y_=()=>`<span class="settlement-log" aria-hidden="true">${K_(`<path d="m4 11 17-7 7 5v14l-17 6-7-5z"/><path class="settlement-log-top" d="m4 11 17-7 7 5-17 7z"/><path class="settlement-log-end" d="m4 11 7 5v13l-7-5z"/><path class="settlement-log-ring" d="m6 16 3 2v6l-3-2z"/>`)}</span>`,X_=(e,t)=>{e.textContent!==t&&(e.textContent=t)},Z_=(e,t)=>{e.dataset.kind!==t&&(e.innerHTML=q_[t],e.dataset.kind=t)};function Q_({parent:e=document.body,playerColor:t=`#37a98d`,onTool:n=()=>{},onView:r=()=>{},onBuild:i=()=>{},onCancel:a=()=>{}}={}){let o=document.createElement(`aside`);o.className=`settlement-hud`,o.setAttribute(`aria-label`,`Settlement controls`),o.style.setProperty(`--settlement-owner`,t),o.innerHTML=`
    <div class="settlement-inventory" role="group" aria-label="Your settlement">
      <div class="settlement-stockpile" data-hud="stockpile" role="img" aria-label="No logs. Ten logs builds a house.">
        <div class="settlement-log-slots">${Array.from({length:10},Y_).join(``)}</div>
        <span class="settlement-bundles" data-hud="bundles" aria-hidden="true">${Array.from({length:4},()=>`<i>${q_.logs}</i>`).join(``)}</span>
      </div>
      <div class="settlement-homes" data-hud="homes" role="img" aria-label="One house">
        ${q_.house}<span class="settlement-home-marks" aria-hidden="true">${Array.from({length:8},()=>`<i></i>`).join(``)}</span>
      </div>
    </div>
    <div class="settlement-development" data-hud="development" role="group" aria-label="Settlement development">
      <span class="settlement-earned" data-hud="earned">${T_.map(e=>`<span data-milestone="${e.type}" role="img" hidden>${q_[e.type]}</span>`).join(``)}</span>
      <span class="settlement-next" data-hud="next" role="img">
        <svg class="settlement-progress" viewBox="0 0 40 40" aria-hidden="true"><circle class="settlement-progress-track" cx="20" cy="20" r="18"/><circle class="settlement-progress-arc" data-hud="progress" cx="20" cy="20" r="18" pathLength="1"/></svg>
        <span class="settlement-next-symbol" data-hud="next-symbol" aria-hidden="true"></span>
        <svg class="settlement-space-needed" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5"/></svg>
      </span>
    </div>
    <div class="settlement-dock">
      <div class="settlement-build-actions" data-hud="build-actions" role="group" aria-label="House placement" hidden>
        <span class="settlement-placement" data-hud="placement" role="img" aria-label="Joins your settlement">${q_.link}</span>
        <span class="settlement-validity" data-hud="validity" role="img" aria-label="Choose a clear place">${q_.blocked}</span>
        <button type="button" class="settlement-build" data-action="build" aria-label="Build house. Ten logs." aria-keyshortcuts="Enter">${q_.check}</button>
        <button type="button" data-action="cancel" aria-label="Cancel house placement" aria-keyshortcuts="Escape">${q_.close}</button>
      </div>
      <div class="settlement-actions" role="group" aria-label="Tools and camera">
        <button type="button" class="settlement-tool" data-action="axe" aria-label="Select axe. E or click to chop a nearby tree." aria-pressed="true" aria-keyshortcuts="E">${q_.axe}<span class="settlement-target" data-hud="target" aria-hidden="true"></span></button>
        <button type="button" class="settlement-tool" data-action="house" aria-label="Place a house. Costs ten logs." aria-pressed="false" aria-keyshortcuts="B">${q_.house}</button>
        <button type="button" class="settlement-tool settlement-view" data-action="view" aria-label="Switch to overview" aria-keyshortcuts="V"><span data-hud="view-icon">${q_.view}</span></button>
      </div>
    </div>
    <div class="settlement-sr-only" data-hud="announcements" role="status" aria-live="polite" aria-atomic="true"></div>`,e.append(o);let s=Object.fromEntries([...o.querySelectorAll(`[data-hud]`)].map(e=>[e.dataset.hud,e])),c=Object.fromEntries([...o.querySelectorAll(`[data-action]`)].map(e=>[e.dataset.action,e])),l=[...o.querySelectorAll(`.settlement-log`)],u=[...o.querySelectorAll(`.settlement-bundles i`)],d=[...o.querySelectorAll(`.settlement-home-marks i`)],f=[...o.querySelectorAll(`[data-milestone]`)],p={},m=``,h=``,g={axe:()=>n(`axe`),house:()=>n(`house`),view:r,build:i,cancel:a};function _(e){let t=e.target.closest(`button[data-action]`);t&&!t.disabled&&g[t.dataset.action]?.(),e.stopPropagation()}let v=e=>e.stopPropagation();o.addEventListener(`click`,_);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])o.addEventListener(e,v);function y(e={}){p={...p,...e};let{logs:t=0,houses:n=1,connectedHouses:r=n,cityHouses:i=r,cityLevel:a=Math.min(5,Math.floor(i/3)),tool:g=`axe`,walking:_=!0,ready:v=!0,canBuild:y=!1,connected:b=!0,reason:x=``,targetTree:S=!1,message:C=``,visible:w=!0,buildings:T=[],pendingMilestones:E=[]}=p,D=new Set(T.map(e=>e.buildingType)),O=new Set(E),k=T_.map(e=>[D.has(e.type),O.has(e.type)]),A=JSON.stringify([t,n,r,i,a,g,_,v,!!y,!!b,x,!!S,C,w,k]);if(A===h)return;h=A;let j=g===`house`;o.hidden=!w,o.dataset.tool=g,o.dataset.ready=String(!!v),o.dataset.valid=String(!!y),o.dataset.affordable=String(t>=10),o.dataset.target=String(!!S&&_&&!j),l.forEach((e,n)=>{e.dataset.filled=String(n<Math.min(10,t))}),u.forEach((e,n)=>{e.hidden=n>=Math.floor(Math.max(0,t-10)/10)}),d.forEach((e,t)=>{e.hidden=t>=n,e.dataset.connected=String(t<r)}),s.stockpile.setAttribute(`aria-label`,`${t} logs. Ten logs builds one house.`),s.homes.setAttribute(`aria-label`,`${n} ${n===1?`house`:`houses`}. ${a?`Nearest city: level ${a}, ${i} homes.`:`${i} nearby ${i===1?`home`:`homes`}; three form a city.`}`);let M=``;f.forEach(e=>{let t=T_.find(t=>t.type===e.dataset.milestone);e.hidden=!D.has(t.type),e.setAttribute(`aria-label`,`${J_[t.type]} earned free at ${t.houses} connected homes.`)});let N=T_.findIndex(e=>!D.has(e.type)),P=T_[N];if(s.next.hidden=!P,s.development.dataset.complete=String(!P),P){let e=T_[N-1]?.houses??0,t=Math.max(0,Math.min(1,(i-e)/(P.houses-e))),n=O.has(P.type)||i>=P.houses;Z_(s[`next-symbol`],P.type),s.next.dataset.pending=String(n),s.progress.setAttribute(`stroke-dasharray`,`${t} 1`);let r=Math.max(0,P.houses-i);M=n?`Free ${J_[P.type]} earned at ${P.houses} connected homes. Clear space near the settlement for it to appear.`:`${r} more connected ${r===1?`home unlocks`:`homes unlock`} a free ${J_[P.type]} at ${P.houses} homes.`,s.next.setAttribute(`aria-label`,M)}else M=`All civic buildings earned.`;s[`build-actions`].hidden=!j;let F=b?`link`:`outpost`;Z_(s.placement,F),s.placement.dataset.connected=String(!!b),s.placement.setAttribute(`aria-label`,b?`Joins a city with a path`:`Places a home; paths form at three nearby homes`);let I=x||(t<10?`Gather ten logs to build a house.`:`Choose clear, level ground.`),L=y?`check`:t<10?`logs`:/tree|forest/i.test(x)?`tree`:/water|dry ground/i.test(x)?`water`:`blocked`;Z_(s.validity,L),s.validity.setAttribute(`aria-label`,v?y?`Clear ground. Ready to build.`:I:`Preparing this part of the island.`),s.validity.dataset.valid=String(!!y),s.validity.setAttribute(`aria-hidden`,String(!!y)),c.axe.setAttribute(`aria-pressed`,String(!j)),c.house.setAttribute(`aria-pressed`,String(j)),c.house.setAttribute(`aria-label`,`Place a house. Costs ten logs. ${t>=10?`Enough logs gathered.`:`${10-t} more logs needed.`}`);for(let e of[`axe`,`house`,`view`,`cancel`])c[e].disabled=!v;c.build.disabled=!v||!y,c.build.setAttribute(`aria-label`,y?`Build house. Spend ten logs. ${b?`Joins a city.`:`Paths form at three nearby homes.`}`:`Cannot build here. ${I}`),Z_(s[`view-icon`],_?`view`:`person`),c.view.setAttribute(`aria-label`,_?`Switch to overview`:`Return to your traveller`);let ee=[v?`${t} logs. ${n} ${n===1?`house`:`houses`}.`:`Preparing your clearing.`,j?`House placement selected. Aim at clear ground. Enter builds; Escape cancels.`:`Axe selected. E or click chops a nearby tree.`,_?``:`Overview.`,M,C].filter(Boolean).join(` `);ee!==m&&(X_(s.announcements,ee),m=ee)}return y(),{root:o,update:y,dispose(){o.removeEventListener(`click`,_);for(let e of[`pointerdown`,`pointerup`,`dblclick`,`keydown`,`keyup`,`wheel`])o.removeEventListener(e,v);o.remove()}}}var $_=Object.freeze({visible:192,detailRadius:95,walkingRadius:48,doorInset:.24,selectionInterval:.25}),ev=1e-5,tv=(e,t,n)=>Math.max(t,Math.min(n,e)),nv=(e,t)=>Math.hypot(t.x-e.x,t.z-e.z),rv=e=>`${Math.round(e.x*1e4)}:${Math.round(e.z*1e4)}:${Math.round(e.y*1e3)}`,iv=(e,t,n)=>({x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n,z:e.z+(t.z-e.z)*n}),av=e=>Math.atan2(Math.sin(e),Math.cos(e));function ov(e){let t=2166136261;for(let n of String(e))t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}function sv(e){let t=e.randomState;return t^=t<<13,t^=t>>>17,t^=t<<5,e.randomState=t>>>0,e.randomState/4294967296}function cv(e,t){let n=new Map;if(Array.isArray(t))for(let e of t){let t=e.houseIds??[];if(t.length>=3)for(let r of t)n.set(r,e.id)}else{let t=new Map;for(let n of e)n.cityId!=null&&(t.has(n.cityId)||t.set(n.cityId,[]),t.get(n.cityId).push(n.id));for(let[e,r]of t)if(r.length>=3)for(let t of r)n.set(t,e)}return n}function lv(e){let t=e.filter(e=>Number.isFinite(e?.x)&&Number.isFinite(e?.z)).map(e=>({x:e.x,y:e.y??0,z:e.z}));for(let e=t.length-1;e>0;e--)nv(t[e],t[e-1])<ev&&t.splice(e,1);if(t.length<2)return[];let n=t.slice(1).reduce((e,n,r)=>e+nv(t[r],n),0),r=Math.min($_.doorInset,n*.2);function i(){let e=r;for(;t.length>1;){let n=nv(t[0],t[1]);if(e<n){t[0]=iv(t[0],t[1],e/n);break}e-=n,t.shift()}}return i(),t.reverse(),i(),t.reverse(),t}function uv(e,t){let n=[],r=new Map,i=new Map,a=new Map;for(let n of e){let e=n.cityId??t.get(n.fromHouseId)??t.get(n.toHouseId);e!=null&&a.set(n.id,e)}let o=new Map(t);for(let t=0;t<2;t++)for(let t of e){let e=a.get(t.id)??o.get(t.fromHouseId)??o.get(t.toHouseId);e!=null&&(a.set(t.id,e),o.set(t.fromHouseId,e),o.set(t.toHouseId,e))}for(let t of e){let e=a.get(t.id);if(e==null)continue;let r=lv(t.points??[]);for(let i=1;i<r.length;i++){let a=r[i-1],o=r[i];nv(a,o)<ev||n.push({a,b:o,pathId:t.id,cityId:e,index:i,cuts:[0,1]})}}let s=new Map,c=new Set;for(let[e,t]of n.entries()){let{a:r,b:i}=t;for(let a=Math.floor(Math.min(r.x,i.x)/8);a<=Math.floor(Math.max(r.x,i.x)/8);a++)for(let o=Math.floor(Math.min(r.z,i.z)/8);o<=Math.floor(Math.max(r.z,i.z)/8);o++){let l=`${t.cityId}:${a}:${o}`;s.has(l)||s.set(l,[]);let u=s.get(l);for(let a of u){let o=`${a}:${e}`;if(c.has(o))continue;c.add(o);let s=n[a];if(s.pathId===t.pathId)continue;let l=i.x-r.x,u=i.z-r.z,d=s.b.x-s.a.x,f=s.b.z-s.a.z,p=s.a.x-r.x,m=s.a.z-r.z,h=l*f-u*d;if(Math.abs(h)>ev){let e=(p*f-m*d)/h,n=(p*u-m*l)/h;e>=-1e-5&&e<=1.00001&&n>=-1e-5&&n<=1.00001&&Math.abs(iv(r,i,e).y-iv(s.a,s.b,n).y)<.12&&(t.cuts.push(tv(e,0,1)),s.cuts.push(tv(n,0,1)))}else if(Math.abs(p*u-m*l)<ev){let e=l*l+u*u,n=d*d+f*f;for(let n of[s.a,s.b]){let a=((n.x-r.x)*l+(n.z-r.z)*u)/e;a>ev&&a<.99999&&Math.abs(iv(r,i,a).y-n.y)<.12&&t.cuts.push(a)}for(let e of[r,i]){let t=((e.x-s.a.x)*d+(e.z-s.a.z)*f)/n;t>ev&&t<.99999&&Math.abs(iv(s.a,s.b,t).y-e.y)<.12&&s.cuts.push(t)}}}u.push(e)}}function l(e,t){let n=`${t}:${rv(e)}`;return r.has(n)||r.set(n,{id:n,cityId:t,...e,edges:[]}),r.get(n)}for(let e of n){e.cuts.sort((e,t)=>e-t);for(let t=1;t<e.cuts.length;t++){let n=e.cuts[t-1],r=e.cuts[t];if(r-n<ev)continue;let a=l(iv(e.a,e.b,n),e.cityId),o=l(iv(e.a,e.b,r),e.cityId);if(a.id===o.id)continue;let s=[a.id,o.id].sort().join(`|`);if(i.has(s)){i.get(s).pathIds.add(e.pathId);continue}let c={id:s,a,b:o,cityId:e.cityId,length:nv(a,o),pathIds:new Set([e.pathId])};i.set(s,c),a.edges.push(c),o.edges.push(c)}}return{nodes:r,edges:i}}function dv(e,t,n){let r=null;for(let i of e.edges.values())if(i.cityId===n){let{a:e,b:n}=i,a=n.x-e.x,o=n.z-e.z,s=tv(((t.x-e.x)*a+(t.z-e.z)*o)/(i.length*i.length),0,1),c=iv(e,n,s),l=nv(c,t);(!r||l<r.error)&&(r={edge:i,t:s,error:l,position:c})}return r}function fv(e={}){let t={nodes:new Map,edges:new Map},n=new Map,r=0;function i(e,t){let n=t.edges.filter(t=>t.id!==e.edge?.id),r=n.length?n:t.edges;if(!r.length){e.moving=!1;return}let i=r[Math.floor(sv(e)*r.length)];e.edge=i,e.direction=i.a.id===t.id?1:-1,e.along=e.direction===1?0:i.length,e.moving=!0}function a({houses:i=[],paths:a=[],cities:o}={}){let s=cv(i,o);t=uv(a,s);let c=new Set;for(let r of i){let i=s.get(r.id);if(i==null)continue;let a=`resident:${r.id}`;c.add(a);let o=n.get(a);if(o){if(o.cityId=i,!o.onRoad){let e=dv(t,r,i);e&&(Object.assign(o,e.position),o.edge=e.edge,o.along=e.t*e.edge.length,o.direction=e.t>.5?-1:1,o.onRoad=!0);continue}let e=o.edge&&t.edges.get(o.edge.id);if(e)o.edge=e;else{let e=dv(t,o,i),n=o.edge,r=o.direction;if(e&&e.error<2e-4&&Math.abs(e.position.y-o.y)<.002){o.edge=e.edge,o.along=e.t*e.edge.length;let t=Math.atan2(e.edge.b.x-e.edge.a.x,e.edge.b.z-e.edge.a.z),i=n?Math.atan2((n.b.x-n.a.x)*r,(n.b.z-n.a.z)*r):o.heading;o.direction=Math.cos(t-i)>=0?1:-1}}continue}let l=ov(`${e.seed??`island`}:${a}`)||1;o={id:a,houseId:r.id,cityId:i,randomState:l,x:r.x,y:r.y??0,z:r.z,heading:r.rotation??0,edge:null,along:0,direction:1,wait:0,phase:0,moving:!1,distance:0,onRoad:!1},o.speed=.58+sv(o)*.32,o.wait=sv(o)*1.8,o.phase=sv(o)*Math.PI*2;let u=dv(t,r,i);u&&(Object.assign(o,u.position),o.edge=u.edge,o.along=u.t*u.edge.length,o.onRoad=!0,o.direction=u.t>.5?-1:1,o.heading=Math.atan2((u.edge.b.x-u.edge.a.x)*o.direction,(u.edge.b.z-u.edge.a.z)*o.direction)),n.set(a,o)}for(let e of n.keys())c.has(e)||n.delete(e);r++}function o(e){if(!Number.isFinite(e)||e<=0)return;let r=Math.min(e,.5);for(let e of n.values()){let n=r,a=0;for(e.moving=!1;n>ev;){if(e.wait>0){let t=Math.min(e.wait,n);if(e.wait-=t,n-=t,n<ev)break}if(!e.edge)break;let r=e.edge,o=e.direction>0?r.length-e.along:e.along,s=Math.min(o,e.speed*n);e.along+=s*e.direction,n-=s/e.speed,a+=s;let c=tv(e.along/r.length,0,1);if(e.x=r.a.x+(r.b.x-r.a.x)*c,e.y=r.a.y+(r.b.y-r.a.y)*c,e.z=r.a.z+(r.b.z-r.a.z)*c,o-s>ev)break;let l=e.direction>0?r.b:r.a;if(l=t.nodes.get(l.id)??null,!l){e.edge=null;break}i(e,l),(l.edges.length===1||sv(e)<.16)&&(e.wait=.35+sv(e)*1.55)}if(e.moving=a>ev,e.distance+=a,e.phase+=a*Math.PI*2/.43,e.edge){let t=e.edge,n=Math.atan2((t.b.x-t.a.x)*e.direction,(t.b.z-t.a.z)*e.direction);e.heading+=av(n-e.heading)*(1-Math.exp(-r*10))}}}return{sync:a,update:o,get residents(){return n},get graph(){return t},get revision(){return r},snapshot(){return[...n.values()].map(({edge:e,randomState:t,...n})=>({...n,pathIds:e?[...e.pathIds]:[],edgeId:e?.id??null}))},dispose(){n.clear(),t={nodes:new Map,edges:new Map}}}}function pv(e,t){let n=new ut;n.name=`settlement-residents`,e.add(n);let r=t.players?.find(e=>e.id===t.gameplay?.ownerId),i=zl(r),a=new ut,o=vm(a,{color:i.body});o.remove(o.children[0],o.children[1]),bm(Xp(a));let c=a.children[0],l=new Fe(c.geometry,c.material,$_.visible);l.name=`resident-bodies`;let u=Gt(new v({color:16777215,roughness:1,flatShading:!0})),f=new Fe(new d(1,1,1),u,$_.visible*4);f.name=`resident-limbs`;for(let e of[l,f])e.count=0,e.frustumCulled=!1,e.castShadow=e.receiveShadow=!0,e.instanceMatrix.setUsage(xe),n.add(e);for(let e=0;e<$_.visible*4;e++)f.setColorAt(e,e%2?i.body.color:qt.metal.color);let p=fv(t),m=new tt,h=new s,g=new tt,_=[],y=[],b=1/0,x=null,S=0,C=0;function w(e,n){y.length=0;for(let r of p.residents.values())if(r.edge){let i=J(t,e,r);i<n&&y.push({resident:r,d:i})}y.sort((e,t)=>e.d-t.d),_.length=0;for(let e=0;e<Math.min($_.visible,y.length);e++)_.push(y[e].resident);x={x:e.x,z:e.z},S=n,b=0}function T(e){p.sync(e),b=1/0}function E(e,{focus:r={x:0,z:0},mapBlend:i=0,walkingWeight:a=0,visible:o=!0,reducedMotion:s=!1}={}){if(p.update(e),b+=e,n.visible=o&&i<.98,!n.visible){C=0;return}let c=a>.5?$_.walkingRadius:$_.detailRadius;(b>=$_.selectionInterval||!x||S!==c||J(t,r,x)>3)&&w(r,c);let u=0,d=0;for(let e of _){Ke(t,e.x,e.y+.012,e.z,e.heading,m),l.setMatrixAt(u++,m);let n=e.moving&&!s?Math.sin(e.phase)*.31:0;for(let e of[-1,1]){let t=n*e;h.position.set(e*.055,.32-Math.cos(t)*.16,-Math.sin(t)*.16),h.rotation.set(t,0,0),h.scale.set(.075,.32,.1),h.updateMatrix(),g.copy(m).multiply(h.matrix),f.setMatrixAt(d++,g);let r=-t*.65;h.position.set(e*.143,.53-Math.cos(r)*.105,-Math.sin(r)*.105),h.rotation.set(r,0,e*-.035),h.scale.set(.052,.21,.075),h.updateMatrix(),g.copy(m).multiply(h.matrix),f.setMatrixAt(d++,g)}}l.count=C=u,f.count=d,l.instanceMatrix.needsUpdate=f.instanceMatrix.needsUpdate=!0}return{root:n,body:l,limbs:f,sync:T,update:E,snapshot:()=>p.snapshot(),get stats(){return{residents:p.residents.size,visible:C,edges:p.graph.edges.size,revision:p.revision,draws:C?2:0}},dispose(){p.dispose(),n.removeFromParent(),l.dispose(),f.dispose(),l.geometry.dispose(),f.geometry.dispose();for(let e of a.userData.ownedMaterials??[])e.dispose();u.dispose(),Object.values(i).forEach(e=>e.dispose()),_.length=y.length=0}}}function mv(e){let t=document.createElement(`canvas`);t.width=640,t.height=128;let n=t.getContext(`2d`),r=Rl(e);for(let e=1;e<=5;e++){let t=(e-.5)*128;n.beginPath(),n.arc(t,64,49,0,Math.PI*2),n.fillStyle=r.dark.getStyle(),n.fill(),n.beginPath(),n.arc(t,64,45,0,Math.PI*2),n.fillStyle=r.body.getStyle(),n.fill(),n.font=`700 78px system-ui, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillStyle=r.trim.getStyle(),n.fillText(String(e),t,67)}let i=new F(t);return i.colorSpace=ve,i}function hv(e,t,n){let r=mv(n.players.find(e=>e.id===n.gameplay.ownerId)),i=new Qe({map:r,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1});i.onBeforeCompile=e=>{e.vertexShader=`attribute float cityLevel;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <uv_vertex>`,`#include <uv_vertex>
      vMapUv.x = (vMapUv.x + cityLevel - 1.0) / 5.0;`)},i.customProgramCacheKey=()=>`city-level-numerals-v1`;let a=[],o=0,s,c,l,u=new q,d=new q,f=new q,m=new q,h=new tt,g=new q,_=new q,v=new q;function y(n){if(!(n<=o)){c?.removeFromParent(),l?.removeFromParent(),c?.dispose(),l?.dispose(),s?.dispose(),o=Math.max(8,2**Math.ceil(Math.log2(n))),s=new x(1,1),s.setAttribute(`cityLevel`,new Et(new Float32Array(o),1)),c=new Fe(s,i,o),l=new Fe(s,i,o),c.name=`city-levels`,l.name=`city-levels-map`;for(let e of[c,l])e.count=0,e.frustumCulled=!1,e.renderOrder=18,e.instanceMatrix.setUsage(xe);e.add(c),t.add(l)}}function b(e,t,n){_.copy(t).applyMatrix4(e.matrixWorldInverse);let r=e.projectionMatrix.elements,i=r[3]*_.x+r[7]*_.y+r[11]*_.z+r[15];return 2*Math.abs(i)/(Math.max(1,n)*Math.abs(r[5]))}return y(1),{sync(e){a=e,y(a.length)},update({camera:e,mapBlend:t=0,walkingWeight:r=0,viewportHeight:o=800}={}){if(!c||(c.visible=t<.999&&r<.8,l.visible=t>.001&&r<.8,c.count=l.count=0,!e||!c.visible&&!l.visible))return;i.opacity=1-p.smoothstep(r,.1,.8),e.updateMatrixWorld(!0),v.set(0,1,0).applyQuaternion(e.quaternion);let _=0;for(let t of a){if(Ve(n,t.x,t.y??.7,t.z,u),rt(n,t.x,t.z,f),wt(n)&&f.dot(m.copy(e.position).sub(u))<=0||(d.copy(u).project(e),d.z<-1||d.z>1||Math.abs(d.x)>1.08||Math.abs(d.y)>1.08))continue;let r=b(e,u,o);u.addScaledVector(v,r*24),g.setScalar(r*42),h.compose(u,e.quaternion,g),c.setMatrixAt(_,h),l.setMatrixAt(_,h),s.attributes.cityLevel.setX(_,p.clamp(t.level,1,5)),_++}c.count=l.count=_,c.instanceMatrix.needsUpdate=l.instanceMatrix.needsUpdate=s.attributes.cityLevel.needsUpdate=!0},dispose(){c?.removeFromParent(),l?.removeFromParent(),c?.dispose(),l?.dispose(),s?.dispose(),i.dispose(),r.dispose(),a=[]}}}function gv({canvas:e,world:t,parent:n,mapParent:r,markerParent:i=n,markerMapParent:a=r,detail:o,getPlayer:s,onView:c,reducedMotion:l}){let u=H_(t),d=G_(n,r,t),f=pv(n,t),p=hv(i,a,t),m=u.snapshot(),h=`axe`,g=null,_=null,v=null,y=null,b=!0,x=!1,S=!1,C=null,w=!1,T=null,E=``,D=0,O=-1,k=-1,A=-1,j=null,M=[],N=[],P=[],F=[],I=[],L=``,ee=!1,R=new ne,te=new Y,z=new ye(new q(0,1,0),0),B=new q,V=[],H=new q,re=()=>e.focus({preventScroll:!0});function ie(e){h=e,g=null,w=!1,L=``,E=``,re()}let ae=Q_({parent:e.parentElement,playerColor:`#257d70`,onTool:ie,onView:()=>{ie(`axe`),c()},onBuild:()=>{w=!0,re()},onCancel:()=>ie(`axe`)});function oe(e,t,n,r){e.addEventListener(t,n,r),V.push(()=>e.removeEventListener(t,n,r))}oe(e,`pointermove`,t=>{if(h!==`house`||t.buttons)return;let n=e.getBoundingClientRect();g={x:(t.clientX-n.left)/n.width*2-1,y:1-(t.clientY-n.top)/n.height*2}}),oe(e,`pointerleave`,e=>{e.relatedTarget?.closest?.(`.settlement-hud`)||(g=null)}),oe(e,`pointerdown`,t=>{b||x||h!==`house`||t.button!==0||(t.preventDefault(),t.stopImmediatePropagation(),re(),_={id:t.pointerId,x:t.clientX,y:t.clientY},e.setPointerCapture?.(t.pointerId))},!0),oe(e.ownerDocument.defaultView,`pointerup`,t=>{_?.id===t.pointerId&&(w=Math.hypot(t.clientX-_.x,t.clientY-_.y)<5,_=null,e.hasPointerCapture?.(t.pointerId)&&e.releasePointerCapture(t.pointerId))}),oe(e,`pointercancel`,()=>{_=null}),oe(e.ownerDocument.defaultView,`blur`,()=>{_=null,w=!1,T=null});function U(){let e=u.revision!==O;if(e){let e=m.houses.length,t=m.buildings?.length??0;m=u.snapshot(),(O<0||m.houses.length!==e||(m.buildings?.length??0)!==t)&&(d.sync(m.houses,m.paths??[],m.buildings??[]),F=d.meshes,f.sync(m),p.sync(m.cities??[])),O=u.revision}(e||o.placementRevision!==k)&&(k=o.placementRevision,M=[...o.placements,...m.houses,...m.buildings??[]],N=[...o.getCollisionPlacements(),...m.houses,...m.buildings??[]],P=[...o.getTerrainMeshes(),...F],I=[...o.cityStreets,...m.paths??[]])}function se(e){let t=null,n=1/0,r=Math.sin(e.heading),i=Math.cos(e.heading);for(let a of M){if(a.kind!==`tree`||u.isTreeRemoved(a))continue;let o=a.x-e.position.x,s=a.z-e.position.z,c=Math.hypot(o,s);if(c>M_.chopReach||c<1e-6)continue;let l=(o*r+s*i)/c;if(l<.3)continue;let d=c-l*.5;d<n&&(n=d,t=a)}return t}function ce(e){let n;return g&&C&&(te.set(g.x,g.y),R.setFromCamera(te,C),R.ray.intersectPlane(z,B)&&R.ray.direction.y<-.01&&(n={x:B.x,z:B.z})),n||=We(t,e.position.x,e.position.z,Math.sin(e.heading)*3.8,Math.cos(e.heading)*3.8),n}let le=e=>o.hasCoverageAt(e,1);function ue(e,t){let n=b||!C?e.heading:Math.atan2(C.getWorldDirection(H).x,H.z);return{player:e.position,heading:n,enforceReach:b,placements:M,ready:o.hasCoverageAt(t,2),isReadyAt:le}}function de(e){E=e,D=3.2}function fe(e){m.pendingMilestones?.length&&(j={x:e.position.x,z:e.position.z},u.develop({player:e.position,placements:M,ready:S,isReadyAt:le}),U())}return U(),{game:u,art:d,hud:ae,residents:f,get placements(){return U(),M},get placementRevision(){return U(),`${k}:${O}`},get cityStreets(){return U(),I},getCollisionPlacements(){return U(),N},getTerrainMeshes(){return U(),P},keyDown(e){let t=e.key.toLowerCase();return t===`b`?(e.repeat||ie(h===`house`?`axe`:`house`),!0):h===`house`&&[`escape`,`enter`,`e`].includes(t)?(e.repeat||(t===`escape`||t===`e`?ie(`axe`):w=!0),!0):t===`r`},prepareInput(e){return h===`house`&&e.swing&&(w=!0,e.swing=!1),e},onSwing(){let e=s();U();let t=se(e);T=t?{tree:t,time:.22}:null,t||de(`Step closer and face a tree`)},cancelBuild(){ie(`axe`)},update(n,{walking:r,transitioning:i,camera:a,mapBlend:c=0,walkingWeight:_=Number(r),focus:M,viewportHeight:N=800}={}){if(ee)return;b=r,x=i,C=a;let P=s();o.updateTrees(l?.matches?1:n),U(),S=!!P?.initialized&&o.hasCoverageAt(P.position,2);let F=S&&m.pendingMilestones?.length&&(!j||J(t,j,P.position)>1);if(S&&(A!==k||u.developmentSearching||F)&&(A=k,fe(P)),D>0&&(D-=n,D<=0&&(E=``)),T&&(T.time-=n,T.time<=0)){let e=T.tree;if(T=null,b&&J(t,e,P.position)<=M_.chopReach&&!u.isTreeRemoved(e)){let t=u.chop(e,{player:P.position});t.ok&&(o.fellTree(t.treeId,{direction:{x:e.x-P.position.x,z:e.z-P.position.z}}),de(`+${t.logs} logs`),U(),fe(P))}}if(y=S&&b&&!x&&h===`axe`?se(P):null,S&&h===`house`&&!x){let e=ce(P),t=ue(P,e),n=`${e.x}:${e.z}:${P.position.x}:${P.position.z}:${t.heading}:${b}:${t.ready}:${O}:${k}`;if(n!==L&&(v=u.evaluateBuild(e,t),L=n),w){let t=u.build(e,ue(P,e));t.ok?(de(t.connected?`House built · city expanded`:t.cityHouseCount>1?`House built · settlement expanded`:`House built · new outpost`),U(),h=`axe`,g=null):(E=``,D=0)}}else v=null,L=``;w=!1,d.preview(v,{visible:h===`house`&&S&&!x,targetTree:y}),d.update({mapBlend:c});let I=m.houses.filter(e=>e.connected).length,R=v?.house??P?.position??{x:0,z:0},te=null,z=1/0;for(let e of m.clusters??m.cities??[]){let n=J(t,e,R);n<z&&(z=n,te=e)}v?.connectionHouseId?te=(m.clusters??[]).find(e=>e.houseIds.includes(v.connectionHouseId))??te:v&&!v.connectionHouseId&&(te=null);let B=(m.buildings??[]).filter(e=>e.cityId===te?.id),V=(m.pendingDevelopments??[]).filter(e=>e.cityId===te?.id).map(e=>e.type);f.update(n,{focus:M??P.position,mapBlend:c,walkingWeight:_,visible:S,reducedMotion:l?.matches}),p.update({camera:C,mapBlend:c,walkingWeight:_,viewportHeight:N}),ae.update({logs:m.logs,houses:m.houses.length,connectedHouses:I,cityHouses:te?.houseCount??1,cityLevel:te?.level??0,buildings:B,pendingMilestones:V,tool:h,walking:b,ready:S,canBuild:!!v?.valid,connected:v?.connected??!0,reason:v?.reason??``,targetTree:!!y,message:E}),Object.assign(e.dataset,{gameplay:`settlement`,logs:String(m.logs),houses:String(m.houses.length),connectedHouses:String(I),paths:String(m.paths?.length??0),choppedTrees:String(m.removedTreeIds.length),buildMode:String(h===`house`),buildValid:String(!!v?.valid),buildReason:v?.code??``,cities:String(m.cities?.length??0),cityLevels:(m.cities??[]).map(e=>e.level).join(`,`),residents:String(f.stats?.residents??f.stats?.count??0),civicBuildings:String(m.buildings?.length??0),buildingTypes:(m.buildings??[]).map(e=>e.buildingType).join(`,`),pendingMilestones:(m.pendingMilestones??[]).join(`,`),buildX:v?.house?.x?.toFixed(2)??``,buildZ:v?.house?.z?.toFixed(2)??``,buildRotation:v?.house?.rotation?.toFixed(4)??``,targetTree:y?.id??``})},dispose(){ee=!0;for(let e of V)e();ae.dispose(),d.dispose(),f.dispose(),p.dispose()}}}var _v=document.querySelector(`#world`),vv=new A,yv=new A,bv=_v.getAttribute(`aria-label`);vv.background=yv.background=X.backdrop,vv.fog=new st(X.backdrop,1e6,2e6);var xv=new ma({canvas:_v,antialias:!0,powerPreference:`high-performance`});xv.setPixelRatio(Math.min(devicePixelRatio,1.6)),xv.shadowMap.enabled=!0,xv.shadowMap.type=1,xv.toneMapping=4,xv.toneMappingExposure=1.15,xv.outputColorSpace=ve,xv.info.autoReset=!1;var Sv=new ge(-60,60,45,-45,.1,500);Sv.position.set(115,125,145),Sv.lookAt(0,1,0);var Cv=new Me(Ht(.94,.035,221),Ht(.55,.025,169),2.15);vv.add(Cv);var wv=new D(Ht(.98,.04,84),3.25);wv.position.set(-65,110,65),wv.castShadow=!0,wv.shadow.mapSize.set(2048,2048),Object.assign(wv.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:260}),wv.shadow.normalBias=.025,wv.shadow.bias=-15e-5,wv.shadow.radius=3,vv.add(wv,wv.target);var Tv=new D(Ht(.85,.035,218),.65);Tv.position.set(40,30,-40),vv.add(Tv,Tv.target);var Ev=new a(new x(2e3,2e3),new v({color:X.backdrop,roughness:1}));Ev.rotation.x=-Math.PI/2,Ev.position.y=-5.7,Ev.receiveShadow=!0,vv.add(Ev);var Dv,Ov,kv,Av=[],jv,Mv,Nv,Pv,Fv,Iv,Lv,Rv,zv,Bv,Vv,Hv,Uv,Wv=!1,Gv=!1,Kv=!1,qv,Jv=0,Yv=0,Xv=0,Zv=!1,Qv=null,$v=0,ey=0,ty=0,ny=matchMedia(`(prefers-reduced-motion: reduce)`),ry=a_({reducedMotion:ny}),iy=Yt({scene:vv,mapScene:yv,sky:Cv,sun:wv,fill:Tv,renderer:xv}),ay,oy=pg(vv,yv),sy=$g(vv),cy=new q,ly=ny.matches;ny.addEventListener(`change`,e=>{ly=e.matches});var uy=lo(xv),dy=Kh(xv),fy=oo({canvas:_v,camera:Sv,scene:vv,mapScene:yv,reducedMotion:ny,getTrains:()=>Av,getWorldRoot:()=>Ov,getWorld:()=>Dv,isDetailReady:()=>!!kv?.ready&&Zv,onPause:()=>{ly=!ly},onRegenerate:()=>{if(!Dv)return;let e=String(Number.isFinite(Number(Dv.seed))?Number(Dv.seed)+1:Date.now());zy({...Nv,seed:e}).catch(Ry);let t=new URL(location.href);t.searchParams.set(`seed`,e),history.replaceState(null,``,t)}}),{navigation:py,controls:my}=fy,hy=Qg(_v,{isActive:()=>Gv||ry.active,onToggle:()=>Gv?Dy():Ey(),onExit:Dy,onKey:e=>qv?.keyDown(e)??!1}),gy=new q,_y=(e,t,n)=>{let r=p.clamp((n-e)/(t-e),0,1);return r*r*(3-2*r)};function vy(){return zv.cameraTarget.clone()}function yy(){let e=wt(Dv);return e?{center:new q(0,-e.radius,0),radius:e.radius}:void 0}function by(){return ry.active?ry.camera:Gv?zv.camera:Sv}function xy(){if(ry.active)return ry.target.clone();if(Gv)return vy();let e=fy.renderTarget;return Ve(Dv,e.x,e.y,e.z,new q)}function Sy(){let e=by(),t=e.clone();return t.isOrthographicCamera=!!e.isOrthographicCamera,t.isPerspectiveCamera=!t.isOrthographicCamera,t}function Cy(){if(Dv.gameplay)return Dv.gameplay.spawn.heading??0;let e=Dv.cities[0],t=e&&Uv?K(Dv,e,Uv,{}):null;return t?Math.atan2(t.x,t.z):Math.atan2(my.target.x-py.position.x,my.target.z-py.position.z)}function wy(){if(!zv||zv.initialized||!Uv||!kv.hasCoverageAt(Uv,2))return;let e=Ov.scale.y;Ov.scale.set(1,1,1),Ov.updateMatrixWorld(!0),zv.enter(Uv,Cy())&&(qv?(Gv=!0,fy.setInputEnabled(!1),Wv=!0,_v.style.cursor=`grab`):zv.exit(),zv.root.visible=!0,Uv={...zv.position}),Ov.scale.y=e,Ov.updateMatrixWorld(!0)}function Ty(){fy.setInputEnabled(!Gv),hy.sample(0),_v.dataset.view=Gv?`person`:fy.mode,_v.dataset.cameraTransition=`false`,_v.dataset.walkingWeight=Gv?`1.000`:`0.000`}function Ey(){if(!zv||Gv)return;let e=Sy(),t=xy(),n=Ov.scale.y;Ov.scale.set(1,1,1),Ov.updateMatrixWorld(!0),zv.enter(Uv,Cy())?(Gv=!0,fy.setInputEnabled(!1),Jv=Yv,ry.begin({fromCamera:e,toCamera:zv.camera,fromTarget:t,toTarget:vy(),toWalking:!0,sphere:yy()}),Wv=!0,ry.active||Ty(),_v.dataset.view=`person`,_v.style.cursor=`grab`,rb()):(Ov.scale.y=n,Ov.updateMatrixWorld(!0))}function Dy(){if(!zv||!Gv)return;qv?.cancelBuild();let e=Sy(),t=xy(),n=zv.heading,r=zv.exit();zv.root.visible=!0,hy.clear(),Gv=!1,fy.setInputEnabled(!1),fy.overlook(r,{heading:n,zoom:fy.zoomScale*1.35});let i=fy.renderTarget;Ve(Dv,i.x,i.y,i.z,gy),Jv=Yv,ry.begin({fromCamera:e,toCamera:Sv,fromTarget:t,toTarget:gy,toWalking:!1,sphere:yy()}),ry.active||Ty(),rb()}var Oy=170,ky=112,Ay=0,jy=new q(115,125,145).normalize(),My=new q(-72,94,54),Ny=new tt,Py=new q;function Fy(){Mv&&=(Mv.dispose(),null)}function Iy(){if(fy.reset(),Dv.surface?.complete){let e=Dv.surface.radius,t=De(Dv,Dv.camera?.longitude??10,Dv.camera?.latitude??25);Ev.visible=!1,Oy=ky=e*2.2,fy.setScale(ky/230),my.target.set(t.x,1.3,t.z);let n=new q().setFromSphericalCoords(1,Math.PI/4,0);py.position.copy(my.target).addScaledVector(n,e*3),py.zoom=1,py.far=e*8,my.update(),By(),fy.setHome();return}let e=Dv.outline.map(e=>e[0]),n=Dv.outline.map(e=>e[1]),r=Math.max(...e)-Math.min(...e),i=Math.max(...n)-Math.min(...n),a=Math.hypot(r,i),o=Math.max(0,...Dv.mountains.map(e=>e.height));Ev.visible=!wt(Dv);let s=Dv.camera?.startInDetail===!0;fy.setScale(s?1:Math.max(1,a/410)),my.target.set((Math.max(...e)+Math.min(...e))/2,1.3,(Math.max(...n)+Math.min(...n))/2);let c=Dv.camera?.northUp?new q(0,125,180).normalize():jy;py.position.copy(my.target).addScaledVector(c,a*1.5+o),py.zoom=1,py.far=Math.max(500,a*5+o*3),my.update(),Ev.position.x=my.target.x,Ev.position.z=my.target.z,Ev.scale.setScalar(Math.max(1,a/500));let l=py.quaternion.clone().invert(),u=Dv.outline.flatMap(([e,t])=>[new q(e,-3.4,t),new q(e,4,t)]);Dv.mountains.forEach(e=>u.push(new q(e.x,e.height,e.z)));let d=0,f=0;if(u.forEach(e=>{e.sub(my.target).applyQuaternion(l),d=Math.max(d,Math.abs(e.x)),f=Math.max(f,Math.abs(e.y))}),fy.zoomScale>1){let e=py.clone(),n=new q().subVectors(py.position,my.target),r=new t().setFromVector3(n);r.phi=1e-5,e.position.copy(my.target).add(n.setFromSpherical(r)),e.lookAt(my.target);let i=e.quaternion.clone().invert();for(let[e,t]of Dv.outline){let n=new q(e,0,t).sub(my.target).applyQuaternion(i);d=Math.max(d,Math.abs(n.x)),f=Math.max(f,Math.abs(n.y))}}Oy=d*2+Math.max(10,d*.2),ky=f*2+Math.max(10,f*.2),fy.setScale(s?1:Math.max(fy.zoomScale,ky/230)),By(),fy.setHome()}function Ly(e=fy.renderTarget,t=0){let n=Math.max((Sv.right-Sv.left)/Sv.zoom,(Sv.top-Sv.bottom)/Sv.zoom),r=Math.min(480,Math.max(45,n*.72)),i=p.lerp(r,18,t),a=i*2/2048,o=Math.round(e.x/a)*a,s=Math.round(e.z/a)*a;wt(Dv)?(Ve(Dv,o,0,s,wv.target.position),Ne(Dv,o,s,Ny),Cv.position.set(0,1,0).applyMatrix4(Ny),Py.copy(My).applyMatrix4(Ny),wv.position.copy(wv.target.position).addScaledVector(Py,Math.max(1,i/95)),Tv.position.set(40,30,-40).applyMatrix4(Ny).add(wv.target.position),Tv.target.position.copy(wv.target.position)):(Cv.position.set(0,1,0),wv.target.position.set(o,0,s),wv.position.copy(wv.target.position).addScaledVector(My,Math.max(1,i/95)),Tv.position.set(40,30,-40),Tv.target.position.set(0,0,0));let c=wv.shadow.camera;Math.abs(c.right-i)>.1&&(Object.assign(c,{left:-i,right:i,top:i,bottom:-i,far:Math.max(260,i*4)}),c.updateProjectionMatrix())}function Ry(e){e.name!==`AbortError`&&(_v.dataset.error=e.message,console.error(e))}async function zy(e={}){let t=++Xv,n=structuredClone(e);ty=performance.now(),_v.dataset.loading=`true`,delete _v.dataset.error,Rv?.dispose();let r=Gh();Rv=r;let i,a,o,s,c,l;try{let e=await r.request(`generate`,n);if(t!==Xv)throw new DOMException(`World replaced`,`AbortError`);let u=e.world;return l=new ut,i=Lu(new ut,u),c=Fh(l,i.root.getObjectByName(`map-static`),u),s=fg(u),s&&(l.add(s.detail),i.root.add(s.map)),a=Eh(l,u),o=Mh(l,u,{maxPending:3,requestChunk:(e,t)=>r.request(`chunk`,e,t),uploadMesh:e=>dy.upload(e)}),Gv=!1,hy.clear(),fy.setInputEnabled(!0),ry=a_({reducedMotion:ny}),Jv=Yv=0,vv.fog.near=1e6,vv.fog.far=2e6,sy.root.visible=!1,qv?.dispose(),qv=null,zv?.dispose(),Bv?.dispose(),Vv?.dispose(),Hv?.dispose(),Fy(),Iv?.dispose(),Fv?.dispose(),kv?.dispose(),jv?.dispose(),Ov?.removeFromParent(),Pv?.dispose(),Lv?.dispose(),Lv=r,Rv=null,Dv=u,Ov=l,jv=a,Av=jv.trains,kv=o,Pv=i,Fv=s,Iv=c,yv.add(Pv.root),vv.add(l),Nv=n,Ay=0,Zv=!1,Qv=null,$v=e.milliseconds,Iy(),Dv.gameplay&&(qv=gv({canvas:_v,world:Dv,parent:l,mapParent:Pv.root,markerParent:vv,markerMapParent:yv,detail:kv,getPlayer:()=>zv,onView:()=>Gv?Dy():Ey(),reducedMotion:ny})),zv=Cg(l,Dv,{getCollisionPlacements:()=>qv?qv.getCollisionPlacements():kv.getCollisionPlacements(),getTerrainMeshes:()=>qv?qv.getTerrainMeshes():kv.getTerrainMeshes(),isReadyAt:(e,t)=>kv.hasCoverageAt({x:e,z:t},1)}),zv.resize(innerWidth/innerHeight),Uv=zv.prepareSpawn(Dv.gameplay?.spawn??Dv.cities[0]??my.target),Bv=Zg(l,Dv),Kv=!1,Vv=s_(vv,yv,Dv),Hv=l_(l,Dv),Uv&&Bv.update(Uv,{visible:!1}),_v.dataset.cities=String(Dv.cities.length),_v.dataset.trains=String(Av.length),_v.dataset.surface=wt(Dv)?`sphere`:`plane`,qv?_v.setAttribute(`aria-label`,`Your island settlement. WASD moves, Shift runs, Space jumps. Face a nearby tree and press E or click to chop. Each tree gives 2 to 4 logs. Press B to preview a house costing 10 logs; move the pointer to aim, click or Enter to build, Escape to cancel. Red means blocked or unaffordable. House lots follow your facing direction, with doors more likely to face nearby homes. Three homes form a city and connect by paths. City levels 1 through 5 unlock at 3, 6, 9, 12 and 15 homes, marked by a well, market, water tower, fountain garden and town hall. Residents wander the paths. V switches between your traveller and overview. Day and night each last five minutes.`):_v.setAttribute(`aria-label`,bv),document.activeElement===document.body&&_v.focus({preventScroll:!0}),ay===void 0&&(ay=performance.now()),_v.dataset.loading=`false`,ey=performance.now()-ty,rb(),Dv}catch(e){throw t===Xv&&(_v.dataset.loading=`false`,Rv=null),c?.dispose(),s?.dispose(),o?.dispose(),a?.dispose(),i?.dispose(),l?.removeFromParent(),r.dispose(),e}}function By(){let e=innerWidth,t=innerHeight,n=e/t,r=Math.max(ky,Oy/n);py.left=-r*n/2,py.right=r*n/2,py.top=r/2,py.bottom=-r/2,py.updateProjectionMatrix(),xv.setSize(e,t),zv?.resize(n),ry.active&&(ry.finish(),Ty(),Gv||fy.updatePresentation(0)),uy.resize(Math.round(e*xv.getPixelRatio()),Math.round(t*xv.getPixelRatio()))}window.addEventListener(`resize`,By),By();var Vy=new Float32Array(180),Hy=new Float32Array(180),Uy=0,Wy=0,Gy=0,Ky=0,qy=performance.now(),Jy,Yy=0,Xy=0,Zy=0,Qy=``,$y=0,eb=0,tb=0,nb=0;function rb(){Uy=Wy=0,Yy=Xy=Zy=0,Qy=``,Gy=performance.now()}function ib(e,t,n){if(Vy[Wy]=t,Hy[Wy]=n,Wy=(Wy+1)%Vy.length,Uy=Math.min(Uy+1,Vy.length),(ry.active||fy.blend>.001&&fy.blend<.999)&&(n>Yy&&(Qy=JSON.stringify({traffic:$y,detail:eb,view:tb,render:nb,blend:fy.blend})),Zy++,Yy=Math.max(Yy,n),Xy=Math.max(Xy,t)),e-Gy<1e3)return;Gy=e;let r=e=>[...e.subarray(0,Uy)].sort((e,t)=>e-t)[Math.floor((Uy-1)*.95)]??0,i=Av.reduce((e,t)=>e+ +!!t.state.active,0);Object.assign(_v.dataset,{frameP95:r(Vy).toFixed(2),cpuP95:r(Hy).toFixed(2),drawCalls:String(xv.info.render.calls),triangles:String(xv.info.render.triangles),geometries:String(xv.info.memory.geometries),activeTrains:String(i),mapNetworkVisibility:Pv.stats.networkVisibility.toFixed(3),visibleTrains:String(jv.stats?.visibleTrains??0),detailChunks:String(kv.stats?.chunks??kv.stats?.loadedChunks??0),detailReady:String(kv.ready),detailSettled:String(kv.settled),detailRevealing:String(kv.stats.revealingChunks),detailBase:String(Iv.root.visible),detailRequired:String(kv.stats.requiredChunks??0),detailPending:String(kv.stats.pendingChunks??0),detailWorkers:String(Lv.stats.workers),detailWorkerMs:String(Math.round(Lv.stats.lastChunkMs)),detailBytes:String(kv.stats.bytes??0),detailLimited:String(kv.stats.coverageLimited??!1),detailErrors:String(kv.stats.errors??0),transitionCpuMax:Yy.toFixed(2),transitionFrameMax:Xy.toFixed(2),transitionFrames:String(Zy),transitionPeak:Qy,trafficCpu:$y.toFixed(2),detailCpu:eb.toFixed(2),viewCpu:tb.toFixed(2),renderCpu:nb.toFixed(2),simulationSeconds:Ay.toFixed(1),simulationCpu:(jv.stats.simulationMs??0).toFixed(2),poseCpu:(jv.stats.poseMs??0).toFixed(2),generationMs:$v.toFixed(0),loadMs:ey.toFixed(0),night:iy.night.toFixed(3),dayPhase:iy.phase,dayElapsed:((e-(ay??e))/1e3).toFixed(1),walking:String(Gv),playerX:zv?.position.x.toFixed(3),playerY:zv?.position.y.toFixed(3),playerZ:zv?.position.z.toFixed(3),playerGrounded:String(zv?.grounded),playerSwings:String(zv?.stats.swings??0),walkingInstances:String(Bv?.stats.instances??0),lifeInstances:String(Mv?.stats?.instances??Mv?.stats?.active??0),lifeSheep:String(Mv?.stats?.sheep??0),lifeBirds:String(Mv?.stats?.birds??0)})}function ab(e){let t=performance.now(),n=e-qy,r=p.clamp(n/1e3,0,.05);if(qy=e,Dv){ly||(Ay+=r),iy.update(r,Ay,(e-(ay??e))/1e3),oy.update(),vv.fog.color.copy(vv.background);let i=performance.now();if(jv.update(ly?0:r),$y=performance.now()-i,i=performance.now(),ry.active)hy.sample(0),ry.update(r),ry.active||Ty();else if(Gv){let e=hy.sample(r),t=zv.stats.swings;zv.update(r,qv?qv.prepareInput(e):e),zv.stats.swings>t&&qv?.onSwing()}else fy.updateNavigation(r);!Gv&&!ry.active&&fy.updatePresentation(r);let a=Gv||ry.active,o=ry.active?ry.walkingWeight:Number(Gv),s=by(),c=a?zv.position:my.target,l=ry.active?Jv*(1-_y(0,.3,ry.progress)):Gv?0:fy.blend;Yv=l,a&&Ov.scale.set(1,1,1);let u=Math.max((Sv.right-Sv.left)/Sv.zoom,(Sv.top-Sv.bottom)/Sv.zoom),d=ry.active&&!Gv?Math.min(140,Math.max(40,u*.55)):40,f=zv?.initialized?zv.position:Uv;if(kv.update(s,{mapBlend:a||fy.wantsDetail?0:1,target:c,budgetMs:2,groundFocus:f,groundRadius:d,groundOnly:a,coverageCameras:a?void 0:fy.coverageCameras,retainVisible:a||fy.blend<1}),wy(),f=zv?.initialized?zv.position:Uv,qv?.update(ly&&!Gv?0:r,{walking:Gv,transitioning:ry.active,camera:s,mapBlend:l,walkingWeight:o,focus:c,viewportHeight:innerHeight}),zv?.initialized&&(zv.root.visible=!0),f&&Bv.update(f,{placements:qv?.placements??kv.placements,revision:qv?.placementRevision??kv.placementRevision,cityStreets:qv?.cityStreets??kv.cityStreets,visible:o>.001,visibilityWeight:o,time:Ay,night:iy.night}),Bv.stats.ready&&!Kv){for(let e of Bv.root.children)dy.upload(e);Kv=!0}if(vv.fog.near=Math.exp(p.lerp(Math.log(1e6),Math.log(28),o)),vv.fog.far=Math.exp(p.lerp(Math.log(2e6),Math.log(85),o)),!Zv&&!Qv){let e=Xv;xv.shadowMap.enabled=!0,Mv||=lg(Ov,Dv),Qv=uy.prepare(vv,yv,Sv).then(()=>{e===Xv&&(Zv=!0)}).catch(t=>{e===Xv&&(Qv=null,Ry(t))})}eb=performance.now()-i,i=performance.now();let m=a?zv.renderPosition:fy.renderTarget;Hv.update(iy.clockTime,{focus:m,placements:qv?.placements??kv.placements,revision:qv?.placementRevision??kv.placementRevision,visible:l<.999,reducedMotion:ny.matches}),kv.updateVisibility(s,{dt:r,reveal:Zv&&l<.999,reducedMotion:ny.matches||Wv}),Wv=!1,Iv.root.visible=a||!kv.settled,jv.updateView(s,{mapBlend:l,focus:m}),l<.999&&(Ly(m,o),Mv||=lg(Ov,Dv),Mv.update(Ay,{focus:m,placements:kv.lifePlacements,revision:kv.lifeRevision,detailBlend:1-l,reducedMotion:ny.matches,night:Ut.night.value})),Mv&&(Mv.root.visible=l<.999),cy.subVectors(wv.position,wv.target.position).normalize(),sy.update(s,{visible:o>.001,strength:o,night:iy.night,sunDirection:cy,horizonColor:vv.background}),Pv.update(Av,{visible:l>.001,camera:Sv,viewportHeight:innerHeight,poseBuffer:jv.poseBuffer,dt:r,reducedMotion:ny.matches}),Vv.update({position:zv.renderPosition,initialized:zv.initialized,camera:s,mapBlend:l,walking:Gv,walkingWeight:o,viewportHeight:innerHeight}),zv.root.visible=zv.initialized&&(a||l<.999&&Vv.characterReadable),_v.dataset.view=Gv?`person`:fy.mode,_v.dataset.cameraTransition=String(ry.active),_v.dataset.walkingWeight=o.toFixed(3),_v.dataset.mapBlend=l.toFixed(3),_v.dataset.characterVisible=String(zv.initialized&&zv.root.visible),_v.dataset.characterMarker=String(Vv.root.visible||Vv.mapRoot.visible),tb=performance.now()-i,i=performance.now(),xv.info.reset(),xv.shadowMap.enabled=l<.999,uy.render(vv,yv,s,l),nb=performance.now()-i,ib(e,n,performance.now()-t),Ky++,document.documentElement.dataset.ready=`true`}else xv.render(yv,Sv);Jy=requestAnimationFrame(ab)}document.addEventListener(`visibilitychange`,()=>{document.hidden?cancelAnimationFrame(Jy):(qy=performance.now(),rb(),Jy=requestAnimationFrame(ab))}),Jy=requestAnimationFrame(ab),window.__railway={get ready(){return Ky>0},get time(){return Ay},get paused(){return ly},get trains(){return Av.map(e=>({id:e.state.id,ownerId:e.state.ownerId,homeCityId:e.state.homeCityId,x:e.parts[0].position.x,y:e.parts[0].position.y,z:e.parts[0].position.z,cars:e.parts.length}))},get render(){return{...xv.info.render,geometries:xv.info.memory.geometries,...jv?.stats,...kv?.stats}},get camera(){return{zoom:Sv.zoom,width:innerWidth,height:innerHeight,mode:Gv?`person`:fy.mode,mapBlend:Yv,following:fy.selected,transitioning:ry.active}}},window.railway=Object.freeze({loadWorld:e=>zy(e).then(e=>structuredClone(e)),exportWorld:()=>structuredClone(Nv),inspectWorld:()=>structuredClone(Dv),generateWorld:Il,validateWorld:Ll,createStressWorld:Ih});var ob=new URLSearchParams(location.search);try{await zy(await Wh(ob,location.href))}catch(e){Ry(e)}