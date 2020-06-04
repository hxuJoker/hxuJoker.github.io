# ES5 和 ES6 中的类

## 一、类

### 1.1 ES5 中的类

#### 1.1.1 [工厂模式](https://developer.51cto.com/art/201908/601418.htm)

- 没有解决对象识别的问题（即怎样知道一个对象的类型）。

```js
function Car() {
  var car = {}
  car.color = "blue"; 
  car.doors = 4; 
  car.showColor = function(){ 
    console.log(this.color)
  }
  return car
}
var car1 = Car();
car1.showColor()

// 现在可以通过给函数传递不同的参数来得到具有不同值的对象。
function Car(color,doors) {
  var car = {}
  car.color = color; 
  car.doors = doors; 
  car.showColor = function(){ 
    console.log(this.color)
  }
  return car
}
var car1 = Car('red',4);
car1.showColor()

// 但是事实上，每个对象都共享了同一个函数。
function showColor(){ 
  console.log(this.color); 
 } 
function Car(color,doors){ 
  var ocar = {}; 
  ocar.color = color; 
  ocar.doors = doors; 
  ocar.showColor = showColor; 
  return ocar; 
} 
var car1 = Car('black',4);
car1.showColor()
```

#### 1.1.2 构造函数方式

- 使用 new 关键字 
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象 (因此 this 就指向了这个新对象)
3. 执行构造函数中代码 (为新对象添加属性和方法)
4. 返回新对象

> 原本的构造函数是window对象的方法，如果不用new操作符而直接调用，那么构造函数的执行对象就是window，即this指向了window。现在用new操作符后，this就指向了新生成的对象。
构造函数的优点是：我们可以根据参数来构造不同的对象实例 ，缺点是每次构造实例对象时都会生成showColor方法，造成了内存的浪费。
用一个外部函数来代替类方法，达到了每个对象共享同一个方法

```js
// 可以看到构造函数方式在函数内部没有创建对象，是用this关键字。因为在调用构造函数时已经创建了对象，而在函数内部只能用this来访问对象属性。
function Car(color,door){ 
  this.color = color; 
  this.doors = door; 
  this.showColor = function(){ 
    console.log(this.color) 
  }; 
} 
var car1 = new Car("red",4); 
var car2 = new Car("blue",4); 
```

#### 1.1.3 原型方式

> 该方式利用了对象的 prototype 属性。首先用空函数创建类名，然后所有的属性和方法都被赋予prototype属性。 
原型方式的缺点就是不能通过参数来构造对象实例 (一般每个对象的属性是不相同的) ，优点是所有对象实例都共享showColor方法

```js
function Car(){ 
} 
Car.prototype.color = "red"; 
Car.prototype.doors = 4; 
Car.prototype.showColor = function(){ 
  console.log(this.color); 
} 
var car1 = new Car(); 
```



```js
// 原型方式有个很严重的问题就是当属性指向的是对象引用时

function Car(){ 
} 
Car.prototype.arr = new Array("a","b"); 

var car1 = new Car(); 
var car2 = new Car(); 
car1.arr.push("cc"); 
console.log(car1.arr);   
console.log(car2.arr);
console.log(car1.arr === car2.arr)

//这里由于数组的引用值，Car的两个对象指向的都是同一个数组，所以当在car1添加值后，在car2中也可以看到。
```

#### 1.1.4 构造函数 + 原型

- 用构造函数来定义类属性（字段）。用原型方式来定义类的方法。这样，我们就既可以构造不同属性的对象，也可以让对象实例共享方法，不会造成内存的浪费

```js
function Car(color,door){ 
  this.color = color; 
  this.arr = new Array("aa","bb"); 
} 
Car.prototype.showColor(){ 
  alert(this.color); 
} 
var car1 = new Car("red",4); 
var car2 = new Car("blue",4); 
car1.arr.push("cc"); 
console.log(car1.arr);   
console.log(car2.arr);
console.log(car1.arr === car2.arr)
```

#### 1.1.5 Object.create()

> 用这个方法，"类"就是一个对象，而不是函数。然后，直接用Object.create()生成实例，不需要用到new。这种方法比"构造函数法"简单，但是不能实现私有属性和私有方法。
Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象。

```js
var Phone = {
  name: 'xiaomi',
  color: 'black',
  setting: function() {
    console.log(this.name)
  }
}
var p1 = Object.create(Phone)
```

#### 1.1.6 createNew()

