# Little Railway World — art direction

## Physical scene
A visitor looks down into a sunlit model railway on a quiet afternoon. The browser is a window into this miniature; the whole viewport is the artwork.

## Composition
An irregular, layered island sits against a pale blue studio backdrop. A mountain ridge anchors the far side. Three small settlements, distinct agricultural areas, and clusters of woodland create alternating dense and quiet spaces. A meandering river and continuous railway guide the eye. An arched viaduct is the principal foreground landmark.

## Color
A full palette has deliberate material roles: green meadow and deep pine, cyan river, terracotta roofs, pale plaster, and cherry-red trains. The primary railway color begins from the impeccable hue seed at 355 degrees, adjusted toward crimson. Color definitions live in `src/palette.js` as OKLCH values, converted to linear sRGB for physically lit rendering. CSS uses OKLCH directly.

## Form and light
Flat-shaded geometry, angular tree crowns, pitched roofs, chamfer-like rocky edges, readable train silhouettes, and small contrasting details. Directional afternoon sunlight with cool fill and contact shadows gives a tangible scale-model quality. No textures or typography are required.

## Motion
Two trains maintain distance on the same continuous route. Carriages sample their own position and tangent so the train bends around curves. Smoke rises, boats drift, birds circle, windmill sails turn, and a balloon bobs. Reduced motion freezes ambient movement; Space provides manual pause.

## Interface
No visible text, labels, menus, HUD, score, or gameplay. Camera gestures and keyboard controls support inspection without an interface overlay. The canvas has a screen-reader description and a visible focus outline only during keyboard use.
