<template>
  <div class="donghuo">
    <van-sticky>
      <van-nav-bar
        title="受限空间安全"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
    </van-sticky>
    <van-skeleton title :row="3" :loading="isLoading" class="skeleton">
      <div class="cell_group">
        <!-- 申请部门 -->
        <cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
        <!-- 申请人 -->
        <cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
        <!-- 作业票编号 -->
        <cell-value title="作业票编号" :value="sendData.id" disable></cell-value>
        <!-- 作业票状态 -->
        <cell-value title="作业票状态" value="编辑" disable></cell-value>
        <!-- 作业票编号 -->
        <cell-value title="作业票编号" required v-if="initData.dhzypCode" :value="$userInfo.dhzypCode"></cell-value>
        <!-- 作业票状态 -->
        <cell-value
          title="作业票状态"
          required
          v-if="initData.htStatus"
          :value="$userInfo.userName"
          class="readonly"
        ></cell-value>
        <!-- 受限空间所属单位 -->
        <cell-select-department
          title="受限空间所属单位"
          required
          :storeModule="storeModule"
          storeKey="sxkjDanwei"
          v-model="sendData.sxkjDanwei"
        ></cell-select-department>
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
          :tagList="sendData.zyOtherspecial"
          :showList="list_1"
          :storeModule="storeModule"
        ></cell-select-tag>
        <!-- 危害辨识 -->
        <cell-select-tag
          required
          title="危害辨识"
          storeKey="zywhBs"
          :tagList="sendData.zywhBs"
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
          :max="2"
          :storeModule="storeModule"
          storeKey="zyPrincipal"
          v-model="sendData.zyPrincipal"
        ></cell-select-user>
        <!-- 作业人 -->
        <cell-select-user
          title="作业人"
          required
          :max="9"
          :storeModule="storeModule"
          storeKey="zyRen"
          v-model="sendData.zyRen"
        ></cell-select-user>
        <!-- 监护人 -->
        <cell-select-user
          title="监护人"
          required
          :max="2"
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
    </van-skeleton>
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
</template>
<script>
import { mapState } from "vuex";
import { business } from "../../../../mixin/business";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
import StepperPlus from "@/components/StepperPlus.vue";
export default {
  name: "kongjian",
  mixins: [business],
  components: {
    Canvas,
    Signature
  },
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
        sxkjDanwei: [], // 受限空间所属单位
        guardian: [], // 监护人
        zyPrincipal: [], // 作业部门负责人
        zyRen: [] // 作业人
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
      signatureShow: false,
      isLoading: false
    };
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
    },
    sxkjDanwei(res) {
      this.sendData.sxkjDanwei = res;
    }
  },
  computed: mapState({
    zyOtherspecial: state => state.kongjian.zyOtherspecial,
    zywhBs: state => state.kongjian.zywhBs,
    guardian: state => state.kongjian.guardian,
    zyRen: state => state.kongjian.zyRen,
    zyPrincipal: state => state.kongjian.zyPrincipal,
    sxkjDanwei: state => state.kongjian.sxkjDanwei
  }),
  activated() {
    if (this.$route.query.id) {
      if (this.queryId !== this.$route.query.id) {
        this.queryId = this.$route.query.id;
        // this.getPageData();
      }
    }
  },
  beforeDestroy() {
    this.$store.dispatch("kongjian/cleanState");
  },
  methods: {
    // 显示签名
    showSignature(index) {
      this.selectSignatureShow = index;
      this.signatureShow = true;
    },
    // 取消签名
    signatureCancel(index) {
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
    },
    // 取消画布
    cancelCanvas() {
      this.checked[this.selectSignatureShow].checked = false;
      this.checked[this.selectSignatureShow].img = "";
      this.signatureShow = false;
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
      this.$Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.zyOtherspecial = this.stringData("zyOtherspecial", "list_1");
      sendData.zywhBs = this.stringData("zywhBs", "list_2");
      sendData.guardian = this.userString(sendData.guardian, "userName");
      sendData.zyPrincipal = this.userString(sendData.zyPrincipal, "userName");
      sendData.zyRen = this.userString(sendData.zyRen, "userName");
      sendData.sxkjDanwei = this.userString(sendData.sxkjDanwei, "name");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyRen = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseSxkjzypSave(sendData)
        .then(res => {
          this.$Toast.clear();
          this.$Toast.success({
            message: "提交成功",
            onClose() {
              that.pageBack();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.donghuo {
  // background-color: #f5f5f5;
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

<style lang="scss">
.skeleton {
  padding-top: 40px;
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