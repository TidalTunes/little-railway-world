import {Matrix4,Vector3} from 'three';
import {projectGeographic} from './europe-projection.js';

/** Mean Earth radius, with the same uniform meter/world scale as Europe. */
export const EARTH_SURFACE_RADIUS=6371008.8/3000;
/** Pre-warp edge budget: at Europe's radius, an 8-unit chord sags ~0.004 units. */
export const SURFACE_MAX_SEGMENT=8;
const radians=Math.PI/180,degrees=180/Math.PI,preparedSurfaces=new WeakMap();
const finite=Number.isFinite;
const halfPi=Math.PI/2,twoPi=Math.PI*2;
const wrapAngle=angle=>((angle+Math.PI)%twoPi+twoPi)%twoPi-Math.PI;

/** Validate and clone serializable authoring metadata. No rendering state escapes. */
export function normalizeSurface(surface){
  if(surface==null)return null;
  const fail=message=>{throw new TypeError(`Invalid world surface: ${message}`);};
  if(surface.type!=='sphere')fail('type must be sphere');
  if(!finite(surface.radius)||surface.radius<=0)fail('radius must be finite and positive');
  const p=surface.projection;
  if(!p||!['lambert-conformal-conic','equirectangular'].includes(p.type))fail('sphere requires a supported geographic generation chart');
  const fullChart=p.type==='equirectangular';
  if(!finite(p.centralLongitude)||!finite(p.centralLatitude)||(fullChart?Math.abs(p.centralLatitude)>90:Math.abs(p.centralLatitude)>=90))fail('projection origin must be finite and within its latitude domain');
  if(fullChart){
    if(!finite(p.radius)||p.radius<=0)fail('equirectangular chart radius must be finite and positive');
  }else{
    if(!finite(p.eccentricity)||p.eccentricity<0||p.eccentricity>=1)fail('projection eccentricity must be in [0,1)');
    if(!finite(p.coneConstant)||p.coneConstant<=0||p.coneConstant>1||!finite(p.radialConstant)||p.radialConstant<=0||!finite(p.originRadius)||p.originRadius<=0)
      fail('projection requires valid northern-hemisphere LCC constants');
  }
  if(surface.complete!==undefined&&typeof surface.complete!=='boolean')fail('complete must be a boolean');
  const origin=surface.origin??{longitude:p.centralLongitude,latitude:p.centralLatitude};
  if(!finite(origin.longitude)||!finite(origin.latitude)||(fullChart?Math.abs(origin.latitude)>90:Math.abs(origin.latitude)>=90))fail('surface origin must be finite and within its latitude domain');
  return {type:'sphere',radius:surface.radius,...(surface.complete!==undefined?{complete:surface.complete}:{}),origin:{longitude:origin.longitude,latitude:origin.latitude},projection:structuredClone(p)};
}

/** The world remains a planar generation chart unless this metadata is present. */
export function surfaceFor(world){return world?.surface??null;}

function prepared(world){
  const source=surfaceFor(world);if(!source)return null;
  let state=preparedSurfaces.get(source);
  if(!state){
    const surface=normalizeSurface(source),p=surface.projection;
    state={surface,p,radius:surface.radius,longitude:surface.origin.longitude*radians,
      sinOrigin:Math.sin(surface.origin.latitude*radians),cosOrigin:Math.cos(surface.origin.latitude*radians),
      x:NaN,z:NaN};
    preparedSurfaces.set(source,state);
  }
  return state;
}

/** Geographic degrees -> generation chart. Longitude is intentionally not
 * wrapped: both -180 and +180 must remain available to close seam polygons.
 */
export function surfaceChartCoordinates(world,longitude,latitude,target={}){
  const s=prepared(world);
  if(!s)throw new TypeError('Geographic conversion requires a spherical world');
  if(!finite(longitude)||!finite(latitude)||Math.abs(latitude)>90)throw new RangeError('Geographic coordinates require finite longitude and latitude within [-90,90]');
  if(s.p.type==='equirectangular'){
    target.x=(longitude-s.p.centralLongitude)*radians*s.p.radius;
    target.z=(s.p.centralLatitude-latitude)*radians*s.p.radius;
  }else{
    const chart=projectGeographic(s.p,longitude,latitude);target.x=chart.x;target.z=chart.z;
  }
  return target;
}

