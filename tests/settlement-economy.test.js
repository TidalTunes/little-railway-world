import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementEconomy,ECONOMY} from '../src/settlement-economy.js';
import {combineAlignments,straightSegment} from '../src/alignments.js';
import {simulateStrategy} from '../scripts/simulate-legacy-economy.mjs';

function fixture({cities=[{id:'a',ownerId:'teal',x:0,industry:'lumber'},{id:'b',ownerId:'coral',x:100,industry:'farm'}],connected=true,gold=12}={}){
  const records=cities.map(city=>({...city,z:city.z??0,level:city.level??1,houseCount:city.houseCount??3,
    houseIds:[`${city.id}:1`,`${city.id}:2`,`${city.id}:3`]}));
  const games=[...new Set(records.map(city=>city.ownerId))].map(ownerId=>({ownerId,revision:0,logs:12,gold,
    cities:records.filter(city=>city.ownerId===ownerId),houses:records.filter(city=>city.ownerId===ownerId).flatMap(city=>city.houseIds.map((id,index)=>({id,cityId:city.id,x:city.x+index,z:city.z}))),
    spendLogs(amount){if(amount>this.logs)return {ok:false};this.logs-=amount;this.revision++;return {ok:true};},
    spendGold(amount){if(amount>this.gold)return {ok:false};this.gold-=amount;this.revision++;return {ok:true};},
    creditGold(amount){this.gold+=amount;this.revision++;return {ok:true};}}));
  const session={player:games[0],bots:games.slice(1).map(game=>({game})),get revision(){return games.reduce((sum,game)=>sum+game.revision,0);}};
  const positions=records.map(city=>city.x),line={id:'main',alignment:combineAlignments([straightSegment({x:Math.min(...positions),z:0},{x:Math.max(...positions,1),z:0})])};
  const stations=records.map(city=>({id:`station:${city.id}`,cityId:city.id,lineId:'main',distance:city.x-Math.min(...positions)}));
  const infrastructure={revision:0,lines:connected?[line]:[],stations:connected?stations:[],connections:[]};
  const railways={get revision(){return infrastructure.revision;},snapshot(){return structuredClone(infrastructure);}};
  const world={gameplay:{}},economy=createSettlementEconomy(world,{session,railways});
  for(const city of records)if(city.industry)economy.setIndustry(city.id,city.industry,city.ownerId);
  return {economy,session,games,cities:records,railways,infrastructure,world};
}
const totals=snapshot=>{
  const stock={timber:snapshot.owners.reduce((sum,owner)=>sum+owner.timber,0),grain:0,tools:0};
  for(const city of snapshot.cities)for(const resource of Object.keys(stock))stock[resource]+=city.stock[resource];
  for(const train of snapshot.trains)if(train.cargo)stock[train.cargo.resource]+=train.cargo.quantity;
  return stock;
};

test('production and income use exact simulation pulses, never rendering or day changes',()=>{
  const {economy,games}=fixture({connected:false});
  economy.update(19.99);assert.equal(economy.snapshot().stats.pulses,0);assert.equal(games[0].gold,12);
  economy.update(.01);assert.equal(economy.city('a').stock.timber,4);assert.equal(economy.city('b').stock.grain,4);
  assert.equal(games[0].gold,13);assert.equal(games[1].gold,13);
  economy.update(20);assert.equal(games[0].gold,14);assert.equal(games[1].gold,17);
  assert.equal(economy.city('b').fed,true);assert.equal(economy.city('a').fed,false);
  for(let i=0;i<10;i++)economy.snapshot();assert.equal(games[1].gold,17);
});

test('transport escrows goods and money, then pays exactly once at physical arrival',()=>{
  const {economy,games}=fixture();economy.update(20);
  const departure=economy.snapshot(),cargo=departure.trains.find(train=>train.cargo);
  assert.ok(cargo);assert.equal(cargo.resource,'grain');assert.equal(cargo.pose.x,100);
  assert.equal(departure.escrow,cargo.quantity);assert.equal(economy.city('a').stock.grain,0);
  assert.equal(economy.city('a').incoming.grain,cargo.quantity);
  assert.equal(games[1].gold,13,'seller is not credited at departure');
  economy.update(10);assert.equal(economy.trains.find(train=>train.active).pose.x,50);assert.equal(economy.snapshot().stats.deliveries,0);
  economy.update(10);assert.equal(economy.snapshot().stats.deliveries,1);assert.equal(games[1].gold,17+cargo.quantity);
  const after=games[1].gold;economy.update(0);economy.snapshot();assert.equal(games[1].gold,after);
});

test('the same elapsed time is independent of frame size and conserves all cargo and currency',()=>{
  const a=fixture(),b=fixture();a.economy.update(900);
  for(let i=0;i<3600;i++)b.economy.update(.25);
  const left=a.economy.snapshot(),right=b.economy.snapshot();
  assert.deepEqual(left,right);
  const stock=totals(left);
  for(const resource of ['timber','grain','tools'])assert.equal(stock[resource],(resource==='timber'?24:0)+left.stats.produced[resource]-left.stats.consumed[resource]-left.stats.construction[resource]-left.stats.industrySpent[resource]);
  assert.equal(left.owners.reduce((sum,owner)=>sum+owner.gold,0)+left.escrow,24+left.stats.currencyMinted);
});

