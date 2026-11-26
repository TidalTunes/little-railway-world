# Little Railway World — art direction

## Physical scene

A sunlit miniature railway. The viewport is entirely the world: no typography, labels, HUD, or gameplay controls.

## Composition

A curved, layered section of the Earth carries Europe’s towns, rivers, and broad coherent biomes. A restrained cut edge makes the spherical surface tangible. Farmland, dense forest, open plains, sandy desert, a coastal bay, and faceted mountain ridges read as distinct places, with gently varied, blended ground colors between them. Quiet open ground makes the trains easy to follow. The default fifty-city Europe map uses geographic positions on a sphere, with radial elevations and local tangent frames for buildings, railways, train carriages, and cameras. The sixteen-city showcase, classic generator, and stress presets retain their planar surfaces and the same placement rules.

The world has three viewing distances. The far view is a network summary: broad biome fills, water, two quiet mountain contour layers, railways, moving train marks, and one city glyph per settlement. Individual buildings, trees, farms, rocks, animals, station marks, and water strokes belong to the closer views. The middle view presents the isometric miniature. The close view looks down on individual trains and their surroundings. All three share the same geography and simulation state.

## Color

Green meadow, deep pine, warm fields, pale sand, cyan water, terracotta roofs, pale plaster, and colorful trains. Every material has a deliberate role. Definitions in `src/palette.js` use OKLCH converted to linear sRGB; the page background uses OKLCH directly.

Ownership has one hue family per player, shared by city buildings, station details, train bodies and roofs, and map glyphs. Light, dark, roof, and trim tones keep the architecture legible within that family. Changing a player's color does not change building geometry or development.

## Form and scale

Small, consistent silhouettes: two-tier pines, faceted broadleaf crowns, pitched houses, a few taller civic landmarks, compact station platforms, cacti, and double-ended railcars. Mountains use irregular ridges and secondary peaks. Their lower slopes blend into neighboring meadows and woodland, with sparse pine groups on gentle ground, exposed stone on steep faces, and snow on high upward-facing surfaces. The exact heightfield and excavated tunnel clearances remain shared by art and simulation. Details remain inside each asset's declared footprint. Passengers, benches, crop rows, hay bales, sheep, and roof trim reward a closer look without overwhelming the wide view.

City development adds apartments, plazas, civic buildings, and towers as levels rise. Compact groups of buildings follow gently winding lanes and irregular branches, with seeded variation in their arrangement and forms. Small villages gather around a short lane; larger towns develop interconnected neighborhoods rather than repeated rectangular blocks. The map compresses that development into a single house, civic-hall, or stepped-tower silhouette, increasing its size at every level. A pale halo separates each owner-colored city mark from the railway beneath it.

Farmland reads as cultivated countryside: nearby estates share a local bearing, while their sizes and oblique parcel divisions vary. Wheat, pasture, orchards, vegetables, and fallow earth form quiet clusters separated by meadow. Low hedges, gates, troughs, hay bales, and occasional small barns reward a closer look. Their complete footprints stay clear of towns, railways, and water; individual details remain inside each irregular field.

## Construction rules

The planner reserves full roofs, canopies, station rectangles, street widths, and track corridors. Complete scenery footprints fit their biomes and stay clear of the shore. Streets remain on dry ground and avoid railway crossings; buildings leave their full street clearance. Water is cut out of the ground, continuous bridge decks follow the railway across both banks, and tunnels are actual excavations. Shallow mountain crossings without a supported tunnel become full-height open trenches.

City approaches share a straight axis. Tracks leave those approaches through tangent-connected bends with a minimum turning radius. Shared sections are rendered once. Ballast, sleepers, rails, and wheels meet at explicit elevations. These construction rules apply to generated and authored layouts.

## Motion

Trains follow continuous circuits through cities when the graph permits them. Each carriage follows the exact route distance, including transitions between connections. Whole-train reservations and following gaps keep traffic apart. Networks with no continuous circuit use shuttles that dwell and reverse at terminal stops. Double-ended trains reverse velocity without turning around or jumping along the track.

A small boat, water ripples, birds, and a balloon provide quieter background movement. Space pauses motion; reduced-motion preferences start paused.

Selecting a train brings the camera closer and follows its movement without rotating with each bend. Map transitions retain the globe’s curvature and simplify the art. The camera moves around the spherical section as the user pans; closer views orient to the local ground. Reduced-motion preferences make camera transitions immediate.

## Inspection

Scroll, pinch, and + / − move through the three views. Drag orbits the isometric world and pans the map or close view. Click or tap a visible train to follow it; F selects the visible train nearest the centre, and [ / ] cycle active trains. Escape, an empty click, or zooming out releases follow. Home and double-click restore the isometric view. Arrow keys orbit or pan, Space pauses, and R generates another seed.

A JSON authoring API loads and validates layouts, but there is no editor UI or playable economy in this iteration. The canvas has a screen-reader description and a focus outline during keyboard use. Tab moves focus normally, and train selection has keyboard equivalents.
