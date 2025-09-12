"use client";

import React from "react";
import { PrimaryCTA } from "../components/CTAButton";

function SparkleIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M12 2l2.2 5.6L20 10l-5.8 2.4L12 18l-2.2-5.6L4 10l5.8-2.4L12 2z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
      />
    </svg>
  );
}

function BoltIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPageClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-olive-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-slate-500 blur-3xl motion-safe:animate-pulse" />
          <div className="absolute -bottom-36 -left-36 w-[400px] h-[400px] rounded-full bg-brown-900 blur-3xl motion-safe:animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24">
          <h1 className="text-4xl md:text-6xl font-normal text-accent/30 tracking-widest font-mono mb-2">
            TADAL STUDIO
          </h1>
          <h4 className="max-w-4xl text-slate-300 font-medium text-lg lg:text-xl mb-8 ml-0 mx-auto">
            We build credible, conversion-ready websites with an integrated team
            for strategy, design, and code. Based in Malaysia, working
            worldwide.
          </h4>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-stretch">
            <div className="group bg-brown-950/50 border border-brown-700 rounded-2xl p-8 h-full transition-colors hover:border-brown-500 text-center">
              <h2 className="text-3xl md:text-4xl text-center font-bold text-slate-200 font-mono">
                Why us
              </h2>
              <div className="mt-3 h-px bg-brown-600 group-hover:bg-brown-500 transition-colors" />
              <p className="mt-4 text-slate-400 leading-relaxed">
                One partner from brief to launch. Clear packages. Fast delivery.
                A path to grow with add-ons and care plans.
              </p>

              <div className="mt-6">
                <ol className="list-none text-slate-400 text-sm space-y-4">
                  <li>
                    <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                      <div className="flex w-fit gap-2 mx-auto">
                        <h4 className="text-xl text-slate-100 font-semibold text-center">
                          DISCOVER
                        </h4>
                      </div>
                      <p className="mt-2 text-slate-400 text-sm">
                        Align goals, audience, scope and success metrics in a
                        short discovery session. We capture must-haves and
                        nice-to-haves and produce a concise brief.
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                      <div className="flex w-fit gap-2 mx-auto">
                        <h4 className="text-xl text-slate-100 font-semibold text-center">
                          DESIGN
                        </h4>
                      </div>
                      <p className="mt-2 text-slate-400 text-sm">
                        We map information architecture, produce wireframes and
                        high-fidelity screens, and validate interactions with a
                        prototype so stakeholders can preview the flow.
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                      <div className="flex w-fit gap-2 mx-auto">
                        <h4 className="text-xl text-slate-100 font-semibold text-center">
                          BUILD
                        </h4>
                      </div>
                      <p className="mt-2 text-slate-400 text-sm">
                        Implement components and pages, connect integrations,
                        and run QA. We deliver incremental builds so you can
                        review early and often.
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                      <div className="flex w-fit gap-2 mx-auto">
                        <h4 className="text-xl text-slate-100 font-semibold text-center">
                          LAUNCH
                        </h4>
                      </div>
                      <p className="mt-2 text-slate-400 text-sm">
                        Configure domain, analytics, tracking, and handover. We
                        support the initial launch window and monitor health.
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                      <div className="flex w-fit gap-2 mx-auto">
                        <h4 className="text-xl text-slate-100 font-semibold text-center">
                          SUPPORT
                        </h4>
                      </div>
                      <p className="mt-2 text-slate-400 text-sm">
                        Fixes and small enhancements for 30 days post-launch. We
                        offer ongoing care plans for maintenance and growth.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="group bg-olive-950/50 border border-olive-700 rounded-2xl text-center p-8 h-full transition-colors hover:border-olive-500">
              <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-200 font-mono">
                Backgrounds & Stacks
              </h2>
              <div className="mt-3 h-px bg-olive-600 group-hover:bg-olive-500 transition-colors" />
              <p className="mt-4 text-slate-400 leading-relaxed">
                Our team has more than 10 years delivering across agencies,
                corporate initiatives, Big 4 programs, GLCs, and MNCs.
              </p>

              <div className="mt-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Webflow",
                    "Framer",
                    "WordPress",
                    "WooCommerce",
                    "Shopify",
                    "Next.js",
                    "Astro",
                    "Vercel",
                    "Sanity",
                    "Strapi",
                    "Stripe",
                    "And more..",
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-xs text-slate-500">
                <p>
                  Disclosure: Experience shown may include work delivered by
                  team members in prior roles.
                </p>
              </div>

              <div className="mt-6 mx-auto">
                <PrimaryCTA href="/planner" className="min-w-[50%]">
                  Plan My Website
                </PrimaryCTA>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
