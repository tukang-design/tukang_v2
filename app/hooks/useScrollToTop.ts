"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Hook that automatically scrolls to top when pathname changes
 * and provides manual scroll function
 */
export function useScrollToTop() {
  const pathname = usePathname();

  // Auto scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Manual scroll function
  const scrollToTopManual = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { scrollToTopManual };
}
