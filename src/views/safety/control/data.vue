<template>
  <layout title="测点数据">
    <!-- wang 添加右侧按钮 -->
    <template #right>
      <button class="add-btn" @click='toAddSurveyData'>+</button>
    </template>
    <van-search
      v-model="state.value"
      show-action
      placeholder="请输入搜索关键词"
      @update:model-value="onSearch"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in state.list"
        :key="index"
        :title="item.name"
        @click="() => toDetail(item)"
      />
    </van-list>
  </layout>
</template>
<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { getMeasurePointList } from "@/api/control";
export default {
  setup() {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
      value: "",
    });
    const router = useRouter();
    const onLoad = async () => {
      let res = await getMeasurePointList();
      // console.log(res.data)
      state.list = res.data;
      // 加载状态结束
      state.loading = false;
      state.finished = true;
    };
    const toDetail = (item) => {
      // console.log()
      router.push({ path: "/surveyDataPoint", query: { guid: item.guid } });
    };
    const toAddSurveyData = ()=>{
       router.push({ path: "/nextSurveyData"});
    }
    const onSearch = async (val) => {
      state.list = [];
      let res = await getMeasurePointList({
        name: val,
      });
      state.list = res.data;
    };
    const onCancel = () => {};

    return {
      state,
      onLoad,
      toDetail,
      onSearch,
      onCancel,
      toAddSurveyData
    };
  },
};
</script>
<style scoped>
.add-btn {
  border: none;
  font-size: 0.6rem;
  outline: none;
}
</style>