# Ad-to-booking readiness review — 18 September 2026

## Verdict
The site is a useful service-led starting point, not evidence of an optimized conversion rate. Do not send every ad to any arbitrary page. The promise, audience, page, price and next action must agree. The highest-priority remaining launch dependencies are completed-booking measurement, corrected ad claims, an intentional Calendly intake, and a real demonstration. No paid campaign, customer testing or conversion lift was measured in this review.

## Calendly completed first
All navigation, homepage, service, offer, calculator, about and product call CTAs use `site.bookingUrl`, pointing to https://calendly.com/kalathiyamehul13899/30min. Call duration is 30 minutes throughout. The audit form is replaced by a simple booking card; WhatsApp is an optional message route. Older `/...#contact` incoming links still reach a section with a Calendly button. No authentication or embed is needed for the direct website link.

Browser verification: clicked the site's booking link, saw Mehul Kalathiya / 30 Minute Meeting, selected September 21, selected 10:00am IST, and reached Enter Details. No details were entered and Schedule Event was not pressed. Confirmation emails and calendar delivery therefore remain untested.

Observed calendar gaps (account settings were not changed):
- Generic event title does not carry the MLabs/free-audit promise. Suggested title: “MLabs — Free 30-minute discovery call”. Description should explain both service and product discussions and the next step.
- Required fields are name/email; the preparation question is optional. Website, selected service and business problem are not required or automatically transferred. Suggested intake: website/company, service/product interest, and one short “What should we solve?” question. Do not ask for passwords or customer exports.
- September 21 showed slots from 12:00am through 11:00pm in India Standard Time. Review whether these working hours are intentional, along with calendar conflict checks and buffers.

## Before / fix / status
| Issue | Evidence / consequence | Work done or dependency |
|---|---|---|
| Audit handoff and duration mismatch | Old WhatsApp form; 20-minute copy versus supplied 30-minute calendar | Fixed all booking routes and duration copy; clearly state external confirmation |
| Unclear CTA | “Find my first fix” / “Fix my order operations” did not explicitly mean a call | Homepage and service hero now say book a free audit call |
| Service visitors lack homepage context | Owned-brand explanation, price and FAQ mainly on home/offers | Added pilot price and scope link near the service hero, owned-brand context and booking/intake explanation on every service page |
| Campaign source disappears | Static internal and Calendly links discarded incoming campaign tags | Five standard UTMs now travel through internal navigation and into Calendly; unit and browser checks pass. No arbitrary query values or personal form data forwarded |
| No completed-booking measurement | `trackConversion` emits local browser click events only; no analytics vendor configured | Still a launch dependency. UTM handoff is not a booking conversion, ad-platform attribution or CRM |
| Misleading leftover text | Hidden fit list followed by “left-hand list” and “twenty minutes” | Removed the dangling reference and made the call length explicit |
| Product is not purchasable | Skill Manager has no public checkout, price or confirmed release | Keep clearly in-development; not a destination for buy-now campaigns |

## Campaign-to-page map
| Ad promise | Relevant entry page | Required context / success event |
|---|---|---|
| Shopify pages, cart and conversion | `/services/store-conversion` | Store problem, one scoped implementation; qualified booked audit |
| COD confirmation, failed-delivery calls, order handoffs | `/services/order-operations` | Show a relevant calling/workflow demo; approved human handoff and costs; qualified booked audit |
| Reusable brand context, AI briefs, managed marketing | `/services/ai-automation` | Explain workspace versus implementation; qualified booked audit |
| Broad introduction to Mehul/MLabs | `/` | Useful for general exploration; less specific than a service page |
| Existing audience comparing price/scope | `/offers` | $5,000 USD pilot versus custom; free call is not purchase |
| RTO cost or inventory calculation | Matching `/tools/...` | Fulfil the calculator promise first; tool use and qualified calls are different outcomes |
| Skill Manager curiosity or research | `/products/skill-manager` | Explicitly pre-release interest; never advertise instant access or purchase |
| About / product catalogue | `/about`, `/products` | Supporting research destinations; not the default for a specific implementation ad |

