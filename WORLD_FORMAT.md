# Railway world format

The planner accepts a JSON-compatible authoring configuration and produces a deterministic scene plan. Cities, tracks, terrain, and scenery share coordinates and clearance rules. The browser renders that plan without text or editor controls. This is an art and simulation prototype; it has no playable economy or world-editor UI.

## Load and inspect

The browser opens the fifty-city Europe preset by default, also available as `?layout=europe`. It uses a north-up overview, geographic source coordinates, and continuous mountain ranges. `src/europe-world.js` exports `createEuropeWorld({seed, trainCount})` and `projectEurope(longitude, latitude)`. The authored [sixteen-city showcase](public/worlds/showcase.json) remains available as `?layout=showcase`; its two connected railway loops span city development levels 1–10. `?layout=classic` uses the earlier generated layout; `?seed=42&cities=12` selects that generator with twelve cities. Seeds can be numbers or strings, and the `cities` parameter accepts 3–20. `?layout=crossroads` loads the authored [seven-city crossing preset](public/worlds/crossroads.json). `?layout=stress&cities=256&trains=2048` opens the large regional network in the 2D overview. Stress city counts must be multiples of 8 from 8–4096; train requests accept 0–32768 in the stress factory. These are input limits, not performance guarantees at every size.

The pure `generateWorld()` function and `railway.loadWorld({})` still default to the classic eight-city generator. Loading the browser preset is a separate startup choice. A seed override changes generated variation while retaining an authored preset's city coordinates and levels.

With the canvas focused, **R** changes the seed while preserving the current authoring settings. **Space** pauses motion. The browser console exposes:

```js
// Compile in a worker and display the coarse world; resolve to a copy of its plan.
await railway.loadWorld({ seed: 42, cityCount: 12 });

// Export the small authoring configuration or inspect the full generated plan.
const configuration = railway.exportWorld();
const plan = railway.inspectWorld();

// Generate and validate without replacing the displayed scene.
const candidate = railway.generateWorld(configuration);
const violations = railway.validateWorld(candidate);
```

`loadWorld` is asynchronous: it validates and compiles the replacement network in a module worker before discarding the displayed world. Invalid configurations reject its promise. Detailed scenery is requested separately as the camera approaches a region. `exportWorld()` and `inspectWorld()` return copies. An empty validation result means no violations were reported by the validator.

## Coordinates and configuration

Coordinates use metres in the horizontal `x`/`z` plane. Ground is at `y = 0`, railway centre height is `0.42`, and river and ocean water are at `-1.2`. Route elevations supplied in coordinate arrays are ignored; tracks are level in this version.

| Field | Meaning and default |
| --- | --- |
| `seed` | Number or string controlling generation. Default `27`. |
| `bounds` | `{ width, depth }`. Default `{ width: 130, depth: 95 }`; minimum 35 × 30. |
| `cityCount` | Generated city count, rounded and clamped to 3–20. Default 8. Ignored with explicit `cities`. |
| `players` | Nonempty array of `{ id?, name?, color? }`. IDs are unique. Colors accept OKLCH `{ l, c, h }` or `#RRGGBB`; omitted players use the four default railway palettes. |
| `cities` | At least two `{ id?, name?, x, z, ownerId?, level?, radius?, railHeading?, throatLength? }` objects. IDs are unique; omitted IDs become `city-1`, etc. Authored radius defaults to the development level's footprint. |
| `connections` | Complete array of `{ id?, from, to, points?, ownerId?, color? }` connections between different city IDs. Operator defaults to the origin city's owner. |
| `trainOwners` | Optional object mapping train IDs to player IDs. Overrides default ownership for those trains. |
| `traffic` | Optional `{ trainCount?, circuits? }`. `trainCount` requests a fleet, subject to safe track capacity. Explicit circuits are `{ id?, segments: [{ lineId, direction: 1 or -1 }] }`; consecutive directed lines must join with matching positions and tangents. |
| `minTurnRadius` | Positive finite minimum radius for railway bends. Default `8`. |
| `throatLength` | Nonnegative requested length of each straight city approach. Default `4`; shortened for closely spaced cities. |
| `rivers` | Optional array of `{ id?, name?, points, width?, smooth? }`. Overrides `river`; `[]` means no rivers. `smooth:false` preserves source polylines. |
| `river` | `{ points, width? }`. Width defaults to `5.4`; points need at least two distinct positions. |
| `mountains` | Array of `{ id?, x, z, radius, height }`. Positive radius and height bound an irregular faceted mountain. Use `[]` for none. |
| `biomes` | Optional `{ sites?, ocean? }` configuration, described below. |
| `outline` | Simple island polygon as `[[x, z], ...]`. Omit for the default twelve-sided tile. |
| `density` | Scenery and cultivated-area multiplier, clamped to 0–3; default 1. City buildings are retained independently; zero omits farms and other scenery. |

