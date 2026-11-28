import {createDirectedRailNetwork} from './directed-rail-network.js';
import {createCircuitConsist,TRAIN_CAR_SPACING} from './train-consist.js';
import {createRailTraffic} from './rail-traffic.js';
import {LOOP_ECONOMY_RULES,loopTrainCost} from './loop-economy-rules.js';

export const LOOP_ECONOMY=LOOP_ECONOMY_RULES;
const GOODS=['resources','food'],EPS=1e-8,STEP=LOOP_ECONOMY.trafficStep;
const empty=()=>({resources:0,food:0});
const gains=(resource,amount)=>({...empty(),gold:0,...(resource?{[resource]:amount}:{})});
const copy=value=>structuredClone(value);
const whole=value=>Number.isSafeInteger(value)&&value>=0;
export function cityResource(world,city,{neutral=false}={}){
  if(neutral||city?.neutral||city?.ownerId===(world.gameplay?.farmVillages?.ownerId??'gray'))return 'food';
  return 'resources';
}

/** Player goods are global; gray food belongs to each village. Production is
 * the only automatic source of goods. Trains transfer finite stock and held
 * fares, then deliver their cargo at home; visuals never credit the economy. */
export function createLoopEconomy(world,{session,railways,networkFactory=createDirectedRailNetwork,trafficFactory=createRailTraffic}={}){
  if(!session?.player||!railways?.snapshot)throw new TypeError('Economy requires a settlement session and railway authority');
  const accounts=new Map(),cities=new Map(),trains=new Map(),production=new Map(),villageStocks=new Map(),events=[],fleet=[];
  const stats={productionEvents:0,produced:empty(),pickups:empty(),delivered:empty(),deliveries:0,laps:0,goldReserved:0,goldPaid:0,goldRefunded:0,emptyVisits:0,trainsBought:0,trainsLost:0,trainSpent:0,construction:empty()};
  let fleetDirty=false,time=0,simulationTick=0,revision=0,spatialKey=null,railRevision=null,network=null,nextTrain=1,nextEvent=1,nextTick=LOOP_ECONOMY.productionSeconds;
  const traffic=trafficFactory({sample:(train,distance,out)=>train.network.sample(train.loop,train.origin+distance,out),spacing:TRAIN_CAR_SPACING,deceleration:LOOP_ECONOMY.deceleration});
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
      if(!accounts.has(game.ownerId))accounts.set(game.ownerId,{ownerId:game.ownerId,game,resources:0,food:0,gold:LOOP_ECONOMY.startGold,neutral:false});
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
      if(!accounts.has(ownerId))accounts.set(ownerId,{ownerId,resources:0,food:0,gold:0,neutral:true});
      cities.set(city.id,{...city,ownerId,neutral:true,resource:'food'});
      if(!villageStocks.has(city.id)){const food=city.foodStock??city.stock?.food??0;villageStocks.set(city.id,{ownerId,food:whole(food)?food:0});}
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
    let food=account.game?.food??account.food;
    if(account.neutral){food=0;for(const stock of villageStocks.values())if(stock.ownerId===ownerId)food+=stock.food;}
    return {resources:account.game?.logs??account.resources,food,gold:account.game?.gold??account.gold};
  }
  function debit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount)||balance(ownerId)[resource]<amount)return false;
    if(!amount)return true;
    if(resource==='resources'&&account.game)return account.game.spendLogs(amount)?.ok===true;
    if(resource==='food'&&account.game?.spendFood)return account.game.spendFood(amount)?.ok===true;
    if(resource==='gold'&&account.game?.spendGold)return account.game.spendGold(amount)?.ok===true;
    account[resource]-=amount;return true;
  }
  function credit(ownerId,resource,amount){
    const account=accounts.get(ownerId);if(!account||!whole(amount))return false;
    const current=balance(ownerId)[resource];if(!Number.isSafeInteger(current+amount))return false;
    let ok=true;
    if(resource==='resources'&&account.game)ok=account.game.addLogs(amount)?.ok===true;
    else if(resource==='food'&&account.game?.addFood)ok=account.game.addFood(amount)?.ok===true;
    else if(resource==='gold'&&account.game?.creditGold)ok=account.game.creditGold(amount)?.ok===true;
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
  function cityStock(city){
    return city.neutral?{resources:0,food:villageStocks.get(city.id)?.food??0,gold:balance(city.ownerId)?.gold??0}:balance(city.ownerId)??gains();
  }
  function debitCity(city,resource,amount){
    if(!city.neutral)return debit(city.ownerId,resource,amount);
    const stock=villageStocks.get(city.id);if(resource!=='food'||!stock||stock.food<amount)return false;
    stock.food-=amount;return true;
  }
  function creditCity(city,resource,amount){
    if(!city.neutral)return credit(city.ownerId,resource,amount);
    const stock=villageStocks.get(city.id);if(resource!=='food'||!stock||!whole(stock.food+amount))return false;
    stock.food+=amount;return true;
  }
  function travelSeconds(distance,speed=0){
    if(distance<=EPS)return 0;
    const a=LOOP_ECONOMY.acceleration,b=LOOP_ECONOMY.deceleration,v=LOOP_ECONOMY.speed;
    const peak=Math.sqrt((2*a*b*distance+b*speed*speed)/(a+b));
    if(peak<=v)return Math.max(0,(peak-speed)/a)+peak/b;
    return Math.max(0,(v-speed)/a)+v/b+Math.max(0,distance-(v*v-speed*speed)/(2*a)-v*v/(2*b))/v;
  }
  function circuitSeconds(train){
    if(train.lastTripSeconds)return train.lastTripSeconds+LOOP_ECONOMY.dwell;
    let at=0,duration=0;
    for(const stop of train.stops){duration+=travelSeconds(stop.distance-at)+LOOP_ECONOMY.dwell;at=stop.distance;}
    return duration+travelSeconds(train.loop.length-at)+LOOP_ECONOMY.dwell;
  }
  function ratesFor(ownerId){
    // These are capped forecasts, never early credits. Competing requests share
    // the available per-city stock and each buyer's available/reserved money.
    const result=gains(),requests=[],demand=new Map(),budgets=new Map(),ownerDemand=new Map();
    for(const source of production.values())if(source.ownerId===ownerId&&clock().daytime)result[source.resource]+=source.population;
    for(const train of fleet)if(train.active&&['moving','dwell'].includes(train.state)){
      const frequency=60/circuitSeconds(train);
      budgets.set(train.ownerId,(budgets.get(train.ownerId)??balance(train.ownerId)?.gold??0)+train.escrow);
      for(const car of train.cars)if(car.cityId!==train.homeCityId&&cities.has(car.cityId)){
        requests.push({train,car,frequency});ownerDemand.set(train.ownerId,(ownerDemand.get(train.ownerId)??0)+frequency*LOOP_ECONOMY.pickupGold);
      }
    }
    for(const request of requests){
      request.frequency*=Math.min(1,(budgets.get(request.train.ownerId)??0)/Math.max(EPS,ownerDemand.get(request.train.ownerId)??0));
      demand.set(request.car.cityId,(demand.get(request.car.cityId)??0)+request.frequency*LOOP_ECONOMY.pickup);
    }
    for(const {train,car,frequency}of requests){
      const city=cities.get(car.cityId),source=production.get(city.neutral?`village:${city.id}`:`owner:${city.ownerId}`);
      const supply=cityStock(city)[city.resource]+(clock().daytime?source?.population??0:0);
      const amount=frequency*Math.min(1,supply/Math.max(EPS,demand.get(city.id)??0));
      if(train.ownerId===ownerId){result[city.resource]+=amount*LOOP_ECONOMY.pickup;result.gold-=amount*LOOP_ECONOMY.pickupGold;}
      if(city.ownerId===ownerId){result[city.resource]-=amount*LOOP_ECONOMY.pickup;result.gold+=amount*LOOP_ECONOMY.pickupGold;}
    }
    return result;
  }
  function resourcesAt(ownerId,_point){
    sync();const resources=balance(ownerId)??gains();
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
      const village=source.resource==='food'?cities.get(source.cityId):null;
      if(!amount||!(village?creditCity(village,source.resource,amount):credit(source.ownerId,source.resource,amount)))continue;
      stats.produced[source.resource]+=amount;stats.productionEvents++;
      emit({type:'production',ownerId:source.ownerId,cityId:source.cityId,resource:source.resource,amount,gross:amount,
        resources:gains(source.resource,amount),population:source.population,x:source.x,y:source.y,z:source.z});
    }
    revision++;nextTick+=LOOP_ECONOMY.productionSeconds;
  }
  function loopInfo(loop){
    const cityIds=[...new Set(loop.cityIds??loop.stops?.map(stop=>stop.cityId)??[])];
    return {id:loop.id,cityIds,stationIds:[...(loop.stationIds??[])],length:loop.length,cost:loopTrainCost(cityIds.length),costResource:'resources',cargoCarCount:Math.max(0,cityIds.length-1),departureGold:Math.max(0,cityIds.length-1)*LOOP_ECONOMY.pickupGold,
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
    return {...city,stock:copy(cityStock(city)),foodStock:cityStock(city).food,population,productionRate:clock().daytime?population/60:0,rates:ratesFor(city.ownerId),loops,trainCost:loops[0]?.cost??null,hasStation:city.level>=2,
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
      origin:consist.origin,departureCars:consist.departure,cars:consist.cars.map(car=>({...car,amount:0,reservedGold:0})),
      carCount:consist.cars.length,routeLength:loop.length,departureGold:info.departureGold,escrow:0,
      distance:0,previousDistance:0,nextStop:0,speed:0,desiredSpeed:0,maxAdvance:0,active:false,state:'queued',waitReason:'station-occupied',blocked:false,
      stopCityId:cityId,stopCarIndices:[],dwellUntil:0,dwellStarted:0,readyTick:Math.ceil(time/STEP-EPS),cargo:empty(),laps:0,lastDeparture:0,lastTripSeconds:0};
    trains.set(train.id,train);fleet.push(train);stats.trainsBought++;stats.trainSpent+=info.cost;revision++;
    emit({type:'train-bought',trainId:train.id,ownerId,cityId,cost:info.cost,loopId});
    admit(train);pruneFleet();
    return {ok:true,id:train.id,trainId:train.id,cost:info.cost,loop:info};
  }
  function stationLocation(train,car){
    const point=train.network.sample(train.loop,car.stationDistance);
    return {stationId:car.stationId,carIndex:car.index,...(point&&{x:point.x,y:Number.isFinite(point.y)?point.y:0,z:point.z})};
  }
  function refund(train,car){
    const amount=car.reservedGold;
    if(!amount||!credit(train.ownerId,'gold',amount))return;
    train.escrow-=amount;car.reservedGold=0;stats.goldRefunded+=amount;
  }
  function pickup(train,indices){
    for(const index of indices){
      const car=train.cars[index];if(car.cityId===train.homeCityId)continue;
      const city=cities.get(car.cityId),fare=car.reservedGold;
      const available=city&&cityStock(city)[city.resource]>=LOOP_ECONOMY.pickup;
      const canPay=city&&fare===LOOP_ECONOMY.pickupGold&&whole((balance(city.ownerId)?.gold??NaN)+fare);
      if(!available||!canPay||!debitCity(city,city.resource,LOOP_ECONOMY.pickup)){
        refund(train,car);stats.emptyVisits++;emit({type:'empty-station',trainId:train.id,ownerId:train.ownerId,cityId:car.cityId,...stationLocation(train,car)});continue;
      }
      if(!credit(city.ownerId,'gold',fare)){creditCity(city,city.resource,LOOP_ECONOMY.pickup);refund(train,car);continue;}
      train.escrow-=fare;car.reservedGold=0;stats.goldPaid+=fare;
      car.resource=city.resource;car.amount=LOOP_ECONOMY.pickup;train.cargo[city.resource]+=car.amount;stats.pickups[city.resource]+=car.amount;
      emit({type:'pickup',trainId:train.id,ownerId:train.ownerId,cityId:car.cityId,cityOwnerId:city.ownerId,resource:city.resource,
        amount:car.amount,resources:gains(city.resource,car.amount),...stationLocation(train,car)});
      emit({type:'station-payment',trainId:train.id,ownerId:city.ownerId,payerId:train.ownerId,cityId:car.cityId,resource:'gold',amount:fare,
        resources:gains('gold',fare),...stationLocation(train,car)});revision++;
    }
  }
  function pruneFleet(){
    if(!fleetDirty)return;
    let write=0;for(const train of fleet)if(trains.has(train.id))fleet[write++]=train;
    fleet.length=write;fleetDirty=false;
  }
  function destroyUnfundedTrain(train){
    if(!trains.has(train.id))return false;
    const pose=trainSnapshot(train);
    trains.delete(train.id);fleetDirty=true;train.active=false;train.state='destroyed';
    train.speed=train.desiredSpeed=train.maxAdvance=0;traffic.release?.(train.id);stats.trainsLost++;revision++;
    emit({type:'train-destroyed',reason:'not-enough-gold',ownerId:train.ownerId,trainId:train.id,
      homeCityId:train.homeCityId,cityId:train.homeCityId,x:pose.x,y:pose.y??0,z:pose.z,angle:pose.angle??0,
      carPoses:copy(pose.carPoses),cars:copy(pose.cars)});
    return false;
  }
  function depart(train){
    if(!debit(train.ownerId,'gold',train.departureGold)){
      return destroyUnfundedTrain(train);
    }
    train.escrow=train.departureGold;stats.goldReserved+=train.departureGold;
    for(const car of train.cars)car.reservedGold=car.cityId===train.homeCityId?0:LOOP_ECONOMY.pickupGold;
    train.distance=train.previousDistance=0;train.nextStop=0;train.speed=0;train.state='moving';train.waitReason=null;train.blocked=false;
    train.stopCityId=null;train.stopCarIndices=[];train.readyTick=Math.ceil(time/STEP-EPS);train.lastDeparture=time;
    emit({type:'departure',trainId:train.id,ownerId:train.ownerId,cityId:train.homeCityId,gold:train.departureGold});revision++;return true;
  }
  function admit(train){
    if((balance(train.ownerId)?.gold??0)<train.departureGold)return destroyUnfundedTrain(train);
    if(!train.active){
      if(!traffic.canSpawn(train,fleet)){train.state='queued';train.waitReason='station-occupied';return false;}
      train.active=true;
    }
    return depart(train);
  }
  function deliver(train){
    // Keep a full wallet from destroying finite cargo. Such a train waits at
    // home until space is available; ordinary play never reaches this limit.
    const wallet=balance(train.ownerId);
    for(const resource of GOODS)if(!whole(wallet[resource]+train.cargo[resource]))return false;
    // An empty stop may retain its fare if the buyer's wallet is full. Keep
    // that escrow aboard instead of overwriting it on the next departure.
    if(!whole(wallet.gold+train.escrow))return false;
    const delivered=gains();
    for(const resource of GOODS){
      const amount=train.cargo[resource];if(!amount)continue;
      if(!credit(train.ownerId,resource,amount))return false;
      delivered[resource]=amount;stats.delivered[resource]+=amount;stats.deliveries++;
    }
    for(const car of train.cars){refund(train,car);car.amount=0;}
    train.cargo=empty();train.laps++;stats.laps++;train.lastTripSeconds=time-train.lastDeparture;
    emit({type:'delivery',trainId:train.id,ownerId:train.ownerId,cityId:train.homeCityId,resources:delivered,cargo:{resources:delivered.resources,food:delivered.food},
      lap:train.laps,...stationLocation(train,train.cars[0])});revision++;return true;
  }
  function arrive(train){
    const stop=train.stops[train.nextStop];
    train.speed=0;train.blocked=false;train.waitReason=null;train.stopCarIndices=stop?[...stop.carIndices]:[...train.departureCars];
    train.stopCityId=stop?train.cars[stop.carIndices[0]].cityId:train.homeCityId;
    pickup(train,train.stopCarIndices);
    if(stop)train.nextStop++;
    else if(!deliver(train)){train.state='waiting-storage';train.waitReason='wallet-full';return;}
    train.state='dwell';train.dwellStarted=time;train.dwellUntil=time+LOOP_ECONOMY.dwell;revision++;
  }
  function tickMovement(){
    for(const train of fleet){
      train.previousDistance=train.distance;train.maxAdvance=0;train.desiredSpeed=0;
      if(!train.active){admit(train);continue;}
      if(train.state==='waiting-storage'){
        if(deliver(train)){train.state='dwell';train.waitReason=null;train.dwellStarted=time;train.dwellUntil=time+LOOP_ECONOMY.dwell;}
        continue;
      }
      if(train.state==='dwell'&&train.dwellUntil<=time+EPS){
        if(train.stopCityId===train.homeCityId){depart(train);continue;}
        train.state='moving';train.stopCityId=null;train.stopCarIndices=[];train.readyTick=simulationTick;revision++;
      }
      if(train.state!=='moving'||train.readyTick>=simulationTick)continue;
      const destination=train.stops[train.nextStop]?.distance??train.loop.length,remaining=Math.max(0,destination-train.distance);
      const targetSpeed=Math.min(LOOP_ECONOMY.speed,Math.sqrt(2*LOOP_ECONOMY.deceleration*remaining));
      train.desiredSpeed=train.speed<targetSpeed?Math.min(targetSpeed,train.speed+LOOP_ECONOMY.acceleration*STEP):Math.max(targetSpeed,train.speed-LOOP_ECONOMY.deceleration*STEP);
      train.maxAdvance=Math.min(remaining,(train.speed+train.desiredSpeed)*.5*STEP);
    }
    // Destruction can happen for several neighbours in one tick. Compact only
    // after iteration so removing one train cannot skip the following train.
    pruneFleet();
    const moves=traffic.step(fleet,STEP);
    for(const train of fleet){
      if(!train.active||train.state!=='moving'||train.readyTick>=simulationTick)continue;
      const move=moves.get(train.id);if(!move)continue;
      train.distance=Math.max(train.distance,Math.min(train.distance+train.maxAdvance,move.distance));
      train.speed=Number.isFinite(move.speed)?Math.max(0,Math.min(LOOP_ECONOMY.speed,move.speed)):0;train.blocked=!!move.blocked;train.waitReason=train.blocked?'traffic':null;
      const destination=train.stops[train.nextStop]?.distance??train.loop.length;
      if(train.distance>=destination-EPS){train.distance=destination;arrive(train);}
    }
  }
  function update(dt,{elapsedSeconds}={}){
    const target=Number.isFinite(elapsedSeconds)?Math.max(time,elapsedSeconds):Number.isFinite(dt)&&dt>0?time+dt:time;
    if(target<=time)return;
    sync();syncNetwork();const endTick=Math.floor(target/STEP+EPS);
    if(!fleet.length){
      while(nextTick<=target+EPS){time=nextTick;economyTick();}
      simulationTick=endTick;
    }else while(simulationTick<endTick){
      simulationTick++;time=simulationTick*STEP;
      if(nextTick<=time+EPS)economyTick();
      tickMovement();
    }
    time=target;
  }
  function trainSnapshot(train){
    const alpha=Math.max(0,Math.min(1,(time-simulationTick*STEP)/STEP));
    const along=train.state==='moving'?train.previousDistance+(train.distance-train.previousDistance)*alpha:train.distance;
    const carPoses=train.cars.map(car=>train.network.sample(train.loop,train.origin+along-car.offset)),pose=carPoses[0];
    const resource=GOODS.find(good=>train.cargo[good]>0)??null,nextStop=train.stops[train.nextStop];
    const nextStopCityId=nextStop?train.cars[nextStop.carIndices[0]].cityId:train.homeCityId;
    const dwellRemaining=train.state==='dwell'?Math.max(0,train.dwellUntil-time):0;
    const arrivalRemaining=['queued','waiting-storage'].includes(train.state)?null:
      dwellRemaining+travelSeconds(Math.max(0,(nextStop?.distance??train.loop.length)-train.distance),train.speed);
    return {id:train.id,ownerId:train.ownerId,homeCityId:train.homeCityId,loopId:train.loop.id,state:train.state,waitReason:train.waitReason,blocked:train.blocked,speed:train.speed,
      nextStopCityId,arrivalRemaining,stopCityId:train.stopCityId,stopCarIndices:[...train.stopCarIndices],dwellRemaining,dwellDuration:LOOP_ECONOMY.dwell,
      dwellProgress:train.state==='dwell'?1-dwellRemaining/LOOP_ECONOMY.dwell:0,departureGold:train.departureGold,escrowGold:train.escrow,
      cars:train.cars.map(car=>({...car,resource:car.resource??cities.get(car.cityId)?.resource??'resources'})),carCount:train.cars.length,spacing:TRAIN_CAR_SPACING,
      active:train.active,...pose,pose,carPoses,distance:along,simulationDistance:train.distance,length:train.loop.length,
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
