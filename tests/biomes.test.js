import test from 'node:test';
import assert from 'node:assert/strict';
import clipping from 'polygon-clipping';
import { generateWorld } from '../src/world-model.js';
import { BIOME_TYPES, createBiomes, biomeAt, biomeDistance, fitsBiome } from '../src/biomes.js';

function areaOf(polygons) {
  const ringArea = ring => Math.abs(ring.reduce((sum, p, i) => {
    const q = ring[(i + 1) % ring.length];
    return sum + p[0] * q[1] - q[0] * p[1];
  }, 0) / 2);
  return polygons.reduce((sum, polygon) => sum + ringArea(polygon[0]) -
    polygon.slice(1).reduce((holes, ring) => holes + ringArea(ring), 0), 0);
}

function simpleWorld(seed = 'example') {
  return {seed, bounds: {width: 100, depth: 80},
    outline: [[-50, -40], [50, -40], [50, 40], [-50, 40]],
    cities: [{id: 'a', x: -20, z: 0, radius: 4}, {id: 'b', x: 20, z: 0, radius: 4}],
    lines: [{id: 'line', points: [{x: -20, y: .42, z: 0}, {x: 20, y: .42, z: 0}]}],
    mountains: [{id: 'mountain', x: -14, z: -28, radius: 6, height: 10}], stations: []};
}

function assertCoverage(world, biomes) {
  const pieces = biomes.regions.map(region => region.polygons);
  const all = clipping.union(...pieces, biomes.oceanShore);
  const island = [[world.outline]];
  assert.ok(areaOf(clipping.xor(all, island)) < 1e-3, 'biomes and shore cover the whole island without gaps');
  for (let i = 0; i < pieces.length; i++) {
    for (let j = 0; j < i; j++) {
      assert.ok(areaOf(clipping.intersection(pieces[i], pieces[j])) < 1e-3,
        `${biomes.regions[i].type} and ${biomes.regions[j].type} have no overlapping surface area`);
    }
    assert.ok(areaOf(clipping.intersection(pieces[i], biomes.oceanShore)) < 1e-3,
      'the reserved shore is separate from every biome');
  }
  assert.ok(areaOf(clipping.intersection(biomes.land, biomes.ocean)) < 1e-3);
  assert.ok(areaOf(clipping.intersection(biomes.land, biomes.oceanShore)) < 1e-3);
}

test('biome generation is deterministic and different seeds change broad regions', () => {
  const world = simpleWorld(91);
  const first = createBiomes(world);
  assert.deepEqual(createBiomes(world), first);
  const changed = createBiomes({...world, seed: 92});
  assert.notDeepEqual(changed.sites, first.sites);
  assert.notDeepEqual(changed.regions, first.regions);
  assertCoverage(world, first);
});

test('40 seeded showcase worlds contain six coherent biomes and keep ocean clear of infrastructure', () => {
  for (let seed = 0; seed < 40; seed++) {
    const world = generateWorld({seed, density: .1});
    const biomes = createBiomes(world);
    assert.deepEqual([...new Set(biomes.regions.map(region => region.type))].sort(), [...BIOME_TYPES].sort(),
      `seed ${seed} includes every biome`);
    assertCoverage(world, biomes);
    for (const region of biomes.regions) {
      const total = areaOf(region.polygons);
      assert.ok(total > 20, `seed ${seed} ${region.type} is a visible region`);
      if (!['mountain', 'ocean'].includes(region.type)) {
        const largest = Math.max(...region.polygons.map(polygon => areaOf([polygon])));
        assert.ok(largest / total > .9, `seed ${seed} ${region.type} is one coherent landscape`);
      }
    }
    for (const city of world.cities) {
      assert.ok(biomeDistance(biomes, 'ocean', city.x, city.z) < -city.radius - biomes.shoreWidth,
        `seed ${seed} ${city.id} stays entirely on land`);
    }
    for (const line of world.lines) for (const point of line.points) {
      assert.ok(biomeDistance(biomes, 'ocean', point.x, point.z) <= -biomes.shoreWidth - 1.45,
        `seed ${seed} the complete rail corridor stays inland`);
    }
    for (const mountain of world.mountains) {
      assert.ok(biomeDistance(biomes, 'ocean', mountain.x, mountain.z) < -mountain.radius - biomes.shoreWidth);
      assert.equal(biomeAt(biomes, mountain.x, mountain.z), 'mountain');
    }
  }
});

