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
      <cell-input
        title="作业地点"
        v-model="sendData.workAddress"
      />
      <cell-time
        title="维修开始时间"
        v-model="sendData.repairTimeStart"
        required 
      />
      <cell-time
        title="维修结束时间"
        v-model="sendData.repairTimeEnd"
        required 
      />
      <cell-select-project
        title="检修项目"
        v-model="sendData.projectInfo"
        :storeModule="storeModule"
        storeKey="projectInfo"
        required
      />
      <cell-picker />
    </div>
    <popup-action v-model="isShowAction" :saveData="saveData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      testData: ['aaa'],
      sendData: {
        workOrderName: '', // 工单名称
        device: [], // 空间设备 - del
        projectInfo: [], // 检修设备 - del
        workAddress: '', // 作业地点
        repairTimeStart: '', // 维修开始时间
        repairTimeEnd: '', // 维修结束时间
      },
      isShowAction: false, // 是否展开操作Popup
      storeModule: 'gongdanguanli'
    };
  },
  methods: {
    saveData() {
      // SendData => S&A Format
      let sendData = this.deepCopy(this.sendData)
      // 判断输入是否完整
      let inputEmpStat = this.isDataEmpty(
        sendData.workOrderName, // 工单名称
        sendData.device, // 空间设备
        sendData.workAddress, // 作业地点
        sendData.repairTimeStart, // 维修开始时间
        sendData.repairTimeEnd, // 维修结束时间
        sendData.workOrderName, // 工单名称
        sendData.projectInfo, // 检修设备
      )
      if (inputEmpStat) {
        this.$notify('请将表单数据填写完整')
        return
      }
      // Format - Structure
      sendData.deviceSpace = {}
      sendData.project = {}
      // Format - Data
      sendData.deviceSpace.deviceCode = sendData.device[0].deviceCode // 空间设备Code
      sendData.deviceSpaceId = sendData.device[0].id // 空间设备id
      sendData.project.projectName = sendData.projectInfo[0].projectName // 检修项目名称
      sendData.projectId = sendData.projectInfo[0].id // 检修项目id
      console.log(`sendData: `, sendData)

      // finData => Delete something needn't
      // let finData = this.deepCopy(this.sendData)
      // delete finData.device
      // delete finData.projectInfo
      // console.log(`finData: `, finData)
    }
  },
  computed: {
    ...mapState({
      device: state => state.gongdanguanli.device,
      projectInfo: state => state.gongdanguanli.projectInfo
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
    }
  }
};
</script>