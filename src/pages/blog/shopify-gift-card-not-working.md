---
layout: ../../layouts/BlogPostLayout.astro
draft: false
title: "Shopify Gift Card Not Working? Diagnose the Failure"
description: "Shopify gift card not working? Use a failure-mode matrix to isolate card status, delivery, checkout, balance, currency, theme, and market issues."
publishedOn: "2026-11-14"
updatedOn: "2026-11-14"
category: "Shopify conversion"
author: "Mehul"
coverImage: "/Blogs/shopify-gift-card-not-working/gift-card-failure-hero.svg"
coverImageAlt: "Shopify gift card failure path from issue to successful checkout"
---

When a Shopify gift card is not working, first identify whether the failure happened during creation, delivery, code entry, or redemption. Do not replace the card until you have checked its status, remaining balance, expiry, checkout currency, and the exact storefront path the customer used.

<figure class="blog-feature-image"><img src="/Blogs/shopify-gift-card-not-working/gift-card-failure-hero.svg" alt="Shopify gift card failure path from issue to successful checkout" width="1600" height="900" fetchpriority="high" decoding="async"><figcaption>A gift card can fail before checkout, inside checkout, or after the code has already been partly used.</figcaption></figure>

## Shopify gift card not working: classify the failure

Start with the customer-visible symptom. “I did not receive it,” “the field is missing,” and “the code is invalid” point to different systems. A single replacement may hide the evidence and create a second active balance.

| Symptom | First evidence to collect | Likely failure layer |
|---|---|---|
| No card appears after purchase | Order status, line-item type, fulfillment event | Product setup or fulfillment |
| Buyer received a receipt, recipient received nothing | Recipient fields, scheduled date, notification | Theme form or delivery |
| Gift card field is missing at checkout | Active cards in admin, checkout route | Store configuration or checkout customization |
| Code is rejected | Exact error, card status, expiry, currency | Redemption eligibility |
| Code works but value looks wrong | Remaining balance, order total, currency | Prior use or conversion |
| Selected amount changes in the cart | Variant ID and clean-theme result | Theme, app, or custom code |

Also confirm what the shopper means by “gift card.” A store-issued Shopify gift card is a stored-value code for that merchant. A prepaid Visa, Mastercard, or similar card is an external payment card, so its decline belongs in the payment-provider path instead.

## Prove that a usable card exists

