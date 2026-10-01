---
layout: ../../layouts/BlogPostLayout.astro
draft: true
title: "Holiday Discount Strategy 2026: How Deep Can You Go?"
description: "How deep can a Shopify store discount this holiday season? Use margin ceilings, segment rules and Shopify's combination limits to set offers that still profit."
publishedOn: "2026-10-14"
updatedOn: "2026-10-14"
category: "Pricing and promotions"
author: "Mehul"
readTime: "10 min read"
coverImage: "/Blogs/holiday-discount-strategy-2026/holiday-discount-strategy-2026-hero.svg"
coverImageAlt: "Stacked bars showing contribution per order shrinking as a holiday discount rises from 0 to 30 percent"
wordCount: 2050
faqs:
  - question: "What is the maximum discount I can offer and still make a profit?"
    answer: "Your break-even ceiling equals your contribution margin, measured as a percentage of list price, before ad spend. A product with a 40% contribution margin reaches zero contribution at 40% off. In practice, cap the discount well below that: keep half of normal contribution, and check that new-customer acquisition cost is covered."
  - question: "Should I offer the same holiday discount to new and repeat customers?"
    answer: "Usually not. New customers carry an acquisition cost, so the same percentage leaves far less profit on the first order. Repeat customers cost little to reach, so they can be offered early access or a loyalty reward at a similar depth. Use Shopify customer segments to set different offers."
  - question: "Can Shopify discounts be combined at checkout?"
    answer: "Yes, within rules. Shopify applies product discounts first, then order discounts, then shipping discounts, and allows a maximum of 5 product or order codes and 1 shipping code per order. Product and order discounts can combine only for eligible merchants, so test every combination on a real checkout before launch."
  - question: "Do deep holiday discounts damage a brand?"
    answer: "Research suggests repeated promotions can make shoppers more price and promotion sensitive over time, and one field study found moderate first discounts retained customers better than very deep ones. The evidence comes from packaged goods and insurance, so treat it as a caution about frequency and depth, not a fixed rule."
  - question: "How can I stop discount codes from leaking to coupon sites?"
    answer: "Use automatic discounts for public offers, single-use or customer-specific codes for private ones, a one-per-customer limit, a total-use cap and a firm end date. Shopify supports all of these. Monitor redemptions daily and deactivate any code whose volume jumps without a matching campaign."
---

A safe holiday discount is set by contribution margin, not by competitor headlines. Your break-even ceiling equals your contribution margin as a percentage of list price, before ads. Stay well under it, vary the offer by customer segment, and test how Shopify stacks discounts before anything goes live.

Most stores pick a percentage because last year's number worked, or because a competitor posted one. That skips the question that decides profit: what does each discount type cost per order, and who is it for?

This guide covers the main discount types, how to target new and repeat customers, what research says about brand damage, Shopify's combination rules, code leakage, and a fresh worked example with a maximum-discount table.

<figure class="blog-feature-image">
  <img src="/Blogs/holiday-discount-strategy-2026/holiday-discount-strategy-2026-hero.svg" alt="Stacked bars showing contribution per order shrinking as a holiday discount rises from 0 to 30 percent" width="1600" height="900" fetchpriority="high" decoding="async">
  <figcaption>Concept illustration: contribution per order shrinking as discount depth rises. The numbers are illustrative, and this is not a Shopify admin screenshot.</figcaption>
</figure>

> **Key takeaways**
>
> - Your break-even discount equals your contribution margin. A sensible ceiling is far lower, often half of it.
> - Match the discount type to the goal: acquire, raise order value, clear stock or reward loyalty.
> - Shopify applies product discounts first, then order discounts, then shipping, so stacked offers compound.
> - Give new and repeat customers different offers. Acquisition cost changes what the same percentage costs you.

<div class="blog-brand-strip" aria-label="Platforms covered in this guide">
  <p>Platforms in this guide</p>
  <span><img src="/platforms/shopify.svg" alt="" width="18" height="18" loading="lazy">Shopify</span>
  <span><img src="/platforms/whatsapp.svg" alt="" width="18" height="18" loading="lazy">WhatsApp</span>
</div>

## In this guide

