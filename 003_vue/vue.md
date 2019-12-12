# Vue

2019年11月15日15:18:56

vue是一套构建用户界面的渐进式框架
vue只关注视图层，才用自底向上增量开发的设计。
vue的目标是通过尽可能简单的api实现响应式的数据绑定和组合的视图组件


## 安装与使用
1、安装cnpm

npm install -g cnpm --registry=https://registry.npm.taobao.org
2、安装vue
cnpm install -g vue

3、安装vue脚手架构建工具 vue-cli

cnpm install -g vue-cli


4、创建一个基于webpack模板的新项目

vue init webpack project

vue init webpack-simple project


5、启动项目

cnpm run dev




## 原理实现
### 数据流向：
数据的改变通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，此类行为
会改变数据的时候通过dispatch发起一个action，如果是同步行为会直接通过Reducers
改变state，如果是异步行为（副作用）会先触发Effects然后流向Reducers最后改变
state，所以在dva中，数据流向非常简明，并且思路基本跟开源社区保持一致



#state
state表示Model的状态数据，通常表现为一个javascript对象（当然他也可以是任意值）；
操作的时候每次都要当做不可变数据来对待，保证每次都是全新对象，没有引用关系，
这样才能保证State的独立性，便于测试和追踪变化

#Action
Action是一个普通的javascript对象，他是改变State的唯一途径。无论是从UI事件、网络回调，
还是Websocket等数据源所获得的数据，最终都会通过dispatch函数调用一个action，从而改变
对应的数据。action必须 带有type属性知名具体的行为，其他字段可以自定义，如果要发起一个action
需要使用dispatch函数，需要注意的是dispatch是在组件connect models后，通过props传入的。

#dispatch函数
type dispatch = (a:Action) =>Action
dispatch function 是一个用于触发action函数，action是改变State的唯一途径，但是他只描述了一个
行为，而dispatch可以看做是触发这个行为的方式，而Reducer则是描述如何改变数据的。

#Reducer
Reducer(也称为reducing function)函数接受两个参数：之前经常积累运算的结果和当前要被积累的
值，返回的是一个新的积累结果。该函数把一个集合归并为一个单值。

#Effect
Effect被称为副作用，在我们的应用中，最常见的就是异步操作。他来自于函数编程的概念，子所以叫副作用，
是因为他使得我们的函数变得不纯，同样的输入不一样获得同样的输出。

dva为了控制副作用的操作，底层引入了redux-saga做异步流程控制，由于采用了generator的相关概念，
所以将异步转成同步写法，从而将effects转为纯函数。


#Subscription
Subscription是一种从源获取数据的方法，它来自于elm。

subcription语义是订阅，用于订阅一个数据源，然后根据dispatch需要的action。数据源可以是当前的时间、服务
器的webscoket链接、keyboard输入、geolocation变化、history路由变化等等。



Router
这里的路由通常是指前端路由，由于我们的应用现在通常是单页面应用，所以需要前端代码来控制路由逻辑，
通过浏览器提供的History API 可以监听到浏览器的url的变化，从而控制路由相关操作。
dva实例


flux，单向数据流，以redux为代表的
reactive，响应式数据流方案，以Mobx为代表的

dva = React-Router + Redux +saga

import  dva from 'dva';

const App = () = ><div>Hello dva</div>

const app = dva();

app.router(()=></App>);

app.start("#root");



State: 一个对象，保存整个应该状态

View:  React组件构成测视图层

Action: 一个对象，描述事件

connect方法： 一个函数，绑定State到View

dispatch方法： 一个函数，发送action到state




## 单向数据流
所有的prop都是的其父子prop之间形成了一个单向下行绑定:
父级prop的更新会向下流动到子组件中，但是反过来则不行。
这样防止从子组件以外变成父级组件的状态，从而导致你的应用
的数据流向难以理解



过度的类名


1、v-enter： 
定义进入过渡的开始状态。在元素被插入之前生效，在元素插入之后的下一帧移除；

2、v-enter-active:
定义进入过渡生效的状态。在整个过渡的阶段中应用，在元素被插入之前生效，=
在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3、v-enter-to:
定义进入过渡的结束状态。在元素被插入后下一帧生效（与此同时v-enter被移除），在过渡/动画完成字后移除。

4、v-leave：
定义离开过渡的开始状态。在离开过渡被触发时立即生效 ，下一帧被移除。

5、v-leave-active：
定义离开过渡生效时的状态。在整个离开过渡阶段中应用，在离开过渡被触发是立即生效，
在过渡/动画完成之后移除。这个磊哥可以被用来定义离开过渡的过程时间，延迟和曲线函数。

6、v-leave-to：
定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效（与此同时v-leave被删除），在过渡/动画完成之后移除。

q


### mixins


mixins 就是定义一部分公共的方法或者计算属性，然后混入到各个组件中使用，方便管理与
统一修改





### MVVM

Model
View
ViewModel（DOM Listeners + Data Binding）



1、计算属性
在computed属性对象中定义计算属性的方法
在页面中使用{{方法名}}来显示计算的结果

2、监视属性：
通过vm对象的$watch活watch配置来监视指定的属性
当属性改变时，回调函数自动调用，在函数内部进行计算

3、计算属性高级
通过getter和setter实现对属性的显示和监视
计算属性存在缓存，多次读取只执行一次getter计算


### 双向数据绑定

1、vue本身只是监视了data最外层数据的变化，没有监视内部数据的变化
2、vue重写了数组中的一系列改变数组内部数据的方法(push，pop，shift
unshift,reverse,merge)
  先调用原生方法，在更新界面

  this.persons.splice(index,1);

  this.persons[index]  = onjP;





