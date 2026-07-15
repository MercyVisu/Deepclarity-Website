import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f3f0",
          100: "#d1e7e0",
          200: "#a3cfc1",
          300: "#75b7a2",
          400: "#479f83",
          500: "#0e6b5c",
          600: "#0c5a4d",
          700: "#0a4a40",
          800: "#083a32",
          900: "#062b25",
        },
        cream: {
          50: "#fdfcf9",
          100: "#faf8f2",
          200: "#f5f1e8",
        },
        gold: {
          400: "#d4a544",
          500: "#c1923a",
          600: "#a67c2e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Lora", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;