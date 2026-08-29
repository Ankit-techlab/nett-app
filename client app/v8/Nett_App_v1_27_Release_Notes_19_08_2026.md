# Nett app v1.27 — Explore feedback 1–7
**Build:** `nett-app_v1_27_19_08_2026.html` · md5 `f368fa24…` · base v1.26 · 19 Aug 2026 · **14 suites / 394 assertions green**

| # | Ask | Shipped |
|---|---|---|
| 1 | No global search | Explore's search bar is gone. Search lives on the shelf, always combined with the active category — type "crestline" inside Mutual funds and only funds answer. |
| 2 | MF categories | Large cap · Small cap · Flexi cap · Index · ELSS · Liquid — a chip row that appears only inside MF and resets on every entry. A small-cap fund added so the category is real (demo, G-07). |
| 3 | Yield ≠ MF | The Yield sort chip now exists only in Bonds & deposits; a stale yield sort resets to Name on leaving. "CAGR" reads **Returns** — plain words, per the jargon law. |
| 4 | Scheme names | `Meridian Flexi Cap · Direct Growth`, `Crestline Bluechip · Direct Growth`… — titles are schemes; the small label above carries the category (`MUTUAL FUND · LARGE CAP`). Fund detail and order flow re-tied — three name consumers traced before the rename. |
| 5 | Insurance → RM | No purchase in-app. The CTA is **"Bring Swapnil in — he answers on record"** and lands in his thread. The old payment form is unreachable from insurance. |
| 6 | Drop the last MF calculation card | The "What this costs · what we earn" card is off the fund page. Fee-before-you-act still holds — the trail stays on the listing line (RB 1.9). One revert away if Yogesh's fee round wants it back. |
| 7 | Liability rates editable | Prefilled on all three (home 8.9 · car 9.5 · card 42, "% a year"). A correction shows its provenance — *"You corrected this — the statement shows 8.9%. Swapnil sees both."* — and disappears if you restore the statement figure. |

**Held with the reason cited, not silently:** rate edits don't recompute "Interest remaining" — that figure is already contested under **L-1**, and recomputing one side would put two different numbers on two screens (RB 1.6). The arithmetic waits for your ruling.

**Disclosed:** my new chips and rate inputs were dead on first build — the exact `actionable()` registration bug from v1.21, this time introduced by me and caught by my own suite two minutes later. Both attributes registered; the rule is now mechanical: a new `data-*` action attribute ships with its KD registration in the same edit.

**Internal talk:** zero. All new copy passed the voice gates (no lakh, slashes, T+N, system words).

**Handset checklist:** MF chip row wrap at 390px · rate fields above the soft keyboard · decimal keyboard fires on rate inputs.

**Your desk, unchanged:** V-1 · L-1 (now blocking item-7 arithmetic too) · R-2 · C-1/C-5 · C-2/3/4 · E-1 · fee wording (Yogesh).
