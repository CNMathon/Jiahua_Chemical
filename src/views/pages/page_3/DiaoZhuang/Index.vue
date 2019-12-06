<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        title="吊装安全"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="showPicker = true"
      />
    </van-sticky>
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" :value="sendData.sqbm || $userInfo.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" :value="sendData.sqr || $userInfo.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="sendData.zypcode" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" disable></cell-value>
      <!-- 吊装内容 -->
      <cell-textarea v-model="sendData.dznr" title="吊装内容" required placeholder="请输入吊装内容"></cell-textarea>
      <!-- 吊装地点 -->
      <cell-input v-model="sendData.dzdd" title="吊装地点" required placeholder="手工录入"></cell-input>
      <!-- 吊装工具名称 -->
      <cell-picker v-model="sendData.dzgjmc" title="吊装工具名称" required :columns="dzgjmcColumns"></cell-picker>
      <!-- 起吊重物重量（t） -->
      <cell-input v-model="sendData.qdzwzl" title="起吊重物重量（t）" required placeholder="手工录入"></cell-input>
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
            <div class="cell_input" @click="selectUser('work_permit_1')">
              <span>{{ work_permit_1.name || "点击选择" }}</span>
              <van-icon name="plus" />
            </div>
            <!-- <div class="cell_input" @click="selectUser('work_permit_2')">
							<span>{{ work_permit_2.name || "点击选择第二个" }}</span>
							<van-icon name="plus" />
            </div> -->
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
        <div class="cell_value" @click="selectUser('work_permit_3')">
          <span>{{ sendData.dzzhjtsgzzyzh || work_permit_3.name || "点击选择" }}</span>
          <span class="cell_value_arrow">
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="whsb"
        :tagList="whsb"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time title="作业开始时间" v-model="sendData.zyksDate" :maxTime="sendData.zyjsDate" required></cell-time>
      <!-- 作业结束时间 -->
      <cell-time title="作业结束时间" v-model="sendData.zyjsDate" :minTime="sendData.zyksDate" required></cell-time>
      <!-- 作业负责人 -->
      <select-organization
        title="作业负责人"
        radio
        :value="sendData.zyfzr"
        required
        :storeModule="storeModule"
        storeKey="zyfzr"
        v-model="sendData.zyfzr"
      ></select-organization>
      <!--作业单位 -->
      <cell-select-department
        title="作业单位"
        required
        radio
        :storeModule="storeModule"
        storeKey="zydw"
        :value="sendData.zydw"
        v-model="sendData.zydw"
      ></cell-select-department>
      <!-- 监护人 -->
      <select-organization
        title="负责人"
        :max="2"
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
            :checked="checked[0] ? checked[0].checked : false"
            :img="checked[0] ? checked[0].img : ''"
            @checked="showSignature(0)"
            @cancel="signatureCancel(0)"
          >
            <div
              slot
            >吊装质量大于等于40t的重物和土建工程主体结构;吊装物体虽不足40t,但形状复杂、刚度小、长径比大、精密贵重,作业条件特殊,已编制吊装作业方案,且经作业主管部门和安全管理部门审查,报主管(主管安全生产副总/总工程师批准)</div>
          </Signature>
          <Signature
            :checked="checked[1] ? checked[1].checked : false"
            :img="checked[1] ? checked[1].img : ''"
            @checked="showSignature(1)"
            @cancel="signatureCancel(1)"
          >
            <div slot>指派专人监护,并监守岗位,非作业人员禁止入内</div>
          </Signature>
          <Signature
            :checked="checked[2] ? checked[2].checked : false"
            :img="checked[2] ? checked[2].img : ''"
            @checked="showSignature(2)"
            @cancel="signatureCancel(2)"
          >
            <div slot>作业人员已按规定佩戴防护器具和个体防护用品</div>
          </Signature>
          <Signature
            :checked="checked[3] ? checked[3].checked : false"
            :img="checked[3] ? checked[3].img : ''"
            @checked="showSignature(3)"
            @cancel="signatureCancel(3)"
          >
            <div slot>已与分厂(车间)负责人取得联系,建立联系信号</div>
          </Signature>
          <Signature
            :checked="checked[4] ? checked[4].checked : false"
            :img="checked[4] ? checked[4].img : ''"
            @checked="showSignature(4)"
            @cancel="signatureCancel(4)"
          >
            <div slot>已在吊装现场设置安全警戒标志,无关人员不许进入作业现场；</div>
          </Signature>
          <Signature
            :checked="checked[5] ? checked[5].checked : false"
            :img="checked[5] ? checked[5].img : ''"
            @checked="showSignature(5)"
            @cancel="signatureCancel(5)"
          >
            <div slot>室外作业遇到(大雪/暴雨/大雾/六级以上大风),已停止作业</div>
          </Signature>
          <Signature
            :checked="checked[6] ? checked[6].checked : false"
            :img="checked[6] ? checked[6].img : ''"
            @checked="showSignature(6)"
            @cancel="signatureCancel(6)"
          >
            <div slot>检查起重吊装设备、钢丝绳、揽风绳、链条、吊钩等各种机具,保证安全可靠</div>
          </Signature>
          <Signature
            :checked="checked[7] ? checked[7].checked : false"
            :img="checked[7] ? checked[7].img : ''"
            @checked="showSignature(7)"
            @cancel="signatureCancel(7)"
          >
            <div slot>明确分工、坚守岗位,并按规定的联络信号,统一指挥</div>
          </Signature>
          <Signature
            :checked="checked[8] ? checked[8].checked : false"
            :img="checked[8] ? checked[8].img : ''"
            @checked="showSignature(8)"
            @cancel="signatureCancel(8)"
          >
            <div slot>将建筑物、构筑物作为锚点,需经土建工程部门审查核算并批准</div>
          </Signature>
          <Signature
            :checked="checked[9] ? checked[9].checked : false"
            :img="checked[9] ? checked[9].img : ''"
            @checked="showSignature(9)"
            @cancel="signatureCancel(9)"
          >
            <div slot>吊装绳索、揽风绳、拖拉绳等避免同带电线路接触,并保持安全距离</div>
          </Signature>
          <Signature
            :checked="checked[10] ? checked[10].checked : false"
            :img="checked[10] ? checked[10].img : ''"
            @checked="showSignature(10)"
            @cancel="signatureCancel(10)"
          >
            <div slot>人员随同吊装重物或吊装机械升降,应采取可靠的安全措施,并经过现场指挥人员批准</div>
          </Signature>
          <Signature
            :checked="checked[11] ? checked[11].checked : false"
            :img="checked[11] ? checked[11].img : ''"
            @checked="showSignature(11)"
            @cancel="signatureCancel(11)"
          >
            <div slot>利用管道、管架、电杆、机电设备等作吊装锚点,不准吊装</div>
          </Signature>
          <Signature
            :checked="checked[12] ? checked[12].checked : false"
            :img="checked[12] ? checked[12].img : ''"
            @checked="showSignature(12)"
            @cancel="signatureCancel(12)"
          >
            <div slot>悬吊重物下方站人、通行和工作,不准吊装</div>
          </Signature>
          <Signature
            :checked="checked[13] ? checked[13].checked : false"
            :img="checked[13] ? checked[13].img : ''"
            @checked="showSignature(13)"
            @cancel="signatureCancel(13)"
          >
            <div slot>超负荷或重物质量不明,不准吊装</div>
          </Signature>
          <Signature
            :checked="checked[14] ? checked[14].checked : false"
            :img="checked[14] ? checked[14].img : ''"
            @checked="showSignature(14)"
            @cancel="signatureCancel(14)"
          >
            <div slot>斜拉重物、重物埋在地下或重物坚固不牢,绳打结、绳不齐,不准吊装</div>
          </Signature>
          <Signature
            :checked="checked[15] ? checked[15].checked : false"
            :img="checked[15] ? checked[15].img : ''"
            @checked="showSignature(15)"
            @cancel="signatureCancel(15)"
          >
            <div slot>棱角重物没有衬垫措施,不准吊装</div>
          </Signature>
          <Signature
            :checked="checked[16] ? checked[16].checked : false"
            :img="checked[16] ? checked[16].img : ''"
            @checked="showSignature(16)"
            @cancel="signatureCancel(16)"
          >
            <div slot>安全装置失灵,不准吊装</div>
          </Signature>
          <Signature
            :checked="checked[17] ? checked[17].checked : false"
            :img="checked[17] ? checked[17].img : ''"
            @checked="showSignature(17)"
            @cancel="signatureCancel(17)"
          >
            <div slot>用定型起重吊装机械(履带、轮胎、轿式吊车等)进行吊装作业,遵守该定型机械的操作规程</div>
          </Signature>
          <Signature
            :checked="checked[18] ? checked[18].checked : false"
            :img="checked[18] ? checked[18].img : ''"
            @checked="showSignature(18)"
            @cancel="signatureCancel(18)"
          >
            <div slot>作业现场出现危险品泄漏,立即停止作业,撤离人员</div>
          </Signature>
          <Signature
            :checked="checked[19] ? checked[19].checked : false"
            :img="checked[19] ? checked[19].img : ''"
            @checked="showSignature(19)"
            @cancel="signatureCancel(19)"
          >
            <div slot>作业完成后现场杂物已清理</div>
          </Signature>
          <Signature
            :checked="checked[20] ? checked[20].checked : false"
            :img="checked[20] ? checked[20].img : ''"
            @checked="showSignature(20)"
            @cancel="signatureCancel(20)"
          >
            <div slot>吊装作业人员持有法定的有效的证件</div>
          </Signature>
          <Signature
            :checked="checked[21] ? checked[21].checked : false"
            :img="checked[21] ? checked[21].img : ''"
            @checked="showSignature(21)"
            @cancel="signatureCancel(21)"
          >
            <div slot>地下通讯、网络电(光)缆、排水沟盖板,承重吊装机械的负重量已确认,保护措施已落实</div>
          </Signature>
          <Signature
            :checked="checked[22] ? checked[22].checked : false"
            :img="checked[22] ? checked[22].img : ''"
            @checked="showSignature(22)"
            @cancel="signatureCancel(22)"
          >
            <div slot>
              起吊物的质量
              <van-stepper v-model="value" />吨经确认,在吊装机械的承重范围；
            </div>
          </Signature>
          <Signature
            :checked="checked[23] ? checked[23].checked : false"
            :img="checked[23] ? checked[23].img : ''"
            @checked="showSignature(23)"
            @cancel="signatureCancel(23)"
          >
            <div slot>在吊装高度的管线、电缆桥架已做好防护措施</div>
          </Signature>
          <Signature
            :checked="checked[24] ? checked[24].checked : false"
            :img="checked[24] ? checked[24].img : ''"
            @checked="showSignature(24)"
            @cancel="signatureCancel(24)"
          >
            <div slot>作业现场围栏、警戒线、警告牌、夜间警示灯已按要求设置</div>
          </Signature>
          <Signature
            :checked="checked[25] ? checked[25].checked : false"
            :img="checked[25] ? checked[25].img : ''"
            @checked="showSignature(25)"
            @cancel="signatureCancel(25)"
          >
            <div slot>吊装作业人员持有法定的有效的证件</div>
          </Signature>
          <Signature
            :checked="checked[26] ? checked[26].checked : false"
            :img="checked[26] ? checked[26].img : ''"
            @checked="showSignature(26)"
            @cancel="signatureCancel(26)"
          >
            <div slot>作业高度和转臂范围内,无架空线路</div>
          </Signature>
          <Signature
            :checked="checked[27] ? checked[27].checked : false"
            :img="checked[27] ? checked[27].img : ''"
            @checked="showSignature(27)"
            @cancel="signatureCancel(27)"
          >
            <span>
              人员出入口和撤离安全措施已落实:
              <span
                :class="mask[0] == 1 ? 'seclct_tag is_select':'seclct_tag'"
                @click="changeMask(0)"
              >指示牌</span>
              <span
                :class="mask[1] == 1 ? 'seclct_tag is_select':'seclct_tag'"
                @click="changeMask(1)"
              >指示灯</span>
            </span>
          </Signature>
          <Signature
            :checked="checked[28] ? checked[28].checked : false"
            :img="checked[28] ? checked[28].img : ''"
            @checked="showSignature(28)"
            @cancel="signatureCancel(28)"
          >
            <div slot>
              <span>夜间作业采用足够、充足照明，</span>
              <span>
                A防水型灯:
                <span
                  :class="Alight == 0? 'seclct_tag is_select': 'seclct_tag'"
                  @click="Alight = 0"
                >36V</span>
                <span
                  :class="Alight == 1? 'seclct_tag is_select': 'seclct_tag'"
                  @click="Alight = 1"
                >24V</span>
                <span
                  :class="Alight == 2? 'seclct_tag is_select': 'seclct_tag'"
                  @click="Alight = 2"
                >12V</span>
              </span>
              <span>
                防爆型灯:
                <span
                  :class="light == 0? 'seclct_tag is_select': 'seclct_tag'"
                  @click="light = 0"
                >36V</span>
                <span
                  :class="light == 1? 'seclct_tag is_select': 'seclct_tag'"
                  @click="light = 1"
                >24V</span>
                <span
                  :class="light == 2? 'seclct_tag is_select': 'seclct_tag'"
                  @click="light = 2"
                >12V</span>
              </span>
            </div>
          </Signature>
          <Signature
            :checked="checked[29] ? checked[29].checked : false"
            :img="checked[29] ? checked[29].img : ''"
            @checked="showSignature(29)"
            @cancel="signatureCancel(29)"
          >
            <div slot>作业人员已佩戴防护器具</div>
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

    <!-- 操作Popup -->
    <van-popup v-model="showPicker" position="bottom" class="action">
      <button @click="postData">保存</button>
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
      oldInfo: {},
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
        jhrCode: []
      },
      Alight: 0,
      light: 0,
      mask: [0, 1],
      value: 5,
      materialShowShow: false,
      material: {
        index: 0,
        value: ""
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
          img: ""
        }
      ],
      selectSignatureShow: 0, //当前确认选中
      signatureShow: false,
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
      ]
    };
  },
  computed: mapState({
    whsb: state => state.diaozhuang.whsb,
    zyfzr: state => state.diaozhuang.zyfzr,
    jhr: state => state.diaozhuang.jhr,
    zydw: state => state.diaozhuang.zydw,
    work_permit_1: state => state.diaozhuang.work_permit_1,
    work_permit_2: state => state.diaozhuang.work_permit_2,
    work_permit_3: state => state.diaozhuang.work_permit_3
  }),
  beforeDestroy() {
  	this.$store.dispatch("diaozhuang/cleanState");
  },
  created() {
    this.initPage();
  },
  activated(){
    this.initPage();
  },
  methods: {
    ...mapMutations("diaozhuang", {
      setTag: "setTag"
    }),
    initPage() {
      console.log(666)
	  if (this.$route.query.zypcode) {
          if (this.zypcode !== this.$route.query.zypcode) {
            this.zypcode = this.$route.query.zypcode || "0";
           this.getInfo()
           console.log(2222222222222)
          }
		}
      this.initChecked();
    },
    clearData() {
      console.log(222222222222222222222222)
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
        jhr: [], //监护人
        zydw: [] //作业单位
      };
    },
    initChecked() {
      if (this.checked.length >= 30) {
        return
      }
      for (let i = 0; i < 30; i++) {
        let obj = {
          checked: false
        };
        this.checked.push(obj);
      }
    },
    Next() {
      if (!this.$route.query.zypcode) {
        this.$notify("请先提交保存");
        return;
      } else {
        this.$Toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        this.$api.page_3
          .htHseDzzypList({
            zypcode: this.zypcode,
            __sid: localStorage.getItem("JiaHuaSessionId")
          })
          .then(res => {
            this.$Toast.clear();
            if (res.list[0].actRuTask) {
              let data = {
                id: res.list[0].id,
                flowKey: "htHseDzzypService",
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
                        type: "htHseDzzypService"
                      }
                    });
                  } else {
                    this.$router.replace({
                      name: "diaozhuang_list"
                    });
                  }
                })
                .catch(() => this.$Toast.clear());
            } else {
              console.log(2);
              let data = {
                id: res.list[0].id,
                flowKey: "htHseDzzypService",
                __sid: localStorage.getItem("JiaHuaSessionId")
              };
              this.$api.page_3
                .start("dzzy/htHseDzzyp", data)
                .then(ress => {
                  console.log(ress);
                  if (ress.groups) {
                    this.$router.push({
                      name: "daibanren",
                      query: {
                        groups: ress.groups.join(","),
                        taskId: ress.taskId,
                        id: res.list[0].id,
                        type: "htHseDzzypService"
                      }
                    });
                  } else {
                    this.$router.replace({
                      name: "diaozhuang_list"
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
    //获取签名信息
    qianming(id) {
      console.log(888)
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
         console.log("吊装子表 this.checked", this.checked);
      });
    },
    //获取详情
    getInfo() {
      this.$Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      let sendData = {};
      sendData.__sid = this.$userInfo.sessionId;
      sendData.zypcode = this.zypcode;
      this.$api.page_3
        .htHseDzzypList(sendData)
        .then(res => {
          this.$Toast.clear();
		     console.log('获得吊装信息 res============', res);
          const info = res.list[0];
          this.oldInfo = info;
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
            this.assemblyStrToUserObj(info.zyfzr|| '', info.zyfzrCode|| '')
      );
          this.sendData.jhr = this.reductionSelectUserObj(
            this.assemblyStrToUserObj(info.jhr|| '', info.jhrCode|| '')
          );
          let whsb = [];
          info.whsb.split(",").map(items => {whsb.push(this.list_1[items - 1]);});
          this.setTag({tags: {key: "whsb",value: whsb}});
          //  
          this.qianming(info.id);
        })
        .catch(() => {
          console.log('报错');
          this.$Toast.clear();
        });
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
      // console.log("index: ", index);
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
    setHtHseDzzyp(messageId) {
       console.log('this.checked=============', this.checked);
      let sendSafeData =[
          {
            dzzypId: messageId,
            xuhao: 1,
            id:this.checked[0].id?this.checked[0].id:'',
            aqcsnr: `吊装质量大于等于40t的重物和土建工程主体结构;吊装物体虽不足40t,但形状复杂、刚度小、长径比大、精密贵重,作业条件特殊,已编制吊装作业方案,且经作业主管部门和安全管理部门审查,报主管(主管安全生产副总/总工程师批准)`,
            qrr: this.checked[0].img ? this.checked[0].img : '',
            qrzt: this.checked[0].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 2,
            id:this.checked[1].id?this.checked[1].id:'',
            aqcsnr: `指派专人监护,并监守岗位,非作业人员禁止入内`,
            qrr: this.checked[1].img ? this.checked[1].img : '',
            qrzt: this.checked[1].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 3,
            id:this.checked[2].id?this.checked[2].id:'',
            aqcsnr: `作业人员已按规定佩戴防护器具和个体防护用品`,
            qrr: this.checked[2].img ? this.checked[2].img : '',
            qrzt: this.checked[2].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 4,
            id:this.checked[3].id?this.checked[3].id:'',
            aqcsnr: `已与分厂(车间)负责人取得联系,建立联系信号`,
            qrr: this.checked[3].img ? this.checked[3].img : '',
            qrzt: this.checked[3].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 5,
            id:this.checked[4].id?this.checked[4].id:'',
            aqcsnr: `已在吊装现场设置安全警戒标志,无关人员不许进入作业现场； `,
            qrr: this.checked[4].img ? this.checked[4].img : '',
            qrzt: this.checked[4].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 6,
            id:this.checked[5].id?this.checked[5].id:'',
            aqcsnr: `室外作业遇到(大雪/暴雨/大雾/六级以上大风),已停止作业`,
            qrr: this.checked[5].img ? this.checked[5].img : '',
            qrzt: this.checked[5].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 7,
            id:this.checked[6].id?this.checked[6].id:'',
            aqcsnr: `检查起重吊装设备、钢丝绳、揽风绳、链条、吊钩等各种机具,保证安全可靠`,
            qrr: this.checked[6].img ? this.checked[6].img : '',
            qrzt: this.checked[6].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 8,
            id:this.checked[7].id?this.checked[7].id:'',
            aqcsnr: `明确分工、坚守岗位,并按规定的联络信号,统一指挥`,
            qrr: this.checked[7].img ? this.checked[7].img : '',
            qrzt: this.checked[7].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 9,
            id:this.checked[8].id?this.checked[8].id:'',
            aqcsnr: `将建筑物、构筑物作为锚点,需经土建工程部门审查核算并批准`,
            qrr: this.checked[8].img ? this.checked[8].img : '',
            qrzt: this.checked[8].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 10,
            id:this.checked[9].id?this.checked[9].id:'',
            aqcsnr: `吊装绳索、揽风绳、拖拉绳等避免同带电线路接触,并保持安全距离`,
            qrr: this.checked[9].img ? this.checked[9].img : '',
            qrzt: this.checked[9].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 11,
            id:this.checked[10].id?this.checked[10].id:'',
            aqcsnr: `人员随同吊装重物或吊装机械升降,应采取可靠的安全措施,并经过现场指挥人员批准`,
            qrr: this.checked[10].img ? this.checked[10].img : '',
            qrzt: this.checked[10].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 12,
            id:this.checked[11].id?this.checked[11].id:'',
            aqcsnr: `利用管道、管架、电杆、机电设备等作吊装锚点,不准吊装`,
            qrr: this.checked[11].img ? this.checked[11].img : '',
            qrzt: this.checked[11].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 13,
            id:this.checked[12].id?this.checked[12].id:'',
            aqcsnr: `悬吊重物下方站人、通行和工作,不准吊装`,
            qrr: this.checked[12].img ? this.checked[12].img : '',
            qrzt: this.checked[12].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 14,
            id:this.checked[13].id?this.checked[13].id:'',
            aqcsnr: `超负荷或重物质量不明,不准吊装`,
            qrr: this.checked[13].img ? this.checked[13].img : '',
            qrzt: this.checked[13].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 15,
            id:this.checked[14].id?this.checked[14].id:'',
            aqcsnr: `斜拉重物、重物埋在地下或重物坚固不牢,绳打结、绳不齐,不准吊装`,
            qrr: this.checked[14].img ? this.checked[14].img : '',
            qrzt: this.checked[14].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 16,
            id:this.checked[15].id?this.checked[15].id:'',
            aqcsnr: `棱角重物没有衬垫措施,不准吊装`,
            qrr: this.checked[15].img ? this.checked[15].img : '',
            qrzt: this.checked[15].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 17,
            id:this.checked[16].id?this.checked[16].id:'',
            aqcsnr: `安全装置失灵,不准吊装`,
            qrr: this.checked[16].img ? this.checked[16].img : '',
            qrzt: this.checked[16].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 18,
            id:this.checked[17].id?this.checked[17].id:'',
            aqcsnr: `用定型起重吊装机械(履带、轮胎、轿式吊车等)进行吊装作业,遵守该定型机械的操作规程`,
            qrr: this.checked[17].img ? this.checked[17].img : '',
            qrzt: this.checked[17].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 19,
            id:this.checked[18].id?this.checked[18].id:'',
            aqcsnr: `作业现场出现危险品泄漏,立即停止作业,撤离人员`,
            qrr: this.checked[18].img ? this.checked[18].img : '',
            qrzt: this.checked[18].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 20,
            id:this.checked[19].id?this.checked[19].id:'',
            aqcsnr: `作业完成后现场杂物已清理`,
            qrr: this.checked[19].img ? this.checked[19].img : '',
            qrzt: this.checked[19].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 21,
            id:this.checked[20].id?this.checked[20].id:'',
            aqcsnr: `吊装作业人员持有法定的有效的证件`,
            qrr: this.checked[20].img ? this.checked[20].img : '',
            qrzt: this.checked[20].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 22,
            id:this.checked[21].id?this.checked[21].id:'',
            aqcsnr: `地下通讯、网络电(光)缆、排水沟盖板,承重吊装机械的负重量已确认,保护措施已落实`,
            qrr: this.checked[21].img ? this.checked[21].img : '',
            qrzt: this.checked[21].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 23,
            id:this.checked[22].id?this.checked[22].id:'',
            aqcsnr: `起吊物的质量${this.value}吨经确认,在吊装机械的承重范围`,
            qrr: this.checked[22].img ? this.checked[22].img : '',
            qrzt: this.checked[22].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 24,
            id:this.checked[23].id?this.checked[23].id:'',
            aqcsnr: `在吊装高度的管线、电缆桥架已做好防护措施`,
            qrr: this.checked[23].img ? this.checked[23].img : '',
            qrzt: this.checked[23].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 25,
            id:this.checked[24].id?this.checked[24].id:'',
            aqcsnr: `作业现场围栏、警戒线、警告牌、夜间警示灯已按要求设置`,
            qrr: this.checked[24].img ? this.checked[24].img : '',
            qrzt: this.checked[24].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 26,
            id:this.checked[25].id?this.checked[25].id:'',
            aqcsnr: `吊装作业人员持有法定的有效的证件`,
            qrr: this.checked[25].img ? this.checked[25].img : '',
            qrzt: this.checked[25].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 27,
            id:this.checked[26].id?this.checked[26].id:'',
            aqcsnr: `作业高度和转臂范围内,无架空线路`,
            qrr: this.checked[26].img ? this.checked[26].img : '',
            qrzt: this.checked[26].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 28,
            id:this.checked[27].id?this.checked[27].id:'',
            aqcsnr: `人员出入口和撤离安全措施已落实:  ${
              this.mask[0] == 1 ? "指示牌" : ""
            }, ${this.mask[1] == 1 ? "指示灯" : ""}`,
            qrr: this.checked[27].img ? this.checked[27].img : '',
            qrzt: this.checked[27].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 29,
            id:this.checked[28].id?this.checked[28].id:'',
            aqcsnr: `夜间作业采用足够、充足照明，A防水型灯${
              this.Alight == 0 ? "36V" : this.Alight == 1 ? "24V" : "12V"
            }, 防爆型灯:  ${
              this.light == 0 ? "36V" : this.light == 1 ? "24V" : "12V"
            }`,
            qrr: this.checked[28].img ? this.checked[28].img : '',
            qrzt: this.checked[28].checked ? 1 : 0
          },
          {
            dzzypId: messageId,
            xuhao: 30,
            id:this.checked[29].id?this.checked[29].id:'',
            aqcsnr: `作业人员已佩戴防护器具`,
            qrr: this.checked[29].img ? this.checked[29].img : '',
            qrzt: this.checked[29].checked ? 1 : 0
          }
        ]
        console.log('sendSafeData=============', sendSafeData);
      return sendSafeData;
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
          this.$Toast.success({
            message: "提交成功"
          });
          this.setHtHseDzzyp(res.message)
          this.saveChilderList(this.setHtHseDzzyp(res.message), sendData.__sid);
        })
        .catch(err => {
          console.log("报错了err", err);
          new Error(err);
        });
    },
    // 
    saveChilderList(data, id) {
      this.$api.page_3.htHseDzzypSaveLit(data, id).then(res => {
        console.log("子表保存成功: ", res);
        this.pageBack();
      });
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
      console.log('zyfzr',res)
      this.sendData.zyfzr = res;
    },
    jhr(res) {
      this.sendData.jhr = res;
    },
    zydw(res) {
      console.log('zydw',res)
      this.sendData.zydw = res;
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
</style>
