import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function GET() {
  // Only allow in non-production to avoid accidental outbound from prod
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not allowed in production" },
      { status: 403 }
    );
  }

  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });

    const info = await transporter.sendMail({
      from: "Test <test@example.com>",
      to: process.env.CONTACT_TO || "internal@example.com",
      subject: "Ethereal test message",
      text: "This is a test message from development email tester.",
    });

    // nodemailer provides a preview URL for Ethereal
    const preview = nodemailer.getTestMessageUrl(info) || null;

    return NextResponse.json({ success: true, preview });
  } catch (err) {
    const msg =
      err && typeof err === "object" && "message" in err
        ? (err.message as string)
        : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
