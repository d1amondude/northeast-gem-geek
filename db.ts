/**
 * Lightweight JSON "DB" for Gem Geek billing entitlements + AI usage.
 * File-backed so it survives restarts on a persistent disk; fine for MVP / single instance.
 */
import fs from "fs";
import path from "path";
import {
  PLAN_BY_ID,
  type PlanId,
  type PricingPlan,
  PRICING_PLANS,
} from "./src/data/pricingPlans";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "gemgeek-db.json");

export interface UsageBucket {
  weekKey: string;
  weekCalls: number;
  dayKey: string;
  dayCalls: number;
}

export interface AccountRecord {
  deviceId: string;
  planId: PlanId;
  status: "active" | "expired" | "canceled";
  /** ISO date when paid entitlement ends; null = free or lifetime/dev */
  proUntil: string | null;
  source: "default" | "dev" | "promo" | "apple" | "stripe";
  createdAt: string;
  updatedAt: string;
  usage: UsageBucket;
  notes?: string;
}

interface GemGeekDb {
  version: 1;
  plans: PricingPlan[];
  accounts: Record<string, AccountRecord>;
}

function isoWeekKey(d = new Date()): string {
  // ISO week: YYYY-Www
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function dayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function emptyUsage(): UsageBucket {
  return {
    weekKey: isoWeekKey(),
    weekCalls: 0,
    dayKey: dayKey(),
    dayCalls: 0,
  };
}

function ensureDb(): GemGeekDb {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    const seed: GemGeekDb = {
      version: 1,
      plans: PRICING_PLANS,
      accounts: {},
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2));
    return seed;
  }
  const raw = fs.readFileSync(DB_PATH, "utf8");
  const parsed = JSON.parse(raw) as GemGeekDb;
  // Keep plan catalog in sync with code on every load
  parsed.plans = PRICING_PLANS;
  parsed.version = 1;
  if (!parsed.accounts) parsed.accounts = {};
  return parsed;
}

function saveDb(db: GemGeekDb) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function refreshUsageWindow(usage: UsageBucket): UsageBucket {
  const w = isoWeekKey();
  const d = dayKey();
  return {
    weekKey: w,
    weekCalls: usage.weekKey === w ? usage.weekCalls : 0,
    dayKey: d,
    dayCalls: usage.dayKey === d ? usage.dayCalls : 0,
  };
}

function planStillActive(account: AccountRecord): boolean {
  if (account.planId === "free") return true;
  if (!account.proUntil) return account.status === "active";
  return new Date(account.proUntil).getTime() > Date.now();
}

