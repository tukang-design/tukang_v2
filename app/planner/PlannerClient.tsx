"use client";
import React, { useMemo, useState, useEffect } from "react";
import { PrimaryCTA, SecondaryCTA } from "../components/CTAButton";
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

  async function submitLead(e?: React.FormEvent) {
    // allow calling without an event (sidebar PrimaryCTA) or as a normal form submit
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      // Build minimal PlannerAnswers shape expected by /api/plan
      const selectedAddOnIds = Object.entries(selectedAddOns)
        .filter(([, v]) => v)
        .map(([id]) => id);

      const pages = {
        home: tier === "landing",
        about: tier !== "landing",
        services: tier !== "landing",
        work: false,
        contact: true,
        otherPages: 0,
      };

      const answers = {
        basics: {
          companyName: company || name || "Individual",
          industry: "Other",
          audience: ["B2C"],
          websiteStatus: "none",
        },
        goal: "inquiries",
        pages,
        features: {
          contactForm: true,
          whatsapp: false,
          blog: false,
          cms: false,
          store: false,
          booking: false,
          membership: false,
          dashboard: false,
          multilingualCount: 0,
        },
        content: {
          logoColors: "ready",
          copy: "polish",
          images: "ready",
          legal: { privacy: false, terms: false, cookies: false },
          migrateCount: 0,
        },
        integrations: {},
        timing: {
          idealLaunchISO: new Date(Date.now() + 14 * 24 * 3600 * 1000)
            .toISOString()
            .slice(0, 10),
          flexibility: "flex_2w",
          budgetBand: "3k_to_6k",
          paymentPref: "standard",
        },
        contact: {
          fullName: name || company || "No name",
          email: email,
          phone: phone || "",
          notes: "",
          consent: true,
        },
      };

      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.errors
          ? data.errors.join("; ")
          : data?.error || "Submission failed";
        throw new Error(msg);
      }
      setSubmittedId(
        data.id || data.submissionId || data.documentId || "SUBMITTED"
      );
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  if (submittedId) {
    return (
      <div className="max-w-2xl m-auto p-6 min-h-[50vh] rounded-2xl border border-accent/20 bg-olive-950 mb-8">
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
            href="https://calendar.app.google/SrBsskVewCfjWUv16"
            className="text-center px-5 py-3 rounded-xl border border-accent/30 text-accent hover:border-accent/60 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a 15min discovery
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-fit bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <header className="mb-6">
          <div className="text-sm text-gray-400">Step {step} of 3</div>
          <h1 className="text-2xl lg:text-3xl font-bold text-accent/40">
            PROJECT SCOPE PLANNER
          </h1>
          <p className="text-gray-300">
            Unsure where to begin? Plan your perfect website step‑by‑step.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-brown-700">
            {/* Package selector as button tabs */}
            <div className="flex items-center gap-2">
              {Object.entries(TIERS).map(([id, cfg]) => (
                <button
                  key={id}
                  onClick={() => setTier(id as TierId)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-150 ${
                    tier === id
                      ? "bg-accent/30 text-olive-200 border-accent/40 hover:bg-accent/40 hover:border-accent/60"
                      : "bg-olive-900/60 border-accent/20 text-gray-300 hover:bg-olive-900/80 hover:border-accent/40 hover:text-olive-100"
                  }`}
                >
                  {cfg.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="relative">
          <main className="mb-4">
            {step === 2 && (
              <section className="rounded-2xl border border-accent/20 bg-olive-950 p-5">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-accent mb-2">
                    {tier === "landing"
                      ? "Customize Your Landing Page"
                      : tier === "business"
                      ? "Customize Your Business Website"
                      : "Configure Your Custom System"}
                  </h2>
                  {tier !== "advanced" && (
                    <div className="text-sm font-normal text-slate-300 font-mono mt-1">
                      Price starts from{" "}
                      {tierCfg.basePriceRange
                        ? formatMYRRange(
                            tierCfg.basePriceRange[0],
                            tierCfg.basePriceRange[1]
                          )
                        : formatMYR(tierCfg.basePrice)}
                    </div>
                  )}
                  {tier === "advanced" && (
                    <div className="text-sm font-normal text-slate-300 font-mono mt-1">
                      Base Price: {formatMYR(tierCfg.basePrice)} — choose a
                      platform below to see the platform starting range.
                    </div>
                  )}
                </div>

                {tier === "advanced" && (
                  <div className="mb-6">
                    <div className="text-md font-semibold text-white font-mono mb-2">
                      Select Your Platform Type
                    </div>
                    <div className="text-sm font-normal text-gray-300 mb-4">
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
                              ? "border-accent shadow-[0_0_0_2px_rgba(57,255,20,0.15)]"
                              : "border-accent/20 hover:border-accent/50 hover:bg-olive-dark/60"
                          } bg-olive-dark/40 cursor-pointer transition-colors`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-semibold text-foreground">
                                {p.label}
                              </div>
                              <div className="text-xs font-normal text-gray-400 mt-1">
                                {p.description}
                              </div>
                              <div className="text-xs font-normal text-slate-300 font-mono mt-2">
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
                  <div className="text-md font-semibold text-white font-mono mb-2">
                    Additional Add-ons
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
                        className="block p-3 rounded-xl border border-accent/20 bg-olive-dark/40 hover:border-accent/50 hover:bg-olive-dark/60 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground">
                              {a.label}
                            </div>
                            {a.description && (
                              <div className="text-xs font-normal text-gray-400 mt-1">
                                {a.description}
                              </div>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xs font-normal text-slate-300 font-mono mt-2">
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

                <div className="mt-5 flex items-center justify-end">
                  <PrimaryCTA
                    onClick={() => setStep(3)}
                    disabled={tier === "advanced" && !selectedPlatform}
                    aria-disabled={tier === "advanced" && !selectedPlatform}
                  >
                    Proceed to Contact & Estimate
                  </PrimaryCTA>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="rounded-2xl border border-accent/20 bg-olive-950 p-5">
                <h2 className="text-xl font-bold text-white mb-2">
                  Your Personalized Website Plan is Ready!
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Just a quick step to unlock your full project estimate and
                  receive a comprehensive summary in your inbox.
                </p>

                <div className="mb-6">
                  <div className="text-md font-semibold text-white font-mono mb-2">
                    Additional Add-ons
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
                            <div className="text-sm font-semibold text-foreground">
                              {a.label}
                            </div>
                            {a.description && (
                              <div className="text-xs font-normal text-gray-400 mt-1">
                                {a.description}
                              </div>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xs font-normal text-slate-300 font-mono mt-2">
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

                {/* Inline estimate card */}
                <div className="mb-6 rounded-lg p-4 bg-olive-900/30 border border-accent/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-foreground">{tierCfg.name}</div>
                    <div className="text-slate-400 font-medium font-mono">
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
                          <span className="text-slate-400 font-medium font-mono">
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

                  <div className="mt-4 pt-4 text-xs text-gray-400 border-t border-accent/10">
                    <strong>Disclaimer:</strong> This tool provides a high-level
                    budget estimate. The final quotation will be provided after
                    a detailed discovery call where we confirm the full scope of
                    your technical requirements.
                  </div>
                </div>

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

                  <div className="sm:col-span-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-sm px-4 py-2 rounded-md border bg-transparent text-gray-300 hover:bg-olive-dark/30"
                    >
                      Back
                    </button>

                    <PrimaryCTA
                      type="submit"
                      disabled={submitting || !(name.trim() && email.trim())}
                    >
                      {submitting ? "Submitting…" : "Unlock Estimate"}
                    </PrimaryCTA>
                  </div>
                </form>
              </section>
            )}
          </main>

          <aside className="lg:col-span-1" aria-hidden>
            {/* Estimate card intentionally hidden on step 2; shown inline above */}
          </aside>
        </div>
      </div>
    </div>
  );
}
