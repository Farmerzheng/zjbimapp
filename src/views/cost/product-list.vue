<template>
  <van-list :loading="false" :finished="true" finished-text="没有更多了">
    <div class="material-analysis-detail mad__table-head">
      <span class="">月度</span>
      <span>计划</span>
      <span>实际</span>
      <span>计量</span>
      <span>计划/实际</span>
      <span>计量/实际</span>
    </div>
    <div
      class="material-analysis-detail"
      v-for="(item, index) in list"
      :key="index"
      :item="item"
    >
      <span>{{ item.monthDate }}</span>
      <span>{{ item.plan }}</span>
      <span>{{ item.reality }}</span>
      <span>{{ item.payment }}</span>
      <span>{{ item.planReality }}</span>
      <span>{{ item.paymentReality }}</span>
    </div>
  </van-list>
</template>
<style lang="less">
.material-analysis-detail {
  display: grid;
  grid-template-columns: repeat(6, 30%);
}
.mad__table-head span{
  background-color: #ddd;
}
.material-analysis-detail span {
  border: 1px solid #eee;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // display: inline-block;
  // height: 28px;
  line-height: 28px;
  text-align: center;
}
</style>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
}
</script>
