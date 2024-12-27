module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      animation: {
        fade: "fade 2s ease-in-out infinite",
      },
      keyframes: {
        fade: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
      },
      colors: {
        lightBackground: "#f8f9fa",
        lightText: "#333333",
        accentLight: "#edf1f5",
        darkBackground: "rgb(30 41 59)", // Dark mode background
        darkText: "#ffffff",
        accentDark: "rgb(17 24 39)", // Dark mode text color
      },
    },
  },
  plugins: [],
};
