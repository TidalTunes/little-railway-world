import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateWorld,
  sampleLine,
  CLEARANCES,
  validateWorld,
} from '../src/world-model.js';
import { ASSET_BOUNDS } from '../src/assets.js';

// These helpers deliberately measure the produced geometry rather than using
// the planner's own collision helpers, so a shared mistake cannot pass a test.
function segmentDistance(point, a, b) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const squareLength = dx * dx + dz * dz;
  const t = squareLength === 0 ? 0 : Math.max(0, Math.min(1,
    ((point.x - a.x) * dx + (point.z - a.z) * dz) / squareLength));
  return Math.hypot(point.x - a.x - t * dx, point.z - a.z - t * dz);
}

function polylineDistance(point, points) {
  return points.slice(1).reduce((closest, end, index) =>
    Math.min(closest, segmentDistance(point, points[index], end)), Infinity);
}

function close(actual, expected, message, epsilon = 1e-6) {
  assert.ok(Math.abs(actual - expected) <= epsilon,
    `${message}: expected ${expected}, received ${actual}`);
}

function finitePoint(point, label) {
  for (const key of ['x', 'y', 'z']) {
    assert.ok(Number.isFinite(point[key]), `${label}.${key} must be finite`);
  }
}

function rotate([x, z], angle) {
  return [x * Math.cos(angle) - z * Math.sin(angle),
    x * Math.sin(angle) + z * Math.cos(angle)];
}

function assertLineGeometry(line) {
  assert.ok(line.points.length >= 2, `${line.id} has a usable route`);
  assert.equal(line.distances.length, line.points.length);
  close(line.distances[0], 0, `${line.id} starts at distance zero`);
  let measuredLength = 0;
  line.points.forEach((point, index) => {
    finitePoint(point, `${line.id} point ${index}`);
    if (index > 0) {
      const previous = line.points[index - 1];
      const segmentLength = Math.hypot(point.x - previous.x,
        point.y - previous.y, point.z - previous.z);
      assert.ok(segmentLength > 0, `${line.id} has no duplicate adjacent points`);
      measuredLength += segmentLength;
      close(line.distances[index], measuredLength, `${line.id} cumulative length`);
    }
  });
  close(line.length, measuredLength, `${line.id} total length`);
  for (const [distance, expected] of [[0, line.points[0]],
    [line.length, line.points.at(-1)]]) {
    const sampled = sampleLine(line, distance);
    for (const key of ['x', 'y', 'z']) {
      close(sampled[key], expected[key], `${line.id} endpoint ${key}`);
    }
  }
  for (let step = 0; step <= 20; step++) {
    const point = sampleLine(line, line.length * step / 20);
    finitePoint(point, `${line.id} sample ${step}`);
    finitePoint(point.tangent, `${line.id} tangent ${step}`);
    close(Math.hypot(point.tangent.x, point.tangent.y, point.tangent.z),
      1, `${line.id} unit tangent`);
    close(polylineDistance(point, line.points), 0,
      `${line.id} sampling stays on its rendered route`);
  }
  for (const [kind, intervals] of [['bridge', line.bridges], ['tunnel', line.tunnels]]) {
    let previousEnd = -Infinity;
    for (const interval of intervals) {
      assert.ok(interval.start >= 0 && interval.end <= line.length,
        `${line.id} ${kind} lies within the route`);
      assert.ok(interval.start < interval.end, `${line.id} ${kind} has positive length`);
      assert.ok(interval.start >= previousEnd,
        `${line.id} ${kind} spans are ordered and do not overlap`);
      previousEnd = interval.end;
      for (const [key, distance] of [['entry', interval.start], ['exit', interval.end]]) {
        finitePoint(interval[key], `${line.id} ${kind} ${key}`);
        const expected = sampleLine(line, distance);
        for (const axis of ['x', 'y', 'z']) {
          close(interval[key][axis], expected[axis], `${line.id} ${kind} ${key}.${axis}`);
        }
      }
      if (kind === 'tunnel') {
        assert.ok(interval.cutStart <= interval.start && interval.cutEnd >= interval.end,
          `${line.id} tunnel excavation includes both portals`);
      }
    }
  }
}

function assertConnected(world) {
  const cityIds = new Set(world.cities.map(city => city.id));
  assert.equal(cityIds.size, world.cities.length, 'city IDs are unique');
  const adjacency = new Map([...cityIds].map(id => [id, []]));
  const ids = new Set();
  for (const line of world.lines) {
    assert.ok(!ids.has(line.id), `line ID ${line.id} is unique`);
    ids.add(line.id);
    assert.ok(cityIds.has(line.from) && cityIds.has(line.to),
      `${line.id} connects existing cities`);
    adjacency.get(line.from).push(line.to);
    adjacency.get(line.to).push(line.from);
  }
  const visited = new Set();
  const queue = [world.cities[0].id];
  while (queue.length) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    queue.push(...adjacency.get(id));
  }
  assert.equal(visited.size, cityIds.size, 'all generated cities are connected');
}

