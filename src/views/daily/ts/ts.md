### TypeScript 入门

#### 一、TypeScript 介绍

1. ts 是微软开发的一款开源的编程语言
2. ts 是 js 的超集，遵循最新的 ES6、ES5 规范，也扩展了 js 的语法
3. ts 更像是后端 java、C# 这样的面向对象语言，可以让 js 开发大型企业项目

```shell
# 安装
npm i -g typescript

# 运行
tsc helloworld.ts
```

TypeScript、ES6、ES5 的关系：TypeScript 包含 ES6、ES6 包含 ES5

#### 二、TypeScript 中的数据类型

**ts 中为了使编写的代码更加规范，更有利于维护，增加了类型校验，在 ts 中主要给我们提供了以下数据类型。写 ts 代码必须指定类型。**

##### 2.1 布尔类型 （boolean）

```typescript
let flag:boolean = true
flag = 123  // 错误
flag = 'str' // 错误
flag = false // 正确
```

##### 2.2 数字类型    (number)

```typescript
let num:number = 123
num = 'str'  // 错误
num = true	 // 错误
num = 456		 // 正确
```

##### 2.3 字符串类型 (string)

```typescript
let str:string = '123'
str = 456   // 错误
str = true	// 错误
str = '456'	// 正确
```

##### 2.4 数组类型     (array)

```typescript
// 有三种定义数组的方式
// 第一种
let arr:number[] = [1,2,3]
arr = [1,'2']  // 错误
// 第二种
let arr:Array<number> = [1,2,3]
arr = [1,'2'] // 错误
// 第三种
let arr:any[] = [1,'2']
arr = [true,'w']  // 正确

//多类型联合
let arr:Array<number|string> = [1,2,'3'] 
let arr:(number|string)[] = [1,2,'3']
```

##### 2.5 元组类型     (tuple)

> 属于数组的一种，长度必须和类型长度一样，类型一一对应

```typescript
let arr:[number,string] = [1,'2']  // arr.length = 2
arr = ['2',1]  // 错误
arr = [1,'2',3] // 错误 3被称为越界元素
```

##### 2.6 枚举类型     (enum)

**介绍枚举：随着计算机的不断普及，程序不仅只用于数值计算，还广泛的用于处理非数值的数据。例如：性别，月份，星期，颜色，单位名等，这些都不是数值在其他程序设计语言中，一般用一个数值来代表某一种状态，这种处理方法不直观，易读性差，如果在程序中用自然语言中有相应含义的单词来代表某一种状态，则程序就很容易阅读和理解，也就是说，事先考虑到某一变量可能取得值，尽量用自然语言中含义清除的单词来表示他的每一个值。 这种方法称为枚举。**

> 简单来说：就是把之前非0即1的返回值替换成看完马上能够理解的单词描述。

```typescript
enum Flag {
  success:1,
  fail:0
}
let s:Flag = Flag.success  // 1
let f:Flag = Flag.fail  // 0

// 如果标识符没有赋值，则返回的它的下标
enum Color {
  blue,
  red,
  "orange"
}
let c:Color = Color.red // 1
let c:Color = Color.orange  // 2

enum Color {
  blue,
  red=3,
  "orange"
}
let c:Color = Color.blue // 0
let c:Color = Color.orange  // 4
```

##### 2.7 任意类型  (any)

>  可以当做任意类型，就像 js 声明的变量一样

```typescript
// 任意类型的用处
let o:any = document.getElementById('box')
o.style.color = 'red'
// 这时，如果没有指定 any 类型，就会报错
```

##### 2.8 Null 和 undefined 类型

> null 和 undefined 是其他类型 (never) 的子类型

```typescript
let num:number;
console.log(num)  // 报错，定义没有赋值为 undefined

let num:undefined
console.log(num)  // 正确

// 一个元素可能是number(string) 、null、undefined
let num:number | null | undefined
num = 123
num = null
num = undefined
```

##### 2.9 void 类型    (void)

> ts 中的 void 表示没有任何类型，一般用于定义方法的时候，方法没有返回值。

```typescript
// 正确写法
function run():void{
  console.log('run 方法')
}

// 错误写法
function run():number{
  console.log('run 方法')
}  
// 正确写法
function run():number{
  return 123
}
```

##### 2.10 其他类型  (never)

> 包含 null 和 undefined 类型，代表从不会出现的值，意味着声明 never 的变量只能被 never 类型所赋值。一般不会用到，知道有这个类型就可以

```typescript
let a:undefined
a = undefined
// 两种使用 never 的情况
// 抛出错误
const errFunc = (message:string):never =>{
  throw new Error(message);
}
// 死循环
const infiniteFunc = ():never => {
  while (true) {}
}
// never类型是任何类型的子类型，never可以赋值给其他类型，其他类型不能赋值给never
let neverVariable = (()=>{
  while(true){}
})()
neverVariable = 123  // 错误
```

##### 2.11 类型断言

> 可以用来强制手动指定一个值的类型。将一个联合类型的变量指定为一个更加具体的类型。
> 语法：<类型> 变量、变量 as 类型

```typescript
const getLength = (target:string|number):number => {
  if(target.length || target.length === 0){
     return target.length
  } else {
		 return target.toString().length
  }
}
// 在 js 中上面代码是没有问题的，但是在 ts 中上面代码会报错，报错信息：类型“number”上不存在属性“length”。这时我们就需要使用类型断言。
const getLength = (target:string|number):number => {
  if((<string>target).length || (target as string).length === 0){
     return (<string>target.length)
  } else {
    return target.toString().length
  }
}
```

##### 2.12 Symbol 类型 (了解)

> 这个是 ES6 增加的一种基本数据类型，和 number 等同级别。
> 用来表示独一无二的值，和任何值都不相等。
> 使用时，没有 new 关键字。
> 在 ts 中使用 Symbol 和 ES6 中稍微有点区别。

```typescript
const s1 = Symbol()
const s2 = Symbol()
console.log(s1 === s2)  // false
```

```typescript
// 传参，只是作为标识作用。
// 传入其他类型(数字，对象)，会把(数字，对象)转换成字符串。
const s3 = Symbol('zhangsan')
const s4 = Symbol('zhangsan')
console.log(s3 === s4) // false
```

```typescript
// 不可以和其他类型做运算，但是可以转成字符串与 Boolean 使用
const s5 = Symbol('zhangsan')
console.log(s5.toString)  // Symbol(zhangsan)
console.log(Boolean(s5))	// true
console.log(!s5)          // false
```

```typescript
// 因为 Symbol 的独一无二，所以使用 Symbol 作为属性名会保证不会被其他变量或属性所覆盖。只能通过 [] 的形式访问这个属性值。
let prop = 'name'
let obj = {
  [prop]:'zhangsan',
  [`my${prop}is`]:'lisi'
}
console.log(obj)  // {name:zhangsan,mynameis:lisi}

//使用 Symbol 作为属性名
const s = Symbol('name')
const obj = {
  [s]:'zhangsan',
  age:18,
  sex:'男'
}
console.log(obj) // {age:18,sex:男,Symbol(name):zhangsan}
// 访问，只能通过 [] 的形式访问这个属性值。
console.log(obj[s]) // zhangsan
// obj.s  这么写是错误的 
// 也可以进行修改
obj[s] = 'lisi'
console.log(obj[s]) // lisi
```

```typescript
// Symbol 作为属性名的时候，不能够正常遍历出来
for (const key in obj) {
  console.log(key)   // age  sex
}
// Object.keys:返回对象中所有属性组成的数组
console.log(Object.keys(obj))  // ['age','sex']
// Object.getOwnPropertyNames:返回对象中所有属性组成的数组
console.log(Object.getOwnPropertyNames(obj)) // ['age','sex']
JSON.stringify(obj) // {"age":18,"sex":"男"}

// **但是有两种方法可以将 Symbol 遍历出来**
// Object.getOwnPropertySymbols:返回所有Symbol类型的属性名的数组
console.log(Object.getOwnPropertySymbols(obj)) 
// [Symbol(name)]
// ES6 方法 Reflect.ownKeys:所有属性组成的数组
console.log(Reflect.ownKeys(obj)) 
// ['age','sex',Symbol(name)]
```

