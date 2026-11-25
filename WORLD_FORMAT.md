# Railway world format

The world planner accepts a small JSON-compatible authoring configuration and produces a deterministic scene plan. Cities, railways, infrastructure, and scenery use the same coordinate system and clearance rules. The browser renders the plan without showing editor controls or text.

## Try a generated world

Open the site with `?seed=42&cities=12`. The seed can be a number or a string. The `cities` query parameter selects between 3 and 20 generated cities; the default is 8.

Open `?layout=crossroads` to load the authored [Crossroads configuration](public/worlds/crossroads.json) at startup. It has seven irregularly arranged cities, gently bent connections, a diagonal north–south river, two bridges, a mountain tunnel, and an interior crossing shared by two routes. This preset exercises a different topology from the generated showcase.

With the canvas focused, press **R** to generate the next seed. This preserves the current authoring settings and updates the URL's seed. Drag, scroll, and pinch inspect the scene; **Space** pauses its motion.

The browser console exposes:

```js
// Generate and display a world. Returns a copy of its compiled scene plan.
railway.loadWorld({ seed: 42, cityCount: 12 });

// Save this small object to reproduce or edit the current world.
const configuration = railway.exportWorld();

// Inspect routes, structures, stations, scenery, and crossing locations.
const plan = railway.inspectWorld();

// Plan and check a world without changing the displayed scene.
const candidate = railway.generateWorld(configuration);
const violations = railway.validateWorld(candidate); // [] means no reported violations
```

`loadWorld` validates and builds the replacement before discarding the displayed world. Invalid configurations throw an error. `exportWorld()` returns the original authoring configuration; `inspectWorld()` returns the generated data. Both return copies.

## Coordinates and input fields

One world unit is approximately one metre. `x` and `z` are horizontal coordinates; `y` is elevation. Ground is at `0`, railway centre height is `0.42`, and river water is at `-1.2`. Supplied route elevations are ignored: this version uses level railway alignments.

| Field | Meaning and default |
| --- | --- |
| `seed` | Number or string controlling generation. Default `27`. |
| `bounds` | `{ width, depth }`. Default `{ width: 130, depth: 95 }`; minimum 35 × 30. |
| `cityCount` | Generated city count, rounded and clamped to 3–20. Default 8. Ignored when `cities` is supplied. |
| `cities` | At least two `{ id, x, z, radius? }` objects. IDs must be unique; omitted IDs become `city-1`, etc. Radius defaults to `9.6` and controls the neighborhood area. |
| `connections` | Complete array of `{ id?, from, to, points?, color? }` railway connections. `from` and `to` reference different city IDs. |
| `river` | `{ points, width? }`. Points are `[x, z]` pairs or `{ x, z }` objects. Width defaults to `5.4`. |
| `mountains` | Array of `{ id?, x, z, radius, height }` conical mountains. Radii and heights must be positive. Use `[]` for none. |
| `outline` | Optional simple island polygon as `[[x, z], ...]`. Omit for the default twelve-sided tile. |
| `density` | Multiplier for scattered trees, farms, and small details, clamped to 0–3. Default 1. City buildings and a small baseline of farms are retained independently. |

A connection's `points` are **intermediate waypoints**, in travel order. City centres are automatically added at both ends. The alias `waypoints` is also accepted. Corners are rounded inside their control polygon, then sampled by distance. Route colors supported by the art palette are `coral`, `teal`, `gold`, and `blue`.

Without explicit connections, the planner joins the cities in array order into a ring. Two cities receive one connection. Eight cities also receive two cross-valley connections. Explicit city coordinates disable automatically generated mountains unless `mountains` is supplied. Automatically generated mountain candidates that cannot fit safely are omitted.

River waypoints are rounded independently. For a river that enters and leaves the island, place its first and last points beyond the island edge; the renderer clips water and banks to the outline.

## Author a layout

This four-city configuration contains two river bridges and a mountain passage. It can be pasted into the browser console as written:

