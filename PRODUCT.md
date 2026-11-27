# Little Railway World

## Register

brand

## Users and purpose
A browser-based low-poly world, now beginning with a playable settlement loop on a compact flat island. You spawn as a station-passenger-sized traveller near one teal house in a forest clearing. Trees can be chopped with the axe: each falls, disappears, and awards 2–4 logs. Ten logs builds another house. A transparent cube checks terrain, clearance and affordability. The square lot follows your facing direction; its door chooses one of four sides, with a seeded probability favoring the settlement's center of mass. Placement fixes that orientation. Larger numeric log and gold balances sit directly over the landscape, accompanied by small faceted timber and coin symbols. Rust identifies timber and chopping, gold identifies currency, and owner teal identifies city growth and building. The city level remains a numeral on a painted badge with progress toward the next level; keycaps and short action labels make the controls explicit. A small sun or moon accompanies the current phase. Gameplay state lasts for the current session.

New houses and civic buildings reveal upward from their foundations over two seconds, accompanied by a small burst of pale construction dust. Placement, paths and resources take effect immediately; the reveal is cosmetic and becomes instant with reduced motion.

Three nearby homes form a city and create their connecting footpaths; one or two homes remain an outpost without roads. City levels 1–5 begin at 3, 6, 9, 12 and 15 homes, adding a well, market, water tower, fountain plaza and town hall respectively. A level numeral identifies each city from above, while its landmarks identify progress at ground level. Earned landmarks wait for a clear, connected site and do not count as homes. The other civic assets remain available for future special city types; train stations are excluded. Each home in a city has one resident, including the first three when the city forms. Residents are cosmetic: they take short trips to civic landmarks and neighboring homes, pause together, and return home at night, all on their own city’s actual paths. They walk through their doorways and stay hidden indoors until staggered departures at dawn.

Eligible farmland regions contain small neutral villages, each with three gray homes, a well and a level-1 marker. Fields and footpaths gather around these villages. Their gray residents visit nearby farms during the day and return indoors at night. They remain separate from the player's settlement, even when neighboring houses are built.

Three rival settlers on the default island act as stand-ins for future human players. Coral, gold and blue travellers start beside their own homes, walk to real trees, swing their axes for the same 2–4 logs and pay ten logs per new home. Their cities gain the same paths, residents and five civic milestones. Each stops expanding at fifteen homes and level 5. They keep working offscreen without loading scenery meshes. Ownership, money and city membership stay separate; harvested trees and occupied ground are shared.

At sunset, every player-owned house in a formed city earns one gold. Neutral villages, outposts, civic buildings and resident counts do not earn or alter player income. Third person shows the total in a gold notification across the screen; overview shows a small coin rising above each earning house. The calendar records paid days, so revisiting a view or processing another frame cannot pay the same day twice.

The same world supports third-person walking, an isometric miniature and a simplified map. V switches between the traveller and overview. In third person, moving the mouse over the world looks around without dragging; hovering controls or aiming a house pauses cursor look. The cursor hides over the walking scene, becomes a small placement crosshair when building, and uses a faceted pointer in overview. Interface controls keep the ordinary pointer. Touch and pen retain drag look. WASD moves, Shift runs, Space jumps, E or a click chops. B selects a house blueprint; pointer movement aims it, your facing direction sets its square lot, click or Enter builds, and Escape cancels. Overview placement uses the viewing direction. The complete Earth and the earlier populated island remain explicit art presets.

## Direction from the brief
Low-poly trains, isometric trees, miniature cities connected by working railway routes, and small details that make the landscape feel alive. Publish iterations to the existing GitHub Pages site. Support authored city and route layouts subject to geometric feasibility, automatic river bridges and mountain tunnels, and strict asset clearance. Let users zoom out to understand the network and select a train to follow it closely.

The default settlement island starts with one player home and neutral farming villages, without stations, tracks or trains. Its mountain spine, river and inland lake, sheltered bays, cultivated valleys, woodland and dune coast reuse the authored island geography. It opens directly in third person beside the starting home. The earlier eight-town railway island remains at `?layout=island`. The geography stays fixed when scenery is regenerated, giving future game systems a repeatable test environment. The saved Earth map remains at `?layout=earth`, with its 96 cities, 250 trains, real coastlines and polar terrain. The `earth-art-v1` Git tag preserves the complete version before this switch. Europe, the sixteen-city showcase, and stress presets also remain available.

## Art decisions
A painted model railway with warm daylight and moonlit nights: colored meadows, a blue river, compact towns, mountain forest, farms, and simple stone bridges. Day and night automatically last five minutes each, with gradual dusk and dawn. Sunlight and moonlight travel across the local sky, changing the direction and length of shadows; direct light fades at the horizon while ambient light keeps the world legible. N or the day/night button advances to the next phase for testing; it moves the calendar forward and settles sunset income normally. Keep the scene legible when zoomed out to many cities and trains. The emotional goals are curiosity, calm, and delight. The trains are the focal moving objects.

At the farthest distance, the same geography becomes a sparse network map: broad terrain and water regions, restrained mountain contours, railways and live trains. Playable cities use owner-colored level numerals 1–5 in place of building logos; outposts have no city marker. Individual scenery is reserved for closer views. The close camera looks down on the miniature and follows a selected train without a separate simulation or visible control panel.

Cities develop from compact settlements along winding lanes into dense neighborhoods with apartments, civic buildings, plazas, and towers. Farmland forms coherent groups of neighboring cultivated plots. Player color families carry consistently through their architecture and trains. Ownership and level remain editable authoring data in the saved art presets. The default island starts smaller, with resource gathering and individual house construction.

## Design principles

- The whole viewport is the world.
- A believable miniature, with carefully made silhouettes and details.
- Motion reveals the geography and connects places.
- The far map prioritizes cities, ownership, and connections over decorative detail.
- Keep gameplay controls legible, transparent and contextual; the landscape remains the main surface.
- Let the user inspect the art with discreet camera gestures.

## Accessibility
Provide a canvas description, visible keyboard focus, and keyboard equivalents for camera and train selection. + / − zoom; WASD pans in four directions; arrow keys orbit the world or pan map and close views; F follows the visible train nearest the centre; [ / ] cycle active trains; Escape leaves follow; Home resets; Space pauses motion in strategy views and jumps in third person; V toggles walking; Shift runs; E or a click/tap swings the axe in third person; Escape returns to the overview. B selects house placement, Enter builds and Escape cancels before leaving third person. R regenerates only in the saved art presets. N advances to the next day or night for testing. Tab retains normal focus navigation. Click and touch selection distinguish taps from drags and multi-touch gestures.

Respect reduced motion by starting motion paused and making camera transitions and construction reveals immediate. Suspend animation while the tab is hidden; the day/night calendar continues independently of motion pause and catches up on return. Placement validity and settlement membership use short status text as well as color. Controls have visible keycaps and action labels, accessible names, focus states and announcements. Numeric resources, city level and growth progress lead the interface, with a few colored resource and time-of-day symbols supporting the labels. Action labels retain high-contrast neutral ink, with color on their keycaps. There is no separate house-count icon; city progress communicates development.
