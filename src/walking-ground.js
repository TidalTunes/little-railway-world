import {Color} from 'three';
import {C} from './palette.js';
import {mountainMeshData,mountainSnowHeight} from './mountain-shape.js';
import {mountainSurfaceColor} from './mountain-cover.js';
import {terrainColor} from './terrain-colors.js';
import {BoundsTree,pointBox} from './spatial-index.js';

const empty=[],indexes=new WeakMap(),samplers=new WeakMap();
const clamp=n=>Math.max(0,Math.min(1,n));
const smooth=(a,b,n)=>{const t=clamp((n-a)/(b-a));return t*t*(3-2*t);};
const bounds=m=>m.range?.bounds??pointBox(m.x,m.z,m.radius);
function inside(face,x,z){
  const dx=x-face.c.x,dz=z-face.c.z;
  const u=(face.ux*dx+face.uz*dz),v=(face.vx*dx+face.vz*dz);
  return u>=-1e-8&&v>=-1e-8&&u+v<=1+1e-8;
}
function faceHeight(face,x,z){return Math.max(0,face.c.y+(x-face.c.x)*face.slopeX+(z-face.c.z)*face.slopeZ);}
function mountainIndex(mountain){
  if(indexes.has(mountain))return indexes.get(mountain);
  const {vertices,surfaceTriangles}=mountainMeshData(mountain),buckets=new Map();
  const size=mountain.range?.cellSize??Math.max(1,mountain.radius/5);
  for(const ids of surfaceTriangles){
    const [a,b,c]=ids.map(i=>vertices[i]),den=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z);
    if(Math.abs(den)<1e-12)continue;
    const ux=(b.z-c.z)/den,uz=(c.x-b.x)/den,vx=(c.z-a.z)/den,vz=(a.x-c.x)/den;
    const slopeX=ux*(a.y-c.y)+vx*(b.y-c.y),slopeZ=uz*(a.y-c.y)+vz*(b.y-c.y);
    const normalY=1/Math.hypot(slopeX,1,slopeZ),face={c,ux,uz,vx,vz,slopeX,slopeZ,
      normal:{x:-slopeX*normalY,y:normalY,z:-slopeZ*normalY}};
    for(let x=Math.floor(Math.min(a.x,b.x,c.x)/size);x<=Math.floor(Math.max(a.x,b.x,c.x)/size);x++)
      for(let z=Math.floor(Math.min(a.z,b.z,c.z)/size);z<=Math.floor(Math.max(a.z,b.z,c.z)/size);z++){
        const key=`${x}:${z}`;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(face);
      }
  }
  const result={size,buckets};indexes.set(mountain,result);return result;
}
function findFace(mountain,x,z){
  const {size,buckets}=mountainIndex(mountain);
  return (buckets.get(`${Math.floor(x/size)}:${Math.floor(z/size)}`)??empty).find(face=>inside(face,x,z));
}

/** A cached heightfield index over the very same triangles that build the
 * visible mountain. No raycasts, replacement surfaces, or per-frame queries. */
export function walkingGroundSampler(world){
  if(samplers.has(world))return samplers.get(world);
  const mountains=new BoundsTree(world.mountains??empty,bounds),color=new Color(),paint=new Color();
  function sample(x,z){
    const nearby=mountains.query(pointBox(x,z,.5));
    let height=0,face=null,mountain=null;
    for(const candidate of nearby){
      const found=findFace(candidate,x,z);if(!found)continue;
      const y=faceHeight(found,x,z);if(y>height){height=y;face=found;mountain=candidate;}
    }
    return {height,face,mountain,nearby};
  }
  function heightAt(x,z,reference){
    if(!reference?.nearby.length)return 0;
    // Most blade roots share the tile's triangle. Test its barycentric bounds
    // before reusing the plane, so roots crossing a ridge follow both facets.
    if(reference.nearby.length===1&&reference.face&&inside(reference.face,x,z))return faceHeight(reference.face,x,z);
    let height=0;
    for(const mountain of reference.nearby){const face=findFace(mountain,x,z);if(face)height=Math.max(height,faceHeight(face,x,z));}
    return height;
  }
  function vegetation(x,z,ground){
    const source=world.terrainSource??world;
    terrainColor(source,x,z,{target:color});
    // Use the already blended ground color, not a categorical biome boundary.
    // Farmland remains green; sparse warm tussocks continue into dry terrain.
    const green=smooth(-.15,.065,color.g-color.r);
    let cover=1;
    if(ground.mountain){
      const m=ground.mountain,altitude=ground.height/m.height,normal=ground.face.normal;
      const steep=smooth(.90,.48,normal.y),high=smooth(.53,.84,altitude);
      cover=1-Math.max(steep,high)*smooth(.015,.12,altitude);
      cover*=1-smooth(mountainSnowHeight(m,x,z)-.8,mountainSnowHeight(m,x,z),ground.height);
      mountainSurfaceColor(world,m,{x,y:ground.height,z},normal,{target:color});
    }
    const density=(.045+.955*green)*cover;
    paint.copy(color).lerp(green>.5?C.grass:C.soilLight,.18).multiplyScalar(1.02);
    return {density,heightScale:(.42+.58*green)*(.35+.65*cover),color:paint.toArray()};
  }
  const result={sample,heightAt,vegetation};samplers.set(world,result);return result;
}
