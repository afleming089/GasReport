/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/_layout.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // use hex only because some color methods don`t work with this version of native
      colors: {
        lightGray: "#6a7282",
        darkGray: "#364153",
        navyBlack: "#222831",
        offWhite: "#EEEEEE",
        misty: "#d0d6d8",
        slate: "#45556c",
        skyBlue: "#0069a8",
      },
    },
  },
  plugins: [],
};
