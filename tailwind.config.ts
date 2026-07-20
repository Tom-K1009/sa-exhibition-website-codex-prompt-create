import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "Arial", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "Arial", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        ink: "#0a0a0a",
        midnight: "#111111",
        aurora: "#bcc5c9",
        pulse: "#d4d4d0",
        pearl: "#f2f2ef"
      },
      boxShadow: {
        glow: "0 12px 50px rgba(0, 0, 0, 0.3)",
        card: "0 24px 80px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
