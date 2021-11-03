<template>
  <layout title="架梁计划">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="erection-task-list"
    >
      <div
        class="erection-task-list-item"
        v-for="item in state.list"
        :key="item"
        @click="() => toDetail(item)"
      >
        <div class="erection-task-list-item__head">
          名称：{{ item.lineName }}<br>
          编号：{{ item.lineNo }}
        </div>
        <div>
          起始墩号：{{ item.startPierNo }}; 终点墩号：{{
            item.endPierNo
          }};
          梁段数量：{{ item.beamCount }}
        </div>
      </div>
    </van-list>
  </layout>
</template>
<style lang="scss">
.erection-task-list {
  padding: 16px;
  &-item {
    border: 1px solid #333;
    border-bottom-width: 0;
    margin-bottom: 10px;
    & > div {
      border-bottom: 1px solid #333;
      line-height: 24px;
      // height: 24px;
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
import { beamLine } from '@/api/beam'
export default {
  name: 'BeamErectionTask',
  setup(props) {
    const state = reactive({
      loading: false,
      finished: false,
      list: [],
    })
    const router = useRouter()
    const getList = async (params) => {
      let res = await beamLine(params)
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
        path: '/beamErectionTaskDetail',
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
