# NETT_CHANGES_APP — FINAL CONSOLIDATED · v1.7 → v1.13
**Build:** `nett-app_v1_13_07_08_2026.html` · stamp on entry screen: *prototype build v1.13 · 07 Aug 2026*
**Hand-off date:** 07 Aug 2026 · IST

## Read this first (dev team)
1. **Verify the build before testing anything:** entry screen must read *v1.13*. Or run
   `node nett_audit_gate.js nett-app_v1_13_07_08_2026.html 1.13` → must print `ALL 14 GATES PASS`.
2. **The two test suites ship with the build:** `nett_audit_gate.js` (generic gates: build identity,
   selector reachability, sheet sweep, occlusion heuristic, voice regression) and
   `nett_app_flow_tests.js` (45 end-to-end clicks). Both must be green before any hand-back.
3. **The flow doc** `Nett_App_Flow_Doc_v1_13_07_08_2026.xlsx` carries all 65 screens with the
   extracted nav graph, 12 key flows, and the 17-sheet dialog census. Yellow rows changed this cycle.
4. **Known limits stated honestly:** jsdom cannot hit-test — screens flagged by the occlusion
   gate need one real-device tap; the family approval sheet simulates the member's device (G-17);
   the Nifty mood needs a live feed + Rule-Book threshold at beta (G-14).

## One-page version history
| Ver | Date | What |
|---|---|---|
| v1.13 | 07 Aug | Build stamp + versioned filenames · member ledger sheet (read-only, theirs) · audit packaged as skill · **G-10 root-caused: doubled `delsheet` tag fixed** |
| v1.12 | 07 Aug | Family: add journey, three-level consent on THEIR phone, minors guardian-managed, scan-link journey, live household aggregate, cross-member insight (G-16 → Yogesh) |
| v1.11 | 07 Aug | **One selector, 13 dead buttons** (exit-intent, error dialog — dead since v1.7) fixed · back/backdrop for both sheet families · jsdom gate born |
| v1.10 | 07 Aug | Eye masks every ₹/$ token app-wide · kyc6 penny-drop dead-end fixed (pre-v1.7 bug) · mood = Nifty data, not a button · swipe/chat/mic/send inline icons |
| v1.9 | 06 Aug | Dev items: inline tab icons (no CDN) · canonical error sheet · kyc9 review→signature · sheet back/backdrop v1 · relink→rescan · eye v1 |
| v1.8 | 06 Aug | Full `nett-ux-writing` audit: 368 replacements — peer→benchmark ×9, Arth first-person removed, 232 lakh→full figures, 74 rate/flow bases, 25 jargon terms |
| v1.7 | 03 Aug | Baseline (65 screens) |

## Open register at hand-off
**G-06 (BIG):** app demo persona ≠ locked Rahul Mehra — every rupee differs from CRM/web; decide before joint demos.
**G-13** duplicate signature capture on kyc7 · **G-14** Nifty feed + threshold · **G-15** four revived-since-v1.7 handlers need a product pass · **G-16** cross-member insight → Yogesh · **G-17** real out-of-band family approval · **G-18** member-side revocation surface · **G-19** occlusion = finger-verify flagged screens.
Closed this cycle: G-10 (root-caused), G-01 in-app (one time claim).

---

# NETT_CHANGES_APP.md — v1.13 (07 Aug 2026, IST) — build identity, member ledger, and the audit becomes a skill

## Your two reports, root-caused honestly

**1 · "Add family still not working."** The v1.13 code opens the sheet, and 45 real-DOM clicks prove it — but your description exactly matches **v1.11 behaviour** (button toasts, nothing opens). I shipped three different builds today **under the same filename**; your device very likely opened an older copy. That's my process failure, and the fix is the class, not the argument: **versioned filenames from now on** (`nett-app_v1_13_07_08_2026.html`) and a **visible build stamp** on the entry screen ("prototype build v1.13 · 07 Aug 2026") that the audit cross-checks against `NETT_VER` — anyone can verify what they're holding in two seconds. If v1.13 still fails under your finger with the stamp confirmed, the next suspect is visual occlusion, which the new gate flags for finger-verification.

**2 · "How do I know it's not my details?"** Fair — tapping Anita only toasted. Now it opens her **member ledger sheet**, unmistakably hers: water-blue chrome (shared data lives below the line, per the consent-gate canon), header "SHARED WITH YOU · READ-ONLY", "**Anita's ledger.** Not yours — shared. Anita chose what you see here, and one tap on her side changes it," her rows and net in water-blue, and the line "No buy, sell or move buttons here — acting on this money is theirs alone." Only exit + "Ask Swapnil about the household." The post-scan new member card opens the same sheet with their data.

## The audit is now a skill — and it caught two more pre-existing defects on its first run

`nett-interaction-audit` (packaged, installable) — the mandatory pre-delivery gate:
build identity (NETT_VER = on-screen stamp = expected) · selector reachability · full sheet
sweep (Back + backdrop + **duplicate-id check**) · occlusion heuristic (CSS-scoped, flags
fixed/sticky over flush CTAs for finger-verification — the one thing jsdom cannot see, stated
honestly) · voice regression incl. JS string literals. Plus `flows.js`, the 45-test end-to-end
suite. Law: every new feature ships its flow test in the same release.

**First-run catches:**
- **G-10 solved, root found.** The two `delsheet`s were **33 characters apart — a literally
  doubled opening tag.** One removal fixed the duplicate id AND the +1 div imbalance we had
  written off as a JS-string artifact. Two long-standing defects, one root, zero behaviour change
  (`getElementById` only ever reached the first).
- `₹58,000/yr` — another slash created by my own v1.10 k-conversion. Fixed; the gate now owns
  this pattern permanently.

## Gate runs — both suites
```
nett_audit_gate.js nett-app.html 1.13  →  ALL 14 GATES PASS
flow suite                              →  ALL 45 INTERACTION TESTS PASS
(new: ledger opens for Anita · labeled READ-ONLY + her name · her rows + net ·
 no act-verbs on her money · closes via button/Back · build stamp matches)
```

## For the register
- **G-10 CLOSED** (root-caused, fixed, gate-enforced). **G-19:** occlusion verification of
  flagged screens is a real-device step — jsdom cannot hit-test; the gate says so rather than
  pretending.

---

# NETT_CHANGES_APP.md — v1.12 (07 Aug 2026, IST) — the family release

**Scope confirmed before build:** Q1(b) three-level consent · Q2(a) minors guardian-managed · Q3(A) cross-member insights under full share · Q4 aggregate visible to every sharing member · Q5 Papa stays as the pending demo case.

## What shipped — 13 patch groups + 3 tie-out fixes

**The add journey.** "Add a family member" now opens a real sheet: name · their mobile (10-digit, canon error copy on failure) · relationship as a segmented control (Spouse / Parent / Child / Sibling, per spec-contract affordance rules). Selecting **Child** flips the flow to guardian-managed — no OTP, nothing for a minor to approve, CTA becomes `Add as guardian-managed`.

**Their approval, not yours.** The OTP sheet is framed as *their* phone: "‹Name› decides what you see," the **three-level choice** (Full ledger / Net worth only / Join without sharing — each with a one-line consequence), 6 canon OTP boxes, CTA `Approve — their tap, not yours`. Every level lands as a distinct member-row state.

**Member states, all visible on one screen:** you (full) · Anita (sharing) · **Kiara, 6 — guardian-managed**, ₹1,85,000 held in her name for the 2034 goal · Papa (invited, resend) · the new member: joined-not-scanned → `Send the scan link` → "Reading their accounts — you'll see it when they do" → holdings appear (MF ₹6,40,000 · FDs ₹4,20,000).

**The household in one line (Q4 — everyone sharing sees it):** Owned ₹4.22 Cr − Owed ₹96,00,000 = **₹3.26 Cr**, family cashflow +₹2,25,000 a month free, per-member breakdown. After the new member's scan, every figure recomputes live: ₹4.33 Cr / ₹3.37 Cr / +₹2,47,000 — header included.

**Cross-member insight (Q3=A):** "Your card leaks ₹1,840 a month at 42% a year. ₹2,60,000 sits in Anita's savings at 3%. Inside one household, that is one transfer." → `Bring Swapnil in`. Carries its own consent line: visible only under mutual full-ledger, either side can turn it off.

## Self-caught, disclosed
- My first draft of the cross-insight said "that gap is ₹1,540 a month" — a number tying to nothing. Caught by the tie-out gate; the line now uses the canon ₹1,840 leak.
- The header still said ₹3.24 Cr (pre-Kiara). Corrected to ₹3.26 Cr with a live id.
- Three `/mo` tokens found: **two were created by my own v1.10 k-conversion** (₹15.9k/mo → ₹15,900/mo, slash left behind) and one was a JS template concatenating `'/mo'` after a dynamic amount. All three fixed; lesson encoded — the numerals check now runs on JS string literals too.
- Numerals stragglers with no ₹ symbol found in the Wealth segmented control ("96 L", "3.72 Cr") — fixed.

## Gate run
```
ALL 38 INTERACTION TESTS PASS (jsdom) — includes 16 new family tests:
add sheet open/close (back + backdrop) · bad-mobile canon error · OTP sheet with
name + 6 boxes · three-level pick · approve → row · scan link → reading → holdings ·
aggregate + header + cashflow recompute · minor path (notice, CTA swap, no-OTP add)
Static: screens 65/65 · nav clean · VER 1.12 · skill fully clean incl. JS strings ·
rupee tie-outs: 3.72−0.96=2.76 · family 3.26 pre / 3.37 post · consent copy present
```

## Open register — additions
- **G-16 · Cross-member insight → Yogesh.** Authorised by founder (Q3=A) under mutual full-ledger;
  it still surfaces one member's balances inside another member's insight. Consent framing ships on
  the card itself, but the pattern needs the compliance eye before beta.
- **G-17 · Approval is simulated.** The OTP sheet stands in for the member's own device. Production:
  real SMS/WhatsApp to their number, approval in *their* app or web session, channel + timestamp
  stored per RULE_BOOK §5. The prototype framing ("their tap, not yours") is the spec.
- **G-18 · Revocation surface.** Levels are chosen at approval; the member's own Data & privacy
  screen needs the matching "what I share with family" toggle — not yet designed.

---

# NETT_CHANGES_APP.md — v1.11 (07 Aug 2026, IST) — the interaction audit release

**Trigger:** repeat report — FOMO sheet back/"Leave anyway" dead, eye not masking. Both were real, and the root cause was structural, not cosmetic.

## The root cause — one selector, thirteen dead buttons
The app has three click listeners. Listener 1 gates on
`closest('[data-st],#werrretry,#atn,#ats,#atourgo')` — **any id its body handles but its selector doesn't list can never fire.** The v1.9/v1.10 eye and error-sheet branches were anchored into this listener (my placement error, disclosed), joining **eight handler ids that were already dead in v1.7**: `xstay`, `xleave` (the exit-intent sheet — your report), `edclose`, `edretry` (the error dialog), `h0go`, `pdob`, `ppanx`, `scdob`. The buttons existed, the handlers existed, and the wire between them didn't.

Second miss: `exitint`/`errdlg` are `class="dlgwrap"`, not `class="modal"` — the v1.9 back/backdrop fixes covered only the modal family.

## Fixes (4 groups)
- **F1** listener-1 selector now lists every id its body handles (13 revived).
- **F2** Back closes `.modal.on, .dlgwrap.on` — both sheet families.
- **F3** Backdrop tap closes both families.
- **F4** `₹40k/mo` and six more `₹Nk` tokens → full figures (₹15,900 · ₹17,100 · ₹23,800 · ₹25,000 · ₹40,000 · ₹58,000); the k-suffix pattern joins the permanent numerals check — it had dodged both the lakh and slash regexes in v1.8.

## The new gate — real-DOM interaction tests (jsdom), now permanent
Static checks and stubbed smoke tests verified the code parses and elements exist — they cannot catch a selector that filters a click out. From this release the suite **loads the real page and dispatches real clicks**:

```
PASS eye: body.masked ON                    PASS exit: "Finish the order" stays
PASS eye: 181 money tokens wrapped app-wide PASS kyc6: penny-drop advances to kyc7
PASS eye: icon swaps, toggles back          PASS all 15 sheets close via Back
PASS exit: first back opens the sheet       PASS all 15 sheets close via backdrop
PASS exit: "Leave anyway" closes+navigates  PASS errsheet + errdlg close (errdlg dead since v1.7)
PASS exit: back closes the sheet itself     PASS mood: -1.4% volatile / +0.4% calm, no chips
PASS exit: backdrop closes                  PASS selector reachability: 0 dead handler ids
PASS kyc9 signature present
RESULT: ALL 22 INTERACTION TESTS PASS
```

Plus static: screens 65/65 · nav 38 · div-delta vs base · VER 1.11 · skill regression green.

## Disclosure
The v1.9 eye/error wiring was anchored on `werrretry`, which lives in the narrow-selector listener — my anchors were string-correct and behaviourally wrong, and two rounds of stubbed tests couldn't see it. That test-method gap, not the individual bugs, was the real defect; it is now closed permanently by the jsdom gate and the selector-reachability check.

## Open register
- **G-15 · Revived-but-unaudited handlers.** `h0go, pdob, ppanx, scdob` were dead since v1.7 and now fire. Their behaviours ran in the sweep without errors, but their *intended* flows (DOB picker, PAN mask, scan DOB) should get a product pass — they've never actually run for a user.

---

# NETT_CHANGES_APP.md — v1.10 (07 Aug 2026, IST) — dev feedback round 2

**5 items · 12 patch groups · 13 replacements.** Ships on top of the v1.8+v1.9 combined build below.

### E1 · Eye now hides every amount
Diagnosis: the v1.9 toggle worked but masked only 4 tagged headline figures — from the user's seat, "not working." Now the first toggle walks every `<section>` with a TreeWalker, wraps every ₹/$ money token (incl. Cr) in `.amt`, and `body.masked` blurs all of them across all 65 screens. One-time wrap, session-scoped, icon swap carries an xlink fallback. Toast says what it did: "Amounts hidden, everywhere."

### E2 · Bank verification dead end — **pre-existing v1.7 defect, root-caused**
The penny-drop success button set `data-nav="kyc7"`, but its own handler `return`ed before the generic nav code could run — "Verified — continue" did nothing, and the entire KYC tail (documents → nominee → signature → done) was unreachable by tapping. Verified present in v1.7 base. Fix: the branch now navigates (`stack.push(cur); go('kyc7')`).

### E3 · Mood is market-driven, not a button
The calm/volatile chips were tappable toggles — removed. One status pill (`NIFTY +0.4% · CALM`) that is **not** a control; `setMood(pct)` drives headline, sub, pill and the stormy backdrop from the Nifty day move; **≤ −1% flips to volatile**. Demo: `?nifty=-1.4` or `setNifty(-1.4)` in console; default +0.4 calm. Volatile copy passes the skill — number + basis + action pointer, zero fear: *"Nifty fell 1.4% today. Your plan already knew. Nothing needs selling. Your SIPs buy this dip on schedule, and the one thing worth doing today is below."* Beta wiring note: needs a live NSE index feed (MKT source), stale-feed fallback = calm + last-good timestamp per error canon.

### E4 · Swipe icon on the Flow surface
New `#i-swipe` symbol (hand + horizontal arrows) inline before "Flow · the one surface you can touch."

### E5 · Chat + voice icons inline
`#i-chat / #i-mic / #i-send` symbols; all `ti-message`, `ti-microphone` (×2), `ti-send` occurrences swapped — the chat surface now renders with zero font dependency, same as the tab bar.

## Gate run — full output
```
PASS screens 65/65 · PASS nav 38 · PASS div-delta vs base · PASS sections 65/65 · PASS VER 1.10
PASS E1 tree-walker + xlink · PASS E2 kpd advances · PASS E3 chips gone, pill+API in
PASS E3 volatile copy number+basis · PASS E4 swipe placed · PASS E5 chat icons inline
PASS skill: no banned verbs / drowning / urgency / lakh / slash-flows / exclamation in new strings
PASS runtime: parse + stubbed-DOM execution (TreeWalker, URLSearchParams stubbed)
RESULT: ALL GATES PASS
```

## Open register — additions
- **G-13 · Duplicate signature capture.** `s-kyc7` (documents) still carries its old `ksign`
  "signature" upload row from v1.7, now that `s-kyc9` is a dedicated signature screen. One of the
  two should go — likely the kyc7 row — but which is a flow decision, not a patch. **Founder call.**
- **G-14 · Nifty feed dependency.** Mood needs a live index value at beta (MKT source, taxonomy);
  threshold −1% is a placeholder pending Rule Book owner sign-off, same class as the other
  threshold placeholders.

---

# NETT_CHANGES_APP.md — change map, `nett-app.html` v1.7 → v1.9

**Release:** 06 Aug 2026 · IST · one combined build, two version steps
**v1.8** (content: full `nett-ux-writing` validation, 368 replacements — see prior section, unsubmitted until now) and **v1.9** (dev feedback: 7 design items, 22 patch groups, 62 replacements) **ship together as this single build.**

---

## v1.9 — dev feedback items, all seven

### D1 · Bottom-menu icons missing → inline SVG, zero network
Root cause: the tab bar's five icons rode the Tabler CDN webfont — offline or CSP-restricted dev builds render nothing. Fix: seven `<symbol>` defs embedded once (`#i-home/-health/-wealth/-explore/-rm/-eye/-eyeoff`); all **9 nav blocks × 5 tabs** swapped to `<svg class="tico"><use>`. Tabler stays canon for in-content icons (53 names in use). **Permanent check:** no `ti ti-` class inside any `.nav` block.

### D2 · Error sheet — component did not exist → built + canonized
New `#errsheet` with the fixed anatomy: what failed · when · last-good + timestamp · exactly **one Retry** · trace ID · "Keep the last data". `showErr(title, body, ref)` API. Wired to the existing bureau refresh-failed row. Canonized into the Design System (§3b) in this same release per bundle law.

### D3+D4 · KYC review removed, signature added — one move
`s-kyc9` content replaced: REVIEW → **SIGNATURE** (canvas draw, 2.4px ink, disabled CTA until ink exists, clear/redraw, upload-as-secondary, `Sign and finish` → kyc10). **Screen id retained** — registry parity holds, count stays 65/65.

### D5 · Sheets trapped users on Back → three-way dismissal, everywhere
Confirmed root cause: global Back popped the **screen** stack and ignored open sheets; 5 of 12 sheets (`bksheet, musheet, rsheet, wifmsheet, wifssheet`) had **no close affordance at all** — a user opening one had no exit except restarting the journey. Fix: (1) Back now closes the top `.modal.on` first, and only then pops the screen; (2) backdrop tap closes any sheet; (3) both are **permanent audit checks**.

### D6 · Relink re-initiates the scan
`data-rf` reconnect previously flipped a text label only. Now: consent flag restored → "Reconnected — a fresh read starts now. About 60 seconds." → navigates to `s-scanning`, sync stamp updates behind it.

### D7 · Eye icon hides amounts
Eye toggle on Home (beside Net worth) and Wealth (beside refresh). Tagged headline figures (`.amt`) blur at 9px under `body.masked`; icon swaps eye/eye-off; session-scoped. **Scope note:** v1.9 masks the headline money on Home + Wealth. Masking *every* rupee app-wide needs value-level tagging — a Flutter build concern, spec'd in DS §3b, not retrofittable cleanly into 65 static screens.

## v1.9 patch table

| ID | × | What |
|---|---|---|
| D1-defs / D1-css / D1-i-* | 47 | symbol defs + 9×5 tab swaps + `.tico` styles |
| D2-markup / D2-js+VER / D2-wire | 3 | errsheet + showErr + refresh-failed wiring |
| D3/4-kyc9 / D4-js | 2 | signature screen + canvas driver |
| D5-back / D5-backdrop | 2 | back-closes-sheet-first + backdrop dismiss |
| D6-relink | 1 | reconnect → rescan |
| D7 (6 groups) | 6 | eyes, `.amt` tags, masked CSS, toggle JS |
| VER | 1 | 1.8 → 1.9 |

## Gate run — full output, uncropped

```
PASS screen presence 65/65        PASS registry parity vs v1.8
PASS nav reachability (38)        PASS div delta unchanged vs base
PASS sections balanced 65/65      PASS NETT_VER 1.9
PASS B1 tab bars font-free        PASS B2 errsheet anatomy (one Retry + trace + close)
PASS B3/4 kyc9=signature wired    PASS B5 back closes top sheet first
PASS B5 backdrop closes           PASS B6 relink re-initiates scan
PASS B7 eye mask both surfaces    PASS C new copy passes nett-ux-writing
PASS modal census 13              PASS runtime — parse + stubbed-DOM execution clean
RESULT: ALL GATES PASS
```

## Open register — additions

- **G-10 · Duplicate `id="delsheet"` — pre-existing, found by the new modal census.** Two modals share
  the id in v1.7 and earlier; `getElementById` reaches only the first, so the second is very likely
  dead markup. Not fixed here because which of the two is the live one is a product question. One
  needs deleting or renaming.
- **G-11 · Review screen removed — flag for Yogesh.** KYC flows commonly carry an explicit
  review-before-submit step for a regulatory reason. Removal was a direct instruction and is done;
  if compliance wants a confirmation moment, the kyc10 success screen can absorb a one-line summary.
- **G-12 · Signature upload is a stub.** "Upload a photo instead" toasts in the prototype; the build
  needs camera + gallery + file-size/format validation per UX Architecture §5 (five states).

## Carried from v1.8, still open
G-06 persona split (app ≠ RULE_BOOK §4 — **the big one**) · G-07 benchmark figures' source ·
G-08 full-figure width on narrow chips · G-09 XIRR translated vs glossed · G-01 canonical time claim.

---

