import axios from "@/utils/request";
const url = '/labour/app'


// 进退场
export function getAttendanceList (params) {
  return axios({
    url: url + '/attendance/realTime/list',
    method: 'post',
    params: params
  })
}
// 安全教育
export function getSafetyTrainingList (params) {
  return axios({
    url: url + '/safetyTraining/list',
    method: 'post',
    params: params
  })
}
// 劳务人员
export function getPersonList (params) {
  return axios({
    url: url + '/person/list',
    method: 'post',
    params: params
  })
}
