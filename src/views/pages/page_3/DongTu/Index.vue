<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        title="动土安全"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
        fixed
      />
    </van-sticky>
    <div class="fixed-first">
      <van-skeleton title :row="3" :loading="isLoading" class="skeleton">
        <div class="app">
          <div class="cell_group">
            <!-- 申请部门 -->
            <cell-value title="申请部门" :value="apply.dept" disable></cell-value>
            <!-- 申请人 -->
            <cell-value title="申请人" :value="apply.name" disable></cell-value>
            <!-- 作业票编号 -->
            <cell-value title="作业票编号" :value="apply.code" disable></cell-value>
            <!-- 作业票状态 -->
            <cell-value title="作业票状态" value="编辑" disable></cell-value>
            <!-- 作业部门 -->
            <cell-select-department
              title="作业部门"
              required
              :storeModule="storeModule"
              storeKey="dtDept"
              v-model="sendData.dtDept"
            ></cell-select-department>
            <!-- 作业地点 -->
            <cell-input v-model="sendData.dtSite" title="作业地点" required placeholder="手工录入"></cell-input>
            <!-- 涉及其他特殊作业 -->
            <cell-select-tag
              required
              title="涉及其他特殊作业"
              storeKey="otherSpecial"
              :tagList="sendData.otherSpecial"
              :showList="list_1"
              :storeModule="storeModule"
            ></cell-select-tag>
            <!-- 危害辨识 -->
            <cell-select-tag
              required
              title="危害辨识"
              storeKey="hazardSb"
              :tagList="sendData.hazardSb"
              :showList="list_2"
              :storeModule="storeModule"
            ></cell-select-tag>
            <!-- 动土开始时间 -->
            <cell-time v-model="sendData.dtStarttime" title="动土开始时间" required></cell-time>
            <!-- 动土结束时间 -->
            <cell-time v-model="sendData.dtEndtime" title="动土结束时间" required></cell-time>
            <!-- 监护人 -->
            <select-organization
              title="监护人"
              required
              radio
              :storeModule="storeModule"
              storeKey="guardian"
              v-model="sendData.guardian"
            ></select-organization>
            <!-- 作业负责人 -->
            <select-organization
              title="作业负责人"
              required
              max="2"
              :storeModule="storeModule"
              storeKey="dtMan"
              v-model="sendData.dtMan"
            ></select-organization>
            <!-- 作业范围、内容、方式 -->
            <div class="cell border_none image-update">
              <div class="cell_title">
                <span>动土范围示意图及相关说明</span>
              </div>
              <!-- <div class="cell_other">
                <textarea class="cell_textarea" placeholder="请输入工作内容" cols="30" rows="10"></textarea>
              </div>-->
              <div class="cell_other">
                <div class="upload">
                  <!-- <div class="upload_icon">
                    <van-icon name="photo-o" />
                  </div>-->
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
                  :img="checked[0].checked ? checked[0].img : ''"
                  @checked="showSignature(0)"
                  @cancel="signatureCancel(0)"
                >
                  <div slot>作业人员已进行了安全教育</div>
                </Signature>
                <Signature
                  :checked="checked[1] ? checked[1].checked : false"
                  :img="checked[1].checked  ? checked[1].img : ''"
                  @checked="showSignature(1)"
                  @cancel="signatureCancel(1)"
                >
                  <div slot>作业地点处于易燃易爆场所，需要动火时已办理动火证</div>
                </Signature>
                <Signature
                  :checked="checked[2] ? checked[2].checked : false"
                  :img="checked[2].checked  ? checked[2].img : ''"
                  @checked="showSignature(2)"
                  @cancel="signatureCancel(2)"
                >
                  <div slot>地下电力点啦已确认保护措施已落实</div>
                </Signature>
                <Signature
                  :checked="checked[3] ? checked[3].checked : false"
                  :img="checked[3].checked  ? checked[3].img : ''"
                  @checked="showSignature(3)"
                  @cancel="signatureCancel(3)"
                >
                  <div slot>地下通讯电（光）缆、局域网络电（光）缆已确认保护措施已落实</div>
                </Signature>
                <Signature
                  :checked="checked[4] ? checked[4].checked : false"
                  :img="checked[4].checked  ? checked[4].img : ''"
                  @checked="showSignature(4)"
                  @cancel="signatureCancel(4)"
                >
                  <div slot>地下供排水、消防管道、工艺管道已确认保护措施已落实。</div>
                </Signature>
                <Signature
                  :checked="checked[5] ? checked[5].checked : false"
                  :img="checked[5].checked ? checked[5].img : ''"
                  @checked="showSignature(5)"
                  @cancel="signatureCancel(5)"
                >
                  <div slot>已按作业方案图划线和立绘</div>
                </Signature>
                <Signature
                  :checked="checked[6] ? checked[6].checked : false"
                  :img="checked[6].checked ? checked[6].img : ''"
                  @checked="showSignature(6)"
                  @cancel="signatureCancel(6)"
                >
                  <div slot>动土地点有电线、管道等地下设施，已向作业单位交代并派人监护；作业时情挖做使用铁棒、铁镐或抓斗等机械工具。</div>
                </Signature>
                <Signature
                  :checked="checked[7] ? checked[7].checked : false"
                  :img="checked[7].checked ? checked[7].img : ''"
                  @checked="showSignature(7)"
                  @cancel="signatureCancel(7)"
                >
                  <div slot>作业现场围栏、警戒线、告示牌、夜间照明、警示灯已按要求设置</div>
                </Signature>
                <Signature
                  :checked="checked[8] ? checked[8].checked : false"
                  :img="checked[8].checked ? checked[8].img : ''"
                  @checked="showSignature(8)"
                  @cancel="signatureCancel(8)"
                >
                  <div slot>已进行放坡处理和固壁支撑</div>
                </Signature>
                <Signature
                  :checked="checked[9] ? checked[9].checked : false"
                  :img="checked[9].checked ? checked[9].img : ''"
                  @checked="showSignature(9)"
                  @cancel="signatureCancel(9)"
                >
                  <div slot>人员出入口和撤离安全措施已落实：</div>
                  <span
                    :class="safe.indexOf('梯子') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('safe', '梯子', false)"
                  >梯子</span>
                  <span
                    :class="safe.indexOf('修坡道') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('safe', '修坡道', false)"
                  >修坡道</span>
                </Signature>
                <Signature
                  :checked="checked[10] ? checked[10].checked : false"
                  :img="checked[10].checked ? checked[10].img : ''"
                  @checked="showSignature(10)"
                  @cancel="signatureCancel(10)"
                >
                  <div slot>施工作业已报</div>
                  <span
                    :class="report.indexOf('公司办') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '公司办', false)"
                  >公司办</span>
                  <span
                    :class="report.indexOf('消防队') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '消防队', false)"
                  >消防队</span>
                  <span
                    :class="report.indexOf('安全环保部') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '安全环保部', false)"
                  >安全环保部</span>
                  <span
                    :class="report.indexOf('公司调度') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('report', '公司调度', false)"
                  >公司调度</span>
                </Signature>
                <Signature
                  :checked="checked[11] ? checked[11].checked : false"
                  :img="checked[11].checked ? checked[11].img : ''"
                  @checked="showSignature(11)"
                  @cancel="signatureCancel(11)"
                >
                  <div slot>夜间作业采用足够、充足照明，</div>
                  <div slot>A防水型灯</div>
                  <span
                    :class="waterLight.indexOf('36V') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('waterLight', '36V')"
                  >36V</span>
                  <span
                    :class="waterLight.indexOf('24V') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('waterLight', '24V')"
                  >24V</span>
                  <span
                    :class="waterLight.indexOf('12V') != -1 ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('waterLight', '12V')"
                  >12V</span>
                  <div slot>防爆型灯</div>
                  <span
                    :class="boomLight[0] == '36V' ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('boomLight', '36V')"
                  >36V</span>
                  <span
                    :class="boomLight[0] == '24V' ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('boomLight', '24V')"
                  >24V</span>
                  <span
                    :class="boomLight[0] == '12V' ? 'seclct_tag is_select':'seclct_tag'"
                    @click="changeChoose('boomLight', '12V')"
                  >12V</span>
                  <div slot>作业人员已佩戴防护器械</div>
                </Signature>
                <Signature
                  :checked="checked[12] ? checked[12].checked : false"
                  :img="checked[12].checked ? checked[12].img : ''"
                  @checked="showSignature(12)"
                  @cancel="signatureCancel(12)"
                >
                  <div slot>动土范围内无障碍物，并在总图上做标记</div>
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
          <!-- 操作Popup -->
          <van-popup v-model="isShowAction" position="bottom" class="action">
            <button @click="postData">保存</button>
            <button @click="Next">工作流提交</button>
            <button @click="closeAction">取消</button>
          </van-popup>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
