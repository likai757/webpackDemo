# webpackDemo
基于webpack / babel / react / less 构建的基础Web框架

```bash
#启动服务
npm start  

#构建应用
npm run build 
```

## 前言
随着Web前端技术的不断发展，前端的用户体验及业务逻辑，变得越来越复杂繁重，然而代码量剧增，带来一个必然发展就是**模块化**。通过模块化可将问题拆解，解耦，遵循协议，分块处理。

> 在任何复杂庞大的工程下，模块化工程都是唯一降低复杂度，组织协同的解决方案，世界上最伟大的`Project Management`著作就是`曼哈顿计划（Manhattan Project）`，这里不详解，有兴趣的话可以到`Wikipedia`搜索。


* 代码模块化，可以认为我们把程序分成多个小的功能模块，通过API组合在一起，每个模块有自己的职责。

* 当模块中含有语法优化时，就需要对代码做转译处理。 

* 如多个`.js`文件，通过`require`引用，需要打包成一个`.js`文件

* 如`.scss`，`.less`文件需要转译成 `.css`
    
* 如`ES6`语法的 `.js`文件需要转译成 `ES5`,兼容老版本浏览器
    
* 如`.ts` TypeScript文件需要转移成 `.js`文件
    
* 如`react` 元素需要转译成`js`可以识别的函数调用
   
* 如`hbs`模板文件需要转译成`.html`文件

## 什么是Webpack？

Webpackk实际上就是个`模块打包器`。由于对各式各样的文件，做转译、打包处理的工作量非常繁重，且效率低下，于是`Webpack`诞生了，只要配置好相应的`Plugin`插件，以及`Loader`加载器，Webpack可以帮我们完成自动化的打包处理，同时还支持启动一个Web Server供我们调试页面。

> 当然用[Gulp](http://javascript.ruanyifeng.com/tool/gulp.html)和[Grunt](http://javascript.ruanyifeng.com/tool/grunt.html)任务执行器（Task Runners）也能完成类似的工作，但在设计思想上Webpack更偏向于工程化。
> Task Runners：更加灵活，只要花足够的时间，几乎可以完成任意你想要的功能。
> Build Tools：目标更明确，更具象，就是为了构建所开发，相对的就没有Task Runners那样的灵活，选择时应看你对构建的需求场景。

## Webpack的工作方式

通过一个给定的主文件index.js，Webpack将从这个文件开始找所有依赖文件，并使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

![](media/15142542447229/15143444596271.jpg)


## Webpack的安装与使用

Demo项目源文件：https://github.com/likai757/webpackDemo

### 初始化项目

```
$ mkdir webpackDemo
$ cd webpackDemo
$ npm init -y
```

####  安装依赖

```bash
//webpack
$ npm install --save-dev webpack webpack-dev-server

//files handler plugins
$ npm install --save-dev html-webpack-plugin 
$ npm install --save-dev copy-webpack-plugin

//html template loader
$ npm install --save-dev mustache-loader

//babel loader
$ npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react

//css loader
$ npm install --save-dev style-loader css-loader
$ npm install --save-dev postcss-loader autoprefixer

//hot module replacement for react
$ npm install --save-dev babel-plugin-react-transform react-transform-hmr

//react
$ npm install --save react react-dom


```
#### 构建项目文件目录

```
├── README.md
├── app
│   ├── Greeter.css
│   ├── Greeter.js
│   ├── index.js
│   └── main.css
├── assets
│   ├── favicon.ico
│   ├── index.hbs
│   └── introduce.html
├── .babelrc
├── .gitignore
├── package-lock.json
├── package.json
└── webpack.config.js
```
### 创建Babel配置文件
文件名：.babelrc

```json
{
  "presets": [
    "react",
    "env"
  ],
  "env": {
    "development": {
      "plugins": [[
        "react-transform",
        {
          "transforms": [
            {
              "transform": "react-transform-hmr",
              "imports": ["react"],
              "locals": ["module"]
            }
          ]
        }]
      ]
    }
  }
}
```

### 创建Webpack配置文件

文件名：webpack.config.js

```javascript
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
    contentBase: './build',//本地服务器所加载的页面所在的目录
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
```
### 

Demo项目源文件：https://github.com/likai757/webpackDemo

