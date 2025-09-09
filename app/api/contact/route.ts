import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, message, region } = await request.json();

    // Email content (light HTML matching booking style)
    const mailOptions = {
      from:
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        process.env.EMAIL_FROM ||
        "studio@tukang.design",
      to:
        process.env.CONTACT_TO ||
        process.env.SMTP_USER ||
        "studio@tukang.design",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin:0 auto; color:#0f1419;">
          <h2 style="margin:0 0 8px; color:#2563eb;">New Contact Form Submission</h2>
          <div style="background:#f8fafc; padding:12px 16px; border-radius:8px; margin-bottom:16px;">
            <p style="margin:4px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            ${
              region
                ? `<p style="margin:4px 0;"><strong>Region:</strong> ${region}</p>`
                : ""
            }
          </div>
          <h3 style="margin:16px 0 8px;">Contact</h3>
          <ul style="margin:0 0 16px; padding-left:18px;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
          </ul>
          <h3 style="margin:16px 0 8px;">Message</h3>
          <div style="background:#ffffff; border:1px solid #e5e7eb; padding:12px 16px; border-radius:8px;">
            <p style="margin:0; line-height:1.6; white-space:pre-wrap;">${message}</p>
          </div>
        </div>`,
    };
    await sendEmail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