```typescript
// Symbol 的静态方法
// Symbol.for():
//首先拿传入的字符串去全局(当前的页面、iframe)找有没有使用这个字符串创建的Symbol值，
//如果有的话，直接返回用这个字符串创建的值，如果没有找到，会创建一个新的 symbol 值 
const s6 = Symbol('joker')
const s7 = Symbol.for('joker')
const s8 = Symbol.for('joker')
console.log(s7 === s8) // true
console.log(s6 === s7) // false
// Symbol.keyFor():返回使用Symbol.for造全局创建的Symbol的标识
console.log(Symbol.keyFor(s6))  // undefined
console.log(Symbol.keyFor(s8))	// joker
```

#### 三、TypeScript 中的方法

##### 3.1 方法定义

```javascript
// ES5 定义方法
// 声明方式
function run (){
  return 'run'
}
// 匿名方式
let run = function (){
  return 'run'
}
```

> 在 ts 中函数的返回需要规定类型，如果没有规定类型，默认为 any 类型

```typescript
// 声明方式
function runTs (): number{   // 正确写法
  return 123
}
function runTs (): number{		// 错误写法
  return '123'
}

// 匿名方式
let runTs = function (): string{
  return '123'
}
let add = (a: number, b: number): number => {a + b}
```

> 定义方法传参，每一个参数也需要指定类型，如果没有规定类型，默认为 any 类型

```typescript
function getInfo (name: string,age: number): string{
  return `${name}+${age}`
}
getInfo('张三',20) // 正确写法
getInfo(20,"张三") // 错误写法
getInfo('张三','20') // 错误写法
let getInfo = function (name: string,age: number): string{
  return `${name}+${age}`
}

// 没有返回值的方法
function run (): void{
  console.log('run')
}
```

##### 3.2 方法的可选参数

> ES5 中方法的实参和形参可以不一样，但是 ts 中必须都一样，如果不一样就需要配置可选参数。

```typescript
let getInfo = function (name: string,age: number): string{
  return `${name}+${age}`
}
getInfo('zhangsan')  // 错误写法
getInfo('zhangsan',20) // 没有设置可选参数时，必须按照顺序和类型传入

// 可选参数(需要在可选参数后加上问号)
let getInfo = function (name: string,age?: number): string{
  return `${name}+${age}`
}
getInfo('zhangsan')  // 正确写法

// 错误写法
let getInfo = function (name?: string,age: number): string{
  return `${name}+${age}`
}
getInfo(20)
// 注意：可选参数必须配置到参数的最后面，否则就需要将可选参数进行站位 
```

##### 3.3 默认参数

> ES5 中没办法设置默认参数，ES6 和 ts 中可以设置默认参数

```typescript
let getInfo = function (name: string,age: number=20): string{
  return `${name}+${age}`
}
getInfo('zhangsan')  // 正确
getInfo('zhangsan',30) // 正确
```

##### 3.4 剩余参数

```typescript
function num (a: number,b: number): number{
  return a + b
}
sum(1,2)
// 这种写法是正确的，但是不能复用，如果我现在想计算 sum(1,2,3)，那么这个方法就不可以使用了。
```

> 使用剩余参数：三点运算符接受形参传过来的值

```typescript
function num (...result: number[]): number{
  let num = 0
  for(let i = 0; i < result.length; i++){
    sum += result[i]
  }
  return sum
}
sum(1,2,3,4,5)  //  ...result 拿到所有的实参组合成的数组

function num (a: number,...result: number[]): number{
  let num = a
  for(let i = 0; i < result.length; i++){
    sum += result[i]
  }
  return sum
}
sum(1,2,3,4,5)  //  a 是实参的第一个参数， ...result 拿到除去第一个参数的所有实参组合成的数组 (依次类推，可以传入a,b,c...)
```

##### 3.5 函数的重载

1. jave的重载：是指两个或者两个以上的同名函数，但他们的参数不一样，就会出现重载的情况。
2. ts 的重载：通过为同一个函数提供多个函数类型定义来实现多种功能的目的。

```typescript 
// 注意除去最后一个函数，其余的函数没有函数体，并且最后一个函数只能指定 any 类型，必须使用 function 形式来定义函数重载。
function css (config: string): string
function css (config: number): number
function css (str: any): any{
  if(typeof str === 'string'){
     return `我的名字是${str}`
  } else {
    return `我的年龄是${str}`
  }
}
css('zhangsan')
css(20)
css(true)      // 错误写法
```

#### 四、TypeScript 中的类、继承、接口、泛型

##### 4.1 ES5 中的类和继承

##### 4.1.1 最简单的构造函数

```javascript
function Person(name,age){
  this.name = name;
  this.age = age
}
let p = new Person('zhangsan',20)
console.log(p.name)
```

##### 4.1.2 构造函数和原型链

```javascript
function Person (name,age){
  this.name = name
  this.age = age
  this.run = function (){
    console.log('run')
  }
}
// 原型链上面的属性和方法会被多个实例共享
Person.prototype.sex = '男'
Person.prototype.work = function (){
  console.log('work')
}
let p = new Person('zhangsan',20)
p.run()
p.work()
```

##### 4.1.3 类里面的静态方法

```javascript
function Person (name,age){
  this.name = name
  this.age = age
  this.run = function (){  // 实例方法，必须 new 才能用
    console.log('run')
  }
}
Person.prototype.sex = '男'
Person.prototype.work = function (){
  console.log('work')
}
Person.getInfo = function (){
  console.log('我是静态方法')
}
let p = new Person('zhangsan',20)
p.getInfo()  // 错误
// 正确调用静态方法
Person.getInfo() // 正确
```

##### 4.1.4 ES5继承一(对象冒充实现继承)

```javascript
function Person (name){
  this.name = name
  this.run = function (){
    console.log('run')
  }
}
Person.prototype.work = function (){
  console.log('work')
}
// web 类继承 person 类
function Web (){
  Person.call(this)  // 对象冒充
}
let w = new Web()
w.run() // 正确、对象冒充可以继承构造函数里面的属性和方法
w.work() // 错误、对象冒充不能继承原型链上面的属性和方法
```

##### 4.1.5 ES5继承二(原型链实现继承)

```javascript
function Person (name){
  this.name = name
  this.run = function (){
    console.log('run')
  }
}
Person.prototype.work = function (){
  console.log('work')
}
// web 类继承 person 类
function Web(){}
Web.prototype = new Person()  // 原型链实现继承
let w = new Web()
w.run()  // 原型链实现继承既可以构造里面的属性方法，也可以继承原型链上属性方法
w.work()
```

##### 4.1.6 原型链实现继承的问题

```javascript
function Person (name,age){
  this.name = name 
  this.age = age
  this.run = function (){
    console.log(this.name + '在run')
  }
}
Person.prototype.sex = '男'
Person.prototype.work = function(){
  console.log('work');
}
// web 类继承 person 类
function Web (name,age){}
Web.prototype = new Person()
let w = new Web('zhangsan',20)
w.run() // 打印undefined在run，
// 这样会出现一个问题:实例化子类的时候没办法给父类传参
```

##### 4.1.7 原型链 + 构造实现继承

```javascript
function Person (name,age){
  this.name = name
  this.age = age 
  this.run = function (){
    console.log(this.name + '在run')
  }
}
Person.prototype.sex = '男'
Person.prototype.work = function(){
  console.log('work');
}
function Web (name,age){
  Person.call(this,name,age)  // 对象冒充继承，实例化子类可以给父类传参
}
Web.prototype = new Person()
let w = new Web('zhangsan',20)
w.run()
w.work()
```

