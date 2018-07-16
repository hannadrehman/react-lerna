
/* eslint-env node */
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SystemBellPlugin = require('system-bell-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


// output folder and directory name.
const applicationHTMLTitle = 'React Application';
const distFolderName = 'dist';
const distPathFromRoot = './';
// clear dist before prod build.
const pathsToClean = [
  `${distPathFromRoot}/${distFolderName}`,
];
// the clean options to use
const cleanOptions = {
  root: path.resolve(__dirname, './'),
  exclude: [],
  verbose: true,
  dry: false,
};

const {
  env: {
    NODE_ENV: env,
    PROXY_ORIGIN: proxyOrigin,
  },
} = process;
const isProd = (env.toLowerCase().trim() === 'production');

initialMessageForConsole(); // eslint-disable-line
// Configuration object
const config = {
  devtool: isProd ? 'false' : 'source-map',
  entry: ['./src/index.jsx'],
  output: {
    path: path.resolve(__dirname, `${distPathFromRoot}/${distFolderName}`),
    filename: isProd ? '[name].js' : 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      App: path.resolve(__dirname, './src/App'),
      Common: path.resolve(__dirname, './src/App/Common'),
      Elements: path.resolve(__dirname, './src/App/Elements'),
      SubApps: path.resolve(__dirname, './src/App/SubApps'),
      Constants: path.resolve(__dirname, './src/App'),
      Services: path.resolve(__dirname, './src/Services'),
      Store: path.resolve(__dirname, './src/Store'),
      Styles: path.resolve(__dirname, './src/Styles'),
      Assets: path.resolve(__dirname, './src/Assets'),
    },
    modules: [path.join(__dirname, 'node_modules')],
  },
  target: 'web',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (!isProd) ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return [autoprefixer('last 2 versions', 'ie 10')];
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import "./src/Styles/theme";',
            },
          },
        ],
      },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?name=/assests/fonts/[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?mimetype=application/font-woff&name=assests/fonts/[name].[ext]' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream&name=assests/fonts/[name].[ext]' },
      { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml&name=assests/fonts/[name].[ext]' },
      { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader?name=assests/images/[name].[ext]' },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, `${distPathFromRoot}/${distFolderName}`),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api/**': {
        target: proxyOrigin,
        secure: false,
        changeOrigin: true,
      },
      '/static/**': {
        target: proxyOrigin,
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PROXY_ORIGIN: JSON.stringify(process.env.PROXY_ORIGIN),
      },
    }),
    new SystemBellPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    splitChunks: {
      name: true,
      minSize: 30,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, 'node_modules'),
          name: 'vendors',
          enforce: true,
        },
        common: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
};
if (isProd) {
  Array.prototype.push.apply(config.plugins, [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.AggressiveSplittingPlugin({
    //   maxSize: 100000, // Byte, maxsize of per file. Default: 51200
    //   minSize: 51200,
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true,
      options: {
        context: './',
      },
    }),
    new HtmlWebpackPlugin({
      title: applicationHTMLTitle,
      filename: 'index.html',
      template: './src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    // new BundleAnalyzerPlugin(),
  ]);
} else {
  config.entry.splice(1, 0, 'react-hot-loader/patch');
  Array.prototype.push.apply(config.plugins, [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: applicationHTMLTitle,
      filename: 'index.html',
      template: './src/index.ejs',
      inject: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: false,
      options: {
        context: './',
      },
    }),
  ]);
}
module.exports = config;

function initialMessageForConsole() {
  console.log(`  ===================================================
  * WELCOME TO THIS AWESOME PROJECT.
  * DATE: ${new Date().toLocaleDateString()}.
  * AUTHOR: HANNAD REHMAN.
  * NODE_ENV: ${env}.
  * PROXY_ORIGIN: ${proxyOrigin || 'None'}.
  * DIST PATHNAME: ${distPathFromRoot}
  * DIST FOLDER NAME: ${distFolderName}
  ===================================================
  `);
}
