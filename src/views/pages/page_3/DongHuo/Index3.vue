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
      <cell-value title="作业票编号" :value="$route.query.id" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value
        title="作业票编号"
        required
        v-if="initData.dhzypCode"
        :value="$userInfo.dhzypCode"
        class="readonly"
        disable
      ></cell-value>
      <!-- 作业票状态 -->
      <cell-value
        title="作业票状态"
        required
        v-if="initData.htStatus"
        :value="$userInfo.userName"
        class="readonly"
        disable
      ></cell-value>
      <!-- 动火地点及内容 -->
      <cell-textarea
        title="动火地点及内容"
        required
        v-model="sendData.siteContent"
        placeholder="请输入作业内容"
        disable
      ></cell-textarea>
      <!-- 动火级别 -->
      <cell-picker
        title="动火级别"
        required
        v-model="sendData.dhLevel"
        :columns="dhLevelColumns"
        disable
      ></cell-picker>
      <!-- 动火方式 -->
      <cell-select-tag
        required
        title="动火方式"
        storeKey="dhWay"
        :tagList="dhWay"
        :showList="list_1"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 涉及其他作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="otherSpecial"
        :tagList="otherSpecial"
        :showList="list_2"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :tagList="hazardSb"
        :showList="list_3"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 动火开始时间 -->
      <cell-time v-model="sendData.startTime" title="动火开始时间" required disable></cell-time>
      <!-- 动火结束时间 -->
      <cell-time v-model="sendData.endTime" title="动火结束时间" required disable></cell-time>
      <!-- 动火作业负责人 -->
      <cell-select-user
        title="动火作业负责人"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.dhzyPrincipal"
        disable
      ></cell-select-user>
      <!-- 动火人 -->
      <cell-select-user
        title="动火人"
        required
        :storeModule="storeModule"
        storeKey="dhzyRen"
        v-model="sendData.dhzyRen"
        disable
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
            disable
          >
            <span slot>动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件。</span>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
            @checked="showSignature(1)"
            @cancel="signatureCancel(1)"
            disable
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
            disable
          >
            <div slot>动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离</div>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] ? checked[3].img : ''"
            @checked="showSignature(3)"
            @cancel="signatureCancel(3)"
            disable
          >
            <div slot>罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业</div>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] ? checked[4].img : ''"
            @checked="showSignature(4)"
            @cancel="signatureCancel(4)"
            disable
          >
            <div slot>高处作业已采取防火花飞溅措施</div>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] ? checked[5].img : ''"
            @checked="showSignature(5)"
            @cancel="signatureCancel(5)"
            disable
          >
            <div slot>动火点周围易燃物已清除</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
            disable
          >
            <div slot>电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接</div>
          </Signature>
          <Signature
            :checked="checked[7] ? checked[7].checked : false"
            :img="checked[7] ? checked[7].img : ''"
            @checked="showSignature(7)"
            @cancel="signatureCancel(7)"
            disable
          >
            <div slot>乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米</div>
          </Signature>
          <Signature
            :checked="checked[8] ? checked[8].checked : false"
            :img="checked[8] ? checked[8].img : ''"
            @checked="showSignature(8)"
            @cancel="signatureCancel(8)"
            disable
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
    </div>
    <!-- 动火分析 -->
    <div class="fenxi">
      <div class="fenxi__title">动火分析1</div>
      <!-- 动火开始时间 -->
      <cell-time v-model="sendData.startTime" title="动火分析时间" required disable></cell-time>
      <cell-input v-model="sendData.dtSite" title="分析点名称" required placeholder="手工录入" disable></cell-input>
      <!-- 动火级别 -->
      <cell-picker
        title="可燃气体爆炸极限"
        required
        v-model="sendData.dhLevel"
        :columns="dhLevelColumns"
        disable
      ></cell-picker>
      <cell-input v-model="sendData.dtSite" title="分析数据" required placeholder="手工录入" disable></cell-input>
      <!-- 动火作业负责人 -->
      <cell-select-user
        title="分析人"
        required
        :storeModule="storeModule"
        storeKey="dhzyPrincipal"
        v-model="sendData.dhzyPrincipal"
        disable
      ></cell-select-user>
    </div>
    <cell-textarea title="其他安全措施" required placeholder="请输入其他安全措施" disable></cell-textarea>
    <div class="signature">
      <div>签字</div>
      <van-icon name="edit" />
    </div>
    <!-- 作业范围、内容、方式 -->
    <div class="cell border_none upload">
      <div class="cell_title">
        <span>环境分析图</span>
      </div>
      <div class="cell_other">
        <div class="upload">
          <div class="upload_box">
            <van-uploader
              :before-read="beforeRead"
              :before-delete="beforeDelete"
              v-model="fileList"
              preview-size="5rem"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button>保存</button>
      <button>工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
    <!-- <div class="next" @click="postData">下一步</div> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
import DonghuoConfirm from "./Confirm";
import StepperPlus from "@/components/StepperPlus.vue";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
// import Action from "../components/Action/Index.vue"
export default {
  name: "donghuo",
  mixins: [business, uploadFile],
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
      isShowAction: false,
      fileList: []
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
  activated() {
    console.log(this.$route.query.id);
    if (this.$route.query.id) {
      if (this.queryId !== this.$route.query.id) {
        this.queryId = this.$route.query.id;
        this.getPageData();
      }
    }
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
    // 编辑-获取页面数据
    getPageData() {
      this.$api.page_3
        .htHseDhzypListData({
          id: this.queryId,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          let info = res.list[0];
          console.log("info: ", info);
          for (const key in this.sendData) {
            if (key === "guardian") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "dtMan") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "otherSpecial") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_1
                );
            } else if (key === "hazardSb") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_2
                );
            } else {
              this.sendData[key] = info[key];
            }
          }
          console.log("this.sendData: ", this.sendData);
        });
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
.cell_group {
  /deep/ .cell {
    background-color: #f5f5f5;
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
.signature {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.upload {
  padding: 30px;
  box-sizing: border-box;
}
.fenxi {
  padding: 30px 0;
  box-sizing: border-box;
  &__title {
    padding: 30px;
    color: #fff;
    box-sizing: border-box;
    background-color: blue;
  }
}
</style>