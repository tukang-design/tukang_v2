"use client";
import React from "react";
import { useState, useEffect } from "react";
import RegionSelector from "./region-selector";
import {
  PrimaryCTA,
  SecondaryCTA,
  ArrowDownIcon,
} from "../components/CTAButton";
import ContactSection from "../components/ContactSection";
import ClayBrowserMockup from "./ClayBrowserMockup";
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

interface HomePageClientProps {
  children?: React.ReactNode;
}

export default function HomePageClient({ children }: HomePageClientProps) {
  const [region, setRegion] = useState("INT"); // Default to international while detecting
  const [animationStarted, setAnimationStarted] = useState(false);
  const [marqueeRunning, setMarqueeRunning] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    const runTimer = setTimeout(() => setMarqueeRunning(true), 900);
    return () => {
      clearTimeout(timer);
      clearTimeout(runTimer);
    };
  }, []);

  // Animation words for the homepage headline
  const homepageHeadlineWords = [
    { text: "GET YOUR", color: "text-accent/20", delay: 0 },
    { text: "BUSINESS ONLINE", color: "text-accent/40", delay: 300 },
    { text: "THE RIGHT WAY", color: "text-accent/80", delay: 700 },
  ];

  return (
    <div className="min-h-screen bg-olive">
      {/* REGION DETECTION - Hidden, automatic */}
      <RegionSelector onChange={setRegion} showSelector={false} />

      <style jsx global>{`
        @keyframes bounceCustom {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-custom {
          animation: bounceCustom 4s infinite;
        }
        @keyframes slideUpFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-word {
          opacity: 0;
          transform: translateY(30px);
          display: inline-block;
          animation: slideUpFadeIn 0.8s ease-out forwards;
        }
        .animate-subtitle {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUpFadeIn 0.8s ease-out 1s forwards;
        }
        /* Marquee banners */
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .marquee-container {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          width: 200%; /* two copies side-by-side */
        }
        /* Initial slide-in wrappers */
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .marquee-slide-left.is-in {
          animation: slideInLeft 700ms ease-out both;
        }
        .marquee-slide-right.is-in {
          animation: slideInRight 700ms ease-out both;
        }
        .marquee-left .marquee-track.running {
          animation: marqueeLeft 40s linear infinite;
        }
        .marquee-right .marquee-track.running {
          animation: marqueeRight 40s linear infinite;
        }
        .banner-segment {
          display: flex;
          gap: 1rem;
          align-items: center;
          white-space: nowrap;
          width: 50%;
          justify-content: space-around;
          padding: 0.6rem 0;
        }
        /* Mockup slide + staged content */
        @keyframes mockupSlideUp {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .mockup-slide-in {
          animation: mockupSlideUp 700ms ease-out both;
        }
        .mockup-stage-1 {
          animation: slideUpFadeIn 0.8s ease-out 0.8s both;
        }
        .mockup-stage-2 {
          animation: slideUpFadeIn 0.8s ease-out 1.1s both;
        }
        .mockup-stage-3 {
          animation: slideUpFadeIn 0.8s ease-out 1.4s both;
        }
      `}</style>
      {/* HERO SECTION - AWARENESS */}
      <section className="relative max-h-[80dvh] overflow-visible pt-12">
        <div className="absolute inset-0 bg-olive-950 opacity-90"></div>
        <ClayBrowserMockup
          className={`relative py-4 lg:py-6 ${
            animationStarted ? "mockup-slide-in" : "opacity-0"
          }`}
        >
          <div className="flex flex-col justify-evenly min-h-[600px] md:min-h-[560px] text-center px-4">
            {/* Main Headline with Animated Text Reveal */}
            <h1 className="max-w-7xl mx-auto text-4xl lg:text-7xl font-bold font-mono leading-tight mockup-stage-2">
              {homepageHeadlineWords.map((word, index) => (
                <span
                  key={index}
                  className={`animate-word ${word.color} mr-3`}
                  style={{
                    animationDelay: animationStarted
                      ? `${word.delay}ms`
                      : "9999s",
                  }}
                >
                  {word.text}
                  {index === 1 && <br />} {/* Line break after "Vision," */}
                </span>
              ))}
            </h1>
            {/* Subheadline */}
            <p
              className={`text-xl text-gray-300 font-normal max-w-3xl mx-auto leading-relaxed mockup-stage-3 ${
                animationStarted ? "" : "opacity-0"
              }`}
            >
              Strategy, design, and code in one team. Launch fast with pricing
              you can plan for.
            </p>

            {/* CTA inside mockup footer area */}
            <div className="pt-4 flex items-center justify-center gap-4 mb-8">
              <PrimaryCTA href="/planner">Plan My Website</PrimaryCTA>
              <SecondaryCTA
                href="/packages"
                icon={
                  <ArrowDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
                }
              >
                View Packages
              </SecondaryCTA>
            </div>

            {/* Trust Badge */}
            <div
              className={`flex flex-wrap items-center justify-center gap-2 text-center mockup-stage-3 mb-40 md:mb-20 ${
                animationStarted ? "" : "opacity-0"
              }`}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-olive-800/70 border border-olive-400/50 text-slate-100 text-sm shadow-sm backdrop-blur-sm hover:border-olive-300/60 transition-colors max-w-fit"
                role="listitem"
                aria-label="Transparent pricing from RM1,500"
              >
                <span className="material-symbols-outlined text-accent/50 text-xs leading-none">
                  price_check
                </span>
                <span className="font-normal">Transparent pricing</span>
              </div>

              <div
                className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-olive-800/70 border border-olive-400/50 text-slate-100 text-sm shadow-sm backdrop-blur-sm hover:border-olive-300/60 transition-colors max-w-fit"
                role="listitem"
                aria-label="7 day delivery option"
              >
                <span className="material-symbols-outlined text-accent/50 text-xs leading-none">
                  schedule
                </span>
                <span className="font-medium">Go-Live in 7 Days</span>
              </div>

              <div
                className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-olive-800/70 border border-olive-400/50 text-slate-100 text-sm shadow-sm backdrop-blur-sm hover:border-olive-300/60 transition-colors max-w-fit"
                role="listitem"
                aria-label="Remote friendly across time zones"
              >
                <span className="material-symbols-outlined text-accent/50 text-xs leading-none">
                  public
                </span>
                <span className="font-medium">Available Worldwide</span>
              </div>
            </div>
          </div>
        </ClayBrowserMockup>
      </section>

      {/* POSITIONING */}
      <section className="relative z-20 pt-20 pb-20 bg-background">
        <div className="max-w-7xl mx-auto relative z-10 px-6 sm:px-8">
          <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6 text-slate-200 font-mono">
              Built to Ship
            </h2>
            <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed font-semibold mb-4">
              We are a full-stack design and development studio. Our team
              backgrounds span more than 10 years across agencies, corporate
              initiatives, Big 4 consulting, GLCs, and MNCs.{" "}
            </p>
            <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed font-semibold">
              We exist to remove handoff gaps so business owners get a site that
              looks right and works right.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="group rounded-xl border bg-slate-950 border-slate-600 p-6 py-8 text-center transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
              <div className="flex w-fit items-center gap-2 mx-auto">
                <SparkleIcon className="w-4 h-4 text-slate-500" />
                <div className="text-slate-100 font-semibold">
                  One team from strategy to ship
                </div>
              </div>
              <p className="mt-2 text-slate-400 text-sm">
                No gaps between branding, UX, and development. Decisions stay
                aligned throughout the project lifecycle.
              </p>
              <div className="mt-4 h-1 w-12 mx-auto rounded bg-slate-400/60 group-hover:w-16 transition-all" />
            </div>
            <div className="group rounded-xl border bg-slate-950 border-slate-600 p-6 py-8 text-center transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
              <div className="flex w-fit items-center gap-2 mx-auto">
                <BoltIcon className="w-4 h-4 text-slate-500" />
                <div className="text-slate-100 font-semibold">
                  Built for clarity and conversion
                </div>
              </div>
              <p className="mt-2 text-slate-400 text-sm">
                Information architecture, persuasive copy, and fast pages that
                support campaign performance and conversions.
              </p>
              <div className="mt-4 h-1 w-12 mx-auto rounded bg-slate-400/60 group-hover:w-16 transition-all" />
            </div>
            <div className="group rounded-xl border bg-slate-950 border-slate-600 p-6 py-8 text-center transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
              <div className="flex w-fit items-center gap-2 mx-auto">
                <SparkleIcon className="w-4 h-4 text-slate-500" />
                <div className="text-slate-100 font-semibold">
                  Global delivery, local practicality
                </div>
              </div>
              <p className="mt-2 text-slate-400 text-sm">
                Prices shown in MYR. Quotes and invoices available in USD or
                SGD. Meetings scheduled in MYT with options for Europe, MENA,
                and APAC.
              </p>
              <div className="mt-4 h-1 w-12 mx-auto rounded bg-slate-400/60 group-hover:w-16 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* WIP Content / Don't Remove */}

      {/* SERVICE TIERS - pulled from services page */}
      <section className="w-full px-6 sm:px-8 py-16 bg-olive-950 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Start Here
        </h2>
        <p className="text-gray-300 mb-8">
          Choose a pillar, then add optional add-ons as needed.
        </p>
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-3 gap-8 mb-8">
          {/* Tier 1: Landing */}
          <div className="text-left bg-olive-950 p-8 rounded-2xl border border-accent/20 flex flex-col h-full">
            <div className="mb-4">
              <div className="w-16 h-16 bg-brown-400/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brown-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-1 text-brown-400">
                Launch Landing Page
              </h3>
              <p className="text-slate-300 text-md leading-relaxed">
                A focused page that explains your offer and captures leads.
              </p>
            </div>
            <span className="w-fit text-xs text-accent/50 py-1 px-4 bg-accent/10 rounded-full mb-6">
              Launch in 5 - 7 days
            </span>

            <div className="bg-olive-900 px-4 py-3 rounded-xl flex items-center gap-4 justify-between mt-auto">
              <p className="text-slate-300 text-xs">Price starts from </p>
              <p className="text-brown-400 text-lg">RM1,500</p>
            </div>
          </div>

          {/* Tier 2: Business */}
          <div className="text-left bg-olive-950 p-8 rounded-2xl border border-accent/20 flex flex-col h-full">
            <div className="mb-4">
              <div className="w-16 h-16 bg-brown-400/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brown-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-1 text-brown-400">
                Professional Website
              </h3>
              <p className="text-slate-300 text-md leading-relaxed">
                A trust-building company site ready for campaigns.
              </p>
            </div>
            <span className="w-fit text-xs text-accent/50 py-1 px-4 bg-accent/10 rounded-full mb-6">
              Launch in 10 - 14 days
            </span>
            <div className="bg-olive-900 px-4 py-3 rounded-xl flex items-center gap-4 justify-between mt-auto">
              <p className="text-slate-300 text-xs">Price starts from </p>
              <p className="text-accent/50 text-lg">RM3,000</p>
            </div>
          </div>

          {/* Tier 3: Advanced */}
          <div className="text-left bg-olive-950 p-8 rounded-2xl border border-accent/20 flex flex-col h-full">
            <div className="mb-4">
              <div className="w-16 h-16 bg-brown-400/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brown-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-1 text-brown-400">
                Custom Web System
              </h3>
              <p className="text-slate-300 text-md leading-relaxed">
                Features tailored for bookings, membership, dashboards, or
                internal workflows.
              </p>
            </div>
            <span className="w-fit text-xs text-slate-400/50 py-1 px-4 bg-slate-400/10 rounded-full mb-6">
              Timeline by project scope
            </span>

            <div className="bg-olive-900 px-4 py-3 rounded-xl flex items-center gap-4 justify-between mt-auto">
              <p className="text-slate-300 text-xs">Price starts from </p>
              <p className="text-accent/50 text-lg">RM5,000+</p>
            </div>
          </div>
        </div>
        <SecondaryCTA href="/packages">See Package Details</SecondaryCTA>
      </section>

      {/* FROM PLAN TO LAUNCH - two-column sticky left + vertical timeline */}
      <section className="py-16 bg-olive max-h-[95%]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: sticky title + copy */}
            <div className="lg:col-span-6 max-h-fit">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-accent">
                  From Plan to Launch
                </h2>
                <p className="text-lg text-gray-300 max-w-lg leading-relaxed mb-6">
                  A focused, repeatable process that aligns goals, designs
                  solutions, and ships measurable results — with minimal
                  friction for business owners.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  We break work into clear phases so scope, risk, and timelines
                  are all visible from day one.
                </p>
                <div className="flex gap-3">
                  <PrimaryCTA href="/planner">Plan My Website</PrimaryCTA>
                  <SecondaryCTA
                    href="https://calendar.app.google/SrBsskVewCfjWUv16"
                    external
                  >
                    Start Discovery
                  </SecondaryCTA>
                </div>
              </div>
            </div>

            {/* Right: responsive vertical timeline */}
            <div className="lg:col-span-6 h-auto">
              <ol className="relative border-l border-olive-800 ml-4 lg:ml-8">
                {/* Step 1 */}
                <li className="mb-10 ml-10">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800 mt-4">
                    1
                  </span>
                  <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                    <div className="flex w-fit gap-2">
                      <div className="text-slate-100 font-semibold">
                        Discover
                      </div>
                    </div>
                    <p className="mt-2 text-slate-400 text-sm">
                      Align goals, audience, scope and success metrics in a
                      short discovery session. We capture must-haves and
                      nice-to-haves and produce a concise brief.
                    </p>
                  </div>
                </li>
                {/* Step 2 */}
                <li className="mb-10 ml-10">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800 mt-4">
                    2
                  </span>
                  <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                    <div className="flex w-fit gap-2">
                      <div className="text-slate-100 font-semibold">Design</div>
                    </div>
                    <p className="mt-2 text-slate-400 text-sm">
                      We map information architecture, produce wireframes and
                      high-fidelity screens, and validate interactions with a
                      prototype so stakeholders can preview the flow.
                    </p>
                  </div>
                </li>
                {/* Step 3 */}
                <li className="mb-10 ml-10">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800 mt-4">
                    3
                  </span>
                  <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                    <div className="flex w-fit gap-2">
                      <div className="text-slate-100 font-semibold">Build</div>
                    </div>
                    <p className="mt-2 text-slate-400 text-sm">
                      Implement components and pages, connect integrations, and
                      run QA. We deliver incremental builds so you can review
                      early and often.
                    </p>
                  </div>
                </li>
                {/* Step 4 */}
                <li className="mb-10 ml-10">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800 mt-4">
                    4
                  </span>
                  <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                    <div className="flex w-fit gap-2">
                      <div className="text-slate-100 font-semibold">Launch</div>
                    </div>
                    <p className="mt-2 text-slate-400 text-sm">
                      Configure domain, analytics, tracking, and handover. We
                      support the initial launch window and monitor health.
                    </p>
                  </div>
                </li>
                {/* Step 5 */}
                <li className="mb-10 ml-10">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800 mt-4">
                    5
                  </span>
                  <div className="group rounded-xl border bg-slate-950 border-slate-600 p-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                    <div className="flex w-fit gap-2">
                      <div className="text-slate-100 font-semibold">
                        Support
                      </div>
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
        </div>
      </section>

      {/* PORTFOLIO PREVIEW SECTION - CONSIDERATION */}
      <section className="w-full py-16 bg-olive-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Right Column - Portfolio Showcase (2/3 width) */}
          <div className="lg:col-span-8">
            {/* Portfolio Preview Component */}
            {children}
          </div>
        </div>
      </section>

      {/* PACKAGES/FAQ SECTION - replaced with FAQs per request */}
      <section id="packages" className="relative z-20 py-16 bg-olive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-accent font-mono leading-tight">
              FAQs
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 text-left text-gray-300">
            <details
              className="bg-olive-950/30 border border-olive-800/40 rounded-lg p-4"
              open={openFAQ === 0}
            >
              <summary
                className="cursor-pointer font-semibold text-white text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === 0 ? null : 0);
                }}
              >
                Do you work with clients outside Malaysia?
              </summary>
              <div className="mt-2">
                <p>
                  Yes. Remote delivery is standard. We handle multi-currency
                  invoices and schedule across time zones.
                </p>
                <div className="mt-3">
                  <PrimaryCTA
                    href="https://calendar.app.google/SrBsskVewCfjWUv16"
                    external
                  >
                    Schedule a discovery call
                  </PrimaryCTA>
                </div>
              </div>
            </details>

            <details
              className="bg-olive-950/30 border border-olive-800/40 rounded-lg p-4"
              open={openFAQ === 1}
            >
              <summary
                className="cursor-pointer font-semibold text-white text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === 1 ? null : 1);
                }}
              >
                How fast can we launch?
              </summary>
              <div className="mt-2">
                <p>
                  Landing Page 5 to 7 days. Professional Website 10 to 14 days.
                  Custom timelines depend on scope.
                </p>
                <div className="mt-3 flex gap-3">
                  <SecondaryCTA href="/planner?tier=landing">
                    Estimate Landing
                  </SecondaryCTA>
                  <SecondaryCTA href="/planner?tier=business">
                    Estimate Professional
                  </SecondaryCTA>
                </div>
              </div>
            </details>

            <details
              className="bg-olive-950/30 border border-olive-800/40 rounded-lg p-4"
              open={openFAQ === 2}
            >
              <summary
                className="cursor-pointer font-semibold text-white text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === 2 ? null : 2);
                }}
              >
                Do you write the copy?
              </summary>
              <div className="mt-2">
                <p>
                  Yes. We refine your draft and supply sections that convert.
                </p>
              </div>
            </details>

            <details
              className="bg-olive-950/30 border border-olive-800/40 rounded-lg p-4"
              open={openFAQ === 3}
            >
              <summary
                className="cursor-pointer font-semibold text-white text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === 3 ? null : 3);
                }}
              >
                Can I update the site myself?
              </summary>
              <div className="mt-2">
                <p>Yes. CMS is included for Professional Website and above.</p>
                <div className="mt-3">
                  <SecondaryCTA href="/packages">
                    Learn about Professional Website
                  </SecondaryCTA>
                </div>
              </div>
            </details>

            <details
              className="bg-olive-950/30 border border-olive-800/40 rounded-lg p-4"
              open={openFAQ === 4}
            >
              <summary
                className="cursor-pointer font-semibold text-white text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === 4 ? null : 4);
                }}
              >
                What tools do you use?
              </summary>
              <div className="mt-2">
                <p>
                  Modern web stack with production-ready workflows. We integrate
                  analytics, SEO, and key third-party services.
                </p>
              </div>
            </details>

            <details
              className="bg-olive-950/30 border border-olive-800/40 rounded-lg p-4"
              open={openFAQ === 5}
            >
              <summary
                className="cursor-pointer font-semibold text-white text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === 5 ? null : 5);
                }}
              >
                What are the payment terms?
              </summary>
              <div className="mt-2">
                <p>
                  Fifty percent to start, fifty percent on launch. Bank transfer
                  in Malaysia. Stripe or Wise for international payments.
                </p>
                <div className="mt-3">
                  <PrimaryCTA href="/contact">Get a quote</PrimaryCTA>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
