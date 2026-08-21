# OTA Updates (zero-server, on Cloudflare R2)

Ported directly from Let Them Eat Cake's proven OTA pipeline (see Cake's `OTA_UPDATES.md`) —
same architecture, same code (`src/lib/otaUpdater.ts`, `src/lib/otaConfig.ts`), same
`.github/workflows/ota-publish.yml`, adapted only for this app's own bundle ID, R2 bucket, and
signing key. Cookies has its own dedicated RSA key pair and R2 bucket — never shared with Cake,
Noodles, or Ramen, since the public half is baked into this app's own installed binary.

## Architecture

There is **no backend** — no Capgo hosted service, no self-hosted server, no
database. `@capgo/cli` and `@capgo/capacitor-updater` are used purely as
local/on-device tooling:

- `@capgo/cli` runs in CI only, to zip and encrypt the web build. It never
  calls capgo.app — no account, no API key for the CLI itself.
- `@capgo/capacitor-updater` runs on-device in **manual mode**
  (`autoUpdate: false` in `capacitor.config.ts`). It never checks in with a
  Capgo backend either — it only verifies/decrypts bundles handed to it by our
  own app code.

The app itself owns the update decision, in `src/lib/otaUpdater.ts`: it polls
a static `manifest.json` on Cloudflare R2, and if the version differs from
what's installed, downloads and schedules the new bundle.

```
CI (ota-publish.yml, manual trigger)
  1. npm run build                        → hardened dist/
  2. npx @capgo/cli bundle zip             → plaintext zip + checksum
  3. npx @capgo/cli bundle encrypt         → signed + encrypted zip, checksum, sessionKey
  4. wrangler r2 object put (bundle, then manifest.json)

Cloudflare R2 (public bucket: letthemeatcookies-ota)
  updates/<channel>/bundles/<git-sha>.zip
  updates/<channel>/manifest.json

Native app (src/lib/otaUpdater.ts, manual mode)
  On every launch:
    1. fetch manifest.json (no-store)
    2. compare manifest.version (a commit timestamp) to
       CapacitorUpdater.current().bundle.version numerically — only proceeds
       if the manifest is strictly newer, not just different
    3. if newer: download() (verifies signature, decrypts) → next({ id })
       (schedules the swap for the NEXT launch/background — never an
       in-session reload, which would cause a jarring double-boot)
    4. notifyAppReady() — disarms the native rollback watchdog
```

## Channels

- **staging** and **production** are just different paths in the same R2
  bucket (`updates/staging/...` vs `updates/production/...`), not a backend
  concept. A device's channel is **whatever `VITE_OTA_CHANNEL` was baked into
  its currently-running bundle at build time** — there's no server-side
  assignment.
- Set at native-build time via `VITE_OTA_CHANNEL` in `ios-release.yml`
  (currently hardcoded to `production` — this app has no separate
  staging-signed Android sideload build yet, unlike Cake's `android-build.yml`).
- To move a device from staging to production, it needs a new native build
  (or store update) with `VITE_OTA_CHANNEL=production` — OTA alone can't
  switch a device's channel.

## Publishing an update

**Actions → "Publish OTA Update (zero-server)" → Run workflow → choose
`staging` or `production`.**

There is no automatic trigger — no push, merge, or tag publishes anything.
The workflow always runs `npm run build` (TypeScript typecheck included)
first; if that fails, nothing is published.

**Important — bootstrap state**: as of this writing, no native build of this
app has ever shipped with the `@capgo/capacitor-updater` plugin installed
(it was added in the same pass that created this doc). Adding a Capacitor
plugin itself requires a new store binary, not OTA — so publishing to R2 now
is real infrastructure work, but it has **zero effect on any installed device**
until the next iOS/Android release ships with this plugin compiled in. After
that release ships, this pipeline works exactly like Cake's from day one.

**Recommended flow:** publish to `staging` first, verify on a staging-channel
device/build, then run the same workflow again with `production`.

## Required GitHub configuration

**Secrets** (Settings → Secrets and variables → Actions → Secrets):
- `CLOUDFLARE_API_TOKEN` — R2 read/write scoped token.
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID.
- `R2_BUCKET_NAME` — `letthemeatcookies-ota`.
- `CAPGO_PRIVATE_KEY` — base64 of this app's own `.capgo_key_v2` file (generated
  via `npx @capgo/cli key create`, run inside this repo). Used only by the CI
  `encrypt` step; never printed to logs, never committed. **If this leaks,
  anyone can forge a "signed" update** — treat it like any other signing key.
  Never reused across apps.

**Variables** (Settings → Secrets and variables → Actions → Variables):
- `R2_PUBLIC_BASE_URL` — `https://pub-09fd5eb8da434ebe969795eb5a8887e0.r2.dev`
  (this app's own R2 bucket's public URL). Compiled into every build as
  `VITE_R2_PUBLIC_BASE_URL`.

The matching **public** key is already embedded in `capacitor.config.ts`
(`plugins.CapacitorUpdater.publicKey`) — safe to commit, it only lets the
plugin verify/decrypt.

## What can ship OTA vs. what needs a new store build

**OTA-safe** (web-layer only, no native code):
- UI/CSS/copy fixes
- JavaScript business-logic fixes
- Data/content updates (recipes, cookies, affiliate links, etc.) — all bundled
  JSON, no new native permissions

**Requires a new App Store / Play Store binary, not OTA:**
- Adding/upgrading a Capacitor plugin
- Any change to native permissions or entitlements
- Any change to `capacitor.config.ts` that affects native behavior, or to
  the `ios/`/`android/` projects themselves
- Rotating the RSA key pair (the public half is baked into the installed
  binary — old installs can't verify bundles signed with a new key)
- Anything Apple's App Review Guidelines or Google Play's policy on
  dynamically loaded code would reasonably expect to see in a fresh binary
  review

If in doubt, ship a store update instead of OTA — OTA is for the web layer
only, never a way to route around review.

## Rollback

There is no dashboard button — rollback means re-pointing (or restoring)
`manifest.json` on R2:

- **Automatic, per-device**: any bundle that never calls `notifyAppReady()`
  (crash, white screen, hang) is auto-reverted by the plugin on next launch —
  no action needed.
- **Manual**: to pull a bad update that "works" but is wrong (e.g. a content
  mistake), re-upload the previous release's `manifest.json` to
  `updates/<channel>/manifest.json`.

## Emergency process

1. Identify the last-good `bundles/<sha>.zip` (git history of `ota-publish.yml`
   runs, or R2 bucket contents).
2. Re-upload that bundle's manifest fields as `updates/<channel>/manifest.json`.
3. Fix the issue in the repo, run the OTA workflow again to `staging`, verify,
   then `production`.
4. If the issue is severe enough that no cached bundle is safe, submit an
   emergency store update instead — OTA should never be the only recovery path.
