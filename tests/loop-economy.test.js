import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame} from '../src/settlement-game.js';
import {LOOP_ECONOMY,cityResource} from '../src/loop-economy.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';

const flat=()=>({type:'ground',height:0});
function fixture({closed=true,population=1,formed=true}={}){
  const world={seed:'loop-test',gameplay:{economy:'loops',ownerId:'teal',starterHouse:{id:'home-1',x:0,z:0,rotation:0},farmVillages:{ownerId:'gray',cities:[{id:'farm',ownerId:'gray',x:20,z:0,level:2,houseCount:6}]}}};
  const game=createSettlementGame(world,{surfaceAt:flat});
  const city={id:'own',ownerId:'teal',x:0,z:0,level:2,houseCount:6,biome:'forest'};
  const session={player:game,bots:[],revision:0};
  let populationHomes=Array.from({length:population},(_,i)=>({id:`population:${i}`,x:0,z:0}));
  const proxy=new Proxy(game,{get(target,key){return key==='cities'?(formed?[city]:[]):key==='houses'?populationHomes:key==='population'?populationHomes.length:target[key];}});session.player=proxy;
  const loop={id:'circle',cityIds:['own','farm'],stationIds:['own-station','farm-station'],length:40,
    stops:[{cityId:'own',stationId:'own-station',distance:0},{cityId:'farm',stationId:'farm-station',distance:20}],pieces:[{lineId:'out'},{lineId:'back'}]};
  const networkFactory=()=>({loops:id=>closed&&id==='own'?[loop]:[],sample:(_loop,distance)=>{
    const a=((distance%40)+40)%40/40*Math.PI*2;
    return {x:Math.cos(a)*10,y:0,z:Math.sin(a)*10,angle:-a,tangent:{x:-Math.sin(a),y:0,z:Math.cos(a)}};
  }});
  const railways={revision:0,snapshot:()=>({revision:0,stations:[],connections:[]})};
  const economy=createSettlementEconomy(world,{session,railways,networkFactory});
  game.setEconomy({resourcesAt:point=>economy.resourcesAt('teal',point),spendConstruction:(point,cost)=>economy.spendConstruction('teal',point,cost)});
  return {world,game,city,session,railways,economy,loop,networkFactory,setPopulation(value){populationHomes=Array.from({length:value},(_,i)=>({id:`population:${i}`,x:0,z:0}));session.revision++;}};
}

