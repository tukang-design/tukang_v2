import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Solutions | TADAL STUDIO",
  description:
    "Technologies we support, payment options, and common problems we solve for web projects.",
  openGraph: {
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
};

export default function SolutionsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Hero (matching About page hero styles) */}
      <section className="relative overflow-hidden bg-olive-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-slate-500 blur-3xl motion-safe:animate-pulse" />
          <div className="absolute -bottom-36 -left-36 w-[400px] h-[400px] rounded-full bg-brown-900 blur-3xl motion-safe:animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24">
          <h1 className="text-4xl md:text-6xl font-normal text-accent/30 tracking-widest font-mono mb-2">
            SOLUTIONS
          </h1>
          <h4 className="max-w-4xl text-slate-300 font-medium text-lg lg:text-xl mb-8 ml-0 mx-auto">
            We match the stack to your goals, team, and budget. This page lists
            the technologies we support, how you can pay for projects, and what
            problems we solve. For deliverables and prices, see{" "}
            <Link href="/packages" className="underline">
              Packages
            </Link>
            .
          </h4>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* Tech we use */}
      <section id="tech" className="space-y-4">
        <h2 className="text-2xl font-mono font-bold text-accent">
          Tech we use
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-accent/20 bg-olive-dark/40 p-4">
            <h3 className="text-lg font-semibold text-foreground">
              Site builders
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-300">
              <li>Webflow</li>
              <li>Framer</li>
            </ul>
          </div>

          <div className="rounded-xl border border-accent/20 bg-olive-dark/40 p-4">
            <h3 className="text-lg font-semibold text-foreground">CMS</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-300">
              <li>WordPress</li>
              <li>Sanity</li>
            </ul>
          </div>

          <div className="rounded-xl border border-accent/20 bg-olive-dark/40 p-4">
            <h3 className="text-lg font-semibold text-foreground">
              E-commerce
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-300">
              <li>WooCommerce</li>
              <li>Shopify</li>
            </ul>
          </div>

          <div className="rounded-xl border border-accent/20 bg-olive-dark/40 p-4">
            <h3 className="text-lg font-semibold text-foreground">
              Frontend frameworks
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-300">
              <li>Next.js</li>
              <li>Astro</li>
            </ul>
          </div>

          <div className="rounded-xl border border-accent/20 bg-olive-dark/40 p-4">
            <h3 className="text-lg font-semibold text-foreground">
              Hosting and deploy
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-300">
              <li>Vercel</li>
            </ul>
          </div>

          <div className="rounded-xl border border-accent/20 bg-olive-dark/40 p-4">
            <h3 className="text-lg font-semibold text-foreground">Payments</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-300">
              <li>Stripe</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Payments */}
      <section id="payments" className="space-y-4">
        <h2 className="text-2xl font-mono font-bold text-accent">
          Payment options
        </h2>
        <div className="space-y-3 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-foreground">Installments</h4>
            <p>
              Spread project payments over 6 or 12 months. A small installment
              fee applies. Full details appear in your proposal.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">
              Care and growth plans
            </h4>
            <p>
              Monthly plans to keep your site secure, fast, and improving with
              updates, backups, small edits, and periodic reviews.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Currencies</h4>
            <p>Default in MYR. Quotes and invoices available in USD or SGD.</p>
          </div>
        </div>
      </section>

      {/* Problems we solve */}
      <section id="problems" className="space-y-4">
        <h2 className="text-2xl font-mono font-bold text-accent">
          What we fix
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
          <li>
            Fragmented vendors and handoffs that break intent from design to
            build
          </li>
          <li>Unclear pricing and slow cycles that stall launches</li>
          <li>Stacks chosen for the wrong job</li>
        </ul>
        <p className="text-sm text-gray-300 max-w-2xl">
          One team aligns strategy, design, and code so your site looks right
          and works right.
        </p>
      </section>

      {/* FAQs */}
      <section id="faqs" className="space-y-4">
        <h2 className="text-2xl font-mono font-bold text-accent">FAQs</h2>

        <div className="space-y-3">
          <details className="bg-olive-dark/40 border border-accent/20 rounded-xl p-4">
            <summary className="font-medium">
              Can you work with our existing stack
            </summary>
            <div className="mt-2 text-sm text-gray-300">
              Yes. We extend or stabilize Webflow, WordPress, Shopify, and
              headless setups.
            </div>
          </details>

          <details className="bg-olive-dark/40 border border-accent/20 rounded-xl p-4">
            <summary className="font-medium">Will this scale later</summary>
            <div className="mt-2 text-sm text-gray-300">
              Yes. We plan for migration paths and future features.
            </div>
          </details>

          <details className="bg-olive-dark/40 border border-accent/20 rounded-xl p-4">
            <summary className="font-medium">Where do I see prices</summary>
            <div className="mt-2 text-sm text-gray-300">
              On the Packages pages. Your estimate is finalized after using the
              Project Planner.
            </div>
          </details>
        </div>
      </section>

      {/* Next steps */}
      <section id="next" className="space-y-4">
        <h2 className="text-2xl font-mono font-bold text-accent">Next steps</h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-300">
          <li>
            Review{" "}
            <Link href="/packages" className="underline">
              Packages
            </Link>{" "}
            to compare deliverables
          </li>
          <li>
            Use the{" "}
            <Link href="/planner" className="underline">
              Project Planner
            </Link>{" "}
            to get a tailored estimate and timeline
          </li>
        </ol>
      </section>
    </main>
  );
}
