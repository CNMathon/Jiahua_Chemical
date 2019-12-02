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
      <cell-value title="申请部门" disable :value="$userInfo.officeName" disabled></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" disable :value="$userInfo.userName" disabled></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" disable :value="sendData.id" disabled></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" disable value="编辑" disabled></cell-value>
      <!-- 作业内容 -->
      <cell-textarea
        title="作业内容"
        disable
        required
        v-model="sendData.workContent"
        placeholder="请输入工作内容"
      ></cell-textarea>
      <!-- 作业地点 -->
      <cell-input title="作业地点" disable required v-model="sendData.workAddress" placeholder="手工录入"></cell-input>
      <!-- 作业高度 -->
      <cell-picker
        title="作业高度"
        disable
        required
        v-model="sendData.workHeight"
        :columns="workHeightColumns"
      ></cell-picker>
      <!-- 登高类别 -->
      <cell-picker
        title="登高类别"
        disable
        required
        v-model="sendData.heightType"
        :columns="heightTypeColumns"
      ></cell-picker>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        disable
        required
        title="涉及其他特殊作业"
        storeKey="specialWork"
        :tagList="sendData.specialWork"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        disable
        required
        title="危害辨识"
        storeKey="harmAnalise"
        :tagList="sendData.harmAnalise"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time disable v-model="sendData.startTime" title="作业开始时间" required></cell-time>
      <!-- 作业结束时间 -->
      <cell-time disable v-model="sendData.endTime" title="作业结束时间" required></cell-time>
      <!-- 作业部门负责人 -->
      <cell-select-user
        disable
        title="作业部门负责人"
        required
        :storeModule="storeModule"
        :value="sendData.workDeptLeader"
        storeKey="workDeptLeader"
        v-model="sendData.workDeptLeader"
      ></cell-select-user>
      <!-- 监护人 -->
      <cell-select-user
        disable
        title="监护人"
        required
        :storeModule="storeModule"
        storeKey="guarder"
        v-model="sendData.guarder"
      ></cell-select-user>
      <!-- 作业人 -->
      <cell-select-user
        disable
        title="作业人"
        required
        :storeModule="storeModule"
        storeKey="worker"
        v-model="sendData.worker"
      ></cell-select-user>
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
          disable
          :checked="checked[0] ? checked[0].checked : false"
          :img="checked[0] ? checked[0].img : ''"
          @checked="showSignature(0)"
          @cancel="signatureCancel(0)"
        >
          <span slot>作业人员身体条件符合要求。</span>
        </Signature>
        <Signature
          disable
          :checked="checked[1] ? checked[1].checked : false"
          :img="checked[1] ? checked[1].img : ''"
          @checked="showSignature(1)"
          @cancel="signatureCancel(1)"
        >
          <span slot>作业人员着装符合工作要求</span>
        </Signature>
        <Signature
          disable
          :checked="checked[2] ? checked[2].checked : false"
          :img="checked[2] ? checked[2].img : ''"
          @checked="showSignature(2)"
          @cancel="signatureCancel(2)"
        >
          <span slot>作业人员佩戴合格的安全帽</span>
        </Signature>
        <Signature
          disable
          :checked="checked[3] ? checked[3].checked : false"
          :img="checked[3] ? checked[3].img : ''"
          @checked="showSignature(3)"
          @cancel="signatureCancel(3)"
        >
          <span slot>作业人员佩戴安全带，安全带高挂抵用</span>
        </Signature>
        <Signature
          disable
          :checked="checked[4] ? checked[4].checked : false"
          :img="checked[4] ? checked[4].img : ''"
          @checked="showSignature(4)"
          @cancel="signatureCancel(4)"
        >
          <span slot>作业人员携带有工具袋及安全绳</span>
        </Signature>
        <Signature
          disable
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
          disable
          :checked="checked[6] ? checked[6].checked : false"
          :img="checked[6] ? checked[6].img : ''"
          @checked="showSignature(6)"
          @cancel="signatureCancel(6)"
        >
          <span slot>现场搭设的脚手架、防护网、围栏符合安全规定</span>
        </Signature>
        <Signature
          disable
          :checked="checked[7] ? checked[7].checked : false"
          :img="checked[7] ? checked[7].img : ''"
          @checked="showSignature(7)"
          @cancel="signatureCancel(7)"
        >
          <span slot>垂直分层作业中间有隔离设施</span>
        </Signature>
        <Signature
          disable
          :checked="checked[8] ? checked[8].checked : false"
          :img="checked[8] ? checked[8].img : ''"
          @checked="showSignature(8)"
          @cancel="signatureCancel(8)"
        >
          <span slot>绳子、梯子符合安全规定</span>
        </Signature>
        <Signature
          disable
          :checked="checked[9] ? checked[9].checked : false"
          :img="checked[9] ? checked[9].img : ''"
          @checked="showSignature(9)"
          @cancel="signatureCancel(9)"
        >
          <span slot>石棉瓦等轻型棚的承重梁、柱能承重负荷的要求</span>
        </Signature>
        <Signature
          disable
          :checked="checked[10] ? checked[10].checked : false"
          :img="checked[10] ? checked[10].img : ''"
          @checked="showSignature(10)"
          @cancel="signatureCancel(10)"
        >
          <span slot>作业人员在石棉瓦等不承重物作业所搭设的承重板稳定牢固</span>
        </Signature>
        <Signature
          disable
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
          disable
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
      <van-popup
        class="popup"
        v-model="signatureShow2"
        :close-on-click-overlay="false"
        position="bottom"
      >
        <Canvas ref="signature" @save="saveCanvas2" @cancel="cancelCanvas2"></Canvas>
      </van-popup>
      <cell-textarea v-model="sendData.otherSafety" title="其他安全措施" required placeholder="请输入其他安全措施"></cell-textarea>
      <div class="signature" @click="signatureShow2 = true">
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
      signatureShow2: false,
      storeModule: "gaochu",
      light: 0,
      mask: [0, 1],
      sendData: {
        othercsComplier: "",
        otherSafety: "",
        othercsTime: "",
        workContent: "", //作业内容
        workAddress: "", //作业地点
        workHeight: "", //作业高度
        heightType: "", //登高类别
        startTime: "", //作业开始时间
        endTime: "", //作业结束时间
        specialWork: [], //涉及其他作业
        harmAnalise: [], //危害辨识
        workDeptLeader: [], //作业部门负责人
        otherSafetyMeasure: '', // 其他安全措施
        editor: '', // 其他安全措施 签字
        cbsPeoson: '', // 作业负责人code
        editerTime: '', // 保存时间
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
      num: 0,
      actRuTask: "",
      id: ""
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
  // beforeDestroy() {
  //   console.log('destroy')
  // 	this.$store.dispatch("gaochu/cleanState");
  // },
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
          const info = res.list[0];
          this.oldInfo = info;
          this.actRuTask = info.actRuTask ? info.actRuTask.id : "";
          this.sendData.id = info.id;
          this.id = info.id;
          this.sendData.othercsComplier = info.editor;
          this.sendData.otherSafety = info.otherSafetyMeasure;
          this.sendData.othercsTime = info.editerTime;
          this.sendData.workContent = info.workContent;
          this.sendData.workAddress = info.workAddress;
          this.sendData.workHeight = Number(info.workHeight);
          this.sendData.heightType = Number(info.heightType);
          this.sendData.startTime = info.startTime;
          this.sendData.endTime = info.endTime;
          info.specialWork.split(",").forEach(item => {
            console.log(item);
            this.sendData.specialWork.push(item - 1);
          });
          info.harmAnalise.split(",").forEach(item => {
            console.log(item);
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
          console.log(this.sendData);
        })
        .catch(() => {});
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
    Next() {
      console.log(this.actRuTask);
      if (this.actRuTask === "") {
        console.log(2);
        let data = {
          id: this.id,
          flowKey: "htHseUpworkticketService",
          __sid: localStorage.getItem("JiaHuaSessionId")
        };
        this.$api.page_3
          .start("heightworkticket/htHseUpworkticket", data)
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
                    type: "htHseUpworkticketService"
                  }
                });
              } else {
                this.$router.replace({ name: "gaochu_list" });
              }
            } else {
              this.$notify(res.message);
            }
          })
          .catch(() => this.$Toast.clear());
      } else {
        this.$router.push({
          name: "gaochu_shenpi",
          query: {
            id: this.id,
            actRuTask: this.actRuTask
          }
        });
      }
    },
    HtHseUpworkticketSonParse(messageId) {
      let sendSafeData = {
        HtHseUpworkticketSon: [
          {
            fatherId: messageId,
            xuhao: 1,
            safetyMeasure: `作业人员身体条件符合要求`,
            confirmer: this.checked[0] ? this.checked[0].img : 0,
            qrzt: this.checked[0] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 2,
            safetyMeasure: `作业人员着装符合工作要求`,
            confirmer: this.checked[1] ? this.checked[1].img : 0,
            qrzt: this.checked[1] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 3,
            safetyMeasure: `作业人员佩戴合格的安全帽`,
            confirmer: this.checked[2] ? this.checked[2].img : 0,
            qrzt: this.checked[2] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 4,
            safetyMeasure: `作业人员佩戴安全带，安全带高挂抵用`,
            confirmer: this.checked[3] ? this.checked[3].img : 0,
            qrzt: this.checked[3] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 5,
            safetyMeasure: `作业人员携带有工具袋及安全绳`,
            confirmer: this.checked[4] ? this.checked[4].img : 0,
            qrzt: this.checked[4] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 6,
            safetyMeasure: `作业人员佩戴:${
              this.mask[0] == 1 ? "过滤式防毒面具或口罩" : ""
            },${this.mask[1] == 1 ? "空气呼吸器" : ""}`,
            confirmer: this.checked[5] ? this.checked[5].img : 0,
            qrzt: this.checked[5] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 7,
            safetyMeasure: `现场搭设的脚手架、防护网、围栏符合安全规定`,
            confirmer: this.checked[6] ? this.checked[6].img : 0,
            qrzt: this.checked[6] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 8,
            safetyMeasure: `垂直分层作业中间有隔离设施`,
            confirmer: this.checked[7] ? this.checked[7].img : 0,
            qrzt: this.checked[7] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 9,
            safetyMeasure: `绳子、梯子符合安全规定`,
            confirmer: this.checked[8] ? this.checked[8].img : 0,
            qrzt: this.checked[8] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 10,
            safetyMeasure: `石棉瓦等轻型棚的承重梁、柱能承重负荷的要求`,
            confirmer: this.checked[9] ? this.checked[9].img : 0,
            qrzt: this.checked[9] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 11,
            safetyMeasure: `作业人员在石棉瓦等不承重物作业所搭设的承重板稳定牢固`,
            confirmer: this.checked[10] ? this.checked[10].img : 0,
            qrzt: this.checked[10] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 12,
            safetyMeasure: `采光,夜间作业照明符合作业要求, ${
              this.light == 0 ? "需采用并已采用" : "无需采用"
            }防爆灯`,
            confirmer: this.checked[11] ? this.checked[11].img : 0,
            qrzt: this.checked[11] ? 1 : 0
          },
          {
            fatherId: messageId,
            xuhao: 13,
            safetyMeasure: `30m 以上高处作业配备通讯、联络工具`,
            confirmer: this.checked[12] ? this.checked[12].img : 0,
            qrzt: this.checked[12] ? 1 : 0
          }
        ],
        __sid: this.$userInfo.sessionId
      };
      return sendSafeData;
    },
    // 发送数据
    postData() {
      // 检测到输入不完整直接退出函数
      if (!this.isDataEdit()) {
        return;
      }
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.specialWork = this.stringData("specialWork", "list_1");
      sendData.harmAnalise = this.stringData("harmAnalise", "list_2");
      sendData.guarder = this.userString(sendData.guarder, "userCode");
      sendData.workDeptLeader = this.userString(
        sendData.workDeptLeader,
        "userCode"
      );
      sendData.editor = sendData.othercsComplier;
      sendData.otherSafetyMeasure = sendData.otherSafety;
      sendData.editerTime = sendData.othercsTime ;
      sendData.worker = this.userString(sendData.worker, "userCode");
      sendData.__sid = this.$userInfo.sessionId;
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
          console.log("???============主表id", res.message);
        })
        .catch(() => {
          console.log("失败");
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
      console.log("index: ", index);
      console.log("显示签名");
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
    }
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
  activated() {
    console.log(window.history);
    console.log(99999999999999999);
    // 获取显示List序列
    this.gczyCode = this.$route.query.gczyCode || "";
    // 设置显示List
    this.status = this.$route.query.status || 0;
    if (this.gczyCode && sessionStorage.getItem("flag") === "1") {
      this.sendData.specialWork = []; //涉及其他作业
      this.sendData.harmAnalise = [];
      console.log(999);
      this.getData();
      sessionStorage.removeItem("flag");
    }
    if (this.gczyCode === "" && sessionStorage.getItem("flag") === "1") {
      this.clearData();
    }
    this.sendData.id = "";
    let zypId = this.$route.query.id;
    let zypStatus = this.$route.query.status;
    let isInitData = false;
    if (this.$route.query.moreInfo) {
      let isInitData = this.$route.query.moreInfo.isInitData;
    }
    if (zypStatus == 1 && isInitData == true) {
      this.sendData.id = zypId;
      this.$api.page_3
        .htHseSxkjzypListData({
          id: this.sendData.id,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          console.log(res);
          let content = res.list[0];
          this.sendData.zyContent = content.zyContent;
          this.sendData.devicename = content.devicename;
          this.sendData.sxkjNeurogen = content.sxkjNeurogen;
          this.sendData.zyOtherspecial = content.zyOtherspecial;
          this.sendData.zywhBs = content.zywhBs;
          this.sendData.zyStarttime = content.zyStarttime;
          this.sendData.zyEndtime = content.zyStarttime;
          this.sendData.zyPrincipal = content.zyPrincipal;
          this.sendData.zyRen = content.zyRen;
          this.sendData.guardian = content.guardian;
        });
      console.log(zypId);
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
.signature {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
</style>
