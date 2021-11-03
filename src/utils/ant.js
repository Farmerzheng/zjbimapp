import {Button} from 'vant'
const ant = {
  install(Vue) {
    Vue.component(Button.name, Button);
  }
};
export default ant;
