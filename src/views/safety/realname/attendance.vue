<template>
  <layout title="进退场管理">
    <template #right>
      <van-icon name="filter-o" size="22" @click="showSearch" />
    </template>
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="material-analysis-detail mad__table-head">
        <span>序号</span>
        <span>姓名</span>
        <!-- <span>班组名称</span> -->
        <!-- <span>工种</span> -->
        <!-- <span>工号</span> -->
        <span>进出方向</span>
        <!-- <span>打卡设备</span> -->
        <span>打卡时间</span>
      </div>
      <div
        class="material-analysis-detail"
        v-for="(item, index) in state.list"
        :key="index"
        :item="item"
      >
        <span>{{ index + 1 }}</span>
        <span>{{ item.userName }}</span>
        <!-- <span>{{ item.teamName }}</span> -->
        <!-- <span>{{ item.workType }}</span> -->
        <!-- <span>{{ item.cardNum }}</span> -->
        <span>{{ item.attendanceDirection == 1 ? '进' : '出' }}场</span>
        <!-- <span>{{ item.equipment }}</span> -->
        <span>{{ item.attendaceTime }}</span>
      </div>
    </van-list>
    <van-popup
      :show="state.show"
      position="right"
      :style="{ padding: '10px', width: '200px', top: '100px' }"
      @click-overlay="closeSearch"
    >
      <div class="p10">
        <div>
          开始时间<input type="date" v-model="state.params.beginTime" />
        </div>
        <div>结束时间<input type="date" v-model="state.params.endTime" /></div>
      </div>
      <div style="width: 90%; margin: 0 auto">
        <van-button
          type="primary"
          size="small"
          style="width: 50%"
          @click="search"
          >筛选</van-button
        >
        <van-button
          plain
          type="default"
          size="small"
          style="width: 50%"
          @click="clear"
          >重置</van-button
        >
      </div>
    </van-popup>
  </layout>
</template>
<style lang="less" scoped>
.p10 {
  padding: 10px;
}
.material-analysis-detail {
  display: grid;
  grid-template-columns: 50px 100px 80px 1fr;
  text-align: center;
}
.mad__table-head {
  background-color: #ddd;
}
.material-analysis-detail span {
  border: 1px solid #eee;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 6px 10px;
}
</style>
<script>
import { reactive, onMounted, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { getAttendanceList } from '@/api/realname'
import { dateFormat } from '@/utils/date'
export default {
  setup(props) {
    let state = reactive({
      list: [],
      loading: true,
      finished: false,
      show: false,
      params: {
        beginTime: '',
        endTime: '',
        pageSize: 9999,
      },
    })
    const showSearch = () => (state.show = true)
    const closeSearch = () => (state.show = false)
    const search = () => {
      state.show = false
      let sT = new Date(state.params.startTime)
      let eT = new Date(state.params.endTime)
      state.params.startTime = dateFormat(sT)
      state.params.endTime = dateFormat(eT)
      onLoad()
    }
    let nowStr = dateFormat(new Date())
    state.params.beginTime = nowStr
    state.params.endTime = nowStr
    const clear = () => {
      state.params.beginTime = ''
      state.params.endTime = ''
    }
    const onLoad = async () => {
      state.finished = false
      state.loading = true
      state.list = []
      let res = await getAttendanceList(toRaw(state.params))
      state.list = res.data
      state.loading = false
      state.finished = true
    }
    // onMounted(async () => {
    //   let res = await getAttendanceList()
    //   state.list = res.data
    // })
    return {
      state,
      showSearch,
      closeSearch,
      search,
      clear,
      onLoad,
    }
  },
}
</script>
