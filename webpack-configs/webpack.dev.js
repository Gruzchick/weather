const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');
const imageInlineSizeLimit = '10000';

const config = {
  mode: process.env.NODE_ENV,
  context: appDirectory,

  entry: ['./src/index.tsx'],
  bail: false,
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      // https://github.com/welldone-software/why-did-you-render/issues/85
      'react-redux': 'react-redux/lib',
      'react-router': 'react-router/umd/react-router.js',
      'react-query': 'react-query/dist/react-query.production.min.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            compact: false,
          },
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
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      formatter: 'basic',
      eslint: {
        files: path.resolve('./src/**/*.{ts,tsx}'),
        options: {
          cache: true,
          configFile: path.resolve(appDirectory, '.eslintrc'),
          cacheLocation: path.resolve(
            appDirectory,
            'node_modules/.cache/eslintcache',
          ),
        },
      },
    }),
    new StylelintPlugin({
      files: './src/**/*.{ts,tsx}',
      emitWarning: true,
      cache: true,
      cacheLocation: path.resolve(
        appDirectory,
        'node_modules/.cache/stylelintcache',
      ),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),

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
  devServer: {
    contentBase: path.resolve(appDirectory, 'dist'),
    hot: true,
    port: process.env.PORT,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
};

module.exports = config;
