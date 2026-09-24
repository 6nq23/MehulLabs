---
layout: ../../layouts/BlogPostLayout.astro
draft: true
title: "Shopify Sidekick 2026: What It Automates (and What Not)"
description: "Shopify Sidekick in 2026: what it automates, where it stops, 10 prompts to try, and when to use Shopify Flow or a custom AI workflow for your store instead."
publishedOn: "2026-09-24"
updatedOn: "2026-09-24"
category: "AI automation"
author: "Mehul"
readTime: "11 min read"
coverImage: "/Blogs/shopify-sidekick-2026-guide/shopify-sidekick-hero.png"
coverImageAlt: "Concept illustration of the redesigned Shopify admin with Sidekick as a floating AI chat assistant"
wordCount: 2300
faqs:
  - question: "Is Shopify Sidekick free?"
    answer: "Shopify says Sidekick is included with your Shopify plan at no additional cost, but features and usage limits vary by plan. For example, generating custom apps with Sidekick is limited to the Grow, Advanced and Shopify Plus plans, with hourly and weekly limits, and image generation limits also depend on the plan."
  - question: "Can Shopify Sidekick make changes to my store without approval?"
    answer: "No. Shopify's Help Center states that Sidekick cannot change your store without your approval and presents options for you to review. Order edits apply only after you click Update order, draft orders save only after you click Save, and theme changes must be saved manually in the theme editor."
  - question: "Can Sidekick build Shopify Flow automations?"
    answer: "Yes. Since December 2025, Sidekick can generate a Shopify Flow workflow with a trigger, conditions and actions from a plain-language description. Flow must be open on desktop, and you test and activate the workflow yourself. Shopify notes that workflows with advanced Liquid or custom code may need manual editing."
  - question: "What is Sidekick Pulse?"
    answer: "Sidekick Pulse is a feature that researches your store's data and shows up to 5 suggested actions as cards on the Shopify admin Home page. As of September 2026 it is in early access for certain merchants with recent sales, and only the store owner or staff with admin access can use it."
  - question: "When should a Shopify brand use a custom AI workflow instead of Sidekick?"
    answer: "Use a custom workflow when the job crosses systems Sidekick does not reach, such as courier portals, WhatsApp, calling tools, ad accounts or accounting software, or when output depends on detailed brand rules and a human approval chain. Keep Sidekick for questions and edits that start and finish inside the Shopify admin."
---

Shopify Sidekick automates a growing list of jobs inside the Shopify admin: ShopifyQL sales reports, product and marketing content, order edits, Shopify Flow automations, theme settings and admin-only apps. It does not run work that lives outside Shopify, and it does not replace the judgment a brand applies before anything goes live.

The timing matters. On 15 September 2026, Shopify began rolling out a redesigned admin in which Sidekick moved from a side panel to a floating chat at the bottom of every page. Now it is on every screen, so it is worth knowing where it helps and where it stops.

This guide lists only features we verified in Shopify's documentation, with dates, plus a decision table and 10 prompts.

<figure class="blog-feature-image">
  <img src="/Blogs/shopify-sidekick-2026-guide/shopify-sidekick-hero.png" alt="Concept illustration of the redesigned Shopify admin with Sidekick as a floating AI chat assistant" width="1600" height="900" fetchpriority="high" decoding="async">
  <figcaption>Concept illustration of Sidekick as a floating chat in the redesigned Shopify admin. This is not a product screenshot.</figcaption>
</figure>

> **Key takeaways**
>
> - Sidekick became a floating chat on every admin page in the redesign that began rolling out on 15 September 2026.
> - It can report, write, edit orders, build Shopify Flow workflows and adjust themes, but every change needs your approval.
> - Plans, permissions and early-access status limit some features, including app generation and Sidekick Pulse.
> - Work that crosses couriers, WhatsApp, calling, ad accounts or finance tools still needs a custom AI workflow.

<div class="blog-brand-strip" aria-label="Platforms covered in this guide">
  <p>Platforms in this guide</p>
  <span><img src="/platforms/shopify.svg" alt="" width="18" height="18" loading="lazy">Shopify</span>
  <span>Sidekick</span>
  <span>Shopify Flow</span>
  <span><img src="/platforms/claude.svg" alt="" width="18" height="18" loading="lazy">Claude</span>
  <span><img src="/platforms/openai.svg" alt="" width="18" height="18" loading="lazy">ChatGPT</span>
