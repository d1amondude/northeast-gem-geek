import React, { useEffect, useState } from "react";
import { Check, Crown, Loader2, Sparkles, X } from "lucide-react";
import { PRICING_PLANS, type PlanId, type PricingPlan } from "../data/pricingPlans";
import {
  activatePlanDev,
  fetchBillingStatus,
  fetchPlans,
  type BillingStatus,
} from "../lib/billing";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  billing: BillingStatus | null;
  onBillingChange: (status: BillingStatus) => void;
  reason?: string | null;
}

export default function PaywallModal({
  open,
  onClose,
  billing,
  onBillingChange,
  reason,
}: PaywallModalProps) {
  const [plans, setPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [loading, setLoading] = useState(false);
  const [busyPlan, setBusyPlan] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setNote(null);
    fetchPlans()
      .then(setPlans)
      .catch(() => setPlans(PRICING_PLANS));
  }, [open]);

  if (!open) return null;

  const storefront = plans
    .filter((p) => p.storefront && p.id !== "free")
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const onSelect = async (planId: PlanId) => {
    setBusyPlan(planId);
    setError(null);
    setNote(null);
    setLoading(true);
    try {
      const status = await activatePlanDev(planId);
      onBillingChange(status);
      setNote(
        planId === "free"
          ? "Back on Free plan."
          : `Activated ${status.planName} (dev / pre-App Store). Apple IAP ships next.`
      );
    } catch (e: any) {
      const msg = e?.message || "Could not activate plan";
      setError(msg);
      if (String(msg).includes("IAP_PENDING") || String(msg).includes("coming soon")) {
        setNote("Apple In-App Purchase wiring is next. Locally / with ALLOW_DEV_BILLING=1 you can test upgrades.");
      }
    } finally {
      setLoading(false);
      setBusyPlan(null);
      try {
        onBillingChange(await fetchBillingStatus());
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-[#D4AF37]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 p-5 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur">
          <div className="flex items-start gap-3 min-w-0">
            <img
              src="/gem-geek-icon.png"
              alt=""
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover ring-1 ring-[#D4AF37]/35 shadow-lg shrink-0"
              aria-hidden
            />
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                Gem Geek Pro
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-white mt-1">
                Unlock the full pocket lab
              </h2>
              <p className="text-xs sm:text-sm text-white/55 mt-1.5 leading-relaxed">
                Home catalog stays free. Photo, Lab ID, Verify, Consult &amp; AI audit are Pro.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {reason && (
            <div className="text-sm text-amber-200/90 bg-amber-500/10 border border-amber-500/25 rounded-xl px-3.5 py-3">
              {reason}
            </div>
          )}

          {billing && (
            <div className="text-xs font-mono text-white/50 flex flex-wrap gap-x-3 gap-y-1">
              <span>
                Plan: <strong className="text-[#D4AF37]">{billing.planName}</strong>
              </span>
              <span>
                AI this week: {billing.usage.weekCalls}
                {billing.usage.weekLimit != null ? ` / ${billing.usage.weekLimit}` : ""}
              </span>
            </div>
          )}

          <div className="space-y-3">
            {storefront.map((plan) => {
              const isCurrent = billing?.planId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  disabled={loading || isCurrent}
                  onClick={() => onSelect(plan.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    plan.highlighted
                      ? "border-[#D4AF37]/60 bg-[#D4AF37]/10 shadow-[0_0_24px_rgba(212,175,55,0.08)]"
                      : "border-white/10 bg-black/40 hover:border-white/25"
                  } ${isCurrent ? "opacity-80" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-black text-white text-lg">{plan.name}</span>
                        {plan.highlighted && (
                          <span className="text-[9px] font-mono uppercase tracking-wider text-black bg-[#D4AF37] px-1.5 py-0.5 rounded font-bold">
                            Best value
                          </span>
                        )}
                        {isCurrent && (
                          <span className="text-[9px] font-mono uppercase text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/50 mt-0.5">{plan.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-white font-mono">
                        ${plan.priceUsd.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-white/45 font-medium">{plan.priceNote}</div>
                      {plan.effectiveMonthlyUsd != null && plan.interval === "year" && (
                        <div className="text-[10px] text-[#D4AF37]/90 mt-0.5">
                          ~${plan.effectiveMonthlyUsd.toFixed(2)}/mo
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/70">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && (
                    <div className="mt-3 text-center text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center justify-center gap-2">
                      {busyPlan === plan.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Activating…
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" /> Choose {plan.name}
                        </>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {error && (
            <p className="text-sm text-red-300/90 border border-red-500/30 bg-red-950/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {note && (
            <p className="text-sm text-emerald-200/90 border border-emerald-500/25 bg-emerald-950/20 rounded-lg px-3 py-2">
              {note}
            </p>
          )}

          <p className="text-[10px] text-white/35 leading-relaxed text-center pt-1">
            Educational field aid only — not a laboratory certificate or grading report. Subscriptions via Apple
            In-App Purchase on App Store release. Dev activation available when ALLOW_DEV_BILLING=1.
          </p>

          {billing?.planId !== "free" && (
            <button
              type="button"
              disabled={loading}
              onClick={() => onSelect("free")}
              className="w-full text-xs text-white/45 hover:text-white/70 py-2"
            >
              Downgrade to Free
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
