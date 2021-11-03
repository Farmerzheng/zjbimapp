<template>
  <layout title="检查统计">
    <van-tabs @click="changeTab">
      <van-tab title="正在施工"></van-tab>
      <van-tab title="施工完成"></van-tab>
    </van-tabs>
    <van-list :loading="false" :finished="true" finished-text="没有更多了">
      <div
        class="forewarning-detail"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      >
        <div>分部分项:{{ item.title }}</div>
        <div>
          状态等级:<span :style="levelColor(item.priority)">{{
            levelFilter(item.priority)
          }}</span
          >，检查状态:{{ item.priority }}
        </div>
        <div>计划开始:{{ item.start_date }}，计划结束:{{ item.end_date }}</div>
        <div>
          实际开始:{{ item.actual_start_date }}，实际结束:{{
            item.actual_end_date
          }}
        </div>
      </div>
    </van-list>
  </layout>
</template>
<style lang="less" scoped>
.forewarning-detail {
  padding: 10px;
  border: 1px solid #eee;
}
.forewarning-detail div {
  height: 26px;
  line-height: 26px;
  // border: 1px solid #eee;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
}
</style>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProgressWaringList } from '@/api/progress-control'
export default {
  setup(props) {
    const state = reactive({
      list: [],
    })
    const router = useRouter()
    const levelFilter = (value) => {
      if (value >= -7) {
        return '无'
      } else if (value >= -15) {
        return '一级'
      } else if (value >= -30) {
        return '二级'
      } else {
        return '三级'
      }
    }
    const levelColor = (value) => {
      if (value >= 7) {
        return { backgroundColor: '#3498db', color: '#fff' }
      } else if (value >= -7) {
        return { backgroundColor: '#2ecc71', color: '#fff' }
      } else {
        return { backgroundColor: '#F02233', color: '#fff' }
      }
    }
    const getList = async (type = 0) => {
      state.list = []
      let res = await getProgressWaringList({ type })
      state.list = res.data
    }
    const changeTab = (name, title) => {
      console.log(name)
      console.log(title)
      getList(name)
    }
    onMounted(async () => {
      await getList()
    })
    return {
      ...toRefs(state),
      levelFilter,
      levelColor,
      changeTab,
    }
  },
}
</script>
