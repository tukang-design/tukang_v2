import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET() {
  try {
    const result = await sendEmail({
      to: process.env.CONTACT_TO || "studio@tukang.design",
      subject: `Email Debug Test ${new Date().toISOString()}`,
      text: "This is a debug test from /api/debug/email",
    });

    return NextResponse.json({ success: true, result: "sent" });
  } catch (err: any) {
    console.error("/api/debug/email error:", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
