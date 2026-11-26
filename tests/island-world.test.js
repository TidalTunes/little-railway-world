import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from '../src/polygon-ops.js';
import {createIslandWorld} from '../src/island-world.js';
import {generateWorld,validateWorld} from '../src/world-model.js';
import {biomeAt,biomeDistance,fitsBiome} from '../src/biomes.js';
import {createNetworkTraffic,sampleNetworkPath} from '../src/network-traffic.js';

let model;
const island=()=>model??=generateWorld(createIslandWorld());

test('the island is a compact flat preset with independent, serializable authoring data',()=>{
  const config=createIslandWorld(),copy=structuredClone(config);
  assert.equal(config.surface,undefined);
  assert.ok(config.bounds.width*config.bounds.depth<70000);
  assert.equal(config.camera.startInDetail,true);
  assert.deepEqual(config,copy);
  assert.deepEqual(createIslandWorld(),config);
  copy.cities[0].x+=100;
  copy.biomes.geography.ocean[0][0][0][0]+=100;
  assert.deepEqual(createIslandWorld(),config,'callers can edit a preset without altering later launches');
  const reseeded=createIslandWorld({seed:'another-island-scenery'});
  for(const key of ['outline','mountains','rivers','cities','connections','biomes'])
    assert.deepEqual(reseeded[key],config[key],`changing scenery seed preserves authored ${key}`);
  assert.equal(createIslandWorld({trainCount:0}).traffic.trainCount,0);
  assert.throws(()=>createIslandWorld({trainCount:-1}),/Island trains/);
});

test('the island has a water border, separate offshore islets and a protected lake shore',()=>{
  const config=createIslandWorld(),world=island(),geography=config.biomes.geography;
  assert.equal(geography.landInterior.length,4,'main island and three islets');
  assert.deepEqual(clipping.intersection(geography.landInterior,geography.ocean),[]);
  assert.deepEqual(clipping.intersection(geography.landInterior,geography.lakes),[]);
  assert.deepEqual(clipping.intersection(geography.landInterior,geography.lakeShore),[]);
  assert.deepEqual(clipping.intersection(geography.landInterior,geography.oceanShore),[]);
  for(const [x,z] of [[-136,0],[136,0],[0,-106],[0,106],[100,3]])
    assert.equal(biomeAt(world,x,z),'ocean');
  assert.equal(biomeAt(world,0,-20),'ocean','the inland lake is actual water');
  for(const [x,z] of [[122,-64],[-123,65],[111,89]])
    assert.ok(fitsBiome(world,['forest','plains','desert','farmland'],x,z,1),'offshore islets carry real land');
  for(const city of world.cities)
    assert.ok(fitsBiome(world,['forest','plains','desert','farmland'],city.x,city.z,city.radius),`${city.id} fits wholly on dry land`);
});

test('the compact layout preserves legal railway curvature and purposeful bridge and tunnel crossings',()=>{
  const world=island();
  assert.deepEqual(validateWorld(world),[]);
  assert.ok(world.lines.some(line=>line.tunnels.some(tunnel=>tunnel.end-tunnel.start>15)));
  assert.ok(world.lines.some(line=>line.bridges.some(bridge=>bridge.end-bridge.start>5)));
  for(const line of world.lines){
    for(const segment of line.alignment.segments)if(segment.type==='arc')
      assert.ok(segment.radius>=world.minTurnRadius-1e-8);
    for(const point of line.points)
      assert.ok(biomeDistance(world,'ocean',point.x,point.z)<-2,'railway avoids invented sea causeways');
  }
  const types=new Set(world.placements.map(item=>item.kind));
  assert.ok(types.has('tree')&&types.has('farm')&&types.has('nature'));
});

test('the island fleet traverses its complete circuit without discontinuities or stranded trains',()=>{
  const world=island(),traffic=createNetworkTraffic(world);
  assert.equal(traffic.trains.length,12);
  assert.equal(traffic.paths.length,1);
  const path=traffic.paths[0];
  assert.equal(path.segments.length,world.lines.length);
  for(const segment of path.segments){
    const before=sampleNetworkPath(path,segment.start-1e-5),after=sampleNetworkPath(path,segment.start+1e-5);
    assert.ok(Math.hypot(before.x-after.x,before.z-after.z)<.001);
    assert.ok(before.tangent.x*after.tangent.x+before.tangent.z*after.tangent.z>.999999);
  }
  const start=traffic.trains.map(train=>train.distance);
  for(let step=0;step<120;step++)traffic.update(.2);
  for(const [index,train] of traffic.trains.entries()){
    assert.equal(train.active,true);
    const moved=(train.distance-start[index]+path.length)%path.length;
    assert.ok(moved>40,`${train.id} progresses through the island`);
  }
});
