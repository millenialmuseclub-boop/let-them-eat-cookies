# Family Architecture Reference — Let Them Eat Cookies

What Cookies inherited from Cake/Ramen, and where it deliberately diverged.

## Inherited near-verbatim

- Stack: React 19 + TypeScript + Vite + `react-router-dom` v7, no state library —
  `useSyncExternalStore` + module-level pub/sub for local persistence.
- `tsconfig.json`/`tsconfig.app.json`/`tsconfig.node.json` — Ramen's strict config, unchanged.
- `capacitor.config.ts` shape, `src/main.tsx` (BrowserRouter + Android back-button handling).
- Data-driven `HUBS` array (`src/data/hubs.ts`) powering both `BottomTabBar` and hub pages.
- The Lab architecture (`src/types/lab.ts`, `src/components/LabExplorer.tsx`) — concept glossary +
  qualitative variable pickers, never a calculator.
- The My-library persistence pattern (`src/lib/myCookies.ts`) — versioned localStorage payload,
  independent boolean states, private notes, no accounts.
- Deterministic weighted-scoring Sommelier (`src/lib/sommelier.ts`) — no LLM, plain-language
  explainer alongside the score.
- Tally-based Personality Quiz (`src/lib/personalityQuiz.ts`) — distinct code path from FIND.
- Commerce entity shape — Cake's flatter `AffiliateProduct` (network/url/active on the product
  directly), per the master spec's §25 decision, not Ramen's nested `offers[]`.
- WCAG 2.2 AA conventions from Ramen's `ACCESSIBILITY.md` (see this repo's own `ACCESSIBILITY.md`
  for what's actually implemented here).

## New family-reusable patterns (Phase 1.5, second pass)

- **Canonical Food Entity → Recipe architecture** (`src/types/recipe.ts`, `src/data/recipes.json`,
  `src/lib/data.ts`'s `getRecipeForCookie()`, `RecipeSection.tsx`): a structured (never prose-blob)
  recipe keyed 1:1 to a canonical entity, with grouped ingredients, staged/numbered instructions,
  and `relatedLabSlug` links from individual steps back into the Workshop-equivalent technique
  system rather than duplicating technique explanations inline. This is the family's first Recipe
  implementation and is designed to generalize: `Canonical Food Entity → Recipe → Ingredients →
  Method → Technique Knowledge (Workshop/Labs) → Troubleshooting (shared engine, not per-entity) →
  Contextual Commerce (Curated Kitchen)`. Should port cleanly to Cake (cakes) and Ramen (bowls)
  without redesign — **not generalized into a shared package in this pass**, per instruction, but
  documented here as the pattern to reuse when that need is real.
- **`PageHeroBand`** (`src/components/PageHeroBand.tsx`): a compact photographic header for hub
  pages, distinct from the full-page `CookieHeroImage` and the grid-oriented
  `DiscoverFeatureCard` — same bleed/scrim visual language, hub-header proportions. Has a plain
  (no-photo) variant for surfaces with no legitimate photography (Curated Kitchen). Reusable
  anywhere a family app needs a photographic section header shorter than a full page hero.

## Deliberately different from both Cake and Ramen

- **Genuinely global Atlas**, not a single-country deep-dive like Ramen's Japan-focused Atlas —
  `WorldRegionTradition`/`RegionalCookieEntry` model countries/regions generically, with an
  `originComplexity` field neither Cake nor Ramen needed.
- **Nine-stage Cookie Anatomy**, authored fresh for cookies (Flour/Base, Fat, Sugar, Egg/Binder,
  Leavening, Flavor, Mix-ins, Filling, Finish) — not Ramen's 8-stage bowl anatomy relabeled.
- **Source-agnostic photography** (`src/types/images.ts`) — the one piece of infrastructure this
  pass explicitly built to *not* repeat Cake's Unsplash lock-in or Ramen's Pexels lock-in, even
  though no photos were sourced yet in this pass (see `PHOTOGRAPHY.md`).
- **Card-only Atlas** — no interactive SVG map. Ramen used `react-simple-maps`/`world-atlas`;
  Cookies deliberately omits that dependency and relies entirely on the region-chip + card grid UI
  (a scoped-down decision, documented as a genuine gap below, not hidden).

## Scope reductions from this pass, disclosed here and in the final report

- Single consolidated `src/index.css` rather than per-page stylesheets.
- Sommelier PAIR and CREATE are "Coming Soon" placeholders — FIND is the only implemented mode.
- Crumb has 6 modules with real but intentionally lighter content than Ramen's Slurp tab.
- No interactive Atlas map (see above).
- Sommelier PAIR/CREATE, and the remaining 4 Workshop Labs (Flour, Sugar, Butter & Fat, Texture),
  remain "Coming Soon" — the shared architecture for both was verified ready in earlier passes
  (see `CONTENT_PLAN.md`), but populating them is scoped to the future content-saturation pass.
