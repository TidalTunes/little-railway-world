# Little Railway World — art direction

## Physical scene

A sunlit miniature railway. The viewport is entirely the world: no typography, labels, HUD, or gameplay controls.

## Composition

An irregular layered terrain tile carries compact towns, a river, and broad coherent biomes. Farmland, dense forest, open plains, sandy desert, a coastal bay, and faceted mountain ridges read as distinct places. Quiet open ground makes the trains easy to follow. The default eight-city map and authored layouts use the same placement rules.

## Color

Green meadow, deep pine, warm fields, pale sand, cyan water, terracotta roofs, pale plaster, and colorful trains. Every material has a deliberate role. Definitions in `src/palette.js` use OKLCH converted to linear sRGB; the page background uses OKLCH directly.

## Form and scale

Small, consistent silhouettes: two-tier pines, faceted broadleaf crowns, pitched houses, a few taller civic landmarks, compact station platforms, cacti, and double-ended railcars. Mountains use irregular ridges and secondary peaks, with snow following their excavated faces. Details remain inside each asset's declared footprint. Passengers, benches, crop rows, hay bales, sheep, and roof trim reward a closer look without overwhelming the wide view.

## Construction rules

The planner reserves full roofs, canopies, station rectangles, and track corridors. Complete scenery footprints fit their biomes and stay clear of the shore. Water is cut out of the ground, continuous bridge decks follow the railway across both banks, and tunnels are actual excavations. Shallow mountain crossings without a supported tunnel become full-height open trenches.

City approaches share a straight axis. Tracks leave those approaches through tangent-connected bends with a minimum turning radius. Shared sections are rendered once. Ballast, sleepers, rails, and wheels meet at explicit elevations. These construction rules apply to generated and authored layouts.

## Motion

Trains follow continuous circuits through cities when the graph permits them. Each carriage follows the exact route distance, including transitions between connections. Whole-train reservations and following gaps keep traffic apart. Networks with no continuous circuit use shuttles that dwell and reverse at terminal stops. Double-ended trains reverse velocity without turning around or jumping along the track.

A small boat, water ripples, birds, and a balloon provide quieter background movement. Space pauses motion; reduced-motion preferences start paused.

## Inspection

Orthographic camera gestures and keyboard shortcuts allow inspection. R generates another seed. A JSON authoring API loads and validates layouts, but there is no editor UI or playable economy in this iteration. The canvas has a screen-reader description and a focus outline during keyboard use.
