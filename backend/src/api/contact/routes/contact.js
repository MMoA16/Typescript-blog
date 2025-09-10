// module.exports = {
//   routes: [
//     {
//       method: "POST",
//       path: "/contact/send",
//       handler: "contact.send",
//       config: {
//         auth: false,
//       },
//     },
//   ],
// };

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/contact/send",
      handler: "contact.send", // matches controller function
      config: { auth: false }, // allow public access
    },
  ],
};


