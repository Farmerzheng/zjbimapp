// 页面路由
const routes = [
  {
    path: '/',
    redirect: '/home/main'
  },
  {
    path: '/video',
    name: 'video',
    meta: {
      title: '视频监控',
      index: 1
    },
    component: () => import("../views/safety/video.vue")
  },
  {
    path: '/productAnalysis',
    name: 'productAnalysis',
    meta: {
      title: '产值分析',
      index: 1
    },
    component: () => import("../views/cost/product-analysis.vue")
  },
  {
    path: '/measurementPayment',
    name: 'measurementPayment',
    meta: {
      title: '计量支付',
      index: 1
    },
    component: () => import("../views/cost/measurement-payment.vue")
  },
  {
    path: '/measurementPaymentDetail',
    name: 'measurementPaymentDetail',
    meta: {
      title: '计量详情',
      index: 1
    },
    component: () => import("../views/cost/measurement-payment-detail.vue")
  },
  {
    path: '/materialsAnalysisDetail',
    name: 'materialsAnalysisDetail',
    meta: {
      title: '材料节超分析详情',
      index: 1
    },
    component: () => import("../views/cost/materials-analysis-detail.vue")
  },
  {
    path: '/materialsAnalysis',
    name: 'materialsAnalysis',
    meta: {
      title: '材料节超分析',
      index: 1
    },
    component: () => import("../views/cost/materials-analysis.vue")
  },

  {
    path: '/qualityQuestionStatistics',
    name: 'qualityQuestionStatistics',
    meta: {
      title: '统计分析',
      index: 1
    },
    component: () => import("../views/quality/statistics.vue")
  },
  {
    path: '/addQualityQuestion',
    name: 'addQualityQuestion',
    meta: {
      title: '填报问题',
      index: 1
    },
    component: () => import("../views/quality/addQuestion.vue")
  },
  {
    path: '/qualityQuestionDetail',
    name: 'qualityQuestionDetail',
    meta: {
      title: '问题详情',
      index: 1
    },
    component: () => import("../views/quality/detail.vue")
  },
  {
    path: '/qualityQuestionListByme',
    name: 'qualityQuestionListByme',
    meta: {
      title: '我的问题',
      index: 1
    },
    component: () => import("../views/quality/listByme.vue")
  },
  {
    path: '/qualityQuestionList',
    name: 'qualityQuestionList',
    meta: {
      title: '问题列表',
      index: 1
    },
    component: () => import("../views/quality/list.vue")
  },
  {
    path: '/qualityQuestion',
    name: 'qualityQuestion',
    meta: {
      title: '质量问题',
      index: 1
    },
    component: () => import("../views/quality/main.vue")
  },
  {
    path: '/webview',
    name: 'webview',
    meta: {
      title: 'webview',
      index: 1
    },
    component: () => import("../components/webview.vue")
  },
  {
    path: '/fileManager',
    name: 'fileManager',
    meta: {
      title: '文档管理',
      index: 1
    },
    component: () => import("../views/file/index.vue")
  },
  {
    path: '/processCenter',
    name: 'processCenter',
    meta: {
      title: '流程中心',
      index: 1
    },
    component: () => import("../views/processCenter.vue")
  },
  {
    path: '/addressBookDetail',
    name: 'addressBookDetail',
    meta: {
      title: '通讯录详情',
      index: 1
    },
    component: () => import("../views/address-book/detail.vue")
  },
  {
    path: '/addressBook',
    name: 'addressBook',
    meta: {
      title: '通讯录',
      index: 1
    },
    component: () => import("../views/address-book/index.vue")
  },
  {
    path: "/quality3InspectionSpecialTest",
    name: "quality3InspectionSpecialTest",
    meta: {
      title: "质量三检专检",
      index: 1,
    },
    component: () => import("../views/quality-three-inspection/specialTest.vue"),
  },
  {
    path: "/quality3InspectionRetest",
    name: "quality3InspectionRetest",
    meta: {
      title: "质量三检复检",
      index: 1,
    },
    component: () => import("../views/quality-three-inspection/reTest.vue"),
  },
  {
    path: "/quality3InspectionAdd",
    name: "quality3InspectionAdd",
    meta: {
      title: "质量三检添加",
      index: 1,
    },
    component: () => import("../views/quality-three-inspection/add.vue"),
  },
  {
    path: "/bim",
    name: "bim",
    meta: {
      title: "BIM模型查看",
      index: 1,
    },
    component: () => import("../views/quality-three-inspection/bim.vue"),
  },
  {
    path: "/quality3InspectionDetail",
    name: "quality3InspectionDetail",
    meta: {
      title: "质量三检详情",
      index: 1,
    },
    component: () => import("../views/quality-three-inspection/detail.vue"),
  },
  {
    path: "/quality3Inspection",
    name: "quality3Inspection",
    meta: {
      title: "质量三检",
      index: 1,
    },
    component: () => import("../views/quality-three-inspection/list.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      index: 1,
    },
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      index: 1,
      keepAlive: true
    },
    component: () => import("../views/home/index.vue"),
    children: [{
      path: 'main',
      name: 'main',
      meta: {
        index: 2
      },
      component: () => import("../views/home/main.vue")
    }, {
      path: 'cost',
      name: 'cost',
      meta: {
        title: '成本管理',
        index: 1
      },
      component: () => import("../views/cost/main.vue")
    }, {
      path: "safety",
      name: "safety",
      meta: {
        title: "安全管理",
        index: 1,
        keepAlive: true
      },
      component: () => import("../views/safety/main.vue"),
    }, {
      path: "quality",
      name: "quality",
      meta: {
        title: "质量管理",
        index: 1,
        keepAlive: true
      },
      component: () => import("../views/quality-three-inspection/main.vue"),
    }, {
      path: 'about',
      name: 'about',
      meta: {
        index: 2
      },
      component: () => import("../views/home/about.vue")
    }],
  },
  {
    path: "/selectProject",
    name: 'selectProject',
    meta: {
      title: "选择项目"
    },
    component: () => import("../components/selectProject.vue")
  },
  {
    path: "/selectDept",
    name: 'selectDept',
    meta: {
      title: "选择公司"
    },
    component: () => import("../components/selectDept.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    redirect: '/home/main',
    component: () => import("../views/notFound.vue")
  },
];
export default routes
