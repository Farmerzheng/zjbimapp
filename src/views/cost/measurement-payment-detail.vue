<template>
  <layout title="计量支付详情">
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="material-analysis-detail mad__table-head">
        <span>清单编号</span>
        <span>项目名称</span>
        <span>合同单价</span>
        <span>合同数量</span>
        <span>合同金额</span>
        <span>申报数量</span>
        <span>申报金额</span>
      </div>
      <div
        class="material-analysis-detail"
        v-for="(item, index) in state.list"
        :key="index"
        :item="item"
      >
        <span>{{ item.number }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.billOfQuantities }}</span>
        <span>{{ item.quantities }}</span>
        <span>{{ item.money }}</span>
        <span>{{ item.amount }}</span>
        <span>{{ item.cost }}</span>
      </div>
    </van-list>
  </layout>
</template>
<style lang="less">
.material-analysis-detail {
  display: grid;
  grid-template-columns: 40% 50% 20% 20% 30% 20% 30%;
}
.mad__table-head span{
  background-color: #ddd;
}
.material-analysis-detail span {
  border: 1px solid #eee;
  line-height: 28px;
  text-align: center;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
}
</style>
<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getMeasurementPaymentDetail } from '@/api/cost'
export default {
  setup() {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
    })
    const route = useRoute()
    const onLoad = async () => {
      // 异步更新数据
      let params = {
        guid: route.query.guid
      }
      let res = await getMeasurementPaymentDetail(params)
      res.data.forEach((ele) => {
        state.list.push(ele)
      })
      state.loading = false
      state.finished = true
    }
    return {
      state,
      onLoad,
    }
  },
}
</script>
