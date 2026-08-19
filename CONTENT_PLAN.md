# Content Plan — Let Them Eat Cookies

## Phase 1 (this pass): 13 cookies, architecture-proving content

Seeded deliberately varied, internationally diverse cookies to stress-test the architecture, not
to reach saturation:

Chocolate Chip, Snickerdoodle, Peanut Butter (North America) · Scottish Shortbread, French Sablé
(Western Europe) · Italian Amaretti, Austrian Linzer (Central/Southern Europe) · Dutch Stroopwafel
(Western Europe, itself a wafer/confection edge case) · Ma'amoul (Middle East, cross-community) ·
Indian Nankhatai (South Asia, cross-cultural origin) · Argentine Alfajor (Latin America) · ANZAC
Biscuit (Oceania) · Mexican/Spanish Polvorón (Iberia & Latin America, dual lineage).

Deliberately not seeded from the original candidate list this pass: Baci di Dama and Speculaas/
Speculoos — omitted to keep the seed set at a reviewable size rather than because either lacks
merit; both are reasonable additions for the next pass.

## What Phase 1 content proves

- Every `CookieFamily` value (`drop | rolled | shaped | bar | sandwich | wafer`) has at least one
  real record.
- Every `originComplexity` value (`single-origin | regional | multi-region | disputed`) has at
  least one real record (Polvorón = multi-region; Ma'amoul = regional/shared).
- Encyclopedia, Atlas, Collections, Personality Quiz, Sommelier FIND, and Build a Cookie all
  operate on the same 13 records without any surface needing cookie-specific special-casing.

## Phase 1.5 verification note

Confirmed (not just assumed) that `src/types/lab.ts`'s `Lab` interface and `LabPage`/
`LabExplorer` are already fully generic — Dough Lab and Chocolate Lab are two independent data
records against the exact same component/route code, proven by driving both in a real browser.
`WorkshopPage.tsx` already has a static `allLabs` list covering all six planned labs (Dough, Flour,
Sugar, Butter & Fat, Chocolate, Texture) and gates each tile on whether `labs.json` has a matching
`slug`, rendering an honest "Coming Soon" tile for the four not yet written. No code changes were
needed to prepare for Flour/Sugar/Butter & Fat/Texture Labs — only new `labs.json` entries in the
content-saturation pass. Deliberately did not add stub/shell entries for those four in this pass:
doing so would have flipped their Workshop tiles from "Coming Soon" to live links pointing at
placeholder content, which is exactly the premature-saturation risk this pass was scoped to avoid.

## Next phase (recommended, not started here)

Per the user's own framing: expand from ~13 to ~35–40 cookies, finish the remaining 4 Labs (Flour,
Sugar, Butter & Fat, Texture — schema and routing already proven ready, see above), build Sommelier
PAIR with real pairing data, expand Crumb content depth, saturate real photography for the full
catalog, fill the remaining `bakeware`/`storage` commerce gaps, and finish Android launcher-icon
generation (see `NATIVE_SETUP.md`) plus a first real device/store QA pass.
