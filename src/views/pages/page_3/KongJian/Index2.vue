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
    <div class="cell_group">
       <!-- 申请部门 -->
        <cell-value title="申请部门" :value="apply.dept" disable></cell-value>
      <!-- 申请人 -->
        <cell-value title="申请人" :value="apply.name" disable></cell-value>
        <!-- 作业票编号 -->
        <cell-value title="作业票编号"
                    :value="apply.code"
                    disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" required :value="htStatus(oldInfo.htStatus)" disable></cell-value>
      <!-- 受限空间所属空间 -->
      <cell-select-department title="受限空间所属单位"
                                required
                                disable
                                :storeModule="storeModule"
                                storeKey="sxkjDanwei"
                                v-model="sendData.sxkjDanwei"></cell-select-department>
      <!-- 作业内容 -->
      <cell-textarea
        title="作业内容"
        required
        v-model="sendData.zyContent"
        placeholder="请输入作业内容"
        disabled
        class="disabled"
      ></cell-textarea>
      <!-- 设备名称 -->
      <cell-value title="设备名称" required v-model="sendData.devicename" placeholder="请输入设备名称" disable></cell-value>
      <!-- 受限空间原有界质 -->
      <cell-value
        title="受限空间原有界质"
        required
        v-model="sendData.sxkjNeurogen"
        placeholder="请输入界质名称"
        disable
      ></cell-value>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        disable
        title="涉及其他特殊作业"
        storeKey="zyOtherspecial"
        :tagList="sendData.zyOtherspecial"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        disable
        title="危害辨识"
        storeKey="zywhBs"
        :tagList="sendData.zywhBs"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time title="作业开始时间" disable v-model="sendData.zyStarttime"></cell-time>
      <!-- 作业结束时间 -->
      <cell-time title="作业结束时间" v-model="sendData.zyEndtime" disable></cell-time>
      <!-- 作业部门负责人 -->
      <select-organization
        title="作业部门负责人"
        disable
        :max="2"
        :storeModule="storeModule"
        storeKey="zyPrincipal"
        v-model="sendData.zyPrincipal"
      ></select-organization>
      <!-- 作业人 -->
      <select-organization
        title="作业人"
        disable
        :max="9"
        :storeModule="storeModule"
        storeKey="zyRen"
        v-model="sendData.zyRen"
      ></select-organization>
      <!-- 监护人 -->
      <select-organization
        title="监护人"
        disable
        :max="2"
        :storeModule="storeModule"
        storeKey="guardian"
        v-model="sendData.guardian"
      ></select-organization>
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
            disable
          >
            <span slot>对进入受限空间危险性进行分析。</span>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] && checked[1].checked ? signatureImg : ''"
            disable
          >
            <span slot>与受限空间有联系的阀门管线加盲板隔离，列出盲板清单，落实抽堵盲板责任人。</span>
          </Signature>
          <Signature
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] && checked[2].checked ? signatureImg : ''"
            disable
          >
            <div slot>设备经过置换、吹扫、蒸煮。</div>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] && checked[3].checked ? signatureImg : ''"
            disable
          >
            <div slot>设备打开通风孔进行自然通风,温度适宜人员作业;必要时采用强制通风或佩戴空气呼吸器,但严禁用通氧气或富氧空气的方法补充氧。</div>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] && checked[4].checked ? signatureImg : ''"
            disable
          >
            <div slot>相关设备进行处理,带搅拌机的设备要切断电源,电源开关处加锁或挂“禁止合闸”标志牌,设专人监护。</div>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] && checked[5].checked ? signatureImg : ''"
            disable
          >
            <div slot>检查受限空间内部已具备作业条件,清罐时(无需用/已采用)防爆工具。</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] && checked[6].checked ? signatureImg : ''"
            disable
          >
            <div slot>检查受限空间进出口通道,无阻碍人员进出的障碍物。</div>
          </Signature>
          <Signature
            :checked="checked[7] ? checked[7].checked : false"
            :img="checked[7] && checked[7].checked ? signatureImg : ''"
            disable
          >
            <div slot>分析盛装过可燃有毒液体、气体的受限空间内的可燃、有毒有害气体含量。</div>
          </Signature>
          <Signature
            :checked="checked[8] ? checked[8].checked : false"
            :img="checked[8] && checked[8].checked ? signatureImg : ''"
            disable
          >
            <div slot>作业人员清楚受限空间内存在的其他危险因素,如内部附件、集渣坑等。</div>
          </Signature>
          <Signature
            :checked="checked[9] ? checked[9].checked : false"
            :img="checked[9] && checked[9].checked ? signatureImg : ''"
            disable
          >
            <div slot>
              作业监护措施{{checked[9].checked}}
              <span>
                消防器材：
                <van-stepper :min="0" v-model="fireCount" />
              </span>
              <!-- <div>、救生绳</div> -->
              <span>
                救生绳
                <van-stepper :min="0" v-model="lifelineCount" />
              </span>
              <!-- <div>、气防装备</div> -->
              <span>
                气防装备：
                <van-stepper :min="0" v-model="gasCount" />
              </span>
            </div>
            <!-- fireCount lifelineCount  gasCount-->
          </Signature>
          <Signature
            :checked="checked[10] ? checked[10].checked : false"
            :img="checked[10] && checked[10].checked ? signatureImg : ''"
            disable
          >
            <div slot>检查受限空间进出口通道,无阻碍人员进出的障碍物。</div>
          </Signature>
        </div>
      </div>
      <!-- 分析 -->
      <div class="fenxi" v-for="(fx, index) in fenxi" :key="index">
        <div class="fenxi__title">分析项目{{index+1}}</div>
        <div class="kongjianFenxi">
          <div class="kongjianFenxi-box">
            <div class="kongjianFenxi-title"></div>
            <div class="kongjianFenxi-standard">分析标准</div>
            <div class="kongjianFenxi-data">分析数据</div>
          </div>
          <div
            v-for="(fxData, fxindex) in fx.fenxidata"
            :key="fxindex + 'fxData'"
            class="kongjianFenxi-box"
          >
            <div class="kongjianFenxi-title">{{fxData.title}}</div>
            <div class="kongjianFenxi-standard">
              <div
                v-for="(fxStandard, standardindex) in fxData.standard"
                :key="standardindex + 'fxStandard'"
              >
                <van-field
                  readonly
                  clickable
                  :value="fxStandard"
                  placeholder="选择分析"
                  @click="setFenxiSelect(index,fxindex, standardindex,fxData.title)"
                  v-if="fxData.title !== '氧含量'"
                />
                <span v-if="fxData.title === '氧含量'">{{fxStandard}}</span>
              </div>
            </div>
            <div class="kongjianFenxi-data">
              <div
                v-for="(fxDataData, datadataindex) in fxData.data"
                :key="datadataindex + 'fxDataData'"
              >
                <van-field
                  :value="fxDataData"
                  @input="updataFenxi(index,fxindex, datadataindex, 'data', $event)"
                  placeholder="请输入分析数据"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 分析时间 -->
        <cell-value v-model="fx.fenxiTime" title="动火分析时间" disable></cell-value>
        <!-- 分析点名称 -->
        <cell-input v-model="fx.fenxiParts" title="分析部位" required placeholder="手工录入"></cell-input>
        <!-- 分析人 -->
        <div class="kongjianFenxiRen" @click="showFenxiRensignature(index)">
          <div>
            分析人
            <span class="redColor">*</span>
          </div>
          <div>
            <img v-if="fx.fenxiren" :src="fx.fenxiren" class="kongjianFenxiRen-img" />
          </div>
        </div>
      </div>

      <div class="adddonghuofenxi" @click="addFenxi">
        <van-icon name="plus" />
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
      <button @click="Next">工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
    <!--  分析选择 -->
    <van-popup v-model="showFenxiSelect" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showFenxiSelect = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "../../../../mixin/business";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
