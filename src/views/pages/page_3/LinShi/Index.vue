<template>
  <div class="mangban">
    <van-sticky>
      <van-nav-bar
        title="临时用电"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
    </van-sticky>
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" value disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" disable></cell-value>
      <!-- 作业内容 -->
      <cell-textarea v-model="sendData.workContent" title="作业内容" required placeholder="请输入作业内容"></cell-textarea>
      <!-- 作业地点 -->
      <cell-input v-model="sendData.workLocation" title="作业地点" required placeholder="请输作业地点"></cell-input>
      <!-- 用电方式 -->
      <cell-picker v-model="sendData.powerType" title="用电方式" required :columns="powerTypeColumns"></cell-picker>
      <!-- 工作电压 -->
      <cell-picker
        v-model="sendData.jworkVoltage"
        title="用电方式"
        required
        :columns="jworkVoltageColumns"
      ></cell-picker>
      <!-- 公共区域 -->
      <cell-picker v-model="sendData.publicArea" title="公共区域" required :columns="publicAreaColumns"></cell-picker>
      <!-- 用电设备及功率 -->
      <cell-input v-model="sendData.devicePower" title="用电设备及功率" required placeholder="手工录入"></cell-input>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardIdentification"
        :tagList="hazardIdentification"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 用电开始时间 -->
      <cell-time v-model="sendData.powertimeStart" title="用电开始时间" required></cell-time>
      <!-- 用电结束时间 -->
      <cell-time v-model="sendData.powertimeEnd" title="用电结束时间" required></cell-time>
      <!-- 接线人 -->
      <cell-select-user
        title="接线人"
        required
        :storeModule="storeModule"
        storeKey="connectRen"
        v-model="sendData.connectRen"
      ></cell-select-user>
      <!-- 施工作业部门 -->
      <div class="cell">
        <div class="cell_title">
          <span>施工作业部门</span>
        </div>
        <div class="cell_value">
          <span>人名</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 施工现场负责人 -->
      <cell-select-user
        title="施工现场负责人"
        required
        :storeModule="storeModule"
        storeKey="workCharger"
        v-model="sendData.workCharger"
      ></cell-select-user>
      <!-- 作业人 -->
      <cell-select-user
        title="作业人"
        required
        :storeModule="storeModule"
        storeKey="workRen"
        v-model="sendData.workRen"
      ></cell-select-user>
      <!-- 电工证号 -->
      <cell-input v-model="sendData.licenseCode" title="电工证号" required placeholder="手工录入"></cell-input>
    </div>
    <van-action-sheet v-model="showPicker" :actions="actions" @select="onSelect" />
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="postData">保存</button>
      <button>工作流提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
export default {
  name: "linshi",
  mixins: [business],
  data() {
    return {
      storeModule: "linshi",
      sendData: {
        workContent: "", //作业内容
        workLocation: "", //作业地点
        powerType: "", //用电方式
        jworkVoltage: "", //工作电压
        publicArea: "", //公共区域
        devicePower: "", //用电设备及功率
        hazardIdentification: [], //危害辨识
        powertimeStart: "", //申请用电时间（起）
        powertimeEnd: "", //申请用电时间（止）
        connectRen: [], //接线人
        workCharger: [], //施工现场负责人
        workRen: [], //作业人
        licenseCode: "" //电工证号
      },
      powerTypeColumns: ["插座", "接线"], //用电方式
      jworkVoltageColumns: ["220V", "380V"], //用电方式
      publicAreaColumns: ["是", "否"], //公共区域
      list_1: [
        "火灾",
        "爆炸",
        "中毒",
        "窒息",
        "烫伤",
        "灼伤",
        "高处坠落",
        "触电"
      ],
      showPicker: false,
      actions: [
        { name: "保存", index: 0 },
        { name: "工作流提交", index: 1 },
        { name: "取消", index: 2 }
      ],
      isShowAction: false
    };
  },
  computed: mapState({
    hazardIdentification: state => state.linshi.hazardIdentification,
    connectRen: state => state.linshi.connectRen,
    workCharger: state => state.linshi.workCharger,
    workRen: state => state.linshi.workRen
  }),
  created() {
    console.log(this.$route.query);
    // 获取显示List序列
    this.id = this.$route.query.id || "";
    // 设置显示List
    this.status = this.$route.query.status || 0;
    console.log("this.id: ", this.id);
    if (this.id) {
      this.getData();
    }
  },
  beforeDestroy() {
    this.$store.dispatch("linshi/cleanState");
    this.$destroy("LinShi");
  },
  methods: {
    /**
     * 获取工作票内容
     */
    getData() {
      console.log("获取工作票内容");
      let sendData = {};
      sendData.id = this.id;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseLsydzypListData(sendData)
        .then(res => {
          console.log("res: ", res);
          this.pageList = res.list;
        })
        .catch(() => {});
    },
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.hazardIdentification = this.stringData(
        "hazardIdentification",
        "list_1"
      );
      sendData.connectRen = this.userString(sendData.connectRen, "userName");
      sendData.workCharger = this.userString(sendData.workCharger, "userName");
      sendData.workRen = this.userString(sendData.workRen, "userName");
      sendData.apprDept = this.$userInfo.officeName;
      sendData.apprRen = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseLsydzypSave(sendData)
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
    onSelect(item) {
      this.showPicker = false;
      if (item.index === 0) {
        this.Next();
      }
    },
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    }
  },
  watch: {
    hazardIdentification(res) {
      this.sendData.hazardIdentification = res;
    },
    connectRen(res) {
      this.sendData.connectRen = res;
    },
    workCharger(res) {
      this.sendData.workCharger = res;
    },
    workRen(res) {
      this.sendData.workRen = res;
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
