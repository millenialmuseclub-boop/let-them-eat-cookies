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

## Genuinely not verified in this pass

- No actual screen reader (VoiceOver/NVDA/TalkBack) was run — verification was via DOM/ARIA
  inspection and scripted keyboard-focus checks in a real browser, not an assistive-technology
  session.
- No automated contrast checker (axe, Lighthouse) was run.
- Touch target sizing (~44px) was reasoned from CSS values, not measured on a physical device.

These remain open QA items for a future pass, not claimed as verified.
