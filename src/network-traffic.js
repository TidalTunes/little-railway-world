import { sampleLine } from './world-model.js';
import { createTraffic } from './traffic.js';

const SPACING = 2.64;
const HALF_LENGTH = 3.84;
const HALF_CAR = 1.20;
const HALF_WIDTH = .56;
const STEP = .05;
const modulo = (x, length) => ((x % length) + length) % length;
const key = (lineId, direction) => `${lineId}:${direction}`;

/** Arc length stays continuous through every city and around the closing seam. */
export function sampleNetworkPath(path, distance) {
  const s = path.closed ? modulo(distance, path.length) : Math.max(0, Math.min(path.length, distance));
  let segment = path.segments.at(-1);
  for (const candidate of path.segments) {
    if (s < candidate.start + candidate.length - 1e-9) { segment = candidate; break; }
  }
  const local = Math.max(0, Math.min(segment.length, s - segment.start));
  const p = sampleLine(segment.line, segment.direction > 0 ? local : segment.length - local);
  const tangent = { x: p.tangent.x * segment.direction, y: p.tangent.y * segment.direction,
    z: p.tangent.z * segment.direction };
  return { ...p, distance: s, tangent, heading:Math.atan2(tangent.z,tangent.x),
    curvature:Number.isFinite(p.curvature)?p.curvature*segment.direction:undefined,
    angle: Math.atan2(tangent.x, tangent.z), lineId: segment.lineId };
}

function makePath(states, index, closed = true) {
  let length = 0;
  const segments = states.map(state => {
    const segment = { line: state.line, lineId: state.line.id, direction: state.direction,
      start: length, length: state.line.length };
    length += segment.length;
    return segment;
  });
  return { id: `circuit-${index + 1}`, segments, length, closed };
}

function mainCircuits(world) {
  const lines = new Map(world.lines.map(line => [line.id, line]));
  const states = new Map(world.lines.flatMap(line => [1, -1].map(direction =>
    [key(line.id, direction), { line, direction, key: key(line.id, direction), next: [] }])));
  for (const transition of world.transitions ?? []) {
    const from = states.get(key(transition.fromLineId, transition.fromEnd === 'end' ? 1 : -1));
    const to = states.get(key(transition.toLineId, transition.toEnd === 'start' ? 1 : -1));
    if (!from || !to || from.line === to.line) continue;
    const a = sampleLine(from.line, from.direction > 0 ? from.line.length : 0);
    const b = sampleLine(to.line, to.direction > 0 ? 0 : to.line.length);
    const dot = (a.tangent.x * b.tangent.x + a.tangent.z * b.tangent.z) * from.direction * to.direction;
    if (Math.hypot(a.x - b.x, a.z - b.z) > 1e-4 || dot < .9999) continue;
    from.next.push(to);
  }
  // Select the broadest city circuit in each connected component. Sidings stay
  // visible but do not introduce competing, unnecessary train routes into it.
  const components = [], remaining = new Set(lines.keys());
  while (remaining.size) {
    const first = remaining.values().next().value, component = new Set([first]), queue = [first];
    remaining.delete(first);
    while (queue.length) {
      const id = queue.shift();
      for (const direction of [1, -1]) for (const next of states.get(key(id, direction)).next) {
        if (component.has(next.line.id)) continue;
        component.add(next.line.id); remaining.delete(next.line.id); queue.push(next.line.id);
      }
    }
    components.push(component);
  }
  const paths = [];
  for (const component of components) {
    let best = null, bestScore = -Infinity, work = 0;
    const starts = [...states.values()].filter(state => component.has(state.line.id));
    const rank = new Map([...component].map((id, index) => [id, index]));
    for (const start of starts) {
      const visit = (current, chain, used) => {
        if (++work > 30000) return;
        for (const next of current.next) {
          if (next.key === start.key && chain.length >= 2) {
            const path = makePath(chain, paths.length), cities = new Set();
            let area = 0, previous = sampleNetworkPath(path, 0);
            for (const state of chain) { cities.add(state.line.from); cities.add(state.line.to); }
            for (let distance = 2; distance <= path.length + 2; distance += 2) {
              const p = sampleNetworkPath(path, Math.min(distance, path.length));
              area += previous.x * p.z - p.x * previous.z; previous = p;
            }
            const score = cities.size * 1e7 + Math.abs(area) * 100 + path.length;
            if (score > bestScore) { best = path; bestScore = score; }
          } else if (!used.has(next.line.id) && rank.get(next.line.id) >= rank.get(start.line.id)) {
            used.add(next.line.id); chain.push(next); visit(next, chain, used); chain.pop(); used.delete(next.line.id);
          }
        }
      };
      visit(start, [start], new Set([start.line.id]));
    }
    if (best) paths.push(best);
  }
  return paths;
}

