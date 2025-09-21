module.exports = {
  content: ["./src/**/*.{js,ts,css}", "./index.html"],
  theme: {

    colors: {
      transparent: "transparent",
      current: "currentColor",
      neutral: {
        bg: "var(--ffe-neutral-bg)",
        content: "var(--ffe-neutral-content)",
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
