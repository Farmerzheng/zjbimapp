<template>
  <layout title="状态追踪" :left-arrow="true">
    <div class="state-search">
      <ali-select
        label=""
        v-model="params.parentId"
        placeholder="选择线路"
        :columns="lineList"
        :columnsProps="columnsProps"
        @get-selection="search"
      ></ali-select>
      <van-field
        style="margin-left: 10px"
        v-model="params.code1"
        placeholder="请输入分部分项名称"
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
        class="state-list-item"
        v-for="(item, index) in list"
        :key="index"
        @click="() => toDetail(item)"
      >
        <strong>{{ item.code1 }}</strong>
        <div>起止墩号：{{ item.startPier }}-{{ item.endPier }}</div>
      </div>
    </van-list>
    <div style="position: fixed; bottom: 0; width: 100%">
      <van-button
        type="primary"
        style="width: 100%; letter-spacing: 2px"
        to="/beamScan?toPath=beamReportData&returnKey=code1&title=状态追踪信息"
        >扫码查询</van-button
      >
    </div>
  </layout>
</template>
<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { structure, beamLine } from '@/api/beam'
import AliSelect from '@/components/AliSelect.vue'
export default {
  components: { AliSelect },
  setup(props) {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
      lineList: [],
      columnsProps: {
        text: 'lineName',
        value: 'guid',
      },
      params: {
        code1: '',
        parentId: '',
      },
    })
    const router = useRouter()
    const onLoad = async () => {
      if (state.finished) {
        state.loading = false
        return
      }
      let res = await structure(state.params)
      state.list = res.data
      state.loading = false
      state.finished = true
    }
    const toDetail = (item) => {
      router.push({
        path: '/beamReportData',
        query: {
          code1: item.code1,
          title: '状态追踪信息',
        },
      })
    }
    const search = async () => {
      state.loading = true
      state.finished = false
      await onLoad()
    }
    onMounted(async () => {
      let res = await beamLine()
      state.lineList = res.data
      state.lineList.unshift({ guid: '', lineName: '全部' })
    })
    return {
      ...toRefs(state),
      onLoad,
      toDetail,
      search,
    }
  },
}
</script>
<style lang="less">
.state-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  & > div {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
}
.state-list-item {
  margin: 10px;
  // border: 1px solid red;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  & > strong {
    font-size: 20px;
  }
}
</style>
