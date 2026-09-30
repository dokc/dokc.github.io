module.exports = {
  plugins: {
    // Scan templates relative to the project root, regardless of where hugo is launched from.
    '@tailwindcss/postcss': { base: __dirname },
    autoprefixer: {},
  },
}
