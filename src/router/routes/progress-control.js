export default [{
  path: "/progressStatistic",
  name: "progressStatistic",
  meta: {
    title: "进度统计",
    index: 1
  },
  component: () => import('@/views/progress-control/statistic.vue')
}, {
  path: "/progressStatisticDetail",
  name: "progressStatisticDetail",
  meta: {
    title: "进度统计详情",
    index: 1
  },
  component: () => import('@/views/progress-control/statistic-detail.vue')
}, {
  path: "/progressChart",
  name: "progressChart",
  meta: {
    title: "进度报表"
  },
  component: () => import('@/views/progress-control/chart.vue')
}, {
  path: "/progressForewarning",
  name: "progressForewarning",
  meta: {
    title: "预警查询"
  },
  component: () => import('@/views/progress-control/forewarning.vue')
}]
