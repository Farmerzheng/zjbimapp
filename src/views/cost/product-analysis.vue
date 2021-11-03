<template>
  <layout title="产值分析">
    <template #right>
      <van-icon name="filter-o" size="22" @click="showSearch" />
    </template>
    <div class="product-head">
      <!-- <van-radio-group direction="horizontal" v-model="state.showModel">
        <van-radio name="1" icon-size="24px">
          图表
          <template #icon>
            <van-icon name="bar-chart-o" />
          </template>
        </van-radio>
        <van-radio name="2" icon-size="24px">
          表格
          <template #icon>
            <van-icon name="apps-o" />
          </template>
        </van-radio>
      </van-radio-group> -->
      <van-radio-group direction="horizontal" v-model="state.showType">
        <van-radio name="1" icon-size="24px">月度</van-radio>
        <van-radio name="2" icon-size="24px">累计</van-radio>
      </van-radio-group>
    </div>
    <div>
      <ali-chart
        v-if="state.showType == 1"
        id="mon"
        height="300px"
        :option="state.monOption"
      ></ali-chart>
      <ali-chart
        v-if="state.showType == 2"
        id="acc"
        height="300px"
        :option="state.accOption"
      ></ali-chart>
    </div>
    <div style="width: 100%; overflow-x: scroll">
      <product-list
        v-if="state.showType == 1"
        :list="state.monList"
      ></product-list>
      <product-list
        v-if="state.showType == 2"
        :list="state.accList"
      ></product-list>
    </div>
    <van-popup
      :show="state.show"
      position="right"
      :style="{ padding: '10px', width: '200px', top: '100px' }"
      @click-overlay="closeSearch"
    >
      <div class="p10">
        <div>
          开始时间<input type="date" v-model="state.params.beginTime" />
        </div>
        <div>结束时间<input type="date" v-model="state.params.endTime" /></div>
      </div>
      <div style="width: 90%; margin: 0 auto">
        <van-button
          type="primary"
          size="small"
          style="width: 50%"
          @click="search"
          >筛选</van-button
        >
        <van-button
          plain
          type="default"
          size="small"
          style="width: 50%"
          @click="clear"
          >重置</van-button
        >
      </div>
    </van-popup>
  </layout>
</template>
<style lang="less">
.product-head {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<script>
import { reactive, onBeforeMount, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import {
  getProductAnalysisAccumulation,
  getProductAnalysisMonth,
} from '@/api/cost'
import AliChart from '@/components/AliChart.vue'
import ProductList from './product-list.vue'
import { accOption, monOption } from './product-analysis'
import { Toast } from 'vant'
export default defineComponent({
  components: { AliChart, ProductList },
  setup() {
    const state = reactive({
      accX: [],
      accY1: [],
      accY2: [],
      accY3: [],
      monX: [],
      monY1: [],
      monY2: [],
      monY3: [],
      accOption: {},
      monOption: {},
      accList: [],
      monList: [],
      showType: '1',
      showModel: '1',
      show: false,
      params: {
        beginTime: '',
        endTime: '',
      },
    })
    const route = useRoute()
    const showSearch = () => (state.show = true)
    const closeSearch = () => (state.show = false)
    const search = () => {
      state.show = false
      initData()
    }
    const clear = () => {
      state.params.beginTime = ''
      state.params.endTime = ''
    }
    const initData = async () => {
      let params = {
        costGuid: route.query.guid,
        ...state.params,
      }
      let accRes = await getProductAnalysisAccumulation(params)
      if (accRes.code !== 0) {
        Toast.fail(accRes.msg)
        return
      }
      state.accList = accRes.data
      accRes.data.forEach((curr) => {
        state.accX.push(curr.monthDate)
        state.accY1.push(curr.payment)
        state.accY2.push(curr.plan)
        state.accY3.push(curr.reality)
      })
      let monRes = await getProductAnalysisMonth(params)
      if (monRes.code !== 0) {
        Toast.fail(monRes.msg)
        return
      }
      state.monList = monRes.data
      monRes.data.forEach((curr) => {
        state.monX.push(curr.monthDate)
        state.monY1.push(curr.payment)
        state.monY2.push(curr.plan)
        state.monY3.push(curr.reality)
      })

      accOption.xAxis.data = state.accX
      accOption.series[0].data = state.accY1
      accOption.series[1].data = state.accY2
      accOption.series[2].data = state.accY3
      monOption.xAxis.data = state.monX
      monOption.series[0].data = state.monY1
      monOption.series[1].data = state.monY2
      monOption.series[2].data = state.monY3
      state.accOption = accOption
      state.monOption = monOption
    }
    onBeforeMount(async () => {
      await initData()
    })
    return {
      state,
      showSearch,
      closeSearch,
      search,
      clear,
    }
  },
})
</script>
