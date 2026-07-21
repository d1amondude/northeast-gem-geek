# Gem Geek — App Store slices (do one box at a time)

## BREAK checkpoint — 2026-07-20 (Ship Dashboard updated)

### Done this session / already finished
- [x] Apple Developer account + app **Gem Geek** (`com.northeast.gemgeek`)
- [x] IAP: monthly $7.99 / annual $49.99 · group **Gem Geek Pro**
- [x] TestFlight build works
- [x] App icon in Xcode build (store icon rides with IPA)
- [x] Catalog image audit (80 fixes incl. Padparadscha) → Render live
- [x] Screenshots **iPhone 6.5"** (1242×2688 JPEG no-alpha) in Connect
- [x] Privacy Policy URL in Connect
- [x] Support URL: `https://northeast-gem-geek.onrender.com/support.html`
- [x] Marketing URL OK: `https://northeastgem.com` (optional)
- [x] Age rating **4+** (new App Controls / Capabilities questionnaire)
- [x] App Privacy nutrition labels **published**

### Resume here (next session)
**Slice D** → listing copy on **iOS 1.0 Prepare for Submission**  
Then E build · F subscriptions · G review notes · H submit  

Ship Dashboard: `Desktop/Ship_Dashboard` → project **Gem Geek** notes + tasks.

---

## Slice A — Legal URLs — DONE
- [x] Privacy URL  
- [x] Support URL  
- [x] Marketing (northeastgem.com) optional  

---

## Slice B — Category & age — MOSTLY DONE
- [x] Age rating **4+**  
- [ ] Category Education (confirm if not set)  

---

## Slice C — Privacy nutrition labels — DONE
- [x] Data types answered  
- [x] Published  

---

## Slice D — Version listing text (10 min) — **YOU ARE HERE**
**Where:** iOS version **1.0** → description fields

### Subtitle (≤30 characters)
```
Pocket gem lab for trade
```

### Promotional text (optional, ≤170 — editable anytime)
```
Catalog, rare* stones, Photo ID on free trial. Pro unlocks Lab ID, Verify, and Consult.
```

### Description (paste)
```
Gem Geek is Northeast Gemological’s pocket gem lab — educational screening for jewelers, buyers, and collectors.

WHAT YOU GET
• Stone catalog with lab-style cards (RI, SG, hardness, look-alikes)
• Rare* collector stones flagged
• Specimen reference photos
• Photo ID assist on free trial (weekly AI quota)
• Calipers / measurement helpers
• Pro: Lab ID, Verify, and Consult tools

FREE
• Browse the full educational catalog
• Photo ID on free trial with weekly AI limit

GEM GEEK PRO
• Monthly or annual subscription via Apple
• Unlocks advanced Lab ID, Verify, and Consult
• Higher AI capacity for Pro tools

IMPORTANT
Gem Geek is an educational field aid — not a lab certificate, GIA report, or guarantee of authenticity. Always confirm high-value stones with a qualified laboratory when it matters.

Built for the trade. Learn faster. Screen smarter.
```

### Keywords (≤100 characters, commas, no spaces after commas if tight)
```
gem,jewelry,sapphire,ruby,diamond,appraisal,gemology,jeweler,opal,spinel
```

### What's New (1.0)
```
First release — catalog, Photo ID trial, and Gem Geek Pro subscriptions.
```

- [ ] Subtitle  
- [ ] Description  
- [ ] Keywords  
- [ ] What’s New  
- [ ] **Save**  

---

## Slice E — Build for this version (5 min)
**Where:** version 1.0 → **Build**

1. Click **+** / Select a build  
2. Pick the TestFlight build that has the **icon** and works  
3. Answer encryption if asked: **HTTPS only** → standard compliance (no extra export docs)  
4. **Save**

- [ ] Build attached  

---

## Slice F — Subscriptions ready (10 min)
**Where:** Monetization → Subscriptions → **Gem Geek Pro**

For **each** product (monthly + annual):
- Localization English display name + description filled  
- Review screenshot if Apple asks (paywall shot is fine)  
- Status: ready to submit **with** the app (don’t submit alone unless required)

Display name ideas:
- Monthly: `Gem Geek Pro Monthly`  
- Annual: `Gem Geek Pro Annual`  

- [ ] Monthly localization  
- [ ] Annual localization  
- [ ] Paid Apps Agreement **Active** (Business → Agreements)  

---

## Slice G — App Review contact (5 min)
**Where:** version 1.0 → App Review Information

- First/last name, phone, email (yours)  
- **Notes** (paste):

```
Gem Geek is an educational gemology reference app. Photo ID uses AI for screening notes only — not a lab certificate.

Subscriptions: Gem Geek Pro monthly and annual unlock Lab ID, Verify, and Consult. Free tier includes catalog + Photo ID trial.

Demo: open app → Home catalog → Photo tab. No special login required for free features. If ALLOW_DEV_BILLING is off, use Sandbox Apple ID for IAP testing.

Support: https://northeast-gem-geek.onrender.com/support.html
Privacy: https://northeast-gem-geek.onrender.com/privacy.html
```

- [ ] Contact filled  
- [ ] Notes pasted  
- [ ] **Save**  

---

## Slice H — Final check then Submit (only when all green)
**Do not rush this slice.**

Checklist:
- [ ] Screenshots 6.5" showing  
- [ ] Icon on build  
- [ ] Privacy URL live  
- [ ] Description / keywords saved  
- [ ] Build selected  
- [ ] Age rating done  
- [ ] App Privacy labels done  
- [ ] Subscriptions localized + agreement Active  
- [ ] Review contact filled  

Then: **Add for Review** → submit app **and** subscriptions together if prompted.

---

## Later (not blocking 1.0 if review can use current billing path)
- [ ] Real StoreKit / remove `ALLOW_DEV_BILLING` for production  
- [ ] Sign in with Apple (if you add non-Apple account login)

---

## One-line rule
**One slice per sitting.** Stop after Save. Come back for the next letter.
