<template>
  <layout title="材料节超分析详情">
    <van-tabs>
      <van-tab title="累计">
        <ali-chart id="acc" :option="state.accOption"></ali-chart>
      </van-tab>
      <van-tab title="月度">
        <ali-chart id="mon" :option="state.monOption"></ali-chart>
      </van-tab>
    </van-tabs>
  </layout>
</template>
<style lang="less"></style>
<script>
import { reactive, onBeforeMount, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import {
  getMaterialsAnalysisAccumulation,
  getMaterialsAnalysisMonth,
} from '@/api/cost'
import AliChart from '@/components/AliChart.vue'
import { accOption, monOption } from './materials-analysis-detail'
export default defineComponent({
  components: { AliChart },
  setup() {
    const state = reactive({
      accX: [],
      accY1: [],
      accY2: [],
      monX: [],
      monY1: [],
      monY2: [],
      accOption: {},
      monOption: {},
    })
    const route = useRoute()

    const initData = async () => {
      let params = {
        costGuid: route.query.guid,
      }
      let accRes = await getMaterialsAnalysisAccumulation(params)
      accRes.data.forEach((curr) => {
        state.accX.push(curr.monthDate)
        state.accY1.push(curr.planCostSum)
        state.accY2.push(curr.realityCostSum || 0)
      })
      let monRes = await getMaterialsAnalysisMonth(params)
      monRes.data.forEach((curr) => {
        state.monX.push(curr.monthDate)
        state.monY1.push(curr.planCostSum)
        state.monY2.push(curr.realityCostSum || 0)
      })
    }
    onBeforeMount(async () => {
      await initData()
      accOption.xAxis.data = state.accX
      accOption.series[0].data = state.accY1
      accOption.series[1].data = state.accY2
      monOption.xAxis.data = state.monX
      monOption.series[0].data = state.monY1
      monOption.series[1].data = state.monY2
      state.accOption = accOption
      state.monOption = monOption
    })
    return {
      state,
    }
  },
})
</script>
