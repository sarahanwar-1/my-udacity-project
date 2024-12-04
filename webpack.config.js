const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); // To generate the HTML file
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // To clean the dist folder before each build
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // To minimize CSS
const TerserPlugin = require("terser-webpack-plugin"); // For JS minification
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Extract CSS into separate files

module.exports = {
  entry: './src/client/index.js', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    filename: 'bundle.js', // Output filename for JavaScript
    clean: true, // Clean dist folder before each build
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // Minifies JS files
      new CssMinimizerPlugin(), // Minifies CSS files
    ],
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Babel for JS files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Ensure modern JS features work across browsers
          },
        },
      },
      {
        test: /\.scss$/, // SCSS loader chain
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader',    // CSS loader
          'sass-loader',   // SCSS to CSS
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), // Clean dist folder before each build
    new HtmlWebPackPlugin({
      template: './src/client/views/index.html', // Use this template for HTML
      filename: './index.html', // Output filename
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output CSS file name
    }),
  ],

  resolve: {
    extensions: ['.js', '.scss'], // Resolve .js and .scss file extensions automatically
  },

  devServer: {
    static: './dist',  // Serve static files from dist
    port: 3000, // Port for the dev server
    allowedHosts: 'all', // Allow all hosts to access the dev server
    open: true, // Open the browser automatically when the server starts
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // Allows for client-side routing
  },

  mode: 'production', // Set the mode to production for optimized builds
};
