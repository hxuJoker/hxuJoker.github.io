## BFC的概念
#### BFC的概念

> 块级格式化上下文（Block Formatting Context）是web页面的可视化CSS渲染的一部分，是块盒子的布局过程发成的区域，也是浮动元素与其他元素交互的区域。 
> 它是一个独立的渲染区域，**只有块级元素参与**，它规定了内部的Block level Box如何布局，并且与这个区域外部毫不相干。

#### BFC能解决的问题
1. 浮动定位
2. 消除外边距折叠
3. 清除浮动
4. 自适应多栏布局

#### BFC的创建
1. 根元素获包含根元素的元素
2. 浮动元素（float不为none）
3. 绝对定位元素（position为absolute或者fixed）
4. display为inline-block,table-cell,table-caption
5. overflow值不为visible
6. 弹性布局（flex）
7. 网格布局（grid）

#### BFC的应用
1.防止margin重叠


    <body>
      <p>top</p>
      <p>bottom</p>
    </body>
    <style>
    p {
      width: 100px;
      height: 100px;
      background: yellow;
      line-height: 100px;
      margin: 10px;
      text-align: center;
    }
    </style>

**两个p中的间距为10px，而不是20px，因为他们处于同一个BFC，解决方案是给第二个p再包一层div，设置其overflow属性**


    <body>
      <p>top</p>
      <div>
    	<p>bottom</p>
      </div>
    </body>
    <style>
    p {
      width: 100px;
      height: 100px;
      background: yellow;
      line-height: 100px;
      margin: 10px;
      text-align: center;
    }
    
    div	{
      overflow: auto;
    }
    </style>

2.让浮动内容与周围内容登高（本质：清除浮动）



    <div class="box">
      <div class="float">浮动元素</div>
      <p>未浮动元素</p>
    </div>
    <style>
    .box {
      background-color: rgb(224, 206, 247);
      border: 5px solid rebeccapurple;
    }
    
    .float {
      float: left;
      width: 200px;
      height: 150px;
      background-color: white;
      border:1px solid black;
      padding: 10px;
    }      
    </style>


**由于浮动，使得浮动元素的高度高于旁边的元素，解决方式为使父box生成一个BFC，如下：**


    <div class="box">
      <div class="float">浮动元素</div>
      <p>未浮动元素</p>
    </div>
    <style>
    .box {
      background-color: rgb(224, 206, 247);
      border: 5px solid rebeccapurple;
      overflow: auto;
    }
    
    .float {
      float: left;
      width: 200px;
      height: 150px
      background-color: white;
      border:1px solid black;
      padding: 10px;
    }      
    </style>


