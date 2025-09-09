import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-05-03",
});

interface ProjectGoal {
  id: string;
  title: string;
  description: string;
}

interface RecommendedFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  complexity: string;
  required: boolean;
}

interface QuoteSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  selectedGoals?: ProjectGoal[];
  selectedFeatures?: RecommendedFeature[];
  totalPrice?: number;
  timeline?: string;
  projectBrief?: string;
  region?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: QuoteSubmission = await request.json();

    // Submit to Sanity
    const doc = {
      _type: "quote",
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      selectedGoals:
        data.selectedGoals?.map((goal, index) => ({
          _key: `goal-${index}`,
          id: goal.id,
          title: goal.title,
          description: goal.description,
        })) || [],
      selectedFeatures:
        data.selectedFeatures?.map((feature, index) => ({
          _key: `feature-${index}`,
          id: feature.id,
          name: feature.name,
          description: feature.description,
          price: feature.price,
          complexity: feature.complexity,
          required: feature.required,
        })) || [],
      totalPrice: data.totalPrice,
      timeline: data.timeline,
      projectBrief: data.projectBrief,
      region: data.region,
      submittedAt: new Date().toISOString(),
    };

    const result = await sanity.create(doc);
    console.log("Quote saved to Sanity:", result._id);

    // Send notification to studio
    let notificationSent = false;
    try {
      const { sendEstimateNotification } = await import("@/lib/notifications");
      await sendEstimateNotification(data);
      console.log("Internal notification sent successfully");
      notificationSent = true;
    } catch (notifyErr) {
      console.error("Internal notification failed:", notifyErr);
      notificationSent = false;
    }

    return NextResponse.json({
      success: true,
      id: result._id,
      notificationSent,
    });
  } catch (error) {
    console.error("Error submitting quote:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit quote" },
      { status: 500 }
    );
  }
}
