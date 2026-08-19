# Design System — Let Them Eat Cookies

This documents what actually governs Cookies' visual language after the Phase 1.5 visual-polish
pass, and marks which parts are inherited/reusable across the Let Them Eat family versus specific
to Cookies. It reflects the real, shipped `src/index.css` — not aspirational styling.

## FAMILY-REUSABLE

These structural patterns came from Cake (and, for native/build concerns, Ramen) and should be
the starting point for any future Let Them Eat app, not reinvented each time.

- **Token shape**: `--cream`/`--cocoa`/one strong accent/one secondary accent, `--bg`/`--bg-card`/
  `--text`/`--border`/`--shadow`, redefined under `prefers-color-scheme: dark`. Cookies' actual
  values live in `src/index.css` `:root` (lines 1–52) — Cake's and Ramen's are their own hue, not
  copied.
- **Photo-bleed hero pattern**: a hero image escapes its container's padding via matched negative
  margins (`margin: 0 -16px 20px` against a 16px container gutter) rather than sitting inset in a
  bordered box. This is the single highest-leverage difference between an "editorial" feel and a
  "boxed website" feel — apply it to every full-width hero photo, not just cookies. **Requires**
  `overflow-x: hidden` on the bleeding element's positioned ancestor (`.page-container` here) or
  the negative margin overflows the viewport horizontally — this bit an actual build in this pass
  (see Photography section below) and is easy to reintroduce by accident.
- **Gradient-scrim feature card**: `position:absolute; inset:0` content layer over a full-bleed
  photo, `linear-gradient(0deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.25) 55%, transparent 100%)`, white
  text anchored to the bottom via `justify-content: flex-end`. This is what makes a nav/feature
  card read as "editorial magazine tile" instead of "icon + caption box."
  `DiscoverFeatureCard.tsx`/`.discover-feature-card*` is the reusable component.
- **Small credit pill**: a semi-opaque rounded pill (`rgba(0,0,0,.4)`, `border-radius: 999px`,
  small padding) bottom-right of every real photo, carrying `Photo by {photographer}`. Never
  omit this on a real (non-placeholder) photo — it's both attribution and a subtle signal to the
  reader that the photography is real, not stock/AI.
- **Lift-on-hover card interaction**: `transform: translateY(-3px)` + deepened shadow on hover,
  `transform: scale(0.97)` on `:active` for tap feedback. Cheap, respects
  `prefers-reduced-motion` via the global reset, and reads as "app," not "webpage."
- **One CSS file, not one file per component.** Cookies deliberately did NOT port Cake's
  per-component `.css` file structure — everything lives in `src/index.css` behind
  named, commented sections. This made the Phase 1.5 audit (finding two dead/conflicting
  photography CSS systems, see below) *possible*, and arguably easier than hunting across 40
  files. Worth deliberately deciding, not defaulting, next time.

## COOKIES-SPECIFIC

- **Palette**: `--cream: #faf1e2` (parchment/vanilla, warmer than Cake's `#fff8f0`), `--cocoa:
  #2e2015` (dark chocolate ink), `--caramel: #9c4a17` (primary accent, WCAG AA ~4.6:1),
  `--butter`/`--butter-strong` (toasted-sugar secondary accent). Deliberately warmer/more
  amber-toasted than Cake and distinct from Ramen's redder shoyu-brown, so Cookies reads as its
  own sibling rather than a reskin. Full rationale in `src/index.css` lines 1–7.
- **Hero image sizing**: 260px mobile / 340px desktop (Cake uses a flat 280px) — taller on desktop
  because Cookies' hero photos are food-macro shots that benefit from more vertical room than
  Cake's often-staged/styled photography.
- **Range slider styling** (`.find-slider-row input[type="range"]`): `accent-color: var(--caramel)`
  on the Sommelier FIND sweetness/richness/crispness sliders. Cake doesn't have this control type;
  this is new, not ported.

## What this pass actually fixed (not just restyled)

The single biggest finding of this pass: **two parallel, conflicting CSS systems for cookie
photography existed in `index.css`**, one written early (targeting class names like
`.cookie-hero-image-hero`/`.cookie-hero-image-thumbnail`) that no component ever rendered, and a
second, later "Phase 1 supplementary" block that used the real class names
(`.cookie-hero-image-figure`/`.cookie-hero-image`/`.cookie-hero-image-thumb`) but with a much
plainer "rounded photo fully inset in a padded box" treatment — never the bleed/scrim treatment
the first block clearly intended. The real, shipped photography was the plain version. This is the
concrete, verifiable root cause of the "feels like an early-2000s website" assessment, not a matter
of taste. Consolidated into one system (see FAMILY-REUSABLE above); the dead block is deleted.

Two smaller, related things wired up but never connected to real markup were also finished in this
pass rather than left dead:
- `.discover-feature-card-image`/`.discover-feature-card-content` (the photo-backed feature card
  CSS) existed but no card ever used it — `DiscoverFeatureCard` only rendered an emoji+scrim.
  Now accepts an optional `image` prop and Main's four nav cards (Browse by Origin, Quiz,
  Sommelier, Workshop) pass real cookie/scene photography, reusing already-sourced,
  already-verified images rather than sourcing new ones.
- `.find-result-row`/`.find-result-card`/`.find-result-score` (a photo + score + reasoning layout
  for Sommelier FIND results) existed but the page rendered a plain unstyled `<ul>`. Now wired to
  real markup with `CookieThumbnail` per result and the top match visually highlighted.

**A real bug was introduced and caught during this pass**, worth recording as a pattern: making a
photo credit's photographer name a link (`<a>`) inside a card that is itself a react-router `<Link>`
(which renders as `<a>`) produces invalid, nested-anchor HTML — caught via React's console
hydration-mismatch warning, not visually. Feature-card photo credits are plain text for this
reason; only the full, non-card `CookieHeroImage`/`.cookie-hero-image-figure` (which isn't itself
inside a link) can safely make the photographer name clickable.

## Accessibility carried forward

No palette or contrast changes were made in this pass (same tokens as Phase 1, already WCAG AA
checked — see `src/index.css` comments). `:focus-visible`, `aria-pressed`, `aria-live`, and touch
target sizing are unaffected by any change here. The one new interactive style
(`input[type="range"] { accent-color }`) only affects the browser-native thumb/track color, not
focus or keyboard behavior.

## What this pass deliberately did not touch

Per scope: Atlas, Workshop hub, Sommelier hub, Crumb hub, and Curated Kitchen still use their
original card treatments (`.workshop-link-card` etc.), not the photo-bleed/scrim system. They were
functionally verified (no console errors, no overflow) but not visually re-composed — a reasonable
next increment, not done here to keep this pass bounded rather than touching all ~20 pages at once.
