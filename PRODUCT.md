# Little Railway World

## Register

brand

## Users and purpose
A browser-based low-poly world, now beginning with a playable settlement loop on a compact flat island. You spawn as a station-passenger-sized traveller near one teal house in a forest clearing. Trees can be chopped with the axe: each falls, disappears, and awards 2–4 logs. Ten logs builds another house. A transparent house blueprint checks terrain, clearance and affordability; nearby houses connect into a settlement, while isolated houses form outposts. Inventory and a small tool shelf provide the first gameplay UI. Gameplay state lasts for the current session.

The same world supports third-person walking, an isometric miniature and a simplified map. V switches between the traveller and overview. WASD moves, Shift runs, Space jumps, E or a click chops. B selects a house blueprint; pointer movement aims it, Q/R rotates it, click or Enter builds, and Escape cancels. The complete Earth and the earlier populated island remain explicit art presets.

## Direction from the brief
Low-poly trains, isometric trees, miniature cities connected by working railway routes, and small details that make the landscape feel alive. Publish iterations to the existing GitHub Pages site. Support authored city and route layouts subject to geometric feasibility, automatic river bridges and mountain tunnels, and strict asset clearance. Let users zoom out to understand the network and select a train to follow it closely.

The default settlement island has no generated cities, stations, tracks or trains. Its mountain spine, river and inland lake, sheltered bays, cultivated valleys, woodland and dune coast reuse the authored island geography. It opens directly in third person beside the starting home. The earlier eight-town railway island remains at `?layout=island`. The geography stays fixed when scenery is regenerated, giving future game systems a repeatable test environment. The saved Earth map remains at `?layout=earth`, with its 96 cities, 250 trains, real coastlines and polar terrain. The `earth-art-v1` Git tag preserves the complete version before this switch. Europe, the sixteen-city showcase, and stress presets also remain available.

## Art decisions
A painted model railway with warm afternoon and moonlit night modes: colored meadows, a blue river, compact towns, mountain forest, farms, and simple stone bridges. Keep the scene legible when zoomed out to many cities and trains. The emotional goals are curiosity, calm, and delight. The trains are the focal moving objects.

At the farthest distance, the same geography becomes a sparse network map: broad terrain and water regions, restrained mountain contours, railways, live trains, and one city glyph per settlement. Its size and silhouette convey development, while its color identifies the owner. Individual scenery is reserved for closer views. The close camera looks down on the miniature and follows a selected train without a separate simulation or visible control panel.

Cities develop from compact settlements along winding lanes into dense neighborhoods with apartments, civic buildings, plazas, and towers. Farmland forms coherent groups of neighboring cultivated plots. Player color families carry consistently through their architecture and trains. Ownership and level remain editable authoring data in the saved art presets. The default island starts smaller, with resource gathering and individual house construction.

## Design principles

- The whole viewport is the world.
- A believable miniature, with carefully made silhouettes and details.
- Motion reveals the geography and connects places.
- The far map prioritizes cities, ownership, and connections over decorative detail.
- Keep gameplay controls compact and contextual; the landscape remains the main surface.
- Let the user inspect the art with discreet camera gestures.

## Accessibility
Provide a canvas description, visible keyboard focus, and keyboard equivalents for camera and train selection. + / − zoom; WASD pans in four directions; arrow keys orbit the world or pan map and close views; F follows the visible train nearest the centre; [ / ] cycle active trains; Escape leaves follow; Home resets; Space pauses in strategy views and jumps in third person; V toggles walking; Shift runs; E or a click/tap swings the axe in third person; Escape returns to the overview; N toggles day and night. B selects house placement, Q/R rotates, Enter builds and Escape cancels before leaving third person. R regenerates only in the saved art presets. Tab retains normal focus navigation. Click and touch selection distinguish taps from drags and multi-touch gestures.

Respect reduced motion by starting the simulation paused and making camera transitions immediate. Suspend animation while the tab is hidden. Placement validity and settlement membership use words and symbols as well as color.
