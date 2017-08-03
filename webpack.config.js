const path = require('path');
// const ButternutWebpackPlugin = require('butternut-webpack-plugin').default;
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: false,
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    // fails with: TypeError: Cannot read property 'minify' of null
    // new ButternutWebpackPlugin(),
  ],
};
