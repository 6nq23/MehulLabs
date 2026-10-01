---
layout: ../../layouts/BlogPostLayout.astro
draft: true
title: "Landed Cost Calculator: The Real Cost of Every Product You Sell"
description: "Use this landed cost calculator guide to add freight, duty, import tax, brokerage and returns to every SKU, with a worked Shopify example and copyable formula."
publishedOn: "2026-10-03"
updatedOn: "2026-10-03"
category: "Unit economics"
author: "Mehul"
readTime: "10 min read"
coverImage: "/Blogs/landed-cost-calculator-guide/landed-cost-calculator-guide-hero.svg"
coverImageAlt: "Stacked bar showing a product's supplier price growing into its full landed cost after freight, duty, brokerage and handling"
wordCount: 2150
faqs:
  - question: "What is landed cost in ecommerce?"
    answer: "Landed cost is the total cost of getting a product from the supplier to your warehouse, ready to sell. It covers the supplier price, international freight, insurance, customs duty, non-recoverable import taxes, customs fees, brokerage and inbound handling. Many stores also add payment fees and a returns allowance to see the fully loaded cost per unit."
  - question: "What is the landed cost formula?"
    answer: "Landed cost per unit equals total shipment cost divided by sellable units received. Total shipment cost is the product cost plus freight, insurance, duty, customs fees, brokerage, inbound handling and any import tax you cannot reclaim. Dividing by sellable units, not units ordered, means damaged or missing stock raises the cost of each unit you can actually sell."
  - question: "Is import VAT or GST part of landed cost?"
    answer: "Only if you cannot reclaim it. In the UK, VAT-registered businesses can reclaim import VAT as input tax, and in India the IGST paid on imports can be claimed as input tax credit when the goods are used in the business. For those sellers, import tax is a cash-flow item. For unregistered sellers, it is a real cost."
  - question: "Should landed cost include shipping to the customer?"
    answer: "Usually not. Landed cost stops when stock is ready to sell in your warehouse or 3PL. Outbound shipping, pick and pack, payment fees, returns and ad spend belong in unit economics and contribution margin. Keep the two layers separate so you can see whether a problem sits in sourcing or in selling."
  - question: "How often should I update landed cost?"
    answer: "Update it every time a purchase order lands, and review it whenever freight rates, duty rates or exchange rates change. If new stock arrives at a different cost from older stock, use a weighted average or track costs by batch so your margin reports do not rely on a number from last season."
---

Landed cost is the full price you pay to get a product sold-ready in your warehouse, not the figure on the supplier's invoice. It adds freight, insurance, duty, customs fees, brokerage and inbound handling to the product cost, and it is the number your pricing and margins should be built on.

Most stores know their supplier price to the cent and guess everything after it. That gap is where margin disappears: a product that looks like a 70% gross margin on paper can earn far less once freight, duty and returns are counted.

This guide gives you the formula, a worked example, a spreadsheet layout you can copy, and a way to keep the number current in Shopify.

<figure class="blog-feature-image">
  <img src="/Blogs/landed-cost-calculator-guide/landed-cost-calculator-guide-hero.svg" alt="Stacked bar showing a product's supplier price growing into its full landed cost after freight, duty, brokerage and handling" width="1600" height="900" fetchpriority="high" decoding="async">
  <figcaption>Concept illustration: a supplier price growing into landed cost as each import cost is added. This is not a Shopify admin screenshot.</figcaption>
</figure>

> **Key takeaways**
>
> - Landed cost equals product cost plus every cost needed to get sellable stock into your warehouse. Divide by sellable units, not units ordered.
> - In our illustrative example, a $8.00 supplier price becomes a $10.34 landed cost and a $12.28 loaded cost, cutting margin from 72% to 58%.
> - Import VAT or GST is a cost only when you cannot reclaim it. Duty is always a cost.
> - Recalculate whenever a purchase order lands, and store the result where your profit reports can use it.

<div class="blog-brand-strip" aria-label="Platforms covered in this guide">
  <p>Platforms in this guide</p>
  <span><img src="/platforms/shopify.svg" alt="" width="18" height="18" loading="lazy">Shopify</span>
  <span><img src="/platforms/ups.svg" alt="" width="18" height="18" loading="lazy">UPS</span>
  <span><img src="/platforms/fedex.svg" alt="" width="18" height="18" loading="lazy">FedEx</span>
  <span><img src="/platforms/dhl.svg" alt="" width="18" height="18" loading="lazy">DHL</span>
