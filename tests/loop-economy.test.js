import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame} from '../src/settlement-game.js';
import {LOOP_ECONOMY,cityResource} from '../src/loop-economy.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';

const flat=()=>({type:'ground',height:0});
function fixture({closed=true}={}){
  const world={seed:'loop-test',gameplay:{economy:'loops',ownerId:'teal',starterHouse:{id:'home-1',x:0,z:0,rotation:0},farmVillages:{ownerId:'gray',cities:[{id:'farm',ownerId:'gray',x:20,z:0,level:2,houseCount:6}]}}};
  const game=createSettlementGame(world,{surfaceAt:flat});
  const city={id:'own',ownerId:'teal',x:0,z:0,level:2,houseCount:6,biome:'forest'};
  const session={player:game,bots:[],revision:0};
  const proxy=new Proxy(game,{get(target,key){return key==='cities'?[city]:target[key];}});session.player=proxy;
  const loop={id:'circle',cityIds:['own','farm'],stationIds:['own-station','farm-station'],length:40,
    stops:[{cityId:'own',stationId:'own-station',distance:0},{cityId:'farm',stationId:'farm-station',distance:20}],pieces:[{lineId:'out'},{lineId:'back'}]};
  const networkFactory=()=>({loops:id=>closed&&id==='own'?[loop]:[],sample:(_loop,distance)=>{
    const a=((distance%40)+40)%40/40*Math.PI*2;
    return {x:Math.cos(a)*10,y:0,z:Math.sin(a)*10,angle:-a,tangent:{x:-Math.sin(a),y:0,z:Math.cos(a)}};
  }});
  const railways={revision:0,snapshot:()=>({revision:0,stations:[],connections:[]})};
  const economy=createSettlementEconomy(world,{session,railways,networkFactory});
  game.setEconomy({resourcesAt:point=>economy.resourcesAt('teal',point),spendConstruction:(point,cost)=>economy.spendConstruction('teal',point,cost)});
  return {world,game,city,session,railways,economy,loop,networkFactory};
}

test('loop mode starts with a global wallet and eight wood homes, with no tool requirement or outposts',()=>{
  const {world}=fixture(),game=createSettlementGame(world,{surfaceAt:flat});
  assert.equal(game.logs,12);assert.equal(game.gold,60);assert.equal(game.economyMode,'loops');
  assert.deepEqual(game.constructionCost,{timber:8,tools:0});
  const before=game.snapshot();assert.equal(game.build({x:40,z:0}).code,'outside-city');assert.deepEqual(game.snapshot(),before);
  game.addLogs(60);assert.ok(game.build({x:5,z:0}).ok);assert.ok(game.build({x:0,z:5}).ok);
  assert.equal(game.cities.length,1);assert.deepEqual(game.constructionCost,{timber:8,tools:0});
  assert.equal(game.settleIncome(600),null);
});

test('biome output has exactly three goods and gray villages are the only food producers',()=>{
  const {world}=fixture();
  for(const [biome,expected]of [['forest','wood'],['desert','metal'],['plains','gold'],['farmland','gold'],['mountain','gold']]){
    assert.equal(cityResource(world,{biome,ownerId:'teal'}),expected);
    assert.equal(cityResource(world,{biome,ownerId:'gray'}),'food');
  }
});

test('visible worker completion credits the global wallet once, with no timer production or local depot',()=>{
  const {economy,game}=fixture();economy.update(600);assert.equal(game.logs,12);assert.equal(game.gold,60);
  assert.equal(economy.creditProduction('teal','wood',2,'worker-1:trip-1').ok,true);
  assert.equal(economy.creditProduction('teal','wood',2,'worker-1:trip-1').duplicate,true);
  assert.equal(game.logs,14);assert.equal(economy.creditProduction('teal','food',2,'wrong').code,'wrong-resource');
  assert.equal(economy.creditProduction('gray','food',3,'farm-worker:1').ok,true);
  assert.equal(economy.resourcesAt('gray').food,3);
  assert.equal(economy.resourcesAt('teal',{x:999,z:999}).wood,14);
  assert.equal(economy.city('own').stock,undefined);assert.equal(economy.snapshot().stats.productionEvents,2);
  assert.equal(economy.depositTimber,undefined);assert.equal(economy.setIndustry,undefined);
});

