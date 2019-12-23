JQuery源码解读



JQ的data（ 妙味讲堂 - 视频笔记 - 第六部分）


1、
$("div").attr("name", "hello");
console.log($("div").attr("name")); //hello
=>

document.getElementsById("div").setAttribute("name","hello");
document.getElementsById("div").getAttribute("name");





2、
$("div").prop("name", "hello");

console.log($("div").prop("name")); //hello

document.getElementsById("div")["name"] = "hello"
document.getElementsById("div").getAttribute("name");





3、数据缓存
$("div").data("name", "hello");

console.log($("div").data("name")); //hello



function Data(){
	// 防止变量属性值被修改。
	Object.defineProperty(this.cache={},0,{
		get: function(){
			return {};
		}
	})
	this.expando = jQuery.expando+Math.random();
	// 生成的值几乎唯一
	// 
}