test('shared physical corridors never carry opposing trains concurrently and queues keep progressing',()=>{
  const {economy}=fixture({cities:[{id:'a',ownerId:'teal',x:0,industry:'lumber'},{id:'b',ownerId:'coral',x:50,industry:'farm'},{id:'c',ownerId:'gold',x:100,industry:'workshop'}]});
  for(let i=0;i<900;i++){
    economy.update(1);assert.ok(economy.trains.filter(train=>train.active).length<=1);
    for(const city of economy.cities)for(const value of Object.values(city.stock))assert.ok(value>=0);
  }
  assert.ok(economy.snapshot().stats.deliveries>8);assert.ok(economy.cities.some(city=>city.stock.tools>0));
});

test('construction atomically combines carried timber with nearby depot stock and rejects remote tools',()=>{
  const {economy,games}=fixture({connected:false});economy.update(40);
  assert.deepEqual(economy.resourcesAt('teal',{x:0,z:0}),{timber:20,grain:0,tools:0,cityId:'a'});
  const before=economy.snapshot();assert.equal(economy.spendConstruction('teal',{x:0,z:0},{timber:8,tools:2}).ok,false);assert.deepEqual(economy.snapshot(),before);
  assert.equal(economy.spendConstruction('teal',{x:0,z:0},{timber:16}).ok,true);assert.equal(games[0].logs,0);assert.equal(economy.city('a').stock.timber,4);
  assert.equal(economy.resourcesAt('teal',{x:80,z:40}).timber,0);assert.equal(economy.spendConstruction('teal',{x:0,z:0},{timber:-1}).ok,false);
  assert.equal(economy.spendConstruction('teal',{x:0,z:0},{tools:Infinity}).ok,false);
});

test('industry change is owner-checked, charges once after the initial choice and has a real cooldown',()=>{
  const {economy,games}=fixture({connected:false});
  assert.equal(economy.setIndustry('a','farm','coral').ok,false);
  assert.equal(economy.setIndustry('a','farm','teal').cost,0);
  assert.equal(economy.setIndustry('a','workshop','teal').code,'industry-cooldown');
  economy.update(60);assert.equal(economy.setIndustry('a','workshop','teal').cost,6);assert.equal(games[0].logs,6);
  assert.equal(economy.setIndustry('a','workshop','teal').unchanged,true);assert.equal(games[0].logs,6);
});

test('neutral farms trade from their own wallet and never pay tribute to the player',()=>{
  const base=fixture({cities:[{id:'a',ownerId:'teal',x:0}],connected:false});
  base.world.gameplay.farmVillages={ownerId:'gray',cities:[{id:'v',ownerId:'gray',x:100,z:0,level:1,houseCount:3}],houses:[]};
  const economy=createSettlementEconomy(base.world,{session:base.session,railways:base.railways});economy.update(60);
  assert.equal(base.games[0].gold,15);assert.equal(economy.snapshot().owners.find(owner=>owner.ownerId==='gray').gold,21);
  assert.equal(economy.city('v').industry,'farm');assert.equal(economy.setIndustry('v','lumber','gray').ok,false);
});

test('same-owner shipping transfers goods without inventing or debiting money',()=>{
  const {economy}=fixture({cities:[{id:'a',ownerId:'teal',x:0,industry:'lumber'},{id:'b',ownerId:'teal',x:100,industry:'farm'}]});
  // The second town requires a paid choice, using actual carried timber.
  economy.update(180);const state=economy.snapshot();assert.ok(state.stats.deliveries>0);assert.equal(state.stats.tradeValue,0);
  assert.equal(state.owners[0].gold,12+state.stats.currencyMinted);assert.equal(state.escrow,0);
});

test('import demand and warehouse caps bound trading; no import/export circulation earns money',()=>{
  const {economy}=fixture({cities:[{id:'a',ownerId:'teal',x:0,industry:'farm'},{id:'b',ownerId:'coral',x:100,industry:'farm'}]});
  economy.update(900);const state=economy.snapshot();assert.equal(state.stats.deliveries,0);
  for(const city of state.cities)for(const value of Object.values(city.stock))assert.ok(value<=city.capacity);
  assert.equal(state.owners.reduce((sum,owner)=>sum+owner.gold,0),24+state.stats.currencyMinted);
});

