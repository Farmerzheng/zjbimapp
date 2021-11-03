export default [{

  path: '/qualityQuestionStatistics',
  name: 'qualityQuestionStatistics',
  meta: {
    title: '统计分析',
    index: 1
  },
  component: () => import("@/views/quality/statistics.vue")
},
{
  path: '/addQualityQuestion',
  name: 'addQualityQuestion',
  meta: {
    title: '填报问题',
    index: 1
  },
  component: () => import("@/views/quality/addQuestion.vue")
},
{
  path: '/qualityQuestionDetail',
  name: 'qualityQuestionDetail',
  meta: {
    title: '问题详情',
    index: 1
  },
  component: () => import("@/views/quality/detail.vue")
},
{
  path: '/qualityQuestionListByme',
  name: 'qualityQuestionListByme',
  meta: {
    title: '我的问题',
    index: 1
  },
  component: () => import("@/views/quality/listByme.vue")
},
{
  path: '/qualityQuestionList',
  name: 'qualityQuestionList',
  meta: {
    title: '问题列表',
    index: 1
  },
  component: () => import("@/views/quality/list.vue")
},
{
  path: '/qualityQuestion',
  name: 'qualityQuestion',
  meta: {
    title: '质量问题',
    index: 1
  },
  component: () => import("@/views/quality/main.vue")
}, {
  path: "/quality3InspectionSpecialTest",
  name: "quality3InspectionSpecialTest",
  meta: {
    title: "质量三检专检",
    index: 1,
  },
  component: () => import("@/views/quality-three-inspection/specialTest.vue"),
},
{
  path: "/quality3InspectionRetest",
  name: "quality3InspectionRetest",
  meta: {
    title: "质量三检复检",
    index: 1,
  },
  component: () => import("@/views/quality-three-inspection/reTest.vue"),
},
{
  path: "/quality3InspectionAdd",
  name: "quality3InspectionAdd",
  meta: {
    title: "质量三检添加",
    index: 1,
  },
  component: () => import("@/views/quality-three-inspection/add.vue"),
},
{
  path: "/bim",
  name: "bim",
  meta: {
    title: "BIM模型查看",
    index: 1,
  },
  component: () => import("@/views/quality-three-inspection/bim.vue"),
},
{
  path: "/quality3InspectionDetail",
  name: "quality3InspectionDetail",
  meta: {
    title: "质量三检详情",
    index: 1,
  },
  component: () => import("@/views/quality-three-inspection/detail.vue"),
},
{
  path: "/quality3Inspection",
  name: "quality3Inspection",
  meta: {
    title: "质量三检",
    index: 1,
  },
  component: () => import("@/views/quality-three-inspection/list.vue"),
}]
