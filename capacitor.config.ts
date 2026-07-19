import type { CapacitorConfig } from "@capacitor/cli";

/**
 * iOS shell for App Store / TestFlight.
 * Bundle ID must match App Store Connect: com.northeast.gemgeek
 *
 * TestFlight v1 loads the live Render site (API + SPA already work).
 * Later you can ship offline web assets from dist/ by removing `server.url`.
 *
 * Build flow:
 *   npx cap sync ios
 *   npx cap open ios   → Xcode → Signing → Archive → TestFlight
 */
const config: CapacitorConfig = {
  appId: "com.northeast.gemgeek",
  appName: "Gem Geek",
  webDir: "dist",
  server: {
    // Live production app — same as browser, wrapped as native shell
    url: "https://northeast-gem-geek.onrender.com",
    cleartext: false,
    androidScheme: "https",
  },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#0c0e12",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0c0e12",
    },
  },
};

export default config;
