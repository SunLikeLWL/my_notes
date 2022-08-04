# this指针闭包作用域


## this指针

this是当前函数/当前模块的运行环境上下文，
是一个指针类型变量，普通函数中的this是在调用时才被绑定确认指向的


通过不同的this调用同一个函数，可以产生不同的结果（多态）

到底如何确定this的绑定内容是什么


## this绑定规则

### 1、默认绑定
函数独立调用的时候，不带任何修饰的函数引用
```js
function a(){

}
a()

```

1、非严格模式下，this指向全局对象（浏览器window，node global）
2、非严格模式下，this指向undefined，严格模式下不允许this指向全局变量




```js

var a = 'hello'
let obj = {
    a:'obj',
    foo:function(){
        console.log(this.a)
    }
}
 
var bar = obj.foo

bar();// hello

```
普通函数作为参数传递的情况，
setTimeout,setInterval,非严格模式下this指向全局变量


```js


var name = 'lubai';

var person = {
    name:'hahaha',
    sayHi:sayHi
}

function sayHi(){
    consolog.log(this)// person
    setTimeout(function(){
        console.log(this.name) // lubai
    })
}

person.sayHi()


```



### 2、隐式绑定

与默认绑定相反，函数调用的时候有显示的修饰，比如某个对象

```js


var a = 'hello'
var obj = {
    a:'hi',
    foo:function(){
        console.log(this.a) // hi
    }
}
obj.foo()

```

串联调用，就近原则




### 3、显示绑定

call apply bind 可以修改函数的this指向


call和apply的相同点：

1、都可以改变this指向，然后执行原有函数
2、第一个参数都是作为this的，绑定函数体的this上，
   如果不传参数fun.call()，非严格模式下，this会绑定到全局对象
3、除了this之外，其他参数的区别


```js

var person = {
    name:'123'
}
function changeWork(company,work){
    this.company = company
    this.work = work
}

changeWork.call(person,'1','2')

conosle.log(person);// {name:'123',company:"1",work:'2'}


changeWork.apply(person,['1','2'])

conosle.log(person);// {name:'123',company:"1",work:'2'}



```

如果参数的第一个参数是基本类型会怎么样


```js
// 获取类型字符串
Object.prototype.toString.call(obj)
```






### 4、new

1、创建一个空对象
2、将空对象的__proto__指向原型对象的prototype
3、以新对象为this执行原有的构造函数
4、return





### this绑定的优先级


new绑定>显示绑定（bind，call，aplly）>隐式绑定（obj.foo()）> 默认绑定




### 箭头函数


1、没有arguments
2、没有构造函数constructor，不能用new创建对象
3、没有原型对象
4、没有自己的this
   箭头函数中的this是由定义箭头函数的位置决定




## 闭包

概念：
闭包是指那些能够访问自由变量的函数，
自由变量值函数中使用的，既不是函数参数也不是函数局部变量的变量

1、从理论：所有函数都是闭包
2、从实践：
   1、即使创建他的上下文已经销毁，他仍然存在
   2、代码引用了自由变量



应用场景：
1、柯里化函数
避免调用具有相同参数的函数，同时又可以轻松复用

2、实现私有方法/变量

其实就是模块的方式，现代化的打包最终其实就是每个模块的代码相互独立

3、匿名函数执行


4、缓存一些结果

在外部函数创建一个数组，闭包函数可以更改/获取数组的值





总结：
1、创建私有变量
2、延长变量的声明周期


## 作用域


作用域决定了代码区块中变量和其他资源的可见性

全局作用域
函数作用域
块级作用域


### 全局作用域
代码中任何地方都能访问到的对象，拥有全局作用域

最外层函数
最外层全局变量
window




### 函数作用域
是指函数内部的变量


```js

function a(){
    var aaa = ''
    function b(){
        console.log(aaa)
    }
}

console.log(aaa)

```



### 块级作用域




let const 定义的变量

在一个函数内部
在一个代码块内部

块级作用域的特点
1、声明变量不会被提升到代码块顶部
2、精致重复声明
3、变量只在当前块有效


```js

for(let i = 0 ;i<10;i++){
    setTimeout(function(){
        console.log(i)
    })
}

```

## 作用域链

在找一个变量的时候，如果当前作用域找不到，会逐级往上查找

当前作用域是执行函数的作用域？还是指创建函数的作用域？

是指创建函数的作用域！！！！！



```js

var a = 10;

function fn(){
    var b = 20;
    function bar(){
        console.log(a+b)
    }
    return bar
}

var x =  fn(),b = 200

x();//30



```

```js
//变量提升

function v(){
    var a = 6;
    function a(){

    }
    console.log(a) // 6
}

v()


//   -------


function v(){
    var a;
    function a(){

    }
    console.log(a) // a(){}
}

v()

```

先变量提升a，在函数提升a，最后赋值a