> 这种方法不需要用到this和prototype，其做法是用对象来模拟一个类，然后在类里面定义一个构造函数createNew()，然后在createNew()里面定义实例对象，把这个实例对象作为返回值。
实质上就是 工厂模式

```js
var Phone = {
  createNew: function() {
    var phone = {}
    phone.name = 'xiaomi'
    phone.setting = function() {
      console.log(this.name)
    }
    return phone
  }
}

function createNew() {
  var phone = {}
  phone.name = 'xiaomi'
  phone.setting = function() {
    console.log(this.name)
  }
  return phone
}
var p1 = Phone.createNew()
```

### 1.2 ES6 中的类

**使用关键字 class**

```js
class Phone {
  constructor(name = 'xiaomi'){
    this.name = name 
  }
  sayName(){}
} 
let p1 = new Phone()
console.log(p1)
console.log(p1.name)
console.log(p1 instanceof Phone); 
console.log(p1 instanceof Object); 
console.log(typeof Phone);       
console.log(typeof Phone.prototype.sayName)

let Phone = class PhoneT {
  constructor(name = 'xiaomi'){
    this.name = name 
  }
}
console.log(typeof Phone);
console.log(typeof PhoneT)
```

### 1.3 差别

```js
function StackFunc() {
  let items = [];
  this.push = function push(element) {
    items.push(element);
  };
  this.pop = function pop() {
    return items.pop();
  };
}

class StackClass {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
}
var stackA = new StackFunc();
var stackB = new StackFunc();
console.log(stackA.push == stackB.push);

let stackC = new StackClass()
let stackD = new StackClass()
console.log(stackC.push == stackD.push);
```

> ES5：在ES5中我们声明了一个私有的items变量，它只能被Stack函数或类访问。然而，这个方法为每个类的实例都创建**push和pop方法**的副本。因此，如果要创建多个Stack实例，它就不太适合了。
ES6：**push和pop方法**却是公共的。ES6的类是基于原型的。虽然基于原型的类比基于函数的类更节省内存，也更适合创建多个实例，却不能够声明私有属性（变量）或方法。

```js
class StackClass {
  constructor() {
    this.items = [];
    this.push = function push(element) {
      items.push(element);
    };
    this.pop = function pop() {
      return items.pop();
    };
  }
}
let stackC = new StackClass()
let stackD = new StackClass()
console.log(stackC.push == stackD.push);
```

```js
function StackFunc() {
  this.items = [];
}
StackFunc.prototype.push = function push(element) {
  this.items.push(element);
};
StackFunc.prototype.pop = function pop() {
  return this.items.pop();
};
var stackA = new StackFunc();
var stackB = new StackFunc();
console.log(stackA.push == stackB.push);
```

### 1.4 访问器属性

```js
// ES5
function Parent() {
  this.name  = 'xiaoming';
}
Parent.prototype.get = function (){
  return this.name
}
Parent.prototype.set = function (name){
  this.name = name 
}
let p1 = new name()
console.log('getter',p1.name)
p1.name = 'hello';
console.log('setter',p1.name)

// ES6
class Parent {
  constructor(name = 'xiaoming') {
    this.name = name
  }
  get() {
    return this.name
  }
  set(name) {
    this.name = name
  }
}
let v = new Parent(); 
console.log('getter',v.name)
v.name = 'hello';
console.log('setter',v.name)
```

## 二、静态属性、静态方法、实例属性、实例方法

### 2.1 ES5 静态属性、静态方法、实例属性、实例方法

```js
function Person(name, age) {
  this.name = name // 实例属性，可以通过对象.属性访问的属性叫实例属性
  this.age = age
}

// 静态属性，挂载在构造函数
Person.info = 'nice'

// 实例方法，挂载在原型链，生成的对象可直接点方法的方式调用
Person.prototype.say = function () {
  console.log('实例方法');
}

// 静态方法
Person.show = function () {
  console.log('静态方法');
}

var p1 = new Person('steven', 20)
console.log(p1.name) // 实例属性获取方式
p1.say() // 实例方法调用方式
console.log(Person.info + '-----') // 静态属性调用方式
Person.show() // 静态方法调用方式
```

### 2.2 ES6 静态属性、静态方法、实例属性、实例方法

**静态属性和静态方法用 static 修饰**
**实例访问不到静态，静态也访问不到实例**

