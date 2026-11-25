import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { tunnelCutter, createMountainGeometry, buildMountains, buildTerrain } from '../src/geography.js';
import { generateWorld, sampleLine } from '../src/world-model.js';
import { M } from '../src/palette.js';

const rockMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
const railY = .42;

function lineThrough(points) {
  const distances = [0];
  for (let i = 1; i < points.length; i++) {
    distances.push(distances.at(-1) + Math.hypot(points[i].x - points[i - 1].x,
      points[i].y - points[i - 1].y, points[i].z - points[i - 1].z));
  }
  const length = distances.at(-1);
  return { id: 'test-line', points, distances, length,
    tunnels: [{ mountainId: 'peak', start: 4, end: length - 4, cutStart: 0, cutEnd: length }], bridges: [] };
}

function straightLine(angle = 0, offset = 0) {
  return lineThrough(Array.from({ length: 57 }, (_, i) => {
    const s = -14 + i / 2;
    return { x: Math.sin(angle) * s + Math.cos(angle) * offset, y: railY,
      z: Math.cos(angle) * s - Math.sin(angle) * offset };
  }));
}

function curvedLine() {
  return lineThrough(Array.from({ length: 121 }, (_, i) => {
    const z = -15 + i / 4;
    return { x: 2.3 * Math.sin(z / 7), y: railY, z };
  }));
}

function assertClosedOutwardSolid(geometry) {
  const positions = geometry.getAttribute('position');
  const indices = geometry.getIndex();
  const edges = new Map();
  let volume = 0;
  for (let i = 0; i < indices.count; i += 3) {
    const triangle = [indices.getX(i), indices.getX(i + 1), indices.getX(i + 2)];
    const points = triangle.map(index => new THREE.Vector3().fromBufferAttribute(positions, index));
    const cross = new THREE.Vector3().crossVectors(points[1].clone().sub(points[0]), points[2].clone().sub(points[0]));
    assert.ok(cross.length() > 1e-8, 'loft contains no degenerate faces');
    volume += points[0].dot(new THREE.Vector3().crossVectors(points[1], points[2])) / 6;
    for (let edge = 0; edge < 3; edge++) {
      const a = triangle[edge], b = triangle[(edge + 1) % 3];
      const key = `${Math.min(a, b)}:${Math.max(a, b)}`;
      if (!edges.has(key)) edges.set(key, []);
      edges.get(key).push(a < b ? 1 : -1);
    }
  }
  for (const [edge, orientations] of edges) {
    assert.equal(orientations.length, 2, `edge ${edge} is shared by exactly two faces`);
    assert.equal(orientations[0] + orientations[1], 0, `edge ${edge} has opposite winding`);
  }
  assert.ok(volume > 0, 'positive signed volume proves outward winding');
}

function rockMesh(line) {
  const geometry = createMountainGeometry({ id: 'peak', x: 0, z: 0, radius: 10, height: 12 }, [line]);
  const rock = new THREE.Mesh(geometry, rockMaterial);
  rock.updateMatrixWorld(true);
  return rock;
}

function rayHits(mesh, from, to) {
  const direction = to.clone().sub(from), distance = direction.length();
  return new THREE.Raycaster(from, direction.normalize(), 1e-5, distance - 1e-5).intersectObject(mesh, true);
}

test('tunnel lofts are closed outward solids on straight, rotated and curved routes', () => {
  for (const line of [straightLine(), straightLine(.73), straightLine(1.8), curvedLine()]) {
    const geometry = tunnelCutter(line, 1, line.length - 1);
    assertClosedOutwardSolid(geometry);
    geometry.dispose();
  }
});

test('CSG opens a complete train corridor while retaining adjacent mountain', () => {
  for (const angle of [0, .37, Math.PI / 2, 2.32]) {
    const line = straightLine(angle), rock = rockMesh(line);
    for (const lateral of [-.72, 0, .72]) {
      const from = new THREE.Vector3(-Math.sin(angle) * 15 + Math.cos(angle) * lateral, railY + 1,
        -Math.cos(angle) * 15 - Math.sin(angle) * lateral);
      const to = from.clone().add(new THREE.Vector3(Math.sin(angle) * 30, 0, Math.cos(angle) * 30));
      assert.equal(rayHits(rock, from, to).length, 0, `bearing ${angle}, lateral ${lateral}: tunnel is clear`);
    }
    const from = new THREE.Vector3(-Math.sin(angle) * 15 + Math.cos(angle) * 2, railY + 1,
      -Math.cos(angle) * 15 - Math.sin(angle) * 2);
    const to = from.clone().add(new THREE.Vector3(Math.sin(angle) * 30, 0, Math.cos(angle) * 30));
    assert.ok(rayHits(rock, from, to).length >= 2, `bearing ${angle}: the neighbouring rock remains solid`);
    rock.geometry.dispose();
  }
});

test('curved excavations preserve clearance along the whole swept carriage envelope', () => {
  const line = curvedLine(), rock = rockMesh(line);
  for (let distance = 1; distance < line.length - 1; distance += .4) {
    for (const lateral of [-.72, 0, .72]) {
      for (const height of [.20, 1, 1.70]) {
        const points = [-.20, .20].map(offset => {
          const p = sampleLine(line, distance + offset);
          return new THREE.Vector3(p.x + p.tangent.z * lateral, p.y + height,
            p.z - p.tangent.x * lateral);
        });
        assert.equal(rayHits(rock, ...points).length, 0,
          `distance ${distance}, lateral ${lateral}, height ${height} stays clear`);
      }
    }
  }
  rock.geometry.dispose();
});

