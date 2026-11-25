import test from 'node:test';
import assert from 'node:assert/strict';
import { createNetworkTraffic, sampleNetworkPath } from '../src/network-traffic.js';
import { generateWorld } from '../src/world-model.js';
import { sampleAlignmentPoints } from '../src/alignments.js';

function circleWorld(centers = [{ x: 0, z: 0 }]) {
  const lines = [], transitions = [], cities = [];
  for (const [component, center] of centers.entries()) {
    for (let i = 0; i < 4; i++) {
      const id = `${component}-${i}`, startAngle = i * Math.PI / 2, radius = 20;
      const start = { x: center.x + Math.cos(startAngle) * radius, y: .42,
        z: center.z + Math.sin(startAngle) * radius };
      const end = { x: center.x + Math.cos(startAngle + Math.PI / 2) * radius, y: .42,
        z: center.z + Math.sin(startAngle + Math.PI / 2) * radius };
      const length = radius * Math.PI / 2;
      const alignment = { length, minRadius: radius, segments: [{ type: 'arc', center, radius,
        startAngle, sweep: Math.PI / 2, start, end, length, startDistance: 0,
        endDistance: length, curvature: 1 / radius }] };
      lines.push({ id, from: id, to: `${component}-${(i + 1) % 4}`, alignment,
        ...sampleAlignmentPoints(alignment), stops: [{ distance: 7 }, { distance: length - 7 }] });
      cities.push({ id, ...start });
      transitions.push({ fromLineId: id, fromEnd: 'end', toLineId: `${component}-${(i + 1) % 4}`, toEnd: 'start' },
        { fromLineId: `${component}-${(i + 1) % 4}`, fromEnd: 'start', toLineId: id, toEnd: 'end' });
    }
  }
  return { lines, transitions, cities, junctions: [] };
}

function carRectangle(p) {
  return [[-1.20, -.56], [1.20, -.56], [1.20, .56], [-1.20, .56]].map(([along, across]) => ({
    x: p.x + p.tangent.x * along - p.tangent.z * across,
    z: p.z + p.tangent.z * along + p.tangent.x * across,
  }));
}

function overlap(a, b) {
  for (const polygon of [a, b]) for (let i = 0; i < 4; i++) {
    const p = polygon[i], q = polygon[(i + 1) % 4], x = p.z - q.z, z = q.x - p.x;
    const pa = a.map(p => p.x * x + p.z * z), pb = b.map(p => p.x * x + p.z * z);
    if (Math.max(...pa) <= Math.min(...pb) + 1e-8 || Math.max(...pb) <= Math.min(...pa) + 1e-8) return false;
  }
  return true;
}

function cars(traffic, train) {
  return Array.from({ length: train.count }, (_, i) => {
    const pose = traffic.sampleTrain(train, (i - (train.count - 1) / 2) * train.spacing);
    return { pose, rectangle: carRectangle(pose) };
  });
}

function assertClear(traffic) {
  const active = traffic.trains.filter(train => train.active).map(train => ({ train, cars: cars(traffic, train) }));
  for (let i = 0; i < active.length; i++) {
    for (let j = 0; j < i; j++) {
      for (const a of active[i].cars) for (const b of active[j].cars) {
        assert.ok(!overlap(a.rectangle, b.rectangle), `${active[i].train.id} and ${active[j].train.id} keep every carriage clear`);
      }
    }
    for (let j = 1; j < active[i].cars.length; j++) {
      const a = active[i].cars[j - 1], b = active[i].cars[j];
      assert.ok(!overlap(a.rectangle, b.rectangle), 'carriages of the same train never overlap around curves');
      assert.ok(Math.hypot(a.pose.x - b.pose.x, a.pose.z - b.pose.z) > 2.5,
        'carriage centres retain their physical coupling spacing');
    }
  }
}

