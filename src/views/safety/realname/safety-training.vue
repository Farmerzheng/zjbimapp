<template>
  <layout title="安全教育">
    <template #right>
      <!-- <van-icon name="plus" size="20" @click="add" /> -->
    </template>
    <van-list :loading="false" :finished="true" finished-text="没有更多了">
      <div
        v-for="(item, index) in state.list"
        :key="index"
        :item="item"
        @click="() => toDetail(item)"
      >
        <div class="zxdt-list-item">
          <img class="zxdt-list-item__avatar" :src="item.trainingImg" />
          <div class="zxdt-list-item__content">
            <div style="overflow: hidden; padding-bottom: 5px">
              <strong style="font-size: 18px"
                >课程名称:{{ item.courseTitle }}</strong
              >
            </div>
            <div class="zxdt-list-item__title">
              <span>创建人:{{ item.traingPersion }}</span>
              <span>{{ item.trainingDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </layout>
</template>
<style lang="less" scoped>
.zxdt-list-item {
  padding: 10px;
  border: 1px solid #ebedf0;
  display: flex;
  justify-content: flex-start;
  .zxdt-list-item__avatar {
    // background-color: #ebedf0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    // border: 1px solid #d8d9db;
  }
  .zxdt-list-item__content {
    width: 100%;
    padding-left: 10px;
    .zxdt-list-item__title {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
<script>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSafetyTrainingList } from '@/api/realname'
export default {
  setup(props) {
    let state = reactive({
      list: [],
    })
    const router = useRouter()
    const add = () => {
      return;
      router.push({
        path: '/safetyTrainingAdd',
      })
    }
    const toDetail = (item) => {
      router.push({
        path: '/safetyTrainingAdd',
        query: {
          item: JSON.stringify(item),
        },
      })
    }
    onMounted(async () => {
      let res = await getSafetyTrainingList()
      state.list = res.data
    })
    return {
      state,
      add,
      toDetail,
    }
  },
}
</script>
