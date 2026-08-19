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

## Genuinely not verified in this pass

`npm install`/`npm run build` could not run this session because outbound access to the npm
registry was blocked (see NATIVE_SETUP.md and the final report). That means:

- No screen reader (VoiceOver/NVDA/TalkBack) was actually run against the built app.
- No automated contrast checker (axe, Lighthouse) was run.
- Keyboard-only navigation was reasoned about from the JSX/ARIA (every interactive element is a
  real `<button>`/`<a>`/`<input>`, none are `<div onClick>`), but never manually tab-walked in a
  browser.

These are reported here as open QA items, not claimed as verified.
