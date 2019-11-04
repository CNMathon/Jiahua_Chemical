<template>
  <div class="mangban">
    <van-nav-bar
      title="高处安全"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value
        title="申请部门"
        required
        :value="$userInfo.officeName"
      ></cell-value>
      <!-- 申请人 -->
      <cell-value
        title="申请人"
        required
        :value="$userInfo.userName"
      ></cell-value>
      <!-- 作业内容 -->
      <cell-textarea
        title="作业内容"
        required
        v-model="sendData.workContent"
        placeholder="请输入工作内容"
      ></cell-textarea>
      <!-- 作业地点 -->
      <cell-input
        title="作业地点"
        required
        v-model="sendData.workAddress"
        placeholder="手工录入"
      ></cell-input>
      <!-- 作业高度 -->
      <cell-picker
        title="作业高度"
        required
        v-model="sendData.workHeight"
        :columns="workHeightColumns"
      ></cell-picker>
      <!-- 登高类别 -->
      <cell-picker
        title="登高类别"
        required
        v-model="sendData.heightType"
        :columns="heightTypeColumns"
      ></cell-picker>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="specialWork"
        :tagList="specialWork"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="harmAnalise"
        :tagList="harmAnalise"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 作业开始时间 -->
      <cell-time
        v-model="sendData.startTime"
        title="作业开始时间"
        required
      ></cell-time>
      <!-- 作业结束时间 -->
      <cell-time
        v-model="sendData.endTime"
        title="作业结束时间"
        required
      ></cell-time>
      <!-- 作业部门负责人 -->
      <cell-select-user
        title="作业部门负责人"
        required
        :storeModule="storeModule"
        storeKey="workDeptLeader"
        v-model="sendData.workDeptLeader"
      ></cell-select-user>
      <!-- 监护人 -->
      <cell-select-user
        title="监护人"
        required
        :storeModule="storeModule"
        storeKey="guarder"
        v-model="sendData.guarder"
      ></cell-select-user>
      <!-- 作业人 -->
      <cell-select-user
        title="作业人"
        required
        :storeModule="storeModule"
        storeKey="worker"
        v-model="sendData.worker"
      ></cell-select-user>
    </div>
    <div class="next" @click="Next">下一步</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "../../../../mixin/business";
export default {
  name: "gaochu",
  mixins: [business],
  data() {
    return {
      storeModule: "gaochu",
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
      ]
    };
  },
  computed: mapState({
    specialWork: state => state.gaochu.specialWork,
    harmAnalise: state => state.gaochu.harmAnalise,
    guarder: state => state.gaochu.guarder,
    workDeptLeader: state => state.gaochu.workDeptLeader,
    worker: state => state.gaochu.worker
  }),
  beforeDestroy() {
    this.$store.dispatch("gaochu/cleanState");
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.specialWork = this.stringData("specialWork", "list_1");
      sendData.harmAnalise = this.stringData("harmAnalise", "list_2");
      sendData.guarder = this.userString(sendData.guarder, "userName");
      sendData.workDeptLeader = this.userString(
        sendData.workDeptLeader,
        "userName"
      );
      sendData.worker = this.userString(sendData.worker, "userName");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applicant = this.$userInfo.userName;
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseUpworkticketSave(sendData)
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
</style>
