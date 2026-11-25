import fs from 'node:fs';
import {performance} from 'node:perf_hooks';
import * as THREE from 'three';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {compileDetailPacket} from '../src/world-renderer.js';
import {serializeGeometryBVH,installGeometryBVH,geometryBVHTransfers} from '../src/geometry-bvh.js';

const input=JSON.parse(fs.readFileSync(new URL('../public/worlds/showcase.json',import.meta.url)));
const world=generateWorld(input,{detail:'network'}),city=world.cities.find(city=>city.level===10);
const start=performance.now(),region=generateWorldRegion(world,{x:city.x,z:city.z,size:192}),packet=compileDetailPacket(region,world);
const packetMs=performance.now()-start,reference=new THREE.Group(),accelerated=new THREE.Group();
let triangles=0,treeBytes=0,buildMs=0;
for(const data of packet.meshes){
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(data.position,3));
  if(data.index)geometry.setIndex(new THREE.BufferAttribute(data.index,1));
  const material=new THREE.MeshBasicMaterial({side:data.material.side}),stock=new THREE.Mesh(geometry,material),fast=new THREE.Mesh(geometry.clone(),material);
  reference.add(stock);accelerated.add(fast);triangles+=(data.index?.length??data.position.length/3)/3;
  const before=performance.now(),bvh=data.bvh??serializeGeometryBVH(fast.geometry);installGeometryBVH(fast,bvh);buildMs+=performance.now()-before;
  treeBytes+=geometryBVHTransfers(bvh).reduce((sum,buffer)=>sum+buffer.byteLength,0);
}
reference.updateMatrixWorld(true);accelerated.updateMatrixWorld(true);
const rays=[],bounds=packet.cellBounds??packet.bounds;
for(let row=0;row<20;row++)for(let column=0;column<20;column++){
  const x=bounds.minX+(column+.5)/20*(bounds.maxX-bounds.minX),z=bounds.minZ+(row+.5)/20*(bounds.maxZ-bounds.minZ);
  rays.push(new THREE.Raycaster(new THREE.Vector3(x,120,z),new THREE.Vector3(.05,-1,.03).normalize()));
}
const result={triangles,meshes:packet.meshes.length,rays:rays.length,packetMs:+packetMs.toFixed(2),treeHydrateOrBuildMs:+buildMs.toFixed(2),treeBytes};
const hits=[];
for(const [name,root]of [['before',reference],['after',accelerated]]){
  const timings=[];
  for(const [i,ray]of rays.entries()){
    ray.firstHitOnly=true;const before=performance.now(),hit=ray.intersectObject(root,true)[0];timings.push(performance.now()-before);
    if(name==='before')hits.push(hit?.distance??null);
    else if((hit?.distance??null)!==null&&Math.abs(hit.distance-hits[i])>1e-5||!!hit!==(hits[i]!==null))throw new Error(`Ray ${i} changed nearest occlusion`);
  }
  timings.sort((a,b)=>a-b);result[`${name}MedianMs`]=+timings[200].toFixed(4);result[`${name}P95Ms`]=+timings[380].toFixed(4);result[`${name}TotalMs`]=+timings.reduce((a,b)=>a+b,0).toFixed(2);
}
console.log(JSON.stringify(result,null,2));
for(const root of [reference,accelerated])root.traverse(mesh=>{mesh.geometry?.dispose();mesh.material?.dispose();});
