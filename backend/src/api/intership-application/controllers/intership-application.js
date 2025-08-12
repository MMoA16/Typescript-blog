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
      } = ctx.request.body.data;

      // Save the internship application in the database
      const savedApplication = await strapi.db.query('api::intership-application.intership-application').create({
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

      ctx.send({
        success: true,
        message: 'Internship application saved successfully',
        application: savedApplication,
      });
    } catch (err) {
      ctx.send({ success: false, error: err.message }, 500);
    }
  },
};

