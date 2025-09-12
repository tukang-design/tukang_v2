"use client";
import React from "react";

type ClayBrowserMockupProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ClayBrowserMockup({
  children,
  className = "",
}: ClayBrowserMockupProps) {
  return (
    <div
      className={`relative max-w-7xl mx-auto min-h-[500px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div
        className="relative mx-auto w-full rounded-[28px] bg-slate-100 text-slate-900 border-4 border-slate-100 overflow-hidden"
        style={{
          perspective: "1400px",
          WebkitPerspective: "1400px",
        }}
      >
        {/* Subtle 3D tilt wrapper */}
        <div className="">
          {/* Top Bar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-slate-200/70 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#FF605C] shadow-inner shadow-black/20" />
              <span className="size-3 rounded-full bg-[#FFBD44] shadow-inner shadow-black/20" />
              <span className="size-3 rounded-full bg-[#00CA4E] shadow-inner shadow-black/20" />
            </div>
            <div className="flex-1 h-7 rounded-full bg-slate-300 border border-black/5 px-4 flex items-center text-xs text-slate-500">
              https://yourdomain.com/
            </div>
          </div>

          {/* Content Area (dark theme to match brand) */}
          <div className="bg-olive-800 relative rounded-b-[28px] border-t border-black/5 min-h-[700px] md:min-h-[900px]">
            {/* Edge-to-edge content inside mockup */}
            <div className="overflow-hidden pt-8">{children}</div>
          </div>
        </div>

        {/* Soft base shadow to sell the clay look */}
        <div className="absolute -bottom-6 left-10 right-10 h-12 bg-black/40 blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
