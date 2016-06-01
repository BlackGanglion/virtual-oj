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
        loader: 'babel',
        query: {
          plugins: [
            'transform-decorators-legacy',
            ["antd", { "style": true }]
          ],
          presets: ['es2015', 'stage-0', 'stage-1', 'react']
        }
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
      { test: /\.less$/, loader: "style!css!less" },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url',
          'img'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