function rectangleCorners({x, z, rotation}, halfLength, halfWidth) {
  return [[-halfLength, -halfWidth], [halfLength, -halfWidth],
    [halfLength, halfWidth], [-halfLength, halfWidth]].map(([localX, localZ]) => ({
      x: x + localX * Math.cos(rotation) + localZ * Math.sin(rotation),
      z: z - localX * Math.sin(rotation) + localZ * Math.cos(rotation),
    }));
}

function pointInsideRectangle(point, rectangle, halfLength, halfWidth) {
  const x = point.x - rectangle.x;
  const z = point.z - rectangle.z;
  const localX = x * Math.cos(rectangle.rotation) - z * Math.sin(rectangle.rotation);
  const localZ = x * Math.sin(rectangle.rotation) + z * Math.cos(rectangle.rotation);
  return Math.abs(localX) < halfLength && Math.abs(localZ) < halfWidth;
}

function cross(a, b, c) {
  return (b.x - a.x) * (c.z - a.z) - (b.z - a.z) * (c.x - a.x);
}

function segmentsIntersect(a, b, c, d) {
  return cross(a, b, c) * cross(a, b, d) < 0 &&
    cross(c, d, a) * cross(c, d, b) < 0;
}

function segmentPairDistance(a, b, c, d) {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(segmentDistance(a, c, d), segmentDistance(b, c, d),
    segmentDistance(c, a, b), segmentDistance(d, a, b));
}

function routeRectangleDistance(points, rectangle, halfLength, halfWidth) {
  const corners = rectangleCorners(rectangle, halfLength, halfWidth);
  if (points.some(point => pointInsideRectangle(point, rectangle, halfLength, halfWidth))) return 0;
  let closest = Infinity;
  for (let index = 1; index < points.length; index++) {
    for (let side = 0; side < 4; side++) {
      closest = Math.min(closest, segmentPairDistance(points[index - 1], points[index],
        corners[side], corners[(side + 1) % 4]));
    }
  }
  return closest;
}

function assertPlacementClearance(world) {
  const boundary = world.outline.map(([x, z]) => ({x, z}));
  boundary.push(boundary[0]);
  const names = {farm: 'farmPatch'};
  for (let i = 0; i < world.placements.length; i++) {
    const item = world.placements[i];
    const label = `seed ${world.seed} ${item.id} (${item.kind})`;
    finitePoint(item, label);
    assert.ok(Number.isFinite(item.radius) && item.radius > 0, `${label} has a footprint`);
    const bounds = ASSET_BOUNDS[names[item.kind] || item.kind];
    if (bounds) {
      const needed = (bounds.radius || Math.hypot(bounds.width / 2, bounds.depth / 2)) * (item.scale || 1);
      assert.ok(item.radius >= needed - 1e-6, `${label} reserves its complete rendered silhouette`);
    }
    close(item.y, 0, `${label} sits on the ground`);
    assert.ok(polylineDistance(item, boundary) >= item.radius + CLEARANCES.worldEdge - 1e-6,
      `${label} stays inside the island edge`);
    assert.ok(polylineDistance(item, world.river.points) >= item.radius + world.river.width / 2 + CLEARANCES.riverBank - 1e-6,
      `${label} stays off the river and its bank`);
    for (const line of world.lines) {
      assert.ok(polylineDistance(item, line.points) >= item.radius + CLEARANCES.track - 1e-6,
        `${label} leaves the complete train corridor clear on ${line.id}`);
    }
    for (const mountain of world.mountains) {
      assert.ok(Math.hypot(item.x - mountain.x, item.z - mountain.z) >=
        item.radius + mountain.radius + CLEARANCES.mountain - 1e-6,
      `${label} stays outside mountain geometry`);
    }
    for (const station of world.stations) {
      assert.ok(Math.hypot(item.x - station.x, item.z - station.z) >=
        item.radius + station.radius + CLEARANCES.objects - 1e-6,
      `${label} stays clear of ${station.id}`);
    }
    for (let j = 0; j < i; j++) {
      const other = world.placements[j];
      assert.ok(Math.hypot(item.x - other.x, item.z - other.z) >=
        item.radius + other.radius + CLEARANCES.objects - 1e-6,
      `${label} does not overlap ${other.id}`);
    }
  }
  for (let i = 0; i < world.stations.length; i++) {
    const station = world.stations[i];
    const halfLength = station.platform.length / 2;
    const halfWidth = station.platform.width / 2;
    finitePoint(station, station.id);
    for (const line of world.lines) {
      assert.ok(routeRectangleDistance(line.points, station, halfLength, halfWidth) >=
        CLEARANCES.trackHalfWidth + .25 - 1e-6,
      `${station.id} platform leaves all tracks clear, including ${line.id}`);
    }
    assert.ok(routeRectangleDistance(world.river.points, station, halfLength, halfWidth) >=
      world.river.width / 2 + CLEARANCES.riverBank - 1e-6,
    `${station.id} platform stays off the river bank`);
    for (let j = 0; j < i; j++) {
      const other = world.stations[j];
      assert.ok(Math.hypot(station.x - other.x, station.z - other.z) >=
        station.radius + other.radius + CLEARANCES.objects - 1e-6,
      `${station.id} is separate from ${other.id}`);
    }
  }
}

