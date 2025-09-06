import { NextResponse } from "next/server";
import { sanityReadClient } from "@/lib/sanity";

export async function GET() {
  try {
    console.log("Testing Sanity connection...");

    const query = `*[_type == "booking"] | order(_createdAt desc) [0...5] {
      _id,
      submissionId,
      _createdAt
    }`;

    const result = await sanityReadClient.fetch(query);
    console.log("Sanity test result:", result);

    return NextResponse.json({
      success: true,
      message: "Sanity connection successful",
      bookings: result,
      count: result.length,
    });
  } catch (error) {
    console.error("Sanity test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
