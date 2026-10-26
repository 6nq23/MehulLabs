/** Original educational examples; not case studies or measured results. */
export const guides = [
  {
    "slug": "shopify-conversion-audit-checklist",
    "publishedOn": "2026-09-18",
    "updatedOn": "2026-10-19",
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
    "slug": "ai-brand-context-workflow",
    "publishedOn": "2026-09-18",
    "updatedOn": "2026-10-19",
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
