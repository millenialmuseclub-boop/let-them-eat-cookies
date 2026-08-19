# Native Setup — Let Them Eat Cookies

## Status: iOS and Android native projects generated and verified (Phase 1.5)

The previous pass's "network blocked" gap was specific to that session — `npm install`, `npx cap
add ios`, and `npx cap add android` all ran successfully in this pass with no restrictions.

What's now in place:

- `capacitor.config.ts` — `appId: com.letthemeatcookies.app`, `appName: Let Them Eat Cookies`,
  `webDir: dist`.
- `src/main.tsx` wires the Android hardware back-button listener via `@capacitor/app`.
- `ios/` — a real Xcode project (`App.xcodeproj`), generated via `npx cap add ios`, synced against
  the production build via `npx cap sync ios`. Version `1.0`, build `1` (Capacitor's default,
  matching spec). The 1024×1024 branded icon (verified RGB, no alpha channel via a raw PNG IHDR
  chunk read — colorType 2) is wired into `Assets.xcassets/AppIcon.appiconset` as the single
  universal app-icon slot Xcode 15+ uses. A shared scheme (`ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme`)
  was hand-authored against the template's standard target UUID so CI can run
  `xcodebuild archive -scheme App` once signing exists.
- `android/` — a real Gradle project, generated via `npx cap add android`, synced via
  `npx cap sync android`. `versionCode 1` / `versionName "1.0"` (Capacitor default, matching spec).
  **Not yet done**: the branded launcher icon set (`mipmap-*/ic_launcher*.png` + adaptive
  icon foreground/background) still uses Capacitor's default template icon. The pre-generated
  brand icon set in `assets/icon/` is sized for iOS's App Store slots (29–1024px) and does not
  include the specific mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi (48/72/96/144/192px) sizes or the
  safe-zone-inset adaptive-icon foreground layer Android needs — and this environment has no image
  resizing tool available (no ImageMagick, no Python+Pillow, no `sharp`) to regenerate them
  correctly. Forcing an un-resized or un-inset image into those slots risks a cropped or
  incorrectly-scaled launcher icon in production, so this was left as a disclosed gap rather than
  done badly. **Action needed**: regenerate the Android launcher/adaptive-icon set from
  `assets/icon/icon-1024.png` with a proper image tool (Android Studio's Image Asset Studio is the
  simplest path) before shipping.
- `npm run build && npx cap sync` (both platforms) verified clean after every change in this pass.

Do not register an Apple Developer identifier, App Store Connect record, or Google Play Console
listing, and do not add any signing credentials — those remain explicit user actions.

## Cloud release workflow

`.github/workflows/ios-release.yml` — ported from Ramen's proven TestFlight structure (checkout →
build web → `cap sync ios` → import signing cert → install provisioning profile → `xcodebuild
archive` → export → `xcrun altool` upload). The signing/export/upload steps are `echo` placeholders
since Cookies has no Apple Developer resources yet; the workflow documents exactly which repository
secrets it will need once they exist:

- `IOS_DIST_SIGNING_CERT_P12_BASE64`
- `IOS_DIST_SIGNING_CERT_PASSWORD`
- `IOS_PROVISIONING_PROFILE_BASE64`
- `APP_STORE_CONNECT_KEY_ID`
- `APP_STORE_CONNECT_ISSUER_ID`
- `APP_STORE_CONNECT_API_KEY_BASE64`

No secrets, certificates, or profiles are committed anywhere in this repo. `.gitignore` already
excludes `*.p12`, `*.mobileprovision`, `*.p8`, `*.keystore`, `*.jks`.

## Android release path (documented, not built)

Standard Capacitor Android release: `./gradlew bundleRelease` against a release-signed keystore
(never committed), uploading the resulting `.aab` to Google Play Console manually or via a future
Actions job mirroring the iOS workflow's structure once one exists.
