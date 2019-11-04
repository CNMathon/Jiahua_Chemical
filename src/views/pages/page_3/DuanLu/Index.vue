<template>
  <div class="mangban">
    <van-nav-bar
      title="断路安全"
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
      <!-- 断路原因 -->
      <cell-select-tag
        required
        title="断路原因"
        storeKey="reason"
        :tagList="reason"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="endangerSign"
        :tagList="endangerSign"
        :showList="list_2"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 断路开始时间 -->
      <cell-time
        v-model="sendData.offtimeStart"
        title="断路开始时间"
        required
      ></cell-time>
      <!-- 断路结束时间 -->
      <cell-time
        v-model="sendData.powertimeEnd"
        title="断路结束时间"
        required
      ></cell-time>
      <!-- 作业部门 -->
      <div class="cell">
        <div class="cell_title">
          <span>作业部门</span>
        </div>
        <div class="cell_value">
          <span>部门名1、部门名2</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 作业部门负责人 -->
      <cell-select-user
        title="作业部门负责人"
        required
        :storeModule="storeModule"
        storeKey="workCharger"
        v-model="sendData.workCharger"
      ></cell-select-user>
      <!-- 涉及部门 -->
      <div class="cell">
        <div class="cell_title">
          <span>涉及部门</span>
        </div>
        <div class="cell_value">
          <span>人名1、人名2</span>
          <span class="cell_value_arrow">
            <van-icon name="search" />
          </span>
        </div>
      </div>
      <!-- 断路地段示意图及相关说明-->
      <div class="cell border_none">
        <div class="cell_title">
          <span>断路地段示意图及相关说明</span>
        </div>
        <div class="cell_other">
          <textarea
            class="cell_textarea"
            placeholder="请输入工作内容"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="cell_other">
          <div class="upload">
            <div class="upload_icon">
              <van-icon name="photo-o" />
            </div>
            <div class="upload_box">
              <van-uploader
                :before-read="beforeRead"
                :before-delete="beforeDelete"
                v-model="fileList"
                preview-size="5rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next" @click="Next">下一步</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
export default {
  name: "duanlu",
  mixins: [business, uploadFile],
  data() {
    return {
      storeModule: "duanlu",
      sendData: {
        reason: [], //断路原因
        endangerSign: [], //危害辨识
        offtimeStart: "", //断路时间（起）
        powertimeEnd: "", //断路时间（止）
        workCharger: [] //作业部门负责人
      },
      list_1: [
        "修理马路",
        "开挖埋设水管",
        "埋设电缆",
        "开挖沟渠",
        "吊装设备",
        "管道"
      ],
      list_2: ["人员受伤", "车辆伤害", "人员跌落沟渠"]
    };
  },
  computed: mapState({
    reason: state => state.duanlu.reason,
    endangerSign: state => state.duanlu.endangerSign,
    workCharger: state => state.duanlu.workCharger
  }),
  beforeDestroy() {
    this.$store.dispatch("duanlu/cleanState");
  },
  methods: {
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let offExplain = this.fileList.map(item => {
        return item.id;
      });
      sendData.reason = this.stringData("reason", "list_1");
      sendData.endangerSign = this.stringData("endangerSign", "list_2");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyer = this.$userInfo.userName;
      sendData.offExplain = offExplain.join(",");
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseDlzypSave(sendData)
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
    reason(res) {
      this.sendData.reason = res;
    },
    endangerSign(res) {
      this.sendData.endangerSign = res;
    },
    workCharger(res) {
      this.sendData.workCharger = res;
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
