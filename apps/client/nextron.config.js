module.exports = {
  mainSrcDir: 'core',
  rendererSrcDir: 'src',

  webpack: (config, err) => {
    if (err) {
      console.error(err)
    }

    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    })

    return config
  },
}