import StepperPlus from "@/components/StepperPlus.vue";
import { send } from "q";
export default {
  name: "kongjianindex2",
  mixins: [business],
  data() {
    return {
      initData: {},
      columns: [],
      storeModule: "kongjian",
      youduyouhai: [1, 2, 3],
      keranqiti: [
        "甲醇（6~36.5)",
        "乙醇（3.3~19）",
        "氯苯（1.3~11）",
        "氢气（4.1~75）",
        "甲苯（1.2~7)"
      ],
      apply: {
        name: '',
        dept: '',
        code: '',
      },
      fireCount: 0, // 消防数量
      lifelineCount: 0, // 救生绳
      gasCount: 0, // 气防装备
      showFenxiSelect: false,
      sendData: {
        zyContent: "", //作业内容
        id: this.zypId, // 作业票编号
        devicename: "", //设备名称
        sxkjNeurogen: "", //受限空间内原有介质
        zyOtherspecial: [], //涉及的其他特殊作业
        zywhBs: [], //危害辨识
        zyStarttime: "", //作业开始时间
        zyEndtime: "", //作业结束时间
        sxkjDanwei: [], // 受限空间所属空间
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
      signatureImg: "", // 只保存一个签名
      signatureShow: false,
      fenxi: [],
      actRuTask: "",
      id: "",
      oldInfo:{},
      fenxiCallBack: () => {},
      fenxiSignatureCallBack: () => {}
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
  beforeDestroy() {
    this.queryId = "";
    this.$store.dispatch("kongjian/cleanState");
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
  created() {
    this.initChecked();
    this.initPage();
    this.initChecked();
  },
  activated() {
    this.initPage();
  },
  deactivated() {
    this.queryId = "";
  },
  methods: {
    Next() {
      console.log(this.actRuTask, this.id);
      if (this.actRuTask === "") {
        console.log(2);
        let data = {
          id: this.id,
          flowKey: "htHseSxkjzypService",
          __sid: localStorage.getItem("JiaHuaSessionId")
        };
        this.$api.page_3
          .start("sxkjzyp/htHseSxkjzyp", data)
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
                    type: "htHseSxkjzypService"
                  }
                });
              } else {
                this.$router.replace({ name: "kongjian_list" });
              }
            } else {
              this.$notify(res.message);
            }
          })
          .catch(() => this.$Toast.clear());
      } else {
        console.log(23);
        this.$router.push({
          name: "kongjian_shenpi",
          query: {
            id: this.id,
            actRuTask: this.actRuTask
          }
        });
      }
    },
    //  展示分析人的签名
    showFenxiRensignature(index) {
      this.signatureShow = true;
      this.fenxiSignatureCallBack = this.updatefenxiSignature(index);
    },
    updatefenxiSignature(index) {
      return img => {
        this.fenxi[index].fenxiren = img;
      };
    },
    setFenxiSelect(ffindex, findex, index, name) {
      switch (name) {
        case "有毒有害物质":
          this.columns = this.youduyouhai;
          break;
        case "可燃气":
          this.columns = this.keranqiti;
          break;
      }
      this.showFenxiSelect = true;
      this.fenxiCallBack = this.selectCachFun(ffindex, findex, index);
    },
    selectCachFun(ffindex, findex, index) {
      return value => {
        this.fenxi[ffindex].fenxidata[findex]["standard"][index] = value;
      };
    },
    onConfirm(value) {
      console.log("选择的数据", value);
      this.showFenxiSelect = false;
      this.fenxiCallBack(value);
    },
    initChecked() {
      for (let i = 0; i < 11; i++) {
        let obj = { checked: false };
        this.checked.push(obj);
      }
    },
    updataFenxi(ffindex, findex, index, name, value) {
      this.fenxi[ffindex].fenxidata[findex][name][index] = value;
      console.log("value", this.fenxi[ffindex].fenxidata[findex][name][index]);
      // this.$forceUpdate();
    },
    //  格式化 分析 把数据设置为 fenxiobj
    // fenxi// 分析标准// String// 必填// 字典数据，保存用逗号隔开
    // fenxidata// 第一行分析数据// String// 必填// 每个单元格数据用英文逗号隔开
    fenxiParse(data) {
      let { fenxidata, twofenxidata, threefenxidata, fenxiren } = data;
      let nulldata = ["", "", "", "", "", "", "", "", "", ""];
      // let img = fenxiren.split(',');
      if (fenxidata)
        this.fenxi[0] = this.setfenxiObj(
          fenxidata.split(",") || nulldata,
          fenxiren,
          data.updateDate
        );
      if (twofenxidata)
        this.fenxi[1] = this.setfenxiObj(
          twofenxidata.split(",") || nulldata,
          fenxiren,
          data.updateDate
        );
      if (threefenxidata)
        this.fenxi[2] = this.setfenxiObj(
          threefenxidata.split(",") || nulldata,
          fenxiren,
          data.updateDate
        );
    },
    //   反格式化 分析 把分析obj  设置成sendDate
    fenxiDeserialization(sendData) {
      let fenxi1 = [],
        fenxi2 = [],
        fenxi3 = [];
      let fenxiren = [];
      let fenxidata = []; // 第一行数据
      let twofenxidata = []; // 第二行数据
      let threefenxidata = []; // 第三行数据
      //  获取最外层的数据
      for (let i = 0; i < this.fenxi.length; i++) {
        fenxiren.push(this.fenxi[i].fenxiren);
        switch (i) {
          case 0:
            fenxi1 = this.fenxi[i].fenxidata;
            //  部位 加入最后一位
            fenxidata[9] = this.fenxi[i].fenxiParts;
            break;
          case 1:
            fenxi2 = this.fenxi[i].fenxidata;
            //  部位 加入最后一位
            twofenxidata[9] = this.fenxi[i].fenxiParts;
            break;
          case 2:
            fenxi3 = this.fenxi[i].fenxidata;
            //  部位 加入最后一位
            threefenxidata[9] = this.fenxi[i].fenxiParts;
            break;
        }
      }

      fenxi1.forEach(item => {
        switch (item.title) {
          case "有毒有害物质":
            fenxidata[0] = item.standard.one;
            fenxidata[1] = item.standard.two;
            fenxidata[2] = item.data.one;
            fenxidata[3] = item.data.two;
            break;
          case "可燃气":
            fenxidata[4] = item.standard.one;
            fenxidata[5] = item.standard.two;
            fenxidata[6] = item.data.one;
            fenxidata[7] = item.data.two;
            break;
          case "氧含量":
            fenxidata[8] = item.data.one;
            break;
        }
      });

      fenxi2.forEach(item => {
        switch (item.title) {
          case "有毒有害物质":
            twofenxidata[0] = item.standard.one;
            twofenxidata[1] = item.standard.two;
            twofenxidata[2] = item.data.one;
            twofenxidata[3] = item.data.two;
            break;
          case "可燃气":
            twofenxidata[4] = item.standard.one;
            twofenxidata[5] = item.standard.two;
            twofenxidata[6] = item.data.one;
            twofenxidata[7] = item.data.two;
            break;
          case "氧含量":
            twofenxidata[8] = item.data.one;
            break;
        }
      });
      fenxi3.forEach(item => {
        switch (item.title) {
          case "有毒有害物质":
            threefenxidata[0] = item.standard.one;
            threefenxidata[1] = item.standard.two;
            threefenxidata[2] = item.data.one;
            threefenxidata[3] = item.data.two;
            break;
          case "可燃气":
            threefenxidata[4] = item.standard.one;
            threefenxidata[5] = item.standard.two;
            threefenxidata[6] = item.data.one;
            threefenxidata[7] = item.data.two;
            break;
          case "氧含量":
            threefenxidata[8] = item.data.one;
            break;
        }
      });
      //  加入到发送数据
      sendData.threefenxidata = threefenxidata.join(",");
      sendData.twofenxidata = twofenxidata.join(",");
      sendData.fenxidata = fenxidata.join(",");
      sendData.fenxiren = fenxiren.join(",");
      return sendData;
    },
    setfenxiObj(data, fenxiren, fenxiTime) {
      let obj = {
        fenxidata: [
          {
            title: "有毒有害物质",
            standard: {
              one: data[0],
              two: data[1]
            },
            data: {
              one: data[2],
              two: data[3]
            }
          },
          {
            title: "可燃气",
            standard: {
              one: data[4],
              two: data[5]
            },
            data: {
              one: data[6],
              two: data[7]
            }
          },
          {
            title: "氧含量",
            standard: {
              one: "18%-23.5%"
            },
            data: {
              one: data[8]
            }
          }
        ],
        fenxiTime: fenxiTime || "", // 数据
        fenxiren: fenxiren || "", // 分析人
        fenxiParts: data[9], // 部位
      };
      return obj;
    },
    addFenxi() {
      // fenxi fenxidata fenxiren
      let fenxiObj = this.setfenxiObj(
        ["", "", "", "", "", "", "", "", "", ""],
        "",
        ""
      );
      if (this.fenxi.length < 3) {
        this.fenxi.push(fenxiObj);
        return;
      }
      this.$Toast.fail({
        message: "最多添加三个"
      });
    },
    selectChecked(index) {
      this.checked[index].checked = true;
    },
    // 取消签名
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.fenxiSignatureCallBack("");
    },
    // 保存画布
    saveCanvas(e) {
      this.signatureShow = false;
      this.fenxiSignatureCallBack(e);
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
      if (
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
      ) {
        return false;
      }
    },

    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.zyOtherspecial = this.stringData("zyOtherspecial", "list_1");
      sendData.zywhBs = this.stringData("zywhBs", "list_2");
      sendData.guardian = this.userString(sendData.guardian, "userCode");
      sendData.zyPrincipal = this.userString(sendData.zyPrincipal, "userCode");
      sendData.zyRen = this.userString(sendData.zyRen, "userCode");
      sendData.sxkjDanwei = this.userString(sendData.sxkjDanwei, "id");
      sendData.__sid = this.$userInfo.sessionId;
      console.log(sendData);
      // 判断数据是否为空

      //  储存 安装措施 aqcsjl zyjhcs 作业监护措施
      sendData.aqcsjl = [];
      sendData.zyjhcs = [
        this.fireCount, // 消防数量
        this.lifelineCount, // 救生绳
        this.gasCount // 气防装备;
      ];
      //  获得勾选记录
      this.checked.forEach((item, index) => {
        //  安全勾选记录
        if (item.checked) {
          sendData.aqcsjl.push(index + 1);
        }
        if (sendData.querenman === "" && item.checked) {
          sendData.querenman = this.signatureImg;
        }
      });
      sendData.aqcsjl = sendData.aqcsjl.join(",");
      sendData.zyjhcs = sendData.zyjhcs.join(",");
      // 分析数据 创建
      if (this.$route.query.id) {
        sendData.id = this.oldInfo.id;
        sendData.sxkjCode = this.oldInfo.sxkjCode;
        sendData.applyDept = this.oldInfo.office.officeCode;
        sendData.applyRen = this.oldInfo.user.userCode;
      }
      sendData = this.fenxiDeserialization(sendData);
      console.log("sendData", sendData);
      if (this.isEmpty(sendData) == false) {
        this.$notify("请将表单中的数据输入完整");
        return;
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
          console.log("info", info);
          this.actRuTask = res.list[0].actRuTask
            ? res.list[0].actRuTask.id
            : "";
          this.id = res.list[0].id;
          this.apply= {
              name: info.user.userName,
              code: info.sxkjCode,
              dept: info.office.officeName,
            }
          for (const key in this.sendData) {
            switch (key) {
              case "sxkjDanwei":
                  if (info[key]) this.sendData[key] = [{id:info.offices.id,name:info.offices.officeName,pId:'',title:info.offices.officeName}];
                  break;
              case "guardian":
                if (info[key])
                  this.sendData[key] = this.reductionSelectUserObj(
                    this.assemblyStrToUserObj(info.guardian, info.guardianCode)
                  );
                break;
              case "zyRen":
                if (info[key])
                  this.sendData[key] = this.reductionSelectUserObj(
                    this.assemblyStrToUserObj(info.zyRen, info.zyRencode)
                  );
                break;
              case "zyPrincipal":
                if (info[key])
                  this.sendData[key] = this.reductionSelectUserObj(
                    this.assemblyStrToUserObj(
                      info.zyPrincipal,
                      info.zyPrincipalCode
                    )
                  );
                break;
              case "querenman":
                if (info[key]) this.signatureImg = info[key];
                this.sendData[key] = info[key];
                break;
              // 安装措施
              case "aqcsjl":
                if (info[key])
                  info[key].split(",").forEach(item => {
                    this.selectChecked(item - 1);
                  });
                this.sendData[key] = info[key];
              // 作业监护措施
              case "zyjhcs":
                if (info[key])
                  info[key].split(",").forEach((item, index) => {
                    if (index === 0) this.fireCount = item;
                    if (index === 1) this.lifelineCount = item;
                    if (index === 2) this.gasCount = item;
                  });
                break;
              case "zyOtherspecial":
                if (info[key])
                  this.sendData[key] = this.reductionSelectTag(
                    info[key],
                    this.list_1
                  );
                break;
              case "zywhBs":
                if (info[key])
                  this.sendData[key] = this.reductionSelectTag(
                    info[key],
                    this.list_2
                  );
                break;
              default:
                this.sendData[key] = info[key];
                break;
            }
          }
          if (info.fenxiren) {
            this.fenxiParse(info);
          }
          this.$Toast.clear();
        })
        .catch(() => {
          this.$Toast.clear();
        });
    },
    initPage() {
      if (this.$route.query.id) {
        if (this.queryId !== this.$route.query.id) {
          this.queryId = this.$route.query.id;
          this.getPageData();
          if (this.fenxi.length === 0) {
            this.addFenxi();
          }
        }
      }
    }
  }
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
  background-color: #fff !important;
  border-bottom: 1px solid #e5e5e5;
}
.adddonghuofenxi .van-icon {
  font-size: 18px;
}
.kongjianFenxi {
  padding: 0 1.25rem;
  font-size: 0.875rem;
}
.kongjianFenxi-box {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: stretch;
  > div {
    text-align: left;
    padding: 2% 1%;
  }
}
.kongjianFenxi-title {
  width: 30%;
}
.kongjianFenxi-standard {
  width: 35%;
  > div {
    text-align: left;
    padding: 2% 1%;
  }
}
.kongjianFenxi-data {
  width: 35%;
  > div {
    text-align: left;
    padding: 2% 1%;
  }
}
.kongjianFenxiRen {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.9375rem 1.25rem;
  position: relative;
  font-size: 0.875rem;
  background-color: #ffff;
}
.redColor {
  color: #cf2323;
}
.kongjianFenxiRen-img {
  width: 4.0625rem;
  height: 2.0625rem;
  background: white;
}
// 1.25rem
</style>