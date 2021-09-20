const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
  test: /\.pug$/,
  use: ['pug-loader'],
};

const scss = {
  test: /\.(s*)css$/,
  use: [miniCss.loader, 'css-loader', 'sass-loader'],
};

const babel = {
  test: /\.js$/,
  exclude: '/node_modules',
  loader: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
};

const img  =  {
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'file-loader',
    },
  ],
}


module.exports = {
  mode: 'development',
  entry: '/src/index.js',

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
    rules: [pug, scss,img],
  },
  plugins: [
    new miniCss({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: '/src/index.pug',
      filename: 'index.html',
    }),
  ],
};
