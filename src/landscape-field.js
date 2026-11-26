import {surfaceGeographicCoordinates} from './world-surface.js';

const seeds=new WeakMap(),radians=Math.PI/180;
const smooth=t=>t*t*(3-2*t),mix=(a,b,t)=>a+(b-a)*t;
function seedFor(world){
  let entry=seeds.get(world);
  if(!entry||entry.seed!==world.seed){
    let hash=2166136261;
    for(const character of `landscape:${world.seed??0}`)hash=Math.imul(hash^character.charCodeAt(0),16777619);
    entry={seed:world.seed,hash};seeds.set(world,entry);
  }
  return entry.hash;
}
function hash(x,y,z,seed){
  let h=Math.imul(x,374761393)^Math.imul(y,668265263)^Math.imul(z,1442695041)^seed;
  h=Math.imul(h^(h>>>13),1274126177);
  return ((h^(h>>>16))>>>0)/4294967295;
}
function noise(x,y,z,scale,seed){
  x=x/scale+13.7;y=y/scale-4.2;z=z/scale+8.9;
  const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z),u=smooth(x-ix),v=smooth(y-iy),w=smooth(z-iz);
  const a=mix(hash(ix,iy,iz,seed),hash(ix+1,iy,iz,seed),u);
  const b=mix(hash(ix,iy+1,iz,seed),hash(ix+1,iy+1,iz,seed),u);
  const c=mix(hash(ix,iy,iz+1,seed),hash(ix+1,iy,iz+1,seed),u);
  const d=mix(hash(ix,iy+1,iz+1,seed),hash(ix+1,iy+1,iz+1,seed),u);
  return mix(mix(a,b,v),mix(c,d,v),w);
}

/** Shared, allocation-free ecological structure for terrain and scenery.
 * Noise lives in physical Cartesian space, so independently loaded regions,
 * longitude seams and polar meridians all sample the same landscape. The
 * climate labels are broad art direction; exact biome masks remain authoritative.
 */
export function sampleLandscape(world,x,z,target={}){
  let px=x,py=0,pz=z,latitude=45,longitude=0;
  if(world.surface){
    surfaceGeographicCoordinates(world,x,z,target);
    latitude=target.latitude;longitude=((target.longitude+180)%360+360)%360-180;
    const lat=latitude*radians,lon=longitude*radians,r=world.surface.radius;
    const c=Math.abs(latitude)>=90-1e-10?0:Math.cos(lat);
    px=r*c*Math.sin(lon);py=r*Math.sin(lat);pz=r*c*Math.cos(lon);
  }
  const seed=seedFor(world);
  target.patch=noise(px,py,pz,48,seed);
  target.detail=noise(px,py,pz,17,seed^0x9e3779b9);
  target.moisture=noise(px,py,pz,110,seed^0x6a09e667);
  target.windAngle=1.05+(target.moisture-.5)*1.1;
  target.latitude=latitude;target.longitude=longitude;
  const absolute=Math.abs(latitude);
  target.ecoregion=absolute>68?'polar':absolute>53?'boreal':absolute<27?'tropical':'temperate';
  return target;
}
