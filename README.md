# Little Railway World

A text-free, self-running isometric miniature built with Three.js. Two steam trains connect three towns through a landscape of low-poly forests, fields, mountains, a river, and an arched viaduct. All geometry is authored in code; no external assets or services load at runtime.

## Run

```sh
npm ci
npm run dev
```

## Build and publish

```sh
npm run build
npm run deploy
```

The deploy script publishes `dist/` to the repository's `gh-pages` branch, preserving its history. GitHub Pages serves that branch's root. Source stays on `main`.

## Camera

Drag to orbit, scroll or pinch to zoom, and right-drag or two-finger drag to pan. Double-click or press Home to restore the view. Arrow keys orbit, + / − zoom, and Space pauses or resumes the simulation. Reduced-motion preferences start the world paused.

## Art source

- `src/world.js`: composition, neighborhoods, farms, and decorative details.
- `src/landscape.js`: island, river, waterfall, mountains, trees, and fields.
- `src/buildings.js`: houses, stations, civic buildings, and small props.
- `src/railway.js`: continuous railway, bridges, locomotives, and carriages.
- `src/ambience.js`: water, boats, smoke, birds, balloon, and windmill motion.
- `src/palette.js`: deterministic randomness and the OKLCH art palette.

Static meshes are merged by material to keep the detailed landscape inexpensive to render. The orthographic camera adapts to the viewport, device pixel ratio is capped, and animation suspends while the browser tab is hidden.
