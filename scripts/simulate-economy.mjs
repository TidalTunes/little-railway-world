import {fileURLToPath} from 'node:url';
import {createSettlementEconomy} from '../src/settlement-economy.js';
import {createSettlementRailways} from '../src/settlement-railways.js';
import {LOOP_ECONOMY_RULES as RULES} from '../src/loop-economy-rules.js';

/** Bounded CPU experiments for the new rules. Already-formed six-home towns
 * use actual directed track planning, population production, station stops,
 * finite supplier stocks and held fares. Existing homes are fixture capital;
 * every rail/train purchase and every transported good is accounted for. */
export function simulateStrategy({strategy='food-loop',scenario='near',seconds=900,seed='loop-benchmark-7',buyerGold=RULES.startGold}={}){
  if(!Number.isFinite(seconds)||seconds<0||!Number.isSafeInteger(buyerGold)||buyerGold<0)throw new TypeError('Invalid benchmark duration or opening coin balance');
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
  const games=records.filter(city=>city.id!=='farm').map(city=>({ownerId:city.ownerId,logs:RULES.startResources,food:RULES.startFood,gold:city.ownerId==='teal'?buyerGold:RULES.startGold,spatialRevision:0,
    cities:[city],houses:houses.filter(home=>home.cityId===city.id),
    spendLogs(amount){if(this.logs<amount)return {ok:false};this.logs-=amount;return {ok:true};},
    addLogs(amount){this.logs+=amount;return {ok:true};},
    spendFood(amount){if(this.food<amount)return {ok:false};this.food-=amount;return {ok:true};},
    addFood(amount){this.food+=amount;return {ok:true};},
    spendGold(amount){if(this.gold<amount)return {ok:false};this.gold-=amount;return {ok:true};},
    creditGold(amount){this.gold+=amount;return {ok:true};},
    spendResources(amount){return economy?economy.spendResources(this.ownerId,amount):this.spendLogs(amount);},
    resourcesAt(){return economy?economy.resourcesAt(this.ownerId):{resources:this.logs,food:this.food,gold:this.gold};},
  }));
  const initial={resources:games.reduce((sum,game)=>sum+game.logs,0),food:games.reduce((sum,game)=>sum+game.food,0),gold:games.reduce((sum,game)=>sum+game.gold,0)};
  const trees=Array.from({length:12},(_,i)=>({id:`tree:${i}`,kind:'tree',x:Math.sin(i*Math.PI/6)*12,z:Math.cos(i*Math.PI/6)*12,y:0,scale:.75,radius:.64,variant:3}));
  const world={seed,rivers:[],gameplay:{economy:'loops',ownerId:'teal',starterHouse:{...houses[0],biome:'forest'},
    playerBots:[{ownerId:'coral',starterHouse:{...houses.find(home=>home.cityId==='mine'),biome:'desert'}}],guaranteedTrees:trees,
    farmVillages:{ownerId:'gray',cities:[records[1]],houses:houses.filter(home=>home.cityId==='farm'),buildings:[],paths:[],
      destinations:[{id:'farm-gate',cityId:'farm',x:records[1].x,z:records[1].z+12,lookX:records[1].x+4,lookZ:records[1].z+12,kind:'farm'}]}}};
  let spatial=0,railways,economy;const removed=new Set(),cleared=new Set();
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
  economy=createSettlementEconomy(world,{session,railways});
  const selected=economy.loops('home').find(loop=>loop.cityIds.length===new Set(itinerary).size);
  if(!selected)throw new Error('No complete physical loop in benchmark');
  const purchase=economy.buyTrain('home',selected.id,'teal');if(!purchase.ok)throw new Error(purchase.reason??purchase.code);
  const timeline=[],populationProduction={resources:0,food:0},paymentByOwner={},pickedByCity={};let firstDelivery=null,firstLap=null,emptyLaps=0,departures=0;
  const dt=.25;
  for(let elapsed=0;elapsed<seconds;){
    const step=Math.min(dt,seconds-elapsed);economy.update(step);elapsed+=step;
    for(const event of economy.drainEvents()){
      if(event.type==='station-payment'&&event.payerId==='teal')paymentByOwner[event.ownerId]=(paymentByOwner[event.ownerId]??0)+event.amount;
      if(event.ownerId!=='teal')continue;
      if(event.type==='delivery'){
        firstLap??=event.time;
        if(event.resources.resources+event.resources.food>0)firstDelivery??=event.time;else emptyLaps++;
      }
      if(event.type==='departure')departures++;
      if(event.type==='pickup')pickedByCity[event.cityId]=(pickedByCity[event.cityId]??0)+event.amount;
      if(event.type==='production')populationProduction[event.resource]+=event.gross??event.amount;
    }
    if(elapsed%300===0){const state=economy.snapshot(),wallet=economy.resourcesAt('teal');timeline.push({minute:elapsed/60,resources:wallet.resources,food:wallet.food,gold:wallet.gold,
      laps:state.stats.laps,production:{...populationProduction},delivered:{...state.stats.delivered},
      escrowGold:state.trains.reduce((sum,train)=>sum+train.escrowGold,0),state:state.trains[0]?.state??(state.stats.trainsLost?'destroyed':null)});}
  }
  const state=economy.snapshot(),wallet=economy.resourcesAt('teal');
  const aboard={resources:0,food:0};let escrowGold=0;
  for(const train of state.trains){for(const resource of['resources','food'])aboard[resource]+=train.cargo[resource];escrowGold+=train.escrowGold;}
  const accounting={};
  for(const resource of['resources','food']){
    const wallets=state.owners.reduce((sum,owner)=>sum+owner[resource],0),spent=resource==='resources'?costs.playerRails+costs.otherRails+state.stats.trainSpent:0;
    accounting[resource]={initial:initial[resource],produced:state.stats.produced[resource],spent,wallets,cargo:aboard[resource],error:wallets+aboard[resource]-initial[resource]-state.stats.produced[resource]+spent};
  }
  const goldWallets=state.owners.reduce((sum,owner)=>sum+owner.gold,0);
  accounting.gold={initial:initial.gold,wallets:goldWallets,escrow:escrowGold,error:goldWallets+escrowGold-initial.gold};
  return {scenario,strategy,cityCount:selected.cityIds.length,length:Math.round(selected.length),...costs,trainCost:purchase.cost,
    resources:wallet.resources,food:wallet.food,gold:wallet.gold,laps:state.stats.laps,firstLap,firstDelivery,
    trainState:state.trains[0]?.state??(state.stats.trainsLost?'destroyed':null),trainsLost:state.stats.trainsLost??0,
    populationProduction,delivered:state.stats.delivered,accounting,
    trade:{departures,paid:state.stats.goldPaid,reserved:state.stats.goldReserved,refunded:state.stats.goldRefunded,emptyVisits:state.stats.emptyVisits,emptyLaps,
      escrowGold,aboard,pickups:state.stats.pickups,paymentByOwner,pickedByCity},
    suppliers:state.cities.filter(city=>city.id!=='home').map(city=>({id:city.id,ownerId:city.ownerId,resources:city.stock.resources,food:city.stock.food,gold:state.owners.find(owner=>owner.ownerId===city.ownerId).gold})),timeline};
}
export function runEconomyBenchmarks({seconds=900}={}){
  return ['near','distant'].flatMap(scenario=>['food-loop','resources-loop','mixed-loop'].map(strategy=>simulateStrategy({strategy,scenario,seconds})));
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const results=runEconomyBenchmarks({seconds:process.argv.includes('--long')?1800:900});
  if(process.argv.includes('--json'))process.stdout.write(`${JSON.stringify(results,null,2)}\n`);
  else console.table(results.map(({scenario,strategy,cityCount,length,playerRails,trainCost,resources,food,gold,laps,firstDelivery,trade})=>({scenario,strategy,cityCount,length,playerRails,trainCost,resources,food,gold,laps,firstDelivery,emptyVisits:trade.emptyVisits})));
}
