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
- `npm install`/`npm run build` could not be executed this session (npm registry access was
  blocked mid-session) — see the final report and `NATIVE_SETUP.md`/`ACCESSIBILITY.md` for what
  that means for verification claims.
