# HTTP 权威指南


# 第一章 HTTP概述


### 1.1、媒体类型
  Web传输的对象都有MIME类型

  解决不同的电子邮件系统之间搬移报文时存在问题


  HTML->text/html

  普通ASCII文档 -> text/plain

  JPEG -> image/jpeg

  GIF -> image/gif

  Apple的quick time电影为 video/quicktime

  微软的PowerPoint -> applcation/vnd.ms-powerpoint


  ### 2、URI

  统一资源标识符
  
  在世界范围内唯一标识并定位信息资源。


### 3、URL

统一资源定位符

描述了一台特定服务器上某资源的特定位置。


### 4、URN

统一资源名

作为特定内容的唯一名称使用，与目前资源所在地无关


### 1.2、事务



###  1.3、方法

get 从服务器向客户端发送命令资源

put 将来自客户端的数据存储到一个命名的服务器资源中去

delete 从服务器删除命名资源

post 将客户端数发送到一个服务器网管相应程序

head 仅发送命令资源相应中的HTTP首部


### 1.4、状态码

每条HTTP相应报文返回时都会携带一个状态码

200 OK 文档正确返回

302 Redirect 重定向  到其他地方获取资源

404 Not Found 没找到 无法找到这个资源


### 1.5、报文



### 1.6连接

  TCP 传输控制协议

  HTTP是应用层协议

  HTTP无需操心网络通信的具体细节；
  他把联网的细节交给了通用、可靠的因特网传输协议TCP/IP

  TCP 提供了
  1、无差错的数据传输
  2、按顺序传输
  未分段的数据流



### DNS
Domain Name Service

域名服务


 1、浏览器从URL中解析出服务器的主机名

 2、浏览器将服务器的主机名转换成服务器的IP地址

 3、浏览器将端口号从url中解析出来

 4、浏览器建立一条与web服务器的TCP连接

 5、浏览器向服务器发动一条HTTP请求报文

 6、服务器向浏览器发送一条HTTP相应报文

 7、关闭连接，浏览器显示文档


### 1.7 协议

HTTP 1.0

第一个得到广泛使用的版本
  
  添加了版本号、各种请求首部、一些额外的方法、以及对多媒体对象的处理、



### 1.8 web的结构组件

  代理
  位于客户端和服务端之间的HTTP中间实体
  接收所有客户端的HTTP请求，并将这些请求转发给服务器

  缓存
  HTTP的仓库，使常用页面的副本可以保存在离客户端更近的地方
  web缓存Web cache   代理缓存proxy cache

  网关
  连接其他应用应用程序的特殊web服务器

  隧道
  对HTTP通信报文进行忙转发的特殊代理

  Agent代理
  发起自动HTTP请求的半智能web客户端

# 第二章 URL与资源

URL：
方案+服务器位置+资源路径

方案：http://
HTTP、FTP、SMTP

服务器位置：taobao.com

资源路径：index.html



# 第三章 HTTP报文


### 3.1 流报文
HTTP报文就是在HTTP应用程序之间发送的数据块

这些数据块与一些文本形式的原信息开头
这些信息描述了报文的内容及含义
后面跟着可选的数据部分

HTTP报文是简单的格式化数据块

### 3.2 报文组成部分

 1、起始部分
 对报文进行描述
  
 2、首部块
 包含属性

 3、主体部分
 包含数据


 ### 状态码分类

 范围        已定范围    分类
 100-199     100-101    信息提示
 200-299     200-206    成功
 300-399     300-305    重定向
 400-499     400-415    客户端错误
 500-599     500-505    服务端错误

### 状态码

100 （Continue）说明收到了请求的初始部分，请客户端继续

101 （Switching Protocols）说明服务端正在根据客户端的指定，将协议切换成Update所列的协议

====================

200 （OK）请求没问题，实体的主体部分包含了所请求的资源

201 （Created）用于创建服务器对象的请求

202 （Accepted）请求已被接受，但服务器还未对其执行任何动作

203 （Non-Authoritative Infomation）实体首部包含的信息不是来自资源服务器，而是来自资源服务器的一个副本

204 （No Content）响应报文中包含若干首部和一个状态行，但没有实体的主题部分

205 （Reset Content）另一个主要用于浏览器的代码

206 （Partial Content）成功执行了一个部分或Range请求

====================

300 （Multiple Choices）客户端请求一个实际指向多个资源的URL时返回这个状态码

301 （Moved Permanetly）在请求的URL已被移除时使用

302 （Found）在请求的URL已被移除时使用，但是顾客端应该使用Location首部给出的URL来临时定位资源

303 （See Other）告知顾客端应该使用另一个URL来获取资源

304 （Not Modified）顾客端可以通过所包含的请求首部，使其请求编程有条件的。

305 （Use Proxy）用来说明必须通过一个代理来访问资源：代理的位置由Location给出

306 （未使用） 当前未使用

307 （Temporary Reditrect） 在请求的URL已被移除时使用；但客户端应该使用Location首部给出的URL来临时定位资源

====================

400 （Bad Request） 用于告知客户端他发送了一个错误的请求

401 （Unauthorized）权限认证出错

402 （Payment Required） 保留状态码

403 （Forbidden） 服务器拒绝请求

404 （Not Found） 用于说明服务器无法找到锁清秋的URL

====================

500 （Internal Server Error） 服务器错误

501 （Not Implemented） 使用了服务器不支持的请求方法

502 （Bad Gateway） 无法连接到其父网关

503 （Service Unavailable） 服务器无法为其提供服务

504（Gateway Timeout） 相应超时了

505 （HTTP Service Not Supported） 协议版本不支持



### 3.5 首部

1、通用首部

Date
Connection
通用缓存首部     Cache-Control  Pragma


2、请求首部

Accept：
Accept
Accept-Charset
Accept-Encoding
Accept-Language
TE


From
Host
Referer
Usr-Agent




3、响应首部

Server

4、实体首部

用来描述HTTP报文的负荷

Allow
Location


Content-type：


5、扩展首部







# 第四章  连接管理

## TCP连接


HTTP       应用层
TCP        传输层
IP         网络层
网络接口    数据链路层 




      

 

























