/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/Navbar.jsx", // Make sure this path is correct
    // Add other paths to your components and pages
  ],
  theme: {
    extend: {
      screens: {
        'laptop': '1200px',
      },
    },
  },
  plugins: [],
}