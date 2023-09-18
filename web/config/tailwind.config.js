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
        sandyBrown: '#F7C944',
        orchid: '#D37DEB',
        cadetBlue: '#6FA9C5',
        coral: '#EC9040',
        darkSlateBlue: '#3F3EBB',
        midnightBlue: '#20205B',
      },
    },
    fontFamily: {
      condensed: ['Bayon', 'sans-serif'],
      sans: ['Poppins', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
      blackLetter: ['UnifrakturCook'],
      serif: ['Georgia', 'serif'],
    },
    zIndex: {
      footerNavTrigger: 9999,
      footerMenu: 9998,
      footer: 9997,
      drawer: 9000,
      githubCorner: 8000,
      grid: 5,
      bg: 1,
    },
  },
  plugins: [],
  safelist: [
    'bg-sandyBrown',
    'bg-caribbeanGreen',
    'bg-vividYellow',
    'bg-orchid',
    'bg-cadetBlue',
    'bg-coral',
    'page-left',
    'page-right',
    'origin-top-left',
    'origin-top-right',
  ],
}
