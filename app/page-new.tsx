// Enhanced Homepage with Custom Design System
import PortfolioPreview from "./components/portfolio-preview";
import HomePageClient from "./components/homepage-client";

export default function HomePage() {
  return (
    <HomePageClient>
      {/* PORTFOLIO PREVIEW SECTION - Server Component */}
      <PortfolioPreview />
    </HomePageClient>
  );
}
