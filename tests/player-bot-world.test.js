import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementWorld} from '../src/settlement-world.js';
import {createIslandWorld} from '../src/island-world.js';
import {generateWorld,generateWorldRegion,worldSurface} from '../src/world-model.js';
import {createPlayerBotStarts,preparePlayerBotScenery,PLAYER_BOT_WORLD} from '../src/player-bot-world.js';
import {fitsBiome} from '../src/biomes.js';
import {treeLogYield} from '../src/settlement-game.js';

const network=seed=>generateWorld(createSettlementWorld({seed}),{detail:'network'});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);

test('three differently owned homesteads are deterministic and preserve the starter and gray villages',()=>{
  const world=network('first-settlement-v1'),again=network('first-settlement-v1'),bots=world.gameplay.playerBots;
  assert.equal(bots.length,3);
  assert.deepEqual(bots,again.gameplay.playerBots);
  assert.deepEqual(bots.map(bot=>bot.ownerId),['coral','gold','blue']);
  assert.equal(world.gameplay.starterHouse.ownerId,'teal');
  assert.equal(world.gameplay.farmVillages.cities.length,3);
  assert.equal(world.cities.length,0);assert.equal(world.lines.length,0);
  assert.equal(world.gameplay.reservations.filter(item=>item.id?.startsWith('bot:')).length,6,
    'only home footprints and doorsteps are cleared, never broad construction lots');
  assert.notDeepEqual(bots,network('another-world').gameplay.playerBots);
  const recompilation=generateWorld({...createSettlementWorld(),gameplay:structuredClone(world.gameplay)},{detail:'network'});
  assert.deepEqual(recompilation.gameplay.playerBots,bots);
  assert.deepEqual(recompilation.gameplay.reservations,world.gameplay.reservations);
});

test('every homestead has a flat expansion area, resource-rich catchment and safe ownership separation',()=>{
  for(const seed of ['first-settlement-v1','another-world',19]){
    const world=network(seed),bots=world.gameplay.playerBots,scenery=preparePlayerBotScenery(world,generateWorldRegion);
    assert.equal(bots.length,3);
    for(const [index,bot]of bots.entries()){
      const home=bot.starterHouse;
      assert.ok(home.id.startsWith(`${bot.id}:`));assert.equal(home.ownerId,bot.ownerId);
      assert.ok(distance(home,world.gameplay.starterHouse)>=PLAYER_BOT_WORLD.spacing);
      assert.ok(bots.slice(0,index).every(other=>distance(home,other.starterHouse)>=PLAYER_BOT_WORLD.spacing));
      assert.ok(fitsBiome(world,['forest','plains'],home.x,home.z,14));
      for(let angle=0;angle<Math.PI*2;angle+=Math.PI/8)
        assert.deepEqual(worldSurface(world,home.x+Math.sin(angle)*14,home.z+Math.cos(angle)*14),{type:'ground',height:0});
      assert.deepEqual(worldSurface(world,bot.spawn.x,bot.spawn.z),{type:'ground',height:0});
      assert.ok(world.gameplay.farmVillages.reservations.every(item=>distance(home,item)>=14+item.radius));
      const trees=scenery.filter(item=>item.kind==='tree'&&distance(item,home)<35);
      assert.ok(trees.reduce((sum,tree)=>sum+treeLogYield(world.seed,tree),0)>=220,
        `${seed} ${bot.id} has sufficient nearby real timber to pay for all fourteen additional homes`);
      for(const item of scenery){
        if(item.id?.startsWith('starter-tree'))continue;
        for(const reservation of world.gameplay.reservations.filter(item=>item.id?.startsWith(`${bot.id}:`)))
          assert.ok(distance(item,reservation)>=item.radius+reservation.radius-1e-8);
      }
    }
  }
});

test('offscreen scenery is an exact bounded CPU catalog of the renderer canonical regions',()=>{
  const world=network('first-settlement-v1'),before=structuredClone(world),calls=[];
  const catalog=preparePlayerBotScenery(world,(network,request)=>{calls.push(request);return generateWorldRegion(network,request);});
  assert.ok(catalog.length>200&&catalog.length<1000);
  assert.equal(world.gameplay.botScenery,catalog);
  assert.equal(calls.length,new Set(calls.map(({x,z})=>`${x}:${z}`)).size);
  assert.ok(calls.every(request=>request.size===192));
  const canonical=new Map(calls.flatMap(request=>generateWorldRegion(world,request).placements).map(item=>[item.id,item]));
  for(const item of catalog){
    assert.deepEqual(item,canonical.get(item.id));
    assert.ok(world.gameplay.playerBots.some(bot=>distance(bot.starterHouse,item)<=PLAYER_BOT_WORLD.sceneryRadius+item.radius));
    assert.equal(item.geometry,undefined);assert.equal(item.mesh,undefined);
  }
  assert.equal(new Set(catalog.map(item=>item.id)).size,catalog.length);
  assert.deepEqual({...world.gameplay,botScenery:undefined},{...before.gameplay,botScenery:undefined});
  assert.deepEqual(world.placements,[],'catalog preparation never installs or compiles render geometry');
});

test('bot starts can be disabled and do not affect the existing railway art presets',()=>{
  const config=createSettlementWorld();config.gameplay.playerBotCount=0;
  const world=generateWorld(config,{detail:'network'});
  assert.deepEqual(world.gameplay.playerBots,[]);
  assert.deepEqual(preparePlayerBotScenery(world,()=>{throw Error('should not generate detail');}),[]);
  assert.deepEqual(createPlayerBotStarts({...world,surface:{type:'sphere'}}),[]);
  const island=generateWorld(createIslandWorld(),{detail:'network'});
  assert.equal(island.gameplay,undefined);assert.deepEqual(createPlayerBotStarts(island),[]);
});
