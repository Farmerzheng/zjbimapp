<template>
  <van-collapse v-model="active">
    <van-collapse-item :title="title" name="1">
      <slot></slot>
    </van-collapse-item>
  </van-collapse>
</template>
<script>
import {reactive,ref} from 'vue'
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  setup(props) {
    const active = ref(['1']);
    return {
      active
    }
  }
}
</script>
<style lang="scss">
.van-collapse-item__title {
  background-color: rgb(199, 199, 199);
}
.van-collapse-item__content{
  padding: 0;
}
</style>