test('generated portal openings join the actual excavation without obstructing trains', () => {
  const world = generateWorld({ density: 0 });
  const scene = new THREE.Group();
  buildMountains(scene, world);
  scene.updateMatrixWorld(true);
  let portals = 0;
  for (const line of world.lines) {
    for (const tunnel of line.tunnels) {
      for (const distance of [tunnel.start, tunnel.end]) {
        portals++;
        const p = sampleLine(line, distance);
        for (const lateral of [-.58, 0, .58]) {
          for (const height of [.15, .8, 1.6]) {
            const center = new THREE.Vector3(p.x + p.tangent.z * lateral, p.y + height,
              p.z - p.tangent.x * lateral);
            const step = new THREE.Vector3(p.tangent.x, 0, p.tangent.z).multiplyScalar(.8);
            assert.equal(rayHits(scene, center.clone().sub(step), center.clone().add(step)).length, 0,
              `${line.id} portal ${distance} is open across the full train envelope`);
          }
        }
      }
    }
  }
  assert.ok(portals > 0, 'the default world exercises tunnel portals');
});

test('routes crossing shallow foothills receive open excavations even without tunnel roof cover', () => {
  const world = generateWorld({ density: 0, cities: [
    { id: 'south', x: 8, z: -20, radius: 3 }, { id: 'north', x: 8, z: 20, radius: 3 },
  ], mountains: [{ id: 'peak', x: 0, z: 0, radius: 10, height: 12 }],
  river: { points: [[-40, -40], [-40, 40]], width: 4 },
  connections: [{ from: 'south', to: 'north' }] });
  const rock = new THREE.Mesh(createMountainGeometry(world.mountains[0], world.lines), rockMaterial);
  rock.updateMatrixWorld(true);
  assert.equal(rayHits(rock, new THREE.Vector3(8, railY + 1, -15), new THREE.Vector3(8, railY + 1, 15)).length, 0,
    'a train must not pass through solid foothills when mountain coverage is too low for a portal');
  rock.geometry.dispose();
});

test('tangential routes use portals only where the entire masonry arch meets solid rock', () => {
  const world = generateWorld({ density: 0, cities: [
    { id: 'south', x: 6.5, z: -20, radius: 3 }, { id: 'north', x: 6.5, z: 20, radius: 3 },
  ], mountains: [{ id: 'peak', x: 0, z: 0, radius: 10, height: 12 }],
  river: { points: [[-40, -40], [-40, 40]], width: 4 },
  connections: [{ from: 'south', to: 'north' }] });
  const rock = new THREE.Mesh(createMountainGeometry(world.mountains[0], world.lines), rockMaterial);
  rock.updateMatrixWorld(true);
  assert.ok(world.lines[0].cuts.length > 0, 'the route still excavates the mountain');
  for (const line of world.lines) {
    for (const tunnel of line.tunnels) {
      for (const distance of [tunnel.start, tunnel.end]) {
        const p = sampleLine(line, distance);
        for (let i = 0; i <= 12; i++) {
          const angle = i / 12 * Math.PI;
          const x = p.x + p.tangent.z * Math.cos(angle) * 1.40;
          const z = p.z - p.tangent.x * Math.cos(angle) * 1.40;
          const archTop = p.y + 1.80 + Math.sin(angle) * 1.40;
          const hits = rayHits(rock, new THREE.Vector3(x, 20, z), new THREE.Vector3(x, -1, z));
          assert.ok(hits.length > 0 && hits[0].point.y >= archTop - .015,
            `arch at ${distance}, angle ${angle} must be backed by rock, not floating beyond its slope`);
        }
      }
    }
  }
  rock.geometry.dispose();
});

test('river excavation keeps water, sloped banks and dry land separate at arbitrary bearings', () => {
  for (const angle of [0, .41, Math.PI / 2, 2.22]) {
    const direction = { x: Math.sin(angle), z: Math.cos(angle) };
    const world = { outline: [[-20, -20], [20, -20], [20, 20], [-20, 20]], river: {
      width: 5.4, points: [-35, 35].map(s => ({ x: direction.x * s, y: -1.2, z: direction.z * s })),
    } };
    const scene = new THREE.Group();
    buildTerrain(scene, world);
    scene.updateMatrixWorld(true);
    for (const along of [-10, 0, 10]) {
      for (const side of [-1, 1]) {
        for (const [offset, material, height] of [[0, M.waterLight, -1.17],
          [3.1 * side, M.sand, -.585], [4 * side, M.grass, .018]]) {
          const x = direction.x * along + direction.z * offset;
          const z = direction.z * along - direction.x * offset;
          const hits = rayHits(scene, new THREE.Vector3(x, 10, z), new THREE.Vector3(x, -4, z));
          assert.ok(hits.length > 0, 'terrain has a physical surface');
          assert.equal(hits[0].object.material, material,
            `bearing ${angle}, along ${along}, offset ${offset}: material matches geography`);
          assert.ok(Math.abs(hits[0].point.y - height) < .002,
            `bearing ${angle}, offset ${offset}: surface elevation is continuous`);
        }
      }
    }
    const outside = rayHits(scene, new THREE.Vector3(23, 10, 23), new THREE.Vector3(23, -4, 23));
    assert.equal(outside.length, 0, 'terrain remains clipped to its authored island boundary');
  }
});
