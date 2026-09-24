---
layout: ../../layouts/BlogPostLayout.astro
draft: true
title: "How to Track ChatGPT and AI Traffic in GA4 (2026)"
description: "GA4 added a native AI Assistant channel in May 2026. Learn to track ChatGPT, Perplexity, Gemini and Claude traffic in GA4 and Shopify, and tie it to revenue."
publishedOn: "2026-09-24"
updatedOn: "2026-09-24"
category: "AI search & analytics"
author: "Mehul"
readTime: "11 min read"
coverImage: "/Blogs/track-ai-traffic-ga4/ai-traffic-ga4-hero.png"
coverImageAlt: "GA4 traffic acquisition report with an AI assistants channel grouping ChatGPT, Perplexity, Gemini, Copilot and Claude referrals"
wordCount: 2411
faqs:
  - question: "Does GA4 track ChatGPT traffic automatically?"
    answer: "Partly. Since 13 May 2026, GA4's default channel group includes an AI Assistant channel for traffic from sources such as ChatGPT, Gemini, DeepSeek, Copilot and Grok. Google has not published the full list of recognised referrers, so check your Session source report and add a custom channel group for anything the native channel misses."
  - question: "Are Google AI Overviews and AI Mode clicks counted as AI traffic?"
    answer: "No. Google's default channel definitions say the AI Assistant channel excludes AI Overviews and AI Mode. Those clicks are counted as Organic Search in GA4, and Search Console includes them in the Web search type of the Performance report without a separate filter."
  - question: "What regex should I use for AI traffic in GA4?"
    answer: "Use a condition where Session source matches a pattern such as .*(chatgpt\\.com|chat\\.openai\\.com|perplexity|claude\\.ai|gemini\\.google\\.com|copilot\\.microsoft\\.com|deepseek|meta\\.ai|grok\\.com).* and add Medium exactly matches ai-assistant. GA4 regex is full-match and case-sensitive, so test the pattern in an exploration first."
  - question: "Why does some ChatGPT traffic show up as Direct?"
    answer: "A visit only gets a source when the browser passes a referrer or the link carries UTM parameters. Clicks from mobile apps and links that strip the referrer arrive without either, so GA4 records them as Direct. The new AI Assistant channel cannot recover those visits."
  - question: "How do I see AI traffic in Shopify analytics?"
    answer: "Open the Sessions by referrer report and filter Referrer channel for AI answer engines such as ChatGPT, Perplexity and Copilot, according to Shopify. For Gemini, filter Referrer host for gemini.google.com. Orders from Shopify's agentic storefronts show channel or referrer attribution in the admin."
---

ChatGPT, Perplexity, Gemini and Claude now send shoppers to online stores every day, but most analytics setups still file those visits under Referral or Direct. The result is a channel that store owners hear about constantly and cannot see in their own numbers.

That changed partly in May 2026. Google Analytics added a native AI Assistant channel to its default channel group, and Shopify's reports can filter AI answer engines by referrer. Neither view is complete on its own, and some AI visits still arrive with no source at all.

This guide shows how to track AI traffic in GA4 in 2026: what the native channel covers, how to build a custom channel group for the rest, how to cross-check in Shopify and how to connect AI visits to revenue rather than sessions.

<figure class="blog-feature-image">
  <img src="/Blogs/track-ai-traffic-ga4/ai-traffic-ga4-hero.png" alt="GA4 traffic acquisition report with an AI assistants channel grouping ChatGPT, Perplexity, Gemini, Copilot and Claude referrals" width="1600" height="900" fetchpriority="high" decoding="async">
  <figcaption>Concept illustration with illustrative data: AI assistants grouped as their own channel in a GA4 traffic acquisition report.</figcaption>
</figure>

> **Key takeaways**
>
> - Since 13 May 2026, GA4's default channel group includes an AI Assistant channel.
> - Google AI Overviews and AI Mode are counted as Organic Search, not as AI Assistant.
> - Add a custom channel group with a tested regex to catch AI sources the native channel misses.
> - Some AI clicks still arrive as Direct; judge the channel by orders and revenue, not sessions alone.

