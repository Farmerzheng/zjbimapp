export default [{
  path: "/environmentDetail",
  name: 'environmentDetail',
  meta: {
    title: "环境监测",
    index: 1
  },
  component: () => import("@/views/safety/environment/detail.vue")
}, {
  path: "/environmentDevice",
  name: 'environmentDevice',
  meta: {
    title: "测站数据",
    index: 1
  },
  component: () => import("@/views/safety/environment/index.vue")
}, {
  path: "/realname",
  name: 'realname',
  meta: {
    title: "实名制管理",
    index: 1
  },
  component: () => import("@/views/safety/realname/main.vue")
}, {
  path: "/safetyTrainingAdd",
  name: 'safetyTrainingAdd',
  meta: {
    title: "安全教育添加",
    index: 1
  },
  component: () => import("@/views/safety/realname/safety-training-form.vue")
}, {
  path: "/safetyTraining",
  name: 'safetyTraining',
  meta: {
    title: "安全教育",
    index: 1
  },
  component: () => import("@/views/safety/realname/safety-training.vue")
}, {
  path: "/person",
  name: 'person',
  meta: {
    title: "劳务人员",
    index: 1
  },
  component: () => import("@/views/safety/realname/person.vue")
}, {
  path: "/attendance",
  name: 'attendance',
  meta: {
    title: "进退场管理",
    index: 1
  },
  component: () => import("@/views/safety/realname/attendance.vue")
}, {
  path: '/safetyQuestionStatistics',
  name: 'safetyQuestionStatistics',
  meta: {
    title: '统计分析',
    index: 1
  },
  component: () => import("@/views/safety/statistics.vue")
}, {
  path: '/addSafetyQuestion',
  name: 'addSafetyQuestion',
  meta: {
    title: '填报问题',
    index: 1
  },
  component: () => import("@/views/safety/addQuestion.vue")
}, {
  path: '/safetyQuestionDetail',
  name: 'safetyQuestionDetail',
  meta: {
    title: '问题详情',
    index: 1
  },
  component: () => import("@/views/safety/detail.vue")
}, {
  path: '/safetyQuestionListByme',
  name: 'safetyQuestionListByme',
  meta: {
    title: '我的问题',
    index: 1
  },
  component: () => import("@/views/safety/listByme.vue")
}, {
  path: '/safetyQuestionList',
  name: 'safetyQuestionList',
  meta: {
    title: '问题列表',
    index: 1
  },
  component: () => import("@/views/safety/list.vue")
}, {
  path: '/safetyQuestion',
  name: 'safetyQuestion',
  meta: {
    title: '问题整改',
    index: 1
  },
  component: () => import("@/views/safety/safe.vue")
}, {
  path: '/video',
  name: 'video',
  meta: {
    title: '视频监控',
    index: 1
  },
  component: () => import("@/views/safety/video.vue")
}]
