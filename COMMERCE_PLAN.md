# Commerce Plan — Let Them Eat Cookies

## What's imported (this pass)

26 `AffiliateProduct` records in `src/data/products.json`, cross-referenced against the real
Cake/Ramen catalogs read during Phase 0 — every URL, network, and `active` status preserved
exactly as verified in the source app (21 from Cake, 5 from Ramen). Both pre-existing
needs-verification items from the family master were correctly excluded (they're broth-specific,
not Cookies-relevant).

Categories with real coverage: `mixing-prep`, `ingredients-pantry`, `chocolate-decorating`,
`cookie-tools`, `serving-gifting`. `contexts: ["dough-lab"]` or `["chocolate-lab"]` set wherever a
product genuinely applies, powering `ContextualCuratedKitchen` on those two Lab pages.

## Genuine gaps (matches the Phase 0 gap analysis)

**Zero products fall under `bakeware` or `storage`.** No cookie sheet, cooling rack, or
airtight storage container has a verified affiliate link in the family master yet — these are
real, disclosed gaps, not oversights. `CuratedKitchenPage` only renders categories with actual
data, so these two categories simply don't appear rather than showing an empty or placeholder
section.

## Phase 1.5 audit result

Re-verified against `FAMILY_AFFILIATE_MASTER.md`'s own "26 Cookies Direct + Contextual Crossover"
summary: count matches exactly (26/26), no duplicate `id`s, no duplicate `url`s, all 26 `active:
true` with none flagged `needsVerification`, so nothing pending is accidentally clickable. Safe
external-link behavior (`rel="noreferrer sponsored"` + `target="_blank"`) and the affiliate
disclosure link (About & Legal) both confirmed present in a real browser session.

One minor, non-blocking observation: `product_scraper_cake` and `product_bench_scraper_ramen` are
two genuinely distinct offers (different networks, different URLs, different sourceApp) that
happen to share the display name "Bench Scraper," so Curated Kitchen currently shows two
back-to-back tiles with the same title. Not a data-integrity bug — left as-is per this pass's scope
(no new catalog search), worth a content-only rename ("Bench Scraper (Cake)" / a shorter
description delta) in the next commerce pass if it reads as confusing in practice.

## Integrity rules honored

- No fabricated URLs — every `url` is a real, previously-verified link from Cake or Ramen's
  production catalog.
- No verified affiliate link converted to a generic merchant link.
- No `needsVerification` product rendered as clickable (`CuratedKitchenPage`/
  `ContextualCuratedKitchen` both gate on `active && url && !needsVerification`).
- `FAMILY_AFFILIATE_MASTER.md` (in the Phase 0 deliverables) was not overwritten with a
  Cookies-only interpretation — it remains the cross-family source of truth; this file documents
  only what Cookies itself imported and still needs.
