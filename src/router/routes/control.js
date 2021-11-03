export default [{
  path: "/survey",
  name: "survey",
  meta: {
    title: "监控监测",
    index: 1
  },
  component: () => import('@/views/safety/control/index.vue')
}, {
  path: "/surveyDataPoint",
  name: "surveyDataPoint",
  meta: {
    title: "测点数据",
    index: 1
  },
  component: () => import('@/views/safety/control/point.vue')
}, {
  path: "/surveyData",
  name: "surveyData",
  meta: {
    title: "监控数据",
    index: 1
  },
  component: () => import('@/views/safety/control/data.vue')
}, {
  path: "/nextSurveyData",
  name: "nextSurveyData",
  meta: {
    title: "下一级监控数据",
    index: 1
  },
  component: () => import('@/views/safety/control/nextSurveyData.vue')
}, {
  path: "/addSurveyData",
  name: "addSurveyData",
  meta: {
    title: "添加测点",
    index: 1
  },
  component: () => import('@/views/safety/control/addSurveyData.vue')
} ,{
  path: "/surveyCommand",
  name: "surveyCommand",
  meta: {
    title: "监控指令",
    index: 1
  },
  component: () => import('@/views/safety/control/command.vue')
}, {
  path: "/surveyReport",
  name: "surveyReport",
  meta: {
    title: "监控报告",
    index: 1
  },
  component: () => import('@/views/safety/control/report.vue')
}]
