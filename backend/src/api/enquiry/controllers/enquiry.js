"use strict";

/**
 * @type {any}
 */
const strapi = global.strapi;

module.exports = {
  async send(ctx) {
    try {
      const { name, email, enquiryType, description } = ctx.request.body;

      // 1️⃣ Store the enquiry in Strapi database
      const savedEnquiry = await strapi.db.query("api::enquiry.enquiry").create({
        data: {
          Name: name,
          EnquiryType: enquiryType,
          Email: email,
          Description: description,
        },
      });

      // 2️⃣ Send an email notification
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: "deepakbaligar83@gmail.com",
          from: email,
          subject: `New enquiry from ${name}`,
          text: `
          Name: ${name}
          Email: ${email}
          Type: ${enquiryType}
          Message: ${description}
        `,
        });

      ctx.send({
        success: true,
        message: "Enquiry saved and sent successfully",
        enquiry: savedEnquiry,
      });
    } catch (err) {
      ctx.send({ success: false, error: err.message }, 500);
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body;

      const enquiryService = strapi.service("api::enquiry.enquiry");
      const entity = await enquiryService.create({ data });

      ctx.send(entity);
    } catch (err) {
      ctx.send({ success: false, error: err.message }, 500);
    }
  },
};
