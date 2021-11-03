<template>
  <div class="login-container">
    <div class="login-weaper">
      <div class="login-border">
        <div class="login-main">
          <login-form></login-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from './loginForm.vue'
export default {
  name: 'login',
  components: { LoginForm },
  data() {
    return {}
  },
  mounted() {
    // this.muiBack('/')
  }
}
</script>
<style lang="scss">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
.login-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url('../../../public/img/bg.png') no-repeat;
  // background-size: cover;
}
.login-weaper {
  display: flex;
  width: 96%;
  height: 100%;
  margin: 0 auto;
}
.login-border {
  width: 100%;
  height: 100vh;
  position: relative;
  min-height: 500px;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  box-sizing: border-box;
}
.login-main {
  margin: 0 auto;
  width: 90%;
  height: 300px;
  box-sizing: border-box;
}
</style>
