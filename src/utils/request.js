import axios from "axios";
import { getItem } from '../utils/store'
import router from '../router/index'
import store from '../store/index'

const service = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? '/api' : '/',
  timeout: 50000 // request timeout
});
// 发起请求之前的拦截器
service.interceptors.request.use(
  config => {
    // 如果有token 就携带tokon
    const token = getItem("token")
    const projectId = getItem("projectId")
    const id = getItem("deptId")

    // if (token) {
    // config.headers.common.Authorization = token;
    // }
    config.params = { ...config.params, token, projectId, id }
    return config;
  },
  error => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status !== 200) {
      store.dispatch('logout');
      router.replace('/login');
      return Promise.reject(new Error(response.statusText || "Error"));
    } else if (res.code !== 0 && res.code !== 500) {
      store.dispatch('logout');
      // router.replace('/login');
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default service;
