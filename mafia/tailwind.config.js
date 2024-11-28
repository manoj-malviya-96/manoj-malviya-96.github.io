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
        "primary": "#bababa",
        "secondary": "#656565",
        "accent": "#cacaca",
        "neutral": "#9a7976",
        "base-100": "#ffffff",
        "info": "#3c5b8a",
        "success": "#3e9868",
        "warning": "#bdb16c",
        "error": "#954b4a",
      },
      dark: {
        "primary": "#454545",
        "secondary": "#4e4e4e",
        "accent": "#bcbcbc",
        "neutral": "#bcbcbc",
        "base-100": "#000000",
        "info": "#3c5b8a",
        "success": "#3e9868",
        "warning": "#bdb16c",
        "error": "#954b4a",
      }

    }], // Add more themes here if needed
  },
};


