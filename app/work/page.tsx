import PortfolioPage from "../portfolio/page";

export default function WorkPage() {
  // Reuse the portfolio listing component
  // If needed later, we can vary copy/H1 by route via a prop or segment
  // but for now, share the implementation.
  // The metadata is handled in this route's layout for canonical URL.
  // PortfolioPage fetches and renders the projects.
  return <PortfolioPage />;
}
