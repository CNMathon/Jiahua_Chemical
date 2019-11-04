<template>
  <div class="donghuo_confirm">
    <van-nav-bar
      title="盲板抽堵安全"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="head">
      <div class="head_1">安全措施</div>
      <div class="head_2">确认</div>
      <div class="head_3">确认人</div>
    </div>
    <div class="confirm_list">
      <div class="confirm_item">
        <div class="confirm_item_content">
          在有毒介质的管道、设备上作业时,尽可能降低系统压力,作业点应为常压
        </div>
        <div class="confirm_item_check success">
          <van-icon name="success" />
        </div>
        <div class="confirm_item_signature">
          <van-image
            width="100%"
            height="100%"
            fit="scale-down"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          在有毒介质的管道、设备上作业时,作业人员穿戴适合的防护用具
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          易燃易爆场所,作业人员穿防静电工作服、工作鞋;作业时使用防爆灯具和防爆工具
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          易燃易爆场所,距作业地点30m 内无其他动火作业
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          在强腐蚀性介质的管道、设备上作业时,作业人员已采取防止酸碱灼伤的措施
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          介质温度较高、可能造成烫伤的情况下,作业人员已采取防烫措施
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          同一管道上不同时进行两处及两处以上的盲板抽堵作业
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          其他安全措施:
          <div class="content_lang_input">
            <input type="text" />
          </div>
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
    </div>
    <div class="confirm_action">
      <div class="confirm_actions signature" @click="signatureShow = true">
        签字
      </div>
      <div class="confirm_actions confirm">提交</div>
    </div>
    <van-popup class="popup" v-model="signatureShow" position="bottom">
      <Canvas @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
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
      value: 1,
      signatureShow: false
    };
  },
  created() {},
  methods: {
    pageBack() {
      this.$router.back();
    },
    saveCanvas() {
      this.signatureShow = false;
      console.log("signatureShow: ");
    },
    cancelCanvas() {
      this.signatureShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.donghuo_confirm {
  width: 100vw;
  min-height: 100vh;
  background: rgba(245, 245, 245, 1);
  .head {
    width: 100vw;
    height: 94px;
    padding: 0 40px;
    background: rgba(255, 255, 255, 1);
    font-size: 30px;
    color: rgba(19, 19, 19, 1);
    line-height: 45px;
    display: flex;
    align-items: center;
    .head_1 {
      flex: auto;
    }
    .head_2 {
      margin-right: 60px;
    }
    .head_3 {
      margin-right: 29px;
    }
  }
  .confirm_list {
    width: 100vw;
    padding: 20px;
    .confirm_item {
      width: 100%;
      min-height: 126px;
      padding: 30px 30px 30px 20px;
      margin-bottom: 20px;
      background: rgba(96, 150, 248, 1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      .confirm_item_content {
        width: 392px;
        height: auto;
        font-size: 24px;
        color: rgba(255, 255, 255, 1);
        line-height: 33px;
        margin-right: 39px;
        display: flex;
        flex-wrap: wrap;
        .textarea {
          width: 392px;
          height: 170px;
          background: rgba(255, 255, 255, 1);
          border: none;
        }
      }
      .confirm_item_check {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #6096f8;
        background: rgba(255, 255, 255, 1);
      }
      .success {
        color: #ffffff;
        background: rgba(31, 196, 29, 1);
      }
      .error {
        color: #ffffff;
        background: #e45454;
      }
      .confirm_item_signature {
        width: 130px;
        height: 66px;
        background: rgba(255, 255, 255, 1);
        margin-left: auto;
      }
      .content_lang_input {
        width: 100%;
        input {
          width: 100%;
          line-height: 1.03125rem;
          text-align: center;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #ffffff;
        }
      }
    }
  }
  .confirm_action {
    width: 100vw;
    height: 100px;
    display: flex;
    align-items: center;
    .signature {
      flex: 1;
      height: 100px;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 100px;
      background: rgba(248, 155, 96, 1);
    }
    .confirm {
      flex: 1;
      height: 100px;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 100px;
      background: #6096f8;
    }
  }
  .popup {
    height: 568px;
  }
}
</style>
