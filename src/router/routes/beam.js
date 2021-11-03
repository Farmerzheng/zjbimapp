export default [
  {
    path: '/beam',
    name: 'beam',
    meta: {
      title: '梁场管理',
      index: 1
    },
    component: () => import("@/views/beam/main.vue")
  }, {
    path: '/beamPanorama',
    name: 'beamPanorama',
    meta: {
      title: '全景地图',
      index: 1
    },
    component: () => import("@/views/beam/beam-panorama.vue")
  }, {
    path: '/beamErectionTaskDetail',
    name: 'beamErectionTaskDetail',
    meta: {
      title: '架梁计划详情',
      index: 1
    },
    component: () => import("@/views/beam/beam-erection-task-detail.vue")
  }, {
    path: '/beamMakingTaskDetail',
    name: 'beamMakingTaskDetail',
    meta: {
      title: '制梁计划详情',
      index: 1
    },
    component: () => import("@/views/beam/beam-making-task-detail.vue")
  }, {
    path: '/beamErectionTask',
    name: 'beamErectionTask',
    meta: {
      title: '架梁计划',
      index: 1
    },
    component: () => import("@/views/beam/beam-erection-task.vue")
  }, {
    path: '/beamMakingTask',
    name: 'beamMakingTask',
    meta: {
      title: '制梁计划',
      index: 1
    },
    component: () => import("@/views/beam/beam-making-task.vue")
  }, {
    path: '/beamMessage',
    name: 'beamMessage',
    meta: {
      title: '我的消息',
      index: 1
    },
    component: () => import("@/views/beam/beam-message.vue")
  }, {
    path: '/beamTask',
    name: 'beamTask',
    meta: {
      title: '我的任务',
      index: 1
    },
    component: () => import("@/views/beam/beam-task.vue")
  }, {
    path: '/beamScan',
    name: 'beamScan',
    meta: {
      title: '扫码填报',
      index: 1
    },
    component: () => import("@/views/beam/beam-scan.vue")
  }, {
    path: '/beamProgressAdd',
    name: 'beamProgressAdd',
    meta: {
      title: '进度填报',
      index: 1
    },
    component: () => import("@/views/beam/beam-progress-add.vue")
  }, {
    path: '/beamProgressEdit',
    name: 'beamProgressEdit',
    meta: {
      title: '进度填报修改',
      index: 1
    },
    component: () => import("@/views/beam/beam-progress-edit.vue")
  }, {
    path: '/beamState',
    name: 'beamState',
    meta: {
      title: '状态追踪',
      index: 1
    },
    component: () => import("@/views/beam/state.vue")
  }, {
    path: '/beamReportData',
    name: 'beamReportData',
    meta: {
      title: '工序信息',
      index: 1
    },
    component: () => import("@/views/beam/beam-report-data.vue")
  }, {
    path: '/beamPedestal',
    name: 'beamPedestal',
    meta: {
      title: '台座',
      index: 1
    },
    component: () => import("@/views/beam/beam-pedestal.vue")
  }, {
    path: '/beamMaking',
    name: 'beamMaking',
    meta: {
      title: '制梁分析',
      index: 1
    },
    component: () => import("@/views/beam/beam-making.vue")
  }, {
    path: '/beamErection',
    name: 'beamErection',
    meta: {
      title: '架梁分析',
      index: 1
    },
    component: () => import("@/views/beam/beam-erection.vue")
  }]
