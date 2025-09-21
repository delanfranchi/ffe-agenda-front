module.exports = {
  content: ["./src/**/*.{js,ts,css}", "./index.html"],
  theme: {

    colors: {
      transparent: "transparent",
      current: "currentColor",
      neutral: {
        bg: "var(--ffe-base)",
        content: "var(--ffe-base-content)",
      },
      primary: {
        DEFAULT: "var(--ffe-primary)",
        content: "var(--ffe-primary-content)",
      },

    },
    fontFamily: {
      headings: ["var(--ffe-headings-font-family)"],
    },
  },
  plugins: [],
};
