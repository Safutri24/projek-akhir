// frontend/webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // Penting untuk mode pengembangan
  devtool: 'inline-source-map', // Membantu debugging di browser
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 8080, // Port untuk server pengembangan frontend
    historyApiFallback: true, // Penting untuk SPA dengan routing berbasis hash/history
  },
});