## Existing script review
Sources: `../scripts/001-six-ai-employees-intro.md`, `004-cod-rto-calling-agent.md`, `007-ai-tool-vs-ai-employee.md`, and `../marketing/05-campaign-plan.md`. These are historical local notes, not freshly verified platform analytics.
- S01 is a follow-the-series introduction, with a six versus four-to-six count mismatch. It does not currently promise a booked audit. Change the closing CTA if adapting it for service acquisition; do not treat views or followers as purchase validation.
- S04 has a broken ending and no completed CTA. Its 25–30% industry RTO statistic and “2–3 successful orders” claim need sources or removal. The 500-order example must remain hypothetical, not attributed to Diorin. Do not put spend behind the unfinished cut.
- S07 says our RTO decreased while the supplied notes say it was untracked. Remove the unverified result. Explain the actual workflow, exception rules and human review; show a real demonstration if available. The original next-video cliffhanger is not a booking CTA.
- Hindi/Hinglish creative landing on English pages is a comprehension hypothesis to test with the actual buyers, not proof that translation will lift conversions. A campaign-specific Hindi/Hinglish version is sensible only if interviews/task tests show the mismatch matters.

Example replacement closing for a COD service ad (draft, not published): “COD confirmation is taking up your team's day? Let's review your order flow and where a calling workflow could fit. Book a free 30-minute MLabs audit.” This does not claim an RTO reduction or unattended reliability.

## Research basis
Google's [ads and landing-page guidance](https://support.google.com/google-ads/answer/6238826?hl=en) recommends matching landing-page content and action to the ad, making mobile navigation easy, and putting decision-critical information where visitors can find it. Applied here: specific service destinations, explicit booking actions and visible scope/pricing. It does not establish a universal template or guaranteed lift.

Calendly's [tracking and reporting documentation](https://calendly.com/help/tracking-and-reporting) explains scheduling-link UTMs and Google Analytics / Meta Pixel / post-booking redirect options. Applied here: forward standard UTMs. Account integrations, plan availability and booking confirmations still need validation. Do not label outbound clicks “booked calls”.

## Before scaling paid traffic
1. Confirm the offer and correct the selected ad script; get a reproducible workflow demo or appropriately approved evidence.
2. Set the Calendly title, description, intake and real working hours. Complete one owner-controlled test booking and check confirmation/calendar delivery.
3. Connect the selected analytics/ad platform to actual booking completion, verify consent requirements and account-specific cross-domain/click-ID handling, and test deduplication. No IDs or account access were supplied here; no pixel was invented or installed.
4. Run a small controlled campaign to one matching page and audience, with a pre-agreed loss limit. Track landing visits → calendar visits → completed bookings → qualified calls → attendance → proposals → paid deals. Compare cost per qualified call and customer, not click-through alone.
5. Ask representative buyers to explain the offer, cost and next action without coaching. Note confusion and failed tasks; then test the strongest hypothesis. There is no traffic/sample baseline to support a fixed test duration or promised conversion rate.

## Verification scope
Astro check, 30 tests (including UTM forwarding/exclusion), production build, rendered booking destination crawl, and local browser journey checks. The real Calendly form loads without an appointment being created. Website changes remain local until deployed. Account configuration, actual confirmation delivery, live-site performance/field Core Web Vitals, paid attribution and customer comprehension remain unverified.

Final QA: 58 rendered Calendly links across 15 built pages use the supplied destination. A fresh browser session verified tagged service page → pricing section → Calendly, retaining `utm_source`, `utm_medium` and `utm_campaign`; no console errors on that journey. Campaign tags are added on normal link activation, not by rewriting unhydrated React markup. Without JavaScript, the original booking links still work, but UTM forwarding does not. Copying an unactivated link or using a browser context-menu “open” can bypass forwarding. No persistent first-touch attribution is claimed. The contact card now renders without a React hydration island. Production build and 30 tests passed after the interaction fix.
