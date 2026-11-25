import { sampleLine } from './world-model.js';

const SPACING = 2.64;
const CAR_HALF_LENGTH = 1.2;
const STOP_GAP = .14;
const CROSSING_WIDTH = 1.35;
const DWELL = 2.4;
const MAX_STEP = .05;

function mergeZones(a, b) {
  const zones = new Map(a.zones);
  for (const [lineId, zone] of b.zones) {
    const previous = zones.get(lineId);
    zones.set(lineId, previous
      ? {min: Math.min(previous.min, zone.min), max: Math.max(previous.max, zone.max)}
      : {...zone});
  }
  return {id: a.id, junctionIds: [...a.junctionIds, ...b.junctionIds], zones, owner: null};
}

function sharedApproaches(world, trainByLine) {
  const cities = new Map();
  for (const line of world.lines) {
    const train = trainByLine.get(line.id);
    if (!train) continue;
    for (const [cityId, distance, sign] of [[line.from, 0, 1], [line.to, line.length, -1]]) {
      if (cityId === undefined) continue;
      const point = sampleLine(line, distance);
      const branch = {lineId: line.id, distance, sign, train,
        x: point.tangent.x * sign, z: point.tangent.z * sign,
        closest: sign === 1 ? train.start : line.length - train.end};
      if (!cities.has(cityId)) cities.set(cityId, []);
      cities.get(cityId).push(branch);
    }
  }
  const junctions = [];
  for (const [cityId, branches] of cities) {
    for (let i = 0; i < branches.length; i++) {
      for (let j = i + 1; j < branches.length; j++) {
        const a = branches[i], b = branches[j];
        // Opposite approaches separate as the trains stop short of the city.
        if (a.x * b.x + a.z * b.z <= 0) continue;
        const sine = Math.abs(a.x * b.z - a.z * b.x);
        const radius = CROSSING_WIDTH / Math.max(sine, .01);
        if (a.closest - a.train.halfLength - STOP_GAP >= radius ||
            b.closest - b.train.halfLength - STOP_GAP >= radius) continue;
        junctions.push({id: `approach-${cityId}-${i}-${j}`, lines: [
          {lineId: a.lineId, distance: a.distance}, {lineId: b.lineId, distance: b.distance},
        ]});
      }
    }
  }
  return junctions;
}

function crossingGroups(world, trains) {
  const lines = new Map(world.lines.map(line => [line.id, line]));
  const trainByLine = new Map(trains.map(train => [train.lineId, train]));
  const groups = [...(world.junctions || []), ...sharedApproaches(world, trainByLine)].map(junction => {
    let radius = CROSSING_WIDTH;
    for (let i = 0; i < junction.lines.length; i++) {
      const a = junction.lines[i];
      const aLine = lines.get(a.lineId);
      if (!aLine) continue;
      const aDirection = sampleLine(aLine, a.distance).tangent;
      for (const b of junction.lines.slice(i + 1)) {
        const bLine = lines.get(b.lineId);
        if (!bLine) continue;
        const bDirection = sampleLine(bLine, b.distance).tangent;
        const sine = Math.abs(aDirection.x * bDirection.z - aDirection.z * bDirection.x);
        // Acute crossings occupy a longer section of each track than a right
        // angle crossing. Both complete vehicle widths must fit outside it.
        radius = Math.max(radius, CROSSING_WIDTH / Math.max(sine, .01));
      }
    }
    return {id: junction.id, junctionIds: [junction.id], owner: null,
      zones: new Map(junction.lines.filter(item => trainByLine.has(item.lineId))
        .map(item => [item.lineId, {min: item.distance - radius, max: item.distance + radius}]))};
  }).filter(group => group.zones.size > 1);

  // Merge crossings until a whole train can wait in every gap between them.
  // This avoids holding one junction while waiting for a second occupied one.
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        for (const [lineId, a] of groups[i].zones) {
          const b = groups[j].zones.get(lineId);
          if (!b) continue;
          const separation = Math.max(b.min - a.max, a.min - b.max, 0);
          if (separation > trainByLine.get(lineId).halfLength * 2 + STOP_GAP * 3) continue;
          groups[i] = mergeZones(groups[i], groups[j]);
          groups.splice(j, 1);
          merged = true;
          break outer;
        }
      }
    }
  }
  return groups;
}

function occupies(train, zone, distance = train.distance) {
  return distance + train.halfLength + STOP_GAP >= zone.min &&
    distance - train.halfLength - STOP_GAP <= zone.max;
}

