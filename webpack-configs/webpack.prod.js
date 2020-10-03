const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');
const imageInlineSizeLimit = '10000';

const config = {
  context: appDirectory,
  mode: 'production',

  entry: ['./src/index.tsx'],
  bail: true,
  devtool: 'source-map',
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: imageInlineSizeLimit,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new StatsWriterPlugin({
      stats: {
        all: true,
      },
    }),
    new StylelintPlugin({ files: './src/**/*.{ts,tsx}' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),

      'process.env.IP_GEOLOCATION_KEY': JSON.stringify(
        process.env.IP_GEOLOCATION_KEY,
      ),
      'process.env.IP_GEOLOCATION_URL': JSON.stringify(
        process.env.IP_GEOLOCATION_URL,
      ),

      'process.env.WEATHER_KEY': JSON.stringify(process.env.WEATHER_KEY),
      'process.env.WEATHER_URL': JSON.stringify(process.env.WEATHER_URL),

      'process.env.GEO_NAMES_KEY': JSON.stringify(process.env.GEO_NAMES_KEY),
      'process.env.GEO_NAMES_URL': JSON.stringify(process.env.GEO_NAMES_URL),
    }),
  ],
};

module.exports = config;
