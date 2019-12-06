<template>
  <div class="photo">
    <van-sticky>
      <van-nav-bar title="培训签到" left-text="返回" left-arrow @click-left="pageBack" />
    </van-sticky>
    <div class="content">
      <div class="photo-content">
        <!-- <img id="photo" class="video" v-show="isPhoto" /> -->
        <video id="video" class="video" ref="video" v-show="videoUrl" :src="videoUrl" muted playsinline autoplay></video>
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
import axios from "axios";
const sha1 = require("sha1");
export default {
  name: "photo",
  mixins: [mixin],
  data() {
    return {
      isPhoto: false,
      photo: "",
      videoUrl: '',
      id: ""
    };
  },
  mounted() {
    this.initPhoto();
    // axios
    //   .get("https://api.weixin.qq.com/cgi-bin/token", {
    //     params: {
    //       grant_type: "client_credential",
    //       appid: "wx66c7494423ceb027",
    //       secret: "34fa9ffd9707f65f41989cff105f0451"
    //     }
    //   })
    //   .then(res => {
    //     console.log(`res1: `, res);
    //     let token = res.data.access_token;
    //     axios
    //       .get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket`, {
    //         params: {
    //           access_token: token,
    //           type: "wx_card"
    //         }
    //       })
    //       .then(res => {
    //         console.log(`res2: `, res);
    //         let jsapi_ticket = res.data.ticket;
    //         console.log("jsapi_ticket: ", jsapi_ticket);
    //         let noncestr = "jiahua";
    //         let timestamp = Date.parse(new Date()) / 1000;
    //         let url = "http://127.0.0.1:8080/#/page_5/photo";
    //         let str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`; //按字典排序，拼接字符串
    //         console.log("str: ", str);
    //         let sha = sha1(str); //加密
    //         console.log("sha: ", sha);
    //         wx.config({
    //           debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //           appId: "wx77b593f044330ae1", // 必填，公众号的唯一标识
    //           timestamp: timestamp, // 必填，生成签名的时间戳
    //           nonceStr: noncestr, // 必填，生成签名的随机串
    //           signature: sha, // 必填，签名
    //           jsApiList: ["chooseImage"] // 必填，需要使用的JS接口列表
    //         });
    //       });
    //   });
    this.id = this.$route.params.id;
  },
  methods: {
    initPhoto () {
      let URL = window.URL || window.webkitURL; 
      if (navigator.mediaDevices === undefined) {
        this.$notify("不支持摄像头功能");
    }
    navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia;
      console.log('navigator.getUserMedia', navigator.getUserMedia);
      if (!navigator.getUserMedia) {
        this.$notify("不支持摄像头功能");
        return;
      }
      navigator.getUserMedia({video: true }, (url) =>　{
        console.log('成功');
        this.$notify("成功");
        this.$refs.video.srcObject = stream;
        this.$refs.video.onloadedmetadata = (e) => {
            this.$refs.video.play();
        };
        // let video  = URL.createObjectURL(url);
        // this.videoUrl = video;
        // this.$refs.video.play();
      }, (err) => {
         alert(err.name);
         console.log('err.name', err.name);
        switch (err.name) {
          case 'PERMISSION_DENIED': 
          this.$notify("用户拒绝提供信息");
          break;
          case 'NOT_SUPPORTED_ERROR': 
          this.$notify("浏览器不支持硬件设备");
          break;
          case 'MANDATORY_UNSATISFIED_ERROR': 
          this.$notify("无法发现指定的硬件设备");
          break;
        }
      });
    },
    // 拍照
    takePhoto() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    },
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