/** Pure, deterministic shuttle traffic. Distance is the centre of the consist.
 * Rendering places the cars at fixed spacing around that centre. Reversing the
 * direction changes velocity only; it never swaps carriage positions.
 */
export function createTraffic(world) {
  const trains = world.lines.filter(line => line.length > 12).map((line, index) => {
    const count = line.length < 23 ? 2 : 3;
    const minimum = SPACING * (count - 1) / 2 + 3.25;
    const start = Math.max(minimum, line.stops?.[0]?.distance ?? minimum);
    const end = Math.min(line.length - minimum, line.stops?.[1]?.distance ?? line.length - minimum);
    return {id: `train-${line.id}`, lineId: line.id, count, spacing: SPACING,
      halfLength: SPACING * (count - 1) / 2 + CAR_HALF_LENGTH,
      start, end, distance: start, direction: 1, speed: 2.6 + index % 3 * .16,
      dwell: index * .45, active: false, waiting: false};
  }).filter(train => train.end > train.start);
  const capacity=trains.length,requested=world.traffic?.trainCount;
  if(requested!==undefined){
    if(!Number.isInteger(requested)||requested<0||requested>100000)throw new TypeError('Traffic trainCount must be an integer from 0 through 100000');
    trains.length=Math.min(trains.length,requested);
  }
  const groups = crossingGroups(world, trains);
  const byId = new Map(trains.map(train => [train.id, train]));
  const routes = new Map(trains.map(train => [train.lineId,
    groups.filter(group => group.zones.has(train.lineId)).sort((a,b)=>a.zones.get(train.lineId).min-b.zones.get(train.lineId).min)]));

  function activate(train) {
    const route=routes.get(train.lineId);
    for(const group of route)if(occupies(train,group.zones.get(train.lineId))&&group.owner&&group.owner!==train.id){
      train.waiting=true;return false;
    }
    for(const group of route)if(occupies(train,group.zones.get(train.lineId)))group.owner=train.id;
    train.active=true;train.waiting=false;return true;
  }

  trains.forEach(activate);

  function step(dt) {
    // Releasing at the start of the next substep keeps both trains from using
    // the same crossing at different points within one animation frame.
    for (const group of groups) {
      if (!group.owner) continue;
      const train = byId.get(group.owner);
      if (!occupies(train, group.zones.get(train.lineId))) group.owner = null;
    }
    for (const train of trains) {
      if (!train.active && !activate(train)) continue;
      train.waiting = false;
      const movingTime = Math.max(0, dt - train.dwell);
      train.dwell = Math.max(0, train.dwell - dt);
      if (!movingTime) continue;
      const direction = train.direction;
      let desired = direction > 0
        ? Math.min(train.end, train.distance + movingTime * train.speed)
        : Math.max(train.start, train.distance - movingTime * train.speed);
      const route=routes.get(train.lineId),first=direction>0?0:route.length-1;
      for(let i=first;i>=0&&i<route.length;i+=direction){
        const group=route[i],zone=group.zones.get(train.lineId);
        if(Math.max(train.distance,desired)+train.halfLength+STOP_GAP<zone.min
          ||Math.min(train.distance,desired)-train.halfLength-STOP_GAP>zone.max)continue;
        if (!group.owner || group.owner === train.id) {
          group.owner = train.id;
          continue;
        }
        const stop = direction > 0
          ? zone.min - train.halfLength - STOP_GAP
          : zone.max + train.halfLength + STOP_GAP;
        desired = direction > 0 ? Math.max(train.distance, Math.min(desired, stop))
          : Math.min(train.distance, Math.max(desired, stop));
        train.waiting = true;
        break;
      }
      train.distance = desired;
      const terminal = direction > 0 ? train.end : train.start;
      if (Math.abs(train.distance - terminal) < 1e-8) {
        train.distance = terminal;
        train.direction = -direction;
        train.dwell = DWELL;
        train.waiting = false;
      }
    }
  }

  return {
    trains, capacity,
    get reservations() {
      return groups.map(group => ({id: group.id, junctionIds: [...group.junctionIds], trainId: group.owner}));
    },
    update(dt) {
      if (!Number.isFinite(dt) || dt < 0) throw new TypeError('Traffic time step must be finite and nonnegative');
      if (dt === 0) return;
      const steps = Math.ceil(dt / MAX_STEP);
      for (let index = 0; index < steps; index++) step(dt / steps);
    },
  };
}
