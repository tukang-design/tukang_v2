import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { sendEmail } from "@/lib/email";
import {
  buildPlannerEmailHTML,
  buildPlannerEmailText,
} from "@/lib/email-templates";
import type { PlannerAnswers } from "@/lib/planner/planner-config-and-pricing";
import {
  validateBasics,
  validateContact,
  validateGoal,
  validatePages,
  validateTiming,
  priceEstimate,
} from "@/lib/planner/planner-config-and-pricing";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation paths
    const errors: string[] = [];
    errors.push(...validateBasics(body.basics || {}));
    errors.push(...validateGoal(body.goal));
    errors.push(...validatePages(body.pages || {}));
    errors.push(...validateTiming(body.timing || {}));
    errors.push(...validateContact(body.contact || {}));

    if (errors.length) {
      // Helpful debug output for dev: log the validation errors so they appear
      // in the server console. Also return a combined `error` string to make the
      // response easy to inspect in browser DevTools (some clients truncate
      // JSON arrays in error views).
      console.error("Plan validation errors:", errors);
      return NextResponse.json(
        { success: false, errors, error: errors.join("; ") },
        { status: 400 }
      );
    }

    const answers = body as PlannerAnswers;

    // Run estimate
    const estimate = priceEstimate(answers);

    // Prepare sanity document
    const doc = {
      _type: "plannerSubmission",
      createdAt: new Date().toISOString(),
      client: {
        name: answers.contact.fullName,
        email: answers.contact.email,
        phone: answers.contact.phone || "",
      },
      answers: answers,
      estimate,
    };

    try {
      const res = await sanityClient.create(doc);

      // Send estimate link/email to client if allowed
      try {
        const adminEmail =
          process.env.ADMIN_NOTIFICATION_EMAIL || "syazwan@tadalstudio.com";
        const from =
          process.env.SMTP_FROM ||
          process.env.EMAIL_FROM ||
          "studio@tukang.design";

        const clientEmail = answers.contact.email;
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "https://tukang.design";
        const clientSubject = `Your website estimate — ${res._id}`;
        const clientText = buildPlannerEmailText({
          answers,
          estimate,
          id: res._id,
          baseUrl,
        });
        const clientHtml = buildPlannerEmailHTML({
          answers,
          estimate,
          id: res._id,
          baseUrl,
        });

        // Always send to client and admin by default, unless explicitly disabled
        const disableClient =
          (process.env.DISABLE_CLIENT_EMAIL || "false").toLowerCase() ===
          "true";

        if (disableClient) {
          const adminSubject = `New planner submission — ${res._id}`;
          const adminText = `New planner submission from ${
            answers.contact.fullName
          } <${answers.contact.email}>.\n\nView submission: ${baseUrl}/plan/${
            res._id
          }\n\nEstimate: ${JSON.stringify(estimate)}`;
          const adminHtml = buildPlannerEmailHTML({
            answers,
            estimate,
            id: res._id,
            baseUrl,
          });
          console.log(
            "Client emailing disabled. Sending admin-only:",
            adminEmail
          );
          await sendEmail({
            from,
            to: adminEmail,
            subject: adminSubject,
            text: adminText,
            html: adminHtml,
          });
        } else {
          console.log(
            "Sending planner email to client and admin:",
            clientEmail,
            adminEmail
          );
          await sendEmail({
            from,
            to: [clientEmail, adminEmail],
            subject: clientSubject,
            text: clientText,
            html: clientHtml,
          });
        }
      } catch (e) {
        console.error("Failed to send planner email:", e);
      }

      return NextResponse.json({ success: true, id: res._id, estimate });
    } catch (e) {
      console.error("Sanity create failed:", e);
      return NextResponse.json(
        { success: false, error: "Failed to save submission" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Plan POST error:", err);
    const msg =
      err && typeof err === "object" && "message" in err
        ? (err as any).message
        : String(err);
    return NextResponse.json(
      { success: false, error: msg || "Internal error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Planner API is ready",
    methods: ["POST"],
  });
}
