var s = "今天是什么鬼天气，这么热，明天要去游泳！";
 var arr = new Array();

 var s1 = s; 

 for (var i = 0; i < 1;) {

 if (s1.indexOf("天") != -1) {

 arr.push(i);

 s1.replace("天", "");

 } 

 else {

 break;

 } 

 } 

 console.log(arr);