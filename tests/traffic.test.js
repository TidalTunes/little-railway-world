import test from 'node:test';
import assert from 'node:assert/strict';
import { createTraffic } from '../src/traffic.js';
import { generateWorld, sampleLine } from '../src/world-model.js';

function line(id, a, b) {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return {id, points: [{x: a[0], y: .42, z: a[1]}, {x: b[0], y: .42, z: b[1]}],
    distances: [0, length], length, stops: [{distance: 7}, {distance: length - 7}]};
}

function crossingWorld(angle = Math.PI / 2) {
  const a = line('horizontal', [-32, 0], [32, 0]);
  const b = line('crossing', [-32 * Math.cos(angle), -32 * Math.sin(angle)],
    [32 * Math.cos(angle), 32 * Math.sin(angle)]);
  return {lines: [a, b], junctions: [{id: 'crossing', x: 0, z: 0,
    lines: [{lineId: a.id, distance: 32}, {lineId: b.id, distance: 32}]}]};
}

function trainPolygon(world, train) {
  const route = world.lines.find(route => route.id === train.lineId);
  const point = sampleLine(route, train.distance);
  return [[-train.halfLength, -.56], [train.halfLength, -.56],
    [train.halfLength, .56], [-train.halfLength, .56]].map(([along, across]) => ({
      x: point.x + point.tangent.x * along - point.tangent.z * across,
      z: point.z + point.tangent.z * along + point.tangent.x * across,
    }));
}

function rectanglesOverlap(a, b) {
  for (const polygon of [a, b]) {
    for (let i = 0; i < polygon.length; i++) {
      const p = polygon[i];
      const q = polygon[(i + 1) % polygon.length];
      const normal = {x: p.z - q.z, z: q.x - p.x};
      const projections = [a, b].map(points => points.map(point => point.x * normal.x + point.z * normal.z));
      if (Math.max(...projections[0]) <= Math.min(...projections[1]) + 1e-8 ||
          Math.max(...projections[1]) <= Math.min(...projections[0]) + 1e-8) return false;
    }
  }
  return true;
}

function simulateAndInspect(world, seconds = 120) {
  const traffic = createTraffic(world);
  const seen = new Map(traffic.trains.map(train => [train.id, {
    min: train.distance, max: train.distance, waiting: false, directions: new Set(),
  }]));
  for (let step = 0; step < seconds * 20; step++) {
    traffic.update(.05);
    for (const train of traffic.trains) {
      const history = seen.get(train.id);
      history.min = Math.min(history.min, train.distance);
      history.max = Math.max(history.max, train.distance);
      history.waiting ||= train.waiting;
      history.directions.add(train.direction);
      assert.ok(Number.isFinite(train.distance));
      assert.ok(train.distance >= train.start - 1e-8 && train.distance <= train.end + 1e-8,
        `${train.id} stays between its station stops`);
    }
    const active = traffic.trains.filter(train => train.active);
    for (let i = 0; i < active.length; i++) {
      for (let j = 0; j < i; j++) {
        assert.ok(!rectanglesOverlap(trainPolygon(world, active[i]), trainPolygon(world, active[j])),
          `${active[i].id} and ${active[j].id} never overlap at step ${step}`);
      }
    }
  }
  return {traffic, seen};
}

test('crossing reservations keep complete trains apart and let both shuttle in both directions', () => {
  for (const angle of [Math.PI / 2, .67, .24]) {
    const world = crossingWorld(angle);
    const {seen} = simulateAndInspect(world);
    for (const [id, history] of seen) {
      assert.ok(history.max - history.min > 40, `${id} makes progress at angle ${angle}`);
      assert.equal(history.directions.size, 2, `${id} returns through the crossing`);
    }
    assert.ok([...seen.values()].some(history => history.waiting), 'one train yields at the crossing');
  }
});

