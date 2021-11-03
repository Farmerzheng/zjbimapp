import request from "@/utils/request";
const service_url = '/beam/app'


// 基本属性
export function modelPropBasicList (params) {
  return request({
    url: service_url + "/modelPropBasic/list",
    method: "post",
    params
  });
}

// 全景地图
export function panoramaList (params) {
  return request({
    url: service_url + "/panorama/list",
    method: "post",
    params
  });
}
// 制梁计划
export function beamMakingTask (params) {
  return request({
    url: service_url + "/beamMakingTask/list",
    method: "post",
    params
  });
}
// 制梁计划详情
export function beamMakingTaskDetail (params) {
  return request({
    url: service_url + "/beamMakingTaskDetail/list",
    method: "post",
    params
  });
}
// 架梁计划详情
export function beamErectionDetail (params) {
  return request({
    url: service_url + "/beamErectionDetail/list",
    method: "post",
    params
  });
}

// 我的消息
export function messageList (params) {
  return request({
    url: service_url + "/message/list",
    method: "post",
    params
  });
}
// 我的消息状态修改
export function messageEdit (params) {
  return request({
    url: service_url + "/message/edit",
    method: "post",
    params
  });
}
// 我的任务
export function getBeamMakingTaskByUser (params) {
  return request({
    url: service_url + "/getBeamMakingTaskByUser",
    method: "post",
    params
  });
}
// 附件上传
export function uploadFile (params, file) {
  return request({
    url: service_url + "/attachment/addAttachment",
    method: "post",
    data: file,
    params
  });
}
// 附件删除
export function deleteFile (params) {
  return request({
    url: service_url + "/attachment/deleteAttachment",
    method: "post",
    params
  });
}
// 进度填报保存
export function progressReportRomve (params) {
  return request({
    url: service_url + "/progressReport/remove",
    method: "post",
    params
  });
}
// 进度填报保存
export function progressReportEdit (params) {
  return request({
    url: service_url + "/progressReport/edit",
    method: "post",
    params
  });
}
// 进度填报保存
export function progressReportAdd (params) {
  return request({
    url: service_url + "/progressReport/add",
    method: "post",
    params
  });
}
// 进度填报新增初始化
export function progressReportAddInit (params) {
  return request({
    url: service_url + "/progressReport/add/init",
    method: "post",
    params
  });
}
// 进度填报修改初始化
export function progressReportEditInit (params) {
  return request({
    url: service_url + "/progressReport/edit/init",
    method: "post",
    params
  });
}
// 架梁月度统计
export function beamErection (params) {
  return request({
    url: service_url + "/beamErection/month",
    method: "post",
    params
  });
}
// 制梁月度统计
export function beamMaking (params) {
  return request({
    url: service_url + "/beamMaking/month",
    method: "post",
    params
  });
}
// 桥梁线路查询
export function beamLine () {
  return request({
    url: service_url + "/beamLine/list",
    method: "post"
  });
}
//台座信息查询
export function beamPedestal (params) {
  return request({
    url: service_url + "/beamPedestal/list",
    method: "post",
    params
  });
}
//梁座类型查询
export function beamType () {
  return request({
    url: service_url + "/beamType/list",
    method: "post"
  });
}
//字典类型数据查询
export function dictData () {
  return request({
    url: service_url + "/dictData/list",
    method: "post"
  });
}
//状态追踪类信息查询
export function reportData (params) {
  return request({
    url: service_url + "/reportData/list",
    method: "post",
    params
  });
}
//结构查询
export function structure (params) {
  return request({
    url: service_url + "/structure/list",
    method: "post",
    params: params
  });
}
