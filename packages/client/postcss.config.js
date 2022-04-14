module.exports = {
  plugins: {
    tailwindcss: {
      config: 'tailwind.config.js',
      purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: ['src/pages/**/*.{jsx,tsx}', 'dist/**/*.{js,jsx,ts,tsx}'],
      },
    },
    autoprefixer: {},
  },
}
