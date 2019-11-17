<template>
  <div class="mangban">
    <van-nav-bar
      title="断路安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
      fixed
    />
    <van-skeleton title :row="3" :loading="isLoading" class="skeleton fixed-first">
      <div class="app">
        <div class="cell_group">
          <!-- 申请部门 -->
          <cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
          <!-- 申请人 -->
          <cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
          <!-- 作业票编号 -->
          <cell-value title="作业票编号" :value="$route.query.code" disable></cell-value>
          <!-- 作业票状态 -->
          <!-- <cell-value title="作业票状态" value="初审" disable></cell-value>
            <cell-value title="作业票状态" value="初审" disable></cell-value>
            <cell-value title="作业票状态" value="初审" disable></cell-value>
          <cell-value title="作业票状态" value="初审" disable></cell-value>-->
          <cell-value title="作业票状态" value="已终结" disable></cell-value>
          <!-- 断路原因 -->
          <cell-value title="断路原因" value="初审" v-if="sendData.reason == 2" disable></cell-value>
          <cell-value title="断路原因" value="审核" v-if="sendData.reason == 3" disable></cell-value>
          <cell-value title="断路原因" value="有效" v-if="sendData.reason == 4" disable></cell-value>
          <cell-value title="断路原因" value="已终结" v-if="sendData.reason == 5" disable></cell-value>
          <!-- 危害辨识 -->
          <cell-value title="危害辨识" :value="sendData.endangerSign || '无'" disable></cell-value>
          <!-- 断路开始时间 -->
          <cell-value title="断路开始时间" :value="String(sendData.offtimeStart) || '无'" disable></cell-value>
          <!-- 断路结束时间 -->
          <cell-value title="断路结束时间" :value="String(sendData.powertimeEnd) || '无'" disable></cell-value>
          <!-- 作业部门 -->
          <cell-value title="断路结束时间" :value="String(['部门名1', '部门名2']) || '无'" disable></cell-value>
          <!-- 作业部门负责人 -->
          <cell-value title="作业部门负责人" :value="String(sendData.workCharger) || '无'" disable></cell-value>
          <!-- 涉及部门 -->
          <cell-value title="作业部门负责人" :value="String(['人名1', '人名2']) || '无'" disable></cell-value>
          <!-- 断路地段示意图及相关说明-->
          <div class="cell border_none">
            <div class="cell_other">
              <div class="upload">
                <!-- <div class="upload_icon">
                    <van-icon name="photo-o" />
                </div>-->
                <div class="upload_box">
                  <van-image
                    width="5rem"
                    height="5rem"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <div slot>作业前,制定交通组织方案(附后),并已通知相关部门或单位</div>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
            @checked="showSignature(1)"
            @cancel="signatureCancel(1)"
          >
            <div slot>作业前,在断路的路口和相关道路上设置交通警示标志,在作业区附近设置路栏、道路作业警示灯、导向标等交通警示设施</div>
          </Signature>
          <Signature
            :disable="true"
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] ? checked[2].img : ''"
            @checked="showSignature(2)"
            @cancel="signatureCancel(2)"
          >
            <div slot>夜间作业设置警示红灯，并设置固定的围栏</div>
          </Signature>
        </div>

        <!-- 其他安全措施 -->
        <cell-textarea title="其他安全措施" required placeholder="请输入其他安全措施" disable=></cell-textarea>

        <!-- 签字 -->
        <div class="signature" @click="signatureShow = true">
          <div>签字</div>
          <van-icon name="edit" />
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
  <!-- </van-skeleton> -->
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "duanlu",
  mixins: [business, uploadFile],
  components: {
    Signature,
    Canvas
  },
  data() {
    return {
      storeModule: "duanlu",
      sendData: {
        reason: [], //断路原因
        endangerSign: [], //危害辨识
        offtimeStart: "", //断路时间（起）
        powertimeEnd: "", //断路时间（止）
        workCharger: [], //作业部门负责人
        offExplain: "" //相关说明
      },
      fileList: [], // 图片列表
      list_1: [
        "修理马路",
        "开挖埋设水管",
        "埋设电缆",
        "开挖沟渠",
        "吊装设备",
        "管道"
      ],
      list_2: ["人员受伤", "车辆伤害", "人员跌落沟渠"],
      isShowAction: false,
      signatureShow: false,
      checked: [{ checked: false, image: "" }],
      isLoading: false
    };
  },
  computed: mapState({
    reason: state => state.duanlu.reason,
    endangerSign: state => state.duanlu.endangerSign,
    workCharger: state => state.duanlu.workCharger
  }),
  beforeDestroy() {
    this.$store.dispatch("duanlu/cleanState");
  },
  methods: {
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },
    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    // 保存主、子表
    postData(again = false, zypId) {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let offExplain = this.fileList.map(item => {
        return item.id;
      });
      sendData.reason = this.stringData("reason", "list_1");
      sendData.endangerSign = this.stringData("endangerSign", "list_2");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyer = this.$userInfo.userName;
      sendData.offExplain = offExplain.join(",");
      sendData.__sid = this.$userInfo.sessionId;
      let List = [
        {
          num: 1,
          safetyCs: `作业前,制定交通组织方案(附后),并已通知相关部门或单位`,
          affirmRen: this.checked[0] ? this.checked[0].img : 0,
          safetyStatus: this.checked[0] ? 1 : 0
        },
        {
          num: 2,
          safetyCs: `作业前,在断路的路口和相关道路上设置交通警示标志,在作业区附近设置路栏、道路作业警示灯、导向标等交通警示设施`,
          affirmRen: this.checked[1] ? this.checked[1].img : 0,
          safetyStatus: this.checked[1] ? 1 : 0
        },
        {
          num: 3,
          safetyCs: `夜间作业设置警示红灯，并设置固定的围栏`,
          affirmRen: this.checked[2] ? this.checked[2].img : 0,
          safetyStatus: this.checked[2] ? 1 : 0
        }
      ];
      if (again) {
        List.map(item => {
          item.zypId = zypId;
        });
        sendData.htHseDlzypSaftyList = List;
      }
      console.log("sendData: ", sendData);
      this.$api.page_3
        .htHseDlzypSave(sendData)
        .then(res => {
          console.log("res: ", res);
          if (again) {
            this.$Toast.success({
              message: "提交成功",
              onClose() {
                that.pageBack();
              }
            });
          } else {
            // 保存子表
            this.postData(true, res.message);
          }
        })
        .catch(() => {});
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
    // 保存签名
    saveCanvas(e) {
      this.signatureShow = false;
      this.checked[this.selectSignatureShow] = {
        checked: false,
        img: ""
      };
      this.checked[this.selectSignatureShow].img = e;
      console.log("signatureShow: ");
    },
    // 取消签名
    cancelCanvas() {
      this.checked[this.selectSignatureShow].checked = false;
      this.checked[this.selectSignatureShow].img = "";
      this.signatureShow = false;
    },
    // 编辑-获取页面数据
    getListData() {
      this.isLoading = true;
      this.$api.page_3
        .htHseDlzypListData({
          dlzypCode: this.$route.query.code,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.isLoading = false;
          let info = res.list[0];
          console.log("info: ", info);
          this.sendData.id = info.id;
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
          console.log(111111111)
          console.log("this.sendData: ", this.sendData);
          // 获取图片
          this.$api.page_3
            .htHseDtzyp_file({
              __t: Date.parse(new Date()),
              bizKey: htHseDtzyp_file,
              bizType: 'htHseDtzyp_file',
              id: sendData.id,
              __sid: localStorage.getItem("JiaHuaSessionId"),
            })
            .then(res => {
              console.log('图片内容', res)
            })
        });

    }
  },
  activated() {
    if (this.$route.query.code) {
      this.getListData();
    }
  },
  watch: {
    reason(res) {
      this.sendData.reason = res;
    },
    endangerSign(res) {
      this.sendData.endangerSign = res;
    },
    workCharger(res) {
      this.sendData.workCharger = res;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.mangban {
  background-color: #fff;
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
.head {
  display: flex;
  text-align: center;
  margin-bottom: 20px;
  .head_1 {
    width: 420px;
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
</style>
