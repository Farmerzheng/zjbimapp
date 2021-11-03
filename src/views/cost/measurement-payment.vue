<template>
  <layout title="计量支付">
    <van-list
      :loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="material-analysis table-head">
        <span>标题</span>
        <span>发布单位</span>
        <span>发布人</span>
        <span>发布时间</span>
        <span>详情</span>
      </div>
      <div
        class="material-analysis"
        v-for="(item, index) in state.list"
        :key="index"
        :item="item"
      >
        <span>{{ item.title }}</span>
        <span>{{ item.unit }}</span>
        <span>{{ item.createUser }}</span>
        <span>{{ item.releaseDate }}</span>
        <span @click="() => lookDetail(item.guid)">查看</span>
      </div>
    </van-list>
  </layout>
</template>
<style lang="less" scoped>
.material-analysis {
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;
  display: grid;
  grid-template-columns: 50% 40% 20% 20% 20%;
  // display: table;
}
.table-head > span{
  background-color: #ddd;
}
.material-analysis span {
  border: 1px solid #eee;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // display: table-cell;
  line-height: 28px;
  text-align: center;
}
</style>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getMeasurementPaymentList } from '@/api/cost'
export default {
  setup() {
    const state = reactive({
      list: [],
      loading: true,
      finished: false,
      page: 1,
      pageSize: 10,
    })
    const router = useRouter()
    const onLoad = async () => {
      // 异步更新数据
      if (state.finished) {
        state.loading = false
        return
      }
      let params = {
        page: state.page,
        pageSize: state.pageSize,
      }
      let res = await getMeasurementPaymentList()
      res.data.forEach((ele) => {
        state.list.push(ele)
      })
      state.loading = false
      if (res.data.length < state.pageSize) {
        state.finished = true
      }
      state.page++
    }
    const lookDetail = (guid) => {
      router.push({
        path: '/measurementPaymentDetail',
        query: {
          guid: guid,
        },
      })
    }
    return {
      state,
      onLoad,
      lookDetail,
    }
  },
}
</script>
