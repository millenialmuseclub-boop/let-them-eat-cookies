import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jordypop.letthemeatcookies',
  appName: 'Let Them Eat Cookies',
  webDir: 'dist',
  plugins: {
    extConfig: {},
    CapacitorUpdater: {
      // Zero-server OTA (see OTA_UPDATES.md): app-side TS in src/lib/otaUpdater.ts
      // owns the update decision by polling a static manifest.json on R2, so
      // autoUpdate must stay off — the plugin never talks to a Capgo backend.
      autoUpdate: false,
      // Public half of the key pair generated via `npx @capgo/cli key create`.
      // Safe to embed — it only lets the plugin verify/decrypt bundles signed
      // with the matching private key, which lives only in the CAPGO_PRIVATE_KEY
      // GitHub secret. Rotating this requires a new store build (see OTA_UPDATES.md).
      publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAq1CB9IAErLBoi7V0Llh+axW3RG0cBQ/nseDe4rOQbmkbF2LsMZzz\n4Yj++fH1LhHVHrQnT/2uR2RA2jW2tgaCJJxR5tIMSZ1r6tChkKWEoDpeaXiE7q30\nzA50DZB9FTCgcplHOBDqQxnypArfAX60fXIiqQeqpY+dduxgVPCB1TkGFQr8OEoA\nwPqRhw0gUi48IzbiYYc3lGd7CJ4mUPyoMTJA8eGtBxtawC3PAq+NScXc2ZTnysBj\n3S0Fyc1GmHGiTuHjZ5nKCGQXMOJdsGW9mz6uaZHfQuPmxG2nAnlEgVOXFT0G1HFW\nXVuNAwd+B9TVEtKwJKs4mOFhUUH6IzThawIDAQAB\n-----END RSA PUBLIC KEY-----\n',
      // A monotonically-increasing build timestamp (git commit time, seconds since
      // epoch), set by each native build workflow before `npx cap sync`. Lets
      // src/lib/otaUpdater.ts tell whether an OTA manifest is actually NEWER than
      // what's natively baked in, instead of just "different".
      version: process.env.APP_BUILD_VERSION,
    }
  }
};

export default config;
