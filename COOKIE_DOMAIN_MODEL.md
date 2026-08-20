# Cookie Domain Model — Let Them Eat Cookies

Cookies' own parallel domain model (not an extension of Cake's or Ramen's types). Source of truth:
`src/types/cookie.ts`, `src/types/workshop.ts`, `src/types/atlas.ts`, `src/types/lab.ts`.

## CookieProfile (`src/types/cookie.ts`)

`id, name, localName?, description, origin, historicalContext, culturalSignificance, dominantFat,
sweetener, leavening, family, textureCategory, commonMixIns[], commonVariations[],
modernVariations[], flavorProfile{sweetness,richness,crispness,spice}, flavorTags[],
preparationOverview, variationTag, variationNote`

13 seeded records in `src/data/cookies.json`. `family` is one of `drop | rolled | shaped | bar |
sandwich | wafer`; `textureCategory` one of `crisp | chewy | soft | crumbly | cakey`.

## Cookie Anatomy (`src/types/workshop.ts` → `CookieAnatomyStage`)

Nine stages, genuinely cookie-specific (not Ramen's 8-stage ported mechanically): Flour/Base, Fat,
Sugar, Egg/Binder, Leavening, Flavor, Mix-ins, Filling, Finish. Each carries `whatItIs`,
`contributes`, `commonForms[]`, and `interaction`. Seeded in `src/data/cookieAnatomy.json`.

## Build a Cookie components (`DoughComponent`)

41 components across the same 9 categories (`DoughComponentCategory`), each carrying
`sourceCookieIds` back-references to real seeded cookies. Traditional-tier compatibility in
`src/lib/workshop.ts` is *derived* from two components sharing a `sourceCookieId`, not
hand-authored per pair — the same approach Ramen used for Build a Bowl.

## Atlas (`src/types/atlas.ts`)

`RegionalCookieEntry` (13 records, one per cookie) carries an honest `originComplexity`:
`single-origin | regional | multi-region | disputed`. `WorldRegionTradition` (10 records) groups
entries by `worldRegion` with an editorial introduction. No forced single-point-on-a-map precision
for genuinely shared or disputed traditions (e.g. Polvorón is tagged `multi-region` across
Spain/Mexico; Ma'amoul's `WorldRegionTradition` intro explicitly notes its cross-community
history).

## Recipe (`src/types/recipe.ts`)

One canonical, structured `Recipe` per `CookieProfile` (never a prose blob) — `id, cookieId, title,
intro, yield, prepTime, chillTime?, bakeTime, totalTime, difficulty, equipment[], temperature,
ingredientGroups[]` (each `{title, ingredients[]}` with `{ingredient, amount, unit?, note?}`),
`instructions[]` (`{step, stage?, instruction, techniqueNote?, relatedLabSlug?}`), `bakersNotes[],
storage, makeAhead?, freezing?, substitutions?, variations?, allergenNotes?,
relatedWorkshopLessons?, sourceNote`. 13/13 seeded in `src/data/recipes.json`, one per canonical
cookie, keyed via `RECIPE_BY_COOKIE_ID`/`getRecipeForCookie()` in `src/lib/data.ts`. Rendered by
`RecipeSection.tsx` on Cookie Detail, between Technique and Variations. `instructions[].
relatedLabSlug` links a step directly to the Lab that explains its underlying technique (e.g. a
chilling step links to `dough-lab`) rather than duplicating Workshop content inside the recipe —
only populated for labs that actually exist (`dough-lab`, `chocolate-lab`) to avoid dead links into
"Coming Soon" labs. All recipe prose is original, written for this app from the historical/technique
notes already in `cookies.json`, not copied from any published recipe (see each `sourceNote`).

## Lab (`src/types/lab.ts`)

Reused verbatim from Ramen's schema: `concepts[]` (tap-to-expand glossary) + `variables[]`
(qualitative option pickers with 0–5 "bars," never a numeric calculator). Two labs populated:
Dough Lab (creaming/rubbing-in/melted-fat method, chilling, portioning) and Chocolate Lab
(chip/chunk/coating format, tempering, cocoa type). Four more labs (Flour, Sugar, Butter & Fat,
Texture) are referenced by `WorkshopPage.tsx` as "Coming Soon" — same architecture, not yet
populated, per the content-phase scope decision.
