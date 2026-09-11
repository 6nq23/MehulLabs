# Conversion audit and rebuild — 10 September 2026

Audit of the previous four-solution page and the rationale for the sales page that replaced it.
Findings are **heuristic**, not measured: there is no analytics, no traffic history and no prior
test on this page. Everything below is ranked by expected impact, not by observed impact. Nothing
here should be read as a forecast.

---

## 1. Verdict

The old page was honest, well built, accessible and low-friction — and it was not selling anything.
It offered a **conversation about scope**, not an outcome. "Request a quote is not an offer," and
"Discuss my setup" is the same thing in politer clothing.

**Earliest broken gate: Gate 3 (Desire).** Gates 1 and 2 largely passed — the page was clear and
relevant. But nothing on it named a result, a timeframe, or a reason to choose Mehul Labs over the
next agency. So the fix was never going to be copy polish; it had to start at the offer.

The rebuild changes what is being sold, then re-writes the page around it.

---

## 2. What the old page already did well — kept, not touched

| Already good | Why it matters | Status |
|---|---|---|
| Enquiry friction | One required field (brand/website), everything else optional, WhatsApp handoff rather than a form-to-inbox black hole | **Kept as-is.** This was the strongest part of the page. |
| Honesty discipline | No fabricated testimonials, no invented stats, gated evidence rendering, explicit ownership disclosure | **Kept and extended** to the new offer data (`assurances` is now test-guarded). |
| Accessibility | Native dialog, native disclosures, visible labels, live status, reduced-motion handling, no-JS fallbacks | **Kept.** No regressions; all patterns reused. |
| Visual identity | Warm paper / charcoal / forest green, Manrope + Inter, generous type scale | **Unchanged.** Every new section uses existing tokens only. |
| Campaign deep-links | `/?solution=…#…` preselecting the form | **Kept and made backward-compatible** — retired IDs still resolve. |
| Section rhythm and numbering | `01 /`, `02 /` labels, section-intro grid | **Kept**, extended to nine sections. |
| Analytics events | Local CustomEvents with no PII | **Kept**, now firing on the new CTA locations. |

---

## 3. Findings, ranked

### Finding 1 — There was no offer (Gate 3)
**Root cause.** The page sold a process ("explore the right setup", "discuss my order operations"),
not a result. Value-equation scores on the old offer: Dream outcome 2/5, Perceived likelihood 2/5,
Time delay 1/5 (no timeframe appeared anywhere), Effort 3/5.
**Fix.** A real front-end offer — the **free 20-minute leak audit**, a "reveal the problem" lead
magnet delivered live. The visitor leaves with their three ranked leaks whether or not they buy.
Every CTA on the page now asks for that one thing.

### Finding 2 — Nothing differentiated it (Gate 3)
**Root cause.** Swap-the-logo test failed outright. "We build D2C infrastructure and AI automation,
tell us your workflow" describes several hundred agencies.
**Fix.** A named mechanism — **one connected layer**: every module reads the same live order data,
so the cart knows stock, the sell agent knows what converts, the calling agent knows order state,
and marketing is judged on delivered revenue rather than platform-reported revenue. That last point
is the argument the page rests on, and it is structurally true rather than a claim.

### Finding 3 — The risk position was invisible (Gate 4)
**Root cause.** The heaviest objection family ("what if I'm wrong") was unaddressed. The page hedged
constantly ("not a guarantee", "does not guarantee") without ever stating what the buyer *was*
protected from.
**Fix.** Three owner-approved commitments, given their own section: the audit costs nothing and
commits to nothing; fixed scope in writing before any work; everything built in the client's own
accounts, so nothing switches off if the relationship ends. No refund or results promise was
invented — `npm test` fails if one appears without an owner decision.

### Finding 4 — Eight products, no decision architecture (Gate 5)
**Root cause.** The new catalogue is eight modules. Presented flat, that is choice overload: more
options, less action. The old page had this problem with four.
**Fix.** Three outcome-named systems plus an all-in-one — four choices, with all eight modules named
inside them. The enquiry form mirrors the same four, so the page and the form cannot drift.

### Finding 5 — No problem, no agitation, no failed alternatives (Gates 1–3)
**Root cause.** The page opened at "here is our solution" for an audience largely sitting at
problem-aware/solution-aware. Nothing established that Mehul Labs understood the reader's day.
**Fix.** Two new sections. *The three leaks* names the pain in operator vocabulary (RTO, NDR, COD,
festive spike) — and, because no verified statistic exists, each leak ends with a **check-it-yourself
instruction** using numbers the reader already has. That is honest loss framing with no invented
data. *Why the usual fixes slip* names the three things they have already tried (apps, an agency,
more headcount) before the mechanism claims anything.

### Finding 6 — Above the fold was missing four of its seven jobs (Gate 1/2)
**Root cause.** The old fold had a headline, a subhead and a CTA. No proof, no risk reducers, no
qualification, and a headline that described the company's system rather than the reader's outcome.
**Fix.** Headline now names three outcomes and lands on the core desire ("Less of it runs on you").
Added a four-item credential strip, three FUD reducers directly under the button, a wide hero image
and a four-way chooser — all seven fold elements now present. The image is still a stand-in (§7).

