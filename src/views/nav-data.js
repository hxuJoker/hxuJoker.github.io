import dailyList from './daily-list'
export default [
  {
    title: '首页',
    path: '/',
    icon: 'el-icon-s-home',
  },
  {
    title: '更新日志',
    path: '/update',
    icon: 'el-icon-s-promotion',
  },
  {
    title: '看板',
    path: '/router',
    icon: 'el-icon-monitor',
  },
  {
    title: '组件',
    icon: 'el-icon-s-grid',
    children: [
      {
        title: '头部组件',
        path: '/header',
        icon: 'iconfont icon-header',
      },
      {
        title: '页面组件',
        path: '/view',
        icon: 'iconfont icon-view',
        children: [
          {
            title: 'MultiView',
            path: '/view/multi/:id',
            onOpen(tab) {
              // eslint-disable-next-line no-console
              console.log('tab-open:nav-data', tab);
              if (tab.route.params.id === '103') {
                tab.title = 'lucky number';
              }
            },
            onClose(tab) {
              // eslint-disable-next-line no-console
              console.log('tab-close:nav-data', tab);
            },
            visible: false,
          },
          {
            title: 'SingleView',
            path: '/view/single/:id',
            visible: false,
          },
        ],
      },
      {
        title: 'upload',
        path: '/upload',
        icon: 'el-icon-picture-outline',
      },
    ],
  },
  {
    title:'文档',
    icon: 'el-icon-document',
    children:dailyList
  },
  {
    title: '错误页面',
    icon: 'el-icon-warning',
    children: [
      {
        title: '404',
        path: '/error/404',
      },
      {
        title: '403',
        path: '/error/403',
      },
    ],
  },
];