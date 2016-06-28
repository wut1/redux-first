var path = require('path');
var webpack = require('webpack');

// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');

/**
 * 标识开发环境和生产环境
 * @type {webpack.DefinePlugin}
 */

module.exports = {
    devServer: {
      hot: true,
      inline: true,
      contentBase: '',
      port: 8080,
      stats: { colors: true }
    },
    entry: {
      index: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, './redux-problem/index.js')
      ],
      vendor: ['react', 'react-dom','redux','react-redux','jquery','babel-polyfill']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "build.js",
    },
    resolve: {
      extension: ['', '.jsx', '.js', '.json'],
      // 提高webpack搜索的速度
      alias: { }
    },
    devtool: 'source-map',
    'display-error-details': true,
    // 使用externals可以将react分离，然后用<script>单独将react引入
    externals: [],
    module: {
      loaders: [
        {
          test: /\.js[x]?$/,
          loaders: ['react-hot', 'babel'],
          exclude: path.resolve(__dirname, 'node_modules')
        },
        {
          test: /\.css/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url?limit=8192'
        },
        {
          test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000"
        },
        { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new HtmlWebpackPlugin({
        title: '问题库',
        template: './redux-problem/index.html'
      })
    ]
};
