export const serviceSearchContent = {
  "store-conversion": {
    "heading": "Shopify conversion optimization: what we review",
    "body": "Conversion rate optimization (CRO) looks at what happens between a store visit and a completed order. We start with the landing page, product information, mobile buying journey and cart. The first change should answer a real buying question or remove a measurable point of friction.",
    "faqs": [
      [
        "Do I need a new Shopify theme?",
        "Not necessarily. We first review whether the problem comes from the offer, content, navigation, product discovery or cart. A focused change may be more useful than a full redesign."
      ],
      [
        "How will we measure a store improvement?",
        "Agree the page, audience and measurement window before implementation. Compare the relevant step, such as add-to-cart or checkout completion, alongside order value and contribution margin. Changes in traffic or promotions can affect the comparison."
      ],
      [
        "Can you guarantee a higher conversion rate?",
        "No. The offer, traffic quality, pricing and product demand all affect conversion. We scope changes and a measurement plan so your team can decide what to keep using actual results."
      ]
    ],
    "tools": [
      "unit-economics",
      "bundle-planner"
    ]
  },
  "order-operations": {
    "heading": "COD confirmation and failed-delivery workflows",
    "body": "Cash-on-delivery (COD) orders need clear confirmation and exception handling. Return-to-origin (RTO) is a shipment that returns to the seller after an unsuccessful delivery. A non-delivery report (NDR) flags a failed attempt that may still be recoverable. These are different stages: an approved workflow should route each one to the right next action.",
    "faqs": [
      [
        "What does a COD confirmation workflow do?",
        "It checks the order details and purchase intent through an agreed communication flow, records the outcome and sends uncertain cases to a person. It should distinguish confirmed, unreachable, changed and cancelled orders before the next operational step."
      ],
      [
        "Can an AI calling agent eliminate RTO?",
        "No. Confirmation can address some intent and address problems, but delivery timing, courier performance and customer circumstances also affect RTO. We agree the language, calling flow and human handoff before implementing a supported connection."
      ],
      [
        "Which order and courier tools can you connect?",
        "We review your tools, permissions, available APIs and sample order states before promising an integration. The scope lists supported systems, recurring costs, exception handling and who owns routine checks."
      ]
    ],
    "tools": [
      "rto-simulator",
      "inventory-planner"
    ]
  },
  "ai-automation": {
    "heading": "AI workflows built around approved brand knowledge",
    "body": "A useful marketing workflow starts with trusted source material: positioning, product facts, customer questions and previous campaign learning. We organise that context, define a repeatable task and keep a reviewer responsible for the output. Your team should know which inputs were used and what still needs approval.",
    "faqs": [
      [
        "What is a brand AI workspace or Claude Brain?",
        "It is a structured collection of approved brand context and task instructions used to support repeatable AI work. Claude Brain is our shorthand for that workspace, not a separate AI model or a claim of partnership with its provider."
      ],
      [
        "What should we automate first?",
        "Start with a frequent task whose inputs and useful output are clear, such as preparing a content brief from approved material. Agree an example of a good result and an owner who can review it before adding more workflows."
      ],
      [
        "How is this different from Skill Manager?",
        "This service scopes and implements a workflow for your team. Skill Manager is a separate product in development for organising skills and recurring tasks. Service work does not depend on buying an unreleased product."
      ]
    ],
    "tools": [
      "marketing-budget",
      "runway-planner"
    ]
  }
} as const;

