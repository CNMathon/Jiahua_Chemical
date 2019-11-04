<template>
  <div class="donghuo_confirm">
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
        <div class="confirm_item_content">作业人员作业前已进行了安全教育</div>
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
        <div class="confirm_item_content">地下电力电缆已确认保护措施已落实</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          地下通讯电(光)缆、局域网络电(光)缆已确认保护措施已落实
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          地下供排水、消防管线、工艺管线已确认保护措施已落实
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">已按作业方案图划线和立桩</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          动土地点有电线、管道等地下设施,已向作业单位交待并派人监护;作业时轻挖,未使用铁棒、铁镐或抓斗等机械工具
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          临时用电设施装有漏电保护器,移动工具、手持工具“一机一闸一保护”
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业现场围栏、警戒线、警告牌、夜间照明、警示灯已按要求设置
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">已进行放坡处理和固壁支撑</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          <span>人员出入口和撤离安全措施已落实:</span>
          <span class="seclct_tag is_select">梯子</span>
          <span class="seclct_tag">修坡道</span>
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          <span>施工作业已报</span>
          <span class="seclct_tag is_select">公司办</span>
          <span class="seclct_tag">消防队</span>
          <span class="seclct_tag">安全环保部</span>
          <span class="seclct_tag">公司调度</span>
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          <span>夜间作业采用足够、充足照明,</span>
          <span>
            A防水型灯:
            <span class="seclct_tag is_select">36V</span>
            <span class="seclct_tag">24V</span>
            <span class="seclct_tag">12V</span>
          </span>
          <span>
            防爆型灯:
            <span class="seclct_tag is_select">36V</span>
            <span class="seclct_tag">24V</span>
            <span class="seclct_tag">12V</span>
          </span>
          <span>作业人员已佩戴防护器具</span>
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          动土范围内无障碍物,并已在总图上做标记
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
