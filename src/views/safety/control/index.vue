<template>
  <layout title="监控监测" left-text="返回"
  right-text="按钮">
    <div class="group-title">监控监测</div>
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
import { imageHttpUrl } from '@/config/index'
import { getMenuList } from '@/api/common'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
export default {
  name: 'Realname',
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
      prefix: imageHttpUrl,
    }
  },
}
</script>
