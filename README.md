# Little Railway World

[Explore Earth](https://tidaltunes.github.io/little-railway-world/) · [Europe](https://tidaltunes.github.io/little-railway-world/?layout=europe) · [256 cities / 2,048 trains](https://tidaltunes.github.io/little-railway-world/?layout=stress&cities=256&trains=2048) · [Classic layout](https://tidaltunes.github.io/little-railway-world/?layout=classic) · [Explore Crossroads](https://tidaltunes.github.io/little-railway-world/?layout=crossroads)

A text-free isometric railway simulation built with Three.js. Compact towns, simple low-poly silhouettes, and colorful trains stay readable from a wide view. Broad farmland, forest, plains, desert, ocean, and mountain regions give the miniature a sense of geography. Crop rows, cacti, station passengers, boats, birds, and a balloon reward a closer look.

Zoom between three views: a simplified network overview from far away, the isometric miniature at the middle distance, and a close isometric view. The overview keeps broad terrain, railways, moving trains, and one city symbol per settlement. Click or tap a train to move closer and follow its journey. Both representations show the same running simulation.

The default map is a complete Earth globe with 96 selected cities and 250 trains on ten continental and island circuits. Real coastlines, rivers, lakes, and city coordinates come from Natural Earth. Greenland and Antarctica have permanent ice; broad climate regions and continuous mountain ranges suggest the actual geography. Tropical woodland, temperate forest, taiga, tundra, savanna, and dry country blend gradually across the continents. Deep blue water has quiet broad currents and turquoise coastal shelves; wet sand blends into the neighboring ground. The globe is about 25% smaller in radius than the earlier Europe section. Terrain, tracks, buildings, and trains all curve around the same center, and elevations point radially outward. Longitude wraps continuously, so you can rotate all the way around the planet. The [Earth source notes](data/earth-geography-sources.md) document the data and deliberate simplifications.

The fifty-city Europe map remains available at `?layout=europe`, from Iceland to western Russia and Scandinavia to northern Africa. Its cities follow the UN World Urbanization Prospects 2025 harmonized urban-centre ranking within that extent; see the [European city notes](data/europe-cities-sources.md). Both geographic presets use simplified railway corridors with generated bridges and mountain tunnels. City development reflects relative source population, and ownership colors are arbitrary.

The earlier sixteen-city showcase remains available at `?layout=showcase`, with nineteen railway links and development levels from 1 to 10. Villages grow into districts with apartments, civic buildings, plazas, and towers, arranged beside connected streets. Cities and trains use their owner's color family. A train keeps its ownership as it travels between cities.

The continental stress preset opens as a map with 256 cities, 287 links, and 2,048 moving trains. `?layout=stress&cities=512&trains=4096` doubles it. City counts are multiples of eight. Zoom in or press F to follow a train: local detailed scenery is generated in a worker, prefetched around the camera, and retained in a bounded GPU cache. The complete fleet keeps moving in every view. The camera moves continuously through a fixed map-to-detail zoom interval, independent of loading. Scenery prefetch begins earlier, and a complete coarse terrain surface remains beneath local scenery as newly prepared regions appear. A fast move into an uncached region can reveal detail progressively while navigation continues.

Trains follow continuous circuits through stations, with each carriage sampled along the track. Straight city approaches and tangent-connected circular bends keep movement smooth. The deterministic planner accepts authored players, city levels, connections, rivers, mountains, and biome sites. `?layout=classic` retains the earlier eight-city generator; `?seed=68&cities=12` generates a classic twelve-city layout. `?layout=crossroads` loads the seven-city crossing preset.

This remains an art and simulation prototype. There is no playable economy or world-editor UI.

## Run and verify

```sh
npm ci
npm run dev
npm test
npm run build
```

Tests cover asset footprints, dozens of generated layouts, exact track tangents and turning radii, shared city approaches, biome coverage and shoreline clearance, oblique bridges, excavated mountain geometry, portal backing, and train movement through shared tracks and crossings. Camera tests cover fixed zoom boundaries independent of loading, smooth zoom and keyboard motion across frame rates, train selection and follow, resets, occlusion, and rejection of drag and multi-touch gestures as taps. Terrain tests cover broad ecological transitions, shared map/detail colors, coastal blending, and continuity at the date line and poles. The production site makes no external asset or service requests.

Ownership and map tests check player colors, stable train identity, all ten city glyph levels, and that decorative scenery cannot add detail to the far map.

## Publish

```sh
npm run deploy
```

The deploy script builds and publishes `dist/` to this repository's `gh-pages` branch, preserving its history. GitHub Pages serves that branch's root. Source stays on `main`.

## Inspect and author

Scroll or pinch to move through all three views. Drag to orbit the isometric world, or to pan the map and close view. Right-drag and two-finger drag also pan when a train is not being followed. Click or tap a visible train to follow it; click empty ground, press Escape, or zoom out to leave follow mode. Double-click resets to the fitted world view.

The canvas receives keyboard focus on startup. Click it again if focus has moved elsewhere:

| Key | Action |
| --- | --- |
| + / − | Zoom between map, world, and close views. |
| W / A / S / D | Pan up / left / down / right at every zoom level, with smooth acceleration and braking. |
| Arrow keys | Orbit the isometric world; pan map and close views. Panning releases a followed train. |
| F | Follow the visible train nearest the view centre. |
| [ / ] | Follow the previous or next active train. |
| Escape | Stop following while retaining the current view. |
| Home | Reset to the fitted world view; continental worlds open as a map. |
| Space | Pause or resume the simulation. |
| R | Generate another seed. |

Tab retains normal focus navigation. Reduced-motion preferences start the simulation paused and make camera transitions immediate. Animation suspends while the tab is hidden.

[WORLD_FORMAT.md](WORLD_FORMAT.md) documents the JSON configuration, generated scene plan, and `window.railway` console API. [DESIGN.md](DESIGN.md) describes the art direction.

| Module | Responsibility |
| --- | --- |
| `src/earth-world.js` / `src/earth-ranges.js` | Complete Earth preset, 96 source cities, continental circuits, polar ice, and global mountain ranges. |
| `src/world-surface.js` / `src/surface-shell.js` | Geographic sphere mapping, local tangent frames, curved geometry, and closed ocean shell. |
| `src/map-tiles.js` / `src/map-terrain-geometry.js` | Bounded globe triangulation and transferable indexed terrain buffers. |
| `src/europe-world.js` / `src/europe-ranges.js` | Geographic Europe preset, source city coordinates, railway corridors, and continuous mountain ranges. |
| `src/hydrology.js` | Multiple river widths, lake masks, banks, and shared water geometry. |
| `src/mountain-ranges.js` | Polygonal ridge terrain, exact surface sampling, and matching regional slices. |
| `src/world-model.js` | Deterministic layout, shared city approaches, transitions, infrastructure, stations, scenery reservations, and validation. |
| `src/development.js` / `src/player-palette.js` | Player color normalization, city development rules, and shared owner palettes. |
| `src/alignments.js` | Exact straight and circular-arc tracks with continuous tangents and a minimum turning radius. |
| `src/biomes.js` | Broad seeded regions, authored sites, protected coastal bays, and complete-footprint lookup. |
| `src/terrain-colors.js` / `src/globe-land-colors.js` / `src/ocean-colors.js` | Shared land ecology, spherical ocean color, coastal shelves, and blended shores. |
| `src/mountain-shape.js` | Shared irregular mountain mesh and exact surface-height lookup. |
| `src/geography.js` | Clipped biome terrain, excavated water, continuous bridge decks, mountain cuttings, and tunnel portals. |
| `src/assets.js` | Reusable low-poly assets with declared silhouette bounds. |
| `src/world.js` / `src/railway.js` | Scene composition, physical track layers, and instanced carriage rendering. |
| `src/world-worker.js` / `src/detail-compiler.js` | Worker planning, regional geometry and transferable packets. |
| `src/world-renderer.js` | Camera coverage, prefetch, budgeted hydration, progressive regional reveal, and cache eviction. |
| `src/spatial-index.js` / `src/geometry-bvh.js` | Exact planning queries and accelerated detailed selection. |
| `src/map-world.js` | Simplified terrain and rail network, one owner-colored city glyph per settlement, and live train markers. |
| `src/view-controller.js` / `src/camera-modes.js` | Three camera views, zoom boundaries, train selection, follow behavior, and input. |
| `src/view-compositor.js` | Transitions between complete map and miniature renders. |
| `src/network-traffic.js` | Continuous circuit selection, carriage sampling, following gaps, and conflict reservations. |
| `src/traffic.js` | Terminal-dwelling shuttles used when the network has no continuous circuit. |
| `src/ambience.js` / `src/palette.js` | Background movement and the OKLCH material palette. |

Scenery reserves complete roof and canopy footprints. Farms fit inside farmland, dense groves stay in forests, and cacti occupy desert. Shorelines exclude dry assets. Stations reserve their rotated platforms, and shared railway sections have one render owner so coincident rails are drawn once. Bridges span both banks across the full width of their curved decks.

City streets grow into connected winding lanes and irregular branches on dry ground beside the railway. Buildings cluster closely along those streets and reserve clearance around them. Farmland clusters varied, asymmetrically divided fields around local bearings. Wheat, pasture, orchards, vegetables, and fallow plots include occasional hedges, gates, farmyards, and small barns. Development sets a building budget and available asset types; constrained plots are skipped. Ownership and development are authoring data, with no economy or progression controls.

Mountain foothills match the surrounding ground, with grassy shoulders and sparse pine groups below exposed high cliffs. Snow follows upward-facing high terrain. Biome colors blend through a shared world-space field; exact biome masks still protect asset placement. Rail corridors are subtracted from the geometry. A tunnel portal appears only where the complete arch has rock behind it; shallow crossings without a backed tunnel become full-height open cuttings. Crowded decorative assets are skipped.

The traffic controller selects continuous circuits where the connection graph permits them. Selected circuits can leave branches unused; if the whole network has no circuit, it runs shuttles instead. Whole-train reservations and carriage clearance checks control shared tracks and crossings.

Scenery colors are baked into a few shading batches per local region. Trains share instanced carriage geometry and only nearby trains allocate 3D instances. The map batches city symbols, simplifies track tessellation, and uses one readable marker per train at continental scale. Hidden views skip their updates. Spatial indexes accelerate route planning, traffic conflict checks, and selection; the original exact curve and collision rules remain in use. Device pixel ratio is capped, shadows follow the local camera, and the camera fits portrait and landscape viewports. See [PERFORMANCE.md](PERFORMANCE.md) for reproducible measurements and limits.
