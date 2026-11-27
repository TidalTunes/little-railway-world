import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,worldSurface} from '../src/world-model.js';
import {biomeAt} from '../src/biomes.js';
import {FARM_VILLAGE_OWNER} from '../src/farm-villages.js';
import {treeLogYield,SETTLEMENT} from '../src/settlement-game.js';

test('the settlement preserves the island geography with no authored railway or cities',()=>{
  const config=createSettlementWorld();
  assert.deepEqual(config.cities,[]);assert.deepEqual(config.connections,[]);
  assert.deepEqual(config.traffic,{trainCount:0,circuits:[]});
  assert.equal(config.surface,undefined);assert.ok(config.mountains.length);assert.ok(config.rivers.length);
  assert.equal(config.gameplay.starterHouse.ownerId,config.gameplay.ownerId);
  const copy=structuredClone(config);copy.gameplay.starterHouse.x=0;copy.gameplay.guaranteedTrees[0].x=0;
  assert.deepEqual(createSettlementWorld(),config,'each launch receives independent gameplay authoring data');
});

test('the starting home and first grove are dry, flat forest or field terrain',()=>{
  const config=createSettlementWorld(),world=generateWorld(config,{detail:'network'});
  assert.equal(world.cities.length,0);assert.equal(world.lines.length,0);
  const {farmVillages,playerBots,reservations,...compiledGameplay}=world.gameplay;
  const {reservations:authoredReservations,...authoredGameplay}=config.gameplay;
  assert.deepEqual({...compiledGameplay,guaranteedTrees:compiledGameplay.guaranteedTrees.filter(tree=>!tree.id.startsWith('bot:'))},authoredGameplay);
  assert.deepEqual(compiledGameplay.guaranteedTrees.filter(tree=>tree.id.startsWith('bot:')),playerBots.flatMap(bot=>bot.guaranteedTrees));
  assert.deepEqual(reservations.slice(0,authoredReservations.length),authoredReservations);
  assert.equal(farmVillages.cities.length,3);
  assert.equal(playerBots.length,3);
  for(const point of [config.gameplay.starterHouse,config.gameplay.spawn,...config.gameplay.guaranteedTrees]){
    assert.equal(worldSurface(world,point.x,point.z).type,'ground');
    assert.ok(['forest','plains','farmland'].includes(biomeAt(world,point.x,point.z)));
  }
  const house=config.gameplay.starterHouse;
  for(const dx of [-1.1,0,1.1])for(const dz of [-1.1,0,1.1])
    assert.deepEqual(worldSurface(world,house.x+dx,house.z+dz),{type:'ground',height:0});
});

test('every scenery seed offers a reachable first tree straight ahead and enough timber for a new home',()=>{
  for(const seed of ['first-settlement-v1','another-world',19]){
    const config=createSettlementWorld({seed}),{spawn,guaranteedTrees:trees}=config.gameplay,first=trees[0];
    assert.equal(first.x,spawn.x);assert.ok(first.z>spawn.z);
    assert.ok(Math.hypot(first.x-spawn.x,first.z-spawn.z)<SETTLEMENT.chopReach);
    assert.ok(trees.reduce((sum,tree)=>sum+treeLogYield(config.seed,tree),0)>=SETTLEMENT.houseCost*2);
    assert.equal(new Set(trees.map(tree=>tree.id)).size,trees.length);
    assert.ok(trees.every(tree=>Math.hypot(tree.x-spawn.x,tree.z-spawn.z)<9));
  }
});

test('default loop economy generates six-home food villages and distinct forest, desert and plains rivals',()=>{
  for(const seed of ['first-settlement-v1','another-world',19]){
    const authored=createSettlementWorld({seed}),world=generateWorld(authored,{detail:'network'});
    assert.equal(authored.gameplay.economy,'loops');assert.equal(authored.gameplay.version,3);
    const villages=world.gameplay.farmVillages,bots=world.gameplay.playerBots;
    assert.ok(villages.cities.length>=2);if(seed==='first-settlement-v1')assert.equal(villages.cities.length,3);assert.equal(villages.houses.length,villages.cities.length*6);
    for(const city of villages.cities){assert.equal(city.level,2);assert.equal(city.houseCount,6);assert.equal(city.houseIds.length,6);assert.equal(city.ownerId,FARM_VILLAGE_OWNER);}
    assert.deepEqual(bots.map(bot=>bot.biome),['forest','desert','plains']);
    assert.equal(new Set(bots.map(bot=>bot.ownerId)).size,3);
    for(const bot of bots){
      assert.equal(biomeAt(world,bot.starterHouse.x,bot.starterHouse.z),bot.biome);
      assert.deepEqual(worldSurface(world,bot.starterHouse.x,bot.starterHouse.z),{type:'ground',height:0});
      assert.equal(bot.guaranteedTrees.length,8);assert.equal(new Set(bot.guaranteedTrees.map(tree=>tree.id)).size,8);
      for(const tree of bot.guaranteedTrees){assert.equal(tree.kind,'tree');assert.ok(Math.hypot(tree.x-bot.starterHouse.x,tree.z-bot.starterHouse.z)<15);assert.deepEqual(worldSurface(world,tree.x,tree.z),{type:'ground',height:0});}
    }
    const repeated=generateWorld(createSettlementWorld({seed}),{detail:'network'});
    assert.deepEqual(repeated.gameplay.playerBots,bots);assert.deepEqual(repeated.gameplay.farmVillages,villages);
    const recompiled=generateWorld({...createSettlementWorld({seed}),gameplay:structuredClone(world.gameplay)},{detail:'network'});
    assert.deepEqual(recompiled.gameplay.playerBots,bots);assert.deepEqual(recompiled.gameplay.farmVillages,villages);assert.deepEqual(recompiled.gameplay.reservations,world.gameplay.reservations);
  }
});
