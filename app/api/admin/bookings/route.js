import { NextResponse } from "next/server";
import { sanityReadClient, sanityClient } from "@/lib/sanity";

function isAuthorized(request) {
  const header = request.headers.get("authorization") || "";
  const bearer = process.env.ADMIN_BEARER_TOKEN || "";
  const user = process.env.ADMIN_USERNAME || "";
  const pass = process.env.ADMIN_PASSWORD || "";
  if (header.startsWith("Bearer ")) {
    const token = header.slice(7);
    return bearer && token === bearer;
  }
  if (header.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
      const [u, p] = decoded.split(":");
      return !!user && !!pass && u === user && p === pass;
    } catch {
      return false;
    }
  }
  return false;
}

export async function GET(request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
    if (!isAuthorized(request)) {
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
