<template>
  <van-cell-group>
    <van-field
      v-model.trim="loginForm.username"
      clearable
      placeholder="用户名"
      left-icon="contact"
      @keyup.enter="$refs.password.focus()"
    />
    <van-field
      ref="password"
      v-model.trim="loginForm.password"
      clearable
      :type="passwordType"
      placeholder="密码"
      :left-icon="passwordType ? 'closed-eye' : 'eye-o'"
      @click-left-icon="showPassword"
      @keyup.enter="handleLogin"
    />
    <div class="mt15">
      <van-button
        type="primary"
        size="large"
        :loading="loading"
        @click="handleLogin"
        >{{ loginText }}</van-button
      >
    </div>
  </van-cell-group>
</template>

<script>
import { Toast } from "vant";
import { mapActions } from "vuex";
import { login } from "@/api/login";

export default {
  name: "LoginForm",
  data() {
    return {
      loading: false,
      loginText: "登录",
      passwordType: "password",
      loginForm: {
        username: "", //18810395512
        password: "", //123456
      },
    };
  },
  mounted() {
    console.log(process.env.NODE_ENV);
    // 获取本地存储的用户名和秘密
    var userName = localStorage.getItem("username");
    var passWord = localStorage.getItem("password");

    console.log(userName,passWord);
    
    if (userName && passWord) {
      // 用户已经登录

      this.loginForm.username = userName;
      this.loginForm.password = passWord;
    }
  },
  methods: {
    ...mapActions(["login"]),
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    async handleLogin() {
      if (!this.loginForm.username) {
        Toast("账号不能为空");
        return false;
      }
      if (!this.loginForm.password) {
        Toast("密码不能为空");
        return false;
      } else if (this.loginForm.password.length < 6) {
        Toast("密码长度最少为6位");
        return false;
      }
      this.loading = true;
      this.loginText = "登录中...";
      try {
        let res = await login(this.loginForm);
        if (res.code !== 0) {
          throw new Error(res.msg);
        } else {
          console.log(res);
          // 存储用户名和密码
          localStorage.setItem("username", this.loginForm.username);
          localStorage.setItem("password", this.loginForm.password);

          let {
            userName,
            phone,
            token,
            dept: { deptId, deptName },
            project: { sysProjectId, projectName },
          } = res;
          this.login({
            userName,
            phone,
            token,
            deptId,
            deptName,
            projectName,
            projectId: sysProjectId,
          });
          Toast.success("登录成功");
          this.loading = false;
          this.loginText = "登录";
          this.$router.replace({ path: "/home/main" });
        }
      } catch (error) {
        Toast.fail(error);
        this.loading = false;
        this.loginText = "登录";
      }
    },
  },
};
</script>
<style lang="scss">
.login-main {
  .van-cell-group,
  .van-cell {
    background: none;
  }
  .van-hairline--top-bottom::after,
  .van-cell:not(:last-child)::after {
    border: none;
  }
  .van-cell {
    border: solid 1px #a09d9d;
    margin-bottom: 20px;
    border-radius: 4px;
    .van-field__body {
      border-left: solid 1px #a09d9d;
      padding-left: 16px;
      margin-left: 6px;
    }
  }
  .mt15 {
    margin-top: 30px;
  }
}
</style>
