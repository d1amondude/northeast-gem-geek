# Your next steps (after Connect)

## You already finished
- [x] Apple Developer account
- [x] App **Gem Geek** in App Store Connect
- [x] Subscriptions:
  - com.northeast.gemgeek.pro.monthly ($7.99)
  - com.northeast.gemgeek.pro.annual ($49.99)
- [x] Group **Gem Geek Pro**

## Paste these URLs into Connect (App Information)
After Render redeploys this push:

- Privacy: https://northeast-gem-geek.onrender.com/privacy.html
- Terms: https://northeast-gem-geek.onrender.com/terms.html  
- Support: https://northeast-gem-geek.onrender.com/support.html

Path: Gem Geek → App Information → Privacy Policy URL (+ Support URL if shown)

## On your Mac — open Xcode (when ready for TestFlight)

```bash
cd ~/Desktop/gemological-assistant
npx cap open ios
```

In Xcode:
1. Select target **App**
2. **Signing & Capabilities** → Team = **David Lash**
3. Bundle ID = `com.northeast.gemgeek`
4. Run on your iPhone (cable) or Simulator
5. Later: **Product → Archive** → Distribute → TestFlight

## Still “my turn” later
- Real Apple IAP (StoreKit / RevenueCat) instead of dev billing
- Sign in with Apple
- App screenshots for submission

## Do NOT click yet
- Add for Review on subscriptions or app version
