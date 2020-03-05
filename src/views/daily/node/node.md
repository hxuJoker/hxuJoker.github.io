# [Nodejs](http://nodejs.cn/api/)

###  一、Hello World
1. 创建js脚本文件 （尽量不要使用 node.js 和中文来进行命名）
2. 打开终端，定位到脚本目录
3. 输入 node 文件名，执行对应的文件

### 二、Node中的模块化
#### 2.1 模块分类
1. 核心模块：在 node 为 js 提供了很多服务器级别的 API，这些 API 绝大多数都被包装到了一个具名的核心模块中，加载核心模块需要用到 require() 方法
2. 用户自定义模块
3. 第三方模块：(第三方包)

#### 2.2 什么是模块化

1. 具有文件作用域  (模块作用域)
2. 具有通信规则 ：加载和导出(即使用 require 和 exports)
#### 2.3 require 和 exports

**通过这两个方法来实现模块与模块之间相互通信**

require有两个方法：

1. **加载文件模块并执行里面的代码**
2. **拿到被加载文件模块导出的接口对象**

```javascript
语法: var 变量 = require('模块')
```
exports：

> Node 中的模块作用域，默认文件中所有的成员只在当前文件模块有限，对于希望可以被其他模块访问的成员，我们需要把这些公开的成员挂载到 exports 接口对象中。
在每一个文件模块中都提供了一个对象 exports ，exports 默认是一个空对象，要做的就是把所有需要被外部访问的成员挂载到这个 exports 对象中。

```javascript
// 导出多个成员 （必须在对象中）
exports.a = 123
exports.b = "hello"
exports.c = function
exports.d = {
foo:"asf"
}
......
// 导出单个成员 (拿到就是：一个函数、字符串...)
module.exports = 'hello'
module.exports = function
// 多个导出会覆盖上一个
// 也可以导出多个成员
module.exports = {
  add:function,
  str:'hello'
}
```
#### 2.4 import 和 require

> Node 编程中最重要的思想就是模块化，`import` 和 `require` 都是被模块化所使用。

##### 2.4.1、遵循规范

>require 是 AMD 规范引入模式。
import 是 ES6 的一个标准语法，如果要兼容浏览器的话必须转成 ES5 的语法。

##### 2.4.2、调用时间

> require 是运行时调用，所以 require 理论上可以运用在代码的任何地方。
import 是编译时调用，所以必须放在文件开头。

##### 2.4.3、本质

> require 是赋值过程，其实 require 的结果就是对象、数字、字符串、函数等，再把 require 的结果赋值给某个变量。
import 是解构过程，但是目前所有的引擎都还没有实现 import，我们在node中使用 babel支持 ES6，也仅仅是将 ES6 转码为 ES5 再执行，import 语法会被转码为 require。

##### 2.4.4、require / exports  和 import / export

> require / exports ：遵循 CommonJS/AMD，只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。用法只有以下三种简单的写法：

  ```javascript
  const fs = require('fs')
  exports.fs = fs
  module.exports = fs
  ```

> import / export：遵循 ES6 规范，支持编译时静态分析，便于JS引入宏和类型检验。动态绑定。写法就比较多种多样：

  ```javascript
  import fs from 'fs'
  import {default as fs} from 'fs'
  import * as fs from 'fs'
  import {readFile} from 'fs'
  import {readFile as read} from 'fs'
  import fs, {readFile} from 'fs'
  
  export default fs
  export const fs
  export function readFile
  export {readFile, read}
  export * from 'fs'
  ```

> 1. 通过require引入基础数据类型时，属于复制该变量。
> 2. 通过require引入复杂数据类型时，数据浅拷贝该对象。
> 3. 出现模块之间的循环引用时，会输出已经执行的模块，而未执行的模块不输出（比较复杂）。
> 4. CommonJS模块默认export的是一个对象，即使导出的是基础数据类型。

```javascript
// 实例
// counter.js
exports.count = 0
setTimeout(function () {
  console.log('increase count to', ++exports.count, 'in counter.js after 500ms')
}, 500)

// commonjs.js
const {count} = require('./counter')
setTimeout(function () {
  console.log('read count after 1000ms in commonjs is', count)
}, 1000)

//es6.js
import {count} from './counter'
setTimeout(function () {
  console.log('read count after 1000ms in es6 is', count)
}, 1000)

➜  test node commonjs.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in commonjs is 0

➜  test babel>node es6.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in es6 is 1
```

