<template>
  <layout title="已办列表">
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
import { getDictList, getHistoryTaskList } from '@/api/qualityQuestion'
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
    const router = useRouter()
    const store = useStore()
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
      let res = await getHistoryTaskList(params)
      res.data.forEach((ele) => {
        state.list.push(ele)
      })
      state.loading = false
      state.finished = true
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
