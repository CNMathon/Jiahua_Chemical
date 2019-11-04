<template>
  <div class="mangban">
    <van-nav-bar
      title="动土安全"
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
      <!-- 作业地点 -->
      <cell-input
        v-model="sendData.dtSite"
        title="作业地点"
        required
        placeholder="手工录入"
      ></cell-input>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="otherSpecial"
        :tagList="otherSpecial"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :tagList="hazardSb"
        :showList="list_1"
        :storeModule="storeModule"
      ></cell-select-tag>
      <!-- 动土开始时间 -->
      <cell-time
        v-model="sendData.dtStarttime"
        title="动土开始时间"
        required
      ></cell-time>
      <!-- 动土结束时间 -->
      <cell-time
        v-model="sendData.dtEndtime"
        title="动土结束时间"
        required
      ></cell-time>
      <!-- 监护人 -->
      <cell-select-user
        title="监护人"
        required
        :storeModule="storeModule"
        storeKey="guardian"
        v-model="sendData.guardian"
      ></cell-select-user>
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
      <!-- 作业负责人 -->
      <cell-select-user
        title="作业负责人"
        required
        :storeModule="storeModule"
        storeKey="dtMan"
        v-model="sendData.dtMan"
      ></cell-select-user>
      <!-- 作业范围、内容、方式 -->
      <div class="cell border_none">
        <div class="cell_title">
          <span>作业范围、内容、方式</span>
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
      <!-- 土建专工意见 -->
      <cell-textarea
        v-model="sendData.yj"
        title="土建专工意见"
        placeholder="手工录入"
      ></cell-textarea>
    </div>
    <div class="next" @click="Next">下一步</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { business } from "@/mixin/business";
import { uploadFile } from "@/mixin/uploadFile";
export default {
  name: "dongtu",
  mixins: [business, uploadFile],
  data() {
    return {
      storeModule: "dongtu",
      sendData: {
        dtSite: "", //作业地点
        dtStarttime: "", //动土开始时间
        dtEndtime: "", //动土结束时间
        otherSpecial: [], //涉及其他作业
        hazardSb: [], //危害辨识
        guardian: [], //监护人
        dtMan: [] //作业部门负责人
      },
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
        "物体打击",
        "机械伤害",
        "触电",
        "坍塌",
        "中毒窒息",
        "火灾",
        "受限空间"
      ]
    };
  },
  computed: mapState({
    otherSpecial: state => state.dongtu.otherSpecial,
    hazardSb: state => state.dongtu.hazardSb,
    guardian: state => state.dongtu.guardian,
    dtMan: state => state.dongtu.dtMan
  }),
  beforeDestroy() {
    this.$store.dispatch("dongtu/cleanState");
  },
  methods: {
    // 发送数据
    postData() {
      const that = this;
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let htDeviceDefect_file = this.fileList.map(item => {
        return item.id;
      });
      sendData.otherSpecial = this.stringData("otherSpecial", "list_1");
      sendData.hazardSb = this.stringData("hazardSb", "list_2");
      sendData.guardian = this.userString(sendData.guardian, "userName");
      sendData.dtMan = this.userString(sendData.dtMan, "userName");
      sendData.applyDept = this.$userInfo.officeName;
      sendData.applyer = this.$userInfo.userName;
      sendData.htDeviceDefect_file = htDeviceDefect_file.join(",");
      sendData.__sid = this.$userInfo.sessionId;
      this.$api.page_3
        .htHseDtzypSave(sendData)
        .then(() => {
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
    otherSpecial(res) {
      this.sendData.otherSpecial = res;
    },
    hazardSb(res) {
      this.sendData.hazardSb = res;
    },
    guardian(res) {
      this.sendData.guardian = res;
    },
    dtMan(res) {
      this.sendData.dtMan = res;
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