##### 4.2 TypeScript 中的类和继承

##### 4.2.1 TypeScript 中的类

>在 TypeScript 中使用关键字 class 来定义类

```typescript
class Person {
  name: string;  // 注意：这里是分号或者省略，不是逗号
  constructor(name: string){ // 构造器。构造函数，实例化类的时候触发的方法
    this.name = name
  }            // 注意：这里没有符号，每一个方法之间不需要符号
  run(): void{
    console.log(this.name)
  }
}
let p = new Person('zhangsan')
p.run()
// 实例化的 zhangsan 首先会传到构造函数 constructor 中，再赋值类中的 name。 
// zhangsan -> constructor(name=zhangsan) -> this.name = name -> Person 中的 name
```

```typescript
class Person {
  name: string;
  constructor(name: string){
    this.name = name 
  }
  getName(): string{
    return this.name 
  }
  setName(name: string): void{
    this.name = name
  }
}
let p = new Person('zhangsan')
console.log(p.getName())
p.setName('lisi')
console.log(p.getName())
```

```ts
class Person {
  constructor(public name: string){
  }
  getName(): string{
    return this.name 
  }
  setName(name: string): void{
    this.name = name
  }
}
let p = new Person('zhangsan')
console.log(p.getName())
p.setName('lisi')
console.log(p.getName())
```

##### 4.2.2 TypeScript 中的继承

> 实现继承需要使用关键字 extends 和 super

```typescript
class Person {
  name: string;
  constructor(name: string){
    this.name = name
  }
  run(): string{
    return `${this.name}在运动`
  }
}
class Web extends Person {
  constructor(name: string){
    super(name)	// 表示调用 person 的构造方法，初始化父类的构造函数
  }
}
let w = new Web('lisi')
console.log(w.run())
```

```typescript
// TypeScript 继承的探讨，当父类和子类有同样方法时
class Person {
  name: string;
  constructor(name: string){
    this.name = name
  }
  run(): string{
    return `${this.name}在运动-父类`
  }
}
class Web extends Person {
  constructor(name: string){
    super(name)
  }
  run(): string{  // 和父类有同样方法
    return `${this.name}在运动-子类`
  }
  work(): string{ // 也可以有自己的方法
    return `${this.name}在工作`
  }
}
let w = new Web('zhangsan')
console.log(w.run())  // zhangsan在运动-子类
console.log(w.worl())
// 总结：当父类的方法和子类的方法一致时，首先在子类里面找，然后去父类里面找。
```

##### 4.2.3 TypeScript 类里面的修饰符

**TypeScript 里面定义属性的时候给我们提供了三种修饰符：**

1. public：公有类型，在类里面、子类、类外部都可以访问
2. protected：保护类型，在类里面、子类里可以访问，类外部不可以
3. private：私有类型，在类里面可以访问，子类、类外部不可以
**注意：属性不加修饰符，默认为 public**

```typescript
// 公有类型 public
class Person {
  public name: string;
  constructor(name: string){
    this.name = name
  }
  run(): string{
    return `${this.name}在运动-父类`
  }
}
class Web extends Person {
  constructor(name: string){
    super(name)
  }
  run(): string{
    return `${this.name}在运动-子类`
  }
}
let w = new Web('zhangsan')
console.log(w.run())  // 子类可以访问
let p = new Person('lisi')
console.log(p.run())  // 父类可以访问
console.log(p.name)   // 类外部可以访问
```

```typescript
// 保护类型 protected
class Person {
  protected name: string;
  constructor(name: string){
    this.name = name
  }
  run(): string{
    return `${this.name}在运动-父类`
  }
}
class Web extends Person {
  constructor(name: string){
    super(name)
  }
  run(): string{
    return `${this.name}在运动-子类`
  }
}
let w = new Web('zhangsan')
console.log(w.run())  // 子类可以访问
let p = new Person('lisi')
console.log(p.run())  // 父类可以访问
console.log(p.name)   // 报错，类外部不可以访问
```

```typescript
// 私有类型 private
class Person {
  private name: string;
  constructor(name: string){
    this.name = name
  }
  run(): string{
    return `${this.name}在运动-父类`
  }
}
class Web extends Person {
  constructor(name: string){
    super(name)
  }
  run(): string{
    return `${this.name}在运动-子类`
  }
}
let p = new Person('lisi')
console.log(p.run())  // 父类可以访问
let w = new Web('zhangsan')
console.log(w.run())  // 报错，子类不可以访问
console.log(p.name)   // 报错，类外部不可以访问
```

##### 4.2.4 TypeScript 中的多态

> 多态：父类定义一个方法不去实现，让继承它的子类去实现，每一个子类有不同的表现(一种方法，多种状态，重写父类的方法)。多态属于继承的一种。

```typescript
class Animal {
  name: string
  constructor(name: string){
    this.name = name
  }
  eat(): void{
    console.log('eat方法')
    // 定义了一个'吃'的方法，'吃'什么，不知道，但是，具体'吃'什么，需要			 继承它的子类去实现，每一个子类的表现不一样
  }
}
class Dog extends Animal {
  constructor(name: string){
    super(name)
  }
  eat(): string{
    return `${this.name}吃肉`
  }
}
class Cat extends Animal {
  constructor(name: string){
    super(name)
  }
  eat(): string{
    return `${this.name}吃老鼠`
  }
}
let d = new Dog('狗')
let c = new Cat('猫')
console.log(d.eat())
console.log(c.eat())
```

##### 4.2.5 TypeScript 中的抽象类、抽象方法

> 抽象类：是提供其他类继承的基类，不能直接被实例化(无法创建抽象类的实例)。
> 用关键字 abstract 定义抽象类和抽象方法，抽象类中的抽象方法不包括具体实现并且必须在派生类中实现。
> abstract 关键字只能放在抽象类里面。
> 抽象类和抽象方法用来定义标准，比如： Animal 这个类要求它的子类必须包含 eat 方法。标准定义什么，你只要是继承我，你就必须得实现我的抽象方法，其他方法可以不用实现。

```typescript
abstract class Animal {
  name: string
  constructor(name: string){
    this.name = name
  }
  abstract eat(): any  // 不能有方法体(也就是大括号)，方法“eat”不能具有实现，因为它标记为抽象。
  run(): void{
    console.log('其他方法可以不用实现')
  }
}
// let a = new Animal() // 错误写法，抽象类不能直接被实例化
// 抽象类的子类必须实现抽象类里面的抽象方法，不实现报错
class Dog extends Animal {
  constructor(name: string){
    super(name)
  }
}  // 这样非抽象类 Dog 会报错

class Cat extends Animal {
  constructor(name: string){
    super(name)
  }
  eat(): string{
    return `${this.name}吃老鼠`
  }
} // 这样是正确的，抽象类中的非抽象方法可以不用实现

// 看完实例，再返回对抽象类的介绍就会稍微理解一点。
```

##### 4.3 TypeScript 中的静态属性、静态方法

##### 4.3.1 ES5 中的静态属性和静态方法

```javascript
function Person(){
  this.run = function (){}  // 实例方法
}
Person.name = 'zhangsan'  // 静态属性
Person.work = function (){}  // 静态方法
// 调用实例方法需要 new 一个实例，调用静态属性和方法可以直接用
let p = new Person()
p.run()
Person.name
Person.work()
```

##### 4.3.2 TypeScript 中的静态属性和静态方法

```typescript
// 在 ts 中定义静态属性和静态方法时需要使用关键字 static
class Person {
  public name: string;
  public age: number
  static sex = '男' // 定义静态属性，一般不会使用静态属性
  constructor(name: string,age: number){
    this.name = name
    this.age = age
  }
  run(): void{
    console.log(`${this.name}在运动,我${this.age}岁`)
  }
  static work(): void{
    console.log('我是静态方法')
  }
}
let p = new Person('zhangsan',20)
p.run()
// 调用静态方法
Person.work()
// 使用静态变量
console.log(Person.sex)
```

