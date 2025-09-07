import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getNotificationEmail } from "../../../lib/notification-email";

export async function POST(request: NextRequest) {
  try {
    console.log("=== EMAIL NOTIFICATION API CALLED ===");
    const data = await request.json();
    console.log("Received data:", data);

    // Format services list
    const servicesList = data.services
      .map(
        (service: { name: string; category: string }) =>
          `• ${service.name} (${service.category})`
      )
      .join("\n");

    // Calculate total price by region
    const regionalPrices = {
      MY: Math.round(data.estimatedPrice * 0.85),
      SG: Math.round(data.estimatedPrice * 1.0),
      INT: Math.round(data.estimatedPrice * 1.2),
    };

    const emailContent = `
New Project Cost Estimate Submission

Contact Information:
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Phone: ${data.phone || "Not provided"}

Project Details:
Services Selected:
${servicesList}

Timeline: ${data.timeline}

Project Brief:
${
  typeof data.projectBrief === "object"
    ? JSON.stringify(data.projectBrief, null, 2)
    : data.projectBrief
}

Estimated Pricing:
• Malaysia (MY): RM ${regionalPrices.MY.toLocaleString()}
• Singapore (SG): S$ ${regionalPrices.SG.toLocaleString()}
• International (INT): USD ${regionalPrices.INT.toLocaleString()}

Selected Region: ${data.region}
Final Estimate: ${
      data.region === "MY" ? "RM" : data.region === "SG" ? "S$" : "USD"
    } ${regionalPrices[
      data.region as keyof typeof regionalPrices
    ].toLocaleString()}

Submitted: ${new Date().toLocaleString()}
    `.trim();

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD,
      },
    });

    console.log("Transporter created, attempting to send email...");
    console.log("SMTP Config:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
    });

    try {
      await transporter.verify();
      console.log("SMTP transporter verified for send-notification");
    } catch (verifyError) {
      console.error("SMTP transporter verification failed for send-notification:", verifyError);
    }

    const notificationEmail = getNotificationEmail();

    // Send email
    const emailResult = await transporter.sendMail({
      from: `"Project Estimator" <${process.env.SMTP_USER}>`,
      to: notificationEmail,
      subject: `New Project Estimate: ${data.name} - ${
        data.region === "MY" ? "RM" : data.region === "SG" ? "S$" : "USD"
      } ${regionalPrices[
        data.region as keyof typeof regionalPrices
      ].toLocaleString()}`,
      text: emailContent,
    });

    console.log("Email sent successfully:", emailResult.messageId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
