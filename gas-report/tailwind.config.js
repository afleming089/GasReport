/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/_layout.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sortOfCyan: "#00ADB5",
        lightGray: "oklch(55.1% 0.027 264.364)",
        darkGray: "oklch(37.3% 0.034 259.733)",
        navyBlack: "#222831",
        offWhite: "#EEEEEE",
        slate: "oklch(44.6% 0.043 257.281)",
      },
    },
  },
  plugins: [],
};