test('default trains follow one continuous city circuit with seamless car poses at every connection', () => {
  const traffic = createNetworkTraffic(generateWorld({ density: 0 }));
  assert.equal(traffic.mode, 'circuits');
  assert.equal(traffic.trains.length, 8);
  const path = traffic.paths[0];
  assert.equal(path.segments.length, 8, 'the main loop serves all eight cities');
  for (const distance of [0, path.length, ...path.segments.map(segment => segment.start)]) {
    const before = sampleNetworkPath(path, distance - 1e-5), after = sampleNetworkPath(path, distance + 1e-5);
    assert.ok(Math.hypot(before.x - after.x, before.z - after.z) < 2.1e-5, 'no position jump at city or wrap');
    assert.ok(before.tangent.x * after.tangent.x + before.tangent.z * after.tangent.z > .999999,
      'travel direction is tangent connected');
  }
  for (let distance = 0; distance < path.length; distance += .4) {
    const p = sampleNetworkPath(path, distance);
    assert.ok(Math.abs(p.curvature) <= 1 / 8 + 1e-8, 'traffic preserves the authored minimum turn radius');
  }
  const train = traffic.trains[0];
  train.distance = path.length - .01;
  const before = cars(traffic, train).map(car => car.pose);
  traffic.update(.01);
  cars(traffic, train).forEach((car, i) => {
    assert.ok(Math.hypot(car.pose.x - before[i].x, car.pose.z - before[i].z) <= .027,
      'loop wrap never swaps car indices or teleports a carriage');
  });
});

test('a fleet completes repeated circuits with full carriage clearance and visits every city', () => {
  const traffic = createNetworkTraffic(generateWorld({ density: 0 }));
  const seen = new Map(traffic.trains.map(train => [train.id, new Set()]));
  for (let step = 0; step < 1200; step++) {
    traffic.update(.2);
    if (step % 4 === 0) assertClear(traffic);
    for (const train of traffic.trains) seen.get(train.id).add(traffic.sampleTrain(train).lineId);
  }
  for (const lines of seen.values()) assert.equal(lines.size, 8, 'each train traverses all city connections');
});

test('crossing circuits reserve conflicts before entry and let both fleets make progress', () => {
  const traffic = createNetworkTraffic(circleWorld([{ x: -12, z: 0 }, { x: 12, z: 0 }]));
  assert.equal(traffic.paths.length, 2);
  assert.ok(traffic.reservations.length > 0, 'physical crossings are found without authored junction metadata');
  const travelled = new Map(traffic.trains.map(train => [train.id, 0]));
  let waited = false;
  for (let step = 0; step < 1600; step++) {
    const before = traffic.trains.map(train => train.distance);
    traffic.update(.1);
    if (step % 2 === 0) assertClear(traffic);
    traffic.trains.forEach((train, i) => {
      const delta = (train.distance - before[i] + train.path.length) % train.path.length;
      travelled.set(train.id, travelled.get(train.id) + delta); waited ||= train.waiting;
    });
  }
  assert.ok(waited, 'one train yields before the crossing');
  for (const distance of travelled.values()) assert.ok(distance > 150, 'every train keeps progressing after yielding');
});

test('deterministic updates, pause and a graph without a circuit retain the common sampling API', () => {
  const a = createNetworkTraffic(circleWorld()), b = createNetworkTraffic(circleWorld());
  for (const dt of [.5, 1.2, 0, 6.8, 12]) { a.update(dt); b.update(dt); }
  assert.deepEqual(a.trains.map(t => t.distance), b.trains.map(t => t.distance));
  const before = a.trains.map(t => t.distance); a.update(0);
  assert.deepEqual(a.trains.map(t => t.distance), before);
  assert.throws(() => a.update(-1), TypeError); assert.throws(() => a.update(NaN), TypeError);
  const world = circleWorld(); world.transitions = [];
  const fallback = createNetworkTraffic(world);
  assert.equal(fallback.mode, 'shuttles');
  fallback.update(2);
  for (const train of fallback.trains) {
    assert.ok(Number.isFinite(fallback.sampleTrain(train, train.spacing).x));
  }
});

test('2048 trains use reusable exact car poses and retain headway on 256 city circuits', async () => {
  const {circuitWorld}=await import('./fixtures/circuit-world.js');
  const traffic=createNetworkTraffic(circuitWorld()),buffer=traffic.poseBuffer;
  assert.equal(traffic.trains.length,2048);
  assert.equal(traffic.trains.filter(train=>train.active).length,2048);
  assert.equal(buffer.length,2048*3*6);
  const first=traffic.trains[0],poses=first.carPoses,car=poses[0],tangent=car.tangent;
  const distances=traffic.trains.map(train=>train.distance);
  traffic.update(3.25);
  assert.equal(traffic.poseBuffer,buffer);assert.equal(first.carPoses,poses);assert.equal(poses[0],car);assert.equal(car.tangent,tangent);
  for(const [index,train] of traffic.trains.entries()){
    const travelled=(train.distance-distances[index]+train.path.length)%train.path.length;
    assert.ok(Math.abs(travelled-train.speed*3.25)<1e-8,'all trains advance without fleet-size-dependent stalls');
    for(let i=0;i<train.count;i++){
      const expected=traffic.sampleTrain(train,(i-(train.count-1)/2)*train.spacing),actual=train.carPoses[i],offset=(train.poseOffset+i)*6;
      assert.ok(Math.hypot(expected.x-actual.x,expected.z-actual.z)<1e-9);
      assert.ok(Math.hypot(buffer[offset]-actual.x,buffer[offset+2]-actual.z)<.001,'GPU poses preserve sub-millimetre accuracy');
      assert.equal(buffer[offset+4],1);assert.equal(buffer[offset+5],0);
    }
  }
  for(const path of traffic.paths){
    const sorted=path.trains.toSorted((a,b)=>a.distance-b.distance);
    for(let i=0;i<sorted.length;i++){
      const a=sorted[i],b=sorted[(i+1)%sorted.length],gap=(b.distance-a.distance+path.length)%path.length;
      assert.ok(gap>=a.halfLength+b.halfLength+.8-1e-8,'complete consists retain headway around the closing seam');
    }
  }
});

