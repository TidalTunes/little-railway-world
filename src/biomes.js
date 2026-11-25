import { polylineTree, BoundsTree, pointBox, pointsBox } from './spatial-index.js';
import clipping from './polygon-ops.js';

export const BIOME_TYPES = Object.freeze(['farmland', 'forest', 'plains', 'desert', 'ocean', 'mountain']);
export const OCEAN_SHORE_WIDTH = .9;
const LAND_TYPES = BIOME_TYPES.slice(0, 4);
const EPS = 1e-7;
const footprintCache = new WeakMap();
const polygonIndexes = new WeakMap();
const ringIndexes = new WeakMap();
function ringIndex(ring){
  if(!ringIndexes.has(ring)){
    const edges=ring.map((b,i)=>{const a=ring[(i+ring.length-1)%ring.length];
      return{a,b,box:pointsBox([{x:a[0],z:a[1]},{x:b[0],z:b[1]}])};});
    ringIndexes.set(ring,new BoundsTree(edges,edge=>edge.box));
  }
  return ringIndexes.get(ring);
}

function polygonIndex(polygons){
  if(!polygonIndexes.has(polygons)){
    const edges=[],items=polygons.map(polygon=>{
      for(const ring of polygon)for(let i=1;i<ring.length;i++){
        const a=ring[i-1],b=ring[i];edges.push({a,b,box:pointsBox([{x:a[0],z:a[1]},{x:b[0],z:b[1]}])});
      }
      return{polygon,box:pointsBox(polygon[0].map(([x,z])=>({x,z})))};
    });
    polygonIndexes.set(polygons,{polygons:new BoundsTree(items,item=>item.box),edges:new BoundsTree(edges,item=>item.box)});
  }
  return polygonIndexes.get(polygons);
}

function randomFor(seed) {
  let state = 2166136261;
  for (const character of `biomes:${seed}`) state = Math.imul(state ^ character.charCodeAt(0), 16777619);
  return () => {
    state += 0x6D2B79F5;
    let value = Math.imul(state ^ state >>> 15, state | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function assert(condition, message) {
  if (!condition) throw new TypeError(`Invalid biomes: ${message}`);
}

function closeRing(points) {
  const ring = points.map(point => [Number(point[0]), Number(point[1])]);
  if (ring.length && (ring[0][0] !== ring.at(-1)[0] || ring[0][1] !== ring.at(-1)[1])) ring.push([...ring[0]]);
  return ring;
}

function stablePolygons(polygons) {
  // Neighboring Voronoi cells calculate the same shared edge independently.
  // Micrometre snapping removes floating-point slivers before later clipping.
  return polygons.map(polygon => polygon.map(ring => ring.map(([x, z]) => [
    Math.round(x * 1e6) / 1e6, Math.round(z * 1e6) / 1e6,
  ])));
}

function signedArea(ring) {
  let area = 0;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    area += a[0] * b[1] - b[0] * a[1];
  }
  return area / 2;
}

function areaOf(polygons) {
  return polygons.reduce((sum, polygon) => sum + Math.abs(signedArea(polygon[0])) -
    polygon.slice(1).reduce((holes, ring) => holes + Math.abs(signedArea(ring)), 0), 0);
}

function segmentDistance(x, z, a, b) {
  const dx = b[0] - a[0], dz = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz || 1)));
  return Math.hypot(x - a[0] - t * dx, z - a[1] - t * dz);
}