Open the order and the gift-card record before touching the theme. Shopify’s [Gift cards considerations and overview](https://help.shopify.com/en/manual/products/gift-card-products/overview) says a card is created when an order containing a real gift-card product is fulfilled. A regular product merely named “gift card” does not create a redeemable code.

Check these facts in the admin:

- the order contains a gift-card product, not a conventional product
- the gift-card line has been fulfilled
- a matching card record exists under **Products > Gift cards**
- the record is active, has value remaining, and has not expired
- the last visible code characters match the customer’s card

Shopify displays only the last four code characters to merchants because the full code is treated as currency, according to the same overview. Ask the customer for the last four characters and the exact error, not the complete code in an unsecured support message.

Risk status can explain a card that was paid for but not delivered. Shopify’s [Gift card settings](https://help.shopify.com/en/manual/products/gift-card-products/modify-gift-card-settings) states that medium- or high-risk orders do not automatically fulfill gift cards. Review the order, then fulfill deliberately if it is safe to do so.

## Separate card delivery from code redemption

A Shopify gift card email not received is not proof that the card is invalid. Search for the card first. If it exists, Shopify’s [Managing created gift cards](https://help.shopify.com/en/manual/products/gift-card-products/manage-purchased-gift-cards) documentation lets the merchant resend it to the original customer from the card record; a partly used card is resent with its remaining balance.

Recipient delivery needs its own check. Shopify’s [recipient-fields documentation](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/common-customizations/add-gift-card-recipient-fields) says the supported form can carry the recipient email, name, message, and scheduled date. If those values appear as ordinary line-item properties but the recipient does not get the card, compare the gift-card product in an unmodified Shopify theme. A custom form can display correctly while omitting the input Shopify needs to route the notification.

Do not rebuild the notification first. Record whether the card exists, who the original customer is, whether a recipient was supplied, and whether delivery was scheduled. Then resend the existing card. Creating a replacement is a separate commercial decision because both codes can remain usable unless the first is deactivated.

## Test the exact code in a controlled checkout

Build a clean checkout with the same market, currency, customer state, and cart type as the failed attempt. Shopify’s [Redeeming and using gift cards](https://help.shopify.com/en/manual/products/gift-card-products/redeem-gift-card) page says codes are not case sensitive, the redemption field appears only when the store has active gift cards, and any unpaid remainder requires another eligible payment method.

Use a fresh browser session and record:

- checkout URL and sales channel
- market and displayed currency
- products, taxes, shipping, discounts, and subscription status
- exact message after the code is entered
- expected balance and balance after the attempt

Gift cards can cover taxes and shipping, can be combined with discount codes, and can share an order with another gift card, according to Shopify’s redemption documentation. They cannot buy another gift card. For subscription products, a gift card can fund the initial payment but not later recurring charges.

If a shopper has entered a promotional code rather than stored value, use the [Shopify discount code test plan](/blog/shopify-discount-code-not-working) instead. The two fields can look similar, but their eligibility rules and admin records are different.

## Currency rules create market-specific failures

Store-currency and local-currency cards do not redeem the same way. Shopify’s [gift cards in Markets](https://help.shopify.com/en/manual/international/pricing/gift-cards) documentation says store-currency cards can convert automatically at checkout. A local-currency card normally requires the checkout currency to match unless cross-currency redemption was enabled when the card or product was created.

That setting cannot be changed after creation. If the card succeeds in its issued currency but fails in another market, the evidence points to currency eligibility rather than a broken code.

Expiry rules also differ by country. Shopify’s gift-card settings page says cards do not expire by default because expiry is illegal in some jurisdictions. Before changing the policy, confirm the legal rules for every market where the card is sold. For one expired card, adjust its expiry only when local rules and the store’s published terms allow it.

<figure class="blog-feature-image"><img src="/Blogs/shopify-gift-card-not-working/gift-card-decision-map.svg" alt="Decision map for Shopify gift card creation delivery and redemption failures" width="1600" height="900" loading="lazy" decoding="async"><figcaption>Follow the first failed state: record, delivery, checkout visibility, or redemption eligibility.</figcaption></figure>

## Use a failure record before releasing the fix

A useful incident record keeps the card secure while giving support or a developer enough evidence to reproduce the problem. Save the order ID, gift-card record status, last four code characters, issue currency, checkout currency, remaining balance, customer-visible message, affected theme, and test result. Never place the full code in the record.

Retest the original route after the fix, then run a control through an unmodified theme. If only the live theme fails, inspect variant selection, recipient-field markup, cart scripts, app embeds, and payment customizations. If both routes fail with the same card but another active card passes, return to that card’s status, expiry, balance, and currency.

For a promotional card, model the cost before issuing a replacement or goodwill balance. The [unit economics calculator](/tools/unit-economics) separates product, fulfillment, and acquisition costs from the order value. Use the [Shopify conversion audit checklist](/guides/shopify-conversion-audit-checklist) to add gift-card purchase and redemption cases to future release testing.

<section class="blog-cta">
  <h2>Turn the fix into a repeatable checkout test</h2>
  <p>MlabsGrowth can isolate the product, theme, market, and checkout layer behind gift-card failures, then document the passing route for future releases.</p>
  <p><a href="/services/store-conversion">Fix Shopify gift-card and checkout conversion</a> or browse <a href="/services">all MlabsGrowth services</a>.</p>
</section>

## Sources

- [Shopify Help Center, *Gift cards considerations and overview*](https://help.shopify.com/en/manual/products/gift-card-products/overview), retrieved 2026-11-14; no publication date shown.
- [Shopify Help Center, *Gift card settings*](https://help.shopify.com/en/manual/products/gift-card-products/modify-gift-card-settings), retrieved 2026-11-14; no publication date shown.
- [Shopify Help Center, *Managing created gift cards*](https://help.shopify.com/en/manual/products/gift-card-products/manage-purchased-gift-cards), retrieved 2026-11-14; no publication date shown.
- [Shopify Help Center, *Add recipient fields to your gift card products*](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/common-customizations/add-gift-card-recipient-fields), retrieved 2026-11-14; no publication date shown.
- [Shopify Help Center, *Redeeming and using gift cards*](https://help.shopify.com/en/manual/products/gift-card-products/redeem-gift-card), retrieved 2026-11-14; no publication date shown.
- [Shopify Help Center, *Gift cards*](https://help.shopify.com/en/manual/international/pricing/gift-cards), retrieved 2026-11-14; no publication date shown.
