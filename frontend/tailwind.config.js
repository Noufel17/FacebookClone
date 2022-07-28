module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          blue: "var(--blue-color)",
          green: "var(--green-color)",
          lightBlue: "var(--light-blue-color)",
          border: "var(--border-color)",
        },
        dark: {
          primary: "var(--dark-color-primary)",
          secondary: "var(--dark-color-secondary)",
        },
      },
      backgroundColor: {
        light: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          third: "var(--bg-third)",
          fourth: "var(--bg-fourth)",
          blur: "var(--bg-blur)",
        },
        dark: {
          primary: "var(--dark-bg-primary)",
          secondar: "var(--dark-bg-secondary)",
          third: "var(--dark-bg-third)",
        },
      },
      boxShadowColor: {
        first: "var(--shadow-1)",
        second: "var(--shadow-2)",
        third: "var(--shadow-3)",
        inset: "var(--shadow-inset)",
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "78v": "78vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      width: {
        76: "18.75rem",
        84: "21.875rem",
      },
      borderRadius: {
        lgx: "0.625rem",
      },
      gap: {
        1.5: "0.375rem",
      },
      borderColor: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        blue: "var(--blue-color)",
        green: "var(--green-color)",
        lightBlue: "var(--light-blue-color)",
        border: "var(--border-color)",
        third: "var(--bg-third)",
        fourth: "var(--bg-fourth)",
      },
      borderTopWidth: {
        10: "10px",
      },
      borderButtomWidth: {
        10: "10px",
      },
      borderLeftWidth: {
        10: "10px",
      },
      borderRightWidth: {
        10: "10px",
      },
    },
    screens: {
      small: "539px",
      medium: "650px",
      desktop: "850px",
    },
  },
  plugins: [],
};
