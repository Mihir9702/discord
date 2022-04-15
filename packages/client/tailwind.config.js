module.exports = {
  content: ['src/pages/**/*.{js,ts,jsx,tsx}', 'dist/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#B2BECD',
        dark: '#12191A',
        background: '#1F1F1F',
        dash: '#6A7480',
      },
    },
    plugins: [require('tailwindcss'), require('autoprefixer')],
  },
}
