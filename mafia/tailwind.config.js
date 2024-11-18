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
                "primary": "#c6c6c6",
                "secondary": "#656565",
                "accent": "#595959",
                "neutral": "#838383",
                "base-100": "#ffffff",
                /* Keep the following colors same */
                "info": "#3c5b8a",
                "success": "#3e9868",
                "warning": "#bdb16c",
                "error": "#954b4a",
            },
            Dark: {
                "primary": "#454545",
                "secondary": "#4e4e4e",
                "accent": "#c6c6c6",
                "neutral": "#838383",
                "base-100": "#000000",
                /* Keep the following colors same */
                "info": "#3c5b8a",
                "success": "#3e9868",
                "warning": "#bdb16c",
                "error": "#954b4a",
            }

        }], // Add more themes here if needed
    },
};

