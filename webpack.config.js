const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
  test: /\.pug$/,
  use: ['pug-loader'],
};

module.exports = {
  mode: 'development',
  entry: '/index.js',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      pug,
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new miniCss({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: 'index.pug',
      filename: 'index.html',
    }),
  ],
};
