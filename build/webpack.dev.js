const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const config = require('./config');

module.exports = Object.assign({}, baseConfig, {
  entry: [
    'react-hot-loader/patch',
    ...baseConfig.entry,
  ],

  output: {
    path: config.distPath,
    publicPath: '/',
    filename: 'js/app.js',
  },

  module: {
    rules: [
      ...baseConfig.module.rules,

      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              module: true,
              camelCase: true,
              localIdentName: '[name]__[local]-[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: ['/', 'public', 'node_modules'],
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: config.proxyTarget,
        pathRewrite: { '^/api': '' },
        secure: false,
      },
      '/m/Login/DHW': {
        target: config.proxyTarget,
        secure: false,
      },
      '/uploadimg': {
        target: 'http://upload.dreamhiway.com',
      },
    },
    stats: {
      assets: false,
      chunks: false,
      hash: false,
      version: false,
    },
  },

  plugins: [
    ...baseConfig.plugins,

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
