import request from "@/utils/request";
const service_url = '/app'
    // 登陆
export function login(data) {
    return request({
        url: service_url + "/login",
        method: "post",
        params: data
    });
}
// 登出
export function logout() {
    return request({
        url: service_url + "/logout",
        method: "post"
    });
}