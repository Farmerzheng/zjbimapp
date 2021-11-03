<template>
  <layout title="进度统计详情">
    <van-tabs>
      <van-tab title="累计">
      
        <ali-chart id="acc" :option="state.monOption"></ali-chart>
      </van-tab>
      <van-tab title="月度">
      
        <ali-chart id="mon" :option="state.accOption"></ali-chart>
      </van-tab>
    </van-tabs>
  </layout>
</template>
<style lang="less"></style>
<script>

import { reactive, onBeforeMount, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { getProgressAnalysisMonth } from "@/api/progress-control";
import AliChart from "@/components/AliChart.vue";
// import AliChart2 from "@/components/AliChart2.vue";
import { option } from "./statistic-detail-config";
export default defineComponent({
  components: { AliChart },
  setup() {
    const state = reactive({ 
      accX: [],
      accY1: [],
      monX: [],
      monY1: [],
      monOption: null,
      accOption: null,
    });

    // 创建路由对象
    const route = useRoute();

    const initData = async () => {
      let params = {
        // 通过路由接收到上一级传过来的code
        code3: route.query.code3,
        type: 1
      }
      let accRes = await getProgressAnalysisMonth(params)

      // console.log(accRes.data);
      // 遍历累计统计数据
      accRes.data.forEach((curr) => {
        state.accX.push(curr.monthDate);
        state.accY1.push(curr.total);
      });
      params.type = 0;
      let monRes = await getProgressAnalysisMonth(params);

      // 遍历月度统计数据
      // console.log(monRes.data);
      monRes.data.forEach((curr) => {
        state.monX.push(curr.monthDate);
        state.monY1.push(curr.total);
      });
    };
    onBeforeMount(async () => {
      // 初始化数据
      await initData();

      // console.log(option);
      let accOption = JSON.parse(JSON.stringify(option));
      // console.log(accOption);

      accOption.xAxis.data = state.accX;
      accOption.series[0].data = state.accY1;
      // console.log(accOption);
      state.accOption = accOption;

      let monOption = JSON.parse(JSON.stringify(option));
      monOption.xAxis.data = state.monX;
      monOption.series[0].data = state.monY1;
      // console.log(monOption);
      state.monOption = monOption;

    });
    return {
      state,
    };
  },
});
</script>
