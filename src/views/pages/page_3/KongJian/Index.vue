<template>
  <div class="donghuo">
    <van-nav-bar
      title="受限空间安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" required :value="$userInfo.officeName" class="readonly"></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" required :value="$userInfo.userName" class="readonly"></cell-value>
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
      <!-- 受限空间所属空间 -->
      <div class="cell">
        <div class="cell_title">
          <span>受限空间所属空间</span>
          <span class="required">*</span>
        </div>
        <div class="cell_value" @click="routeToChoose">
          <span>{{ sendData.zySskj.length == 0 ? "单位名称" : zySskj }}</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 作业内容 -->
      <cell-textarea title="作业内容" required v-model="sendData.zyContent" placeholder="请输入作业内容"></cell-textarea>
      <!-- 设备名称 -->
      <cell-input title="设备名称" required v-model="sendData.devicename" placeholder="请输入设备名称"></cell-input>
      <!-- 受限空间原有界质 -->
      <cell-input title="受限空间原有界质" required v-model="sendData.sxkjNeurogen" placeholder="请输入界质名称"></cell-input>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="zyOtherspecial"
        :tagList="zyOtherspecial"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="zywhBs"
        :tagList="zywhBs"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time title="作业开始时间" required v-model="sendData.zyStarttime"></cell-time>
      <!-- 作业结束时间 -->
      <cell-time title="作业结束时间" v-model="sendData.zyEndtime" required></cell-time>
      <!-- 作业部门负责人 -->
      <cell-select-user
        title="作业部门负责人"
        required
        :storeModule="storeModule"
        storeKey="zyPrincipal"
        v-model="sendData.zyPrincipal"
      ></cell-select-user>
      <!-- 作业人 -->
      <cell-select-user
        title="作业人"
        required
        :storeModule="storeModule"
        storeKey="zyRen"
        v-model="sendData.zyRen"
      ></cell-select-user>
      <!-- 监护人 -->
      <cell-select-user
        title="监护人"
        required
        :storeModule="storeModule"
        storeKey="guardian"
        v-model="sendData.guardian"
      ></cell-select-user>

      <!-- 安全措施 -->
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
            <span slot>在有毒介质的管道、设备上作业时，尽可能降低系统压力，作业点应为常压。</span>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
            @checked="showSignature(1)"
            @cancel="signatureCancel(1)"
          >
            <span slot>在有毒介质的管道、设备上作业时，作业人员穿戴适合的防护用具。</span>
          </Signature>
          <Signature
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] ? checked[2].img : ''"
            @checked="showSignature(2)"
            @cancel="signatureCancel(2)"
          >
            <div slot>易燃易爆场所,作业人员穿防静电工作服、工作鞋；作业时使用防爆灯具和防爆工具。</div>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] ? checked[3].img : ''"
            @checked="showSignature(3)"
            @cancel="signatureCancel(3)"
          >
            <div slot>易燃易爆场所，距作业地点 30m 内无其他动火作业。</div>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] ? checked[4].img : ''"
            @checked="showSignature(4)"
            @cancel="signatureCancel(4)"
          >
            <div slot>在强腐蚀性介质的管道、设备上作业时，作业人员已采取防止酸碱灼伤的措施。</div>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] ? checked[5].img : ''"
            @checked="showSignature(5)"
            @cancel="signatureCancel(5)"
          >
            <div slot>介质温度较高、可能造成烫伤的情况下，作业人员已采取防烫措施。</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>同一管道上不同时进行两处及两处以上的盲板抽堵作业。</div>
          </Signature>
        </div>
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
    <!-- <div class="next" @click="Next">下一步</div> -->
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="postData">保存</button>
      <button>工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "../../../../mixin/business";
import Canvas from "@/components/Canvas.vue";
import StepperPlus from "@/components/StepperPlus.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "kongjian",
  mixins: [business],
  data() {
    return {
      initData: {},
      storeModule: "kongjian",
      sendData: {
        zyContent: "", //作业内容
        devicename: "", //设备名称
        sxkjNeurogen: "", //受限空间内原有介质
        zyOtherspecial: [], //涉及的其他特殊作业
        zywhBs: [], //危害辨识
        zyStarttime: "", //作业开始时间
        zyEndtime: "", //作业结束时间
        zySskj: [], // 受限空间所属空间
        guardian: [], // 监护人
        zyPrincipal: [], // 作业部门负责人
        zyRen: [], // 作业人
      },
      checked: [],
      isShowAction: false,
      list_1: [
        "登高",
        "动火",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_2: [
        "火灾",
        "爆炸",
        "中毒",
        "窒息",
        "烫伤",
        "灼伤",
        "机械伤害",
        "高处坠落"
      ],
      selectSignatureShow: Number,
      signatureShow: false
    };
  },
  components: {
    // DonghuoConfirm,
    Canvas,
    StepperPlus,
    Signature
  },
  computed: mapState({
    zyOtherspecial: state => state.kongjian.zyOtherspecial,
    zywhBs: state => state.kongjian.zywhBs
  }),
  beforeDestroy() {
    this.$store.dispatch("kongjian/cleanState");
  },
  methods: {
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
    // 保存画布
    saveCanvas(e) {
      this.signatureShow = false;
      this.checked[this.selectSignatureShow] = {
        checked: false,
        img: ""
      };
      this.checked[this.selectSignatureShow].img = e;
      console.log("signatureShow: ");
    },
    // 取消画布
    cancelCanvas() {
      this.checked[this.selectSignatureShow].checked = false;
      this.checked[this.selectSignatureShow].img = "";
      this.signatureShow = false;
    },

    pageBack() {
      this.$router.back();
    },

    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },

    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.zyOtherspecial = this.stringData("zyOtherspecial", "list_1");
      sendData.zywhBs = this.stringData("zywhBs", "list_2");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyRen = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseSxkjzypSave(sendData)
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

    routeToChoose() {
      let newArr = [];
      this.$api.page_3
        .bmSelect({
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          console.log(res);
          for (let key in res) {
            newArr.push(res[key].name);
          }
          this.$router.push({
            name: "kongjian_select",
            query: {
              showList: newArr
            }
          });
        });
    }
  },
  watch: {
    zyOtherspecial(res) {
      this.sendData.zyOtherspecial = res;
    },
    zywhBs(res) {
      this.sendData.zywhBs = res;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.donghuo {
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

.readonly {
  background-color: #eee !important;
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

<style lang="scss" scoped>
.head {
  display: flex;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
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