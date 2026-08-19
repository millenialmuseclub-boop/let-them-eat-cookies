import type { CapacitorConfig } from '@capacitor/cli'

// Mirrors Let Them Eat Ramen's capacitor.config.ts shape exactly (itself mirroring Cake's),
// same appId naming convention (com.letthemeat<app>.app), webDir 'dist' (same Vite output
// directory), no StatusBar/SplashScreen plugin config -- native defaults + CSS
// safe-area-inset handling cover it, same as both family apps. No CapacitorUpdater/OTA block,
// matching Ramen's decision to defer that until a real need exists.
const config: CapacitorConfig = {
  appId: 'com.letthemeatcookies.app',
  appName: 'Let Them Eat Cookies',
  webDir: 'dist',
}

export default config
