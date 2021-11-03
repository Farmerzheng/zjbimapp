<template>
  <div class="zxdt-list-item" v-bind="$attrs">
    <img
      class="zxdt-list-item__avatar norem-avatar"
      :src="item.iconUrl"
    />
    <div class="zxdt-list-item__content">
      <div style="overflow: hidden;">
        <strong style="font-size: 18px">{{ item.title }}</strong>
      </div>
      <div>{{ item.ownerName }}</div>
      <div class="zxdt-list-item__title">
        <span>{{ item.begintime }}</span>
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
  },
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
    display: inline-block;
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
