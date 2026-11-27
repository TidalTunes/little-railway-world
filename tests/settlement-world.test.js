import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,worldSurface} from '../src/world-model.js';
import {biomeAt} from '../src/biomes.js';
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
  assert.deepEqual(world.gameplay,config.gameplay);
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
