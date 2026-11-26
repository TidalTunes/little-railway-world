import {Matrix4} from 'three';
import {rigidSurfacePoseMatrix,surfaceDistance} from './world-surface.js';

const footprints=new WeakMap(),EPS=1e-8;
// The farm art reserves at most 1.6 units vertically. Its small radial lean
// needs a little more clearance than the ground polygon on a curved world.
const FARM_HEIGHT=1.6;

function footprint(world,item){
  const surface=world.surface??null,scale=item.scale??1,rotation=item.rotation??0,y=item.y??0;
  let saved=footprints.get(item);
  if(saved&&saved.surface===surface&&saved.x===item.x&&saved.z===item.z&&saved.y===y
    &&saved.rotation===rotation&&saved.scale===scale&&saved.width===item.width&&saved.depth===item.depth
    &&saved.outline===item.footprint)return saved;
  const polygon=item.footprint??[[-item.width/2,-item.depth/2],[item.width/2,-item.depth/2],
    [item.width/2,item.depth/2],[-item.width/2,item.depth/2]];
  const pose=rigidSurfacePoseMatrix(world,item.x,y,item.z,rotation,new Matrix4()).elements;
  const points=new Float64Array(polygon.length*3);
  for(let index=0;index<polygon.length;index++){
    const x=polygon[index][0]*scale,z=polygon[index][1]*scale;
    points[index*3]=pose[0]*x+pose[8]*z+pose[12];
    points[index*3+1]=pose[1]*x+pose[9]*z+pose[13];
    points[index*3+2]=pose[2]*x+pose[10]*z+pose[14];
  }
  saved={surface,x:item.x,y,z:item.z,rotation,scale,width:item.width,depth:item.depth,outline:item.footprint,
    points,up:[pose[4],pose[5],pose[6]],center:[pose[12],pose[13],pose[14]]};
  footprints.set(item,saved);return saved;
}

function project(points,origin,right,forward){
  const result=new Float64Array(points.length/3*2);
  for(let i=0,j=0;i<points.length;i+=3,j+=2){
    const x=points[i]-origin[0],y=points[i+1]-origin[1],z=points[i+2]-origin[2];
    result[j]=x*right[0]+y*right[1]+z*right[2];
    result[j+1]=x*forward[0]+y*forward[1]+z*forward[2];
  }
  return result;
}

function separated(a,b,clearance){
  for(const polygon of [a,b])for(let i=0;i<polygon.length;i+=2){
    const j=(i+2)%polygon.length,dx=polygon[j]-polygon[i],dz=polygon[j+1]-polygon[i+1];
    const length=Math.hypot(dx,dz);if(length<EPS)continue;
    const nx=-dz/length,nz=dx/length;
    let minA=Infinity,maxA=-Infinity,minB=Infinity,maxB=-Infinity;
    for(let k=0;k<a.length;k+=2){const d=a[k]*nx+a[k+1]*nz;minA=Math.min(minA,d);maxA=Math.max(maxA,d);}
    for(let k=0;k<b.length;k+=2){const d=b[k]*nx+b[k+1]*nz;minB=Math.min(minB,d);maxB=Math.max(maxB,d);}
    if(minB-maxA>=clearance-EPS||minA-maxB>=clearance-EPS)return true;
  }
  return false;
}

/** Farm-to-farm narrow phase only. All other scenery keeps its complete circle
 * reservation. Both rigid polygons use the same midpoint tangent plane, so
 * the result is symmetric and does not stretch near poles or the date line.
 * Convex SAT with an expanded gap conservatively preserves lane clearance. */
export function farmFootprintsOverlap(world,a,b,clearance=0){
  const gap=Math.max(0,clearance),ar=a.radius??Math.hypot(a.width,a.depth)*(a.scale??1)/2;
  const br=b.radius??Math.hypot(b.width,b.depth)*(b.scale??1)/2,distance=surfaceDistance(world,a,b);
  if(distance>=ar+br+gap)return false;
  const aa=footprint(world,a),bb=footprint(world,b);
  const origin=aa.center.map((value,index)=>(value+bb.center[index])/2);
  const up=aa.up.map((value,index)=>value+bb.up[index]),length=Math.hypot(...up);
  // Nearby farm reservations cannot span antipodes. Remain conservative for
  // hand-authored oversized footprints that do not satisfy that assumption.
  if(length<EPS)return true;
  for(let index=0;index<3;index++)up[index]/=length;
  let right=Math.abs(up[1])<.9?[up[2],0,-up[0]]:[0,-up[2],up[1]];
  const rightLength=Math.hypot(...right);right=right.map(value=>value/rightLength);
  const forward=[right[1]*up[2]-right[2]*up[1],right[2]*up[0]-right[0]*up[2],right[0]*up[1]-right[1]*up[0]];
  const radius=world.surface?.radius;
  const margin=radius?2*FARM_HEIGHT*Math.sin(Math.min(Math.PI/2,distance/(2*radius)))
    +(ar+br)*(1-Math.cos(Math.min(Math.PI/2,(ar+br)/radius))):0;
  return !separated(project(aa.points,origin,right,forward),project(bb.points,origin,right,forward),gap+margin);
}
