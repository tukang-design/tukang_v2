import React from "react";
import ClientDemo from "./ClientDemo";

export const metadata = {
  title: "Component Demo | Tukang Design",
  description: "A consolidated showcase of site components for review.",
};

export default function DemoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <section>
        <h1 className="text-3xl md:text-4xl font-bold font-mono text-accent mb-2">Component Demo</h1>
        <p className="text-gray-300">Consolidated view of commonly used UI components across the site.</p>
      </section>
      <ClientDemo />
    </div>
  );
}
