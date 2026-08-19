# Let Them Eat Cookies

An editorial guide to cookies from around the world — part of the Let Them Eat family of apps,
alongside Let Them Eat Cake (original reference) and Let Them Eat Ramen (mature reference
architecture).

React 19 + TypeScript + Vite + `react-router-dom` v7, no state-management library, Capacitor for
iOS/Android (native projects not yet generated — see `NATIVE_SETUP.md`).

## Status

Phase 1 (Production Foundation + Initial Content) — architecture and initial content complete;
`npm install`/`npm run build` could not be executed this session because outbound npm registry
access was blocked mid-session. See the delivery report for the full, honest status breakdown.

## Structure

```
src/
  types/       Domain types (cookie, workshop, atlas, lab, sommelier, product, images, myCookies…)
  data/        Seed content (13 cookies, regions/traditions, collections, labs, products…)
  lib/         Data barrel + business logic (sommelier scoring, workshop compatibility, atlas,
               persistence, images)
  components/  Reusable UI (CookieCard, LabExplorer, FlavorProfileBars, nav, persistence controls…)
  pages/       Route-level pages
  App.tsx      Route table
  main.tsx     Entry point, Capacitor back-button wiring
```

## Docs

- `FAMILY_ARCHITECTURE_REFERENCE.md` — what's inherited from Cake/Ramen vs. Cookies-specific
- `COOKIE_DOMAIN_MODEL.md` — the data model
- `CONTENT_PLAN.md` — what's seeded, what's next
- `COMMERCE_PLAN.md` — imported affiliate products + genuine gaps
- `PHOTOGRAPHY.md` — source-agnostic image architecture + current (empty) coverage
- `ACCESSIBILITY.md` — what's implemented + what's unverified
- `NATIVE_SETUP.md` — Capacitor/native status
- `APP_STORE_METADATA.md` / `GOOGLE_PLAY_METADATA.md` / `STORE_SCREENSHOT_PLAN.md` — draft ASO docs

## Getting started (once network access is available)

```
npm install
npm run dev      # local dev server
npm run build    # tsc -b && vite build
```
