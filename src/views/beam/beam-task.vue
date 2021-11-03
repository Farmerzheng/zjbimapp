<template>
  <layout title="我的任务">
    <van-tabs
      v-model:active="state.tabActive"
      @change="tabChange"
      color="#26a2ff"
      type="card"
    >
      <van-tab :name="1" title="计划开始"></van-tab>
      <van-tab :name="2" title="已开始未完成"></van-tab>
      <van-tab :name="3" title="全部任务"></van-tab>
    </van-tabs>
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="task-list"
    >
      <div class="task-list-item" v-for="item in state.list" :key="item" @click="()=>toDetail(item)">
        <div class="task-list-item__head">梁编码：{{ item.structureCode }}</div>
        <div>计划开始时间：{{ item.startDate }}</div>
        <div>计划结束时间：{{ item.endDate }}</div>
      </div>
    </van-list>
  </layout>
</template>
<style lang="scss">
.task-list {
  padding: 16px;
  &-item {
    border: 1px solid #333;
    border-bottom-width: 0;
    margin-bottom: 10px;
    & > div {
      border-bottom: 1px solid #333;
      line-height: 24px;
      height: 24px;
      font-size: 16px;
    }
    &__head {
      background-color: #ddd;
    }
  }
}
</style>
<script>
import { reactive, ref, onMounted } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { getBeamMakingTaskByUser } from '@/api/beam'
export default {
  name: 'BeamTask',
  setup(props) {
    const state = reactive({
      tabActive: 1,
      params: {
        type: 1,
      },
      loading: false,
      finished: false,
      list: [],
    })
    const router = useRouter()
    const tabChange = (name, title) => {
      state.params.type = name
      onLoad()
    }
    const getList = async (params) => {
      let res = await getBeamMakingTaskByUser(params)
      if (res.code != 0) {
        Toast(res.msg)
        return
      }
      return res
    }
    const onLoad = async () => {
      state.list = []
      state.loading = true
      state.finished = false
      let res = await getList(state.params)
      if (res) {
        state.list = res.data
        state.loading = false
        state.finished = true
      }
    }
    const toDetail = (item) =>{
      router.push({
        path: '/beamReportData',
        query: {
          code1: item.structureCode,
          title: '状态追踪'
        }
      })
    }
    return {
      state,
      tabChange,
      getList,
      onLoad,
      toDetail,
    }
  },
}
</script>
