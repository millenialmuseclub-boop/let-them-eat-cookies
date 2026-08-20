# Accessibility — Let Them Eat Cookies

Inherited from Ramen's ACCESSIBILITY.md conventions (WCAG 2.2 AA target), applied during
implementation rather than as a final pass.

## Implemented

- **Landmarks & headings**: every page is a single `<main>` inside `#main-content`; each page has
  exactly one `<h1>`, with `<h2>`/`<h3>` used hierarchically for sections (Cookie Detail, Lab,
  Anatomy, Encyclopedia).
- **Skip link**: `.skip-link` in `App.tsx` jumps straight to `#main-content`, before the top nav.
- **Toggle groups**: A–Z filters, family filters, Lab variable pickers, Build a Cookie stage
  pickers, and flavor-tag pickers in FIND all use `role="group"` + `aria-pressed` on each button,
  never color alone to indicate selection (selected state also gets a distinct border/fill via
  CSS, checked in the stylesheet's `[aria-pressed="true"]` rules).
- **Disclosures**: Cookie Anatomy steps, Lab concept glossary entries, and Traditions-by-Region
  accordion items all use `aria-expanded` + `aria-controls` (Anatomy/Lab) or native `<details>`
  (Traditions/Troubleshooter) rather than hiding content with no semantic signal.
- **Live regions**: FIND results, Lab variable effect panels, Build a Cookie compatibility results,
  and the Personality Quiz result screen are all `aria-live="polite"`, so dynamically-computed
  content is announced without a full page reload.
- **Non-color-only state**: My Cookies badges pair a checkmark/star glyph with `aria-pressed`, not
  color alone; flavor-profile and Lab "bars" visualizations carry a text `aria-label` stating the
  numeric value, not just filled/unfilled segments.
- **Meaningful alt text**: `CookieHeroImage`/`CookieThumbnail` use the cookie's real name as `alt`
  when a photo exists, and a descriptive `aria-label` on the placeholder when it doesn't (see
  PHOTOGRAPHY.md) — never a generic "cookie image" or empty alt on a meaningful image.
  Decorative icons (tab icons, card icons) are `aria-hidden="true"`.
   - Photography is not yet sourced (see PHOTOGRAPHY.md); once real photos are added, each `alt`
    should be re-verified against the specific photo, not left as the cookie name by default.
- **Touch targets**: bottom tab items, chip filters, and quiz options are sized via
  `index.css` for a minimum ~44px tap target (spot-checked in CSS, not device-tested — see QA
  notes below).
- **Reduced motion**: `index.css` includes a `prefers-reduced-motion: reduce` block disabling
  transitions/animations globally.
- **Logical tab order**: no `tabIndex` overrides were introduced anywhere in this pass; DOM order
  matches visual/reading order on every page.

## Verified in Phase 1.5

`npm install`/`npm run build` ran cleanly this pass; the app was built, served, and driven in a
real browser (desktop and 375px mobile viewport) across all 22 routes.

- **Keyboard navigation**: confirmed by tabbing from a fresh page load — the skip link is the
  first focusable element, `document.activeElement` verified via script.
- **`:focus-visible` styling**: confirmed present in `index.css` (`a:focus-visible`,
  `button:focus-visible`, `input/select/textarea/[tabindex]:focus-visible`).
- **`aria-pressed` + non-color-only state**: confirmed on My Cookies controls
  (`✓ Want to Try` / `★ Favorite`) via `getAttribute('aria-pressed')` after clicking, both before
  and after a full page reload — state persists and the glyph/aria-pressed pairing survives.
  Sommelier FIND's `role="group"` flavor/family toggle buttons and live results region
  (`aria-live="polite"`) were exercised end-to-end (selected two flavor tags, submitted, got
  live-rendered ranked matches with plain-language reasoning).
- **Safe external links**: Curated Kitchen affiliate links use `rel="noreferrer sponsored"` +
  `target="_blank"`, confirmed by source inspection.
- **No console errors** across any route in a real browser session.

Two real layout/clearance bugs were found and fixed in this pass (not merely documented):