test('loop mode starts with a global wallet and eight-resource homes, with no tool requirement or outposts',()=>{
  const {world}=fixture(),game=createSettlementGame(world,{surfaceAt:flat});
  assert.equal(game.logs,12);assert.equal(game.gold,60);assert.equal(game.economyMode,'loops');
  assert.deepEqual(game.constructionCost,{resources:8});
  const before=game.snapshot();assert.equal(game.build({x:40,z:0}).code,'outside-city');assert.deepEqual(game.snapshot(),before);
  game.addLogs(60);assert.ok(game.build({x:5,z:0}).ok);assert.ok(game.build({x:0,z:5}).ok);
  assert.equal(game.cities.length,1);assert.deepEqual(game.constructionCost,{resources:8});
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

test('population produces at a constant rate without NPC trips or local depots',()=>{
  const {economy,game}=fixture();economy.update(600);
  assert.equal(game.logs,32);assert.equal(game.gold,60);
  assert.equal(economy.resourcesAt('gray').food,120);
  assert.equal(economy.resourcesAt('teal',{x:999,z:999}).resources,32);
  assert.deepEqual(economy.snapshot().stats.produced,{resources:20,food:120,gold:0});
  assert.equal(economy.city('own').stock,undefined);assert.equal(economy.snapshot().stats.productionEvents,140);
  assert.equal(economy.depositTimber,undefined);assert.equal(economy.setIndustry,undefined);
  const before=economy.snapshot();
  assert.deepEqual(economy.creditProduction('teal','resources',100,'cosmetic-trip'),{ok:false,code:'production-is-passive'});
  assert.deepEqual(economy.creditProduction('gray','food',100,'cosmetic-trip'),{ok:false,code:'production-is-passive'});
  assert.deepEqual(economy.snapshot(),before,'visual workers cannot mint resources or duplicate production');
});

test('outposts produce before becoming cities and population is not capped at level five',()=>{
  const {economy,game,setPopulation}=fixture({formed:false});
  assert.equal(economy.cities.some(city=>city.ownerId==='teal'),false);
  economy.update(30);assert.equal(game.logs,13);
  setPopulation(21);economy.update(30);assert.equal(game.logs,34);
  const owner=economy.snapshot().owners.find(owner=>owner.ownerId==='teal');
  assert.equal(owner.population,21);assert.equal(owner.productionRate,.7);
  assert.equal(economy.resourcesAt('teal').cityId,null);
});

test('changing population preserves fractional production, including an empty settlement',()=>{
  const {economy,game,setPopulation}=fixture({population:37});
  economy.update(12.5);assert.equal(game.logs,27,'37 residents earn 15 whole units and retain the fraction');
  setPopulation(0);economy.update(20);assert.equal(game.logs,27);
  setPopulation(2);economy.update(8.75);assert.equal(game.logs,28,'fractional earnings survive the pause and changed production rate');
  economy.update(15);assert.equal(game.logs,29);
});

test('passive production is frame independent across population changes and day/night boundaries',()=>{
  const a=fixture({population:17}),b=fixture({population:17});
  for(const [duration,population]of [[300,23],[300,2],[150,0],[150,19],[30,19]]){
    a.economy.update(duration);for(let i=0;i<duration*4;i++)b.economy.update(.25);
    assert.deepEqual(a.economy.snapshot(),b.economy.snapshot());
    assert.deepEqual(a.economy.drainEvents(),b.economy.drainEvents());
    a.setPopulation(population);b.setPopulation(population);
  }
  assert.equal(a.game.logs,12+170+230+10+19);
});

test('invalid construction is atomic and the timber compatibility alias never creates a second balance',()=>{
  const {economy,game}=fixture(),before=economy.snapshot();
  for(const cost of [{resources:13},{resources:8,tools:2},{resources:8,timber:8},{wood:8},{metal:1},{resources:-1},{resources:1.5},{resources:NaN}]){
    assert.equal(economy.spendConstruction('teal',null,cost).ok,false);
    assert.deepEqual(economy.snapshot(),before);
  }
  assert.ok(economy.spendConstruction('teal',null,{resources:8}).ok);assert.equal(game.logs,4);
  assert.ok(economy.spendConstruction('teal',null,{timber:4,tools:0}).ok);assert.equal(game.logs,0);
  assert.deepEqual(economy.snapshot().stats.construction,{resources:12,food:0});
  assert.equal(economy.resourcesAt('teal').timber,0);
  assert.equal(economy.resourcesAt('teal').wood,undefined);assert.equal(economy.resourcesAt('teal').metal,undefined);
});

test('only an owned level-two city with a complete directed loop can buy a train',()=>{
  const open=fixture({closed:false});assert.equal(open.economy.buyTrain('own','circle','teal').code,'no-complete-loop');assert.equal(open.game.gold,60);
  const {economy,game}=fixture();assert.equal(economy.buyTrain('farm','circle','teal').code,'not-your-city');
  assert.equal(economy.buyTrain('own','circle','coral').code,'not-your-city');
  assert.equal(economy.buyTrain('own','missing','teal').code,'no-complete-loop');
  game.spendGold(41);assert.equal(economy.buyTrain('own','circle','teal').code,'not-enough-gold');assert.equal(game.gold,19);
  game.creditGold(1);const bought=economy.buyTrain('own','circle','teal');assert.ok(bought.ok);assert.equal(bought.cost,20);
  assert.equal(game.gold,3,'the home station earns its first visit payment');assert.equal(economy.trains.length,1);
});

test('each loop stop mints ten goods without taking owner stock; cargo credits only on a full circuit',()=>{
  const {economy,game}=fixture();economy.buyTrain('own','circle','teal');
  assert.equal(game.logs,12);assert.equal(economy.trains[0].cargo.resources,10);
  economy.update(6);assert.equal(economy.trains[0].cargo.food,10);assert.equal(game.logs,12);
  assert.equal(economy.resourcesAt('gray').food,1,'the village retains its independently produced food');
  assert.equal(economy.resourcesAt('gray').gold,3);
  economy.update(4);assert.equal(game.logs,22);assert.equal(economy.resourcesAt('teal').food,10);
  assert.equal(economy.snapshot().stats.laps,1);assert.equal(economy.trains[0].laps,1);
  assert.equal(economy.trains[0].backing,false);assert.equal(economy.trains[0].carPoses.length,2);
});

test('plains cities load resources and still earn the same station visit payment',()=>{
  const {economy,city,session,game}=fixture();city.biome='plains';session.revision++;
  economy.buyTrain('own','circle','teal');assert.deepEqual(economy.trains[0].cargo,{resources:10,food:0});
  assert.equal(game.gold,43);
  economy.update(10);assert.equal(game.logs,22);assert.equal(economy.resourcesAt('teal').food,10);
});

test('whole-loop reservations prevent trains meeting on shared tracks and serve the oldest waiting train',()=>{
  const {economy}=fixture();economy.buyTrain('own','circle','teal');economy.buyTrain('own','circle','teal');
  assert.deepEqual(economy.trains.map(train=>train.state),['dwell','waiting']);
  economy.update(10);assert.deepEqual(economy.trains.map(train=>train.state),['waiting','dwell']);
  economy.update(10);assert.deepEqual(economy.trains.map(train=>train.state),['dwell','waiting']);
  assert.deepEqual(economy.trains.map(train=>train.laps),[1,1]);
});

test('train accounting is frame-size independent and display reads do not advance time',()=>{
  const a=fixture(),b=fixture();a.economy.buyTrain('own','circle','teal');b.economy.buyTrain('own','circle','teal');
  a.economy.update(140);for(let i=0;i<560;i++)b.economy.update(.25);
  assert.deepEqual(a.economy.snapshot(),b.economy.snapshot());
  const before=a.economy.snapshot();a.economy.city('own');a.economy.trains;a.economy.resourcesAt('teal');
  assert.deepEqual(a.economy.snapshot(),before);
});


test('all founding sites and growing centroids keep the same resource product',()=>{
  const world={gameplay:{ownerId:'teal',starterHouse:{x:0,z:0,biome:'forest'},playerBots:[{ownerId:'coral',starterHouse:{x:20,z:0,biome:'desert'}}]}};
  assert.equal(cityResource(world,{ownerId:'teal',x:30,z:0,biome:'desert'}),'resources');
  assert.equal(cityResource(world,{ownerId:'coral',x:0,z:0,biome:'forest'}),'resources');
  const {economy,city,session}=fixture();city.biome='desert';city.x=100;session.revision++;
  assert.equal(economy.city('own').resource,'resources');
});

test('game resource adapters preserve global balances through production, train purchase and delivery',()=>{
  const {game,economy,world}=fixture();
  const standalone=createSettlementGame(world,{surfaceAt:flat});
  assert.deepEqual(standalone.resourcesAt(),{resources:12,timber:12,food:0,gold:60,grain:0,tools:0,cityId:null});
  assert.deepEqual(game.resourcesAt(),economy.resourcesAt('teal'));
  economy.update(120);economy.buyTrain('own','circle','teal');
  assert.equal(game.resourcesAt().gold,43);assert.equal(game.resourcesAt().resources,16);
  economy.update(10);
  assert.deepEqual(game.resourcesAt({x:500,z:500}),economy.resourcesAt('teal'));
  assert.equal(game.resourcesAt().food,10);assert.equal(game.resourcesAt().resources,26);
  game.setEconomy({resourcesAt:()=>({resources:0,food:19,gold:23}),spendConstruction:()=>({ok:false})});
  assert.equal(game.resourcesAt().food,19);assert.equal(game.resourcesAt().gold,23);
  assert.equal(game.resourcesAt().metal,undefined);assert.equal(game.resourcesAt().wood,undefined);
  const preview=game.evaluateBuild({x:5,z:0});assert.match(preview.reason,/8 more resources/);assert.equal(preview.code,'not-enough-resources');
});


test('every arrival holds a train for one second and earns rewards exactly once',()=>{
  const {economy,game}=fixture();assert.equal(LOOP_ECONOMY.dwell,1);
  economy.buyTrain('own','circle','teal');
  const atHome=economy.trains[0],initial=atHome.pose;
  assert.equal(atHome.state,'dwell');assert.equal(atHome.stopCityId,'own');
  assert.equal(atHome.dwellRemaining,1);assert.equal(atHome.dwellDuration,1);assert.equal(atHome.dwellProgress,0);
  assert.equal(atHome.nextStopCityId,'farm');assert.ok(Math.abs(atHome.arrivalRemaining-5.52)<1e-8);
  economy.update(.75);
  assert.deepEqual(economy.trains[0].pose,initial);assert.equal(economy.trains[0].dwellRemaining,.25);
  assert.equal(economy.trains[0].dwellProgress,.75);assert.equal(game.gold,43);
  economy.update(.25);assert.equal(economy.trains[0].state,'moving');assert.equal(economy.trains[0].stopCityId,null);
  economy.update(4.52);
  const atFarm=economy.trains[0],farmPose=atFarm.pose;
  assert.equal(atFarm.state,'dwell');assert.equal(atFarm.stopCityId,'farm');assert.ok(Math.abs(atFarm.dwellRemaining-1)<1e-8);
  assert.equal(atFarm.nextStopCityId,'own');assert.equal(economy.resourcesAt('gray').gold,3);
  economy.update(.75);assert.deepEqual(economy.trains[0].pose,farmPose);
  assert.equal(economy.resourcesAt('gray').gold,3);assert.deepEqual(economy.trains[0].cargo,{resources:10,food:10});
  economy.update(.25);assert.equal(economy.trains[0].state,'moving');
  economy.update(3.48);assert.equal(economy.trains[0].stopCityId,'own');assert.ok(Math.abs(economy.trains[0].dwellRemaining-1)<1e-8);
  const events=economy.drainEvents();
  assert.deepEqual(events.filter(event=>event.type==='pickup').map(event=>[event.cityId,Math.round(event.time*100)/100]),[['own',0],['farm',5.52],['own',10]]);
  assert.deepEqual(events.filter(event=>event.type==='delivery').map(event=>event.time),[10]);
  assert.equal(game.logs,22);assert.equal(game.gold,46);assert.equal(economy.resourcesAt('teal').food,10);
});

test('station gain events describe exact positions and distinguish loaded cargo from wallet delivery',()=>{
  const {economy}=fixture();economy.buyTrain('own','circle','teal');economy.update(10);
  const events=economy.drainEvents(),pickups=events.filter(event=>event.type==='pickup'),delivery=events.find(event=>event.type==='delivery');
  assert.equal(new Set(events.map(event=>event.id)).size,events.length);
  assert.deepEqual(pickups[0].resources,{resources:10,food:0,gold:0});
  assert.equal(pickups[0].stationId,'own-station');assert.equal(pickups[0].x,10);assert.equal(pickups[0].z,0);
  assert.equal(pickups[1].stationId,'farm-station');assert.equal(pickups[1].x,-10);
  assert.equal(pickups[1].ownerId,'teal');assert.equal(pickups[1].cityOwnerId,'gray');assert.equal(pickups[1].gold,3);
  assert.deepEqual(pickups[1].resources,{resources:0,food:10,gold:0});
  assert.deepEqual(delivery.resources,{resources:10,food:10,gold:0});
  assert.equal(delivery.stationId,'own-station');assert.equal(delivery.x,10);assert.equal(delivery.z,0);
});

test('production events describe the credited settlement and cosmetic trips cannot add feedback',()=>{
  const {economy}=fixture();economy.update(30);
  const events=economy.drainEvents(),own=events.filter(event=>event.ownerId==='teal');
  assert.equal(own.length,1);assert.equal(own[0].type,'production');assert.equal(own[0].amount,1);
  assert.deepEqual(own[0].resources,{resources:1,food:0,gold:0});
  assert.equal(own[0].cityId,'own');assert.equal(own[0].x,0);assert.equal(own[0].y,0);assert.equal(own[0].z,0);
  assert.equal(own[0].workerId,undefined);assert.equal(own[0].time,30);
  assert.equal(events.filter(event=>event.cityId==='farm').length,6);
  economy.creditProduction('teal','resources',2,'trip-8',{x:4,y:2,z:7});
  assert.deepEqual(economy.drainEvents(),[]);
});

test('loop inspection exposes detached track portions and actual stop positions',()=>{
  const {economy,loop}=fixture();
  loop.segments=[{lineId:'out',start:4,end:24,length:20,offset:0,direction:1},{lineId:'back',start:6,end:26,length:20,offset:20,direction:1}];
  const info=economy.loops('own')[0];assert.deepEqual(info.segments,loop.segments);
  assert.equal(info.stops[1].x,-10);assert.equal(info.stops[1].resource,'food');
  info.segments[0].start=100;info.stops[0].x=999;
  assert.equal(economy.loops('own')[0].segments[0].start,4);
  assert.equal(economy.loops('own')[0].stops[0].x,10);
});
