/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'krvt_cream': '#FAEBC8',
        'krvt_ochre': '#E17D00',
        'krvt_brick': '#AF3200',
        'krvt_mahogany': '#641900',
        'krvt_vine': '#649619',
        'krvt_moss': '#4B6419',
      },
      fontFamily: {
        'karvat': ['"Suranna"', 'serif'],
        'body': ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
});
