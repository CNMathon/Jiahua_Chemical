<template>
  <div class="donghuo_confirm">
    <van-nav-bar
      title="高处安全"
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
        <div class="confirm_item_content">作业人员身体条件符合要求</div>
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
        <div class="confirm_item_content">作业人员着装符合工作要求</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">作业人员佩戴合格的安全帽</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业人员佩戴安全带,安全带高挂低用
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">作业人员携带有工具袋及安全绳</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业人员佩戴:
          <span class="seclct_tag is_select">过滤式防毒面具或口罩</span>
          <span class="seclct_tag">空气呼吸器</span>
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          现场搭设的脚手架、防护网、围栏符合安全规定
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">垂直分层作业中间有隔离设施</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">梯子、绳子符合安全规定</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          石棉瓦等轻型棚的承重梁、柱能承重负荷的要求
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业人员在石棉瓦等不承重物作业所搭设的承重板稳定牢固
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          采光,夜间作业照明符合作业要求,
          <span class="seclct_tag is_select">无需采用</span>
          <span class="seclct_tag">需采用并已采用</span>防爆灯
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          30m 以上高处作业配备通讯、联络工具
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
