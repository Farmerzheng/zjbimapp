<template>
  <layout title="全景地图">
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="panorama-list"
    >
      <div
        class="panorama-list-item"
        v-for="item in state.list"
        :key="item"
        @click="() => toDetail(item)"
      >
        <div class="panorama-list-item__head">名称：{{ item.name }}</div>
        <div>发布人：{{ item.createUser }}</div>
        <div>发布时间：{{ item.createDate }}</div>
      </div>
    </van-list>
  </layout>
</template>
<style lang="scss">
.panorama-list {
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
import { panoramaList } from '@/api/beam'
export default {
  name: 'BeamPanorama',
  setup(props) {
    const state = reactive({
      loading: false,
      finished: false,
      list: [],
      params: {},
    })
    const router = useRouter()
    const route = useRoute()
    const getList = async (params) => {
      let res = await panoramaList(params)
      if (res.code != 0) {
        Toast(res.msg)
        return
      }
      return res
    }
    const toDetail = (item) => {
      router.push({
        name: 'webview',
        params: {
          url: item.mapSrc,
          title: item.name,
        },
      })
    }
    const onLoad = async () => {
      state.list = []
      state.loading = true
      state.finished = false
      let res = await getList()
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
      toDetail,
    }
  },
}
</script>