Connection `points` are intermediate waypoints in travel order; city centres are added automatically at both ends. The alias `waypoints` is also accepted. Points can be `[x, z]` pairs or `{ x, z }` objects. Legacy route colors are `coral`, `teal`, `gold`, and `blue`; owner palettes determine the current train colors.

Without explicit connections, the planner joins cities in array order into a ring. Two cities receive one connection; eight cities also receive two cross-valley connections. Explicit graphs may be disconnected. Duplicate graph edges and unrelated coincident routes are rejected.

Explicit city coordinates disable automatic mountains unless `mountains` is supplied. Generated mountain candidates that do not fit safely are omitted. Authored individual mountains must fit inside the island and remain clear of rivers and their banks. Geographic ranges instead use land-clipped polygonal footprints and can contain river valleys.

River waypoints are rounded independently of railway alignments. Place the first and last river points beyond the island edge for a river that enters and leaves the island. The renderer clips water and banks to the outline.

## Large networks and regional detail

`src/stress-world.js` exports `createStressWorld({ cities: 256, trains: 2048, seed })`, returning an ordinary authoring configuration. It creates spacious eight-city regional loops, connecting rails, four owners and varied city levels. The default has 256 cities, 287 railway connections and 32 explicit circuits with enough physical track to operate 2,048 trains. Explicit circuits avoid searching a large graph for cycles. Invalid nonmultiples of eight are rejected instead of silently changing the requested city count.

The pure planner supports two compilation modes:

```js
import { generateWorld, generateWorldRegion } from './src/world-model.js';
import { createStressWorld } from './src/stress-world.js';

const network = generateWorld(createStressWorld(), { detail: 'network' });
const detail = generateWorldRegion(network, { x: 190, z: -750, size: 192 });
```

`generateWorld(input)` still generates full detail by default for compatibility. Network mode retains the exact railway alignments, structures, shared sections, transitions, crossings, stations, biome polygons and city metadata, while leaving `placements` and `cityStreets` empty. `detailMode` records the selected mode, `density` retains the normalized scenery density, and `traffic` retains the requested fleet configuration. City development counts in a coarse network are zero until its independent detail packet is inspected. The network is structured-clone-safe; spatial acceleration structures stay in private weak caches and are not serialized.

`generateWorldRegion(network, { x, z, size: 192 })` snaps query coordinates to a fixed grid cell using `Math.floor`, including negative coordinates. Its packet contains `key`, `bounds`, expanded `cullBounds`, `cities`, `stations`, `mountains`, full intersecting `lines`, `placements`, `cityStreets`, and `farmland`. Bounds use `{ minX, minZ, maxX, maxZ }`. Cities, stations and individual mountains belong to the cell containing their centres; their complete geometry may extend outside that cell. Continuous mountain ranges are sliced across every intersecting cell, with matching shared edges. Ordinary scenery reserves its entire footprint and a spacing margin inside its cell. Neighboring city lots remain reserved even when their detailed buildings have not been generated.

Regional generation does not mutate the network or retain an unbounded detail cache. Re-requesting a cell reproduces its detail independently of exploration order. Per-cell scenery seeds and per-city building seeds are separate; neighboring packets have unique asset IDs. Regional detail is deterministic but is not promised to match the legacy full-world scenery pass object for object, because each mode uses different scenery partitioning.

The browser generates networks and compiles regional geometry in a worker. The renderer clips railway drawing ranges and terrain to cell bounds, builds each centre-owned mountain and settlement once, slices continuous ranges, transfers plain geometry buffers, and retains a bounded local GPU cache. The worker also clips and triangulates the global 2D terrain into transferable buffers before the browser adds city and rail overlays. The whole-world overview stays in 2D; detailed 3D content is loaded only around the camera. Global train simulation continues while a distant region has no detailed scenery.

