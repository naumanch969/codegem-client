/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        box: "0px 0px 10px -2px #0d0d0d",
      },
      colors: {
        // Primary Colors
        "dark-slate-blue": "#2E3A59", // Header background, headings
        "dark-slate-blue-darken": "#1D253B", // Darkened variation
        "dark-slate-blue-lighten": "#445270", // Lightened variation

        "teal-blue": "#00A5B5", // Secondary headings, interactive elements
        "teal-blue-darken": "#008C99", // Darkened variation
        "teal-blue-lighten": "#00BFC9", // Lightened variation

        // Secondary Colors
        "cool-gray": "#9B9B9B", // Content area background, paragraph text
        "cool-gray-light": "#D3D3D3", // Lighter variation
        "cool-gray-dark": "#7D7D7D", // Darker variation

        "warm-gray": "#BDBDBD", // Borders, dividers, panels
        "warm-gray-light": "#CFCFCF", // Lighter variation
        "warm-gray-dark": "#A0A0A0", // Darker variation

        // Accent Colors
        "bright-green": "#4CAF50", // Success messages, call-to-action buttons
        "bright-green-light": "#68D768", // Lightened variation
        "bright-green-dark": "#319631", // Darkened variation

        "vibrant-orange": "#FFA500", // Buttons, links, collaboration features
        "vibrant-orange-light": "#FFB84D", // Lightened variation
        "vibrant-orange-dark": "#CC8900", // Darkened variation

        // Background and Text Colors
        "light-gray": "#F5F5F5", // Overall background, form fields
        white: "#FFFFFF", // Clean content areas, headings

        "link-blue": "#0070F3", // Clean content areas, headings

        background: "#FFFFFF",
        foreground: "#F0A103",
        card: "#FFFFFF",
        "card-foreground": "#F0A103",
        popover: "#FFFFFF",
        "popover-foreground": "#F0A103",
        primary: "#E67D7E",
        "primary-foreground": "#FFFAF9",
        secondary: "#F0F0F0",
        "secondary-foreground": "#0A0A0A",
        muted: "#F0F0F0",
        "muted-foreground": "#767676",
        accent: "#F0F0F0",
        "accent-foreground": "#0A0A0A",
        destructive: "#F03A99",
        "destructive-foreground": "#FAFAFA",
        border: "#F0F0F0",
        input: "#F0F0F0",
        ring: "#E67D7E",
        // Dark mode colors should be nested inside 'colors' with the 'dark:' prefix
        "dark-background": "#201E04",
        "dark-foreground": "#FFFFFF",
        "dark-card": "#192727",
        "dark-card-foreground": "#FFFFFF",
        "dark-popover": "#161616",
        "dark-popover-foreground": "#FFFFFF",
        "dark-primary": "#E67D7E",
        "dark-primary-foreground": "#FFFAF9",
        "dark-secondary": "#0F2627",
        "dark-secondary-foreground": "#FFFFFF",
        "dark-muted": "#0F2627",
        "dark-muted-foreground": "#A42E84",
        "dark-accent": "#0C291E",
        "dark-accent-foreground": "#FFFFFF",
        "dark-destructive": "#F03E1E",
        "dark-destructive-foreground": "#FAFAFA",
        "dark-border": "#0F2627",
        "dark-input": "#0F2627",
        "dark-ring": "#E67D7E",
      },
    },
  },
  darkMode: "class", // or 'media' based on what you prefer
  variants: {},
  plugins: [],
};
