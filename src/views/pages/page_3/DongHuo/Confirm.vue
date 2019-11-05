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
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDcAAAHgCAYAAACxTobnAAAgAElEQVR4Xu3dCdQ1yVkf9r9nRjODFiQhsQSMEYssGx8wW1gDgYANmE2ycAI+EPZgbMxmY5uwWGw+YAMCgsJiwOCExBhCJDgmRGCMzOKDw25jQAgQILFIIAYtSCON7JyS3ld655vv/W737eruqurfe84cbH3dVfX8nrrVdZ/bt++fij8CBAgQIECAAAECBAgQIECAQMcCf6rjsRs6AQIECBAgQIAAAQIECBAgQCCKGyYBAQIECBAgQIAAAQIECBAg0LWA4kbX6TN4AgQIECBAgAABAgQIECBAQHHDHCBAgAABAgQIECBAgAABAgS6FlDc6Dp9Bk+AAAECBAgQIECAAAECBAgobpgDBAgQIECAAAECBAgQIECAQNcCihtdp8/gCRAgQIAAAQIECBAgQIAAAcUNc4AAAQIECBAgQIAAAQIECBDoWkBxo+v0GTwBAgQIECBAgAABAgQIECCguGEOECBAgAABAgQIECBAgAABAl0LKG50nT6DJ0CAAAECBAgQIECAAAECBBQ3zAECBAgQIECAAAECBAgQIECgawHFja7TZ/AECBAgQIAAAQIECBAgQICA4oY5QIAAAQIECBAgQIAAAQIECHQtoLjRdfoMngABAgQIECBAgAABAgQIEFDcMAcIECBAgAABAgQIECBAgACBrgUUN7pOn8ETIECAAAECBAgQIECAAAECihvmAAECBAgQIECAAAECBAgQINC1gOJG1+kzeAIECBAgQIAAAQIECBAgQEBxwxwgQIAAAQIECBAgQIAAAQIEuhZQ3Og6fQZPgAABAgQIECBAgAABAgQIKG6YAwQIECBAgAABAgQIECBAgEDXAoobXafP4AkQIECAAAECBAgQIECAAAHFDXOAAAECBAgQIECAAAECBAgQ6FpAcaPr9Bk8AQIECBAgQIAAAQIECBAgoLhhDhAgQIAAAQIECBAgQIAAAQJdCyhudJ0+gydAgAABAgQIECBAgAABAgQUN8wBAgQIECBAgAABAgQIECBAoGsBxY2u02fwBAgQIECAAAECBAgQIECAgOKGOUCAAAECBAgQIECAAAECBAh0LaC40XX6DJ4AAQIECBAgQIAAAQIECBBQ3DAHCBAgQIAAAQIECBAgQIAAga4FFDe6Tp/BEyBAgAABAgQI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uDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwmoLgxWEKFQ4AAAQIECBAgQIAAAQIEjiaguHG0jIuXAAECBAgQIECAAAECBAgMJqC4MVhChUOAAAECBAgQIECAAAECBI4moLhxtIyLlwABAgQIECBAgAABAgQIDCaguDFYQoVDgAABAgQIECBAgAABAgSOJqC4cbSMi5cAAQIECBAgQIAAAQIECAwm8P8DXueHWTx55zcAAAAASUVORK5CYII="
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