function inRing(ring, x, z) {
  let inside = false;
  const edges=ring.length>32?ringIndex(ring).query({minX:x-EPS,maxX:Infinity,minZ:z-EPS,maxZ:z+EPS})
    :ring.map((a,i)=>({a,b:ring[(i+ring.length-1)%ring.length]}));
  for (const {a,b} of edges) {
    if (segmentDistance(x, z, a, b) < EPS) return true;
    if ((a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside;
}

function inPolygons(polygons, x, z) {
  return polygonIndex(polygons).polygons.query(pointBox(x,z,EPS)).some(({polygon}) =>
    inRing(polygon[0], x, z) && !polygon.slice(1).some(hole => inRing(hole, x, z)));
}

function signedDistance(polygons, x, z) {
  const distance=polygonIndex(polygons).edges.nearest(x,z,edge=>segmentDistance(x,z,edge.a,edge.b));
  return inPolygons(polygons, x, z) ? distance : -distance;
}

function circle(x, z, radius, sides = 32) {
  return closeRing(Array.from({length: sides}, (_, i) => [
    x + Math.cos(i / sides * Math.PI * 2) * radius,
    z + Math.sin(i / sides * Math.PI * 2) * radius,
  ]));
}

function buffer(polygons, width) {
  if (!polygons.length) return [];
  const pieces = [polygons];
  for (const polygon of polygons) for (const ring of polygon) {
    for (let i = 1; i < ring.length; i++) {
      const a = ring[i - 1], b = ring[i], length = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (length < EPS) continue;
      const nx = -(b[1] - a[1]) / length * width, nz = (b[0] - a[0]) / length * width;
      pieces.push([[closeRing([[a[0] + nx, a[1] + nz], [b[0] + nx, b[1] + nz],
        [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]])]]);
      // Circumscribed discs keep the complete shore width at polygon corners.
      pieces.push([[circle(a[0], a[1], width / Math.cos(Math.PI / 12), 12)]]);
    }
  }
  return clipping.union(...pieces);
}

function distanceToRoutes(world,x,z){
  return polylineTree(world.lines??[]).nearest(x,z,s=>segmentDistance(x,z,[s.a.x,s.a.z],[s.b.x,s.b.z]));
}

function protectedCircle(world, x, z, radius) {
  const shore = OCEAN_SHORE_WIDTH + .05;
  if ((world.cities || []).some(city => Math.hypot(city.x - x, city.z - z) < radius + (city.radius || 0) + shore + 1)) return false;
  if ((world.stations || []).some(station => Math.hypot(station.x - x, station.z - z) < radius + station.radius + shore + .5)) return false;
  if ((world.mountains || []).some(mountain => Math.hypot(mountain.x - x, mountain.z - z) < radius + mountain.radius + shore + .5)) return false;
  return distanceToRoutes(world, x, z) >= radius + shore + 1.8;
}

function coastalBay(world, island, random) {
  const outline = world.outline, orientation = Math.sign(signedArea(outline));
  const scale = Math.min(world.bounds.width, world.bounds.depth);
  let best = null;
  for (const factor of [1, .84, .68, .52, .36]) {
    const radius = scale * .19 * factor;
    for (let i = 0; i < outline.length; i++) {
      const a = outline[i], b = outline[(i + 1) % outline.length];
      const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (length < EPS) continue;
      const nx = (b[1] - a[1]) / length * orientation, nz = -(b[0] - a[0]) / length * orientation;
      for (const fraction of [.2, .35, .5, .65, .8]) {
        const t = fraction + (random() - .5) * .035;
        const x = a[0] + (b[0] - a[0]) * t + nx * radius * .28;
        const z = a[1] + (b[1] - a[1]) * t + nz * radius * .28;
        if (!protectedCircle(world, x, z, radius)) continue;
        const polygons = clipping.intersection(island, [[circle(x, z, radius)]]);
        const score = areaOf(polygons);
        if (!best || score > best.score) best = {polygons, score};
      }
    }
    // Prefer one broad inlet over several small coastal fragments.
    if (best) break;
  }
  return best?.polygons || [];
}

function segmentsCross(a, b, c, d) {
  const cross = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  return cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0;
}

function routeDistanceToPolygons(line, polygons) {
  let distance = Infinity;
  for (let i = 1; i < line.points.length; i++) {
    const a = [line.points[i - 1].x, line.points[i - 1].z], b = [line.points[i].x, line.points[i].z];
    if (inPolygons(polygons, ...a) || inPolygons(polygons, ...b)) return 0;
    for (const polygon of polygons) for (const ring of polygon) for (let j = 1; j < ring.length; j++) {
      const c = ring[j - 1], d = ring[j];
      if (segmentsCross(a, b, c, d)) return 0;
      distance = Math.min(distance, segmentDistance(...a, c, d), segmentDistance(...b, c, d),
        segmentDistance(...c, a, b), segmentDistance(...d, a, b));
    }
  }
  return distance;
}

function explicitOcean(world, island, config) {
  assert(Array.isArray(config.points) && config.points.length >= 3 &&
    config.points.every(point => Array.isArray(point) && point.length >= 2 && point.every(Number.isFinite)),
  'ocean.points requires at least three finite [x,z] coordinates');
  const ring = closeRing(config.points);
  assert(Math.abs(signedArea(ring)) > EPS, 'ocean polygon must have positive area');
  const ocean = clipping.intersection(island, [[ring]]);
  assert(ocean.length > 0, 'ocean polygon must intersect the island');
  const boundary = closeRing(world.outline);
  assert(ocean.some(polygon => polygon[0].some(point => boundary.slice(1).some((b, i) =>
    segmentDistance(...point, boundary[i], b) < 1e-5))), 'ocean must connect to the coast');
  const shore = OCEAN_SHORE_WIDTH + .05;
  for (const city of world.cities || []) assert(signedDistance(ocean, city.x, city.z) <= -(city.radius || 0) - shore - 1,
    'ocean and shore must stay outside city footprints');
  for (const mountain of world.mountains || []) assert(signedDistance(ocean, mountain.x, mountain.z) <= -mountain.radius - shore - .5,
    'ocean and shore must stay outside mountain footprints');
  for (const station of world.stations || []) assert(signedDistance(ocean, station.x, station.z) <= -station.radius - shore - .5,
    'ocean and shore must stay outside station footprints');
  for (const line of world.lines || []) assert(routeDistanceToPolygons(line, ocean) >= shore + 1.8,
    'ocean and shore must stay outside complete railway corridors');
  return ocean;
}

function clipHalfPlane(polygon, nx, nz, limit) {
  const result = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i], b = polygon[(i + 1) % polygon.length];
    const da = a[0] * nx + a[1] * nz - limit, db = b[0] * nx + b[1] * nz - limit;
    if (da <= EPS) result.push(a);
    if ((da <= EPS) !== (db <= EPS)) {
      const t = da / (da - db);
      result.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return result;
}

function sitesFor(world, config, random) {
  if (config.sites !== undefined) {
    assert(Array.isArray(config.sites) && config.sites.length > 0, 'sites must contain at least one land biome');
    const sites = config.sites.map((site, index) => ({...site, id: String(site.id ?? `biome-${index + 1}`)}));
    assert(sites.every(site => LAND_TYPES.includes(site.type) && Number.isFinite(site.x) && Number.isFinite(site.z)),
      'sites need a farmland, forest, plains or desert type and finite x/z');
    assert(new Set(sites.map(site => site.id)).size === sites.length, 'site IDs must be unique');
    for (let i = 0; i < sites.length; i++) {
      assert(inRing(world.outline, sites[i].x, sites[i].z), 'sites must lie inside the island');
      for (let j = 0; j < i; j++) assert(Math.hypot(sites[i].x - sites[j].x, sites[i].z - sites[j].z) > EPS,
        'sites must have distinct positions');
    }
    return sites;
  }
  return [['farmland', -.24, .15], ['forest', -.26, -.24], ['plains', .06, .24], ['desert', .29, -.14]]
    .map(([type, x, z]) => ({id: `biome-${type}`, type,
      x: (x + (random() - .5) * .09) * world.bounds.width,
      z: (z + (random() - .5) * .09) * world.bounds.depth}));
}

/** A small set of broad, coherent regions. The ocean is a protected coastal
 * inlet; mountain regions use the exact authored mountain footprints. The
 * resulting polygons can be passed directly to polygon-clipping and Three.
 */
export function createBiomes(world, config = {}) {
  assert(config && typeof config === 'object' && !Array.isArray(config), 'configuration must be an object');
  assert(Array.isArray(world.outline) && world.outline.length >= 3, 'a valid world outline is required');
  const random = randomFor(world.seed), island = [[closeRing(world.outline)]];
  const sites = sitesFor(world, config, random);
  // Geographic presets supply a complete archipelago and an offline-buffered
  // shoreline. Cities and scenery clip against this coast, never reshape it.
  const geography=config.geography;
  const ocean = geography ? clipping.intersection(island,geography.ocean) : config.ocean === false ? [] : config.ocean === undefined
    ? coastalBay(world, island, random) : explicitOcean(world, island, config.ocean);
  const oceanAndShore = !geography&&ocean.length ? clipping.intersection(island, buffer(ocean, OCEAN_SHORE_WIDTH)) : [];
  const oceanShore = geography ? clipping.intersection(island,geography.oceanShore) : ocean.length ? clipping.difference(oceanAndShore, ocean) : [];
  const land = geography ? clipping.intersection(island,geography.landInterior) : oceanAndShore.length ? clipping.difference(island, oceanAndShore) : island;
  const footprints = (world.mountains || []).map(mountain => [[closeRing(mountain.range?.polygon??circle(mountain.x, mountain.z, mountain.radius, 48)),
    ...(mountain.range?.holes??[]).map(closeRing)]]);
  const mountains = footprints.length ? clipping.intersection(land, clipping.union(...footprints)) : [];
  const dryRegions = mountains.length ? clipping.difference(land, mountains) : land;
  const xs = world.outline.map(point => point[0]), zs = world.outline.map(point => point[1]);
  const bounding = [[Math.min(...xs) - 1, Math.min(...zs) - 1], [Math.max(...xs) + 1, Math.min(...zs) - 1],
    [Math.max(...xs) + 1, Math.max(...zs) + 1], [Math.min(...xs) - 1, Math.max(...zs) + 1]];
  const regions = [];
  for (const site of sites) {
    let cell = bounding;
    for (const other of sites) {
      if (other === site) continue;
      cell = clipHalfPlane(cell, other.x - site.x, other.z - site.z,
        (other.x * other.x + other.z * other.z - site.x * site.x - site.z * site.z) / 2);
      if (cell.length < 3) break;
    }
    const polygons = cell.length >= 3 ? clipping.intersection(dryRegions, [[closeRing(cell)]]) : [];
    if (polygons.length) regions.push({id: site.id, type: site.type, polygons});
  }
  if (mountains.length) regions.push({id: 'biome-mountain', type: 'mountain', polygons: mountains});
  if (ocean.length) regions.push({id: 'biome-ocean', type: 'ocean', polygons: ocean});
  // Lakes share the water biome while retaining separate source geometry.
  if(geography?.lakes?.length)regions.push({id:'biome-lakes',type:'ocean',polygons:geography.lakes});
  return {regions: regions.map(region => ({...region, polygons: stablePolygons(region.polygons)})),
    land: stablePolygons(land), ocean: stablePolygons(ocean), oceanShore: stablePolygons(oceanShore),
    lakeShore:stablePolygons(geography?.lakeShore??[]),
    shoreWidth: OCEAN_SHORE_WIDTH, sites};
}

function biomeModel(world) {
  return world.biomes || world;
}

function polygonsFor(world, types) {
  const model = biomeModel(world), selected = [...new Set(Array.isArray(types) ? types : [types])].sort();
  let cached = footprintCache.get(model);
  if (!cached) { cached = new Map(); footprintCache.set(model, cached); }
  const key = selected.join('|');
  if (!cached.has(key)) {
    const polygons = selected.flatMap(type => type === 'shore' ? [model.oceanShore,model.lakeShore] :
      model.regions.filter(region => region.type === type).map(region => region.polygons)).filter(value => value?.length);
    cached.set(key, polygons.length ? clipping.union(...polygons) : []);
  }
  return cached.get(key);
}

/** Returns one of the six biome types, 'shore', or null outside the island. */
export function biomeAt(world, x, z) {
  const model = biomeModel(world);
  for (const region of model.regions) if (inPolygons(region.polygons, x, z)) return region.type;
  return inPolygons(model.oceanShore, x, z)||inPolygons(model.lakeShore??[],x,z) ? 'shore' : null;
}

/** Positive inside the selected biome, negative outside; zero at its boundary. */
export function biomeDistance(world, type, x, z) {
  return signedDistance(polygonsFor(world, type), x, z);
}

/** Tests the complete circular footprint, including borders and shorelines. */
export function fitsBiome(world, types, x, z, radius = 0) {
  if (!Number.isFinite(radius) || radius < 0) return false;
  return signedDistance(polygonsFor(world, types), x, z) >= radius - EPS;
}
