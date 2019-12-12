# Redux

2019年11月15日15:17:57

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







# Flux 
Facebook用户建立顾客端web应用的前端架构，它通过利用一个单向数据流补充了React的组合视图组件，
## 组成
Dispatcher调度
存储Store
视图View(React组件)

# RxJS

管理复杂异步应用非常优秀的方案。以外，还有致力于构建人机交互模拟为相互依赖的可观测变量的库。




# Actin

action是把数据从应用传到store的有效载荷。他是store数据的唯一来源。一般来说你会通过store.diapatch()讲action传到store


