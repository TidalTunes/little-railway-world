import test from 'node:test';
import assert from 'node:assert/strict';
import {createDayCalendar} from '../src/day-cycle.js';
import {createLoopEconomy} from '../src/loop-economy.js';

test('a paused shared calendar freezes trains, payouts and upkeep without resuming historical events',()=>{
  const game={ownerId:'teal',population:6,logs:40,food:12,gold:0,spatialRevision:0,
    cities:[{id:'home',ownerId:'teal',x:0,z:0,level:2,houseCount:6}],
    spendLogs(amount){if(this.logs<amount)return{ok:false};this.logs-=amount;return{ok:true};},
    addLogs(amount){this.logs+=amount;return{ok:true};},addFood(amount){this.food+=amount;return{ok:true};},
    creditGold(amount){this.gold+=amount;return{ok:true};}};
  const world={gameplay:{economy:'loops',farmVillages:{ownerId:'gray',cities:[{id:'farm',ownerId:'gray',x:60,z:0,level:2,houseCount:6}]}}};
  const loop={id:'route',cityIds:['home','farm'],stationIds:['home-stop','farm-stop'],length:120,
    stops:[{cityId:'home',stationId:'home-stop',distance:0},{cityId:'farm',stationId:'farm-stop',distance:60}],pieces:[{lineId:'out'},{lineId:'back'}]};
  const economy=createLoopEconomy(world,{session:{player:game,bots:[],spatialRevision:0},railways:{revision:0,snapshot:()=>({revision:0})},
    networkFactory:()=>({loops:()=>[loop],sample:(_route,distance)=>({x:distance%120,y:0,z:0,angle:0,tangent:{x:1,y:0,z:0}})})});
  const calendar=createDayCalendar();assert.equal(economy.buyTrain('home','route','teal').ok,true);
  economy.update(59.5,{elapsedSeconds:calendar.read(59.5).elapsedSeconds});economy.drainEvents();
  calendar.setPaused(true,59.5);const before=economy.snapshot();
  for(const wall of [300,3600,86400]){
    economy.update(0,{elapsedSeconds:calendar.read(wall).elapsedSeconds});
    assert.deepEqual(economy.snapshot(),before);assert.deepEqual(economy.drainEvents(),[]);
  }
  calendar.setPaused(false,86400);
  economy.update(.25,{elapsedSeconds:calendar.read(86400.25).elapsedSeconds});assert.equal(economy.elapsed,59.75);
  assert.equal(economy.snapshot().stats.productionEvents,0);assert.deepEqual(economy.drainEvents(),[]);
  economy.update(.25,{elapsedSeconds:calendar.read(86400.5).elapsedSeconds});
  assert.equal(economy.elapsed,60);assert.equal(economy.snapshot().stats.upkeep.due,5);
  assert.deepEqual(economy.drainEvents().filter(event=>event.type==='production').map(event=>[event.time,event.ownerId,event.amount]),[[60,'gray',6],[60,'teal',1]]);
});
