# typescript 官方文档

https://www.tslang.cn/docs/handbook/variable-declarations.html




# 一、基础类型


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
















# 二、变量声明

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

























# 三、接口

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





# 四、类

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
 


## 静态属性
static
仅当在被实例化的时候才会被初始化的属性


class Dog(){
    static type='purou';
}


## 抽象类

abstract 用于定义抽象类和在抽象类中定义抽象方法
抽象类作为其他派生类的的基础类使用，一般不会被实例化。
不同于接口，抽象类可以包含成员的实现细节

abstract class Animal{
     abstract bark(): void;
      run():void{
          console.log("run);
      }
}



抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
抽象方法与接口方法类似，两者都是定义方法签名单不包含方法本体

class dog extends Animal{
    constructor(){
        super();// 必须在派生类的构造函数中调用super()
    }
    speak(){
        console.log("speak");
    }
    fly():void{
        console.log("fly");
    }
    bark():void{
        console.log("bark");
    }
}


let animal:Animal; // 允许创建一个抽象类型的引用

animal = new Amimal();// 错误，不能创建一个抽象类的实例

animal = new Dog();// 允许对一个抽象子类进行实例化

animal.bark();//

animal.run();//run

animal.fly();// 错误，方法在声明的抽象类中不存在


## 高级技巧

### 1、构造函数

当你在Typescript里，声明一个类的时候，实际上同时声明了很多东西，
a、首先是类的实例类型

class Box{
    
}

let box: Box; // Box就是box的类型

b、其次创建了一个构造函数值


### 2、把类当接口来用

类定义创建了两个东西：类的实例和一个构造函数

因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

class P2{
    x:number;
    y:number;
}
interface Triangle extends P3{
      z:number;
}

let p3 = new P3(1,2,3);
















# 五、函数

## 1、介绍
函数是Javascript应用程序的基础。

## 2、 函数
和Javascript一样，Typescript可以创建有名函数和匿名函数。
// 函数声明式（具名函数）
function add(x,y){ 
   return x+y;
}// 函数表达式(匿名函数)
let add = function(x,y){return x+y;}

## 3、函数类型

### 1、为函数定义类型
// number 类型
function add(x:number,y:number):number{  
   return x+y;
}
add(1,2);// 3

### 2、书写完整函数类型
// 对比函数
let add:number = function(x:number,y:number):number{
    return x+y;
}
函数类型包括两部分：参数类型和返回值类型。
完整函数类型两者都是需要的。
// 完整函数类型
let add:(baseValue:number,increment:number) = function(x:number,y:number):number{   
 return x+y;
}

### 3、推断函数类型

如果你在赋值语句的一边指定了类型但是另一边没有类型的话，
TypeScript编译器会自动识别出类型。
let add:number = function(x:number,y:number):number{  
  return x+y;
}
let add:(baseValue:number,increment:number) = function(x:number,y:number):number{    
return x+y;
}


## 4、可选参数和默认参数
Typescript里的每一个参数都是必须的。传递的参数和期望的参数个数必须一致
// 正常情况
function add(a:number,b:number,c:number):number{ 
   return a+b+c;
}
add(1,2);// 错误，参数少了
add(12,312,3,211);// 错误，参数多了
add(1,2,3);// 6// 可选参数,参数c可选填
function add(a:number,b:number,c?:number):number{  
  if(!c){    
  return a+b;
    } 
   return a+b+c;
}// 默认参数
function add(a:number,b:number=3):number{ 
   return a+b;
}
add(1);//4
add(1,2);//3
add(1,undefined);//4


## 5、剩余参数
非必要参数，默认参数和可选参数都表示某个参数
剩余参数表示传过来的未知个数的参数
function add(...rest:number):number{ 
   var s = 0; 
   rest.map(function(item){    
    s+=item;  
  })  
  return s;
}
add(1,2,3);// 
6add(1);//1


## 6、this
1、this和箭头函数

在javascript中，this的值在函数被调用的时候才会指定。
let person = {  
    name:"wudikeji",   
   age: 32,   
   say:function(){  
        return function(){   
           console.log(this.name+","+this.age);    
          console.log(this)    
      }   
   }
  } 
 let say = person.say(); 
 say();   // undefined   // window
 我们在全局作用域下调用了person的方法say()，此时this已经指向了window（严格模式下是undefined）
2、this参数
let person = {   
   name:"wudikeji",   
   age: 32,  
    say:function(){   
       let _this = this; 
         return function(_this){  
            console.log(_this.name+","+_this.age);    
          console.log(_this)      
    }   
   } 
 } 
 let say = person.say();  
say(person); 
 // wudikeji,32 
 // {name: "wudikeji", age: 32, say: ƒ}



# 六、泛型



## 1、介绍
把类型明确的工作推迟到创建对象的或者调用方法的时候才去明确的特殊类型。


## 2、初识泛型

// 只能传入数值类型
function print(arg:num):number{
   return arg;
}
// 可以传入任意类型

function print(arg:any):any{
    return arg;
}

// 使用any规定参数类型，但是不能确定函数返回值类型

T:类型变量，可以实现返回值类型与传入参数类型保持一致

function print<T>(arg:T):T{
    return arg;
}


使用方法：

1、传入所有参数，包含类型参数

let res = print<string>("str");// 输出的类型一定是string

2、利用类推论--即时编译会根据传入参数自动确定T参数类型

let res = print("str");// 输入参数类型一定是string



## 3、使用泛型变量

使用泛型创建泛型函数时，编译器要求在函数体必须正确使用这个通用类型。
必须把这个参数当做是任意或者所有类型。

### 1、注意使用T类型变量是存在的错误

function print<T>(arg:T):T{
    console.log(arg.length)// 报错，arg是任意类型，当arg是number类型时不存在length属性
}

### 2、可以这样使用避免报错

function print<T>(arg:T[]):T[]{
    console.log(arg.length)// 这是任意类型的数组，存在length属性
}

或者写成这样

function print<T>(arg:Array<T>):Array<T>{
    console.log(arg.length)// 这是任意类型的数组，存在length属性
}


## 4、泛型类型

 
1、泛型函数：有一个类型参数在最前面

function print<T>(arg:T):T{
    return arg;
}

2、可以使用不同的类型参数名，只要在数量上和使用方法上能对应的上就可以。

function print<U>(arg:U):U{
    return arg;
}

3、可以使用带有调用签名的对象字面量来定义泛型函数

let myIdentity: {<T>(arg: T): T} = identity;



## 5、泛型类

