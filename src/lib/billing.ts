import type { PlanId, PricingPlan } from "../data/pricingPlans";

const DEVICE_KEY = "gemgeek_device_id";

export function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `gg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "anonymous-device";
  }
}

export interface BillingStatus {
  deviceId: string;
  planId: PlanId;
  planName: string;
  status: string;
  proUntil: string | null;
  source: string;
  isPaid: boolean;
  usage: {
    weekKey: string;
    weekCalls: number;
    weekLimit: number | null;
    dayKey: string;
    dayCalls: number;
    dayLimit: number | null;
    remainingWeek: number | null;
    remainingDay: number | null;
  };
}

export async function fetchPlans(): Promise<PricingPlan[]> {
  const res = await fetch("/api/billing/plans");
  if (!res.ok) throw new Error("Failed to load plans");
  const data = await res.json();
  return data.plans as PricingPlan[];
}

export async function fetchBillingStatus(): Promise<BillingStatus> {
  const deviceId = getDeviceId();
  const res = await fetch(`/api/billing/status?deviceId=${encodeURIComponent(deviceId)}`);
  if (!res.ok) throw new Error("Failed to load billing status");
  return res.json();
}

/** Dev / pre-StoreKit activation. Production will use Apple IAP receipt. */
export async function activatePlanDev(planId: PlanId): Promise<BillingStatus> {
  const deviceId = getDeviceId();
  const res = await fetch("/api/billing/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId, planId, source: "dev" }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Activation failed");
  return data as BillingStatus;
}

export function billingHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "X-GemGeek-Device-Id": getDeviceId(),
  };
}
