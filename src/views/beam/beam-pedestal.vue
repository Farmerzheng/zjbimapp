<template>
  <layout title="台座" :left-arrow="true">
    <div class="pedestal-search">
      <van-field
        v-model="params.pedestalNo"
        placeholder="请输入台座编号"
        @input="search"
        @clear="search"
        @blur="search"
        clickable
        clearable
      ></van-field>
      <van-field
        v-model="params.pedestalName"
        placeholder="请输入台座名称"
        @input="search"
        @clear="search"
        @blur="search"
        clickable
        clearable
      ></van-field>
    </div>
    <van-list
      :loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="pedestal-list-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="pedestal-list-item-left">
          <div class="pedestal-list-item-left-top">{{ item.pedestal[1] }}</div>
          <div class="pedestal-list-item-left-bottom">
            {{ item.pedestal[2] }}
          </div>
        </div>
        <div
          class="pedestal-list-item-right"
          v-for="(item2, index) in item.structure"
          :key="index"
        >
          <div class="num">{{ item2 }}</div>
          <div class="title">{{ item.structureName[index] }}</div>
        </div>
      </div>
    </van-list>
    <div style="position: fixed; bottom: 0; width: 100%">
      <van-button
        type="primary"
        style="width: 100%; letter-spacing: 2px"
        @click="() => (scanbarShow = true)"
        >扫码查询</van-button
      >
    </div>
    <scan
      v-if="scanbarShow"
      @go-back="() => (scanbarShow = false)"
      @success="scanSuccess"
    ></scan>
  </layout>
</template>
<script>
import { reactive, onMounted, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { beamPedestal } from "@/api/beam";
import AliSelect from "@/components/AliSelect.vue";
import Scan from "@/components/scan.vue";
export default {
  components: { Scan, AliSelect },
  setup(props) {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
      params: {
        pedestalType: "",
        pedestalNo: "",
        pedestalName: "",
      },
      scanbarShow: false,
    });
    const router = useRouter();
    const route = useRoute();
    state.params.pedestalType = route.query.pedestalType;
    const onLoad = async () => {
      if (state.finished) {
        state.loading = false;
        return;
      }
      console.log(state.params);
      let res = await beamPedestal(state.params);
      console.log(res);
      state.list = res.data;
      state.loading = false;
      state.finished = true;
    };
    const scanSuccess = async (value) => {
      state.scanbarShow = false;
      state.loading = true;
      state.finished = false;
      state.params.pedestalNo = value;
      // let params = Object.assign({ pedestalNo: value }, state.params)
      let res = await beamPedestal(state.params);
      console.log(res.data.length);
      if (res.code != 0) {
        Toast(res.msg);
        return;
      } else {
        // console.log(res.data)
        state.list = res.data;
        state.loading = false;
        state.finished = true;
      }
    };
    const toDetail = (guid) => {
      router.push({
        path: "/beamReportData",
        query: {
          code1: guid,
          title: "台座信息",
        },
      });
    };
    const search = async () => {
      state.loading = true;
      state.finished = false;
      await onLoad();
    };
    onMounted(async () => {});
    return {
      ...toRefs(state),
      onLoad,
      toDetail,
      search,
      scanSuccess,
    };
  },
};
</script>
<style lang="less" scoped>
.pedestal-search {
  & > div {
    box-shadow: 0 0 0.13333rem rgb(0 0 0 / 30%);
    border-radius: 0.13333rem;
    margin: 0.3rem;
    width: auto;
  }
}
.pedestal-list-item {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 3px;
  font-size: 0.4rem;
  line-height: 0.8rem;

  &-left {
    font-weight: bold;
    width: 4rem;
    flex: none;
    border-right: 1px solid #aaa;
    padding: 0 0.2rem;
    & > div {
    }
  }
  &-right {
    padding: 0 0.2rem;
  }
}
</style>
