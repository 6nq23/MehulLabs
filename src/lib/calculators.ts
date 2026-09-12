const nonNegative = (value: number) => Math.max(0, Number.isFinite(value) ? value : 0);
const percentage = (value: number) => Math.min(100, nonNegative(value)) / 100;

export interface RtoInputs {
  monthlyOrders: number;
  averageOrderValue: number;
  codPercent: number;
  codRtoRate: number;
  prepaidRtoRate: number;
  forwardShipping: number;
  reverseShipping: number;
  packaging: number;
  targetCodRtoRate: number;
}

export function calculateRto(input: RtoInputs) {
  const orders = nonNegative(input.monthlyOrders);
  const codShare = percentage(input.codPercent);
  const codOrders = orders * codShare;
  const prepaidOrders = orders - codOrders;
  const codRtoOrders = codOrders * percentage(input.codRtoRate);
  const prepaidRtoOrders = prepaidOrders * percentage(input.prepaidRtoRate);
  const totalRtoOrders = codRtoOrders + prepaidRtoOrders;
  const costPerRto = nonNegative(input.forwardShipping) + nonNegative(input.reverseShipping) + nonNegative(input.packaging);
  const improvement = Math.max(0, percentage(input.codRtoRate) - percentage(input.targetCodRtoRate));
  const ordersSaved = codOrders * improvement;

  return {
    prepaidPercent: 100 - Math.min(100, nonNegative(input.codPercent)),
    codOrders,
    prepaidOrders,
    totalRtoOrders,
    revenueLost: totalRtoOrders * nonNegative(input.averageOrderValue),
    totalRtoCost: totalRtoOrders * costPerRto,
    ordersSaved,
    revenueSaved: ordersSaved * nonNegative(input.averageOrderValue),
    rtoCostSaved: ordersSaved * costPerRto,
  };
}

export interface UnitEconomicsInputs {
  sellingPrice: number;
  discountPercent: number;
  cogs: number;
  packaging: number;
  shipping: number;
  gatewayFeePercent: number;
  gstPercent: number;
  rtoRate: number;
  reverseLogistics: number;
  monthlyAdSpend: number;
  monthlyOrders: number;
}

export function calculateUnitEconomics(input: UnitEconomicsInputs) {
  const listedPrice = nonNegative(input.sellingPrice);
  const netSellingPrice = listedPrice * (1 - percentage(input.discountPercent));
  const grossMargin = netSellingPrice - nonNegative(input.cogs);
  const gatewayFee = netSellingPrice * percentage(input.gatewayFeePercent);
  const gst = netSellingPrice * percentage(input.gstPercent);
  const rtoDrag = (nonNegative(input.shipping) + nonNegative(input.reverseLogistics) + nonNegative(input.packaging)) * percentage(input.rtoRate);
  const orders = nonNegative(input.monthlyOrders);
  const cac = orders > 0 ? nonNegative(input.monthlyAdSpend) / orders : 0;
  const contributionBeforeAds = grossMargin - nonNegative(input.packaging) - nonNegative(input.shipping) - gatewayFee - gst - rtoDrag;
  const contributionMargin = contributionBeforeAds - cac;
  const totalCostPerOrder = netSellingPrice - contributionMargin;

  return {
    netSellingPrice,
    grossMargin,
    grossMarginPercent: netSellingPrice > 0 ? (grossMargin / netSellingPrice) * 100 : 0,
    gatewayFee,
    gst,
    rtoDrag,
    cac,
    contributionBeforeAds,
    contributionMargin,
    contributionMarginPercent: netSellingPrice > 0 ? (contributionMargin / netSellingPrice) * 100 : 0,
    breakEvenOrders: contributionBeforeAds > 0 ? Math.ceil(nonNegative(input.monthlyAdSpend) / contributionBeforeAds) : null,
    totalCostPerOrder,
    monthlyRevenue: netSellingPrice * orders,
    monthlyTotalCost: totalCostPerOrder * orders,
    monthlyProfit: contributionMargin * orders,
  };
}

export interface BundleProduct { id: number; name: string; price: number; cogs: number }

export function calculateBundle(products: readonly BundleProduct[], discountPercent: number, conversionUpliftPercent: number, currentMonthlyOrders: number, bundleAdoptionPercent: number) {
  const safeProducts = products.length > 0 ? products : [{ id: 0, name: '', price: 0, cogs: 0 }];
  const listValue = safeProducts.reduce((sum, product) => sum + nonNegative(product.price), 0);
  const totalCogs = safeProducts.reduce((sum, product) => sum + nonNegative(product.cogs), 0);
  const bundleSellingPrice = listValue * (1 - percentage(discountPercent));
  const bundleMargin = bundleSellingPrice - totalCogs;
  const currentAov = listValue / safeProducts.length;
  const adoption = percentage(bundleAdoptionPercent);
  const projectedAov = currentAov * (1 - adoption) + bundleSellingPrice * adoption;
  const orders = nonNegative(currentMonthlyOrders);
  const projectedOrders = orders * (1 + percentage(conversionUpliftPercent));
  const currentRevenue = currentAov * orders;
  const projectedRevenue = projectedAov * projectedOrders;

  return {
    listValue,
    discountAmount: listValue - bundleSellingPrice,
    bundleSellingPrice,
    totalCogs,
    bundleMargin,
    bundleMarginPercent: bundleSellingPrice > 0 ? (bundleMargin / bundleSellingPrice) * 100 : 0,
    currentAov,
    projectedAov,
    aovUpliftPercent: currentAov > 0 ? ((projectedAov / currentAov) - 1) * 100 : 0,
    currentOrders: orders,
    projectedOrders,
    currentRevenue,
    projectedRevenue,
    revenueUplift: projectedRevenue - currentRevenue,
    revenueUpliftPercent: currentRevenue > 0 ? ((projectedRevenue / currentRevenue) - 1) * 100 : 0,
  };
}

