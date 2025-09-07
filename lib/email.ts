import nodemailer from "nodemailer";

type EmailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
};

async function sendWithResend(opts: EmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY missing");

  const from = opts.from || process.env.SMTP_FROM || process.env.SMTP_USER || "studio@tukang.design";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(opts.to) ? opts.to : [opts.to],
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      reply_to: opts.replyTo,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error ${res.status}: ${text}`);
  }
}

async function sendWithSMTP(opts: EmailOptions) {
  const passRaw = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "").toString();
  const pass = passRaw.replace(/\s+/g, "");
  const user = (process.env.SMTP_USER || "").trim();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: { user, pass },
  });

  if (process.env.NODE_ENV !== "production") {
    try {
      await transporter.verify();
    } catch (err) {
      // don't throw in non-prod
      console.warn("SMTP verify failed (non-prod):", err);
    }
  }

  const from = opts.from || process.env.SMTP_FROM || user;
  await transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
  });
}

export async function sendEmail(opts: EmailOptions) {
  if (process.env.RESEND_API_KEY) {
    return sendWithResend(opts);
  }
  return sendWithSMTP(opts);
}

