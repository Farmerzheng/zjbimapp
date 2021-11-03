import { getItem } from '@/utils/store'
const token = getItem("token")
const id = getItem("deptId")
let url = 'http://39.97.125.164:8088/portal/'
let dist = ''

if (process.env.NODE_ENV !== 'development') {
  url = 'http://bim.bnerc.com/process/portal/';
  dist = '/zhlcty'
}
// 流程中心页面
export const processUrl = url + 'r/or?cmd=com.actionsoft.apps.workbench_mobile_h5_home_page&oauthName=bnerc&token=' + token + '&code=' + token + '&id=' + id

// 文档管理文件地址配置
export const imageHttpUrl = dist;

// 版本号
export const version = "1.0.4"

