/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7ECA9C",
        secondary: "#23252B",
        ternary: "#EBECF1",
        "primary-hover": "#7ECA9C70",
        "secondary-hover": "#23252B70",
        "ternary-hover": "#EBECF170",
      },
    },
  },
  plugins: [],
};
