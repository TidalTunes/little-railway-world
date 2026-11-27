import {createLoopEconomy} from './loop-economy.js';
import {biomeAt} from './biomes.js';
import {createTradeNetwork} from './trade-network.js';

export const ECONOMY=Object.freeze({pulse:20,capacity:6,speed:5,dwell:4,dispatchInterval:1,
  industryCost:6,industryCooldown:60,buildNeighborhood:10,stockBase:24,stockPerLevel:12,
  prices:Object.freeze({timber:1,grain:1,tools:3}),industries:Object.freeze(['lumber','farm','workshop'])});
const RESOURCES=['timber','grain','tools'],EPS=1e-8;
const empty=()=>({timber:0,grain:0,tools:0});
const copy=value=>structuredClone(value);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const validPoint=point=>Number.isFinite(point?.x)&&Number.isFinite(point?.z);
const validCost=cost=>cost&&Object.keys(cost).every(key=>RESOURCES.includes(key)&&Number.isSafeInteger(cost[key])&&cost[key]>=0);

/** The economy owns depots, production and freight, never scenery or residents.
 * Every shipment removes real goods and escrows a real payment before departure.
 * Rendering, camera changes and repeated reads cannot advance this authority. */
export function createSettlementEconomy(world,options={}){
  if(world.gameplay?.economy==='loops')return createLoopEconomy(world,options);
  const {session,railways,tuning={}}=options;
  if(!session?.player||!railways?.snapshot)throw new TypeError('Economy requires a settlement session and railway authority');
  const accounts=new Map(),depots=new Map(),aliases=new Map(),trains=new Map(),locks=new Map(),events=[];
  const freeIndustry=new Set(),firstCity=new Map(),settled=new Set();
  const farmOutput=Number.isSafeInteger(tuning.farmOutput)&&tuning.farmOutput>0?tuning.farmOutput:4;
  const prices={...ECONOMY.prices,tools:Number.isSafeInteger(tuning.toolPrice)&&tuning.toolPrice>0?tuning.toolPrice:ECONOMY.prices.tools};
  const stats={pulses:0,deliveries:0,unitsDelivered:0,tradeValue:0,currencyMinted:0,timberDeposited:0,
    produced:empty(),consumed:empty(),construction:empty(),industrySpent:empty(),discarded:empty()};
  let time=0,nextPulse=ECONOMY.pulse,nextDispatch=0,revision=0,nextShipment=1,dispatchCursor=0;
  let sessionKey=null,layoutKey='',railRevision=-1,network=null,infrastructure={stations:[]};
  const games=()=>[session.player,...(session.bots??[]).map(entry=>entry.game)];
  function emit(event){events.push({...event,time});if(events.length>256)events.shift();}
  function account(ownerId){return accounts.get(ownerId);}
  const gold=ownerId=>account(ownerId)?.game?.gold??account(ownerId)?.gold??0;
  function spendGold(ownerId,amount){
    if(amount===0)return true;
    const wallet=account(ownerId);if(!wallet||gold(ownerId)<amount)return false;
    if(wallet.game)return wallet.game.spendGold(amount)?.ok===true;
    wallet.gold-=amount;return true;
  }
  function creditGold(ownerId,amount){
    if(!amount)return;
    const wallet=account(ownerId);if(!wallet)throw new Error('Missing trade account');
    if(wallet.game)wallet.game.creditGold(amount);else wallet.gold+=amount;
  }
  function resolve(id){let next=id;while(aliases.has(next)&&aliases.get(next)!==next)next=aliases.get(next);return depots.get(next);}
  function terrain(city){
    if(city.biome)return city.biome;
    return world.biomes?.regions?biomeAt(world,city.x,city.z):'plains';
  }
  function industryFor(city,neutral){const biome=terrain(city);return neutral||biome==='farmland'?'farm':biome==='mountain'?'workshop':'lumber';}
  function cap(city){return ECONOMY.stockBase+ECONOMY.stockPerLevel*city.level;}
  const foodNeed=city=>Math.max(1,Math.ceil(city.houseCount/3));
  function reserve(city,resource){
    if(resource==='grain')return foodNeed(city)*(city.industry==='farm'?2:6);
    if(resource==='timber')return city.industry==='workshop'?Math.max(12,city.level*6)+(city.houseCount<15?8:0):city.neutral?0:8;
    return city.industry==='workshop'?city.level+(city.neutral||city.houseCount>=15?0:2):city.level*3+(city.neutral?0:2);
  }
  function demand(city,resource){return Math.max(0,Math.min(cap(city)-city.stock[resource]-city.incoming[resource],reserve(city,resource)-city.stock[resource]-city.incoming[resource]));}
  function output(city,boosted=false){
    const matching=city.industry==='lumber'&&city.biome==='forest'||city.industry==='farm'&&city.biome==='farmland'||city.industry==='workshop'&&city.biome==='mountain';
    const multiplier=(matching?1.15:1)*(boosted?1.5:1),result=empty();
    result[city.industry==='lumber'?'timber':city.industry==='farm'?'grain':'tools']=(city.industry==='farm'?farmOutput:city.industry==='lumber'?4:2)*city.level*multiplier;
    return result;
  }
  function sync(){
    const owned=games(),key=`${session.revision??''}:${owned.map(game=>`${game.ownerId}:${game.spatialRevision??game.revision??0}`).join('|')}`;
    if(key===sessionKey)return;
    sessionKey=key;
    for(const game of owned)accounts.set(game.ownerId,{game});
    const villages=world.gameplay?.farmVillages,neutralOwner=villages?.ownerId??'gray';
    if(villages?.cities?.length&&!accounts.has(neutralOwner))accounts.set(neutralOwner,{gold:12,neutral:true});
    const records=owned.flatMap(game=>game.cities.map(city=>({...city,ownerId:game.ownerId,homes:game.houses.filter(home=>home.cityId===city.id),neutral:false})))
      .concat((villages?.cities??[]).map(city=>({...city,ownerId:city.ownerId??neutralOwner,homes:(villages.houses??[]).filter(home=>home.cityId===city.id),neutral:true})));
    const nextLayout=records.map(city=>`${city.id}:${city.houseIds?.join(',')??city.homes.map(home=>home.id).join(',')}:${city.level}:${city.x}:${city.z}`).join('|');
    if(nextLayout===layoutKey)return;
    layoutKey=nextLayout;
    const active=new Set();
    for(const record of records){
      if(record.level<1||record.houseCount<3)continue;
      const ids=new Set(record.houseIds??record.homes.map(home=>home.id));
      let state=depots.get(record.id);
      const predecessors=[...depots.values()].filter(city=>city.ownerId===record.ownerId&&city.id!==record.id&&city.houseIds.some(id=>ids.has(id)));
      if(!state){
        state={id:record.id,ownerId:record.ownerId,stock:empty(),incoming:empty(),remainder:empty(),industry:predecessors[0]?.industry??industryFor(record,record.neutral),
          lastIndustryChange:Math.max(-Infinity,...predecessors.map(city=>city.lastIndustryChange)),lastServed:{timber:time,grain:time,tools:time},fed:false,boosted:false,income:0,totalIncome:0,production:empty(),consumption:empty(),houseIds:[]};
        depots.set(record.id,state);if(!firstCity.has(record.ownerId))firstCity.set(record.ownerId,record.id);
      }
      for(const previous of predecessors){
        for(const resource of RESOURCES){state.stock[resource]+=previous.stock[resource];state.incoming[resource]+=previous.incoming[resource];state.remainder[resource]+=previous.remainder[resource];}
        state.totalIncome+=previous.totalIncome;aliases.set(previous.id,record.id);depots.delete(previous.id);
        if(firstCity.get(record.ownerId)===previous.id)firstCity.set(record.ownerId,record.id);
      }
      Object.assign(state,{x:record.x,z:record.z,level:Math.max(1,Math.min(5,record.level)),houseCount:record.houseCount,
        houseIds:[...ids],homes:record.homes,neutral:record.neutral,biome:terrain(record),radius:record.radius??6});
      if(state.neutral)state.industry='farm';active.add(state.id);
    }
    // Construction currently cannot demolish a city. Keep a removed depot's
    // goods for in-flight receipts, but never produce or dispatch from it.
    for(const state of depots.values())state.active=active.has(state.id);
    railRevision=-1;revision++;
  }
  function syncNetwork(){
    if(network&&railRevision===railways.revision)return;
    infrastructure=railways.snapshot();railRevision=infrastructure.revision??railways.revision??0;
    network=createTradeNetwork(infrastructure);
    // New junctions split physical reservations. Reindex every in-flight trip
    // before admitting a new train, retaining the original trip's geometry.
    locks.clear();
    for(const train of trains.values())if(train.trip){
      train.trip.keys=routeLocks(network,train.trip.path);
      for(const key of train.trip.keys)locks.set(key,train.id);
    }
    for(const station of infrastructure.stations??[]){
      const city=resolve(station.cityId);if(!city?.active)continue;
      const id=`freight:${station.id}`;
      if(!trains.has(id))trains.set(id,{id,stationId:station.id,homeCityId:city.id,ownerId:city.ownerId,state:'idle',eventAt:Infinity,trip:null,cargo:null});
      else trains.get(id).homeCityId=city.id;
    }
  }
  function localCity(ownerId,point){
    if(!validPoint(point))return null;
    let selected=null,best=Infinity;
    for(const city of depots.values())if(city.active&&city.ownerId===ownerId){
      const nearby=city.homes.length?Math.min(...city.homes.map(home=>distance(home,point))):distance(city,point);
      if(nearby<=ECONOMY.buildNeighborhood&&nearby<best){best=nearby;selected=city;}
    }
    return selected;
  }
  function resourcesAt(ownerId,point){
    sync();const city=localCity(ownerId,point),carried=account(ownerId)?.game?.logs??0;
    return {timber:carried+(city?.stock.timber??0),grain:city?.stock.grain??0,tools:city?.stock.tools??0,cityId:city?.id??null};
  }
  function spendConstruction(ownerId,point,cost){
    if(!validCost(cost))return {ok:false,code:'invalid-cost',reason:'Invalid construction cost'};
    sync();if(!account(ownerId)?.game)return {ok:false,code:'unknown-owner',reason:'This owner cannot build'};
    const available=resourcesAt(ownerId,point);
    for(const resource of RESOURCES)if((cost[resource]??0)>available[resource])return {ok:false,code:`not-enough-${resource}`,reason:`Need ${(cost[resource]??0)-available[resource]} ${resource}`};
    const city=localCity(ownerId,point),game=account(ownerId)?.game,carried=Math.min(game?.logs??0,cost.timber??0);
    if(carried&&!game.spendLogs(carried)?.ok)return {ok:false,code:'not-enough-timber',reason:'Timber changed; try again'};
    for(const resource of RESOURCES){const amount=cost[resource]??0;if(city)city.stock[resource]-=amount-(resource==='timber'?carried:0);stats.construction[resource]+=amount;}
    revision++;return {ok:true,cost:copy(cost),resources:resourcesAt(ownerId,point)};
  }
  function depositTimber(ownerId,point,amount){
    sync();
    if(!Number.isSafeInteger(amount)||amount<=0)return {ok:false,code:'invalid-amount',reason:'Choose a positive whole amount of timber'};
    const game=account(ownerId)?.game,city=localCity(ownerId,point);
    if(!game||!city)return {ok:false,code:'no-nearby-city',reason:'Bring timber close to one of your cities'};
    if(game.logs<amount)return {ok:false,code:'not-enough-timber',reason:'You are not carrying that much timber'};
    const capacity=Math.max(0,cap(city)-city.stock.timber-city.incoming.timber);
    if(amount>capacity)return {ok:false,code:'depot-full',reason:capacity?`Room for ${capacity} more timber`:'The timber depot is full',capacity};
    if(!game.spendLogs(amount)?.ok)return {ok:false,code:'not-enough-timber',reason:'Timber changed; try again'};
    city.stock.timber+=amount;stats.timberDeposited+=amount;revision++;
    emit({type:'deposit',ownerId,cityId:city.id,resource:'timber',amount});
    return {ok:true,cityId:city.id,amount,totalTimber:city.stock.timber,carriedTimber:game.logs,resources:resourcesAt(ownerId,point)};
  }
  function setIndustry(cityId,type,ownerId){
    sync();const city=resolve(cityId);
    if(!city?.active||city.ownerId!==ownerId||city.neutral)return {ok:false,code:'not-your-city'};
    if(!ECONOMY.industries.includes(type))return {ok:false,code:'invalid-industry'};
    if(city.industry===type)return {ok:true,unchanged:true,cost:0};
    if(time-city.lastIndustryChange<ECONOMY.industryCooldown)return {ok:false,code:'industry-cooldown',remaining:ECONOMY.industryCooldown-(time-city.lastIndustryChange)};
    const free=firstCity.get(ownerId)===city.id&&!freeIndustry.has(ownerId),cost=free?0:ECONOMY.industryCost;
    if(cost){
      const game=account(ownerId).game,carried=Math.min(game.logs,cost);
      if(game.logs+city.stock.timber<cost)return {ok:false,code:'not-enough-timber',reason:`Need ${cost-game.logs-city.stock.timber} timber`};
      if(carried&&!game.spendLogs(carried)?.ok)return {ok:false,code:'not-enough-timber'};
      city.stock.timber-=cost-carried;stats.industrySpent.timber+=cost;
    }
    freeIndustry.add(ownerId);city.industry=type;city.lastIndustryChange=time;revision++;
    emit({type:'industry',cityId:city.id,ownerId,industry:type,cost});return {ok:true,cost,industry:type};
  }
  function pulse(){
    stats.pulses++;
    for(const city of depots.values()){
      if(!city.active)continue;
      const consumed=empty(),food=foodNeed(city),fed=Math.min(food,city.stock.grain);
      // Optional factory boosts may never eat the two tools saved for a home.
      // Keep one construction kit until the ordinary fifteen-home tier.
      const growthReserve=!city.neutral&&city.houseCount<15?2:0;
      const tools=Math.min(city.level,Math.max(0,city.stock.tools-growthReserve));
      consumed.grain=fed;consumed.tools=tools;city.stock.grain-=fed;city.stock.tools-=tools;
      city.fed=fed===food;city.boosted=tools===city.level;
      const production=output(city,city.boosted),produced=empty();
      for(const resource of RESOURCES)if(production[resource]>0){
        let amount=Math.floor(production[resource]+city.remainder[resource]+EPS);
        city.remainder[resource]=production[resource]+city.remainder[resource]-amount;
        amount=Math.min(amount,Math.max(0,cap(city)-city.stock[resource]-city.incoming[resource]));
        if(city.industry==='workshop'){
          const buildReserve=!city.neutral&&city.houseCount<15?8:0;
          amount=Math.min(amount,Math.max(0,city.stock.timber-buildReserve));city.stock.timber-=amount;consumed.timber+=amount;
        }
        city.stock[resource]+=amount;produced[resource]+=amount;
      }
      // Partial food still helps an under-supplied city; one food services the
      // three homes of a level. No population is destroyed by a shortage.
      const fedHouses=Math.floor(city.houseCount*fed/food);
      const prosperity=tuning.prosperity==='legacy'?tools:Math.floor(fedHouses*tools/food);
      const income=1+fedHouses+prosperity;
      creditGold(city.ownerId,income);city.income=income;city.totalIncome+=income;city.production=produced;city.consumption=consumed;
      stats.currencyMinted+=income;
      for(const resource of RESOURCES){stats.produced[resource]+=produced[resource];stats.consumed[resource]+=consumed[resource];}
      emit({type:'income',cityId:city.id,ownerId:city.ownerId,amount:income,houses:copy(city.homes),fed:city.fed,boosted:city.boosted});
    }
    revision++;
  }
  function shipment(seller,buyer,resource,limit=ECONOMY.capacity){
    const available=Math.floor(Math.max(0,seller.stock[resource]-reserve(seller,resource))),wanted=Math.floor(demand(buyer,resource));
    const price=seller.ownerId===buyer.ownerId?0:prices[resource];
    // A tool purchase cannot spend the last coins needed for the next meal.
    const mealReserve=resource==='grain'?0:Math.max(0,foodNeed(buyer)-buyer.stock.grain);
    const affordable=price?Math.floor(Math.max(0,gold(buyer.ownerId)-mealReserve)/price):Infinity;
    const quantity=Math.min(limit,available,wanted,affordable);if(quantity<1)return null;
    return {id:`shipment:${nextShipment}`,fromCityId:seller.id,toCityId:buyer.id,sellerOwnerId:seller.ownerId,buyerOwnerId:buyer.ownerId,resource,quantity,price,payment:quantity*price};
  }
  function reserveShipment(cargo){
    const seller=resolve(cargo.fromCityId),buyer=resolve(cargo.toCityId);
    if(!spendGold(buyer.ownerId,cargo.payment))return false;
    nextShipment++;seller.stock[cargo.resource]-=cargo.quantity;buyer.incoming[cargo.resource]+=cargo.quantity;buyer.lastServed[cargo.resource]=time;revision++;return true;
  }
  function candidates(seller,onlyBuyer=null){
    const choices=[];
    for(const buyer of onlyBuyer?[onlyBuyer]:depots.values()){
      if(!buyer.active||buyer.id===seller.id)continue;
      for(const resource of RESOURCES){
        const cargo=shipment(seller,buyer,resource);if(!cargo)continue;
        const shortage=resource==='grain'?buyer.stock.grain<foodNeed(buyer)?100:50:
          resource==='timber'?buyer.industry==='workshop'&&buyer.stock.timber<buyer.level*2?90:55:
          !buyer.neutral&&buyer.houseCount<15&&buyer.stock.tools<2?95:35;
        const waiting=Math.min(100,(time-buyer.lastServed[resource])/8);
        choices.push({buyer,cargo,priority:shortage+cargo.quantity+waiting});
      }
    }
    return choices;
  }
  function routeLocks(graph,path){
    return graph.reservationKeys(path);
  }
  function dispatch(){
    const list=[...trains.values()];if(!list.length)return;
    const start=dispatchCursor++%list.length;
    const waiting=[];
    for(let index=0;index<list.length;index++){
      const train=list[(start+index)%list.length];if(train.state!=='idle')continue;
      const seller=resolve(train.homeCityId);if(!seller?.active)continue;
      const options=[];
      for(const choice of candidates(seller)){
        const path=network.route(seller.id,choice.buyer.id);if(!path||path.length<=EPS)continue;
        const keys=routeLocks(network,path);
        options.push({...choice,path,keys,score:choice.priority/(1+path.length/300)});
      }
      options.sort((a,b)=>b.score-a.score||a.buyer.id.localeCompare(b.buyer.id));
      if(!options.length){train.waitSince=null;continue;}
      train.waitSince??=time;waiting.push({train,options,order:index});
    }
    // Rotating only a per-frame start index can phase-lock with trip durations.
    // Actual wait age wins; rotation is solely a stable, owner-neutral tie break.
    waiting.sort((a,b)=>a.train.waitSince-b.train.waitSince||a.order-b.order);
    for(const {train,options} of waiting){
      const chosen=options.find(option=>!option.keys.some(key=>locks.has(key)));if(!chosen)continue;
      // Earlier dispatches can reserve this buyer's final units or funds.
      const seller=resolve(train.homeCityId),cargo=shipment(seller,chosen.buyer,chosen.cargo.resource);
      if(!cargo||!reserveShipment(cargo))continue;
      for(const key of chosen.keys)locks.set(key,train.id);
      train.trip={network,path:chosen.path,keys:chosen.keys,fromCityId:seller.id,toCityId:chosen.buyer.id};
      train.cargo=cargo;train.waitSince=null;train.state='outbound';train.departure=time;train.eventAt=time+chosen.path.length/ECONOMY.speed;revision++;
      emit({type:'departure',trainId:train.id,...copy(cargo)});
    }
  }
  function deliver(train){
    const cargo=train.cargo;if(!cargo||settled.has(cargo.id))return;
    const buyer=resolve(cargo.toCityId);if(!buyer)throw new Error('Shipment destination disappeared');
    buyer.incoming[cargo.resource]-=cargo.quantity;buyer.stock[cargo.resource]+=cargo.quantity;
    creditGold(cargo.sellerOwnerId,cargo.payment);settled.add(cargo.id);if(settled.size>2048)settled.delete(settled.values().next().value);
    stats.deliveries++;stats.unitsDelivered+=cargo.quantity;stats.tradeValue+=cargo.payment;
    emit({type:'delivery',trainId:train.id,...copy(cargo)});train.cargo=null;revision++;
  }
  function arrive(train){
    if(train.state==='outbound'){
      deliver(train);train.state='unloading';train.eventAt=time+ECONOMY.dwell;
    }else if(train.state==='unloading'){
      const seller=resolve(train.trip.toCityId),buyer=resolve(train.trip.fromCityId);
      // A convenient return trip must not repeatedly take every tool before a
      // distant city's waiting train can load. It receives cargo only when its
      // home is the supplier's strongest reachable demand, just like dispatch.
      const offers=seller&&buyer?candidates(seller).map(choice=>{
        const path=network.route(seller.id,choice.buyer.id);
        return {...choice,score:path?choice.priority/(1+path.length/300):-Infinity};
      }).filter(choice=>Number.isFinite(choice.score)).sort((a,b)=>b.score-a.score):[];
      const backhaul=offers[0]?.buyer.id===buyer?.id?offers[0].cargo:null;
      if(backhaul&&reserveShipment(backhaul))train.cargo=backhaul;
      train.state='returning';train.departure=time;train.eventAt=time+train.trip.path.length/ECONOMY.speed;
    }else if(train.state==='returning'){
      deliver(train);train.state='home-dwell';train.eventAt=time+ECONOMY.dwell;
    }else if(train.state==='home-dwell'){
      for(const key of train.trip.keys)if(locks.get(key)===train.id)locks.delete(key);
      train.state='idle';train.eventAt=Infinity;train.trip=null;
    }
    revision++;
  }
  function update(dt){
    sync();syncNetwork();if(!Number.isFinite(dt)||dt<=0)return;
    const target=time+dt;
    while(time<target-EPS){
      let next=Math.min(target,nextPulse,nextDispatch);
      for(const train of trains.values())next=Math.min(next,train.eventAt);
      time=Math.max(time,next);
      for(const train of trains.values())if(train.eventAt<=time+EPS)arrive(train);
      if(nextPulse<=time+EPS){pulse();nextPulse+=ECONOMY.pulse;}
      if(nextDispatch<=time+EPS){dispatch();nextDispatch+=ECONOMY.dispatchInterval;}
    }
    time=target;
  }
  function citySnapshot(city){
    return {id:city.id,ownerId:city.ownerId,x:city.x,z:city.z,level:city.level,houseCount:city.houseCount,neutral:city.neutral,industry:city.industry,biome:city.biome,
      stock:copy(city.stock),incoming:copy(city.incoming),demand:Object.fromEntries(RESOURCES.map(resource=>[resource,demand(city,resource)])),
      reserve:Object.fromEntries(RESOURCES.map(resource=>[resource,reserve(city,resource)])),capacity:cap(city),foodNeed:foodNeed(city),fed:city.fed,boosted:city.boosted,
      income:city.income,totalIncome:city.totalIncome,production:copy(city.production),consumption:copy(city.consumption),rates:output(city,city.boosted),
      lastIndustryChange:Number.isFinite(city.lastIndustryChange)?city.lastIndustryChange:null,
      canChooseIndustry:!city.neutral&&firstCity.get(city.ownerId)===city.id&&!freeIndustry.has(city.ownerId),
      industryCost:firstCity.get(city.ownerId)===city.id&&!freeIndustry.has(city.ownerId)?0:ECONOMY.industryCost,
      industryCooldown:Math.max(0,ECONOMY.industryCooldown-(time-city.lastIndustryChange))};
  }
  function trainSnapshot(train){
    const base={id:train.id,ownerId:train.ownerId,homeCityId:train.homeCityId,state:train.state,active:!!train.trip,
      cargo:train.cargo?copy(train.cargo):null,resource:train.cargo?.resource??null,quantity:train.cargo?.quantity??0,amount:train.cargo?.quantity??0};
    if(!train.trip)return base;
    const {network:graph,path}=train.trip,back=train.state==='returning'||train.state==='home-dwell';
    const progress=train.state==='outbound'||train.state==='returning'?Math.max(0,Math.min(path.length,(time-train.departure)*ECONOMY.speed)):train.state==='unloading'?path.length:0;
    const at=back?train.state==='home-dwell'?0:path.length-progress:progress;
    const reversals=path.reversals.filter(reversal=>reversal.distance<=at+EPS).length;
    const backing=(reversals+Number(back))%2===1;
    function sample(at){
      const along=Math.max(0,Math.min(path.length,at)),point=graph.sample(path,along);
      // A station has seven units of straight spine on either side. Continue
      // that tangent for the rear car instead of stacking both cars together.
      if(point&&at!==along){point.x+=point.tangent.x*(at-along);point.y+=point.tangent.y*(at-along);point.z+=point.tangent.z*(at-along);}
      if(back&&point){point.angle+=Math.PI;point.heading+=Math.PI;point.tangent.x*=-1;point.tangent.y*=-1;point.tangent.z*=-1;}
      if(backing&&point){point.angle+=Math.PI;point.heading+=Math.PI;}
      return point;
    }
    const point=sample(at),wagon=sample(at+(back?-1:1)*(backing?2.6:-2.6));
    return {...base,...point,pose:point,carPoses:distance(point,wagon)>.6?[point,wagon]:[point],distance:progress,length:path.length,
      backing,fromCityId:back?train.trip.toCityId:train.trip.fromCityId,toCityId:back?train.trip.fromCityId:train.trip.toCityId};
  }
  sync();syncNetwork();
  return {update,resourcesAt,spendConstruction,depositTimber,setIndustry,
    get revision(){return revision;},get elapsed(){return time;},
    get cities(){sync();return [...depots.values()].filter(city=>city.active).map(citySnapshot);},
    city(id){sync();const result=resolve(id);return result?.active?citySnapshot(result):null;},
    get trains(){return [...trains.values()].map(trainSnapshot);},
    drainEvents(){return events.splice(0);},
    snapshot(){sync();return {time,revision,nextPulse,stats:copy(stats),cities:[...depots.values()].filter(city=>city.active).map(citySnapshot),trains:[...trains.values()].map(trainSnapshot),
      owners:[...accounts].map(([ownerId,wallet])=>({ownerId,gold:gold(ownerId),timber:wallet.game?.logs??0,neutral:!!wallet.neutral,
        stock:RESOURCES.reduce((total,resource)=>({...total,[resource]:[...depots.values()].filter(city=>city.ownerId===ownerId).reduce((sum,city)=>sum+city.stock[resource],0)}),{})})),
      escrow:[...trains.values()].reduce((sum,train)=>sum+(train.cargo?.payment??0),0),locks:locks.size};},
  };
}
