<template>
  <div class="photo">
    <van-sticky>
      <van-nav-bar title="培训签到" left-text="返回" left-arrow @click-left="pageBack" />
    </van-sticky>
    <div class="content">
      <div class="photo-content">
        <img id="photo" class="video" v-show="isPhoto" />
      </div>
    </div>
    <div class="btns">
      <div class="btn" v-if="isPhoto" @click="isPhoto = false">重新拍摄</div>
      <div class="btn" v-else @click="takePhoto()">点击拍照</div>
      <div class="btn" v-if="isPhoto" @click="uploadPhoto()">上传签到</div>
    </div>
    <canvas id="canvas" style="display:none;"></canvas>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";

export default {
  name: "photo",
  mixins: [mixin],
  data() {
    return {
      isPhoto: false,
      photo: "",
      id: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "", // 必填，公众号的唯一标识
      timestamp: "", // 必填，生成签名的时间戳
      nonceStr: "", // 必填，生成签名的随机串
      signature: "", // 必填，签名
      jsApiList: ["chooseImage"] // 必填，需要使用的JS接口列表
    });
  },
  methods: {
    // 拍照
    takePhoto() {},
    // 上传照片
    uploadPhoto() {
      this.$api.page_5
        .saveHtZxksPxzxRen({
          __sid: localStorage.getItem("JiaHuaSessionId"),
          id: this.id,
          qiandao: "1",
          qiandaoTime: new Date(),
          photo: this.photo
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.photo-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #999;
}
.btns {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 30px;
  box-sizing: border-box;
  .btn {
    margin-bottom: 20px;
    width: 100%;
    height: 98px;
    font-size: 32px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 98px;
    background: rgba(96, 150, 248, 1);
    border-radius: 49px;
  }
}
</style>
