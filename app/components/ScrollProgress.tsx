"use client";

import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent/20">
      <div
        className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-150 ease-out shadow-sm shadow-accent/30"
        style={{
          width: `${progress * 100}%`,
        }}
      />
    </div>
  );
}
