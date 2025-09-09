import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { matrix, tiers } from "@/lib/solutions-config";
import { sendEmail } from "@/lib/email";

// Helper function to generate a unique submission ID
function generateSubmissionId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `BK-${timestamp}-${randomString}`.toUpperCase();
}

// Helper function to get currency info based on region
function getCurrencyInfo(region) {
  const currencyMap = {
    MY: { symbol: "RM", multiplier: 1 },
    SG: { symbol: "SGD", multiplier: 0.63 },
    INT: { symbol: "€", multiplier: 0.25 },
  };
  return currencyMap[region] || currencyMap.INT;
}

// Recommend a tier based on selected goals (using solutions matrix)
function recommendTierFromGoals(selectedGoals = []) {
  try {
    const rank = { landing: 1, business: 2, advanced: 3 };
    let best = "landing";

    const goalIds = selectedGoals.map((g) => (g.id || "").toLowerCase());
    for (const gid of goalIds) {
      const row = matrix.find((r) => r.id === gid);
      if (!row) continue;
      if (row.advanced) best = rank[best] < rank["advanced"] ? "advanced" : best;
      else if (row.business) best = rank[best] < rank["business"] ? "business" : best;
      else if (row.landing) best = rank[best] < rank["landing"] ? "landing" : best;
    }
    const found = tiers.find((t) => t.id === best);
    return found ? { id: found.id, name: found.name, price: found.price } : null;
  } catch {
    return null;
  }
}

