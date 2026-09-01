# nett-app v1.87 · release notes · 01 Sep 2026

**File:** `nett-app_v1_87_01_09_2026.html` · NETT_VER 1.87 · stamp matches.
**Source:** the v1.86 validation report (same date). Every sev-1 and sev-2 item is closed except the two that are architectural (R-A, V-27 pinning) — listed under *Open*.

## Gates on v1.87
| Gate | v1.86 | v1.87 |
|---|---|---|
| audit.js 1–5 (extended, 23 checks) | 9 red | **1 flag** · occlusion heuristic (fires on s-intro, which has no fixed chrome; finger-check only) |
| flows_v187.js (29 tests, new) | **23 red** on v1.86 (red-green proof, V-29) | **29 green** |
| flows.js (v1.11 suite) | 2 red | 2 red · same two, pre-existing: hard-coded `v1.13` stamp check + its own `jintgo` heuristic (Gate 2 reachability passes) |
| N4 route types | 41 missing | 0 missing |
| V-35 lit tab | 9 wrong + 3 unlit (NODATA) | 0 |
| V-20 pills without nowrap | 13 | 0 (25 rendered pills) |
| V-21/37 title+pill rows | 9 | 2 (legacy s-goaldet; critm button row, not a title) |

## Closed
- **S-1 W-20** · 34 "job/jobs" strings renamed on user surfaces and JS literals: entry CTA is now **"Name the goal"**; goal page label "GOAL · ASKED"; Wealth "Working toward goals"; all toasts, drift lines, tag sheet, legacy goaldet/geditm. Engine identifiers untouched.
- **S-2 W-38** · no Undo on SIP / bond / cash success. Insurance keeps the insurer's free-look line, worded as their rule, not an Undo. Terms row updated to match ("every order previewed before your fingerprint").
- **S-3** · success first-debit now reads from the order screen's `#sipfv`; "5 Aug" is gone.
- **S-4** · `#dht` set at the top of `renderJobDet`; the health goal header reads "Health cover · you and Anita".
- **S-5 V-35 / N1** · `TABOF` extended (family, refer → Home; pms, aif, bond, mld, unlist, cfdp, trust, gift, listing → Explore; insur, insdet, gloss, icat, bio → Health; home0/health0/wealth0). Every static tab in every nav is now tappable; lighting lives only in `_go`. Tab bar added to s-listing and s-icat.
- **S-6 V-37** · `aCard`, `aProtected` (both cards) rebuilt as glyph+pill row, title full-width beneath. Wealth group heads: label on its own line, pill right-aligned on the next.
- **S-7 V-20** · inline `white-space:nowrap` on every 999px pill (16 added) + a CSS backstop `[style*="border-radius:999px"]{white-space:nowrap}`.
- **C-1** · "and I answer with numbers" → "and the answer comes back in numbers". The spoken/"Hear it" line no longer opens "Arth here." (W-22).
- **C-2 W-34/W-25/W-33** · Home strip label branches: "₹12,00,000 · NOTHING PUT ASIDE YET · REACHES 100%" when ₹0 is tagged, "₹X PUT ASIDE OF ₹Y" otherwise. "rides the market" → "stays out of the market". Verdict fold: "THE WORKING · NOTHING STILL OPEN" when there is no gap. "the rule book" → "the six-month working rule".
- **C-3 W-37** · Explore: TRENDING NOW → "4 CARDS · WHAT MOVED THIS WEEK"; CLOSES FRIDAY → "BOND · ISSUE CLOSES 5 SEP"; PRICE DROP → "TERM COVER · ₹2 CR"; SPOTLIGHT → "WHAT YOUR CASH EARNS · THE COMPARISON"; "WHAT SHOULD THE MONEY DO?" → "WHAT IS THE MONEY FOR?"; "Trending now" → "New on the shelf".
- **C-4 W-40** · all five "≈₹6,90,000 / ₹1,79,000 / ₹1,10,000 a year typically hides" lines and "Most reports find money leaking" replaced with reader-only phrasing ("every leak shown in rupees a year").
- **C-5 W-29** · one chokepoint `askRM(why)`: sets `RMVIS`, voices *"You asked, so your RM can see your goal and holdings · revoke anytime in Data & privacy."* Wired to `data-askrm` (health goal CTA), `data-ak` (house lever), and `#rmallow`. Added to the listener's `closest()` list (V-30).
- **C-6 W-26** · status line *ON RECORD · Arth counts · your RM signs · you decide · next read 1 Oct* on the verdict and on both goal-page paths (`renderJobDet`, `renderJobX`). Date = first of next month (`nextReadLabel`).
- **C-7 §7** · corpus ×3, drawdowns, APR ×3 replaced.
- **C-8 §5** · income bands "Up to ₹25,00,000 · ₹25,00,000 to ₹1 Cr · Above ₹1 Cr"; 3y/5y/4y/1y → years; FY26-27 / FY25-26 / FY27 / FY28 → month-year spans; STCG/LTCG → short- and long-term gains; "/mo · annual mode" → "a month · yearly option".
- **C-9** · 59 "—" value placeholders → "…" (a loading token, not an em-dash in copy).
- **C-10 V-33** · Goals no longer auto-opens the water intro; a tappable "How to read a goal · 10 seconds" (`#jhow`) opens it.
- **C-11 V-24** · 59 Back chevrons and the success check are inline SVG. 10 webfont glyphs remain beside text in buttons (OTP phone/WhatsApp, fingerprint, Explore category icons) — decorative, text survives without them.
- **C-12 N3** · `.dhdr` pads by `env(safe-area-inset-top)`.
- **C-13 V-27 (partial)** · `.sheet{max-height:88dvh;overflow-y:auto}` — a tall sheet now scrolls instead of clipping. CTAs are not yet pinned (see Open).
- **C-14** · RM name = **Swapnil** on consent, RM tab and success copy (matches the SW avatar).
- **W-39** · success screens carry a default "Next: … Your RM sees it on record" plan line when no goal context exists.
- **Gate 5 extended** (`audit.js` in this folder): lakh ranges, year/FY/APR abbreviations, W-20, W-21, W-33, W-34, W-37, W-40, §7 jargon. JS comments and class names stripped from the corpus.

