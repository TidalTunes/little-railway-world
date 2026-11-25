import { performance } from 'node:perf_hooks';
import { createNetworkTraffic } from '../src/network-traffic.js';
import { circuitWorld } from '../tests/fixtures/circuit-world.js';

const useStress=process.argv.includes('--stress');
let stress;
if(useStress){
  const {createStressWorld}=await import('../src/stress-world.js');
  const {generateWorld}=await import('../src/world-model.js');
  stress=generateWorld(createStressWorld(),{detail:'network'});
}
const result=[];
for(const count of [128,512,2048]){
  const world=stress?{...stress,traffic:{...stress.traffic,trainCount:count}}:circuitWorld({trainCount:count});
  global.gc?.();const start=performance.now();
  const traffic=createNetworkTraffic(world),startupMs=performance.now()-start;
  for(let i=0;i<90;i++)traffic.update(1/60);
  const timings=[];
  for(let i=0;i<300;i++){const before=performance.now();traffic.update(1/60);timings.push(performance.now()-before);}
  timings.sort((a,b)=>a-b);global.gc?.();
  result.push({scenario:useStress?'generated-regions':'exact-circle-fixture',cities:world.cities.length,requestedTrains:count,activeTrains:traffic.trains.filter(t=>t.active).length,
    startupMs:+startupMs.toFixed(2),updateMedianMs:+timings[150].toFixed(3),updateP95Ms:+timings[285].toFixed(3),
    updateMaxMs:+timings.at(-1).toFixed(3),poseBufferBytes:traffic.poseBuffer.byteLength,
    heapAfterMB:+(process.memoryUsage().heapUsed/1048576).toFixed(2)});
}
console.log(JSON.stringify(result,null,2));
