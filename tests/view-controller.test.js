import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createViewController } from '../src/view-controller.js';

class FakeCanvas extends EventTarget {
  constructor(document) {
    super();
    this.ownerDocument = document;
    this.style = {};
    this.dataset = {};
    this.clientWidth = 1000;
    this.clientHeight = 750;
  }
  getBoundingClientRect() {
    return {left: 0, top: 0, width: this.clientWidth, height: this.clientHeight};
  }
  setPointerCapture() {}
  releasePointerCapture() {}
}

function event(type, properties = {}) {
  const value = new Event(type, {cancelable: true});
  Object.assign(value, {button: 0, buttons: 0, pointerId: 1, pointerType: 'mouse',
    clientX: 500, clientY: 375, pageX: 500, pageY: 375,
    altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}, properties);
  return value;
}

function fixture(t, {reduced = false} = {}) {
  const oldWindow = globalThis.window;
  const document = new EventTarget(), window = new EventTarget();
  globalThis.window = window;
  const canvas = new FakeCanvas(document), scene = new THREE.Scene(), mapScene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-60, 60, 45, -45, .1, 500);
  camera.position.set(115, 125, 145); camera.lookAt(0, 1.3, 0); camera.updateMatrixWorld(true);
  let root = new THREE.Group(); scene.add(root);
  const material = new THREE.MeshBasicMaterial(), geometry = new THREE.BoxGeometry(1.2, 1.5, 2.4);
  function train(id, x = 0, z = 0) {
    const parts = [-1, 0, 1].map(index => {
      const part = new THREE.Group();
      part.userData.trainId = id;
      part.position.set(x, .42, z + index * 2.64);
      const body = new THREE.Mesh(geometry, material); body.position.y = .75;
      part.add(body); root.add(part); return part;
    });
    return {state: {id, active: true}, parts};
  }
  let trains = [train('first', 6, 4), train('second', -12, -8)];
  let paused = false, regenerationCount = 0;
  const reducedMotion = {matches: reduced};
  const view = createViewController({canvas, camera, scene, mapScene, reducedMotion,
    getTrains: () => trains, getWorldRoot: () => root,
    onPause: () => { paused = !paused; },
    onRegenerate: () => {
      regenerationCount++;
      scene.remove(root); root = new THREE.Group(); scene.add(root);
      trains = [train(`replacement-${regenerationCount}`, -4, 8)];
      view.reset();
      view.controls.target.set(12, 1.3, -9);
      view.navigation.position.copy(view.controls.target).add(new THREE.Vector3(100, 120, 140));
      view.navigation.zoom = 1; view.navigation.updateProjectionMatrix();
      view.controls.update(); view.setHome();
    },
  });
  view.setHome();
  function update(dt = 1 / 60) {
    view.update(dt); root.updateMatrixWorld(true); camera.updateMatrixWorld(true);
  }
  function settle() { for (let i = 0; i < 180; i++) update(); }
  function zoom(value) { view.navigation.zoom = value; view.navigation.updateProjectionMatrix(); settle(); }
  function key(key, properties = {}) {
    const value = event('keydown', {key, ...properties}); canvas.dispatchEvent(value); return value;
  }
  function pointer(type, x, y, properties = {}) {
    const value = event(type, {clientX: x, clientY: y, pageX: x, pageY: y, ...properties});
    canvas.dispatchEvent(value);
    if (type === 'pointermove' || type === 'pointerup') document.dispatchEvent(value);
    if (type === 'pointerup' || type === 'pointercancel') window.dispatchEvent(value);
  }
  function location(part = trains[0].parts[1]) {
    const p = part.position.clone();
    p.y = view.blend > .7 ? .3 : (p.y + .8) * root.scale.y;
    p.project(camera);
    return {x: (p.x + 1) * canvas.clientWidth / 2, y: (1 - p.y) * canvas.clientHeight / 2};
  }
  function tap(part = trains[0].parts[1], properties = {}) {
    const p = location(part);
    pointer('pointerdown', p.x, p.y, properties); pointer('pointerup', p.x, p.y, properties);
  }
  t.after(() => {
    view.controls.dispose(); geometry.dispose(); material.dispose();
    for (const marker of [...scene.children, ...mapScene.children]) {
      if (marker.geometry) marker.geometry.dispose();
      if (marker.material) marker.material.dispose();
    }
    if (oldWindow === undefined) delete globalThis.window; else globalThis.window = oldWindow;
  });
  return {canvas, camera, scene, mapScene, view, reducedMotion, update, settle, zoom, key, pointer, location, tap,
    get root() { return root; }, get trains() { return trains; },
    get paused() { return paused; }, get regenerationCount() { return regenerationCount; }};
}

