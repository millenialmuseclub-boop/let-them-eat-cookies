# Next Release Checklist

Status as of this writing: v1.0 (build 1) is submitted and in Apple review. **Do not touch that
submission.** This doc is what to run once it clears (approved, or rejected and needing a fix) —
everything below is already prepped so the only remaining work is running two workflows and a few
minutes in App Store Connect.

## What's already done, ready to ship

- Build number bumped to **2** in `ios/App/App.xcodeproj/project.pbxproj` and
  `android/app/build.gradle` (marketing version stays `1.0`, matching Cake's convention of
  incrementing only the build number across releases under the same version).
- Zero-server OTA infrastructure (`OTA_UPDATES.md`) — this release is what actually activates it;
  no build has shipped with the plugin until this one.
- The family-wide visual refinement pass: photo-led Main hero, distinct flagship photography per
  Collection, Cookie 101 masthead, Dough/Chocolate Lab headers, lighter Workshop/Crumb rail
  (see git log for full detail).
- All required GitHub secrets/variables already set (Cloudflare, Capgo, App Store Connect, iOS
  distribution cert/profile).

## Steps, in order

1. **Confirm the current v1.0 (build 1) review outcome** in App Store Connect.
   - If **rejected**: read the rejection reason first. If it requires a code change beyond what's
     already on `main`, make that fix before proceeding — don't ship build 2 blind to a known
     rejection reason.
   - If **approved**: proceed directly.

2. **Run the iOS release workflow**: GitHub → Actions → "Build, Sign, and Upload iOS Release
   Build" → Run workflow. This runs entirely on GitHub's macOS runner — no local Mac needed. It
   builds, signs, archives, and uploads directly to App Store Connect / TestFlight.
   ```bash
   gh workflow run "Build, Sign, and Upload iOS Release Build"
   ```

3. **Wait for the build to finish processing** in App Store Connect (Activity tab) — typically
   10–30 minutes after upload before it's selectable as "Ready to Submit."

4. **Attach build 2 to the app version** in App Store Connect, paste the release notes below into
   "What's New in This Version," and submit for review.

5. **Android (Noodles only — this workflow exists; Cookies/Ramen don't have Android release
   automation yet, see Gaps below)**:
   ```bash
   gh workflow run "Build Signed Android Release Bundle"
   ```
   Download the signed `.aab` artifact from the completed run and upload it manually to Play
   Console — there's no automated Play Store publish step, unlike the iOS App Store Connect upload.

6. **Once build 2 is approved and live**, confirm OTA is actually reachable: the `production`
   manifest is already published (verified live during this pass), so any device running build 2
   should silently pick it up on its next launch. No further action needed unless you want to spot
   check via device logs.

## Draft release notes ("What's New in This Version")

> A visual refresh across the app — new photography throughout Collections, Cookie 101, and the
> Workshop, plus small polish fixes. Under the hood, we've also laid the groundwork for faster
> future updates.

Feel free to shorten or restyle this — it's a starting draft, not final copy.

## Known gaps (not addressed in this pass)

- **No Android release automation for Cookies or Ramen** — no keystore secrets exist yet
  (`ANDROID_KEYSTORE_BASE64` etc. are absent from both repos' GitHub secrets), and no
  `android-release.yml` workflow exists for either. Noodles has both. If Android matters for
  Cookies/Ramen, that's a separate setup pass (generate + securely store a release keystore, add
  the workflow, wire secrets) — happy to do it, just say so.
- Actual "Submit for Review" in App Store Connect is still a manual click — Apple's submission
  flow (export compliance question, etc.) isn't automated here.
