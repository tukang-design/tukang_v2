"use client";

import React from "react";
import {
  PrimaryCTA,
  SecondaryCTA,
  TertiaryCTA,
  ArrowRightIcon,
} from "../components/CTAButton";
import ContactSection from "../components/ContactSection";
import RegionSelector from "../components/region-selector.js";
import PortfolioPreview from "../components/portfolio-preview";

export default function ClientDemo() {
  return (
    <div className="space-y-16">
      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-mono font-bold text-accent mb-6">
          Buttons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3 p-6 rounded-xl bg-olive-dark/50 border border-accent/10">
            <h3 className="font-semibold text-gray-300">Primary</h3>
            <div className="flex flex-wrap gap-3">
              <PrimaryCTA href="/booking" size="sm">
                Small
              </PrimaryCTA>
              <PrimaryCTA href="/booking" size="md" icon={<ArrowRightIcon />}>
                Medium
              </PrimaryCTA>
              <PrimaryCTA href="/booking" size="lg">
                Large
              </PrimaryCTA>
            </div>
          </div>
          <div className="space-y-3 p-6 rounded-xl bg-olive-dark/50 border border-accent/10">
            <h3 className="font-semibold text-gray-300">Secondary</h3>
            <div className="flex flex-wrap gap-3">
              <SecondaryCTA href="/packages" size="sm">
                Small
              </SecondaryCTA>
              <SecondaryCTA
                href="/packages"
                size="md"
                icon={<ArrowRightIcon />}
              >
                Medium
              </SecondaryCTA>
              <SecondaryCTA href="/packages" size="lg">
                Large
              </SecondaryCTA>
            </div>
          </div>
          <div className="space-y-3 p-6 rounded-xl bg-olive-dark/50 border border-accent/10">
            <h3 className="font-semibold text-gray-300">Tertiary</h3>
            <div className="flex flex-wrap gap-3">
              <TertiaryCTA href="/contact" size="sm">
                Small
              </TertiaryCTA>
              <TertiaryCTA href="/contact" size="md">
                Medium
              </TertiaryCTA>
              <TertiaryCTA href="/contact" size="lg">
                Large
              </TertiaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Sections */}
      <section className="space-y-8">
        <h2 className="text-2xl font-mono font-bold text-accent">
          Contact Sections
        </h2>
        <ContactSection />
        <ContactSection variant="compact" className="bg-transparent" />
      </section>

      {/* Region Selector (explicit) */}
      <section>
        <h2 className="text-2xl font-mono font-bold text-accent mb-4">
          Region Selector
        </h2>
        <div className="p-6 rounded-xl bg-olive-dark/50 border border-accent/10">
          <RegionSelector showSelector={true} onChange={() => {}} />
          <p className="text-sm text-gray-400">
            The floating region indicator also appears globally via layout.
          </p>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section>
        <h2 className="text-2xl font-mono font-bold text-accent mb-6">
          Portfolio Preview
        </h2>
        <div className="p-2 rounded-xl bg-olive-dark/30 border border-accent/10">
          <PortfolioPreview />
        </div>
      </section>
    </div>
  );
}
