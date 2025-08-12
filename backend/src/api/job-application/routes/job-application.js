module.exports = {
  routes: [
    {
      method: "POST",
      path: '/job-application/send',  
      handler: 'job-application.send',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
