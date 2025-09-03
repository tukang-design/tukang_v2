import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET() {
  try {
    // Find bookings older than 3 days with pending payment
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const pendingBookings = await sanityClient.fetch(`
      *[_type == "bookingSubmission" 
        && status == "pending_payment" 
        && submittedAt < "${threeDaysAgo.toISOString()}"
        && !defined(followUpSent)
      ] {
        _id,
        submissionId,
        contactInfo,
        selectedService,
        submittedAt,
        status,
        paymentStatus
      }
    `);

    console.log(`Found ${pendingBookings.length} bookings needing follow-up`);

    // Process follow-ups
    const followUpResults = [];

    for (const booking of pendingBookings) {
      try {
        // TODO: Send follow-up email using your email service
        // For now, we'll just log and mark as followed up

        console.log(
          `Following up on booking: ${booking.submissionId} for ${booking.contactInfo.email}`
        );

        // Mark as followed up in Sanity
        await sanityClient
          .patch(booking._id)
          .set({
            followUpSent: true,
            followUpSentAt: new Date().toISOString(),
            followUpCount: 1,
          })
          .commit();

        followUpResults.push({
          bookingId: booking.submissionId,
          email: booking.contactInfo.email,
          status: "follow_up_sent",
        });

        // TODO: Integration with email service
        // await sendFollowUpEmail({
        //   email: booking.contactInfo.email,
        //   name: booking.contactInfo.name,
        //   bookingId: booking.submissionId,
        //   service: booking.selectedService,
        //   daysOld: Math.floor((Date.now() - new Date(booking.submittedAt).getTime()) / (1000 * 60 * 60 * 24))
        // });
      } catch (error) {
        console.error(
          `Failed to follow up on booking ${booking.submissionId}:`,
          error
        );
        followUpResults.push({
          bookingId: booking.submissionId,
          email: booking.contactInfo.email,
          status: "follow_up_failed",
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      followUpsProcessed: followUpResults.length,
      results: followUpResults,
    });
  } catch (error) {
    console.error("Follow-up processing failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process follow-ups",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Function to handle manual follow-up triggers
export async function POST(request) {
  try {
    const { bookingId, type = "manual" } = await request.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID required" },
        { status: 400 }
      );
    }

    // Get booking details
    const booking = await sanityClient.fetch(
      `
      *[_type == "bookingSubmission" && submissionId == $bookingId][0] {
        _id,
        submissionId,
        contactInfo,
        selectedService,
        submittedAt,
        status,
        paymentStatus,
        followUpCount
      }
    `,
      { bookingId }
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update follow-up count
    const followUpCount = (booking.followUpCount || 0) + 1;

    await sanityClient
      .patch(booking._id)
      .set({
        [`followUp${followUpCount}SentAt`]: new Date().toISOString(),
        followUpCount,
        lastFollowUpType: type,
      })
      .commit();

    console.log(
      `Manual follow-up sent for booking: ${bookingId}, count: ${followUpCount}`
    );

    // TODO: Send actual follow-up email

    return NextResponse.json({
      success: true,
      bookingId,
      followUpCount,
      message: `Follow-up #${followUpCount} triggered for booking ${bookingId}`,
    });
  } catch (error) {
    console.error("Manual follow-up failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send follow-up",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
