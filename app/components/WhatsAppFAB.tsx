"use client";
import React from "react";
import { usePathname } from "next/navigation";

const WA_NUMBER_INTL = "60174062788"; // +60 17 406 2788

type QuickOption = {
  id: string;
  label: string;
  buildMessage: (ctx: { url: string }) => string;
};

const OPTIONS: QuickOption[] = [
  {
    id: "tiered",
    label: "Tiered packages",
    buildMessage: ({ url }) =>
      `Hi TADAL, I'm exploring your tiered packages (Landing / Business / Custom). Could you help me pick the right one for my needs?\n\nI'm currently on: ${url}`,
  },
  {
    id: "booking",
    label: "Booking system",
    buildMessage: ({ url }) =>
      `Hi TADAL, I'd like a booking system for my website. Can you share what's included and typical timelines/costs?\n\nPage: ${url}`,
  },
  {
    id: "store",
    label: "Online store",
    buildMessage: ({ url }) =>
      `Hi TADAL, I'm interested in an online store setup. I'd love to understand payment options, shipping, and management.\n\nI was viewing: ${url}`,
  },
  {
    id: "blogcms",
    label: "Blog / CMS",
    buildMessage: ({ url }) =>
      `Hi TADAL, I'm considering a blog/CMS to manage content. Could you outline what's included and the editor experience?\n\nLink: ${url}`,
  },
  {
    id: "tech_perf",
    label: "Technical — SEO/Performance",
    buildMessage: ({ url }) =>
      `Hi TADAL, I'd like to discuss technical SEO/performance for a site. What optimizations and audit support do you provide?\n\nRef: ${url}`,
  },
  {
    id: "tech_host",
    label: "Technical — Hosting/Stack",
    buildMessage: ({ url }) =>
      `Hi TADAL, can we talk about your hosting and tech stack recommendations, maintenance, and security?\n\nRef: ${url}`,
  },
  {
    id: "payment",
    label: "Payment terms",
    buildMessage: () =>
      `Hi TADAL, could you share your payment terms and installment options (6/12 months)?`,
  },
  {
    id: "general",
    label: "General question",
    buildMessage: ({ url }) =>
      `Hi TADAL, I have a quick question about your packages.\n\nContext: ${url}`,
  },
];

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function WhatsAppFAB() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : pathname || "/";

  // Allow other components to open the FAB programmatically
  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    window.addEventListener("open-wa-fab", onOpen);
    window.addEventListener("close-wa-fab", onClose);
    return () => {
      window.removeEventListener("open-wa-fab", onOpen);
      window.removeEventListener("close-wa-fab", onClose);
    };
  }, []);

  return (
    <div className="fixed z-50 bottom-5 right-5 md:bottom-6 md:right-6">
      <div className="relative">
        {/* Panel: left-anchored from the FAB (always mounted for smooth transitions) */}
        <div
          className={
            `absolute bottom-0 right-0 w-[92vw] max-w-[340px] rounded-xl border border-olive-600 bg-olive-950/70 backdrop-blur shadow-xl p-3 ` +
            `transition-all duration-200 ease-out ` +
            (open
              ? `opacity-100 translate-x-0 scale-100 pointer-events-auto`
              : `opacity-0 translate-x-2 scale-95 pointer-events-none`)
          }
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold text-foreground/80 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] align-middle">
                quickreply
              </span>
              Quick inquiry
            </div>
            <button
              aria-label="Close quick inquiry"
              className="rounded p-1 text-foreground/60 hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {OPTIONS.map((o) => (
              <button
                key={o.id}
                className="group flex items-center gap-2 rounded-lg border border-olive-700/70 bg-olive-950 px-3 py-2 text-left text-sm text-foreground hover:border-accent/60 hover:shadow-[0_0_0_2px_rgba(57,255,20,0.2)]"
                onClick={() => {
                  const msg = o.buildMessage({ url: currentUrl });
                  openWhatsApp(msg);
                  setOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-[18px] opacity-80 group-hover:opacity-100">
                  {iconFor(o.id)}
                </span>
                <span>{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button
          aria-label="Chat on WhatsApp"
          onClick={() => setOpen((v) => !v)}
          className={
            `flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 ` +
            (open
              ? `opacity-0 scale-90 pointer-events-none`
              : `opacity-100 scale-100`)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
            aria-hidden
          >
            <path d="M20.52 3.48A11.78 11.78 0 0012.02 0C5.46 0 .2 5.26.2 11.74c0 2.07.54 4.09 1.57 5.88L0 24l6.55-1.72a11.7 11.7 0 005.47 1.39h.01c6.55 0 11.82-5.26 11.82-11.74 0-3.14-1.23-6.08-3.33-8.28zM12.03 21.2h-.01a9.44 9.44 0 01-4.81-1.32l-.34-.2-3.89 1.02 1.04-3.79-.22-.35a9.38 9.38 0 01-1.47-5.09c0-5.19 4.24-9.42 9.45-9.42 2.52 0 4.89.98 6.68 2.76 1.78 1.78 2.76 4.15 2.76 6.66 0 5.19-4.24 9.42-9.45 9.42zm5.49-7.08c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.36.22-.66.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.34.45-.5.15-.17.2-.28.3-.48.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.94-2.24-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.52.07-.8.37-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.43.25-.71.25-1.32.17-1.43-.07-.11-.27-.18-.57-.33z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function iconFor(id: string): string {
  switch (id) {
    case "tiered":
      return "category";
    case "booking":
      return "event";
    case "store":
      return "storefront";
    case "blogcms":
      return "article";
    case "tech_perf":
      return "speed";
    case "tech_host":
      return "dns";
    case "payment":
      return "payments";
    default:
      return "help";
  }
}
