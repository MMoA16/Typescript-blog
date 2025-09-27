
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

      // 2️⃣ Fetch the saved record back (ensures consistent data is used in emails)
      const enquiryData = await strapi.db
        .query("api::enquiry.enquiry")
        .findOne({ where: { id: savedEnquiry.id } });

      // 3️⃣ Setup transporter (using Gmail SMTP as example)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER, // your gmail or SMTP username
          pass: process.env.SMTP_PASS, // app password or SMTP password
        },
      });

      // 4️⃣ Send email to Enquiry Team (from DB data)
      await transporter.sendMail({
        from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
        to: process.env.ENQUIRY_TEAM_EMAIL,
        subject: `New Enquiry: ${enquiryData.EnquiryType}`,
        html: `
          <h3>New Enquiry Received</h3>
          <p><strong>Name:</strong> ${enquiryData.Name}</p>
          <p><strong>Email:</strong> ${enquiryData.Email}</p>
          <p><strong>Type:</strong> ${enquiryData.EnquiryType}</p>
          <p><strong>Description:</strong> ${enquiryData.Description}</p>
        `,
      });

      // 5️⃣ Send acknowledgement email to User
      await transporter.sendMail({
        from: `"Enquiry Team" <${process.env.SMTP_USER}>`,
        to: enquiryData.Email,
        subject: "We have received your enquiry",
        html: `
          <p>Hi ${enquiryData.Name},</p>
          <p>Thank you for contacting us regarding <b>${enquiryData.EnquiryType}</b>.
          We have received your enquiry and our team will get back to you soon.</p>
          <p>Best Regards,<br/>The Team</p>
          <p>Intellectia</p>
        `,
      });

      ctx.send({ success: true, message: "Enquiry submitted and emails sent!" });
    } catch (error) {
      console.error("Error sending enquiry:", error);
      ctx.send({ error: "Failed to send enquiry" }, 500);
    }
  },
};