```js
class Animal {
  // 类构造器 默认为空
  // 构造器的作用：每当new一个类，会优先执行构造器中代码
  constructor(name, age) {
    // 实例属性
    this.name = name
    this.age = age
  }
  // 静态属性
  static info = 'es6 静态属性'
  // 挂载原型对象上的实例方法
  jump() {
    console.log('es6 实例方法');
    console.log(this.info);
    console.log(this.name);
  }
  static show() {
    console.log('es6 静态方法');
    console.log(this.info);
    console.log(this.name);
  }
}
const a1 = new Animal('大黄', 4)
console.log(a1.name); // 实例属性调用
console.log(Animal.info); // 静态方法
a1.jump() // 实例方法调用
a1.show()
Animal.show() // 静态方法调用

class Dog extends Animal {
  constructor(name,age){
    super(name,age)
  }
}
Animal.prototype.jump();
Dog.__proto__.prototype.jump()
```

- 静态方法只能在当前类上调用，不能被该类的实例对象调用。父类的静态方法可以被子类继承。因此静态方法被调用的方式一共有三种：
1. 父类直接调用
2. 子类继承父类后调用
3. 子类通过super对象调用

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod();  //hello

class Bar extends Foo {
}

class Cla extends Foo {
    return super.classMethod(); //hello
}

Bar.classMethod();  //hello
```

| 对比     |                           静态方法                           |                           实例方法                           |                      构造方法                       |
| -------- | :----------------------------------------------------------: | :----------------------------------------------------------: | :-------------------------------------------------: |
| 关键字   |                            static                            |                              无                              |                     constructor                     |
| 使用场景 |            声明一个仅供当前类或当前子类使用的方法            |               创建实例化对象可以直接调用的方法               |    在用 new 关键字通过此类实例化对象时执行的方法    |
| 使用对象 |                     当前类或当前类的子类                     |             通过该类或该类的子类实例化生成的对象             |                      该类自身                       |
| 调用方法 | 1.父类直接调用;2、子类继承父类后调用;3、子类通过super对象调用 | 1、通过该类及该类的子类实例生成的对象调用;2、该类通过prototype调用;3、该类的子类通过 `__proto__`隐式原型链调用 | 1、该类实例化对象时调用;2、该类的子类使用super |

### 2.3 ES6 中的 constructor

**类的作用在于构建对象，而constructor构造方法就是用于构建对象实例**
> 在使用new关键字生成对象时，constructor方法会被执行，最终return的结果就是生成的对象实例。
当一个类没有constructor方法时会自动生成一个空的constructor方法，返回结果为空。
用new关键字实例化对象时传入的参数会做为constructor构造函数的参数传入。

```js
class Point {
  constructor(name) {
    console.log(name);
  }
}
new Point('testObj');
```

### 2.4 ES6 [单例模式](https://www.jianshu.com/p/5386936acfec)

它是指在一个类只能有一个实例，即使多次实例化该类，也只返回第一次实例化后的实例对象。单例模式不仅能减少不必要的内存开销, 并且在减少全局的函数和变量冲突也具有重要的意义。

```js
class Db {
  static getInstance(){   /*单例*/
    if(!Db.instance){
      Db.instance=new Db();
    }
    return Db.instance;
  }
  constructor(){
    console.log('实例化会触发构造函数');
    this.connect();
  }
  connect(){
    console.log('连接数据库');
  }
  find(){
    console.log('查询数据库');
  }
}
let myDb=Db.getInstance();
let myDb2=Db.getInstance();
let myDb3=Db.getInstance();
let myDb4=Db.getInstance();
myDb3.find();
myDb4.find();
```

### 2.5 探讨：ES5 和 ES6 中的私有属性和私有方法

```js
// ES5 中私有属性、私有方法
function Person() {
  var p = 'zhangsan'
  var sayName = function (){
    console.log(p)
  }
}
// 在 ES6 中实现这个就会比较麻烦，约定俗称的使用下划线来表示私有属性
// 通过 constructor 作用域定义局部变量，实现闭包
class Person {
  constructor(name, age, _age) {
    this.name = name 
    this.age = age
    let _age = _age
    this.sayAge = () =- {
      console.log(_age)
    }
  }
}
let p = new Person('zhangsan', 20, 18)
console.log(p._age)
console.log(p.sayName())
// 虽然实现了私有属性外部不能访问，但是还是又问题：该属性不能在不同的方法里面共享。

// 以下是 js 实现私有属性比较可行的方法，但实际中应用很少，稍微提一下
// 1、Symbol & Getter 这种方式，利用Symbol变量可以作为对象key的特点，
// 但是这种也有问题：借助getOwnPropertySymbols方法可以取出对象的Symbol键值

