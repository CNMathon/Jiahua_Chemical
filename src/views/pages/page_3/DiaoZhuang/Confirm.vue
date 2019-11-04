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
        <div class="confirm_item_content">
          吊装质量大于等于40t的重物和土建工程主体结构;吊装物体虽不足40t,但形状复杂、刚度小、长径比大、精密贵重,作业条件特殊,已编制吊装作业方案,且经作业主管部门和安全管理部门审查,报主管(主管安全生产副总/总工程师批准)
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
          指派专人监护,并监守岗位,非作业人员禁止入内
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业人员已按规定佩戴防护器具和个体防护用品
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          已与分厂(车间)负责人取得联系,建立联系信号
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          已在吊装现场设置安全警戒标志,无关人员不许进入作业现场；
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          已在吊装现场设置安全警戒标志,无关人员不许进入作业现场；
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          室外作业遇到(大雪/暴雨/大雾/六级以上大风),已停止作业
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          检查起重吊装设备、钢丝绳、揽风绳、链条、吊钩等各种机具,保证安全可靠
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          明确分工、坚守岗位,并按规定的联络信号,统一指挥
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          将建筑物、构筑物作为锚点,需经土建工程部门审查核算并批准
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          吊装绳索、揽风绳、拖拉绳等避免同带电线路接触,并保持安全距离
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          人员随同吊装重物或吊装机械升降,应采取可靠的安全措施,并经过现场指挥人员批准
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          利用管道、管架、电杆、机电设备等作吊装锚点,不准吊装
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          悬吊重物下方站人、通行和工作,不准吊装
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">超负荷或重物质量不明,不准吊装</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>

      <div class="confirm_item">
        <div class="confirm_item_content">
          斜拉重物、重物埋在地下或重物坚固不牢,绳打结、绳不齐,不准吊装
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">棱角重物没有衬垫措施,不准吊装</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">安全装置失灵,不准吊装</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          用定型起重吊装机械(履带、轮胎、轿式吊车等)进行吊装作业,遵守该定型机械的操作规程
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业现场出现危险品泄漏,立即停止作业,撤离人员
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">作业完成后现场杂物已清理</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">吊装作业人员持有法定的有效的证件</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          地下通讯、网络电(光)缆、排水沟盖板,承重吊装机械的负重量已确认,保护措施已落实
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          起吊物的质量 吨经确认,在吊装机械的承重范围；
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          在吊装高度的管线、电缆桥架已做好防护措施
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          作业现场围栏、警戒线、警告牌、夜间警示灯已按要求设置
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">吊装作业人员持有法定的有效的证件</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">作业高度和转臂范围内,无架空线路</div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          人员出入口和撤离安全措施已落实:
          <span class="seclct_tag is_select">指示牌</span>
          <span class="seclct_tag">指示灯</span>
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">
          <span>夜间作业采用足够、充足照明，</span>
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
        </div>
        <div class="confirm_item_check">
          <van-icon name="success" />
        </div>
      </div>
      <div class="confirm_item">
        <div class="confirm_item_content">作业人员已佩戴防护器具</div>
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
