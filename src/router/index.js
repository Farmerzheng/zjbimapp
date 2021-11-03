// 
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { getItem } from '@/utils/store';
// import {getRoutes} from '@/utils/async-router'

import quality from './routes/quality'
import safety from './routes/safety'
import common from './routes/common'
import cost from './routes/cost'
import progressControl from './routes/progress-control'
import control from './routes/control'
import home from './routes/home'
import beam from './routes/beam'


const noNeedTokenPaths = ['/quality3InspectionRetest', '/quality3InspectionSpecialTest', '/login']
const router = createRouter({
  history: createWebHashHistory(),
  routes: common,
});
[...quality, ...safety, ...cost, ...progressControl,...control,...beam, ...home].forEach(route => {
  router.addRoute(route)
})

// let routes = getRoutes();
// router.addRoute(routes);
// 路由导航
router.beforeEach((to, from, next) => {
  let token = getItem('token')
  if (token) {
    next()
  } else if (noNeedTokenPaths.includes(to.path)) {
    next()
  } else {
    next('/login')
  }
})

router.afterEach(() => { })
export default router;