### Finding 7 — No qualification, so lead quality was uncontrolled (guardrail)
**Fix.** A "worth 20 minutes if / not yet, if" block that disqualifies pre-launch brands, people
looking for someone to run the business for them, and price shoppers. Turning away the wrong lead is
what makes the rest of the page credible.

---

## 4. Requirement checklist

| # | Requirement | Before | After |
|---|---|---|---|
| 1 | Customer clarity — one specific person | Partial — "founders managing growing brands" | **Pass** — Shopify D2C operator, COD-heavy, multi-brand, has traffic |
| 2 | Offer clarity — restatable in one sentence | Fail | **Pass** — free 20-min leak audit → fixed-scope build of one system |
| 3 | Core desire, not surface outcome | Fail — "manage orders" | **Pass** — "less of it runs on you" |
| 4 | Differentiation vs the obvious alternative | Fail | **Pass** — one connected layer; delivered revenue not platform revenue |
| 5 | Relevance / message match | Pass | **Pass** — kept, plus legacy campaign IDs still resolve |
| 6 | Proof — specific, attributed, verifiable | Weak — owned brands named, no figures | **Weak, honestly** — operator story upgraded; figures still gated (§7) |
| 7 | Objections — all five families | Partial | **Pass** — 12 FAQs, fit block, assurances, failed-alternatives section |
| 8 | Risk reversed or acknowledged | Fail | **Pass** — three approved commitments, own-accounts ownership |
| 9 | Psychology — barrier-matched, not decorative | Partial | **Pass** — see §6 for the barrier each section removes |
| 10 | CTA — action-oriented, repeated, next step stated | Weak — "Discuss my setup", vague next step | **Pass** — one CTA, six placements, explicit "what happens next" |
| 11 | Friction — cognitive, decision, mechanical | Good mechanically, poor on decision load | **Pass** — 8 modules → 4 decisions; form unchanged |
| 12 | Awareness match | Fail — opened above the reader's rung | **Pass** — opens at the problem, escalates to mechanism |
| 13 | Traffic match (cold-capable) | Fail — too short, no proof, no risk reversal | **Pass** — structured long page, each section removes one uncertainty |
| 14 | One primary conversion goal | Partial — four competing solution CTAs | **Pass** — every CTA asks for the audit |
| 15 | Scan test (headlines alone tell the story) | Fail — generic headers | **Pass** — every header states a claim |
| 16 | Ethical compliance | Pass | **Pass** — no invented numbers, urgency, guarantees or testimonials |

---

## 5. The offer

**Promise (one sentence).** We build and run the operating layer behind Indian D2C brands — store
conversion, order operations and demand — on one connected system inside your own accounts, starting
with one workflow live rather than a six-month roadmap.

**Value-equation attack.** The binding constraints were *dream outcome* and *time delay*. Dream
outcome is fixed by naming revenue and freedom rather than order management. Time delay is fixed by
the four-step process, where step 1 delivers value in 20 minutes and step 3 is one live workflow —
not a phased programme.

**Vectors owned.** Risk (own-accounts ownership, fixed scope, free audit) and speed (one workflow
live before anything else is touched). Ease was already partly present in the enquiry flow.

**Front end.** Lead magnet, type 1 — "reveal the problem", delivered live. Chosen over a direct
offer because a direct ask only converts the top two awareness rungs, and this catalogue is being
sold to a market that mostly does not know an integrated option exists.

**Structure.** Three systems (8 modules) + all-in-one custom. Pillar → modules → fit → price → CTA.

**Risk position.** Owner-approved, September 2026: free non-committal audit; fixed written scope
before work; client-owned accounts. No refund, no performance guarantee, no results claim.

---

## 6. Section jobs

| # | Section | Customer question | Barrier removed |
|---|---|---|---|
| — | Hero | "Is this for me, what is it, what do I do?" | Relevance, clarity, first-impression trust |
| 01 | The three leaks | "Do they understand my situation?" | Problem-awareness; loss aversion, honestly applied |
| 02 | Why the usual fixes slip | "Why hasn't anything worked?" + "Why does *this* work?" | Failed alternatives; high market sophistication demands a mechanism |
| 03 | What we run | "What do I actually get, and can I afford it?" | Choice overload; labour illusion via itemisation |
| 04 | Who is behind it | "Am I dealing with real operators?" | Authority, without a client list they don't have |
| 05 | How it works | "How long, and how much of my life does it take?" | Time delay and effort |
| 06 | What you are not risking | "What if I'm wrong?" + "Is this me?" | The heaviest objection family; lead-quality guardrail |
| 07 | Behind Mehul Labs | "Who am I dealing with?" | Personal-brand trust; empathy as credential |
| 08 | Straight answers | Residual objections without breaking flow | The five objection families |
| 09 | Start the audit | "OK — how do I start?" | Mechanical friction; uncertainty about what happens next |

---

## 7. Open items — these need you, not code

