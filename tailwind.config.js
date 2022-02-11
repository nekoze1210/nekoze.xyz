const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cod-gray': '#151414',
        'wild-sand': '#F5F5F5',
      },
      width: {
        '510px': '510px',
      },
      maxWidth: {
        '510px': '510px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
