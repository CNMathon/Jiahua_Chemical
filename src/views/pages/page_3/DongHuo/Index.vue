<template>
  <div class="donghuo">
    <van-nav-bar
      title="动火安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
      fixed
    />
    <div class="cell_group fixed-first">
      <!-- 申请部门 -->
      <cell-value title="申请部门" required :value="$userInfo.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" required :value="$userInfo.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" value disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value
        title="作业票编号"
        required
        v-if="initData.dhzypCode"
        :value="$userInfo.dhzypCode"
        class="readonly"
      ></cell-value>
      <!-- 作业票状态 -->
      <cell-value
        title="作业票状态"
        required
        v-if="initData.htStatus"
        :value="$userInfo.userName"
        class="readonly"
      ></cell-value>
      <!-- 动火地点及内容 -->
      <cell-textarea title="动火地点及内容" required v-model="sendData.siteContent" placeholder="请输入作业内容"></cell-textarea>
      <!-- 动火级别 -->
      <cell-picker title="动火级别" required v-model="sendData.dhLevel" :columns="dhLevelColumns"></cell-picker>
      <!-- 动火方式 -->
      <cell-select-tag
        required
        title="动火方式"
        storeKey="dhWay"
        :tagList="dhWay"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 涉及其他作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="otherSpecial"
        :tagList="otherSpecial"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :tagList="hazardSb"
        :showList="list_3"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 动火开始时间 -->
      <cell-time v-model="sendData.startTime" title="动火开始时间" required></cell-time>
      <!-- 动火结束时间 -->
      <cell-time v-model="sendData.endTime" title="动火结束时间" required></cell-time>
      <!-- 动火作业负责人 -->
      <cell-select-user
        title="动火作业负责人"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.dhzyPrincipal"
      ></cell-select-user>
      <!-- 动火人 -->
      <cell-select-user
        title="动火人"
        required
        :storeModule="storeModule"
        storeKey="dhzyRen"
        v-model="sendData.dhzyRen"
      ></cell-select-user>
      <!-- 动火安全 -->
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
            <span slot>动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件。</span>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
            @checked="showSignature(1)"
            @cancel="signatureCancel(1)"
          >
            <span slot>断开与动火设备相连接的所有管线,加盲板</span>
            <span>
              <van-stepper :min="0" v-model="manbanNumber" />
            </span>
            <span slot>块</span>
          </Signature>
          <Signature
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] ? checked[2].img : ''"
            @checked="showSignature(2)"
            @cancel="signatureCancel(2)"
          >
            <div slot>动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离</div>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] ? checked[3].img : ''"
            @checked="showSignature(3)"
            @cancel="signatureCancel(3)"
          >
            <div slot>罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业</div>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] ? checked[4].img : ''"
            @checked="showSignature(4)"
            @cancel="signatureCancel(4)"
          >
            <div slot>高处作业已采取防火花飞溅措施</div>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] ? checked[5].img : ''"
            @checked="showSignature(5)"
            @cancel="signatureCancel(5)"
          >
            <div slot>动火点周围易燃物已清除</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接</div>
          </Signature>
          <Signature
            :checked="checked[7] ? checked[7].checked : false"
            :img="checked[7] ? checked[7].img : ''"
            @checked="showSignature(7)"
            @cancel="signatureCancel(7)"
          >
            <div slot>乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米</div>
          </Signature>
          <Signature
            :checked="checked[8] ? checked[8].checked : false"
            :img="checked[8] ? checked[8].img : ''"
            @checked="showSignature(8)"
            @cancel="signatureCancel(8)"
          >
            <div slot>
              <span>现场配备消防水带</span>
              <span>
                <van-stepper :min="0" v-model="fangshuidaiNumber" />
              </span>
              <span>根，灭火器</span>
              <span>
                <van-stepper :min="0" v-model="miehuoqiNumber" />
              </span>
              <span>台，铁锹</span>
              <span>
                <van-stepper :min="0" v-model="tieqiuNumber" />
              </span>
              <span>把，灭火毯</span>
              <span>
                <van-stepper :min="0" v-model="miehuotanNumber" />
              </span>
              <span>块</span>
            </div>
          </Signature>
        </div>
      </div>

      <!-- 画板Popup -->
      <van-popup
        class="popup"
        v-model="signatureShow"
        :close-on-click-overlay="false"
        position="bottom"
      >
        <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
      </van-popup>

      <!-- 操作Popup -->
      <van-popup v-model="isShowAction" position="bottom" class="action">
        <button @click="postData">保存</button>
        <button>工作流提交</button>
        <button @click="closeAction">取消</button>
      </van-popup>
    </div>
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="postData">保存</button>
      <button>工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
    <!-- <div class="next" @click="postData">下一步</div> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import DonghuoConfirm from "./Confirm";
