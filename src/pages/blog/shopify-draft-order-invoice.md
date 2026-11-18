---
layout: ../../layouts/BlogPostLayout.astro
draft: false
title: "Shopify Draft Order Invoice Not Sending? Fix It"
description: "Shopify draft order invoice not sending? Trace the customer record, email delivery, checkout link, currency, and payment rules without rebuilding it."
publishedOn: "2026-11-18"
updatedOn: "2026-11-18"
category: "COD & order operations"
author: "Mehul"
coverImage: "/Blogs/shopify-draft-order-invoice/draft-order-invoice-hero.svg"
coverImageAlt: "Draft order invoice moving from Shopify admin to customer payment"
---

When a Shopify draft order invoice is not sending, separate email delivery from checkout access. Confirm the customer contact, preview the invoice, copy the direct checkout link as a controlled fallback, and only then investigate sender authentication or order rules.

<figure class="blog-feature-image"><img src="/Blogs/shopify-draft-order-invoice/draft-order-invoice-hero.svg" alt="Draft order invoice moving from Shopify admin to customer payment" width="1600" height="900" fetchpriority="high" decoding="async"><figcaption>An invoice email is only one route from a saved draft to a paid order.</figcaption></figure>

## Shopify draft order invoice: name the failure

“The invoice did not work” can describe different failures. The Send invoice action may be unavailable. Shopify may accept the send while the customer receives nothing. The email may arrive, but its checkout button may fail. Or the customer may reach checkout and find an inventory, shipping, discount, validation, or payment block.

Start with the customer-visible result, not the draft-order screen.

| Reported symptom | First owner | First evidence |
| --- | --- | --- |
| Send invoice is unavailable | Store administrator | Customer contact, currency, payment terms |
| Shopify confirms the send; no email arrives | Email owner | Recipient address, spam search, sender authentication |
| Email arrives; link fails | Order operations | Draft status, copied link, timeline |
| Checkout opens; payment cannot complete | Checkout owner | Exact error, cart, market, payment method |
| Customer pays; draft still looks open | Order operations | Order list, draft timeline, payment status |

This classification matters because resending the same message does not repair a checkout rule, and rebuilding the draft does not fix mailbox filtering.

## Verify the draft before resending

Open the exact draft and verify the customer email, products, quantities, market, shipping address, discounts, shipping price, currency, payment terms, and draft status. Preview the invoice and read it as the customer would.

Shopify's [draft-order invoice documentation](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/send-draft) says the invoice contains a checkout link and warns that marking a draft as paid before receiving payment makes that link unusable. The same source says unavailable inventory can stop the customer from completing checkout, even when the email itself arrived correctly.

Do not duplicate the draft as a first response. A copy creates another payment link, another record to reconcile, and a risk that both links remain in circulation. Preserve the original while you identify whether the problem belongs to contact data, delivery, link state, or checkout.

If the Send invoice action is missing, inspect international settings before changing the customer. Shopify's [draft-order creation guidance](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft) states that payment terms cannot be invoiced when the draft uses a local currency different from the store currency; that case must use a supported collection path instead.

## Use the checkout link as a controlled fallback

Shopify documents two native paths on the same draft: email the invoice or copy its direct checkout link. In [*Sending invoices for draft orders*](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/send-draft), Shopify explains that the shared link lets the customer enter billing information, choose shipping, and submit payment; a completed checkout converts the draft into an order marked paid.

Use that link to isolate delivery:

- open **Share** on the existing draft and copy the checkout link;
- test it in a private browser without completing payment;
- send it through a channel the customer already uses, such as a direct message or support conversation;
- identify the store, order purpose, amount, currency, and expiry expectation in the message; and
- ask the customer to reply after payment rather than sending a screenshot containing sensitive payment data.

If the direct link opens correctly while the invoice email is missing, the order is probably usable and the remaining problem is email delivery. If both routes fail, stop resending and investigate the draft or checkout state.

<figure class="blog-feature-image"><img src="/Blogs/shopify-draft-order-invoice/invoice-handoff-flow.svg" alt="Decision flow separating invoice email delivery from checkout link failures" width="1600" height="900" loading="lazy" decoding="async"><figcaption>Test the saved draft, the message route, and the checkout as separate handoffs.</figcaption></figure>

## Trace email delivery without guessing

