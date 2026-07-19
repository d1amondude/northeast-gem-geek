/**
 * Gem Geek subscription catalog (source of truth for UI + server entitlements).
 * Research-backed structure: freemium + Pro monthly/annual hero + Trade later.
 * Apple product IDs reserved for StoreKit / RevenueCat.
 */

export type PlanInterval = "none" | "week" | "month" | "year";
export type PlanId = "free" | "pro_monthly" | "pro_annual" | "trade_monthly";

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  priceUsd: number;
  /** Display line under price, e.g. "billed yearly" */
  priceNote: string;
  interval: PlanInterval;
  /** Effective monthly cost for marketing (annual ÷ 12) */
  effectiveMonthlyUsd: number | null;
  /** Hero / recommended on paywall */
  highlighted: boolean;
  /** Shown in App Store paywall */
  storefront: boolean;
  /** Soft AI quota per ISO week (null = unlimited within abuse caps) */
  aiCallsPerWeek: number | null;
  /** Hard max AI calls per day (abuse protection) */
  aiCallsPerDay: number | null;
  features: string[];
  /** Free-tier features still available without sub */
  freeIncludes?: string[];
  appleProductId: string | null;
  /** Internal sort / display order */
  sortOrder: number;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Pocket catalog & field formulas",
    priceUsd: 0,
    priceNote: "Always free",
    interval: "none",
    effectiveMonthlyUsd: 0,
    highlighted: false,
    storefront: true,
    aiCallsPerWeek: 3,
    aiCallsPerDay: 3,
    features: [
      "Full gem catalog (~148 stones) + rare*",
      "Lab cards, formulas & calipers",
      "3 AI assists per week",
      "Educational use only",
    ],
    appleProductId: null,
    sortOrder: 0,
  },
  {
    id: "pro_monthly",
    name: "Pro",
    tagline: "Full pocket gem lab",
    priceUsd: 7.99,
    priceNote: "per month",
    interval: "month",
    effectiveMonthlyUsd: 7.99,
    highlighted: false,
    storefront: true,
    aiCallsPerWeek: 200,
    aiCallsPerDay: 40,
    features: [
      "Everything in Free",
      "AI identify, photo, consult & verify",
      "Catalog AI audit",
      "Higher weekly AI allowance",
      "Job history (coming)",
    ],
    appleProductId: "com.northeast.gemgeek.pro.monthly",
    sortOrder: 1,
  },
  {
    id: "pro_annual",
    name: "Pro Annual",
    tagline: "Best value — about $4.17/mo",
    priceUsd: 49.99,
    priceNote: "per year · save vs monthly",
    interval: "year",
    effectiveMonthlyUsd: 4.17,
    highlighted: true,
    storefront: true,
    aiCallsPerWeek: 200,
    aiCallsPerDay: 40,
    features: [
      "Everything in Pro",
      "Billed once yearly ($49.99)",
      "Best price for daily use",
      "Priority for new lab tools",
    ],
    appleProductId: "com.northeast.gemgeek.pro.annual",
    sortOrder: 2,
  },
  {
    id: "trade_monthly",
    name: "Trade",
    tagline: "Bench & dealer toolkit",
    priceUsd: 14.99,
    priceNote: "per month",
    interval: "month",
    effectiveMonthlyUsd: 14.99,
    highlighted: false,
    storefront: true,
    aiCallsPerWeek: 500,
    aiCallsPerDay: 80,
    features: [
      "Everything in Pro",
      "Higher AI limits for shop floor",
      "Client PDF reports (coming)",
      "Multi-device seat (coming)",
    ],
    appleProductId: "com.northeast.gemgeek.trade.monthly",
    sortOrder: 3,
  },
];

export const PLAN_BY_ID: Record<PlanId, PricingPlan> = PRICING_PLANS.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<PlanId, PricingPlan>
);

export function isPaidPlan(planId: PlanId): boolean {
  return planId !== "free";
}

export function planAllowsUnlimitedFeel(planId: PlanId): boolean {
  return planId !== "free";
}
