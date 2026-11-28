import {fileURLToPath} from 'node:url';
import {createSettlementEconomy} from '../src/settlement-economy.js';
import {createSettlementRailways} from '../src/settlement-railways.js';

/** Bounded CPU experiments for the new rules. Already-formed six-home towns
 * use actual directed track planning, population production, station stops,
 * purchases and loop transport. No renderer or worker-path dependency. */
export function simulateStrategy({strategy='food-loop',scenario='near',seconds=900,seed='loop-benchmark-7'}={}){
  const size={near:1,distant:1.55}[scenario];if(!size)throw new TypeError('Unknown scenario');
  const itinerary={'food-loop':['home','farm','home'],'resources-loop':['home','mine','home'],'mixed-loop':['home','mine','farm','home']}[strategy];
  if(!itinerary)throw new TypeError('Unknown strategy');
  const records=[{id:'home',ownerId:'teal',x:0,z:0,biome:'forest'},
    {id:'farm',ownerId:'gray',x:65*size,z:20*size,biome:'farmland'},
    {id:'mine',ownerId:'coral',x:45*size,z:-60*size,biome:'desert'}].map(city=>({...city,level:2,houseCount:6,radius:6}));
  const houses=records.flatMap(city=>[[-4,-2],[0,-2],[4,-2],[-4,3],[0,3],[4,3]].map(([x,z],index)=>({
    id:`${city.id}:home:${index}`,kind:'house',ownerId:city.ownerId,cityId:city.id,x:city.x+x,y:0,z:city.z+z,rotation:0,width:2.2,depth:2.2,
  })));
  for(const city of records)city.houseIds=houses.filter(home=>home.cityId===city.id).map(home=>home.id);
  const games=records.filter(city=>city.id!=='farm').map(city=>({ownerId:city.ownerId,logs:12,gold:60,spatialRevision:0,
    cities:[city],houses:houses.filter(home=>home.cityId===city.id),
    spendGold(amount){if(this.gold<amount)return {ok:false};this.gold-=amount;return {ok:true};},
    creditGold(amount){this.gold+=amount;return {ok:true};},
    spendLogs(amount){if(this.logs<amount)return {ok:false};this.logs-=amount;return {ok:true};},
    addLogs(amount){this.logs+=amount;return {ok:true};},
  }));
  const trees=Array.from({length:12},(_,i)=>({id:`tree:${i}`,kind:'tree',x:Math.sin(i*Math.PI/6)*12,z:Math.cos(i*Math.PI/6)*12,y:0,scale:.75,radius:.64,variant:3}));
  const world={seed,rivers:[],gameplay:{economy:'loops',ownerId:'teal',starterHouse:{...houses[0],biome:'forest'},
    playerBots:[{ownerId:'coral',starterHouse:{...houses.find(home=>home.cityId==='mine'),biome:'desert'}}],guaranteedTrees:trees,
    farmVillages:{ownerId:'gray',cities:[records[1]],houses:houses.filter(home=>home.cityId==='farm'),buildings:[],paths:[],
      destinations:[{id:'farm-gate',cityId:'farm',x:records[1].x,z:records[1].z+12,lookX:records[1].x+4,lookZ:records[1].z+12,kind:'farm'}]}}};
  let spatial=0,railways;const removed=new Set(),cleared=new Set();
  const session={player:games[0],bots:[{game:games[1]}],get spatialRevision(){return spatial+(railways?.revision??0);},
    get buildings(){return [...houses,...railways?.stations??[]];},
    shared:{removedTreeIds:removed,touchTrees(){spatial++;},isSceneryRemoved:item=>cleared.has(typeof item==='string'?item:item?.id),getPaths:()=>railways?.snapshot().paths??[]}};
  railways=createSettlementRailways(world,{session,surfaceAt:()=>({type:'ground',height:0}),sceneryCatalog:trees});
  railways.synchronizeStations();
  const costs={playerRails:0,otherRails:0};
  for(let i=1;i<itinerary.length;i++){
    const from=itinerary[i-1],to=itinerary[i],ownerId=from==='mine'&&to==='farm'?'coral':'teal';
    const result=railways.build(from,to,{ownerId});if(!result.ok)throw new Error(`${from} → ${to}: ${result.reason??result.code}`);
    costs[ownerId==='teal'?'playerRails':'otherRails']+=result.cost;
  }
  for(const id of railways.snapshot().clearedPlacementIds??[])cleared.add(id);
  const economy=createSettlementEconomy(world,{session,railways});
  const selected=economy.loops('home').find(loop=>loop.cityIds.length===new Set(itinerary).size);
  if(!selected)throw new Error('No complete physical loop in benchmark');
  const purchase=economy.buyTrain('home',selected.id,'teal');if(!purchase.ok)throw new Error(purchase.reason??purchase.code);
  const timeline=[],populationProduction={resources:0,food:0,gold:0};let firstDelivery=null;
  const dt=.25;
  for(let frame=0;frame<seconds/dt;frame++){
    const elapsed=frame*dt;
    economy.update(dt);
    for(const event of economy.drainEvents())if(event.ownerId==='teal'){
      if(event.type==='delivery')firstDelivery??=elapsed+dt;
      if(event.type==='production')populationProduction[event.resource]+=event.amount;
    }
    if((frame+1)%(300/dt)===0)timeline.push({minute:(elapsed+dt)/60,...economy.resourcesAt('teal'),laps:economy.snapshot().stats.laps});
  }
  const state=economy.snapshot(),wallet=economy.resourcesAt('teal');
  return {scenario,strategy,cityCount:selected.cityIds.length,length:Math.round(selected.length),...costs,trainCost:purchase.cost,
    gold:wallet.gold,resources:wallet.resources,food:wallet.food,laps:state.stats.laps,firstDelivery,
    populationProduction,delivered:state.stats.delivered,timeline};
}
export function runEconomyBenchmarks({seconds=900}={}){
  return ['near','distant'].flatMap(scenario=>['food-loop','resources-loop','mixed-loop'].map(strategy=>simulateStrategy({strategy,scenario,seconds})));
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const results=runEconomyBenchmarks({seconds:process.argv.includes('--long')?1800:900});
  if(process.argv.includes('--json'))process.stdout.write(`${JSON.stringify(results,null,2)}\n`);
  else console.table(results.map(({scenario,strategy,cityCount,length,playerRails,trainCost,gold,resources,food,laps,firstDelivery})=>({scenario,strategy,cityCount,length,playerRails,trainCost,gold,resources,food,laps,firstDelivery})));
}
