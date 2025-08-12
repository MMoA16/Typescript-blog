"use strict";

/**
 * @type {any}
 */
const strapi = global.strapi;

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

      // Save in Strapi database
      const savedApplication = await strapi.db.query("api::job-application.job-application").create({
        data: {
          FirstName:firstName,
          LastName:lastName,
          Phone:phone,
          Email:email,
          AreaOfExpertise:expertise,
          JobTitle:jobTitle,
          yearsOfExperience:experience,
          CurrentLocation:location,
          UniversityName:university,
          BatchYear:batch,
          CurrentOrganization:organization,
          NoticePeriod:noticePeriod,
          UploadResume:fileName,
          Description:description,
        },
      });

      /*
      // Send notification email
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: "deepakbaligar83@gmail.com",
          from: Email,
          subject: `New Job Application from ${FirstName} ${LastName}`,
          text: `
            Name: ${FirstName} ${LastName}
            Phone: ${Phone}
            Email: ${Email}
            Area of Expertise: ${AreaOfExpertise}
            Job Title: ${JobTitle}
            Years of Experience: ${yearsOfExperience}
            Current Location: ${CurrentLocation}
            University: ${UniversityName}
            Batch Year: ${BatchYear}
            Current Organization: ${CurrentOrganization}
            Notice Period: ${NoticePeriod}
            Description: ${Description}
            Uploaded Resume: ${UploadResume || "No file uploaded"}
          `,
        });
      */

      ctx.send({
        success: true,
        message: "Application saved successfully",
        application: savedApplication,
      });
    } catch (err) {
      ctx.send({ success: false, error: err.message }, 500);
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body.data || ctx.request.body;

      const applicationService = strapi.service("api::job-application.job-application");
      const entity = await applicationService.create({ data });

      ctx.send(entity);
    } catch (err) {
      ctx.send({ success: false, error: err.message }, 500);
    }
  },
};
