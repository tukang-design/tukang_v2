import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { sendEstimateNotification } = await import("@/lib/notifications");
    await sendEstimateNotification(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
