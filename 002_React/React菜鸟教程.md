# React
  

## 1、介绍
   1、用于构建用户界面的Javascript库；
   2、主要用于构建UI，MVC中的V；
   3、起源Facebook内部项目；
   4、拥有较高性能，代码逻辑非常简单；

## 2、特点
   1、声明范式设计：可以轻松描述应用
   2、高效：虚拟DOM
   3、灵活：可以与已知库或框架很好地配合
   4、JSX：
   5、组件：使得代码更加容易得到复用
   6、单向响应数据流：从而减少代码，


 
## 3、React组件API：

 设置状态 setState
 替换状态 replaceState
 设置属性 setProps
 替换属性 replaceProps
 强制更新 forceUpdate
 获取DOM节点 findDOMNode
 判断组件挂件状态：isMounted
 
 
  组件的生命周期可分成三种状态：
  Mounting： 已插入真实DOM
  Updating： 正在被重新新渲染
  Unmounting： 已移除出真实DOM

 

## 4、生命周期
 
componentWillMount  渲染前调用

componentDidMount  第一次渲染后调用

componentWillReceiveProps  组件接收到一个新的 prop (更新后)时被调用

shouldComponentUpdate  组件接收到新的props或者state时被调用。

componentWillUpdate 组件接收到新的props或者state但还没有render时被调用

componentDidUpdate 组件完成更新后立即调用

componentWillUnmount  组件从 DOM 中移除之前立刻被调用