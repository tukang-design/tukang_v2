import React from "react";
import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About TADAL STUDIO | Full-Stack Design & Development in Malaysia",
  description:
    "We build credible, conversion-ready websites with strategy, design, and code under one roof. Based in Malaysia, working worldwide.",
  openGraph: {
    title: "About TADAL STUDIO | Full-Stack Design & Development in Malaysia",
    description:
      "We build credible, conversion-ready websites with strategy, design, and code under one roof.",
    url: "/about",
    type: "website",
    images: [
      { url: "/tukang-design-social-share.jpg", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TADAL STUDIO | Full-Stack Design & Development in Malaysia",
    description:
      "We build credible, conversion-ready websites with strategy, design, and code under one roof.",
    images: ["/tukang-design-social-share.jpg"],
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
