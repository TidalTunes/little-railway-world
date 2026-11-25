# Railway world format

The planner accepts a JSON-compatible authoring configuration and produces a deterministic scene plan. Cities, tracks, terrain, and scenery share coordinates and clearance rules. The browser renders that plan without text or editor controls. This is an art and simulation prototype; it has no playable economy or world-editor UI.

## Load and inspect

The browser opens the authored [sixteen-city showcase](public/worlds/showcase.json) by default, also available as `?layout=showcase`. Its two connected railway loops span city development levels 1–10. `?layout=classic` uses the earlier generated layout; `?seed=42&cities=12` selects that generator with twelve cities. Seeds can be numbers or strings, and the `cities` parameter accepts 3–20. `?layout=crossroads` loads the authored [seven-city crossing preset](public/worlds/crossroads.json).

The pure `generateWorld()` function and `railway.loadWorld({})` still default to the classic eight-city generator. Loading the browser showcase is a separate startup choice. A seed override changes generated variation while retaining an authored preset's city coordinates and levels.

With the canvas focused, **R** changes the seed while preserving the current authoring settings. **Space** pauses motion. The browser console exposes:

```js
// Compile and display a world; return a copy of its generated plan.
railway.loadWorld({ seed: 42, cityCount: 12 });

// Export the small authoring configuration or inspect the full generated plan.
const configuration = railway.exportWorld();
const plan = railway.inspectWorld();

// Generate and validate without replacing the displayed scene.
const candidate = railway.generateWorld(configuration);
const violations = railway.validateWorld(candidate);
```

`loadWorld` validates and builds the replacement before discarding the displayed world. Invalid configurations throw an error. `exportWorld()` and `inspectWorld()` return copies. An empty validation result means no violations were reported by the validator.

## Coordinates and configuration

Coordinates use metres in the horizontal `x`/`z` plane. Ground is at `y = 0`, railway centre height is `0.42`, and river and ocean water are at `-1.2`. Route elevations supplied in coordinate arrays are ignored; tracks are level in this version.

| Field | Meaning and default |
| --- | --- |
| `seed` | Number or string controlling generation. Default `27`. |
| `bounds` | `{ width, depth }`. Default `{ width: 130, depth: 95 }`; minimum 35 × 30. |
| `cityCount` | Generated city count, rounded and clamped to 3–20. Default 8. Ignored with explicit `cities`. |
| `players` | Nonempty array of `{ id?, name?, color? }`. IDs are unique. Colors accept OKLCH `{ l, c, h }` or `#RRGGBB`; omitted players use the four default railway palettes. |
| `cities` | At least two `{ id?, name?, x, z, ownerId?, level?, radius? }` objects. IDs are unique; omitted IDs become `city-1`, etc. Authored radius defaults to the development level's footprint. |
| `connections` | Complete array of `{ id?, from, to, points?, ownerId?, color? }` connections between different city IDs. Operator defaults to the origin city's owner. |
| `trainOwners` | Optional object mapping train IDs to player IDs. Overrides default ownership for those trains. |
| `minTurnRadius` | Positive finite minimum radius for railway bends. Default `8`. |
| `throatLength` | Nonnegative requested length of each straight city approach. Default `4`; shortened for closely spaced cities. |
| `river` | `{ points, width? }`. Width defaults to `5.4`; points need at least two distinct positions. |
| `mountains` | Array of `{ id?, x, z, radius, height }`. Positive radius and height bound an irregular faceted mountain. Use `[]` for none. |
| `biomes` | Optional `{ sites?, ocean? }` configuration, described below. |
| `outline` | Simple island polygon as `[[x, z], ...]`. Omit for the default twelve-sided tile. |
| `density` | Scattered scenery multiplier, clamped to 0–3; default 1. City buildings and a small baseline of farms are retained independently. |

Connection `points` are intermediate waypoints in travel order; city centres are added automatically at both ends. The alias `waypoints` is also accepted. Points can be `[x, z]` pairs or `{ x, z }` objects. Legacy route colors are `coral`, `teal`, `gold`, and `blue`; owner palettes determine the current train colors.

