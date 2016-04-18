module.exports = {
  entry: './src/js/index.js',

  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'build/bundle.js'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
        ]
      },
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style',
          'css',
          'sass'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url',
          'img'
        ]
      }
    ]
  }
};
