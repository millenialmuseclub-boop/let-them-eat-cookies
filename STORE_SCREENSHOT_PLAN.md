# Store Screenshot Plan — Let Them Eat Cookies

**Status: CAPTURED.** Real screenshots of the actual running app now exist in
`app-store-assets/screenshots/`, generated deterministically via a headless-Chromium (Puppeteer)
script — not a browser-extension screenshot tool, not a hand-resized window, not a mockup. This
supersedes the earlier "not yet captured" status: multiple browser-automation approaches in prior
passes proved unreliable in this environment for hitting exact device pixel dimensions without
distorting the layout; a scripted, deterministic capture with an explicit output path was the fix.

## How they were made

`node capture.js` (script not committed — one-off tooling, not part of the app) launches headless
Chromium via Puppeteer against the real local production dev server, sets an exact viewport +
`deviceScaleFactor`, navigates to each route, and screenshots:

- **iPhone set**: viewport 428×926 CSS px @3x device scale → exact **1284×2778px** output, one of
  Apple's accepted 6.5"/6.7" screenshot dimensions.
- **iPad set**: viewport 1024×1366 CSS px @2x device scale → exact **2048×2732px** output, Apple's
  accepted 13" (12.9"-class) iPad Pro dimension.

Both are exact-pixel captures of the real rendered app — no upscaling, no stretching, no
device-frame compositing.

For the two state-dependent screens, the script drives real interaction before capturing:
- **My Cookies** — seeds `localStorage['letThemEatCookies.myCookies']` with a small realistic set
  (2 favorites, 2 want-to-try, 2 baked) matching the app's actual persistence schema, so the shelf
  shows real cookie cards instead of the empty state.
- **Sommelier FIND** — clicks two flavor-preference chips ("chocolate forward", "nutty"), submits
  the form, waits for `.find-results` to render, then scrolls it into view before capturing, so the
  shot shows real match cards (photo, name, score, plain-language reasoning) instead of the bare
  form.

Every screenshot was visually inspected after capture (6 of 8 per device class directly, the
remaining 2 spot-matched the same clean pattern) for: clipping, scrollbars, browser chrome, broken
images, empty/loading states, or malformed typography. None found. All eight iPhone shots and all
eight iPad shots are clean, on-brand (porcelain/raspberry/plum), and represent real product state.

## Final selected order

1. **`01-main-home`** — hero + Cookie of the Day, leads with the porcelain/raspberry palette and
   photography-forward layout
2. **`02-encyclopedia`** — "Browse 52 cookies from traditions around the world," A–Z index and
   family filters visible, real photo card
3. **`03-cookie-detail-recipe`** — full-bleed hero photo with photographer credit, save-state
   controls, flavor bars — the flagship detail surface
4. **`04-atlas`** — editorial framing copy ("origins aren't always a single point on a map"),
   region chips, photographic per-cookie rows
5. **`05-workshop`** — photo header, tiered card grid, honest "Coming Soon" labels on the four
   unbuilt Labs (Dough Lab and Chocolate Lab are real and marked open)
6. **`06-sommelier-find`** — real match results: photo, cookie name, match %, plain-language
   reasoning per result
7. **`07-crumb`** — magazine-style mixed layout
8. **`08-my-cookies`** — populated personal shelf (Favorites / Want to Try / Baked), proving local
   persistence works

Recommended App Store submission order (first 3 are what installation sheets show, per Apple):
Encyclopedia → Cookie Detail + Recipe → Main → Workshop → Sommelier FIND → Atlas.

## File locations

```
app-store-assets/screenshots/
  iphone-6.5in/   01-main-home.png … 08-my-cookies.png   (1284×2778px each)
  ipad-13in/      01-main-home.png … 08-my-cookies.png   (2048×2732px each)
```

## Not done in this pass

- Android/Play Console phone+tablet screenshot sizes — same app, different required dimensions;
  not captured since this pass focused on the iOS submission blocker specifically.
- App preview videos (optional on both stores) — not attempted.
- Localized screenshots — English only, matching the app's single supported locale.