Without explicit connections, the planner joins cities in array order into a ring. Two cities receive one connection; eight cities also receive two cross-valley connections. Explicit graphs may be disconnected. Duplicate graph edges and unrelated coincident routes are rejected.

Explicit city coordinates disable automatic mountains unless `mountains` is supplied. Generated mountain candidates that do not fit safely are omitted. Authored mountains must fit inside the island and remain clear of the river and its banks.

River waypoints are rounded independently of railway alignments. Place the first and last river points beyond the island edge for a river that enters and leaves the island. The renderer clips water and banks to the outline.

## Players and city development

Players provide a shared identity for cities and trains. The default IDs are `coral`, `teal`, `gold`, and `blue`. Custom player colors are normalized to serializable OKLCH: `l` is 0–1, `c` is 0–0.4, and finite hue values wrap into 0–360 degrees. Six-digit hexadecimal colors are converted to that format. Names remain metadata; the world displays no labels.

Each city has an `ownerId` referencing a player and an integer `level` from 1 through 10. Omitted ownership is chosen deterministically from the city ID and seed. Explicit cities without levels receive stable seeded levels; the classic generator uses level 3 and retains its layout-scaled neighborhood radii. An authored city's omitted radius comes from its level; a positive explicit radius overrides it.

Development controls the neighborhood footprint, building budget, street width and spacing, and available building types. Houses appear at every level; landmarks enter at level 2, apartments and plazas at level 4, civic buildings at level 6, and towers at level 8. Higher levels use larger footprints and denser districts. Geometry and placement variation use the city ID and seed, independently of the player's selected color. Actual building counts depend on safe available space.

The city planner builds a connected street graph on a clear side of the railway, then places buildings facing its edges. Streets stay on dry terrain and clear tracks, river banks, shorelines, mountains, other city footprints, and station platforms. Buildings and decorative scenery reserve full clearance around streets. Constrained plots are skipped; a city can have fewer buildings or no streets when its authored footprint cannot accommodate them.

`city.development` records the resolved `radius`, `buildingBudget`, `streetWidth`, `streetSpacing`, `features`, and `variantSeed`, plus generated `placedBuildings`, `streetCount`, `connectionCount`, and, where development was placed, `placedFeatures`. `world.cityStreets` contains `{ id, cityId, ownerId, points, width }`; each street's points use `{ x, z }` coordinates.

`src/development.js` exports player/color normalization and development rules. `src/player-palette.js` derives `body`, `light`, `dark`, `roof`, `accent`, and `trim` colors from one player color. Those tones are shared by owned architecture and trains. Ownership and development are authoring data; this version has no resource costs, level progression, or management UI.

The far map uses one owner-colored city glyph at its centre. Its size increases at every level, with a house silhouette at levels 1–3, a civic-hall silhouette at 4–6, and a stepped tower at 7–10. Broad terrain, water, restrained mountain contours, railway lines, and live train markers remain visible. Individual scenery and street/building detail belong to the closer views.

## Track geometry and city connections

Each city derives one `railAxis` from its incident connection directions. Tracks use one of two opposing ports on that axis, producing straight shared approaches through the station. Curves join the approaches and any intermediate waypoints using exact straight segments and circular arcs. Adjacent pieces have matching tangents, and every arc respects `minTurnRadius`.

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

Omitting `biomes.ocean` requests an automatic bay. Setting it to `false` disables the bay. An explicit `{ points: [[x, z], ...] }` polygon authors the ocean area and must meet the coast. Both automatic and explicit bays protect complete city neighborhoods, mountain footprints, stations, and railway corridors, including a `0.9`-unit inland beach band. Unsafe explicit oceans are rejected; an automatic bay is omitted if no safe candidate fits. Ocean crossings do not generate bridges in this version; automatic bridges apply to the river.

The generated `world.biomes` contains:

- `regions`: `{ id, type, polygons }` records.
- `land`: dry island area with ocean and beach removed; it includes mountain areas.
- `ocean`, `oceanShore`, and `shoreWidth`: water, the separate beach band, and its width.
- `sites`: the resolved dry-land sites.

