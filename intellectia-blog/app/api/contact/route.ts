import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, email, message } = body;

  // Basic email validation
  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { success: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    // Send confirmation to the client
    const clientResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // Avoid custom name here to reduce spam issues
      to: [email],
      subject: "We've received your message",
      html: `
        <p>Dear ${firstName},</p>
        <p>Thank you for reaching out to us. We’ve received your message and will get back to you shortly.</p>
        <p>Regards,<br/>Bodhankar & Associates</p>
      `,
    });

    console.log("Client email response:", clientResponse);

    // Send a copy to the firm
    const firmResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["deepakbaligar83@gmail.com"],
      subject: `New Contact Form Submission from ${firstName}`,
      html: `
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Firm email response:", firmResponse);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}





// export async function POST(req: Request) {
//   const body = await req.json();
//   const { firstName, email, message } = body;

//   try {
//     await resend.emails.send({
//       from: "Intellectia Firm <onboarding@resend.dev>",
//       to: [email], // send to client & yourself
//       subject: "We've received your message",
//       html: `
//         <p>Dear ${firstName},</p>
//         <p>Thank you for reaching out to us. We’ve received your message and will get back to you shortly.</p>
//         <p>Regards,<br/>Bodhankar & Associates</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }