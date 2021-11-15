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

    // 验证token是否失效，若果失效，返回登录页面

    // 构造字面量对象时使用展开语法 ...obj
    // 如果对象的键名和变量名一致，直接把变量名扔入对象即可
    config.params = { ...config.params, token, projectId, id }

    // console.log(config.params);
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
