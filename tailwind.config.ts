import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./sanity/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#39FF14", // neon green
        olive: {
          DEFAULT: "#2D3A2E", // dark olive green
          light: "#3C4A3B",
          dark: "#1B241C",
        },
        brown: {
          DEFAULT: "#A78B6F", // earthy muted brown
          light: "#C2B1A1",
          dark: "#7C6247",
        },
        foreground: "#E5E5E5", // light gray for text
        background: "#2D3A2E", // same as olive default
      },
      fontFamily: {
        mono: ['"Martian Mono"', "monospace"],
        lato: ["Lato", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
