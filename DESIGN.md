# Little Railway World — art direction

## Physical scene

A sunlit miniature railway. The viewport is entirely the world: no typography, labels, HUD, or gameplay controls.

## Composition

An irregular layered terrain tile carries towns, a river, and broad coherent biomes. Farmland, dense forest, open plains, sandy desert, a coastal bay, and faceted mountain ridges read as distinct places. Quiet open ground makes the trains easy to follow. The default sixteen-city showcase spans development levels 1–10; the classic generator and authored layouts use the same placement rules.

The world has three viewing distances. The far view is a network summary: broad biome fills, water, two quiet mountain contour layers, railways, moving train marks, and one city glyph per settlement. Individual buildings, trees, farms, rocks, animals, station marks, and water strokes belong to the closer views. The middle view presents the isometric miniature. The close view looks down on individual trains and their surroundings. All three share the same geography and simulation state.

## Color

Green meadow, deep pine, warm fields, pale sand, cyan water, terracotta roofs, pale plaster, and colorful trains. Every material has a deliberate role. Definitions in `src/palette.js` use OKLCH converted to linear sRGB; the page background uses OKLCH directly.

Ownership has one hue family per player, shared by city buildings, station details, train bodies and roofs, and map glyphs. Light, dark, roof, and trim tones keep the architecture legible within that family. Changing a player's color does not change building geometry or development.

## Form and scale

Small, consistent silhouettes: two-tier pines, faceted broadleaf crowns, pitched houses, a few taller civic landmarks, compact station platforms, cacti, and double-ended railcars. Mountains use irregular ridges and secondary peaks, with snow following their excavated faces. Details remain inside each asset's declared footprint. Passengers, benches, crop rows, hay bales, sheep, and roof trim reward a closer look without overwhelming the wide view.

City development adds apartments, plazas, civic buildings, and towers as levels rise. Buildings face a connected street graph, with seeded variation in their arrangement and forms. The map compresses that development into a single house, civic-hall, or stepped-tower silhouette, increasing its size at every level. A pale halo separates each owner-colored city mark from the railway beneath it.

## Construction rules

The planner reserves full roofs, canopies, station rectangles, street widths, and track corridors. Complete scenery footprints fit their biomes and stay clear of the shore. Streets remain on dry ground and avoid railway crossings; buildings leave their full street clearance. Water is cut out of the ground, continuous bridge decks follow the railway across both banks, and tunnels are actual excavations. Shallow mountain crossings without a supported tunnel become full-height open trenches.

City approaches share a straight axis. Tracks leave those approaches through tangent-connected bends with a minimum turning radius. Shared sections are rendered once. Ballast, sleepers, rails, and wheels meet at explicit elevations. These construction rules apply to generated and authored layouts.

## Motion

Trains follow continuous circuits through cities when the graph permits them. Each carriage follows the exact route distance, including transitions between connections. Whole-train reservations and following gaps keep traffic apart. Networks with no continuous circuit use shuttles that dwell and reverse at terminal stops. Double-ended trains reverse velocity without turning around or jumping along the track.

A small boat, water ripples, birds, and a balloon provide quieter background movement. Space pauses motion; reduced-motion preferences start paused.

Selecting a train brings the camera closer and follows its movement without rotating with each bend. Map transitions finish in a clear flat representation. Reduced-motion preferences make camera transitions immediate.

## Inspection

Scroll, pinch, and + / − move through the three views. Drag orbits the isometric world and pans the map or close view. Click or tap a visible train to follow it; F selects the visible train nearest the centre, and [ / ] cycle active trains. Escape, an empty click, or zooming out releases follow. Home and double-click restore the isometric view. Arrow keys orbit or pan, Space pauses, and R generates another seed.

A JSON authoring API loads and validates layouts, but there is no editor UI or playable economy in this iteration. The canvas has a screen-reader description and a focus outline during keyboard use. Tab moves focus normally, and train selection has keyboard equivalents.
