# react&redux前端开发实践


## MVC
Model
View
Comtroller

MVC不是框架，不是设计模式，也不是软件架构，而是一个架构模式。

1、框架：是一个系统的可重用设计的，表现为一组抽象的可交互方法。

2、设计模式：是一套反复被使用的、多数人知晓的、经过分类的代码设计经验总结。工厂模式、适配器模式、策略模式

3、软件架构：是一系列的抽象模式，用于指导软件系统各个方面的设计

4、架构模式：也可以说成框架模式，一个架构模式描述软件系统里基本的结构组织或刚要。





### Redux
是一个“可预测的转台容器”，而实质也是Flux里面“单向数据流”的思想，但他充分利用函数式的特征，让整个 实现更加优雅纯粹，使用起来也更简单


1、单一数据来源

2、state是只读的

3、使用纯函数进行修改


### 纯函数：
一个函数的返回结果只依赖它的参数，相同的输入，永远会得到相同输出，而且没有任何可观察
### 纯函数定义：
1、可缓存(Cacheable)，总能根据输入来做缓存；
2、可移植性/自文档化，完全自给自足的好处是纯函数的依赖是明确的，因此更加易于观察和理解；
3、可测试性，纯函数在测试时只需要简单地的输入一个输入值，然后断言输出即可；
4、引用透明，如果一个表达式在程序中可以被它等价的值替换而不影响结果，那么就说这段代码是引用透明的。纯函数总能根据相同的输入返回相同的输出，所以能保证总是返回一个结果。
5、并行代码，可以并行运行认识纯函数。因为纯函数根本不需要访问共享的内存，而且根据其定义，纯函数也不会因副作用而进入竞争态；



 

 ### middleware中间件

 Redux中间件在发起一个Action，Action到达Reducer的之间，提供了一个第三方拓展。就是说，middleeware是架在Action和Store之间的一座桥梁。


 middleware本质上就是通过插件的形式，将原本Action->Reducer的流程改为Action->middleware1->middleware2->middleware3...->Reducers。这正是Redux中间件middleware最优秀的特性，可以被链式组合和自由插拔。



 ## React的性能及性能优化

 ### diff算法
    
     diff算法就是给定任意的两棵树从中找到最少的转换步骤，或者说是从上一个渲染到下一个渲染的最少步骤。


    #### 时间复杂度：
      一个算法运行消耗的时间。
    #### 控件复杂度
      运行完成一个程序所需要内存的大小。

    
    