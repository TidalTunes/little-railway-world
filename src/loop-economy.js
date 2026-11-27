import {biomeAt} from './biomes.js';
import {createDirectedRailNetwork} from './directed-rail-network.js';

export const LOOP_ECONOMY=Object.freeze({houseWood:8,trainPerCity:10,pickup:10,visitGold:3,speed:5,dwell:3});
const GOODS=['wood','metal','food'],ALL=[...GOODS,'gold'],EPS=1e-8;
const empty=()=>({wood:0,metal:0,food:0});
const copy=value=>structuredClone(value);
const whole=value=>Number.isSafeInteger(value)&&value>=0;
export function cityResource(world,city,{neutral=false}={}){
  if(neutral||city?.neutral||city?.ownerId===(world.gameplay?.farmVillages?.ownerId??'gray'))return 'food';
  // A city's founding site fixes its product. Expanding a frontage across a
  // biome border must not silently change every worker's job or train cargo.
  const ownerId=city?.ownerId,config=ownerId===world.gameplay?.ownerId?world.gameplay:
    world.gameplay?.playerBots?.find(entry=>entry.ownerId===ownerId);
  const anchor=config?.starterHouse;
  const biome=anchor?.biome??(anchor&&world.biomes?.regions?biomeAt(world,anchor.x,anchor.z):
    city?.biome??(world.biomes?.regions?biomeAt(world,city.x,city.z):'plains'));
  return biome==='forest'?'wood':biome==='desert'?'metal':'gold';
}

/** Resource ownership is global. Only completed, visible NPC work creates
 * production; trains mint a separate ten-unit pickup at each visited city.
 * A purchased train delivers its accumulated load only after a whole loop. */
