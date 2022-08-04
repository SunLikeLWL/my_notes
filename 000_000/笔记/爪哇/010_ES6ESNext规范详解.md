# ES6ESNext规范详解




## 历史

ES6 ES7

ES2015 ES2016


## ES6及以后新增的常用API解析


polyfill


### let 和 const





### 实现模板字符串解析函数
```js
const year = '2022'
const month = '08'
const day = '03'

const template = '${year}-${month}-${day}'

const context = {
    year,
    month,
    day
}
const str = render(template)(context)

console.log(str)

function render(templat){
    return function(context){
        return templat.replace(/\$\{(.*?)\}/g,(match,key)=>context[key])
    }
}

```



### 解构赋值


1、字符串


2、数组


3、对象


针对可迭代对象Iterator，通过遍历按顺序获取对应的值进行赋值。

Iterator是一种接口，interface，为各种不一样的数据结构提供统一的访问机制。

任何数据结构只要有Iterator接口。



```js

function generatorIterator(array){
    let nextIndex = 0
    return {
        next:()=>nextIndex<array.length?{
            value:array[nextIndex],
            done:false
        }:
        {
            value:undefine,
            done:true
        }
    }
}

```


可迭代对象：
是Iterator接口的实现

可迭代对象存在两种协议：可迭代协议，迭代器协议

1、



```js


const obj = {
    conut:0,
    [Symbol.iterator]:()=>{
        return ()=>{
            next:()=>{
                obj.count++;
                if(obj.count<=10){
                    return {
                        value:obj.count,
                        done:false
                    }
                }else{
                    return {
                        value:undefine,
                        done:true
                    }
                }
            }
        }
    }
}


```


### 遍历

for in

遍历对象时，拿到的是key，不仅会拿当前对象的，还会拿原型链上的
不适合遍历数组，拿到的是索引


for of
获取到的是obj
可以break中断遍历



Object.keys
Object.values
Object.entries
Object.getOwnPropertyNames
Object.getOwnPropertyDescriptor


forEach
不会被break中断




```js

Object.defineProperty(obj,key,{
    configurable:true,
    enumerable:true,
    writable:true
    value:'',
     set:function(){},
     get:function(){}
})


new Proxy({

})


```

### Array.flat(arr,deep)
deep: number| Infinity
打平数组

```js

function flatDeep(arr,d = 1){
    if(d>0){
        return arr.reduce((res,val)=>{
            if(Array.isArray(val)){
                res = res.concat(flatDeep(val,d-1))
            }else{
               res.concat(val)
            }
            return res
        },[])
    }else{
        return arr.slice()
    }
}



```


### Array.includes


### Array.from



# babel


1、解析

接受代码输出AST

语法分析
词法分析

2、转换

接收AST对其进行遍历，可以对节点进行添加，更新，移除等操作


3、生成

把转换过的AST生成为字符串形式的代码，并且创建source map



### 问题

1、webpack如何运行

2、热重载如何实现

3、webpack dev server 如何运行


