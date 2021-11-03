import axios from "@/utils/request";
const url = '/quality/app'


// 字典数据查询
export function getDictList (params) {
  return axios({
    url: url + '/safe/dictType',
    method: 'post',
    params: params
  })
}
// 问题查询列表
export function getQuestionList (params) {
  return axios({
    url: url + '/listQuality',
    method: 'post',
    params: params
  })
}

// 问题详情
export function getQuestionDetail (params) {
  return axios({
    url: url + '/qualityDetail',
    method: 'post',
    params: params
  })
}
/**
 * 问题新增
 */
export const addQuestion = async (params) => {
  return await axios({
    url: url + '/quality/add',
    method: 'post',
    params: params
  })
}
/**
 * 问题修改
 */
export const updateQuestion = async (params) => {
  return await axios({
    url: url + '/quality/edit',
    method: 'post',
    params: params
  })
}

export function upload (file, guid) {
  let formData = new FormData()
  formData.append("file", file);
  formData.append("guid", guid);
  return axios({
    url: url + "/upload",
    method: "post",
    data: formData,
  })
}

/**
 * @name: app图片展示
 */
export const getPictureList = async (params) => {
  return await axios({
    url: url + '/pictureShow',
    method: 'post',
    params: params
  })
}
/**
 * @name: 问题流程记录新增
 */
export const addFlowHistory = async (params) => {
  return await axios({
    url: url + '/quality/addFlowHistory',
    method: 'post',
    params: params
  })
}
/**
 * @name: 安全问题流程记录查询
 */
export const getFlowsList = async (params) => {
  return await axios({
    url: url + '/quality/flowsList',
    method: 'post',
    params: params
  })
}
/**
 * @name: 选择人员
 */
export function getUserList (params) {
  return axios({
    url: url + '/user/list',
    method: 'post',
    params: params
  })
}
/**
 * @name: 安全问题分析查询
 */
export function safeQuestionAnalysis (params) {
  return axios({
    url: url + '/qualityAnalysis',
    method: 'post',
    params: params
  })
}
/**
 * @name: 月度安全问题统计
 */
export function getMonthlyQuestionList (params) {
  return axios({
    url: url + '/qualityMonthly',
    method: 'post',
    params: params
  })
}
/**
 * @name: 安全评论新增
 */
export function addComment (params) {
  return axios({
    url: url + '/qualityComment/add',
    method: 'post',
    params: params
  })
}
/**
 * @name: 安全评论查询
 */
export const getCommentList = async (params) => {
  return await axios({
    url: url + '/quality/comment',
    method: 'post',
    params: params
  })
}

/**
 * @name: 安全评论查询
 */
export const getJudgePublic = async (params) => {
  return await axios({
    url: url + '/judgeAuthority',
    method: 'post',
    params: params
  })
}
/**
 * @name: 问题位置查询
 */
export const getStructureName = async (params) => {
  return await axios({
    url: url + '/getStructureName',
    method: 'post',
    params: params
  })
}
/**
 * @name: 待办
 */
export const getToDoTaskList = async (params) => {
  return await axios({
    url: url + '/workbench/toDoTaskList',
    method: 'post',
    params: params
  })
}
/**
 * @name: 已办
 */
export const getHistoryTaskList = async (params) => {
  return await axios({
    url: url + '/workbench/historyTaskList',
    method: 'post',
    params: params
  })
}
