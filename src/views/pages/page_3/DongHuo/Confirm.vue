<template>
  <div class="donghuo_confirm">
    <van-sticky>
      <van-nav-bar
        title="审批"
        right-text="提交"
        left-arrow
        @click-left="pageBack"
        @click-right="confirm"
      />
    </van-sticky>
    <!-- 审批意见 -->
    <cell-textarea title="审批意见" v-model="sendData.comment" placeholder="请输入审批意见" required></cell-textarea>
    <div class="huiqian" v-if="$route.query.huiqian">
      <div class="huiqian__left">会签节点</div>
      <div class="huiqian__right">
        <div class="tag">制造部</div>
        <div class="tag">安环部</div>
      </div>
    </div>
    <div class="signature" @click="signatureShow = true">
      <div class="signature__left">
        签字
        <span>*</span>
      </div>
      <div class="signature__right">
        <div class="signature__image" v-if="signature">
          <img :src="signature" alt srcset />
        </div>
        <van-icon class="signature__icon" name="edit" />
      </div>
    </div>
    <!-- 画板Popup -->
    <van-popup
      class="popup"
      v-model="signatureShow"
      :close-on-click-overlay="false"
      position="bottom"
    >
      <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
    </van-popup>
  </div>
</template>
<script>
import Canvas from "@/components/Canvas.vue";
export default {
  name: "donghuo_confirm",
  components: {
    Canvas
  },
  data() {
    return {
      signature: "", //签名
      signatureShow: false,
      sendData: {
        comment: "" //审批意见
      }
    };
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    // 提交审批
    confirm() {},
    // 保存签名
    saveCanvas(e) {
      this.signature = e;
      this.signatureShow = false;
    },
    // 取消签名
    cancelCanvas() {
      this.signature = "";
      this.signatureShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.huiqian {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    width: calc(100% - 80px);
    bottom: 0;
    left: 40px;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  &__left {
  }
  &__right {
    display: flex;
    align-items: center;
    .tag {
      padding: 0 25px;
      box-sizing: border-box;
      border: 1px solid #f5f5ff;
      margin-left: 20px;
      font-size: 18px;
      line-height: 2;
    }
  }
}

.signature {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__left {
    span {
      color: red;
    }
  }
  &__right {
    display: flex;
    align-items: center;
  }

  &__image {
    margin-right: 10px;
    width: 112.5px;
    height: 45px;

    img {
      width: 112.5px;
      height: 45px;
    }
  }

  &__icon {
    margin-left: auto;
  }
}
</style>
