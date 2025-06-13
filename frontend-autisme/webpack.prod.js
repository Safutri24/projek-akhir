// frontend/webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production', // Penting untuk mode produksi
  devtool: 'source-map', // Untuk debugging di produksi (opsional, bisa dihilangkan)
  // Tambahkan optimasi lain untuk produksi di sini, contoh:
  // optimization: {
  //   minimize: true,
  //   // ...
  // },
});