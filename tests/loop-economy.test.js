import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame} from '../src/settlement-game.js';
import {LOOP_ECONOMY,cityResource} from '../src/loop-economy.js';
import {loopTrackCost,loopTrainCost} from '../src/loop-economy-rules.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';

const flat=()=>({type:'ground',height:0});
const freeTraffic=()=>({canSpawn:()=>true,step:trains=>new Map(trains.filter(t=>t.active).map(t=>[t.id,{distance:t.distance+t.maxAdvance,speed:t.desiredSpeed,blocked:false}]))});
function fixture({closed=true,population=1,formed=true,stock=0,trafficFactory=freeTraffic}={}){
  const world={seed:'loop-test',gameplay:{economy:'loops',ownerId:'teal',starterHouse:{id:'home-1',x:0,z:0,rotation:0},farmVillages:{ownerId:'gray',cities:[{id:'farm',ownerId:'gray',x:20,z:0,level:2,houseCount:6,foodStock:stock}]}}};
  const game=createSettlementGame(world,{surfaceAt:flat});
  const city={id:'own',ownerId:'teal',x:0,z:0,level:2,houseCount:6,biome:'forest'};
  const session={player:game,bots:[],revision:0};
  let populationHomes=Array.from({length:population},(_,i)=>({id:`population:${i}`,x:0,z:0}));
  const proxy=new Proxy(game,{get(target,key){return key==='cities'?(formed?[city]:[]):key==='houses'?populationHomes:key==='population'?populationHomes.length:target[key];}});session.player=proxy;
  const loop={id:'circle',cityIds:['own','farm'],stationIds:['own-station','farm-station'],length:40,
    stops:[{cityId:'own',stationId:'own-station',distance:0},{cityId:'farm',stationId:'farm-station',distance:20}],pieces:[{lineId:'out'},{lineId:'back'}]};
  const networkFactory=()=>({loops:id=>closed&&['own','farm'].includes(id)?[loop]:[],sample:(_loop,distance)=>{
    const a=((distance%40)+40)%40/40*Math.PI*2;
    return {x:Math.cos(a)*10,y:0,z:Math.sin(a)*10,angle:-a,tangent:{x:-Math.sin(a),y:0,z:Math.cos(a)}};
  }});
  const railways={revision:0,snapshot:()=>({revision:0,stations:[],connections:[]})};
  const economy=createSettlementEconomy(world,{session,railways,networkFactory,...(trafficFactory?{trafficFactory}:{})});
  game.setEconomy({resourcesAt:point=>economy.resourcesAt('teal',point),spendConstruction:(point,cost)=>economy.spendConstruction('teal',point,cost)});
  return {world,game,city,session,railways,economy,loop,networkFactory,setPopulation(value){populationHomes=Array.from({length:value},(_,i)=>({id:`population:${i}`,x:0,z:0}));session.revision++;}};
}

test('loop mode starts with a global wallet and eight-resource homes, with no tool requirement or outposts',()=>{
  const {world}=fixture(),game=createSettlementGame(world,{surfaceAt:flat});
  assert.equal(game.logs,40);assert.equal(game.food,12);assert.equal(game.gold,50);assert.equal(game.economyMode,'loops');
  assert.deepEqual(game.constructionCost,{resources:8,food:2});
  const before=game.snapshot();assert.equal(game.build({x:40,z:0}).code,'outside-city');assert.deepEqual(game.snapshot(),before);
  game.addLogs(60);assert.ok(game.build({x:5,z:0}).ok);assert.ok(game.build({x:0,z:5}).ok);
  assert.equal(game.cities.length,1);assert.deepEqual(game.constructionCost,{resources:8,food:2});
  assert.equal(game.settleIncome(600),null);
});

test('all player biomes produce unified resources and only neutral villages produce food',()=>{
  const {world}=fixture();
  for(const biome of ['forest','desert','plains','farmland','mountain']){
    assert.equal(cityResource(world,{biome,ownerId:'teal'}),'resources');
    assert.equal(cityResource(world,{biome,ownerId:'gray'}),'food');
  }
  assert.equal(cityResource(world,{ownerId:'other',neutral:true}),'food');
});