#### 2.5 exports 和 module.exports 的区别

##### 2.5.1 原理

每一个模块中都有一个 module 对象，而 module 对象中有一个 exports 对象

```javascript
var module = {
  exports:{
    
  }
}
console.log(exports === module.exports)  // true
```

exports 是 module.exports 的一个引用

```javascript
即：exports.foo = 'bar' 等价于 module.exports.foo = 'bar'
```

> 我们可以把需要导出的成员都挂载到 module.exports 接口对象中，也就是 `module.exports.xxx = xxx` 的形式，很麻烦。。
所以 Node 为了方便，同时在每一个模块中都提供了一个成员叫 exports ，所以对于 `module.exports.xxx = xxx` 的方式，完全可以 `exports.xxx = xxx` 。
当一个模块需要导出单个成员的时候，必须使用 `module.exports = xxx` 的方式，不要使用 `exports = xxx` 不管用。
**因为每个模块最终向外 return 的是 module.exports**，而 exports 是 module.exports 的一个引用 ，所以即便为 `exports  = xx` 重新赋值，也不会影响 module.exports。
但是有一种赋值方式比较特殊： `module.exports = exports` ，这个用来重新建立引用关系

##### 2.5.2 exports 和 module.exports 的实例

```javascript
// 用于理解引用关系 
var obj = {}
var obj1 = obj // {}
obj1.foo = 'bar' // {foo:'bar'}
obj.foo = 'hello' // {foo:'hello'}

obj1 = {}  // {}
obj1.foo = 'world' // {foo:'world'}
console.log(obj.foo); // {foo:'hello'}
```

```javascript
// 实例一
// 也就是说在模块中还有这一句代码,两者一致，说明我可以使用任意一方来导出内部成员
console.log(exports === module.exports) // true
exports.foo = 'bar'
module.exports.add = function(x,y){
  return x + y
}
// {foo:'bar',add:Function}
```

```javascript
// 实例二
// 当一个模块需要导出单个成员的时候，直接给exports赋值是不管用的，和module.exports已经没有关系了
exports = 'hello'   // 赋值语句，这时 exports 和 module.exports 已经没有关系了
exports.foo = 'bar' // 这时只是修改上面的 exports 的值
module.exports.add = function(x,y){
  return x + y
}
//最后输出： {add : Function}
```

```javascript
// 实例三
// 给 exports 重新赋值就不管用，就丢失了引用关系，同理给 module.exports 重新赋值，也会丢失，这里两者脱离关系 exports !== module.exports
module.exports = 'hello' // 重新赋值
exports.foo = 'world' // exports !== module.exports

module.exports = {
  foo:'hello' 
}  									// 覆盖 module.exports = 'hello' 
// 这里重新建立引用关系
exports = module.exports
// 所以 结果为 {foo:'world'}
exports.foo = 'world'  // 修改了 module.exports.foo
```

```javascript
// 实例四
// {foo:'hello'}
exports.foo = 'hello'
// {foo:'hello',a:123}
module.exports.a = 123
// exports !== module.exports
// 最终return的是module.exports
exports = {
  a:456
}
// {foo:'hha',a:123}
module.exports.foo = 'hha'
// 没关系
exports.c = 456
// 重新建立和module.exports的引用关系
exports = module.exports
// {foo:'hha',a:789}
exports.a = 789
```

#### 2.6 fs 模块 (文件系统)

##### 2.6.1 fs.readFile() 读文件

1. 第一个参数：读取的文件路径
2. 第二个参数：回调函数 (error,data)=>{}

> 成功时，data 为读取的数据(文件存储数据类型为：二进制数据)，error 为 Null ，失败时， data 为 Undefined，error 是错误对象。
```javascript
<Buffer e4 bd a0 e5 a5 bd ef bc 8c 6e 6f 64 65>
// 为什么不是二进制数据？是因为二进制转成16进制,我们可以通过toString方法转换成文件中的数据
```

##### 2.6.2 fs.writeFile() 写文件

1. 第一个参数：要写入的路径及文件名称
2. 第二个参数：写入的文件内容或者模板
3. 第三个参数：回调函数 (error,data)=>{}

> 成功时，文件写入成功，error 为 Null ， 失败时，error 为错误对象

##### 2.6.3 fs.mkdir() 创建文件夹

1. 第一个参数：要创建的路径及文件夹名称
2. 第二个参数：回调函数 (error)=>{}

##### 2.6.4 fs.existsSync() 判断文件或文件夹是否存在

