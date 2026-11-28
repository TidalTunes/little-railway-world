# Directed loops and working towns

The default island uses the deliberately small `economy: 'loops'` ruleset. The earlier industry-and-depot prototype remains available in its isolated regression fixtures, but is no longer the launch game. There are no grain requirements, tools, warehouses, industry switches, unit prices, deposits, or automatic free trains in this mode.

## Founding and resources

Each human or rival settler starts with one home, **40 resources, 12 food and zero gold**. An axe strike fells a tree for 4–6 resources. A home costs **eight resources and two food**, must join the existing settlement, and keeps the ordinary footprint, terrain, reach and connecting-path checks. Each owner has one city. Three homes establish level 1; six, nine, twelve and fifteen homes reach levels 2–5. New homes add residents. Level 5 caps the displayed city level, not its population or production.

An owner's resources, food and gold are global totals shown at the top of the screen. Wood and metal share one **Resources** balance; neither has a separate inventory. Goods are not held at a particular house or station.

| Settlement | Product |
| --- | --- |
| Player or rival, in any biome | Resources |
| Gray farming village | Food |

Only gray villages produce food. The launch island gives each gray village six homes and a station. The three competing settlers begin in forest, desert and plains respectively, but all have the same resource production rules.

Production pays in synchronized **one-minute daytime ticks**, one unit per current resident. The first day pays at 60, 120, 180, 240 and 300 seconds. Night lasts from 300 to 600 seconds; the next payout is at 660. There are exactly five production payouts per day, including sunset. A homestead qualifies before it becomes a city, and homes beyond fifteen keep increasing its payout. The population at each boundary determines that entire payout: there is no partial-minute accumulation. Gray villages use the same schedule to produce food.

The calendar is authoritative. Explicit strategy pause and a hidden browser tab freeze the default game calendar, trains and economy together; returning to the game does not replay unattended time. Sparse active updates process every crossed boundary once; rendering and frame rate cannot move a payout. The HUD countdown spans the night to the next actual production boundary and shows five remaining ticks at dawn. Its progress indicator pauses at night.

NPCs visually walk from their real houses to trees, ore faces or fields, work, and return home. Their trips are cosmetic: distance, blocked paths, visibility and sleep do not change the payout or award a second copy. Day and night each last five minutes.

Desert towns receive small ore outcrops placed clear of buildings and paths. Trees cut by players become eligible to regrow after 95 simulation seconds. Regrowth waits if a building, permanent railway clearing, path, or nearby worker would obstruct it. The restored tree has its original position and identity.

## Stations and directed railways

A city receives a free station at level 2, at six homes. Its side and forward orientation are seeded during placement and then remain fixed. Players do not move a new station around while drawing their first connection.

Every track has a direction, shown by arrows in strategy views. These overlays fade out before the third-person camera reaches ground level. A station has an entrance and an exit. Outward connections leave its exit; incoming connections reach its entrance. Branches join the exact forward tangent of existing track. Crossing tracks do not become connected merely because they intersect on the map. Trains cannot reverse at a station or make a U-turn at a switch.

A player may build a track that connects directly to their station, or to a connected approach before that approach reaches another city. Reaching a foreign city does not grant construction access beyond its station. Range is still limited to 140 units between city centers, regardless of endpoint movement or curve length.

A connection costs **two resources per started 48 world units of straight-line city distance**: `2 * ceil(distance / 48)`. Reshaping the spline does not change that price. In overview, **T** selects the railway tool. Click two cities, station ends or tracks, or drag between them. Dragging uses only the endpoints to propose a direct curve; it never traces the gesture. Hover a connection for an immediate preview, choose it, and drag the fixed set of handles to reshape the line. Both station ends are selectable in either order; the editor infers travel direction from their entry/exit roles. A temporarily incorrect direction stays red and editable, with a reason explaining why it cannot be built. **R** reverses the proposed connection direction while preserving explicit anchors. Choosing an already-linked city pair automatically proposes its missing return direction. Distinct corridors may share a city pair; overlapping duplicate rails are rejected. **Enter** confirms a checked route. Invalid direction, protected occupancy and sharp bends prevent placement. Curve warnings follow the actual tight or obstructed section, including endpoint approaches; insufficient resources are an affordability message rather than red geometry. Bridges, mountain passages and scenery removal continue to use the existing construction rules.

A single outward link does not run a train. There must be a complete, physically continuous directed circle back to the owner's station. The graph follows actual rail pieces, station spines and tangent joins. A return link is a distinct paid track, not permission to use the outward rail backwards.

## Buying trains and completing circuits

Click an actual railway or either station end in overview to select a complete circuit through your city. The full circuit receives a clean outline, and its inspector shows the stops, resource manifest and train cost. If several eligible circuits share the clicked section, click it again or use the inspector's arrows to cycle between them. No circuit is chosen automatically, and clicking a city only inspects that city. A train costs **ten resources for the engine plus five per cargo car**. There is one trailing car per additional distinct city: a two-city train costs 15 resources and a three-city train costs 20. The engine is not counted as a paid cargo car. The owner chooses a complete loop from the network, without assigning individual station-to-station freight instructions.

At each visited city:

- The train picks up ten newly created resources at a player or rival city, or ten food at a gray village.
- The city owner receives three newly created gold on an actual arrival. Initial departure never awards gold.

