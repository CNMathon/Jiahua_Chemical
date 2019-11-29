<template>
  <div class="home">
    <van-nav-bar
      title="新建工单"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="jumpTo('./')"
      @click-right="isShowAction = true"
    />
    <van-skeleton title :row="3" :loading="isLoading" class="fixed-first1">
      <div class="cell-group">
        <cell-value title="申请部门" v-model="$userInfo.officeName" disable />
        <cell-value title="申请人" v-model="$userInfo.userName" disable />
        <cell-input title="工单名称" v-model="sendData.workOrderName" required />
        <cell-select-device
          title="空间设备"
          v-model="this.sendData.device"
          :storeModule="storeModule"
          storeKey="device"
          required
        />
        <cell-input title="作业地点" v-model="sendData.workAddress" />
        <cell-time title="维修开始时间" v-model="sendData.repairTimeStart" required />
        <cell-time title="维修结束时间" v-model="sendData.repairTimeEnd" required />
        <cell-select-project
          title="检修项目"
          v-model="sendData.projectInfo"
          :storeModule="storeModule"
          storeKey="projectInfo"
          required
        />
        <cell-picker
          v-model="sendData.repairType"
          title="维修类别"
          required
          :columns="sendData.repairTypeColumns"
        />
        <cell-time title="维修时限" v-model="sendData.repairTime" type="date" required />
        <cell-select-user
          title="监护人"
          required
          :storeModule="storeModule"
          storeKey="guardianshipInfo"
          v-model="sendData.guardianshipInfo"
        />
        <cell-picker
          v-model="sendData.repairTeam"
          title="检修班组"
          required
          :columns="sendData.repairTeamCol"
        />
        <cell-select-user
          title="作业人员"
          required
          :storeModule="storeModule"
          storeKey="executorInfo"
          v-model="sendData.executorInfo"
        />
        <cell-select-user
          title="现场负责人"
          required
          :storeModule="storeModule"
          storeKey="sceneInfo"
          v-model="sendData.sceneInfo"
        />
        <cell-select-user
          title="安全教育人"
          required
          :storeModule="storeModule"
          storeKey="securityInfo"
          v-model="sendData.securityInfo"
        />
        <cell-textarea
          v-model="sendData.workContent"
          title="作业内容"
          required
          placeholder="请输入作业内容"
        />
        <cell-select-tag
          required
          title="危害辨识"
          storeKey="harmType"
          :tagList="sendData.harmType"
          :showList="sendData.harmTypeList"
          :storeModule="storeModule"
        />
        <cell-select-ticket 
          title="特殊作业及相关作业票证号"
          :storeModule="storeModule"
          storeKey="ticketList"
          v-model="sendData.ticketList"
        />
        <!-- {{sendData.ticketList}} -->
        <cell-add-list
          v-model="sendData.srcCheck"
          title="安全措施确认"
        />
      </div>
    </van-skeleton>
    <popup-action v-model="isShowAction" :saveData="saveData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      testData: ["aaa"],
      sendData: {
        workOrderName: "", // 工单名称
        device: [], // 空间设备 - del
        projectInfo: [], // 检修设备 - del
        repairTypeColumns: ["日常维修", "小修", "中修", "大修", "系统性大修"], // 维修类别Col - del
        guardianshipInfo: [], // 监护人Info - del
        executorInfo: [], // 作业人员Info - del
        securityInfo: [], // 安全教育人Info - del
        sceneInfo: [], // 现场负责人Info - del
        repairType: null, // 维修列别
        workAddress: "", // 作业地点
        repairTimeStart: "", // 维修开始时间
        repairTimeEnd: "", // 维修结束时间
        repairTime: "", // 维修时限
        repairTeamInfo: "", // 检修班组Info - del
        repairTeamCol: "", // 检修班组Col - del
        repairTeam: "", // 检修班组
        workContent: "", // 作业内容
        harmType: [], // 危害辨识
        harmTypeList: [
          "高处坠落",
          "物体打击",
          "机械伤害",
          "触电",
          "中毒",
          "坍塌",
          "爆炸",
          "火灾",
          "灼烫",
          "透水",
          "淹溺",
          "窒息",
          "车辆伤害",
          "超重伤害"
        ], // 危害辨识List - del
        ticketList: {}, // 特殊作业及相关作业票证号
        srcMod_Full: [],
        srcCheck: {
          modList: {
            config: [],
            value: [],
          }, // 筛选
          content: [], // 主内容
        },// 安全措施板块
      },
      isShowAction: false, // 是否展开操作Popup
      storeModule: "gongdanguanli",
      isLoading: false, // 是否在加载
    };
  },
  methods: {
    saveData() {
      // SendData => S&A Format
      let sendData = this.deepCopy(this.sendData);
      // 判断输入是否完整
      let inputEmpStat = this.isDataEmpty(
        sendData.workOrderName, // 工单名称
        sendData.device, // 空间设备
        sendData.workAddress, // 作业地点
        sendData.repairTimeStart, // 维修开始时间
        sendData.repairTimeEnd, // 维修结束时间
        sendData.workOrderName, // 工单名称
        sendData.projectInfo, // 检修设备
        sendData.repairType, // 维修类别
        sendData.repairTime, // 维修时限
        sendData.guardianshipInfo, // 监护人
        sendData.repairTeam, // 检修班组
        sendData.executorInfo, // 作业人员
        sendData.securityInfo, // 安全教育人
        sendData.sceneInfo, // 安全教育人
        sendData.workContent, // 作业内容
        sendData.harmType, // 危害辨识
        sendData.ticketList, // 特殊作业及相关作业票证号
        sendData.srcCheck, // 安全措施确认
      );
      if (inputEmpStat) {
        this.$notify("请将表单数据填写完整");
        return;
      }
      // Format - Structure
      sendData.deviceSpace = {};
      sendData.project = {};
      // Format - Data
      sendData.deviceSpace.deviceCode = sendData.device[0].deviceCode; // 空间设备Code
      sendData.deviceSpaceId = sendData.device[0].id; // 空间设备id
      sendData.project.projectName = sendData.projectInfo[0].projectName; // 检修项目名称
      sendData.projectId = sendData.projectInfo[0].id; // 检修项目id
      sendData.guardianshipName = sendData.guardianshipInfo[0].userName; // 监护人姓名
      sendData.guardianshipCode = sendData.guardianshipInfo[0].userCode; // 监护人Code
      sendData.repairTeam =
        sendData.repairTeamInfo[sendData.repairTeam].postCode; // 检修班组code
      sendData.executorName = sendData.executorInfo[0].userName; // 作业人员姓名
      sendData.executorCode = sendData.executorInfo[0].userCode; // 作业人员Code
      sendData.securityPersonName = sendData.securityInfo[0].userName; // 安全教育人姓名
      sendData.securityPersonCode = sendData.securityInfo[0].userCode; // 安全教育人Code
      sendData.scenePersonName = sendData.sceneInfo[0].userName; // 现场负责人姓名
      sendData.scenePersonCode = sendData.sceneInfo[0].userCode; // 现场负责人Code
      sendData.securityList = []; // 安全措施确认
      this.sendData.srcCheck.content.map(item => {
        sendData.securityList.push({
          id: item.id,
          measuresName: item.safe,
          selectType: item.stat.value
        })
      })
      sendData.__sid = localStorage.JiaHuaSessionId; // sessionId
      console.log(`sendData: `, sendData);
      this.$api.page_3
        .deviceWorkOrderSave(sendData)
        .then(res => {
          console.log(res)
        })

      // finData => Delete something needn't
      // let finData = this.deepCopy(this.sendData)
      // delete finData.device
      // delete finData.projectInfo
      // console.log(`finData: `, finData)
    },
    initData() {
      this.isLoading = true;
      let loadStat = 0;
      let expeloadStat = 2;
      // 加载状态管理
      let loadStatMan = () => {
        loadStat++;
        if (loadStat == expeloadStat) {
          this.isLoading = false;
        }
      };
      // 检修班组数据查询
      (() => {
        this.$api.page_3
          .workorderDeviceWorkOrder2Form({
            __sid: localStorage.JiaHuaSessionId
          })
          .then(res => {
            loadStatMan();
            this.isLoading = false;
            console.log(`repairTeam-Full: `, res.postList);

            // repairTeamInfo
            let repairTeamInfo = [];
            res.postList.map(item => {
              repairTeamInfo.push({
                postName: item.postName,
                postCode: item.postCode
              });
            });
            this.sendData.repairTeamInfo = repairTeamInfo;
            console.log(`repairTeam-Format`, this.sendData.repairTeamInfo);

            // repairTeamCol
            let repairTeamCol = [];
            repairTeamInfo.map(item => repairTeamCol.push(item.postName));
            this.sendData.repairTeamCol = repairTeamCol;
            console.log(`repairTeam-Format`, this.sendData.repairTeamCol);
          });
      })();
      // 安全措施模板数据查询
      (() => {
        this.$api.page_3
          .workorderDeviceWorkOrderSecurityListData({
            __sid: localStorage.JiaHuaSessionId
          })
          .then(res => {
            loadStatMan();
            console.log(`srcMod-Full: `, res.list);
            this.srcMod_Full = res.list

            // srcCheckModInfo
            // this.sendData.srcCheckModInfo = res.list;

            // srcCheckModCol
            let srcCheckModCol = [];
            res.list.map(item => srcCheckModCol.push(item.measuresName));
            this.sendData.srcCheck.modList.config = srcCheckModCol;
            console.log(`srcCheckModCol: `, srcCheckModCol)

            // srcCheckModId
            let srcCheckModId = [];
            res.list.map(item => srcCheckModId.push(item.id));
            this.sendData.srcCheck.modList.id = srcCheckModId;
            console.log(`srcCheckModId: `, srcCheckModId)
          });
      })();
    }
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState({
      device: state => state.gongdanguanli.device,
      projectInfo: state => state.gongdanguanli.projectInfo,
      guardianshipInfo: state => state.gongdanguanli.guardianshipInfo,
      executorInfo: state => state.gongdanguanli.executorInfo,
      securityInfo: state => state.gongdanguanli.securityInfo,
      sceneInfo: state => state.gongdanguanli.sceneInfo,
      harmType: state => state.gongdanguanli.harmType,
      ticketList: state => state.gongdanguanli.ticketList,
    })
  },
  watch: {
    device(res) {
      console.log("change - device => ", res);
      this.sendData.device = res;
    },
    projectInfo(res) {
      console.log("change - projectInfo => ", res);
      this.sendData.projectInfo = res;
    },
    guardianshipInfo(res) {
      console.log("change - guardianshipInfo => ", res);
      this.sendData.guardianshipInfo = res;
    },
    executorInfo(res) {
      console.log("change - executorInfo => ", res);
      this.sendData.executorInfo = res;
    },
    securityInfo(res) {
      console.log("change - securityInfo => ", res);
      this.sendData.securityInfo = res;
    },
    sceneInfo(res) {
      console.log("change - sceneInfo => ", res);
      this.sendData.sceneInfo = res;
    },
    harmType(res) {
      console.log("change - harmType => ", res);
      this.sendData.harmType = res;
    },
    ticketList(res) {
      console.log("change - ticketList => ", res);
      this.sendData.ticketList = res;
    },
  }
};
</script>

<style lang="scss" scoped>
.cell_add_button {
  width: 40px;
}
</style>