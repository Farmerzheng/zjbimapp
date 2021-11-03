<template>
  <layout title="统计分析">
    <van-empty v-if="state.showEmpty" description="暂无内容" />
    <div v-else>
      <ali-chart
        v-for="(key, index) in state.keys"
        :key="index + Math.random()"
        :option="state.options[key]"
        :id="'chart-' + key"
      ></ali-chart>
    </div>
  </layout>
</template>
<script>
import { h, ref, reactive, onUnmounted, onBeforeMount,onMounted } from 'vue'
import AliChart from '@/components/AliChart.vue'
import chartOption from '@/config/chart-option'
import {
  safeQuestionAnalysis,
  getMonthlyQuestionList,
  getDictList,
} from '@/api/qualityQuestion'
import { Toast } from 'vant'
export default {
  components: { AliChart },
  setup(props) {
    const state = reactive({
      options: {},
      keys: [],
      showEmpty: true,
      showLoading: null,
    })
    state.keys = Object.keys(chartOption)
    state.options = chartOption

    //
    const getDictListByType = async (list, type, prop) => {
      let { data } = await getDictList({ dictType: type })
      return data.map((item) => {
        let num = list.filter((itemData) => itemData[prop] == item.dictValue)
        return {
          value: num.length,
          name: item.dictLabel,
        }
      })
    }
    const initData = async () => {
      try {
        let { data } = await safeQuestionAnalysis()
        state.options.status.series[0].data = await getDictListByType(
          data,
          'quality_problem_stasus',
          'status'
        )
        state.options.profession.series[0].data = await getDictListByType(
          data,
          'quality_problem_profession',
          'professionType'
        )
        state.options.level.series[0].data = await getDictListByType(
          data,
          'quality_problem_level',
          'level'
        )
        let res = await getMonthlyQuestionList()
        state.options.monthly.xAxis.data = res.data[0]
        state.options.monthly.series[0].data = res.data[1]
      } catch (error) {
        console.log(error)
      }
    }
    onBeforeMount(async () => {
      state.showLoading = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      })
      await initData()
      state.showEmpty = false
    })
    onMounted(() => {
      state.showLoading && state.showLoading.clear()
    })
    onUnmounted(() => {
      state.showEmpty = true
    })
    return {
      state,
    }
  },
}
</script>
