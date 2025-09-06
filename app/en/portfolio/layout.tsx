import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Our Web Design & Development Work | Tukang Design",
  description: "Explore our portfolio of successful web design and development projects for Malaysian and Singaporean businesses. See real results from our end-to-end design process.",
  keywords: "web design portfolio malaysia, web development portfolio, tukang design portfolio, malaysian web design examples, singapore web design work",
  openGraph: {
    title: "Portfolio - Our Web Design & Development Work | Tukang Design",
    description: "Explore our portfolio of successful web design and development projects for Malaysian and Singaporean businesses.",
    url: "https://tukang.design/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
