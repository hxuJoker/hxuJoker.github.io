// import dailyList from './daily-list'
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
  // {
  //   title:'文档',
  //   icon: 'el-icon-document',
  //   children:dailyList
  // },
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