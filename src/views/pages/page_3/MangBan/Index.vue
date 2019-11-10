<template>
  <div class="mangban">
    <van-nav-bar
      title="盲板抽堵安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <div class="header-cell">
      <!-- 申请部门 -->
      <cell-value title="申请部门" required :value="sendData.applyDept" class="readonly"></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" required :value="sendData.applyer" class="readonly"></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" value class="readonly"></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" class="readonly"></cell-value>
    </div>
    <div class="cell_group" v-for="(item, index) in sendData.pipe" :key="index">
      <!-- 管道序号 -->
      <cell-value :title="'管道' + (index + 1)" class="guandao-id"></cell-value>
      <!-- 设备管道名称 -->
      <div class="cell">
        <div class="cell_title">
          <span>设备管道名称</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" v-model="item.pipeName" />
        </div>
      </div>
      <!-- 介质 -->
      <div class="cell">
        <div class="cell_title">
          <span>介质</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" v-model="item.pipeMedium" />
        </div>
      </div>
      <!-- 温度 -->
      <div class="cell">
        <div class="cell_title">
          <span>温度</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" v-model="item.pipeTemp" />
        </div>
      </div>
      <!-- 压力 -->
      <div class="cell">
        <div class="cell_title">
          <span>压力</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" v-model="item.pipePressure" />
        </div>
      </div>
      <!-- 材质 -->
      <cell-picker
        title="材质"
        v-model="sendData.pipe[index].pipeMaterial"
        :columns="materialColumns"
      />
      <!-- 规格 -->
      <div class="cell">
        <div class="cell_title">
          <span>规格</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" v-model="item.pipeSpec" />
        </div>
      </div>
      <!-- 编号 -->
      <div class="cell">
        <div class="cell_title">
          <span>编号</span>
        </div>
        <div class="cell_input">
          <input type="text" placeholder="手工录入" v-model="item.pipeNumber" />
        </div>
      </div>
      <!-- 堵时间 -->
      <cell-time v-model="item.pipePullTime" title="堵时间" />
      <!-- 抽时间 -->
      <cell-time v-model="item.pipeBlockTime" title="抽时间" />
      <!-- 堵作业人 -->
      <cell-select-user
        title="堵作业人"
        :storeModule="storeModule"
        :storeKey="'pipeBlockOperator'+ index"
        v-model="sendData.pipe[index].pipeBlockOperator"
      />
      <!-- 抽作业人 -->
      <cell-select-user
        title="抽作业人"
        :storeModule="storeModule"
        :storeKey="'pipePullOperator'+ index"
        v-model="sendData.pipe[index].pipePullOperator"
      />
      <!-- 堵监护人 -->
      <cell-select-user
        title="堵监护人"
        :storeModule="storeModule"
        :storeKey="'pipeBlockGuardian'+ index"
        v-model="sendData.pipe[index].pipeBlockGuardian"
      />
      <!-- 抽监护人 -->
      <cell-select-user
        title="抽监护人"
        :storeModule="storeModule"
        :storeKey="'pipePullGuardian'+ index"
        v-model="sendData.pipe[index].pipePullGuardian"
      />

      <!-- 添加管道 -->
      <div class="add_device" v-if="index == sendData.pipe.length - 1">
        <div class="add_device_action" @click="addDevice">
          <van-icon name="add-o" color="#6096F8" />
        </div>
      </div>
    </div>
    <!-- 第二部分 -->
    <div class="cell_group">
      <!-- 生产部门作业负责人 -->
      <cell-select-user
        title="生产部门作业负责人"
        required
        :storeModule="storeModule"
        storeKey="scMan"
        v-model="sendData.scMan"
      ></cell-select-user>
      <!-- 作业部门负责人 -->
      <cell-select-user
        title="作业部门负责人"
        required
        :storeModule="storeModule"
        storeKey="zyMan"
        v-model="sendData.zyMan"
      ></cell-select-user>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="otherSpecial"
        :tagList="otherSpecial"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
    </div>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="new Date()"
        @cancel="onTimeCancel"
        @confirm="onTimeConfirm"
      />
    </van-popup>

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
          <span slot>在有毒介质的管道、设备上作业时,尽可能降低系统压力,作业点应为常压</span>
        </Signature>
        <Signature
          :checked="checked[1] ? checked[1].checked : false"
          :img="checked[1] ? checked[1].img : ''"
          @checked="showSignature(1)"
          @cancel="signatureCancel(1)"
        >
          <span slot>在有毒介质的管道、设备上作业时,作业人员穿戴适合的防护用具</span>
        </Signature>
        <Signature
          :checked="checked[2] ? checked[2].checked : false"
          :img="checked[2] ? checked[2].img : ''"
          @checked="showSignature(2)"
          @cancel="signatureCancel(2)"
        >
          <div slot>易燃易爆场所,作业人员穿防静电工作服、工作鞋;作业时使用防爆灯具和防爆工具</div>
        </Signature>
        <Signature
          :checked="checked[3] ? checked[3].checked : false"
          :img="checked[3] ? checked[3].img : ''"
          @checked="showSignature(3)"
          @cancel="signatureCancel(3)"
        >
          <div slot>易燃易爆场所,距作业地点30m 内无其他动火作业</div>
        </Signature>
        <Signature
          :checked="checked[4] ? checked[4].checked : false"
          :img="checked[4] ? checked[4].img : ''"
          @checked="showSignature(4)"
          @cancel="signatureCancel(4)"
        >
          <div slot>在强腐蚀性介质的管道、设备上作业时,作业人员已采取防止酸碱灼伤的措施</div>
        </Signature>
        <Signature
          :checked="checked[5] ? checked[5].checked : false"
          :img="checked[5] ? checked[5].img : ''"
          @checked="showSignature(5)"
          @cancel="signatureCancel(5)"
        >
          <div slot>介质温度较高、可能造成烫伤的情况下,作业人员已采取防烫措施</div>
        </Signature>
        <Signature
          :checked="checked[6] ? checked[6].checked : false"
          :img="checked[6] ? checked[6].img : ''"
          @checked="showSignature(6)"
          @cancel="signatureCancel(6)"
        >
          <div slot>同一管道上不同时进行两处及两处以上的盲板抽堵作业</div>
        </Signature>
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
    </div>

    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="postData">保存</button>
      <button>工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { business } from "../../../../mixin/business";
