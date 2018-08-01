require('dotenv').config('')
const path = require('path')
const DotenvPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { STATIC_URI } = process.env

const doenvPlugin = new DotenvPlugin()

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './app/html/index.html'),
})

module.exports = {
  entry: ['babel-polyfill', './app/index.jsx'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'public/[name].js?[hash]',
    publicPath: `${STATIC_URI}/`,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.svg?$/,
        use: [{ loader: 'raw-loader' }],
      },
      {
        test: /\.(jpg|png|ico|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `public/[path][name].[ext]`,
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    disableHostCheck: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3001',
        changeOrigin: false,
        secure: false,
      },
    ],
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },

  plugins: [htmlWebpackPlugin, doenvPlugin],
}