// Build a detailed project estimation email (client-friendly + internal)
function buildEstimationEmail({ bookingData, submissionId, websiteType, recommendedTier, currencyLabel, isServiceFlow = false, estimatedPriceObj = null }) {
  const contact = bookingData.contactInfo || {};

  // Line-item lists
  const goals = (bookingData.selectedGoals || []).map((g) => ({ title: g.title, price: Number(g.price || 0) }));
  const features = (bookingData.selectedFeatures || []).map((f) => ({ title: f.title, price: Number(f.price || 0) }));
  const addOns = (bookingData.projectDetails?.selectedAddOns || []).map((id) => id);

  const tierPrice = recommendedTier ? Number(recommendedTier.price || 0) : 0;
  const goalsTotal = goals.reduce((s, g) => s + g.price, 0);
  const featuresTotal = features.reduce((s, f) => s + f.price, 0);

  // For legacy service flow use estimatedPriceObj.amount if provided
  const baseEstimated = isServiceFlow && estimatedPriceObj ? Number(estimatedPriceObj.amount || 0) : Math.round(tierPrice + goalsTotal + featuresTotal);

  // Provide a confidence range +-15% (simple heuristic)
  const low = Math.round(baseEstimated * 0.85);
  const high = Math.round(baseEstimated * 1.15);

  const timeline = bookingData.projectBrief?.timeline || bookingData.projectDetails?.timeline || "6-8 weeks";

  const assumptions = [
    "Price is an initial estimate based on details provided.",
    "Final scope, integrations, and content readiness may affect timeline and cost.",
    "Prices exclude third-party costs (hosting, licensing, payment gateway fees) unless stated.",
  ];

  const nextSteps = [
    "We'll review this estimate and follow up within 24 hours to confirm details.",
    "Schedule a 30-min discovery call to lock scope and milestones.",
    "Deliver a formal proposal and timeline after the call.",
  ];

  // Plain text for internal notification
  const internalLines = [];
  internalLines.push("Project Estimate — Internal");
  internalLines.push(`Submission ID: ${submissionId}`);
  internalLines.push(`Type: ${websiteType}`);
  internalLines.push(`Contact: ${contact.name} <${contact.email}>`);
  internalLines.push("");
  if (goals.length) {
    internalLines.push("Goals:");
    goals.forEach((g) => internalLines.push(`- ${g.title}: ${currencyLabel} ${Number(g.price).toLocaleString()}`));
    internalLines.push("");
  }
  if (features.length) {
    internalLines.push("Features:");
    features.forEach((f) => internalLines.push(`- ${f.title}: ${currencyLabel} ${Number(f.price).toLocaleString()}`));
    internalLines.push("");
  }
  if (addOns.length) {
    internalLines.push("Add‑Ons:");
    addOns.forEach((a) => internalLines.push(`- ${a}`));
    internalLines.push("");
  }
  internalLines.push(`Estimate (mid): ${currencyLabel} ${Number(baseEstimated).toLocaleString()}`);
  internalLines.push(`Estimate range: ${currencyLabel} ${Number(low).toLocaleString()} — ${currencyLabel} ${Number(high).toLocaleString()}`);
  internalLines.push(`Suggested timeline: ${timeline}`);

  // Client-facing plain text
  const clientLines = [];
  clientLines.push(`Hi ${contact.name || "there"},`);
  clientLines.push("");
  clientLines.push("Thanks for the details — below is a first-pass project estimate based on your selections. This is a high-accuracy initial estimate and we'll confirm after a short discovery call.");
  clientLines.push("");
  clientLines.push(`Project: ${websiteType}`);
  clientLines.push(`Reference: ${submissionId}`);
  clientLines.push("");
  const isCustomSystem = /custom\s*web\s*system/i.test(String(websiteType));
  if (isCustomSystem && isServiceFlow) {
    clientLines.push("Initial investment indication:");
    clientLines.push(`${currencyLabel} 5,000+ (tailored after discovery)`);
    clientLines.push("");
    clientLines.push("Next recommended step: complimentary discovery call to finalize scope and proposal.");
  } else {
    clientLines.push("Estimated cost (mid):");
    clientLines.push(`${currencyLabel} ${Number(baseEstimated).toLocaleString()}`);
    clientLines.push("");
    clientLines.push("Estimated range (typical):");
    clientLines.push(`${currencyLabel} ${Number(low).toLocaleString()} — ${currencyLabel} ${Number(high).toLocaleString()}`);
    clientLines.push("");
    clientLines.push(`Suggested timeline: ${timeline}`);
  }
  clientLines.push("");
  clientLines.push("What this includes:");
  if (recommendedTier) clientLines.push(`- Recommended package: ${recommendedTier.name} (${currencyLabel} ${recommendedTier.price})`);
  goals.forEach((g) => clientLines.push(`- ${g.title}`));
  features.forEach((f) => clientLines.push(`- ${f.title}`));
  clientLines.push("");
  clientLines.push("Assumptions:");
  assumptions.forEach((a) => clientLines.push(`- ${a}`));
  clientLines.push("");
  clientLines.push("Next steps:");
  nextSteps.forEach((n) => clientLines.push(`- ${n}`));
  clientLines.push("");
  clientLines.push("If you'd like to proceed, reply to this email or book a time and we'll prepare a formal proposal.");
  clientLines.push("");
  clientLines.push("— The Tukang team");

  // HTML version (simple, client-friendly)
  const htmlParts = [];
  htmlParts.push(`<div style="font-family:Arial,Helvetica,sans-serif; color:#0f172a; max-width:680px; margin:0 auto;">`);
  htmlParts.push(`<h2 style="color:#1e40af; margin-bottom:4px;">Project Estimate</h2>`);
  htmlParts.push(`<p style="color:#374151; margin-top:0;">Reference: <strong>${submissionId}</strong></p>`);
  htmlParts.push(`<p>Hi ${contact.name || "there"},</p>`);
  if (isCustomSystem && isServiceFlow) {
    htmlParts.push(`<p>Thanks — based on your inputs for a Custom Web System, projects of this complexity typically start from <strong>${currencyLabel} 5,000+</strong>. We’ll refine a precise, tailored proposal after a short discovery call.</p>`);
  } else {
    htmlParts.push(`<p>Thanks — below is a first-pass estimate based on the details you provided. We'll confirm scope in a short discovery call.</p>`);
    htmlParts.push(`<h3 style="margin-bottom:6px;">Estimate</h3>`);
    htmlParts.push(`<div style="background:#f8fafc;padding:12px;border-radius:8px;margin-bottom:12px;"><strong style="font-size:18px;">${currencyLabel} ${Number(baseEstimated).toLocaleString()}</strong><div style="color:#6b7280">Range: ${currencyLabel} ${Number(low).toLocaleString()} — ${currencyLabel} ${Number(high).toLocaleString()}</div></div>`);
    htmlParts.push(`<p><strong>Suggested timeline:</strong> ${timeline}</p>`);
  }
  if (recommendedTier) htmlParts.push(`<p><strong>Recommended package:</strong> ${recommendedTier.name} — ${currencyLabel} ${recommendedTier.price}</p>`);
  if (goals.length) {
    htmlParts.push(`<h4 style="margin-bottom:6px;">Goals / Outcomes</h4><ul>` + goals.map((g) => `<li>${g.title} — <strong>${currencyLabel} ${Number(g.price).toLocaleString()}</strong></li>`).join("") + `</ul>`);
  }
  if (features.length) {
    htmlParts.push(`<h4 style="margin-bottom:6px;">Features</h4><ul>` + features.map((f) => `<li>${f.title} — <strong>${currencyLabel} ${Number(f.price).toLocaleString()}</strong></li>`).join("") + `</ul>`);
  }
  htmlParts.push(`<h4 style="margin-bottom:6px;">Assumptions</h4><ul>` + assumptions.map((a) => `<li>${a}</li>`).join("") + `</ul>`);
  htmlParts.push(`<h4 style="margin-bottom:6px;">Next steps</h4><ul>` + nextSteps.map((n) => `<li>${n}</li>`).join("") + `</ul>`);
  htmlParts.push(`<p>If you'd like to proceed, reply to this email or book a time and we'll prepare a formal proposal.</p>`);
  htmlParts.push(`<p style="color:#6b7280; font-size:13px;">— The Tukang team</p>`);
  htmlParts.push(`</div>`);

  const subjectClient = `Project Estimate — ${websiteType} — ${submissionId}`;
  const subjectInternal = `New Booking & Estimate — ${submissionId} — ${websiteType}`;

  return {
    client: {
      subject: subjectClient,
      text: clientLines.join("\n"),
      html: htmlParts.join(""),
    },
    internal: {
      subject: subjectInternal,
      text: internalLines.join("\n"),
      html: `<pre style="font-family:Menlo,monospace; white-space:pre-wrap;">${internalLines.join("\n")}</pre>`,
    },
  };
}

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // Check if this is the new goal-based structure or old service-based structure
    const isGoalBased =
      bookingData.selectedGoals && Array.isArray(bookingData.selectedGoals);

    if (isGoalBased) {
      // Handle new goal-based booking structure
      return await handleGoalBasedBooking(bookingData);
    } else {
      // Handle legacy service-based structure
      return await handleServiceBasedBooking(bookingData);
    }
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      {
        error: "Failed to submit booking",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function handleGoalBasedBooking(bookingData) {
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
  const recommendedTier = recommendTierFromGoals(bookingData.selectedGoals);

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
      businessDescription: bookingData.projectBrief?.businessDescription || "",
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
    language: "en", // Default to English for now
    followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  };

  // Save to Sanity
  try {
    const result = await sanityClient.create(sanityDocument);

    console.log("Goal-based booking submitted successfully:", {
      submissionId,
      documentId: result._id,
      contactName: bookingData.contactInfo.name,
      websiteType,
      goalsCount: bookingData.selectedGoals.length,
      totalPrice: bookingData.totalPrice,
    });

    // Build and send internal + optional client estimate emails
    try {
      const to = process.env.CONTACT_TO || process.env.SMTP_USER || "studio@tukang.design";
      const from = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.EMAIL_FROM || "studio@tukang.design";
      const currencyLabel = bookingData.selectedRegion === "MY" ? "RM" : "USD";

      const estimate = buildEstimationEmail({ bookingData, submissionId, websiteType, recommendedTier, currencyLabel });

      // Send internal notification
      await sendEmail({ from, to, replyTo: bookingData.contactInfo.email, subject: estimate.internal.subject, text: estimate.internal.text, html: estimate.internal.html });

      // Optionally send client-facing estimate (controlled by env var SEND_ESTIMATE_TO_CLIENT=true)
      if ((process.env.SEND_ESTIMATE_TO_CLIENT || "false").toLowerCase() === "true") {
        const clientTo = bookingData.contactInfo.email;
        if (clientTo) {
          await sendEmail({ from, to: clientTo, replyTo: to, subject: estimate.client.subject, text: estimate.client.text, html: estimate.client.html });
        }
      }
    } catch (emailErr) {
      console.error("Booking email send failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      documentId: result._id,
      websiteType,
      message: "Booking submitted successfully",
    });
  } catch (sanityError) {
    console.error("Error saving goal-based booking to Sanity:", sanityError);
    return NextResponse.json(
      {
        error: "Failed to submit booking",
        details: sanityError.message,
      },
      { status: 500 }
    );
  }
}

