<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        v-if="status!=='5'"
        title="吊装安全"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="showPicker = true"
      />
      <van-nav-bar v-else title="吊装安全" left-text="返回" left-arrow @click-left="pageBack" />
    </van-sticky>
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" :value="sendData.sqbm || $userInfo.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" :value="sendData.sqr || $userInfo.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="sendData.zypcode" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" :value="status?zypztList[status].name:''" disable></cell-value>
      <!-- 吊装内容 -->
      <cell-textarea disable v-model="sendData.dznr" title="吊装内容" required placeholder="请输入吊装内容"></cell-textarea>
      <!-- 吊装地点 -->
      <cell-input disable v-model="sendData.dzdd" title="吊装地点" required placeholder="手工录入"></cell-input>
      <!-- 吊装工具名称 -->
      <cell-picker
        disable
        v-model="sendData.dzgjmc"
        title="吊装工具名称"
        required
        :columns="dzgjmcColumns"
      ></cell-picker>
      <!-- 起吊重物重量（t） -->
      <cell-input disable v-model="sendData.qdzwzl" title="起吊重物重量（t）" required placeholder="手工录入"></cell-input>
      <!-- 吊装人员及特殊工种作业证号 -->
      <div class="cell">
        <div class="cell_title">
          <span>
            吊装人员及
            <br />特殊工种作业证号
          </span>
        </div>
        <div class="cell_value">
          <div class="cell_value_people">
            <div class="cell_input">
              <span>{{ work_permit_1.name || "点击选择" }}</span>
            </div>
            <div class="cell_input"  v-if="work_permit_2.name">
							<span>{{ work_permit_2.name || "" }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 吊装指挥及特殊工种作业证号 -->
      <div class="cell">
        <div class="cell_title">
          <span>
            吊装指挥及
            <br />特殊工种作业证号
          </span>
        </div>
        <div class="cell_value">
          <span>{{ sendData.dzzhjtsgzzyzh || work_permit_3.name || "点击选择" }}</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 危害辨识 -->
      <cell-select-tag
        disable
        required
        title="危害辨识"
        storeKey="whsb"
        :tagList="whsb"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time
        disable
        title="作业开始时间"
        v-model="sendData.zyksDate"
        :maxTime="sendData.zyjsDate"
        required
      ></cell-time>
      <!-- 作业结束时间 -->
      <cell-time
        disable
        title="作业结束时间"
        v-model="sendData.zyjsDate"
        :minTime="sendData.zyksDate"
        required
      ></cell-time>
      <!-- 作业负责人 -->
      <select-organization
        disable
        title="作业负责人"
        :value="sendData.zyfzr"
        required
        :storeModule="storeModule"
        storeKey="zyfzr"
        v-model="sendData.zyfzr"
      ></select-organization>
	  <cell-select-department
	   disable
        title="作业单位"
        required
        radio
        noPadding
        :storeModule="storeModule"
        storeKey="zydw"
        :value="sendData.zydw"
        v-model="sendData.zydw"
      ></cell-select-department>
      <!-- 监护人 -->
      <select-organization
        disable
        title="监护人"
        :value="sendData.jhr"
        required
        :storeModule="storeModule"
        storeKey="jhr"
        v-model="sendData.jhr"
      ></select-organization>
      <div class="confirm">
        <div class="head">
          <div class="head_1">安全措施</div>
          <div class="head_2">确认</div>
          <div class="head_3">确认人</div>
        </div>
        <div></div>
        <div class="confirm_list">
          <Signature
            disable
            :checked="item.checked"
            :img="item.img"
            v-for="(item) in checked"
            :key="item.id"
          >
            <div
              slot
            >{{item.des}}</div>
          </Signature>
        </div>
      </div>
    </div>
    <!-- 材质选择 -->
    <van-popup v-model="materialShowShow" position="bottom">
      <van-picker
        show-toolbar
        title="材质选择"
        :columns="materialColumns"
        @cancel="onMaterialCancel"
        @confirm="onMaterialConfirm"
      />
    </van-popup>
    <van-popup
      class="popup"
      v-model="signatureShow"
      :close-on-click-overlay="false"
      position="bottom"
    >
      <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
    </van-popup>
    <van-popup
      class="popup"
      v-model="signatureShow2"
      :close-on-click-overlay="false"
      position="bottom"
    >
      <Canvas ref="signature" @save="saveCanvas2" @cancel="cancelCanvas2"></Canvas>
    </van-popup>
    <cell-textarea disable v-model="sendData.qtaqcs" title="其他安全措施" required placeholder="请输入其他安全措施"></cell-textarea>
    <div class="signature">
      <span>签字</span>
      <van-image
        v-if="sendData.qtaqcsBzr"
        style="width:40px;margin-left:30px"
        :src="sendData.qtaqcsBzr"
      ></van-image>
      <span style="float:right;font-size:14px;margin-right:30px">{{sendData.qtaqcsTime}}</span>
    </div>
    <!-- 操作Popup -->
    <van-popup v-model="showPicker" position="bottom" class="action">
      <button @click="Next">工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { business } from "@/mixin/business";
import DiaoZhuangConfirm from "./Confirm";
import StepperPlus from "@/components/StepperPlus.vue";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "diaozhuang_index",
  components: {
    Canvas,
    Signature
  },
  mixins: [business],
  data() {
    return {
      zypcode: "0", //详情编号
      storeModule: "diaozhuang",
      sendData: {
        dznr: "", //吊装内容
        dzdd: "", //吊装地点
        dzgjmc: null, //吊装工具名称
        qdzwzl: "", //起吊重物质量(t)
        whsb: [], //危害辨识
        zyksDate: "", //作业开始时间
        zyjsDate: "", //作业结束时间
        zyfzr: [], // 作业负责人
        zydw: [], //作业单位
        zyfzrCode: [],
        jhr: [], //监护人
        jhrCode: [],
        qtaqcsBzr: "",
        qtaqcs: "",
        qtaqcsTime: ""
      },
      zypztList: [
          {
          name: '选择',
          index: 0
        },{
          name: "编辑",
          index: 1
        },
        {
          name: "初审",
          index: 2
        },
        {
          name: "审核",
          index: 3
        },
        {
          name: "有效",
          index: 4
        },
        {
          name: "已终结",
          index: 5
        }
      ], // 作业票状态列表
      Alight: 0,
      light: 0,
      mask: [0, 1],
      value: 5,
      materialShowShow: false,
      material: {
        index: 0,
        value: ""
      },
      dzgjmcColumns: ["吊车", "行车", "把杆"],
      materialColumns: ["吊车", "行车", "把杆"],
      currentDate: new Date(),
      list_1: [
        "锁具断裂",
        "吊钩脱落",
        "设备倾倒",
        "吊装机械故障倾倒",
        "周边电线杆",
        "输电线",
        "危化品管道泄漏",
        "可燃液体",
        "气体泄漏"
      ],
      checked: [
        {
          checked: false,
          image: ""
        }
      ],
      selectSignatureShow: 0, //当前确认选中
      signatureShow: false,
      signatureShow2: false,
      showPicker: false,
      safeSendData: [
        {
          dzzypId: "",
          xuhao: "",
          aqcsnr: "",
          qrr: "",
          qrzt: ""
        }
      ],
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
      actRuTask: "",
      id: "",
      status: ""
    };
  },
  activated() {
    var isfresh = localStorage.getItem("isfresh");
    if ("diaozhuanglist" == isfresh) {
      console.log("sdas");
      if (this.$route.query.zypcode) {
        this.zypcode = this.$route.query.zypcode || "0";
        this.getInfo();
        // this.initChecked()
      } else {
      }
    } else if (isfresh == "true") {
      console.log(123321);
      this.clearData();
    }
  },
  computed: mapState({
    whsb: state => state.diaozhuang.whsb,
    zyfzr: state => state.diaozhuang.zyfzr,
    jhr: state => state.diaozhuang.jhr,
    work_permit_1: state => state.diaozhuang.work_permit_1,
    work_permit_2: state => state.diaozhuang.work_permit_2,
    work_permit_3: state => state.diaozhuang.work_permit_3
  }),
  // beforeDestroy() {
  // 	this.$store.dispatch("diaozhuang/cleanState");
  // },
  created() {},
  methods: {
    saveCanvas2(e) {
      console.log(123);
      console.log("e: ", e);
      this.signatureShow2 = false;
      this.sendData.othercsComplier = e;
      this.sendData.othercsTime = this.$dayjs(new Date()).format(
        "YYYY-MM-DD HH:mm"
      );
    },
    // 取消签名
    cancelCanvas2() {
      console.log("取消签名");
      this.signatureShow2 = false;
    },
    ...mapMutations("diaozhuang", {
      setTag: "setTag"
    }),
    clearData() {
      this.$store.dispatch("diaozhuang/cleanState");
      this.sendData = {
        dznr: "", //吊装内容
        dzdd: "", //吊装地点
        dzgjmc: null, //吊装工具名称
        qdzwzl: "", //起吊重物质量(t)
        whsb: [], //危害辨识
        zyksDate: "", //作业开始时间
        zyjsDate: "", //作业结束时间
        zyfzr: [], // 作业负责人
        jhr: [] //监护人
      };
    },
    initChecked() {
      for (let i = 0; i < 30; i++) {
        let obj = {
          checked: true
        };
        this.checked.push(obj);
      }
    },
    Next() {
      if (this.actRuTask === "") {
        console.log(2);
        let data = {
          id: this.id,
          flowKey: "htHseDzzypService",
          __sid: localStorage.getItem("JiaHuaSessionId")
        };
        this.$api.page_3
          .start("dzzy/htHseDzzyp", data)
          .then(res => {
            console.log(res);
            if (res.groups) {
              this.$router.push({
                name: "daibanren",
                query: {
                  groups: res.groups.join(","),
                  taskId: res.taskId,
                  id: this.id,
                  type: "htHseDzzypService"
                }
              });
            } else {
              this.$router.replace({ name: "diaozhuang_list" });
            }
          })
          .catch(() => this.$Toast.clear());
      } else {
        this.$router.push({
          name: "diaozhuang_shenpi",
          query: {
            id: this.id,
            actRuTask: this.actRuTask,
            status: this.status
          }
        });
      }
    },
    //获取签名信息
    qianming(id) {
      let sendData = {};
      sendData.__sid = this.$userInfo.sessionId;
      sendData["dzzypId.id"] = id;
      var param = {
        "dzzypId.id": id,
        __sid: this.$userInfo.sessionId
      };
      this.$api.page_3.getDzaqInfo(param).then(res => {
        let checked = {};
        console.log("吊装子表", res);
        res.forEach((item, inx) => {
          if (item.qrzt && item.qrzt === 1) {
            checked[item.xuhao] = {
              checked: true,
              img: item.qrr,
              id: item.id
            };
          } else {
            checked[item.xuhao] = {
              checked: false,
              img: "",
              id: item.id
            };
          }
        });
        this.checked = Object.values(checked);
      });
    },
    //获取详情
    getInfo() {
      let sendData = {};
      sendData.__sid = this.$userInfo.sessionId;
      sendData.zypcode = this.zypcode;
      this.$api.page_3
        .htHseDzzypList(sendData)
        .then(res => {
          const info = res.list[0];
          this.actRuTask = info.actRuTask ? info.actRuTask.id : "";
          this.id = info.id;
          this.status = info.htStatus;
          this.sendData.dznr = info.dznr;
          this.sendData.dzdd = info.dzdd;
          this.sendData.dzgjmc = info.dzgjmc;
          this.sendData.qdzwzl = info.qdzwzl;
          this.sendData.zyksDate = info.zyksDate;
          this.sendData.zyjsDate = info.zyjsDate;
          this.sendData.sqbm = info.sqbmDept.officeName;
          this.sendData.sqr = info.sqr;
          this.sendData.zypcode = info.zypcode;
         this.work_permit_3.name  = info.dzzhjtsgzzyzh;
		  this.work_permit_3.id  = info.dzzhjtsgzzyzh;
		  let dzryjtsgzzyzh =  info.dzryjtsgzzyzh.split(",");
          this.work_permit_1.name  = dzryjtsgzzyzh[0];
          this.work_permit_1.id  = dzryjtsgzzyzh[0] ;
          this.work_permit_2.name  = dzryjtsgzzyzh[1] ;
		  this.work_permit_2.id  = dzryjtsgzzyzh[1] ;
			this.sendData.zydw = [{name: info.zydw || '', id: info.zydw || ''}];
          this.sendData.id = info.id;
          this.sendData.zyfzr = this.reductionSelectUserObj(
            this.assemblyStrToUserObj(info.zyfzr || "", info.zyfzrCode || "")
          );
          this.sendData.jhr = this.reductionSelectUserObj(
            this.assemblyStrToUserObj(info.jhr || "", info.jhrCode || "")
          );
          let whsb = [];
          info.whsb.split(",").map(items => {
            whsb.push(this.list_1[items - 1]);
          });
          this.setTag({
            tags: {
              key: "whsb",
              value: whsb
            }
          });
          //   其他安全措施
          this.sendData.qtaqcs = info.qtaqcs;
		  this.sendData.qtaqcsBzr = info.qtaqcsBzr;
		  this.sendData.qtaqcsTime = this.$dayjs(info.qtaqcsTime).format(
        "YYYY-MM-DD HH:mm"
      );

          this.qianming(info.id);
        })
        .catch(() => {});
    },

    changeMask(id) {
      if (id == 0) {
        this.mask[0] == 0
          ? this.mask.splice(0, 1, 1)
          : this.mask.splice(0, 1, 0);
      } else {
        this.mask[1] == 0
          ? this.mask.splice(1, 1, 1)
          : this.mask.splice(1, 1, 0);
      }
    },
    closeAction() {
      this.showPicker = false;
    },
    // 选择作业证
    selectUser(work_permit) {
      console.log("work_permit: ", work_permit);
      this.$router.push({
        path: "./select_work_permit",
        query: {
          storeModule: this.storeModule,
          storeKey: work_permit
        }
      });
    },
    // 材质选择
    onMaterialConfirm(value, index) {
      this.materialShowShow = false;
      this.material = {
        index: index,
        value: value
      };
    },
    // 材质选择取消
    onMaterialCancel() {
      this.materialShowShow = false;
    },
    // 显示签名
    showSignature(index) {
      console.log("index: ", index);
      console.log("显示签名");
      this.selectSignatureShow = index;
      if (!this.checked[index].checked) {
        this.signatureShow = true;
      }
    },
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.checked[index].checked = false;
      this.checked[index].img = "";
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
    cancelCanvas() {
      this.checked[this.selectSignatureShow].checked = false;
      this.checked[this.selectSignatureShow].img = "";
      this.signatureShow = false;
    },
    // 发送数据
    postData() {
      let dzryjtsgzzyzh = [];
      dzryjtsgzzyzh.push(this.work_permit_1.id);
      dzryjtsgzzyzh.push(this.work_permit_2.id);
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.whsb = this.stringData("whsb", "list_1");
      sendData.zyfzr = this.userString(this.sendData.zyfzr, "userCode");
	  sendData.zyfzrCode = this.userString(this.sendData.zyfzr, "userName");
	//   监护人为2人
      sendData.jhr = this.userString(this.sendData.jhr, "userCode");
      sendData.jhrCode = this.userString(this.sendData.jhr, "userName");
      sendData.zydw = this.userString(this.sendData.zydw, "id");
      sendData.dzryjtsgzzyzh = dzryjtsgzzyzh.join(",");
      sendData.dzzhjtsgzzyzh = this.work_permit_3.id || "";
      if (this.$route.query.id) {
        sendData.id = this.oldInfo.id;
        sendData.zypcode = this.oldInfo.zypcode;
        sendData.sqbm = this.oldInfo.sqbmDept.officeCode; // 申请部门
        sendData.sqr = this.oldInfo.user.name; // 申请人名
        sendData.sqr_code = this.oldInfo.user.userCode; // 申请人code
      } else {
        sendData.sqbm = this.$userInfo.officeCode;
        sendData.sqr = this.$userInfo.userName;
        sendData.sqr_code = this.$userInfo.userCode;
      }
      sendData.__sid = this.$userInfo.sessionId;
      console.log(sendData);
      this.$api.page_3
        .htHseDzzypSave(sendData, this.$userInfo.sessionId)
        .then(res => {
          console.log("res: ", res);
          messageId = res.message;
          this.$Toast.success({
            message: "提交成功"
          });
          if (res.result === "true") {
            this.pageBack();
          }
        })
        .catch(() => {});
    },
    onSelect(item) {
      this.showPicker = false;
      if (item.index === 0) {
        this.Next();
      }
    }
  },
  watch: {
    whsb(res) {
      this.sendData.whsb = res;
    },
    zyfzr(res) {
      this.sendData.zyfzr = res;
    },
    jhr(res) {
      this.sendData.jhr = res;
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

  .cell_input {
    display: flex;
    justify-content: flex-end;
  }

  .confirm {
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
        margin-right: 140px;
      }

      .head_3 {
        margin-right: 20px;
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
  align-items: center;
  justify-content: space-between;
}
</style>
