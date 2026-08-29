# NETT_RULE_BOOK.md — deltas the canon docs don't carry
**This file deliberately does NOT restate the Design System, UX Architecture, or Motion Architecture — those are in project context and are the authority. Here lives only what they don't hold: locked data, asset-usage rules, the perimeter, versioning law, and the open register. If this file ever contradicts the docs or the code, they win and this file is corrected in the same release.**

## 1 · Canon pointers (one line each — read the real file)
Concept, colors & rationale, tokens, type/shape/space, do's & don'ts → `Nett_Design_System.html`. Ten principles, IA, navigation, change protocol, §5 spec contract → `Nett_UX_Architecture.html`. Three motion laws + the complete closed keyframe inventory → `Nett_Motion_Architecture.html`. Wordmark/mark/icon/splash geometry, tagline registers, misuse rules → `nett-logo-direction-C-waterline.html`.

## 2 · Logo asset usage (deltas from the logo files themselves)
- **Geometry (per the Direction-C guideline):** waterline at **62% cap-height** · refraction offset **3 units** · submerged slice in `--water` at ~42–55% opacity per surface spec · lettering above the line in **bone `#C9C3B2`** · **THE LINE itself is drawn in gold `#D9B96A`** in all identity assets.
- **Dry-mark fallback:** below **24px**, drop the refraction — flat bone mark + gold underline. Never render the submerged effect at tiny sizes.
- **State discipline:** the brand is always drawn *at* the line — it never drowns, never floats. Only the **user's marker** moves above/below. Marketing never shows a submerged wordmark as a mood; underwater is always a measured, recoverable state with a path up.
- **Animated assets (Lottie, 512×512, 60fps):** `nett-logo-mark.json` = the official mark animation (water rises, N settles half-submerged, line lands — 84 frames, plays once; use for app icon moments/splash). `nett-loader.json` = the official **N-loader** (water level rises and falls inside the N — 102-frame loop; use for long real waits). These are the only animated logo forms — never rebuild them in CSS.
- **Taglines:** primary *"Grow what you own. Clear what you owe."* (own-clause above register, owe-clause below). CTA-grade second line: *"Find your line."* — scan/begin contexts only, never a tagline replacement.

## 3 · Open register (current)
- **G8 — gold token (founder decision, OPEN):** CRM `--gold:#D9B96A` vs app `--gold→bone`. **New evidence from the logo assets:** identity files consistently draw *the line* in gold `#D9B96A` and *lettering/accent* in bone — suggesting the resolution "gold = the waterline element only; bone = the UI accent." Still the founder's call; until decided, new UI work uses **bone** for accents, and the waterline element keeps gold per the logo canon.
- PARTIAL confidence formula → Rule Book owner. · Arth chat glossary intent (app) → dev follow-up.

## 4 · Locked canon data (never substitute, both surfaces must agree)
Persona **Rahul Mehra**: score 61 Fair (avg 58, next 65) · card ₹52,600 @ 42% (leak ₹1,840/mo → clearing saves ₹22,080/yr) · home loan ₹48.2L @ 8.9%, EMI ₹43,500 · income ₹2.4L, surplus ₹47,000 · AUM ₹86.4L · Anita + Kiara (6) · BITS Pilani, IT @ TechCorp. CRM roster of 8 (Swapnil Wealth · Supriya Narkar Insurance · Rohan D. · Admin), sales ledgers tie to the rupee (₹38,400 / ₹41,200). Band hexes are identical across surfaces (`--pos/--watch/--attn/--crit` per the DS); `--amb #D9B96A` is amber-accent only, **never a state**. NO DATA never looks passing; ERROR never looks like NO DATA. OTP = 6 boxes, both surfaces.

## 5 · Regulatory perimeter (absolute)
Nett **diagnoses and distributes — never advises**. Allowed: observations, calculations, benchmark comparisons, risk quantification, education, disclosure, routing. Cost items cap at ATTENTION. Recommendations carry **Swapnil's** name; Arth supplies facts, fit and sequencing — the human sends and owns it. Suitability gates hold regardless of personalization: PMS ≥ ₹50L · AIF ≥ ₹1 Cr · waterfall (liquidity + protection before growth) · no offers on unverified data · breaches flag to Admin compliance. Consent is client-actioned only, on the client's device, channel + timestamp stored; Admin is read-only where acting would be impersonation.

## 6 · Versioning & audit law
Each surface bumps its full bundle together (design file · flow doc · release notes · diff file), version stamped **in the file** (`NETT_VER` / `CRM_VER` + login stamp). Patches are asserted, all-or-nothing. Audits run with full output, never cropped (a cropped tail once hid a dead check for five releases). Every new feature adds a permanent check; token/mark/keyframe guards are enforced by script, not memory. A red check blocks the ship; the diff is the authority on what changed.
