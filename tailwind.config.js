module.exports = {
  content: ["./src/**/*.{js,ts,css}", "./index.html"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "var(--sc-rounded-sm)",
      DEFAULT: "var(--sc-rounded)",
      md: "var(--sc-rounded-md)",
      lg: "var(--sc-rounded-lg)",
      xl: "var(--sc-rounded-xl)",
      full: "9999px",
    },
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
  },
  plugins: [],
};
