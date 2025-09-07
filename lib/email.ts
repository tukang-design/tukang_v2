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

  const from = opts.from || process.env.EMAIL_FROM || "studio@tukang.design";
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

export async function sendEmail(opts: EmailOptions) {
  // Minimal: prefer SMTP via existing mailbox
  const user = (process.env.SMTP_USER || "").trim();
  const pass = ((process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "") as string)
    .toString()
    .replace(/\s+/g, "");
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);

  if (user && pass) {
    const transporter = nodemailer.createTransport({ host, port, secure: false, auth: { user, pass } });
    const from = opts.from || process.env.SMTP_FROM || user;
    await transporter.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
    });
    return;
  }

  // Fallback to Resend only if configured
  return sendWithResend(opts);
}
