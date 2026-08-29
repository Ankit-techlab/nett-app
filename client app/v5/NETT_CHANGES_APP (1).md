# NETT_CHANGES_APP — v1.6 → v1.7
**File:** nett-app.html · **Date:** 30 Jul 2026 · 06:05 PM IST · 65 screens · `NETT_VER='1.7'`
**Trigger:** dev review of build (4) — all three reported bugs validated TRUE and fixed; one doc misattribution corrected.

## Change map
| ID | What | Where | Note |
|---|---|---|---|
| DEV-1/2 | `scr` array += `'gloss','pan'` — both screens now unmount on navigation | `var scr=[…]` | Root cause: `_go()` only hides sections listed in `scr`; my v1.4/v1.6 inserts added markup but never registered it. **Gloss was broken since v1.4.** |
| DEV-3 | Entry "I already have an account": `data-nav="bio"` → `data-nav="login"` (entry-scoped edit) | s-entry | Wiped device ⇒ nothing for Face ID to check ⇒ OTP first, then bioset re-arm. Login = **mobile + OTP only** (no PAN/DOB — now machine-checked). Case-0 (returning, biometrics present) unchanged: welcome-back → s-bio → Home, no OTP. |
| DEV-4 | Doc correction | this file | v1.6 doc said the retained slash-date was "in KYC" — it is in **s-insform (insurance form)**. Register: insform date field pending the same wheel-affordance treatment (founder GO). |

## Checker upgrades (permanent — born from these bugs)
- **Registry parity (bidirectional):** every `<section>` id must be in `scr`, every `scr` entry must have a section. This class of bug can never ship silently again.
- **Entry wiring:** "I already have an account" must target `login`, never `bio`.
- **Login purity:** s-login must contain no PAN/DOB fields.
Stack now 55 points across v1.4–v1.7 — ALL PASS.

## Honest note on my audit
The dev found what my checker structurally could not: I verified targets *exist*, never that they were *registered*; and the C1 check matched a code string, not the actual entry path. Both were my blind spots, both are now closed as permanent checks — the checker grew the way it always should: one scar, one guard.

---
## Appendix — full unified diff (v1.6 → v1.7)
```diff
--- base-app-v16.html	2026-08-03 07:20:22.293591708 +0000
+++ work-app.html	2026-08-03 07:20:22.366930013 +0000
@@ -283,7 +283,7 @@
     <div class="rw au" style="border:none;padding:5px 0;"><span class="mut" style="font-size:12.5px;">Read-only, regulated data rails</span><span class="sm">AA · MF Central · bureau</span></div>
     <div class="rw au" style="border:none;padding:5px 0;"><span class="mut" style="font-size:12.5px;">A dedicated wealth manager</span><span class="sm">human, on record</span></div>
     <div class="cta tap au" data-nav="scan" style="margin-top:22px;">Begin the scan</div>
-    <p class="ghost tap au" data-nav="bio">I already have an account</p>
+    <p class="ghost tap au" data-nav="login">I already have an account</p>
     <p class="sm dm au" style="text-align:center;margin-top:10px;">Support · support@nett.in · 1800 419 0000 · 9am–9pm IST</p>
     <p class="sm au" style="text-align:center;margin-top:6px;">The scan is complimentary. We earn distribution fees only when you invest — and we show you every fee, every time.</p>
   </div>
@@ -2161,8 +2161,8 @@
   if(t2!=='now'&&W3.cc)twn(function(p){W3.cc.scale.y=1.9*(1+ (t2==='goal'?1.1:0.4)*p);},800);
   if(t2!=='now')setTimeout(function(){toast(t2==='y1'?'One year, untouched: growth grows — and so does the crystal.':'Goal maturity, untouched: the crystal outgrows the towers. Act now.');},850);
 }
-var scr=['entry','scan','scanning','preparing','health','home','wealth','explore','fund','rm','reports','chat','world','folios','stocks','holding','pms','aif','bond','order','oconfirm','pg2','osuccess','equity','cash','liab','insur','insdet','insform','splash','intro','otp','bio','icat','nudges','listing','home0','health0','wealth0','cashflow','family','refer','lens','intl','consent','limited','mfonboard','login','bioset','kyc1','kyc2','kyc3','kyc4','kyc5','kyc6','kyc7','kyc8','kyc9','kyc10','book','privacy','terms','delete'];
-var NETT_VER='1.6';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
+var scr=['entry','scan','scanning','preparing','health','home','wealth','explore','fund','rm','reports','chat','world','folios','stocks','holding','pms','aif','bond','order','oconfirm','pg2','osuccess','equity','cash','liab','insur','insdet','insform','splash','intro','otp','bio','icat','nudges','listing','home0','health0','wealth0','cashflow','family','refer','lens','intl','consent','limited','mfonboard','login','bioset','kyc1','kyc2','kyc3','kyc4','kyc5','kyc6','kyc7','kyc8','kyc9','kyc10','book','privacy','terms','delete','gloss','pan'];
+var NETT_VER='1.7';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
 function _go(id){
   if(NODATA&&(id==='home'||id==='health'||id==='wealth'))id=id+'0';
   scr.forEach(function(k){var el=document.getElementById('s-'+k);if(el)el.classList.remove('on');});
```
