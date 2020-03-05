#   [Nodejs](http://nodejs.cn/api/)

###  一、Hello World

创建 node 文件，并执行的过程：

- 创建js脚本文件 （尽量不要使用 node.js 和中文来进行命名）
- 打开终端，定位到脚本目录
- 输入 node 文件名，执行对应的文件

### 二、Node中的模块化
#### 2.1 模块分类
- 核心模块：在 node 为 js 提供了很多服务器级别的 API，这些 API 绝大多数都被包装到了一个具名的核心模块中，加载核心模块需要用到 require() 方法
- 用户自定义模块
- 第三方模块：art-template

#### 2.2 什么是模块化

- 具有文件作用域  (模块作用域)
- 具有通信规则 ：加载和导出(即使用 require 和 exports)

