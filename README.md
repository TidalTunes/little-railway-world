# Little Railway World

[Open the world](https://tidaltunes.github.io/little-railway-world/) · [Classic layout](https://tidaltunes.github.io/little-railway-world/?layout=classic) · [Explore Crossroads](https://tidaltunes.github.io/little-railway-world/?layout=crossroads)

A text-free isometric railway simulation built with Three.js. Compact towns, simple low-poly silhouettes, and colorful trains stay readable from a wide view. Broad farmland, forest, plains, desert, ocean, and mountain regions give the miniature a sense of geography. Crop rows, cacti, station passengers, boats, birds, and a balloon reward a closer look.

Zoom between three views: a flat network map from far away, the isometric miniature at the middle distance, and an overhead close view. The map keeps broad terrain, railways, moving trains, and one city symbol per settlement. Click or tap a train to move closer and follow its journey. Both representations show the same running simulation.

The default showcase has sixteen cities, nineteen railway links, and development levels from 1 to 10. Villages grow into districts with apartments, civic buildings, plazas, and towers, arranged beside connected streets. Cities and trains use their owner's color family. A train keeps its ownership as it travels between cities.

Trains follow continuous circuits through stations, with each carriage sampled along the track. Straight city approaches and tangent-connected circular bends keep movement smooth. The deterministic planner accepts authored players, city levels, connections, rivers, mountains, and biome sites. `?layout=classic` retains the earlier eight-city generator; `?seed=68&cities=12` generates a classic twelve-city layout. `?layout=crossroads` loads the seven-city crossing preset.

This remains an art and simulation prototype. There is no playable economy or world-editor UI.

## Run and verify

```sh
npm ci
npm run dev
npm test
npm run build
```

Tests cover asset footprints, dozens of generated layouts, exact track tangents and turning radii, shared city approaches, biome coverage and shoreline clearance, oblique bridges, excavated mountain geometry, portal backing, and train movement through shared tracks and crossings. Camera tests cover zoom boundaries, train selection and follow, resets, occlusion, and rejection of drag and multi-touch gestures as taps. The production site makes no external asset or service requests.

Ownership and map tests check player colors, stable train identity, all ten city glyph levels, and that decorative scenery cannot add detail to the far map.

## Publish

```sh
npm run deploy
```

The deploy script builds and publishes `dist/` to this repository's `gh-pages` branch, preserving its history. GitHub Pages serves that branch's root. Source stays on `main`.

## Inspect and author

Scroll or pinch to move through all three views. Drag to orbit the isometric world, or to pan the map and close view. Right-drag and two-finger drag also pan when a train is not being followed. Click or tap a visible train to follow it; click empty ground, press Escape, or zoom out to leave follow mode. Double-click resets to the fitted isometric view.

Focus the canvas to use the keyboard:

| Key | Action |
| --- | --- |
| + / − | Zoom between map, world, and close views. |
| Arrow keys | Orbit the isometric world; pan map and close views. Panning releases a followed train. |
| F | Follow the visible train nearest the view centre. |
| [ / ] | Follow the previous or next active train. |
| Escape | Stop following while retaining the current view. |
| Home | Reset to the fitted isometric world. |
| Space | Pause or resume the simulation. |
| R | Generate another seed. |

Tab retains normal focus navigation. Reduced-motion preferences start the simulation paused and make camera transitions immediate. Animation suspends while the tab is hidden.

[WORLD_FORMAT.md](WORLD_FORMAT.md) documents the JSON configuration, generated scene plan, and `window.railway` console API. [DESIGN.md](DESIGN.md) describes the art direction.

| Module | Responsibility |
| --- | --- |
| `src/world-model.js` | Deterministic layout, shared city approaches, transitions, infrastructure, stations, scenery reservations, and validation. |
| `src/development.js` / `src/player-palette.js` | Player color normalization, city development rules, and shared owner palettes. |
| `src/alignments.js` | Exact straight and circular-arc tracks with continuous tangents and a minimum turning radius. |
| `src/biomes.js` | Broad seeded regions, authored sites, protected coastal bays, and complete-footprint lookup. |
| `src/mountain-shape.js` | Shared irregular mountain mesh and exact surface-height lookup. |
| `src/geography.js` | Clipped biome terrain, excavated water, continuous bridge decks, mountain cuttings, and tunnel portals. |
| `src/assets.js` | Reusable low-poly assets with declared silhouette bounds. |
| `src/world.js` / `src/railway.js` | Scene composition, physical track layers, and carriage rendering. |
| `src/map-world.js` | Simplified terrain and rail network, one owner-colored city glyph per settlement, and live train markers. |
| `src/view-controller.js` / `src/camera-modes.js` | Three camera views, zoom boundaries, train selection, follow behavior, and input. |
| `src/view-compositor.js` | Transitions between complete map and miniature renders. |
| `src/network-traffic.js` | Continuous circuit selection, carriage sampling, following gaps, and conflict reservations. |
| `src/traffic.js` | Terminal-dwelling shuttles used when the network has no continuous circuit. |
| `src/ambience.js` / `src/palette.js` | Background movement and the OKLCH material palette. |

Scenery reserves complete roof and canopy footprints. Farms fit inside farmland, dense groves stay in forests, and cacti occupy desert. Shorelines exclude dry assets. Stations reserve their rotated platforms, and shared railway sections have one render owner so coincident rails are drawn once. Bridges span both banks across the full width of their curved decks.

City streets grow into connected winding lanes and irregular branches on dry ground beside the railway. Buildings cluster closely along those streets and reserve clearance around them. Farmland groups neighboring crop parcels into larger, consistently oriented fields with narrow dividing paths. Development sets a building budget and available asset types; constrained plots are skipped. Ownership and development are authoring data, with no economy or progression controls.

Mountains have faceted ridges, secondary peaks, and snow following the actual rock surface. Rail corridors are subtracted from the geometry. A tunnel portal appears only where the complete arch has rock behind it; shallow crossings without a backed tunnel become full-height open cuttings. Crowded decorative assets are skipped.

The traffic controller selects continuous circuits where the connection graph permits them. Selected circuits can leave branches unused; if the whole network has no circuit, it runs shuttles instead. Whole-train reservations and carriage clearance checks control shared tracks and crossings.

Static geometry is merged by material, ripples are instanced, and device pixel ratio is capped. The camera fits both portrait and landscape viewports.
