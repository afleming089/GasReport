/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/index.tsx",".src/app/views/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}