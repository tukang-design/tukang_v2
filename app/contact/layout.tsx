import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact TADAL STUDIO | Plan and Get a Fixed Quote",
  description:
    "Tell us what you want to build. We reply with a plan and a fixed quote. Based in Shah Alam, Malaysia. Working worldwide.",
  openGraph: {
    title: "Contact TADAL STUDIO | Plan and Get a Fixed Quote",
    description:
      "Tell us what you want to build. We reply with a plan and a fixed quote.",
    url: "/contact",
    type: "website",
    images: [
      { url: "/tukang-design-social-share.jpg", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TADAL STUDIO | Plan and Get a Fixed Quote",
    description:
      "Tell us what you want to build. We reply with a plan and a fixed quote.",
    images: ["/tukang-design-social-share.jpg"],
  },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
