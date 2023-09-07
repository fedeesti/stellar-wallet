/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'stellar-text-primary': '#dadde1',
        'stellar-text-secondary': '#d4d5d8',
        'stellar-text-tertiary': '#a9abb2',
        'stellar-link': '#6260eb',
        'stellar-link-hover': '#937eef',
        'stellar-btn-primary': '#5332e6',
        'stellar-btn-hover': '#937eef',
        'stellar-info-border': '#33248c',
        'stellar-info-background': '#2c2a57',
        'stellar-border-primary': '#3a3e4d',
        'stellar-border-secondary': '#4b4f5d',
        'stellar-bg-primary': '#292d3e',
        'stellar-bg-secondary': '#303448',
        'stellar-bg-tertiary': '#222634',
        'stellar-black': '#191b25',
        'stellar-error': '#ee5a74',
        'stellar-error-border': '#89344c',
        'stellar-error-bg': '#482f42',
      },
      padding: {
        0.2: '0.2rem',
      },
    },
  },
  plugins: [],
};
