import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame} from '../src/settlement-game.js';
import {LOOP_ECONOMY,cityResource} from '../src/loop-economy.js';
import {loopTrackCost,loopTrainCost} from '../src/loop-economy-rules.js';
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
  const networkFactory=()=>({loops:id=>closed&&['own','farm'].includes(id)?[loop]:[],sample:(_loop,distance)=>{
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
  assert.equal(game.logs,40);assert.equal(game.food,12);assert.equal(game.gold,0);assert.equal(game.economyMode,'loops');
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
  economy.update(0,{elapsedSeconds:300});assert.equal(game.logs,45);assert.equal(game.gold,0);
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

test('track and train prices share material rules and exclude the engine from paid cargo cars',()=>{
  assert.equal(loopTrainCost(1),10);assert.equal(loopTrainCost(2),15);assert.equal(loopTrainCost(3),20);assert.equal(loopTrainCost(0),Infinity);
  assert.equal(loopTrackCost(48),2);assert.equal(loopTrackCost(48.01),4);assert.equal(loopTrackCost(96),4);
});

test('only an owned level-two city with a complete loop can buy a train using resources and zero gold',()=>{
  const open=fixture({closed:false});assert.equal(open.economy.buyTrain('own','circle','teal').code,'no-complete-loop');assert.equal(open.game.gold,0);
  const {economy,game}=fixture();assert.equal(economy.buyTrain('farm','circle','teal').code,'not-your-city');
  assert.equal(economy.buyTrain('own','circle','coral').code,'not-your-city');assert.equal(economy.buyTrain('own','missing','teal').code,'no-complete-loop');
  game.spendLogs(26);assert.equal(economy.buyTrain('own','circle','teal').code,'not-enough-resources');assert.equal(game.logs,14);
  game.addLogs(1);const bought=economy.buyTrain('own','circle','teal');assert.ok(bought.ok);assert.equal(bought.cost,15);
  assert.equal(game.logs,0);assert.equal(game.gold,0,'purchase and initial departure never mint gold');assert.equal(economy.trains.length,1);
});

test('passing a station mints two cargo; the return delivers it and pays two owner resources',()=>{
  const {economy,game}=fixture();economy.buyTrain('own','circle','teal');
  assert.equal(game.logs,25);assert.equal(game.food,12);assert.deepEqual(economy.trains[0].cargo,{resources:2,food:0});
  assert.equal(economy.drainEvents().some(event=>event.type==='station-bonus'),false,'buying and initial departure are not paid visits');
  economy.update(economy.trains[0].arrivalRemaining);assert.deepEqual(economy.trains[0].cargo,{resources:2,food:2});
  assert.equal(game.logs,25);assert.equal(game.food,12,'cargo stays onboard until home');
  assert.equal(economy.resourcesAt('gray').resources,0);assert.equal(economy.resourcesAt('gray').food,0,'pickup is minted rather than deducted from village production');
  economy.update(0,{elapsedSeconds:4});assert.equal(game.logs,29);assert.equal(game.food,14);
  assert.equal(economy.snapshot().stats.laps,1);assert.equal(economy.snapshot().stats.stationResources,2);
  assert.deepEqual(economy.trains[0].cargo,{resources:2,food:0},'home loads the next circuit without paying another bonus');
  assert.equal(economy.trains[0].backing,false);assert.equal(economy.trains[0].carPoses.length,2);
  const events=economy.drainEvents(),bonus=events.filter(event=>event.type==='station-bonus');
  assert.deepEqual(bonus.map(event=>[event.ownerId,event.cityId,event.amount,event.time]),[['teal','own',2,4]]);
  assert.equal(events.filter(event=>event.type==='delivery').length,1);
});

test('many purchased trains are immediately visible and move independently without reservations',()=>{
  const {economy,game}=fixture();game.addLogs(300);
  for(let i=0;i<20;i++)assert.equal(economy.buyTrain('own','circle','teal').ok,true);
  economy.update(0);const initial=economy.trains;
  assert.equal(initial.length,20);assert.ok(initial.every(train=>train.active&&train.state==='moving'&&train.distance===0));
  assert.ok(initial.every(train=>train.pose&&train.carPoses.length===2&&train.carPoses.every(Boolean)));
  assert.deepEqual(economy.resourcesAt('teal').rates,{resources:1201,food:600},'each independent circuit contributes its own cargo and home bonus');
  economy.update(.25);assert.ok(economy.trains.every(train=>train.distance===2.5&&train.active));
  economy.update(3.75);assert.ok(economy.trains.every(train=>train.laps===1&&train.state==='moving'&&train.active));
  assert.equal(economy.snapshot().stats.laps,20);assert.equal(economy.snapshot().stats.stationResources,40);
  assert.equal(economy.snapshot().locks,undefined);
  const count=20;economy.update(.25);assert.ok(economy.trains.every(train=>train.distance===2.5));
  assert.equal(economy.snapshot().stats.trainsBought,count);
});

test('a new purchase appears at home while earlier trains continue along the same rails',()=>{
  const {economy}=fixture();economy.buyTrain('own','circle','teal');economy.update(1);
  const before=economy.trains[0];economy.buyTrain('own','circle','teal');
  assert.deepEqual(economy.trains[0],before);assert.equal(economy.trains[1].distance,0);
  assert.equal(economy.trains[1].active,true);assert.equal(economy.trains[1].state,'moving');
  economy.update(.5);assert.deepEqual(economy.trains.map(train=>train.distance),[15,5]);
  assert.deepEqual(economy.resourcesAt('teal').rates,{resources:121,food:60});
});

test('foreign trains immediately pay owned stations Resources while their cargo stays onboard',()=>{
  const {economy,game,session,world}=fixture();
  const foreign={ownerId:'coral',logs:40,food:12,population:6,cities:[{id:'farm',ownerId:'coral',x:20,z:0,level:2,houseCount:6}],
    spendLogs(n){if(this.logs<n)return{ok:false};this.logs-=n;return{ok:true};},addLogs(n){this.logs+=n;return{ok:true};},
    addFood(n){this.food+=n;return{ok:true};},spendFood(n){if(this.food<n)return{ok:false};this.food-=n;return{ok:true};}};
  world.gameplay.farmVillages.cities=[];session.bots.push({game:foreign});session.revision++;
  assert.ok(economy.buyTrain('farm','circle','coral').ok);assert.equal(game.logs,40);assert.equal(foreign.logs,25);
  assert.deepEqual(economy.resourcesAt('teal').rates,{resources:31,food:0});
  assert.deepEqual(economy.resourcesAt('coral').rates,{resources:96,food:0});
  economy.update(economy.trains[0].arrivalRemaining);assert.equal(game.logs,42);assert.equal(foreign.logs,25);assert.equal(game.food,12);
  let bonuses=economy.drainEvents().filter(event=>event.type==='station-bonus');
  assert.deepEqual(bonuses.map(event=>[event.ownerId,event.cityId,event.amount]),[['teal','own',2]]);
  economy.update(0,{elapsedSeconds:4});assert.equal(foreign.logs,31,'two resource pickups plus one home owner bonus');
  bonuses=economy.drainEvents().filter(event=>event.type==='station-bonus');
  assert.deepEqual(bonuses.map(event=>[event.ownerId,event.cityId,event.amount]),[['coral','farm',2]]);
});

test('trains have no upkeep, debt or coin accounts at daytime or nighttime boundaries',()=>{
  const {economy,game,loop}=fixture({population:0});loop.length=10000;loop.stops[1].distance=5000;
  economy.buyTrain('own','circle','teal');economy.buyTrain('own','circle','teal');
  const initial=game.logs;economy.update(600);
  assert.equal(game.logs,initial,'minute boundaries do not charge active trains');assert.equal(game.gold,0);
  const wallet=economy.resourcesAt('teal'),snapshot=economy.snapshot();
  for(const key of ['gold','upkeep','resourceDebt','resourceNet'])assert.equal(wallet[key],undefined);
  for(const key of ['gold','upkeep','currencyMinted','deliveryDebtPaid'])assert.equal(snapshot.stats[key],undefined);
  assert.deepEqual(snapshot.stats.produced,{resources:0,food:30});
  assert.equal(economy.settleResourceDebt,undefined);
  economy.creditResources('teal',4);assert.equal(game.logs,initial+4);
  assert.equal(economy.spendResources('teal',initial+4).ok,true);assert.equal(game.logs,0);
  assert.equal(economy.spendResources('teal',1).ok,false);assert.equal(economy.spendConstruction('teal',null,{resources:1}).ok,false);
  assert.equal(economy.drainEvents().some(event=>'gold'in event||'upkeep'in event),false);
});

test('night stops population production while independent train income continues',()=>{
  const {economy,game}=fixture();economy.buyTrain('own','circle','teal');economy.update(300);
  const before={logs:game.logs,food:game.food,produced:economy.snapshot().stats.produced};economy.drainEvents();
  assert.deepEqual(economy.resourcesAt('teal').rates,{resources:60,food:30});economy.update(60);
  assert.equal(game.logs,before.logs+60);assert.equal(game.food,before.food+30);
  assert.deepEqual(economy.snapshot().stats.produced,before.produced);
  assert.equal(economy.drainEvents().some(event=>event.type==='production'),false);
});

test('train accounting is frame independent across arrivals and production boundaries; reads do not advance time',()=>{
  const a=fixture(),b=fixture();
  for(const target of [a,b]){target.economy.buyTrain('own','circle','teal');target.economy.buyTrain('own','circle','teal');}
  a.economy.update(740);for(let i=0;i<2960;i++)b.economy.update(.25);
  assert.deepEqual(a.economy.snapshot(),b.economy.snapshot());assert.deepEqual(a.economy.drainEvents(),b.economy.drainEvents());
  const before=a.economy.snapshot();a.economy.city('own');a.economy.trains;a.economy.resourcesAt('teal');assert.deepEqual(a.economy.snapshot(),before);
});

test('all founding sites and growing centroids keep the same resource product',()=>{
  const world={gameplay:{ownerId:'teal',starterHouse:{x:0,z:0,biome:'forest'},playerBots:[{ownerId:'coral',starterHouse:{x:20,z:0,biome:'desert'}}]}};
  assert.equal(cityResource(world,{ownerId:'teal',x:30,z:0,biome:'desert'}),'resources');
  assert.equal(cityResource(world,{ownerId:'coral',x:0,z:0,biome:'forest'}),'resources');
  const {economy,city,session}=fixture();city.biome='desert';city.x=100;session.revision++;
  assert.equal(economy.city('own').resource,'resources');
});

test('game resource adapters preserve global balances through production, purchase and delivery',()=>{
  const {game,economy,world}=fixture();
  const standalone=createSettlementGame(world,{surfaceAt:flat});
  assert.equal(standalone.resourcesAt().resources,40);assert.equal(standalone.resourcesAt().food,12);assert.equal(standalone.resourcesAt().gold,undefined);
  assert.deepEqual(game.resourcesAt(),economy.resourcesAt('teal'));
  economy.update(120);economy.buyTrain('own','circle','teal');
  assert.equal(game.resourcesAt().gold,undefined);assert.equal(game.resourcesAt().resources,27);
  economy.update(4);
  assert.deepEqual(game.resourcesAt({x:500,z:500}),economy.resourcesAt('teal'));
  assert.equal(game.resourcesAt().food,14);assert.equal(game.resourcesAt().resources,31);
  game.setEconomy({resourcesAt:()=>({resources:0,food:19}),spendConstruction:()=>({ok:false})});
  assert.equal(game.resourcesAt().food,19);assert.equal(game.resourcesAt().gold,undefined);
  assert.equal(game.resourcesAt().metal,undefined);assert.equal(game.resourcesAt().wood,undefined);
  const preview=game.evaluateBuild({x:5,z:0});assert.match(preview.reason,/8 more resources/);assert.equal(preview.code,'not-enough-resources');
});

test('trains travel at ten units per second and pass station alignments without pausing',()=>{
  const {economy}=fixture();assert.equal(LOOP_ECONOMY.speed,10);assert.equal(LOOP_ECONOMY.dwell,0);
  economy.buyTrain('own','circle','teal');
  const atHome=economy.trains[0],initial=atHome.pose;
  assert.equal(atHome.state,'moving');assert.equal(atHome.nextStopCityId,'farm');assert.ok(Math.abs(atHome.arrivalRemaining-2.26)<1e-8);
  for(const field of ['dwellRemaining','dwellDuration','dwellProgress','stopCityId'])assert.equal(atHome[field],undefined);
  economy.update(1);assert.equal(economy.trains[0].distance,10);assert.notDeepEqual(economy.trains[0].pose,initial);
  economy.update(0,{elapsedSeconds:atHome.arrivalRemaining});const atFarm=economy.trains[0],station=atFarm.carPoses[1];
  assert.equal(atFarm.state,'moving');assert.equal(atFarm.nextStopCityId,'own');assert.ok(Math.abs(station.x+10)<1e-8);
  assert.ok(Math.abs(station.z)<1e-8);assert.deepEqual(atFarm.cargo,{resources:2,food:2});
  economy.update(.1);assert.ok(Math.abs(economy.trains[0].distance-23.6)<1e-8);assert.notDeepEqual(economy.trains[0].pose,atFarm.pose);
  economy.update(0,{elapsedSeconds:4});assert.equal(economy.trains[0].distance,0);assert.equal(economy.trains[0].state,'moving');
  const events=economy.drainEvents();
  assert.deepEqual(events.filter(event=>event.type==='pickup').map(event=>[event.cityId,Math.round(event.time*100)/100]),[['own',0],['farm',2.26],['own',4]]);
  assert.deepEqual(events.filter(event=>event.type==='delivery').map(event=>event.time),[4]);
  economy.update(.1);assert.ok(Math.abs(economy.trains[0].distance-1)<1e-8);
});

test('gain events locate the assigned station and distinguish onboard cargo, delivery and owner bonus',()=>{
  const {economy}=fixture();economy.buyTrain('own','circle','teal');economy.update(4);
  const events=economy.drainEvents(),pickups=events.filter(event=>event.type==='pickup'),delivery=events.find(event=>event.type==='delivery'),bonus=events.find(event=>event.type==='station-bonus');
  assert.equal(new Set(events.map(event=>event.id)).size,events.length);
  assert.deepEqual(pickups[0].resources,{resources:2,food:0});
  assert.equal(pickups[0].stationId,'own-station');assert.equal(pickups[0].x,10);assert.equal(pickups[0].z,0);
  assert.equal(pickups[1].stationId,'farm-station');assert.equal(pickups[1].x,-10);
  assert.equal(pickups[1].ownerId,'teal');assert.equal(pickups[1].cityOwnerId,'gray');
  assert.deepEqual(pickups[1].resources,{resources:0,food:2});
  assert.deepEqual(delivery.resources,{resources:2,food:2});
  assert.equal(delivery.cityOwnerId,'teal');assert.equal(delivery.stationId,'own-station');assert.equal(delivery.x,10);assert.equal(delivery.z,0);
  assert.equal(bonus.ownerId,'teal');assert.equal(bonus.cityId,'own');assert.equal(bonus.resource,'resources');assert.equal(bonus.amount,2);
  assert.deepEqual(bonus.resources,{resources:2,food:0});assert.equal(bonus.x,10);assert.equal(bonus.z,0);
  assert.equal(events.some(event=>'gold'in event),false);
});

test('production events describe the credited settlement and cosmetic trips cannot add feedback',()=>{
  const {economy}=fixture();economy.update(60);
  const events=economy.drainEvents(),own=events.filter(event=>event.ownerId==='teal');
  assert.equal(own.length,1);assert.equal(own[0].type,'production');assert.equal(own[0].amount,1);
  assert.deepEqual(own[0].resources,{resources:1,food:0});
  assert.equal(own[0].cityId,'own');assert.equal(own[0].x,0);assert.equal(own[0].y,0);assert.equal(own[0].z,0);
  assert.equal(own[0].workerId,undefined);assert.equal(own[0].time,60);
  assert.equal(events.filter(event=>event.cityId==='farm').length,1);
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
