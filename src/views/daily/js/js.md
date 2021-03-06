# JS 数据类型涉及的面试题

- #### **1、JS有哪些原始数据类型**
##### 7种原始数据类型：String、Number、Boolean、Undefined、Null、Object、Symbol
##### 其中 String、Number、Boolean、Undefined、Null 属于值类型，Object 属于引用类型，Symbol 是 ES6 中新增的数据类型代表独一无二。

- #### **2、除了上述数据类型还有哪些？**
##### 因为 JS 所有事物都是对象，所以除了上述7种类型，还有 Array、Function、Date、正则、Set、Map等。

- #### **3、值类型与引用类型有什么区别？**
##### JS 数据以栈内存，堆内存存储在内存中，值类型的数据按值存储在栈内存中，引用类型的数据存储的是一个指针，按指针指向堆内存中对应的值。
##### 在赋值操作时，值类型按值传递，引用类型按引用关系传递。

- #### **4、如何判断上述类型？**
##### 值类型的一般实用 typeof，返回其类型值的小写字符串
```js
// 一般值类型的判断（String、Number、Boolean）

let a = 1, b = 'hello', c = true
console.log(typeof a === 'number'); // true
console.log(typeof b === 'string'); // true
console.log(typeof c === 'boolean'); // true

```
##### Undefined 比较特殊，也可以使用 typeof，返回 'undefined'，结合取非来判断
```js
// 是否是Undefined类型

function isUndefined(value){
  if(!value && typeof value === 'undefined') return true
  return false
}

// 衍生：变量是否已经定义，并且是Undefined类型
let isDefined = false, isUndefined = false;
try{
  isDefined = true
  if(!a && typeof a === 'undefined') isUndefined = true
}catch(err){
  isDefined = false
}

console.log(isDefined);
console.log(isUndefined);
```
##### Null 比较特殊，typeof 返回 Object，结合取非来判断
```js
function isNull(value) {
  if(!value && typeof value === 'object') return true
  return false
}
```
##### 对于引用类型的 Object、Array、Function 的判断；
```js
// 数组使用 Array.isArray()
function isArray(value) {
  if(Array.isArray(value)) return true
  return false
}

// 对象的判断
function isObj(value) {
  if(Object.prototype.toString.call(value)  === '[object Object]') return true
  return false
}

// 函数的判断
function isFunction(value) {
  if(typeof value === 'function') return true
  return false
}
```
- #### **5、Undefined 与 Null 有什么区别？**
##### Undefined 表示已经定义但未赋值，Null 代表一个空指针在栈内存中找不到其值地址指向

- #### **6、如何判断空对象？**
##### 1、使用序列化 JSON.stringify()，判断是否强等于 '{}'
```js
let obj = {}
console.log(JSON.stringify(obj) === '{}')
```
##### 2、Object.getOwnPropertyNames(obj)返回不包括原型上的所有自身属性（包括不可枚举的属性）
```js
let obj = {}
console.log(Object.getOwnPropertyNames(obj).length === 0)
```
##### 3、Object.keys(obj)返回不包括原型上的可枚举属性，即自身的可枚举属性
```js
let obj = {} 
console.log(Object.keys(obj).length === 0)
```

- #### **7、如何判断对象是否有某个属性？**
##### 使用 ES6 中的 hasOwnProperty()，来判断是否存在某个属性
```js
let obj = {
  a:1,
  b:3,
  c:'hello'
}
console.log(obj.hasOwnProperty('c'))
console.log(obj.hasOwnProperty('d'))
```

- #### **8、数组都有哪些常用的方法**
##### 常见的有 push()、shift()、pop()、unshift()、slice()、splice()、toString()、reverse()、map()、forEach()
##### 还有一些数组操作的高阶函数 sort()、filter()、every()、some()、reduce()等。

- #### **9、map()与 forEach()有什么相同处，什么不同处？**
##### 都可以对数组进行遍历，不可以使用 break、continue 跳出遍历
##### 不同点是：
##### map() 遍历数组时，需要 return 每个子项，本身不改变原数组，返回一个新数组
##### forEach() 遍历数组时，遍历中不需要 return

