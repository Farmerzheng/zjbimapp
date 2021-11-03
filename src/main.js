import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import 'lib-flexible/flexible'
import vant from 'vant'
import 'vant/lib/index.css'; // 全局引入样式
import "./utils/rem"

import './css/header.scss';



import Layout from './components/layout.vue'

const app = createApp(App);
app.component('Layout', Layout)
app.use(router)
  .use(store)
  .use(vant)
  .mount('#app');

// 对外路由
(function (r) {
  const go = function () {
    let url = arguments[0]
    let title = arguments[1]
    let regUrl = /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
    if (!url) {
      throw new Error("参数url不存在");
    } else if (!regUrl.test(url)) {
      throw new Error("参数url不符合规范");
    }
    if (!title) {
      throw new Error("参数title不存在");
    }
    r.push({
      name: 'webview',
      params: {
        url: url,
        title: title
      }
    })
  }
  const a = function () {
    go(...arguments)
  }
  window.AppWebviewGo = a
})(router)

var first = null
console.log(app.config.globalProperties.$route)
function goback () {

  if (!window.plus) {
    console.log("plus插件未安装")
    return false;
  }
  plus.key.addEventListener("backbutton", () => {
    let route = app.config.globalProperties.$route;
    // app.config.globalProperties.$toast(route.path);
    if (!(route.path.includes('/home') || route.path.includes('/login'))) {
      router.back()
      return;
    }
    if (!first) {
      first = new Date().getTime() //记录第一次按下回退键的时间
      app.config.globalProperties.$toast('再按一次退出应用')
      setTimeout(function () {
        first = null
      }, 1000)
    } else {
      if (new Date().getTime() - first < 1000) {
        plus.runtime.quit() //那么就退出app
      }
    }
  });
}

document.addEventListener('plusready', function () {
  goback()
}, false)




