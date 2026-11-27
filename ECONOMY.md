# Directed loops and working towns

The default island uses the deliberately small `economy: 'loops'` ruleset. The earlier industry-and-depot prototype remains available in its isolated regression fixtures, but is no longer the launch game. There are no grain requirements, tools, warehouses, industry switches, unit prices, deposits, or automatic free trains in this mode.

## Founding and resources

Each human or rival settler starts with one home, 12 wood and 60 gold. An axe strike fells a tree for 4–6 wood. A home costs eight wood, must join the existing settlement, and keeps the ordinary footprint, terrain, reach and connecting-path checks. Each owner has one city. Three homes establish level 1; six, nine, twelve and fifteen homes reach levels 2–5. New homes add workers.

An owner's wood, metal, food and gold are global totals shown at the top of the screen. Goods are not held at a particular house or station. The biome at the founding home fixes the town's product, so growth across a biome border does not unexpectedly change it.

| Town | Product |
| --- | --- |
| Player or rival founded in forest | Wood |
| Player or rival founded in desert | Metal |
| Player or rival founded in plains | Gold |
| Player or rival in any other supported land biome | Gold |
| Gray farming village | Food |

Only gray villages produce food. The launch island gives each gray village six homes and a station. The three competing settlers begin in forest, desert and plains respectively.

Production comes from visible work, not a city-level timer. A worker leaves their actual house, walks to a reachable tree, ore face, field gate or civic frontage, works, and returns home carrying the result. A completed trip adds one unit to the owner's total. Unique completion IDs prevent the same trip being credited twice. A blocked route produces nothing. Workers return indoors at night; a bundle already collected can be delivered on that return. Day and night each last five minutes.

Desert towns receive small ore outcrops placed clear of buildings and paths. Trees cut by players or workers become eligible to regrow after 95 simulation seconds. Regrowth waits if a building, permanent railway clearing, path, or nearby worker would obstruct it. The restored tree has its original position and identity.

## Stations and directed railways

A city receives a free station at level 2, at six homes. Its side and forward orientation are seeded during placement and then remain fixed. Players do not move a new station around while drawing their first connection.

Every track has a direction, shown by arrows in strategy views. These overlays fade out before the third-person camera reaches ground level. A station has an entrance and an exit. Outward connections leave its exit; incoming connections reach its entrance. Branches join the exact forward tangent of existing track. Crossing tracks do not become connected merely because they intersect on the map. Trains cannot reverse at a station or make a U-turn at a switch.

A player may build a track that connects directly to their station, or to a connected approach before that approach reaches another city. Reaching a foreign city does not grant construction access beyond its station. Range is still limited to 140 units between city centers, regardless of endpoint movement or curve length.

A connection costs `8 + ceil(city distance / 50)` gold. In overview, **T** selects the railway tool. Click two cities, station ends or tracks, or drag between them. Dragging uses only the endpoints to propose a direct curve; it never traces the gesture. Hover a connection for an immediate preview, choose it, and drag the fixed set of handles to reshape the line. Both station ends are selectable in either order; the editor infers travel direction from their entry/exit roles. A temporarily incorrect direction stays red and editable, with a reason explaining why it cannot be built. **R** reverses the proposed connection direction while preserving explicit anchors. Choosing an already-linked city pair automatically proposes its missing return direction. Distinct corridors may share a city pair; overlapping duplicate rails are rejected. **Enter** confirms a checked route. Invalid direction, protected occupancy and sharp bends prevent placement. Curve warnings follow the actual tight or obstructed section, including endpoint approaches; insufficient gold is an affordability message rather than red geometry. Bridges, mountain passages and scenery removal continue to use the existing construction rules.

A single outward link does not run a train. There must be a complete, physically continuous directed circle back to the owner's station. The graph follows actual rail pieces, station spines and tangent joins. A return link is a distinct paid track, not permission to use the outward rail backwards.

## Buying trains and completing circuits

Click an actual railway or either station end in overview to select a complete circuit through your city. The full circuit receives a clean outline, and its inspector shows the stops, resource manifest and train cost. If several eligible circuits share the clicked section, click it again or use the inspector's arrows to cycle between them. No circuit is chosen automatically, and clicking a city only inspects that city. A train costs **10 gold per distinct city on the selected loop**: 20 for two cities, 30 for three, and so on. The owner chooses a complete loop from the network, without assigning individual station-to-station freight instructions.

At each visited city:

- If the city produces wood, metal or food, the train picks up ten newly created units of that resource.
- The city owner receives three newly created gold.
- A gold-producing city gives the visit payment but adds no resource cargo.