export function getPlans(): PricingPlan[] {
  return [...PRICING_PLANS].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getOrCreateAccount(deviceId: string): AccountRecord {
  const db = ensureDb();
  let acc = db.accounts[deviceId];
  if (!acc) {
    const now = new Date().toISOString();
    acc = {
      deviceId,
      planId: "free",
      status: "active",
      proUntil: null,
      source: "default",
      createdAt: now,
      updatedAt: now,
      usage: emptyUsage(),
    };
    db.accounts[deviceId] = acc;
    saveDb(db);
    return acc;
  }
  acc.usage = refreshUsageWindow(acc.usage);
  if (acc.planId !== "free" && !planStillActive(acc)) {
    acc.planId = "free";
    acc.status = "expired";
    acc.proUntil = null;
    acc.updatedAt = new Date().toISOString();
  }
  db.accounts[deviceId] = acc;
  saveDb(db);
  return acc;
}

export function activatePlan(
  deviceId: string,
  planId: PlanId,
  source: AccountRecord["source"] = "dev"
): AccountRecord {
  if (!PLAN_BY_ID[planId]) {
    throw new Error(`Unknown plan: ${planId}`);
  }
  const db = ensureDb();
  const acc = getOrCreateAccount(deviceId);
  const now = new Date();
  let proUntil: string | null = null;
  if (planId === "pro_monthly" || planId === "trade_monthly") {
    const end = new Date(now);
    end.setMonth(end.getMonth() + 1);
    proUntil = end.toISOString();
  } else if (planId === "pro_annual") {
    const end = new Date(now);
    end.setFullYear(end.getFullYear() + 1);
    proUntil = end.toISOString();
  }
  const next: AccountRecord = {
    ...acc,
    planId,
    status: "active",
    proUntil,
    source,
    updatedAt: now.toISOString(),
    usage: refreshUsageWindow(acc.usage),
  };
  db.accounts[deviceId] = next;
  // re-read was already from getOrCreate; write full
  const fresh = ensureDb();
  fresh.accounts[deviceId] = next;
  saveDb(fresh);
  return next;
}

export interface QuotaDecision {
  allowed: boolean;
  reason?: string;
  account: AccountRecord;
  plan: PricingPlan;
  remainingWeek: number | null;
  remainingDay: number | null;
}

/** Peek limits without consuming a call (use before body validation). */
export function checkAiQuota(deviceId: string): QuotaDecision {
  const account = getOrCreateAccount(deviceId);
  const plan = PLAN_BY_ID[account.planId] || PLAN_BY_ID.free;
  const usage = refreshUsageWindow(account.usage);

  const weekLimit = plan.aiCallsPerWeek;
  const dayLimit = plan.aiCallsPerDay;

  if (weekLimit != null && usage.weekCalls >= weekLimit) {
    return {
      allowed: false,
      reason:
        account.planId === "free"
          ? "Free plan includes 3 AI assists per week. Upgrade to Pro for full lab AI."
          : "Weekly AI limit reached. Try again next week or contact support.",
      account: { ...account, usage },
      plan,
      remainingWeek: 0,
      remainingDay: dayLimit != null ? Math.max(0, dayLimit - usage.dayCalls) : null,
    };
  }
  if (dayLimit != null && usage.dayCalls >= dayLimit) {
    return {
      allowed: false,
      reason: "Daily AI limit reached. Try again tomorrow.",
      account: { ...account, usage },
      plan,
      remainingWeek: weekLimit != null ? Math.max(0, weekLimit - usage.weekCalls) : null,
      remainingDay: 0,
    };
  }

  return {
    allowed: true,
    account: { ...account, usage },
    plan,
    remainingWeek: weekLimit != null ? Math.max(0, weekLimit - usage.weekCalls) : null,
    remainingDay: dayLimit != null ? Math.max(0, dayLimit - usage.dayCalls) : null,
  };
}

/** Record one successful AI call against the device quota. */
export function consumeAiQuota(deviceId: string): QuotaDecision {
  const peek = checkAiQuota(deviceId);
  if (!peek.allowed) return peek;

  const usage = refreshUsageWindow(peek.account.usage);
  usage.weekCalls += 1;
  usage.dayCalls += 1;
  const db = ensureDb();
  const next: AccountRecord = {
    ...peek.account,
    usage,
    updatedAt: new Date().toISOString(),
  };
  db.accounts[deviceId] = next;
  saveDb(db);

  const plan = peek.plan;
  return {
    allowed: true,
    account: next,
    plan,
    remainingWeek:
      plan.aiCallsPerWeek != null ? Math.max(0, plan.aiCallsPerWeek - usage.weekCalls) : null,
    remainingDay:
      plan.aiCallsPerDay != null ? Math.max(0, plan.aiCallsPerDay - usage.dayCalls) : null,
  };
}

/** @deprecated use checkAiQuota + consumeAiQuota */
export function checkAndConsumeAiQuota(deviceId: string): QuotaDecision {
  const peek = checkAiQuota(deviceId);
  if (!peek.allowed) return peek;
  return consumeAiQuota(deviceId);
}

export function accountPublicView(account: AccountRecord) {
  const plan = PLAN_BY_ID[account.planId] || PLAN_BY_ID.free;
  const usage = refreshUsageWindow(account.usage);
  return {
    deviceId: account.deviceId,
    planId: account.planId,
    planName: plan.name,
    status: account.status,
    proUntil: account.proUntil,
    source: account.source,
    isPaid: account.planId !== "free" && planStillActive({ ...account, usage }),
    usage: {
      weekKey: usage.weekKey,
      weekCalls: usage.weekCalls,
      weekLimit: plan.aiCallsPerWeek,
      dayKey: usage.dayKey,
      dayCalls: usage.dayCalls,
      dayLimit: plan.aiCallsPerDay,
      remainingWeek:
        plan.aiCallsPerWeek != null
          ? Math.max(0, plan.aiCallsPerWeek - usage.weekCalls)
          : null,
      remainingDay:
        plan.aiCallsPerDay != null ? Math.max(0, plan.aiCallsPerDay - usage.dayCalls) : null,
    },
  };
}
