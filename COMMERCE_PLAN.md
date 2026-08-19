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

## Integrity rules honored

- No fabricated URLs — every `url` is a real, previously-verified link from Cake or Ramen's
  production catalog.
- No verified affiliate link converted to a generic merchant link.
- No `needsVerification` product rendered as clickable (`CuratedKitchenPage`/
  `ContextualCuratedKitchen` both gate on `active && url && !needsVerification`).
- `FAMILY_AFFILIATE_MASTER.md` (in the Phase 0 deliverables) was not overwritten with a
  Cookies-only interpretation — it remains the cross-family source of truth; this file documents
  only what Cookies itself imported and still needs.
