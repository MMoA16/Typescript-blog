module.exports = {
  routes: [
    {
      method: "POST",
      path: "/enquiry/send",
      handler: "enquiry.send",
      config: {
        auth: false,
      },
    },
  ],
};
