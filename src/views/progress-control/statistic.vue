<template>
  <layout title="进度统计">
    <van-list :loading="false" :finished="true" finished-text="没有更多了">
      <div class="material-analysis-detail mad__table-head">
        <span>工程</span>
        <span>总数</span>
        <span>当期完成</span>
        <span>开累完成</span>
        <span>当期</span>
        <span>开累</span>
        <span>分部</span>
      </div>
      <div
        class="material-analysis-detail"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        @click="() => toDetail(item)"
      >
        <span>{{ item.sName }}</span>
        <span>{{ item.total }}</span>
        <span>{{ item.dateTotal }}</span>
        <span>{{ item.currTotal }}</span>
        <span>{{ item.dateTotalRatio }}</span>
        <span>{{ item.currTotalRatio }}</span>
        <span>详情</span>
      </div>
    </van-list>
  </layout>
</template>
<style lang="less">
.material-analysis-detail {
  display: grid;
  grid-template-columns: 30% repeat(6,20%);
  // overflow: auto;
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;
}
.mad__table-head {
  background-color: #ddd;
}
.material-analysis-detail span {
  border: 1px solid #eee;
  // overflow: hidden;
  white-space: nowrap;
  // text-overflow: ellipsis;
  display: inline-block;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: #f7f8fa;
}
</style>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProgressAnalysisList } from '@/api/progress-control'
export default {
  setup(props) {
    const state = reactive({
      list: [],
    })
    const router = useRouter()
    const toDetail = (item) => {
      router.push({
        path: '/progressStatisticDetail',
        query: {
          code3: item.code3,
        },
      })
    }
    onMounted(async () => {
      let res = await getProgressAnalysisList()
      state.list = res.data
    })
    return {
      ...toRefs(state),
      toDetail,
    }
  },
}
</script>
