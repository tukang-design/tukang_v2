"use client";
import React, { useMemo, useState } from "react";
import { PrimaryCTA } from "../components/CTAButton";
import { useSearchParams } from "next/navigation";
import {
  ADD_ONS,
  TIERS,
  TierId,
  PlatformId,
  formatMYR,
  formatMYRRange,
  PLATFORM_TYPES,
} from "@/lib/planner-config";

export default function PlannerClient() {
  const params = useSearchParams();
  const initialTier = (params.get("tier") as TierId) || "landing";
  const [tier, setTier] = useState<TierId>(initialTier);
  const tierCfg = TIERS[tier];

  const [step, setStep] = useState<2 | 3>(2);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | null>(
    null
  );
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>(
    {}
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableAddOns = useMemo(() => {
    const base = ADD_ONS.filter((a) => a.tiers.includes(tier));
    if (tier !== "advanced" || !selectedPlatform) return base;
    // for advanced tier, show add-ons that either don't limit platforms or include the selected platform
    return base.filter(
      (a) => !a.platforms || a.platforms.includes(selectedPlatform)
    );
  }, [tier, selectedPlatform]);

  // helper to safely get platform config
  function getPlatformCfg(id: PlatformId) {
    return PLATFORM_TYPES[id];
  }

  const addOnsRange = useMemo(() => {
    const selected = availableAddOns.filter((a) => selectedAddOns[a.id]);
    const totals = selected.map((a) => {
      if (a.priceRange) return a.priceRange;
      if (a.price) return [a.price, a.price];
      return [0, 0];
    });
    const min = totals.reduce((s, r) => s + r[0], 0);
    const max = totals.reduce((s, r) => s + r[1], 0);
    return [min, max] as [number, number];
  }, [availableAddOns, selectedAddOns]);

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const service: any = {
        id: tierCfg.id,
        name: tierCfg.name,
        ...(tier === "advanced" && selectedPlatform
          ? (() => {
              const pf = getPlatformCfg(selectedPlatform);
              return {
                basePrice: pf.priceRange[0],
                basePriceRange: pf.priceRange,
              };
            })()
          : {
              basePrice: tierCfg.basePrice,
              basePriceRange: tierCfg.basePriceRange,
            }),
      };
      const selectedAddOnIds = Object.entries(selectedAddOns)
        .filter(([, v]) => v)
        .map(([id]) => id);

      const projectDetails = {
        selectedAddOns: selectedAddOnIds,
        features: [],
        timeline: tierCfg.timeline || "",
      };

      const payload = {
        service,
        selectedPlatform: selectedPlatform || null,
        projectDetails,
        contactInfo: { name, email, phone, company },
        region: "MY",
        language: "en",
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.error || "Submission failed");
      setSubmittedId(data.submissionId || data.documentId || "SUBMITTED");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedId) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-8 rounded-2xl border border-accent/20 bg-olive-dark/60">
        <h1 className="text-3xl font-bold text-accent text-center">
          Thank You! Your Plan is Headed Your Way.
        </h1>
        <p className="text-gray-300 text-center mt-3">
          We've sent your personalized plan and estimate to your email. Please
          check spam if you don't see it in 5 minutes.
        </p>
        <p className="text-xs text-gray-400 text-center mt-2">
          Reference: {submittedId}
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/booking"
            className="text-center px-5 py-3 rounded-xl border border-accent/30 text-accent hover:border-accent/60 transition"
          >
            View Packages
          </a>
          <a
            href="/schedule-discovery"
            className="text-center px-5 py-3 rounded-xl border border-accent/30 text-accent hover:border-accent/60 transition"
          >
            Book a 15‑min discovery
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-olive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <header className="mb-6">
          <div className="text-sm text-gray-400">Step {step} of 3</div>
          <h1 className="text-2xl lg:text-3xl font-bold text-accent">
            Project Scope Planner
          </h1>
          <p className="text-gray-300">
            Unsure where to begin? Plan your perfect website step‑by‑step.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-brown-700">
            <span className="px-2 py-0.5 rounded-full bg-olive-dark/60 border border-brown-400">
              Selected: {tierCfg.name}
            </span>
            <button
              className="underline underline-offset-2"
              onClick={() =>
                setTier(
                  tier === "landing"
                    ? "business"
                    : tier === "business"
                    ? "advanced"
                    : "landing"
                )
              }
            >
              Change
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            {step === 2 && (
              <section className="rounded-2xl border border-accent/20 bg-olive-dark/50 p-5">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {tier === "landing"
                      ? "Customize Your Landing Page"
                      : tier === "business"
                      ? "Customize Your Business Website"
                      : "Configure Your Custom System"}
                  </h2>
                  {tier !== "advanced" && (
                    <div className="text-sm text-gray-400 mt-1">
                      Base Price Range:{" "}
                      {tierCfg.basePriceRange
                        ? formatMYRRange(
                            tierCfg.basePriceRange[0],
                            tierCfg.basePriceRange[1]
                          )
                        : formatMYR(tierCfg.basePrice)}
                    </div>
                  )}
                  {tier === "advanced" && (
                    <div className="text-sm text-gray-400 mt-1">
                      Base Price: {formatMYR(tierCfg.basePrice)} — choose a
                      platform below to see the platform starting range.
                    </div>
                  )}
                </div>

                {tier === "advanced" && (
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-white mb-2">
                      Select Your Platform Type
                    </div>
                    <div className="text-sm text-gray-300 mb-3">
                      First, define the core function of your web system. The
                      initial price range for development varies based on the
                      complexity of the required architecture.
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {Object.values(PLATFORM_TYPES).map((p) => (
                        <label
                          key={p.id}
                          className={`block p-3 rounded-xl border ${
                            selectedPlatform === p.id
                              ? "border-accent"
                              : "border-accent/20"
                          } bg-olive-dark/40 cursor-pointer`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                {p.label}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {p.description}
                              </div>
                              <div className="text-xs text-brown-700 mt-2">
                                Starting Price Range:{" "}
                                {formatMYRRange(
                                  p.priceRange[0],
                                  p.priceRange[1]
                                )}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="platform"
                                checked={selectedPlatform === p.id}
                                onChange={() => setSelectedPlatform(p.id)}
                              />
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-300">
                    Additional Services
                  </div>
                  {availableAddOns.length === 0 && (
                    <div className="text-gray-400">
                      No add‑ons available for this package.
                    </div>
                  )}

                  <div className="space-y-3">
                    {availableAddOns.map((a) => (
                      <label
                        key={a.id}
                        className="block p-3 rounded-xl border border-accent/20 bg-olive-dark/40 hover:bg-olive-dark/60 cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">
                              {a.label}
                            </div>
                            {a.description && (
                              <div className="text-xs text-gray-400 mt-1">
                                {a.description}
                              </div>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm text-brown-700">
                              {a.priceRange
                                ? `+ ${formatMYRRange(
                                    a.priceRange[0],
                                    a.priceRange[1]
                                  )}`
                                : a.price
                                ? `+ ${formatMYR(a.price)}`
                                : ""}
                            </div>
                            <div className="mt-2">
                              <input
                                type="checkbox"
                                checked={!!selectedAddOns[a.id]}
                                onChange={(e) =>
                                  setSelectedAddOns((prev) => ({
                                    ...prev,
                                    [a.id]: e.target.checked,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <PrimaryCTA onClick={() => setStep(3)}>Continue</PrimaryCTA>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="rounded-2xl border border-accent/20 bg-olive-dark/50 p-5">
                <h2 className="text-xl font-bold text-white mb-2">
                  Your Personalized Website Plan is Ready!
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Just a quick step to unlock your full project estimate and
                  receive a comprehensive summary in your inbox.
                </p>

                <form
                  onSubmit={submitLead}
                  className="grid sm:grid-cols-2 gap-4 animate-fade-in"
                >
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="name">
                      Full Name (required)
                    </label>
                    <input
                      id="name"
                      required
                      aria-required="true"
                      className="w-full rounded-md border bg-transparent p-2 focus-ring"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="email">
                      Email (required)
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      aria-required="true"
                      className="w-full rounded-md border bg-transparent p-2 focus-ring"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="phone">
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      className="w-full rounded-md border bg-transparent p-2 focus-ring"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="company">
                      Company (optional)
                    </label>
                    <input
                      id="company"
                      className="w-full rounded-md border bg-transparent p-2 focus-ring"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="sm:col-span-2 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="sm:col-span-2 flex justify-end">
                    <PrimaryCTA disabled={submitting}>
                      {submitting ? "Submitting…" : "Unlock Estimate"}
                    </PrimaryCTA>
                  </div>
                </form>
              </section>
            )}
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-accent/20 bg-olive-950/50 p-5">
              <h5 className="text-lg text-slate-300 mb-4">
                Your Project Estimate
              </h5>

              <p className="text-sm text-gray-400 mb-4">
                You have selected <strong>{tierCfg.name}</strong>. Now customise
                your package by selecting additional services. The prices below
                reflect estimated ranges for common requests.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-foreground">{tierCfg.name}</div>
                  <div className="text-brown font-semibold">
                    {tier === "advanced" && selectedPlatform
                      ? formatMYRRange(
                          getPlatformCfg(selectedPlatform).priceRange[0],
                          getPlatformCfg(selectedPlatform).priceRange[1]
                        )
                      : tierCfg.basePriceRange
                      ? formatMYRRange(
                          tierCfg.basePriceRange[0],
                          tierCfg.basePriceRange[1]
                        )
                      : formatMYR(tierCfg.basePrice)}
                  </div>
                </div>

                <div className="space-y-1">
                  {availableAddOns
                    .filter((a) => selectedAddOns[a.id])
                    .map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between text-sm text-gray-300"
                      >
                        <span>{a.label}</span>
                        <span className="text-brown">
                          {a.priceRange
                            ? `+ ${formatMYRRange(
                                a.priceRange[0],
                                a.priceRange[1]
                              )}`
                            : a.price
                            ? `+ ${formatMYR(a.price)}`
                            : ""}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-accent/10">
                  <div className="mb-4 rounded-lg p-3 bg-olive/40 border border-accent/10 text-sm text-gray-300">
                    <strong>Disclaimer:</strong> This tool provides a high-level
                    budget estimate. The final quotation will be provided after
                    a detailed discovery call where we confirm the full scope of
                    your technical requirements.
                  </div>
                  <div className="text-xs text-gray-400 mb-1">Next Step</div>
                  <div className="mt-2">
                    <button
                      onClick={() => setStep(3)}
                      className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-accent text-white font-semibold"
                    >
                      Proceed to Contact & Estimate
                    </button>
                  </div>
                  {tier === "advanced" && !selectedPlatform && (
                    <div className="text-xs text-gray-500 mt-2">
                      Tip: choose a platform to see its starting range before
                      submitting.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
