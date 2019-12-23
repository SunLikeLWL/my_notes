# jQuery技术内幕：深入解析jQuery架构设计与实现原理


## 第一部分 总体架构

### 第一章 总体架构

### 1.1 设计理念

### 核心特性

1、兼容主流浏览器，只是IE6+、Chrome、Firefox 3.6+、Safari5.0+、Opra等；

2、具有独特的链式语法和短小清晰的多功能接口；

3、具有高效灵活的CSS选择器，并且可以对CSS选择器进行扩展

4、拥有便捷的插件扩展和丰富的插件



### 1.2 总体架构

  3各部分： 入口模块+底层支持+功能模块

  工具方法模块：
  1、工具方法模块提供了一些编程辅助方法，用于简化对jQuery对象、DOM元素、数组、对象、字符串等的操作。例如，jQuery.each()、each()、jQuery.map()、.map等，

  底层支持模块：
  0、浏览器检测功能模块提供了针对不同浏览器功能和bug测试结果，其他模块则基于这个测试结果来解决浏览器之间的兼容问题
  1、在底层支持模块中，回调函数列表模块用于增强对回调函数的管理，支持添加、移除、触发、锁定、禁用回调函数等功能；
  2、异步队列模块用于解耦异步任务和回调函数，它在函数列表的基础上为回调函数增加了状态，并提供了多个回调函数列表，支持传播任意同步或异步回调函数的成功或失败状态；
  3、数据缓存模块用于为DOM元素和Javascript对象附加任意类型的数据；
  4、队列模块用于管理一组函数，支持函数的入队和出兑操作，并确保函数按顺序执行，它基于数据缓存模块实现


  功能模块： 
  1、在功能模块中，事件系统提供了统一的事件绑定、响应、手动触发和移除机制，它并没有将事件绑定非到DOM元素上，而是基于数据缓存模块来管理事件；
  2、Ajax模块允许从服务器上挤在数据，而不用刷新页面，它基于异步队列吗，欧快来管理和触发回调函数；
  3、动画模块用于向网页中添加动画效果，它基于队列模块来管理和执行动画函数；
  4、属性操作模块用于对HTML属性和DOM属性进行读取、设置和移除操作；
  5、DOM遍历模块用于在DOM树种遍历父元素、子元素和兄弟元素；
  6、DOM操作模块用于插入、移除、复制和替换DOM元素；
  7、样式操作模块用于获取计算机样式或设置内联样式；
  8、坐标模块用于读取或设置DOM元素的文档位置；
  9、尺寸模块用于获取DOM元素的高度和宽度


#### 源码总体结构
(function(window,undefined){
     // 构造jQuery对象

     var jQuery  =(function(){
        var jQuery = function(selecter,context){
            return new jQuery.fn.init(selector,context,rootjQuery)
        }
        return jQuery;
     })()

    工具方法Utilities
    回调函数列表 Callbacks Object
    异步队列 Deferred Object
    浏览器功能测试 Suport
    数据缓存 Data
    队列 Queue
    属性操作 Attributes
    事件系统Events
    选择器Sizzle
    DOM遍历 Traversing
    DOM操作 Manipulation
    样式操作 CSS （计算样式、内联样式）
    异步操作  Ajax
    动画 Effects
    坐标 Offset、尺寸Dimensions
})(window)