/** Generation chart -> geographic degrees. Unwrapped chart longitude is kept. */
export function surfaceGeographicCoordinates(world,x,z,target={}){
  const s=at(world,x,z);
  if(!s)throw new TypeError('Geographic conversion requires a spherical world');
  target.longitude=s.longitudeAt*degrees;target.latitude=s.latitudeAt*degrees;return target;
}

/** Geographic chart inverse. Ellipsoidal LCC follows PROJ's rho/theta inverse
 * and iterative phi2; equirectangular coordinates are angular radians × radius.
 * https://proj.org/en/stable/operations/projections/lcc.html
 * The stored local east/up/south vectors are expressed in the origin's frame.
 */
function at(world,x,z){
  const state=prepared(world);if(!state)return null;
  if(x===state.x&&z===state.z)return state;
  if(!finite(x)||!finite(z))throw new TypeError('Surface chart coordinates must be finite');
  const {p}=state;
  let latitude,longitude,theta=0,rho;
  if(p.type==='equirectangular'){
    latitude=p.centralLatitude*radians-z/p.radius;
    // Float32 chart vertices may overshoot a pole by a small rounding error.
    // Clamp that rounding only; an actually invalid chart must not silently fold.
    if(Math.abs(latitude)>halfPi+1e-6)throw new RangeError('Equirectangular chart latitude must be between the poles');
    latitude=Math.max(-halfPi,Math.min(halfPi,latitude));
    longitude=p.centralLongitude*radians+x/p.radius;
  }else{
    rho=Math.hypot(x,z+p.originRadius);
    if(rho<1e-12)throw new RangeError('The LCC pole has no unique chart tangent frame');
    theta=Math.atan2(x,z+p.originRadius);
    const t=Math.pow(rho/p.radialConstant,1/p.coneConstant);
    latitude=halfPi-2*Math.atan(t);
    for(let i=0;i<12;i++){
      const es=p.eccentricity*Math.sin(latitude);
      const next=halfPi-2*Math.atan(t*Math.pow((1-es)/(1+es),p.eccentricity/2));
      if(Math.abs(next-latitude)<1e-14){latitude=next;break;}
      latitude=next;
    }
    longitude=p.centralLongitude*radians+theta/p.coneConstant;
  }
  const delta=wrapAngle(longitude-state.longitude),sl=Math.sin(latitude),cl=Math.abs(latitude)===halfPi?0:Math.cos(latitude),sd=Math.sin(delta),cd=Math.cos(delta);
  const {sinOrigin:s0,cosOrigin:c0}=state;
  state.ux=cl*sd;state.uy=sl*s0+cl*cd*c0;state.uz=cl*cd*s0-sl*c0;
  state.ex=cd;state.ey=-sd*c0;state.ez=-sd*s0;
  state.sx=sl*sd;state.sy=sl*cd*c0-cl*s0;state.sz=sl*cd*s0+cl*c0;
  state.cosTheta=Math.cos(theta);state.sinTheta=Math.sin(theta);
  // Exact differential of inverse ellipsoidal LCC followed by a true sphere.
  // The sphere/ellipsoid conversion has slightly unequal east/north scales;
  // retaining both is necessary for correct slopes and inverse-transpose normals.
  if(p.type==='equirectangular'){
    state.eastScale=cl/p.radius;state.southScale=1/p.radius;
  }else{
    const e2=p.eccentricity*p.eccentricity,q=(1-e2)/(cl*(1-e2*sl*sl));
    state.eastScale=cl/(p.coneConstant*rho);state.southScale=1/(p.coneConstant*rho*q);
  }
  state.longitudeAt=longitude;state.latitudeAt=latitude;
  state.x=x;state.z=z;
  return state;
}

function radialDistance(state,y){
  const distance=state.radius+y;
  if(!finite(y)||distance<=0)throw new RangeError('Surface elevation must be finite and above the sphere center');
  return distance;
}