- [What discounts do shoppers expect in 2026?](#what-discount-depth-do-holiday-shoppers-expect)
- [Which discount types protect margin best?](#which-holiday-discount-type-fits-which-goal)
- [New versus repeat customers](#should-new-and-repeat-customers-get-the-same-discount)
- [Brand damage and price anchoring](#do-deep-discounts-damage-your-brand)
- [Shopify combination rules](#how-do-shopify-discounts-combine-at-checkout)
- [Code leakage](#how-do-you-stop-discount-codes-leaking)
- [Maximum discount by margin](#what-is-the-maximum-discount-for-your-margin)
- [Worked example](#worked-example-how-much-does-each-discount-step-cost)
- [Frequently asked questions](#frequently-asked-questions)

## What discount depth do holiday shoppers expect?

Large US retailers discounted electronics by up to 30.9% and apparel by up to 25.1% at their 2025 holiday peaks, according to Adobe. Those averages cover big retailers buying at scale, so they describe the market's expectations, not a target that a margin-constrained Shopify brand needs to match.

[Adobe's 2025 holiday recap](https://news.adobe.com/news/2026/01/adobe-holiday-shopping-season) measured peak discounts against listed prices by category:

| Category | 2025 peak discount | 2024 peak discount |
|---|---|---|
| Electronics | 30.9% | 30.1% |
| Toys | 29.6% | 28.0% |
| Apparel | 25.1% | 23.2% |
| Sporting goods | 20.3% | 19.5% |
| Appliances | 20.2% | 19.2% |
| Furniture | 18.8% | 19.0% |

Two points matter for a smaller brand. First, depth moved only a point or two year on year in most categories, so there is no evidence of a discount arms race to join. Second, [Adobe's Cyber Monday figures](https://news.adobe.com/news/2025/12/adobe-cyber-monday-hits-record) show electronics at 31% off and apparel at 25% off on the day itself.

These are 2025 results. Use them as context for shopper expectations, not as a forecast for 2026. Your own contribution margin, covered below, decides what you can afford.

## Which holiday discount type fits which goal?

Each discount type protects a different part of the order economics. A sitewide percentage is simple but costs the most per order, while tiered spend, bundles, gifts and free-shipping thresholds lift order value first and give margin away second. Pick the type that matches the goal.

| Type | Best goal | Main margin risk | Shopify note |
|---|---|---|---|
| Sitewide % off | Fast traffic response | Discounts every order, including people who would have bought anyway | [Amount off](https://help.shopify.com/en/manual/discounts/discount-types/percentage-fixed-amount) codes or automatic discounts |
| Tiered spend (spend more, save more) | Higher order value | Customers who already spend above the tier get a free discount | Shopify's automatic discounts page points to apps or Plus features for tiered logic |
| Buy one get one (BOGO) | Clearing slow stock | Cost of the free unit lands fully on contribution | [Buy X get Y](https://help.shopify.com/en/manual/discounts/discount-types/buy-x-get-y): customers add items manually |
| Free gift with purchase | Order value without a visible price cut | Gift cost plus fulfilment, if the gift is poor value | Built with Buy X get Y set to free |
| Free shipping threshold | Basket building | Threshold set below current average order value | [Free shipping](https://help.shopify.com/en/manual/discounts/discount-types/free-shipping) minimum counts product prices only |
| VIP early access | Loyalty and list growth | Leaked access links | Limit to a customer segment |
| Loyalty reward | Repeat purchase | Points liability and stacking | Usually an app |

Several details are worth checking. Shopify's Buy X get Y needs shoppers to add both items themselves, and the free or discounted "get" item is never added automatically. Those discounts also do not apply on the post-purchase checkout page. The free-shipping minimum counts product prices after other combinable discounts, so a stacked code can push an order below its threshold.

Threshold design has a demand side too. [Baymard's research](https://baymard.com/lists/cart-abandonment-rate) reports that 40% of US online shoppers who abandoned a checkout cited extra costs, such as shipping, tax and fees, as too high. Free shipping removes one of the biggest surprises, but only set the threshold after checking average order value. Our [cart abandonment guide](/blog/cart-abandonment-2026) covers the checkout side, and [shipping cost increases in Q4 2026](/blog/shipping-cost-increases-q4-2026) explains why a fixed threshold may need to rise.

For the bundle-versus-flat-discount comparison, see the [BFCM profit checklist](/blog/bfcm-2026-profit-checklist) and our [bundle pricing guide](/blog/bundle-pricing-guide). They are not repeated here.

## Should new and repeat customers get the same discount?

No. Acquisition cost makes the same percentage far more expensive on a new customer's first order than on a repeat order. Give new customers a modest entry offer, and use early access, bundles or loyalty rewards for repeat buyers, who need less persuasion and cost little to reach.

Consider the economics. A new customer arrives through paid traffic, so ad spend is part of the order. A repeat customer arrives through email, SMS or WhatsApp, where the marginal cost per order is small. The same 20% off can leave a profitable repeat order and a loss-making new one, as the worked example below shows.

There is also a pattern in the research on first discounts. A [Journal of Marketing study](https://research.aalto.fi/en/publications/relational-price-discounts-consumers-metacognitions-and-nonlinear/) by del Rio Olivares and colleagues found that moderate initial discounts (5% to 35%) had positive effects on customer retention, while low (under 5%) and high (over 35%) discounts had negative effects. The fieldwork covered car and property insurance, so treat the exact range as indicative, not as a rule for retail. The useful takeaway is that the deepest first offer is not automatically the best one for keeping a customer.

In Shopify, discount codes can be limited to [all customers, specific customers, customer segments or markets](https://help.shopify.com/en/manual/discounts/discount-types/percentage-fixed-amount), and a "limit to one per customer" option tracks email address or phone number. Segment by order history, then write one offer for each group: a capped entry offer for new customers, early access for repeat buyers, and a VIP tier for your top spenders. Early-access links can go to a WhatsApp broadcast list or email, so they reach owned channels before paid ones.

Track the result by segment with [POAS instead of ROAS](/blog/poas-vs-roas). A blended figure hides the fact that repeat orders carry most of the profit. Our upcoming guide on [contribution margin and holiday ad spend](/blog/contribution-margin-holiday-ad-spend) and the [CAC payback period guide](/blog/cac-payback-period-guide) show how to judge whether a first-order loss pays back.

## Do deep discounts damage your brand?

Repeated, deep promotions can train shoppers to wait for a sale and to treat a lower price as normal. The evidence is solid in some settings, but it is mostly from packaged goods and services, so apply it to your store with care and track your own full-price sales.

One often-cited study is Mela, Gupta and Lehmann's [1997 paper in the Journal of Marketing Research](https://scholars.duke.edu/publication/1485948). Using 8.25 years of panel data on frequently purchased packaged goods, it found results consistent with consumers becoming more price and promotion sensitive over time because of reduced advertising and increased promotions.

Translate that into practice with a few guardrails:

- **Limit how often you discount.** A store that runs a sale every other week teaches shoppers that full price is a bluff.
- **Show a clear reason and end date.** A holiday window is believable. An open-ended "sale" is not.
- **Protect hero products.** Keep your best-known SKUs at or near list price and discount adjacent products or bundles.
- **Prefer value over price cuts.** A free gift or bundle lifts perceived value without changing the anchor price on the product page.
- **Watch full-price conversion in January.** If it falls sharply after the sale, the discount changed expectations.

This is a judgment call, not a law. A brand built on being the cheapest option can discount freely. A premium brand has more to lose.

## How do Shopify discounts combine at checkout?

Shopify calculates product discounts first, then order discounts on the revised subtotal, and shipping discounts last. Stacked percentages compound, so a 20% product discount followed by a 10% order discount gives 28%, not 30%. That still removes far more margin than either offer looks like on its own.

[Shopify's discount combination rules](https://help.shopify.com/en/manual/discounts/discount-combinations) set the boundaries:

- All merchants can combine order plus free-shipping discounts, product plus free-shipping discounts, and product plus product discounts on different items.
- Product plus order discounts, and order plus order discounts, are available only to eligible merchants.
- Two shipping discounts cannot combine.
- A customer can apply a maximum of 5 product or order discount codes and 1 shipping discount code to one order.
- A merchant can have a maximum of 25 active automatic discounts.
- When discounts cannot combine, Shopify applies the best discount or combination for the customer's cart.

Because the combination settings live inside each discount, the risk grows with every offer you add. A sitewide code, an automatic bundle discount and a VIP code can each seem reasonable alone. Build a matrix before launch: list every live offer, mark which ones may combine, and place a test order for each pair on a mobile device. Record the final price next to the unit cost.

<aside class="blog-callout">
  <strong>Set the rule once:</strong> decide your maximum effective discount per product (see the table below). Then configure every offer's combination settings so that no path through checkout can exceed it.
</aside>

For the wider pre-peak readiness list, including checkout tests, see our [holiday readiness audit for Q4](/blog/shopify-holiday-readiness-audit-q4).

## How do you stop discount codes leaking?

Code leakage happens when a code meant for a small audience reaches a wider one, through forums, coupon sites, browser extensions or a forwarded email. You cannot stop every leak, but you can limit how much a leaked code costs by narrowing its audience, usage and lifetime.

Shopify gives you several controls, and most cost nothing:

1. **Use automatic discounts for public offers.** They apply when the cart meets the requirements, so there is no code to leak or hunt for.
2. **Restrict private codes to customer segments or specific customers.** [Customer eligibility](https://help.shopify.com/en/manual/discounts/discount-types/percentage-fixed-amount) can be set per discount.
3. **Turn on "limit to one per customer."** It tracks email address or phone number.
4. **Cap total uses.** Choose a number your margin can absorb, for example the units you are willing to give away at that price.
5. **Set an end date.** Discounts without an end date run until you stop them.
6. **Watch redemptions daily.** A code that spikes without a matching email or ad send is probably leaking. Deactivate it and issue a new one to the intended segment.

Avoid generic codes such as "HOLIDAY20" for exclusive audiences, because they are easy to guess. Reserve simple codes for offers you would be content to see shared anywhere.

## What is the maximum discount for your margin?

A discount cannot exceed your contribution margin, expressed as a percentage of list price, without making each order unprofitable before ads. Because acquisition cost also has to be paid, set the ceiling at the lower of two rules: keep half your normal contribution, and cover new-customer acquisition cost.

Contribution margin here means price minus product cost, fulfilment, payment fees and an allowance for returns. Use the [unit economics calculator](/tools/unit-economics) and our [unit economics guide](/blog/unit-economics-guide) to find it. Then read your ceiling from the table.

<figure class="blog-feature-image blog-feature-image--inline">
  <img src="/Blogs/holiday-discount-strategy-2026/holiday-discount-strategy-2026-diagram.svg" alt="Horizontal bar chart of maximum holiday discount by contribution margin from 60 percent down to 20 percent, with Adobe's 2025 peak apparel and electronics discounts marked" width="1600" height="900" loading="lazy" decoding="async">
  <figcaption>Concept illustration of the ceiling rules below, with Adobe's 2025 peak discounts marked for reference. It is an illustrative model, not a screenshot or a benchmark.</figcaption>
</figure>

**Illustrative maximum discount by contribution margin (% of list price)**

| Contribution margin before ads | A: keep half of normal contribution | B: new customer breaks even (acquisition cost 20% of price) | Practical ceiling |
|---|---|---|---|
| 60% | 30% | 40% | 30% |
| 50% | 25% | 30% | 25% |
| 40% | 20% | 20% | 20% |
| 30% | 15% | 10% | 10% |
| 20% | 10% | 0% | No discount for new customers |

The formulas are simple. Rule A is contribution margin divided by two. Rule B is contribution margin minus acquisition cost, both as a share of list price. The 20% acquisition cost is an assumption, so replace it with your own. The table ignores the volume gain from a discount, which the [BFCM checklist](/blog/bfcm-2026-profit-checklist) covers with a break-even table.

Note what the table implies against Adobe's numbers. A 40% margin store matching a 25% apparel discount would already be past the A ceiling. A 30% margin product cannot safely follow the market at all. In that case, use value: a bundle, a gift or early access.

## Worked example: how much does each discount step cost?

Take a skincare set listed at ₹1,500, with ₹700 in variable costs per order (₹480 product, ₹140 fulfilment, ₹30 payment fees, ₹50 returns allowance). Contribution before ads is ₹800, or 53% of list price. Assume ₹450 acquisition cost for a new customer and ₹60 for a repeat customer reached by WhatsApp or email. These figures are illustrative, and costs are held fixed.

| Discount | Price paid | Contribution before ads | New customer after ₹450 CAC | Repeat customer after ₹60 |
|---|---|---|---|---|
| 0% | ₹1,500 | ₹800 | ₹350 | ₹740 |
| 10% | ₹1,350 | ₹650 | ₹200 | ₹590 |
| 15% | ₹1,275 | ₹575 | ₹125 | ₹515 |
| 20% | ₹1,200 | ₹500 | ₹50 | ₹440 |
| 25% | ₹1,125 | ₹425 | -₹25 | ₹365 |
| 30% | ₹1,050 | ₹350 | -₹100 | ₹290 |

The new-customer first order breaks even at about 23% (₹350 divided by ₹1,500). Rule A gives a 26% ceiling (half of the 53% margin), so the new-customer rule is the binding one. A sensible plan is 15% for new customers, leaving ₹125 after acquisition to absorb returns variance, and a larger 20% early-access offer for repeat customers, who still leave ₹440.

Now stack offers. If a 20% product discount combines with a 10% order discount, the price falls to ₹1,080 (28% off) and contribution falls to ₹380, less than half of the ₹800 normal level. A free-shipping code on top also forgoes whatever shipping fee you normally collect. This is how a "20% sale" quietly becomes a loss on new customers.

If you run paid acquisition, apply the same test to your ad ceiling in the [marketing budget calculator](/tools/marketing-budget), and read [how Shopify payment gateway fees](/blog/shopify-payment-gateway-fees) change the math on discounted orders. Cash-on-delivery stores should add a refusal allowance using the [RTO cost guide](/blog/rto-cost-guide), because discounted impulse orders are refused more often.

<section class="blog-cta">
  <h2>See the contribution behind every offer</h2>
  <p>mlabs Growth reviews your offers, product pages and checkout together, so discounts are set against real contribution per order instead of guesswork, before holiday traffic arrives.</p>
  <p><a href="/services/store-conversion">Explore Shopify conversion optimization</a> or <a href="https://calendly.com/kalathiyamehul13899/30min">book a 30-minute call</a>.</p>
</section>

## Frequently asked questions

### What is the maximum discount I can offer and still make a profit?

Your break-even ceiling equals your contribution margin, measured as a percentage of list price, before ad spend. A product with a 40% contribution margin reaches zero contribution at 40% off. In practice, cap the discount well below that: keep half of normal contribution, and check that new-customer acquisition cost is covered.

### Should I offer the same holiday discount to new and repeat customers?

Usually not. New customers carry an acquisition cost, so the same percentage leaves far less profit on the first order. Repeat customers cost little to reach, so they can be offered early access or a loyalty reward at a similar depth. Use Shopify customer segments to set different offers.

### Can Shopify discounts be combined at checkout?

Yes, within rules. Shopify applies product discounts first, then order discounts, then shipping discounts, and allows a maximum of 5 product or order codes and 1 shipping code per order. Product and order discounts can combine only for eligible merchants, so test every combination on a real checkout before launch.

### Do deep holiday discounts damage a brand?

Research suggests repeated promotions can make shoppers more price and promotion sensitive over time, and one field study found moderate first discounts retained customers better than very deep ones. The evidence comes from packaged goods and insurance, so treat it as a caution about frequency and depth, not a fixed rule.

### How can I stop discount codes from leaking to coupon sites?

Use automatic discounts for public offers, single-use or customer-specific codes for private ones, a one-per-customer limit, a total-use cap and a firm end date. Shopify supports all of these. Monitor redemptions daily and deactivate any code whose volume jumps without a matching campaign.

## The bottom line

The deepest discount is rarely the best one. Set a ceiling from contribution margin, choose the discount type that matches the goal, give new and repeat customers different offers, and test how Shopify stacks everything before launch.

Start this week with contribution per order for your top SKUs. Write the maximum effective discount next to each one, then build the holiday offers underneath it.

## Source notes

- [Adobe, *Holiday Shopping Season Drove a Record $257.8 Billion Online*](https://news.adobe.com/news/2026/01/adobe-holiday-shopping-season), published 2026-01-07, retrieved 2026-10-01.
- [Adobe, *Cyber Monday Hits Record $14.25 Billion in Online Spending*](https://news.adobe.com/news/2025/12/adobe-cyber-monday-hits-record), published 2025-12-02, retrieved 2026-10-01.
- [Shopify Help Center, *Discount combinations*](https://help.shopify.com/en/manual/discounts/discount-combinations), retrieved 2026-10-01.
- [Shopify Help Center, *Amount off discounts*](https://help.shopify.com/en/manual/discounts/discount-types/percentage-fixed-amount), retrieved 2026-10-01.
- [Shopify Help Center, *Buy X get Y discounts*](https://help.shopify.com/en/manual/discounts/discount-types/buy-x-get-y), retrieved 2026-10-01.
- [Shopify Help Center, *Free shipping discounts*](https://help.shopify.com/en/manual/discounts/discount-types/free-shipping), retrieved 2026-10-01.
- [Shopify Help Center, *Automatic discounts*](https://help.shopify.com/en/manual/discounts/automatic-discounts), retrieved 2026-10-01.
- [Baymard Institute, *Cart Abandonment Rate Statistics*](https://baymard.com/lists/cart-abandonment-rate), retrieved 2026-10-01.
- [del Rio Olivares, Wittkowski, Aspara, Falk and Mattila, *Relational Price Discounts*, Journal of Marketing 82(1), 2018](https://research.aalto.fi/en/publications/relational-price-discounts-consumers-metacognitions-and-nonlinear/), retrieved 2026-10-01.
- [Mela, Gupta and Lehmann, *The Long-Term Impact of Promotion and Advertising on Consumer Brand Choice*, Journal of Marketing Research 34(2), 1997](https://scholars.duke.edu/publication/1485948), retrieved 2026-10-01.
