/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundColor: {
        'gradient-45deg': 'linear-gradient(45deg, #000, #008C99, #1D253B)',
      },
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

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class", // or 'media'
  variants: {},
  plugins: [require("tailwindcss-animate")],
};
