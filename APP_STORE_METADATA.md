# App Store Metadata (Draft) — Let Them Eat Cookies

Not final copy — structure prepared for the eventual App Store Connect listing.

- **App name**: Let Them Eat Cookies
- **Subtitle (draft)**: A World of Cookies, Explained
- **Bundle ID**: `com.jordypop.letthemeatcookies`
- **Version**: 1.0 (build 1)
- **Category**: Food & Drink
- **Age rating**: 4+ (no objectionable content)

## Description (draft)

> Let Them Eat Cookies is an editorial guide to cookies from around the world — their history,
> their craft, and where they actually come from. Explore 52 canonical cookies across more than
> a dozen culinary traditions, each with a complete original recipe you can actually bake. Browse
> an encyclopedia of real cookie traditions from every region, take the Cookie Personality Quiz,
> get matched to your ideal cookie with the Sommelier, and learn the technique behind every bake
> in the Workshop.

## Keywords (draft)

cookies, baking, recipes, cookie recipes, dessert, world cuisine, baking guide, dough, pâtisserie

## What's new since the last metadata draft

52 canonical cookies (up from 13), each with a complete structured recipe (52/52) -- previously
this listing could only promise an encyclopedia, not a usable recipe collection.

## Screenshots

See `STORE_SCREENSHOT_PLAN.md`.

## App Store Connect fields (draft, not yet entered anywhere)

- **Support URL**: not yet set — needs a real, reachable page (the family's `jordypop.vercel.app`
  pattern per `ABOUT_PAGE`/`FAMILY_ARCHITECTURE_REFERENCE.md`, or a dedicated one). This was
  flagged as "not independently verified as live for this app" in an earlier pass and remains
  unverified — check before submission, not after.
- **Marketing URL**: optional, not set.
- **Privacy policy URL**: same caveat as Support URL — the in-app About page links to a URL
  following the family pattern but its liveness for Cookies specifically has not been confirmed.
- **Copyright**: draft `© 2026 [rights holder]` — needs the actual legal name.
- **Age rating**: 4+ (no objectionable content) — the app has no user-generated content, no
  chat/social features, no mature themes; this should hold up as-is in Apple's questionnaire.
- **Export compliance / encryption**: the app uses only standard HTTPS (no custom encryption). No
  `ITSAppUsesNonExemptEncryption` key is currently set in `Info.plist` — Apple will ask the
  encryption question on every upload without it; adding
  `<key>ITSAppUsesNonExemptEncryption</key><false/>` to `Info.plist` would let it be answered "No"
  automatically. Not added in this pass to avoid touching Info.plist without the user confirming
  that's actually correct for how the app will be distributed.
- **Privacy disclosures (App Privacy / "nutrition label")**: the app collects nothing — no
  accounts, no analytics, no network calls beyond hotlinking Wikimedia Commons images, all saved
  state (My Cookies) is local `localStorage` only. This should map to "Data Not Collected" in App
  Store Connect's privacy questionnaire, but that questionnaire must still be filled out
  in-console by whoever holds App Store Connect access — not something I can pre-fill from here.

## Status

**No App Store Connect record exists** — creating one requires Apple Developer portal access this
environment doesn't have (and shouldn't be given credentials for). This document remains a content
draft only, ready to paste in once that record exists. Feature claims in the description above are
scoped to what's actually shipped: 52 cookies, 52 recipes, Encyclopedia, Atlas, Workshop (2 of 6
Labs live, described generically as "the technique behind every bake" rather than naming specific
Labs), Sommelier FIND (not PAIR/CREATE, which don't exist), Crumb, My Cookies.
