import { sendEmail } from "./email";

export async function sendEstimateNotification(data: any) {
  // Build text + html similar to the previous route implementation
  const servicesList = (data.services || [])
    .map((s: any) => `• ${s.name} (${s.category || "service"})`)
    .join("\n");

  const regionalPrices = {
    MY: Math.round((data.estimatedPrice || 0) * 0.85),
    SG: Math.round((data.estimatedPrice || 0) * 1.0),
    INT: Math.round((data.estimatedPrice || 0) * 1.2),
  };

  const currencyLabel =
    data.region === "MY" ? "RM" : data.region === "SG" ? "S$" : "USD";
  const regionKey = (data.region || "INT") as keyof typeof regionalPrices;
  const titleTotal = regionalPrices[regionKey]
    ? regionalPrices[regionKey].toLocaleString()
    : (data.estimatedPrice || 0).toString();

  const text = `New Project Cost Estimate Submission\n\nContact Information:\nName: ${
    data.name
  }\nEmail: ${data.email}\nCompany: ${data.company || "Not provided"}\nPhone: ${
    data.phone || "Not provided"
  }\n\nProject Details:\nServices Selected:\n${
    servicesList || "(none)"
  }\n\nTimeline: ${
    data.timeline || "(not specified)"
  }\n\nEstimated Pricing:\n• Malaysia (MY): RM ${regionalPrices.MY.toLocaleString()}\n• Singapore (SG): S$ ${regionalPrices.SG.toLocaleString()}\n• International (INT): USD ${regionalPrices.INT.toLocaleString()}\n\nSelected Region: ${
    data.region || "INT"
  }\nFinal Estimate: ${currencyLabel} ${titleTotal}\n\nSubmitted: ${new Date().toLocaleString()}`;

  const servicesHtml = (data.services || [])
    .map(
      (s: any) =>
        `<li>${s.name} (${s.category || "service"})${
          s.price
            ? ` — <strong>${currencyLabel} ${Number(
                s.price
              ).toLocaleString()}</strong>`
            : ""
        }</li>`
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin:0 auto; color:#0f1419;">
      <h2 style="margin:0 0 8px; color:#2563eb;">New Project Estimate</h2>
      <div style="background:#f8fafc; padding:12px 16px; border-radius:8px; margin-bottom:16px;">
        <p style="margin:4px 0;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin:4px 0;"><strong>Email:</strong> ${data.email}</p>
        ${
          data.company
            ? `<p style="margin:4px 0;"><strong>Company:</strong> ${data.company}</p>`
            : ""
        }
        ${
          data.phone
            ? `<p style="margin:4px 0;"><strong>Phone:</strong> ${data.phone}</p>`
            : ""
        }
        <p style="margin:4px 0;"><strong>Region:</strong> ${data.region}</p>
        <p style="margin:4px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <h3 style="margin:16px 0 8px;">Services Selected</h3>
      <ul style="margin:0 0 16px; padding-left:18px;">${
        servicesHtml || "<li>(none)</li>"
      }</ul>
      <h3 style="margin:16px 0 8px;">Estimated Pricing</h3>
      <ul style="margin:0 0 16px; padding-left:18px;">
        <li><strong>Malaysia (MY):</strong> RM ${regionalPrices.MY.toLocaleString()}</li>
        <li><strong>Singapore (SG):</strong> S$ ${regionalPrices.SG.toLocaleString()}</li>
        <li><strong>International (INT):</strong> USD ${regionalPrices.INT.toLocaleString()}</li>
      </ul>
      <div style="background:#ecfdf5; border:1px solid #10b98133; padding:12px 16px; border-radius:8px;">
        <strong>Selected Region Total:</strong> ${currencyLabel} ${titleTotal}
      </div>
      ${
        data.projectBrief
          ? `<h3 style="margin:16px 0 8px;">Project Brief</h3><div style="background:#ffffff; border:1px solid #e5e7eb; padding:12px 16px; border-radius:8px;"><pre style="white-space:pre-wrap; margin:0;">${
              typeof data.projectBrief === "object"
                ? JSON.stringify(data.projectBrief, null, 2)
                : String(data.projectBrief)
            }</pre></div>`
          : ""
      }
    </div>
  `;

  await sendEmail({
    from:
      process.env.SMTP_FROM ||
      process.env.SMTP_USER ||
      process.env.EMAIL_FROM ||
      `"Project Estimator" <studio@tukang.design>`,
    to:
      process.env.CONTACT_TO || process.env.SMTP_USER || "studio@tukang.design",
    subject: `New Project Estimate: ${data.name} — ${currencyLabel} ${titleTotal}`,
    text,
    html,
  });

  return true;
}