/** Map generation-chart x/elevation/z to the exact sphere. Reuses target. */
export function surfacePoint(world,x,y,z,target=new Vector3()){
  const s=at(world,x,z);if(!s)return target.set(x,y,z);
  const r=radialDistance(s,y);
  return target.set(r*s.ux,r*s.uy-s.radius,r*s.uz);
}

/** Outward radial unit normal; independent of terrain elevation and slope. */
export function surfaceNormal(world,x,z,target=new Vector3()){
  const s=at(world,x,z);return s?target.set(s.ux,s.uy,s.uz):target.set(0,1,0);
}

/** Exact Jacobian-vector product, not normalized. Includes radial y derivative.
 * Use this for transformed train axes, velocities, and terrain slope tangents.
 */
export function surfaceTangent(world,x,y,z,dx,dy,dz,target=new Vector3()){
  const s=at(world,x,z);if(!s)return target.set(dx,dy,dz);
  const r=radialDistance(s,y),east=r*s.eastScale*(s.cosTheta*dx-s.sinTheta*dz),south=r*s.southScale*(s.sinTheta*dx+s.cosTheta*dz);
  return target.set(east*s.ex+dy*s.ux+south*s.sx,east*s.ey+dy*s.uy+south*s.sy,east*s.ez+dy*s.uz+south*s.sz);
}

/** Rotation-only right-handed frame: exact chart+x tangent, radial up, x×up.
 * Its orthonormal z differs very slightly from the exact chart+z differential;
 * use surfaceTangent for all three columns when physical chart scale matters.
 * At an equirectangular pole, longitude is not unique: its supplied longitude
 * defines a stable east direction even though the exact x derivative is zero.
 */
export function surfaceFrame(world,x,z,target=new Matrix4()){
  const s=at(world,x,z);if(!s)return target.identity();
  const e=s.eastScale*s.cosTheta,south=s.southScale*s.sinTheta;
  let xx=e*s.ex+south*s.sx,xy=e*s.ey+south*s.sy,xz=e*s.ez+south*s.sz;
  const length=Math.hypot(xx,xy,xz);
  if(length<1e-15){xx=s.ex;xy=s.ey;xz=s.ez;}else{xx/=length;xy/=length;xz/=length;}
  const zx=xy*s.uz-xz*s.uy,zy=xz*s.ux-xx*s.uz,zz=xx*s.uy-xy*s.ux;
  return target.set(xx,s.ux,zx,0,xy,s.uy,zy,0,xz,s.uz,zz,0,0,0,0,1);
}

/** Full local chart pose for instances: translation plus exact Jacobian times
 * the conventional Three.js Y rotation. Preserves local chart scale/shear so
 * wheels, rails and nearby scenery agree, unlike a rotation-only frame. Its
 * exact equirectangular metric is singular at the poles; use surfaceFrame for
 * fixed-size markers there. All matrix entries remain finite.
 */
export function surfacePoseMatrix(world,x,y,z,angle,target=new Matrix4()){
  const s=at(world,x,z);
  if(!s)return target.makeRotationY(angle).setPosition(x,y,z);
  const r=radialDistance(s,y),ca=Math.cos(angle),sa=Math.sin(angle);
  const c=s.cosTheta*ca+s.sinTheta*sa,t=s.sinTheta*ca-s.cosTheta*sa;
  const ex=r*s.eastScale*c,sx=r*s.southScale*t,ez=-r*s.eastScale*t,sz=r*s.southScale*c;
  return target.set(
    ex*s.ex+sx*s.sx,s.ux,ez*s.ex+sz*s.sx,r*s.ux,
    ex*s.ey+sx*s.sy,s.uy,ez*s.ey+sz*s.sy,r*s.uy-s.radius,
    ex*s.ez+sx*s.sz,s.uz,ez*s.ez+sz*s.sz,r*s.uz,
    0,0,0,1);
}

/** Inverse world-space sphere position -> chart {x,z,elevation}. Reuses target.
 * Undefined at the sphere center, where this function throws a RangeError.
 * Full-globe charts wrap longitude to [-π*chartRadius,+π*chartRadius). At either
 * exact pole the inverse deterministically chooses the chart central meridian.
 */
