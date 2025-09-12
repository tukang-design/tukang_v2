// Enhanced Homepage with Custom Design System
/** بِسْمِ الله — build good things that serve people **/
import React from "react";
import type { Metadata } from "next";
import PortfolioPreview from "./components/portfolio-preview";
import HomePageClient from "./components/homepage-client";

export const metadata: Metadata = {
  title: "End-to-End Web Design & Development | Tadal Studio",
  description:
    "Seamless, end-to-end web design and development for SMEs. Strategy, design, code, and launch handled by one expert team.",
  openGraph: {
    title: "End-to-End Web Design & Development | Tadal Studio",
    description: "Seamless, end-to-end web design and development for SMEs.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/tukang-design-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Tadal Studio – End-to-End Web Design & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "End-to-End Web Design & Development | Tadal Studio",
    description: "Seamless, end-to-end web design and development for SMEs.",
    images: ["/tukang-design-social-share.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <HomePageClient>
      <PortfolioPreview />
    </HomePageClient>
  );
}
