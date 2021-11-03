<template>
  <layout title="我的消息">
    <van-tabs
      v-model:active="state.tabActive"
      @change="tabChange"
      color="#26a2ff"
      type="card"
    >
      <van-tab title="未查看"></van-tab>
      <van-tab title="已查看"></van-tab>
    </van-tabs>
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="message-list"
    >
      <div
        class="message-list-item"
        v-for="item in state.list"
        :key="item"
        @click="() => toDetail(item)"
      >
        <div class="message-list-item__head">提醒类型：工序进度</div>
        <div>提醒时间：{{ item.remindedDate }}</div>
        <div class="message-list-item__content">
          <span>消息内容：</span>
          <span>{{ item.msg }}</span>
        </div>
      </div>
    </van-list>
  </layout>
</template>
<style lang="scss">
.message-list {
  padding: 16px;
  &-item {
    border: 1px solid #333;
    border-bottom-width: 0;
    margin-bottom: 10px;
    & > div {
      border-bottom: 1px solid #333;
      line-height: 24px;
      // height: 24px;
      font-size: 16px;
    }
    &__head {
      background-color: #ddd;
    }
    &__content {
      display: flex;
      & > span:first-child {
        flex-shrink: 0;
      }
    }
  }
}
</style>
<script>
import { reactive, ref, onMounted } from 'vue'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { messageList, messageEdit } from '@/api/beam'
export default {
  name: 'BeamMessage',
  setup(props) {
    const state = reactive({
      tabActive: 0,
      params: {
        isRead: 0,
      },
      loading: false,
      finished: false,
      list: [],
    })
    const router = useRouter()
    const tabChange = (name, title) => {
      state.params.isRead = name
      onLoad()
    }
    const getList = async (params) => {
      let res = await messageList(params)
      if (res.code != 0) {
        Toast(res.msg)
        return
      }
      return res
    }
    const onLoad = async () => {
      state.list = []
      state.loading = true
      state.finished = false
      let res = await getList(state.params)
      if (res) {
        state.list = res.data
        state.loading = false
        state.finished = true
      }
    }
    const toDetail = (item) => {
      if (state.params.isRead == 0) {
        messageEdit({ guid: item.guid })
      }
      router.push({
        path: '/beamReportData',
        query: {
          code1: item.resaved1,
          title: '状态追踪',
        },
      })
    }
    return {
      state,
      tabChange,
      getList,
      onLoad,
      toDetail,
    }
  },
}
</script>
