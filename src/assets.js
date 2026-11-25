import { box, cylinder, roof, group, ico, beam, v } from './geometry.js';

// Bounds include every roof, wheel and trim piece. Placement uses the footprint,
// while detail stays inside it: an asset never silently occupies a neighbour.
export const ASSET_BOUNDS = Object.freeze({
  house: { width: 2.2, depth: 2.2, height: 2.4 },
  station: { width: 6.4, depth: 2.4, height: 2.4 },
  tree: { radius: .85, height: 2.8 },
  landmark: { radius: 2, height: 4.5 },
  farmPatch: { width: 3, depth: 4, height: .42 },
  sheep: { width: .46, depth: .72, height: .53 },
  person: { radius: .17, height: .75 },
  trainCar: { width: 1.12, depth: 2.4, height: 1.6 },
});

const variantOf = (value, count) => ((Math.trunc(value) % count) + count) % count;

function asset(parent, name, { x = 0, y = 0, z = 0, rotation = 0, scale = 1 } = {}) {
  const g = group(parent, x, y, z, rotation);
  g.name = name;
  g.scale.setScalar(scale);
  g.userData.footprint = { ...ASSET_BOUNDS[name] };
  return g;
}

function frontWindow(g, x, y, z, width = .36, height = .44) {
  box(g, x, y, z, width + .10, height + .10, .035, 'trim');
  box(g, x, y, z + .025, width, height, .025, 'window');
}

export function house(parent, { x = 0, y = 0, z = 0, rotation = 0, variant = 0, color = 'plaster', scale = 1 } = {}) {
  const g = asset(parent, 'house', { x, y, z, rotation, scale });
  const type = variantOf(variant, 4);
  const h = type === 2 ? 1.65 : 1.42;
  const w = type === 1 ? 1.62 : 1.82;
  const d = type === 1 ? 1.90 : 1.72;
  const roofColor = ['roof', 'roofBlue', 'roofLight', 'roofDark'][type];
  box(g, 0, .07, 0, w + .10, .14, d + .10, 'platform');
  box(g, 0, h / 2 + .12, 0, w, h, d, color);
  box(g, 0, h + .12, 0, w + .06, .10, d + .06, 'trim');
  roof(g, w + .24, d + .24, .51, h + .16, roofColor);
  const front = d / 2 + .022;
  box(g, 0, .53, front, .34, .80, .045, 'timber');
  frontWindow(g, -w * .29, .91, front);
  frontWindow(g, w * .29, .91, front);
  for (const side of [-1, 1]) {
    box(g, side * (w / 2 + .02), .92, 0, .035, .49, .48, 'trim');
    box(g, side * (w / 2 + .045), .92, 0, .025, .37, .36, 'window');
  }
  // One recognizable accent per house, rather than repeated tiny ornament.
  if (type === 1) {
    box(g, 0, 1.16, front + .035, .65, .10, .12, 'roof');
  } else if (type !== 2) {
    box(g, -.49, 1.97, -.35, .24, .50, .28, 'roofDark');
    box(g, -.49, 2.22, -.35, .29, .08, .33, 'trim');
  }
  return g;
}

export function station(parent, { x = 0, y = 0, z = 0, rotation = 0, color = 'plaster' } = {}) {
  const g = asset(parent, 'station', { x, y, z, rotation });
  box(g, 0, .10, 0, 6.4, .20, 2.4, 'platform');
  box(g, 0, .208, 1.155, 6.4, .016, .09, 'trim');
  box(g, -1.45, .97, -.42, 2.62, 1.54, 1.42, color);
  const roofGroup = group(g, -1.45, 0, -.42);
  roof(roofGroup, 2.82, 1.50, .49, 1.78, 'roofBlue');
  box(g, -1.45, .74, .314, .50, 1.07, .045, 'timber');
  frontWindow(g, -2.22, 1.09, .314, .43, .53);
  frontWindow(g, -.68, 1.09, .314, .43, .53);
  // The shelter stops well behind the platform edge: the rail has its own space.
  box(g, 1.42, 1.80, -.10, 2.82, .14, 1.65, 'roofBlue');
  for (const xx of [.20, 2.65]) {
    cylinder(g, xx, .98, .35, .055, .055, 1.55, 'teal', 6);
  }
  box(g, 1.42, .51, -.56, 1.25, .12, .38, 'timber');
  box(g, 1.42, .75, -.74, 1.25, .39, .07, 'timber');
  for (const xx of [1.00, 1.84]) box(g, xx, .33, -.56, .08, .24, .30, 'metal');
  box(g, 2.88, .43, -.70, .30, .46, .30, 'teal');
  return g;
}

