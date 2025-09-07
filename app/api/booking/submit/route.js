import { NextResponse } from "next/server";
import { sanityClient } from "../../../../lib/sanity-client";
import nodemailer from "nodemailer";
import { getNotificationEmail } from "../../../../lib/notification-email";

// Helper function to generate a unique submission ID
function generateSubmissionId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `BK-${timestamp}-${randomString}`.toUpperCase();
}

// Email configuration and sending function
async function sendBookingNotification(bookingData, submissionId, websiteType) {
  // Configure nodemailer (you'll need to set up these environment variables)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD,
    },
  });

  const notificationEmail = getNotificationEmail();

  // Format the booking data for email
  const currencySymbol = bookingData.selectedRegion === "MY" ? "RM" : "$";

  // Calculate breakdown
  const goalsTotal = bookingData.selectedGoals.reduce(
    (sum, goal) => sum + goal.price,
    0
  );
  const featuresTotal = bookingData.selectedFeatures.reduce(
    (sum, feature) => sum + feature.price,
    0
  );

  const emailContent = `
    <h2>New Booking Submission - ${websiteType}</h2>
    
    <h3>Submission Details:</h3>
    <p><strong>Submission ID:</strong> ${submissionId}</p>
    <p><strong>Website Type:</strong> ${websiteType}</p>
    <p><strong>Region:</strong> ${bookingData.selectedRegion}</p>
    <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
    
    <h3>Contact Information:</h3>
    <p><strong>Name:</strong> ${bookingData.contactInfo.name}</p>
    <p><strong>Email:</strong> ${bookingData.contactInfo.email}</p>
    <p><strong>Phone:</strong> ${
      bookingData.contactInfo.phone || "Not provided"
    }</p>
    
    <h3>Project Brief:</h3>
    <p><strong>Business Name:</strong> ${
      bookingData.projectBrief.businessName
    }</p>
    <p><strong>Business Description:</strong> ${
      bookingData.projectBrief.businessDescription
    }</p>
    
    <h3>Price Breakdown:</h3>
    <h4>Selected Goals:</h4>
    <ul>
      ${bookingData.selectedGoals
        .map(
          (goal) => `
        <li><strong>${goal.title}</strong>: ${
            goal.description
          } - <strong>${currencySymbol}${goal.price.toLocaleString()}</strong></li>
      `
        )
        .join("")}
    </ul>
    <p><strong>Goals Subtotal: ${currencySymbol}${goalsTotal.toLocaleString()}</strong></p>
    
    ${
      bookingData.selectedFeatures && bookingData.selectedFeatures.length > 0
        ? `
    <h4>Additional Features:</h4>
    <ul>
      ${bookingData.selectedFeatures
        .map(
          (feature) => `
        <li><strong>${feature.title}</strong>: ${
            feature.description
          } - <strong>${currencySymbol}${feature.price.toLocaleString()}</strong></li>
      `
        )
        .join("")}
    </ul>
    <p><strong>Features Subtotal: ${currencySymbol}${featuresTotal.toLocaleString()}</strong></p>
    `
        : ""
    }
    
    <h3 style="color: #2563eb;"><strong>Total Estimate: ${currencySymbol}${bookingData.totalPrice.toLocaleString()}</strong></h3>
    
    <div style="background: #2563eb; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
      <h3 style="color: white; margin: 0 0 15px 0;">� Next Steps</h3>
      <p style="color: #e5e7eb; margin: 0 0 20px 0;">
        To accept this quotation and proceed with your project, please reply to this email with:
      </p>
      <div style="background: #059669; color: white; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; margin: 10px 0;">
        "Accept Quotation"
      </div>
      <p style="color: #e5e7eb; font-size: 12px; margin: 15px 0 0 0; opacity: 0.8;">
        We'll then issue a detailed invoice with payment link and discovery call booking • Submission ID: ${submissionId}
      </p>
    </div>
    
    <hr>
    <p><em>This booking was submitted through the Tukang website booking form.</em></p>
  `;

  const mailOptions = {
    // Use configured SMTP_FROM (or authenticated user) as the sender to avoid provider rejections.
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    replyTo: bookingData.contactInfo.email,
    to: notificationEmail,
    subject: `New ${websiteType} Booking - ${submissionId}`,
    html: emailContent,
  };

  try {
    // Helpful verification when diagnosing production issues
    try {
      await transporter.verify();
      console.log("SMTP transporter verified for booking notifications");
    } catch (verifyError) {
      console.error("SMTP transporter verification failed for booking notifications:", verifyError);
    }
    await transporter.sendMail(mailOptions);
    console.log(
      `Email notification sent successfully to ${notificationEmail}`
    );
    return true;
  } catch (emailError) {
    console.error("Failed to send email notification:", emailError);
    return false;
  }
}

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // Validate required fields for goal-based structure
    if (!bookingData.selectedGoals || !bookingData.contactInfo) {
      return NextResponse.json(
        { error: "Missing required fields: selectedGoals and contactInfo" },
        { status: 400 }
      );
    }

    // Generate unique submission ID
    const submissionId = generateSubmissionId();

    // Determine website type based on selected goals
    function getWebsiteType(goals) {
      const goalIds = goals.map((goal) => goal.id);

      if (
        goalIds.includes("sell-products") ||
        goalIds.includes("take-payments")
      ) {
        return "E-commerce Website";
      }
      if (
        goalIds.includes("generate-leads") ||
        goalIds.includes("showcase-portfolio")
      ) {
        return "Business Website";
      }
      if (
        goalIds.includes("share-content") ||
        goalIds.includes("build-community")
      ) {
        return "Content Website";
      }
      return "Custom Website";
    }

    const websiteType = getWebsiteType(bookingData.selectedGoals);

    // Prepare the document for Sanity
    const sanityDocument = {
      _type: "booking",
      submissionId,
      submittedAt: new Date().toISOString(),
      status: "new",
      bookingType: "goal-based",
      websiteType,
      selectedGoals: bookingData.selectedGoals.map((goal) => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        price: goal.price,
      })),
      selectedFeatures: (bookingData.selectedFeatures || []).map((feature) => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        price: feature.price,
      })),
      projectBrief: {
        businessDescription:
          bookingData.projectBrief?.businessDescription || "",
        targetAudience: bookingData.projectBrief?.targetAudience || "",
        keyGoals: bookingData.projectBrief?.keyGoals || "",
        timeline: bookingData.projectBrief?.timeline || "",
        budget: bookingData.projectBrief?.budget || "",
        inspiration: bookingData.projectBrief?.inspiration || "",
        additionalRequirements:
          bookingData.projectBrief?.additionalRequirements || "",
      },
      contactInfo: {
        name: bookingData.contactInfo.name,
        email: bookingData.contactInfo.email,
        company: bookingData.contactInfo.company || "",
        phone: bookingData.contactInfo.phone || "",
      },
      region: bookingData.selectedRegion || "INT",
      pricing: {
        totalAmount: bookingData.totalPrice || 0,
        currency: bookingData.selectedRegion === "MY" ? "MYR" : "USD",
        region: bookingData.selectedRegion || "INT",
      },
      language: "en",
      followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    console.log("Submitting goal-based booking:", {
      submissionId,
      contactName: bookingData.contactInfo.name,
      websiteType,
      goalsCount: bookingData.selectedGoals.length,
      totalPrice: bookingData.totalPrice,
      region: bookingData.selectedRegion,
    });

    // Try to save to Sanity, but gracefully handle permission errors
    let sanitySuccess = false;
    let documentId = null;

    try {
      const result = await sanityClient.create(sanityDocument);
      sanitySuccess = true;
      documentId = result._id;

      console.log("Goal-based booking submitted successfully to Sanity:", {
        submissionId,
        documentId: result._id,
        contactName: bookingData.contactInfo.name,
        websiteType,
      });
    } catch (sanityError) {
      console.warn(
        "Sanity submission failed, using fallback:",
        sanityError.message
      );

      // Fallback: Log the booking data
      console.log(
        "BOOKING FALLBACK - Data that would be saved:",
        JSON.stringify(sanityDocument, null, 2)
      );

      documentId = `fallback_${submissionId}`;
    }

    // Send email notification to configured address
    const emailSent = await sendBookingNotification(
      bookingData,
      submissionId,
      websiteType
    );

    // Return success response
    return NextResponse.json({
      success: true,
      submissionId,
      documentId,
      websiteType,
      message: sanitySuccess
        ? "Booking submitted successfully to Sanity"
        : "Booking submitted successfully (fallback mode)",
      emailSent,
      note: !sanitySuccess
        ? "Sanity permissions need to be configured for database storage"
        : undefined,
    });
  } catch (error) {
    console.error("Error processing booking submission:", error);
    return NextResponse.json(
      {
        error: "Failed to process booking",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Goal-based booking submission endpoint",
    methods: ["POST"],
    status: "active",
    expectedFields: [
      "selectedGoals",
      "selectedFeatures",
      "projectBrief",
      "contactInfo",
      "selectedRegion",
      "totalPrice",
    ],
  });
}
