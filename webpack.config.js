const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const pug = {
  test: /\.pug$/,
  use: ['pug-loader'],
};

const scss = {
  test: /\.(s*)css$/,
  // options: {
  // reloadAll: true,
  // },
  use: [miniCss.loader, 'css-loader', 'sass-loader'],
};

const babel = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

const svg = {
  test: /\.svg$/,
  loader: 'svg-inline-loader',
};

const img = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'file-loader',
    },
  ],
};

const pages = ['index', 'about', 'product_details', 'checkout', 'shop'];

module.exports = {
  mode: 'development',
  entry: {
    ...pages.reduce((config, page) => {
      config[page] = path.resolve(__dirname, `src/${page}.js`);
      return config;
    }, {}),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@includes': path.resolve(__dirname, 'src/includes'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@svgs': path.resolve(__dirname, 'src/svgs'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [pug, scss, svg, img, babel],
  },
  plugins: []
    .concat(
      pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, `src/pages/${page}.pug`),
            filename: `${page}.html`,
            chunks: [page],
          })
      )
    )
    .concat(
      pages.map(
        (page) =>
          new miniCss({
            filename: `[name].css`,
          })
      )
    )

    .concat(new ESLintPlugin()),
};
