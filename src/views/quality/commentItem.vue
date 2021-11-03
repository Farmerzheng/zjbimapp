<template>
  <div class="zxdt-list-item" v-bind="$attrs">
    <van-icon
      class="zxdt-list-item__avatar"
      size="50"
      name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
    />
    <div class="zxdt-list-item__content">
      <div style="overflow: hidden">
        <strong style="font-size: 18px">{{ item.createUser }}</strong>
        <span style="float: right">{{ item.createDate }}</span>
      </div>
      <p>{{ item.marks }}</p>
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
    console.log(props.item)
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
    // border: 1px solid #d8d9db;
    width: 50px;
    height: 50px;
  }
  .zxdt-list-item__content {
    width: 100%;
    padding-left: 10px;
  }
}
</style>
