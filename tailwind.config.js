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
                "primary": "#c8c8c8",
                "secondary": "#939393",
                "accent": "#0d0d0d",
                "neutral": "#797979",
                "base-100": "#e8e8e8",
                "info": "#60a5fa",
                "success": "#34d399",
                "warning": "#fb923c",
                "error": "#fb7185",
            },
            Dark: {
                "primary": "#0d0d0d",
                "secondary": "#656565",
                "accent": "#c8c8c8",
                "neutral": "#797979",
                "base-100": "#00000d",
                "info": "#2563eb",
                "success": "#047857",
                "warning": "#d97706",
                "error": "#e11d48",
            }
        }], // Add more themes here if needed
    },
};