test('the same seed produces exactly the same world, while other seeds vary the layout', () => {
  const first = generateWorld({seed: 142});
  const repeated = generateWorld({seed: 142});
  assert.deepEqual(repeated, first);
  const changed = generateWorld({seed: 143});
  assert.notDeepEqual(changed.cities, first.cities, 'the seed changes city positions');
  assert.notDeepEqual(changed.placements, first.placements, 'the seed changes scenery positions');
});

test('36 seeded worlds have finite, connected routes and valid infrastructure intervals', () => {
  for (let seed = 0; seed < 36; seed++) {
    const world = generateWorld({seed});
    assertConnected(world);
    world.lines.forEach(assertLineGeometry);
    assertPlacementClearance(world);
    assert.deepEqual(validateWorld(world), [], `seed ${seed} validates`);
  }
});

test('oblique bridges clear the banks across the full width of the deck', () => {
  for (const angle of [.23, .6, 1.0, 1.3]) {
    const world = generateWorld({seed: 3, density: .1,
      cities: [{id: 'a', x: -42, z: -22}, {id: 'b', x: 42, z: 22}],
      river: {points: [rotate([0, -80], angle), rotate([0, 80], angle)], width: 5},
      mountains: [], connections: [{from: 'a', to: 'b'}]});
    const line = world.lines[0];
    assert.equal(line.bridges.length, 1);
    for (const distance of [line.bridges[0].start, line.bridges[0].end]) {
      const point = sampleLine(line, distance);
      for (const side of [-1, 1]) {
        const corner = {x: point.x - point.tangent.z * 1.21 * side,
          z: point.z + point.tangent.x * 1.21 * side};
        assert.ok(polylineDistance(corner, world.river.points) >= world.river.width / 2 + .8 - 1e-4,
          `bridge deck corner is beyond the entire bank at river angle ${angle}`);
      }
    }
  }
});

test('malformed world configurations fail explicitly instead of returning broken geometry', () => {
  const cities = [{id: 'a', x: -20, z: 12}, {id: 'b', x: 20, z: 12}];
  const invalid = [
    {bounds: {width: Infinity, depth: 60}},
    {bounds: {width: 20, depth: 20}},
    {cities: []},
    {cities: [{id: 'a', x: NaN, z: 0}, cities[1]]},
    {cities: [{...cities[0], radius: -1}, cities[1]]},
    {cities: [{...cities[0]}, {...cities[1], id: 'a'}]},
    {cities, connections: [{from: 'a', to: 'missing'}]},
    {cities, connections: [{from: 'a', to: 'a'}]},
    {cities, connections: [{from: 'a', to: 'b', points: [[NaN, 0]]}]},
    {cities, connections: [{id: 'same', from: 'a', to: 'b'}, {id: 'same', from: 'b', to: 'a'}]},
    {cities: [{id: 'a', x: 64.4, z: -4}, {id: 'b', x: 64.4, z: 4}],
      mountains: [], connections: [{from: 'a', to: 'b'}]},
    {river: {points: [[0, 0]]}},
    {river: {points: [[0, 0], [10, 10]], width: -1}},
    {mountains: [{x: 0, z: 0, radius: 0, height: 10}]},
    {mountains: [{x: 0, z: 0, radius: 10, height: Infinity}]},
    {outline: [[0, 0], [1, 1]]},
  ];
  for (const config of invalid) {
    assert.throws(() => generateWorld(config), TypeError, JSON.stringify(config));
  }
});