function conflictBlocks(paths) {
  const samples = [], byPath = new Map();
  for (const path of paths) {
    const count = Math.ceil(path.length / 1.2), list = [];
    for (let i = 0; i < count; i++) {
      const distance = i / count * path.length, p = sampleNetworkPath(path, distance);
      const sample = { index: samples.length, path, distance, x: p.x, z: p.z, spacing: path.length / count };
      samples.push(sample); list.push(sample);
    }
    byPath.set(path.id, list);
  }
  const parent = samples.map((_, i) => i), marked = new Set();
  const find = i => { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; };
  const union = (a, b) => { parent[find(a)] = find(b); marked.add(a); marked.add(b); };
  for (let i = 0; i < samples.length; i++) for (let j = 0; j < i; j++) {
    const a = samples[i], b = samples[j];
    if (a.path === b.path && Math.min(Math.abs(a.distance - b.distance),
      a.path.length - Math.abs(a.distance - b.distance)) < HALF_LENGTH * 2 + 4) continue;
    if (Math.hypot(a.x - b.x, a.z - b.z) < 2.8) union(i, j);
  }
  // Nearby conflict zones form one reservation, so a complete consist can wait
  // clear of it without holding the next crossing and causing circular waits.
  for (const [id, list] of byPath) {
    const selected = list.filter(sample => marked.has(sample.index));
    for (let i = 0; i < selected.length; i++) {
      const a = selected[i], b = selected[(i + 1) % selected.length];
      if (modulo(b.distance - a.distance, a.path.length) < HALF_LENGTH * 2 + 3) union(a.index, b.index);
    }
  }
  const groups = new Map();
  for (const index of marked) {
    const root = find(index);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(samples[index]);
  }
  return [...groups.values()].map((list, i) => {
    const zones = [];
    for (const path of paths) {
      const selected = list.filter(sample => sample.path === path).sort((a, b) => a.distance - b.distance);
      for (const sample of selected) {
        const previous = zones.at(-1), start = Math.max(0, sample.distance - sample.spacing),
          end = Math.min(path.length, sample.distance + sample.spacing);
        if (previous?.pathId === path.id && start <= previous.end + 1e-6) previous.end = end;
        else zones.push({ pathId: path.id, start, end });
      }
    }
    return { id: `network-block-${i + 1}`, owner: null, zones };
  });
}

function occupies(train, block, distance = train.distance) {
  return block.zones.some(zone => zone.pathId === train.path.id && [-1, 0, 1].some(period => {
    const center = distance + period * train.path.length;
    return center + train.halfLength + .2 >= zone.start && center - train.halfLength - .2 <= zone.end;
  }));
}

function carBoxes(train, distance) {
  return Array.from({ length: train.count }, (_, i) => {
    const p = sampleNetworkPath(train.path, distance + (i - (train.count - 1) / 2) * train.spacing);
    return { x: p.x, z: p.z, tx: p.tangent.x, tz: p.tangent.z };
  });
}

