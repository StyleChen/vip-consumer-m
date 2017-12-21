const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

const config = require('./config');

module.exports = {
  entry: [
    'normalize.css',
    'whatwg-fetch',
    config.srcPath,
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: config.srcPath,
      },

      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:6].[ext]',
        },
      },
    ],
  },

  resolve: {
    modules: [
      config.srcPath,
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    // BMap: 'BMap',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          postcssImport({
            path: [config.srcPath],
          }),
          cssnext({
            features: {
              customMedia: false,
              mediaQueriesRange: false,
              customSelectors: false,
              attributeCaseInsensitive: false,
              colorRebeccapurple: false,
              colorHwb: false,
              colorHsl: false,
              colorGray: false,
              colorHexAlpha: false,
              overflowWrap: false,
            },
          }),
        ],
        context: __dirname,
      },
    }),

    new HtmlWebpackPlugin({
      template: config.templatePath,
    }),
  ],
};
