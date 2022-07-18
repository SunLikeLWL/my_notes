# WeakMap


1、WeakMap只能接受对象作为键名，不接受其他类型的值作为键名


2、WeakMap的键名所指向的对象不计入垃圾回收机制

get
has
set
delete


# Proxy

Proxy用于修改某些操作的默认行为，等同于在语言层面作出修改，
所以属于一种“元编程”，即对编程语言进行编程

Proxy可以理解成在目标对象前架设一个“拦截”层，
外界对该对象的访问都必须先通过这层拦截，
因此提供了一种机制可以对外界的访问进行过滤和改写


get

set

has

deleteProperty


ownKeys

getOwnPropertyDescriptor

defineProperty

preventExtensions

getPrototypeOf


isExtensible

setPrototypeOf

apply

constrcut




# Reflect


1、将Object对象的一些明显属于语言内部的方法放到Reflect对象上。
2、修改某些Object方法的返回结果，让其变得更加合理。
3、让Object操作都变成函数行为
4、Reflect对象的方法与Proxy对象的方法一一对应，只要是proxy对象的方法，
就能在Reflect对象上找到对应的方法

apply
construct
get
set
defineProperty
deleteProperty
has
ownKeys
isExtensions
getOwnPropertyOf
getPropertyOf
setPropertypeOf








# Promise

Promise是异步编程的一种解决方案，比传统的解决方案--回调函数和事件
--更合理且强大。

所谓的promise，简单来说就是一个容器，
里面保存着某个未来才会结束的事件的结果。


### 特点

1、对象的状态不受外界影响。

2、一旦状态改变就不会在变。


### 缺点：
1、无法取消Promise，一旦建立就会立即执行，无法中途取消
2、如果不设置回调函数，Promise内部抛出的错误不会反应到外部
3、当处于Pedding状态时，无法得知目前进展到哪一个阶段




### finally

finally方法用于指定不管Promise对象最后状态如何都会执行的操作




# Iterator 和for of 循环


遍历器就是这样一种机制。
他是一种接口，为各种不同的数据结构提供统一的访问机制。

作用：
1、为各种数据结构提供一个统一的、简单的访问接口
2、使得数据结构的成员能够按某种次序排列
3、ES6创造了一钟新的遍历命令--for of循环





# Generator

generator是ES6提供的一种异步编程的解决方案，
语法行为与传统的函数完全不同。

执行generator函数会返回一个遍历器对象。



除了for of循环，扩展运算符...、解构赋值和Array.from方法内部调用的都是遍历器接口



# Generator函数的异步应用

异步编程的方式：

1、回调函数
2、事件监听
3、发布/订阅
4、Promise




### 协程




### Thunk函数的意义


编译的“传名调用”的实现往往是将参数放到一个临时函数之中，
再将这个临时函数传入函数体。这个临时函数就称为Thunk函数





# async函数


async函数对Generator函数改进：

1、内置执行器
2、更好的语义
3、更广的适用性
4、返回的值是promise

```js

function spwan(genF){
    return new Promise(function(resolve,reject){
        var gen = genF();
        function step(nextF){
            try{
                var next = nextF()
            }catch(e){
                return reject(e)
            }

            if(next.done){
                return resolve(next.value)
            }
            Promise.resolve(next.value).then(function(v){
                step(function(){
                    return gen.next(v)
                },
                function(e){
                    return gen.throw(e)
                })
            })
        }
        step(function(){
            return gen.next(undefined)
        })
    })
}



```




# Class









# 修饰器 Decorator
 
修饰器只一个函数，用来修改类的行为
修饰器对类的行为的而改变是在代码编译时发生的，而不是在运行时。
这意味着，修饰器能在编译阶段运行代码。
也就是说，修饰器本质就是编译时执行的函数





修饰器只能用于类和类的方法，不能用于函数，因为函数存在变函数提升



# mixin







# Module


### 严格模式


1、变量必须声明后使用
2、函数的参数不能有同名属性，否则报错
3、不能使用with语句
4、不能对只读属性赋值，否则报错
5、不能使用前缀0表示八进制数，否则报错
6、不能删除不可删除的属性，否则报错
7、不能删除变量 delete prop，会报错，只能删除属性delete global[prop]
8、eval不会再他的外层作用域引入变量
9、eval和arguments不能被重新赋值
10、arguments不会自动反映函数参数的变化
11、不能使用arguments.callee
12、不能使用arguments.caller
13、禁止this指向全局对象
14、不能使用fn.caller和fn.arguments获取函数调用的堆栈你
15、增加了保留字(protected/static/interface)


# ##################################

# 简介
 
ES是JS的规范，JS是ES的一种实现

### 审批流程

展示阶段
征求意见阶段
草案阶段
候选阶段
定案阶段




# 字符串扩展

codePointAt

fromCharCode

fromCodePoint





# 正则


match
replace
search
split



# 数组扩展


isFinite
isNaN
parseInt
parseFloat
isInterger
EPSILON
isSageInterger
trunc
sign
cbrt
clz
imul
fround
hypot




### 箭头函数

1、函数体内this对象就是定义时所在的对象，而不是使用时所在的对象

2、不可以当做构造函数。也就是说，不能使用new命令，否则抛出一个错误

3、不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数替代

4、不可以使用yield命令，因为箭头函数不能作为Generatorar函数







