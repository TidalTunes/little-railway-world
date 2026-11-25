import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { generateWorld, sampleLine, distanceToLine } from '../src/world-model.js';
import { buildRailways } from '../src/railway.js';
import { M } from '../src/palette.js';

function sharedRiverFixture() {
  const original = generateWorld({ seed: 27, density: 0, mountains: [] });
  const section = original.sharedSections[0], ref = section.lines[0];
  const line = original.lines.find(line => line.id === ref.lineId);
  const p = sampleLine(line, (ref.start + ref.end) / 2);
  const world = generateWorld({ seed: 27, density: 0, mountains: [], river: {
    width: 4, points: [-120, 120].map(s => [p.x + p.tangent.z * s, p.z - p.tangent.x * s]),
  } });
  return { world, section: world.sharedSections.find(item => item.id === section.id) };
}

test('a river beneath a shared city throat has one continuous deck and unobstructed turnouts', () => {
  const { world, section } = sharedRiverFixture();
  assert.ok(section && section.lines.length > 1, 'fixture includes overlapping route throats');
  assert.ok(section.lines.every(ref => world.lines.find(line => line.id === ref.lineId)
    .bridges.some(bridge => bridge.start < ref.end && bridge.end > ref.start)),
  'both coincident routes request a bridge at the shared throat');

  const root = new THREE.Group();
  buildRailways(root, world);
  root.updateMatrixWorld(true);
  const decks = [], obstacles = [];
  root.traverse(mesh => {
    if (!mesh.isMesh || ![M.platform, M.trim].includes(mesh.material)) return;
    const box = new THREE.Box3().setFromObject(mesh, true);
    if (mesh.material === M.platform && Math.abs(box.min.y + .045) < 1e-5
      && Math.abs(box.max.y - .205) < 1e-5) decks.push(mesh);
    else if (box.max.y > .435) obstacles.push(mesh);
  });
  assert.ok(decks.length > 0 && obstacles.length > 0, 'physical decks and guardrails exist');

  const deckHits = (line, distance, offset = 0) => {
    const p = sampleLine(line, distance);
    const ray = new THREE.Raycaster(new THREE.Vector3(p.x + p.tangent.z * offset, 1,
      p.z - p.tangent.x * offset), new THREE.Vector3(0, -1, 0), 0, 1.1);
    return new Set(ray.intersectObjects(decks, false).map(hit => hit.object));
  };
  for (const line of world.lines) for (const bridge of line.bridges) {
    for (let s = bridge.start + .05; s < bridge.end - .05; s += .19) {
      for (const offset of [-.65, 0, .65]) assert.ok(deckHits(line, s, offset).size > 0,
        `${line.id} has continuous deck beneath the swept train envelope at ${s}`);
    }
  }
  const owner = world.lines.find(line => line.id === section.ownerLineId);
  const owned = section.lines.find(ref => ref.lineId === owner.id);
  for (const fraction of [.25, .5, .75]) {
    const s = owned.start + (owned.end - owned.start) * fraction;
    assert.equal(deckHits(owner, s).size, 1, 'shared bridge surface is rendered by exactly one route');
  }

  // Sample actual rail/post/brace triangles, including their interior, rather
  // than checking only construction anchors that could hide a crossing beam.
  let checked = 0;
  for (const mesh of obstacles) {
    const positions = mesh.geometry.attributes.position, index = mesh.geometry.index;
    const count = index ? index.count : positions.count;
    for (let i = 0; i < count; i += 3) {
      const triangle = [0, 1, 2].map(j => new THREE.Vector3()
        .fromBufferAttribute(positions, index ? index.getX(i + j) : i + j)
        .applyMatrix4(mesh.matrixWorld));
      for (let a = 0; a <= 4; a++) for (let b = 0; b <= 4 - a; b++) {
        const p = triangle[0].clone().multiplyScalar(a / 4)
          .addScaledVector(triangle[1], b / 4).addScaledVector(triangle[2], 1 - (a + b) / 4);
        if (p.y < .435) continue;
        for (const line of world.lines) assert.ok(distanceToLine(line, p.x, p.z) > .72,
          `bridge furniture clears ${line.id}'s complete train corridor`);
        checked++;
      }
    }
  }
  assert.ok(checked > 100, 'guardrail interiors and their supporting posts were exercised');
});
