import React from "react";
import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Tukang Design - End-to-End Design & Development | Full-stack Designer Malaysia",
  description = "Tired of the handoff headache? Tukang Design offers a seamless, end-to-end web design and development service. Get a flawless website from a single expert.",
  keywords = "end-to-end design development, full-stack designer malaysia, web design shah alam, complete digital solutions, custom web development, full-stack development malaysia, design to development services",
  ogImage = "https://tukang.design/tukang-design-social-share.jpg",
  ogUrl,
  canonical,
  structuredData,
}) => {
  const defaultCanonical = canonical || "https://tukang.design";
  const defaultOgUrl = ogUrl || "https://tukang.design";

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Tukang Design" />

      {/* Canonical URL */}
      <link rel="canonical" href={defaultCanonical} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={defaultOgUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tukang Design" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@tukangdesign" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content="Tukang Design" />

      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Google Site Verification */}
      <meta
        name="google-site-verification"
        content="YOUR_GOOGLE_VERIFICATION_CODE"
      />

      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
    </Head>
  );
};
