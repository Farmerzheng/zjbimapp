import axios from "@/utils/request";
const url = '/app'

/**
 * 测站
 */
export function getDevice (params) {
  return axios({
    url: url + '/environment/device',
    method: 'post',
    params: params
  })
}
/**
 * 历史数据
 */
export function getHistoryData (params) {
  return axios({
    url: url + '/environment/historyData',
    method: 'post',
    params: params
  })
}
/**
 * 实时数据
 */
export function getRealtimeData (params) {
  return axios({
    url: url + '/environment/realtimeData',
    method: 'post',
    params: params
  })
}
