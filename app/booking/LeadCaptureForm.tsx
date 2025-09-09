"use client";

import React, { useState } from "react";
import {
  predefinedGoals,
  predefinedFeatures,
  matrix,
} from "@/lib/solutions-config";

type Recommended = { id: string; name: string; price: string } | null;

function GoalIcon({ id }: { id: string }) {
  const cls = "w-6 h-6 stroke-current text-accent/80";
  switch (id) {
    case "generate-leads":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 17l6-6 4 4 8-8"
          />
        </svg>
      );
    case "establish-presence":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <path
            strokeWidth={2}
            d="M3 9h18M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9M9 9V7a2 2 0 012-2h2a2 2 0 012 2v2"
          />
        </svg>
      );
    case "showcase-portfolio":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            ry="2"
            strokeWidth={2}
          />
          <path strokeWidth={2} d="M3 15l5-4 4 3 3-2 6 5" />
        </svg>
      );
    case "sell-products":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <path
            strokeWidth={2}
            d="M3 5h2l2 12a2 2 0 002 2h8a2 2 0 002-2l1-7H7"
          />
          <circle cx="10" cy="21" r="1" strokeWidth={2} />
          <circle cx="17" cy="21" r="1" strokeWidth={2} />
        </svg>
      );
    case "create-blog":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <path strokeWidth={2} d="M7 7h10M7 12h8M7 17h10" />
        </svg>
      );
    case "accept-bookings":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <path
            strokeWidth={2}
            d="M8 7V3m8 4V3M5 11h14M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
          />
        </svg>
      );
    case "membership":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <path strokeWidth={2} d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
          <path strokeWidth={2} d="M4 22a8 8 0 1116 0H4z" />
        </svg>
      );
    case "fast-launch":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <path
            strokeWidth={2}
            d="M12 3l2.5 4.5L19 9l-3.5 3 1 5-4.5-2.5L7.5 17l1-5L5 9l4.5-1.5L12 3z"
          />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={2} />
        </svg>
      );
  }
}

function featureDescription(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("e‑commerce") || l.includes("e-commerce"))
    return "Sell online with secure payments & product catalog.";
  if (l.includes("content management") || l.includes("cms"))
    return "Manage pages and posts without code.";
  if (l.includes("booking"))
    return "Let clients schedule appointments or sessions.";
  if (l.includes("user authentication") || l.includes("membership"))
    return "Members-only areas with login access.";
  if (l.includes("contact forms"))
    return "Flexible forms with conditional fields and validation.";
  if (l.includes("custom pages"))
    return "Tailored multi-page structure for your content.";
  if (l.includes("whatsapp"))
    return "Direct high-intent chats to your WhatsApp.";
  if (l.includes("seo"))
    return "Configured meta tags and structure for search visibility.";
  if (l.includes("ga4") || l.includes("analytics"))
    return "Track events and traffic with GA4.";
  if (l.includes("mobile")) return "Optimized layout for small screens.";
  if (l.includes("interactive design"))
    return "Modern, engaging visuals and interactions.";
  if (l.includes("fast") || l.includes("efficient"))
    return "Quick to launch with performance in mind.";
  return "As outlined in Solutions.";
}

