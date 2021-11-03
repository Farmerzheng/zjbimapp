const getRoutes = () => {
  // 动态路由名称映射表
  let modules = import.meta.glob('../router/routes/*.js');
  let routes = [];
  Object.keys(modules).forEach(path => {
    let pathMatch = path.match(/^\.\.\/router\/routes\/(.+)\.js/);
    let fileName = pathMatch[1];
    if (['home', 'common'].includes(fileName)) {
      return;
    }
    modules[path]().then((mod) => {
      routes = routes.concat(mod.default);
    })
  })
  return routes;
}
export {
  getRoutes
}
