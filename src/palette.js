import * as THREE from 'three';

// Art colors are authored in OKLCH, then converted to linear sRGB for lighting.
export function color(l, c, h) {
  const a = c * Math.cos(h * Math.PI / 180);
  const b = c * Math.sin(h * Math.PI / 180);
  const ll = (l + .3963377774 * a + .2158037573 * b) ** 3;
  const mm = (l - .1055613458 * a - .0638541728 * b) ** 3;
  const ss = (l - .0894841775 * a - 1.291485548 * b) ** 3;
  return new THREE.Color().setRGB(
    Math.max(0, 4.0767416621 * ll - 3.3077115913 * mm + .2309699292 * ss),
    Math.max(0, -1.2684380046 * ll + 2.6097574011 * mm - .3413193965 * ss),
    Math.max(0, -.0041960863 * ll - .7034186147 * mm + 1.707614701 * ss),
  );
}

const values = {
  grass: [.72, .117, 126], grassLight: [.76, .12, 122], grassDark: [.67, .105, 131],
  farmland: [.77, .095, 105], forestFloor: [.66, .085, 136], desert: [.81, .083, 80],
  desertLight: [.85, .068, 85], desertRock: [.66, .083, 55], cactus: [.51, .073, 153],
  ocean: [.64, .101, 220], oceanLight: [.72, .085, 208], mountainFloor: [.64, .039, 143],
  meadow: [.75, .105, 118], soil: [.55, .065, 69], soilLight: [.66, .068, 77],
  rock: [.66, .027, 170], rockLight: [.75, .031, 163], rockDark: [.52, .024, 181],
  snow: [.96, .012, 202], water: [.64, .095, 216], waterLight: [.73, .087, 207],
  foam: [.89, .035, 196], sand: [.80, .058, 92], gravel: [.65, .022, 75],
  pine: [.43, .077, 161], pineLight: [.50, .092, 151], pineDark: [.36, .064, 165],
  leaf: [.60, .131, 137], leafLight: [.69, .135, 124], leafGold: [.75, .13, 85],
  leafPink: [.72, .11, 24], bark: [.40, .048, 56], timber: [.48, .064, 58],
  roof: [.57, .145, 33], roofLight: [.66, .135, 39], roofDark: [.45, .105, 28],
  roofBlue: [.41, .055, 212], plaster: [.87, .039, 86], peach: [.80, .07, 48],
  blush: [.76, .071, 24], sage: [.78, .052, 151], blue: [.75, .048, 216],
  white: [.95, .015, 93], trim: [.91, .032, 91], window: [.32, .038, 212],
  gold: [.76, .12, 82], red: [.54, .18, 5], redLight: [.61, .15, 12],
  teal: [.49, .087, 187], metal: [.32, .019, 232], rail: [.56, .026, 220],
  platform: [.76, .031, 92], wheat: [.77, .132, 88], field: [.56, .085, 73],
  lavender: [.60, .093, 302], pumpkin: [.70, .145, 49], backdrop: [.855, .035, 218],
};
export const C = Object.fromEntries(Object.entries(values).map(([k,v]) => [k, color(...v)]));
export const M = Object.fromEntries(Object.entries(C).map(([k,v]) => [k, new THREE.MeshStandardMaterial({ color: v, roughness: 1, metalness: 0, flatShading: true })]));
M.terrainVertex=new THREE.MeshStandardMaterial({color:0xffffff,vertexColors:true,roughness:1,flatShading:true,name:'terrain-vertex'});
M.rail.metalness = .35;
M.rail.roughness = .6;
M.water.roughness = .45;
M.window.roughness = .35;

export function random(seed = 13) {
  let a = seed;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const rng = random(38291);
export const range = (a, b) => a + rng() * (b - a);
export const pick = a => a[Math.floor(rng() * a.length)];
