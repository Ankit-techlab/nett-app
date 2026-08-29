# Nett app v1.25 — voice compliance (final-build pass of /nett-ux-writing + /nett-interaction-audit)

**Build:** `nett-app_v1_25_19_08_2026.html` · NETT_VER 1.25 · md5 `764f2ada…` · base v1.24 · 19 Aug 2026

## What the two skills found on the "final" build

The writing law caught **~47 violations across 5 classes** that the enforced voice gate had been passing for twelve versions — because the gate only scanned literal ₹ characters while half the app's copy lives in JS-escaped strings. The interaction audit then caught **me**: one intermediate suite run executed against a stale file (my patch had aborted before writing), flagged by the identical checksum and the build-identity gate. That run was voided; everything below is verified on the real build.

## The five fix classes

**W-A — 12 slash-flows spelled out.** ₹25,000/month → ₹25,000 a month, and eleven siblings including 1%/month penalty lines and Arth chat strings. Slashes are for spreadsheets.

**W-B — 21 lakh-suffix figures expanded.** ₹1.9L → ₹1,90,000, ₹3L chips → ₹3,00,000, and a Decimal-exact sweep of eleven more (₹1.64 L … ₹62 L). My first sweep had a float bug that would have written ₹17,89,999 instead of ₹17,90,000 — the all-or-nothing assertion caught the one-rupee lie before it touched disk. Specificity is the premium signal; a wrong specific number is worse than a rounded one.

**W-C — 9 T+N times made human.** "Money in your bank in T+2" → "within 2 working days," across order confirms, redemption, bond rows. Disclosed conflict: the DSR's own specimen toast still shows T+2 — a photograph of v1.14 copy; the Rule Book's newer prescriptive law wins, and the specimen is flagged for the DSR's next edition.

**W-D — the fictional bond lost its banned word.** "State guaranteed 2028" → "State development loan 2028." Real instrument class, no claim, and the row was already fictional under G-07.

**W-E — four unexplained "free" claims resolved.** The report CTA drops the claim, the rider states its mechanism ("at no added premium"), the two review lines become "on record." The full fee-transparency sentence remains pending Yogesh sir — nothing shipped unapproved.

## What was examined and deliberately kept

"₹1,90,000 free" — surplus cash, not a fee claim. "What should I do?" — the user's own words; the should-ban binds Arth. The nominee and PAN toasts — information after handled actions. The Explore tab — canon navigation.

## The gate can't miss this again

audit.js gained three voice patterns (escaped-₹ lakh, spelled slash-flows, T+N) — and the proof runs both ways: the strengthened gate **fails v1.24 on exactly these three** and **passes v1.25 at 17/17**.

## Verification

**Twelve suites, 318 assertions, all green** · population gate PASS across 70 screens · dead-button advisory: zero new dead controls (the known 32 = R-2 nine + state-leak false positives, unchanged since v1.23). Copy-only release: zero markup structure, handlers, or CSS touched.

## Open register — unchanged, on your desk

| Ref | Item |
|---|---|
| V-1 | v1.16 lineage collision — **still the highest-risk open item** |
| L-1 | Car-loan canon contradiction (52 × ₹23,800 vs ₹2,40,000) |
| R-2 | 9 pre-existing dead buttons |
| C-1 / C-5 | Swapnil-in-lavender (bubbles + SR avatar) · daily-action card border |
| C-2/3/4 | Pre-v1.14 type/hex/radius drift — options tabled |
| DSR erratum | §5b specimen toast carries T+2 — update at next DSR edition |
