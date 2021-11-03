import { createStore } from "vuex";
import * as types from './mutation-types';
import { getItem, setItem } from '@/utils/store';
export default createStore({
  getters: {
    userName: state => state.userName,
    userPhone: state => state.userPhone,
    token: state => state.token,
    deptName: state => state.deptName,
    deptId: state => state.deptId,
    projectId: state => state.projectId,
    projectName: state => state.projectName,
    menuId: state => state.menuId,
    tabbarActive: state => state.tabbarActive,
  },
  state: {
    userName: getItem('userName') || '',
    userPhone: getItem('userPhone') || '',
    token: getItem('token') || '',
    deptName: getItem('deptName') || '',
    deptId: getItem('deptId') || '',
    projectId: getItem('projectId') || '',
    projectName: getItem('projectName') || '',
    menuId: getItem('menuId') || '',
    tabbarActive: getItem('tabbarActive') || '',
  },
  mutations: {
    [types.SET_USER_INFO] (state, value) {
      state.userName = value;
      setItem('userName', value);
    },
    [types.SET_USER_PHONE] (state, value) {
      state.userPhone = value;
      setItem('userPhone', value);
    },
    [types.SET_TOKEN] (state, value) {
      state.token = value;
      setItem('token', value);
    },
    [types.SET_PROJECT_ID] (state, value) {
      state.projectId = value;
      setItem('projectId', value);
    },
    [types.SET_PROJECT_NAME] (state, value) {
      state.projectName = value;
      setItem('projectName', value);
    },
    [types.SET_DEPT_ID] (state, value) {
      state.deptId = value;
      setItem('deptId', value);
    },
    [types.SET_DEPT_NAME] (state, value) {
      state.deptName = value;
      setItem('deptName', value);
    },
    [types.SET_MENU_ID] (state, value) {
      state.menuId = value;
      setItem('menuId', value);
    },
    [types.SET_TABBAR_ACTIVE] (state, value) {
      state.tabbarActive = value;
      setItem('tabbarActive', value);
    },
  },
  actions: {
    login ({ commit }, data) {
      commit(types.SET_TOKEN, data.token);
      commit(types.SET_USER_INFO, data.userName);
      commit(types.SET_USER_PHONE, data.phone);
      commit(types.SET_DEPT_NAME, data.deptName);
      commit(types.SET_DEPT_ID, data.deptId);
      commit(types.SET_PROJECT_NAME, data.projectName);
      commit(types.SET_PROJECT_ID, data.projectId);
    },
    logout ({ commit }) {
      commit(types.SET_USER_INFO, '')
      commit(types.SET_USER_PHONE, '')
      commit(types.SET_TOKEN, '')
      commit(types.SET_DEPT_NAME, '');
      commit(types.SET_DEPT_ID, '');
      commit(types.SET_PROJECT_NAME, '');
      commit(types.SET_PROJECT_ID, '');
      localStorage.clear()
      sessionStorage.clear()
    }
  },
  modules: {}
});
