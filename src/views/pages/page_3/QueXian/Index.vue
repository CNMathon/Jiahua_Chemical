<template>
  <div class="quexian">
    <van-nav-bar
      title="缺陷"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <div class="cell_group">
      <!-- 空间设备 -->
      <cell-select-device
        title="空间设备"
        required
        :storeModule="storeModule"
        storeKey="deviceName"
        v-model="sendData.deviceName"
      />
      <!-- 发现人 -->
      <cell-select-user
        title="发现人"
        required
        :storeModule="storeModule"
        storeKey="findPeopleName"
        v-model="sendData.findPeopleName"
      />
      <!-- 缺陷描述 -->
      <cell-textarea required v-model="sendData.description" title="缺陷描述" placeholder="请输入缺陷描述" />
      <!-- 缺陷类型 -->
      <cell-picker
        v-model="sendData.defectType"
        title="缺陷类型"
        required
        :columns="defectTypeColumnsName"
      />
      <!-- 缺陷类型 => Old Version -->
      <!-- <div class="cell">
        <div class="cell_title">
          <span>缺陷类型</span>
        </div>
        <div class="cell_select" @click="defectTypeShow = true">
          <span class="cell_select_text">{{ sendData.defectType.name || "请选择" }}</span>
          <div class="cell_select_image">
            <img src="./../../../../assets/images/select.svg" alt />
          </div>
        </div>
      </div>-->

      <!-- 缺陷类别 -->
      <cell-picker
        v-model="sendData.category"
        title="缺陷类别"
        required
        :columns="categoryColumnsName"
      />

      <!-- 缺陷类别 => Old Version -->
      <!-- <div class="cell">
        <div class="cell_title">
          <span>缺陷类别</span>
        </div>
        <div class="cell_select" @click="categoryShow = true">
          <span class="cell_select_text">{{ sendData.category.name || "请选择" }}</span>
          <div class="cell_select_image">
            <img src="./../../../../assets/images/select.svg" alt />
          </div>
        </div>
      </div>-->
      <!-- 发现时间 -->
      <cell-time v-model="sendData.findDate" title="发现时间" />
      <!-- 上传图片 -->
      <cell-image :value="fileList" :afterRead="afterRead" />
    </div>

    <!-- <div class="next" @click="Next">提交</div> -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="postData">保存</button>
      <button @click="closeAction">取消</button>
    </van-popup>
    <button @click="testme">testme</button>
    <!-- 缺陷类型 - old -->
    <!-- <van-action-sheet
      v-model="defectTypeShow"
      :actions="defectTypeColumns"
      cancel-text="取消"
      @select="onSelect"
      @cancel="defectTypeShow = false"
    />-->
    <!-- 缺陷类别 -->
    <!-- <van-action-sheet
      v-model="scategoryShow"
      :actions="categoryColumns"
      cancel-text="取消"
      @select="onSelects"
      @cancel="categoryShow = false"
    />-->
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
export default {
  name: "quexian",
  mixins: [business],
  data() {
    return {
      isShowAction: false,
      storeModule: "quexian",
      sendData: {
        deviceName: [], // 空间设备
        description: "", // 缺陷描述
        findDate: "", // 发现时间
        defectType: {}, // 缺陷类型
        category: {}, // 缺陷类别
        findPeopleName: [] // 发现人
      },
      defectTypeShow: false,
      categoryShow: false,
      defectTypeColumns: [
        { name: "其他", index: 0 },
        { name: "设备渗漏", index: 1 },
        { name: "异常显示", index: 2 },
        { name: "连锁故障", index: 3 },
        { name: "性能下降", index: 4 },
        { name: "物理异常", index: 5 }
      ],
      categoryColumns: [
        { name: "一类缺陷", index: 0 },
        { name: "二类缺陷", index: 1 },
        { name: "三类缺陷", index: 2 }
      ],
      fileList: []
    };
  },
  computed: {
    defectTypeColumnsName() {
      return this.defectTypeColumns.map(res => res.name);
    },
    categoryColumnsName() {
      return this.categoryColumns.map(res => res.name);
    },
    ...mapState({
      findPeopleName: state => state.quexian.findPeopleName,
      deviceName: state => state.quexian.deviceName
    })
  },
  watch: {
    deviceName(res) {
      this.sendData.deviceName[0] = res.deviceName;
      console.log('change')
    }
  },
  methods: {
    testme() {
      console.log(`computed:`, this.deviceName)
      console.log(`sendData:`, this.sendData.deviceName)
    },
    afterRead(file) {
      this.fileList.push(file);
      console.log(`fileList:`, this.fileList);
      console.log({
        fileMd5: this.$md5(file.content),
        fileName: file.file.name,
        file: file.content
      });
      this.$api.page_3
        .fileUpload({
          fileMd5: this.$md5(file.content),
          fileName: file.file.name,
          file: file.content
        })
        .then(res => {
          console.log(res);
        });
    },
    openAction() {
      this.isShowAction = true;
    },
    closeAction() {
      this.isShowAction = false;
    },
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.findPeopleName = this.userString(
        sendData.findPeopleName,
        "userCode"
      );
      sendData.deviceSpace.deviceCode = sendData.deviceName[0].deviceCode
      sendData.deviceSpaceId = sendData.deviceName[0].id

      // sendData.device.deviceCode = ''
      // sendData.deviceId = ''
      
      // sendData.defectType = sendData.defectType.index;
      // sendData.category = sendData.category.index;
      sendData.__sid = this.$userInfo.sessionId;
      console.log(sendData);
      // this.$api.page_3
      //   .htDeviceDefectSave(sendData)
      //   .then(res => {
      //     console.log("res: ", res);
      //     this.$Toast.success({
      //       message: "提交成功",
      //       onClose() {
      //         that.sendData = {
      //           description: "", //缺陷内容
      //           findDate: "", //发现时间
      //           defectType: {}, //缺陷类型
      //           category: {}, //缺陷类别
      //           findPeopleName: [] //发现人
      //         };
      //         that.pageBack();
      //       }
      //     });
      //   })
      //   .catch(() => {});
    },
    onSelect(item) {
      this.sendData.defectType = item;
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.defectTypeShow = false;
    },
    onSelects(item) {
      this.sendData.category = item;
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.categoryShow = false;
    }
  },
  watch: {
    findPeopleName(res) {
      this.sendData.findPeopleName = res;
    },
    deviceName(res) {
      this.sendData.deviceName = res;
      console.log(`change => deviceName`)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.quexian {
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  .next {
    position: absolute;
    left: 0;
    bottom: 0;
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
