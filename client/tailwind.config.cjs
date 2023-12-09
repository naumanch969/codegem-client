/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow:{
        'box':'0px 0px 10px -2px #0d0d0d'
      },
      colors: {
        // Primary Colors
        'dark-slate-blue': '#2E3A59',   // Header background, headings
        'dark-slate-blue-darken': '#1D253B',   // Darkened variation
        'dark-slate-blue-lighten': '#445270',  // Lightened variation

        'teal-blue': '#00A5B5',         // Secondary headings, interactive elements
        'teal-blue-darken': '#008C99',         // Darkened variation
        'teal-blue-lighten': '#00BFC9',        // Lightened variation

        // Secondary Colors
        'cool-gray': '#9B9B9B',         // Content area background, paragraph text
        'cool-gray-light': '#D3D3D3',          // Lighter variation
        'cool-gray-dark': '#7D7D7D',           // Darker variation

        'warm-gray': '#BDBDBD',         // Borders, dividers, panels
        'warm-gray-light': '#CFCFCF',          // Lighter variation
        'warm-gray-dark': '#A0A0A0',           // Darker variation

        // Accent Colors
        'bright-green': '#4CAF50',      // Success messages, call-to-action buttons
        'bright-green-light': '#68D768',       // Lightened variation
        'bright-green-dark': '#319631',        // Darkened variation

        'vibrant-orange': '#FFA500',    // Buttons, links, collaboration features
        'vibrant-orange-light': '#FFB84D',     // Lightened variation
        'vibrant-orange-dark': '#CC8900',      // Darkened variation

        // Background and Text Colors
        'light-gray': '#F5F5F5',        // Overall background, form fields
        'white': '#FFFFFF',             // Clean content areas, headings
        
        'link-blue': '#0070F3',             // Clean content areas, headings

      },
    },
  },
  variants: {},
  plugins: [],
};
