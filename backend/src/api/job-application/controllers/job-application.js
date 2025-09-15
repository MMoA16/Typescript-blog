
"use strict";

const nodemailer = require("nodemailer");

const EMAIL_TEMPLATE_ID = 3; // your email-designer template ID
const HR_EMAIL = process.env.ENQUIRY_TEAM_EMAIL || "hr@example.com";

// Email template for HR
const teamTemplate = (
  firstName,
  lastName,
  email,
  phone,
  expertise,
  jobTitle,
  experience,
  location,
  university,
  batch,
  organization,
  noticePeriod,
  description,
  resumeUrl
) => `
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
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Area of Expertise:</strong> ${expertise}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Years of Experience:</strong> ${experience}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>University:</strong> ${university}</p>
        <p><strong>Batch Year:</strong> ${batch}</p>
        <p><strong>Current Organization:</strong> ${organization}</p>
        <p><strong>Notice Period:</strong> ${noticePeriod}</p>
        <p><strong>Description:</strong><br/> ${description || "N/A"}</p>
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

      // ✅ Base URL fix
      const baseUrl =
        strapi.config.get("server.url") ||
        process.env.PUBLIC_URL ||
        `http://localhost:${process.env.PORT || 1337}`;

      // ✅ Determine resume id/url
      let fileId = null;
      let resumeUrl = null;

      if (uploadedFile?.id) {
        fileId = uploadedFile.id;
        if (uploadedFile.url) resumeUrl = uploadedFile.url;
      } else if (fileName) {
        fileId = fileName;
      } else if (Array.isArray(resumeArray) && resumeArray[0]) {
        if (resumeArray[0].id) fileId = resumeArray[0].id;
        if (resumeArray[0].url) resumeUrl = resumeArray[0].url;
      }

      if (fileId) {
        const file = await strapi
          .plugin("upload")
          .service("upload")
          .findOne(fileId);

        if (file) {
          resumeUrl = file.url.startsWith("http")
            ? file.url
            : `${baseUrl}${file.url}`;
        }
      } else if (resumeUrl && !resumeUrl.startsWith("http")) {
        resumeUrl = `${baseUrl}${resumeUrl}`;
      }

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

      // ✅ Nodemailer Transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // ✅ Send HR email
      await transporter.sendMail({
        from: `"HR Team" <${process.env.SMTP_USER}>`,
        to: HR_EMAIL,
        subject: `New Job Application`,
        html: teamTemplate(
          firstName,
          lastName,
          email,
          phone,
          expertise,
          jobTitle,
          experience,
          location,
          university,
          batch,
          organization,
          noticePeriod,
          description,
          resumeUrl
        ),
      });

      // ✅ Send acknowledgment email to applicant
      try {
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
      } catch (designerErr) {
        strapi.log.error("email-designer send failed:", designerErr);
      }

      ctx.send({
        success: true,
        message: "Application saved and emails sent successfully",
        application: savedApplication,
      });
    } catch (err) {
      strapi.log.error("Error in job-application.send:", err);
      ctx.throw(500, "Failed to submit job application");
    }
  },
};
