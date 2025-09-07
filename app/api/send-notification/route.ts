import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

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

    // Send email
    await sendEmail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || process.env.EMAIL_FROM || `"Project Estimator" <studio@tukang.design>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER || "studio@tukang.design",
      subject: `New Project Estimate: ${data.name} - ${
        data.region === "MY" ? "RM" : data.region === "SG" ? "S$" : "USD"
      } ${regionalPrices[
        data.region as keyof typeof regionalPrices
      ].toLocaleString()}`,
      text: emailContent,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
