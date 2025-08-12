module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/intership-application/send',
      handler: 'intership-application.send',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