export interface MarketingChannel { id: string; name: string; allocation: number; roas: number }

export function calculateMarketingBudget(budget: number, averageOrderValue: number, channels: readonly MarketingChannel[] | number) {
  const totalBudget = nonNegative(budget);
  // Keep the previous `(budget, targetRoas, aov)` call safe during hot reloads.
  const legacyCall = typeof channels === 'number';
  const aov = nonNegative(legacyCall ? channels : averageOrderValue);
  const sourceChannels: readonly MarketingChannel[] = legacyCall
    ? [{ id: 'all', name: 'All channels', allocation: 100, roas: nonNegative(averageOrderValue) }]
    : channels;
  const channelMetrics = sourceChannels.map((channel) => {
    const spend = totalBudget * percentage(channel.allocation);
    const revenue = spend * nonNegative(channel.roas);
    const orders = aov > 0 ? revenue / aov : 0;
    return { ...channel, spend, revenue, orders, cpa: orders > 0 ? spend / orders : 0 };
  });
  const totalAllocation = sourceChannels.reduce((sum, channel) => sum + nonNegative(channel.allocation), 0);
  const totalSpend = channelMetrics.reduce((sum, channel) => sum + channel.spend, 0);
  const expectedRevenue = channelMetrics.reduce((sum, channel) => sum + channel.revenue, 0);
  const expectedOrders = channelMetrics.reduce((sum, channel) => sum + channel.orders, 0);
  return {
    totalAllocation,
    totalSpend,
    expectedRevenue,
    expectedOrders,
    blendedRoas: totalSpend > 0 ? expectedRevenue / totalSpend : 0,
    blendedCpa: expectedOrders > 0 ? totalSpend / expectedOrders : 0,
    allowableSpendPerOrder: expectedOrders > 0 ? totalSpend / expectedOrders : 0,
    channels: channelMetrics,
  };
}

export interface RunwayInputs {
  cash: number;
  monthlyRevenue: number;
  monthlyGrowthPercent: number;
  fixedCosts: number;
  variableCostPercent: number;
  marketingSpend: number;
}

export function calculateRunway(input: RunwayInputs, months = 24) {
  let cashBalance = nonNegative(input.cash);
  let revenue = nonNegative(input.monthlyRevenue);
  const projection = Array.from({ length: months }, (_, index) => {
    if (index > 0) revenue *= 1 + percentage(input.monthlyGrowthPercent);
    const costs = nonNegative(input.fixedCosts) + nonNegative(input.marketingSpend) + revenue * percentage(input.variableCostPercent);
    const netFlow = revenue - costs;
    cashBalance += netFlow;
    return { month: index + 1, revenue, costs, netFlow, cashBalance };
  });
  const first = projection[0] ?? { netFlow: 0 };
  const stockoutIndex = projection.findIndex((month) => month.cashBalance <= 0);
  const breakEven = projection.find((month) => month.netFlow >= 0)?.month ?? null;
  return {
    monthlyBurn: Math.max(0, -first.netFlow),
    firstMonthNetFlow: first.netFlow,
    runwayMonths: stockoutIndex >= 0 ? stockoutIndex + 1 : null,
    breakEvenMonth: breakEven,
    projection,
  };
}

export function calculateInventory(dailySales: number, leadTimeDays: number, bufferDays: number) {
  const sales = nonNegative(dailySales);
  const leadTimeStock = sales * nonNegative(leadTimeDays);
  const safetyStock = sales * nonNegative(bufferDays);
  return {
    leadTimeStock,
    safetyStock,
    reorderPoint: leadTimeStock + safetyStock,
    coverageDays: nonNegative(leadTimeDays) + nonNegative(bufferDays),
  };
}

export interface InventorySku {
  id: number;
  name: string;
  currentStock: number;
  dailySales: number;
  leadTimeDays: number;
  safetyDays: number;
  costPerUnit: number;
}

export function calculateInventorySku(sku: InventorySku) {
  const currentStock = nonNegative(sku.currentStock);
  const dailySales = nonNegative(sku.dailySales);
  const reorderPoint = dailySales * (nonNegative(sku.leadTimeDays) + nonNegative(sku.safetyDays));
  const safetyStock = dailySales * nonNegative(sku.safetyDays);
  const daysToStockout = dailySales > 0 ? currentStock / dailySales : null;
  const targetStock = dailySales * (nonNegative(sku.leadTimeDays) + nonNegative(sku.safetyDays) + 30);
  const suggestedOrderQty = Math.max(0, targetStock - currentStock);
  const status = currentStock <= safetyStock ? 'critical' : currentStock <= reorderPoint ? 'reorder' : 'healthy';
  return { ...sku, reorderPoint, safetyStock, daysToStockout, suggestedOrderQty, capitalLocked: currentStock * nonNegative(sku.costPerUnit), status };
}

export function calculateInventoryPortfolio(skus: readonly InventorySku[]) {
  const items = skus.map(calculateInventorySku);
  return {
    items,
    workingCapital: items.reduce((sum, item) => sum + item.capitalLocked, 0),
    criticalSkus: items.filter((item) => item.status === 'critical').length,
    reorderNow: items.filter((item) => item.status !== 'healthy').length,
  };
}
