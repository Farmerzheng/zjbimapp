<template>
  <div id="foot_guide">
    <van-tabbar
      v-model="tabbar.active"
      active-color="#26a2ff"
      inactive-color="#000"
      @change="changeTabbar"
    >
      <van-tabbar-item v-for="(item, index) in tabbar.list" :key="index">
        {{ item.text }}
        <template #icon="props">
          <img :src="props.active ? item.activeIconPath : item.iconPath" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { SET_TABBAR_ACTIVE } from '@/store/mutation-types'
export default {
  props: {
    menuList: Array
  },
  setup(props) {
    const store = useStore()
    const tabbar = reactive({
      list: props.menuList,
      active: store.getters.tabbarActive,
    })
    console.log(props.menuList)
    const router = useRouter()
    
    const changeTabbar = (index) => {
      let item = tabbar.list[index]
      store.commit(SET_TABBAR_ACTIVE, index)
      router.push({
        path: item.path,
        query: {
          menuId: item.menuId,
        },
      })
    }
    return {
      tabbar,
      changeTabbar,
    }
  },
}
</script>
