<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        title="临时用电"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
    </van-sticky>
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value
        title="申请部门"
        required
        :value="$userInfo.officeName"
      ></cell-value>
      <!-- 申请人 -->
      <cell-value
        title="申请人"
        required
        :value="$userInfo.userName"
      ></cell-value>
      <!-- 作业内容 -->
      <cell-textarea
        v-model="sendData.workContent"
        title="作业内容"
        required
        placeholder="请输入作业内容"
      ></cell-textarea>
      <!-- 作业地点 -->
      <cell-input
        v-model="sendData.workLocation"
        title="作业地点"
        required
        placeholder="请输作业地点"
      ></cell-input>
      <!-- 用电方式 -->
      <cell-picker
        v-model="sendData.powerType"
        title="用电方式"
        required
        :columns="powerTypeColumns"
      ></cell-picker>
      <!-- 工作电压 -->
      <cell-picker
        v-model="sendData.jworkVoltage"
        title="用电方式"
        required
        :columns="jworkVoltageColumns"
      ></cell-picker>
      <!-- 公共区域 -->
      <cell-picker
        v-model="sendData.publicArea"
        title="公共区域"
        required
        :columns="publicAreaColumns"
      ></cell-picker>
      <!-- 用电设备及功率 -->
      <cell-input
        v-model="sendData.devicePower"
        title="用电设备及功率"
        required
        placeholder="手工录入"
      ></cell-input>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardIdentification"
        :tagList="hazardIdentification"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 用电开始时间 -->
      <cell-time
        v-model="sendData.powertimeStart"
        title="用电开始时间"
        required
      ></cell-time>
      <!-- 用电结束时间 -->
      <cell-time
        v-model="sendData.powertimeEnd"
        title="用电结束时间"
        required
      ></cell-time>
      <!-- 接线人 -->
      <cell-select-user
        title="接线人"
        required
        :storeModule="storeModule"
        storeKey="connectRen"
        v-model="sendData.connectRen"
      ></cell-select-user>
      <!-- 施工作业部门 -->
      <div class="cell">
        <div class="cell_title">
          <span>施工作业部门</span>
        </div>
        <div class="cell_value">
          <span>人名</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 施工现场负责人 -->
      <cell-select-user
        title="施工现场负责人"
        required
        :storeModule="storeModule"
        storeKey="workCharger"
        v-model="sendData.workCharger"
      ></cell-select-user>
      <!-- 作业人 -->
      <cell-select-user
        title="作业人"
        required
        :storeModule="storeModule"
        storeKey="workRen"
        v-model="sendData.workRen"
      ></cell-select-user>
      <!-- 电工证号 -->
      <cell-input
        v-model="sendData.licenseCode"
        title="电工证号"
        required
        placeholder="手工录入"
      ></cell-input>
    </div>
    <!-- 签名 -->
    
        <van-popup
        class="popup"
        v-model="signatureShow"
        :close-on-click-overlay="false"
        position="bottom"
      >
        <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
      </van-popup>


    <van-action-sheet
      v-model="showPicker"
      :actions="actions"
      @select="onSelect"
    />
    <!-- 操作Popup -->
    <van-popup
      v-model="isShowAction"
      position="bottom"
      class="action"
    >
      <button @click="postData">保存</button>
      <button>工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>

    <div class="confirm">
        <div class="head">
          <div class="head_1">安全措施</div>
          <div class="head_2">确认</div>
          <div class="head_3">确认人</div>
        </div>
        <div class="confirm_list">
          <Signature
            :checked="checked[0] ? checked[0].checked : false"
            :img="checked[0] ? checked[0].img : ''"
            @checked="showSignature(0)"
            @cancel="signatureCancel(0)"
          >
            <span slot>安装临时线路人员持有电工作业操作证</span>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
            @checked="showSignature(1)"
            @cancel="signatureCancel(1)"
          >
            <span slot>在防爆场所使用的临时电源、元器件和线路达到相应的防爆等级要求</span>
          </Signature>
          <Signature
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] ? checked[2].img : ''"
            @checked="showSignature(2)"
            @cancel="signatureCancel(2)"
          >
            <span slot>临时用电的单项和混用线路采用五线制</span>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] ? checked[3].img : ''"
            @checked="showSignature(3)"
            @cancel="signatureCancel(3)"
          >
            <span slot>临时用电线路在装置内不低于2.5m,道路不低于5m</span>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] ? checked[4].img : ''"
            @checked="showSignature(4)"
            @cancel="signatureCancel(4)"
          >
            <span slot>临时用电线路架空进线未采用裸线,未在树或脚手架上架设</span>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] ? checked[5].img : ''"
            @checked="showSignature(5)"
            @cancel="signatureCancel(5)"
          >
              <span slot>暗管埋设及地下电缆线路设有“走向标志”和“安全标志”,电缆埋深大于0.7m</span>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[5].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <span slot>现场临时用配电盘、箱有防雨措施</span>
          </Signature>
          <Signature
            :checked="checked[7] ? checked[7].checked : false"
            :img="checked[7] ? checked[7].img : ''"
            @checked="showSignature(7)"
            @cancel="signatureCancel(7)"
          >
            <span slot>临时用电设施装有漏电保护器,移动工具、手持工具“一机一闸一保护”</span>
          </Signature>
          <Signature
            :checked="checked[8] ? checked[8].checked : false"
            :img="checked[8] ? checked[8].img : ''"
            @checked="showSignature(8)"
            @cancel="signatureCancel(8)"
          >
            <span slot>用电设备、线路容量、负荷符合要求</span>
          </Signature>
          <Signature
            :checked="checked[9] ? checked[9].checked : false"
            :img="checked[9] ? checked[9].img : ''"
            @checked="showSignature(9)"
            @cancel="signatureCancel(9)"
          >
            <div slot>
              其他安全措施:
              <div class="content_lang_input">
                <input type="text" v-model="otherSafe"/>
              </div>
            </div>
          </Signature>
          
          
        </div>

        <div class="cell_group">
          <!-- 临时用电作业初审人 -->
          <cell-value
            title="临时用电作业初审人"
            :value="$userInfo.userName"
          ></cell-value>
          <!-- 电源接入点 -->
          <cell-input
            title="电源接入点"
            required
            :value="$userInfo.userName"
          ></cell-input>
          <!-- 临时用电接入人 -->
            <cell-select-user
                title="临时用电接入人"
                required
                :storeModule="storeModule"
                storeKey="connectRen"
                v-model="sendData.connectRen"
            ></cell-select-user>
          <!-- 仅用执行人电工账号 -->
          <cell-input
            title="临时用电作业初审人"
            required
            :value="$userInfo.userName"
          ></cell-input>
        </div>
        <van-popup
        class="popup"
        v-model="signatureShow"
        :close-on-click-overlay="false"
        position="bottom"
      >
        <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
      </van-popup>
      </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import LinShiConfirm from "./Confirm";
