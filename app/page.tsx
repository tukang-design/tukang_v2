// Enhanced Homepage with Custom Design System
import React from "react";
import PortfolioPreview from "./components/portfolio-preview";
import HomePageClient from "./components/homepage-client";

export default function HomePage() {
  return (
    <HomePageClient>
      <PortfolioPreview />
    </HomePageClient>
  );
}
