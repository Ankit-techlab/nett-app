# NETT_CHANGES_APP — v1.5 → v1.6
**File:** nett-app.html · **Date:** 30 Jul 2026 · 05:20 PM IST · 65 screens · `NETT_VER='1.6'`
**Companions:** Nett_App_Flow_Doc.xlsx · Nett_App_Release_Notes.html · appcheck.js (49 points, ALL PASS)
**Diffstat:** 7 hunks · 7 removed · 22 added

## The three canonical account journeys (this release's whole point)
| Case | Route | Status |
|---|---|---|
| **C1** Reinstall, AA on file | intro → I-have-an-account → mobile+OTP → Face ID → **Home** | Was correct; now machine-checked as a case |
| **C2** Account live, permissions pending | …OTP → Face ID → **Home (zero-state s-home0)** → "See my number" → **s-pan (PAN+DOB prefilled, provenance, clearable)** → AA consent → scan → wealth health | **REWIRED** (previously skipped Home, jumped to consent) |
| **C3** Registration | Scan now → **mobile+PAN+DOB (real inputs now)** → OTP → Face ID → AA consent → scan → report | Inputs fixed (were drawings), DOB slash-format retired |

## Change map
| ID | What changed | Where (anchor) | Build notes |
|---|---|---|---|
| C3 inputs | `#scmob` tel input · `#scpan` caps input (maxlength 10) · `#scdob` named-month wheel affordance + credit-side why-line | s-scan (slice-scoped — the same DOB string exists in KYC and was deliberately untouched) | Spec Rule 1: control from the value. DOB is a wheel picker on device — never free-text. |
| C2 screen | New `s-pan`: PAN+DOB **prefilled** (`#ppan` clearable via `#ppanx`, `#pdob` wheel affordance), provenance line, → consent | inserted before s-consent | Prefill rule: states its source, clears as easily as it accepts, never looks user-typed. |
| C2 routing | `lgnext`: `PENDPERM=!LOGINCONSENT; BIONEXT=LOGINCONSENT?'home':'home0'` · home0 CTA `#h0go` → `PENDPERM?'pan':'consent'` | login handler · s-home0 | Production: LOGINCONSENT/PENDPERM = server truth of consent-on-file. |
| Handlers | `#ppanx` clear · `#scdob/#pdob` picker-affordance toasts | engine | — |

## Process note (disclosed)
First patch attempt was blocked by the assertion layer (DOB anchor matched twice — scan + KYC); a meta-edit of the patch script then broke, so the patch was rewritten clean with slice-scoping. Zero dirty writes throughout — the all-or-nothing discipline held. Two stale checker expectations were updated to v1.6 truth.

