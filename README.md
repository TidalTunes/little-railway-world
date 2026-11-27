# Little Railway World

[Explore the island](https://tidaltunes.github.io/little-railway-world/) · [Saved Earth](https://tidaltunes.github.io/little-railway-world/?layout=earth) · [Island at night](https://tidaltunes.github.io/little-railway-world/?time=night) · [Europe](https://tidaltunes.github.io/little-railway-world/?layout=europe) · [256 cities / 2,048 trains](https://tidaltunes.github.io/little-railway-world/?layout=stress&cities=256&trains=2048) · [Classic layout](https://tidaltunes.github.io/little-railway-world/?layout=classic)

A low-poly railway world and settlement game built with Three.js. Compact towns, simple low-poly silhouettes, and colorful trains stay readable from a wide view. Broad farmland, forest, plains, desert, ocean, and mountain regions give the miniature a sense of geography. Painted surface grain, crop rows, cacti, station lanterns, grazing sheep, swallows, butterflies, boats, and a balloon reward a closer look. Five-minute days alternate with five-minute nights, moving the sun, moon and shadows across the landscape. Blue moonlight, amber windows, fireflies and stars appear after sunset. **N** advances to the next phase for testing; `?time=night` opens at night.

Explore four camera layers. Scroll between three strategy views: a simplified network overview from far away, the isometric miniature at the middle distance, and a close isometric view. The overview keeps broad terrain, bold ivory-cased railways, moving trains, and owner-colored city stamps. City stamps span 25–39 screen pixels, train markers 6 × 15 pixels, and rail ink 3 pixels; dense city groups retain large priority stamps and small secondary dots that expand as the camera moves closer. Zoom out beyond the initial framing and the network gradually disappears, leaving a quiet landscape. Hidden markers skip drawing and uploads while trains continue their journeys. Click or tap a train to move closer and follow its journey. Both representations show the same running simulation. Press **V** to step into that same world as a traveller, with a perspective camera, a small character at station-passenger scale carrying an axe, and extra nearby scenery. Press **V** again to zoom back to an overview centered on the character. The same traveller stays visible in the world, with a small location dot at map scale. Your position and camera heading are retained between visits. The default settlement starts beside the player’s home; the saved populated island starts beside Westhaven station.

The default map is a compact, flat settlement island. Start beside one teal home, chop trees for 2–4 logs, and spend ten logs with **B** to build another home. Three houses form a city; every three houses unlock another level and civic landmark, up to level 5 at fifteen homes. Houses earn one gold at sunset. Gray level-1 farming villages vary their house frontages, lanes, fields and civic landmarks. Their cosmetic residents visit the farms and sleep indoors; they never pay the human player. Three rival settlers in coral, gold and blue gather timber, walk around obstacles and grow independent cities to level 5, then stop. They use the same construction rules and shared trees, while their resources and income remain separate. Their simulation continues offscreen without loading additional scenery meshes. The earlier eight-town railway island remains at `?layout=island`.

The complete Earth globe is preserved at `?layout=earth`, with 96 selected cities and 250 trains on ten continental and island circuits. The annotated Git tag [`earth-art-v1`](https://github.com/TidalTunes/little-railway-world/tree/earth-art-v1) saves the complete source and data from before the island became the default. Real coastlines, rivers, lakes, and city coordinates come from Natural Earth. Greenland and Antarctica have permanent ice; broad climate regions and continuous mountain ranges suggest the actual geography. Tropical woodland, temperate forest, taiga, tundra, savanna, and dry country blend gradually across the continents. Deep blue water has quiet broad currents and turquoise coastal shelves; wet sand blends into the neighboring ground. A rounded water-only breaker fringe and subtle moving glints soften the shore without changing land placement masks. Terrain and route positions follow the sphere, and elevations point radially outward. Buildings and trains retain their dimensions in local tangent frames; rail gauge, carriage spacing and city clearances use physical surface units. Longitude wraps continuously. The [Earth source notes](data/earth-geography-sources.md) document the data and deliberate simplifications.

The fifty-city Europe map remains available at `?layout=europe`, from Iceland to western Russia and Scandinavia to northern Africa. Its cities follow the UN World Urbanization Prospects 2025 harmonized urban-centre ranking within that extent; see the [European city notes](data/europe-cities-sources.md). Both geographic presets use simplified railway corridors with generated bridges and mountain tunnels. City development reflects relative source population, and ownership colors are arbitrary.

The earlier sixteen-city showcase remains available at `?layout=showcase`, with nineteen railway links and development levels from 1 to 10. Villages grow into districts with apartments, civic buildings, plazas, and towers, arranged beside connected streets. Cities and trains use their owner's color family. A train keeps its ownership as it travels between cities.

The continental stress preset opens as a map with 256 cities, 287 links, and 2,048 moving trains. `?layout=stress&cities=512&trains=4096` doubles it. City counts are multiples of eight. Zoom in or press F to follow a train: local detailed scenery is generated by up to two workers, prefetched around the camera, and retained in a bounded GPU cache. Obsolete queued regions are cancelled when the camera moves away. The complete fleet keeps moving in every view. The camera moves continuously through a fixed map-to-detail zoom interval, independent of loading. Scenery prefetch begins earlier, and a complete coarse terrain surface remains beneath local scenery as newly prepared regions appear. A fast move into an uncached region can reveal detail progressively while navigation continues.

Trains follow continuous circuits through stations, with each carriage sampled along the track. Straight city approaches and tangent-connected circular bends keep movement smooth. The deterministic planner accepts authored players, city levels, connections, rivers, mountains, and biome sites. `?layout=classic` retains the earlier eight-city generator; `?seed=68&cities=12` generates a classic twelve-city layout. `?layout=crossroads` loads the seven-city crossing preset.

In overview, **T** plans a railway from a formed player city to another city for **5 gold**. Select your city and hover a destination: a glowing cyan curve appears immediately. Click to select the destination, then drag the interior dots to reshape the curve or the larger end handles to change its station attachments. The number of interior dots comes from the initial straight-line distance between cities and stays fixed for that pair, including while the cities grow. Unbuilt stations can move to nearby clear ground; existing stations keep their location and offer their ends or established approaches. Curves retain an eight-unit minimum radius. The visible curve follows each edit immediately, while a worker checks terrain, protected buildings and station access after a drag finishes. **Enter** builds only the current checked, valid preview; **Escape** cancels. Both towns receive stations and access paths. Water crossings receive bridges, mountains receive supported tunnels or open cuts, and intersected trees, rocks, farm estates and other scenery are cleared without granting timber. Gold is charged only on confirmation.

This is a settlement and world-exploration prototype. Multiplayer and a world-editor UI are still to come; the local rivals currently stand in for other players.

## Run and verify

```sh
npm ci
npm run dev
npm test
npm run build
```

Tests cover asset footprints, dozens of generated layouts, exact track tangents and turning radii, shared city approaches, biome coverage and shoreline clearance, oblique bridges, excavated mountain geometry, portal backing, and train movement through shared tracks and crossings. Camera tests cover fixed zoom boundaries independent of loading, smooth zoom and keyboard motion across frame rates, train selection and follow, resets, occlusion, and rejection of drag and multi-touch gestures as taps. Pointer tests verify a stationary ground pivot across zoom boundaries, high latitudes, the date line, and train-follow gestures. Terrain tests cover broad ecological transitions, shared map/detail colors, coastal blending, and continuity at the date line and poles. The production site makes no external asset or service requests.

Ownership and map tests check player colors, stable train identity, all ten city glyph levels, and that decorative scenery cannot add detail to the far map.

## Publish

```sh
npm run deploy
```

The deploy script builds and publishes `dist/` to this repository's `gh-pages` branch, preserving its history. GitHub Pages serves that branch's root. Source stays on `main`.

## Inspect and author

Scroll or pinch to move through the three strategy views. **V** smoothly zooms into the fourth, third-person view, following the persistent character. Walk with **WASD**, hold **Shift** to run, and press **Space** to jump. **E** or a click/tap sweeps the axe across the body, chopping nearby trees in settlement mode. Click the scene to capture the mouse for relative look; **Tab** releases it for controls. Touch and pen retain drag look, and arrow keys can turn the camera. **B** selects a house only in third person: aim ahead by looking around, look down to bring the blueprint closer, and look up to place it farther away. Click or **Enter** builds; **Escape** cancels. **V** returns to overview; Escape first releases a captured mouse or cancels the current tool. The character uses the same terrain, streets, buildings and railway geometry; nearby grass, flowers and crop stalks add detail without changing the shared architecture. Grass forms a dense carpet with coherent wind and bends around the traveller. Buildings and water block movement; the camera retracts near walls. Entry reuses prewarmed local scenery, with bounded streaming as you explore.

Detailed strategy views hold a fixed 45° angle above the local ground. Drag to rotate the heading around the ground focus; WASD moves that focus smoothly in screen-relative directions at a consistent physical speed. Zoom changes magnification without flattening the view. Dragging while following a train rotates around the train, while train bends leave the camera heading unchanged. Two-finger gestures rotate and pinch to zoom in detailed views. The fully zoomed-out map uses dragging to pan. Click or tap a visible train to follow it; click empty ground, press Escape, or zoom out to leave follow mode. Double-click resets to the fitted world view.

The canvas receives keyboard focus on startup. Click it again if focus has moved elsewhere:

| Key | Action |
| --- | --- |
| + / − | Zoom between map, world, and close views. |
| V | Switch between the persistent walking character and the overview. |
| W / A / S / D | Pan the strategy focus; move relative to the camera in third person. |
| Shift | Run while walking. |
| E or click / tap | Chop a nearby tree in third person; click confirms while building. |
| B | Select or cancel house placement, only in third person. |
| T | Plan a railway in overview. |
| Enter | Confirm a valid house or a selected railway whose checks have passed. |
| Tab | Release the captured mouse and move focus to controls. |
| Arrow keys | Look around in third person; orbit or pan in strategy views. Panning releases a followed train. |
| F | Follow the visible train nearest the view centre. |
| [ / ] | Follow the previous or next active train. |
| Escape | Cancel placement, release the captured mouse, leave walking, or stop following a train. |
| Home | Reset to the fitted world view; continental worlds open as a map. |
| Space | Jump in third person; pause or resume the simulation in strategy views. |
| N | Advance to the next day/night phase; sunset settles income. |
| R | Generate another seed in saved art presets. |

Controls use colored icons and keycaps, with names on hover or focus and short placement hints. Tab retains normal focus navigation after releasing the mouse. Reduced-motion preferences start motion paused and make camera transitions and construction reveals immediate. Animation suspends while the tab is hidden; the calendar catches up on return.

[WORLD_FORMAT.md](WORLD_FORMAT.md) documents the JSON configuration, generated scene plan, and `window.railway` console API. [DESIGN.md](DESIGN.md) describes the art direction.

| Module | Responsibility |
| --- | --- |
| `src/island-world.js` / `src/world-presets.js` | Compact flat island and launch selection; geographic presets load only when requested. |
| `src/earth-world.js` / `src/earth-ranges.js` | Complete Earth preset, 96 source cities, continental circuits, polar ice, and global mountain ranges. |
| `src/world-surface.js` / `src/surface-shell.js` | Geographic sphere mapping, local tangent frames, curved geometry, and closed ocean shell. |
| `src/map-tiles.js` / `src/map-terrain-geometry.js` | Bounded globe triangulation and transferable indexed terrain buffers. |
| `src/europe-world.js` / `src/europe-ranges.js` | Geographic Europe preset, source city coordinates, railway corridors, and continuous mountain ranges. |
| `src/hydrology.js` | Multiple river widths, lake masks, banks, and shared water geometry. |
| `src/mountain-ranges.js` | Polygonal ridge terrain, exact surface sampling, and matching regional slices. |
| `src/world-model.js` | Deterministic layout, shared city approaches, transitions, infrastructure, stations, scenery reservations, and validation. |
| `src/development.js` / `src/player-palette.js` | Player color normalization, city development rules, and shared owner palettes. |
| `src/alignments.js` | Exact straight and circular-arc tracks with continuous tangents and a minimum turning radius. |
| `src/settlement-railways.js` / `src/settlement-railway-preview.js` / `src/settlement-railway-planner.js` / `src/settlement-railway-art.js` | Mutable railway construction, immediate editable curves, authoritative worker checks and pooled preview artwork. |
| `src/biomes.js` | Broad seeded regions, authored sites, protected coastal bays, and complete-footprint lookup. |
| `src/terrain-colors.js` / `src/globe-land-colors.js` / `src/ocean-colors.js` | Shared land ecology, spherical ocean color, coastal shelves, and blended shores. |
| `src/landscape-field.js` / `src/nature-assets.js` | Continuous seeded landscape districts and bounded meadow, scrub, dune, rock and ice details. |
| `src/mountain-shape.js` | Shared irregular mountain mesh and exact surface-height lookup. |
| `src/geography.js` | Clipped biome terrain, excavated water, continuous bridge decks, mountain cuttings, and tunnel portals. |
| `src/assets.js` | Reusable low-poly assets with declared silhouette bounds. |
| `src/clock-design.js` / `src/clock-hands.js` | Shared clock-face construction and one bounded batch of synchronized moving hands. |
| `src/world.js` / `src/railway.js` | Scene composition, physical track layers, and instanced carriage rendering. |
| `src/world-worker.js` / `src/detail-compiler.js` | Worker planning, regional geometry and transferable packets; `world-worker-client.js` coordinates bounded parallel work and cancellation. |
| `src/world-renderer.js` | Camera coverage, prefetch, budgeted hydration, progressive regional reveal, and cache eviction. |
| `src/spatial-index.js` / `src/geometry-bvh.js` | Exact planning queries and accelerated detailed selection. |
| `src/map-world.js` | Simplified terrain and rail network, one owner-colored city glyph per settlement, and live train markers. |
| `src/view-controller.js` / `src/camera-modes.js` | Three camera views, zoom boundaries, train selection, follow behavior, and input. |
| `src/walking-player.js` / `src/walking-input.js` | Persistent stylized traveller with an axe, fixed-step walking and jumping, collisions, perspective camera, and isolated controls. |
| `src/sheep-art.js` | Shared sheep silhouette with four attached solid legs. |
| `src/walking-detail.js` / `src/walking-vegetation.js` / `src/walking-sky.js` | Bounded nearby vegetation, rooted GPU wind, and an atmospheric walking sky. |
| `src/walking-ground.js` | Cached exact mountain facets for grass-root grounding and gradual terrain-based vegetation cover. |
| `src/character-transition.js` / `src/character-marker.js` | Continuous perspective-to-orthographic camera dolly and a persistent map location marker. |
| `src/city-streets.js` | Joined path footprints with clean junctions and courtyards. |
| `src/view-compositor.js` | Transitions between complete map and miniature renders. |
| `src/network-traffic.js` | Continuous circuit selection, carriage sampling, following gaps, and conflict reservations. |
| `src/traffic.js` | Terminal-dwelling shuttles used when the network has no continuous circuit. |
| `src/ambience.js` / `src/palette.js` | Background movement and the OKLCH material palette. |

Scenery reserves complete roof and canopy footprints. Farms fit inside farmland, dense groves stay in forests, and cacti occupy desert. Shorelines exclude dry assets. Stations reserve their rotated platforms, and shared railway sections have one render owner so coincident rails are drawn once. Bridges span both banks across the full width of their curved decks.

Forests grow into coherent cores, smaller edge trees and glades. Plains keep sparse groves and clustered grazing; desert districts share dune bearings, rock outcrops and scrub, with cacti restricted to the Americas on Earth. Climate shapes the pine, birch, broadleaf and acacia mix. Polar ice gains sparse low ridges. Ground color and scenery use the same continuous seeded field across the globe, including its date line and poles. Nature details use bounded geometry and an existing shared material; the ground portions follow spherical curvature without visible base tiles. Ocean and shore colors vary with latitude and coastal exposure, with restrained animated surf.

City streets grow into connected winding lanes and irregular branches on dry ground beside the railway. Level-based footprints provide room for dense residential frontages and compact rear infill. Reusable lot candidates fill gaps without repeating geographic checks for every attempted building; houses receive priority before larger civic features. Buildings reserve their complete geometry and street clearances. Farmland joins broad, irregular fields along narrow lanes, with related crops and shared bearings across each neighborhood. Soft crop bands, whole-field orchards, occasional hedges, and farm buildings at the field edges give the countryside variety. Neighboring farms compare their actual polygon boundaries; conservative clearances still protect tracks, water, towns, and other scenery. Development sets a building budget and available asset types; constrained plots are skipped. Ownership and development are authoring data, with no economy or progression controls.

Mountain foothills match the surrounding ground, with grassy shoulders and sparse pine groups below exposed high cliffs. Snow follows upward-facing high terrain. Biome colors blend through a shared world-space field; exact biome masks still protect asset placement. Rail corridors are subtracted from the geometry. A tunnel portal appears only where the complete arch has rock behind it; shallow crossings without a backed tunnel become full-height open cuttings. Crowded decorative assets are skipped.

The traffic controller selects continuous circuits where the connection graph permits them. Selected circuits can leave branches unused; if the whole network has no circuit, it runs shuttles instead. Whole-train reservations and carriage clearance checks control shared tracks and crossings.

Scenery colors are baked into a few shading batches per local region. Trains share instanced carriage geometry and only nearby trains allocate 3D instances. The map batches city symbols, simplifies track tessellation, and uses one readable marker per train at continental scale. Hidden views skip their updates. Spatial indexes accelerate route planning, traffic conflict checks, and selection; the original exact curve and collision rules remain in use. Device pixel ratio is capped, shadows follow the local camera, and the camera fits portrait and landscape viewports. See [PERFORMANCE.md](PERFORMANCE.md) for reproducible measurements and limits.
