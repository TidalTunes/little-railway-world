import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { mountainMeshData, mountainSurfaceHeight } from '../src/mountain-shape.js';
import { createMountainGeometry, buildMountains } from '../src/geography.js';
import { M } from '../src/palette.js';

const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });

function mountain(id = 'high-pass') {
  return { id, x: 2.5, z: -1.25, radius: 10, height: 13 };
}

function rayDown(geometry, x, z) {
  const rock = new THREE.Mesh(geometry, material);
  rock.updateMatrixWorld(true);
  return new THREE.Raycaster(new THREE.Vector3(x, 30, z), new THREE.Vector3(0, -1, 0), 0, 35)
    .intersectObject(rock);
}

test('mountain surfaces are deterministic closed volumes within authored bounds', () => {
  for (const id of ['high-pass', 'north-spire', 'east-spire', 'custom-1']) {
    const m = mountain(id), shape = mountainMeshData(m);
    assert.deepEqual(mountainMeshData({ ...m }), shape, 'shape is independent of object identity and call order');
    const edges = new Map();
    let volume = 0;
    for (const p of shape.vertices) {
      assert.ok(Math.hypot(p.x - m.x, p.z - m.z) <= m.radius + 1e-9);
      assert.ok(p.y >= 0 && p.y <= m.height);
    }
    for (const triangle of shape.triangles) {
      const [a, b, c] = triangle.map(i => new THREE.Vector3(...Object.values(shape.vertices[i])));
      assert.ok(b.clone().sub(a).cross(c.clone().sub(a)).length() > 1e-7, 'every facet has area');
      volume += a.dot(b.clone().cross(c)) / 6;
      for (let i = 0; i < 3; i++) {
        const a = triangle[i], b = triangle[(i + 1) % 3];
        const key = `${Math.min(a, b)}:${Math.max(a, b)}`;
        if (!edges.has(key)) edges.set(key, []);
        edges.get(key).push(a < b ? 1 : -1);
      }
    }
    for (const directions of edges.values()) {
      assert.equal(directions.length, 2, 'every edge joins exactly two facets');
      assert.equal(directions[0] + directions[1], 0, 'joined facets wind consistently');
    }
    assert.ok(volume > 0, 'mountain has outward winding');
  }
});

test('layered ridges produce distinct secondary summits instead of a cone', () => {
  for (const id of ['high-pass', 'north-spire', 'east-spire']) {
    const m = mountain(id), { vertices, surfaceTriangles } = mountainMeshData(m);
    const adjacent = vertices.map(() => new Set());
    for (const triangle of surfaceTriangles) {
      for (let i = 0; i < 3; i++) {
        adjacent[triangle[i]].add(triangle[(i + 1) % 3]);
        adjacent[triangle[i]].add(triangle[(i + 2) % 3]);
      }
    }
    const peaks = vertices.filter((p, i) => p.y > m.height * .55 &&
      [...adjacent[i]].every(j => vertices[j].y < p.y));
    assert.ok(peaks.length >= 2, `${id} has a summit and secondary ridge peaks`);
  }
});

test('shared height lookup exactly matches the rendered faceted surface', () => {
  const m = mountain(), shape = mountainMeshData(m), geometry = createMountainGeometry(m, []);
  for (const triangle of shape.surfaceTriangles) {
    const [a, b, c] = triangle.map(i => shape.vertices[i]);
    for (const weights of [[.25, .25, .5], [.7, .1, .2]]) {
      const x = a.x * weights[0] + b.x * weights[1] + c.x * weights[2];
      const z = a.z * weights[0] + b.z * weights[1] + c.z * weights[2];
      const expected = a.y * weights[0] + b.y * weights[1] + c.y * weights[2];
      const hits = rayDown(geometry, x, z);
      assert.ok(hits.length > 0, 'surface can be reached from above');
      assert.ok(Math.abs(hits[0].point.y - expected) < 1e-5, 'rendering interpolates authored facets');
      assert.ok(Math.abs(mountainSurfaceHeight(m, x, z) - hits[0].point.y) < 1e-5,
        'planner and renderer agree on exact ground height');
    }
  }
  assert.equal(mountainSurfaceHeight(m, m.x + m.radius + .01, m.z), 0);
  geometry.dispose();
});

test('snow follows excavated mountain facets and never caps a tunnel opening', () => {
  const m = mountain();
  const points = Array.from({ length: 57 }, (_, i) => ({ x: m.x, y: .42, z: m.z - 14 + i * .5 }));
  const line = { id: 'ridge-line', points, distances: points.map((_, i) => i * .5), length: 28,
    cuts: [{ mountainId: m.id, start: 4, end: 24 }],
    tunnels: [{ mountainId: m.id, start: 9, end: 19 }] };
  const scene = new THREE.Group();
  buildMountains(scene, { mountains: [m], lines: [line] });
  scene.updateMatrixWorld(true);
  let snowyVertices = 0;
  scene.traverse(mesh => {
    if (!mesh.isMesh || mesh.material !== M.snow) return;
    const positions = mesh.geometry.getAttribute('position');
    for (let i = 0; i < positions.count; i++) {
      const p = new THREE.Vector3().fromBufferAttribute(positions, i).applyMatrix4(mesh.matrixWorld);
      assert.ok(Math.abs(p.y - mountainSurfaceHeight(m, p.x, p.z) - .018) < 1e-4,
        'snow is a thin covering on an actual rock face');
      snowyVertices++;
    }
  });
  assert.ok(snowyVertices > 0, 'tall mountains have a jagged snow covering');
  for (const lateral of [-.7, 0, .7]) {
    const ray = new THREE.Raycaster(new THREE.Vector3(m.x + lateral, 1.42, m.z - 15),
      new THREE.Vector3(0, 0, 1), 0, 30);
    assert.equal(ray.intersectObject(scene, true).length, 0, 'rock and snow both preserve tunnel clearance');
  }
});

test('a shallow mountain crossing is a trench open to the sky, without an overhanging rock shelf', () => {
  const m=mountain('open-cutting');
  const points=Array.from({length:81},(_,i)=>({x:m.x+4.8,y:.42,z:m.z-16+i*.4}));
  const line={id:'shallow-pass',points,distances:points.map((_,i)=>i*.4),length:32,
    cuts:[{mountainId:m.id,start:4,end:28}],tunnels:[]};
  const geometry=createMountainGeometry(m,[line]);
  let checked=0;
  for(let z=m.z-8;z<=m.z+8;z+=.35){
    const x=m.x+4.8;
    if(mountainSurfaceHeight(m,x,z)<.4)continue;
    for(const lateral of[-.8,0,.8]){
      const hits=rayDown(geometry,x+lateral,z);
      assert.equal(hits.filter(hit=>hit.point.y>.05).length,0,'a train corridor can be seen directly from above');
    }
    checked++;
  }
  assert.ok(checked>10,'the test spans a substantial mountainside');
  const adjacent=rayDown(geometry,m.x+2.8,m.z);
  assert.ok(adjacent.length>0&&adjacent[0].point.y>1,'stone beside the trench remains intact');
  geometry.dispose();
});
