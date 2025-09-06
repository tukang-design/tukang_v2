import React from "react";
import Link from "next/link";

export default function BookingSteps() {
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
    <section className="bg-gradient-to-r from-brown/20 to-accent/10 border-t border-accent/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-accent">
              Start Your Project
            </h2>
            <p className="text-gray-300 mt-2 text-base sm:text-lg">
              A simple 4‑step process from idea to launch.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/booking"
              className="px-5 py-3 bg-accent text-olive rounded-xl font-bold hover:opacity-90 transition"
            >
              Kick-start a Project
            </Link>
            <Link
              href="https://wa.me/60174062788"
              className="px-5 py-3 border border-accent text-accent rounded-xl font-bold hover:bg-accent/10 transition"
            >
              Chat with Us on WhatsApp
            </Link>
          </div>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((s, i) => (
            <li
              key={i}
              className="group p-5 sm:p-6 rounded-xl bg-olive-dark/50 border border-accent/10 hover:border-accent/30 transition"
            >
              <div className="flex items-center gap-3 text-accent">
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                  {s.icon}
                </div>
                <span className="font-mono text-sm text-gray-400">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
