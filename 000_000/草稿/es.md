# ES5


Proxy用于修改某些默认行为，
等同于在语言层面作出修改，
所以属于一种元编程，
即对编程语言进行编程

Proxy可以理解成在目标对象前架设一个拦截层，
外界对该对象的访问必须先通过这层拦截，
因此提供了一种机制可以对外界的访问进行过滤和改写


get

set

has

deleteProperty

ownKeys

getOwnPropertyDescriptor

defineProperty

preventExtioons

getPrototypeOf

isExtensible

setPrototypeOf

apply

construct




## Reflect

Reflect对象与Proxy对象一样，
也是ES6为了操作对象而提供的新的API

1、将Object对象的一些明显属于语言内部的方法发到Reflect对象上。
2、修改某些Object方法的返回结果，让其变得更加合理
3、让Object操作都变成函数行为。
4、Reflect对象的方法与Proxy对象的方法一一对应，
   只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法


静态方法


apply
consturct
get
defineProperty
deleteProperty
has
ownKeys
isExtensible
preventExtensions
getOwnPropertyDescriptor
getPrototypeOf
setPrototypeOf




### Promise
Promise是异步编程的一种解决方案

1、对象的状态不受外界影响
2、一旦状态改变就不会再变





### Iterator和for of 循环


Iterator的遍历过程

1、创建一个指针对象，指向当前数据结构的起始位置。
   也就是说遍历器对象本质上就是一个指针对象

2、第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员

3、第二次调用指针对象的next方法，指针就指定数据结构的第二个成员

4、不断调用指针对象的next方法，直到它的指向数据结构的结束位置




### Generator

Generator函数时ES6提供的一种异步编程解决方案，
语法与传统函数完全不同


从语法上，首先可以把他理解成一个状态机，封装了多个内部状态。

执行Generator函数会返回一个遍历器对象。



遍历器对象的next方法的运行逻辑：

1、遇到yield语句就暂停执行后面的操作，并将紧跟在yield后的表达式的值作为
   返回的对象的value属性值
2、下一次调用next方法时再继续往下执行，直到遇到下一条yield语句

3、如果没有再遇到新的yield语句，就一直运行到函数结束， 
   直到return语句为止，并将return语句后面的表达式的值作为返回对象的value属性

4、如果该函数没有return语句，则返回对象的value属性值为undefined


回调函数
事件监听
发布/订阅
Promise对象


传统的编程语言中早有异步编程的解决方案，其中一种叫做’协成‘，
意思是多个线程相互协作，完成异步任务

```js

var Thunk = function(fn){
   return function(){
      var args = Array.prototype.slice.call(arguments);
      return function (callback){
         args.push(callback);
         return fn.apply(this,args);
      }
   }
}



```


### async
 1、内置执行器
 
 2、更好的语义

 3、更广的适用性

 4、返回值是Promise

 



 async函数内部抛出错误会导致返回的Promise对象变为reject状态。
 抛出的错误对象会被catch方法回调函数接收到


 ```js

function spawn(genF){
   return new Promise(function(resolve,reject){
      var gen = genF()
      function step(nextF){
         try{
            var next = nextF()
         }
         catch(e){
            return reject(e)
         }
         if(next.done){
            return resolve(next.value);
         }
         Promise.resolve(next.value).then(function(v){
            step(function(){
               return gen.next(v)
            })
         },
         function(e){
            step(function(){
               return gen.throw(e)
            })
         }
         )
      }
      step(function(){
         return gen.next(undefined)
      })
   })
}




 ```


 ### 异步遍历器

 Iterator接口是一种数据遍历的协议，
 只要调用遍历器对象的next方法就会得到一个对象，
 表示当前遍历指针所在位置的信息。

 for await of


 ```js

async function (){
   try{
      for await (const x of createRejectingIterator()){
         console.log(x)
      }
   }catch(e){
      console.error(e)
   }
}


 ```


 ### Class的基本用法

 getOwnPropertyNames


 hasOwnProperty



 不存在变量提升

 

 #### this
 类的方法内部如果含有this，
 他将默认指向类的实例。



 #### class 的静态方法

 类相当于实例的原型，
 所有在类中定义的方法都会被实例继承。 
 如果在一个方法前加static静态字，
 就表示该方法不会被实例继承，
 而是直接通过类调用，成为’静态方法‘


 父类的静态方法可以被子类继承

 new是从构造函数生成实例的命令。



 Class可以通过extends关键字实现继承，
 这比ES5通过修改原型链实现继承更加清晰和方便


 getPrototypeOf


 #### super

 super这个关键字既可以当做函数使用，也可以当做对象使用。
 第一种情况，super作为函数调用时代表父类的构造函数。
 ES6要求，子类的构造函数必须执行一个super函数


 第二种情况，super作为对象时在普通方法中指向父类的原型对象；
 在静态方法中指向父类


 #### 类的prototype属性和__proto__属性

 在大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，
 指向对应的构造函数的prototype属性。
 Class作为构造函数的语法糖，同时有prototype属性的__proto__属性，
 因此同时存在两条继承链

 1、子类的__proto__属性表示构造函数的继承，总是指向父类
 2、子类的prototype属性的__proto__属性表示方法的继承，
    总是指向父类的prototype属性



# 装饰器

类的修饰


方法的修饰


params

包含路由中的动态片段和全匹配片段的键值对

query


replace

append


activeClass


hashbang

history
saveScrollPosition

transitionOnLoad


Proxy可以直接监听对象而非属性
Proxy可以直接监听数组的变化



# Module的语法

严格模式限制：

1、变量必须声明后再使用
2、函数的参数不能与同名属性，否则报错
3、不能使用with语句
4、不能对只读属性赋值，否者报错
5、不能使用前缀0表示八进制数，否则报错
6、不能删除不可删除的属性，否则报错
7、不能删除变量delete prop，会报错，只能删除属性delete global[prop]
8、eval不会在它的外层作用域引入变量
9、eval和arguments不能被重新赋值
10、arguments不会自动反映函数参数的变化
11、不能使用arguments.callee
12、不能使用arguments.caller
13、禁止this指向全局对象
14、不能使用fn.caller和fn.arguments获取函数调用的堆栈
15、增加了保留字 protected static interface



# 正则的扩展

u修饰符含义为Unicode模式，用来正确处理大于\uFFFF的Unicode字符。


y修饰符叫做“粘连”修饰符，全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
不同之处在于，g修饰符只要剩余位置中存在匹配就行，
而y修饰符会确保匹配必须从剩余的第一个位置开始


isFinite()
isNaN()
parseInt()
parseFloat()
isInterger()
isSafeInterger()
