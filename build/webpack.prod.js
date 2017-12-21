const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.base');
const config = require('./config');

module.exports = Object.assign({}, baseConfig, {
  output: {
    path: config.distPath,
    publicPath: config.publicPath,
    filename: 'js/app.[chunkhash].js',
  },

  module: {
    rules: [
      ...baseConfig.module.rules,

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize&sourceMap&importLoaders=1&module&camelCase&localIdentName=[hash:base64:5]',
            'postcss-loader',
          ],
          publicPath: '../',
        }),
      },
    ],
  },
  devtool: 'source-map',

  plugins: [
    ...baseConfig.plugins,

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),

    new ExtractTextPlugin('css/app.css'),
  ],
});
