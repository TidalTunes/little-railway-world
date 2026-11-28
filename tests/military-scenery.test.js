import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettlementWorld} from '../src/settlement-world.js';
import {generateWorld,generateWorldRegion} from '../src/world-model.js';
import {prepareMilitaryScenery,createMilitaryCollisionSource} from '../src/military-scenery.js';
import {streamedWoodSourceId} from '../src/harvestable-wood.js';

test('offscreen military scenery matches canonical detail even far from all homes',()=>{
  const world=generateWorld(createSettlementWorld(),{detail:'network'});
  const catalogue=prepareMilitaryScenery(world,generateWorldRegion);
  const homes=[world.gameplay.starterHouse,...world.gameplay.playerBots.map(bot=>bot.starterHouse)];
  const remote=catalogue.find(item=>item.kind==='tree'&&homes.every(home=>Math.hypot(item.x-home.x,item.z-home.z)>55));
  assert.ok(remote,'the catalogue includes trees beyond every starter catchment');
  const visible=generateWorldRegion(world,{x:remote.x,z:remote.z,size:192}).placements.find(item=>streamedWoodSourceId(item)===remote.id);
  assert.ok(visible);assert.deepEqual({...visible,id:streamedWoodSourceId(visible)},remote);
  assert.ok(catalogue.length>500&&catalogue.length<5000,'small CPU-only placement catalogue');
});

test('military colliders persist across camera streaming and invalidate for actual world changes',()=>{
  const tree={id:'tree:remote',kind:'tree',x:100,z:100},home={id:'home',kind:'house',x:0,z:0};
  const removed=new Set(),cleared=new Set(),session={spatialRevision:0,buildings:[home],shared:{removedTreeIds:removed,isSceneryRemoved:item=>cleared.has(item.id)}};
  const world={gameplay:{militaryScenery:[tree],guaranteedTrees:[tree]},placements:[],stations:[]};
  let extra=[],extraRevision=0;
  const get=createMilitaryCollisionSource(world,{session,getExtraPlacements:()=>extra,getExtraRevision:()=>extraRevision});
  const initial=get();assert.deepEqual(initial,[tree,home]);
  world.placements=[{id:'new-camera-region',kind:'tree',x:-100,z:-100}];
  assert.equal(get(),initial,'streaming a camera region cannot rebuild or change military bodies');
  removed.add(tree.id);session.spatialRevision++;assert.deepEqual(get(),[home]);
  const building={id:'new-home',kind:'house',x:3,z:3};session.buildings.push(building);session.spatialRevision++;
  assert.ok(get().includes(building));
  extra=[{id:'ore',kind:'rock',x:8,z:8}];extraRevision++;assert.ok(get().includes(extra[0]));
  cleared.add('ore');session.spatialRevision++;assert.ok(!get().some(item=>item.id==='ore'));
});

test('saved art worlds do not generate a combat scenery catalogue',()=>{
  const world={gameplay:{military:{enabled:false}}};
  assert.deepEqual(prepareMilitaryScenery(world,()=>assert.fail('must not generate')),[]);
  assert.equal(world.gameplay.militaryScenery,undefined);
});
