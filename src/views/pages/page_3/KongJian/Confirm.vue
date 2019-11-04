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
        <div class="confirm_item_content">对进入受限空间危险性进行分析</div>
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
          与受限空间有联系的阀门管线加盲板隔离，列出盲板清单，落实抽堵盲板负责人
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">设备经过置换、吹扫、蒸煮</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          设备打开通风孔进行自然通风,温度适宜人员作业;必要时采用强制通风或佩戴空气呼吸器,但严禁用通氧气或富氧空气的方法补充氧
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          相关设备进行处理,带搅拌机的设备要切断电源,电源开关处加锁或挂“禁止合闸”标志牌,设专人监护
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          <span>
            检查受限空间内部已具备作业条件,清罐时
            <span class="seclct_tag is_select">需用</span>
            <span class="seclct_tag">无需用</span>防爆工具
          </span>
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          检查受限空间进出口通道,无阻碍人员进出的障碍物
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          分析盛装过可燃有毒液体、气体的受限空间内的可燃、有毒有害气体含量
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业人员清楚受限空间内存在的其他危险因素,如内部附件、集渣坑等
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业监护措施:消防器材
          <span class="content_input">
            (
            <input type="text" />)
          </span>
          、救生绳
          <span class="content_input">
            (
            <input type="text" />) </span
          >、气防装备
          <span class="content_input">
            (
            <input type="text" />)
          </span>
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
        .seclct_tag {
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
      .content_input {
        width: 70px;
        display: flex;
        input {
          width: 100%;
          line-height: 1.03125rem;
          text-align: center;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #ffffff;
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
