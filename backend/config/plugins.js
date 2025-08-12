module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "strapi-provider-email-mailjet",
        providerOptions: {
          publicApiKey: env("MAILJET_PUBLIC_KEY"),
          secretApiKey: env("MAILJET_SECRET_KEY"),
        },
        settings: {
          defaultFrom: "Intellectia Firm",
          defaultFromName: "Deepak Baligar",
        //   defaultTo: "john.doe@ijs.to",
        //   defaultToName: "Johnny Bravodoe",
        },
      },
      // ...
    }
});