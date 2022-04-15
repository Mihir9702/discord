module.exports = {
  content: ['src/pages/**/*.tsx', 'src/components/**/*.tsx'],
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
