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
        "theme-c1": "#cc0000", // Amaron Red
        "theme-c1-b": "#a30000", // Darker Red for hover
        "theme-c2": "#ffffff", // White for cards/forms
        "theme-c3": "#e5e7eb", // Soft border gray
        "theme-bg": "#f3f4f6", // Light gray background
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
