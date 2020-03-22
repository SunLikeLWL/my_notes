JQuery源码解读



JQ的一些扩展工具方法（ 妙味讲堂 - 视频笔记 - 第三部分）


//工具方法： 方便底层实现调用


// 一、
// 源码实现：
expando: "jQery" + (core_version + Math.random()).replace(/\D/g, ""); //生成唯一JQ字符串（内部）



var $ = 123;


// 二、
// 源码实现：
noConflict: function(deep) {
    if (window.$ === jQuery) {
        window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery;
    }
    return jQuery;
}


var aaa = $.noConflict(true);


aaa(function() {
    alert(jQuery) // 123
})



// 三、
//DOM加载完就执行

// 1、
$(function() {})


    =>

    // 2、
    $(document).ready(function() {

    })

    =>

    // 3、
    $().ready();

ready: function() {

    }
    //监听 DOMContentLoaded 事件 

    =>


    // 4、
    jQuery.ready.promise().done(fun)


    =>

    // 5、
    $.ready();
if (document.readyState === "complete") {

} else {
    // complete
}



// 6
readyList.resolveWidth(document, [jQuery])



    // 7、
    => fn






// 文件加载完,包括图片等媒体文件记载完
window.onload = function() {


}


// 四、
$.holdReady(true) //推迟执行，ready() 不能执行


$(function() {
    alert()
})

$.holdReady(false) //推迟释放，ready() 可以执行



$.holdReady(true)
$.getScript('a.js', function() { //异步，想要异步执行完再执行ready
    $.holdReady(false)
})


$(function() {
    console.log(2)
})


// 五、

function aaa() {

}

var bbb = "123"

console.log($.isFunction(aaa)) // true

console.log($.isFunction(bbb)) // false


// 源码实现：
isFunction: function() {
    return jQuery.type(obj) === "function";

}



// 源码实现：

isWindow: function(obj) {
    return obj != null && obj === obj.window
}

// 源码实现：
isNumeric: functiono(num) {
    return !isNaN(parseFloat(obj) && isFinite(obj))
    // parseFloat 装换笔面试NaN  isFinite 判断是否是有限数字
}




typeOf(); //只能判断基本类型

// 源码实现：
type: function(obj) {
    if (obj == null) {
        return String(obj);
    }
    return typeof obj === "object" || typeof obj === 'function' ?
        class2type[core_toString.call(obj)] ||
        "object" : typeof obj
}
　　