test('calendar production pays exactly on daytime minute boundaries, including sunset',()=>{
  const {economy,game}=fixture();
  economy.update(.01,{elapsedSeconds:59.999});assert.equal(game.logs,40);
  assert.ok(Math.abs(economy.snapshot().clock.secondsRemaining-.001)<1e-6);
  economy.update(.01,{elapsedSeconds:60});assert.equal(game.logs,41);
  economy.update(100,{elapsedSeconds:20});assert.equal(economy.elapsed,60,'a stale absolute clock cannot advance or rewind the economy');
  economy.update(0,{elapsedSeconds:300});assert.equal(game.logs,45);assert.equal(game.gold,50);
  assert.equal(economy.resourcesAt('gray').food,30);
  assert.deepEqual(economy.snapshot().stats.produced,{resources:5,food:30});
  assert.equal(economy.snapshot().clock.dayPhase,'night');assert.equal(economy.snapshot().clock.secondsRemaining,360);
  economy.update(300);assert.equal(game.logs,45);assert.equal(economy.snapshot().clock.dayPhase,'day');
  assert.equal(economy.snapshot().clock.secondsRemaining,60);assert.equal(economy.snapshot().clock.ticksRemaining,5);
  economy.update(60);assert.equal(game.logs,46);
  assert.deepEqual(economy.drainEvents().filter(event=>event.ownerId==='teal').map(event=>event.time),[60,120,180,240,300,660]);
  const before=economy.snapshot();assert.equal(economy.creditProduction('teal','resources',100,'cosmetic-trip').ok,false);
  assert.deepEqual(economy.snapshot(),before);
});

test('outposts and populations beyond level five receive full boundary payouts without fractional accrual',()=>{
  const {economy,game,setPopulation}=fixture({formed:false});
  assert.equal(economy.cities.some(city=>city.ownerId==='teal'),false);
  economy.update(59);assert.equal(game.logs,40);setPopulation(21);
  economy.update(1);assert.equal(game.logs,61,'the population at the boundary determines the whole payout');
  economy.update(59);setPopulation(0);economy.update(1);assert.equal(game.logs,61);
  setPopulation(37);economy.update(60);assert.equal(game.logs,98);
  const owner=economy.snapshot().owners.find(owner=>owner.ownerId==='teal');
  assert.equal(owner.population,37);assert.equal(owner.rates.resources,37);assert.equal(economy.resourcesAt('teal').cityId,null);
});

test('production is frame independent across population changes, day and night',()=>{
  const a=fixture({population:17}),b=fixture({population:17});
  for(const [duration,population]of [[300,23],[300,2],[150,0],[150,19],[30,19]]){
    a.economy.update(duration);for(let i=0;i<duration*4;i++)b.economy.update(.25);
    assert.deepEqual(a.economy.snapshot(),b.economy.snapshot());
    assert.deepEqual(a.economy.drainEvents(),b.economy.drainEvents());a.setPopulation(population);b.setPopulation(population);
  }
  assert.equal(a.game.logs,40+85+4);
});

test('resource and food construction is atomic and uses the authoritative food wallet',()=>{
  const {economy,game}=fixture(),before=economy.snapshot();
  for(const cost of [{resources:41},{resources:8,food:13},{resources:8,tools:2},{resources:8,timber:8},{wood:8},{metal:1},{resources:-1},{resources:1.5},{resources:NaN}]){
    assert.equal(economy.spendConstruction('teal',null,cost).ok,false);assert.deepEqual(economy.snapshot(),before);
  }
  assert.ok(economy.spendConstruction('teal',null,{resources:8,food:2}).ok);assert.equal(game.logs,32);assert.equal(game.food,10);
  assert.ok(economy.spendConstruction('teal',null,{timber:4,tools:0}).ok);assert.equal(game.logs,28);
  assert.deepEqual(economy.snapshot().stats.construction,{resources:12,food:2});
  assert.equal(economy.resourcesAt('teal').wood,undefined);assert.equal(economy.resourcesAt('teal').metal,undefined);
});

const tick=1/30;
function until(economy,predicate,maxSeconds=80){
  const end=economy.elapsed+maxSeconds;
  while(!predicate()&&economy.elapsed<end)economy.update(0,{elapsedSeconds:Math.round((economy.elapsed+tick)*30)/30});
  assert.ok(predicate(),`condition not reached by ${economy.elapsed}s`);
  return economy.trains[0];
}
function treasury(economy){const snapshot=economy.snapshot();return snapshot.owners.reduce((sum,o)=>sum+o.gold,0)+snapshot.trains.reduce((sum,t)=>sum+t.escrowGold,0);}