</div>

## In this guide

- [What landed cost includes](#what-is-landed-cost-and-what-does-it-include)
- [The landed cost formula](#what-is-the-landed-cost-formula)
- [Incoterms and who pays what](#how-do-incoterms-change-what-lands-on-your-cost-sheet)
- [Duty and import tax by market](#how-do-duty-and-import-tax-change-landed-cost)
- [A worked landed-cost table](#what-does-a-worked-landed-cost-example-look-like)
- [Spreadsheet layout](#what-should-your-landed-cost-spreadsheet-look-like)
- [Allocating shared costs](#how-do-you-split-shared-costs-across-skus)
- [Sensitivity: what moves margin most](#how-much-can-freight-duty-and-returns-move-your-margin)
- [Keeping the number current](#how-do-you-keep-landed-cost-current-in-shopify)
- [Frequently asked questions](#frequently-asked-questions)

## What is landed cost, and what does it include?

Landed cost is the total cost of delivering a product to your door: the supplier price plus international freight, cargo insurance, customs duty, customs fees, brokerage, any import tax you cannot reclaim, and inbound handling. It stops when stock is ready to sell. Selling costs such as outbound shipping and ads come after it.

Each cost comes from a different document, which is why it is rarely in one place:

- **Product cost:** the supplier's invoice or purchase order.
- **Freight and insurance:** the forwarder's or carrier's quote. Air and express freight often comes from carriers such as [UPS](https://www.ups.com), [FedEx](https://www.fedex.com) or [DHL](https://www.dhl.com); ocean freight usually comes through a forwarder.
- **Duty and customs fees:** the customs entry, based on the product's tariff classification, origin and value.
- **Brokerage:** the customs broker's invoice for filing the entry and clearing the goods.
- **Inbound handling:** your warehouse or 3PL's receiving and put-away charge.

Shopify's own guidance on [duties and import taxes](https://help.shopify.com/en/manual/international/duties-and-import-taxes) notes that customs authorities set the amount from a product's classification, its origin and the destination's rules. Tariff rates change often, so this guide treats them as inputs. For the policy picture, read our post on [tariffs, duties and Shopify pricing](/blog/tariffs-duties-shopify-pricing).

## What is the landed cost formula?

Landed cost per unit equals total shipment cost divided by sellable units received. Total shipment cost is the product cost plus freight, insurance, duty, customs fees, brokerage, inbound handling and any non-recoverable import tax. Using sellable units matters because damaged or short-shipped stock still carries its share of the bill.

```
Total shipment cost = Product cost + Freight + Insurance + Duty
                      + Customs fees + Brokerage + Inbound handling
                      + Non-recoverable import tax

Landed cost per unit = Total shipment cost ÷ Sellable units received
```

Here is why the denominator matters. If you order 1,000 units and 20 arrive damaged or missing, a $10,340 shipment cost gives $10.34 per unit ordered but $10.55 per sellable unit. That is a 2% difference from a single line, before anything else moves.

Keep landed cost separate from the costs of selling. Outbound shipping, payment fees, returns and ad spend are covered by [unit economics](/blog/unit-economics-guide). Landed cost feeds that calculation as the product-cost input.

## How do Incoterms change what lands on your cost sheet?

Incoterms decide which side of a supplier quote each cost sits on. They are rules published by the International Chamber of Commerce, and the ICC describes the [current set of eleven rules](https://iccwbo.org/business-solutions/incoterms-rules/) as trade terms for contracts for the sale of goods. A lower supplier price under one term can simply mean you pay more of the journey yourself.

The table below is a simplified guide to the terms most Shopify importers meet. Always read the exact term and named place in the contract.

| Incoterm | What the supplier's price typically covers | What you add to landed cost |
|---|---|---|
| EXW (Ex Works) | Goods at the supplier's premises | Origin pickup, export clearance, freight, insurance, import duty and fees |
| FOB (Free on Board) | Goods loaded on the vessel at the origin port | Main freight, insurance, import duty and fees |
| CIF (Cost, Insurance and Freight) | Goods, sea freight and insurance to the destination port | Import duty and fees, inland delivery |
| DAP (Delivered at Place) | Delivery to your named destination | Import clearance, duty and taxes |
| DDP (Delivered Duty Paid) | Delivery plus import clearance, duty and taxes | Little or nothing, but check what the supplier priced in |

The [ICC Academy explains](https://academy.iccwbo.org/incoterms/article/incoterms-2020-dap-or-ddp/) that under DAP the buyer is responsible for import clearance, while under DDP the seller must handle and pay for it. The same article notes these rules operate within the sales contract. An Incoterm tells you who pays, but it does not calculate duty or taxes for you.

Compare quotes on a landed basis, not a per-unit supplier price. A DDP quote can beat an FOB quote on paper and still lose once you check what tariff rate and value the supplier assumed.

## How do duty and import tax change landed cost?

Duty is always a cost, but import VAT or GST often is not. The bigger trap is valuation: the US generally excludes separately identified international freight and insurance from the dutiable value, while the UK and EU add them. The same shipment can therefore carry different duty depending on where it lands.

In the US, [19 CFR 152.103](https://www.law.cornell.edu/cfr/text/19/152.103) gives an example where a $2,000 invoice includes $150 of ocean freight and insurance, and that $150 is excluded from transaction value. The UK works differently: [GOV.UK's guidance on valuing goods for import VAT](https://www.gov.uk/guidance/how-to-value-goods-for-import-vat) bases the VAT value on the customs value plus duty and incidental expenses such as transport up to the first UK destination.

| | United States | United Kingdom (VAT-registered seller) | India (GST-registered seller) |
|---|---|---|---|
| Value used for duty | Transaction value, excluding separately identified international freight and insurance | Customs value, typically including freight and insurance to the UK border | Assessable value plus duty, per customs rules |
| Import tax | No VAT or GST | Import VAT on customs value plus duty | IGST on imports |
| Is import tax a cost? | Not applicable | Reclaimable as input tax, so mainly cash flow | IGST creditable when used in business; basic customs duty is not |
| Customs fees to add | Merchandise processing fee and, for ocean freight, harbor maintenance fee | Broker and clearance fees | Broker and clearance fees |

Three details that affect the maths:

1. **US user fees.** The [CBP user fee table](https://www.cbp.gov/trade/basic-import-export/user-fee-table) lists the merchandise processing fee at 0.3464% of entered value, and the harbor maintenance fee at 0.125%. The Federal Register [notice for fiscal year 2027](https://www.federalregister.gov/documents/2026/07/31/2026-15530/customs-user-fees-to-be-adjusted-for-inflation-in-fiscal-year-2027) sets the formal-entry floor at $34.58 and the cap at $670.86 from 1 October 2026.
2. **UK import VAT.** GOV.UK confirms VAT-registered businesses [can reclaim import VAT](https://www.gov.uk/guidance/vat-imports-acquisitions-and-purchases-from-abroad) as input tax, and postponed VAT accounting lets them declare and reclaim it on the same return.
3. **India.** The CBIC's [GST guidance for importers](https://cbic-gst.gov.in/hindi/pdf/faq-manual/guidnce-note-imprtrs-exprtrs.pdf) states that credit of integrated tax is available to the importer, while credit of basic customs duty is not. Confirm treatment with your accountant.

Small parcels need extra care. CBP [ended duty-free de minimis treatment](https://www.cbp.gov/newsroom/national-media-release/cbp-modernizes-low-value-shipment-processing) for low-value shipments from 29 August 2025, so sub-$800 parcels that once entered duty-free are now dutiable.

## What does a worked landed-cost example look like?

The example below follows one product imported into the US by sea. A $8.00 supplier price becomes a $10.34 landed cost, a 29% uplift, and a $12.28 loaded cost once payment fees and a returns allowance are included. Every figure is illustrative, so replace each with your own quotes.

**Illustrative assumptions (USD, per unit):** 1,000 units shipped, FOB supplier price $8.00, selling price $29.00, duty rate 10% on FOB value (a placeholder, not a real tariff rate), broker fee $150 per entry, payment fee of 2.9% plus $0.30, return rate of 10% at $8.00 net cost per return.

| Cost line | Per unit ($) | Basis |
|---|---|---|
| Product cost (FOB) | 8.00 | Supplier invoice |
| International freight | 1.10 | Forwarder quote, allocated |
| Cargo insurance | 0.05 | Illustrative |
| Duty (10%) | 0.80 | 10% of $8.00 FOB value |
| Customs fees (MPF + HMF) | 0.04 | $34.58 floor plus $10.00, spread across 1,000 units |
| Brokerage | 0.15 | $150 entry fee spread across 1,000 units |
| Inbound handling | 0.20 | Receiving and put-away |
| Import VAT or GST | 0.00 | None in the US |
| **Landed cost** | **10.34** | Sum of the lines above |
| Payment fee | 1.14 | 2.9% of $29.00 plus $0.30 |
| Returns allowance | 0.80 | 10% × $8.00 net cost per return |
| **Loaded cost before outbound shipping and ads** | **12.28** | |
| **Margin before outbound shipping and ads** | **$16.72 (57.7%)** | Naive margin using supplier price only: 72.4% |

The supplier price alone suggests a $21.00 margin per unit. The loaded view says $16.72, about 15 percentage points lower, and that is before outbound shipping and advertising. Those belong in the [unit economics calculator](/tools/unit-economics), which takes this landed cost as its product-cost input.

<figure class="blog-feature-image blog-feature-image--inline">
  <img src="/Blogs/landed-cost-calculator-guide/landed-cost-calculator-guide-diagram.svg" alt="Waterfall diagram building an $8.00 supplier price into a $10.34 landed cost and a $12.28 loaded cost, leaving a $16.72 margin on a $29.00 sale" width="1600" height="900" loading="lazy" decoding="async">
  <figcaption>Illustrative waterfall: from supplier price to landed cost to loaded cost per unit. Concept illustration, not a screenshot.</figcaption>
</figure>

<aside class="blog-callout">
  <strong>A simple rule:</strong> never price a product from its supplier cost. Price it from landed cost, then subtract payment fees, returns, outbound shipping and ads to see what is left.
</aside>

Payment fees vary by provider and plan. Shopify's [Shopify Payments fee page](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/cost-of-shopify-payments) says rates depend on your plan and that using a third-party provider alongside Shopify Payments changes the fees. Our guide to [Shopify payment gateway fees](/blog/shopify-payment-gateway-fees) covers the comparison.

## What should your landed-cost spreadsheet look like?

A landed-cost sheet needs one row per SKU per shipment, with shared costs allocated into that row. Copy the layout below into Google Sheets or Excel. Columns A to L give landed cost per sellable unit, and columns M to Q turn it into margin before outbound shipping and ads.

| Col | Field | Formula or input |
|---|---|---|
| A | SKU | Input |
| B | Units ordered | Input |
| C | Sellable units received | Input after receiving |
| D | Supplier unit price | Input |
| E | Freight (allocated total) | Allocation, see next section |
| F | Insurance (allocated) | Allocation |
| G | Duty (allocated) | Customs entry |
| H | Customs fees and brokerage (allocated) | Entry and broker invoice |
| I | Inbound handling | 3PL invoice |
| J | Non-recoverable import tax | 0 if you reclaim it |
| K | Landed total | `=B2*D2+E2+F2+G2+H2+I2+J2` |
| L | Landed cost per sellable unit | `=K2/C2` |
| M | Selling price (ex tax) | Input |
| N | Payment fee | `=M2*rate+fixed_fee` |
| O | Returns allowance | `=return_rate*cost_per_return` |
| P | Contribution before shipping and ads | `=M2-L2-N2-O2` |
| Q | Margin | `=P2/M2` |

The ground rule is to enter actuals when invoices arrive, and use quotes only as placeholders. Flag any row where a figure is still an estimate so nobody treats it as final.

## How do you split shared costs across SKUs?

Shared costs such as freight, insurance and brokerage must be allocated across SKUs in a mixed shipment. The best method depends on the cost: freight by weight or volume, insurance by value, duty by tariff classification, and brokerage by unit count or entry line. One method for everything is simpler, but less accurate.

A [landed cost guide from iContainers](https://www.icontainers.com/help/what-is-landed-cost-how-to-calculate/) sets out the common methods:

- **By quantity:** equal split, for identical items.
- **By weight:** product weight ÷ shipment weight × shared cost, for weight-driven freight.
- **By volume:** product CBM ÷ shipment CBM × shared cost, for less-than-container-load shipments.
- **By value:** product value ÷ shipment value × shared cost, for insurance and financing.

Duty is best assigned line by line from the customs entry, because different products in one shipment can carry different rates.

Bulky, light items are where allocation errors hurt most. A bulky bundle component allocated freight by value will look cheaper than it is. If you sell bundles, recalculate each component's landed cost before setting the bundle price. Our [bundle pricing guide](/blog/bundle-pricing-guide) shows how to test that.

## How much can freight, duty and returns move your margin?

Margin moves most when several costs shift together. Using the worked example, a 50% freight increase lowers margin from 57.7% to 55.8%, a jump from 10% to 25% duty takes it to 53.5%, and doubling the return rate takes it to 54.9%. All three at once leave 48.9%.

| Scenario (illustrative) | Loaded cost ($) | Margin before shipping and ads |
|---|---|---|
| Base case | 12.28 | 57.7% |
| Freight +50% ($1.10 to $1.65) | 12.83 | 55.8% |
| Duty 10% to 25% | 13.48 | 53.5% |
| Return rate 10% to 20% | 13.08 | 54.9% |
| All three together | 14.83 | 48.9% |

Returns deserve their own line because they behave differently from freight. The NRF's [2025 returns report](https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025) estimated that 19.3% of online sales would be returned, against 15.8% overall. Use your own return rate by product, and read our guide on [RTO cost](/blog/rto-cost-guide) if you ship cash on delivery.

Cost surprises also reach the shopper. Baymard's [cart abandonment research](https://baymard.com/lists/cart-abandonment-rate) found that extra costs being too high was the top reason for abandonment, cited by 40% of shoppers who were not just browsing. If duties or fees appear only at delivery, that risk sits with your customer experience as well as your margin.

## How do you keep landed cost current in Shopify?

Store the latest landed cost where your reports can use it, and update it each time a purchase order lands. Shopify's [product details page](https://help.shopify.com/en/manual/products/details/product-details-page) explains that the cost per item field drives projected profit and margin on each product, and its [profit reports](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/profit-reports) use recorded costs.

Shopify's help text describes cost per item as what you paid the manufacturer, excluding taxes and shipping. Decide one rule and apply it everywhere: if you enter landed cost in that field, your margins reflect it, but you need to document that choice so the team reads the reports correctly.

A four-step routine keeps the number honest:

1. **On each receiving note,** replace estimates with actual invoices and record sellable units.
2. **Blend old and new stock** using a weighted average, or track batches when costs differ sharply.
3. **Re-price** any SKU whose landed cost moved enough to push margin under your floor.
4. **Feed it forward** into reorder quantities and cash planning. The [inventory reorder point guide](/blog/inventory-reorder-point-guide) covers timing, [Q4 inventory planning under tariffs](/blog/q4-inventory-planning-tariffs) covers holiday buys, and the [cash runway guide](/blog/cash-runway-guide) shows how to keep cash for duty and freight invoices.

When landed cost feeds contribution margin, it also changes ad decisions, because a real margin sets the profit-on-ad-spend ceiling for each SKU. See [POAS versus ROAS](/blog/poas-vs-roas) for how that works.

<section class="blog-cta">
  <h2>See the real margin behind every SKU and ad</h2>
  <p>mlabs Growth helps Shopify brands connect product cost, conversion and order data so pages, offers and ad spend are judged on contribution, not on revenue alone.</p>
  <p><a href="/services/store-conversion">Explore Shopify conversion optimization</a> or <a href="https://calendly.com/kalathiyamehul13899/30min">book a 30-minute call</a>.</p>
</section>

## Frequently asked questions

### What is landed cost in ecommerce?

Landed cost is the total cost of getting a product from the supplier to your warehouse, ready to sell. It covers the supplier price, international freight, insurance, customs duty, non-recoverable import taxes, customs fees, brokerage and inbound handling. Many stores also add payment fees and a returns allowance to see the fully loaded cost per unit.

### What is the landed cost formula?

Landed cost per unit equals total shipment cost divided by sellable units received. Total shipment cost is the product cost plus freight, insurance, duty, customs fees, brokerage, inbound handling and any import tax you cannot reclaim. Dividing by sellable units, not units ordered, means damaged or missing stock raises the cost of each unit you can actually sell.

### Is import VAT or GST part of landed cost?

Only if you cannot reclaim it. In the UK, VAT-registered businesses can reclaim import VAT as input tax, and in India the IGST paid on imports can be claimed as input tax credit when the goods are used in the business. For those sellers, import tax is a cash-flow item. For unregistered sellers, it is a real cost.

### Should landed cost include shipping to the customer?

Usually not. Landed cost stops when stock is ready to sell in your warehouse or 3PL. Outbound shipping, pick and pack, payment fees, returns and ad spend belong in unit economics and contribution margin. Keep the two layers separate so you can see whether a problem sits in sourcing or in selling.

### How often should I update landed cost?

Update it every time a purchase order lands, and review it whenever freight rates, duty rates or exchange rates change. If new stock arrives at a different cost from older stock, use a weighted average or track costs by batch so your margin reports do not rely on a number from last season.

## The bottom line

A supplier price is a starting point, not a cost. The stores with dependable margins are the ones that add freight, duty, fees, brokerage, handling and returns to every SKU, divide by sellable units, and refresh the result with each shipment.

Start with your top five SKUs this week. Build the sheet above, then run the landed cost through the [unit economics calculator](/tools/unit-economics) to see contribution per order. Compare it with what you assumed, and use the gap to reset prices, supplier quotes and ad ceilings. Our [contribution margin guide for holiday ad spend](/blog/contribution-margin-holiday-ad-spend) shows how to carry the number into Q4 budgets.

## Source notes

- [International Chamber of Commerce, *Incoterms Rules*](https://iccwbo.org/business-solutions/incoterms-rules/), retrieved 2026-10-01.
- [ICC Academy, *DAP and DDP Incoterms 2020 explained*](https://academy.iccwbo.org/incoterms/article/incoterms-2020-dap-or-ddp/), retrieved 2026-10-01.
- [Cornell Legal Information Institute, *19 CFR 152.103 Transaction value*](https://www.law.cornell.edu/cfr/text/19/152.103), retrieved 2026-10-01.
- [GOV.UK, *How to value goods for import VAT*](https://www.gov.uk/guidance/how-to-value-goods-for-import-vat), retrieved 2026-10-01.
- [GOV.UK, *Paying VAT on imports*](https://www.gov.uk/guidance/vat-imports-acquisitions-and-purchases-from-abroad), retrieved 2026-10-01.
- [CBIC, *Guidance note for importers and exporters under GST*](https://cbic-gst.gov.in/hindi/pdf/faq-manual/guidnce-note-imprtrs-exprtrs.pdf), retrieved 2026-10-01.
- [U.S. Customs and Border Protection, *User Fee Table*](https://www.cbp.gov/trade/basic-import-export/user-fee-table), retrieved 2026-10-01.
- [Federal Register, *Customs User Fees To Be Adjusted for Inflation in Fiscal Year 2027*](https://www.federalregister.gov/documents/2026/07/31/2026-15530/customs-user-fees-to-be-adjusted-for-inflation-in-fiscal-year-2027), published 2026-07-31, retrieved 2026-10-01.
- [U.S. Customs and Border Protection, *CBP modernizes low-value shipment processing*](https://www.cbp.gov/newsroom/national-media-release/cbp-modernizes-low-value-shipment-processing), retrieved 2026-10-01.
- [Shopify Help Center, *Duties and import taxes*](https://help.shopify.com/en/manual/international/duties-and-import-taxes), retrieved 2026-10-01.
- [Shopify Help Center, *Shopify Payments fees*](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/cost-of-shopify-payments), retrieved 2026-10-01.
- [Shopify Help Center, *Product details page*](https://help.shopify.com/en/manual/products/details/product-details-page) and [*Profit reports*](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/profit-reports), retrieved 2026-10-01.
- [NRF, *Consumers Expected to Return Nearly $850 Billion in Merchandise in 2025*](https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025), published 2025-10-15, retrieved 2026-10-01.
- [Baymard Institute, *Cart Abandonment Rate Statistics*](https://baymard.com/lists/cart-abandonment-rate), retrieved 2026-10-01.
- [iContainers, *Landed cost: formula, example and calculation guide*](https://www.icontainers.com/help/what-is-landed-cost-how-to-calculate/), retrieved 2026-10-01.
- Worked example figures (supplier price, freight, insurance, duty rate, broker fee, payment fee, return rate) are illustrative assumptions by the author, not sourced data.