These pickups do **not** consume the visited owner's resources. Population production and railway pickups are independent sources. No per-visit payment is deducted from the train owner. A train collects once at its home station when beginning a circuit, then once at each intermediate station. Returning home delivers the whole cargo into the train owner's global totals. The home arrival pays its gold immediately, even when the train must wait for its next circuit. The next departure loads new home cargo without paying another arrival reward.

Trains travel at five world units per second and pause one second at each visited station. Each distinct city has one assigned car; the home city uses the front steam engine, and other cities use trailing wagons. A stop occurs when that city’s car, rather than the engine, reaches the pickup point. Cars follow the same forward geometry in every view, including the home crossing; all cargo stays with its assigned wagon until home delivery. Current traffic control reserves all source lines and stations of a circuit together. Waiting trains are admitted oldest first; a waiting train does not appear on already occupied rails. This prevents collisions and deadlocks, but extra trains sharing a circuit do not yet improve its throughput. This is a deliberate first traffic model, not a finished signal system.

Each purchased train costs **five resources of upkeep each minute**, including trains waiting for track access and minutes during the night. The first bill is at the next global minute boundary. Population production and upkeep share that boundary; cargo deliveries and station visits keep their own arrival timing.

Unpaid upkeep becomes debt rather than disappearing. New production, mining, chopping and returning cargo repay debt before becoming spendable. The HUD may show a negative net resource balance; construction, railways and train purchases use only nonnegative spendable resources. The engine reports gross production and upkeep due, paid and still unpaid separately.

Resource rates are **estimates per minute**, not early credits. They combine current daytime population output, upkeep for every owned train, and expected goods delivered by owned trains. Gold estimates include foreign trains visiting owned stations. Circuit length, one-second stops and shared-track queues determine expected frequency; two trains sharing a circuit do not double its throughput. At night the population component becomes zero, while train earnings and upkeep remain.

In overview, station popups show the exact loaded or delivered quantity. Small, unboxed resource icons distinguish loaded cargo at intermediate stops and the completed circuit's wallet credit at home. A separate **+3 gold** popup appears for the station owner when that owner is the player. Each minute, a signed settlement popup shows its gross production minus that minute’s upkeep. Deliveries show the full increase in net resources, including any debt repaid; the engine also reports the portion that becomes spendable. Workers' gathering visuals describe cosmetic trips and never credit the wallet. Showing a popup never awards anything a second time.

## Rival settlers

Rivals use ordinary physical movement, tree chopping, house placement, track costs and train purchases. They grow to six homes first, choose a reachable useful partner, fund both directions and retain enough resources for a train and its upkeep. They prefer food-producing gray villages, then use distance to choose practical connections. Once a train runs, they grow toward fifteen homes. Browser route validation runs through the same asynchronous planner as player construction; one pending bot request is allowed at a time.

There are no industry-specific bot policies in this version. A desert rival has the same resource balance and passive rate as a forest rival. Guaranteed small groves let all three rivals gather opening construction resources without an artificial wallet grant. Desert groves use harvestable cacti, which share tree chopping and regrowth rules; natural cacti are sparse compared with forest trees.

## Reproducible checks

Run:

```sh
node scripts/simulate-economy.mjs
node scripts/simulate-economy.mjs --json
node scripts/simulate-economy.mjs --long
```

The benchmark compares a food loop, a resource loop, and a mixed three-city loop at near and distant spacing. It runs the real railway planner, directed graph, purchased train simulation and population production without opening a renderer. Towns start already formed with six homes, 40 resources, 12 food and zero gold; it does not model the time or resources spent constructing those opening homes. A mixed circuit includes a rival-funded connection to the farm. Only the two tracks funded by the human account appear in its railway expenditure. Cosmetic NPC movement is deliberately absent, demonstrating that pathfinding does not affect earnings.

Measured outcomes after fifteen simulation minutes:

| Spacing | Loop | Gold | Resources | Food | Completed laps |
| --- | --- | ---: | ---: | ---: | ---: |
| Near | Food | 69 | 232 | 242 | 23 |
| Near | Resources | 54 | 362 | 12 | 18 |
| Near | Mixed | 39 | 257 | 142 | 13 |
| Distant | Food | 48 | 158 | 172 | 16 |
| Distant | Resources | 39 | 258 | 12 | 13 |
| Distant | Mixed | 27 | 173 | 102 | 9 |

Every scenario earns exactly 60 gross resources from its six residents over these fifteen minutes and pays 75 resources in train upkeep. The first completed circuit takes 38.5–66.75 seconds near and 53.5–91.5 seconds distant, measured at quarter-second steps. Short food circuits support early house growth; resource circuits supply more building and infrastructure material; mixed circuits collect both. Gold now comes from completed station arrivals and begins at zero. Later military spending will give it additional strategic value.

Focused tests check exact minute boundaries, the sunset payout, night suspension and next dawn, absolute-clock and frame-size independence, uncapped population, outpost production, resource-and-food construction, zero-gold train purchases, queued upkeep, debt repayment before spending, signed payouts, asynchronous deliveries, foreign-station rate estimates, continuous train geometry and safe traffic queues. The real-island rival test verifies physical growth, paid directed circuits and actual transport. The older depot economy remains isolated in legacy fixtures and `scripts/simulate-legacy-economy.mjs`.

Follow `AGENTS.md` when testing: keep at most one rendered instance, close it afterward, stop task-owned servers, and run the full suite with limited concurrency.
