"use client";

import { usePathname } from "next/navigation";
import BookingSteps from "./BookingSteps";

export default function GlobalBookingSteps() {
  const pathname = usePathname();
  const hideOn = [
    "/booking",
    "/booking/thank-you",
    "/admin",
  ];

  if (pathname && hideOn.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return <BookingSteps />;
}

