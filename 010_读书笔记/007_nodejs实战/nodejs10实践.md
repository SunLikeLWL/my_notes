#  Nodejs.js 实践

##  Nodejs结构
   
   1、Node.js标准库：
        这部分是由Javascript编写的，即我们使用过程中能直接调用的API。
   

   2、Node binding：
        这一层是Javascript与底层C/C++能够沟通的的关键，前者通过binding调用后者，相互交换数据。
    
   3、支撑Node.js运行的基础构件


   4、V8:
    
   5、libuv

   6、C-ares

   7、http_parser、OpenSSL、zlib


   ## 特点

   1、事件驱动：
   Node.js的设计思想以事件驱动为核心，他提供的绝大多数API都是基于事件的、异步的风格

   2、异步、非阻塞I/O

   3、性能出众
   Node.js设计上以单进程，单线程模式运行
   事件驱动是Node.js通过内部单线程高效率地维护事件循环队列来实现的，没有多线程的资源占用和上下文切换
   
   4、单线程

 
 
  ## javascript =  ECMAScript+DOM(文档对象模型)+BOM(浏览器对象模型)


  REPL： 交互式运行环境




### fs模块中的类很文件的基本信息

1、stats.isFile   标准文件返回true

2、statss.isDirectory 路径返回true

3、stats.isBlockDevice 块设备

4、stats.isCharacterDevice  字符设备

5、stats.isFIFO 命令管道

6、stats.isSocket unix套接字




### PM2 
  PM2是node进程管理工具，可以利用他来简化很多node应用管理的繁琐任务，比如性能监控、自动重启负载均衡等，
  而且非常简单