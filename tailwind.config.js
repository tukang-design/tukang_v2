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
        // Brand palette
        accent: "#39FF14", // deep green
        olive: {
          50: "#f3f6f4", // very light olive
          100: "#e2e9e3", // light olive
          200: "#c6d4c9", // soft olive
          300: "#9fb6a5", // muted olive
          400: "#74937d", // medium olive
          500: "#54755e", // olive
          600: "#3e5947", // deep green
          700: "#33493b", // darker olive
          800: "#2a3b30", // very dark olive
          900: "#233128", // darkest olive
          950: "#131b16", // almost black
        },
        brown: {
          50: "#EFEBE8",
          100: "#E6D9D1",
          200: "#D7C0AA",
          300: "#C4A488",
          400: "#AE8161",
          500: "#8E6B4F",
          600: "#7A533E",
          700: "#5F3F2E",
          800: "#432819",
          900: "#2B160C",
          950: "#1A0F08",
        },
        butter: "#F2DC99", // light surface
        foreground: "#E5E7EB", // light gray for text
        background: "#0D0D0D", // page background
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
