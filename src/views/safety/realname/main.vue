<template>
  <layout title="实名制管理">
    <div class="group-title">实名制管理</div>
    <van-grid :gutter="20" square class="group-grid-container" :column-num="4">
      <van-grid-item
        v-for="item in state.list"
        :key="item.menuId"
        :icon="item.picture"
        :text="item.menuName"
        :to="item.url"
      >
      </van-grid-item>
      <!-- <van-grid-item icon="photo-o" text="进退场" to="/attendance"
        ><template #icon>
          <img
            class="group-grid-icon"
            :src="prefix + '/img/module/jtc.png'"
          /> </template
      ></van-grid-item>
      <van-grid-item icon="photo-o" text="劳务人员" to="/person"
        ><template #icon>
          <img
            class="group-grid-icon"
            :src="prefix + '/img/module/lwry.png'"
          /> </template
      ></van-grid-item>
      <van-grid-item icon="photo-o" text="安全教育" to="/safetyTraining"
        ><template #icon>
          <img
            class="group-grid-icon"
            :src="prefix + '/img/module/aqjy.png'"
          /> </template
      ></van-grid-item> -->
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
