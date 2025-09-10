

"use strict";
const nodemailer = require("nodemailer");
const strapi = global.strapi;



const teamTemplate = (name, email, message) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
        .card { background: #fff; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto; }
        h2 { color: #222; }
        p { font-size: 15px; color: #444; margin: 6px 0; }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>📩 New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      </div>
    </body>
  </html>
`;

module.exports = {
  send: async (ctx) => {
    try {
      const { name, email, message } = ctx.request.body;

      // 1️⃣ Save contact
      await strapi.db.query("api::contact.contact").create({
        data: { Name: name, Email: email, Message: message },
      });

      // 2️⃣ Setup transporter (for team mail only)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // 3️⃣ Send mail to team
      await transporter.sendMail({
        from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
        to: process.env.ENQUIRY_TEAM_EMAIL,
        subject: `New Message`,
        html: teamTemplate(name, email, message),
      });

      // 4️⃣ Use Strapi Email Designer, but inject `userTemplate` HTML
      await strapi
        .plugin("email-designer")
        .service("email")
        .sendTemplatedEmail(
          {
            to: email,
            from: `"IntellectiaFirm" <${process.env.SMTP_USER}>`,
            replyTo: process.env.SMTP_USER,
          },
          {
            
            templateReferenceId: 1, // still required
            subject: "We have received your message!",
            // 👇 override template with custom HTML
        
          },
          {
            user: { name, email, message },
          }
        );

      ctx.send({ success: true, message: "Emails sent with custom template!" });
    } catch (error) {
      console.error("Error sending message:", error);
      ctx.send({ error: "Failed to send message" }, 500);
    }
  },
};
