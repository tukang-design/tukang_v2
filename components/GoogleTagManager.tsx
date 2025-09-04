import React from "react";
import Script from "next/script";

interface GoogleTagManagerProps {
  gtmId?: string;
}

export const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({
  gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PVX9R926",
}) => {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      {/* End Google Tag Manager */}
    </>
  );
};

export const GoogleTagManagerNoScript: React.FC<GoogleTagManagerProps> = ({
  gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PVX9R926",
}) => {
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  );
};
