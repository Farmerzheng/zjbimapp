<template>
  <layout title="测站信息">
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in state.list"
        :key="item"
        :title="item.deviceName"
        @click="() => toDetail(item)"
      />
    </van-list>
  </layout>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getDevice } from '@/api/environment'
export default {
  setup() {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    })
    const router = useRouter()
    const onLoad = async () => {
      let res = await getDevice()
      state.list = res.data
      // 加载状态结束
      state.loading = false
      state.finished = true
    }
    const toDetail = (item) => {
      router.push({ path: '/environmentDetail', query: { deviceNum: item.deviceNum } })
    }

    return {
      state,
      onLoad,
      toDetail,
    }
  },
}
</script>