test('train costs are a flat twenty Resources and station fares are separate',()=>{
  for(const n of [1,2,3,8])assert.equal(loopTrainCost(n),20);
  assert.equal(loopTrainCost(0),Infinity);assert.equal(loopTrackCost(48),2);assert.equal(loopTrackCost(48.01),4);
  const {economy}=fixture();assert.equal(economy.loops('own')[0].departureGold,1);
  assert.equal(LOOP_ECONOMY.speed,5);assert.equal(LOOP_ECONOMY.dwell,1);assert.equal(LOOP_ECONOMY.pickup,1);
});

test('purchase validates ownership and resources, then destroys a newly purchased train that cannot fund departure',()=>{
  const open=fixture({closed:false});assert.equal(open.economy.buyTrain('own','circle','teal').code,'no-complete-loop');
  const {economy,game}=fixture();assert.equal(economy.buyTrain('farm','circle','teal').code,'not-your-city');
  assert.equal(economy.buyTrain('own','circle','coral').code,'not-your-city');assert.equal(economy.buyTrain('own','missing','teal').code,'no-complete-loop');
  game.spendLogs(21);assert.equal(economy.buyTrain('own','circle','teal').code,'not-enough-resources');
  game.addLogs(1);game.spendGold(50);const bought=economy.buyTrain('own','circle','teal');assert.equal(bought.ok,true);
  assert.equal(game.logs,0);assert.equal(game.gold,0);assert.equal(economy.trains.length,0);
  const events=economy.drainEvents();assert.deepEqual(events.map(event=>event.type),['train-bought','train-destroyed']);
  const destroyed=events[1];assert.equal(destroyed.reason,'not-enough-gold');assert.equal(destroyed.trainId,bought.trainId);
  assert.equal(destroyed.ownerId,'teal');assert.equal(destroyed.homeCityId,'own');assert.equal(destroyed.cityId,'own');
  assert.equal(destroyed.x,10);assert.equal(destroyed.y,0);assert.equal(destroyed.z,0);assert.ok(Number.isFinite(destroyed.angle));
  assert.equal(destroyed.carPoses.length,2);assert.ok(destroyed.cars.every(car=>car.amount===0));
  assert.equal(economy.snapshot().stats.trainsLost,1);assert.equal(economy.snapshot().stats.trainSpent,20);
  game.creditGold(1);economy.update(5);assert.equal(economy.trains.length,0);assert.equal(economy.drainEvents().length,0,'destroyed trains never rejoin or emit a second explosion');
});

test('finite Food and held Gold transfer once at the station; cargo arrives home later',()=>{
  const {economy,game}=fixture({stock:3});assert.ok(economy.buyTrain('own','circle','teal').ok);
  assert.equal(game.logs,20);assert.equal(game.gold,49);assert.equal(treasury(economy),50);
  assert.deepEqual(economy.trains[0].cargo,{resources:0,food:0});
  assert.equal(economy.drainEvents().some(e=>['pickup','station-payment','delivery'].includes(e.type)),false);
  const stopped=until(economy,()=>economy.trains[0].state==='dwell');
  assert.equal(stopped.stopCityId,'farm');assert.equal(economy.city('farm').foodStock,2);
  assert.equal(economy.resourcesAt('gray').gold,1);assert.equal(game.food,12);assert.equal(stopped.cargo.food,1);assert.equal(stopped.escrowGold,0);
  assert.equal(treasury(economy),50);
  const stationEvents=economy.drainEvents();assert.equal(stationEvents.filter(e=>e.type==='pickup').length,1);
  const payment=stationEvents.find(e=>e.type==='station-payment');assert.deepEqual([payment.ownerId,payment.payerId,payment.resource,payment.amount],['gray','teal','gold',1]);
  assert.deepEqual(payment.resources,{resources:0,food:0,gold:1});
  const location=stationEvents.find(e=>e.type==='pickup');assert.equal(location.stationId,'farm-station');assert.equal(location.x,-10);
  assert.ok(Math.abs(stopped.carPoses[1].x-location.x)<1e-8);assert.ok(Math.abs(stopped.carPoses[1].z-location.z)<1e-8);
  economy.update(.8);assert.equal(economy.trains[0].simulationDistance,stopped.simulationDistance);assert.equal(economy.drainEvents().length,0);
  until(economy,()=>economy.trains[0].laps===1);assert.equal(game.food,13);assert.equal(game.logs,20);assert.equal(game.gold,49);
  assert.equal(economy.trains[0].stopCityId,'own');assert.deepEqual(economy.trains[0].cargo,{resources:0,food:0});
  const returned=economy.drainEvents();assert.equal(returned.filter(e=>e.type==='delivery').length,1);assert.equal(returned.some(e=>e.type==='pickup'),false);
  assert.deepEqual(returned.find(e=>e.type==='delivery').resources,{resources:0,food:1,gold:0});
  const before=economy.snapshot();economy.update(0);economy.update(-1);economy.update(NaN);assert.deepEqual(economy.snapshot(),before);
});

