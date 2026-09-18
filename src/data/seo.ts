import { guides } from '@/data/guides';

/** Search intent and public metadata for every indexable route. No keyword-volume claims. */
export type PageSeo = { title: string; description: string; label: string; type: string };
export const pageSeo: Record<string, PageSeo> = {
  "/": {
    "title": "Shopify CRO & AI Automation for D2C Brands",
    "description": "MLabs helps D2C brands improve Shopify conversion, automate COD order operations and build AI marketing workflows. Book a free 30-minute audit.",
    "label": "Home",
    "type": "WebPage"
  },
  "/services/store-conversion": {
    "title": "Shopify Conversion Rate Optimization Services",
    "description": "Improve Shopify product pages, product discovery and cart journeys with MLabs. Start with a free audit, then agree a focused implementation scope.",
    "label": "Shopify conversion",
    "type": "WebPage"
  },
  "/services/order-operations": {
    "title": "COD Confirmation & Order Automation Services",
    "description": "Connect COD confirmation calls, order data and failed-delivery follow-ups. MLabs scopes order automation with human handoffs for D2C teams.",
    "label": "Order operations",
    "type": "WebPage"
  },
  "/services/ai-automation": {
    "title": "AI Marketing Workflow Automation Services",
    "description": "Build a brand knowledge workspace and repeatable AI marketing workflows. MLabs helps teams create briefs, review outputs and keep context current.",
    "label": "AI marketing workflows",
    "type": "WebPage"
  },
  "/offers": {
    "title": "AI & Shopify Services: Pricing and Scope",
    "description": "Compare MLabs Shopify, order operations and AI workflow services. Explore the $5,000 USD pilot, deliverables, custom scope and free audit call.",
    "label": "Pricing & scope",
    "type": "CollectionPage"
  },
  "/about": {
    "title": "About Mehul & MLabs Growth",
    "description": "Meet Mehul, the founder of MLabs Growth. Learn how operating D2C brands shapes our Shopify, order automation and AI marketing workflow services.",
    "label": "About Mehul",
    "type": "AboutPage"
  },
  "/products": {
    "title": "AI Workflow Products & Free D2C Tools",
    "description": "Explore MLabs Skill Manager, currently in development, and six free D2C calculators for order costs, margins, bundles, inventory and cash planning.",
    "label": "Products",
    "type": "CollectionPage"
  },
  "/products/skill-manager": {
    "title": "MLabs Skill Manager: AI Skills & Recurring Tasks",
    "description": "Explore MLabs Skill Manager, in development for organising AI skills, scheduling recurring work and reviewing outputs. Pricing and release are pending.",
    "label": "Skill Manager",
    "type": "WebPage"
  },
  "/tools": {
    "title": "Free Ecommerce & D2C Calculators",
    "description": "Use six free ecommerce calculators for RTO costs, unit economics, bundle pricing, marketing budgets, cash runway and inventory. No signup required.",
    "label": "Free calculators",
    "type": "CollectionPage"
  },
  "/tools/rto-simulator": {
    "title": "Free RTO Cost Calculator for Ecommerce",
    "description": "Calculate return-to-origin costs for COD and prepaid orders. Estimate shipping and packaging losses, then compare a lower COD RTO-rate scenario.",
    "label": "RTO cost calculator",
    "type": "WebPage"
  },
  "/tools/unit-economics": {
    "title": "Free Ecommerce Unit Economics Calculator",
    "description": "Estimate D2C contribution margin per order using product costs, shipping, fees, advertising and RTO assumptions. Check your numbers before scaling.",
    "label": "Unit economics calculator",
    "type": "WebPage"
  },
  "/tools/bundle-planner": {
    "title": "Free Product Bundle Pricing Calculator",
    "description": "Compare bundle discounts, product costs and projected average order value. Model bundle adoption and margin before changing your ecommerce offer.",
    "label": "Bundle pricing calculator",
    "type": "WebPage"
  },
  "/tools/marketing-budget": {
    "title": "Free Ecommerce Marketing Budget Calculator",
    "description": "Plan channel budgets and model ROAS, revenue, orders and acquisition cost. Compare ecommerce marketing scenarios using your own assumptions.",
    "label": "Marketing budget calculator",
    "type": "WebPage"
  },
  "/tools/runway-planner": {
    "title": "Free Cash Runway & Burn Rate Calculator",
    "description": "Model monthly cash flow, burn rate and runway over 24 months. Compare revenue growth, fixed costs and marketing spend for your D2C business.",
    "label": "Cash runway calculator",
    "type": "WebPage"
  },
  "/tools/inventory-planner": {
    "title": "Free Inventory Reorder Point Calculator",
    "description": "Calculate SKU reorder points, safety stock and stockout estimates from daily sales and supplier lead times. Plan inventory using your own inputs.",
    "label": "Inventory calculator",
    "type": "WebPage"
  }
};

for (const guide of guides) {
  pageSeo[`/guides/${guide.slug}`] = { title: guide.title, description: guide.description, label: guide.title, type: 'WebPage' };
}
pageSeo['/guides'] = { title: 'D2C Growth & AI Workflow Guides', description: 'Practical MLabs guides to Shopify conversion audits, COD return-to-origin costs and repeatable AI marketing workflows. Explore checklists and examples.', label: 'Guides', type: 'CollectionPage' };

export function breadcrumbsFor(path: string) {
  if (path === '/' || !pageSeo[path]) return [];
  const parent = path.startsWith('/guides/') ? '/guides' : path.startsWith('/tools/') ? '/tools' : path.startsWith('/products/') ? '/products' : null;
  return [{ path: '/', label: 'Home' }, ...(parent ? [{ path: parent, label: pageSeo[parent].label }] : []), { path, label: pageSeo[path].label }];
}