Read the recipient address back to the customer. Search the mailbox for the store name and sender address, then check spam, promotions, quarantine, and company mail filters. A business buyer may have a valid address whose server blocks or quarantines automated mail.

Next, inspect **Settings > Notifications > Sender email**. Shopify's [sender email setup documentation](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-your-email) says third-party domains should be authenticated with the records shown in Shopify, including DKIM and SPF CNAME records plus a DMARC record. Shopify also warns against sender addresses containing “no-reply” wording because some hosts reject them.

Authentication improves the sending identity; it does not prove that one message reached one inbox. Keep those statements separate. Record whether other customer notifications reach the same address and whether the direct checkout link works. If a wider notification problem exists, investigate the domain and notification setup. If one recipient is affected, collect the recipient domain and send time for support.

## Test the checkout behind the email

An arrived invoice can still lead to a failed sale. Open the copied link in a private session and follow the same market, address, shipping, discount, and payment route as the buyer. Record the exact message and the step where it appears.

Shopify's invoice guidance identifies several order-state boundaries: out-of-stock items can block payment, calculated shipping does not automatically refresh after products are added to an already-invoiced order, and unresolved checkout validation rules can prevent completion unless the merchant deliberately allows the draft to bypass them. Review those conditions before blaming the email.

For discount problems, use the [Shopify discount-code test plan](/blog/shopify-discount-code-not-working) because a draft invoice or direct link has rules that differ from an ordinary storefront cart. For payment that has already been attempted, the [Shopify payment pending decision guide](/blog/shopify-payment-pending) helps separate order status from a customer's bank authorization.

Never mark an unpaid draft as paid simply to clear a warning. That changes the commercial record and can invalidate the customer link. Fix the failing rule or choose an authorized alternative collection method.

## Keep a quote-to-payment handoff record

A repeatable handoff prevents sales, support, and finance from sending competing links. Add a note or controlled log with the draft identifier, customer contact, quoted amount and currency, market, payment terms, invoice send time, direct-link send time, last customer response, checkout result, payment status, and named owner.

Use simple state labels:

| State | Meaning | Next action |
| --- | --- | --- |
| Draft ready | Details reviewed; nothing sent | Preview and send |
| Invoice sent | Shopify send completed | Confirm customer receipt |
| Link shared | Direct checkout route supplied | Wait for a defined follow-up point |
| Checkout blocked | Link opens; rule prevents payment | Assign the failing rule |
| Payment pending | Customer attempted payment | Verify payment state before fulfillment |
| Paid order created | Payment completed; order exists | Continue fulfillment |

Only one owner should move the record forward. This is especially useful for wholesale and assisted orders, where a quote may pass between sales, operations, and finance. If manual orders are frequent, check the discount and delivery cost with the [unit economics calculator](/tools/unit-economics) before turning an exception into a standing offer.

## Escalate with evidence, not another send

Escalate when the native send fails repeatedly, the same verified link fails in a private browser, multiple recipients on different domains report missing invoices, or the draft converts into an unexpected payment state. Include the masked recipient, draft identifier, send time and timezone, sender domain status, screenshot of the admin result, copied-link result, exact checkout error, market, currency, and recent changes.

Do not include payment credentials or a customer's full private data in a support ticket. The goal is a reproducible handoff: which saved draft, which message route, which checkout state, and which boundary failed.

<section class="blog-cta">
  <h2>Build a reliable assisted-order handoff</h2>
  <p>MlabsGrowth can map draft creation, invoice delivery, checkout, payment, and fulfillment into one owned workflow for assisted and wholesale orders.</p>
  <p><a href="/services/b2b">Improve your B2B quote-to-order workflow</a> or browse <a href="/services">all MlabsGrowth services</a>.</p>
</section>

## Sources

- [Shopify Help Center, *Sending invoices for draft orders*](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/send-draft), retrieved 2026-11-18; no publication date shown.
- [Shopify Help Center, *Creating draft orders*](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft), retrieved 2026-11-18; no publication date shown.
- [Shopify Help Center, *Setting up your email*](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-your-email), retrieved 2026-11-18; no publication date shown.
- [Shopify Help Center, *Customization options for upgrading customer accounts*](https://help.shopify.com/en/manual/customers/customer-accounts/upgrade/customization-options), retrieved 2026-11-18; no publication date shown.
