import request from "@/utils/request";
const url = '/control/app'

/**
 * 监控报告
 */
export function getReportFormList(params) {
  return request({
    url: url + '/reportForm/list',
    method: 'post',
    params: params
  })
}
/**
 * 监控指令
 */
export function getInstructionList(params) {
  return request({
    url: url + '/instruction/list',
    method: 'post',
    params: params
  })
}
/**
 * 测点列表
 */
export function getMeasurePointType(params) {
  return request({
    url: url + '/measurePoint/type',
    method: 'post',
    params: params
  })
}
/**
 * 测点列表
 */
export function getMeasurePointList(params) {
  return request({
    url: url + '/measurePoint/list',
    method: 'post',
    params: params
  })
}
/**
 * 下一级测点
 */
export function nextMeasurePoint(params) {
  return request({
    url: url + '/structure/select',
    method: 'post',
    params: params
  })
}
/**
 * 测点类型
 */
 export function measurePointType(params) {
  return request({
    url: url + '/measurePoint/type',
    method: 'post',
    params: params
  })
}
/**
 * 添加测点数据
 */
 export function addMeasurePoint(params) {
  return request({
    url: url + '/measurePoint/add',
    method: 'post',
    params: params
  })
}
/**
 * 测点数据查询
 */
export function getPointDataList(params) {
  return request({
    url: url + '/measurePoint/pointDataList',
    method: 'post',
    params: params
  })
}
/**
 * 测点数据添加
 */
export function pointDataAdd(params) {
  return request({
    url: url + '/pointDataAdd',
    method: 'post',
    params: params
  })
}
/**
 * 预警信息查询
 */
export function getWaringList(params) {
  return request({
    url: url + '/waringList',
    method: 'post',
    params: params
  })
}
/**
 * 预警信息查询
 */
export function getWaringStatistics(params) {
  return request({
    url: url + '/waringStatistics',
    method: 'post',
    params: params
  })
}
/**
 * 预警信息处理
 */
export function waringHandle(params) {
  return request({
    url: url + '/waringHandle',
    method: 'post',
    params: params
  })
}
/**
 * 测点统计分析
 */
export function getDataStatistics(params) {
  return request({
    url: url + '/measurePoint/dataStatistics',
    method: 'post',
    params: params
  })
}
/**
 * 测点统计分析字典查询
 */
export function getstaticsDict(params) {
  return request({
    url: url + '/staticsDict',
    method: 'post',
    params: params
  })
}