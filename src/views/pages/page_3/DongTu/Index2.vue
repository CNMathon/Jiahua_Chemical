<template>
  <div class="mangban">
    <van-nav-bar
      title="动土安全"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="openAction"
    />
    <div class="cell_group">
      <!-- 申请部门 -->
      <cell-value title="申请部门" :value="$userInfo.officeName" disable></cell-value>
      <!-- 申请人 -->
      <cell-value title="申请人" :value="$userInfo.userName" disable></cell-value>
      <!-- 作业票编号 -->
      <cell-value title="作业票编号" :value="$route.query.id" disable></cell-value>
      <!-- 作业票状态 -->
      <cell-value title="作业票状态" value="编辑" disable></cell-value>
      <!-- 作业地点 -->
      <cell-input v-model="sendData.dtSite" title="作业地点" required placeholder="手工录入" disable></cell-input>
      <!-- 涉及其他特殊作业 -->
      <cell-select-tag
        required
        title="涉及其他特殊作业"
        storeKey="otherSpecial"
        :tagList="sendData.otherSpecial"
        :showList="list_1"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 危害辨识 -->
      <cell-select-tag
        required
        title="危害辨识"
        storeKey="hazardSb"
        :tagList="sendData.hazardSb"
        :showList="list_1"
        :storeModule="storeModule"
        disable
      ></cell-select-tag>
      <!-- 动土开始时间 -->
      <cell-time v-model="sendData.dtStarttime" title="动土开始时间" required disable></cell-time>
      <!-- 动土结束时间 -->
      <cell-time v-model="sendData.dtEndtime" title="动土结束时间" required disable></cell-time>
      <!-- 监护人 -->
      <cell-select-user
        title="监护人"
        required
        :storeModule="storeModule"
        storeKey="guardian"
        v-model="sendData.guardian"
        disable
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
        disable
      ></cell-select-user>
      <!-- 作业范围、内容、方式 -->
      <div class="cell border_none">
        <div class="cell_title">
          <span>作业范围、内容、方式</span>
        </div>
        <div class="cell_other">
          <textarea class="cell_textarea" placeholder="请输入工作内容" cols="30" rows="10" disable></textarea>
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
    <cell-textarea v-model="sendData.dznr" title="其他安全措施" required placeholder="请输入其他安全措施"></cell-textarea>
    <!-- 画板Popup -->
    <van-popup
      class="popup"
      v-model="signatureShow"
      :close-on-click-overlay="false"
      position="bottom"
    >
      <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
    </van-popup>
    <div class="signature" @click="signatureShow = true">
      <div>签字</div>
      <van-icon name="edit" />
    </div>
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
import { uploadFile } from "@/mixin/uploadFile";
import Canvas from "@/components/Canvas.vue";
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
      ],
      isShowAction: false,
      queryId: "",
      signatureShow: false
    };
  },
  components: {
    Canvas
  },
  computed: mapState({
    otherSpecial: state => state.dongtu.otherSpecial,
    hazardSb: state => state.dongtu.hazardSb,
    guardian: state => state.dongtu.guardian,
    dtMan: state => state.dongtu.dtMan
  }),
  beforeRouteLeave(to, from, next) {
    if (to.name === "dongtu_list") {
      this.queryId = "";
      for (const key in this.sendData) {
        if (this.sendData.hasOwnProperty(key)) {
          console.log("typeof this.sendData[key]: ", typeof this.sendData[key]);
          if (typeof this.sendData[key] === "object") {
            this.sendData[key] = [];
          } else {
            this.sendData[key] = "";
          }
        }
      }
      next();
    } else {
      next();
    }
  },
  activated() {
    console.log(this.$route.query.id);
    if (this.$route.query.id) {
      if (this.queryId !== this.$route.query.id) {
        this.queryId = this.$route.query.id;
        this.getPageData();
      }
    }
  },
  beforeDestroy() {
    this.queryId = "";
    this.$store.dispatch("dongtu/cleanState");
  },
  methods: {
    // 打开操作Popup
    openAction() {
      this.isShowAction = true;
    },

    // 关闭操作Popup
    closeAction() {
      this.isShowAction = false;
    },

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
      if (this.$route.query.id) {
        sendData.id = this.$route.query.id;
      }
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
    },
    // 编辑-获取页面数据
    getPageData() {
      this.$api.page_3
        .htHseDtzypListData({
          dtzypCode: this.queryId,
          __sid: localStorage.getItem("JiaHuaSessionId")
        })
        .then(res => {
          let info = res.list[0];
          console.log("info: ", info);
          for (const key in this.sendData) {
            if (key === "guardian") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "dtMan") {
              this.sendData[key] = this.reductionSelectUser(info[key]);
            } else if (key === "otherSpecial") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_1
                );
            } else if (key === "hazardSb") {
              if (info[key])
                this.sendData[key] = this.reductionSelectTag(
                  info[key],
                  this.list_2
                );
            } else {
              this.sendData[key] = info[key];
            }
          }
          console.log("this.sendData: ", this.sendData);
        });
    },
    // 保存签名
    saveCanvas(e) {
      console.log("e: ", e);
      this.signatureShow = false;
    },
    // 取消签名
    cancelCanvas() {
      console.log("取消签名");
      this.signatureShow = false;
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
  .cell_group {
    /deep/ .cell {
      background-color: #f5f5f5;
    }
  }

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
}
.signature {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
