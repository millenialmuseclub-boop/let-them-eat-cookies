# Design System — Let Them Eat Cookies

## Phase 1.5, final pass: the palette itself was the problem, not just layout

Every prior pass in this project's history treated the caramel/butter/parchment palette as
correct because it was internally coherent and passed contrast — and every time, that
assumption was wrong. The actual user feedback was specific: the app read as masculine,
brown-dominated, and web-like, and no amount of layout/photography/hub-page polish on top of
that palette fixed it, because the palette itself was never re-examined.

**The fix**: a ground-up palette replacement, not an accent added on top. `--cream` went from a
beige parchment (`#faf1e2`) to a porcelain blush-white (`#fdf3f0`); `--cocoa` (dark chocolate ink)
became `--plum` (`#3a1530`, deep plum-espresso); `--caramel` (the primary accent) became
`--raspberry` (`#a3134f`); `--butter` (secondary accent) became `--champagne` (`#c9a24b`). A new
`--pink-bold` (`#d6127a`) token was added specifically for a handful of confident, "fashion pink"
brand moments (the active bottom-tab dot, hero eyebrows) — deliberately not the workhorse text
color, since at ~4.56:1 against `--cream` it only clears AA at larger/bold sizes. All values are
contrast-verified in both light and dark mode (see the ratio comments in `src/index.css`'s
`:root`/`prefers-color-scheme: dark` blocks). A Google Fonts `Playfair Display` serif was added for
`--heading` (h1/h2/h3), replacing the system-ui-for-everything approach, to carry the
"editorial/pâtisserie" feeling typography alone can't fake with a sans-serif.

Because every existing component already referenced these tokens by CSS custom property (not
hardcoded hex values), renaming the tokens' *values* — not rewriting dozens of component rules —
was enough to retheme the entire app in one pass. This is the payoff of the token-based approach
documented in the original design-system pass: a "wrong hue family" problem turned out to be a
single-file fix, not a rewrite.

## Phase 1.5, final pass: the default-blue-link defect

A real, severe, previously undetected bug: `src/index.css` had **no global `a` base style at all**
— every link's color came from a component-specific class, and two of the most visible navigation
surfaces had class-name mismatches that meant their styling rules matched nothing:

- `.top-nav-brand` ("Let Them Eat Cookies" wordmark) had layout rules but no `color` — it inherited
  the browser's default link blue.
- The **entire bottom tab bar** was styled under dead selectors `.tab-bar-item`/`.tab-bar-item.active`
  that matched no rendered element — `BottomTabBar.tsx` actually renders
  `.bottom-tab-item`/`.bottom-tab-item-active`. Every tab, active or not, rendered as an unstyled,
  underlined, browser-default-blue link. This is almost certainly the single most visible instance
  of what the user reported as "blue browser-default-looking links."

Fixed with a global `a { color: var(--raspberry); text-decoration: none; }` base (plus a pinned
`a:visited` so links never go purple, and `a:hover { text-decoration: underline }` for affordance),
so any future link that doesn't get a specific component style still inherits something
intentional rather than the user-agent default. Then the two broken components were given real,
specific styles on top: the wordmark is a bold serif brand mark (not styled as a link at all), and
the bottom tab bar got its actual real classes styled for the first time, plus the small
`--pink-bold` active-tab dot mentioned above. A dedicated `.editorial-module a` /
`.cookie-detail-section p a` rule keeps prose-embedded links (e.g. "Visit Crumb for more stories")
underlined by default, since inline text links need a non-color signal distinct from nav links.

This documents what actually governs Cookies' visual language after the Phase 1.5 visual-polish
pass, and marks which parts are inherited/reusable across the Let Them Eat family versus specific
to Cookies. It reflects the real, shipped `src/index.css` — not aspirational styling.

## FAMILY-REUSABLE

These structural patterns came from Cake (and, for native/build concerns, Ramen) and should be
the starting point for any future Let Them Eat app, not reinvented each time.

- **Token shape**: `--cream`/`--plum`/one strong accent/one secondary accent, `--bg`/`--bg-card`/
  `--text`/`--border`/`--shadow`, redefined under `prefers-color-scheme: dark`. Cookies' actual
  values live in `src/index.css` `:root` — Cake's and Ramen's are their own hue, not copied.
- **Lesson for future family apps: "internally coherent" is not the same question as "correct
  identity."** This app shipped three passes with a palette that was contrast-checked, structurally
  sound, and consistently applied — and still read as wrong to the person it was built for. A
  design pass that only re-checks a palette's internal consistency (do the tokens cohere, does
  contrast pass) will never catch that kind of miss; it takes someone actually looking at the
  product and asking "does this feel like what we're trying to be" as a separate, explicit
  question. Ask that question early, not after three rounds of layout polish on top of an
  unexamined palette.
