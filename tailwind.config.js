/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
        foreground: "#E5E7EB", // light gray for text
        background: "#2D3A2E", // same as olive default
      },
      fontFamily: {
        mono: ['"Martian Mono"', "monospace"],
        lato: ["Lato", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
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
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