test('empty destination refunds its reserved fare without inventing goods or coins',()=>{
  const {economy,game}=fixture();economy.buyTrain('own','circle','teal');assert.equal(game.gold,49);
  until(economy,()=>economy.trains[0].state==='dwell');assert.equal(game.gold,50);
  assert.equal(economy.trains[0].escrowGold,0);assert.equal(economy.resourcesAt('gray').gold,0);assert.deepEqual(economy.trains[0].cargo,{resources:0,food:0});
  until(economy,()=>economy.trains[0].laps===1);assert.equal(game.food,12);assert.equal(game.logs,20);
  const stats=economy.snapshot().stats;assert.equal(stats.goldRefunded,1);assert.equal(stats.goldPaid,0);assert.equal(stats.emptyVisits,1);
  assert.equal(treasury(economy),50);assert.equal(economy.drainEvents().filter(e=>e.type==='pickup').length,0);
});

test('a full Gold wallet retains refunded fares until room exists and cannot erase escrow on departure',()=>{
  const {economy,game}=fixture();economy.buyTrain('own','circle','teal');
  game.creditGold(Number.MAX_SAFE_INTEGER-game.gold);
  until(economy,()=>economy.trains[0].state==='dwell');
  assert.equal(economy.trains[0].escrowGold,1);assert.equal(game.gold,Number.MAX_SAFE_INTEGER);
  until(economy,()=>economy.trains[0].state==='waiting-storage');
  economy.update(2);assert.equal(economy.trains[0].state,'waiting-storage');assert.equal(economy.trains[0].escrowGold,1);
  assert.equal(economy.snapshot().stats.goldRefunded,0);assert.equal(economy.trains[0].laps,0);
  game.spendGold(1);economy.update(tick);
  assert.equal(game.gold,Number.MAX_SAFE_INTEGER);assert.equal(economy.trains[0].escrowGold,0);
  assert.equal(economy.snapshot().stats.goldRefunded,1);assert.equal(economy.trains[0].laps,1);
  assert.equal(economy.trains[0].state,'dwell');
});

test('villages keep separate finite stocks despite sharing a gray owner',()=>{
  const {world,economy,session}=fixture({stock:1});
  world.gameplay.farmVillages.cities.push({id:'other-farm',ownerId:'gray',level:2,houseCount:3,x:80,z:0,foodStock:10});session.revision++;
  assert.equal(economy.resourcesAt('gray').food,11);economy.buyTrain('own','circle','teal');
  until(economy,()=>economy.trains[0].laps===1);assert.equal(economy.city('farm').stock.food,0);assert.equal(economy.city('other-farm').stock.food,10);
  until(economy,()=>economy.trains[0].laps===2);assert.equal(economy.snapshot().stats.pickups.food,1,'a nearby village cannot supply the visited empty village');
  economy.update(0,{elapsedSeconds:60});assert.equal(economy.city('other-farm').foodStock,13);
  assert.equal(economy.city('farm').foodStock,6);assert.equal(economy.resourcesAt('gray').food,19);
});

test('scarce destination goods cannot be sold twice to simultaneous buyers',()=>{
  const {economy,game}=fixture({stock:1});economy.buyTrain('own','circle','teal');economy.buyTrain('own','circle','teal');
  until(economy,()=>economy.trains.every(t=>t.state==='dwell'));
  assert.equal(economy.trains.reduce((sum,t)=>sum+t.cargo.food,0),1);assert.equal(economy.city('farm').foodStock,0);
  assert.equal(economy.resourcesAt('gray').gold,1);assert.equal(game.gold,49);assert.equal(treasury(economy),50);
  assert.equal(economy.snapshot().stats.goldRefunded,1);
});