```typescript
// 静态属性和静态方法的问题
class Person {
  name: string
  age: number
  static sex = '男'
  constructor(name: string,age: number){
    this.name = name
    this.age = age
  }
  run(): void{
    console.log(this.sex)  // 错误
  }
  run2(): void{
    console.log(this.name) // 正确
  }
  static work(): void{
    console.log(this.name) // 错误
  }
  static work2(): void{
    console.log(this.sex)  // 正确
  }
}
// 总结：在实例方法中不可以访问静态变量，同样在静态方法中也不可以访问实例属性。只能在实例方法中使用实例属性，在静态方法中使用静态属性。
```

##### 4.4 TypeScript 中的接口

> 接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计中，接口起到一种限制和规范的作用，接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。ts中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
> 总体来说：接口是进行**约束**属性或者函数类的行为动作的。
> 就是我定义一个规则，让你怎么传参数，你就必须按照我的规则来，否则就会报错。
> 抽象类和抽象方法只能规定类，接口可以**约束**属性、函数、可索引和类等
> 接口定义使用关键字：interface

##### 4.4.1 属性接口 (主要是对 json 的约束)

```typescript
// 我们一步一步的来
// 1、首先先定义一个方法
function printLable(): void{
  console.log('printLable')
}
printLable()
// 2、给方法传入参数
function printLable(label: string): void{
  console.log(label)
}
printLable('hha')
// 3、ts 中传入json，并且进行约束
function printLable(labelInfo:{label: string}): void{
  console.log(labelInfo.label)
} // 必须传入一个 json 并且 json 中必须包含 label 属性
printLable('123')          // 错误
printLable({name:'asf'})	 // 错误
printLable({label:'haha'}) // 正确

// 4、对批量方法来进行约束，使用接口
// 约束：必须传入 json，必须是字符串，必须有 firstName 和 secondName
interface FullName {
  firstName: string; // 注意：分号或者省略
  secondName: string
}
function printName (nameJson: FullName): void{
  console.log(nameJson.firstName + '--' + nameJson.secondName)
}

function printName (nameJson: FullName): void{
  console.log(nameJson.firstName + '--' + nameJson.secondName + nameJson.age)
}  // 这么写也是错的，虽然下面 obj 已经传入 age 属性，但是接口定义中没有 age 属性

// 参数的顺序可以不一样
printName({
  firstName:'zhang',
  secondName:'san'
})
printName({
  secondName:'san',
  firstName:'zhang'
})
// 这么写是错误的，对象中只能有 firstName secondName
printName({
  firstName:'zhang',
  secondName:'san',
  age:10
})
```

> 针对上述问题，我们有三种绕过多余属性检测的方式。

- 第一种方式：使用类型断言

```typescript
// 强行指定这个对象遵循 FullName 这个接口
printName({
  firstName:'zhang',
  secondName:'san',
  age:10
} as FullName)
```

- 第二种方式：使用索引签名(后面会提到)

```typescript
// 在定义接口时，为了防止这种情况发生，可以这么定义接口
interface FullName {
  firstName: string
  secondName: string
  [prop:string]: any
}
```

- 第三种方式：使用类型兼容性

```typescript
let obj = {
  firstName:'zhang',
  secondName:'san',
  age:10
}
printName(obj)
```

```typescript
interface FullName {
  firstName: string
  secondName?: string
}
function printName (nameJson: FullName): void{
  console.log(nameJson.firstName + '--' + nameJson.secondName)
}
printName({
  firstName:'zhang'
})
```

```typescript
// 实例：接口实现批量 ajax 方法
$.ajax({
  type:"GET",
  url:"www.baidu.com",
  data:"{'username':'zhangsan','age':12}",
  dataJson:"json"
})
interface Config {
  type: string
  url: string
  data?: string
  dataJson: string
}
function ajax (config: Config){
  let xhr = new XMLHttpRequest()
  xhr.open(config.type,config.url,true)
  xhr.send(config.data)
  xhr.onreadystatechange = ()=>{
    if(xhr.readyState === 4 && xhr.status === 200){
      console.log('success')
      if(config.dataJson === 'json'){
        console.log(JSON.parse(xhr.responseText))
      } else {
        console.log(xhr.responseText)
      }
    }
  }
}
```

> 接口的只读属性：readonly

```typescript
interface ArrInfo {
  0: number
  readonly 1: string
}
let arr: ArrInfo = [10, '20']
arr[1] = '30' // 报错，该属性不能被修改，因为是 readonly
```

##### 4.4.2 函数类型接口 (对方法传入的参数以及返回值进行约束)

```typescript
interface Add {
  (x: number, y: number): number
}
// 上述接口在 tslint 中会自动编译成类型别名的方式，也会帮助我们理解上面的函数接口
type Add = (x: number, y: number) => number
// 定义了一个接口 Add ，接受一个方法类型，这个方法需要传入两个数字参数，并且返回值也是数字类型
// 为了更好理解类型别名，看下面例子
type isString = string 
let a: isString = '123'
let a: isString = 123  // 错误
```

```ts
// 1、函数接口使用类型别名
type Add = (x: number, y: number) => number
let addFunc: Add = (a: number, b: number): number => {
  return a + b
}
// 2、函数接口可选参数
type Add = (x: number, y?: number) => number
let addFunc: Add = (a: number, b: number): number => {
  return a + b
}
// addFunc 可以写成下面形式
let addFunc: Add
addFunc = (a: number, b: number): number => {
  return a + b 
}
// 也可以成以下形式
let addFunc: (x: number, y: number) => number
add = (arg1: number, arg2: number): number => arg1 + arg2
// 如果使用了函数体之外定义的变量，这个变量是不体现在函数类型的变量中的
let arg3 = 3
add = (arg1: number, arg2: number): number => arg1 + arg2 + arg3
```

1. 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
2. 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
3. 函数的参数会逐个进行检查， 如果不指定类型，TypeScript的类型系统会推断出参数类。

```typescript
// 实例：
interface SearchFunc {  // 签名
  (source: string,subString: string): boolean
}
let mySearchs:SearchFunc = function (src: string,sub: string): boolean{}
let mySearchb:SearchFunc = function (src,sub){}
```

##### 4.4.3 索引接口、类类型接口、接口继承

- 索引接口 (对数组对象的约束，不常用)

```typescript
  // 对数组的约束
  interface UserArr {
    [prop:number]: string
  }
  let arr: UserArr = ['122','222']
  
  // 对对象的约束
  // 如果限定了属性名为字符串类型，实例的时候写数字也是可以的，会把数字转成字符串类型。
  interface UserObj {
    [prop:string]: string
  }
  let obj = {
    name:'zhangsan',
    2:'admin'
  }
```

- 类类型接口 (对类的约束，和抽象类有点相似，使用关键字：implements)

  > 定义类的时候，必须有接口里面的方法和属性(少一个都不行，和抽象类定义的规定类似)。

  ```typescript
  interface Animal {
    name: string
    eat(str: string): void
  }
  class Dog implements Animal {
    name: string
    constructor(name: string){
      this.name = name
    }
    eat(food: string):void{
      console.log(this.name + food)
    }
  }
  class Cat implements Animal {
    name: string
    constructor(name: string){
      this.name = name
    }
    eat(){
      console.log(this.name)
    }
  }
  let d = new Dog('吃饭')
  d.eat()
  let c = new Cat('吃饭')
  c.eat()
  ```

