<template>
  <layout title="质量管理" :left-arrow="false">
    <div class="group-title">质量管理</div>
    <van-grid :gutter="20" :column-num="4" square class="group-grid-container">
      <van-grid-item
        v-for="item in state.list"
        :key="item.menuId"
        :icon="item.picture"
        :text="item.menuName"
        :to="item.url"
      >
      </van-grid-item>
    </van-grid>
    <!-- <div class="group-title">BIM模型</div>
    <van-grid :gutter="20" :column-num="4" square class="group-grid-container">
      <van-grid-item text="BIM模型" to="/bim">
        <template #icon>
          <img class="group-grid-icon" :src="state.prefix + '/img/module/bim_mode.png'" />
        </template>
      </van-grid-item>
    </van-grid> -->
  </layout>
</template>
<script>
import { imageHttpUrl } from '@/config/index'
import { getMenuList } from '@/api/common'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
export default {
  setup(props) {
    const state = reactive({
      list: [
        // {
        //   id: 1,
        //   title: '问题整改',
        //   path: '/qualityQuestion',
        //   icon: '/img/module/quality_question.png',
        // },
        // {
        //   id: 2,
        //   title: '质量三检',
        //   path: '/quality3Inspection',
        //   icon: '/img/module/quality_3_inspection.png',
        // },
      ],
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
