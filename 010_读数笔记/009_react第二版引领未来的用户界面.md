# react第二版引领未来的用户界面


## 第一章 React简介
React本质上就是一个“状态机”，可以帮助管理复杂的随时间而变化的状态。他以一个精简的模型实现了这一点。React只关心两件事：
1、更新DOM

2、响应事件


## JSX
JSX提供了一种在javascript中编写声明式XML的方法，
JSX即Javascript XML 一种在React组件内构件标签的类XML语法。

### JSX的好处：
1、允许使用熟悉的语法来定义HTML元素树；

2、提供更加语义化且易懂的标签；

3、程序结构更容易被直观化；

4、抽象了React Element的创建过程；

5、可以随时掌控HTML标签以及生成这些标签的代码；

6、是原生的Javascript


更加熟悉
更加语义化
更加直观
关注点分离





## 第二章 jsx

1、JSX是一种句法变换--每个JSX节点都对应着一个Javascript函数；

2、JSX既不提供也不需要运行时库；

3、JSX并没有改变或者添加Javascript的语义--他只是简单的函数调用而已。



### JSX和HTML的不同

1、属性：

2、条件判断

3、非DOM属性


JSX存在   key、ref、dangerouslySetInnerHTML

a、键
是一个可选的唯一标识符。元素或这列表与橡林节点的位置可能会发生变化，比如当用户进行搜索操作的，或者当一个列表中的元素被增加、删除时。这些情况发生时，组件可能并不需要被销毁并重新创建


b、引用

ref允许父组件在render方法之外保持对子组件的一个引用


c、dangerousltInnerHTML 
有时候需要将HTML内容设置为字符串，尤其是使用了通过字符串操作DOM的第三方库时。
<div  dangerouslyInnerHTML = {htmlString}></div>


4、事件

在所有浏览器中，事件名已经被规范化并统一用驼峰形式表示。
例如，change变成了onChange，click变成了onClick。在JSX中，捕获一个事件就像给组件设置属性一样简单



5、注释

JSX本质上就是JS，因此可以在标签内添加原生的Javascript注释


6、特殊属性

由于JSX会转换为原生的Javascript函数，因此有一些关键词我们是不能用的，如for 和class



7、样式

React把所有的内联样式都规范化为了驼峰形式，与Javascript中DOM的style属性一致
要添加一个自定义的样式属性，




## 没有JSX的React

1、定义组件类

2、创建一个为组件类产生实例的工厂

3、使用工厂来创建ReactElement实例



## 第三章 组件生命周期

在组件的整个声命周期中，随着该组件的props或者state发生改变，他的DOM表现也将有响应的变化。一个组件就是一个状态机：对于特定的输入，他总会返回一致的输出。


React为每个组件提供了生命周期钩子函数去响应不同的时刻--创建时、存在期、及销毁时。



### 实例化

constructor

componentWillMount

render

componentDidMount

### 存在期

componentWillReceiveProps

shouldComponentUpdate

render

componentDidUpdate

### 销毁&清理期

componentWillUnmount



## 反模式：把计算后的值赋给state

尝试在constructor中通过this.props来创建state的做法式一种反模式。应该专注于一个单一数据来源。react的设计是的备份单一数据源更加轻松，这也是React的一个优势


//反模式
constructor(props){
    super();;
    //反模式：经过计算后值不应该赋给state
    this.state  {
        day: props.date.getDate()
    }
}


// 正确模式

render(){
    return (
        <div>Day:{this.props.date.getDay()}</div>
    )
}



## 第四章 数据流

在React中，数据流向是单向的--从父节点传递到子节点，因而组件就是简单且易于把握的，他们只需从父节点获取props渲染即可。如果顶层组件的某个props改变了，React会递归地向下遍历整颗组件树，重新渲染所有使用这个属性的组件

React组件内部还具有自己的状态，这些状态只能在组件内修改。React组件本身很简单，可以把他们看成一个函数，他接收props和state作为参数，返回一个虚拟DOM变现

### props 

props就是properties的缩写，可以使用它把任意类型的数据传递给组件。

可以在挂载组件的时候设置他的props

### propTypes

通过组件中定义一个配置对象，React提供了一种验证props的方式。

class Post extends React.Component{
    static propTypes = {
        data:PropTypes.shape({
            id: PropTypes.string
        }).isRequired,
    }
}


### defaultProps

可以为组件添加defaultProps属性来设置属性的默认值。不过，这应该只针对那些非必须的属性。

static defaultProps  ={
    which:"normal"
}


### state
 每一个React组件都可以拥有自己的state，state与props的区别在于前者只存在于组件内部
 state可以用来确定一个元素的视图状态。


 ### 无状态的函数式组件

 可以把无状态的函数式组件当做单一确认数据源这种理念的一种体现。可以利用它开简化组件。


 ### 总结

 1、使用props在整个组件树种传递数据和配置

 2、避免在组件内部修改this.props，请把props当做是只读的

 3、使用props来做事件处理器，与子组件通信

 4、使用state存储简单的视图状态，比如说下拉框是否可见这样的状态

 5、使用this.setState来设置状态，而不要使用this.state来直接修改状态
 
 6、当不需要内部状态。refs和生命周期方法时，将组件变成函数组件可以减少冗余和复杂性

 


 ## 第五章 事件处理


 React通过将事件处理器绑定到组件上来处理事件。在事件触发的同时，更新组件的内部状态


 ### 绑定事件处理器

 ### 事件和状态

 React通过监听change事件并用最新的内容来做更新

 ### 根据状态进行渲染


 ### 更细状态

 更新组件的内部会触发组件重绘

 当setState被调用时，render会再次调用，不过它会从this.state读取当前的值



 ### 状态没有“更新！”
setState是异步的
如果需要在状态更新、渲染已经调用完成、更改已刷新到DOM当中时候做一些工作。可以传递一个回调函数作为setState的第二个参数

this.setState({x:2},()=>{
    console.log(this.state.x);//2
})

这个意味着一个tick中的多个状态更新可能会有问题

可以通过使用原子性的setState
