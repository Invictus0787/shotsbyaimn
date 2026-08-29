import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          // near-black through charcoal to off-white
          950: "#08080a",
          900: "#0c0c0e",
          850: "#111114",
          800: "#16161a",
          700: "#1d1d22",
          600: "#26262c",
          500: "#3a3a42",
          400: "#5a5a63",
          300: "#8a8a92",
          200: "#b7b7bd",
          100: "#dedee1",
          50: "#eeeeef",
        },
        bone: "#eae6df", // warm off-white for editorial pages
        paper: "#f4f1ec",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        wider2: "0.14em",
        widest2: "0.22em",
      },
      fontSize: {
        micro: ["10px", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        tiny: ["11px", { lineHeight: "1.25", letterSpacing: "0.14em" }],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.6, 0.2, 1)",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
