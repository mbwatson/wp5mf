const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}

module.exports = {
  mode: mode,

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8000'
  },

  module: {
    rules: [
      {
        test: /\.sc?ss$/i,
        use: [ // these load rtl
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'wp5mf-root',
      library: { type: 'var', name: 'wp5mf-root' },
      filename: 'remoteEntry.js',
      remotes: {
        'wp5mf-app1': 'wp5mf-app1',
      },
      shared: ['react', 'react-dom'],
    })
  ],

  devtool: 'source-map',

  devServer: {
    port: 8000,
    contentBase: './dist',
    hot: true,
  }
}
