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
        <cell-value title="作业票编号" :value="$route.query.id" disable></cell-value>
        <!-- 作业票状态 -->
        <cell-value title="作业票状态" value="编辑" disable></cell-value>
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
              :img="checked[0] && checked[0].checked ? signatureImg : ''"
              @checked="showSignature(0)"
              @cancel="signatureCancel(0)"
            >
              <span slot>对进入受限空间危险性进行分析。</span>
            </Signature>
            <Signature
              :checked="checked[1] ? checked[1].checked : false"
              :img="checked[1] && checked[1].checked ? signatureImg : ''"
              @checked="showSignature(1)"
              @cancel="signatureCancel(1)"
            >
              <span slot>与受限空间有联系的阀门管线加盲板隔离，列出盲板清单，落实抽堵盲板责任人。</span>
            </Signature>
            <Signature
              :checked="checked[2] ? checked[2].checked : false"
              :img="checked[2] && checked[2].checked ? signatureImg : ''"
              @checked="showSignature(2)"
              @cancel="signatureCancel(2)"
            >
              <div slot>设备经过置换、吹扫、蒸煮。</div>
            </Signature>
            <Signature
              :checked="checked[3] ? checked[3].checked : false"
              :img="checked[3] && checked[3].checked ? signatureImg : ''"
              @checked="showSignature(3)"
              @cancel="signatureCancel(3)"
            >
              <div slot>设备打开通风孔进行自然通风,温度适宜人员作业;必要时采用强制通风或佩戴空气呼吸器,但严禁用通氧气或富氧空气的方法补充氧。</div>
            </Signature>
            <Signature
              :checked="checked[4] ? checked[4].checked : false"
              :img="checked[4] && checked[4].checked ? signatureImg : ''"
              @checked="showSignature(4)"
              @cancel="signatureCancel(4)"
            >
              <div slot>相关设备进行处理,带搅拌机的设备要切断电源,电源开关处加锁或挂“禁止合闸”标志牌,设专人监护。</div>
            </Signature>
            <Signature
              :checked="checked[5] ? checked[5].checked : false"
              :img="checked[5] && checked[5].checked ? signatureImg : ''"
              @checked="showSignature(5)"
              @cancel="signatureCancel(5)"
            >
              <div slot>检查受限空间内部已具备作业条件,清罐时(无需用/已采用)防爆工具。</div>
            </Signature>
            <Signature
              :checked="checked[6] ? checked[6].checked : false"
              :img="checked[6] && checked[6].checked ? signatureImg : ''"
              @checked="showSignature(6)"
              @cancel="signatureCancel(6)"
            >
              <div slot>检查受限空间进出口通道,无阻碍人员进出的障碍物。</div>
            </Signature>
            <Signature
              :checked="checked[7] ? checked[7].checked : false"
              :img="checked[7] && checked[7].checked ? signatureImg : ''"
              @checked="showSignature(7)"
              @cancel="signatureCancel(7)"
            >
              <div slot>分析盛装过可燃有毒液体、气体的受限空间内的可燃、有毒有害气体含量。</div>
            </Signature>
            <Signature
              :checked="checked[8] ? checked[8].checked : false"
              :img="checked[8] && checked[8].checked ? signatureImg : ''"
              @checked="showSignature(8)"
              @cancel="signatureCancel(8)"
            >
              <div slot>作业人员清楚受限空间内存在的其他危险因素,如内部附件、集渣坑等。</div>
            </Signature>
            <Signature
              :checked="checked[9] ? checked[9].checked : false"
              :img="checked[9] && checked[9].checked ? signatureImg : ''"
              @checked="showSignature(9)"
              @cancel="signatureCancel(9)"
            >
              <div slot>作业监护措施
              <span>
                消防器材： <van-stepper :min="0" v-model="fireCount" />
              </span>
              <!-- <div>、救生绳</div> -->
              <span>
              救生绳<van-stepper :min="0" v-model="lifelineCount"/>
              </span>
              <!-- <div>、气防装备</div> -->
              <span>
               气防装备： <van-stepper :min="0" v-model="gasCount"/>
              </span>
              </div>
              <!-- fireCount lifelineCount  gasCount-->
            </Signature>
            <Signature
              :checked="checked[10] ? checked[10].checked : false"
              :img="checked[10] && checked[10].checked ? signatureImg : ''"
              @checked="showSignature(10)"
              @cancel="signatureCancel(10)"
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
      <button @click="Next">工作流提交</button>
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
  name: "kongjianindex",
  components: {
    Canvas,
    Signature
  },
  mixins: [business],
  computed: mapState({
    zyOtherspecial: state => state.kongjian.zyOtherspecial,
    zywhBs: state => state.kongjian.zywhBs,
    guardian: state => state.kongjian.guardian,
    zyRen: state => state.kongjian.zyRen,
    zyPrincipal: state => state.kongjian.zyPrincipal,
    sxkjDanwei: state => state.kongjian.sxkjDanwei
  }),
  data() {
    return {
      initData: {},
      storeModule: "kongjian",
      fireCount: 0, // 消防数量
      lifelineCount: 0, // 救生绳
      gasCount: 0, // 气防装备
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
        zyRen: [], // 作业人
        aqcsjl: [],
        zyjhcs: [], // 作业监护措施
        querenman: ""
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
      signatureImg: '', // 只保存一个签名
      signatureShow: false,
      isLoading: false,
      oldInfo: {}
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
  created() {
    console.log('created this.checked=========',  JSON.parse(JSON.stringify(this.checked)));
    this.initChecked();
    this.initPage();
  },
  beforeDestroy() {
    this.queryId = "";
    this.$store.dispatch("kongjian/cleanState");
  },
  activated() {
    this.initPage();
  },
  methods: {
    initChecked () {
      for (let i =0; i < 11; i ++) {
        let obj = {checked: false};
        this.checked.push(obj);
      }
    },
    initPage() {
      if (this.$route.query.id) {
        if (this.queryId !== this.$route.query.id) {
          this.queryId = this.$route.query.id;
          this.getPageData();
        }
      }
    },
    // 显示签名
    showSignature(index) {
      if (this.signatureImg === "") {
        this.signatureShow = true;
      }
      this.selectChecked(index);
      this.selectSignatureShow = index;
    },
    selectChecked (index) {
      this.checked[index].checked = true;
    },
    // 取消签名
    signatureCancel(index) {
      this.checked[index].checked = false;
      // 如果所有的数据都为false 那么清除签名
      if (this.checked.every((item) => {return !item.checked})) {
        this.signatureImg = '';
      }
    },
    // 保存画布
    saveCanvas(e) {
      this.signatureShow = false;
      // this.checked[this.selectSignatureShow] = {
      //   checked: true,
      //   img: ""
      // };
      this.signatureImg = e;
      // this.sendData.selectSignatureShow = e;
      // this.checked[this.selectSignatureShow].img = e;
      
    },
    // 取消画布
    cancelCanvas(index) {
      this.checked[this.selectSignatureShow].checked = false;
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
      //sendData.applyDept = this.$userInfo.officeName;
      //sendData.applyRen = this.$userInfo.userName;
      sendData.applyDept = this.$userInfo.officeCode;
      sendData.applyRen = this.$userInfo.userCode;
      sendData.__sid = this.$userInfo.sessionId;
      if (this.$route.query.id) {
        sendData.id = this.oldInfo.id;
        sendData.sxkjCode = this.oldInfo.sxkjCode;
      }
      //  储存 安装措施 aqcsjl zyjhcs 作业监护措施
      sendData.aqcsjl = [];
      sendData.zyjhcs = [this.fireCount, // 消防数量
      this.lifelineCount, // 救生绳
      this.gasCount, // 气防装备;
      ];
      //  获得勾选记录
      this.checked.forEach((item, index) => {
        //  安全勾选记录
        if (item.checked) {
          sendData.aqcsjl.push(index + 1);
        }
        if (sendData.querenman=== '' && item.checked) {
          sendData.querenman = this.signatureImg;
        }
      });
      sendData.aqcsjl = sendData.aqcsjl.join(',');
      sendData.zyjhcs = sendData.zyjhcs.join(',');
      this.$api.page_3
        .htHseSxkjzypSave(sendData, this.$userInfo.sessionId)
        .then(res => {
          this.$Toast.clear();
          this.$Toast.success({
            message: "提交成功",
            onClose() {
              that.pageBack();
            }
          });
        })
        .catch(() => {
          this.$Toast.clear();
        });
    },
    reductionSelectDept(data) {
      let newArr = [];
      let arr = data.split(",");
      arr.forEach(element => {
        let obj = {};
        obj.name = element;
        newArr.push(obj);
      });
      return newArr;
    },
    // 空间主表查询
    getPageData() {
      this.$Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.$api.page_3
        .htHseSxkjzypListData({
          sxkjCode: this.queryId,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          let info = res.list[0];
          this.oldInfo = info;
          console.log('获得服务器数据', info);
          // 安装措施 aqcsjl zyjhcs 作业监护措施 querenman 签名
          for (const key in this.sendData) {
            switch (key) {
              case "sxkjDanwei":
                if (info[key])this.sendData[key] = this.reductionSelectDept(info[key]);
                break;
              case "guardian":
                if (info[key])this.sendData[key] = this.reductionSelectUser(info[key]);
                break;
              case "zyRen":
                if (info[key])this.sendData[key] = this.reductionSelectDept(info[key]);
                break;
              case "zyPrincipal":
                if (info[key])this.sendData[key] = this.reductionSelectUser(info[key]);
                break;
              case "querenman":
                if (info[key])this.signatureImg = info[key];
              break;
                // 安装措施
              case "aqcsjl":
                console.log("aqcsjl info[key]=================", info[key]);
                if (info[key])info[key].split(',').forEach((item) => {
                  console.log("aqcsjl=================", item);
                  this.selectChecked(item - 1);
                });
                // 作业监护措施
              case "zyjhcs":
                if (info[key])info[key].split(',').forEach((item,index) => {
                  if (index === 0) this.fireCount = item;
                  if (index === 1) this.lifelineCount = item;
                  if (index === 2) this.gasCount = item;
                });;
                break;
              case "zyOtherspecial":
                if (info[key])this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_1
                );
                break;
              case "zywhBs":
                if (info[key])this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_2
                );
                break;
              default:
                this.sendData[key] = info[key];
                break;
            }
          }
          this.$Toast.clear();
        })
        .catch(() => {
          this.$Toast.clear();
        });
    },
    Next() {
      if (!this.$route.query.id) {
        this.$notify("请先提交保存");
        return;
      } else if (this.oldInfo.actRuTask) {
      } else {
        this.$Toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        this.$api.page_3
          .htHseSxkjzypListData({
            sxkjCode: this.queryId,
            __sid: localStorage.getItem("JiaHuaSessionId")
          })
          .then(res => {
            this.$Toast.clear();
            if (res.list[0].actRuTask) {
              let data = {
                id: res.list[0].id,
                flowKey: "htHseSxkjzypService",
                comment: "",
                "actRuTask.id": res.list[0].actRuTask.id,
                btnSubmit: "审批",
                __sid: localStorage.getItem("JiaHuaSessionId")
              };
              this.$api.page_3
                .approve(data)
                .then(ress => {
                  if (ress.groups) {
                    this.$router.push({
                      name: "daibanren",
                      query: {
                        groups: ress.groups.join(","),
                        taskId: ress.taskId,
                        id: res.list[0].id,
                        type: "htHseSxkjzypService"
                      }
                    });
                  } else {
                    this.$router.replace({ name: "kongjian_list" });
                  }
                })
                .catch(() => {
                  this.$Toast.clear();
                });
            } else {
              let data = {
                id: res.list[0].id,
                flowKey: "htHseSxkjzypService",
                __sid: localStorage.getItem("JiaHuaSessionId")
              };
              this.$api.page_3
                .start("sxkjzyp/htHseSxkjzyp", data)
                .then(ress => {
                  if (ress.groups) {
                    this.$router.push({
                      name: "daibanren",
                      query: {
                        groups: ress.groups.join(","),
                        taskId: ress.taskId,
                        id: res.list[0].id,
                        type: "htHseSxkjzypService"
                      }
                    });
                  } else {
                    this.$router.replace({ name: "kongjian_list" });
                  }
                })
                .catch(() => {
                  this.$Toast.clear();
                });
            }
          })
          .catch(() => {
            this.$Toast.clear();
          });
      }
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