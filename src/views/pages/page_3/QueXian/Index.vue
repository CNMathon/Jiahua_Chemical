<template>
  <div class="quexian">
    <van-nav-bar
      title="缺陷"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
      fixed
    />
    <van-skeleton title avatar :row="3" :loading="isLoading" class="fixed-first">
      <div class="cell_group fixed-first">
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
        <cell-image v-model="fileList" :beforeRead="beforeRead" :before-delete="beforeDelete" />
      </div>
    </van-skeleton>

    <!-- <div class="next" @click="Next">提交</div> -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="postData">保存</button>
      <button @click="closeAction">取消</button>
    </van-popup>
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
import { uploadFile } from "@/mixin/uploadFile";
export default {
  name: "quexian",
  mixins: [business, uploadFile],
  data() {
    return {
      isLoading: false,
      isShowAction: false,
      storeModule: "quexian",
      sendData: {
        deviceName: [], // 空间设备
        description: "", // 缺陷描述
        findDate: "", // 发现时间
        defectType: {}, // 缺陷类型
        category: {}, // 缺陷类别
        findPeopleName: [], // 发现人
        deviceSpace: {}
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
      ]
    };
  },
  computed: {
    defectTypeColumnsName() {
      return this.defectTypeColumns.map(res => res.name);
    },
    categoryColumnsName() {
      return this.categoryColumns.map(res => res.name);
    },
    fileUrlList() {
      let arr = [];
      this.fileList.map(item => arr.push(item.fileUrl));
      return arr;
    },
    ...mapState({
      findPeopleName: state => state.quexian.findPeopleName,
      deviceName: state => state.quexian.deviceName,
      indexId: state => state.quexian.indexId
    })
  },
  methods: {
    openAction() {
      this.isShowAction = true;
    },
    closeAction() {
      this.isShowAction = false;
    },
    // 发送数据
    postData() {
      let empStat = this.isDataEmpty(
        this.sendData.deviceName, // 空间设备
        this.sendData.findPeopleName, // 发现人
        this.sendData.description, // 缺陷描述
        this.sendData.defectType, // 缺陷类型
        this.sendData.category, // 缺陷类别
        this.sendData.findDate, // 发现时间
        this.fileList // 上传图片
      );
      if (empStat) {
        console.error("用户表单输入不完整");
        this.$notify("请输入完整的表单数据");
        return;
      }
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.findPeopleName = this.userString(
        sendData.findPeopleName,
        "userCode"
      );
      sendData.htStatus = 1;
      sendData.deviceSpace.deviceCode = sendData.deviceName[0].deviceCode;
      sendData.deviceSpaceId = sendData.deviceName[0].id;
      sendData.htDeviceDefect_file = String(this.fileUrlList);
      // delete sendData.deviceName
      // sendData.device.deviceCode = ''
      // sendData.deviceId = ''

      // sendData.defectType = sendData.defectType.index;
      // sendData.category = sendData.category.index;
      sendData.__sid = this.$userInfo.sessionId;
      console.log(sendData);
      this.$api.page_3
        .htDeviceDefectSave(sendData)
        .then(res => {
          console.log("res: ", res);
          this.$Toast.success({
            message: "提交成功"
          });
        })
        .catch(() => {});
    },
    // 初始化数据
    initData() {
      this.isLoading = true;
      console.log("routeId: ", this.$route.query.id);
      console.log(`vuexId: `, this.indexId);

      this.$api.page_3
        .htDeviceDefectForm({
          __sid: localStorage.JiaHuaSessionId,
          id: this.$route.query.id
        })
        .then(res => {
          let listData = res.htDeviceDefect;
          console.log(`listData: `, listData);
          this.sendData.deviceName[0] = listData.device;
          this.sendData.findPeopleName = this.reductionSelectUserObj({
            fullName: listData.officeName,
            userCode: listData.findPeopleCode,
            userName: listData.findPeopleName
          });
          this.sendData.description = listData.description;
          this.sendData.defectType = listData.defectType + 1;
          this.sendData.category = listData.category;
          this.sendData.findDate = listData.findDate;
          this.isLoading = false;
        });
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
    },
    clearPageData() {
      this.sendData = {
        deviceName: [], // 空间设备
        description: "", // 缺陷描述
        findDate: "", // 发现时间
        defectType: {}, // 缺陷类型
        category: {}, // 缺陷类别
        findPeopleName: [], // 发现人
        deviceSpace: {}
      };
    }
  },
  watch: {
    findPeopleName(res) {
      this.sendData.findPeopleName = res;
    },
    deviceName(res) {
      this.sendData.deviceName = res;
      console.log(`change => deviceName`);
    }
  },
  created() {
    this.initData();
    // if (this.$route.query.status == 0) {
    //   // 是新增页
    //   this.clearPageData();
    // } else {
    //   // 非新增页
    //   this.$store.dispatch(`${this.storeModule}/changTag`, {
    //     key: "indexId",
    //     value: this.$route.query.id
    //   });
    // }
  },
  activated() {
    console.log(this.$router)
    if (this.$route.query.status == 0) {
      // 是新增页
      this.clearPageData();
    } else {
      // 非新增页
      if (this.indexId !== this.$route.query.id) {
        this.initData();
      }
      console.log(`routerQuery: `, this.$route.query);
      // this.initData()
    }
  },
  deactivated() {
    console.log("dddddd");
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";
.quexian {
  min-height: 100vh;
  // background-color: #f5f5f5;
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