import { mapState } from "vuex";
import Canvas from "@/components/Canvas.vue";
import Signature from "../components/Signature.vue";
export default {
  name: "mangban",
  data() {
    return {
      storeModule: "mangban",
      materialShowShow: false,
      material: {
        index: 0,
        value: ""
      },
      materialColumns: ["碳钢", "不锈钢", "塑料", "聚四氟乙烯"],
      timeShow: false,
      currentDate: new Date(),
      list_1: [
        "登高",
        "动火",
        "临时用电",
        "盲板抽堵",
        "吊装",
        "动土",
        "断路作业"
      ],
      checked: [],
      isShowAction: false,
      sendData: {
        applyDept: this.$userInfo.officeName, // 申请部门
        applyer: this.$userInfo.userName, // 申请人
        scMan: "", // 生产部门作业负责人
        zyMan: "", // 作业部门负责人
        otherSpecial: [], //涉及其他特殊作业
        checkedArr: [], // 安全选择序号
        signatureImage: "", // 签名图片 - base64
        pipe: [
          {
            pipeName: "名称", // 设备管道名称
            pipeMedium: "介质", // 介质
            pipeTemp: "温度", // 温度
            pipePressure: "压力", // 压力
            pipeMaterial: "材质", // 材质
            pipeSpec: "规格", // 规格
            pipeNumber: "编号", // 编号
            pipePullTime: "", // 堵时间
            pipeBlockTime: "", // 抽时间
            pipeBlockOperator: "", // 堵作业人
            pipePullOperator: "", // 抽作业人
            pipeBlockGuardian: "", // 堵监护人
            pipePullGuardian: "" // 抽监护人
          }
        ],
        __sid: localStorage.getItem("JiaHuaSessionId")
      },
      checked: [{ checked: false, image: "" }],
      signatureShow: false
    };
  },
  computed: mapState({
    scMan: state => state.mangban.scMan,
    zyMan: state => state.mangban.zyMan,

    otherSpecial: state => state.mangban.otherSpecial,

    pipeBlockOperator1: state => state.mangban.pipeBlockOperator0,
    pipePullOperator1: state => state.mangban.pipePullOperator0,
    pipeBlockGuardian1: state => state.mangban.pipeBlockGuardian0,
    pipePullGuardian1: state => state.mangban.pipePullGuardian0,

    pipeBlockOperator2: state => state.mangban.pipeBlockOperator1,
    pipePullOperator2: state => state.mangban.pipePullOperator1,
    pipeBlockGuardian2: state => state.mangban.pipeBlockGuardian1,
    pipePullGuardian2: state => state.mangban.pipePullGuardian1,

    pipeBlockOperator3: state => state.mangban.pipeBlockOperator2,
    pipePullOperator3: state => state.mangban.pipePullOperator2,
    pipeBlockGuardian3: state => state.mangban.pipeBlockGuardian2,
    pipePullGuardian3: state => state.mangban.pipePullGuardian2,

    pipeBlockOperator4: state => state.mangban.pipeBlockOperator3,
    pipePullOperator4: state => state.mangban.pipePullOperator3,
    pipeBlockGuardian4: state => state.mangban.pipeBlockGuardian3,
    pipePullGuardian4: state => state.mangban.pipePullGuardian3
  }),
  components: {
    Canvas,
    Signature
  },
  mixins: [business],
  created() {},
  methods: {
    saveCanvas(e) {
      this.signatureShow = false;
      this.checked[this.selectSignatureShow] = {
        checked: false,
        img: ""
      };
      this.checked[this.selectSignatureShow].img = e;
      this.sendData.signatureImage = e;
      console.log("signatureShow: ");
    },
    cancelCanvas() {
      this.checked[this.selectSignatureShow].checked = false;
      this.checked[this.selectSignatureShow].img = "";
      this.signatureShow = false;
    },
    // 显示签名
    showSignature(index) {
      console.log("index: ", index);
      console.log("显示签名");
      this.selectSignatureShow = index;
      this.signatureShow = true;
      this.checkedArr.push(index);
    },
    // 取消签名
    signatureCancel(index) {
      console.log("index: ", index);
      console.log("取消");
      this.checked[index].checked = false;
      this.checked[index].img = "";
    },

    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },

    pageBack() {
      this.$router.back();
    },
    // 材质选择
    onMaterialConfirm(value, index) {
      this.materialShowShow = false;
      this.material = {
        index: index,
        value: value
      };
    },

    postData() {
      // console.log(this.sendData);
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let pipe = sendData.pipe;
      let dataStrArr = [];

      function formatMaterial(str) {
        if (str == `碳钢`) {
          return 1;
        }
        if (str == `不锈钢`) {
          return 2;
        }
        if (str == `塑料`) {
          return 3;
        }
        if (str == `聚四氟乙烯`) {
          return 4;
        }
      }

      for (let i = 0; i <= 3; i++) {
        console.log(i);
        if (pipe[i] == undefined) {
          dataStrArr[i] = `|||||||||||&|&`;
          continue;
        }
        console.log(888);
        // console.log(pipe[i].pipeBlockGuardian[0].userName)
        console.log(pipe[i].pipeMaterial);
        dataStrArr[i] = `${pipe[i].pipeName}|${pipe[i].pipeMedium}|${
          pipe[i].pipePressure
        }|${formatMaterial(pipe[i].pipeMaterial)}|${pipe[i].pipeSpec}|${
          pipe[i].pipeNumber
        }|${pipe[i].pipeBlockTime}|${pipe[i].pipePullTime}|${
          pipe[i].pipeBlockOperator[0].userName
        }|${pipe[i].pipePullOperator[0].userName}|${
          pipe[i].pipeBlockGuardian[0].userName
        }|${pipe[i].pipePullGuardian[0].userName}`;
      }
      let finSendData = {
        applyDept: sendData.applyDept,
        applyer: sendData.applyer,
        scMan: sendData.scMan,
        zyMan: sendData.zyMan,
        otherSpecial: sendData.otherSpecial,
        onePipe: dataStrArr[0],
        twoPipe: dataStrArr[1],
        threePipe: dataStrArr[2],
        fourPipe: dataStrArr[3],
        num: String(sendData.checkedArr),
        affirmRen: sendData.signatureImage,
        __sid: sendData.__sid
      };
      console.log(finSendData);

      this.$api.page_3.htHseMbzypSave(finSendData).then(res => {
        console.log(res);
      });
    },

    // 材质选择取消
    onMaterialCancel() {
      this.materialShowShow = false;
    },
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    },
    toSelect(index) {
      this.$router.push({
        path: "./select",
        query: {
          index: index,
          showList: this[`list_${index}`]
        }
      });
    },
    // 新增管道
    addDevice() {
      if (this.sendData.pipe.length < 4) {
        this.sendData.pipe.push({
          pipeName: "", // 设备管道名称
          pipeMedium: "", // 介质
          pipeTemp: "", // 温度
          pipePressure: "", // 压力
          pipeMaterial: "", // 材质
          pipeSpec: "", // 规格
          pipeNumber: "", // 编号
          pipePullTime: "", // 堵时间
          pipeBlockTime: "", // 抽时间
          pipeBlockOperator: "", // 堵作业人
          pipePullOperator: "", // 抽作业人
          pipeBlockGuardian: "", // 堵监护人
          pipePullGuardian: "" // 抽监护人
        });
      }
    }
  },
  watch: {
    zyMan(res) {
      this.sendData.zyMan = res;
    },
    scMan(res) {
      this.sendData.scMan = res;
    },

    otherSpecial(res) {
      this.sendData.otherSpecial = res;
    },

    pipeBlockOperator1(res) {
      this.sendData.pipe[0].pipeBlockOperator = res;
    },
    pipePullOperator1(res) {
      this.sendData.pipe[0].pipePullOperator = res;
    },
    pipeBlockGuardian1(res) {
      this.sendData.pipe[0].pipeBlockGuardian = res;
    },
    pipePullGuardian1(res) {
      this.sendData.pipe[0].pipePullGuardian = res;
    },

    pipeBlockOperator2(res) {
      this.sendData.pipe[1].pipeBlockOperator = res;
    },
    pipePullOperator2(res) {
      this.sendData.pipe[1].pipePullOperator = res;
    },
    pipeBlockGuardian2(res) {
      this.sendData.pipe[1].pipeBlockGuardian = res;
    },
    pipePullGuardian2(res) {
      this.sendData.pipe[1].pipePullGuardian = res;
    },

    pipeBlockOperator3(res) {
      this.sendData.pipe[2].pipeBlockOperator = res;
    },
    pipePullOperator3(res) {
      this.sendData.pipe[2].pipePullOperator = res;
    },
    pipeBlockGuardian3(res) {
      this.sendData.pipe[2].pipeBlockGuardian = res;
    },
    pipePullGuardian3(res) {
      this.sendData.pipe[2].pipePullGuardian = res;
    },

    pipeBlockOperator4(res) {
      this.sendData.pipe[3].pipeBlockOperator = res;
    },
    pipePullOperator4(res) {
      this.sendData.pipe[3].pipePullOperator = res;
    },
    pipeBlockGuardian4(res) {
      this.sendData.pipe[3].pipeBlockGuardian = res;
    },
    pipePullGuardian4(res) {
      this.sendData.pipe[3].pipePullGuardian = res;
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
}

.guandao-id {
  background-color: rgb(0, 142, 225) !important;
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

.cell {
  background-color: white;
}

.header-cell {
  margin-bottom: 30px;
}
</style>