export const toolSearchContent = {
  "rto-simulator": {
    "steps": "Enter monthly orders, average order value, COD share and separate COD and prepaid RTO rates. Add forward freight, reverse freight and packaging per returned order. Change the target COD RTO rate to compare scenarios.",
    "example": "For 1,000 orders, 60% COD and a 20% COD RTO rate, 120 COD orders return. If the 400 prepaid orders have a 5% RTO rate, another 20 return. At \u20b980 forward freight, \u20b980 reverse freight and \u20b920 packaging, 140 returns cost \u20b925,200 in direct logistics and packaging.",
    "limit": "Revenue at risk is separate from direct cost. A lower target RTO rate is an assumption, not a forecast. The estimate excludes damaged stock, support time and inventory delays.",
    "service": "order-operations"
  },
  "unit-economics": {
    "steps": "Use selling price after the listed discount, product and fulfilment costs, fee and tax assumptions, expected RTO rate, ad spend and order volume from the same period. Compare contribution before and after acquisition cost.",
    "example": "If an order brings in \u20b91,000 and product, fulfilment, fee, tax and expected RTO costs total \u20b9650, contribution before ads is \u20b9350. With \u20b9200 acquisition cost per order, \u20b9150 remains to cover overhead and profit.",
    "limit": "Contribution is not net profit. This model uses a simplified tax percentage and ad spend per order, which differs from new-customer CAC. Reconcile assumptions with actual settlement reports; fixed overheads are not included in per-order contribution.",
    "service": "store-conversion"
  },
  "bundle-planner": {
    "steps": "Add the products and their prices and costs, then set a discount. Enter current order volume, assumed bundle adoption and a conversion-change scenario to compare projected order value and revenue.",
    "example": "Products priced at \u20b9600 and \u20b9400 have a combined list price of \u20b91,000. A 10% discount makes the bundle \u20b9900. If product costs total \u20b9450, the bundle has \u20b9450 left before shipping, fees, acquisition and other costs.",
    "limit": "The current AOV baseline is the average listed product price, not a connected store metric. Adoption and conversion uplift are inputs. A discounted bundle can raise order value while reducing contribution, so check both.",
    "service": "store-conversion"
  },
  "marketing-budget": {
    "steps": "Enter the total budget and average order value. Allocate percentages to channels, check that the split totals 100%, and enter an assumed ROAS for each. Compare projected revenue, orders and acquisition cost.",
    "example": "A \u20b950,000 allocation at an assumed 3\u00d7 ROAS gives \u20b9150,000 projected revenue. At \u20b91,000 AOV, that is 150 projected orders and roughly \u20b9333 spend per order.",
    "limit": "ROAS is revenue divided by spend, not profit. Channel attribution may overlap, and performance may change as spend increases. These are planning scenarios, not platform forecasts.",
    "service": "ai-automation"
  },
  "runway-planner": {
    "steps": "Enter starting cash, monthly revenue, growth, fixed expenses, variable cost ratio and marketing spend. Review the month-by-month balance rather than relying only on the first month of burn.",
    "example": "With \u20b9600,000 cash and a constant \u20b9100,000 monthly cash deficit, the simple runway is six months. If revenue or costs change, use the monthly projection to see when the balance becomes negative.",
    "limit": "The model does not automatically include inventory payment timing, settlement delays, debt, tax payments or fundraising. Use a detailed cash-flow forecast for commitments; a projected break-even month is not assured.",
    "service": "ai-automation"
  },
  "inventory-planner": {
    "steps": "For each SKU, enter stock, daily sales, supplier lead time, safety days and unit cost. Review the reorder point and estimated stockout date, then compare them with incoming purchase orders.",
    "example": "At 10 units sold per day, a 14-day lead time and 7 safety days, the reorder point is 210 units. The safety-stock allowance is 70 units. Review replenishment when available stock approaches that level.",
    "limit": "Sales velocity is assumed constant. Seasonality, supplier delays, incoming orders, minimum order quantities and batch sizes need a separate review. This tool does not sync with your inventory system.",
    "service": "order-operations"
  },
  "ecommerce-platform-profit": {
    "steps": "Enter the gross marketplace price, tax and recovery rates, product cost, ROAS, return and RTO assumptions. Add platform commission and logistics, then compare expected profit, target price and break-even ROAS.",
    "example": "At ₹1,699 with 10% returns, 5% RTO, 35% refundable commission and 2.3× ROAS, the successful-order rate is 85%. With ₹500 COGS and the logistics shown in the calculator, the model estimates a loss and a much higher target price.",
    "limit": "Marketplace fee rules, tax bases and refund policies vary. This model treats TDS, TCS and GST on commission as recoverable, excludes fixed overhead and assumes entered rates remain constant as price changes.",
    "service": "store-conversion"
  },
  "website-d2c-profit": {
    "steps": "Enter the gross website price, GST, product cost, ROAS, returns and RTO. Add gateway and delivery costs, then compare expected profit with the break-even and target-margin recommendations.",
    "example": "At ₹1,699 with 10% returns, 5% RTO, a 2% non-refunded gateway fee, ₹80 delivery costs and 2.3× ROAS, the sample inputs produce about ₹112 expected profit and an 8% margin.",
    "limit": "Gateway refund rules and tax treatment vary. The estimate excludes fixed overhead, discounts not reflected in selling price, warehousing, support and settlement timing. Validate it against actual orders.",
    "service": "store-conversion"
  }
} as const;