These pickups do **not** consume the visited owner's resources. NPC work and railway pickups are independent sources. No purchase payment is deducted from the train owner during visits. A train collects once at its home station when beginning a circuit, then once at each intermediate station. Returning home delivers the whole cargo into the train owner's global totals. Beginning another circuit starts another home visit; it is not counted as two pickups on the completed lap.

Trains travel at five world units per second and pause one second at each visited station. Each distinct city has one assigned car; the home city uses the front steam engine, and other cities use trailing wagons. A stop occurs when that city’s car, rather than the engine, reaches the pickup point. Cars follow the same forward geometry in every view, including the home crossing; all cargo stays with its assigned wagon until home delivery. Current traffic control reserves all source lines and stations of a circuit together. Waiting trains are admitted oldest first; a waiting train does not appear on already occupied rails. This prevents collisions and deadlocks, but extra trains sharing a circuit do not yet improve its throughput. This is a deliberate first traffic model, not a finished signal system.

In overview, resource popups appear at the actual worker or station position with the exact quantity. A worker's **Gathered** popup marks collection at a resource node. Plain resource icons and quantities mark its credited return home. A train's **On board** popup marks its newly loaded cargo; the same unframed resource icons mark the completed circuit's wallet credit. A separate **+3 gold** popup appears for the station owner when that owner is the player. Collection captions distinguish carried resources from the plain credited gains; showing a popup never awards anything a second time.

## Rival settlers

Rivals use ordinary physical movement, tree chopping, house placement, track costs and train purchases. They grow to six homes first, choose a reachable useful partner, fund both directions and retain enough money for a train. They prefer missing wood or food and otherwise a different product. Once a train runs, they grow toward fifteen homes. Browser route validation runs through the same asynchronous planner as player construction; one pending bot request is allowed at a time.

There are no industry-specific bot policies in this version. A desert rival gathers metal because of its starting location, not because it can change its town into a workshop. Guaranteed small groves let all three rivals gather their opening construction wood without an artificial wallet grant. Desert groves use harvestable cacti, which share tree chopping and regrowth rules; natural cacti are sparse compared with forest trees.

## Reproducible checks

Run:

```sh
node scripts/simulate-economy.mjs
node scripts/simulate-economy.mjs --json
node scripts/simulate-economy.mjs --long
```

The benchmark compares a food loop, a metal loop, and a mixed three-city loop at near and distant spacing. It runs the real railway planner, directed graph, purchased train simulation, resource-worker movement and five-minute day/night cycle without opening a renderer. Towns start already formed with six homes, 12 wood and 60 gold; it does not model the time or wood spent constructing those opening homes. A mixed circuit includes a rival-funded mine-to-farm connection. Only the two tracks funded by the human account appear in its railway expenditure. Each scenario uses the same founding sites and available resource nodes.

Measured outcomes after fifteen simulation minutes:

| Spacing | Loop | Gold | Wood | Metal | Food | Completed laps |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Near | Food | 92 | 282 | 0 | 230 | 23 |
| Near | Metal | 77 | 233 | 180 | 0 | 18 |
| Near | Mixed | 52 | 183 | 130 | 130 | 13 |
| Distant | Food | 69 | 212 | 0 | 160 | 16 |
| Distant | Metal | 60 | 183 | 130 | 0 | 13 |
| Distant | Mixed | 38 | 143 | 90 | 90 | 9 |

The first completed circuit takes 38.5–66.75 seconds in the near scenario and 53.5–91.5 seconds in the distant scenario, measured at quarter-second simulation steps. These results expose the current tradeoff: short circuits return more frequently, while longer mixed circuits supply a broader resource collection. Metal and food do not yet have spending sinks, so these measurements cannot establish a winning competitive strategy or monetary value for diversification. Military costs and later construction recipes will determine those values.

Focused tests check global and exactly-once worker credit, no timer production, stable founding biomes, contiguous ownership, paid train creation, incomplete-loop rejection, pickup creation without source deductions, home-only delivery, frame-size independence, continuous forward geometry, construction jurisdiction, and safe train queues. A separate 900-second real-island simulation verifies physical rival growth, paid outward and return tracks, completed circuits and gold accounting. The older depot economy is tested separately using explicit legacy configuration and `scripts/simulate-legacy-economy.mjs`.

Follow `AGENTS.md` when testing: keep at most one rendered instance, close it afterward, stop task-owned servers, and run the full suite with limited concurrency.
