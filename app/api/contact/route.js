import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'funwithdrisha@gmail.com',
        pass: process.env.pass, // Ensure this is your 16-digit App Password
      },
    });

    const mailOptionsToAdmin = {
      from: 'funwithdrisha@gmail.com',
      to: 'tiasukhnannip@gmail.com', 
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
      from: 'funwithdrisha@gmail.com',
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

    await Promise.all([
      transporter.sendMail(mailOptionsToAdmin),
      transporter.sendMail(mailOptionsToUser),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}