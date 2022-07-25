# vue.js 核心模块源码解析（上）


梳理项目层级，了解框架的目录设计
参读浏览源码
   入口初始化
   数据状态相关模模块
   事件相关模块
   生命周期相关模块
   渲染模块
深入原理了解
   数据驱动原理
   组件化
   响应式原理



### 面试题

1、mvvm实现


2、template模板 和render函数如何生成DOM


3、runtime-only   & runtime-compiler




### 目录

src 
   compiler:编译相关
   core: 核心代码
   platform：平台相关
   server: 服务端渲染
   sfc: .vue文件的解析器
   shared：共享工具方法




### core instance  index.js


```js

function Vue(options){
    this._init(options)
}

```

问题：

1、new Vue 使用的是函数而不是class
--除了可读易读之外，后继会在Vue的prototype上进行扩展
--使用函数对象想更加可读、维护以及拓展


```js

initMixin
stateMixin
eventsMixin
lifecycleMixin
renderMixin
```

 问题：
1、为何要单独抽离一下几个流程
--不仅仅是初始化流程，还生成了Vue必要的参数属性


 
 

### initMixin

initLifecycle
initEvent
initRender
callhook(beforeCreate)
initInjection
initState
initProvide
callhook(created)



### initState

initProps
initMehtods
initData
initComputed
initWatch



面试题

1、props和data是如何把属性挂载在vm上的

proxy





