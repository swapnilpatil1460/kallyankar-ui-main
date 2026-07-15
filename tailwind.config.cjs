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
        "theme-c2": "#1e1e1e", // Mid-level black for cards
        "theme-c3": "#2d2d2d", // Borders/Hover states
        "theme-bg": "#121212", // Mid-level black background
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
