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

## Phase 1.5, second pass: 100% recipe coverage + content-completeness rule

All 13 canonical cookies now have a complete, original, structured `Recipe` record (see
`COOKIE_DOMAIN_MODEL.md`'s Recipe section and `src/data/recipes.json`) — 13/13, zero "Coming Soon"
or placeholder recipes. Each recipe respects its cookie's actual tradition rather than a shared
American-drop-cookie template: Stroopwafel is a yeasted waffle-iron batter (not oven-baked at all),
Ma'amoul's dough gets a multi-hour unrefrigerated semolina rest before shaping, Amaretti has no
flour or butter, Polvorón requires toasting the flour first. Multi-component cookies (Stroopwafel,
Linzer, Alfajor, Ma'amoul) use grouped ingredient lists (e.g. "For the dough" / "For the filling")
rather than one flat list. Every recipe carries a `sourceNote` disclosing that its prose was
written originally for this app from `cookies.json`'s existing historical/technique notes, never
copied from a published recipe.

This establishes the **content-completeness rule** now documented in the master spec: a canonical
cookie isn't production-complete without a recipe (among other fields) — future cookies in the
35-40 expansion must be seeded complete, not name-first-fill-later.

## Phase 1.5, saturation pass: 13 → 52 canonical cookies

Expanded the catalog to 52 cookies (target was "at least 50, not hundreds"), every one seeded
complete per the content-completeness rule established in the prior pass — identity, origin,
history, flavor/texture profile, Atlas region entry, recipe, and photography-or-documented-fallback
all present from the start, not seeded by name and filled in later. The 39 new cookies:

North America: Oatmeal Raisin, Sugar Cookie, Gingersnap, Black and White Cookie, White Chocolate
Macadamia Nut Cookie. Latin America: Marranitos (Mexico), Pepas (Argentina), Mantecados and
Almendrados (Spain). Western Europe: Palets Bretons, Langues de Chat, Florentine, French Macaron
(France), Speculaas, Kletskoppen (Netherlands/Belgium). Southern Europe: Biscotti, Baci di Dama,
Pizzelle, Ricciarelli, Brutti ma Buoni (Italy), Kourabiedes, Melomakarona (Greece). British Isles:
Digestive Biscuit, Empire Biscuit, Melting Moments. Central Europe: Lebkuchen, Pfeffernüsse,
Springerle (Germany), Vanillekipferl (Austria), Spitzbuben (Switzerland/Germany). **Scandinavia
(new `WorldRegionTradition`)**: Pepparkakor, Hallongrottor (Sweden), Krumkake (Norway). Middle
East: Ghraybeh, Barazek, Kleicha (Iraq). South Asia: Thekua (Bihar, India), Karachi Biscuit
(Hyderabad, India — despite the name, not Pakistani, a piece of Partition-era history worth
getting right). Oceania: Monte Carlo Biscuit (Australia).

Six new canonical Collections were added (Chocolate Lovers, Nut-Based Cookies, Spiced Cookies,
Crisp & Snappy, Elegant Cookie Tin, Beginner-Friendly Baking), and the six original collections
were extended with newly relevant cookies — all collections reference canonical `cookieId`s only,
no duplicated cookie data.

Data integrity verified programmatically, not just by eye: every cookie has exactly one Atlas
region entry and one recipe (52/52 both), no duplicate IDs anywhere across cookies/recipes/regions/
collections, every collection and region `cookieId` reference resolves to a real cookie, every
`flavorTag` and enum field validates against the TypeScript union types.

Recipe coverage: **52/52**. Photography coverage: **49/52** (3 honest gaps — see `PHOTOGRAPHY.md`).

## Next phase (recommended, not started here)

Finish the remaining 4 Labs (Flour, Sugar, Butter & Fat, Texture — schema and routing proven ready
across two now-populated labs), build Sommelier PAIR with real pairing data, expand Crumb content
depth, source the 3 remaining cookie photography gaps plus broader scene photography, fill the
remaining `bakeware`/`storage` commerce gaps, resolve the Android launcher-icon gap (see
`NATIVE_SETUP.md`), and move toward TestFlight/App Store submission now that the visual identity
and content catalog are both at release-candidate scale.