```js
railway.loadWorld({
  seed: 'four-cities',
  bounds: { width: 130, depth: 95 },
  cities: [
    { id: 'northwest', x: -40, z: -25 },
    { id: 'northeast', x:  40, z: -25 },
    { id: 'southeast', x:  40, z:  25 },
    { id: 'southwest', x: -40, z:  25 },
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

## Generated scene plan

The compiled plan has `version: 1` and the following main collections:

- `lines`: open routes with city IDs, sampled `{ x, y, z }` points, cumulative `distances`, total `length`, `stops`, and structure intervals.
- `stations`: safe platform sites, including `cityId`, `lineId`, distance along the route, position, rotation, and footprint dimensions. The planner attempts one substantial station per city. It skips a station if no candidate fits.
- `placements`: scenery assets with `kind`, position, conservative `radius`, `scale`, `rotation`, and `variant`. City buildings also identify their city.
- `junctions`: interior route crossings, each with `{ id, x, y, z, lines: [{ lineId, distance }] }` for the traffic controller.
- `cities`, `mountains`, `river`, `bounds`, and `outline`: resolved geographic data.

Every structure interval's `start` and `end` are distances along its route, in world units. `entry` and `exit` include sampled position and tangent data.

`line.bridges` covers the river, banks, and full deck width at oblique crossings. `line.cuts` records every intersection between a mountain and the railway corridor, including a train grazing the mountain's outer flank. `line.tunnels` is the subset with enough rock to back a complete masonry portal. Tunnel records contain `mountainId`, portal distances, and `cutStart`/`cutEnd` for the wider excavation. A shallow crossing creates an open cutting rather than an unsupported tunnel facade.

Tunnel eligibility checks the complete arch against the inscribed profile of the rendered 24-sided mountain. This keeps portal masonry inside rock even on tall mountains or tangential routes. The renderer subtracts the actual train corridor from the mountain geometry.

## Clearance and traffic rules

Scenery uses conservative footprint discs that include roofs and tree canopies. Placement checks the island edge, all railway corridors, river banks, mountains, stations, and every previously accepted asset. Stations additionally use oriented rectangle checks against railways and water. Crowded optional scenery is omitted instead of intersecting an occupied area.

Railway corridors must fit inside the island with a 1.35-unit edge margin. Mountains must fit inside the island and stay outside the river and its banks. Positive-length coincident routes are rejected: represent a shared railway segment as one connection. Explicit graphs need not be connected, so separate railway networks are possible.

Interior crossings are at grade. Their junction metadata allows the traffic controller to reserve the crossing for a complete train. Shared city endpoints are excluded from interior junctions; trains reverse at their stops before reaching those endpoints. Stops normally sit 7 units from each route end and match the actual station distance when one is present. Very short routes use proportional stop distances.

This format currently supports one river, circular conical mountain footprints, fixed railway elevation, and one shuttle per connection. It does not encode switches, shared track ownership, elevation editing, or a playable economy. Those can be added to the authoring configuration without moving placement rules into rendering code.

## Reproducibility and validation

Within this implementation, the same seed and authoring configuration produce the same plan, regardless of previous worlds. A local seeded generator controls placement; generation does not read the clock or share mutable random state with animation. Asset and generation rules may evolve between source revisions, so keep the source revision alongside configurations that require exact long-term reproduction.

Malformed coordinates, duplicate IDs, missing city references, invalid bounds, overlapping routes, and invalid mountain geography throw a descriptive `TypeError`. `validateWorld(plan)` returns geometric violations as `{ type, id, detail }` objects, checking routes, structures, platform clearance, and scenery footprints. It returns an empty array for a clean generated plan.

The pure helpers are exported from `src/world-model.js`: `sampleLine`, `distanceToLine`, `distanceToRoutes`, `distanceToRiver`, `pointSegmentDistance`, `inWorld`, `mountainHeight`, `surfaceHeight`, and `worldSurface`. `WORLD_DEFAULTS` and `CLEARANCES` expose the shared geometric contract. `sampleLine(line, distance)` clamps to an open route and returns position, tangent, and the rotation for a train facing local `+z`.

Run the geometry and generation checks with:

```sh
node --test tests/*.test.js
```
