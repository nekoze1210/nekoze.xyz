const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cod-gray': '#151414',
        'wild-sand': '#F5F5F5',
        abbey: '#424346',
        aluminium: '#A2A5AC',
      },
      width: {
        '806px': '806px',
      },
      maxWidth: {
        '806px': '806px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
