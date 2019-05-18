const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')

const serverConfig = {
  entry: {
    server: './src/server/server.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
}

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return [prodConfig, serverConfig]
  }

  return [devConfig, serverConfig]
}
