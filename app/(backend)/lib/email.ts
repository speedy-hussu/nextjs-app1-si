import nodemailer, { Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

export interface BulkEmailOptions {
  subject: string;
  html?: string;
  text?: string;
  bcc: string[];
}

function getSmtpConfig() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error(
      "SMTP is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in your environment."
    );
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: SMTP_FROM,
  };
}

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const { host, port, user, pass } = getSmtpConfig();

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
}

export async function sendBulkEmail(options: BulkEmailOptions) {
  const { from } = getSmtpConfig();
  const transporter = getTransporter();

  if (!options.html && !options.text) {
    throw new Error("Email content is required (html or text).");
  }

  if (!options.bcc.length) {
    throw new Error("At least one recipient is required.");
  }

  await transporter.sendMail({
    from,
    bcc: options.bcc,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}


