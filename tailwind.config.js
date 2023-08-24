/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      'stellar-violet-900': '#3E1BDB',
      'stellar-violet-800': '#33248C',
      'stellar-violet-600': '#6400CC',
      'stellar-violet-500': '#5332E6',
      'stellar-violet-200': '#6260EB',
      'stellar-violet-100': '#876fed',
      'stellar-light-warning': '#89344C',
      'stellar-dark-warning': '#482F42',
      'stellar-black': '#222222',
      'stellar-ghostwhite': '#e3e3e3',
      'stellar-gray-100': '#dadde1',
      'stellar-gray-500': '#3A3E4D',
      'stellar-dark-700': '#303448',
      'stellar-dark-900': '#292D3E',
    },
  },
  plugins: [],
};