- **Global element-level link defaults are not optional.** This app went three passes with `a`
  links inheriting the browser's default blue/underline in several highly visible places (see
  below) because no one had written a base `a { color; text-decoration }` rule — only
  component-specific classes, some of which had silently dead selectors. Any future app should
  set an intentional global link default in the very first design-tokens pass, not rely on every
  component remembering to style its own links.
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

## Phase 1.5, second pass: the five hub pages, mobile-app shell, and recipes

The five surfaces explicitly deferred above were finished in a follow-up pass, along with a mobile
app-shell audit and 13/13 recipe coverage. This section documents what changed and why, since it's
the most likely reference point for extending any of these patterns later.

### Hub pages: shared language, surface-specific composition

Per explicit instruction, this was **not** "paste `DiscoverFeatureCard` onto five more pages." Each
hub uses `PageHeroBand` (new, family-reusable — see `FAMILY_ARCHITECTURE_REFERENCE.md`) for a
compact photographic header, but the body composition differs by what the surface actually is:

- **Workshop** — kept its existing three-tier grouping (Understand / Master / Solve / Shop) but
  gave `.workshop-link-card` a caramel top-accent border and the same hover-lift/press-scale
  interaction as every other card family, replacing a flat bordered box.
- **Sommelier** — same card grid, but the copy changed from a feature-list tone ("FIND / PAIR /
  CREATE") to the "tell us what you're craving" framing requested, carried by the hero band's
  title and description rather than by restructuring the cards.
- **Atlas** — the region cards are unchanged, but every cookie *inside* a region's list is now a
  photographic row (56px `CookieThumbnail` + name + origin-complexity tag + description) instead
  of a plain text link, making the Region → Tradition → Cookie hierarchy visually legible, not just
  structurally true.
- **Crumb** — genuinely mixed layout: the two most substantial modules (Cookie 101, Cookie Trails)
  are `DiscoverFeatureCard` photo tiles under a magazine-style masthead; the four lighter modules
  (Vocabulary, Find Your Cookie, Quiz, Traditions) stay as the compact `workshop-link-card` grid.
  This is the "shared visual language, surface-specific composition" instruction applied literally
  — not every module gets equal visual weight, matching how a real magazine allocates space.
- **Curated Kitchen** — deliberately did *not* get a photo hero. No legitimate product photography
  exists for this surface (see `PHOTOGRAPHY.md`), and forcing an unrelated cookie photo onto a
  commerce page would be exactly the "misleading imagery" this project's discipline exists to
  avoid. Uses `PageHeroBand`'s plain (no-image) variant instead — same eyebrow/title/description
  typography, no photo.

**A real bug was caught here too**: `PageHeroBand`'s plain variant initially inherited the photo
variant's `display: flex` container, which laid the eyebrow/title/description out as side-by-side
flex items instead of stacked text — caught via screenshot, not just code review, and fixed by
giving `.page-hero-band-plain` its own `display: block`.

### Recipes: glanceable-on-a-phone, not a document

`RecipeSection.tsx`'s layout decisions, in priority order for a reader standing in a kitchen:
1. An at-a-glance strip (`.recipe-glance`) — yield/prep/chill/bake/total/difficulty — is the first
   thing rendered after the intro, styled as a filled `--caramel-bg` block so it reads as a distinct
   "quick facts" zone, not more paragraph text.
2. Ingredients are a real list with a bold amount+unit prefix per line, grouped under a sub-heading
   only when there's more than one group (single-component cookies don't get a redundant "For the
   dough" label).
3. Instructions are a real ordered list (`<ol>`) with a CSS counter-generated numbered badge
   layered on top — accessible list semantics are preserved even though the visual number isn't a
   plain `::marker`.
4. Baker's notes, storage, and variations are progressively disclosed behind a `<details>` — this
   is genuinely secondary information a reader consults after the core recipe, not hidden to
   shorten the page for its own sake.

### Mobile-first verification, this pass

375px / 390px / 430px all checked via `scrollWidth === clientWidth`, not just visual inspection,
across every touched route including Cookie Detail with a full recipe rendered. The
`overflow-x: hidden` requirement on any bleeding element's positioned ancestor (documented in the
first design-system pass) applies again here — `PageHeroBand` uses the same bleed technique as
`CookieHeroImage` and depends on the same `.page-container` rule.
