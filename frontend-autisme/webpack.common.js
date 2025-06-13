// frontend/webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/scripts/main.js'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Path dasar untuk semua aset yang dimuat di browser
    clean: true, // Membersihkan folder output (dist) sebelum setiap build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // HAPUS ATURAN UNTUK GAMBAR (asset/resource) DI SINI
      // Karena kita akan mengandalkan CopyWebpackPlugin untuk menyalin semua gambar.
      // Jika Anda memiliki gambar yang di-IMPOR langsung di file JS/CSS (misal: `import myImage from './myImage.jpg';`),
      // maka Anda mungkin perlu menambahkan kembali aturan ini, atau memuatnya sebagai URL langsung.
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Autism AI Screening App',
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({ // Plugin ini akan menyalin seluruh folder `src/public` ke `dist`
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'), // Sumber: folder `src/public` Anda
          to: path.resolve(__dirname, 'dist'),        // Tujuan: root `dist`
          // HAPUS globOptions.ignore: ['**/img/**', '**/favicon.ico'],
          // Biarkan CopyWebpackPlugin menyalin SEMUA isi `src/public` ke `dist`,
          // mempertahankan struktur subfolder (misalnya src/public/img/ akan jadi dist/img/)
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};