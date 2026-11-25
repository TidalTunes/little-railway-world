import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {
  ASSET_BOUNDS,
  house,
  station,
  tree,
  cactus,
  landmark,
  apartment,
  civic,
  plaza,
  tower,
  farmPatch,
  sheep,
  person,
  buildTrainCar,
} from '../src/assets.js';
import { generateWorld } from '../src/world-model.js';
import { buildMountains } from '../src/geography.js';
import { createPlayerPalette } from '../src/player-palette.js';
import { buildWorld } from '../src/world.js';
import { M } from '../src/palette.js';

const builders = {house, station, tree, cactus, landmark, apartment, civic, plaza, tower, farmPatch, sheep, person, trainCar: buildTrainCar};
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
    const scales = ['house', 'tree', 'cactus', 'landmark', 'apartment', 'civic', 'plaza', 'tower'].includes(name) ? [.7, 1, 1.3] : [1];
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

test('owned city assets and trains show the same owner palette on walls and roofs', () => {
  const palette=createPlayerPalette({id:'owner',color:{l:.64,c:.14,h:245}});
  for(const name of ['house','station','landmark','apartment','civic','plaza','tower','trainCar']){
    for(let variant=0;variant<6;variant++){
      const asset=builders[name](new THREE.Group(),{variant,palette,cab:true});
      const materials=new Set();asset.traverse(mesh=>{if(mesh.isMesh)materials.add(mesh.material);});
      assert.ok(materials.has(palette.light)||materials.has(palette.body),`${name} has owner-colored walls or body`);
      assert.ok(materials.has(palette.trim),`${name} shares the owner trim family`);
      if(name!=='plaza')assert.ok(materials.has(palette.roof),`${name} retains owner color in its overhead roof silhouette`);
    }
  }
  Object.values(palette).forEach(material=>material.dispose());
});

test('owner train roofs remain colored across their complete overhead silhouette', () => {
  const palette=createPlayerPalette({id:'roof-owner',color:{l:.64,c:.14,h:310}});
  const car=buildTrainCar(new THREE.Group(),{palette,cab:true}),colors=new Set(Object.values(palette));
  car.updateMatrixWorld(true);
  for(const x of [-.4,0,.4])for(const z of [-.8,0,.8]){
    const hit=new THREE.Raycaster(new THREE.Vector3(x,3,z),new THREE.Vector3(0,-1,0)).intersectObject(car,true)[0];
    assert.ok(hit&&colors.has(hit.object.material),'owner color is visible from overhead, not hidden below a neutral roof');
  }
  Object.values(palette).forEach(material=>material.dispose());
});

test('city development keeps material ownership after batching and streets at ground level', () => {
  const parent=new THREE.Group();
  const world={outline:[[-40,-20],[40,-20],[40,20],[-40,20]],
    river:{points:[{x:-30,y:-1.2,z:-30},{x:-30,y:-1.2,z:30}],width:4,y:-1.2},
    cities:[{id:'city-a',ownerId:'a'},{id:'city-b',ownerId:'b'}],
    players:[{id:'a',color:{h:25}},{id:'b',color:{h:245}}],mountains:[],lines:[],stations:[],
    placements:[{kind:'apartment',x:-8,z:5,cityId:'city-a',variant:0},
      {kind:'tower',x:8,z:5,cityId:'city-b',variant:2}],
    cityStreets:[{cityId:'city-a',ownerId:'a',points:[{x:-5,z:0},{x:5,z:0}],width:1.2}]};
  const root=buildWorld(parent,world);
  assert.equal(root.userData.ownedMaterials.length,12,'one six-material palette is owned per player');
  for(const id of ['a','b'])assert.ok(root.children.some(mesh=>mesh.material.name===`player-${id}-roof`),
    'batched roof geometry retains the owner palette');
  const materials=new Set(root.userData.ownedMaterials);
  for(const mesh of root.children)if(mesh.material.name.startsWith('player-'))assert.ok(materials.has(mesh.material),
    'main disposal can find every newly allocated owner material');
  root.updateMatrixWorld(true);
  const hit=new THREE.Raycaster(new THREE.Vector3(0,2,0),new THREE.Vector3(0,-1,0)).intersectObject(root,true)[0];
  assert.equal(hit.object.material,M.sand);
  assert.ok(Math.abs(hit.point.y-.026)<1e-6,'streets rest just above the terrain surface');
  root.children.forEach(mesh=>mesh.geometry.dispose());materials.forEach(material=>material.dispose());
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
