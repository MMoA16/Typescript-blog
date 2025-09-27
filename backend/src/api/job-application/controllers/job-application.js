

"use strict";

const nodemailer = require("nodemailer");

const EMAIL_TEMPLATE_ID = 3; // your email-designer template ID
const HR_EMAIL = process.env.ENQUIRY_TEAM_EMAIL || "hr@example.com";

// Email template for HR (built from DB record)
const teamTemplate = (app, resumeUrl) => `
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
        <h2>📩 New Job Application Received</h2>
        <p><strong>First Name:</strong> ${app.FirstName || ""}</p>
        <p><strong>Last Name:</strong> ${app.LastName || ""}</p>
        <p><strong>Email:</strong> ${app.Email || ""}</p>
        <p><strong>Phone:</strong> ${app.Phone || ""}</p>
        <p><strong>Area of Expertise:</strong> ${app.AreaOfExpertise || ""}</p>
        <p><strong>Job Title:</strong> ${app.JobTitle || ""}</p>
        <p><strong>Years of Experience:</strong> ${app.yearsOfExperience || ""}</p>
        <p><strong>Location:</strong> ${app.CurrentLocation || ""}</p>
        <p><strong>University:</strong> ${app.UniversityName || ""}</p>
        <p><strong>Batch Year:</strong> ${app.BatchYear || ""}</p>
        <p><strong>Current Organization:</strong> ${app.CurrentOrganization || ""}</p>
        <p><strong>Notice Period:</strong> ${app.NoticePeriod || ""}</p>
        <p><strong>Description:</strong><br/> ${app.Description || "N/A"}</p>
        ${
          resumeUrl
            ? `<p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">View Resume</a></p>`
            : "<p><strong>Resume:</strong> Not uploaded</p>"
        }
      </div>
    </body>
  </html>
`;

module.exports = {
  async send(ctx) {
    try {
      const payload = ctx.request.body?.data || ctx.request.body || {};
      const {
        firstName,
        lastName,
        phone,
        email,
        expertise,
        jobTitle,
        experience,
        location,
        university,
        batch,
        organization,
        noticePeriod,
        description,
        uploadedFile,
        fileName,
        resume: resumeArray,
      } = payload;

      // ✅ Resolve resume fileId from payload
      let fileId = null;
      if (uploadedFile?.id) fileId = uploadedFile.id;
      else if (fileName) fileId = fileName;
      else if (Array.isArray(resumeArray) && resumeArray[0]?.id)
        fileId = resumeArray[0].id;

      // ✅ Save to Strapi DB
      const savedApplication = await strapi.db
        .query("api::job-application.job-application")
        .create({
          data: {
            FirstName: firstName,
            LastName: lastName,
            Phone: phone,
            Email: email,
            AreaOfExpertise: expertise,
            JobTitle: jobTitle,
            yearsOfExperience: experience,
            CurrentLocation: location,
            UniversityName: university,
            BatchYear: batch,
            CurrentOrganization: organization,
            NoticePeriod: noticePeriod,
            UploadResume: fileId ? [fileId] : [],
            Description: description,
          },
        });

      // ✅ Fetch full record back from DB with relations
      const dbApplication = await strapi.db
        .query("api::job-application.job-application")
        .findOne({
          where: { id: savedApplication.id },
          populate: { UploadResume: true },
        });

      // ✅ Build resume URL (absolute)
      const baseUrl =
        strapi.config.get("server.url") ||
        process.env.PUBLIC_URL ||
        `http://localhost:${process.env.PORT || 1337}`;

      let resumeUrl = null;
      if (dbApplication.UploadResume?.length) {
        const file = dbApplication.UploadResume[0];
        resumeUrl = file.url?.startsWith("http")
          ? file.url
          : `${baseUrl}${file.url}`;
      }

      // ✅ Nodemailer Transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // ✅ Send HR email (DB data only)
      await transporter.sendMail({
        from: `"HR Team" <${process.env.SMTP_USER}>`,
        to: HR_EMAIL,
        subject: `New Job Application`,
        html: teamTemplate(dbApplication, resumeUrl),
      });

      // ✅ Send acknowledgment email to applicant (DB email)
      try {
        await strapi
          .plugin("email-designer")
          .service("email")
          .sendTemplatedEmail(
            {
              to: dbApplication.Email,
              from: `"IntellectiaFirm" <${process.env.SMTP_USER}>`,
              replyTo: process.env.SMTP_USER,
            },
            {
              templateReferenceId: EMAIL_TEMPLATE_ID,
              subject: "We have received your Application!",
            }
          );
      } catch (designerErr) {
        strapi.log.error("email-designer send failed:", designerErr);
      }

      ctx.send({
        success: true,
        message: "Application saved and emails sent successfully",
        application: dbApplication,
      });
    } catch (err) {
      strapi.log.error("Error in job-application.send:", err);
      ctx.throw(500, "Failed to submit job application");
    }
  },
};