- 参数：要判断的文件路径，返回值是一个 Boolean

#### 2.7 Process 进程
- process.argv，属性返回的是一个数组，其中包含启动 Node.js 进程时传递的命令行参数的数组

```javascript
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
// 数组第一项：node的路径
// 数组第二项：编译文件的路径
// 数组第三项：自己写入的内容
```

- process.env，属性返回包含用户环境的对象，在项目中配置文件中经常看到

```javascript
process.env.NODE_ENV = 'development' || 'production'
process.env.VUE_APP_ENV = 'test'
```

#### 2.8 http 模块 (构建web服务器)

##### 2.8.1 创建 http 服务器的过程

1. 加载核心模块 http
2. 使用 http.createServer() 方法来创建一个web实例
3. 服务器提供服务：对数据的服务，发请求，接受请求，处理请求，给反馈(发送响应)
4. 绑定端口号，启动服务器

##### 2.8.2 requset 和 response

> request: 请求对象，可以用来获取客户端的一些请求信息，例如：请求路径
response：响应对象，响应对象可以用来给客户端发送响应信息


> 1、request.url 返回端口号后面的地址
2、response.write() 可以给客户端发送响应数据，write 可以写多次，但是最后一次必须使用 end() 来结束响应，否则客户端会一直等待(浏览器会一直转)。
3、一次写多次 write 也比较麻烦，因为一个请求对应了一个响应，所以推荐使用 end 直接发送数据
4、response.end() 支持两种数据类型，一种是字符串，一种是二进制

##### 2.8.3 Content-Type

在创建服务器后，通过 res.end('你好，node') ，在浏览器中响应的 “你好，node” 会乱码。原因：

> 在服务器默认发送的数据，其实是utf-8编码内容，但浏览器不知道你是 utf-8，所以会乱码。
浏览器在不知道服务器响应内容的编码情况下会按照当前操作系统的默认编码去解析，中文操作系统默认为 gbk。
在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据是什么类型的。
Content-Type 不用的资源对应的 Content-Type 是不一样的，图片不属于指定编码，所以不需要写后端的 charset=utf-8，一般只为字符串数据才指定编码。[编码规则](https://www.runoob.com/http/http-content-type.html)

```javascript
// 写法
res.setHeader('Content-Type','text/plain;charset=utf-8')
res.setHeader('Content-Type','text/html;charset=utf-8')
res.setHeader('Content-Type','image/jpeg')
```

#### 2.9  `__dirname`、`__filename`

> 在每个模块中，除了require exports 等模块相关 api之外，还有两个特殊的非模块成员

- __dirname: 动态获取可以用来获取当前文件模块所属目录的绝对路径
- __filename: 动态获取可以用来获取当前文件的绝对路径



​	**path.join(__dirname,'aaa') 的由来**

- 在文件操作中，使用相对路径是不可靠的，因为在node中文件操作的路径被设计为相对于执行node命令所处的路径。
- 为了解决这个问题，只需要把相对路径变为绝对路径，在拼接路径过程中，推荐多使用path.join(__dirname)来辅助拼接。


```javascript
// 现在有一个文件夹：demo 文件夹
//   demo 文件夹中有一个 data 文件夹，和一个 a.js 文件
//   data 文件夹中有一个 b.txt，和一个 c.js文件

// a.js中
let dataExprots = require('./data/c')

// b.txt中
hello bbb

// c.js中
let fs = require('fs')
fs.readFile('./b.txt','utf8',(err,data)=>{
  console.log(data)
})

// 现在我在 data 文件夹中打开了终端，运行 node c.js
// 现在我在 demo 文件夹中打开了终端，运行 node data/c.js
// 现在我在 demo 文件夹中打开了终端，运行 node a.js
```

```javascript
// 如果我把上面 c.js 改成以下代码
let fs = require('fs')
let path = require('path')
fs.readFile(path.join(__dirname,'b.txt'),'utf8',(err,data)=>{
  console.log(data)
})

// 现在我在 data 文件夹中打开了终端，运行 node c.js
// 现在我在 demo 文件夹中打开了终端，运行 node data/c.js
// 现在我在 demo 文件夹中打开了终端，运行 node a.js

// 总结： ./a.txt 是相对于执行 node 命令所处的终端路径，
// 在文件操作路径中，相对路径设计的就是相对于执行 node 命令所处的路径。
// 但是，引入模块中的路径标识和这里的路径没关系，不受影响，就是相对文件模块
```