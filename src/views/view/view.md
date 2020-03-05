#EaView 页面组件
建议在所有一级路由页面使用`ea-view`

###页面居中
配置`center`可以让页面居中，支持 `Boolean / Number[px] / String` 默认宽度`1000px`

<slot name="center"></slot>

###(#multi)子页面多页共活解决方案
因为`vue-router`对嵌套路由采用的是组件复用策略，我们必须去实时处理更新的数据，以达到不同条件渲染不同页面的效果。
我这里给出一个简单表单页面作为例子，从`SingleView`的代码上可以看到为了适配多个数据源我已经写了很多无意义的代码，然后你可以尝试多开几个页面之后表单填写不同内容触发验证后再进行切换，能明显感觉到切换痕迹，想消除这种不良体验你得花费更多的代码，效果可能还不尽如人意。

`router.js`
```javascript
const SingleView = () =>
  import ( /* webpackChunkName: "ea-single-view" */ '@/views/view/SingleView.vue');
const MultiView = () =>
  import ( /* webpackChunkName: "ea-multi-view" */ '@/views/view/MultiView.vue');

new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        ...
        {
          path: '/view/single/:id',
          props: true,
          name: 'SingleView',
          component: SingleView,
        },
        {
          path: '/view/multi/:id',
          props: true,
          name: 'MultiView',
          component: MultiView,
        },
      ],
    },
  ],
});
```
<slot name="single"></slot>

`ea-view`尝试使用一个简单的方案解决这个问题，你需要传入`params-key`，对应的是动态路由配置中的参数名。
例如路径是`/view/multi/:id`，那`params-key="id"`
传入这个参数后`ea-view`会捕获匹配路由中的这个参数，维护成一个数组，通过作用域插槽的`keys`参数暴露出来，并把当前激活项暴露为`active`。
我们可以这样使用它们：
```
<template>
  <ea-view :center="600" params-key="id">
    <template v-slot:default="{keys, active}">
      <multi-view-page
          v-for="id in keys"
          v-show="id === active"
          v-bind="$attrs"
          :id="id"
          :key="id"
      />
    </template>
  </ea-view>
</template>
<script>
  import MultiViewPage from './MultiViewPage.vue';

  export default {
    name: 'MultiView',
    components: {MultiViewPage},
  };
</script>
```
这个路由组件的写法基本固定，现在你只需要专心写业务组件`MultiViewPage.vue`了，每个子页面现在都是独立的组件，你不再需要考虑怎么处理动态的数据了。

现在可以尝试多打开几个`MultiView`体验一下效果

<slot name="multi"></slot>

<slot name="table"></slot>