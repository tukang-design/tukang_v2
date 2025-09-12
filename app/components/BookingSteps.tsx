"use client";
import React from "react";
import Link from "next/link";
import { SecondaryCTA, WhatsAppCTA } from "./CTAButton";
import { usePathname } from "next/navigation";

export default function BookingSteps() {
  const pathname = usePathname();
  if (pathname?.startsWith("/contact")) return null;
  const steps = [
    {
      title: "Tell Us About Your Project",
      desc: "What is your primary goals? Do you have specific features in mind?",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
      ),
    },
    {
      title: "Get a Tailored Quote",
      desc: "Receive instant pricing based on your needs. No waiting.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 14l2 2 4-4M7 7h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
          />
        </svg>
      ),
    },
    {
      title: "Kick-off & Launch",
      desc: "We design, develop, test, and deploy—end to end.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="p-8 sm:py-8 bg-brown-400/25 border rounded-xl border-brown-100/10 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-brown-300">
              Need help getting started?
            </h2>
            <p className="text-brown-500 mt-2 text-base sm:text-lg">
              Reach out and we'll help you figure it out.
            </p>
          </div>
          <div className="flex gap-3">
            <SecondaryCTA href="/contact">Contact Us</SecondaryCTA>
            <WhatsAppCTA href="https://wa.me/60174062788" external>
              WhatsApp Us
            </WhatsAppCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