test('authored routes create bridges and tunnels at arbitrary world orientations', () => {
  for (const angle of [0, .31, Math.PI / 4, Math.PI / 2, 2.17]) {
    const [ax, az] = rotate([-40, 0], angle);
    const [bx, bz] = rotate([40, 0], angle);
    const [mountainX, mountainZ] = rotate([15, 0], angle);
    const world = generateWorld({
      seed: 61,
      bounds: {width: 140, depth: 120},
      cities: [{id: 'west', x: ax, z: az}, {id: 'east', x: bx, z: bz}],
      river: {points: [rotate([-13, -65], angle), rotate([-13, 65], angle)], width: 5},
      mountains: [{id: 'ridge', x: mountainX, z: mountainZ, radius: 8, height: 10}],
      connections: [{id: 'crossing', from: 'west', to: 'east', points: [[ax, az], [bx, bz]]}],
    });
    assert.equal(world.lines.length, 1);
    const line = world.lines[0];
    assertLineGeometry(line);
    assert.equal(line.bridges.length, 1, `rotation ${angle} crosses the river once`);
    assert.equal(line.tunnels.length, 1, `rotation ${angle} crosses the mountain once`);
    const bridge = line.bridges[0];
    const tunnel = line.tunnels[0];
    assert.equal(tunnel.mountainId, 'ridge');
    const bridgeMiddle = sampleLine(line, (bridge.start + bridge.end) / 2);
    const riverCenter = rotate([-13, 0], angle);
    assert.ok(Math.hypot(bridgeMiddle.x - riverCenter[0], bridgeMiddle.z - riverCenter[1]) < 1,
      'the bridge is centered on the actual river crossing');
    const tunnelMiddle = sampleLine(line, (tunnel.start + tunnel.end) / 2);
    assert.ok(Math.hypot(tunnelMiddle.x - mountainX, tunnelMiddle.z - mountainZ) < 1,
      'the tunnel is centered on the actual mountain crossing');
    assert.ok(bridge.end < tunnel.cutStart, 'separate terrain features receive separate structures');
    const first = line.points[0];
    const last = line.points.at(-1);
    close(Math.hypot(first.x - ax, first.z - az), 0, 'custom line starts at its first city');
    close(Math.hypot(last.x - bx, last.z - bz), 0, 'custom line ends at its second city');
  }
});

test('low mountain crossings are excavated even when there is too little cover for a tunnel', () => {
  const world = generateWorld({seed: 'cutting', density: .1,
    cities: [{id: 'a', x: -35, z: 6.5}, {id: 'b', x: 35, z: 6.5}],
    river: {points: [[-80, -25], [80, -25]], width: 4},
    mountains: [{id: 'low-crossing', x: 0, z: 0, radius: 8, height: 10}],
    connections: [{from: 'a', to: 'b'}]});
  const line = world.lines[0];
  assert.equal(line.tunnels.length, 0, 'a shallow cutting does not get a floating tunnel portal');
  assert.equal(line.cuts.length, 1, 'the shallow crossing still receives a physical rock cut');
  const cut = line.cuts[0];
  for (let distance = 0; distance <= line.length; distance += .1) {
    const p = sampleLine(line, distance);
    if (Math.hypot(p.x, p.z) < 8) {
      assert.ok(distance >= cut.start - 1e-5 && distance <= cut.end + 1e-5,
        'every route point inside the mountain is covered by excavation');
    }
  }
});

test('multiple mountain passages are ordered by route position regardless of input order', () => {
  const world = generateWorld({seed: 'two-tunnels', density: .1,
    cities: [{id: 'a', x: -40, z: 0}, {id: 'b', x: 40, z: 0}],
    river: {points: [[-80, -25], [80, -25]], width: 4},
    mountains: [{id: 'second', x: 14, z: 0, radius: 6, height: 10},
      {id: 'first', x: -14, z: 0, radius: 6, height: 10}],
    connections: [{from: 'a', to: 'b'}]});
  const line = world.lines[0];
  assertLineGeometry(line);
  assert.deepEqual(line.tunnels.map(t => t.mountainId), ['first', 'second']);
  assert.deepEqual(line.cuts.map(c => c.mountainId), ['first', 'second']);
});

test('city counts and bent authored layouts do not depend on the showcase arrangement', () => {
  for (const cityCount of [3, 5, 12, 20]) {
    const world = generateWorld({seed: `cities-${cityCount}`, cityCount, density: .2});
    assert.equal(world.cities.length, cityCount);
    assertConnected(world);
    world.lines.forEach(assertLineGeometry);
    assertPlacementClearance(world);
  }
  const world = generateWorld({seed: 'waypoints', density: .1,
    cities: [{id: 'a', x: -36, z: -20}, {id: 'b', x: 34, z: 22},
      {id: 'c', x: -33, z: 23}],
    mountains: [],
    river: {points: [[0, -60], [4, -15], [-5, 15], [0, 60]], width: 4},
    connections: [{from: 'a', to: 'b', points: [[-22, -16], [21, -13], [22, 17]]},
      {from: 'b', to: 'c', points: [[15, 28], [-8, 28]]}, {from: 'c', to: 'a'}]});
  assertConnected(world);
  world.lines.forEach(assertLineGeometry);
  assertPlacementClearance(world);
});
