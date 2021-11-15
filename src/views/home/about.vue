<template>
  <div class="nav-header" style="height: 100vh;background-color: #f7f8fa;">
    <van-nav-bar fixed title="我的" />
    <div>
      <div class="user-info">
        <van-icon
          class="user-info__avatar"
          size="1rem"
          name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        />
        <div class="user-info__content">
          <strong class="user-info__username">{{userName}}</strong>
          <div class="user-info__tel">手机号：{{userPhone}}</div>
        </div>
      </div>
      <van-cell class="list-item" title="当前项目" is-link to="/selectProject" :value="projectName" />
      <van-cell class="list-item" title="当前公司" is-link to="/selectDept" :value="deptName" />
      <van-cell class="list-item" title-style="text-align: center;padding-top: 4px;" title="退出登录" @click.native="quit"></van-cell>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import { mapActions, mapGetters } from 'vuex'
import { logout } from '@/api/login'
export default {
  computed: {
    ...mapGetters(['userName','userPhone', 'deptName', 'projectName']),
  },
  methods: {
    ...mapActions(['logout']),
    quit() {
      Dialog.confirm({
        title: '提示',
        message: '确定退出登录吗',
      })
        .then(() => {
          logout().then((res) => {
            this.logout()
            this.$router.push({ path: '/login' })
          })
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss">
.user-info {
  display: flex;
  justify-content: flex-start;
  padding-top: 20px;
  border-bottom: 0.02667rem solid #ebedf0;
  background-color: #fff;
  .user-info__avatar {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
  }
  .user-info__content {
    font-size: 0.4rem;
    color: #969799;
  }
  .user-info__username {
    font-size: 0.6rem;
    color: black;
  }
}
.list-item {
  margin: 10px 0;
  .van-cell__value {
    flex: 2;
  }
}
</style>
