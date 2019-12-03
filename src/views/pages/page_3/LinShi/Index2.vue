<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        v-if="linshihtStatus!=='5'"
        title="临时用电"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
      <van-nav-bar v-else title="临时用电" left-text="返回" left-arrow @click-left="pageBack" />
    </van-sticky>
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value disable title="申请部门" required :value="sendData.apprDept"></cell-value>
      <!-- 申请人 -->
      <cell-value disable title="申请人" required :value="sendData.apprRen"></cell-value>
      <!-- 作业内容 -->
      <cell-textarea
        disable
        v-model="sendData.workContent"
        title="作业内容"
        required
        placeholder="请输入作业内容"
      ></cell-textarea>
      <!-- 作业地点 -->
      <cell-input
        disable
        v-model="sendData.workLocation"
        title="作业地点"
        required
        placeholder="请输作业地点"
      ></cell-input>
      <!-- 用电方式 -->
      <cell-picker
        disable
        v-model="sendData.powerType"
        title="用电方式"
        required
        :columns="powerTypeColumns"
      ></cell-picker>
      <!-- 工作电压 -->
      <cell-picker
        disable
        v-model="sendData.jworkVoltage"
        title="工作电压"
        required
        :columns="jworkVoltageColumns"
      ></cell-picker>
      <!-- 公共区域 -->
      <cell-picker
        disable
        v-model="sendData.publicArea"
        title="公共区域"
        required
        :columns="publicAreaColumns"
      ></cell-picker>
      <!-- 用电设备及功率 -->
      <cell-input
        disable
        v-model="sendData.devicePower"
        title="用电设备及功率"
        required
        placeholder="手工录入"
      ></cell-input>
      <!-- 危害辨识 -->
      <cell-select-tag
        disable
        required
        title="危害辨识"
        storeKey="hazardIdentification"
        :tagList="hazardIdentification"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 用电开始时间 -->
      <cell-time disable v-model="sendData.powertimeStart" title="用电开始时间" required></cell-time>
      <!-- 用电结束时间 -->
      <cell-time disable v-model="sendData.powertimeEnd" title="用电结束时间" required></cell-time>
      <!-- 接线人 -->
      <select-organization
        disable
        title="接线人"
        required
        :storeModule="storeModule"
        storeKey="connectRen"
        v-model="sendData.connectRen"
      ></select-organization>
      <!-- 施工作业部门 -->
      <cell-select-department
        disable
        title="施工作业部门"
        required
        :storeModule="storeModule"
        storeKey="workDept"
        v-model="sendData.workDept"
      ></cell-select-department>
      <!-- 施工现场负责人 -->
      <select-organization
        disable
        title="施工现场负责人"
        required
        :storeModule="storeModule"
        storeKey="workCharger"
        v-model="sendData.workCharger"
      ></select-organization>
      <!-- 作业人 -->
      <select-organization
        disable
        title="作业人"
        required
        :storeModule="storeModule"
        storeKey="workRen"
        v-model="sendData.workRen"
      ></select-organization>
      <!-- 电工证号 -->
      <cell-input disable v-model="sendData.licenseCode" title="电工证号" required placeholder="手工录入"></cell-input>
    </div>

    <van-action-sheet v-model="showPicker" :actions="actions" @select="onSelect" />
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button v-if="linshihtStatus==='2'" @click="postData">保存</button>
      <button @click="Next">工作流提交</button>
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
          :disable="linshihtStatus!=='2'"
          :checked="checked[0] ? checked[0].checked : false"
          :img="checked[0] ? checked[0].img : ''"
          @checked="showSignature(0)"
          @cancel="signatureCancel(0)"
        >
          <span slot>安装临时线路人员持有电工作业操作证</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[1] ? checked[1].checked : false"
          :img="checked[1] ? checked[1].img : ''"
          @checked="showSignature(1)"
          @cancel="signatureCancel(1)"
        >
          <span slot>在防爆场所使用的临时电源、元器件和线路达到相应的防爆等级要求</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[2] ? checked[2].checked : false"
          :img="checked[2] ? checked[2].img : ''"
          @checked="showSignature(2)"
          @cancel="signatureCancel(2)"
        >
          <span slot>临时用电的单项和混用线路采用五线制</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[3] ? checked[3].checked : false"
          :img="checked[3] ? checked[3].img : ''"
          @checked="showSignature(3)"
          @cancel="signatureCancel(3)"
        >
          <span slot>临时用电线路在装置内不低于2.5m,道路不低于5m</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[4] ? checked[4].checked : false"
          :img="checked[4] ? checked[4].img : ''"
          @checked="showSignature(4)"
          @cancel="signatureCancel(4)"
        >
          <span slot>临时用电线路架空进线未采用裸线,未在树或脚手架上架设</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[5] ? checked[5].checked : false"
          :img="checked[5] ? checked[5].img : ''"
          @checked="showSignature(5)"
          @cancel="signatureCancel(5)"
        >
          <span slot>暗管埋设及地下电缆线路设有“走向标志”和“安全标志”,电缆埋深大于0.7m</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[6] ? checked[6].checked : false"
          :img="checked[6] ? checked[6].img : ''"
          @checked="showSignature(6)"
          @cancel="signatureCancel(6)"
        >
          <span slot>现场临时用配电盘、箱有防雨措施</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[7] ? checked[7].checked : false"
          :img="checked[7] ? checked[7].img : ''"
          @checked="showSignature(7)"
          @cancel="signatureCancel(7)"
        >
          <span slot>临时用电设施装有漏电保护器,移动工具、手持工具“一机一闸一保护”</span>
        </Signature>
        <Signature
          :disable="linshihtStatus!=='2'"
          :checked="checked[8] ? checked[8].checked : false"
          :img="checked[8] ? checked[8].img : ''"
          @checked="showSignature(8)"
          @cancel="signatureCancel(8)"
        >
          <span slot>用电设备、线路容量、负荷符合要求</span>
        </Signature>
        <cell-textarea
          :disable="linshihtStatus!=='2'"
          v-model="sendData.otherSafety"
          title="其他安全措施"
          required
          placeholder="请输入其他安全措施"
        ></cell-textarea>
        <div class="signature" v-if="linshihtStatus==='2'" @click="showSignature2">
          <span>签字</span>
          <van-image
            v-if="sendData.othercsComplier"
            style="width:40px;margin-left:30px"
            :src="sendData.othercsComplier"
          ></van-image>
          <van-icon style="float:right" name="edit" />
          <span style="float:right;font-size:14px;margin-right:30px">{{sendData.othercsTime}}</span>
        </div>
      </div>

      <div class="cell_group">
        <!-- 临时用电作业初审人 -->
        <select-organization  
        title="临时用电作业初审人" 
        required 
        v-model="sendData.priAppr" 
        storeKey="priAppr"
        disable
        :storeModule="storeModule"
        ></select-organization>
        <!-- 电源接入点 -->
        <cell-input  title="电源接入点" required v-model="sendData.powerAp" :disable="linshihtStatus!== '2'"></cell-input>
        <!-- 临时用电接入人 -->
        <select-organization
          title="临时用电接入人"
          required
          radio
          :storeModule="storeModule"
          storeKey="accessRen"
          :disable="linshihtStatus!== '2'"
          v-model="sendData.accessRen"
        ></select-organization>
        <!-- 仅用执行人电工账号 -->
        <cell-input
          title="供电执行人电工证号"
          required
          :disable="linshihtStatus!== '2'"
          v-model="sendData.excuteLicense"
        ></cell-input>
      </div>
      <van-popup
        class="popup dier"
        v-model="signatureShow"
        :close-on-click-overlay="false"
        position="bottom"
      >
        <Canvas id="linshiSignature" ref="signature1" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { business } from "@/mixin/business";
