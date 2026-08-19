# Native Setup — Let Them Eat Cookies

## Status: structure prepared, native platforms NOT generated in this pass

This pass could not run `npm install` or `npx cap add ios|android` because this session's
outbound network access was restricted mid-session (the npm registry returned `403
host_not_allowed` on every request, including plain `npm view react version`). This is a genuine,
disclosed gap, not a skipped step — attempting to fake native project output would be worse than
reporting it honestly.

What **is** in place, ready for `npx cap add` once installs are unblocked:

- `capacitor.config.ts` — `appId: com.letthemeatcookies.app`, `appName: Let Them Eat Cookies`,
  `webDir: dist`. No StatusBar/SplashScreen plugin overrides, matching Ramen's minimal config.
- `src/main.tsx` already wires the Android hardware back-button listener via `@capacitor/app`,
  deferring to `window.history`, ported directly from Ramen's proven pattern.
- `package.json` lists `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, `@capacitor/android`,
  `@capacitor/app` at the same major versions Ramen uses.
- `assets/icon/icon-1024.png` — the required 1024×1024 App Store icon, generated at RGB (no alpha
  channel — verified: `Image.new('RGB', ...)`, never RGBA), plus a full companion icon set
  (29–1024px) for iOS/Android app icon slots.
- `assets/splash.png` — a 2732×2732 universal splash on the cream background token, with the mark
  centered.
- `ios/README.md` and `android/README.md` — placeholders marking where `npx cap add` output will
  land; **no Xcode project, no Android Gradle project, and no shared scheme exist yet.**

## To finish native setup once network access is available

```
npm install
npm run build
npx cap add ios
npx cap add android
npx cap copy
```

Then, following Ramen's structure: add the icon set to `ios/App/App/Assets.xcassets` and
`android/app/src/main/res/mipmap-*`, set the bundle/version to `1.0` / build `1` in both
projects, and create a shared Xcode scheme for CI archiving. **Do not register an Apple Developer
identifier, App Store Connect record, or Google Play Console listing, and do not add any signing
credentials, in this pass or automatically in a future pass — those are explicit user actions.**

## GitHub Actions release workflow — structure only, not runnable

No workflow file was authored in this pass (out of scope given the install blocker — a workflow
that references files that don't exist yet, like `ios/App/App.xcodeproj`, would be misleading).
When native projects exist, port Ramen's iOS release workflow structure:
cert/profile/App Store Connect API key import from repo secrets → `xcodebuild archive` → export →
`xcrun altool`/`notarytool` upload — with **zero secrets or credentials committed**, only
references to GitHub Actions secret names the user will configure later.

## Android release path (documented, not built)

Standard Capacitor Android release: `./gradlew bundleRelease` against a release-signed keystore
(never committed — `.gitignore` already excludes `*.keystore`/`*.jks`), uploading the resulting
`.aab` to Google Play Console manually or via a future `fastlane`/Actions job mirroring the iOS
structure once one exists.
