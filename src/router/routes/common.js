// 页面路由
const routes = [
  {
    path: '/',
    redirect: '/home/main'
  },
  {
    path: '/webview',
    name: 'webview',
    meta: {
      title: 'webview',
      index: 1
    },
    component: () => import("@/components/webview.vue")
  },
  {
    path: '/historyTask',
    name: 'historyTask',
    meta: {
      title: '已办',
      index: 1
    },
    component: () => import("@/views/task/history.vue")
  },
  {
    path: '/todoTask',
    name: 'todoTask',
    meta: {
      title: '待办',
      index: 1
    },
    component: () => import("@/views/task/todo.vue")
  },
  {
    path: '/fileManager',
    name: 'fileManager',
    meta: {
      title: '文档管理',
      index: 1
    },
    component: () => import("@/views/file/index.vue")
  },
  {
    path: '/processCenter',
    name: 'processCenter',
    meta: {
      title: '流程中心',
      index: 1
    },
    component: () => import("@/views/processCenter.vue")
  },
  {
    path: '/addressBookDetail',
    name: 'addressBookDetail',
    meta: {
      title: '通讯录详情',
      index: 1
    },
    component: () => import("@/views/address-book/detail.vue")
  },
  {
    path: '/addressBook',
    name: 'addressBook',
    meta: {
      title: '通讯录',
      index: 1
    },
    component: () => import("@/views/address-book/index.vue")
  },
  
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      index: 1,
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/selectProject",
    name: 'selectProject',
    meta: {
      title: "选择项目"
    },
    component: () => import("@/components/selectProject.vue")
  },
  {
    path: "/selectDept",
    name: 'selectDept',
    meta: {
      title: "选择公司"
    },
    component: () => import("@/components/selectDept.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    redirect: '/home/main',
    component: () => import("@/views/notFound.vue")
  },
];
export default routes