# v1.8 — content audit (368 replacements) — shipped in this same build
*(Unchanged from the 06 Aug morning change map: peer-comparison → benchmark ×9 · Arth first-person ×4 ·
lakh → full figures ×232 · basis on rates/flows ×74 · jargon ×25 · buttons ×2 · time claim ×2.
Full detail in the prior section of this file's history and the v1.8 release-note entry.)*



## THE single cumulative diff — v1.7 → v1.13 (every change this cycle)

```diff
--- app_base.html	2026-08-06 06:05:02.560439250 +0000
+++ nett-app.html	2026-08-07 08:32:25.251743061 +0000
@@ -66,7 +66,7 @@
 .tag{background:rgba(255,255,255,.04);border:1px solid var(--hair);color:#C6C3D2;font-size:12.5px;border-radius:999px;padding:9px 15px;white-space:nowrap}
 .nav{display:flex;border-top:1px solid var(--hair);margin:16px -24px -20px;padding:11px 8px 15px;background:rgba(255,255,255,.012)}
 .ni{flex:1;text-align:center;color:#606069;font-size:10px;letter-spacing:.4px}
-.ni i{display:block;font-size:19px;margin-bottom:3px}
+.ni i{display:block;font-size:19px;margin-bottom:3px}.ni .tico{display:block;width:20px;height:20px;margin:0 auto 3px}.tico{width:18px;height:18px;vertical-align:-3px}
 .ni.on{color:#F2F2F5}
 .bk{color:var(--mut);font-size:13px;width:fit-content;padding:2px 8px 2px 0;cursor:pointer}
 .seg{display:flex;background:rgba(255,255,255,.04);border-radius:14px;padding:3px;margin-top:14px}
@@ -141,11 +141,21 @@
 /* Gauge marker — rising is the reward */
 .gmark{animation:gsurface 1s cubic-bezier(.2,.8,.3,1) .4s both}
 @keyframes gsurface{from{transform:translateY(52px);opacity:0}to{transform:translateY(0);opacity:1}}
+body.masked .amt{filter:blur(9px);transition:filter .25s ease}
 @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-delay:0ms!important;transition-duration:.01ms!important}.spwater{height:50%}}
 </style>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
 </head>
 <!-- Nett app design v1.3 · 29 Jul 2026 · see Nett_Release_Notes.html + Nett_Dev_Flow_Doc.xlsx (same version) -->
+<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
+<symbol id="i-home" viewBox="0 0 24 24"><path d="M5 12l-2 0 9-9 9 9-2 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
+<symbol id="i-health" viewBox="0 0 24 24"><path d="M3 12h4l3 8 4-16 3 8h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
+<symbol id="i-wealth" viewBox="0 0 24 24"><path d="M12 3v18M7 6h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
+<symbol id="i-explore" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15 9l-2 6-4 0 2-6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
+<symbol id="i-rm" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 21v-1a7 7 0 0 1 14 0v1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
+<symbol id="i-eye" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
+<symbol id="i-swipe" viewBox="0 0 24 24"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-1.5a1.5 1.5 0 0 1 3 0V12m0-.5a1.5 1.5 0 0 1 3 0V13c0 4-2 7-6 7-3 0-4.5-1.5-6.5-5L3.6 12a1.4 1.4 0 0 1 2.2-1.2L8 13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 3l2 2-2 2M6 3L4 5l2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol><symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol><symbol id="i-mic" viewBox="0 0 24 24"><rect x="9.2" y="3" width="5.6" height="11" rx="2.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol><symbol id="i-send" viewBox="0 0 24 24"><path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol><symbol id="i-eyeoff" viewBox="0 0 24 24"><path d="M3 3l18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10.6 5.3A10.8 10.8 0 0 1 12 5.2c6.5 0 10 6.8 10 6.8a17 17 0 0 1-3.2 3.9M6.6 6.6A16.6 16.6 0 0 0 2 12s3.5 6.8 10 6.8a9.9 9.9 0 0 0 4.3-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
+</defs></svg>
 <body>
 <div class="ph">
 <div class="wipe" id="wipe"></div>
@@ -154,8 +164,8 @@
   <div class="sheet">
     <div style="width:38px;height:4px;border-radius:2px;background:rgba(255,255,255,.18);margin:0 auto 14px;"></div>
     <p class="lb" style="color:var(--gold);">BEFORE YOU GO — ONE NUMBER</p>
-    <h2 class="ser" style="margin-top:8px;">A year’s delay on this SIP<br>costs ≈ ₹4.1L at the finish.</h2>
-    <p class="sm" style="margin-top:9px;">₹25,000/mo · 12% · 15 yrs: starting today vs next July is ₹4.1L of end value. Routed through the surplus plan, the same money also trims the home-loan runway by ≈ 14 months. It stays saved either way — your call.</p>
+    <h2 class="ser" style="margin-top:8px;">A year’s delay on this SIP<br>costs ≈ ₹4,10,000 at the finish.</h2>
+    <p class="sm" style="margin-top:9px;">₹25,000 a month · 12% · 15 years: starting today vs next July is ₹4,10,000 of end value. Routed through the surplus plan, the same money also shortens the home loan by ≈ 14 months. It stays saved either way — your call.</p>
     <div style="display:flex;gap:10px;margin-top:16px;"><span class="cta tap" id="xstay" style="flex:1;text-align:center;">Finish the order</span><span class="cta2 tap" id="xleave" style="flex:1;text-align:center;">Leave anyway</span></div>
   </div>
 </div>
@@ -185,7 +195,7 @@
     <div class="wmark au" style="font-size:58px;"><span class="wtop">Nett</span><span class="wsub" aria-hidden="true">Nett</span></div>
     <p class="au" style="margin-top:26px;font-size:16px;color:var(--pos);letter-spacing:-.2px;">Grow what you own.</p>
     <p class="au" style="margin-top:4px;font-size:16px;color:var(--neg);letter-spacing:-.2px;">Clear what you owe.</p>
-    <p class="sm dm au" style="margin-top:20px;">Find your line in ninety seconds.</p>
+    <p class="sm dm au" style="margin-top:20px;">Find your line in sixty seconds.</p>
   </div>
   <p class="sm dm" style="text-align:center;position:relative;z-index:2;">RIA-grade rails · AES-256 · every fee shown</p>
 </section>
@@ -243,7 +253,7 @@
     <i style="width:8px;height:8px;border-radius:50%;background:#3A3D46;" id="d1"></i>
     <i style="width:8px;height:8px;border-radius:50%;background:#3A3D46;" id="d2"></i>
   </div>
-  <div class="cta tap" id="inext">Next</div>
+  <div class="cta tap" id="inext">See how it works</div>
 </section>
 
 <!-- OTP (A3) -->
@@ -254,7 +264,7 @@
   <div class="otp" style="margin-top:18px;"><b>7</b><b>3</b><b>0</b><b>4</b><b>9</b><b>2</b></div>
   <p class="sm" style="margin-top:12px;" id="otpt">Auto-reading… resend opens in 24s</p>
   <div class="sc" style="margin-top:14px;">
-    <span class="tag tap" id="otpsms"><i class="ti ti-message" style="font-size:13px;"></i> Resend SMS</span>
+    <span class="tag tap" id="otpsms"><svg class="tico" style="width:13px;height:13px;"><use href="#i-chat"/></svg> Resend SMS</span>
     <span class="tag tap" id="otpcall"><i class="ti ti-phone" style="font-size:13px;"></i> Get on call</span>
     <span class="tag tap" id="otpwa"><i class="ti ti-brand-whatsapp" style="font-size:13px;"></i> WhatsApp</span>
   </div>
@@ -277,7 +287,7 @@
   <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
     <div class="au" style="display:flex;align-items:baseline;gap:10px;"><div class="wmark" style="font-size:26px;"><span class="wtop">Nett</span><span class="wsub" aria-hidden="true">Nett</span></div><p class="lb" style="color:var(--gold);">WEALTH, BOTH SIDES</p></div>
     <h1 class="ser au" style="margin-top:14px;">Your wealth,<br>examined.</h1>
-    <p class="mut au" style="margin-top:14px;max-width:290px;">A private scan of everything you own and owe — investments, cash, loans, cover — with what's working, what's leaking, and what's missing. In about ninety seconds.</p>
+    <p class="mut au" style="margin-top:14px;max-width:290px;">A private scan of everything you own and owe — investments, cash, loans, cover — with what's working, what's leaking, and what's missing. In about sixty seconds.</p>
     <div class="hr au"></div>
     <div class="rw au" style="border:none;padding:5px 0;"><span class="mut" style="font-size:12.5px;">Both sides of your balance sheet</span><span class="sm" style="color:var(--sage);">assets and liabilities</span></div>
     <div class="rw au" style="border:none;padding:5px 0;"><span class="mut" style="font-size:12.5px;">Read-only, regulated data rails</span><span class="sm">AA · MF Central · bureau</span></div>
@@ -287,6 +297,8 @@
     <p class="sm dm au" style="text-align:center;margin-top:10px;">Support · support@nett.in · 1800 419 0000 · 9am–9pm IST</p>
     <p class="sm au" style="text-align:center;margin-top:6px;">The scan is complimentary. We earn distribution fees only when you invest — and we show you every fee, every time.</p>
   </div>
+
+  <p class="sm dm" id="buildstamp" style="margin-top:14px;text-align:center;opacity:.55;">prototype build v1.13 · 07 Aug 2026</p>
 </section>
 
 <!-- SCAN FORM -->
@@ -300,7 +312,7 @@
   <div class="cd" style="margin-top:14px;">
     <p class="sm" style="line-height:1.6;">With your consent, we fetch — <b style="color:var(--tx);">read-only</b> — your bank balances and flows (Account Aggregator), mutual fund folios (MF Central), and loans &amp; score (credit bureau). Revocable anytime. Never sold, never shared.</p>
   </div>
-  <div class="cta tap" data-nav="otp" style="margin-top:16px;">Next</div>
+  <div class="cta tap" data-nav="otp" style="margin-top:16px;">Send me the code</div>
 </section>
 
 <!-- SCANNING -->
@@ -333,14 +345,14 @@
     <span style="display:flex;gap:6px;"><span class="sm tap" data-nav="world" style="border:1px solid var(--hair);border-radius:999px;padding:6px 12px;">island view</span><span class="sm tap" data-nav="gloss" style="border:1px solid var(--hair);border-radius:999px;padding:6px 11px;">?</span></span>
   </div>
 
-  <div id="hpartial" class="errrow" style="display:none;border-color:rgba(224,180,92,.45);background:rgba(224,180,92,.06);color:var(--watch);margin-top:12px;flex-wrap:wrap;">Built from 2 of 3 sources · confidence 74% · MF folios ≈ ₹18.4L unpriced <span class="ndchip">NO DATA · MF CENTRAL</span> <span class="lnk tap" data-nav="scan" style="color:var(--tx);">Connect</span></div>
+  <div id="hpartial" class="errrow" style="display:none;border-color:rgba(224,180,92,.45);background:rgba(224,180,92,.06);color:var(--watch);margin-top:12px;flex-wrap:wrap;">Built from 2 of 3 sources · confidence 74% · MF folios ≈ ₹18,40,000 unpriced <span class="ndchip">NO DATA · MF CENTRAL</span> <span class="lnk tap" data-nav="scan" style="color:var(--tx);">Connect</span></div>
   <div class="cd au" style="margin-top:16px;padding:19px 20px;">
     <div style="display:flex;align-items:baseline;gap:8px;"><p class="big" style="font-size:44px;">61</p><p class="sm dm">/100 · <b style="color:var(--watch);">Fair</b></p></div>
     <div style="position:relative;height:10px;border-radius:5px;margin-top:12px;background:linear-gradient(90deg,#B06868 0%,#B06868 40%,#D9B96A 40%,#D9B96A 65%,#3E9D74 65%,#3E9D74 80%,#3ED598 80%);opacity:.85;">
       <div style="position:absolute;left:61%;top:-4px;width:3px;height:18px;background:#F2F2F5;border-radius:2px;"></div>
     </div>
     <div style="display:flex;justify-content:space-between;margin-top:6px;"><span class="sm dm">Poor</span><span class="sm dm">Fair</span><span class="sm dm">Good 65</span><span class="sm dm">Excellent 80</span></div>
-    <p class="sm" style="margin-top:10px;">Profiles like yours average <b>58</b>. You’re ahead — and <b style="color:var(--pos);">“Good” is one action away</b>: clearing the card alone takes you to 66.</p>
+    <p class="sm" style="margin-top:10px;">The average is <b>58</b>. You’re ahead — and <b style="color:var(--pos);">“Good” is one action away</b>: clearing the card alone takes you to 66.</p>
   </div>
   <div class="cd au" style="margin-top:12px;padding:17px 19px;position:relative;overflow:hidden;">
     <div style="display:flex;justify-content:space-between;align-items:baseline;"><p class="lb">Your line</p><span style="font-size:11px;color:var(--pos);border:1px solid rgba(62,213,152,.35);background:rgba(62,213,152,.08);border-radius:999px;padding:4px 11px;">₹2.76 Cr above</span></div>
@@ -353,7 +365,7 @@
       <line x1="0" y1="82" x2="300" y2="82" stroke="#D9B96A" stroke-width="1.6"/><text x="262" y="78" font-size="8" fill="#D9B96A" letter-spacing="1.4">THE LINE</text>
       <g class="gmark"><circle cx="150" cy="27" r="6" fill="#3ED598"/><circle cx="150" cy="27" r="11" fill="none" stroke="rgba(62,213,152,.35)" stroke-width="1.4"/><text x="150" y="14" font-size="9" fill="#ECECF1" text-anchor="middle">you</text></g>
     </svg>
-    <p class="sm" style="margin-top:9px;">Assets ₹3.72 Cr hold you up · liabilities ₹96 L pull down. Clearing the card revolve alone lifts the line-distance by <b style="color:var(--pos);">₹3.02L/yr</b>.</p>
+    <p class="sm" style="margin-top:9px;">Assets ₹3.72 Cr hold you up · liabilities ₹96,00,000 pull down. Clearing the card revolve alone lifts the line-distance by <b style="color:var(--pos);">₹3,02,000 a year</b>.</p>
   </div>
 
 
@@ -373,22 +385,22 @@
 
   <div class="cd au" style="margin-top:24px;background:linear-gradient(155deg,rgba(214,179,106,.10),transparent);border-color:rgba(214,179,106,.4);">
     <p class="lb" style="color:var(--gold);">Today’s one move</p>
-    <div class="rw" style="border:none;padding:6px 0 0;"><span style="font-size:14.5px;font-weight:600;">Clear the card revolve — stop ₹3.02L/yr</span><span class="cta2 tap" data-lb="cc" style="padding:8px 15px;font-size:12px;color:var(--red);border-color:rgba(224,138,138,.5);">Act</span></div>
-    <p class="sm" style="margin-top:5px;">₹7.2L at 42% — idle cash clears it today. Everything else waits its turn.</p>
+    <div class="rw" style="border:none;padding:6px 0 0;"><span style="font-size:14.5px;font-weight:600;">Clear the card revolve — stop ₹3,02,000 a year</span><span class="cta2 tap" data-lb="cc" style="padding:8px 15px;font-size:12px;color:var(--red);border-color:rgba(224,138,138,.5);">Act</span></div>
+    <p class="sm" style="margin-top:5px;">₹7,20,000 at 42% — idle cash clears it today. Everything else waits its turn.</p>
   </div>
 
   <p class="lb au" style="margin-top:26px;">Insights — by area</p>
   <div class="cd tap" data-ic="asset" style="margin-top:10px;">
     <div class="rw" style="border:none;padding:0;"><span style="font-size:14px;font-weight:600;"><i class="ti ti-chart-pie" style="color:var(--pos);"></i> Assets</span><span class="sm tap" data-ic="asset" style="border:1px solid var(--hair);border-radius:999px;padding:5px 12px;flex-shrink:0;">See all 7</span></div>
-    <p class="sm" style="margin-top:6px;">3 need action — acting recovers ≈<b style="color:var(--tx);">₹3.9L/yr</b>. What’s working stays untouched.</p>
+    <p class="sm" style="margin-top:6px;">3 need action — acting recovers ≈<b style="color:var(--tx);">₹3,90,000 a year</b>. What’s working stays untouched.</p>
   </div>
   <div class="cd tap" data-ic="liab" style="margin-top:9px;border-color:rgba(224,138,138,.4);">
     <div class="rw" style="border:none;padding:0;"><span style="font-size:14px;font-weight:600;"><i class="ti ti-scale" style="color:var(--red);"></i> Liabilities</span><span class="sm tap" data-ic="liab" style="border:1px solid var(--hair);border-radius:999px;padding:5px 12px;flex-shrink:0;">See all 3</span></div>
-    <p class="sm" style="margin-top:6px;">1 critical — the card burns <b style="color:var(--red);">₹3.02L/yr</b>, more than any fund here earns.</p>
+    <p class="sm" style="margin-top:6px;">1 critical — the card burns <b style="color:var(--red);">₹3,02,000 a year</b>, more than any fund here earns.</p>
   </div>
   <div class="cd tap" data-ic="cash" style="margin-top:9px;">
     <div class="rw" style="border:none;padding:0;"><span style="font-size:14px;font-weight:600;"><i class="ti ti-arrows-left-right" style="color:var(--pos);"></i> Cashflow</span><span class="sm tap" data-ic="cash" style="border:1px solid var(--hair);border-radius:999px;padding:5px 12px;flex-shrink:0;">See all 4</span></div>
-    <p class="sm" style="margin-top:6px;"><b style="color:var(--pos);">+₹1.9L free</b> this month · ₹40k/mo SIP headroom sits unused.</p>
+    <p class="sm" style="margin-top:6px;"><b style="color:var(--pos);">+₹1,90,000 free</b> this month · ₹40,000 a month of SIP headroom sits unused.</p>
   </div>
   <div class="cd tap" data-ic="credit" style="margin-top:9px;">
     <div class="rw" style="border:none;padding:0;"><span style="font-size:14px;font-weight:600;"><i class="ti ti-file-analytics" style="color:var(--amb);"></i> Credit</span><span class="sm tap" data-ic="credit" style="border:1px solid var(--hair);border-radius:999px;padding:5px 12px;flex-shrink:0;">See all 4</span></div>
@@ -396,16 +408,16 @@
   </div>
   <div class="cd tap" data-ic="prot" style="margin-top:9px;border-color:rgba(224,138,138,.4);">
     <div class="rw" style="border:none;padding:0;"><span style="font-size:14px;font-weight:600;"><i class="ti ti-shield" style="color:var(--red);"></i> Protection</span><span class="sm tap" data-ic="prot" style="border:1px solid var(--hair);border-radius:999px;padding:5px 12px;flex-shrink:0;">See all 2</span></div>
-    <p class="sm" style="margin-top:6px;">Cover at <b style="color:var(--red);">20%</b> of need — ₹50L term vs ₹2.5 Cr. One purchase completes the wall.</p>
+    <p class="sm" style="margin-top:6px;">Cover at <b style="color:var(--red);">20%</b> of need — ₹50,00,000 term vs ₹2.5 Cr. One purchase completes the wall.</p>
   </div>
 
   <p class="lb au" style="margin-top:26px;">Do’s &amp; Don’ts — this month</p>
   <div class="cd" style="margin-top:10px;">
     <p style="font-size:13px;font-weight:600;color:var(--pos);">Do</p>
-    <p class="sm" style="margin-top:5px;">Clear the card this week · start the ₹25k/month reserve fill · let the 15 Aug RSUs vest in dollars · download the tax report before 1 Sep.</p>
+    <p class="sm" style="margin-top:5px;">Clear the card this week · start the ₹25,000/month reserve fill · let the 15 Aug RSUs vest in dollars · download the tax report before 1 Sep.</p>
     <div class="hr" style="margin:12px 0;"></div>
     <p style="font-size:13px;font-weight:600;color:var(--red);">Don’t</p>
-    <p class="sm" style="margin-top:5px;">Don’t add to Meridian · don’t auto-renew the ₹18L FD maturing in Sep · don’t pause SIPs if markets dip · don’t pay only the card minimum — that trap costs ₹15.9k a month.</p>
+    <p class="sm" style="margin-top:5px;">Don’t add to Meridian · don’t auto-renew the ₹18,00,000 FD maturing in Sep · don’t pause SIPs if markets dip · don’t pay only the card minimum — that trap costs ₹15,900 a month.</p>
   </div>
 
   <div class="cd tap au" data-nav="home" style="margin-top:16px;border-color:rgba(189,179,246,.35);">
@@ -419,11 +431,11 @@
   </div>
 
   <div class="nav" style="margin-top:22px;">
-    <span class="ni tap" data-nav="home"><i class="ti ti-home"></i>Home</span>
-    <span class="ni on"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni tap" data-nav="wealth"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni tap" data-nav="home"><svg class="tico"><use href="#i-home"/></svg>Home</span>
+    <span class="ni on"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni tap" data-nav="wealth"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -433,7 +445,7 @@
     <div><p class="lb">Health · your island</p><h2 class="ser" style="margin-top:5px;">Score 61<span class="sm dm" style="font-weight:400;"> / 100</span></h2></div>
     <span class="sm tap" data-nav="health" style="border:1px solid var(--hair);border-radius:999px;padding:6px 12px;">report</span>
   </div>
-  <p class="sm" style="margin-top:6px;">Net ₹2.76 Cr · assets ₹3.72 Cr · liabilities ₹96 L · <b style="color:var(--red);">2 critical</b> · 4 need action</p>
+  <p class="sm" style="margin-top:6px;">Net ₹2.76 Cr · assets ₹3.72 Cr · liabilities ₹96,00,000 · <b style="color:var(--red);">2 critical</b> · 4 need action</p>
 
   <div id="islewrap" style="position:relative;margin-top:10px;border-radius:20px;overflow:hidden;border:1px solid var(--hair);height:302px;background:#0A0F18;" role="img" aria-label="Generated 3D island of your wealth. Structures are built from your data: reservoir fill, tower heights, ghost ideals, debt masses below the waterline. Drag to rotate, pinch to zoom, tap to inspect.">
     <div style="position:absolute;inset:0;pointer-events:none;z-index:2;background:radial-gradient(120% 90% at 50% 45%,transparent 55%,rgba(4,6,10,.55) 100%);"></div>
@@ -455,16 +467,16 @@
 
   <div class="au" style="margin-top:18px;background:linear-gradient(155deg,#152440 0%,#111A2C 100%);border:1px solid rgba(110,150,230,.3);border-radius:20px;padding:17px 19px;">
     <p class="lb" style="color:#8FB2EE;">Priority · one move</p>
-    <p style="font-size:15.5px;line-height:1.5;margin-top:9px;font-weight:500;">Equity runs <b>18% above</b> its ideal boundary. Shift ₹12L toward the reserve and the car debt — the island rebalances itself.</p>
+    <p style="font-size:15.5px;line-height:1.5;margin-top:9px;font-weight:500;">Equity runs <b>18% above</b> its ideal boundary. Shift ₹12,00,000 toward the reserve and the car debt — the island rebalances itself.</p>
     <span class="cta2 tap" id="prb" style="display:inline-block;margin-top:12px;border-color:rgba(62,213,152,.5);color:var(--pos);padding:10px 18px;">Watch the rebalance</span>
   </div>
 
   <div class="nav" style="margin-top:auto;">
-    <span class="ni tap" data-nav="home"><i class="ti ti-home"></i>Home</span>
-    <span class="ni on"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni tap" data-nav="wealth"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni tap" data-nav="home"><svg class="tico"><use href="#i-home"/></svg>Home</span>
+    <span class="ni on"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni tap" data-nav="wealth"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -472,35 +484,33 @@
 <section class="zs" id="s-home">
   <div class="cd" id="prepbanner" style="display:none;margin-bottom:12px;border-color:rgba(217,185,106,.4);"></div>
   <div style="display:flex;align-items:center;gap:8px;">
-    <span class="chip on tap" id="mcalm">calm</span>
-    <span class="chip tap" id="mvol">volatile</span>
-    <span class="sm dm" style="margin-left:4px;">← the material<br>responds</span><span class="tap" data-nav="privacy" style="margin-left:auto;padding:6px;"><i class="ti ti-shield-lock" style="font-size:19px;color:var(--mut);"></i></span>
+    <span class="chip on" id="niftypill" style="letter-spacing:.6px;">NIFTY +0.4% · CALM</span> <span class="sm dm" style="margin-left:4px;">the material responds<br>to the market, on its own</span><span class="tap" data-nav="privacy" style="margin-left:auto;padding:6px;"><i class="ti ti-shield-lock" style="font-size:19px;color:var(--mut);"></i></span>
   </div>
   <h1 class="ser au" id="mood" style="margin-top:26px;">Your money is<br>calm tonight.</h1>
   <p class="sm dm au" style="margin-top:8px;">today, in thirty seconds</p>
   <p class="mut au" style="margin-top:12px;" id="moodsub">Nothing needs you. SIPs cleared, spends steady, one quiet opportunity below.</p>
 
-  <p class="sm au" style="margin-top:34px;color:var(--mut);">Net worth</p>
-  <p class="big au" style="margin-top:6px;">₹2,76,42,300</p>
-  <p class="au" style="margin-top:9px;font-size:13.5px;color:var(--pos);">↑ ₹2,41,900 this month — your best June-to-July yet</p>
+  <p class="sm au" style="margin-top:34px;color:var(--mut);">Net worth <span class="tap" id="eyeA" style="margin-left:8px;color:var(--dim);"><svg class="tico"><use href="#i-eye"/></svg></span></p>
+  <p class="big au amt" style="margin-top:6px;">₹2,76,42,300</p>
+  <p class="au amt" style="margin-top:9px;font-size:13.5px;color:var(--pos);">↑ ₹2,41,900 this month — your best June-to-July yet</p>
   <div class="sc au" style="margin-top:12px;">
     <span class="tag tap" data-nav="wealth" style="font-size:11.5px;">Invested<br><b style="color:var(--tx);font-size:13px;">72%</b></span>
     <span class="tag tap" data-nav="cash" style="font-size:11.5px;">Cash<br><b style="color:var(--tx);font-size:13px;">8%</b></span>
     <span class="tag tap" data-nav="wealth" style="font-size:11.5px;">Fixed<br><b style="color:var(--tx);font-size:13px;">20%</b></span>
-    <span class="tag tap" data-nav="intl" style="font-size:11.5px;">Global<br><b style="color:var(--tx);font-size:13px;">$21.4k</b></span>
+    <span class="tag tap" data-nav="intl" style="font-size:11.5px;">Global<br><b style="color:var(--tx);font-size:13px;">$21,400</b></span>
   </div>
 
   <p class="lb au" style="margin-top:26px;">Worth your attention</p>
   <div class="sc au" style="margin-top:10px;">
     <div class="cd tap" data-nav="bond" style="min-width:246px;border-color:rgba(110,150,230,.4);background:linear-gradient(155deg,rgba(110,150,230,.08),transparent);">
       <p class="lb" style="color:#8FB2EE;">MARKET · TODAY</p>
-      <p style="font-size:14px;font-weight:600;margin-top:7px;">Repo cut 25 bps</p>
-      <p class="sm" style="margin-top:5px;">Your ₹18L FD renews ~40 bps lower in Sep. AAA bonds locked today keep <b style="color:var(--tx);">7.4%</b>.</p>
+      <p style="font-size:14px;font-weight:600;margin-top:7px;">Repo rate cut 0.25%</p>
+      <p class="sm" style="margin-top:5px;">Your ₹18,00,000 FD renews about 0.4% lower in Sep. AAA bonds locked today keep <b style="color:var(--tx);">7.4%</b>.</p>
       <span class="cta2 tap" data-nav="bond" style="display:inline-block;margin-top:9px;padding:8px 14px;font-size:12px;">Lock 7.4%</span>
     </div>
     <div class="cd tap" data-nav="reports" style="min-width:246px;border-color:rgba(217,185,106,.4);">
       <p class="lb" style="color:var(--gold);">DEADLINE</p>
-      <p style="font-size:14px;font-weight:600;margin-top:7px;">Advance tax ₹3.4L · 15 Sep</p>
+      <p style="font-size:14px;font-weight:600;margin-top:7px;">Advance tax ₹3,40,000 · 15 Sep</p>
       <p class="sm" style="margin-top:5px;">49 days out. Miss it and interest starts. The report is CA-ready.</p>
       <span class="cta2 tap" data-nav="reports" style="display:inline-block;margin-top:9px;padding:8px 14px;font-size:12px;">Tax report</span>
     </div>
@@ -514,7 +524,7 @@
 
   <div class="au" style="display:flex;justify-content:space-between;align-items:baseline;margin-top:38px;"><p class="lb"><svg width="13" height="13" viewBox="0 0 40 40" style="vertical-align:-2px;margin-right:5px;"><path d="M20 4 A16 16 0 0 1 36 20 H4 A16 16 0 0 1 20 4 Z" fill="var(--lav)" opacity=".8"/><circle cx="20" cy="20" r="16" fill="none" stroke="var(--lav)" stroke-width="3"/><line x1="2" y1="20" x2="38" y2="20" stroke="var(--lav)" stroke-width="3"/></svg>One thought · Arth</p><span class="lnk tap" id="thall" style="font-size:12px;">View all</span></div>
   <p class="au" style="margin-top:12px;font-size:21px;line-height:1.5;letter-spacing:-.3px;color:var(--tx);font-weight:500;" id="thought">
-    ₹28.4L is sleeping across savings and your broker ledger. You could <span class="lnk tap" id="lw">let it work</span>, or <span class="lnk tap" id="lwhy">ask me why</span>, or <span class="lnk tap" id="llb">leave it be</span>.
+    ₹28,40,000 is sleeping across savings and your broker ledger. You could <span class="lnk tap" id="lw">let it work</span>, or <span class="lnk tap" id="lwhy">see the working</span>, or <span class="lnk tap" id="llb">leave it be</span>.
   </p>
   <p class="sm dm au" id="twhy" style="margin-top:9px;">Because you: idle 63 days in the broker ledger · earning zero <span class="lnk tap" data-nav="lens" style="margin-left:6px;">tune Arth’s read</span></p>
 
@@ -530,7 +540,7 @@
 
   <p class="lb" style="margin-top:34px;">What if</p>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:11px;">
-    <div class="cd tap" id="wifm" style="padding:15px 16px;"><p style="font-size:14px;font-weight:600;">Markets fall 10%?</p><p class="sm" style="margin-top:5px;">−₹23.8L on paper. Your plan already assumes it — see why.</p></div>
+    <div class="cd tap" id="wifm" style="padding:15px 16px;"><p style="font-size:14px;font-weight:600;">Markets fall 10%?</p><p class="sm" style="margin-top:5px;">−₹23,80,000 on paper. Your plan already assumes it — see why.</p></div>
     <div class="cd tap" id="wifs" style="padding:15px 16px;border-color:rgba(217,185,106,.4);"><p style="font-size:14px;font-weight:600;">Salary stops 2 months?</p><p class="sm" style="margin-top:5px;color:var(--amb);">You’re 5 weeks short. One fix exists.</p></div>
   </div>
 
@@ -543,7 +553,7 @@
   </div>
 
   <div data-src="aa" class="cd au tap" data-nav="cashflow" style="margin-top:26px;padding:17px 19px;">
-    <div style="display:flex;justify-content:space-between;align-items:baseline;"><p style="font-size:14px;font-weight:600;">July cashflow</p><p class="sm" style="color:var(--pos);">₹1.9L free · open <i class="ti ti-chevron-right" style="vertical-align:-1px;"></i></p></div>
+    <div style="display:flex;justify-content:space-between;align-items:baseline;"><p style="font-size:14px;font-weight:600;">July cashflow</p><p class="sm" style="color:var(--pos);">₹1,90,000 free · open <i class="ti ti-chevron-right" style="vertical-align:-1px;"></i></p></div>
     <svg viewBox="0 0 300 56" style="width:100%;margin-top:10px;">
       <rect x="8" y="22" width="30" height="26" rx="4" fill="#1D1E24"/><rect x="48" y="12" width="30" height="36" rx="4" fill="#1D1E24"/><rect x="88" y="26" width="30" height="22" rx="4" fill="#1D1E24"/><rect x="128" y="8" width="30" height="40" rx="4" fill="#1D1E24"/>
       <rect x="168" y="29" width="30" height="19" rx="4" fill="#3ED598"/>
@@ -553,7 +563,7 @@
   </div>
 
   <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px;">
-    <p class="lb">Flow · the one surface you can touch</p>
+    <p class="lb"><svg class="tico" style="width:14px;height:14px;vertical-align:-2.5px;margin-right:5px;"><use href="#i-swipe"/></svg>Flow · the one surface you can touch</p>
     <p class="sm dm" style="text-align:right;">internal<br>moves only</p>
   </div>
   <div style="display:flex;gap:12px;margin-top:12px;">
@@ -574,18 +584,18 @@
   <div style="margin-top:auto;">
     <div class="sc" style="margin-top:22px;">
       <span class="tag tap" data-chq="k">Plan Kiara 2034</span>
-      <span class="tag tap" data-chq="f">₹3L free — what now?</span>
+      <span class="tag tap" data-chq="f">₹3,00,000 free — what now?</span>
       <span class="tag tap" data-chq="h">Bigger house?</span>
     </div>
     <div style="display:flex;gap:9px;margin-top:10px;">
       <div class="fld tap" data-nav="chat" style="flex:1;margin:0;color:var(--dim);">Ask or tell — type, or hold the mic and talk</div>
-      <div class="tap" data-nav="chat" style="width:50px;height:50px;border-radius:15px;background:#F2F2F5;display:flex;align-items:center;justify-content:center;"><i class="ti ti-microphone" style="font-size:19px;color:#0C0D10;"></i></div>
+      <div class="tap" data-nav="chat" style="width:50px;height:50px;border-radius:15px;background:#F2F2F5;display:flex;align-items:center;justify-content:center;"><svg class="tico" style="width:19px;height:19px;color:#0C0D10;"><use href="#i-mic"/></svg></div>
     </div>
     <div class="nav">
-      <span class="ni on"><i class="ti ti-home"></i>Home</span><span class="ni tap" data-nav="health"><i class="ti ti-activity"></i>Health</span>
-      <span class="ni tap" data-nav="wealth"><i class="ti ti-scale"></i>Wealth</span>
-      <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-      <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+      <span class="ni on"><svg class="tico"><use href="#i-home"/></svg>Home</span><span class="ni tap" data-nav="health"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+      <span class="ni tap" data-nav="wealth"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+      <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+      <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
     </div>
   </div>
 </section>
@@ -593,37 +603,37 @@
 <!-- WEALTH: balance sheet -->
 <section class="zs" id="s-wealth">
   <h2 class="ser">Wealth</h2><p class="sm dm" style="margin-top:4px;">the ledger — everything you own and owe</p>
-  <p class="sm" style="margin-top:7px;"><span id="wsync">Updated today · 7:42 AM</span> <span class="lnk tap" id="wref" style="margin-left:6px;">refresh</span><span class="dm" style="margin:0 6px;">·</span><span class="lnk tap" data-nav="privacy">manage data</span></p>
+  <p class="sm" style="margin-top:7px;"><span id="wsync">Updated today · 7:42 AM</span> <span class="lnk tap" id="wref" style="margin-left:6px;">refresh</span> <span class="tap" id="eyeB" style="color:var(--dim);margin-left:2px;"><svg class="tico" style="width:15px;height:15px;"><use href="#i-eye"/></svg></span><span class="dm" style="margin:0 6px;">·</span><span class="lnk tap" data-nav="privacy">manage data</span></p>
   <div id="werr" class="errrow" style="display:none;margin-top:8px;">Credit bureau · refresh failed 09:12 — showing 14 Jul · <span class="lnk tap" id="werrretry" style="color:var(--tx);">Retry</span> · <span style="color:var(--dim);">NVY-7C21</span></div>
   <div class="cd tap" data-nav="cashflow" style="margin-top:10px;padding:12px 15px;border-color:rgba(214,179,106,.35);">
-    <div class="rw" style="border:none;padding:0;"><span class="sm" style="color:var(--tx);"><i class="ti ti-arrows-left-right" style="color:var(--gold);"></i> Cashflow · In ₹3.6L · Out ₹1.7L · <b style="color:var(--pos);">+₹1.9L free</b></span><i class="ti ti-chevron-right" style="color:var(--dim);"></i></div>
+    <div class="rw" style="border:none;padding:0;"><span class="sm" style="color:var(--tx);"><i class="ti ti-arrows-left-right" style="color:var(--gold);"></i> <span class="amt">Cashflow · In ₹3,60,000 · Out ₹1,70,000 · </span><b style="color:var(--pos);">+₹1,90,000 free</b></span><i class="ti ti-chevron-right" style="color:var(--dim);"></i></div>
   </div>
   <p style="margin-top:10px;font-size:13px;"><span class="lnk tap" data-nav="family">Family view</span><span class="dm" style="margin:0 8px;">·</span><span class="lnk tap" data-nav="refer">Refer a friend or partner</span></p>
-  <div class="seg"><span class="on tap" id="segA">Assets · 3.72 Cr</span><span class="tap" id="segL">Liabilities · 96 L</span></div>
+  <div class="seg"><span class="on tap" id="segA">Assets · ₹3.72 Cr</span><span class="tap" id="segL">Liabilities · ₹96,00,000</span></div>
   <div id="wA" style="margin-top:12px;">
     <div class="cd tap" data-src="mf" data-nav="folios"><div class="rw"><span>Mutual funds · 14 folios <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--tx);">₹1.12 Cr</span></div>
       <svg viewBox="0 0 300 20" style="width:100%;margin-top:10px;"><rect x="0" y="4" width="44" height="12" rx="3" fill="#31855F"/><rect x="50" y="4" width="44" height="12" rx="3" fill="#31855F"/><rect x="100" y="4" width="44" height="12" rx="3" fill="#2A6B52"/><rect x="150" y="4" width="44" height="12" rx="3" fill="#2A6B52"/><rect x="200" y="4" width="44" height="12" rx="3" fill="#9A5656"/><rect x="250" y="4" width="44" height="12" rx="3" fill="#B06868"/></svg>
       <p class="sm" style="margin-top:8px;">Six of fourteen are one portfolio in different wrappers. The two red ones lag their category three years running.</p></div>
-    <div class="cd tap" data-src="eq" data-nav="stocks" style="margin-top:9px;"><div class="rw"><span>Stocks · direct <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--tx);">₹68 L</span></div>
+    <div class="cd tap" data-src="eq" data-nav="stocks" style="margin-top:9px;"><div class="rw"><span>Stocks · direct <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--tx);">₹68,00,000</span></div>
       <svg viewBox="0 0 300 20" style="width:100%;margin-top:10px;"><rect x="0" y="4" width="126" height="12" rx="3" fill="#D9B96A"/><rect x="132" y="4" width="52" height="12" rx="3" fill="#2E2F36"/><rect x="190" y="4" width="40" height="12" rx="3" fill="#2E2F36"/><rect x="236" y="4" width="30" height="12" rx="3" fill="#2E2F36"/><rect x="272" y="4" width="24" height="12" rx="3" fill="#2E2F36"/></svg>
       <p class="sm" style="margin-top:8px;">The gold block is one company. When it leans, the whole ridge leans with it.</p></div>
-    <div class="cd tap" data-nav="intl" style="margin-top:9px;"><div class="rw"><span>International · RSUs + US ETF <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹17.9 L</span><span class="lnk tap" data-mu="rsu" style="margin-left:9px;font-size:12px;">update</span></span></div>
+    <div class="cd tap" data-nav="intl" style="margin-top:9px;"><div class="rw"><span>International · RSUs + US ETF <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹17,90,000</span><span class="lnk tap" data-mu="rsu" style="margin-left:9px;font-size:12px;">update</span></span></div>
       <p class="sm">$21,400 · TechCorp RSUs + S&amp;P 500 · next vest 15 Aug</p></div>
-    <div class="cd" style="margin-top:9px;"><div class="rw"><span>Fixed deposits</span><span style="color:var(--tx);">₹42 L</span></div>
+    <div class="cd" style="margin-top:9px;"><div class="rw"><span>Fixed deposits</span><span style="color:var(--tx);">₹42,00,000</span></div>
       <svg viewBox="0 0 300 30" style="width:100%;margin-top:10px;"><rect x="0" y="2" width="213" height="10" rx="3" fill="#4E4E5A"/><text x="220" y="11" style="font-size:9px;fill:#8E8E9C;">what it says</text><rect x="0" y="17" width="147" height="10" rx="3" fill="#B06868"/><text x="154" y="26" style="font-size:9px;fill:#8E8E9C;">what you keep</text></svg>
       <p class="sm" style="margin-top:8px;">Safety is not the issue — structure is. The same safety exists at a better keep.</p></div>
-    <div class="cd tap" data-nav="cash" style="margin-top:9px;"><div class="rw"><span>Idle cash · savings + broker <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--red);">₹28.4 L</span></div>
-      <p class="sm" style="margin-top:6px;">₹18.6L savings + ₹9.8L sitting in your broker ledger. Earning ~3.2% while your car loan charges 9.5%.</p></div>
+    <div class="cd tap" data-nav="cash" style="margin-top:9px;"><div class="rw"><span>Idle cash · savings + broker <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--red);">₹28,40,000</span></div>
+      <p class="sm" style="margin-top:6px;">₹18,60,000 savings + ₹9,80,000 sitting in your broker ledger. Earning ~3.2% while your car loan charges 9.5%.</p></div>
     <div class="cd" style="margin-top:9px;border-color:rgba(201,195,178,.28);">
       <p class="lb" style="color:var(--bone);">Alternatives · tracked here, held offline</p>
-      <div class="rw tap" data-nav="pms" style="margin-top:5px;"><span>PMS · Emerald Multi-Asset <i class="ti ti-chevron-right" style="color:var(--dim);font-size:12px;"></i></span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹62 L</span><span class="lnk tap" data-mu="pmsv" style="margin-left:9px;font-size:12px;">update</span></span></div>
-      <p class="sm">Invested ₹50L · <span style="color:var(--pos);">+7.2% since transfer</span> · last valuation 30 Jun · execute via Swapnil</p>
-      <div class="rw" style="margin-top:4px;"><span>Unlisted · NSE shares</span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹7.8 L</span><span class="lnk tap" data-mu="ulv" style="margin-left:9px;font-size:12px;">update</span></span></div>
+      <div class="rw tap" data-nav="pms" style="margin-top:5px;"><span>PMS · Emerald Multi-Asset <i class="ti ti-chevron-right" style="color:var(--dim);font-size:12px;"></i></span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹62,00,000</span><span class="lnk tap" data-mu="pmsv" style="margin-left:9px;font-size:12px;">update</span></span></div>
+      <p class="sm">Invested ₹50,00,000 · <span style="color:var(--pos);">+7.2% since transfer</span> · last valuation 30 Jun · execute via Swapnil</p>
+      <div class="rw" style="margin-top:4px;"><span>Unlisted · NSE shares</span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹7,80,000</span><span class="lnk tap" data-mu="ulv" style="margin-left:9px;font-size:12px;">update</span></span></div>
       <p class="sm">400 shares @ ~₹1,950 · valued Jun · buys/sells arranged via Swapnil, spread disclosed</p>
       <div class="rw" style="margin-top:4px;"><span>AIF</span><span style="flex-shrink:0;"><span class="dm">₹0</span><span class="lnk tap" data-mu="aifm" style="margin-left:9px;font-size:12px;">add manually</span></span></div>
     </div>
     <div class="cd" style="margin-top:9px;">
-      <div class="rw"><span>EPF</span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹34 L</span><span class="lnk tap" data-mu="epf" style="margin-left:9px;font-size:12px;">update</span></span></div>
+      <div class="rw"><span>EPF</span><span style="flex-shrink:0;"><span style="color:var(--tx);">₹34,00,000</span><span class="lnk tap" data-mu="epf" style="margin-left:9px;font-size:12px;">update</span></span></div>
       <div class="rw"><span>PPF</span><span style="flex-shrink:0;"><span class="dm">₹0</span><span class="lnk tap" data-mu="ppf" style="margin-left:9px;font-size:12px;">add manually</span></span></div>
       <p class="sm" style="margin-top:6px;"><i class="ti ti-check" style="color:var(--sage);"></i> EPF disciplined, tax-efficient — untouched, as it should be. Manual entries show as “self-reported” until Swapnil verifies.</p></div>
     <div class="cd" style="margin-top:9px;border-style:dashed;">
@@ -634,13 +644,13 @@
     </div>
   </div>
   <div id="wL" style="display:none;margin-top:12px;">
-    <div class="cd tap" data-src="bureau" data-lb="cc" style="border-color:rgba(217,139,139,.4);"><div class="rw"><span>Credit card revolving <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--red);">₹7.2 L @ 42%</span></div>
-      <p class="sm" style="margin-top:6px;">₹3.02L a year in interest — the single most expensive item in your entire financial life. Your idle cash clears it today and still leaves ₹21L.</p><div class="rw" style="margin-top:8px;border:none;padding:0;"><span class="sm dm">Rate ~42% APR — bureau approx. · confirm or correct</span><span style="flex-shrink:0;"><span class="tag tap" data-mr="cc" style="font-size:11px;">Confirm</span><span class="lnk tap" data-mc="cc" style="margin-left:8px;font-size:12px;">correct</span></span></div>
+    <div class="cd tap" data-src="bureau" data-lb="cc" style="border-color:rgba(217,139,139,.4);"><div class="rw"><span>Credit card revolving <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--red);">₹7,20,000 at 42% a year</span></div>
+      <p class="sm" style="margin-top:6px;">₹3,02,000 a year in interest — the single most expensive item in your entire financial life. Your idle cash clears it today and still leaves ₹21,00,000.</p><div class="rw" style="margin-top:8px;border:none;padding:0;"><span class="sm dm">Rate ~42% APR — bureau approx. · confirm or correct</span><span style="flex-shrink:0;"><span class="tag tap" data-mr="cc" style="font-size:11px;">Confirm</span><span class="lnk tap" data-mc="cc" style="margin-left:8px;font-size:12px;">correct</span></span></div>
       <div class="cta2 tap" id="ccfix" style="margin-top:10px;">Clear it from idle cash — see the math</div></div>
-    <div class="cd tap" data-lb="car" style="margin-top:9px;"><div class="rw"><span>Car loan <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--tx);">₹11 L @ 9.5%</span></div>
-      <p class="sm" style="margin-top:6px;">Prepay from idle cash: saves ₹1.34L interest, closes 22 months early. Zero penalty on floating rate — RBI rule.</p><div class="rw" style="margin-top:8px;border:none;padding:0;"><span class="sm dm">Rate ~9.5% — bureau approx. · confirm or correct</span><span style="flex-shrink:0;"><span class="tag tap" data-mr="car" style="font-size:11px;">Confirm</span><span class="lnk tap" data-mc="car" style="margin-left:8px;font-size:12px;">correct</span></span></div></div>
-    <div class="cd tap" data-lb="home" style="margin-top:9px;"><div class="rw"><span>Home loan <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--tx);">₹78 L @ 8.9%</span></div>
-      <p class="sm" style="margin-top:6px;">Two lenders at 8.4% for your 748 score. Switch saves <b style="color:var(--sage);">₹6.2L</b> over remaining tenor. At 770+, another 15bps opens up.</p><div class="rw" style="margin-top:8px;border:none;padding:0;"><span class="sm dm">Rate ~8.9% — bureau approx. · confirm or correct</span><span style="flex-shrink:0;"><span class="tag tap" data-mr="home" style="font-size:11px;">Confirm</span><span class="lnk tap" data-mc="home" style="margin-left:8px;font-size:12px;">correct</span></span></div></div>
+    <div class="cd tap" data-lb="car" style="margin-top:9px;"><div class="rw"><span>Car loan <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--tx);">₹11,00,000 at 9.5% a year</span></div>
+      <p class="sm" style="margin-top:6px;">Prepay from idle cash: saves ₹1,34,000 interest, closes 22 months early. Zero penalty on floating rate — RBI rule.</p><div class="rw" style="margin-top:8px;border:none;padding:0;"><span class="sm dm">Rate ~9.5% — bureau approx. · confirm or correct</span><span style="flex-shrink:0;"><span class="tag tap" data-mr="car" style="font-size:11px;">Confirm</span><span class="lnk tap" data-mc="car" style="margin-left:8px;font-size:12px;">correct</span></span></div></div>
+    <div class="cd tap" data-lb="home" style="margin-top:9px;"><div class="rw"><span>Home loan <i class="ti ti-chevron-right" style="color:var(--dim);font-size:13px;"></i></span><span style="color:var(--tx);">₹78,00,000 at 8.9% a year</span></div>
+      <p class="sm" style="margin-top:6px;">Two lenders at 8.4% for your 748 score. Switch saves <b style="color:var(--sage);">₹6,20,000</b> over remaining tenor. At 770+, another 15bps opens up.</p><div class="rw" style="margin-top:8px;border:none;padding:0;"><span class="sm dm">Rate ~8.9% — bureau approx. · confirm or correct</span><span style="flex-shrink:0;"><span class="tag tap" data-mr="home" style="font-size:11px;">Confirm</span><span class="lnk tap" data-mc="home" style="margin-left:8px;font-size:12px;">correct</span></span></div></div>
     <div class="cd" style="margin-top:9px;border-style:dashed;">
       <div class="rw" style="border:none;padding:0;"><span class="sm" style="color:var(--tx);">Other loans · personal, gold, BNPL</span><span style="flex-shrink:0;"><span class="dm">₹0</span><span class="lnk tap" data-mu="oloan" style="margin-left:9px;font-size:12px;">add manually</span></span></div>
     </div>
@@ -648,10 +658,10 @@
       <p class="sm" style="margin-top:6px;">CC utilisation is the drag. Clearing the revolve moves you toward 770 in ~2 cycles — score is a rate, not a number.</p></div>
   </div>
   <div class="nav">
-    <span class="ni tap" data-nav="home"><i class="ti ti-home"></i>Home</span><span class="ni tap" data-nav="health"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni on"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni tap" data-nav="home"><svg class="tico"><use href="#i-home"/></svg>Home</span><span class="ni tap" data-nav="health"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni on"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -659,14 +669,14 @@
 <section class="zs" id="s-folios">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Wealth</span>
   <h2 class="ser" style="margin-top:10px;">Mutual funds</h2>
-  <p class="sm dm" style="margin-top:4px;">14 folios · ₹1.12 Cr · XIRR 11.8% vs benchmark 13.1%</p>
-  <div class="cd tap" data-h="flexi" style="margin-top:16px;"><div class="rw"><span>Flexi Cap Fund · ABC</span><span style="color:var(--tx);">₹22.4 L</span></div><p class="sm">XIRR 15.1% · <span style="color:var(--pos);">ahead of category</span></p></div>
-  <div class="cd tap" data-h="blue" style="margin-top:9px;"><div class="rw"><span>Bluechip Fund · KLM</span><span style="color:var(--tx);">₹18.1 L</span></div><p class="sm">XIRR 12.9% · <span style="color:var(--amb);">overlap group A</span> — same top-10 as two others</p></div>
-  <div class="cd tap" data-h="lgmid" style="margin-top:9px;"><div class="rw"><span>Large &amp; Mid Fund · QRS</span><span style="color:var(--tx);">₹14.6 L</span></div><p class="sm">XIRR 12.2% · <span style="color:var(--amb);">overlap group A</span></p></div>
-  <div class="cd tap" data-h="foc" style="margin-top:9px;"><div class="rw"><span>Focused 30 · TUV</span><span style="color:var(--tx);">₹11.8 L</span></div><p class="sm">XIRR 13.4% · <span style="color:var(--amb);">overlap group A</span></p></div>
-  <div class="cd tap" data-h="mid" style="margin-top:9px;border-color:rgba(224,138,138,.35);"><div class="rw"><span>Midcap Opportunities · XYZ</span><span style="color:var(--tx);">₹9.2 L</span></div><p class="sm"><span style="color:var(--red);">lags category 3.4%/yr over 3y</span> — switch candidate, with Swapnil</p></div>
-  <div class="cd tap" data-h="val" style="margin-top:9px;border-color:rgba(224,138,138,.35);"><div class="rw"><span>Value Fund · DEF</span><span style="color:var(--tx);">₹7.9 L</span></div><p class="sm"><span style="color:var(--red);">lags category 3.1%/yr over 3y</span> — switch candidate</p></div>
-  <div class="cd tap" data-h="elss" style="margin-top:9px;"><div class="rw"><span>ELSS Tax Saver · PQR</span><span style="color:var(--tx);">₹6.4 L</span></div><p class="sm">XIRR 13.0% · lock ends next Feb</p></div>
+  <p class="sm dm" style="margin-top:4px;">14 folios · ₹1.12 Cr · 11.8% a year vs benchmark 13.1%</p>
+  <div class="cd tap" data-h="flexi" style="margin-top:16px;"><div class="rw"><span>Flexi Cap Fund · ABC</span><span style="color:var(--tx);">₹22,40,000</span></div><p class="sm">15.1% a year · <span style="color:var(--pos);">ahead of category</span></p></div>
+  <div class="cd tap" data-h="blue" style="margin-top:9px;"><div class="rw"><span>Bluechip Fund · KLM</span><span style="color:var(--tx);">₹18,10,000</span></div><p class="sm">12.9% a year · <span style="color:var(--amb);">overlap group A</span> — same top-10 as two others</p></div>
+  <div class="cd tap" data-h="lgmid" style="margin-top:9px;"><div class="rw"><span>Large &amp; Mid Fund · QRS</span><span style="color:var(--tx);">₹14,60,000</span></div><p class="sm">12.2% a year · <span style="color:var(--amb);">overlap group A</span></p></div>
+  <div class="cd tap" data-h="foc" style="margin-top:9px;"><div class="rw"><span>Focused 30 · TUV</span><span style="color:var(--tx);">₹11,80,000</span></div><p class="sm">13.4% a year · <span style="color:var(--amb);">overlap group A</span></p></div>
+  <div class="cd tap" data-h="mid" style="margin-top:9px;border-color:rgba(224,138,138,.35);"><div class="rw"><span>Midcap Opportunities · XYZ</span><span style="color:var(--tx);">₹9,20,000</span></div><p class="sm"><span style="color:var(--red);">lags category 3.4% a year over 3y</span> — switch candidate, with Swapnil</p></div>
+  <div class="cd tap" data-h="val" style="margin-top:9px;border-color:rgba(224,138,138,.35);"><div class="rw"><span>Value Fund · DEF</span><span style="color:var(--tx);">₹7,90,000</span></div><p class="sm"><span style="color:var(--red);">lags category 3.1% a year over 3y</span> — switch candidate</p></div>
+  <div class="cd tap" data-h="elss" style="margin-top:9px;"><div class="rw"><span>ELSS Tax Saver · PQR</span><span style="color:var(--tx);">₹6,40,000</span></div><p class="sm">13.0% a year · lock ends next Feb</p></div>
   <p class="ghost tap" id="morefolios">Show 7 more folios</p>
 </section>
 
@@ -674,16 +684,16 @@
 <section class="zs" id="s-stocks">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Wealth</span>
   <h2 class="ser" style="margin-top:10px;">Stocks</h2>
-  <p class="sm dm" style="margin-top:4px;">7 holdings · invested ₹51.5L → ₹68L current · +32%</p>
+  <p class="sm dm" style="margin-top:4px;">7 holdings · invested ₹51,50,000 → ₹68,00,000 current · +32%</p>
   <div class="cd tap" data-e="mer" style="margin-top:16px;border-color:rgba(217,185,106,.4);">
-    <div class="rw"><span>Meridian Energy</span><span style="color:var(--tx);">₹19.8L → ₹28.6L</span></div>
+    <div class="rw"><span>Meridian Energy</span><span style="color:var(--tx);">₹19,80,000 → ₹28,60,000</span></div>
     <div style="height:8px;border-radius:4px;background:rgba(255,255,255,.06);margin-top:8px;overflow:hidden;"><div style="height:100%;width:42%;background:#D9B96A;border-radius:4px;"></div></div>
     <p class="sm" style="margin-top:7px;color:var(--amb);"><i class="ti ti-alert-triangle" style="vertical-align:-2px;"></i> 42% of the book — concentration alert · tap for the full picture</p>
   </div>
-  <div class="cd tap" data-e="apex" style="margin-top:9px;"><div class="rw"><span>Apex Banks</span><span>₹8.9L → ₹11.2L</span></div><p class="sm" style="margin-top:5px;">+26% · sized right · no alerts</p></div>
-  <div class="cd tap" data-e="north" style="margin-top:9px;"><div class="rw"><span>Northline Pharma</span><span>₹7.1L → ₹8.8L</span></div><p class="sm" style="margin-top:5px;">+24% · <span style="color:var(--pos);">news: US FDA plant cleared, Mar</span></p></div>
-  <div class="cd tap" data-e="vist" style="margin-top:9px;"><div class="rw"><span>Vistara Consumer</span><span>₹6.4L → ₹7.4L</span></div><p class="sm" style="margin-top:5px;">+16% · no alerts</p></div>
-  <div class="cd tap" id="morestk" style="margin-top:9px;"><div class="rw"><span>3 smaller positions</span><span>₹9.3L → ₹12L</span></div><p class="sm" style="margin-top:5px;">+29% combined</p></div>
+  <div class="cd tap" data-e="apex" style="margin-top:9px;"><div class="rw"><span>Apex Banks</span><span>₹8,90,000 → ₹11,20,000</span></div><p class="sm" style="margin-top:5px;">+26% · sized right · no alerts</p></div>
+  <div class="cd tap" data-e="north" style="margin-top:9px;"><div class="rw"><span>Northline Pharma</span><span>₹7,10,000 → ₹8,80,000</span></div><p class="sm" style="margin-top:5px;">+24% · <span style="color:var(--pos);">news: US FDA plant cleared, Mar</span></p></div>
+  <div class="cd tap" data-e="vist" style="margin-top:9px;"><div class="rw"><span>Vistara Consumer</span><span>₹6,40,000 → ₹7,40,000</span></div><p class="sm" style="margin-top:5px;">+16% · no alerts</p></div>
+  <div class="cd tap" id="morestk" style="margin-top:9px;"><div class="rw"><span>3 smaller positions</span><span>₹9,30,000 → ₹12,00,000</span></div><p class="sm" style="margin-top:5px;">+29% combined</p></div>
   <div class="cta2 tap" data-nav="rm" style="margin-top:16px;">Discuss the 20% concentration cap — with Swapnil</div>
 </section>
 
@@ -718,25 +728,25 @@
 <section class="zs" id="s-cash">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Wealth</span>
   <h2 class="ser" style="margin-top:10px;">Idle cash</h2>
-  <p class="sm dm" style="margin-top:4px;">₹28.4L across three pockets, earning ~3.2%</p>
-  <div class="cd" style="margin-top:14px;"><div class="rw"><span>HDFC savings</span><span>₹11.2 L</span></div><p class="sm">idle 19 days · salary account</p></div>
-  <div class="cd" style="margin-top:9px;"><div class="rw"><span>ICICI savings</span><span>₹7.4 L</span></div><p class="sm">idle 44 days · no scheduled use</p></div>
-  <div class="cd" style="margin-top:9px;border-color:rgba(224,138,138,.35);"><div class="rw"><span>Broker ledger</span><span>₹9.8 L</span></div><p class="sm" style="color:var(--red);">idle 63 days · earning zero — the worst pocket of the three</p></div>
+  <p class="sm dm" style="margin-top:4px;">₹28,40,000 across three pockets, earning ~3.2%</p>
+  <div class="cd" style="margin-top:14px;"><div class="rw"><span>HDFC savings</span><span>₹11,20,000</span></div><p class="sm">idle 19 days · salary account</p></div>
+  <div class="cd" style="margin-top:9px;"><div class="rw"><span>ICICI savings</span><span>₹7,40,000</span></div><p class="sm">idle 44 days · no scheduled use</p></div>
+  <div class="cd" style="margin-top:9px;border-color:rgba(224,138,138,.35);"><div class="rw"><span>Broker ledger</span><span>₹9,80,000</span></div><p class="sm" style="color:var(--red);">idle 63 days · earning zero — the worst pocket of the three</p></div>
   <p class="lb" style="margin-top:18px;">Committed in the next 30 days</p>
   <div class="cd" style="margin-top:9px;">
     <div class="rw"><span class="sm">SIPs · 5 Aug</span><span>₹1,12,500</span></div>
     <div class="rw"><span class="sm">Home EMI · 7 Aug</span><span>₹68,400</span></div>
     <div class="rw"><span class="sm">Car EMI · 10 Aug</span><span>₹23,800</span></div>
     <div class="rw"><span class="sm">Month spend · on trend</span><span>~₹2,10,000</span></div>
-    <div class="rw"><span class="sm">Buffer needed</span><span style="font-weight:600;">≈ ₹4.2 L</span></div>
+    <div class="rw"><span class="sm">Buffer needed</span><span style="font-weight:600;">≈ ₹4,20,000</span></div>
   </div>
   <div class="cd" style="margin-top:12px;border-color:rgba(62,213,152,.35);">
-    <p style="font-size:14.5px;font-weight:600;color:var(--pos);">Safely deployable today: ₹24 L</p>
+    <p style="font-size:14.5px;font-weight:600;color:var(--pos);">Safely deployable today: ₹24,00,000</p>
     <p class="sm" style="margin-top:6px;">Every committed rupee protected. The rest is a decision, not a risk.</p>
   </div>
   <div style="display:flex;gap:8px;margin-top:12px;">
     <span class="cta tap" data-ord="cash" style="flex:1;padding:13px;font-size:13.5px;">Sweep from banks — UPI</span>
-    <span class="cta2 tap" id="bkreq" style="flex:1;">Broker payout ₹9.8L</span>
+    <span class="cta2 tap" id="bkreq" style="flex:1;">Broker payout ₹9,80,000</span>
   </div>
   <p class="ghost tap" data-nav="rm">Route it with Swapnil instead</p>
 </section>
@@ -773,7 +783,7 @@
     <p class="sm dm" style="margin-top:6px;">grey = invested · green = gains</p>
   </div>
   <div class="cd" style="margin-top:10px;">
-    <div class="rw"><span class="sm">XIRR</span><span id="hxirr">—</span></div>
+    <div class="rw"><span class="sm">Return a year</span><span id="hxirr">—</span></div>
     <div class="rw"><span class="sm">vs category</span><span id="hcat">—</span></div>
     <div class="rw"><span class="sm">Holding since</span><span id="hsince">—</span></div>
     <div class="rw"><span class="sm">SIP</span><span id="hsip">—</span></div>
@@ -805,7 +815,7 @@
     <span class="tag tap" data-oa="₹1,00,000">₹1,00,000</span>
   </div>
   <div class="cd" style="margin-top:16px;" id="odate"><div class="rw"><span class="sm">SIP date</span><span>5th — two days after salary</span></div><div class="rw"><span class="sm">First debit</span><span>5 August</span></div></div>
-  <div class="cd" style="margin-top:10px;border-color:rgba(201,195,178,.35);"><p class="sm"><span style="color:var(--bone);">What we earn on this order:</span> <span id="ofee">0.75%/yr trail, inside NAV</span> — shown before every confirmation, always.</p></div>
+  <div class="cd" style="margin-top:10px;border-color:rgba(201,195,178,.35);"><p class="sm"><span style="color:var(--bone);">What we earn on this order:</span> <span id="ofee">0.75% a year trail, inside NAV</span> — shown before every confirmation, always.</p></div>
   <div class="cta tap" id="onext" style="margin-top:16px;">Review — fingerprint next</div>
 </section>
 
@@ -818,7 +828,7 @@
     <div class="rw"><span class="sm">Amount</span><span id="camt">—</span></div>
     <div class="rw"><span class="sm">Route</span><span id="croute">You → NPCI → AMC</span></div>
     <div class="rw"><span class="sm">We earn</span><span style="color:var(--bone);" id="cfee">—</span></div>
-    <div class="rw"><span class="sm">Exit</span><span id="cexit">Any day · 1% load inside 1 yr</span></div>
+    <div class="rw"><span class="sm">Exit</span><span id="cexit">Any day · 1% load inside 1 year</span></div>
   </div>
   <p class="sm" style="margin-top:12px;">Money never rests with Nett. It moves from your bank to the manufacturer on regulated rails, and the units land in your name.</p>
   <div class="cta tap" id="cgo" style="margin-top:16px;"><i class="ti ti-fingerprint" style="vertical-align:-3px;font-size:17px;"></i> Confirm with fingerprint</div>
@@ -861,11 +871,11 @@
   <h2 class="ser" style="margin-top:10px;">Complete the wall</h2>
   <p class="sm dm" style="margin-top:4px;">₹2 Cr term cover · top 3 for a 38-year-old non-smoker · claim record shown, always</p>
   <div class="cd tap" data-ins="secure" style="margin-top:16px;border-color:rgba(62,213,152,.35);">
-    <div class="rw"><span>SecureLife iTerm</span><span style="color:var(--tx);">₹2,890/mo</span></div>
+    <div class="rw"><span>SecureLife iTerm</span><span style="color:var(--tx);">₹2,890 a month</span></div>
     <p class="sm" style="margin-top:5px;"><span style="color:var(--pos);">99.1% claims paid</span> · settles in 1.2 days median · our pick for claim record</p>
   </div>
-  <div class="cd tap" data-ins="sent" style="margin-top:9px;"><div class="rw"><span>Sentinel Protect+</span><span>₹2,640/mo</span></div><p class="sm" style="margin-top:5px;">98.4% claims paid · adds ₹50L accident rider free</p></div>
-  <div class="cd tap" data-ins="natl" style="margin-top:9px;"><div class="rw"><span>NationalPro Term</span><span>₹2,410/mo</span></div><p class="sm" style="margin-top:5px;">97.2% claims paid · cheapest — the trade-off is settlement speed (4.1 days)</p></div>
+  <div class="cd tap" data-ins="sent" style="margin-top:9px;"><div class="rw"><span>Sentinel Protect+</span><span>₹2,640 a month</span></div><p class="sm" style="margin-top:5px;">98.4% claims paid · adds ₹50,00,000 accident rider free</p></div>
+  <div class="cd tap" data-ins="natl" style="margin-top:9px;"><div class="rw"><span>NationalPro Term</span><span>₹2,410 a month</span></div><p class="sm" style="margin-top:5px;">97.2% claims paid · cheapest — the trade-off is settlement speed (4.1 days)</p></div>
   <p class="sm" style="margin-top:12px;">We earn a distribution fee from the insurer — shown on the detail page, before you pay.</p>
 </section>
 
@@ -900,19 +910,33 @@
   <h2 class="ser" style="margin-top:10px;">Family</h2>
   <p class="sm dm" style="margin-top:4px;">one view of the whole household — consent first, always</p>
   <div class="cd" style="margin-top:14px;">
-    <p class="sm">Family net worth · 2 of 3 sharing</p>
-    <p class="big" style="font-size:34px;margin-top:4px;">₹3.24 Cr</p>
+    <p class="sm"><span id="famcount">Family net worth · 2 of 3 sharing</span></p>
+    <p class="big" style="font-size:34px;margin-top:4px;"><span id="famnetbig">₹3.26 Cr</span></p>
     <div class="bar" style="margin-top:10px;"><div style="width:84%;background:linear-gradient(90deg,#2E7A5C,#3ED598);"></div><div style="width:16%;background:#7A6EBE;"></div></div>
-    <p class="sm dm" style="margin-top:6px;">green = you ₹2.76 Cr · violet = Anita ₹48 L · Papa pending</p>
+    <p class="sm dm" style="margin-top:6px;">green = you ₹2.76 Cr · violet = Anita ₹48,00,000 · Papa pending</p>
   </div>
-  <div class="cd tap" data-nav="wealth" style="margin-top:14px;"><div class="rw"><span>Rahul · you</span><span style="color:var(--tx);">₹2.76 Cr</span></div><p class="sm">full ledger · assets ₹3.72 Cr − liabilities ₹96 L</p></div>
-  <div class="cd tap" id="famanita" style="margin-top:9px;"><div class="rw"><span>Anita · spouse</span><span style="color:var(--tx);">₹48 L</span></div><p class="sm"><span style="color:var(--pos);">sharing with you</span> · MF ₹22L · stocks ₹9L · FDs ₹17L · read-only</p></div>
+  <div class="cd tap" data-nav="wealth" style="margin-top:14px;"><div class="rw"><span>Rahul · you</span><span style="color:var(--tx);">₹2.76 Cr</span></div><p class="sm">full ledger · assets ₹3.72 Cr − liabilities ₹96,00,000</p></div>
+  <div class="cd tap" id="famanita" style="margin-top:9px;"><div class="rw"><span>Anita · spouse</span><span style="color:var(--tx);">₹48,00,000</span></div><p class="sm"><span style="color:var(--pos);">sharing with you</span> · MF ₹22,00,000 · stocks ₹9,00,000 · FDs ₹17,00,000 · read-only</p></div>
+  <div class="cd" style="margin-top:9px;"><div class="rw"><span>Kiara · 6 · guardian-managed</span><span style="color:var(--tx);">₹1,85,000</span></div><p class="sm">held in her name by you · earmarked for the 2034 goal · she approves nothing — minors are guardian-managed until 18</p></div>
+  <div id="famnew"></div>
   <div class="cd" style="margin-top:9px;border-style:dashed;"><div class="rw"><span>Papa</span><span class="sm">invite pending</span></div><p class="sm">Sent 3 days ago · <span class="lnk tap" id="famresend">resend</span></p></div>
+  <p class="lb" style="margin-top:20px;">The household, in one line</p>
+  <div class="cd" style="margin-top:8px;">
+    <div class="rw"><span class="sm">Owned, together</span><span id="famown" style="color:var(--tx);">₹4.22 Cr</span></div>
+    <div class="rw" style="margin-top:6px;"><span class="sm">Owed, together</span><span id="famowe" style="color:var(--tx);">₹96,00,000</span></div>
+    <div class="rw" style="margin-top:6px;"><span class="sm">Family net</span><span id="famnet" style="color:var(--pos);font-weight:650;">₹3.26 Cr</span></div>
+    <p class="sm dm" style="margin-top:8px;">₹4.22 Cr owned − ₹96,00,000 owed. Everyone sharing sees this same view — one truth, per-person consent.</p>
+  </div>
+  <div class="cd" style="margin-top:9px;">
+    <div class="rw"><span class="sm">Family cashflow, a month</span><span id="famflow" style="color:var(--tx);">+₹2,25,000 free</span></div>
+    <p class="sm dm" style="margin-top:6px;" id="famflowsub">You +₹1,90,000 · Anita +₹35,000 · after every EMI and premium</p>
+  </div>
   <p class="lb" style="margin-top:20px;">Family insights</p>
-  <div class="cd tap" data-nav="rm" style="margin-top:10px;border-color:rgba(217,185,106,.35);"><p class="sm" style="color:var(--amb);">You and Anita hold ₹19L of the same Bluechip fund — two folios, two exit-load clocks, one portfolio. Consolidation plan with Swapnil saves one full fee layer.</p></div>
+  <div class="cd tap" data-nav="rm" style="margin-top:10px;border-color:rgba(217,185,106,.35);"><p class="sm" style="color:var(--amb);">You and Anita hold ₹19,00,000 of the same Bluechip fund — two folios, two exit-load clocks, one portfolio. Consolidation plan with Swapnil saves one full fee layer.</p></div>
+  <div class="cd" style="margin-top:9px;"><p class="sm">Your card leaks ₹1,840 a month at 42% a year. ₹2,60,000 sits in Anita’s savings at 3%. Inside one household, that is one transfer.</p><div style="display:flex;gap:8px;margin-top:10px;"><span class="cta2 tap" data-nav="rm" style="flex:1;font-size:12px;">Bring Swapnil in</span></div><p class="sm dm" style="margin-top:7px;">Visible because both of you chose the full ledger. Either of you can turn it off, any time.</p></div>
   <div class="cd" style="margin-top:9px;"><p class="sm">When Papa joins: his FDs likely face the same 4.9%-kept problem yours did — the restructure math is ready to reuse.</p></div>
   <p class="sm dm" style="margin-top:12px;">Sharing is per-person and revocable any time. Nobody sees anything they weren’t explicitly given — including you.</p>
-  <div class="cta tap" id="faminvite" style="margin-top:12px;">Add a family member</div>
+  <div class="cta tap" id="famaddopen" style="margin-top:12px;">Add a family member</div>
 </section>
 
 <!-- REFERRAL -->
@@ -962,7 +986,7 @@
 <section class="zs" id="s-intl">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Wealth</span>
   <h2 class="ser" style="margin-top:10px;">International</h2>
-  <p class="sm dm" style="margin-top:3px;">$21,400 · ₹17.9 L · tracked across two accounts</p>
+  <p class="sm dm" style="margin-top:3px;">$21,400 · ₹17,90,000 · tracked across two accounts</p>
   <div class="cd" style="margin-top:14px;">
     <div class="rw"><span>TechCorp RSUs · Schwab</span><span style="color:var(--tx);">$12,400</span></div>
     <p class="sm">140 units vested · <span style="color:var(--pos);">next vest 15 Aug — 120 units ≈ $8,200</span></p>
@@ -974,7 +998,7 @@
   <div class="cd" style="margin-top:12px;">
     <p class="lb">LRS · this financial year</p>
     <div style="height:9px;border-radius:5px;background:rgba(255,255,255,.06);margin-top:10px;overflow:hidden;"><div style="height:100%;width:7%;background:linear-gradient(90deg,#2E6B8A,#5FA8CF);border-radius:5px;"></div></div>
-    <p class="sm" style="margin-top:8px;">$18,000 used of $250,000 · TCS at 20% above ₹7L — collected now, adjusted in your ITR. Schedule FA reminder lives in Reports.</p>
+    <p class="sm" style="margin-top:8px;">$18,000 used of $250,000 · TCS at 20% above ₹7,00,000 — collected now, adjusted in your ITR. Schedule FA reminder lives in Reports.</p>
   </div>
   <div class="cd" style="margin-top:12px;border-color:rgba(94,168,207,.35);">
     <p class="sm">Kiara’s 2034 degree bills in dollars. Rupees saved for it carry currency risk — this sleeve hedges the goal itself.</p>
@@ -1000,12 +1024,12 @@
     </div>
     <div class="cd tap" data-nav="pms" style="min-width:236px;">
       <p class="lb" style="color:var(--lav);">PMS SPOTLIGHT</p>
-      <p style="font-size:14px;font-weight:600;margin-top:6px;">Quant tilt · 18.2% 3y CAGR</p>
-      <p class="sm" style="margin-top:4px;">Min ₹50L · fit-checked by Swapnil first, always</p>
+      <p style="font-size:14px;font-weight:600;margin-top:6px;">Quant tilt · 18.2% a year over 3 years</p>
+      <p class="sm" style="margin-top:4px;">Min ₹50,00,000 · fit-checked by Swapnil first, always</p>
     </div>
     <div class="cd tap" data-ins="secure" style="min-width:236px;">
       <p class="lb" style="color:var(--pos);">PRICE DROP</p>
-      <p style="font-size:14px;font-weight:600;margin-top:6px;">₹2 Cr term · ₹2,890/mo</p>
+      <p style="font-size:14px;font-weight:600;margin-top:6px;">₹2 Cr term · ₹2,890 a month</p>
       <p class="sm" style="margin-top:4px;">99.1% claims paid · 1.2-day median settlement</p>
     </div>
   </div>
@@ -1024,10 +1048,10 @@
   <div class="hr" style="margin-top:20px;"></div>
   <p class="lb" style="margin-top:16px;">Or browse a category</p>
   <p class="sm dm" style="margin-top:4px;">Each opens the shelf, filtered — same list, one way in</p>
-  <div class="cd tap" data-xc="mf" style="margin-top:10px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-chart-pie" style="color:var(--pos);"></i> Mutual funds</span><span class="sm dm" style="flex-shrink:0;">5 products <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Online end-to-end · trail 0.10–0.75%/yr, always shown</p></div>
+  <div class="cd tap" data-xc="mf" style="margin-top:10px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-chart-pie" style="color:var(--pos);"></i> Mutual funds</span><span class="sm dm" style="flex-shrink:0;">5 products <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Online end-to-end · trail 0.10–0.75% a year, always shown</p></div>
   <div class="cd tap" data-xc="bond" style="margin-top:9px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-building-bank" style="color:var(--gold);"></i> Bonds</span><span class="sm dm" style="flex-shrink:0;">2 products <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">7.4–7.9% YTM · T+1 to demat · fee in price, disclosed</p></div>
-  <div class="cd tap" data-xc="pms" style="margin-top:9px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-diamond" style="color:var(--lav);"></i> PMS</span><span class="sm dm" style="flex-shrink:0;">2 strategies <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Min ₹50L · fit-checked by Swapnil before any paperwork</p></div>
-  <div class="cd tap" data-xc="aif" style="margin-top:9px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-layers-intersect" style="color:var(--lav);"></i> AIF</span><span class="sm dm" style="flex-shrink:0;">1 fund <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Min ₹1 Cr · illiquid 4y — sized only after your liquidity plan</p></div>
+  <div class="cd tap" data-xc="pms" style="margin-top:9px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-diamond" style="color:var(--lav);"></i> PMS</span><span class="sm dm" style="flex-shrink:0;">2 strategies <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Min ₹50,00,000 · fit-checked by Swapnil before any paperwork</p></div>
+  <div class="cd tap" data-xc="aif" style="margin-top:9px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-layers-intersect" style="color:var(--lav);"></i> AIF</span><span class="sm dm" style="flex-shrink:0;">1 fund <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Min ₹1 Cr · locked 4 years — sized only after your cash-you-can-reach plan</p></div>
   <div class="cd tap" data-xc="ins" style="margin-top:9px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-shield" style="color:var(--pos);"></i> Insurance</span><span class="sm dm" style="flex-shrink:0;">2 covers <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Term &amp; health top-up · claims ratios shown before price</p></div>
   <div class="cd tap" id="xul" style="margin-top:9px;"><div class="rw" style="border:none;padding:0;"><span style="font-size:14px;"><i class="ti ti-chart-candle" style="color:var(--mut);"></i> Unlisted shares</span><span class="sm dm" style="flex-shrink:0;">via RM <i class="ti ti-chevron-right"></i></span></div><p class="sm" style="margin-top:4px;">Tracked here; buys/sells arranged with price transparency · spread disclosed pre-trade</p></div>
 
@@ -1036,12 +1060,12 @@
   <div class="cd tap" id="gled" style="margin-top:9px;"><div class="rw"><span>Dollar education goal · 2034</span><span class="fee">fee itemised</span></div><p class="sm" style="margin-top:4px;">A goal that bills in dollars, funded in dollars — hedge the goal, not the headline.</p></div>
   <p class="lb" style="margin-top:30px;">Insights &amp; essays</p>
   <div class="cd tap blg" style="margin-top:11px;"><p style="font-size:14px;font-weight:600;">Your FD keeps less than it says</p><p class="sm" style="margin-top:4px;">Post-tax truth, and where the same safety pays more · 4 min</p></div>
-  <div class="cd tap blg" style="margin-top:9px;"><p style="font-size:14px;font-weight:600;">Beyond ₹50L: PMS, honestly</p><p class="sm" style="margin-top:4px;">What changes, what doesn’t, and the fees nobody itemises · 6 min</p></div>
+  <div class="cd tap blg" style="margin-top:9px;"><p style="font-size:14px;font-weight:600;">Beyond ₹50,00,000: PMS, honestly</p><p class="sm" style="margin-top:4px;">What changes, what doesn’t, and the fees nobody itemises · 6 min</p></div>
   <div class="nav" style="margin-top:auto;">
-    <span class="ni tap" data-nav="home"><i class="ti ti-home"></i>Home</span><span class="ni tap" data-nav="health"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni tap" data-nav="wealth"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni on"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni tap" data-nav="home"><svg class="tico"><use href="#i-home"/></svg>Home</span><span class="ni tap" data-nav="health"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni tap" data-nav="wealth"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni on"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -1056,26 +1080,26 @@
   </div>
   <div class="cd" style="margin-top:10px;">
     <p class="lb">The examination</p>
-    <div class="rw" style="margin-top:4px;"><span class="sm">5y return</span><span style="color:var(--pos);">15.1%/yr</span></div>
+    <div class="rw" style="margin-top:4px;"><span class="sm">5y return</span><span style="color:var(--pos);">15.1% a year</span></div>
     <div class="rw"><span class="sm">vs benchmark (Nifty 500)</span><span>+2.3% ahead over 5y</span></div>
     <div class="rw"><span class="sm">Peer rank</span><span>8 of 34 in category</span></div>
     <div class="rw"><span class="sm">Worst year ('20)</span><span style="color:var(--red);">−41% · index −38%</span></div>
     <div class="rw"><span class="sm">Best year ('21)</span><span style="color:var(--pos);">+82% · index +71%</span></div>
-    <div class="rw"><span class="sm">Exit load</span><span>1% inside 1 yr, then nil</span></div>
+    <div class="rw"><span class="sm">Exit load</span><span>1% inside 1 year, then nil</span></div>
     <div class="rw"><span class="sm">Lock-in</span><span style="color:var(--pos);">None — exit any day</span></div>
   </div>
   <div class="cd" style="margin-top:10px;">
     <p class="lb">Manager record</p>
-    <div class="rw" style="margin-top:4px;"><span class="sm">Anil Mehta · 9 yrs</span><span></span></div>
-    <div class="rw"><span class="sm">2015–20 · Growth Fund A</span><span>+14.2%/yr (index +11.9%)</span></div>
-    <div class="rw"><span class="sm">2020–now · this fund</span><span>+15.1%/yr (index +12.8%)</span></div>
+    <div class="rw" style="margin-top:4px;"><span class="sm">Anil Mehta · 9 years</span><span></span></div>
+    <div class="rw"><span class="sm">2015–20 · Growth Fund A</span><span>+14.2% a year (index +11.9%)</span></div>
+    <div class="rw"><span class="sm">2020–now · this fund</span><span>+15.1% a year (index +12.8%)</span></div>
     <div class="rw"><span class="sm">Pattern</span><span style="color:var(--amb);">Beats index — falls harder too</span></div>
   </div>
   <div class="cd" style="margin-top:10px;border-color:rgba(201,195,178,.35);">
     <p class="lb" style="color:var(--bone);">What this costs · what we earn</p>
-    <div class="rw" style="margin-top:5px;"><span class="sm">Total expense ratio</span><span>1.86%/yr</span></div>
-    <div class="rw"><span class="sm">Of which, our trail</span><span style="color:var(--bone);">0.75%/yr</span></div>
-    <div class="rw"><span class="sm">On ₹10L over 5y, we earn</span><span style="color:var(--bone);">≈ ₹43,000</span></div>
+    <div class="rw" style="margin-top:5px;"><span class="sm">Yearly fee on this fund</span><span>1.86% a year</span></div>
+    <div class="rw"><span class="sm">Of which, our trail</span><span style="color:var(--bone);">0.75% a year</span></div>
+    <div class="rw"><span class="sm">On ₹10,00,000 over 5y, we earn</span><span style="color:var(--bone);">≈ ₹43,000</span></div>
     <p class="sm" style="margin-top:7px;">Included in NAV — never billed separately. If a cheaper share class serves you better, Swapnil is required to say so.</p>
   </div>
   <p class="sm" style="margin-top:12px;">Verdict: the manager has earned his fee twice over — in funds that also fall harder than the index. Seven-year money only. The decision stays yours.</p>
@@ -1086,37 +1110,37 @@
 <section class="zs" id="s-pms">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Back</span>
   <h2 class="ser" style="margin-top:10px;">Emerald Multi-Asset PMS</h2>
-  <p class="sm dm" style="margin-top:3px;">Discretionary · min ₹50L · executed with Swapnil, on record</p>
+  <p class="sm dm" style="margin-top:3px;">Discretionary · min ₹50,00,000 · executed with Swapnil, on record</p>
   <div class="cd" style="margin-top:14px;border-color:rgba(62,213,152,.3);">
     <p class="lb" style="color:var(--pos);">Your holding</p>
     <div style="display:flex;gap:24px;margin-top:10px;">
-      <div><p class="sm">Transferred</p><p style="font-size:19px;font-weight:650;">₹50 L</p><p class="sm dm">Nov 2025</p></div>
-      <div><p class="sm">Current value</p><p style="font-size:19px;font-weight:650;">₹62 L</p><p class="sm" style="color:var(--pos);">+7.2% since · valued 30 Jun</p></div>
+      <div><p class="sm">Transferred</p><p style="font-size:19px;font-weight:650;">₹50,00,000</p><p class="sm dm">Nov 2025</p></div>
+      <div><p class="sm">Current value</p><p style="font-size:19px;font-weight:650;">₹62,00,000</p><p class="sm" style="color:var(--pos);">+7.2% since · valued 30 Jun</p></div>
     </div>
     <div style="height:8px;border-radius:4px;background:rgba(255,255,255,.06);margin-top:12px;overflow:hidden;"><div style="height:100%;width:81%;background:linear-gradient(90deg,#2E7A5C,#3ED598);"></div></div>
   </div>
   <div class="cd" style="margin-top:10px;">
     <p class="lb">The strategy</p>
-    <div class="rw" style="margin-top:4px;"><span class="sm">3y CAGR</span><span style="color:var(--pos);">18.2% (benchmark 14.1%)</span></div>
-    <div class="rw"><span class="sm">Worst drawdown ('22)</span><span style="color:var(--red);">−14% · index −16%</span></div>
+    <div class="rw" style="margin-top:4px;"><span class="sm">Return a year, 3 years</span><span style="color:var(--pos);">18.2% (benchmark 14.1%)</span></div>
+    <div class="rw"><span class="sm">Worst fall ('22)</span><span style="color:var(--red);">−14% · index −16%</span></div>
     <div class="rw"><span class="sm">Style</span><span>Quant tilt · multi-asset · 28–34 positions</span></div>
-    <div class="rw"><span class="sm">Liquidity</span><span>Exit in ~30 days, no lock</span></div>
+    <div class="rw"><span class="sm">Cash you can reach</span><span>Exit in about 30 days, no lock</span></div>
     <div class="rw"><span class="sm">Custody</span><span>Your demat · your name, always</span></div>
   </div>
   <div class="cd" style="margin-top:10px;border-color:rgba(201,195,178,.35);">
     <p class="lb" style="color:var(--bone);">Fees · what we earn</p>
     <div class="rw" style="margin-top:5px;"><span class="sm">Manager fee — your choice</span><span>1.25% fixed <span class="dm">or</span> 10% of profit</span></div>
-    <div class="rw"><span class="sm">Nett referral fee</span><span style="color:var(--bone);">0.4%/yr — disclosed in the deck</span></div>
+    <div class="rw"><span class="sm">Nett referral fee</span><span style="color:var(--bone);">0.4% a year — disclosed in the deck</span></div>
     <p class="sm" style="margin-top:7px;">PMS executes offline, on paper you sign. Nett tracks it here; Swapnil carries it, on record.</p>
   </div>
   <div class="cd" style="margin-top:10px;">
     <p class="lb">Team &amp; manager</p>
-    <div class="rw" style="margin-top:4px;"><span class="sm">Manager</span><span>Arjun Vaidya · 14 yrs, ex-Kotak quant desk</span></div>
-    <div class="rw"><span class="sm">Prior fund 2016–21</span><span style="color:var(--pos);">+16.8%/yr (benchmark +12.4%)</span></div>
+    <div class="rw" style="margin-top:4px;"><span class="sm">Manager</span><span>Arjun Vaidya · 14 years, ex-Kotak quant desk</span></div>
+    <div class="rw"><span class="sm">Prior fund 2016–21</span><span style="color:var(--pos);">+16.8% a year (benchmark +12.4%)</span></div>
     <div class="rw"><span class="sm">Best year ('21)</span><span style="color:var(--pos);">+34% · index +24%</span></div>
     <div class="rw"><span class="sm">Team</span><span>6 members · 2 CFAs · same core since 2019</span></div>
     <div class="rw"><span class="sm">Stated discipline</span><span>"Own balance, not stories" — rules-based, rebalanced monthly</span></div>
-    <div class="rw"><span class="sm">Minimum · lock</span><span>₹50L (SEBI) · no lock, 30-day exit</span></div>
+    <div class="rw"><span class="sm">Minimum · lock</span><span>₹50,00,000 (SEBI) · no lock, 30-day exit</span></div>
   </div>
   <div style="display:flex;gap:8px;margin-top:14px;">
     <span class="cta tap" data-nav="rm" style="flex:1;padding:13px;font-size:13.5px;">Discuss with Swapnil</span>
@@ -1140,12 +1164,12 @@
   </div>
   <div class="cd" style="margin-top:10px;">
     <p class="lb">Team &amp; track record</p>
-    <div class="rw" style="margin-top:4px;"><span class="sm">Manager</span><span>Ritu Sharma · 16 yrs credit, ex-NBFC underwriting head</span></div>
+    <div class="rw" style="margin-top:4px;"><span class="sm">Manager</span><span>Ritu Sharma · 16 years credit, ex-NBFC underwriting head</span></div>
     <div class="rw"><span class="sm">Fund I (2019 vintage)</span><span style="color:var(--pos);">13.1% net delivered · fully returned</span></div>
     <div class="rw"><span class="sm">Worst event ('23)</span><span>One default · <span style="color:var(--pos);">92% recovered</span> — security worked</span></div>
     <div class="rw"><span class="sm">Style</span><span>Senior secured only · 60% LTV cap · 11-member team</span></div>
   </div>
-  <p class="sm" style="margin-top:12px;">Verdict: sized only after your liquidity plan — money you will not need for four years, and only that. Your reserve comes first.</p>
+  <p class="sm" style="margin-top:12px;">Verdict: sized only after your cash-you-can-reach plan — money you will not need for four years, and only that. Your reserve comes first.</p>
   <div style="display:flex;gap:8px;margin-top:14px;">
     <span class="cta tap" data-nav="rm" style="flex:1;padding:13px;font-size:13.5px;">Map the fit — with Swapnil</span>
     <span class="cta2 tap deckb" style="flex:0.8;">Factsheet — PDF</span>
@@ -1203,21 +1227,21 @@
     <p class="sm"><i class="ti ti-lock-open" style="color:var(--pos);"></i> Swapnil can see your portfolio. Revoke anytime in <span class="lnk tap" data-nav="privacy">Data &amp; privacy</span>.</p>
   </div>
   <div style="display:flex;flex-direction:column;flex:1;margin-top:6px;">
-    <div class="msg" id="rmmsg1">Rahul, your scan is in. Three priorities before we grow anything: the card revolve, the idle ₹28.4L, and the ₹2 Cr term gap. Sending the review.</div>
+    <div class="msg" id="rmmsg1">Rahul, your scan is in. Three priorities before we grow anything: the card revolve, the idle ₹28,40,000, and the ₹2 Cr term gap. Sending the review.</div>
     <div class="doc tap" id="dl1"><i class="ti ti-file-type-pdf" style="color:var(--red);font-size:20px;"></i><div><p style="font-size:12.5px;color:var(--tx);">Portfolio Review — July.pdf</p><p class="sm">2.1 MB · tap to download</p></div></div>
     <div class="msg me" id="rmmsg2">Saw the PMS section in Explore. Is the quant one right for me?</div>
-    <div class="msg" id="rmmsg3">Honest answer: not yet. Your direct-stock concentration already gives you equity risk. Fix the leaks first — then we discuss PMS with your liquidity mapped. I'd rather lose a referral fee than mis-sequence you.</div>
+    <div class="msg" id="rmmsg3">Honest answer: not yet. Your direct-stock concentration already gives you equity risk. Fix the leaks first — then we discuss PMS with your reachable cash mapped. I'd rather lose a referral fee than mis-sequence you.</div>
   </div>
   <div style="display:flex;gap:9px;margin-top:12px;">
     <div class="fld" style="flex:1;margin:0;color:var(--mut);">Message Swapnil…</div>
-    <div class="tap" id="rmsend" style="width:48px;height:48px;border-radius:13px;background:rgba(214,179,106,.9);display:flex;align-items:center;justify-content:center;"><i class="ti ti-send" style="font-size:18px;color:#181206;"></i></div>
+    <div class="tap" id="rmsend" style="width:48px;height:48px;border-radius:13px;background:rgba(214,179,106,.9);display:flex;align-items:center;justify-content:center;"><svg class="tico" style="width:18px;height:18px;color:#181206;"><use href="#i-send"/></svg></div>
   </div>
   <p class="sm dm tap" id="supp" style="text-align:center;margin-top:12px;">Not about advice? Support · support@nett.in · 1800 419 0000</p>
   <div class="nav">
-    <span class="ni tap" data-nav="home"><i class="ti ti-home"></i>Home</span><span class="ni tap" data-nav="health"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni tap" data-nav="wealth"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni on"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni tap" data-nav="home"><svg class="tico"><use href="#i-home"/></svg>Home</span><span class="ni tap" data-nav="health"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni tap" data-nav="wealth"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni on"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -1228,10 +1252,10 @@
   <p class="sm dm" style="margin-top:4px;">Yours to download, yours to take anywhere — CA-ready formats.</p>
   <div class="cd tap dlr" style="margin-top:14px;"><div class="rw"><span><i class="ti ti-report-money" style="color:var(--pos);"></i> P&amp;L Report</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">Realised + unrealised, by holding · FY26-27</p></div>
   <div class="cd tap dlr" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-file-percent" style="color:var(--bone);"></i> Capital Gains Report</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">STCG/LTCG with grandfathering · ITR-ready</p></div>
-  <div class="cd tap dlr" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-bulb" style="color:var(--lav);"></i> Portfolio Insights</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">Overlap map, laggards, concentration, XIRR vs benchmark</p></div>
+  <div class="cd tap dlr" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-bulb" style="color:var(--lav);"></i> Portfolio Insights</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">Overlap map, laggards, concentration, return vs category</p></div>
   <div class="cd tap dlr" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-scan" style="color:var(--pos);"></i> Portfolio Scan Report</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">The full X-ray — assets, liabilities, leaks, gaps</p></div>
   <div class="cd tap dlr" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-arrows-left-right" style="color:var(--pos);"></i> Cashflow Statement</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">Inflows, outflows, free cash by month · 12 months</p></div>
-  <div class="cd tap dlr" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-receipt-tax" style="color:var(--amb);"></i> Tax Report FY26-27</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">Advance tax ₹3.4L due 15 Sep · LTCG harvest window ₹1.25L</p></div>
+  <div class="cd tap dlr" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-receipt-tax" style="color:var(--amb);"></i> Tax Report FY26-27</span><i class="ti ti-download" style="color:var(--dim);"></i></div><p class="sm">Advance tax ₹3,40,000 due 15 Sep · LTCG harvest window ₹1,25,000</p></div>
 </section>
 
 <!-- AI CHAT -->
@@ -1240,17 +1264,17 @@
   <h2 class="ser" style="margin-top:8px;"><svg width="19" height="19" viewBox="0 0 40 40" style="vertical-align:-3px;margin-right:7px;"><path d="M20 4 A16 16 0 0 1 36 20 H4 A16 16 0 0 1 20 4 Z" fill="var(--lav)" opacity=".8"/><circle cx="20" cy="20" r="16" fill="none" stroke="var(--lav)" stroke-width="2.5"/><line x1="2" y1="20" x2="38" y2="20" stroke="var(--lav)" stroke-width="2.5"/></svg>Arth</h2>
   <p class="sm dm" style="margin-top:3px;">Your wealth, computed · voice or text · executes · Swapnil can join this same thread</p>
   <div id="chthread" style="display:flex;flex-direction:column;flex:1;overflow-y:auto;margin-top:10px;padding-bottom:8px;">
-    <div class="msg arth">Ask me anything about your money. For example:<br><br>· “Can I plan Kiara’s 2034 goal?”<br>· “I have ₹3L free — what do I do?”<br>· “Can we afford a bigger house?”<br><br>I answer from your data, set up the execution, and bring Swapnil in when a human should sign off.</div>
+    <div class="msg arth">Ask anything about your money. For example:<br><br>· “Can I plan Kiara’s 2034 goal?”<br>· “I have ₹3,00,000 free — what do I do?”<br>· “Can we afford a bigger house?”<br><br>Answers come from your data. Execution is set up here, and Swapnil is brought in when a human should sign off.</div>
   </div>
   <div class="sc" style="margin-top:8px;">
     <span class="tag tap" data-ch="k">Plan Kiara 2034</span>
-    <span class="tag tap" data-ch="f">₹3L free — what now?</span>
+    <span class="tag tap" data-ch="f">₹3,00,000 free — what now?</span>
     <span class="tag tap" data-ch="h">Bigger house?</span>
     <span class="tag tap" data-ch="rm">Bring Swapnil in</span>
   </div>
   <div style="display:flex;gap:9px;margin-top:10px;">
     <div class="fld" style="flex:1;margin:0;color:var(--dim);">Type — or hold the mic and just talk</div>
-    <div class="tap" id="chmic" style="width:50px;height:50px;border-radius:15px;background:#F2F2F5;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="ti ti-microphone" style="font-size:19px;color:#0C0D10;"></i></div>
+    <div class="tap" id="chmic" style="width:50px;height:50px;border-radius:15px;background:#F2F2F5;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg class="tico" style="width:19px;height:19px;color:#0C0D10;"><use href="#i-mic"/></svg></div>
   </div>
 </section>
 
@@ -1296,23 +1320,23 @@
   </div>
   <div class="cd au" style="margin-top:12px;">
     <p class="lb" style="color:var(--gold);">Why share?</p>
-    <div class="rw" style="margin-top:6px;"><span class="sm">Leaks surfaced, profiles like yours</span><span class="sm" style="color:var(--tx);">≈₹6.9L/yr</span></div>
+    <div class="rw" style="margin-top:6px;"><span class="sm">Leaks typically surfaced</span><span class="sm" style="color:var(--tx);">≈₹6,90,000 a year</span></div>
     <div class="rw"><span class="sm">Score, what-ifs, a report your RM can act on</span><span class="sm" style="color:var(--tx);">60 sec</span></div>
     <div class="rw"><span class="sm">Revoke, delink or delete</span><span class="sm" style="color:var(--tx);">1 tap</span></div>
   </div>
   <p class="lb au" style="margin-top:22px;">Works right now, no data</p>
   <div class="cd tap au" data-nav="bond" style="margin-top:9px;border-color:rgba(110,150,230,.4);">
     <p class="lb" style="color:#8FB2EE;">MARKET · TODAY</p>
-    <p style="font-size:14px;font-weight:600;margin-top:6px;">Repo cut 25 bps — AAA bonds still lock 7.4%</p>
+    <p style="font-size:14px;font-weight:600;margin-top:6px;">Repo rate cut 0.25% — AAA bonds still lock 7.4% a year</p>
   </div>
   <div class="cd tap au" data-nav="explore" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-compass" style="color:var(--bone);"></i> Explore every product</span><i class="ti ti-chevron-right" style="color:var(--dim);"></i></div></div>
   <div class="cd tap au" data-nav="book" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-user-star" style="color:var(--gold);"></i> Book a free call with Swapnil</span><i class="ti ti-chevron-right" style="color:var(--dim);"></i></div></div>
   <div class="nav" style="margin-top:auto;">
-    <span class="ni on"><i class="ti ti-home"></i>Home</span>
-    <span class="ni tap" data-nav="health"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni tap" data-nav="wealth"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni on"><svg class="tico"><use href="#i-home"/></svg>Home</span>
+    <span class="ni tap" data-nav="health"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni tap" data-nav="wealth"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -1322,7 +1346,7 @@
   <h2 class="ser" style="margin-top:5px;">Wealth health</h2>
   <div class="cd au" style="margin-top:16px;text-align:center;border-style:dashed;padding:22px;">
     <span style="display:inline-flex;width:74px;height:74px;border-radius:50%;border:3px dashed var(--dim);align-items:center;justify-content:center;font-size:26px;font-weight:650;color:var(--dim);">—</span>
-    <p class="sm" style="margin-top:12px;">Your score appears after a <b style="color:var(--tx);">60-second</b> scan. Profiles like yours average <b style="color:var(--tx);">58</b> — and surface ≈₹6.9L/yr in leaks.</p>
+    <p class="sm" style="margin-top:12px;">Your score appears after a <b style="color:var(--tx);">60-second</b> scan. The average is <b style="color:var(--tx);">58</b>. ≈₹6,90,000 a year typically hides in leaks.</p>
     <div class="cta tap" data-nav="consent" style="margin-top:13px;">Run my scan</div>
   </div>
   <p class="lb au" style="margin-top:22px;">What a report looks like · sample</p>
@@ -1333,11 +1357,11 @@
   </div>
   <p class="sm dm" style="margin-top:12px;">Read-only · revocable in 1 tap · sold or shared: 0, ever</p>
   <div class="nav" style="margin-top:auto;">
-    <span class="ni tap" data-nav="home"><i class="ti ti-home"></i>Home</span>
-    <span class="ni on"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni tap" data-nav="wealth"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni tap" data-nav="home"><svg class="tico"><use href="#i-home"/></svg>Home</span>
+    <span class="ni on"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni tap" data-nav="wealth"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -1348,19 +1372,19 @@
   <p class="sm au" style="margin-top:14px;">The ledger fills source by source — connect any one, see it live in under a minute.</p>
   <div class="cd au" style="margin-top:10px;">
     <div class="rw"><span class="sm" style="color:var(--tx);"><i class="ti ti-building-bank" style="color:var(--mut);"></i> Banks · Account Aggregator</span><span class="cta2 tap" data-nav="consent" style="padding:7px 13px;font-size:12px;flex-shrink:0;">Connect</span></div>
-    <p class="sm">Balances, flows, idle cash — where ≈₹1.79L/yr typically hides.</p>
+    <p class="sm">Balances, flows, idle cash — where ≈₹1,79,000 a year typically hides.</p>
     <div class="rw" style="margin-top:8px;"><span class="sm" style="color:var(--tx);"><i class="ti ti-chart-pie" style="color:var(--mut);"></i> Mutual funds · MF Central</span><span class="cta2 tap" data-nav="consent" style="padding:7px 13px;font-size:12px;flex-shrink:0;">Connect</span></div>
-    <p class="sm">Folios, overlap, laggards — ≈₹1.1L/yr for profiles like yours.</p>
+    <p class="sm">Folios, overlap, laggards — ≈₹1,10,000 a year typically hides here.</p>
     <div class="rw" style="margin-top:8px;"><span class="sm" style="color:var(--tx);"><i class="ti ti-file-analytics" style="color:var(--mut);"></i> Loans &amp; score · bureau</span><span class="cta2 tap" data-nav="consent" style="padding:7px 13px;font-size:12px;flex-shrink:0;">Connect</span></div>
     <p class="sm">The biggest leak — card revolve — lives here. Soft pull, score unaffected.</p>
   </div>
   <div class="cd tap au" id="wm0" style="margin-top:10px;"><div class="rw"><span class="sm"><i class="ti ti-pencil" style="color:var(--mut);"></i> Or add holdings manually with Swapnil</span><i class="ti ti-chevron-right" style="color:var(--dim);"></i></div></div>
   <div class="nav" style="margin-top:auto;">
-    <span class="ni tap" data-nav="home"><i class="ti ti-home"></i>Home</span>
-    <span class="ni tap" data-nav="health"><i class="ti ti-activity"></i>Health</span>
-    <span class="ni on"><i class="ti ti-scale"></i>Wealth</span>
-    <span class="ni tap" data-nav="explore"><i class="ti ti-compass"></i>Explore</span>
-    <span class="ni tap" data-nav="rm"><i class="ti ti-user-star"></i>RM</span>
+    <span class="ni tap" data-nav="home"><svg class="tico"><use href="#i-home"/></svg>Home</span>
+    <span class="ni tap" data-nav="health"><svg class="tico"><use href="#i-health"/></svg>Health</span>
+    <span class="ni on"><svg class="tico"><use href="#i-wealth"/></svg>Wealth</span>
+    <span class="ni tap" data-nav="explore"><svg class="tico"><use href="#i-explore"/></svg>Explore</span>
+    <span class="ni tap" data-nav="rm"><svg class="tico"><use href="#i-rm"/></svg>RM</span>
   </div>
 </section>
 
@@ -1372,11 +1396,11 @@
   <div data-src="aa">
 
   <div class="cd" style="margin-top:14px;">
-    <div class="rw" style="border:none;padding:0;"><span class="sm">In</span><span class="sm" style="color:var(--pos);">₹3.6L</span></div>
+    <div class="rw" style="border:none;padding:0;"><span class="sm">In</span><span class="sm" style="color:var(--pos);">₹3,60,000</span></div>
     <div style="height:8px;border-radius:99px;background:rgba(62,213,152,.22);margin-top:5px;"><div style="width:100%;height:100%;border-radius:99px;background:var(--pos);opacity:.8;"></div></div>
-    <div class="rw" style="border:none;padding:0;margin-top:10px;"><span class="sm">Out</span><span class="sm" style="color:var(--red);">₹1.7L</span></div>
+    <div class="rw" style="border:none;padding:0;margin-top:10px;"><span class="sm">Out</span><span class="sm" style="color:var(--red);">₹1,70,000</span></div>
     <div style="height:8px;border-radius:99px;background:rgba(224,138,138,.18);margin-top:5px;"><div style="width:47%;height:100%;border-radius:99px;background:var(--red);opacity:.75;"></div></div>
-    <div class="rw" style="border:none;padding:0;margin-top:10px;"><span class="sm" style="color:var(--tx);font-weight:600;">Free</span><span style="color:var(--pos);font-weight:650;">+₹1.9L</span></div>
+    <div class="rw" style="border:none;padding:0;margin-top:10px;"><span class="sm" style="color:var(--tx);font-weight:600;">Free</span><span style="color:var(--pos);font-weight:650;">+₹1,90,000</span></div>
   </div>
 
   <p class="lb au" style="margin-top:20px;">Every month, on autopilot</p>
@@ -1392,35 +1416,35 @@
 
   <div class="cd" style="margin-top:9px;border-color:rgba(224,138,138,.45);">
     <div style="display:flex;gap:6px;align-items:center;"><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--red);border:1px solid rgba(224,138,138,.45);border-radius:999px;padding:3px 9px;">CRITICAL</span><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--dim);border:1px solid var(--hair);border-radius:999px;padding:3px 9px;">EXPENSE</span></div>
-    <p style="font-size:13.5px;font-weight:600;margin-top:9px;">Zee5 renewal jumped 20% — ₹149 → ₹179/mo</p>
-    <p class="sm" style="margin-top:4px;">Opened twice in 90 days. Worth it? Stop it plus the 2 other idle subs — ₹1,340/mo freed → SIP it: ≈₹17.1k in 1 year, ≈₹1.1L in 5 at 12%.</p>
+    <p style="font-size:13.5px;font-weight:600;margin-top:9px;">Zee5 renewal jumped 20% — ₹149 → ₹179 a month</p>
+    <p class="sm" style="margin-top:4px;">Opened twice in 90 days. Worth it? Stop it plus the 2 other idle subs — ₹1,340 a month freed → SIP it: ≈₹17,100 in 1 year, ≈₹1,10,000 in 5 at 12%.</p>
     <div style="display:flex;gap:8px;margin-top:10px;"><span class="cta2 tap" data-cfd="zee" style="flex:1;padding:9px;font-size:12px;">Details</span><span class="cta2 tap" data-ord="mf" style="flex:1;padding:9px;font-size:12px;color:var(--red);border-color:rgba(224,138,138,.5);">Act now · SIP the savings</span></div>
   </div>
 
   <div class="cd" style="margin-top:9px;border-color:rgba(217,185,106,.4);">
     <div style="display:flex;gap:6px;align-items:center;"><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--attn);border:1px solid rgba(232,147,92,.4);border-radius:999px;padding:3px 9px;">ATTENTION</span><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--dim);border:1px solid var(--hair);border-radius:999px;padding:3px 9px;">EXPENSE</span></div>
-    <p style="font-size:13.5px;font-weight:600;margin-top:9px;">Subscriptions up 31% YoY — ₹4,870/mo across 9 platforms</p>
-    <p class="sm" style="margin-top:4px;">3 untouched for 60+ days. Silent renewals are how ₹58k/yr walks out unnoticed.</p>
+    <p style="font-size:13.5px;font-weight:600;margin-top:9px;">Subscriptions up 31% YoY — ₹4,870 a month across 9 platforms</p>
+    <p class="sm" style="margin-top:4px;">3 untouched for 60+ days. Silent renewals are how ₹58,000 a year walks out unnoticed.</p>
     <div style="display:flex;gap:8px;margin-top:10px;"><span class="cta2 tap" data-cfd="subs" style="flex:1;padding:9px;font-size:12px;">Details</span><span class="cta2 tap" data-cfd="subsact" style="flex:1;padding:9px;font-size:12px;color:var(--gold);border-color:rgba(214,179,106,.5);">Act now · Review the 9</span></div>
   </div>
 
   <div class="cd" style="margin-top:9px;border-color:rgba(217,185,106,.4);">
     <div style="display:flex;gap:6px;align-items:center;"><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--attn);border:1px solid rgba(232,147,92,.4);border-radius:999px;padding:3px 9px;">ATTENTION</span><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--dim);border:1px solid var(--hair);border-radius:999px;padding:3px 9px;">EXPENSE</span></div>
     <p style="font-size:13.5px;font-weight:600;margin-top:9px;">Card annual fee ₹4,999 — waivable, and you’re close</p>
-    <p class="sm" style="margin-top:4px;">Waived at ₹3L annual spend; you’re at ₹2.6L with 4 months left. Route one utility to the card and it’s free.</p>
+    <p class="sm" style="margin-top:4px;">Waived at ₹3,00,000 annual spend; you’re at ₹2,60,000 with 4 months left. Route one utility to the card and it’s free.</p>
     <div style="display:flex;gap:8px;margin-top:10px;"><span class="cta2 tap" data-cfd="fee" style="flex:1;padding:9px;font-size:12px;">Details</span><span class="cta2 tap" data-cfd="feeact" style="flex:1;padding:9px;font-size:12px;color:var(--gold);border-color:rgba(214,179,106,.5);">Act now · Route a bill</span></div>
   </div>
 
   <div class="cd" style="margin-top:9px;border-color:rgba(217,185,106,.4);">
     <div style="display:flex;gap:6px;align-items:center;"><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--attn);border:1px solid rgba(232,147,92,.4);border-radius:999px;padding:3px 9px;">ATTENTION</span><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--dim);border:1px solid var(--hair);border-radius:999px;padding:3px 9px;">INCOME</span></div>
     <p style="font-size:13.5px;font-weight:600;margin-top:9px;">RSUs vest 15 Aug — plan before they land</p>
-    <p class="sm" style="margin-top:4px;">$6.2k vesting. Decide the hold/sell split and the LRS-tax path now, not after the credit hits.</p>
+    <p class="sm" style="margin-top:4px;">$6,200 vesting. Decide the hold/sell split and the LRS-tax path now, not after the credit hits.</p>
     <div style="display:flex;gap:8px;margin-top:10px;"><span class="cta2 tap" data-cfd="rsu" style="flex:1;padding:9px;font-size:12px;">Details</span><span class="cta2 tap" data-nav="intl" style="flex:1;padding:9px;font-size:12px;color:var(--gold);border-color:rgba(214,179,106,.5);">Act now · Open International</span></div>
   </div>
 
   <div class="cd" style="margin-top:9px;">
     <div style="display:flex;gap:6px;align-items:center;"><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--pos);border:1px solid var(--hair);border-radius:999px;padding:3px 9px;">GOOD</span><span style="font-size:9.5px;letter-spacing:1.6px;font-weight:600;color:var(--dim);border:1px solid var(--hair);border-radius:999px;padding:3px 9px;">INCOME</span></div>
-    <p style="font-size:13.5px;font-weight:600;margin-top:9px;">Salary ₹3.6L — 14 of 14 months, on the 1st</p>
+    <p style="font-size:13.5px;font-weight:600;margin-top:9px;">Salary ₹3,60,000 — 14 of 14 months, on the 1st</p>
     <div style="display:flex;gap:8px;margin-top:10px;"><span class="cta2 tap" data-cfd="sal" style="flex:1;padding:9px;font-size:12px;">Details</span></div>
   </div>
 
@@ -1481,7 +1505,7 @@
   </div>
 
   <div class="cd" style="margin-top:12px;border-color:rgba(214,179,106,.35);">
-    <p class="sm" id="cimp">Full picture · score confidence <b style="color:var(--tx);">100%</b> · every leak visible — profiles like yours surface ≈₹6.9L/yr.</p>
+    <p class="sm" id="cimp">Full picture · score confidence <b style="color:var(--tx);">100%</b> · every leak visible — ≈₹6,90,000 a year typically hides here.</p>
   </div>
 
   <div class="cd" style="margin-top:12px;">
@@ -1502,7 +1526,7 @@
   <div class="cd tap" id="limsample" style="margin-top:9px;"><div class="rw"><span><i class="ti ti-scan" style="color:var(--pos);"></i> See a sample report</span><i class="ti ti-chevron-right" style="color:var(--dim);"></i></div><p class="sm">What the full 60-second scan produces — on demo data.</p></div>
 
   <div class="cd" style="margin-top:12px;border-color:rgba(217,185,106,.45);">
-    <p class="sm"><i class="ti ti-eye-off" style="color:var(--amb);"></i> <b style="color:var(--tx);">What stays invisible without data:</b> your score, the leak map (profiles like yours surface ≈₹6.9L/yr), what-if scenarios, and a report Swapnil can act on. Sharing is read-only — revoked in 1 tap.</p>
+    <p class="sm"><i class="ti ti-eye-off" style="color:var(--amb);"></i> <b style="color:var(--tx);">What stays invisible without data:</b> your score, the leak map (≈₹6,90,000 a year that typically hides here), what-if scenarios, and a report Swapnil can act on. Sharing is read-only — revoked in 1 tap.</p>
   </div>
   <div class="cta tap" data-nav="consent" style="margin-top:14px;">Choose what to share — even one source helps</div>
   <p class="ghost tap" id="limcont">Continue without data</p>
@@ -1583,7 +1607,7 @@
   <p class="lb" style="margin-top:14px;">Occupation</p>
   <div class="sc" style="margin-top:7px;"><span class="tag tap on" data-kt="o" style="border-color:rgba(236,236,241,.4);">Salaried</span><span class="tag tap" data-kt="o">Business</span><span class="tag tap" data-kt="o">Professional</span><span class="tag tap" data-kt="o">Retired</span></div>
   <p class="lb" style="margin-top:12px;">Annual income</p>
-  <div class="sc" style="margin-top:7px;"><span class="tag tap" data-kt="i">₹10–25L</span><span class="tag tap on" data-kt="i" style="border-color:rgba(236,236,241,.4);">₹25L–1Cr</span><span class="tag tap" data-kt="i">₹1Cr+</span></div>
+  <div class="sc" style="margin-top:7px;"><span class="tag tap" data-kt="i">₹10–25L</span><span class="tag tap on" data-kt="i" style="border-color:rgba(236,236,241,.4);">₹25,00,000–1Cr</span><span class="tag tap" data-kt="i">₹1Cr+</span></div>
   <div class="cd" style="margin-top:12px;">
     <div class="rw"><span class="sm">Tax resident of India only (FATCA/CRS)</span><span class="tag tap on" data-kt="f" style="font-size:11px;border-color:rgba(62,213,152,.5);">Yes</span></div>
     <div class="rw"><span class="sm">Politically exposed person (PEP)</span><span class="tag tap on" data-kt="p" style="font-size:11px;border-color:rgba(62,213,152,.5);">No</span></div>
@@ -1634,22 +1658,21 @@
   <div class="cta tap" data-nav="kyc9" style="margin-top:14px;">Continue</div>
 </section>
 
-<!-- KYC-9: review & submit -->
+<!-- KYC-9: signature (review removed per dev feedback 06 Aug; id retained for registry parity) -->
 <section class="zs" id="s-kyc9">
   <span class="bk tap" data-nav="back"><i class="ti ti-chevron-left" style="vertical-align:-2px;"></i> Back</span>
-  <p class="lb" style="margin-top:12px;color:var(--gold);">STEP 9 OF 9 · REVIEW</p>
-  <h2 class="ser" style="margin-top:8px;">Everything,<br>on one screen.</h2>
-  <div class="cd" style="margin-top:14px;">
-    <div class="rw"><span class="sm">Identity</span><span class="sm" style="color:var(--tx);">Rahul Mehra · AXKPM4821Q</span></div>
-    <div class="rw"><span class="sm">Contact</span><span class="sm" style="color:var(--tx);">email ✓ · mobile ✓</span></div>
-    <div class="rw"><span class="sm">Address</span><span class="sm" style="color:var(--tx);">Gurgaon 122011 · DigiLocker</span></div>
-    <div class="rw"><span class="sm">Profile</span><span class="sm" style="color:var(--tx);">Salaried · ₹25L–1Cr · PEP: No</span></div>
-    <div class="rw"><span class="sm">Bank</span><span class="sm" style="color:var(--tx);">HDFC ●●●● 4521 · ₹1 verified</span></div>
-    <div class="rw"><span class="sm">Documents</span><span class="sm" style="color:var(--tx);">PAN · selfie · signature ✓</span></div>
-    <div class="rw"><span class="sm">Nominee</span><span class="sm" style="color:var(--tx);">Anita Mehra · Spouse · 100%</span></div>
+  <p class="lb" style="margin-top:18px;">STEP 9 OF 9 · SIGNATURE</p>
+  <h2 class="ser" style="font-size:26px;margin-top:10px;">Sign once.<br>It goes on every form.</h2>
+  <p class="sm" style="margin-top:10px;">Draw with your finger, exactly as on your PAN. This signature goes to the KYC registry and every mandate after — one capture, reused with your consent.</p>
+  <div class="cd" style="margin-top:16px;padding:0;overflow:hidden;">
+    <canvas id="sigpad" width="640" height="300" style="width:100%;height:170px;display:block;background:rgba(255,255,255,.02);touch-action:none;"></canvas>
+  </div>
+  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
+    <span class="lnk tap" id="sigclear" style="font-size:12.5px;">Clear and redraw</span>
+    <span class="lnk tap" id="sigupload" style="font-size:12.5px;">Upload a photo instead</span>
   </div>
-  <p class="sm dm" style="margin-top:10px;">Submitting sends this to the KRA and opens your folio with the AMC. Edits stay one tap away before you submit.</p>
-  <div class="cta tap" id="ksubmit" style="margin-top:14px;">Submit — open my account</div>
+  <p class="sm dm" id="sighint" style="margin-top:12px;">Sign inside the box to continue.</p>
+  <div class="cta tap" id="siggo" style="margin-top:14px;opacity:.4;pointer-events:none;">Sign and finish</div>
 </section>
 
 <!-- KYC-10: status + resume order -->
@@ -1865,7 +1888,7 @@
   <p class="ser" style="font-size:19px;">Redeem</p>
   <p class="sm" style="margin-top:6px;" id="rsub">—</p>
   <div class="sc" style="margin-top:12px;" id="ramts"><span class="tag tap on" data-ra="₹1,00,000" style="border-color:rgba(236,236,241,.4);">₹1,00,000</span><span class="tag tap" data-ra="₹2,50,000">₹2,50,000</span><span class="tag tap" data-ra="All units">All units</span></div>
-  <div class="cd" style="margin-top:12px;"><div class="rw"><span class="sm">Exit load</span><span id="rload">Nil — held over 1 yr</span></div><div class="rw"><span class="sm">Tax note</span><span>LTCG 12.5% beyond ₹1.25L/yr</span></div><div class="rw"><span class="sm">Money in bank</span><span>T+2 working days</span></div></div>
+  <div class="cd" style="margin-top:12px;"><div class="rw"><span class="sm">Exit load</span><span id="rload">Nil — held over 1 year</span></div><div class="rw"><span class="sm">Tax note</span><span>LTCG 12.5% beyond ₹1,25,000 a year</span></div><div class="rw"><span class="sm">Money in bank</span><span>T+2 working days</span></div></div>
   <div style="display:flex;gap:8px;margin-top:14px;"><span class="cta2 tap" id="rclose" style="flex:0.7;">Keep it</span><span class="cta tap" id="rgo" style="flex:1;padding:12px;">Redeem — fingerprint</span></div>
 </div></div>
 <div class="modal" id="swsheet"><div class="sheet">
@@ -1878,7 +1901,7 @@
 </div></div>
 <div class="modal" id="bksheet"><div class="sheet">
   <p class="ser" style="font-size:19px;">Broker payout</p>
-  <p class="sm" style="margin-top:6px;">₹9.8L in your broker ledger, earning zero for 63 days.</p>
+  <p class="sm" style="margin-top:6px;">₹9,80,000 in your broker ledger, earning zero for 63 days.</p>
   <div class="cd" style="margin-top:12px;">
     <div class="rw"><span class="sm">1 · Payout request</span><span style="color:var(--pos);">placed with broker ✓</span></div>
     <div class="rw"><span class="sm">2 · Credit to your bank</span><span>T+1 working day</span></div>
@@ -1893,7 +1916,7 @@
 <div class="modal" id="wifmsheet"><div class="sheet">
   <p class="ser" style="font-size:19px;">If markets fall 10%</p>
   <div class="cd" style="margin-top:12px;">
-    <div class="rw"><span class="sm">Paper impact</span><span style="color:var(--red);">−₹23.8L on ₹2.38 Cr equity</span></div>
+    <div class="rw"><span class="sm">Paper impact</span><span style="color:var(--red);">−₹23,80,000 on ₹2.38 Cr equity</span></div>
     <div class="rw"><span class="sm">Your reserve</span><span style="color:var(--pos);">Untouched — no forced selling</span></div>
     <div class="rw"><span class="sm">Your SIPs</span><span style="color:var(--pos);">Buy the same units 10% cheaper</span></div>
     <div class="rw"><span class="sm">Your EMIs</span><span>Unaffected — income covers 2.4x</span></div>
@@ -1904,11 +1927,11 @@
 <div class="modal" id="wifssheet"><div class="sheet">
   <p class="ser" style="font-size:19px;">If salary stops for 2 months</p>
   <div class="cd" style="margin-top:12px;">
-    <div class="rw"><span class="sm">Fixed outflows</span><span>₹4.1L/month · EMIs + SIPs + living</span></div>
-    <div class="rw"><span class="sm">Two months need</span><span>₹8.2 L</span></div>
-    <div class="rw"><span class="sm">Reserve today</span><span style="color:var(--red);">₹4.6 L — 5 weeks short</span></div>
+    <div class="rw"><span class="sm">Fixed outflows</span><span>₹4,10,000/month · EMIs + SIPs + living</span></div>
+    <div class="rw"><span class="sm">Two months need</span><span>₹8,20,000</span></div>
+    <div class="rw"><span class="sm">Reserve today</span><span style="color:var(--red);">₹4,60,000 — 5 weeks short</span></div>
   </div>
-  <p class="sm" style="margin-top:11px;">This is the exact gap the reservoir exists for. The ₹24L idle sweep fills it today — permanently.</p>
+  <p class="sm" style="margin-top:11px;">This is the exact gap the reservoir exists for. The ₹24,00,000 idle sweep fills it today — permanently.</p>
   <div style="display:flex;gap:8px;margin-top:14px;"><span class="cta2 tap" id="wifsclose" style="flex:0.7;">Later</span><span class="cta tap" data-nav="cash" style="flex:1;padding:12px;font-size:13px;">Fill the reserve now</span></div>
 </div></div>
 <div class="modal" id="rmsheet"><div class="sheet">
@@ -1928,11 +1951,51 @@
   <p class="sm dm" id="munote" style="margin-top:10px;">—</p>
   <div style="display:flex;gap:8px;margin-top:14px;" id="mubtns"></div>
 </div></div>
-<div class="modal" id="delsheet"><div class="modal" id="delsheet"><div class="sheet">
+<div class="modal" id="delsheet"><div class="sheet">
   <p class="ser" style="font-size:19px;" id="deltitle">—</p>
   <p class="sm" style="margin-top:8px;" id="delbody">—</p>
   <div style="display:flex;gap:8px;margin-top:14px;"><span class="cta2 tap" id="delclose" style="flex:1;">Cancel</span><span class="cta tap" id="delgo" style="flex:1;padding:12px;">Yes, delete</span></div>
 </div></div>
+
+<!-- CANON COMPONENT: error sheet — what failed · when · last-good · one Retry · trace ID -->
+<div class="modal" id="errsheet"><div class="sheet">
+  <p class="ser" style="font-size:19px;" id="errtitle">Couldn’t reach your bank.</p>
+  <p class="sm" style="margin-top:8px;" id="errbody">Showing your balance as of 7:42 AM.</p>
+  <div style="display:flex;gap:8px;margin-top:16px;"><span class="cta2 tap" id="errclose" style="flex:1;">Keep the last data</span><span class="cta tap" id="errretry" style="flex:1;padding:12px;">Retry</span></div>
+  <p class="sm dm" style="margin-top:10px;text-align:center;" id="errref">ref NVY-0000</p>
+</div></div>
+<div class="modal" id="famdetsheet"><div class="sheet" style="border-top:2px solid rgba(143,178,238,.5);">
+  <p class="lb" style="color:var(--water);">SHARED WITH YOU · READ-ONLY</p>
+  <p class="ser" style="font-size:19px;margin-top:6px;"><span id="fdname">—</span>’s ledger.</p>
+  <p class="sm dm" style="margin-top:5px;">Not yours — shared. <span id="fdname2">—</span> chose what you see here, and one tap on their side changes it.</p>
+  <div id="fdrows" style="margin-top:12px;"></div>
+  <div class="rw" style="margin-top:10px;border-top:1px solid var(--hair);padding-top:10px;"><span class="sm">Their net, as shared</span><span id="fdnet" style="color:var(--water);font-weight:650;">—</span></div>
+  <p class="sm dm" style="margin-top:8px;">No buy, sell or move buttons here — acting on this money is theirs alone.</p>
+  <div style="display:flex;gap:8px;margin-top:12px;"><span class="cta2 tap" id="fdclose" style="flex:1;">Close</span><span class="cta tap" data-nav="rm" style="flex:1.3;padding:12px;font-size:12.5px;">Ask Swapnil about the household</span></div>
+</div></div>
+<div class="modal" id="famaddsheet"><div class="sheet">
+  <p class="ser" style="font-size:19px;">Add a family member</p>
+  <p class="sm" style="margin-top:6px;">They approve on their own phone and choose what you see. You never get more than they gave.</p>
+  <p class="lb" style="margin-top:14px;">NAME</p>
+  <input class="fld" id="famname" type="text" autocomplete="name" placeholder="" aria-label="Name" style="width:100%;">
+  <p class="lb" style="margin-top:10px;">THEIR MOBILE</p>
+  <input class="fld" id="fammob" type="tel" inputmode="tel" autocomplete="tel" aria-label="Their mobile" style="width:100%;">
+  <p class="sm" id="famerr" style="color:var(--red);display:none;margin-top:6px;">Enter a 10-digit mobile starting 6, 7, 8 or 9.</p>
+  <p class="lb" style="margin-top:10px;">RELATIONSHIP</p>
+  <div class="seg" id="famrel" style="margin-top:6px;"><span class="on tap" data-rel="Spouse">Spouse</span><span class="tap" data-rel="Parent">Parent</span><span class="tap" data-rel="Child">Child</span><span class="tap" data-rel="Sibling">Sibling</span></div>
+  <p class="sm dm" id="famminor" style="display:none;margin-top:8px;">Minors are guardian-managed. You add what you hold in their name — there is nothing for them to approve.</p>
+  <div style="display:flex;gap:8px;margin-top:14px;"><span class="cta2 tap" id="famaddclose" style="flex:1;">Not now</span><span class="cta tap" id="famaddgo" style="flex:1.4;padding:12px;">Send them the approval</span></div>
+</div></div>
+<div class="modal" id="famotpsheet"><div class="sheet">
+  <p class="lb" style="color:var(--gold);">ON <span id="fowho">THEIR</span> PHONE · THE CHOICE IS THEIRS</p>
+  <p class="ser" style="font-size:18px;margin-top:8px;"><span id="foname">—</span> decides what you see.</p>
+  <div class="cd tap" data-fl="full" style="margin-top:12px;border-color:rgba(62,213,152,.45);"><div class="rw"><span>Full ledger</span><span class="sm" style="color:var(--pos);">chosen</span></div><p class="sm dm">Holdings, loans and cashflow — read-only, revoked in one tap</p></div>
+  <div class="cd tap" data-fl="net" style="margin-top:8px;"><div class="rw"><span>Net worth only</span><span class="sm dm"></span></div><p class="sm dm">One number, nothing underneath</p></div>
+  <div class="cd tap" data-fl="none" style="margin-top:8px;"><div class="rw"><span>Join without sharing</span><span class="sm dm"></span></div><p class="sm dm">In the family, numbers private</p></div>
+  <p class="lb" style="margin-top:14px;">OTP SENT TO <span id="fomob">—</span></p>
+  <div style="display:flex;gap:7px;margin-top:8px;" id="fobox"></div>
+  <div class="cta tap" id="foapprove" style="margin-top:14px;">Approve — their tap, not yours</div>
+</div></div>
 <div class="toast" id="toast">Done</div>
 </div>
 <script>
@@ -1940,46 +2003,46 @@
 function twn(fn,d,dl){W3.tw.push({fn:fn,t0:performance.now()+(dl||0),d:d});}
 // ---- WEALTH DATA: the island is GENERATED from this ----
 var WD={
- emg:{t:'Emergency reserve',st:'Needs attention',stc:'#D9B96A',cur:'₹4.6 L',idl:'₹12 L',gap:'₹7.4 L short',comp:38,
+ emg:{t:'Emergency reserve',st:'Needs attention',stc:'#D9B96A',cur:'₹4,60,000',idl:'₹12,00,000',gap:'₹7,40,000 short',comp:38,
    why:'Two and a half months of household cover, against the six your profile needs. Below that line, shocks get funded by debt.',
    src:'Source: the idle sandbar and the equity excess.',imp:'Impact: protection 38% → 100% · loan-dependence in emergencies ends.',act:'Fill it — ₹25,000 monthly',r:'m2'},
- eq:{t:'Equity district',st:'Overexposed',stc:'#E08A8A',cur:'71% of portfolio',idl:'55% boundary',gap:'18% above the line — ~₹12 L excess',comp:100,
+ eq:{t:'Equity district',st:'Overexposed',stc:'#E08A8A',cur:'71% of portfolio',idl:'55% boundary',gap:'18% above the line — ~₹12,00,000 excess',comp:100,
    why:'The tallest tower has grown past its ideal boundary; its top runs hot. Growth is not the issue — dependence is.',
-   src:'Destination: the reserve and the car debt.',imp:'Impact: same growth engine, without the single point of failure.',act:'Rebalance ₹12 L — watch it move',r:'rebal'},
+   src:'Destination: the reserve and the car debt.',imp:'Impact: same growth engine, without the single point of failure.',act:'Rebalance ₹12,00,000 — watch it move',r:'rebal'},
  mf:{t:'Fund grove',st:'Mostly healthy',stc:'#3ED598',cur:'14 folios · ₹1.12 Cr',idl:'8–9 distinct funds',gap:'6 duplicates · 2 laggards',comp:74,
    why:'A grove planted well, then over-planted. Six trees are the same species; two have stopped growing with their category.',
    src:'Action via Swapnil — consolidation, on record.',imp:'Impact: one fee instead of three · dead wood out.',act:'Fold the duplicates — plan',r:'rm'},
- fd:{t:'Fixed plateau',st:'Stable, leaking',stc:'#D9B96A',cur:'₹42 L at 4.9% post-tax',idl:'Same safety at ~7% kept',gap:'~₹1.05 L a year',comp:70,
+ fd:{t:'Fixed plateau',st:'Stable, leaking',stc:'#D9B96A',cur:'₹42,00,000 at 4.9% post-tax',idl:'Same safety at ~7% kept',gap:'~₹1,05,000 a year',comp:70,
    why:'Solid ground, wrong structure. The plateau holds weight but seeps value through tax.',
    src:'Route: AAA PSU bonds, online, fee shown.',imp:'Impact: same safety, better keep.',act:'Restructure with Swapnil',r:'rm'},
- ret:{t:'Retirement mountain',st:'Underallocated',stc:'#D9B96A',cur:'₹34 L',idl:'₹60 L by now',gap:'57% of its ideal height',comp:57,
+ ret:{t:'Retirement mountain',st:'Underallocated',stc:'#D9B96A',cur:'₹34,00,000',idl:'₹60,00,000 by now',gap:'57% of its ideal height',comp:57,
    why:'The long mountain grows slowly and only forward. Its summit line is lit; the rock has reached just past half.',
    src:'Source: redirected equity excess + annual step-up.',imp:'Impact: the far horizon stops depending on luck.',act:'Set the annual step-up',r:'rm'},
  gold:{t:'Mineral pad — empty',st:'Not started',stc:'#B9AEDD',cur:'None',idl:'5% stabiliser',gap:'Entire allocation',comp:0,
    why:'A pad prepared, nothing mined. A small stabilising reserve steadies the island in equity storms.',
    src:'Route: gold ETF, online.',imp:'Impact: drawdowns feel shallower.',act:'Start the 5% — via Explore',r:'nav:explore'},
- ins:{t:'The protective wall',st:'Critical',stc:'#E08A8A',cur:'₹50 L term cover',idl:'₹2.5 Cr for your family',gap:'Wall built one-fifth around',comp:20,
+ ins:{t:'The protective wall',st:'Critical',stc:'#E08A8A',cur:'₹50,00,000 term cover',idl:'₹2.5 Cr for your family',gap:'Wall built one-fifth around',comp:20,
    why:'The wall guards a fifth of the shoreline. Everything else on this island is exposed weather if you are not here.',
    src:'Closed with Swapnil, on record — one conversation.',imp:'Impact: every other structure becomes survivable.',act:'Complete the wall — see top 3',r:'nav:insur'},
- home:{t:'The house & its shadow',st:'Acceptable',stc:'#3ED598',cur:'₹78 L loan @ 8.9%',idl:'8.4% for your score',gap:'₹6.2 L over tenor',comp:55,
+ home:{t:'The house & its shadow',st:'Acceptable',stc:'#3ED598',cur:'₹78,00,000 loan at 8.9% a year',idl:'8.4% for your score',gap:'₹6,20,000 over tenor',comp:55,
    why:'The house stands on financed ground — its shadow hangs beneath it. Fair weight, slightly overpriced.',
    src:'Two lenders qualify at 748.',imp:'Impact: same house, lighter shadow.',act:'Check the switch',r:'rm'},
- car:{t:'The middle spike',st:'Needs attention',stc:'#D9B96A',cur:'₹11 L @ 9.5%',idl:'Zero — prepayable now',gap:'₹1.34 L interest ahead',comp:40,
+ car:{t:'The middle spike',st:'Needs attention',stc:'#D9B96A',cur:'₹11,00,000 at 9.5% a year',idl:'Zero — prepayable now',gap:'₹1,34,000 interest ahead',comp:40,
    why:'A depreciating asset financed at an appreciating cost, sitting beside idle money earning a third of it.',
    src:'Source: the sandbar. Penalty: zero, by RBI rule.',imp:'Impact: 22 months earlier, a monthly stream released.',act:'Prepay from idle',r:'m1'},
- cc:{t:'The cracked crystal',st:'Critical',stc:'#E08A8A',cur:'₹7.2 L revolving @ 42%',idl:'Zero, today',gap:'₹3.02 L a year burning',comp:8,
+ cc:{t:'The cracked crystal',st:'Critical',stc:'#E08A8A',cur:'₹7,20,000 revolving at 42% a year',idl:'Zero, today',gap:'₹3,02,000 a year burning',comp:8,
    why:'The deepest, sharpest thing under your island — and the only one that grows on its own. Every month it stands undoes a month of everything above.',
-   src:'Source: idle cash — clears it and leaves ₹21 L.',imp:'Impact: the water itself recedes; score heads to 770.',act:'Shatter it today',r:'m1'},
- tax:{t:'The shore drain',st:'Time-bound',stc:'#D9B96A',cur:'₹3.4 L due 15 Sep',idl:'Diarised, funded',gap:'1%/month if missed',comp:0,
+   src:'Source: idle cash — clears it and leaves ₹21,00,000.',imp:'Impact: the water itself recedes; score heads to 770.',act:'Shatter it today',r:'m1'},
+ tax:{t:'The shore drain',st:'Time-bound',stc:'#D9B96A',cur:'₹3,40,000 due 15 Sep',idl:'Diarised, funded',gap:'1%/month if missed',comp:0,
    why:'A drain opens mid-September whether you plan for it or not. Planned, it is plumbing; unplanned, it is leakage with interest.',
    src:'One diarised transfer, CA copy attached.',imp:'Impact: the drain becomes a scheduled pipe.',act:'Diarise 1 Sep',r:'toast:Diarised — 1 Sep transfer, amount locked.'},
- intl:{t:'The dollar pier',st:'Underallocated',stc:'#D9B96A',cur:'$21.4k (₹17.9L) · RSUs + ETF',idl:'10% global sleeve (~₹27L)',gap:'₹9L short of the sleeve',comp:66,
+ intl:{t:'The dollar pier',st:'Underallocated',stc:'#D9B96A',cur:'$21,400 (₹17,90,000) · RSUs + ETF',idl:'10% global sleeve (~₹27,00,000)',gap:'₹9,00,000 short of the sleeve',comp:66,
    why:'Everything else you own is one country, one currency. The pier is where wealth ships out of single-currency risk — and where the 2034 dollar goal gets paid in dollars.',
    src:'Route: next RSU vest stays in dollars + LRS top-up.',imp:'Impact: currency risk on the far islet ends.',act:'Open the dollar sleeve',r:'nav:intl'},
  goal:{t:'The far islet · Kiara 2034',st:'Not started',stc:'#B9AEDD',cur:'Foundation only',idl:'US degree · bills in dollars',gap:'No plan, no hedge',comp:5,
    why:'A named goal with no bridge is scenery — and this one bills in dollars, so rupees saved for it carry currency risk. A monthly dollar plank makes it a destination.',
    src:'Defined with Swapnil — amount, date, dollar sleeve.',imp:'Impact: the islet joins the island — hedged.',act:'Fund it in dollars',r:'nav:intl'},
- river:{t:'The river · cashflow',st:'Healthy',stc:'#3ED598',cur:'₹1.9 L free this month',idl:'Directed, not pooled',gap:'Spends 9% lighter than June',comp:82,
+ river:{t:'The river · cashflow',st:'Healthy',stc:'#3ED598',cur:'₹1,90,000 free this month',idl:'Directed, not pooled',gap:'Spends 9% lighter than June',comp:82,
    why:'The river runs strong and clean. Its only flaw: it pools at the sandbar instead of feeding the reservoir.',
    src:'Auto-route: reserve first, then growth.',imp:'Impact: every month builds something by default.',act:'Set the auto-route',r:'m2'}
 };
@@ -2152,7 +2215,7 @@
   if(W3.emgWater)twn(function(p){W3.emgWater.position.y=W3.emgWater.userData.base.y+p*(0.24*0.5);},1600,1200);
   twn(function(p){W3.car.scale.set(1-p*.3,1-p*.35,1-p*.3);},1600,1200);
   twn(function(p){W3.water.position.y=-p*.06;},1400,2200);
-  setTimeout(function(){toast('Rebalanced preview — ₹12L moved. This is your island in 90 days.');},2400);
+  setTimeout(function(){toast('Rebalanced preview — ₹12,00,000 moved. This is your island in 90 days.');},2400);
 }
 function setTT(t2){
   W3.tt=t2;restoreIsle();
@@ -2162,7 +2225,22 @@
   if(t2!=='now')setTimeout(function(){toast(t2==='y1'?'One year, untouched: growth grows — and so does the crystal.':'Goal maturity, untouched: the crystal outgrows the towers. Act now.');},850);
 }
 var scr=['entry','scan','scanning','preparing','health','home','wealth','explore','fund','rm','reports','chat','world','folios','stocks','holding','pms','aif','bond','order','oconfirm','pg2','osuccess','equity','cash','liab','insur','insdet','insform','splash','intro','otp','bio','icat','nudges','listing','home0','health0','wealth0','cashflow','family','refer','lens','intl','consent','limited','mfonboard','login','bioset','kyc1','kyc2','kyc3','kyc4','kyc5','kyc6','kyc7','kyc8','kyc9','kyc10','book','privacy','terms','delete','gloss','pan'];
-var NETT_VER='1.7';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
+
+function setMood(pct){var pill=document.getElementById('niftypill'),ph=document.querySelector('.ph');
+ var vol=pct<=-1;var sign=(pct>0?'+':'')+pct.toFixed(1)+'%';
+ if(pill){pill.textContent='NIFTY '+sign+' \u00b7 '+(vol?'VOLATILE':'CALM');pill.style.borderColor=vol?'rgba(224,138,138,.45)':'rgba(62,213,152,.35)';pill.style.color=vol?'var(--red)':'var(--pos)';}
+ if(ph){ph.classList.toggle('stormy',vol);}
+ var md=document.getElementById('mood'),ms=document.getElementById('moodsub');
+ if(md&&ms){if(vol){md.innerHTML='Nifty fell '+Math.abs(pct).toFixed(1)+'% today.<br>Your plan already knew.';ms.textContent='Nothing needs selling. Your SIPs buy this dip on schedule, and the one thing worth doing today is below.';}
+ else{md.innerHTML='Your money is<br>calm tonight.';ms.textContent='Nothing needs you. SIPs cleared, spends steady, one quiet opportunity below.';}}}
+window.setNifty=setMood;
+try{var _np=parseFloat(new URLSearchParams(location.search).get('nifty'));if(!isNaN(_np))setTimeout(function(){setMood(_np);},400);else setTimeout(function(){setMood(0.4);},400);}catch(e){}
+function famDet(nm,rows,net){document.getElementById('fdname').textContent=nm;document.getElementById('fdname2').textContent=nm;
+ var h='';rows.forEach(function(r){h+='<div class="rw" style="margin-top:6px;"><span class="sm">'+r[0]+'</span><span style="color:var(--tx);">'+r[1]+'</span></div>';});
+ document.getElementById('fdrows').innerHTML=h;document.getElementById('fdnet').textContent=net;
+ document.getElementById('famdetsheet').classList.add('on');}
+function showErr(t,b,ref){document.getElementById('errtitle').textContent=t;document.getElementById('errbody').innerHTML=b;document.getElementById('errref').textContent='ref '+ref;document.getElementById('errsheet').classList.add('on');}
+var NETT_VER='1.13';var stack=[],cur='splash',tabs={home:1,wealth:1,explore:1,rm:1,world:1,health:1};
 function _go(id){
   if(NODATA&&(id==='home'||id==='health'||id==='wealth'))id=id+'0';
   scr.forEach(function(k){var el=document.getElementById('s-'+k);if(el)el.classList.remove('on');});
@@ -2227,19 +2305,19 @@
   else b.style.display='none';
 }
 var HOLD={
- flexi:{do:'No action — SIP continues, 5 years ahead of category. Don\u2019t touch what works.',doc:'pos',n:'Flexi Cap Fund',fo:'Folio 4482911/22 · Regular · Growth',inv:'₹14.8 L',cur:'₹22.4 L',del:'+₹7.6 L · +51%',gp:66,xirr:'15.1%',xc:'#3ED598',cat:'+1.9% ahead of category',since:'Mar 2019 · 6.3 yrs',sip:'₹40,000 monthly · next 5 Aug',lag:null,
+ flexi:{do:'No action — SIP continues, 5 years ahead of category. Don\u2019t touch what works.',doc:'pos',n:'Flexi Cap Fund',fo:'Folio 4482911/22 · Regular · Growth',inv:'₹14,80,000',cur:'₹22,40,000',del:'+₹7,60,000 · +51%',gp:66,xirr:'15.1%',xc:'#3ED598',cat:'+1.9% ahead of category',since:'Mar 2019 · 6.3 years',sip:'₹40,000 monthly · next 5 Aug',lag:null,
    tx:[['SIP ₹40,000','5 Jul 2026'],['SIP ₹40,000','5 Jun 2026'],['Lumpsum ₹2,00,000','12 Feb 2026'],['SIP ₹40,000','5 May 2026']]},
- blue:{do:'Action: fold into one — same top-10 as two other funds. Plan with Swapnil, free.',doc:'amb',n:'Bluechip Fund',fo:'Folio 2201458/91 · Regular · Growth',inv:'₹13.6 L',cur:'₹18.1 L',del:'+₹4.5 L · +33%',gp:75,xirr:'12.9%',xc:'#3ED598',cat:'in line with category',since:'Aug 2020',sip:'₹25,000 monthly · next 5 Aug',lag:'Overlap group A — holds the same top-10 as two of your other funds. One portfolio, three fees.',
+ blue:{do:'Action: fold into one — same top-10 as two other funds. Plan with Swapnil, free.',doc:'amb',n:'Bluechip Fund',fo:'Folio 2201458/91 · Regular · Growth',inv:'₹13,60,000',cur:'₹18,10,000',del:'+₹4,50,000 · +33%',gp:75,xirr:'12.9%',xc:'#3ED598',cat:'in line with category',since:'Aug 2020',sip:'₹25,000 monthly · next 5 Aug',lag:'Overlap group A — holds the same top-10 as two of your other funds. One portfolio, three fees.',
    tx:[['SIP ₹25,000','5 Jul 2026'],['SIP ₹25,000','5 Jun 2026'],['SIP ₹25,000','5 May 2026'],['Lumpsum ₹1,00,000','3 Jan 2026']]},
- lgmid:{do:'Action: fold into one — overlap group A. One portfolio deserves one fee.',doc:'amb',n:'Large &amp; Mid Fund',fo:'Folio 887201/45 · Regular · Growth',inv:'₹11.9 L',cur:'₹14.6 L',del:'+₹2.7 L · +23%',gp:81,xirr:'12.2%',xc:'#3ED598',cat:'in line with category',since:'Jan 2021',sip:'₹20,000 monthly · next 5 Aug',lag:'Overlap group A — consider folding into one holding.',
+ lgmid:{do:'Action: fold into one — overlap group A. One portfolio deserves one fee.',doc:'amb',n:'Large &amp; Mid Fund',fo:'Folio 887201/45 · Regular · Growth',inv:'₹11,90,000',cur:'₹14,60,000',del:'+₹2,70,000 · +23%',gp:81,xirr:'12.2%',xc:'#3ED598',cat:'in line with category',since:'Jan 2021',sip:'₹20,000 monthly · next 5 Aug',lag:'Overlap group A — consider folding into one holding.',
    tx:[['SIP ₹20,000','5 Jul 2026'],['SIP ₹20,000','5 Jun 2026'],['SIP ₹20,000','5 May 2026'],['SIP ₹20,000','5 Apr 2026']]},
- foc:{do:'Action: fold into one — overlap group A.',doc:'amb',n:'Focused 30',fo:'Folio 5541092/07 · Regular · Growth',inv:'₹8.9 L',cur:'₹11.8 L',del:'+₹2.9 L · +33%',gp:75,xirr:'13.4%',xc:'#3ED598',cat:'+0.6% ahead of category',since:'Jun 2021',sip:'No active SIP',lag:'Overlap group A.',
+ foc:{do:'Action: fold into one — overlap group A.',doc:'amb',n:'Focused 30',fo:'Folio 5541092/07 · Regular · Growth',inv:'₹8,90,000',cur:'₹11,80,000',del:'+₹2,90,000 · +33%',gp:75,xirr:'13.4%',xc:'#3ED598',cat:'+0.6% ahead of category',since:'Jun 2021',sip:'No active SIP',lag:'Overlap group A.',
    tx:[['Lumpsum ₹3,00,000','9 Oct 2025'],['Lumpsum ₹2,50,000','14 Mar 2025'],['Lumpsum ₹3,40,000','2 Jun 2021']]},
- mid:{do:'Action: switch this quarter — 3 years behind category. Swapnil reviews it free.',doc:'red',n:'Midcap Opportunities',fo:'Folio 118845/63 · Regular · Growth',inv:'₹8.4 L',cur:'₹9.2 L',del:'+₹0.8 L · +9.5%',gp:91,xirr:'6.1%',xc:'#E08A8A',cat:'lags category by 3.4%/yr over 3y',since:'Feb 2022',sip:'₹15,000 monthly · next 5 Aug',lag:'Three years behind its peers. Every month here is a month your money runs slower than its category. Switch candidate — Swapnil reviews it free.',
+ mid:{do:'Action: switch this quarter — 3 years behind category. Swapnil reviews it free.',doc:'red',n:'Midcap Opportunities',fo:'Folio 118845/63 · Regular · Growth',inv:'₹8,40,000',cur:'₹9,20,000',del:'+₹80,000 · +9.5%',gp:91,xirr:'6.1%',xc:'#E08A8A',cat:'lags category by 3.4% a year over 3y',since:'Feb 2022',sip:'₹15,000 monthly · next 5 Aug',lag:'Three years behind its peers. Every month here is a month your money runs slower than its category. Switch candidate — Swapnil reviews it free.',
    tx:[['SIP ₹15,000','5 Jul 2026'],['SIP ₹15,000','5 Jun 2026'],['SIP ₹15,000','5 May 2026'],['Lumpsum ₹4,00,000','18 Feb 2022']]},
- val:{do:'Action: switch this quarter — 3 years behind category.',doc:'red',n:'Value Fund',fo:'Folio 902271/18 · Regular · Growth',inv:'₹7.5 L',cur:'₹7.9 L',del:'+₹0.4 L · +5.3%',gp:95,xirr:'5.8%',xc:'#E08A8A',cat:'lags category by 3.1%/yr over 3y',since:'Nov 2022',sip:'No active SIP',lag:'Underperformer three years running. Switch candidate.',
+ val:{do:'Action: switch this quarter — 3 years behind category.',doc:'red',n:'Value Fund',fo:'Folio 902271/18 · Regular · Growth',inv:'₹7,50,000',cur:'₹7,90,000',del:'+₹40,000 · +5.3%',gp:95,xirr:'5.8%',xc:'#E08A8A',cat:'lags category by 3.1% a year over 3y',since:'Nov 2022',sip:'No active SIP',lag:'Underperformer three years running. Switch candidate.',
    tx:[['Lumpsum ₹4,00,000','21 Nov 2022'],['Lumpsum ₹3,50,000','8 Jan 2023']]},
- elss:{do:'No action until Feb — lock-in holds. Then review with fresh eyes.',doc:'pos',n:'ELSS Tax Saver',fo:'Folio 6620031/55 · Regular · Growth',inv:'₹4.8 L',cur:'₹6.4 L',del:'+₹1.6 L · +33%',gp:75,xirr:'13.0%',xc:'#3ED598',cat:'in line with category',since:'Feb 2023',sip:'₹12,500 monthly · next 5 Aug',lag:'Lock-in: units free progressively — earliest tranche unlocks next Feb.',
+ elss:{do:'No action until Feb — lock-in holds. Then review with fresh eyes.',doc:'pos',n:'ELSS Tax Saver',fo:'Folio 6620031/55 · Regular · Growth',inv:'₹4,80,000',cur:'₹6,40,000',del:'+₹1,60,000 · +33%',gp:75,xirr:'13.0%',xc:'#3ED598',cat:'in line with category',since:'Feb 2023',sip:'₹12,500 monthly · next 5 Aug',lag:'Lock-in: units free progressively — earliest tranche unlocks next Feb.',
    tx:[['SIP ₹12,500','5 Jul 2026'],['SIP ₹12,500','5 Jun 2026'],['SIP ₹12,500','5 May 2026'],['SIP ₹12,500','5 Apr 2026']]}
 };
 var curH='flexi',ORD={type:'mf',mode:'sip',amt:'₹25,000',name:'Flexi Cap Fund'};
@@ -2277,20 +2355,20 @@
   document.getElementById('oamts').innerHTML=chips.map(function(c,i){return '<span class="tag tap'+(i===1?' on':'')+'" data-oa="'+c+'"'+(i===1?' style="border-color:rgba(236,236,241,.4);"':'')+'>'+c+'</span>';}).join('');
   ORD.amt=chips[1];
   document.getElementById('oamt').textContent=chips[1];
-  document.getElementById('ofee').textContent=(type==='bond')?'0.4% inside the price — ₹404 on this order':(type==='cash')?'0.10%/yr trail on liquid — inside NAV, itemised':'0.75%/yr trail, inside NAV';
+  document.getElementById('ofee').textContent=(type==='bond')?'0.4% inside the price — ₹404 on this order':(type==='cash')?'0.10% a year trail on liquid — inside NAV, itemised':'0.75% a year trail, inside NAV';
   stack.push(cur);go('order');
 }
 var INS={
  secure:{n:'SecureLife iTerm',prem:'₹2,890',sub:'₹2 Cr cover to age 60 · non-smoker rate · our pick for claim record',
-  fee:'₹8,200 first year + 2.4%/yr on renewals — paid by the insurer, never added to your premium.',
-  verd:'Verdict: the claim record is the product. 99.1% paid at 1.2-day median settlement is worth ₹250/mo over the cheapest — your family collects it, not you.',
-  rows:[['Cover','₹2 Cr, level, to age 60'],['Claims paid','99.1% · 1.2-day median settlement'],['Medical','Tele-call in 48h · no physical test under ₹2.5 Cr'],['Excludes','Suicide in year 1 · undisclosed conditions'],['Add-on','Critical illness ₹25L @ +₹640/mo'],['Payout','Lump sum or monthly income — nominee chooses']]},
- sent:{n:'Sentinel Protect+',prem:'₹2,640',sub:'₹2 Cr cover to age 60 · free ₹50L accident rider',
-  fee:'₹7,400 first year + 2.2%/yr on renewals — from the insurer, not your pocket.',
+  fee:'₹8,200 first year + 2.4% a year on renewals — paid by the insurer, never added to your premium.',
+  verd:'Verdict: the claim record is the product. 99.1% paid at 1.2-day median settlement is worth ₹250 a month over the cheapest — your family collects it, not you.',
+  rows:[['Cover','₹2 Cr, level, to age 60'],['Claims paid','99.1% · 1.2-day median settlement'],['Medical','Tele-call in 48h · no physical test under ₹2.5 Cr'],['Excludes','Suicide in year 1 · undisclosed conditions'],['Add-on','Critical illness ₹25,00,000 @ +₹640 a month'],['Payout','Lump sum or monthly income — nominee chooses']]},
+ sent:{n:'Sentinel Protect+',prem:'₹2,640',sub:'₹2 Cr cover to age 60 · free ₹50,00,000 accident rider',
+  fee:'₹7,400 first year + 2.2% a year on renewals — from the insurer, not your pocket.',
   verd:'Verdict: strong middle path — the free accident rider is real value if your commute is real risk. Claim record a notch below SecureLife.',
-  rows:[['Cover','₹2 Cr + ₹50L accident rider, free'],['Claims paid','98.4% · 2.3-day median'],['Medical','Tele-call in 48h'],['Excludes','Standard — suicide yr 1, non-disclosure'],['Payout','Lump sum or staggered']]},
+  rows:[['Cover','₹2 Cr + ₹50,00,000 accident rider, free'],['Claims paid','98.4% · 2.3-day median'],['Medical','Tele-call in 48h'],['Excludes','Standard — suicide yr 1, non-disclosure'],['Payout','Lump sum or staggered']]},
  natl:{n:'NationalPro Term',prem:'₹2,410',sub:'₹2 Cr cover to age 60 · lowest premium of the three',
-  fee:'₹6,900 first year + 2.0%/yr on renewals — from the insurer.',
+  fee:'₹6,900 first year + 2.0% a year on renewals — from the insurer.',
   verd:'Verdict: cheapest is honest here — the trade-off is settlement speed (4.1 days median). If premium decides it, this still completes your wall.',
   rows:[['Cover','₹2 Cr, level, to age 60'],['Claims paid','97.2% · 4.1-day median'],['Medical','Physical test slot within 5 days'],['Excludes','Standard exclusions'],['Payout','Lump sum']]}
 };
@@ -2305,29 +2383,29 @@
   stack.push(cur);go('insdet');
 }
 var EQ={
- mer:{do:'Action: trim to a 20% cap over 5 years — start this quarter. Banks ₹6L of gains, keeps the thesis.',doc:'amb',n:'Meridian Energy',sec:'Utilities · power generation + transmission',inv:'₹19.8 L',cur:'₹28.6 L',del:'+44% · XIRR 21.3%',
-  alert:'42% of your stock book sits here. Good company — oversized position. A 30% drawdown is a ₹8.6L hole.',
+ mer:{do:'Action: trim to a 20% cap over 5 years — start this quarter. Banks ₹6,00,000 of gains, keeps the thesis.',doc:'amb',n:'Meridian Energy',sec:'Utilities · power generation + transmission',inv:'₹19,80,000',cur:'₹28,60,000',del:'+44% · 21.3% a year',
+  alert:'42% of your stock book sits here. Good company — oversized position. A 30% fall is a ₹8,60,000 hole.',
   biz:'Generates and transmits power across four states; retail solar under SuryaOne, grid services under MeridianGrid. 62% regulated revenue — the boring, dependable kind.',
-  num:[['Growth pattern','20%+ profit growth in 5 of last 8 quarters'],['PE 18.4','12% below top-quartile peers (20.9)'],['ROE','16% · improving 3 yrs straight'],['Debt/equity','0.8 — normal for utilities']],
+  num:[['Growth pattern','20%+ profit growth in 5 of last 8 quarters'],['PE 18.4','12% below top-quartile peers (20.9)'],['ROE','16% · improving 3 years straight'],['Debt/equity','0.8 — normal for utilities']],
   mgmt:'FY26 call: capex pivoting to solar + storage; guiding 15% capacity growth by FY28. Promoter stake 54%, zero pledge — per Q1 BSE filing.',
   news:[['Won 1.2 GW storage tender','28 Jun'],['Promoter stake unchanged, no pledge','Q1 filing']],
-  verd:'Verdict: the thesis is intact — the position size is the only problem. Trimming to a 20% cap banks ₹6L of gains and keeps the story.',
+  verd:'Verdict: the thesis is intact — the position size is the only problem. Trimming to a 20% cap banks ₹6,00,000 of gains and keeps the story.',
   act:'Plan the trim — with Swapnil',r:'rm'},
- apex:{do:'No action — sized right, priced fair, growing. Which is the point.',doc:'pos',n:'Apex Banks',sec:'Private banking',inv:'₹8.9 L',cur:'₹11.2 L',del:'+26% · XIRR 14.8%',alert:null,
+ apex:{do:'No action — sized right, priced fair, growing. Which is the point.',doc:'pos',n:'Apex Banks',sec:'Private banking',inv:'₹8,90,000',cur:'₹11,20,000',del:'+26% · 14.8% a year',alert:null,
   biz:'Mid-size private bank — retail lending 68%, deposits growing ahead of system. No exotic book.',
   num:[['Growth pattern','18%+ profit growth in 6 of last 8 quarters'],['PE 14.1','below peer set (16.2)'],['GNPA','1.1% — clean book'],['Position size','16% of stock book — sized right']],
   mgmt:'Guides 17% credit growth FY27; branch expansion approved by RBI in May.',
   news:[['RBI approves 120 new branches','May'],['Deposit growth 19% YoY','Q1 results']],
   verd:'Verdict: sized right, priced fair, growing. Nothing to do — which is the point.',
   act:'Nothing needed — set an alert instead',r:'toast:Wise. Alert is the right action here.'},
- north:{do:'Hold — review on next results. FDA risk is behind it.',doc:'pos',n:'Northline Pharma',sec:'Pharma · generics + CDMO',inv:'₹7.1 L',cur:'₹8.8 L',del:'+24% · XIRR 13.9%',alert:null,
+ north:{do:'Hold — review on next results. FDA risk is behind it.',doc:'pos',n:'Northline Pharma',sec:'Pharma · generics + CDMO',inv:'₹7,10,000',cur:'₹8,80,000',del:'+24% · 13.9% a year',alert:null,
   biz:'US generics plus a growing contract-manufacturing arm (31% of revenue, higher margin).',
   num:[['Growth pattern','20%+ in 4 of last 8 quarters — CDMO driving it'],['PE 22','in line with peers'],['US exposure','58% of revenue — currency helps and hurts']],
   mgmt:'Post-FDA clearance, management guides CDMO to 40% of revenue by FY28.',
   news:[['US FDA clears Vizag plant — zero observations','Mar'],['CDMO deal with EU major','Jun']],
   verd:'Verdict: the FDA clearance removed the main risk. Hold; review if CDMO stalls two quarters.',
   act:'Hold — review on results',r:'toast:Diarised — flagged for next results day.'},
- vist:{do:'No new money at this price — add only on a 10% dip.',doc:'amb',n:'Vistara Consumer',sec:'FMCG · foods',inv:'₹6.4 L',cur:'₹7.4 L',del:'+16% · XIRR 9.8%',alert:null,
+ vist:{do:'No new money at this price — add only on a 10% dip.',doc:'amb',n:'Vistara Consumer',sec:'FMCG · foods',inv:'₹6,40,000',cur:'₹7,40,000',del:'+16% · 9.8% a year',alert:null,
   biz:'Regional foods brand going national; distribution-led story.',
   num:[['Growth pattern','mid-teens, steady'],['PE 34','expensive vs peers 29 — priced for perfection']],
   mgmt:'Targets 2x distribution reach by FY28.',
@@ -2336,14 +2414,14 @@
   act:'Price alert at −10%',r:'toast:Alert set — you buy weakness, not headlines.'}
 };
 var LB={
- cc:{do:'Action today: pay in full from idle — ₹3.02L/yr stops burning, score heads to 770.',n:'Credit card revolving',sub:'AnyBank Platinum · statement 28 Jun',rows:[['Outstanding','₹7.2 L'],['Rate','42%/yr — ₹3.02L a year burning'],['Minimum due (the trap)','₹36,000 — paying only this costs ₹15.9k/mo in interest'],['Due date','18 Jul — 6 days away'],['Score impact','utilisation 68% — the single drag on your 748']],
-  why:'Your idle cash clears this today and still leaves ₹21L. No investment on this platform outruns 42%.',
-  act:'Pay in full from idle — draft ready',r:'toast:Payoff draft ready — ₹7.2L, one fingerprint. Score heads to 770.'},
- car:{do:'Action this month: prepay from idle — ₹1.34L saved, ₹23.8k/month released, zero penalty.',n:'Car loan',sub:'HDFC · floating 9.5%',rows:[['Outstanding','₹11 L'],['EMI','₹23,800 · next 10 Aug'],['Tenor left','52 months'],['Interest remaining','₹2.4 L on current path'],['Prepay penalty','Zero — floating rate, RBI rule']],
-  why:'Prepaying from idle saves ₹1.34L and closes it 22 months early — releasing ₹23,800 a month that can feed the reserve instead.',
-  act:'Prepay from idle — see the math',r:'toast:Prepay draft: ₹11L clears it · ₹1.34L saved · ₹23.8k/mo released.'},
- home:{do:'Action this quarter: switch to 8.4% — ₹6.2L saved over tenor, same house, same EMI date.',n:'Home loan',sub:'LIC HF · floating 8.9%',rows:[['Outstanding','₹78 L'],['EMI','₹68,400 · next 7 Aug'],['Tenor left','16.4 years'],['Interest remaining','₹64 L on current path'],['Your rate vs market','8.9% vs 8.4% offered for your 748 score']],
-  why:'Two lenders qualify you at 8.4% — a switch saves ₹6.2L over the remaining tenor, same house, same EMI date. At 770+, another 15bps opens.',
+ cc:{do:'Action today: pay in full from idle — ₹3,02,000 a year stops burning, score heads to 770.',n:'Credit card revolving',sub:'AnyBank Platinum · statement 28 Jun',rows:[['Outstanding','₹7,20,000'],['Rate','42% a year — ₹3,02,000 a year burning'],['Minimum due (the trap)','₹36,000 — paying only this costs ₹15,900 a month in interest'],['Due date','18 Jul — 6 days away'],['Score impact','utilisation 68% — the single drag on your 748']],
+  why:'Your idle cash clears this today and still leaves ₹21,00,000. No investment on this platform outruns 42%.',
+  act:'Pay in full from idle — draft ready',r:'toast:Payoff draft ready — ₹7,20,000, one fingerprint. Score heads to 770.'},
+ car:{do:'Action this month: prepay from idle — ₹1,34,000 saved, ₹23,800/month released, zero penalty.',n:'Car loan',sub:'HDFC · floating 9.5%',rows:[['Outstanding','₹11,00,000'],['EMI','₹23,800 · next 10 Aug'],['Tenor left','52 months'],['Interest remaining','₹2,40,000 on current path'],['Prepay penalty','Zero — floating rate, RBI rule']],
+  why:'Prepaying from idle saves ₹1,34,000 and closes it 22 months early — releasing ₹23,800 a month that can feed the reserve instead.',
+  act:'Prepay from idle — see the math',r:'toast:Prepay draft: ₹11,00,000 clears it · ₹1,34,000 saved · ₹23,800 a month released.'},
+ home:{do:'Action this quarter: switch to 8.4% — ₹6,20,000 saved over tenor, same house, same EMI date.',n:'Home loan',sub:'LIC HF · floating 8.9%',rows:[['Outstanding','₹78,00,000'],['EMI','₹68,400 · next 7 Aug'],['Tenor left','16.4 years'],['Interest remaining','₹64,00,000 on current path'],['Your rate vs market','8.9% vs 8.4% offered for your 748 score']],
+  why:'Two lenders qualify you at 8.4% — a switch saves ₹6,20,000 over the remaining tenor, same house, same EMI date. At 770+, another 15bps opens.',
   act:'Check the switch — two offers',r:'rm'}
 };
 function openEq(id){
@@ -2379,7 +2457,7 @@
 function chAdd(html,cls){var d=document.createElement('div');d.className='msg'+(cls?' '+cls:'');d.innerHTML=html;var t=document.getElementById('chthread');t.appendChild(d);t.scrollTop=t.scrollHeight;}
 function chFlow(k){
  if(k==='k'){chAdd('Can I plan Kiara\u2019s 2034 goal?','me');
-  chAdd('Kiara\u2019s US degree, 2034 — target \u2248 $140k (~\u20b91.2 Cr at today\u2019s rate; a dollar sleeve removes the \u201ctoday\u2019s-rate\u201d risk).<br><br>From your cashflow: <b>\u20b938,000/month</b> reaches it by Aug 2033. You free \u20b91.9L a month — this fits twice over.<br><br>Verdict: feasible without touching anything else.<br><br><span class="cta2 tap" id="chgoal" style="display:inline-block;padding:9px 14px;font-size:12px;">Start the dollar goal</span>&nbsp;<span class="cta2 tap" data-ch="rm" style="display:inline-block;padding:9px 14px;font-size:12px;">Bring Swapnil in</span>');}
+  chAdd('Kiara\u2019s US degree, 2034 — target \u2248 $140,000 (~\u20b91.2 Cr at today\u2019s rate; a dollar sleeve removes the \u201ctoday\u2019s-rate\u201d risk).<br><br>From your cashflow: <b>\u20b938,000/month</b> reaches it by Aug 2033. You free \u20b91.9L a month — this fits twice over.<br><br>Verdict: feasible without touching anything else.<br><br><span class="cta2 tap" id="chgoal" style="display:inline-block;padding:9px 14px;font-size:12px;">Start the dollar goal</span>&nbsp;<span class="cta2 tap" data-ch="rm" style="display:inline-block;padding:9px 14px;font-size:12px;">Bring Swapnil in</span>');}
  if(k==='f'){chAdd('I have \u20b93L free — what should I do?','me');
   chAdd('From your report, in order of return:<br><br><b>1.</b> Your card burns 42% — \u20b93L against it saves <b>\u20b91.26L/yr</b>. Nothing else beats that.<br><b>2.</b> If the card clears this month anyway: \u20b91L to the reserve, \u20b92L one-time into Flexi Cap.<br><br>Pick one — I\u2019ll set it up now:<br><br><span class="cta2 tap" data-lb="cc" style="display:inline-block;padding:9px 14px;font-size:12px;color:var(--red);border-color:rgba(224,138,138,.5);">\u20b93L to the card</span>&nbsp;<span class="cta2 tap" data-ord="cash" style="display:inline-block;padding:9px 14px;font-size:12px;">\u20b91L to reserve</span>&nbsp;<span class="cta2 tap" data-ord="mf" style="display:inline-block;padding:9px 14px;font-size:12px;">\u20b92L to Flexi Cap</span>');}
  if(k==='h'){chAdd('Can we afford a bigger house?','me');
@@ -2388,20 +2466,20 @@
   chAdd('Reading this now, Rahul. The sequencing is right — card first, then the reserve. I\u2019ll send the written plan tonight, on record. Anything you want included?','rm2');}
 }
 var TH=[
- {tx:'₹28.4L is sleeping across savings and your broker ledger. You could ',act:'let it work',msg:'Sweep drafted — liquid first, prepay plan next. Swapnil confirms sequence.'},
+ {tx:'₹28,40,000 is sleeping across savings and your broker ledger. You could ',act:'let it work',msg:'Sweep drafted — liquid first, prepay plan next. Swapnil confirms sequence.'},
  {tx:'Your card revolve costs more per year than any fund here earns. You could ',act:'end it today',msg:'Full payoff draft ready from idle cash — one confirmation on the fixed rail.',why:'card revolve 42% · idle cash available'},
  {tx:'Advance tax lands mid-September, and it does not negotiate. You could ',act:'diarise it now',msg:'Diarised — 1 Sep transfer, amount locked, CA copy attached.',why:'advance tax 15 Sep · penalty 1%/month'},
  {tx:'Six of your funds are the same portfolio wearing different names. You could ',act:'fold them into one',msg:'Overlap map sent to Swapnil — consolidation plan in review.'},
- {tx:'Your dining and travel spend earns almost nothing back. You could ',act:'route it smarter',msg:'Card-swap comparison ready — same spend, about ₹40k a year returns.',why:'dining + travel spend pattern'},
+ {tx:'Your dining and travel spend earns almost nothing back. You could ',act:'route it smarter',msg:'Card-swap comparison ready — same spend, about ₹40,000 a year returns.',why:'dining + travel spend pattern'},
  {tx:'Your RSUs vest on the 15th — $8,200 lands in dollars. You could ',act:'keep it in dollars',msg:'Vest plan drafted — dollars stay dollars until you decide. Swapnil confirms.',why:'RSUs · TechCorp · studied abroad · Kiara 2034'},
  {tx:'You understand startups better than most — a pre-IPO sleeve fits you, capped at 5%. You could ',act:'see the sleeve',msg:'Sleeve brief sent — 5% cap, 4-year lock named first. Swapnil walks it.',why:'IT · Growth risk · age 38'},
- {tx:'Meridian is 42% of your book. No panic exits — a five-year ladder does it. You could ',act:'set the 8%-a-year trim',msg:'Trim ladder drafted — ~8%/yr into the grove, on record. Horizon does the diversifying.',why:'single stock 42% · horizon 5y+'}
+ {tx:'Meridian is 42% of your book. No panic exits — a five-year ladder does it. You could ',act:'set the 8%-a-year trim',msg:'Trim ladder drafted — ~8% a year into the grove, on record. Horizon does the diversifying.',why:'single stock 42% · horizon 5y+'}
 ];
 var ti=0;
 function setTh(){
   var t=TH[ti];
   var w=document.getElementById('twhy');if(w)w.innerHTML='Because you: '+(t.why||'')+' <span class="lnk tap" data-nav="lens" style="margin-left:6px;">tune Arth\u2019s read</span>';
-  document.getElementById('thought').innerHTML=t.tx+'<span class="lnk tap" id="lw">'+t.act+'</span>, or <span class="lnk tap" id="lwhy">ask me why</span>, or <span class="lnk tap" id="llb">leave it be</span>.';
+  document.getElementById('thought').innerHTML=t.tx+'<span class="lnk tap" id="lw">'+t.act+'</span>, or <span class="lnk tap" id="lwhy">see the working</span>, or <span class="lnk tap" id="llb">leave it be</span>.';
 }
 function nextTh(){ti=(ti+1)%TH.length;setTh();}
 var CONSENT={bank:true,mf:true,bureau:true};
@@ -2411,18 +2489,18 @@
 window.buOK=false;window.buSkip=false;window.MISS=[];
 var NODATA=false;
 var LS=[
- {n:'Flexi Cap Fund',cat:'mf',oc:'grow',ret:15.1,s:'5y XIRR 15.1% · ahead of category 5 years · trail 0.75%/yr',a:['Invest','data-ord','mf']},
- {n:'Nifty 50 Index Fund',cat:'mf',oc:'grow',ret:12.8,s:'5y 12.8% · trail 0.20%/yr — the cheap core',a:['Invest','data-ord','mf']},
+ {n:'Flexi Cap Fund',cat:'mf',oc:'grow',ret:15.1,s:'15.1% a year over 5 years · ahead of category · trail 0.75% a year',a:['Invest','data-ord','mf']},
+ {n:'Nifty 50 Index Fund',cat:'mf',oc:'grow',ret:12.8,s:'5y 12.8% · trail 0.20% a year — the cheap core',a:['Invest','data-ord','mf']},
  {n:'Bluechip Fund',cat:'mf',oc:'grow',ret:12.9,s:'In line with category · overlap group A — check before adding',a:['Invest','data-ord','mf']},
- {n:'ELSS Tax Saver',cat:'mf',oc:'tax',ret:13.0,s:'80C · 3-year lock · 13.0% XIRR',a:['Invest','data-ord','mf']},
- {n:'Liquid Fund — sweep',cat:'mf',oc:'park',ret:6.8,s:'~6.8% · withdraw any day · trail 0.10%/yr',a:['Sweep','data-ord','cash']},
+ {n:'ELSS Tax Saver',cat:'mf',oc:'tax',ret:13.0,s:'80C · 3-year lock · 13.0% a year',a:['Invest','data-ord','mf']},
+ {n:'Liquid Fund — sweep',cat:'mf',oc:'park',ret:6.8,s:'~6.8% · withdraw any day · trail 0.10% a year',a:['Sweep','data-ord','cash']},
  {n:'AAA PSU Bond 2029',cat:'bond',oc:'income',ret:7.4,s:'7.4% YTM kept · T+1 to demat · fee 0.4% in price',a:['See bond','data-nav','bond']},
- {n:'State guaranteed 2028',cat:'bond',oc:'income',ret:7.9,s:'7.9% YTM · min ₹10L · fee 0.5% in price',a:['See bond','data-nav','bond']},
- {n:'Multi-asset PMS · Quant tilt',cat:'pms',oc:'grow',ret:18.2,s:'18.2% 3y CAGR · min ₹50L · fit-checked by Swapnil',a:['Fit check','data-nav','pms']},
+ {n:'State guaranteed 2028',cat:'bond',oc:'income',ret:7.9,s:'7.9% YTM · min ₹10,00,000 · fee 0.5% in price',a:['See bond','data-nav','bond']},
+ {n:'Multi-asset PMS · Quant tilt',cat:'pms',oc:'grow',ret:18.2,s:'18.2% a year over 3 years · min ₹50,00,000 · fit-checked by Swapnil',a:['Fit check','data-nav','pms']},
  {n:'Focused equity PMS',cat:'pms',oc:'grow',ret:21.4,s:'21.4% 3y · higher drawdowns — mind your concentration',a:['Fit check','data-nav','pms']},
  {n:'Cat-II credit AIF',cat:'aif',oc:'income',ret:13.5,s:'13.5% target · min ₹1 Cr · illiquid 4y — via RM',a:['Via RM','data-nav','aif']},
- {n:'SecureLife iTerm · ₹2 Cr',cat:'ins',oc:'protect',ret:0,s:'₹2,890/mo · 99.1% claims paid · 1.2-day settlement',a:['See plan','data-ins','secure']},
- {n:'Health top-up ₹50L',cat:'ins',oc:'protect',ret:0,s:'Above employer ₹5L — one hospitalisation shouldn’t bill your portfolio',a:['See plan','data-nav','insur']}];
+ {n:'SecureLife iTerm · ₹2 Cr',cat:'ins',oc:'protect',ret:0,s:'₹2,890 a month · 99.1% claims paid · 1.2-day settlement',a:['See plan','data-ins','secure']},
+ {n:'Health top-up ₹50,00,000',cat:'ins',oc:'protect',ret:0,s:'Above employer ₹5,00,000 — one hospitalisation shouldn’t bill your portfolio',a:['See plan','data-nav','insur']}];
 var FLT={oc:'all',fc:'all',fr:0};
 function renderLS(){
   var rows=LS.filter(function(p){return (FLT.oc==='all'||p.oc===FLT.oc)&&(FLT.fc==='all'||p.cat===FLT.fc)&&(p.ret>=FLT.fr);});
@@ -2486,31 +2564,31 @@
     toast('Rate corrected to '+nr+' \u2014 the payoff plan recalculates on it now.');}}
 var II=0;
 var ICAT={
- asset:{t:'Assets',s:'7 insights · 3 need action · acting recovers ≈₹3.9L/yr',rows:[
-  {t:'SIPs ₹1.12L/month — never missed in 3 years',tone:'pos'},
-  {t:'EPF ₹34L compounding untouched',tone:'pos'},
+ asset:{t:'Assets',s:'7 insights · 3 need action · acting recovers ≈₹3,90,000 a year',rows:[
+  {t:'SIPs ₹1,12,000/month — never missed in 3 years',tone:'pos'},
+  {t:'EPF ₹34,00,000 compounding untouched',tone:'pos'},
   {t:'Flexi Cap ahead of category 5 years running',tone:'pos'},
-  {t:'₹28.4L idle, earning ~3% — −₹1.79L/yr',s:'63 days in the broker ledger at zero. ₹24L safely deployable today.',tone:'red',a:['Sweep','data-nav','cash']},
+  {t:'₹28,40,000 idle, earning ~3% — −₹1,79,000 a year',s:'63 days in the broker ledger at zero. ₹24,00,000 safely deployable today.',tone:'red',a:['Sweep','data-nav','cash']},
   {t:'One stock is 42% of your book',s:'Good company, oversized position. Five-year trim ladder — no panic exits.',tone:'amb',a:['Plan trim','data-e','mer']},
-  {t:'Two funds lagging category 3 years — −₹1.1L/yr',s:'₹17.1L running 3%+ behind. Switch candidates, reviewed free.',tone:'amb',a:['Review','data-nav','folios']},
-  {t:'FDs keep 4.9% after tax — −₹1.05L/yr',s:'Same safety exists at ~7.4% kept. Structure, not risk.',tone:'amb',a:['Compare','data-nav','bond']}]},
- liab:{t:'Liabilities',s:'3 insights · 1 critical · ₹3.02L/yr burning',rows:[
-  {t:'Card revolve ₹7.2L @ 42% — −₹3.02L/yr',s:'More than any fund here earns. Idle cash clears it today.',tone:'red',a:['Clear','data-lb','cc']},
-  {t:'Car loan @ 9.5% — prepay candidate',s:'₹11L left · prepay saves ₹1.34L. Post-card, the next drain to close.',tone:'amb',a:['Review','data-wl','1']},
+  {t:'Two funds lagging category 3 years — −₹1,10,000 a year',s:'₹17,10,000 running 3%+ behind. Switch candidates, reviewed free.',tone:'amb',a:['Review','data-nav','folios']},
+  {t:'FDs keep 4.9% after tax — −₹1,05,000 a year',s:'Same safety exists at ~7.4% kept. Structure, not risk.',tone:'amb',a:['Compare','data-nav','bond']}]},
+ liab:{t:'Liabilities',s:'3 insights · 1 critical · ₹3,02,000 a year burning',rows:[
+  {t:'Card revolve ₹7,20,000 at 42% a year — −₹3,02,000 a year',s:'More than any fund here earns. Idle cash clears it today.',tone:'red',a:['Clear','data-lb','cc']},
+  {t:'Car loan at 9.5% a year — prepay candidate',s:'₹11,00,000 left · prepay saves ₹1,34,000. Post-card, the next drain to close.',tone:'amb',a:['Review','data-wl','1']},
   {t:'Home loan 8.9% — fair rate, hold',tone:'pos'}]},
- cash:{t:'Cashflow',s:'4 insights · +₹1.9L free this month',rows:[
-  {t:'+₹1.9L free this month',tone:'pos'},
+ cash:{t:'Cashflow',s:'4 insights · +₹1,90,000 free this month',rows:[
+  {t:'+₹1,90,000 free this month',tone:'pos'},
   {t:'Spends 9% lighter than your 6-month average',tone:'pos'},
-  {t:'₹40k/month SIP headroom sits unused',s:'Fits without strain — goal-mapped, not spare change.',tone:'amb',a:['Start SIP','data-ord','mf']},
-  {t:'Advance tax ₹3.4L due 15 Sep',s:'Miss it and interest starts. The report is CA-ready.',tone:'amb',a:['Tax report','data-nav','reports']}]},
+  {t:'₹40,000/month SIP headroom sits unused',s:'Fits without strain — goal-mapped, not spare change.',tone:'amb',a:['Start SIP','data-ord','mf']},
+  {t:'Advance tax ₹3,40,000 due 15 Sep',s:'Miss it and interest starts. The report is CA-ready.',tone:'amb',a:['Tax report','data-nav','reports']}]},
  credit:{t:'Credit',s:'4 insights · clearing the card → score ~770',rows:[
   {t:'Score 748 — top lender bracket',tone:'pos'},
   {t:'Card revolve drags the score — clearing takes you to ~770',s:'~770 unlocks the best refinance rates on every loan you hold.',tone:'red',a:['Clear card','data-lb','cc']},
   {t:'3 active loans mapped · 0 missed EMIs',tone:'pos'},
   {t:'Loan rates are bureau-approximate — confirm yours',s:'Home ~8.9% · Car ~9.5% · Card ~42%. One wrong rate skews every payoff plan.',tone:'amb',a:['Confirm rates','data-wl','1']}]},
  prot:{t:'Protection',s:'2 insights · 1 critical · cover at 20% of need',rows:[
-  {t:'Term cover ₹50L vs ₹2.5 Cr needed',s:'One purchase completes the wall — ₹2 Cr at ₹2,890/mo, 99.1% claims paid.',tone:'red',a:['Complete cover','data-nav','insur']},
-  {t:'No health top-up above employer ₹5L',s:'One hospitalisation above ₹5L bills your portfolio directly.',tone:'amb',a:['See options','data-nav','insur']}]}
+  {t:'Term cover ₹50,00,000 vs ₹2.5 Cr needed',s:'One purchase completes the wall — ₹2 Cr at ₹2,890 a month, 99.1% claims paid.',tone:'red',a:['Complete cover','data-nav','insur']},
+  {t:'No health top-up above employer ₹5,00,000',s:'One hospitalisation above ₹5,00,000 bills your portfolio directly.',tone:'amb',a:['See options','data-nav','insur']}]}
 };
 function openCat(k){var D=ICAT[k];if(!D)return;
   document.getElementById('icattt').textContent=D.t;
@@ -2546,7 +2624,7 @@
   ic.className='ti ti-face-id';ic.style.color='var(--gold)';bt.textContent='Face ID…';
   setTimeout(function(){if(cur!=='bio')return;ic.className='ti ti-circle-check-filled';ic.style.color='var(--pos)';bt.textContent='You’re in.';
     setTimeout(function(){if(cur!=='bio')return;stack=[];go('home');toast('Face ID ✓ — welcome back.');},500);},1100);}
-var RMSG1='Rahul, your scan is in. Three priorities before we grow anything: the card revolve, the idle ₹28.4L, and the ₹2 Cr term gap. Sending the review.';
+var RMSG1='Rahul, your scan is in. Three priorities before we grow anything: the card revolve, the idle ₹28,40,000, and the ₹2 Cr term gap. Sending the review.';
 var RMSG1P='Rahul, good to meet. Book a call or ask me anything right here. The moment you allow portfolio access — or grant it for a call — I review your full balance sheet and put it on record.';
 function updRM(){
   var p=document.getElementById('rmpriv'),o=document.getElementById('rmprivon');
@@ -2560,9 +2638,9 @@
   var b=document.getElementById('pbanner');if(!b)return;
   if(!window.MISS.length){b.style.display='none';return;}
   var conf=100;var why='';
-  if(window.MISS.indexOf('banks')>=0){conf-=40;why='cashflow and idle-cash leaks stay invisible — ≈₹1.79L/yr for profiles like yours';}
-  if(window.MISS.indexOf('loans & score')>=0){conf-=25;if(!why)why='the single biggest leak — card revolve, ≈₹3.02L/yr — hides in exactly this data';}
-  if(window.MISS.indexOf('mutual funds')>=0){conf-=35;if(!why)why='fund overlap and laggards stay invisible — ≈₹1.1L/yr';}
+  if(window.MISS.indexOf('banks')>=0){conf-=40;why='cashflow and idle-cash leaks stay invisible — ≈₹1,79,000 a year typically hides here';}
+  if(window.MISS.indexOf('loans & score')>=0){conf-=25;if(!why)why='the single biggest leak — card revolve, ≈₹3,02,000 a year — hides in exactly this data';}
+  if(window.MISS.indexOf('mutual funds')>=0){conf-=35;if(!why)why='fund overlap and laggards stay invisible — ≈₹1,10,000 a year';}
   document.getElementById('pbannert').innerHTML='<i class="ti ti-alert-triangle" style="color:var(--amb);"></i> <b style="color:var(--tx);">Provisional score — built from '+conf+'% of your balance sheet.</b> Missing: '+window.MISS.join(', ')+'. Without it, '+why+'.';
   b.style.display='block';
 }
@@ -2573,9 +2651,9 @@
     var tg=el.querySelector('.tag');el.style.borderColor=CONSENT[k]?'rgba(62,213,152,.4)':'rgba(224,138,138,.4)';
     tg.textContent=CONSENT[k]?'sharing':'not sharing';tg.classList.toggle('on',CONSENT[k]);});
   var imp=document.getElementById('cimp');
-  if(n===3){imp.innerHTML='Full picture · score confidence <b style="color:var(--tx);">100%</b> · every leak visible — profiles like yours surface ≈₹6.9L/yr.';}
+  if(n===3){imp.innerHTML='Full picture · score confidence <b style="color:var(--tx);">100%</b> · every leak visible — ≈₹6,90,000 a year typically hides here.';}
   else{var c=100-(CONSENT.bank?0:40)-(CONSENT.mf?0:35)-(CONSENT.bureau?0:25);
-    var w=!CONSENT.bureau?'the biggest leak (card revolve, ≈₹3.02L/yr) hides in loans data':!CONSENT.bank?'cashflow &amp; idle-cash leaks (≈₹1.79L/yr) go invisible':'fund overlap &amp; laggards (≈₹1.1L/yr) go invisible';
+    var w=!CONSENT.bureau?'the biggest leak (card revolve, ≈₹3,02,000 a year) hides in loans data':!CONSENT.bank?'cashflow &amp; idle-cash leaks (≈₹1,79,000 a year) go invisible':'fund overlap &amp; laggards (≈₹1,10,000 a year) go invisible';
     imp.innerHTML='<span style="color:var(--amb);">Score confidence drops to <b>'+c+'%</b></span> — '+w+'. You can add it anytime later.';}
   var btn=document.getElementById('capp');if(btn)btn.textContent=n===0?'Nothing selected — pick at least one':'Approve '+n+' of 3 with OTP';
 }
@@ -2584,9 +2662,9 @@
     document.getElementById('camt').textContent=document.getElementById('oamt').textContent;
     document.getElementById('croute').textContent=ORD.type==='bond'?'You → Exchange → your demat':(ORD.type==='cash'?'You → UPI → AMC · liquid':'You → NPCI → AMC');
     document.getElementById('cfee').textContent=document.getElementById('ofee').textContent.split(' — ')[0];
-    document.getElementById('cexit').textContent=ORD.type==='bond'?'Sell on exchange anytime':(ORD.type==='cash'?'Withdraw any day · bank in T+1':'Any day · 1% load inside 1 yr');
+    document.getElementById('cexit').textContent=ORD.type==='bond'?'Sell on exchange anytime':(ORD.type==='cash'?'Withdraw any day · bank in T+1':'Any day · 1% load inside 1 year');
 }
-document.addEventListener('click',function(e){
+document.addEventListener('click',function(e){ if(e.target.classList&&(e.target.classList.contains('modal')||e.target.classList.contains('dlgwrap'))&&e.target.classList.contains('on')){e.target.classList.remove('on');return;} 
   var SEL='.tap,.lnk,.seg span,[data-q],[data-go],[data-nav],[data-om],[data-oa],[data-ra],[data-sw],[data-x],[data-vt],[data-vm],[data-tt],[data-h],[data-e],[data-lb],[data-ord],[data-cs],[data-bd],[data-bt],[data-rf],[data-dk],[data-ic],[data-nd],[data-oc],[data-fo],[data-fc],[data-fr],[data-ins],[data-dtl],[data-cfd],[data-xc],[data-mu],[data-mr],[data-mc],[data-wl]';
   var KD=['data-q','data-go','data-nav','data-om','data-oa','data-ra','data-sw','data-x','data-vt','data-vm','data-tt','data-h','data-e','data-lb','data-ord','data-ch','data-cs','data-bd','data-bt','data-rf','data-dk','data-ic','data-nd','data-oc','data-fo','data-fc','data-fr','data-ins','data-dtl','data-cfd','data-xc','data-mu','data-mr','data-mc','data-wl'];
   function actionable(n){if(!n||!n.getAttribute)return false;if(n.id)return true;
@@ -2599,8 +2677,8 @@
   if(t.id==='lw'){toast(TH[ti].msg);nextTh();return;}
   if(t.id==='lwhy'){stack.push(cur);go('chat');return;}
   if(t.id==='llb'){toast('Left in peace. A different thought tomorrow.');nextTh();return;}
-  if(t.id==='mcalm'){t.classList.add('on');document.getElementById('mvol').classList.remove('on');document.querySelector('.ph').classList.remove('stormy');document.getElementById('mood').innerHTML='Your money is<br>calm tonight.';document.getElementById('moodsub').textContent='Nothing needs you. SIPs cleared, spends steady, one quiet opportunity below.';return;}
-  if(t.id==='mvol'){t.classList.add('on');document.getElementById('mcalm').classList.remove('on');document.querySelector('.ph').classList.add('stormy');document.getElementById('mood').innerHTML='Markets are loud.<br>You don\u2019t have to be.';document.getElementById('moodsub').textContent='Your plan already assumes days like this. One thing is worth doing; the rest is noise.';return;}
+  
+  
   if(t.id==='pour'){
     if(window.poured){toast('Already moving — ₹12,400 settles to liquid by tomorrow.');return;}
     ORD.pour=true;openOrder('cash');
@@ -2609,7 +2687,7 @@
   }
   if(t.id==='segA'){t.classList.add('on');document.getElementById('segL').classList.remove('on');document.getElementById('wA').style.display='block';document.getElementById('wL').style.display='none';return;}
   if(t.id==='segL'){t.classList.add('on');document.getElementById('segA').classList.remove('on');document.getElementById('wL').style.display='block';document.getElementById('wA').style.display='none';return;}
-  if(t.id==='ccfix'){toast('₹7.2L payoff draft ready — clears 42%, score heads to 770');return;}
+  if(t.id==='ccfix'){toast('₹7,20,000 payoff draft ready — clears 42%, score heads to 770');return;}
   if(t.id==='dl1'||t.classList.contains('dlr')){toast('Downloading… PDF will appear in your files');return;}
   if(t.id==='rmsend'){toast('Sent — Swapnil replies within ~2h, on record');return;}
   var ch=t.getAttribute('data-ch');
@@ -2633,7 +2711,7 @@
   if(t.id==='intlreq'){toast('LRS request #NVY-G-101 raised — rails + TCS math confirmed with you first.');return;}
   if(t.id==='glus'){toast('US index request #NVY-G-101 raised — Swapnil confirms LRS rails today.');return;}
   if(t.id==='gled'){toast('Dollar goal draft opened — Kiara 2034, funded in the currency it bills in.');return;}
-  if(t.id==='famanita'){toast('Anita\u2019s ledger opens read-only — she controls what you see, always.');return;}
+  if(t.id==='famanita'){famDet('Anita',[['Mutual funds','\u20b922,00,000'],['Stocks','\u20b99,00,000'],['Fixed deposits','\u20b917,00,000']],'\u20b948,00,000');return;}
   if(t.id==='famresend'){toast('Invite resent to Papa — he shares only what he chooses.');return;}
   if(t.id==='faminvite'){toast('Invite drafted — they consent first, then choose what to share.');return;}
   if(t.id==='refcopy'){toast('Link copied — nett.in/r/RAHUL. They\u2019ll know you sent it.');return;}
@@ -2654,7 +2732,7 @@
     if(sk==='yes')toast('Tobacco changes the rate — honesty here is what makes the claim payable.');return;}
   if(t.id==='bkreq'){document.getElementById('bksheet').classList.add('on');return;}
   if(t.id==='bkclose'){document.getElementById('bksheet').classList.remove('on');return;}
-  if(t.id==='bksim'){document.getElementById('bksheet').classList.remove('on');toast('₹9.8L credited by broker ✓ — sweep draft ready');setTimeout(function(){openOrder('cash');document.getElementById('oamt').textContent='₹9,80,000';ORD.amt='₹9,80,000';},900);return;}
+  if(t.id==='bksim'){document.getElementById('bksheet').classList.remove('on');toast('₹9,80,000 credited by broker ✓ — sweep draft ready');setTimeout(function(){openOrder('cash');document.getElementById('oamt').textContent='₹9,80,000';ORD.amt='₹9,80,000';},900);return;}
   if(t.id==='bondreq'){toast('Request #NVY-2214 raised — Swapnil confirms the final price with you today, on record.');return;}
   if(t.id==='lreq'){toast('Ticket #NVY-1187 raised — Swapnil\u2019s desk responds within one working day.');return;}
   if(t.id==='supp'){toast('support@nett.in · 1800 419 0000 — 9am–9pm IST, humans only.');return;}
@@ -2692,7 +2770,7 @@
   if(t.id==='kycgo'){KYC.ready=true;toast('Account ready ✓ — resuming your order');fillConfirm();go('oconfirm');return;}
   var kt=t.getAttribute('data-kt');
   if(kt){t.parentElement.querySelectorAll('.tag').forEach(function(c){c.classList.toggle('on',c===t);c.style.borderColor=(c===t)?'rgba(236,236,241,.4)':'';});return;}
-  if(t.id==='kpd'){if(t.getAttribute('data-nav')){return;}var kc=document.getElementById('kpdtxt');kc.innerHTML='<i class="ti ti-loader" style="color:var(--amb);"></i> ₹1 on its way… IMPS reference NVY-PD-4471';
+  if(t.id==='kpd'){if(t.getAttribute('data-nav')){stack.push(cur);go('kyc7');return;}var kc=document.getElementById('kpdtxt');kc.innerHTML='<i class="ti ti-loader" style="color:var(--amb);"></i> ₹1 on its way… IMPS reference NVY-PD-4471';
     setTimeout(function(){kc.innerHTML='<i class="ti ti-circle-check-filled" style="color:var(--pos);"></i> ₹1 received back ✓ — account live, name matches PAN: <b style="color:var(--tx);">Rahul Mehra</b>';document.getElementById('kpdcard').style.borderColor='rgba(62,213,152,.4)';var kb=document.getElementById('kpd');kb.textContent='Verified — continue';kb.setAttribute('data-nav','kyc7');},1400);return;}
   if(t.id==='ksign'){t.textContent='Signature captured ✓';t.style.color='var(--pos)';t.style.borderColor='rgba(62,213,152,.5)';toast('Signature saved — used only on the AMC/KRA record.');return;}
   if(t.id==='knom2'){toast('Second nominee opens here — shares must total 100% across all nominees.');return;}
@@ -2718,7 +2796,7 @@
   if(t.id==='pgok'){
     document.getElementById('pgbtns').style.display='none';document.getElementById('pgwait').style.display='flex';
     setTimeout(function(){
-      document.getElementById('sdet').textContent=ORD.type==='ins'?'Policy issued digitally · ₹2 Cr cover · '+ORD.amt+'/mo · tele-medical call within 48h':ORD.type==='cash'?document.getElementById('oamt').textContent+' swept to liquid — earning ~6.8% from tomorrow · withdraw any day':ORD.type==='bond'?'100 bonds · your demat, T+1 · coupons to your bank half-yearly':(ORD.mode==='sip'?document.getElementById('oamt').textContent+' monthly into '+ORD.name+' · first debit 5 Aug · pause any month':document.getElementById('oamt').textContent+' into '+ORD.name+' · units in your name by tomorrow');
+      document.getElementById('sdet').textContent=ORD.type==='ins'?'Policy issued digitally · ₹2 Cr cover · '+ORD.amt+' a month · tele-medical call within 48h':ORD.type==='cash'?document.getElementById('oamt').textContent+' swept to liquid — earning ~6.8% from tomorrow · withdraw any day':ORD.type==='bond'?'100 bonds · your demat, T+1 · coupons to your bank half-yearly':(ORD.mode==='sip'?document.getElementById('oamt').textContent+' monthly into '+ORD.name+' · first debit 5 Aug · pause any month':document.getElementById('oamt').textContent+' into '+ORD.name+' · units in your name by tomorrow');
       var n=6;document.getElementById('sundot').textContent=n;
       clearInterval(window.uT);window.uT=setInterval(function(){n--;if(n<=0){clearInterval(window.uT);document.getElementById('sundo').style.opacity=.35;document.getElementById('sundo').textContent='Undo window closed';}else{document.getElementById('sundot').textContent=n;}},1000);
       document.getElementById('sundo').style.opacity=1;document.getElementById('sundo').innerHTML='Undo — <span id="sundot">6</span>s';
@@ -2756,10 +2834,10 @@
   if(x){document.querySelectorAll('[data-x]').forEach(function(c){c.classList.toggle('on',c===t);});['mf','bond','pms','aif','ul'].forEach(function(k){document.getElementById('x-'+k).style.display=(k===x?'block':'none');});return;}
   var vt=t.getAttribute('data-vt');
   if(vt){
-    var V={work:['What is working',[['Monthly SIPs ₹1.4L — 31-month streak','sage'],['EPF/PPF compounding untouched','sage'],['Home loan at a fair 8.9%','sage'],['Score 748 — switch-ready','sage']]],
+    var V={work:['What is working',[['Monthly SIPs ₹1,40,000 — 31-month streak','sage'],['EPF/PPF compounding untouched','sage'],['Home loan at a fair 8.9%','sage'],['Score 748 — switch-ready','sage']]],
       attn:['Needs attention',[['6 funds overlap 71% — one portfolio, three fees','amb'],['42% of stocks in one company','amb'],['FDs earn 4.9% post-tax','amb']]],
-      leak:['Leaking',[['Card revolve ₹7.2L @42% — ₹3.02L/yr','red'],['₹28.4L idle at 3.2%','red'],['2 funds lag category 3y','red']]],
-      miss:['Missing',[['Term cover short by ₹2 Cr','#B9AEDD'],['No health top-up above employer ₹5L','#B9AEDD'],['No advance-tax calendar — 15 Sep at risk','#B9AEDD']]]};
+      leak:['Leaking',[['Card revolve ₹7,20,000 at 42% a year — ₹3,02,000 a year','red'],['₹28,40,000 idle at 3.2%','red'],['2 funds lag category 3y','red']]],
+      miss:['Missing',[['Term cover short by ₹2 Cr','#B9AEDD'],['No health top-up above employer ₹5,00,000','#B9AEDD'],['No advance-tax calendar — 15 Sep at risk','#B9AEDD']]]};
     var d=V[vt];document.getElementById('vt').textContent=d[0];
     var col={sage:'#8FC7AE',amb:'#E3B65B',red:'#D98B8B'};
     document.getElementById('vrows').innerHTML=d[1].map(function(r){var c=col[r[1]]||r[1];return '<div class="rw"><span style="color:#CFCBD9;font-size:12.5px;">'+r[0]+'</span><span style="width:8px;height:8px;border-radius:50%;background:'+c+';flex-shrink:0;"></span></div>';}).join('');
@@ -2811,14 +2889,14 @@
   if(dtl){var dp=dtl.split(':');var dr=ICAT[dp[0]].rows[+dp[1]];toast(dr.d||dr.s||dr.t);return;}
   var cfd=t.getAttribute('data-cfd');
   if(cfd){var CFD={
-    zee:'Zee5 · ₹179/mo · renewed 3 Jul · opened 2× in 90 days. Idle pair: MagStream ₹499, FitPass ₹662.',
-    subs:'9 platforms · ₹4,870/mo · up 31% YoY. Untouched 60+ days: Zee5, MagStream, FitPass — ₹1,340/mo.',
+    zee:'Zee5 · ₹179 a month · renewed 3 Jul · opened 2× in 90 days. Idle pair: MagStream ₹499, FitPass ₹662.',
+    subs:'9 platforms · ₹4,870 a month · up 31% YoY. Untouched 60+ days: Zee5, MagStream, FitPass — ₹1,340 a month.',
     subsact:'Request #NVY-S-114 raised — cancellation links and a stop-list sent to your email.',
-    fee:'HDFC Regalia · ₹4,999 fee · waiver at ₹3L spend · you’re at ₹2.6L with 4 months left.',
-    feeact:'Electricity + broadband (₹9,300/mo) routed to the card would cross ₹3L by Oct — checklist emailed.',
-    rsu:'240 units · $6.2k at current price · sell-to-cover vs hold decision · LRS + Form 67 path applies.',
-    sal:'₹3.6L net · 14/14 months on the 1st · employer PF on time every cycle.',
-    spend:'₹1.7L out vs ₹1.87L 6-mo average — travel down, dining flat, no new EMIs.'}[cfd];
+    fee:'HDFC Regalia · ₹4,999 fee · waiver at ₹3,00,000 spend · you’re at ₹2,60,000 with 4 months left.',
+    feeact:'Electricity + broadband (₹9,300 a month) routed to the card would cross ₹3,00,000 by Oct — checklist emailed.',
+    rsu:'240 units · $6,200 at current price · sell-to-cover vs hold decision · LRS + Form 67 path applies.',
+    sal:'₹3,60,000 net · 14/14 months on the 1st · employer PF on time every cycle.',
+    spend:'₹1,70,000 out vs ₹1,87,000 6-mo average — travel down, dining flat, no new EMIs.'}[cfd];
     toast(CFD||'Detail');return;}
   var ic2=t.getAttribute('data-ic');
   if(ic2){openCat(ic2);return;}
@@ -2843,7 +2921,7 @@
   if(bt){BOOK.time=bt;t.parentElement.querySelectorAll('.tag').forEach(function(c){c.classList.toggle('on',c===t);c.style.borderColor=(c===t)?'rgba(236,236,241,.4)':'';});
     document.getElementById('bkgo').textContent='Confirm — '+BOOK.day+', '+BOOK.time;return;}
   if(t.id==='bkvis'){BOOK.vis=!BOOK.vis;t.textContent=BOOK.vis?'on':'off';t.classList.toggle('on',BOOK.vis);t.style.borderColor=BOOK.vis?'rgba(62,213,152,.5)':'';return;}
-  if(t.id==='bknotes'){toast('Notes · 12 Jun: card-first sequence agreed · reserve target ₹9L · next review after payoff.');return;}
+  if(t.id==='bknotes'){toast('Notes · 12 Jun: card-first sequence agreed · reserve target ₹9,00,000 · next review after payoff.');return;}
   if(t.id==='bkgo'){BOOK.next=BOOK.day+' · '+BOOK.time;
     var ap=document.getElementById('rmapptt');if(ap)ap.innerHTML='<i class="ti ti-calendar-event" style="color:var(--pos);"></i> Next call · '+BOOK.next+' · confirmed — last: 12 Jun';
     if(BOOK.vis&&!RMVIS){RMVIS=true;updRM();}
@@ -2856,9 +2934,7 @@
   if(t.id==='rmscancel'){document.getElementById('rmsheet').classList.remove('on');return;}
   if(t.id==='pvrm'){RMVIS=!RMVIS;updRM();toast(RMVIS?'Swapnil can now see your portfolio.':'Hidden again — he sees nothing until you allow.');return;}
   var rf=t.getAttribute('data-rf');
-  if(rf){var el0=document.getElementById('sync'+rf);toast('Refreshing via AA — 10–60s typical. We ping you when it lands.');
-    setTimeout(function(){if(el0)el0.innerHTML='Synced just now';toast('Refreshed — data current.');
-      if(rf==='bank'){var ws=document.getElementById('wsync');if(ws)ws.textContent='Updated just now';}},1500);return;}
+  if(rf){var el0=document.getElementById('sync'+rf);if(rf==='bank')CONSENT.bank=true;if(rf==='mf')CONSENT.mf=true;if(rf==='bureau')CONSENT.bureau=true; if(el0)el0.innerHTML='Reconnecting…'; toast('Reconnected — a fresh read starts now. About 60 seconds.'); stack.push(cur); go('scanning'); setTimeout(function(){if(el0)el0.innerHTML='Synced just now';},1600); return;}
   var dk=t.getAttribute('data-dk');
   if(dk){window.curDk=dk;var nm={bank:'Banks (AA)',mf:'MF Central',bureau:'Credit bureau'}[dk];
     var cc={bank:60,mf:65,bureau:75}[dk];
@@ -2886,7 +2962,7 @@
     setTimeout(function(){document.getElementById('wsync').textContent='Updated just now';toast('Refreshed — 2 banks, 14 folios current.');},1500);return;}
   var d2=t.getAttribute('data-nav');
   if(d2){
-    if(d2==='back'){if((cur==='oconfirm'||cur==='pg2')&&!EXITASKED){EXITASKED=1;document.getElementById('exitint').classList.add('on');return;}go(stack.pop()||'home');return;}
+    if(d2==='back'){var om=document.querySelector('.modal.on,.dlgwrap.on');if(om){om.classList.remove('on');return;} if((cur==='oconfirm'||cur==='pg2')&&!EXITASKED){EXITASKED=1;document.getElementById('exitint').classList.add('on');return;}go(stack.pop()||'home');return;}
     if(tabs[d2]){stack=[];}else{stack.push(cur);}
     go(d2);
   }
@@ -2959,11 +3035,11 @@
   document.getElementById('atc').textContent=(i+1)+' of '+ATOUR.length;
 }
 document.addEventListener('click',function(e){
-  var t=e.target.closest('[data-st],#werrretry,#atn,#ats,#atourgo');
+  var t=e.target.closest('[data-st],#werrretry,#atn,#ats,#atourgo,#edclose,#edretry,#errclose,#errretry,#eyeA,#eyeB,#h0go,#pdob,#ppanx,#scdob,#werropen,#xleave,#xstay');
   if(!t)return;
   var st=t.getAttribute&&t.getAttribute('data-st');
   if(st){STATE=st;document.querySelectorAll('[data-st]').forEach(function(x){x.classList.toggle('ston',x===t);});applyState();toast('State: '+st+' — demo view');return;}
-  if(t.id==='werrretry'){STATE='normal';applyState();document.querySelector('[data-st="normal"]').classList.add('ston');document.querySelectorAll('[data-st]').forEach(function(x){if(x.getAttribute('data-st')!=='normal')x.classList.remove('ston');});toast('Credit bureau recovered ✓ — refreshed just now · logged NVY-7C21');return;}
+  if(t.id==='eyeA'||t.id==='eyeB'){if(!window._amtWrapped){window._amtWrapped=true;var rxm=/([₹$][\d,]+(?:\.\d+)?(?:\s?Cr)?)/g;document.querySelectorAll('section').forEach(function(sec){var w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,null),nds=[],nd;while(nd=w.nextNode()){if(rxm.test(nd.nodeValue)){nds.push(nd);}rxm.lastIndex=0;}nds.forEach(function(tn){var sp=document.createElement('span');sp.innerHTML=tn.nodeValue.replace(rxm,'<span class="amt">$1</span>');tn.parentNode.replaceChild(sp,tn);});});}var on=document.body.classList.toggle('masked');document.querySelectorAll('#eyeA use,#eyeB use').forEach(function(u){var h=on?'#i-eyeoff':'#i-eye';u.setAttribute('href',h);u.setAttributeNS('http://www.w3.org/1999/xlink','href',h);});toast(on?'Amounts hidden, everywhere — tap the eye to show.':'Amounts visible.');return;} if(t.id==='errclose'){document.getElementById('errsheet').classList.remove('on');return;} if(t.id==='errretry'){document.getElementById('errsheet').classList.remove('on');toast('Retrying \u2014 we ping you when it lands.');return;} if(t.id==='werropen'){showErr('Couldn\u2019t reach the credit bureau.','Refresh failed at 9:12 AM. Showing your data as of 14 Jul.','NVY-7C21');return;} if(t.id==='werrretry'){STATE='normal';applyState();document.querySelector('[data-st="normal"]').classList.add('ston');document.querySelectorAll('[data-st]').forEach(function(x){if(x.getAttribute('data-st')!=='normal')x.classList.remove('ston');});toast('Credit bureau recovered ✓ — refreshed just now · logged NVY-7C21');return;}
   var sx=t.getAttribute&&t.getAttribute('data-srcx');
   if(sx){SRCOFF[sx]=!SRCOFF[sx];t.classList.toggle('son',!SRCOFF[sx]);applySources();toast((SRCOFF[sx]?'Scenario: '+sx.toUpperCase()+' consent NOT given':'Scenario: '+sx.toUpperCase()+' connected')+' — demo view');return;}
   if(t.closest&&t.closest('#werr')&&t.id!=='werrretry'){document.getElementById('errdlg').classList.add('on');return;}
@@ -2972,12 +3048,68 @@
   if(t.id==='h0go'){stack.push('home0');go(PENDPERM?'pan':'consent');return;}
   if(t.id==='ppanx'){var pi=document.getElementById('ppan');if(pi){pi.value='';pi.focus();toast('Cleared — enter the PAN to match.');}return;}
   if(t.id==='scdob'||t.id==='pdob'){toast('Wheel picker on device — day · month · year, named month. Never a free-text date.');return;}
-  if(t.id==='xstay'){document.getElementById('exitint').classList.remove('on');toast('Right call — ₹4.1L stays on your side of the line.');return;}
+  if(t.id==='xstay'){document.getElementById('exitint').classList.remove('on');toast('Right call — ₹4,10,000 stays on your side of the line.');return;}
   if(t.id==='xleave'){document.getElementById('exitint').classList.remove('on');go(stack.pop()||'home');toast('Saved as a draft — it’s one tap from Home when you’re ready.');return;}
   if(t.id==='atourgo'){go('health');setTimeout(function(){tourShow(0);},450);return;}
   if(t.id==='atn'){tourShow(parseInt(document.getElementById('atour').getAttribute('data-i'))+1);return;}
   if(t.id==='ats'){document.getElementById('atour').style.display='none';return;}
 });
+
+(function(){var c=document.getElementById('sigpad');if(!c)return;var x=c.getContext&&c.getContext('2d');if(!x)return;
+x.strokeStyle='#ECECF1';x.lineWidth=2.4;x.lineCap='round';var dn=false,drawn=false;
+function pos(e){var r=c.getBoundingClientRect();var t=e.touches?e.touches[0]:e;return[(t.clientX-r.left)*(c.width/r.width),(t.clientY-r.top)*(c.height/r.height)];}
+function st(e){dn=true;var p=pos(e);x.beginPath();x.moveTo(p[0],p[1]);e.preventDefault();}
+function mv(e){if(!dn)return;var p=pos(e);x.lineTo(p[0],p[1]);x.stroke();if(!drawn){drawn=true;var g=document.getElementById('siggo');g.style.opacity='1';g.style.pointerEvents='auto';document.getElementById('sighint').textContent='Captured — you can clear and redraw any time.';}e.preventDefault();}
+function en(){dn=false;}
+c.addEventListener('pointerdown',st);c.addEventListener('pointermove',mv);window.addEventListener('pointerup',en);
+c.addEventListener('touchstart',st,{passive:false});c.addEventListener('touchmove',mv,{passive:false});c.addEventListener('touchend',en);
+document.addEventListener('click',function(e){var t=e.target.closest('.tap');if(!t)return;
+ if(t.id==='sigclear'){x.clearRect(0,0,c.width,c.height);drawn=false;var g=document.getElementById('siggo');g.style.opacity='.4';g.style.pointerEvents='none';document.getElementById('sighint').textContent='Sign inside the box to continue.';return;}
+ if(t.id==='sigupload'){toast('Photo upload opens the camera in the built app — draw works here in the prototype.');return;}
+ if(t.id==='siggo'){stack.push(cur);go('kyc10');toast('Signature captured — attached to your KYC pack.');return;}});
+})();
+
+(function(){var REL='Spouse',LVL='full',NM='',MB='';
+function fill(){var b=document.getElementById('fobox');if(!b)return;b.innerHTML='';for(var i=0;i<6;i++){b.insertAdjacentHTML('beforeend','<span style="flex:1;height:44px;border:1px solid var(--hair);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px;color:var(--tx);">'+(Math.floor(Math.random()*9)+1)+'</span>');}}
+document.addEventListener('click',function(e){
+ var t=e.target.closest('#famaddopen,#famaddclose,#famaddgo,#famrel span,#famotpsheet [data-fl],#foapprove,#famsendlink,#famnewcard,#fdclose');
+ if(!t)return;
+ if(t.id==='famaddopen'){document.getElementById('famaddsheet').classList.add('on');return;}
+ if(t.id==='famaddclose'){document.getElementById('famaddsheet').classList.remove('on');return;}
+ if(t.closest('#famrel')&&t.getAttribute('data-rel')){REL=t.getAttribute('data-rel');
+   document.querySelectorAll('#famrel span').forEach(function(x){x.classList.toggle('on',x===t);});
+   var mi=REL==='Child';document.getElementById('famminor').style.display=mi?'block':'none';
+   document.getElementById('famaddgo').textContent=mi?'Add as guardian-managed':'Send them the approval';return;}
+ if(t.id==='famaddgo'){NM=(document.getElementById('famname').value||'').trim()||'Arjun';MB=(document.getElementById('fammob').value||'').replace(/\D/g,'');
+   if(REL!=='Child'&&(MB.length!==10||!/[6-9]/.test(MB[0]))){document.getElementById('famerr').style.display='block';return;}
+   document.getElementById('famerr').style.display='none';
+   document.getElementById('famaddsheet').classList.remove('on');
+   if(REL==='Child'){addRow(NM,REL,'guardian');toast(NM+' added \u2014 guardian-managed. You hold, you see, you answer for it.');return;}
+   document.getElementById('foname').textContent=NM;document.getElementById('fowho').textContent=NM.toUpperCase();
+   document.getElementById('fomob').textContent='+91 '+MB.slice(0,5)+' '+MB.slice(5);fill();
+   document.getElementById('famotpsheet').classList.add('on');return;}
+ if(t.getAttribute&&t.getAttribute('data-fl')){LVL=t.getAttribute('data-fl');
+   document.querySelectorAll('#famotpsheet [data-fl]').forEach(function(x){var on=x===t;x.style.borderColor=on?'rgba(62,213,152,.45)':'';x.querySelector('.rw span:last-child').textContent=on?'chosen':'';x.querySelector('.rw span:last-child').style.color=on?'var(--pos)':'';});return;}
+ if(t.id==='foapprove'){document.getElementById('famotpsheet').classList.remove('on');addRow(NM,REL,LVL);
+   toast(LVL==='none'?NM+' joined \u2014 numbers stay private until they choose otherwise.':NM+' approved on their phone \u2014 what you see is what they gave.');return;}
+ if(t.id==='fdclose'){document.getElementById('famdetsheet').classList.remove('on');return;} if(t.id==='famnewcard'&&!e.target.closest('#famsendlink')&&document.getElementById('famstate').textContent.indexOf('read-only')>-1){famDet(NM||'Arjun',[['Mutual funds','\u20b96,40,000'],['Fixed deposits','\u20b94,20,000']],'\u20b910,60,000');return;} if(t.id==='famsendlink'){var el=document.getElementById('famstate');el.innerHTML='Reading their accounts \u2014 you\u2019ll see it when they do.';
+   setTimeout(function(){var c=document.getElementById('famnewcard');if(!c)return;
+     c.querySelector('.rw span:last-child').textContent='\u20b910,60,000';
+     document.getElementById('famstate').innerHTML='sharing with you \u00b7 MF \u20b96,40,000 \u00b7 FDs \u20b94,20,000 \u00b7 read-only';
+     var up={famown:'\u20b94.33 Cr',famnet:'\u20b93.37 Cr',famnetbig:'\u20b93.37 Cr',famflow:'+\u20b92,47,000 free'};
+     Object.keys(up).forEach(function(k){var x=document.getElementById(k);if(x)x.textContent=up[k];});
+     var fc=document.getElementById('famcount');if(fc)fc.textContent='Family net worth \u00b7 3 of 4 sharing';
+     var fs=document.getElementById('famflowsub');if(fs)fs.textContent='You +\u20b91,90,000 \u00b7 Anita +\u20b935,000 \u00b7 '+NM+' +\u20b922,000 \u00b7 after every EMI and premium';
+     toast('Their scan is done \u2014 the household picture just got '+'\u20b910,60,000 wider.');},2200);return;}
+});
+function addRow(nm,rel,lvl){var d=document.getElementById('famnew');if(!d)return;
+ var right=lvl==='guardian'?'\u20b90':(lvl==='none'?'private':'invited');
+ var sub=lvl==='guardian'?'held in their name by you \u00b7 guardian-managed until 18':
+   (lvl==='none'?'in the family \u00b7 numbers private \u2014 their choice, revocable':
+   (lvl==='net'?'net worth only \u2014 one number, nothing underneath':
+   'joined \u00b7 not scanned yet \u00b7 <span class="lnk tap" id="famsendlink">Send the scan link</span>'));
+ d.innerHTML='<div class="cd" id="famnewcard" style="margin-top:9px;"><div class="rw"><span>'+nm+' \u00b7 '+rel.toLowerCase()+'</span><span style="color:var(--tx);">'+(lvl==='full'?'\u2014':right)+'</span></div><p class="sm" id="famstate">'+sub+'</p></div>';}
+})();
 </script>
 </body>
 </html>

```
