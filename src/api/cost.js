import axios from "@/utils/request";
const url = '/cost/app'

/**
 * 计量支付台账查询
 */
export function getMeasurementPaymentList (params) {
  return axios({
    url: url + '/costMeasurementPayment/list',
    method: 'post',
    params: params
  })
}
/**
 * 计量支付台账详情
 */
export function getMeasurementPaymentDetail (params) {
  return axios({
    url: url + '/costMeasurementPayment/detail',
    method: 'post',
    params: params
  })
}

/**
 * 材料节超分析
 */
export function getMaterialsAnalysis (params) {
  return axios({
    url: url + '/materialsAnalysis',
    method: 'post',
    params: params
  })
}
/**
 * 材料节超分析按月度统计
 */
export function getMaterialsAnalysisAccumulation (params) {
  return axios({
    url: url + '/materialsAnalysis/accumulation',
    method: 'post',
    params: params
  })
}
/**
 * 材料节超分析按月统计
 */
export function getMaterialsAnalysisMonth (params) {
  return axios({
    url: url + '/materialsAnalysis/month',
    method: 'post',
    params: params
  })
}

/**
 * 累计产值析按月统计
 */
export function getProductAnalysisAccumulation (params) {
  return axios({
    url: url + '/productAnalysis/accumulation',
    method: 'post',
    params: params
  })
}
/**
 * 累计产值分析按月统计
 */
export function getProductAnalysisMonth (params) {
  return axios({
    url: url + '/productAnalysis/month',
    method: 'post',
    params: params
  })
}