- 接口继承

  > 和类继承一样使用 extends 关键字，但是实现接口的类，必须实现自己的接口的属性和方法，也必须实现继承的接口的属性和方法。

  ```typescript
  interface Animal {
    run(): void
  }
  interface Person extends Animal {
    work(): void
  }
  class Man {
    name: string
    constructor(name: string){
      this.name = name 
    }
    coding(str: string): void{
      console.log(this.name + str)
    }
  }
  class Boy extends Man implements Person {
    constructor(name: string){
      super(name)
    }
    run(): void{
      console.log(this.name + "run")
    }
    work(): void{
      console.log(this.name + "work")
    }
  }
  let b = new Boy('张三')
  b.run()
  b.work()
  b.coding('写代码')
  ```

##### 4.5 TypeScript 中的泛型

> 泛型：就是解决接口类方法的复用性，以及对不特定数据类型的支持。

##### 4.5.1 背景

```tsx
function getData (value: string) {
  return value
}
getData('12') 
getData(123) // 报错
```

> 现在有个需求：我想传入数字并返回数字，传入字符串返回字符串，即传入什么类型，返回什么类型。

- 方法一：再新建一个 getNum 函数，传入数字类型。
- 方法二：使用 any 类型。

##### 4.5.2 泛型定义和泛型函数

> 使用任意大写字母来表示泛型（常用 T ，可以使用多个），具体什么类型是调用这个方法的时候决定的。

```ts
let getData<T> = (value: T): T => {
  return value
}
getData<number>(123) // 尖括号规定类型，只能传入相对类型的值
getData<string>('123')
```

```ts
// 传入两个泛型，返回值是泛型组成的元组类型
const getArray = <T, U>(params1: T, params2: U, times: number): Array<[T, U]> => {
  return new Array(times).fill([params1, params2])
}
getArray<string, number>('122', 123, 3)
//如果不传类型，编译器会推断出我们传的值的类型
getArray('123', 123, 3)
```

```ts
// 泛型定义函数类型
let getArray: <T>(arg: T, times: number) => T[]
// 类型别名
type GetArray = <T>(arg: T, times: number) => T[]
let getArray: GetArray = (arg: any, times: number) => {
  return new Array(times).fill(arg)
}
getArray(123, 4)
```

#####4.5.3 泛型类

> 比如现在有个最小堆算法，需要同时支持返回数字和字符串(a-z)两种类型

```ts
class MinClass<T> {
  public list: T[] = []
  add(num: T): void {
    this.list.push(num)
  }
  min(): T {
    let minNum = this.list[0]
    for (const key of this.list){
       if(minNum > key) {
          minNum = key
       }
    }
    return minNum
  }
}
let m = new MinClass<number>() // 实例化类，制定类代表类型是number
m.add(5)
m.add(2)
m.add(50)
console.log(m.min())
let m1 = new MinClass<string>() // 制定类代表类型是string 
m1.add('z')
m1.add('a')
m1.add('g')
console.log(m1.min())
```

#####4.5.4 泛型接口

```ts
// 第一种方式
interface GetArray<T> {
  (arg: any, times: number): T[]
	array: T[]
}
// 第二种方式
interface Config {
  <T>(value: T) => T
}
type Config = <T> (value: T) => T
let getData: Config = <T> (value: T): T => value
getData<string>('124')
getData<number>(1234)
```

##### 4.5.5 类当做参数的泛型类

```ts
class User {
  username: string | undefined
  password: string | undefined
  constructor(username: string | undefined, password: string | undefined){
    this.username = username
    this.password = password
  }
}
class MySql<T> {
  add(user: T): boolean {
    return true
  }
}
let u = new User('zhangsan','1234')
let db = new MySql<User>()
db.add(u)
```

##### 4.5.6 泛型约束

- 只允许传入带 length 属性的

  ```ts
  interface ValueWithLength {
    length: number
  }
  const getArray = <T extends ValueWithLength>(arg: T, times: number): T[] =>{
    return new Array(times).fill(arg)
  }
  getArray([1,2,3], 3)
  getArray('123', 3)
  getArray({ length: 3}, 3)
  getArray([123, 3) // 错误，number 没有 length 属性
  ```

- 结合索引类型使用

  ```ts
  const getProps = <T, K>(object: T, propName: K) => {
    return object[porpName]
  }
  const obj = {
    name: 'zhangsan'
  }
  getProps(obj, 'name')
  getProps(obj, 'age') 
  // obj 中没有 age 属性，但是编译器不会报错。所以我们使用泛型约束来提示这个属性不存在
  
  // 我们需要 K 来继承 T（即：K 代表 T 属性中的一员），然后使用 extends 来判断某属性是否存在于 T 中
  // keyof 返回类型上不为 never 属性名组成的联合类型
  const getProps = <T, K extends keyof T>(object: T, propName: K) => {
    return object[porpName]
  }
  const obj = {
    name: 'zhangsan'
  }
  getProps(obj, 'name')
  getProps(obj, 'age')  // 报错
  ```

  #### 五、TypeScript 的装饰器

> 装饰器：是一种特殊类型的声明，它能够被附加到类声明、方法、属性或方法参数上，可以修改类的行为。
> 通俗来说就是一个方法，可以注入到类、方法、属性或方法参数上来**扩展其对应的功能**。
> 装饰器分类：类装饰器，属性装饰器，方法装饰器，参数装饰器
> 装饰器是 ES7 的标准之一

##### 5.1 类装饰器

> 类装饰器：在类声明之前被声明(紧靠着类声明)
> 类装饰器应用于类构造函数，可以用来监视，修改或者替换类定义，传入一个参数。
> 参数表示：对于静态成员来说是类的构造函数，对于实例成员是类的原型对象

##### 5.2 属性装饰器

> 属性装饰器表达式会在运行时当做函数被调用，传入下列两个参数
> 1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
> 2、属性的名称

##### 5.3 方法装饰器

> 它被应用到方法的属性描述上，可以用来监视，修改或者替换方法定义
> 方法装饰器会在运行时传入三个参数：
> 1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
> 2、方法的名称
> 3、成员的属性描述

##### 5.4 方法参数装饰器(不常用，可以使用类装饰器代替)

> 方法参数装饰器表达式会在运行时当做函数被调用，可以使用参数装饰器为类的原型增加一些元素数据。方法参数装饰器会在运行时传入三个参数：
> 1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
> 2、方法的名字
> 3、参数在函数参数列表中的索引

##### 5.5 装饰器执行顺序

> 执行顺序：属性 > 方法 > 方法参数 > 类
> 如果有多个同属性的装饰器，会优先执行后面的。遵循从上到下，从右到左。

#### 六、类型推论和类型兼容性

##### 6.1 类型推论

> ts 可以根据我们赋值的内容，来推断出该变量的类型。

```ts
let name = 'joker'
name = 123  // 报错，不能将 number 赋值给 string
name = 'zhangsan'
```

> 多类型联合：使用 | 来表示

```ts
let a: number | string = '123'
a = 123

let arr = [1, '2']
arr = ['2', 2]
arr = [1, '2', false] // 报错，不能将 false 赋值给 arr
```

##### 6.2 类型兼容性

> 4.4.1 绕过属性检查的第三种方式

```ts
interface Info {
  name: string 
}
let info: Info
const a = { name: 'zhangsan' }
const b = { age: 12 }
const c = { name: 'zhangsan', age: 12 }
info = a  
info = b // 错误，丢失 name 属性
info = c
```

##### 6.2.1函数兼容性

- 参数个数 (右边的参数个数必须小于等于左边的参数个数)

  ```ts
  let x = (a: number) => 0
  let y = (a: number, b: number) => 0
  x = y // 报错
  y = x
  
  // 用下个例子来更加说明
  const arr = [1, 2, 3]
  // forEach 中默认允许传入三个参数，但是我只需要其中一个就可以了
  arr.forEach((item, index, array) => {
    console.log(item)
  })
  arr.forEach((item) => {
    console.log(item)
  })
  ```

- 参数类型

  ```ts
  let x = (a: number) => 0
  let y = (a: string) => 0
  x = y // 报错
  ```