The planner uses conservative bounding-volume trees for railway segments and dynamic spatial grids for object footprints. These discard impossible collision candidates before exact segment, rectangle and circle checks. They do not reduce clearance distances or relax the accepted geometry. Compiled network coordinates should be treated as immutable; authoring changes should generate a replacement network so cached indexes cannot become stale.

Worker geometry batches deduplicate vertices only when every Float32 attribute bit matches, preserving triangle order, hard normal edges and color boundaries. Indexing is retained only when its vertex and index buffers are smaller than the original geometry.

Run `node --expose-gc scripts/benchmark-generation.mjs 3` for generation, validation, regional detail and heap measurements, `node --expose-gc scripts/benchmark-traffic.mjs --stress` for fleet startup and update timings, and `node --expose-gc scripts/benchmark-indexing.mjs 7` for exact vertex indexing cost, buffer sizes and bit-preservation checks on a dense regional packet. Benchmarks report measured results on the machine running them and do not enforce hardware-dependent timing thresholds in tests.

## Players and city development

Players provide a shared identity for cities and trains. The default IDs are `coral`, `teal`, `gold`, and `blue`. Custom player colors are normalized to serializable OKLCH: `l` is 0–1, `c` is 0–0.4, and finite hue values wrap into 0–360 degrees. Six-digit hexadecimal colors are converted to that format. Names remain metadata; the world displays no labels.

Each city has an `ownerId` referencing a player and an integer `level` from 1 through 10. Omitted ownership is chosen deterministically from the city ID and seed. Explicit cities without levels receive stable seeded levels; the classic generator uses level 3 and retains its layout-scaled neighborhood radii. An authored city's omitted radius comes from its level; a positive explicit radius overrides it.

Development controls the neighborhood footprint, building budget, street width and spacing, and available building types. Houses appear at every level; landmarks enter at level 2, apartments and plazas at level 4, civic buildings at level 6, and towers at level 8. Higher levels use larger footprints and denser districts. Geometry and placement variation use the city ID and seed, independently of the player's selected color. Actual building counts depend on safe available space.

The city planner grows a connected network of winding lanes and irregular branches on a clear side of the railway, then clusters buildings facing its edges. Streets stay on dry terrain and clear tracks, river banks, shorelines, mountains, other city footprints, and station platforms. Buildings and decorative scenery reserve full clearance around every segment of each street polyline. Constrained plots are skipped; a city can have fewer buildings or no streets when its authored footprint cannot accommodate them.

`city.development` records the resolved `radius`, `buildingBudget`, `streetWidth`, `streetSpacing`, `features`, and `variantSeed`, plus generated `placedBuildings`, `streetCount`, `connectionCount`, and, where development was placed, `placedFeatures`. `world.cityStreets` contains `{ id, cityId, ownerId, points, width }`; each street's points use `{ x, z }` coordinates.

`src/development.js` exports player/color normalization and development rules. `src/player-palette.js` derives `body`, `light`, `dark`, `roof`, `accent`, and `trim` colors from one player color. Those tones are shared by owned architecture and trains. Ownership and development are authoring data; this version has no resource costs, level progression, or management UI.

The far map uses one owner-colored city glyph at its centre. Its size increases at every level, with a house silhouette at levels 1–3, a civic-hall silhouette at 4–6, and a stepped tower at 7–10. Broad terrain, water, restrained mountain contours, railway lines, and live train markers remain visible. Individual scenery and street/building detail belong to the closer views.

## Track geometry and city connections

Each city derives one `railAxis` from its incident connection directions. Optional `railHeading` supplies a finite angle in radians from +x toward +z; optional city `throatLength` overrides the global approach length, still shortened for nearby cities. Tracks use one of two opposing ports on that axis, producing straight shared approaches through the station. Curves join the approaches and any intermediate waypoints using exact straight segments and circular arcs. Adjacent pieces have matching tangents, and every arc respects `minTurnRadius`.

Waypoints constrain the route, but do not override its turning radius or island clearance. If no accepted alignment fits without a railway loop or an excessively long turn, generation throws an error. Arbitrary coordinates are therefore subject to geometric feasibility.

