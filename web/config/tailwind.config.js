/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        caribbeanGreen: '#0fdfac',
        vividYellow: '#ffe500',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
    },
  },
  plugins: [],
}
