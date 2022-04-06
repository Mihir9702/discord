module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // colors
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
