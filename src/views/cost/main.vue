<template>
  <layout title="成本管理" :left-arrow="false">
    <div class="group-title">成本管理</div>
    <van-grid :gutter="20" :column-num="4" square class="group-grid-container">
      <van-grid-item
        :text="item.menuName"
        :to="item.url"
        v-for="item in state.list"
        :key="item.menuId"
        :icon="item.picture"
      >
      </van-grid-item>
    </van-grid>
  </layout>
</template>
<script>
import { getMenuList } from '@/api/common'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import { imageHttpUrl } from '@/config/index'
export default {
  setup(props) {
    const state = reactive({
      list: [],
      prefix: imageHttpUrl,
    })
    const route = useRoute()
    const parentId = route.query.menuId
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
    }
  },
}
</script>