export function tree(parent, { x = 0, y = 0, z = 0, scale = 1, variant = 0 } = {}) {
  const g = asset(parent, 'tree', { x, y, z, scale });
  const type = variantOf(variant, 6);
  cylinder(g, 0, .50, 0, .085, .13, 1.00, 'bark', 5);
  if (type < 3) {
    cylinder(g, 0, 1.40, 0, 0, .80, 1.45, type === 1 ? 'pineLight' : 'pine', 7);
    cylinder(g, 0, 2.03, 0, 0, .57, 1.38, type === 2 ? 'pineDark' : 'pineLight', 7);
  } else {
    const foliage = ['leaf', 'leafGold', 'leafLight'][type - 3];
    ico(g, 0, 1.55, 0, .84, 1.05, .84, foliage);
  }
  return g;
}

function clockFace(g, x, y, z, radius) {
  cylinder(g, x, y, z, radius, radius, .045, 'trim', 12).rotation.x = Math.PI / 2;
  box(g, x, y + radius * .20, z + .035, .035, radius * .51, .02, 'metal');
  box(g, x + radius * .16, y, z + .035, radius * .39, .035, .02, 'metal');
}

export function landmark(parent, { x = 0, y = 0, z = 0, rotation = 0, variant = 0 } = {}) {
  const g = asset(parent, 'landmark', { x, y, z, rotation });
  const type = variantOf(variant, 3);
  if (type === 0) {
    box(g, 0, .10, 0, 2.20, .20, 2.20, 'platform');
    box(g, 0, 1.74, 0, 1.46, 3.28, 1.46, 'peach');
    box(g, 0, 3.40, 0, 1.66, .16, 1.66, 'trim');
    clockFace(g, 0, 2.77, .756, .37);
    const sideClock = group(g, .756, 2.77, 0, Math.PI / 2);
    clockFace(sideClock, 0, 0, 0, .37);
    roof(g, 1.84, 1.84, .71, 3.49, 'roofDark');
    cylinder(g, 0, 4.29, 0, .035, .045, .18, 'gold', 5);
    box(g, 0, .62, .75, .45, 1.04, .05, 'timber');
  } else if (type === 1) {
    box(g, 0, .08, 0, 2.02, .16, 2.82, 'platform');
    box(g, 0, .98, 0, 1.75, 1.80, 2.52, 'plaster');
    roof(g, 1.99, 2.76, .62, 1.90, 'roofBlue');
    box(g, 0, 1.67, .73, 1.02, 3.18, 1.04, 'plaster');
    box(g, 0, 3.26, .73, 1.14, .13, 1.16, 'trim');
    cylinder(g, 0, 3.79, .73, 0, .81, .94, 'teal', 4).rotation.y = Math.PI / 4;
    frontWindow(g, 0, 2.71, 1.27, .33, .55);
    box(g, 0, .62, 1.285, .45, 1.05, .05, 'timber');
    for (const side of [-1, 1]) box(g, side * .89, 1.24, -.55, .04, .66, .38, 'window');
  } else {
    box(g, 0, .07, 0, 2.28, .14, 2.28, 'platform');
    for (const xx of [-.62, .62]) {
      for (const zz of [-.62, .62]) box(g, xx, 1.33, zz, .15, 2.52, .15, 'timber');
      beam(g, v(xx, .48, -.62), v(xx, 2.38, .62), .10, 'timber');
    }
    cylinder(g, 0, 2.81, 0, .96, .96, 1.14, 'teal', 10);
    cylinder(g, 0, 2.27, 0, 1.01, 1.01, .12, 'trim', 10);
    cylinder(g, 0, 3.37, 0, 1.01, 1.01, .12, 'trim', 10);
    cylinder(g, 0, 3.66, 0, 0, 1.08, .48, 'roofBlue', 10);
  }
  return g;
}

