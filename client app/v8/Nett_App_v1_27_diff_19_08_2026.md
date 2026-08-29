# diff.md — Nett app v1.26 → v1.27 (Explore feedback 1–7)

**Base:** `nett-app_v1_26_19_08_2026.html` · **Head:** `nett-app_v1_27_19_08_2026.html` · md5 `f368fa24…` · 19 Aug 2026

```
22 hunks · +59 / −35 · population gate PASS (70 screens; s-fund and s-explore shrink = the two ordered removals)
```

## Item-by-item

| # | Feedback | What shipped |
|---|---|---|
| 1 | No global search | Explore's search bar **removed** (markup + handler). Search lives on the shelf only, ANDed with the active category chips; count line names the scoped result. |
| 2 | MF categories | `mcat` on every fund + a chip row (All · Large cap · Small cap · Flexi cap · Index · ELSS · Liquid) that renders **only inside MF**; resets on every entry, Clear-all, and category switch. A Small-cap fund added so the category is real (demo data, G-07 register). |
| 3 | Yield sort is for bonds | Yield chip renders **only in Bonds & deposits**; entering any other category resets a stale yield sort to Name. "CAGR" chip relabelled **"Returns"** (jargon law — CAGR is not on the permitted list). Sort key unchanged. |
| 4 | Scheme names, not category-look titles | All six funds renamed to scheme-shaped names (`Meridian Flexi Cap · Direct Growth`, `Crestline Bluechip · Direct Growth`, …; fictional AMCs, G-07). Type label now reads `MUTUAL FUND · LARGE CAP`. Fund detail title + both order-flow name fallbacks re-tied to the new name — three consumers traced before renaming. |
| 5 | Insurance: no buying — RM | Detail CTA `Purchase — 4 details, then payment` → **`Bring Swapnil in — he answers on record`**, routing to the RM thread. The purchase form flow is no longer reachable from insurance (section retained in markup; entry removed). |
| 6 | Remove the last calculation card on MF detail | The "What this costs · what we earn" card (fee %, trail %, the ₹43,000 five-year computation) **removed** from `s-fund`. **RB 1.9 still holds:** the trail remains disclosed on the listing line ("trail 0.75% a year") before any act. |
| 7 | Liability interest rate editable | `Interest rate` is a prefilled editable field on all three liabilities (home 8.9 · car 9.5 · card 42, `% a year` suffix, decimal keyboard, typo-guard 60%). A correction shows provenance: *"You corrected this — the statement shows 8.9%. Swapnil sees both."* — hidden again if restored. |

## Held deliberately — not silent, cited

- **Item 7 recompute:** editing the rate does **not** recompute "Interest remaining" — that figure is canon-static and already contested under **L-1** (52 × ₹23,800 ≠ ₹2,40,000). Recomputing one side would create cross-surface divergence (Rule Book 1.6). Rate edits store + display + carry provenance; the arithmetic waits for the L-1 ruling. The card's revolving cost likewise stays at canon ₹3,02,000 ("at 42%" appended so the basis is explicit).
- **Item 6 canon interaction:** fee-before-you-act (RB 1.9) is satisfied at the listing line; if Yogesh's fee-wording round wants the detail-page disclosure back, it is one revert away.

## Defect caught during build — my own v1.21 lesson, repeated by me

The new `data-mfc` chips and `data-lrate` inputs were **dead on first build**: `actionable()` only accepts registered data-attributes, and I hadn't registered mine — the exact bug class that killed the report cards for nine versions. Caught by the fb5 suite (2 failures), fixed by registering both in `KD`. The lesson is now mechanical: **any new `data-*` action attribute ships with its KD registration in the same edit.**

## Test-suite changes
New `flow-fb5.js` — 36 assertions across all seven items + internal-talk checks. Updated for the 25-product shelf and the removed global search: fb3 (2), fb4 (1), filterdrawer (2). Advisory sweep: the one delta is the Yield chip clicked while hidden outside fixed income — by design, not a defect; R-2's nine remain unchanged.

## Verification
Fourteen suites — **394 assertions, all green** · audit 17/17 · population gate PASS · voice gates clean (no lakh/slash/T+N/internal talk in any new string).
**Needs a handset:** MF chip row wraps on 390px · rate fields above the soft keyboard · decimal keyboard on `data-lrate`.

