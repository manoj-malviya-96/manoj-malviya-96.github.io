/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        "primary": "#c6c6c6",
        "secondary": "#656565",
        "accent": "#595959",
        "neutral": "#bcbcbc",
        "base-100": "#ffffff",
        /* Keep the following colors same */
        "info": "#3c5b8a",
        "success": "#3e9868",
        "warning": "#bdb16c",
        "error": "#954b4a",
      },
      dark: {
        "primary": "#454545",
        "secondary": "#4e4e4e",
        "accent": "#c6c6c6",
        "neutral": "#bcbcbc",
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