1. **Starting prices.** You chose to publish a "from" anchor per pillar. Set `startingPrice` in
   `src/data/offer.ts` for each of the four (`{ amount, currency, unit, basis }`). Until then the
   page honestly says "Scoped after the audit". This is the single biggest remaining lift: a price
   floor filters out people who can never buy and anchors the value of everyone who can.
2. **Order-volume evidence.** You said the owned-brand volumes can be published. They still need a
   dated report, a count definition and a named source before anything renders — see
   `docs/operating-evidence.md` and the template comment in `src/data/experience.ts`. Gate 4 (proof)
   is the weakest gate on the page and this is what closes it.
3. **Real images for the three slots.** `src/data/media.ts` defines three slots — hero, proof and
   founder — each with an `intent` describing exactly what the replacement has to show. All three
   currently borrow the brand-film poster, which is a brand illustration, not a screenshot and not a
   photograph. The `alt` and `caption` say so honestly. Replacing them, especially the hero and proof
   slots, will do more for perceived value than any further copy. Redaction rules are in
   `docs/operating-evidence.md`.
4. **Delivery feasibility of the audit.** The whole front end assumes you can give 20 focused
   minutes per qualified lead, having looked at their store first. If that stops being true at
   volume, the offer breaks before the page does. Decide the ceiling now.
5. **Reply window.** `site.replyWindow` publishes "Usually within one working day". Confirm you will
   hold to it, or change the string.
6. **A measured number.** The page currently carries only counts that are true by construction —
   2 brands, 3 festive peaks, 3 systems, 8 modules, 4 steps, 20 minutes, 100% in your accounts. It
   carries no percentage or result figure, because none is substantiated. `publishedMetrics` in
   `src/data/offer.ts` is the slot for the first real one: give it a value, a count definition, a
   basis and a source, and a stat band appears in the proof section. One verified figure would lift
   Gate 4 more than any other single change on this list.

---

## 8. Test queue

**Traffic-feasibility warning first.** Below roughly a few hundred conversions a month, A/B tests
will not resolve. Ship items 1–3 as straight implementations and use qualitative research —
five-second tests and recorded walkthroughs with real D2C owners — rather than splits. Only run
item 4 as a split once volume supports it.

1. **Ship, don't test:** publish the price anchors. Diagnosed problem: the page cannot answer "can I
   afford this?", so unqualified leads consume audit capacity.
2. **Ship, don't test:** publish one order-evidence figure with its report. Gate 4 is the weakest
   gate; this is the only thing that materially strengthens it.
3. **Ship, don't test:** add a real hero visual. Missing above-the-fold element.
4. **Test when volume allows:** *If* we replace the outcome headline with a loss-framed variant
   ("The orders you booked last month that never reached your bank"), *we expect* audit requests to
   rise, *because* the diagnosed opening barrier is problem-awareness rather than solution-awareness.
   Primary metric: WhatsApp handoffs per session. Guardrail: share of handoffs that qualify on the
   fit criteria. Falsified if handoffs rise while qualified handoffs fall.
5. **Qualitative, now:** five representative D2C owners, including two who did not proceed. Ask what
   is being offered, what it would handle in their business, what is unclear, and what evidence they
   would need. Record their words, not a summary.

---

## 9. Assumptions

- `[ASSUMPTION]` Traffic is mixed cold paid, warm referral and brand search, weighted cold. The page
  is built for the cold case, which is the demanding one. If traffic turns out to be mostly warm
  referral, the leaks and failed-fixes sections can be shortened.
- `[ASSUMPTION]` Dominant audience is Shopify, COD-heavy, Indian D2C, past product-market fit. The
  fit block states this explicitly, so the assumption is visible to the reader and self-correcting.
- `[ASSUMPTION]` Market sophistication is high for marketing and Shopify apps, medium for AI ops.
  This is why a mechanism section is mandatory rather than optional.
- `[ASSUMPTION]` Modules are built inside client-owned accounts. The entire published risk position
  depends on this being literally true. If any module runs on Mehul Labs infrastructure that a client
  would lose access to, assurance 3 must be rewritten before launch.

---

## 10. Numbers policy

Numerals convert better than words, and the page now uses them everywhere they are earned. Two
categories, treated differently:

**Structural counts — used freely, no report needed.** These are true by construction and anyone can
verify them by reading the page: 2 owned brands, 3 leaks, 3 systems, 8 modules, 4 steps, 3 festive
peaks, 14 days, 20 minutes, 1 fixed scope, 100% built in your accounts, zero retainer.

**Measured figures — gated, and currently empty.** Order volumes, call counts, conversion or AOV
movement, RTO reduction, percentage lifts. None of these appear anywhere on the page. A percentage
like "50% fewer RTOs" or "100% more revenue" would be a fabricated statistic: it is on the
prohibited list in the shared knowledge base, it is the fastest way to lose a sophisticated buyer
who checks, and in India it is exposed under the Consumer Protection Act's misleading-advertisement
provisions. The engineering answer is `publishedMetrics` — add a real figure with its report and it
publishes itself.

The problem section deliberately replaces the missing statistics with **check-it-yourself
instructions**. "Count last month's returns to origin and multiply by shipping both ways" lands
harder than a borrowed industry average, because the reader arrives at their own number and cannot
argue with it.
