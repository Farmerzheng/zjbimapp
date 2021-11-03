<template>
  <div class="nav-header">
    <van-nav-bar
      fixed
      title="选择项目"
      left-text="返回"
      left-arrow
      @click-left="$router.back"
    />
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="item in state.list"
        :key="item"
        class="project-list-item"
        @click="() => projectItemSelect(item)"
      >
        <van-image width="100%" height="100%" :src="item.picture"></van-image>
        <span class="project-list-item__title">{{ item.projectName }}</span>
      </div>
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
.active {
  border: 1px solid red;
}
.project-list-item {
  box-shadow: 0 0 6px rgba(54, 54, 54, 0.6);
  width: 90%;
  height: 100px;
  margin: 15px auto;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  .project-list-item__title {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    background-color: rgba(54, 54, 54, 0.6);
    color: #fff;
    padding-left: 10px;
    text-align: center;
  }
}
</style>
<script>
import { reactive } from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import { getProjectList } from '@/api/common'
import { Toast } from 'vant'
import * as types from '@/store/mutation-types'
export default {
  name: 'SelectProject',
  setup(props) {
    const state = reactive({
      loading: true,
      finished: false,
      list: [],
    })
    const router = useRouter()
    const store = useStore()
    const projectItemSelect = (item) => {
      store.commit(types.SET_PROJECT_ID, item.sysProjectId)
      store.commit(types.SET_PROJECT_NAME, item.projectName)
      router.push({path:'/selectDept'})
    }
    const onLoad = async () => {
      state.loading = true
      try {
        let res = await getProjectList()
        // debugger
        if (res.code == 0) {
          state.list = res.data
        }
        console.log('success')
      } catch (error) {
        Toast.fail('请求失败')
      } finally {
        console.log('finally')
        state.loading = false
        state.finished = true
      }
    }
    return {
      state,
      projectItemSelect,
      onLoad,
    }
  },
}
</script>
