import {performance} from 'node:perf_hooks';
import * as THREE from 'three';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {createStressWorld} from '../src/stress-world.js';
import {compileDetailPacket} from '../src/detail-compiler.js';
import {indexGeometryExact,geometryAttributeBytes} from '../src/index-geometry.js';
import {serializeGeometryBVH,geometryBVHTransfers} from '../src/geometry-bvh.js';

const trialCount=Number(process.argv[2]??7);
if(!Number.isInteger(trialCount)||trialCount<1||trialCount>100)throw new TypeError('Trial count must be an integer from 1 through 100');
const world=generateWorld(createStressWorld(),{detail:'network'});
const regions=[0,1,2,3].map(i=>generateWorldRegion(world,{...world.cities[i],size:192}));
const region=regions.sort((a,b)=>b.placements.length-a.placements.length)[0];
const started=performance.now(),packet=compileDetailPacket(region,world),packetCompileMs=performance.now()-started;

function restoreNonIndexed(data){
  const geometry=new THREE.BufferGeometry();
  for(const name of ['position','normal','color'])if(data[name])geometry.setAttribute(name,new THREE.BufferAttribute(data[name],3));
  if(!data.index)return geometry;
  geometry.setIndex(new THREE.BufferAttribute(data.index,1));
  const expanded=geometry.toNonIndexed();geometry.dispose();return expanded;
}
function totalBytes(geometry,bvh){
  return [...new Set([...Object.values(geometry.attributes).map(attribute=>attribute.array.buffer),
    geometry.index?.array.buffer,...geometryBVHTransfers(bvh)].filter(Boolean))].reduce((total,buffer)=>total+buffer.byteLength,0);
}
function verifyBits(source,indexed){
  for(const [name,attribute]of Object.entries(source.attributes)){
    const original=new Uint32Array(attribute.array.buffer,attribute.array.byteOffset,attribute.array.length);
    const replacement=indexed.attributes[name],bits=new Uint32Array(replacement.array.buffer,replacement.array.byteOffset,replacement.array.length);
    for(let vertex=0;vertex<attribute.count;vertex++)for(let component=0;component<attribute.itemSize;component++){
      if(bits[indexed.index.getX(vertex)*attribute.itemSize+component]!==original[vertex*attribute.itemSize+component]){
        throw new Error(`Indexing changed ${name} at vertex ${vertex}, component ${component}`);
      }
    }
  }
}
const trials=[];
for(let trial=0;trial<trialCount;trial++){
  global.gc?.();
  const result={trial:trial+1,indexMs:0,beforeBVHMs:0,afterBVHMs:0,beforeBytes:0,afterBytes:0,
    beforeGPUBytes:0,afterGPUBytes:0,beforeVertices:0,afterVertices:0,triangles:0};
  for(const data of packet.meshes){
    const source=restoreNonIndexed(data);
    let start=performance.now();const originalBVH=serializeGeometryBVH(source);result.beforeBVHMs+=performance.now()-start;
    result.beforeBytes+=totalBytes(source,originalBVH);result.beforeGPUBytes+=geometryAttributeBytes(source);
    result.beforeVertices+=source.attributes.position.count;
    start=performance.now();const indexed=indexGeometryExact(source);result.indexMs+=performance.now()-start;
    start=performance.now();const indexedBVH=serializeGeometryBVH(indexed);result.afterBVHMs+=performance.now()-start;
    result.afterBytes+=totalBytes(indexed,indexedBVH);result.afterGPUBytes+=geometryAttributeBytes(indexed);
    result.afterVertices+=indexed.attributes.position.count;result.triangles+=indexed.index.count/3;
    if(trial===0)verifyBits(source,indexed);
    source.dispose();indexed.dispose();
  }
  result.netWorkerMs=result.indexMs+result.afterBVHMs-result.beforeBVHMs;
  for(const name of ['indexMs','beforeBVHMs','afterBVHMs','netWorkerMs'])result[name]=+result[name].toFixed(2);
  trials.push(result);
}
const median=name=>trials.map(trial=>trial[name]).sort((a,b)=>a-b)[Math.floor(trials.length/2)];
console.log(JSON.stringify({cell:region.bounds,assets:region.placements.length,cities:region.cities.length,
  meshes:packet.meshes.length,packetCompileMs:+packetCompileMs.toFixed(2),bitExact:true,
  medianIndexMs:median('indexMs'),medianNetWorkerMs:median('netWorkerMs'),trials},null,2));
