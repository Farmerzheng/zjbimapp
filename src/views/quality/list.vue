<template>
  <layout title="问题列表">
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
import { getDictList, getQuestionList } from '@/api/qualityQuestion'
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
    const onLoad = async () => {
      // 异步更新数据
      if (state.finished) {
        state.loading = false
        return
      }
      let params = {
        page: state.page,
        pageSize: state.pageSize,
        isAll: true,
      }
      let res = await getQuestionList(params)
      res.data.forEach((ele) => {
        state.list.push(ele)
      })
      state.loading = false
      if (res.data.length < state.pageSize) {
        state.finished = true
      }
      state.page++
    }
    const toDetail = (item) => {
      router.push({
        path: '/qualityQuestionDetail',
        query: {
          guid: item.guid,
        },
      })
    }
    return {
      state,
      onLoad,
      toDetail
    }
  },
}
</script>