export function surfaceCoordinates(world,point,target={}){
  const s=prepared(world);
  if(!s){target.x=point.x;target.z=point.z;target.elevation=point.y;return target;}
  const x=point.x,y=point.y+s.radius,z=point.z,length=Math.hypot(x,y,z);
  if(!finite(length)||length<=1e-12)throw new RangeError('Surface inverse requires a finite point away from the sphere center');
  const vertical=y*s.sinOrigin-z*s.cosOrigin,across=y*s.cosOrigin+z*s.sinOrigin,horizontal=Math.hypot(x,across);
  const latitude=Math.atan2(vertical,horizontal);
  let longitude=s.longitude+Math.atan2(x,across);
  if(s.p.type==='equirectangular'){
    if(horizontal<=length*1e-12)longitude=s.p.centralLongitude*radians;
    target.x=wrapAngle(longitude-s.p.centralLongitude*radians)*s.p.radius;
    target.z=(s.p.centralLatitude*radians-latitude)*s.p.radius;
  }else{
    const chart=projectGeographic(s.p,longitude*degrees,latitude*degrees);target.x=chart.x;target.z=chart.z;
  }
  target.elevation=length-s.radius;return target;
}

/** Mutate chart-space geometry into sphere coordinates, preserving topology,
 * colors, UVs, index and groups. Clone shared geometry before calling. The caller
 * must subdivide long edges first (SURFACE_MAX_SEGMENT); this function never adds
 * vertices. Normals use the exact inverse transpose, not just a frame rotation.
 * Existing tangents are transformed too. Bounds/BVH must be rebuilt after warp.
 */
export function warpGeometryToSurface(geometry,world){
  if(!surfaceFor(world))return geometry;
  const position=geometry.getAttribute('position'),normal=geometry.getAttribute('normal'),tangent=geometry.getAttribute('tangent');
  if(!position)return geometry;
  for(let i=0;i<position.count;i++){
    const x=position.getX(i),y=position.getY(i),z=position.getZ(i),s=at(world,x,z),r=radialDistance(s,y);
    const alpha=r*s.eastScale,beta=r*s.southScale;
    if(normal){
      const nx=normal.getX(i),ny=normal.getY(i),nz=normal.getZ(i);
      // The longitude chart collapses at either pole. Its limiting normal
      // direction is finite; a radial normal (nx=nz=0) remains exactly radial.
      const east=(s.cosTheta*nx-s.sinTheta*nz)/Math.max(alpha,1e-12),south=(s.sinTheta*nx+s.cosTheta*nz)/Math.max(beta,1e-12);
      const a=east*s.ex+ny*s.ux+south*s.sx,b=east*s.ey+ny*s.uy+south*s.sy,c=east*s.ez+ny*s.uz+south*s.sz;
      const length=Math.hypot(a,b,c)||1;normal.setXYZ(i,a/length,b/length,c/length);
    }
    if(tangent){
      const tx=tangent.getX(i),ty=tangent.getY(i),tz=tangent.getZ(i),east=alpha*(s.cosTheta*tx-s.sinTheta*tz),south=beta*(s.sinTheta*tx+s.cosTheta*tz);
      const a=east*s.ex+ty*s.ux+south*s.sx,b=east*s.ey+ty*s.uy+south*s.sy,c=east*s.ez+ty*s.uz+south*s.sz;
      const length=Math.hypot(a,b,c);
      if(length<1e-15){const sign=Math.sign(s.cosTheta*tx-s.sinTheta*tz)||1;tangent.setXYZ(i,sign*s.ex,sign*s.ey,sign*s.ez);}
      else tangent.setXYZ(i,a/length,b/length,c/length);
    }
    position.setXYZ(i,r*s.ux,r*s.uy-s.radius,r*s.uz);
  }
  position.needsUpdate=true;if(normal)normal.needsUpdate=true;if(tangent)tangent.needsUpdate=true;
  geometry.computeBoundingBox();geometry.computeBoundingSphere();
  if(geometry.boundsTree){geometry.disposeBoundsTree?.();geometry.boundsTree=null;}
  return geometry;
}
