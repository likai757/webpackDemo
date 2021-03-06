const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = (isModule) => {
  let cssLoader = {
    loader: 'css-loader'
  }
  if (isModule) {
    cssLoader.options = {
      modules: true,
      localIdentName: '[name]__[local]--[hash:base64:5]'
    }
  }
  let postCssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')
      ]
    }
  }
  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      cssLoader,
      postCssLoader,
      { loader: 'less-loader' }
    ]
  })
}

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
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['env', 'react'] }
        },
        exclude: /node_modules/
      }, {
        test(filePath) {
          return /\.less$/.test(filePath) && !/\.m\.less$/.test(filePath)
        },
        use: extractCSS()
      }, {
        test: /\.m\.less$/,
        use: extractCSS(true)
      },
      {
        test: /\.hbs?$/,
        use: [{ loader: 'mustache-loader' }]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }
        ]
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
    new copyWebpackPlugin([{ from: 'assets/introduce.html' }]),
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      disable: process.env.NODE_ENV === 'development',
      allChunks: true
    })
  ]
}

module.exports = config