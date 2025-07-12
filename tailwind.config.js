/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          '"Helvetica Neue"', 
          'Arial', 
          '"Noto Sans"', 
          'sans-serif', 
          '"Apple Color Emoji"', 
          '"Segoe UI Emoji"', 
          '"Segoe UI Symbol"', 
          '"Noto Color Emoji"'
        ],
        orbitron: ['Orbitron', 'sans-serif'],
        'source-code': ['Source Code Pro', 'monospace'],
        audiowide: ['Audiowide', 'sans-serif'],
      },
      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
      },
      textStrokeColor: theme => theme('colors'),
      colors: {
        'brand-dark': '#010409',
        'brand-bg': '#0D1117',
        'brand-light': '#E6EDF3',
        'brand-primary': '#2F81F7',
        'brand-secondary': '#8B949E',
        'brand-accent': '#F77814',
        'brand-border': 'rgba(230, 237, 243, 0.1)',
        // Removed duplicate brand-dark color
      },
      animation: {
        'text-glow': 'text-glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'text-glow': {
          '0%': {
            textShadow: '0 0 4px #2F81F7, 0 0 8px #2F81F7',
          },
          '100%': {
            textShadow: '0 0 8px #2F81F7, 0 0 16px #2F81F7',
          },
        },
      },
    },
  },
  // ACTION: Added the plugin function to create the 'can-hover' variant.
  plugins: [
    require('tailwindcss-text-stroke'),
    function ({ addVariant }) {
      addVariant('can-hover', '@media (hover: hover) and (pointer: fine)');
    },
  ],
};