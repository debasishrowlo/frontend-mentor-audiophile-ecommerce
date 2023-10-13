const fontSizes = {}
const minFontSize = 12
const maxFontSize = 70
const base = 16
let i = minFontSize
while (i <= maxFontSize) {
  fontSizes[i] = `${i / base}rem`
  i += 2
}

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: fontSizes,
    extend: {
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      spacing: {
        "4.5": "1.125rem", // 18px
      },
      colors: {
        gray: {
          100: "#FAFAFA",
          200: "#F1F1F1",
          300: "#101010",
        },
        orange: {
          100: "#fbaf85",
          200: "#D87D4A",
        },
        white: "#ffffff",
        black: "#000000",
      }
    },
  },
  plugins: [],
}