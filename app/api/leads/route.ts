import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sanityWriteClient } from "@/lib/sanity";
import { matrix, tiers, predefinedFeatures } from "@/lib/solutions-config";

function normalize(s: string) {
  return (s || "").toLowerCase().trim();
}

function recommendTier(primaryGoals: string[] = [], selectedFeatureIds: string[] = []) {
  // Rank tiers
  const rank = { landing: 1, business: 2, advanced: 3 } as const;
  let base: keyof typeof rank = "landing";
  const reasons: string[] = [];

  // Evaluate each goal and pick the highest tier suggested
  primaryGoals.forEach((pg) => {
    const row = matrix.find((r) => normalize(r.need) === normalize(pg));
    if (!row) return;
    let suggested: keyof typeof rank = "landing";
    if (row.advanced && !row.business && !row.landing) {
      suggested = "advanced";
      reasons.push(`Goal “${row.need}” requires advanced capabilities.`);
    } else if (row.business && !row.landing) {
      suggested = "business";
      reasons.push(`Goal “${row.need}” aligns with a multi‑page business website.`);
    } else if (row.landing && !row.business && !row.advanced) {
      suggested = "landing";
      reasons.push(`Goal “${row.need}” fits a focused landing page for quick launch.`);
    } else if (row.landing && row.business) {
      suggested = "landing";
      reasons.push(`Both Landing and Business fit “${row.need}”; starting lean with Landing.`);
    }
    if (row.note) reasons.push(row.note);
    if (rank[suggested] > rank[base]) base = suggested;
  });

  // Upgrade based on selected features
  const advKeywords = /(e-?commerce|content-management|booking-system|user-authentication)/i;
  const bizKeywords = /(custom-pages|contact-forms|portfolio)/i;
  const advancedTriggers = selectedFeatureIds.filter((id) => advKeywords.test(id));
  const businessTriggers = selectedFeatureIds.filter((id) => bizKeywords.test(id));

  let recommended: keyof typeof rank = base;
  if (advancedTriggers.length) {
    recommended = "advanced";
    reasons.push(`Upgraded to Advanced due to features: ${advancedTriggers.join(", ")}.`);
  } else if (recommended === "landing" && businessTriggers.length) {
    recommended = "business";
    reasons.push(`Upgraded to Business due to features: ${businessTriggers.join(", ")}.`);
  }

  const recTier = tiers.find((t) => t.id === recommended)!;
  return { id: recTier.id, name: recTier.name, price: recTier.price, reason: reasons.join(" ") };
}

function generateId(prefix = "LEAD") {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${ts}-${rnd}`.toUpperCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      primaryGoal, // deprecated single goal
      primaryGoals: primaryGoalsRaw,
      targetAudience,
      selectedFeatures = [],
      otherRequirements = "",
      businessName,
      name,
      email,
      phone,
    } = body || {};

    const primaryGoals: string[] = Array.isArray(primaryGoalsRaw)
      ? primaryGoalsRaw
      : primaryGoal
      ? [primaryGoal]
      : [];

    if (!primaryGoals.length || !name || !email) {
      return NextResponse.json(
        { success: false, message: "At least one primary goal, name and email are required" },
        { status: 400 }
      );
    }

    const submissionId = generateId();
    const rec = recommendTier(primaryGoals, selectedFeatures);

    // Create basic booking/lead document in Sanity
    const doc = {
      _type: "booking",
      submissionId,
      submittedAt: new Date().toISOString(),
      status: "new",
      bookingType: "goal-based",
      projectBrief: {
        businessDescription: businessName || "",
        targetAudience: targetAudience || "",
        keyGoals: primaryGoals.join(", "),
        additionalRequirements: [
          ...(Array.isArray(selectedFeatures) ? selectedFeatures : []),
          otherRequirements,
        ]
          .filter(Boolean)
          .join(", "),
      },
      contactInfo: {
        name,
        email,
        phone: phone || "",
        company: businessName || "",
      },
      region: "INT",
      language: "en",
      recommendedTier: rec,
    } as const;

    let createdId: string | null = null;
    try {
      const created = await sanityWriteClient.create(doc);
      createdId = created._id;
    } catch (e) {
      console.warn("Sanity write failed for lead; continuing", e);
    }

    // Email notification to studio
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD,
        },
      });

      // Map selected feature IDs to labels for readability
      const featureLabelsMap = new Map(predefinedFeatures.map((f) => [f.id, f.label] as const));
      const selectedFeatureLabels = (selectedFeatures || []).map((id: string) => featureLabelsMap.get(id) || id);

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER || email,
        to: "studio@tukang.design",
        subject: `New Lead Capture - ${submissionId}`,
        html: `
          <h2>New Lead Capture</h2>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Recommended Tier:</strong> ${rec.name} <em>(${rec.price})</em></p>
          ${rec.reason ? `<p><em>${rec.reason}</em></p>` : ""}
          <h3>Client</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>
          <p><strong>Business:</strong> ${businessName || "-"}</p>
          <h3>Project</h3>
          <p><strong>Primary Goals:</strong> ${primaryGoals.join(", ")}</p>
          <p><strong>Target Audience:</strong> ${targetAudience || "-"}</p>
          <p><strong>Selected Features:</strong> ${selectedFeatureLabels.join(", ") || "-"}</p>
          ${otherRequirements ? `<p><strong>Other:</strong> ${otherRequirements}</p>` : ""}
          ${createdId ? `<p><em>Saved to Sanity: ${createdId}</em></p>` : ""}
        `,
      });
    } catch (e) {
      console.warn("Lead email send failed", e);
    }

    return NextResponse.json({ success: true, submissionId, id: createdId, recommendedTier: rec });
  } catch (error: any) {
    console.error("Lead capture failed", error);
    return NextResponse.json(
      { success: false, message: "Lead capture failed", details: error?.message },
      { status: 500 }
    );
  }
}
