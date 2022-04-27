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

