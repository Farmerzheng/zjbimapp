export default [{
  path: "/home",
  name: "home",
  meta: {
    title: "首页",
    index: 1,
    keepAlive: true
  },
  component: () => import("@/views/home/index.vue"),
  children: [{
    path: 'main',
    name: 'main',
    meta: {
      index: 2
    },
    component: () => import("@/views/home/main.vue")
  }, {
    path: 'cost',
    name: 'cost',
    meta: {
      title: '成本管理',
      index: 1
    },
    component: () => import("@/views/cost/main.vue")
  }, {
    path: "safety",
    name: "safety",
    meta: {
      title: "安全管理",
      index: 1,
      keepAlive: true
    },
    component: () => import("@/views/safety/main.vue"),
  }, {
    path: "progress",
    name: "progress",
    meta: {
      title: "进度管理",
      index: 1,
      keepAlive: true
    },
    component: () => import("@/views/progress-control/index.vue"),
  }, {
    path: "quality",
    name: "quality",
    meta: {
      title: "质量管理",
      index: 1,
      keepAlive: true
    },
    component: () => import("@/views/quality-three-inspection/main.vue"),
  }, {
    path: "beam",
    name: "beam",
    meta: {
      title: "梁场管理",
      index: 1,
      keepAlive: true
    },
    component: () => import("@/views/beam/main.vue"),
  }, {
    path: 'my',
    name: 'my',
    meta: {
      index: 2
    },
    component: () => import("@/views/home/about.vue")
  }],
}]
