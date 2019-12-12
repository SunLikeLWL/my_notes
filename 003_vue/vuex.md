# VueX

2019年11月15日15:19:02

Vuex是一个专为Vue.js应用程序开发的状态管理模式。
它采用的集中式存储管理应用的所有组件的状态，
并以相应的规则保证转台以一种可预测的方式发生变化。
Vuex也集成到Vue的官方脚手架devtools extention，
提供了诸如零配置的time-traval调试、转台快照
导入导出等高级调试。


state 驱动应用数据源

view 以声明方式将state映射到视图

actions 响应在view上的用户输入导致的状态变化

 

 Vuex可以帮助我们管理共享状态，并附带了跟多的概念和框架


 如果在模块化构建系统中，请确保在开头调用了Vue.use();


 const  store = new Vuex.Store({
     state:{
         count:0,
     },
      mutations: {
         increment(state){
             state.count++
         }
      }
 })

 store.commit("increament");
 console.log(store.state.count);




 mapState 辅助函数

 import {mapState} from "vuex";

 export defalt{
     computed:mapState({
         count: state=>state.count,
         countAll:"count",
         countPlusLocalState(state){
             return state.count+this.localCount
         }
     })
 }

## Getter 

Vuex允许我们在store中定义"getter"（可以认为是store的计算属性）。就想计算属性一样，getter的返回值
会根据他的依赖被缓存起来，且只有当他的依赖发生了改变才会被重新计算



Getter接受一个state作为第一个参数

const  store = new Vuex.Store({
    state:{
        ...
    },
    getters:{
        doneTodos:state =>{
            return state.todos.filter(todo =>todo.done)
        }
    }
})


## Mutation

更改Vuex的store中的状态的唯一方法是提交mutation。Vuex中的mutation非常类似于事件：每个mutation
都有一个字符串的事件类型（type）和一个回调函数（handler）。这个回调函数就是我们实际进行状态更改
的地方，并且他会接受state作为第一个参数 

Mutation必须是同步函数，

Mutation中混合异步调用会导致你的程序很难调试。



## Action

Action类似于mutation，不同在于：
1、Action提交的是mutation，而不是直接改变状态；
2、Action可以包含任意异步操作；


const store = new Vuex.Store({
    state:{
        count:1,
    },
    mutation:{
        increment(state){
            state.count++;
        }
    },
    actions:{
         increment(context){
             context.commit("increment");
         }
    }
})

Action函数接受一个与store实例具有相同方法和属性的context对象，因此可以调用
context.commit 提交一个mutation，或者通过context.state和context.getters
来获取state和getters。当我们之后介绍到Modules时，你就知道context对象为什么
不是store实例本身。

actions:{
    increment({conmit}){
        commit("increment)
    }
}

### 分发 Action

Action通过store.dispatch方法触发；

store.dispatch("increment");


## Module
由于使用单一状态树，应用的所有状态集中到一个比较大的对象。当应用变得非常复杂时，store对象
就有可能变得相当臃肿

命名空间：



## 项目结构

Vuex不限制你的代码结构。但是，他规定了一些需要遵循的规则；

1、应用层级的状态应该集中到单个store对象中；
2、提交mutation是更改状态的唯一方法，并且这个过程是同步的；
3、异步逻辑都应该封装到action里面


## 插件

Vuex的store接受plugins选项，这个选项暴露出每次的mutation的钩子。
Vuex插件就是一个函数，接收store作为唯一参数。

const myPlugin = store =>{
    <!-- 当store初始化之后调用 -->
    store.subscribe((mutaion,state)=>{
   <!-- 每次mutation之后调用 -->
   <!-- mutation的格式为{type,payload} -->
    })
}


const store = new Vuex.Store({
    plugins:[myPlugin];
})



单一状态树

const store = new Vuex.Store({
    state:{
        count: 0
    },
    mutations:{
        increment:state=>state.count++;
        decrement:state=>state.count--;
    }
})


new Vue({
    el:"#app",
    computed:{
        count(){
            return store.state.count;
        }
    },
    methods:{
        increment(){
            store.commit("increment");
        }
        decrement(){
            store.comnit("decrement);
        }
    }
})