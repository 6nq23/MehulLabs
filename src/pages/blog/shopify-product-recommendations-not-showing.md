---
layout: ../../layouts/BlogPostLayout.astro
draft: false
title: "Shopify Product Recommendations Not Showing? Fix It"
description: "Fix Shopify product recommendations not showing by testing recommendation type, product eligibility, API output, and theme rendering in the right order."
publishedOn: "2026-11-06"
updatedOn: "2026-11-06"
category: "Shopify conversion"
author: "Mehul"
coverImage: "/Blogs/shopify-product-recommendations-not-showing/product-recommendations-hero.svg"
coverImageAlt: "Shopify recommendation path from product choice to storefront display"
---

When Shopify product recommendations are not showing, test the recommendation type, candidate product, API response, and theme in that order. An empty “You may also like” section does not prove that Shopify has no suggestions; the store may have saved complementary products while the theme requests related products, or the theme may discard a valid response.

Use one product pair as a control. That turns a vague storefront problem into a failed layer you can repair.

<figure class="blog-feature-image"><img src="/Blogs/shopify-product-recommendations-not-showing/product-recommendations-hero.svg" alt="Shopify recommendation path from product choice to storefront display" width="1600" height="900" fetchpriority="high" decoding="async"><figcaption>A recommendation must survive its intent, eligibility rules, API response, and theme render before a shopper sees it.</figcaption></figure>

## Shopify product recommendations not showing: run the control

Pick one live product page as the source and one clearly eligible product as the recommendation. Save the candidate manually in Search & Discovery, open the source product in a private window, and keep the candidate out of the cart. Do not start with a product that is sold out, hidden, free, or restricted to another channel.

Record the source product URL, candidate product URL, template name, recommendation type, market, and device. Repeat the same test on desktop and mobile without changing the product pair.

The control is successful only when the exact candidate appears. If a different product appears, Shopify is returning recommendations, but the store is using another intent or an automatic result rather than the manual choice.

This distinction matters when recommendations support a set or routine. The [bundle pricing model](/blog/bundle-pricing-guide) explains how to judge the commercial value of complementary items once the storefront can display them reliably.

## Related and complementary are different data paths

Related products are alternatives or similar items. Complementary products are add-ons intended to be bought with the source product. Shopify’s [Search & Discovery recommendation documentation](https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-recommendations) says merchants can save up to 10 of each type, but the theme must request and render the matching type.

Check the section before editing the product list:

| What you saved | What the theme must display | Typical storefront label |
|---|---|---|
| Related products | Related intent | You may also like |
| Complementary products | Complementary intent | Pair it with |

A generic product-recommendations section often requests related items. A complementary-products block may live inside the product information area instead. Saving add-ons in the complementary field will not make them appear in a section that only asks for related results.

Shopify also allows manually selected related products to appear alone or ahead of automatically generated results. Confirm that choice in Search & Discovery. “Only manual” can leave a section empty when every saved candidate becomes ineligible; allowing automatic results can hide that configuration problem by filling the space with other products.

## Product eligibility decides whether a saved choice can appear

Saving a recommendation does not guarantee display. Shopify’s recommendation requirements exclude a product when it is sold out under the applicable rule, Unlisted, priced at zero, a gift card, unpublished from the Online Store channel, inactive, or already in the visitor’s cart.

The inventory rule changes by intent. Shopify says a related product with zero inventory may still appear when “continue selling when out of stock” is enabled. A complementary product must have inventory above zero. That difference explains why the same candidate can appear in one section and disappear from another.

Check the candidate, not only the source product:

- Status is Active, not Draft, Archived, or Unlisted.
- Online Store is selected in Publishing.
- The relevant market and catalog can sell it.
- Its price is above zero.
- It is not a gift card.
- Inventory satisfies the selected intent.
- The private-session cart does not already contain it.

