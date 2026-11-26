import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CAMERA_ZOOM,
  FOLLOW_ZOOM,
  clampZoom,
  modeForZoom,
  mapBlendForZoom,
  shouldStopFollowing,
  fitZoomForSpan,
  smoothZoom,
} from '../src/camera-modes.js';

const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-12,
  `expected ${expected}, received ${actual}`);

test('zoom clamps remain finite and respect the usable camera range', () => {
  assert.equal(clampZoom(-2), .38);
  assert.equal(clampZoom(100), 9);
  assert.equal(clampZoom(-Infinity), .38);
  assert.equal(clampZoom(Infinity), 9);
  for (const invalid of [undefined, null, NaN, '3.2', {}, []]) {
    assert.equal(clampZoom(invalid), 1);
    assert.equal(clampZoom(invalid, 3.2), 3.2);
  }
  assert.equal(clampZoom(NaN, NaN), 1);
  assert.equal(clampZoom(NaN, 200), 9);
  assert.equal(clampZoom(2.125), 2.125);
  assert.ok(Object.isFrozen(CAMERA_ZOOM));
});

test('map entry and exit use separate inclusive thresholds', () => {
  assert.equal(modeForZoom(.68001, 'world'), 'world');
  assert.equal(modeForZoom(.68, 'world'), 'map');
  assert.equal(modeForZoom(.7, 'map'), 'map');
  assert.equal(modeForZoom(.81999, 'map'), 'map');
  assert.equal(modeForZoom(.82, 'map'), 'world');
  assert.equal(modeForZoom(.7, 'world'), 'world');
  let mode = 'world';
  for (const zoom of [.69, .68, .72, .67, .8, .81, .7]) mode = modeForZoom(zoom, mode);
  assert.equal(mode, 'map');
  assert.equal(modeForZoom(.82, mode), 'world');
});

test('close mode persists in its hysteresis band and large zoom jumps resolve directly', () => {
  assert.equal(modeForZoom(2.39999, 'world'), 'world');
  assert.equal(modeForZoom(2.4, 'world'), 'close');
  assert.equal(modeForZoom(2.2, 'close'), 'close');
  assert.equal(modeForZoom(2.00001, 'close'), 'close');
  assert.equal(modeForZoom(2, 'close'), 'world');
  assert.equal(modeForZoom(2.2, 'world'), 'world');
  assert.equal(modeForZoom(.38, 'close'), 'map');
  assert.equal(modeForZoom(9, 'map'), 'close');
  assert.equal(modeForZoom(1, 'unknown'), 'world');
  assert.equal(modeForZoom(NaN, 'map'), 'world');
});

test('map blend is continuous and monotonic independently of discrete mode hysteresis', () => {
  assert.equal(mapBlendForZoom(.78), 1);
  assert.equal(mapBlendForZoom(.38), 1);
  assert.equal(mapBlendForZoom(1), 0);
  assert.equal(mapBlendForZoom(9), 0);
  near(mapBlendForZoom((.78 + 1) / 2), .5);
  let previous = 1;
  for (let zoom = .38; zoom <= 9; zoom += .001) {
    const value = mapBlendForZoom(zoom);
    assert.ok(value >= 0 && value <= 1);
    assert.ok(value <= previous + 1e-12);
    previous = value;
  }
  // Smoothstep flattens at both ends, avoiding a projection-speed jump.
  assert.ok((1 - mapBlendForZoom(.780001)) < 1e-9);
  assert.ok(mapBlendForZoom(.999999) < 1e-9);
});

test('selection targets close zoom and zooming out below two releases following', () => {
  assert.equal(FOLLOW_ZOOM, 3.2);
  assert.equal(modeForZoom(FOLLOW_ZOOM), 'close');
  assert.equal(shouldStopFollowing(3.2), false);
  assert.equal(shouldStopFollowing(2), false);
  assert.equal(shouldStopFollowing(1.99999), true);
  assert.equal(shouldStopFollowing(NaN), true);
});

test('world-span framing fits both landscape and portrait extents without changing mode thresholds', () => {
  const landscape = fitZoomForSpan({viewWidth:160,viewHeight:90,spanWidth:30,spanHeight:20,padding:0});
  const portrait = fitZoomForSpan({viewWidth:90,viewHeight:160,spanWidth:30,spanHeight:20,padding:0});
  near(landscape, 4.5);
  near(portrait, 3);
  near(fitZoomForSpan({viewWidth:160,viewHeight:90,spanWidth:30,spanHeight:20,padding:.15}), 4.5 / 1.3);
  assert.equal(modeForZoom(landscape), 'close');
  assert.equal(modeForZoom(portrait), 'close');
  assert.equal(fitZoomForSpan({viewWidth:1,viewHeight:1,spanWidth:100,spanHeight:100}), .38);
  assert.equal(fitZoomForSpan({viewWidth:100,viewHeight:100,spanWidth:1,spanHeight:1}), 9);
  assert.equal(fitZoomForSpan(), FOLLOW_ZOOM);
  assert.equal(fitZoomForSpan({viewWidth:Infinity,viewHeight:90,spanWidth:30,spanHeight:20,fallback:2.5}), 2.5);
});

test('proportional zoom easing is frame-rate independent and never overshoots its destination',()=>{
  for(const [start,target] of [[1,90],[90,.5],[.85,1],[1,1.16]]){
    const after=(hz,seconds)=>{let value=start;for(let i=0;i<hz*seconds;i++)value=smoothZoom(value,target,1/hz);return value;};
    for(const seconds of [.5,1,2]){
      const reference=after(60,seconds);
      for(const hz of [30,144])assert.ok(Math.abs(after(hz,seconds)-reference)<1e-9);
      assert.ok(reference>=Math.min(start,target)&&reference<=Math.max(start,target));
    }
    assert.equal(smoothZoom(start,target,1/60,true),target);
    assert.equal(smoothZoom(start,target,0),start);
  }
  assert.ok(smoothZoom(1,1.16,1/60)>1.02,'small wheel/key steps respond on the next frame');
  assert.equal(smoothZoom(1,1.16,2),1.16);
});