test('saturated crossing circuits cap admission safely and serve both queues fairly', async () => {
  const {circuitWorld}=await import('./fixtures/circuit-world.js');
  const traffic=createNetworkTraffic(circuitWorld({circuits:2,citiesPerCircuit:4,radius:20,trainCount:10000,overlap:true}));
  assert.equal(traffic.stats.requestedTrainCount,10000);
  assert.equal(traffic.trains.length,traffic.stats.capacity);
  assert.ok(traffic.trains.length<10000,'oversubscribing a small network cannot overlap trains');
  const travelled=new Float64Array(traffic.trains.length);
  for(let step=0;step<1200;step++){
    const before=traffic.trains.map(train=>train.distance),active=traffic.trains.map(train=>train.active);
    traffic.update(.1);
    if(step%12===0)assertClear(traffic);
    for(let i=0;i<traffic.trains.length;i++)if(active[i]){
      const train=traffic.trains[i];travelled[i]+=(train.distance-before[i]+train.path.length)%train.path.length;
    }
  }
  assert.ok(traffic.trains.every(train=>train.active),'queued trains enter real free headways');
  assert.ok(Math.min(...travelled)>100,'neither dense fleet can starve the other at a crossing');
});

test('explicit fleets validate circuit topology and support empty fleets and output poses', async () => {
  const {circuitWorld}=await import('./fixtures/circuit-world.js');
  const input=circuitWorld({circuits:1,trainCount:0}),empty=createNetworkTraffic(input);
  assert.equal(empty.trains.length,0);assert.equal(empty.poseBuffer.length,0);empty.update(1);
  for(const bad of [-1,2.5,NaN,100001]){
    input.traffic.trainCount=bad;assert.throws(()=>createNetworkTraffic(input),/trainCount/);
  }
  input.traffic.trainCount=1;
  const traffic=createNetworkTraffic(input),out={tangent:{x:0,y:0,z:0}};
  assert.equal(traffic.sampleTrain(traffic.trains[0],0,out),out);
  assert.deepEqual(out,traffic.sampleTrain(traffic.trains[0]));
  input.traffic.circuits[0].segments[1].direction=-1;
  assert.throws(()=>createNetworkTraffic(input),/continuous tangents/);
  input.traffic.circuits[0].segments[0].lineId='missing';
  assert.throws(()=>createNetworkTraffic(input),/invalid line/);
});


test('zero fleets and over-capacity requests also preserve safe shuttle fallback semantics',async()=>{
  const {circuitWorld}=await import('./fixtures/circuit-world.js');
  const input=circuitWorld({circuits:1,trainCount:0});input.traffic.circuits=[];input.transitions=[];
  const empty=createNetworkTraffic(input);assert.equal(empty.mode,'shuttles');assert.equal(empty.trains.length,0);
  assert.equal(empty.poseBuffer.length,0);assert.equal(empty.stats.capacity,8);empty.update(2);
  input.traffic.trainCount=100;
  const full=createNetworkTraffic(input);assert.equal(full.trains.length,8);assert.equal(full.stats.requestedTrainCount,100);
  assert.equal(full.stats.capacity,8);full.update(2);assertClear(full);
  const tiny=createNetworkTraffic(circuitWorld({circuits:1,radius:1,trainCount:2}));
  assert.equal(tiny.stats.capacity,0);assert.equal(tiny.trains.length,0,'a circuit shorter than one safe headway cannot spawn an overlapping consist');tiny.update(1);
});
