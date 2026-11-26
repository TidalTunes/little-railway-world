import {performance} from 'node:perf_hooks';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {compileDetailPacket} from '../src/detail-compiler.js';
import {createEarthWorld,projectEarth} from '../src/earth-world.js';

// Run with node scripts/benchmark-scenery.mjs [trials]. Fixed chart cells keep
// scenery, topology, and output counts comparable across worker optimizations.
const trials=Math.max(1,Number(process.argv[2]??3));
const start=performance.now(),world=generateWorld(createEarthWorld(),{detail:'network'});
console.log(JSON.stringify({phase:'network',milliseconds:+(performance.now()-start).toFixed(1)}));
const cases=[['Paris',projectEarth(2.35,48.86)],['Alps',projectEarth(8,46)],
  ['Brittany',projectEarth(-2,48)],['Sahara',projectEarth(20,19)]];
for(let trial=0;trial<trials;trial++)for(const [name,point]of cases){
  const begin=performance.now(),region=generateWorldRegion(world,{...point,size:192});
  const generated=performance.now(),packet=compileDetailPacket(region,world),end=performance.now();
  const bytes=packet.meshes.reduce((total,mesh)=>total+['position','normal','color','index'].reduce((n,key)=>n+(mesh[key]?.byteLength??0),0),0);
  console.log(JSON.stringify({name,trial:trial+1,regionMs:+(generated-begin).toFixed(1),
    compileMs:+(end-generated).toFixed(1),totalMs:+(end-begin).toFixed(1),placements:region.placements.length,
    meshes:packet.meshes.length,triangles:packet.meshes.reduce((n,mesh)=>n+(mesh.index?.length??mesh.position.length/3)/3,0),
    geometryMiB:+(bytes/2**20).toFixed(2)}));
}
