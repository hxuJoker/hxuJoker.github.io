#EaHeader 头部组件
内置常用中后台页头功能

<slot></slot>

###collapse
展示`collapse`按钮，控制左侧边栏是否折叠，如配置请确保全局使用同一变量

<slot name="collapse"></slot>

###nav-data
页面导航菜单配置文件，`breadcrumbs`默认按路由`matched`展示，传入此参数可以按照设定的关系展示面包屑

<slot name="navData"></slot>

###notice
展示`notice`按钮，点击后触发`command('notice')`

<slot name="notice"></slot>

###fullscreen
展示全屏缩放功能按钮

<slot name="fullscreen"></slot>


<slot name="table"></slot>
