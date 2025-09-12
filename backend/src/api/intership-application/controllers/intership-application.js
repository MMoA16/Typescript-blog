"use strict";

const EMAIL_TEMPLATE_ID = 4; // your email-designer template ID
const HR_EMAIL = process.env.ENQUIRY_TEAM_EMAIL || "hr@example.com";

module.exports = ({ strapi }) => ({
  async send(ctx) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        graduationStatus,
        university,
        location,
        currentYear,
        batch,
        practise,
        description,
        fileName, // uploaded file ID from frontend
      } = ctx.request.body.data;

      let resumeUrl = null;
      let resumeId = null;

      // If a file ID is passed, fetch file details from Strapi upload plugin
      if (fileName) {
        const file = await strapi
          .plugin("upload")
          .service("upload")
          .findOne(fileName);

        if (file) {
          resumeUrl = `${strapi.config.get("server.url")}${file.url}`;
          resumeId = file.id;
        }
      }

      // Save internship application in DB
      const newEntry = await strapi.db
        .query("api::intership-application.intership-application")
        .create({
          data: {
            firstName,
            lastName,
            email,
            phone,
            graduationStatus,
            university,
            location,
            currentYear,
            batch,
            practise,
            description,
            resume: resumeId ? [resumeId] : [],
          },
        });

      // Send email to HR
      await strapi.plugin("email").service("email").send({
        to: HR_EMAIL,
        from: process.env.SMTP_USER || "noreply@example.com",
        subject: "New Internship Application Received",
        html: `
          <h2>📩 New Internship Application</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Graduation Status:</strong> ${graduationStatus}</p>
          <p><strong>University:</strong> ${university}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Current Year:</strong> ${currentYear}</p>
          <p><strong>Batch:</strong> ${batch}</p>
          <p><strong>Area of Expertise:</strong> ${practise}</p>
          <p><strong>Description:</strong> ${description}</p>
          ${
            resumeUrl
              ? `<p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank">View Resume</a></p>`
              : "<p><strong>Resume:</strong> Not uploaded</p>"
          }
        `,
      });

      // Send acknowledgment to applicant
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
            templateReferenceId: EMAIL_TEMPLATE_ID,
            subject: "We have received your Application!",
          }
        );

      ctx.send({
        success: true,
        message: "Application submitted successfully",
        data: newEntry,
      });
    } catch (error) {
      console.error("Error in internship application controller:", error);
      ctx.throw(500, "Failed to submit internship application");
    }
  },
});
