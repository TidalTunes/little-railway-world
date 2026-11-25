import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {
  ASSET_BOUNDS,
  house,
  station,
  tree,
  landmark,
  farmPatch,
  sheep,
  person,
  buildTrainCar,
} from '../src/assets.js';
import { generateWorld } from '../src/world-model.js';
import { buildMountains } from '../src/geography.js';

const builders = {house, station, tree, landmark, farmPatch, sheep, person, trainCar: buildTrainCar};
const epsilon = 1e-5;

function checkBounds(name, variant, rotation, scale) {
  const scene = new THREE.Group();
  const options = {variant, rotation, x: 13.7, y: 1.9, z: -8.2, scale,
    cab: Boolean(variant % 2)};
  const asset = builders[name](scene, options);
  // Train cars are authored at their local origin, then placed by the railway.
  if (name === 'trainCar') {
    asset.position.set(options.x, options.y, options.z);
    asset.rotation.y = rotation;
  }
  const bounds = ASSET_BOUNDS[name];
  const halfWidth = bounds.width / 2 || bounds.radius;
  const halfDepth = bounds.depth / 2 || bounds.radius;
  const localBox = new THREE.Box3(
    new THREE.Vector3(-halfWidth, 0, -halfDepth),
    new THREE.Vector3(halfWidth, bounds.height, halfDepth),
  );
  scene.updateMatrixWorld(true);
  const declared = localBox.clone().applyMatrix4(asset.matrixWorld);
  const measured = new THREE.Box3().setFromObject(asset, true);
  const label = `${name}, variant ${variant}, rotation ${rotation}, scale ${scale}`;
  assert.ok(!measured.isEmpty(), `${label} has geometry`);
  for (const axis of ['x', 'y', 'z']) {
    assert.ok(measured.min[axis] >= declared.min[axis] - epsilon,
      `${label}: ${axis} minimum ${measured.min[axis]} escapes ${declared.min[axis]}`);
    assert.ok(measured.max[axis] <= declared.max[axis] + epsilon,
      `${label}: ${axis} maximum ${measured.max[axis]} escapes ${declared.max[axis]}`);
  }
  // A box alone cannot prove circular footprints: measure every actual vertex
  // in the asset's own space, including nested meshes and their transforms.
  const inverse = asset.matrixWorld.clone().invert();
  const vertex = new THREE.Vector3();
  asset.traverse(mesh => {
    if (!mesh.isMesh) return;
    const transform = inverse.clone().multiply(mesh.matrixWorld);
    const positions = mesh.geometry.getAttribute('position');
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i).applyMatrix4(transform);
      assert.ok(Math.abs(vertex.x) <= halfWidth + epsilon &&
        Math.abs(vertex.z) <= halfDepth + epsilon, `${label} local footprint contains all parts`);
      if (bounds.radius) {
        assert.ok(Math.hypot(vertex.x, vertex.z) <= bounds.radius + epsilon,
          `${label} circular footprint contains all parts`);
      }
      assert.ok(vertex.y >= -epsilon, `${label} has no geometry sunk below its base`);
    }
  });
  // Shared unit geometry belongs to the application, so leave it alive here.
  scene.clear();
}

for (const name of Object.keys(builders)) {
  test(`${name} variants stay inside their declared footprint and height`, () => {
    const scales = name === 'house' || name === 'tree' ? [.7, 1, 1.3] : [1];
    for (let variant = -1; variant < 7; variant++) {
      for (const rotation of [0, .47, Math.PI / 2]) {
        for (const scale of scales) checkBounds(name, variant, rotation, scale);
      }
    }
  });
}

test('train cars fit the shared tunnel and track envelope', () => {
  assert.ok(ASSET_BOUNDS.trainCar.width <= 1.2, 'train width leaves a tunnel side gap');
  assert.ok(ASSET_BOUNDS.trainCar.height <= 1.7, 'train roof leaves tunnel headroom');
});

test('rendered tunnels and shallow rock cuts leave the complete train envelope open', () => {
  const inspectionMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
  for (const angle of [0, .67, Math.PI / 2]) {
    const rotate = ([x, z]) => [x * Math.cos(angle) - z * Math.sin(angle),
      x * Math.sin(angle) + z * Math.cos(angle)];
    for (const offset of [0, 6.5, 8.05]) {
      const [ax, az] = rotate([-35, offset]);
      const [bx, bz] = rotate([35, offset]);
      const world = generateWorld({seed: 'excavation', density: 0,
        cities: [{id: 'a', x: ax, z: az}, {id: 'b', x: bx, z: bz}],
        river: {points: [rotate([-80, -25]), rotate([80, -25])], width: 4},
        mountains: [{id: 'mountain', x: 0, z: 0, radius: 8, height: 10}],
        connections: [{from: 'a', to: 'b'}]});
      const mountain = new THREE.Group();
      buildMountains(mountain, world);
      mountain.traverse(mesh => { if (mesh.isMesh) mesh.material = inspectionMaterial; });
      mountain.updateMatrixWorld(true);
      const direction = new THREE.Vector3(bx - ax, 0, bz - az).normalize();
      const normal = new THREE.Vector3(-direction.z, 0, direction.x);
      for (const lane of [-ASSET_BOUNDS.trainCar.width / 2, 0, ASSET_BOUNDS.trainCar.width / 2]) {
        for (const height of [.1, ASSET_BOUNDS.trainCar.height]) {
          const start = new THREE.Vector3(ax, .42 + height, az).addScaledVector(normal, lane);
          const ray = new THREE.Raycaster(start, direction, 0, 70);
          assert.equal(ray.intersectObject(mountain, true).length, 0,
            `angle ${angle}, mountain offset ${offset}, lateral ${lane}, height ${height}: rock and portals clear the train`);
        }
      }
      const above = new THREE.Raycaster(new THREE.Vector3(0, 20, 0), new THREE.Vector3(0, -1, 0));
      assert.ok(above.intersectObject(mountain, true).some(hit => hit.point.y > 9),
        'excavation preserves the mountain summit');
    }
  }
  inspectionMaterial.dispose();
});
