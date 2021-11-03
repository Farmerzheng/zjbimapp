<template>
  <iframe class="iframe" :src="url"></iframe>
</template>
<style lang="less" scoped>
.iframe {
  width: 100vw;
  height: 100vh;
}
</style>
<script>
import { ref, h } from 'vue'
import { processUrl } from '@/config/index'
export default {
  setup(props) {
    const url = ref(processUrl)
    return {
      url
    }
  },
}
</script>