test('foreign pickup deducts player Resources and transfers its fare to that player',()=>{
  const {economy,game,session,world}=fixture();
  const foreign={ownerId:'coral',logs:40,food:12,gold:50,population:6,cities:[{id:'farm',ownerId:'coral',x:20,z:0,level:2,houseCount:6}],
    spendLogs(n){if(this.logs<n)return{ok:false};this.logs-=n;return{ok:true};},addLogs(n){this.logs+=n;return{ok:true};},
    spendGold(n){if(this.gold<n)return{ok:false};this.gold-=n;return{ok:true};},creditGold(n){this.gold+=n;return{ok:true};},
    addFood(n){this.food+=n;return{ok:true};},spendFood(n){if(this.food<n)return{ok:false};this.food-=n;return{ok:true};}};
  world.gameplay.farmVillages.cities=[];session.bots.push({game:foreign});session.revision++;
  assert.ok(economy.buyTrain('farm','circle','coral').ok);assert.equal(foreign.logs,20);assert.equal(foreign.gold,49);
  const rates=economy.resourcesAt('teal').rates;assert.ok(rates.gold>0);assert.ok(rates.resources<1);
  until(economy,()=>economy.trains[0].state==='dwell');assert.equal(game.logs,39);assert.equal(game.gold,51);assert.equal(foreign.logs,20);
  const payment=economy.drainEvents().find(e=>e.type==='station-payment');assert.equal(payment.ownerId,'teal');assert.equal(payment.cityId,'own');
  until(economy,()=>economy.trains[0].laps===1);assert.equal(foreign.logs,21);assert.equal(foreign.gold,49);assert.equal(treasury(economy),100);
});

test('trains accelerate to five and decelerate before a full one-second station dwell',()=>{
  const {economy}=fixture({stock:1});economy.buyTrain('own','circle','teal');
  economy.update(2);let moving=economy.trains[0];assert.equal(moving.speed,5);assert.ok(moving.simulationDistance<10&&moving.simulationDistance>7);
  let braking=false,previousSpeed=moving.speed;
  until(economy,()=>{const t=economy.trains[0];if(t.state==='moving'&&t.speed<previousSpeed&&t.speed>0)braking=true;previousSpeed=t.speed;return t.state==='dwell';});
  const stopped=economy.trains[0],arrival=economy.elapsed;assert.ok(braking);assert.equal(stopped.speed,0);assert.equal(stopped.dwellRemaining,1);
  economy.update(0,{elapsedSeconds:arrival+.999});assert.equal(economy.trains[0].state,'dwell');assert.equal(economy.trains[0].distance,stopped.distance);
  economy.update(0,{elapsedSeconds:arrival+1});assert.equal(economy.trains[0].state,'moving');assert.equal(economy.trains[0].simulationDistance,stopped.simulationDistance);
  economy.update(.1);assert.ok(economy.trains[0].simulationDistance>stopped.simulationDistance);
});

test('traffic admission queues overlapping purchases and preserves their wallets and eventual movement',()=>{
  const {economy,game}=fixture({trafficFactory:null,stock:3});
  economy.buyTrain('own','circle','teal');economy.buyTrain('own','circle','teal');
  assert.equal(economy.trains[0].active,true);assert.equal(economy.trains[1].active,false);assert.equal(economy.trains[1].state,'queued');
  assert.equal(game.gold,49,'a queued purchase has not reserved a trip fare');assert.equal(game.logs,0);
  until(economy,()=>economy.trains[1].active);assert.equal(economy.trains[1].state,'moving');assert.equal(game.gold,48);
  assert.ok(economy.trains[0].simulationDistance>economy.trains[1].simulationDistance);
  economy.update(5);assert.ok(economy.trains[1].simulationDistance>0);
});

test('no upkeep, passive Gold mint, or overnight production exists',()=>{
  const {economy,game}=fixture({population:0});economy.update(300);const before=economy.snapshot();economy.update(300);
  assert.equal(game.gold,50);assert.equal(game.logs,40);assert.deepEqual(economy.snapshot().stats.produced,before.stats.produced);
  assert.equal(economy.resourcesAt('teal').resourceDebt,undefined);assert.equal(economy.snapshot().stats.upkeep,undefined);
  assert.equal(economy.snapshot().stats.goldPaid,0);assert.equal(economy.snapshot().stats.goldReserved,0);
});

