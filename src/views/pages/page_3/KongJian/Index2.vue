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
      <cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="sendData.id" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" required v-if="initData.dhzypCode" :value="$userInfo.dhzypCode"></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" required value="初审" disable></cell-value>
      <!-- 受限空间所属空间 -->
      <cell-value title="受限空间所属空间" required v-model="sendData.zySskj[0]" placeholder="请输入设备名称" disable></cell-value>
      <!-- 作业内容 -->
      <cell-textarea title="作业内容" required v-model="sendData.zyContent" placeholder="请输入作业内容" disabled class="disabled"></cell-textarea>
      <!-- 设备名称 -->
      <cell-value title="设备名称" required v-model="sendData.devicename" placeholder="请输入设备名称" disable></cell-value>
      <!-- 受限空间原有界质 -->
      <cell-value title="受限空间原有界质" required v-model="sendData.sxkjNeurogen" placeholder="请输入界质名称" disable></cell-value>
      <!-- 涉及其他特殊作业 -->
      <cell-value
        required
        title="涉及其他特殊作业"
        v-model="sendData.zyOtherspecial"
        disable
      ></cell-value>
      <!-- 危害辨识 -->
      <cell-value required title="危害辨识" v-model="sendData.zywhBs" disable></cell-value>
      <!-- 作业开始时间 -->
      <cell-value required title="作业开始时间" v-model="sendData.zyStarttime" disable></cell-value>
      <!-- 作业结束时间 -->
      <cell-value required title="作业结束时间" v-model="sendData.zyEndtime" disable></cell-value>
      <!-- 作业部门负责人 -->
      <cell-value required title="作业结束时间" v-model="sendData.zyPrincipal" disable></cell-value>
      <!-- 作业人 -->
      <cell-value required title="作业结束时间" v-model="sendData.zyRen" disable></cell-value>
      <!-- 监护人 -->
      <cell-value required title="作业结束时间" v-model="sendData.guardian" disable></cell-value>
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
            <span slot>对进入受限空间危险性进行分析。</span>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
            @checked="showSignature(1)"
            @cancel="signatureCancel(1)"
          >
            <span slot>与受限空间有联系的阀门管线加盲板隔离，列出盲板清单，落实抽堵盲板责任人。</span>
          </Signature>
          <Signature
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] ? checked[2].img : ''"
            @checked="showSignature(2)"
            @cancel="signatureCancel(2)"
          >
            <div slot>设备经过置换、吹扫、蒸煮。</div>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] ? checked[3].img : ''"
            @checked="showSignature(3)"
            @cancel="signatureCancel(3)"
          >
            <div slot>设备打开通风孔进行自然通风,温度适宜人员作业;必要时采用强制通风或佩戴空气呼吸器,但严禁用通氧气或富氧空气的方法补充氧。</div>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] ? checked[4].img : ''"
            @checked="showSignature(4)"
            @cancel="signatureCancel(4)"
          >
            <div slot>相关设备进行处理,带搅拌机的设备要切断电源,电源开关处加锁或挂“禁止合闸”标志牌,设专人监护。</div>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] ? checked[5].img : ''"
            @checked="showSignature(5)"
            @cancel="signatureCancel(5)"
          >
            <div slot>检查受限空间内部已具备作业条件,清罐时(无需用/已采用)防爆工具。</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>检查受限空间进出口通道,无阻碍人员进出的障碍物。</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>分析盛装过可燃有毒液体、气体的受限空间内的可燃、有毒有害气体含量。</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>作业人员清楚受限空间内存在的其他危险因素,如内部附件、集渣坑等。</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>作业监护措施:消防器材</div>
            <div>
              <input type="text" />
            </div>
            <div>、救生绳</div>
            <div>
              <input type="text" />
            </div>
            <div>、气防装备</div>
            <div>
              <input type="text" />
            </div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>检查受限空间进出口通道,无阻碍人员进出的障碍物。</div>
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
import Signature from "../components/Signature.vue";
import StepperPlus from "@/components/StepperPlus.vue";
import { send } from 'q';
export default {
  name: "kongjian",
  mixins: [business],
  data() {
    return {
      initData: {},
      storeModule: "kongjian",
      sendData: {
        zyContent: "", //作业内容
        id: this.zypId, // 作业票编号
        devicename: "", //设备名称
        sxkjNeurogen: "", //受限空间内原有介质
        zyOtherspecial: [], //涉及的其他特殊作业
        zywhBs: [], //危害辨识
        zyStarttime: "", //作业开始时间
        zyEndtime: "", //作业结束时间
        zySskj: ['动力中心'], // 受限空间所属空间
        guardian: [], // 监护人
        zyPrincipal: [], // 作业部门负责人
        zyRen: [], // 作业人
        aqcsjl: [], // 安全措施勾选记录
        querenman: "" // 确认人（签名）
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
    Signature
  },
  computed: mapState({
    zyOtherspecial: state => state.kongjian.zyOtherspecial,
    zywhBs: state => state.kongjian.zywhBs,
    guardian: state => state.kongjian.guardian,
    zyRen: state => state.kongjian.zyRen,
    zyPrincipal: state => state.kongjian.zyPrincipal
  }),
  // computed: {
  //   zypStatus() {
  //     return this.$route.query.status
  //   },
  //   zypId() {
  //     return this.$route.query.id
  //   }
  // },
  beforeDestroy() {
    this.$store.dispatch("kongjian/cleanState");
  },
  methods: {
    // 显示签名
    showSignature(index) {
      console.log("index: ", index);
      console.log("显示签名");
      // console.log(this.sendData)
      console.log(this.sendData.aqcsjl);
      this.sendData.aqcsjl.push(index);
      console.log(this.sendData.aqcsjl);
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
      this.sendData.selectSignatureShow = e;
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

    isEmpty(sendData) {
      if(
        sendData.zyContent == "" || 
        sendData.devicename == "" ||
        sendData.sxkjNeurogen == "" ||
        sendData.zyOtherspecial == "" ||
        sendData.zyStarttime == "" ||
        sendData.zyEndtime == "" ||
        sendData.zySskj == [] ||
        sendData.guardian == [] ||
        sendData.zyPrincipal == [] ||
        sendData.zyRen == [] ||
        sendData.aqcsjl == []
      ){
        return false
      }
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
      console.log(sendData)
      // 判断数据是否为空
      if (this.isEmpty(sendData) == false) {
        this.$notify('请将表单中的数据输入完整')
        return
      }
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
    },
  },
  watch: {
    zyOtherspecial(res) {
      this.sendData.zyOtherspecial = res;
    },
    zywhBs(res) {
      this.sendData.zywhBs = res;
    },
    guardian(res) {
      this.sendData.guardian = res;
    },
    zyRen(res) {
      this.sendData.zyRen = res;
    },
    zyPrincipal(res) {
      this.sendData.zyPrincipal = res;
    }
  },
  
  activated() {
    console.log(1111)
    this.sendData.id = "";
    let zypId = this.$route.query.sxkjCode
    let zypStatus = this.$route.query.status
    console.log(this.$route)
    if (zypStatus == 2 && this.$route.query.moreInfo.isInitData == true) {
      let isInitData = this.$route.query.moreInfo.isInitData
      this.sendData.id = zypId
      console.log(2222222)
      console.log(zypId)
      this.$api.page_3
        .htHseSxkjzypListData({
          id: this.sendData.id,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          console.log(res)
          let content = res.list[0]
          this.sendData.zyContent = content.zyContent
          this.sendData.devicename = content.devicename
          this.sendData.sxkjNeurogen = content.sxkjNeurogen
          this.sendData.zyOtherspecial = content.zyOtherspecial
          this.sendData.zywhBs = content.zywhBs
          this.sendData.zyStarttime = content.zyStarttime
          this.sendData.zyEndtime = content.zyEndtime
          this.sendData.zyPrincipal = content.zyPrincipal
          this.sendData.zyRen = content.zyRen
          this.sendData.guardian = content.guardian

        })
      console.log(zypId)
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.donghuo {
  background-color: #f5f5f5;
  .cell {
    background-color: #fff;
  }
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

.disabled {
  background-color: #f5f5f5 !important;
}
</style>