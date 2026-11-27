# Little Railway World

## Register

brand

## Users and purpose
A browser-based low-poly world, now beginning with a playable settlement loop on a compact flat island. You spawn as a station-passenger-sized traveller near one teal house in a forest clearing. Trees can be chopped with the axe: each falls, disappears, and awards 2–4 logs. Ten logs builds another house. A transparent cube checks terrain, clearance and affordability. The square lot follows your facing direction; its door chooses one of four sides, with a seeded probability favoring the settlement's center of mass. Placement fixes that orientation. Small translucent corner icons and a pictorial woodpile show tools and resources without visible words. Gameplay state lasts for the current session.

Three nearby homes form a city and create their connecting footpaths; one or two homes remain an outpost without roads. City levels 1–5 begin at 3, 6, 9, 12 and 15 homes, adding a well, market, water tower, fountain plaza and town hall respectively. A level numeral identifies each city from above, while its landmarks identify progress at ground level. Earned landmarks wait for a clear, connected site and do not count as homes. The other civic assets remain available for future special city types; train stations are excluded. Each home in a city has one resident, including the first three when the city forms. Residents wander its actual paths.

The same world supports third-person walking, an isometric miniature and a simplified map. V switches between the traveller and overview. WASD moves, Shift runs, Space jumps, E or a click chops. B selects a house blueprint; pointer movement aims it, your facing direction sets its square lot, click or Enter builds, and Escape cancels. Overview placement uses the viewing direction. The complete Earth and the earlier populated island remain explicit art presets.

## Direction from the brief
Low-poly trains, isometric trees, miniature cities connected by working railway routes, and small details that make the landscape feel alive. Publish iterations to the existing GitHub Pages site. Support authored city and route layouts subject to geometric feasibility, automatic river bridges and mountain tunnels, and strict asset clearance. Let users zoom out to understand the network and select a train to follow it closely.

The default settlement island has no generated cities, stations, tracks or trains. Its mountain spine, river and inland lake, sheltered bays, cultivated valleys, woodland and dune coast reuse the authored island geography. It opens directly in third person beside the starting home. The earlier eight-town railway island remains at `?layout=island`. The geography stays fixed when scenery is regenerated, giving future game systems a repeatable test environment. The saved Earth map remains at `?layout=earth`, with its 96 cities, 250 trains, real coastlines and polar terrain. The `earth-art-v1` Git tag preserves the complete version before this switch. Europe, the sixteen-city showcase, and stress presets also remain available.

## Art decisions
A painted model railway with warm daylight and moonlit nights: colored meadows, a blue river, compact towns, mountain forest, farms, and simple stone bridges. Day and night automatically last five minutes each, with gradual dusk and dawn. Keep the scene legible when zoomed out to many cities and trains. The emotional goals are curiosity, calm, and delight. The trains are the focal moving objects.

At the farthest distance, the same geography becomes a sparse network map: broad terrain and water regions, restrained mountain contours, railways and live trains. Playable cities use owner-colored level numerals 1–5 in place of building logos; outposts have no city marker. Individual scenery is reserved for closer views. The close camera looks down on the miniature and follows a selected train without a separate simulation or visible control panel.

Cities develop from compact settlements along winding lanes into dense neighborhoods with apartments, civic buildings, plazas, and towers. Farmland forms coherent groups of neighboring cultivated plots. Player color families carry consistently through their architecture and trains. Ownership and level remain editable authoring data in the saved art presets. The default island starts smaller, with resource gathering and individual house construction.

## Design principles

- The whole viewport is the world.
- A believable miniature, with carefully made silhouettes and details.
- Motion reveals the geography and connects places.
- The far map prioritizes cities, ownership, and connections over decorative detail.
- Keep gameplay controls compact and contextual; the landscape remains the main surface.
- Let the user inspect the art with discreet camera gestures.

## Accessibility
Provide a canvas description, visible keyboard focus, and keyboard equivalents for camera and train selection. + / − zoom; WASD pans in four directions; arrow keys orbit the world or pan map and close views; F follows the visible train nearest the centre; [ / ] cycle active trains; Escape leaves follow; Home resets; Space pauses motion in strategy views and jumps in third person; V toggles walking; Shift runs; E or a click/tap swings the axe in third person; Escape returns to the overview. B selects house placement, Enter builds and Escape cancels before leaving third person. R regenerates only in the saved art presets. Tab retains normal focus navigation. Click and touch selection distinguish taps from drags and multi-touch gestures.

Respect reduced motion by starting motion paused and making camera transitions immediate. Suspend animation while the tab is hidden; the day/night calendar continues independently of motion pause and catches up on return. Placement validity and settlement membership use distinct symbols as well as color. All controls have accessible names and state announcements, without visible labels or tooltips. City level numerals are the only visible numbers.
