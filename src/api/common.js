import request from "@/utils/request";
const service_url = '/app'
import { version } from '@/config/index'


// 获取菜单
export function getMenuList (params) {
  return request({
    url: service_url + "/menu/getMenuByUser",
    method: "post",
    params
  });
}
// 获取公司
export function getDeptList () {
  return request({
    url: service_url + "/getRoleDeptList",
    method: "post"
  });
}
// 获取项目
export function getProjectList () {
  return request({
    url: service_url + "/getUserProject",
    method: "post"
  });
}

export function queryModelsByProjectId (data) {
  return request({
    url: service_url + "/queryModelsByProjectId",
    method: 'post',
    params: data
  })
}

export function getVideoToken (params) {
  return request({
    url: service_url + "/queryVideoToken",
    method: 'post',
    params: params
  })
}
export function getVersion (params) {
  return request({
    url: service_url + "/H5version",
    method: 'post',
    params: {
      version: version
    }
  })
}
