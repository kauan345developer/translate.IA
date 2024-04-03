/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#ffffc2",
        color2: "#f0ffc2",
        color3: "#e0ffc2",
        color4: "#d1ffc2",
        color5: "#c2ffc2",
      },
    },
  },
  plugins: [],
};