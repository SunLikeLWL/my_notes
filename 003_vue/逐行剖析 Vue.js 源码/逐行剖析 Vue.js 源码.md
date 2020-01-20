# 逐行剖析 Vue.js 源码

https://nlrx-wjc.github.io/Learn-Vue-Source-Code/


1、代码目录

  dist                   #项目构建后的文件
  scripts                #与项目构建相关的脚本和配置文件
  flow                   #flow类型的声明文件
  src                    #项目源代码
       compilier         #与模板编译相关的代码
       core              #通用的、与运行时平台无关的运行时代码
             observe     #实现变化侦测的代码
             vdom        #实现virtual dom代码
             instance    #Vue.js实例构造函数和原型方法
             global-api  #全局api的代码
             components  #内置组件的代码
        server           #与服务器渲染相关的代码
        platforms        #特定运行平台的代码，如weex
        sfc              #单文件组件的解析代码
        shared           #项目公用的工具代码
test                     #项目测试代码


2.2  学习路线

1、变化侦测
 学习vue中如何实现数据的响应式系统，从而达到数据驱动视图

2、虚拟DOM篇
学习什么是虚拟DOM，以及Vue中的DOM-Diff原理

3、模板编译篇
学习vue内部是怎么把template模板编译成虚拟DOM，从而渲染出真实DOM