Shopify’s [product status and availability page](https://help.shopify.com/en/manual/products/product-status) confirms that Unlisted products can be bought from a direct URL but do not appear in storefront product recommendations. That is easy to miss when the candidate page itself still opens normally.

## The API response separates data from theme failures

The fastest technical test is the response behind the section. Shopify documents a locale-aware [Product Recommendations API](https://shopify.dev/docs/api/ajax/reference/product-recommendations) that accepts a product ID plus an intent of `related` or `complementary`. Its result limit ranges from 1 to 10.

Open browser developer tools, reload the source product page, and filter the Network panel for `recommendations`. Select the request and inspect its URL and response.

| Observed result | What it proves | Next owner |
|---|---|---|
| No request | The section or its script never ran | Template, theme setting, or JavaScript |
| Request uses the wrong intent | Saved data and storefront request do not match | Theme section or block choice |
| Successful response with no products | Shopify found no eligible result for that context | Recommendation choice and product eligibility |
| Response contains products, storefront is empty | Shopify returned data but the theme did not render it | Theme code, CSS, or app conflict |
| Request fails | The section cannot retrieve its result | URL construction, script, app, or platform status |

Do not paste a product ID from another item or remove the locale path to force a response. Compare the live request with Shopify’s documented shape, then change one thing.

<figure class="blog-feature-image"><img src="/Blogs/shopify-product-recommendations-not-showing/recommendation-layer-flow.svg" alt="Decision flow for locating an empty Shopify recommendation section" width="1600" height="900" loading="lazy" decoding="async"><figcaption>Stop at the first failed layer: intent, eligibility, response, or rendering.</figcaption></figure>

## A flicker points to asynchronous rendering

If the heading or placeholder appears briefly and then disappears, the initial section loaded but the later recommendation result was empty or rejected by the theme. Shopify’s [complementary-products theme guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/recommendations/complementary-products) explains that recommendations load asynchronously with JavaScript and replace a placeholder after the response arrives.

Watch the recommendation request while the flicker happens. An empty response sends you back to intent and eligibility. A populated response sends you forward to the theme’s rendering condition, product-card snippet, CSS, and any app that replaces the section.

Also check whether the product uses the template you edited. A correct block on the default product template proves nothing when the affected product uses a custom template.

## Use a clean theme as the final control

Preview the same source product and candidate in a fresh, unedited Shopify theme. Do not publish it. Keep the market, cart state, and product pair unchanged.

If recommendations appear there, the catalog and Shopify response are working. Compare the live theme’s section request, intent, render condition, product-card snippet, and CSS with the clean preview. Recent app installs and theme edits deserve attention, but disabling everything at once destroys the evidence.

If both themes fail and the API response is empty, return to Search & Discovery and candidate eligibility. If both receive products but neither displays them, confirm that you are viewing the correct section and that no shared app script replaces it.

The [Shopify conversion audit checklist](/guides/shopify-conversion-audit-checklist) can hold this control alongside product-page, cart, mobile, and checkout checks after the repair.

## An ownership map for the fix

Assign the repair to the first layer that fails.

| Failed layer | Repair |
|---|---|
| Recommendation type | Use the block and intent that match related or complementary data |
| Product eligibility | Correct status, publication, price, inventory, or cart context |
| API request | Restore the locale-aware URL, product ID, and intended request |
| Theme rendering | Repair the condition, product card, JavaScript, or CSS |
| App integration | Reproduce without the app on a duplicate theme, then escalate with the request evidence |

Avoid replacing native recommendations with an app before locating the failed layer. An app can add merchandising controls, but it can also conceal a publication or inventory rule that will affect other storefront features.

## Verify the repair like a shopper

Retest the original product pair in a new private session. Confirm the expected candidate on desktop and mobile, then add it to the cart and verify that the recommendation behaves as Shopify documents. Repeat with one sold-out candidate and one product assigned to another market so the empty-state behavior is deliberate rather than accidental.

Finish by checking several source products, not the whole catalog. The goal is a repeatable path: the intended recommendation is saved, eligible for the shopper context, present in the response, visible in the correct template, and clickable into a purchasable product.

<section class="blog-cta">
  <h2>Repair the recommendation path before adding another app</h2>
  <p>MlabsGrowth can trace the recommendation intent, product eligibility, API response, and theme render, then turn the fix into a product-page regression check.</p>
  <p><a href="/services/store-conversion">Fix Shopify product-page conversion issues</a> or browse <a href="/services">all MlabsGrowth services</a>.</p>
</section>

## Sources

- [Shopify Help Center, *Customize product recommendations with Shopify Search & Discovery*](https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-recommendations), retrieved 2026-11-06; no publication date shown.
- [Shopify Help Center, *Product status and availability*](https://help.shopify.com/en/manual/products/product-status), retrieved 2026-11-06; no publication date shown.
- [Shopify.dev, *Product Recommendations API reference*](https://shopify.dev/docs/api/ajax/reference/product-recommendations), retrieved 2026-11-06; no publication date shown.
- [Shopify.dev, *Show complementary products on product pages*](https://shopify.dev/docs/storefronts/themes/product-merchandising/recommendations/complementary-products), retrieved 2026-11-06; no publication date shown.
