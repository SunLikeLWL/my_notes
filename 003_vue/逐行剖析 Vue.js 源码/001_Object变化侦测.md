#  变化侦测
 学习vue中如何实现数据的响应式系统，从而达到数据驱动视图

## 数据驱动视图

我们可以把数据理解为状态，而视图就是用户可直观看到页面。页面不可能是一成不变的，它应该是动态变化的，而它的变化也不应该是无迹可寻的，它或者是由用户操作引起的，亦或者是由后端数据变化引起的，不管它是因为什么引起的，我们统称为它的状态变了，它由前一个状态变到了后一个状态，页面也就应该随之而变化

 UI = render(state)




## Object变化侦测

### 概念
变化侦测就是追踪状态，亦或者说是数据的变化，一旦发生了变化，就要去跟新视图


### 1、使得Object数据变得可观测

通过Object.defineProperty实现

### 源码实现

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




function defineReactive (obj,key,val) {
  if (arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object'){
    new Observer(val)
  }
  const dep = new Dep()  //实例化一个依赖管理器，生成一个依赖管理数组dep
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(){
      dep.depend()    // 在getter中收集依赖
      return val;
    },
    set(newVal){
      if(val === newVal){
          return
      }
      val = newVal;
      dep.notify()   // 在setter中通知依赖更新
    }
  })
}



###  Watcher类
 

export default class Watcher {
  // 1、当实例化Watcher类时，会先执行器构造函数 
  constructor (vm,expOrFn,cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(expOrFn)
    this.value = this.get()
  }

  
    2、在构造函数中执行this.get()实例方法

    3、在get() 方法中，首先通过window.target = this 把实例自身赋给了全局的一个唯一对象
    window.target上，然后通过 let value = this.getter.call(vm,vm)获取一个被依赖的的数据，获取被依赖数据的目的是触发该数据上面的getter，上文我们说过，在getter里面会调用dep.depend()收集依赖，而在dep.depend()中获取挂载window.target上的值并将其存入依赖组中，在get()方法最后将window.target释放掉 

  get () {
    window.target = this;
    const vm = this.vm
    let value = this.getter.call(vm, vm)
    window.target = undefined;
    return value
  }

  4、当数据变化时，会触发的setter，在setter中调用了dep.notify()方法，在dep.notify()方法中，遍历所有依赖（即watcher实例），执行依赖的update方法，也就是Watcher类中的update()实例方法，在update()方法中调用数据变化回调函数，从而更新视图
  

  update () {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}

/**
 * Parse simple path.
 * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
 * 例如：
 * data = {a:{b:{c:2}}}
 * parsePath('a.b.c')(data)  // 2
 */
const bailRE = /[^\w.$]/
export function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}


### 不足之处


虽然我们通过Object.defineProperty方法实现了对object数据的可观测，但是这个方法仅仅只能观测到object数据的取值及设置值，当我们向object数据里添加一对新的key/value或删除一对已有的key/value时，它是无法观测到的，导致当我们对object数据添加或删除值时，无法通知依赖，无法驱动视图进行响应式更新。

当然，Vue也注意到了这一点，为了解决这一问题，Vue增加了两个全局API:Vue.set和Vue.delete，这两个API的实现原理将会在后面学习全局API的时候说到。

#6. 总结




1、Data通过observer转换成了getter/setter的形式来追踪变化。

2、当外界通过Watcher读取数据时，会触发getter从而将Watcher添加到依赖中。

3、当数据发生了变化时，会触发setter，从而向Dep中的依赖（即Watcher）发送通知。

4、Watcher接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。









