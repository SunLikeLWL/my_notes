# Redux

2019年11月15日15:17:57

## 概念
Redux是Javascript状态容器，提供可预测的状态管理


## 啥时候引入Redux

1、有相当大量的、随时间变化的数据；
2、state需要有一个单一可靠的数据来源；
3、把所有的state放在最顶层组件中已无法满足需求


## 安装

npm install --save redux


## 重点

应用中所有的state都以一个对象的形式存储在一个单一的state中。唯一改变的办法是触发action，一个描述发生什么的对象。


import {createStore} from 'redux';

<!-- 
 这是一个reducer，形式为(state,action)=>action的纯函数描述了action如何把state转变为下一个state。

state的形式取决于你，可以是基本类型、数组、对象甚至是Immutable.js生成的数据结构。唯一的要点是当state变化时需要返回全新的对象，而不是修改传入的参数。
 -->




## 三大原则

### 单一数据来源
整个应用的state被存储在一棵object tree中，并且这个object tree只存在于唯一一个store中。

store.getState();

<!-- 输出 -->
{

}


### State是只读的
唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象。

store.dispatch({
    type:"COMPLETE_TODO",
    index:1
})


### 使用纯函数来执行修改
为了描述action如何改变state tree，你需要编写reducers
Reducers是一个纯函数，他接收先前的state和action，并返回新的state。







## Flux 
Facebook用户建立顾客端web应用的前端架构，它通过利用一个单向数据流补充了React的组合视图组件
## 组成
Dispatcher调度
存储Store
视图View(React组件)

## RxJS

管理复杂异步应用非常优秀的方案。以外，还有致力于构建人机交互模拟为相互依赖的可观测变量的库。




## Actin

action是把数据从应用传到store的有效载荷。他是store数据的唯一来源。一般来说你会通过store.diapatch()讲action传到store


## Reducer 
Reducer指定了应用状态的变化如何响应actions并发送到store的，记住actions只是描述了有事情发生了这一事实，并没有描述应用如何跟新state。


