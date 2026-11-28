import {createDirectedRailNetwork} from './directed-rail-network.js';
import {createCircuitConsist,TRAIN_CAR_SPACING} from './train-consist.js';

export const LOOP_ECONOMY=Object.freeze({houseResources:8,productionSeconds:30,trainPerCity:10,pickup:10,visitGold:3,speed:5,dwell:1});
const GOODS=['resources','food'],EPS=1e-8;
const empty=()=>({resources:0,food:0});
const gains=(resource,amount)=>({...empty(),gold:0,...(resource?{[resource]:amount}:{})});
const copy=value=>structuredClone(value);
const whole=value=>Number.isSafeInteger(value)&&value>=0;
export function cityResource(world,city,{neutral=false}={}){
  if(neutral||city?.neutral||city?.ownerId===(world.gameplay?.farmVillages?.ownerId??'gray'))return 'food';
  return 'resources';
}

/** Resource ownership is global. Every home contributes one unit per thirty
 * resident-seconds; visual workers never change that rate. Trains mint a
 * separate ten-unit pickup at each visited city.
 * A purchased train delivers its accumulated load only after a whole loop. */
export function createLoopEconomy(world,{session,railways,networkFactory=createDirectedRailNetwork}={}){
  if(!session?.player||!railways?.snapshot)throw new TypeError('Economy requires a settlement session and railway authority');
  const accounts=new Map(),cities=new Map(),trains=new Map(),production=new Map(),events=[],locks=new Map();
  const stats={productionEvents:0,produced:{...empty(),gold:0},pickups:empty(),delivered:empty(),deliveries:0,laps:0,currencyMinted:0,trainsBought:0,trainSpent:0,construction:empty()};
  let time=0,revision=0,spatialKey=null,railRevision=null,network=null,nextTrain=1,nextEvent=1;
  const games=()=>[session.player,...(session.bots??[]).map(entry=>entry.game)];
  function emit(event){events.push({id:`loop-event:${nextEvent++}`,...event,time});if(events.length>256)events.shift();}
  const residents=value=>Number.isSafeInteger(value)&&value>0?value:0;
  function populationOf(game){
    if(Number.isFinite(game.population))return residents(game.population);
    const houses=game.houses;
    return Array.isArray(houses)?houses.length:(game.cities??[]).reduce((sum,city)=>sum+residents(city.houseCount),0);
  }
  function setProduction(id,ownerId,resource,population,point,cityId){
    let source=production.get(id);
    if(!source){source={id,ownerId,resource,population:0,fraction:0,nextAt:Infinity};production.set(id,source);}
    if(source.population!==population){
      // Preserve earned fractions when homes are built or removed, including
      // a completely empty settlement which may be inhabited again later.
      if(source.population)source.fraction=Math.max(0,Math.min(1,1-(source.nextAt-time)*source.population/LOOP_ECONOMY.productionSeconds));
      source.population=population;
      source.nextAt=population?time+(1-source.fraction)*LOOP_ECONOMY.productionSeconds/population:Infinity;
    }
    Object.assign(source,{ownerId,resource,cityId,x:point?.x??0,y:Number.isFinite(point?.y)?point.y:0,z:point?.z??0});
  }
  function sync(){
    const owned=games(),villages=world.gameplay?.farmVillages;
    const key=`${session.spatialRevision??session.revision??0}:${owned.map(game=>`${game.ownerId}:${game.spatialRevision??game.revision??0}:${populationOf(game)}`).join('|')}:${(villages?.cities??[]).map(city=>`${city.id}:${city.houseCount??city.houseIds?.length??0}`).join('|')}`;
    for(const game of owned){
      if(!accounts.has(game.ownerId))accounts.set(game.ownerId,{game,resources:0,food:0,gold:0,neutral:false});
      else accounts.get(game.ownerId).game=game;
    }
    if(key===spatialKey)return;
    spatialKey=key;cities.clear();
    const activeProduction=new Set();
    for(const game of owned){
      for(const city of game.cities??[])cities.set(city.id,{...city,ownerId:game.ownerId,neutral:false,resource:'resources'});
      const city=(game.cities??[])[0],point=city??game.clusters?.[0]??game.houses?.[0],id=`owner:${game.ownerId}`;
      setProduction(id,game.ownerId,'resources',populationOf(game),point,city?.id??null);activeProduction.add(id);
    }
    const neutralOwner=villages?.ownerId??'gray';
    for(const city of villages?.cities??[]){
      const ownerId=city.ownerId??neutralOwner;
      if(!accounts.has(ownerId))accounts.set(ownerId,{resources:0,food:0,gold:0,neutral:true});
      cities.set(city.id,{...city,ownerId,neutral:true,resource:'food'});
      const id=`village:${city.id}`,population=residents(city.houseCount??city.houseIds?.length);
      setProduction(id,ownerId,'food',population,city,city.id);activeProduction.add(id);
    }
    for(const [id,source]of production)if(!activeProduction.has(id))setProduction(id,source.ownerId,source.resource,0,source,source.cityId);
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
    return {resources:account.game?.logs??account.resources,food:account.food,gold:account.game?.gold??account.gold};
  }
  function credit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount))return false;
    const current=balance(ownerId)[resource];if(!Number.isSafeInteger(current+amount))return false;
    if(resource==='resources'&&account.game)return account.game.addLogs(amount)?.ok===true;
    if(resource==='gold'&&account.game)return account.game.creditGold(amount)?.ok===true;
    account[resource]+=amount;return true;
  }
  function debit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount)||balance(ownerId)[resource]<amount)return false;
    if(!amount)return true;
    if(resource==='resources'&&account.game)return account.game.spendLogs(amount)?.ok===true;
    if(resource==='gold'&&account.game)return account.game.spendGold(amount)?.ok===true;
    account[resource]-=amount;return true;
  }
  function resourcesAt(ownerId,_point){
    sync();const resources=balance(ownerId)??{...empty(),gold:0};
    return {...resources,timber:resources.resources,grain:0,tools:0,cityId:[...cities.values()].find(city=>city.ownerId===ownerId)?.id??null};
  }
  function spendConstruction(ownerId,_point,cost){
    sync();
    if(!cost||Object.entries(cost).some(([key,value])=>!['resources','timber','food','tools'].includes(key)||!whole(value))||cost.resources!==undefined&&cost.timber!==undefined||cost.tools>0)return {ok:false,code:'invalid-cost'};
    const charges={resources:cost.resources??cost.timber??0,food:cost.food??0},wallet=balance(ownerId);
    if(!accounts.get(ownerId)?.game)return {ok:false,code:'unknown-owner'};
    for(const resource of GOODS)if(wallet[resource]<charges[resource])return {ok:false,code:`not-enough-${resource}`,reason:`Need ${charges[resource]-wallet[resource]} more ${resource}`};
    for(const resource of GOODS){debit(ownerId,resource,charges[resource]);stats.construction[resource]+=charges[resource];}
    revision++;return {ok:true,cost:copy(charges),resources:resourcesAt(ownerId)};
  }
  function creditProduction(){return {ok:false,code:'production-is-passive'};}
  function produce(source){
    if(credit(source.ownerId,source.resource,1)){
      stats.productionEvents++;stats.produced[source.resource]++;revision++;
      emit({type:'production',ownerId:source.ownerId,cityId:source.cityId,resource:source.resource,amount:1,
        resources:gains(source.resource,1),x:source.x,y:source.y,z:source.z,population:source.population});
    }
    source.fraction=0;source.nextAt+=LOOP_ECONOMY.productionSeconds/source.population;
  }
  function loopInfo(loop){
    const cityIds=[...new Set(loop.cityIds??loop.stops?.map(stop=>stop.cityId)??[])];
    return {id:loop.id,cityIds,stationIds:[...(loop.stationIds??[])],length:loop.length,cost:LOOP_ECONOMY.trainPerCity*cityIds.length,
      stops:(loop.stops??[]).map(stop=>{
        const point=network.sample(loop,stop.distance);
        return {...stop,resource:cities.get(stop.cityId)?.resource??'resources',...(point&&{x:point.x,y:Number.isFinite(point.y)?point.y:0,z:point.z})};
      }),
      segments:(loop.segments??loop.pieces??[]).map(piece=>({...piece})),
      trainCount:[...trains.values()].filter(train=>train.loop.id===loop.id).length};
  }
  function citySnapshot(city){
    syncNetwork();const loops=city.level>=2?network.loops(city.id).map(loopInfo):[];
    const population=production.get(city.neutral?`village:${city.id}`:`owner:${city.ownerId}`)?.population??0;
    return {...city,population,productionRate:population/LOOP_ECONOMY.productionSeconds,loops,trainCost:loops[0]?.cost??null,hasStation:city.level>=2,
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
    const consist=createCircuitConsist(loop,cityId);
    if(!consist)return {ok:false,code:'no-complete-loop',reason:'Complete a one-way loop first'};
    if(!consist.fits)return {ok:false,code:'circuit-too-short',reason:'This circuit is too short for all of its carriages',minimumLength:consist.minimumLength};
    if(!debit(ownerId,'gold',info.cost))return {ok:false,code:'not-enough-gold',reason:`Need ${info.cost} gold for this train`,cost:info.cost};
    const train={id:`loop-train:${nextTrain++}`,ownerId,homeCityId:cityId,loop,network,locks:keysFor(loop),stops:consist.stops,
      origin:consist.origin,departureCars:consist.departure,cars:consist.cars.map(car=>({...car,amount:0})),
      distance:0,nextStop:0,state:'waiting',stopCityId:cityId,stopCarIndices:[],readyAt:time,eventAt:Infinity,departure:time,departureDistance:0,cargo:empty(),laps:0};
    trains.set(train.id,train);stats.trainsBought++;stats.trainSpent+=info.cost;revision++;
    emit({type:'train-bought',trainId:train.id,ownerId,cityId,cost:info.cost,loopId});dispatch();
    return {ok:true,id:train.id,trainId:train.id,cost:info.cost,loop:info};
  }
  function stationLocation(train,car){
    const point=train.network.sample(train.loop,car.stationDistance);
    return {stationId:car.stationId,carIndex:car.index,...(point&&{x:point.x,y:Number.isFinite(point.y)?point.y:0,z:point.z})};
  }
  function visit(train,car){
    const cityId=car.cityId;
    const city=cities.get(cityId);if(!city)return;
    car.resource=city.resource;car.amount=LOOP_ECONOMY.pickup;
    if(car.amount){train.cargo[city.resource]+=car.amount;stats.pickups[city.resource]+=car.amount;}
    const gold=credit(city.ownerId,'gold',LOOP_ECONOMY.visitGold)?LOOP_ECONOMY.visitGold:0;stats.currencyMinted+=gold;
    emit({type:'pickup',trainId:train.id,ownerId:train.ownerId,cityId,cityOwnerId:city.ownerId,resource:city.resource,
      amount:LOOP_ECONOMY.pickup,gold,resources:gains(city.resource,LOOP_ECONOMY.pickup),
      ...stationLocation(train,car)});revision++;
  }
  function load(train,indices){
    train.stopCarIndices=indices;train.stopCityId=train.cars[indices[0]].cityId;
    for(const index of indices)visit(train,train.cars[index]);
    train.state='dwell';train.eventAt=time+LOOP_ECONOMY.dwell;
  }
  function dispatch(){
    for(const train of [...trains.values()].filter(item=>item.state==='waiting').sort((a,b)=>a.readyAt-b.readyAt||a.id.localeCompare(b.id))){
      if(train.locks.some(key=>locks.has(key)))continue;
      for(const key of train.locks)locks.set(key,train.id);
      train.distance=0;train.nextStop=0;load(train,train.departureCars);
    }
  }
  function advanceEvent(train){
    if(train.state==='dwell'){
      train.state='moving';train.stopCityId=null;train.stopCarIndices=[];train.departure=time;train.departureDistance=train.distance;
      const destination=train.stops[train.nextStop]?.distance??train.loop.length;
      train.eventAt=time+(destination-train.distance)/LOOP_ECONOMY.speed;return;
    }
    if(train.state!=='moving')return;
    const stop=train.stops[train.nextStop];
    if(stop){train.distance=stop.distance;train.nextStop++;load(train,stop.carIndices);return;}
    train.distance=train.loop.length;
    const delivered=gains();
    for(const resource of GOODS){
      const amount=train.cargo[resource];if(!amount)continue;
      if(credit(train.ownerId,resource,amount)){delivered[resource]=amount;stats.delivered[resource]+=amount;stats.deliveries++;}
    }
    train.laps++;stats.laps++;emit({type:'delivery',trainId:train.id,ownerId:train.ownerId,cityId:train.homeCityId,cargo:copy(train.cargo),resources:delivered,
      lap:train.laps,...stationLocation(train,train.cars[0])});
    for(const car of train.cars)car.amount=0;
    train.cargo=empty();train.state='waiting';train.stopCityId=train.homeCityId;train.stopCarIndices=[];train.eventAt=Infinity;train.readyAt=time;revision++;
    for(const key of train.locks)if(locks.get(key)===train.id)locks.delete(key);
  }
  function update(dt){
    if(!Number.isFinite(dt)||dt<=0)return;
    sync();syncNetwork();const target=time+dt;dispatch();
    while(time<target-EPS){
      let next=target;for(const train of trains.values())next=Math.min(next,train.eventAt);
      for(const source of production.values())next=Math.min(next,source.nextAt);
      time=next;
      for(const source of production.values())if(source.nextAt<=time+EPS)produce(source);
      for(const train of trains.values())if(train.eventAt<=time+EPS)advanceEvent(train);
      dispatch();
    }
    time=target;
  }
  function trainSnapshot(train){
    const along=train.state==='moving'?train.departureDistance+(time-train.departure)*LOOP_ECONOMY.speed:train.distance;
    const carPoses=train.cars.map(car=>train.network.sample(train.loop,train.origin+along-car.offset)),pose=carPoses[0];
    const resource=GOODS.find(good=>train.cargo[good]>0)??null;
    const dwellRemaining=train.state==='dwell'?Math.max(0,Math.min(LOOP_ECONOMY.dwell,train.eventAt-time)):0;
    const nextStop=train.stops[train.nextStop],nextStopCityId=nextStop?train.cars[nextStop.carIndices[0]].cityId:train.homeCityId;
    const arrivalRemaining=train.state==='waiting'?null:dwellRemaining+Math.max(0,(nextStop?.distance??train.loop.length)-along)/LOOP_ECONOMY.speed;
    return {id:train.id,ownerId:train.ownerId,homeCityId:train.homeCityId,loopId:train.loop.id,state:train.state,
      stopCityId:train.stopCityId,dwellDuration:LOOP_ECONOMY.dwell,dwellRemaining,dwellProgress:train.state==='dwell'?1-dwellRemaining/LOOP_ECONOMY.dwell:0,
      nextStopCityId,arrivalRemaining,stopCarIndices:[...train.stopCarIndices],stopCityIds:train.stopCarIndices.map(index=>train.cars[index].cityId),
      cars:train.cars.map(car=>({...car,resource:car.resource??cities.get(car.cityId)?.resource??'resources'})),carCount:train.cars.length,spacing:TRAIN_CAR_SPACING,
      active:train.state!=='waiting',...pose,pose,carPoses,distance:along,length:train.loop.length,
      resource,amount:resource?train.cargo[resource]:0,quantity:resource?train.cargo[resource]:0,cargo:copy(train.cargo),backing:false,laps:train.laps};
  }
  sync();syncNetwork();
  return {mode:'loops',update,resourcesAt,spendConstruction,creditProduction,buyTrain,
    get revision(){return revision;},get elapsed(){return time;},get cities(){sync();return [...cities.values()].map(citySnapshot);},
    city(id){sync();const city=cities.get(id);return city?citySnapshot(city):null;},
    loops(cityId){sync();syncNetwork();return network.loops(cityId).map(loopInfo);},
    get trains(){return [...trains.values()].map(trainSnapshot);},drainEvents(){return events.splice(0);},
    snapshot(){sync();syncNetwork();return {mode:'loops',time,revision,stats:copy(stats),cities:[...cities.values()].map(citySnapshot),
      trains:[...trains.values()].map(trainSnapshot),owners:[...accounts].map(([ownerId,account])=>{
        const population=[...production.values()].filter(source=>source.ownerId===ownerId).reduce((sum,source)=>sum+source.population,0);
        return {ownerId,...balance(ownerId),neutral:account.neutral,population,productionRate:population/LOOP_ECONOMY.productionSeconds};
      }),locks:locks.size};},
  };
}
