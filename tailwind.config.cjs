/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Libre Baskerville", "sans-serif"],
    },

    extend: {
      fontSize: {
        regular: "12px",
      },
      colors: {
        "theme-c1": "#006c32",
        "theme-c1-b": "#6c8213",
        "theme-c2": "#000000",
        "theme-c3": "#ffffff",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