1. The fixed top nav bar had no compensating `padding-top` on `.app-content`, so it visually
   clipped the top of every page's `<h1>` (confirmed via screenshot, not just DOM inspection).
   Fixed by adding `padding-top: calc(56px + env(safe-area-inset-top, 0px))` to `.app-content`.
2. `FloatingBackButton` was `position: fixed` at a constant viewport bottom-left offset, so it
   visually overlapped whatever body content (e.g. the Family/Texture fact list on Cookie Detail)
   happened to scroll underneath it — a real legibility bug, confirmed via screenshot on mobile.
   Fixed by making `.page-container` a positioning context and changing the button to
   `position: absolute` pinned to the container's top-left (with a reserved top gutter via
   `.page-container:has(> .floating-back-button) { padding-top: 64px }` for pages with no hero
   image), so it scrolls away with the page instead of persistently overlapping content.

## Phase 1.5, second pass: recipes + hub pages

- Recipe steps are a real `<ol>` (ordered list), not a styled `<div>` sequence -- the visual step
  number is CSS-generated content (`counter(recipe-step)`) layered on top of, not replacing,
  genuine list semantics, so screen readers still announce "item N of M."
- Baker's notes / storage / variations are behind a native `<details>`/`<summary>` disclosure
  (same pattern already used for Traditions/Troubleshooter), with `summary` sized to a 44px
  minimum touch target.
- `PageHeroBand` (new, used on Workshop/Sommelier/Atlas/Curated Kitchen headers) renders its
  `<h1>` as real page content inside the scrim, not as a background-image caption -- confirmed
  via a fresh-browser DOM check that heading order/hierarchy is unaffected by the photo treatment.
  Decorative hero photos use `alt=""` (the visible eyebrow + h1 already carry the page's meaning);
  only genuinely informative photos (recipe hero, cookie thumbnails) carry a real `alt`.
- Atlas's per-cookie thumbnails reuse `CookieThumbnail`, which already handles alt text and the
  branded-placeholder fallback -- no new accessibility surface introduced.
- No palette or contrast changes were made; all new UI (recipe glance strip, hero bands, My
  Cookies shelf cards) uses existing WCAG-AA-checked tokens (`--caramel`, `--caramel-bg`,
  `--bg-card`, `--border`) rather than new colors.

## Phase 1.5, final pass: palette replacement + link-defect fix

The entire color palette was replaced (see `DESIGN_SYSTEM.md` for the full rationale). Every new
color was contrast-checked before shipping, not after: `--plum` text against `--cream`/`--bg-card`
(~14.5:1 and ~15.3:1), `--raspberry` as text/links against both backgrounds (~7:1), white text on
`--raspberry` button fills (~7.6:1), `--champagne-strong` for small text (~4.6:1), and the
`--pink-bold` accent explicitly restricted to backgrounds/large-bold-text uses only, since its own
text contrast (~4.56:1) is borderline-AA rather than comfortable. Dark-mode equivalents were
checked the same way (all ≥6:1). None of this was assumed from the light-mode values transferring
cleanly — each dark-mode color was independently computed.

A real, previously undetected accessibility-relevant defect was found and fixed: no global `a`
element had an explicit `color`/`text-decoration`, and two major navigation surfaces (the top-nav
wordmark, the entire bottom tab bar) had dead CSS selectors that matched no rendered element, so
they fell through to the browser's default link styling. This wasn't just a visual miss — an
inconsistent, browser-default link treatment sitting next to intentionally-styled links is itself
a signal-clarity problem for users relying on visual link affordances. Fixed with a global `a`
base style plus real, specific rules for both broken components (see `DESIGN_SYSTEM.md`). Visited
links are explicitly pinned to the same raspberry (never purple), and `:focus-visible` was left
untouched -- fixing the color defect did not touch the keyboard-focus outline rule.

## Genuinely not verified in this pass

- No actual screen reader (VoiceOver/NVDA/TalkBack) was run — verification was via DOM/ARIA
  inspection and scripted keyboard-focus checks in a real browser, not an assistive-technology
  session.
- No automated contrast checker (axe, Lighthouse) was run.
- Touch target sizing (~44px) was reasoned from CSS values, not measured on a physical device.

These remain open QA items for a future pass, not claimed as verified.
