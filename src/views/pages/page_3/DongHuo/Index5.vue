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
      <cell-value title="申请部门" required :value="oldInfo.office.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" required :value="oldInfo.user.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="oldInfo.dhzypCode" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" :value="htStatus(oldInfo.htStatus)" disable></cell-value>
      <!-- 动火地点及内容 -->
      <cell-textarea
        title="动火地点及内容"
        required
        v-model="sendData.siteContent"
        placeholder="请输入作业内容"
        disable
      ></cell-textarea>
      <!-- 动火级别 -->
      <cell-value title="动火级别" :value="dhLevelColumns[sendData.dhLevel - 1]" required disable arrow></cell-value>
      <!-- 动火方式 -->
      <cell-select-tag
        required
        title="动火方式"
        storeKey="dhWay"
        :tagList="sendData.dhWay"
        :showList="list_1"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 涉及其他作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="otherSpecial"
        :tagList="sendData.otherSpecial"
        :showList="list_2"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :tagList="sendData.hazardSb"
        :showList="list_3"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 动火开始时间 -->
      <cell-time v-model="sendData.dhStarttime" title="动火开始时间" required disable></cell-time>
      <!-- 动火结束时间 -->
      <cell-time v-model="sendData.dhEndtime" title="动火结束时间" required disable></cell-time>
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
        <div class="confirm_list" v-if="childrenData[0]">
          <Signature
            :checked="childrenData[0].safetyStatus === 1"
            disable
            :img="childrenData[0].affirmRen === '0' ? '' : childrenData[0].affirmRen"
          >
            <span slot>动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件。</span>
          </Signature>
          <Signature
            :checked="childrenData[1].safetyStatus === 1"
            disable
            :img="childrenData[1].affirmRen === '0' ? '' : childrenData[1].affirmRen"
          >
            <span slot>{{childrenData[1].safetyCs}}</span>
          </Signature>
          <Signature
            :checked="childrenData[2].safetyStatus === 1"
            disable
            :img="childrenData[2].affirmRen === '0' ? '' : childrenData[2].affirmRen"
          >
            <div slot>动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离</div>
          </Signature>
          <Signature
            :checked="childrenData[3].safetyStatus === 1"
            disable
            :img="childrenData[3].affirmRen === '0' ? '' : childrenData[3].affirmRen"
          >
            <div slot>罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业</div>
          </Signature>
          <Signature
            :checked="childrenData[4].safetyStatus === 1"
            disable
            :img="childrenData[4].affirmRen === '0' ? '' : childrenData[4].affirmRen"
          >
            <div slot>高处作业已采取防火花飞溅措施</div>
          </Signature>
          <Signature
            :checked="childrenData[5].safetyStatus === 1"
            disable
            :img="childrenData[5].affirmRen === '0' ? '' : childrenData[5].affirmRen"
          >
            <div slot>动火点周围易燃物已清除</div>
          </Signature>
          <Signature
            :checked="childrenData[6].safetyStatus === 1"
            disable
            :img="childrenData[6].affirmRen === '0' ? '' : childrenData[6].affirmRen"
          >
            <div slot>电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接</div>
          </Signature>
          <Signature
            :checked="childrenData[7].safetyStatus === 1"
            disable
            :img="childrenData[7].affirmRen === '0' ? '' : childrenData[7].affirmRen"
          >
            <div slot>乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米</div>
          </Signature>
          <Signature
            :checked="childrenData[8].safetyStatus === 1"
            disable
            :img="childrenData[8].affirmRen === '0' ? '' : childrenData[8].affirmRen"
          >
            <div slot>{{childrenData[8].safetyCs}}</div>
          </Signature>
        </div>
      </div>
      <!-- 动火分析 -->
      <div class="fenxi">
        <div class="fenxi__title">动火分析1</div>
        <!-- 动火分析时间 -->
        <cell-time disable v-model="sendData.dhfxTimeA" title="动火分析时间" required></cell-time>
        <!-- 分析点名称 -->
        <cell-input disable v-model="sendData.fxdNameA" title="分析点名称" required placeholder="手工录入"></cell-input>
        <!-- 可燃气体爆炸极限 -->
        <cell-picker
           disable
          title="可燃气体爆炸极限"
          required
          v-model="sendData.krqbzLimitationA"
          :columns="krqbzLimitationAColumns"
        ></cell-picker>
        <!-- 分析数据 -->
        <cell-input  disable v-model="sendData.fxDataA" title="分析数据" required placeholder="手工录入"></cell-input>
        <!-- 分析人 -->
        <select-organization 
          title="分析人"
          required
          radio
          disable
          :storeModule="storeModule"
          storeKey="fxRenA"
          v-model="sendData.fxRenA"
        ></select-organization >
      </div>
      <div class="fenxi" v-if="sendData.dhfxTimeB !== undefined">
        <div class="fenxi__title">动火分析2</div>
        <!-- 动火分析时间 -->
        <cell-time disable v-model="sendData.dhfxTimeB" title="动火分析时间" required></cell-time>
        <!-- 分析点名称 -->
        <cell-input disable v-model="sendData.fxdNameB" title="分析点名称" required placeholder="手工录入"></cell-input>
        <!-- 可燃气体爆炸极限 -->
        <cell-picker
          disable
          title="可燃气体爆炸极限"
          required
          :value="sendData.krqbzLimitationB"
          @change="updatakrqbzLimitation('krqbzLimitationB', $event)"
          :columns="krqbzLimitationAColumns"
        ></cell-picker>
        <!-- 分析数据 -->
        <cell-input disable v-model="sendData.fxDataB" title="分析数据" required placeholder="手工录入"></cell-input>
        <!-- 分析人 -->
        <select-organization 
          disable
          title="分析人"
          required
          radio
          :storeModule="storeModule"
          storeKey="fxRenB"
          v-model="sendData.fxRenB"
        ></select-organization >
      </div>
      <div class="fenxi" v-if="sendData.dhfxTimeC !== undefined">
        <div class="fenxi__title">动火分析3</div>
        <!-- 动火分析时间 -->
        <cell-time disable v-model="sendData.dhfxTimeC" title="动火分析时间" required></cell-time>
        <!-- 分析点名称 -->
        <cell-input disable v-model="sendData.fxdNameC" title="分析点名称" required placeholder="手工录入"></cell-input>
        <!-- 可燃气体爆炸极限 dhfxTimeC fxdNameC krqbzLimitationC fxRenC- fxDataC-->
        <cell-picker
           disable
          title="可燃气体爆炸极限"
          required
          :value="sendData.krqbzLimitationC"
          @change="updatakrqbzLimitation('krqbzLimitationC', $event)"
          :columns="krqbzLimitationAColumns"
        ></cell-picker>
        <!-- 分析数据 -->
        <cell-input disable v-model="sendData.fxDataC" title="分析数据" required placeholder="手工录入"></cell-input>
        <!-- 分析人 -->
        <select-organization
          disable 
          title="分析人"
          required
          radio
          :storeModule="storeModule"
          storeKey="fxRenC"
          v-model="sendData.fxRenC"
        ></select-organization >
      </div>
      <!-- 其他安全措施 -->
      <cell-textarea disable title="其他安全措施" required placeholder="请输入其他安全措施" v-model="sendData.otherSafety"></cell-textarea>
      <div class="signature">
        <div class="signature__head">
          <div>签字</div>
          <div class="signature__image" v-show="sendData.bianzhiren">
            <img :src="sendData.bianzhiren" alt srcset />
          </div>
          <div class="signature__icon" v-if="sendData.bianzhiren">{{sendData.othercsDate}}</div>
          <van-icon class="signature__icon" v-else name="edit" />
        </div>
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
                disabled
                :before-read="beforeRead"
                :before-delete="beforeDelete"
                v-model="fileListA"
                preview-size="5rem"
              />
            </div>
          </div>
        </div>
      </div>
      <select-organization
          disable
          title="监火人"
          required
          radio
          :storeModule="storeModule"
          storeKey="dhSup"
          v-model="sendData.dhSup"
      ></select-organization>
      <select-organization
          disable
          title="承包商监火人"
          required
          radio
          :storeModule="storeModule"
          storeKey="dhSupCbs"
          v-model="sendData.dhSupCbs"
      ></select-organization>
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
        <button @click="Next">工作流提交</button>
        <button @click="closeAction">取消</button>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "donghuoindex2",
  mixins: [business, uploadFile],
  components: {
    Canvas,
    Signature
  },
  data() {
    return {
      storeModule: "donghuo",
      sendData: {
        siteContent: "", //动火地点及内容
        dhLevel: null, //动火级别
        dhStarttime: "", //动火开始时间
        dhEndtime: "", //动火结束时间
        dhWay: [], //动火方式
        otherSpecial: [], //涉及其他特殊作业
        hazardSb: [], //危害辨识
        dhzyPrincipal: [], //动火作业负责人
        dhzyRen: [], //动火人
        otherSafety: "", //其他安全措施
        othercsDate:  "", //其他安全措施牵签字日期 
        bianzhiren: '', //其他安全措施牵签字人
        dhfxTimeA: "", //动火分析时间1
        fxdNameA: "", //分析点名称1
        krqbzLimitationA: null, //可燃气爆炸极限1
        fxDataA: "", //分析数据1
        fxRenA: [], //分析人1
        dhSup:[],
        dhSupCbs:[]
      },
      dhLevelColumns: ["制定位置特殊动火作业", "特殊", "|类", "||类"],
      krqbzLimitationAColumns: [
        "甲醇（6～36.5）",
        "乙醇（3.3～19）",
        "氯苯（1.3～11）",
        "氢气（4.1～72）",
        "甲苯（1.2～7）"
      ], //可燃气爆炸极限1
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
      manbanNumber: 0,
      fangshuidaiNumber: 0,
      miehuoqiNumber: 0,
      tieqiuNumber: 0,
      miehuotanNumber: 0,
      signatureShow: false,
      checked: [],
      selectSignatureShow: Number,
      isShowAction: false,
      oldInfo: {}, //主表信息
      childrenData: [], //子表信息
      fileListA: [],
      signatureA: "",
      signatureATime: "",
      actRuTask: "",
      id: "",
      status: ""
    };
  },
  watch: {
    fxRenA(res) {
      this.sendData.fxRenA = res;
    },
    fxRenB(res) {
      this.sendData.fxRenB = res;
    },
    fxRenC(res) {
      this.sendData.fxRenC = res;
    },
    dhSup(res){
      this.sendData.dhSup = res;
    },
    dhSupCbs(res){
      this.sendData.dhSupCbs = res;
    },
  },
  computed: mapState({
    fxRenA: state => state.donghuo.fxRenA,
    fxRenB: state => state.donghuo.fxRenB,
    fxRenC: state => state.donghuo.fxRenC,
    dhSup:state=>state.donghuo.dhSup,
    dhSupCbs:state=>state.donghuo.dhSupCbs
  }),
  created() {
    this.pageInit();
  },
  activated() {
    this.pageInit();
  },
  beforeDestroy() {
    this.queryId = "";
    this.$store.dispatch("dongtu/cleanState");
  },
  methods: {
    updatakrqbzLimitation(name, val) {
      this.$set(this.sendData, name, val + "");
      this.$forceUpdate();
    },
    addFenxi() {
      let fenxiB = {
        dhfxTimeB: "", //动火分析时间1
        fxdNameB: "", //分析点名称1
        krqbzLimitationB: null, //可燃气爆炸极限1
        fxDataB: "", //分析数据1
        fxRenB: [] //分析人1
      };
      let fenxiC = {
        dhfxTimeC: "", //动火分析时间1
        fxdNameC: "", //分析点名称1
        krqbzLimitationC: null, //可燃气爆炸极限1
        fxDataC: "", //分析数据1
        fxRenC: [] //分析人1
      };
      if (this.sendData.dhfxTimeB === undefined) {
        Object.assign(this.sendData, fenxiB);
        this.$forceUpdate();
        return;
      }
      if (this.sendData.dhfxTimeC === undefined) {
        Object.assign(this.sendData, fenxiC);
        this.$forceUpdate();
        return;
      }
      this.$Toast.fail({
        message: "最多添加三个"
      });
    },
    pageInit() {
      console.log(1111111111111111)
      console.log(this.sendData)
      if (this.$route.query.id) {
        if (this.queryId !== this.$route.query.id) {
          this.queryId = this.$route.query.id;
          this.getPageData();
        }
      }
    },
    // 清除所有数据
    clearData() {
      this.sendData.siteContent = ""; //动火地点及内容
      this.sendData.dhLevel = null; //动火级别
      this.sendData.dhStarttime = ""; //动火开始时间
      this.sendData.dhEndtime = ""; //动火结束时间
      this.sendData.dhWay = []; //动火方式
      this.sendData.otherSpecial = []; //涉及其他特殊作业
      this.sendData.hazardSb = []; //危害辨识
      this.sendData.dhzyPrincipal = []; //动火作业负责人
      this.sendData.dhzyRen = []; //动火人
      this.sendData.dhSup = []; //动火作业负责人
      this.sendData.dhSupCbs = []; //动火人
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },
    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    // 保存签名
    saveCanvas(e) {
      this.sendData.bianzhiren = e;
      this.sendData.othercsDate = this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm");
      this.signatureShow = false;
    },
    // 取消签名
    cancelCanvas() {
      this.signatureA = "";
      this.signatureATime = "";
      this.signatureShow = false;
    },
    // 动火主表查询
    getPageData() {
      this.$Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.$api.page_3
        .htHseDhzypListData({
          dhzypCode: this.queryId,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          let info = res.list[0];
          this.oldInfo = info;
          console.log("动火初审  this.sendData", res);
          this.actRuTask = res.list[0].actRuTask
            ? res.list[0].actRuTask.id
            : "";
          this.id = res.list[0].id;
          this.status = res.list[0].htStatus;
          for (const key in this.sendData) {
            if (key === "dhzyPrincipal" && info.dhfzr) {
              this.sendData[key] = this.reductionSelectUserObj(info.dhfzr);
            } else if (key === "dhzyRen" && info.dhzyRenCode) {
              this.sendData[key] = this.reductionSelectUserObj(this.assemblyStrToUserObj(info.dhzyRen, info.dhzyRenCode));
            } else if (key === "fxRenA" ) {
              if (info[key]) {
                this.sendData.fxRenA = this.reductionSelectUserObj(info.fxra);
              }
            } else if (key === "dhSup" ) {
              if (info[key]) {
                this.sendData.dhSup = this.reductionSelectUserObj(info.sup);
              }
            } else if (key === "dhSupCbs" ) {
              if (info[key]) {
                this.sendData.dhSupCbs = this.reductionSelectUserObj(info.supCbs);
              }
            } else if (key === "dhWay") {
              if (info[key]) {
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_1
                );
                console.log('this.sendData[key]', this.sendData[key]);
              }
            } else if (key === "otherSpecial") {
              if (info[key]) {
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_2
                );
              }
            } else if (key === "hazardSb") {
              if (info[key]) {
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_3
                );
              }
            } else if (key === "othercsDate") {
              this.sendData[key] = this.$dayjs(new Date(info[key])).format("YYYY-MM-DD HH:mm");
            } else {
              this.sendData[key] = info[key];
            }
          }
          if (info.fxRenB) {
              this.sendData.fxRenB = this.reductionSelectUserObj(info.fxrb);
              this.sendData.dhfxTimeB = info.dhfxTimeB;
              this.sendData.krqbzLimitationB = info.krqbzLimitationB;
              this.sendData.fxDataB = info.fxDataB;
              this.sendData.fxdNameB = info.fxdNameB;
          }
          if (info.fxRenC) {
              this.sendData.fxRenC = this.reductionSelectUserObj(info.fxrc);
              this.sendData.dhfxTimeC = info.dhfxTimeC;
              this.sendData.krqbzLimitationC = info.krqbzLimitationC;
              this.sendData.fxDataC = info.fxDataC;
              this.sendData.fxdNameC = info.fxdNameC;
          }
          console.log("报错了",  this.sendData);
          // 动火子表查询
          this.mylistDataD();
        })
        .catch(() => {
          console.log("报错了");
          this.$Toast.clear();
        });
    },
    Next() {
      if (this.actRuTask === "") {
        console.log(2);
        let data = {
          id: this.id,
          flowKey: "htHseDhzypService",
          __sid: localStorage.getItem("JiaHuaSessionId")
        };
        this.$api.page_3
          .start("dhzyp/htHseDhzyp", data)
          .then(res => {
            console.log(res);
            if (res.groups) {
              this.$router.push({
                name: "daibanren",
                query: {
                  groups: res.groups.join(","),
                  taskId: res.taskId,
                  id: this.id,
                  type: "htHseDhzypService"
                }
              });
            } else {
              this.$router.replace({ name: "donghuo_list" });
            }
          })
          .catch(() => this.$Toast.clear());
      } else {
        this.$router.push({
          name: "donghuo_shenpi",
          query: {
            id: this.id,
            actRuTask: this.actRuTask,
            status: this.status
          }
        });
      }
    },
    // 动火子表查询
    mylistDataD() {
      this.$api.page_3
        .mylistDataD({
          zypId: this.oldInfo.id,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          console.log("mylistDataD=======", res);
          this.childrenData = res;
          this.$Toast.clear();
          this.$forceUpdate();
        })
        .catch(() => {
          this.$Toast.clear();
        });
    },

    // 判断数据输入的完整性
    // true => 输入完整
    // false => 有问题的输入
    isDataEdit() {
      // 动火分析时间
      if (!this.sendData.dhfxTimeA) {
        this.$notify("请选择动火分析时间");
        return false;
      }
      // 分析点名称
      if (!this.sendData.fxdNameA) {
        this.$notify("请输入分析点名称");
        return false;
      }
      // 可燃气爆炸极限
      if (!this.sendData.krqbzLimitationA) {
        this.$notify("请选择可燃气爆炸极限");
        return false;
      }
      // 分析数据
      if (!this.sendData.fxDataA) {
        this.$notify("分析数据");
        return false;
      }
      // 分析人
      if (this.sendData.fxRenA.length === 0) {
        this.$notify("请选择分析人");
        return false;
      }
      return true;
    },
    // 主表保存
    postData() {
      // 检测到输入不完整直接退出函数
      if (!this.isDataEdit()) {
        return;
      }
      this.isShowAction = false;
      this.$Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.dhWay = this.stringData("dhWay", "list_1");
      sendData.otherSpecial = this.stringData("otherSpecial", "list_2");
      sendData.hazardSb = this.stringData("hazardSb", "list_3");
      sendData.dhzyPrincipal = this.userString(
        sendData.dhzyPrincipal,
        "userCode"
      );
      sendData.dhzyRen = this.userString(sendData.dhzyRen, "userCode");
      // 添加动火分析 dhfxTimeC fxdNameC krqbzLimitationC fxRenC- fxDataC
      sendData.fxRenA = this.userString(sendData.fxRenA || [], "userCode"); //分析人A
      sendData.fxRenB = this.userString(sendData.fxRenB || [], "userCode"); //分析人A
      sendData.fxRenC = this.userString(sendData.fxRenC || [], "userCode"); //分析人A
      sendData.dhSup = this.userString(sendData.dhSup || [], "userCode"); //分析人A
      sendData.dhSupCbs = this.userString(sendData.dhSupCbs || [], "userCode"); //分析人A
      // 结束
      sendData.applyDept = this.$userInfo.officeCode;
      sendData.applyRen = this.$userInfo.userCode;
      sendData.__sid = this.$userInfo.sessionId;
      sendData.id = this.oldInfo.id;
      sendData.dhzypCode = this.oldInfo.dhzypCode;
      const that = this;
      this.$api.page_3
        .htHseDhzypSave(sendData)
        .then(res => {
          this.$Toast.clear();
          this.$Toast.success({
            message: "保存成功",
            onClose() {
              // 动火主表查询
              that.getPageData();
            }
          });
        })
        .catch(() => {
          this.$Toast.clear();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  text-align: center;
  margin-bottom: 30px;
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

  &__head {
    display: flex;
    align-items: center;
  }

  &__image {
    margin-left: 0;
    width: 112.5px;
    height: 45px;

    img {
      width: 112.5px;
      height: 45px;
    }
  }

  &__icon {
    margin-left: auto;
  }
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
    background-color: #6096f8;
  }
}
.adddonghuofenxi {
  text-align: right;
  padding: 30px;
  cursor: pointer;
}
.adddonghuofenxi .van-icon {
  font-size: 18px;
}
.confirm {
  padding: 30px;
}
</style>