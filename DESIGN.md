# Little Railway World — art direction

## Physical scene

A painted miniature railway under warm afternoon light or clear blue moonlight. The viewport is entirely the world: no typography, labels, HUD, or gameplay controls.

## Composition

A complete Earth globe carries compact towns, rivers, and broad coherent biomes. Its continuous ocean, softly lit limb, polar ice, and recognizable continents make the spherical surface tangible. Farmland, dense forest, open plains, sandy desert, and faceted mountain ridges read as distinct places. Broad ecological transitions soften their boundaries. Tropical woodland, temperate forest, taiga, tundra, savanna, steppe, and Mediterranean ground add regional character inside the existing placement biomes. Coherent woodland glades provide variation at planet scale without adding individual scenery to the overview. Deep blue ocean carries quiet broad currents and a turquoise coastal shelf; narrow wet-sand shores blend toward the neighboring land. Quiet open ground makes the trains easy to follow. The default Earth map uses geographic positions on a sphere, with radial elevations and local tangent frames for buildings, railways, train carriages, and cameras. The previous Europe section remains available. The sixteen-city showcase, classic generator, and stress presets retain their planar surfaces and the same placement rules.

The world has three viewing distances. The far view is a network summary: broad biome fills, water, two quiet mountain contour layers, railways, moving train marks, and one city glyph per settlement. Individual buildings, trees, farms, rocks, animals, station marks, and water strokes belong to the closer views. The middle view presents the isometric miniature. The close view follows individual trains and their surroundings at the same strong isometric angle as the middle view. All three share the same geography and simulation state. The globe tilts away along the current screen heading as it enters detail, without an automatic sideways turn. Regional and close views lock the camera at 45° above the local ground: dragging rotates its heading around a ground focus, WASD moves that focus in physical surface directions, and zoom changes magnification. The map-to-detail transition follows one fixed normalized zoom interval (0.78–1.0), independent of elapsed time or loading. Zoom and panning continue through uncached regions. A complete coarse terrain surface stays beneath local scenery, and newly prepared regions reveal their detail progressively.

## Color

Green meadow, deep pine, warm fields, pale sand, cyan water, terracotta roofs, pale plaster, and colorful trains. Every material has a deliberate role. Definitions in `src/palette.js` use OKLCH converted to linear sRGB; the page background uses OKLCH directly.

Ownership has one hue family per player, shared by city buildings, station details, train bodies and roofs, and map glyphs. Light, dark, roof, and trim tones keep the architecture legible within that family. Changing a player's color does not change building geometry or development.

## Form and scale

Small, consistent silhouettes: two-tier pines, faceted broadleaf crowns, pitched houses, a few taller civic landmarks, compact station platforms, cacti, and double-ended railcars. Mountains use irregular ridges and secondary peaks. Their lower slopes blend into neighboring meadows and woodland, with sparse pine groups on gentle ground, exposed stone on steep faces, and snow on high upward-facing surfaces. The exact heightfield and excavated tunnel clearances remain shared by art and simulation. Details remain inside each asset's declared footprint. Passengers, benches, crop rows, hay bales, sheep, and roof trim reward a closer look without overwhelming the wide view.

City development adds apartments, plazas, civic buildings, and towers as levels rise. Compact groups of buildings follow gently winding lanes and irregular branches, with seeded variation in their arrangement and forms. Small villages gather around a short lane; larger towns develop interconnected neighborhoods rather than repeated rectangular blocks. Residential frontages and small rear groups keep houses numerous, with civic buildings and towers punctuating the neighborhoods. Earth settlements use the same level-based footprints, allowing development to extend beyond the station. The map compresses that development into a single house, civic-hall, or stepped-tower silhouette, increasing its size at every level. A pale halo and dark rim separate each owner-colored city stamp from the railway beneath it. Ivory-cased rails and city stamps use bounded screen sizes. Dense distant groups keep higher-level stamps and collapse secondary cities into small owner dots without moving their geographic anchors.

