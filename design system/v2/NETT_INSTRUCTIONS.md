# NETT_INSTRUCTIONS.md — the operating contract
**Read this with the project context files. This file never restates canon — it tells you how to work with it.**

## 0 · Precedence & anti-duplication (the rule that prevents confusion)
The canon lives in the project files, in this order of authority:
1. **The code** — `nett-app.html` (v1.4) · `nett-crm.html` (v2.11) — always wins.
2. **The canon docs (in project context):** `Nett_Design_System.html` · `Nett_UX_Architecture.html` · `Nett_Motion_Architecture.html` · logo assets (`nett-logo-direction-C-waterline.html`, `nett-logo-mark.json`, `nett-loader.json`) · `ux-spec-prompt.md`.
3. These two md files (`NETT_INSTRUCTIONS.md` + `NETT_RULE_BOOK.md`) — **process + deltas only**. If anything here disagrees with 1 or 2, the higher source wins and this file gets corrected in the same release. Never quote this file against the docs.

## 1 · Default output contract — every design/build task ships the track bundle
| # | Artifact | App track | CRM track |
|---|---|---|---|
| 1 | Design file, version bumped in-file | `nett-app.html` (`NETT_VER`) | `nett-crm.html` (`CRM_VER` + login stamp) |
| 2 | Diff file: change map w/ exact anchors + full unified diff | `NETT_CHANGES_APP.md` | `NETT_CHANGES_CRM.md` |
| 3 | Release notes entry — latest on top, IST date+time, disclosures included | `Nett_App_Release_Notes.html` | `Nett_CRM_Release_Notes.html` |
| 4 | Flow doc rows for new/changed screens, states, flows | `Nett_App_Flow_Doc.xlsx` | `Nett_CRM_Flow_Doc.xlsx` |
| 5 | Validation run — **full output, never cropped** | `appcheck.js` | `crmcheck.js` |
All artifacts on a track bump **together, same version**. Shared-canon changes (tokens, components, marks, motion) also update the relevant canon doc **in the same release** + a DOCS entry mirrored in both release-note files.

## 2 · Validation gates — before any ship, check the work against
1. `Nett_Design_System.html` — tokens · lavender-is-Arth-only · Tabler-only · radii/spacing · physical canon.
2. `Nett_UX_Architecture.html` — ten principles · §5 spec contract (five states, affordance-from-value, RANGE vs RULE, validation timing).
3. `Nett_Motion_Architecture.html` — three laws · closed keyframe inventory · no spinners · reduced-motion absolute.
4. **Logo assets** — wordmark & mark geometry from `nett-logo-direction-C-waterline.html`; animated mark/loader from the two Lottie files. Never redraw or invent alternates (see RULE_BOOK §2 for asset-usage deltas the docs don't carry).
5. `ux-spec-prompt.md` — the PM↔build spec contract; `UNSPECIFIED` never blank.
6. **The core concept** — every element must be describable as water doing something water does. If not, it doesn't belong.
Then run the automated stack and add a permanent check for anything new. **A red check blocks the ship. The diff, not the print, is the authority on what changed.**

## 3 · Change protocol (UX Architecture §4 — mandatory, any requester, any seniority)
Restate in one line → cross-check the gates and **cite the exact rule** on conflict → clean = build; conflict = **STOP and confirm** with 2–3 canon-honoring options + impact (screens, flows, surfaces) → ship with asserted all-or-nothing patches + full audit + bundle bump → **disclose every self-caught mistake** (including tooling/checker errors) in the release note → canonize anything new into the docs, same release.

## 4 · Gap discipline (ux-spec-prompt.md)
Unknown → `UNSPECIFIED`, ask before building. Forced to decide → decide, build, flag: *"Affordance chosen, not specified: ‹field›. Spec shows ‹X›; I used ‹Y› because ‹reason›. Overrule me if ‹X› was intended."* Every bug disclosed with root cause + quantification. Every number validated; sums tie to the rupee; the two surfaces never disagree on the same fact.

## 5 · Sign-off owners (never proceed past these)
**Founder:** new tokens/components/marks/themes · the G8 gold decision (see RULE_BOOK §3) · demo cases becoming canon. **Yogesh sir:** suitability house-rules, RM-visibility disclosures, anything touching the regulatory perimeter. **Rule Book owner (PM):** PARTIAL confidence formula · diagnostic rules & band thresholds.

## 6 · Output tone
CEO-lens: direct, numbers-first, immediately usable files, zero filler. Mistakes surfaced, never buried.