  泛型类使用（ <>）括起泛型类型，跟在类名后面。


class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();


## 6、泛型约束

function print<T>(arg:T):T{
    console.log(arg.length)// 报错，arg是任意类型，当arg是number类型时不存在length属性
}


function print<T>(arg:T[]):T[]{
    console.log(arg.length)// 这是任意类型的数组，存在length属性
}




# 七、枚举

## 1、介绍

 
   枚举是在一定范围内取值,并且这个值必须是枚举类型中的任意一个,并且只能有一个。

   使用枚举可以定义一个带名字变量
   使用枚举可以清晰地表达意图或创建一组有区别的用例
   Typescript支持数字和基于字符串的枚举



## 2、枚举

  ### 1、数字枚举

  enum http =  {
   Continue = 100,
   Switching =  101,
   Processing = 102,
  }
  enum  button ={
      open = 1,
      close = 0
  }
  // 要注意每个枚举成员的值都是不同的。


  数字枚举可以混入到计算过的和常量成员
   
  但是不带初始化器的枚举或者被放在第一的位置，
  或者被放在使用了数字常量或其它常量初始化了的枚举后面是不允许的。

  enum button = {
     open = getButton(),
     close,  // error
  }


### 2、字符串枚举

 在字符串枚举里，每个变量成员都必须用字符串字面量，
 或另个一个字符串枚举成员进行初始化。


 enum  dir = {
     Up ="UP",
     Down = "DOWN",
     Left = "LEFT",
     Right = "RIGHT",
 }

由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。

### 3、异构枚举
  从技术角度来说，枚举可以混合字符串和数字成员

  enum sn {
      No=0,
      Yes="YES",
  }

### 4、计算的和常量成员

    每个枚举成员都带有一个值，它可以是常量或计算出来的。

   a、没有初始化

   enum E{
       x,// 默认为0
   }

  b、初始化没有完全
   enum E{
       A = 1,
       B,  // 2 默认是上一个成员的值+1
       C,  // 3 默认是上一个成员的值+1
   }
  

  c、初始化是计算得来的值

  enum E{
      A = 1++,
      B = 2/1,
      C = 3*2,
  }

  ### 5、联合枚举与枚举成员的类型

  存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。
  字面量枚举成员是指不带有初始值的常量枚举成员，或者是指被初始化为
   *任何字符串字面量
   *任何数字字面量
   *应用了一元-符号的数字字面量

    enum ShapeKind {
        Circle,
        Square,
    }
    interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
    }
    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }
    let c: Circle = {
        kind: ShapeKind.Square,
        //    ~~~~~~~~~~~~~~~~ Error!
        radius: 100,
    }



### 6、运行时的枚举

枚举是运行时真正存在的对象。

    enum E {
        X, Y, Z
    }
    function f(obj: { X: number }) {
        return obj.X;
    }
    // Works, since 'E' has a property named 'X' which is a number.
    f(E);


### 7、反向映射

enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"




## 2、外部枚举
外部枚举用来描述已经存在的枚举类型的形状

declare enum Enum {
    A = 1,
    B,
    C = 2
}

外部枚举和非外部枚举有一个重要的区别，在正常的的枚举里面，
没有初始化方法的成员被当成常熟成员。
对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。







# 八、类型推断

## 1、基础
Typescript里，在没有明确指出类型的地方，类型推断会提供类型。

let x = 3;//x被推断为数字

这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时


## 2、最佳通用类型

let x = [0,1,null];

考虑所有元素成员，给出一个兼容所有候选类型的类型

let zoo = [new Rhino(), new Elephant(), new Snake()];

