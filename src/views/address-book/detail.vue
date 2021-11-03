<template>
  <div class="address-detail nav-header">
    <van-nav-bar
      fixed
      :title="user.userName"
      left-arrow
      @click-left="$router.back"
    />
    <div class="address-detail-icon">
      <van-image round width="3rem" height="3rem" :src="icon" />
    </div>
    <van-cell :label="user.userName" title="姓名"></van-cell>
    <van-cell :label="user.phonenumber" title="手机号" center>
      <template #right-icon>
        <van-icon size="26" name="phone" @click="callUser"></van-icon>
      </template>
    </van-cell>
    <van-cell :label="user.email" title="邮箱"></van-cell>
    <van-cell :label="user.company" title="公司"></van-cell>
    <van-cell :label="user.deptName" title="部门"></van-cell>
  </div>
</template>
<style lang="less" scoped>
.address-detail {
  &-icon {
    padding: 20px 0;
    text-align: center;
  }
}
</style>
<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
export default {
  setup(props) {
    const state = reactive({
      user: null,
      icon: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
    })
    const route = useRoute()
    let user = route.query
    console.log(user)
    state.user = user
    const callUser = () => {
      if (!window.plus) {
        Toast('插件未安装')
        return
      }
      if (!state.user.phonenumber) {
        Toast('手机号不能为空')
        return
      }
      plus.device.dial(user.phonenumber, true)
    }

    return {
      ...toRefs(state),
      callUser,
    }
  },
}
</script>
