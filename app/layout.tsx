import React from "react";
import "./globals.css";
import NavigationBar from "./components/NavigationBar.simple";
import Footer from "./components/Footer";
import GlobalBookingSteps from "./components/GlobalBookingSteps";
import RegionIndicator from "./components/RegionIndicator";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "../components/GoogleTagManager";
import { SEO } from "../components/SEO";
import {
  createBusinessStructuredData,
  createWebsiteStructuredData,
} from "../lib/structuredData";

export const metadata = {
  // Ensure absolute URL resolution for OG/Twitter
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://tukang.design"
  ),
  title:
    "Tukang Design - End-to-End Design & Development | Full-stack Designer Malaysia",
  description:
    "Get end-to-end design & development services in Malaysia & Singapore. Tukang Design offers full-stack design solutions, custom web development, and complete digital experiences from Shah Alam. Fast delivery, competitive pricing. Get your quote today!",
  keywords:
    "end-to-end design development, full-stack designer malaysia, web design shah alam, complete digital solutions, custom web development, full-stack development malaysia, design to development services",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Tukang Design - End-to-End Design & Development",
    description:
      "Get end-to-end design & development services in Malaysia & Singapore. Tukang Design offers full-stack design solutions and complete digital experiences from Shah Alam.",
    url: "https://tukang.design",
    siteName: "Tukang Design",
    images: [
      {
        url: "https://tukang.design/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tukang Design - End-to-End Design & Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tukang Design - End-to-End Design & Development",
    description:
      "Get end-to-end design & development services in Malaysia & Singapore. Tukang Design offers full-stack design solutions and complete digital experiences from Shah Alam.",
    images: ["https://tukang.design/og-image.jpg"],
    site: "@tukangdesign",
  },
  alternates: {
    canonical: "https://tukang.design",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessData = createBusinessStructuredData();
  const websiteData = createWebsiteStructuredData();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <GoogleTagManager />
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || ""}`}
        ></script>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
        ) : null}
        <SEO structuredData={[businessData, websiteData]} />
      </head>
      <body className="bg-olive text-foreground font-lato antialiased">
        <GoogleTagManagerNoScript />
        <NavigationBar />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Global Booking Steps (hidden on booking/admin) */}
        <GlobalBookingSteps />

        <Footer />

        {/* Region Detection Indicator */}
        <RegionIndicator />
      </body>
    </html>
  );
}
