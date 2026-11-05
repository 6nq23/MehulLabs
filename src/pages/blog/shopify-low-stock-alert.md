---
layout: ../../layouts/BlogPostLayout.astro
draft: false
title: "Shopify Low Stock Alert: Flow, App, or Manual?"
description: "Set up a Shopify low stock alert that uses the right inventory state, a demand-based threshold, and a tested Flow, app, or manual review path."
publishedOn: "2026-11-05"
updatedOn: "2026-11-05"
category: "Inventory & planning"
author: "Mehul"
coverImage: "/Blogs/shopify-low-stock-alert/shopify-low-stock-alert-hero.svg"
coverImageAlt: "Shopify low stock alert routing inventory risk to an operations team"
---

A Shopify low stock alert should notify the right person when a variant crosses a demand-based threshold, not whenever its quantity changes. For most stores, Shopify Flow is the best starting point; use a specialist app when thresholds, locations, channels, or forecasts need more control.

<figure class="blog-feature-image"><img src="/Blogs/shopify-low-stock-alert/shopify-low-stock-alert-hero.svg" alt="Shopify low stock alert routing inventory risk to an operations team" width="1600" height="900" fetchpriority="high" decoding="async"><figcaption>A useful alert joins inventory context, a deliberate threshold, and a named response owner.</figcaption></figure>

## Shopify low stock alert options after Stocky

