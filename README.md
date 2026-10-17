# FreeSun Flight Deck

Two standalone, buildless ES module dashboard concepts sharing an established master scaffold and token system.

- `/maptracker.html`: MapTracker; map-first bento dashboard.
- `/hudoverlay.html`: HudOverlay; flight instruments over actual Chatfield satellite imagery.
- `dist/index.html`: HTML master scaffold. Preserve this structure for future iterations.
- `dist/styles.css`: shared Colorado earth-tone design tokens, responsive layouts, and light/dark modes.
- `dist/components.js`: reusable exported cards and icons, with `components.d.ts` declarations.
- `dist/app.js`: exported map projection, rendering, state, and interaction handlers.
- `dist/assets`: Esri World Imagery tiles and original balloon illustration.

Serve `dist/` with any static HTTP server. No build step or application dependencies. Fonts load from Google Fonts with local sans-serif fallbacks.

## Functional scope
Concept switch; theme persistence; map pan, zoom, recenter, route/label layers; perspective tilt; simulated balloon replay; replay scrubber; crew history and role profiles; demo flight schedule and local RSVP; saved checklist; local flight notes; validated WhatsApp invite-link storage/open; local breakfast tally and original Bacon Tracker link.

This prototype does not connect live GPS, crew identity, real flight records, WhatsApp messages, or current weather. All operational data is explicitly sample data. Perspective is a tilt of 2D imagery, not actual terrain elevation. Local actions do not update a shared crew database.

## Sources
- User provided the home field as Chatfield State Park, Littleton, Colorado.
- FreeSun's public website https://rockymountainfly.com/ supplies the club name, 1978 history, published field coordinates 39.5448, -105.0874. Retrieved 2026-10-17 task session.
- The website’s club photo source refused retrieval; an original SVG balloon illustration is used instead.
- Satellite source: Esri World Imagery MapServer zoom 14; columns 3407–3413, rows 6227–6232. Tiles load in the browser and attribution appears on the map. Geographic route projection shares these tile coordinates.
- Original Bacon Tracker link: https://claude.ai/artifact/CodWhe9W1w5o6oABCRXuZ1. App content could not be retrieved; the concept's slice tally is provisional.

## Design checkpoint
Preserve ivory/pine/sage/clay colors, compact Manrope/DM Sans typography, 17px cards, 17px grid gaps, rail navigation, shared cards, and concept-specific map layout. No external backend credentials or private crew information are included.

## Concept separation update

MapTracker preserves the existing bento composition. HudOverlay now uses an independent full-screen map shell (`hud-components.js`, `hud.css`), a floating mission panel, altitude instruments, weather instrument, and bottom crew dock with collapsible panels. Both retain the same palette, typography, shared domain components, local storage, and interaction handlers. Each has a static HTML entry document with its concept declared in `data-concept`, so direct navigation does not rely on query parameters. Old query links remain supported.
