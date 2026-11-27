# First economy: households and freight

This is an economic prototype for the opening 5–15 minutes. It creates a decision between holding coins, investing in population, and building a supply network. It does not claim a solved competitive balance or validated player enjoyment. Military spending remains a later system.

## Rules

There are three physical goods: timber, grain and tools. Coins belong to owners; goods belong to city depots. Carried timber remains a personal building reserve and is never silently exported. A deliberate deposit near an owned city transfers it into that city's depot for production or export. Neutral farm villages trade from a separate gray account and never pay tribute to the human.

Each player starts with a house, 12 carried timber and 12 coins. One axe strike fells a tree and gives 4–6 timber. Houses cost eight timber; after the first city has formed, a house also requires two tools. Construction draws carried timber first and then the depot of an owned city with a home within ten units. Tools must be in that nearby depot. The shared construction authority still enforces actual footprints, paths and player reach.

A formed city chooses one industry. The first industry change for an owner's first city is free. Later changes cost six timber and have a 60-second cooldown. New-city creation and city merges grant no free goods. Industry changes preserve stocks. A matching biome adds 15% output: forests favor lumber, farmland favors farms, and mountains favor workshops. Fractional output carries between pulses.

Every 20 simulation seconds:

| Industry | Base output per city level | Input |
| --- | ---: | --- |
| Lumber | 4 timber | None |
| Farm | 4 grain | None |
| Workshop | 2 tools | One timber per tool produced |

Each three homes, rounded up, need one grain. This demand continues above fifteen homes even though the visual city level stops at five. A grain shortage reduces income without killing residents or destroying a settlement. Tool service consumes up to one tool per visual city level. A complete tool service raises production 50%. Every owned city below fifteen homes protects two tools from optional service, so a delivery saved for construction cannot vanish into a production bonus. Workshops also protect eight timber from automatic conversion, leaving a complete construction kit available.

Income is minted only on a pulse:

`1 + fedHomes + floor(fedHomes × toolsServed / grainNeeded)`

Here `fedHomes = floor(houseCount × grainConsumed / grainNeeded)`. Food and tools together can double the household contribution. NPC population, rendering, movement, delivery count and track length never mint money. Tool-supported income applies only to fed households. A disconnected farm can earn modest income; a large industrial town needs reliable imports to realize its higher earning potential.

## Trade and transport

Fixed unit prices are one coin per timber, one per grain and three per tool. A cross-owner shipment debits its buyer into escrow and removes its seller's goods at departure. Arrival moves the goods into the destination depot and releases exactly that escrow to the seller. Same-owner transfers have no payment. Neither transaction creates currency.

Each connected station supplies one automatic train. Trains carry up to six units, travel at five world units per second and dwell for four seconds at each terminal. They choose useful demand automatically and use the shortest valid physical railway route, including branches and intermediate stations. Stations permit reversals; switches do not permit impossible U-turns. Trains return physically and can carry useful backhaul. Train cars follow the actual rail geometry and reverse by pushing the wagon rather than spinning their bodies in place.

Dispatch reserves the whole round trip, including undirected track pieces and station/switch occupancy. Locks are rebuilt against new graph subdivisions whenever a branch is added, so an existing train cannot conflict with a newly numbered piece. All locks are acquired together, preventing hold-and-wait deadlocks. This conservative first implementation sacrifices throughput on busy shared corridors; extra connections and shorter journeys matter.

Depots cap each good at `24 + 12 × level`. Production stops at available capacity rather than discarding goods. Grain imports target six consumption pulses; farms retain two. Workshops target at least twelve working timber, or six per level, in addition to their eight-timber construction reserve while below fifteen homes. Other owned towns keep eight timber for construction. Tool targets protect growth and service. Incoming cargo reserves demand and warehouse space. Imported stock below those reserves cannot be repeatedly re-exported.

Critical food, workshop inputs and construction tools receive priority, with waiting demand gaining priority over time. The oldest waiting train is admitted first; rotating order only breaks ties. Backhaul must serve the supplier's strongest reachable demand rather than automatically taking goods for the returning train's home. These rules prevent a nearby town from repeatedly consuming all surplus while a distant buyer waits forever.

## Decisions this creates

- **Lumber merchant:** keeps cheap construction timber, sells workshop inputs and connects early. It depends on imported food and tools.
- **Industrialist:** imports timber and turns it into its own growth tools and valuable exports. Growing immediately spends goods that could have become coins.
- **Agrarian:** has reliable early income and can export food. Expansion depends on other towns supplying timber and tools; a saturated food market limits additional trade.
- **Adaptive builder:** builds with a workshop, then pays to become a farm after reaching nine homes. It gives up manufacturing exports to stabilize household income. The payoff depends on when growth and supply arrive.

