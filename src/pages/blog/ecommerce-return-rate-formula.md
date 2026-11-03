---
layout: ../../layouts/BlogPostLayout.astro
draft: false
title: "Ecommerce Return Rate Formula: A Worked Example"
description: "Use the ecommerce return rate formula correctly across orders, units, and revenue, with a worked example and a cohort method that avoids timing errors."
publishedOn: "2026-11-03"
updatedOn: "2026-11-03"
category: "COD & order operations"
author: "Mehul"
coverImage: "/Blogs/ecommerce-return-rate-formula/ecommerce-return-rate-formula-hero.svg"
coverImageAlt: "Three ecommerce return rate formulas compared across orders units and revenue"
---

The ecommerce return rate formula is returned volume divided by sold volume, multiplied by 100. The hard part is choosing the same unit and the same order cohort for both sides: returned orders over orders, returned units over units sold, or returned merchandise value over original merchandise value.

<figure class="blog-feature-image"><img src="/Blogs/ecommerce-return-rate-formula/ecommerce-return-rate-formula-hero.svg" alt="Three ecommerce return rate formulas compared across orders units and revenue" width="1600" height="900" fetchpriority="high" decoding="async"><figcaption>Return rate changes with the denominator, so label the metric before comparing it.</figcaption></figure>

## Ecommerce return rate formula at a glance

Use a physical-return numerator when the question is about products coming back. Shopify's [Sales reports documentation](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/sales-report) distinguishes physical returns from “sales reversals,” which can also include cancellations, refunds without returns, edits, fees, taxes, and other negative adjustments.

| Metric | Formula | Best used for |
| --- | --- | --- |
| Order return rate | Orders with at least one physical return ÷ eligible orders × 100 | Customer experience and support workload |
| Unit return rate | Units physically returned ÷ units sold × 100 | Product, size, quality, and warehouse analysis |
| Revenue return rate | Returned merchandise value ÷ original merchandise value × 100 | Commercial exposure and product-mix analysis |

Labels matter.

Do not call a refund rate a return rate. Shopify's [returns and exchanges guidance](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/creating-returns) explains that a refund without a return does not record a return reason, while a processed return can include exchange items, fees, money refunded, or money collected. Those are related events, not interchangeable ones.

## Choose the denominator before comparing results

The right denominator follows the decision. Use orders when planning customer-service work, units when fixing products or fulfilment, and merchandise value when estimating the sales exposed to returns. Track all three if one dashboard serves several teams, but never blend them into one unlabeled percentage.

This distinction matters because one order can contain several units. A shopper might keep two products and return one. That is one returned order, one returned unit, and only part of the order value. Each rate answers a different question.

The National Retail Federation's [2025 Retail Returns Landscape](https://www.nrf.com/research/2025-retail-returns-landscape) projected that 19.3% of online sales would be returned in 2025. Treat that as the publisher's industry estimate, not an automatic target for your store. A useful comparison must match category, market, policy, channel, and denominator.

## A worked ecommerce return rate calculation

Consider an **illustrative example** for one group of orders placed in the same month. The group contains 1,000 eligible orders, 1,450 units sold, and 60,000 currency units of original merchandise value. After the store's return window closes, 120 orders contain a physical return, covering 180 units and 9,000 currency units of merchandise.

- **Illustrative order return rate:** 120 ÷ 1,000 × 100 = 12%.
- **Illustrative unit return rate:** 180 ÷ 1,450 × 100 = 12.4%.
- **Illustrative revenue return rate:** 9,000 ÷ 60,000 × 100 = 15%.

<figure class="blog-feature-image"><img src="/Blogs/ecommerce-return-rate-formula/return-rate-worked-example.svg" alt="Worked ecommerce return rate example comparing order unit and revenue percentages" width="1600" height="900" loading="lazy" decoding="async"><figcaption>Illustrative example: the same return activity produces three valid rates because each denominator answers a different question.</figcaption></figure>

The revenue rate is highest in this illustrative example. That signals that returned products carry more value than the average product sold; it does not prove why they came back. Break the unit and revenue rates down by product, variant, return reason, market, fulfilment location, and acquisition channel before choosing a fix.

## Close the cohort before reading the rate

A calendar-month report can pair returns processed this month with sales created this month. That shortcut mixes two populations. Shopify says returns appear as a negative value on the date they are processed, so a sales-period export is not automatically a purchase-cohort return report.

Instead, group orders by purchase date and let each group pass through its full return window plus a documented receiving buffer. Then calculate the final rate. For faster monitoring, show an “open cohort” label and compare it only with cohorts at the same age.

The rule is simple: numerator and denominator must describe the same purchases. If a holiday campaign changes eligibility, document the policy alongside the cohort. The [Shopify return-window setup](/blog/shopify-return-window-overrides) explains how market, collection, product, and variant rules can create different exposure periods.

## Build a report people can audit

Keep the raw fields needed to reconstruct every result. Record the order date, return-request date, received date, processed date, order identifier, product and variant, quantity sold, quantity physically returned, original merchandise value, returned merchandise value, refund value, exchange value, return reason, market, and policy window.

Then publish the metric label in full. “Unit return rate for purchase cohorts, measured after the applicable return window” is harder to misread than “returns: 12%,” where the illustrative percentage hides the unit, timing, and eligibility rules.

Pair the operational rate with retained margin, reverse-shipping cost, inspection cost, and recovery value. The [unit economics calculator](/tools/unit-economics) helps keep a falling return percentage from masking a more expensive return path. A stricter policy can change who is eligible without fixing product information, quality, sizing, packaging, or delivery.

## Market rules belong in the comparison

The formula works globally, but eligibility does not. The European Union's [consumer returns guidance](https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm) says consumers generally have 14 days to withdraw from a distance contract, subject to exceptions. Other markets and product categories can apply different rights or merchant policies.

Segment the report by market when return windows or legal rights differ. Otherwise, a store with a longer eligible window may look worse simply because more customers are allowed to return. This is operational guidance, not legal advice; confirm the rules in every country where you sell.

## Use the rate to choose the next investigation

A return rate is a starting signal. Order rate shows how many customer journeys require reverse handling. Unit rate locates product and variant problems. Revenue rate reveals where merchandise value is flowing back. Read them together, then inspect reasons and cost before changing policy.

<section class="blog-cta">
  <h2>Turn return data into an operating plan</h2>
  <p>MlabsGrowth can map return reasons, policy windows, delivery follow-up, and reverse-order steps so your team measures the same problem before automating it.</p>
  <p><a href="/services/order-operations">Review ecommerce order operations</a> or browse <a href="/services">all MlabsGrowth services</a>.</p>
</section>

## Sources

- [Shopify Help Center, “Sales reports”](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/sales-report), retrieved November 3, 2026.
- [Shopify Help Center, “Creating returns and exchanges”](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/creating-returns), retrieved November 3, 2026.
- [National Retail Federation, “2025 Retail Returns Landscape”](https://www.nrf.com/research/2025-retail-returns-landscape), published October 15, 2025; retrieved November 3, 2026.
- [Your Europe, “Returns and the right of withdrawal”](https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm), retrieved November 3, 2026.
