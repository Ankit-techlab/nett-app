# diff.md — Nett app v1.24 → v1.25 (voice compliance · /nett-ux-writing + /nett-interaction-audit)

**Base:** `nett-app_v1_24_19_08_2026.html` · **Head:** `nett-app_v1_25_19_08_2026.html` · md5 `764f2ada…` · 19 Aug 2026

```
22 hunks · +38 / −38 lines · copy-only release: zero markup structure, zero handlers, zero CSS changed
Population gate PASS — all 70 screens intact
```

## W-A · Slash flows → spelled periods (12 sites) — §5 "slashes are for spreadsheets"

₹25,000/month · ₹4,10,000/month · ₹23,800/month · ₹38,000/month · ₹1,12,000/month · ₹40,000/month · 1%/month ×2 · ₹1.26L/yr — all now "a month" / "a year". Includes hits inside JS-escaped chat strings the old gate never scanned.

## W-B · L-suffix money → full Indian figures (21 sites) — "lakh never," both canons

Targeted: ₹1.9L → ₹1,90,000 · ₹3L → ₹3,00,000 (incl. the three Arth chip labels) · ₹1L / ₹2L → full · ₹1.05L → ₹1,05,000 · ₹1.26L → ₹1,26,000.
Sweep (Decimal-exact): ₹1.64 L · ₹3.4 L · ₹4.2 L · ₹5 L · ₹7.5 L · ₹7.8 L · ₹8.6 L · ₹17.9 L · ₹34 L · ₹42.6 L · ₹62 L — all expanded. A float-truncation bug in my first sweep (₹17.9 L → ₹17,89,999, off by one rupee) was caught by the all-or-nothing assertion before anything was written; rewritten with Decimal.

## W-C · T+N → human time (9 sites) — Rule Book 1.6

"T+1 to your demat" → "In your demat the next working day" · "T+2 working days" → "2 working days" · redemption toast → "within 2 working days" · order confirm, withdraw line, bond rows — all human.
**Disclosed:** the DSR's own §5b specimen toast still reads "T+2" — that's a photograph of v1.14 copy, and the Rule Book's prescriptive 1.6 (dated a day later) wins for shipped copy. Flagged for the DSR's next edition so the specimen matches the law.

## W-D · A banned word in a demo product name (1 site)

Fictional bond "State guaranteed 2028" → **"State development loan 2028"** (a real instrument class, no claim word). Free rename — the row is already flagged fictional under G-07.

## W-E · "free" as an unexplained fee claim (4 sites) — Rule Book 1.9

"Walk this report with Swapnil — free" → claim dropped from the CTA · "accident rider free" → "at no added premium" (the mechanism, in the same breath) · "Swapnil reviews it free." ×2 → "Swapnil reviews it, on record." The full fee-transparency line stays pending Yogesh sir — nothing invented.

## Examined and correctly left alone

