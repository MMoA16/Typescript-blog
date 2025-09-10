// "use strict";

// /**
//  * @type {any}
//  */
// const strapi = global.strapi;
// const nodemailer = require("nodemailer");

// const teamTemplate = (
//   firstName,
//   lastName,
//   email,
//   phone,
//   expertise,
//   jobTitle, 
//   experience,
//   location,
//   university,
//   batch,
//   organization,
//   noticePeriod,  
//   description,
//   fileName
// ) => `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <style>
//         body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
//         .card { background: #fff; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto; }
//         h2 { color: #222; }
//         p { font-size: 15px; color: #444; margin: 6px 0; }
//       </style>
//     </head>
//     <body>
//       <div class="card">
//         <h2>📩 New Job Application Received</h2>
//         <p><strong>First Name:</strong> ${firstName}</p>
//         <p><strong>Last Name:</strong> ${lastName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Area of Expertise:</strong> ${expertise}</p>
//         <p><strong>Job Title:</strong> ${jobTitle}</p>
//         <p><strong>Years of Experience:</strong> ${experience}</p>
//         <p><strong>University:</strong> ${university}</p>
//         <p><strong>Batch Year:</strong> ${batch}</p>
//         <p><strong>Current Organization:</strong> ${organization}</p>
//         <p><strong>Location:</strong> ${location}</p>
//         <p><strong>Notice Period:</strong> ${noticePeriod}</p>
//         <p><strong>Description:</strong><br/> ${description || "N/A"}</p>
//         <p><strong>Resume File:</strong> ${fileName || "No file uploaded"}</p>
//       </div>
//     </body>
//   </html>
// `;

// module.exports = {
//   async send(ctx) {
//     try {
//       const {
//                 firstName,
//                 lastName,
//                 phone,
//                 email,
//                 expertise,
//                 jobTitle,
//                 experience,
//                 location,
//                 university,
//                 batch,
//                 organization,
//                 noticePeriod,
//                 description,
//                 fileName,
//                 } = ctx.request.body.data;

//       // Save in Strapi database
//       const savedApplication = await strapi.db.query("api::job-application.job-application").create({
//         data: {
//           FirstName:firstName,
//           LastName:lastName,
//           Phone:phone,
//           Email:email,
//           AreaOfExpertise:expertise,
//           JobTitle:jobTitle,
//           yearsOfExperience:experience,
//           CurrentLocation:location,
//           UniversityName:university,
//           BatchYear:batch,
//           CurrentOrganization:organization,
//           NoticePeriod:noticePeriod,
//           UploadResume:fileName,
//           Description:description,
//         },
//       });

//       const transporter = nodemailer.createTransport({
//                       service: "gmail",
//                       auth: {
//                         user: process.env.SMTP_USER,
//                         pass: process.env.SMTP_PASS,
//                       },
//                     });
      
      
//               await transporter.sendMail({
//               from: `"Hr Team" <${process.env.SMTP_USER}>`,
//               to: process.env.ENQUIRY_TEAM_EMAIL,
//               subject: `New Job Application`,
//               html: teamTemplate(
//                 firstName,
//                 lastName,
//                 email,
//                 phone,
//                 jobTitle,
//                 expertise,
//                 university,
//                 location,
//                 noticePeriod,
//                 batch,
//                 experience,
//                 description,
//                 fileName
//         ),
//             });

//             await strapi
//         .plugin("email-designer")
//         .service("email")
//         .sendTemplatedEmail(
//           {
//             to: email,
//             from: `"IntellectiaFirm" <${process.env.SMTP_USER}>`,
//             replyTo: process.env.SMTP_USER,
//           },
//           {
            
//             templateReferenceId: 3,
//             subject: "We have received your Application!",
        
//           },
//           // {
//           //   user: { name, email, message },
//           // }
//         );

//       ctx.send({ success: true, message: "Emails sent with custom template!" });
  
      

//       ctx.send({
//         success: true,
//         message: "Application saved successfully",
//         application: savedApplication,
//       });
//     } catch (err) {
//       ctx.send({ success: false, error: err.message }, 500);
//     }
//   },

//   // async create(ctx) {
//   //   try {
//   //     const data = ctx.request.body.data || ctx.request.body;

//   //     const applicationService = strapi.service("api::job-application.job-application");
//   //     const entity = await applicationService.create({ data });

//   //     ctx.send(entity);
//   //   } catch (err) {
//   //     ctx.send({ success: false, error: err.message }, 500);
//   //   }
//   // },
// };


"use strict";

/**
 * @type {any}
 */
const strapi = global.strapi;
const nodemailer = require("nodemailer");

// ✅ Keep consistent parameter order
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
  fileName
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
        <p><strong>Resume File:</strong> ${fileName || "No file uploaded"}</p>
      </div>
    </body>
  </html>
`;

module.exports = {
  async send(ctx) {
    try {
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
        fileName,
      } = ctx.request.body.data;

      // ✅ Save in Strapi database
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
            YearsOfExperience: experience,
            CurrentLocation: location,
            UniversityName: university,
            BatchYear: batch,
            CurrentOrganization: organization,
            NoticePeriod: noticePeriod,
            UploadResume: fileName,
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

      // ✅ Send notification email to HR team
      await transporter.sendMail({
        from: `"HR Team" <${process.env.SMTP_USER}>`,
        to: process.env.ENQUIRY_TEAM_EMAIL,
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
          fileName
        ),
      });

      // ✅ Send acknowledgment email to applicant (via Strapi Email Designer)
      await strapi.plugin("email-designer").service("email").sendTemplatedEmail(
        {
          to: email,
          from: `"IntellectiaFirm" <${process.env.SMTP_USER}>`,
          replyTo: process.env.SMTP_USER,
        },
        {
          templateReferenceId: 3,
          subject: "We have received your Application!",
        }
      );

      ctx.send({
        success: true,
        message: "Application saved and emails sent successfully",
        application: savedApplication,
      });
    } catch (err) {
      ctx.send({ success: false, error: err.message }, 500);
    }
  },
};
