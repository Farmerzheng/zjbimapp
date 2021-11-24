<template>
  <div class="main-container nav-header">
    <van-nav-bar
      class="zjbimapp-nav"
      fixed
      :title="title"
      :left-arrow="leftArrow"
      :right-arrow="rightArrow"
      @click-left="$router.back"
    >
      <template #right>
        <slot name="right"></slot>        
      </template>
    </van-nav-bar>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Layout",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    leftArrow: {
      type: Boolean,
      default: true,
    },
    rightArrow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style scoped>
.zjbimapp-nav{
  background-color:#eee
}
</style>
