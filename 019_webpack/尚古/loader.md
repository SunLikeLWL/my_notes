# 原理


### loader

1、分类

pre：前置loader
normal：普通loader
inline：内联loader
post：后置loader

2、执行顺序

4类loader的执行优先级为：pre> normal > inline > post

相同优先级的loader执行顺序为： 从右到左，从下到上




3、使用loader方式

配置方式：在webpack.config.js文件中指定loader（pre normal post）
内联方式：在每个import语句中显示执行loader


4、inline loader

用法： import Style form 'style-loader!css-loader?module!./styles.css'

含义：
通过css-loader和style-loader处理styles.css 文件
通过!将资源中的loader分开



inline loader可以通过添加不同前缀，跳过其他类型loader

! 跳过 normal loader
-! 跳过pre normal post

!! 跳过  pre normal post



### 开发一个loader


loader就是一个函数
当webpack解析资源时，会调用相应的laoder去处理
loader接受文件内容做为参数，返回内容出去
   content 文件内容
   map sourceMap
   meta 别的loader传递的数据

```js

module.exports = function(content,map,meta){
    console.log(content)
    return content
}



```



### loader 分类

1、同步loader

```js
module.exports = function(content,map,meta){
    return content
}


```

this.callback()方法则更加灵活，因为它允许传递多个参数，而不仅仅是content

```js
module.exports = function(content,map,meta){
    // 传递map，让source-map不中断
    // 传递meta。让下一个laoder接收到其他参数
    this.callback(null,content,map,meta)
    return; //  当调用callback()函数时，总是返回undefined
}


```


2、异步loader


```js
module.exports = function(content,map,meta){
    const callback = this.async()
    setTimeout(()=>{
        callback(null,result,map,meta)
    },1000)
    return content
}
```

3、Raw loader

默认情况下，资源文件会被转化为UTF-8字符串，然后传给loader。
通过设置raw为true，loader可以接收原始的Buffer

```js

module.exports = function(content){
    // content是一个buffer数据
    return content
}
module.exports.raw = true // 开启Raw loader

```


4、Pitching loader

```js

module.exports = function (content){
    return content
}

module.exports.patch = funtion(remainingRequest,precedingRequest,data){
    console.log('do somethings')
}

```





### laoder API


this.async()
异步回调loader

this.callback()
可以同步或者异步调用的并返回多个结果的函数

this.getOptions()
获取loader的options

this.emitFile()
产生一个file

this.utils.contextify()
返回一个相对路径

this.utils.absolutiy()
返回一个绝对路径



