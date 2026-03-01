import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-teal-500", "text-teal-400", "text-teal-600", "text-teal-300",
    "text-amber-600", "text-warmGray-700",
    "bg-teal-50", "bg-amber-50", "bg-warmGray-50",
    "border-teal-200", "border-amber-200", "border-warmGray-200",
    "animate-fade-up", "animate-fade-in",
    "animate-delay-100", "animate-delay-200", "animate-delay-300",
    "animate-delay-400", "animate-delay-500",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#1F5F5F",
          50: "#E8F0F0",
          100: "#C5D9D9",
          200: "#8FB6B6",
          300: "#5A9393",
          400: "#2E7070",
          500: "#1F5F5F",
          600: "#1A5050",
          700: "#133D3D",
          800: "#0D2A2A",
          900: "#061515",
        },
        warmGray: {
          DEFAULT: "#F5F5F5",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EBEBEB",
          300: "#D6D6D6",
          400: "#ADADAD",
          500: "#858585",
          600: "#5C5C5C",
          700: "#3D3D3D",
          800: "#1F1F1F",
          900: "#141414",
        },
        gold: "#C9A84C",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Lato", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "teal-gradient": "linear-gradient(135deg,#1F5F5F 0%,#133D3D 100%)",
        "hero-overlay": "linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.5) 60%,rgba(31,95,95,0.7) 100%)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.16)",
        glass: "0 8px 32px rgba(31,95,95,0.14)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
