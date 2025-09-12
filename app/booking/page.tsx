import React from "react";
import LeadCaptureForm from "./LeadCaptureForm";

export const metadata = {
  title: "Get Quote - Tadal Studio | Custom Web Design Pricing",
  description:
    "Get an instant quote for your web design project. Choose from multiple packages and features. Transparent pricing for Malaysian and international clients.",
  openGraph: {
    title: "Get Quote - Tadal Studio",
    description:
      "Get an instant quote for your web design project. Transparent pricing and custom packages.",
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
  twitter: {
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
};

export default function BookingPage() {
  return <LeadCaptureForm />;
}
