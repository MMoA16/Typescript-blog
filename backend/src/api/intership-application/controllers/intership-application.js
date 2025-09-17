
"use strict";

const EMAIL_TEMPLATE_ID = 4; // your email-designer template ID
const HR_EMAIL = process.env.ENQUIRY_TEAM_EMAIL || "datahokage@gmail.com";

module.exports = ({ strapi }) => ({
  async send(ctx) {
    try {
      const payload = ctx.request.body?.data || ctx.request.body || {};

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
        uploadedFile,
        fileName,
        resume: resumeArray,
      } = payload;

      // Base URL for uploaded files
      const baseUrl =
        strapi.config.get("server.url") ||
        process.env.PUBLIC_URL ||
        `http://localhost:${process.env.PORT || 1337}`;

      // Resolve resume fileId or URL from frontend payload
      let fileId = null;
      if (uploadedFile?.id) {
        fileId = uploadedFile.id;
      } else if (fileName) {
        fileId = fileName;
      } else if (Array.isArray(resumeArray) && resumeArray[0]?.id) {
        fileId = resumeArray[0].id;
      }

      // 1️⃣ Save application into DB
      const savedEntry = await strapi.db
        .query("api::intership-application.intership-application")
        .create({
          data: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            GraduationStatus: graduationStatus,
            UniversityName: university,
            CurrentLocation: location,
            CurrentYear: currentYear,
            BatchYear: batch,
            AreaOfExpertise: practise,
            Description: description,
            UploadResume: fileId ? [fileId] : [],
          },
        });

      // 2️⃣ Fetch the same record back from DB (with relations)
      const dbEntry = await strapi.db
        .query("api::intership-application.intership-application")
        .findOne({
          where: { id: savedEntry.id },
          populate: { UploadResume: true },
        });

      // 3️⃣ Build resume URL if file exists
      let resumeUrl = null;
      if (dbEntry.UploadResume?.length) {
        const file = dbEntry.UploadResume[0];
        resumeUrl = file.url?.startsWith("http")
          ? file.url
          : `${baseUrl}${file.url}`;
      }

      // 4️⃣ Build HR email HTML using DB data only
      const html = `
        <h2>📩 New Internship Application</h2>
        <p><strong>Name:</strong> ${dbEntry.FirstName || ""} ${
        dbEntry.LastName || ""
      }</p>
        <p><strong>Email:</strong> ${dbEntry.Email || ""}</p>
        <p><strong>Phone:</strong> ${dbEntry.Phone || ""}</p>
        <p><strong>Graduation Status:</strong> ${dbEntry.GraduationStatus || ""}</p>
        <p><strong>University:</strong> ${dbEntry.UniversityName || ""}</p>
        <p><strong>Location:</strong> ${dbEntry.Location || ""}</p>
        <p><strong>Current Year:</strong> ${dbEntry.CurrentYear || ""}</p>
        <p><strong>Batch:</strong> ${dbEntry.BatchYear || ""}</p>
        <p><strong>Area of Expertise:</strong> ${dbEntry.AreaOfExpertise || ""}</p>
        <p><strong>Description:</strong> ${dbEntry.Description || ""}</p>
        ${
          resumeUrl
            ? `<p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">View Resume</a></p>`
            : "<p><strong>Resume:</strong> Not uploaded</p>"
        }
      `;

      // 5️⃣ Send email to HR (always from DB record)
      await strapi.plugin("email").service("email").send({
        to: HR_EMAIL,
        from: process.env.SMTP_USER || "noreply@example.com",
        subject: "New Internship Application Received",
        html,
      });

      // 6️⃣ Acknowledgment to applicant
      try {
        await strapi
          .plugin("email-designer")
          .service("email")
          .sendTemplatedEmail(
            {
              to: dbEntry.Email,
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

      // Return success + saved DB entry
      ctx.send({
        success: true,
        message: "Application submitted successfully",
        data: dbEntry,
      });
    } catch (error) {
      strapi.log.error("Error in internship application controller:", error);
      ctx.throw(500, "Failed to submit internship application");
    }
  },
});
