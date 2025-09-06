"use client";

import React from "react";
import {
  PrimaryCTA,
  SecondaryCTA,
  ArrowRightIcon,
} from "../components/CTAButton";

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
    <div className="min-h-screen bg-olive">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-dark via-olive to-olive-light">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent blur-3xl motion-safe:animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brown blur-3xl motion-safe:animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-accent font-mono">
            We Built a Better Way to Create Websites.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl">
            Strategy, design, and development delivered as one — with no
            handoffs, no disconnects, and no compromise.
          </p>
          {/* CTAs removed for a simplified hero */}
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            <div className="group bg-olive-dark/50 border border-brown/30 rounded-2xl p-8 h-full transition-colors hover:border-accent/60">
              <div className="flex items-center gap-3">
                <span className="text-accent/90 motion-safe:group-hover:animate-ping [animation-iteration-count:1]">
                  <SparkleIcon className="w-5 h-5" />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-accent font-mono">
                  The Problem
                </h2>
              </div>
              <div className="mt-3 h-px bg-brown/30 group-hover:bg-accent/40 transition-colors" />
              <p className="mt-4 text-gray-300 leading-relaxed">
                Tukang Design was founded to solve a single, frustrating problem
                in the web design industry: the costly gap between a great idea
                and a flawless final product. For too long, businesses have been
                caught between designers who understand aesthetics and
                developers who understand code. This disconnect leads to
                compromised vision, missed deadlines, and fragmented websites.
              </p>
            </div>

            <div className="group bg-olive-dark/50 border border-brown/30 rounded-2xl p-8 h-full transition-colors hover:border-accent/60">
              <div className="flex items-center gap-3">
                <span className="text-accent/90 motion-safe:group-hover:animate-bounce">
                  <BoltIcon className="w-5 h-5" />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-accent font-mono">
                  The Solution
                </h2>
              </div>
              <div className="mt-3 h-px bg-brown/30 group-hover:bg-accent/40 transition-colors" />
              <p className="mt-4 text-gray-300 leading-relaxed">
                Our solution is the Full-Stack model. We are a new kind of web
                design studio where strategy, design, and development are
                unified, handled by a single, expert team. No handoffs. No blame
                games. Just a seamless process from the first sketch to the
                final launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-olive-dark/60 border-y border-brown/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-accent font-mono">
            The Philosophy — Why “Tukang”
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            The name 'Tukang' (craftsman) is at the heart of everything we do.
            It represents our commitment to skill, precision, and building
            digital experiences with genuine care. This is the clarity and
            accountability your project deserves.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="group rounded-xl border border-brown/30 bg-olive p-6 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
              <div className="flex items-center gap-2">
                <SparkleIcon className="w-4 h-4 text-accent" />
                <div className="text-accent font-semibold">Craft</div>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                Every detail matters — from typography to transitions to
                semantics.
              </p>
              <div className="mt-4 h-1 w-12 rounded bg-accent/60 group-hover:w-16 transition-all" />
            </div>
            <div className="group rounded-xl border border-brown/30 bg-olive p-6 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-4 h-4 text-accent" />
                <div className="text-accent font-semibold">Clarity</div>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                One accountable team throughout — zero miscommunication.
              </p>
              <div className="mt-4 h-1 w-12 rounded bg-accent/60 group-hover:w-16 transition-all" />
            </div>
            <div className="group rounded-xl border border-brown/30 bg-olive p-6 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
              <div className="flex items-center gap-2">
                <SparkleIcon className="w-4 h-4 text-accent" />
                <div className="text-accent font-semibold">Consistency</div>
              </div>
              <p className="mt-2 text-gray-300 text-sm">
                From first sketch to final launch, the vision stays intact.
              </p>
              <div className="mt-4 h-1 w-12 rounded bg-accent/60 group-hover:w-16 transition-all" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
