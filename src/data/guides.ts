/** Original educational examples; not case studies or measured results. */
export const guides = [
  {
    "slug": "shopify-conversion-audit-checklist",
    "title": "Shopify Conversion Audit Checklist",
    "description": "A practical Shopify CRO checklist for reviewing landing pages, product information, mobile carts and measurement before choosing an implementation.",
    "intro": "Start with one buying journey, not a store-wide redesign. This checklist helps a D2C team identify what a shopper needs to understand, where the journey breaks and which change deserves a measured test.",
    "service": "store-conversion",
    "tool": "unit-economics",
    "sections": [
      {
        "id": "baseline",
        "title": "1. Choose the journey and record a baseline",
        "body": "Pick one source of traffic, one landing page and one main action. Record visits, add-to-cart actions, checkout starts and completed orders for a consistent period. Note promotions, out-of-stock products and tracking changes so an apparent improvement is not mistaken for a change in audience.",
        "items": [
          "Use the same reporting definitions before and after the change.",
          "Split mobile and desktop journeys where the data supports it.",
          "Write the buying question you believe the page leaves unanswered."
        ]
      },
      {
        "id": "product",
        "title": "2. Review the landing page as a first-time buyer",
        "body": "Read the page without relying on what you already know about the brand. Can a visitor explain what the product is, who it is for and what makes the offer useful? Product facts should answer real questions about size, fit, materials, contents or use, depending on the category.",
        "items": [
          "Check that the product and offer match the message that brought the visitor.",
          "Show accurate images and approved product details.",
          "Make delivery, returns and the total price easy to find.",
          "Keep the primary purchase action clear beside the product decision."
        ]
      },
      {
        "id": "mobile",
        "title": "3. Follow the mobile cart and checkout path",
        "body": "Use a real phone or a narrow viewport. Choose a variant, add the product, change quantity and move towards checkout. Review sticky elements, error messages and the space needed to tap controls. Check that a relevant cross-sell helps the purchase rather than blocking it.",
        "items": [
          "Check unavailable variants and empty-cart recovery.",
          "Make shipping costs and discount behaviour understandable.",
          "Confirm payment choices and checkout changes supported by your setup before promising customisation."
        ]
      },
      {
        "id": "test",
        "title": "4. Define one change and a decision rule",
        "body": "Write a short test brief: the problem, evidence, proposed change, primary metric and checks that must not get worse. For example, a bundle can raise order value while reducing margin. If traffic is too low for a useful controlled comparison, treat observations as directional and keep the change reversible.",
        "items": [
          "Change a focused part of the journey that you can explain.",
          "Review conversion alongside order value, refunds and contribution.",
          "Keep a dated record of traffic mix and other changes.",
          "Use the outcome to decide whether to keep, revise or remove the change."
        ]
      }
    ],
    "sources": [
      {
        "label": "Shopify: conversion optimization checklist",
        "url": "https://www.shopify.com/blog/cro-checklist"
      },
      {
        "label": "Shopify: ecommerce checkout optimization",
        "url": "https://www.shopify.com/blog/checkout-process-optimization"
      }
    ]
  },
  {
    "slug": "calculate-cod-rto-cost",
    "title": "How to Calculate COD RTO Costs",
    "description": "Separate return-to-origin logistics costs from revenue at risk. Use a worked COD and prepaid example, then identify the order workflow to investigate.",
    "intro": "A returned shipment creates more than one number. Separate the cost already incurred from the sale that did not complete, then decide which operational step to investigate. This guide uses an illustrative scenario, not MLabs client results.",
    "service": "order-operations",
    "tool": "rto-simulator",
    "sections": [
      {
        "id": "define",
        "title": "1. Define the order group before calculating a rate",
        "body": "Use one cohort of dispatched orders and allow enough time for delivery outcomes to settle. Separate cash-on-delivery orders from prepaid orders. Dividing this week\u2019s returns by this week\u2019s new orders can mix shipments from different periods.",
        "items": [
          "Keep placed, confirmed, dispatched, delivered and returned counts separate.",
          "Use the same denominator and observation window in comparisons.",
          "Record unresolved shipments separately instead of treating them as delivered."
        ]
      },
      {
        "id": "cost",
        "title": "2. Separate direct cost from revenue at risk",
        "body": "For the calculator\u2019s simplified direct-cost estimate, multiply returned orders by forward freight, reverse freight and packaging per return. Calculate revenue at risk separately as returned orders multiplied by average order value. Lost sales value is not the same as lost profit.",
        "items": [
          "Use your actual courier settlement costs where available.",
          "Review damaged stock, handling effort and payment fees separately.",
          "Avoid counting recoverable product cost as a complete loss if the item can be sold again."
        ]
      },
      {
        "id": "example",
        "title": "3. Work through a COD and prepaid example",
        "body": "Suppose 1,000 orders include 600 COD orders and 400 prepaid orders. With a 20% COD RTO rate and 5% prepaid RTO rate, the scenario has 120 COD returns and 20 prepaid returns. At \u20b980 forward freight, \u20b980 reverse freight and \u20b920 packaging, direct cost is 140 \u00d7 \u20b9180 = \u20b925,200.",
        "items": [
          "At \u20b91,000 AOV, revenue at risk is \u20b9140,000, shown separately.",
          "If COD RTO falls from 20% to 15%, the scenario avoids 30 returns.",
          "That means \u20b95,400 lower direct cost under these inputs, not a guaranteed saving."
        ]
      },
      {
        "id": "workflow",
        "title": "4. Investigate the cause before choosing automation",
        "body": "Group unsuccessful deliveries by recorded reason. Unreachable customers, incorrect details and delayed follow-ups may need different workflows from courier delays or product dissatisfaction. Give each exception a named owner and record whether the follow-up changed the delivery outcome.",
        "items": [
          "Review the confirmation flow before dispatch.",
          "Keep unsuccessful delivery attempts distinct from completed returns.",
          "Agree when automated calls or messages must hand over to a person.",
          "Compare delivery outcomes and handling effort against the original cohort."
        ]
      }
    ],
    "sources": []
  },
  {
    "slug": "ai-brand-context-workflow",
    "title": "How to Build an AI Brand Context Workflow",
    "description": "Organise approved brand knowledge, create a repeatable marketing brief and define human review before automating recurring AI work for your team.",
    "intro": "The first useful AI workflow is usually a well-defined task with clear inputs and a reviewer. A brand context workspace gives that task approved information to work from, instead of asking someone to explain the business in every conversation.",
    "service": "ai-automation",
    "tool": "marketing-budget",
    "sections": [
      {
        "id": "sources",
        "title": "1. Collect approved sources with an owner",
        "body": "Start with current product facts, positioning, audience questions, offer constraints and examples of approved work. Identify who maintains each source. Keep outdated campaigns clearly separated from current instructions so the system does not recycle an expired offer.",
        "items": [
          "Record the source, owner and review date for each document.",
          "Include claims the brand can support and claims it must not make.",
          "Use the minimum business and customer data needed for the task."
        ]
      },
      {
        "id": "brief",
        "title": "2. Define a repeatable output",
        "body": "Choose a narrow task, such as drafting a product campaign brief. Describe the required sections: audience, customer problem, product facts, angle, evidence and questions for the reviewer. Provide an example of a useful output so quality can be evaluated against something concrete.",
        "items": [
          "Specify which sources the task should use.",
          "Tell the workflow to flag missing information instead of inventing it.",
          "Keep recommendations separate from facts supplied by the business."
        ]
      },
      {
        "id": "review",
        "title": "3. Add an explicit human review step",
        "body": "Before an output is used, a named person checks product accuracy, price, availability, tone and supporting evidence. A draft is not permission to publish. If the workflow connects to other systems, document the allowed actions and the point at which approval is required.",
        "items": [
          "Keep publication and customer communication behind the agreed approval step.",
          "Record rejected drafts and why they failed.",
          "Make access and recurring software costs visible in the handover."
        ]
      },
      {
        "id": "repeat",
        "title": "4. Measure useful repetition before expanding",
        "body": "Run the workflow on representative tasks and compare the result with the team\u2019s current process. Record time spent preparing inputs, reviewing and correcting the output. Faster drafting alone is not success if the reviewer spends longer repairing it.",
        "items": [
          "Track revision effort, accuracy and total turnaround.",
          "Review source material whenever products or offers change.",
          "Add another task only after the first has a reliable owner and review process."
        ]
      }
    ],
    "sources": []
  }
] as const;
