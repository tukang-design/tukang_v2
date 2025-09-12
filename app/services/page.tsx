"use client";
import React from "react";
import { PrimaryCTA } from "../components/CTAButton";
import { DeliverableIcon } from "../components/Icons";

// Note: Since this is a client component, metadata should be handled in layout.tsx or parent server component
// For analytics tracking, the page title is "Services - Web Design & Development"

export default function ServicesPage() {
  React.useEffect(() => {
    const details = Array.from(
      document.querySelectorAll("details")
    ) as HTMLDetailsElement[];
    const cleanups: Array<() => void> = [];
    details.forEach((d) => {
      const content = d.querySelector(
        ".collapsible-content"
      ) as HTMLElement | null;
      const arrow = d.querySelector(".details-arrow") as HTMLElement | null;
      if (!content) return;

      // prepare content for animated max-height and fade
      content.style.overflow = "hidden";
      content.style.transition = "max-height 220ms cubic-bezier(.2,.9,.2,1)";
      content.classList.add("transition-opacity", "duration-200");
      content.style.maxHeight = d.open ? `${content.scrollHeight}px` : "0px";
      content.classList.toggle("opacity-100", d.open);
      content.classList.toggle("opacity-0", !d.open);
      if (arrow) arrow.classList.toggle("rotate-180", d.open);

      const onToggle = () => {
        if (d.open) {
          // expand
          content.style.maxHeight = `${content.scrollHeight}px`;
          content.classList.remove("opacity-0");
          content.classList.add("opacity-100");
          if (arrow) arrow.classList.add("rotate-180");
        } else {
          // collapse
          content.style.maxHeight = "0px";
          content.classList.remove("opacity-100");
          content.classList.add("opacity-0");
          if (arrow) arrow.classList.remove("rotate-180");
        }
      };

      d.addEventListener("toggle", onToggle);
      cleanups.push(() => d.removeEventListener("toggle", onToggle));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
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
            WEB DESIGN & DEVELOPMENT PACKAGES
          </h1>
          <h4 className="max-w-4xl text-slate-300 font-medium text-lg lg:text-xl mb-8 ml-0 mx-auto">
            Start small, ship fast, and grow with add-ons or a care plan. Prices
            shown are typical for the scope below.
          </h4>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* Step 1: Goal & Tier Selection */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-16 bg-background">
        <div className="mb-8 divide-y gap-y-4 divide-accent/10 flex-wrap">
          {/* Landing Page */}
          <section
            id="landing"
            className="bg-olive-950 p-8 rounded-2xl border border-accent/20 pt-6 pb-6 mb-4"
          >
            <div className="flex items-start justify-between gap-2 mb-4">
              <h3 className="text-3xl font-bold text-accent/80">
                1. Landing Page
              </h3>
              <span className="w-fit text-xs text-slate-100/70 py-1 px-4 bg-brown-500/30 rounded-full">
                Live in 5 - 7 days
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="md:flex-1 text-sm text-gray-300">
                <p className="bg-olive-500/10 p-4 text-xl rounded-lg mb-6 font-medium">
                  A conversion-ready page for one offer that turns visitors into
                  inquiries.
                </p>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <div>
                      <h4 className="font-semibold text-brown-300 mb-2">
                        PROCESS
                      </h4>
                      <div className="text-sm text-gray-300">
                        <ol className="relative border-l border-olive-800 ml-4 lg:ml-8">
                          {/* Step 1 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              1
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                Day 1: Plan
                              </div>
                            </div>
                          </li>
                          {/* Step 2 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              2
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                Day 2: Wireframe
                              </div>
                            </div>
                          </li>
                          {/* Step 3 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              3
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                Day 3: Design
                              </div>
                            </div>
                          </li>
                          {/* Step 4 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              4
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                Day 4: Build
                              </div>
                            </div>
                          </li>
                          {/* Step 6 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              6
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                Day 6: Review & Feedbacks
                              </div>
                            </div>
                          </li>
                          {/* Step 7 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              7
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                Day 5: Launch & Support
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-brown-300 mb-2">
                      DELIVERABLES
                    </h4>
                    <ul className="hidden md:block pl-0 mt-2 space-y-2 text-sm text-gray-300 mb-4">
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>
                          Conversion layout with hero, offer, benefits, proof,
                          FAQ, contact
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>Copy polish and image curation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>Lead capture via form or WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>GA4 events for submit and click</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>SEO basics and OG tags</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>One revision</span>
                      </li>
                    </ul>
                    <details className="md:hidden mb-2 bg-olive-900/30 rounded p-2">
                      <summary className="text-sm text-gray-200 font-medium flex items-center justify-between">
                        Deliverables — tap to expand
                        <svg
                          className="ml-2 w-4 h-4 text-gray-200 details-arrow transition-transform duration-200"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </summary>
                      <ul className="collapsible-content list-none pl-0 mt-2 space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-3">
                          <DeliverableIcon />
                          <span>
                            Conversion layout with hero, offer, benefits, proof,
                            FAQ, contact
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <DeliverableIcon />
                          <span>Copy polish and image curation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <DeliverableIcon />
                          <span>Lead capture via form or WhatsApp</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <DeliverableIcon />
                          <span>GA4 events for submit and click</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <DeliverableIcon />
                          <span>SEO basics and OG tags</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <DeliverableIcon />
                          <span>One revision</span>
                        </li>
                      </ul>
                    </details>

                    <div className="text-sm text-gray-300">
                      <h4 className="font-semibold text-brown-300 mb-2">
                        AVAILABLE ADD-ONS
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Brand Identity Starter
                        </span>
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Content and Copywriting
                        </span>
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Motion
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full bg-olive-900 px-4 py-3 rounded-md mx-auto md:ml-auto gap-4">
              <div className="min-w-[50%] flex text-right items-baseline float-right">
                <div className="text-slate-300 text-xs mr-2">
                  Price starts from
                </div>
                <div className="text-accent/50 text-2xl font-semibold">
                  RM1,500
                </div>
              </div>
              <PrimaryCTA href="/planner?tier=landing" className="min-w-[50%]">
                Plan My Website
              </PrimaryCTA>
            </div>
          </section>

          {/* Business Website */}
          <section
            id="business"
            className="bg-olive-950 p-8 rounded-2xl border border-accent/20 pt-6 pb-6 mb-4"
          >
            <div className="flex items-start justify-between gap-2 mb-4">
              <h3 className="text-3xl font-bold text-accent/80">
                2. Professional Business Website
              </h3>
              <span className="w-fit text-xs text-slate-100/70 py-1 px-4 bg-brown-500/30 rounded-full">
                Live in 10 - 14 days
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="md:flex-1 text-sm text-gray-300">
                <p className="bg-olive-500/10 p-4 text-xl rounded-lg mb-6 font-medium">
                  A trust-building company site that supports campaigns and can
                  grow.
                </p>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <div>
                      <h4 className="font-semibold text-brown-300 mb-2">
                        PROCESS
                      </h4>
                      <div className="text-sm text-gray-300">
                        <ol className="relative border-l border-olive-800 ml-4 lg:ml-8">
                          {/* Week 1 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              1
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                <strong>Week 1:</strong>
                                <ul>
                                  <li>- Information architecture</li>
                                  <li>- Wireframes</li>
                                  <li>- Content assembly</li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          {/* Week 2 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              2
                            </span>
                            <div className="group">
                              <div className="mt-4 text-slate-400 text-sm">
                                <strong>Week 2:</strong>
                                <ul>
                                  <li>- Build</li>
                                  <li>- Quality assurance</li>
                                  <li>- SEO setup</li>
                                  <li>- Launch!</li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-brown-300 mb-2">
                      DELIVERABLES
                    </h4>
                    <ul className="md:block pl-0 mt-2 space-y-2 text-sm text-gray-300 mb-4">
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>
                          Up to 5 pages: Home, About, Services, Work, Contact
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>CMS for editing with Blog or Case Studies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>Contact form with email notifications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>SEO setup, sitemap, basic automation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>Two revisions</span>
                      </li>
                    </ul>

                    <div className="text-sm text-gray-300">
                      <h4 className="font-semibold text-brown-300 mb-2">
                        AVAILABLE ADD-ONS
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Lite Pack Design System
                        </span>
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Analytics and SEO
                        </span>
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Online Store Setup
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full bg-olive-900 px-4 py-3 rounded-md mx-auto md:ml-auto gap-4">
              <div className="min-w-[50%] flex text-right items-baseline float-right">
                <div className="text-slate-300 text-xs mr-2">
                  Price starts from
                </div>
                <div className="text-accent/50 text-2xl font-semibold">
                  RM1,500
                </div>
              </div>
              <PrimaryCTA href="/planner?tier=business" className="min-w-[50%]">
                Plan My Website
              </PrimaryCTA>
            </div>
          </section>

          {/* Custom Web System */}
          <section
            id="custom"
            className="bg-olive-950 p-8 rounded-2xl border border-accent/20 pt-6 pb-6 mb-4"
          >
            <div className="flex items-start justify-between gap-2 mb-4">
              <h3 className="text-3xl font-bold text-accent/80">
                3. Custom Web System
              </h3>
              <span className="w-fit text-xs text-slate-100/70 py-1 px-4 bg-brown-500/30 rounded-full">
                Timeline by scope
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="md:flex-1 text-sm text-gray-300">
                <p className="bg-olive-500/10 p-4 text-xl rounded-lg mb-6 font-medium">
                  Features tailored for bookings, membership, dashboards,
                  workflows, or commerce.
                </p>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <div>
                      <h4 className="font-semibold text-brown-300 mb-2">
                        DISCOVERY AND BUILD
                      </h4>
                      <div className="text-sm text-gray-300">
                        <ol className="relative border-l border-olive-800 ml-4 lg:ml-8">
                          {/* Step 1 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              1
                            </span>
                            <div className="group">
                              <p className="mt-4 text-slate-400 text-sm">
                                Scope workshop and user flows
                              </p>
                            </div>
                          </li>
                          {/* Step 2 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              2
                            </span>
                            <div className="group">
                              <p className="mt-4 text-slate-400 text-sm">
                                Key screens prototype
                              </p>
                            </div>
                          </li>
                          {/* Step 3 */}
                          <li className="mb-6 ml-6">
                            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-olive-950 ring-4 ring-olive-800">
                              3
                            </span>
                            <div className="group">
                              <p className="mt-4 text-slate-400 text-sm">
                                First release build with admin basics and data
                                export
                              </p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-brown-300 mb-2">
                      EXAMPLE MODULE
                    </h4>
                    <ul className="md:block pl-0 mt-2 space-y-2 text-sm text-gray-300 mb-4">
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>
                          Booking rules, slots, confirmations, reminders
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>Memberships and gated content with roles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>
                          Dashboards, reporting, internal tools and admin
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DeliverableIcon />
                        <span>Custom storefronts and checkouts</span>
                      </li>
                    </ul>

                    <div className="text-sm text-gray-300">
                      <h4 className="font-semibold text-brown-300 mb-2">
                        AVAILABLE ADD-ONS
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Payments and Subscriptions
                        </span>
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Analytics and Experiments
                        </span>
                        <span className="text-xs px-3 py-1 bg-olive-900 text-slate-300 rounded-full">
                          Accessibility Review
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full bg-olive-900 px-4 py-3 rounded-md mx-auto md:ml-auto gap-4">
              <div className="min-w-[50%] flex text-right items-baseline float-right">
                <div className="text-slate-300 text-xs mr-2">
                  Price starts from
                </div>
                <div className="text-accent/50 text-2xl font-semibold">
                  RM5,000+
                </div>
              </div>
              <PrimaryCTA href="/planner?tier=advanced" className="min-w-[50%]">
                Plan My Website
              </PrimaryCTA>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
