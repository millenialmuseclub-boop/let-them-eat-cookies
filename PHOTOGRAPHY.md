# Photography — Let Them Eat Cookies

## Status: infrastructure complete, zero photos sourced in this pass (disclosed gap)

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

**`cookieImages.json` and `sceneImages.json` currently contain `{}` — no cookie and no scene has a
sourced photo yet.** This is an honest scope decision, not an oversight: legitimately sourcing and
verifying real, correctly-matched, properly-licensed photography for 13 cookies plus ~8 scene
contexts requires searching real photo libraries, confirming each photo actually depicts the
correct cookie (not a visually-similar different cookie), and capturing accurate
photographer/source/license metadata for each one — work that was not completed in this pass and
that this document does not want to paper over with placeholder-but-labeled-real entries.

## What this means in the running app

Every `CookieCard`, `CookieDetailPage`, and `CookieHeroImage` currently renders the branded
placeholder. The app is fully functional and every accessibility requirement (meaningful
`aria-label`, no broken `<img>` tags) is met by the placeholder path — this is not a broken state,
just an unphotographed one.

## Next phase

Source real photography as part of the planned content-saturation pass: confirm each photo
against the cookie's actual defining characteristics (do not accept a "close enough" match),
record `photographer`/`photographerUrl`/`source`/`sourceUrl` for every image per the schema above,
and only mark this document's status as "coverage complete" once every entry has been verified
against the photo itself — not assumed from a search result thumbnail.
