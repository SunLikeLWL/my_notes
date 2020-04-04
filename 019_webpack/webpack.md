# webpack


# 1、概念

webpack的核心概念是一个打包工具，他主要目标是将js文件打包在一起，
打包后的文件用于在浏览器中使用，但它能胜任转换transform、打包bundle或
包裹package任何其他资源


面向对象开发：

特征：面向对象开发模式便于代码维护，深入人心




## webpack 初体验

  npm init -y;
  
  1、参说明
  生成package.json文件
  -y参数表示直接生成默认配置项的package.json文件，不加次参数需要一步步按需进行配置
  2、生成文件内容
  {
      "name":"",
      "version":"",
      "description":"",
      "main":"index.js",
      "script":{
          "test":""
      },
      "keywords":[],
      "author":[],
      "license":"ISC"
  }




  npm install webpack webpack-cli-D

  1、参数说明
  -D参数代表在本项目下安装Webpack，他是--save-dev的简写 


  ## 配置说明
  webpack默认打包路径到dist文件夹，打包后的.js文件名字叫main.js

  1、npx webpack代表在本项目下寻找Webpack打包命令，他区别与npm命令
  2、index.js参数代表本次打包的入口是index.js



  npm webpack index.js

  打包index.js文件




  # 2、安装
  

  ## 1、全局安装

   npm  install webpack webpack-cli -g

   webpack4.0+的版本，必须安装webpack-cli，-g命令代表全局安装的意思

   ## 2、卸载

   npm uninstall webpack webpack-cli -g

   ## 3、本地安装

   npm install webpack webpack-cli -D
   等价于
   npm install webpack webpack-clic --save-dev


   ## 4、版本号安装

   npm install webpack@version -D



  # 3、起步

  entry配置项说明了webpack打包的入口文件

  ouput配置项说明了webpack输出配置
  
  filename配置了打包后的文件叫main.js

  path配置了打包后的输出目录为dist文件夹下



  ## webpack.config.js
     1.文件内容
    const path  = require("path");
    module.exports = {
        entry:"./index.js",
        output:{
            filename:"main.js",
            path:path.resolve(___dirname,'dist');
        }
    }




 # 4、打包静态资源
  ## 1、loader
  loader是一种打包规则，他告诉了Webpack在遇到非.js文件时，应该如何处理这些文件

  运行规则：
  1、使用test正则来匹配相应的文件
  2、使用use来添加文件对应的loader
  3、对于多个loader而言，从右到左一次调用


  ## 2、使用loader打包图片

   打包图片需要用到file-loader或者url-loader，需要npm install 进行安装



  ## 3、打包CSS
   
   ### 1、使用loader打包css

   样式分为几种情况，每种情况都需要不同的loader来处理：

   1、普通.css文件，使用style-loader和css-loader来处理

   2、.less文件，使用less-loader来处理

   3、.sass或者.scss文件需要用sass-loader来处理

   4、.styl文件，需要stylus-loader来处理

  ### 2、安装依赖包

  #### 1、css打包

  npm install style-loader css-loader -D


  #### 2、less打包
   
   npm install less-loader -D



### 3、Sass打包

 npm install sass-loader node-sass -D



### 4、自动添加css厂商前缀

 npm install postcss-loader autoprefixer -D




 ### 5、模块化打包css文件
 css的模块化打包的理解是：除非我们主动引用你的样式，否则你打包的样式不能影响到我


 


 # 5、Webpack核心模块

  ## 使用WebpackPulgin
  
 pulgin的理解是：当webpack运行到某一阶段时，可以使用pulgin来帮助我们做一些事情

 