<div class="blog-brand-strip" aria-label="Platforms covered in this guide">
  <p>Platforms in this guide</p>
  <span><img src="/platforms/google.svg" alt="" width="18" height="18" loading="lazy">Google Analytics 4</span>
  <span><img src="/platforms/openai.svg" alt="" width="18" height="18" loading="lazy">ChatGPT</span>
  <span><img src="/platforms/claude.svg" alt="" width="18" height="18" loading="lazy">Claude</span>
  <span><img src="/platforms/deepseek.svg" alt="" width="18" height="18" loading="lazy">DeepSeek</span>
  <span>Perplexity</span>
  <span><img src="/platforms/shopify.svg" alt="" width="18" height="18" loading="lazy">Shopify</span>
</div>

## In this guide

- [Why AI traffic matters](#why-should-you-track-ai-traffic-separately)
- [The native AI Assistant channel](#does-ga4-track-chatgpt-traffic-automatically)
- [Building a custom channel group](#how-do-you-build-an-ai-channel-group-in-ga4)
- [A regex that works](#which-regex-should-you-use-for-ai-sources)
- [AI Overviews and AI Mode](#where-do-google-ai-overviews-and-ai-mode-clicks-go)
- [Traffic hiding in Direct](#why-does-some-ai-traffic-show-up-as-direct)
- [Checking in Shopify](#how-do-you-see-ai-traffic-in-shopify)
- [Connecting AI traffic to revenue](#how-do-you-prove-ai-traffic-drives-revenue)
- [Frequently asked questions](#frequently-asked-questions)

## Why should you track AI traffic separately?

AI traffic is small but growing fast, and it behaves differently from search or social visits. Shopify reported that AI referral sessions to its stores grew more than 8 times year on year in Q1 2026 and AI-referred orders grew nearly 13 times. Mixing those visits into Referral hides a channel that may deserve its own budget and content plan.

Shopify's [AI search insights](https://www.shopify.com/enterprise/blog/ai-search-insights), published 11 May 2026, also found that 55% of AI sessions start on a product page, and that those sessions convert nearly 50% higher than organic search at a 14% higher average order value. Adobe data reported by [Digital Commerce 360](https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/) showed AI referrals to US retail sites up 62% year on year in July 2026, converting 60% better than non-AI traffic.

Similarweb's [AI referral traffic analysis](https://aisearch.similarweb.com/blog/ai-referral-traffic-by-industry/) estimates AI platforms sent an average of 770.7 million visits a month worldwide between June 2025 and May 2026, up 117.4% year on year, with ChatGPT responsible for more than 80% of AI referrals to the top 1,000 domains.

Not every study agrees on quality. An academic study of 973 ecommerce sites, [reported by Digital Commerce 360](https://www.digitalcommerce360.com/2025/10/24/study-chatgpt-traffic-sales-trail-traditional-digital-channels/), found ChatGPT traffic underperformed every traditional channel except paid social on conversion rate and revenue per session. That disagreement is the best reason to measure your own store.

<!-- [UNIQUE INSIGHT] -->
<aside class="blog-callout">
  <strong>Why the studies disagree:</strong> AI traffic is not one channel. A shopper who asked ChatGPT for "the best linen shirt under $60" and clicked a product link behaves nothing like a reader who clicked a citation in a research answer. Split AI traffic by landing page type before comparing it with search.
</aside>

## Does GA4 track ChatGPT traffic automatically?

Partly. GA4's [What's new page](https://support.google.com/analytics/answer/9164320) records a 13 May 2026 update adding a dedicated way to measure traffic from popular AI assistants. The [default channel group](https://support.google.com/analytics/answer/9756891) now defines AI Assistant as traffic from sources like ChatGPT, Gemini, DeepSeek, Copilot or Grok, excluding Google's AI Overviews and AI Mode.

The condition behind the channel is simple. Google says the medium is set to `ai-assistant` and the campaign to `(ai-assistant)` when the referrer matches its list of AI assistants. The channel then matches traffic where the medium exactly equals `ai-assistant`.

Three gaps remain:

- **The referrer list is not published.** The launch note names ChatGPT, Gemini and Claude, while the definitions page names ChatGPT, Gemini, DeepSeek, Copilot and Grok. Perplexity is named on neither, and [Search Engine Journal](https://www.searchenginejournal.com/google-analytics-adds-ai-assistant-as-default-channel-group/574974/) reported Perplexity visits landing in Referral.
- **History is unclear.** Google does not say whether the native channel reclassifies traffic from before May 2026.
- **UTM-tagged links bypass it.** A link that already carries its own `utm_medium` is classified by that medium, not by the referrer.

Open **Reports > Acquisition > Traffic acquisition**, switch the dimension to Session default channel group and look for AI Assistant. Then switch to Session source and search for AI domains that still appear under Referral. Anything you find there is the case for a custom channel group.

## How do you build an AI channel group in GA4?

Create a custom channel group by copying the default group, adding an "AI assistants" channel and placing it above Referral. Google's [custom channel groups documentation](https://support.google.com/analytics/answer/13051316) says custom groups apply to reports retroactively, and traffic is assigned to the first channel whose definition it matches, so order decides the result.

<figure class="blog-feature-image blog-feature-image--inline">
  <img src="/Blogs/track-ai-traffic-ga4/ai-traffic-ga4-setup.png" alt="Five GA4 setup steps: check the native AI Assistant channel, create a channel group, add an AI assistants channel, reorder above Referral and report, with an example regex" width="1600" height="900" loading="lazy" decoding="async">
  <figcaption>GA4 setup in five steps, with an example regex. GA4 regex is full-match and case-sensitive, so test it before use.</figcaption>
</figure>

1. **Check the native channel.** Confirm what AI Assistant already captures, as described above.
2. **Create the group.** In **Admin**, under **Data display**, click **Channel groups**, then copy the default channel group so every other channel keeps its standard rules.
3. **Add the channel.** Name it "AI assistants". Set two conditions joined by OR: Medium exactly matches `ai-assistant`, or Session source matches the regex in the next section.
4. **Reorder.** Use **Reorder** to move "AI assistants" above Referral. Google's own example gives the same instruction.
5. **Report.** In Traffic acquisition or an exploration, switch to your new channel group and add landing page, key events and revenue.

Standard GA4 properties allow 2 custom channel groups in addition to the default, and 360 properties allow 5, with up to 50 channels per group. Google notes that custom channel groups cannot be used in the Key events paths report.

## Which regex should you use for AI sources?

Use a full-match pattern that wraps the AI domains in `.*` on both sides. Google's [regex documentation](https://support.google.com/analytics/answer/1034324) says GA4 uses RE2 syntax, matches the full value by default and is case-sensitive. A pattern without `.*` only matches sources that equal a domain exactly.

```
.*(chatgpt\.com|chat\.openai\.com|perplexity|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|deepseek|meta\.ai|grok\.com).*
```

How the pattern behaves:

| Session source | Matches? | Why |
|---|---|---|
| `chatgpt.com` | Yes | Domain in the list |
| `perplexity.ai` or `perplexity` | Yes | "perplexity" appears anywhere in the source |
| `gemini.google.com` | Yes | Full host listed; plain `google` does not match |
| `ChatGPT` (capitalised UTM) | No | Regex is case-sensitive; add a lowercase rule or fix the UTM |
| `blog.openai.com` | No | Only chat.openai.com is listed |

Avoid copying very broad patterns. Google's own example in its help page includes fragments such as `^.*ai` and `.*gpt.*`, which can match unrelated sources ending in "ai" or containing "gpt". Test any pattern in **Explore** with a Session source filter before saving it to a channel group, and add new assistants as they appear in your referral list.

ChatGPT also adds tracking to some outbound links. [Search Engine Roundtable](https://www.seroundtable.com/openai-chatgpt-analytics-update-39590.html) reported in June 2025 that ChatGPT began appending `utm_source=chatgpt.com` to certain links, which is why `chatgpt.com` can appear as a source even without a referrer.

## Where do Google AI Overviews and AI Mode clicks go?

They go to Organic Search. Google's channel definitions say Organic Search includes non-ad links in Google's AI Overviews and AI Mode, and the AI Assistant channel explicitly excludes both. Your AI channel group will not show these clicks, and it should not try to.

Google Search Central's [AI features documentation](https://developers.google.com/search/docs/appearance/ai-features) says sites appearing in AI features such as AI Overviews and AI Mode are included in overall search traffic in Search Console, under the Web search type of the Performance report. There is no separate AI Overviews filter.

For a Shopify store, that means two different AI reports: GA4's AI channel for assistants like ChatGPT and Claude, and Search Console for Google's own AI features. Our [Shopify SEO for AI search guide](/blog/shopify-seo-ai-search-guide) covers how to earn visibility in both, and the [Google UCP checkout guide](/blog/google-ucp-checkout-shopify) explains what changes when shoppers can buy inside AI Mode.

## Why does some AI traffic show up as Direct?

GA4 can only assign a source when the browser sends a referrer or the link carries UTM parameters. Clicks from mobile apps, copied links and links marked `noreferrer` arrive with neither, so GA4 records them as Direct. Seer Interactive's [analysis of AI traffic](https://www.seerinteractive.com/insights/are-ai-sites-like-chatgpt-sending-your-website-traffic) warns that ChatGPT visits without UTMs or referral data will likely appear as Direct.

The technical reason is documented by [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noreferrer): a `rel="noreferrer"` link tells the browser to omit the Referer header entirely. Search Engine Journal noted that the new native channel cannot recover those visits either.

You cannot fix hidden AI traffic, but you can estimate it:

- Watch for Direct sessions landing deep on product pages, which people rarely type by hand.
- Compare Direct trends with the AI channel; if both rise together, some AI traffic is hiding.
- Add a "How did you hear about us?" question after checkout with ChatGPT and other assistants as options.

<!-- [UNIQUE INSIGHT] -->
> **Treat your AI channel as a floor, not a total.** The number in GA4 is the AI traffic you can prove. The real figure is higher, and a post-purchase survey is often the only way to size the gap.

## How do you see AI traffic in Shopify?

Use the Sessions by referrer report. Shopify's [acquisition reports documentation](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/acquisition-reports) says it shows whether visitors come directly, from search or by referral, with dimensions for referring channel, platform and medium. Shopify's AI search insights explain how to filter AI answer engines under Referrer channel.

According to Shopify, filter **Referrer channel** for ChatGPT, Perplexity and Copilot. For Gemini, filter **Referrer host** for `gemini.google.com`. Orders placed through Shopify's [agentic storefronts](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts), which cover ChatGPT, Google AI Mode, Gemini, Microsoft Copilot and Meta, show channel or referrer attribution in the Shopify admin.

Expect GA4 and Shopify to disagree. They use different session definitions, consent handling and attribution windows. Pick one as the source of truth for AI revenue, usually Shopify for orders and GA4 for behaviour, and compare trends rather than exact totals. Our [agentic commerce guide](/blog/agentic-commerce-shopify-guide) explains how AI channels reach the Shopify checkout in the first place.

## How do you prove AI traffic drives revenue?

Report AI traffic by revenue, orders and contribution per session, split by landing page type. Sessions alone tell you the channel exists. Revenue per session and margin tell you whether to invest in it, and the landing page split shows whether shoppers arrive ready to buy or still researching.

Build one monthly view with these columns:

| Metric | Where to get it | What it tells you |
|---|---|---|
| AI sessions by assistant | GA4 custom channel group, Session source | Which assistants send visitors |
| Landing page type | GA4 exploration | Product page vs blog or collection entry |
| Conversion rate and revenue per session | GA4 or Shopify | Buying intent compared with other channels |
| Orders with AI referrer | Shopify Sessions by referrer, agentic storefront orders | Revenue you can attribute |
| Contribution per order | Your margin model | Whether AI orders are profitable |

Run the contribution figures through the [unit economics calculator](/tools/unit-economics) so AI orders are judged on profit after product, shipping and payment costs. The [POAS vs ROAS guide](/blog/poas-vs-roas) explains why that matters more than revenue once ChatGPT Ads and other paid AI placements enter the mix.

If AI traffic lands mostly on product pages and converts well, invest in product data: our [AI product feed optimization guide](/blog/ai-product-feed-optimization) is the next step. If it lands mostly on guides, invest in answer-first content.

<section class="blog-cta">
  <h2>See what AI assistants really send you</h2>
  <p>mlabs Growth sets up AI channel tracking in GA4 and Shopify, connects it to orders and margin, then shows which products and pages AI assistants are already recommending.</p>
  <p><a href="/services/ai-automation">Explore AI growth and automation</a> or <a href="https://calendly.com/kalathiyamehul13899/30min">book a 30-minute call</a>.</p>
</section>

## Frequently asked questions

### Does GA4 track ChatGPT traffic automatically?

Partly. Since 13 May 2026, GA4's default channel group includes an AI Assistant channel for traffic from sources such as ChatGPT, Gemini, DeepSeek, Copilot and Grok. Google has not published the full list of recognised referrers, so check your Session source report and add a custom channel group for anything the native channel misses.

### Are Google AI Overviews and AI Mode clicks counted as AI traffic?

No. Google's default channel definitions say the AI Assistant channel excludes AI Overviews and AI Mode. Those clicks are counted as Organic Search in GA4, and Search Console includes them in the Web search type of the Performance report without a separate filter.

### What regex should I use for AI traffic in GA4?

Use a condition where Session source matches a pattern such as `.*(chatgpt\.com|chat\.openai\.com|perplexity|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|deepseek|meta\.ai|grok\.com).*` and add Medium exactly matches `ai-assistant`. GA4 regex is full-match and case-sensitive, so test the pattern in an exploration first.

### Why does some ChatGPT traffic show up as Direct?

A visit only gets a source when the browser passes a referrer or the link carries UTM parameters. Clicks from mobile apps and links that strip the referrer arrive without either, so GA4 records them as Direct. The new AI Assistant channel cannot recover those visits.

### How do I see AI traffic in Shopify analytics?

Open the Sessions by referrer report and filter Referrer channel for AI answer engines such as ChatGPT, Perplexity and Copilot, according to Shopify. For Gemini, filter Referrer host for gemini.google.com. Orders from Shopify's agentic storefronts show channel or referrer attribution in the admin.

## The bottom line

AI assistants are now a measurable channel, but only if you set GA4 up to see them. Start with the native AI Assistant channel, add a custom channel group with a tested regex for the sources it misses, and remember that Google's own AI features stay inside Organic Search.

Then cross-check in Shopify, accept that some AI traffic hides in Direct, and judge the channel by orders and contribution per session. That is what turns "ChatGPT is sending us traffic" into a budget decision.

## Source notes

- [Google Analytics Help, *[GA4] Default channel group*](https://support.google.com/analytics/answer/9756891), retrieved 2026-09-24.
- [Google Analytics Help, *[GA4] Custom channel groups*](https://support.google.com/analytics/answer/13051316), retrieved 2026-09-24.
- [Google Analytics Help, *What's new in Google Analytics*](https://support.google.com/analytics/answer/9164320), entry dated 2026-05-13, retrieved 2026-09-24.
- [Google Analytics Help, *About regular expressions (regex)*](https://support.google.com/analytics/answer/1034324), retrieved 2026-09-24.
- [Google Search Central, *AI features and your website*](https://developers.google.com/search/docs/appearance/ai-features), updated 2025-12-10, retrieved 2026-09-24.
- [Search Engine Journal, *Google Analytics Adds AI Assistant As Default Channel Group*](https://www.searchenginejournal.com/google-analytics-adds-ai-assistant-as-default-channel-group/574974/), published 2026-05-14, retrieved 2026-09-24.
- [Search Engine Roundtable, *ChatGPT adds UTM parameters to links*](https://www.seroundtable.com/openai-chatgpt-analytics-update-39590.html), published 2025-06-16, retrieved 2026-09-24.
- [Seer Interactive, *Your AI Traffic Is Hiding*](https://www.seerinteractive.com/insights/are-ai-sites-like-chatgpt-sending-your-website-traffic), updated 2026-06-22, retrieved 2026-09-24.
- [MDN Web Docs, *rel=noreferrer*](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noreferrer), retrieved 2026-09-24.
- [Shopify Help Center, *Acquisition reports*](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/acquisition-reports), retrieved 2026-09-24.
- [Shopify Help Center, *Agentic storefronts*](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts), retrieved 2026-09-24.
- [Shopify, *AI search insights*](https://www.shopify.com/enterprise/blog/ai-search-insights), published 2026-05-11, retrieved 2026-09-24.
- [Digital Commerce 360, *Adobe AI referral traffic data, July 2026*](https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/), published 2026-08-19, retrieved 2026-09-24.
- [Similarweb, *AI Referral Traffic by Industry*](https://aisearch.similarweb.com/blog/ai-referral-traffic-by-industry/), published 2026-09-03, retrieved 2026-09-24.
- [Digital Commerce 360, *Study: ChatGPT traffic and sales trail traditional digital channels*](https://www.digitalcommerce360.com/2025/10/24/study-chatgpt-traffic-sales-trail-traditional-digital-channels/), published 2025-10-24, retrieved 2026-09-24.
