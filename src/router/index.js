import Vue from 'vue';
import VueRouter from 'vue-router';

import dailyRouter from './dailyRouter';

import {Error} from 'e-admin';

const Index = () =>
  import ( /* webpackChunkName: "index" */ '@/views/Index.vue');
const Intro = () =>
  import ( /* webpackChunkName: "index" */ '@/views/home/Intro.vue');
const Update = () =>
  import ( /* webpackChunkName: "update" */ '@/views/update/Update.vue')

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '',
          component: Intro,
        },
        {
          path: '/error/:code',
          name: 'Error',
          component: Error,
          props: true,
          meta: {
            tabs: true,
          },
        },
        {
          path: '/update',
          name: 'Update',
          component: Update,
        },
        ...dailyRouter,
        {
          path: '*',
          redirect: '/error/404',
        },
      ],
    },
  ],
});

/**
 * 路由meta规范
 meta: {
    childrenAgent: false, // 是否代理子路由 设定为true在tabs及nav-menu中子路由激活的是当前路由
    tabs: {               // 自定义路由tabs 设定为false 不在tabs显示这个路由
      title: '',
      icon: '',
      src: '',
    },
  },
 */

export default router;