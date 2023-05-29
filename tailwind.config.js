/** @type {import('tailwindcss').Config} */
const tailwindCSSConfig = {
  content: ["./pages/**/*.{jsx,tsx}", "./components/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        by: "#FFD601",
        bp: "#5447B8",
      },
    },
  },
  plugins: [],
};

module.exports = tailwindCSSConfig;
