"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [submissionId, setSubmissionId] = useState<string>("");

  useEffect(() => {
    // Get submission ID from sessionStorage
    const storedSubmissionId = sessionStorage.getItem("bookingSubmissionId");
    if (storedSubmissionId) {
      setSubmissionId(storedSubmissionId);
      // Clear it from sessionStorage after retrieving
      sessionStorage.removeItem("bookingSubmissionId");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-olive-dark via-olive to-olive-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-accent rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 border border-brown-500 rotate-12"
            style={{ animation: "spin 20s linear infinite" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-24 h-24 border border-accent/30 rounded-lg"
            style={{ animation: "bounce 3s ease-in-out infinite" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center shadow-2xl shadow-accent/30">
              <svg
                className="w-12 h-12 text-olive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-accent font-mono mb-6 leading-tight">
            Thank You!
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Your project booking request has been successfully submitted.
          </p>

          {submissionId && (
            <div className="mb-8 p-4 bg-accent/10 rounded-xl border border-accent/20 max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-1">Booking Reference</p>
              <p className="text-lg font-mono text-accent font-semibold">
                {submissionId}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message Card */}
          <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 lg:p-12 mb-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-accent mb-6">
                We've Received Your Request
              </h2>

              <div className="max-w-2xl mx-auto space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Thank you for choosing TADAL STUDIO for your digital project
                  needs. We're excited to help bring your vision to life.
                </p>
                <p>
                  <strong className="text-accent">Next Step:</strong> Please
                  schedule your discovery call below so we can discuss your
                  project requirements and provide you with a detailed proposal.
                </p>
              </div>
            </div>
          </div>

          {/* Google Calendar Scheduling */}
          <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 lg:p-12 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-accent mb-4">
                Schedule Your Discovery Call
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Let's discuss your project in detail. Choose a time that works
                best for you, and we'll dive deep into your requirements,
                timeline, and goals.
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1V0wcP5QyFqmtA8J19rbgQwiGnIH05JiEnsB1VbKDrTdwxfL6w2Ws-apnPGx7ptV8GjvZXX1rt?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule Discovery Call"
              />
            </div>

            <div className="mt-8 text-center">
              <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                <h3 className="font-medium text-accent mb-3">
                  What to expect in your discovery call:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Project scope discussion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Timeline & budget review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Technical requirements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-bold text-accent mb-6">
                Prefer Another Way to Connect?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brown-500/10 rounded-xl p-6 border border-brown-500/20">
                  <div className="text-brown-700 mb-3">📧</div>
                  <h4 className="font-medium text-brown-700 mb-2">Email</h4>
                  <p className="text-sm text-gray-300">studio@tukang.design</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Response within 4 hours
                  </p>
                </div>

                <div className="bg-brown-500/10 rounded-xl p-6 border border-brown-500/20">
                  <div className="text-brown-700 mb-3">📱</div>
                  <h4 className="font-medium text-brown-700 mb-2">WhatsApp</h4>
                  <p className="text-sm text-gray-300">+60 12-345 6789</p>
                  <p className="text-xs text-gray-400 mt-1">Quick messaging</p>
                </div>

                <div className="bg-brown-500/10 rounded-xl p-6 border border-brown-500/20">
                  <div className="text-brown-700 mb-3">💼</div>
                  <h4 className="font-medium text-brown-700 mb-2">LinkedIn</h4>
                  <p className="text-sm text-gray-300">Connect with us</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Professional network
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-8 py-4 bg-olive-dark border border-accent/20 text-accent rounded-xl font-medium transition-all duration-300 hover:border-accent/40 text-center"
            >
              Back to Home
            </Link>

            <Link
              href="/work"
              className="px-8 py-4 bg-olive-dark border border-accent/20 text-accent rounded-xl font-medium transition-all duration-300 hover:border-accent/40 text-center"
            >
              View Our Work
            </Link>

            <Link
              href="/blog"
              className="px-8 py-4 bg-olive-dark border border-accent/20 text-accent rounded-xl font-medium transition-all duration-300 hover:border-accent/40 text-center"
            >
              Read Our Blog
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Join our satisfied clients</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-accent font-mono text-lg">⭐⭐⭐⭐⭐</div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-400 text-sm">
                50+ Projects Completed
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-400 text-sm">
                100% Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
