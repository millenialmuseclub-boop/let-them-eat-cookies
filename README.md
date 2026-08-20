# Let Them Eat Cookies

An editorial guide to cookies from around the world — part of the Let Them Eat family of apps,
alongside Let Them Eat Cake (original reference) and Let Them Eat Ramen (mature reference
architecture).

React 19 + TypeScript + Vite + `react-router-dom` v7, no state-management library, Capacitor for
iOS/Android (native `ios/`/`android/` projects generated and syncing clean — see
`NATIVE_SETUP.md`).

## Status

Phase 1.5, four passes so far: Foundation Verification + Repair → Visual Transformation +
Cake-Level Polish → Mobile App Completion + Recipes + Final Visual System → **Final Feminine
Redesign + 50-Cookie Saturation**. `npm install` and `npm run build` both run clean. All routes
verified in a real browser at desktop and at 375px/390px/430px mobile widths with no console
errors and no horizontal overflow.

This latest pass replaced the app's entire color identity (a caramel/butter palette that was
internally coherent but still read as masculine and web-like) with a porcelain/raspberry/plum
pâtisserie palette, fixed a real defect where the top-nav wordmark and the *entire bottom tab bar*
were rendering as unstyled default-blue browser links (dead CSS selectors matching no real
element), and expanded the canonical catalog from 13 to **52 cookies**, each with a complete
original recipe (52/52 coverage) and photography where a confident match exists (49/52 — 3 honest
gaps, documented in `PHOTOGRAPHY.md`, not faked). See `DESIGN_SYSTEM.md` for the full palette and
link-defect writeup, and `COOKIE_DOMAIN_MODEL.md`/`CONTENT_PLAN.md` for the catalog. 2 of 6
Workshop Labs remain populated (Dough, Chocolate) — the architecture is proven ready for the rest,
per `CONTENT_PLAN.md`.

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
