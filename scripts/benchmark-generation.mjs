import fs from 'node:fs';
import {performance} from 'node:perf_hooks';
import {generateWorld,generateWorldRegion,validateWorld} from '../src/world-model.js';
import {createStressWorld} from '../src/stress-world.js';
const trials=Math.max(1,Number(process.argv[2]??3));
const cases=[['showcase',JSON.parse(fs.readFileSync(new URL('../public/worlds/showcase.json',import.meta.url))),{detail:'full'}],['stress256',createStressWorld(),{detail:'network'}]];
for(const [name,input,options] of cases){
  for(let trial=0;trial<trials;trial++){
    global.gc?.();const start=performance.now(),world=generateWorld(input,options),generated=performance.now();
    const violations=validateWorld(world),validated=performance.now();
    const detail=options.detail==='network'?generateWorldRegion(world,world.cities[0]):null,finished=performance.now();
    global.gc?.();
    console.log(JSON.stringify({name,trial:trial+1,generationMs:+(generated-start).toFixed(1),validationMs:+(validated-generated).toFixed(1),regionMs:detail?+(finished-validated).toFixed(1):null,cities:world.cities.length,lines:world.lines.length,routePoints:world.lines.reduce((n,l)=>n+l.points.length,0),assets:world.placements.length,regionAssets:detail?.placements.length??0,violations:violations.length,heapMB:+(process.memoryUsage().heapUsed/2**20).toFixed(1)}));
    if(violations.length)process.exitCode=1;
  }
}