import StepperPlus from "@/components/StepperPlus.vue";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
// import Action from "../components/Action/Index.vue"
export default {
  name: "donghuo",
  mixins: [business],
  data() {
    return {
      storeModule: "donghuo",
      sendData: {
        siteContent: "", //动火地点及内容
        dhLevel: null, //动火级别
        startTime: "", //动火开始时间
        endTime: "", //动火结束时间
        dhWay: [], //动火方式
        otherSpecial: [], //涉及其他特殊作业
        hazardSb: [], //危害辨识
        dhzyPrincipal: [], //动火作业负责人
        dhzyRen: [] //动火人
      },
      value: 5,
      materialShowShow: false,
      material: {
        index: 0,
        value: ""
      },
      safeSendData: [
        {
          zypId: "",
          num: "",
          safetyCs: "",
          affirmRen: "",
          safetyStatus: Number
        }
      ],
      materialColumns: ["吊车", "行车", "把杆"],
      dhLevelColumns: ["制定位置特殊动火作业", "特殊", "|类", "||类"],
      list_1: [
        "电焊",
        "气（割）焊",
        "塑焊",
        "电钻",
        "风镐",
        "切割",
        "磨削",
        "喷灯"
      ],
      list_2: [
        "登高",
        "受限空间",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_3: [
        "火灾、爆炸",
        "中度和窒息",
        "化学灼伤",
        "机械伤害",
        "触电",
        "高处坠落"
      ],
      initData: [],
      manbanNumber: 0,
      fangshuidaiNumber: 0,
      miehuoqiNumber: 0,
      tieqiuNumber: 0,
      miehuotanNumber: 0,
      signatureShow: false,
      checked: [{ checked: false, image: "" }],
      selectSignatureShow: Number,
      isShowAction: false
    };
  },
  computed: mapState({
    dhWay: state => state.donghuo.dhWay,
    otherSpecial: state => state.donghuo.otherSpecial,
    hazardSb: state => state.donghuo.hazardSb,
    dhzyPrincipal: state => state.donghuo.dhzyPrincipal,
    dhzyRen: state => state.donghuo.dhzyRen
  }),
  beforeDestroy() {
    this.$store.dispatch("donghuo/cleanState");
  },
  methods: {
    // 清除所有数据
    clearData() {
      this.sendData.siteContent = ""; //动火地点及内容
      this.sendData.dhLevel = null; //动火级别
      this.sendData.startTime = ""; //动火开始时间
      this.sendData.endTime = ""; //动火结束时间
      this.sendData.dhWay = []; //动火方式
      this.sendData.otherSpecial = []; //涉及其他特殊作业
      this.sendData.hazardSb = []; //危害辨识
      this.sendData.dhzyPrincipal = []; //动火作业负责人
      this.sendData.dhzyRen = []; //动火人
    },

    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },

    // 判断数据输入的完整性
    // true => 输入完整
    // false => 有问题的输入
    isDataEdit() {
      // 动火地点和内容
      if (this.sendData.siteContent == false) {
        this.$notify("请输入动火地点和内容");
        return false;
      }
      // 动火级别
      if (this.sendData.dhLevel == null) {
        this.$notify("请选择动火级别");
        return false;
      }
      // 动火方式
      if (this.sendData.dhWay == false) {
        this.$notify("请选择动火方式");
        return false;
      }
      // 涉及其他作业
      if (this.sendData.otherSpecial == false) {
        this.$notify("请选择涉及的其他特殊作业");
        return false;
      }
      // 危害辨识
      if (this.sendData.hazardSb == false) {
        this.$notify("请选择危害辨识");
        return false;
      }
      // 动火开始时间
      if (this.sendData.startTime == false) {
        this.$notify("请选择动火开始时间");
        return false;
      }
      // 动火结束时间
      if (this.sendData.endTime == false) {
        this.$notify("请选择动火结束时间");
        return false;
      }
      // 动火作业负责人
      if (this.sendData.dhzyPrincipal == false) {
        this.$notify("请选择动火作业负责人");
        return false;
      }
      // 危害辨识
      if (this.sendData.hazardSb == false) {
        this.$notify("请选择危害辨识");
        return false;
      }
      // 危害辨识
      if (this.sendData.hazardSb == false) {
        this.$notify("请选择危害辨识");
        return false;
      }
      return true;
    },

    // 发送数据
    postData() {
      // 检测到输入不完整直接退出函数
      // if (!this.isDataEdit()) {
      //   return;
      // }

      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.dhWay = this.stringData("dhWay", "list_1");
      sendData.otherSpecial = this.stringData("otherSpecial", "list_2");
      sendData.hazardSb = this.stringData("hazardSb", "list_3");
      sendData.dhzyPrincipal = this.userString(
        sendData.dhzyPrincipal,
        "userName"
      );

      let messageId; // 主表查询返回的ID
      let sendSafeData = [
        {
          zypId: messageId,
          num: 1,
          safetyCs: `动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件。`,
          affirmRen: this.checked[0] ? this.checked[0].img : 0,
          safetyStatus: this.checked[0] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 2,
          safetyCs: `断开与动火设备相连接的所有管线,加盲板${this.manbanNumber}块`,
          affirmRen: this.checked[1] ? this.checked[1].img : 0,
          safetyStatus: this.checked[1] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 3,
          safetyCs: `动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离`,
          affirmRen: this.checked[2] ? this.checked[2].img : 0,
          safetyStatus: this.checked[2] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 4,
          safetyCs: `罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业`,
          affirmRen: this.checked[3] ? this.checked[3].img : 0,
          safetyStatus: this.checked[3] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 5,
          safetyCs: `高处作业已采取防火花飞溅措施`,
          affirmRen: this.checked[4] ? this.checked[4].img : 0,
          safetyStatus: this.checked[4] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 6,
          safetyCs: `动火点周围易燃物已清除`,
          affirmRen: this.checked[5] ? this.checked[5].img : 0,
          safetyStatus: this.checked[5] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 7,
          safetyCs: `电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接`,
          affirmRen: this.checked[6] ? this.checked[6].img : 0,
          safetyStatus: this.checked[6] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 8,
          safetyCs: `乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米`,
          affirmRen: this.checked[7] ? this.checked[7].img : 0,
          safetyStatus: this.checked[7] ? 1 : 0
        },
        {
          zypId: messageId,
          num: 9,
          safetyCs: `现场配备消防水带${this.fangshuidaiNumber}根，灭火器${this.miehuoqiNumber}台，铁锹${this.tieqiuNumber}把，灭火毯${this.miehuotanNumber}块`,
          affirmRen: this.checked[8] ? this.checked[8].img : 0,
          safetyStatus: this.checked[8] ? 1 : 0
        }
      ];

      let ren0 = this.checked[0] ? this.checked[0].img : 0;
      let ren1 = this.checked[1] ? this.checked[1].img : 1;
      let ren2 = this.checked[2] ? this.checked[2].img : 2;
      let ren3 = this.checked[3] ? this.checked[3].img : 3;
      let ren4 = this.checked[4] ? this.checked[4].img : 4;
      let ren5 = this.checked[5] ? this.checked[5].img : 5;
      let ren6 = this.checked[6] ? this.checked[6].img : 6;
      let ren7 = this.checked[7] ? this.checked[7].img : 6;

      let sendSafeData1 = {
        // __sid: localStorage.getItem('JiaHuaSessionId'),
        zypId: messageId,
        num: [1, 2, 3, 4, 5, 6, 7, 8],
        affirmRen: [ren0, ren1, ren2, ren3, ren4, ren5, ren6, ren7],
        safetyStatus: [
          this.checked[1] ? 1 : 0,
          this.checked[2] ? 1 : 0,
          this.checked[3] ? 1 : 0,
          this.checked[4] ? 1 : 0,
          this.checked[5] ? 1 : 0,
          this.checked[6] ? 1 : 0,
          this.checked[7] ? 1 : 0,
          this.checked[8] ? 1 : 0
        ],
        safetyCs: [
          `动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件。`,
          `断开与动火设备相连接的所有管线,加盲板${this.manbanNumber}块`,
          `动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离`,
          `罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业`,
          `高处作业已采取防火花飞溅措施`,
          `动火点周围易燃物已清除`,
          `电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接`,
          `乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米`,
          `现场配备消防水带${this.fangshuidaiNumber}根，灭火器${this.miehuoqiNumber}台，铁锹${this.tieqiuNumber}把，灭火毯${this.miehuotanNumber}块`
        ]
      };

      sendData.dhzyRen = this.userString(sendData.dhzyRen, "userName");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyRen = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;
      sendData.startTime = Date(sendData.startTime);
      sendData.endTime = Date(sendData.endTime);
      console.log(1111111);
      console.log(sendData);
      this.$api.page_3
        .htHseDhzypSave(sendData)
        .then(res => {
          console.log("res: ", res);
          messageId = res.message;
          this.$Toast.success({
            message: "提交成功"
            // onClose() {
            // that.clearData();
            // that.pageBack();
            // }
          });
          console.log(sendSafeData);
          console.log(JSON.stringify(sendSafeData1));
          this.$api.page_3
            .htHseDhzypSaveHtHseDhzypSafety(
              JSON.stringify(sendSafeData),
              this.$userInfo.sessionId
            )
            .then(res => {
              console.log("res: ", res);
            });
        })
        .catch(() => {});
    },

    // 返回上一页
    pageBack() {
      this.$router.back();
    },

    onClickCheckbox(e) {
      setTimeout(() => {
        console.log(e);
        this.checked[e] = false;
        console.log(this.checked);
      }, 0);
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
    }
  },
  watch: {
    dhWay(res) {
      this.sendData.dhWay = res;
    },
    otherSpecial(res) {
      this.sendData.otherSpecial = res;
    },
    hazardSb(res) {
      this.sendData.hazardSb = res;
    },
    dhzyPrincipal(res) {
      this.sendData.dhzyPrincipal = res;
    },
    dhzyRen(res) {
      this.sendData.dhzyRen = res;
    },
    // 材质选择
    onMaterialConfirm(value, index) {
      this.materialShowShow = false;
      this.material = {
        index: index,
        value: value
      };
    }
  },
  components: {
    DonghuoConfirm,
    Canvas,
    StepperPlus,
    Signature
  }
};
</script>

<style lang="scss" scoped>
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
</style>