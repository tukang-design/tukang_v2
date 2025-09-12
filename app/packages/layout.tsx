import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Packages in Malaysia | TADAL STUDIO",
  description:
    "Clear scope and pricing for Malaysian SMEs. Start small, ship fast, and grow with add-ons or a care plan. One partner from brief to launch.",
  openGraph: {
    title: "Web Design Packages in Malaysia | TADAL STUDIO",
    description:
      "Clear scope and pricing for Malaysian SMEs. Start small, ship fast, and grow with add-ons or a care plan.",
    url: "/packages",
    type: "website",
    images: [
      { url: "/tukang-design-social-share.jpg", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Packages in Malaysia | TADAL STUDIO",
    description:
      "Clear scope and pricing for Malaysian SMEs. Start small, ship fast, and grow with add-ons or a care plan.",
    images: ["/tukang-design-social-share.jpg"],
  },
  alternates: { canonical: "/packages" },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
