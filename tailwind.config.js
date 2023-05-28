const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cod-gray': '#151414',
        'wild-sand': '#F5F5F5',
        abbey: '#424346',
        aluminium: '#A2A5AC',
      },
      fontFamily: {
        notoSansJP: ['Noto Sans JP'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