如果没有找到最佳通用类型的话，类型推断为联合数组类型
(Rhino | Elephant | Snake)[]。



## 3、上下文类型

按上下文归类：Typescript类型推论也可以按照相反的方向进行。
  
  // 参数不设置默认类型
  function (obj){
      console.log(obj.name);// Error 
  }
  
  // 参数设置类型any不报错
  //这个函数表达式有明确的参数类型注解，上下文类型被忽略
  function (obj:any){
      console.log(obj.name);// No Error
  }











# 九、类型兼容性

  ## 1、介绍
  Typescript里的类型兼容是基于结构子类型的。
  结构子类型是一种只使用其成员来描述类型的方式。

  interface Person{
      name:string,
      age: number,
  }
  interface Man{
      name:string,
      age:number
  }
  let p:Person;
  p = new Man(); // 这是被允许的


  ## 2、初识类型兼容

   兼容规则：如果x要兼容y，那么y至少具有与x相同的属性。

   
  interface Person{
      name:string,
  }
  interface Man{
      name:string,
      age:number
  }
  let m:Man;
  let p = {name:"lisi",age:12};
  m = p;  // 这是被允许的，因为m具有的属性，y都具备




  ## 3、比较两个函数
   
    即判断两个函数是否兼容

    let a = (x:number) => 0;
    let b = (y:number,z:string) =>0
    a = b;// 成立的，因为a函数中的属性b函数中都有
    b = a;// 不成立，因为b函数中的属性a函数中不全有




## 4、枚举

枚举类型与数字类型兼容，并且数字类型和枚举类型兼容。
不同枚举之间是不兼容的。

enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };
let status = Status.Ready;
status = Color.Green;  // Error

## 5、类

类与对象字面量和接口差不多
但是有一点不同：类有静态部分和实例部分的类型。


比较两个类类型的对象时，只有实例的成员会被比较。
静态成员和构造函数不在比较范围内。

class Person {
    name: string;
    constructor(name: string, age: number) { }
}
class Man {
    name: number;
    constructor(name:string,age: number) { }
}
let p: Person;
let m: Man;
p = m;  // OK
m = p;  // OK


## 6、泛型

因为Typescript是结构类型系统，类型参数只影响使用其作为类型一部分的结果类型。

interface Person<T> {
}
let p1: Person<number>;
let p2: Person<string>;

x = y;  // OK
// x和y是兼容的，因为他们的结构使用类型参数一致。





# 十、高级类型

*
*
*
*
*


# 十一、Symbols

  ## 1、介绍
  Symbol类型的值是通过Symbol构造函数创建的
  
  1、创建
  let sym1 =  Symbol();// 可以不带参数
  let sym2 =  Symbol("sunlike");// 可选的字符串参数
  
  2、Symbols是不可改变唯一的。
  let sym3 =  Symbol("sunlike"); 
  let sym4 =  Symbol("sunlike");
  sym3 === sym4;// false,symbols是唯一的

  3、像字符串一样，symbols也可以用做对象属性的键。

  let sym = Symbol("name");
  let obj = {
      [sym]:'lisi',
  }

  4、Symbols也可以与计算出的属性名称相结合来声明对象的属性和类成员。


    const getName = Symbol();
    class C {
        [getName](){
        return "C";
        }
    }
    let c = new C();
    let name = c[getName](); // "C"

   
   ## 2、众所周知的Symbols（纯复制）

    Symbol.hasInstance
    方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

    Symbol.isConcatSpreadable
    布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

    Symbol.iterator
    方法，被for-of语句调用。返回对象的默认迭代器。

    Symbol.match
    方法，被String.prototype.match调用。正则表达式用来匹配字符串。

    Symbol.replace
    方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

    Symbol.search
    方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

    Symbol.species
    函数值，为一个构造函数。用来创建派生对象。

    Symbol.split
    方法，被String.prototype.split调用。正则表达式来用分割字符串。

    Symbol.toPrimitive
    方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

    Symbol.toStringTag
    方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

    Symbol.unscopables
    对象，它自己拥有的属性会被with作用域排除在外。







# 十二、迭代器和生成器

## 1、可迭代性
当一个对象实现了Symbol.interator属性时，我们认为他是可以迭代的。
 内置Symbol.interator的类型有：
 Array,
 Map,
 Set,
 String,
 Int32Array,
 Unit32Array

 ## 2、 for..of和for..in
  
   1、for..of
   for..of会遍历可迭代的对象，调用对象上的可迭代方法。
   遍历的是对象的键对应的值

    let arr = [1,2,3];
    for (let a of arr) {
        console.log(a); //  1,2,3
    }
   
     
    2、for..in

     遍历的是对象的键列表

    let arr = [1,2,3];
    for (let a in arr) {
        console.log(a); //  0,1,2
    }










# 十三、模块


*
*
*
*
*


# 十四、命名空间

# 十五、命名空间和模块

# 十六、模块解析

# 十七、声明合并

# 十八、JSX

# 十九、装饰器

# 二十、Minxins

# 二十一、三斜线类型指令

# 二十二 javascript文件类型检查


