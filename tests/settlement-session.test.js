import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementSession} from '../src/settlement-session.js';

const flat=()=>({type:'ground',height:0});
const home=(id,ownerId,x)=>({id,ownerId,kind:'house',x,y:0,z:0,rotation:0,scale:1,variant:0});
const world=()=>({seed:'shared-settlers',gameplay:{ownerId:'teal',starterHouse:home('home-1','teal',0),
  playerBots:[{id:'bot:coral',ownerId:'coral',starterHouse:home('bot:coral:home-1','coral',18),spawn:{x:18,z:3}}]}});
const tree=(id,x=40)=>({id,kind:'tree',x,y:0,z:10,variant:'round',scale:1});
function earn(game,prefix){for(let i=0;i<12;i++)assert.ok(game.chop(tree(`${prefix}-${i}`)).ok);}

test('a shared tree can only reward one owner, including stale simultaneous targets',()=>{
  const session=createSettlementSession(world(),{surfaceAt:flat}),bot=session.bots[0].game,item=tree('contested');
  const result=bot.chop(item);assert.ok(result.ok);assert.ok(result.logs>=2&&result.logs<=4);
  assert.equal(session.player.chop(structuredClone(item)).code,'already-chopped');
  assert.equal(session.player.logs,0);assert.equal(bot.logs,result.logs);
  assert.ok(session.player.isTreeRemoved(item));assert.ok(session.shared.removedTreeIds.has(item.id));
  assert.equal(session.revision,1);
});

test('foreign buildings block construction even without their scenery loaded',()=>{
  const session=createSettlementSession(world(),{surfaceAt:flat}),bot=session.bots[0].game;
  earn(bot,'bot');earn(session.player,'player');
  assert.equal(session.player.evaluateBuild({x:18,z:0}).code,'house-blocked');
  assert.equal(bot.evaluateBuild({x:0,z:0}).code,'house-blocked');
  const first=bot.build({x:23,z:0});assert.ok(first.ok);
  assert.equal(first.house.id,'bot:coral:home-2');
  assert.equal(session.player.evaluateBuild({x:23,z:0}).code,'house-blocked');
  assert.equal(new Set(session.buildings.map(item=>item.id)).size,session.buildings.length);
});

test('city membership and income never cross player ownership',()=>{
  const session=createSettlementSession(world(),{surfaceAt:flat}),bot=session.bots[0].game;
  earn(bot,'bot');assert.ok(bot.build({x:23,z:0}).ok);assert.ok(bot.build({x:18,z:5}).ok);
  assert.equal(bot.cities[0].level,1);assert.equal(bot.settleIncome(1).amount,3);
  assert.equal(session.player.settleIncome(1).amount,0);assert.equal(session.player.gold,0);
  assert.equal(session.player.houses.length,1);assert.equal(session.player.cities.length,0);
  assert.ok(session.paths.length);const path=session.paths[0],point=path.points[Math.floor(path.points.length/2)];
  assert.ok(['path-blocked','house-blocked'].includes(session.player.evaluateBuild(point).code));
});

test('construction protects another traveller while keeping session state independent',()=>{
  const session=createSettlementSession(world(),{surfaceAt:flat,getActors:()=>[{x:5,z:5}]}),fresh=createSettlementSession(world(),{surfaceAt:flat});
  earn(session.player,'player');assert.equal(session.player.evaluateBuild({x:5,z:5}).code,'player-blocked');
  assert.equal(fresh.revision,0);assert.equal(fresh.player.logs,0);assert.equal(fresh.shared.removedTreeIds.size,0);
});
