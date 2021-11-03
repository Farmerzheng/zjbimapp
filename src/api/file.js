import axios from "@/utils/request";
const url = '/file/app'

/**
 * 第一次查询
 */
export function firstList (params) {
  return axios({
    url: url + '/firstList',
    method: 'post',
    params: params
  })
}
/**
 * 查询
 */
export function fileLinks (params) {
  return axios({
    url: url + '/fileLinks',
    method: 'post',
    params: params
  })
}
/**
 * 查询
 */
export function fileSearch (params) {
  return axios({
    url: url + '/fileSearch',
    method: 'post',
    params: params
  })
}
/**
 * 查询
 */
export function fileFolder (params) {
  return axios({
    url: url + '/fileFolder',
    method: 'post',
    params: params
  })
}
//
export function initList (params) {
  return axios({
    url: url + '/initList',
    method: 'post',
    params: params
  })
}
export function fileDrawingFuzzySearch (params) {
  return axios({
    url: url + '/fileDrawingFuzzySearch',
    method: 'post',
    params: params
  })
}
export function fileDrawingFolder (params) {
  return axios({
    url: url + '/fileDrawingFolder',
    method: 'post',
    params: params
  })
}