- #### **10、slice()与 splice()有什么区别？**
##### slice() 从原有数组中返回选定的元素，语法为 ArrayObject.slice(start[,end])，结果返回新数组
##### splice() 删除数组指定元素，并可以添加新的元素，返回被删除的项目，改变原有数组，语法为：ArrayObject.splice(index,howmany[,item1,....itemX])

- #### **11、简述 reduce()的使用**
##### reduce() 接收一个函数作为累加器并指定初始值，然后为数组中的每一个元素依次执行回调函数，
##### 回调函数有4个参数：初始值（上一次回调的返回值），当前元素值，当前索引，原数组。数组元素的求和就可以使用reduce() 简单实现。

- #### **12、普通函数与构造函数有什么区别？**
##### 定义方式不同：
> ##### 1. 普通函数通过 function fName(){} 来定义，函数名一般小写，内部一般都有返回值，使用时直接调用
> ##### 2. 构造函数使用 new 关键字 new Function FName() 来定义，函数名一般大写，内部一般没有返回值

##### 内部 this 指向不同：
> ##### 1. 普通函数非严格模式指向 window，严格模式指向 undefined
> ##### 2. 构造函数内部 this 指向创建的对象实例本身

##### 返回值不同：
> ##### 1. 普通函数使用 return 时，返回具体返回值，无 return 时，返回 undefined
> ##### 2. 构造函数一般无返回值，调用后返回实例本身，有返回值时，return 值类型时，返回忽略此值，return 引用类型时，返回该引用类型，而不是创建的实例本身
```js
// 普通函数
function foo() {
  console.log(this === window)
  return 'foo'
}
console.log(foo()) // 返回值是 foo
// true
// foo

// 构造函数
function Bar() {
  this.name = 'bar'
  console.log(this) // this 指向实例本身： { name: 'bar' }
}
let bar = new Bar()
console.log(bar) // 返回实例本身
console.log(bar.name) // 返回实例下的属性值

// { name: 'bar' }
// { name: 'bar' }
// 'bar'
```
- #### **13、Set、Map 是什么？**
##### 都是 ES6 中提供的新的数据结构
> ##### Set 类似于数组，成员值都是唯一的，没有重复值。本身是构造函数，使用 new Set() 生成 Set 数据结构
> ##### 实例本身有 construct、size 属性
> ##### 实例方法：add(value) 添加成员值、delete(value) 删除成员值、has(value) 判断是否为成员值、clear() 清除所有成员值
> ##### 3个遍历器生成的函数和1个遍历方法：
> ##### keys():返回一个键名遍历器
> ##### values():返回一个键值遍历器
> ##### entries(): 返回一个键值对的遍历器
> ##### forEach(): 使用回调函数遍历每个成员


> ##### Map 类似于对象，可以使用各种类型值（包括对象）作为键值。键值只有严格相等才会认为是同一个键值。
> ##### 本身有 size 属性：返回成员总数
> ##### 实例方法：set(key,value)：设置 key 对应的键值，key 已有为更新，无添加、get(value):读取 key 对应的键值、has(value):判断是否存在某键值
> ##### delete(key):删除某个键、clear() 清除所有成员值
> ##### 3个遍历器生成的函数和1个遍历方法：
> ##### keys():返回键名的遍历器
> ##### values():返回键值的遍历器
> ##### entries(): 返回所有成员的遍历器
> ##### forEach(): 遍历 Map 所有成员

- #### **14、Set、Map 与 WeakSet、WeakMap 有什么不同？**
##### WeakSet 结构与 Set类似，也是不重复的值的集合，但是它与 Set 有两个区别：
##### 1. WeakSet 的成员只能是对象，不能是其他类型的值
##### 2. WeakSet 不可遍历
> ##### 因为 WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
> ##### 其他对象都不在引用该对象时，垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象是否还存在与 WeakSet 中。


##### WeakMap 与 Map 结构基本类似，只接受对象作为键名（null 除外），不接受其他类型的值作为键名，而且键名所指向的对象不计入垃圾回收机制。
##### 无 size 属性，无遍历方法，无法清空，键名不计入引用，只有4个方法：get()、set()、has()、delete()