// 2、WeakMap & Getter 这种方式

// 3、站在巨人的肩膀： TypeScript。 ts 的出现完全整改并简化了 ES6 中的私有属性和方法
// public、private、protected
```



## 三、继承

### 3.1 原理

```js
var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Animal = (function () {
  function Animal() {
  }
  Animal.prototype.Eat = function () {
    window.alert("Animal eat.");
  };
  return Animal;
})();

var Fish = (function (_super) {
  __extends(Fish, _super);
  function Fish() {
    _super.apply(this, arguments);
  }
  Fish.prototype.Eat = function () {
    window.alert("Fish eat.");
  };
  return Fish;
})(Animal)   // 继承谁，就把谁传入
```

### 3.2 ES5 继承

> 继承的方式有很多，举出了几个常见方式:
> **1. 原型链**
> **2. 构造函数**
> **3. 组合式继承**
> **4. 原型式继承**
> **5. 寄生式继承**
> **6. 寄生组合式继承**

#### 3.2.1 原型链继承

**原型链作为实现继承的主要方法，其基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法**

```js
// 原型链实现继承既可以构造里面的属性方法，也可以继承原型链上属性方法
function Person (name){
  this.name = name
  this.run = function (){
    console.log('run' + this.name)
  }
}
Person.prototype.work = function (){
  console.log('work' + this.name)
}
function Child(name){
  this.name = name
}
Child.prototype = new Person('parent')  // 原型链实现继承
Child.prototype.constructor = Child; // 由于Child.prototype继承Parent,导致constructor丢失
let c = new Child('child')
c.run()  // run undefined
c.work() // work undefined
```

**这样会出现一个问题：实例化子类的时候没办法给父类传参**

#### 3.2.2 对象冒充继承

**利用 call 和 apply 实现继承**

```js
function Person (name){
  this.name = name
  this.run = function (){
    console.log('run' + this.name)
  }
}
Person.prototype.work = function (){
  console.log('work' + this.name)
}
// web 类继承 person 类
function Child (name){
  //相当于 Parent 这个函数在 Child 函数中执行了一遍，并且将所有与 this 绑定的变量都切换到了 Child 上
  Person.call(this, name)
}
let c = new Child('child')
c.run() // 正确、对象冒充可以继承构造函数里面的属性和方法
c.work() // 错误、对象冒充不能继承原型链上面的属性和方法
```

**对象冒充不能继承原型链上面的属性和方法**

#### 3.2.3 组合式继承

```js
function Person (name){
  this.name = name
  this.run = function (){
    console.log(this.name + '在run')
  }
}
Person.prototype.work = function(){
  console.log(this.name + '在work');
}
function Child (name){
  Person.call(this,name)  // 第二次调用 把 Person 所有与 this 绑定的变量都切换到了 Child 上
}
Child.prototype = new Person() // 第一次调用 拿到 Person 原型链上的属性和方法
Child.prototype.constructor = Child;
let c = new Child('zhangsan')
c.run()
c.work()
```

>组合式继承是比较常用的一种继承方法，其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。实现了函数复用，又保证每个实例都有它自己的属性。
**但组合继承使用过程中会被调用两次父类：一次是创建子类型的时候，另一次是在子类型构造函数的内部。**
第一次调用构造函数显然是没有必要的，因为第一次调用构造函数时候不需要函数内部的那些实例属性，这么写只是想获得其原型上的方法罢了，所以这时候你可能会这样写:Child.prototype = Parent.prototype
但是这么写显然是又问题的：
**首先，你这样写相当于是子类和父类都指向同一个对象，这时候如果你添加了新的方法给 Child 但实际上 Parent 并不需要，相当于强行给 Parent 添加了一个未知的方法。**
这样又体现不出继承的多态性，比如此时子类想要重写父类的 run 的方法，那么父类的方法也就会随之修改，这显然违背了多态性。

#### 3.2.4 寄生组合式继承

**针对上面的问题：当我们第一次调用构造函数的时候，其实是不管构造函数里面的内容，这是我们可以new一个空函数，将其 prototype 指向 Parent.prototype**

```js
function Person (name){
  this.name = name
}
Person.prototype.run = function(){
  console.log(this.name + '在run --父类方法');
}
function Child (name){
  Person.call(this,name) 
}
function inheritPrototype(Parent, Child) {
  Child.prototype = Object.create(Parent.prototype); 
  Child.prototype.constructor = Child;
}
inheritPrototype(Person, Child)
Child.prototype.run = function (){
  console.log(this.name + '在run --子类方法')
}
Child.prototype.constructor = Child;
let p = new Person('person')
p.run()
let c = new Child('child')
c.run()
```

### 3.3 ES6 继承

>**1. 使用关键字 extends 和 super 来实现。**
>**2. ES6 的继承是 class 的继承。**
>**3. 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工，如果不调用super方法，子类就得不到this对象。因此，只有调用super之后，才可以使用this关键字。**

```js
class Person {
  constructor(name) {
    this.name = name
  }
 	run(){
    console.log(this.name + '在run --父类')
  }
}
class Child extends Person {
  constructor(name) {
    super(name)
  }
}
let c = new Child('child')
c.run()
console.log(Child.__proto__ === Person)
console.log(Child.prototype.__proto__ === Person.prototype)
```

**探讨：当父类和子类有同样方法**

```js
class Person {
  constructor(name) {
    this.name = name
  }
 	run(){
    console.log(this.name + '在run --父类')
  }
}
class Child extends Person {
  constructor(name) {
    super(name)
  }
  run(){
    console.log(this.name + '在run --子类')
  }
}
let c = new Child('child')
c.run()
```

**总结：当父类的方法和子类的方法一致时，首先在子类里面找，然后去父类里面找**
> **构造函数、原型、实例之前的关系：**
> **1. 每个构造函数都有一个原型对象(prototype),**
> **2. 原型对象都包含一个指向构造函数的指针(constructor),**
> **3. 实例都包含一个指向原型对象的内部指针(__propto__)。**

### 3.4 super 和 new.target

**super只能在派生类中使用**

> super 有两种用法：
>**1.作为函数调用**
>**2.作为对象使用**

  ```js
  // 作为函数调用时，代表父类的构造函数
  class A {
    constructor() {
      console.log(new.target.name);
    }
  }
  class B extends A {
    constructor() {
      super();
    }
  }
  new A() // A
  new B() // B
  
  //super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于
  A.prototype.constructor.call(this)
  ```

  ```js
  // super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
  class Parent {
    static parentMethod(msg) {
      console.log('static-parentMethod', msg)
    }
    parentMethod(msg) {
      console.log('parentMethod', msg)
    }
  }
  class Child extends Parent {
    static childMethod(msg) {
      super.parentMethod(msg)
    }
    childMethod(msg) {
      super.parentMethod(msg)
    }
  }
  Child.childMethod('child的静态方法')  // static-parentMethod child的静态方法
  let c = new Child()
  c.childMethod('child的实例方法')  // parentMethod child的实例方法
  ```

  ```js
  // 看这个例子
  class A {
    constructor() {
      this.x = 1;
    }
  }
  class B extends A {
    constructor() {
      super();
      this.x = 2;
      super.x = 3;
      console.log(super.x);  =- A.prototype.x
      console.log(this.x);   =- super.x =- this.x
    }
  }
  let b = new B();
  // 如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
  ```

### 3.5 探讨：定义ES6类方法的差异
>在 ES6 中，有两种普遍的方式定义 class methods，但是他们的行为完全不同
第一种：将 **class methods** 定义为标准的类函数。这种方式，方法定义在类的**原型**上。

```js
class A {
  foo() {
    console.log('foo from A')
  }
}
```

>第二种：方法其实是定义在构造函数内的，即直接定义在实例上的，而不是构造函数的原型上。

```js
class A {
  foo = () =- {
    console.log('foo from A')
  }
}
```

- 区别很明显：第一个它将函数调用的`this`变量绑定到了函数定义范围中的`this`变量。使用第二种方式定义，this被绑定到了当前的`类的实例`对象上。

- 我们可以不使用箭头函数，使用标准的**class method**也能实现相同的功能，只是需要在构造函数内进行额外的绑定。

```js
class A {
  constructor() {
    this.foo = this.foo.bind(this)
  }
  foo() {
    console.log('foo from A')
  }
}
```

- 现在问题来了：下列两种定义的类是否具有相同的行为？

```js
class A {
  constructor() {
    this.foo = this.foo.bind(this)
  }
  foo() {
    console.log('foo from A')
  }
}

