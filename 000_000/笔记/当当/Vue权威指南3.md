# Symbol


Symbol函数前不能使用new命令，否则会报错。
这是因为生成的Symbol是一个原始类型的值，不是对象





# 合并策略


1、混合对象和组件存在同名的声明周期方法时，他们会合并到一个数组中，
混合对象的生命周期方法优先执行，组件的同名声明周期方法后执行

2、混合对象的其他选项如methods中定义了合组件同名的方法时，
组件会覆盖混合对象的同名方法




# 缓存





# props






# Reflect

Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新的API。

1、将Object对象的一些明显属于语言内部的方法方到Reflect对象上


2、修改某些Object方法的返回结果，让其变得更加合理


3、让Object操作都变成函数行为


4、Reflect对象的方法与Proxy对象的方法一一对应，
只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法


apply

construct

get

set 

defineProperty

deleteProperty

has

ownKeys

isExtensible

preventExtentions

getOwnPropertyDescriptor

getPrototypeOf

setPrototypeOf



