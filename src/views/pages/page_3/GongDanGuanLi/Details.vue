<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar
        title="新建工单"
        left-text="返回"
        right-text="操作"
        left-arrow
        @click-left="pageBack"
        @click-right="openAction"
      />
    </van-sticky>
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" required :value="sendData.sqbm || $userInfo.officeName" disable></cell-value>
      <cell-value title="申请人" required :value="sendData.sqr || $userInfo.userName" disable></cell-value>
      <cell-input title="工单名称" required v-model="sendData.workOrderName" placeholder="请输入工单名称"></cell-input>
      <cell-picker
        title="空间设备"
        required
        v-model="sendData.shebeiListIndex"
        :columns="shebeiListCol"
      ></cell-picker>
      <!-- {{shebei}} -->
      <cell-input title="作业地点" required v-model="sendData.workAddress" placeholder="请输入作业地点"></cell-input>
      <cell-time title="维修开始时间" :value="sendData.repairTimeStart" required></cell-time>
      <cell-time title="维修结束时间" :value="sendData.repairTimeEnd" required></cell-time>
      <cell-picker
        title="检修项目"
        required
        v-model="jianxiuxiangmu[sendData.jianxiuxiangmuIndex]"
        :columns="jianxiuxiangmu"
      ></cell-picker>
      <cell-picker
        title="维护类别"
        required
        :value="weihuleibie[sendData.weihuleibieIndex]"
        v-model="weihuleibie[sendData.weihuleibieIndex]"
        :columns="weihuleibie"
      ></cell-picker>
      <cell-time title="维修时限" :value="sendData.repairTime" required></cell-time>
      <cell-select-user
        title="监护人"
        storeKey="guardianshipName"
        :value="sendData.guardianshipName"
        :v-model="sendData.guardianshipName"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-picker
        title="检修班组"
        required
        :value="jianxiubanzu[sendData.jianxiubanzuIndex]"
        v-model="jianxiubanzu[sendData.jianxiubanzuIndex]"
        :columns="jianxiubanzu"
      ></cell-picker>
      <cell-select-user
        title="作业人员"
        storeKey="executorName"
        :value="sendData.executorName"
        :v-model="sendData.executorName"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-select-user
        title="现场负责人"
        storeKey="scenePersonName"
        :value="sendData.scenePersonName"
        :v-model="sendData.scenePersonName"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-select-user
        title="安全教育人"
        storeKey="securityPersonName"
        :value="sendData.securityPersonName"
        :v-model="sendData.securityPersonName"
        required
        :storeModule="storeModule"
      ></cell-select-user>
      <cell-textarea title="作业内容" v-model="sendData.workContent" required placeholder="请输入作业内容"></cell-textarea>
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="whsb"
        :tagList="sendData.whsb"
        :showList="list_3"
        :storeModule="storeModule"
      ></cell-select-tag>
      <cell-value
        title="特殊作业及相关作业票证号"
        :value="sendData.otherSpecial"
        :v-model="sendData.otherSpecial"
        required
      >
        <img
          src="../../../../assets/images/add.jpg"
          class="cell_add_button"
          @click="toSelectZuoYePiao"
        />
      </cell-value>
      <cell-value title="安全措施确认" required></cell-value>
      <div class="template">
        <div class="picker">
          <cell-pickers :columns="shebeiList"></cell-pickers>
        </div>
        <div class="btn">增加行</div>
        <div class="btn">删除行</div>
      </div>
    </div>
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="saveData">提交</button>
      <button @click="closeAction">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
