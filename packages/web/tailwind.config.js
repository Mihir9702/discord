module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // colors
      colors: {
        text: '#B2BECD',
        dark: {
          100: '#1A1A1A',
          200: '#2C2C2A',
          300: '#292927',
          400: '#1E1E1C',
          500: '#0F0F0D',
          600: '#0B0B0A',
          700: '#0A0A09',
          800: '#080808',
          900: '#12191A',
        },
        background: '#1F1F1F',
        dash: '#6A7480',
      },
    },
    plugins: [require('tailwindcss'), require('autoprefixer')],
  },
}
