### 造成边框变粗的原因:
其实这个原因很简单，因为css中的1px并不等于移动设备的1px，这些由于不同的手机有不同的像素密度。在window对象中有一个devicePixelRatio属性，他可以反应css中的像素与设备的像素比。
devicePixelRatio的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。

### 解决边框变粗的7种办法
#### 1、0.5px边框

> 解决方案是通过 JavaScript 检测浏览器能否处理0.5px的边框，如果可以，给html标签元素添加个class。

    if (window.devicePixelRatio && devicePixelRatio >= 2) {
      var testElem = document.createElement('div');
      testElem.style.border = '.5px solid transparent';
      document.body.appendChild(testElem);
    if (testElem.offsetHeight == 1) {
      document.querySelector('html').classList.add('hairlines');
    }
      document.body.removeChild(testElem);
    }

    div {
      border: 1px solid #bbb;
    }
    .hairlines div {
      border-width: 0.5px;
    }

#### 2、使用border-image实现
> 准备一张符合你要求的border-image

底部边框

    .border-bottom-1px {
      border-width: 0 0 1px 0;
      -webkit-border-image: url(linenew.png) 0 0 2 0 stretch;
      border-image: url(linenew.png) 0 0 2 0 stretch;
    }

**上文是把border设置在边框的底部，所以使用的图片是2px高，上部的1px颜色为透明，下部的1px使用视觉规定的border的颜色。**

上下边框

    .border-image-1px {
      border-width: 1px 0;
      -webkit-border-image: url(linenew.png) 2 0 stretch;
      border-image: url(linenew.png) 2 0 stretch;
    }
**这样的方法在非视网膜屏上会出现border显示不出来的现象，于是使用Media Query做了一些兼容**

    .border-image-1px {
      border-bottom: 1px solid #666;
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 2) {
      .border-image-1px {
         border-bottom: none;
         border-width: 0 0 1px 0;
         -webkit-border-image: url(../img/linenew.png) 0 0 2 0 stretch;
         border-image: url(../img/linenew.png) 0 0 2 0 stretch;
       }
    }

#### 3、使用background-image实现

> background-image 跟border-image的方法一样，你要先准备一张符合你要求的图片。然后将边框模拟在背景上。

    .background-image-1px {
      background: url(../img/line.png) repeat-x left bottom;
      -webkit-background-size: 100% 1px;
      background-size: 100% 1px;
    }

这两种的缺点
1. 修改颜色麻烦, 需要替换图片
2. 圆角需要特殊处理，并且边缘会模糊


#### 4、多背景渐变实现

> 与background-image方案类似，只是将图片替换为css3渐变。设置1px的渐变背景，50%有颜色，50%透明。


    .background-gradient-1px {
       background:
         linear-gradient(180deg, black, black 50%, transparent 50%) top left / 100% 1px no-repeat,
         linear-gradient(90deg, black, black 50%, transparent 50%) top right / 1px 100% no-repeat,
         linear-gradient(0, black, black 50%, transparent 50%) bottom right / 100% 1px no-repeat,
         linear-gradient(-90deg, black, black 50%, transparent 50%) bottom left / 1px 100% no-repeat;
    }
    /* 或者 */
    .background-gradient-1px{
       background: -webkit-gradient
                  (linear, 
                  left top, 
                  left bottom, color-stop(.5, transparent), color-stop(.5, #c8c7cc), to(#c8c7cc)) left bottom repeat-x;
       background-size: 100% 1px;
    }

#### 5、使用box-shadow模拟边框

> 利用css 对阴影处理的方式实现0.5px的效果

    .box-shadow-1px {
        box-shadow: inset 0px -1px 1px -1px #c8c7cc;
    }

#### 6、viewport + rem 实现

同时通过设置对应viewport的rem基准值，这种方式就可以像以前一样轻松愉快的写1px了。在devicePixelRatio = 2 时，输出viewport

这种兼容方案相对比较完美，[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)

#### 7、伪类 + transform 实现

> 原理是把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位。

单条border样式设置：

    .scale-1px{
      position: relative;
      border:none;
    }
    .scale-1px:after{
      content: '';
      position: absolute;
      bottom: 0;
      background: #000;
      width: 100%;
      height: 1px;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
    }

四条boder样式设置:

    .scale-1px{
      position: relative;
      margin-bottom: 20px;
      border:none;
    }
    .scale-1px:after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #000;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-transform-origin: left top;
      transform-origin: left top;
    }

最好在使用前也判断一下，结合 JS 代码，判断是否 Retina 屏：
    
    if(window.devicePixelRatio && devicePixelRatio >= 2){
      document.querySelector('ul').className = 'scale-1px';
    }
优点：
1. 所有场景都能满足
2. 支持圆角(伪类和本体类都需要加border-radius)

缺点：对于已经使用伪类的元素(例如clearfix)，可能需要多层嵌套