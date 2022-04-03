module.exports = {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.js',
      css: './src/css/tailwind.css',
      purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
      },
    },
    autoprefixer: {
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
    },
  },
}
