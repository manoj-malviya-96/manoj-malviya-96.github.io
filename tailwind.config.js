/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui'), require("tailwind-scrollbar")],
    daisyui: {
        themes: [{
            Light: {
                "primary": "#9ca3af",

                "secondary": "#9ca3af",

                "accent": "#4A516D",

                "neutral": "#cdcdcd",

                "base-100": "#ffffff",

                "info": "#60a5fa",

                "success": "#34d399",

                "warning": "#fb923c",

                "error": "#fb7185",
            },
            Dark: {

                "primary": "#222222",

                "secondary": "#595959",

                "accent": "#4A516D",

                "neutral": "#cdcdcd",

                "base-100": "#000000",

                "info": "#2563eb",

                "success": "#047857",

                "warning": "#d97706",

                "error": "#e11d48",
            }
        }], // Add more themes here if needed
    },
};