- 返回值类型

  ```ts
  let x = (): string | number => 0
  let y = (): string => 'a'
  let z = (): boolean => false
  x = y
  y = x // 报错，不能将类型“number”分配给类型“string”
  x = z // 报错，不能将类型“boolean”分配给类型“string | number”
  ```

- 函数重载

  ```ts
  function merge(arg1: number, arg2: number): number
  function merge(arg1: string, arg2: string): string
  function merge(arg1: any, arg2: any): any {
    return arg1 + arg2
  }
  
  function sum(arg1: number, arg2: number): number
  function sum(arg1: any, arg2: any): any{
    return arg1 + arg2
  }
  let demo = merge
  demo = sum // 报错，sum 少一个函数重载的情况
  ```

##### 6.2.2 枚举兼容性

> 在不同的枚举中的数值是不兼容的

```ts
enum Status {
  Off,
  On
}
enum Animal {
  Dog,
  Cat
}
let demo = Status.Off
demo = 2
demo = Animal.Dog // 报错，即使在枚举中 Off 和 Dog 代表的值为 0 
```

##### 6.2.3 类的兼容性

> 只比较实例的成员，类的静态成员和构造函数不比较

```ts
class Animal {
  public static age: number
  constructor(public name: string){}
}
class People {
  public static age: string
  constructor(public name: string){}
}
class Food {
  constructor(public name: number){}
}
let animal: Animal
let people: People
let food: Food
animal = people
animal = food // 报错，属性“name”的类型不兼容。不能将类型“number”分配给类型“string”。
```

> 但是通过 private 或者 protected 修饰的属性，会改变兼容性

```ts
class Parent {
  private age: number
}
class Child extends Parent {
  constructor(){
    super()
  }
}
class Other {
  private age: number
}
let child: Parent = new Child()
let other: Parent = new Other() // 报错，不能将类型“Other”分配给类型“Parent”。
```

##### 6.2.4 泛型兼容性

```ts
interface Data<T> {}
let data1: Data<number>
let data2: Date<string>
data1 = data2 // 这个没问题，不管什么类型，泛型内都是一个空对象

interface Data<T> {
  data: T
}
let data1: Data<number>
let data2: Date<string>
data1 = data2 // 报错，不能将类型“string”分配给类型“number”。
```

#### 七、TypeScript 高级类型

##### 7.1 交叉类型

> 取多个类型的并集，使用 & 符号

```ts
const mergeFunc<T, U> = (arg1: T, arg2: U): T & U => {
  let res = {} as (T & U)
  res = Object.assgin(arg1, arg2)
  return res
}
mergeFunc(
{ a: 'a' },
{ b: 'b' }
)
```

##### 7.2 联合类型

> 使用  |  符号，type1 | type2 | type3

```ts
const getLength = (content: number | string): number => {
  if(typeof content === 'string') {
    return content.length
  } else {
    return content.toString().length
  }
}
```

##### 7.3 类型保护

> 首先我们先看下为什么要使用类型保护

```ts
const list = [123, 'abc']
const getRandomValue = () => {
  const num = Math.random() * 10
  if(num < 5) {
    return list[0]
  } else {
    return list[1]
  }
}
const item = getRandomValue()
if(item.length) {
	console.log(item.length)
} else {
  console.log(item.toFixed())
}
// 这样写的话，会报错
// 类型“string | number”上不存在属性“toFixed / length”
```

> 当然这种情况下，我们可以是用类型断言，但是如果数量太多的话，会很麻烦。

##### 7.3.1 typeof 类型保护

> 只能做 === 或者 !== 的逻辑
> 比较的类型必须是：string、number、boolean、symbol其中一种

```ts
// 接着上面的例子
if(typeof item === 'string') {
   console.log(item.length)
} else {
  console.log(item.toFixed())
}
```

##### 7.3.2 instanceof 类型保护

> 主要判断是不是某个类的实例

```ts
class CreateClass1 {
  public age = 18
}
class CreateClass2 {
  public name = 'joker'
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2()
}
const item = getRandomItem()
if(item instanceof CreateClass1){
   console.log(item.age)
} else {
   console.log(item.name)
}
```

##### 7.3.3 使用方法来进行类型保护

> 使用关键字 is ，方法适用于逻辑比较复杂的逻辑

```ts
// 接着上面的问题
function isString(value: number | string): value is string {
  return typeof value === 'string'
}
if(isString(item)){
   console.log(item.length)
} else {
  console.log(item.toFixed())
}
// 如果只是上面简单的情况，就没有必要使用这种方法，完全可以是用类型断言或者 typeof 来实现。
```

##### 7.4 类型保护和类型断言

> 当我们参数或者属性是联合类型或者是 any 这种不唯一的类型，我们需要使用类型保护。

```ts
// 看一个简单的例子，不使用类型断言的形式
const getLength = (value: string | null): number => {
  return (value || '').length
}
```

> 当有嵌套函数时，编译器是无法去除嵌套函数中的 null ，这时候要使用类型断言。(使用 as 或者 ! )

```ts
function getSpliceStr(num: number | null): string => {
  function getRes(prefix: string) {
    // 对象可能为 "null"，所以下面会报错
    // return prefix + num.toFixed().toString()
    return prefix + (num as number).toFixed().toString()
    return prefix + num!.toFixed().toString()
  }
  num = num || 0.1
  return getRes('joker-')
}
getSpliceStr(1.2)
```

##### 7.5 类型别名

> 就是给一个类型取一个别的名字，只是创建了一个名字，而不是创建了一个新类型。使用 type 关键字。

##### 7.5.1 简单实例

```ts
type TypeString = string
let str: TypeString = '123'

type PositionType<T> = {x: T, y: T}
const positon1: PositionType<number> = {
  x: 1,
  y: -1
}
```

##### 7.5.2 类型别名存在的问题一

> 类型别名只能在属性中使用，不能循环使用自身。

```ts
interface Childs<T> {
  current: T
  child?:Childs<T>
}
let a: Childs<string> = {
  current: 'first',
  child: {
    current: 'second',
  }
}

type Childs = Childs[] // 报错，类型别名“Childs”循环引用自身
```

> 当接口起别名时，不能使用 extends、implements
> 因为类型别名归根结底不是接口。
> 但是使用类型别名定义接口和正常定义接口是一样的

```ts
interface A {
  num: number
}
type B = {
  num: number
}
const a: A = {
  num: 123
}
const b: B = {
  num: 321
}
a = b  // true
```

> 问题：什么时候用类型别名，什么时候用接口定义？
> 1、当你定义的类型需要扩展，或者需要使用 implements 修饰的时候，使用 interface。
> 2、当无法通过接口，需要使用联合类型或元组类型的时候，用类型别名。

##### 7.6 字面量类型 （使用自己赋的值作为类型）

##### 7.6.1 字符串字面量

```ts
type Name = 'joker'
const name: Name = 'jhja' // 报错，只能是 joker
type Direction = 'north' | 'east' | 'south' | 'west'
function getDirection(direction: Direction) {
  return direction.slice(0, 1)
}
console.log(getDirection('hah')) // 报错
console.log(getDirection('north')) 
```

##### 7.6.2 数字字面量

```ts
type Age = 18
interface Info {
  name: string
  age: Age
}
const info: Info = {
  name: 'zhangsan',
  age: 18
}
```

##### 7.7 枚举类型

> 在枚举中，只符合字符串和数字枚举

```ts
// 在数字枚举中，可以使用用常量或计算值，但是在这个用常量或计算值来赋值的变量后面的变量必须给出初始值，不能按照默认递归。
const getIndex = () => {
  return 2 
}
enum State {
  Uploading,
 	Success = getIndex(),
  // Failed, 这么写报错
  Failed = 3
}
```

```ts
// 字符串枚举:要求每个字段的值都必须是字符串字面量，或者是该枚举值另一个字符串枚举成员，不能是用常量或计算值
enum Message {
  Error = 'Error',
  Success = 'success',
  Failed = Error
}
```

