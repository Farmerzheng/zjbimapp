import request from "@/utils/request";
const service_url = '/app'
// 首页轮播图
export function getSwiperList() {
  return request({
    url: service_url + "/getSlideShow",
    method: "post"
  });
}
// 首页轮播图
export function getPhoneNumberList() {
  return request({
    url: service_url + "/addressBook",
    method: "post"
  });
}
// 首页轮播图
export function testApi() {
  return request({
    url: "/control/IOT/pipes/getPipes",
    method: "post"
  });
}
