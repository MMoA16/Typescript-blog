
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

const userTemplate = (name) => `
    <!DOCTYPE html>
 <html>
   <head>
     <meta charset="UTF-8" />
     <title>Email Template</title>
   </head>
   <body style="margin:0; padding:0; font-family: 'Inter', Arial, sans-serif; background:#f6f9fc;">

     <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
       <tr>
         <td align="center" style="padding:20px;">
           <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; border-radius:4px; overflow:hidden;">

            <!-- Logo -->
             <tr>
               <td align="left" style="padding:20px;">
                 <img src="https://raw.githubusercontent.com/MMoA16/Typescript-blog/my-feature-branch/intellectia-blog/public/images/intellectia.png?raw=true"
                       alt="Company Logo" style="max-width:65px; border-radius: 1px;" draggable="false" oncontextmenu="return false;">
                </td>
                <td align="right" style="padding:20px; font-size:14px; color:#555;">
                  <a href="#" style="color:#555; text-decoration:none; font-weight:400;">Get in Touch</a>
                </td>
              </tr>

              <!-- Hero Image -->
              <tr>
                <td colspan="2" align="center">
                 <img 
                  src="https://raw.githubusercontent.com/MMoA16/Typescript-blog/my-feature-branch/intellectia-blog/public/images/mail.png?raw=true" 
                   alt="Welcome Image" 
                   style="width:100%; max-width:150px; display:block;" 
                   draggable="false" 
                   oncontextmenu="return false;">
                 </td>
               </tr>

               <!-- Main Content -->
               <tr>
                 <td colspan="2" style="padding:30px;">
                   <h2 style="color:#333; margin:0 0 15px; font-size:18px; font-family:'Inter', Arial, sans-serif;">Hi, ${name || "Friend"}!</h2>
                   <p style="color:#555; font-size:15px; line-height:1.6; margin:0 0 20px; font-family:'Inter', Arial, sans-serif;">
                     We’ve received your message and our team will get back to you shortly.  
                     Our team is reviewing your request and will respond shortly.
                   </p>

                   <p style="color:#555; font-size:15px; line-height:1.6; margin:0 0 10px; font-family:'Inter', Arial, sans-serif;">
                     We’ll be in touch soon to ensure your onboarding is smooth. If you have any questions, simply reply to this email.
                   </p>

                   <p style="color:#555; font-size:15px; line-height:1.6; font-family:'Inter', Arial, sans-serif; font-weight:400;">
                     Glad to have you with us!
                   </p>
                   <p style="color:#555; font-size:15px; line-height:1.6; font-family:'Inter', Arial, sans-serif; font-weight:400; margin-top:-25px;">
                     The Team,
                   </p>
                   <p style="color:#555; font-size:15px; line-height:1.6; font-family:'Inter', Arial, sans-serif; font-weight:600; margin-top:-25px;">
                     Intellectia Firm
                   </p>
                 </td>
               </tr>

               <!-- Footer -->
               <tr>
                 <td colspan="2" align="center" style="padding:20px; background:#f9f9f9; font-size:13px; color:#888; font-family:'Inter', Arial, sans-serif;">
                   Stay in touch with us from anywhere. 
                   <a href="#" style="color:#1f2937; text-decoration:none; font-weight:700;">Visit our Website</a><br/><br/>

                   <a href="#" style="color:#1f2937; text-decoration:none; margin:0 5px; font-weight:700;">Blog</a> | 
                   <a href="#" style="color:#1f2937; text-decoration:none; margin:0 5px; font-weight:700;">About Us</a> | 
                   <a href="#" style="color:#1f2937; text-decoration:none; margin:0 5px; font-weight:700;">Careers</a> | 
                   <a href="#" style="color:#1f2937; text-decoration:none; margin:0 5px; font-weight:700;">Practices</a>

                   <!-- Social Icons -->
                   <div style="margin-top:15px;">
                     <a href="#" style="margin:0 6px; display:inline-block;">
                       <img src="https://img.icons8.com/?size=100&id=8818&format=png&color=000000" width="24" height="24" alt="Facebook" style="display:block;" draggable="false" oncontextmenu="return false;">
                     </a>
                   <a href="#" style="margin:0 6px; display:inline-block;">
                     <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" width="24.5" height="24.5" alt="Twitter" style="display:block;" draggable="false" oncontextmenu="return false;">
                   </a>
                   <a href="#" style="margin:0 6px; display:inline-block;">
                     <img src="https://img.icons8.com/?size=100&id=32320&format=png&color=000000" width="27" height="27" alt="Instagram" style="display:block;" draggable="false" oncontextmenu="return false;">
                   </a>
                   <a href="#" style="margin:0 6px; display:inline-block;">
                     <img src="https://img.icons8.com/?size=100&id=98960&format=png&color=000000" width="25" height="25" alt="LinkedIn" style="display:block;" draggable="false" oncontextmenu="return false;">
                    </a>
                 </div>
               </td>
             </tr>

           </table>
           </td>
         </tr>
       </table>

     </body>
   </html>

`;

module.exports = {
  send: async (ctx) => {
    try {
      const { name, email, message } = ctx.request.body;

      // 1️⃣ Save contact in DB
      const savedContact = await strapi.db.query("api::contact.contact").create({
        data: { Name: name, Email: email, Message: message },
      });

      // 2️⃣ Fetch back the saved data (ensures we send exactly what’s stored)
      const contactData = await strapi.db
        .query("api::contact.contact")
        .findOne({ where: { id: savedContact.id } });

      // 3️⃣ Setup transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // 4️⃣ Send mail to team (from DB data, not raw request)
      await transporter.sendMail({
        from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
        to: process.env.ENQUIRY_TEAM_EMAIL,
        subject: "New Message",
        html: teamTemplate(contactData.Name, contactData.Email, contactData.Message),
      });

      // 5️⃣ Send acknowledgement email to user (still fine to use `name` here)
      await transporter.sendMail({
        from: `"Enquiry Team" <${process.env.SMTP_USER}>`,
        to: contactData.Email,
        subject: "We have received your message",
        html: userTemplate(contactData.Name),
      });

      ctx.send({ success: true, message: "Emails sent with DB-backed templates!" });
    } catch (error) {
      console.error("Error sending message:", error);
      ctx.send({ error: "Failed to send message" }, 500);
    }
  },
};
