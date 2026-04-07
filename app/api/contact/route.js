import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function pickFirstEnv(keys) {
  for (const key of keys) {
    if (process.env[key]) return process.env[key];
  }
  return undefined;
}

function normalizeSecret(secret) {
  if (!secret) return secret;
  return String(secret).trim().replace(/\s+/g, '');
}

function getErrorDetails(error) {
  return {
    code: error?.code || 'UNKNOWN',
    responseCode: error?.responseCode || null,
    command: error?.command || null,
    stage: error?.stage || 'unknown',
  };
}

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailUser =
      pickFirstEnv(['EMAIL_USER', 'SMTP_USER', 'MAIL_USER', 'GMAIL_USER']) ||
      'funwithdrisha@gmail.com';
    const emailPass = pickFirstEnv([
      'EMAIL_PASS',
      'EMAIL_PASSWORD',
      'SMTP_PASS',
      'MAIL_PASS',
      'MAIL_PASSWORD',
      'GMAIL_PASS',
      'GMAIL_APP_PASSWORD',
      'APP_PASS',
      'APP_PASSWORD',
      'PASSWORD',
      'PASS',
      'pass',
    ]);

    const normalizedPass = normalizeSecret(emailPass);

    if (!normalizedPass) {
      return NextResponse.json(
        { error: 'Email service is not configured on the server.', code: 'CONTACT_CFG_MISSING' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: normalizedPass,
      },
    });

    try {
      await transporter.verify();
    } catch (error) {
      const details = getErrorDetails({ ...error, stage: 'verify' });
      console.error('Contact route verify error:', details);
      return NextResponse.json(
        {
          error: 'Email authentication failed.',
          code: 'CONTACT_AUTH_FAILED',
          details,
        },
        { status: 500 }
      );
    }

    const mailOptionsToAdmin = {
      from: emailUser,
      to: 'tiasukhnannip@gmail.com', 
      replyTo: email,
      subject: `[SYSTEM INQUIRY] Connection Request from ${name}`,
      html: `
        <div style="font-family: monospace; border: 2px solid #333; padding: 20px; background: #fafafa;">
          <h2 style="border-bottom: 1px solid #000; padding-bottom: 10px; text-transform: uppercase;">New Contact Log</h2>
          <p><strong>SENDER:</strong> ${name}</p>
          <p><strong>EMAIL:</strong> ${email}</p>
          <hr/>
          <p><strong>ENCRYPTED MESSAGE:</strong></p>
          <div style="background: #eee; padding: 15px; border-radius: 5px;">${message}</div>
        </div>
      `,
    };

    const mailOptionsToUser = {
      from: emailUser,
      to: email,
      subject: 'Acknowledgment of Inquiry - Tia Sukhnanni',
      html: `
        <div style="font-family: sans-serif; padding: 30px; line-height: 1.6;">
          <h2 style="color: #FF66C4;">Tia Sukhnanni // AI & ML</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out. Your inquiry has been logged successfully. I will review the details and get back to you shortly.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>Tia Sukhnanni</strong><br/>Computer Science Engineer</p>
        </div>
      `,
    };

    try {
      await Promise.all([
        transporter.sendMail(mailOptionsToAdmin),
        transporter.sendMail(mailOptionsToUser),
      ]);
    } catch (error) {
      const details = getErrorDetails({ ...error, stage: 'send' });
      console.error('Contact route send error:', details);
      return NextResponse.json(
        {
          error: 'Email send failed.',
          code: 'CONTACT_SEND_FAILED',
          details,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const details = getErrorDetails({ ...error, stage: 'request' });
    console.error('Contact route unexpected error:', details);
    return NextResponse.json(
      { error: 'Unexpected contact service error.', code: 'CONTACT_UNKNOWN', details },
      { status: 500 }
    );
  }
}