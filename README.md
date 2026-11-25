# Little Railway World

[Open the world](https://tidaltunes.github.io/little-railway-world/) · [Explore Crossroads](https://tidaltunes.github.io/little-railway-world/?layout=crossroads)

A text-free isometric railway simulation built with Three.js. Compact towns, simple low-poly silhouettes, and colorful trains stay readable from a wide view. Broad farmland, forest, plains, desert, ocean, and mountain regions give the miniature a sense of geography. Crop rows, cacti, station passengers, boats, birds, and a balloon reward a closer look.

The default world has eight cities and ten railway links. Trains follow continuous circuits through stations, with each carriage sampled along the track. Straight city approaches and tangent-connected circular bends keep movement smooth. The deterministic planner also accepts authored cities, connections, rivers, mountains, and biome sites. Try `?seed=68&cities=12`, or `?layout=crossroads` for seven irregularly arranged cities, curved connections, a mountain passage, and an interior crossing.

This remains an art and simulation prototype. There is no playable economy or world-editor UI.

## Run and verify

```sh
npm ci
npm run dev
npm test
npm run build
```

Tests cover asset footprints, dozens of generated layouts, exact track tangents and turning radii, shared city approaches, biome coverage and shoreline clearance, oblique bridges, excavated mountain geometry, portal backing, and train movement through shared tracks and crossings. The production site makes no external asset or service requests.

## Publish

```sh
npm run deploy
```

The deploy script builds and publishes `dist/` to this repository's `gh-pages` branch, preserving its history. GitHub Pages serves that branch's root. Source stays on `main`.

## Inspect and author

Drag to orbit, scroll or pinch to zoom, and right-drag or two-finger drag to pan. Double-click or press Home to restore the view. Arrow keys orbit, + / − zoom, Space pauses, and R generates another seed. Reduced-motion preferences start the scene paused. Animation suspends while the tab is hidden.

[WORLD_FORMAT.md](WORLD_FORMAT.md) documents the JSON configuration, generated scene plan, and `window.railway` console API. [DESIGN.md](DESIGN.md) describes the art direction.

| Module | Responsibility |
| --- | --- |
| `src/world-model.js` | Deterministic layout, shared city approaches, transitions, infrastructure, stations, scenery reservations, and validation. |
| `src/alignments.js` | Exact straight and circular-arc tracks with continuous tangents and a minimum turning radius. |
| `src/biomes.js` | Broad seeded regions, authored sites, protected coastal bays, and complete-footprint lookup. |
| `src/mountain-shape.js` | Shared irregular mountain mesh and exact surface-height lookup. |
| `src/geography.js` | Clipped biome terrain, excavated water, continuous bridge decks, mountain cuttings, and tunnel portals. |
| `src/assets.js` | Reusable low-poly assets with declared silhouette bounds. |
| `src/world.js` / `src/railway.js` | Scene composition, physical track layers, and carriage rendering. |
| `src/network-traffic.js` | Continuous circuit selection, carriage sampling, following gaps, and conflict reservations. |
| `src/traffic.js` | Terminal-dwelling shuttles used when the network has no continuous circuit. |
| `src/ambience.js` / `src/palette.js` | Background movement and the OKLCH material palette. |

Scenery reserves complete roof and canopy footprints. Farms fit inside farmland, dense groves stay in forests, and cacti occupy desert. Shorelines exclude dry assets. Stations reserve their rotated platforms, and shared railway sections have one render owner so coincident rails are drawn once. Bridges span both banks across the full width of their curved decks.

Mountains have faceted ridges, secondary peaks, and snow following the actual rock surface. Rail corridors are subtracted from the geometry. A tunnel portal appears only where the complete arch has rock behind it; shallow crossings without a backed tunnel become full-height open cuttings. Crowded decorative assets are skipped.

The traffic controller selects continuous circuits where the connection graph permits them. Selected circuits can leave branches unused; if the whole network has no circuit, it runs shuttles instead. Whole-train reservations and carriage clearance checks control shared tracks and crossings.

Static geometry is merged by material, ripples are instanced, and device pixel ratio is capped. The camera fits both portrait and landscape viewports.
