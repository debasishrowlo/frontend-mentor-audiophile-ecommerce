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
        'atkinson': ['Atkinson Hyperlegible', 'sans-serif'],
      },
      spacing: {
        "4.5": "1.125rem", // 18px
      },
      colors: {
        orange: {
          100: "#FFB84A",
          200: "#FDA214",
        },
        gray: {
          100: "#FCFCFC",
          200: "#F2F2F2",
          300: "#DFE7EC",
          400: "#BCCED9",
          500: "#6395B8",
          600: "#7191A5",
          700: "#304859",
          800: "#152938",
        },
      }
    },
  },
  plugins: [],
}