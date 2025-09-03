import { NextResponse } from "next/server";
import { sanityReadClient } from "@/lib/sanity";

export async function GET() {
  try {
    console.log("Testing Sanity booking query...");

    // Simple query to get all bookings
    const query = `*[_type == "booking"] {
      _id,
      submissionId,
      _createdAt,
      submittedAt,
      status,
      "hasContactInfo": defined(contactInfo),
      "hasService": defined(service),
      "hasEstimatedPrice": defined(estimatedPrice)
    }`;

    const result = await sanityReadClient.fetch(query);
    console.log("Found bookings:", result.length);

    if (result.length > 0) {
      console.log("First booking details:", result[0]);
    }

    return NextResponse.json({
      success: true,
      message: "Sanity booking test completed",
      count: result.length,
      bookings: result,
    });
  } catch (error) {
    console.error("Sanity booking test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
