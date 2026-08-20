# App Store Metadata — Let Them Eat Cookies

Status: **live in App Store Connect** (Apple ID `6803303494`), not just a local draft — the fields
below marked "saved" were entered directly into the real App Store Connect record in a prior pass.

- **App name**: Let Them Eat Cookies
- **Subtitle**: A World of Cookies, Explained
- **Bundle ID**: `com.jordypop.letthemeatcookies`
- **SKU**: `LETC-IOS-001`
- **Version**: 1.0 (build 1)
- **Category**: Food & Drink
- **Age rating**: 12+ globally, with regional exceptions (13+ in most countries) — set in App Store
  Connect's ratings questionnaire; not something this pass touches further.

## Promotional Text (saved)

> A world of cookies, explained — history, craft, and complete recipes.

## Description (saved)

> Let Them Eat Cookies is an editorial guide to cookies from around the world — their history,
> their craft, and where they actually come from. Explore 52 canonical cookies across more than
> a dozen culinary traditions, each with a complete original recipe you can actually bake. Browse
> an encyclopedia of real cookie traditions from every region, take the Cookie Personality Quiz,
> get matched to your ideal cookie with the Sommelier, and learn the technique behind every bake
> in the Workshop.

## Keywords (saved)

`cookies,baking,recipes,cookie recipes,dessert,world cuisine,baking guide,dough,patisserie`

## What's New (for this build, if requested at submission)

> Let Them Eat Cookies launches with 52 cookies from traditions around the world, each with a
> complete original recipe, real photography, a global Atlas, the Sommelier flavor-matching tool,
> and a private local library to track what you want to try, have baked, and love.

## Review Notes (for App Review — draft, ready to paste into the Notes field)

> Let Them Eat Cookies is a fully local, account-free reference and recipe app. There is no
> sign-in, no backend, no user data collection (App Privacy is declared as Data Not Collected).
> Locally saved state (My Cookies) lives entirely in the device's localStorage. The Curated Kitchen
> section contains standard e-commerce affiliate links (clearly disclosed in-app) to
> real third-party retailers; no purchase can be made inside the app itself. Two of six planned
> "Labs" in the Workshop section are live (Dough Lab, Chocolate Lab); the remaining four are
> honestly labeled "Coming Soon" rather than hidden or faked.

## Screenshots

See `STORE_SCREENSHOT_PLAN.md` — 8 iPhone (1284×2778) + 8 iPad (2048×2732) screenshots of the real
running app now exist in `app-store-assets/screenshots/`. Not yet uploaded to App Store Connect
(explicitly out of scope for this pass — upload is a real, consequential action reserved for the
user).

## App Store Connect fields — status

- **Support URL** (saved): `https://jordypop.vercel.app/support/let-them-eat-cookies` — verified
  live with real support-contact content before being entered.
- **Privacy Policy URL** (saved): `https://jordypop.vercel.app/policies/let-them-eat-cookies/privacy`
  — verified live before being entered.
- **Marketing URL**: not set (optional).
- **Copyright** (saved): `Jordann Lopez` — matches the same field's value on the sibling Cake app.
- **App Review contact info** (saved): Jordann Lopez, reusing the same phone/email already on file
  for Cake (same real submitter, same App Store Connect account).
- **Export compliance**: answered directly in App Store Connect's build-compliance dialog ("None of
  the algorithms" — standard HTTPS only) rather than via an `Info.plist` key, since that's a
  cleaner, non-destructive way to satisfy it without editing native config unnecessarily.
- **App Privacy declaration** (saved): **Data Not Collected** — the app has no accounts, no
  analytics, and its only network activity is hotlinking Wikimedia Commons images; all persisted
  state is local-only `localStorage`.

## Feature-claim accuracy check

Every claim in the Description/Promotional Text/What's New above is scoped to what's actually
shipped: 52 cookies, 52 recipes, Encyclopedia, Atlas, Workshop (Dough Lab + Chocolate Lab live, 4
more honestly "Coming Soon"), Sommelier FIND (not PAIR/CREATE, which don't exist), Crumb, My
Cookies. No mention of anything unbuilt.

## Not done in this pass

- Nothing uploaded or submitted to App Store Connect beyond what was already saved in the prior
  pass (text fields, URLs, compliance answer, privacy declaration, build attachment).
- Screenshots exist as files but were not uploaded — that upload step, plus clicking "Add for
  Review," are left for the user.