export function createLoopEconomy(world,{session,railways,networkFactory=createDirectedRailNetwork}={}){
  if(!session?.player||!railways?.snapshot)throw new TypeError('Economy requires a settlement session and railway authority');
  const accounts=new Map(),cities=new Map(),trains=new Map(),completedWork=new Set(),events=[],locks=new Map();
  const stats={productionEvents:0,produced:{...empty(),gold:0},pickups:empty(),delivered:empty(),deliveries:0,laps:0,currencyMinted:0,trainsBought:0,trainSpent:0,construction:empty()};
  let time=0,revision=0,spatialKey=null,railRevision=null,network=null,nextTrain=1;
  const games=()=>[session.player,...(session.bots??[]).map(entry=>entry.game)];
  function emit(event){events.push({...event,time});if(events.length>256)events.shift();}
  function sync(){
    const owned=games(),key=`${session.spatialRevision??session.revision??0}:${owned.map(game=>`${game.ownerId}:${game.spatialRevision??game.revision??0}`).join('|')}`;
    for(const game of owned){
      if(!accounts.has(game.ownerId))accounts.set(game.ownerId,{game,metal:0,food:0,wood:0,gold:0,neutral:false});
      else accounts.get(game.ownerId).game=game;
    }
    if(key===spatialKey)return;
    spatialKey=key;cities.clear();
    for(const game of owned)for(const city of game.cities??[]){
      cities.set(city.id,{...city,ownerId:game.ownerId,neutral:false,resource:cityResource(world,city)});
    }
    const villages=world.gameplay?.farmVillages,neutralOwner=villages?.ownerId??'gray';
    for(const city of villages?.cities??[]){
      const ownerId=city.ownerId??neutralOwner;
      if(!accounts.has(ownerId))accounts.set(ownerId,{wood:0,metal:0,food:0,gold:0,neutral:true});
      cities.set(city.id,{...city,ownerId,neutral:true,resource:'food'});
    }
    revision++;
  }
  function syncNetwork(){
    const current=railways.revision??0;
    if(network&&railRevision===current)return;
    const snapshot=railways.snapshot();network=networkFactory(snapshot);railRevision=snapshot.revision??current;revision++;
    // A new junction can split a railway segment. Lock complete source lines,
    // so additions never invalidate a reservation held by an existing train.
  }
  function balance(ownerId){
    const account=accounts.get(ownerId);if(!account)return null;
    return {wood:account.game?.logs??account.wood,metal:account.metal,food:account.food,gold:account.game?.gold??account.gold};
  }
  function credit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount))return false;
    const current=balance(ownerId)[resource];if(!Number.isSafeInteger(current+amount))return false;
    if(resource==='wood'&&account.game)return account.game.addLogs(amount)?.ok===true;
    if(resource==='gold'&&account.game)return account.game.creditGold(amount)?.ok===true;
    account[resource]+=amount;return true;
  }
  function debit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount)||balance(ownerId)[resource]<amount)return false;
    if(!amount)return true;
    if(resource==='wood'&&account.game)return account.game.spendLogs(amount)?.ok===true;
    if(resource==='gold'&&account.game)return account.game.spendGold(amount)?.ok===true;
    account[resource]-=amount;return true;
  }
  function resourcesAt(ownerId,_point){
    sync();const resources=balance(ownerId)??{...empty(),gold:0};
    return {...resources,timber:resources.wood,grain:0,tools:0,cityId:[...cities.values()].find(city=>city.ownerId===ownerId)?.id??null};
  }
  function spendConstruction(ownerId,_point,cost){
    sync();
    if(!cost||Object.entries(cost).some(([key,value])=>!['wood','timber','metal','food','tools'].includes(key)||!whole(value))||cost.wood!==undefined&&cost.timber!==undefined||cost.tools>0)return {ok:false,code:'invalid-cost'};
    const charges={wood:cost.wood??cost.timber??0,metal:cost.metal??0,food:cost.food??0},wallet=balance(ownerId);
    if(!accounts.get(ownerId)?.game)return {ok:false,code:'unknown-owner'};
    for(const resource of GOODS)if(wallet[resource]<charges[resource])return {ok:false,code:`not-enough-${resource}`,reason:`Need ${charges[resource]-wallet[resource]} more ${resource}`};
    for(const resource of GOODS){debit(ownerId,resource,charges[resource]);stats.construction[resource]+=charges[resource];}
    revision++;return {ok:true,cost:copy(charges),resources:resourcesAt(ownerId)};
  }
  function creditProduction(ownerId,resource,quantity,eventId){
    sync();
    if(typeof eventId!=='string'||!eventId||!ALL.includes(resource)||!whole(quantity)||quantity===0)return {ok:false,code:'invalid-production'};
    const key=`${ownerId}:${eventId}`;
    if(completedWork.has(key))return {ok:true,duplicate:true,amount:0};
    const account=accounts.get(ownerId);if(!account)return {ok:false,code:'unknown-owner'};
    const city=[...cities.values()].find(city=>city.ownerId===ownerId);
    const homestead=account.game?.clusters?.[0]??account.game?.houses?.[0];
    const expected=city?.resource??cityResource(world,homestead,{neutral:account.neutral});
    if(resource!==expected)return {ok:false,code:'wrong-resource'};
    if(!credit(ownerId,resource,quantity))return {ok:false,code:'resource-overflow'};
    completedWork.add(key);stats.productionEvents++;stats.produced[resource]+=quantity;
    if(resource==='gold')stats.currencyMinted+=quantity;
    revision++;emit({type:'production',ownerId,cityId:city?.id??null,resource,amount:quantity,eventId});
    return {ok:true,amount:quantity,resources:resourcesAt(ownerId)};
  }
  function loopInfo(loop){
    const cityIds=[...new Set(loop.cityIds??loop.stops?.map(stop=>stop.cityId)??[])];
    return {id:loop.id,cityIds,stationIds:[...(loop.stationIds??[])],length:loop.length,cost:LOOP_ECONOMY.trainPerCity*cityIds.length,
      stops:(loop.stops??[]).map(stop=>({...stop,resource:cities.get(stop.cityId)?.resource??'gold'})),
      trainCount:[...trains.values()].filter(train=>train.loop.id===loop.id).length};
  }
  function citySnapshot(city){
    syncNetwork();const loops=city.level>=2?network.loops(city.id).map(loopInfo):[];
    return {...city,loops,trainCost:loops[0]?.cost??null,hasStation:city.level>=2,
      trains:[...trains.values()].filter(train=>train.homeCityId===city.id).length};
  }
  function keysFor(loop){return [...new Set([...(loop.pieces??loop.segments??[]).map(piece=>`line:${piece.lineId}`),...(loop.stationIds??[]).map(id=>`station:${id}`)])].sort();}
  function buyTrain(cityId,loopId,ownerId){
    sync();syncNetwork();const city=cities.get(cityId);
    if(!city||city.neutral||city.ownerId!==ownerId)return {ok:false,code:'not-your-city',reason:'Choose your own city'};
    if(city.level<2)return {ok:false,code:'station-locked',reason:'Six houses unlock a station'};
    const loop=network.loops(cityId).find(route=>route.id===loopId);
    if(!loop||!Number.isFinite(loop.length)||loop.length<=0)return {ok:false,code:'no-complete-loop',reason:'Complete a one-way loop first'};
    const info=loopInfo(loop);
    if(!info.cityIds.length||!info.cityIds.includes(cityId))return {ok:false,code:'no-complete-loop'};
    if(!debit(ownerId,'gold',info.cost))return {ok:false,code:'not-enough-gold',reason:`Need ${info.cost} gold for this train`,cost:info.cost};
    const stops=(loop.stops??[]).filter(stop=>stop.distance>EPS&&stop.distance<loop.length-EPS).sort((a,b)=>a.distance-b.distance);
    const train={id:`loop-train:${nextTrain++}`,ownerId,homeCityId:cityId,loop,network,locks:keysFor(loop),stops,
      distance:0,nextStop:0,state:'waiting',readyAt:time,eventAt:Infinity,departure:time,departureDistance:0,cargo:empty(),laps:0};
    trains.set(train.id,train);stats.trainsBought++;stats.trainSpent+=info.cost;revision++;
    emit({type:'train-bought',trainId:train.id,ownerId,cityId,cost:info.cost,loopId});dispatch();
    return {ok:true,id:train.id,trainId:train.id,cost:info.cost,loop:info};
  }
  function visit(train,cityId){
    const city=cities.get(cityId);if(!city)return;
    if(city.resource!=='gold'){train.cargo[city.resource]+=LOOP_ECONOMY.pickup;stats.pickups[city.resource]+=LOOP_ECONOMY.pickup;}
    if(credit(city.ownerId,'gold',LOOP_ECONOMY.visitGold))stats.currencyMinted+=LOOP_ECONOMY.visitGold;
    emit({type:'pickup',trainId:train.id,ownerId:train.ownerId,cityId,cityOwnerId:city.ownerId,resource:city.resource,
      amount:city.resource==='gold'?0:LOOP_ECONOMY.pickup,gold:LOOP_ECONOMY.visitGold});revision++;
  }
  function dispatch(){
    for(const train of [...trains.values()].filter(item=>item.state==='waiting').sort((a,b)=>a.readyAt-b.readyAt||a.id.localeCompare(b.id))){
      if(train.locks.some(key=>locks.has(key)))continue;
      for(const key of train.locks)locks.set(key,train.id);
      train.distance=0;train.nextStop=0;visit(train,train.homeCityId);train.state='dwell';train.eventAt=time+LOOP_ECONOMY.dwell;
    }
  }
  function advanceEvent(train){
    if(train.state==='dwell'){
      train.state='moving';train.departure=time;train.departureDistance=train.distance;
      const destination=train.stops[train.nextStop]?.distance??train.loop.length;
      train.eventAt=time+(destination-train.distance)/LOOP_ECONOMY.speed;return;
    }
    if(train.state!=='moving')return;
    const stop=train.stops[train.nextStop];
    if(stop){train.distance=stop.distance;train.nextStop++;visit(train,stop.cityId);train.state='dwell';train.eventAt=time+LOOP_ECONOMY.dwell;return;}
    train.distance=train.loop.length;
    for(const resource of GOODS){
      const amount=train.cargo[resource];if(!amount)continue;
      if(credit(train.ownerId,resource,amount)){stats.delivered[resource]+=amount;stats.deliveries++;}
    }
    train.laps++;stats.laps++;emit({type:'delivery',trainId:train.id,ownerId:train.ownerId,cityId:train.homeCityId,cargo:copy(train.cargo),lap:train.laps});
    train.cargo=empty();train.state='waiting';train.eventAt=Infinity;train.readyAt=time;revision++;
    for(const key of train.locks)if(locks.get(key)===train.id)locks.delete(key);
  }
  function update(dt){
    if(!Number.isFinite(dt)||dt<=0)return;
    sync();syncNetwork();const target=time+dt;dispatch();
    while(time<target-EPS){
      let next=target;for(const train of trains.values())next=Math.min(next,train.eventAt);
      time=next;
      for(const train of trains.values())if(train.eventAt<=time+EPS)advanceEvent(train);
      dispatch();
    }
    time=target;
  }
  function trainSnapshot(train){
    const along=train.state==='moving'?train.departureDistance+(time-train.departure)*LOOP_ECONOMY.speed:train.distance;
    const pose=train.network.sample(train.loop,along),wagon=train.network.sample(train.loop,along-2.6);
    const resource=GOODS.find(good=>train.cargo[good]>0)??null;
    return {id:train.id,ownerId:train.ownerId,homeCityId:train.homeCityId,loopId:train.loop.id,state:train.state,
      active:train.state!=='waiting',...pose,pose,carPoses:pose&&wagon?[pose,wagon]:[],distance:along,length:train.loop.length,
      resource,amount:resource?train.cargo[resource]:0,quantity:resource?train.cargo[resource]:0,cargo:copy(train.cargo),backing:false,laps:train.laps};
  }
  sync();syncNetwork();
  return {mode:'loops',update,resourcesAt,spendConstruction,creditProduction,buyTrain,
    get revision(){return revision;},get elapsed(){return time;},get cities(){sync();return [...cities.values()].map(citySnapshot);},
    city(id){sync();const city=cities.get(id);return city?citySnapshot(city):null;},
    loops(cityId){sync();syncNetwork();return network.loops(cityId).map(loopInfo);},
    get trains(){return [...trains.values()].map(trainSnapshot);},drainEvents(){return events.splice(0);},
    snapshot(){sync();syncNetwork();return {mode:'loops',time,revision,stats:copy(stats),cities:[...cities.values()].map(citySnapshot),
      trains:[...trains.values()].map(trainSnapshot),owners:[...accounts].map(([ownerId,account])=>({ownerId,...balance(ownerId),neutral:account.neutral})),locks:locks.size};},
  };
}
