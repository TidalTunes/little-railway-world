# Little Railway World

## Register

brand

## Users and purpose
A browser-based art prototype for an isometric train game. The current iteration is a self-running simulation with a complete Earth globe with cities and rail networks across the continents, reusable world generation, player ownership colors, and city development levels 1–10. Three camera distances offer a simplified network overview, an isometric world, and a close isometric view with train following. Detailed views hold a fixed 45° inclination above the local ground; dragging rotates heading around the focus and WASD moves that focus across the surface. Earth remains spherical at every distance; the Europe section and planar presets remain available. There is no gameplay, editor UI, or visible text.

## Direction from the brief
Low-poly trains, isometric trees, miniature cities connected by working railway routes, and small details that make the landscape feel alive. Publish iterations to the existing GitHub Pages site. Support authored city and route layouts subject to geometric feasibility, automatic river bridges and mountain tunnels, and strict asset clearance. Let users zoom out to understand the network and select a train to follow it closely.

The default map covers the complete Earth, including Antarctica, on a sphere of radius 1,600 world units. Real coastlines and major lakes anchor the geography. Authored biomes, polar ice, and continuous faceted mountain ranges create recognizable continental landscapes. Rail networks are schematic and remain on their respective land masses. The fifty-city Europe section, sixteen-city showcase, and stress presets remain available.

## Art decisions
A sunlit, handmade model railway on a full Earth globe: colored meadows, a blue river, compact towns, mountain forest, farms, and simple stone bridges. Keep the scene legible when zoomed out to many cities and trains. The emotional goals are curiosity, calm, and delight. The trains are the focal moving objects.

At the farthest distance, the same geography becomes a sparse network map: broad terrain and water regions, restrained mountain contours, railways, live trains, and one city glyph per settlement. Its size and silhouette convey development, while its color identifies the owner. Individual scenery is reserved for closer views. The close camera looks down on the miniature and follows a selected train without a separate simulation or visible control panel.

Cities develop from compact settlements along winding lanes into dense neighborhoods with apartments, civic buildings, plazas, and towers. Farmland forms coherent groups of neighboring cultivated plots. Player color families carry consistently through their architecture and trains. Ownership and level are editable authoring data; this iteration has no progression or management actions.

## Design principles

- The whole viewport is the world.
- A believable miniature, with carefully made silhouettes and details.
- Motion reveals the geography and connects places.
- The far map prioritizes cities, ownership, and connections over decorative detail.
- No HUD, labels, marketing content, scores, or game mechanics.
- Let the user inspect the art with discreet camera gestures.

## Accessibility
Provide a canvas description, visible keyboard focus, and keyboard equivalents for camera and train selection. + / − zoom; WASD pans in four directions; arrow keys orbit the world or pan map and close views; F follows the visible train nearest the centre; [ / ] cycle active trains; Escape leaves follow; Home resets; Space pauses; R regenerates. Tab retains normal focus navigation. Click and touch selection distinguish taps from drags and multi-touch gestures.

Respect reduced motion by starting the simulation paused and making camera transitions immediate. Suspend animation while the tab is hidden. The experience is visual art; no information or task depends on interpreting color.
