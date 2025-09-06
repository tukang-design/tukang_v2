// Enhanced Homepage with Custom Design System
import React from "react";
import PortfolioPreview from "./components/portfolio-preview";
import HomePageClient from "./components/homepage-client";

export const metadata = {
  title: "Tukang Design | Professional Web Design & Development Malaysia",
  description: "Professional web design and development services in Malaysia. End-to-end solutions from design to deployment. Custom websites, e-commerce, and digital solutions that work.",
  openGraph: {
    title: "Tukang Design | Professional Web Design & Development Malaysia",
    description: "Professional web design and development services in Malaysia. End-to-end solutions from design to deployment.",
  },
};

export default function HomePage() {
  return (
    <HomePageClient>
      <PortfolioPreview />
    </HomePageClient>
  );
}
