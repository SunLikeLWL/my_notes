# Angular企业级应用开发实践


# 第一篇 准备

### Angular优势

Angular是一个完整的框架，视图解决现代Web应用开发各个方面的问题

核心功能：

1、MVC模块
2、模块化
3、自动化双向数据绑定
4、语义化标签
5、服务
6、依赖注入

## Angular cli
是一个命令行界面工具，他可以创建项目、天剑文件及执行一大堆开发任务，比如测试、打包和发布Angular应用

安装angular/cli
npm install -g @angulr/cli

新建angular项目
npm new ngproject

启动项目
ng serve --open


## typescript

安装typescript

npm install -g typescript






# 第二篇 入门


## typescript优势

### 1、Typescript充分利用了Javascript原有的对象模型，并在此基础上进行了扩充，添加了较为严格的类型检查机制、模块支持和API导出的能力

### 2、Typescript使得代码组织和复用变得更加有序，使得开发大型web应用有了一套标准方法

### 3、Typescript具有静态类型检查、代码重构、测试和语言服务，有利于大型团队协作编写代码

## 变量和常量

var
let 
const 

## 数据类型

1、基本类型：
Null
Undefined
Number
String
Boolean
Symbol
Void

2、对象类型

类和接口
数组
元组
函数
构造函数


3、任意类型
any


4、联合类型

var x:string|number;


5、交集类型

interface A{
    a:number
}

interface B{
    b:number
}

var ab:A&B = {
    a:1;
    b:2
}


### 修饰符

public修饰符：外部可以自由访问该修饰符所标记的成员。成员默认是public类型的；

private修饰符：不能在声明他的类的外部访问

protected修饰符：不能在外部访问，但是能在派生类中使用



  ### 静态属性

  ### 抽象类

  ### 接口
   
   接口就是契约，用于约定代码或者三方代码是如何被执行调用的。接口也可以通过继承来实现扩展


   1、接口定义
   interface Person{

   }


   2、接口实现

   class Student interface Person(){

   }

   3、接口继承

   interface OPerson extends Person{

   }


   4、泛型



   ### 装饰器
     1、提供了一种在类的声明及成员上通过元编程语法添加标注的方式
     2、装饰器是一种特殊类型的声明，他能够被附加到类声明、方法、访问符、属性或参数上
     3、"@表达式"这种形式的，其中表达式求值后必须是一个函数。他会在运行时被调用，被装饰的声明信息作为参数传入


     定义：
     funcion sealed(constructor:Function){
          Object.seal(constructor);
          Object.seal(constructor.prototype);
     }

     使用：
     @sealed
     class Greeter{

     }


     ### 装饰器类型

     1、参数
     2、方法
     3、访问符
     4、属性符
     5、类