import LinShiConfirm from "./Confirm";
import StepperPlus from "@/components/StepperPlus.vue";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "linshiindex2",
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
      signatureShow: false,
      security: 1, // 是安全签字 还是其他安全签字
      selectSignatureShow: Number,
      otherSafe: "",
      sendData: {
        apprDept: "",
        apprRen: "",
        otherSafety: "",
        othercsComplier: "",
        othercsTime: "",
        workContent: "", // 作业内容
        workLocation: "", // 作业地点
        powerType: "", // 用电方式
        jworkVoltage: "", // 工作电压
        publicArea: "", // 公共区域
        devicePower: "", // 用电设备及功率
        hazardIdentification: [], // 危害辨识
        powertimeStart: "", // 申请用电时间（起）
        powertimeEnd: "", // 申请用电时间（止）
        connectRen: [], // 接线人
        workCharger: [], // 施工现场负责人
        workRen: [], // 作业人
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
        accessRen: [], // 临时用电接入人
        excuteLicense: "", // 供电执行人电工证号
        priAppr: [], // 临时用电作业初审人
        powerAp: "" // 电源接入点
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
        {
          name: "保存",
          index: 0
        },
        {
          name: "工作流提交",
          index: 1
        },
        {
          name: "取消",
          index: 2
        }
      ],
      checked:[],
      isShowAction: false,
      zypCode: 0,
      actRuTask: "",
      id: "",
      linshihtStatus: ""
    };
  },
  computed: mapState({
    hazardIdentification: state => state.linshi.hazardIdentification,
    accessRen: state => state.linshi.accessRen,
    priAppr: state => state.linshi.priAppr,
  }),
  created() {
    this.initPage();
  },
  beforeDestroy () {
	  this.zypCode = '';
	  this.$store.dispatch("linshi/cleanState");
  },
  methods: {
    initChecked () {
      this.checked = [];
      for (let i = 0;i < 9;i++) {
        let obj = { checked: false };
        this.checked.push(obj);
      }
    },
    //  初始化页面
    initPage() {
      if (this.$route.query.zypCode) {
        if (this.zypCode !== this.$route.query.zypCode) {
          this.zypCode = this.$route.query.zypCode;
          this.sendData.zypCode = this.$route.query.zypCode;
          this.getData();
        }
      } else {
        sendData.apprDept = this.$userInfo.officeName;
        sendData.apprRen = this.$userInfo.userName;
      }
      this.initChecked();
    },
    ...mapMutations("linshi", {
      setTag: "setTag"
    }),
    /**
     * 获取工作票内容
     */
    Next() {
      console.log(this.actRuTask);
      if (this.actRuTask === "") {
        console.log(2);
        let data = {
          id: this.id,
          flowKey: "htHseLsydzypService",
          __sid: localStorage.getItem("JiaHuaSessionId")
        };
        this.$api.page_3
          .start("lsydzyp/htHseLsydzyp", data)
          .then(res => {
            if (res.result === "true") {
              console.log(res);
              if (res.groups) {
                this.$router.push({
                  name: "daibanren",
                  query: {
                    groups: res.groups.join(","),
                    taskId: res.taskId,
                    id: this.id,
                    type: "htHseLsydzypService"
                  }
                });
              } else {
                this.$router.replace({ name: "linshi_list" });
              }
            } else {
              this.$notify(res.message);
            }
          })
          .catch(() => this.$Toast.clear());
      } else {
        this.$router.push({
          name: "linshi_shenpi",
          query: {
            id: this.id,
            actRuTask: this.actRuTask
          }
        });
      }
    },
    getData() {
      this.$Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      let sendData = {};
      sendData.id = this.zypCode;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseLsydzypListDataById(sendData)
        .then(res => {
          this.$Toast.clear();
          console.log("获取工作票内容", res);
          this.linshihtStatus = res.htStatus;
          let info = res;
          this.oldInfo = info;
          this.actRuTask = res.actRuTask?res.actRuTask.id:''
          this.sendData.id = info.id;
          this.sendData.priAppr =res.lsydcsr?[{
            userName:res.lsydcsr.userName,
            userCode:res.lsydcsr.userCode
          }]: [{
            userName:this.$userInfo.userName,
            userCode:this.$userInfo.userCode
          }]
          this.sendData.apprDept = info.sqbm.officeName;
          this.sendData.apprRen = info.sqr.userName;
          this.sendData.workContent = info.workContent;
          this.sendData.workLocation = info.workLocation;
          this.sendData.powerType = Number(info.powerType ? info.powerType : 0);
          this.sendData.jworkVoltage = Number(
            info.workVoltage ? info.workVoltage : 0
          );
          this.sendData.publicArea = Number(
            info.publicArea ? info.publicArea : 0
          );
          this.sendData.devicePower = info.devicePower;
          this.sendData.licenseCode = info.licenseCode;
          this.sendData.powertimeStart = info.powertimeStart;
          this.sendData.powertimeEnd = info.powertimeEnd;
          this.sendData.id = info.id;
          let hazardIdentification = [];
          let hazarStr = info.hazardIdentification || "";
          hazarStr.split(",").map(items => {
            hazardIdentification.push(this.list_1[items - 1]);
          });
          this.setTag({
            tags: {
              key: "hazardIdentification",
              value: hazardIdentification
            }
          });
          this.sendData.workDept = [
            {
              id: info.zybm.id,
              pId: info.zybm.pId,
              name: info.zybm.officeName,
              title: info.zybm.title
            }
          ];
          //  connectRen 接线人  apprRen 申请人  workCharger 施工负责人
          //   this.reductionSelectUserObj(this.assemblyStrToUserObj(info.guardian, info.guardianCode));
          this.sendData.connectRen = this.reductionSelectUserObj(info.jxr);
          this.sendData.workCharger = this.reductionSelectUserObj(info.zybmfzr);
          this.sendData.workRen = this.reductionSelectUserObj(
            this.assemblyStrToUserObj(info.workRen || "", info.zyrNames || "")
          );
           if (info.lsydzypSafetyList.length > 0) {
            this.initChilderData(info.lsydzypSafetyList);
          }
          console.log('this.sendData.workRen',this.sendData.workRen);
           this.sendData.accessRen= this.reductionSelectUserObj(info.lsydjrr), // 临时用电接入人
           this.sendData.excuteLicense= info.excuteLicense, // 供电执行人电工证号
           this.sendData.powerAp= info.powerAp // 电源接入点
          this.sendData.otherSafety = info.otherSafety;
          this.sendData.othercsComplier= info.othercsComplier;
          this.sendData.othercsTime = info.othercsTime;
         
          console.log('this.sendData', this.sendData);
        })
        .catch(err => {
          this.$Toast.clear();
          console.log("getdata 报错了", err);
        });
    },
    saveCanvas(e) {
      switch (this.security) {
        case 1:
          this.signatureShow = false;
          // this.checked[this.selectSignatureShow] = {
          //   checked: false,
          //   img: ""
          // };
          this.checked[this.selectSignatureShow].checked = true;
          this.checked[this.selectSignatureShow].img = e;
          break;
        case 2:
          this.sendData.othercsComplier = e;
          this.sendData.othercsTime = this.$dayjs(new Date()).format(
            "YYYY-MM-DD HH:mm"
          );
          break;
      }
      this.signatureShow = false;
    },
    onMaterialCancel() {
      this.materialShowShow = false;
    },
    cancelCanvas() {
      switch (this.security) {
        case 1:
          this.checked[this.selectSignatureShow].checked = false;
          this.checked[this.selectSignatureShow].img = "";
          break;
        case 2:
          this.sendData.othercsComplier = "";
          this.sendData.othercsTime = ""
          break;
      }
      this.signatureShow = false;
    },
    showSignature2() {
      this.security = 2; // 安全签字
      this.signatureShow = true;
    },
    // 显示签名
    showSignature(index) {
      this.selectSignatureShow = index;
      this.security = 1; // 安全签字
      if (!this.checked[index].checked) {
        this.signatureShow = true;
      }
    },
    // 取消签名
    signatureCancel(index) {
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
      console.log(sendData.powerAp)
      sendData.connectRen = this.userString(sendData.connectRen, "userCode");
      sendData.workCharger = this.userString(sendData.workCharger, "userCode");
      sendData.workRen = this.userString(sendData.workRen, "userCode");
      sendData.workDept = this.userString(sendData.workDept, "id");
      sendData.__sid = this.$userInfo.sessionId;
      if (this.$route.query.zypCode) {
        sendData.apprDept = this.oldInfo.sqbm.officeCode;
        sendData.apprRen = this.oldInfo.sqr.userCode;
      } else {
        sendData.apprDept = this.$userInfo.officeCode;
        sendData.apprRen = this.$userInfo.userCode;
      }  
      // 安全 措施
//       console.log('postData----sendData1', sendData);
      sendData.lsydzypSafetyList = this.setChilderData(sendData.id);
      sendData.accessRen = this.userString(sendData.accessRen, "userCode"); // 临时用电接入人 
      sendData.priAppr = this.userString(sendData.priAppr, "userCode");// 临时用电作业初审人
      //  其他安全措施
      console.log('postData----sendData2', sendData);
        this.$api.page_3
        .htHseLsydzypSave(sendData, this.$userInfo.sessionId)
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
    initChilderData (res) {
      let checked = {};
        console.log("临时用电子表", res);
        res.forEach((item, inx) => {
          if (item.safetyStatus && item.safetyStatus === 1) {
            checked[item.num] = {
              checked: true,
              img: item.affirmRen,
            };
          } else {
            checked[item.num] = {
              checked: false,
              img: "",
            };
          }
        });
        this.checked = Object.values(checked);
    },
    setChilderData (messageId) {
       let lsydzypSafetyList = [
        {
          zypId: messageId,
          num: 1,
          safetyCs: `安装临时线路人员持有电工作业操作证`,
          affirmRen: this.checked[0].checked ? this.checked[0].img : 0,
          safetyStatus: this.checked[0].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 2,
          safetyCs: `在防爆场所使用的临时电源、元器件和线路达到相应的防爆等级要求`,
          affirmRen: this.checked[1].checked ? this.checked[1].img : 0,
          safetyStatus: this.checked[1].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 3,
          safetyCs: `临时用电的单项和混用线路采用五线制`,
          affirmRen: this.checked[2].checked ? this.checked[2].img : 0,
          safetyStatus: this.checked[2].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 4,
          safetyCs: `临时用电线路在装置内不低于2.5m,道路不低于5m`,
          affirmRen: this.checked[3].checked ? this.checked[3].img : 0,
          safetyStatus: this.checked[3].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 5,
          safetyCs: `临时用电线路架空进线未采用裸线,未在树或脚手架上架设`,
          affirmRen: this.checked[4].checked ? this.checked[4].img : 0,
          safetyStatus: this.checked[4].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 6,
          safetyCs: `暗管埋设及地下电缆线路设有“走向标志”和“安全标志”,电缆埋深大于0.7m`,
          affirmRen: this.checked[5].checked ? this.checked[5].img : 0,
          safetyStatus: this.checked[5].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 7,
          safetyCs: `现场临时用配电盘、箱有防雨措施`,
          affirmRen: this.checked[6].checked ? this.checked[6].img : 0,
          safetyStatus: this.checked[6].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 8,
          safetyCs: `临时用电设施装有漏电保护器,移动工具、手持工具“一机一闸一保护”`,
          affirmRen: this.checked[7].checked ? this.checked[7].img : 0,
          safetyStatus: this.checked[7].checked ? 1 : 0
        },
        {
          zypId: messageId,
          num: 9,
          safetyCs: `用电设备、线路容量、负荷符合要求`,
          affirmRen: this.checked[8].checked ? this.checked[8].img : 0,
          safetyStatus: this.checked[8].checked ? 1 : 0
        }
      ];
      return lsydzypSafetyList;
    },
    onSelect(item) {
      this.showPicker = false;
      if (item.index === 0) {
        this.Next();
      }
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    }
  },
  watch: {
    accessRen(res) {
      console.log('accessRen=============', res);
      this.sendData.accessRen = res;
    },
    priAppr(res) {
      console.log('priApprres=============', res);
      this.sendData.priAppr = res;
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
    font-size: 35px;
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
.signature {
  background-color: white;
  padding: 1.25rem;
  font-size: 15px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
</style>
