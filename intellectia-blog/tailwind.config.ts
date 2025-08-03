/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      width: {
        
        300: "300px"
      },
      colors: {
        white: "#fff",
        black: "#000",
        gray: {
          "100": "#fbfbfb",
          "200": "#050505",
          "300": "rgba(0, 0, 0, 0)",
          "400": "#cccccc",
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
      xl: "22px",
      "19xl":"32px",
      "20xl":"36px",
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