test('fixed-step train accounting is invariant to frame chunks, including production and night boundaries',()=>{
  const a=fixture({stock:100}),b=fixture({stock:100});
  for(const f of [a,b]){f.economy.buyTrain('own','circle','teal');f.economy.buyTrain('own','circle','teal');}
  a.economy.update(740);for(let i=0;i<2960;i++)b.economy.update(.25);
  assert.deepEqual(a.economy.snapshot(),b.economy.snapshot());assert.deepEqual(a.economy.drainEvents(),b.economy.drainEvents());
  assert.equal(treasury(a.economy),50);assert.equal(a.game.gold,0);assert.equal(a.economy.trains.length,0);assert.equal(a.economy.snapshot().stats.trainsLost,2);
  const before=a.economy.snapshot();a.economy.city('own');a.economy.trains;a.economy.resourcesAt('teal');assert.deepEqual(a.economy.snapshot(),before);
});

test('game adapters expose the same finite resources, food and Gold wallets',()=>{
  const {game,economy,world}=fixture({stock:2});const standalone=createSettlementGame(world,{surfaceAt:flat});
  assert.equal(standalone.resourcesAt().gold,50);assert.deepEqual(game.resourcesAt(),economy.resourcesAt('teal'));
  economy.buyTrain('own','circle','teal');until(economy,()=>economy.trains[0].laps===1);
  assert.deepEqual(game.resourcesAt({x:500,z:500}),economy.resourcesAt('teal'));assert.equal(game.resourcesAt().food,13);assert.equal(game.resourcesAt().gold,49);
  assert.equal(game.resourcesAt().resources,20);assert.equal(game.resourcesAt().wood,undefined);assert.equal(game.resourcesAt().metal,undefined);
  const before=game.snapshot();assert.equal(game.spendGold(50).ok,false);assert.deepEqual(game.snapshot(),before);
});

test('production events describe the settlement and cosmetic worker trips cannot add feedback',()=>{
  const {economy}=fixture();economy.update(60);const events=economy.drainEvents(),own=events.filter(e=>e.ownerId==='teal');
  assert.equal(own.length,1);assert.equal(own[0].type,'production');assert.deepEqual(own[0].resources,{resources:1,food:0,gold:0});
  assert.equal(own[0].cityId,'own');assert.equal(own[0].time,60);assert.equal(own[0].workerId,undefined);
  economy.creditProduction('teal','resources',2,'trip');assert.deepEqual(economy.drainEvents(),[]);
});

test('loop inspection exposes detached track portions, station positions and finite village stock',()=>{
  const {economy,loop}=fixture({stock:4});loop.segments=[{lineId:'out',start:4,end:24,length:20,offset:0,direction:1}];
  const info=economy.loops('own')[0];assert.deepEqual(info.segments,loop.segments);assert.equal(info.stops[1].x,-10);assert.equal(info.stops[1].resource,'food');
  info.segments[0].start=100;info.stops[0].x=999;assert.equal(economy.loops('own')[0].segments[0].start,4);assert.equal(economy.loops('own')[0].stops[0].x,10);
  const city=economy.city('farm');city.stock.food=1000;assert.equal(economy.city('farm').stock.food,4);
});


test('all queued trains that lose departure funds are removed safely in the same tick',()=>{
  let checks=0;const released=[];
  const trafficFactory=()=>({...freeTraffic(),canSpawn(){checks++;return false;},release(id){released.push(id);}});
  const {economy,game}=fixture({trafficFactory});game.addLogs(60);
  for(let i=0;i<3;i++)assert.equal(economy.buyTrain('own','circle','teal').ok,true);
  assert.equal(economy.trains.length,3);assert.ok(economy.trains.every(train=>train.state==='queued'&&!train.active));
  assert.equal(game.gold,50,'queued purchases have not reserved fares');const checked=checks;
  economy.drainEvents();game.spendGold(50);economy.update(tick);
  assert.equal(checks,checked,'funds are checked before claiming a platform');assert.equal(economy.trains.length,0);
  const destroyed=economy.drainEvents();assert.equal(destroyed.length,3);assert.ok(destroyed.every(event=>event.type==='train-destroyed'));
  assert.equal(new Set(destroyed.map(event=>event.trainId)).size,3);assert.deepEqual(released,destroyed.map(event=>event.trainId));
  const snapshot=economy.snapshot();assert.equal(snapshot.stats.trainsLost,3);assert.equal(snapshot.stats.trainSpent,60);assert.equal(snapshot.cities[0].trains,0);
  assert.equal(game.logs,40);assert.equal(game.food,12);assert.equal(game.gold,0);assert.equal(economy.resourcesAt('teal').rates.gold,0);
  game.creditGold(50);economy.update(3);assert.equal(economy.trains.length,0);assert.equal(economy.drainEvents().length,0);assert.equal(released.length,3);
});

