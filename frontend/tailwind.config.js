const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      opacity: ['disabled'],
      colors: {
        primary: '#0d253f',
        secondary: '#01b4e4',
        tertiary: '#90cea1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
});