class A {
  foo = () =- {
    console.log('foo from A')
  }
}
```

- 答案：不是完全相同，当存在继承的时候，两者的行为完全不同。看例子

```js
class A {
  constructor() {
    this.foo = this.foo.bind(this)
  }
  foo() {
    console.log('foo from A')
  }
}
class B extends A {
  foo() {
    super.foo()
    console.log('foo from B')
  }
}
new B().foo()
// foo from A
// foo from B
```

```js
// 接下来我们使用箭头函数
class A {
  foo = () =- {
    console.log('foo from A')
  }
}
class B extends A {
  foo = () =- {
    super.foo()
    console.log('foo from B')
  }
}
new B().foo()
```

**总结：当你调用了`super.someFunction`时，都会在`__proto__`中查找`someFunction`关键词。是因为`foo`不在`new B()`实例对象的`__proto__`上。这告诉我们，不能在子类中使用箭头函数**
- class A 中的foo函数，被绑定到了当前的`类的实例`对象上。可以在 A 的实例上访问到 foo 函数。class A 等价于下面的。

```js
class A {
  constructor() {
    this.foo = () =- {
      console.log('foo from A')
    }
  }
}
```

- 那么问题又来了，继承的类的实例怎么拿到父类实例中的方法呢？
1. Object.getPrototypeOf()
2. Object.getOwnPropertyNames()

## 四、原型和原型链

### 4.1 构造函数和实例

```js
function Person (name) {
  this.name = name 
}
let person = new Person('joker')
console.log(person)
```

### 4.2 prototype

1. 每一个函数都有 prototype 这个属性
2. 每一个 js 对象 （null 除外）在创建的时候就会关联一个对象，就是原型对象
3. 而且实例都是从原型链上进行创建

```js
function Person() {}
Person.prototype.name = 'joker'
let p1 = new Person()
let p2 = new Person()
console.log(p1.name)
console.log(p2.name)
console.log(p1.name === p2.name)
```

- 探讨：实现链式调用

```js
// ES5
Number.prototype.add = function(number) {
  if(typeof number !== number) {
    throw new Error('请输入数字')
  }
  return this.valueOf() + number
}
Number.prototype.minus = function(number) {
  if(typeof number !== number) {
    throw new Error('请输入数字')
  }
  return this.valueOf() - number
}
console.log( (5).add(2).minus(3) )

