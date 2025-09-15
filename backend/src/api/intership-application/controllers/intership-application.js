// "use strict";

// const EMAIL_TEMPLATE_ID = 4; // your email-designer template ID
// const HR_EMAIL = process.env.ENQUIRY_TEAM_EMAIL || "hr@example.com";

// module.exports = ({ strapi }) => ({
//   async send(ctx) {
//     try {
//       const {
//         firstName,
//         lastName,
//         email,
//         phone,
//         graduationStatus,
//         university,
//         location,
//         currentYear,
//         batch,
//         practise,
//         description,
//         fileName, // uploaded file ID from frontend
//       } = ctx.request.body.data;

//       let resumeUrl = null;
//       let resumeId = null;

//       // If a file ID is passed, fetch file details from Strapi upload plugin
//       if (fileName) {
//         const file = await strapi
//           .plugin("upload")
//           .service("upload")
//           .findOne(fileName);

//         if (file) {
//           resumeUrl = `${strapi.config.get("server.url")}${file.url}`;
//           resumeId = file.id;
//         }
//       }

//       // Save internship application in DB
//       const newEntry = await strapi.db
//         .query("api::intership-application.intership-application")
//         .create({
//           data: {
//             firstName,
//             lastName,
//             email,
//             phone,
//             graduationStatus,
//             university,
//             location,
//             currentYear,
//             batch,
//             practise,
//             description,
//             resume: resumeId ? [resumeId] : [],
//           },
//         });

//       // Send email to HR
//       await strapi.plugin("email").service("email").send({
//         to: HR_EMAIL,
//         from: process.env.SMTP_USER || "noreply@example.com",
//         subject: "New Internship Application Received",
//         html: `
//           <h2>📩 New Internship Application</h2>
//           <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Graduation Status:</strong> ${graduationStatus}</p>
//           <p><strong>University:</strong> ${university}</p>
//           <p><strong>Location:</strong> ${location}</p>
//           <p><strong>Current Year:</strong> ${currentYear}</p>
//           <p><strong>Batch:</strong> ${batch}</p>
//           <p><strong>Area of Expertise:</strong> ${practise}</p>
//           <p><strong>Description:</strong> ${description}</p>
//           ${
//             resumeUrl
//               ? `<p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank">View Resume</a></p>`
//               : "<p><strong>Resume:</strong> Not uploaded</p>"
//           }
//         `,
//       });

//       // Send acknowledgment to applicant
//       await strapi
//         .plugin("email-designer")
//         .service("email")
//         .sendTemplatedEmail(
//           {
//             to: email,
//             from: `"IntellectiaFirm" <${process.env.SMTP_USER}>`,
//             replyTo: process.env.SMTP_USER,
//           },
//           {
//             templateReferenceId: EMAIL_TEMPLATE_ID,
//             subject: "We have received your Application!",
//           }
//         );

//       ctx.send({
//         success: true,
//         message: "Application submitted successfully",
//         data: newEntry,
//       });
//     } catch (error) {
//       console.error("Error in internship application controller:", error);
//       ctx.throw(500, "Failed to submit internship application");
//     }
//   },
// });


"use strict";

const EMAIL_TEMPLATE_ID = 4; // your email-designer template ID
const HR_EMAIL = process.env.ENQUIRY_TEAM_EMAIL || "datahokage@gmail.com";

module.exports = ({ strapi }) => ({
  async send(ctx) {
    try {
      // Accept either: { data: {...} } (your frontend) or direct body
      const payload = ctx.request.body?.data || ctx.request.body || {};

      // All the fields you originally had
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
        // possible shapes for file info from frontend:
        uploadedFile, // { id, url }
        fileName, // id (legacy name)
        resume: resumeArray, // maybe an array with file objects
      } = payload;

      // Build safe baseUrl (fallback if server.url is not set)
      const baseUrl =
        strapi.config.get("server.url") ||
        process.env.PUBLIC_URL ||
        `http://localhost:${process.env.PORT || 1337}`;

      // Determine file id and/or url from whatever frontend sent
      let fileId = null;
      let resumeUrl = null;
      if (uploadedFile?.id) {
        fileId = uploadedFile.id;
        if (uploadedFile.url) resumeUrl = uploadedFile.url;
      } else if (fileName) {
        // older property name: a numeric file id
        fileId = fileName;
      } else if (Array.isArray(resumeArray) && resumeArray[0]) {
        // frontend might send resume: [{ id, url }]
        if (resumeArray[0].id) fileId = resumeArray[0].id;
        if (resumeArray[0].url) resumeUrl = resumeArray[0].url;
      }

      // If we don't yet have an absolute resumeUrl but have fileId, fetch file from upload plugin
      let resumeId = null;
      if (fileId) {
        const file = await strapi
          .plugin("upload")
          .service("upload")
          .findOne(fileId);

        if (file) {
          resumeId = file.id;
          // file.url returned by Strapi is often relative like "/uploads/..."
          resumeUrl = file.url && file.url.startsWith("http")
            ? file.url
            : `${baseUrl}${file.url}`;
        }
      } else if (resumeUrl) {
        // If url exists (maybe frontend provided it), ensure it is absolute
        if (!resumeUrl.startsWith("http")) {
          resumeUrl = `${baseUrl}${resumeUrl}`;
        }
      }

      // Save internship application in DB (resume relation as media)
      const newEntry = await strapi.db
        .query("api::intership-application.intership-application")
        .create({
          data: {
            FirstName:firstName,
            LastName:lastName,
            Email:email,
            Phone: phone,
            GraduationStatus: graduationStatus,
            UniversityName: university,
            Location: location,
            CurrentYear: currentYear,
            BatchYear: batch,
            AreaOfExpertise: practise,
            Description: description,
            // keep using array for relation (works whether media is single or multiple)
            UploadResume: resumeId ? [resumeId] : [],
          },
        });

      // Build HR email HTML (include resume link if available)
      const html = `
        <h2>📩 New Internship Application</h2>
        <p><strong>Name:</strong> ${firstName || ""} ${lastName || ""}</p>
        <p><strong>Email:</strong> ${email || ""}</p>
        <p><strong>Phone:</strong> ${phone || ""}</p>
        <p><strong>Graduation Status:</strong> ${graduationStatus || ""}</p>
        <p><strong>University:</strong> ${university || ""}</p>
        <p><strong>Location:</strong> ${location || ""}</p>
        <p><strong>Current Year:</strong> ${currentYear || ""}</p>
        <p><strong>Batch:</strong> ${batch || ""}</p>
        <p><strong>Area of Expertise:</strong> ${practise || ""}</p>
        <p><strong>Description:</strong> ${description || ""}</p>
        ${
          resumeUrl
            ? `<p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">View Resume</a></p>`
            : "<p><strong>Resume:</strong> Not uploaded</p>"
        }
      `;

      // Send email to HR
      await strapi.plugin("email").service("email").send({
        to: HR_EMAIL,
        from: process.env.SMTP_USER || "noreply@example.com",
        subject: "New Internship Application Received",
        html,
      });

      // Send acknowledgment to applicant using email-designer (if available)
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
        // If email-designer fails, just log and continue (so the main flow doesn't fail)
        strapi.log.error("email-designer send failed:", designerErr);
      }

      // Return success + saved DB entry
      ctx.send({
        success: true,
        message: "Application submitted successfully",
        data: newEntry,
      });
    } catch (error) {
      strapi.log.error("Error in internship application controller:", error);
      ctx.throw(500, "Failed to submit internship application");
    }
  },
});
