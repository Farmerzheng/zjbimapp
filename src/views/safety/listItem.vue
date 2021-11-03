<template>
  <div class="zxdt-list-item" v-bind="$attrs">
    <img
      class="zxdt-list-item__avatar norem-avatar"
      :src="item.resaved1"
    />
    <div class="zxdt-list-item__content">
      <div style="overflow: hidden; padding-bottom: 10px">
        <strong style="font-size: 18px">{{ item.location }}</strong>
        <van-tag style="float: right" v-if="false" size="20px" type="success">{{
          item.status
        }}</van-tag>
      </div>
      <div class="zxdt-list-item__title">
        <span>创建人:{{ item.createUser }}</span>，
        <span>发起日期:{{ item.createDate }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  props: {
    item: Object,
  },
  setup(props) {
    let item = props.item
    if (item.resaved1) {
      let index = item.resaved1.indexOf(',')
      if (index !== -1) {
        item.resaved1 = item.resaved1.slice(0, index)
      }
    }
  }
}
</script>
<style lang="scss">
.zxdt-list-item {
  padding: 10px;
  border: 1px solid #ebedf0;
  display: flex;
  justify-content: flex-start;
  .zxdt-list-item__avatar {
    // background-color: #ebedf0;
    border: 1px solid #d8d9db;
  }
  .norem-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .zxdt-list-item__content {
    padding-left: 10px;
    .zxdt-list-item__title {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
