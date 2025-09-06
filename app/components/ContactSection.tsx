import React from "react";
import { PrimaryCTA, SecondaryCTA, TertiaryCTA } from "./CTAButton";

interface ContactSectionProps {
  variant?: "default" | "compact";
  className?: string;
}

export default function ContactSection({
  variant = "default",
  className = "",
}: ContactSectionProps) {
  const isCompact = variant === "compact";

  return (
    <section
      className={`${
        isCompact ? "py-16" : "py-20"
      } bg-gradient-to-r from-brown/20 to-accent/10 ${
        isCompact ? "rounded-2xl" : ""
      } ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isCompact ? "text-center" : ""
        }`}
      >
        <div className={`text-center ${isCompact ? "mb-8" : "mb-16"}`}>
          <h2
            className={`${
              isCompact ? "text-3xl" : "text-4xl"
            } font-bold mb-6 text-accent font-mono`}
          >
            {isCompact
              ? "Ready to Start Your Project?"
              : "Let's Build Your Vision."}
          </h2>
          <p
            className={`${
              isCompact ? "text-lg" : "text-xl"
            } text-gray-300 max-w-3xl mx-auto leading-relaxed`}
          >
            {isCompact
              ? "Let's create something amazing together. Get in touch to discuss your project requirements."
              : "Ready to take the next step? We offer two main paths to get started. Choose the one that best fits your project needs."}
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto ${
            isCompact ? "mb-0" : "mb-8"
          }`}
        >
          {/* Primary CTA - Custom Project */}
          <PrimaryCTA
            href="/booking"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4V3a2 2 0 012-2h4a2 2 0 012 2v4M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            size="lg"
            className="w-full sm:w-auto"
          >
            {isCompact ? "Start a Project" : "Discuss a Custom Project"}
          </PrimaryCTA>

          {/* Secondary CTA - Get in Touch/Services */}
          <SecondaryCTA
            href={isCompact ? "/contact" : "/services"}
            icon={
              isCompact ? undefined : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              )
            }
            size="lg"
            className="w-full sm:w-auto"
          >
            {isCompact ? "Get in Touch" : "View Packages & Pricing"}
          </SecondaryCTA>
        </div>

        {/* WhatsApp Quick Question Link - Only for default variant */}
        {!isCompact && (
          <div className="text-center">
            <TertiaryCTA
              href="https://wa.me/60174062788"
              external
              className="underline underline-offset-4"
            >
              Have a quick question? Chat with us on WhatsApp.
            </TertiaryCTA>
          </div>
        )}
      </div>
    </section>
  );
}
