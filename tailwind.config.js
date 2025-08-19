/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Exclude the demos directory
    "!./src/demos/**/*"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}