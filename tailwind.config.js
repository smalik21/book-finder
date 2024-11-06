/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#112B3C",
        secondary: "#205375",
        highlight: "#F66B0E",
        textPrimary: "#EFEFEF",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [],
};
