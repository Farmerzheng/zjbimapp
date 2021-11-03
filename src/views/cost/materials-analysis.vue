<template>
  <layout title="材料节超分析">
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="material-analysis table-head">
        <span>清单</span>
        <span>细目名称</span>
        <span>实际工作量</span>
        <span>计划工作量</span>
        <span>单位</span>
      </div>
      <div
        class="material-analysis"
        v-for="(item, index) in state.list"
        :key="index"
        @click="() => toDetail(item)"
      >
        <span>{{ item.number }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.realityCostSum }}</span>
        <span>{{ item.planCostSum }}</span>
        <span>{{ item.unitMeasurement }}</span>
      </div>
    </van-list>
  </layout>
</template>
<style lang="less" scoped>
.material-analysis {
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;
  display: grid;
  grid-template-columns: 30% 20% 20% 20% 10%;
}
.table-head {
  background-color: #ddd;
}
.material-analysis span {
  border: 1px solid #eee;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getMaterialsAnalysis } from '@/api/cost'
export default {
  setup() {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
    })
    const router = useRouter()
    const onLoad = async () => {
      // 异步更新数据
      if (state.finished) {
        state.loading = false
        return
      }
      let res = await getMaterialsAnalysis()
      state.list = res.data
      state.loading = false
      state.finished = true
    }
    const toDetail = (item) => {
      router.push({
        path: '/materialsAnalysisDetail',
        query: {
          guid: item.costGuid,
        },
      })
    }
    return {
      state,
      onLoad,
      toDetail,
    }
  },
}
</script>
