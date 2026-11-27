import {fileURLToPath} from 'node:url';
import {createSettlementEconomy} from '../src/settlement-economy.js';
import {combineAlignments,straightSegment} from '../src/alignments.js';

/** Small reproducible economic benchmarks use the actual production, routing,
 * reservations, wallets and cargo authority. Construction here is a scripted
 * valid-site action: this measures incentives, not navigation or placement. */
export function simulateStrategy({strategy='merchant',scenario='near',seconds=900,tuning={},deposits=true}={}){
  const presets={near:{distance:35,farm:2,workshop:1},distant:{distance:125,farm:2,workshop:1},scarceFood:{distance:80,farm:1,workshop:3}};
  const setup=presets[scenario];if(!setup)throw new TypeError('Unknown scenario');
  const policy={merchant:{industry:'lumber',target:6},industrialist:{industry:'workshop',target:9},agrarian:{industry:'farm',target:15},adaptive:{industry:'workshop',target:9}}[strategy];
  if(!policy)throw new TypeError('Unknown strategy');
  const specifications=[{id:'player',x:0,level:1,industry:policy.industry},
    {id:'farmer',x:setup.distance,level:setup.farm,industry:'farm'},
    {id:'artisan',x:setup.distance+30,level:setup.workshop,industry:'workshop'},
    {id:'forester',x:setup.distance+60,level:1,industry:'lumber'}];
  const games=specifications.map(spec=>{
    const homes=spec.level*3,city={id:spec.id,ownerId:spec.id,x:spec.x,z:0,level:spec.level,houseCount:homes,houseIds:Array.from({length:homes},(_,i)=>`${spec.id}:${i}`)};
    return {ownerId:spec.id,revision:0,logs:12,gold:12,cities:[city],houses:city.houseIds.map((id,i)=>({id,cityId:city.id,x:city.x+(i%3)*2,z:Math.floor(i/3)*2})),
      spendGold(amount){if(this.gold<amount)return{ok:false};this.gold-=amount;this.revision++;return{ok:true};},
      creditGold(amount){this.gold+=amount;this.revision++;return{ok:true};},
      spendLogs(amount){if(this.logs<amount)return{ok:false};this.logs-=amount;this.revision++;return{ok:true};},
      addLogs(amount){this.logs+=amount;this.revision++;}};
  });
  const session={player:games[0],bots:games.slice(1).map(game=>({game})),get revision(){return games.reduce((sum,game)=>sum+game.revision,0);}};
  const main={id:'market-line',alignment:combineAlignments([straightSegment({x:setup.distance,z:0},{x:setup.distance+60,z:0})])};
  const infrastructure={revision:0,lines:[main],connections:[],stations:specifications.slice(1).map(spec=>({id:`station:${spec.id}`,cityId:spec.id,lineId:main.id,distance:spec.x-setup.distance}))};
  const railways={get revision(){return infrastructure.revision;},snapshot(){return structuredClone(infrastructure);}};
  const economy=createSettlementEconomy({gameplay:{}},{session,railways,tuning});
  for(const spec of specifications)economy.setIndustry(spec.id,spec.industry,spec.id);
  let connected=false,railCost=0,harvests=0,firstDelivery=null,firstGrowth=null,foodPulses=0,toolsPulses=0;
  const timeline=[],trades={};
  for(let second=0;second<seconds;second++){
    // Equal manual effort: eight satisfying chops spread over the opening two
    // minutes. There is no unlimited harvest or policy-specific windfall.
    if(second%15===0&&second<120){games[0].addLogs(5);harvests++;}
    const city=games[0].cities[0],cost=8+Math.ceil(setup.distance/50);
    if(deposits&&strategy!=='agrarian'&&second%15===0){
      const depot=economy.city(city.id),amount=Math.min(Math.max(0,games[0].logs-8),depot.capacity-depot.stock.timber-depot.incoming.timber);
      if(amount>0)economy.depositTimber('player',city,amount);
    }
    if(strategy==='adaptive'&&city.houseCount>=9)economy.setIndustry('player','farm','player');
    if(!connected&&second>=20&&games[0].gold>=cost){
      games[0].spendGold(cost);railCost+=cost;connected=true;
      const access={id:'player-access',alignment:combineAlignments([straightSegment({x:0,z:0},{x:setup.distance,z:0})])};
      infrastructure.lines.push(access);infrastructure.stations.push({id:'station:player',cityId:'player',lineId:access.id,distance:0});
      infrastructure.connections.push({lineId:access.id,fromStationId:'station:player',toJunction:{lineId:main.id,distance:0}});infrastructure.revision++;
    }
    // One house decision every twelve seconds, using the real atomic cost.
    if(second%12===0&&city.houseCount<policy.target){
      const paid=economy.spendConstruction('player',city,{timber:8,tools:2});
      if(paid.ok){
        const id=`player:${city.houseCount}`,home={id,cityId:'player',x:(city.houseCount%5)*2,z:Math.floor(city.houseCount/5)*2};
        games[0].houses.push(home);city.houseIds.push(id);city.houseCount++;city.level=Math.min(5,Math.floor(city.houseCount/3));games[0].revision++;
        firstGrowth??=second;
      }
    }
    economy.update(1);
    for(const event of economy.drainEvents()){
      if(event.type==='delivery'){const key=`${event.fromCityId}>${event.toCityId}:${event.resource}`;trades[key]=(trades[key]??0)+event.quantity;}
      if(event.type==='delivery'&&event.toCityId==='player')firstDelivery??=second+1;
      if(event.type==='income'&&event.cityId==='player'){foodPulses+=Number(event.fed);toolsPulses+=Number(event.boosted);}
    }
    if((second+1)%300===0){const current=economy.city('player');timeline.push({minute:(second+1)/60,gold:games[0].gold,houses:city.houseCount,stock:current.stock});}
  }
  const state=economy.snapshot(),city=economy.city('player'),wallet=games[0];
  return {scenario,strategy,gold:wallet.gold,houses:wallet.houses.length,level:city.level,stock:city.stock,backpack:wallet.logs,
    wealth:wallet.gold+wallet.logs+city.stock.timber+city.stock.grain+city.stock.tools*3,railCost,harvests,firstDelivery,firstGrowth,
    fedPercent:Math.round(foodPulses/Math.max(1,Math.floor(seconds/20))*100),boostedPercent:Math.round(toolsPulses/Math.max(1,Math.floor(seconds/20))*100),
    deliveries:state.stats.deliveries,units:state.stats.unitsDelivered,timeline,markets:state.cities,trades};
}

export function runEconomyBenchmarks({seconds=900,tuning={}}={}){
  return ['near','distant','scarceFood'].flatMap(scenario=>['merchant','industrialist','agrarian','adaptive'].map(strategy=>simulateStrategy({strategy,scenario,seconds,tuning})));
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const seconds=process.argv.includes('--long')?1800:900;
  const results=process.argv.includes('--compare')?
    [{balance:'initial',tuning:{farmOutput:6,toolPrice:3,prosperity:'legacy'}},{balance:'current',tuning:{}}]
      .flatMap(({balance,tuning})=>runEconomyBenchmarks({seconds,tuning}).map(result=>({balance,...result}))):runEconomyBenchmarks({seconds});
  if(process.argv.includes('--json'))process.stdout.write(`${JSON.stringify(results,null,2)}\n`);
  else console.table(results.map(({balance,scenario,strategy,gold,houses,wealth,fedPercent,firstDelivery,firstGrowth,deliveries})=>({...balance?{balance}:{},scenario,strategy,gold,houses,wealth,fedPercent,firstDelivery,firstGrowth,deliveries})));
}
