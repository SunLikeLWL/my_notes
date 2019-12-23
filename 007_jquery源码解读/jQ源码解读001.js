JQuery源码解读



JQ框架简化（ 妙味讲堂 - 视频笔记 - 第一部分）




1.1 定义一些变量和函数 jQuery = fuction() { }



1.2 给JQ对象添加一些方法和属性   length


1.3 extend: jQ的继承方法



1.4 jQuery.extend() 扩展一些工具方法


1.5 Sizzle: 复杂选择器的实现



1.6 Callback: 对调对象， 函数的统一管理

function fun1() {
    console.log(1)
}

function fun2() {
    console.log(2)
}

var cb = $.Callback();
cb.add(fun1);
cb.add(fun2);
cb.fire(); // 1,2

cb.remove(fun1)


cb.fire(); //2  fun1被移除



1.7 Deferred: 延迟对象， 对异步的统一管理


setTimeout(function () {
    console.log(1);
})
console.log(2)


// 先输出2，在输出1  setTimeout 异步函数

var dfd = $.Deferred(); //创建延迟对象

setTimeout(function () {
    console.log(1)
    dfd.resolve();
})

dfd.done(function () {
    console.log(2)
})

//先输出1，在输出2
//先用deferred 保存函数， 然后使用回调的方式调用后面的函数




1.8 support： 功能检测

// 功能检测： 浏览器版本变更快，浏览器功能不会变更，以功能的形式检测浏览器版本，更加稳定


1.9 data(): 数据存储

$("#div").data(name: "Hello") //给id为div的节点添加 name的值为Hello的属性

$("div").data("name"); // Hello



1.10 queue(): 队列管理

$("#div1").animate({ left: 100 });

$("#div1").animate({ top: 100 });

$("#div1").animate({ width: 300 });

//队列管理运动，函数等的顺序管理


1.11 attr() prop() val() addClass() 等， 对元素属性的操作



1.12 on() trigger(): 事件操作相关的方法



1.13 DOM操作： 添加append 删除empty() remove() 获取innerHTML 包装 wrap



1.14 css() ： 样式操作 boxSize 样式操作兼容处理


1.15 提交的数据和ajax() 封装ajax script标签 load()

1.16 动画方法的封装
animate();


1.17 offset() scrollTop() 位置和屏幕尺寸的方法封装


1.18 JQuery 支持模块化的模式
前端的AMD模块化的支持 
后端 common模块化的支持


1.19 window.jQuery = window.$ = jquery   // $   防冲突





