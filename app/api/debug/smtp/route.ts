import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET() {
  try {
    const result = await sendEmail({
      to: process.env.CONTACT_TO || process.env.SMTP_USER || "studio@tukang.design",
      subject: `SMTP Debug Test ${new Date().toISOString()}`,
      text: "This is a debug test from /api/debug/smtp",
    });

    return NextResponse.json({ success: true, result: "sent" });
  } catch (err: any) {
    console.error("/api/debug/smtp error:", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
