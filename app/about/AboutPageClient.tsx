"use client";

import React from "react";
// CTA components removed (unused)

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
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brown-500 font-mono mb-8">
            Seamless Website Development with Full-Stack Design.
          </h1>
          <h4 className="max-w-4xl text-slate-300 text-lg lg:text-xl mb-8 ml-0 mx-auto">
            Strategy, design, and development delivered as one. Perfectly built
            for your business needs.
          </h4>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="group bg-brown-950/50 border border-brown-700 rounded-2xl p-8 h-400 rounded-2xl p-8 h-full transition-colors hover:border-brown-500">
              <div className="flex items-center gap-3">
                <span className="text-slate-300 motion-safe:group-hover:animate-ping [animation-iteration-count:1]">
                  <SparkleIcon className="w-6 h-6" />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-200 font-mono">
                  The Problem
                </h2>
              </div>
              <div className="mt-3 h-px bg-brown-600 group-hover:bg-brown-500 transition-colors" />
              <p className="mt-4 text-slate-400 leading-relaxed">
                Tukang Design was founded to solve a single, frustrating problem
                in the web design industry: the costly gap between a great idea
                and a flawless final product. This disconnect leads to
                compromised vision, missed deadlines, and fragmented websites.
              </p>
            </div>

            <div className="group bg-olive-950/50 border border-olive-700 rounded-2xl p-8 h-400 rounded-2xl p-8 h-full transition-colors hover:border-olive-500">
              <div className="flex items-center gap-3">
                <span className="text-olive-500 motion-safe:group-hover:animate-bounce">
                  <BoltIcon className="w-6 h-6" />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-200 font-mono">
                  The Solution
                </h2>
              </div>
              <div className="mt-3 h-px bg-olive-600 group-hover:bg-olive-500 transition-colors" />
              <p className="mt-4 text-slate-400 leading-relaxed">
                Our solution is the Full-Stack model. Where strategy, design,
                and development are unified, handled by a single, expert team.
                Just a seamless process from the first sketch to the final
                launch.
              </p>
            </div>
          </div>
          {/* Philosophy */}
          <div id="philosophy" className="mt-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-200 font-mono">
              “Tukang”
            </h2>
            <p className="max-w-4xl mx-auto mt-4 text-slate-300 leading-relaxed">
              The name 'Tukang' (craftsman) is at the heart of everything we do.
              It represents our commitment to skill, precision, and building
              digital experiences with genuine care. This is the clarity and
              accountability your project deserves.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <div className="group rounded-xl border bg-slate-950 border-slate-600 p-6 py-8 text-center transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                <div className="flex w-fit items-center gap-2 mx-auto">
                  <SparkleIcon className="w-4 h-4 text-slate-500" />
                  <div className="text-slate-300 font-semibold">Craft</div>
                </div>
                <p className="mt-2 text-slate-400 text-sm">
                  Every detail matters — from typography to transitions to
                  semantics.
                </p>
                <div className="mt-4 h-1 w-12 mx-auto rounded bg-slate-400/60 group-hover:w-16 transition-all" />
              </div>
              <div className="group rounded-xl border bg-slate-950 border-slate-600 p-6 py-8 text-center transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                <div className="flex w-fit items-center gap-2 mx-auto">
                  <BoltIcon className="w-4 h-4 text-slate-500" />
                  <div className="text-slate-300 font-semibold">Clarity</div>
                </div>
                <p className="mt-2 text-gray-300 text-sm">
                  One accountable team throughout — zero miscommunication.
                </p>
                <div className="mt-4 h-1 w-12 mx-auto rounded bg-slate-400/60 group-hover:w-16 transition-all" />
              </div>
              <div className="group rounded-xl border bg-slate-950 border-slate-600 p-6 py-8 text-center transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                <div className="flex w-fit items-center gap-2 mx-auto">
                  <SparkleIcon className="w-4 h-4 text-slate-500" />
                  <div className="text-slate-300 font-semibold">
                    Consistency
                  </div>
                </div>
                <p className="mt-2 text-gray-300 text-sm">
                  From first sketch to final launch, the vision stays intact.
                </p>
                <div className="mt-4 h-1 w-12 mx-auto rounded bg-slate-400/60 group-hover:w-16 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
