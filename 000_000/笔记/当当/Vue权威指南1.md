# 计算属性

通常我们会在模板中绑定表达式，
模板是用来描绘视图结构的



# 表单


lazy


debounce

number



```js


function debounce(func,wait){
    var timeout,args,context,timestamp,result
    var later = function(){
        var last = Date.now() - timestamp
        if(last<wait && wait>0){
            timeout = setTimeout(later,wait-last)
        }else{
            timeout = null
            result = func.apply(context,args)
            if(!timeout) context = args = null
        }
    }
    return function(){
        context = this;
        args = arguments;
        timestamp = Date.now()
        if(!timeout){
            timeout = setTimeout(later,wait)
        }
        return result
    }
}




```



```js

function tonumber(value){
    if(typeof value !=== 'string'){
        return value
    }else{
        var parsed = Number(valye)
        return isNaN(parsed)?value:parsed
    }
}



```


# 过滤器


capitalize

uppercase

lowercase

limitBy

filterBy

orderBy

json

currency

debounce




### 管道


capitalize

uppercase

lowercase



# methods

1、methods中定义的方法内的this始终指向创建的Vue实例
2、与事件绑定的方法支持参数event即原生DOM事件的传入
3、方法用在普通元素上时，只能监听原生DOM事件；
用在自定义元素组件上时，也可以监听组件触发自定义事件



### 修饰符


prevent
stop
capture
self

按键

enter
tab
delete
esc
space
up
down
left
right





# Vue实例 
```js
$parent
$root
$children
$refs

$el
$els

$data
$options




$appendTo


$after
$before

$remove

$nextTick



$dispatch
$broadcast
$emit

$on 
$once

$off
```

# 组件

模板
模板声明了数据和最终展现给用户的DOM之间的映射关系

初始数据data
一个组件的初始数据状态。对于可复用的组件来说，通常是私有的状态

接受的外部参数props
组件之间通过参数来进行数据的传递和共享。

方法 
对数据的改动操作一般在组件的方法内进行


声明周期钩子函数



# vue-resource


jsonp
beforeSend
crossOrigin
evalteHTTP
emulateJSON
timeout
methods
data
params
headers
xhr
upload




# 虚拟DOM

ast树优化的过程

1、会检测出静态的class名和attributes，
这样他们在初始化渲染之后就永远都不会再被比对了

2、会检测出最大的静态子树并且从渲染函数中萃取来。
这样在每次重渲染时，他就会直接重用完全相同的Vnode，同时跳过对比





# ssr

1、首屏渲染速度更快

2、SEO

3、减少http请求


# promise

特点：
1、对象的状态不受外界影响
2、一旦状态改变就不会再变

```js

var getJSON = function(url){
    var promise = new Promise(function(resolve,reject){
        var client = new XMLHttpRequest();
        client.open('GET',url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept','applicaton/json')
        client.send()
        function handler(){
            if(this.readyState !== 4){
                return 
            }
            if(this.status === 200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
 })
 return promise
}


getJSON('./posts.json').then(function(json){
    console.log('Contents:'+json)
},function(error){
    console.log('出错了',error)
})





```



```js

function hasOwn(obj,key){
    return Object.prototype.hasOwnProperty.call(obj,key)
}



```



```js

function cancellable(fn){
    var cb = function(){
        if(!cb.cancelled){
            return fn.apply(this,argumemnts)
        }
    }
    cb.cancel = function(){
        cb.canceled = true
    }
    return  cb
}




```



# 响应式原理

1、通过Observer对data做监听，并且提供订阅某个数据项变化的能力

2、把tempalte编译成一段document fragment，然后解析其中的Directive，
得到每一个Directive所依赖的数据项和update方法

3、通过Watcher把上述两部分结合起来，即把Directive中的数据依赖通过Watcher
订阅在对应数据的Observer的Dep上。
当数据发生变化时，就会触发Observer的Dep上的notify方法通知对应的Watcher的update，
进而触发Directive的update方法来更新DOM视图，最后达到模型和视图关联起来