export default {
  name: "gongdanguanli_details",
  mixins: [business],
  components: {},
  data() {
    return {
      sendData: {
        // deviceSpaceIndex: 0,
        shebeiListIndex: '', // 设备空间序号 - del
        jianxiuxiangmuIndex: 0,
        weihuleibieIndex: 0,
        jianxiubanzuIndex: 0,
        whsb: [], // 危害辨识
        otherSpecial: "", // 特殊作业及相关作业票证号
        measuresName: "111",
        workOrderName: "", // 工单名称
        workAddress: "", // 作業地址
        deviceSpace: {
          deviceCode: '', // 空间设备编号
        },
        deviceSpaceId: "", // 空间设备id
        workContent: "", // 作业内容
      },
      list_3: [
        "火灾、爆炸",
        "中度和窒息",
        "化学灼伤",
        "机械伤害",
        "触电",
        "高处坠落"
      ],
      storeModule: "gongdanguanli",
      jianxiubanzu: [4, 5, 6],
      weihuleibie: ["日常维续", "小修", "中修", "大修", "系统性大修"],
      jianxiuxiangmu: ["检修项目1", "检修项目2", "检修项目3"],
      shebeilistOld: [],
      shebeiList: [],
      dhLevelColumns: [],
      isShowAction: false,
      tagList1: ["触电", "化学灼伤", "中毒和窒息", "高处坠落", "机械伤害"]
    };
  },
  watch: {
    guardianshipName(res) {
      this.sendData.guardianshipName = res;
      this.sendData = JSON.parse(JSON.stringify(this.sendData));
    },
    executorName(res) {
      this.sendData.executorName = res;
      this.sendData = JSON.parse(JSON.stringify(this.sendData));
    },
    scenePersonName(res) {
      this.sendData.scenePersonName = res;
      this.sendData = JSON.parse(JSON.stringify(this.sendData));
    },
    securityPersonName(res) {
      this.sendData.securityPersonName = res;
      this.sendData = JSON.parse(JSON.stringify(this.sendData));
    },
    whsb(res) {
      console.log(res);
      this.sendData.whsb = res;
      this.sendData = JSON.parse(JSON.stringify(this.sendData));
    }
  },
  computed: {
    shebeiListCol() {
      let tempArr = []
      this.shebeiList.map(item => {
        tempArr.push(item.deviceName);
      })
      return tempArr
    },
    ...mapState({
      hazardSb: state => state.gongdanguanli.hazardSb,
      guardianshipName: state => state.gongdanguanli.guardianshipName,
      executorName: state => state.gongdanguanli.executorName,
      scenePersonName: state => state.gongdanguanli.scenePersonName,
      securityPersonName: state => state.gongdanguanli.securityPersonName,
      whsb: state => state.gongdanguanli.whsb
    })
  },
  created() {
    this.deviceSpacelist();
  },
  activated() {},
  methods: {
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 提交数据
    saveData() {
      let inputEmptyStatus = this.isDataEmpty(
        this.sendData.workOrderName, // 工单名称
        this.sendData.shebeiListIndex, // 空间设备 => index，空则未选择
        this.sendData.workAddress, // 工作地点
        this.sendData.workContent, // 作业内容
        this.sendData.whsb, // 危害辨识
        this.sendData.workOrderName, // 工单名称
      )
      // 判断用户输入数据是否异常
      if (inputEmptyStatus) {
        this.$notify('请输入完整的表单数据')
        return
      }
      //保存数据
      let sendData = this.deepCopy(this.sendData);
      console.log(`shebeiList: `, this.shebeiList)
      console.log(`sendData.shebeiListIndex: `, sendData.shebeiListIndex)
      sendData.deviceSpace.deviceCode = this.shebeiList[sendData.shebeiListIndex].deviceCode
      sendData.deviceSpaceId = this.shebeiList[sendData.shebeiListIndex].id
      sendData.whsb = String(sendData.whsb)
      let finData = this.deepCopy(sendData)
      delete finData.jianxiubanzuIndex
      delete finData.shebeiListIndex
      delete finData.weihuleibieIndex
      console.log(finData);
      // this.$api.page_3
      //   .deviceWorkOrderSave({
      // 	  ...this.sendData,
      //     __sid: localStorage.getItem("JiaHuaSessionId")
      //   })
      //   .then(res => {
      // 	  this.listData = res.list;
      //   })
    },
    deviceSpacelist() {
      
      //空间设备列表
      this.$api.page_3
        .deviceSpacelistData({ __sid: localStorage.getItem("JiaHuaSessionId") })
        .then(res => {
          console.log(`deviceSpacelist: `, res.list);
          // let temp = [];
          // res.list.map(item => {
          //   temp.push(item.deviceName);
          // });
          this.shebeiList = res.list;
          this.shebeilistOld = res.list;
        });
    },
    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },
    onClickRight() {},
    toSelectZuoYePiao() {
      this.$router.push({ path: "./zuoyepiao" });
    }
  }
};
</script>

<style lang="scss" scoped>
.whiteCell {
  background-color: #fff !important;
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
.cell_add_button {
  width: 40px;
}
.template {
  padding: 30px 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #2d2c33;
  line-height: 40px;
  .picker {
    width: 50%;
    margin-right: auto;
  }
  .btn {
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #333;
    margin-left: 10px;
  }
}
</style>