test('nearby crossings merge their reservations so a waiting train cannot block the other crossing', () => {
  const world = {lines: [line('east-west', [-32, 0], [32, 0]),
    line('left', [-3, -32], [-3, 32]), line('right', [3, -32], [3, 32])],
  junctions: [{id: 'left-junction', x: -3, z: 0,
    lines: [{lineId: 'east-west', distance: 29}, {lineId: 'left', distance: 32}]},
  {id: 'right-junction', x: 3, z: 0,
    lines: [{lineId: 'east-west', distance: 35}, {lineId: 'right', distance: 32}]}]};
  const {traffic, seen} = simulateAndInspect(world, 180);
  assert.equal(traffic.reservations.length, 1);
  for (const [id, history] of seen) {
    assert.ok(history.max - history.min > 40, `${id} progresses through the crossing cluster`);
    assert.equal(history.directions.size, 2);
  }
});

test('terminal dwell lasts 2.4 seconds and reverses velocity without moving the centre', () => {
  const route = line('single', [-20, 0], [20, 0]);
  const traffic = createTraffic({lines: [route], junctions: []});
  const train = traffic.trains[0];
  while (train.direction === 1) traffic.update(.01);
  assert.equal(train.distance, train.end);
  assert.equal(train.dwell, 2.4);
  const stoppedAt = train.distance;
  traffic.update(2.3);
  assert.equal(train.distance, stoppedAt);
  traffic.update(.2);
  assert.ok(train.distance < stoppedAt);
  assert.equal(train.direction, -1);
});

test('pause and zero time leave movement, dwell and reservations unchanged', () => {
  const traffic = createTraffic(crossingWorld());
  traffic.update(7);
  const before = structuredClone({trains: traffic.trains, reservations: traffic.reservations});
  for (let i = 0; i < 20; i++) traffic.update(0);
  assert.deepEqual({trains: traffic.trains, reservations: traffic.reservations}, before);
  assert.throws(() => traffic.update(-1), TypeError);
  assert.throws(() => traffic.update(Infinity), TypeError);
});

test('a long frame still observes reservations and deterministic traffic remains reproducible', () => {
  const world = crossingWorld(.67);
  const first = createTraffic(world);
  const repeated = createTraffic(world);
  for (const duration of [1, 6.3, .02, 13.7, 0, 14.1]) {
    first.update(duration);
    repeated.update(duration);
    assert.deepEqual(first.trains, repeated.trains);
    const active = first.trains.filter(train => train.active);
    assert.ok(!rectanglesOverlap(trainPolygon(world, active[0]), trainPolygon(world, active[1])));
  }
});

test('generated route intersections connect directly to traffic reservations', () => {
  const world = generateWorld({seed: 'traffic', density: 0, mountains: [],
    river: {points: [[-90, -38], [90, -38]], width: 3},
    cities: [{id: 'west', x: -30, z: 0}, {id: 'east', x: 30, z: 0},
      {id: 'north', x: 0, z: -30}, {id: 'south', x: 0, z: 30}],
    connections: [{id: 'horizontal', from: 'west', to: 'east'},
      {id: 'vertical', from: 'north', to: 'south'}]});
  assert.equal(world.junctions.length, 1);
  const {seen} = simulateAndInspect(world, 90);
  assert.ok([...seen.values()].every(history => history.max - history.min > 35));
});

test('acute routes sharing a city yield before their full consists can overlap', () => {
  const a = {...line('upper', [-28, 0], [28, 5]), from: 'shared', to: 'upper'};
  const b = {...line('lower', [-28, 0], [28, -5]), from: 'shared', to: 'lower'};
  const world = {lines: [a, b], junctions: []};
  const initial = createTraffic(world);
  assert.equal(initial.trains.filter(train => train.active).length, 1,
    'the second train waits off scene until its starting footprint is clear');
  const {seen} = simulateAndInspect(world, 120);
  for (const history of seen.values()) {
    assert.ok(history.max - history.min > 35);
    assert.equal(history.directions.size, 2);
  }
});