test('invalid production and construction are atomic',()=>{
  const {economy,game}=fixture(),before=economy.snapshot();
  for(const amount of [-1,0,NaN,Infinity,1.5,Number.MAX_SAFE_INTEGER+1])assert.equal(economy.creditProduction('teal','wood',amount,`bad:${amount}`).ok,false);
  assert.equal(economy.creditProduction('nobody','wood',2,'one').ok,false);
  assert.equal(economy.creditProduction('teal','wood',2,null).ok,false);
  assert.equal(economy.spendConstruction('teal',null,{timber:13}).ok,false);
  assert.equal(economy.spendConstruction('teal',null,{timber:8,tools:2}).ok,false);
  assert.equal(economy.spendConstruction('teal',null,{timber:8,wood:8}).ok,false);
  assert.deepEqual(economy.snapshot(),before);
  assert.ok(economy.spendConstruction('teal',null,{timber:8,tools:0}).ok);assert.equal(game.logs,4);
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
  assert.equal(game.logs,12);assert.equal(economy.trains[0].cargo.wood,10);
  economy.update(5);assert.equal(economy.trains[0].cargo.food,10);assert.equal(game.logs,12);
  assert.equal(economy.resourcesAt('gray').food,0,'train production never takes the source owner inventory');
  assert.equal(economy.resourcesAt('gray').gold,3);
  economy.update(5);assert.equal(game.logs,22);assert.equal(economy.resourcesAt('teal').food,10);
  assert.equal(economy.snapshot().stats.laps,1);assert.equal(economy.trains[0].laps,1);
  assert.equal(economy.trains[0].backing,false);assert.equal(economy.trains[0].carPoses.length,2);
});

