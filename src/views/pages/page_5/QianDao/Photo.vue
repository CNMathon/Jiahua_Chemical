<template>
  <div class="photo">
    <van-sticky>
      <van-nav-bar
        title="培训签到"
        left-text="返回"
        left-arrow
        @click-left="pageBack"
      />
    </van-sticky>
    <div class="content">
      <div class="tip">请把脸放进框内</div>
      <div class="video-content">
        <video
          id="video"
          class="video"
          v-show="!isPhoto"
          autoplay
          playsinline
        ></video>
        <img id="photo" class="video" v-show="isPhoto" />
      </div>
    </div>
    <div class="btns" v-if="canTakePhoto">
      <div class="btn" v-if="isPhoto" @click="isPhoto = false">重新拍摄</div>
      <div class="btn" v-else @click="takePhoto()">点击拍照</div>
      <div class="btn" v-if="isPhoto" @click="uploadPhoto()">上传签到</div>
    </div>
    <canvas id="canvas" style="display:none;"></canvas>
  </div>
</template>
<script>
import { mixin } from "@/mixin/mixin";
import { mapState } from "vuex";

window.navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webKitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;
export default {
  name: "photo",
  mixins: [mixin],
  data() {
    return {
      isPhoto: false,
      canTakePhoto: false,
      photo: "",
      id: ""
    };
  },
  mounted() {
    this.invokingCarera();
    this.id = this.$route.params.id;
  },
  methods: {
    // 调起摄像头
    invokingCarera() {
      let _this = this;
      let video = document.querySelector("video");
      let size = video.clientHeight;
      var constraints = {
        video: {
          facingMode: "user",
          width: size,
          height: size
        }
      };
      if (navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(mediaStream) {
            var video = document.querySelector("video");
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
              _this.canTakePhoto = true;
              console.log("e: ", e);
              video.play();
            };
          })
          .catch(function(err) {
            console.log(err.name + ": " + err.message);
            _this.$Dialog
              .alert({
                title: "抱歉",
                message: "摄像头调用失败"
              })
              .then(() => {
                // on close
              });
          });
      } else {
        _this.$Dialog
          .alert({
            title: "抱歉",
            message: "该浏览器不支持摄像头调用！"
          })
          .then(() => {
            // on close
          });
      }
    },
    // 拍照
    takePhoto() {
      var video = document.querySelector("video");
      let canvas = document.getElementById("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      let data = canvas.toDataURL("image/webp");
      this.photo = data;
      console.log("data: ", this.photo);
      document.getElementById("photo").setAttribute("src", data);
      this.isPhoto = true;
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
  },
  computed: mapState({
    zyOtherspecial: state => state.kongjian.zyOtherspecial,
    zywhBs: state => state.kongjian.zywhBs31
  })
};
</script>
<style lang="scss" scoped>
.tip {
  margin-top: 60px;
  font-size: 28px;
  text-align: center;
  color: rgba(68, 68, 68, 1);
  line-height: 28px;
}
.video-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.video {
  margin: 50px auto;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  overflow: hidden;
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
