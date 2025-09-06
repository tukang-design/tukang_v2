import { NextRequest, NextResponse } from "next/server";
import { sanityReadClient, sanityClient } from "@/lib/sanity";

export async function GET(request) {
  try {
    console.log("Admin API: GET request received");

    // Simple authentication check - you should implement proper auth
    const authHeader = request.headers.get("authorization");
    console.log("Admin API: Auth header:", authHeader);

    if (!authHeader || authHeader !== "Bearer admin-secret-key") {
      console.log("Admin API: Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Admin API: Fetching bookings from Sanity");
    // Query to get all bookings, ordered by submission date (newest first)
    const query = `*[_type == "booking"] | order(submittedAt desc) {
      _id,
      submissionId,
      submittedAt,
      status,
      service,
      contactInfo,
      region,
      estimatedPrice,
      language,
      scheduledCall,
      addOns,
      projectDetails,
      notes,
      followUpDate
    }`;

    const bookings = await sanityReadClient.fetch(query);
    console.log("Admin API: Fetched bookings count:", bookings.length);
    console.log(
      "Admin API: First booking:",
      bookings[0] ? bookings[0].submissionId : "None"
    );

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings: bookings,
    });
  } catch (error) {
    console.error("Admin API: Error fetching bookings:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch bookings",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Update booking status
export async function PATCH(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== "Bearer admin-secret-key") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, status, notes } = await request.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId and status" },
        { status: 400 }
      );
    }

    // Update the booking
    const result = await sanityClient
      .patch(bookingId)
      .set({
        status: status,
        ...(notes && { notes: notes }),
      })
      .commit();

    return NextResponse.json({
      success: true,
      updated: result,
    });
  } catch (error) {
    console.error("Error updating booking:", error);

    return NextResponse.json(
      {
        error: "Failed to update booking",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
