import axios from "@/utils/request";
const url = '/progress/app'

/**
 * 进度统计查询
 */
export function getProgressAnalysisList (params) {
  return axios({
    url: url + '/progressAnalysis/total',
    method: 'post',
    params: params
  })
}
/**
 * 进度统计按月查询
 */
export function getProgressAnalysisMonth (params) {
  return axios({
    url: url + '/progressAnalysis/month',
    method: 'post',
    params: params
  })
}
/**
 * 预警查询
 */
export function getProgressWaringList (params) {
  return axios({
    url: url + '/progressWaring/list',
    method: 'post',
    params: params
  })
}
/**
 * 预警模糊搜索
 */
export function getProgressWaringSearch (params) {
  return axios({
    url: url + '/progressWaring/search',
    method: 'post',
    params: params
  })
}
