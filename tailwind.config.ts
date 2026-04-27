import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paper & ink — warm, aged, California-valley light
        cream: {
          50: "#FBF7EC",
          100: "#F5EFE0",
          200: "#ECE2CA",
          300: "#DCCDAE",
        },
        ink: {
          DEFAULT: "#1C1917",
          faded: "#3F3A35",
          soft: "#6B6358",
        },
        oak: {
          DEFAULT: "#5B4636",
          light: "#806A56",
        },
        sage: {
          DEFAULT: "#8A9A7B",
          dim: "#6E7E60",
        },
        poppy: "#D97706",
        rust: "#A0522D",
      },
      fontFamily: {
        // Set via next/font in fonts.ts — these are CSS-var fallbacks
        serif: ["var(--font-garamond)", "Georgia", "serif"],
        display: ["var(--font-fell)", "Georgia", "serif"],
      },
      boxShadow: {
        book: "0 30px 60px -20px rgba(28, 25, 23, 0.35), 0 18px 36px -18px rgba(28, 25, 23, 0.25)",
        spread: "inset 0 0 40px rgba(91, 70, 54, 0.08)",
      },
      animation: {
        drift: "drift 32s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-6px, 4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
