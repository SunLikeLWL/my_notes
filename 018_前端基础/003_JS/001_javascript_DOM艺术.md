# javascript_DOM艺术



# 第一章 Javascrpt简史

javascript是一种脚本语言，通常只能通过Web浏览器去完成一些操作而不能像普通意义上的程序那样独立运行。


DOM是一套对文档的内容进行抽象和概念化的方法。


DHTML（Dynanic HTML，动态HTML）

DHTML不是新技术，而是描述HTML、CSS和Javascript技术组合的术语。

1、利用HTML把网页标记为各种元素；
2、利用CSS设置元素样式和他们的显示位置；
3、利用javascript实时地操控页面和改变样式。


# 第二章 Javascript语法


程序设计语言分为解析型和编译型两大类

解析型

编译型


## 语法

语言结构方面的各项规则

## 语句

有一系列指令构成

是构成任何一个脚本的基本单位


## 注释

在脚本中写一些仅供自己参考或提醒自己的信息

解析器直接忽略掉这些信息


## 变量

 会发生变化的东西


 赋值：
 把值存入变量的操作

 声明：


 ## 数据类型

 ### 1、类型声明：
 有些其他的语言要求在声明变量的同时还必须声明数据类型

 ### 2、强类型：
 声明变量的同时要声明变量的类型

 ### 3、弱类型：
 声明变量的同时不需要声明变量类型

 ### 4、类型

  字符串

  数值

  布尔值

  数组

  对象

   1、宿主对象：
   由浏览器提供的预定义对象
   Form
   Image
   Element

   2、内建对象：
      一系列预先定义好的对象，这些可以拿来就用的对象
       Array
       Math

   3、用户自定义对象
   




## 第三章 DOM

   
   getElementById()

   getElementsByTagName()

   getElementsByClassName()

   getAttribute()

   setAttribute()





## 第四章 案例研究：Javasript图片库



### 1、childNodes属性

element.childNodes

包含这个元素的全部子元素数组



### 2、nodeType属性


node.typeType

元素节点的nodeType 属性值是1

属性节点的nodeType 属性值是2

文本节点的nodeType 属性值是3


### 3、nodeValue 属性

   文本的文本或者第一个子节点的文本



### 4、firstChild lastChild


## 第五章 最佳实践

  平稳退化

  分离Javasript

  向后兼容性

  性能考虑




  ## 第六章 案例研究：图片库改进版


  ### 1、把事件处理函数移除文档


  ### 2、向后兼容

  ### 3、确保访问



  ### 键盘访问

    onclick
    onkeypress




## 第七章 动态标记创建标记

1、传统创建元素的方式
document.write()
innerHTML

2、createElement

3、createTextNode

4、appendChild

5、insertBefore

6、insertAfter


### Ajax

### XMLHttpRequest


readyState

0 未初始化
1 表示正在加载
2 表示加载完毕
3 表示正在交互
4 表示完成
 



# 第八章 充实文档的内容



# 第九章 CSS-DOM


# 第十章 用Javascript实现动画效果



 







































 

