test('gold cities pay a visit reward but add no cargo',()=>{
  const {economy,city,session,game}=fixture();city.biome='plains';session.revision++;
  economy.buyTrain('own','circle','teal');assert.deepEqual(economy.trains[0].cargo,{wood:0,metal:0,food:0});
  economy.update(10);assert.equal(game.logs,12);assert.equal(economy.resourcesAt('teal').food,10);
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


test('a founding biome remains fixed when the growing city centroid crosses a border',()=>{
  const world={gameplay:{ownerId:'teal',starterHouse:{x:0,z:0,biome:'forest'},playerBots:[{ownerId:'coral',starterHouse:{x:20,z:0,biome:'desert'}}]}};
  assert.equal(cityResource(world,{ownerId:'teal',x:30,z:0,biome:'desert'}),'wood');
  assert.equal(cityResource(world,{ownerId:'coral',x:0,z:0,biome:'forest'}),'metal');
  const {economy,city,session,world:configured}=fixture();configured.gameplay.starterHouse.biome='forest';
  city.biome='desert';city.x=100;session.revision++;
  assert.equal(economy.city('own').resource,'wood');
  assert.ok(economy.creditProduction('teal','wood',1,'after-expansion').ok);
  assert.equal(economy.creditProduction('teal','metal',1,'wrong-job').code,'wrong-resource');
});


test('game resource adapters preserve global balances through worker earnings, train purchase and delivery',()=>{
  const {game,economy,world}=fixture();
  const standalone=createSettlementGame(world,{surfaceAt:flat});
  assert.deepEqual(standalone.resourcesAt(),{wood:12,timber:12,metal:0,food:0,gold:60,grain:0,tools:0,cityId:null});
  assert.deepEqual(game.resourcesAt(),economy.resourcesAt('teal'));
  economy.creditProduction('teal','wood',4,'worker:wallet-regression');
  economy.buyTrain('own','circle','teal');
  assert.equal(game.resourcesAt().gold,43);assert.equal(game.resourcesAt().wood,16);
  economy.update(10);
  assert.deepEqual(game.resourcesAt({x:500,z:500}),economy.resourcesAt('teal'));
  assert.equal(game.resourcesAt().food,10);assert.equal(game.resourcesAt().wood,26);
  game.setEconomy({resourcesAt:()=>({wood:0,metal:17,food:19,gold:23}),spendConstruction:()=>({ok:false})});
  assert.equal(game.resourcesAt().metal,17);assert.equal(game.resourcesAt().food,19);assert.equal(game.resourcesAt().gold,23);
  const preview=game.evaluateBuild({x:5,z:0});assert.match(preview.reason,/8 more wood/);assert.equal(preview.code,'not-enough-wood');
});


test('every arrival holds a train for one second and earns rewards exactly once',()=>{
  const {economy,game}=fixture();assert.equal(LOOP_ECONOMY.dwell,1);
  economy.buyTrain('own','circle','teal');
  const atHome=economy.trains[0],initial=atHome.pose;
  assert.equal(atHome.state,'dwell');assert.equal(atHome.stopCityId,'own');
  assert.equal(atHome.dwellRemaining,1);assert.equal(atHome.dwellDuration,1);assert.equal(atHome.dwellProgress,0);
  assert.equal(atHome.nextStopCityId,'farm');assert.equal(atHome.arrivalRemaining,5);
  economy.update(.75);
  assert.deepEqual(economy.trains[0].pose,initial);assert.equal(economy.trains[0].dwellRemaining,.25);
  assert.equal(economy.trains[0].dwellProgress,.75);assert.equal(game.gold,43);
  economy.update(.25);assert.equal(economy.trains[0].state,'moving');assert.equal(economy.trains[0].stopCityId,null);
  economy.update(4);
  const atFarm=economy.trains[0],farmPose=atFarm.pose;
  assert.equal(atFarm.state,'dwell');assert.equal(atFarm.stopCityId,'farm');assert.equal(atFarm.dwellRemaining,1);
  assert.equal(atFarm.nextStopCityId,'own');assert.equal(economy.resourcesAt('gray').gold,3);
  economy.update(.75);assert.deepEqual(economy.trains[0].pose,farmPose);
  assert.equal(economy.resourcesAt('gray').gold,3);assert.deepEqual(economy.trains[0].cargo,{wood:10,metal:0,food:10});
  economy.update(.25);assert.equal(economy.trains[0].state,'moving');
  economy.update(4);assert.equal(economy.trains[0].stopCityId,'own');assert.equal(economy.trains[0].dwellRemaining,1);
  const events=economy.drainEvents();
  assert.deepEqual(events.filter(event=>event.type==='pickup').map(event=>[event.cityId,event.time]),[['own',0],['farm',5],['own',10]]);
  assert.deepEqual(events.filter(event=>event.type==='delivery').map(event=>event.time),[10]);
  assert.equal(game.logs,22);assert.equal(game.gold,46);assert.equal(economy.resourcesAt('teal').food,10);
});

test('station gain events describe exact positions and distinguish loaded cargo from wallet delivery',()=>{
  const {economy}=fixture();economy.buyTrain('own','circle','teal');economy.update(10);
  const events=economy.drainEvents(),pickups=events.filter(event=>event.type==='pickup'),delivery=events.find(event=>event.type==='delivery');
  assert.equal(new Set(events.map(event=>event.id)).size,events.length);
  assert.deepEqual(pickups[0].resources,{wood:10,metal:0,food:0,gold:0});
  assert.equal(pickups[0].stationId,'own-station');assert.equal(pickups[0].x,10);assert.equal(pickups[0].z,0);
  assert.equal(pickups[1].stationId,'farm-station');assert.equal(pickups[1].x,-10);
  assert.equal(pickups[1].ownerId,'teal');assert.equal(pickups[1].cityOwnerId,'gray');assert.equal(pickups[1].gold,3);
  assert.deepEqual(pickups[1].resources,{wood:0,metal:0,food:10,gold:0});
  assert.deepEqual(delivery.resources,{wood:10,metal:0,food:10,gold:0});
  assert.equal(delivery.stationId,'own-station');assert.equal(delivery.x,10);assert.equal(delivery.z,0);
});

test('worker gain events preserve the credited worker location and reject duplicate feedback',()=>{
  const {economy}=fixture(),metadata={x:4,y:2,z:7,workerId:'worker-7',nodeId:'tree-3',cityId:'own'};
  assert.equal(economy.creditProduction('teal','wood',2,'trip-7',metadata).ok,true);
  metadata.x=999;
  assert.equal(economy.creditProduction('teal','wood',2,'trip-7',metadata).duplicate,true);
  const events=economy.drainEvents();assert.equal(events.length,1);
  assert.deepEqual(events[0].resources,{wood:2,metal:0,food:0,gold:0});
  assert.equal(events[0].x,4);assert.equal(events[0].y,2);assert.equal(events[0].z,7);
  assert.equal(events[0].workerId,'worker-7');assert.equal(events[0].nodeId,'tree-3');
  economy.creditProduction('teal','wood',2,'trip-8',{x:NaN,z:Infinity});
  const fallback=economy.drainEvents()[0];assert.equal(fallback.x,0);assert.equal(fallback.z,0);
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
