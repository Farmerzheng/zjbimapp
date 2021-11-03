<template>
  <div class="zxdt-list-item" v-bind="$attrs">
    <div class="norem-avatar" :style="{backgroundImage:'url('+item.picture+')'}">
      <!-- <img class="zxdt-list-item__avatar" :src="item.picture" /> -->
    </div>
    <div class="zxdt-list-item__content">
      <div style="overflow: hidden; padding-bottom: 10px">
        <strong>{{
          (item.resaved3 ? item.resaved3 : '') +
          (!item.resaved5 ? '' : item.resaved5)
        }}</strong>
        <van-tag style="float: right" size="20px" type="success">{{
          item.status
        }}</van-tag>
      </div>
      <div class="zxdt-list-item__title">
        <span>{{ item.resaved1 }}</span><br>
        <span>创建人:{{ item.createUser }}，</span>
        <span>{{ item.createDate }}</span>
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
    const item = props.item
    return {
      item,
    }
  },
}
</script>
<style lang="scss" scoped>
.zxdt-list-item {
  padding: 10px;
  border: 1px solid #ebedf0;
  display: flex;
  justify-content: flex-start;
  .zxdt-list-item__avatar {
    // background-color: #ebedf0;
    // border: 1px solid #d8d9db;
  }
  .norem-avatar {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    background: #ccc;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .zxdt-list-item__content {
    // width: calc(100% - 80px);
    width: 100%;
    padding-left: 10px;
    .zxdt-list-item__title {
      // display: flex;
      // justify-content: space-between;
    }
  }
}
</style>
