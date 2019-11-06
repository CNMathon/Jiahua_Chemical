<template>
  <div class="login">
    <div class="title">
      <div class="title-1">浙江嘉化能源安全生产</div>
      <div class="title-2">运营管理系统移动端</div>
    </div>
    <div class="content">
      <div class="cell-box">
        <van-field
          class="field"
          v-model="username"
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          class="field"
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
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "董建飞",
      password: "123456",
      // username: "system",
      // password: "admin123",
      loading: false
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
        localStorage.setItem(
          "JiaHuaOfficeCode",
          res.user.refObj.office.officeCode
        );
        localStorage.setItem(
          "JiaHuaOfficeName",
          res.user.refObj.office.officeName
        );
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
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #f4f4f4;
  position: relative;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .cell-box {
      width: 70vw;
      height: auto;
      margin: 0 auto;
      .field {
        margin-bottom: 30px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
    }
    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 200px;
    }
  }
}

.title {
  text-align: center;
  font-size: 50px;
  padding-top: 30%;
}

.title-2 {
  margin-top: 2%;
}
</style>
