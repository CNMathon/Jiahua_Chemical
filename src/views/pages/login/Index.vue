<template>
  <div class="login" :style="{
      height:screenHeight
    }">
    <div class="title">
      <div class="title-1">浙江嘉化能源安全生产</div>
      <div class="title-2">运营管理系统移动端</div>
    </div>
    <div class="content">
      <div class="cell-box">
        <van-field class="field" v-model="username" clearable label="用户名" placeholder="请输入用户名" />
        <van-field
          class="field password"
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
      </div>
      <div class="action">
        <van-button
          type="primary"
          :loading="loading"
          loading-text="正在登录..."
          @click="tapLogin"
          size="large"
          color="#6096F8"
          class="aaa"
        >登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {

      loading: false,
      screenHeight: 0,
      username: '',
      password: ''
    };
  },
  methods: {
    tapLogin() {
      const that = this;
      this.loading = true;
      let sendData = {
        username: this.username,
        password: this.password,
        __ajax: "json"
      };

      this.$api.common.userLogin(sendData).then(res => {
        console.log(res);
        localStorage.setItem("JiaHuaSessionId", res.sessionid);
        localStorage.setItem("JiaHuaUserName", res.user.userName);
        localStorage.setItem("JiaHuaRefCode", res.user.refCode);
        localStorage.setItem("JiaHuaUserCode", res.user.userCode);
        // system账号不做此项
        if (this.username != "system") {
          localStorage.setItem(
            "JiaHuaOfficeCode",
            res.user.refObj.office.officeCode
          );
          localStorage.setItem(
            "JiaHuaOfficeName",
            res.user.refObj.office.officeName
          );
        }
        this.loading = false;
        this.$toast.success({
          duration: 1000,
          message: "登录成功",
          onClose() {
            that.$router.replace({
              path: "/"
            });
          }
        });
      });
    }
  },
  created() {
    this.screenHeight = `${document.documentElement.clientHeight}px`;
    console.log(this.screenHeight);
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  // height: 100%;
  background: url(../../../assets/images/login_1.png) no-repeat;
  background-size: contain;
  position: relative;
  .content {
    margin-top: 11.16%;
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    .cell-box {
      width: 70vw;
      height: auto;
      margin: 0 auto;
      .field {
        margin-bottom: 30px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
      .password {
        margin-top: 2.24%;
      }
    }
    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70%;
      padding-top: 8.84%;
      margin: 0 auto;
    }
  }
}

.title {
  text-align: center;
  font-size: 46px;
  padding-top: 14.31%;
}

.title-2 {
  margin-top: 0.5%;
}
</style>
