import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-05-03",
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Submit to Sanity
    const doc = {
      _type: "quote",
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      services: data.services.map((service: any, index: number) => ({
        _key: `service-${index}`,
        name: service.name || "Unnamed Service",
        category: service.category || "Service",
      })),
      timeline: data.timeline,
      projectBrief:
        typeof data.projectBrief === "object"
          ? JSON.stringify(data.projectBrief, null, 2)
          : data.projectBrief,
      estimatedPrice: data.estimatedPrice,
      region: data.region,
      submittedAt: new Date().toISOString(),
    };

    const result = await sanity.create(doc);
    console.log("Quote saved to Sanity:", result._id);

    // Send notification to studio
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`;
    const notificationResponse = await fetch(
      `${baseUrl}/api/send-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log("Notification response status:", notificationResponse.status);
    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error("Notification failed:", errorText);
    }

    return NextResponse.json({
      success: true,
      id: result._id,
      notificationSent: notificationResponse.ok,
    });
  } catch (error) {
    console.error("Error submitting quote:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit quote" },
      { status: 500 }
    );
  }
}
