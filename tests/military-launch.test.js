import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld} from '../src/world-model.js';
import {createSettlementSession} from '../src/settlement-session.js';
import {createSettlementEconomy} from '../src/settlement-economy.js';
import {createDayCalendar} from '../src/day-cycle.js';

function launch(definition=createSettlementWorld()){
  const world=generateWorld(definition,{detail:'network'}),session=createSettlementSession(world);
  const railways={revision:0,snapshot:()=>({revision:0,stations:[],connections:[],lines:[]})};
  const economy=createSettlementEconomy(world,{session,railways});
  const games=[session.player,...session.bots.map(entry=>entry.game)];
  for(const game of games)game.setEconomy({resourcesAt:point=>economy.resourcesAt(game.ownerId,point),
    spendConstruction:(point,cost)=>economy.spendConstruction(game.ownerId,point,cost),spendResources:amount=>economy.spendResources(game.ownerId,amount)});
  const calendar=createDayCalendar({elapsedSeconds:world.gameplay.startSeconds??0});
  function advance(wall){const state=calendar.read(wall);economy.update(0,{elapsedSeconds:state.elapsedSeconds});return state;}
  return{world,session,economy,games,calendar,advance};
}
function assertWallets(games,{resources,food,gold}){
  for(const game of games){const wallet=game.resourcesAt();assert.equal(wallet.resources,resources,`${game.ownerId} Resources`);assert.equal(wallet.food,food,`${game.ownerId} Food`);assert.equal(wallet.gold,gold,`${game.ownerId} Gold`);}
}

test('military launch gives the human and every player bot 100 of each resource at the same nighttime boundary',()=>{
  const {world,session,economy,games,calendar,advance}=launch();
  assert.equal(world.gameplay.military.enabled,true);assert.equal(session.bots.length,3);assert.equal(games.length,4);
  assertWallets(games,{resources:100,food:100,gold:100});
  const day=calendar.read(0),state=economy.snapshot();
  assert.equal(day.elapsedSeconds,300);assert.equal(day.phase,'night');assert.equal(day.night,1);
  assert.equal(state.time,300);assert.equal(state.clock.elapsedSeconds,day.elapsedSeconds);assert.equal(state.clock.dayPhase,day.phase);assert.equal(state.clock.secondsRemaining,360);
  assert.deepEqual(state.stats.produced,{resources:0,food:0});assert.equal(state.stats.productionEvents,0);
  assert.equal(state.owners.filter(owner=>!owner.neutral).length,4);
  for(const owner of state.owners.filter(owner=>!owner.neutral))assert.deepEqual({resources:owner.resources,food:owner.food,gold:owner.gold},{resources:100,food:100,gold:100});
  assert.ok(state.cities.some(city=>city.neutral),'real generated farm villages remain in the launch');
  for(const city of state.cities.filter(city=>city.neutral))assert.equal(city.stock.food,0,'night launch cannot grant villages a retroactive harvest');
  advance(0);assertWallets(games,{resources:100,food:100,gold:100});assert.deepEqual(economy.drainEvents(),[],'first frame does not pay the sunset boundary that predates launch');
});

test('starting at night skips elapsed production and first credits exactly one full daytime minute later',()=>{
  const {world,economy,games,advance}=launch();
  for(const wall of [.016,59.99,60,120,240,299.999,300,359.999]){
    const day=advance(wall);assert.equal(economy.elapsed,day.elapsedSeconds);assertWallets(games,{resources:100,food:100,gold:100});assert.equal(economy.snapshot().stats.productionEvents,0);
  }
  assert.equal(economy.snapshot().clock.dayPhase,'day');assert.ok(economy.snapshot().clock.secondsRemaining<.002);
  advance(360);assertWallets(games,{resources:101,food:100,gold:100});
  const events=economy.drainEvents();assert.ok(events.length>games.length);assert.ok(events.every(event=>event.type==='production'&&event.time===660));
  assert.equal(events.filter(event=>event.resource==='resources').length,games.length);
  const villagePopulation=world.gameplay.farmVillages.cities.reduce((sum,city)=>sum+city.houseCount,0);
  assert.deepEqual(economy.snapshot().stats.produced,{resources:games.length,food:villagePopulation});
  advance(600);assertWallets(games,{resources:105,food:100,gold:100});
  assert.deepEqual(economy.snapshot().stats.produced,{resources:games.length*5,food:villagePopulation*5});
  assert.equal(economy.snapshot().clock.dayPhase,'night');assert.ok(economy.drainEvents().every(event=>[720,780,840,900].includes(event.time)));
});

test('explicit non-military and serialized legacy starts retain 40 Resources, 12 Food, 50 Gold and daylight',()=>{
  const definition=createSettlementWorld({military:false});assert.equal(definition.gameplay.military,undefined);assert.equal(definition.gameplay.startSeconds,undefined);
  const restored=JSON.parse(JSON.stringify(definition));
  const {world,economy,games,calendar,advance}=launch(restored);
  assert.equal(world.gameplay.military,undefined);assert.equal(games.length,4);assertWallets(games,{resources:40,food:12,gold:50});
  assert.equal(calendar.read(0).phase,'day');assert.equal(calendar.read(0).night,0);assert.equal(economy.elapsed,0);assert.equal(economy.snapshot().clock.secondsRemaining,60);
  advance(59.999);assertWallets(games,{resources:40,food:12,gold:50});assert.deepEqual(economy.drainEvents(),[]);
  advance(60);assertWallets(games,{resources:41,food:12,gold:50});assert.ok(economy.drainEvents().every(event=>event.time===60));
});
