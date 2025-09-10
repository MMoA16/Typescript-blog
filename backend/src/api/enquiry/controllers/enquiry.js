"use strict";
const nodemailer = require("nodemailer");

const strapi = global.strapi;

module.exports = {
  async send(ctx) {
    try {
      const { name, email, enquiryType, description } = ctx.request.body;

      // 1️⃣ Save enquiry to DB
      const savedEnquiry = await strapi.db.query("api::enquiry.enquiry").create({
        data: {
          Name: name,
          EnquiryType: enquiryType,
          Email: email,
          Description: description,
        },
      });

      // 2️⃣ Setup transporter (using Gmail SMTP as example)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER, // your gmail or SMTP username
          pass: process.env.SMTP_PASS, // app password or SMTP password
        },
      });

      // 3️⃣ Send email to Enquiry Team
      await transporter.sendMail({
        from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
        to: process.env.ENQUIRY_TEAM_EMAIL, // your company enquiry team email
        subject: `New Enquiry: ${enquiryType}`,
        html: `
          <h3>New Enquiry Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${enquiryType}</p>
          <p><strong>Description:</strong> ${description}</p>
        `,
      });

      // 4️⃣ Send acknowledgement email to User
      // await transporter.sendMail({
      //   from: `"Enquiry Team" <${process.env.SMTP_USER}>`,
      //   to: email,
      //   subject: "We have received your enquiry",
      //   html: `
      //     <p>Hi ${name},</p>
      //     <p>Thank you for contacting us regarding <b>${enquiryType}</b>. 
      //     We have received your enquiry and our team will get back to you soon.</p>
      //     <p>Best Regards,<br/>The Team</p>
      //   `,
      // });

      await strapi
        .plugin("email-designer")
        .service("email")
        .sendTemplatedEmail(
          {
            to: email,
            from: `"EnquiryTeam" <${process.env.SMTP_USER}>`,
            replyTo: process.env.SMTP_USER,
          },
          {
            
            templateReferenceId: 2, // still required
            subject: "We have received your enquiry!",
            // 👇 override template with custom HTML
        
          },
          // {
          //   user: { name, email, message },
          // }
        );

      ctx.send({ success: true, message: "Enquiry submitted and emails sent!" });
    } catch (error) {
      console.error("Error sending enquiry:", error);
      ctx.send({ error: "Failed to send enquiry" }, 500);
    }
  },
};
