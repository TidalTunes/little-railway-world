# Little Railway World — art direction

## Physical scene
A sunlit miniature railway. The viewport is entirely the world: no typography, labels, HUD, or gameplay controls.

## Composition
An irregular layered terrain tile carries a river, compact towns, small forests, and angular mountains. The default eight-city map reads clearly from a wide view. Explicit world descriptions can change the arrangement, route topology, terrain crossings, and city count. Quiet open ground makes the moving trains easy to follow.

## Color
Green meadow, deep pine, cyan water, terracotta roofs, pale plaster, and colorful trains. Every material has a deliberate role. Definitions in `src/palette.js` use OKLCH converted to linear sRGB; the page background uses OKLCH directly.

## Form and scale
Small, consistent silhouettes: two-tier pines, faceted broadleaf crowns, simple pitched houses, a few taller civic landmarks, compact station platforms, and double-ended railcars. Details remain within each asset's declared footprint. Platform passengers, benches, crop rows, hay bales, sheep, and roof trim reward a closer look without overwhelming the wide view.

## Construction rules
The world planner reserves full roofs, canopies, station rectangles, and track corridors. Water is cut out of the ground, bridge decks span the whole bank crossing, and tunnels are actual excavations. Mountain approaches become cuttings when there is insufficient roof cover. Ballast, sleepers, rails, and wheels meet at explicit elevations. These rules apply to every layout.

## Motion
Each route has a shuttle that dwells and reverses at its terminal stops. Individual carriages follow the route. Double-ended trains change velocity without turning around or jumping to another track. Crossing reservations keep whole trains apart. A small boat, water ripples, birds, and balloon provide quieter background movement. Space pauses motion; reduced-motion preferences start paused.

## Inspection
Orthographic camera gestures and keyboard shortcuts allow inspection. R generates the next seed. A JSON authoring API supports future editing, with no editor UI in this iteration. The canvas has a screen-reader description and a focus outline only during keyboard use.
