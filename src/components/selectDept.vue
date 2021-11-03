<template>
  <div class="nav-header">
    <van-nav-bar
      fixed
      title="选择公司"
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
      <van-cell
        v-for="item in state.list"
        :key="item"
        :title="item.deptName"
        is-link
        @click="() => deptItemSelect(item)"
      />
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getDeptList } from '@/api/common'
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
    const deptItemSelect = (item) => {
      store.commit(types.SET_DEPT_ID, item.deptId)
      store.commit(types.SET_DEPT_NAME, item.deptName)
      router.replace({ path: '/home/my' })
    }
    const onLoad = async () => {
      state.loading = true
      try {
        let res = await getDeptList()
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
      deptItemSelect,
      onLoad,
    }
  },
}
</script>