"₹1,90,000 free" (surplus cash — "free" means unallocated, not fee-free) · "what should I do?" (the **user's** chat line — the should-ban binds Arth, not the reader) · nominee/PAN toasts (information after handled actions, DSR-permitted) · "Explore" tab (DSR canon nav, not a button label).

## Gate strengthened — and proven

`audit.js` voice gate +3 patterns: escaped-₹ L-suffix · spelled slash-flows · T+N.
**Proof both ways:** the strengthened gate run against v1.24 fails on exactly the three new patterns (SHIP BLOCKED); against v1.25 it passes 17/17. The blind spot that let ~45 violations through is closed.

## Verification

Twelve suites: audit **17/17** (was 14, +3 voice) · regression 45 · explore 44 · drawer 22 · w1 27 · fb 35 · fb2 18 · reports 29 · fb3 31 · fb4 20 · dsr 30 — **318 assertions** · population gate PASS · dead-button advisory: same 32 known items as v1.23, **zero new** (R-2 unchanged).
Process note, disclosed: one intermediate run executed the suites against a stale file (the patch had aborted before writing; identical md5 betrayed it). That run was voided and re-executed on the real build — exactly the stale-build trap the interaction-audit skill exists to catch, caught by its build-identity discipline.

---

```diff
--- nett-app_v1_24_19_08_2026.html	2026-08-19 07:15:27.400274787 +0000
+++ nett-app_v1_25_19_08_2026.html	2026-08-19 07:34:29.939343745 +0000
@@ -301,7 +301,7 @@
     <p class="sm au" style="text-align:center;margin-top:6px;">The scan is complimentary. We earn distribution fees only when you invest — and we show you every fee, every time.</p>
   </div>
 
-  <p class="sm dm" id="buildstamp" style="margin-top:14px;text-align:center;opacity:.55;">prototype build v1.24 · 07 Aug 2026</p>
+  <p class="sm dm" id="buildstamp" style="margin-top:14px;text-align:center;opacity:.55;">prototype build v1.25 · 07 Aug 2026</p>
 </section>
 
 <!-- SCAN FORM -->
@@ -417,7 +417,7 @@
   <p class="lb au" style="margin-top:26px;">Do’s &amp; Don’ts — this month</p>
   <div class="cd" style="margin-top:10px;">
     <p style="font-size:13px;font-weight:600;color:var(--pos);">Do</p>
-    <p class="sm" style="margin-top:5px;">Clear the card this week · start the ₹25,000/month reserve fill · let the 15 Aug RSUs vest in dollars · download the tax report before 1 Sep.</p>
+    <p class="sm" style="margin-top:5px;">Clear the card this week · start the ₹25,000 a month reserve fill · let the 15 Aug RSUs vest in dollars · download the tax report before 1 Sep.</p>
     <div class="hr" style="margin:12px 0;"></div>
     <p style="font-size:13px;font-weight:600;color:var(--red);">Don’t</p>
     <p class="sm" style="margin-top:5px;">Don’t add to Meridian · don’t auto-renew the ₹18,00,000 FD maturing in Sep · don’t pause SIPs if markets dip · don’t pay only the card minimum — that trap costs ₹15,900 a month.</p>
@@ -429,7 +429,7 @@
   </div>
 
   <div style="display:flex;gap:8px;margin-top:16px;">
-    <span class="cta tap" data-nav="rm" style="flex:1;padding:13px;font-size:13.5px;">Walk this report with Swapnil — free</span>
+    <span class="cta tap" data-nav="rm" style="flex:1;padding:13px;font-size:13.5px;">Walk this report with Swapnil</span>
     <span class="cta2 tap" data-nav="world" style="flex:0.7;">See it as your island</span>
   </div>
 
@@ -520,7 +520,7 @@
     <div class="cd tap" data-nav="bond" style="min-width:246px;">
       <p class="lb" style="color:var(--pos);">SPOTLIGHT</p>
       <p style="font-size:14px;font-weight:600;margin-top:7px;">AAA PSU Bond 2029 — closes Fri</p>
-      <p class="sm" style="margin-top:5px;"><b style="color:var(--tx);">7.4%</b> kept vs 4.9% post-tax on FDs. T+1 to your demat.</p>
+      <p class="sm" style="margin-top:5px;"><b style="color:var(--tx);">7.4%</b> kept vs 4.9% post-tax on FDs. In your demat the next working day.</p>
       <span class="cta2 tap" data-nav="bond" style="display:inline-block;margin-top:9px;padding:8px 14px;font-size:12px;">See the bond</span>
     </div>
   </div>
@@ -879,7 +879,7 @@
     <div class="rw"><span>SecureLife iTerm</span><span style="color:var(--tx);">₹2,890 a month</span></div>
     <p class="sm" style="margin-top:5px;"><span style="color:var(--pos);">99.1% claims paid</span> · settles in 1.2 days median · our pick for claim record</p>
   </div>
-  <div class="cd tap" data-ins="sent" style="margin-top:9px;"><div class="rw"><span>Sentinel Protect+</span><span>₹2,640 a month</span></div><p class="sm" style="margin-top:5px;">98.4% claims paid · adds ₹50,00,000 accident rider free</p></div>
+  <div class="cd tap" data-ins="sent" style="margin-top:9px;"><div class="rw"><span>Sentinel Protect+</span><span>₹2,640 a month</span></div><p class="sm" style="margin-top:5px;">98.4% claims paid · adds a ₹50,00,000 accident rider at no added premium</p></div>
   <div class="cd tap" data-ins="natl" style="margin-top:9px;"><div class="rw"><span>NationalPro Term</span><span>₹2,410 a month</span></div><p class="sm" style="margin-top:5px;">97.2% claims paid · cheapest — the trade-off is settlement speed (4.1 days)</p></div>
   <p class="sm" style="margin-top:12px;">We earn a distribution fee from the insurer — shown on the detail page, before you pay.</p>
 </section>
@@ -1025,7 +1025,7 @@
     <div class="cd tap" data-nav="bond" style="min-width:236px;border-color:rgba(214,179,106,.45);background:linear-gradient(155deg,rgba(214,179,106,.1),transparent);">
       <p class="lb" style="color:var(--gold);">CLOSES FRIDAY</p>
       <p style="font-size:14px;font-weight:600;margin-top:6px;">AAA PSU Bond 2029</p>
-      <p class="sm" style="margin-top:4px;"><b style="color:var(--tx);">7.4%</b> kept · T+1 to demat · fee 0.4% in price</p>
+      <p class="sm" style="margin-top:4px;"><b style="color:var(--tx);">7.4%</b> kept · demat credit next day · fee 0.4% in price</p>
     </div>
     <div class="cd tap" data-nav="pms" style="min-width:236px;">
       <p class="lb" style="color:var(--bone);">PMS SPOTLIGHT</p>
@@ -2075,7 +2075,7 @@
   <p class="ser" style="font-size:19px;">Redeem</p>
   <p class="sm" style="margin-top:6px;" id="rsub">—</p>
   <div class="sc" style="margin-top:12px;" id="ramts"><span class="tag tap on" data-ra="₹1,00,000" style="border-color:rgba(236,236,241,.4);">₹1,00,000</span><span class="tag tap" data-ra="₹2,50,000">₹2,50,000</span><span class="tag tap" data-ra="All units">All units</span></div>
-  <div class="cd" style="margin-top:12px;"><div class="rw"><span class="sm">Exit load</span><span id="rload">Nil — held over 1 year</span></div><div class="rw"><span class="sm">Tax note</span><span>LTCG 12.5% beyond ₹1,25,000 a year</span></div><div class="rw"><span class="sm">Money in bank</span><span>T+2 working days</span></div></div>
+  <div class="cd" style="margin-top:12px;"><div class="rw"><span class="sm">Exit load</span><span id="rload">Nil — held over 1 year</span></div><div class="rw"><span class="sm">Tax note</span><span>LTCG 12.5% beyond ₹1,25,000 a year</span></div><div class="rw"><span class="sm">Money in bank</span><span>2 working days</span></div></div>
   <div style="display:flex;gap:8px;margin-top:14px;"><span class="cta2 tap" id="rclose" style="flex:0.7;">Keep it</span><span class="cta tap" id="rgo" style="flex:1;padding:12px;">Redeem — fingerprint</span></div>
 </div></div>
 <div class="modal" id="swsheet"><div class="sheet">
@@ -2091,7 +2091,7 @@
   <p class="sm" style="margin-top:6px;">₹9,80,000 in your broker ledger, earning zero for 63 days.</p>
   <div class="cd" style="margin-top:12px;">
     <div class="rw"><span class="sm">1 · Payout request</span><span style="color:var(--pos);">placed with broker ✓</span></div>
-    <div class="rw"><span class="sm">2 · Credit to your bank</span><span>T+1 working day</span></div>
+    <div class="rw"><span class="sm">2 · Credit to your bank</span><span>Next working day</span></div>
     <div class="rw"><span class="sm">3 · Sweep to liquid</span><span>auto-draft fires on credit · your fingerprint confirms</span></div>
   </div>
   <p class="sm" style="margin-top:10px;">Nothing moves without your authentication — the draft waits for you.</p>
@@ -2114,7 +2114,7 @@
 <div class="modal" id="wifssheet"><div class="sheet">
   <p class="ser" style="font-size:19px;">If salary stops for 2 months</p>
   <div class="cd" style="margin-top:12px;">
-    <div class="rw"><span class="sm">Fixed outflows</span><span>₹4,10,000/month · EMIs + SIPs + living</span></div>
+    <div class="rw"><span class="sm">Fixed outflows</span><span>₹4,10,000 a month · EMIs + SIPs + living</span></div>
     <div class="rw"><span class="sm">Two months need</span><span>₹8,20,000</span></div>
     <div class="rw"><span class="sm">Reserve today</span><span style="color:var(--red);">₹4,60,000 — 5 weeks short</span></div>
   </div>
@@ -2226,7 +2226,7 @@
  cc:{t:'The cracked crystal',st:'Critical',stc:'#E08A8A',cur:'₹7,20,000 revolving at 42% a year',idl:'Zero, today',gap:'₹3,02,000 a year burning',comp:8,
    why:'The deepest, sharpest thing under your island — and the only one that grows on its own. Every month it stands undoes a month of everything above.',
    src:'Source: idle cash — clears it and leaves ₹21,00,000.',imp:'Impact: the water itself recedes; score heads to 770.',act:'Shatter it today',r:'m1'},
- tax:{t:'The shore drain',st:'Time-bound',stc:'#D9B96A',cur:'₹3,40,000 due 15 Sep',idl:'Diarised, funded',gap:'1%/month if missed',comp:0,
+ tax:{t:'The shore drain',st:'Time-bound',stc:'#D9B96A',cur:'₹3,40,000 due 15 Sep',idl:'Diarised, funded',gap:'1% a month if missed',comp:0,
    why:'A drain opens mid-September whether you plan for it or not. Planned, it is plumbing; unplanned, it is leakage with interest.',
    src:'One diarised transfer, CA copy attached.',imp:'Impact: the drain becomes a scheduled pipe.',act:'Diarise 1 Sep',r:'toast:Diarised — 1 Sep transfer, amount locked.'},
  intl:{t:'The dollar pier',st:'Underallocated',stc:'#D9B96A',cur:'$21,400 (₹17,90,000) · RSUs + ETF',idl:'10% global sleeve (~₹27,00,000)',gap:'₹9,00,000 short of the sleeve',comp:66,
@@ -2433,7 +2433,7 @@
  document.getElementById('fdrows').innerHTML=h;document.getElementById('fdnet').textContent=net;
  document.getElementById('famdetsheet').classList.add('on');}
 function showErr(t,b,ref){document.getElementById('errtitle').textContent=t;document.getElementById('errbody').innerHTML=b;document.getElementById('errref').textContent='ref '+ref;document.getElementById('errsheet').classList.add('on');}
-var NETT_VER='1.24';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
+var NETT_VER='1.25';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
 function _go(id){
   if(NODATA&&(id==='home'||id==='health'||id==='wealth'))id=id+'0';
   scr.forEach(function(k){var el=document.getElementById('s-'+k);if(el)el.classList.remove('on');});
@@ -2509,7 +2509,7 @@
    tx:[['SIP ₹20,000','5 Jul 2026'],['SIP ₹20,000','5 Jun 2026'],['SIP ₹20,000','5 May 2026'],['SIP ₹20,000','5 Apr 2026']]},
  foc:{do:'Action: fold into one — overlap group A.',doc:'amb',n:'Focused 30',fo:'Folio 5541092/07 · Regular · Growth',inv:'₹8,90,000',cur:'₹11,80,000',del:'+₹2,90,000 · +33%',gp:75,xirr:'13.4%',xc:'#3ED598',cat:'+0.6% ahead of category',since:'Jun 2021',sip:'No active SIP',lag:'Overlap group A.',
    tx:[['Lumpsum ₹3,00,000','9 Oct 2025'],['Lumpsum ₹2,50,000','14 Mar 2025'],['Lumpsum ₹3,40,000','2 Jun 2021']]},
- mid:{do:'Action: switch this quarter — 3 years behind category. Swapnil reviews it free.',doc:'red',n:'Midcap Opportunities',fo:'Folio 118845/63 · Regular · Growth',inv:'₹8,40,000',cur:'₹9,20,000',del:'+₹80,000 · +9.5%',gp:91,xirr:'6.1%',xc:'#E08A8A',cat:'lags category by 3.4% a year over 3y',since:'Feb 2022',sip:'₹15,000 monthly · next 5 Aug',lag:'Three years behind its peers. Every month here is a month your money runs slower than its category. Switch candidate — Swapnil reviews it free.',
+ mid:{do:'Action: switch this quarter — 3 years behind category. Swapnil reviews it, on record.',doc:'red',n:'Midcap Opportunities',fo:'Folio 118845/63 · Regular · Growth',inv:'₹8,40,000',cur:'₹9,20,000',del:'+₹80,000 · +9.5%',gp:91,xirr:'6.1%',xc:'#E08A8A',cat:'lags category by 3.4% a year over 3y',since:'Feb 2022',sip:'₹15,000 monthly · next 5 Aug',lag:'Three years behind its peers. Every month here is a month your money runs slower than its category. Switch candidate — Swapnil reviews it, on record.',
    tx:[['SIP ₹15,000','5 Jul 2026'],['SIP ₹15,000','5 Jun 2026'],['SIP ₹15,000','5 May 2026'],['Lumpsum ₹4,00,000','18 Feb 2022']]},
  val:{do:'Action: switch this quarter — 3 years behind category.',doc:'red',n:'Value Fund',fo:'Folio 902271/18 · Regular · Growth',inv:'₹7,50,000',cur:'₹7,90,000',del:'+₹40,000 · +5.3%',gp:95,xirr:'5.8%',xc:'#E08A8A',cat:'lags category by 3.1% a year over 3y',since:'Nov 2022',sip:'No active SIP',lag:'Underperformer three years running. Switch candidate.',
    tx:[['Lumpsum ₹4,00,000','21 Nov 2022'],['Lumpsum ₹3,50,000','8 Jan 2023']]},
@@ -2544,7 +2544,7 @@
   ORD.mode=(type==='bond'||type==='cash')?'once':'sip';
   ORD.name=(type==='bond')?'AAA PSU Bond 2029':(type==='cash')?'Liquid Fund — sweep':(type==='add'?HOLD[curH].n.replace('&amp;','&'):'Flexi Cap Fund');
   document.getElementById('otitle').textContent=(type==='add')?'Add more':(type==='bond'?'Buy bonds':(type==='cash'?'Sweep to liquid':'Invest'));
-  document.getElementById('osub').textContent=(type==='cash')?'From your savings via UPI · earns ~6.8% · withdraw any day':ORD.name+(type==='bond'?' · settles to your demat, T+1':' · Regular · Growth');
+  document.getElementById('osub').textContent=(type==='cash')?'From your savings via UPI · earns ~6.8% · withdraw any day':ORD.name+(type==='bond'?' · settles to your demat next day':' · Regular · Growth');
   document.getElementById('omode').style.display=(type==='bond'||type==='cash')?'none':'flex';
   document.getElementById('odate').style.display=(type==='bond'||type==='cash'||ORD.mode==='once')?'none':'block';
   var chips=(type==='cash')?['₹10,00,000','₹18,60,000','₹24,00,000']:(type==='bond')?['₹50,600','₹1,01,200','₹2,02,400']:['₹10,000','₹25,000','₹50,000','₹1,00,000'];
@@ -2613,7 +2613,7 @@
  cc:{do:'Action today: pay in full from idle — ₹3,02,000 a year stops burning, score heads to 770.',n:'Credit card revolving',sub:'AnyBank Platinum · statement 28 Jun',rows:[['Outstanding','₹7,20,000'],['Rate','42% a year — ₹3,02,000 a year burning'],['Minimum due (the trap)','₹36,000 — paying only this costs ₹15,900 a month in interest'],['Due date','18 Jul — 6 days away'],['Score impact','utilisation 68% — the single drag on your 748']],
   why:'Your idle cash clears this today and still leaves ₹21,00,000. No investment on this platform outruns 42%.',
   act:'Pay in full from idle — draft ready',r:'toast:Payoff draft ready — ₹7,20,000, one fingerprint. Score heads to 770.'},
- car:{do:'Action this month: prepay from idle — ₹1,34,000 saved, ₹23,800/month released, zero penalty.',n:'Car loan',sub:'HDFC · floating 9.5%',rows:[['Outstanding','₹11,00,000'],['EMI','₹23,800 · next 10 Aug'],['Tenor left','52 months'],['EMIs pending','EDIT:car:52'],['Interest remaining','₹2,40,000 on current path'],['Prepay penalty','Zero — floating rate, RBI rule']],
+ car:{do:'Action this month: prepay from idle — ₹1,34,000 saved, ₹23,800 a month released, zero penalty.',n:'Car loan',sub:'HDFC · floating 9.5%',rows:[['Outstanding','₹11,00,000'],['EMI','₹23,800 · next 10 Aug'],['Tenor left','52 months'],['EMIs pending','EDIT:car:52'],['Interest remaining','₹2,40,000 on current path'],['Prepay penalty','Zero — floating rate, RBI rule']],
   why:'Prepaying from idle saves ₹1,34,000 and closes it 22 months early — releasing ₹23,800 a month that can feed the reserve instead.',
   act:'Prepay from idle — see the math',r:'toast:Prepay draft: ₹11,00,000 clears it · ₹1,34,000 saved · ₹23,800 a month released.'},
  home:{do:'Action this quarter: switch to 8.4% — ₹6,20,000 saved over tenor, same house, same EMI date.',n:'Home loan',sub:'LIC HF · floating 8.9%',rows:[['Outstanding','₹78,00,000'],['EMI','₹68,400 · next 7 Aug'],['Tenor left','16.4 years'],['EMIs pending','EDIT:home:197'],['Interest remaining','₹64,00,000 on current path'],['Your rate vs market','8.9% vs 8.4% offered for your 748 score']],
@@ -2680,18 +2680,18 @@
 function chAdd(html,cls){var d=document.createElement('div');d.className='msg'+(cls?' '+cls:'');d.innerHTML=html;var t=document.getElementById('chthread');t.appendChild(d);t.scrollTop=t.scrollHeight;}
 function chFlow(k){
  if(k==='k'){chAdd('Can I plan Kiara\u2019s 2034 goal?','me');
-  chAdd('Kiara\u2019s US degree, 2034 — target \u2248 $140,000 (~\u20b91.2 Cr at today\u2019s rate; a dollar sleeve removes the \u201ctoday\u2019s-rate\u201d risk).<br><br>From your cashflow: <b>\u20b938,000/month</b> reaches it by Aug 2033. You free \u20b91.9L a month — this fits twice over.<br><br>Verdict: feasible without touching anything else.<br><br><span class="cta2 tap" id="chgoal" style="display:inline-block;padding:9px 14px;font-size:12px;">Start the dollar goal</span>&nbsp;<span class="cta2 tap" data-ch="rm" style="display:inline-block;padding:9px 14px;font-size:12px;">Bring Swapnil in</span>');}
- if(k==='f'){chAdd('I have \u20b93L free — what should I do?','me');
-  chAdd('From your report, in order of return:<br><br><b>1.</b> Your card burns 42% — \u20b93L against it saves <b>\u20b91.26L/yr</b>. Nothing else beats that.<br><b>2.</b> If the card clears this month anyway: \u20b91L to the reserve, \u20b92L one-time into Flexi Cap.<br><br>Pick one — I\u2019ll set it up now:<br><br><span class="cta2 tap" data-lb="cc" style="display:inline-block;padding:9px 14px;font-size:12px;color:var(--red);border-color:rgba(224,138,138,.5);">\u20b93L to the card</span>&nbsp;<span class="cta2 tap" data-ord="cash" style="display:inline-block;padding:9px 14px;font-size:12px;">\u20b91L to reserve</span>&nbsp;<span class="cta2 tap" data-ord="mf" style="display:inline-block;padding:9px 14px;font-size:12px;">\u20b92L to Flexi Cap</span>');}
+  chAdd('Kiara\u2019s US degree, 2034 — target \u2248 $140,000 (~\u20b91.2 Cr at today\u2019s rate; a dollar sleeve removes the \u201ctoday\u2019s-rate\u201d risk).<br><br>From your cashflow: <b>\u20b938,000 a month</b> reaches it by Aug 2033. You free \u20b91,90,000 a month — this fits twice over.<br><br>Verdict: feasible without touching anything else.<br><br><span class="cta2 tap" id="chgoal" style="display:inline-block;padding:9px 14px;font-size:12px;">Start the dollar goal</span>&nbsp;<span class="cta2 tap" data-ch="rm" style="display:inline-block;padding:9px 14px;font-size:12px;">Bring Swapnil in</span>');}
+ if(k==='f'){chAdd('I have \u20b93,00,000 free — what should I do?','me');
+  chAdd('From your report, in order of return:<br><br><b>1.</b> Your card burns 42% — \u20b93,00,000 against it saves <b>\u20b91,26,000 a year</b>. Nothing else beats that.<br><b>2.</b> If the card clears this month anyway: \u20b91,00,000 to the reserve, \u20b92,00,000 one-time into Flexi Cap.<br><br>Pick one — I\u2019ll set it up now:<br><br><span class="cta2 tap" data-lb="cc" style="display:inline-block;padding:9px 14px;font-size:12px;color:var(--red);border-color:rgba(224,138,138,.5);">\u20b93,00,000 to the card</span>&nbsp;<span class="cta2 tap" data-ord="cash" style="display:inline-block;padding:9px 14px;font-size:12px;">\u20b91,00,000 to reserve</span>&nbsp;<span class="cta2 tap" data-ord="mf" style="display:inline-block;padding:9px 14px;font-size:12px;">\u20b92,00,000 to Flexi Cap</span>');}
  if(k==='h'){chAdd('Can we afford a bigger house?','me');
-  chAdd('A \u20b91.5 Cr upgrade at 8.4%: EMI \u2248 <b>\u20b91.05L</b> vs \u20b968,400 today. Your cashflow holds it — <b>but the sequence matters</b>: card gone first, reserve full second. Then yes, comfortably.<br><br><span class="cta2 tap" data-ch="rm" style="display:inline-block;padding:9px 14px;font-size:12px;">Get the written plan — Swapnil</span>');}
+  chAdd('A \u20b91.5 Cr upgrade at 8.4%: EMI \u2248 <b>\u20b91,05,000</b> vs \u20b968,400 today. Your cashflow holds it — <b>but the sequence matters</b>: card gone first, reserve full second. Then yes, comfortably.<br><br><span class="cta2 tap" data-ch="rm" style="display:inline-block;padding:9px 14px;font-size:12px;">Get the written plan — Swapnil</span>');}
  if(k==='rm'){chAdd('Arth is bringing Swapnil in · he sees this thread, reviewing everything above \u2191','sys');
   chAdd('Reading this now, Rahul. The sequencing is right — card first, then the reserve. I\u2019ll send the written plan tonight, on record. Anything you want included?','rm2');}
 }
 var TH=[
  {tx:'₹28,40,000 is sleeping across savings and your broker ledger. You could ',act:'let it work',msg:'Sweep drafted — liquid first, prepay plan next. Swapnil confirms sequence.'},
  {tx:'Your card revolve costs more per year than any fund here earns. You could ',act:'end it today',msg:'Full payoff draft ready from idle cash — one confirmation on the fixed rail.',why:'card revolve 42% · idle cash available'},
- {tx:'Advance tax lands mid-September, and it does not negotiate. You could ',act:'diarise it now',msg:'Diarised — 1 Sep transfer, amount locked, CA copy attached.',why:'advance tax 15 Sep · penalty 1%/month'},
+ {tx:'Advance tax lands mid-September, and it does not negotiate. You could ',act:'diarise it now',msg:'Diarised — 1 Sep transfer, amount locked, CA copy attached.',why:'advance tax 15 Sep · penalty 1% a month'},
  {tx:'Six of your funds are the same portfolio wearing different names. You could ',act:'fold them into one',msg:'Overlap map sent to Swapnil — consolidation plan in review.'},
  {tx:'Your dining and travel spend earns almost nothing back. You could ',act:'route it smarter',msg:'Card-swap comparison ready — same spend, about ₹40,000 a year returns.',why:'dining + travel spend pattern'},
  {tx:'Your RSUs vest on the 15th — $8,200 lands in dollars. You could ',act:'keep it in dollars',msg:'Vest plan drafted — dollars stay dollars until you decide. Swapnil confirms.',why:'RSUs · TechCorp · studied abroad · Kiara 2034'},
@@ -2717,8 +2717,8 @@
  {n:'Bluechip Fund',cat:'mf',oc:'grow',ret:12.9,ytm:null,cagr:12.9,tk:500,s:'In line with category · overlap group A — check before adding',a:['Invest','data-ord','mf']},
  {n:'ELSS Tax Saver',cat:'mf',oc:'tax',ret:13.0,ytm:null,cagr:13.0,tk:500,s:'80C · 3-year lock · 13.0% a year',a:['Invest','data-ord','mf']},
  {n:'Liquid Fund — sweep',cat:'mf',oc:'park',ret:6.8,ytm:null,cagr:6.8,tk:500,s:'~6.8% · withdraw any day · trail 0.10% a year',a:['Sweep','data-ord','cash']},
- {n:'AAA PSU Bond 2029',cat:'bond',oc:'income',ret:7.4,ytm:7.4,cagr:null,tk:1000000,s:'7.4% YTM kept · T+1 to demat · fee 0.4% in price',a:['See bond','data-nav','bond']},
- {n:'State guaranteed 2028',cat:'bond',oc:'income',ret:7.9,ytm:7.9,cagr:null,tk:1000000,s:'7.9% YTM · min ₹10,00,000 · fee 0.5% in price',a:['See bond','data-nav','bond']},
+ {n:'AAA PSU Bond 2029',cat:'bond',oc:'income',ret:7.4,ytm:7.4,cagr:null,tk:1000000,s:'7.4% YTM kept · demat credit next day · fee 0.4% in price',a:['See bond','data-nav','bond']},
+ {n:'State development loan 2028',cat:'bond',oc:'income',ret:7.9,ytm:7.9,cagr:null,tk:1000000,s:'7.9% YTM · min ₹10,00,000 · fee 0.5% in price',a:['See bond','data-nav','bond']},
  {n:'Multi-asset PMS · Quant tilt',cat:'pms',oc:'grow',ret:18.2,ytm:null,cagr:18.2,tk:5000000,s:'18.2% a year over 3 years · min ₹50,00,000 · fit-checked by Swapnil',a:['Fit check','data-nav','pms']},
  {n:'Focused equity PMS',cat:'pms',oc:'grow',ret:21.4,ytm:null,cagr:21.4,tk:5000000,s:'21.4% 3y · higher drawdowns — mind your concentration',a:['Fit check','data-nav','pms']},
  {n:'Cat-II credit AIF',cat:'aif',oc:'income',ret:13.5,ytm:null,cagr:13.5,tk:10000000,s:'13.5% target · min ₹1 Cr · illiquid 4y — via RM',a:['Via RM','data-nav','aif']},
@@ -2863,33 +2863,33 @@
     c.style.display=ok?'':'none';});
 }
 var MMETA={
- ppf:{t:'Add PPF',rq:'084',v:'\u20b94.2 L',typed:true,rate:7.1,rateNote:'govt-set',horizon:55,horizonNote:'to maturity, Mar 2031',
+ ppf:{t:'Add PPF',rq:'084',v:'\u20b94,20,000',typed:true,rate:7.1,rateNote:'govt-set',horizon:55,horizonNote:'to maturity, Mar 2031',
    fx:[{k:'inst',l:'Bank or post office',type:'text',v:'HDFC Bank'},
        {k:'bal',l:'Current balance',type:'money',v:420000,role:'current'},
        {k:'con',l:'Your contribution',type:'money',v:12500,freq:'monthly',role:'future',cap:150000,capNote:'the yearly PPF limit'},
        {k:'open',l:'Account opened',type:'text',v:'Apr 2016'}]},
- epf:{t:'Update EPF',rq:'083',v:'\u20b934 L',typed:true,rate:8.25,rateNote:'EPFO FY25',horizon:60,horizonNote:'over the next 5 years',
+ epf:{t:'Update EPF',rq:'083',v:'\u20b934,00,000',typed:true,rate:8.25,rateNote:'EPFO FY25',horizon:60,horizonNote:'over the next 5 years',
    fx:[{k:'emp',l:'Employer',type:'text',v:'TechCorp India'},
        {k:'bal',l:'Current balance',type:'money',v:3400000,role:'current'},
        {k:'con1',l:'Your contribution',type:'money',v:null,freq:'monthly',role:'future',note:'not split yet'},
        {k:'con2',l:'Employer contribution',type:'money',v:null,freq:'monthly',role:'future',note:'not split yet'},
        {k:'comb',l:'Combined today',type:'money',v:21600,freq:'monthly',role:'legacy'}]},
- nps:{t:'Add NPS',rq:'091',v:'\u20b98.6 L',typed:true,rate:9.0,rateNote:'assumed \u2014 NPS has no fixed rate',horizon:60,horizonNote:'over the next 5 years',
+ nps:{t:'Add NPS',rq:'091',v:'\u20b98,60,000',typed:true,rate:9.0,rateNote:'assumed \u2014 NPS has no fixed rate',horizon:60,horizonNote:'over the next 5 years',
    fx:[{k:'pran',l:'PRAN',type:'text',v:'1100 2233 4455'},
        {k:'tier',l:'Account',type:'text',v:'Tier I \u00b7 Auto choice, LC50'},
        {k:'bal',l:'Current value',type:'money',v:860000,role:'current'},
        {k:'con1',l:'Your contribution',type:'money',v:5000,freq:'monthly',role:'future'},
        {k:'con2',l:'Employer contribution',type:'money',v:null,freq:'monthly',role:'future',note:'add if your employer runs corporate NPS'}]},
- rsu:{t:'Update RSUs \u00b7 US ETF',rq:'081',v:'\u20b917.9 L',f:[['COMPANY','TechCorp \u00b7 NASDAQ'],['BROKER','Schwab'],['UNITS VESTED','140'],['VALUE TODAY','$12,400'],['NEXT VEST','15 Aug \u00b7 120 units']]},
- usetf:{t:'Add US ETF',rq:'082',v:'\u20b97.5 L',f:[['BROKER','Vested'],['ETF','VOO \u00b7 S&P 500'],['UNITS','18'],['VALUE TODAY','$9,000']]},
- bond:{t:'Add bond',rq:'085',v:'\u20b95 L',f:[['ISSUER','NHAI'],['ISIN','INE906B07EJ8'],['AMOUNT','\u20b95,00,000'],['COUPON','7.35% \u00b7 annual'],['MATURITY','Jan 2029']]},
- broker:{t:'Add broker cash',rq:'086',v:'\u20b91.64 L',typed:true,noProj:true,cash:true,
+ rsu:{t:'Update RSUs \u00b7 US ETF',rq:'081',v:'\u20b917,90,000',f:[['COMPANY','TechCorp \u00b7 NASDAQ'],['BROKER','Schwab'],['UNITS VESTED','140'],['VALUE TODAY','$12,400'],['NEXT VEST','15 Aug \u00b7 120 units']]},
+ usetf:{t:'Add US ETF',rq:'082',v:'\u20b97,50,000',f:[['BROKER','Vested'],['ETF','VOO \u00b7 S&P 500'],['UNITS','18'],['VALUE TODAY','$9,000']]},
+ bond:{t:'Add bond',rq:'085',v:'\u20b95,00,000',f:[['ISSUER','NHAI'],['ISIN','INE906B07EJ8'],['AMOUNT','\u20b95,00,000'],['COUPON','7.35% \u00b7 annual'],['MATURITY','Jan 2029']]},
+ broker:{t:'Add broker cash',rq:'086',v:'\u20b91,64,000',typed:true,noProj:true,cash:true,
    fx:[{k:'brk',l:'Broker',type:'text',v:'Zerodha'},
        {k:'amt',l:'Free cash',type:'money',v:164000,role:'current'}]},
- pmsv:{t:'Update PMS valuation',rq:'087',v:'\u20b962 L',f:[['PROVIDER','Emerald Multi-Asset'],['STATEMENT DATE','30 Jun 2026'],['LATEST VALUE','\u20b962,00,000']]},
- ulv:{t:'Update unlisted valuation',rq:'088',v:'\u20b97.8 L',f:[['COMPANY','NSE'],['SHARES','400'],['PRICE / SHARE','\u20b91,950 \u00b7 last band'],['VALUE','\u20b97,80,000']]},
- aifm:{t:'Add AIF',rq:'089',v:'\u20b942.6 L',f:[['FUND','Cat-II Credit AIF'],['COMMITMENT','\u20b91,00,00,000'],['DRAWN','\u20b940,00,000'],['LATEST VALUE','\u20b942,60,000']]},
- oloan:{t:'Add a loan',rq:'090',v:'\u20b93.4 L',f:[['LENDER','Bajaj Finserv'],['TYPE','Personal loan'],['OUTSTANDING','\u20b93,40,000'],['EMI','\u20b915,600 \u00b7 monthly'],['RATE','13.2%']]}};
+ pmsv:{t:'Update PMS valuation',rq:'087',v:'\u20b962,00,000',f:[['PROVIDER','Emerald Multi-Asset'],['STATEMENT DATE','30 Jun 2026'],['LATEST VALUE','\u20b962,00,000']]},
+ ulv:{t:'Update unlisted valuation',rq:'088',v:'\u20b97,80,000',f:[['COMPANY','NSE'],['SHARES','400'],['PRICE / SHARE','\u20b91,950 \u00b7 last band'],['VALUE','\u20b97,80,000']]},
+ aifm:{t:'Add AIF',rq:'089',v:'\u20b942,60,000',f:[['FUND','Cat-II Credit AIF'],['COMMITMENT','\u20b91,00,00,000'],['DRAWN','\u20b940,00,000'],['LATEST VALUE','\u20b942,60,000']]},
+ oloan:{t:'Add a loan',rq:'090',v:'\u20b93,40,000',f:[['LENDER','Bajaj Finserv'],['TYPE','Personal loan'],['OUTSTANDING','\u20b93,40,000'],['EMI','\u20b915,600 \u00b7 monthly'],['RATE','13.2%']]}};
 var MRATE={cc:{t:'Correct rate \u2014 credit card',cur:'~42% APR',f:[['CARD','HDFC Regalia'],['CORRECT APR','39.0%'],['SOURCE','Latest statement']]},
  car:{t:'Correct rate \u2014 car loan',cur:'~9.5%',f:[['LENDER','ICICI'],['CORRECT RATE','9.25%'],['SOURCE','Loan statement']]},
  home:{t:'Correct rate \u2014 home loan',cur:'~8.9%',f:[['LENDER','SBI MaxGain'],['CORRECT RATE','8.60%'],['SOURCE','Sanction letter']]}};
@@ -3027,7 +3027,7 @@
 var II=0;
 var ICAT={
  asset:{t:'Assets',s:'7 insights · 3 need action · acting recovers ≈₹3,90,000 a year',rows:[
-  {t:'SIPs ₹1,12,000/month — never missed in 3 years',tone:'pos'},
+  {t:'SIPs ₹1,12,000 a month — never missed in 3 years',tone:'pos'},
   {t:'EPF ₹34,00,000 compounding untouched',tone:'pos'},
   {t:'Flexi Cap ahead of category 5 years running',tone:'pos'},
   {t:'₹28,40,000 idle, earning ~3% — −₹1,79,000 a year',s:'63 days in the broker ledger at zero. ₹24,00,000 safely deployable today.',tone:'red',a:['Sweep','data-nav','cash']},
@@ -3041,7 +3041,7 @@
  cash:{t:'Cashflow',s:'4 insights · +₹1,90,000 free this month',rows:[
   {t:'+₹1,90,000 free this month',tone:'pos'},
   {t:'Spends 9% lighter than your 6-month average',tone:'pos'},
-  {t:'₹40,000/month SIP headroom sits unused',s:'Fits without strain — goal-mapped, not spare change.',tone:'amb',a:['Start SIP','data-ord','mf']},
+  {t:'₹40,000 a month of SIP headroom sits unused',s:'Fits without strain — goal-mapped, not spare change.',tone:'amb',a:['Start SIP','data-ord','mf']},
   {t:'Advance tax ₹3,40,000 due 15 Sep',s:'Miss it and interest starts. The report is CA-ready.',tone:'amb',a:['Tax report','data-nav','reports']}]},
  credit:{t:'Credit',s:'4 insights · clearing the card → score ~770',rows:[
   {t:'Score 748 — top lender bracket',tone:'pos'},
@@ -3124,7 +3124,7 @@
     document.getElementById('camt').textContent=document.getElementById('oamt').textContent;
     document.getElementById('croute').textContent=ORD.type==='bond'?'You → Exchange → your demat':(ORD.type==='cash'?'You → UPI → AMC · liquid':'You → NPCI → AMC');
     document.getElementById('cfee').textContent=document.getElementById('ofee').textContent.split(' — ')[0];
-    document.getElementById('cexit').textContent=ORD.type==='bond'?'Sell on exchange anytime':(ORD.type==='cash'?'Withdraw any day · bank in T+1':'Any day · 1% load inside 1 year');
+    document.getElementById('cexit').textContent=ORD.type==='bond'?'Sell on exchange anytime':(ORD.type==='cash'?'Withdraw any day · bank next working day':'Any day · 1% load inside 1 year');
 }
 document.addEventListener('click',function(e){ if(e.target.classList&&(e.target.classList.contains('modal')||e.target.classList.contains('dlgwrap'))&&e.target.classList.contains('on')){e.target.classList.remove('on');return;} 
   var SEL='.fld,.tap,.lnk,.seg span,[data-q],[data-go],[data-nav],[data-om],[data-oa],[data-ra],[data-sw],[data-x],[data-vt],[data-vm],[data-tt],[data-h],[data-e],[data-lb],[data-ord],[data-cs],[data-bd],[data-bt],[data-rf],[data-dk],[data-ic],[data-nd],[data-oc],[data-fo],[data-fc],[data-fr],[data-ft],[data-fs],[data-freq],[data-dlp],[data-dlm],[data-rep],[data-deck],[data-ins],[data-dtl],[data-cfd],[data-xc],[data-mu],[data-mr],[data-mc],[data-wl]';
@@ -3236,7 +3236,7 @@
   if(t.id==='hswitch'){document.getElementById('swsub').textContent='Out of '+HOLD[curH].n.replace('&amp;','&')+' · '+HOLD[curH].cur+' held';document.getElementById('swsheet').classList.add('on');return;}
   if(t.id==='hredeem'){document.getElementById('rsub').textContent=HOLD[curH].n.replace('&amp;','&')+' · '+HOLD[curH].cur+' available';document.getElementById('rsheet').classList.add('on');return;}
   if(t.id==='rclose'){document.getElementById('rsheet').classList.remove('on');return;}
-  if(t.id==='rgo'){document.getElementById('rsheet').classList.remove('on');toast('Redemption placed — money in your bank in T+2. Nothing held back.');return;}
+  if(t.id==='rgo'){document.getElementById('rsheet').classList.remove('on');toast('Redemption placed — money in your bank within 2 working days. Nothing held back.');return;}
   if(t.id==='swclose'){document.getElementById('swsheet').classList.remove('on');return;}
   if(t.id==='swgo'){document.getElementById('swsheet').classList.remove('on');toast('Switch placed — Swapnil reviews it today, on record.');return;}
   var ra=t.getAttribute('data-ra')||t.getAttribute('data-sw');
@@ -3278,7 +3278,7 @@
   if(t.id==='pgok'){
     document.getElementById('pgbtns').style.display='none';document.getElementById('pgwait').style.display='flex';
     setTimeout(function(){
-      document.getElementById('sdet').textContent=ORD.type==='ins'?'Policy issued digitally · ₹2 Cr cover · '+ORD.amt+' a month · tele-medical call within 48h':ORD.type==='cash'?document.getElementById('oamt').textContent+' swept to liquid — earning ~6.8% from tomorrow · withdraw any day':ORD.type==='bond'?'100 bonds · your demat, T+1 · coupons to your bank half-yearly':(ORD.mode==='sip'?document.getElementById('oamt').textContent+' monthly into '+ORD.name+' · first debit 5 Aug · pause any month':document.getElementById('oamt').textContent+' into '+ORD.name+' · units in your name by tomorrow');
+      document.getElementById('sdet').textContent=ORD.type==='ins'?'Policy issued digitally · ₹2 Cr cover · '+ORD.amt+' a month · tele-medical call within 48h':ORD.type==='cash'?document.getElementById('oamt').textContent+' swept to liquid — earning ~6.8% from tomorrow · withdraw any day':ORD.type==='bond'?'100 bonds · in your demat next day · coupons to your bank half-yearly':(ORD.mode==='sip'?document.getElementById('oamt').textContent+' monthly into '+ORD.name+' · first debit 5 Aug · pause any month':document.getElementById('oamt').textContent+' into '+ORD.name+' · units in your name by tomorrow');
       var n=6;document.getElementById('sundot').textContent=n;
       clearInterval(window.uT);window.uT=setInterval(function(){n--;if(n<=0){clearInterval(window.uT);document.getElementById('sundo').style.opacity=.35;document.getElementById('sundo').textContent='Undo window closed';}else{document.getElementById('sundot').textContent=n;}},1000);
       document.getElementById('sundo').style.opacity=1;document.getElementById('sundo').innerHTML='Undo — <span id="sundot">6</span>s';

```