function overlap(a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  if (Math.hypot(dx, dz) > 2.7) return false;
  for (const [x, z] of [[a.tx, a.tz], [-a.tz, a.tx], [b.tx, b.tz], [-b.tz, b.tx]]) {
    const extent = box => HALF_CAR * Math.abs(x * box.tx + z * box.tz)
      + HALF_WIDTH * Math.abs(-x * box.tz + z * box.tx);
    if (Math.abs(dx * x + dz * z) >= extent(a) + extent(b) + .06) return false;
  }
  return true;
}

/** Continuous circuit traffic. The whole consist reserves conflicts before its
 * leading car arrives and releases only after its trailing car has cleared. */
export function createNetworkTraffic(world) {
  const paths = mainCircuits(world);
  if (!paths.length) {
    const fallback = createTraffic(world), lines = new Map(world.lines.map(line => [line.id, line]));
    for (const train of fallback.trains) {
      const line = lines.get(train.lineId);
      train.color = line.color; train.path = makePath([{ line, direction: 1 }], 0, false);
    }
    return { trains: fallback.trains, update: fallback.update, mode: 'shuttles', paths: [],
      get reservations() { return fallback.reservations; },
      sampleTrain: (train, offset = 0) => sampleNetworkPath(train.path, train.distance + offset) };
  }
  const trains = [];
  for (const path of paths) {
    const cities = new Set(path.segments.flatMap(segment => [segment.line.from, segment.line.to]));
    const count = Math.max(1, Math.min(cities.size, Math.floor(path.length / 18)));
    for (let i = 0; i < count; i++) trains.push({ id: `${path.id}-train-${i + 1}`, path,
      color: ['coral', 'teal', 'gold', 'blue'][i % 4], distance: i / count * path.length,
      count: 3, spacing: SPACING, halfLength: HALF_LENGTH, direction: 1,
      speed: 2.6, active: false, waiting: false });
  }
  const blocks = conflictBlocks(paths), byId = new Map(trains.map(train => [train.id, train]));
  const hasCollision = (train, distance) => {
    const candidate = carBoxes(train, distance);
    return trains.some(other => {
      if(other === train || !other.active)return false;
      const boxes=carBoxes(other,other.distance);
      return candidate.some(a=>boxes.some(b=>overlap(a,b)));
    });
  };
  function activate(train) {
    const occupied = blocks.filter(block => occupies(train, block));
    if (occupied.some(block => block.owner && block.owner !== train.id) || hasCollision(train, train.distance)) return;
    occupied.forEach(block => { block.owner = train.id; }); train.active = true;
  }
  trains.forEach(activate);
  function step(dt) {
    for (const block of blocks) if (block.owner && !occupies(byId.get(block.owner), block)) block.owner = null;
    for (const train of trains) {
      if (!train.active) activate(train);
      if (!train.active) { train.waiting = true; continue; }
      train.waiting = false;
      let advance = train.speed * dt;
      for (const other of trains) {
        if (other === train || !other.active || other.path !== train.path) continue;
        const gap = modulo(other.distance - train.distance, train.path.length) - train.halfLength - other.halfLength - .8;
        advance = Math.min(advance, Math.max(0, gap));
      }
      let desired = modulo(train.distance + advance, train.path.length);
      const relevant = blocks.filter(block => occupies(train, block) || occupies(train, block, desired));
      if (relevant.some(block => block.owner && block.owner !== train.id) || hasCollision(train, desired)) {
        desired = train.distance; train.waiting = true;
      } else for (const block of relevant) block.owner = train.id;
      train.distance = desired;
    }
  }
  return { mode: 'circuits', trains, paths,
    sampleTrain: (train, offset = 0) => sampleNetworkPath(train.path, train.distance + offset),
    get reservations() { return blocks.map(block => ({ id: block.id, trainId: block.owner, zones: block.zones })); },
    update(dt) {
      if (!Number.isFinite(dt) || dt < 0) throw new TypeError('Traffic time step must be finite and nonnegative');
      if (!dt) return;
      const steps = Math.ceil(dt / STEP);
      for (let i = 0; i < steps; i++) step(dt / steps);
    },
  };
}
