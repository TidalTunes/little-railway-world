# Military art library

`military.html` is an isolated art and performance workshop. It is a separate Vite entry; the default game does not import or register these assets. Its opposing formations exchange cosmetic fire on fixed cues. There is no health, damage, combat AI, pathfinding, economy, or military gameplay.

## Art direction and coordinates

All four assets use the world's painted, flat-shaded palette. Infantry is about 0.75 world units tall, matching station passengers. Models face +Z, stand on Y=0, and accept team palettes from `player-palette.js`, four workshop presets, or a six-digit hex color. The caller supplies helicopter altitude. Independent artillery/tank aim and weapon recoil stay attached to their pivots.

| Asset | Detail triangles | Distant triangles | Projectile |
| --- | ---: | ---: | --- |
| Foot soldier | 348 | 84 | Tracer |
| Tank | 2,592 | 72 | Shell |
| Artillery | 1,116 | 96 | Arcing shell |
| Attack helicopter | 1,004 | 96 | Rocket with smoke |

## Single art rig

```js
import {createMilitaryAsset} from './src/military-assets.js';
const unit = createMilitaryAsset(scene, {kind: 'tank', team: 'teal'});
unit.root.position.set(4, 0, 6);
unit.pose({time, moving: 1, attack: 0.3, aimYaw: 0.2, elevation: 0.1});
unit.muzzle.getWorldPosition(point);
unit.setColor('#c7715a');
unit.dispose();
```

`attack` is normalized 0–1; 0 and 1 are neutral and the firing cue is 0.18. Use the returned `attackDuration` to advance it. Positive aim yaw turns toward +X; positive elevation raises the barrel. Idle/locomotion clips repeat every second. A supplied `palette` is caller-owned; in that case recolor those shared materials explicitly. Disposal never destroys caller-owned paint or unrelated scene objects.

## Large groups

```js
import {createMilitaryBatch} from './src/military-batch.js';
const army = createMilitaryBatch(scene, {capacity: 2048});
army.setUnits([
  {id: 'a', kind: 'tank', x: 0, y: 0, z: 0, heading: 0, team: 'teal', moving: true, phase: 0.4},
]);
army.update(elapsedSeconds, {camera, viewportHeight: innerHeight});
const cue = army.attack('a');
// At cue.fireDelay seconds, ask for the firing location and emit a cosmetic shot.
army.muzzleAt('a', reusableVector);
army.setPose('a', {x: 1, z: 2, heading: 0.4});
army.setColor('a', 'coral');
army.dispose();
```

Update the camera's world matrix before `army.update`. Pass a separate advancing `visibilityTime` in seconds when animation time is paused so camera culling and detail selection can still refresh. Pose commands place the whole unit; independent turret targeting is available in the single-rig API but is not yet a batch command. `moving` selects locomotion; world movement belongs to the caller. No movement or targeting behavior is inferred by the library.

The compiler samples rigid bone transforms, not vertex caches: all detailed and distant rigs together use 313,344 bytes of animation textures. All instances share these clips and one time uniform. Ordinary animation uploads no instance matrices or colors. Attack commands change one unit's animation state. Camera-dependent visibility and detail selection run at most six times per second; an unchanged camera does not repack buffers. Commands force a refresh when necessary.

Each kind has one detailed and one distant instanced batch: at most eight unit draws, independent of population. Shadow passes share the exact animation data. Distant units omit shadows, use 72–96 triangles, and retain team colors, recoil and rotor movement. Subpixel/off-camera instances are culled. Capacity, color caching, and effects are bounded; geometry, materials, textures and instance buffers have explicit cleanup.

## Cosmetic effects

`createMilitaryEffects(scene, {maxProjectiles, maxParticles, maxMarks})` exposes:

- `fire({kind, from, to, surface, color})` for `tracer`, `shell`, `arc`, or `rocket`.
- `contact({kind, position, heading, strength, surface})` for footsteps, paired tracks, and rotor downwash.
- `update(deltaSeconds)`, `clear()`, `stats`, and `dispose()`.

Effects expect world coordinates under an identity parent. Surfaces are `grass`, `sand`, `stone`, and `water`; they select dust, chips or splashes. Calls enqueue effects; `update(0)` flushes a burst. Five instanced batches handle all projectiles, muzzle flashes, smoke, particles and fading marks. Full pools recycle oldest effects without generating false impacts. Travel endpoints and impact timing remain deterministic across frame sizes. Projectiles are presentation only: no collision or damage query is performed.

## Preview and verification

Run `npm run dev` and open `/military.html`. The workshop supports individual assets, team recoloring, manual fire, motion clips, four surface types, and 128/512/2,048-unit exchanges. Its visible counter reports units, CPU update time, unit draws and triangles. This is a presentation workload, not a benchmark of future game AI or simulation.

The preview caps rendering at 30 fps, caps device-pixel ratio, suspends animation/rendering when hidden, disables large-formation shadows, and uses bounded effects. Only one rendered test instance may be open on the user's Mac. Close it and stop its development server after checking.

Focused tests cover grounded/attached art, aim and recoil, periodic clip seams, finite animated bounds, transformed muzzles, color isolation, 1,000-unit batching, stable buffers across animation frames, LOD/culling, bounded effects and disposal. Run the complete suite with limited concurrency: `node --test --test-concurrency=2 tests/*.test.js`.

A local browser check on November 27, 2026 at 1280×720 showed all 2,048 animated units with ongoing fire: four unit draws, 178,176 unit triangles, 12 total scene draws, about 1.4 ms of CPU update work and 28 fps under the 30 fps cap. Projectile/particle/mark counts stayed within 256/768/256. This is one device/sample, not a cross-device frame-rate guarantee; it excludes future gameplay simulation.