> const enum 和 enum 的区别 
> const enum：不会创建对象，可以做到直接赋值
> enum：会先创建一个对象，然后对象调用属性

##### 7.8 可辨识联合

> 两个要素：
> 1、具有共同的单例类型(上面的类型都属于单例类型)属性。
> 2、一个类型别名包含了哪些类型的联合。

```ts
interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
interface Circle {
  kind: 'circle'
  radius: number
}
type Shape = Square | Rectangle | Circle
function asserNever(value: never): never {
  throw new Error('error' + value)
}
function getArea(s: Shape): number {
  switch (s.kind){
    case 'square':
      return s.size ** 2
      break
    case 'rectangle':
      return s.height * s.width / 2
      break
    case 'circle':
      return s.radius ** 2 * Math.PI
      break
    default return asserNever(s)
  }
}
// 我们需要进行完整性检查，如果漏了类型，让编译器给我们报错
// 打开 tsconfig.json 中 "strictNullChecks": true,
// 1、使用返回值类型检查，给函数的返回一个具体的类型
// 2、使用 never 类型
```

##### 7.9 多态的this 类型（辅助实现链式调用）

> 这个 this 指的的是类型，不是我们之前熟悉的 this

```ts
class Counter {
  constructor(public count: number = 0){}
  add(value: number) {
    this.count += value
    return this // 这时 this 表示的是实例
  }
  subract(value: number) {
    this.count -= value
    return this
  }
}
class PowCounter extends Counter {
  constructor(public count: number) {
    super(count)
  }
  pow(value: number) {
    this.count **= value
    return this
  }
}
let powCounter = new PowCounter(2)
console.log(powCounter.pow(3).add(1).subract(2))
```

##### 7.10 索引类型

##### 7.10.1 索引类型查询操作符

> keyof 返回类型不为 never 属性名组成的联合类型
> 通俗的理解就是遍历对象中的 key

```ts
interface Info {
  name: string
  age: number
}
let info: keyof Info
// 现在 info 的类型： let info: "name" | "age"
info = 'name'
info = 'age'
info = 'hah' // 报错。接口 Info 上没有该属性，不能将类型“"hah"”分配给类型“"name" | "age"”。
```

> 下面看一个稍微复杂的例子

```ts
function getValue<T, K extends keyof T>(obj: T, props: K[]): Array<T[K]> {
  return props.map((item) => obj[item])
}
// 首先先解释下这个函数
// 1、先定义了一个函数 getValue
// 2、getValue函数是个泛型类型 T， K
// 3、K 代表 T 中的属性名称
// 4、传入两个参数，一个对象是 T 类型，一个是 T 里面属性名组成的数组
// 5、返回值类型是由 T 里面属性 K 组成的数组类型
const infoObj = {
  name: 'joker',
  age: 18
}
// K extends keyof T: 遍历 T 中的属性名，然后 K 继承了遍历后的联合类型。
let infoValue: Array<string | number> = getValue(infoObj, ['name', 'age'])
console.log(infoValue) // ['joker', 18]
```

##### 7.10.2 索引访问操作符

> 使用  [] ，和对象调用属性是一样的，obj[prop]

```ts
interface Info {
  name: string
  age: number
}
type NameType = Info['name'] // 将 string 类型赋值给 NameType
let name: NameType
name = 'joker'
name = 123 // 报错
```

```ts
function getProperty<T, K extends keyof T>(obj: T, prop: K): T[K] {
  return obj[prop]
}
let obj = {
  name: 'joker'
  age: 18
}
console.log(getProperty(obj, 'name')) // joker
console.log(getProperty(obj, 'age')) // 18
```

```ts
interface Info<T> {
  [key: string]: T
}
// 代表接口 Info 中的属性名为 string 类型，值为 T 类型
const info: Info<number> = {
  age: 18
}
let keys: Objs<number>['name']
let keys: Objs<number>[1] // 不会报错，数字1 会转成字符串
```

```ts
interface Type {
  a: never
  b: never
  c: string
  d: number
  e: undefined
  f: null
  g: object
}
type Test = Type[keyof Type] // 返回类型不为never类型的属性名
// 所以Test的类型为 string | number | object | null | undefined
```

##### 7.11 unknown 类型

> unknown 是顶级类型，拥有十大特性

```ts
// 1、任何类型的值都可以赋值给 unknown 类型
let value: unknown
value = 123

// 2、如果没有类型断言或基于控制流的类型细化时， unknown不可以赋值给其他类型，只能赋值给unknown和any
let value: unknown
// 不能将类型“unknown”分配给类型“string”。
let value1: string = value

// 3、如果没有类型断言或基于控制流的类型细化时，不能再它上面进行任何操作。
let value: unknown
// value += 1

// 4、unknown与任何其他类型组成的交叉类型，最后都等于其他类型
type type1 = string & unknown // string
type type2 = number & unknown // number
type type3 = unknown & unknown // unknown
type type3 = unknown & string[] // string[]

// 5、unknown 与任何其他的类型（除了any）组成的联合类型，都等于unknown类型
type type1 = unknown | string  // unknown
type type2 = unknown | any     // any
type type3 = unknown | number[] // unknown

// 6、never类型是 unknown 的子类型
type type1 = never extends unknown? true : false // true

// 7、keyof unknown 等于类型 never
type type1 = keyof unknown // never

// 8、只能对unknown进行等或不等操作，不能进行其他操作
let value: unknown
let value2: string = '123'
console.log(value === value2)  // false

// 9、unknown 类型的值不能访问他的属性，作为函数调用和作为类创建实例
let value: unknown
// value.age
// value()
// new value

// 10、使用映射类型时，如果遍历的是unknown类型，则不会映射任何属性
type Types<T> = {
  [p in keyof T]: number
}
type type1 = Types<any> // 等价于
type type11 = {
    [x: string]: number;
}

type type2 = Types<unknown>  // 等价于
type type2 = {}
```

##### 7.12 null 和 undefined

> null 和 undefined 可以赋给任何的类型，因为它们是所有其他类型的一个子类型。
> string | undefined / string | null / string | null | undefined 是三种不同的类型

```ts
let x1: number = null
let x2: string = null
let x3: boolean = null
let x4: undefined = null
let y1: number = undefined
let y2: string = undefined
let y3: boolean = undefined
let y4: null = undefined
```

> 在 TypeScript里，我们可以使用 `--strictNullChecks` 标记，开启这个标记后，当我们声明一个变量时，就不会自动包含 null 或 undefined，如：

```ts
// 开启`--strictNullChecks`后
// Type 'null' is not assignable to type 'number'.
let x1: number = null

// Type 'null' is not assignable to type 'string'.
let x2: string = null

// Type 'null' is not assignable to type 'boolean'.
let x3: boolean = null

// Type 'null' is not assignable to type 'undefined'.
let x4: undefined = null

// Type 'undefined' is not assignable to type 'number'.
let y1: number = undefined

// Type 'undefined' is not assignable to type 'string'.
let y2: string = undefined

// Type 'undefined' is not assignable to type 'boolean'.
let y3: boolean = undefined

// Type 'undefined' is not assignable to type 'null'.
let y4: null = undefined
```

> 但是我们可以手动使用联合类型来明确包含，如：

```ts
let x = 123
x = null // 报错
let y: number | null = 123
y = null // 允许
y = undefined // 报错，`undefined`不能赋值给`number | null`
```

> 当开启了 `--strictNullChecks`，可选参数/属性就会被自动地加上 *| undefined*，如：

```ts
function foo(x: number, y?: number) {
  return x + (y || 0)
}
foo(1, 2) // 允许
foo(1) // 允许
foo(1, undefined) // 允许
foo(1, null) // 报错，不允许将null赋值给`number | undefined`类型
```

