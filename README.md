# Let Them Eat Cookies

An editorial guide to cookies from around the world — part of the Let Them Eat family of apps,
alongside Let Them Eat Cake (original reference) and Let Them Eat Ramen (mature reference
architecture).

React 19 + TypeScript + Vite + `react-router-dom` v7, no state-management library, Capacitor for
iOS/Android (native `ios/`/`android/` projects generated and syncing clean — see
`NATIVE_SETUP.md`).

## Status

Phase 1.5, six passes so far, culminating in **TestFlight acceptance and an automated
release-candidate pass**. `npm install` and `npm run build` both run clean. All routes verified in
a real browser at desktop and at 375px/390px/430px mobile widths with no console errors and no
horizontal overflow.

**Content/visual state**: 52 canonical cookies, 52/52 with complete original recipes, 49/52
photographed (3 honest gaps), zero data-integrity issues (verified programmatically: no duplicate
IDs, no broken collection/region/tradition/lab references). Porcelain/raspberry/plum/champagne
palette complete, no default-blue-link regressions, mobile nav correct. See `DESIGN_SYSTEM.md` and
`CONTENT_PLAN.md`.

**Release state**: Build `1.0 (1)` was signed, archived, and uploaded via the GitHub Actions
`ios-release.yml` workflow — Apple's own `altool` confirmed "UPLOAD SUCCEEDED with no errors," and
the build shows in App Store Connect's TestFlight tab. App Store Connect metadata (description,
keywords, support/privacy URLs, App Review contact, App Privacy declaration) is filled in and saved
— see `APP_STORE_METADATA.md`. Real App Store screenshots (8 iPhone + 8 iPad, exact Apple pixel
dimensions, generated deterministically from the actual running app) exist in
`app-store-assets/screenshots/` — see `STORE_SCREENSHOT_PLAN.md`. Route-level code splitting via
`React.lazy` keeps the largest JS chunk at 324KB raw (down from an original 633KB single bundle).

**Genuine remaining step**: uploading the screenshots into App Store Connect and clicking "Add for
Review" are real, consequential actions left for the user — not technical blockers, deliberate
stopping points.

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
