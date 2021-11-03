import request from "@/utils/request";
const service_url = '/progress/app/qualityThreeInspection'
// 质量三检
export function getList (data) {
  return request({
    url: service_url + "/list",
    method: "post",
    params: data
  });
}
// 质量三检筛选工区和班组
export function getWorkAreaAndTeam (data) {
  return request({
    url: service_url + "/queryWorkAreaAndTeam",
    method: "post",
    params: data
  });
}
// 质量添加初始化参数
export function initPage (data) {
  return request({
    url: service_url + "/addInitPage",
    method: "post",
    params: data
  });
}
// 质量三检获取分部分项
export function getStructureName (data) {
  return request({
    url: service_url + "/getStructureName",
    method: "post",
    params: data
  });
}
// 质量三检状态查询
export function getQueryState (data) {
  return request({
    url: service_url + "/queryState",
    method: "post",
    params: data
  });
}
// 质量三检获取工序
export function getProcess (data) {
  return request({
    url: service_url + "/getProcess",
    method: "post",
    params: data
  });
}
// 质量三检获取详情
export function getInspectionDetail (data) {
  return request({
    url: service_url + "/inspectionDetail",
    method: "post",
    params: data
  });
}
// 质量三检添加
export function addInspection (data) {
  return request({
    url: service_url + "/add",
    method: "post",
    data: data
  });
}
// 质量三检复检和专检
export function retestSpecialSave (data, phoneNum) {
  return request({
    url: service_url + "/edit?phoneNum=" + phoneNum,
    method: "post",
    data: data
  });
}
// 质量三检退回任务节点
export function rollbackSave (data) {
  return request({
    url: service_url + "/rollback/save",
    method: "post",
    params: data
  });
}
// 质量三检退回任务节点
export function getRollbackTaskList (data) {
  return request({
    url: service_url + "/rollback/taskList",
    method: "post",
    params: data
  });
}
// 质量三检上传图片
export function upload (data, file) {
  return request({
    url: service_url + "/addAttachment",
    method: "post",
    data: file,
    params: data
  });
}
// 质量三检上传图片删除
export function deleteFile (data) {
  return request({
    url: service_url + "/deleteAttachment",
    method: "post",
    params: data
  });
}


