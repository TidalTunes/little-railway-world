# Directed loops and working towns

The default island uses the deliberately small `economy: 'loops'` ruleset. The earlier industry-and-depot prototype remains available in its isolated regression fixtures, but is no longer the launch game. There are no grain requirements, tools, warehouses, industry switches, unit prices, deposits, or automatic free trains in this mode.

## Founding and resources

Each human or rival settler starts with one home, **40 resources, 12 food and 50 gold**. An axe strike fells a tree for **one Resource**. Mining a persistent ore deposit also awards one Resource, with **1.2 seconds of work between rewards**. Its cooldown belongs to the player, so clicking faster or changing deposits cannot skip the interval. A home costs **eight resources and two food**, must join the existing settlement, and keeps the ordinary footprint, terrain, reach and connecting-path checks. Each owner has one city. Three homes establish level 1; six, nine, twelve and fifteen homes reach levels 2–5. New homes add residents. Level 5 caps the displayed city level, not its population or production.

An owner's Resources, Food and Gold are global totals shown at the top of the screen. Gold circulates between buyers and suppliers; there is no ongoing train upkeep. Wood and metal share one **Resources** balance; neither has a separate inventory. Goods are not held at a particular house or station.

| Settlement | Product |
| --- | --- |
| Player or rival, in any biome | Resources |
| Gray farming village | Food |

Only gray villages produce food. The launch island gives each gray village six homes and a station. The three competing settlers begin in forest, desert and plains respectively, but all have the same resource production rules.

Production pays in synchronized **one-minute daytime ticks**, one unit per current resident. The first day pays at 60, 120, 180, 240 and 300 seconds. Night lasts from 300 to 600 seconds; the next payout is at 660. There are exactly five production payouts per day, including sunset. A homestead qualifies before it becomes a city, and homes beyond fifteen keep increasing its payout. The population at each boundary determines that entire payout: there is no partial-minute accumulation. Gray villages use the same schedule to produce food. Each village has its own finite stock, starting empty until its first harvest; its available Food appears above the city tag. Player and rival city tags show their available Resources in the same enlarged stock line. Villages cannot borrow another village’s stock.

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

Click an actual railway or either station end in overview to select a complete circuit through your city. The full circuit receives a clean outline, and its inspector shows the stops, resource manifest and train cost. If several eligible circuits share the clicked section, click it again or use the inspector's arrows to cycle between them. No circuit is chosen automatically, and clicking a city only inspects that city. A train costs a flat **20 Resources**, regardless of its number of cars. Each additional distinct destination gets one trailing cargo car. The owner chooses a complete loop from the network, without assigning individual station-to-station freight instructions.

At every departure from home, the train reserves **one Gold per non-home destination**. On reaching a destination, it takes **one actual Resource or Food** from that owner’s wallet (or that gray village’s food stock), creates **one extra unit as a trade bonus**, and loads **two units** into its assigned carriage. Its owner receives the one reserved Gold. If the destination is empty, the fare is refunded and the carriage remains empty. The extra cargo unit is intentional; supplier stock still falls by only one. Empty stops create neither cargo nor bonus. The engine does not collect goods from its own home station. Cargo becomes available in the train owner’s wallet only when the train returns home.

Trains accelerate to **five world units per second**, brake to a stop, and wait **one second at every station**, including home. Each destination has an assigned wagon; the pickup happens when that wagon reaches the station point. Cargo stays with its assigned wagon until home delivery. New rail connections do not move trains already underway: each train retains its purchased circuit geometry.

A purchased train appears at its home station when its whole consist fits safely. Otherwise it waits in a depot queue without overlapping an existing train or charging a departure fare. Physical reservations govern following, crossings and station approaches; the final carriage must clear before another train enters. A train without enough Gold at departure **explodes and is removed**. Returning cargo is delivered first, followed by the one-second home stop. Its reservations are released immediately, so visiting trains can still reach the city. The brief smoke-and-debris effect causes no damage to other assets.

Resource rates are **estimates per minute**, not early credits. They combine daytime population production, imported cargo, exported stock and Gold payments. Estimates account for acceleration, station stops, available supplier stock and available fares; actual transactions happen only at stations. At night population production becomes zero, while trains can continue trading finite stocks. There are no upkeep deductions or debt.

Overview feedback uses small resource and coin symbols at the actual pickup, delivery and payment locations. Settlement popups show daytime production. Workers’ gathering visuals remain cosmetic. None of these effects changes a wallet or awards a second copy.

## Rival settlers

Rivals use ordinary physical movement, tree chopping, house placement, track costs and train purchases. They grow to six homes first, choose a reachable useful partner, fund both directions and retain enough resources for a train. They prefer food-producing gray villages, then use distance to choose practical connections. Once a train runs, they grow toward fifteen homes. Browser route validation runs through the same asynchronous planner as player construction; one pending bot request is allowed at a time.

There are no industry-specific bot policies in this version. A desert rival has the same resource balance and passive rate as a forest rival. Guaranteed small groves let all three rivals gather opening construction resources without an artificial wallet grant. Desert groves use harvestable cacti, which share tree chopping and regrowth rules; natural cacti are sparse compared with forest trees.

## Reproducible checks

Run:

```sh
node scripts/simulate-economy.mjs
node scripts/simulate-economy.mjs --json
node scripts/simulate-economy.mjs --long
```

The benchmark compares a food loop, a resource loop, and a mixed three-city loop at near and distant spacing. It runs the real railway planner, directed graph, purchased train simulation and population production without opening a renderer. Towns start already formed with six homes, 40 Resources, 12 Food and 50 Gold; it does not model the time or resources spent constructing those opening homes. A mixed circuit includes a rival-funded connection to the farm. Only the two tracks funded by the human account appear in its railway expenditure. Cosmetic NPC movement is deliberately absent, demonstrating that pathfinding does not affect earnings.

The benchmarks distinguish an empty completed lap from a delivery. An early train can reach a farm before its first harvest; its fare is refunded and it returns empty. Over fifteen minutes, dedicated food and materials routes specialize in those imports, while longer mixed loops bring both. Distance lowers throughput and increases track investment without changing the flat train price.

Each result reconciles all owner wallets, village stocks, onboard cargo, reserved fares, purchases and production. Gold is conserved across wallets and escrow. Goods accounting includes population production, the explicit one-unit trade bonus per successful pickup, and construction purchases. Supplier withdrawals and minted bonuses are reported separately; loaded cargo equals their sum. Tests also cover an exhausted buyer’s Gold reserve, which destroys the unfunded train after delivering its cargo and clears the track for incoming trade.

Focused tests check minute boundaries, sunset and dawn, frame-independent movement, uncapped population, construction costs, finite pickups, empty refunds, station-car alignment, one-second stops, full-consist spawn queues, shallow crossings, and actual payments. Real-island rival tests verify physical growth, paid directed circuits and transport. The earlier depot economy remains isolated in legacy fixtures and `scripts/simulate-legacy-economy.mjs`.

Follow `AGENTS.md` when testing: keep at most one rendered instance, close it afterward, stop task-owned servers, and run the full suite with limited concurrency.
