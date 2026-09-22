/** Explanations match the current calculator implementation. */
export const toolDefinitions = {
  "rto-simulator": {
    "question": "What does return-to-origin cost your store?",
    "terms": [
      [
        "COD share",
        "The percentage of placed orders paid by cash on delivery. Enter a percentage, not the number of COD orders."
      ],
      [
        "RTO rate",
        "Returned orders as a percentage of the relevant COD or prepaid orders. Use a consistent reporting period and allow delivery outcomes to settle."
      ],
      [
        "Direct RTO cost",
        "Forward freight, reverse freight and packaging for returned orders. Sales value at risk is displayed separately and is not net profit."
      ]
    ],
    "related": [
      "unit-economics",
      "inventory-planner"
    ]
  },
  "unit-economics": {
    "question": "What does each ecommerce order contribute after costs?",
    "terms": [
      [
        "COGS",
        "The product cost attached to an order, entered separately from shipping, packaging, fees and advertising."
      ],
      [
        "Contribution per order",
        "Discounted selling price minus the modelled variable costs and advertising cost per order. Fixed overhead is not included."
      ],
      [
        "Acquisition cost assumption",
        "This model divides ad spend by total orders in the period. It is a blended cost per order, not a measured cost per new customer."
      ]
    ],
    "related": [
      "rto-simulator",
      "marketing-budget"
    ]
  },
  "bundle-planner": {
    "question": "How does a bundle discount change price and margin?",
    "terms": [
      [
        "Bundle list value",
        "The sum of the individual prices of the products added to the bundle. Products can have different prices."
      ],
      [
        "Bundle margin",
        "Discounted bundle price minus the sum of product costs. Fulfilment, fees and advertising must still be considered separately."
      ],
      [
        "Adoption and conversion uplift",
        "Scenario inputs for how many orders use the bundle and how order count changes. They are assumptions, not predicted behaviour."
      ]
    ],
    "related": [
      "unit-economics",
      "marketing-budget"
    ]
  },
  "marketing-budget": {
    "question": "What could your marketing budget deliver at your target ROAS?",
    "terms": [
      [
        "Channel allocation",
        "The share of your total budget assigned to each channel. Use 100% total allocation for a complete plan."
      ],
      [
        "ROAS",
        "Attributed revenue divided by advertising spend. Enter 3 for a 3\u00d7 target, not 300. A return on ad spend is not a profit margin."
      ],
      [
        "Projected cost per order",
        "Allocated spend divided by projected orders. Actual performance depends on traffic, offer, conversion and attribution."
      ]
    ],
    "related": [
      "unit-economics",
      "runway-planner"
    ]
  },
  "runway-planner": {
    "question": "How long could your cash last under this growth scenario?",
    "terms": [
      [
        "Monthly burn",
        "The first month\u2019s cash deficit when modelled costs exceed revenue. Burn can change across the projection."
      ],
      [
        "Cash runway",
        "The first projected month whose closing cash balance reaches zero or below. \u201c24+ months\u201d means the balance lasts through this projection, not indefinitely."
      ],
      [
        "Break-even month",
        "The first projected month when revenue covers modelled fixed, variable and marketing costs. It does not necessarily recover earlier cash losses."
      ]
    ],
    "related": [
      "marketing-budget",
      "inventory-planner"
    ]
  },
  "inventory-planner": {
    "question": "When should you reorder each SKU?",
    "terms": [
      [
        "Reorder point",
        "Average daily sales multiplied by the sum of supplier lead time and safety days. This is a trigger stock level, not the quantity to purchase."
      ],
      [
        "Safety stock",
        "A buffer expressed as days in the input. Multiply those days by average daily sales to get buffer units."
      ],
      [
        "Days to stockout",
        "Current stock divided by daily sales at the assumed constant rate. Incoming purchase orders and seasonal demand are not included."
      ]
    ],
    "related": [
      "rto-simulator",
      "runway-planner"
    ]
  },
  "ecommerce-platform-profit": {
    "question": "Is this marketplace selling price actually profitable?",
    "terms": [
      ["Successful order rate", "The share of placed orders left after the entered return and RTO rates. Revenue, product cost and refundable commission are weighted by this rate."],
      ["Recoverable deductions", "TDS, TCS and GST on commission reduce the expected payout shown here, but are not treated as an expense in the profit estimate."],
      ["Target selling price", "The estimated gross price needed to reach the selected profit margin under the same return, commission, ROAS and cost assumptions."]
    ],
    "related": ["website-d2c-profit", "unit-economics"]
  },
  "website-d2c-profit": {
    "question": "Is this direct website order profitable after all variable costs?",
    "terms": [
      ["Gateway fee refund", "Turn this on only when your payment provider refunds its fee for returned and RTO orders. Otherwise the fee is charged on the full placed-order value."],
      ["Expected logistics", "Forward delivery is charged once per placed order, with return and RTO reverse costs weighted by their respective rates."],
      ["Break-even ROAS", "The minimum return on ad spend at which modeled profit reaches zero while the other inputs stay unchanged."]
    ],
    "related": ["ecommerce-platform-profit", "unit-economics"]
  }
} as const;
