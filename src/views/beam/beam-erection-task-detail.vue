<template>
  <layout title="计划详情">
    <van-field
      style="margin-left: 10px"
      v-model="state.params.code1"
      placeholder="请输入"
      @input="search"
      @clear="search"
      @blur="search"
      clickable
      clearable
    ></van-field>
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="erection-detail-list"
    >
      <div
        class="erection-detail-list-item"
        v-for="item in state.list"
        :key="item"
      >
        <div class="erection-detail-list-item__head">
          编号：{{ item.code1 }} , 墩号：{{ item.startPier }}-{{ item.endPier }}
        </div>
        <div>计划开始：{{ item.start_date }}</div>
        <div>计划结束：{{ item.end_date }}</div>
        <div>实际开始：{{ item.actual_start_date }}</div>
        <div>实际结束：{{ item.actual_end_date }}</div>
      </div>
    </van-list>
  </layout>
</template>
<style lang="scss">
.erection-detail-list {
  // padding: 16px;
  &-item {
    // border: 1px solid #333;
    border-bottom-width: 0;
    margin-bottom: 10px;
    & > div {
      // border-bottom: 1px solid #333;
      padding: 0 16px;
      line-height: 24px;
      height: 24px;
      font-size: 16px;
    }
    &__head {
      background-color: #ddd;
    }
  }
}
</style>
<script>
import { reactive, ref, onMounted } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { beamErectionDetail } from '@/api/beam'
export default {
  name: 'BeamErectionTaskDetail',
  setup(props) {
    const state = reactive({
      loading: false,
      finished: false,
      list: [],
      params: {
        parentId: '',
        code1: '',
      },
    })
    const router = useRouter()
    const route = useRoute()
    state.params.parentId = route.query.guid
    const getList = async (params) => {
      let res = await beamErectionDetail(params)
      if (res.code != 0) {
        Toast(res.msg)
        return
      }
      return res
    }
    const search = async () => {
      state.loading = true
      state.finished = false
      await onLoad()
    }
    const onLoad = async () => {
      state.list = []
      state.loading = true
      state.finished = false
      let res = await getList(state.params)
      if (res) {
        state.list = res.data
        state.loading = false
        state.finished = true
      }
    }
    return {
      state,
      getList,
      onLoad,
      search,
    }
  },
}
</script>
