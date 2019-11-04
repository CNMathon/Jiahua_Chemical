<template>
  <div class="quexian">
    <van-nav-bar
      title="缺陷"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
    />
    <!-- 空间设备 -->
    <div class="cell_group">
      <div class="cell">
        <div class="cell_title">
          <span>空间设备</span>
        </div>
        <div class="cell_value">
          <div class="cell_input">
            <input type="text" placeholder="输入设备名" />
          </div>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 发现人 -->
      <cell-select-user
        title="发现人"
        required
        :storeModule="storeModule"
        storeKey="findPeopleName"
        v-model="sendData.findPeopleName"
      ></cell-select-user>
      <!-- 缺陷内容 -->
      <cell-textarea
        required
        v-model="sendData.workContent"
        title="缺陷内容"
        placeholder="请输入工作内容"
      ></cell-textarea>
      <!-- 缺陷类型 -->
      <div class="cell">
        <div class="cell_title">
          <span>缺陷类型</span>
        </div>
        <div class="cell_select" @click="gradeShow = true">
          <span class="cell_select_text">{{ grade.value || "请选择" }}</span>
          <div class="cell_select_image">
            <img src="./../../../../assets/images/select.svg" alt />
          </div>
        </div>
      </div>
      <!-- 缺陷类型 -->
      <div class="cell">
        <div class="cell_title">
          <span>缺陷类型</span>
        </div>
        <div class="cell_select" @click="gradeShow = true">
          <span class="cell_select_text">{{ grade.value || "请选择" }}</span>
          <div class="cell_select_image">
            <img src="./../../../../assets/images/select.svg" alt />
          </div>
        </div>
      </div>
      <!-- 发现时间 -->
      <cell-time
        v-model="sendData.powertimeEnd"
        title="发现时间"
        required
      ></cell-time>
    </div>
    <div class="next" @click="Next">提交</div>
    <!-- 动火级别 -->
    <van-action-sheet
      v-model="gradeShow"
      :actions="gradeColumns"
      cancel-text="取消"
      @select="onSelect"
      @cancel="gradeShow = false"
    />
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
      storeModule: "quexian",
      sendData: {
        workContent: "", //缺陷内容
        powertimeEnd: "", //发现时间
        findPeopleName: [] //发现人
      },
      gradeShow: false,
      grade: {
        value: ""
      },
      gradeColumns: [{ name: "|类", index: 1 }, { name: "||类", index: 2 }]
    };
  },
  computed: mapState({
    findPeopleName: state => state.quexian.findPeopleName
  }),
  methods: {
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.findPeopleName = this.userString(
        sendData.findPeopleName,
        "userName"
      );
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htDeviceDefectSave(sendData)
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
      this.grade = {
        value: item.name
      };
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.gradeShow = false;
    },
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    }
  },
  watch: {
    findPeopleName(res) {
      this.sendData.findPeopleName = res;
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
</style>
