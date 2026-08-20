# Let Them Eat Cookies

An editorial guide to cookies from around the world — part of the Let Them Eat family of apps,
alongside Let Them Eat Cake (original reference) and Let Them Eat Ramen (mature reference
architecture).

React 19 + TypeScript + Vite + `react-router-dom` v7, no state-management library, Capacitor for
iOS/Android (native `ios/`/`android/` projects generated and syncing clean — see
`NATIVE_SETUP.md`).

## Status

Phase 1.5, three passes so far: Foundation Verification + Repair → Visual Transformation +
Cake-Level Polish → **Mobile App Completion + Recipes + Final Visual System**. `npm install` and
`npm run build` both run clean. All 22 routes verified in a real browser at desktop and at
375px/390px/430px mobile widths with no console errors and no horizontal overflow.

This latest pass: finished the five hub pages left visually behind by the previous pass (Atlas,
Workshop, Sommelier, Crumb, Curated Kitchen — each with a surface-specific composition, not one
card pasted everywhere), gave all 13 canonical cookies a complete original structured recipe
integrated directly into Cookie Detail, resolved the "Bench Scraper" product-naming collision, and
refined My Cookies toward a personal-shelf feel. See `DESIGN_SYSTEM.md` for the hub-composition
rationale and `COOKIE_DOMAIN_MODEL.md` for the Recipe schema. Content is intentionally still at 13
cookies / 2 of 6 Labs populated — the next pass is content saturation, not this one.

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

- `DESIGN_SYSTEM.md` — visual language: palette, typography, hero/card patterns, what's
  family-reusable vs. Cookies-specific, and what the Phase 1.5 visual-polish pass actually fixed
- `FAMILY_ARCHITECTURE_REFERENCE.md` — what's inherited from Cake/Ramen vs. Cookies-specific
- `COOKIE_DOMAIN_MODEL.md` — the data model
- `CONTENT_PLAN.md` — what's seeded, what's next
- `COMMERCE_PLAN.md` — imported affiliate products + genuine gaps
- `PHOTOGRAPHY.md` — source-agnostic image architecture + current (empty) coverage
- `ACCESSIBILITY.md` — what's implemented + what's unverified
- `NATIVE_SETUP.md` — Capacitor/native status
- `APP_STORE_METADATA.md` / `GOOGLE_PLAY_METADATA.md` / `STORE_SCREENSHOT_PLAN.md` — draft ASO docs

## Getting started

```
npm install
npm run dev      # local dev server
npm run build    # tsc -b && vite build
npx cap sync     # sync web build into ios/ and android/
```