</div>

## In this guide

- [What Sidekick is in 2026](#what-is-shopify-sidekick-in-2026)
- [The September 2026 admin redesign](#what-changed-in-the-september-2026-admin-redesign)
- [What Sidekick can do now](#what-can-shopify-sidekick-do-right-now)
- [Plans, languages and access](#which-plans-languages-and-staff-can-use-sidekick)
- [Where Sidekick stops](#where-does-shopify-sidekick-stop)
- [Sidekick, Flow or a custom workflow](#when-should-you-use-sidekick-shopify-flow-or-a-custom-ai-workflow)
- [Using Sidekick safely](#how-do-you-use-sidekick-safely)
- [10 prompts to try](#which-sidekick-prompts-are-worth-trying-first)
- [Frequently asked questions](#frequently-asked-questions)

## What is Shopify Sidekick in 2026?

Sidekick is Shopify's AI assistant built into the admin. The [Shopify Help Center's Sidekick overview](https://help.shopify.com/en/manual/ai-powered-tools/sidekick) describes it as a way to get guidance, generate content, build apps and complete tasks in plain language, on desktop, mobile and even Apple Watch, by text, voice or screen sharing.

Two shifts define the 2026 version. It acts rather than only answers, filling forms, editing orders and creating workflows for your review. It also reaches into other apps. Shopify's [Spring '26 Edition announcement](https://www.shopify.com/news/spring-26-edition-merchant), published on 17 June 2026, says Sidekick App Extensions were live for 15+ partners, including Klaviyo, Loop and Smile.

Shopify's [memory and personalization page](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/memory) adds that Sidekick keeps conversation history for about 3 months and recent admin activity for about 12 hours, and will forget details on request.

## What changed in the September 2026 admin redesign?

Shopify's changelog post [*A new look for the Shopify admin*](https://changelog.shopify.com/posts/see-the-shopify-admin-s-new-look), dated 15 September 2026, says the redesign rolls out gradually with no setup. It brings new colour, type and icons, moves search and notifications into a collapsible side navigation, and makes Sidekick a floating chat on every page.

The practical change is proximity: the input now sits at the bottom of every page, so questions happen in the context of what you are viewing. The [getting started guide](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/set-up) confirms that Sidekick uses the page you are on as context for your question. Because the rollout is gradual, as of 24 September 2026 some team members may see the new frame before others.

## What can Shopify Sidekick do right now?

Shopify's [help and guidance page](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/help-and-guidance), changelog and Editions pages document 8 working capability areas, plus Pulse suggestions on the Home page. The table lists each with the first date we could confirm and the main condition attached.

| Capability | What it does | First confirmed | Key condition |
|---|---|---|---|
| Reports and analytics | Writes ShopifyQL queries, charts and exports | Winter '26 Edition, 10 Dec 2025 | Export links expire after 10 minutes |
| Content and forms | Drafts descriptions, blog posts and images; fills admin forms | Help Center, current | Generated fields are highlighted in purple for review |
| Orders and draft orders | Adds items, changes quantities, applies discounts, sets shipping | Help Center, current | Changes apply only after you click Update order or Save |
| Shopify Flow automations | Builds a workflow with trigger, conditions and actions | Changelog, 11 Dec 2025 | Desktop only; you activate it |
| Theme edits | Changes colours, typography, spacing and block settings | Winter '26 Edition, 10 Dec 2025 | Must be in the theme editor; you save manually |
| App generation | Builds admin-only apps with code editing and version history | Winter '26 (apps), Spring '26 (code editing) | Grow, Advanced and Plus plans only |
| Third-party apps | Answers questions and completes tasks in supported apps | Spring '26 Edition, 17 Jun 2026 | You approve each app per conversation |
| Shopify Balance | Checks funds and initiates transfers | Changelog, 15 Sep 2025 | US stores using Balance only |

### Shopify Flow automations

Shopify's changelog post [*Create Flow automations with Sidekick*](https://changelog.shopify.com/posts/create-flow-automations-with-sidekick), dated 11 December 2025, says it works well for tagging, email and Slack notifications, inventory alerts and scheduled automations, while advanced Liquid or custom code may need manual editing. The [Spring '26 Editions page](https://www.shopify.com/editions/spring2026) added the ability to generate test events for Flow.

### Theme and app code

Theme edits change settings on sections and blocks already on the page, such as colours, typography and spacing; they are not free-form code rewrites. For code, the [app generation page](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/generate-apps) says generated apps use only the Admin API, cannot touch themes, checkout or customer accounts, and keep a version history you can restore.

### Sidekick Pulse suggestions

[Sidekick Pulse](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/pulse) researches store data and shows up to 5 suggested actions as cards on the admin Home page. As of 24 September 2026, it is in early access, needs recent sales activity and Shopify Network Intelligence, and is limited to the owner or staff with admin access.

## Which plans, languages and staff can use Sidekick?

Shopify's [Sidekick product page](https://www.shopify.com/sidekick) says Sidekick is included with every Shopify plan at no extra cost, but features and usage limits vary by plan. App generation is restricted to Grow, Advanced and Plus, while Flow generation is listed for Basic, Shopify, Advanced and Plus.

On languages, Shopify's page says only that Sidekick adapts to your store's language settings and helps in multiple languages. [Retail Technology Innovation Hub reported](https://retailtechinnovationhub.com/home/2025/3/31/shopifys-ai-powered-commerce-assistant-sidekick-expands-across-europe-now-supporting-20-languages) in April 2025 that Sidekick expanded from English to 20 languages, including 12 European languages such as French, German, Dutch and Spanish. Test your team's language before relying on it.

Access follows admin permissions: Shopify says each staff member can use Sidekick only within what their role allows. Some features add requirements:

- App generation needs the App development > Develop permission.
- Pulse needs owner or admin access.
- Sidekick does not work in the admin on a mobile browser; use the Shopify app.
- Balance transfers are for US stores using Shopify Balance, per [*Sidekick can now check balances and move money*](https://changelog.shopify.com/posts/sidekick-can-now-check-balances-and-move-money).

## Where does Shopify Sidekick stop?

Sidekick's boundary is the Shopify admin plus the supported apps you connect. None of the Help Center pages we reviewed on 24 September 2026 describe Sidekick calling a courier API, messaging customers on WhatsApp, placing calls, managing ad accounts or posting to accounting software. That leaves five kinds of work outside its reach:

1. **Cross-system operations.** A cash-on-delivery order needing a confirmation call, courier booking and RTO follow-up touches several systems. See our guide to [AI calling for COD confirmation](/blog/ai-calling-cod-confirmation).
2. **Ad account work.** Budgets, creative tests and audiences live in Meta Ads, Google Ads or ChatGPT Ads Manager.
3. **Finance beyond Balance.** Reconciling payouts with accounting software needs data Sidekick does not hold.
4. **Brand-context-heavy content.** None of the pages we reviewed document a brand voice setting, so tone, claims rules and banned phrases depend on your prompt and your review.
5. **Custom data and approval chains.** If a decision needs a supplier sheet or sign-off from two people, Sidekick can prepare the change but not run the chain.

<!-- [UNIQUE INSIGHT] -->
<aside class="blog-callout">
  <strong>A simple test:</strong> ask where the data starts and where the action ends. If both sit inside the Shopify admin, try Sidekick. If the job repeats on a trigger, save it as a Flow workflow. If either end sits in another system, or the output depends on brand rules a prompt cannot hold, you need a custom AI workflow.
</aside>

## When should you use Sidekick, Shopify Flow or a custom AI workflow?

Sidekick suits one-off questions and edits, Shopify Flow suits repeatable rules triggered by Shopify events, and a custom AI workflow suits multi-system jobs needing brand context and approvals. Since December 2025 Sidekick can build Flow workflows, so the two work together.

<figure class="blog-feature-image blog-feature-image--inline">
  <img src="/Blogs/shopify-sidekick-2026-guide/shopify-sidekick-matrix.png" alt="Decision matrix showing when to use Shopify Sidekick, Shopify Flow or a custom AI workflow" width="1600" height="900" loading="lazy" decoding="async">
  <figcaption>Choose the tool by where the work starts, how often it repeats and how much brand context it needs.</figcaption>
</figure>

| Job | Use Sidekick | Use Shopify Flow | Use a custom AI workflow |
|---|---|---|---|
| "Which SKUs dropped in sales this month?" | Yes, ShopifyQL report | No | Only if you need ad or return data joined in |
| Tag high-value customers after every order | Build it | Yes, runs the rule | No |
| Low-stock alert to Slack | Build it | Yes | Only if a supplier reorder follows |
| Rewrite 40 product descriptions in brand voice | First draft | No | Yes, with a brand context file and review step |
| Confirm COD orders by call or WhatsApp | No | Trigger only | Yes |
| Weekly marketing report across Meta, Google and Shopify | Shopify part only | No | Yes |
| Change button colours and spacing | Yes, in the theme editor | No | No |
| Move funds between Balance accounts (US) | Yes, with preview | No | No |

General assistants such as Claude or ChatGPT fit the third column once connected to your data and given written brand rules. Our [AI brand context workflow guide](/guides/ai-brand-context-workflow) explains how to package that context, and [Skill Manager](/products/skill-manager) keeps those instructions reusable. For more examples, see [AI marketing workflows for ecommerce](/blog/ai-marketing-workflows-ecommerce).

## How do you use Sidekick safely?

Shopify's [getting started guide](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/set-up) states that Sidekick cannot change your store without approval and only presents options for review. That approval step is the control, so read what you approve.

- **Read the diff.** Purple-highlighted fields show what Sidekick wrote. Check prices, variants and claims.
- **Test before activating.** Run Flow test events, and test generated apps thoroughly before installing, as Shopify advises.
- **Preview money movement.** Balance transfers include a Preview step.
- **Keep staff roles tight.** Sidekick inherits each person's permissions, and third-party app access lasts for one conversation only.
- **Check theme changes on mobile and desktop** before saving manually.

If a theme or product change will affect conversion, run it past the [Shopify conversion audit checklist](/guides/shopify-conversion-audit-checklist) before you publish.

## Which Sidekick prompts are worth trying first?

The best first prompts use features Shopify documents today: ShopifyQL reports, draft orders, Flow generation, theme settings and form filling. Each of these 10 prompts names a concrete outcome and a limit, so Sidekick has less to guess. Adjust the numbers for your store.

1. "Show net sales by product type for the last 90 days compared with the previous 90 days, as a bar chart, and export it to CSV."
2. "Which 10 products had the highest refund rate last quarter? Include units sold."
3. "Build a Flow workflow that tags a customer as VIP when their total spend passes ₹25,000 and sends a Slack message to #sales."
4. "Create a Flow workflow that emails ops@ourstore.com when any variant in the Bestsellers collection drops below 15 units."
5. "Create a 10% discount code for customers tagged VIP, one use per customer, ending on 31 October 2026. Show me the settings before saving."
6. "Draft a description for this kurta set from the fabric and fit details on the page. Under 120 words; do not claim it is handmade."
7. "Create a customer segment of people who ordered twice or more in 2025 but not since June 2026."
8. "On this draft order, add 2 units of the navy variant, apply a 5% line discount and add a custom shipping rate of ₹150."
9. "Increase spacing between product grid items and round the add-to-cart button corners on this template."
10. "Find apps that can send order updates on WhatsApp, compare the top 3 and show me the key differences."

Prompt 10 shows the boundary: Sidekick can compare apps, but the messaging runs outside it. For AI agents that shop on behalf of customers, see our [agentic commerce guide for Shopify](/blog/agentic-commerce-shopify-guide).

<section class="blog-cta">
  <h2>Automate the work Sidekick cannot reach</h2>
  <p>mlabs Growth builds AI workflows that connect Shopify with courier, WhatsApp, calling, ad and reporting tools, with your brand rules and approval steps built in.</p>
  <p><a href="/services/ai-automation">Explore AI marketing workflow automation</a> or <a href="https://calendly.com/kalathiyamehul13899/30min">book a 30-minute call</a>.</p>
</section>

## Frequently asked questions

### Is Shopify Sidekick free?

Shopify says Sidekick is included with your Shopify plan at no additional cost, but features and usage limits vary by plan. For example, generating custom apps with Sidekick is limited to the Grow, Advanced and Shopify Plus plans, with hourly and weekly limits, and image generation limits also depend on the plan.

### Can Shopify Sidekick make changes to my store without approval?

No. Shopify's Help Center states that Sidekick cannot change your store without your approval and presents options for you to review. Order edits apply only after you click Update order, draft orders save only after you click Save, and theme changes must be saved manually in the theme editor.

### Can Sidekick build Shopify Flow automations?

Yes. Since December 2025, Sidekick can generate a Shopify Flow workflow with a trigger, conditions and actions from a plain-language description. Flow must be open on desktop, and you test and activate the workflow yourself. Shopify notes that workflows with advanced Liquid or custom code may need manual editing.

### What is Sidekick Pulse?

Sidekick Pulse is a feature that researches your store's data and shows up to 5 suggested actions as cards on the Shopify admin Home page. As of September 2026 it is in early access for certain merchants with recent sales, and only the store owner or staff with admin access can use it.

### When should a Shopify brand use a custom AI workflow instead of Sidekick?

Use a custom workflow when the job crosses systems Sidekick does not reach, such as courier portals, WhatsApp, calling tools, ad accounts or accounting software, or when output depends on detailed brand rules and a human approval chain. Keep Sidekick for questions and edits that start and finish inside the Shopify admin.

## The bottom line

Shopify Sidekick in 2026 is a capable operator inside the admin. It writes reports, drafts content, edits orders, builds Flow workflows and adjusts themes, and the September redesign puts it on every page. Every change still waits for a person to approve it.

Use it for admin work you can check. Turn repeatable rules into Shopify Flow, and build custom workflows for jobs that cross systems or depend on brand context.

## Source notes

- [Shopify Help Center, *Sidekick*](https://help.shopify.com/en/manual/ai-powered-tools/sidekick), retrieved 2026-09-24.
- [Shopify Help Center, *Getting started with Sidekick*](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/set-up), retrieved 2026-09-24.
- [Shopify Help Center, *Getting help and guidance from Sidekick*](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/help-and-guidance), retrieved 2026-09-24.
- [Shopify Help Center, *Generating apps with Sidekick*](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/generate-apps), retrieved 2026-09-24.
- [Shopify Help Center, *Sidekick Pulse*](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/pulse), retrieved 2026-09-24.
- [Shopify Help Center, *Memory and personalization*](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/memory), retrieved 2026-09-24.
- [Shopify Changelog, *A new look for the Shopify admin*](https://changelog.shopify.com/posts/see-the-shopify-admin-s-new-look), published 2026-09-15, retrieved 2026-09-24.
- [Shopify Changelog, *Create Flow automations with Sidekick*](https://changelog.shopify.com/posts/create-flow-automations-with-sidekick), published 2025-12-11, retrieved 2026-09-24.
- [Shopify Changelog, *Sidekick can now check balances and move money*](https://changelog.shopify.com/posts/sidekick-can-now-check-balances-and-move-money), published 2025-09-15, retrieved 2026-09-24.
- [Shopify News, *Renaissance for the modern era: Winter '26 Edition*](https://www.shopify.com/news/winter-26-edition-merchant), published 2025-12-10, retrieved 2026-09-24.
- [Shopify News, *Spring '26 Edition*](https://www.shopify.com/news/spring-26-edition-merchant), published 2026-06-17, retrieved 2026-09-24.
- [Shopify Editions, *Spring '26*](https://www.shopify.com/editions/spring2026), retrieved 2026-09-24.
- [Shopify, *Sidekick*](https://www.shopify.com/sidekick), retrieved 2026-09-24.
- [Retail Technology Innovation Hub, *Shopify's AI-powered commerce assistant Sidekick expands across Europe, now supporting 20 languages*](https://retailtechinnovationhub.com/home/2025/3/31/shopifys-ai-powered-commerce-assistant-sidekick-expands-across-europe-now-supporting-20-languages), published 2025-04-01, retrieved 2026-09-24.
