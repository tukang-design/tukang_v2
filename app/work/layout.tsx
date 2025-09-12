import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Portfolio Malaysia | Selected Projects | TADAL STUDIO",
  description:
    "See selected projects we've delivered for SMEs and startups in Malaysia and beyond. Credible, conversion-focused websites built end-to-end.",
  openGraph: {
    title: "Web Design Portfolio Malaysia | Selected Projects | TADAL STUDIO",
    description:
      "See selected projects we've delivered for SMEs and startups in Malaysia and beyond.",
    url: "/work",
    type: "website",
    images: [
      {
        url: "/tukang-design-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "TADAL STUDIO – Our Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Portfolio Malaysia | Selected Projects | TADAL STUDIO",
    description:
      "See selected projects we've delivered for SMEs and startups in Malaysia and beyond.",
    images: ["/tukang-design-social-share.jpg"],
  },
  alternates: { canonical: "/work" },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
