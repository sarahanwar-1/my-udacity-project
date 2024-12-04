const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // Minifies JavaScript for production
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Extract CSS into separate file
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Minify CSS for production

module.exports = {
  mode: 'production', // Set Webpack to production mode
  entry: './src/client/index.js', // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: '[name].[contenthash].js', // Use content hash for unique filenames (cache busting)
    clean: true, // Clean dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Babel loader for JS files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Ensure modern JS features work across browsers
          },
        },
      },
      {
        test: /\.scss$/, // SCSS loader for production
        use: [
          MiniCssExtractPlugin.loader,  // Extract CSS into separate file
          'css-loader',                 // CSS loader
          'sass-loader',                // SCSS to CSS
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean dist folder before each build
    new HtmlWebPackPlugin({
      template: './src/client/views/index.html', // HTML template for production
      filename: './index.html', // Output HTML filename
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Output the CSS with content hash for caching
    }),
  ],
  optimization: {
    minimize: true, // Minimize JavaScript and CSS files
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new CssMinimizerPlugin(), // Minify CSS using CssMinimizerPlugin for better performance
    ],
    splitChunks: {
      chunks: 'all', // Split vendor libraries into separate files for caching
    },
  },
  resolve: {
    extensions: ['.js', '.scss'], // Resolve .js and .scss file extensions automatically
  },
  performance: {
    hints: false, // Disable performance hints for smaller files
  },
};
