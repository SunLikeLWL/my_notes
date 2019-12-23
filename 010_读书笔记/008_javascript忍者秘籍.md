# javascript 忍者秘籍

## ES6 速查表


1、块级作用域
let、const

2、函数参数

剩余参数
function multiMax(first,...remaining){

}
函数默认参数
function do(age=12){

}


3、扩展语法
允许一个表达式在期望多个参数或多个元素或多个变量的位置扩展
[...item,3,4,5];


4、箭头函数
可以创建语法更为简洁的函数。箭头函数不会创建自己的this参数，相反，他将继承使用执行上下文的this值

5、生成器
generator函数能生成一组值的序列，但每个值的生成是基于每次请求，并不同于标准函数那样立即生成。
每当生成函数生成一个值，他都会暂停执行但不会阻塞猴急代码执行。

function *IdGenerator()
{
    let id = 0;
    while(true){
        yield ++id;
    }
}

6、类
  class是javascript原型的语法糖


7、代理
Proxy可对对象的访问进行控制。当于对象交互时，可以执行自定义操作


const p = new Proxy(target,{
    get(target,key)=>{

    },
    set(target,key,value){

    }
    
})

8、映射
Map是键于值之间的映射关系
a、通过new Map()创建一个新的映射；
b、使用set方法添加新映射，get获取映射，has方法检测映射是否存在，delete方法删除映射


9、集合
Set是一组非常重复成员的集合
a、通过new Set()创建一个新的集合
b、使用add方法添加新成员，delete方法删除成员，size属性获取集合中成员的个数


10、对象与数组的结构

11、模块


12
