JQuery源码解读



JQ的继承方法 （妙味讲堂 - 视频笔记 - 第二部分）    




jQury().fn = $().fn = function() {

    return jQuery.fn.init()
}




$("div").get() //返回集合
$("div").get(index) // 返回下标项，原生对象


get: function(num) {
    return num == null ?
        this.toArray() :
        (num < 0 ? this[this.length + num] : this[num])
}




$("div").pushStack($("span")) // div，span对象都在栈内   返回的是 span对象


pushStack:function(elems){
  var ret = jQuery.merge(this.constructor(),elems);  //合并元素
  ret.prevObject = this;   
  ret.context = this.context  //合并之后执行上下文是后者
  return ret;
}



end:function(){
  return this.prevObject||this.constructor(null)
}



slice:functon(){
  return this.pushStack(core_slice.apply(this,arguments))
}


eq:function(i){
  var len = this.length,
  j = +i+(i<0?len:0);
  return this.pushStack(j>=0&&j<len?[this[j]]:[])
}



$.extend()

$.fn.extend()


// 当只写一个对象自变量的时候，jQ中扩展对象插件的形式
// 


$.extend({  //扩展工具方法
  aaa:function(){
     alert(1)
  },
  bbb: function(){
    alert(2)
  }
})

$.fn.extend({  //扩展jQ实例方法
  aaa:function(){
     alert(3)
  },
  bbb: function(){
    alert(3)
  }
})


$.aaa()

$.bbb()


$().aaa()

$().bbb()



$.extend()   this  =  $



$.fn.extend()   this = $.fn




// 当写多个对象的时候，后面的对象都是扩展到第一个对象身上
// 
// 
var a = {}


$.extend(a,{name:"hello"},{age: 30})


a= {name:"hello",age: 30}



// 还可以深拷贝，浅拷贝
// 
var a =  {}

var b = {name:"hello"} 

$.extend(a,b)  //浅拷贝，对象引用


a.name.age = 20


$.extend(true,a,b)  //深拷贝，对象复制，独立的两个对象




jQ中： 拷贝继承  构造函数的原型


JS ：类继承/原型继承


new  构造函数   / {}
　　