test('explicit Voronoi sites have exact shared boundaries and complete footprint checks', () => {
  const world = {...simpleWorld(), mountains: []};
  const biomes = createBiomes(world, {ocean: false, sites: [
    {id: 'woods', type: 'forest', x: -20, z: 0},
    {id: 'sand', type: 'desert', x: 20, z: 0},
  ]});
  assertCoverage(world, biomes);
  assert.equal(biomeAt(biomes, -10, 0), 'forest');
  assert.equal(biomeAt(biomes, 10, 0), 'desert');
  assert.equal(biomeAt(biomes, 60, 0), null);
  assert.ok(Math.abs(biomeDistance(biomes, 'forest', -10, 0) - 10) < 1e-6);
  assert.ok(Math.abs(biomeDistance(biomes, 'forest', 10, 0) + 10) < 1e-6);
  assert.equal(fitsBiome(biomes, 'forest', -.8, 0, 1), false, 'a canopy cannot spill into the desert');
  assert.equal(fitsBiome(biomes, 'forest', -1.1, 0, 1), true);
  assert.equal(fitsBiome(biomes, ['forest', 'desert'], 0, 0, 2), true,
    'allowed biome unions do not reserve artificial gaps between themselves');
  assert.equal(fitsBiome(biomes, ['forest', 'desert'], 49.5, 0, 1), false,
    'the complete footprint also respects the island edge');
  assert.equal(fitsBiome(biomes, 'farmland', 0, 0, 1), false);
});

test('a coastal ocean has a separate beach band and footprint clearance uses its actual edge', () => {
  const world = simpleWorld();
  const biomes = createBiomes(world, {ocean: {points: [[38, -10], [60, -10], [60, 10], [38, 10]]}});
  assertCoverage(world, biomes);
  assert.equal(biomeAt(biomes, 42, 0), 'ocean');
  assert.equal(biomeAt(biomes, 37.55, 0), 'shore');
  assert.ok(Math.abs(biomeDistance(biomes, 'ocean', 37.55, 0) + .45) < 1e-6);
  assert.equal(fitsBiome(biomes, ['farmland', 'forest', 'plains', 'desert'], 37, 0, .2), false,
    'an inland asset cannot hang over the sloped shore');
  assert.equal(fitsBiome(biomes, ['farmland', 'forest', 'plains', 'desert'], 36.5, 0, .4), true);
  assert.ok(biomes.ocean.some(polygon => polygon[0].some(point => point[0] === 50)),
    'the ocean connects to the island edge');
});

test('malformed biome sites and unsafe authored ocean boundaries fail explicitly', () => {
  const world = simpleWorld();
  const configs = [null, [], {sites: []}, {sites: [{type: 'invalid', x: 0, z: 0}]},
    {sites: [{type: 'forest', x: NaN, z: 0}]},
    {sites: [{type: 'forest', x: 100, z: 0}]},
    {sites: [{id: 'same', type: 'forest', x: -10, z: 0}, {id: 'same', type: 'desert', x: 10, z: 0}]},
    {sites: [{type: 'forest', x: 0, z: 0}, {type: 'desert', x: 0, z: 0}]},
    {ocean: {points: [[0, 0], [1, 1]]}},
    {ocean: {points: [[-2, -2], [2, -2], [2, 2], [-2, 2]]}},
    {ocean: {points: [[15, -15], [60, -15], [60, 15], [15, 15]]}},
  ];
  for (const config of configs) assert.throws(() => createBiomes(world, config), TypeError);
});