Shopify says [Stocky is no longer available as of August 31, 2026](https://help.shopify.com/en/manual/inventory-and-locations/transitioning-from-stocky). Its migration guidance points merchants to Shopify's built-in inventory management and recommends Shopify Flow for automated low-stock alerts. That makes a legacy Stocky email setup a poor starting point for a new workflow.

Choose the lightest option that covers the decision your team must make.

| Method | Best fit | Main limitation |
|---|---|---|
| Saved inventory view | A small catalog reviewed on a fixed routine | No event-driven notification |
| Shopify Flow | Variant alerts sent to staff by email or connected team tools | Threshold logic and testing are yours to maintain |
| Scheduled Flow summary | Buyers who want a review queue instead of many messages | A fast seller can cross the threshold between summaries |
| Inventory app | Location-specific rules, forecasting, supplier routing, or multi-channel stock | Added cost, configuration, and another source of truth |

Flow is a free app on Shopify's Basic, Grow, Advanced, and Plus plans, according to the [Shopify Flow overview](https://help.shopify.com/en/manual/shopify-flow).

This is an internal control. Customer-facing restock messages solve a different problem; use the [Shopify back-in-stock alert decision guide](/blog/shopify-back-in-stock-notifications) when shoppers need notifications after inventory returns.

## Set the threshold from lead time and demand

A round number such as five units is easy to configure and hard to defend. Base the threshold on the point at which someone must reorder, transfer, slow promotion, or investigate a count difference.

Use this planning model:

```text
Alert threshold = average daily unit sales x effective lead time + safety stock
```

Effective lead time includes supplier production, transit, receiving, quality checks, and any internal approval delay. The [inventory reorder point method](/blog/inventory-reorder-point-guide) explains how to estimate those inputs, while the [inventory planning calculator](/tools/inventory-planner) lets you model them by SKU.

Consider this illustrative example. A variant sells six units per day, needs twelve days from order approval to sellable stock, and carries eighteen units of safety stock.

```text
Illustrative alert threshold = 6 x 12 + 18 = 90 units
```

The alert should fire at ninety units only if the buyer can act immediately. If approval normally takes two more days, include that delay in effective lead time or set an earlier warning. Review the threshold after promotions, supplier changes, stockouts, or a sustained shift in sales velocity.

One threshold rarely fits every SKU. Fast sellers, long-lead imports, bundle components, and products without substitutes usually need earlier attention. Slow, seasonal, or perishable items may need a lower threshold to avoid turning a stockout safeguard into excess inventory.

## Build a threshold-crossing Flow

Shopify's [Product variant inventory quantity changed trigger](https://help.shopify.com/en/manual/shopify-flow/reference/triggers/product-variant-inventory-quantity-changed) starts after an order, manual adjustment, or app changes a variant's quantity. It also provides the previous quantity as `inventoryQuantityPrior`, which makes duplicate suppression possible.

Build the workflow in this order:

1. Use **Product variant inventory quantity changed** as the trigger.
2. Check that the current quantity is at or below the chosen threshold.
3. Check that `inventoryQuantityPrior` was above the threshold.
4. Send an internal email or a message through the connected team tool.
5. Include the SKU, variant, current quantity, threshold, location context, product link, and response owner.

The second condition detects the crossing event. Without it, another adjustment made while stock remains low can produce another alert. Repeated noise trains people to ignore the message that matters.

For a single-location decision, use the location-specific inventory level rather than a store-wide total. Shopify documents the `inventoryLevels / available` variable and location name or ID for this purpose. Do not assume `inventoryQuantityPrior` is the previous Available quantity at that location; it is documented as the prior quantity for the variant. Test location-aware duplicate suppression with your real inventory sources, or store alert state in a metafield or specialist app. A warehouse with healthy stock cannot rescue a region if that stock is not assigned to the location that fulfils its orders.

<figure class="blog-feature-image"><img src="/Blogs/shopify-low-stock-alert/shopify-low-stock-flow.svg" alt="Flow diagram for a Shopify low stock threshold crossing alert" width="1600" height="900" loading="lazy" decoding="async"><figcaption>Trigger once at the threshold crossing, then route a complete decision packet to the owner.</figcaption></figure>

## Route the alert to a decision, not an inbox

Shopify's [Send internal email action](https://help.shopify.com/en/manual/shopify-flow/reference/actions/send-email) accepts multiple fixed recipients separated by commas, but the recipient address cannot be populated with a variable. That works for a stable buying team. It becomes awkward when ownership changes by supplier, brand, warehouse, or market.

Keep the first version simple. Send the alert to one accountable queue and put the routing fields in the message. The owner should choose from a short set of actions:

- create or review a purchase order;
- transfer stock from another eligible location;
- investigate an inventory variance;
- pause a promotion or bundle that consumes the component;
- accept the stockout because demand or margin no longer justifies replenishment.

Do not send a purchase order automatically just because quantity crossed a threshold. The count may be wrong, incoming stock may exist, or cash may be better used elsewhere. Let automation prepare the evidence while a named owner makes the buying decision.

## Test every path before turning it on

Use a test variant that cannot affect a live order. Start above the threshold, change inventory to the threshold, and confirm one message arrives with the expected SKU, quantity, location, and owner. Make another adjustment below the threshold and confirm the crossing guard prevents a duplicate.

Then restock the variant above the threshold and reduce it again. A new alert should arrive because a new crossing occurred. Repeat the test using each real source of change that matters: an order, a manual adjustment, and an inventory app. Shopify notes that the trigger can start even when inventory tracking is deactivated, so add an eligibility condition if untracked variants should be excluded.

Multi-location stores need a second pass. Reduce stock at one location while another remains healthy, and verify the workflow evaluates the intended location. Test the recipient's mail filters as well. Shopify advises checking the sender email configuration and mail filtering when Flow emails do not arrive.

Record the result beside the workflow: test variant, threshold, trigger source, expected action, actual action, owner, and date. Re-run that acceptance test after changing inventory apps, locations, supplier rules, or the Flow itself.

## Global stores need local inventory context

The Flow pattern works across Canada, India, Australia, the UK, the US, the EU, Southeast Asia, and the Middle East because the threshold is measured in units. The operating inputs are local: supplier lead time, import clearance, warehouse coverage, holidays, receiving hours, and the location that serves each market.

Avoid one global threshold when inventory is split across regions. A combined total can look safe while the location serving a specific market is close to empty. Build location-aware conditions, or let a specialist inventory app handle allocation when stock also moves through marketplaces, wholesale channels, or an external warehouse system.

Shopify defines five inventory states in its [inventory states documentation](https://help.shopify.com/en/manual/inventory-and-locations/fundamentals/inventory-states): On hand, Available, Committed, Unavailable, and Incoming. Use the state that matches the decision. A purchasing alert based on On hand can overstate what shoppers can buy because that total includes Committed and Unavailable units.

## Keep the alert useful over time

Review recent messages, remove recipients who no longer act, and compare thresholds with current sales velocity and supplier performance. If the queue grows faster than the team can resolve it, segment by urgency instead of adding notifications.

Shopify's [Flow optimization guidance](https://help.shopify.com/en/manual/shopify-flow/create/optimize) warns that the inventory quantity trigger runs for every inventory change and recommends putting conditions before complex work in high-volume workflows. Keep the low-stock branch narrow, avoid fetching large lists, and combine overlapping workflows when they compete for the same event.

The target is simple: a variant crosses a defensible threshold, one useful alert reaches an owner, and the owner can act before availability or cash suffers.

<section class="blog-cta">
  <h2>Turn low stock into an owned response</h2>
  <p>MlabsGrowth can map the threshold, location logic, notification route, and test cases, then build a Shopify Flow that your buying or operations team can maintain.</p>
  <p><a href="/services/ai-automation">Build a reliable Shopify inventory alert workflow</a> or browse <a href="/services">all MlabsGrowth services</a>.</p>
</section>

## Sources

- [Shopify Help Center, *Migrating from Stocky to Shopify inventory management*](https://help.shopify.com/en/manual/inventory-and-locations/transitioning-from-stocky), retrieved 2026-11-05; no publication date shown.
- [Shopify Help Center, *Shopify Flow*](https://help.shopify.com/en/manual/shopify-flow), retrieved 2026-11-05; no publication date shown.
- [Shopify Help Center, *Product variant inventory quantity changed*](https://help.shopify.com/en/manual/shopify-flow/reference/triggers/product-variant-inventory-quantity-changed), retrieved 2026-11-05; no publication date shown.
- [Shopify Help Center, *Send internal email*](https://help.shopify.com/en/manual/shopify-flow/reference/actions/send-email), retrieved 2026-11-05; no publication date shown.
- [Shopify Help Center, *Understanding inventory states*](https://help.shopify.com/en/manual/inventory-and-locations/fundamentals/inventory-states), retrieved 2026-11-05; no publication date shown.
- [Shopify Help Center, *Optimizing your Shopify Flow workflows*](https://help.shopify.com/en/manual/shopify-flow/create/optimize), retrieved 2026-11-05; no publication date shown.
