/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            scrollBehavior: ['smooth'],
        },
    },
    plugins: [require('daisyui'), require("tailwind-scrollbar")],
    daisyui: {
        themes: [{
            Light: {
                "primary": "#f7f7f7",
                "base-100": "#f7f7f7",
                "secondary": "#151515",
                "accent": "#EE444C",
                "neutral": "#797979",
                "info": "#60a5fa",
                "success": "#32cd4b",
                "warning": "#f59e0b",
                "error": "#ef4444",
            },
            Dark: {
                "primary": "#000000",
                "base-100": "#000000",
                "secondary": "#f7f7f7",
                "accent": "#EE444C",
                "neutral": "#797979",
                "info": "#233e9a",
                "success": "#116e29",
                "warning": "#a57e06",
                "error": "#ef4444",
            }
        }],
    },
};

