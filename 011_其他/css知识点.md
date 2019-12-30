# 1、 CSS 知识点

##  1、单行文本溢出省略号

<!-- 单行 -->
.one_line{
    overflow: hidden;
    text-verflow: ellipse;
    whiht-space: no-wrap;
}


<!-- 多行 -->
.muti_line{
    display: webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}


# 2、css加载会造成阻塞吗


使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

 



css加载不会阻塞DOM树的解析
css加载会阻塞DOM树的渲染
css加载会阻塞后面js语句的执行、


HTML解析文件，生成DOM Tree，解析CSS文件生成CSSOM Tree
将Dom Tree和CSSOM Tree结合，生成Render Tree(渲染树)
根据Render Tree渲染绘制，将像素渲染到屏幕上。


DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。
然而，由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。



如果页面中同时存在css和js，并且存在js在css后面，则DOMContentLoaded事件会在css加载完后才执行。
其他情况下，DOMContentLoaded都不会等待css加载，并且DOMContentLoaded事件也不会等待图片、视频等其他资源加载。

 
 