const nearVector = (actual, expected, tolerance = 1e-8) => assert.ok(actual.distanceTo(expected) < tolerance,
  `expected ${expected.toArray()}, received ${actual.toArray()}`);

test('selecting a train from the far map survives the initial zoom below two and follows movement', t => {
  const f = fixture(t); f.zoom(.5);
  assert.equal(f.view.mode, 'map');
  f.tap();
  assert.equal(f.view.selected, 'first');
  f.update();
  assert.ok(f.view.navigation.zoom < 2, 'first animation frame should still be below the follow exit zoom');
  assert.equal(f.view.selected, 'first', 'automatic zoom-in must not release its own selection');
  f.settle();
  assert.equal(f.view.mode, 'close');
  assert.ok(f.view.navigation.zoom >= 3.2);
  for (const part of f.trains[0].parts) part.position.x += 4;
  f.settle();
  nearVector(f.view.controls.target, new THREE.Vector3(10, .75, 4), 1e-6);
});

test('zooming out, Escape, and empty clicks release follow without resetting the current view', t => {
  const f = fixture(t, {reduced: true});
  f.tap(); f.update();
  f.view.navigation.zoom = 2.1; f.view.navigation.updateProjectionMatrix();
  f.key('-'); f.update();
  assert.ok(f.view.navigation.zoom < 2); assert.equal(f.view.selected, null);
  f.key('f'); f.update();
  assert.notEqual(f.view.selected, null);
  const beforeEscape = f.view.navigation.zoom;
  f.key('Escape'); f.update();
  assert.equal(f.view.selected, null); assert.equal(f.view.navigation.zoom, beforeEscape);
  f.key('f'); f.update();
  f.pointer('pointerdown', 5, 5); f.pointer('pointerup', 5, 5); f.update();
  assert.equal(f.view.selected, null); assert.equal(f.view.mode, 'close');
});

test('Home and double-click clear following and pending damping to restore the saved world view', t => {
  const f = fixture(t);
  const homePosition = f.view.navigation.position.clone(), homeTarget = f.view.controls.target.clone();
  f.pointer('pointerdown', 450, 350);
  f.pointer('pointermove', 510, 380, {buttons: 1});
  f.pointer('pointerup', 510, 380);
  f.key('Home'); f.settle();
  nearVector(f.view.navigation.position, homePosition); nearVector(f.view.controls.target, homeTarget);
  f.zoom(.5); f.tap(); f.update(); f.key('Home'); f.update();
  assert.equal(f.view.selected, null); assert.equal(f.view.mode, 'world');
  assert.equal(f.view.navigation.zoom, 1); assert.equal(f.view.blend, 0);
  nearVector(f.root.scale, new THREE.Vector3(1, 1, 1));
  nearVector(f.view.navigation.position, homePosition);
  f.zoom(3); f.canvas.dispatchEvent(event('dblclick')); f.update();
  assert.equal(f.view.navigation.zoom, 1); assert.equal(f.view.mode, 'world');
});

test('regeneration replaces selection and saves the new world framing as Home', t => {
  const f = fixture(t, {reduced: true}); f.tap(); f.update();
  assert.equal(f.view.selected, 'first');
  f.key('r'); f.update();
  assert.equal(f.regenerationCount, 1); assert.equal(f.view.selected, null);
  assert.equal(f.view.mode, 'world'); assert.equal(f.view.navigation.zoom, 1);
  const newHome = f.view.navigation.position.clone();
  f.key('f'); f.update(); f.key('Home'); f.update();
  nearVector(f.view.navigation.position, newHome);
  assert.equal(f.canvas.dataset.following, '');
});

test('dragging onto a train, right clicks, and canceled pointers do not select it', t => {
  const f = fixture(t, {reduced: true}); f.zoom(.5);
  const p = f.location();
  f.pointer('pointerdown', p.x - 20, p.y);
  f.pointer('pointermove', p.x, p.y, {buttons: 1});
  f.pointer('pointerup', p.x, p.y);
  assert.equal(f.view.selected, null);
  f.tap(f.trains[0].parts[1], {button: 2}); assert.equal(f.view.selected, null);
  const q = f.location();
  f.pointer('pointerdown', q.x, q.y); f.pointer('pointercancel', q.x, q.y);
  assert.equal(f.view.selected, null);
  f.tap(); assert.equal(f.view.selected, 'first', 'a canceled gesture must not poison later taps');
});

