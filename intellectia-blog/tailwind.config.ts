/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: {
          "100": "#fbfbfb",
          "200": "#050505",
          "300": "rgba(0, 0, 0, 0)",
          "900": "#000000",
        },
        gainsboro: "#e3e3e3",
      },
      spacing: {},
      fontFamily: {
        "dm-sans": "'DM Sans'",
        "dm-serif-display": "'DM Serif Display'",
      },
      borderRadius: {
        "53xl": "72px",
      },
    },
    fontSize: {
      lg: "18px",
      base: "16px",
      "21xl": "40px",
      "109xl": "128px",
      "5xl": "24px",
      "3xl":"18px",
      inherit: "inherit",
    },
    
  },
  corePlugins: {
    preflight: false,
  },
};