## Defaults taken on the open rulings — overrule by number
| Ruling | Default in v1.87 |
|---|---|
| **R-A** header mode | Untouched. 1 fixed `.dhdr` (goal page), 59 inline Backs. Converting 59 screens needs the ruling first. |
| **R-B** Stage 0 elements | Untouched. Arth byline label + Skip link stay (W-22 needs the byline; Skip is the escape). |
| **R-C** 1 Sep laws (W-41…47, V-40…43) | Not enforced. Nothing on Home/Wealth number stacks or "Keeping you in the loop" changed. Gate 24 passes as-is. |
| **R-D** persona | RM = Swapnil (locked persona, matches SW). User stays Rahul Mehra. |
| **R-E** legacy GOALS cluster | Kept hidden, strings made lawful. Deleting `renderGoals`/`#glist`/`s-goaldet`/`geditm` is a one-line-per-item removal once you say so. |

## Open after this build
1. **V-27 sticky footers** on 22 sheets — sheets scroll now, but the primary CTA is not pinned. Needs a `.sfoot` pattern; one edit per sheet.
2. **R-A** — 59 screens with a scrolling Back.
3. **N8 / Gate 22 / Gate 23** — real-Chrome pass at 390 and 360 @116%, 130% text on the five roots, finger-check s-jobdet under `.dhdr`. jsdom cannot see any of these; the audit says so on every run.
4. **flows.js v1.11** — update its stamp check to read `NETT_VER` and drop the `jintgo` heuristic, or retire it in favour of `flows_v187.js` + `audit.js` Gate 2.

## Demo simulations (V-31 · labelled here, not in user copy)
Unchanged from v1.86: drift reads, "demo · advance a step" on the track page, stubbed WhatsApp share, NPCI page simulation, penny-drop. `nextReadLabel()` returns the calendar first-of-next-month, not a pipeline date.
