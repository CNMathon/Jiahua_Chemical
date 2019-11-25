<template>
  <div class="weizhang">
    <van-nav-bar
      title="新建违章"
      left-text="返回"
      right-text="操作"
      left-arrow
      @click-left="pageBack"
      @click-right="isShowAction=true"
      class="van-nav-bar--fixed"
    />
    <div class="cell_group">
      <!-- 项目名称 -->
      <cell-value
        title="项目名称"
        required
        :value="sendData.projectname.projectName || '点击选择'"
        iconName="search"
        arrow
        @click="selectProject()"
      />
      <!-- 违章名称 -->
      <cell-input v-model="sendData.breakrulename" title="违章名称" required placeholder="输入违章名称" />
      <!-- 违章单位 -->
      <cell-value
        title="违章单位"
        required
        :value="sendData.breakruledept.projectName || '点击选择'"
        iconName="search"
        arrow
        @click="selectDepartment()"
      />
      <cell-time v-model="sendData.occurtime" title="发生时间" required></cell-time>
      <cell-input v-model="sendData.occursite" title="发生地点" required placeholder="输入发生地点"></cell-input>
      <cell-select-user
        title="检察人员"
        required
        :storeModule="storeModule"
        storeKey="checkuser"
        v-model="sendData.checkuser"
      />
      <cell-select-user
        title="违章人员"
        required
        :storeModule="storeModule"
        storeKey="breakruleuser"
        v-model="sendData.breakruleuser"
      />
      <!-- 违章考核标准 -->
      <cell-value
        title="违章考核标准"
        required
        :value="sendData.wzstandard.projectName || '点击选择'"
        iconName="search"
        arrow
        @click="selectAssessment()"
      />
      <!-- 违章项目 -->
      <cell-value
        title="违章项目"
        required
        :value="sendData.breakruleproject.projectName || '点击选择'"
        iconName="search"
        arrow
        @click="selectProjects()"
      />
      <cell-picker
        title="违章类型"
        required
        v-model="sendData.breakruletype"
        :columns="breakruletypeColumns"
      ></cell-picker>
      <!-- 修改 -->
      <cell-value title="处罚标准" required placeholder="自动读取" />
      <cell-textarea title="事件描述" required v-model="sendData.incidentdes" placeholder="输入内容" />
      <!-- 上传图片 -->
      <div class="cell">
        <div class="cell_title">
          <span>上传图片</span>
        </div>
        <div class="cell_other">
          <div class="upload">
            <div class="upload_box">
              <van-uploader
                :before-read="beforeRead"
                :before-delete="beforeDelete"
                v-model="fileList"
                preview-size="5rem"
                multiple
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="new Date()"
        @cancel="onTimeCancel"
        @confirm="onTimeConfirm"
      />
    </van-popup>
    <van-popup class="popup" v-model="signatureShow" position="bottom">
      <Canvas @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
    </van-popup>
    <!-- 操作Popup -->
    <van-popup v-model="isShowAction" position="bottom" class="action">
      <button @click="Next">保存</button>
      <button @click="isShowAction=false">取消</button>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import Canvas from "@/components/Canvas.vue";
import { uploadFile } from "@/mixin/uploadFile";
export default {
  name: "weizhang",
  mixins: [uploadFile],
  components: {
    Canvas
  },
  data() {
    return {
      storeModule: "weizhang",
      isShowAction: false,
      sendData: {
        projectname: {}, //项目名称
        breakrulename: "", //违章名称,
        breakruledept: "", // 违章单位
        occurtime: "", //发生时间
        occursite: "", //发生地点
        checkuser: [], // 检察人员
        breakruleuser: [], // 违章人员
        wzstandard: [], // 违章考核标准
        breakruleproject: "", // 违章项目
        breakruletype: "", //违章类型
        cfbz: "", // 处罚标准
        incidentdes: "", //事件描述,
        wztp: [] // 违章图片
      },
      breakruletypeColumns: [
        "违章指挥",
        "违反劳动纪律",
        "违章操作",
        "违反十大禁令"
      ],
      timeShow: false,
      currentDate: new Date(),
      fileList: [],
      signatureShow: false
    };
  },
  watch: {
    projectname(res) {
      this.sendData.projectname = res[0];
    },
    checkuser(res) {
      this.sendData.checkuser = res;
    },
    breakruleuser(res) {
      this.sendData.breakruleuser = res;
    },
    wzkhbz(res) {
      this.sendData.wzkhbz = res;
    }
  },
  computed: mapState({
    projectname: state => state.weizhang.projectname,
    checkuser: state => state.weizhang.checkuser,
    breakruleuser: state => state.weizhang.breakruleuser,
    wzkhbz: state => state.weizhang.wzkhbz
  }),
  methods: {
    Next() {
      this.sendData.__sid = localStorage.JiaHuaSessionId;
      console.log(this.sendData);
      this.$api.page_3.htCbsBreakrulesmanageSave(this.sendData).then(res => {
        console.log(res);
      });
    },
    pageBack() {
      this.$router.back();
    },
    // 取消时间选择
    onTimeCancel() {
      this.timeShow = false;
    },
    // 确认时间选择
    onTimeConfirm() {
      this.timeShow = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    saveCanvas() {
      this.signatureShow = false;
      console.log("signatureShow: ");
    },
    cancelCanvas() {
      this.signatureShow = false;
    },
    onClickProjectName() {
      this.$router.push({
        path: "/Component/CasSelect/Project"
      });
    },
    // 选择项目名称
    selectProject() {
      this.$router.push({
        path: "./select_project"
      });
    },
    // 选择违章单位
    selectDepartment() {
      this.$router.push({
        path: "./select_department"
      });
    },
    // 选择违章项目名称
    selectProjects() {
      this.$router.push({
        path: "./select_projects"
      });
    },
    // 选择考核标准
    selectAssessment() {
      this.$router.push({
        path: "./select_assessment"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/cell.scss";

.weizhang {
  min-height: 100vh;
  background-color: #f5f5f5;

  .cell_group {
    margin-top: 92px;
  }

  .confirm_action {
    width: 100vw;
    height: 100px;
    display: flex;
    align-items: center;

    .signature {
      flex: 1;
      height: 100px;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 100px;
      background: rgba(248, 155, 96, 1);
    }

    .confirm {
      flex: 1;
      height: 100px;
      font-size: 32px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      line-height: 100px;
      background: #6096f8;
    }
  }

  .popup {
    height: 568px;
  }
}

.clickInput {
  background-color: white;
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
