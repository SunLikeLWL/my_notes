# 逐行剖析 Vue.js 源码

https://nlrx-wjc.github.io/Learn-Vue-Source-Code/






## 1、代码目录

  dist                   #项目构建后的文件
  scripts                #与项目构建相关的脚本和配置文件
  flow                   #flow类型的声明文件
  src                    #项目源代码
       compilier         #与模板编译相关的代码
       core              #通用的、与运行时平台无关的运行时代码
             observe     #实现变化侦测的代码
             vdom        #实现virtual dom代码
             instance    #Vue.js实例构造函数和原型方法
             global-api  #全局api的代码
             components  #内置组件的代码
        server           #与服务器渲染相关的代码
        platforms        #特定运行平台的代码，如weex
        sfc              #单文件组件的解析代码
        shared           #项目公用的工具代码
test                     #项目测试代码


*
*
*
*
*
*
*
*
*
*
 



## 2.2  学习路线

## 1、变化侦测
 学习vue中如何实现数据的响应式系统，从而达到数据驱动视图

### 数据驱动视图

我们可以把数据理解为状态，而视图就是用户可直观看到页面。页面不可能是一成不变的，它应该是动态变化的，而它的变化也不应该是无迹可寻的，它或者是由用户操作引起的，亦或者是由后端数据变化引起的，不管它是因为什么引起的，我们统称为它的状态变了，它由前一个状态变到了后一个状态，页面也就应该随之而变化

 UI = render(state)

### 变化侦测

### 概念
变化侦测就是追踪状态，亦或者说是数据的变化，一旦发生了变化，就要去跟新视图


### 1、使得Object数据变得可观测

通过Object.defineProperty实现

#### 源码实现

 // Observer 类会通过递归的方式把一个对象的所有属性都转化为可观测对象

 export class Observer{
     constructor(value){
         this.value = value;
         // 给value新增一个__obj__属性，值为value的Observer实例
         // 相当于value上打标记，表示它已经被转化成响应式了，避免重操作
         def(value,'__obj__',this);
         if(Array.isArray(value)){
             // 当value为数组的逻辑

         }
         else{
             this.walk(value)
         }
     }


     walk(obj:Object){
         const keys = Object.keys(obj);
         for(let i = 0;i< keys.length;i++){
             defineReactive(obj,keys[i]);
         }
     }
 } 


 // 使第一个对象转换成可观测对象
 // @param {Object} obj 对象
 // @param {String} key 对象的key
 // @param {Any} val 对象的某个key值

 function defineReactive(obj,key,val){
     // 如果只传了obj和key，那么val = obj[key];
     if(arguments.length === 2){
         val = obj[key];
     }
     if(typeof val ==== 'object'){
         new Observer(val);
     }
     Object.defineProperty(obj,key{
         enumerable:true,
         configurable: true,
         get(){
             console.log(key+"属性被读取了");
         },
         set(newVal){
             if(val === newVal){
                 return ;
             }
             console.log(key+"属性值被修改了");
             val = newVal;
         }
     })
 }



 ### 2、依赖收集

 ### 概念

 视图里谁用到了这个数据就更新谁，我们换个优雅说法：我们把"谁用到了这个数据"称为"谁依赖了这个数据",我们给每个数据都建一个依赖数组(因为一个数据可能被多处使用)，谁依赖了这个数据(即谁用到了这个数据)我们就把谁放入这个依赖数组中，那么当这个数据发生变化的时候，我们就去它对应的依赖数组中，把每个依赖都通知一遍。


 ### 赖管理器Dep类

  export default class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub (sub) {
    remove(this.subs, sub)
  }
  // 添加一个依赖
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 通知所有依赖更新
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

/**
 * Remove an item from an array
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}




*
*
*
*
*
*
*
*
*
*











## 2、虚拟DOM篇
学习什么是虚拟DOM，以及Vue中的DOM-Diff原理



*
*
*
*
*
*
*
*
*
*

## 3、模板编译篇
学习vue内部是怎么把template模板编译成虚拟DOM，从而渲染出真实DOM



*
*
*
*
*
*
*
*
*
*

## 4、实例方法篇
学习Vue中所有实例方法（即所有以$符号开头的方法）的实现原理


*
*
*
*
*
*
*
*
*
*

## 5、全局API篇
学习Vue总所有全局API的实现原理



*
*
*
*
*
*
*
*
*
*

## 6、生命周期
学习Vue中组件的生命周期实现原理



*
*
*
*
*
*
*
*
*
*

## 7、指令篇
学习Vue中所有的指令的实现原理



*
*
*
*
*
*
*
*
*
*

## 8、过滤器篇
学习Vue总多有的过滤器的实现原理


*
*
*
*
*
*
*
*
*
*

## 9、内置组件篇
学习Vue中内置组件的实现原理


*
*
*
*
*
*
*
*
*
*






 

