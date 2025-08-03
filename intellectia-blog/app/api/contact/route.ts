import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, phone, message } = body;

  try {
    await resend.emails.send({
      from: "Intellectia Firm <onboarding@resend.dev>",
      to: [email, "contact@bodhankarassociates.com"], // send to client & yourself
      subject: "We've received your message",
      html: `
        <p>Dear ${firstName},</p>
        <p>Thank you for reaching out to us. We’ve received your message and will get back to you shortly.</p>
        <p>Regards,<br/>Bodhankar & Associates</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