Polygon values use the `polygon-clipping` MultiPolygon shape: an array of polygons, each containing an outer ring and optional hole rings, with `[x, z]` coordinates. The river is a separate mask; terrain rendering removes its water and banks from biome surfaces.

`src/biomes.js` exports `createBiomes`, `biomeAt`, `biomeDistance`, and `fitsBiome`. `biomeAt(world, x, z)` returns a biome type, `shore`, or `null` outside. `biomeDistance(world, type, x, z)` is positive inside the selected biome and negative outside. `fitsBiome(world, types, x, z, radius)` tests a complete circular footprint against the union of allowed types. It permits crossing a boundary between two allowed types while keeping the whole asset clear of excluded terrain.

Farms fit farmland; dense groves fit forest, with sparser trees in plains. Cacti fit desert, sheep fit plains, and scattered rocks fit plains or desert. Every accepted placement includes its `biome`.

## Mountains, bridges, and clearances

`src/mountain-shape.js` produces a deterministic irregular heightfield with ridges, secondary peaks, and an offset summit, bounded by the authored radius and height. `mountainHeight` evaluates the same triangulated surface used for rendering. Snow follows the excavated rock faces, so it cannot cap a tunnel opening.

Structure `start` and `end` values are distances along a line. `entry` and `exit` include exact sampled positions and tangents. `line.bridges` spans river water and banks with clearance for the full curved deck width. Bridge decks form continuous ribbons following the alignment.

`line.cuts` records mountain intersections with the full railway corridor, including grazing approaches. `line.tunnels` identifies covered intervals where the complete masonry arch has rock behind it. Records include `mountainId`, portal distances, and `cutStart`/`cutEnd` for the wider excavation. Portal eligibility tests the exact mountain surface across the arch, with additional rock cover. The renderer subtracts the train corridor from the mountain. A shallow crossing without an eligible backed tunnel is excavated as a full-height trench open to the sky.

Scenery uses conservative discs that include roofs and canopies. Placement checks allowed biomes, the island edge, tracks, river banks, mountain footprints, stations, and previously accepted assets. Stations also use oriented rectangle checks against railway and water corridors. Crowded optional scenery and stations are skipped.

Railway corridors require a `1.35`-unit island-edge margin. Shared city approaches are the supported exception to coincident route rejection; unrelated overlapping track sections remain invalid. Fixed railway elevation and one river are current format limits.

## Scene plan and traffic

The compiled plan has `version: 2`. In addition to the geometry and network fields above, it contains `players`, `trainOwners`, `cities`, `cityStreets`, `mountains`, `river`, `bounds`, `outline`, `seed`, and `minTurnRadius`, plus:

- `stations`: positions, rotations, `ownerId`, served city and line IDs, distance along the line, and platform dimensions. The planner first tries the city centre beside its straight rail axis, then offset candidates if needed.
- `placements`: asset `kind`, position, conservative `radius`, `scale`, `rotation`, `variant`, and `biome`. City buildings also include `cityId` and `ownerId`.
- `junctions`: interior crossings as `{ id, x, y, z, lines: [{ lineId, distance }] }`. Recognized shared sections and mutual city endpoints are excluded.

`createNetworkTraffic(world)` in `src/network-traffic.js` returns `mode`, `trains`, `paths`, `reservations`, `update(dt)`, and `sampleTrain(train, offset)`. Time is in seconds; an update of zero leaves traffic unchanged. The renderer samples every carriage separately by its offset along the network path.

Each train state includes an `id`, `homeCityId`, and stable `ownerId`. A circuit train inherits its home city's owner; a shuttle inherits its line's operator. `trainOwners` overrides either default. Entering another city does not change ownership or color. Runtime train IDs and owners are available through the read-only `window.__railway.trains` diagnostics; circuit IDs have the form `circuit-1-train-1`, and shuttle IDs have the form `train-<line-id>`.

The controller looks for continuous directed circuits through the city's transitions and selects a broad circuit in each component where one is found. Circuit trains pass through stations without terminal dwell. Selected circuits do not necessarily use every branch. If circuits exist in only some components, components without a circuit may have no trains. If no circuit exists anywhere, the controller falls back to `src/traffic.js` shuttles.

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
