import React, { Suspense } from "react";
import PlannerClient from "./PlannerClient";

export default function ProjectScopePlannerPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-6 text-gray-400">Loading planner…</div>}>
      <PlannerClient />
    </Suspense>
  );
}
