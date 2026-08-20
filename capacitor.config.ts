import type { CapacitorConfig } from '@capacitor/cli'

// webDir 'dist' (same Vite output directory), no StatusBar/SplashScreen plugin config -- native
// defaults + CSS safe-area-inset handling cover it, same as both family apps. No
// CapacitorUpdater/OTA block, matching Ramen's decision to defer that until a real need exists.
//
// appId is 'com.jordypop.letthemeatcookies', NOT the 'com.letthemeat<app>.app' pattern Cake and
// Ramen use -- this is a genuine, disclosed deviation from the family convention, not a mistake.
// The App Store Connect record for this app (Apple ID 6803303494) was already created under
// com.jordypop.letthemeatcookies before this was reconciled; a bundle ID cannot be changed after
// an App Store Connect record exists, so the code was corrected to match the live registration
// rather than the other way around.
const config: CapacitorConfig = {
  appId: 'com.jordypop.letthemeatcookies',
  appName: 'Let Them Eat Cookies',
  webDir: 'dist',
}

export default config
