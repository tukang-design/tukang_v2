import React from "react";
import LeadCaptureForm from "./LeadCaptureForm";

export const metadata = {
  title: "Get Quote - Tukang Design | Custom Web Design Pricing",
  description: "Get an instant quote for your web design project. Choose from multiple packages and features. Transparent pricing for Malaysian and international clients.",
  openGraph: {
    title: "Get Quote - Tukang Design",
    description: "Get an instant quote for your web design project. Transparent pricing and custom packages.",
  },
};

export default function BookingPage() {
  return <LeadCaptureForm />;
}
