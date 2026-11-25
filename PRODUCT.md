# Little Railway World

## Register

brand

## Users and purpose
A browser-based art prototype for an isometric train game. The current iteration is a self-running simulation with readable art, a reusable world-generation system, and three camera distances: a flat map, an isometric world, and an overhead close view with train following. There is no gameplay, editor UI, or visible text.

## Direction from the brief
Low-poly trains, isometric trees, miniature cities connected by working railway routes, and small details that make the landscape feel alive. Publish iterations to the existing GitHub Pages site. Support authored city and route layouts subject to geometric feasibility, automatic river bridges and mountain tunnels, and strict asset clearance. Let users zoom out to understand the network and select a train to follow it closely.

## Art decisions
A sunlit, handmade model railway viewed from above: colored meadows, a blue river, compact towns, mountain forest, farms, and simple stone bridges. Keep the scene legible when zoomed out to many cities and trains. The emotional goals are curiosity, calm, and delight. The trains are the focal moving objects.

At the farthest distance, the same geography becomes a flat illustration with mountain contours and simplified town, tree, railway, and train symbols. The close camera looks down on the miniature and follows a selected train without a separate simulation or visible control panel.

## Design principles

- The whole viewport is the world.
- A believable miniature, with carefully made silhouettes and details.
- Motion reveals the geography and connects places.
- No HUD, labels, marketing content, scores, or game mechanics.
- Let the user inspect the art with discreet camera gestures.

## Accessibility
Provide a canvas description, visible keyboard focus, and keyboard equivalents for camera and train selection. + / − zoom; arrow keys orbit the world or pan map and close views; F follows the visible train nearest the centre; [ / ] cycle active trains; Escape leaves follow; Home resets; Space pauses; R regenerates. Tab retains normal focus navigation. Click and touch selection distinguish taps from drags and multi-touch gestures.

Respect reduced motion by starting the simulation paused and making camera transitions immediate. Suspend animation while the tab is hidden. The experience is visual art; no information or task depends on interpreting color.
