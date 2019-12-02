<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        title="高处安全"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="showPicker = true"
      />
    </van-sticky>
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="sendData.id" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" disable></cell-value>
      <!-- 作业内容 -->
      <cell-textarea title="作业内容" required v-model="sendData.workContent" placeholder="请输入工作内容"></cell-textarea>
      <!-- 作业地点 -->
      <cell-input title="作业地点" required v-model="sendData.workAddress" placeholder="手工录入"></cell-input>
      <!-- 作业高度 -->
      <cell-picker title="作业高度" required v-model="sendData.workHeight" :columns="workHeightColumns"></cell-picker>
      <!-- 登高类别 -->
      <cell-picker title="登高类别" required v-model="sendData.heightType" :columns="heightTypeColumns"></cell-picker>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="specialWork"
        :tagList="sendData.specialWork"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="harmAnalise"
        :tagList="sendData.harmAnalise"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time v-model="sendData.startTime" title="作业开始时间" required></cell-time>
      <!-- 作业结束时间 -->
      <cell-time v-model="sendData.endTime" title="作业结束时间" required></cell-time>
      <!-- 作业部门负责人 -->
      <select-organization
        max="1"
        title="作业部门负责人"
        required
        :storeModule="storeModule"
        :value="sendData.workDeptLeader"
        storeKey="workDeptLeader"
        v-model="sendData.workDeptLeader"
      ></select-organization>
      <!-- 监护人 -->
      <select-organization
        max="9"
        title="监护人"
        required
        :storeModule="storeModule"
        storeKey="guarder"
        v-model="sendData.guarder"
      ></select-organization>
      <!-- 作业人 -->
      <select-organization
        max="9"
        title="作业人"
        required
        :storeModule="storeModule"
        storeKey="worker"
        v-model="sendData.worker"
      ></select-organization>
    </div>

    <!-- 操作Popup -->
    <van-popup v-model="showPicker" position="bottom" class="action">
      <button @click="postData">保存</button>
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
          :checked="checked[0] ? checked[0].checked : false"
          :img="checked[0] ? checked[0].img : ''"
          @checked="showSignature(0)"
          @cancel="signatureCancel(0)"
        >
          <span slot>作业人员身体条件符合要求。</span>
        </Signature>
        <Signature
          :checked="checked[1] ? checked[1].checked : false"
          :img="checked[1] ? checked[1].img : ''"
          @checked="showSignature(1)"
          @cancel="signatureCancel(1)"
        >
          <span slot>作业人员着装符合工作要求</span>
        </Signature>
        <Signature
          :checked="checked[2] ? checked[2].checked : false"
          :img="checked[2] ? checked[2].img : ''"
          @checked="showSignature(2)"
          @cancel="signatureCancel(2)"
        >
          <span slot>作业人员佩戴合格的安全帽</span>
        </Signature>
        <Signature
          :checked="checked[3] ? checked[3].checked : false"
          :img="checked[3] ? checked[3].img : ''"
          @checked="showSignature(3)"
          @cancel="signatureCancel(3)"
        >
          <span slot>作业人员佩戴安全带，安全带高挂抵用</span>
        </Signature>
        <Signature
          :checked="checked[4] ? checked[4].checked : false"
          :img="checked[4] ? checked[4].img : ''"
          @checked="showSignature(4)"
          @cancel="signatureCancel(4)"
        >
          <span slot>作业人员携带有工具袋及安全绳</span>
        </Signature>
        <Signature
          :checked="checked[5] ? checked[5].checked : false"
          :img="checked[5] ? checked[5].img : ''"
          @checked="showSignature(5)"
          @cancel="signatureCancel(5)"
        >
          <span>
            作业人员佩戴:
            <span
              :class="mask[0] == 1 ? 'seclct_tag is_select':'seclct_tag'"
              @click="changeMask(0)"
            >过滤式防毒面具或口罩</span>
            <span
              :class="mask[1] == 1 ? 'seclct_tag is_select':'seclct_tag'"
              @click="changeMask(1)"
            >空气呼吸器</span>
          </span>
        </Signature>
        <Signature
          :checked="checked[6] ? checked[6].checked : false"
          :img="checked[6] ? checked[6].img : ''"
          @checked="showSignature(6)"
          @cancel="signatureCancel(6)"
        >
          <span slot>现场搭设的脚手架、防护网、围栏符合安全规定</span>
        </Signature>
        <Signature
          :checked="checked[7] ? checked[7].checked : false"
          :img="checked[7] ? checked[7].img : ''"
          @checked="showSignature(7)"
          @cancel="signatureCancel(7)"
        >
          <span slot>垂直分层作业中间有隔离设施</span>
        </Signature>
        <Signature
          :checked="checked[8] ? checked[8].checked : false"
          :img="checked[8] ? checked[8].img : ''"
          @checked="showSignature(8)"
          @cancel="signatureCancel(8)"
        >
          <span slot>绳子、梯子符合安全规定</span>
        </Signature>
        <Signature
          :checked="checked[9] ? checked[9].checked : false"
          :img="checked[9] ? checked[9].img : ''"
          @checked="showSignature(9)"
          @cancel="signatureCancel(9)"
        >
          <span slot>石棉瓦等轻型棚的承重梁、柱能承重负荷的要求</span>
        </Signature>
        <Signature
          :checked="checked[10] ? checked[10].checked : false"
          :img="checked[10] ? checked[10].img : ''"
          @checked="showSignature(10)"
          @cancel="signatureCancel(10)"
        >
          <span slot>作业人员在石棉瓦等不承重物作业所搭设的承重板稳定牢固</span>
        </Signature>
        <Signature
          :checked="checked[11] ? checked[11].checked : false"
          :img="checked[11] ? checked[11].img : ''"
          @checked="showSignature(11)"
          @cancel="signatureCancel(11)"
        >
          <span>
            采光,夜间作业照明符合作业要求,
            <span
              :class="light == 0? 'seclct_tag is_select': 'seclct_tag'"
              @click="light = 0"
            >需采用并已采用</span>
            <span :class="light == 1? 'seclct_tag is_select': 'seclct_tag'" @click="light = 1">无需采用</span>
            防爆灯
          </span>
        </Signature>
        <Signature
          :checked="checked[12] ? checked[12].checked : false"
          :img="checked[12] ? checked[12].img : ''"
          @checked="showSignature(12)"
          @cancel="signatureCancel(12)"
        >
          <span slot>30m 以上高处作业配备通讯、联络工具</span>
        </Signature>
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
import { mapState, mapMutations } from "vuex";
import { business } from "../../../../mixin/business";
import GaoChuConfirm from "./Confirm";
import StepperPlus from "@/components/StepperPlus.vue";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "gaochuindex",
  mixins: [business],
  data() {
    return {
      storeModule: "gaochu",
      light: 0,
      mask: [0, 1],
      sendData: {
        workContent: "", //作业内容
        workAddress: "", //作业地点
        workHeight: "", //作业高度
        heightType: "", //登高类别
        startTime: "", //作业开始时间
        endTime: "", //作业结束时间
        specialWork: [], //涉及其他作业
        harmAnalise: [], //危害辨识
        workDeptLeader: [], //作业部门负责人
        worker: [], //作业人
        guarder: [] //监护人
      },
      oldInfo: {},
      workHeightColumns: ["2-5米", "5-15米", "15-30米", "30米以上"],
      heightTypeColumns: ["Ⅰ级", "Ⅱ级", "Ⅲ级", "Ⅳ级", "特级"],
      list_1: [
        "动火",
        "登高",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      list_2: [
        "火灾",
        "爆炸",
        "中度",
        "窒息",
        "灼伤",
        "机械伤害",
        "高处坠落",
        "其他"
      ],
      showPicker: false,
      safeSendData: [
        {
          fatherId: "",
          xuhao: "",
          safetyMeasure: "",
          confirmer: "",
          qrzt: Number
        }
      ],
      checked: [
        {
          checked: false,
          image: ""
        }
      ],
      signatureShow: false,
      xuhao: Number,
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
      num: 0
    };
  },
  components: {
    GaoChuConfirm,
    Canvas,
    StepperPlus,
    Signature
  },
  computed: mapState({
    specialWork: state => state.gaochu.specialWork,
    harmAnalise: state => state.gaochu.harmAnalise,
    guarder: state => state.gaochu.guarder,
    workDeptLeader: state => state.gaochu.workDeptLeader,
    worker: state => state.gaochu.worker
  }),
  mounted() {
    console.log("monuuisda");
  },
  methods: {
    ...mapMutations("gaochu", {
      setTag: "setTag"
    }),
    // 清除所有数据
    clearData() {
      (this.sendData.workContent = ""), //作业内容
        (this.sendData.workAddress = ""), //作业地点
        (this.sendData.workHeight = ""), //作业高度
        (this.sendData.heightType = ""), //登高类别
        (this.sendData.startTime = ""), //作业开始时间
        (this.sendData.endTime = ""), //作业结束时间
        (this.sendData.specialWork = []), //涉及其他作业
        (this.sendData.harmAnalise = []), //危害辨识
        (this.sendData.workDeptLeader = []), //作业部门负责人
        (this.sendData.worker = []), //作业人
        (this.sendData.guarder = []); //监护人
    },
    // 判断数据输入的完整性
    // true => 输入完整
    // false => 有问题的输入
    isDataEdit() {
      // 作业内容
      if (this.sendData.workContent == false) {
        this.$notify("请输入作业内容");
        return false;
      }
      // 作业地点
      if (this.sendData.workAddress == false) {
        this.$notify("请录入作业地点");
        return false;
      }
      // 作业高度
      if (this.sendData.workHeight == false) {
        this.$notify("请选择作业高度");
        return false;
      }
      // 登高类别
      if (this.sendData.heightType == false) {
        this.$notify("请选择登高类别");
        return false;
      }
      // 作业开始时间
      if (this.sendData.startTime == false) {
        this.$notify("请选择作业开始时间");
        return false;
      }
      // 作业结束时间
      if (this.sendData.endTime == false) {
        this.$notify("请选择作业结束时间");
        return false;
      }
      // 涉及其他作业
      if (this.sendData.specialWork == false) {
        this.$notify("请选择涉及其他作业");
        return false;
      }
      // 危害辨识
      if (this.sendData.harmAnalise == false) {
        this.$notify("请选择危害辨识");
        return false;
      }
      // 作业部门负责人
      if (this.sendData.workDeptLeader == false) {
        this.$notify("请选择作业部门负责人");
        return false;
      }
      // 作业人
      if (this.sendData.worker == false) {
        this.$notify("请选择作业人");
        return false;
      }
      // 监护人
      if (this.sendData.guarder == false) {
        this.$notify("请选择监护人");
        return false;
      }
      return true;
    },
    /**
     * 获取工作票内容
     */
    getData() {
      console.log("获取工作票内容");
      let sendData = {};
      sendData.gczyCode = this.gczyCode;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseUpworkticketListData(sendData)
        .then(res => {
          console.log(res);
          //  workDeptLeader worker9 guarder9
          const info = res.list[0];
          this.oldInfo = info;
          this.sendData.id = info.id;
          this.sendData.workContent = info.workContent;
          this.sendData.workAddress = info.workAddress;
          this.sendData.workHeight = Number(info.workHeight);
          this.sendData.heightType = Number(info.heightType);
          this.sendData.startTime = info.startTime;
          this.sendData.endTime = info.endTime;
          info.specialWork.split(",").forEach(item => {
            this.sendData.specialWork.push(item - 1);
          });
          info.harmAnalise.split(",").forEach(item => {
            this.sendData.harmAnalise.push(item - 1);
          });
          let workDeptLeader = this.reductionSelectUserObj({
            userName: info.workDeptLeaderName,
            userCode: info.workDeptLeader
          });
          let worker = this.reductionSelectUserObj(
            this.assemblyStrToUserObj(info.worker, info.workerName)
          );
          let guarder = this.reductionSelectUserObj(
            this.assemblyStrToUserObj(info.guarder, info.guarderName)
          );
          this.sendData.workDeptLeader = workDeptLeader;
          this.sendData.worker = worker;
          this.sendData.guarder = guarder;
          let specialWork = [];
          this.sendData.specialWork.map(items => {
            specialWork.push(this.list_1[items]);
          });
          let harmAnalise = [];
          this.sendData.harmAnalise.map(items => {
            harmAnalise.push(this.list_2[items]);
          });
          this.setTag({
            tags: {
              key: "harmAnalise",
              value: harmAnalise
            }
          });
          this.setTag({
            tags: {
              key: "specialWork",
              value: specialWork
            }
      });
       this.getChilderList(info.id);
			//  初始化安全选项
          console.log(this.sendData);
        })
        .catch(() => {});
    },
    Next() {
      if (!this.$route.query.gczyCode) {
        this.$notify("请先提交保存");
        return;
      } else {
        console.log(123456);
        this.$Toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        this.$api.page_3
          .htHseUpworkticketListData({
            gczyCode: this.gczyCode,
            __sid: localStorage.getItem("JiaHuaSessionId")
          })
          .then(res => {
            this.$Toast.clear();
            if (res.list[0].actRuTask) {
              console.log(1);
              let data = {
                id: res.list[0].id,
                flowKey: "htHseUpworkticketService",
                comment: "",
                "actRuTask.id": res.list[0].actRuTask.id,
                btnSubmit: "审批",
                __sid: localStorage.getItem("JiaHuaSessionId")
              };
              this.$api.page_3
                .approve(data)
                .then(ress => {
                  console.log(ress);
                  if (ress.groups) {
                    this.$router.push({
                      name: "daibanren",
                      query: {
                        groups: ress.groups.join(","),
                        taskId: ress.taskId,
                        id: res.list[0].id,
                        type: "htHseUpworkticketService"
                      }
                    });
                  } else {
                    this.$router.replace({
                      name: "gaochu_list"
                    });
                  }
                })
                .catch(() => this.$Toast.clear());
            } else {
              console.log(2);
              let data = {
                id: res.list[0].id,
                flowKey: "htHseUpworkticketService",
                __sid: localStorage.getItem("JiaHuaSessionId")
              };
              this.$api.page_3
                .start("heightworkticket/htHseUpworkticket", data)
                .then(ress => {
                  console.log(ress);
                  if (ress.groups) {
                    this.$router.push({
                      name: "daibanren",
                      query: {
                        groups: ress.groups.join(","),
                        taskId: ress.taskId,
                        id: res.list[0].id,
                        type: "htHseUpworkticketService"
                      }
                    });
                  } else {
                    this.$router.replace({
                      name: "gaochu_list"
                    });
                  }
                })
                .catch(() => this.$Toast.clear());
            }
          })
          .catch(() => this.$Toast.clear());
        // this.$api.page_3
        //   .start("dhzyp", {
        //     id: this.oldInfo.id,
        //     __sid: localStorage.getItem("JiaHuaSessionId")
        //   })
        //   .then(res => {
        //     console.log("res: ", res);
        //     this.$Toast.clear();
        //   })
        //   .catch(() => this.$Toast.clear());
      }
	  },
	HtHseUpworkticketSonParse (messageId) {
		let sendSafeData = [
          {
            fatherId: messageId,
            xuhao: 1,
            safetyMeasure: `作业人员身体条件符合要求`,
            confirmer: this.checked[0].img ? this.checked[0].img : '',
            qrzt: this.checked[0] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 2,
            safetyMeasure: `作业人员着装符合工作要求`,
            confirmer: this.checked[1].img ? this.checked[1].img : '',
            qrzt: this.checked[1] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 3,
            safetyMeasure: `作业人员佩戴合格的安全帽`,
            confirmer: this.checked[2].img ? this.checked[2].img : '',
            qrzt: this.checked[2] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 4,
            safetyMeasure: `作业人员佩戴安全带，安全带高挂抵用`,
            confirmer: this.checked[3].img ? this.checked[3].img : '',
            qrzt: this.checked[3] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 5,
            safetyMeasure: `作业人员携带有工具袋及安全绳`,
            confirmer: this.checked[4].img ? this.checked[4].img : '',
            qrzt: this.checked[4] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 6,
            safetyMeasure: `作业人员佩戴:${this.mask[0] == 1 ? "过滤式防毒面具或口罩" : ""},${
            this.mask[1] == 1 ? "空气呼吸器" : ""}`,
            confirmer: this.checked[5].img ? this.checked[5].img : '',
            qrzt: this.checked[5] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 7,
            safetyMeasure: `现场搭设的脚手架、防护网、围栏符合安全规定`,
            confirmer: this.checked[6].img ? this.checked[6].img : '',
            qrzt: this.checked[6] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 8,
            safetyMeasure: `垂直分层作业中间有隔离设施`,
            confirmer: this.checked[7].img ? this.checked[7].img : '',
            qrzt: this.checked[7] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 9,
            safetyMeasure: `绳子、梯子符合安全规定`,
            confirmer: this.checked[8].img ? this.checked[8].img : '',
            qrzt: this.checked[8] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 10,
            safetyMeasure: `石棉瓦等轻型棚的承重梁、柱能承重负荷的要求`,
            confirmer: this.checked[9].img ? this.checked[9].img : '',
            qrzt: this.checked[9] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 11,
            safetyMeasure: `作业人员在石棉瓦等不承重物作业所搭设的承重板稳定牢固`,
            confirmer: this.checked[10].img ? this.checked[10].img : '',
            qrzt: this.checked[10] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 12,
            safetyMeasure: `采光,夜间作业照明符合作业要求, ${
            this.light == 0 ? "需采用并已采用" : "无需采用"}防爆灯`,
            confirmer: this.checked[11].img ? this.checked[11].img : '',
            qrzt: this.checked[11] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 13,
            safetyMeasure: `30m 以上高处作业配备通讯、联络工具`,
            confirmer: this.checked[12].img ? this.checked[12].img : '',
            qrzt: this.checked[12] ? 1 : 0
          }
        ];
	  return sendSafeData;
	  },
    // 发送数据
    postData() {
      // 检测到输入不完整直接退出函数
      if (!this.isDataEdit()) {
        return;
      }
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.specialWork = this.stringData("specialWork", "list_1");
      sendData.harmAnalise = this.stringData("harmAnalise", "list_2");
      sendData.guarder = this.userString(sendData.guarder, "userCode");
      sendData.workDeptLeader = this.userString(
        sendData.workDeptLeader,
        "userCode"
      );
	  sendData.worker = this.userString(sendData.worker, "userCode");
	  sendData.__sid = this.$userInfo.sessionId;
		//    添加还是修改
      if (this.$route.query.id) {
		    sendData.gczyCode = this.oldInfo.gczyCode;
		    sendData.applyDept = this.oldInfo.office.officeCode;
      	sendData.applicant = this.oldInfo.user.userCode;
      } else {
		    sendData.applyDept = this.$userInfo.officeCode;
      	sendData.applicant = this.$userInfo.userCode;
	  }
      console.log(111111);
      console.log(sendData);
      this.$api.page_3
        .htHseUpworkticketSave(sendData)
        .then(res => {
          console.log('???============主表id', res.message);
          let sendSafeData = this.HtHseUpworkticketSonParse(res.message);
              console.log(110111);
          console.log(sendSafeData);
          this.saveChilderList(this.HtHseUpworkticketSonParse(res.message));
        })
        .catch(() => {
          console.log("失败1");
        });
  },
  getChilderList (id) {
    this.$api.page_3.htHseUpworkticketGetChildrenListData(
      id,this.$userInfo.sessionId).then((res) => {
      console.log('获得子表信息,主表id为', 
        id);
      console.log('获得子表信息', res);
      this.setChildrenListView(res);
      }).catch((err) => {
        console.log('报错', err);
      })
  },
  setChildrenListView (childData) {
    let checked = {};
    childData.forEach((item, inx) => {
          if (item.qrzt && item.qrzt === 1) {
            checked[item.xuhao] = {
              checked: true,
              img: item.confirmer,
              id: item.id
            };
          } else {
            checked[inx] = {
              checked: false,
              img: "",
              id: item.id
            };
          }
        });
        this.checked = Object.values(checked);
        console.log('this.checked', this.checked);
  },
	saveChilderList (data) {
    let that = this
		this.$api.page_3
            .htHseUpworkticketSaveLit(data, this.$userInfo.sessionId)
            .then(res => {
              // messageId = res.message;
              console.log('子表保存成功', res);
              this.$Toast.success({
                message: "提交成功",
                onClose() {
                  that.$router.go(-1)
                }
              });
            })
            .catch(() => {
              console.log("失败2");
            });
	  },
    closeAction() {
      this.showPicker = false;
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

    saveCanvas(e) {
      this.signatureShow = false;
      this.checked[this.xuhao] = {
        checked: false,
        img: ""
      };
      this.checked[this.xuhao].img = e;
      console.log("signatureShow: ");
    },
    onMaterialCancel() {
      this.materialShowShow = false;
    },
    cancelCanvas() {
      this.checked[this.xuhao].checked = false;
      this.checked[this.xuhao].img = "";
      this.signatureShow = false;
    },
    testButtonClick() {
      console.log(`父组件 = ${this.value}`);
    },
    // 显示签名
    showSignature(index) {
      this.xuhao = index;
      if (!this.checked[index].checked) {
        this.signatureShow = true;
      }
    },
    // 取消签名
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.checked[index].checked = false;
      this.checked[index].img = "";
	},
	initPage () {
        if (this.$route.query.gczyCode) {
          if (this.gczyCode !== this.$route.query.gczyCode) {
            this.gczyCode = this.$route.query.gczyCode;
            this.getData();
          }
		}
		this.initChecked();
	  },
	initChecked () {
      for (let i = 0;i < 11;i++) {
        let obj = { checked: false };
        this.checked.push(obj);
      }
    },
  },
  watch: {
    specialWork(res) {
      this.sendData.specialWork = res;
    },
    harmAnalise(res) {
      this.sendData.harmAnalise = res;
    },
    guarder(res) {
      this.sendData.guarder = res;
    },
    workDeptLeader(res) {
      this.sendData.workDeptLeader = res;
    },
    worker(res) {
      this.sendData.worker = res;
    }
  },
  created () {
	  this.initPage();
  },
  activated() {
	  this.initPage();
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
        margin-right: 29px;
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
</style>
