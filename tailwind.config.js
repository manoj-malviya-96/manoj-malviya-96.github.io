/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui'), require("tailwind-scrollbar")],
    daisyui: {
        themes: [{
            Light: {
                "primary": "#f7f7f7",
                "base-100": "#f7f7f7",
                "secondary": "#dddddd",
                "accent": "#373737",
                "neutral": "#797979",
                "info": "#60a5fa",
                "success": "#32cd4b",
                "warning": "#fb923c",
                "error": "#fb7185",
            },
            Dark: {
                "primary": "#000000",
                "base-100": "#000000",
                "secondary": "#1b1b1b",
                "accent": "#a9a9a9",
                "neutral": "#797979",
                "info": "#233e9a",
                "success": "#116e29",
                "warning": "#d97706",
                "error": "#ba322d",
            }
        }],
    },
};

