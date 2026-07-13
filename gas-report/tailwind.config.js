/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/_layout.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
