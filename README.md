# Let Them Eat Cookies

An editorial guide to cookies from around the world — part of the Let Them Eat family of apps,
alongside Let Them Eat Cake (original reference) and Let Them Eat Ramen (mature reference
architecture).

React 19 + TypeScript + Vite + `react-router-dom` v7, no state-management library, Capacitor for
iOS/Android (native `ios/`/`android/` projects generated and syncing clean — see
`NATIVE_SETUP.md`).

## Status

Phase 1.5, five passes so far: Foundation Verification + Repair → Visual Transformation +
Cake-Level Polish → Mobile App Completion + Recipes + Final Visual System → Final Feminine
Redesign + 50-Cookie Saturation → **Final Release Candidate + TestFlight Pass**. `npm install` and
`npm run build` both run clean. All routes verified in a real browser at desktop and at
375px/390px/430px mobile widths with no console errors and no horizontal overflow.

**Content/visual state**: 52 canonical cookies, 52/52 with complete original recipes, 49/52
photographed (3 honest gaps). Porcelain/raspberry/plum/champagne palette complete, the previous
default-blue-link defect fixed, mobile nav corrected. See `DESIGN_SYSTEM.md` and `CONTENT_PLAN.md`.

**Release state (this pass)**: App icon and splash regenerated to match the new palette (they'd
been shipping in the old caramel/mustard palette). Route-level code splitting via `React.lazy`
dropped the largest JS chunk from 633KB to 324KB raw, eliminating the build's chunk-size warning.
`ios/release.xcconfig` + a real (not placeholder) `.github/workflows/ios-release.yml` were ported
from Let Them Eat Cake's actual, proven, working release workflow. The GitHub repo now has this
project's real history pushed to `main`. **Genuine remaining blocker**: TestFlight upload needs an
App Store provisioning profile for `com.letthemeatcookies.app` (Apple Developer portal access,
can't be done from here) plus re-adding Cake's reusable signing secrets to this repo (GitHub
doesn't share secrets across repos even within the same account) — see `NATIVE_SETUP.md` for the
exact, minimal remaining steps.

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