Each generated line contains:

- `alignment`: `{ segments, length, minRadius, maxCurvature }`. Segments have `type`, `start`, `end`, `length`, `startDistance`, `endDistance`, and `curvature`. Straight segments include `heading`; arc segments include `center`, `radius`, `startAngle`, and `sweep`.
- `points`, `distances`, and `length`: sampled positions with their **true arc-length distances**, rather than the sum of straight chords between samples.
- `fromPort` and `toPort`: `{ cityId, side, x, z, heading }` at the ends of the straight approaches.
- `sharedSections`: references to shared intervals and their render owner.
- `renderRanges`: distance intervals that this line owns for drawing track.
- `stops`, `bridges`, `cuts`, and `tunnels`: distances and infrastructure along the same exact alignment.

`sampleLine(line, distance)` clamps to the open line and evaluates its exact alignment. It returns position, distance, tangent, heading, curvature, and `angle` for a train facing local `+z`.

Connections leaving the same city on the same side can share a physical prefix, including coincident bends after the straight approach. `world.sharedSections` records each shared section as `{ id, cityId, side, ownerLineId, length, points, lines }`; each participating line entry has `{ lineId, start, end, forward }`. One owner renders the shared geometry. Other lines omit that interval from `renderRanges`, avoiding duplicate ballast and rails.

`world.transitions` describes directed, tangent-continuous travel through a city:

```js
{ cityId, fromLineId, fromEnd: 'start', toLineId, toEnd: 'end' }
```

Either end field can be `start` or `end`. Transitions join incident connections on opposite sides of the city's axis; they do not describe a switch animation or an editable switch state.

## Biomes and coastlines

The six biome types are `farmland`, `forest`, `plains`, `desert`, `ocean`, and `mountain`. The default showcase uses four broad seeded Voronoi regions for dry land. Mountain footprints override those regions, and the generator searches for a safe coastal ocean bay. Authored layouts without mountains or without room for a bay may contain fewer types.

Supply `biomes.sites` to replace the four default land sites:

```js
railway.loadWorld({
  seed: 'regional-world',
  biomes: {
    sites: [
      { id: 'western-fields', type: 'farmland', x: -30, z: 15 },
      { id: 'northern-woods', type: 'forest', x: -30, z: -23 },
      { id: 'southern-meadow', type: 'plains', x: 10, z: 25 },
      { id: 'eastern-desert', type: 'desert', x: 35, z: -12 },
    ],
  },
});
```

Sites require finite coordinates inside the island, distinct positions, and unique IDs. Their types can be `farmland`, `forest`, `plains`, or `desert`. Multiple sites may share a type, and an explicit site list may omit types. Mountains still come from `mountains`.

Omitting `biomes.ocean` requests an automatic bay. Setting it to `false` disables the bay. An explicit `{ points: [[x, z], ...] }` polygon authors the ocean area and must meet the coast. Both automatic and explicit bays protect complete city neighborhoods, mountain footprints, stations, and railway corridors, including a `0.9`-unit inland beach band. Unsafe explicit oceans are rejected; an automatic bay is omitted if no safe candidate fits. For these protected island presets, railways stay on dry land. Geographic presets instead supply `biomes.geography: {ocean, landInterior, oceanShore, lakes?, lakeShore?}` as MultiPolygons. This preserves the authored archipelago and clips scenery to it. Rail crossings of geographic water automatically receive bridges; route authoring must choose plausible crossings. Geographic masks should be prepared at consistent precision, with shores buffered offline.

The generated `world.biomes` contains:

- `regions`: `{ id, type, polygons }` records.
- `land`: dry island area with ocean and beach removed; it includes mountain areas.
- `ocean`, `oceanShore`, and `shoreWidth`: water, the separate beach band, and its width.
- `sites`: the resolved dry-land sites.

Polygon values use the `polygon-clipping` MultiPolygon shape: an array of polygons, each containing an outer ring and optional hole rings, with `[x, z]` coordinates. The river is a separate mask; terrain rendering removes its water and banks from biome surfaces.