async function handleServiceBasedBooking(bookingData) {
  // Validate required fields for legacy structure
  if (!bookingData.service || !bookingData.contactInfo) {
    return NextResponse.json(
      { error: "Missing required fields: service and contactInfo" },
      { status: 400 }
    );
  }

  // Generate unique submission ID
  const submissionId = generateSubmissionId();
  if (
    !bookingData.service ||
    !bookingData.contactInfo?.name ||
    !bookingData.contactInfo?.email
  ) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: service, contact name, or contact email",
      },
      { status: 400 }
    );
  }

  // Get currency info
  const currencyInfo = getCurrencyInfo(bookingData.region);

  // Calculate estimated price
  const basePrice = bookingData.service.basePrice * currencyInfo.multiplier;
  let addOnsPrice = 0;

  if (bookingData.projectDetails?.selectedAddOns?.length > 0) {
    // Get add-on details from the booking data
    const selectedAddOnIds = bookingData.projectDetails.selectedAddOns;
    // You might want to fetch add-on prices from your data source
    // For now, we'll calculate based on typical add-on prices
    const addOnPrices = {
      // Legacy IDs
      "seo-optimization": 800,
      "analytics-setup": 500,
      "social-media": 600,
      ecommerce: 2000,
      "blog-system": 1200,
      maintenance: 300, // monthly
      // New planner IDs (MYR)
      "additional-page": 300,
      "blog-setup": 400,
      copywriting: 800,
      "advanced-seo": 500,
      "branding-refresh": 700,
      "ga-sc": 200,
      "stock-images": 150,
      newsletter: 250,
      "social-feed": 100,
    };

    addOnsPrice = selectedAddOnIds.reduce((total, addOnId) => {
      return total + (addOnPrices[addOnId] || 0) * currencyInfo.multiplier;
    }, 0);
  }

  const totalEstimatedPrice = Math.round(basePrice + addOnsPrice);

  // Prepare the document for Sanity
  const sanityDocument = {
    _type: "booking",
    submissionId,
    submittedAt: new Date().toISOString(),
    status: "new",
    service: {
      id: bookingData.service.id,
      name: bookingData.service.name,
      basePrice: bookingData.service.basePrice,
    },
    addOns:
      bookingData.projectDetails?.selectedAddOns?.map((addOnId) => {
        // Map add-on IDs to full objects
        const addOnDetails = {
          // Legacy
          "seo-optimization": { name: "SEO Optimization", basePrice: 800 },
          "analytics-setup": { name: "Analytics Setup", basePrice: 500 },
          "social-media": { name: "Social Media Integration", basePrice: 600 },
          ecommerce: { name: "E-commerce Functionality", basePrice: 2000 },
          "blog-system": { name: "Blog System", basePrice: 1200 },
          maintenance: { name: "Monthly Maintenance", basePrice: 300 },
          // New planner IDs
          "additional-page": { name: "Additional Web Page", basePrice: 300 },
          "blog-setup": { name: "Blog Setup & Configuration", basePrice: 400 },
          copywriting: { name: "Professional Copywriting (3 pages)", basePrice: 800 },
          "advanced-seo": { name: "Advanced On‑Page SEO Pack", basePrice: 500 },
          "branding-refresh": { name: "Basic Logo / Branding Refresh", basePrice: 700 },
          "ga-sc": { name: "Google Analytics & Search Console Setup", basePrice: 200 },
          "stock-images": { name: "Premium Stock Image Pack", basePrice: 150 },
          newsletter: { name: "Newsletter Integration", basePrice: 250 },
          "social-feed": { name: "Social Media Feed Integration", basePrice: 100 },
        };

        const details = addOnDetails[addOnId] || {
          name: addOnId,
          basePrice: 0,
        };
        return {
          id: addOnId,
          name: details.name,
          basePrice: details.basePrice,
        };
      }) || [],
    projectDetails: {
      timeline: bookingData.projectDetails?.timeline || "",
      budget: bookingData.projectDetails?.budget || "",
      description: bookingData.projectDetails?.description || "",
      features: bookingData.projectDetails?.features || [],
    },
    contactInfo: {
      name: bookingData.contactInfo.name,
      email: bookingData.contactInfo.email,
      company: bookingData.contactInfo.company || "",
      phone: bookingData.contactInfo.phone || "",
    },
    region: bookingData.region || "INT",
    estimatedPrice: {
      amount: totalEstimatedPrice,
      currency: currencyInfo.symbol,
      originalAmount: Math.round(
        bookingData.service.basePrice + addOnsPrice / currencyInfo.multiplier
      ),
    },
    language: bookingData.language || "en",
    scheduledCall: bookingData.scheduledCall || false,
    followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  };

  // Save to Sanity
  try {
    const result = await sanityClient.create(sanityDocument);

    console.log("Booking submitted successfully:", {
      submissionId,
      documentId: result._id,
      contactName: bookingData.contactInfo.name,
      service: bookingData.service.name,
    });

    // Build and send internal + optional client estimate emails for service flow
    try {
      const to = process.env.CONTACT_TO || process.env.SMTP_USER || "studio@tukang.design";
      const from = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.EMAIL_FROM || "studio@tukang.design";
      const currency = currencyInfo.symbol || "";

      const estimate = buildEstimationEmail({ bookingData, submissionId, websiteType: bookingData.service.name, recommendedTier: null, currencyLabel: currency, isServiceFlow: true, estimatedPriceObj: sanityDocument.estimatedPrice });

      // Internal
      await sendEmail({ from, to, replyTo: bookingData.contactInfo.email, subject: estimate.internal.subject, text: estimate.internal.text, html: estimate.internal.html });

      // Optionally send to client
      if ((process.env.SEND_ESTIMATE_TO_CLIENT || "false").toLowerCase() === "true") {
        const clientTo = bookingData.contactInfo.email;
        if (clientTo) {
          await sendEmail({ from, to: clientTo, replyTo: to, subject: estimate.client.subject, text: estimate.client.text, html: estimate.client.html });
        }
      }
    } catch (emailErr) {
      console.error("Booking email send failed (service):", emailErr);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      documentId: result._id,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.error("Error saving booking to Sanity:", error);

    return NextResponse.json(
      {
        error: "Failed to submit booking",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json({
    message: "Booking API endpoint is working",
    methods: ["POST"],
  });
}