Ground work remains an opening action and an optional acceleration. Explicitly depositing a few trees can start a workshop or fulfill another city's shortage before the next automatic timber delivery. Automatic production replaces repeated chopping as the main resource source after forming a city. Building placement remains a physical decision. The map layer handles industry choice, supply inspection and railway investment. There is no manual train-route configuration.

## Experiments and iteration

Run `node scripts/simulate-economy.mjs` for the fifteen-minute benchmark, `--long` for thirty minutes, `--compare` for the original production/income constants using the current transport rules, and `--json` for stocks, trade flows and five-minute checkpoints. The benchmark runs the actual economy, physical transport graph, reservations, payments and resource consumption. Each policy receives the same starting wallet and eight five-timber harvests during the first two minutes. Merchants and industrial builders deposit carried timber above an eight-timber personal reserve; agrarians retain their timber for construction. It starts at a formed three-home city and assumes valid construction sites. It is an economic experiment, not a claim about real walking or placement speed.

The first tests exposed two real starvation bugs: roundtrip durations repeatedly aligned with a rotating dispatch order, and convenient backhauls consumed all tools before distant buyers could load any. Oldest-waiting dispatch and demand-aware backhaul corrected both. An earlier tool rule also consumed single imported tools before the player could save two for a home. Workshops could similarly consume every timber delivery before saving enough for a house. Protected construction kits fix both problems. Explicit timber deposits then made early manual work affect production instead of leaving a workshop idle beside a character carrying logs.

The initial balance produced six grain per level and paid only one extra coin per serviced tool. Reducing farm output from six to four alone barely changed outcomes: transport and demand were the binding constraints. Raising tool prices from three to four hurt importers and growth without materially improving the workshop policy. The selected balance keeps tools at three and makes tools improve fed-household income.

Measured fifteen-minute outcomes, shown as **coins / homes**:

| Market | Merchant | Industrialist | Agrarian | Adaptive builder |
| --- | ---: | ---: | ---: | ---: |
| Nearby suppliers, 35-unit access | 151 / 6 | 171 / 9 | 211 / 5 | 210 / 9 |
| Distant suppliers, 125-unit access | 109 / 5 | 123 / 8 | 202 / 3 | 123 / 8 |
| Smaller farm, larger workshop, 80-unit access | 117 / 6 | 122 / 9 | 222 / 3 | 237 / 9 |

For comparison, the original six-grain production and per-level tool-income constants with the same current transport, deposit and reserve rules yield merchant **150 / 6**, industrialist **173 / 9**, agrarian **211 / 5**, and adaptive builder **209 / 9** in the nearby scenario. The largest improvement came from fair delivery, explicit deposits and protected building materials, rather than numerical price changes. These bounded scenarios do not demonstrate that the balance is solved.

Five- and ten-minute checkpoints reveal both investment and supply risk. Near suppliers, the industrialist reaches **72 coins / 8 homes** at five minutes and **148 / 8** at ten; the agrarian has **73 / 3** and **140 / 3**. With the smaller farm, the industrialist instead has **21 / 8** and **44 / 9**: houses do not earn their potential income without food. The adaptive builder follows that initial growth, changes industry, and reaches **237 / 9** at fifteen minutes against the agrarian's **222 / 3**. On distant routes the agrarian's **202 / 3** beats the adaptive builder's **123 / 8**. One policy therefore does not win immediate coins in every tested market.

Farming remains a strong reliable-income strategy, while active industrial growth and adaptation can repay their investment within fifteen minutes. Ground-level playtests, more layouts, human decisions, and future military costs will determine whether those tradeoffs are enjoyable. A merchant on distant routes can still wait fourteen minutes for the first imported growth tools; the alternative is a deliberate industry change and manual deposit, not more repetitive chopping without a plan. The UI must expose missing imports and freight activity rather than leave waits unexplained.

## Verification and limits

Focused tests cover exact pulse timing, large-step versus small-step simulation, conserved goods and currency including escrow and carried construction timber, duplicate arrival safety, ownership, local construction reach, neutral accounts, industry cooldown, warehouse bounds, city merges, live branch additions, fair distant imports, terminal carriage spacing, and food demand above the last visual level. A separate bounded real-island test runs all three bot policies for 900 simulated seconds and checks paid infrastructure, deliveries, growth and complete accounting.

This first transport model reserves whole journeys and has no train purchases, freight fees, station upgrades or player-set prices. The benchmark uses a deliberately shared supplier corridor; it does not prove balance for arbitrary networks. There is no wall-clock offline income. A hidden or paused simulation does not secretly accumulate production. Long-running test scenes should remain closed after inspection, following `AGENTS.md`.
