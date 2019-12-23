#  Vue.js源码解析 精讲 高级


2019年11月28日18:03:12


## 源码目录设计

src {
    compiler,//编译相关
    core, // 核心代码
    platforms, //  不同平台支持
    server, // 服务端渲染
    sfc, // .vue文件解析
    shared // 共享代码
}


## compiler
目录包含Vue.js所有编译相关的代码。他包括把模板解析成ast语法树，
ast语法树优化，代码生成功能。
编译的工作可以在构建时做（借助webpack、vue-loader等辅助插件）；也可以
在运行时做，使用包含构建功能的Vue.j。显然，编译是一项耗性能的工作，所以
更推荐前者--离线编译。


## core

core目录包含了Vue.js的核心代码，包括内置组件、全局api封装，Vue实例化，观察者
虚拟DOM、工具函数等等。

## platform 
Vue.js是一个跨平台的MVVM框架,他可以跑在web上，也可以分配weex跑早native顾客端上。
platform是Vue.js的入口，2个目录代表2个主要入口，分别打包运行在web上和weex上的
Vue.js。



##  Server 

Vue.js2.0支持服务器端渲染，所有服务端渲染相关逻辑都在这个份目录下



## sfc

通常我们开发Vue.js都会借助webpack构建，然后通过.vue单文件的编写组件。


## share

Vue.js会自定义一些工具，这里定义的工具方法都是被浏览器端的Vue.js所共享的。



