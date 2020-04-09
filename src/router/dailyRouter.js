const Node = () => import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/node/node.vue');
const Daily = () => import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/daily.vue');
const Es = () => import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/es/es.vue');
const Retina = () => import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/retina/retina.vue');
const Bfc = () => import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/bfc/bfc.vue');
const Ts = () => import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/ts/ts.vue');
const Js = () => import ( /* webpackChunkName: "ea-image-dialog" */ '@/views/daily/js/js.vue');
export default [
  {
    path: '/daily',
    name: 'Daily',
    component: Daily,
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
    path: '/js',
    name: 'Js',
    component: Js,
  },
]