test('two-finger gestures cannot become a train tap when either finger is lifted', t => {
  const f = fixture(t, {reduced: true}); f.zoom(.5);
  const p = f.location();
  f.pointer('pointerdown', p.x, p.y, {pointerId: 1, pointerType: 'touch'});
  f.pointer('pointerdown', p.x + 25, p.y, {pointerId: 2, pointerType: 'touch'});
  f.pointer('pointerup', p.x + 25, p.y, {pointerId: 2, pointerType: 'touch'});
  f.pointer('pointerup', p.x, p.y, {pointerId: 1, pointerType: 'touch'});
  assert.equal(f.view.selected, null);
  f.tap(f.trains[0].parts[1], {pointerId: 3, pointerType: 'touch'});
  assert.equal(f.view.selected, 'first');
});

test('keyboard selection, reduced-motion framing, pause, and normal Tab navigation remain usable', t => {
  const f = fixture(t, {reduced: true}); f.zoom(.5);
  f.key('f'); f.update();
  assert.notEqual(f.view.selected, null); assert.equal(f.view.mode, 'close');
  assert.ok(f.view.navigation.zoom >= 3.2);
  const selected = f.view.selected;
  f.key(']'); f.update(); assert.notEqual(f.view.selected, selected);
  f.key('['); f.update(); assert.equal(f.view.selected, selected);
  assert.equal(f.key('Tab').defaultPrevented, false, 'keyboard focus must be able to leave the canvas');
  f.key(' '); assert.equal(f.paused, true); f.key(' '); assert.equal(f.paused, false);
  f.trains.find(train => train.state.id === selected).state.active = false; f.update();
  assert.equal(f.view.selected, null);
});

test('a visible end carriage remains selectable when the middle carriage is occluded', t => {
  const f = fixture(t, {reduced: true}); f.zoom(3.2);
  const center = f.trains[0].parts[1].position.clone(); center.y += .8;
  const direction = new THREE.Vector3(); f.camera.getWorldDirection(direction).negate();
  const geometry = new THREE.PlaneGeometry(2.4, 2.4), material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
  const blocker = new THREE.Mesh(geometry, material);
  blocker.position.copy(center).addScaledVector(direction, 4);
  blocker.quaternion.copy(f.camera.quaternion); f.root.add(blocker); f.update();
  t.after(() => { geometry.dispose(); material.dispose(); });
  f.tap(f.trains[0].parts[1]);
  assert.equal(f.view.selected, null, 'an occluded carriage must not be picked through terrain');
  f.tap(f.trains[0].parts[0]);
  assert.equal(f.view.selected, 'first', 'the same train remains selectable through its visible end');
});

test('invisible ancestors do not occlude train selection', t => {
  const f = fixture(t, {reduced: true}); f.zoom(3.2);
  const center = f.trains[0].parts[1].position.clone(); center.y += .8;
  const direction = new THREE.Vector3(); f.camera.getWorldDirection(direction).negate();
  const hiddenGroup = new THREE.Group(); hiddenGroup.visible = false;
  const geometry = new THREE.PlaneGeometry(8, 8), material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
  const invisibleMesh = new THREE.Mesh(geometry, material);
  invisibleMesh.position.copy(center).addScaledVector(direction, 4);
  invisibleMesh.quaternion.copy(f.camera.quaternion); hiddenGroup.add(invisibleMesh); f.root.add(hiddenGroup); f.update();
  t.after(() => { geometry.dispose(); material.dispose(); });
  f.tap(); assert.equal(f.view.selected, 'first');
});

test('saving a replacement world home does not inherit residual orbit damping', t => {
  const f = fixture(t);
  f.pointer('pointerdown', 450, 350);
  f.pointer('pointermove', 510, 380, {buttons: 1});
  f.pointer('pointerup', 510, 380);
  f.key('r'); f.settle();
  nearVector(f.view.controls.target, new THREE.Vector3(12, 1.3, -9));
  nearVector(f.view.navigation.position, new THREE.Vector3(112, 121.3, 131));
});
