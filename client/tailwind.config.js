/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "320px",
      "w-370": "270px",
      "w-440": "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // colors: {
    //   color_black: "#232525", // black
    //   color_white: "#f9fcfa", // white
    //   color_gray: "#f2eeed", // gray
    //   color_primary: "#3501e9", // violet
    //   color_secondary: "#f60354", // pink
    //   color_secondary_light: "#eab4be", // light pink
    // },
  },
  plugins: [],
};