test('city merging carries stocks forward without establishment grants or duplicate production',()=>{
  const {economy,games}=fixture({cities:[{id:'a',ownerId:'teal',x:0},{id:'b',ownerId:'teal',x:8}],connected:false});
  economy.update(40);assert.equal(economy.cities.length,2);const before=economy.cities.reduce((sum,city)=>sum+city.stock.timber,0);
  const game=games[0];game.cities=[{id:'merged',ownerId:'teal',x:4,z:0,level:2,houseCount:6,houseIds:game.houses.map(home=>home.id)}];
  game.houses.forEach(home=>home.cityId='merged');game.revision++;
  assert.equal(economy.cities.length,1);assert.equal(economy.city('merged').stock.timber,before);assert.equal(economy.city('a').id,'merged');
  economy.update(20);assert.equal(economy.city('merged').stock.timber,before+8);
});

test('adding a branch while a train is moving preserves its trip and old-interval safety',()=>{
  const {economy,infrastructure}=fixture();economy.update(25);const before=economy.trains.find(train=>train.active);
  infrastructure.revision++;economy.update(1);const after=economy.trains.find(train=>train.active);
  assert.equal(after.id,before.id);assert.equal(after.pose.x,before.pose.x-5);assert.ok(economy.snapshot().locks>0);
  economy.update(150);assert.ok(economy.snapshot().stats.deliveries>=2);
});

test('tools saved for growth survive pulses and backhaul cannot monopolize every distant import',()=>{
  const result=simulateStrategy({strategy:'agrarian',scenario:'near'});
  assert.ok(result.firstGrowth>0&&result.firstGrowth<900,`No growth after ${result.firstGrowth}`);
  assert.ok(result.houses>3);assert.ok(result.trades['artisan>player:tools']>=2);
});

test('food demand continues to increase beyond the final visual city level',()=>{
  const {economy}=fixture({cities:[{id:'a',ownerId:'teal',x:0,level:5,houseCount:18,industry:'farm'}],connected:false});
  assert.equal(economy.city('a').foodNeed,6);economy.update(40);
  assert.equal(economy.city('a').consumption.grain,6);assert.equal(economy.city('a').income,19);
});

test('departure and reversal at a terminal preserve full carriage spacing',()=>{
  const {economy}=fixture();economy.update(20);
  let train=economy.trains.find(train=>train.active);assert.equal(train.carPoses.length,2);
  assert.ok(Math.abs(Math.hypot(train.carPoses[0].x-train.carPoses[1].x,train.carPoses[0].z-train.carPoses[1].z)-2.6)<1e-8);
  const initialAngle=train.angle;economy.update(25);train=economy.trains.find(train=>train.active);
  assert.equal(train.state,'returning');assert.equal(train.backing,true);
  assert.ok(Math.cos(train.angle-initialAngle)>.9999,'engine reverses without visibly spinning');
  assert.ok(Math.abs(Math.hypot(train.carPoses[0].x-train.carPoses[1].x,train.carPoses[0].z-train.carPoses[1].z)-2.6)<1e-8);
});

test('manual depot deposits transfer real carried timber atomically without creating resources',()=>{
  const {economy,games}=fixture({connected:false});const before=totals(economy.snapshot());
  const result=economy.depositTimber('teal',{x:0,z:0},8);
  assert.equal(result.ok,true);assert.equal(result.amount,8);assert.equal(result.totalTimber,8);assert.equal(games[0].logs,4);
  assert.deepEqual(totals(economy.snapshot()),before);assert.equal(economy.snapshot().stats.timberDeposited,8);
  const frozen=economy.snapshot();
  for(const [point,amount] of [[{x:50,z:30},1],[{x:0,z:0},5],[{x:0,z:0},-1],[{x:0,z:0},1.5]])assert.equal(economy.depositTimber('teal',point,amount).ok,false);
  assert.deepEqual(economy.snapshot(),frozen);
});

test('deposits honor warehouse capacity and actual owned-home proximity',()=>{
  const {economy,games}=fixture({connected:false});games[0].logs=100;
  assert.equal(economy.depositTimber('teal',{x:12.1,z:0},1).code,'no-nearby-city');
  assert.equal(economy.depositTimber('teal',{x:11,z:0},36).ok,true);
  const before=games[0].logs;assert.equal(economy.depositTimber('teal',{x:0,z:0},1).code,'depot-full');assert.equal(games[0].logs,before);
});

test('workshops preserve enough timber and tools for the next home',()=>{
  const {economy}=fixture({cities:[{id:'a',ownerId:'teal',x:0,industry:'workshop'}],connected:false});
  assert.equal(economy.depositTimber('teal',{x:0,z:0},12).ok,true);economy.update(120);
  const city=economy.city('a');assert.equal(city.stock.timber,8);assert.ok(city.stock.tools>=2);
  assert.equal(economy.spendConstruction('teal',{x:0,z:0},{timber:8,tools:2}).ok,true);
  const snapshot=economy.snapshot(),stock=totals(snapshot);
  assert.equal(stock.timber,12-snapshot.stats.consumed.timber-snapshot.stats.construction.timber);
  assert.equal(stock.tools,snapshot.stats.produced.tools-snapshot.stats.consumed.tools-snapshot.stats.construction.tools);
});
