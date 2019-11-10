<template>
  <div class="container">
    <div id="canvasBox" :style="getHorizontalStyle">
      <div class="head">
        <div class="default">
          <van-checkbox v-model="setDefault">
            <div class="default__text">设置为默认签名</div>
          </van-checkbox>
        </div>
        <div class="title">请签名确认</div>
        <div class="clear">
          <van-icon name="delete" @click="clear" />
        </div>
      </div>
      <canvas></canvas>
      <div class="confirm" @click="savePNG">保存</div>
      <div class="cancel" @click="tapCancel">取消</div>
    </div>
  </div>
</template>

<script>
import Draw from "../utils/draw";

export default {
  name: "canvas",
  data() {
    return {
      degree: 0,
      signImage: null,
      setDefault: false
    };
  },
  beforeCreate() {},
  mounted() {
    setTimeout(() => {
      this.canvasBox = document.getElementById("canvasBox");
      this.initCanvas();
    }, 1000);
  },
  computed: {
    getHorizontalStyle() {
      const d = document;
      const w =
        window.innerWidth ||
        d.documentElement.clientWidth ||
        d.body.clientWidth;
      const h =
        window.innerHeight ||
        d.documentElement.clientHeight ||
        d.body.clientHeight;
      let length = (h - w) / 2;

      switch (this.degree) {
        case -90:
          length = -length;
          break;
        default:
          length = 0;
      }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector("canvas"));
        this.canvasBox.appendChild(document.createElement("canvas"));
        this.initCanvas();
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        transformOrigin: "center center"
      };
    }
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector("canvas");
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    },
    savePNG() {
      let signImage = this.draw.getPNGImage();
      this.$emit("save", signImage);
      setTimeout(() => {
        this.draw.clear();
      }, 0);
    },
    tapCancel() {
      this.$emit("cancel");
      setTimeout(() => {
        this.draw.clear();
      }, 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  #canvasBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .head {
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        flex: 1;
        font-size: 32px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 45px;
      }
      .default {
        flex: 1;
        &__text {
          font-size: 12px;
        }
      }
      .clear {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    canvas {
      flex: 1;
      cursor: crosshair;
      border: 1px dashed lightgray;
    }
    .confirm {
      margin-top: 2px;
      width: 100%;
      height: 97px;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 97px;
      background: rgba(96, 150, 248, 1);
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
    }
    .cancel {
      width: 100%;
      height: 97px;
      font-size: 32px;
      text-align: center;
      color: #333;
      line-height: 97px;
      background: #fff;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
