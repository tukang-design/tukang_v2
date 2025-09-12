import type {
  PlannerAnswers,
  EstimateBreakdown,
} from "@/lib/planner/planner-config-and-pricing";

/* ---------- Helpers ---------- */

function formatMYR(n: number) {
  try {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      maximumFractionDigits: 0,
    }).format(Math.round(n));
  } catch {
    return `RM${Math.round(n).toLocaleString()}`;
  }
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildPagesSelected(answers: PlannerAnswers) {
  const pages = [
    answers.pages.home && "Home",
    answers.pages.about && "About",
    answers.pages.services && "Services",
    answers.pages.work && "Work",
    answers.pages.contact && "Contact",
  ].filter(Boolean) as string[];
  if (answers.pages.otherPages)
    pages.push(`Other x${answers.pages.otherPages}`);
  return pages.join(", ") || "(none)";
}

function buildFeaturesList(answers: PlannerAnswers) {
  const f = answers.features;
  const features: string[] = [];
  if (f.contactForm) features.push("Contact form");
  if (f.whatsapp) features.push("WhatsApp");
  if (f.blog) features.push("Blog");
  if (f.cms) features.push("CMS");
  if (f.store) features.push("Store");
  if (f.booking) features.push("Booking");
  if (f.membership) features.push("Membership");
  if (f.dashboard) features.push("Dashboard");
  if (f.multilingualCount)
    features.push(`Multilingual x${f.multilingualCount}`);
  return features.join(", ");
}

/* ---------- Subject & Preheader (optional exports) ---------- */

export function buildPlannerEmailSubject(opts: {
  estimate: EstimateBreakdown;
  id: string;
}) {
  const { estimate, id } = opts;
  const pkg = estimate.pkg[0].toUpperCase() + estimate.pkg.slice(1);
  return `TADAL STUDIO estimate ${id} • ${pkg} • ${formatMYR(estimate.total)}`;
}

export function buildPlannerPreheader(opts: { estimate: EstimateBreakdown }) {
  const { estimate } = opts;
  return `Suggested total ${formatMYR(estimate.total)} within ${
    estimate.timelineDays.min
  }-${estimate.timelineDays.max} days.`;
}

/* ---------- Plain Text ---------- */

export function buildPlannerEmailText(opts: {
  answers: PlannerAnswers;
  estimate: EstimateBreakdown;
  id: string;
  baseUrl: string;
}) {
  const { answers, estimate, id, baseUrl } = opts;

  const mods = estimate.modifiers
    .map((m) => `• ${m.label}: ${formatMYR(m.amount)}`)
    .join("\n");

  const info = [
    `Name: ${answers.contact.fullName}`,
    `Email: ${answers.contact.email}`,
    answers.contact.phone ? `Phone: ${answers.contact.phone}` : "",
    `Company: ${answers.basics.companyName}`,
    `Industry: ${answers.basics.industry}`,
    answers.basics.location ? `Location: ${answers.basics.location}` : "",
    `Goal: ${String(answers.goal).replaceAll("_", " ")}`,
    `Pages: ${buildPagesSelected(answers)}`,
    buildFeaturesList(answers) ? `Features: ${buildFeaturesList(answers)}` : "",
  ].filter(Boolean);

  const lines = [
    `TADAL STUDIO • Website estimate (${id})`,
    "",
    ...info,
    "",
    `Package: ${estimate.pkg.toUpperCase()} - ${estimate.rationale}`,
    `Range: ${formatMYR(estimate.range.min)} - ${formatMYR(
      estimate.range.max
    )}`,
    `Suggested total: ${formatMYR(estimate.total)}`,
    "Breakdown:",
    mods || "(no add-ons)",
    `Timeline: ${estimate.timelineDays.min}-${estimate.timelineDays.max} days`,
    "",
    `View your estimate: ${baseUrl}/plan/${id}`,
    "",
    "Note: This estimate is based on your inputs and will be confirmed after a short discovery call. Taxes and third-party fees are not included unless stated.",
  ];

  return lines.join("\n");
}

/* ---------- HTML ---------- */