`src/biomes.js` exports `createBiomes`, `biomeAt`, `biomeDistance`, and `fitsBiome`. `biomeAt(world, x, z)` returns a biome type, `shore`, or `null` outside. `biomeDistance(world, type, x, z)` is positive inside the selected biome and negative outside. `fitsBiome(world, types, x, z, radius)` tests a complete circular footprint against the union of allowed types. It permits crossing a boundary between two allowed types while keeping the whole asset clear of excluded terrain.

Farms fit farmland; dense groves fit forest, with sparser trees in plains. Cacti fit desert, sheep fit plains, and scattered rocks fit plains or desert. Every accepted placement includes its `biome`.

Agricultural districts use a shared orientation and grouped crop palette. Each generated `farm` placement can contain multiple neighboring `parcels`, with local `{ x, z, width, depth, variant }` coordinates inside its `width` and `depth`. Its circular `radius` reserves the complete field group, including dividing paths. `districtId` identifies the coherent agricultural group. The renderer also supports the original single-patch farm shape when parcels are omitted.

## Continuous geographic ranges

`compileMountainRange()` in `src/mountain-ranges.js` accepts a polygon, optional holes, and ridgelines: `{id, polygon: [[x,z],...], ridges: [{points:[[x,z,height],...], width}], cellSize, snowLine?, seed?}`. It returns a JSON-compatible mountain record accepted in `mountains`. The same global triangulated heightfield drives tunnel cover, the rendered rock, and snow. `rangeMeshData(mountain, bounds)` slices that existing surface into closed local volumes; adjacent regions retain matching facet heights. Range footprint checks use the polygon rather than its broad-phase circle.

## Mountains, bridges, and clearances

`src/mountain-shape.js` produces a deterministic irregular heightfield with ridges, secondary peaks, and an offset summit, bounded by the authored radius and height. `mountainHeight` evaluates the same triangulated surface used for rendering. Snow follows the excavated rock faces, so it cannot cap a tunnel opening.

Structure `start` and `end` values are distances along a line. `entry` and `exit` include exact sampled positions and tangents. `line.bridges` spans river water and banks with clearance for the full curved deck width. Bridge decks form continuous ribbons following the alignment.

`line.cuts` records mountain intersections with the full railway corridor, including grazing approaches. `line.tunnels` identifies covered intervals where the complete masonry arch has rock behind it. Records include `mountainId`, portal distances, and `cutStart`/`cutEnd` for the wider excavation. Portal eligibility tests the exact mountain surface across the arch, with additional rock cover. The renderer subtracts the train corridor from the mountain. A shallow crossing without an eligible backed tunnel is excavated as a full-height trench open to the sky.

Scenery uses conservative discs that include roofs and canopies. Placement checks allowed biomes, the island edge, tracks, river banks, mountain footprints, stations, and previously accepted assets. Stations also use oriented rectangle checks against railway and water corridors. Crowded optional scenery and stations are skipped.

Railway corridors require a `1.35`-unit island-edge margin. Shared city approaches are the supported exception to coincident route rejection; unrelated overlapping track sections remain invalid. Railway elevation is fixed; rivers and inland lakes may be supplied independently.

## Scene plan and traffic

The compiled plan has `version: 2`. In addition to the geometry and network fields above, it contains `players`, `trainOwners`, `cities`, `cityStreets`, `mountains`, `river` (the first-river compatibility alias), optional `rivers`, `bounds`, `outline`, `seed`, and `minTurnRadius`, plus:

- `stations`: positions, rotations, `ownerId`, served city and line IDs, distance along the line, and platform dimensions. The planner first tries the city centre beside its straight rail axis, then offset candidates if needed.
- `placements`: asset `kind`, position, conservative `radius`, `scale`, `rotation`, `variant`, and `biome`. City buildings also include `cityId` and `ownerId`.
- `farmland`: generated agricultural `districts`, total reserved field `area`, and `targetArea`. Each district records its ID, position, dimensions, radius, orientation, and parcel count. Available safe land can limit the achieved area.
- `junctions`: interior crossings as `{ id, x, y, z, lines: [{ lineId, distance }] }`. Recognized shared sections and mutual city endpoints are excluded.

`createNetworkTraffic(world)` in `src/network-traffic.js` returns `mode`, `trains`, `paths`, `reservations`, fleet `stats`, `update(dt)`, and `sampleTrain(train, offset)`. Its shared `poseBuffer` is a `Float32Array` with six values per carriage: x, y, z, angle, active flag and owner index. Fleet statistics distinguish requested count from allocated count and safe track capacity. Time is in seconds; an update of zero leaves traffic unchanged. The renderer samples every carriage separately by its offset along the network path.

