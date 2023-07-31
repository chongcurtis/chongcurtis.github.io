/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                // color names found via this website: https://www.color-name.com/hex/ff947d
                "background-color": "#FFF0F1", // TODO: restore this color
                // "background-color": "black",
                // "text-primary": "white",
                "sleepover-primary": "#FF947D",
                "sleepover-secondary": "#66ccff",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            gridTemplateColumns: {
                // sidebar: "350px auto", // for sidebar sidebar. adds grid-cols-sidebar class
            },
        },
        ...defaultTheme,
    },
    plugins: [],
};
