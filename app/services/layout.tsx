import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Packages in Malaysia | Tadal Studio",
  description:
    "Clear scope and pricing for Malaysian SMEs. Start small, ship fast, and grow with add-ons or a care plan. One partner from brief to launch.",
  keywords:
    "web design packages malaysia, web development pricing, end-to-end design development, full-stack web services, malaysian web designers",
  openGraph: {
    title: "Web Design Packages in Malaysia | Tadal Studio",
    description:
      "Clear scope and pricing for Malaysian SMEs. Start small, ship fast, and grow with add-ons or a care plan.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/tukang-design-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Tadal Studio – Web Design Packages in Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Packages in Malaysia | Tadal Studio",
    description:
      "Clear scope and pricing for Malaysian SMEs. Start small, ship fast, and grow with add-ons or a care plan.",
    images: ["/tukang-design-social-share.jpg"],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