---
```diff
--- nett-app_v1_26_19_08_2026.html	2026-08-19 11:52:36.173559076 +0000
+++ nett-app_v1_27_19_08_2026.html	2026-08-20 13:24:54.449115867 +0000
@@ -301,7 +301,7 @@
     <p class="sm au" style="text-align:center;margin-top:6px;">The scan is complimentary. We earn distribution fees only when you invest — and we show you every fee, every time.</p>
   </div>
 
-  <p class="sm dm" id="buildstamp" style="margin-top:14px;text-align:center;opacity:.55;">prototype build v1.26 · 07 Aug 2026</p>
+  <p class="sm dm" id="buildstamp" style="margin-top:14px;text-align:center;opacity:.55;">prototype build v1.27 · 07 Aug 2026</p>
 </section>
 
 <!-- SCAN FORM -->
@@ -892,7 +892,7 @@
   <div class="cd" style="margin-top:14px;" id="irows"></div>
   <div class="cd" style="margin-top:10px;border-color:rgba(201,195,178,.35);"><p class="lb" style="color:var(--bone);">What we earn</p><p class="sm" style="margin-top:6px;" id="ifee2">—</p></div>
   <p class="sm" style="margin-top:12px;" id="iverd2">—</p>
-  <div class="cta tap" id="insbuy" style="margin-top:14px;">Purchase — 4 details, then payment</div>
+  <div class="cta tap" id="insrm" style="margin-top:14px;">Bring Swapnil in — he answers on record</div>
 </section>
 
 <!-- INSURANCE FORM -->
@@ -1018,7 +1018,6 @@
 <section class="zs" id="s-explore">
   <h2 class="ser">Explore</h2>
   <p class="sm" style="margin-top:6px;">Every product shows what we earn. Always.</p>
-  <div class="fld tap" id="xsearch" style="margin-top:12px;display:flex;align-items:center;gap:9px;color:var(--dim);"><i class="ti ti-search"></i>Search funds, bonds, deposits, trusts…</div>
 
   <p class="lb au" style="margin-top:16px;">Trending now</p>
   <div class="sc au" style="margin-top:9px;">
@@ -1234,7 +1233,7 @@
 <!-- FUND DETAIL -->
 <section class="zs" id="s-fund">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Back</span>
-  <h2 class="ser" style="margin-top:10px;">Flexi Cap Fund</h2>
+  <h2 class="ser" style="margin-top:10px;">Meridian Flexi Cap</h2>
   <p class="sm dm" style="margin-top:3px;">Regular · Growth · ABC AMC · NAV ₹87.15</p>
   <div style="display:flex;gap:12px;align-items:center;margin-top:14px;" class="cd">
     <svg viewBox="0 0 100 58" style="width:92px;flex-shrink:0;"><path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#2A2B33" stroke-width="9" stroke-linecap="round"/><path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="url(#rg)" stroke-width="9" stroke-linecap="round" stroke-dasharray="126 200"/><defs><linearGradient id="rg"><stop offset="0" stop-color="#3ED598"/><stop offset=".6" stop-color="#D9B96A"/><stop offset="1" stop-color="#E08A8A"/></defs><line x1="50" y1="50" x2="82" y2="22" stroke="#ECECF1" stroke-width="2.4" stroke-linecap="round"/><circle cx="50" cy="50" r="3.4" fill="#ECECF1"/></svg>
@@ -1257,14 +1256,7 @@
     <div class="rw"><span class="sm">2020–now · this fund</span><span>+15.1% a year (index +12.8%)</span></div>
     <div class="rw"><span class="sm">Pattern</span><span style="color:var(--amb);">Beats index — falls harder too</span></div>
   </div>
-  <div class="cd" style="margin-top:10px;border-color:rgba(201,195,178,.35);">
-    <p class="lb" style="color:var(--bone);">What this costs · what we earn</p>
-    <div class="rw" style="margin-top:5px;"><span class="sm">Yearly fee on this fund</span><span>1.86% a year</span></div>
-    <div class="rw"><span class="sm">Of which, our trail</span><span style="color:var(--bone);">0.75% a year</span></div>
-    <div class="rw"><span class="sm">On ₹10,00,000 over 5y, we earn</span><span style="color:var(--bone);">≈ ₹43,000</span></div>
-    <p class="sm" style="margin-top:7px;">Included in NAV — never billed separately. If a cheaper share class serves you better, Swapnil is required to say so.</p>
-  </div>
-  <p class="sm" style="margin-top:12px;">Verdict: the manager has earned his fee twice over — in funds that also fall harder than the index. Seven-year money only. The decision stays yours.</p>
+    <p class="sm" style="margin-top:12px;">Verdict: the manager has earned his fee twice over — in funds that also fall harder than the index. Seven-year money only. The decision stays yours.</p>
   <div class="cta tap" data-ord="mf" style="margin-top:14px;">Invest — SIP or one-time</div>
 </section>
 
@@ -1450,6 +1442,9 @@
 <section class="zs" id="s-listing">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Back</span>
   <div class="fld" style="margin-top:10px;display:flex;align-items:center;gap:9px;"><span style="flex-shrink:0;">SEARCH</span><input id="lsearch" placeholder="Fund, bond, or company name" style="background:none;border:none;color:var(--tx);font:inherit;font-size:16px;flex:1;padding:0;"><span class="lnk tap" id="lsclear" style="display:none;flex-shrink:0;font-size:12px;">Clear</span></div>
+  <div class="sc" id="mfcrow" style="margin-top:8px;display:none;">
+    <span class="tag tap on" data-mfc="all" style="border-color:rgba(236,236,241,.4);">All</span><span class="tag tap" data-mfc="Large cap">Large cap</span><span class="tag tap" data-mfc="Small cap">Small cap</span><span class="tag tap" data-mfc="Flexi cap">Flexi cap</span><span class="tag tap" data-mfc="Index">Index</span><span class="tag tap" data-mfc="ELSS">ELSS</span><span class="tag tap" data-mfc="Liquid">Liquid</span>
+  </div>
   <div class="rw tap" id="fltoggle" style="margin-top:12px;padding:11px 13px;border:1px solid var(--ln);border-radius:12px;">
     <span style="font-size:13.5px;"><i class="ti ti-adjustments-horizontal" style="vertical-align:-2px;color:var(--gold);"></i> Filter &amp; sort <span class="sm dm" id="flcount"></span></span>
     <i class="ti ti-chevron-down" id="flchev" style="flex-shrink:0;color:var(--dim);"></i>
@@ -1485,7 +1480,7 @@
   <p class="lb" style="margin-top:12px;">Sort by</p>
   <div class="sc" style="margin-top:7px;" id="fs">
     <span class="tag tap on" data-fs="name" style="border-color:rgba(236,236,241,.4);">Name</span>
-    <span class="tag tap" data-fs="ytm">Yield</span><span class="tag tap" data-fs="cagr">CAGR</span>
+    <span class="tag tap" data-fs="ytm" id="fsytm">Yield</span><span class="tag tap" data-fs="cagr">Returns</span>
   </div>
   <span class="lnk tap" id="flclear" style="display:inline-block;margin-top:12px;font-size:12.5px;">Clear all</span>
   </div>
@@ -2433,7 +2428,7 @@
  document.getElementById('fdrows').innerHTML=h;document.getElementById('fdnet').textContent=net;
  document.getElementById('famdetsheet').classList.add('on');}
 function showErr(t,b,ref){document.getElementById('errtitle').textContent=t;document.getElementById('errbody').innerHTML=b;document.getElementById('errref').textContent='ref '+ref;document.getElementById('errsheet').classList.add('on');}
-var NETT_VER='1.26';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
+var NETT_VER='1.27';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
 function _go(id){
   if(NODATA&&(id==='home'||id==='health'||id==='wealth'))id=id+'0';
   scr.forEach(function(k){var el=document.getElementById('s-'+k);if(el)el.classList.remove('on');});
@@ -2516,7 +2511,7 @@
  elss:{do:'No action until Feb — lock-in holds. Then review with fresh eyes.',doc:'pos',n:'ELSS Tax Saver',fo:'Folio 6620031/55 · Regular · Growth',inv:'₹4,80,000',cur:'₹6,40,000',del:'+₹1,60,000 · +33%',gp:75,xirr:'13.0%',xc:'#3ED598',cat:'in line with category',since:'Feb 2023',sip:'₹12,500 monthly · next 5 Aug',lag:'Lock-in: units free progressively — earliest tranche unlocks next Feb.',
    tx:[['SIP ₹12,500','5 Jul 2026'],['SIP ₹12,500','5 Jun 2026'],['SIP ₹12,500','5 May 2026'],['SIP ₹12,500','5 Apr 2026']]}
 };
-var curH='flexi',ORD={type:'mf',mode:'sip',amt:'₹25,000',name:'Flexi Cap Fund'};
+var curH='flexi',ORD={type:'mf',mode:'sip',amt:'₹25,000',name:'Meridian Flexi Cap'};
 function openHold(id){
   curH=id;var D=HOLD[id];
   document.getElementById('hname').innerHTML=D.n;
@@ -2542,7 +2537,7 @@
 function openOrder(type){
   ORD.type=type;
   ORD.mode=(type==='bond'||type==='cash')?'once':'sip';
-  ORD.name=(type==='bond')?'AAA PSU Bond 2029':(type==='cash')?'Liquid Fund — sweep':(type==='add'?HOLD[curH].n.replace('&amp;','&'):'Flexi Cap Fund');
+  ORD.name=(type==='bond')?'AAA PSU Bond 2029':(type==='cash')?'Liquid Fund — sweep':(type==='add'?HOLD[curH].n.replace('&amp;','&'):'Meridian Flexi Cap');
   document.getElementById('otitle').textContent=(type==='add')?'Add more':(type==='bond'?'Buy bonds':(type==='cash'?'Sweep to liquid':'Invest'));
   document.getElementById('osub').textContent=(type==='cash')?'From your savings via UPI · earns ~6.8% · withdraw any day':ORD.name+(type==='bond'?' · settles to your demat next day':' · Regular · Growth');
   document.getElementById('omode').style.display=(type==='bond'||type==='cash')?'none':'flex';
@@ -2610,13 +2605,13 @@
   act:'Price alert at −10%',r:'toast:Alert set — you buy weakness, not headlines.'}
 };
 var LB={
- cc:{do:'Action today: pay in full from idle — ₹3,02,000 a year stops burning, score heads to 770.',n:'Credit card revolving',sub:'AnyBank Platinum · statement 28 Jun',rows:[['Outstanding','₹7,20,000'],['Rate','42% a year — ₹3,02,000 a year burning'],['Minimum due (the trap)','₹36,000 — paying only this costs ₹15,900 a month in interest'],['Due date','18 Jul — 6 days away'],['Score impact','utilisation 68% — the single drag on your 748']],
+ cc:{do:'Action today: pay in full from idle — ₹3,02,000 a year stops burning, score heads to 770.',n:'Credit card revolving',sub:'AnyBank Platinum · statement 28 Jun',rows:[['Outstanding','₹7,20,000'],['Interest rate','EDITR:cc:42'],['Cost of revolving','₹3,02,000 a year burning at 42%'],['Minimum due (the trap)','₹36,000 — paying only this costs ₹15,900 a month in interest'],['Due date','18 Jul — 6 days away'],['Score impact','utilisation 68% — the single drag on your 748']],
   why:'Your idle cash clears this today and still leaves ₹21,00,000. No investment on this platform outruns 42%.',
   act:'Pay in full from idle — draft ready',r:'toast:Payoff draft ready — ₹7,20,000, one fingerprint. Score heads to 770.'},
- car:{do:'Action this month: prepay from idle — ₹1,34,000 saved, ₹23,800 a month released, zero penalty.',n:'Car loan',sub:'HDFC · floating 9.5%',rows:[['Outstanding','₹11,00,000'],['EMI','₹23,800 · next 10 Aug'],['Tenor left','52 months'],['EMIs pending','EDIT:car:52'],['Interest remaining','₹2,40,000 on current path'],['Prepay penalty','Zero — floating rate, RBI rule']],
+ car:{do:'Action this month: prepay from idle — ₹1,34,000 saved, ₹23,800 a month released, zero penalty.',n:'Car loan',sub:'HDFC · floating 9.5%',rows:[['Outstanding','₹11,00,000'],['EMI','₹23,800 · next 10 Aug'],['Interest rate','EDITR:car:9.5'],['Tenor left','52 months'],['EMIs pending','EDIT:car:52'],['Interest remaining','₹2,40,000 on current path'],['Prepay penalty','Zero — floating rate, RBI rule']],
   why:'Prepaying from idle saves ₹1,34,000 and closes it 22 months early — releasing ₹23,800 a month that can feed the reserve instead.',
   act:'Prepay from idle — see the math',r:'toast:Prepay draft: ₹11,00,000 clears it · ₹1,34,000 saved · ₹23,800 a month released.'},
- home:{do:'Action this quarter: switch to 8.4% — ₹6,20,000 saved over tenor, same house, same EMI date.',n:'Home loan',sub:'LIC HF · floating 8.9%',rows:[['Outstanding','₹78,00,000'],['EMI','₹68,400 · next 7 Aug'],['Tenor left','16.4 years'],['EMIs pending','EDIT:home:197'],['Interest remaining','₹64,00,000 on current path'],['Your rate vs market','8.9% vs 8.4% offered for your 748 score']],
+ home:{do:'Action this quarter: switch to 8.4% — ₹6,20,000 saved over tenor, same house, same EMI date.',n:'Home loan',sub:'LIC HF · floating 8.9%',rows:[['Outstanding','₹78,00,000'],['EMI','₹68,400 · next 7 Aug'],['Interest rate','EDITR:home:8.9'],['Tenor left','16.4 years'],['EMIs pending','EDIT:home:197'],['Interest remaining','₹64,00,000 on current path'],['Your rate vs market','8.9% vs 8.4% offered for your 748 score']],
   why:'Two lenders qualify you at 8.4% — a switch saves ₹6,20,000 over the remaining tenor, same house, same EMI date. At 770+, another 15bps opens.',
   act:'Check the switch — two offers',r:'rm'}
 };
@@ -2656,6 +2651,16 @@
   document.getElementById('lsub').textContent=D.sub;
   document.getElementById('lstript').textContent=D.do;
   document.getElementById('lrows').innerHTML=D.rows.map(function(r){
+    if(String(r[1]).indexOf('EDITR:')===0){
+      var pr2=r[1].split(':'),lk2=pr2[1],dv2=window.LBR&&window.LBR[lk2]!==undefined?window.LBR[lk2]:parseFloat(pr2[2]);
+      if(!window.LBR)window.LBR={};window.LBR[lk2]=dv2;
+      return '<div class="rw"><span class="sm">'+r[0]+'</span>'
+        +'<span class="fld" style="margin:0;padding:6px 12px;display:inline-flex;align-items:center;gap:6px;">'
+        +'<input data-lrate="'+lk2+'" inputmode="decimal" value="'+dv2+'" '
+        +'style="background:none;border:none;color:var(--tx);font:inherit;font-size:16px;text-align:right;width:3.4em;padding:0;">'
+        +'<span class="sm dm">% a year</span></span></div>'
+        +'<p class="sm dm" data-lrnote="'+lk2+'" style="display:none;margin-top:4px;">You corrected this \u2014 the statement shows '+pr2[2]+'%. Swapnil sees both.</p>';
+    }
     if(String(r[1]).indexOf('EDIT:')===0){
       var pr=r[1].split(':'),lk=pr[1],dv=window.EMIP&&window.EMIP[lk]!==undefined?window.EMIP[lk]:parseInt(pr[2],10);
       if(!window.EMIP)window.EMIP={};window.EMIP[lk]=dv;
@@ -2668,6 +2673,14 @@
     return '<div class="rw"><span class="sm">'+r[0]+'</span><span style="font-size:13px;text-align:right;max-width:62%;">'+r[1]+'</span></div>';}).join('')
     +'<p class="sm dm" style="margin-top:6px;" id="emiline"></p>';
   emiRecalc(id);
+  document.getElementById('lrows').querySelectorAll('[data-lrate]').forEach(function(el){
+    el.addEventListener('input',function(){
+      var raw=el.value.replace(/[^0-9.]/g,''); if(raw!==el.value)el.value=raw;
+      var k2=el.getAttribute('data-lrate');
+      window.LBR[k2]=(raw===''||raw==='.')?null:Math.min(parseFloat(raw),60);
+      var note=document.getElementById('lrows').querySelector('[data-lrnote="'+k2+'"]');
+      var orig={cc:42,home:8.9,car:9.5}[k2];
+      if(note)note.style.display=(window.LBR[k2]!==null&&window.LBR[k2]!==orig)?'block':'none';});});
   document.getElementById('lrows').querySelectorAll('[data-emi]').forEach(function(el){
     el.addEventListener('input',function(){
       var raw=el.value.replace(/[^0-9]/g,''); if(raw!==el.value)el.value=raw;
@@ -2712,11 +2725,12 @@
 window.buOK=false;window.buSkip=false;window.MISS=[];
 var NODATA=false;
 var LS=[
- {n:'Flexi Cap Fund',cat:'mf',oc:'grow',ret:15.1,ytm:null,cagr:15.1,tk:500,s:'15.1% a year over 5 years · ahead of category · trail 0.75% a year',a:['Invest','data-ord','mf']},
- {n:'Nifty 50 Index Fund',cat:'mf',oc:'grow',ret:12.8,ytm:null,cagr:12.8,tk:500,s:'5y 12.8% · trail 0.20% a year — the cheap core',a:['Invest','data-ord','mf']},
- {n:'Bluechip Fund',cat:'mf',oc:'grow',ret:12.9,ytm:null,cagr:12.9,tk:500,s:'In line with category · overlap group A — check before adding',a:['Invest','data-ord','mf']},
- {n:'ELSS Tax Saver',cat:'mf',oc:'tax',ret:13.0,ytm:null,cagr:13.0,tk:500,s:'80C · 3-year lock · 13.0% a year',a:['Invest','data-ord','mf']},
- {n:'Liquid Fund — sweep',cat:'mf',oc:'park',ret:6.8,ytm:null,cagr:6.8,tk:500,s:'~6.8% · withdraw any day · trail 0.10% a year',a:['Sweep','data-ord','cash']},
+ {n:'Meridian Flexi Cap \u00b7 Direct Growth',cat:'mf',mcat:'Flexi cap',oc:'grow',ret:15.1,ytm:null,cagr:15.1,tk:500,s:'15.1% a year over 5 years · ahead of category · trail 0.75% a year',a:['Invest','data-ord','mf']},
+ {n:'Meridian Nifty 50 Index \u00b7 Direct Growth',cat:'mf',mcat:'Index',oc:'grow',ret:12.8,ytm:null,cagr:12.8,tk:500,s:'5y 12.8% · trail 0.20% a year — the cheap core',a:['Invest','data-ord','mf']},
+ {n:'Crestline Bluechip \u00b7 Direct Growth',cat:'mf',mcat:'Large cap',oc:'grow',ret:12.9,ytm:null,cagr:12.9,tk:500,s:'In line with category · overlap group A — check before adding',a:['Invest','data-ord','mf']},
+ {n:'Crestline ELSS Tax Saver \u00b7 Direct Growth',cat:'mf',mcat:'ELSS',oc:'tax',ret:13.0,ytm:null,cagr:13.0,tk:500,s:'80C · 3-year lock · 13.0% a year',a:['Invest','data-ord','mf']},
+ {n:'Meridian Liquid \u00b7 Direct Growth',cat:'mf',mcat:'Liquid',oc:'park',ret:6.8,ytm:null,cagr:6.8,tk:500,s:'~6.8% · withdraw any day · trail 0.10% a year',a:['Sweep','data-ord','cash']},
+ {n:'Crestline Small Cap \u00b7 Direct Growth',cat:'mf',mcat:'Small cap',oc:'grow',ret:17.4,ytm:null,cagr:17.4,tk:500,s:'17.4% a year over 5 years \u00b7 falls hardest in a crash \u00b7 7-year money \u00b7 trail 0.85% a year',a:['Invest','data-ord','mf']},
  {n:'AAA PSU Bond 2029',cat:'bond',oc:'income',ret:7.4,ytm:7.4,cagr:null,tk:1000000,s:'7.4% YTM kept · demat credit next day · fee 0.4% in price',a:['See bond','data-nav','bond']},
  {n:'State development loan 2028',cat:'bond',oc:'income',ret:7.9,ytm:7.9,cagr:null,tk:1000000,s:'7.9% YTM · min ₹10,00,000 · fee 0.5% in price',a:['See bond','data-nav','bond']},
  {n:'Multi-asset PMS · Quant tilt',cat:'pms',oc:'grow',ret:18.2,ytm:null,cagr:18.2,tk:5000000,s:'18.2% a year over 3 years · min ₹50,00,000 · fit-checked by Swapnil',a:['Fit check','data-nav','pms']},
@@ -2736,7 +2750,7 @@
  {n:'Onix Renewable',cat:'unlist',oc:'grow',ret:null,ytm:null,cagr:null,tk:49000,s:'₹49 a share · smallest lot ₹49,000 · two dealer quotes',a:['See company','data-nav','unlist']},
  {n:'3one4 Capital IFSC Fund V',cat:'gift',oc:'grow',ret:null,ytm:null,cagr:null,tk:null,s:'Category I fund · IFSCA · open to retail · uses your $250,000 yearly limit',a:['See fund','data-nav','gift']},
  {n:'ASK Investment Managers · GIFT',cat:'gift',oc:'grow',ret:null,ytm:null,cagr:null,tk:null,s:'Managed account · IFSCA · accredited investors only',a:['See fund','data-nav','gift']}];
-var FLT={oc:'all',fc:'all',fr:0,ft:0,fs:'name',q:''};
+var FLT={oc:'all',fc:'all',mfc:'all',fr:0,ft:0,fs:'name',q:''};
 /* ticket bands: 1 = under ₹1,00,000 · 2 = ₹1,00,000–₹10,00,000 · 3 = ₹10,00,000+ */
 function tkBand(v){if(v===null||v===undefined)return 0;if(v<100000)return 1;if(v<1000000)return 2;return 3;}
 var DLP={month:'Jul 2026',quarter:'Apr\u2013Jun 2026 \u00b7 Q1 FY26-27',year:'FY25-26'};
@@ -2804,6 +2818,7 @@
 function renderLS(){
   var base=LS.filter(function(p){return (FLT.oc==='all'||p.oc===FLT.oc)
     &&(FLT.fc==='all'||p.cat===FLT.fc||(FLT.fc==='fi'&&(p.cat==='bond'||p.cat==='mld'||p.cat==='cfd')))
+    &&(FLT.fc!=='mf'||FLT.mfc==='all'||p.mcat===FLT.mfc)
     &&(FLT.ft===0||tkBand(p.tk)===FLT.ft)
     &&(FLT.q===''||p.n.toLowerCase().indexOf(FLT.q)>=0);});
   /* yield filter: only products carrying a published yield can answer it */
@@ -2831,6 +2846,15 @@
   if(nl){ if(hidden>0){ nl.style.display='block';
       nl.textContent=hidden+(hidden===1?' product carries no published yield, so it cannot answer this filter — it is not shown.':' products carry no published yield, so they cannot answer this filter — they are not shown.');
     } else { nl.style.display='none'; nl.textContent=''; } }
+  var yc2=document.getElementById('fsytm');
+  if(yc2)yc2.style.display=(FLT.fc==='fi')?'':'none';
+  if(FLT.fc!=='fi'&&FLT.fs==='ytm'){FLT.fs='name';}
+  var mr=document.getElementById('mfcrow');
+  if(mr){mr.style.display=(FLT.fc==='mf')?'':'none';
+    mr.querySelectorAll('[data-mfc]').forEach(function(c){
+      var on=c.getAttribute('data-mfc')===FLT.mfc;
+      c.classList.toggle('on',on);
+      c.style.borderColor=on?'rgba(236,236,241,.4)':'';});}
   var lc=document.getElementById('lscount');
   lc.textContent=rows.length+' of '+LS.length+' products'+(FLT.q?' matching \u201c'+FLT.q+'\u201d':'');
   if(rows.length===0&&FLT.q){lc.textContent='Nothing here is called \u201c'+FLT.q+'\u201d \u2014 clear the search or check the shelf name.';}
@@ -2840,7 +2864,7 @@
     var CATNAV={mf:'fund',bond:'bond',pms:'pms',aif:'aif',mld:'mld',cfd:'cfdp',trust:'trust',unlist:'unlist',gift:'gift'};
     var CATTY={mf:'Mutual fund',bond:'Bond',mld:'Market-linked note',cfd:'Company FD',trust:'Listed trust',unlist:'Unlisted shares',gift:'GIFT City fund',pms:'PMS',aif:'AIF',ins:'Insurance'};
     var dt=p.dt||(CATNAV[p.cat]?['data-nav',CATNAV[p.cat]]:['data-ins','secure']);
-    return '<div class="cd" style="margin-top:9px;"><p class="lb" style="font-size:9.5px;">'+(CATTY[p.cat]||'')+'</p><div class="rw" style="border:none;padding:0;margin-top:3px;"><span style="font-size:13.5px;font-weight:600;">'+p.n+'</span>'+(function(){
+    return '<div class="cd" style="margin-top:9px;"><p class="lb" style="font-size:9.5px;">'+((p.cat==='mf'&&p.mcat)?('Mutual fund \u00b7 '+p.mcat):(CATTY[p.cat]||''))+'</p><div class="rw" style="border:none;padding:0;margin-top:3px;"><span style="font-size:13.5px;font-weight:600;">'+p.n+'</span>'+(function(){
       if(p.ytm!==null&&p.ytm!==undefined)return '<span class="sm" style="color:var(--pos);flex-shrink:0;">'+p.ytm+'% yield</span>';
       if(p.cagr!==null&&p.cagr!==undefined)return '<span class="sm" style="color:var(--pos);flex-shrink:0;">'+p.cagr+'% a year</span>';
       if(p.cat==='ins')return '<span class="sm dm" style="flex-shrink:0;">cover</span>';
@@ -3153,7 +3177,7 @@
 }
 document.addEventListener('click',function(e){ if(e.target.classList&&(e.target.classList.contains('modal')||e.target.classList.contains('dlgwrap'))&&e.target.classList.contains('on')){e.target.classList.remove('on');return;} 
   var SEL='.fld,.tap,.lnk,.seg span,[data-q],[data-go],[data-nav],[data-om],[data-oa],[data-ra],[data-sw],[data-x],[data-vt],[data-vm],[data-tt],[data-h],[data-e],[data-lb],[data-ord],[data-cs],[data-bd],[data-bt],[data-rf],[data-dk],[data-ic],[data-nd],[data-oc],[data-fo],[data-fc],[data-fr],[data-ft],[data-fs],[data-freq],[data-dlp],[data-dlm],[data-rep],[data-deck],[data-ins],[data-dtl],[data-cfd],[data-xc],[data-mu],[data-mr],[data-mc],[data-wl]';
-  var KD=['data-q','data-go','data-nav','data-om','data-oa','data-ra','data-sw','data-x','data-vt','data-vm','data-tt','data-h','data-e','data-lb','data-ord','data-ch','data-cs','data-bd','data-bt','data-rf','data-dk','data-ic','data-nd','data-oc','data-fo','data-fc','data-fr','data-ft','data-fs','data-freq','data-dlp','data-dlm','data-rep','data-deck','data-ins','data-dtl','data-cfd','data-xc','data-mu','data-mr','data-mc','data-wl'];
+  var KD=['data-q','data-go','data-nav','data-om','data-oa','data-ra','data-sw','data-x','data-vt','data-vm','data-tt','data-h','data-e','data-lb','data-ord','data-ch','data-cs','data-bd','data-bt','data-rf','data-dk','data-ic','data-nd','data-oc','data-fo','data-fc','data-fr','data-ft','data-fs','data-freq','data-dlp','data-dlm','data-rep','data-deck','data-ins','data-dtl','data-cfd','data-xc','data-mu','data-mr','data-mc','data-wl','data-mfc','data-lrate'];
   function actionable(n){if(!n||!n.getAttribute)return false;if(n.classList&&n.classList.contains('fld')&&n.querySelector('input'))return true;if(n.id)return true;
     for(var i=0;i<KD.length;i++)if(n.getAttribute(KD[i])!==null)return true;
     if(n.parentElement&&n.parentElement.classList&&n.parentElement.classList.contains('seg'))return true;return false;}
@@ -3225,7 +3249,7 @@
   if(t.id==='refapply'){toast('Application #NVY-P-0412 raised — reviewed within 2 working days.');return;}
   var ii2=t.getAttribute('data-ins');
   if(ii2){openIns(ii2);return;}
-  if(t.id==='insbuy'){stack.push(cur);go('insform');return;}
+  if(t.id==='insrm'){stack.push(cur);go('rm');return;}
   if(t.id==='inspay'){
     ORD.type='ins';ORD.name=INS[curI].n;ORD.amt=INS[curI].prem;
     document.getElementById('pgwho').textContent='This page belongs to '+ORD.name.split(' ')[0]+'\u2019s payment gateway — not Nett. The premium goes to the insurer directly.';
@@ -3362,15 +3386,15 @@
   if(t.id==='otpsms'){toast('Fresh code sent — the old one just died.');runOtp();return;}
   if(t.id==='otpcall'){toast('Calling +91 98110 ···· 20 — the code is read out twice.');return;}
   if(t.id==='otpwa'){toast('Sent on WhatsApp ✓ — same 6-digit code.');return;}
-  if(t.id==='xsearch'){stack.push(cur);go('listing');
-    setTimeout(function(){var si=document.getElementById('lsearch');if(si)si.focus();},60);return;}
   if(t.id==='lsclear'){FLT.q='';var si2=document.getElementById('lsearch');if(si2)si2.value='';renderLS();return;}
   var oc=t.getAttribute('data-oc');
-  if(oc){FLT.oc=oc;FLT.fc='all';FLT.fr=0;FLT.ft=0;FLT.fs='name';FLT.q='';var sio=document.getElementById('lsearch');if(sio)sio.value='';stack.push(cur);go('listing');return;}
+  if(oc){FLT.oc=oc;FLT.fc='all';FLT.mfc='all';FLT.fr=0;FLT.ft=0;FLT.fs='name';FLT.q='';var sio=document.getElementById('lsearch');if(sio)sio.value='';stack.push(cur);go('listing');return;}
   var fo2=t.getAttribute('data-fo');
   if(fo2){FLT.oc=fo2;if(fo2!=='all'&&FLT.fc!=='all'&&!LS.some(function(p){return p.oc===fo2&&p.cat===FLT.fc;}))FLT.fc='all';renderLS();return;}
+  var mfc=t.getAttribute('data-mfc');
+  if(mfc){FLT.mfc=mfc;renderLS();return;}
   var fc2=t.getAttribute('data-fc');
-  if(fc2){FLT.fc=fc2;if(fc2!=='all'&&FLT.oc!=='all'&&!LS.some(function(p){return p.cat===fc2&&p.oc===FLT.oc;}))FLT.oc='all';renderLS();return;}
+  if(fc2){FLT.fc=fc2;FLT.mfc='all';if(fc2!=='all'&&FLT.oc!=='all'&&!LS.some(function(p){return p.cat===fc2&&p.oc===FLT.oc;}))FLT.oc='all';renderLS();return;}
   var fr2=t.getAttribute('data-fr');
   if(fr2!==null&&fr2!==undefined&&fr2!==''){FLT.fr=+fr2;renderLS();return;}
   var ft2=t.getAttribute('data-ft');
@@ -3389,11 +3413,11 @@
   var fldInp=(_fn&&_fn.classList&&_fn.classList.contains('fld'))?_fn.querySelector('input'):null;
   if(fldInp&&e.target!==fldInp){fldInp.focus();return;}
   if(t.id==='fltoggle'){flToggle();return;}
-  if(t.id==='flclear'){FLT.oc='all';FLT.fc='all';FLT.fr=0;FLT.ft=0;FLT.fs='name';FLT.q='';var sic=document.getElementById('lsearch');if(sic)sic.value='';renderLS();return;}
+  if(t.id==='flclear'){FLT.oc='all';FLT.fc='all';FLT.mfc='all';FLT.fr=0;FLT.ft=0;FLT.fs='name';FLT.q='';var sic=document.getElementById('lsearch');if(sic)sic.value='';renderLS();return;}
   if(t.id==='limcont'){NODATA=true;stack=[];go('home');toast('No-data mode — the app still works. Share anytime from any empty slot.');return;}
   if(t.id==='wm0'){toast('Request #NVY-M-071 raised — Swapnil adds holdings manually, verified against statements.');return;}
   var xc=t.getAttribute('data-xc');
-  if(xc){FLT.oc='all';FLT.fc=xc;FLT.fr=0;FLT.ft=0;FLT.fs='name';FLT.q='';var six=document.getElementById('lsearch');if(six)six.value='';stack.push(cur);go('listing');return;}
+  if(xc){FLT.oc='all';FLT.fc=xc;FLT.mfc='all';FLT.fr=0;FLT.ft=0;FLT.fs='name';FLT.q='';var six=document.getElementById('lsearch');if(six)six.value='';stack.push(cur);go('listing');return;}
   if(t.id==='ulhow'){toast('You sign a delivery instruction, the dealer transfers shares to your demat, you pay on confirmation. Two to five working days.');return;}
   if(t.id==='cfdrate'){toast('12–23 months 6.85% · 24–35 months 7.00% · 36–47 months 7.15% · 48–59 months 7.15% · 60 months 7.15%. All cumulative, a year.');return;}
   if(t.id==='trhow'){toast('A trust must pass at least 90% of what it collects to unit holders. That is the rule — the amount still depends on rents and tolls.');return;}

```
