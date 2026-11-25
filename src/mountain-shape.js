import {rangeMeshData,rangeSurfaceHeight,rangeSnowHeight,rangeFootprintDistance} from './mountain-ranges.js';
/** Shared deterministic mountain surface. This module has no renderer dependency. */
const cache = new WeakMap();
const TAU = Math.PI * 2;
const SEGMENTS = 16;

function randomFor(value) {
  let hash = 2166136261;
  for (const character of value) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return () => {
    hash += 0x6D2B79F5;
    let n = hash;
    n = Math.imul(n ^ n >>> 15, n | 1);
    n ^= n + Math.imul(n ^ n >>> 7, n | 61);
    return ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}

function angleDistance(a, b) {
  return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
}

function signature(mountain) {
  return `${mountain.id ?? 'mountain'}:${mountain.x}:${mountain.z}:${mountain.radius}:${mountain.height}`;
}

/**
 * Four irregular nested rings create buttresses, shoulders and secondary peaks.
 * Every top face is a heightfield triangle; the underside closes the volume for
 * CSG. Positions are world coordinates and all footprints remain within radius.
 */
export function mountainMeshData(mountain) {
  if(mountain.range)return rangeMeshData(mountain,mountain.renderBounds);
  const key = signature(mountain);
  const previous = cache.get(mountain);
  if (previous?.key === key) return previous.data;
  const random = randomFor(key), phase = random() * TAU;
  const ridgeA = phase + .72, ridgeB = phase + 3.65;
  const vertices = [], surfaceTriangles = [];
  const radii = [.21, .44, .70, 1];
  const angles = Array.from({ length: SEGMENTS }, (_, i) => phase + i / SEGMENTS * TAU + (random() - .5) * .15);
  const boundary = angles.map(() => .86 + random() * .14);
  const summit = { x: mountain.x + Math.cos(phase - .3) * mountain.radius * .075,
    y: mountain.height, z: mountain.z + Math.sin(phase - .3) * mountain.radius * .075 };
  vertices.push(summit);
  for (let ring = 0; ring < radii.length; ring++) {
    for (let i = 0; i < SEGMENTS; i++) {
      const angle = angles[i];
      const shoulder = Math.max(Math.exp(-((angleDistance(angle, ridgeA) / .43) ** 2)),
        .88 * Math.exp(-((angleDistance(angle, ridgeB) / .47) ** 2)));
      const radial = radii[ring] * (ring === 3 ? boundary[i] : .91 + random() * .15);
      const height = ring === 0 ? .67 + random() * .12 - shoulder * .04
        : ring === 1 ? .41 + shoulder * .39 + random() * .055
        : ring === 2 ? .16 + shoulder * .20 + random() * .065 : 0;
      // Slightly twisted rings break up long straight cone edges without folds.
      const a = angle + (ring === 3 ? 0 : Math.sin(i * 1.7 + ring) * .035);
      vertices.push({ x: mountain.x + Math.cos(a) * mountain.radius * radial,
        y: mountain.height * height, z: mountain.z + Math.sin(a) * mountain.radius * radial });
    }
  }
  const top = (a, b, c) => {
    const p = vertices[a], q = vertices[b], r = vertices[c];
    const up = (q.z - p.z) * (r.x - p.x) - (q.x - p.x) * (r.z - p.z);
    surfaceTriangles.push(up > 0 ? [a, b, c] : [a, c, b]);
  };
  for (let i = 0; i < SEGMENTS; i++) top(0, 1 + i, 1 + (i + 1) % SEGMENTS);
  for (let ring = 0; ring < radii.length - 1; ring++) {
    for (let i = 0; i < SEGMENTS; i++) {
      const j = (i + 1) % SEGMENTS, inner = 1 + ring * SEGMENTS, outer = inner + SEGMENTS;
      // Alternate diagonals create broader rock planes rather than radial stripes.
      if ((i + ring) % 2) {
        top(inner + i, outer + i, inner + j);
        top(inner + j, outer + i, outer + j);
      } else {
        top(inner + i, outer + i, outer + j);
        top(inner + i, outer + j, inner + j);
      }
    }
  }
  const bottom = vertices.length;
  vertices.push({ x: mountain.x, y: 0, z: mountain.z });
  const triangles = surfaceTriangles.map(triangle => [...triangle]);
  const outer = 1 + (radii.length - 1) * SEGMENTS;
  for (let i = 0; i < SEGMENTS; i++) triangles.push([bottom, outer + i, outer + (i + 1) % SEGMENTS]);
  const lookup = surfaceTriangles.map(([a, b, c]) => {
    const p = vertices[a], q = vertices[b], r = vertices[c];
    return { p, q, r, minX: Math.min(p.x, q.x, r.x), maxX: Math.max(p.x, q.x, r.x),
      minZ: Math.min(p.z, q.z, r.z), maxZ: Math.max(p.z, q.z, r.z),
      denominator: (q.z - r.z) * (p.x - r.x) + (r.x - q.x) * (p.z - r.z) };
  });
  const data = { vertices, triangles, surfaceTriangles, snowLine: mountain.height * .64, phase };
  cache.set(mountain, { key, data, lookup });
  return data;
}

/** Exact height of the rendered triangular surface, including every ridge. */
export function mountainSurfaceHeight(mountain, x, z) {
  if(mountain.range)return rangeSurfaceHeight(mountain,x,z);
  if (Math.hypot(x - mountain.x, z - mountain.z) > mountain.radius + 1e-7) return 0;
  mountainMeshData(mountain);
  for (const { p, q, r, minX, maxX, minZ, maxZ, denominator } of cache.get(mountain).lookup) {
    if (x < minX - 1e-8 || x > maxX + 1e-8 || z < minZ - 1e-8 || z > maxZ + 1e-8) continue;
    const a = ((q.z - r.z) * (x - r.x) + (r.x - q.x) * (z - r.z)) / denominator;
    const b = ((r.z - p.z) * (x - r.x) + (p.x - r.x) * (z - r.z)) / denominator;
    const c = 1 - a - b;
    if (a >= -1e-7 && b >= -1e-7 && c >= -1e-7) return Math.max(0, a * p.y + b * q.y + c * r.y);
  }
  return 0;
}

/** A repeatable scalloped snowline crosses faces instead of drawing a flat cap. */
export function mountainSnowHeight(mountain, x, z) {
  if(mountain.range)return rangeSnowHeight(mountain,x,z);
  const { phase } = mountainMeshData(mountain);
  const angle = Math.atan2(z - mountain.z, x - mountain.x);
  return mountain.height * (.64 + .055 * Math.sin(angle * 3 + phase) + .028 * Math.sin(angle * 7 - phase));
}

/** Negative inside the complete mountain footprint, positive outside. */
export function mountainFootprintDistance(mountain,x,z){
  return mountain.range?rangeFootprintDistance(mountain,x,z):Math.hypot(x-mountain.x,z-mountain.z)-mountain.radius;
}
