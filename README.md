# Little Railway World

[Open the world](https://tidaltunes.github.io/little-railway-world/) · [Explore Crossroads](https://tidaltunes.github.io/little-railway-world/?layout=crossroads)

A text-free isometric railway simulation built with Three.js. Compact towns, clean low-poly silhouettes, and colorful double-ended trains stay readable from a wide view. Forests, farms, station passengers, boats, birds, and a balloon keep the miniature alive.

The default world has eight cities and ten railway links. The same deterministic planner accepts different city counts or completely authored city, river, mountain, and route coordinates. Try `?seed=68&cities=12`, or the `?layout=crossroads` preset for curved routes, a different river, and an at-grade crossing.

## Run and verify

```sh
npm ci
npm run dev
npm test
npm run build
```

Tests check asset footprints, dozens of generated worlds, rotated river crossings, full-width bridge clearance, actual excavated mountain geometry, tunnel portals, and train reservations. The production site has no external asset or service requests.

## Publish

```sh
npm run deploy
```

The deploy script publishes `dist/` to this repository's `gh-pages` branch, preserving its history. GitHub Pages serves that branch's root. Source stays on `main`.

## Inspect the world

Drag to orbit, scroll or pinch to zoom, and right-drag or two-finger drag to pan. Double-click or press Home to restore the view. Arrow keys orbit, + / − zoom, Space pauses, and R generates another seed. Reduced-motion preferences start the scene paused. Animation suspends while the tab is hidden.

## Author worlds

See [WORLD_FORMAT.md](WORLD_FORMAT.md) for the JSON format and `window.railway` authoring API. There is no editor UI yet. World descriptions are independent of rendering, so a future editor can use the same planner and validation.

- `src/world-model.js`: deterministic layouts, terrain intersections, stations, scenery reservations, and validation.
- `src/geography.js`: excavated rivers, solid terrain, bridges, and actual CSG tunnel openings.
- `src/assets.js`: reusable low-poly assets with declared silhouette bounds.
- `src/world.js`: composition from the generated plan.
- `src/railway.js`: physical track layers and carriage rendering.
- `src/traffic.js`: deterministic shuttles, station dwell, and crossing reservations.
- `src/ambience.js`: instanced water ripples, boats, birds, and balloon motion.
- `src/palette.js`: OKLCH material palette.

Scenery uses full canopy and roof footprints, not just trunks or walls. Stations reserve their full rotated platforms. Bridges span both banks including the deck corners. Rail corridors are physically subtracted from every intersected mountain; a masonry portal appears only when rock backs the complete arch. Shallow intersections become open cuttings. Crowded decorative assets are skipped instead of forced into occupied space.

Static geometry is merged by material, ripples are instanced, and device pixel ratio is capped. The camera fits both portrait and landscape viewports.
