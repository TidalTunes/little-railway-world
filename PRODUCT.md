# Little Railway World

## Register

brand

## Users and purpose
A browser-based isometric railway world, now using a compact flat island as the environment for designing the game. The current iteration remains a self-running simulation with reusable world generation, player ownership colors, and city development levels 1–10. Four camera layers offer a third-person traveller and a simplified network overview, an isometric world, and a close isometric view with train following. Detailed views hold a fixed 45° inclination above the local ground; dragging rotates heading around the focus and WASD moves that focus across the surface. V smoothly zooms to a persistent walking character with WASD movement, Shift to run, Space to jump and mouse or arrow-key orbit. The character inhabits the exact same terrain and scenery, enriched with nearby wind-swayed vegetation. The traveller remains in the overview, with a small marker when too distant to read. The complete Earth globe is saved as a separate preset, alongside Europe and the earlier planar maps. There is no gameplay loop, editor UI, or visible text yet.

## Direction from the brief
Low-poly trains, isometric trees, miniature cities connected by working railway routes, and small details that make the landscape feel alive. Publish iterations to the existing GitHub Pages site. Support authored city and route layouts subject to geometric feasibility, automatic river bridges and mountain tunnels, and strict asset clearance. Let users zoom out to understand the network and select a train to follow it closely.

The default is a small authored island: eight towns, a mountain spine, a river and inland lake, sheltered bays and offshore islets, cultivated valleys, woodland and a dune coast. It opens directly as an isometric miniature with the whole island framed. The geography stays fixed when scenery is regenerated, giving future game systems a repeatable test environment. The saved Earth map remains at `?layout=earth`, with its 96 cities, 250 trains, real coastlines and polar terrain. The `earth-art-v1` Git tag preserves the complete version before this switch. Europe, the sixteen-city showcase, and stress presets also remain available.

## Art decisions
A painted model railway with warm afternoon and moonlit night modes: colored meadows, a blue river, compact towns, mountain forest, farms, and simple stone bridges. Keep the scene legible when zoomed out to many cities and trains. The emotional goals are curiosity, calm, and delight. The trains are the focal moving objects.

At the farthest distance, the same geography becomes a sparse network map: broad terrain and water regions, restrained mountain contours, railways, live trains, and one city glyph per settlement. Its size and silhouette convey development, while its color identifies the owner. Individual scenery is reserved for closer views. The close camera looks down on the miniature and follows a selected train without a separate simulation or visible control panel.

Cities develop from compact settlements along winding lanes into dense neighborhoods with apartments, civic buildings, plazas, and towers. Farmland forms coherent groups of neighboring cultivated plots. Player color families carry consistently through their architecture and trains. Ownership and level are editable authoring data; this iteration has no progression or management actions.

## Design principles

- The whole viewport is the world.
- A believable miniature, with carefully made silhouettes and details.
- Motion reveals the geography and connects places.
- The far map prioritizes cities, ownership, and connections over decorative detail.
- No HUD, labels, marketing content, scores, or management mechanics.
- Let the user inspect the art with discreet camera gestures.

## Accessibility
Provide a canvas description, visible keyboard focus, and keyboard equivalents for camera and train selection. + / − zoom; WASD pans in four directions; arrow keys orbit the world or pan map and close views; F follows the visible train nearest the centre; [ / ] cycle active trains; Escape leaves follow; Home resets; Space pauses in strategy views and jumps in third person; V toggles walking; Shift runs; Escape returns to the overview; N toggles day and night; R regenerates. Tab retains normal focus navigation. Click and touch selection distinguish taps from drags and multi-touch gestures.

Respect reduced motion by starting the simulation paused and making camera transitions immediate. Suspend animation while the tab is hidden. The experience is visual art; no information or task depends on interpreting color.
