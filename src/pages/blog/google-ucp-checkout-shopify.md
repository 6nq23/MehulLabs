---
layout: ../../layouts/BlogPostLayout.astro
draft: false
title: "Google UCP Checkout: What Shopify Stores Must Do Now"
description: "The Universal Commerce Protocol puts a Buy button in Google AI Mode and Gemini. See the 3 updates since January 2026 and what Shopify stores should fix first."
publishedOn: "2026-09-26"
updatedOn: "2026-09-26"
category: "AI commerce & advertising"
author: "Mehul"
readTime: "11 min read"
coverImage: "/Blogs/google-ucp-checkout-shopify/google-ucp-hero.png"
coverImageAlt: "Concept illustration of Google AI Mode showing a product with an in-chat checkout button powered by UCP"
wordCount: 2380
faqs:
  - question: "What is the Universal Commerce Protocol?"
    answer: "The Universal Commerce Protocol, or UCP, is an open standard for agentic commerce that Google announced on 11 January 2026. It was co-developed with Shopify, Etsy, Wayfair, Target and Walmart. It gives AI agents a common way to read catalogs, build carts, link accounts, check out and handle orders with merchants."
  - question: "Can Shopify stores use Google UCP checkout?"
    answer: "Some can. Shopify's help centre says stores selling on Google AI Mode and Gemini must be based in the United States, sell to US customers, use Google Merchant Center, have Shopify Catalog-eligible products and complete their policies. Direct checkout is on by default for eligible stores. Check the Agentic sales channel in your admin for current status."
  - question: "Which countries support UCP checkout on Google?"
    answer: "As of 24 September 2026, Google's Merchant Center help page says the UCP checkout article applies to products eligible in the United States, Canada and Australia, for select participating merchants. Google said in May 2026 that the UK would follow later. Shopify's Google channel documentation still lists a US-only store requirement."
  - question: "Is the merchant still the seller of record with UCP checkout?"
    answer: "Yes. Google's UCP FAQ says the merchant is the merchant of record, keeps the customer relationship and data, and that the merchant's own terms and conditions cover the purchase. Your payment service provider must be able to process Google's payment tokens, but you do not need Google Pay on your own website."
  - question: "How is UCP different from OpenAI's Agentic Commerce Protocol?"
    answer: "UCP was launched by Google with retail co-developers and powers checkout in AI Mode and Gemini. The Agentic Commerce Protocol was co-developed by OpenAI and Stripe in September 2025 for ChatGPT. In March 2026, OpenAI moved checkout away from product listings towards merchant apps, while ACP continues as its commerce infrastructure."
---

The Universal Commerce Protocol (UCP) is Google's open standard for letting AI agents buy from merchants. Its first visible use is a checkout button on product listings in AI Mode in Google Search and the Gemini app. The shopper pays with details saved in Google Wallet, and the store stays the merchant of record.

For Shopify stores, the practical question is eligibility. As of 24 September 2026, Shopify's documentation says the Google AI Mode and Gemini channel requires a US-based store selling to US customers, a Google Merchant Center account and complete store policies. Google's own help page now covers the US, Canada and Australia for select merchants.

This guide explains what UCP is, how it has changed since January, and what to fix in your feed, policies and measurement before checkout reaches your products.

<figure class="blog-feature-image">
  <img src="/Blogs/google-ucp-checkout-shopify/google-ucp-hero.png" alt="Concept illustration of Google AI Mode showing a product with an in-chat checkout button powered by UCP" width="1600" height="900" fetchpriority="high" decoding="async">
  <figcaption>Concept illustration of a UCP-powered Buy button inside an AI Mode conversation. This is not a product screenshot.</figcaption>
</figure>

> **Key takeaways**
>
> - Google announced UCP on 11 January 2026 and has expanded it twice since, in March and May.
> - UCP checkout runs in AI Mode in Search and the Gemini app, for select merchants only.
> - Shopify's Google channel currently requires a US-based store, Merchant Center and complete policies.
> - Feed accuracy, return policies, shipping data and GTINs decide whether products can carry a Buy button.

