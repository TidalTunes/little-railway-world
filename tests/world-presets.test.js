import test from 'node:test';
import assert from 'node:assert/strict';
import {launchLayout,createLaunchWorld} from '../src/world-presets.js';
import {createIslandWorld} from '../src/island-world.js';
import {createSettlementWorld} from '../src/settlement-world.js';
import {createMatchWorld} from '../src/match-world.js';
import {createEarthWorld} from '../src/earth-world.js';
import {createStressWorld} from '../src/stress-world.js';

const parameters=query=>new URLSearchParams(query);
const baseUrl='https://example.test/little-railway-world/';

test('normal and seeded launches open a playable Earth match',async()=>{
  for(const query of ['', 'seed=game-design']){
    const params=parameters(query),input=await createLaunchWorld(params,baseUrl);
    assert.equal(launchLayout(params),'match');
    assert.deepEqual(input,createMatchWorld(query?{seed:'game-design'}:{}));
    assert.equal(input.surface.type,'sphere');
    assert.equal(input.camera.startInDetail,true);
    assert.equal(input.cities.length,0);assert.equal(input.traffic.trainCount,0);
    assert.equal(input.gameplay.starterHouse.kind,'house');
    assert.equal(input.gameplay.match.players.length,144);assert.equal(input.gameplay.match.teams.length,12);
  }
});

test('the original compact settlement remains available without changing its saved island geography',async()=>{
  const input=await createLaunchWorld(parameters('layout=settlement-compact&seed=quiet-home'),baseUrl);
  assert.deepEqual(input,createSettlementWorld({seed:'quiet-home',map:'compact'}));
  const old=createIslandWorld({seed:'quiet-home',trainCount:0});
  for(const key of ['bounds','outline','mountains','rivers','biomes'])assert.deepEqual(input[key],old[key]);
  assert.equal(input.gameplay.farmVillageCount,3);
});

test('explicit island links retain their authoring seed and an empty train fleet',async()=>{
  const input=await createLaunchWorld(parameters('layout=island&seed=quiet-island&trains=0&cities=256'),baseUrl);
  assert.deepEqual(input,createIslandWorld({seed:'quiet-island',trainCount:0}));
  assert.equal(input.traffic.trainCount,0);
});

test('saved Earth opens unchanged through its explicit preset link',async()=>{
  const input=await createLaunchWorld(parameters('layout=earth'),baseUrl);
  assert.deepEqual(input,createEarthWorld());
  assert.equal(input.surface.type,'sphere');
  assert.equal(input.surface.complete,true);
  assert.equal(input.cities.length,96);
  assert.equal(input.connections.length,96);
  assert.equal(input.traffic.trainCount,250);
  assert.equal(input.traffic.circuits.length,10);
  assert.deepEqual(await createLaunchWorld(parameters('layout=earth&seed=earth-variation&trains=0'),baseUrl),
    createEarthWorld({seed:'earth-variation',trainCount:0}));
});

test('classic city-count links and stress layouts keep their existing behavior',async()=>{
  assert.equal(launchLayout(parameters('cities=12')),'classic');
  assert.deepEqual(await createLaunchWorld(parameters('cities=12&seed=classic-copy'),baseUrl),
    {seed:'classic-copy',cityCount:12});
  assert.deepEqual(await createLaunchWorld(parameters('layout=unknown'),baseUrl),{seed:27,cityCount:8});
  assert.deepEqual(await createLaunchWorld(parameters('layout=stress'),baseUrl),
    createStressWorld({cities:256,trains:2048,seed:'continental-railway'}));
  assert.deepEqual(await createLaunchWorld(parameters('layout=stress&cities=16&trains=0&seed=small-stress'),baseUrl),
    createStressWorld({cities:16,trains:0,seed:'small-stress'}));
});

test('authored presets resolve relative to the deployment directory and accept a seed override',async t=>{
  const requests=[],authored={seed:'original',cities:[{id:'town'}],connections:[{id:'line'}]};
  t.mock.method(globalThis,'fetch',async url=>{
    requests.push(String(url));
    return {ok:true,json:async()=>structuredClone(authored)};
  });
  assert.deepEqual(await createLaunchWorld(parameters('layout=showcase&seed=art-review'),baseUrl),
    {...authored,seed:'art-review'});
  assert.deepEqual(await createLaunchWorld(parameters('layout=crossroads'),baseUrl),authored);
  assert.deepEqual(requests,[`${baseUrl}worlds/showcase.json`,`${baseUrl}worlds/crossroads.json`]);
  assert.equal(authored.seed,'original');
});

test('a failed authored preset request reports the loading failure',async t=>{
  let parsed=false;
  t.mock.method(globalThis,'fetch',async()=>({ok:false,json:async()=>{parsed=true;return {};}}));
  await assert.rejects(createLaunchWorld(parameters('layout=showcase'),baseUrl),
    /Could not load the authored world/);
  assert.equal(parsed,false);
});
