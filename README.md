# FreeSun Flight Deck

Two standalone, buildless ES module dashboard concepts for the FreeSun balloon crew, centered on Chatfield State Park in Littleton, Colorado.

- `index.html` and `maptracker.html`: MapTracker, a map-first bento dashboard.
- `hudoverlay.html`: HudOverlay, an immersive map view with floating flight instruments and a collapsible crew dock.
- `styles.css` and `hud.css`: shared Colorado earth-tone design tokens, responsive layouts, and light/dark modes.
- `components.js` and `hud-components.js`: reusable cards, icons, and concept-specific shells.
- `app.js`: map projection, rendering, state, and interaction handlers.
- `assets/`: Esri World Imagery tiles and the original balloon illustration.
- `master-template.html` and `hud-master-template.html`: the two concept page scaffolds.

Serve the repository root with any static HTTP server. There is no build step or application dependency. Fonts load from Google Fonts with local sans-serif fallbacks.

## Functional scope

Concept switch; theme persistence; map pan, zoom, recenter, route/label layers; perspective tilt; simulated balloon replay; replay scrubber; crew history and role profiles; demo flight schedule and local RSVP; saved checklist; local flight notes; validated WhatsApp invite-link storage/open; local breakfast tally and original Bacon Tracker link.

This prototype does not connect live GPS, crew identity, real flight records, WhatsApp messages, or current weather. All operational data is explicitly sample data. Perspective is a tilt of 2D imagery, not actual terrain elevation. Local actions do not update a shared crew database.

## Sources

- User provided the home field as Chatfield State Park, Littleton, Colorado.
- FreeSun's public website https://rockymountainfly.com/ supplies the club name, 1978 history, and published field coordinates 39.5448, -105.0874. Retrieved 2026-10-17 task session.
- The website’s club photo source refused retrieval; an original SVG balloon illustration is used instead.
- Satellite source: Esri World Imagery MapServer zoom 14; columns 3407–3413, rows 6227–6232. Tiles load in the browser and attribution appears on the map. Geographic route projection shares these tile coordinates.
- Original Bacon Tracker link: https://claude.ai/artifact/CodWhe9W1w5o6oABCRXuZ1. App content could not be retrieved; the concept's slice tally is provisional.

## Design checkpoint

Preserve ivory/pine/sage/clay colors, compact Manrope/DM Sans typography, 17px cards, 17px grid gaps, rail navigation, shared cards, and concept-specific map layout. No external backend credentials or private crew information are included.

MapTracker preserves the bento composition. HudOverlay uses an independent full-screen map shell, floating mission and flight instruments, and bottom crew dock with collapsible panels. Both retain the same palette, typography, domain components, local storage, and interaction handlers. Direct pages declare their concept in `data-concept`; old query links remain supported.

