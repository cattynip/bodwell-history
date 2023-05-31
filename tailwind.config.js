/** @type {import('tailwindcss').Config} */
const tailwindCSSConfig = {
  content: ["./pages/**/*.{jsx,tsx}", "./components/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bbl: "#000080",
        bbm: "#000033",
        bbd: "#000011",
        byl: "#FFED00",
        bym: "#FFD700",
        byd: "#FFB900",
        bsf: "#0C134F",
        bss: "#1D267D",
        bst: "#5C469C",
        bsp: "#D4ADFC",
      },
    },
  },
  plugins: [],
};

module.exports = tailwindCSSConfig;
