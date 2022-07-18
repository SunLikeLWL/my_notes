



# 指令

指令是特殊的带有前缀v-的特性。
指令的值限定为绑定表达式，
指令的职责就是当其表达式的值改变时把某些特殊的欣慰应用到DOM上


v-show
v-else
v-repeat
v-for
v-text
v-el
v-html
v-on
v-bind
v-ref
v-pre
v-cloak
v-if




push
pop
shift
unshift
splice
sort
reverse


ECMAScript 5无法检测到新属性添加到一个对象上火这在对象中删除。




### 计算机属性

就是当其依赖值发生变化时，这个属性的值会自定更新，
与至相关的DOM部分也会同步自动更新





### 动画

1、尝试以ID ’my-transition‘ 查找Javascript过度钩子对象，
该对象通过Vue.transition(id,hooks)或tansitions选项注册。
如果找到了，将在过度的不同阶段调用相应的钩子
2、自动嗅探目标元素是否有CSS过度动画，并在合适时添加/删除CSS类名，
免去用户自己进行相关操作的繁琐
3、如果没有找到Javascript钩子并且也没有检测到CSS过度/动画，
DOM操作将在下一帧中立即执行




### methods

1、methods中定义的方法内的this始终指向创建的Vue实例
2、与事件绑定的方法支持参数event即原生DOM事件的传入
3、方法用在普通元素上时，只能监听子组件触发的自定义事件



prevent

stop

capture

self




### Vue实例属性

$parent

$root

$children

$refs

$el

$els

$data

$options


### Vue实例方法


```js
$appendTo
$after
$before
$remove
$nextTick

```

用来在下次DOM更新循环后执行指定的回调函数，
使用该函数方法可以保证DOM中的内容已经与最新数据保持同步



### 实例事件



$dispatch

$broadcast

$emit

$on

$once

$off




# 组件


### 模板
模板声明了数据和最终展现给用户的DOM之间的映射关系


### 初始数据
一个组件的初始数据状态。
对于可复用的组件来说，通常是私有的状态

### 接受的外部参数
组件之间通过参数来进行数据的传递和共享
参数默认是单向绑定，单也可以是显示声明为双向绑定


### 方法
对数据的改动操作一般都叜组件的方法内进行。
可以通过v-on指令将用户和组件方法进行绑定



### 声明周期钩子函数

一个组件会触发多个生命周期钩子函数，
比如created,attached,destroyed等。
在这些钩子函数中，我们可以封装一些自定义的逻辑。
和传统的MVC相比，这可以理解为Controller的逻辑被分散到了这些钩子函数中





1、prop允许外部环境传递数据给组件
2、事件允许组件触发外部环境的action
3.slot允许外部环境将内容插入到组件的视图结构内



### 模板解析

1、a不能包含其他的交互元素
2、ul和ol只能直接包含li
3、select只能包含option和optgroup
4、table只能直接包含thead、tbody、tfoot、tr、caption、col、colgroup
5、tr只能直接包含th和td




### vue-resource

全局配置
组件实例配置
调用配置


jsonp
beforeSend
crossOrign
emulateJSON
timeout
method
data
params
headers
xhr
upload



# 路由与视图

嵌套路由
组件惰性载入
视图切换动画
具名路径





hashbang




# transition

transition对象并不是动画，它提供了很多方法来控制路由切换的时机


to
from
next
abort
redirect



VNode




# util




### dom

dom操作：
query
inDoc
before
after
remove
prepend
replace
extractContent
trimNode
isTemplate
isFragment
getOutHTML


属性操作：
getAttr
getBindAttr
hasBindAttr

class操作：
setClass
addClass
removeClass


事件操作：
on
off


其他：
createAnchor
findRef
mapNodeRange
removeNodeRange


mergeOptions

resolveAssert


data
el

props
methods
computed

watch
event


init
create
ready
attached
detached
beforeCompile
compile
beforeDestroy
activate
destroted




# 响应式原理

1、通过Observer对data做监听，并提供了订阅某个数据项变化的能力，



2、把template编译成一段document fragment，
然后解析其中的Directive，得到每一个Directive所依赖的数据项和update方法


3、通过Watcher把上述两部分结合起来，即把Directive中的数据依赖
通过Watcher订阅在对应的Observer的Dep上。
当数据变化时，就会触发Observer的Dep上的notify方法通知对应的Watcher的update，
进而触发directive的update方法来更新DOM视图，最后达到模型和视图关联起来



MutationObserever



# 合并策略


1、混合对象和组件存在同名的生命周期方法时，他们会合并到一个数组中，
混合对象的声明周期方法优先执行，组件的同名声明周期方法后执行

2、混合对象的其他选项如methods中定了和组件同名的方法时，
组件会覆盖混合对象的同名方法




# 缓存

cache


put
shift
get

size
limit
head
tail
_keymap





LRU


least recently used






# props

_init
_initState
_initProps




# events




# Webpack

模块加载器，同时支持AMD、CMD等加载规范

1、代码分割
webpack支持两种依赖加载：同步和异步。
同步的依赖会在编译时直接打包输出到目的文件中；
异步的依赖会单独生成一个代码块，只有在浏览器中运行需要的时候才会异步加载该代码块


2、Loaders

在默认情况下，webpack只能处理JS文件，
但是通过加载器我们可以将其他类型的资源转换为JS输出

3、插件机制

webpack提供了强大的插件系统，当webpack内置的功能不能满足我们的构建需求时，
我们通过使用插件来提高工作效率



配置项

externals
target
cache
laoder 
devServer
plugins
context
entry
output
module 
resolve
resolveLoader




# vue-laoder


template标签--包裹HTML模板片段
script标签--配置Vue和载入其他组件或者依赖库
style标签--设置样式



# 自定义指令

bind  
只调用一次，在指令第一次绑定到元素上时调用

update  
在bind之后立即以初始值为参数第一次调用，
之后每当绑定值变化时调用，参数为新值域久值

unbind
只调用一次，在指令从元素上解绑时调用



    

# 计算属性 

