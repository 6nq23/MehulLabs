const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, '..', 'src/lib/calculators.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;
const calculators = {};
vm.runInNewContext(source, { exports: calculators }, { filename: 'calculators.ts' });

test('RTO totals and target savings include both payment types', () => {
  const result = calculators.calculateRto({
    monthlyOrders: 1000, averageOrderValue: 1000, codPercent: 60,
    codRtoRate: 20, prepaidRtoRate: 5, forwardShipping: 50,
    reverseShipping: 70, packaging: 20, targetCodRtoRate: 10,
  });
  assert.equal(result.totalRtoOrders, 140);
  assert.equal(result.revenueLost, 140000);
  assert.equal(result.totalRtoCost, 19600);
  assert.ok(Math.abs(result.ordersSaved - 60) < 1e-9);
  assert.ok(Math.abs(result.rtoCostSaved - 8400) < 1e-9);
});

test('unit economics separates contribution margin from CAC', () => {
  const result = calculators.calculateUnitEconomics({ sellingPrice: 1499, discountPercent: 20, cogs: 350, packaging: 25, shipping: 65, gatewayFeePercent: 2, gstPercent: 12, rtoRate: 15, reverseLogistics: 120, monthlyAdSpend: 200000, monthlyOrders: 400 });
  assert.ok(Math.abs(result.netSellingPrice - 1199.2) < 1e-9);
  assert.equal(result.cac, 500);
  assert.ok(Math.abs(result.contributionMargin - 59.812) < 1e-6);
  assert.equal(result.breakEvenOrders, 358);
});

test('bundle math blends bundle adoption and conversion uplift', () => {
  const products = [{ id: 1, name: 'A', price: 799, cogs: 180 }, { id: 2, name: 'B', price: 599, cogs: 140 }, { id: 3, name: 'C', price: 499, cogs: 110 }];
  const result = calculators.calculateBundle(products, 15, 20, 500, 60);
  assert.ok(Math.abs(result.bundleSellingPrice - 1612.45) < 1e-9);
  assert.ok(Math.abs(result.projectedAov - 1220.4033333333332) < 1e-6);
  assert.equal(result.projectedOrders, 600);
});

test('marketing plan derives revenue and orders from ROAS and AOV', () => {
  const channels = [{ id: 'a', name: 'A', allocation: 40, roas: 3 }, { id: 'b', name: 'B', allocation: 60, roas: 5 }];
  const result = calculators.calculateMarketingBudget(100000, 1000, channels);
  assert.equal(result.expectedRevenue, 420000);
  assert.equal(result.expectedOrders, 420);
  assert.equal(result.blendedRoas, 4.2);
});

test('runway compounds revenue and finds break-even month', () => {
  const result = calculators.calculateRunway({ cash: 2500000, monthlyRevenue: 800000, monthlyGrowthPercent: 8, fixedCosts: 350000, variableCostPercent: 45, marketingSpend: 200000 });
  assert.equal(result.monthlyBurn, 110000);
  assert.equal(result.breakEvenMonth, 4);
  assert.equal(result.runwayMonths, null);
  assert.equal(result.projection.length, 24);
});

test('inventory reorder point includes lead-time and safety stock', () => {
  const result = calculators.calculateInventory(25, 20, 8);
  assert.equal(result.leadTimeStock, 500);
  assert.equal(result.safetyStock, 200);
  assert.equal(result.reorderPoint, 700);
  const portfolio = calculators.calculateInventoryPortfolio([{ id: 1, name: 'A', currentStock: 80, dailySales: 20, leadTimeDays: 20, safetyDays: 6, costPerUnit: 100 }]);
  assert.equal(portfolio.items[0].reorderPoint, 520);
  assert.equal(portfolio.criticalSkus, 1);
  assert.equal(portfolio.workingCapital, 8000);
});

const profitCommon = {
  grossSellingPrice: 1699, salesGstRate: 3, tdsRate: .1, tcsRate: .5,
  productCost: 500, roas: 2.3, targetProfitMargin: 10, returnRate: 10,
  rtoRate: 5, returnProcessingCost: 0, returnedProductLossPercent: 0,
  otherCostPerOrder: 0,
};

test('marketplace profitability matches the published sample scenario', () => {
  const result = calculators.calculateMarketplaceProfitability({
    ...profitCommon, platformCommission: 35, gstOnCommission: 18,
    regularLogisticsCost: 0, returnOutwardCost: 30, returnInwardCost: 30,
    rtoCost: 0, commissionRefunded: true,
  });
  assert.ok(Math.abs(result.expectedGrossRevenue - 1444.15) < 1e-9);
  assert.ok(Math.abs(result.expectedPayout - 833.3036) < 1e-3);
  assert.ok(Math.abs(result.expectedProfit - -273.06077) < 1e-3);
  assert.ok(Math.abs(result.breakEvenSellingPrice - 4636.39728) < 1e-3);
  assert.ok(Math.abs(result.targetSellingPrice - 41299.98988) < 1e-3);
  assert.ok(Math.abs(result.breakEvenRoas - 3.64878) < 1e-3);
});

test('website profitability matches the published sample scenario', () => {
  const result = calculators.calculateD2CProfitability({
    ...profitCommon, paymentGatewayRate: 2, gstOnGatewayFee: 18,
    forwardDeliveryCost: 80, returnReverseCost: 80, rtoReverseCost: 80,
    gatewayFeeRefunded: false,
  });
  assert.ok(Math.abs(result.expectedPayout - 1303.642) < 1e-3);
  assert.ok(Math.abs(result.expectedProfit - 112.41172) < 1e-3);
  assert.ok(Math.abs(result.profitMargin - 8.01747) < 1e-3);
  assert.ok(Math.abs(result.breakEvenSellingPrice - 1395.56186) < 1e-3);
  assert.ok(Math.abs(result.targetSellingPrice - 1795.5389) < 1e-3);
  assert.ok(Math.abs(result.breakEvenRoas - 1.99623) < 1e-3);
});
