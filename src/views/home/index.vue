<template>
  <div style="background: #eee">
    <router-view></router-view>
    <foot-guide :menu-list="state.menuList"></foot-guide>
  </div>
</template>
<script>
import FootGuide from '@/components/FootGuide.vue'
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMenuList } from '@/api/common'
import { useStore } from 'vuex'
import { SET_TABBAR_ACTIVE } from '@/store/mutation-types'
export default {
  components: {
    FootGuide,
  },
  setup(props) {
    const state = reactive({
      menuList: [],
    })
    const imgPath = '/img/tabbar/'
    const prefix = process.env.NODE_ENV == 'development' ? '' : '/dist'
    const imgPrefix = prefix + imgPath
    onBeforeMount(() => {
      getMenuList({ location: 'navigation', parentId: '' }).then((res) => {
        if (res.code == 0 && res.data && res.data.length > 0) {
          res.data.forEach((ele) => {
            state.menuList.push({
              path: ele.url,
              text: ele.menuName,
              iconPath: ele.picture,
              activeIconPath: ele.picture2,
              menuId: ele.menuId,
            })
          })
        }
        state.menuList.unshift({
          path: '/home/main',
          text: '首页',
          activeIconPath: imgPrefix + 'home-a.png',
          iconPath: imgPrefix + 'home.png',
          menuId: '',
        })
        state.menuList.push({
          path: '/home/my',
          text: '我的',
          activeIconPath: imgPrefix + 'my-a.png',
          iconPath: imgPrefix + 'my.png',
          menuId: '',
        })
      })
    })
    return {
      state,
    }
  },
}
</script>
