/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      colors: {
        caribbeanGreen: '#0fdfac',
        vividYellow: '#ffe500',
      },
    },
    fontFamily: {
      condensed: ['Bayon', 'sans-serif'],
      sans: ['Poppins', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
    },
  },
  plugins: [],
}
