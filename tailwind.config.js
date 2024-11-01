/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  theme: {
    extend: {},
    colors: {
      orange: "var(--orang)",
      textColor: "#363636",
      borderColor: "#e7e7e7",
      gray: "#717171",
    },
    fontFamily: {
      HelveticaNeueReg: "HelveticaNeue Regular",
      HelveticaNeueBold: "HelveticaNeue Bold",
    },
  },
  plugins: [],
};
