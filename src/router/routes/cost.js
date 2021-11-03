export default [
  {
    path: '/productAnalysis',
    name: 'productAnalysis',
    meta: {
      title: '产值分析',
      index: 1
    },
    component: () => import("@/views/cost/product-analysis.vue")
  },
  {
    path: '/measurementPayment',
    name: 'measurementPayment',
    meta: {
      title: '计量支付',
      index: 1
    },
    component: () => import("@/views/cost/measurement-payment.vue")
  },
  {
    path: '/measurementPaymentDetail',
    name: 'measurementPaymentDetail',
    meta: {
      title: '计量详情',
      index: 1
    },
    component: () => import("@/views/cost/measurement-payment-detail.vue")
  },
  {
    path: '/materialsAnalysisDetail',
    name: 'materialsAnalysisDetail',
    meta: {
      title: '材料节超分析详情',
      index: 1
    },
    component: () => import("@/views/cost/materials-analysis-detail.vue")
  },
  {
    path: '/materialsAnalysis',
    name: 'materialsAnalysis',
    meta: {
      title: '材料节超分析',
      index: 1
    },
    component: () => import("@/views/cost/materials-analysis.vue")
  }]