---
## Appendix — full unified diff (v1.5 → v1.6)
```diff
--- base-app-v15.html	2026-08-01 10:01:20.690574037 +0000
+++ work-app.html	2026-08-01 10:03:29.474184436 +0000
@@ -293,9 +293,10 @@
 <section class="zs" id="s-scan">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Back</span>
   <h2 class="ser" style="margin-top:12px;">Three details.<br>Nothing else.</h2>
-  <div class="fld"><span>MOBILE</span>+91 98110 47320</div>
-  <div class="fld"><span>PAN</span>AXKPM4821Q</div>
-  <div class="fld"><span>DATE OF BIRTH</span>14 / 03 / 1988</div>
+  <div class="fld"><span>MOBILE</span><input id="scmob" type="tel" inputmode="tel" autocomplete="tel" value="+91 98110 47320" style="background:none;border:none;color:var(--tx);font:inherit;width:100%;outline:none;padding:0;"></div>
+  <div class="fld"><span>PAN</span><input id="scpan" type="text" autocapitalize="characters" maxlength="10" value="AXKPM4821Q" style="background:none;border:none;color:var(--tx);font:inherit;width:100%;outline:none;padding:0;letter-spacing:1px;"></div>
+  <div class="fld tap" id="scdob" style="cursor:pointer;"><span>DATE OF BIRTH</span><span style="display:flex;justify-content:space-between;align-items:center;">14 Mar 1988 <i class="ti ti-chevron-down" style="color:var(--dim);"></i></span></div>
+  <p class="sm dm" style="margin-top:8px;">PAN + date of birth unlock the credit side — your loans, cards and score come from the bureau match.</p>
   <div class="cd" style="margin-top:14px;">
     <p class="sm" style="line-height:1.6;">With your consent, we fetch — <b style="color:var(--tx);">read-only</b> — your bank balances and flows (Account Aggregator), mutual fund folios (MF Central), and loans &amp; score (credit bureau). Revocable anytime. Never sold, never shared.</p>
   </div>
@@ -1291,7 +1292,7 @@
     <p class="sm" style="color:var(--mut);">Net worth</p>
     <p class="big" style="margin-top:6px;color:var(--dim);">₹ —</p>
     <p class="sm" style="margin-top:8px;">Your number goes here. 60 seconds of <b style="color:var(--tx);">read-only</b> data and this becomes your live net worth — assets minus every loan.</p>
-    <div class="cta tap" data-nav="consent" style="margin-top:12px;">See my number</div>
+    <div class="cta tap" id="h0go" style="margin-top:12px;">See my number</div>
   </div>
   <div class="cd au" style="margin-top:12px;">
     <p class="lb" style="color:var(--gold);">Why share?</p>
@@ -1450,6 +1451,17 @@
 </div>
 </section>
 
+<!-- PAN MATCH (v1.6 · pending-permission path) -->
+<section class="zs" id="s-pan">
+  <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Back</span>
+  <h2 class="ser" style="margin-top:12px;">One match,<br>then your report.</h2>
+  <p class="sm" style="margin-top:8px;">Your account is live — the report just needs the bureau match. PAN + date of birth, nothing else.</p>
+  <div class="fld" style="margin-top:14px;"><span>PAN</span><span style="display:flex;justify-content:space-between;align-items:center;"><input id="ppan" type="text" autocapitalize="characters" maxlength="10" value="AXKPM4821Q" style="background:none;border:none;color:var(--tx);font:inherit;width:100%;outline:none;padding:0;letter-spacing:1px;"><i class="ti ti-x tap" id="ppanx" style="color:var(--dim);font-size:14px;"></i></span></div>
+  <div class="fld tap" id="pdob" style="cursor:pointer;"><span>DATE OF BIRTH</span><span style="display:flex;justify-content:space-between;align-items:center;">14 Mar 1988 <i class="ti ti-chevron-down" style="color:var(--dim);"></i></span></div>
+  <p class="sm dm" style="margin-top:8px;"><i class="ti ti-database" style="vertical-align:-2px;"></i> Prefilled from your account records — clear or edit anything; nothing is submitted until you continue.</p>
+  <div class="cta tap" data-nav="consent" style="margin-top:16px;">Continue to permissions</div>
+</section>
+
 <section class="zs" id="s-consent">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Back</span>
   <h2 class="ser" style="margin-top:12px;">Your data.<br>Your call.</h2>
@@ -2150,7 +2162,7 @@
   if(t2!=='now')setTimeout(function(){toast(t2==='y1'?'One year, untouched: growth grows — and so does the crystal.':'Goal maturity, untouched: the crystal outgrows the towers. Act now.');},850);
 }
 var scr=['entry','scan','scanning','preparing','health','home','wealth','explore','fund','rm','reports','chat','world','folios','stocks','holding','pms','aif','bond','order','oconfirm','pg2','osuccess','equity','cash','liab','insur','insdet','insform','splash','intro','otp','bio','icat','nudges','listing','home0','health0','wealth0','cashflow','family','refer','lens','intl','consent','limited','mfonboard','login','bioset','kyc1','kyc2','kyc3','kyc4','kyc5','kyc6','kyc7','kyc8','kyc9','kyc10','book','privacy','terms','delete'];
-var NETT_VER='1.5';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
+var NETT_VER='1.6';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
 function _go(id){
   if(NODATA&&(id==='home'||id==='health'||id==='wealth'))id=id+'0';
   scr.forEach(function(k){var el=document.getElementById('s-'+k);if(el)el.classList.remove('on');});
@@ -2690,7 +2702,7 @@
   if(t.id==='lgresend'){toast('Fresh code sent — the old one just died.');return;}
   if(t.id==='lgcall'){toast('Calling +91 98110 ···· 20 — the code is read out twice.');return;}
   if(t.id==='otpverify'){BIONEXT='consent';stack.push('otp');go('bioset');return;}
-  if(t.id==='lgnext'){BIONEXT=LOGINCONSENT?'home':'consent';stack=[];go('bioset');return;}
+  if(t.id==='lgnext'){PENDPERM=!LOGINCONSENT;BIONEXT=LOGINCONSENT?'home':'home0';stack=[];go('bioset');return;}
   if(t.id==='lgwa'){toast('Same 6-digit code sent on WhatsApp ✓ — check the green app.');return;}
   if(t.id==='bsyes'){toast('Face ID enabled ✓ — next open is instant.');stack=[];go(BIONEXT);return;}
   if(t.id==='bsskip'){stack=[];go(BIONEXT);toast('No problem — OTP login stays on. Enable Face ID anytime in Data & privacy.');return;}
@@ -2909,7 +2921,7 @@
     if(F[q])F[q]();
   }catch(e){}
 })();
-var STATE='normal',TSEEN=0,BIONEXT='home',LOGINCONSENT=true,EXITASKED=0,SRCOFF={};
+var STATE='normal',TSEEN=0,BIONEXT='home',LOGINCONSENT=true,PENDPERM=false,EXITASKED=0,SRCOFF={};
 function go(id){_go(id);if(id==='health'&&!TSEEN){TSEEN=1;setTimeout(function(){tourShow(0);},750);}}
 var SRCMETA={mf:['MF Central','your 14 folios and their returns'],eq:['DEMAT','your stocks and concentration read'],bureau:['Credit bureau','your loans, card and score'],aa:['Bank flows (AA)','your cashflow, leaks and surplus']};
 function applySources(){
@@ -2957,6 +2969,9 @@
   if(t.closest&&t.closest('#werr')&&t.id!=='werrretry'){document.getElementById('errdlg').classList.add('on');return;}
   if(t.id==='edretry'){document.getElementById('errdlg').classList.remove('on');var r=document.getElementById('werrretry');if(r)r.click();return;}
   if(t.id==='edclose'){document.getElementById('errdlg').classList.remove('on');return;}
+  if(t.id==='h0go'){stack.push('home0');go(PENDPERM?'pan':'consent');return;}
+  if(t.id==='ppanx'){var pi=document.getElementById('ppan');if(pi){pi.value='';pi.focus();toast('Cleared — enter the PAN to match.');}return;}
+  if(t.id==='scdob'||t.id==='pdob'){toast('Wheel picker on device — day · month · year, named month. Never a free-text date.');return;}
   if(t.id==='xstay'){document.getElementById('exitint').classList.remove('on');toast('Right call — ₹4.1L stays on your side of the line.');return;}
   if(t.id==='xleave'){document.getElementById('exitint').classList.remove('on');go(stack.pop()||'home');toast('Saved as a draft — it’s one tap from Home when you’re ready.');return;}
   if(t.id==='atourgo'){go('health');setTimeout(function(){tourShow(0);},450);return;}
```