Farmland reads as cultivated countryside: nearby estates share a local bearing, while their sizes and oblique parcel divisions vary. Wheat, pasture, orchards, vegetables, and fallow earth form quiet clusters separated by meadow. Low hedges, gates, troughs, hay bales, and occasional small barns reward a closer look. Their complete footprints stay clear of towns, railways, and water; individual details remain inside each irregular field.

## Construction rules

The planner reserves full roofs, canopies, station rectangles, street widths, and track corridors. Complete scenery footprints fit their biomes and stay clear of the shore. Streets remain on dry ground and avoid railway crossings; buildings leave their full street clearance. Water is cut out of the ground, continuous bridge decks follow the railway across both banks, and tunnels are actual excavations. Shallow mountain crossings without a supported tunnel become full-height open trenches.

Geographic coordinates determine anchors and continuous terrain. Buildings, trees, farm districts, train carriages and wildlife retain their physical dimensions in orthonormal local frames. The chart's latitude scaling never stretches or shears these assets. City radii and neighbor clearances use surface distances; rail gauge, sleeper intervals and carriage spacing use physical units. Geographic boundary reservations conservatively enclose those footprints. Static terrain bends before rigid artwork joins its material batches.

City approaches share a straight axis. Tracks leave those approaches through tangent-connected bends with a minimum turning radius. Shared sections are rendered once. Ballast, sleepers, rails, and wheels meet at explicit elevations. These construction rules apply to generated and authored layouts.

## Motion

Trains follow continuous circuits through cities when the graph permits them. Each carriage follows the exact route distance, including transitions between connections. Whole-train reservations and following gaps keep traffic apart. Networks with no continuous circuit use shuttles that dwell and reverse at terminal stops. Double-ended trains reverse velocity without turning around or jumping along the track.

Local sheep graze and step inside their reserved footprints; swallows circle above roofs, butterflies flutter over fields, and fireflies glow at night. Nearby life uses fixed-capacity instance batches independent of the total map size. Small authored worlds retain a boat and balloon. Water glints and coastal breakers animate through shared shader time. Space pauses all simulation motion; reduced-motion preferences start paused.

Selecting a train brings the camera closer and follows its movement without rotating with each bend. Map transitions retain the globe’s curvature and simplify the art. The camera moves around the globe as the user pans, wrapping continuously across the date line; closer views orient to the local ground. Reduced-motion preferences make camera transitions immediate.

## Inspection

Scroll, pinch, and + / − move through the three views. Drag orbits the ground focus in both detailed views, including while following a train. WASD moves that focus across the surface. The fully zoomed-out map uses dragging to pan; two-finger detailed gestures rotate and pinch to zoom. Click or tap a visible train to follow it; F selects the visible train nearest the centre, and [ / ] cycle active trains. Escape, an empty click, or zooming out releases follow. Home and double-click restore the fitted overview. WASD pans in four screen-relative directions, easing into motion and braking smoothly on release. Diagonal travel has the same speed as a single direction. Blur and hidden tabs clear keyboard motion immediately; reduced-motion preferences use direct movement. Arrow keys orbit or pan, Space pauses, and R generates another seed.

A JSON authoring API loads and validates layouts, but there is no editor UI or playable economy in this iteration. The canvas has a screen-reader description and a focus outline during keyboard use. Tab moves focus normally, and train selection has keyboard equivalents.

## Light and surface finish

The afternoon palette uses a warm directional key, cool fill, and soft shadows. Night keeps terrain readable in blue moonlight while windows and station lanterns emit amber. N fades between modes; reduced motion switches immediately. A sparse star field sits behind the world and a narrow atmospheric limb frames the planet. All lighting uses the same fixed light count; windows use shared emission shaders, never individual lights or bloom.

Subtle, derivative-filtered paint grain follows physical surface positions. Water carries broken, low-contrast glints rather than a repeating tile. Rounded breaker strips are clipped to authoritative ocean masks, leaving every land reservation intact. Material styling composes with chunk reveals, globe transforms, and map glyph scaling; no texture downloads or new fullscreen effects are required.
