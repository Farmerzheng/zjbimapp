<template>
  <layout title="安全管理" :left-arrow="false">
    <div class="group-title">安全管理</div>
    <van-grid :gutter="20" :column-num="4" square class="group-grid-container">
      <van-grid-item
        :text="item.menuName"
        v-for="item in state.list"
        :key="item.menuId"
        :icon="item.picture"
        @click="() => toNextMenu(item)"
      >
      </van-grid-item>
    </van-grid>
  </layout>
</template>
<script>
import { imageHttpUrl } from '@/config/index'
import { getMenuList } from '@/api/common'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
export default {
  setup(props) {
    const state = reactive({
      list: [],
      prefix: imageHttpUrl,
    })
    const route = useRoute()
    const router = useRouter()
    const parentId = route.query.menuId

    const toNextMenu = (item) => {
      router.push({
        path: item.url,
        query: {
          menuId: item.menuId,
        },
      })
    }
    onBeforeMount(async () => {
      let res = await getMenuList({
        // location: 'commonfuntion',
        parentId: parentId,
      })
      if (res.code == 0) {
        state.list = res.data
      } else {
        state.list = []
        Toast(res.msg)
      }
    })
    return {
      state,
      toNextMenu,
    }
  },
}
</script>