export function buildPlannerEmailHTML(opts: {
  answers: PlannerAnswers;
  estimate: EstimateBreakdown;
  id: string;
  baseUrl: string;
}) {
  const { answers, estimate, id, baseUrl } = opts;

  const accent = "#39FF14";
  const bg = "#0a0f0d";
  const panel = "#0f1512";
  const text = "#e5e7eb";
  const sub = "#9ca3af";
  const border = "#243128";
  const slabStack =
    '"Roboto Slab", "DM Serif Text", Georgia, "Times New Roman", serif';

  const modRows = estimate.modifiers
    .map(
      (m) =>
        `<tr>
          <td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text};">${escapeHtml(
          m.label
        )}</td>
          <td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text}; text-align:right; font-family:${slabStack}; font-weight:700;">${formatMYR(
          m.amount
        )}</td>
        </tr>`
    )
    .join("");

  const pagesSelected = buildPagesSelected(answers);
  const features = buildFeaturesList(answers);

  const preheader = escapeHtml(
    `Suggested total ${formatMYR(estimate.total)} within ${
      estimate.timelineDays.min
    }-${estimate.timelineDays.max} days.`
  );

  return `
  <div style="margin:0; padding:24px; background:${bg}; color:${text}; font-family: ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${preheader}</div>

    <div style="max-width:720px; margin:0 auto; background:${panel}; border:1px solid ${border}; border-radius:12px; overflow:hidden;">
      <div style="padding:20px 24px; border-bottom:1px solid ${border}; display:flex; align-items:center; justify-content:space-between;">
        <div style="color:${accent}; font-family:${slabStack}; font-weight:800; font-size:18px; letter-spacing:.02em;" aria-label="TADAL STUDIO">TADAL STUDIO</div>
        <div style="font-size:12px; color:${sub}">Estimate ${escapeHtml(
    id
  )}</div>
      </div>

      <div style="padding:24px;">
        <h2 style="margin:0 0 8px; font-size:20px; font-weight:700; color:${text};">Your website estimate is ready</h2>
        <p style="margin:0 0 18px; color:${sub}">Hi ${escapeHtml(
    answers.contact.fullName
  )}, here is a first pass estimate based on your inputs. We will confirm scope in a short discovery call.</p>

        <!-- Client info -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; margin:0 0 16px;">
          <tr>
            <td style="padding:10px 12px; border:1px solid ${border}; border-radius:8px; background:#0b1210;">
              <div style="display:flex; flex-wrap:wrap; gap:12px;">
                <div style="min-width:220px;">
                  <div style="font-size:12px; color:${sub};">Name</div>
                  <div style="font-size:14px; color:${text};">${escapeHtml(
    answers.contact.fullName
  )}</div>
                </div>
                <div style="min-width:220px;">
                  <div style="font-size:12px; color:${sub};">Email</div>
                  <div style="font-size:14px; color:${text};">${escapeHtml(
    answers.contact.email
  )}</div>
                </div>
                ${
                  answers.contact.phone
                    ? `<div style="min-width:220px;">
                        <div style="font-size:12px; color:${sub};">Phone</div>
                        <div style="font-size:14px; color:${text};">${escapeHtml(
                        answers.contact.phone
                      )}</div>
                      </div>`
                    : ""
                }
                <div style="min-width:220px;">
                  <div style="font-size:12px; color:${sub};">Company</div>
                  <div style="font-size:14px; color:${text};">${escapeHtml(
    answers.basics.companyName
  )}</div>
                </div>
                <div style="min-width:220px;">
                  <div style="font-size:12px; color:${sub};">Goal</div>
                  <div style="font-size:14px; color:${text}; text-transform:capitalize;">${escapeHtml(
    String(answers.goal).replaceAll("_", " ")
  )}</div>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Scope summary -->
        <div style="display:flex; flex-wrap:wrap; gap:12px; margin:8px 0 12px;">
          <div style="flex:1 1 320px; background:#0b1210; border:1px solid ${border}; border-radius:10px; padding:12px 14px;">
            <div style="font-size:12px; color:${sub}; margin-bottom:6px;">Pages</div>
            <div style="font-size:14px; color:${text};">${escapeHtml(
    pagesSelected
  )}</div>
          </div>
          ${
            features
              ? `<div style="flex:1 1 320px; background:#0b1210; border:1px solid ${border}; border-radius:10px; padding:12px 14px;">
                  <div style="font-size:12px; color:${sub}; margin-bottom:6px;">Features</div>
                  <div style="font-size:14px; color:${text};">${escapeHtml(
                  features
                )}</div>
                </div>`
              : ""
          }
        </div>

        <!-- Quote summary -->
        <div style="display:flex; flex-wrap:wrap; gap:12px; margin:8px 0 12px;">
          <div style="flex:1 1 220px; background:#0b1210; border:1px solid ${border}; border-radius:10px; padding:12px 14px;">
            <div style="font-size:12px; color:${sub}; margin-bottom:6px;">Package</div>
            <div style="font-size:14px; font-weight:600; color:${text}">${escapeHtml(
    estimate.pkg[0].toUpperCase() + estimate.pkg.slice(1)
  )} <span style="color:${sub}; font-weight:500">- ${escapeHtml(
    estimate.rationale
  )}</span></div>
          </div>
          <div style="flex:1 1 220px; background:#0b1210; border:1px solid ${border}; border-radius:10px; padding:12px 14px;">
            <div style="font-size:12px; color:${sub}; margin-bottom:6px;">Range</div>
            <div style="font-size:14px; font-weight:600; color:${text}">${formatMYR(
    estimate.range.min
  )} - ${formatMYR(estimate.range.max)}</div>
          </div>
          <div style="flex:1 1 220px; background:#0b1210; border:1px solid ${border}; border-radius:10px; padding:12px 14px;">
            <div style="font-size:12px; color:${sub}; margin-bottom:6px;">Suggested total</div>
            <div style="font-size:18px; font-weight:800; color:${accent}; font-family:${slabStack};">${formatMYR(
    estimate.total
  )}</div>
          </div>
        </div>

        <!-- Breakdown table -->
        <div style="margin:10px 0 4px; font-size:13px; color:${sub}">Breakdown</div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; margin-bottom:8px;">
          <thead>
            <tr>
              <th align="left" style="padding:8px 12px; border-bottom:2px solid ${border}; color:${sub}; font-weight:600; font-size:12px;">Item</th>
              <th align="right" style="padding:8px 12px; border-bottom:2px solid ${border}; color:${sub}; font-weight:600; font-size:12px;">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text};">Base - ${escapeHtml(
    estimate.pkg
  )}</td>
              <td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text}; text-align:right; font-family:${slabStack}; font-weight:700;">${formatMYR(
    estimate.basePrice
  )}</td>
            </tr>
            ${
              modRows ||
              `<tr><td colspan="2" style="padding:8px 12px; color:${sub};">(no add-ons)</td></tr>`
            }
            ${
              estimate.surge
                ? `<tr><td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text};">Urgency surcharge</td><td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text}; text-align:right; font-family:${slabStack}; font-weight:700;">${formatMYR(
                    estimate.surge
                  )}</td></tr>`
                : ""
            }
            ${
              estimate.credits
                ? `<tr><td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text};">Credits</td><td style="padding:8px 12px; border-bottom:1px solid ${border}; color:${text}; text-align:right; font-family:${slabStack}; font-weight:700;">${formatMYR(
                    estimate.credits
                  )}</td></tr>`
                : ""
            }
            <tr>
              <td style="padding:10px 12px; color:${text}; font-weight:700;">Total</td>
              <td style="padding:10px 12px; color:${accent}; text-align:right; font-family:${slabStack}; font-weight:800;">${formatMYR(
    estimate.total
  )}</td>
            </tr>
          </tbody>
        </table>

        <!-- Timeline -->
        <div style="margin:8px 0 16px; font-size:13px; color:${sub}">Estimated timeline</div>
        <div style="background:#0b1210; border:1px solid ${border}; border-radius:10px; padding:12px 14px; margin-bottom:12px;">
          <div style="font-size:14px; color:${text}; font-weight:600;">${
    estimate.timelineDays.min
  }-${estimate.timelineDays.max} days</div>
        </div>

        <div style="text-align:center; margin-top:20px;">
          <a href="${baseUrl}/plan/${encodeURIComponent(
    id
  )}" style="display:inline-block; background:${accent}; color:#0a0f0d; text-decoration:none; padding:10px 16px; border-radius:8px; font-weight:800;">View your estimate</a>
        </div>

        <p style="margin:16px 0 0; color:${sub}; font-size:12px; line-height:1.5;">
          This estimate is based on your inputs and will be confirmed after a short discovery call.
          Taxes and third-party fees are not included unless stated. Valid for 14 days.
        </p>
      </div>

      <div style="padding:14px 16px; border-top:1px solid ${border}; color:${sub}; font-size:12px;">
        Questions? Reply to this email. We are here to help.
      </div>
    </div>
  </div>`;
}