Each train state includes an `id`, `homeCityId`, and stable `ownerId`. A circuit train inherits its home city's owner; a shuttle inherits its line's operator. `trainOwners` overrides either default. Entering another city does not change ownership or color. Runtime train IDs and owners are available through the read-only `window.__railway.trains` diagnostics; circuit IDs have the form `circuit-1-train-1`, and shuttle IDs have the form `train-<line-id>`.

When `traffic.circuits` is supplied, the controller validates and uses those directed circuits. Otherwise, it looks for continuous directed circuits through the city's transitions and selects a broad circuit in each component where one is found. Circuit trains pass through stations without terminal dwell. Selected circuits do not necessarily use every branch. If circuits exist in only some components, components without a circuit may have no trains. If no circuit exists anywhere, the controller falls back to `src/traffic.js` shuttles.

Shuttles run on eligible lines longer than 12 units, dwell for 2.4 seconds at their stops, and reverse velocity. Stops normally sit 7 units from line ends and are adjusted to station positions where applicable; the controller additionally protects the whole train's endpoint envelope.

Circuit traffic reserves physical conflict areas before the complete train enters them, maintains following gaps, and checks carriage clearance. The shuttle controller reserves crossings and conflicting city approaches. Trains that cannot safely occupy their initial position remain inactive until space is available. Reservations affect simulation movement; the scene exposes no gameplay controls for routing or dispatch.

## Authored layout example

This four-city configuration includes two river bridges and an authored mountain. Paste it into the browser console:

```js
railway.loadWorld({
  seed: 'four-cities',
  bounds: { width: 130, depth: 95 },
  cities: [
    { id: 'northwest', x: -40, z: -25, level: 2, ownerId: 'coral' },
    { id: 'northeast', x:  40, z: -25, level: 4, ownerId: 'teal' },
    { id: 'southeast', x:  40, z:  25, level: 6, ownerId: 'gold' },
    { id: 'southwest', x: -40, z:  25, level: 3, ownerId: 'blue' },
  ],
  river: {
    points: [[-80, 3], [-20, 1], [20, 5], [80, 3]],
    width: 5.4,
  },
  mountains: [
    { id: 'pass', x: 0, z: -25, radius: 8, height: 12 },
  ],
  connections: [
    { id: 'north', from: 'northwest', to: 'northeast', color: 'coral' },
    { id: 'east', from: 'northeast', to: 'southeast', color: 'teal' },
    { id: 'south', from: 'southeast', to: 'southwest', color: 'gold' },
    { id: 'west', from: 'southwest', to: 'northwest', color: 'blue' },
  ],
});
```

## Reproducibility and verification

The same seed and configuration produce the same plan within this implementation. Generation does not read the clock or share mutable random state with animation. Keep the source revision alongside configurations that need exact long-term reproduction, since generation and asset rules can change between revisions.

Malformed coordinates, duplicate IDs, missing city or player references, invalid levels or colors, invalid bounds, infeasible alignments, unsafe ocean polygons, unrelated coincident routes, and invalid mountain geography throw errors. `validateWorld(plan)` reports violations as `{ type, id, detail }`, checking ownership, street connectivity and clearance, route data and curvature, structures, platforms, and scenery footprints.

`src/world-model.js` exports `WORLD_DEFAULTS`, `CLEARANCES`, and helpers including `sampleLine`, `distanceToLine`, `distanceToRoutes`, `distanceToRiver`, `pointSegmentDistance`, `inWorld`, `mountainHeight`, `surfaceHeight`, and `worldSurface`. `worldSurface` distinguishes outside, river water, ocean, shore, mountain, and ground. Surface-height queries describe terrain before railway excavation.

Run `npm test` for the tests in `tests/`. They exercise seeded generation, development and ownership, streets, map simplification and train synchronization, camera controls, authored and rotated crossings, exact alignment continuity, shared render ownership, biome coverage and footprint fit, closed mountain volumes, actual tunnel and trench geometry, asset bounds, continuous circuits, and shuttle reservations.