import StepperPlus from "@/components/StepperPlus.vue";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "linshi",
  mixins: [business],
  components: {
    LinShiConfirm,
    Canvas,
    StepperPlus,
    Signature
  },
  data() {
    return {
      storeModule: "linshi",
      checked: [{ checked: false, image: "" }],
      signatureShow: false,
      selectSignatureShow: Number,
      otherSafe: '',
      sendData: {
        workContent: "", //作业内容
        workLocation: "", //作业地点
        powerType: "", //用电方式
        jworkVoltage: "", //工作电压
        publicArea: "", //公共区域
        devicePower: "", //用电设备及功率
        hazardIdentification: [], //危害辨识
        powertimeStart: "", //申请用电时间（起）
        powertimeEnd: "", //申请用电时间（止）
        connectRen: [], //接线人
        workCharger: [], //施工现场负责人
        workRen: [], //作业人
        licenseCode: "", //电工证号

        lsydzypSafetyList: [
        {
          zypId: "",
          num: "",
          safetyCs: "",
          affirmRen: "",
          safetyStatus: Number
        }
      ],
        accessRen: '', // 临时用电接入人
        excuteLicense: '', // 供电执行人电工证号
        priAppr: '', // 临时用电作业初审人
        powerAp: '', // 电源接入点

      },
      powerTypeColumns: ["插座", "接线"], //用电方式
      jworkVoltageColumns: ["220V", "380V"], //用电方式
      publicAreaColumns: ["是", "否"], //公共区域
      list_1: [
        "火灾",
        "爆炸",
        "中毒",
        "窒息",
        "烫伤",
        "灼伤",
        "高处坠落",
        "触电"
      ],
      showPicker: false,
      actions: [
        { name: "保存", index: 0 },
        { name: "工作流提交", index: 1 },
        { name: "取消", index: 2 }
      ],
      isShowAction: false,
    };
  },
  computed: mapState({
    hazardIdentification: state => state.linshi.hazardIdentification,
    connectRen: state => state.linshi.connectRen,
    workCharger: state => state.linshi.workCharger,
    workRen: state => state.linshi.workRen
  }),
  created() {
    console.log(this.$route.query);
    // 获取显示List序列
    this.id = this.$route.query.id || "";
    // 设置显示List
    this.status = this.$route.query.status || 0;
    console.log("this.id: ", this.id);
    if (this.id) {
      this.getData();
    }
  },
  beforeDestroy() {
    this.$store.dispatch("linshi/cleanState");
    this.$destroy("LinShi");
  },
  methods: {
    /**
     * 获取工作票内容
     */
    getData() {
      console.log("获取工作票内容");
      let sendData = {};
      sendData.id = this.id;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseLsydzypListData(sendData)
        .then(res => {
          console.log("res: ", res);
          this.pageList = res.list;
        })
        .catch(() => {});
    },
    saveCanvas(e) {
      this.signatureShow = false;
      this.checked[this.selectSignatureShow] = {
        checked: false,
        img: ""
      };
      this.checked[this.selectSignatureShow].img = e;
      console.log("signatureShow: ");
    },
    onMaterialCancel() {
      this.materialShowShow = false;
    },
    cancelCanvas() {
      this.checked[this.selectSignatureShow].checked = false;
      this.checked[this.selectSignatureShow].img = "";
      this.signatureShow = false;
    },
    // 显示签名
    showSignature(index) {
      console.log("index: ", index);
      console.log("显示签名");
      this.selectSignatureShow = index;
      this.signatureShow = true;
    },
    // 取消签名
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.checked[index].checked = false;
      this.checked[index].img = "";
    },
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.hazardIdentification = this.stringData(
        "hazardIdentification",
        "list_1"
      );
      sendData.connectRen = this.userString(sendData.connectRen, "userName");
      sendData.workCharger = this.userString(sendData.workCharger, "userName");
      sendData.workRen = this.userString(sendData.workRen, "userName");
      sendData.apprDept = this.$userInfo.officeName;
      sendData.apprRen = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;

      let messageId; // 主表查询返回的ID
      sendData.lsydzypSafetyList = [
          {
            zypId: messageId,
            num: 1,
            safetyCs: `安装临时线路人员持有电工作业操作证`,
            affirmRen: this.checked[0] ? this.checked[0].img : 0,
            safetyStatus: this.checked[0] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 2,
            safetyCs: `在防爆场所使用的临时电源、元器件和线路达到相应的防爆等级要求`,
            affirmRen: this.checked[1] ? this.checked[1].img : 0,
            safetyStatus: this.checked[1] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 3,
            safetyCs: `临时用电的单项和混用线路采用五线制`,
            affirmRen: this.checked[2] ? this.checked[2].img : 0,
            safetyStatus: this.checked[2] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 4,
            safetyCs: `临时用电线路在装置内不低于2.5m,道路不低于5m`,
            affirmRen: this.checked[3] ? this.checked[3].img : 0,
            safetyStatus: this.checked[3] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 5,
            safetyCs: `临时用电线路架空进线未采用裸线,未在树或脚手架上架设`,
            affirmRen: this.checked[4] ? this.checked[4].img : 0,
            safetyStatus: this.checked[4] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 6,
            safetyCs: `暗管埋设及地下电缆线路设有“走向标志”和“安全标志”,电缆埋深大于0.7m`,
            affirmRen: this.checked[5] ? this.checked[5].img : 0,
            safetyStatus: this.checked[5] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 7,
            safetyCs: `现场临时用配电盘、箱有防雨措施`,
            affirmRen: this.checked[6] ? this.checked[6].img : 0,
            safetyStatus: this.checked[6] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 8,
            safetyCs: `临时用电设施装有漏电保护器,移动工具、手持工具“一机一闸一保护”`,
            affirmRen: this.checked[7] ? this.checked[7].img : 0,
            safetyStatus: this.checked[7] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 9,
            safetyCs: `用电设备、线路容量、负荷符合要求`,
            affirmRen: this.checked[8] ? this.checked[8].img : 0,
            safetyStatus: this.checked[8] ? 1 : 0
          },
          {
            zypId: messageId,
            num: 10,
            safetyCs: `${this.otherSafe}`,
            affirmRen: this.checked[9] ? this.checked[9].img : 0,
            safetyStatus: this.checked[9] ? 1 : 0
          }
        ],
        sendData.accessRen = '', // 临时用电接入人
        sendData.excuteLicense = '', // 供电执行人电工证号
        sendData.priAppr = '', // 临时用电作业初审人
        sendData.powerAp = '' // 电源接入点

      let ren0 = this.checked[0] ? this.checked[0].img : 0
      let ren1 = this.checked[1] ? this.checked[1].img : 1
      let ren2 = this.checked[2] ? this.checked[2].img : 2
      let ren3 = this.checked[3] ? this.checked[3].img : 3
      let ren4 = this.checked[4] ? this.checked[4].img : 4
      let ren5 = this.checked[5] ? this.checked[5].img : 5
      let ren6 = this.checked[6] ? this.checked[6].img : 6
      let ren7 = this.checked[7] ? this.checked[7].img : 7
      let ren8 = this.checked[8] ? this.checked[8].img : 8
      let ren9 = this.checked[9] ? this.checked[9].img : 9


      let sendSafeData1 = {
        __sid: this.$userInfo.sessionId,
        zypId: messageId,
        num: [1, 2, 3, 4, 5, 6, 7, 8, 9,10],
        affirmRen: [ren0, ren1, ren2, ren3, ren4, ren5, ren6, ren7, ren8, ren9],
        safetyStatus: [
          this.checked[1] ? 1 : 0,
          this.checked[2] ? 1 : 0,
          this.checked[3] ? 1 : 0,
          this.checked[4] ? 1 : 0,
          this.checked[5] ? 1 : 0,
          this.checked[6] ? 1 : 0,
          this.checked[7] ? 1 : 0,
          this.checked[8] ? 1 : 0,
          this.checked[9] ? 1 : 0,
          this.checked[10] ? 1 : 0
        ],
        safetyCs: [
          `安装临时线路人员持有电工作业操作证`,
          `在防爆场所使用的临时电源、元器件和线路达到相应的防爆等级要求`,
          `临时用电的单项和混用线路采用五线制`,
          `临时用电线路在装置内不低于2.5m,道路不低于5m`,
          `临时用电线路架空进线未采用裸线,未在树或脚手架上架设`,
          `暗管埋设及地下电缆线路设有“走向标志”和“安全标志”,电缆埋深大于0.7m`,
          `现场临时用配电盘、箱有防雨措施`,
          `临时用电设施装有漏电保护器,移动工具、手持工具“一机一闸一保护”`,
          `用电设备、线路容量、负荷符合要求`,
          `${this.otherSafe}`
        ]
      }

      this.$api.page_3
        .htHseLsydzypSave(sendData)
        .then(res => {
          console.log("res: ", res);
          this.$Toast.success({
            message: "提交成功",
            onClose() {
              that.pageBack();
            }
          });
        })
        .catch(() => {});
    },
    onSelect(item) {
      this.showPicker = false;
      if (item.index === 0) {
        this.Next();
      }
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false
    },
  },
  watch: {
    hazardIdentification(res) {
      this.sendData.hazardIdentification = res;
    },
    connectRen(res) {
      this.sendData.connectRen = res;
    },
    workCharger(res) {
      this.sendData.workCharger = res;
    },
    workRen(res) {
      this.sendData.workRen = res;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.mangban {
  background-color: #f5f5f5;
  .next {
    width: 100%;
    height: 98px;
    margin-top: 25px;
    font-size: 32px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 98px;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  }
}

.action {
  padding-left: 30px;
  padding-right: 30px;
  background-color: transparent;
  button {
    width: 100%;
    height: 110px;
    margin-bottom: 20px;
    background-color: white;
    border: none;
    border-radius: 30px;
    color: rgb(0, 118, 255);
    font-size: 35px
  }
}

.head {
  display: flex;
  text-align: center;
  .head_1 {
    width: 420px;
    // background-color: red
  }
  .head_2 {
    width: 100px;
  }
  .head_3 {
    width: 300px;
  }
}
</style>
