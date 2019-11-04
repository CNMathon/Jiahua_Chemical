<template>
  <div class="donghuo_confirm">
    <div class="content">
      <van-nav-bar
        title="吊装安全"
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
            作业前,制定交通组织方案(附后),并已通知相关部门或单位
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
            作业地点处于易燃易爆场所,需要动火时已办理了动火证
          </div>
          <div class="confirm_item_check">
            <van-icon name="success" />
          </div>
        </div>
        <div class="confirm_item">
          <div class="confirm_item_content">
            作业前,在断路的路口和相关道路上设置交通警示标志,在作业区附近设置路栏、道路作业警示灯、导向标等交通警示设施
          </div>
          <div class="confirm_item_check">
            <van-icon name="success" />
          </div>
        </div>
        <div class="confirm_item">
          <div class="confirm_item_content">
            夜间作业设置警示红灯，并设置固定的围栏
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
  .content {
    min-height: calc(100vh - 100px);
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
          .seclct_tag {
            height: 34px;
            padding: 0 15px;
            font-size: 22px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 34px;
            background-color: #ffffff;
            margin-right: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
          }
          .is_select {
            color: rgba(255, 255, 255, 1);
            background-color: #1fc41d;
          }
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
