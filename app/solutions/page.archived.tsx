import React from "react";
import Link from "next/link";
import { tiers, matrix } from "@/lib/solutions-config";

export const metadata = {
  title: "Detailed Project Onboarding & Solutions | Tadal Studio",
  description:
    "End-to-end automated client onboarding: service tiers, solutions matrix, and a 5-phase process to go from enquiry to project kick-off.",
  openGraph: {
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
  twitter: {
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
};

const phases = [
  {
    title: "Phase 1: Initial Lead Capture",
    items: [
      {
        k: "Form Submission",
        v: "Client completes a form with Primary Goal, Target Audience, Must‑Have Features, Business & Contact Info.",
      },
      {
        k: "System Action",
        v: "Lead data is saved automatically; a confirmation message confirms receipt.",
      },
    ],
  },
  {
    title: "Phase 2: Automated Recommendation",
    items: [
      {
        k: "System Assessment",
        v: "Rules engine matches client needs against the Solutions Matrix and returns best‑fit tier + estimated cost.",
      },
      {
        k: "Automated Follow‑Up",
        v: "Client receives an email summary with the estimate and a booking calendar link.",
      },
      {
        k: "Discovery Call Scheduling",
        v: "Calendar enforces earliest booking at least one day out for preparation.",
      },
    ],
  },
  {
    title: "Phase 3: The Discovery Call",
    items: [
      {
        k: "Action",
        v: "First human‑led interaction to refine scope, customize features, and align budget/timeline.",
      },
      { k: "Outcome", v: "Project details confirmed and scope locked in." },
    ],
  },
  {
    title: "Phase 4: Proposal and Onboarding",
    items: [
      { k: "Action", v: "Draft detailed proposal and corresponding invoice." },
      {
        k: "System Trigger",
        v: "Proposal and invoice are sent for client review and approval.",
      },
    ],
  },
  {
    title: "Phase 5: Project Kick‑off",
    items: [
      {
        k: "Payment Confirmation",
        v: "Gateway notifies system when 50% deposit is received.",
      },
      {
        k: "Automated Kick‑off",
        v: "Welcome email with links (docs, comms, repo) and a separate kick‑off email with client action items and first check‑in date.",
      },
    ],
  },
];

function Check({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center rounded border ${
        ok ? "border-accent/50 text-accent" : "border-gray-600 text-gray-500"
      }`}
    >
      {ok ? (
        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <span className="block h-1 w-1 rounded-full bg-gray-600" />
      )}
    </span>
  );
}

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold font-mono text-accent">
          Detailed Project Onboarding & Solutions
        </h1>
        <p className="text-gray-300 max-w-3xl">
          End‑to‑end automated onboarding: service tiers matched to goals, a
          solutions matrix to guide recommendations, and a 5‑phase workflow to
          move from enquiry to kick‑off.
        </p>
      </header>

      {/* ...existing content preserved for archive */}
      <section className="space-y-6">
        <h2 className="text-2xl font-mono font-bold text-accent">
          Phase 1: Our Service Tiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-accent/20 bg-olive-dark/50 p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {t.name}
              </h3>
              <div className="mt-1 text-sm text-gray-400">{t.price}</div>
              <p className="mt-3 text-sm text-gray-300">{t.goal}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent/60" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* keep the rest of the archived workflow */}
      <section className="space-y-6">
        <h2 className="text-2xl font-mono font-bold text-accent">
          Phase 2: Project Solutions Matrix
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-accent/20">
          <table className="w-full text-sm">
            <thead className="bg-olive-dark/60 text-gray-300">
              <tr>
                <th className="text-left p-4">Project Goal / Need</th>
                <th className="p-4">Landing Page</th>
                <th className="p-4">Business Website</th>
                <th className="p-4">Advanced System</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.need} className="border-t border-accent/10">
                  <td className="p-4 align-top text-foreground">{row.need}</td>
                  <td className="p-4 text-center">
                    <Check ok={row.landing} />
                  </td>
                  <td className="p-4 text-center">
                    <Check ok={row.business} />
                  </td>
                  <td className="p-4 text-center">
                    <Check ok={row.advanced} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-accent/20 bg-olive-dark/40 p-4">
          <ul className="space-y-2 text-sm text-gray-300 list-disc pl-6">
            {matrix.map((row) => (
              <li key={row.need}>
                <span className="text-foreground font-medium">{row.need}:</span>{" "}
                {row.note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-mono font-bold text-accent">
          Phase 3–5: Automated Onboarding Process
        </h2>
        <ol className="space-y-6">
          {phases.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-accent/20 bg-olive-dark/50 p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {p.title}
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {p.items.map((i) => (
                  <div key={i.k}>
                    <dt className="text-xs uppercase tracking-wide text-gray-400">
                      {i.k}
                    </dt>
                    <dd className="text-sm text-gray-300">{i.v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-accent/20 bg-olive-dark/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Ready to start?
          </h3>
          <p className="text-sm text-gray-300">
            Book a project or schedule a discovery call.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/booking" className="px-4 py-2 border rounded-md">
            Book Project
          </Link>
          <Link
            href="/schedule-discovery"
            className="px-4 py-2 border rounded-md"
          >
            Schedule Discovery
          </Link>
        </div>
      </section>
    </div>
  );
}
