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
        '600px': '600px',
      },
      maxWidth: {
        '600px': '600px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
