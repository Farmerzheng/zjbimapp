<template>
  <layout title="待办列表">
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <list-item
        v-for="(item, index) in state.list"
        :key="index"
        :item="item"
        @click="() => toDetail(item)"
      />
    </van-list>
  </layout>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getDictList, getToDoTaskList } from '@/api/qualityQuestion'
import ListItem from './listItem.vue'
export default {
  components: { ListItem },
  setup() {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
      page: 1,
      pageSize: 10,
    })
    const store = useStore()
    const router = useRouter()
    const onLoad = async () => {
      // 异步更新数据
      if (state.finished) {
        state.loading = false
        return
      }
      let params = {
        phone: store.getters.userPhone,
        start: 0,
        limit: 9999
      }
      let res = await getToDoTaskList(params)
      res.data.forEach((ele) => {
        state.list.push(ele)
      })
      state.loading = false
      // if (res.data.length < state.pageSize) {
      state.finished = true
      // }
      // state.page++
    }
    const toDetail = (item) => {
      router.push({
        name: 'webview',
        params: {
          url: item.url,
          title: item.title,
        },
      })
    }
    return {
      state,
      onLoad,
      toDetail,
    }
  },
}
</script>
