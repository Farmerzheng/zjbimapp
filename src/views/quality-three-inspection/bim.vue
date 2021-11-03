<template>
  <div class="nav-header">
    <van-nav-bar fixed title="BIM模型" left-arrow @click-left="$router.back" />
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in state.list"
        :key="item"
        is-link
        @click="() => modelItemClick(item)"
        :title="item.modelName"
      />
    </van-list>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { queryModelsByProjectId } from '@/api/common'
export default {
  setup(props) {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
      guid: '',
      value: '',
    })

    const store = useStore()
    const router = useRouter()
    const onLoad = async () => {
      state.loading = true
      state.finished = false
      let res = await queryModelsByProjectId({
        projectId: store.getters.projectId,
      })
      state.list = res.modelLibraryList
      state.loading = false
      state.finished = true
    }
    const modelItemClick = (item) => {
      let url = item.modelUrl
      router.push({ name: 'webview', params: { url: url, title: "BIM模型查看"} })
    }
    return {
      state,
      onLoad,
      modelItemClick,
    }
  },
}
</script>
