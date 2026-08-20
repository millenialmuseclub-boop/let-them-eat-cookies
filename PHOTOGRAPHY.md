# Photography — Let Them Eat Cookies

## Status: 13 of 13 cookies photographed, 3 scene images sourced

All 13 canonical cookies now have a real, verified, individually-licensed photo in
`src/data/cookieImages.json`, sourced from Wikimedia Commons and confirmed by fetching each
Commons file page directly (not just a search snippet) to check the depicted cookie, the license,
the uploader/photographer, and the direct `upload.wikimedia.org` file URL:

- `cookie_chocolate_chip` — Kari Sullivan, "Chocolate chip cookies cooling on a wire rack"
- `cookie_snickerdoodle` — EvanProdromou, "Snickerdoodles.jpg"
- `cookie_peanut_butter` — Janet Hudson (Vegan Feast Catering), classic fork-crosshatch peanut
  butter cookies, no chips/toppings
- `cookie_scottish_shortbread` — Nizil Shah, "Scottish Shortbread Biscuits.jpg"
- `cookie_french_sable` — Antoine mf Pelletier, "Le véritable petit sablé" (round butter sablé
  from Sablé-sur-Sarthe; a third historical sablé lineage alongside the Norman/Breton ones named
  in `cookies.json` — same cookie type, worth knowing the exact regional attribution differs)
- `cookie_italian_amaretti` — Tristan Ferne, "Amaretti biscuits for Christmas.jpg"
- `cookie_dutch_stroopwafel` — Takeaway (Commons username), "Stroopwafels 01.jpg"
- `cookie_austrian_linzer` — Häferl, "Linzer Augen der Bäckerei Schwarz.jpg"
- `cookie_maamoul` — روتانا (Rotana), "Ma'amoul Filled with Dates and Nuts.jpg"
- `cookie_indian_nankhatai` — S.M. Samee, "Nankhatai.jpg"
- `cookie_alfajor` — V!NZ, "Alfajores-Argentins.JPG"
- `cookie_anzac_biscuit` — pfctdayelise, "ANZAC biscuits (14 April 2006).jpg" (uploader notes this
  particular batch was made without desiccated coconut, an optional/regional variation — still a
  genuine ANZAC biscuit)
- `cookie_polvoron` — Marianne Perdomo, "Polvorón de Estepa.jpg" (the Spanish/Estepa lineage
  specifically named in `cookies.json`, not the Filipino polvoron variant also on Commons)

**Scene photography** (`src/data/sceneImages.json`) — lower priority, 3 generic baking-process
scenes sourced and verified the same way, since no component in `src/` currently calls
`getSceneImage` with a specific expected id:

- `scene_dough_lab` — ParentingPatch, "Rolling Out Cookie Dough.JPG"
- `scene_chocolate_lab` — John V. Pozniak (Gentgeen), "Melting Chocolate in Double Boiler.jpg"
- `scene_baking_tray` — Sarah Fleming, "Chocolate chip cookies in the oven, March 2008.jpg"

No cookie was left unphotographed and no scene id search came up totally empty this pass — but
scene coverage is intentionally partial (3 of the ~8-9 page contexts named in the original spec:
Main, Workshop hub, Sommelier, Crumb, Cookie 101, Trails, Curated Kitchen, Collections do not yet
have a scene entry). Add more scene ids the same way — search Commons, fetch the actual file page,
confirm the license and a direct `upload.wikimedia.org` URL — rather than guessing a URL pattern.

The source-agnostic image architecture is fully built and working:

- `src/types/images.ts` — `CookieImage`/`SceneImage`, carrying `url`, `photographer`,
  `photographerUrl?`, `source`, `sourceUrl?` per image. Not hard-coded to Unsplash (Cake) or
  Pexels (Ramen) — any legitimately licensed source can be mixed in the same dataset.
- `src/lib/images.ts` — `getCookieImage(cookieId)` / `getSceneImage(sceneId)`, both keyed lookups
  against `src/data/cookieImages.json` / `src/data/sceneImages.json`.
- `src/components/CookieHeroImage.tsx` — renders the real photo with a visible photographer/source
  credit line when one exists, and a clearly-labeled branded placeholder (`🍪` on a token-colored
  background, with `aria-label="{name} (photo not yet available)"`) when one doesn't. The
  placeholder is never a mismatched or fabricated food photo.

**`cookieImages.json` now has all 13 canonical cookies; `sceneImages.json` has 3 scene ids** (see
the Status section above for the full list). Every entry was verified against the actual Commons
file page, not assumed from a search result thumbnail.

## What this means in the running app

