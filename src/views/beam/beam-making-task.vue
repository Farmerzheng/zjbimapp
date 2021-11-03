<template>
  <layout title="制梁计划">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="making-task"
    >
      <div class="making-task-row making-table-head">
        <span class="">月份</span>
        <span>标题</span>
        <span>技术负责人</span>
        <span>详情</span>
      </div>
      <div
        class="making-task-row"
        v-for="(item, index) in state.list"
        :key="index"
        :item="item"
      >
        <span>{{ item.releaseDate }}</span>
        <span>{{ item.title }}</span>
        <span>{{ item.technologyUser }}</span>
        <span @click="() => toDetail(item)">查看</span>
      </div>
    </van-list>
  </layout>
</template>
<style lang="scss">
.making-task-row {
  display: grid;
  grid-template-columns: 80px auto 100px 80px;
  border-right: 1px solid #999;
}
.making-task-row.making-table-head span {
  background-color: #ddd;
  border-top: 1px solid #999;
}
.making-task-row span {
  border: 1px solid #999;
  border-top-width: 0;
  border-right-width: 0;
  line-height: 28px;
  text-align: center;
}
</style>
<script>
import { reactive, ref, onMounted } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { beamMakingTask } from '@/api/beam'
export default {
  name: 'BeamMakingTask',
  setup(props) {
    const state = reactive({
      tabActive: 0,
      params: {
        isRead: 0,
      },
      loading: false,
      finished: false,
      list: [],
    })
    const router = useRouter()
    const getList = async (params) => {
      let res = await beamMakingTask(params)
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
      let res = await getList()
      if (res) {
        state.list = res.data
        state.loading = false
        state.finished = true
      }
    }
    const toDetail = (item) => {
      router.push({
        path: '/beamMakingTaskDetail',
        query: {
          guid: item.guid,
        },
      })
    }
    return {
      state,
      getList,
      onLoad,
      toDetail,
    }
  },
}
</script>