// ES6 
class Sum {
  constructor(number) {
    this.number = number
  }
  add(number) {
    this.number += number
    return this
  }
  minus(number) {
    this.number -= number
    return this
  }
}
let s = new Sum(5)
console.log(s.add(2).minus(3))
```



### 4.3 proto

**每一个 js 对象（null 除外）都具有一个属性 proto，这个属性会指向该对象的原型**

**null 是一个对象，是终点。所以 null 没有原型__proto__了，也不会有任何方法了**

```js
function Person() {}
let p1 = new Person()
console.log(p1.__proto__  === Person.prototype)
```

### 4.4 constructor

**每一个原型都有一个 contructor 属性指向关联的构造函数，即原型指向构造函数**

```js
function Person(){}
console.log(Person === Person.prototype.constructor)
```

```js
function Person(){}
let p = new Person()
console.log(p.__proto__ === Person.prototype)
console.log(Person.prototype.constructor === Person)
console.log(Object.getPrototypeOf(p) === p.__proto__)
console.log(Object.getPrototypeOf(p) === Person.prototype)
console.log(p instanceof Person)
```

### 4.5 实例与原型

```js
function Person() {}
Person.prototype.name = 'zhangsan'
let p = new Person()
console.log(p)
p.name = 'lisi'
console.log(p.name)
delete p.name
console.log(p.name)
```

- 这个例子中，我们给实例对象 p 添加了 name 属性，所以打印 lisi。
- 但当我们删除了 p 的 name 属性后，从 p 中找不到 name 的属性了，就会去 p 的原型，也就是 p.__proto__ 中去找，也就是 Person.prototype 中去找。

### 4.6 原型与原型（原型链）

>其实每个Function都是Object基类的一个实例,所以每个Function上都有一个__proto__指向了Object.prototype.当查找一个实例的属性时，会先从这个实例的自定义属性上找,如果没有的话通过__proto__去实例所属类的原型上去找,如果还没有的话再通过原型（原型也是对象,只要是对象就有__proto__属性）的__proto__到Object的原型上去找,一级一级的找,如果没有就null(Object的__proto__返回null)。
js每一次获取对象中的属性都是一次查询过程，如果在自有属性中找不到就会去原型对象中查找，如果原型对象中还查不到，就回去原型对象的原型中查找，也就是按照原型链查找，直到查找到原型链的顶端，也就是Object的原型。
**只有函数才会有 prototype 属性，只有对象才会有`__proto__`属性**

```js
function Person(){}
console.log(Person.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
```