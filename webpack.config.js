const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

var config = {
  // devtool: 'cheap-module-source-map',
  entry: __dirname + '/app/index.js',//已多次提及的唯一入口文件
  output: {
    path: __dirname + '/build',//打包后的文件存放的地方
    filename: 'bundle.js'//打包后输出文件的文件名
  },
  devServer: {
    hot: true,
    contentBase: false,//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['env', 'react'] }
        },
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader', options: {
            // 指定启用css modules
            modules: true,
            // 指定css的类名格式
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader',
          options: { plugins: [require('autoprefixer')] }
        }]
      }, {
        test: /\.hbs?$/, use: [{ loader: 'mustache-loader' }]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有: Kai.Li'),
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      PATHS: [],
      title: 'Webpack Sample Project',
      template: __dirname + '/assets/index.hbs',
      favicon: __dirname + '/assets/favicon.ico'
    }),
    new copyWebpackPlugin([{ from: 'assets/introduce.html' }])
  ]
}

module.exports = config