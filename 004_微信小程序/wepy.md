# Wepy 微信小程序组件化开发框架
 
 
2019年11月15日15:19:17



## 快速入门


<!-- 安装工具 -->
npm install -g wepy-cli


 
<!-- 初始化项目 -->
wepy new demo

<!-- 进入项目项目文件夹 -->

cd demo 

<!-- 安装依赖 -->
npm install



<!-- 开启实时编译 -->
wepy build --watch




<!-- 原生微信小程序 -->
var app = getApp();


Page({
    data:{
        motto:"Hello World",
        userInfo:""
    },
    bindViewTap:function(){

    },
    onLoad:function(){

    }
})



<!-- wepy -->

import wepy from wepy;

export default class Index extends wepy.page{
    data = {
        motto:"Hello World",
        userInfo:""
    };
    methods = {
        bindViewTap(){
            console.log("e32")
        }
    };
    onLoad(){
      console.log("onload")
    };
}



<!-- 声明页面中将要用到的组件 -->
components = {

}


<!-- 可用于页面模板中绑定的数据 -->

data =  {

}



### 组件间通信

$broadcast 
由父组件发起，所有子组件都会收到此广播事件，除非事件被手动取消。
事件的顺序为广度优先遍历


$emit
由子组件发起，事件发起的组件的所有祖宗组件会一次接收到$emit事件。




$invoke
是一个页面或者组件对另一个组件中的方法的直接调用，通过传入组件路径找到
相应的组件，然后再调用其他方法




### 组件自定义事件处理函数


可以通过.user修饰符为自定义组件绑定事件，如： @customEvent.user = 'myFun';


其中，@表示事件修饰符，customEvent表示事件名称，.user表示事件后缀


 目前总共有三种事件后缀

 .default：绑定小程序冒泡事件，比如bindtap，default后缀可以省略不写

 .stop 绑定小程序捕获事件，如catchtap

 .user：绑定用户自定义组件事件，通过$emit触发。
 注意，如果用了自定义事件，则events对应的监听函数不会再执行。



 