export default function LeadCaptureForm() {
  const [selectedGoals, setSelectedGoals] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, boolean>
  >({});
  const [otherRequirements, setOtherRequirements] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<Recommended>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const selectedGoalLabels = predefinedGoals
    .filter((g) => selectedGoals[g.id])
    .map((g) => g.label);
  const canNextFrom1 = selectedGoalLabels.length > 0;
  const canSubmit = Boolean(name.trim()) && Boolean(email.trim());
  const [reason, setReason] = useState<string | null>(null);

  const featureLabelsMap = new Map(
    predefinedFeatures.map((f) => [f.id, f.label] as const)
  );
  const selectedFeatureLabels = Object.entries(selectedFeatures)
    .filter(([, v]) => v)
    .map(([id]) => featureLabelsMap.get(id) || id);
  const truncate = (s: string, n: number) =>
    s && s.length > n ? s.slice(0, n) + "…" : s;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryGoals: selectedGoalLabels,
          selectedFeatures: Object.keys(selectedFeatures).filter(
            (k) => selectedFeatures[k]
          ),
          otherRequirements,
          businessName,
          name,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Submission failed");
      }
      setSubmittedId(data.submissionId);
      if (data.recommendedTier) {
        setRecommended({
          id: data.recommendedTier.id,
          name: data.recommendedTier.name,
          price: data.recommendedTier.price,
        });
        if (data.recommendedTier.reason)
          setReason(String(data.recommendedTier.reason));
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedId) {
    return (
      <div className="max-w-xl mx-auto p-6 my-auto rounded-2xl border border-accent/20 bg-olive-dark/60 mt-12">
        <h1 className="text-3xl font-bold text-accent font-mono text-center">
          Thank you for your submission
        </h1>
        <p className="text-gray-300 text-center mt-2">
          We’ve received your details successfully.
        </p>
        <p className="text-xs text-gray-400 mt-2 text-center tracking-wide">
          Reference: {submittedId}
        </p>

        {recommended && (
          <div className="mt-6 rounded-2xl border border-accent/30 bg-olive-dark/70 p-5">
            <div className="text-center">
              <span className="inline-block text-[11px] uppercase tracking-wider text-accent/90 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                Recommended Tier
              </span>
            </div>
            <div className="mt-4 text-center">
              <div className="text-2xl font-extrabold text-white leading-tight">
                {recommended.name}
              </div>
              <div className="mt-1 text-sm text-gray-400">Starting at</div>
              <div className="text-3xl font-black text-accent mt-1">
                {recommended.price}
              </div>
              {reason && (
                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  {reason}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/schedule-discovery"
            className="w-full text-center px-5 py-3 rounded-xl border border-accent/30 text-accent hover:border-accent/60 transition"
          >
            Schedule Discovery
          </a>
          <a
            href="/services"
            className="w-full text-center px-5 py-3 rounded-xl border border-accent/30 text-accent hover:border-accent/60 transition"
          >
            View Packages
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-2 lg:order-2 py-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <header>
            <h1 className="text-3xl font-bold text-accent">
              Contact & Inquiry Test1
            </h1>
            <p className="text-gray-300">
              Not sure what you need yet? Tell us a bit and we'll suggest
              options.
            </p>
          </header>

          <div className="text-sm text-gray-400">Step {step} of 3</div>

          <div className="rounded-xl border border-accent/20 mb-4">
            <button
              type="button"
              className="w-full flex items-center justify-between p-4"
              onClick={() => setStep(1)}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    selectedGoalLabels.length
                      ? "border-accent/70 text-accent"
                      : "border-gray-600 text-gray-500"
                  }`}
                >
                  {selectedGoalLabels.length ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="block h-1 w-1 rounded-full bg-current" />
                  )}
                </span>
                <span className="text-lg font-bold font-mono text-foreground ml-2">
                  1. Goals
                </span>
              </div>
              <svg
                className={`h-4 w-4 transition-transform ${
                  step === 1 ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>
            <div
              className={`border-t border-accent/10 grid transition-all duration-300 ${
                step === 1
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="max-h-80 overflow-scroll p-4">
                <fieldset className="space-y-3">
                  <legend className="text-base text-gray-400 mb-3">
                    Tell us what you want to achieve with your website. You can
                    select multiple.
                  </legend>
                  <div className="grid grid-cols-1 gap-3">
                    {predefinedGoals.map((g) => {
                      const goalRow = matrix.find((m) => m.id === g.id);
                      const selected = !!selectedGoals[g.id];
                      return (
                        <label
                          key={g.id}
                          className={`flex items-start justify-between gap-3 p-4 cursor-pointer rounded-xl border border-accent/20 ${
                            selected
                              ? "bg-olive-dark/60"
                              : "bg-olive-dark/40 hover:bg-olive-dark/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg border border-accent/20">
                              <GoalIcon id={g.id} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-base font-semibold text-foreground truncate leading-tight">
                                {g.label}
                              </div>
                              {goalRow?.note && (
                                <p className="text-sm text-gray-400 mt-1 max-w-prose">
                                  {truncate(goalRow.note, 120)}
                                </p>
                              )}
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            className="mt-1"
                            checked={selected}
                            onChange={(e) =>
                              setSelectedGoals((prev) => ({
                                ...prev,
                                [g.id]: e.target.checked,
                              }))
                            }
                          />
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canNextFrom1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 w-full sm:w-2/3"
                  >
                    Confirm & Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border border-accent/20 mb-4 ${
              !selectedGoalLabels.length ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between p-4"
              onClick={() => selectedGoalLabels.length && setStep(2)}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    selectedFeatureLabels.length ||
                    (otherRequirements || "").trim().length
                      ? "border-accent/70 text-accent"
                      : "border-gray-600 text-gray-500"
                  }`}
                >
                  {selectedFeatureLabels.length ||
                  (otherRequirements || "").trim().length ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="block h-1 w-1 rounded-full bg-current" />
                  )}
                </span>
                <span className="text-lg font-bold font-mono text-foreground ml-2">
                  2. Features
                </span>
              </div>
              <svg
                className={`h-4 w-4 transition-transform ${
                  step === 2 ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>
            <div
              className={`border-t border-accent/10 grid transition-all duration-300 ${
                step === 2
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="max-h-80 overflow-scroll p-4 space-y-4">
                <div className="space-y-2">
                  {predefinedFeatures.map((f) => {
                    const selected = !!selectedFeatures[f.id];
                    return (
                      <label
                        key={f.id}
                        className={`flex items-start justify-between gap-3 rounded-lg border p-3 cursor-pointer ${
                          selected
                            ? "border-accent/20 bg-olive-dark/60"
                            : "border-accent/10 bg-olive-dark/40 hover:bg-olive-dark/50"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground">
                            {f.label}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            {featureDescription(f.label)}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={selected}
                          onChange={(e) =>
                            setSelectedFeatures((prev) => ({
                              ...prev,
                              [f.id]: e.target.checked,
                            }))
                          }
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="space-y-2 mt-2">
                  <label className="text-sm" htmlFor="other">
                    Other requirements (optional)
                  </label>
                  <textarea
                    id="other"
                    rows={3}
                    className="w-full rounded-md border bg-transparent p-2"
                    value={otherRequirements}
                    onChange={(e) => setOtherRequirements(e.target.value)}
                    placeholder="Anything not listed above"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 border rounded-md w-full sm:w-2/3"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border border-accent/20 ${
              !(
                selectedFeatureLabels.length ||
                (otherRequirements || "").trim().length
              )
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between p-4"
              onClick={() =>
                (selectedFeatureLabels.length ||
                  (otherRequirements || "").trim().length) &&
                setStep(3)
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    Boolean(name.trim()) && Boolean(email.trim())
                      ? "border-accent/70 text-accent"
                      : "border-gray-600 text-gray-500"
                  }`}
                >
                  {Boolean(name.trim()) && Boolean(email.trim()) ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="block h-1 w-1 rounded-full bg-current" />
                  )}
                </span>
                <span className="text-lg font-bold font-mono text-foreground ml-2">
                  3. Contact Details
                </span>
              </div>
              <svg
                className={`h-4 w-4 transition-transform ${
                  step === 3 ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>
            <div
              className={`border-t border-accent/10 grid transition-all duration-300 ${
                step === 3
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="business">
                      Business / Project Name
                    </label>
                    <input
                      id="business"
                      className="w-full rounded-md border bg-transparent p-2"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="name">
                      Full Name (required)
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border bg-transparent p-2 focus-ring"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="email">
                      Email (required)
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border bg-transparent p-2 focus-ring"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="phone">
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      className="w-full rounded-md border bg-transparent p-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting || !canSubmit}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 w-full sm:w-2/3"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <aside className="hidden lg:block lg:order-1">
        <div className="sticky top-24 rounded-xl border border-accent/20 bg-olive-dark/50 p-8 space-y-6">
          <h2 className="text-lg font-bold text-accent">Summary</h2>

          {/* 1. Goals */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center self-stretch">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                  selectedGoalLabels.length
                    ? "border-accent/70 text-accent"
                    : "border-gray-600 text-gray-500"
                }`}
              >
                {selectedGoalLabels.length ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="block h-1 w-1 rounded-full bg-current" />
                )}
              </span>
              <div className="mt-1 w-px bg-brown-400 flex-1" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-foreground">
                1. Goals
              </div>
              {selectedGoalLabels.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedGoalLabels.slice(0, 8).map((l) => (
                    <span
                      key={l}
                      className="inline-flex items-center px-2.5 py-1 rounded-full border border-brown-400 text-sm text-brown-700 bg-olive-dark/60 max-w-[180px] truncate"
                    >
                      {l}
                    </span>
                  ))}
                  {selectedGoalLabels.length > 8 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-gray-600 text-sm text-gray-400 bg-olive-dark/40">
                      +{selectedGoalLabels.length - 8} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 2. Features */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center self-stretch">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                  selectedFeatureLabels.length ||
                  (otherRequirements || "").trim().length
                    ? "border-accent/70 text-accent"
                    : "border-gray-600 text-gray-500"
                }`}
              >
                {selectedFeatureLabels.length ||
                (otherRequirements || "").trim().length ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="block h-1 w-1 rounded-full bg-current" />
                )}
              </span>
              <div className="mt-1 w-px bg-brown-400 flex-1" />
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-foreground">
                2. Features
              </div>
              {(selectedFeatureLabels.length ||
                (otherRequirements || "").trim().length) > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedFeatureLabels.slice(0, 8).map((l) => (
                    <span
                      key={l}
                      className="inline-flex items-center px-2.5 py-1 rounded-full border border-brown-400 text-sm text-brown-700 bg-olive-dark/60 max-w-[180px] truncate"
                    >
                      {l}
                    </span>
                  ))}
                  {(otherRequirements || "").trim().length > 0 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-brown-400 text-sm text-brown-700 bg-olive-dark/60">
                      Other noted
                    </span>
                  )}
                  {selectedFeatureLabels.length > 8 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-gray-600 text-sm text-gray-400 bg-olive-dark/40">
                      +{selectedFeatureLabels.length - 8} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 3. Contact Details */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                  Boolean(name.trim()) && Boolean(email.trim())
                    ? "border-accent/70 text-accent"
                    : "border-gray-600 text-gray-500"
                }`}
              >
                {Boolean(name.trim()) && Boolean(email.trim()) ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="block h-1 w-1 rounded-full bg-current" />
                )}
              </span>
              {/* No connector for last item */}
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-foreground">
                3. Contact Details
              </div>
              {(name || email) && (
                <div className="text-sm text-gray-300 mt-1">{`${name || ""}${
                  name && email ? " • " : ""
                }${email || ""}`}</div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