Every `CookieCard`, `CookieDetailPage`, and `CookieHeroImage` now renders a real, credited photo
for all 13 cookies. The branded placeholder path (`🍪` on a token-colored background, with
`aria-label="{name} (photo not yet available)"`) is no longer exercised for any cookie, but remains
in place and correct for any future cookie added without a verified photo, and for the scene ids
not yet covered.

## Phase 1.5: photography now reused, and a real bleed bug fixed

Canonical cookie/scene photography is now reused across surfaces rather than sourcing separate
photos per appearance, per the visual-polish pass's direction: Main's four feature-nav cards
(Browse by Origin, Quiz, Sommelier, Workshop) reuse `cookie_alfajor`, `cookie_snickerdoodle`,
`cookie_austrian_linzer`, and `scene_dough_lab` respectively, and Sommelier FIND's result cards
reuse each matched cookie's own canonical thumbnail. No new photography was sourced for this —
same discipline as before (verified Commons entries only), just wired into more places.

Also fixed in this pass: the Cookie Detail hero image (`CookieHeroImage`/
`.cookie-hero-image-figure`) was rendering fully inset in a padded box rather than the intended
edge-to-edge bleed treatment, because two conflicting CSS blocks existed for cookie photography
and the wrong one was live (see `DESIGN_SYSTEM.md` for the full story). Now bleeds correctly on
both the detail hero and the four feature cards, verified with no horizontal overflow on mobile or
desktop.

## Phase 1.5, second pass: reused across the five remaining hub surfaces

Per "reuse intelligently, don't duplicate-source" -- no new cookie photography was sourced this
pass. Existing canonical images were reused as photographic hero bands (new `PageHeroBand`
component, `.page-hero-band` in `index.css`) on the hub pages that were previously text-only tiles:

- Workshop hub -- `scene_dough_lab`
- Sommelier hub -- `cookie_dutch_stroopwafel`
- Atlas -- `cookie_maamoul`, plus a small (56px) `CookieThumbnail` on every cookie row in every
  region list (previously text-only links)
- Crumb -- `scene_baking_tray` (Cookie 101 feature card) and `cookie_scottish_shortbread` (Cookie
  Trails feature card), via `DiscoverFeatureCard`'s existing `image` prop
- Curated Kitchen -- no photo hero (no legitimate product photography exists for this surface; used
  the text-only `PageHeroBand` variant instead of forcing an unrelated cookie photo onto a commerce
  page)

Coverage remains 13/13 cookies, 3 scenes -- this was a reuse pass, not a sourcing pass. Broader
scene coverage (a photo for every remaining page context named in the original spec) is still a
genuine open item for a future pass.

## Phase 1.5, saturation pass: 49/52 cookies photographed

The catalog grew from 13 to 52 canonical cookies. Photography for the 39 new cookies was sourced
the same way as every prior pass: Wikimedia Commons only, every candidate verified by fetching the
actual file page (not a search snippet) to confirm depicted subject, license, photographer, and
the real `upload.wikimedia.org` URL. **36 of the 39 new cookies got verified photos; 3 were
honestly left unphotographed** rather than forcing a weak match:

- `cookie_marranitos` — no Commons file specifically depicting pig-shaped piloncillo bread found.
- `cookie_pepas` — the only close Commons match was Argentine *pastafrola* (a lattice quince tart),
  a related but visually distinct dish, not the small round pepas cookie -- rejected as not
  specific enough.
- `cookie_barazek` — no Commons file for this Levantine sesame-pistachio cookie found despite
  multiple searches.

All three render the app's branded placeholder correctly and honestly (verified in a real browser:
`aria-label="{name} (photo not yet available)"`, no broken image, no mismatched substitute).

One disclosed judgment call: `cookie_ghraybeh`'s photo is a Commons file labeled "Ghribia
(Algerian cookie)" rather than a Levant-specific label. Ghraybeh/ghraiba/ghorayeba are the same
shortbread-cookie family across Maghrebi and Levantine naming conventions, and the file is used on
Wikipedia's general shortbread-biscuit article, so it was treated as a legitimate regional-name
match rather than a lookalike substitution -- flagged here for transparency rather than presented
as a clean single-source match.

**Total coverage: 49/52 cookies, 3 scenes** (scene coverage unchanged this pass — no new scene
photography was sourced, since this pass's photography effort was scoped to the new cookie
catalog per instruction).

## Next phase

Expand scene coverage: source and verify photos for the remaining page contexts (Main hero,
Workshop hub, Sommelier, Crumb, Cookie 101, Trails, Curated Kitchen category headers, Collections)
the same way — search Commons, fetch the actual file page, confirm the license and a direct
`upload.wikimedia.org` URL, never guess a URL pattern. If a cookie or scene ever needs a
different/better photo, follow the same verification discipline rather than accepting a "close
enough" match.
