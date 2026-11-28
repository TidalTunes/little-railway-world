import {Vector3} from 'three';
import {surfacePoint} from './world-surface.js';

/** Physical-space broad phase: a longitude seam or polar chart compression
 * must never change combat range or allocate a continent-sized grid query. */
export function createMilitarySpatial(world,size=12){
  const cells=new Map(),scratch=new Vector3();
  function visit(point,radius,fn){
    const p=surfacePoint(world,point.x,0,point.z,scratch),x0=Math.floor((p.x-radius)/size),x1=Math.floor((p.x+radius)/size),
      y0=Math.floor((p.y-radius)/size),y1=Math.floor((p.y+radius)/size),z0=Math.floor((p.z-radius)/size),z1=Math.floor((p.z+radius)/size);
    for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)fn(`${x},${y},${z}`);
  }
  return{cells,clear(){cells.clear();},insert(item,point,radius=0){visit(point,radius,key=>{let bucket=cells.get(key);if(!bucket)cells.set(key,bucket=[]);bucket.push(item);});},
    query(point,radius){const seen=new Set();visit(point,radius,key=>{for(const item of cells.get(key)??[])seen.add(item);});return [...seen];}};
}