export function farmPatch(parent, { x = 0, y = 0, z = 0, rotation = 0, variant = 0 } = {}) {
  const g = asset(parent, 'farmPatch', { x, y, z, rotation });
  const type = variantOf(variant, 3);
  box(g, 0, .025, 0, 3, .05, 4, 'field');
  const crop = ['wheat', 'leaf', 'lavender'][type];
  for (let i = 0; i < 5; i++) {
    box(g, -1.16 + i * .58, .15, type === 0 ? -.25 : 0, .32, .22, type === 0 ? 3.04 : 3.70, crop);
  }
  // A pair of baled cylinders is enough to give the field a scale and a story.
  if (type === 0) {
    for (const xx of [-.70, .55]) {
      cylinder(g, xx, .23, 1.65, .18, .18, .40, 'gold', 8).rotation.z = Math.PI / 2;
    }
  }
  return g;
}

export function sheep(parent, { x = 0, y = 0, z = 0, rotation = 0 } = {}) {
  const g = asset(parent, 'sheep', { x, y, z, rotation });
  for (const xx of [-.12, .12]) {
    for (const zz of [-.16, .16]) box(g, xx, .10, zz, .06, .20, .06, 'metal');
  }
  ico(g, 0, .31, -.035, .23, .22, .30, 'white');
  ico(g, 0, .34, .24, .13, .15, .12, 'roofBlue');
  return g;
}

export function person(parent, { x = 0, y = 0, z = 0, rotation = 0, color = 'red', variant = 0 } = {}) {
  const g = asset(parent, 'person', { x, y, z, rotation });
  box(g, -.055, .16, 0, .075, .32, .10, 'metal');
  box(g, .055, .16, 0, .075, .32, .10, 'metal');
  box(g, 0, .42, 0, .24, .28, .16, color);
  ico(g, 0, .65, 0, .115, .10, .115, 'peach');
  if (variantOf(variant, 2) === 1) cylinder(g, 0, .725, 0, .135, .135, .04, 'gold', 7);
  return g;
}

export function buildTrainCar(parent, { color = 'red', cab = false } = {}) {
  const g = asset(parent, 'trainCar');
  box(g, 0, .34, 0, .91, .19, 2.10, 'metal');
  box(g, 0, .88, 0, 1.02, .94, 2.12, color);
  box(g, 0, 1.26, 0, 1.035, .10, 2.14, 'trim');
  box(g, 0, 1.39, -.015, 1.10, .19, 2.19, 'roofBlue');
  box(g, 0, .65, 0, 1.035, .065, 2.14, 'gold');
  for (const side of [-1, 1]) {
    for (const zz of [-.54, .49]) {
      box(g, side * .519, 1.075, zz, .028, .39, .69, 'window');
    }
    for (const zz of [-.67, .67]) {
      cylinder(g, side * .48, .22, zz, .22, .22, .14, 'metal', 8).rotation.z = Math.PI / 2;
    }
  }
  for (const zz of [-1.07, 1.07]) {
    box(g, 0, 1.075, zz, .66, .37, .025, 'window');
    box(g, 0, .33, zz * 1.06, .18, .12, .12, 'metal');
  }
  if (cab) {
    box(g, 0, .77, 1.085, .86, .25, .12, color);
    for (const xx of [-.31, .31]) box(g, xx, .79, 1.151, .14, .13, .03, 'gold');
    box(g, 0, 1.515, -.35, .48, .06, .45, color);
  }
  return g;
}
