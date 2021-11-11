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
        <div class="pedestal-list-item-num">
          <div class="pedestal-list-item-num__left">
            {{ item.pedestal[1] }}
          </div>
          <div class="pedestal-list-item-num__right">
            <div
              class="pedestal-list-item__right-module"
              v-for="(pe, index) in parseInt(item.pedestal[0])"
              :key="index"
            >
              <span
                @click="() => toDetail(item.structure[index])"
                class="pedestal-list-item__right-module-active"
                v-if="index < item.structure.length"
                >{{ item.structure[index] }}</span
              >
              <span v-else>空闲</span>
            </div>
          </div>
        </div>
        <div class="name">
          {{ item.pedestal[2] }}
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
        pedestalName: ""
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
  margin: 10px;
  // border: 1px solid red;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 3px;
  font-size: 16px;
  align-items: center;
  &-num {
    &__left {
      flex-shrink: 0;
      width: 100px;
    }
    &__right {
      flex-grow: 1;
      border: 1px dashed #ddd;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      &-module {
        // border: 1px dashed #ddd;
        border-bottom: 1px dashed #ddd;
        overflow: hidden;
        & > span {
          display: inline-block;
          padding: 5px;
        }
        &-active {
          background-color: #ddd;
          width: 100%;
          font-weight: bold;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
