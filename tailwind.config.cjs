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
        'gradient-45deg': 'linear-gradient(45deg, #000, #8C5E28, #1C1C1C)',
      },
      boxShadow: {
        box: "0px 0px 10px -2px #0d0d0d",
      },
      colors: {

        "blackish": "#2C2C2C",
        "blackish-darken": "#1C1C1C",
        "blackish-lighten": "#3D3D3D",

        "copper": "#B87333",
        "copper-darken": "#8C5E28",
        "copper-lighten": "#D89B63",

        "copper-gray-light": "#b9a79f4d",
        "copper-gray": "#b9a79f",
        "copper-gray-darken": "#8c6e5d",

        "cool-gray": "#9B9B9B",
        "cool-gray-light": "#D3D3D3",
        "cool-gray-dark": "#7D7D7D",

        "warm-gray": "#BDBDBD",
        "warm-gray-light": "#CFCFCF",
        "warm-gray-dark": "#A0A0A0",

        "light-gray": "#F5F5F5",
        white: "#FFFFFF",

        body: '#64748B',
        bodydark: '#AEB7C0',
        bodydark1: '#DEE4EE',
        bodydark2: '#8A99AF',

        "link-blue": "#0070F3",

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
