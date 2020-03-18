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


3、属性重命名
let o = {
    x:1,
    y:2,
    z:3
}





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



interface Car{
    brand?:string,
    name:string
}

function createCar(car:Car):{brand:string;name:string}{
    let newCar = {brand:'BMW',name:'宝马'};
    if(car.brand){
        newCar.brand = car.brand;
    }
    if(car.name){
        newCar.name = car.name;
    }
    return newCar;
}


let myCar = createCar({name:"宝马"})


带可选属性的好处
1、是可以对存在的属性进行预定义；
2、可以捕获引用了不存在的属性是的错误



## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值


interface Point{
    readonly x: number;
    readonly y: number;
}


let p1:Point = {
    x:1,y:2
}

p1.x = 3;//error



readonly vs const

最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。
 做为变量使用的话用 const，若做为属性则使用readonly。



## 额外的属性检查

对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
// error: 'colour' not expected in type 'SquareConfig'




// 可以带有任意数量的属性：
interface SquareConfig {
    [propName: string]: any;
}



## 函数类型

 接口能够描述javascript中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接口也可以描述函数类型。

 为了使接口表示函数类型，我们需要给接口定义一个调用签名。他就像一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型



 interface SearchFunc {
  (source: string, subString: string): boolean;
}


let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
   
}

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配




## 可索引的类型

与使用接口描述的类型差不多，我们也可以描述那些“通过索引得到”的类型

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


## 类类型

1、实现接口
TypeScript也能够用它来明确的强制一个类去符合某种契约。


interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}



2、类静态部分与实例部分的区别







## 继承接口

和类一样，接口也是可以相互继承。


// 单接口继承
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// 多接口继承



interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}


## 混合类型

一个对象可以同时做为函数和对象使用，并带有额外的属性。

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}




## 接口类继承

当接口继承一个类类型，他会继承类的成员但不包括其实现。


class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {

}





# 类

## 介绍

传统的javascript程序使用函数和基于函数的继承来创建可重用的组件，
但对于熟悉使用面向对象的程序员来讲有些棘手，因为他们用的是基于类
的继承并且对象是由类构件出来的。


## 类

class Person{
   name:string;
   age:number;
   constructor(name:string,age:number){
       this.name = name;
       this.age = age;
   }
   introduce(){
       console.log("Hello, My Name is "+this.name+" , I am "+this.age +" years old");
   }
}
let per = new Person("Tom",24);//Hello My Name is Tom,I am 24 years old;



## 继承

基于类的程序设计中一种最基础的模式是允许使用继承来扩展现有的类。

// 基类
class Animal = {
    go(){
       console.log("Animal go!");
    }
}

// 派生类、子类、超类
class Dog extends Animal{
     bark(){
        console.log("Dog bark")
     }  
}
const dog = new dog();
dog.go();
dog.bark();


##  public、private、protected
   
   ### 1、public
   Typescript里，成员默认是public，在当前类、子类、类的外部都可以使用
   
   ### 2、private
   不能在声明他的类的外部被访问

   ### 3、protected
   不能在声明他的类的外部被访问、但是可以在派生类中可以被访问



## readonly修饰符

 可以使用 readonly关键字将属性设置为只读的；
 只读属性必须在声明时或构造函数里被初始化。




## 存储器

TypeScript支持通过getters/setters来截取对对象成员的访问。
有效的控制对对象成员的访问。


 
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        this._fullName = newName;
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
 






