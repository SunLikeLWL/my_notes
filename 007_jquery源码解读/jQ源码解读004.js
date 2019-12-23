JQuery源码解读



JQ的一些扩展工具方法（ 妙味讲堂 - 视频笔记 - 第四部分）


parseJSON()

JSON.parse()   // 解析字符串类型的JSON


eval()  //解析任何格式JSON，性能差




parseXML() // 字符串转DOM对象

// 源码实现
parseXML:function(data){
    var xml,tmp;
    if(!data||typeof data!=="string"){
    	return null;//只能解析字符串类型
    }
    try{
    	tmp = new DOMParser(); //IE9+
    	xml = tmp.parseFromString(data,"text/xml");
    }
    catch(e){
    	xml = null;
    }
    if(!xml || xml.getElementsBysTagName("parsererror").length){
        jQuery.error("Invalid XML:"+data);
    }
  return xml;
}




globalEval()


function test(){
	var newVar = true
}

test(); 
console.log(newVar)  // 报错





function test1(){
	globalEval("var newVar = true");
}

console.log(newVar) //true



// 解析全局变量
globalEval:function(code){
     var script,;indirect = eval;
     code = jQuery.trim(code)

     if(code){
     	  if(code.indexOf("use strict ")==1){
     	  	script = document.createElement("script");
     	  	script.text = code;
     	  	document.head.appendChild(script).parentNode.removeChild(script);
     	  }
     	  else{
     	  	indirecct(code);
     	  }
     }
}


camelCase() //转驼峰


nodeName();// 是否制定节点名

   function nodeName(elem,name){
      return elem.nodeName&&elem.nodeName.toLowerCase() === name.toLowerCase();
  }
  console.log(nodeName(document.html,'html'))











