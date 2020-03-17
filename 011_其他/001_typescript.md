# typescript 官方文档

https://www.tslang.cn/docs/handbook/variable-declarations.html




# 基础类型


1、typescript为了使编码更加规范，更有利于维护，增加了类型校验
写ts代码必须指定类型



## 基本类型

1、布尔值boolean

let isDone: boolean = false;


2、数字numbber
不仅支持十进制和十六进制还支持二进制和八进制

let n10 : number = 1; 
let n16 : number = 0x001;
let n2 : number = 0b001;
let n8 : number = 0o001;


3、字符串string

let str:stirng = 'sunlike';

4、数组Array []

let list:number[] = [3,23,323,43];//只能是number类型的
也可以这么用
let list:Array<number> = [4,23,4324,,2434,];


5、元组Tuple  
表示一个一直元素数量和类型的数组

let x : [string,num]  = ['12121',4343];


6、枚举

enum status {
    continue = 100,
    ok=200,
    bad = 400,
    error= 500
}

status.ok;// 200



7、Any
 编译阶段不检查其数据类型

 let anyType:any = '123';//初始化为一个字符串
 anyType =124;// 赋值为一个数值
 


8、Void
与any刚好相反，没有任何类型

//主要用来表示函数没有返回值

function say():void{
    alert("My Name Is Sun");
}


//对变量没啥用，只能给Null和undefined类型赋值

let unknow::void  = undefined;



9、Null和Undefined

// 两者的类型分别是Null和Undefined

// 默认情况下Null和Undefined是所有类型的子类型




10、Never

// 表示用不存在的值的类型
// 例如，never类型是那些总是会抛出异常的或者根本就不会有返回值的函数表达式或者箭头函数的返回值类型
// 没有任何类型是never的子类型


// 返回never的函数必须存在无法达到的终点
function error(msg:string):never{
    throw new Error(msg);
}

// 推断的返回值类型为never
function fail(){
    return error('....')
}

// 返回never的函数必须存在无法达到的终点
function infinite():never{
    while(1){

    }
}


11、Object

// 非原始类型




## 类型断言

// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构

var s:any = '432432';

let sl:number = (<string>s).length;
















# 变量声明

## 变量声明

### var
1、声明的变量作用域只有全局作用域、函数作用域和eval函数作用域
2、存在变量定义提升，但是不存在赋值提升，所以有

console.log(a);// undefined
var a = 12;
console.log(a);//12

### let

1、let声明变量存在块级作用域： for、if、try/catch等代码块（作用域）内部的变量在外面没法访问
2、不存在变量提升，提前使用变量会造成暂时性死区 

 s = 12;//illegal to use 's' before it is declared;
 let s;

 3、不能重复定义变量
 
 s = 12; // 任何形式定义已存在
 let s = 21; // error: interferes with parameter declaration

 let s = 12;
 var s = 21;//error: can't have both declarations of 'x'

### const
1、赋值后不能重新赋值（值类型放心使用，引用类型的要注意防止出错）



## 解构

### 1、解构数组

1、普通赋值
let [x,y] = [1,2];

2、交换变量值
[x,y] = [y,x]

3、参数赋值

function f([x,y]:[number,number]){
}
f([1,2])


4、剩余变量操作符...rest

let [x,y,...rest] = [4324,23,423,43,432,432,2];

### 2、对象解构

1、普通赋值
let a = {x:12,y:34:z:56};
let {x,y} = a;

x;//12
y;//34


 2、剩余变量
let a = {x:12,y:34:z:56};

let {x,...rest} = a;

rest;//{y:34,z:56};


3、属性命名



4、默认值

let {x,y = 12} = a;


### 3、匿名函数

type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}


### 4、展开

let x = [1,2];
let y = [3,4];

var z=  [...x,..y,5];

























# 接口

## 介绍
Typescript的核心原则是对值所具有的机构进行累心检查。

接口的作用就是为了这些类型命名和为你的代码或第三方代码定义契约




## 接口初探


// 类型检测不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。
interface  Person{
    name:string,
    age:number,
}


function addPeople(person:Person){

}



## 可选属性

接口的属性不全都是必须的。有些只是在某些条件下存在，或者根本不存在。
可选属性在应用“options bags”模式是很常用，即给函数传入的参数对象
中只有部分属性赋值了。


