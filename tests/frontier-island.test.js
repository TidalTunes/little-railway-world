import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from '../src/polygon-ops.js';
import {createFrontierIsland} from '../src/frontier-island.js';
import {createIslandWorld} from '../src/island-world.js';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,worldSurface} from '../src/world-model.js';
import {biomeAt,fitsBiome} from '../src/biomes.js';

test('the new frontier expands area without baking scenery or changing the compact showcase',()=>{
  const old=createIslandWorld(),config=createFrontierIsland(),area=world=>world.bounds.width*world.bounds.depth;
  assert.equal(config.bounds.width/old.bounds.width,1.8);assert.equal(config.bounds.depth/old.bounds.depth,1.8);assert.ok(area(config)/area(old)>3.2);
  assert.equal(config.surface,undefined);assert.equal(config.camera.startInDetail,true);assert.equal(config.placements,undefined);assert.deepEqual(config.cities,[]);assert.deepEqual(config.connections,[]);
  assert.ok(JSON.stringify(config).length<70000,'the larger world remains small authoring data, not baked assets');
  const copy=structuredClone(config);copy.biomes.sites[0].x=999;copy.biomes.geography.ocean[0][0][0][0]=999;
  assert.deepEqual(createFrontierIsland(),config);assert.deepEqual(createIslandWorld(),old);assert.deepEqual(createSettlementWorld({map:'compact'}).biomes,old.biomes);
});

test('two lake shores, offshore islets, a mountain pass and distinct drylands are real terrain',()=>{
  const input=createSettlementWorld(),world=generateWorld(input,{detail:'network'}),geography=input.biomes.geography;
  assert.equal(geography.landInterior.length,4);assert.equal(geography.lakes.length,2);assert.equal(world.rivers.length,3);assert.equal(world.mountains.length,3);
  for(const region of ['ocean','lakes','lakeShore','oceanShore'])assert.deepEqual(clipping.intersection(geography.landInterior,geography[region]),[]);
  assert.equal(biomeAt(world,4,-38),'ocean');assert.equal(biomeAt(world,-148,-87),'ocean');
  for(const point of [[-247,0],[247,0],[0,192],[0,-192],[175,0]])assert.equal(biomeAt(world,...point),'ocean');
  for(const point of [[220,-113],[-222,118],[199,160]])assert.ok(fitsBiome(world,['forest','plains','farmland','desert'],...point,1));
  assert.deepEqual(worldSurface(world,-31,-124),{type:'ground',height:0},'the northern pass remains traversable');
  assert.equal(biomeAt(world,-82,-43),'forest');assert.equal(biomeAt(world,172,-55),'desert');assert.equal(biomeAt(world,-24,112),'farmland');
});

test('the larger map keeps six trading villages and every regional rival on a connected range-limited network',()=>{
  for(const seed of ['first-settlement-v1','another-world',19]){
    const world=generateWorld(createSettlementWorld({seed}),{detail:'network'}),{starterHouse,spawn,farmVillages,playerBots}=world.gameplay;
    assert.equal(farmVillages.cities.length,6);assert.equal(playerBots.length,3);assert.deepEqual(playerBots.map(bot=>bot.biome),['forest','desert','plains']);
    const sites=[starterHouse,...farmVillages.cities,...playerBots.map(bot=>bot.starterHouse)],seen=new Set([sites[0]]),queue=[sites[0]];
    for(const site of queue)for(const other of sites)if(!seen.has(other)&&Math.hypot(site.x-other.x,site.z-other.z)<140){seen.add(other);queue.push(other);}
    assert.equal(seen.size,sites.length,'no remote competitor or food village is stranded beyond railway range');
    for(const bot of playerBots)assert.ok(farmVillages.cities.some(city=>Math.hypot(city.x-bot.starterHouse.x,city.z-bot.starterHouse.z)<140));
    assert.ok(farmVillages.cities.filter(city=>Math.hypot(city.x-starterHouse.x,city.z-starterHouse.z)<140).length>=2,'the player begins with competing nearby trading choices');
    for(const position of [starterHouse,spawn,...playerBots.flatMap(bot=>[bot.starterHouse,bot.spawn])])assert.deepEqual(worldSurface(world,position.x,position.z),{type:'ground',height:0});
  }
});