import Signature from "../components/Signature.vue";
import Canvas from "@/components/Canvas.vue";
export default {
  name: "dongtuindex",
  mixins: [business, uploadFile],
  components: {
    Signature,
    Canvas
  },
  data() {
    return {
      storeModule: "dongtu",
      apply: {
        name: '',
        dept: '',
        code: '',
      },
      sendData: {
        dtSite: "", //作业地点
        dtStarttime: "", //动土开始时间
        dtEndtime: "", //动土结束时间
        otherSpecial: [], //涉及其他作业
        hazardSb: [], //危害辨识
        guardian: [], //监护人
        dtDept: [],
        dtMan: [] //作业部门负责人
      },
      list_1: [
        "动火",
        "登高",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "受限空间",
        "断路作业"
      ],
      list_2: [
        "物体打击",
        "机械伤害",
        "触电",
        "坍塌",
        "中毒窒息",
        "火灾",
        "受限空间"
      ],
      safe: [],
      report: [],
      waterLight: [],
      boomLight: [],
      checked: [],
      isShowAction: false,
      queryId: "",
      isLoading: false,
      signatureShow: false,
      isSave: false,
      canClean: false
    };
  },
  computed: mapState({
    otherSpecial: state => state.dongtu.otherSpecial,
    hazardSb: state => state.dongtu.hazardSb,
    guardian: state => state.dongtu.guardian,
    dtMan: state => state.dongtu.dtMan,
    dtDept: state => state.dongtu.dtDept
  }),
  created() {
    this.pageInit();
  },
  activated() {},
  beforeDestroy() {
    this.queryId = "";
    this.$store.dispatch("dongtu/cleanState");
  },
  methods: {
    pageInit() {
      if (this.$route.query.code) {
        if (this.queryId !== this.$route.query.code) {
          this.queryId = this.$route.query.code;
          this.getPageData();
        }
      } else {
        this.apply ={
            name: this.$userInfo.userName,
            dept: this.$userInfo.officeName,
            code: '',
          };
      }
      this.initChecked();
    },
    initChecked() {
      this.checked = [];
      for (let i = 0; i < 13; i++) {
        let obj = { checked: false };
        this.checked.push(obj);
      }
    },
    // 工作流提交
    workflowSubmit() {
      if (this.$route.query.status == undefined) {
        this.$notify("请先保存表单");
      }
    },
    Next() {
      if (!this.$route.query.code) {
        this.$notify("请先提交保存");
        return;
      } else {
        console.log(123456);
        this.$Toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        this.$api.page_3
          .htHseDtzypListData({
            id: this.$route.query.code,
            __sid: localStorage.getItem("JiaHuaSessionId")
          })
          .then(res => {
            this.$Toast.clear();
            if (res.list[0].actRuTask) {
              console.log(1);
              let data = {
                id: res.list[0].id,
                flowKey: "htHseDtzypService",
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
                        type: "htHseDtzypService"
                      }
                    });
                  } else {
                    this.$router.replace({ name: "dongtu_list" });
                  }
                })
                .catch(() => this.$Toast.clear());
            } else {
              console.log(2);
              let data = {
                id: res.list[0].id,
                flowKey: "htHseDtzypService",
                __sid: localStorage.getItem("JiaHuaSessionId")
              };
              this.$api.page_3
                .start("dtzyp/htHseDtzyp", data)
                .then(ress => {
                  console.log(ress);
                  if (ress.groups) {
                    this.$router.push({
                      name: "daibanren",
                      query: {
                        groups: ress.groups.join(","),
                        taskId: ress.taskId,
                        id: res.list[0].id,
                        type: "htHseDtzypService"
                      }
                    });
                  } else {
                    this.$router.replace({ name: "dongtu_list" });
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
    // 选择器选择事件
    // groupArr => 选择值存放变量 => String => 必填
    // value => 选择值 => String => 必填
    // isSingle => 是否单选 => Boolean => 选填（默认为true）
    changeChoose(groupArr, value, isSingle = true) {
      if (!isSingle) {
        const index = this[groupArr].indexOf(value);
        if (index == -1) {
          this[groupArr].push(value);
        } else {
          this[groupArr].splice(index);
        }
      } else {
        this[groupArr].splice(0);
        this[groupArr].push(value);
      }
    },
    // 显示签名
    showSignature(index) {
      console.log("index: ", index);
      console.log("显示签名");
      this.selectSignatureShow = index;
      this.signatureShow = true;
    },
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.checked[index].checked = false;
      this.checked[index].img = "";
    },

    changeSafe(id) {
      let index = this.safe.indexOf(id);
      if (index == -1) {
        this.safe.push(id);
      } else {
        this.safe.splice(index);
      }
    },
    changeReport(id) {
      let index = this.report.indexOf(id);
      if (index == -1) {
        this.report.push(id);
        // console.log(this.report)
      } else {
        this.report.splice(index);
        // console.log(this.report)
      }
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },

    saveCanvas(e) {
      this.signatureShow = false;
      this.checked[this.selectSignatureShow] = {
        checked: true,
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
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let htDeviceDefect_file = this.fileList.map(item => {
        return item.id;
      });
      console.log("file", htDeviceDefect_file);
      sendData.otherSpecial = this.stringData("otherSpecial", "list_1");
      sendData.hazardSb = this.stringData("hazardSb", "list_2");
      sendData.guardian = this.userString(sendData.guardian, "userCode");
      sendData.dtMan = this.userString(sendData.dtMan, "userCode");
      sendData.dtDept = this.userString(sendData.dtDept, "id");
      sendData.dtSite = this.sendData.dtSite; // 作业地点
      sendData.htDeviceDefect_file = htDeviceDefect_file.join(",");
      sendData.__sid = this.$userInfo.sessionId;
      sendData.dtStarttime = this.sendData.dtStarttime;
      sendData.dtEndtime = this.sendData.dtEndtime;
      // let htHseDtzypListData = [
      //   {
      //     id: this.$route.query.code
      //   }
      // ];
      // sendData.htHseDtzypListData = htHseDtzypListData;
      if (this.$route.query.code) {
        sendData.id = this.$route.query.code;
      }
      if (
        this.isDataEmpty(
          sendData.dtSite,
          sendData.otherSpecial,
          sendData.hazardSb,
          sendData.dtStarttime,
          sendData.dtEndtime,
          sendData.guardian,
          sendData.dtMan
        )
      ) {
        this.notify();
        return;
      }
      if (this.queryId) {
        sendData.applyDept = this.oldInfo.office.officeCode;
        sendData.applyer = this.oldInfo.user.userCode;
        //  获取子列表
        sendData.htHseDtzypSafetyList = this.setChilderData(this.queryId);
      } else {
        sendData.applyDept = this.$userInfo.officeCode;
        sendData.applyer = this.$userInfo.userCode;
            //  获取子列表
        sendData.htHseDtzypSafetyList = this.setChilderData('');
      }
      console.log("sendData", sendData);
      console.log("sendData", sendData.htHseDtzypSafetyList);
      this.$api.page_3
        .htHseDtzypSave(sendData, this.$userInfo.sessionId)
        .then(() => {
          this.$Toast.success({
            message: "提交成功",
            onClose() {
              that.pageBack();
            }
          });
        })
        .catch(() => {});
    },
    setChilderData (messageId) {
       let lsidydzypSafetyList = [
        {
          id: messageId,
          num: 1,
          safetyCs: `作业人员已进行了安全教育`,
          affirmRen: this.checked[0].checked ? this.checked[0].img : 0,
          safetyStatus: this.checked[0].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 2,
          safetyCs: `作业地点处于易燃易爆场所，需要动火时已办理动火证`,
          affirmRen: this.checked[1].checked ? this.checked[1].img : 0,
          safetyStatus: this.checked[1].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 3,
          safetyCs: `地下电力点啦已确认保护措施已落实`,
          affirmRen: this.checked[2].checked ? this.checked[2].img : 0,
          safetyStatus: this.checked[2].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 4,
          safetyCs: `地下通讯电（光）缆、局域网络电（光）缆已确认保护措施已落实`,
          affirmRen: this.checked[3].checked ? this.checked[3].img : 0,
          safetyStatus: this.checked[3].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 5,
          safetyCs: `地下供排水、消防管道、工艺管道已确认保护措施已落实。`,
          affirmRen: this.checked[4].checked ? this.checked[4].img : 0,
          safetyStatus: this.checked[4].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 6,
          safetyCs: `已按作业方案图划线和立绘`,
          affirmRen: this.checked[5].checked ? this.checked[5].img : 0,
          safetyStatus: this.checked[5].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 7,
          safetyCs: `动土地点有电线、管道等地下设施，已向作业单位交代并派人监护；作业时情挖做使用铁棒、铁镐或抓斗等机械工具。`,
          affirmRen: this.checked[6].checked ? this.checked[6].img : 0,
          safetyStatus: this.checked[6].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 8,
          safetyCs: `作业现场围栏、警戒线、告示牌、夜间照明、警示灯已按要求设置`,
          affirmRen: this.checked[7].checked ? this.checked[7].img : 0,
          safetyStatus: this.checked[7].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 9,
          safetyCs: `已进行放坡处理和固壁支撑`,
          affirmRen: this.checked[8].checked ? this.checked[8].img : 0,
          safetyStatus: this.checked[8].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 10,
          safetyCs: `人员出入口和撤离安全措施已落实:${this.safe.join(',')}`,
          affirmRen: this.checked[9].checked ? this.checked[9].img : 0,
          safetyStatus: this.checked[9].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 11,
          safetyCs: `施工作业已报:${this.report.join(',')}`,
          affirmRen: this.checked[10].checked ? this.checked[10].img : 0,
          safetyStatus: this.checked[10].checked ? 1 : 0
        },
                //  safe report waterLight
        {
          id: messageId,
          num: 12,
          safetyCs: `夜间作业采用足够、充足照明，A防水型灯:${this.waterLight[0]}防爆型灯${this.boomLight[0]}作业人员已佩戴防护器械`,
          affirmRen: this.checked[11].checked ? this.checked[11].img : 0,
          safetyStatus: this.checked[11].checked ? 1 : 0
        },
        {
          id: messageId,
          num: 13,
          safetyCs: `动土范围内无障碍物，并在总图上做标记`,
          affirmRen: this.checked[12].checked ? this.checked[12].img : 0,
          safetyStatus: this.checked[12].checked ? 1 : 0
        }
      ];
      return lsidydzypSafetyList;
    },
    // 编辑-获取页面数据
    getPageData() {
      this.isLoading = true;
      this.$api.page_3
        .htHseDtzypListDataById({
          id: this.queryId,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          this.isLoading = false;
          let info = res;
          this.oldInfo = res;
          console.log("pageData: ", info);
          console.log("id: ", info.id);
          this.sendData.id = info.id;
          for (const key in this.sendData) {
            if (key === "guardian") {
              this.sendData[key] = this.reductionSelectUserObj({
                userName: info.jhr,
                userCode: info.guardian
              });
            } else if (key === "dtMan") {
              this.sendData[key] = this.reductionSelectUserObj(info.zyfzr);
            } else if (key === "dtDept") {
              this.sendData[key] = [
                {
                  id: info.zybm.id,
                  name: info.zybm.officeName
                }
              ];
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
          this.apply ={
            name: info.user.userName,
            dept: info.office.officeName,
            code: info.dtzypCode,
          };
          // this.sendData.applyDept = this.oldInfo.office.officeName;
          // this.sendData.applyer = this.oldInfo.user.userName;
          if (info.htHseDtzypSafetyList.length > 0) {
            this.initChilderData(info.htHseDtzypSafetyList)
          }
          // 子表初始化
          console.log("this.sendData: ", this.sendData);
        });
    },
    initChilderData (res) {
      let checked = {};
        console.log("动土", res);
        res.forEach((item, inx) => {
          if (item.safetyStatus && item.safetyStatus === 1) {
            checked[item.num] = {
              checked: true,
              img: item.affirmRen,
            };
          } else {
            checked[item.num] = {
              checked: false,
              img: "",
            };
          }
        });
        this.checked = Object.values(checked);
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
    }
  },
  watch: {
    otherSpecial(res) {
      this.sendData.otherSpecial = res;
    },
    hazardSb(res) {
      this.sendData.hazardSb = res;
    },
    guardian(res) {
      this.sendData.guardian = res;
    },
    dtMan(res) {
      this.sendData.dtMan = res;
    },
    dtDept(res) {
      this.sendData.dtDept = res;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.mangban {
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
  .image-update {
    flex-wrap: initial !important;
  }
}
</style>
