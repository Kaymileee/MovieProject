/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: { body: ["Assistant", "sans-serif"] },
      colors: { primary: "#20E3B2" },
    },
  },
  plugins: [],
};
