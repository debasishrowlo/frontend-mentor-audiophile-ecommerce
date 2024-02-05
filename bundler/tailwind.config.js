const fontSize = {}
const minFontSize = 12
const maxFontSize = 70
const base = 16
let i = minFontSize
while (i <= maxFontSize) {
  fontSize[i] = `${i / base}rem`
  i += 2
}

const borderRadius = [0, 2, 4, 6, 8, 12, 16, 24].reduce((acc, cur) => {
  acc[cur] = `${cur / base}rem`
  return acc
}, {})
borderRadius["full"] = "9999px"

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      borderRadius,
      colors: {
        gray: {
          100: "#FAFAFA",
          200: "#F1F1F1",
          300: "#101010",
        },
        orange: {
          100: "#FBAF85",
          200: "#D87D4A",
        },
        black: "#000000",
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      fontSize,
    }
  },
  plugins: [],
}