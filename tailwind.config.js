/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#0D0714",
        "secondary-bg": "#1D1825",
        "main-foreground": "#9E78CF",
        card: "#15101C",
      },
    },
  },
  plugins: [],
};