<div class="blog-brand-strip" aria-label="Platforms covered in this guide">
  <p>Platforms in this guide</p>
  <span><img src="/platforms/google.svg" alt="" width="18" height="18" loading="lazy">Google</span>
  <span><img src="/platforms/shopify.svg" alt="" width="18" height="18" loading="lazy">Shopify</span>
  <span>Gemini</span>
  <span>Google Merchant Center</span>
</div>

## In this guide

- [What UCP is](#what-is-the-universal-commerce-protocol)
- [How UCP has changed in 2026](#how-has-google-ucp-changed-since-january-2026)
- [Where UCP checkout runs and who is eligible](#where-does-ucp-checkout-run-and-who-is-eligible)
- [How Shopify stores get access](#how-do-shopify-stores-get-ucp-checkout-in-ai-mode-and-gemini)
- [What to prepare in Merchant Center](#what-should-you-prepare-before-ucp-checkout-reaches-your-products)
- [How to measure in-chat orders](#how-should-you-measure-orders-from-ucp-checkout)
- [UCP versus OpenAI's Agentic Commerce Protocol](#how-does-ucp-compare-with-openais-agentic-commerce-protocol)
- [What non-US merchants should do now](#what-should-non-us-merchants-do-now)
- [Frequently asked questions](#frequently-asked-questions)

## What is the Universal Commerce Protocol?

UCP is an open standard for agentic commerce that Google announced on 11 January 2026, co-developed with Shopify, Etsy, Wayfair, Target and Walmart. Google's [launch post](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/) said more than 20 partners endorsed it, including Adyen, American Express, Best Buy, Mastercard, Stripe, Visa and Zalando.

In plain terms, UCP is a shared set of rules. An AI agent, such as Gemini, uses it to ask a merchant's systems what is in stock, what a basket costs, which discounts apply and how to pay. The merchant answers in a predictable format, so the agent does not need a custom integration for every store.

The [official UCP site](https://ucp.dev/) lists five capability areas: catalog search and lookup, cart building, identity linking, checkout and order management. It supports REST and JSON-RPC transports and works alongside the Agent Payments Protocol (AP2), Agent2Agent (A2A) and Model Context Protocol (MCP). The specification is licensed under Apache 2.0.

<figure class="blog-feature-image blog-feature-image--inline">
  <img src="/Blogs/google-ucp-checkout-shopify/google-ucp-handshake.png" alt="Diagram of the Universal Commerce Protocol connecting an AI agent, the merchant catalog and cart, and the payment provider" width="1600" height="900" loading="lazy" decoding="async">
  <figcaption>UCP sits between three parties: the AI agent that talks to the shopper, the merchant's catalog and cart, and the payment provider that processes the token.</figcaption>
</figure>

As of 24 September 2026, the ucp.dev "co-developed by" list is longer than Google's January list. It now also names Amazon, Microsoft, Meta, Salesforce and Stripe, alongside travel and food-delivery companies. That suggests UCP is being positioned as an industry standard rather than a Google-only feature, although Google's surfaces remain the main live checkout example.

## How has Google UCP changed since January 2026?

Google has made three public UCP announcements in 2026: the launch on 11 January, new Cart, Catalog and Identity Linking capabilities on 19 March, and a set of checkout and country updates on 20 May around Google Marketing Live. Each one moved UCP from a checkout pilot towards a full shopping journey.

| Date | What changed | Source |
|---|---|---|
| 11 January 2026 | UCP announced. Checkout on eligible product listings in AI Mode and Gemini for eligible US retailers, paid with Google Pay; PayPal support described as coming soon. Business Agent and a Direct Offers ads pilot announced alongside it. | [Google, *New tech and tools for retailers*](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/) |
| 19 March 2026 | Cart (several items from one store), Catalog (real-time variants, inventory and pricing) and Identity Linking (loyalty and member benefits). A simpler onboarding flow in Merchant Center announced as rolling out over the coming months. | [Google, *UCP updates*](https://blog.google/products-and-platforms/products/shopping/ucp-updates/) |
| 20 May 2026 | UCP checkout to roll out in Canada and Australia "in the coming months" and later the UK. Universal Cart announced, plus buy now, pay later through Affirm and Klarna. Shopify merchants Fenty and Steve Madden named among checkout retailers. | [Google, *Shopping updates from Google Marketing Live*](https://blog.google/products-and-platforms/products/shopping/shopping-updates-google-marketing-live/) |
| 24 September 2026 | Merchant Center help page covers products eligible in the US, Canada and Australia, for select participating merchants. | [Google Merchant Center Help](https://support.google.com/merchants/answer/16837055) |

The March post named Commerce Inc, Salesforce and Stripe as partners helping merchants onboard. It did not name Shopify in that list, which matters for the next section: Shopify stores reach Google through Shopify's own channel rather than a separate UCP build.

## Where does UCP checkout run, and who is eligible?

Google's [UCP FAQ](https://developers.google.com/merchant/ucp/faq) says integrations appear in AI Mode in Google Search and in both the Gemini web app and the Gemini mobile app. The Merchant Center help page says the feature is "available for select merchants at this time", so a merchant cannot assume every product will get a Buy button.

The Merchant Center page, retrieved on 24 September 2026, describes the direct route for merchants that build their own integration:

1. Meet Google's UCP requirements for merchants.
2. Submit the UCP integration interest form.
3. Complete the technical integration.
4. Create a Google Pay & Wallet Console account.
5. Mark products with the `native_commerce` attribute so listings can show the Buy button.

Payment currently uses standard card details that shoppers have stored in Google Wallet. Google's FAQ adds that merchants do not need Google Pay on their own site, but their payment service provider must be able to process Google's tokens.

The distinction from Google's older checkout links is where the purchase happens. Previously, a checkout button sent the shopper to the merchant's website. With UCP, Google's help page says checkout happens on Google's surfaces while the merchant stays the merchant of record.

## How do Shopify stores get UCP checkout in AI Mode and Gemini?

Shopify stores do not need to build a UCP integration themselves. Shopify's [Google AI Mode and Gemini help page](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/google) describes a channel inside agentic storefronts. Eligible stores get Shopify-powered direct checkout in the chat, and it is activated by default.

On 11 January 2026, Shopify's [announcement](https://www.shopify.com/news/ai-commerce-at-scale) said merchants would be able to sell directly in AI Mode and the Gemini app, managed from the Shopify admin. Shopify's help page, retrieved on 24 September 2026, lists these requirements:

- The store is based in the United States and sells to US customers.
- A valid Google Merchant Center account that meets Google's free listings requirements, with a return policy set up.
- Products reach Merchant Center through the Google & YouTube sales channel with automatic product and shipping sync, or through another upload method.
- Products are eligible for Shopify Catalog.
- The merchant accepts the Agentic Storefronts Supplemental Terms and completes the terms of service, privacy policy, and return and refund policy in **Settings > Policies**.

Shopify states there is no separate channel fee; merchants pay their standard payment processing fees. To change the setting, go to **Sales channels > Agentic > Google AI Mode and Gemini**, turn off "Allow Shopify to manage for me", then switch direct checkout on or off.

The help page does not use the term "UCP". Google's own posts name Shopify as a co-developer and list Shopify merchants among checkout retailers, so the connection is clear at the protocol level. Exactly how Shopify's channel maps to each UCP capability is not documented publicly. Our [agentic commerce guide for Shopify](/blog/agentic-commerce-shopify-guide) covers the wider set of AI channels.

<aside class="blog-callout">
  <strong>Check the exclusions before you celebrate:</strong> Shopify lists subscriptions, product bundles, customisable products, B2B-only products, local delivery, in-store pickup and required customer sign-in as unsupported in this direct checkout. Many checkout blocks, including upsells, custom fields and loyalty widgets, may not display.
</aside>

## What should you prepare before UCP checkout reaches your products?

Google's UCP FAQ asks merchants to keep product feeds, brand assets, return policies and business contact information complete and current in Merchant Center. For Shopify stores, that means fixing five areas: product data, returns, shipping, identifiers and on-page structured data, then confirming the payment path.

| Area | What to check | Why it matters |
|---|---|---|
| Product feed | Titles, descriptions, images, variants, price and stock match the storefront | The Catalog capability pulls real-time variants, inventory and pricing |
| Return policy | Policy created in Merchant Center and in Shopify admin | Shopify requires it for the channel, and Google verifies return policies |
| Shipping | "Automatically sync shipping information" is on in the Google & YouTube channel | Shopify's help page lists it as a sync requirement |
| Identifiers | Correct GTINs; brand and MPN for private-label goods | Missing GTINs can limit visibility or lead to disapproval |
| Structured data | Product, Offer, shipping and return markup on product pages | Keeps Search, Merchant Center and the page consistent |
| Payments | Card payments working for US customers | Shopify's in-chat checkout takes credit and debit cards |

### Clean the product feed first

Start with Merchant Center diagnostics and fix disapprovals before thinking about AI surfaces. Write titles a shopper can understand, lead descriptions with the product type and main use, and remove internal shorthand. Our [AI product feed optimization guide](/blog/ai-product-feed-optimization) covers attribute-level fixes.

Google's May update also introduced conversational attributes in Merchant Center. These are designed for AI shopping answers, so product data increasingly needs to answer questions, not only fill fields.

### Set up returns in both places

Google's help page for [return policies for Shopify users](https://support.google.com/merchants/answer/14232691?hl=en) says the Google & YouTube app does not sync return policies automatically. You need a written policy in Shopify admin and a separate return policy in Merchant Center under **Shipping and returns**. Keep the two identical.

### Get identifiers right

Google's [GTIN guidance](https://support.google.com/merchants/answer/6324461) says products with missing or incorrect GTINs may have limited visibility, and a product with an assigned GTIN that is not submitted could be disapproved. Do not invent values. Private-label products without GTINs should use brand and MPN.

### Align structured data with the feed

Google Search Central's [merchant listing documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) requires name, image, price and currency, and recommends availability, GTIN, `shippingDetails` and `hasMerchantReturnPolicy`. Most Shopify themes output some Product markup; confirm that price, stock and returns match the feed. Our [Shopify SEO guide for AI search](/blog/shopify-seo-ai-search-guide) walks through the checks.

### Test the checkout path

Place a test order through your normal checkout and review it with the [Shopify conversion audit checklist](/guides/shopify-conversion-audit-checklist). If shipping rates, discounts or policy links fail there, they will likely fail inside an AI conversation too.

## How should you measure orders from UCP checkout?

Shopify's help page says Google Analytics and custom pixels will not fire in the AI Mode and Gemini direct checkout; only server-to-server pixels do. Any report that depends on a browser tag will undercount these orders, so plan attribution before the channel sends volume.

Three practical steps help:

1. **Use Shopify orders as the source of truth.** Review sales by channel in Shopify rather than relying on GA4 purchase events for this path.
2. **Separate discovery from checkout.** Shoppers who click through to your store can still be tracked by referral. Our guide to [tracking AI traffic in GA4](/blog/track-ai-traffic-ga4) explains how to group AI referrers.
3. **Identify agent traffic in server logs.** Google's UCP FAQ says UCP requests carry a `UCP-Agent` header and a User-Agent value that begins with `Google/UCP`. Developers can use this to filter or label agent calls.

<!-- [UNIQUE INSIGHT] -->
> **A measurement trap to avoid:** if in-chat orders do not appear in GA4, a paid campaign or organic Google report can look weaker than it really is. Compare Shopify's channel-level orders with analytics each week, and write down which system you trust for which question before anyone adjusts budgets.

## How does UCP compare with OpenAI's Agentic Commerce Protocol?

Both are open standards that let an AI agent complete a purchase while the merchant keeps the sale. The Agentic Commerce Protocol (ACP) was co-developed by OpenAI and Stripe and announced on 29 September 2025. UCP arrived in January 2026 with Google and retail co-developers. Their current use in checkout differs.

| Point | Google UCP | OpenAI Agentic Commerce Protocol |
|---|---|---|
| Announced | 11 January 2026 | 29 September 2025 |
| Co-developed by | Google with Shopify, Etsy, Wayfair, Target and Walmart | OpenAI and Stripe |
| Main live surface | AI Mode in Search and the Gemini app | ChatGPT |
| Merchant of record | The merchant, per Google's UCP FAQ | The merchant; OpenAI's docs say OpenAI is not the merchant of record |
| Payment | Google Wallet cards; merchant's PSP must process Google's tokens | Delegated payment; Stripe's Shared Payment Token was the first implementation |
| Checkout status, September 2026 | Buy button for select merchants in the US, Canada and Australia | OpenAI moved checkout from product listings to merchant apps in March 2026 |
| Shopify route | Google AI Mode and Gemini channel, US stores | Shopify's ChatGPT channel; ChatGPT Ads app for paid campaigns |

Sources: Google's [UCP FAQ](https://developers.google.com/merchant/ucp/faq), Stripe's [ACP announcement](https://stripe.com/newsroom/news/stripe-openai-instant-checkout), OpenAI's [ACP key concepts](https://developers.openai.com/commerce/guides/key-concepts) and [Digital Commerce 360's report](https://www.digitalcommerce360.com/2026/03/06/openai-shifts-checkout-plans-agentic-commerce-strategy/) on OpenAI's checkout change.

The March 2026 shift matters. Digital Commerce 360 quoted an OpenAI spokesperson saying the company was prioritising search and product discovery, with ACP as the connecting infrastructure. For a Shopify merchant, ChatGPT is currently more of a discovery and advertising channel; see our [ChatGPT Ads for Shopify guide](/blog/chatgpt-ads-shopify-guide). Google, by contrast, is still expanding in-chat checkout.

You do not need to choose one protocol. Shopify handles both through its agentic storefronts, so the shared work is the same: accurate catalog data, clear policies and reliable fulfilment.

## What should non-US merchants do now?

As of 24 September 2026, Shopify's Google AI Mode and Gemini channel still requires a US-based store, even though Google's help page covers the US, Canada and Australia. Google said in May that the UK would follow later. Google has not announced UCP checkout dates for other markets, including India.

That gap is a preparation window. Use it for work that pays off in ordinary Google Shopping today:

- **Fix Merchant Center health.** Clear disapprovals, fill GTINs and keep price and stock synced.
- **Publish complete policies.** Returns, shipping, terms and privacy should be easy to find and consistent with Merchant Center.
- **Remove checkout dependencies that UCP will not support.** If key products only sell as bundles or with required sign-in, plan simpler versions.
- **Build server-side order reporting.** You will need it once in-chat orders bypass browser tags.
- **Watch two pages monthly:** Google's Merchant Center UCP article and Shopify's Google channel requirements. Eligibility will likely change there first.

US-based Shopify stores that sell cross-border should note one more limit: Shopify says direct checkout displays only to US customers, and others are sent to the online store.

<section class="blog-cta">
  <h2>Get your catalog and reporting ready for AI checkout</h2>
  <p>mlabs Growth builds AI marketing workflows for Shopify brands, including feed quality checks, policy audits and channel-level reporting that does not depend on browser tags.</p>
  <p><a href="/services/ai-automation">Explore AI marketing workflow automation</a> or <a href="https://calendly.com/kalathiyamehul13899/30min">book a 30-minute call</a>.</p>
</section>

## Frequently asked questions

### What is the Universal Commerce Protocol?

The Universal Commerce Protocol, or UCP, is an open standard for agentic commerce that Google announced on 11 January 2026. It was co-developed with Shopify, Etsy, Wayfair, Target and Walmart. It gives AI agents a common way to read catalogs, build carts, link accounts, check out and handle orders with merchants.

### Can Shopify stores use Google UCP checkout?

Some can. Shopify's help centre says stores selling on Google AI Mode and Gemini must be based in the United States, sell to US customers, use Google Merchant Center, have Shopify Catalog-eligible products and complete their policies. Direct checkout is on by default for eligible stores. Check the Agentic sales channel in your admin for current status.

### Which countries support UCP checkout on Google?

As of 24 September 2026, Google's Merchant Center help page says the UCP checkout article applies to products eligible in the United States, Canada and Australia, for select participating merchants. Google said in May 2026 that the UK would follow later. Shopify's Google channel documentation still lists a US-only store requirement.

### Is the merchant still the seller of record with UCP checkout?

Yes. Google's UCP FAQ says the merchant is the merchant of record, keeps the customer relationship and data, and that the merchant's own terms and conditions cover the purchase. Your payment service provider must be able to process Google's payment tokens, but you do not need Google Pay on your own website.

### How is UCP different from OpenAI's Agentic Commerce Protocol?

UCP was launched by Google with retail co-developers and powers checkout in AI Mode and Gemini. The Agentic Commerce Protocol was co-developed by OpenAI and Stripe in September 2025 for ChatGPT. In March 2026, OpenAI moved checkout away from product listings towards merchant apps, while ACP continues as its commerce infrastructure.

## The bottom line

UCP checkout is real but narrow. It runs in AI Mode and Gemini for select merchants, and Shopify's route to it currently requires a US-based store. The protocol is gaining capabilities quickly, with cart, catalog and account linking added in March and new countries promised in May.

The work that decides eligibility is not new. Accurate feeds, matching return policies, synced shipping, correct GTINs and working checkout have always mattered for Google Shopping. Fix them now, set up order reporting that does not rely on browser tags, and check the Google and Shopify documentation each month for changes.

## Source notes

- [Google, *New tech and tools for retailers to succeed in an agentic shopping era*](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/), published 2026-01-11, retrieved 2026-09-24.
- [Google, *Universal Commerce Protocol updates improve AI shopping for retailers*](https://blog.google/products-and-platforms/products/shopping/ucp-updates/), published 2026-03-19, retrieved 2026-09-24.
- [Google, *How we're helping retailers thrive with new Universal Commerce Protocol features and AI tools on Google*](https://blog.google/products-and-platforms/products/shopping/shopping-updates-google-marketing-live/), published 2026-05-20, retrieved 2026-09-24.
- [Google Merchant Center Help, *About the Universal Commerce Protocol (UCP) and UCP-powered checkout feature on Google*](https://support.google.com/merchants/answer/16837055), retrieved 2026-09-24.
- [Google for Developers, *UCP FAQ*](https://developers.google.com/merchant/ucp/faq), retrieved 2026-09-24.
- [Universal Commerce Protocol, *ucp.dev*](https://ucp.dev/), retrieved 2026-09-24.
- [Shopify News, *AI commerce at scale*](https://www.shopify.com/news/ai-commerce-at-scale), published 2026-01-11, retrieved 2026-09-24.
- [Shopify Help Center, *Selling on Google AI Mode and Gemini*](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/google), retrieved 2026-09-24.
- [Google Merchant Center Help, *Set up your return policies (for Shopify users)*](https://support.google.com/merchants/answer/14232691?hl=en), retrieved 2026-09-24.
- [Google Merchant Center Help, *GTIN*](https://support.google.com/merchants/answer/6324461), retrieved 2026-09-24.
- [Google Search Central, *Merchant listing (Product, Offer) structured data*](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), retrieved 2026-09-24.
- [Stripe Newsroom, *Stripe powers Instant Checkout in ChatGPT and releases Agentic Commerce Protocol codeveloped with OpenAI*](https://stripe.com/newsroom/news/stripe-openai-instant-checkout), published 2025-09-29, retrieved 2026-09-24.
- [OpenAI Developers, *Agentic Commerce key concepts*](https://developers.openai.com/commerce/guides/key-concepts), retrieved 2026-09-24.
- [Digital Commerce 360, *OpenAI shifts checkout plans in its agentic commerce strategy*](https://www.digitalcommerce360.com/2026/03/06/openai-shifts-checkout-plans-agentic-commerce-strategy/), published 2026-03-06, retrieved 2026-09-24.
