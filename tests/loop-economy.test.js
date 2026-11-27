import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementGame} from '../src/settlement-game.js';
import {createLoopEconomy,cityResource} from '../src/loop-economy.js';
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
  economy.update(7);assert.equal(economy.trains[0].cargo.food,10);assert.equal(game.logs,12);
  assert.equal(economy.resourcesAt('gray').food,0,'train production never takes the source owner inventory');
  assert.equal(economy.resourcesAt('gray').gold,3);
  economy.update(7);assert.equal(game.logs,22);assert.equal(economy.resourcesAt('teal').food,10);
  assert.equal(economy.snapshot().stats.laps,1);assert.equal(economy.trains[0].laps,1);
  assert.equal(economy.trains[0].backing,false);assert.equal(economy.trains[0].carPoses.length,2);
});

test('gold cities pay a visit reward but add no cargo',()=>{
  const {economy,city,session,game}=fixture();city.biome='plains';session.revision++;
  economy.buyTrain('own','circle','teal');assert.deepEqual(economy.trains[0].cargo,{wood:0,metal:0,food:0});
  economy.update(14);assert.equal(game.logs,12);assert.equal(economy.resourcesAt('teal').food,10);
});

test('whole-loop reservations prevent trains meeting on shared tracks and serve the oldest waiting train',()=>{
  const {economy}=fixture();economy.buyTrain('own','circle','teal');economy.buyTrain('own','circle','teal');
  assert.deepEqual(economy.trains.map(train=>train.state),['dwell','waiting']);
  economy.update(14);assert.deepEqual(economy.trains.map(train=>train.state),['waiting','dwell']);
  economy.update(14);assert.deepEqual(economy.trains.map(train=>train.state),['dwell','waiting']);
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
  economy.update(14);
  assert.deepEqual(game.resourcesAt({x:500,z:500}),economy.resourcesAt('teal'));
  assert.equal(game.resourcesAt().food,10);assert.equal(game.resourcesAt().wood,26);
  game.setEconomy({resourcesAt:()=>({wood:0,metal:17,food:19,gold:23}),spendConstruction:()=>({ok:false})});
  assert.equal(game.resourcesAt().metal,17);assert.equal(game.resourcesAt().food,19);assert.equal(game.resourcesAt().gold,23);
  const preview=game.evaluateBuild({x:5,z:0});assert.match(preview.reason,/8 more wood/);assert.equal(preview.code,'not-enough-wood');
});
