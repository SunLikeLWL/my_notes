


Vue.js特性

1、确实轻量

2、数据绑定

3、指令


4、插件化





v-pre
编译时跳过当前元素和他的子元素。
可以用来显示原始Mustache标签。
跳过大量没有指令的节点会加快编译



v-cloak
v-cloak这个指令保持在元素上直到关联实例结束编译




### Terminal

Vue通过递归遍历ODM树来编译模块。
但是当他遇到terminal指令时会停止遍历这个元素和后代元素，
这个指令将接管编译这个元素及其后代元素的任务





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







# methods



1、methods中定义的方法内的this始终指向创建的Vue实例。
2、与事件绑定的方法支持参数event即原生DOM事件的传入
3、方法用在普通元素上时，只能监听原生DOM事件；
用在自定义元素组件上时，也可以监听子组件触发的自定义事件






### 实例属性

组件树访问：
$parent
$root
$children
$refs

DOM访问：

$el
$els


数据访问

$data
$options




### 实例方法

```js
$appendTo

$after

$before

$remove

$nextTick
```


### vm实例事件


```js

$dispatch
$broadcast
$emit


$on
$once


$off

```


# 组件


模板：模板声明了数据和最终展现给用户的DOM之间的映射关系

初始数据：一个组件的初始数据状态

接受的外部参数：组件之间通过参数来进行数据的传递和共享

方法：对数据的改动操作一般都在组件的方法内进行。

生命周期钩子函数：







# Vue.js 2.0


Vue.config.errorhandler



