# Gem Geek — Apple Store config (locked)

## App Store Connect
- **App name:** Gem Geek
- **Bundle ID:** `com.northeast.gemgeek` *(confirm if you used a different ID)*
- **SKU:** gemgeek001 (or as you set)

## Subscription group
- **Group:** Gem Geek Pro
- **Group localization:** English (U.S.) — display “Gem Geek Pro” / app “Gem Geek”

## Products (Prepare for Submission — submit with first app version)
| Plan | Product ID | Price | Duration |
|------|------------|-------|----------|
| Pro Monthly | `com.northeast.gemgeek.pro.monthly` | $7.99 | 1 month |
| Pro Annual | `com.northeast.gemgeek.pro.annual` | $49.99 | 1 year |

## Legal URLs (paste into App Store Connect → App Information)
After Render deploy:
- **Privacy:** https://northeast-gem-geek.onrender.com/privacy.html
- **Terms:** https://northeast-gem-geek.onrender.com/terms.html
- **Support:** https://northeast-gem-geek.onrender.com/support.html

## Status
- [x] App record created
- [x] Subscription products created
- [ ] Paid Apps Agreement → Active (may still be Processing)
- [ ] Capacitor iOS shell + TestFlight build
- [ ] Real StoreKit / RevenueCat (replace ALLOW_DEV_BILLING)
