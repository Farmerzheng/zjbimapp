<template>
  <layout title="劳务人员">
    <template #right>
      <!-- <van-icon name="plus" size="20" @click="add" /> -->
    </template>
    <van-list :loading="false" :finished="true" finished-text="没有更多了">
      <div v-for="(item, index) in state.list" :key="index" :item="item">
        <div class="zxdt-list-item">
          <img class="norem-zxdt-list-item__avatar" :src="item.personalPhoto" />
          <div class="zxdt-list-item__content">
            <div style="overflow: hidden; padding-bottom: 5px">
              <strong style="font-size: 18px">{{ item.name }}</strong>
            </div>
            <div class="zxdt-list-item__title">
              <span>{{ item.workType }}</span>
              <span>{{ item.nation }}</span>
              <span>{{ item.nativePlace }}</span>
              <span>{{ item.address }}</span>
              <span>{{ item.phoneNum }}</span>
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
  .norem-zxdt-list-item__avatar {
    // background-color: #ebedf0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    // border: 1px solid #d8d9db;
  }
  .zxdt-list-item__content {
    width: calc(100% - 80px);
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
import { getPersonList } from '@/api/realname'
export default {
  setup(props) {
    let state = reactive({
      list: [],
    })
    const router = useRouter()
    onMounted(async () => {
      let res = await getPersonList()
      state.list = res.data
    })
    return {
      state,
    }
  },
}
</script>
