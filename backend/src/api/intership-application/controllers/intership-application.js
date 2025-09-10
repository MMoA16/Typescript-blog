// "use strict";

// /**
//  * @type {any}
//  */
// const strapi = global.strapi;



// module.exports = {
//   async send(ctx) {
//     try {
//       const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       graduationStatus,
//       university,
//       location,
//       currentYear,
//       batch,
//       practise,
//       description,
//       fileName
//       } = ctx.request.body.data;

//       // Save the internship application in the database
//       const savedApplication = await strapi.db.query('api::intership-application.intership-application').create({
//         data: {
//           FirstName: firstName,
//           LastName: lastName,
//           Phone: phone,
//           Email: email,
//           AreaOfExpertise: practise,
//           GraduationStatus: graduationStatus,
//           CurrentLocation: location,
//           UniversityName: university,
//           BatchYear: batch,
//           CurrentYear: currentYear,
//           UploadResume: fileName,
//           Description: description,
//         },
//       });

//       ctx.send({
//         success: true,
//         message: 'Internship application saved successfully',
//         application: savedApplication,
//       });
//     } catch (err) {
//       ctx.send({ success: false, error: err.message }, 500);
//     }
//   },
// };

"use strict";

/**
 * @type {any}
 */
const strapi = global.strapi;
const nodemailer = require("nodemailer");

const teamTemplate = (
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
        <h2>📩 New Internship Application Received</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Graduation Status:</strong> ${graduationStatus}</p>
        <p><strong>University:</strong> ${university}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Current Year:</strong> ${currentYear}</p>
        <p><strong>Batch:</strong> ${batch}</p>
        <p><strong>Area of Expertise:</strong> ${practise}</p>
        <p><strong>Description:</strong><br/> ${description}</p>
        <p><strong>Resume File:</strong> ${fileName}</p>
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
        email,
        phone,
        graduationStatus,
        university,
        location,
        currentYear,
        batch,
        practise,
        description,
        fileName,
      } = ctx.request.body.data;



      // Save the internship application in the database
      const savedApplication = await strapi.db
        .query("api::intership-application.intership-application")
        .create({
          data: {
            FirstName: firstName,
            LastName: lastName,
            Phone: phone,
            Email: email,
            AreaOfExpertise: practise,
            GraduationStatus: graduationStatus,
            CurrentLocation: location,
            UniversityName: university,
            BatchYear: batch,
            CurrentYear: currentYear,
            UploadResume: fileName,
            Description: description,
          },
        });

        const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                },
              });


        await transporter.sendMail({
        from: `"Hr Team" <${process.env.SMTP_USER}>`,
        to: process.env.ENQUIRY_TEAM_EMAIL,
        subject: `New Internship Application`,
        html: teamTemplate(
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
          fileName
  ),
      });

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
            
            templateReferenceId: 4,
            subject: "We have received your Application!",
        
          },
          // {
          //   user: { name, email, message },
          // }
        );

      ctx.send({ success: true, message: "Emails sent with custom template!" });

      ctx.send({
        success: true,
        message: "Internship application saved successfully",
        application: savedApplication,
      });
    } catch (err) {
      ctx.send({ success: false, error: err.message }, 500);
    }
  },
};
