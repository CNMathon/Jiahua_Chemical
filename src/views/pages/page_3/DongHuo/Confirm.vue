<template>
  <div class="donghuo_confirm">
    <!-- <van-nav-bar
      title="动火安全"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    /> -->
    <div class="head">
      <div class="head_1">安全措施</div>
      <div class="head_2">确认</div>
      <div class="head_3">确认人</div>
    </div>
    <div class="confirm_list">
      <div class="confirm_item">
        <div class="confirm_item_content">
          动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件；
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[0]" checked-color="#07c160" click="">
          </van-checkbox>
        </div>
        <div class="confirm_item_signature">
          <van-image
            width="100%"
            height="100%"
            fit="scale-down"
            src=""
          />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          <span>断开与动火设备相连接的所有管线,加盲板</span>
          <span>
            <stepper-plus
              :value="manbanNumber"
              :min="0"
              :disabled="true"
              @getNewValue="getManbanNumber"
            />
          </span>
          <span>块；</span>
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[1]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离；
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[2]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业；
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[3]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">高处作业已采取防火花飞溅措施</div>
        <div class="checkbox">
          <van-checkbox v-model="checked[4]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">动火点周围易燃物已清除</div>
        <div class="checkbox">
          <van-checkbox v-model="checked[5]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接；
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[6]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[7]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          <span>现场配备消防水带</span>
          <stepper-plus
            :value="fangshuidaiNumber"
            :min="0"
            :disabled="true"
            @getNewValue="getFangshuidaiNumber"
          />
          <span>根，灭火器</span>
          <stepper-plus
            :value="miehuoqiNumber"
            :min="0"
            :disabled="true"
            @getNewValue="getMiehuoqiNumber"
          />
          <span>台,铁锹</span>
          <stepper-plus
            :value="tieqiuNumber"
            :min="0"
            :disabled="true"
            @getNewValue="getTieqiuNumber"
          />
          <span>把,灭火毯</span>
          <stepper-plus
            :value="miehuotanNumber"
            :min="0"
            :disabled="true"
            @getNewValue="getMiehuotanNumber"
          />
          <span>块；</span>
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[8]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div>
      <!-- <div class="confirm_item">
        <div class="confirm_item_content">
          其他安全措施
          <textarea class="textarea" cols="30" rows="10"></textarea>
        </div>
        <div class="checkbox">
          <van-checkbox v-model="checked[9]" checked-color="#07c160">
          </van-checkbox>
        </div>
      </div> -->
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
    <!-- <button @click="testme">测试输出</button> -->
  </div>
</template>
<script>
// import Stepper from "@/components/Stepper.vue";
import StepperPlus from "@/components/StepperPlus.vue";
import Canvas from "@/components/Canvas.vue";
export default {
  name: "donghuo_confirm",
  components: {
    // Stepper,
    Canvas,
    StepperPlus
  },
  data() {
    return {
      manbanNumber: 0,
      fangshuidaiNumber: 0,
      miehuoqiNumber: 0,
      tieqiuNumber: 0,
      miehuotanNumber: 0,
      signatureShow: false,
      checked: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
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
    },
    testButtonClick() {
      console.log(`父组件 = ${this.value}`);
    },
    getManbanNumber(data) {
      this.manbanNumber = data;
    },
    getFangshuidaiNumber(data) {
      this.fangshuidaiNumber = data;
    },
    getMiehuoqiNumber(data) {
      this.miehuoqiNumber = data;
    },
    getTieqiuNumber(data) {
      this.tieqiuNumber = data;
    },
    getMiehuotanNumber(data) {
      this.miehuotanNumber = data;
    },

    testme() {
      console.log({
        manbanNumber: this.manbanNumber,
        fangshuidaiNumber: this.fangshuidaiNumber,
        miehuoqiNumber: this.miehuoqiNumber,
        tieqiuNumber: this.tieqiuNumber,
        miehuotanNumber: this.miehuotanNumber
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.checkbox {
  background: white;
  border-radius: 50%;
}
.donghuo_confirm {
  width: 100vw;
  min-height: 100vh;
  background: rgba(245, 245, 245, 1);
  .head {
    width: 100vw;
    height: 94px;
    padding: 0 40px;
    background: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
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
        width: 500px;
        height: auto;
        font-size: 24px;
        color: rgba(255, 255, 255, 1);
        line-height: 33px;
        margin-right: 20px;
        // display: flex;
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
