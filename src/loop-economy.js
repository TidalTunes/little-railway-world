import {createDirectedRailNetwork} from './directed-rail-network.js';
import {createCircuitConsist,TRAIN_CAR_SPACING} from './train-consist.js';
import {LOOP_ECONOMY_RULES,loopTrainCost} from './loop-economy-rules.js';

export const LOOP_ECONOMY=LOOP_ECONOMY_RULES;
const GOODS=['resources','food'],EPS=1e-8;
const empty=()=>({resources:0,food:0});
const gains=(resource,amount)=>({...empty(),...(resource?{[resource]:amount}:{})});
const copy=value=>structuredClone(value);
const whole=value=>Number.isSafeInteger(value)&&value>=0;
export function cityResource(world,city,{neutral=false}={}){
  if(neutral||city?.neutral||city?.ownerId===(world.gameplay?.farmVillages?.ownerId??'gray'))return 'food';
  return 'resources';
}

/** Resource ownership is global. Daytime minute ticks credit one unit per
 * resident; visual workers never change that rate. Trains mint a separate
 * two-unit pickup at each visited city and credit cargo only on return.
 * A purchased train delivers its accumulated load only after a whole loop. */
export function createLoopEconomy(world,{session,railways,networkFactory=createDirectedRailNetwork}={}){
  if(!session?.player||!railways?.snapshot)throw new TypeError('Economy requires a settlement session and railway authority');
  const accounts=new Map(),cities=new Map(),trains=new Map(),production=new Map(),events=[];
  const stats={productionEvents:0,produced:empty(),pickups:empty(),delivered:empty(),deliveries:0,laps:0,stationResources:0,trainsBought:0,trainSpent:0,construction:empty()};
  let time=0,revision=0,spatialKey=null,railRevision=null,network=null,nextTrain=1,nextEvent=1,nextTick=LOOP_ECONOMY.productionSeconds,trainRates=null;
  const games=()=>[session.player,...(session.bots??[]).map(entry=>entry.game)];
  function emit(event){events.push({id:`loop-event:${nextEvent++}`,...event,time});if(events.length>256)events.shift();}
  const residents=value=>Number.isSafeInteger(value)&&value>0?value:0;
  function populationOf(game){
    if(Number.isFinite(game.population))return residents(game.population);
    const houses=game.houses;
    return Array.isArray(houses)?houses.length:(game.cities??[]).reduce((sum,city)=>sum+residents(city.houseCount),0);
  }
  function setProduction(id,ownerId,resource,population,point,cityId){
    production.set(id,{id,ownerId,resource,population,cityId,x:point?.x??0,y:Number.isFinite(point?.y)?point.y:0,z:point?.z??0});
  }
  function clock(){
    const cycle=LOOP_ECONOMY.daySeconds+LOOP_ECONOMY.nightSeconds,within=time%cycle,daytime=within<LOOP_ECONOMY.daySeconds;
    const payout=daytime?time-within+(Math.floor(within/LOOP_ECONOMY.productionSeconds)+1)*LOOP_ECONOMY.productionSeconds:time-within+cycle+LOOP_ECONOMY.productionSeconds;
    return {elapsedSeconds:time,dayPhase:daytime?'day':'night',daytime,interval:LOOP_ECONOMY.productionSeconds,
      secondsUntilProduction:payout-time,secondsRemaining:payout-time,
      productionProgress:daytime?(within%LOOP_ECONOMY.productionSeconds)/LOOP_ECONOMY.productionSeconds:0,
      ticksRemaining:daytime?Math.ceil((LOOP_ECONOMY.daySeconds-within)/LOOP_ECONOMY.productionSeconds):0};
  }
  function sync(){
    const owned=games(),villages=world.gameplay?.farmVillages;
    const key=`${session.spatialRevision??session.revision??0}:${owned.map(game=>`${game.ownerId}:${game.spatialRevision??game.revision??0}:${populationOf(game)}`).join('|')}:${(villages?.cities??[]).map(city=>`${city.id}:${city.houseCount??city.houseIds?.length??0}`).join('|')}`;
    for(const game of owned){
      if(!accounts.has(game.ownerId))accounts.set(game.ownerId,{ownerId:game.ownerId,game,resources:0,food:0,neutral:false});
      else accounts.get(game.ownerId).game=game;
    }
    if(key===spatialKey)return;
    spatialKey=key;cities.clear();trainRates=null;
    const activeProduction=new Set();
    for(const game of owned){
      for(const city of game.cities??[])cities.set(city.id,{...city,ownerId:game.ownerId,neutral:false,resource:'resources'});
      const city=(game.cities??[])[0],point=city??game.clusters?.[0]??game.houses?.[0],id=`owner:${game.ownerId}`;
      setProduction(id,game.ownerId,'resources',populationOf(game),point,city?.id??null);activeProduction.add(id);
    }
    const neutralOwner=villages?.ownerId??'gray';
    for(const city of villages?.cities??[]){
      const ownerId=city.ownerId??neutralOwner;
      if(!accounts.has(ownerId))accounts.set(ownerId,{ownerId,resources:0,food:0,neutral:true});
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
    // Each train retains its captured circuit geometry when new junctions split
    // source lines. Newly purchased trains use the current network snapshot.
  }
  function balance(ownerId){
    const account=accounts.get(ownerId);if(!account)return null;
    return {resources:account.game?.logs??account.resources,food:account.game?.food??account.food};
  }
  function debit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount)||balance(ownerId)[resource]<amount)return false;
    if(!amount)return true;
    if(resource==='resources'&&account.game)return account.game.spendLogs(amount)?.ok===true;
    if(resource==='food'&&account.game?.spendFood)return account.game.spendFood(amount)?.ok===true;
    account[resource]-=amount;return true;
  }
  function credit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount))return false;
    const current=balance(ownerId)[resource];if(!Number.isSafeInteger(current+amount))return false;
    let ok=true;
    if(resource==='resources'&&account.game)ok=account.game.addLogs(amount)?.ok===true;
    else if(resource==='food'&&account.game?.addFood)ok=account.game.addFood(amount)?.ok===true;
    else account[resource]+=amount;
    return ok;
  }
  function spendResources(ownerId,amount){
    sync();if(!whole(amount))return {ok:false,code:'invalid-cost'};
    if(!debit(ownerId,'resources',amount))return {ok:false,code:'not-enough-resources',reason:'Not enough resources'};
    revision++;return {ok:true,amount};
  }
  function creditResources(ownerId,amount){
    sync();if(!credit(ownerId,'resources',amount))return {ok:false,code:'invalid-credit'};
    revision++;return {ok:true,amount,resources:resourcesAt(ownerId)};
  }
  function ratesFor(ownerId){
    if(!trainRates){
      trainRates=new Map([...accounts.keys()].map(id=>[id,gains()]));
      for(const train of trains.values()){
        const perMinute=60*LOOP_ECONOMY.speed/train.loop.length,owner=trainRates.get(train.ownerId);
        for(const car of train.cars){
          const city=cities.get(car.cityId);if(!city)continue;
          owner[city.resource]+=LOOP_ECONOMY.pickup*perMinute;
          const recipient=trainRates.get(city.ownerId);
          if(recipient&&!city.neutral)recipient.resources+=LOOP_ECONOMY.visitResources*perMinute;
        }
      }
    }
    const result={...(trainRates.get(ownerId)??gains())};
    if(clock().daytime)for(const source of production.values())if(source.ownerId===ownerId)result[source.resource]+=source.population;
    return result;
  }
  function resourcesAt(ownerId,_point){
    sync();const resources=balance(ownerId)??empty();
    return {...resources,timber:resources.resources,grain:0,tools:0,rates:ratesFor(ownerId),ratesEstimated:true,
      cityId:[...cities.values()].find(city=>city.ownerId===ownerId)?.id??null};
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
  function economyTick(){
    // The sunset boundary is the day's fifth payout, before night begins.
    const cycle=LOOP_ECONOMY.daySeconds+LOOP_ECONOMY.nightSeconds,daytime=((time-EPS)%cycle)<LOOP_ECONOMY.daySeconds;
    if(daytime)for(const source of production.values()){
      const amount=source.population;
      if(!amount||!credit(source.ownerId,source.resource,amount))continue;
      stats.produced[source.resource]+=amount;stats.productionEvents++;
      emit({type:'production',ownerId:source.ownerId,cityId:source.cityId,resource:source.resource,amount,gross:amount,
        resources:gains(source.resource,amount),population:source.population,x:source.x,y:source.y,z:source.z});
    }
    revision++;nextTick+=LOOP_ECONOMY.productionSeconds;
  }
  function loopInfo(loop){
    const cityIds=[...new Set(loop.cityIds??loop.stops?.map(stop=>stop.cityId)??[])];
    return {id:loop.id,cityIds,stationIds:[...(loop.stationIds??[])],length:loop.length,cost:loopTrainCost(cityIds.length),costResource:'resources',cargoCarCount:Math.max(0,cityIds.length-1),
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
    return {...city,population,productionRate:clock().daytime?population/60:0,rates:ratesFor(city.ownerId),loops,trainCost:loops[0]?.cost??null,hasStation:city.level>=2,
      trains:[...trains.values()].filter(train=>train.homeCityId===city.id).length};
  }
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
    if(!debit(ownerId,'resources',info.cost))return {ok:false,code:'not-enough-resources',reason:`Need ${info.cost} resources for this train`,cost:info.cost};
    const train={id:`loop-train:${nextTrain++}`,ownerId,homeCityId:cityId,loop,network,stops:consist.stops,
      origin:consist.origin,departureCars:consist.departure,cars:consist.cars.map(car=>({...car,amount:0})),
      distance:0,nextStop:0,eventAt:Infinity,lapStart:time,cargo:empty(),laps:0};
    trains.set(train.id,train);trainRates=null;stats.trainsBought++;stats.trainSpent+=info.cost;revision++;
    emit({type:'train-bought',trainId:train.id,ownerId,cityId,cost:info.cost,loopId});
    load(train,train.departureCars,false);scheduleArrival(train);
    return {ok:true,id:train.id,trainId:train.id,cost:info.cost,loop:info};
  }
  function stationLocation(train,car){
    const point=train.network.sample(train.loop,car.stationDistance);
    return {stationId:car.stationId,carIndex:car.index,...(point&&{x:point.x,y:Number.isFinite(point.y)?point.y:0,z:point.z})};
  }
  function stationBonus(train,car){
    const city=cities.get(car.cityId),amount=LOOP_ECONOMY.visitResources;
    if(!city||city.neutral||!credit(city.ownerId,'resources',amount))return;
    stats.stationResources+=amount;
    emit({type:'station-bonus',trainId:train.id,ownerId:city.ownerId,cityId:city.id,resource:'resources',amount,
      resources:gains('resources',amount),...stationLocation(train,car)});revision++;
  }
  function load(train,indices,arrival){
    for(const index of indices){
      const car=train.cars[index],city=cities.get(car.cityId);if(!city)continue;
      car.resource=city.resource;car.amount=LOOP_ECONOMY.pickup;
      train.cargo[city.resource]+=car.amount;stats.pickups[city.resource]+=car.amount;
      emit({type:'pickup',trainId:train.id,ownerId:train.ownerId,cityId:car.cityId,cityOwnerId:city.ownerId,
        resource:city.resource,amount:car.amount,resources:gains(city.resource,car.amount),...stationLocation(train,car)});
      if(arrival)stationBonus(train,car);
      revision++;
    }
  }
  function scheduleArrival(train){
    const destination=train.stops[train.nextStop]?.distance??train.loop.length;
    train.eventAt=train.lapStart+destination/LOOP_ECONOMY.speed;
  }
  function advanceEvent(train){
    const stop=train.stops[train.nextStop];
    if(stop){
      train.distance=stop.distance;train.nextStop++;load(train,stop.carIndices,true);scheduleArrival(train);return;
    }
    const delivered=gains();
    for(const resource of GOODS){
      const amount=train.cargo[resource];if(!amount||!credit(train.ownerId,resource,amount))continue;
      delivered[resource]=amount;stats.delivered[resource]+=amount;stats.deliveries++;
    }
    // A return is one actual passage for every car aligned at the loop seam.
    // Reloading their next cargo is separate and cannot pay a second bonus.
    for(const index of train.departureCars)stationBonus(train,train.cars[index]);
    train.laps++;stats.laps++;emit({type:'delivery',trainId:train.id,ownerId:train.ownerId,cityId:train.homeCityId,
      cityOwnerId:cities.get(train.homeCityId)?.ownerId,cargo:copy(train.cargo),resources:delivered,
      lap:train.laps,...stationLocation(train,train.cars[0])});
    for(const car of train.cars)car.amount=0;
    train.cargo=empty();train.distance=0;train.nextStop=0;train.lapStart=train.eventAt;
    load(train,train.departureCars,false);scheduleArrival(train);revision++;
  }
  function update(dt,{elapsedSeconds}={}){
    const target=Number.isFinite(elapsedSeconds)?Math.max(time,elapsedSeconds):Number.isFinite(dt)&&dt>0?time+dt:time;
    if(target<=time)return;
    sync();syncNetwork();
    while(time<target){
      let next=Math.min(target,nextTick);for(const train of trains.values())next=Math.min(next,train.eventAt);
      time=next;
      if(nextTick<=time)economyTick();
      for(const train of trains.values())if(train.eventAt<=time)advanceEvent(train);
    }
    time=target;
  }
  function trainSnapshot(train){
    const along=(time-train.lapStart)*LOOP_ECONOMY.speed;
    const carPoses=train.cars.map(car=>train.network.sample(train.loop,train.origin+along-car.offset)),pose=carPoses[0];
    const resource=GOODS.find(good=>train.cargo[good]>0)??null;
    const nextStop=train.stops[train.nextStop],nextStopCityId=nextStop?train.cars[nextStop.carIndices[0]].cityId:train.homeCityId;
    const arrivalRemaining=Math.max(0,train.eventAt-time);
    return {id:train.id,ownerId:train.ownerId,homeCityId:train.homeCityId,loopId:train.loop.id,state:'moving',
      nextStopCityId,arrivalRemaining,
      cars:train.cars.map(car=>({...car,resource:car.resource??cities.get(car.cityId)?.resource??'resources'})),carCount:train.cars.length,spacing:TRAIN_CAR_SPACING,
      active:true,...pose,pose,carPoses,distance:along,length:train.loop.length,
      resource,amount:resource?train.cargo[resource]:0,quantity:resource?train.cargo[resource]:0,cargo:copy(train.cargo),backing:false,laps:train.laps};
  }
  sync();syncNetwork();
  return {mode:'loops',update,resourcesAt,spendResources,creditResources,spendConstruction,creditProduction,buyTrain,
    get revision(){return revision;},get elapsed(){return time;},get cities(){sync();return [...cities.values()].map(citySnapshot);},
    city(id){sync();const city=cities.get(id);return city?citySnapshot(city):null;},
    loops(cityId){sync();syncNetwork();return network.loops(cityId).map(loopInfo);},
    get trains(){return [...trains.values()].map(trainSnapshot);},drainEvents(){return events.splice(0);},
    snapshot(){sync();syncNetwork();return {mode:'loops',time,clock:clock(),revision,stats:copy(stats),cities:[...cities.values()].map(citySnapshot),
      trains:[...trains.values()].map(trainSnapshot),owners:[...accounts].map(([ownerId,account])=>{
        const population=[...production.values()].filter(source=>source.ownerId===ownerId).reduce((sum,source)=>sum+source.population,0);
        return {ownerId,...resourcesAt(ownerId),neutral:account.neutral,population,productionRate:clock().daytime?population/60:0};
      })};},
  };
}
