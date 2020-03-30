import Vue from 'vue';
import VueRouter from 'vue-router';

import Router from './router/index';

import {Error} from 'e-admin';

const Index = () =>
  import ( /* webpackChunkName: "index" */ '@/views/Index.vue');
const Intro = () =>
  import ( /* webpackChunkName: "index" */ '@/views/home/Intro.vue');
const Update = () =>
  import ( /* webpackChunkName: "update" */ '@/views/update/Update.vue');
const Header = () =>
  import ( /* webpackChunkName: "ea-header" */ '@/views/header/Header.vue');
const View = () =>
  import ( /* webpackChunkName: "ea-view" */ '@/views/view/View.vue');
const MultiView = () =>
  import ( /* webpackChunkName: "ea-multi-view" */ '@/views/view/MultiView.vue');
const SingleView = () =>
  import ( /* webpackChunkName: "ea-single-view" */ '@/views/view/SingleView.vue');
const ImageDialog = () =>
  import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/image-dialog/ImageDialog.vue');



const Node = () =>
  import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/node/node.vue');
const Daily = () =>
  import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/daily.vue');
const Es = () =>
  import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/es/es.vue');
const Retina = () =>
  import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/retina/retina.vue');
const Bfc = () =>
  import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/bfc/bfc.vue');
const Ts = () =>
  import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/ts/ts.vue');

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
            tabs: false,
          },
        },
        {
          path: '/update',
          name: 'Update',
          component: Update,
        },
        {
          path: '/header',
          name: 'Header',
          component: Header,
        },
        {
          path: '/view',
          name: 'View',
          component: View,
        },
        {
          path: '/view/multi/:id',
          props: true,
          name: 'MultiView',
          component: MultiView,
        },
        {
          path: '/view/single/:id',
          props: true,
          name: 'SingleView',
          component: SingleView,
          meta:{
            tabs: {
              title: 'SingleView1',
              onOpen(tab) {
                if (tab.route.params.id === '103') {
                  tab.title = 'lucky number';
                }
              },
              onClose() {
              },
            },
          }

        },
        {
          path: '/upload',
          name: 'ImageDialog',
          component: ImageDialog,
        },
        {
          path: '/node',
          name: 'Node',
          component: Node,
        },
        {
          path: '/es',
          name: 'Es',
          component: Es,
        },
        {
          path: '/retina',
          name: 'Retina',
          component: Retina,
        },
        {
          path: '/bfc',
          name: 'Bfc',
          component: Bfc,
        },
        {
          path: '/ts',
          name: 'Ts',
          component: Ts,
        },
        {
          path: '/daily',
          name: 'Daily',
          component: Daily,
        },
        ...Router,
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