test('an unfunded returning train unloads, waits one second, then explodes and clears the visiting route',()=>{
  const length=120;
  function owner(ownerId,cityId,gold){return {ownerId,logs:100,food:12,gold,population:0,cities:[{id:cityId,level:2,houseCount:6,x:0,z:0}],
    spendLogs(n){if(this.logs<n)return{ok:false};this.logs-=n;return{ok:true};},addLogs(n){this.logs+=n;return{ok:true};},
    spendGold(n){if(this.gold<n)return{ok:false};this.gold-=n;return{ok:true};},creditGold(n){this.gold+=n;return{ok:true};},
    addFood(n){this.food+=n;return{ok:true};},spendFood(n){if(this.food<n)return{ok:false};this.food-=n;return{ok:true};}};}
  const a=owner('teal','a',1),b=owner('coral','b',50),route={id:'circuit',length,cityIds:['a','b'],
    stops:[{cityId:'a',distance:0},{cityId:'b',distance:length/2}],segments:[{lineId:'track',start:0,end:length,offset:0,length}]};
  const economy=createSettlementEconomy({gameplay:{economy:'loops',ownerId:'teal'}},{session:{player:a,bots:[{game:b}]},
    railways:{revision:0,snapshot:()=>({revision:0})},networkFactory:()=>({loops:()=>[route],sample:(_route,distance)=>{
      const angle=distance/length*Math.PI*2,radius=length/(Math.PI*2);return{x:Math.cos(angle)*radius,y:.42,z:Math.sin(angle)*radius,angle:-angle,tangent:{x:-Math.sin(angle),y:0,z:Math.cos(angle)}};
    }})});
  const bought=economy.buyTrain('a','circuit','teal');assert.equal(bought.ok,true);economy.update(22);assert.equal(economy.buyTrain('b','circuit','coral').ok,true);
  until(economy,()=>economy.trains[0].laps===1);const stopped=economy.trains[0],arrival=economy.elapsed;
  assert.equal(stopped.state,'dwell');assert.equal(stopped.active,true);assert.equal(stopped.escrowGold,0);assert.equal(stopped.stopCityId,'a');
  assert.deepEqual(stopped.cargo,{resources:0,food:0});assert.ok(stopped.cars.every(car=>car.amount===0));assert.equal(a.logs,81,'the last cargo was saved before destruction');
  assert.equal(a.gold,0);assert.equal(treasury(economy),51);const events=economy.drainEvents();assert.equal(events.some(event=>event.type==='train-destroyed'),false);
  economy.update(0,{elapsedSeconds:arrival+.999});assert.equal(economy.trains.find(train=>train.id===bought.trainId).state,'dwell');assert.equal(economy.drainEvents().length,0);
  economy.update(0,{elapsedSeconds:arrival+1});assert.equal(economy.trains.some(train=>train.id===bought.trainId),false);
  const destroyed=economy.drainEvents().find(event=>event.type==='train-destroyed');assert.ok(destroyed);assert.equal(destroyed.trainId,bought.trainId);
  assert.deepEqual(destroyed.carPoses,stopped.carPoses);assert.ok(destroyed.cars.every(car=>car.amount===0));assert.equal(economy.snapshot().stats.trainsLost,1);assert.equal(treasury(economy),51);
  until(economy,()=>{events.push(...economy.drainEvents());return events.some(event=>event.type==='station-payment'&&event.ownerId==='teal');});
  assert.equal(a.gold,1,'the visitor reaches the now-clear station and pays the owner');assert.equal(economy.trains.length,1,'payment cannot revive the destroyed train');assert.equal(treasury(economy),51);
  until(economy,()=>economy.trains[0].laps>=1);
  const snapshots=economy.trains;assert.equal(treasury(economy),51);assert.equal(economy.snapshot().stats.trainsLost,1);
  assert.equal(a.logs+b.logs+snapshots.reduce((sum,train)=>sum+train.cargo.resources,0),160,'only train purchases consume goods');
  assert.equal(economy.drainEvents().some(event=>event.type==='train-destroyed'),false);
});