#### 八、TypeScript 模块系统

##### 8.1 ES6 和 Nodejs 的模块系统

- ES6 中的模块：使用 imput、export、export default

  ```js
  // export:导出的是一个接口对象，而不是具体的值。所以就直接导出变量声明语句，与导出的值是双向绑定的，不能出现在块级作用域上
  export const name = 'joker'
  
  const name = 'joker'
  export { name }
  
  export function func() {}
  export class A {}
  
  // 使用 as 来修改名称
  export { name as nameProp }
  
  // 引入不使用，直接导出
  export { func } from './a.js'
  
  // 错误写法
  if(true) {
    export { name }
  }
  export 'joker'
  ```

  ```js
  // export default:导出一个默认的内容，一个模块只能使用一次 export default，不能跟变量声明语句，可以接一个字面量
  function func() {}
  export default func
  export default 'joker'
  ```

  > 下面是引入用 export 导出的模块

  ```js
  import { name } from './a.js'
  // import:有提升的作用，会提升到整个文件的头部来运行，静态执行，会在编译的时候执行。
  getName()
  import { getName } from './a.js'
  // 使用 as 来修改名称
  import { name as nameProp } from './a.js'
  // 当导出的内容是值的时候，引入的内容是只读的，不能修改
  import { name } from './a.js'
  name = 'hahh'    // 错误
  // 当导出的内容是对象的时候，可以修改对象中的属性，但是建议不要修改
  import { info } from './a.js'
  info.name = 'hah'
  // 当你要引入整个文件，但你不需要使用里面的东西
  import './a.js'
  // 多次引入同一个模块，会整合到一个 import 里面
  import { name } from './a.js'
  import { age } from './a.js'
  import { name, age } from './a.js'
  // 使用 * 引入模块中的所有信息
  import * as info from './a.js'
  ```

  > 下面是引入用 export default 导出的模块

  ```js
  import func from './a.js'
  // 同时引入 export 和 export default
  import func, { name } from './a.js'
  ```

  > import()  实现动态按需加载

  ```js
  const status = 1
  if(status) import('./a.js')
  else import('./b.js')
  ```

- Node模块：遵循 CommonJs

##### 8.2 TypeScript 模块系统

##### 8.2.1 TypeScript 模块

> 和 ES6 中的 import、export、export default 用法一样
> 但是 ts 为了整合 ES6 和 Nodejs，也就是整合 CommonJS 和 AMD 等形式，出现了一种特别的引入方法。

```ts
import moment = require('moment')
```

##### 8.2.2 命名空间 namespace 

> 在代码量较大的情况下，为了避免各种变量的冲突，可将相似的功能的函数，类，接口等放置到命名空间。
> 同 java 包一样，ts 的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象，命名空间的对象通过 export 导出。
> 命名空间：内部模块，主要用于组织代码，避免命名冲突 （用处不大）
> 模块：ts 的外部模块的组成，侧重代码的复用，一个模块里面可能会有多个命名空间 （常用）

```ts
namespace A {
  interface Animal {
    name:string
    eat():void
  }
  export class Dog implenments Animal {
    name:string
    constructor(name: string){
      this.name = name
    }
    eat():void {
      console.log(this.name)
    }
  }
}
let d = new A.Dog('小黑')
d.eat()
```

> 也可以使用 三斜线和 tsc 来引入命名空间

```ts
///<reference path='./a.ts'/>
///<reference path='./b.ts'/>
const isLetter = Vadidation.checkLetter('abc')
const isNumber = Vadidation.checkNumber(123)
console.log(Vadidation, isLetter, isNumber)
// 使用方法，在命令行中 tsc --outFile src/index.js src/ts-modules/index
```

> 使用别名来解决深层次嵌套取值的问题

```ts
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Squaire{}
  }
}
import polygons = Shapes.Polygons
let triangle = new polygons.Triangle()
```



#### 九、手动搭建 TypeScript 项目环境 (webpack4)

##### 9.1 生成 package.json 文件

1. 新建一个目录
2. cd 到目录中，执行 npm init 或者 npm init -y
3. 修改文件中的 main -> "./src/index.ts"
4. 创建自己喜欢的文件目录 

##### 9.2 安装依赖

1. typescript  tslint
2. webpack  webpack-cli  webpack-dev-server
3. ts-loader
4. clean-webpack-plugin
5. html-webpack-plugin

##### 9.3 初始化 TypeScript 配置

> 执行 tsc --init 会自动生成 tsconfig.json 文件。根据自己需要，修改配置。
> 需要新建一个 index.ts 入口文件，(我把它放在了 src 目录下)

##### 9.4 配置 webpack 环境

> 我在根目录创建了一个 build 文件夹，在 build 文件夹里面创建了一个 webpack.config.js 文件。
> 下面只是进行了简单的配置，如果添加其他，可以参考官网。使用 webpack4。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
  mode:'',   // 模式  开发或者生产
  entry:"./src/index.ts", // 编译的入口文件
  output:{  // 编译完的输出文件
    filename:'main.js', // ts 最后会被编译成 js
    path:path.resolve(__dirname,'./dist')
  }, 
  resolve:{  // 自动解析文件扩展
    extensions:['.js','.ts','.tsx']
  },
  module:{  // 对于指定文件处理，包括一些 loader
    rules:[
      {
        test: /\.tsx?$/, // 匹配 ts 或者 tsx 结尾的文件
        use:'ts-loader',
        exclude: /node_modules/ // 排除指定文件
      }
    ]
  }, 
  devtool:process.env.NODE_ENV === 'production'? false : 'inline-source-map', // 在生产环境禁用 sourceMap
  devServer:{  // 开发环境配置
    contentBase:'./dist', // 开发环境是基于哪个文件夹运行
    stats:'errors-only', //  npm run dev 在控制台打印的信息类型
    compress:false, // 不启动压缩
    port:8089
  },
  plugins:[      // 插件
    new CleanWebpackPlugin(), // 能够清理指定的文件夹或文件
    new HtmlWebpackPlugin({
      // 这个index.html就是每个项目唯一的页面入口
      template:'./src/template/index.html'
    })
  ]
}
```

##### 9.5 修改 package.json 文件

> 找到对应位置，添加以下代码。

- 配置开发环境 

  ```javascript
  {
    "scripts":{
      "start":"webpack-dev-server --mode=development --config ./build/webpack.config.js"
    }
  }
  ```

  > 本地运行：npm start

- 配置生产环境

  ``` javascript
  {
    "scripts":{
      "build":"webpack --mode=production --config ./build/webpack.config.js"
    }
  }
  ```

  > 打包运行：npm run build

##### 9.6 生成并配置 tslint-json 文件

> 执行命令 tslint  --init，就在根目录生成好了 tslint.json 文件

```javascript
// 根据自己的需要在 rules 配置 tslint 的约束
{
  "defaultSeverity": "error",
  "extends": [
    "tslint:recommended"
  ],
  "jsRules": {},
  "rules": {
    "quotemark": [false],
    "semicolon":[false],
    "trailing-comma":[false],
    "interface-name":[true,"never-prefix"],
    "object-literal-sort-keys":[false],
    "no-console":[false],
    "eofline":[false],
    "member-access":[true],
    "no-consecutive-blank-lines": [false],
    "no-trailing-whitespace": false,
    "max-classes-per-file":true,
    "no-namespace":false,
    "no-empty":false,
    "no-empty-interface":false
  },
  "rulesDirectory": []
}
```

##### 9.7 我的目录结构

```
├── README.md
├── build
│   ├── dist
│   └── webpack.config.js
├── package-lock.json
├── package.json
├── src
│   ├── api
│   ├── assets
│   │   ├── font
│   │   └── img
│   ├── config
│   ├── index.ts
│   ├── template
│   │   └── index.html
│   ├── tools
│   └── utils
├── tsconfig.json
├── tslint.json
└── typings
```

