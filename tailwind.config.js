/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // color names found via this website: https://www.color-name.com/hex/ff947d
        "background-color": "#FFF9F9",
        "sleepover-primary": "#FF947D",
        "sleepover-secondary": "#66ccff",
        "light-salmon": "#FF947D",
        "maya-blue": "#66CCFF",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
    ...defaultTheme,
  },
  plugins: [],
}
