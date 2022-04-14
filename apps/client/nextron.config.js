module.exports = {
  mainSrcDir: 'core',
  rendererSrcDir: 'src',

  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$|jsx/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    })

    config.resolve.alias['@'] = path.resolve(__dirname, 'src')

    return config
  },
}
