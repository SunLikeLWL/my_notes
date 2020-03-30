  # React小书
 

 
  handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
 

 setState合并

 上面我们进行了三次setState，但实际上组件渲染只会进行一次，而不是三次；
 这是因为在React.js内部把javascript事件循环中的消息队列的同一个消息
 中的setState都进行了合并以后再重新渲染



1、为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
2、组件可以在内部通过 this.props 获取到配置参数，
   组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。
3、可以通过给组件添加类属性 defaultProps 来配置默认参数。
4、props 一旦传入，你就不可以在组件内部对它进行修改。
   但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。



## 纯函数

1、函数的返回结果只依赖他的参数
2、函数执行过程没有副作用



## 高阶函数

高阶函数是一个函数，传给他一个组件，他返回一个新的组件

 ## 