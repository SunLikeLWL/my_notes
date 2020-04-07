# 深入React技术栈

# 第一章 初入React世界

## 1.1简介

React把用户界面抽象成一个个组件
通过jsx语法，复用组件变得非常容易，同时也能保证组件结构清晰


##  专注于视图层

##  Virtual DOM
真是页面对应一个DOM树

##  函数式编程

函数式编程 -> 声明式编程

命令式编程 -> 


 
## 1.2 jsx

1、定义标签时，只允许被一个标签包裹

2、标签一定要闭合


## 1.3 React 组件


狭义上的组件：又称为UI组

广义上的组件：带有业务含义和数据的UI组件组合
 
 规范标准：
  1、基本的封装性
  2、简单的生命周期
  3、明确的数据流动


  React组件基本上由组件的构建方式、组件内的属性状态与生命周期方法组成。


   构建方式：

   1、React.createClass
   2、ES6 class
   3、无状态函数


## 1.4 数据流

  在React中，数据是自顶向下单向流动的，即从父组件到子组件。

  state：组件内部的属性

  setState：是一个异步方法，一个生命周期内所有的setState方法合并操作。
 
  props：

  子组件prop：

  propTypes





## 1.5 React生命周期  

  React生命周期氛围两类：

  ### 1、当组件在挂载或卸载时；
  挂载：

  componentWillMount

  render

  componentDidmount


 卸载：

 componentWillUnmount

 


  ### 2、当组件接收新的数据时，即组件更新时


    componentWillReceiveProps

    shouldComponentUpdate

    componentWillUpdate

    render

    componentDidUpdate


  ## 1.6 React与DOM

  少有的几个API：

  1、findDOMNode：
  

  import ReactDOM from 'react-dom';
  ReactDOD.findDOMNode(this);// 当前组件

  
  2、unmoutConponentAtNode



  3、render



# 第二章 漫谈React


## 2.1 事件系统

  Virtual DOM在内存中是以对象的形式存在的

  React基于Virtual DOM 实现了一个SyntheticEvent（合成事件）层

  所有事件都自动绑定在最外层

 
 ## 事件委托

    所有事件都自动绑定在结构最外层，使用一个统一的事件监听器，
    这个时间监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数

  
 ## 自动绑定
 在React组件中，每个方法的上下文会指向该组件的实例，即自动绑定this为当前组件。
 
    1、constructor里面bind
    2、事件绑定到节点时使用bind
    3、箭头函数


  2.2 表单
  
