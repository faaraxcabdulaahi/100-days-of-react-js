module.exports = {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      "dark", // Ensure the "dark" class is not purged
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }