<template>
  <div class="nav-header">
    <van-nav-bar fixed :title="title" left-arrow @click-left="$router.back" />
    <iframe class="iframe" :src="url"></iframe>
  </div>
</template>
<style lang="less" scoped>
.iframe {
  width: 100vw;
  height: calc(100vh - 46px);
}
</style>
<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup(props) {
    const route = useRoute()
    const url = computed(() => route.params.url)
    const title = computed(() => route.params.title)
    return {
      url,
      title
    }
  },
}
</script>
